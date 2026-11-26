import { GoogleGenAI, Type } from '@google/genai';

export type AiToolId =
  | 'pdf_maker'
  | 'image_generator'
  | 'worksheet_generator'
  | 'question_paper_generator'
  | 'notes_generator'
  | 'presentation_maker'
  | 'quiz_generator'
  | 'resume_maker'
  | 'letter_generator'
  | 'content_generator';

export interface AiServiceStatus {
  configured: boolean;
  textModel: string;
  imageModel: string;
  message: string;
}

const VALID_TEXT_TOOLS = new Set<AiToolId>([
  'pdf_maker',
  'worksheet_generator',
  'question_paper_generator',
  'notes_generator',
  'presentation_maker',
  'quiz_generator',
  'resume_maker',
  'letter_generator',
  'content_generator',
]);

const AI_WINDOW_MS = 10 * 60 * 1000;
const MAX_AI_REQUESTS_PER_IP = 30;
const ipAiRequestLog = new Map<string, number[]>();

function checkIpRateLimit(ip: string): boolean {
  const now = Date.now();
  const list = (ipAiRequestLog.get(ip) || []).filter((ts) => now - ts < AI_WINDOW_MS);
  if (list.length >= MAX_AI_REQUESTS_PER_IP) {
    ipAiRequestLog.set(ip, list);
    return false;
  }
  list.push(now);
  ipAiRequestLog.set(ip, list);
  return true;
}

