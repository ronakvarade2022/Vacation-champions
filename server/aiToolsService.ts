import { Type } from '@google/genai';
import {
  GEMINI_FALLBACK_MODEL,
  GEMINI_IMAGE_MODEL,
  GEMINI_PRIMARY_MODEL,
  createGeminiServerClient,
  generateGeminiContentWithFallback,
  getConfiguredGeminiApiKey,
  mapGeminiHttpError,
} from './geminiClient.ts';
import {
  assertModelAllowedByFreePolicy,
  checkFreeTierPolicyQuota,
  getGlobalBillingStatus,
  getPaidFeatureProposals,
  getPublicFreePolicySummary,
  isPaidExecutionEnabledForFeature,
  recordBlockedPaidAttempt,
  type AiFeatureCategory,
} from './aiPolicyManager.ts';
import { verifyBearerIdToken } from '../firebase/admin.ts';

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
  | 'content_generator'
  | 'teacher_productivity_tool'
  | 'student_learning_tool';

export type RoleToolOutputKind = 'document' | 'table' | 'slides' | 'quiz' | 'flashcards';

export interface AiServiceStatus {
  configured: boolean;
  textModel: string;
  fallbackModel: string;
  imageModel: string;
  billingStatus: 'FREE_ONLY' | 'PAID_APPROVED';
  freeOnlyEnforced: boolean;
  paidServicesEnabled: boolean;
  billingActivated: boolean;
  imageGenerationAllowed: boolean;
  dailyQuotaUsedPct: number;
  quotaResetAt: string;
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
  'teacher_productivity_tool',
  'student_learning_tool',
]);

async function resolveUserKeyForQuota(
  headers: Record<string, string | string[] | undefined> | undefined,
  clientIp: string
): Promise<string> {
  const authHeader = headers?.authorization || headers?.Authorization;
  if (authHeader) {
    const verified = await verifyBearerIdToken(authHeader).catch(() => null);
    if (verified?.valid && verified.uid) {
      return `uid:${verified.uid}`;
    }
  }
  return `ip:${String(clientIp || 'unknown').trim()}`;
}

function resolveTelemetryCategory(
  toolId: AiToolId,
  roleToolId: string
): Exclude<AiFeatureCategory, 'image_generation'> {
  const cleanRoleId = roleToolId.trim().toLowerCase();
  if (cleanRoleId === 's_dictionary' || cleanRoleId === 's_translation') {
    return 'dictionary_translation';
  }
  if (toolId === 'student_learning_tool') return 'student_ai';
  if (toolId === 'teacher_productivity_tool') return 'teacher_ai';
  return 'core_ai';
}

/**
 * Re-exported from centralized server/geminiClient.ts for backwards compatibility.
 */
export function getConfiguredGeminiKey(): string {
  return getConfiguredGeminiApiKey();
}

export function getAiServiceStatus(): AiServiceStatus {
  const configured = Boolean(getConfiguredGeminiApiKey());
  const policy = getPublicFreePolicySummary();
  return {
    configured,
    textModel: GEMINI_PRIMARY_MODEL,
    fallbackModel: GEMINI_FALLBACK_MODEL,
    imageModel: GEMINI_IMAGE_MODEL,
    billingStatus: policy.billingStatus,
    freeOnlyEnforced: policy.freeOnlyEnforced,
    paidServicesEnabled: policy.paidServicesEnabled,
    billingActivated: policy.billingActivated,
    imageGenerationAllowed: policy.imageGenerationAllowed,
    dailyQuotaUsedPct: policy.dailyQuotaUsedPct,
    quotaResetAt: policy.quotaResetAt,
    message: configured
      ? `FREE AI ONLY Mode Active (${GEMINI_PRIMARY_MODEL} + free-tier ${GEMINI_FALLBACK_MODEL} fallback). Paid models & automatic billing are blocked.`
      : 'GEMINI_API_KEY is not configured on the server. Live AI generation is disabled (FREE AI ONLY policy enforced; zero fake outputs).',
  };
}

