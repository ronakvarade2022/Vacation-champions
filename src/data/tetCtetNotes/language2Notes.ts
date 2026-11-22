import { TetCtetNoteTopicBlueprint } from './types';

export const LANGUAGE_2_NOTE_BLUEPRINTS: TetCtetNoteTopicBlueprint[] = [
  // =========================================================================
  // LANGUAGE II — UNIT 1: UNSEEN DISCURSIVE, NARRATIVE & SCIENTIFIC PASSAGES
  // =========================================================================
  {
    slug: 'lang2-u1-unseen-prose-passages',
    unitNumber: 1,
    topicNumber: 1,
    subjectId: 'LANGUAGE_2',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_1', 'PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Official Syllabus (ctet.nic.in) — Language II: Two Unseen Prose Passages (Discursive, Literary, Narrative or Scientific) — 15 Marks',
      mahaTet: 'MSCE Pune MAHA TET Syllabus (mscepune.in / mahatet.in) — Language II: Reading Comprehension, Cohesion, Vocabulary & Inference',
    },
    content: {
      English: {
        documentTitle: 'Language II · Unit 1: Unseen Discursive, Narrative & Scientific Passages',
        unitTitle: 'Unit 1: Reading Comprehension (Two Unseen Prose Passages)',
        topicTitle: 'Discursive, Narrative & Scientific Passages: Cohesion, Fact vs. Opinion & Contextual Vocabulary',
        subtopics: [
          'Official difference between Language I (Prose + Poem) and Language II (Two Prose Passages)',
          'Analyzing Discursive, Narrative, and Scientific/Expository prose passages',
          'Distinguishing verifiable Fact from subjective Opinion',
          'Cohesion (pronoun reference, discourse markers) and Coherence (logical unity)',
          'Contextual synonyms, antonyms, idioms, and inference checks',
        ],
        introduction:
          'Unlike Language I (1 prose + 1 poem), CBSE CTET Language II officially features TWO unseen prose passages totalling 15 marks, while MAHA TET Language II tests practical second-language comprehension, vocabulary in context, and cohesion.',
        meaningAndDefinition:
          'Cohesion refers to surface grammatical ties (pronouns, conjunctions, lexical connectors) linking sentences, whereas Coherence denotes the deeper logical unity of ideas across paragraphs.',
        detailedExplanation: [
          '1. Discursive / Argumentative Passages: Track the central thesis, counter-arguments introduced by "however/yet/on the contrary", and the writer’s balanced conclusion.',
          '2. Scientific / Factual Passages: Follow process markers ("firstly", "subsequently", "consequently") and cause-effect links; technical terms are always clarified through surrounding context.',
          '3. Fact vs. Opinion: Facts are objectively verifiable ("Water boils at 100°C at sea level"). Opinions express personal judgment or recommendation ("should", "ought to", "undoubtedly the best").',
          '4. Pronoun Reference & Cohesion: Trace "it", "they", "such steps", or "the former" back to the nearest grammatically matching antecedent.',
        ],
        importantConcepts: [
          'Cohesion: Explicit surface ties (pronouns, connectors like "therefore", "moreover", "although").',
          'Coherence: Underlying logical flow uniting paragraphs.',
          'Fact vs. Opinion: Verifiable data vs. value judgment.',
        ],
        comparisonTable: {
          caption: 'Language I vs. Language II Comprehension Format (Official CTET)',
          headers: ['Feature', 'Language I', 'Language II'],
          rows: [
            ['Passage Format', '1 Prose/Drama + 1 Poem (15 Marks)', '2 Unseen Prose Passages (15 Marks, NO Poem)'],
            ['Text Genres', 'Literary prose, drama, poetry', 'Discursive, narrative, scientific/factual prose'],
            ['Core Focus', 'Literary nuance & medium proficiency', 'Communicative comprehension & cohesion'],
          ],
        },
        practicalExamples: [
          '"Although solar panels have high initial cost, their twenty-year savings make them economical." — "Although" signals contrast; "their" refers back to "solar panels".',
        ],
        classroomApplications: [
          'Have learners underline discourse connectors ("however", "therefore", "because") in expository paragraphs to map cause and contrast.',
          'Run a 5-minute "Fact or Opinion?" activity using short news snippets.',
        ],
        teachingMethods: [
          'Cloze Procedure (contextual fill-in-the-blanks) and Graphic Organizers (Cause-Effect charts).',
        ],
        examSpecificFocus: {
          ctet: 'CTET Language II strictly carries TWO unseen prose passages (15 marks, no poem) testing inference, cohesion, fact vs. opinion, and contextual vocabulary.',
          mahaTet: 'MAHA TET Language II tests practical prose comprehension, contextual vocabulary, idioms, and identifying true/false statements.',
        },
        importantExamPoints: [
          'CTET Language II has TWO prose passages and NO poem.',
          'Pay close attention to sentences immediately following "however", "yet", "despite", or "although".',
        ],
        commonMistakes: [
          'Confusing the author’s opinion with a universal fact.',
          'Overlooking "NOT" in negative comprehension questions.',
        ],
        topicSummary:
          'Language II comprehension builds mastery over discursive and scientific prose via discourse markers, pronoun cohesion, and strict fact-opinion differentiation.',
        revisionPoints: [
          'CTET Language II = 2 Prose Passages (15 Marks) + 15 Pedagogy Marks.',
          'Cohesion = surface links; Coherence = logical flow.',
          'Fact = verifiable; Opinion = judgment ("should", "ought to", "best").',
        ],
        practiceQuestions: [
          {
            id: 'lang2-u1-en-q1',
            question: 'Which sentence clearly represents an OPINION rather than a FACT?',
            options: [
              'The library added 450 new children’s books in July.',
              'The school operates from 8:00 AM to 2:00 PM on weekdays.',
              'Every school ought to replace morning assemblies with silent reading hours.',
              'Water freezes at 0 degrees Celsius at standard pressure.',
            ],
            correctAnswer: 2,
            explanation: '"Ought to" signals a personal recommendation/value judgment rather than an objectively verifiable fact.',
            topicReference: 'Unit 1 · Fact vs. Opinion',
          },
          {
            id: 'lang2-u1-en-q2',
            question: 'Linking words such as "however", "consequently", and "moreover" primarily establish:',
            options: ['Phonological rhyme', 'Cohesion across sentences', 'Handwriting fluency', 'Silent letter rules'],
            correctAnswer: 1,
            explanation: 'Conjunctions and discourse markers create explicit grammatical ties between sentences (Cohesion).',
            topicReference: 'Unit 1 · Cohesion',
          },
          {
            id: 'lang2-u1-en-q3',
            question: 'According to the official CBSE CTET syllabus, what comprises the 15-mark comprehension section of Language II?',
            options: [
              'Two unseen poems',
              'Two unseen prose passages (discursive, literary, narrative, or scientific)',
              'One poem and one essay',
              'Thirty isolated spelling items',
            ],
            correctAnswer: 1,
            explanation: 'CTET Language II consists of two unseen prose passages (15 marks) with no poetry section.',
            topicReference: 'Unit 1 · Official CTET Structure',
          },
        ],
      },
      Marathi: {
        documentTitle: 'भाषा २ · घटक १: अपठित वैचारिक, कथनात्मक व वैज्ञानिक उतारे (Comprehension)',
        unitTitle: 'घटक १: अपठित गद्य उतारा आकलन (दोन गद्य उतारे)',
        topicTitle: 'वैचारिक, वर्णनात्मक व वैज्ञानिक उतारे: संबद्धता, तथ्य विरुद्ध मत व संदर्भगत शब्दार्थ',
        subtopics: [
          'भाषा १ (गद्य + पद्य) आणि भाषा २ (दोन अपठित गद्य उतारे) यांतील अधिकृत फरक',
          'वैचारिक, कथनात्मक व वैज्ञानिक उताऱ्यांचे विश्लेषण',
          'तथ्य (Fact) आणि मत (Opinion) यांतील भेद',
          'संबद्धता (Cohesion) आणि सुसंगती (Coherence)',
          'संदर्भानुसार शब्दार्थ व अनुमानात्मक प्रश्न',
        ],
        introduction:
          'अधिकृत CBSE CTET भाषा २ मध्ये कवितेऐवजी दोन अपठित गद्य उतारे (वैचारिक, कथनात्मक किंवा वैज्ञानिक) १५ गुणांसाठी विचारले जातात. MAHA TET भाषा २ मध्येही द्वितीय भाषेतील व्यावहारिक गद्य आकलनावर भर असतो.',
        meaningAndDefinition:
          'संबद्धता (Cohesion) म्हणजे सर्वनामे व योजक शब्दांद्वारे वाक्यांची बाह्य जोडणी, तर सुसंगती (Coherence) म्हणजे संपूर्ण उताऱ्यातील विचारांची तार्किक एकसंधता होय.',
        detailedExplanation: [
          '१. वैचारिक उतारा: "परंतु", "याउलट", "तथापि" नंतर येणाऱ्या वाक्यांत लेखकाचा खरा युक्तिवाद स्पष्ट होतो.',
          '२. वैज्ञानिक उतारा: कारण-परिणाम साखळी व क्रमदर्शक शब्दांकडे लक्ष द्या; पारिभाषिक शब्दांचा अर्थ संदर्भातच असतो.',
          '३. तथ्य विरुद्ध मत: पुराव्याने सिद्ध होणारी माहिती = तथ्य; वैयक्तिक सल्ला किंवा पसंती ("असे असावे", "सर्वोत्तम") = मत.',
          '४. सर्वनाम संदर्भ: "ते", "त्यांनी", "अशा उपाययोजना" यांचा अचूक नामसंदर्भ मागील वाक्यात तपासावा.',
        ],
        importantConcepts: [
          'संबद्धता (Cohesion): योजक शब्द व सर्वनामांची वाक्यांत जोडणी.',
          'सुसंगती (Coherence): परिच्छेदांमधील तार्किक विचारप्रवाह.',
          'तथ्य विरुद्ध मत: पडताळणीयोग्य सत्य विरुद्ध वैयक्तिक मूल्यमापन.',
        ],
        comparisonTable: {
          caption: 'भाषा १ विरुद्ध भाषा २ आकलन रचना (CTET)',
          headers: ['घटक', 'भाषा १', 'भाषा २'],
          rows: [
            ['उताऱ्यांचे स्वरूप', '१ गद्य + १ कविता (१५ गुण)', '२ अपठित गद्य उतारे (१५ गुण, कविता नाही)'],
            ['मुख्य भर', 'साहित्यिक संवेदना व माध्यम प्रावीण्य', 'द्वितीय भाषेतील व्यावहारिक आकलन व संबद्धता'],
          ],
        },
        practicalExamples: [
          '"सौरऊर्जेचा सुरुवातीचा खर्च अधिक असला, तरी दीर्घकाळात ती फायदेशीर ठरते" — "असला तरी" विरोधाभास दाखवते व "ती" = सौरऊर्जा.',
        ],
        classroomApplications: [
          'वर्तमानपत्रातील छोट्या बातम्यांतून "तथ्य कोणते आणि मत कोणते?" हा खेळ घ्यावा.',
        ],
        teachingMethods: [
          'क्लोज चाचणी (Cloze Procedure) आणि कारण-परिणाम तक्ते.',
        ],
        examSpecificFocus: {
          ctet: 'CTET भाषा २ मध्ये २ गद्य उतारे (१५ गुण) असून कविता नसते; संबद्धता, तथ्य-मत व संदर्भगत शब्दार्थ तपासले जातात.',
          mahaTet: 'MAHA TET भाषा २ मध्ये दैनंदिन व शैक्षणिक गद्यावर आधारित आकलन व शब्दसंपत्ती प्रश्न येतात.',
        },
        importantExamPoints: [
          'CTET भाषा २ मध्ये दोन्ही उतारे गद्य असतात.',
          '"परंतु/तथापि" नंतरची वाक्ये अनुमानात्मक प्रश्नांसाठी महत्त्वाची असतात.',
        ],
        commonMistakes: [
          'लेखकाचे वैयक्तिक मत हे सार्वत्रिक तथ्य मानणे.',
        ],
        topicSummary:
          'भाषा २ गद्य आकलनामध्ये संबद्धता, सुसंगती, तथ्य-मत विभेदन आणि संदर्भानुसार शब्दार्थ ओळखणे आवश्यक आहे.',
        revisionPoints: [
          'CTET भाषा २ = २ गद्य उतारे (१५ गुण) + अध्यापनशास्त्र (१५ गुण).',
          'संबद्धता = भाषिक दुवे; सुसंगती = तार्किक विचारप्रवाह.',
          'तथ्य = सिद्ध करता येणारे; मत = वैयक्तिक दृष्टिकोन.',
        ],
        practiceQuestions: [
          {
            id: 'lang2-u1-mr-q1',
            question: 'पुढीलपैकी कोणते विधान "तथ्य" नसून "मत (Opinion)" आहे?',
            options: [
              'पृथ्वी सूर्याभोवती फिरते.',
              'शाळेच्या ग्रंथालयात १,२०० पुस्तके आहेत.',
              'प्रत्येक विद्यार्थ्याने दिवसातून दोन तास फक्त गणितच अभ्यासले पाहिजे.',
              'पाणी १००° सेल्सिअसला उकळते.',
            ],
            correctAnswer: 2,
            explanation: '"अभ्यासले पाहिजे" हे वैयक्तिक मत व शिफारस दर्शवते.',
            topicReference: 'घटक १ · तथ्य विरुद्ध मत',
          },
          {
            id: 'lang2-u1-mr-q2',
            question: 'उताऱ्यातील "परंतु", "त्यामुळे", "तथापि" हे शब्द मुख्यतः काय साधतात?',
            options: ['अक्षर सजावट', 'वाक्यांमधील संबद्धता (Cohesion)', 'यमक', 'हस्ताक्षर सुधारणा'],
            correctAnswer: 1,
            explanation: 'योजक शब्द वाक्यांतील तार्किक दुवा जोडून संबद्धता (Cohesion) साधतात.',
            topicReference: 'घटक १ · संबद्धता',
          },
          {
            id: 'lang2-u1-mr-q3',
            question: 'अधिकृत CTET अभ्यासक्रमानुसार भाषा २ मधील १५ गुणांच्या आकलन भागात काय असते?',
            options: ['दोन कविता', 'दोन अपठित गद्य उतारे', 'एक निबंध', 'केवळ शुद्धलेखन'],
            correctAnswer: 1,
            explanation: 'CTET भाषा २ मध्ये अधिकृतपणे दोन अपठित गद्य उतारे असतात.',
            topicReference: 'घटक १ · अधिकृत CTET रचना',
          },
        ],
      },
      Hindi: {
        documentTitle: 'भाषा २ · इकाई १: अपठित विचारात्मक, वर्णनात्मक एवं वैज्ञानिक गद्यांश',
        unitTitle: 'इकाई १: पठन बोध (दो अपठित गद्यांश)',
        topicTitle: 'विचारात्मक व वैज्ञानिक गद्यांश: संबद्धता, सुसंगति, तथ्य बनाम मत तथा संदर्भगत अर्थ',
        subtopics: [
          'भाषा १ (गद्य + पद्य) और भाषा २ (दो अपठित गद्यांश) में आधिकारिक अंतर',
          'विचारात्मक, कथात्मक एवं वैज्ञानिक गद्यांशों का विश्लेषण',
          'तथ्य (Fact) बनाम मत (Opinion)',
          'संबद्धता (Cohesion) तथा सुसंगति (Coherence)',
          'संदर्भगत शब्दावली एवं अनुमान-आधारित प्रश्न',
        ],
        introduction:
          'आधिकारिक CBSE CTET भाषा-२ में काव्यांश के स्थान पर दो अपठित गद्यांश १५ अंकों के लिए पूछे जाते हैं। MAHA TET भाषा-२ में भी द्वितीय भाषा के व्यावहारिक अर्थग्रहण पर बल रहता है।',
        meaningAndDefinition:
          'संबद्धता (Cohesion) वाक्यों को जोड़ने वाले भाषिक साधनों (सर्वनाम, योजक) को दर्शाती है, जबकि सुसंगति (Coherence) संपूर्ण पाठ में विचारों की तार्किक एकता है।',
        detailedExplanation: [
          '१. विचारात्मक गद्यांश: "किंतु", "तथापि", "इसके विपरीत" के बाद लेखक का मुख्य तर्क स्पष्ट होता है।',
          '२. वैज्ञानिक गद्यांश: कारण-प्रभाव श्रृंखला और प्रक्रिया के क्रम पर ध्यान दें।',
          '३. तथ्य बनाम मत: सत्यापन योग्य जानकारी = तथ्य; सुझाव या मूल्य-निर्णय ("चाहिए", "सर्वश्रेष्ठ") = मत।',
          '४. सर्वनाम संदर्भ: "यह", "उनका", "ऐसे कदम" को ठीक पहले आए संज्ञा पदबंध से मिलाएँ।',
        ],
        importantConcepts: [
          'संबद्धता (Cohesion): योजक शब्दों व सर्वनामों का जुड़ाव।',
          'सुसंगति (Coherence): अनुच्छेदों का तार्किक विचार प्रवाह।',
          'तथ्य बनाम मत: प्रमाणित जानकारी बनाम व्यक्तिपरक दृष्टिकोण।',
        ],
        comparisonTable: {
          caption: 'CTET भाषा १ बनाम भाषा २ पठन-बोध संरचना',
          headers: ['विशेषता', 'भाषा १', 'भाषा २'],
          rows: [
            ['पाठ प्रकार', '१ गद्यांश + १ काव्यांश (१५ अंक)', '२ अपठित गद्यांश (१५ अंक, कविता नहीं)'],
            ['केंद्र बिंदु', 'साहित्यिक संवेदना व माध्यम भाषा', 'द्वितीय भाषा की व्यावहारिक समझ व संबद्धता'],
          ],
        },
        practicalExamples: [
          '"हालाँकि वर्षा अनियमित थी, तथापि जल-संचयन से फसलें बच गईं" — "हालाँकि...तथापि" विरोध-समाधान संबद्धता दर्शाते हैं।',
        ],
        classroomApplications: [
          'समाचार कतरनों से "तथ्य और मत छाँटो" अभ्यास कराएँ तथा क्लोज़ पाठ (रिक्त स्थान) से संदर्भ अनुमान विकसित करें।',
        ],
        teachingMethods: [
          'क्लोज़ विधि (Cloze Procedure) एवं कारण-प्रभाव चार्ट।',
        ],
        examSpecificFocus: {
          ctet: 'CTET भाषा-२ में दो गद्यांश (१५ प्रश्न, कविता नहीं) होते हैं जिनमें तथ्य-मत, योजक और संदर्भगत शब्दार्थ पूछे जाते हैं।',
          mahaTet: 'MAHA TET भाषा-२ में व्यावहारिक गद्य बोध, पर्यायवाची-विलोम और मुख्य विचार पर प्रश्न आते हैं।',
        },
        importantExamPoints: [
          'CTET भाषा-२ में दोनों पाठ गद्यांश होते हैं।',
          'विरोधसूचक योजकों के बाद की पंक्तियाँ विशेष ध्यान से पढ़ें।',
        ],
        commonMistakes: [
          'व्यक्तिगत मत को वस्तुनिष्ठ तथ्य मान लेना।',
        ],
        topicSummary:
          'भाषा-२ गद्यांश बोध में संबद्धता, सुसंगति और तथ्य-मत विभेदन द्वारा उच्च सटीकता मिलती है।',
        revisionPoints: [
          'CTET भाषा-२ = २ गद्यांश (१५ अंक) + १५ शिक्षाशास्त्र।',
          'संबद्धता = योजक व सर्वनाम; सुसंगति = तार्किक प्रवाह।',
          'तथ्य = सत्यापन योग्य; मत = सुझाव/दृष्टिकोण।',
        ],
        practiceQuestions: [
          {
            id: 'lang2-u1-hi-q1',
            question: 'कौन-सा वाक्य एक "तथ्य" नहीं बल्कि "मत (Opinion)" है?',
            options: [
              'भारत का संविधान २६ जनवरी १९५० को लागू हुआ।',
              'पौधे प्रकाश-संश्लेषण से भोजन बनाते हैं।',
              'विद्यालयों में लिखित परीक्षाओं को पूर्णतः बंद कर देना चाहिए।',
              'मंगल को लाल ग्रह कहते हैं।',
            ],
            correctAnswer: 2,
            explanation: '"कर देना चाहिए" एक व्यक्तिगत सुझाव/मत है।',
            topicReference: 'इकाई १ · तथ्य बनाम मत',
          },
          {
            id: 'lang2-u1-hi-q2',
            question: 'अनुच्छेद में "अतः", "तथापि" और "इसके अतिरिक्त" जैसे शब्दों का प्रयोग मुख्यतः क्या बढ़ाता है?',
            options: ['शब्द संख्या', 'वाक्यों में संबद्धता (Cohesion)', 'तुकबंदी', 'उच्चारण गति'],
            correctAnswer: 1,
            explanation: 'योजक शब्द वाक्यों में संबद्धता (Cohesion) स्थापित करते हैं।',
            topicReference: 'इकाई १ · संबद्धता',
          },
          {
            id: 'lang2-u1-hi-q3',
            question: 'CBSE CTET भाषा-२ के १५ अंकों के पठन-बोध खंड में क्या सम्मिलित होता है?',
            options: ['दो काव्यांश', 'दो अपठित गद्यांश', 'एक पत्र एवं निबंध', 'केवल व्याकरण'],
            correctAnswer: 1,
            explanation: 'आधिकारिक CTET भाषा-२ में दो अपठित गद्यांश दिए जाते हैं।',
            topicReference: 'इकाई १ · आधिकारिक संरचना',
          },
        ],
      },
    },
  },

  // =========================================================================
  // LANGUAGE II — UNIT 2: APPLIED SECOND-LANGUAGE GRAMMAR & SYNTAX
  // =========================================================================
  {
    slug: 'lang2-u2-applied-syntax-usage',
    unitNumber: 2,
    topicNumber: 2,
    subjectId: 'LANGUAGE_2',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_1', 'PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Official Syllabus (ctet.nic.in) — Language II: Contextual Grammar, Verbal Ability & Sentence Usage',
      mahaTet: 'MSCE Pune MAHA TET Syllabus (mscepune.in / mahatet.in) — Language II: Applied Grammar, Voice, Narration, Modals, Prepositions & Transformation',
    },
    content: {
      English: {
        documentTitle: 'Language II · Unit 2: Applied Second-Language Grammar & Syntax',
        unitTitle: 'Unit 2: Applied Grammar, Voice, Speech & Usage',
        topicTitle: 'Articles, Prepositions, Modals, Active-Passive Voice, Direct-Indirect Speech & Idioms',
        subtopics: [
          'Articles (a, an, the, zero article) based on phonetic sound',
          'Prepositions of Time, Place, Movement, and Fixed Phrases',
          'Modal Auxiliaries (can, could, may, might, must, should, ought to)',
          'Active and Passive Voice across tenses and imperatives',
          'Direct and Indirect (Reported) Speech + Question Tags & Phrasal Verbs',
        ],
        introduction:
          'Second-language grammar items focus on practical areas where L1-to-L2 interference occurs most—articles, prepositions, modals, voice shifts, and reported speech.',
        meaningAndDefinition:
          'Syntax governs how words combine into grammatical sentences; applied second-language grammar translates syntax rules into accurate everyday and academic expression.',
        detailedExplanation: [
          '1. Articles (Sound, Not Spelling!): Use "an" before a VOWEL SOUND (an honest teacher, an hour, an M.A.) and "a" before a CONSONANT SOUND (a university, a European, a one-rupee note). Use Zero Article before general abstract/uncountable nouns.',
          '2. Prepositions: Time — "at" (clock time: at 7 AM), "on" (days/dates: on Monday), "in" (months/years/seasons). Position/Motion — "in" (inside) vs. "into" (moving inward); "between" (two) vs. "among" (more than two); "beside" (next to) vs. "besides" (in addition to).',
          '3. Modals: Always take base verb V1 ("must study", "can solve"). "Must" = strong obligation; "Should" = advice; "May" = formal permission/possibility.',
          '4. Active → Passive Voice: Object → Subject + be-form + V3. Present Continuous ("is writing") → "is being written"; Present Perfect ("has written") → "has been written"; Modal ("can solve") → "can be solved".',
          '5. Direct → Indirect Speech: Past reporting verb triggers one-step tense backshift (Simple Present → Simple Past; Simple Past → Past Perfect; will → would). EXCEPTION: Universal truths and scientific facts NEVER change tense.',
        ],
        importantConcepts: [
          'Question Tags: Positive statement → negative tag ("She teaches well, doesn’t she?"); "I am ready, aren’t I?".',
          'Phrasal Verbs: "give up" (quit), "look after" (care for), "put off" (postpone), "call off" (cancel).',
        ],
        comparisonTable: {
          caption: 'Quick Conversion Matrix: Active to Passive Voice',
          headers: ['Tense', 'Active Structure', 'Passive Structure'],
          rows: [
            ['Simple Present', 'writes / write', 'is / am / are + written'],
            ['Simple Past', 'wrote', 'was / were + written'],
            ['Present Continuous', 'is / are writing', 'is / are + being + written'],
            ['Present Perfect', 'has / have written', 'has / have + been + written'],
            ['Modal Verb', 'must / can write', 'must / can + be + written'],
          ],
        },
        practicalExamples: [
          '"He is an MLA from a university town" (MLA = vowel sound /em/; university = consonant sound /ju:/).',
          'Direct: The teacher said, "Water freezes at 0°C." → Indirect: The teacher said that water freezes at 0°C (universal truth stays Present).',
        ],
        classroomApplications: [
          'Teach prepositions kinesthetically using real desk objects ("Place the book ON the table; drop the pen INTO the box").',
        ],
        teachingMethods: [
          'Communicative Grammar Tasks and Contrastive Error Analysis (eliminating "discuss about", "return back").',
        ],
        examSpecificFocus: {
          ctet: 'CTET Language II tests applied usage embedded in prose: modals, determiners, prepositions, phrasal verbs, and voice/narration accuracy.',
          mahaTet: 'MAHA TET English Language II frequently asks direct MCQs on Articles, Prepositions, Active-Passive Voice, Direct-Indirect Speech, Question Tags, and Degrees of Comparison.',
        },
        importantExamPoints: [
          'Select "a/an" by pronunciation SOUND, never by written letter.',
          'Avoid redundant prepositions ("discuss", NOT "discuss about"; "return", NOT "return back").',
        ],
        commonMistakes: [
          'Writing "an university" or omitting "being" in Continuous Passive.',
        ],
        topicSummary:
          'Accurate second-language usage combines phonetic article rules, precise prepositions, modals, passive voice, and reported speech backshift rules.',
        revisionPoints: [
          'a/an follows SOUND (a university, an hour, an honest person).',
          'at = clock time; on = day/date; in = month/year/season.',
          'Universal truths stay Simple Present in Indirect Speech.',
        ],
        practiceQuestions: [
          {
            id: 'lang2-u2-en-q1',
            question: 'Choose the correct articles: "___ honest teacher inspired ___ European visitor to fund ___ library."',
            options: ['A, an, a', 'An, a, a', 'An, an, the', 'The, an, a'],
            correctAnswer: 1,
            explanation: '"Honest" begins with a vowel sound ("An"); "European" begins with /j/ consonant sound ("a"); "library" takes "a".',
            topicReference: 'Unit 2 · Articles',
          },
          {
            id: 'lang2-u2-en-q2',
            question: 'Select the Passive Voice for: "The students are decorating the science hall."',
            options: [
              'The science hall is decorated by the students.',
              'The science hall was being decorated by the students.',
              'The science hall is being decorated by the students.',
              'The science hall has been decorated by the students.',
            ],
            correctAnswer: 2,
            explanation: 'Present Continuous Active converts to "is being + V3" agreeing with singular "The science hall".',
            topicReference: 'Unit 2 · Passive Voice',
          },
          {
            id: 'lang2-u2-en-q3',
            question: 'Convert into Indirect Speech: The teacher said, "Water freezes at zero degrees Celsius."',
            options: [
              'The teacher said that water froze at zero degrees Celsius.',
              'The teacher said that water had frozen at zero degrees Celsius.',
              'The teacher said that water freezes at zero degrees Celsius.',
              'The teacher told water freezes at zero degrees Celsius.',
            ],
            correctAnswer: 2,
            explanation: 'Scientific facts and universal truths retain Simple Present tense in Indirect Speech.',
            topicReference: 'Unit 2 · Indirect Speech',
          },
        ],
      },
      Marathi: {
        documentTitle: 'भाषा २ · घटक २: द्वितीय भाषेचे उपयोजित व्याकरण व वाक्यरचना',
        unitTitle: 'घटक २: व्यावहारिक व्याकरण, वाक्यरूपांतरण व शुद्धलेखन',
        topicTitle: 'वाक्यरूपांतरण, विरामचिन्हे, शुद्धलेखन नियम, पदक्रम, वाक्प्रचार व म्हणी',
        subtopics: [
          'अर्थ न बदलता वाक्यरूपांतरण (होकारार्थी ↔ नकारार्थी, विधानार्थी ↔ उद्गारार्थी ↔ प्रश्नार्थी)',
          'पदक्रम (मराठी/हिंदी SOV विरुद्ध इंग्रजी SVO) व अचूक विभक्ती प्रयोग',
          'समानार्थी, विरुद्धार्थी, शब्दसमूहाबद्दल एक शब्द व अलंकारिक शब्द',
          'विरामचिन्हांचा अचूक वापर आणि मराठी शुद्धलेखन नियम',
          'वाक्प्रचार व म्हणींचा योग्य संदर्भगत वापर',
        ],
        introduction:
          'द्वितीय भाषा शिकताना लिंग-वचन मेळ, पदक्रम, वाक्यरूपांतरण आणि शुद्धलेखनात सर्वाधिक चुका होतात. भाषा २ मधील व्याकरण याच व्यावहारिक अचूकतेची तपासणी करते.',
        meaningAndDefinition:
          'वाक्यरूपांतरण म्हणजे मूळ वाक्याच्या अर्थास धक्का न लावता त्याच्या रचनेत (जसे होकारार्थीचे नकारार्थी किंवा विधानार्थीचे उद्गारार्थी) केलेला व्याकरणशुद्ध बदल होय.',
        detailedExplanation: [
          '१. अर्थ न बदलता वाक्यरूपांतरण: विरुद्धार्थी शब्द + नकार जोडून होकारार्थीचे नकारार्थी बनवावे ("हा रस्ता रुंद आहे" → "हा रस्ता अजिबात अरुंद नाही").',
          '२. विरामचिन्हे: पूर्णविराम (.), स्वल्पविराम (,), अर्धविराम (; — दोन छोटी वाक्ये उभयान्वयी अव्ययाने जोडताना), अपूर्णविराम (:), प्रश्नचिन्ह (?), उद्गारचिन्ह (!), अवतरण (" ").',
          '३. शुद्धलेखन नियम: मराठी शब्दांच्या शेवटचा इकार व उकार नेहमी दीर्घ असतो (कवी, गुरू; तत्सम अपवाद: आणि, परंतु, किंतु, तथापि). अनेकवचनी सामान्यरूपावर अनुस्वार येतो (मुलांनी, शाळांमध्ये).',
          '४. वाक्प्रचार विरुद्ध म्हण: वाक्प्रचार हा वाक्याचा भाग असतो ("हातभार लावणे"); म्हण हा स्वतंत्र अनुभवसंपन्न पूर्ण विचार असतो ("थेंबे थेंबे तळे साचे").',
        ],
        importantConcepts: [
          'पदक्रम: मराठी/हिंदी = कर्ता + कर्म + क्रियापद (SOV); इंग्रजी = कर्ता + क्रियापद + कर्म (SVO).',
          'अर्थबदल टाळणे: वाक्यरूपांतरणाचा सुवर्णनियम.',
        ],
        comparisonTable: {
          caption: 'अर्थ न बदलता वाक्यरूपांतरण नमुने',
          headers: ['प्रकार', 'मूळ वाक्य', 'रूपांतरित वाक्य'],
          rows: [
            ['होकारार्थी → नकारार्थी', 'तो नेहमी खरे बोलतो.', 'तो कधीही खोटे बोलत नाही.'],
            ['विधानार्थी → उद्गारार्थी', 'हे दृश्य फार विलोभनीय आहे.', 'किती विलोभनीय दृश्य आहे हे!'],
            ['प्रश्नार्थी → विधानार्थी', 'अपमान कोण सहन करील?', 'अपमान कोणीही सहन करणार नाही.'],
          ],
        },
        practicalExamples: [
          'शुद्ध शब्द: आशीर्वाद, कवयित्री, उज्ज्वल, पारंपरिक, शैक्षणिक.',
          'शब्दसमूहाबद्दल एक शब्द: कधीही न मरणारा = अमर; वर्षातून एकदा होणारे = वार्षिक.',
        ],
        classroomApplications: [
          'रंगीत शब्दपट्ट्यांद्वारे SOV व SVO पदक्रमातील फरक प्रात्यक्षिकाने समजावून सांगावा.',
        ],
        teachingMethods: [
          'तुलनात्मक त्रुटी विश्लेषण (Contrastive Analysis) व संवादात्मक वाक्यरूपांतरण.',
        ],
        examSpecificFocus: {
          ctet: 'CTET भाषा २ मध्ये उताऱ्यातील वाक्यांवरून वाक्यप्रकार, योजक व संदर्भगत वाक्प्रचार विचारले जातात.',
          mahaTet: 'MAHA TET भाषा २ मध्ये वाक्यरूपांतरण, शुद्धलेखन, विरामचिन्हे, वाक्प्रचार व म्हणींवर थेट प्रश्न असतात.',
        },
        importantExamPoints: [
          'वाक्यरूपांतरण करताना मूळ अर्थ कायम राहायलाच हवा.',
          'अनेकवचनी सामान्यरूपावर ("मुलांनी", "गावांमध्ये") अनुस्वार अनिवार्य आहे.',
        ],
        commonMistakes: [
          'होकारार्थी वाक्याला फक्त "नाही" जोडून मूळ अर्थ उलटा करणे.',
        ],
        topicSummary:
          'अर्थ कायम ठेवून वाक्यरूपांतरण, अचूक शुद्धलेखन, विरामचिन्हे आणि वाक्प्रचार-म्हणींचा सराव द्वितीय भाषेवर प्रभुत्व देतो.',
        revisionPoints: [
          'मराठी पदक्रम = SOV; इंग्रजी = SVO.',
          'होकारार्थी → नकारार्थी = विरुद्धार्थी शब्द + नकार.',
          'शुद्ध शब्द: आशीर्वाद, कवयित्री, उज्ज्वल.',
        ],
        practiceQuestions: [
          {
            id: 'lang2-u2-mr-q1',
            question: '"हा रस्ता खूप रुंद आहे" याचे अर्थ न बदलता अचूक नकारार्थी वाक्य कोणते?',
            options: ['हा रस्ता रुंद नाही.', 'हा रस्ता अजिबात अरुंद नाही.', 'हा रस्ता खूप अरुंद आहे.', 'हा रस्ता अरुंद असावा.'],
            correctAnswer: 1,
            explanation: '"रुंद" चा विरुद्धार्थी "अरुंद" + नकार वापरल्याने मूळ अर्थ कायम राहतो.',
            topicReference: 'घटक २ · वाक्यरूपांतरण',
          },
          {
            id: 'lang2-u2-mr-q2',
            question: 'शुद्धलेखनानुसार अचूक शब्द कोणता?',
            options: ['आशिर्वाद', 'आशीर्वाद', 'आशीरवाद', 'आशिर्वादं'],
            correctAnswer: 1,
            explanation: '"आशीर्वाद" मध्ये "शी" दीर्घ असून रफार "वा" वर येतो.',
            topicReference: 'घटक २ · शुद्धलेखन',
          },
          {
            id: 'lang2-u2-mr-q3',
            question: 'दोन छोटी स्वतंत्र वाक्ये उभयान्वयी अव्ययाने जोडताना कोणते विरामचिन्ह वापरतात?',
            options: ['उद्गारचिन्ह (!)', 'अर्धविराम (;)', 'प्रश्नचिन्ह (?)', 'अपसारण चिन्ह (—)'],
            correctAnswer: 1,
            explanation: 'दोन छोटी वाक्ये उभयान्वयी अव्ययाने जोडताना अर्धविराम (;) वापरतात.',
            topicReference: 'घटक २ · विरामचिन्हे',
          },
        ],
      },
      Hindi: {
        documentTitle: 'भाषा २ · इकाई २: द्वितीय भाषा का व्यावहारिक व्याकरण एवं वाक्य-विन्यास',
        unitTitle: 'इकाई २: वाक्य-रूपांतरण, अशुद्धि-शोधन, विराम-चिह्न एवं मुहावरे',
        topicTitle: 'पदक्रम, लिंग-वचन अन्विति, वाक्य-रूपांतरण, विराम-चिह्न, वर्तनी शुद्धि एवं लोकोक्तियाँ',
        subtopics: [
          'कर्ता-क्रिया अन्विति ("ने" कारक सहित लिंग-वचन सामंजस्य)',
          'वाक्य-रूपांतरण एवं अर्थ के आधार पर वाक्य के ८ भेद',
          'वाक्य अशुद्धि शोधन (पुनरुक्ति दोष, कारक एवं पदक्रम सुधार)',
          'विराम-चिह्नों का प्रयोग तथा शुद्ध वर्तनी',
          'मुहावरे, लोकोक्तियाँ एवं वाक्यांश के लिए एक शब्द',
        ],
        introduction:
          'द्वितीय भाषा हिंदी में लिंग-वचन अन्विति, पुनरुक्ति अशुद्धि और शुद्ध वर्तनी पर सर्वाधिक प्रश्न बनते हैं।',
        meaningAndDefinition:
          'अन्विति (Agreement) का अर्थ वाक्य में कर्ता, कर्म, विशेषण और क्रिया के बीच लिंग, वचन और पुरुष का शुद्ध व्याकरणिक मेल है।',
        detailedExplanation: [
          '१. "ने" कारक का नियम: भूतकाल में कर्ता के साथ "ने" होने पर और कर्म अप्रत्यय होने पर क्रिया कर्म के लिंग-वचन के अनुसार चलती है ("सीता ने फल खाया"; "राम ने रोटी खाई")।',
          '२. पुनरुक्ति दोष से बचाव: "वापस लौट आया", "कृपया करके", "केवल मात्र" अशुद्ध हैं; शुद्ध रूप — "लौट आया", "कृपया", "केवल"।',
          '३. अर्थ के आधार पर वाक्य के ८ भेद: विधानवाचक, निषेधवाचक, प्रश्नवाचक, विस्मयादिबोधक, आज्ञावाचक, इच्छावाचक, संदेहवाचक, संकेतवाचक।',
          '४. शुद्ध वर्तनी: कवयित्री, उज्ज्वल, आशीर्वाद, पूजनीय, व्यावहारिक, शृंगार।',
          '५. मुहावरा बनाम लोकोक्ति: मुहावरा वाक्यांश है; लोकोक्ति पूर्ण स्वतंत्र कहावत है।',
        ],
        importantConcepts: [
          '"प्रत्येक" व "हर एक": इनके साथ सदैव एकवचन संज्ञा और एकवचन क्रिया आती है।',
          'संकेतवाचक वाक्य: एक क्रिया दूसरी की शर्त पर निर्भर ("यदि वर्षा होगी, तो फसल अच्छी होगी")।',
        ],
        comparisonTable: {
          caption: 'अशुद्ध बनाम शुद्ध हिंदी वाक्य एवं वर्तनी तालिका',
          headers: ['अशुद्ध रूप', 'दोष प्रकार', 'शुद्ध रूप'],
          rows: [
            ['वह वापस लौट आया।', 'पुनरुक्ति दोष', 'वह लौट आया।'],
            ['प्रत्येक छात्रों को पुस्तक दो।', 'वचन दोष', 'प्रत्येक छात्र को पुस्तक दो।'],
            ['कवियत्री / उज्वल / पूज्यनीय', 'वर्तनी दोष', 'कवयित्री / उज्ज्वल / पूजनीय'],
          ],
        },
        practicalExamples: [
          'वाक्यांश के लिए एक शब्द: सब कुछ जानने वाला = सर्वज्ञ; कम बोलने वाला = मितभाषी।',
        ],
        classroomApplications: [
          'गैर-हिंदी भाषी छात्रों को चित्र-संवाद द्वारा "ने" प्रयोग और लिंग-अन्विति का अभ्यास कराएँ।',
        ],
        teachingMethods: [
          'व्यतिरेकी विश्लेषण (Contrastive Analysis) एवं संदर्भगत संपादन अभ्यास।',
        ],
        examSpecificFocus: {
          ctet: 'CTET भाषा-२ में वाक्य-भेद, शुद्ध प्रयोग, मुहावरों का संदर्भगत अर्थ व कारक पूछे जाते हैं।',
          mahaTet: 'MAHA TET हिंदी भाषा-२ में अशुद्धि शोधन, शुद्ध वर्तनी, विराम-चिह्न और मुहावरे-लोकोक्तियों पर सीधे प्रश्न आते हैं।',
        },
        importantExamPoints: [
          '"प्रत्येक" के साथ एकवचन संज्ञा + एकवचन क्रिया अनिवार्य है।',
          '"कवयित्री", "उज्ज्वल", "पूजनीय", "आशीर्वाद" सर्वाधिक परीक्षित शुद्ध वर्तनियाँ हैं।',
        ],
        commonMistakes: [
          '"कवियत्री" या "पूज्यनीय" को शुद्ध मान लेना।',
        ],
        topicSummary:
          'शुद्ध अन्विति, पुनरुक्ति निवारण, सटीक वर्तनी और वाक्य-रूपांतरण द्वितीय भाषा हिंदी की रीढ़ हैं।',
        revisionPoints: [
          'शुद्ध वर्तनी: कवयित्री, उज्ज्वल, आशीर्वाद, पूजनीय, व्यावहारिक।',
          '"प्रत्येक" + एकवचन संज्ञा + एकवचन क्रिया।',
          'मुहावरा = वाक्यांश; लोकोक्ति = पूर्ण कहावत।',
        ],
        practiceQuestions: [
          {
            id: 'lang2-u2-hi-q1',
            question: 'किस शब्द की वर्तनी पूर्णतः शुद्ध है?',
            options: ['कवियत्री', 'कवयित्री', 'कवयीत्री', 'कविइत्री'],
            correctAnswer: 1,
            explanation: '"कवि" का शुद्ध स्त्रीलिंग रूप "कवयित्री" है।',
            topicReference: 'इकाई २ · शुद्ध वर्तनी',
          },
          {
            id: 'lang2-u2-hi-q2',
            question: 'कौन-सा वाक्य व्याकरण की दृष्टि से पूर्णतः शुद्ध है?',
            options: [
              'कृपया करके मेरी सहायता कीजिए।',
              'प्रत्येक विद्यार्थियों को पुरस्कार मिला।',
              'प्रत्येक विद्यार्थी को पुरस्कार मिला।',
              'वह कल वापस लौट आया।',
            ],
            correctAnswer: 2,
            explanation: '"प्रत्येक" के साथ एकवचन संज्ञा ("विद्यार्थी") प्रयुक्त होती है।',
            topicReference: 'इकाई २ · अशुद्धि शोधन',
          },
          {
            id: 'lang2-u2-hi-q3',
            question: '"यदि वर्षा अच्छी होगी, तो फसल लहलहाएगी" — अर्थ के आधार पर वाक्य का भेद है:',
            options: ['संदेहवाचक', 'इच्छावाचक', 'संकेतवाचक', 'आज्ञावाचक'],
            correctAnswer: 2,
            explanation: 'शर्त पर आधारित ("यदि...तो") वाक्य संकेतवाचक होता है।',
            topicReference: 'इकाई २ · वाक्य भेद',
          },
        ],
      },
    },
  },

  // =========================================================================
  // LANGUAGE II — UNIT 3: SECOND LANGUAGE ACQUISITION & TEACHING METHODS
  // =========================================================================
  {
    slug: 'lang2-u3-sla-methods-approaches',
    unitNumber: 3,
    topicNumber: 3,
    subjectId: 'LANGUAGE_2',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_1', 'PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Official Syllabus (ctet.nic.in) — Language II Pedagogy: SLA, BICS vs. CALP, Approaches & Methods of Second Language Teaching',
      mahaTet: 'MSCE Pune MAHA TET Syllabus (mscepune.in / mahatet.in) — Language II Pedagogy: Methods & Approaches (GTM, Direct, Structural, CLT, Bilingual, TPR)',
    },
    content: {
      English: {
        documentTitle: 'Language II · Unit 3: Second Language Acquisition & Teaching Methods',
        unitTitle: 'Unit 3: Second Language Pedagogy & Methods',
        topicTitle: 'Cummins BICS vs. CALP & Methods (GTM, Direct, Structural, CLT, TBLT, TPR & Eclectic)',
        subtopics: [
          'Jim Cummins: BICS (Social Language) vs. CALP (Academic Language)',
          'Edward Anthony’s Hierarchy: Approach → Method → Technique',
          'Grammar-Translation Method (GTM) vs. Direct Method',
          'Structural Approach, Audio-Lingual Method, and Bilingual Method (C. J. Dodson)',
          'Communicative Language Teaching (CLT), Task-Based (TBLT), TPR (Asher) & Eclectic Approach',
        ],
        introduction:
          'Teaching a Second Language (L2) demands pedagogical methods tailored to limited natural exposure. Both CTET and MAHA TET consistently test Jim Cummins’ BICS/CALP framework alongside classical and communicative teaching methods.',
        meaningAndDefinition:
          'An Approach is a theoretical view of language and learning; a Method is an organized procedural plan based on an approach; a Technique is a specific classroom activity executing that method.',
        detailedExplanation: [
          '1. BICS vs. CALP (Jim Cummins): BICS (Basic Interpersonal Communicative Skills) = everyday social playground language (develops in 1–2 years). CALP (Cognitive Academic Language Proficiency) = abstract, context-reduced textbook/academic language (takes 5–7 years).',
          '2. Grammar-Translation Method (GTM): Uses L1 mother tongue extensively, deductive grammar rules, word-by-word translation; neglects speaking/listening.',
          '3. Direct Method: Strictly prohibits L1 translation; connects words directly to objects/actions in L2; teaches grammar inductively and prioritizes oral fluency.',
          '4. Bilingual Method (C. J. Dodson) & Structural Approach: In Bilingual Method ONLY the teacher uses L1 briefly for meaning clarity. Structural Approach grades ~275 sentence patterns using substitution drills.',
          '5. CLT (Dell Hymes), TBLT, TPR (James Asher) & Eclectic Approach: CLT targets Communicative Competence via authentic real-life interaction (role-plays, interviews). TBLT learns L2 through purposeful tasks. TPR pairs commands with bodily action (ideal for young beginners). Eclectic Approach blends the best elements of multiple methods.',
        ],
        importantConcepts: [
          'Communicative Competence (Dell Hymes): Knowing grammatical accuracy PLUS social appropriacy.',
          'BICS (1–2 yrs, social) vs. CALP (5–7 yrs, academic).',
          'Eclectic Approach: Flexible synthesis of multiple methods based on learners’ needs.',
        ],
        comparisonTable: {
          caption: 'Comparison of Major Second-Language Teaching Methods',
          headers: ['Method', 'Use of L1', 'Grammar', 'Core Focus'],
          rows: [
            ['Grammar-Translation (GTM)', 'Extensive', 'Deductive (rules first)', 'Reading & literary translation'],
            ['Direct Method', 'Strictly banned', 'Inductive', 'Oral fluency & direct association'],
            ['Bilingual (Dodson)', 'Teacher only (selective)', 'Pattern practice', 'Quick L1 meaning + L2 drill'],
            ['Communicative (CLT)', 'Judicious if needed', 'Functional / context', 'Meaningful real-life communication'],
            ['Total Physical Response (TPR)', 'Minimal', 'Implicit commands', 'Listening + physical movement'],
          ],
        },
        keyThinkers: [
          { name: 'Jim Cummins', contribution: 'BICS vs. CALP and Common Underlying Proficiency (CUP).' },
          { name: 'Dell Hymes', contribution: 'Communicative Competence (foundation of CLT).' },
          { name: 'James Asher', contribution: 'Total Physical Response (TPR) pairing speech and action.' },
          { name: 'C. J. Dodson', contribution: 'Bilingual Method (restricted teacher L1 usage).' },
        ],
        practicalExamples: [
          'A student chats easily with friends at recess (BICS) yet struggles to write a cause-effect geography paragraph (CALP gap).',
        ],
        classroomApplications: [
          'Use CLT information-gap pairs (booking a ticket, interviewing a guest) for Grades 5–8 and TPR command games for Grades 1–3.',
        ],
        teachingMethods: [
          'Communicative Language Teaching (CLT), TBLT, TPR, and Eclectic Approach.',
        ],
        examSpecificFocus: {
          ctet: 'CTET Language II heavily tests BICS vs. CALP, CLT, TBLT, TPR, and GTM vs. Direct Method.',
          mahaTet: 'MAHA TET tests Approach-Method-Technique, Structural Approach, Bilingual Method (Dodson), and Direct Method.',
        },
        importantExamPoints: [
          'In GTM the unit of teaching is the WORD; in Direct Method it is the SENTENCE.',
          'CLT prioritizes meaningful communicative fluency over rote error-free drills.',
        ],
        commonMistakes: [
          'Confusing BICS (social) with CALP (academic).',
        ],
        topicSummary:
          'Effective L2 pedagogy progresses learners from social BICS to academic CALP using communicative, task-based, physical-response, and eclectic methods.',
        revisionPoints: [
          'Jim Cummins: BICS (Social, 1–2 yrs) vs. CALP (Academic, 5–7 yrs).',
          'GTM = L1 translation; Direct = No L1; Bilingual = Teacher-only L1.',
          'CLT = Meaningful communication (Hymes); TPR = Speech + action (Asher).',
        ],
        practiceQuestions: [
          {
            id: 'lang2-u3-en-q1',
            question: 'A Grade 6 learner speaks fluent English on the playground but struggles to comprehend a science chapter. According to Jim Cummins, she has:',
            options: ['CALP but not BICS', 'BICS but is still developing CALP', 'Neither BICS nor CALP', 'Only GTM mastery'],
            correctAnswer: 1,
            explanation: 'Playground fluency is BICS, while abstract textbook comprehension requires CALP.',
            topicReference: 'Unit 3 · BICS vs. CALP',
          },
          {
            id: 'lang2-u3-en-q2',
            question: 'Which method pairs verbal commands with immediate physical actions and suits young beginners?',
            options: ['Grammar-Translation Method', 'Total Physical Response (TPR)', 'Silent Lecture Method', 'Classical Deductive Method'],
            correctAnswer: 1,
            explanation: 'James Asher’s TPR links listening comprehension with physical movement to lower anxiety.',
            topicReference: 'Unit 3 · TPR',
          },
          {
            id: 'lang2-u3-en-q3',
            question: 'What is the primary goal of Communicative Language Teaching (CLT)?',
            options: [
              'Memorizing bilingual word lists',
              'Developing communicative competence for meaningful real-life interaction',
              'Translating classical literature',
              'Eliminating group work',
            ],
            correctAnswer: 1,
            explanation: 'CLT builds communicative competence—fluent and socially appropriate real-life communication.',
            topicReference: 'Unit 3 · CLT',
          },
        ],
      },
      Marathi: {
        documentTitle: 'भाषा २ · घटक ३: द्वितीय भाषा अध्ययन सिद्धांत व अध्यापन पद्धती',
        unitTitle: 'घटक ३: द्वितीय भाषा अध्यापनशास्त्र व पद्धती',
        topicTitle: 'जिम कमिन्स (BICS विरुद्ध CALP) आणि अध्यापन पद्धती (व्याकरण-अनुवाद, प्रत्यक्ष, CLT, TPR व समन्वित)',
        subtopics: [
          'जिम कमिन्स: BICS (दैनंदिन संवाद भाषा) विरुद्ध CALP (शैक्षणिक संज्ञानात्मक भाषा)',
          'दृष्टिकोन (Approach) → पद्धती (Method) → तंत्र (Technique)',
          'व्याकरण-अनुवाद पद्धती (GTM) विरुद्ध प्रत्यक्ष पद्धती (Direct Method)',
          'संरचनात्मक दृष्टिकोन व द्विभाषिक पद्धती (डॉडसन)',
          'संवादात्मक भाषा अध्यापन (CLT), कृतिआधारित (TBLT), TPR व समन्वित दृष्टिकोन',
        ],
        introduction:
          'द्वितीय भाषा (L2) शिकवण्यासाठी योग्य अध्यापन पद्धतीची निवड महत्त्वाची असते. CTET व MAHA TET मध्ये BICS-CALP आणि CLT, प्रत्यक्ष व TPR पद्धतींवर नियमित प्रश्न येतात.',
        meaningAndDefinition:
          'दृष्टिकोन म्हणजे भाषाविषयक तात्त्विक भूमिका; पद्धती म्हणजे त्यावर आधारित नियोजनबद्ध आराखडा; आणि तंत्र म्हणजे वर्गातील प्रत्यक्ष कृती होय.',
        detailedExplanation: [
          '१. BICS विरुद्ध CALP (जिम कमिन्स): BICS = दैनंदिन अनौपचारिक संवाद (१–२ वर्षे); CALP = पाठ्यपुस्तक आकलन व विश्लेषणात्मक शैक्षणिक भाषा (५–७ वर्षे).',
          '२. व्याकरण-अनुवाद पद्धती (GTM): मातृभाषेतून भाषांतर व अवगामी व्याकरण; श्रवण-भाषण दुर्लक्षित.',
          '३. प्रत्यक्ष पद्धती (Direct Method): मातृभाषा पूर्ण वर्ज्य; थेट लक्ष्य भाषेतून मौखिक संभाषण व उद्गामी व्याकरण.',
          '४. संवादात्मक भाषा अध्यापन (CLT — डेल हाइम्स): वास्तविक संवाद कृतींमधून संवादात्मक सक्षमता विकास.',
          '५. TPR (जेम्स अ‍ॅशर) व समन्वित (Eclectic) दृष्टिकोन: TPR मध्ये सूचनांना शारीरिक कृतीची जोड असते. समन्वित दृष्टिकोन अनेक पद्धतींतील उत्तम तंत्रे एकत्र करतो.',
        ],
        importantConcepts: [
          'संवादात्मक सक्षमता (डेल हाइम्स): व्याकरणासोबतच सामाजिकदृष्ट्या योग्य संवाद कौशल्य.',
          'द्विभाषिक पद्धती (डॉडसन): फक्त शिक्षकानेच अर्थ स्पष्ट करण्यासाठी मर्यादित मातृभाषा वापरणे.',
        ],
        comparisonTable: {
          caption: 'प्रमुख द्वितीय भाषा अध्यापन पद्धती',
          headers: ['पद्धती', 'मातृभाषा वापर', 'व्याकरण', 'मुख्य भर'],
          rows: [
            ['व्याकरण-अनुवाद (GTM)', 'मोठ्या प्रमाणात', 'अवगामी (नियम आधी)', 'वाचन व भाषांतर'],
            ['प्रत्यक्ष पद्धती', 'पूर्ण वर्ज्य', 'उद्गामी', 'मौखिक प्रवाहीपणा'],
            ['संवादात्मक (CLT)', 'गरजेनुसार अल्प', 'संदर्भाधिष्ठित', 'अर्थपूर्ण वास्तविक संवाद'],
            ['TPR', 'अल्प', 'कृतीतून सहज', 'श्रवण + शारीरिक हालचाल'],
          ],
        },
        keyThinkers: [
          { name: 'जिम कमिन्स', contribution: 'BICS (सामाजिक भाषा) व CALP (शैक्षणिक भाषा).' },
          { name: 'डेल हाइम्स', contribution: 'संवादात्मक सक्षमता (CLT चा पाया).' },
          { name: 'जेम्स अ‍ॅशर', contribution: 'संपूर्ण शारीरिक प्रतिसाद (TPR).' },
          { name: 'सी. जे. डॉडसन', contribution: 'द्विभाषिक पद्धती (Bilingual Method).' },
        ],
        practicalExamples: [
          'मित्रांशी गप्पा मारताना अस्खलित बोलणारा विद्यार्थी (BICS) विज्ञानाचा पाठ समजताना अडखळतो (CALP गरज).',
        ],
        classroomApplications: [
          'प्राथमिक वर्गात TPR खेळ व उच्च प्राथमिक वर्गात CLT आधारित जोडी-संवाद घ्यावेत.',
        ],
        teachingMethods: [
          'CLT, TBLT, TPR आणि समन्वित (Eclectic) पद्धती.',
        ],
        examSpecificFocus: {
          ctet: 'CTET भाषा २ मध्ये BICS-CALP, CLT, TBLT, TPR व प्रत्यक्ष विरुद्ध GTM पद्धतीवर दरवर्षी प्रश्न येतात.',
          mahaTet: 'MAHA TET मध्ये दृष्टिकोन-पद्धती-तंत्र, संरचनात्मक व द्विभाषिक पद्धती विचारल्या जातात.',
        },
        importantExamPoints: [
          'GTM चा घटक "शब्द" तर प्रत्यक्ष पद्धतीचा घटक "वाक्य" असतो.',
          'CLT मध्ये अर्थपूर्ण संवादास प्राधान्य असते.',
        ],
        commonMistakes: [
          'BICS व CALP ची अदलाबदल करणे.',
        ],
        topicSummary:
          'BICS पासून CALP कडे प्रवास करण्यासाठी CLT, TPR व समन्वित पद्धती अत्यंत प्रभावी ठरतात.',
        revisionPoints: [
          'BICS = दैनंदिन संवाद; CALP = शैक्षणिक भाषा (जिम कमिन्स).',
          'Direct = मातृभाषा नाही; GTM = भाषांतर प्रधान.',
          'CLT = वास्तविक संवाद; TPR = सूचना + शारीरिक कृती.',
        ],
        practiceQuestions: [
          {
            id: 'lang2-u3-mr-q1',
            question: 'जिम कमिन्स यांच्या मते "CALP" कशाशी संबंधित आहे?',
            options: ['खेळाच्या मैदानावरील गप्पा', 'पाठ्यपुस्तक आकलन व अमूर्त शैक्षणिक भाषा प्रावीण्य', 'सुंदर हस्ताक्षर', 'केवळ पाठांतर'],
            correctAnswer: 1,
            explanation: 'CALP म्हणजे शालेय विषय समजणे व शैक्षणिक लेखनाची सखोल भाषिक क्षमता.',
            topicReference: 'घटक ३ · BICS व CALP',
          },
          {
            id: 'lang2-u3-mr-q2',
            question: 'कोणत्या पद्धतीत मातृभाषेचा वापर पूर्णतः टाळून थेट लक्ष्य भाषेत शिकवले जाते?',
            options: ['व्याकरण-अनुवाद', 'प्रत्यक्ष पद्धती (Direct Method)', 'द्विभाषिक पद्धती', 'पाठांतर पद्धती'],
            correctAnswer: 1,
            explanation: 'प्रत्यक्ष पद्धतीत मातृभाषेतून भाषांतर पूर्णतः वर्ज्य असते.',
            topicReference: 'घटक ३ · प्रत्यक्ष पद्धती',
          },
          {
            id: 'lang2-u3-mr-q3',
            question: 'संवादात्मक भाषा अध्यापन (CLT) पद्धतीचे मुख्य उद्दिष्ट कोणते?',
            options: ['वास्तविक परिस्थितीतील संवादात्मक सक्षमता विकास', 'व्याकरण नियम पाठांतर', 'चुकांवर शिक्षा', 'शब्दशः भाषांतर'],
            correctAnswer: 0,
            explanation: 'CLT अर्थपूर्ण व प्रभावी वास्तविक संवादाची क्षमता विकसित करते.',
            topicReference: 'घटक ३ · CLT',
          },
        ],
      },
      Hindi: {
        documentTitle: 'भाषा २ · इकाई ३: द्वितीय भाषा अधिगम सिद्धांत एवं शिक्षण विधियाँ',
        unitTitle: 'इकाई ३: द्वितीय भाषा शिक्षाशास्त्र एवं प्रमुख विधियाँ',
        topicTitle: 'जिम कमिंस (BICS बनाम CALP) तथा शिक्षण विधियाँ (GTM, प्रत्यक्ष, संरचनात्मक, CLT, TPR एवं समन्वयवादी)',
        subtopics: [
          'जिम कमिंस: BICS (सामाजिक भाषा) बनाम CALP (अकादमिक भाषा)',
          'उपागम (Approach) → विधि (Method) → प्रविधि (Technique)',
          'व्याकरण-अनुवाद विधि (GTM) बनाम प्रत्यक्ष विधि (Direct Method)',
          'संरचनात्मक उपागम एवं द्विभाषिक विधि (डॉडसन)',
          'संप्रेषणात्मक (CLT), कार्य-आधारित (TBLT), TPR एवं समन्वयवादी उपागम',
        ],
        introduction:
          'द्वितीय भाषा शिक्षण में उपयुक्त विधि का चयन अत्यंत महत्वपूर्ण है। CTET और MAHA TET भाषा-२ में जिम कमिंस के BICS-CALP तथा CLT, प्रत्यक्ष व TPR विधियों से निरंतर प्रश्न आते हैं।',
        meaningAndDefinition:
          'उपागम भाषा के प्रति सैद्धांतिक दृष्टिकोण है; विधि उस पर आधारित शिक्षण योजना है; और प्रविधि कक्षा में प्रयुक्त विशिष्ट गतिविधि है।',
        detailedExplanation: [
          '१. BICS बनाम CALP (जिम कमिंस): BICS दैनिक अनौपचारिक बातचीत की भाषा है (१–२ वर्ष); CALP अमूर्त शैक्षणिक व पाठ्यपुस्तकीय भाषा दक्षता है (५–७ वर्ष)।',
          '२. व्याकरण-अनुवाद विधि (GTM): मातृभाषा में अनुवाद व निगमनात्मक व्याकरण; बोलना-सुनना उपेक्षित।',
          '३. प्रत्यक्ष विधि (Direct Method): मातृभाषा पूर्णतः निषिद्ध; मौखिक प्रवाह व आगमनात्मक व्याकरण।',
          '४. संप्रेषणात्मक भाषा शिक्षण (CLT — डेल हाइम्स): वास्तविक संवाद कार्यों द्वारा संप्रेषणात्मक दक्षता का विकास।',
          '५. समग्र भौतिक प्रतिक्रिया (TPR — जेम्स ऐशर) एवं समन्वयवादी उपागम: TPR मौखिक आदेशों को शारीरिक क्रियाओं से जोड़ता है; समन्वयवादी उपागम विविध विधियों के श्रेष्ठ तत्वों को मिलाता है।',
        ],
        importantConcepts: [
          'संप्रेषणात्मक दक्षता (डेल हाइम्स): व्याकरण शुद्धि के साथ सामाजिक संदर्भानुकूल भाषा प्रयोग।',
          'द्विभाषिक विधि (डॉडसन): केवल शिक्षक द्वारा कठिन अर्थ स्पष्ट करने हेतु मातृभाषा का सीमित उपयोग।',
        ],
        comparisonTable: {
          caption: 'द्वितीय भाषा शिक्षण विधियों का तुलनात्मक सार',
          headers: ['विधि', 'मातृभाषा प्रयोग', 'व्याकरण', 'प्रमुख केंद्र'],
          rows: [
            ['व्याकरण-अनुवाद (GTM)', 'अत्यधिक', 'निगमनात्मक', 'पठन एवं अनुवाद'],
            ['प्रत्यक्ष विधि', 'पूर्णतः निषिद्ध', 'आगमनात्मक', 'मौखिक प्रवाह'],
            ['संप्रेषणात्मक (CLT)', 'सीमित', 'संदर्भगत', 'वास्तविक अर्थपूर्ण संप्रेषण'],
            ['TPR', 'न्यूनतम', 'क्रिया से सहज', 'श्रवण + शारीरिक गतिविधि'],
          ],
        },
        keyThinkers: [
          { name: 'जिम कमिंस', contribution: 'BICS तथा CALP की संकल्पना।' },
          { name: 'डेल हाइम्स', contribution: 'संप्रेषणात्मक दक्षता (CLT)।' },
          { name: 'जेम्स ऐशर', contribution: 'समग्र भौतिक प्रतिक्रिया (TPR)।' },
          { name: 'सी. जे. डॉडसन', contribution: 'द्विभाषिक विधि।' },
        ],
        practicalExamples: [
          'खेल के मैदान में सहज बोलने वाला विद्यार्थी (BICS) विज्ञान अध्याय समझने में कठिनाई महसूस करे — यह CALP की आवश्यकता है।',
        ],
        classroomApplications: [
          'प्राथमिक स्तर पर TPR खेल और उच्च प्राथमिक स्तर पर CLT संवाद गतिविधियाँ कराएँ।',
        ],
        teachingMethods: [
          'CLT, TBLT, TPR तथा समन्वयवादी (Eclectic) विधि।',
        ],
        examSpecificFocus: {
          ctet: 'CTET भाषा-२ में BICS-CALP, CLT, TBLT, TPR और प्रत्यक्ष बनाम GTM विधि से सर्वाधिक प्रश्न आते हैं।',
          mahaTet: 'MAHA TET में उपागम-विधि-प्रविधि अंतर, संरचनात्मक एवं द्विभाषिक विधि पर प्रश्न पूछे जाते हैं।',
        },
        importantExamPoints: [
          'GTM की शिक्षण इकाई "शब्द" और प्रत्यक्ष विधि की इकाई "वाक्य" है।',
          'CLT में अर्थपूर्ण वास्तविक संप्रेषण सर्वोपरि है।',
        ],
        commonMistakes: [
          'BICS को अकादमिक और CALP को सामाजिक मान लेना।',
        ],
        topicSummary:
          'BICS से CALP तक पहुँचने के लिए CLT, TPR और समन्वयवादी विधियाँ सर्वाधिक प्रभावी हैं।',
        revisionPoints: [
          'BICS = सामाजिक संवाद; CALP = अकादमिक दक्षता (जिम कमिंस)।',
          'Direct = मातृभाषा वर्जित; GTM = अनुवाद प्रधान।',
          'CLT = वास्तविक संप्रेषण; TPR = आदेश + शारीरिक क्रिया।',
        ],
        practiceQuestions: [
          {
            id: 'lang2-u3-hi-q1',
            question: 'जिम कमिंस के अनुसार "BICS" किस प्रकार की भाषा दक्षता है?',
            options: ['शोध-पत्र लेखन', 'दैनिक अनौपचारिक सामाजिक बातचीत की भाषा', 'केवल व्याकरण ज्ञान', 'अमूर्त वैज्ञानिक व्याख्या'],
            correctAnswer: 1,
            explanation: 'BICS रोज़मर्रा की अनौपचारिक सामाजिक बातचीत की भाषा है।',
            topicReference: 'इकाई ३ · BICS बनाम CALP',
          },
          {
            id: 'lang2-u3-hi-q2',
            question: 'किस विधि में मातृभाषा के प्रयोग को पूर्णतः वर्जित किया जाता है?',
            options: ['व्याकरण-अनुवाद', 'प्रत्यक्ष विधि (Direct Method)', 'द्विभाषिक विधि', 'अनुवाद विधि'],
            correctAnswer: 1,
            explanation: 'प्रत्यक्ष विधि में मातृभाषा में अनुवाद पूर्णतः वर्जित होता है।',
            topicReference: 'इकाई ३ · प्रत्यक्ष विधि',
          },
          {
            id: 'lang2-u3-hi-q3',
            question: 'समग्र भौतिक प्रतिक्रिया (TPR) विधि के प्रवर्तक कौन हैं?',
            options: ['स्किनर', 'जेम्स ऐशर', 'जॉन डीवी', 'थॉर्नडाइक'],
            correctAnswer: 1,
            explanation: 'जेम्स ऐशर ने TPR विधि विकसित की।',
            topicReference: 'इकाई ३ · TPR',
          },
        ],
      },
    },
  },

  // =========================================================================
  // LANGUAGE II — UNIT 4: EVALUATING LANGUAGE PROFICIENCY & REMEDIATION
  // =========================================================================
  {
    slug: 'lang2-u4-evaluation-proficiency-remediation',
    unitNumber: 4,
    topicNumber: 4,
    subjectId: 'LANGUAGE_2',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_1', 'PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Official Syllabus (ctet.nic.in) — Language II Pedagogy: Evaluating Language Comprehension & Proficiency (LSRW), Portfolios, Rubrics & Remedial Teaching',
      mahaTet: 'MSCE Pune MAHA TET Syllabus (mscepune.in / mahatet.in) — Language II Pedagogy: CCE, Assessment Tools & Remedial Strategies',
    },
    content: {
      English: {
        documentTitle: 'Language II · Unit 4: Evaluating Language Proficiency (LSRW) & Remedial Teaching',
        unitTitle: 'Unit 4: Assessment, Portfolios & Remediation in L2',
        topicTitle: 'Evaluating LSRW, Assessment FOR/OF/AS Learning, Portfolios, Rubrics & Anecdotal Records',
        subtopics: [
          'Assessment FOR Learning (Formative), OF Learning (Summative), and AS Learning (Self/Peer)',
          'Authentic assessment of Listening, Speaking, Reading, and Writing',
          'Qualitative Tools: Portfolio, Rubric, Anecdotal Record, Rating Scale, Checklist',
          'Good Test Qualities: Validity, Reliability, Objectivity, Usability',
          'Error Analysis (Interlingual vs. Intralingual) and Remedial Strategies',
        ],
        introduction:
          'Modern language evaluation moves beyond narrow written exams to Continuous and Comprehensive Evaluation (CCE), measuring all four LSRW skills through Portfolios, Rubrics, and objective observations.',
        meaningAndDefinition:
          'Language Proficiency Assessment gathers ongoing evidence across listening, speaking, reading, and writing to guide instructional improvement and targeted remedial support.',
        detailedExplanation: [
          '1. Assessment FOR / OF / AS Learning: FOR Learning = Formative (during learning for feedback); OF Learning = Summative (end-of-term grading); AS Learning = Self/Peer metacognitive monitoring.',
          '2. Evaluating LSRW: Listening (audio comprehension, listen-and-draw), Speaking (role-play, storytelling, picture talk), Reading (cloze, own-words retelling), Writing (diaries, letters, process drafts).',
          '3. Qualitative Tools: Portfolio (purposeful longitudinal collection of student work showing growth), Rubric (explicit criteria + performance descriptors), Anecdotal Record (brief objective factual note of a notable learning incident).',
          '4. Test Qualities: Validity (measures the exact skill claimed), Reliability (consistent scores), Objectivity (bias-free scoring).',
          '5. Error Analysis: Interlingual errors stem from L1 transfer; Intralingual errors stem from L2 rule overgeneralization ("sheeps", "comed").',
        ],
        importantConcepts: [
          'Portfolio: Longitudinal collection of drafts, reflections, and creative pieces showing progress.',
          'Rubric: Scoring guide with clear criteria ensuring transparent grading.',
          'Anecdotal Record: Factual, non-judgmental snapshot of observable behaviour.',
        ],
        comparisonTable: {
          caption: 'Key Qualitative Assessment Tools in Language Pedagogy',
          headers: ['Tool', 'Captures', 'Pedagogical Value'],
          rows: [
            ['Portfolio', 'Curated samples of student work over time', 'Shows longitudinal growth & reflection'],
            ['Rubric', 'Criteria + graded proficiency levels', 'Makes open-ended speaking/writing scoring fair'],
            ['Anecdotal Record', 'Brief objective narrative of a notable moment', 'Records authentic oral/social behaviours'],
            ['Checklist', 'Yes / No presence of target indicators', 'Fast milestone verification'],
          ],
        },
        practicalExamples: [
          'Testing "Speaking Skill" through a silent spelling test lacks VALIDITY.',
        ],
        classroomApplications: [
          'Share a simple Rubric before writing/speaking tasks and run "Two Stars and a Wish" peer review (Assessment AS Learning).',
        ],
        teachingMethods: [
          'Continuous & Comprehensive Evaluation (CCE) and small-group diagnostic remediation.',
        ],
        examSpecificFocus: {
          ctet: 'CTET Language II frequently tests Portfolio, Rubric, Anecdotal Record, Assessment FOR/OF/AS Learning, and Validity vs. Reliability.',
          mahaTet: 'MAHA TET tests CCE tools, formative vs. summative evaluation, and qualities of a good test.',
        },
        importantExamPoints: [
          'Portfolio = purposeful collection of student work over time (NOT a report card).',
          'Validity = measuring the intended skill; Reliability = consistency.',
        ],
        commonMistakes: [
          'Swapping Validity and Reliability.',
          'Writing opinionated labels ("lazy") in an Anecdotal Record instead of objective facts.',
        ],
        topicSummary:
          'Authentic L2 assessment relies on valid LSRW tasks, Portfolios, Rubrics, and Assessment FOR/AS Learning to guide compassionate remediation.',
        revisionPoints: [
          'FOR = Formative; OF = Summative; AS = Self/Peer Assessment.',
          'Portfolio = Growth folder; Rubric = Criteria matrix; Anecdotal = Objective incident note.',
          'Validity = Right skill measured; Reliability = Consistent results.',
        ],
        practiceQuestions: [
          {
            id: 'lang2-u4-en-q1',
            question: 'A folder containing a student’s dated story drafts, book reviews, and self-reflection sheets across the term is a:',
            options: ['Summative rank list', 'Portfolio', 'Standardized IQ test', 'Dictation ledger'],
            correctAnswer: 1,
            explanation: 'A Portfolio purposefully collects student work over time to demonstrate progress.',
            topicReference: 'Unit 4 · Portfolio',
          },
          {
            id: 'lang2-u4-en-q2',
            question: 'Which task has the highest VALIDITY for assessing Grade 5 SPEAKING proficiency?',
            options: [
              'A silent spelling quiz',
              'Neat notebook copying',
              'Pair role-play and picture-based storytelling rated with a rubric',
              'Memorizing grammar definitions',
            ],
            correctAnswer: 2,
            explanation: 'Speaking validity requires direct oral production tasks like role-play and storytelling.',
            topicReference: 'Unit 4 · Validity',
          },
          {
            id: 'lang2-u4-en-q3',
            question: 'Students checking their own essay drafts against a criteria list before submission exemplifies:',
            options: ['Assessment OF Learning', 'Assessment AS Learning', 'Norm-referenced ranking', 'Standardized screening'],
            correctAnswer: 1,
            explanation: 'Self-monitoring and self-regulation define Assessment AS Learning.',
            topicReference: 'Unit 4 · Assessment FOR/OF/AS',
          },
        ],
      },
      Marathi: {
        documentTitle: 'भाषा २ · घटक ४: भाषिक प्रावीण्य मूल्यमापन (LSRW) आणि उपचारात्मक अध्यापन',
        unitTitle: 'घटक ४: मूल्यमापन साधने, पोर्टफोलिओ व उपचारात्मक नियोजन',
        topicTitle: 'LSRW मूल्यमापन, FOR/OF/AS मूल्यमापन, पोर्टफोलिओ, रुब्रिक, प्रसंगनोंदी व सप्रमाणता',
        subtopics: [
          'अध्ययनासाठी (FOR), अध्ययनाचे (OF) व अध्ययन म्हणून (AS) मूल्यमापन',
          'चारही भाषिक कौशल्यांचे प्रामाणिक मूल्यमापन',
          'पोर्टफोलिओ, रुब्रिक, प्रसंगनोंद व पडताळा सूची',
          'उत्तम चाचणीचे गुणधर्म: सप्रमाणता (Validity), विश्वसनीयता (Reliability) व वस्तुनिष्ठता',
          'त्रुटिविश्लेषण व उपचारात्मक अध्यापन',
        ],
        introduction:
          'सातत्यपूर्ण सर्वंकष मूल्यमापन (CCE) पद्धतीत श्रवण, भाषण, वाचन व लेखन या चारही कौशल्यांची प्रगती मोजण्यासाठी पोर्टफोलिओ, रुब्रिक व प्रसंगनोंदी वापरल्या जातात.',
        meaningAndDefinition:
          'भाषिक प्रावीण्य मूल्यमापन म्हणजे विद्यार्थ्याची द्वितीय भाषेतील प्रत्यक्ष कार्यक्षमता विविध साधनांद्वारे सातत्याने तपासून अध्ययनात सुधारणा घडवून आणणे होय.',
        detailedExplanation: [
          '१. मूल्यमापनाचे तीन प्रकार: FOR Learning (आकारिक — शिकवताना सुधारणा), OF Learning (संकलित — अंतिम श्रेणी), AS Learning (स्व-मूल्यमापन व सहपाठी मूल्यमापन).',
          '२. गुणात्मक साधने: पोर्टफोलिओ (वर्षभरातील निवडक कामांचा कालबद्ध संग्रह), रुब्रिक (स्पष्ट निकष व पातळ्यांचा तक्ता), प्रसंगनोंद (वर्गातील उल्लेखनीय घटनेची तटस्थ नोंद).',
          '३. उत्तम चाचणीचे गुणधर्म: सप्रमाणता/वैधता (ठरवलेले कौशल्यच मोजणे), विश्वसनीयता (निकालातील सातत्य), वस्तुनिष्ठता (पक्षपातविरहित).',
        ],
        importantConcepts: [
          'पोर्टफोलिओ: कालबद्ध प्रगती दाखवणारी संचयिका.',
          'रुब्रिक: मुक्तोत्तरी कामांचे पारदर्शक निकष.',
          'प्रसंगनोंद: पूर्वग्रहविरहित तथ्यात्मक नोंद.',
        ],
        comparisonTable: {
          caption: 'प्रमुख गुणात्मक मूल्यमापन साधने',
          headers: ['साधन', 'काय नोंदवले जाते?', 'मुख्य फायदा'],
          rows: [
            ['पोर्टफोलिओ', 'वर्षभरातील लेखन, चित्रे, उपक्रम', 'कालानुरूप प्रगती व स्व-चिंतन'],
            ['रुब्रिक', 'स्पष्ट निकष व प्रगती पातळ्या', 'निःपक्षपाती मूल्यमापन'],
            ['प्रसंगनोंद', 'महत्त्वपूर्ण प्रसंगाचे तटस्थ वर्णन', 'मौखिक/सामाजिक कौशल्य नोंद'],
          ],
        },
        practicalExamples: [
          'भाषण कौशल्य तपासण्यासाठी केवळ शुद्धलेखनाची लेखी चाचणी घेतल्यास तीत सप्रमाणता (Validity) नसते.',
        ],
        classroomApplications: [
          'लेखन/भाषण उपक्रमाआधीच रुब्रिक विद्यार्थ्यांना सांगावे व दरमहा पोर्टफोलिओ अद्ययावत करावा.',
        ],
        teachingMethods: [
          'सातत्यपूर्ण सर्वंकष मूल्यमापन (CCE) व सहपाठी अभिप्राय.',
        ],
        examSpecificFocus: {
          ctet: 'CTET भाषा २ मध्ये पोर्टफोलिओ, रुब्रिक, प्रसंगनोंद, Assessment FOR/OF/AS आणि Validity-Reliability वर नियमित प्रश्न येतात.',
          mahaTet: 'MAHA TET मध्ये आकारिक-संकलित मूल्यमापन व उत्तम चाचणीचे गुणधर्म विचारले जातात.',
        },
        importantExamPoints: [
          'पोर्टफोलिओ = विद्यार्थ्यांच्या प्रगतीचा कालबद्ध संग्रह.',
          'FOR = आकारिक; OF = संकलित; AS = स्व-मूल्यमापन.',
        ],
        commonMistakes: [
          'वैधता व विश्वसनीयता यांचा अर्थ अदलाबदल करणे.',
        ],
        topicSummary:
          'पोर्टफोलिओ, रुब्रिक व सप्रमाण LSRW मूल्यमापन उपचारात्मक अध्यापनाला अचूक दिशा देते.',
        revisionPoints: [
          'FOR = आकारिक; OF = संकलित; AS = स्व-मूल्यमापन.',
          'पोर्टफोलिओ = प्रगती संचयिका; रुब्रिक = निकष तक्ता.',
          'वैधता = उद्दिष्टाचे अचूक मापन; विश्वसनीयता = निकालातील सातत्य.',
        ],
        practiceQuestions: [
          {
            id: 'lang2-u4-mr-q1',
            question: 'विद्यार्थ्याच्या वर्षभरातील कथा मसुदे, चित्रवर्णने व स्व-चिंतन ठेवण्याच्या साधनास काय म्हणतात?',
            options: ['गुणपत्रक', 'पोर्टफोलिओ (संचयिका)', 'हजेरीपट', 'वेळापत्रक'],
            correctAnswer: 1,
            explanation: 'पोर्टफोलिओ विद्यार्थ्यांच्या प्रगतीचा कालबद्ध संग्रह असतो.',
            topicReference: 'घटक ४ · पोर्टफोलिओ',
          },
          {
            id: 'lang2-u4-mr-q2',
            question: 'विद्यार्थ्यांनी स्वतःचा मसुदा पडताळा सूचीने तपासून सुधारणे म्हणजे कोणते मूल्यमापन?',
            options: ['OF Learning', 'AS Learning (अध्ययन म्हणून मूल्यमापन)', 'मानकीकृत परीक्षा', 'अंतिम श्रेणी'],
            correctAnswer: 1,
            explanation: 'स्व-मूल्यमापन म्हणजे Assessment AS Learning होय.',
            topicReference: 'घटक ४ · मूल्यमापन प्रकार',
          },
          {
            id: 'lang2-u4-mr-q3',
            question: 'चाचणी ज्या कौशल्यासाठी बनवली आहे त्याच कौशल्याचे अचूक मापन करण्याच्या गुणधर्मास काय म्हणतात?',
            options: ['विश्वसनीयता', 'सप्रमाणता / वैधता (Validity)', 'व्यापकता', 'कठीणता'],
            correctAnswer: 1,
            explanation: 'लक्षित कौशल्याचे अचूक मापन म्हणजे वैधता (Validity).',
            topicReference: 'घटक ४ · उत्तम चाचणी',
          },
        ],
      },
      Hindi: {
        documentTitle: 'भाषा २ · इकाई ४: भाषायी दक्षता मूल्यांकन (LSRW) एवं उपचारात्मक शिक्षण',
        unitTitle: 'इकाई ४: मूल्यांकन उपकरण, पोर्टफोलियो एवं उपचारात्मक रणनीतियाँ',
        topicTitle: 'LSRW मूल्यांकन, आकलन के प्रकार (FOR/OF/AS), पोर्टफोलियो, रूब्रिक एवं उपाख्यानात्मक अभिलेख',
        subtopics: [
          'सीखने के लिए (FOR), सीखने का (OF) तथा सीखने के रूप में (AS) आकलन',
          'सुनना, बोलना, पढ़ना, लिखना का प्रामाणिक मूल्यांकन',
          'पोर्टफोलियो, रूब्रिक, उपाख्यानात्मक अभिलेख तथा जाँच सूची',
          'अच्छे परीक्षण के गुण: वैधता (Validity), विश्वसनीयता (Reliability) एवं वस्तुनिष्ठता',
          'त्रुटि-विश्लेषण एवं वैयक्तिक उपचारात्मक शिक्षण',
        ],
        introduction:
          'सतत एवं व्यापक मूल्यांकन (CCE) में चारों भाषायी कौशलों की वास्तविक प्रगति मापने के लिए पोर्टफोलियो, रूब्रिक और उपाख्यानात्मक अभिलेख का उपयोग किया जाता है।',
        meaningAndDefinition:
          'भाषायी दक्षता आकलन वास्तविक संप्रेषण कार्यों में विद्यार्थी के LSRW स्तर का सतत साक्ष्य एकत्र कर शिक्षण व उपचार को दिशा देने की प्रक्रिया है।',
        detailedExplanation: [
          '१. आकलन के तीन रूप: FOR Learning (रचनात्मक — सुधार हेतु), OF Learning (योगात्मक — सत्रांत ग्रेडिंग), AS Learning (स्व-आकलन व सहपाठी आकलन)।',
          '२. प्रमुख उपकरण: पोर्टफोलियो (क्रमिक कार्य-संग्रह), रूब्रिक (मानदंड व दक्षता स्तर तालिका), उपाख्यानात्मक अभिलेख (महत्वपूर्ण कक्षा घटना का तटस्थ तथ्यात्मक विवरण)।',
          '३. अच्छे परीक्षण के गुण: वैधता (लक्षित कौशल का मापन), विश्वसनीयता (अंकों में संगति), वस्तुनिष्ठता (पूर्वाग्रह-मुक्त)।',
        ],
        importantConcepts: [
          'पोर्टफोलियो: क्रमिक विकास दर्शाने वाला उद्देश्यपूर्ण कार्य-संग्रह।',
          'रूब्रिक: मुक्त-अंत कार्यों के पारदर्शी मूल्यांकन का चार्ट।',
        ],
        comparisonTable: {
          caption: 'भाषा आकलन के प्रमुख गुणात्मक उपकरण',
          headers: ['उपकरण', 'क्या संकलित होता है?', 'प्रमुख लाभ'],
          rows: [
            ['पोर्टफोलियो', 'सत्र भर के लेखन प्रारूप व स्व-चिंतन', 'क्रमिक प्रगति का प्रमाण'],
            ['रूब्रिक', 'स्पष्ट मानदंड व दक्षता स्तर', 'पारदर्शी व निष्पक्ष अंकन'],
            ['उपाख्यानात्मक अभिलेख', 'महत्वपूर्ण प्रसंग का तथ्यात्मक विवरण', 'मौखिक/व्यावहारिक कौशल की झलक'],
          ],
        },
        practicalExamples: [
          'वाचन (बोलने) की दक्षता जाँचने के लिए केवल लिखित वर्तनी परीक्षा लेना वैधता (Validity) का अभाव है।',
        ],
        classroomApplications: [
          'कार्य देने से पहले रूब्रिक साझा करें और प्रत्येक माह छात्रों से अपने पोर्टफोलियो की समीक्षा कराएँ।',
        ],
        teachingMethods: [
          'सतत एवं व्यापक मूल्यांकन (CCE) तथा सहपाठी-समीक्षा।',
        ],
        examSpecificFocus: {
          ctet: 'CTET भाषा-२ में पोर्टफोलियो, रूब्रिक, उपाख्यानात्मक अभिलेख, FOR/OF/AS आकलन व वैधता-विश्वसनीयता से नियमित प्रश्न आते हैं।',
          mahaTet: 'MAHA TET में रचनात्मक-योगात्मक आकलन व अच्छे परीक्षण की विशेषताओं पर प्रश्न आते हैं।',
        },
        importantExamPoints: [
          'पोर्टफोलियो केवल अंक-तालिका नहीं बल्कि क्रमिक कार्य-संग्रह है।',
          'FOR = रचनात्मक; OF = योगात्मक; AS = स्व-आकलन।',
        ],
        commonMistakes: [
          'वैधता और विश्वसनीयता को आपस में मिला देना।',
        ],
        topicSummary:
          'रचनात्मक आकलन, पोर्टफोलियो, रूब्रिक और वैध LSRW मूल्यांकन प्रभावी उपचारात्मक शिक्षण का आधार हैं।',
        revisionPoints: [
          'FOR = रचनात्मक; OF = योगात्मक; AS = स्व-आकलन।',
          'पोर्टफोलियो = क्रमिक संग्रह; रूब्रिक = मानदंड तालिका।',
          'वैधता = लक्षित कौशल का मापन; विश्वसनीयता = परिणाम स्थिरता।',
        ],
        practiceQuestions: [
          {
            id: 'lang2-u4-hi-q1',
            question: 'विद्यार्थियों के क्रमिक लेखन प्रारूपों और स्व-आकलन पत्रों का व्यवस्थित संग्रह क्या कहलाता है?',
            options: ['योगात्मक परीक्षा', 'पोर्टफोलियो', 'उपस्थिति पंजिका', 'अंक-सूची'],
            correctAnswer: 1,
            explanation: 'पोर्टफोलियो समय के साथ भाषायी प्रगति का उद्देश्यपूर्ण संग्रह है।',
            topicReference: 'इकाई ४ · पोर्टफोलियो',
          },
          {
            id: 'lang2-u4-hi-q2',
            question: 'विद्यार्थी द्वारा स्वयं मानदंड सूची से अपना अनुच्छेद सुधारना किस आकलन का उदाहरण है?',
            options: ['OF Learning', 'AS Learning (सीखने के रूप में आकलन)', 'मानक श्रेणीकरण', 'अंतिम प्रमाणन'],
            correctAnswer: 1,
            explanation: 'स्व-आकलन "सीखने के रूप में आकलन (AS Learning)" है।',
            topicReference: 'इकाई ४ · आकलन प्रकार',
          },
          {
            id: 'lang2-u4-hi-q3',
            question: 'परीक्षण द्वारा ठीक उसी कौशल को मापने का गुण जिसके लिए वह बना है, क्या कहलाता है?',
            options: ['वैधता (Validity)', 'कठिनता', 'दीर्घता', 'औपचारिकता'],
            correctAnswer: 0,
            explanation: 'लक्षित कौशल का सटीक मापन वैधता (Validity) कहलाता है।',
            topicReference: 'इकाई ४ · परीक्षण गुण',
          },
        ],
      },
    },
  },
];
