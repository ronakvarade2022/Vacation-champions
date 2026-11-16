import { CuratedTrilingualMcq } from './types';

// Batch 3 CDP Part 6 (32 original trilingual items; 0 overlap with B1/B2 or Parts 1–5)
export const MAHA_TET_P1_B3_CDP_PART6: CuratedTrilingualMcq[] = [
  {
    topic: 'Bruner Modes – Enactive to Iconic to Symbolic',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Teaching weight measurement by first having pupils heft real rice bags, next draw balance beam pictures, and finally record "500 g + 250 g = 750 g" moves through Jerome Bruner’s exact stages:',
      opts: [
        'Enactive -> Iconic -> Symbolic',
        'Symbolic -> Enactive -> Iconic',
        'Iconic -> Symbolic -> Enactive',
        'Abstract -> Punitive -> Passive',
      ],
      exp: 'Action (enactive) grounds mental images (iconic), which anchor formal notation (symbolic).',
    },
    mr: {
      q: 'वजन मापन शिकवताना प्रथम प्रत्यक्ष तांदळाच्या पिशव्या हाताळणे, नंतर तराजूचे चित्र काढणे व शेवटी "५०० ग्रॅ + २५० ग्रॅ = ७५० ग्रॅ" लिहिणे ब्रुनरच्या कोणत्या क्रमाचे पालन करते?',
      opts: [
        'क्रियात्मक (Enactive) -> चित्रात्मक (Iconic) -> चिन्हात्मक (Symbolic)',
        'चिन्हात्मक -> क्रियात्मक -> चित्रात्मक',
        'चित्रात्मक -> चिन्हात्मक -> क्रियात्मक',
        'अमूर्त -> दंडात्मक -> निष्क्रिय',
      ],
      exp: 'प्रत्यक्ष कृतीपासून चित्राकडे व पुढे चिन्ह-समीकरणाकडे जाणे नैसर्गिक ठरते.',
    },
    hi: {
      q: 'भार मापन सिखाने में पहले चावल की थैलियाँ तौलना, फिर तराजू का चित्र बनाना व अंत में "५०० ग्रा + २५० ग्रा = ७५० ग्रा" लिखना ब्रूनर के किस क्रम का पालन है?',
      opts: [
        'क्रियात्मक (Enactive) -> चित्रात्मक (Iconic) -> प्रतीकात्मक (Symbolic)',
        'प्रतीकात्मक -> क्रियात्मक -> चित्रात्मक',
        'चित्रात्मक -> प्रतीकात्मक -> क्रियात्मक',
        'अमूर्त -> दंडात्मक -> निष्क्रिय',
      ],
      exp: 'प्रत्यक्ष क्रिया से दृश्य चित्र और फिर अमूर्त प्रतीकों की ओर बढ़ना ब्रूनर का शिक्षण क्रम है।',
    },
  },
  {
    topic: 'Gagne Hierarchy – Prerequisite Check',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Robert Gagné’s Learning Hierarchy explains that if a Class 4 learner struggles with two-step word problems ("Rule Use / Problem Solving"), the teacher should verify whether earlier prerequisites—like reading facts and single-step operations—are firm because:',
      opts: [
        'higher-order intellectual skills depend cumulatively upon mastered simpler prerequisite rules and concepts',
        'word problems require zero arithmetic skills',
        'prerequisites slow learning down unnecessarily',
        'higher learning precedes signal recognition',
      ],
      exp: 'Gagné ordered learning from simple discrimination -> concrete concept -> defined concept -> rule -> higher problem solving.',
    },
    mr: {
      q: 'रॉबर्ट गॅग्ने यांच्या अध्ययन श्रेणीक्रमानुसार, जर विद्यार्थी दोन-पायरी शाब्दिक उदाहरणे ("समस्या निवारण") सोडवू शकत नसेल, तर शिक्षकाने पूर्वीच्या पायऱ्या का तपासाव्यात?',
      opts: [
        'उच्च स्तरीय समस्या निवारण हे खालच्या सोप्या संकल्पना व नियमांच्या भक्कम पायावरच उभे असते म्हणून',
        'शाब्दिक उदाहरणांत गणिताची गरज नसते म्हणून',
        'पूर्व-पायऱ्या वेळ वाया घालवतात म्हणून',
        'उच्च शिक्षण आधीच घडते म्हणून',
      ],
      exp: 'विभेदन -> संकल्पना -> नियम -> समस्या निवारण असा गॅग्नेचा संचयी विकास क्रम असतो.',
    },
    hi: {
      q: 'रॉबर्ट गैने के अधिगम सोपानिकी के अनुसार यदि छात्र दो-चरणीय इबारती सवाल (समस्या समाधान) में अटक रहा है, तो पहले सरल पूर्व-कौशल क्यों जांचने चाहिए?',
      opts: [
        'उच्च बौद्धिक कौशल नीचे के सरल संप्रत्ययों व नियमों की मजबूत नींव पर ही टिकते हैं',
        'इबारती सवालों में गणित नहीं होता',
        'पूर्व-कौशल समय बर्बाद करते हैं',
        'उच्च कौशल पहले विकसित होता है',
      ],
      exp: 'गैने ने विभेदन -> संप्रत्यय -> नियम -> समस्या समाधान का क्रमिक संचयी क्रम बताया है।',
    },
  },
  {
    topic: 'Peer Scaffolding in Mixed-Language Classrooms',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'A migrant child newly transferred from Karnataka understands spoken Hindi/Kannada better than Marathi textbook terms. Seating her next to a warm bilingual classmate for the first month provides:',
      opts: [
        'gentle peer scaffolding and welcoming cultural transition',
        'academic dishonesty',
        'separation from classroom belonging',
        'permanent refusal to learn Marathi',
      ],
      exp: 'Supportive peer language buddies accelerate both emotional security and vocabulary acquisition.',
    },
    mr: {
      q: 'कर्नाटकातून नव्याने आलेली विद्यार्थिनी मराठी पाठ्यपुस्तकातील कठीण शब्द लगेच समजू शकत नाही. पहिल्या महिन्यात तिला एका प्रेमळ द्वि-भाषिक सहपाठिनीजवळ बसवल्यास काय मिळते?',
      opts: [
        'सहपाठी भाषिक आधार (Peer Scaffolding) आणि सुरक्षित स्वागतशील संक्रमण',
        'शैक्षणिक अप्रामाणिकपणा',
        'वर्गातून वेगळेपणा',
        'मराठी शिकण्यास नकार',
      ],
      exp: 'मित्र-मदतीमुळे नवीन भाषिक वातावरणाची भीती नाहीशी होऊन सहज शिकणे होते.',
    },
    hi: {
      q: 'कर्नाटक से आई नई छात्रा अभी मराठी पाठ्यपुस्तक के कठिन शब्द नहीं समझती। पहले महीने उसे किसी स्नेही द्विभाषी सहपाठी के पास बैठाने से क्या लाभ होगा?',
      opts: [
        'सहपाठी भाषिक पाड़ (Peer Scaffolding) और स्वागतपूर्ण भावनात्मक संक्रमण',
        'शैक्षिक बेईमानी',
        'कक्षा से अलगाव',
        'मराठी सीखने से इनकार',
      ],
      exp: 'सहपाठी मित्र के सहयोग से नया बच्चा सुरक्षित महसूस कर जल्दी नई भाषा सीखता है।',
    },
  },
  {
    topic: 'Learning Curve – Overcoming the Plateau',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'After rapid early gains in reading speed, a pupil’s progress flattens into a temporary horizontal "Learning Plateau" for two weeks. What helpful action moves learning forward again?',
      opts: [
        'Diagnose any flawed habit/fatigue, switch instructional method or phrase-chunking strategy, and offer fresh encouragement',
        'Label the pupil permanently unteachable',
        'Abandon reading lessons completely',
        'Double scolding daily',
      ],
      exp: 'Plateaus often reflect consolidating current sub-skills or needing a higher-order strategy shift.',
    },
    mr: {
      q: 'वाचन वेगात सुरुवातीला जलद प्रगती झाल्यानंतर दोन आठवडे प्रगती स्थिर ("अध्ययन पठार" – Learning Plateau) राहते. पुढे जाण्यासाठी शिक्षकाने काय करावे?',
      opts: [
        'थकवा किंवा जुनी त्रुटी तपासून अध्यापन युक्ती (उदा. शब्दगट वाचन) बदलावी व नवे प्रोत्साहन द्यावे',
        'विद्यार्थ्याला कायमचा अक्षम ठरवावे',
        'वाचन तास बंद करावा',
        'दररोज दुप्पट शिक्षा द्यावी',
      ],
      exp: 'अध्ययन पठार ही तात्पुरती स्थिरावस्था असते; नवीन पद्धतीने ती सहज ओलांडता येते.',
    },
    hi: {
      q: 'पठन गति में प्रारंभिक तेजी के बाद दो सप्ताह तक प्रगति ठहरी हुई ("अधिगम पठार" – Learning Plateau) दिखती है। इसे पार करने हेतु क्या करें?',
      opts: [
        'थकान या पुरानी त्रुटि जांचकर शिक्षण तरीका (जैसे शब्द-समूह पठन) बदलें और नया प्रोत्साहन दें',
        'छात्र को स्थायी अक्षम घोषित करें',
        'पठन बंद कर दें',
        'रोज डांट दोगुनी करें',
      ],
      exp: 'अधिगम पठार एक सामान्य अस्थायी पड़ाव है; विधि परिवर्तन और अभिप्रेरणा से प्रगति पुनः शुरू होती है।',
    },
  },
  {
    topic: 'Convergent Drill vs Open Inquiry Transfer',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Why can pupils who memorize only "Area = l × b" fail when asked "How many square tiles of side 50 cm fit in a 4 m × 3 m room?"?',
      opts: [
        'Rote formula plugging without unit reasoning ("m vs cm") fails on authentic transfer tasks',
        'Rooms have no areas',
        'Tiling uses weight instead of surface',
        '50 cm equals 50 m',
      ],
      exp: 'Conceptual grounding in covering area with square units ensures genuine problem-solving transfer.',
    },
    mr: {
      q: '"क्षेत्रफळ = लांबी × रुंदी" फक्त सूत्र घोकणारे विद्यार्थी "४ मी × ३ मी खोलीत ५० सेमी चौरस फरश्या किती बसतील?" या प्रश्नावर का अडकतात?',
      opts: [
        'चौरस एककांचा अर्थ व एकक रूपांतरण (मी वि. सेमी) न समजता केवळ सूत्र रटल्याने प्रत्यक्ष उपयोजन फसते',
        'खोल्यांना क्षेत्रफळ नसते',
        'फरशीत वजन वापरतात',
        '५० सेमी म्हणजे ५० मी',
      ],
      exp: 'संकल्पनात्मक आकलनाशिवाय केवळ यांत्रिक सूत्रे नवीन संदर्भात लागू पडत नाहीत.',
    },
    hi: {
      q: 'केवल "क्षेत्रफल = लंबाई × चौड़ाई" सूत्र रटने वाले छात्र "४ मी × ३ मी कमरे में ५० सेमी की कितनी वर्गाकार टाइलें लगेंगी?" पर क्यों अटकते हैं?',
      opts: [
        'वर्ग इकाई की समझ और मात्रक परिवर्तन (मी बनाम सेमी) बिना केवल रटा सूत्र वास्तविक अनुप्रयोग में विफल होता है',
        'कमरों का क्षेत्रफल नहीं होता',
        'टाइल में भार मापते हैं',
        '५० सेमी = ५० मी होता है',
      ],
      exp: 'अवधारणात्मक समझ न होने पर रटे हुए सूत्र नई व्यावहारिक समस्याओं में धोखा देते हैं।',
    },
  },
  {
    topic: 'Maslow – Aesthetic & Cognitive Growth Needs',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In Maslow’s expanded Hierarchy of Needs, once physical safety, belonging, and esteem feel stable, what Growth Needs inspire lifelong questioning and art appreciation?',
      opts: [
        'Cognitive (desire to know/understand) and Aesthetic (harmony/beauty) needs moving toward Self-Actualization',
        'Hunger and sleep deprivation',
        'Punitive fear avoidance',
        'Social isolation threats',
      ],
      exp: 'Growth needs strengthen curiosity rather than disappearing when satisfied.',
    },
    mr: {
      q: 'मॅस्लोच्या विस्तारित गरज रचनेनुसार, सुरक्षितता, आपुलकी व स्वाभिमानानंतर आजीवन जिज्ञासा आणि कला-सौंदर्याची ओढ कोणत्या "विकास गरजा" (Growth Needs) जागवतात?',
      opts: [
        'बोधनात्मक (जाणून घेण्याची इच्छा) व सौंदर्यदृष्टी गरजा ज्या स्व-साक्षात्काराकडे नेतात',
        'भूक व झोप कमतरता',
        'शिक्षेची भीती',
        'सामाजिक बहिष्कार',
      ],
      exp: 'कमतरतेच्या गरजा पूर्ण झाल्यावर ज्ञान व सौंदर्याची विकास-भूक अधिक प्रबळ होते.',
    },
    hi: {
      q: 'मास्लो के विस्तारित सोपान में सुरक्षा, अपनत्व व सम्मान के बाद आजीवन जिज्ञासा व कला-सौंदर्य की ललक किन "विकास आवश्यकताओं" (Growth Needs) से आती है?',
      opts: [
        'संज्ञानात्मक (जानने-समझने की इच्छा) व सौंदर्यात्मक आवश्यकताएँ जो आत्म-सिद्धि की ओर ले जाती हैं',
        'भूख व नींद की कमी',
        'दंड का भय',
        'सामाजिक बहिष्कार',
      ],
      exp: 'अभाव संबंधी आवश्यकताएँ पूरी होने पर ज्ञान और सौंदर्य की विकास-आवश्यकताएँ निरंतर बढ़ती हैं।',
    },
  },
  {
    topic: 'Avoiding Tracking / Rigid Streaming Practices',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Moderate',
    en: {
      q: 'Why do contemporary inclusive frameworks discourage permanently locking Class 2 pupils into rigid "Top Section A" vs "Weak Section D" streams?',
      opts: [
        'Rigid early tracking freezes low expectations, cuts off peer role models, and amplifies socio-economic gaps instead of helping children grow',
        'Mixed classrooms make learning impossible',
        'Section D always gets better laboratories',
        'Brain ability never develops after age 7',
      ],
      exp: 'Flexible temporary skill groups inside heterogeneous classes preserve equity and high expectations for all.',
    },
    mr: {
      q: 'इयत्ता दुसरीतील मुलांची "अ-तुकडी हुशार" व "ड-तुकडी मठ्ठ" अशी कायमस्वरूपी विभागणी (Rigid Tracking) का टाळावी?',
      opts: [
        'लहान वयात कडक वर्गवारी केल्यास कमी अपेक्षा स्थिरावतात, मित्र-प्रेरणा संपते आणि सामाजिक दरी वाढते',
        'मिश्र वर्गात शिकवणे अशक्य असते',
        'ड-तुकडीला सर्वोत्तम प्रयोगशाळा मिळते',
        'वयाच्या ७ व्या वर्षानंतर बुद्धी वाढत नाही',
      ],
      exp: 'संपूर्ण संमिश्र वर्गात तात्पुरते गरजेनुरूप छोटे गट करणे कायमस्वरूपी विभागणीपेक्षा कितीतरी न्याय्य असते.',
    },
    hi: {
      q: 'कक्षा २ के बच्चों को स्थायी रूप से "तेज सेक्शन A" बनाम "कमजोर सेक्शन D" में बाँटना (Rigid Tracking) क्यों हतोत्साहित किया जाता है?',
      opts: [
        'कठोर प्रारंभिक वर्गीकरण निम्न अपेक्षाओं को जमा देता है, सहपाठी प्रेरणा छीनता है और असमानता बढ़ाता है',
        'मिश्रित कक्षा में पढ़ाना असंभव है',
        'सेक्शन D को बेहतर प्रयोगशाला मिलती है',
        '७ वर्ष के बाद बुद्धि नहीं बढ़ती',
      ],
      exp: 'विविधतापूर्ण कक्षा में आवश्यकतानुसार अस्थायी लचीले समूह बनाना स्थायी लेबलिंग से कहीं बेहतर है।',
    },
  },
  {
    topic: 'Visual Schedules & Smooth Class Transitions',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Giving a calm "2-minute warning chime" before ending block play to clean up keeps primary rooms peaceful because:',
      opts: [
        'learners finish their thought or tower safely and adjust emotionally before shifting focus',
        'loud sirens train Olympic speed only',
        'children never notice chimes',
        'cleanup becomes homework',
      ],
      exp: 'Predictable transition warnings prevent abrupt frustration meltdowns.',
    },
    mr: {
      q: 'खेळ किंवा गटकाम थांबवून साहित्य आवरण्यापूर्वी २ मिनिटे आधी शांत घंटा-सूचना देण्याने वर्ग शांत का राहतो?',
      opts: [
        'मुलांना स्वतःची कृती सुरक्षित पूर्ण करून भावनिकरीत्या पुढच्या कामासाठी तयार होण्यास वेळ मिळतो',
        'फक्त वेग वाढतो',
        'मुले सूचना ऐकत नाहीत',
        'आवरणे हा गृहपाठ होतो',
      ],
      exp: 'सौम्य पूर्वसूचनेमुळे अचानक काम तोडल्याचा त्रास व गोंधळ टळतो.',
    },
    hi: {
      q: 'ब्लॉक खेल या समूह गतिविधि समेटने से २ मिनट पहले शांत घंटी-संकेत देने से कक्षा शांत क्यों रहती है?',
      opts: [
        'बच्चों को अपना कार्य सुरक्षित समाप्त कर भावनात्मक रूप से अगले कार्य हेतु तैयार होने का समय मिलता है',
        'केवल दौड़ गति बढ़ती है',
        'बच्चे संकेत नहीं सुनते',
        'सफाई गृहकार्य बनती है',
      ],
      exp: 'अप्रत्याशित रोक के बजाय पूर्वानुमेय संक्रमण संकेत चिड़चिड़ाहट व अफरा-तफरी रोकते हैं।',
    },
  },
  {
    topic: 'Constructive Mistakes Culture – "My Favourite Mistake"',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 5 math teacher holds a brief respectful "Clever Mistake Spotlight" (anonymous board slip) showing a common carry-over trap so peers hunt where logic slipped. This practice builds:',
      opts: [
        'analytic error-spotting resilience and zero shame around honest mistakes',
        'public mockery of weak friends',
        'copying wrong calculations blindly',
        'fear of raising hands',
      ],
      exp: 'Normalizing diagnostic analysis of anonymous slips turns mistakes into collective learning fuel.',
    },
    mr: {
      q: 'गणिताची शिक्षिका कोणाचेही नाव न घेता फळ्यावर एक सामान्य हातच्याची चूक दाखवून "यात युक्ती कुठे फसली?" हे मुलांना शोधायला सांगतात. यातून काय घडते?',
      opts: [
        'चुकीची लाज न वाटता अचूक त्रुटी शोधण्याचे चिकित्सक कौशल्य व लवचिकता वाढते',
        'मित्रांवर सार्वजनिक हसणे वाढते',
        'चुकीचे उदाहरण पाठ होते',
        'हात वर करण्याची भीती वाढते',
      ],
      exp: 'नाव गुप्त ठेवून चुकीचे विश्लेषण केल्यास संपूर्ण वर्ग शिकण्याचा धडा घेतो.',
    },
    hi: {
      q: 'गणित शिक्षिका बिना किसी का नाम लिए बोर्ड पर एक आम हासिल त्रुटि दिखाकर पूछती हैं, "यहाँ तर्क कहाँ फिसला?" इससे क्या विकसित होता है?',
      opts: [
        'ईमानदार गलतियों पर शर्म के बिना तार्किक त्रुटि-विश्लेषण क्षमता व मानसिक दृढ़ता',
        'साथियों का सार्वजनिक उपहास',
        'गलत गणना रटना',
        'हाथ उठाने का डर',
      ],
      exp: 'गलतियों का सम्मानजनक व निनामी विश्लेषण पूरी कक्षा की वैचारिक स्पष्टता बढ़ाता है।',
    },
  },
  {
    topic: 'Dual Language / Mother-Tongue Transition Care',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Moderate',
    en: {
      q: 'Why does jumping abruptly in Class 1 into an unfamiliar medium without home-language scaffolding push rural or tribal pupils behind academically?',
      opts: [
        'Children lose comprehension of both language and core subject ideas simultaneously ("subtractive bilingualism")',
        'Rural children prefer silent incomprehensible lectures',
        'Home languages prevent counting numbers',
        'Science only exists in one foreign tongue',
      ],
      exp: 'Additive multilingualism preserves mother-tongue conceptual roots while layering regional and global languages steadily.',
    },
    mr: {
      q: 'इयत्ता पहिलीपासून घरच्या भाषेचा आधार न देता अचानक अपरिचित माध्यमात शिक्षण सुरू केल्यास ग्रामीण व आदिवासी मुले का मागे पडतात?',
      opts: [
        'भाषा आणि विषय संकल्पना या दोन्हींचे आकलन एकाच वेळी तुटते म्हणून',
        'मुलांना न कळणारे व्याख्यान आवडते म्हणून',
        'मातृभाषेत मोजता येत नाही म्हणून',
        'विज्ञान फक्त एका परकीय भाषेतच असते म्हणून',
      ],
      exp: 'मातृभाषेचा भक्कम पाया ठेवून क्रमशः इतर भाषा जोडणे (Additive Multilingualism) यशस्वी ठरते.',
    },
    hi: {
      q: 'कक्षा १ में ही घर की भाषा का सहारा छीनकर एकदम अपरिचित माध्यम में पढ़ाना ग्रामीण व आदिवासी बच्चों को पीछे क्यों धकेल देता है?',
      opts: [
        'बच्चे एक साथ भाषा और मुख्य विषय की समझ दोनों से कट जाते हैं (वियोजक द्विभाषिकता)',
        'बच्चों को न समझ आने वाले व्याख्यान पसंद हैं',
        'मातृभाषा में गिनती नहीं हो सकती',
        'विज्ञान केवल एक विदेशी भाषा में है',
      ],
      exp: 'योगात्मक बहुभाषिकता में मातृभाषा की मजबूत नींव पर धीरे-धीरे अन्य भाषाएँ जोड़ी जाती हैं।',
    },
  },
  {
    topic: 'Concept Maps vs Linear Outlines (Novak)',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Asking Class 5 learners to connect boxes ("Soil -> holds Water -> feeds Roots -> grows Leaves") with labelled relationship arrows forms a Concept Map (Novak) that builds:',
      opts: [
        'meaningful relational integration rather than fragmented isolated fact lists',
        'blind alphabetical memorizing',
        'silent dictation copying',
        'mechanical penmanship drills',
      ],
      exp: 'Labelled propositions linking concepts mirror structured long-term memory networks.',
    },
    mr: {
      q: '"माती -> पाणी धरते -> मुळे शोषतात -> पाने वाढतात" असे संबंध दर्शवणाऱ्या बाणांसह संकल्पना-नकाशा (Concept Map) तयार केल्यास काय घडते?',
      opts: [
        'सुट्या तथ्यांपेक्षा संकल्पनांमधील परस्पर कार्यकारण संबंध अर्थपूर्णरीत्या पक्के होतात',
        'केवळ अकारविल्हे पाठांतर',
        'मूक श्रुतलेखन',
        'केवळ अक्षर वळण',
      ],
      exp: 'जोडलेल्या संबंधांच्या जाळ्यामुळे दीर्घकालीन स्मृतीत संकल्पना संघटित राहतात.',
    },
    hi: {
      q: '"मिट्टी -> जल रोकती है -> जड़ें सोखती हैं -> पत्तियाँ बढ़ती हैं" जैसे संबंध-तीरों के साथ संप्रत्यय मानचित्र (Concept Map) बनाना क्या विकसित करता है?',
      opts: [
        'बिखरे तथ्यों के बजाय अवधारणाओं के बीच अर्थपूर्ण संबंध-एकीकरण',
        'वर्णानुक्रम रटंत',
        'मौन श्रुतलेख',
        'यांत्रिक सुलेख',
      ],
      exp: 'संबंध-लेबल से जुड़ी कड़ियाँ दीर्घकालिक स्मृति का सुसंगत नेटवर्क बनाती हैं।',
    },
  },
  {
    topic: 'Child-Friendly School Environment Indicators',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Easy',
    en: {
      q: 'Clean drinking water, functional separate girls’/boys’ toilets, safe play space, and accessible ramps are non-negotiable RTE school norms chiefly because:',
      opts: [
        'basic health, privacy, dignity, and barrier-free safety directly safeguard regular attendance—especially for girls and disabled children',
        'only school buildings matter without teachers',
        'parents pay extra admission entrance fines',
        'inspectors count paint colours',
      ],
      exp: 'Dignified infrastructure removes practical barriers causing early primary dropout.',
    },
    mr: {
      q: 'स्वच्छ पिण्याचे पाणी, मुली व मुलांसाठी स्वतंत्र स्वच्छतागृहे, खेळाचे मैदान आणि रॅम्प ही RTE मधील शाळा मानके का अनिवार्य आहेत?',
      opts: [
        'आरोग्य, गोपनीयता, सन्मान आणि सुरक्षितता मुली व दिव्यांग मुलांची नियमित उपस्थिती टिकवते म्हणून',
        'शिक्षकांशिवाय फक्त इमारत पुरेशी असते म्हणून',
        'प्रवेश शुल्क आकारता येते म्हणून',
        'केवळ रंग पाहण्यासाठी',
      ],
      exp: 'मूलभूत सुविधांच्या अभावामुळे होणारी शाळा गळती रोखण्यासाठी मानके बंधनकारक आहेत.',
    },
    hi: {
      q: 'स्वच्छ पेयजल, अलग क्रियाशील शौचालय, खेल मैदान व रैंप RTE में अनिवार्य मानक क्यों हैं?',
      opts: [
        'स्वास्थ्य, निजता, सम्मान और बाधा-रहित सुरक्षा विशेषकर बालिकाओं व दिव्यांग बच्चों की नियमित उपस्थिति सुरक्षित करती है',
        'शिक्षकों के बिना केवल भवन काफी है',
        'प्रवेश शुल्क लिया जा सके',
        'केवल रंग जांचने हेतु',
      ],
      exp: 'गरिमापूर्ण बुनियादी सुविधाएँ प्राथमिक स्तर पर ड्रॉपआउट रोकने में निर्णायक होती हैं।',
    },
  },
  {
    topic: 'Preventing Test Anxiety in Primary Quizzes',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Instead of announcing "Sudden Surprise Unit Test — Zero Talk!" with trembling silence, how can a teacher reduce unhealthy test anxiety during checks?',
      opts: [
        'Frame low-stakes checks as helpful learning snapshots, share clear formats beforehand, and celebrate progress over fear',
        'Display a countdown siren magnifying panic',
        'Post failing marks outside the gate',
        'Double difficulty traps unpredictably',
      ],
      exp: 'High test anxiety clogs working memory, masking true student knowledge.',
    },
    mr: {
      q: '"आज अचानक कठीण चाचणी – कोणी बोलले तर शून्य!" अशी भीती घालण्यापेक्षा चाचणीतील अनावश्यक ताण कसा कमी करावा?',
      opts: [
        'चाचणीला सुधारणेचा आरसा मानून स्वरूप आधीच स्पष्ट करणे व भीतीऐवजी प्रगतीचा गौरव करणे',
        'मोठा भोंगा लावून ताण वाढवणे',
        'कमी गुणांची नावे गेटवर लावणे',
        'अकल्पित सापळे रचणे',
      ],
      exp: 'अतीव परीक्षा-भीती कार्यरत स्मृती अवरुद्ध करते; शांत विश्वासात विद्यार्थी खरी क्षमता दाखवतात.',
    },
    hi: {
      q: '"अचानक कठिन परीक्षा — बोले तो शून्य!" कहकर डराने के बजाय शिक्षक परीक्षा चिंता कैसे घटा सकते हैं?',
      opts: [
        'छोटी जांच को सीखने की मददगार तस्वीर बताकर, पहले से स्पष्ट प्रारूप साझा करके और प्रगति को सराहकर',
        'घबराहट वाला सायरन बजाकर',
        'गेट पर कम अंकों की सूची टांगकर',
        'अप्रत्याशित कठिन जाल बिछाकर',
      ],
      exp: 'अत्यधिक चिंता कार्यकारी स्मृति को जाम कर देती है; सहज माहौल में सही क्षमता सामने आती है।',
    },
  },
  {
    topic: 'Multiple-Entry Sensory Learning (Tactile Alphabet)',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Having early learners trace sandpaper letters with two fingers while saying the sound aloud ("/m/") reinforces literacy via:',
      opts: [
        'Multisensory integration (visual + auditory + tactile-kinesthetic pathways)',
        'isolated auditory rote cramming',
        'ignoring letter sounds completely',
        'punitive finger fatigue',
      ],
      exp: 'Orton-Gillingham and Montessori tactile routines aid all beginners and especially dyslexic pupils.',
    },
    mr: {
      q: 'सुरुवातीच्या विद्यार्थ्यांकडून सँडपेपरवरील अक्षरांवर बोट फिरवत त्याचा उच्चार म्हणवून घेण्याचा ("म") मुख्य शैक्षणिक आधार कोणता?',
      opts: [
        'बहुसंवेदी एकत्रीकरण (दृश्य + श्राव्य + स्पर्श व स्नायू स्मृती)',
        'केवळ तोंडी घोकंपट्टी',
        'ध्वनीकडे दुर्लक्ष',
        'बोटांचा थकवा',
      ],
      exp: 'अनेक इंद्रिये एकत्र वापरल्याने अक्षर-ध्वनी जोडणी मेंदूत पक्की ठसते.',
    },
    hi: {
      q: 'प्रारंभिक शिक्षार्थियों से सैंडपेपर अक्षरों पर उंगली फेरते हुए उनकी ध्वनि बुलवाने का मुख्य आधार क्या है?',
      opts: [
        'बहुसंवेदी एकीकरण (दृश्य + श्रव्य + स्पर्श-गामक मार्ग)',
        'केवल मौखिक रटंत',
        'ध्वनियों की अनदेखी',
        'उंगली थकाना',
      ],
      exp: 'एक साथ कई इंद्रियों के प्रयोग से अक्षर-ध्वनि संबंध मस्तिष्क में मजबूती से बैठते हैं।',
    },
  },
  {
    topic: 'Avoiding Gender-Specific Toy / Corner Restrictions',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Ensuring both girls and boys play freely at the building-block engineering corner AND the pretend kitchen/care corner in Balvatika counters:',
      opts: [
        'early spatial vs caregiving gender stereotypes',
        'numeracy acquisition',
        'physical coordination',
        'storytelling listening skills',
      ],
      exp: 'Open access to construction and nurturing corners nurtures spatial thinking and empathy across every child.',
    },
    mr: {
      q: 'बालवाटिकेत ठोकळे-बांधकाम कोपरा आणि घरकुल-काळजी कोपरा या दोन्ही ठिकाणी मुले व मुली दोघांनाही मोकळेपणाने खेळू देणे कशास आळा घालते?',
      opts: [
        'अवकाशीय व संगोपनाशी निगडित सुरुवातीच्या लिंगभाव रूढींना',
        'संख्याज्ञानाला',
        'शारीरिक समन्वयाला',
        'श्रवण कौशल्याला',
      ],
      exp: 'प्रत्येक कोपऱ्यात समान संधी मिळाल्याने सर्व कौशल्यांचा लिंगभेदाशिवाय विकास होतो.',
    },
    hi: {
      q: 'बालवाटिका में निर्माण-ब्लॉक कोने और रसोई-देखभाल कोने दोनों पर लड़कों व लड़कियों को समान रूप से खेलने देना किसे तोड़ता है?',
      opts: [
        'स्थानिक व देखभाल कौशल से जुड़ी प्रारंभिक लैंगिक रूढ़ियों को',
        'संख्या-ज्ञान को',
        'शारीरिक समन्वय को',
        'श्रवण कौशल को',
      ],
      exp: 'हर गतिविधि क्षेत्र में समान पहुँच सभी बच्चों में स्थानिक तर्क व संवेदनशीलता दोनों पोषित करती है।',
    },
  },
  {
    topic: 'Proactive Classroom Management (Kounin "Withitness")',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Jacob Kounin coined "Withitness" for effective teachers who catch small off-task ripples early with a quiet glance or proximity step before chaos erupts—demonstrating:',
      opts: [
        'calm situational awareness ("eyes in the back of the head") preventing minor ripples from escalating',
        'waiting until chaos explodes to yell harshly',
        'turning away from groups permanently',
        'handing out mass class punishments',
      ],
      exp: 'Proactive low-key redirection keeps instruction flowing smoothly without public confrontation.',
    },
    mr: {
      q: 'जेकब कौनीन यांनी शिक्षकाची "Withitness" (सजग उपस्थिती) अशी व्याख्या केली आहे ज्यात शिक्षक गोंधळ वाढण्यापूर्वीच सौम्य नजर किंवा जवळ जाऊन स्थिती सावरतात; याचे वैशिष्ट्य:',
      opts: [
        'शांत परिस्थिती-जाणीव ज्यामुळे लहान अस्वस्थता मोठ्या गोंधळात रूपांतरित होण्याआधीच शांत होते',
        'मोठा गोंधळ झाल्यावरच आरडाओरडा करणे',
        'मुलांकडे पाठ करून राहणे',
        'संपूर्ण वर्गाला सामूहिक शिक्षा देणे',
      ],
      exp: 'अध्यापनाचा प्रवाह न तोडता सौम्य इशाऱ्याने अवधान परत आणणे कुशल वर्ग व्यवस्थापनाचे लक्षण आहे.',
    },
    hi: {
      q: 'जैकब कौنين ने प्रभावी शिक्षकों की "Withitness" (सजग उपस्थिति) किसे कहा है जो शांत निगाह या पास जाकर छोटी हलचल को बढ़ने से पहले संभाल लेते हैं?',
      opts: [
        'शांत परिस्थितिजन्य जागरूकता जो छोटे भटकाव को बड़े व्यवधान में बदलने से रोकती है',
        'हंगामा बढ़ने पर जोर से चिल्लाना',
        'समूहों से मुंह मोड़ लेना',
        'पूरी कक्षा को सामूहिक दंड देना',
      ],
      exp: 'शिक्षण प्रवाह तोड़े बिना सौम्य संकेत से ध्यान वापस लाना कुशल कक्षा प्रबंधन है।',
    },
  },
  {
    topic: 'Preventing Bilingual / Dialect Stigma',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'When a Class 3 child shares an astute nature observation using rural dialect words, the teacher records the brilliant observation respectfully and bridges it to standard terms. This validates:',
      opts: [
        'intellectual voice and linguistic dignity regardless of home dialect',
        'suppressing rural speakers',
        'mocking local vocabulary',
        'ignoring scientific curiosity',
      ],
      exp: 'Separating conceptual brilliance from dialect register keeps marginalized pupils proud and eager.',
    },
    mr: {
      q: 'तिसरीतील मूल आपल्या ग्रामीण बोलीत निसर्गाचे सूक्ष्म निरीक्षण मांडते तेव्हा शिक्षिका त्याच्या हुशारीचे कौतुक करून ते प्रमाण शब्दांत जोडते. यातून कशाचा सन्मान होतो?',
      opts: [
        'घरची बोली कोणतीही असली तरी विद्यार्थ्याची बौद्धिक क्षमता आणि भाषिक प्रतिष्ठा',
        'ग्रामीण वक्त्यांना दाबणे',
        'स्थानिक शब्दांची थट्टा',
        'वैज्ञानिक जिज्ञासेकडे दुर्लक्ष',
      ],
      exp: 'विचारांच्या गुणवत्तेचा आदर केल्याने विद्यार्थी आत्मविश्वासाने नवीन प्रमाण भाषाही शिकतात.',
    },
    hi: {
      q: 'कक्षा ३ का बच्चा ग्रामीण बोली में प्रकृति का तीक्ष्ण अवलोकन साझा करता है और शिक्षिका उसकी समझ सराहकर मानक शब्दों से जोड़ती हैं। इससे क्या सिद्ध होता है?',
      opts: [
        'घरेलू बोली चाहे जो हो, छात्र की बौद्धिक आवाज व भाषिक गरिमा का सम्मान',
        'ग्रामीण वक्ताओं को दबाना',
        'स्थानीय शब्दों का उपहास',
        'वैज्ञानिक जिज्ञासा की अनदेखी',
      ],
      exp: 'बच्चे के विचार का सम्मान करने से वह गौरव के साथ मानक शब्दावली भी सहज सीखता है।',
    },
  },
  {
    topic: 'Authentic Real-World Math Integration',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Setting up a classroom "Play Grocery Corner" with stamped play coins and vegetable tags builds holistic primary competence because pupils apply:',
      opts: [
        'mental addition, making change, polite social dialogue, and unit weighing simultaneously',
        'blind silent copying of formulas',
        'punitive speed testing',
        'unconnected rote tables only',
      ],
      exp: 'Simulated market corners fuse numeracy, language pragmatics, and life skills naturally.',
    },
    mr: {
      q: 'वर्गात भाज्यांचे दर व कागदी नाण्यांचा "खेळातील किराणा कोपरा" मांडल्याने कोणता एकात्मिक विकास घडतो?',
      opts: [
        'तोंडी बेरीज-वजाबाकी, सुट्टे पैसे देणे, विनम्र संवाद आणि वजन मापनाचा प्रत्यक्ष सराव एकाच वेळी होतो',
        'केवळ सूत्रांची मूक नकल होते',
        'दंडात्मक वेग चाचणी',
        'केवळ सुटे पाढे',
      ],
      exp: 'वास्तव जीवनातील खरेदी अनुभवातून गणित व भाषा सहजगत्या एकरूप होतात.',
    },
    hi: {
      q: 'कक्षा में सब्जियों के मूल्य टैग और कागज के सिक्कों वाला "खेल बाज़ार कोना" लगाने से कौन-सा समग्र कौशल विकसित होता है?',
      opts: [
        'मानसिक जोड़-घटाव, छुट्टे पैसे देना, विनम्र संवाद व तौल की समझ एक साथ विकसित होती है',
        'केवल सूत्रों की मौन नकल',
        'दंडात्मक गति परीक्षण',
        'अलग-थलग पहाड़े',
      ],
      exp: 'बाज़ार भूमिका-अभिनय गणित, भाषा और व्यावहारिक जीवन-कौशल को सहज जोड़ता है।',
    },
  },
  {
    topic: 'Critical Period Evidence – Second Language Comfort',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'While adults can certainly learn additional languages well, early exposure through songs, stories, and joyful dialogues works remarkably smoothly in Classes 1–5 because:',
      opts: [
        'young auditory plasticity and lower social self-consciousness encourage playful imitation and natural sound tuning',
        'adults have zero ability to memorize nouns',
        'babies understand grammar lectures automatically',
        'textbooks contain fewer pages',
      ],
      exp: 'Playful low-anxiety L2 immersion harnesses early phonological openness harmoniously.',
    },
    mr: {
      q: 'मोठे लोकही नवीन भाषा शिकू शकतातच, तरीही इयत्ता १–५ मध्ये गाणी, गोष्टी व संवादांतून दुसरी भाषा खूप सहज का आत्मसात होते?',
      opts: [
        'लहान वयातील ध्वनी ग्रहणक्षमता (Auditory Plasticity) आणि लाज-संकोच कमी असल्याने आनंददायी अनुकरण घडते',
        'मोठ्यांना नामे पाठच होत नाहीत म्हणून',
        'बाळांना व्याकरण व्याख्या आपोआप कळतात म्हणून',
        'पुस्तकात पाने कमी असतात म्हणून',
      ],
      exp: 'भीतीमुक्त व नादमय वातावरणाचा लहान वयात उच्चार व संवादावर उत्तम परिणाम होतो.',
    },
    hi: {
      q: 'यद्यपि वयस्क भी नई भाषाएँ सीख सकते हैं, फिर भी कक्षा १–५ में गीतों, कहानियों व संवादों से दूसरी भाषा इतनी सहज क्यों बैठती है?',
      opts: [
        'कम उम्र की श्रवण सुनम्यता (Auditory Plasticity) और कम संकोच के कारण बच्चे आनंद से ध्वनियाँ व संवाद अपनाते हैं',
        'वयस्क संज्ञा याद नहीं कर सकते',
        'शिशु व्याकरण व्याख्यान स्वतः समझते हैं',
        'पुस्तकों में पृष्ठ कम हैं',
      ],
      exp: 'कम चिंता व संगीतमय परिवेश प्रारंभिक वर्षों की ध्वन्यात्मक ग्रहणशीलता का सर्वोत्तम उपयोग करता है।',
    },
  },
  {
    topic: 'Checking Understanding via Mini-Whiteboards / Slates',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Instead of calling on just one front-row volunteer, asking ALL 40 pupils to jot their quick answer on small personal slates and hold them up lets the teacher:',
      opts: [
        'sample 100% of the class’s real-time understanding within 10 seconds before moving on',
        'punish slow drawers publicly',
        'eliminate peer discussion permanently',
        'collect permanent report-card ranks',
      ],
      exp: 'All-pupil response tools (slates, finger signals) replace false confidence from checking one bright child.',
    },
    mr: {
      q: 'फक्त पहिल्या बाकावरील एकाच मुलाला विचारण्याऐवजी वर्गातील सर्व ४० मुलांना छोट्या पाटीवर उत्तर लिहून एकाच वेळी वर दाखवायला सांगण्याचा मुख्य फायदा काय?',
      opts: [
        'फक्त १० सेकंदांत संपूर्ण १००% वर्गाचे तात्काळ आकलन शिक्षकांना समजते व पुढे जाण्याचा निर्णय घेता येतो',
        'सावकाश लिहिणाऱ्यांची थट्टा होते',
        'चर्चा कायमची बंद होते',
        'वार्षिक गुणांकन ठरते',
      ],
      exp: 'सर्व विद्यार्थ्यांचा तात्काळ प्रतिसाद तपासणारे तंत्र (All-Response Check) कोणालाच मागे राहू देत नाही.',
    },
    hi: {
      q: 'केवल पहली पंक्ति के एक छात्र से पूछने के बजाय सभी ४० बच्चों से छोटी स्लेट पर उत्तर लिखकर एक साथ ऊपर दिखाने को कहने का मुख्य लाभ क्या है?',
      opts: [
        'केवल १० सेकंड में पूरी १००% कक्षा की वास्तविक समझ तुरंत परखकर आगे बढ़ने का निर्णय लिया जा सकता है',
        'धीमे लिखने वालों का उपहास होता है',
        'चर्चा बंद होती है',
        'वार्षिक रैंक बनती है',
      ],
      exp: 'सभी विद्यार्थियों की एक साथ जांच शिक्षण की गति को सबके अनुकूल बनाती है।',
    },
  },
  {
    topic: 'Avoiding Extrinsic Competition Traps Among Young Kids',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Focusing primary pupils on beating their OWN personal yesterday score ("Self-Referenced Mastery Goals") rather than an all-class public wall ranking ("Best 3 vs Bottom 3") promotes:',
      opts: [
        'intrinsic persistence, mutual peer encouragement, and lowered performance anxiety',
        'cutthroat sabotage among deskmates',
        'despair among steady slow improvers',
        'abandonment of effort',
      ],
      exp: 'Personal growth trajectories celebrate every honest step forward without breeding winners-vs-losers alienation.',
    },
    mr: {
      q: 'वर्गात "सर्वोत्कृष्ट ३ वि. तळाचे ३" अशी जाहीर स्पर्धा लावण्यापेक्षा प्रत्येक मुलाला स्वतःच्याच कालच्या कामापेक्षा आज थोडे अधिक सुधारण्याचे ध्येय दिल्यास काय वाढते?',
      opts: [
        'अंतर्गत चिकाटी, मित्रांचे परस्पर सहकार्य आणि कमी झालेली तुलनात्मक चिंता',
        'मित्रांमधील असूया व खोडसाळपणा',
        'हळूहळू प्रगती करणाऱ्यांची निराशा',
        'प्रयत्नांचा त्याग',
      ],
      exp: 'स्व-सापेक्ष प्रगती उद्दिष्टे (Mastery Goals) प्रत्येक विद्यार्थ्याला पुढे जाण्याची उमेद देतात.',
    },
    hi: {
      q: 'कक्षा में "शीर्ष ३ बनाम निचले ३" की सार्वजनिक रैंकिंग के बजाय हर बच्चे को अपने कल के प्रदर्शन से थोड़ा बेहतर करने का लक्ष्य देना क्या बढ़ाता है?',
      opts: [
        'आंतरिक लगन, सहपाठी सहयोग तथा तुलनात्मक चिंता में कमी',
        'डेस्क साथियों में ईर्ष्या व तोड़फोड़',
        'धीरे सुधार करने वालों में निराशा',
        'प्रयास त्यागना',
      ],
      exp: 'स्व-संदर्भित निपुणता लक्ष्य हर विद्यार्थी के वास्तविक विकास का सम्मान करते हैं।',
    },
  },
  {
    topic: 'Holistic Wellness – Teacher Self-Care & Patience',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why does cultivating calm emotional awareness inside the teacher themselves directly impact Class 1–5 pupil learning?',
      opts: [
        'A calm, emotionally regulated teacher models respectful problem-solving and sustains the warm safety young brains need to learn',
        'Teachers never feel stress or fatigue',
        'Angry shouting improves long-term curiosity',
        'Emotional climate has zero bearing on attention',
      ],
      exp: 'Emotional contagion flows strongly from adult mood to classroom climate; calm presence anchors safety.',
    },
    mr: {
      q: 'शिक्षकाचे स्वतःचे शांत व समतोल भावनिक आरोग्य इयत्ता १ ते ५ च्या विद्यार्थ्यांच्या अध्ययनावर थेट परिणाम का करते?',
      opts: [
        'संतुलित शिक्षक आदराचे आदर्श वर्तन दाखवतो व बालकांच्या मेंदूला शिकण्यासाठी आवश्यक शांत सुरक्षित वातावरण देतो',
        'शिक्षकांना कधीच ताण येत नाही',
        'रागाने ओरडल्याने जिज्ञासा वाढते',
        'भावनिक वातावरणाचा लक्ष्याशी संबंध नसतो',
      ],
      exp: 'शिक्षकाचा शांत व आत्मीय संवाद वर्गातील भावनिक सुरक्षितता व उत्साह टिकवतो.',
    },
    hi: {
      q: 'शिक्षक का अपना शांत व संतुलित संवेगात्मक स्वास्थ्य कक्षा १–५ के विद्यार्थियों के सीखने को सीधे क्यों प्रभावित करता है?',
      opts: [
        'संवेगात्मक रूप से संतुलित शिक्षक सम्मानजनक समाधान का आदर्श प्रस्तुत कर सीखने हेतु सुरक्षित माहौल बनाए रखते हैं',
        'शिक्षकों को कभी थकान नहीं होती',
        'क्रोध से जिज्ञासा बढ़ती है',
        'कक्षा माहौल का ध्यान पर कोई असर नहीं',
      ],
      exp: 'शिक्षक की शांत उपस्थिति कक्षा में भावात्मक सुरक्षा और सकारात्मक ऊर्जा का संचार करती है।',
    },
  },
  {
    topic: 'Dual Purpose of Open Homework Choices',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Giving a weekend choice board ("Interview an elder about old water wells OR draw 4 pond creatures with 2 facts each") improves task completion because:',
      opts: [
        'autonomy sparks personal ownership and honours diverse family contexts',
        'pupils skip both options guilt-free',
        'tasks take six hours nightly',
        'parents write the entire assignment',
      ],
      exp: 'Meaningful bounded choice honours Deci & Ryan’s Autonomy need.',
    },
    mr: {
      q: 'आठवड्याच्या शेवटी "आजोबांना जुन्या विहिरींबद्दल विचारा किंवा पाण्यातील ४ प्राण्यांची माहिती चित्रासह लिहा" असा निवड पर्याय दिल्यास गृहपाठ पूर्ण होण्याचे प्रमाण का वाढते?',
      opts: [
        'निवडीच्या स्वातंत्र्यामुळे (Autonomy) मुलांत आपलेपणा वाटतो व विविध कौटुंबिक परिस्थितींशी जुळवून घेता येते',
        'मुले दोन्ही कामे टाळतात',
        'रात्रभर सहा तास लागतात',
        'पालकच सर्व लिहितात',
      ],
      exp: 'अर्थपूर्ण मर्यादित निवड स्वातंत्र्य अंतर्गत प्रेरणा व जबाबदारी दोन्ही वाढवते.',
    },
    hi: {
      q: 'सप्ताहांत में विकल्प देना ("किसी बड़े से पुराने कुओं के बारे में पूछें या ४ जलीय जीवों के चित्र व तथ्य लिखें") कार्य पूर्णता क्यों बढ़ाता है?',
      opts: [
        'चयन की स्वायत्तता (Autonomy) से बच्चे जुड़ाव महसूस करते हैं और विविध घरेलू परिस्थितियों के अनुरूप कार्य चुन पाते हैं',
        'बच्चे दोनों विकल्प छोड़ देते हैं',
        'काम में छह घंटे लगते हैं',
        'अभिभावक ही पूरा लिखते हैं',
      ],
      exp: 'सार्थक सीमित विकल्प देना स्व-निर्धार सिद्धांत के अनुसार आंतरिक प्रेरणा बढ़ाता है।',
    },
  },
  {
    topic: 'Balanced Question Paper Blueprint',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Before drafting an end-of-term school paper, preparing a two-way "Blueprint" mapping Syllabus Topics against Cognitive Levels (Knowledge / Understanding / Application) ensures:',
      opts: [
        'balanced content sampling and fair inclusion of thinking questions instead of accidental 100% rote recall',
        'surprising pupils with out-of-syllabus chapters',
        'omitting all easy confidence-builder items',
        'making marking keys arbitrary',
      ],
      exp: 'Blueprints uphold content validity and cognitive balance.',
    },
    mr: {
      q: 'सत्रांत प्रश्नपत्रिका काढण्यापूर्वी घटक व उद्दिष्टे (ज्ञान, आकलन, उपयोजन) दर्शवणारा "नमुना आराखडा" (Blueprint) का तयार करतात?',
      opts: [
        'केवळ १००% पाठांतर प्रश्न न येता सर्व घटकांचा व विचार-पातळ्यांचा समतोल व वैध समावेश व्हावा म्हणून',
        'अभ्यासक्रमाबाहेरील धडे विचारण्यासाठी',
        'सर्व सोपे प्रश्न वगळण्यासाठी',
        'तपासणी अनियमित करण्यासाठी',
      ],
      exp: 'ब्लूप्रिंटमुळे प्रश्नपत्रिकेची घटक-निहाय वैधता व काठिण्यपातळी समतोल राहते.',
    },
    hi: {
      q: 'सत्रांत प्रश्न-पत्र बनाने से पहले पाठ्यक्रम इकाइयों व संज्ञानात्मक स्तरों (ज्ञान, समझ, अनुप्रयोग) का "ब्लूप्रिंट" क्यों तैयार किया जाता है?',
      opts: [
        'सभी इकाइयों का संतुलित प्रतिनिधित्व हो तथा केवल रटंत के बजाय समझ व अनुप्रयोग प्रश्न भी शामिल हों',
        'पाठ्यक्रम से बाहर के प्रश्न डालने हेतु',
        'सभी सरल प्रश्न हटाने हेतु',
        'अंकन को मनमाना बनाने हेतु',
      ],
      exp: 'द्वि-आयामी ब्लूप्रिंट परीक्षा की विषय-वैधता और संज्ञानात्मक संतुलन सुनिश्चित करता है।',
    },
  },
  {
    topic: 'Avoiding Stereotyping in Career Guidance',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Exposing upper-primary pupils equally to community artisans, nurses, engineers, poets, and agriculturalists teaches them to value:',
      opts: [
        'dignity of every honest profession without class or gender prejudice',
        'looking down upon manual craftsmanship',
        'ranking jobs solely by city office glamour',
        'memorizing salary tax tables in Class 3',
      ],
      exp: 'Connecting real human dignity to every vocation builds social respect.',
    },
    mr: {
      q: 'मुलांना कारागीर, परिचारिका, अभियंता, कवी व शेतकरी अशा सर्व क्षेत्रांतील तज्ज्ञांशी भेट घडवल्यास कोणते मूल्य रुजते?',
      opts: [
        'कोणत्याही वर्ग किंवा लिंग पूर्वग्रहाशिवाय सर्व प्रामाणिक श्रमांची प्रतिष्ठा (Dignity of Labour)',
        'हस्तकलेला कमी लेखणे',
        'केवळ मोठ्या शहरांतील कार्यालयांनाच श्रेष्ठ मानणे',
        'तिसरीत कर तक्ते पाठ करणे',
      ],
      exp: 'प्रत्येक समाजोपयोगी कामाविषयी आदर असणे हे निरोगी लोकशाहीचे लक्षण आहे.',
    },
    hi: {
      q: 'बच्चों को समान रूप से कारीगरों, नर्सों, इंजीनियरों, कवियों व किसानों से परिचित कराना कौन-सा मूल्य विकसित करता है?',
      opts: [
        'बिना वर्ग या लिंग पूर्वाग्रह के हर ईमानदार व्यवसाय व श्रम की गरिमा (Dignity of Labour)',
        'हस्तशिल्प को तुच्छ समझना',
        'केवल बड़े दफ्तरों को श्रेष्ठ मानना',
        'कक्षा ३ में कर सारणी रटना',
      ],
      exp: 'समाज के सभी उपयोगी व्यवसायों का सम्मान संवैधानिक समानता और श्रम-गरिमा सिखाता है।',
    },
  },
  {
    topic: 'Field Trips & Experiential Anchoring',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'A structured 30-minute walk to the local post office or nursery transforms abstract textbook terms when paired with:',
      opts: [
        'simple guiding observation questions beforehand and collaborative sharing/sketching afterwards',
        'zero preparation and instant silence',
        'forbidding questions to local workers',
        'an unannounced surprise grammar exam on the bus',
      ],
      exp: 'Pre-visit curiosity + guided observation + post-visit synthesis turn excursions into deep learning.',
    },
    mr: {
      q: 'स्थानिक पोस्ट ऑफिस किंवा रोपवाटिकेच्या ३० मिनिटांच्या क्षेत्रभेटीतून खरा शैक्षणिक लाभ केव्हा मिळतो?',
      opts: [
        'भेटीपूर्वी साधे निरीक्षण प्रश्न ठरवून व भेटीनंतर चित्रांसह अनुभव वर्गात मांडून',
        'पूर्वतयारीशिवाय व मौनासह फिरून',
        'कर्मचाऱ्यांना प्रश्न विचारण्यास बंदी घालून',
        'परताना व्याकरण परीक्षा घेऊन',
      ],
      exp: 'पूर्वनियोजन व भेटीनंतरचे संकलन यामुळे क्षेत्रभेट केवळ सहल न राहता जिवंत अभ्यास बनते.',
    },
    hi: {
      q: 'स्थानीय डाकघर या नर्सरी की ३० मिनट की क्षेत्र-यात्रा सार्थक अधिगम में कब बदलती है?',
      opts: [
        'भ्रमण से पहले सरल अवलोकन प्रश्न तय करके तथा वापस आकर चित्र व अनुभव साझा करके',
        'बिना तैयारी चुपचाप घूमकर',
        'कर्मचारियों से सवाल पूछने पर रोक लगाकर',
        'बस में अचानक व्याकरण परीक्षा लेकर',
      ],
      exp: 'पूर्व-नियोजित उद्देश्य व भ्रमण-पश्चात चर्चा क्षेत्र-यात्रा को गहन अनुभवात्मक सीख में बदलते हैं।',
    },
  },
  {
    topic: 'Continuous Teacher Encouragement of Questioning',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Adding a cheerful "Wonder Wall" board where pupils stick curious unanswered questions ("Why doesn’t oil mix with water?") encourages:',
      opts: [
        'lifelong inquiry habits and epistemic curiosity valued above passive obedience',
        'wasting chart paper unnecessarily',
        'distracting learners from every syllabus chapter',
        'embarrassing pupils who don’t know answers yet',
      ],
      exp: 'Honouring sincere questions turns uncertainty into fuel for collective exploration.',
    },
    mr: {
      q: 'वर्गात "कुतूहल भिंत" (Wonder Wall) लावून मुलांचे न सुटलेले प्रश्न ("तेल पाण्यात का मिसळत नाही?") तिथे चिटकवायला सांगणे कशास चालना देते?',
      opts: [
        'निष्क्रिय आज्ञापालनापेक्षा आजीवन प्रश्न विचारण्याची वृत्ती व ज्ञानजिज्ञासेला',
        'कागद वाया घालवण्यास',
        'अभ्यासक्रमापासून भरकटण्यास',
        'लाज वाटण्यास',
      ],
      exp: 'मुलांच्या प्रश्नांना सन्मानाची जागा दिल्यास वर्गात शोधक व वैज्ञानिक संस्कृती निर्माण होते.',
    },
    hi: {
      q: 'कक्षा में "जिज्ञासा दीवार" (Wonder Wall) लगाकर बच्चों के अनसुलझे प्रश्न ("तेल पानी में क्यों नहीं घुलता?") चिपकाने को कहना किसे बढ़ावा देता है?',
      opts: [
        'निष्क्रिय आज्ञाकारिता की बजाय आजीवन प्रश्न पूछने की प्रवृत्ति व ज्ञान-जिज्ञासा को',
        'चार्ट पेपर बर्बाद करने को',
        'पाठ्यक्रम भटकाने को',
        'बच्चों को शर्मिंदा करने को',
      ],
      exp: 'बच्चों के प्रश्नों को सम्मानजनक स्थान देना वैज्ञानिक और रचनात्मक सीखने का वातावरण निर्मित करता है।',
    },
  },
  {
    topic: 'Early Identification Without Premature Labelling',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Moderate',
    en: {
      q: 'When noticing recurring letter-sound confusion in Class 1–2, early gentle screening and targeted multisensory support matters because:',
      opts: [
        'timely early intervention during peak brain plasticity closes foundational reading gaps before failure compounds',
        'waiting until Class 8 solves dyslexia automatically',
        'screening proves the child should quit school early',
        'all Class 1 beginners read newspapers fluently overnight',
      ],
      exp: 'Early supportive screening directs timely instructional help rather than waiting for hopeless frustration.',
    },
    mr: {
      q: 'इयत्ता १–२ मध्येच अक्षर-ध्वनी जोडणीतील सातत्यपूर्ण अडचण लक्षात घेऊन सौम्य पडताळणी व बहुसंवेदी मदत करणे का महत्त्वाचे असते?',
      opts: [
        'लहान वयातील मेंदूच्या लवचिक काळात वेळेत मदत मिळाल्यास पुढील अपयशाचे दुष्टचक्र टळते म्हणून',
        'आठवीपर्यंत थांबल्यास अडचण आपोआप जाते म्हणून',
        'शाळा सोडायला सांगण्यासाठी',
        'पहिलीत सर्वजण वर्तमानपत्र वाचतात म्हणून',
      ],
      exp: 'वेळेत निदान व उपचारात्मक साहाय्यामुळे पायाभूत साक्षरतेतील दरी सुरुवातीलाच भरून निघते.',
    },
    hi: {
      q: 'कक्षा १–२ में ही अक्षर-ध्वनि कठिनाई पहचानकर समय पर बहुसंवेदी सहायता देना क्यों अत्यंत महत्वपूर्ण है?',
      opts: [
        'प्रारंभिक मस्तिष्क सुनम्यता के दौर में समय पर हस्तक्षेप करने से आगे बढ़ने वाली शैक्षिक खाई रुक जाती है',
        'कक्षा ८ तक इंतजार करने से समस्या अपने-आप मिट जाती है',
        'स्कूल छुड़वाने हेतु',
        'कक्षा १ में ही सभी समाचार पत्र पढ़ते हैं',
      ],
      exp: 'प्रारंभिक पहचान का उद्देश्य लेबल लगाना नहीं बल्कि समय रहते प्रभावी सहायता प्रदान करना है।',
    },
  },
  {
    topic: 'Democratic Parent Involvement in School Decisions',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Easy',
    en: {
      q: 'Involving School Management Committee (SMC) parent members in reviewing the School Development Plan ensures:',
      opts: [
        'transparent local accountability tailored to genuine community children’s priorities',
        'uninformed interference in daily grading keys',
        'eliminating teacher autonomy on lesson plans',
        'closing school libraries',
      ],
      exp: 'Shared community stewardship strengthens attendance, mid-day meals, and safe facilities.',
    },
    mr: {
      q: 'शाळा विकास आराखडा (SDP) तयार करताना शाळा व्यवस्थापन समितीतील (SMC) पालक सदस्यांना सहभागी करून घेतल्याने काय साध्य होते?',
      opts: [
        'स्थानिक मुलांच्या खऱ्या गरजांशी सुसंगत पारदर्शक व लोकसहभागी उत्तरदायित्व',
        'दररोजच्या गुणपत्रिकेत हस्तक्षेप',
        'शिक्षकांचे पाठनियोजन स्वातंत्र्य नष्ट होणे',
        'ग्रंथालय बंद होणे',
      ],
      exp: 'पालक व शाळा यांच्या सहकार्यातून शाळेची भौतिक व शैक्षणिक गुणवत्ता बळकट होते.',
    },
    hi: {
      q: 'विद्यालय विकास योजना (SDP) बनाने में SMC के अभिभावक सदस्यों की भागीदारी क्या सुनिश्चित करती है?',
      opts: [
        'स्थानीय बच्चों की वास्तविक प्राथमिकताओं के अनुरूप पारदर्शी व सामुदायिक उत्तरदायित्व',
        'दैनिक उत्तर कुंजी में हस्तक्षेप',
        'शिक्षक स्वायत्तता समाप्ति',
        'पुस्तकालय बंद होना',
      ],
      exp: 'सामुदायिक सहभागिता विद्यालय की सुविधाओं, नामांकन और गुणवत्ता को मजबूत बनाती है।',
    },
  },
  {
    topic: 'Balanced Holistic Growth Beyond Exam Marks',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Easy',
    en: {
      q: 'NEP 2020 treats arts, yoga, gardening, music, and physical sports as integral curricular disciplines rather than "extra time-fillers" because:',
      opts: [
        'no rigid hierarchy should divide curricular from co-curricular—motor, aesthetic, and socio-emotional mastery feed intellectual flourishing',
        'exams on sports cancel arithmetic forever',
        'children prefer zero physical movement',
        'textbooks cover all musical instruments automatically',
      ],
      exp: 'Eliminating artificial silos between "academic" and "co-curricular" respects whole-child development.',
    },
    mr: {
      q: 'NEP 2020 मध्ये कला, योग, बागकाम, संगीत व क्रीडा यांना "अवांतर वेळखाऊ" न मानता मुख्य अभ्यासक्रमाचाच भाग का मानले आहे?',
      opts: [
        'अभ्यासक्रम व सह-अभ्यासक्रम असा कृत्रिम भेद न करता शारीरिक, सौंदर्यात्मक व सामाजिक विकास बौद्धिक वाढीस पोषक ठरतो',
        'खेळामुळे गणित कायमचे रद्द होते',
        'मुलांना हालचाल नको असते',
        'पुस्तकातून सर्व वाद्ये आपोआप येतात',
      ],
      exp: 'बालकाचा सर्वांगीण विकास साधण्यासाठी कला व क्रीडा या विषयांना समान दर्जा आवश्यक आहे.',
    },
    hi: {
      q: 'NEP 2020 कला, योग, बागवानी, संगीत और खेलों को "अतिरिक्त समय-काटू" न मानकर मुख्य पाठ्यचर्या का अभिन्न अंग क्यों मानती है?',
      opts: [
        'शैक्षिक व सह-शैक्षिक का कृत्रिम विभाजन समाप्त कर गामक, सौंदर्यात्मक व भावात्मक विकास बौद्धिक विकास को पुष्ट करता है',
        'खेल से गणित सदा के लिए हट जाता है',
        'बच्चों को शारीरिक गतिविधि पसंद नहीं',
        'किताबें अपने-आप वाद्य सिखाती हैं',
      ],
      exp: 'संपूर्ण बाल विकास हेतु कला, खेल व स्वास्थ्य को मुख्य विषयों के समकक्ष स्थान दिया गया है।',
    },
  },
  {
    topic: 'Preventing Cyber/Screen Dependency & Encouraging Real Play',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'When parents report Class 3 children glued to mobile reels all evening, what realistic school guidance helps families most?',
      opts: [
        'Share balanced ideas: screen-free family meal/bedtime zones, buddy library book swaps, and outdoor neighbourhood games',
        'Ban parents from owning phones anywhere',
        'Replace outdoor sports with 4-hour phone drills',
        'Shame pupils daily during morning assembly',
      ],
      exp: 'Replacing passive screen hours with vibrant offline social/reading habits works gently and sustainably.',
    },
    mr: {
      q: 'तिसरीतील मुले संध्याकाळभर मोबाइल रील्स पाहण्यात गुंग असतात अशी पालकांची तक्रार आल्यास शाळेचे व्यावहारिक मार्गदर्शन कोणते असावे?',
      opts: [
        'जेवण व झोपेपूर्वी मोबाइलमुक्त वेळ, वर्गग्रंथालयातील गोष्टींची देवाणघेवाण आणि मैदानी मित्रांचे खेळ यांसारखे सकारात्मक पर्याय सुचवणे',
        'पालकांना फोन ठेवण्यास बंदी घालणे',
        'मैदानी खेळ बंद करून फोन वापरणे',
        'परिपाठात मुलांची थट्टा करणे',
      ],
      exp: 'केवळ निषेधापेक्षा आनंददायी ऑफलाइन पर्याय दिल्याने सवय सहज बदलते.',
    },
    hi: {
      q: 'अभिभावक शिकायत करें कि कक्षा ३ के बच्चे शामभर मोबाइल रील्स देखते हैं, तो विद्यालय की कौन-सी व्यावहारिक सलाह सबसे उपयोगी होगी?',
      opts: [
        'भोजन व सोने से पहले स्क्रीन-मुक्त समय, पुस्तकालय की कहानी किताबें और पास-पड़ोस के बाहरी खेल जैसे सकारात्मक विकल्प सुझाना',
        'अभिभावकों के फोन रखने पर रोक लगाना',
        'बाहरी खेल बंद कर फोन अभ्यास बढ़ाना',
        'प्रार्थना सभा में बच्चों को शर्मिंदा करना',
      ],
      exp: 'केवल डांटने के बजाय आकर्षक ऑफलाइन पठन व खेल विकल्प देना टिकाऊ समाधान है।',
    },
  },
  {
    topic: 'Core Goal of Child-Centered Education (Summary)',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Easy',
    en: {
      q: 'Which core principle unifies Montessori, Dewey, Tagore, NCF 2005, and NEP 2020 in elementary schooling?',
      opts: [
        'Respecting every learner as an active, curious, dignified meaning-maker growing best in safe, joyful, experiential community classrooms',
        'Treating children as identical empty jars filled solely via fear and rote drills',
        'Ranking 6-year-olds by high-stakes elimination scores',
        'Isolating school knowledge from living society',
      ],
      exp: 'Across traditions, active agency, curiosity, joy, and human dignity define transformative child-centered schooling.',
    },
    mr: {
      q: 'माँटेसोरी, ड्युई, टागोर, NCF 2005 आणि NEP 2020 या सर्व शिक्षणतज्ज्ञ व धोरणांना जोडणारे समान केंद्रसूत्र कोणते?',
      opts: [
        'प्रत्येक बालक हे सुरक्षित, आनंददायी व अनुभवाधारित वर्गात स्वतःचे ज्ञान घडवणारे सक्रिय व सन्माननीय व्यक्तिमत्त्व आहे',
        'मुले म्हणजे भीती व घोकंपट्टीने भरण्याचे रिकामे घडे आहेत',
        '६ वर्षांच्या मुलांची उच्च-ताण गाळण चाचणी घेणे',
        'शाळेला समाजापासून अलिप्त ठेवणे',
      ],
      exp: 'बालकाची सक्रिय भूमिका, जिज्ञासा, आनंद आणि मानवी प्रतिष्ठा हे आधुनिक बालकेंद्री शिक्षणाचे अढळ तत्त्व आहे.',
    },
    hi: {
      q: 'मॉन्टेसरी, डीवी, टैगोर, NCF 2005 और NEP 2020 — इन सभी को जोड़ने वाला समान मूल सिद्धांत क्या है?',
      opts: [
        'हर बच्चे को सुरक्षित, आनंदमय व अनुभवाधारित कक्षा में सक्रिय, जिज्ञासु व सम्माननीय ज्ञान-निर्माता के रूप में देखना',
        'बच्चों को भय और रटंत से भरे जाने वाले खाली बर्तन मानना',
        '६ वर्ष के बच्चों की कठोर छंटनी परीक्षा लेना',
        'स्कूल को समाज से अलग-थलग रखना',
      ],
      exp: 'बच्चे की सक्रिय सहभागिता, जिज्ञासा, आनंद और मानवीय गरिमा बाल-केंद्रित शिक्षा का शाश्वत आधार है।',
    },
  },
];
