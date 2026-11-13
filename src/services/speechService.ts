// Complete Story Audio & Reading Speed Narration Engine
// Supports All 45 Regular Stories & All 50 Chhatrapati Shivaji Maharaj Stories
// Across English (en-IN), Hindi (hi-IN), and Marathi (mr-IN)

export type StoryLanguage = 'English' | 'Hindi' | 'Marathi';

export type PlaybackStatus = 'idle' | 'playing' | 'paused' | 'stopped' | 'completed';

export interface ReadingSpeedOption {
  value: number;
  label: string;
  shortLabel: string;
}

export const READING_SPEED_OPTIONS: readonly ReadingSpeedOption[] = [
  { value: 0.5, label: '0.5x – Very Slow', shortLabel: '0.5x (Very Slow)' },
  { value: 0.75, label: '0.75x – Slow', shortLabel: '0.75x (Slow)' },
  { value: 1.0, label: '1.0x – Normal', shortLabel: '1.0x (Normal)' },
  { value: 1.25, label: '1.25x – Fast', shortLabel: '1.25x (Fast)' },
  { value: 1.5, label: '1.5x – Faster', shortLabel: '1.5x (Faster)' },
  { value: 2.0, label: '2.0x – Very Fast', shortLabel: '2.0x (Very Fast)' },
] as const;

export function getReadingSpeedLabel(rate: number): string {
  const found = READING_SPEED_OPTIONS.find(opt => Math.abs(opt.value - rate) < 0.03);
  return found ? found.label : `${rate}x`;
}

export interface SpeechChunk {
  chunkIndex: number;
  paragraphIndex: number;
  sentenceIndex: number;
  text: string;
  rawSentence: string;
}

export interface SpeechParagraphState {
  isPlaying: boolean;
  isPaused: boolean;
  status: PlaybackStatus;
  currentParagraphIndex: number;
  totalParagraphs: number;
  currentSentenceIndex: number;
  totalSentencesInParagraph: number;
  currentChunkIndex: number;
  totalChunks: number;
  activeSentenceText?: string;
  progressPercent: number;
  rate: number;
  voiceName?: string;
  voiceLang?: string;
  voiceWarning?: string;
  error?: string;
}

// Phonetic Devanagari map for inline English historical locations/years in Marathi & Hindi Shivaji stories
// Ensures Marathi/Hindi TTS voices never switch to an English voice mid-sentence while keeping on-screen text unchanged
const DEVANAGARI_LOCATION_PHONETICS: Record<string, { Marathi: string; Hindi: string }> = {
  'Shivneri Fort, Junnar': { Marathi: 'शिवनेरी किल्ला, जुन्नर', Hindi: 'शिवनेरी दुर्ग, जुन्नर' },
  'Bangalore & Pune': { Marathi: 'बंगळुरू आणि पुणे', Hindi: 'बेंगलुरु और पुणे' },
  'Rohideshwar Temple, Bhor': { Marathi: 'रोहिडेश्वर मंदिर, भोर', Hindi: 'रोहिडेश्वर मंदिर, भोर' },
  'Torna Fort (Prachandgad)': { Marathi: 'तोरणा किल्ला प्रचंडगड', Hindi: 'तोरणा दुर्ग प्रचंडगढ़' },
  'Murumbdev / Rajgad': { Marathi: 'मुरुंबदेव राजगड', Hindi: 'मुरुंबदेव राजगढ़' },
  'Purandar Fort': { Marathi: 'पुरंदर किल्ला', Hindi: 'पुरंदर दुर्ग' },
  'Bijapur & Delhi': { Marathi: 'विजापूर आणि दिल्ली', Hindi: 'बीजापुर और दिल्ली' },
  'Dense Valley of Javli': { Marathi: 'जावळीचे घनदाट खोरे', Hindi: 'जावली की घनी घाटी' },
  'Pratapgad Fort': { Marathi: 'प्रतापगड किल्ला', Hindi: 'प्रतापगढ़ दुर्ग' },
  'Foot of Pratapgad': { Marathi: 'प्रतापगडाचा पायथा', Hindi: 'प्रतापगढ़ की तलहटी' },
  'Panhala Fort': { Marathi: 'पन्हाळगड किल्ला', Hindi: 'पन्हाला दुर्ग' },
  'Ghodkhind / Pavan Khind': { Marathi: 'घोडखिंड पावनखिंड', Hindi: 'घोडखिंड पावनखिंड' },
  'Pavan Khind Pass': { Marathi: 'पावनखिंड घाट', Hindi: 'पावनखिंड घाटी' },
  'Umberkhind Pass': { Marathi: 'उंबरखिंड घाट', Hindi: 'उंबरखिंड घाटी' },
  'Lal Mahal, Pune': { Marathi: 'लाल महाल, पुणे', Hindi: 'लाल महल, पुणे' },
  'Surat, Gujarat': { Marathi: 'सुरत, गुजरात', Hindi: 'सूरत, गुजरात' },
  'Sindhudurg, Malvan': { Marathi: 'सिंधुदुर्ग, मालवण', Hindi: 'सिंधुदुर्ग, मालवण' },
  'Purandar Camp': { Marathi: 'पुरंदर तळ', Hindi: 'पुरंदर शिविर' },
  'Agra Imperial Court': { Marathi: 'आग्रा मुघल दरबार', Hindi: 'आगरा शाही दरबार' },
  'Agra Prisoner Camp': { Marathi: 'आग्रा कैदखाना', Hindi: 'आगरा बंदीगृह' },
  'Varanasi to Rajgad': { Marathi: 'वाराणसी ते राजगड', Hindi: 'वाराणसी से राजगढ़' },
  'Kondhana / Sinhagad': { Marathi: 'कोंढाणा सिंहगड', Hindi: 'कोंढाणा सिंहगढ़' },
  'Surat': { Marathi: 'सुरत', Hindi: 'सूरत' },
  'Kandesh & Salher': { Marathi: 'खानदेश आणि साल्हेर', Hindi: 'खानदेश और साल्हेर' },
  'Kanhoji Angre’s Bay': { Marathi: 'कान्होजी आंग्रे यांची खाडी', Hindi: 'कान्होजी आंग्रे की खाड़ी' },
  "Kanhoji Angre's Bay": { Marathi: 'कान्होजी आंग्रे यांची खाडी', Hindi: 'कान्होजी आंग्रे की खाड़ी' },
  'Kalyan Subah': { Marathi: 'कल्याण सुभा', Hindi: 'कल्याण सूबा' },
  'Nesari Pass': { Marathi: 'नेसरी खिंड', Hindi: 'नेसरी घाटी' },
  'Raigad Fort': { Marathi: 'रायगड किल्ला', Hindi: 'रायगढ़ दुर्ग' },
  'Deccan Valleys': { Marathi: 'दख्खनचे खोरे', Hindi: 'दक्कन की घाटियां' },
  'Gingee / Jinji, Tamil Nadu': { Marathi: 'जिंजी, तामिळनाडू', Hindi: 'जिंजी, तमिलनाडु' },
  'Bhaganagar (Hyderabad)': { Marathi: 'भागानगर हैदराबाद', Hindi: 'भागानगर हैदराबाद' },
  'Jinji Fort, Tamil Nadu': { Marathi: 'जिंजी किल्ला, तामिळनाडू', Hindi: 'जिंजी दुर्ग, तमिलनाडु' },
  'Vellore Fort, Tamil Nadu': { Marathi: 'वेल्लोर किल्ला, तामिळनाडू', Hindi: 'वेल्लोर दुर्ग, तमिलनाडु' },
  'Tiruvannamalai & Thanjavur': { Marathi: 'तिरुवन्नामलई आणि तंजावर', Hindi: 'तिरुवन्नामलई और तंजावुर' },
  'Belwadi Fort, Karnataka': { Marathi: 'बेलवडी किल्ला, कर्नाटक', Hindi: 'बेलवडी दुर्ग, कर्नाटक' },
  'Maharashtra': { Marathi: 'महाराष्ट्र', Hindi: 'महाराष्ट्र' },
  'Khanderi Island, Arabian Sea': { Marathi: 'खांदेरी बेट, अरबी समुद्र', Hindi: 'खांदेरी द्वीप, अरब सागर' },
  'Jalna & Aurangabad': { Marathi: 'जालना आणि औरंगाबाद', Hindi: 'जालना और औरंगाबाद' },
  'Raigad & Dehu': { Marathi: 'रायगड आणि देहू', Hindi: 'रायगढ़ और देहू' },
  'Sajjangad, Satara': { Marathi: 'सज्जनगड, सातारा', Hindi: 'सज्जनगढ़, सातारा' },
  'Across India & The World': { Marathi: 'संपूर्ण भारत आणि जगभरात', Hindi: 'संपूर्ण भारत और विश्व में' },
};