export async function handleAiTextGenerate(
  body: Record<string, unknown>,
  clientIp: string,
  headers?: Record<string, string | string[] | undefined>
): Promise<{ statusCode: number; payload: Record<string, unknown> }> {
  const apiKey = getConfiguredGeminiApiKey();
  if (!apiKey) {
    return {
      statusCode: 503,
      payload: {
        success: false,
        errorCode: 'MISSING_GEMINI_API_KEY',
        retryable: false,
        billingStatus: getGlobalBillingStatus(),
        message:
          'GEMINI_API_KEY is not configured on the server. Add a free-tier GEMINI_API_KEY in server environment variables to run live AI generation.',
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

  const rawTopic = String(body.topic || body.prompt || '').trim();
  const rawInstructions = String(body.instructions || '').trim();
  const roleToolId = String(body.roleToolId || '').trim().slice(0, 80);
  const category = resolveTelemetryCategory(toolId, roleToolId);
  const userKey = await resolveUserKeyForQuota(headers, clientIp);

  const quotaCheck = checkFreeTierPolicyQuota({
    category,
    userKey,
    clientIp,
    inputCharCount: rawTopic.length + rawInstructions.length,
    requestedMaxOutputTokens: 6144,
  });

  if (!quotaCheck.allowed) {
    return {
      statusCode: quotaCheck.statusCode || 429,
      payload: {
        success: false,
        errorCode: quotaCheck.errorCode || 'FREE_QUOTA_REACHED',
        retryable: quotaCheck.statusCode === 429,
        retryAfterSeconds: quotaCheck.retryAfterSeconds,
        quotaResetAt: quotaCheck.quotaResetAt,
        billingStatus: getGlobalBillingStatus(),
        paidServicesEnabled: false,
        message: quotaCheck.message || 'Free AI quota reached. Please retry after reset.',
      },
    };
  }

  const topic = rawTopic.slice(0, 1600);
  const board = String(body.board || 'Maharashtra').trim().slice(0, 40);
  const classLevel = String(body.classLevel || 'Class 5').trim().slice(0, 30);
  const subject = String(body.subject || 'Mathematics').trim().slice(0, 80);
  const language = String(body.language || 'English').trim().slice(0, 30);
  const instructions = rawInstructions.slice(0, 1000);
  const count = Math.min(Math.max(Number(body.count) || 5, 1), 25);

  const roleToolName = String(body.toolName || '').trim().slice(0, 100);
  const roleToolCategory = String(body.toolCategory || '').trim().slice(0, 80);
  const outputKindRaw = String(body.outputKind || 'document').trim() as RoleToolOutputKind;

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

  const telemetryOpt = {
    maxOutputTokensCap: quotaCheck.cappedMaxOutputTokens,
    telemetry: {
      category,
      userKey,
    },
  };

  try {
    // 1. Interactive Quiz schema (either legacy quiz_generator or role-scoped quiz outputKind)
    if (
      toolId === 'quiz_generator' ||
      ((toolId === 'teacher_productivity_tool' || toolId === 'student_learning_tool') &&
        outputKindRaw === 'quiz')
    ) {
      const result = await generateGeminiContentWithFallback(
        {
          contents: `${roleToolName ? `Tool: ${roleToolName}. ` : ''}Generate ${count} original, accurate multiple-choice questions in ${language} for ${board} Board ${classLevel} ${subject} on "${topic}". ${instructions}`,
          config: {
            temperature: 0.3,
            maxOutputTokens: 8192,
            systemInstruction:
              'You are a strict Indian school academic curriculum author. Ensure factual and mathematical accuracy. Return valid JSON matching the schema with all required fields populated.',
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
                    required: ['question', 'options', 'correctIndex', 'explanation'],
                  },
                },
              },
              required: ['title', 'questions'],
            },
          },
        },
        {
          apiKey,
          requireValidJson: true,
          validateJson: (parsed) => Array.isArray(parsed.questions) && parsed.questions.length > 0,
          ...telemetryOpt,
        }
      );

      return {
        statusCode: 200,
        payload: {
          success: true,
          toolId,
          outputKind: 'quiz',
          model: result.modelUsed,
          primaryModel: result.primaryModel,
          fallbackModel: result.fallbackModel,
          usedFallback: result.usedFallback,
          attemptsMade: result.attemptsMade,
          structured: result.parsedJson,
        },
      };
    }

    // 2. Presentation slides schema
    if (
      toolId === 'presentation_maker' ||
      ((toolId === 'teacher_productivity_tool' || toolId === 'student_learning_tool') &&
        outputKindRaw === 'slides')
    ) {
      const slideCount = Math.min(Math.max(count, 3), 12);
      const result = await generateGeminiContentWithFallback(
        {
          contents: `${roleToolName ? `Tool: ${roleToolName}. ` : ''}Create a ${slideCount}-slide educational presentation deck in ${language} for ${board} ${classLevel} ${subject} on "${topic}". Include concise bullet points and practical speaker notes for each slide. ${instructions}`,
          config: {
            temperature: 0.3,
            maxOutputTokens: 8192,
            systemInstruction:
              'You create classroom-ready structured slide decks with clear bullet points and teacher/student speaker notes. Populate all required JSON fields.',
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
                    required: ['slideNumber', 'title', 'bullets', 'speakerNotes'],
                  },
                },
              },
              required: ['title', 'subtitle', 'slides'],
            },
          },
        },
        {
          apiKey,
          requireValidJson: true,
          validateJson: (parsed) => Array.isArray(parsed.slides) && parsed.slides.length > 0,
          ...telemetryOpt,
        }
      );

      return {
        statusCode: 200,
        payload: {
          success: true,
          toolId,
          outputKind: 'slides',
          model: result.modelUsed,
          primaryModel: result.primaryModel,
          fallbackModel: result.fallbackModel,
          usedFallback: result.usedFallback,
          attemptsMade: result.attemptsMade,
          structured: result.parsedJson,
        },
      };
    }

    // 3. Structured Table / Sheet schema (Timetables, Attendance, Marksheets, Seating Plans, Study Planners)
    if (
      (toolId === 'teacher_productivity_tool' || toolId === 'student_learning_tool') &&
      outputKindRaw === 'table'
    ) {
      const result = await generateGeminiContentWithFallback(
        {
          contents: `Tool: ${roleToolName || 'Academic Table Generator'} (${roleToolCategory || 'Education'}). Context: ${board} Board, ${classLevel}, Subject: ${subject}, Language: ${language}. Request: "${topic}". ${instructions} Output an organized, ready-to-print tabular grid (columns + rows) suitable for Excel (.xlsx) and A4 PDF export.`,
          config: {
            temperature: 0.3,
            maxOutputTokens: 8192,
            systemInstruction:
              'You are an Indian school & academic operations planner. Generate clean, practical tabular schedules, registers, marksheets, seating charts, or study planners matching the exact JSON schema with all required fields populated.',
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                subtitle: { type: Type.STRING },
                columns: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                rows: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                notes: { type: Type.STRING },
              },
              required: ['title', 'columns', 'rows'],
            },
          },
        },
        {
          apiKey,
          requireValidJson: true,
          validateJson: (parsed) => Array.isArray(parsed.columns) && parsed.columns.length > 0,
          ...telemetryOpt,
        }
      );

      return {
        statusCode: 200,
        payload: {
          success: true,
          toolId,
          outputKind: 'table',
          model: result.modelUsed,
          primaryModel: result.primaryModel,
          fallbackModel: result.fallbackModel,
          usedFallback: result.usedFallback,
          attemptsMade: result.attemptsMade,
          structured: result.parsedJson,
        },
      };
    }

    // 4. Flashcards / Vocabulary / Definitions schema
    if (
      (toolId === 'teacher_productivity_tool' || toolId === 'student_learning_tool') &&
      outputKindRaw === 'flashcards'
    ) {
      const result = await generateGeminiContentWithFallback(
        {
          contents: `Tool: ${roleToolName || 'Study Flashcards'}. Create ${Math.min(Math.max(count, 4), 16)} study cards in ${language} for ${board} ${classLevel} ${subject} on "${topic}". ${instructions}`,
          config: {
            temperature: 0.3,
            maxOutputTokens: 8192,
            systemInstruction:
              'You create high-retention study flashcards, definitions, formulas, and bilingual vocabulary cards matching the exact JSON schema with all required fields populated.',
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                subtitle: { type: Type.STRING },
                cards: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      front: { type: Type.STRING },
                      back: { type: Type.STRING },
                      hint: { type: Type.STRING },
                    },
                    required: ['front', 'back', 'hint'],
                  },
                },
              },
              required: ['title', 'cards'],
            },
          },
        },
        {
          apiKey,
          requireValidJson: true,
          validateJson: (parsed) => Array.isArray(parsed.cards) && parsed.cards.length > 0,
          ...telemetryOpt,
        }
      );

      return {
        statusCode: 200,
        payload: {
          success: true,
          toolId,
          outputKind: 'flashcards',
          model: result.modelUsed,
          primaryModel: result.primaryModel,
          fallbackModel: result.fallbackModel,
          usedFallback: result.usedFallback,
          attemptsMade: result.attemptsMade,
          structured: result.parsedJson,
        },
      };
    }

    // 5. Resume Maker schema
    if (toolId === 'resume_maker') {
      const result = await generateGeminiContentWithFallback(
        {
          contents: `Refine and structure an ATS-friendly academic/teaching/student resume based on these details: ${topic}. Additional focus: ${instructions}`,
          config: {
            temperature: 0.3,
            maxOutputTokens: 8192,
            systemInstruction:
              'You are a career coach for educators and students in India. Improve phrasing clearly without inventing fake degrees or employers not provided. Populate all required JSON fields.',
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
              required: ['headline', 'summary', 'skills', 'highlights'],
            },
          },
        },
        {
          apiKey,
          requireValidJson: true,
          validateJson: (parsed) =>
            Boolean(String(parsed.headline || '').trim() || String(parsed.summary || '').trim()),
          ...telemetryOpt,
        }
      );

      return {
        statusCode: 200,
        payload: {
          success: true,
          toolId,
          model: result.modelUsed,
          primaryModel: result.primaryModel,
          fallbackModel: result.fallbackModel,
          usedFallback: result.usedFallback,
          attemptsMade: result.attemptsMade,
          structured: result.parsedJson,
        },
      };
    }

    // 6. Structured document output (all remaining Teacher/Student document tools + PDF Maker/Worksheet/Question Paper/Notes/Letter/Content)
    const promptByTool: Record<string, string> = {
      pdf_maker: `Write a complete, well-structured educational PDF document in ${language} for ${board} ${classLevel} ${subject} titled/about "${topic}". Organize into clear sections suitable for direct PDF publication. ${instructions}`,
      worksheet_generator: `Create a printable classroom practice worksheet in ${language} for ${board} Board ${classLevel} ${subject} on "${topic}". Include varied sections (Fill in the Blanks, True/False, Short Questions, Problem Solving) AND a complete Answer Key section at the end. ${instructions}`,
      question_paper_generator: `Create a formal school examination Question Paper in ${language} aligned to ${board} Board ${classLevel} ${subject} covering "${topic}". Include Paper Header (Time, Total Marks), Section A (MCQs/Objective), Section B (Short Answer), Section C (Long Answer/Application), and a Complete Marking Scheme / Answer Key section. ${instructions}`,
      notes_generator: `Write comprehensive, student-friendly Chapter Revision Notes in ${language} for ${board} Board ${classLevel} ${subject} on "${topic}". Include Overview, Key Concepts & Definitions, Important Formulas/Rules, Worked Examples, and Quick Revision Bullets. ${instructions}`,
      letter_generator: `Write a formal, clear, ready-to-send school/educational letter in ${language} for the request: "${topic}". Include Date placeholder, Recipient block, Subject line, clear body paragraphs, and Sign-off. ${instructions}`,
      content_generator: `Create engaging, original educational content in ${language} for ${board} ${classLevel} ${subject} on "${topic}". Additional context: ${instructions}`,
      teacher_productivity_tool: `You are executing Teacher Tool "${roleToolName || 'Educator Generator'}" (${roleToolCategory || 'Teaching'}). Language: ${language}. Curriculum: ${board} Board, ${classLevel}, ${subject}. Topic/Request: "${topic}". ${instructions} Produce complete, classroom-ready sections with clear headings, practical steps/questions, and teacher notes or answer keys wherever applicable.`,
      student_learning_tool: `You are executing Student Learning Tool "${roleToolName || 'Student Study Helper'}" (${roleToolCategory || 'Learning'}). Language: ${language}. Student Profile: ${board} Board, ${classLevel}, ${subject}. Request/Question: "${topic}". ${instructions} Provide clear, step-by-step, age-appropriate explanations, worked examples, memory tips, and practice checks.`,
    };

    const result = await generateGeminiContentWithFallback(
      {
        contents: promptByTool[toolId] || topic,
        config: {
          temperature: 0.3,
          maxOutputTokens: 8192,
          systemInstruction:
            'You are an expert Indian curriculum author, educator, and tutor for MyStudyZone. Output clear structured JSON with title, subtitle, and well-organized sections matching all required fields.',
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
                  required: ['heading', 'body'],
                },
              },
            },
            required: ['title', 'subtitle', 'sections'],
          },
        },
      },
      {
        apiKey,
        requireValidJson: true,
        validateJson: (parsed) => Array.isArray(parsed.sections) && parsed.sections.length > 0,
        ...telemetryOpt,
      }
    );

    return {
      statusCode: 200,
      payload: {
        success: true,
        toolId,
        outputKind: 'document',
        model: result.modelUsed,
        primaryModel: result.primaryModel,
        fallbackModel: result.fallbackModel,
        usedFallback: result.usedFallback,
        attemptsMade: result.attemptsMade,
        structured: result.parsedJson,
      },
    };
  } catch (err: unknown) {
    const mapped = mapGeminiHttpError(err, 'MyStudyZone AI Studio');
    return {
      statusCode: mapped.statusCode,
      payload: {
        success: false,
        errorCode: mapped.errorCode,
        retryable: mapped.retryable,
        retryAfterSeconds: mapped.retryAfterSeconds,
        attemptsMade: mapped.attemptsMade,
        message: mapped.message,
      },
    };
  }
}