export function getConfiguredGeminiKey(): string {
  const raw = String(process.env.GEMINI_API_KEY || '')
    .trim()
    .replace(/^["']+|["']+$/g, '')
    .trim();
  if (!raw) return '';
  const upper = raw.toUpperCase();
  if (
    upper.includes('MY_GEMINI_API_KEY') ||
    upper.includes('YOUR_') ||
    upper.includes('REPLACE_') ||
    upper.includes('EXAMPLE_')
  ) {
    return '';
  }
  return raw;
}

function createServerGeminiClient(apiKey: string): GoogleGenAI {
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export function getAiServiceStatus(): AiServiceStatus {
  const configured = Boolean(getConfiguredGeminiKey());
  return {
    configured,
    textModel: 'gemini-4-hydrogen',
    imageModel: 'gemini-3.1-flash-lite-image',
    message: configured
      ? 'Server Gemini AI runtime is configured and ready.'
      : 'GEMINI_API_KEY is not configured in Settings -> Secrets on the server. Live AI generation is disabled (zero fake outputs).',
  };
}

export async function handleAiTextGenerate(
  body: Record<string, unknown>,
  clientIp: string
): Promise<{ statusCode: number; payload: Record<string, unknown> }> {
  if (!checkIpRateLimit(clientIp)) {
    return {
      statusCode: 429,
      payload: {
        success: false,
        errorCode: 'RATE_LIMITED',
        message: 'Too many AI requests from this connection. Please wait a few minutes and retry.',
      },
    };
  }

  const apiKey = getConfiguredGeminiKey();
  if (!apiKey) {
    return {
      statusCode: 503,
      payload: {
        success: false,
        errorCode: 'MISSING_GEMINI_API_KEY',
        message:
          'GEMINI_API_KEY is not configured on the server. Add GEMINI_API_KEY in Settings -> Secrets to run real AI generation.',
      },
    };
  }

  const toolId = String(body.toolId || '').trim() as AiToolId;
  if (!VALID_TEXT_TOOLS.has(toolId)) {
    return {
      statusCode: 400,
      payload: {
        success: false,
        errorCode: 'INVALID_TOOL_ID',
        message: 'Requested AI toolId is invalid.',
      },
    };
  }

  const topic = String(body.topic || body.prompt || '').trim().slice(0, 1200);
  const board = String(body.board || 'Maharashtra').trim().slice(0, 40);
  const classLevel = String(body.classLevel || 'Class 5').trim().slice(0, 30);
  const subject = String(body.subject || 'Mathematics').trim().slice(0, 80);
  const language = String(body.language || 'English').trim().slice(0, 30);
  const instructions = String(body.instructions || '').trim().slice(0, 800);
  const count = Math.min(Math.max(Number(body.count) || 5, 1), 20);

  if (!topic) {
    return {
      statusCode: 400,
      payload: {
        success: false,
        errorCode: 'MISSING_PROMPT',
        message: 'Please enter a topic, prompt, or document request before generating.',
      },
    };
  }

  const ai = createServerGeminiClient(apiKey);

  try {
    if (toolId === 'quiz_generator') {
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: `Generate ${count} original, accurate multiple-choice quiz questions in ${language} for ${board} Board ${classLevel} ${subject} on the topic "${topic}". ${instructions}`,
        config: {
          systemInstruction:
            'You are a strict Indian school academic curriculum author. Ensure factual and mathematical accuracy. Return valid JSON matching the schema.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    correctIndex: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                  },
                },
              },
            },
          },
        },
      });

      const parsed = JSON.parse((response.text || '{}').trim());
      return {
        statusCode: 200,
        payload: {
          success: true,
          toolId,
          model: 'gemini-4-hydrogen',
          structured: parsed,
        },
      };
    }

    if (toolId === 'presentation_maker') {
      const slideCount = Math.min(Math.max(count, 3), 12);
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: `Create a ${slideCount}-slide educational presentation deck in ${language} for ${board} ${classLevel} ${subject} on "${topic}". Include concise bullet points and practical speaker notes for each slide. ${instructions}`,
        config: {
          systemInstruction:
            'You create classroom-ready structured slide decks with clear bullet points and teacher/student speaker notes.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              subtitle: { type: Type.STRING },
              slides: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    slideNumber: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    bullets: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    speakerNotes: { type: Type.STRING },
                  },
                },
              },
            },
          },
        },
      });

      const parsed = JSON.parse((response.text || '{}').trim());
      return {
        statusCode: 200,
        payload: {
          success: true,
          toolId,
          model: 'gemini-4-hydrogen',
          structured: parsed,
        },
      };
    }

    if (toolId === 'resume_maker') {
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: `Refine and structure an ATS-friendly academic/teaching/student resume based on these details: ${topic}. Additional focus: ${instructions}`,
        config: {
          systemInstruction:
            'You are a career coach for educators and students in India. Improve phrasing clearly without inventing fake degrees or employers not provided.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              summary: { type: Type.STRING },
              skills: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              highlights: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
          },
        },
      });

      const parsed = JSON.parse((response.text || '{}').trim());
      return {
        statusCode: 200,
        payload: {
          success: true,
          toolId,
          model: 'gemini-4-hydrogen',
          structured: parsed,
        },
      };
    }

    // Structured document output for PDF Maker, Worksheet, Question Paper, Notes, Letter, Content Generator
    const promptByTool: Record<string, string> = {
      pdf_maker: `Write a complete, well-structured educational PDF document in ${language} for ${board} ${classLevel} ${subject} titled/about "${topic}". Organize into clear sections suitable for direct PDF publication. ${instructions}`,
      worksheet_generator: `Create a printable classroom practice worksheet in ${language} for ${board} Board ${classLevel} ${subject} on "${topic}". Include varied sections (Fill in the Blanks, True/False, Short Questions, Problem Solving) AND a complete Answer Key section at the end. ${instructions}`,
      question_paper_generator: `Create a formal school examination Question Paper in ${language} aligned to ${board} Board ${classLevel} ${subject} covering "${topic}". Include Paper Header (Time, Total Marks), Section A (MCQs/Objective), Section B (Short Answer), Section C (Long Answer/Application), and a Complete Marking Scheme / Answer Key section. ${instructions}`,
      notes_generator: `Write comprehensive, student-friendly Chapter Revision Notes in ${language} for ${board} Board ${classLevel} ${subject} on "${topic}". Include Overview, Key Concepts & Definitions, Important Formulas/Rules, Worked Examples, and Quick Revision Bullets. ${instructions}`,
      letter_generator: `Write a formal, clear, ready-to-send school/educational letter in ${language} for the request: "${topic}". Include Date placeholder, Recipient block, Subject line, clear body paragraphs, and Sign-off. ${instructions}`,
      content_generator: `Create engaging, original educational content in ${language} for ${board} ${classLevel} ${subject} on "${topic}". Additional context: ${instructions}`,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: promptByTool[toolId] || topic,
      config: {
        systemInstruction:
          'You are an expert Indian curriculum author and educational editor for MyStudyZone. Output clear structured JSON with title, subtitle, and well-organized sections.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  heading: { type: Type.STRING },
                  body: { type: Type.STRING },
                },
              },
            },
          },
        },
      },
    });

    const parsed = JSON.parse((response.text || '{}').trim());
    return {
      statusCode: 200,
      payload: {
        success: true,
        toolId,
        model: 'gemini-4-hydrogen',
        structured: parsed,
      },
    };
  } catch (err: any) {
    const rawMsg = String(err?.message || err || 'AI generation failed');
    const upper = rawMsg.toUpperCase();
    const isAuthOrKey =
      upper.includes('API_KEY_INVALID') ||
      upper.includes('PERMISSION_DENIED') ||
      upper.includes('403') ||
      upper.includes('401');
    const isQuota = upper.includes('RESOURCE_EXHAUSTED') || upper.includes('429');

    return {
      statusCode: isAuthOrKey ? 403 : isQuota ? 429 : 502,
      payload: {
        success: false,
        errorCode: isAuthOrKey
          ? 'API_KEY_INVALID'
          : isQuota
          ? 'RESOURCE_EXHAUSTED'
          : 'AI_UPSTREAM_ERROR',
        message: isAuthOrKey
          ? 'Server Gemini API key was rejected or lacks permission. Please verify GEMINI_API_KEY in Settings -> Secrets.'
          : isQuota
          ? 'Gemini API quota exceeded. Please try again later or upgrade API tier in Settings -> Secrets.'
          : `Gemini AI request failed: ${rawMsg}`,
      },
    };
  }
}