export class SpeechNarrator {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  // Retain utterance references to prevent browser Garbage Collection from dropping onend events
  private utterancePool: SpeechSynthesisUtterance[] = [];
  private voices: SpeechSynthesisVoice[] = [];

  // Story Paragraph, Sentence, and Chunk Queue
  private paragraphs: string[] = [];
  private paragraphSentences: string[][] = [];
  private chunks: SpeechChunk[] = [];
  private currentChunkIndex: number = 0;

  private currentLang: StoryLanguage = 'English';
  private activeParagraphIndex: number = 0;
  private activeSentenceIndex: number = 0;

  private isPlaying: boolean = false;
  private isPaused: boolean = false;
  private status: PlaybackStatus = 'idle';
  private rate: number = 1.0;
  private volume: number = 1.0;
  private rateChangedWhilePaused: boolean = false;

  // Concurrency & Watchdog Tokens
  private sessionToken: number = 0;
  private activeChunkToken: number = 0;
  private sentenceTimer: any = null;
  private monitorInterval: any = null;
  private chunkStartTime: number = 0;
  private hasCurrentChunkStarted: boolean = false;
  private silentIdleTicks: number = 0;
  private chunkRetryCount: number = 0;

  private onStateChange?: (state: SpeechParagraphState) => void;
  private onCompleteCallback?: () => void;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => {
          this.loadVoices();
        };
      }
    }
  }

  public loadVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    try {
      const loaded = this.synth.getVoices();
      if (loaded && loaded.length > 0) {
        this.voices = loaded;
      }
    } catch (e) {
      console.warn('Unable to load speech voices:', e);
    }
    return this.voices;
  }

  /**
   * Waits for browser voices to populate before starting narration.
   * Also waits briefly if regional Indian voices (mr-IN, hi-IN, en-IN) are still loading asynchronously.
   */
  public async ensureVoicesLoaded(targetLang?: StoryLanguage): Promise<void> {
    if (!this.synth) return;
    this.loadVoices();

    const hasMatchingVoice = () => {
      if (this.voices.length === 0) return false;
      if (!targetLang) return true;
      return this.selectBestVoice(targetLang) !== null;
    };

    if (hasMatchingVoice()) return;

    await new Promise<void>(resolve => {
      let attempts = 0;
      const maxAttempts = 12; // Up to 600ms
      const timer = setInterval(() => {
        attempts++;
        this.loadVoices();
        if (hasMatchingVoice() || (this.voices.length > 0 && attempts >= 6) || attempts >= maxAttempts) {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  }

  private normalizeLangTag(langTag: string | undefined | null): string {
    return (langTag || '').replace(/_/g, '-').toLowerCase().trim();
  }

  /**
   * Selects a natural, fluent, clear language-specific voice for English, Hindi, or Marathi.
   * CRITICAL: NEVER returns an English voice for Hindi or Marathi stories.
   */
  public selectBestVoice(lang: StoryLanguage): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    if (this.voices.length === 0) {
      this.loadVoices();
    }
    if (this.voices.length === 0) return null;

    const isExplicitMaleName = (name: string) => {
      const n = name.toLowerCase();
      return (
        (/\bmale\b/.test(n) && !n.includes('female')) ||
        n.includes('madhav') ||
        n.includes('hemant') ||
        n.includes('prabhat') ||
        n.includes('niraj') ||
        n.includes('ravi') ||
        n.includes('rishi') ||
        n.includes('valluvar') ||
        n.includes('david') ||
        n.includes('mark') ||
        n.includes('george') ||
        n.includes('daniel') ||
        n.includes('james') ||
        n.includes('richard') ||
        n.includes('guy') ||
        n.includes('christopher') ||
        n.includes('eric') ||
        n.includes('roger') ||
        n.includes('steffan') ||
        n.includes('alex') ||
        n.includes('fred') ||
        n.includes('thomas') ||
        n.includes('oliver')
      );
    };

    const isPreferredFemaleName = (name: string) => {
      const n = name.toLowerCase();
      return (
        n.includes('female') ||
        n.includes('aarohi') ||
        n.includes('manasi') ||
        n.includes('shambhavi') ||
        n.includes('swara') ||
        n.includes('kalpana') ||
        n.includes('neerja') ||
        n.includes('heera') ||
        n.includes('veena') ||
        n.includes('raveena') ||
        n.includes('aditi') ||
        n.includes('priya') ||
        n.includes('lekha') ||
        n.includes('kanya') ||
        n.includes('sangeeta') ||
        n.includes('samantha') ||
        n.includes('sonia') ||
        n.includes('aria') ||
        n.includes('jenny') ||
        n.includes('libby') ||
        n.includes('clara') ||
        n.includes('natasha') ||
        n.includes('karen') ||
        n.includes('moira') ||
        n.includes('tessa') ||
        n.includes('victoria') ||
        n.includes('zira') ||
        // Android TTS female voice network/local identifiers
        n.includes('mrf-network') ||
        n.includes('mrf-local') ||
        n.includes('hif-network') ||
        n.includes('hif-local') ||
        n.includes('end-network') ||
        n.includes('enf-network')
      );
    };

    if (lang === 'Marathi') {
      // 1. Native Marathi (mr-IN / mr) voices
      const mrVoices = this.voices.filter(v => {
        const l = this.normalizeLangTag(v.lang);
        const n = v.name.toLowerCase();
        return (
          l.startsWith('mr') ||
          n.includes('marathi') ||
          v.name.includes('मराठी') ||
          n.includes('aarohi') ||
          n.includes('manasi')
        );
      });

      const mrFemale = mrVoices.find(v => isPreferredFemaleName(v.name) && !isExplicitMaleName(v.name));
      if (mrFemale) return mrFemale;

      const mrNonMale = mrVoices.find(v => !isExplicitMaleName(v.name));
      if (mrNonMale) return mrNonMale;
      if (mrVoices.length > 0) return mrVoices[0];

      // 2. Fluent Devanagari (hi-IN / sa-IN / kok-IN) Female voice fallback (reads Devanagari Marathi script naturally)
      const devanagariVoices = this.voices.filter(v => {
        const l = this.normalizeLangTag(v.lang);
        const n = v.name.toLowerCase();
        return (
          l.startsWith('hi') ||
          l.startsWith('sa') ||
          l.startsWith('kok') ||
          n.includes('hindi') ||
          v.name.includes('हिन्दी') ||
          v.name.includes('हिंदी') ||
          n.includes('swara') ||
          n.includes('kalpana') ||
          n.includes('lekha')
        );
      });

      const devFemale = devanagariVoices.find(v => isPreferredFemaleName(v.name) && !isExplicitMaleName(v.name));
      if (devFemale) return devFemale;

      const devNonMale = devanagariVoices.find(v => !isExplicitMaleName(v.name));
      if (devNonMale) return devNonMale;
      if (devanagariVoices.length > 0) return devanagariVoices[0];

      // STRICT: Never return an English voice for Marathi!
      return null;
    }

    if (lang === 'Hindi') {
      // 1. Native Hindi (hi-IN / hi) voices
      const hiVoices = this.voices.filter(v => {
        const l = this.normalizeLangTag(v.lang);
        const n = v.name.toLowerCase();
        return (
          l.startsWith('hi') ||
          n.includes('hindi') ||
          v.name.includes('हिन्दी') ||
          v.name.includes('हिंदी') ||
          n.includes('swara') ||
          n.includes('kalpana') ||
          n.includes('lekha')
        );
      });

      const hiFemale = hiVoices.find(v => isPreferredFemaleName(v.name) && !isExplicitMaleName(v.name));
      if (hiFemale) return hiFemale;

      const hiNonMale = hiVoices.find(v => !isExplicitMaleName(v.name));
      if (hiNonMale) return hiNonMale;
      if (hiVoices.length > 0) return hiVoices[0];

      // 2. Secondary Devanagari voice (mr-IN / sa-IN / ne-NP)
      const devVoices = this.voices.filter(v => {
        const l = this.normalizeLangTag(v.lang);
        return l.startsWith('mr') || l.startsWith('sa') || l.startsWith('ne');
      });
      const devNonMale = devVoices.find(v => !isExplicitMaleName(v.name));
      if (devNonMale) return devNonMale;
      if (devVoices.length > 0) return devVoices[0];

      // STRICT: Never return an English voice for Hindi!
      return null;
    }

    // English ('English')
    const allEnVoices = this.voices.filter(v => {
      const l = this.normalizeLangTag(v.lang);
      return l.startsWith('en');
    });

    // 1. Prioritize Indian English Female voices (en-IN, Neerja, Heera, Veena, Raveena, Aditi, Priya)
    const enInVoices = allEnVoices.filter(v => {
      const l = this.normalizeLangTag(v.lang);
      const n = v.name.toLowerCase();
      return (
        l.startsWith('en-in') ||
        n.includes('india') ||
        n.includes('neerja') ||
        n.includes('heera') ||
        n.includes('veena') ||
        n.includes('raveena') ||
        n.includes('aditi') ||
        n.includes('priya') ||
        n.includes('sangeeta') ||
        n.includes('kanya')
      );
    });

    const enInFemale = enInVoices.find(v => isPreferredFemaleName(v.name) && !isExplicitMaleName(v.name));
    if (enInFemale) return enInFemale;

    const enInNonMale = enInVoices.find(v => !isExplicitMaleName(v.name));
    if (enInNonMale) return enInNonMale;
    if (enInVoices.length > 0) return enInVoices[0];

    // 2. Expressive Female English voices (Google UK English Female, Sonia, Aria, Jenny, Samantha, Zira, Victoria, Karen)
    const globalFemale = allEnVoices.find(
      v =>
        (v.name.toLowerCase().includes('google uk english female') ||
          isPreferredFemaleName(v.name)) &&
        !isExplicitMaleName(v.name)
    );
    if (globalFemale) return globalFemale;

    // 3. Any non-male English voice
    const anyEnNonMale = allEnVoices.find(v => !isExplicitMaleName(v.name));
    if (anyEnNonMale) return anyEnNonMale;
    if (allEnVoices.length > 0) return allEnVoices[0];

    return null;
  }

  /**
   * Checks whether a suitable voice or mobile OS language engine is available for the given story language.
   */
  public getVoiceAvailabilityInfo(lang: StoryLanguage): {
    voice: SpeechSynthesisVoice | null;
    isNativeMatch: boolean;
    hasOSFallback: boolean;
    voiceLabel: string;
    warningMessage?: string;
  } {
    const voice = this.selectBestVoice(lang);
    const isAndroidOrMobile =
      typeof navigator !== 'undefined' && /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent || '');

    if (voice) {
      const normLang = this.normalizeLangTag(voice.lang);
      const isDevanagariFallbackForMarathi =
        lang === 'Marathi' && !normLang.startsWith('mr') && !voice.name.toLowerCase().includes('marathi');

      const defaultLabel =
        lang === 'Marathi'
          ? 'Indian Marathi Female Voice'
          : lang === 'Hindi'
          ? 'Indian Hindi Female Voice'
          : 'Indian English Female Voice';

      return {
        voice,
        isNativeMatch: !isDevanagariFallbackForMarathi,
        hasOSFallback: true,
        voiceLabel: `${defaultLabel} (${voice.name})`,
        warningMessage: undefined
      };
    }

    // If no voice object was listed in getVoices():
    // On Android/iOS or when getVoices() is empty, setting utterance.lang ('mr-IN' / 'hi-IN' / 'en-IN')
    // routes directly to the operating system's native TTS engine.
    if (this.voices.length === 0 || isAndroidOrMobile) {
      const label =
        lang === 'Marathi'
          ? 'System Marathi Voice (mr-IN)'
          : lang === 'Hindi'
          ? 'System Hindi Voice (hi-IN)'
          : 'System Indian English Voice (en-IN)';
      return {
        voice: null,
        isNativeMatch: true,
        hasOSFallback: true,
        voiceLabel: label,
        warningMessage: undefined
      };
    }

    // Desktop browser where getVoices() has voices (e.g., only en-US), and no Marathi/Hindi voice pack is installed:
    const langCode = lang === 'Marathi' ? 'mr-IN' : lang === 'Hindi' ? 'hi-IN' : 'en-IN';
    return {
      voice: null,
      isNativeMatch: false,
      hasOSFallback: false,
      voiceLabel: `${lang} (${langCode}) Voice Pack Required`,
      warningMessage: `A native ${lang} (${langCode}) voice was not found in your browser's speech voices. Using ${langCode} language tag — for best ${lang} pronunciation, please enable the ${lang} Text-to-Speech voice pack in your device settings.`
    };
  }

  /**
   * Splits a paragraph into complete, natural sentences without ever breaking inside abbreviations
   * (such as "इ.स.", "Dr.", "Mr.", "Mrs.", "St.", "No.", or decimals).
   * Used by both the UI (for live sentence highlighting) and the audio engine (for chunking)
   * so the highlighted sentence always matches the spoken passage 100%.
   */
  public splitParagraphIntoSentences(paragraph: string, _lang: StoryLanguage = 'English'): string[] {
    if (!paragraph || !paragraph.trim()) return [];

    const normalized = paragraph.replace(/\s+/g, ' ').trim();
    const DOT_PLACEHOLDER = '\u0000';

    // Protect periods inside abbreviations and numbers so we never split inside them
    let protectedText = normalized
      // Marathi & Hindi abbreviations (e.g. इ.स., पू.स., डॉ., सौ., श्री., चि., कु., प्रा., कै.)
      .replace(/इ\.स\./g, `इ${DOT_PLACEHOLDER}स${DOT_PLACEHOLDER}`)
      .replace(/पू\.स\./g, `पू${DOT_PLACEHOLDER}स${DOT_PLACEHOLDER}`)
      .replace(/(डॉ|सौ|श्री|चि|कु|प्रा|कै|क्र|प)\./g, `$1${DOT_PLACEHOLDER}`)
      // English abbreviations (e.g. Mr., Mrs., Ms., Dr., Prof., St., Sr., Jr., No., Rs., vs., etc.)
      .replace(/\b(Mr|Mrs|Ms|Dr|Prof|St|Sr|Jr|No|Rs|vs|etc|Fig|Gen|Col|Capt|Lt)\./gi, `$1${DOT_PLACEHOLDER}`)
      // Single uppercase initials like "A. P. J."
      .replace(/\b([A-Z])\./g, `$1${DOT_PLACEHOLDER}`)
      // Decimal numbers like 3.5
      .replace(/(\d)\.(\d)/g, `$1${DOT_PLACEHOLDER}$2`);

    // Split after sentence-ending punctuation (., !, ?, ।, ॥) optionally followed by closing quotes/brackets
    const rawSentences: string[] = [];
    const sentenceRegex = /[^.!?।॥]+(?:[.!?।॥]+["'”’)\]]*\s*|$)/g;
    let match: RegExpExecArray | null;

    while ((match = sentenceRegex.exec(protectedText)) !== null) {
      const restored = match[0].replace(/\u0000/g, '.').trim();
      if (restored.length > 0) {
        rawSentences.push(restored);
      }
    }

    if (rawSentences.length === 0) {
      return [normalized];
    }

    // Merge any tiny orphan fragment (< 10 chars, e.g. a standalone number or salutation) with the next sentence
    const mergedSentences: string[] = [];
    let carry = '';

    for (let i = 0; i < rawSentences.length; i++) {
      const current = carry ? `${carry} ${rawSentences[i]}` : rawSentences[i];
      if (current.length < 10 && i < rawSentences.length - 1) {
        carry = current;
      } else {
        mergedSentences.push(current);
        carry = '';
      }
    }
    if (carry) {
      if (mergedSentences.length > 0) {
        mergedSentences[mergedSentences.length - 1] += ` ${carry}`;
      } else {
        mergedSentences.push(carry);
      }
    }

    return mergedSentences;
  }

  /**
   * Prepares a sentence for natural TTS pronunciation without altering the displayed UI text.
   */
  private cleanTextForSpeech(sentence: string, lang: StoryLanguage): string {
    let cleaned = sentence
      .replace(/\s+/g, ' ')
      .replace(/["“”‘’«»]/g, '')
      .replace(/—/g, ', ')
      .replace(/–/g, ', ')
      .trim();

    if (lang === 'Marathi' || lang === 'Hindi') {
      // Replace inline English historical location names in Shivaji stories with Devanagari phonetics
      for (const [enLoc, phonetic] of Object.entries(DEVANAGARI_LOCATION_PHONETICS)) {
        if (cleaned.includes(enLoc)) {
          cleaned = cleaned.split(enLoc).join(lang === 'Marathi' ? phonetic.Marathi : phonetic.Hindi);
        }
      }

      // Expand "इ.स." and remove Latin "CE" so Marathi/Hindi TTS never switches to an English voice for "CE"
      if (lang === 'Marathi') {
        cleaned = cleaned
          .replace(/इ\.स\./g, 'इसवी सन')
          .replace(/\b(\d{3,4})\s*CE\s*to\s*Eternity\b/gi, '$1 पासून अनंतकाळापर्यंत')
          .replace(/\b(\d{3,4}(?:-\d{3,4})?)\s*CE\b/gi, '$1');
      } else {
        cleaned = cleaned
          .replace(/इ\.स\./g, 'ईस्वी सन')
          .replace(/\b(\d{3,4})\s*CE\s*to\s*Eternity\b/gi, '$1 से अनंतकाल तक')
          .replace(/\b(\d{3,4}(?:-\d{3,4})?)\s*CE\b/gi, '$1');
      }

      // Normalize Devanagari danda & punctuation for natural breathing pauses
      cleaned = cleaned
        .replace(/॥/g, '।')
        .replace(/\s*।\s*/g, '। ')
        .replace(/:\s*/g, ', ')
        .trim();
    }

    return cleaned;
  }

  /**
   * Divides a long sentence into manageable sub-chunks (<= 125 chars) at clause or word boundaries.
   * Guarantees that words are NEVER cut in the middle and no utterance ever hits the browser 15s cutoff
   * even at 0.5x Very Slow reading speed.
   */
  private splitSentenceIntoSafeSubChunks(cleanedSentence: string, maxLen: number = 125): string[] {
    const trimmed = cleanedSentence.trim();
    if (!trimmed) return [];
    if (trimmed.length <= maxLen) return [trimmed];

    // Step 1: Split on natural clause boundaries (, ; : )
    const clauseParts = trimmed
      .split(/(?<=[,;:])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const chunks: string[] = [];
    let buffer = '';

    const pushLongClauseByWords = (clause: string) => {
      const words = clause.split(/\s+/).filter(Boolean);
      let wordBuf = '';
      for (const word of words) {
        const candidate = wordBuf ? `${wordBuf} ${word}` : word;
        if (candidate.length <= maxLen) {
          wordBuf = candidate;
        } else {
          if (wordBuf) chunks.push(wordBuf);
          wordBuf = word;
        }
      }
      if (wordBuf) chunks.push(wordBuf);
    };

    for (const clause of clauseParts) {
      if (!buffer) {
        if (clause.length <= maxLen) {
          buffer = clause;
        } else {
          pushLongClauseByWords(clause);
        }
      } else {
        const combined = `${buffer} ${clause}`;
        if (combined.length <= maxLen) {
          buffer = combined;
        } else {
          chunks.push(buffer);
          buffer = '';
          if (clause.length <= maxLen) {
            buffer = clause;
          } else {
            pushLongClauseByWords(clause);
          }
        }
      }
    }

    if (buffer) {
      chunks.push(buffer);
    }

    return chunks.length > 0 ? chunks : [trimmed];
  }

  /**
   * Builds the complete ordered queue of sentence-based chunks across all paragraphs of the story.
   */
  private buildStoryChunks(paragraphs: string[], lang: StoryLanguage): void {
    this.paragraphs = paragraphs.filter(p => p && p.trim().length > 0);
    this.paragraphSentences = [];
    this.chunks = [];

    let globalChunkIdx = 0;

    for (let pIdx = 0; pIdx < this.paragraphs.length; pIdx++) {
      const paraText = this.paragraphs[pIdx];
      const sentences = this.splitParagraphIntoSentences(paraText, lang);
      this.paragraphSentences.push(sentences);

      for (let sIdx = 0; sIdx < sentences.length; sIdx++) {
        const rawSentence = sentences[sIdx];
        const cleanedForSpeech = this.cleanTextForSpeech(rawSentence, lang);
        const subChunks = this.splitSentenceIntoSafeSubChunks(cleanedForSpeech, 125);

        for (const subText of subChunks) {
          if (subText.trim().length > 0) {
            this.chunks.push({
              chunkIndex: globalChunkIdx++,
              paragraphIndex: pIdx,
              sentenceIndex: sIdx,
              text: subText,
              rawSentence
            });
          }
        }
      }
    }
  }

  /**
   * Starts full story narration across all paragraphs from startParagraphIndex (default 0).
   */
  public async startStoryNarration(
    paragraphs: string[],
    lang: StoryLanguage,
    onStateUpdate: (state: SpeechParagraphState) => void,
    onFinished?: () => void,
    startParagraphIndex: number = 0
  ) {
    this.clearTimers();
    const token = ++this.sessionToken;
    this.activeChunkToken++;

    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }

    this.currentLang = lang;
    this.onStateChange = onStateUpdate;
    this.onCompleteCallback = onFinished;
    this.utterancePool = [];
    this.rateChangedWhilePaused = false;

    this.buildStoryChunks(paragraphs, lang);

    if (this.chunks.length === 0) {
      this.isPlaying = false;
      this.isPaused = false;
      this.status = 'idle';
      this.notifyState();
      return;
    }

    const safeStartPara = Math.max(0, Math.min(startParagraphIndex, this.paragraphs.length - 1));
    const firstChunkForPara = this.chunks.findIndex(c => c.paragraphIndex >= safeStartPara);
    this.currentChunkIndex = firstChunkForPara >= 0 ? firstChunkForPara : 0;
    this.activeParagraphIndex = this.chunks[this.currentChunkIndex].paragraphIndex;
    this.activeSentenceIndex = this.chunks[this.currentChunkIndex].sentenceIndex;

    this.isPlaying = true;
    this.isPaused = false;
    this.status = 'playing';
    this.notifyState();

    await this.ensureVoicesLoaded(lang);
    if (token !== this.sessionToken) return;

    this.startProgressionMonitor(token);

    // 55ms settle delay after synth.cancel() prevents Chromium/Android from swallowing the first speak() call
    this.sentenceTimer = setTimeout(() => {
      if (token === this.sessionToken && this.isPlaying && !this.isPaused) {
        this.speakCurrentChunk(token);
      }
    }, 55);
  }

  /**
   * Monitors speech progression every 200ms to guarantee that:
   * 1. If a browser finishes speaking a chunk (synth.speaking === false) but drops the onend event,
   *    we automatically advance to the next chunk without getting stuck!
   * 2. If a browser auto-pauses speech synthesis on mobile touch/scroll, we resume it seamlessly.
   * 3. If an utterance fails to start or hangs past its maximum duration, we recover automatically.
   */
  private startProgressionMonitor(token: number) {
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
    }

    this.monitorInterval = setInterval(() => {
      if (token !== this.sessionToken || !this.isPlaying || this.isPaused || !this.synth) {
        return;
      }

      const activeChunk = this.chunks[this.currentChunkIndex];
      if (!activeChunk) return;

      // If browser unexpectedly entered paused state while our player is in 'playing' state, resume it
      if (this.synth.paused && !this.isPaused) {
        try {
          this.synth.resume();
        } catch (e) {}
      }

      const speakingOrPending = this.synth.speaking || this.synth.pending;
      const elapsedMs = Date.now() - this.chunkStartTime;

      if (speakingOrPending) {
        this.hasCurrentChunkStarted = true;
        this.silentIdleTicks = 0;

        // Rate-adjusted safety timeout in case synth.speaking gets stuck true after audio finishes
        const maxDurationMs = Math.max(
          9000,
          Math.min(35000, Math.round((activeChunk.text.length * 150) / Math.max(0.5, this.rate)) + 4500)
        );
        if (elapsedMs > maxDurationMs) {
          const currentChunkTok = this.activeChunkToken;
          try {
            this.synth.cancel();
          } catch (e) {}
          this.advanceToNextChunk(token, currentChunkTok);
        }
      } else {
        // Not speaking and not pending
        this.silentIdleTicks++;

        // Case A: Utterance already started speaking and now synth.speaking is false for >= 400ms (2 ticks),
        // meaning the chunk finished speaking and the browser dropped the onend event!
        if (this.hasCurrentChunkStarted && this.silentIdleTicks >= 2) {
          this.advanceToNextChunk(token, this.activeChunkToken);
          return;
        }

        // Case B: Utterance never started speaking within 2200ms after synth.speak() was called
        if (!this.hasCurrentChunkStarted && elapsedMs > 2200) {
          if (this.chunkRetryCount < 1) {
            this.chunkRetryCount++;
            this.speakCurrentChunk(token);
          } else {
            this.advanceToNextChunk(token, this.activeChunkToken);
          }
        }
      }
    }, 200);
  }

  private speakCurrentChunk(token: number) {
    if (token !== this.sessionToken || !this.synth) return;

    if (this.currentChunkIndex >= this.chunks.length) {
      this.finishStoryNarration(token);
      return;
    }

    const chunk = this.chunks[this.currentChunkIndex];
    this.activeParagraphIndex = chunk.paragraphIndex;
    this.activeSentenceIndex = chunk.sentenceIndex;

    const chunkToken = ++this.activeChunkToken;
    this.chunkStartTime = Date.now();
    this.hasCurrentChunkStarted = false;
    this.silentIdleTicks = 0;

    const utterance = new SpeechSynthesisUtterance(chunk.text);
    this.currentUtterance = utterance;

    // Retain in pool so browser Garbage Collector never collects active utterance before onend fires
    this.utterancePool.push(utterance);
    if (this.utterancePool.length > 15) {
      this.utterancePool.shift();
    }

    const availability = this.getVoiceAvailabilityInfo(this.currentLang);
    if (availability.voice) {
      utterance.voice = availability.voice;
    }

    // Always use valid hyphenated BCP-47 language tag (fixes Android Chrome mr_IN / hi_IN / en_IN bug)
    if (this.currentLang === 'Marathi') {
      const vLang = availability.voice ? this.normalizeLangTag(availability.voice.lang) : '';
      utterance.lang = vLang.startsWith('hi') ? 'hi-IN' : 'mr-IN';
      utterance.pitch = 1.05;
    } else if (this.currentLang === 'Hindi') {
      utterance.lang = 'hi-IN';
      utterance.pitch = 1.04;
    } else {
      const vLang = availability.voice ? this.normalizeLangTag(availability.voice.lang) : '';
      utterance.lang = vLang.startsWith('en-') ? availability.voice!.lang.replace(/_/g, '-') : 'en-IN';
      utterance.pitch = 1.04;
    }

    // Apply exact selected reading speed (0.5x, 0.75x, 1.0x, 1.25x, 1.5x, 2.0x)
    utterance.rate = Math.max(0.5, Math.min(2.0, this.rate));
    utterance.volume = this.volume;

    this.notifyState();

    utterance.onstart = () => {
      if (token !== this.sessionToken || chunkToken !== this.activeChunkToken) return;
      this.hasCurrentChunkStarted = true;
      this.silentIdleTicks = 0;
      this.isPlaying = true;
      this.isPaused = false;
      this.status = 'playing';
      this.notifyState();
    };

    utterance.onend = () => {
      if (token !== this.sessionToken || chunkToken !== this.activeChunkToken) return;
      if (this.isPlaying && !this.isPaused) {
        this.advanceToNextChunk(token, chunkToken);
      }
    };

    utterance.onerror = (e) => {
      if (token !== this.sessionToken || chunkToken !== this.activeChunkToken) return;

      // Because all intentional cancels (pause, stop, setRate, jump) increment sessionToken or activeChunkToken
      // BEFORE calling synth.cancel(), any onerror reaching here while isPlaying && !isPaused is an unexpected
      // browser glitch. Retry once or advance so playback never stops mid-story!
      if (!this.isPlaying || this.isPaused) return;

      if (this.chunkRetryCount < 1 && e.error !== 'language-unavailable' && e.error !== 'voice-unavailable') {
        this.chunkRetryCount++;
        this.sentenceTimer = setTimeout(() => {
          if (token === this.sessionToken && this.isPlaying && !this.isPaused) {
            this.speakCurrentChunk(token);
          }
        }, 80);
        return;
      }

      this.advanceToNextChunk(token, chunkToken);
    };

    try {
      if (this.synth.paused) {
        this.synth.resume();
      }
      this.synth.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis speak notice:', err);
      this.advanceToNextChunk(token, chunkToken);
    }
  }

  private advanceToNextChunk(token: number, expectedChunkToken: number) {
    if (token !== this.sessionToken || expectedChunkToken !== this.activeChunkToken) return;

    // Immediately invalidate current chunkToken so duplicate onend + monitor callbacks cannot double-advance
    this.activeChunkToken++;
    this.chunkRetryCount = 0;

    const prevParagraphIdx = this.activeParagraphIndex;
    const prevSentenceIdx = this.activeSentenceIndex;

    this.currentChunkIndex++;

    if (this.currentChunkIndex >= this.chunks.length) {
      this.finishStoryNarration(token);
      return;
    }

    const nextChunk = this.chunks[this.currentChunkIndex];
    this.activeParagraphIndex = nextChunk.paragraphIndex;
    this.activeSentenceIndex = nextChunk.sentenceIndex;

    // Natural breathing pause: 220ms between paragraphs, 70ms between sentences, 25ms between sub-clauses
    const delayMs =
      nextChunk.paragraphIndex !== prevParagraphIdx
        ? 220
        : nextChunk.sentenceIndex !== prevSentenceIdx
        ? 70
        : 25;

    this.notifyState();

    if (this.sentenceTimer) {
      clearTimeout(this.sentenceTimer);
    }
    this.sentenceTimer = setTimeout(() => {
      if (token === this.sessionToken && this.isPlaying && !this.isPaused) {
        this.speakCurrentChunk(token);
      }
    }, delayMs);
  }

  private finishStoryNarration(token: number) {
    if (token !== this.sessionToken) return;
    this.clearTimers();
    this.isPlaying = false;
    this.isPaused = false;
    this.status = 'completed';
    this.activeParagraphIndex = Math.max(0, this.paragraphs.length - 1);
    this.currentChunkIndex = Math.max(0, this.chunks.length - 1);
    this.notifyState();
    this.onCompleteCallback?.();
  }

  private clearTimers() {
    if (this.sentenceTimer) {
      clearTimeout(this.sentenceTimer);
      this.sentenceTimer = null;
    }
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
      this.monitorInterval = null;
    }
  }

  private notifyState(error?: string) {
    const totalParas = Math.max(1, this.paragraphs.length);
    const totalChunks = Math.max(1, this.chunks.length);

    let progress = 0;
    if (this.status === 'completed') {
      progress = 100;
    } else if (this.chunks.length > 0 && (this.isPlaying || this.isPaused)) {
      progress = Math.min(99, Math.max(1, Math.round(((this.currentChunkIndex + 1) / totalChunks) * 100)));
    }

    const currentParaSentences = this.paragraphSentences[this.activeParagraphIndex] || [];
    const activeChunk = this.chunks[this.currentChunkIndex];
    const availability = this.getVoiceAvailabilityInfo(this.currentLang);

    this.onStateChange?.({
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      status: this.status,
      currentParagraphIndex: Math.min(this.activeParagraphIndex, Math.max(0, this.paragraphs.length - 1)),
      totalParagraphs: totalParas,
      currentSentenceIndex: this.activeSentenceIndex,
      totalSentencesInParagraph: Math.max(1, currentParaSentences.length),
      currentChunkIndex: this.currentChunkIndex,
      totalChunks: this.chunks.length,
      activeSentenceText: activeChunk?.rawSentence || currentParaSentences[this.activeSentenceIndex] || '',
      progressPercent: progress,
      rate: this.rate,
      voiceName: availability.voiceLabel,
      voiceLang: availability.voice?.lang?.replace(/_/g, '-') || (this.currentLang === 'Marathi' ? 'mr-IN' : this.currentLang === 'Hindi' ? 'hi-IN' : 'en-IN'),
      voiceWarning: availability.warningMessage,
      error
    });
  }

  public pause() {
    this.clearTimers();
    this.activeChunkToken++;

    if (this.synth && (this.synth.speaking || this.isPlaying)) {
      try {
        this.synth.pause();
      } catch (e) {}
      this.isPaused = true;
      this.isPlaying = false;
      this.status = 'paused';
      this.notifyState();
    }
  }

  public resume() {
    if (!this.synth) return;

    if (this.isPaused && this.chunks.length > 0) {
      this.isPaused = false;
      this.isPlaying = true;
      this.status = 'playing';
      const token = ++this.sessionToken;
      this.startProgressionMonitor(token);
      this.notifyState();

      // If speed was changed while paused, or if browser cleared its internal paused state,
      // re-speak the current chunk cleanly from currentChunkIndex at the current rate.
      if (!this.rateChangedWhilePaused && this.synth.paused && this.synth.speaking) {
        try {
          this.chunkStartTime = Date.now();
          this.synth.resume();
          return;
        } catch (e) {}
      }

      this.rateChangedWhilePaused = false;
      try {
        this.synth.cancel();
      } catch (e) {}

      this.sentenceTimer = setTimeout(() => {
        if (token === this.sessionToken && this.isPlaying && !this.isPaused) {
          this.speakCurrentChunk(token);
        }
      }, 50);
    } else if (!this.isPlaying && this.chunks.length > 0) {
      const token = ++this.sessionToken;
      if (this.status === 'completed' || this.currentChunkIndex >= this.chunks.length) {
        this.currentChunkIndex = 0;
        this.activeParagraphIndex = 0;
        this.activeSentenceIndex = 0;
      }
      this.isPlaying = true;
      this.isPaused = false;
      this.status = 'playing';
      this.startProgressionMonitor(token);
      this.speakCurrentChunk(token);
    }
  }

  public restart() {
    if (this.paragraphs.length === 0) return;
    this.clearTimers();
    const token = ++this.sessionToken;
    this.activeChunkToken++;

    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }

    this.currentChunkIndex = 0;
    this.activeParagraphIndex = 0;
    this.activeSentenceIndex = 0;
    this.chunkRetryCount = 0;
    this.isPlaying = true;
    this.isPaused = false;
    this.status = 'playing';
    this.startProgressionMonitor(token);
    this.notifyState();

    this.sentenceTimer = setTimeout(() => {
      if (token === this.sessionToken && this.isPlaying && !this.isPaused) {
        this.speakCurrentChunk(token);
      }
    }, 55);
  }

  public nextParagraph() {
    if (this.activeParagraphIndex < this.paragraphs.length - 1) {
      this.jumpToParagraph(this.activeParagraphIndex + 1);
    }
  }

  public previousParagraph() {
    if (this.activeParagraphIndex > 0) {
      this.jumpToParagraph(this.activeParagraphIndex - 1);
    } else {
      this.restart();
    }
  }

  public jumpToParagraph(paragraphIndex: number) {
    if (paragraphIndex >= 0 && paragraphIndex < this.paragraphs.length && this.chunks.length > 0) {
      this.clearTimers();
      const token = ++this.sessionToken;
      this.activeChunkToken++;

      if (this.synth) {
        try {
          this.synth.cancel();
        } catch (e) {}
      }

      const targetChunkIdx = this.chunks.findIndex(c => c.paragraphIndex >= paragraphIndex);
      this.currentChunkIndex = targetChunkIdx >= 0 ? targetChunkIdx : 0;
      this.activeParagraphIndex = this.chunks[this.currentChunkIndex].paragraphIndex;
      this.activeSentenceIndex = this.chunks[this.currentChunkIndex].sentenceIndex;
      this.chunkRetryCount = 0;
      this.isPlaying = true;
      this.isPaused = false;
      this.status = 'playing';

      this.startProgressionMonitor(token);
      this.notifyState();

      this.sentenceTimer = setTimeout(() => {
        if (token === this.sessionToken && this.isPlaying && !this.isPaused) {
          this.speakCurrentChunk(token);
        }
      }, 55);
    }
  }

  /**
   * Immediately updates the reading speed (0.5x, 0.75x, 1.0x, 1.25x, 1.5x, 2.0x).
   * If currently playing, immediately restarts the active chunk at the new speed.
   * Remains active across all remaining chunks and paragraphs.
   */
  public setRate(newRate: number) {
    const parsed = Number(newRate);
    if (Number.isNaN(parsed)) return;

    this.rate = Math.max(0.5, Math.min(2.0, parsed));

    if (this.isPlaying && !this.isPaused && this.chunks.length > 0) {
      this.clearTimers();
      const token = ++this.sessionToken;
      this.activeChunkToken++;

      if (this.synth) {
        try {
          this.synth.cancel();
        } catch (e) {}
      }

      this.startProgressionMonitor(token);
      this.notifyState();

      this.sentenceTimer = setTimeout(() => {
        if (token === this.sessionToken && this.isPlaying && !this.isPaused) {
          this.speakCurrentChunk(token);
        }
      }, 50);
    } else if (this.isPaused) {
      this.rateChangedWhilePaused = true;
      this.notifyState();
    } else {
      this.notifyState();
    }
  }

  public getRate(): number {
    return this.rate;
  }

  public setVolume(newVolume: number) {
    this.volume = Math.max(0, Math.min(1.0, newVolume));
    if (this.currentUtterance) {
      this.currentUtterance.volume = this.volume;
    }
  }

  public stop() {
    this.clearTimers();
    this.sessionToken++;
    this.activeChunkToken++;

    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
      this.currentUtterance = null;
    }

    this.utterancePool = [];
    this.isPlaying = false;
    this.isPaused = false;
    this.status = 'stopped';
    this.currentChunkIndex = 0;
    this.activeParagraphIndex = 0;
    this.activeSentenceIndex = 0;
    this.rateChangedWhilePaused = false;
    this.notifyState();
  }

  public retry() {
    if (this.chunks.length === 0) return;
    this.clearTimers();
    const token = ++this.sessionToken;
    this.activeChunkToken++;

    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }

    this.isPlaying = true;
    this.isPaused = false;
    this.status = 'playing';
    this.startProgressionMonitor(token);
    this.notifyState();

    this.sentenceTimer = setTimeout(() => {
      if (token === this.sessionToken && this.isPlaying && !this.isPaused) {
        this.speakCurrentChunk(token);
      }
    }, 55);
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }
}

export const speechService = new SpeechNarrator();
