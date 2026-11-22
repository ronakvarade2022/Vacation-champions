import { TetCtetNoteTopicBlueprint } from './types';

export const LANGUAGE_1_NOTE_BLUEPRINTS: TetCtetNoteTopicBlueprint[] = [
  // =========================================================================
  // LANGUAGE I — UNIT 1: UNSEEN PROSE & POETRY COMPREHENSION
  // =========================================================================
  {
    slug: 'lang1-u1-prose-poetry-comprehension',
    unitNumber: 1,
    topicNumber: 1,
    subjectId: 'LANGUAGE_1',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_1', 'PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Official Syllabus (ctet.nic.in) — Language I: Unseen Prose, Drama & Poem Comprehension (15 Marks)',
      mahaTet: 'MSCE Pune MAHA TET Syllabus (mscepune.in / mahatet.in) — Language I: Reading Comprehension, Prose & Poetry Analysis',
    },
    content: {
      English: {
        documentTitle: 'Language I · Unit 1: Unseen Prose, Drama & Poetry Comprehension',
        unitTitle: 'Unit 1: Reading Comprehension (Prose & Poetry)',
        topicTitle: 'Unseen Prose, Drama & Poem Comprehension: Inference, Theme, Tone & Poetic Devices',
        subtopics: [
          'Literal, inferential, and evaluative reading comprehension levels',
          'Identifying central theme, author tone, purpose, and suitable title',
          'Contextual vocabulary: synonyms, antonyms, idioms, and word-in-context',
          'Poetry comprehension: rhyme scheme, imagery, mood, and figures of speech',
          'Skimming, scanning, and intensive reading strategies in examination conditions',
        ],
        introduction:
          'In both CTET and Maharashtra TET Language I, Reading Comprehension carries substantial weightage (15 out of 30 marks in CTET—typically one prose/drama passage and one poem). Comprehension evaluates whether a prospective teacher can decode meaning, read between the lines, interpret figurative language, and derive contextual grammar directly from authentic text.',
        meaningAndDefinition:
          'Reading Comprehension is the active cognitive process of constructing meaning from written text by integrating linguistic knowledge (vocabulary, syntax) with prior schema and logical inference across three tiers: Literal, Inferential, and Evaluative.',
        detailedExplanation: [
          '1. Prose & Narrative Passages: Identify the central thesis (often in the opening or closing paragraph), supporting evidence, cause-effect links, and discourse shifts marked by "however", "nevertheless", "consequently", and "although".',
          '2. Poetry & Literary Extracts: Poems compress emotion through imagery, symbolism, and sound patterns. Always interpret lines for implied mood and poetic contrast rather than flat literal paraphrase.',
          '3. Contextual Vocabulary: Substitute each candidate option back into the exact sentence from the passage to verify semantic and grammatical fit.',
          '4. Figures of Speech: Master Simile (explicit "like/as"), Metaphor (direct implied comparison), Personification (human traits to inanimate things), Alliteration (initial consonant repetition), Hyperbole (exaggeration), Oxymoron (contradictory pair), and Onomatopoeia (sound words).',
          '5. Exam Strategy: Preview the questions quickly before reading deeply so your attention flags key dates, names, and quoted lines on the first pass.',
        ],
        importantConcepts: [
          'Skimming: Rapid reading for overall gist, central theme, or appropriate title.',
          'Scanning: Targeted search for a specific date, name, number, or phrase.',
          'Intensive Reading: Deep analytical reading for accuracy, grammar cues, and subtle inference.',
          'Extensive Reading: Longer reading for pleasure, fluency, and general vocabulary growth.',
          'Tone vs. Mood: Tone is the author’s attitude; Mood is the emotional atmosphere felt by the reader.',
        ],
        comparisonTable: {
          caption: 'Key Poetic Devices Frequently Tested in Language I',
          headers: ['Device', 'Core Mechanism', 'Original Example'],
          rows: [
            ['Simile', 'Direct comparison using "like" or "as"', 'Her patience shone like a steady lamp in the storm.'],
            ['Metaphor', 'Direct implied identification without "like/as"', 'Time is a quiet sculptor shaping young minds.'],
            ['Personification', 'Human action/feeling given to non-human objects', 'The monsoon wind whispered across the dusty courtyard.'],
            ['Alliteration', 'Repetition of initial consonant sounds', 'Silent silver streams slipped past smooth stones.'],
            ['Oxymoron', 'Two opposite words placed together', 'A deafening silence filled the examination hall.'],
          ],
        },
        practicalExamples: [
          'If a passage notes "Though the village lacked a library, children traded worn storybooks every Sunday," an inferential item correctly concludes that the children valued reading deeply.',
          'In "The weary hills wrapped themselves in evening mist," "weary" and "wrapped themselves" exemplify Personification.',
        ],
        classroomApplications: [
          'Model Think-Aloud reading in class: verbalize how you infer an unfamiliar word from neighbouring context clues.',
          'Ask questions across all three tiers (Literal, Inferential, Evaluative) after every textbook story.',
        ],
        teachingMethods: [
          'SQ3R Method (Survey, Question, Read, Recite, Review).',
          'Reciprocal Teaching (Predicting, Questioning, Clarifying, Summarizing).',
        ],
        examSpecificFocus: {
          ctet: 'CTET Language I strictly features ONE unseen prose/drama passage (~9 Qs) and ONE unseen poem (~6 Qs) totalling 15 marks, with 4–5 embedded contextual grammar/vocabulary items.',
          mahaTet: 'MAHA TET Language I combines unseen prose/poetry comprehension with direct recognition of figures of speech (Alankar), Rasa/Bhava, proverbs, and Balbharati-level inference.',
        },
        importantExamPoints: [
          'Base answers strictly on the passage; never override the text with outside assumptions.',
          'Choose a title covering the entire passage rather than one minor anecdote.',
          'Watch negative phrasing ("Which is NOT true?") carefully.',
        ],
        commonMistakes: [
          'Selecting a factually true general-knowledge option not supported by the passage.',
          'Confusing Simile ("like/as") with Metaphor (direct equation).',
        ],
        topicSummary:
          'Language I comprehension integrates literal, inferential, and evaluative reading with skimming/scanning, contextual vocabulary checks, and literary device analysis.',
        revisionPoints: [
          'Skimming = Gist/Title; Scanning = Specific Fact; Intensive = Deep Analysis.',
          'Simile uses "like/as"; Metaphor equates directly; Personification gives human traits.',
          'Verify every vocabulary answer inside the original sentence.',
        ],
        practiceQuestions: [
          {
            id: 'lang1-u1-en-q1',
            question: 'A teacher asks learners to look quickly through a school notice solely to find the submission date for a science project. Which reading skill is practised?',
            options: ['Skimming', 'Scanning', 'Extensive reading', 'Critical reading'],
            correctAnswer: 1,
            explanation: 'Scanning locates a specific detail (like a date or name) rapidly without reading the entire text word by word.',
            topicReference: 'Unit 1 · Reading Sub-Skills',
          },
          {
            id: 'lang1-u1-en-q2',
            question: 'Identify the figure of speech: "The weary hills wrapped themselves in a blanket of evening mist."',
            options: ['Simile', 'Oxymoron', 'Personification', 'Onomatopoeia'],
            correctAnswer: 2,
            explanation: 'Hills are described as "weary" and actively wrapping themselves, attributing human traits to nature (Personification).',
            topicReference: 'Unit 1 · Poetic Devices',
          },
          {
            id: 'lang1-u1-en-q3',
            question: 'The most suitable title for an unseen prose passage is one that:',
            options: [
              'Quotes the longest sentence from paragraph one',
              'Captures the overarching central idea developed across the entire passage',
              'Names an isolated minor example',
              'Contains the rarest vocabulary word',
            ],
            correctAnswer: 1,
            explanation: 'An accurate title summarizes the unified theme connecting all paragraphs.',
            topicReference: 'Unit 1 · Central Idea & Title',
          },
        ],
      },
      Marathi: {
        documentTitle: 'भाषा १ · घटक १: अपठित गद्य व पद्य उतारा आकलन (Comprehension)',
        unitTitle: 'घटक १: उतारा व कविता आकलन',
        topicTitle: 'अपठित गद्य व पद्य आकलन: मध्यवर्ती कल्पना, निष्कर्ष, संदर्भानुसार शब्दार्थ व अलंकार',
        subtopics: [
          'शाब्दिक (Literal), अनुमानात्मक (Inferential) व चिकित्सक (Critical) वाचन स्तर',
          'उताऱ्याचा मुख्य आशय, लेखकाचा दृष्टिकोन व योग्य शीर्षक निवडणे',
          'संदर्भानुसार समानार्थी, विरुद्धार्थी शब्द, वाक्प्रचार व म्हणींचा अर्थ',
          'पद्य आकलन: भावार्थ, कल्पनाशक्ती, रस आणि शब्दालंकार व अर्थालंकार',
          'परीक्षेतील जलद वाचन तंत्रे: विहंगमावलोकन (Skimming) व शोधवाचन (Scanning)',
        ],
        introduction:
          'CTET आणि महाराष्ट्र TET मधील भाषा १ मध्ये अपठित गद्य व पद्य उतारे अत्यंत महत्त्वाचे असतात (CTET मध्ये ३० पैकी १५ गुण). या विभागाचा उद्देश भावी शिक्षकांची मजकूर समजून घेण्याची, गर्भित अर्थ काढण्याची, काव्यातील भावसौंदर्य ओळखण्याची आणि संदर्भातून व्याकरण ओळखण्याची क्षमता तपासणे हा असतो.',
        meaningAndDefinition:
          'वाचन आकलन म्हणजे केवळ अक्षरांचे उच्चारण नव्हे, तर लिखित मजकुरातील विचार, भावना, कारणमीमांसा आणि गर्भित संदेश पूर्वज्ञानाशी जोडून अर्थनिर्मिती करण्याची सक्रिय बौद्धिक प्रक्रिया होय.',
        detailedExplanation: [
          '१. गद्य उतारा विश्लेषण: उताऱ्याची मुख्य संकल्पना साधारणपणे पहिल्या किंवा शेवटच्या परिच्छेदात असते. "परंतु", "तथापि", "म्हणून", "तरीदेखील" या योजकांनंतर लेखकाचा मुख्य युक्तिवाद स्पष्ट होतो.',
          '२. पद्य (कविता) आकलन: कवितेत शब्द मोजके पण अर्थगर्भ असतात. कवितेतील प्रतीके, कवीचा भाव (करुण, वीर, शांत, वात्सल्य) आणि अलंकार यांचा सखोल विचार करावा.',
          '३. संदर्भानुसार शब्दार्थ: पर्यायातील शब्द मूळ वाक्यात ठेवून तो संदर्भानुसार चपखल बसतो का हे तपासावे.',
          '४. मराठीतील प्रमुख अलंकार: उपमा (सारखे/सम/गत), उत्प्रेक्षा (जणू/गमे/वाटे), रूपक (उपमेय-उपमान एकरूपता), यमक (अंत्यसाम्य), अनुप्रास (वर्णाची पुनरावृत्ती), आणि चेतनगुणोक्ती (निर्जीव वस्तूवर मानवी क्रियांचा आरोप).',
          '५. वेळेचे नियोजन: प्रथम प्रश्न जलद पाहून नंतर उतारा वाचल्यास महत्त्वाचे संदर्भ त्वरित पकडता येतात.',
        ],
        importantConcepts: [
          'विहंगमावलोकन वाचन (Skimming): संपूर्ण उताऱ्याचा सारांश किंवा योग्य शीर्षक शोधण्यासाठी जलद वाचन.',
          'शोधवाचन (Scanning): विशिष्ट तारीख, नाव किंवा आकडेवारी शोधण्यासाठी लक्ष्यकेंद्री वाचन.',
          'सखोल वाचन (Intensive Reading): प्रत्येक शब्दाचा व सूक्ष्म भावाचा अचूक अभ्यास.',
          'विस्तृत वाचन (Extensive Reading): आनंदासाठी व वाचनवेग वाढवण्यासाठी केलेले वाचन.',
        ],
        comparisonTable: {
          caption: 'भाषा १ पद्य आकलनातील महत्त्वाचे अलंकार',
          headers: ['अलंकार', 'ओळखण्याची खूण', 'मौलिक उदाहरण'],
          rows: [
            ['उपमा', 'सारखा, सम, प्रमाणे, गत, परी', 'आईचे प्रेम सागरासारखे अथांग असते.'],
            ['उत्प्रेक्षा', 'जणू, जणूकाय, गमे, वाटे, भासे', 'हा पांढरा ढग जणू आकाशातील कापसाचा डोंगरच!'],
            ['रूपक', 'उपमेय व उपमान यात अभेद (एकरूपता)', 'विद्या हेच खरे धन आहे.'],
            ['चेतनगुणोक्ती', 'निर्जीव वस्तूवर मानवी क्रियांचा आरोप', 'पावसाचे थेंब अंगणात आनंदाने नाचू लागले.'],
            ['अनुप्रास', 'एकाच व्यंजनाची पुनरावृत्ती', 'सळसळणाऱ्या सांजवाऱ्यात सुंदर स्वप्ने सजली.'],
          ],
        },
        practicalExamples: [
          '"शाळेत प्रयोगशाळा नसूनही विद्यार्थ्यांनी घरगुती साहित्यातून उपकरणे बनवली" यावरून विद्यार्थ्यांमध्ये वैज्ञानिक जिज्ञासा व सर्जनशीलता होती हा अचूक अनुमानात्मक निष्कर्ष निघतो.',
          '"पहाटेचा वारा झाडांच्या कानात गुजगोष्टी सांगत होता" — येथे चेतनगुणोक्ती अलंकार आहे.',
        ],
        classroomApplications: [
          'गोष्ट वाचल्यानंतर "कोण, कुठे" यांसोबत "तुम्ही त्या पात्राच्या जागी असता तर काय केले असते?" असे मुक्तोत्तरी प्रश्न विचारावेत.',
          'अपरिचित शब्दांचा अर्थ थेट न सांगता वाक्याच्या संदर्भावरून अंदाज लावण्यास मुलांना प्रवृत्त करावे.',
        ],
        teachingMethods: [
          'SQ3R पद्धती (सर्वेक्षण, प्रश्ननिर्मिती, वाचन, मनन, उजळणी).',
          'सस्वर प्रकट वाचन (कवितेसाठी) आणि मूक वाचन (सखोल आकलनासाठी).',
        ],
        examSpecificFocus: {
          ctet: 'CTET भाषा १ मध्ये १ गद्य उतारा (~९ प्रश्न) आणि १ कविता (~६ प्रश्न) असे १५ गुण असतात, ज्यात ४–५ संदर्भगत व्याकरण प्रश्न असतात.',
          mahaTet: 'MAHA TET भाषा १ (मराठी) मध्ये बालभारती स्तरावरील उतारे, अलंकार, रस, म्हणी, वाक्प्रचार आणि शुद्धलेखनावर आधारित आकलन प्रश्न अधिक येतात.',
        },
        importantExamPoints: [
          'उत्तरे केवळ दिलेल्या उताऱ्याच्या आधारेच द्या; बाहेरील गृहीतके वापरू नका.',
          'शीर्षक निवडताना संपूर्ण उताऱ्याच्या मध्यवर्ती कल्पनेला न्याय देणारा पर्याय निवडा.',
        ],
        commonMistakes: [
          'उपमा ("सारखा") आणि उत्प्रेक्षा ("जणू/वाटे") अलंकार यांमध्ये गोंधळ करणे.',
          'नकारार्थी प्रश्न ("कोणते विधान असत्य आहे?") नीट न वाचणे.',
        ],
        topicSummary:
          'भाषा १ उतारा आकलनामध्ये शाब्दिक-अनुमानात्मक वाचन, संदर्भानुसार शब्दार्थ, अलंकार ज्ञान आणि Skimming/Scanning कौशल्यांचा समन्वय आवश्यक असतो.',
        revisionPoints: [
          'Skimming = मध्यवर्ती आशय; Scanning = विशिष्ट माहितीचा शोध.',
          'उपमा (सारखे) · उत्प्रेक्षा (जणू) · रूपक (एकरूपता) · चेतनगुणोक्ती (मानवी क्रिया).',
          'उताऱ्यातील मजकुराशी प्रामाणिक राहून उत्तर निवडा.',
        ],
        practiceQuestions: [
          {
            id: 'lang1-u1-mr-q1',
            question: 'एका विद्यार्थ्याने रेल्वेच्या वेळापत्रकातून केवळ पुण्याला जाणाऱ्या गाडीची वेळ शोधण्यासाठी जलद नजर फिरवली. हे कोणत्या प्रकारचे वाचन आहे?',
            options: ['विहंगमावलोकन (Skimming)', 'शोधवाचन (Scanning)', 'विस्तृत वाचन', 'प्रकट वाचन'],
            correctAnswer: 1,
            explanation: 'मजकुरातील विशिष्ट माहिती (वेळ, तारीख, नाव) शोधण्यासाठी केलेले लक्ष्यकेंद्री वाचन म्हणजे शोधवाचन (Scanning) होय.',
            topicReference: 'घटक १ · वाचन कौशल्ये',
          },
          {
            id: 'lang1-u1-mr-q2',
            question: '"सकाळचे कोवळे ऊन जणू धरतीवर सोन्याची चादरच पसरवत होते" — या वाक्यातील अलंकार ओळखा.',
            options: ['यमक', 'उत्प्रेक्षा', 'अनुप्रास', 'अतिशयोक्ती'],
            correctAnswer: 1,
            explanation: '"जणू" या कल्पनाव्यक्त शब्दाद्वारे उपमेय हे उपमानच असल्याची कल्पना केली आहे, म्हणून उत्प्रेक्षा अलंकार आहे.',
            topicReference: 'घटक १ · पद्य व अलंकार',
          },
          {
            id: 'lang1-u1-mr-q3',
            question: 'अपठित उताऱ्यासाठी सर्वात योग्य शीर्षक निवडताना कोणता निकष सर्वात महत्त्वाचा असतो?',
            options: [
              'उताऱ्यातील सर्वात मोठे वाक्य घेणे',
              'संपूर्ण उताऱ्याच्या मध्यवर्ती कल्पनेचा संक्षिप्त व अचूक सार असणे',
              'उताऱ्यातील एखाद्या पात्राचे नाव देणे',
              'अवघड शब्दांचा वापर करणे',
            ],
            correctAnswer: 1,
            explanation: 'योग्य शीर्षक संपूर्ण उताऱ्याच्या मुख्य विषयाचे व मध्यवर्ती आशयाचे प्रतिनिधित्व करते.',
            topicReference: 'घटक १ · मध्यवर्ती कल्पना',
          },
        ],
      },
      Hindi: {
        documentTitle: 'भाषा १ · इकाई १: अपठित गद्यांश एवं पद्यांश बोध (Comprehension)',
        unitTitle: 'इकाई १: गद्य एवं पद्य पठन बोध',
        topicTitle: 'अपठित गद्यांश व काव्यांश: मुख्य भाव, निष्कर्ष, संदर्भगत शब्दावली एवं अलंकार',
        subtopics: [
          'पठन के तीन स्तर: शाब्दिक, अनुमानात्मक एवं आलोचनात्मक बोध',
          'केंद्रीय भाव, लेखक का दृष्टिकोण एवं उपयुक्त शीर्षक का चयन',
          'संदर्भगत शब्दावली: पर्यायवाची, विलोम, मुहावरे व वाक्यांश अर्थ',
          'काव्यांश विश्लेषण: भाव-सौंदर्य, रस, बिंब तथा प्रमुख अलंकार',
          'परीक्षा पठन रणनीतियाँ: सरसरी पठन (Skimming) व बारीकी से खोज (Scanning)',
        ],
        introduction:
          'CTET और महाराष्ट्र TET के भाषा-१ प्रश्नपत्र में अपठित गद्यांश और काव्यांश का महत्वपूर्ण स्थान है (CTET में ३० में से १५ अंक)। यह खंड अर्थ-निर्माण, सूक्ष्म निष्कर्ष निकालने, काव्य-भाव समझने और संदर्भ में व्याकरण पहचानने की क्षमता का परीक्षण करता है।',
        meaningAndDefinition:
          'पठन बोध (Reading Comprehension) वह सक्रिय संज्ञानात्मक प्रक्रिया है जिसमें पाठक अपने पूर्व अनुभव, तार्किक अनुमान और भाषा-संरचना की समझ से लिखित पाठ का सार्थक अर्थ निर्मित करता है।',
        detailedExplanation: [
          '१. गद्यांश की संरचना: अनुच्छेद का मुख्य विचार प्रायः आरंभिक या अंतिम पंक्तियों में निहित होता है। "किंतु", "परंतु", "तथापि", "फलस्वरूप" जैसे योजक शब्द तर्क की दिशा स्पष्ट करते हैं।',
          '२. काव्यांश की व्याख्या: कविता में भाव प्रतीकों, बिंबों और अलंकारों में छिपे होते हैं; अतः शाब्दिक अर्थ के बजाय भावात्मक अर्थ पर ध्यान दें।',
          '३. संदर्भगत शब्दार्थ: पर्यायवाची या विलोम चुनते समय विकल्प को मूल वाक्य में रखकर अवश्य जाँचें।',
          '४. प्रमुख अलंकार: अनुप्रास (वर्ण की आवृत्ति), यमक (एक शब्द के भिन्न अर्थ), श्लेष (एक शब्द में अनेक अर्थ), उपमा (सा, सी, से, सम), रूपक (अभेद आरोप), उत्प्रेक्षा (मानो, जनु, मनहुँ) और मानवीकरण (प्रकृति पर मानवीय क्रियाओं का आरोप)।',
          '५. समय प्रबंधन: पहले प्रश्नों पर त्वरित दृष्टि डालकर गद्यांश पढ़ने से मुख्य संकेत शीघ्र मिलते हैं।',
        ],
        importantConcepts: [
          'सरसरी पठन (Skimming): संपूर्ण पाठ का मुख्य सार या शीर्षक जानने हेतु तीव्र पठन।',
          'बारीकी से खोज (Scanning): किसी विशिष्ट तिथि, नाम, संख्या या तथ्य को शीघ्र ढूँढना।',
          'गहन पठन (Intensive Reading): प्रत्येक पंक्ति के सूक्ष्म अर्थ व व्याकरणिक संरचना का अध्ययन।',
          'विस्तृत पठन (Extensive Reading): आनंद, प्रवाह और शब्दावली विस्तार हेतु पठन।',
        ],
        comparisonTable: {
          caption: 'काव्यांश में सर्वाधिक पूछे जाने वाले प्रमुख अलंकार',
          headers: ['अलंकार', 'पहचान का आधार', 'मौलिक उदाहरण'],
          rows: [
            ['उपमा', 'सा, सी, से, सम, सरिस जैसे वाचक शब्द', 'उसका हृदय प्रातःकालीन ओस-सा निर्मल है।'],
            ['रूपक', 'उपमेय और उपमान में पूर्ण अभेद', 'विद्या-धन को कोई चोर चुरा नहीं सकता।'],
            ['उत्प्रेक्षा', 'मानो, मनहुँ, जनु, जानो से संभावना', 'धूप में ओस-कण मानो बिखरे हुए मोती हों।'],
            ['मानवीकरण', 'प्रकृति पर मानवीय भावना/क्रिया का आरोप', 'संध्या सुंदरी धीरे-धीरे क्षितिज से उतर रही थी।'],
            ['अनुप्रास', 'एक ही व्यंजन वर्ण की क्रमिक आवृत्ति', 'कल-कल करती कोमल कावेरी कलियों को छू गई।'],
          ],
        },
        practicalExamples: [
          '"सीमित संसाधनों के बावजूद ग्रामीण बच्चों ने जल स्रोतों का मानचित्र बनाया" से विद्यार्थियों की व्यावहारिक जिज्ञासा का निष्कर्ष निकलता है।',
          '"चाँद मुस्कुराकर झील के दर्पण में झाँक रहा था" — यहाँ मानवीकरण अलंकार है।',
        ],
        classroomApplications: [
          'कहानी पढ़ाने के बाद बच्चों से पूर्वानुमान लगाने, पात्रों के निर्णयों का मूल्यांकन करने और नया अंत सोचने को कहें।',
          'कठिन शब्दों का अर्थ तुरंत न बताकर वाक्य के संदर्भ से अनुमान लगाने दें।',
        ],
        teachingMethods: [
          'SQ3R तकनीक (सर्वेक्षण, प्रश्न, पठन, दोहराव, पुनरीक्षण)।',
          'सस्वर वाचन (कविता हेतु) एवं मौन वाचन (गहन अर्थग्रहण हेतु)।',
        ],
        examSpecificFocus: {
          ctet: 'CTET भाषा-१ में एक गद्यांश (~९ प्रश्न) और एक काव्यांश (~६ प्रश्न) कुल १५ अंक होते हैं, जिनमें संदर्भगत व्याकरण भी रहता है।',
          mahaTet: 'MAHA TET हिंदी भाषा-१ में अपठित गद्य-पद्य के साथ अलंकार, रस, मुहावरे, लोकोक्तियाँ और शुद्ध वर्तनी पर विशेष बल रहता है।',
        },
        importantExamPoints: [
          'उत्तर सदैव दिए गए गद्यांश के तथ्यों पर आधारित रखें; बाहरी अनुमान न थोपें।',
          'शीर्षक वही चुनें जो संपूर्ण गद्यांश के केंद्रीय भाव को समेटे।',
        ],
        commonMistakes: [
          'उपमा ("सा/सम") और उत्प्रेक्षा ("मानो/जनु") में भ्रम।',
          '"कौन-सा कथन सही नहीं है?" जैसे नकारात्मक प्रश्न को ठीक से न पढ़ना।',
        ],
        topicSummary:
          'भाषा-१ पठन बोध में गद्यांश-काव्यांश का अर्थग्रहण, संदर्भगत शब्दावली, प्रमुख अलंकार तथा Skimming-Scanning रणनीतियों का संतुलित उपयोग सफलता दिलाता है।',
        revisionPoints: [
          'Skimming = मुख्य भाव/शीर्षक; Scanning = विशिष्ट तथ्य की खोज।',
          'उपमा (सा/सम), रूपक (अभेद), उत्प्रेक्षा (मानो/जनु), मानवीकरण (मानवीय क्रिया)।',
          'प्रत्येक शब्दार्थ को मूल वाक्य के संदर्भ में जाँचें।',
        ],
        practiceQuestions: [
          {
            id: 'lang1-u1-hi-q1',
            question: 'एक विद्यार्थी विषय-सूची में केवल "जलवायु परिवर्तन" अध्याय की पृष्ठ संख्या ढूँढने के लिए तेजी से दृष्टि दौड़ाता है। यह कौन-सा पठन कौशल है?',
            options: ['सरसरी पठन (Skimming)', 'बारीकी से खोज (Scanning)', 'विस्तृत पठन', 'सस्वर पठन'],
            correctAnswer: 1,
            explanation: 'किसी विशिष्ट सूचना (पृष्ठ संख्या, तिथि, नाम) को शीघ्रता से ढूँढना Scanning कहलाता है।',
            topicReference: 'इकाई १ · पठन कौशल',
          },
          {
            id: 'lang1-u1-hi-q2',
            question: '"प्रातःकाल की किरणें मानो सोते हुए फूलों को जगाने आई हों" — इस पंक्ति में प्रमुख अलंकार कौन-सा है?',
            options: ['श्लेष', 'उत्प्रेक्षा', 'यमक', 'विरोधाभास'],
            correctAnswer: 1,
            explanation: '"मानो" वाचक शब्द से संभावना व्यक्त की गई है, अतः उत्प्रेक्षा अलंकार है।',
            topicReference: 'इकाई १ · प्रमुख अलंकार',
          },
          {
            id: 'lang1-u1-hi-q3',
            question: 'अपठित गद्यांश के प्रश्नों का उत्तर देते समय सबसे आवश्यक सिद्धांत क्या है?',
            options: [
              'बाहरी सामान्य ज्ञान के आधार पर उत्तर देना',
              'गद्यांश के तथ्यों और लेखक के दृष्टिकोण के भीतर रहकर उत्तर चुनना',
              'सबसे लंबे विकल्प को सही मानना',
              'केवल पहले वाक्य के आधार पर सभी उत्तर देना',
            ],
            correctAnswer: 1,
            explanation: 'उत्तर सदैव दिए गए पाठ के तथ्यों और तार्किक संकेतों के अनुरूप होना चाहिए।',
            topicReference: 'इकाई १ · गद्यांश बोध नियम',
          },
        ],
      },
    },
  },

  // =========================================================================
  // LANGUAGE I — UNIT 2: APPLIED & FUNCTIONAL GRAMMAR
  // =========================================================================
  {
    slug: 'lang1-u2-functional-grammar',
    unitNumber: 2,
    topicNumber: 2,
    subjectId: 'LANGUAGE_1',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_1', 'PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Official Syllabus (ctet.nic.in) — Language I: Contextual Grammar & Verbal Ability inside Unseen Passages',
      mahaTet: 'MSCE Pune MAHA TET Syllabus (mscepune.in / mahatet.in) — Language I: Functional Grammar (Parts of Speech, Sandhi, Samas, Tenses, Voice, Clauses)',
    },
    content: {
      English: {
        documentTitle: 'Language I · Unit 2: Applied & Functional Grammar in Context',
        unitTitle: 'Unit 2: Functional Grammar & Sentence Structure',
        topicTitle: 'Parts of Speech, Tenses, Clauses, Word Formation (Prefixes/Suffixes) & Syntax',
        subtopics: [
          'Eight Parts of Speech and functional role shifts in context',
          'Tense system (Present, Past, Future — Simple, Continuous, Perfect, Perfect Continuous)',
          'Subject-Verb Agreement rules and frequent exam exceptions',
          'Clauses: Principal, Coordinate, and Subordinate (Noun, Adjective, Adverb clauses)',
          'Word Formation: Prefixes, Suffixes, Morphemes, and Punctuation',
        ],
        introduction:
          'Functional grammar tests how words behave inside real sentences rather than memorized isolated definitions. In CTET, grammar items are woven into unseen passages (identifying the part of speech or clause type), whereas MAHA TET asks both contextual and direct structural grammar questions.',
        meaningAndDefinition:
          'Functional Grammar studies how word classes, tense, aspect, agreement, and clauses operate together in discourse to convey exact time, agency, and logical connection.',
        detailedExplanation: [
          '1. Contextual Parts of Speech: The same word shifts role by context: "fast" is an adjective in "a fast train", an adverb in "she ran fast", a verb in "they fast", and a noun in "broke her fast".',
          '2. Subject-Verb Agreement: "Each of the students IS present" (singular); "Neither the teacher nor the students WERE late" (agrees with nearer subject); "The number of books IS rising" vs. "A number of books ARE missing".',
          '3. Clauses & Sentence Types: Simple (1 main clause); Compound (2+ independent clauses joined by FANBOYS: for, and, nor, but, or, yet, so); Complex (1 main + subordinate Noun/Adjective/Adverb clause).',
          '4. Tense Accuracy: Present Perfect links past action to present relevance; Past Perfect marks the earlier of two past actions ("The train had left before we reached").',
          '5. Affixation: Prefixes alter meaning (un-, dis-, mis-, re-), while suffixes shift word class (create [V] → creation [N] → creative [Adj] → creatively [Adv]).',
        ],
        importantConcepts: [
          'Morpheme: Smallest meaningful grammatical unit ("un-kind-ness" = 3 morphemes).',
          'Determiner vs. Pronoun: "This book" (Determiner) vs. "This is mine" (Pronoun).',
          'Gerund vs. Participle: "Swimming is healthy" (Gerund = noun) vs. "A swimming duck" (Participle = adjective).',
        ],
        comparisonTable: {
          caption: 'Quick Identification Guide to Subordinate Clauses',
          headers: ['Clause Type', 'Function', 'Test Question / Marker', 'Original Example'],
          rows: [
            ['Noun Clause', 'Subject or object of verb', 'Answers "What?" (that, what, whether)', 'I believe [that honesty builds trust].'],
            ['Adjective Clause', 'Modifies preceding noun', 'Answers "Which one?" (who, which, that)', 'The teacher [who guided us] retired today.'],
            ['Adverb Clause', 'Shows time, reason, condition, contrast', 'When/Why/If/Although', 'We stayed indoors [because it rained].'],
          ],
        },
        practicalExamples: [
          '"Since" marks a point of time ("since 2018"); "for" marks duration ("for six years").',
          '"Few" is negative (almost none), whereas "a few" means a small positive number.',
        ],
        classroomApplications: [
          'Teach grammar inductively: present 5 sentences from a storybook, let students discover the pattern, then apply it in speech and writing.',
        ],
        teachingMethods: [
          'Inductive Grammar Teaching (Examples → Observation → Rule → Usage).',
          'Grammar-in-Context through authentic stories and dialogues.',
        ],
        examSpecificFocus: {
          ctet: 'CTET Language I tests 3–5 embedded grammar items directly from the passage: parts of speech in context, clause types, prefixes/suffixes, and tense accuracy.',
          mahaTet: 'MAHA TET tests both passage-based and direct grammar: Parts of Speech, Tenses, Subject-Verb Agreement, Degrees of Comparison, Question Tags, and Clauses.',
        },
        importantExamPoints: [
          'Determine part of speech strictly from sentence function, never from memory.',
          'Never use "will" inside an "if/when" future condition clause ("If it rains, we will stay inside").',
        ],
        commonMistakes: [
          'Labelling "well" or "fast" as adjective when modifying a verb ("She teaches well" = Adverb).',
          'Confusing "since" (point of time) with "for" (duration).',
        ],
        topicSummary:
          'Functional grammar centres on sentence-level roles—parts of speech in context, subordinate clauses, tense precision, agreement rules, and word formation.',
        revisionPoints: [
          'Word class depends on function inside the sentence.',
          'Noun clause = What?; Adjective clause = Which noun?; Adverb clause = When/Why/If?',
          'Past Perfect = earlier of two past events; Since = point; For = duration.',
        ],
        practiceQuestions: [
          {
            id: 'lang1-u2-en-q1',
            question: 'Identify the bracketed clause: "The scientist [who discovered the comet] addressed our school."',
            options: ['Noun clause', 'Adjective (Relative) clause', 'Adverb clause of time', 'Coordinate clause'],
            correctAnswer: 1,
            explanation: 'It qualifies the noun "scientist", functioning as an Adjective (Relative) clause.',
            topicReference: 'Unit 2 · Clauses',
          },
          {
            id: 'lang1-u2-en-q2',
            question: 'In "He ran fast enough to catch the morning bus," the word "fast" functions as:',
            options: ['An adjective', 'A noun', 'An adverb', 'A preposition'],
            correctAnswer: 2,
            explanation: '"Fast" modifies the verb "ran", so it is an adverb.',
            topicReference: 'Unit 2 · Parts of Speech',
          },
          {
            id: 'lang1-u2-en-q3',
            question: 'Choose the grammatically correct sentence:',
            options: [
              'Neither the principal nor the teachers was informed.',
              'Each of the participants have submitted their chart.',
              'The number of applicants for the workshop has doubled.',
              'A number of children was playing in the courtyard.',
            ],
            correctAnswer: 2,
            explanation: '"The number of + plural noun" takes a singular verb ("has doubled").',
            topicReference: 'Unit 2 · Subject-Verb Agreement',
          },
        ],
      },
      Marathi: {
        documentTitle: 'भाषा १ · घटक २: उपयोजित मराठी व्याकरण (Functional Marathi Grammar)',
        unitTitle: 'घटक २: शब्दांच्या जाती, संधी, समास, प्रयोग व काळ',
        topicTitle: 'शब्दांच्या ८ जाती, विभक्ती, संधी, समास, प्रयोग, काळ व वाक्यप्रकार',
        subtopics: [
          'शब्दांच्या आठ जाती: सव्यय (नाम, सर्वनाम, विशेषण, क्रियापद) व अव्यय (क्रियाविशेषण, शब्दयोगी, उभयान्वयी, केवलप्रयोगी)',
          'नामविचार (लिंग, वचन, विभक्ती व कारकार्थ)',
          'संधी (स्वर, व्यंजन, विसर्ग) व समास (अव्ययीभाव, तत्पुरुष, द्वंद्व, बहुव्रीही)',
          'काळ (साधा, अपूर्ण, पूर्ण, रीती) आणि प्रयोग (कर्तरी, कर्मणी, भावे)',
          'वाक्यप्रकार (केवल, मिश्र, संयुक्त) आणि शुद्धलेखन',
        ],
        introduction:
          'महाराष्ट्र TET आणि CTET (मराठी भाषा १) मध्ये व्याकरणावर आधारित प्रश्न प्रत्यक्ष तसेच उताऱ्याच्या संदर्भात विचारले जातात. शब्दांच्या जाती, विभक्ती, संधी, समास, प्रयोग आणि वाक्यसंश्लेषण हा मराठी व्याकरणाचा मूळ पाया आहे.',
        meaningAndDefinition:
          'व्याकरण म्हणजे भाषेचे नियमन व स्पष्टीकरण करणारे शास्त्र होय. उपयोजित व्याकरण म्हणजे वाक्यातील शब्दांचे कार्य, परस्परसंबंध आणि शुद्ध रचना अचूकपणे ओळखणे होय.',
        detailedExplanation: [
          '१. शब्दांच्या जाती: विकारी/सव्यय ४ (नाम, सर्वनाम, विशेषण, क्रियापद) आणि अविकारी/अव्यय ४ (क्रियाविशेषण, शब्दयोगी, उभयान्वयी, केवलप्रयोगी).',
          '२. विभक्ती व कारकार्थ: ८ विभक्ती — प्रथमा (कर्ता), द्वितीया (कर्म - स, ला, ते, ना), तृतीया (करण - ने, ए, शी), चतुर्थी (संप्रदान - स, ला, ते), पंचमी (अपादान - ऊन, हून), षष्ठी (संबंध - चा, ची, चे), सप्तमी (अधिकरण - त, ई, आ), संबोधन (हाक).',
          '३. संधी: स्वरसंधी (विद्या+आलय=विद्यालय), व्यंजनसंधी (सत्+जन=सज्जन), विसर्गसंधी (मनः+रथ=मनोरथ).',
          '४. समास: अव्ययीभाव (पहिले पद प्रधान — आजन्म, यथाशक्ती), तत्पुरुष (दुसरे पद प्रधान — राजवाडा), द्वंद्व (दोन्ही पदे प्रधान — आईवडील), बहुव्रीही (तिसऱ्या पदाचा बोध — नीलकंठ).',
          '५. प्रयोग: कर्त्याप्रमाणे क्रियापद = कर्तरी (राम आंबा खातो); कर्माप्रमाणे = कर्मणी (रामाने आंबा खाल्ला); कर्ता-कर्म दोघांनाही प्रत्यय व क्रियापद नपुंसकलिंगी एकवचनी = भावे (रामाने रावणाला मारले).',
        ],
        importantConcepts: [
          'केवल वाक्य: एकच मुख्य क्रियापद.',
          'संयुक्त वाक्य: प्रधानत्वसूचक अव्ययाने (आणि, पण, किंवा) जोडलेली स्वतंत्र वाक्ये.',
          'मिश्र वाक्य: एक प्रधान व एक गौण वाक्य (की, जर-तर, कारण, जेव्हा-तेव्हा).',
          'रीती काळ: नियमित घडण्याची सवय/रीत ("तो रोज वाचत असतो" — रीती वर्तमानकाळ).',
        ],
        comparisonTable: {
          caption: 'मराठीतील तीन प्रमुख प्रयोगांची अचूक ओळख',
          headers: ['प्रयोग', 'कर्त्याची विभक्ती', 'कर्माची विभक्ती', 'क्रियापद', 'उदाहरण'],
          rows: [
            ['कर्तरी', 'प्रथमा (प्रत्यय नाही)', 'प्रथमा/द्वितीया', 'कर्त्याप्रमाणे बदलते', 'मुलगी चित्र काढते.'],
            ['कर्मणी', 'तृतीया/चतुर्थी (प्रत्यय)', 'प्रथमा (प्रत्यय नाही)', 'कर्माप्रमाणे बदलते', 'मुलीने चित्र काढले.'],
            ['भावे', 'प्रत्यय असतो', 'प्रत्यय असतो / नसते', 'नपुं. एकवचनी स्थिर', 'पोलिसांनी चोराला पकडले.'],
          ],
        },
        practicalExamples: [
          '"तो घरातून बाहेर पडला" — "घरातून" मध्ये वियोग दर्शवणारा "ऊन" प्रत्यय असल्याने पंचमी विभक्ती (अपादान कारकार्थ).',
          '"महात्मा" = कर्मधारय तत्पुरुष; "दशानन" = बहुव्रीही समास.',
        ],
        classroomApplications: [
          'परिचित वाक्यांतून व्याकरण नियम शोधण्याची उद्गामी पद्धती (Inductive Method) वापरावी.',
        ],
        teachingMethods: [
          'उद्गामी पद्धती (उदाहरणाकडून नियमाकडे) आणि संदर्भाधिष्ठित व्याकरण अध्यापन.',
        ],
        examSpecificFocus: {
          ctet: 'CTET मराठी भाषा १ मध्ये उताऱ्यातील शब्दांवर संधी, समास, शब्दाची जात, उपसर्ग-प्रत्यय यांवर ३–५ प्रश्न येतात.',
          mahaTet: 'MAHA TET मराठी भाषा १ मध्ये प्रयोग, समास, संधी, शब्दांच्या जाती, विभक्ती, वाक्प्रचार व शुद्धलेखनावर १०–१५ थेट प्रश्न येतात.',
        },
        importantExamPoints: [
          'षष्ठी विभक्तीला कारकार्थ नसतो; तिचा उपपदार्थ "संबंध" असतो.',
          'भावे प्रयोगात क्रियापद नेहमी तृतीयपुरुषी, नपुंसकलिंगी, एकवचनी असते.',
        ],
        commonMistakes: [
          'शब्दयोगी अव्यय (नामाला जोडून — "झाडावर") आणि क्रियाविशेषण अव्यय (स्वतंत्र — "तो वर गेला") यांत गोंधळ करणे.',
        ],
        topicSummary:
          'मराठी उपयोजित व्याकरणात शब्दांच्या जाती, विभक्ती, संधी, समास, प्रयोग व वाक्यप्रकार यांची स्पष्ट ओळख उच्च गुण मिळवून देते.',
        revisionPoints: [
          'सव्यय (४): नाम, सर्वनाम, विशेषण, क्रियापद | अव्यय (४): क्रियाविशेषण, शब्दयोगी, उभयान्वयी, केवलप्रयोगी.',
          'समास: अव्ययीभाव (पहिले), तत्पुरुष (दुसरे), द्वंद्व (दोन्ही), बहुव्रीही (तिसरा अर्थ).',
          'प्रयोग: कर्तरी (कर्त्याला प्रत्यय नाही), कर्मणी (कर्माला प्रत्यय नाही), भावे (दोघांनाही प्रत्यय).',
        ],
        practiceQuestions: [
          {
            id: 'lang1-u2-mr-q1',
            question: '"पोलिसांनी चोराला पकडले" — या वाक्याचा प्रयोग ओळखा.',
            options: ['कर्तरी प्रयोग', 'कर्मणी प्रयोग', 'सकर्मक भावे प्रयोग', 'अकर्मक कर्तरी प्रयोग'],
            correctAnswer: 2,
            explanation: 'कर्ता ("पोलिसांनी") व कर्म ("चोराला") दोघांनाही प्रत्यय असून क्रियापद नपुंसकलिंगी एकवचनी आहे; म्हणून सकर्मक भावे प्रयोग.',
            topicReference: 'घटक २ · प्रयोग विचार',
          },
          {
            id: 'lang1-u2-mr-q2',
            question: '"यथाशक्ती" या शब्दाचा समास प्रकार कोणता?',
            options: ['तत्पुरुष समास', 'द्वंद्व समास', 'अव्ययीभाव समास', 'बहुव्रीही समास'],
            correctAnswer: 2,
            explanation: '"यथा" हे पहिले पद अव्यय व प्रधान असल्याने अव्ययीभाव समास.',
            topicReference: 'घटक २ · समास विचार',
          },
          {
            id: 'lang1-u2-mr-q3',
            question: '"तो झाडावर चढला" आणि "तो वर चढला" या वाक्यांतील "वर" च्या जाती अनुक्रमे कोणत्या?',
            options: [
              'क्रियाविशेषण व शब्दयोगी अव्यय',
              'शब्दयोगी अव्यय व क्रियाविशेषण अव्यय',
              'उभयान्वयी अव्यय व विशेषण',
              'दोन्ही शब्दयोगी अव्यये',
            ],
            correctAnswer: 1,
            explanation: 'नामाला जोडून आलेले "झाडावर" शब्दयोगी अव्यय आहे, तर स्वतंत्र आलेले "वर" क्रियाविशेषण अव्यय आहे.',
            topicReference: 'घटक २ · शब्दांच्या जाती',
          },
        ],
      },
      Hindi: {
        documentTitle: 'भाषा १ · इकाई २: व्यावहारिक एवं प्रयोगात्मक हिंदी व्याकरण',
        unitTitle: 'इकाई २: शब्द-भेद, संधि, समास, उपसर्ग-प्रत्यय, कारक एवं वाक्य रचना',
        topicTitle: 'विकारी-अविकारी शब्द, संधि, समास, उपसर्ग-प्रत्यय, वाच्य, काल एवं वाक्य-भेद',
        subtopics: [
          'शब्द-भेद: विकारी (संज्ञा, सर्वनाम, विशेषण, क्रिया) व अविकारी (अव्यय के ४ भेद)',
          'संधि के भेद: स्वर (दीर्घ, गुण, वृद्धि, यण, अयादि), व्यंजन एवं विसर्ग संधि',
          'समास के छह भेद: अव्ययीभाव, तत्पुरुष, कर्मधारय, द्विगु, द्वंद्व एवं बहुव्रीहि',
          'उपसर्ग, प्रत्यय (कृत एवं तद्धित), कारक और वाच्य (कर्तृ, कर्म, भाव)',
          'वाक्य रचना के भेद (सरल, संयुक्त, मिश्र) तथा शुद्ध वर्तनी',
        ],
        introduction:
          'CTET हिंदी भाषा-१ में व्याकरण गद्यांश-काव्यांश के शब्दों के संदर्भ में पूछा जाता है, जबकि MAHA TET में सीधे व्याकरणिक नियम व उदाहरण आधारित प्रश्न भी आते हैं।',
        meaningAndDefinition:
          'व्याकरण भाषा के शुद्ध उच्चारण, लेखन और प्रयोग के वैज्ञानिक नियमों का शास्त्र है। व्यावहारिक व्याकरण संदर्भ के भीतर शब्दों की प्रकृति और वाक्य-संरचना की सटीक पहचान कराता है।',
        detailedExplanation: [
          '१. विकारी एवं अविकारी शब्द: लिंग-वचन-कारक से बदलने वाले शब्द विकारी (संज्ञा, सर्वनाम, विशेषण, क्रिया) तथा न बदलने वाले अविकारी/अव्यय कहलाते हैं।',
          '२. स्वर संधि के ५ भेद: दीर्घ (विद्या+आलय=विद्यालय), गुण (महा+इंद्र=महेंद्र), वृद्धि (सदा+एव=सदैव), यण (इति+आदि=इत्यादि), अयादि (ने+अन=नयन)।',
          '३. समास के ६ भेद: अव्ययीभाव (प्रतिदिन), तत्पुरुष (देशभक्ति), कर्मधारय (नीलकमल), द्विगु (चौराहा), द्वंद्व (माता-पिता), बहुव्रीहि (पीतांबर/दशानन)।',
          '४. कृत एवं तद्धित प्रत्यय: क्रिया से जुड़ने वाले "कृत प्रत्यय" (लिख+आई=लिखाई) तथा संज्ञा/विशेषण से जुड़ने वाले "तद्धित प्रत्यय" (इतिहास+इक=ऐतिहासिक)।',
          '५. वाच्य एवं वाक्य: कर्तृवाच्य (कर्ता प्रधान), कर्मवाच्य (कर्म प्रधान), भाववाच्य (अकर्मक क्रिया व भाव प्रधान — "मुझसे चला नहीं जाता")।',
        ],
        importantConcepts: [
          'तत्सम बनाम तद्भव: संस्कृत के मूल शब्द तत्सम (अग्नि, दुग्ध) और परिवर्तित रूप तद्भव (आग, दूध)।',
          '"इक" प्रत्यय नियम: प्रथम स्वर दीर्घ हो जाता है (समाज→सामाजिक, इतिहास→ऐतिहासिक, भूगोल→भौगोलिक)।',
        ],
        comparisonTable: {
          caption: 'हिंदी के प्रमुख समास भेदों की त्वरित पहचान तालिका',
          headers: ['समास', 'पहचान', 'उदाहरण एवं विग्रह'],
          rows: [
            ['अव्ययीभाव', 'प्रथम पद अव्यय (आ, यथा, प्रति, भर)', 'प्रतिदिन (प्रत्येक दिन), आजन्म'],
            ['तत्पुरुष', 'उत्तर पद प्रधान, कारक लोप', 'देशभक्ति (देश के लिए भक्ति)'],
            ['कर्मधारय', 'विशेषण-विशेष्य या उपमेय-उपमान', 'चंद्रमुख (चंद्र के समान मुख)'],
            ['द्विगु', 'प्रथम पद संख्यावाची, समूह बोध', 'नवरत्न (नौ रत्नों का समूह)'],
            ['द्वंद्व', 'दोनों पद प्रधान', 'सुख-दुख (सुख और दुख)'],
            ['बहुव्रीहि', 'तीसरा विशेष अर्थ प्रधान', 'चक्रपाणि (विष्णु)'],
          ],
        },
        practicalExamples: [
          '"अत्यधिक" = अति + अधिक (इ + अ = य → यण स्वर संधि)।',
          '"भौगोलिक" = भूगोल + इक।',
        ],
        classroomApplications: [
          'पाठ्यपुस्तक की कहानियों के भीतर ही शब्दों की व्याकरणिक भूमिका पर चर्चा करें।',
        ],
        teachingMethods: [
          'आगमन विधि (उदाहरण से नियम) और संदर्भ में व्याकरण शिक्षण (NCF 2005)।',
        ],
        examSpecificFocus: {
          ctet: 'CTET हिंदी भाषा-१ में गद्यांश के शब्दों पर संधि, समास, उपसर्ग, "इक/ता/ईय" प्रत्यय और संज्ञा-विशेषण भेद पर ४–५ प्रश्न आते हैं।',
          mahaTet: 'MAHA TET हिंदी में कारक, वाच्य, संधि, समास, तत्सम-तद्भव, मुहावरे और वाक्य-रूपांतरण पर विस्तृत प्रश्न पूछे जाते हैं।',
        },
        importantExamPoints: [
          '"इक" प्रत्यय से आदि स्वर में वृद्धि होती है (धर्म→धार्मिक, इतिहास→ऐतिहासिक)।',
          'भाववाच्य में क्रिया सदैव अकर्मक, अन्य पुरुष, पुल्लिंग, एकवचन रहती है।',
        ],
        commonMistakes: [
          '"अत्याधिक" को शुद्ध मान लेना (शुद्ध शब्द "अत्यधिक" है)।',
          'द्विगु और बहुव्रीहि समास के विग्रह में अंतर न करना।',
        ],
        topicSummary:
          'संधि, समास, उपसर्ग-प्रत्यय, शब्द-भेद और वाच्य का संदर्भगत अभ्यास भाषा-१ व्याकरण में पूर्ण अंक दिलाता है।',
        revisionPoints: [
          'स्वर संधि (५): दीर्घ, गुण, वृद्धि, यण, अयादि।',
          '"इक" प्रत्यय: इतिहास→ऐतिहासिक, भूगोल→भौगोलिक, समाज→सामाजिक।',
          'कृत प्रत्यय = क्रिया से; तद्धित प्रत्यय = संज्ञा/विशेषण से।',
        ],
        practiceQuestions: [
          {
            id: 'lang1-u2-hi-q1',
            question: '"अत्यधिक" शब्द का सही संधि-विच्छेद और संधि का नाम क्या है?',
            options: ['अत्य + अधिक (दीर्घ)', 'अति + अधिक (यण स्वर संधि)', 'अत + यधिक (गुण)', 'अति + आधिक (वृद्धि)'],
            correctAnswer: 1,
            explanation: '"अति + अधिक" में इ + अ मिलकर "य" बनता है, जो यण स्वर संधि है।',
            topicReference: 'इकाई २ · स्वर संधि',
          },
          {
            id: 'lang1-u2-hi-q2',
            question: '"भौगोलिक" में मूल शब्द और प्रत्यय क्रमशः कौन-से हैं?',
            options: ['भौगोल + इक', 'भूगोल + इक', 'भूगोल + क', 'भौगो + लिक'],
            correctAnswer: 1,
            explanation: '"भूगोल + इक" से आदि स्वर ऊ का औ होकर "भौगोलिक" बनता है।',
            topicReference: 'इकाई २ · प्रत्यय नियम',
          },
          {
            id: 'lang1-u2-hi-q3',
            question: '"रोगी से उठा नहीं जाता" — इसमें कौन-सा वाच्य है?',
            options: ['कर्तृवाच्य', 'कर्मवाच्य', 'भाववाच्य', 'मिश्र वाच्य'],
            correctAnswer: 2,
            explanation: 'असमर्थता का भाव प्रधान है और क्रिया अकर्मक, पुल्लिंग, एकवचन है; अतः भाववाच्य।',
            topicReference: 'इकाई २ · वाच्य भेद',
          },
        ],
      },
    },
  },

  // =========================================================================
  // LANGUAGE I — UNIT 3: LANGUAGE ACQUISITION, LEARNING & LSRW SKILLS
  // =========================================================================
  {
    slug: 'lang1-u3-acquisition-learning-lsrw',
    unitNumber: 3,
    topicNumber: 3,
    subjectId: 'LANGUAGE_1',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_1', 'PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Official Syllabus (ctet.nic.in) — Pedagogy of Language Development: Learning & Acquisition, Principles, Listening & Speaking',
      mahaTet: 'MSCE Pune MAHA TET Syllabus (mscepune.in / mahatet.in) — Language I Pedagogy: Language Acquisition, Teaching Principles & Four Language Skills',
    },
    content: {
      English: {
        documentTitle: 'Language I · Unit 3: Language Acquisition, Learning & LSRW Skills',
        unitTitle: 'Unit 3: Pedagogy of Language Development (Part I)',
        topicTitle: 'Acquisition vs. Learning, Chomsky/Krashen/Vygotsky, Principles & LSRW Skills',
        subtopics: [
          'Language Acquisition (natural, subconscious) vs. Language Learning (formal, conscious)',
          'Theories: Chomsky (LAD/UG), Krashen (i+1 & Affective Filter), Skinner, Piaget, Vygotsky',
          'Principles of language teaching (Motivation, Gradation, Contextualization, Natural Order)',
          'Four Language Skills: Listening, Speaking, Reading, Writing (Receptive vs. Productive)',
          'Process Writing stages and Emergent Literacy',
        ],
        introduction:
          'Pedagogy of Language Development accounts for 15 out of 30 marks in CTET Language I and forms a major conceptual core of MAHA TET. Understanding natural acquisition versus formal learning enables teachers to build communicative, anxiety-free classrooms.',
        meaningAndDefinition:
          'Language Acquisition is the natural, subconscious, informal process of picking up a first language through meaningful exposure. Language Learning is a conscious, structured, formal process involving explicit rules and classroom practice.',
        detailedExplanation: [
          '1. Stephen Krashen’s Hypotheses: Fluency stems primarily from acquisition via "Comprehensible Input (i+1)"—understandable language slightly above the learner’s current level—in a low-anxiety climate (Low Affective Filter).',
          '2. Key Theorists: Noam Chomsky proposed an innate Language Acquisition Device (LAD) and Universal Grammar (UG). B. F. Skinner attributed language to imitation and reinforcement. Piaget held thought precedes language; Vygotsky argued social speech evolves into Private Speech (self-guidance) and Inner Speech.',
          '3. Integrated LSRW Skills: Listening and Reading are Receptive skills; Speaking and Writing are Productive skills. All four develop best in an INTEGRATED manner rather than isolation.',
          '4. Reading Sub-models: Bottom-Up (letters → words → meaning) vs. Top-Down (prior schema & prediction → meaning).',
          '5. Process Approach to Writing: Brainstorming → Drafting → Revising (improving content/flow) → Editing (grammar/spelling) → Publishing.',
        ],
        importantConcepts: [
          'LAD (Chomsky): Innate biological capacity enabling effortless grammar acquisition.',
          'Comprehensible Input (i+1, Krashen): Meaningful input one step ahead of current level.',
          'Print-Rich Environment: Classroom walls with word cards, labels, charts, and story corners.',
          'Emergent Literacy: Early print awareness, scribbling, and picture-reading before formal schooling.',
        ],
        comparisonTable: {
          caption: 'Language Acquisition vs. Language Learning',
          headers: ['Dimension', 'Language Acquisition', 'Language Learning'],
          rows: [
            ['Nature', 'Natural, subconscious, informal', 'Conscious, structured, formal'],
            ['Setting', 'Home, family, daily social exposure', 'Classroom, textbooks, formal guidance'],
            ['Grammar', 'Implicit intuitive mastery', 'Explicit rule study'],
            ['Goal', 'Natural fluency & communication', 'Accuracy & academic proficiency'],
          ],
        },
        keyThinkers: [
          { name: 'Noam Chomsky', contribution: 'Innate Language Acquisition Device (LAD) & Universal Grammar (UG).' },
          { name: 'Stephen Krashen', contribution: 'Input Hypothesis (i+1), Affective Filter, Acquisition-Learning distinction.' },
          { name: 'Lev Vygotsky', contribution: 'Social interaction, Private Speech, and Inner Speech as tools of thought.' },
          { name: 'B. F. Skinner', contribution: 'Behaviourist imitation, repetition, and positive reinforcement.' },
        ],
        practicalExamples: [
          'A 4-year-old saying "I breaked my toy" demonstrates Chomsky’s rule generation (overgeneralizing "-ed"), disproving pure imitation.',
          'Listening to a story → group discussion → reading the script → writing a new ending integrates all four LSRW skills.',
        ],
        classroomApplications: [
          'Build a Print-Rich classroom and honour children’s home expressions to keep the Affective Filter low.',
          'Focus Writing classes on Process stages (drafting & revising ideas) before polishing spelling.',
        ],
        teachingMethods: [
          'Whole Language Approach (authentic integrated LSRW).',
          'Process Approach to Writing.',
        ],
        examSpecificFocus: {
          ctet: 'CTET repeatedly tests Chomsky (LAD), Krashen (i+1 & Affective Filter), Process Writing stages, Receptive vs. Productive skills, and Top-Down/Bottom-Up reading.',
          mahaTet: 'MAHA TET focuses on Principles of Language Teaching (Selection, Gradation, Proportion), LSRW sub-skills, and mother-tongue acquisition.',
        },
        importantExamPoints: [
          'Listening & Reading = Receptive; Speaking & Writing = Productive.',
          'LSRW skills must be developed in an INTEGRATED manner.',
          'Children’s errors are natural indicators of active learning.',
        ],
        commonMistakes: [
          'Labelling Reading as a productive skill.',
          'Confusing Piaget (thought before language) with Vygotsky (social language drives thought).',
        ],
        topicSummary:
          'Effective language growth thrives on comprehensible input (i+1), low anxiety, a print-rich setting, and integrated LSRW instruction.',
        revisionPoints: [
          'Chomsky = LAD; Krashen = i+1 & Low Affective Filter; Vygotsky = Private Speech.',
          'Receptive = L & R; Productive = S & W.',
          'Process Writing: Brainstorm → Draft → Revise → Edit → Publish.',
        ],
        practiceQuestions: [
          {
            id: 'lang1-u3-en-q1',
            question: 'A 4-year-old says "I goed to the park" even though no adult uses "goed". Which theory best explains this?',
            options: [
              'Skinner’s imitation theory',
              'Chomsky’s innate Language Acquisition Device (LAD) and rule generation',
              'Pavlov’s conditioning',
              'Thorndike’s law of exercise',
            ],
            correctAnswer: 1,
            explanation: 'Overgeneralizing "-ed" proves active innate rule-construction (Chomsky’s LAD), not passive imitation.',
            topicReference: 'Unit 3 · Chomsky LAD',
          },
          {
            id: 'lang1-u3-en-q2',
            question: 'Which pair represents the two PRODUCTIVE skills of language?',
            options: ['Listening and Reading', 'Listening and Speaking', 'Speaking and Writing', 'Reading and Writing'],
            correctAnswer: 2,
            explanation: 'Speaking and Writing produce language output; Listening and Reading are receptive.',
            topicReference: 'Unit 3 · LSRW Skills',
          },
          {
            id: 'lang1-u3-en-q3',
            question: 'According to Stephen Krashen, optimal acquisition occurs through:',
            options: [
              'Word-for-word translation drills',
              'Comprehensible Input (i+1) slightly above the learner’s current level',
              'Punishing grammatical errors immediately',
              'Repeating mastered lists only',
            ],
            correctAnswer: 1,
            explanation: 'Krashen’s Input Hypothesis (i+1) states understandable input just one step ahead of current competence drives natural acquisition.',
            topicReference: 'Unit 3 · Krashen Input Hypothesis',
          },
        ],
      },
      Marathi: {
        documentTitle: 'भाषा १ · घटक ३: भाषा अर्जन, भाषा अध्ययन आणि चार भाषिक कौशल्ये (LSRW)',
        unitTitle: 'घटक ३: भाषा विकास अध्यापनशास्त्र (भाग १)',
        topicTitle: 'भाषा अर्जन व अध्ययन, चॉम्स्की-क्रॅशन-वायगॉत्स्की सिद्धांत आणि श्रवण-भाषण-वाचन-लेखन कौशल्ये',
        subtopics: [
          'भाषा अर्जन (नैसर्गिक व सहज) आणि भाषा अध्ययन (औपचारिक व सहेतुक)',
          'सिद्धांत: नोम चॉम्स्की (LAD), स्टीफन क्रॅशन (i+1), स्किनर, पियाजे व वायगॉत्स्की',
          'भाषा अध्यापनाची तत्त्वे (प्रेरणा, नैसर्गिक क्रम, श्रेणीबद्धता, संदर्भशीलता)',
          'चार भाषिक कौशल्ये: श्रवण, भाषण, वाचन, लेखन (ग्रहणात्मक विरुद्ध अभिव्यक्तात्मक)',
          'प्रक्रियात्मक लेखन (Process Writing) व प्रारंभिक साक्षरता',
        ],
        introduction:
          'CTET भाषा १ मध्ये भाषा अध्यापनशास्त्राला १५ गुण असतात व MAHA TET मध्येही यावर संकल्पनात्मक प्रश्न येतात. मातृभाषा अर्जन आणि औपचारिक भाषा अध्ययन यांतील फरक समजणे प्रत्येक शिक्षकासाठी अनिवार्य आहे.',
        meaningAndDefinition:
          'भाषा अर्जन (Acquisition) म्हणजे घर व समाजातील नैसर्गिक संवादातून सहजपणे भाषा आत्मसात करणे; तर भाषा अध्ययन (Learning) म्हणजे शाळेत जाणीवपूर्वक व नियमबद्ध प्रशिक्षणाने भाषा शिकणे होय.',
        detailedExplanation: [
          '१. चॉम्स्की (LAD): प्रत्येक बालकाच्या मेंदूत भाषा ग्रहण करण्याची जन्मजात यंत्रणा (Language Acquisition Device) व वैश्विक व्याकरण असते.',
          '२. क्रॅशन (i+1): सध्याच्या पातळीपेक्षा किंचित वरची पण आकलनक्षम भाषिक निविष्टी (Comprehensible Input) आणि भीतीमुक्त वातावरण भाषा अर्जनास वेग देते.',
          '३. वायगॉत्स्की विरुद्ध पियाजे: पियाजे यांच्या मते विचार आधी व भाषा नंतर; वायगॉत्स्की यांच्या मते सामाजिक संवादातून भाषा येते आणि मुले स्व-संवाद (Private Speech) वापरून स्वतःच्या कृतींचे नियमन करतात.',
          '४. चार भाषिक कौशल्यांचा एकात्मिक विकास: श्रवण व वाचन = ग्रहणात्मक (Receptive); भाषण व लेखन = अभिव्यक्तात्मक (Productive). ही चारही कौशल्ये एकत्रितपणे विकसित करावीत.',
          '५. प्रक्रियात्मक लेखन: विचारमंथन → मसुदा → सुधारणा → संपादन → अंतिम सादरीकरण.',
        ],
        importantConcepts: [
          'मुद्रणसमृद्ध परिसर (Print-Rich Environment): वर्गात शब्दपट्ट्या, गोष्टींची पुस्तके, चित्रे व नामफलक असणे.',
          'उद्गामी वाचन (Bottom-Up): अक्षर → शब्द → वाक्य → अर्थ.',
          'अवगामी वाचन (Top-Down): पूर्वानुभवावरून संपूर्ण आशयाचा अंदाज.',
        ],
        comparisonTable: {
          caption: 'भाषा अर्जन विरुद्ध भाषा अध्ययन',
          headers: ['घटक', 'भाषा अर्जन (Acquisition)', 'भाषा अध्ययन (Learning)'],
          rows: [
            ['स्वरूप', 'नैसर्गिक, सहज, अवचेतन', 'औपचारिक, सहेतुक, जाणीवपूर्वक'],
            ['वातावरण', 'घर, कुटुंब, समाज', 'शाळा, वर्गखोली, पाठ्यपुस्तक'],
            ['व्याकरण', 'अंतर्भूत व स्वाभाविक', 'नियमांचा जाणीवपूर्वक अभ्यास'],
            ['उद्दिष्ट', 'अर्थपूर्ण संवाद व प्रवाहीपणा', 'अचूकता व शैक्षणिक प्रावीण्य'],
          ],
        },
        keyThinkers: [
          { name: 'नोम चॉम्स्की', contribution: 'जन्मजात भाषा अर्जन यंत्रणा (LAD) व वैश्विक व्याकरण.' },
          { name: 'स्टीफन क्रॅशन', contribution: 'आकलनक्षम निविष्टी (i+1) व भावनात्मक अडथळा.' },
          { name: 'लेव्ह वायगॉत्स्की', contribution: 'सामाजिक संवाद व स्व-संवाद (Private Speech).' },
          { name: 'बी. एफ. स्किनर', contribution: 'अनुकरण व प्रबलनाद्वारे भाषा विकास.' },
        ],
        practicalExamples: [
          'गोष्ट ऐकणे → गटचर्चा → वाचन → स्वतःचा शेवट लिहिणे हे एकात्मिक LSRW चे उत्तम उदाहरण आहे.',
        ],
        classroomApplications: [
          'वर्गात मुलांना त्यांच्या घरच्या भाषेत मोकळेपणाने बोलण्याची संधी द्या आणि मुद्रणसमृद्ध वातावरण तयार करा.',
        ],
        teachingMethods: [
          'समग्र भाषा दृष्टिकोन (Whole Language Approach) व प्रक्रियात्मक लेखन पद्धती.',
        ],
        examSpecificFocus: {
          ctet: 'CTET मध्ये चॉम्स्की (LAD), क्रॅशन (i+1), ग्रहणात्मक-अभिव्यक्तात्मक कौशल्ये, प्रक्रियात्मक लेखन आणि मुद्रणसमृद्ध परिसरावर सर्वाधिक प्रश्न येतात.',
          mahaTet: 'MAHA TET मध्ये भाषा अध्यापनाची तत्त्वे, प्रकट-मूक वाचन आणि LSRW कौशल्यांचे उपघटक विचारले जातात.',
        },
        importantExamPoints: [
          'श्रवण व वाचन = ग्रहणात्मक; भाषण व लेखन = अभिव्यक्तात्मक.',
          'चारही कौशल्ये एकमेकांशी निगडित असून एकात्मिकरीत्या विकसित होतात.',
        ],
        commonMistakes: [
          'वाचनाला अभिव्यक्तात्मक कौशल्य मानणे (ते ग्रहणात्मक आहे).',
        ],
        topicSummary:
          'आकलनक्षम भाषिक निविष्टी, मुद्रणसमृद्ध वर्गखोली आणि एकात्मिक LSRW विकास हे प्रभावी भाषा अध्यापनाचे केंद्रबिंदू आहेत.',
        revisionPoints: [
          'चॉम्स्की = LAD; क्रॅशन = i+1; वायगॉत्स्की = स्व-संवाद.',
          'ग्रहणात्मक = श्रवण, वाचन | अभिव्यक्तात्मक = भाषण, लेखन.',
          'लेखन टप्पे: विचारमंथन → मसुदा → सुधारणा → संपादन → अंतिम लेखन.',
        ],
        practiceQuestions: [
          {
            id: 'lang1-u3-mr-q1',
            question: 'भाषा अर्जन आणि भाषा अध्ययन यांमधील मुख्य फरक कोणता?',
            options: [
              'अर्जन औपचारिक असते तर अध्ययन नैसर्गिक असते',
              'भाषा अर्जन नैसर्गिक व अवचेतन असते तर भाषा अध्ययन जाणीवपूर्वक व औपचारिक असते',
              'अर्जन केवळ पुस्तकांतून होते',
              'दोन्हींत फरक नाही',
            ],
            correctAnswer: 1,
            explanation: 'अर्जन नैसर्गिक वातावरणातून सहज होते, तर अध्ययन शाळेत जाणीवपूर्वक केले जाते.',
            topicReference: 'घटक ३ · भाषा अर्जन व अध्ययन',
          },
          {
            id: 'lang1-u3-mr-q2',
            question: 'पुढीलपैकी कोणती जोडी "ग्रहणात्मक (Receptive)" कौशल्यांची आहे?',
            options: ['भाषण व लेखन', 'श्रवण व वाचन', 'श्रवण व भाषण', 'वाचन व लेखन'],
            correctAnswer: 1,
            explanation: 'श्रवण आणि वाचन ही ग्रहणात्मक कौशल्ये आहेत.',
            topicReference: 'घटक ३ · भाषिक कौशल्ये',
          },
          {
            id: 'lang1-u3-mr-q3',
            question: 'नोम चॉम्स्की यांच्या मते लहान मुले भाषा अल्पावधीत कशी आत्मसात करतात?',
            options: ['पाठांतरामुळे', 'जन्मजात भाषा अर्जन यंत्रणेमुळे (LAD)', 'शिक्षेच्या भीतीने', 'व्याकरण पुस्तकांमुळे'],
            correctAnswer: 1,
            explanation: 'चॉम्स्की यांच्या मते मानवी मेंदूत जन्मजात LAD असते.',
            topicReference: 'घटक ३ · चॉम्स्की सिद्धांत',
          },
        ],
      },
      Hindi: {
        documentTitle: 'भाषा १ · इकाई ३: भाषा अर्जन, भाषा अधिगम एवं चार भाषायी कौशल (LSRW)',
        unitTitle: 'इकाई ३: भाषा विकास का शिक्षाशास्त्र (भाग १)',
        topicTitle: 'भाषा अर्जन बनाम अधिगम, चॉम्स्की-क्रैशन-वाइगोत्स्की सिद्धांत तथा सुनना-बोलना-पढ़ना-लिखना कौशल',
        subtopics: [
          'भाषा अर्जन (स्वाभाविक, अचेतन) एवं भाषा अधिगम (औपचारिक, सचेतन)',
          'प्रमुख सिद्धांत: चॉम्स्की (LAD), क्रैशन (i+1), स्किनर, पियाजे व वाइगोत्स्की',
          'भाषा शिक्षण के सिद्धांत (प्रेरणा, स्वाभाविकता, क्रमबद्धता, संदर्भशीलता)',
          'चार भाषायी कौशल: सुनना, बोलना, पढ़ना, लिखना (ग्रहणात्मक बनाम उत्पादक)',
          'प्रक्रियात्मक लेखन (Process Writing) तथा उद्गामी साक्षरता',
        ],
        introduction:
          'CTET भाषा-१ में शिक्षाशास्त्र से १५ अंकों के प्रश्न आते हैं और MAHA TET में भी भाषा विकास सिद्धांत प्रमुख हैं। स्वाभाविक अर्जन और औपचारिक अधिगम का अंतर समझकर शिक्षक सजीव कक्षा बना सकता है।',
        meaningAndDefinition:
          'भाषा अर्जन वह स्वाभाविक, अनौपचारिक प्रक्रिया है जिससे बच्चा परिवेश के संपर्क में सहज ही भाषा सीखता है। भाषा अधिगम वह सचेतन व औपचारिक प्रक्रिया है जो विद्यालय में नियमों व अभ्यास से होती है।',
        detailedExplanation: [
          '१. नोम चॉम्स्की: मनुष्य में जन्मजात भाषा अर्जन यंत्र (LAD) और सार्वभौमिक व्याकरण (UG) होता है।',
          '२. स्टीफन क्रैशन: वर्तमान स्तर से एक कदम ऊपर समझने योग्य सामग्री — बोधगम्य निवेश (Comprehensible Input, i+1) व तनाव-मुक्त परिवेश अर्जन को गति देता है।',
          '३. वाइगोत्स्की बनाम पियाजे: पियाजे के अनुसार विचार पहले और भाषा बाद में; वाइगोत्स्की के अनुसार सामाजिक अंतःक्रिया से भाषा बनती है और बच्चा "निज वाक्" (Private Speech) से स्वयं का मार्गदर्शन करता है।',
          '४. चारों भाषायी कौशल: सुनना-पढ़ना = ग्रहणात्मक (Receptive); बोलना-लिखना = उत्पादक/अभिव्यक्तात्मक (Productive)। इन्हें एकीकृत रूप में विकसित करना चाहिए।',
          '५. प्रक्रियात्मक लेखन: विचार-मंथन → प्रारूपण → पुनरीक्षण → संपादन → प्रकाशन।',
        ],
        importantConcepts: [
          'प्रिंट-समृद्ध परिवेश (Print-Rich Environment): कक्षा में शब्द-पट्टियाँ, बाल-साहित्य, चार्ट व लेबल।',
          'अधोगामी (Top-Down) बनाम ऊर्ध्वगामी (Bottom-Up) पठन।',
          'उद्गामी साक्षरता (Emergent Literacy): औपचारिक शिक्षा से पूर्व चित्र-पठन व आड़ी-तिरछी रेखाएँ खींचना।',
        ],
        comparisonTable: {
          caption: 'भाषा अर्जन एवं भाषा अधिगम की तुलना',
          headers: ['आधार', 'भाषा अर्जन', 'भाषा अधिगम'],
          rows: [
            ['प्रकृति', 'स्वाभाविक, सहज, अचेतन', 'प्रयासपूर्ण, सचेतन, औपचारिक'],
            ['परिवेश', 'परिवार व सामाजिक वातावरण', 'विद्यालय, शिक्षक, पाठ्यपुस्तक'],
            ['व्याकरण', 'अंतर्निहित सहज प्रयोग', 'नियमों का औपचारिक ज्ञान'],
            ['लक्ष्य', 'संप्रेषण व प्रवाह', 'शुद्धता व अकादमिक दक्षता'],
          ],
        },
        keyThinkers: [
          { name: 'नोम चॉम्स्की', contribution: 'जन्मजात भाषा अर्जन यंत्र (LAD) एवं सार्वभौमिक व्याकरण।' },
          { name: 'स्टीफन क्रैशन', contribution: 'बोधगम्य निवेश (i+1) तथा भावात्मक निस्यंदक (Affective Filter)।' },
          { name: 'लेव वाइगोत्स्की', contribution: 'सामाजिक अंतःक्रिया, निज वाक् (Private Speech) एवं पाड़।' },
          { name: 'बी. एफ. स्किनर', contribution: 'अनुकरण, अभ्यास और पुनर्बलन द्वारा भाषा विकास।' },
        ],
        practicalExamples: [
          'छोटे बच्चे द्वारा कागज़ पर रेखाएँ खींचकर कहना कि "मैंने पत्र लिखा है" — उद्गामी साक्षरता का उदाहरण है।',
        ],
        classroomApplications: [
          'भयमुक्त संवादात्मक कक्षा बनाएँ और सुनना-बोलना-पढ़ना-लिखना को एक ही कहानी से जोड़ें।',
        ],
        teachingMethods: [
          'समग्र भाषा उपागम (Whole Language Approach) एवं प्रक्रियात्मक लेखन विधि।',
        ],
        examSpecificFocus: {
          ctet: 'CTET हिंदी में चॉम्स्की (LAD), क्रैशन (i+1), वाइगोत्स्की का निज वाक्, प्रक्रियात्मक लेखन और प्रिंट-समृद्ध परिवेश पर हर बार प्रश्न आते हैं।',
          mahaTet: 'MAHA TET में भाषा शिक्षण सिद्धांत, LSRW उप-कौशल व मातृभाषा की भूमिका पर प्रश्न आते हैं।',
        },
        importantExamPoints: [
          'सुनना-पढ़ना = ग्रहणात्मक; बोलना-लिखना = उत्पादक।',
          'चारों कौशल परस्पर अंतःसंबंधित व एकीकृत रूप से विकसित होते हैं।',
        ],
        commonMistakes: [
          'पढ़ने को उत्पादक कौशल मान लेना।',
          'पियाजे और वाइगोत्स्की के विचार-भाषा क्रम को उलट देना।',
        ],
        topicSummary:
          'क्रैशन के बोधगम्य निवेश, प्रिंट-समृद्ध कक्षा और चारों भाषायी कौशलों के एकीकृत अभ्यास से प्रभावी भाषा विकास होता है।',
        revisionPoints: [
          'चॉम्स्की = LAD; क्रैशन = i+1; वाइगोत्स्की = निज वाक्।',
          'ग्रहणात्मक = सुनना, पढ़ना | उत्पादक = बोलना, लिखना।',
          'लेखन प्रक्रिया: विचार-मंथन → प्रारूप → पुनरीक्षण → संपादन → प्रकाशन।',
        ],
        practiceQuestions: [
          {
            id: 'lang1-u3-hi-q1',
            question: 'भाषा के चारों कौशलों (सुनना, बोलना, पढ़ना, लिखना) के संदर्भ में सर्वाधिक उपयुक्त कथन कौन-सा है?',
            options: [
              'इन्हें पूर्णतः पृथक रूप से सिखाना चाहिए',
              'ये चारों कौशल परस्पर अंतःसंबंधित हैं और एकीकृत रूप में विकसित होते हैं',
              'लेखन केवल कक्षा ५ के बाद सिखाएँ',
              'श्रवण कौशल स्वतः समाप्त हो जाता है',
            ],
            correctAnswer: 1,
            explanation: 'आधुनिक शिक्षाशास्त्र के अनुसार चारों भाषायी कौशल अंतःसंबंधित हैं और एकीकृत गतिविधियों से विकसित होते हैं।',
            topicReference: 'इकाई ३ · भाषायी कौशल',
          },
          {
            id: 'lang1-u3-hi-q2',
            question: 'स्टीफन क्रैशन के अनुसार "बोधगम्य निवेश (i+1)" का अर्थ है:',
            options: [
              'केवल पहले से सीखा पाठ दोहराना',
              'वर्तमान स्तर से थोड़ा ऊपर किंतु संदर्भ से समझने योग्य भाषिक सामग्री देना',
              'व्याकरण की परिभाषाएँ रटवाना',
              'मातृभाषा पर प्रतिबंध लगाना',
            ],
            correctAnswer: 1,
            explanation: 'वर्तमान स्तर (i) से एक कदम आगे (+1) की सार्थक, समझने योग्य सामग्री भाषा अर्जन को प्रेरित करती है।',
            topicReference: 'इकाई ३ · क्रैशन सिद्धांत',
          },
          {
            id: 'lang1-u3-hi-q3',
            question: 'प्रक्रियात्मक लेखन (Process Writing) का सही क्रम कौन-सा है?',
            options: [
              'संपादन → प्रारूपण → विचार-मंथन → प्रकाशन',
              'विचार-मंथन → प्रारूपण → पुनरीक्षण → संपादन → प्रकाशन',
              'प्रकाशन → पुनरीक्षण → प्रारूपण → विचार-मंथन',
              'सुलेख → रटना → परीक्षा',
            ],
            correctAnswer: 1,
            explanation: 'विचार-मंथन से आरंभ कर प्रारूप, पुनरीक्षण (विचार सुधार), संपादन (व्याकरण सुधार) और अंतिम प्रकाशन तक प्रक्रिया चलती है।',
            topicReference: 'इकाई ३ · प्रक्रियात्मक लेखन',
          },
        ],
      },
    },
  },

  // =========================================================================
  // LANGUAGE I — UNIT 4: MULTILINGUALISM, GRAMMAR ROLE, TLM & REMEDIATION
  // =========================================================================
  {
    slug: 'lang1-u4-multilingualism-tlm-remedial',
    unitNumber: 4,
    topicNumber: 4,
    subjectId: 'LANGUAGE_1',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_1', 'PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Official Syllabus (ctet.nic.in) — Language I Pedagogy: Role of Grammar, Multilingual Classroom, Language Difficulties, TLM & Remedial Teaching',
      mahaTet: 'MSCE Pune MAHA TET Syllabus (mscepune.in / mahatet.in) — Language I Pedagogy: Multilingualism, Diagnostic & Remedial Teaching, TLM',
    },
    content: {
      English: {
        documentTitle: 'Language I · Unit 4: Role of Grammar, Multilingualism, TLM & Remedial Teaching',
        unitTitle: 'Unit 4: Pedagogy of Language Development (Part II)',
        topicTitle: 'Grammar in Context, Multilingualism as Resource, Language Disorders, TLM & Remediation',
        subtopics: [
          'Critical perspective on the role of grammar in oral and written communication',
          'Multilingual classroom challenges & NEP 2020 Three-Language Formula',
          'Language errors vs. learning disabilities (Dyslexia, Dysgraphia, Aphasia)',
          'Teaching-Learning Materials (TLM): Textbooks, Authentic Realia, Multimedia & ICT',
          'Diagnostic Testing and Remedial Teaching cycle',
        ],
        introduction:
          'Indian classrooms are naturally multilingual and neurodiverse. NCF 2005 and NEP 2020 position multilingualism as a cognitive asset rather than a hurdle. Equally vital is selecting authentic TLM beyond textbooks and executing a clear Diagnostic → Remedial cycle.',
        meaningAndDefinition:
          'Multilingualism in education uses learners’ home languages as bridges to deeper thought and new languages. Remedial Teaching is targeted, individualized support delivered AFTER diagnostic testing pinpoints specific learning gaps.',
        detailedExplanation: [
          '1. Role of Grammar: Grammar serves clearer communication; it must be taught in context within authentic stories and dialogue rather than isolated rule drilling.',
          '2. Multilingualism & Translanguaging: Multilingual children show superior cognitive flexibility and divergent thinking. NEP 2020 promotes Mother Tongue / Home Language up to Grade 5 (preferably Grade 8) with a flexible Three-Language Formula.',
          '3. Difficulties vs. Disabilities: Developmental errors signal active learning. Specific learning disabilities need multisensory support: Dyslexia (reading/phonological decoding), Dysgraphia (writing/spelling), Aphasia (language comprehension/expression).',
          '4. Authentic TLM (Realia): The textbook is ONE resource, never the sole curriculum. Realia—bus tickets, menus, newspapers, food wrappers—provide authentic real-life reading contexts.',
          '5. Diagnostic Test → Remedial Teaching: Diagnostic tests carry NO pass/fail grades and pinpoint root causes; Remedial teaching then addresses those gaps using fresh methods and smaller steps.',
        ],
        importantConcepts: [
          'Realia: Real-life everyday texts/objects (menus, tickets, pamphlets) used as authentic TLM.',
          'Translanguaging: Purposeful use of learners’ full multilingual repertoire to build meaning.',
          'Diagnostic Test: Identifies root causes of errors without ranking students.',
        ],
        comparisonTable: {
          caption: 'Achievement Test vs. Diagnostic Test vs. Remedial Teaching',
          headers: ['Stage', 'Purpose', 'Focus', 'Classroom Example'],
          rows: [
            ['Achievement Test', 'Measure unit/term mastery', 'Marks & grades', 'Term-end 30-mark Language paper'],
            ['Diagnostic Test', 'Locate root cause of recurring errors', 'No pass/fail; error analysis', 'Phonics check locating /b/ vs /d/ confusion'],
            ['Remedial Teaching', 'Bridge diagnosed gaps via new methods', 'Individualized pace, VAKT TLM', '2-week tactile sandpaper letter & audio clinic'],
          ],
        },
        practicalExamples: [
          'Having students read food packets for ingredients and expiry dates applies Realia.',
          'Inviting a Gondi or Konkani speaker to share a folk tale first in her home language exemplifies multilingualism as a resource.',
        ],
        classroomApplications: [
          'Display a multilingual Word Wall in English, Marathi, Hindi, and local home dialects.',
          'Change teaching modality (visual, tactile, audio, peer-buddy) during remedial sessions rather than repeating the same lecture.',
        ],
        teachingMethods: [
          'Multisensory VAKT (Visual, Auditory, Kinesthetic, Tactile) instruction.',
          'Diagnostic-Prescriptive Teaching Loop.',
        ],
        examSpecificFocus: {
          ctet: 'CTET repeatedly asks about Multilingualism as a "resource", Realia/Authentic materials, Textbook as "one of the resources", and Diagnostic-before-Remedial sequence.',
          mahaTet: 'MAHA TET tests TLM types (Audio, Visual, Audio-Visual), Dyslexia/Dysgraphia distinctions, and steps of Remedial Teaching.',
        },
        importantExamPoints: [
          'Multilingualism is ALWAYS a classroom resource, never a burden.',
          'Always Diagnose first, then Remediate using alternative methods.',
        ],
        commonMistakes: [
          'Confusing Diagnostic Testing (finding gaps) with Remedial Teaching (fixing gaps).',
        ],
        topicSummary:
          'Inclusive language classrooms harness multilingualism as a cognitive asset, teach grammar in context, deploy Realia/TLM, and pair diagnosis with compassionate remediation.',
        revisionPoints: [
          'Multilingualism = Resource (NCF 2005 & NEP 2020).',
          'Realia = Menus, tickets, newspapers as authentic TLM.',
          'Dyslexia = Reading; Dysgraphia = Writing; Aphasia = Speech/Comprehension.',
        ],
        practiceQuestions: [
          {
            id: 'lang1-u4-en-q1',
            question: 'Bringing actual restaurant menus, train tickets, and weather clippings for a reading lesson uses:',
            options: ['Prescriptive drills', 'Realia / Authentic materials', 'Standardized rubrics', 'Phonetic scripts'],
            correctAnswer: 1,
            explanation: 'Everyday real-world objects and texts used for language learning are called Realia or Authentic Materials.',
            topicReference: 'Unit 4 · TLM',
          },
          {
            id: 'lang1-u4-en-q2',
            question: 'How should a teacher view a classroom where children speak four different home languages?',
            options: [
              'As a hurdle slowing syllabus completion',
              'As a rich cognitive and pedagogical resource',
              'As a discipline issue requiring fines',
              'As a reason to segregate learners',
            ],
            correctAnswer: 1,
            explanation: 'NCF 2005 and NEP 2020 affirm multilingualism as a valuable resource enhancing cognitive flexibility.',
            topicReference: 'Unit 4 · Multilingualism',
          },
          {
            id: 'lang1-u4-en-q3',
            question: 'What is the essential prerequisite BEFORE starting Remedial Teaching?',
            options: [
              'Assigning extra textbook homework',
              'Conducting a Diagnostic Test to locate specific gaps and root causes',
              'Ranking the class',
              'Changing the school textbook',
            ],
            correctAnswer: 1,
            explanation: 'Remedial teaching must follow diagnostic assessment so support targets exact learning gaps.',
            topicReference: 'Unit 4 · Diagnostic & Remedial Teaching',
          },
        ],
      },
      Marathi: {
        documentTitle: 'भाषा १ · घटक ४: बहुभाषिकता, व्याकरणाची भूमिका, शैक्षणिक साहित्य व उपचारात्मक अध्यापन',
        unitTitle: 'घटक ४: भाषा विकास अध्यापनशास्त्र (भाग २)',
        topicTitle: 'संदर्भातील व्याकरण, बहुभाषिक वर्गखोली, भाषिक अडचणी, TLM व उपचारात्मक अध्यापन',
        subtopics: [
          'मौखिक व लिखित संवादात व्याकरणाची भूमिका',
          'बहुभाषिक वर्गखोली (त्रिभाषा सूत्र व NEP 2020)',
          'अध्ययन अक्षमता (डिस्लेक्सिया, डिस्ग्राफिया, अफेझिया)',
          'शैक्षणिक साहित्य (TLM): पाठ्यपुस्तक, प्रामाणिक साहित्य (Realia) व ICT',
          'नैदानिक चाचणी आणि उपचारात्मक अध्यापन',
        ],
        introduction:
          'NCF 2005 आणि NEP 2020 नुसार बहुभाषिकता ही अडचण नसून एक समृद्ध संसाधन आहे. यासोबतच प्रामाणिक शैक्षणिक साहित्य (Realia) आणि नैदानिक-उपचारात्मक चक्र ही भाषा शिक्षकाची प्रमुख कौशल्ये आहेत.',
        meaningAndDefinition:
          'बहुभाषिकता म्हणजे विद्यार्थ्यांच्या घरच्या बोलीभाषेचा आदर करून तिचा उपयोग नवीन भाषा व संकल्पना शिकण्यासाठी सेतू म्हणून करणे. उपचारात्मक अध्यापन म्हणजे नैदानिक चाचणीनंतर विशिष्ट त्रुटी दूर करण्यासाठी दिलेले वैयक्तिक मार्गदर्शन होय.',
        detailedExplanation: [
          '१. व्याकरणाची भूमिका: व्याकरण हे प्रभावी संवादाचे साधन आहे; ते पाठाच्या संदर्भातून शिकवावे.',
          '२. बहुभाषिकता व NEP 2020: इयत्ता ५ वी पर्यंत (शक्यतो ८ वी पर्यंत) मातृभाषा/घरची भाषा माध्यम ठेवणे व लवचिक त्रिभाषा सूत्र राबवणे.',
          '३. अध्ययन अक्षमता: डिस्लेक्सिया (वाचन), डिस्ग्राफिया (लेखन), अफेझिया (भाषा आकलन व संवाद).',
          '४. प्रामाणिक साहित्य (Realia): पाठ्यपुस्तक हे एकमेव साधन नव्हे; बस तिकिटे, बातम्यांची कात्रणे, मेनू, औषध पत्रके हे प्रामाणिक साहित्य (Realia) आहे.',
          '५. नैदानिक → उपचारात्मक चक्र: प्रथम नैदानिक चाचणीने (पास-नापास न ठरवता) मूळ कारण शोधावे व नंतर भिन्न पद्धतीने उपचारात्मक अध्यापन करावे.',
        ],
        importantConcepts: [
          'प्रामाणिक साहित्य (Realia): दैनंदिन जीवनातील तिकिटे, पत्रके, वर्तमानपत्रे.',
          'नैदानिक चाचणी: त्रुटींचे नेमके कारण शोधण्यासाठी (गुणांसाठी नव्हे).',
        ],
        comparisonTable: {
          caption: 'भाषिक अध्ययन अक्षमता व उपाययोजना',
          headers: ['अक्षमता', 'मुख्य लक्षण', 'वर्गातील उपाय'],
          rows: [
            ['डिस्लेक्सिया', 'वाचनात व ध्वनी ओळखण्यात अडचण', 'ध्वनिशास्त्र, मोठ्या अक्षरांची पुस्तके, ऑडिओ कथा'],
            ['डिस्ग्राफिया', 'हस्ताक्षर व शुद्धलेखनात तीव्र अडचण', 'सँडपेपर अक्षर सराव, तोंडी सादरीकरण'],
            ['अफेझिया', 'भाषा समजण्यात व बोलण्यात अडचण', 'चित्राधारित संवाद, सोपी लहान वाक्ये'],
          ],
        },
        practicalExamples: [
          'वर्गात वऱ्हाडी, अहिराणी किंवा मालवणी शब्दांचा आदर करून प्रमाण मराठीशी पूल जोडणे.',
        ],
        classroomApplications: [
          'वर्गात बहुभाषिक शब्दभिंत (Word Wall) तयार करा व उपचारात्मक अध्यापनात अध्यापन पद्धत बदला.',
        ],
        teachingMethods: [
          'बहुसंवेदनात्मक पद्धती (VAKT) व नैदानिक-उपचारात्मक चक्र.',
        ],
        examSpecificFocus: {
          ctet: 'CTET मध्ये बहुभाषिकता = संसाधन, Realia, पाठ्यपुस्तक हे अनेक साधनांपैकी एक, आणि नैदानिक चाचणीनंतर उपचारात्मक अध्यापन यांवर नियमित प्रश्न येतात.',
          mahaTet: 'MAHA TET मध्ये दृक-श्राव्य साधनांचे वर्गीकरण, डिस्लेक्सिया-डिस्ग्राफिया व उपचारात्मक अध्यापनाचे टप्पे विचारले जातात.',
        },
        importantExamPoints: [
          'बहुभाषिकता कधीही अडथळा नसून नेहमीच "संसाधन" असते.',
          'उपचारात्मक अध्यापन नेहमी नैदानिक चाचणीनंतर केले जाते.',
        ],
        commonMistakes: [
          'उपचारात्मक अध्यापन म्हणजे संपूर्ण अभ्यासक्रम पुन्हा शिकवणे असे मानणे.',
        ],
        topicSummary:
          'बहुभाषिकतेचा संसाधन म्हणून स्वीकार, संदर्भाधिष्ठित व्याकरण, Realia आणि नैदानिक-उपचारात्मक चक्र भाषा शिक्षण सर्वसमावेशक बनवते.',
        revisionPoints: [
          'बहुभाषिकता = संज्ञानात्मक संसाधन.',
          'Realia = दैनंदिन जीवनातील प्रामाणिक साहित्य.',
          'आधी नैदानिक चाचणी → नंतर उपचारात्मक अध्यापन.',
        ],
        practiceQuestions: [
          {
            id: 'lang1-u4-mr-q1',
            question: 'शिक्षिकेने वर्गात बसची तिकिटे, औषधांची पत्रके आणि वर्तमानपत्रे वाचण्यासाठी आणली. यास काय म्हणतात?',
            options: ['केवळ परीक्षा साहित्य', 'प्रामाणिक साहित्य (Realia)', 'व्याकरण तक्ते', 'अभ्यासेतर साहित्य'],
            correctAnswer: 1,
            explanation: 'दैनंदिन जीवनातील वास्तविक मजकूर भाषा शिकवण्यासाठी वापरल्यास त्यास प्रामाणिक साहित्य (Realia) म्हणतात.',
            topicReference: 'घटक ४ · TLM',
          },
          {
            id: 'lang1-u4-mr-q2',
            question: 'उपचारात्मक अध्यापन सुरू करण्यापूर्वी काय करणे अनिवार्य आहे?',
            options: [
              'अधिक गृहपाठ देणे',
              'नैदानिक चाचणी घेऊन नेमक्या अडचणी व कारणे शोधणे',
              'वार्षिक परीक्षा घेणे',
              'अभ्यासक्रम कमी करणे',
            ],
            correctAnswer: 1,
            explanation: 'नैदानिक चाचणीनंतरच अचूक उपचारात्मक अध्यापन शक्य होते.',
            topicReference: 'घटक ४ · नैदानिक व उपचारात्मक',
          },
          {
            id: 'lang1-u4-mr-q3',
            question: 'NEP 2020 व NCF 2005 नुसार वर्गातील बहुभाषिकतेकडे कसे पाहावे?',
            options: ['अडथळा म्हणून', 'संज्ञानात्मक व भाषिक संसाधन म्हणून', 'शिस्तीची समस्या म्हणून', 'केवळ उच्च वर्गासाठी'],
            correctAnswer: 1,
            explanation: 'बहुभाषिकता ही वर्गासाठी एक समृद्ध संज्ञानात्मक संसाधन आहे.',
            topicReference: 'घटक ४ · बहुभाषिकता',
          },
        ],
      },
      Hindi: {
        documentTitle: 'भाषा १ · इकाई ४: बहुभाषिकता, व्याकरण की भूमिका, शिक्षण सामग्री एवं उपचारात्मक शिक्षण',
        unitTitle: 'इकाई ४: भाषा विकास का शिक्षाशास्त्र (भाग २)',
        topicTitle: 'संदर्भ में व्याकरण, बहुभाषिक कक्षा, भाषायी कठिनाइयाँ, TLM (Realia) तथा निदानात्मक-उपचारात्मक शिक्षण',
        subtopics: [
          'मौखिक व लिखित अभिव्यक्ति में व्याकरण की भूमिका',
          'बहुभाषिक कक्षा एवं NEP 2020 त्रिभाषा सूत्र',
          'अधिगम अक्षमताएँ (डिस्लेक्सिया, डिस्ग्राफिया, अफेजिया)',
          'शिक्षण-अधिगम सामग्री (TLM): पाठ्यपुस्तक, Realia एवं ICT',
          'निदानात्मक परीक्षण तथा उपचारात्मक शिक्षण',
        ],
        introduction:
          'NCF 2005 और NEP 2020 बहुभाषिकता को बाधा नहीं बल्कि संज्ञानात्मक संसाधन मानती हैं। संदर्भगत व्याकरण, प्रामाणिक TLM (Realia) और निदानात्मक-उपचारात्मक शिक्षण प्रत्येक शिक्षक की अनिवार्य दक्षताएँ हैं।',
        meaningAndDefinition:
          'बहुभाषिकता का अर्थ विद्यार्थियों की घर की भाषाओं को सम्मान देकर उन्हें सीखने का सेतु बनाना है। उपचारात्मक शिक्षण निदानात्मक परीक्षण के बाद विशिष्ट कमियों को दूर करने हेतु दी गई लक्षित सहायता है।',
        detailedExplanation: [
          '१. व्याकरण की भूमिका: व्याकरण सार्थक संप्रेषण का साधन है; इसे पाठ के संदर्भ में सिखाना चाहिए।',
          '२. बहुभाषिकता व NEP 2020: कक्षा ५ (यथासंभव ८) तक मातृभाषा/घर की भाषा को माध्यम बनाना तथा लचीला त्रिभाषा सूत्र।',
          '३. अधिगम विकार: डिस्लेक्सिया (पठन), डिस्ग्राफिया (लेखन), अफेजिया (भाषा बोध व संप्रेषण)।',
          '४. प्रामाणिक सामग्री (Realia): पाठ्यपुस्तक अनेक संसाधनों में से एक है। रेल टिकट, मेनू, अखबार की कतरनें प्रामाणिक सामग्री (Realia) हैं।',
          '५. निदान → उपचार: निदानात्मक परीक्षण में अंक नहीं दिए जाते, बल्कि त्रुटि का मूल कारण खोजकर उपचारात्मक शिक्षण में नई विधि से सुधार किया जाता है।',
        ],
        importantConcepts: [
          'प्रामाणिक सामग्री (Realia): दैनिक जीवन के वास्तविक पाठ (मेनू, टिकट, पोस्टर)।',
          'निदानात्मक परीक्षण: अधिगम-कठिनाई के मूल कारण की पहचान।',
        ],
        comparisonTable: {
          caption: 'निदानात्मक परीक्षण बनाम उपचारात्मक शिक्षण',
          headers: ['पक्ष', 'निदानात्मक परीक्षण', 'उपचारात्मक शिक्षण'],
          rows: [
            ['उद्देश्य', 'अधिगम त्रुटि के कारण की पहचान', 'पहचानी गई कमी को दूर करना'],
            ['क्रम', 'पहले किया जाता है', 'निदान के बाद किया जाता है'],
            ['मूल्यांकन', 'अंक या पास-फेल नहीं', 'व्यक्तिगत सुधार की निगरानी'],
          ],
        },
        practicalExamples: [
          'दवा के रैपर या बस टिकट से दिनांक व निर्देश पढ़वाना Realia आधारित प्रामाणिक पठन है।',
        ],
        classroomApplications: [
          'बहुभाषिक शब्द-दीवार बनाएँ और उपचारात्मक शिक्षण में खेल, चित्र व ऑडियो का प्रयोग करें।',
        ],
        teachingMethods: [
          'बहु-इंद्रिय शिक्षण (VAKT) एवं निदानात्मक-उपचारात्मक चक्र।',
        ],
        examSpecificFocus: {
          ctet: 'CTET में बहुभाषिकता (संसाधन), Realia, पाठ्यपुस्तक "अनेक संसाधनों में से एक" और निदान-उपचार क्रम पर सर्वाधिक प्रश्न आते हैं।',
          mahaTet: 'MAHA TET में श्रव्य-दृश्य TLM के प्रकार, डिस्लेक्सिया-डिस्ग्राफिया तथा उपचारात्मक चरण पूछे जाते हैं।',
        },
        importantExamPoints: [
          'बहुभाषिकता सदैव एक "संसाधन" (Resource) है।',
          'उपचारात्मक शिक्षण सदैव निदानात्मक परीक्षण के बाद किया जाता है।',
        ],
        commonMistakes: [
          'निदान और उपचार के क्रम को उलट देना।',
        ],
        topicSummary:
          'बहुभाषिक संसाधन, संदर्भगत व्याकरण, प्रामाणिक Realia और निदान-आधारित उपचारात्मक शिक्षण कक्षा को समावेशी बनाते हैं।',
        revisionPoints: [
          'बहुभाषिकता = संज्ञानात्मक संसाधन।',
          'Realia = वास्तविक टिकट, मेनू, अखबार।',
          'पहले निदान, फिर नई विधि से उपचार।',
        ],
        practiceQuestions: [
          {
            id: 'lang1-u4-hi-q1',
            question: 'भाषा की कक्षा में बहुभाषिकता को किस रूप में देखा जाना चाहिए?',
            options: ['बाधा के रूप में', 'शैक्षिक एवं संज्ञानात्मक संसाधन के रूप में', 'समस्या के रूप में', 'मातृभाषा त्याग के रूप में'],
            correctAnswer: 1,
            explanation: 'NCF 2005 व NEP 2020 के अनुसार बहुभाषिकता एक समृद्ध संज्ञानात्मक संसाधन है।',
            topicReference: 'इकाई ४ · बहुभाषिकता',
          },
          {
            id: 'lang1-u4-hi-q2',
            question: 'निदानात्मक परीक्षण (Diagnostic Test) का मुख्य उद्देश्य क्या है?',
            options: ['श्रेणी देना', 'अधिगम कठिनाइयों और उनके मूल कारणों की पहचान करना', 'वार्षिक प्रमाण-पत्र देना', 'अंक-सूची भेजना'],
            correctAnswer: 1,
            explanation: 'निदानात्मक परीक्षण अधिगम-कठिनाई के मूल कारणों को खोजता है।',
            topicReference: 'इकाई ४ · निदानात्मक परीक्षण',
          },
          {
            id: 'lang1-u4-hi-q3',
            question: 'समाचार-पत्र की मौसम रिपोर्ट और रेल समय-सारणी का कक्षा में प्रयोग किस सामग्री का उदाहरण है?',
            options: ['प्रामाणिक सामग्री (Realia)', 'यांत्रिक अभ्यास पुस्तिका', 'केवल व्याकरण कोष', 'मानकीकृत परीक्षा'],
            correctAnswer: 0,
            explanation: 'दैनिक जीवन की वास्तविक सामग्री को Realia (प्रामाणिक सामग्री) कहते हैं।',
            topicReference: 'इकाई ४ · TLM',
          },
        ],
      },
    },
  },
];