export async function handleAiImageGenerate(
  body: Record<string, unknown>,
  clientIp: string
): Promise<{ statusCode: number; payload: Record<string, unknown> }> {
  if (!checkIpRateLimit(clientIp)) {
    return {
      statusCode: 429,
      payload: {
        success: false,
        errorCode: 'RATE_LIMITED',
        message: 'Too many AI image requests. Please wait a few minutes and retry.',
      },
    };
  }

  const apiKey = getConfiguredGeminiKey();
  if (!apiKey) {
    return {
      statusCode: 503,
      payload: {
        success: false,
        errorCode: 'MISSING_GEMINI_API_KEY',
        message:
          'GEMINI_API_KEY is not configured on the server. AI Image Generator requires a configured billing-enabled GEMINI_API_KEY in Settings -> Secrets.',
      },
    };
  }

  const prompt = String(body.prompt || '').trim().slice(0, 800);
  const style = String(body.style || 'Educational Illustration').trim().slice(0, 80);
  const aspectRaw = String(body.aspectRatio || '1:1').trim();
  const allowedRatios = new Set(['1:1', '3:4', '4:3', '9:16', '16:9']);
  const aspectRatio = allowedRatios.has(aspectRaw) ? aspectRaw : '1:1';

  if (!prompt) {
    return {
      statusCode: 400,
      payload: {
        success: false,
        errorCode: 'MISSING_PROMPT',
        message: 'Please describe the educational diagram or illustration you want to generate.',
      },
    };
  }

  const ai = createServerGeminiClient(apiKey);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [
          {
            text: `Create a clean, school-safe ${style} visual: ${prompt}`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio,
        },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts ?? [];
    let imageDataUrl = '';
    let caption = '';

    for (const part of parts) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType ?? 'image/png';
        imageDataUrl = `data:${mime};base64,${part.inlineData.data}`;
      } else if (part.text) {
        caption += part.text;
      }
    }

    if (!imageDataUrl) {
      return {
        statusCode: 502,
        payload: {
          success: false,
          errorCode: 'NO_IMAGE_RETURNED',
          message:
            caption ||
            'Gemini image model did not return an image asset for this prompt. Try refining your prompt.',
        },
      };
    }

    return {
      statusCode: 200,
      payload: {
        success: true,
        model: 'gemini-3.1-flash-lite-image',
        aspectRatio,
        imageDataUrl,
        caption,
      },
    };
  } catch (err: any) {
    const rawMsg = String(err?.message || err || 'AI image generation failed');
    const upper = rawMsg.toUpperCase();
    const isPaidOrPerm =
      upper.includes('BILLING') ||
      upper.includes('PAID') ||
      upper.includes('PERMISSION_DENIED') ||
      upper.includes('403') ||
      upper.includes('RESOURCE_EXHAUSTED');

    return {
      statusCode: isPaidOrPerm ? 403 : 502,
      payload: {
        success: false,
        errorCode: isPaidOrPerm ? 'PAID_KEY_REQUIRED' : 'IMAGE_UPSTREAM_ERROR',
        message: isPaidOrPerm
          ? `Image generation model (gemini-3.1-flash-lite-image) requires a billing-enabled / paid GEMINI_API_KEY in Settings -> Secrets. (${rawMsg})`
          : `Gemini Image API error: ${rawMsg}`,
      },
    };
  }
}