export async function handleAiImageGenerate(
  body: Record<string, unknown>,
  clientIp: string
): Promise<{ statusCode: number; payload: Record<string, unknown> }> {
  // PHASE 1 & PHASE 2 HARD BILLING PROTECTION:
  // Google classifies gemini-3.1-flash-lite-image as a PAID API KEY ONLY model.
  // Block BEFORE touching the SDK or making any network request when FREE_ONLY is enforced.
  if (!isPaidExecutionEnabledForFeature('image_generation')) {
    const proposal = getPaidFeatureProposals().find((p) => p.featureId === 'image_generation');
    recordBlockedPaidAttempt(
      'image_generation',
      GEMINI_IMAGE_MODEL,
      `Blocked outbound AI Image Generation request from ${clientIp || 'unknown'} under MyStudyZone FREE AI ONLY policy.`
    );
    return {
      statusCode: 403,
      payload: {
        success: false,
        errorCode: 'PAID_MODEL_BLOCKED_FREE_POLICY',
        retryable: false,
        paidApiCalled: false,
        billingActivated: false,
        globalBillingStatus: getGlobalBillingStatus(),
        blockedModel: GEMINI_IMAGE_MODEL,
        proposal: proposal || null,
        freeAlternatives: proposal?.availableFreeAlternatives || [
          'Teacher Tool #39: Diagram & Flowchart Outline Generator (Free)',
          'Student Tool #6: Diagram Explainer & Label Guide (Free)',
          'Built-in Drawing Studio & Document/Image Studio (Free)',
        ],
        message:
          'AI Image Generation is currently paused under MyStudyZone’s FREE AI ONLY policy because Google restricts Gemini image-generation models to paid billing-enabled API keys. No paid API call was made. You can use Teacher Tool #39 (Diagram & Flowchart Outline), Student Tool #6 (Diagram Explainer), or our free built-in Drawing & Image Studio instead.',
      },
    };
  }

  // Secondary hard model gate even if future owner approval + server env lock are both enabled
  try {
    assertModelAllowedByFreePolicy(GEMINI_IMAGE_MODEL, 'image_generation');
  } catch (gateErr: unknown) {
    const mapped = mapGeminiHttpError(gateErr, 'MyStudyZone AI Image Generator');
    return {
      statusCode: 403,
      payload: {
        success: false,
        errorCode: 'PAID_MODEL_BLOCKED_FREE_POLICY',
        retryable: false,
        paidApiCalled: false,
        billingActivated: false,
        globalBillingStatus: getGlobalBillingStatus(),
        message: mapped.message,
      },
    };
  }

  const quotaCheck = checkFreeTierPolicyQuota({
    category: 'core_ai',
    userKey: `ip:${clientIp || 'unknown'}`,
    clientIp,
    inputCharCount: String(body.prompt || '').length,
  });

  if (!quotaCheck.allowed) {
    return {
      statusCode: quotaCheck.statusCode || 429,
      payload: {
        success: false,
        errorCode: quotaCheck.errorCode || 'RATE_LIMITED',
        retryable: true,
        retryAfterSeconds: quotaCheck.retryAfterSeconds || 60,
        message: quotaCheck.message || 'Too many AI image requests. Please wait and retry.',
      },
    };
  }

  const apiKey = getConfiguredGeminiApiKey();
  if (!apiKey) {
    return {
      statusCode: 503,
      payload: {
        success: false,
        errorCode: 'MISSING_GEMINI_API_KEY',
        retryable: false,
        message: 'GEMINI_API_KEY is not configured on the server.',
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

  const ai = createGeminiServerClient(apiKey);

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_IMAGE_MODEL,
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
        model: GEMINI_IMAGE_MODEL,
        aspectRatio,
        imageDataUrl,
        caption,
      },
    };
  } catch (err: unknown) {
    const mapped = mapGeminiHttpError(err, 'MyStudyZone AI Image Generator');
    return {
      statusCode: mapped.statusCode,
      payload: {
        success: false,
        errorCode: mapped.errorCode,
        retryable: mapped.retryable,
        retryAfterSeconds: mapped.retryAfterSeconds,
        message: mapped.message,
      },
    };
  }
}

