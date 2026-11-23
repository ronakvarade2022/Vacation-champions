/**
 * Strict, zero-dependency markup sanitizers for SVG drawing templates and
 * printable A4 lesson-plan HTML documents.
 *
 * Strips all script execution vectors (<script>, <foreignObject>, <iframe>,
 * <object>, <embed>, event-handler attributes `on*`, and `javascript:` /
 * `data:` / `vbscript:` URLs) before DOM insertion.
 */

const ALLOWED_SVG_TAGS = new Set([
  'svg',
  'g',
  'path',
  'circle',
  'ellipse',
  'rect',
  'line',
  'polyline',
  'polygon',
  'defs',
  'lineargradient',
  'radialgradient',
  'stop',
  'clippath',
  'title',
  'desc',
  'text',
  'tspan',
]);

const ALLOWED_SVG_ATTRS = new Set([
  'xmlns',
  'viewbox',
  'width',
  'height',
  'preserveaspectratio',
  'd',
  'cx',
  'cy',
  'r',
  'rx',
  'ry',
  'x',
  'y',
  'x1',
  'y1',
  'x2',
  'y2',
  'points',
  'fill',
  'fill-opacity',
  'fill-rule',
  'stroke',
  'stroke-width',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-opacity',
  'opacity',
  'transform',
  'class',
  'id',
  'offset',
  'stop-color',
  'stop-opacity',
  'gradientunits',
  'gradienttransform',
  'font-size',
  'font-weight',
  'font-family',
  'text-anchor',
  'dominant-baseline',
  'dx',
  'dy',
  'clip-path',
  'aria-hidden',
  'role',
]);

const DANGEROUS_URL_PATTERN = /^\s*(javascript|vbscript|data):/i;
const DANGEROUS_CSS_URL_PATTERN = /url\s*\(\s*['"]?\s*(javascript|vbscript|data|https?:|\/\/)/i;

function isSafeSvgAttributeValue(attrName: string, value: string): boolean {
  const trimmed = value.trim();
  if (DANGEROUS_URL_PATTERN.test(trimmed)) return false;
  if (DANGEROUS_CSS_URL_PATTERN.test(trimmed)) return false;
  // Allow only local fragment refs (#id) for fill/stroke/clip-path
  if ((attrName === 'fill' || attrName === 'stroke' || attrName === 'clip-path') && /url\s*\(/i.test(trimmed)) {
    return /^url\(\s*#[a-zA-Z0-9_-]+\s*\)$/i.test(trimmed);
  }
  return true;
}

function sanitizeSvgWithRegexFallback(rawSvg: string): string {
  const trimmed = String(rawSvg || '').trim();
  if (!trimmed || !/<svg[\s>]/i.test(trimmed)) return '';

  return trimmed
    .replace(/<(script|foreignObject|iframe|object|embed|style|link|meta|base|animate|set|handler|a)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<(script|foreignObject|iframe|object|embed|style|link|meta|base|animate|set|handler|a|use)\b[^>]*\/?>/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s+(?:xlink:)?href\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(javascript|vbscript|data)\s*:/gi, '');
}

/**
 * Sanitizes an SVG outline string into a safe vector-only SVG payload.
 */
export function sanitizeSvgMarkup(rawSvg: unknown): string {
  const input = String(rawSvg ?? '').trim();
  if (!input) return '';

  if (typeof DOMParser === 'undefined') {
    return sanitizeSvgWithRegexFallback(input);
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'image/svg+xml');
    const parseError = doc.querySelector('parsererror');
    const root = doc.documentElement;

    if (parseError || !root || root.tagName.toLowerCase() !== 'svg') {
      return sanitizeSvgWithRegexFallback(input);
    }

    const walk = (node: Element): void => {
      const children = Array.from(node.children);
      for (const child of children) {
        const tag = child.tagName.toLowerCase();
        if (!ALLOWED_SVG_TAGS.has(tag)) {
          child.remove();
          continue;
        }
        walk(child);
      }

      const attrs = Array.from(node.attributes);
      for (const attr of attrs) {
        const nameLower = attr.name.toLowerCase();
        if (
          nameLower.startsWith('on') ||
          !ALLOWED_SVG_ATTRS.has(nameLower) ||
          !isSafeSvgAttributeValue(nameLower, attr.value)
        ) {
          node.removeAttribute(attr.name);
        }
      }
    };

    walk(root);

    if (typeof XMLSerializer !== 'undefined') {
      return new XMLSerializer().serializeToString(root);
    }
    return root.outerHTML || '';
  } catch {
    return sanitizeSvgWithRegexFallback(input);
  }
}

const ALLOWED_PRINT_HTML_TAGS = new Set([
  'div',
  'span',
  'p',
  'br',
  'hr',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'strong',
  'b',
  'em',
  'i',
  'u',
  'small',
  'sub',
  'sup',
  'ul',
  'ol',
  'li',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'colgroup',
  'col',
  'section',
  'header',
  'footer',
  'article',
  'blockquote',
]);

const ALLOWED_PRINT_HTML_ATTRS = new Set([
  'class',
  'colspan',
  'rowspan',
  'scope',
  'dir',
  'lang',
  'aria-hidden',
]);

/**
 * Defense-in-depth HTML sanitizer for A4 printable lesson-plan and study-note markup.
 * Strips scripts, iframes, objects, SVGs, inline event handlers, and unsafe URLs.
 */
export function sanitizePrintableHtml(rawHtml: unknown): string {
  const input = String(rawHtml ?? '');
  if (!input) return '';

  const preStripped = input
    .replace(/<(script|iframe|object|embed|form|input|button|textarea|select|svg|math|link|meta|base)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<(script|iframe|object|embed|input|link|meta|base)\b[^>]*\/?>/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(javascript|vbscript)\s*:/gi, '');

  if (typeof DOMParser === 'undefined') {
    return preStripped;
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<body>${preStripped}</body>`, 'text/html');

    const walk = (parent: Element): void => {
      const children = Array.from(parent.children);
      for (const child of children) {
        const tag = child.tagName.toLowerCase();
        if (!ALLOWED_PRINT_HTML_TAGS.has(tag)) {
          child.remove();
          continue;
        }
        const attrs = Array.from(child.attributes);
        for (const attr of attrs) {
          const nameLower = attr.name.toLowerCase();
          if (nameLower.startsWith('on') || !ALLOWED_PRINT_HTML_ATTRS.has(nameLower)) {
            child.removeAttribute(attr.name);
          }
        }
        walk(child);
      }
    };

    walk(doc.body);
    return doc.body.innerHTML;
  } catch {
    return preStripped;
  }
}
