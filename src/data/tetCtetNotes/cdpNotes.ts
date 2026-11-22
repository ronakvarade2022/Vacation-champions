import { TetCtetNoteTopicBlueprint } from './types';

export const CDP_NOTE_BLUEPRINTS: TetCtetNoteTopicBlueprint[] = [
  {
    slug: 'cdp-u1-growth-development-heredity-socialization',
    unitNumber: 1,
    topicNumber: 1,
    subjectId: 'CDP',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_1', 'PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Official Information Bulletin — CDP Part (a): Child Development (Growth, Principles, Heredity & Environment, Socialization)',
      mahaTet: 'MSCE Pune MAHA TET Official Syllabus — Balvikas va Adhyapanshastra (Vadh, Vikas, Anuvanshikta, Paristhiti va Samajikaran)',
    },
    content: {
      English: {
        documentTitle: 'Concept of Development, Principles, Heredity-Environment & Socialization',
        unitTitle: 'Unit 1: Child Development, Heredity & Socialization',
        topicTitle: 'Growth vs. Development, Principles of Development & Socialization',
        subtopics: [
          'Meaning of Growth and Development and their relationship with Learning',
          'Core Principles of Child Development (Cephalocaudal, Proximodistal, Continuity, Individual Rate)',
          'Influence of Heredity (Nature) and Environment (Nurture)',
          'Socialization Processes: Primary (Family) and Secondary (School, Peers, Media)',
        ],
        introduction:
          'Understanding how a child grows physically, thinks logically, manages emotions, and interacts socially forms the backbone of effective teaching. Both CTET and Maharashtra TET evaluate whether a prospective teacher can distinguish quantitative bodily growth from holistic qualitative development and align instruction with the child’s developmental readiness.',
        meaningAndDefinition:
          'Growth refers to measurable, quantitative structural changes such as height, weight, and organ size that generally stabilize after physical maturity. Development is a lifelong, progressive, and orderly series of qualitative and quantitative changes across physical, cognitive, socio-emotional, and moral domains resulting from maturation and experience.',
        detailedExplanation: [
          'Development and learning share a reciprocal, continuous relationship: maturation establishes biological readiness (for example, finger muscle control before writing), while guided learning accelerates higher cognitive and social abilities.',
          'Developmental progression follows predictable directional patterns—Cephalocaudal (head-to-toe control: holding head before sitting and walking) and Proximodistal (center-to-periphery control: arm control before fine pencil grip).',
          'Human development is never solely the product of genes (heredity) or surroundings (environment); rather, it is the multiplicative interaction of both (Development = Heredity × Environment). Genetic potential sets a reaction range, whereas nutrition, emotional warmth, schooling, and stimulation determine how much of that potential is realized.',
          'Socialization is the process through which children internalize cultural norms, values, language, empathy, and social roles. Family acts as the primary, foundational agency, whereas school, teachers, peer groups, and media serve as vital secondary agencies.',
        ],
        importantConcepts: [
          'Cephalocaudal Principle: Development proceeds longitudinally from head downward to feet.',
          'Proximodistal Principle: Development spreads outward from the spinal/central axis toward fingers and extremities.',
          'Spiral vs. Linear Progression: Development moves forward, pauses for consolidation, and advances again—it is spiral, not strictly uniform or linear.',
          'Maturation vs. Learning: Maturation is genetically timed unfolding; learning arises from practice, interaction, and experience.',
          'Primary vs. Secondary Socialization: Home/family builds basic trust and language; school and peers build cooperation, rules, and civic identity.',
        ],
        typesAndClassifications: [
          'Physical & Motor Domain (Gross motor: running/jumping; Fine motor: writing/drawing)',
          'Cognitive Domain (Perception, memory, reasoning, problem-solving, language)',
          'Socio-Emotional Domain (Attachment, empathy, self-regulation, peer relationships)',
          'Moral Domain (Distinguishing right from wrong, fairness, ethical reasoning)',
        ],
        comparisonTable: {
          caption: 'Key Distinctions Between Growth and Development',
          headers: ['Dimension', 'Growth', 'Development'],
          rows: [
            ['Nature of Change', 'Quantitative (height, weight, volume)', 'Qualitative + Quantitative (skills, reasoning, maturity)'],
            ['Duration', 'Stops largely after physical maturity', 'Continuous from conception to death (womb to tomb)'],
            ['Measurability', 'Directly measured in cm, kg, etc.', 'Observed through behaviour, performance & assessment'],
            ['Scope', 'Narrow; part of overall development', 'Broad, holistic, and multi-dimensional'],
          ],
        },
        importantPrinciples: [
          'Principle of Continuity: Development is an unbroken lifelong process.',
          'Principle of Individual Differences: Every child follows a similar sequence but at a unique pace.',
          'Principle of Interrelation: Physical, cognitive, and emotional domains influence each other closely.',
          'Principle of General to Specific: Infants move the whole arm before grasping a small pencil with thumb and forefinger.',
          'Principle of Predictability & Plasticity: Developmental milestones can be anticipated yet remain modifiable through early intervention.',
        ],
        educationalTheories: [
          'Ecological Systems Theory (Urie Bronfenbrenner): Explains how microsystem (family, school), mesosystem, exosystem, macrosystem, and chronosystem shape a learner.',
          'Maturational Perspective (Arnold Gesell): Highlights biological readiness timelines alongside environmental support.',
        ],
        keyThinkers: [
          {
            name: 'Elizabeth Hurlock',
            contribution: 'Defined development as a progressive series of orderly, coherent changes directed toward maturity.',
          },
          {
            name: 'Urie Bronfenbrenner',
            contribution: 'Proposed the Ecological Systems model showing layered environmental influences on child socialization.',
          },
          {
            name: 'Woodworth',
            contribution: 'Emphasized that Development is the product (not merely the sum) of Heredity and Environment.',
          },
        ],
        practicalExamples: [
          'A Class 1 child first draws large broad strokes using whole-arm movement before mastering neat small letters—illustrating the Proximodistal and General-to-Specific principles.',
          'Identical twins raised in different learning environments show similar physical stature (heredity) but different vocabulary richness and confidence (environment).',
        ],
        classroomApplications: [
          'Avoid comparing two learners of the same age on handwriting or reading speed because developmental rates vary individually.',
          'Provide hands-on manipulatives, safe emotional warmth, and peer group activities so school functions as an empowering secondary socialization agency.',
          'Collaborate closely with parents (home-school mesosystem) to align daily habits and learning routines.',
        ],
        teachingMethods: [
          'Developmentally Appropriate Practice (DAP) matched to age readiness',
          'Play-way & Activity-Based Learning for primary learners (Paper I) and collaborative inquiry for upper-primary learners (Paper II)',
          'Observation checklists & anecdotal records to track multi-domain progress',
        ],
        examSpecificFocus: {
          ctet: 'CTET frequently tests conceptual statements distinguishing spiral vs. linear development, Cephalocaudal vs. Proximodistal direction, and classifying Family as primary vs. School/Peers as secondary socialization agencies.',
          mahaTet: 'MAHA TET emphasizes exact educational psychology definitions (Hurlock, Woodworth), heredity-environment laws, and identifying physical/emotional developmental traits across Balvikas stages (6–11 & 11–14 years).',
        },
        importantExamPoints: [
          'Development is ALWAYS spiral and multi-dimensional, NEVER purely linear or uniform.',
          'Heredity sets the upper/lower potential limits; environment shapes actual achievement.',
          'School is a SECONDARY agency of socialization; family is the PRIMARY agency.',
          'Paper I focuses on Middle Childhood (6–11 years); Paper II focuses on Early Adolescence (11–14 years — rapid physical spurt, identity search, peer influence).',
        ],
        commonMistakes: [
          'Confusing Cephalocaudal (head-to-toe) with Proximodistal (center-to-outward).',
          'Treating growth and development as identical synonyms or assuming development stops at age 18.',
          'Assuming heredity and environment are additive (H + E) instead of interactive/multiplicative (H × E).',
        ],
        topicSummary:
          'Growth denotes measurable physical enlargement, whereas development represents lifelong, spiral, multi-domain progression driven by the dynamic interaction of heredity and environment. Teachers who respect individual rates of maturation and nurture positive socialization build confident, resilient learners.',
        revisionPoints: [
          'Growth = Quantitative & stops at maturity; Development = Qualitative + Quantitative & lifelong.',
          'Direction: Cephalocaudal (Head → Toe) & Proximodistal (Center → Periphery).',
          'Development = Heredity × Environment (Interactionist view).',
          'Primary Socialization = Family; Secondary Socialization = School, Peers, Community, Media.',
          'All domains (Physical, Cognitive, Social, Emotional) are closely interrelated.',
        ],
        practiceQuestions: [
          {
            id: 'cdp-u1-en-q1',
            question: 'A young child learns to control arm movements before mastering neat finger grip while holding a crayon. Which developmental principle does this illustrate?',
            options: [
              'Cephalocaudal principle',
              'Proximodistal principle',
              'Principle of uniform rate',
              'Principle of irreversible fixation',
            ],
            correctAnswer: 1,
            explanation:
              'Proximodistal development proceeds from the central axis of the body outward toward the extremities (arms before fingers). Cephalocaudal refers to head-to-toe progression.',
            topicReference: 'Unit 1 — Principles of Child Development',
          },
          {
            id: 'cdp-u1-en-q2',
            question: 'Which statement accurately describes the relationship between heredity and environment in child development?',
            options: [
              'Heredity alone determines academic success while environment affects only height.',
              'Environment completely replaces genetic traits during primary schooling.',
              'Development results from a continuous, dynamic interaction between heredity and environment.',
              'Heredity and environment act independently with zero mutual influence.',
            ],
            correctAnswer: 2,
            explanation:
              'Modern developmental psychology affirms an interactionist model (Development = Heredity × Environment), where genetic predispositions and environmental experiences continuously shape each other.',
            topicReference: 'Unit 1 — Heredity and Environment',
          },
          {
            id: 'cdp-u1-en-q3',
            question: 'In a child’s socialization process, family and school respectively represent which types of agencies?',
            options: [
              'Secondary and Primary agencies',
              'Primary and Secondary agencies',
              'Passive and Formal-only agencies',
              'Unrelated social institutions',
            ],
            correctAnswer: 1,
            explanation:
              'Family is the primary agency of socialization where early language, attachment, and values originate; school and peer groups act as secondary agencies expanding civic and academic norms.',
            topicReference: 'Unit 1 — Socialization Processes',
          },
        ],
      },
      Marathi: {
        documentTitle: 'विकासाची संकल्पना, तत्त्वे, आनुवंशिकता-परिसर व समाजीकरण',
        unitTitle: 'घटक १: बालविकास, आनुवंशिकता आणि समाजीकरण',
        topicTitle: 'वाढ व विकास, बालविकासाची तत्त्वे आणि समाजीकरण प्रक्रिया',
        subtopics: [
          'वाढ (Growth) व विकास (Development) यांचा अर्थ आणि अध्ययनाशी संबंध',
          'बालविकासाची प्रमुख तत्त्वे (शिरोपाद, केंद्रापासून परिघाकडे, सातत्य, वैयक्तिक गती)',
          'आनुवंशिकता (Heredity) व परिसर/वातावरण (Environment) यांचा प्रभाव',
          'समाजीकरण प्रक्रिया: प्राथमिक (कुटुंब) आणि दुय्यम (शाळा, समवयस्क गट, माध्यमे) संस्था',
        ],
        introduction:
          'विद्यार्थ्याचा शारीरिक, बौद्धिक, भावनिक व सामाजिक विकास कसा होतो हे समजून घेणे प्रत्येक शिक्षकासाठी अत्यंत आवश्यक आहे. CTET आणि महाराष्ट्र TET (MAHA TET) परीक्षांमध्ये वाढ व विकास यांतील सूक्ष्म फरक, विकासाची दिशा आणि समाजीकरणातील शाळेची भूमिका यांवर नियमितपणे प्रश्न विचारले जातात.',
        meaningAndDefinition:
          'वाढ (Growth) म्हणजे शरीराच्या उंची, वजन व अवयवांच्या आकारात होणारे संख्यात्मक (Quantitative) बदल होत; हे बदल शारीरिक परिपक्वतेनंतर बहुतांशी थांबतात. विकास (Development) म्हणजे गर्भधारणेपासून मृत्यूपर्यंत शारीरिक, बोधात्मक, सामाजिक व भावनिक स्तरांवर होणाऱ्या क्रमबद्ध, प्रगतिशील व गुणात्मक (Qualitative) बदलांची अखंड प्रक्रिया होय.',
        detailedExplanation: [
          'विकास आणि अध्ययन (Learning) यांचा परस्परपूरक संबंध असतो. परिपक्वतेमुळे (Maturation) मूल शिकण्यास तयार होते, तर योग्य अनुभव व मार्गदर्शनामुळे त्याच्या क्षमतांचा उच्च दर्जाचा विकास होतो.',
          'बालविकासाची दिशा दोन शास्त्रीय नियमांनी स्पष्ट होते: १) शिरोपाद क्रम (Cephalocaudal) — डोक्याकडून पायाकडे नियंत्रण येणे (प्रथम मान धरणे, नंतर बसणे व चालणे); २) केंद्रापासून परिघाकडे क्रम (Proximodistal) — शरीराच्या मध्यभागाकडून हाताच्या बोटांकडे कौशल्य विकसित होणे.',
          'बालकाचा विकास केवळ आनुवंशिकतेवर किंवा केवळ परिसरावर अवलंबून नसतो, तर तो दोहोंच्या परस्पर आंतरक्रियेचा गुणाकार असतो (विकास = आनुवंशिकता × परिसर). आनुवंशिकता क्षमतांची मर्यादा ठरवते, तर पोषण, प्रेमळ वातावरण व शिक्षण त्या क्षमता प्रत्यक्षात आणतात.',
          'समाजीकरण म्हणजे समाजाची मूल्ये, भाषा, शिस्त, सहकार्य व भूमिका आत्मसात करण्याची प्रक्रिया. कुटुंब ही प्राथमिक संस्था असून शाळा, शिक्षक, मित्रपरिवार व प्रसारमाध्यमे या दुय्यम पण अत्यंत प्रभावी संस्था आहेत.',
        ],
        importantConcepts: [
          'शिरोपाद विकास (Cephalocaudal): विकास डोक्याकडून पायाच्या दिशेने होतो.',
          'केंद्रापासून परिघाकडे विकास (Proximodistal): विकास मणक्याच्या/केंद्रभागाकडून बोटांच्या टोकांकडे होतो.',
          'सर्पिलाकार प्रगती (Spiral Development): विकास सरळ रेषेत न होता पुढे जाऊन स्थिरावत (सर्पिलाकार) घडतो.',
          'परिपक्वता व अध्ययन: परिपक्वता जैविक घड्याळाप्रमाणे घडते, तर अध्ययन सराव व अनुभवातून घडते.',
          'प्राथमिक व दुय्यम समाजीकरण: कुटुंब भावनिक पाया व मातृभाषा देते; शाळा सहकार्य, नियम व नागरिकत्व शिकवते.',
        ],
        typesAndClassifications: [
          'शारीरिक व कारक विकास (स्थूल कारक: धावणे, उड्या मारणे; सूक्ष्म कारक: लेखन, चित्रकला)',
          'बोधात्मक/संज्ञानात्मक विकास (अवधान, स्मृती, तर्कशक्ती, समस्या निराकरण, भाषा)',
          'सामाजिक-भावनिक विकास (भावनिक नियमन, सहानुभूती, मैत्री, आत्मविश्वास)',
          'नैतिक विकास (योग्य-अयोग्य विवेक, न्यायबुद्धी व जबाबदारीची जाणीव)',
        ],
        comparisonTable: {
          caption: 'वाढ (Growth) आणि विकास (Development) यांतील प्रमुख फरक',
          headers: ['घटक', 'वाढ (Growth)', 'विकास (Development)'],
          rows: [
            ['बदलाचे स्वरूप', 'संख्यात्मक (उंची, वजन, आकार)', 'गुणात्मक व संख्यात्मक (कौशल्ये, विचारक्षमता)'],
            ['कालावधी', 'शारीरिक परिपक्वतेनंतर थांबते', 'जन्मापूर्वीपासून मृत्यूपर्यंत अखंड चालू राहतो'],
            ['मापनक्षमता', 'सेंमी, किग्रॅ मध्ये अचूक मोजता येते', 'निरीक्षण व वर्तनातून मूल्यांकन केले जाते'],
            ['व्याप्ती', 'मर्यादित; विकासाचा एक भाग', 'व्यापक, सर्वांगीण आणि बहुआयामी'],
          ],
        },
        importantPrinciples: [
          'सातत्याचे तत्त्व: विकास जन्मापूर्वीपासून मृत्यूपर्यंत अखंड सुरू राहतो.',
          'वैयक्तिक भिन्नतेचे तत्त्व: प्रत्येक बालकाच्या विकासाचा क्रम सारखा असला तरी गती भिन्न असते.',
          'परस्परसंबंधाचे तत्त्व: शारीरिक, मानसिक व भावनिक विकास एकमेकांवर प्रभाव टाकतात.',
          'सामान्याकडून विशिष्टाकडे तत्त्व: मूल आधी संपूर्ण हात हलवते आणि नंतर बोटांनी पेन्सिल पकडते.',
          'पूर्वानुमान व लवचिकतेचे तत्त्व: विकासाचे टप्पे ओळखता येतात व योग्य मदतीने सुधारता येतात.',
        ],
        educationalTheories: [
          'यूरी ब्रॉनफेनब्रेनर यांचा परिस्थितिकी प्रणाली सिद्धांत (Ecological Systems Theory): सूक्ष्मप्रणाली (कुटुंब, शाळा), मध्यप्रणाली व व्यापक सामाजिक संस्कृतीचा बालकावरील परिणाम स्पष्ट करतो.',
          'अर्नोल्ड गेसेल यांचा परिपक्वता सिद्धांत: अध्ययनासाठी जैविक तयारी व वयानुरूप टप्प्यांचे महत्त्व सांगतो.',
        ],
        keyThinkers: [
          {
            name: 'एलिझाबेथ हरलॉक (Elizabeth Hurlock)',
            contribution: 'विकास म्हणजे परिपक्वतेच्या दिशेने होणाऱ्या क्रमबद्ध व सुसंगत बदलांची प्रगतिशील मालिका अशी व्याख्या केली.',
          },
          {
            name: 'वुडवर्थ (Woodworth)',
            contribution: 'विकास हा आनुवंशिकता आणि परिसर यांचा बेरीज नसून गुणाकार (आंतरक्रिया) आहे हे स्पष्ट केले.',
          },
          {
            name: 'यूरी ब्रॉनफेनब्रेनर',
            contribution: 'कुटुंब, शाळा व समाज या विविध स्तरांचा बालकाच्या समाजीकरणावरील प्रभाव मांडला.',
          },
        ],
        practicalExamples: [
          'इयत्ता पहिलीतील विद्यार्थी सुरुवातीला मोठ्या अक्षरांत लिहितो आणि हळूहळू सूक्ष्म बोटांच्या नियंत्रणामुळे सुबक अक्षरे काढू लागतो — हे केंद्रापासून परिघाकडे व सामान्याकडून विशिष्टाकडे या तत्त्वांचे उदाहरण आहे.',
          'एकाच वयाची दोन मुले वेगवेगळ्या गतीने वाचन शिकतात, कारण त्यांच्या कौटुंबिक वाचन-संस्कृती व वैयक्तिक गतीमध्ये फरक असतो.',
        ],
        classroomApplications: [
          'दोन विद्यार्थ्यांची अनावश्यक तुलना न करता प्रत्येकाच्या वैयक्तिक प्रगतीच्या वेगाचा आदर करावा.',
          'प्राथमिक स्तरावर (पेपर १) खेळ व कृतियुक्त साधनांचा, तर उच्च प्राथमिक स्तरावर (पेपर २) गटचर्चा व प्रकल्पांचा वापर करावा.',
          'पालक-शिक्षक संवादाद्वारे घर व शाळा यांत सुसंगत पोषक वातावरण निर्माण करावे.',
        ],
        teachingMethods: [
          'वयानुरूप कृतियुक्त अध्यापन (Developmentally Appropriate Practice)',
          'खेळपद्धती, गटकार्य व अनुभवजन्य शिक्षण',
          'सातत्यपूर्ण निरीक्षण नोंदवही व पोर्टफोलिओ मूल्यमापन',
        ],
        examSpecificFocus: {
          ctet: 'CTET मध्ये विकासाची सर्पिलाकार प्रवृत्ती, शिरोपाद विरुद्ध केंद्रापासून परिघाकडे दिशा आणि कुटुंब (प्राथमिक) विरुद्ध शाळा (दुय्यम) समाजीकरण यांवर उपयोजन-आधारित प्रश्न येतात.',
          mahaTet: 'MAHA TET मध्ये हरलॉक, वुडवर्थ यांच्या व्याख्या, बाल्यावस्था (६–११ वर्षे) व किशोरावस्था (११–१४ वर्षे) यांची वैशिष्ट्ये तसेच आनुवंशिकतेचे नियम यांवर भर दिला जातो.',
        },
        importantExamPoints: [
          'विकास नेहमी सर्पिलाकार (Spiral) व बहुआयामी असतो; तो कधीही एकरेषीय नसतो.',
          'कुटुंब ही समाजीकरणाची प्राथमिक संस्था आहे, तर शाळा व मित्रपरिवार या दुय्यम संस्था आहेत.',
          'पेपर १ साठी उत्तर बाल्यावस्था (६–११ वर्षे) आणि पेपर २ साठी पूर्व किशोरावस्था (११–१४ वर्षे) केंद्रस्थानी असते.',
          'भावनिक सुरक्षितता नसल्यास मुलांच्या बोधात्मक अध्ययनावर थेट नकारात्मक परिणाम होतो.',
        ],
        commonMistakes: [
          'शिरोपाद (डोक्याकडून पायाकडे) आणि केंद्रापासून परिघाकडे या दोहोंमध्ये गोंधळ करणे.',
          'वाढ आणि विकास हे दोन्ही समानार्थी मानणे.',
          'शाळेला समाजीकरणाची प्राथमिक संस्था मानण्याची चूक करणे.',
        ],
        topicSummary:
          'वाढ ही मर्यादित संख्यात्मक प्रक्रिया असून विकास ही आजीवन, सर्पिलाकार व सर्वांगीण गुणात्मक प्रक्रिया आहे. आनुवंशिकता व परिसर यांच्या परस्पर आंतरक्रियेतून आणि कुटुंब-शाळा या समाजीकरण संस्थांच्या सहकार्यातून बालकाचे व्यक्तिमत्त्व घडते.',
        revisionPoints: [
          'वाढ = संख्यात्मक व मर्यादित; विकास = गुणात्मक + संख्यात्मक व आजीवन.',
          'दिशा: शिरोपाद (डोके → पाय) आणि केंद्रापासून परिघाकडे (मध्यभाग → बोटे).',
          'विकास = आनुवंशिकता × परिसर.',
          'प्राथमिक समाजीकरण = कुटुंब; दुय्यम समाजीकरण = शाळा, समवयस्क, माध्यमे.',
          'विकासाचे सर्व पैलू परस्परांशी घट्ट जोडलेले असतात.',
        ],
        practiceQuestions: [
          {
            id: 'cdp-u1-mr-q1',
            question: 'बालक प्रथम संपूर्ण हाताची हालचाल नियंत्रित करते आणि नंतर बोटांनी पेन्सिल धरून लिहायला शिकते. हे विकासाच्या कोणत्या तत्त्वाचे उदाहरण आहे?',
            options: [
              'शिरोपाद तत्त्व (Cephalocaudal)',
              'केंद्रापासून परिघाकडे तत्त्व (Proximodistal)',
              'समान गतीचे तत्त्व',
              'एकरेषीय विकासाचे तत्त्व',
            ],
            correctAnswer: 1,
            explanation:
              'शरीराच्या केंद्रभागाकडून (खांदा, बाहू) बाहेरील अवयवांकडे (मनगट, बोटे) नियंत्रण विकसित होणे याला केंद्रापासून परिघाकडे (Proximodistal) तत्त्व म्हणतात.',
            topicReference: 'घटक १ — बालविकासाची तत्त्वे',
          },
          {
            id: 'cdp-u1-mr-q2',
            question: 'बालकाच्या विकासासंदर्भात आनुवंशिकता आणि परिसर यांच्याबद्दल कोणते विधान योग्य आहे?',
            options: [
              'विकासावर केवळ आनुवंशिकतेचाच परिणाम होतो.',
              'परिसर आनुवंशिक गुणधर्म पूर्णपणे नष्ट करतो.',
              'विकास हा आनुवंशिकता आणि परिसर यांच्या सततच्या आंतरक्रियेचा परिणाम आहे.',
              'आनुवंशिकता व परिसर यांचा एकमेकांशी काहीही संबंध नसतो.',
            ],
            correctAnswer: 2,
            explanation:
              'आधुनिक बालमानसशास्त्रानुसार विकास हा आनुवंशिकता आणि परिसर यांच्या परस्परपूरक गुणाकाराचा (आंतरक्रियेचा) परिणाम असतो.',
            topicReference: 'घटक १ — आनुवंशिकता व परिसर',
          },
          {
            id: 'cdp-u1-mr-q3',
            question: 'बालकाच्या समाजीकरणात कुटुंब आणि शाळा यांची भूमिका अनुक्रमे कोणती असते?',
            options: [
              'दुय्यम आणि प्राथमिक संस्था',
              'प्राथमिक आणि दुय्यम संस्था',
              'केवळ अनौपचारिक संस्था',
              'परस्परविरोधी संस्था',
            ],
            correctAnswer: 1,
            explanation:
              'कुटुंब ही बालकाच्या समाजीकरणाची प्राथमिक संस्था आहे, तर शाळा, शिक्षक व समवयस्क गट या दुय्यम संस्था आहेत.',
            topicReference: 'घटक १ — समाजीकरण प्रक्रिया',
          },
        ],
      },
      Hindi: {
        documentTitle: 'विकास की अवधारणा, सिद्धांत, आनुवंशिकता-वातावरण एवं समाजीकरण',
        unitTitle: 'इकाई 1: बाल विकास, आनुवंशिकता और समाजीकरण',
        topicTitle: 'वृद्धि बनाम विकास, विकास के सिद्धांत एवं समाजीकरण प्रक्रिया',
        subtopics: [
          'वृद्धि (Growth) और विकास (Development) का अर्थ तथा अधिगम से संबंध',
          'बाल विकास के प्रमुख सिद्धांत (शिरःपदाभिमुख, समीपदूराभिमुख, निरंतरता, वैयक्तिक गति)',
          'आनुवंशिकता (Heredity) और वातावरण (Environment) का प्रभाव',
          'समाजीकरण की प्रक्रिया: प्राथमिक (परिवार) तथा द्वितीयक (विद्यालय, सहपाठी, मीडिया) अभिकरण',
        ],
        introduction:
          'एक शिक्षक के लिए यह समझना अनिवार्य है कि बच्चा शारीरिक, संज्ञानात्मक, सामाजिक और भावनात्मक रूप से कैसे विकसित होता है। CTET तथा महाराष्ट्र TET (MAHA TET) दोनों परीक्षाओं में वृद्धि और विकास के अंतर, विकास की दिशा तथा समाजीकरण में विद्यालय की भूमिका से नियमित प्रश्न पूछे जाते हैं।',
        meaningAndDefinition:
          'वृद्धि (Growth) का अर्थ लंबाई, भार और अंगों के आकार में होने वाले मात्रात्मक (Quantitative) परिवर्तनों से है जो शारीरिक परिपक्वता के बाद प्रायः रुक जाते हैं। विकास (Development) गर्भाधान से मृत्यु तक चलने वाली एक निरंतर, क्रमिक और बहुआयामी प्रक्रिया है जिसमें गुणात्मक एवं मात्रात्मक दोनों परिवर्तन सम्मिलित होते हैं।',
        detailedExplanation: [
          'विकास और अधिगम (Learning) एक-दूसरे के पूरक हैं: परिपक्वता (Maturation) सीखने के लिए जैविक तत्परता प्रदान करती है, जबकि सार्थक शिक्षण और अनुभव बच्चे के संज्ञानात्मक व सामाजिक विकास को नई दिशा देते हैं।',
          'विकास दो निश्चित दिशात्मक नियमों का पालन करता है—शिरःपदाभिमुख (Cephalocaudal: सिर से पैर की ओर नियंत्रण) और समीपदूराभिमुख (Proximodistal: शरीर के केंद्र से बाहर की ओर अर्थात भुजाओं से उंगलियों तक नियंत्रण)।',
          'बालक का विकास न तो केवल आनुवंशिकता से होता है और न केवल वातावरण से; यह दोनों की सतत अंतःक्रिया का गुणनफल है (विकास = आनुवंशिकता × वातावरण)। आनुवंशिकता संभावनाओं की सीमा तय करती है जबकि पोषण, स्नेह और शिक्षा उन्हें साकार करते हैं।',
          'समाजीकरण वह प्रक्रिया है जिसके द्वारा बच्चा समाज के मूल्यों, भाषा, सहयोग और भूमिकाओं को सीखता है। परिवार प्राथमिक अभिकरण है, जबकि विद्यालय, शिक्षक, मित्र मंडली और जनसंचार माध्यम महत्वपूर्ण द्वितीयक अभिकरण हैं।',
        ],
        importantConcepts: [
          'शिरःपदाभिमुख सिद्धांत (Cephalocaudal): विकास सिर से पैर की दिशा में बढ़ता है।',
          'समीपदूराभिमुख सिद्धांत (Proximodistal): विकास केंद्र (रीढ़/धड़) से परिधि (हाथ-उंगलियों) की ओर होता है।',
          'वर्तुलाकार प्रगति (Spiral Progression): विकास सीधी रेखा में नहीं बल्कि आगे बढ़कर स्थिर होते हुए वर्तुलाकार ढंग से चलता है।',
          'परिपक्वता बनाम अधिगम: परिपक्वता जैविक क्रम है; अधिगम अभ्यास व अनुभव का परिणाम है।',
          'प्राथमिक बनाम द्वितीयक समाजीकरण: परिवार बुनियादी विश्वास व मातृभाषा देता है; विद्यालय नियम, सहभागिता व नागरिक मूल्य विकसित करता है।',
        ],
        typesAndClassifications: [
          'शारीरिक एवं गत्यात्मक पक्ष (स्थूल गत्यात्मक: दौड़ना-कूदना; सूक्ष्म गत्यात्मक: लिखना-चित्र बनाना)',
          'संज्ञानात्मक पक्ष (चिंतन, स्मृति, तर्क, समस्या-समाधान एवं भाषा)',
          'सामाजिक-संवेगात्मक पक्ष (सहानुभूति, संवेग नियंत्रण, मित्रता एवं आत्म-सम्मान)',
          'नैतिक पक्ष (उचित-अनुचित का विवेक, न्याय एवं उत्तरदायित्व)',
        ],
        comparisonTable: {
          caption: 'वृद्धि (Growth) और विकास (Development) में प्रमुख अंतर',
          headers: ['आधार', 'वृद्धि (Growth)', 'विकास (Development)'],
          rows: [
            ['परिवर्तन का स्वरूप', 'मात्रात्मक (ऊँचाई, भार, आकार)', 'गुणात्मक एवं मात्रात्मक (कौशल, तर्क, परिपक्वता)'],
            ['अवधि', 'शारीरिक परिपक्वता के बाद रुक जाती है', 'जीवनपर्यंत (गर्भ से कब्र तक) निरंतर चलता है'],
            ['मापन', 'सेमी, किग्रा में सीधे मापा जा सकता है', 'अवलोकन, व्यवहार व आकलन द्वारा समझा जाता है'],
            ['क्षेत्र', 'संकुचित; विकास का एक अंश', 'व्यापक, समग्र तथा बहुआयामी'],
          ],
        },
        importantPrinciples: [
          'निरंतरता का सिद्धांत: विकास जीवन भर बिना रुके चलता रहता है।',
          'वैयक्तिक भिन्नता का सिद्धांत: विकास का क्रम समान होता है, किंतु प्रत्येक बच्चे की गति भिन्न होती है।',
          'परस्पर संबंध का सिद्धांत: शारीरिक, संज्ञानात्मक और संवेगात्मक विकास एक-दूसरे को प्रभावित करते हैं।',
          'सामान्य से विशिष्ट का सिद्धांत: शिशु पहले पूरा हाथ हिलाता है, बाद में उंगलियों से छोटी वस्तु पकड़ता है।',
          'पूर्वानुमान एवं लचीलेपन का सिद्धांत: विकास की दिशा का अनुमान लगाया जा सकता है और उचित हस्तक्षेप से सुधार संभव है।',
        ],
        educationalTheories: [
          'यूरी ब्रॉनफेनब्रेनर का पारिस्थितिक प्रणाली सिद्धांत (Ecological Systems Theory): सूक्ष्ममंडल (परिवार, विद्यालय), मध्यमंडल और वृहदमंडल द्वारा बाल विकास पर पड़ने वाले प्रभाव की व्याख्या करता है।',
          'अर्नोल्ड गेसेल का परिपक्वता सिद्धांत: आयु के अनुरूप जैविक तत्परता और सहायक परिवेश के समन्वय पर बल देता है।',
        ],
        keyThinkers: [
          {
            name: 'एलिजाबेथ हरलॉक (Elizabeth Hurlock)',
            contribution: 'विकास को परिपक्वता की ओर उन्मुख क्रमिक एवं सुसंगत परिवर्तनों की प्रगतिशील श्रृंखला के रूप में परिभाषित किया।',
          },
          {
            name: 'वुडवर्थ (Woodworth)',
            contribution: 'स्पष्ट किया कि विकास आनुवंशिकता और वातावरण का योग नहीं बल्कि गुणनफल (अंतःक्रिया) है।',
          },
          {
            name: 'यूरी ब्रॉनफेनब्रेनर',
            contribution: 'परिवार, विद्यालय और सामाजिक परिवेश की बहुस्तरीय भूमिका को पारिस्थितिक मॉडल से समझाया।',
          },
        ],
        practicalExamples: [
          'कक्षा 1 का बच्चा पहले पूरे हाथ से बड़े अक्षर बनाता है और बाद में उंगलियों के सूक्ष्म नियंत्रण से सुंदर अक्षर लिखता है—यह समीपदूराभिमुख और सामान्य से विशिष्ट सिद्धांत का उदाहरण है।',
          'समान आयु के दो विद्यार्थियों की पढ़ने की गति अलग-अलग हो सकती है क्योंकि उनकी पारिवारिक भाषा-समृद्धि और वैयक्तिक गति भिन्न होती है।',
        ],
        classroomApplications: [
          'एक ही कक्षा के बच्चों की अनावश्यक तुलना न करें बल्कि उनकी व्यक्तिगत गति के अनुसार सीखने के अवसर दें।',
          'प्राथमिक स्तर (पेपर 1) में खेल व मूर्त साधनों तथा उच्च प्राथमिक स्तर (पेपर 2) में सहयोगात्मक अन्वेषण का उपयोग करें।',
          'अभिभावकों के साथ नियमित संवाद रखें ताकि घर और विद्यालय का वातावरण पूरक बने।',
        ],
        teachingMethods: [
          'विकासानुकूल शिक्षण अभ्यास (Developmentally Appropriate Practice)',
          'खेल-विधि, गतिविधि आधारित अधिगम एवं समूह चर्चा',
          'अवलोकन जांच-सूची और संचयी अभिलेख (Anecdotal Records)',
        ],
        examSpecificFocus: {
          ctet: 'CTET में वर्तुलाकार बनाम रेखीय विकास, शिरःपदाभिमुख बनाम समीपदूराभिमुख दिशा तथा प्राथमिक (परिवार) व द्वितीयक (विद्यालय/सहपाठी) समाजीकरण पर अनुप्रयोग-आधारित प्रश्न प्रमुख हैं।',
          mahaTet: 'MAHA TET में हरलॉक व वुडवर्थ की परिभाषाएँ, आनुवंशिकता के नियम तथा बाल्यावस्था (6–11 वर्ष) व किशोरावस्था (11–14 वर्ष) की विशेषताओं से जुड़े प्रश्न अधिक पूछे जाते हैं।',
        },
        importantExamPoints: [
          'विकास सदैव वर्तुलाकार (Spiral) और बहुआयामी होता है, कभी एकरेखीय नहीं।',
          'परिवार समाजीकरण का प्राथमिक अभिकरण है तथा विद्यालय व सहपाठी द्वितीयक अभिकरण हैं।',
          'पेपर 1 में बाल्यावस्था (6–11 वर्ष) और पेपर 2 में पूर्व किशोरावस्था (11–14 वर्ष) पर विशेष बल रहता है।',
          'संवेगात्मक सुरक्षा का अभाव सीधे बच्चों के संज्ञानात्मक अधिगम को बाधित करता है।',
        ],
        commonMistakes: [
          'शिरःपदाभिमुख (सिर से पैर) और समीपदूराभिमुख (केंद्र से बाहर) में भ्रम होना।',
          'वृद्धि और विकास को एक ही मान लेना या समझना कि विकास 18 वर्ष पर समाप्त हो जाता है।',
          'विद्यालय को समाजीकरण का प्राथमिक अभिकरण चुन लेना।',
        ],
        topicSummary:
          'वृद्धि सीमित व मात्रात्मक शारीरिक परिवर्तन है, जबकि विकास जीवनपर्यंत चलने वाली वर्तुलाकार व सर्वांगीण प्रक्रिया है। आनुवंशिकता एवं वातावरण की सतत अंतःक्रिया तथा परिवार-विद्यालय के समाजीकरण से बालक का संतुलित निर्माण होता है।',
        revisionPoints: [
          'वृद्धि = मात्रात्मक एवं सीमित; विकास = गुणात्मक + मात्रात्मक एवं आजीवन।',
          'दिशा: शिरःपदाभिमुख (सिर → पैर) तथा समीपदूराभिमुख (केंद्र → उंगलियाँ)।',
          'विकास = आनुवंशिकता × वातावरण।',
          'प्राथमिक समाजीकरण = परिवार; द्वितीयक समाजीकरण = विद्यालय, सहपाठी, मीडिया।',
          'सभी विकास पक्ष परस्पर जुड़े होते हैं।',
        ],
        practiceQuestions: [
          {
            id: 'cdp-u1-hi-q1',
            question: 'एक बच्चा पहले पूरे हाथ की गति पर नियंत्रण पाता है और बाद में उंगलियों से पेंसिल पकड़ना सीखता है। यह किस विकास सिद्धांत को दर्शाता है?',
            options: [
              'शिरःपदाभिमुख सिद्धांत',
              'समीपदूराभिमुख सिद्धांत',
              'समान दर का सिद्धांत',
              'रेखीय विकास का सिद्धांत',
            ],
            correctAnswer: 1,
            explanation:
              'शरीर के केंद्र (धड़/कंधे) से परिधि (हाथ-उंगलियों) की ओर होने वाले विकास को समीपदूराभिमुख (Proximodistal) सिद्धांत कहते हैं।',
            topicReference: 'इकाई 1 — बाल विकास के सिद्धांत',
          },
          {
            id: 'cdp-u1-hi-q2',
            question: 'बाल विकास में आनुवंशिकता और वातावरण की भूमिका के संदर्भ में कौन-सा कथन सही है?',
            options: [
              'केवल आनुवंशिकता ही बुद्धि और अधिगम तय करती है।',
              'वातावरण आनुवंशिकता को पूर्णतः समाप्त कर देता है।',
              'विकास आनुवंशिकता और वातावरण की सतत अंतःक्रिया का परिणाम है।',
              'आनुवंशिकता और वातावरण एक-दूसरे से स्वतंत्र रहते हैं।',
            ],
            correctAnswer: 2,
            explanation:
              'आधुनिक मनोविज्ञान के अनुसार विकास आनुवंशिकता और वातावरण की निरंतर अंतःक्रिया (गुणनफल) का परिणाम है।',
            topicReference: 'इकाई 1 — आनुवंशिकता और वातावरण',
          },
          {
            id: 'cdp-u1-hi-q3',
            question: 'बच्चे के समाजीकरण में परिवार और विद्यालय क्रमशः किस प्रकार के अभिकरण हैं?',
            options: [
              'द्वितीयक और प्राथमिक अभिकरण',
              'प्राथमिक और द्वितीयक अभिकरण',
              'निष्क्रिय और औपचारिक अभिकरण',
              'असंबंधित संस्थाएँ',
            ],
            correctAnswer: 1,
            explanation:
              'परिवार समाजीकरण का प्राथमिक अभिकरण है जहाँ भाषा व मूल्य प्रारंभ होते हैं, जबकि विद्यालय एवं सहपाठी द्वितीयक अभिकरण हैं।',
            topicReference: 'इकाई 1 — समाजीकरण प्रक्रिया',
          },
        ],
      },
    },
  },
  {
    slug: 'cdp-u2-piaget-kohlberg-vygotsky',
    unitNumber: 2,
    topicNumber: 2,
    subjectId: 'CDP',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_1', 'PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Official Syllabus — Piaget, Kohlberg and Vygotsky: Constructs and Critical Perspectives',
      mahaTet: 'MSCE Pune MAHA TET Official Syllabus — Piaget (Bodhatmak Vikas), Kohlberg (Naitik Vikas) va Vygotsky (Samajik-Sanskrutik Siddhant)',
    },
    content: {
      English: {
        documentTitle: 'Piaget, Kohlberg & Vygotsky: Cognitive, Moral & Socio-Cultural Theories',
        unitTitle: 'Unit 2: Major Developmental Theories',
        topicTitle: 'Piaget, Kohlberg and Vygotsky — Constructs & Critical Perspectives',
        subtopics: [
          'Jean Piaget: Schema, Assimilation, Accommodation, Equilibration & 4 Cognitive Stages',
          'Lev Vygotsky: Socio-Cultural Theory, ZPD, Scaffolding, MKO & Private Speech',
          'Lawrence Kohlberg: 3 Levels & 6 Stages of Moral Development (Heinz Dilemma)',
          'Critical Perspectives (Carol Gilligan’s Ethics of Care, Cultural Variations)',
        ],
        introduction:
          'Jean Piaget, Lev Vygotsky, and Lawrence Kohlberg form the highest-weightage theoretical triad in both CTET and Maharashtra TET. Almost every exam paper features 4 to 7 classroom-based application questions comparing Piaget’s individual discovery with Vygotsky’s social scaffolding and Kohlberg’s moral reasoning stages.',
        meaningAndDefinition:
          'Constructivism views children not as empty vessels passively receiving facts, but as active builders of knowledge. Piaget emphasized cognitive construction through physical interaction with objects, Vygotsky emphasized socio-cultural co-construction through language and guided collaboration, and Kohlberg explained how moral reasoning matures from avoiding punishment to universal ethical principles.',
        detailedExplanation: [
          'Piaget’s Cognitive Development proposes four universal invariant stages: Sensorimotor (0–2 yrs: object permanence), Pre-operational (2–7 yrs: symbolic play, egocentrism, animism, centration, lack of conservation), Concrete Operational (7–11 yrs — primary school: conservation, reversibility, seriation, classification), and Formal Operational (11+ yrs — upper primary/adolescence: abstract, hypothetical-deductive reasoning).',
          'In Piaget’s adaptation mechanism, Assimilation fits new information into an existing schema (calling a zebra a "striped horse"), whereas Accommodation modifies the schema to account for new features (creating a separate schema for zebra).',
          'Vygotsky’s Socio-Cultural Theory highlights that learning precedes and drives development through social interaction. The Zone of Proximal Development (ZPD) is the gap between what a child can do independently and what they can accomplish with timely, temporary guidance (Scaffolding) from a More Knowledgeable Other (MKO — teacher or skilled peer).',
          'Unlike Piaget (who viewed self-talk as egocentric speech), Vygotsky valued Private Speech as an essential cognitive self-regulation tool that later becomes silent inner speech.',
          'Kohlberg’s Moral Development Theory defines three levels (6 stages): Pre-conventional (1: Obedience & Punishment; 2: Instrumental/Tit-for-Tat Exchange), Conventional (3: Good Boy/Nice Girl Approval; 4: Law & Order), and Post-conventional (5: Social Contract & Individual Rights; 6: Universal Ethical Principles).',
        ],
        importantConcepts: [
          'Schema: Mental framework used to organize and interpret experiences.',
          'Conservation & Reversibility: Knowing that liquid poured from a wide glass into a tall glass retains the same quantity (mastered in Concrete Operational stage, 7–11 yrs).',
          'Zone of Proximal Development (ZPD): Optimal instructional zone just beyond independent mastery.',
          'Scaffolding: Temporary, graduated support (hints, prompts, modelling) removed as learner gains independence.',
          'Carol Gilligan’s Critique of Kohlberg: Noted Kohlberg’s all-male sample prioritized an "ethics of justice" while overlooking women’s "ethics of care" and relational empathy.',
        ],
        comparisonTable: {
          caption: 'Piaget vs. Vygotsky — Exam-Critical Comparison',
          headers: ['Aspect', 'Jean Piaget (Cognitive Constructivism)', 'Lev Vygotsky (Social Constructivism)'],
          rows: [
            ['Primary Driver', 'Individual exploration & biological maturation', 'Social interaction, culture & language'],
            ['Language & Thought', 'Thought precedes language; self-talk is egocentric', 'Language drives thought; private speech aids self-regulation'],
            ['Development vs. Learning', 'Development precedes learning (readiness first)', 'Learning in ZPD pulls development forward'],
            ['Stages', '4 fixed universal stages', 'No rigid universal stages; culturally shaped'],
          ],
        },
        importantPrinciples: [
          'Piaget: Match abstract tasks only when learners approach Formal Operations (Paper II); rely on concrete objects in Primary classes (Paper I).',
          'Vygotsky: Use Reciprocal Teaching, peer tutoring, and collaborative dialogue to activate ZPD.',
          'Kohlberg: Present open moral dilemmas in classroom discussions rather than lecturing rigid rules.',
        ],
        keyThinkers: [
          { name: 'Jean Piaget', contribution: 'Cognitive Constructivism, 4 stages of cognitive development, Assimilation & Accommodation.' },
          { name: 'Lev Vygotsky', contribution: 'Socio-Cultural Theory, ZPD, Scaffolding (term popularized by Wood, Bruner & Ross), Private Speech.' },
          { name: 'Lawrence Kohlberg', contribution: '3-level, 6-stage Moral Development Theory using moral dilemmas such as Heinz’s dilemma.' },
          { name: 'Carol Gilligan', contribution: 'Feminist critique of Kohlberg highlighting Ethics of Care alongside Ethics of Justice.' },
        ],
        practicalExamples: [
          'A Class 3 pupil believes 6 spread-out coins are "more" than 6 closely packed coins — this shows lack of number conservation (Piaget’s Pre-operational stage).',
          'A child whispers steps aloud while solving a puzzle ("First put the corner piece...") — Vygotsky calls this Private Speech regulating thinking.',
          'A student returns a lost wallet saying "If I break the school rule, everyone will suffer chaos" — this represents Kohlberg’s Stage 4 (Law and Order orientation).',
        ],
        classroomApplications: [
          'Design inquiry labs and manipulative stations (Piaget) combined with structured peer-assisted learning (Vygotsky).',
          'Give progressive hints rather than directly telling the final answer so learners operate inside their ZPD.',
          'Facilitate value-clarification discussions around real school dilemmas to nurture higher moral reasoning.',
        ],
        teachingMethods: [
          'Discovery Learning & Hands-on Experimentation (Piaget)',
          'Reciprocal Teaching, Peer Collaboration & Guided Scaffolding (Vygotsky)',
          'Moral Dilemma Discussion & Role-Play (Kohlberg)',
        ],
        examSpecificFocus: {
          ctet: 'CTET heavily tests classroom vignettes identifying Assimilation vs. Accommodation, Private Speech vs. Egocentric Speech, ZPD/Scaffolding, and pinpointing the exact Kohlberg stage from a student’s quote.',
          mahaTet: 'MAHA TET frequently asks direct age ranges of Piaget’s 4 stages, exact names of Kohlberg’s 6 stages, and differences between Piaget and Vygotsky on language and thought.',
        },
        importantExamPoints: [
          'Paper I children (6–11 yrs) are primarily in Piaget’s Concrete Operational Stage (logical thinking with tangible objects).',
          'Paper II children (11–14 yrs) transition into Piaget’s Formal Operational Stage (hypothetical-deductive and abstract thinking).',
          'If a teacher gives a partial hint or breaks a hard problem into smaller steps, the answer is ALWAYS Scaffolding (Vygotsky).',
          'Moral reasoning stage in Kohlberg is judged by the REASON behind the choice, NOT whether the person says "steal" or "don’t steal".',
        ],
        commonMistakes: [
          'Marking "Egocentric speech" instead of "Private speech" when the question explicitly mentions Vygotsky.',
          'Confusing Kohlberg’s Stage 3 (seeking approval / "good boy-nice girl") with Stage 4 (upholding fixed laws and social order).',
          'Assuming Assimilation changes the schema — Assimilation ADDS to existing schema; Accommodation MODIFIES/CREATES a schema.',
        ],
        topicSummary:
          'Piaget explained how children actively build mental schemas across four developmental stages, Vygotsky revealed how language, culture, and guided scaffolding in the ZPD accelerate cognition, and Kohlberg traced moral reasoning from external consequences to universal ethical principles.',
        revisionPoints: [
          'Piaget 4 Stages: Sensorimotor (0–2) → Pre-operational (2–7) → Concrete Operational (7–11) → Formal Operational (11+).',
          'Assimilation = Add to existing schema; Accommodation = Modify/create schema.',
          'Vygotsky core triad: Social Interaction + Culture + Language (ZPD, MKO, Scaffolding, Private Speech).',
          'Kohlberg: Pre-conventional (1–2), Conventional (3–4), Post-conventional (5–6).',
          'Carol Gilligan critiqued Kohlberg for gender bias (Ethics of Care).',
        ],
        practiceQuestions: [
          {
            id: 'cdp-u2-en-q1',
            question: 'While solving a multi-step fraction problem, a teacher offers a small diagram hint that enables a Class 6 student to solve the rest independently. According to Vygotsky, what is the teacher providing?',
            options: ['Conditioning', 'Scaffolding', 'Egocentrism', 'Centration'],
            correctAnswer: 1,
            explanation:
              'Offering temporary, adjustable support (such as a hint or diagram) inside the learner’s ZPD until they succeed independently is called Scaffolding.',
            topicReference: 'Unit 2 — Lev Vygotsky (ZPD & Scaffolding)',
          },
          {
            id: 'cdp-u2-en-q2',
            question: 'A 9-year-old understands that flattening a clay ball into a pancake does not change the amount of clay. According to Piaget, which cognitive ability has the child achieved?',
            options: ['Animism', 'Object Permanence', 'Conservation', 'Hypothetical-Deductive Reasoning'],
            correctAnswer: 2,
            explanation:
              'Conservation—recognizing that quantity remains invariant despite changes in shape or appearance—is a hallmark achievement of Piaget’s Concrete Operational Stage (7–11 years).',
            topicReference: 'Unit 2 — Jean Piaget’s Stages',
          },
          {
            id: 'cdp-u2-en-q3',
            question: 'A student avoids copying during a test because "rules must be followed strictly so that society functions fairly." Which stage of Kohlberg’s moral development does this reflect?',
            options: [
              'Punishment and Obedience orientation',
              'Instrumental Purpose orientation',
              'Social Order Maintaining (Law and Order) orientation',
              'Universal Ethical Principle orientation',
            ],
            correctAnswer: 2,
            explanation:
              'Upholding laws and institutional rules to maintain social order corresponds to Stage 4 (Conventional Level — Law and Order orientation).',
            topicReference: 'Unit 2 — Kohlberg’s Moral Development',
          },
        ],
      },
      Marathi: {
        documentTitle: 'पियाजे, कोहलबर्ग आणि वायगोट्स्की: बोधात्मक, नैतिक व सामाजिक-सांस्कृतिक सिद्धांत',
        unitTitle: 'घटक २: बालविकासाचे प्रमुख सिद्धांत',
        topicTitle: 'पियाजे, कोहलबर्ग आणि वायगोट्स्की — संकल्पना व चिकीत्सक दृष्टिकोन',
        subtopics: [
          'जीन पियाजे: स्कीमा, आत्मसातीकरण, समायोजन, समतोल व बोधात्मक विकासाच्या ४ अवस्था',
          'लेव्ह वायगोट्स्की: सामाजिक-सांस्कृतिक सिद्धांत, ZPD, आधारस्तंभ (Scaffolding) व स्व-संवाद',
          'लॉरेन्स कोहलबर्ग: नैतिक विकासाचे ३ स्तर व ६ टप्पे (हेन्झची द्विधा अवस्था)',
          'समीक्षात्मक दृष्टिकोन (कॅरोल गिलिगन यांचा काळजीचा नैतिक सिद्धांत व सांस्कृतिक विविधता)',
        ],
        introduction:
          'जीन पियाजे, लेव्ह वायगोट्स्की आणि लॉरेन्स कोहलबर्ग हे तीन शास्त्रज्ञ CTET आणि महाराष्ट्र TET या दोन्ही परीक्षांतील सर्वाधिक गुणभार असणारे केंद्रबिंदू आहेत. विद्यार्थ्यांच्या विचारप्रक्रियेचे टप्पे, सहकार्यात्मक शिक्षण आणि नैतिक निर्णयक्षमता यांवर आधारित ४ ते ७ प्रश्न प्रत्येक प्रश्नपत्रिकेत हमखास असतात.',
        meaningAndDefinition:
          'ज्ञानरचनावादानुसार (Constructivism) विद्यार्थी निष्क्रिय श्रोता नसून स्वतःच्या ज्ञानाचा सक्रिय निर्माता असतो. पियाजे यांनी प्रत्यक्ष अनुभवातून होणाऱ्या वैयक्तिक बोधात्मक रचनेवर, वायगोट्स्की यांनी भाषा व सामाजिक आंतरक्रियेवर, तर कोहलबर्ग यांनी नैतिक तर्कशक्तीच्या विकासावर प्रकाश टाकला.',
        detailedExplanation: [
          'पियाजे यांच्या बोधात्मक विकासाच्या ४ अवस्था: १) संवेदना-कारक अवस्था (०–२ वर्षे: वस्तूचे स्थायित्व), २) पूर्व-क्रियात्मक अवस्था (२–७ वर्षे: प्रतीकात्मक खेळ, आत्मकेंद्रितता, सजीवत्व, संधारण क्षमतेचा अभाव), ३) मूर्त क्रियात्मक अवस्था (७–११ वर्षे — प्राथमिक स्तर: संधारण, उलटक्रम, वर्गीकरण, क्रमवारी), ४) अमूर्त/औपचारिक क्रियात्मक अवस्था (११+ वर्षे — उच्च प्राथमिक/किशोरावस्था: अमूर्त व परिकल्पनात्मक तर्क).',
          'पियाजे यांच्या अनुकूलनात आत्मसातीकरण (Assimilation) म्हणजे नवीन माहिती जुन्या स्कीमामध्ये सामावून घेणे, तर समायोजन (Accommodation) म्हणजे नवीन अनुभवानुसार जुन्या स्कीमामध्ये बदल करणे किंवा नवा स्कीमा तयार करणे.',
          'वायगोट्स्की यांच्या सामाजिक-सांस्कृतिक सिद्धांतानुसार सामाजिक संवादामुळे अध्ययन घडते आणि अध्ययनामुळे विकासाला गती मिळते. समीपस्थ विकास क्षेत्र (ZPD) म्हणजे मूल स्वतः करू शकणारे कार्य आणि शिक्षक किंवा अधिक जाणकार व्यक्तीच्या (MKO) मदतीने करू शकणारे कार्य यांतील अंतर होय.',
          'आधारस्तंभ / मचान (Scaffolding) म्हणजे विद्यार्थ्याला गरजेपुरते तात्पुरते मार्गदर्शन व संकेत देणे आणि तो स्वावलंबी झाल्यावर मदत कमी करणे. वायगोट्स्की मुलांच्या स्वतःशी बोलण्याला (Private Speech) आत्मकेंद्रित न मानता विचार-नियंत्रणाचे प्रभावी साधन मानतात.',
          'कोहलबर्ग यांचे नैतिक विकासाचे ३ स्तर व ६ टप्पे: पूर्व-पारंपरिक (१: शिक्षा व आज्ञापालन; २: देवाणघेवाण/स्वार्थ), पारंपरिक (३: चांगला मुलगा/मुलगी मान्यता; ४: कायदा व सुव्यवस्था), उत्तर-पारंपरिक (५: सामाजिक करार; ६: सार्वत्रिक नैतिक तत्त्वे).',
        ],
        importantConcepts: [
          'स्कीमा (Schema): अनुभव संघटित करणारी मानसिक चौकट.',
          'संधारण (Conservation): आकार बदलला तरी पदार्थाचे प्रमाण तेच राहते याची समज (७–११ वर्षे).',
          'समीपस्थ विकास क्षेत्र (ZPD): स्वतंत्र कार्यक्षमता आणि सहाय्यित कार्यक्षमता यांतील सुवर्णमध्य.',
          'मचान / आधारस्तंभ (Scaffolding): तात्पुरती, टप्प्याटप्प्याने दिलेली शैक्षणिक मदत.',
          'कॅरोल गिलिगन यांची टीका: कोहलबर्ग यांनी केवळ मुलांवर संशोधन करून न्याय-आधारित नैतिकतेवर भर दिला व मुलींमधील "काळजी व करुणा" (Ethics of Care) दुर्लक्षित केली.',
        ],
        comparisonTable: {
          caption: 'जीन पियाजे आणि लेव्ह वायगोट्स्की यांची तुलना',
          headers: ['मुद्दा', 'जीन पियाजे (बोधात्मक रचनावाद)', 'लेव्ह वायगोट्स्की (सामाजिक रचनावाद)'],
          rows: [
            ['मुख्य आधार', 'वैयक्तिक शोध व जैविक परिपक्वता', 'सामाजिक आंतरक्रिया, संस्कृती व भाषा'],
            ['भाषा व विचार', 'आधी विचार, नंतर भाषा; स्व-संवाद आत्मकेंद्रित', 'भाषा विचाराला दिशा देते; खाजगी संवाद उपयुक्त'],
            ['विकास व अध्ययन', 'विकास आधी, नंतर अध्ययन', 'ZPD मधील अध्ययन विकासाला पुढे नेते'],
            ['टप्पे', '४ निश्चित सार्वत्रिक अवस्था', 'ठरावीक वयोगट टप्पे नाहीत; संस्कृतीनुसार भिन्न'],
          ],
        },
        importantPrinciples: [
          'प्राथमिक स्तरावर (पेपर १) मूर्त वस्तू, चित्रे व प्रत्यक्ष प्रयोगांद्वारे संकल्पना स्पष्ट कराव्यात (पियाजे).',
          'गटकार्य, परस्पर अध्यापन (Reciprocal Teaching) आणि समवयस्क सहकार्याद्वारे ZPD सक्रिय करावे (वायगोट्स्की).',
          'वर्गात नैतिक द्विधा प्रसंगांवर खुली चर्चा घडवून विद्यार्थ्यांची तर्कशक्ती वाढवावी (कोहलबर्ग).',
        ],
        keyThinkers: [
          { name: 'जीन पियाजे', contribution: 'बोधात्मक विकास सिद्धांत, ४ अवस्था, स्कीमा, आत्मसातीकरण व समायोजन.' },
          { name: 'लेव्ह वायगोट्स्की', contribution: 'सामाजिक-सांस्कृतिक सिद्धांत, ZPD, MKO, मचान (Scaffolding) व खाजगी संवाद.' },
          { name: 'लॉरेन्स कोहलबर्ग', contribution: 'नैतिक विकासाचे ३ स्तर व ६ टप्पे (हेन्झची द्विधा अवस्था).' },
          { name: 'कॅरोल गिलिगन', contribution: 'कोहलबर्ग यांच्या सिद्धांतातील लिंगभेदावर टीका व काळजीच्या नैतिकतेचा पुरस्कार.' },
        ],
        practicalExamples: [
          'अपूर्णांकाचे गणित सोडवताना शिक्षकांनी थेट उत्तर न सांगता आकृतीचा छोटा संकेत दिला व विद्यार्थ्याने पुढील गणित स्वतः सोडवले — हे वायगोट्स्की यांच्या मचान (Scaffolding) चे अचूक उदाहरण आहे.',
          'एका विद्यार्थ्याने सांगितले की "नियम पाळले नाहीत तर शाळेत गोंधळ होईल म्हणून मी रांगेत उभा राहतो" — हा कोहलबर्ग यांचा चौथा टप्पा (कायदा व सुव्यवस्था) आहे.',
        ],
        classroomApplications: [
          'कठीण संकल्पना लहान पायऱ्यांत विभागून संकेत द्यावेत व विद्यार्थ्याचा आत्मविश्वास वाढताच मदत काढून घ्यावी.',
          'प्राथमिक वर्गात संधारण व वर्गीकरणाचे कृतियुक्त उपक्रम, तर उच्च प्राथमिक वर्गात अमूर्त प्रकल्प घ्यावेत.',
          'विद्यार्थ्यांना स्वतःशी किंवा गटात बोलून पायऱ्या मांडण्यास प्रोत्साहन द्यावे.',
        ],
        teachingMethods: [
          'शोधपद्धती व प्रत्यक्ष प्रयोग (पियाजे)',
          'सहकार्यात्मक अध्ययन, परस्पर अध्यापन व मचान (वायगोट्स्की)',
          'नैतिक द्विधा चर्चा व भूमिकाभिनय (कोहलबर्ग)',
        ],
        examSpecificFocus: {
          ctet: 'CTET मध्ये वर्गप्रसंग देऊन आत्मसातीकरण विरुद्ध समायोजन, खाजगी संवाद, मचान आणि कोहलबर्ग यांचा नेमका टप्पा ओळखण्याचे प्रश्न हमखास विचारले जातात.',
          mahaTet: 'MAHA TET मध्ये पियाजेच्या ४ अवस्थांचे अचूक वयोगट, त्यांच्यातील प्रमुख वैशिष्ट्ये (वस्तूचे स्थायित्व, संधारण) व कोहलबर्गच्या ६ टप्प्यांची नावे यांवर थेट प्रश्न येतात.',
        },
        importantExamPoints: [
          'पेपर १ चे विद्यार्थी (६–११ वर्षे) पियाजेच्या मूर्त क्रियात्मक अवस्थेत असतात.',
          'पेपर २ चे विद्यार्थी (११–१४ वर्षे) औपचारिक/अमूर्त क्रियात्मक अवस्थेत प्रवेश करतात.',
          'शिक्षकाने तात्पुरता संकेत किंवा अर्धी मदत दिल्यास उत्तर नेहमी "मचान / आधारस्तंभ (Scaffolding)" असते.',
          'कोहलबर्गच्या सिद्धांतात निर्णय काय घेतला यापेक्षा त्यामागील कारण/तर्क कोणते आहे यावरून टप्पा ठरतो.',
        ],
        commonMistakes: [
          'वायगोट्स्कीच्या प्रश्नात "खाजगी संवाद" ऐवजी पियाजेची "आत्मकेंद्रित भाषा" निवडणे.',
          'कोहलबर्गच्या टप्पा ३ (इतरांची पसंती) आणि टप्पा ४ (कायदा व सुव्यवस्था) यांत गोंधळ करणे.',
          'स्कीमा बदलण्याच्या प्रक्रियेला समायोजन ऐवजी आत्मसातीकरण म्हणणे.',
        ],
        topicSummary:
          'पियाजे यांनी बालकांच्या बोधात्मक विकासाच्या चार पायऱ्या स्पष्ट केल्या, वायगोट्स्की यांनी सामाजिक संवाद, भाषा व ZPD मधील मदतीचे महत्त्व अधोरेखित केले, तर कोहलबर्ग यांनी नैतिक तर्कशक्तीचा तीन स्तरीय प्रवास मांडला.',
        revisionPoints: [
          'पियाजे ४ अवस्था: संवेदना-कारक (०–२) → पूर्व-क्रियात्मक (२–७) → मूर्त क्रियात्मक (७–११) → अमूर्त क्रियात्मक (११+).',
          'आत्मसातीकरण = जुन्या स्कीमात भर; समायोजन = स्कीमात सुधारणा/बदल.',
          'वायगोट्स्की: समाज + संस्कृती + भाषा (ZPD, MKO, Scaffolding, Private Speech).',
          'कोहलबर्ग: पूर्व-पारंपरिक (१–२), पारंपरिक (३–४), उत्तर-पारंपरिक (५–६).',
          'कॅरोल गिलिगन यांनी कोहलबर्गवर काळजीच्या नैतिकतेच्या दृष्टीने टीका केली.',
        ],
        practiceQuestions: [
          {
            id: 'cdp-u2-mr-q1',
            question: 'गणिताचे उदाहरण सोडवताना शिक्षक विद्यार्थ्यास थेट उत्तर न देता फक्त पहिली पायरी सुचवतात आणि विद्यार्थी उर्वरित गणित स्वतः पूर्ण करतो. वायगोट्स्कीच्या मते शिक्षकांची ही कृती काय दर्शवते?',
            options: ['अभिसंधान', 'मचान / आधारस्तंभ (Scaffolding)', 'आत्मकेंद्रितता', 'सजीवत्व'],
            correctAnswer: 1,
            explanation:
              'समीपस्थ विकास क्षेत्रात (ZPD) विद्यार्थ्याला आवश्यक तेवढी तात्पुरती मदत व संकेत देण्याला वायगोट्स्की मचान (Scaffolding) म्हणतात.',
            topicReference: 'घटक २ — लेव्ह वायगोट्स्की',
          },
          {
            id: 'cdp-u2-mr-q2',
            question: '९ वर्षांच्या मुलाला समजते की मातीचा गोळा चपटा करून भाकरीसारखा केला तरी मातीचे प्रमाण बदलत नाही. पियाजेच्या मते मुलामध्ये कोणती क्षमता विकसित झाली आहे?',
            options: ['सजीवत्व', 'वस्तूचे स्थायित्व', 'संधारण (Conservation)', 'अमूर्त परिकल्पना'],
            correctAnswer: 2,
            explanation:
              'वस्तूचा आकार बदलला तरी तिचे प्रमाण स्थिर राहते हे समजणे म्हणजे संधारण (Conservation), जी मूर्त क्रियात्मक अवस्थेची (७–११ वर्षे) प्रमुख खूण आहे.',
            topicReference: 'घटक २ — जीन पियाजे यांच्या अवस्था',
          },
          {
            id: 'cdp-u2-mr-q3',
            question: '"समाज सुरळीत चालण्यासाठी सर्वांनी नियम व कायदे पाळले पाहिजेत" असा विचार करणारा विद्यार्थी कोहलबर्गच्या नैतिक विकासाच्या कोणत्या टप्प्यावर आहे?',
            options: [
              'शिक्षा व आज्ञापालन',
              'वैयक्तिक देवाणघेवाण',
              'कायदा व सुव्यवस्था (सामाजिक व्यवस्था राखणे)',
              'सार्वत्रिक नैतिक तत्त्वे',
            ],
            correctAnswer: 2,
            explanation:
              'नियम व कायदे काटेकोरपणे पाळून सामाजिक व्यवस्था टिकवणे हा पारंपरिक स्तरातील चौथा टप्पा (कायदा व सुव्यवस्था) दर्शवतो.',
            topicReference: 'घटक २ — कोहलबर्ग यांचा नैतिक विकास सिद्धांत',
          },
        ],
      },
      Hindi: {
        documentTitle: 'पियाजे, कोहलबर्ग और वायगोत्स्की: संज्ञानात्मक, नैतिक व सामाजिक-सांस्कृतिक सिद्धांत',
        unitTitle: 'इकाई 2: प्रमुख विकासात्मक सिद्धांत',
        topicTitle: 'पियाजे, कोहलबर्ग और वायगोत्स्की — अवधारणाएँ एवं आलोचनात्मक दृष्टिकोण',
        subtopics: [
          'जीन पियाजे: स्कीमा, आत्मसातीकरण, समायोजन, संतुलन एवं संज्ञानात्मक विकास की 4 अवस्थाएँ',
          'लेव वायगोत्स्की: सामाजिक-सांस्कृतिक सिद्धांत, ZPD, पाड़ (Scaffolding), MKO तथा निजी वाक्',
          'लॉरेंस कोहलबर्ग: नैतिक विकास के 3 स्तर व 6 चरण (हिंज की दुविधा)',
          'आलोचनात्मक दृष्टिकोण (कैरोल गिलिगन का देखभाल का नैतिक सिद्धांत एवं सांस्कृतिक विविधता)',
        ],
        introduction:
          'जीन पियाजे, लेव वायगोत्स्की और लॉरेंस कोहलबर्ग—ये तीनों मनोवैज्ञानिक CTET और MAHA TET की परीक्षाओं में सर्वाधिक अंकभार रखते हैं। प्रत्येक प्रश्नपत्र में लगभग 4 से 7 प्रश्न इन सिद्धांतों के कक्षा-कक्ष अनुप्रयोग पर आधारित होते हैं।',
        meaningAndDefinition:
          'रचनावाद (Constructivism) के अनुसार बच्चा ज्ञान का निष्क्रिय ग्राहक नहीं बल्कि सक्रिय निर्माता है। पियाजे ने वस्तुओं के साथ व्यक्तिगत अंतःक्रिया से ज्ञान निर्माण, वायगोत्स्की ने समाज-संस्कृति व भाषा द्वारा सह-निर्माण, तथा कोहलबर्ग ने नैतिक तर्कणा के क्रमिक विकास को स्पष्ट किया।',
        detailedExplanation: [
          'पियाजे के संज्ञानात्मक विकास की 4 अवस्थाएँ: 1) संवेदी-पेशीय (0–2 वर्ष: वस्तु स्थायित्व), 2) पूर्व-संक्रियात्मक (2–7 वर्ष: प्रतीकात्मक खेल, अहंकेंद्रिता, जीववाद, संरक्षण का अभाव), 3) मूर्त संक्रियात्मक (7–11 वर्ष — प्राथमिक स्तर: संरक्षण, पलटावी गुण, वर्गीकरण, क्रमबद्धता), 4) औपचारिक संक्रियात्मक (11+ वर्ष — उच्च प्राथमिक/किशोरावस्था: अमूर्त एवं परिकल्पनात्मक-निगमनात्मक चिंतन)।',
          'पियाजे के अनुकूलन में आत्मसातीकरण (Assimilation) का अर्थ नई जानकारी को वर्तमान स्कीमा में जोड़ना है, जबकि समायोजन (Accommodation) का अर्थ नए अनुभव के अनुसार पुराने स्कीमा में संशोधन करना या नया स्कीमा बनाना है।',
          'वायगोत्स्की के सामाजिक-सांस्कृतिक सिद्धांत के अनुसार सामाजिक अंतःक्रिया और भाषा अधिगम को जन्म देती है तथा अधिगम विकास को आगे ले जाता है। समीपस्थ विकास क्षेत्र (ZPD) वह अंतर है जो बच्चा स्वयं कर सकता है और जो वह अधिक जानकार व्यक्ति (MKO) के मार्गदर्शन से कर सकता है।',
          'पाड़/ढाँचा (Scaffolding) अस्थायी सहायता (संकेत, उदाहरण, चरण विभाजन) है जिसे बच्चे के आत्मनिर्भर होने पर धीरे-धीरे हटा लिया जाता है। वायगोत्स्की बच्चों के स्वयं से बात करने को (निजी वाक् / Private Speech) संज्ञानात्मक स्व-नियमन का उपयोगी उपकरण मानते हैं।',
          'कोहलबर्ग के नैतिक विकास के 3 स्तर (6 चरण): पूर्व-पारंपरिक (1: दंड एवं आज्ञापालन; 2: यांत्रिक/अदला-बदली), पारंपरिक (3: अच्छा लड़का/अच्छी लड़की अभिविन्यास; 4: कानून एवं व्यवस्था), उत्तर-पारंपरिक (5: सामाजिक अनुबंध; 6: सार्वभौमिक नैतिक सिद्धांत)।',
        ],
        importantConcepts: [
          'स्कीमा (Schema): अनुभवों को व्यवस्थित करने वाली मानसिक संरचना।',
          'संरक्षण (Conservation): रूप या आकार बदलने पर भी मात्रा समान रहने की समझ (7–11 वर्ष)।',
          'समीपस्थ विकास क्षेत्र (ZPD): स्वतंत्र प्रदर्शन और सहायता-प्राप्त संभावित प्रदर्शन के बीच का क्षेत्र।',
          'पाड़ (Scaffolding): आवश्यकता के अनुसार दिया जाने वाला अस्थायी शिक्षण सहारा।',
          'कैरोल गिलिगन की आलोचना: कोहलबर्ग ने केवल पुरुषों पर अध्ययन कर न्याय-आधारित नैतिकता को महत्व दिया और महिलाओं के देखभाल-आधारित दृष्टिकोण (Ethics of Care) की उपेक्षा की।',
        ],
        comparisonTable: {
          caption: 'पियाजे बनाम वायगोत्स्की — परीक्षा हेतु महत्वपूर्ण तुलना',
          headers: ['पक्ष', 'जीन पियाजे (संज्ञानात्मक रचनावाद)', 'लेव वायगोत्स्की (सामाजिक रचनावाद)'],
          rows: [
            ['मुख्य आधार', 'व्यक्तिगत खोज एवं जैविक परिपक्वता', 'सामाजिक अंतःक्रिया, संस्कृति एवं भाषा'],
            ['भाषा व विचार', 'विचार पहले, भाषा बाद में; स्व-वार्ता अहंकेंद्रित', 'भाषा विचार को दिशा देती है; निजी वाक् स्व-नियमन है'],
            ['विकास व अधिगम', 'विकास पहले, अधिगम बाद में', 'ZPD में अधिगम विकास को आगे बढ़ाता है'],
            ['अवस्थाएँ', '4 निश्चित सार्वभौमिक अवस्थाएँ', 'कठोर सार्वभौमिक अवस्थाएँ नहीं; सांस्कृतिक प्रभाव प्रमुख'],
          ],
        },
        importantPrinciples: [
          'प्राथमिक कक्षाओं (पेपर 1) में मूर्त सामग्री से सिखाएँ और उच्च प्राथमिक (पेपर 2) में अमूर्त तर्क विकसित करें (पियाजे)।',
          'सहयोगात्मक अधिगम, सहपाठी शिक्षण और पारस्परिक शिक्षण (Reciprocal Teaching) से ZPD सक्रिय करें (वायगोत्स्की)।',
          'कक्षा में नैतिक दुविधाओं पर खुली परिचर्चा कराकर स्वतंत्र नैतिक चिंतन बढ़ाएँ (कोहलबर्ग)।',
        ],
        keyThinkers: [
          { name: 'जीन पियाजे', contribution: 'संज्ञानात्मक विकास की 4 अवस्थाएँ, स्कीमा, आत्मसातीकरण व समायोजन।' },
          { name: 'लेव वायगोत्स्की', contribution: 'सामाजिक-सांस्कृतिक सिद्धांत, ZPD, MKO, पाड़ (Scaffolding) और निजी वाक्।' },
          { name: 'लॉरेंस कोहलबर्ग', contribution: 'नैतिक विकास के 3 स्तर व 6 चरण (हिंज की दुविधा पर आधारित)।' },
          { name: 'कैरोल गिलिगन', contribution: 'कोहलबर्ग की लिंग-पक्षपात के लिए आलोचना तथा देखभाल की नैतिकता का सिद्धांत।' },
        ],
        practicalExamples: [
          'भिन्न का प्रश्न हल करते समय शिक्षक केवल एक छोटा चित्र संकेत देते हैं जिससे छात्र शेष हल स्वयं निकाल लेता है—यह वायगोत्स्की का पाड़ (Scaffolding) है।',
          'पहेली जोड़ते समय बच्चा धीमे स्वर में स्वयं को निर्देश देता है ("पहले कोने वाला टुकड़ा लगाना है")—वायगोत्स्की इसे निजी वाक् कहते हैं।',
        ],
        classroomApplications: [
          'कठिन कार्य को छोटे चरणों में बाँटकर संकेत दें और विद्यार्थी के सक्षम होते ही सहायता कम करें।',
          'प्राथमिक स्तर पर संरक्षण व वर्गीकरण के प्रयोग और उच्च प्राथमिक स्तर पर परिकल्पना परीक्षण कराएँ।',
          'बच्चों को आपस में संवाद करके समस्या सुलझाने के पर्याप्त अवसर दें।',
        ],
        teachingMethods: [
          'खोज विधि एवं हस्तगतिविधि आधारित प्रयोग (पियाजे)',
          'पारस्परिक शिक्षण, सहपाठी सहयोग एवं पाड़ (वायगोत्स्की)',
          'नैतिक दुविधा परिचर्चा एवं भूमिका निर्वाह (कोहलबर्ग)',
        ],
        examSpecificFocus: {
          ctet: 'CTET में कक्षा-स्थितियों के आधार पर आत्मसातीकरण बनाम समायोजन, निजी वाक्, पाड़ और कोहलबर्ग के सटीक चरण पहचानने वाले प्रश्न अत्यंत महत्वपूर्ण हैं।',
          mahaTet: 'MAHA TET में पियाजे की चारों अवस्थाओं की आयु सीमा, प्रमुख संज्ञानात्मक गुण तथा कोहलबर्ग के छह चरणों के नामों से सीधे प्रश्न पूछे जाते हैं।',
        },
        importantExamPoints: [
          'पेपर 1 (6–11 वर्ष) के बच्चे पियाजे की मूर्त संक्रियात्मक अवस्था में होते हैं।',
          'पेपर 2 (11–14 वर्ष) के बच्चे औपचारिक संक्रियात्मक अवस्था में प्रवेश करते हैं।',
          'अस्थायी संकेत या मदद देने पर सही उत्तर सदैव "पाड़ (Scaffolding)" होता है।',
          'कोहलबर्ग का चरण निर्णय के पीछे दिए गए तर्क से तय होता है, न कि केवल हाँ या ना से।',
        ],
        commonMistakes: [
          'वायगोत्स्की के संदर्भ में "निजी वाक्" के स्थान पर "अहंकेंद्रित वाक्" चुनना।',
          'कोहलबर्ग के चरण 3 (प्रशंसा/स्वीकृति) और चरण 4 (कानून एवं व्यवस्था) में भ्रमित होना।',
          'स्कीमा में बदलाव को समायोजन के बजाय आत्मसातीकरण समझ लेना।',
        ],
        topicSummary:
          'पियाजे ने चार अवस्थाओं में संज्ञानात्मक निर्माण को, वायगोत्स्की ने समाज-संस्कृति, भाषा और ZPD में पाड़ की भूमिका को, तथा कोहलबर्ग ने नैतिक तर्कणा के तीन स्तरों को स्पष्ट किया।',
        revisionPoints: [
          'पियाजे 4 अवस्थाएँ: संवेदी-पेशीय (0–2) → पूर्व-संक्रियात्मक (2–7) → मूर्त (7–11) → औपचारिक (11+)।',
          'आत्मसातीकरण = पुराने स्कीमा में जोड़ना; समायोजन = स्कीमा में बदलाव।',
          'वायगोत्स्की: समाज + संस्कृति + भाषा (ZPD, MKO, पाड़, निजी वाक्)।',
          'कोहलबर्ग: पूर्व-पारंपरिक (1–2), पारंपरिक (3–4), उत्तर-पारंपरिक (5–6)।',
          'कैरोल गिलिगन ने देखभाल की नैतिकता (Ethics of Care) प्रस्तुत की।',
        ],
        practiceQuestions: [
          {
            id: 'cdp-u2-hi-q1',
            question: 'एक शिक्षक कठिन प्रश्न हल करते समय छात्र को सीधा उत्तर न देकर एक छोटा संकेत देता है, जिससे छात्र प्रश्न स्वयं हल कर लेता है। वायगोत्स्की के अनुसार यह क्या है?',
            options: ['अनुबंधन', 'पाड़ (Scaffolding)', 'अहंकेंद्रिता', 'जीववाद'],
            correctAnswer: 1,
            explanation:
              'समीपस्थ विकास क्षेत्र (ZPD) में विद्यार्थी को अस्थायी संकेत या मार्गदर्शन देना पाड़ (Scaffolding) कहलाता है।',
            topicReference: 'इकाई 2 — लेव वायगोत्स्की',
          },
          {
            id: 'cdp-u2-hi-q2',
            question: '9 वर्ष का बच्चा समझता है कि मिट्टी की गेंद को चपटा करने पर भी मिट्टी की मात्रा उतनी ही रहती है। पियाजे के अनुसार उसने कौन-सी क्षमता प्राप्त की है?',
            options: ['जीववाद', 'वस्तु स्थायित्व', 'संरक्षण (Conservation)', 'परिकल्पनात्मक तर्क'],
            correctAnswer: 2,
            explanation:
              'आकार बदलने के बावजूद मात्रा स्थिर रहने की समझ को संरक्षण (Conservation) कहते हैं, जो मूर्त संक्रियात्मक अवस्था (7–11 वर्ष) में विकसित होती है।',
            topicReference: 'इकाई 2 — जीन पियाजे की अवस्थाएँ',
          },
          {
            id: 'cdp-u2-hi-q3',
            question: '"समाज को व्यवस्थित रखने के लिए नियमों और कानूनों का पालन करना आवश्यक है"—यह तर्क कोहलबर्ग के किस चरण को दर्शाता है?',
            options: [
              'दंड एवं आज्ञापालन',
              'यांत्रिक उद्देश्य अभिविन्यास',
              'कानून एवं सामाजिक व्यवस्था बनाए रखना',
              'सार्वभौमिक नैतिक सिद्धांत',
            ],
            correctAnswer: 2,
            explanation:
              'सामाजिक व्यवस्था बनाए रखने हेतु नियमों व कानूनों का सम्मान करना पारंपरिक स्तर के चौथे चरण (कानून एवं व्यवस्था) की पहचान है।',
            topicReference: 'इकाई 2 — कोहलबर्ग का नैतिक विकास सिद्धांत',
          },
        ],
      },
    },
  },
  {
    slug: 'cdp-u3-progressive-intelligence-language-gender',
    unitNumber: 3,
    topicNumber: 3,
    subjectId: 'CDP',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_1', 'PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Official Syllabus — Child-Centered & Progressive Education, Multi-Dimensional Intelligence, Language & Thought, Gender as a Social Construct',
      mahaTet: 'MSCE Pune MAHA TET Official Syllabus — Balkendrit Shikshan, Buddhi Siddhant (Gardner), Bhasha-Vichar va Lingbhav Samajik Rachana',
    },
    content: {
      English: {
        documentTitle: 'Child-Centered Education, Multiple Intelligences, Language-Thought & Gender',
        unitTitle: 'Unit 3: Progressive Education, Intelligence & Gender',
        topicTitle: 'Progressive Education, Intelligence Theories, Language-Thought & Gender Equity',
        subtopics: [
          'Child-Centered & Progressive Education (John Dewey, Montessori, Rabindranath Tagore)',
          'Construct of Intelligence & Howard Gardner’s Theory of Multiple Intelligences',
          'Language and Thought (Piaget vs. Vygotsky; Linguistic Relativity)',
          'Gender as a Social Construct, Gender Stereotypes, Gender Bias & Equitable Classroom Practice',
        ],
        introduction:
          'Modern Indian pedagogy—rooted in NCF 2005 and NEP 2020—shifts the classroom from teacher-dominated lecturing to child-centered inquiry, honors diverse forms of intelligence beyond rote memory, and actively dismantles gender stereotypes.',
        meaningAndDefinition:
          'Child-centered progressive education places the learner’s curiosity, experience, and democratic participation at the center of schooling. Howard Gardner defined intelligence not as a single fixed IQ number, but as a multi-dimensional set of 8 distinct bio-psychological potentials. Gender refers to socially constructed roles and expectations (unlike biological sex).',
        detailedExplanation: [
          'John Dewey championed Progressive Education ("Learning by Doing"), viewing school as a miniature democratic society where problem-solving, collaboration, and reflection replace mechanical drills.',
          'Traditional unidimensional IQ tests (Binet-Simon, Terman’s formula IQ = MA/CA × 100) measure mainly linguistic and logical skills. Howard Gardner expanded this into 8 Multiple Intelligences: Linguistic, Logical-Mathematical, Spatial, Bodily-Kinesthetic, Musical, Interpersonal, Intrapersonal, and Naturalistic.',
          'Spearman proposed Two-Factor Theory (General factor "g" + Specific factor "s"); Sternberg proposed Triarchic Theory (Analytical, Creative, Practical intelligence).',
          'On Language and Thought: Piaget argued cognitive thought emerges first and shapes language; Vygotsky argued thought and language develop independently until around age 2–3 and then merge into verbal thought.',
          'Biological "Sex" refers to physiological differences, whereas "Gender" is a social construct shaped by family, textbooks, and culture. Gender stereotyping (e.g., "boys are naturally better at maths, girls at drawing") limits learner potential; teachers must promote gender-fair examples, equal participation, and stereotype-free leadership roles.',
        ],
        importantConcepts: [
          'IQ Formula (William Stern / Terman): IQ = (Mental Age ÷ Chronological Age) × 100.',
          'Interpersonal vs. Intrapersonal Intelligence: Interpersonal = understanding others’ feelings/motives; Intrapersonal = deep self-awareness of one’s own emotions and goals.',
          'Sex vs. Gender: Sex is biological; Gender is a social construct.',
          'Gender Stereotype vs. Gender Equity: Stereotype = rigid generalized belief; Equity = fair opportunities dismantling bias.',
        ],
        comparisonTable: {
          caption: 'Howard Gardner’s 8 Multiple Intelligences & Classroom Strengths',
          headers: ['Intelligence Type', 'Core Strength', 'Example Careers / Activities'],
          rows: [
            ['Linguistic', 'Sensitivity to words, reading, expression', 'Poets, journalists, debates, storytelling'],
            ['Logical-Mathematical', 'Patterns, deductive reasoning, numbers', 'Scientists, mathematicians, coding, puzzles'],
            ['Spatial', 'Visualizing 3D space, maps, mental imagery', 'Architects, pilots, geometry models, drawing'],
            ['Bodily-Kinesthetic', 'Body coordination & tactile precision', 'Athletes, dancers, surgeons, lab models'],
            ['Musical', 'Rhythm, pitch, melody appreciation', 'Composers, singers, rhythmic mnemonics'],
            ['Interpersonal', 'Reading others’ moods & leading teams', 'Teachers, counsellors, group leaders'],
            ['Intrapersonal', 'Self-reflection & emotional awareness', 'Philosophers, reflective journaling'],
            ['Naturalistic', 'Classifying flora, fauna & ecosystems', 'Botanists, farmers, nature field walks'],
          ],
        },
        importantPrinciples: [
          'Every learner possesses a unique profile of intelligences; teach key concepts through multiple entry points (visual, verbal, hands-on, musical).',
          'Never label students permanently as "bright" or "dull" based on a single paper-pencil IQ score.',
          'Actively challenge gender-biased textbook images and assign classroom tasks equally across all genders.',
        ],
        keyThinkers: [
          { name: 'John Dewey', contribution: 'Father of Progressive Education; Learning by Doing; Lab School; Democratic classroom.' },
          { name: 'Howard Gardner', contribution: 'Theory of Multiple Intelligences (8 independent intelligences).' },
          { name: 'Maria Montessori & Rabindranath Tagore', contribution: 'Self-directed sensory learning (Montessori) and joyful harmony with nature (Shantiniketan — Tagore).' },
          { name: 'Robert Sternberg', contribution: 'Triarchic Theory of Intelligence (Analytical, Creative, Practical).' },
        ],
        practicalExamples: [
          'In a textbook showing only women cooking and only men flying airplanes, a teacher invites students to discuss female pilots and male chefs—directly countering gender stereotyping.',
          'A student who struggles with essays excels at building working science models and navigating maps—demonstrating high Spatial and Bodily-Kinesthetic intelligence.',
        ],
        classroomApplications: [
          'Provide flexible seating, learning corners, and project choices in a progressive classroom.',
          'Ensure equal questioning wait-time and leadership opportunities (monitor, sports captain, science lab lead) for girls and boys alike.',
        ],
        teachingMethods: [
          'Project Method (Kilpatrick/Dewey), Learning by Doing & Multi-Sensory Instruction',
          'Differentiated tasks engaging Gardner’s multiple intelligences',
          'Critical media & textbook discussion to challenge gender bias',
        ],
        examSpecificFocus: {
          ctet: 'CTET almost always asks 1–2 questions directly on Gardner’s Multiple Intelligences (especially Interpersonal vs. Intrapersonal) and 1–2 questions on Gender as a Social Construct.',
          mahaTet: 'MAHA TET tests IQ calculation problems (MA/CA × 100), Spearman’s Two-Factor Theory, Guilford’s Structure of Intellect, and Dewey’s Progressive Education principles.',
        },
        importantExamPoints: [
          'Gender is ALWAYS a "Social Construct" (NOT a biological entity).',
          'Interpersonal = Other people; Intrapersonal = Within oneself ("Intra" = inside).',
          'In a progressive classroom, the teacher acts as a Facilitator and Guide, never an authoritarian dictator.',
          'IQ = (MA / CA) × 100: If Mental Age = 12 and Chronological Age = 10, IQ = 120.',
        ],
        commonMistakes: [
          'Confusing Interpersonal (understanding others) with Intrapersonal (understanding self).',
          'Selecting "Gender is a biological determinant" instead of "Gender is a social construct".',
          'Confusing Progressive Education with complete chaos/no structure—it has purposeful, guided democratic structure.',
        ],
        topicSummary:
          'Progressive education centers learning on active inquiry, Gardner’s Multiple Intelligences affirms diverse human talents beyond a single IQ score, and gender-responsive teaching dismantles social stereotypes to create equitable classrooms.',
        revisionPoints: [
          'Progressive Education = John Dewey (Learning by Doing, active child, facilitator teacher).',
          'Gardner = 8 Multiple Intelligences; Sternberg = 3 (Analytical, Creative, Practical); Spearman = g + s.',
          'IQ = (MA / CA) × 100.',
          'Sex = Biological; Gender = Social Construct.',
          'Avoid gender stereotyping in examples, seating, sports, and classroom responsibilities.',
        ],
        practiceQuestions: [
          {
            id: 'cdp-u3-en-q1',
            question: 'A counsellor accurately senses the unspoken anxiety of her students and responds empathetically. According to Howard Gardner, which intelligence is strongest in her?',
            options: ['Intrapersonal intelligence', 'Interpersonal intelligence', 'Spatial intelligence', 'Naturalistic intelligence'],
            correctAnswer: 1,
            explanation:
              'Interpersonal intelligence is the capacity to perceive and respond effectively to the moods, intentions, and feelings of other people.',
            topicReference: 'Unit 3 — Gardner’s Multiple Intelligences',
          },
          {
            id: 'cdp-u3-en-q2',
            question: 'Which statement best reflects the concept of Gender in educational psychology?',
            options: [
              'Gender is an unchangeable biological trait fixed at birth.',
              'Gender is a social construct shaped by cultural roles and expectations.',
              'Gender determines mathematical ability automatically.',
              'Gender roles are identical across every culture and historical period.',
            ],
            correctAnswer: 1,
            explanation:
              'Biological sex is physiological, whereas gender is socially constructed and varies across societies and eras.',
            topicReference: 'Unit 3 — Gender as a Social Construct',
          },
          {
            id: 'cdp-u3-en-q3',
            question: 'If a 10-year-old student demonstrates a Mental Age of 12 years on a standardized intelligence test, what is the student’s IQ?',
            options: ['83', '100', '120', '132'],
            correctAnswer: 2,
            explanation:
              'Using the formula IQ = (Mental Age / Chronological Age) × 100 = (12 / 10) × 100 = 120.',
            topicReference: 'Unit 3 — Construct of Intelligence',
          },
        ],
      },
      Marathi: {
        documentTitle: 'बालकेंद्रित व प्रगतशील शिक्षण, बहुविध बुद्धिमत्ता, भाषा-विचार आणि लिंगभाव',
        unitTitle: 'घटक ३: प्रगतशील शिक्षण, बुद्धिमत्ता व लिंगभाव समानता',
        topicTitle: 'बालकेंद्रित शिक्षण, गार्डनरची बहुविध बुद्धिमत्ता व लिंगभाव सामाजिक रचना',
        subtopics: [
          'बालकेंद्रित व प्रगतशील शिक्षण (जॉन ड्युई, मारिया माँटेसरी, रवींद्रनाथ टागोर)',
          'बुद्धिमत्तेची संकल्पना, बुद्ध्यांक सूत्र व हॉवर्ड गार्डनरचा बहुविध बुद्धिमत्ता सिद्धांत',
          'भाषा व विचार यांचा संबंध (पियाजे विरुद्ध वायगोट्स्की)',
          'लिंगभाव (Gender) ही सामाजिक रचना, लिंगाधारित पूर्वग्रह व समतावादी वर्गव्यवहार',
        ],
        introduction:
          'आधुनिक शिक्षणप्रणाली (NCF 2005 व NEP 2020) ही शिक्षककेंद्रित न राहता बालकेंद्रित, कृतियुक्त व बहुविध प्रतिभांना वाव देणारी आहे. CTET व महाराष्ट्र TET मध्ये गार्डनरची बहुविध बुद्धिमत्ता, बुद्ध्यांक गणित आणि लिंगभाव समानता यांवर नियमित प्रश्न येतात.',
        meaningAndDefinition:
          'बालकेंद्रित प्रगतशील शिक्षण म्हणजे विद्यार्थ्याची आवड, कुतूहल, अनुभव व लोकशाही सहभाग केंद्रस्थानी ठेवून केलेले अध्यापन. हॉवर्ड गार्डनर यांच्या मते बुद्धिमत्ता ही एकाच अंकात मोजता येणारी क्षमता नसून ती ८ स्वतंत्र प्रकारच्या प्रतिभांचा समूह आहे. लिंगभाव (Gender) म्हणजे समाजाने स्त्री-पुरुषांसाठी ठरवलेल्या भूमिका व अपेक्षा होत.',
        detailedExplanation: [
          'जॉन ड्युई यांनी प्रगतशील शिक्षणात "कृतीतून शिक्षण" (Learning by Doing) मांडले. त्यांच्या मते शाळा ही समाजाची लघू प्रतिकृती असून त्यात संवाद, प्रकल्प व समस्या-निराकरण यांना प्राधान्य असावे.',
          'पारंपरिक बुद्ध्यांक सूत्र (स्टर्न व टर्मन): बुद्ध्यांक (IQ) = (मानसिक वय ÷ कालिक वय) × १००. स्पीअरमन यांनी द्विघटक सिद्धांत (सामान्य "g" व विशिष्ट "s" घटक), तर स्टर्नबर्ग यांनी त्रिसूत्री सिद्धांत (विश्लेषणात्मक, सर्जनशील व व्यावहारिक बुद्धिमत्ता) मांडला.',
          'हॉवर्ड गार्डनर यांनी ८ बहुविध बुद्धिमत्ता मांडल्या: भाषिक, तार्किक-गणितीय, अवकाशीय (Spatial), शारीरिक-गतीज, संगीतमय, आंतरवैयक्तिक (इतरांना समजून घेणे), अंतर्वैयक्तिक (स्वतःला ओळखणे) आणि निसर्गवादी.',
          'भाषा व विचार: पियाजे यांच्या मते विचार आधी येतो व भाषा नंतर विकसित होते; वायगोट्स्की यांच्या मते सुरुवातीला भाषा व विचार स्वतंत्र असतात व २–३ वर्षांनंतर एकत्र येऊन विचारप्रक्रियेला बळ देतात.',
          'जैविक लिंग (Sex) हे शारीरिक वैशिष्ट्य आहे, तर लिंगभाव (Gender) ही सामाजिक रचना आहे. "मुले गणितात हुशार व मुली चित्रकलेत चांगल्या" असे पूर्वग्रह (Gender Stereotypes) विद्यार्थ्यांच्या प्रगतीस अडथळा आणतात; शिक्षकाने वर्गात समतावादी उदाहरणे व समान जबाबदाऱ्या द्याव्यात.',
        ],
        importantConcepts: [
          'बुद्ध्यांक सूत्र: IQ = (मानसिक वय / शारीरिक वय) × १००.',
          'आंतरवैयक्तिक (Interpersonal) विरुद्ध अंतर्वैयक्तिक (Intrapersonal): आंतरवैयक्तिक = इतरांच्या भावना समजणे; अंतर्वैयक्तिक = स्वतःच्या भावना व उद्दिष्टांची जाण.',
          'जैविक लिंग (Sex) = नैसर्गिक; लिंगभाव (Gender) = सामाजिक रचना.',
          'प्रगतशील वर्गात शिक्षकाची भूमिका = सुलभक (Facilitator) व मार्गदर्शक.',
        ],
        comparisonTable: {
          caption: 'हॉवर्ड गार्डनर यांच्या ८ बहुविध बुद्धिमत्ता',
          headers: ['बुद्धिमत्ता प्रकार', 'प्रमुख वैशिष्ट्य', 'उदाहरणे / उपक्रम'],
          rows: [
            ['भाषिक', 'शब्दांवर प्रभुत्व, वाचन, लेखन, वक्तृत्व', 'कवी, पत्रकार, वादविवाद, कथाकथन'],
            ['तार्किक-गणितीय', 'तर्क, संख्या, आकृतीबंध व विश्लेषण', 'शास्त्रज्ञ, गणिती, कोडी सोडवणे'],
            ['अवकाशीय (Spatial)', 'दिशा, नकाशे, त्रिमितीय कल्पनाशक्ती', 'वास्तुविशारद, वैमानिक, चित्रकला'],
            ['शारीरिक-गतीज', 'शरीर व हातांचे अचूक नियंत्रण', 'खेळाडू, नर्तक, शल्यचिकित्सक, मॉडेल'],
            ['संगीतमय', 'सूर, ताल, लय यांची संवेदनशीलता', 'गायक, संगीतकार, लयबद्ध कविता'],
            ['आंतरवैयक्तिक', 'इतरांच्या भावना व वर्तन समजून घेणे', 'शिक्षक, समुपदेशक, नेतृत्व'],
            ['अंतर्वैयक्तिक', 'स्वतःचे चिंतन व भावनिक जाणीव', 'तत्त्वज्ञ, स्व-परीक्षण डायरी'],
            ['निसर्गवादी', 'वनस्पती, प्राणी व पर्यावरणाचे वर्गीकरण', 'शेतकरी, वनस्पतिशास्त्रज्ञ, क्षेत्रभेट'],
          ],
        },
        importantPrinciples: [
          'प्रत्येक विद्यार्थ्यात वेगळ्या प्रकारची बुद्धिमत्ता असते; एकाच परीक्षा-गुणावरून लेबल लावू नये.',
          'अध्यापनात चित्र, प्रयोग, संगीत, गटचर्चा अशा बहुविध माध्यमांचा वापर करावा.',
          'पाठ्यपुस्तक व वर्गव्यवहारात लिंगभेदरहित समान संधी निर्माण कराव्यात.',
        ],
        keyThinkers: [
          { name: 'जॉन ड्युई', contribution: 'प्रगतशील शिक्षणाचे जनक; कृतीतून शिक्षण व लोकशाही वर्गव्यवस्था.' },
          { name: 'हॉवर्ड गार्डनर', contribution: 'बहुविध बुद्धिमत्तेचा सिद्धांत (८ स्वतंत्र बुद्धिमत्ता).' },
          { name: 'स्पीअरमन व स्टर्नबर्ग', contribution: 'द्विघटक सिद्धांत (g व s) आणि त्रिसूत्री बुद्धिमत्ता सिद्धांत.' },
          { name: 'मारिया माँटेसरी व टागोर', contribution: 'इंद्रिय-आधारित स्वयं-अध्ययन (माँटेसरी) व निसर्गसान्निध्यात आनंददायी शिक्षण (शांतीनिकेतन).' },
        ],
        practicalExamples: [
          'पुस्तकात फक्त स्त्रिया स्वयंपाक करताना व पुरुष कार्यालयात दाखवले असतील, तर शिक्षकाने महिला वैमानिक व पुरुष आचारी यांची उदाहरणे देऊन लिंगाधारित पूर्वग्रहांवर चर्चा घडवावी.',
          'निबंधात मागे असणारा विद्यार्थी विज्ञानाची उत्कृष्ट प्रतिकृती तयार करतो — ही त्याची अवकाशीय व शारीरिक-गतीज बुद्धिमत्ता होय.',
        ],
        classroomApplications: [
          'वर्गात मुले व मुली दोघांनाही वर्गप्रतिनिधी, प्रयोगशाळा सहाय्यक व क्रीडा नेतृत्वाची समान संधी द्यावी.',
          'प्रकल्प पद्धती व कृतियुक्त कोपरे (Learning Corners) तयार करून स्वयं-अध्ययनास चालना द्यावी.',
        ],
        teachingMethods: [
          'प्रकल्प पद्धती व कृतीतून शिक्षण (ड्युई)',
          'बहुविध बुद्धिमत्ता आधारित वैविध्यपूर्ण उपक्रम',
          'लिंगसमता संवाद व चिकित्सक चर्चा',
        ],
        examSpecificFocus: {
          ctet: 'CTET मध्ये गार्डनरच्या बहुविध बुद्धिमत्ता (विशेषतः आंतरवैयक्तिक विरुद्ध अंतर्वैयक्तिक) आणि लिंगभाव ही सामाजिक रचना यांवर हमखास २–३ प्रश्न येतात.',
          mahaTet: 'MAHA TET मध्ये बुद्ध्यांक (IQ) गणिताचे प्रश्न, स्पीअरमन व गिलफोर्डचे बुद्धिमत्ता सिद्धांत आणि बालकेंद्रित शिक्षणाची तत्त्वे यांवर प्रश्न विचारले जातात.',
        },
        importantExamPoints: [
          'लिंगभाव (Gender) ही नेहमी "सामाजिक रचना" असते, जैविक नव्हे.',
          'आंतरवैयक्तिक = दुसऱ्यांना समजून घेणे; अंतर्वैयक्तिक = स्वतःला समजून घेणे.',
          'IQ = (मानसिक वय / कालिक वय) × १००.',
          'प्रगतशील वर्गात शिक्षक हा सुलभक (Facilitator) असतो.',
        ],
        commonMistakes: [
          'आंतरवैयक्तिक व अंतर्वैयक्तिक या दोन शब्दांत उलटा अर्थ लावणे.',
          'लिंगभावाला जैविक घटक समजणे.',
          'एकाच बुद्ध्यांक अंकावरून संपूर्ण बुद्धिमत्ता मोजता येते असे मानणे.',
        ],
        topicSummary:
          'बालकेंद्रित प्रगतशील शिक्षण विद्यार्थ्याला सक्रिय शिकणारा बनवते, गार्डनरचा सिद्धांत विविध प्रतिभांचा सन्मान करतो आणि लिंगभाव-समतावादी दृष्टिकोन पूर्वग्रहमुक्त न्याय्य वर्ग निर्माण करतो.',
        revisionPoints: [
          'प्रगतशील शिक्षण = जॉन ड्युई (कृतीतून शिक्षण, सुलभक शिक्षक).',
          'गार्डनर = ८ बहुविध बुद्धिमत्ता; स्पीअरमन = g + s; स्टर्नबर्ग = त्रिसूत्री.',
          'IQ = (MA / CA) × १००.',
          'Sex = जैविक; Gender = सामाजिक रचना.',
          'सर्व विद्यार्थ्यांना लिंगभेदरहित समान संधी देणे आवश्यक.',
        ],
        practiceQuestions: [
          {
            id: 'cdp-u3-mr-q1',
            question: 'एक समुपदेशक विद्यार्थ्याच्या न बोललेल्या भावना अचूक ओळखून त्याला सहानुभूतीने मार्गदर्शन करते. हॉवर्ड गार्डनरच्या मते तिच्यात कोणती बुद्धिमत्ता प्रबळ आहे?',
            options: ['अंतर्वैयक्तिक बुद्धिमत्ता', 'आंतरवैयक्तिक बुद्धिमत्ता', 'अवकाशीय बुद्धिमत्ता', 'निसर्गवादी बुद्धिमत्ता'],
            correctAnswer: 1,
            explanation:
              'इतरांच्या भावना, मनःस्थिती व हेतू अचूक समजून घेण्याच्या क्षमतेला आंतरवैयक्तिक (Interpersonal) बुद्धिमत्ता म्हणतात.',
            topicReference: 'घटक ३ — गार्डनरचा बहुविध बुद्धिमत्ता सिद्धांत',
          },
          {
            id: 'cdp-u3-mr-q2',
            question: 'शैक्षणिक मानसशास्त्रानुसार "लिंगभाव" (Gender) संदर्भात कोणते विधान अचूक आहे?',
            options: [
              'लिंगभाव ही जन्मतः निश्चित होणारी जैविक अवस्था आहे.',
              'लिंगभाव ही समाज व संस्कृतीने निर्माण केलेली सामाजिक रचना आहे.',
              'लिंगभावामुळे गणिताची क्षमता ठरते.',
              'लिंगभाव सर्व संस्कृतींत एकसारखा असतो.',
            ],
            correctAnswer: 1,
            explanation:
              'शारीरिक फरक म्हणजे जैविक लिंग (Sex), तर समाजाने ठरवलेल्या भूमिका व अपेक्षा म्हणजे लिंगभाव (Gender — सामाजिक रचना).',
            topicReference: 'घटक ३ — लिंगभाव सामाजिक रचना',
          },
          {
            id: 'cdp-u3-mr-q3',
            question: '१० वर्षांच्या विद्यार्थ्याचे मानसिक वय १२ वर्षे असल्यास त्याचा बुद्ध्यांक (IQ) किती असेल?',
            options: ['८३', '१००', '१२०', '१३२'],
            correctAnswer: 2,
            explanation:
              'सूत्रानुसार IQ = (मानसिक वय / शारीरिक वय) × १०० = (१२ / १०) × १०० = १२०.',
            topicReference: 'घटक ३ — बुद्ध्यांक गणना',
          },
        ],
      },
      Hindi: {
        documentTitle: 'बाल-केंद्रित व प्रगतिशील शिक्षा, बहुबुद्धि सिद्धांत, भाषा-विचार एवं जेंडर',
        unitTitle: 'इकाई 3: प्रगतिशील शिक्षा, बुद्धि एवं जेंडर समता',
        topicTitle: 'प्रगतिशील शिक्षा, बुद्धि के सिद्धांत, भाषा-विचार तथा जेंडर एक सामाजिक संरचना',
        subtopics: [
          'बाल-केंद्रित एवं प्रगतिशील शिक्षा (जॉन डीवी, मारिया मोंटेसरी, रवींद्रनाथ टैगोर)',
          'बुद्धि की अवधारणा, बुद्धिलब्धि (IQ) सूत्र एवं हॉवर्ड गार्डनर का बहुबुद्धि सिद्धांत',
          'भाषा एवं विचार (पियाजे बनाम वायगोत्स्की)',
          'जेंडर एक सामाजिक संरचना, लैंगिक रूढ़िवादिता, पक्षपात तथा समतामूलक कक्षा अभ्यास',
        ],
        introduction:
          'आधुनिक भारतीय शिक्षा (NCF 2005 एवं NEP 2020) रटंत विद्या के बजाय बाल-केंद्रित गतिविधि, बहुआयामी प्रतिभाओं की पहचान और जेंडर-संवेदनशील समानता पर आधारित है। CTET तथा MAHA TET दोनों में इस इकाई से नियमित प्रश्न पूछे जाते हैं।',
        meaningAndDefinition:
          'बाल-केंद्रित प्रगतिशील शिक्षा में विद्यार्थी की जिज्ञासा, अनुभव और सक्रिय सहभागिता सर्वोपरि होती है। हॉवर्ड गार्डनर के अनुसार बुद्धि कोई एकल अंक नहीं बल्कि 8 स्वतंत्र योग्यताओं का समूह है। जेंडर (लिंगभाव) समाज द्वारा निर्मित भूमिकाओं व अपेक्षाओं को दर्शाता है, जबकि सेक्स जैविक भेद है।',
        detailedExplanation: [
          'जॉन डीवी ने प्रगतिशील शिक्षा और "करके सीखने" (Learning by Doing) का समर्थन किया। वे विद्यालय को एक लघु लोकतांत्रिक समाज मानते हैं जहाँ शिक्षक तानाशाह न होकर सुगमकर्ता (Facilitator) होता है।',
          'बुद्धिलब्धि (IQ) का सूत्र (स्टर्न/टरमन): IQ = (मानसिक आयु ÷ वास्तविक आयु) × 100। स्पीयरमैन ने द्विकारक सिद्धांत (सामान्य "g" तथा विशिष्ट "s" कारक) और स्टर्नबर्ग ने त्रितंत्र सिद्धांत (विश्लेषणात्मक, सृजनात्मक व व्यावहारिक बुद्धि) प्रस्तुत किया।',
          'हॉवर्ड गार्डनर की 8 बहुबुद्धियाँ: भाषायी, तार्किक-गणितीय, स्थानिक (Spatial), शारीरिक-गतिक, संगीतात्मक, अंतर्वैयक्तिक (दूसरों को समझना), अंतःवैयक्तिक (स्वयं को समझना) और प्रकृतिवादी।',
          'भाषा व विचार: पियाजे के अनुसार विचार भाषा से पहले उत्पन्न होता है; वायगोत्स्की के अनुसार भाषा और विचार प्रारंभ में स्वतंत्र रहते हैं और लगभग 2–3 वर्ष की आयु में मिलकर शाब्दिक चिंतन बनाते हैं।',
          'जैविक लिंग (Sex) जन्मजात शारीरिक अंतर है, जबकि जेंडर (Gender) एक सामाजिक संरचना है। "लड़के गणित में अच्छे होते हैं और लड़कियाँ कला में" जैसी रूढ़ियाँ (Stereotypes) हानिकारक हैं; शिक्षक को समतापूर्ण उदाहरण और समान नेतृत्व अवसर देने चाहिए।',
        ],
        importantConcepts: [
          'IQ सूत्र: (मानसिक आयु / वास्तविक आयु) × 100।',
          'अंतर्वैयक्तिक (Interpersonal) बनाम अंतःवैयक्तिक (Intrapersonal): अंतर्वैयक्तिक = दूसरों की भावनाएँ समझना; अंतःवैयक्तिक = स्वयं की भावनाओं व लक्ष्यों की गहरी समझ।',
          'सेक्स (Sex) = जैविक; जेंडर (Gender) = सामाजिक संरचना।',
          'प्रगतिशील कक्षा में शिक्षक = सुगमकर्ता (Facilitator)।',
        ],
        comparisonTable: {
          caption: 'हॉवर्ड गार्डनर के 8 बहुबुद्धि प्रकार',
          headers: ['बुद्धि प्रकार', 'प्रमुख क्षमता', 'उदाहरण / गतिविधियाँ'],
          rows: [
            ['भाषायी', 'शब्दों, लेखन, वाचन व अभिव्यक्ति में दक्षता', 'कवि, पत्रकार, वाद-विवाद, कहानी'],
            ['तार्किक-गणितीय', 'तर्क, संख्या, पैटर्न एवं विश्लेषण', 'वैज्ञानिक, गणितज्ञ, पहेलियाँ'],
            ['स्थानिक (Spatial)', 'चित्र, मानचित्र व त्रिआयामी कल्पना', 'वास्तुकार, पायलट, ज्यामिति मॉडल'],
            ['शारीरिक-गतिक', 'शरीर व हाथों का सटीक समन्वय', 'खिलाड़ी, नर्तक, शल्यचिकित्सक'],
            ['संगीतात्मक', 'लय, ताल, स्वर की संवेदनशीलता', 'गायक, संगीतकार, लयबद्ध अभ्यास'],
            ['अंतर्वैयक्तिक', 'दूसरों के भाव व उद्देश्य समझना', 'शिक्षक, परामर्शदाता, नेतृत्व'],
            ['अंतःवैयक्तिक', 'आत्मचिंतन एवं स्व-जागरूकता', 'दार्शनिक, आत्म-समीक्षा डायरी'],
            ['प्रकृतिवादी', 'पौधों, जीवों व प्रकृति का वर्गीकरण', 'वनस्पतिशास्त्री, किसान, प्रकृति भ्रमण'],
          ],
        },
        importantPrinciples: [
          'प्रत्येक बच्चे की बुद्धि प्रोफ़ाइल अनूठी होती है; एक ही परीक्षा से बच्चे पर स्थायी ठप्पा न लगाएँ।',
          'दृश्य, श्रव्य, गतिविधि और संवाद—बहुविध माध्यमों से एक ही विषय पढ़ाएँ।',
          'लैंगिक रूढ़ियों को तोड़ने वाले सकारात्मक रोल मॉडल प्रस्तुत करें।',
        ],
        keyThinkers: [
          { name: 'जॉन डीवी', contribution: 'प्रगतिशील शिक्षा के प्रवर्तक; करके सीखना व लोकतांत्रिक कक्षा।' },
          { name: 'हॉवर्ड गार्डनर', contribution: 'बहुबुद्धि सिद्धांत (8 स्वतंत्र बुद्धियाँ)।' },
          { name: 'स्पीयरमैन एवं स्टर्नबर्ग', contribution: 'द्विकारक सिद्धांत (g, s) तथा त्रितंत्र बुद्धि सिद्धांत।' },
          { name: 'मोंटेसरी एवं टैगोर', contribution: 'संवेदी स्व-अधिगम (मोंटेसरी) तथा प्रकृति के सान्निध्य में सृजनात्मक शिक्षा (टैगोर)।' },
        ],
        practicalExamples: [
          'यदि पाठ्यपुस्तक में केवल पुरुषों को डॉक्टर व महिलाओं को नर्स दिखाया गया हो, तो शिक्षक महिला अंतरिक्ष यात्रियों व पुरुष शेफ पर चर्चा कराकर जेंडर रूढ़ि को चुनौती देते हैं।',
          'निबंध लेखन में कमजोर दिखने वाला छात्र शानदार विज्ञान मॉडल बनाता है—यह उसकी स्थानिक व शारीरिक-गतिक बुद्धि को दर्शाता है।',
        ],
        classroomApplications: [
          'लड़कों और लड़कियों दोनों को कक्षा मॉनिटर, प्रयोगशाला प्रमुख व खेल कप्तान की समान जिम्मेदारी दें।',
          'परियोजना विधि और लचीली बैठक व्यवस्था द्वारा सक्रिय सहभागिता बढ़ाएँ।',
        ],
        teachingMethods: [
          'परियोजना विधि एवं करके सीखना (डीवी/किलपैट्रिक)',
          'बहुबुद्धि आधारित विभेदित शिक्षण',
          'जेंडर-संवेदनशील परिचर्चा एवं आलोचनात्मक विश्लेषण',
        ],
        examSpecificFocus: {
          ctet: 'CTET में गार्डनर की बहुबुद्धि (विशेषकर अंतर्वैयक्तिक बनाम अंतःवैयक्तिक) तथा जेंडर एक सामाजिक संरचना से 2–3 प्रश्न लगभग हर सत्र में आते हैं।',
          mahaTet: 'MAHA TET में IQ गणना, स्पीयरमैन व गिलफोर्ड के सिद्धांत और बाल-केंद्रित शिक्षा के नियमों से सीधे प्रश्न पूछे जाते हैं।',
        },
        importantExamPoints: [
          'जेंडर सदैव एक "सामाजिक संरचना" है, जैविक निर्धारक नहीं।',
          'अंतर्वैयक्तिक = दूसरे लोग; अंतःवैयक्तिक = स्वयं के भीतर।',
          'IQ = (मानसिक आयु / वास्तविक आयु) × 100।',
          'प्रगतिशील शिक्षा में शिक्षक केवल सुगमकर्ता है, ज्ञान थोपने वाला नहीं।',
        ],
        commonMistakes: [
          'अंतर्वैयक्तिक और अंतःवैयक्तिक का अर्थ आपस में बदल देना।',
          'जेंडर को जैविक गुण चुन लेना।',
          'केवल एकल IQ अंक को संपूर्ण बुद्धि मान लेना।',
        ],
        topicSummary:
          'प्रगतिशील शिक्षा बच्चे को सक्रिय खोजकर्ता बनाती है, गार्डनर का बहुबुद्धि सिद्धांत विविध प्रतिभाओं को मान्यता देता है, तथा जेंडर समता सामाजिक रूढ़ियों को तोड़कर न्यायपूर्ण कक्षा बनाती है।',
        revisionPoints: [
          'प्रगतिशील शिक्षा = जॉन डीवी (करके सीखना, सुगमकर्ता शिक्षक)।',
          'गार्डनर = 8 बहुबुद्धियाँ; स्पीयरमैन = g + s; स्टर्नबर्ग = त्रितंत्र।',
          'IQ = (MA / CA) × 100।',
          'सेक्स = जैविक; जेंडर = सामाजिक संरचना।',
          'कक्षा में जेंडर पक्षपात व रूढ़ियों को सक्रिय रूप से समाप्त करें।',
        ],
        practiceQuestions: [
          {
            id: 'cdp-u3-hi-q1',
            question: 'एक परामर्शदाता छात्रों के अनकहे तनाव को तुरंत समझकर सहानुभूतिपूर्ण सहायता देती है। हॉवर्ड गार्डनर के अनुसार उनमें कौन-सी बुद्धि प्रबल है?',
            options: ['अंतःवैयक्तिक बुद्धि', 'अंतर्वैयक्तिक बुद्धि', 'स्थानिक बुद्धि', 'प्रकृतिवादी बुद्धि'],
            correctAnswer: 1,
            explanation:
              'दूसरों के मनोभावों, प्रेरणाओं और व्यवहार को सटीकता से समझने की क्षमता को अंतर्वैयक्तिक (Interpersonal) बुद्धि कहते हैं।',
            topicReference: 'इकाई 3 — हॉवर्ड गार्डनर का बहुबुद्धि सिद्धांत',
          },
          {
            id: 'cdp-u3-hi-q2',
            question: 'शिक्षा मनोविज्ञान में "जेंडर" (Gender) की सबसे सही व्याख्या कौन-सी है?',
            options: [
              'जेंडर जन्म के समय निर्धारित अपरिवर्तनीय जैविक लक्षण है।',
              'जेंडर समाज व संस्कृति द्वारा निर्मित एक सामाजिक संरचना है।',
              'जेंडर स्वाभाविक रूप से गणितीय योग्यता तय करता है।',
              'जेंडर भूमिकाएँ प्रत्येक समाज में सदैव समान होती हैं।',
            ],
            correctAnswer: 1,
            explanation:
              'सेक्स जैविक अंतर है, जबकि जेंडर सामाजिक-सांस्कृतिक भूमिकाओं से बनी एक सामाजिक संरचना है।',
            topicReference: 'इकाई 3 — जेंडर एक सामाजिक संरचना',
          },
          {
            id: 'cdp-u3-hi-q3',
            question: 'यदि 10 वर्ष के विद्यार्थी की मानसिक आयु 12 वर्ष है, तो उसकी बुद्धिलब्धि (IQ) क्या होगी?',
            options: ['83', '100', '120', '132'],
            correctAnswer: 2,
            explanation:
              'IQ = (मानसिक आयु / वास्तविक आयु) × 100 = (12 / 10) × 100 = 120।',
            topicReference: 'इकाई 3 — बुद्धिलब्धि गणना',
          },
        ],
      },
    },
  },
  {
    slug: 'cdp-u4-assessment-cce-inclusive-education-cwsn',
    unitNumber: 4,
    topicNumber: 4,
    subjectId: 'CDP',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_1', 'PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Official Syllabus — Individual Differences, Assessment for/of Learning, CCE & Inclusive Education (CWSN, Learning Disabilities, Gifted Learners)',
      mahaTet: 'MSCE Pune MAHA TET Official Syllabus — Vaiyaktik Bhinnata, Satat va Sarvankash Mulyamapan (CCE) va Samaveshit Shikshan (CWSN)',
    },
    content: {
      English: {
        documentTitle: 'Individual Differences, Assessment (CCE/SBA) & Inclusive Education (CWSN)',
        unitTitle: 'Unit 4: Assessment & Inclusive Education',
        topicTitle: 'Assessment for/of Learning, CCE, Individual Differences & Inclusive Classrooms',
        subtopics: [
          'Individual Differences among Learners (Language, Culture, Aptitude, Readiness)',
          'Assessment for Learning (Formative) vs. Assessment of Learning (Summative) vs. Assessment as Learning',
          'Continuous and Comprehensive Evaluation (CCE), School-Based Assessment (SBA) & Rubrics',
          'Inclusive Education: CWSN, RPwD Act 2016, Learning Disabilities (Dyslexia, Dysgraphia, Dyscalculia, ADHD, Autism) & Gifted/Creative Learners',
        ],
        introduction:
          'Inclusive education and meaningful assessment together account for roughly one-third of the CDP section in both CTET and MAHA TET. Rather than segregating children with special needs or ranking students through high-stakes exams, teachers must adapt the school system to fit every child.',
        meaningAndDefinition:
          'Inclusive Education means welcoming ALL children—regardless of physical, intellectual, linguistic, socio-economic, or cultural differences—into regular neighbourhood classrooms with appropriate adaptations, assistive devices, and differentiated instruction. Continuous and Comprehensive Evaluation (CCE) assesses both scholastic and co-scholastic growth continuously to improve learning.',
        detailedExplanation: [
          'Assessment for Learning (Formative Assessment) occurs DURING instruction (quizzes, oral checks, exit slips, portfolios) to diagnose learning gaps and give timely feedback. Assessment of Learning (Summative Assessment) occurs AFTER instruction (term-end exams) to certify achievement. Assessment as Learning encourages students to self-assess and monitor their own learning.',
          'Inclusive Education differs fundamentally from Integrated Education: in Integration, the child is expected to adjust to an unchanged school; in Inclusion, the SYSTEM, pedagogy, seating, and curriculum adapt to support every learner.',
          'Major Specific Learning Disabilities (SLDs) & Neurodevelopmental Conditions tested in exams: Dyslexia (reading/decoding difficulty), Dysgraphia (handwriting/fine-motor writing difficulty), Dyscalculia (number/arithmetic calculation difficulty), Dyspraxia (motor coordination), Aphasia/Dysphasia (language comprehension/expression), ADHD (inattention, hyperactivity, impulsivity), and Autism Spectrum Disorder (social communication differences & repetitive routines).',
          'Addressing Gifted and Creative Learners: Gifted students need Enrichment (deeper inquiry, open-ended research projects, mentorship) rather than repetitive extra drill sheets. Creativity (J. P. Guilford) is anchored in Divergent Thinking (Fluency, Flexibility, Originality, Elaboration).',
          'RPwD Act 2016 (Rights of Persons with Disabilities Act) expanded recognized benchmark disabilities in India from 7 (PWD Act 1995) to 21 conditions and mandated barrier-free schools and reasonable accommodation.',
        ],
        importantConcepts: [
          'Formative (For Learning) = Diagnostic & ongoing; Summative (Of Learning) = Term-end grading.',
          'Inclusion = Changing the school system to suit the child (NOT segregating or forcing the child to fit rigid norms).',
          'Dyslexia = Reading; Dysgraphia = Writing; Dyscalculia = Maths; Aphasia = Language.',
          'Divergent Thinking = Multiple creative solutions (Creativity); Convergent Thinking = Single fixed answer.',
          'Universal Design for Learning (UDL): Multiple means of representation, expression, and engagement.',
        ],
        comparisonTable: {
          caption: 'Quick Diagnostic Guide to Learning Disabilities & Classroom Support',
          headers: ['Condition', 'Primary Difficulty', 'Recommended Classroom Accommodation'],
          rows: [
            ['Dyslexia', 'Reading fluency, letter reversal (b/d), decoding', 'Audio books, phonics cues, large readable fonts, oral exams'],
            ['Dysgraphia', 'Handwriting legibility, spelling, spacing', 'Wide-ruled paper, extra writing time, speech-to-text, oral checks'],
            ['Dyscalculia', 'Number sense, place value, math operations', 'Concrete manipulatives, visual number lines, step checklists'],
            ['ADHD', 'Sustained attention, impulsivity, restlessness', 'Short chunked tasks, front-row seating, clear visual schedules'],
            ['Autism (ASD)', 'Social cues, sensory sensitivity, routine changes', 'Predictable visual timetables, calm cues, structured instructions'],
          ],
        },
        importantPrinciples: [
          'Celebrate learner diversity as a classroom RESOURCE, never as a problem or deficit.',
          'Use multi-tool assessment (Portfolios, Rubrics, Peer-assessment, Anecdotal Records) instead of relying exclusively on written exams.',
          'Provide reasonable accommodation (Braille, tactile maps, sign language, extra time) without lowering dignity or expectations.',
        ],
        keyThinkers: [
          { name: 'J. P. Guilford', contribution: 'Distinguished Divergent Thinking (creativity) from Convergent Thinking.' },
          { name: 'E. Paul Torrance', contribution: 'Developed Torrance Tests of Creative Thinking (Fluency, Flexibility, Originality, Elaboration).' },
          { name: 'Joseph Renzulli', contribution: 'Three-Ring Conception of Giftedness (Above-average ability + Creativity + Task commitment).' },
        ],
        practicalExamples: [
          'A Class 5 student reads "saw" as "was" and struggles to decode unfamiliar words aloud, yet answers oral comprehension brilliantly — this points to Dyslexia, best supported with multisensory phonics and audio text.',
          'Instead of giving a gifted Class 7 student 20 extra identical textbook sums, the teacher assigns an open-ended data investigation project on school water conservation (Enrichment).',
        ],
        classroomApplications: [
          'Maintain student Portfolios displaying drafts, artwork, and reflections across the year to show genuine progress.',
          'Seat students with visual or hearing impairment in the front with good lighting, face the class while speaking, and pair spoken words with visual diagrams.',
        ],
        teachingMethods: [
          'Differentiated Instruction & Universal Design for Learning (UDL)',
          'Individualized Education Programme (IEP) & Peer Buddy Support',
          'Formative Assessment (Exit Tickets, Rubrics, Self & Peer Assessment)',
        ],
        examSpecificFocus: {
          ctet: 'CTET dedicates 5 direct questions to Inclusive Education (Dyslexia/Dysgraphia/Dyscalculia/ADHD/Autism/Gifted) plus 2–3 questions on Assessment FOR vs. OF learning and Portfolios.',
          mahaTet: 'MAHA TET frequently tests CCE components (Aakarika / Formative vs. Sankalit / Summative), RPwD Act 2016 (21 disabilities), and identification traits of gifted/backward/special learners.',
        },
        importantExamPoints: [
          'Assessment FOR Learning = Formative (best for improving learning during teaching).',
          'Assessment OF Learning = Summative (end-of-term grading).',
          'RPwD Act 2016 recognizes 21 disabilities (up from 7 in 1995).',
          'Segregating children with disabilities into separate classrooms VIOLATES Inclusive Education.',
          'Creativity is ALWAYS linked with Divergent Thinking (NOT Convergent Thinking).',
        ],
        commonMistakes: [
          'Mixing up Dyslexia (reading) with Dysgraphia (writing) or Dyscalculia (maths).',
          'Choosing "special separate schools" as the answer for an Inclusive Education question.',
          'Confusing Formative Assessment (for learning) with Summative Assessment (of learning).',
        ],
        topicSummary:
          'Equitable teaching combines continuous formative assessment (CCE/SBA) with true inclusive education—adapting pedagogy, tools, and assessments so learners with disabilities, diverse backgrounds, and gifted potential all thrive together.',
        revisionPoints: [
          'Assessment FOR Learning = Formative; OF Learning = Summative; AS Learning = Self-assessment.',
          'CCE = Continuous (regular) + Comprehensive (scholastic + co-scholastic).',
          'Dyslexia (Reading), Dysgraphia (Writing), Dyscalculia (Maths), Aphasia (Language).',
          'RPwD Act 2016 = 21 disabilities; Inclusive Education = system adapts to child.',
          'Creativity = Divergent Thinking (Fluency, Flexibility, Originality, Elaboration).',
        ],
        practiceQuestions: [
          {
            id: 'cdp-u4-en-q1',
            question: 'A teacher uses weekly concept checks, oral discussions, and student portfolios during a chapter specifically to identify learning gaps and modify her next lesson. This is an example of:',
            options: [
              'Assessment of Learning',
              'Assessment for Learning',
              'Norm-referenced Ranking',
              'Standardized Summative Grading',
            ],
            correctAnswer: 1,
            explanation:
              'Ongoing assessment conducted during instruction to diagnose gaps and improve teaching-learning is Assessment for Learning (Formative Assessment).',
            topicReference: 'Unit 4 — Assessment for vs. of Learning',
          },
          {
            id: 'cdp-u4-en-q2',
            question: 'A Class 4 learner frequently reverses digits, confuses arithmetic signs (+ and ×), and struggles with place value and mental calculations. Which learning difficulty is most likely indicated?',
            options: ['Dyslexia', 'Dysgraphia', 'Dyscalculia', 'Aphasia'],
            correctAnswer: 2,
            explanation:
              'Dyscalculia specifically affects numerical processing, place value, mathematical symbols, and arithmetic calculations.',
            topicReference: 'Unit 4 — Learning Disabilities (CWSN)',
          },
          {
            id: 'cdp-u4-en-q3',
            question: 'Which classroom practice best upholds the principle of Inclusive Education?',
            options: [
              'Grouping all learners with disabilities in a separate back-row section.',
              'Giving identical timed written tests to every child without accommodations.',
              'Adapting teaching materials, seating, and assessment modes so all learners participate meaningfully together.',
              'Transferring slow learners to non-academic tasks only.',
            ],
            correctAnswer: 2,
            explanation:
              'True inclusion adapts the curriculum, environment, and assessment to meet diverse needs within the regular classroom.',
            topicReference: 'Unit 4 — Concept of Inclusive Education',
          },
        ],
      },
      Marathi: {
        documentTitle: 'वैयक्तिक भिन्नता, सातत्यपूर्ण व सर्वंकष मूल्यमापन (CCE) आणि समावेशित शिक्षण',
        unitTitle: 'घटक ४: मूल्यमापन आणि समावेशित शिक्षण (CWSN)',
        topicTitle: 'अध्ययनासाठी मूल्यमापन, CCE, अध्ययन अक्षमता व समावेशित वर्गव्यवस्था',
        subtopics: [
          'विद्यार्थ्यांमधील वैयक्तिक भिन्नता (भाषा, संस्कृती, अभिक्षमता व गती)',
          'अध्ययनासाठी मूल्यमापन (आकारिक) विरुद्ध अध्ययनाचे मूल्यमापन (संकलित) व स्व-मूल्यमापन',
          'सातत्यपूर्ण व सर्वंकष मूल्यमापन (CCE), शाळा-आधारित मूल्यमापन (SBA) व रुब्रिक्स',
          'समावेशित शिक्षण: विशेष गरजा असणारी बालके (CWSN), RPwD कायदा २०१६, अध्ययन अक्षमता व प्रज्ञावंत विद्यार्थी',
        ],
        introduction:
          'समावेशित शिक्षण आणि सातत्यपूर्ण मूल्यमापन या घटकांवर CTET व महाराष्ट्र TET च्या बालविकास विभागात सुमारे एक तृतीयांश प्रश्न विचारले जातात. विशेष गरजा असणाऱ्या मुलांना वेगळे न काढता नियमित वर्गातच सर्वांना सन्मानाने शिकण्याची संधी देणे हे समावेशित शिक्षणाचे मूलतत्त्व आहे.',
        meaningAndDefinition:
          'समावेशित शिक्षण (Inclusive Education) म्हणजे शारीरिक, बौद्धिक, भाषिक किंवा सामाजिक-आर्थिक विविधता असणाऱ्या सर्व बालकांना नियमित शाळेत आवश्यक बदल, साधने व लवचिक अध्यापनाद्वारे एकत्रित शिक्षण देणे होय. सातत्यपूर्ण व सर्वंकष मूल्यमापन (CCE) म्हणजे विद्यार्थ्यांच्या शालेय व सहशालेय प्रगतीचे वर्षभर सातत्याने केलेले मूल्यमापन.',
        detailedExplanation: [
          'अध्ययनासाठी मूल्यमापन (Assessment for Learning / आकारिक) हे अध्यापन सुरू असताना विद्यार्थ्यांच्या अडचणी ओळखून त्वरित मार्गदर्शन करण्यासाठी केले जाते. अध्ययनाचे मूल्यमापन (Assessment of Learning / संकलित) हे सत्रअखेरीस श्रेणी किंवा प्रमाणपत्रासाठी केले जाते.',
          'एकात्मिक शिक्षण व समावेशित शिक्षण यांतील फरक: एकात्मिक शिक्षणात विद्यार्थ्याने शाळेच्या जुन्या पद्धतीशी जुळवून घ्यावे लागते; तर समावेशित शिक्षणात शाळा, अभ्यासक्रम व अध्यापन पद्धती विद्यार्थ्यांच्या गरजेनुसार बदलल्या जातात.',
          'परीक्षेत विचारल्या जाणाऱ्या प्रमुख अध्ययन अक्षमता: डिस्लेक्सिया (वाचन अक्षमता), डिस्ग्राफिया (लेखन अक्षमता), डिस्कॅल्क्युलिया (गणन/गणित अक्षमता), अफेझिया (भाषा आकलन/अभिव्यक्ती अडचण), ADHD (अवधान न्यूनता व अतिचंचलता) आणि ऑटिझम/स्वमग्नता (सामाजिक संवादातील अडचणी).',
          'प्रज्ञावंत (Gifted) व सर्जनशील विद्यार्थी: प्रज्ञावंत विद्यार्थ्यांना अधिकचा एकसुरी गृहपाठ न देता समृद्धीकरण (Enrichment — सखोल प्रकल्प, संशोधन, खुले प्रश्न) द्यावे. सर्जनशीलता (जे. पी. गिलफोर्ड) ही नेहमी अपसारी चिंतनाशी (Divergent Thinking) निगडित असते.',
          'दिव्यांग व्यक्ती हक्क अधिनियम २०१६ (RPwD Act 2016) ने मान्यताप्राप्त दिव्यांगत्वाचे प्रकार ७ वरून २१ केले असून अडथळामुक्त शाळा व योग्य सुविधांची हमी दिली आहे.',
        ],
        importantConcepts: [
          'आकारिक मूल्यमापन (अध्ययनासाठी) = निदान व सुधारणा; संकलित मूल्यमापन (अध्ययनाचे) = सत्रअंती श्रेणी.',
          'डिस्लेक्सिया = वाचन; डिस्ग्राफिया = लेखन; डिस्कॅल्क्युलिया = गणित; अफेझिया = भाषा.',
          'अपसारी चिंतन (Divergent Thinking) = अनेक सर्जनशील उत्तरे; अभिसारी चिंतन = एकच ठरावीक उत्तर.',
          'RPwD कायदा २०१६ = २१ दिव्यांगत्व प्रकार.',
        ],
        comparisonTable: {
          caption: 'प्रमुख अध्ययन अक्षमता आणि वर्गातील उपाययोजना',
          headers: ['अक्षमता', 'मुख्य अडचण', 'शिक्षकाची उपाययोजना'],
          rows: [
            ['डिस्लेक्सिया', 'वाचनातील अडचण, अक्षरांचा गोंधळ (b/d)', 'ध्वनी-आधारित वाचन, श्राव्य पुस्तके, मोठे अक्षर, तोंडी परीक्षा'],
            ['डिस्ग्राफिया', 'हस्ताक्षर, शब्दलेखन व अंतरातील अडचण', 'जादा वेळ, रुंद ओळींची वही, तोंडी अभिव्यक्तीस संधी'],
            ['डिस्कॅल्क्युलिया', 'संख्याज्ञान, स्थानिक किंमत व आकडेमोड', 'मूर्त साधने, संख्यारेषा, टप्प्याटप्प्याने चित्ररूप मार्गदर्शन'],
            ['ADHD', 'लक्ष केंद्रित न होणे, अस्वस्थता, आवेग', 'लहान तुकड्यांत कार्य, पुढील बाकावर बैठक, दृश्य वेळापत्रक'],
            ['स्वमग्नता (Autism)', 'सामाजिक संवाद व बदलांप्रती संवेदनशीलता', 'निश्चित दिनचर्या, स्पष्ट व शांत सूचना, चित्र-आधारित मदत'],
          ],
        },
        importantPrinciples: [
          'वर्गातील विविधता ही समस्या नसून समृद्ध शैक्षणिक साधन (Resource) मानावी.',
          'केवळ लेखी परीक्षेऐवजी पोर्टफोलिओ, रुब्रिक्स, निरीक्षण व गटकार्य यांचा मूल्यमापनात वापर करावा.',
          'अध्ययनासाठी सार्वत्रिक आराखडा (UDL) वापरून सर्व विद्यार्थ्यांना सहभागी करावे.',
        ],
        keyThinkers: [
          { name: 'जे. पी. गिलफोर्ड', contribution: 'अपसारी चिंतन (सर्जनशीलता) व अभिसारी चिंतन यांतील फरक स्पष्ट केला.' },
          { name: 'ई. पॉल टॉरेन्स', contribution: 'सर्जनशीलतेचे चार घटक (प्रवाहिता, लवचिकता, मौलिकता, विस्तार) मांडले.' },
          { name: 'जोसेफ रेन्झुली', contribution: 'प्रज्ञावंतपणाचे त्रिसूत्री प्रतिमान (उच्च क्षमता + सर्जनशीलता + कार्यनिष्ठा).' },
        ],
        practicalExamples: [
          'इयत्ता पाचवीतील विद्यार्थी वाचताना शब्द उलटे वाचतो पण तोंडी विचारलेल्या प्रश्नांची अचूक उत्तरे देतो — हे डिस्लेक्सियाचे लक्षण असून त्यास ध्वनीयुक्त व श्राव्य साधनांची मदत द्यावी.',
          'प्रज्ञावंत विद्यार्थ्याला तेच गणित २० वेळा न देता शाळेतील पाणीबचतीवर सर्वेक्षण व आलेख तयार करण्याचा समृद्धी प्रकल्प द्यावा.',
        ],
        classroomApplications: [
          'विद्यार्थ्यांच्या वर्षभरातील कृती, चित्रकला व सुधारित लेखनाचा पोर्टफोलिओ जतन करावा.',
          'दृष्टीदोष किंवा श्रवणदोष असणाऱ्या विद्यार्थ्यांना पुढच्या रांगेत बसवून स्पष्ट उच्चार व स्पर्श/दृश्य साधने वापरावीत.',
        ],
        teachingMethods: [
          'विभेदित अध्यापन (Differentiated Instruction) व UDL',
          'वैयक्तिक शैक्षणिक योजना (IEP) व समवयस्क मित्र सहाय्य',
          'आकारिक मूल्यमापन, पोर्टफोलिओ व रुब्रिक्स',
        ],
        examSpecificFocus: {
          ctet: 'CTET मध्ये समावेशित शिक्षणावर ५ थेट प्रश्न (डिस्लेक्सिया, डिस्ग्राफिया, डिस्कॅल्क्युलिया, ADHD, ऑटिझम) आणि अध्ययनासाठी मूल्यमापनावर २–३ प्रश्न येतात.',
          mahaTet: 'MAHA TET मध्ये आकारिक विरुद्ध संकलित मूल्यमापन (CCE), RPwD कायदा २०१६ आणि प्रज्ञावंत/मागास बालकांच्या वैशिष्ट्यांवर भर असतो.',
        },
        importantExamPoints: [
          'अध्ययनासाठी मूल्यमापन = आकारिक (अध्यापनादरम्यान सुधारणेसाठी सर्वोत्तम).',
          'समावेशित शिक्षणात व्यवस्था विद्यार्थ्यानुरूप बदलते; विद्यार्थ्याला वेगळे काढणे अयोग्य आहे.',
          'सर्जनशीलता नेहमी अपसारी चिंतनाशी (Divergent Thinking) संबंधित असते.',
          'RPwD कायदा २०१६ अंतर्गत २१ दिव्यांगत्व प्रकारांचा समावेश आहे.',
        ],
        commonMistakes: [
          'डिस्लेक्सिया (वाचन) व डिस्ग्राफिया (लेखन) यांत गोंधळ करणे.',
          'समावेशित शिक्षणाच्या प्रश्नात "विशेष वेगळी शाळा" हा पर्याय निवडणे.',
          'आकारिक आणि संकलित मूल्यमापनाचे उद्देश उलट समजणे.',
        ],
        topicSummary:
          'सातत्यपूर्ण आकारिक मूल्यमापन आणि समावेशित शिक्षण ही समतावादी वर्गाची दोन चाके आहेत. योग्य निदान, लवचिक साधने आणि सन्मानपूर्वक सहभाग यामुळे प्रत्येक विद्यार्थी आपली पूर्ण क्षमता गाठू शकतो.',
        revisionPoints: [
          'अध्ययनासाठी मूल्यमापन = आकारिक; अध्ययनाचे = संकलित; अध्ययन म्हणून = स्व-मूल्यमापन.',
          'CCE = सातत्यपूर्ण (नियमित) + सर्वंकष (शालेय + सहशालेय).',
          'डिस्लेक्सिया (वाचन), डिस्ग्राफिया (लेखन), डिस्कॅल्क्युलिया (गणित), अफेझिया (भाषा).',
          'RPwD कायदा २०१६ = २१ दिव्यांगत्व प्रकार.',
          'सर्जनशीलता = अपसारी चिंतन (प्रवाहिता, लवचिकता, मौलिकता, विस्तार).',
        ],
        practiceQuestions: [
          {
            id: 'cdp-u4-mr-q1',
            question: 'शिक्षक पाठ शिकवत असताना तोंडी प्रश्न, लहान कृती व पोर्टफोलिओच्या मदतीने विद्यार्थ्यांच्या उणिवा ओळखून पुढील अध्यापनात सुधारणा करतात. याला काय म्हणतात?',
            options: [
              'अध्ययनाचे मूल्यमापन (संकलित)',
              'अध्ययनासाठी मूल्यमापन (आकारिक)',
              'मानक-संदर्भित श्रेणीकरण',
              'केवळ वार्षिक परीक्षा',
            ],
            correctAnswer: 1,
            explanation:
              'अध्यापन प्रक्रियेदरम्यान उणिवा शोधून त्वरित सुधारणा करण्यासाठी केलेले मूल्यमापन म्हणजे अध्ययनासाठी मूल्यमापन (आकारिक/Formative).',
            topicReference: 'घटक ४ — मूल्यमापन प्रकार',
          },
          {
            id: 'cdp-u4-mr-q2',
            question: 'इयत्ता चौथीतील विद्यार्थ्याला अंकांची स्थानिक किंमत, बेरीज-गुणाकाराची चिन्हे आणि तोंडी आकडेमोड करताना सतत अडचण येते. ही कोणती अध्ययन अक्षमता असू शकते?',
            options: ['डिस्लेक्सिया', 'डिस्ग्राफिया', 'डिस्कॅल्क्युलिया', 'अफेझिया'],
            correctAnswer: 2,
            explanation:
              'संख्याज्ञान, गणिती चिन्हे व आकडेमोडीतील विशिष्ट अक्षमतेला डिस्कॅल्क्युलिया (Dyscalculia) म्हणतात.',
            topicReference: 'घटक ४ — अध्ययन अक्षमता',
          },
          {
            id: 'cdp-u4-mr-q3',
            question: 'समावेशित शिक्षणाच्या तत्त्वाशी सर्वात सुसंगत वर्गपद्धती कोणती?',
            options: [
              'विशेष गरजा असणाऱ्या विद्यार्थ्यांना वर्गाच्या शेवटच्या रांगेत वेगळे बसवणे.',
              'कोणताही बदल न करता सर्वांना एकसारखीच लेखी परीक्षा देणे.',
              'अध्यापन साधने, बैठक व्यवस्था व मूल्यमापन यांत लवचिक बदल करून सर्वांचा समान सहभाग साधणे.',
              'हळू शिकणाऱ्या विद्यार्थ्यांना फक्त खेळात सहभागी करणे.',
            ],
            correctAnswer: 2,
            explanation:
              'समावेशित शिक्षणात व्यवस्था, साधने व मूल्यमापन पद्धती सर्व विद्यार्थ्यांच्या गरजांनुसार लवचिक केल्या जातात.',
            topicReference: 'घटक ४ — समावेशित शिक्षण',
          },
        ],
      },
      Hindi: {
        documentTitle: 'वैयक्तिक भिन्नता, सतत एवं व्यापक मूल्यांकन (CCE) तथा समावेशी शिक्षा (CWSN)',
        unitTitle: 'इकाई 4: आकलन एवं समावेशी शिक्षा',
        topicTitle: 'अधिगम के लिए आकलन, CCE, अधिगम अक्षमताएँ एवं समावेशी कक्षा',
        subtopics: [
          'शिक्षार्थियों में वैयक्तिक भिन्नता (भाषा, संस्कृति, अभिक्षमता एवं गति)',
          'अधिगम के लिए आकलन (रचनात्मक) बनाम अधिगम का आकलन (योगात्मक) तथा अधिगम के रूप में आकलन',
          'सतत एवं व्यापक मूल्यांकन (CCE), विद्यालय-आधारित आकलन (SBA) एवं रूब्रिक्स',
          'समावेशी शिक्षा: विशेष आवश्यकता वाले बच्चे (CWSN), RPwD अधिनियम 2016, अधिगम अक्षमताएँ एवं प्रतिभाशाली शिक्षार्थी',
        ],
        introduction:
          'समावेशी शिक्षा और सतत मूल्यांकन मिलकर CTET व MAHA TET के बाल विकास खंड का लगभग एक-तिहाई हिस्सा बनाते हैं। इसका मुख्य संदेश है कि बच्चे को प्रणाली के अनुरूप ढालने के बजाय विद्यालयी व्यवस्था को प्रत्येक बच्चे की आवश्यकता के अनुरूप लचीला बनाया जाए।',
        meaningAndDefinition:
          'समावेशी शिक्षा (Inclusive Education) का अर्थ शारीरिक, बौद्धिक, भाषायी या सामाजिक-आर्थिक पृष्ठभूमि के भेदभाव के बिना सभी बच्चों को नियमित कक्षा में आवश्यक अनुकूलन व सहायक साधनों के साथ गुणवत्तापूर्ण शिक्षा देना है। सतत एवं व्यापक मूल्यांकन (CCE) शैक्षिक व सह-शैक्षिक दोनों पक्षों का निरंतर आकलन है।',
        detailedExplanation: [
          'अधिगम के लिए आकलन (रचनात्मक / Formative) शिक्षण के दौरान किया जाता है ताकि सीखने की कठिनाइयों का निदान कर तुरंत सुधार किया जा सके। अधिगम का आकलन (योगात्मक / Summative) सत्र के अंत में ग्रेड या प्रमाणन के लिए होता है।',
          'एकीकृत बनाम समावेशी शिक्षा: एकीकृत शिक्षा में बच्चे से अपेक्षा होती है कि वह सामान्य व्यवस्था में ढले, जबकि समावेशी शिक्षा में पाठ्यक्रम, शिक्षण विधि और मूल्यांकन को बच्चे के अनुकूल बनाया जाता है।',
          'प्रमुख अधिगम अक्षमताएँ: डिस्लेक्सिया (पठन विकार), डिस्ग्राफिया (लेखन विकार), डिस्कैल्कुलिया (गणितीय गणना विकार), अफेजिया (भाषा संप्रेषण विकार), ADHD (अवधान न्यूनता अतिसक्रियता विकार) तथा ऑटिज़्म/स्वलीनता (सामाजिक संवाद में कठिनाई)।',
          'प्रतिभाशाली व सृजनात्मक शिक्षार्थी: प्रतिभाशाली बच्चों को एक जैसे अतिरिक्त प्रश्नों के बजाय संवर्धन (Enrichment — गहन प्रोजेक्ट, खोज कार्य) देना चाहिए। सृजनात्मकता (गिलफोर्ड) सदैव अपसारी चिंतन (Divergent Thinking) से जुड़ी होती है।',
          'दिव्यांगजन अधिकार अधिनियम 2016 (RPwD Act 2016) ने मान्यता प्राप्त दिव्यांगताओं की संख्या 7 से बढ़ाकर 21 कर दी है तथा बाधामुक्त विद्यालयी परिवेश अनिवार्य किया है।',
        ],
        importantConcepts: [
          'रचनात्मक आकलन (अधिगम के लिए) = निदानात्मक व निरंतर; योगात्मक (अधिगम का) = सत्रांत ग्रेडिंग।',
          'डिस्लेक्सिया = पढ़ना; डिस्ग्राफिया = लिखना; डिस्कैल्कुलिया = गणित; अफेजिया = भाषा।',
          'अपसारी चिंतन (Divergent Thinking) = अनेक मौलिक समाधान (सृजनात्मकता); अभिसारी चिंतन = एक निश्चित उत्तर।',
          'RPwD अधिनियम 2016 = 21 दिव्यांगता श्रेणियाँ।',
        ],
        comparisonTable: {
          caption: 'प्रमुख अधिगम अक्षमताएँ एवं कक्षा अनुकूलन',
          headers: ['अक्षमता', 'प्रमुख कठिनाई', 'शिक्षक द्वारा उचित सहायता'],
          rows: [
            ['डिस्लेक्सिया', 'पढ़ने में कठिनाई, अक्षरों का उलटा दिखना', 'ऑडियो पुस्तकें, ध्वन्यात्मक अभ्यास, बड़े अक्षर, मौखिक परीक्षा'],
            ['डिस्ग्राफिया', 'हस्तलेखन, वर्तनी और दूरी में कठिनाई', 'अतिरिक्त समय, चौड़ी पंक्ति की कॉपी, मौखिक उत्तर विकल्प'],
            ['डिस्कैल्कुलिया', 'संख्या बोध, स्थानीय मान व गणना कठिनाई', 'मूर्त शिक्षण सामग्री, संख्या रेखा, चरणबद्ध अभ्यास'],
            ['ADHD', 'ध्यान केंद्रित करने में कमी, आवेगशीलता', 'छोटे खंडों में कार्य, अगली पंक्ति में बैठना, दृश्य समय-सारणी'],
            ['स्वलीनता (Autism)', 'सामाजिक संकेतों व बदलावों में संवेदनशीलता', 'निश्चित दिनचर्या, स्पष्ट शांत निर्देश, चित्र कार्ड'],
          ],
        },
        importantPrinciples: [
          'कक्षा की विविधता को समस्या नहीं बल्कि सीखने का समृद्ध संसाधन मानें।',
          'पोर्टफोलियो, रूब्रिक्स, अवलोकन व सहपाठी आकलन जैसे बहुविध उपकरण अपनाएँ।',
          'अधिगम के सार्वभौमिक अभिकल्प (UDL) के माध्यम से सभी विद्यार्थियों की सक्रिय भागीदारी सुनिश्चित करें।',
        ],
        keyThinkers: [
          { name: 'जे. पी. गिलफोर्ड', contribution: 'अपसारी चिंतन (सृजनात्मकता) और अभिसारी चिंतन का स्पष्ट भेद बताया।' },
          { name: 'ई. पॉल टॉरेंस', contribution: 'सृजनात्मकता के चार आयाम (प्रवाह, लचीलापन, मौलिकता, विस्तारण) प्रतिपादित किए।' },
          { name: 'जोसेफ रेंजुली', contribution: 'प्रतिभाशीलता का त्रि-वलय मॉडल (उच्च योग्यता + सृजनात्मकता + कार्य प्रतिबद्धता)।' },
        ],
        practicalExamples: [
          'कक्षा 5 का विद्यार्थी "saw" को "was" पढ़ता है किंतु कहानी सुनकर सभी प्रश्नों के सटीक मौखिक उत्तर देता है—यह डिस्लेक्सिया का संकेत है; उसे ऑडियो व बहुसंवेदी पठन सहायता देनी चाहिए।',
          'प्रतिभाशाली छात्र को वही अभ्यास दोहराने के बजाय विद्यालय में जल-संरक्षण पर आंकड़ा विश्लेषण परियोजना देना संवर्धन (Enrichment) है।',
        ],
        classroomApplications: [
          'पूरे वर्ष विद्यार्थी के श्रेष्ठ कार्यों व क्रमिक सुधार का पोर्टफोलिओ संधारित करें।',
          'दृष्टिबाधित या श्रवणबाधित बच्चों को आगे बैठाकर स्पर्श/दृश्य साधनों और स्पष्ट उच्चारण का प्रयोग करें।',
        ],
        teachingMethods: [
          'विभेदित शिक्षण (Differentiated Instruction) एवं UDL',
          'व्यक्तिगत शिक्षा कार्यक्रम (IEP) तथा सहपाठी सहयोग',
          'रचनात्मक आकलन, पोर्टफोलियो एवं रूब्रिक्स',
        ],
        examSpecificFocus: {
          ctet: 'CTET में समावेशी शिक्षा से 5 सीधे प्रश्न (डिस्लेक्सिया, डिस्ग्राफिया, डिस्कैल्कुलिया, ADHD, स्वलीनता) तथा अधिगम के लिए आकलन व पोर्टफोलियो से 2–3 प्रश्न पूछे जाते हैं।',
          mahaTet: 'MAHA TET में CCE (रचनात्मक बनाम योगात्मक), RPwD अधिनियम 2016 (21 श्रेणियाँ) और प्रतिभाशाली/पिछड़े बालकों की पहचान पर प्रश्न आते हैं।',
        },
        importantExamPoints: [
          'अधिगम के लिए आकलन = रचनात्मक (शिक्षण सुधार हेतु सर्वश्रेष्ठ)।',
          'समावेशी शिक्षा में पृथक्करण (Segregation) पूर्णतः अस्वीकार्य है।',
          'सृजनात्मकता का सीधा संबंध अपसारी चिंतन (Divergent Thinking) से है।',
          'RPwD अधिनियम 2016 में 21 दिव्यांगताओं को मान्यता दी गई है।',
        ],
        commonMistakes: [
          'डिस्लेक्सिया (पठन) और डिस्ग्राफिया (लेखन) में भ्रम होना।',
          'समावेशी शिक्षा के प्रश्न में अलग विशेष विद्यालय का विकल्प चुन लेना।',
          'रचनात्मक आकलन और योगात्मक आकलन के उद्देश्य आपस में मिला देना।',
        ],
        topicSummary:
          'निरंतर रचनात्मक मूल्यांकन (CCE) और समावेशी शिक्षा मिलकर हर बच्चे—चाहे वह विशेष आवश्यकता वाला हो या प्रतिभाशाली—को समान गरिमा और सीखने का अवसर प्रदान करते हैं।',
        revisionPoints: [
          'अधिगम के लिए आकलन = रचनात्मक; अधिगम का = योगात्मक; अधिगम के रूप में = स्व-आकलन।',
          'CCE = सतत (निरंतर) + व्यापक (शैक्षिक + सह-शैक्षिक)।',
          'डिस्लेक्सिया (पठन), डिस्ग्राफिया (लेखन), डिस्कैल्कुलिया (गणित), अफेजिया (भाषा)।',
          'RPwD अधिनियम 2016 = 21 दिव्यांगताएँ।',
          'सृजनात्मकता = अपसारी चिंतन (प्रवाह, लचीलापन, मौलिकता, विस्तारण)।',
        ],
        practiceQuestions: [
          {
            id: 'cdp-u4-hi-q1',
            question: 'एक शिक्षिका अध्याय पढ़ाते समय साप्ताहिक प्रश्नोत्तरी, मौखिक चर्चा और पोर्टफोलियो से सीखने की कमियाँ जानकर अपनी शिक्षण रणनीति बदलती है। यह किसका उदाहरण है?',
            options: [
              'अधिगम का आकलन',
              'अधिगम के लिए आकलन',
              'मानक-संदर्भित श्रेणीकरण',
              'वार्षिक योगात्मक परीक्षा',
            ],
            correctAnswer: 1,
            explanation:
              'शिक्षण के दौरान सीखने की कठिनाइयों का निदान कर शिक्षण में सुधार करना "अधिगम के लिए आकलन" (रचनात्मक आकलन) है।',
            topicReference: 'इकाई 4 — आकलन के प्रकार',
          },
          {
            id: 'cdp-u4-hi-q2',
            question: 'कक्षा 4 का छात्र अंकों के स्थानीय मान, गणितीय चिह्नों (+, ×) और सरल जोड़-घटाव में लगातार कठिनाई अनुभव करता है। यह किस अधिगम अक्षमता का संकेत है?',
            options: ['डिस्लेक्सिया', 'डिस्ग्राफिया', 'डिस्कैल्कुलिया', 'अफेजिया'],
            correctAnswer: 2,
            explanation:
              'संख्या बोध, गणितीय चिह्नों और गणना से जुड़ी विशिष्ट कठिनाई को डिस्कैल्कुलिया (Dyscalculia) कहते हैं।',
            topicReference: 'इकाई 4 — अधिगम अक्षमताएँ',
          },
          {
            id: 'cdp-u4-hi-q3',
            question: 'समावेशी शिक्षा के सिद्धांत का सर्वोत्तम उदाहरण कौन-सा है?',
            options: [
              'विशेष आवश्यकता वाले छात्रों को कक्षा की पिछली पंक्ति में अलग बैठाना।',
              'सभी छात्रों को बिना किसी अनुकूलन के एक जैसी समयबद्ध लिखित परीक्षा देना।',
              'शिक्षण सामग्री, बैठक व्यवस्था और आकलन विधियों में लचीले बदलाव कर सभी को साथ सिखाना।',
              'धीमी गति से सीखने वालों को केवल गैर-शैक्षणिक कार्य देना।',
            ],
            correctAnswer: 2,
            explanation:
              'समावेशी शिक्षा में व्यवस्था और शिक्षण-आकलन पद्धति को सभी बच्चों की आवश्यकताओं के अनुरूप अनुकूलित किया जाता है।',
            topicReference: 'इकाई 4 — समावेशी शिक्षा',
          },
        ],
      },
    },
  },
  {
    slug: 'cdp-u5-learning-motivation-cognition-nep-rte',
    unitNumber: 5,
    topicNumber: 5,
    subjectId: 'CDP',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_1', 'PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Official Syllabus — Learning & Pedagogy (Problem Solving, Alternative Conceptions/Errors, Cognition & Emotion, Motivation, NCF 2005, NEP 2020, RTE 2009)',
      mahaTet: 'MSCE Pune MAHA TET Official Syllabus — Adhyayan Prakriya, Prerana, Bodhan va Bhavana, Chukaंचे Mahatva, RTE 2009 va NEP 2020',
    },
    content: {
      English: {
        documentTitle: 'How Children Think & Learn, Errors, Cognition-Emotions, Motivation & NEP/RTE',
        unitTitle: 'Unit 5: Learning, Motivation, Emotions & Education Policies',
        topicTitle: 'Problem Solving, Alternative Conceptions, Motivation, Cognition-Emotions & NEP 2020',
        subtopics: [
          'How Children Think & Learn; Child as a Problem Solver & Scientific Investigator',
          'Alternative Conceptions & Understanding Children’s Errors as Windows into Thinking',
          'Cognition and Emotions (Intertwined Relationship) & Intrinsic vs. Extrinsic Motivation',
          'Key Policy Frameworks: RTE Act 2009, NCF 2005 & NEP 2020 (5+3+3+4 Structure, FLN, Holistic Progress Card)',
        ],
        introduction:
          'Learning and Pedagogy directly evaluates how a teacher responds when a student makes a mistake, feels anxious, or loses interest. Both CTET and MAHA TET emphasize constructive, emotionally safe classrooms backed by RTE Act 2009, NCF 2005, and NEP 2020.',
        meaningAndDefinition:
          'Learning is a relatively permanent change in knowledge, understanding, or behaviour arising from active experience and reflection. Alternative conceptions (naive theories) are logical, experience-based ideas children construct before formal schooling (e.g., believing the sun moves around the earth). Motivation is the internal or external drive that initiates, directs, and sustains goal-directed learning.',
        detailedExplanation: [
          'Why Children "Fail": Progressive pedagogy insists that when a child fails in school, it reflects a systemic failure of rigid curriculum, disconnected teaching methods, or unaddressed emotional barriers—never an innate defect in the child.',
          'Value of Children’s Errors: Errors are NOT signs of laziness or low intelligence; they are meaningful windows into the learner’s current thinking strategies. Teachers must analyze error patterns constructively and design targeted remediation.',
          'Cognition and Emotions are deeply intertwined (NOT independent): Moderate curiosity and emotional safety enhance memory and problem-solving, whereas fear, humiliation, and severe test anxiety block working memory and rational thinking.',
          'Intrinsic Motivation (learning out of curiosity, mastery, and joy) produces far deeper, longer-lasting retention than Extrinsic Motivation (grades, gold stars, or fear of punishment). Maslow’s Hierarchy of Needs reminds teachers that physiological and safety/belonging needs must be met before higher intellectual self-actualization flourishes.',
          'Major Indian Educational Policies: RTE Act 2009 guarantees free and compulsory education (Ages 6–14, Article 21A), 25% EWS seats in private schools, Pupil-Teacher Ratio (30:1 Primary, 35:1 Upper Primary), and bans corporal punishment. NEP 2020 introduces the 5+3+3+4 curricular structure (Foundational 5, Preparatory 3, Middle 3, Secondary 4), Foundational Literacy & Numeracy (FLN — NIPUN Bharat), Mother-tongue/Regional language medium up to Grade 5, and 360-degree Holistic Progress Cards.',
        ],
        importantConcepts: [
          'Mastery-Oriented Goals vs. Performance-Avoidance Goals: Focus on self-improvement & understanding rather than fear of looking foolish.',
          'Metacognition: "Thinking about one’s own thinking" — planning, monitoring, and evaluating one’s own learning strategies.',
          'Attribution Theory (Bernard Weiner): Attributing failure to controllable effort/strategy builds resilience; attributing it to fixed "low ability" leads to learned helplessness.',
          'NEP 2020 5+3+3+4 Stages: Foundational (Age 3–8 / Balvatika–Class 2), Preparatory (Age 8–11 / Classes 3–5), Middle (Age 11–14 / Classes 6–8), Secondary (Age 14–18 / Classes 9–12).',
        ],
        comparisonTable: {
          caption: 'Intrinsic vs. Extrinsic Motivation & Policy Highlights',
          headers: ['Feature', 'Intrinsic Motivation (Preferred)', 'Extrinsic Motivation (Limited)'],
          rows: [
            ['Source', 'Internal curiosity, mastery, enjoyment', 'External prizes, marks, praise, fear of punishment'],
            ['Durability', 'Long-term, self-sustaining', 'Fades once external reward is removed'],
            ['Effect on Creativity', 'Encourages deep exploration & risk-taking', 'Often encourages minimum effort to get the reward'],
          ],
        },
        importantPrinciples: [
          'Treat every child as an active "scientific investigator" who tests hypotheses through observation.',
          'Welcome alternative conceptions respectfully and gently guide conceptual change through counter-examples and experiments.',
          'Connect school knowledge to life outside school (core guiding principle of NCF 2005).',
        ],
        keyThinkers: [
          { name: 'Abraham Maslow', contribution: 'Hierarchy of Needs (Physiological → Safety → Love/Belonging → Esteem → Self-Actualization).' },
          { name: 'Albert Bandura', contribution: 'Social Learning Theory (Observational Learning / Modelling & Self-Efficacy).' },
          { name: 'Edward Thorndike & B. F. Skinner', contribution: 'Laws of Learning (Readiness, Exercise, Effect — Thorndike) and Operant Conditioning/Reinforcement (Skinner).' },
          { name: 'Jerome Bruner', contribution: 'Discovery Learning, Spiral Curriculum & 3 Modes of Representation (Enactive, Iconic, Symbolic).' },
        ],
        practicalExamples: [
          'When a Class 3 child adds 1/2 + 1/3 = 2/5, the teacher recognizes the logical error (adding numerators and denominators separately) and uses paper-folding fraction strips rather than scolding.',
          'A Class 7 teacher creates a supportive, no-ridicule math discussion so anxious pre-adolescents feel emotionally safe to share tentative hypotheses (Cognition-Emotion link).',
        ],
        classroomApplications: [
          'Give specific process-oriented feedback ("Your diagram helped clarify the problem") instead of vague fixed labels ("You are smart/weak").',
          'Begin every unit by eliciting students’ prior knowledge and everyday alternative conceptions.',
        ],
        teachingMethods: [
          'Inquiry-Based Learning, Problem-Solving Steps (Identify → Hypothesize → Test → Evaluate)',
          'Cooperative Learning & Experiential Pedagogies (NEP 2020)',
          'Metacognitive reflection journals ("What strategy worked for me today?")',
        ],
        examSpecificFocus: {
          ctet: 'CTET consistently tests Cognition-Emotion interdependence, errors as windows to thinking, Mastery vs. Performance goals, Metacognition, and NEP 2020 (5+3+3+4, FLN, Holistic Progress Card).',
          mahaTet: 'MAHA TET frequently tests Thorndike’s 3 Primary Laws of Learning, Pavlov (Classical) vs. Skinner (Operant) Conditioning, Bandura’s Observational Learning, Maslow’s Hierarchy, and RTE Act 2009 provisions.',
        },
        importantExamPoints: [
          'Cognition and Emotions are INTERDEPENDENT / INTERTWINED (never independent).',
          'Children’s errors are valuable insights into their thinking — NEVER punish or ignore them.',
          'RTE Act 2009: Free & compulsory education for 6–14 years (Article 21A); PTR 30:1 (Primary), 35:1 (Upper Primary); Zero corporal punishment.',
          'NEP 2020 replaces 10+2 with 5+3+3+4 and promotes experiential, competency-based, multilingual learning.',
          'Thorndike’s 3 Primary Laws: Law of Readiness, Law of Exercise, Law of Effect.',
        ],
        commonMistakes: [
          'Selecting "Cognition and emotion are completely separate" — this is a classic CTET trap.',
          'Recommending external candy/prizes or competitive ranking as the best way to motivate students.',
          'Blaming the child’s family or "low IQ" when asked why children fail in school.',
        ],
        topicSummary:
          'Children learn deeply when treated as curious problem solvers in emotionally secure classrooms that value their errors, foster intrinsic mastery motivation, and uphold RTE 2009, NCF 2005, and NEP 2020.',
        revisionPoints: [
          'Errors = Windows into student thinking, not signs of inability.',
          'Cognition & Emotions are deeply intertwined; anxiety hinders working memory.',
          'Intrinsic Mastery Motivation > Extrinsic Reward/Fear Motivation.',
          'Thorndike: Readiness, Exercise, Effect; Bruner: Enactive → Iconic → Symbolic.',
          'RTE 2009 (6–14 yrs, Art. 21A); NEP 2020 (5+3+3+4, FLN, Mother-tongue up to Std 5).',
        ],
        practiceQuestions: [
          {
            id: 'cdp-u5-en-q1',
            question: 'How should a constructivist teacher interpret recurring errors made by students in mathematics or science?',
            options: [
              'As evidence of permanent low intelligence requiring strict punishment',
              'As meaningless carelessness that should be ignored immediately',
              'As valuable diagnostic windows revealing students’ current thinking strategies',
              'As proof that students should memorize answers silently',
            ],
            correctAnswer: 2,
            explanation:
              'In constructivist pedagogy, students’ errors reveal their underlying logic and alternative conceptions, guiding targeted diagnostic and remedial teaching.',
            topicReference: 'Unit 5 — Alternative Conceptions & Children’s Errors',
          },
          {
            id: 'cdp-u5-en-q2',
            question: 'Which statement accurately describes the relationship between cognition and emotions in learning?',
            options: [
              'Emotions and cognition operate independently in separate compartments.',
              'High anxiety significantly improves complex problem solving.',
              'Cognition and emotions are closely intertwined; emotional safety supports deeper learning.',
              'Teachers should eliminate all emotions from the classroom.',
            ],
            correctAnswer: 2,
            explanation:
              'Neuroscience and educational psychology show that cognition and emotions are deeply interdependent: positive curiosity supports attention and memory, while fear impairs processing.',
            topicReference: 'Unit 5 — Cognition and Emotions',
          },
          {
            id: 'cdp-u5-en-q3',
            question: 'Under the National Education Policy (NEP) 2020, what is the newly prescribed curricular and pedagogical structure replacing the 10+2 system?',
            options: ['5 + 3 + 3 + 4', '4 + 4 + 2 + 2', '6 + 3 + 3 + 2', '3 + 5 + 4 + 2'],
            correctAnswer: 0,
            explanation:
              'NEP 2020 introduces the 5+3+3+4 structure: Foundational (5 yrs), Preparatory (3 yrs), Middle (3 yrs), and Secondary (4 yrs).',
            topicReference: 'Unit 5 — NEP 2020 & Policy Frameworks',
          },
        ],
      },
      Marathi: {
        documentTitle: 'बालकांचे चिंतन व अध्ययन, चुकांचे महत्त्व, बोधन-भावना, प्रेरणा आणि NEP 2020 / RTE 2009',
        unitTitle: 'घटक ५: अध्ययन प्रक्रिया, प्रेरणा, भावना व शैक्षणिक धोरणे',
        topicTitle: 'समस्या निराकरण, पर्यायी संकल्पना, प्रेरणा, बोधन-भावना व NEP 2020',
        subtopics: [
          'मुले कसे विचार करतात व शिकतात; बालक एक समस्या-निराकर्ता व लहान शास्त्रज्ञ',
          'पर्यायी संकल्पना (Alternative Conceptions) व विद्यार्थ्यांच्या चुकांचे शैक्षणिक महत्त्व',
          'बोधन व भावना यांचा परस्परसंबंध आणि आंतरिक विरुद्ध बाह्य प्रेरणा',
          'प्रमुख शैक्षणिक धोरणे: RTE कायदा २००९, NCF २००५ व राष्ट्रीय शैक्षणिक धोरण NEP २०२० (५+३+३+४)',
        ],
        introduction:
          'विद्यार्थी वर्गात चूक केल्यावर, घाबरल्यावर किंवा अभ्यासातील रस कमी झाल्यावर शिक्षकाने कसा प्रतिसाद द्यावा याचे मूल्यमापन या घटकात केले जाते. RTE २००९, NCF २००५ व NEP २०२० या धोरणांवरील प्रश्न दोन्ही परीक्षांत महत्त्वाचे आहेत.',
        meaningAndDefinition:
          'अध्ययन (Learning) म्हणजे सक्रिय अनुभव व सरावातून वर्तन आणि विचारांमध्ये होणारा तुलनेने कायमस्वरूपी बदल. पर्यायी संकल्पना म्हणजे शालेय शिक्षणापूर्वी मुलांनी स्वतःच्या अनुभवातून तयार केलेल्या तर्कसंगत समजुती. प्रेरणा (Motivation) म्हणजे उद्दिष्टपूर्ण अध्ययनाला चालना व दिशा देणारी आंतरिक किंवा बाह्य शक्ती.',
        detailedExplanation: [
          'मुले शाळेत "अपयशी" का ठरतात?: बालकेंद्रित शिक्षणशास्त्र मानते की मुलाचे अपयश हे त्याच्या बुद्धिमत्तेचा दोष नसून ती लवचिक नसलेली अभ्यासक्रम रचना, कंटाळवाण्या पद्धती व भावनिक अडथळे यांचे अपयश आहे.',
          'विद्यार्थ्यांच्या चुकांचे महत्त्व: चुका म्हणजे निष्काळजीपणा नव्हे, तर त्या विद्यार्थ्याची विचारपद्धती समजून घेण्याची मौल्यवान खिडकी आहेत. शिक्षकाने शिक्षा न करता चुकांचे विश्लेषण करून उपचारात्मक मार्गदर्शन करावे.',
          'बोधन (Cognition) आणि भावना (Emotions) यांचा घनिष्ठ संबंध: सुरक्षित व आनंदी वातावरण स्मरणशक्ती व विचारशक्ती वाढवते; याउलट भीती, अपमान व परीक्षेची तीव्र चिंता विचारप्रक्रिया खुंटवते.',
          'आंतरिक प्रेरणा (कुतूहल, आवड व प्रभुत्व मिळवण्याची इच्छा) ही बाह्य प्रेरणेपेक्षा (बक्षिसे, गुण किंवा शिक्षेची भीती) अधिक दीर्घकाळ टिकणारी व प्रभावी असते. मॅस्लोच्या गरजांच्या श्रेणीनुसार शारीरिक व सुरक्षिततेच्या गरजा पूर्ण झाल्याशिवाय उच्च अध्ययन घडत नाही.',
          'शैक्षणिक धोरणे: RTE कायदा २००९ (कलम २१-अ) ६ ते १४ वयोगटासाठी मोफत व सक्तीचे शिक्षण, प्राथमिक स्तरावर ३०:१ व उच्च प्राथमिक ३५:१ शिक्षक-विद्यार्थी प्रमाण आणि शारीरिक शिक्षेवर बंदी घालतो. NEP २०२० ने ५+३+३+४ रचना (पायाभूत ५, पूर्वतयारी ३, मध्य ३, माध्यमिक ४), मूलभूत साक्षरता व संख्याज्ञान (FLN — निपुण भारत) आणि इयत्ता ५ वी पर्यंत मातृभाषा/प्रादेशिक भाषा माध्यम सुचवले आहे.',
        ],
        importantConcepts: [
          'अधिबोधन / परासंज्ञान (Metacognition): "स्वतःच्या विचारांवर विचार करणे" — स्वतःच्या शिकण्याच्या पद्धतीचे नियोजन व मूल्यमापन.',
          'थॉर्नडाईकचे अध्ययनाचे ३ प्रमुख नियम: तयारीचा नियम (Readiness), सरावाचा नियम (Exercise) व परिणामाचा नियम (Effect).',
          'ब्रुनरचे ३ प्रतिनिधित्व टप्पे: कृतिरूप (Enactive) → चित्ररूप (Iconic) → प्रतीकरूप (Symbolic).',
          'NEP २०२० ५+३+३+४: पायाभूत (३–८ वर्षे), पूर्वतयारी (८–११ वर्षे / इ. ३–५), मध्य (११–१४ वर्षे / इ. ६–८), माध्यमिक (१४–१८ वर्षे / इ. ९–१२).',
        ],
        comparisonTable: {
          caption: 'आंतरिक प्रेरणा विरुद्ध बाह्य प्रेरणा',
          headers: ['घटक', 'आंतरिक प्रेरणा (सर्वोत्तम)', 'बाह्य प्रेरणा (मर्यादित)'],
          rows: [
            ['स्रोत', 'स्वतःचे कुतूहल, आवड व समजून घेण्याची इच्छा', 'बक्षिसे, गुण, कौतुक किंवा शिक्षेची भीती'],
            ['टिकाऊपणा', 'दीर्घकालीन व स्वयं-संचालित', 'बक्षीस थांबताच उत्साह कमी होतो'],
            ['सर्जनशीलतेवरील प्रभाव', 'सखोल अन्वेषण व नवकल्पना वाढवते', 'केवळ गुणांपुरते मर्यादित प्रयत्न'],
          ],
        },
        importantPrinciples: [
          'प्रत्येक बालकाला "लहान वैज्ञानिक शोधकर्ता" मानून प्रश्न विचारण्यास प्रोत्साहन द्यावे.',
          'शालेय ज्ञान बाहेरच्या दैनंदिन जीवनाशी जोडावे (NCF २००५ चे मूळ तत्त्व).',
          'पर्यायी संकल्पनांचा आदर करून प्रयोगांद्वारे योग्य वैज्ञानिक समज विकसित करावी.',
        ],
        keyThinkers: [
          { name: 'अब्राहम मॅस्लो', contribution: 'गरजांची श्रेणी (शारीरिक → सुरक्षितता → प्रेम/आपलेपणा → सन्मान → आत्मसाक्षात्कार).' },
          { name: 'अल्बर्ट बांडुरा', contribution: 'सामाजिक अध्ययन सिद्धांत (निरीक्षण अध्ययन / अनुकरण व आत्म-क्षमता).' },
          { name: 'थॉर्नडाईक, पावलॉव्ह व स्किनर', contribution: 'प्रयत्न-प्रमाद व ३ नियम (थॉर्नडाईक), अभिजात अभिसंधान (पावलॉव्ह), साधक अभिसंधान (स्किनर).' },
          { name: 'जेरोम ब्रुनर', contribution: 'शोध अध्ययन, सर्पिलाकार अभ्यासक्रम व ३ प्रतिनिधित्व टप्पे.' },
        ],
        practicalExamples: [
          'इयत्ता तिसरीचा विद्यार्थी १/२ + १/३ = २/५ असे लिहितो तेव्हा शिक्षकाने रागावण्याऐवजी त्यामागील तर्क ओळखून कागदाच्या पट्ट्यांद्वारे अपूर्णांकाची समछेद संकल्पना स्पष्ट करावी.',
          'वर्गात भीतीमुक्त संवाद ठेवल्याने किशोरावस्थेतील विद्यार्थी (पेपर २) मोकळेपणाने शंका विचारतात व त्यांची विचारक्षमता सुधारते.',
        ],
        classroomApplications: [
          'प्रत्येक नवीन पाठ सुरू करण्यापूर्वी विद्यार्थ्यांचे पूर्वज्ञान व दैनंदिन अनुभव जाणून घ्यावेत.',
          'विद्यार्थ्यांच्या प्रयत्नांचे व रणनीतीचे कौतुक करावे, केवळ गुणांचे नव्हे.',
        ],
        teachingMethods: [
          'समस्या निराकरण पद्धती व शोध अध्ययन',
          'अनुभवजन्य व कृतियुक्त अध्यापन (NEP २०२०)',
          'स्व-चिंतन नोंदवही (अधिबोधन विकास)',
        ],
        examSpecificFocus: {
          ctet: 'CTET मध्ये बोधन-भावना परस्परसंबंध, चुकांचे निदानात्मक महत्त्व, आंतरिक प्रेरणा, अधिबोधन व NEP २०२० (५+३+३+४, FLN) यांवर सातत्याने प्रश्न येतात.',
          mahaTet: 'MAHA TET मध्ये थॉर्नडाईकचे अध्ययनाचे नियम, पावलॉव्ह विरुद्ध स्किनर अभिसंधान, बांडुराचे निरीक्षण अध्ययन, मॅस्लोची श्रेणी व RTE कायदा २००९ च्या तरतुदी विचारल्या जातात.',
        },
        importantExamPoints: [
          'बोधन व भावना एकमेकांशी घट्ट जोडलेल्या (Interdependent) असतात.',
          'विद्यार्थ्यांच्या चुका या त्यांच्या विचारप्रक्रियेच्या निदानात्मक खिडक्या असतात.',
          'RTE २००९: ६–१४ वयोगट मोफत शिक्षण (कलम २१-अ), प्राथमिक ३०:१ व उच्च प्राथमिक ३५:१ प्रमाण, शारीरिक शिक्षेस बंदी.',
          'NEP २०२०: ५+३+३+४ रचना, निपुण भारत (FLN), समग्र प्रगती पत्रक (३६०°).',
        ],
        commonMistakes: [
          'बोधन व भावना स्वतंत्र असतात असा चुकीचा पर्याय निवडणे.',
          'विद्यार्थ्यांना प्रेरित करण्यासाठी बक्षिसे किंवा स्पर्धात्मक क्रमवारी सर्वोत्तम मानणे.',
          'मुलांच्या अपयशासाठी फक्त त्यांच्या बुद्धीला दोष देणे.',
        ],
        topicSummary:
          'भावनिकदृष्ट्या सुरक्षित, भयमुक्त आणि आंतरिक प्रेरणा देणाऱ्या वर्गात मुले चुकांतून शिकत प्रभावी समस्या-निराकर्ते बनतात. RTE २००९, NCF २००५ व NEP २०२० या धोरणांनी याच बालकेंद्रित दृष्टिकोनाला कायदेशीर व शैक्षणिक बळ दिले आहे.',
        revisionPoints: [
          'चुका = विद्यार्थ्याची विचारपद्धती समजण्याचे साधन.',
          'बोधन व भावना परस्परपूरक; भीतीमुळे अध्ययन मंदावते.',
          'आंतरिक प्रेरणा > बाह्य बक्षीस/भीती.',
          'थॉर्नडाईक: तयारी, सराव, परिणाम; ब्रुनर: कृतिरूप → चित्ररूप → प्रतीकरूप.',
          'RTE २००९ (६–१४ वर्षे, कलम २१-अ); NEP २०२० (५+३+३+४, FLN).',
        ],
        practiceQuestions: [
          {
            id: 'cdp-u5-mr-q1',
            question: 'ज्ञानरचनावादी शिक्षकाने विद्यार्थ्यांच्या गणित किंवा विज्ञानातील चुकांकडे कसे पाहावे?',
            options: [
              'कमी बुद्धिमत्तेचा पुरावा मानून कडक शिक्षा करावी.',
              'चुकांकडे पूर्णपणे दुर्लक्ष करावे.',
              'विद्यार्थ्याची विचारपद्धती समजून घेणारी निदानात्मक खिडकी मानून मार्गदर्शन करावे.',
              'पाठांतर वाढवण्यास सांगावे.',
            ],
            correctAnswer: 2,
            explanation:
              'चुका विद्यार्थ्यांच्या वर्तमान विचारपद्धती व पर्यायी संकल्पना दाखवतात, ज्यांच्या आधारे योग्य उपचारात्मक अध्यापन करता येते.',
            topicReference: 'घटक ५ — विद्यार्थ्यांच्या चुका व पर्यायी संकल्पना',
          },
          {
            id: 'cdp-u5-mr-q2',
            question: 'अध्ययनात बोधन (Cognition) आणि भावना (Emotions) यांचा संबंध कसा असतो?',
            options: [
              'ते एकमेकांपासून पूर्णपणे स्वतंत्र असतात.',
              'तीव्र भीतीमुळे समस्या निराकरण अधिक चांगले होते.',
              'ते परस्परांवर अवलंबून असून भावनिक सुरक्षितता सखोल अध्ययनास मदत करते.',
              'वर्गात भावनांना कोणतेही स्थान नसावे.',
            ],
            correctAnswer: 2,
            explanation:
              'बोधन आणि भावना परस्परसंबंधित असतात; सकारात्मक कुतूहल व सुरक्षित वातावरण स्मरणशक्ती व तर्कशक्ती वाढवते.',
            topicReference: 'घटक ५ — बोधन व भावना',
          },
          {
            id: 'cdp-u5-mr-q3',
            question: 'राष्ट्रीय शैक्षणिक धोरण (NEP) २०२० ने जुन्या १०+२ संरचनेऐवजी कोणती नवीन शैक्षणिक रचना सुचवली आहे?',
            options: ['५ + ३ + ३ + ४', '४ + ४ + २ + २', '६ + ३ + ३ + २', '३ + ५ + ४ + २'],
            correctAnswer: 0,
            explanation:
              'NEP २०२० मध्ये पायाभूत (५), पूर्वतयारी (३), मध्य (३) आणि माध्यमिक (४) अशी ५+३+३+४ रचना स्वीकारली आहे.',
            topicReference: 'घटक ५ — NEP २०२०',
          },
        ],
      },
      Hindi: {
        documentTitle: 'बच्चे कैसे सोचते व सीखते हैं, त्रुटियाँ, संज्ञान-संवेग, अभिप्रेरणा एवं NEP 2020 / RTE 2009',
        unitTitle: 'इकाई 5: अधिगम प्रक्रिया, अभिप्रेरणा, संवेग एवं शिक्षा नीतियाँ',
        topicTitle: 'समस्या-समाधान, वैकल्पिक अवधारणाएँ, अभिप्रेरणा, संज्ञान-संवेग एवं NEP 2020',
        subtopics: [
          'बच्चे कैसे सोचते व सीखते हैं; समस्या-समाधानकर्ता एवं वैज्ञानिक अन्वेषक के रूप में बालक',
          'वैकल्पिक अवधारणाएँ तथा बच्चों की त्रुटियों का निदानात्मक महत्व',
          'संज्ञान और संवेग का अंतर्संबंध तथा आंतरिक बनाम बाह्य अभिप्रेरणा',
          'प्रमुख शिक्षा नीतियाँ: RTE अधिनियम 2009, NCF 2005 तथा NEP 2020 (5+3+3+4, FLN, समग्र प्रगति पत्र)',
        ],
        introduction:
          'यह इकाई परीक्षा में यह जाँचती है कि जब कोई विद्यार्थी त्रुटि करता है, चिंता अनुभव करता है या रुचि खो देता है तो शिक्षक किस प्रकार संवेदनशील व वैज्ञानिक ढंग से प्रतिक्रिया देता है। साथ ही RTE 2009, NCF 2005 और NEP 2020 से सीधे प्रश्न पूछे जाते हैं।',
        meaningAndDefinition:
          'अधिगम (Learning) सक्रिय अनुभव व अभ्यास के फलस्वरूप व्यवहार और समझ में आने वाला अपेक्षाकृत स्थायी परिवर्तन है। वैकल्पिक अवधारणाएँ वे तर्कसंगत पूर्व-धारणाएँ हैं जो बच्चे दैनिक अनुभवों से बनाते हैं। अभिप्रेरणा (Motivation) वह आंतरिक या बाह्य शक्ति है जो सीखने को प्रारंभ, निर्देशित और निरंतर बनाए रखती है।',
        detailedExplanation: [
          'बच्चे विद्यालय में "असफल" क्यों होते हैं?: बाल-केंद्रित शिक्षाशास्त्र के अनुसार बच्चे की असफलता व्यवस्था की असफलता है—कठोर पाठ्यक्रम, नीरस शिक्षण विधियाँ या असुरक्षित वातावरण इसके कारण हैं, न कि बच्चे की जन्मजात कमी।',
          'त्रुटियों का महत्व: बच्चों की गलतियाँ उनकी लापरवाही नहीं बल्कि उनकी वर्तमान चिंतन प्रक्रिया को समझने की खिड़की हैं। शिक्षक को दंड के बजाय त्रुटि-विश्लेषण कर उपचारात्मक शिक्षण देना चाहिए।',
          'संज्ञान (Cognition) और संवेग (Emotions) परस्पर अंतर्संबंधित हैं: भय, अपमान व अत्यधिक चिंता कार्यशील स्मृति को बाधित करते हैं, जबकि जिज्ञासा, आनंद और सुरक्षा की भावना गहन अधिगम को बढ़ावा देती है।',
          'आंतरिक अभिप्रेरणा (जिज्ञासा, दक्षता व सीखने का आनंद) बाह्य अभिप्रेरणा (अंक, पुरस्कार या दंड का भय) की तुलना में कहीं अधिक स्थायी होती है। मैस्लो के आवश्यकता पदानुक्रम के अनुसार शारीरिक व सुरक्षा की आवश्यकता पूरी होने पर ही उच्च अधिगम संभव है।',
          'प्रमुख नीतियाँ: RTE अधिनियम 2009 (अनुच्छेद 21A) 6–14 वर्ष के बच्चों को निःशुल्क एवं अनिवार्य शिक्षा, प्राथमिक में 30:1 व उच्च प्राथमिक में 35:1 शिक्षक-छात्र अनुपात तथा शारीरिक दंड पर पूर्ण प्रतिबंध लगाता है। NEP 2020 में 5+3+3+4 संरचना (बुनियादी 5, प्रारंभिक 3, मध्य 3, माध्यमिक 4), बुनियादी साक्षरता व संख्याज्ञान (FLN — निपुण भारत) और कक्षा 5 तक मातृभाषा/स्थानीय भाषा माध्यम पर बल दिया गया है।',
        ],
        importantConcepts: [
          'अधिसंज्ञान (Metacognition): "अपने चिंतन के बारे में चिंतन" — सीखने की रणनीति की स्वयं निगरानी व मूल्यांकन।',
          'थॉर्नडाइक के 3 मुख्य अधिगम नियम: तत्परता का नियम, अभ्यास का नियम एवं प्रभाव का नियम।',
          'ब्रूनर के 3 प्रतिनिधित्व स्तर: क्रियात्मक (Enactive) → प्रतिबिंबात्मक (Iconic) → संकेतात्मक (Symbolic)।',
          'NEP 2020 संरचना: बुनियादी (3–8 वर्ष), प्रारंभिक (8–11 वर्ष / कक्षा 3–5), मध्य (11–14 वर्ष / कक्षा 6–8), माध्यमिक (14–18 वर्ष / कक्षा 9–12)।',
        ],
        comparisonTable: {
          caption: 'आंतरिक अभिप्रेरणा बनाम बाह्य अभिप्रेरणा',
          headers: ['पक्ष', 'आंतरिक अभिप्रेरणा (श्रेष्ठ)', 'बाह्य अभिप्रेरणा (सीमित)'],
          rows: [
            ['स्रोत', 'जिज्ञासा, रुचि, दक्षता और सीखने का आनंद', 'पुरस्कार, अंक, प्रशंसा या दंड का भय'],
            ['स्थायित्व', 'दीर्घकालिक एवं स्व-प्रेरित', 'बाह्य पुरस्कार हटते ही कम हो जाती है'],
            ['सृजनात्मकता पर प्रभाव', 'गहन खोज और मौलिक चिंतन बढ़ाती है', 'केवल न्यूनतम लक्ष्य तक सीमित रखती है'],
          ],
        },
        importantPrinciples: [
          'बच्चे को सक्रिय "वैज्ञानिक अन्वेषक" मानकर प्रश्न पूछने व प्रयोग करने का अवसर दें।',
          'ज्ञान को विद्यालय के बाहर के जीवन से जोड़ें (NCF 2005 का प्रमुख मार्गदर्शक सिद्धांत)।',
          'वैकल्पिक अवधारणाओं का सम्मान करते हुए प्रयोगों द्वारा सही वैज्ञानिक समझ विकसित करें।',
        ],
        keyThinkers: [
          { name: 'अब्राहम मैस्लो', contribution: 'आवश्यकता पदानुक्रम सिद्धांत (शारीरिक → सुरक्षा → प्रेम/अपनत्व → सम्मान → आत्म-सिद्धि)।' },
          { name: 'अल्बर्ट बंडूरा', contribution: 'सामाजिक अधिगम सिद्धांत (अवलोकनात्मक अधिगम / मॉडलिंग एवं आत्म-प्रभावकारिता)।' },
          { name: 'थॉर्नडाइक, पावलॉव एवं स्किनर', contribution: 'प्रयत्न-त्रुटि व 3 नियम (थॉर्नडाइक), शास्त्रीय अनुबंधन (पावलॉव) तथा क्रियाप्रसूत अनुबंधन (स्किनर)।' },
          { name: 'जेरोम ब्रूनर', contribution: 'खोज अधिगम, सर्पिल पाठ्यक्रम एवं 3 प्रतिनिधित्व अवस्थाएँ।' },
        ],
        practicalExamples: [
          'यदि कक्षा 3 का छात्र 1/2 + 1/3 = 2/5 लिखता है तो शिक्षक डाँटने के बजाय उसके तर्क को समझकर कागज की पट्टियों से भिन्न जोड़ना सिखाते हैं।',
          'भयमुक्त व सम्मानजनक कक्षा में उच्च प्राथमिक (पेपर 2) के किशोर छात्र निस्संकोच अपने विचार रखते हैं जिससे उनका संज्ञानात्मक विकास तेज होता है।',
        ],
        classroomApplications: [
          'नया अध्याय प्रारंभ करते समय छात्रों के पूर्वज्ञान और वैकल्पिक अवधारणाओं को अवश्य जानें।',
          'अंकों के बजाय प्रयास, रणनीति और सुधार पर केंद्रित प्रतिपुष्टि (Feedback) दें।',
        ],
        teachingMethods: [
          'समस्या-समाधान विधि एवं अन्वेषण आधारित शिक्षण',
          'अनुभवात्मक एवं दक्षता-आधारित शिक्षण (NEP 2020)',
          'अधिसंज्ञानात्मक चिंतन डायरी',
        ],
        examSpecificFocus: {
          ctet: 'CTET में संज्ञान-संवेग संबंध, त्रुटियों का महत्व, दक्षता बनाम प्रदर्शन लक्ष्य, अधिसंज्ञान और NEP 2020 (5+3+3+4, FLN) से नियमित प्रश्न पूछे जाते हैं।',
          mahaTet: 'MAHA TET में थॉर्नडाइक के अधिगम नियम, पावलॉव बनाम स्किनर अनुबंधन, बंडूरा का अवलोकन अधिगम, मैस्लो का पदानुक्रम और RTE 2009 प्रावधान प्रमुख हैं।',
        },
        importantExamPoints: [
          'संज्ञान और संवेग एक-दूसरे से गहराई से जुड़े (अंतर्संबंधित) होते हैं।',
          'बच्चों की त्रुटियाँ उनके चिंतन की सार्थक झलक हैं—इन्हें कभी दंडित न करें।',
          'RTE 2009: 6–14 वर्ष निःशुल्क अनिवार्य शिक्षा (अनुच्छेद 21A), शिक्षक-छात्र अनुपात 30:1 (प्राथमिक) व 35:1 (उच्च प्राथमिक)।',
          'NEP 2020: 5+3+3+4 संरचना, निपुण भारत (FLN), 360-डिग्री समग्र प्रगति पत्र।',
        ],
        commonMistakes: [
          'संज्ञान और संवेग को एक-दूसरे से स्वतंत्र मान लेना।',
          'पुरस्कार या प्रतिस्पर्धी रैंकिंग को सर्वश्रेष्ठ अभिप्रेरणा विकल्प चुनना।',
          'असफलता के लिए छात्र की जन्मजात योग्यता को दोषी ठहराना।',
        ],
        topicSummary:
          'भावनिक सुरक्षा, आंतरिक अभिप्रेरणा और त्रुटियों के रचनात्मक उपयोग से बच्चे प्रभावी समस्या-समाधानकर्ता बनते हैं। RTE 2009, NCF 2005 और NEP 2020 इसी बाल-केंद्रित शिक्षण को सुदृढ़ करते हैं।',
        revisionPoints: [
          'त्रुटियाँ = छात्र के चिंतन को समझने की निदानात्मक खिड़की।',
          'संज्ञान एवं संवेग अंतर्संबंधित हैं; भय सीखने में बाधा डालता है।',
          'आंतरिक अभिप्रेरणा > बाह्य पुरस्कार/दंड।',
          'थॉर्नडाइक: तत्परता, अभ्यास, प्रभाव; ब्रूनर: क्रियात्मक → प्रतिबिंबात्मक → संकेतात्मक।',
          'RTE 2009 (6–14 वर्ष, अनुच्छेद 21A); NEP 2020 (5+3+3+4, FLN)।',
        ],
        practiceQuestions: [
          {
            id: 'cdp-u5-hi-q1',
            question: 'एक रचनावादी शिक्षक को गणित या विज्ञान में छात्रों द्वारा की जाने वाली त्रुटियों को किस रूप में देखना चाहिए?',
            options: [
              'कम बुद्धि का प्रमाण मानकर कठोर दंड देना चाहिए।',
              'अर्थहीन लापरवाही मानकर अनदेखा करना चाहिए।',
              'विद्यार्थियों की चिंतन प्रक्रिया समझने की निदानात्मक खिड़की के रूप में।',
              'रटकर याद कराने की आवश्यकता के रूप में।',
            ],
            correctAnswer: 2,
            explanation:
              'बच्चों की त्रुटियाँ उनकी वर्तमान तर्क-प्रणाली और वैकल्पिक अवधारणाओं को प्रकट करती हैं, जिससे शिक्षक सही उपचारात्मक सहायता दे सकता है।',
            topicReference: 'इकाई 5 — त्रुटियाँ एवं वैकल्पिक अवधारणाएँ',
          },
          {
            id: 'cdp-u5-hi-q2',
            question: 'अधिगम में संज्ञान और संवेग के बीच संबंध के विषय में कौन-सा कथन सही है?',
            options: [
              'संवेग और संज्ञान एक-दूसरे से पूर्णतः स्वतंत्र हैं।',
              'अत्यधिक चिंता समस्या-समाधान क्षमता को बेहतर बनाती है।',
              'संज्ञान और संवेग परस्पर जुड़े हैं; भावनात्मक सुरक्षा गहन अधिगम में सहायक है।',
              'कक्षा में संवेगों का कोई स्थान नहीं होना चाहिए।',
            ],
            correctAnswer: 2,
            explanation:
              'संज्ञान और संवेग गहराई से अंतर्संबंधित हैं—सकारात्मक जिज्ञासा व सुरक्षा सीखने को बढ़ाती है जबकि डर व तनाव स्मृति को बाधित करते हैं।',
            topicReference: 'इकाई 5 — संज्ञान और संवेग',
          },
          {
            id: 'cdp-u5-hi-q3',
            question: 'राष्ट्रीय शिक्षा नीति (NEP) 2020 ने पुरानी 10+2 प्रणाली के स्थान पर किस नई संरचना की अनुशंसा की है?',
            options: ['5 + 3 + 3 + 4', '4 + 4 + 2 + 2', '6 + 3 + 3 + 2', '3 + 5 + 4 + 2'],
            correctAnswer: 0,
            explanation:
              'NEP 2020 में बुनियादी (5), प्रारंभिक (3), मध्य (3) तथा माध्यमिक (4) स्तरों की 5+3+3+4 संरचना प्रस्तावित है।',
            topicReference: 'इकाई 5 — NEP 2020',
          },
        ],
      },
    },
  },
];
