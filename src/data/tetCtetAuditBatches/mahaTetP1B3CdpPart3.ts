import { CuratedTrilingualMcq } from './types';

// Batch 3 CDP Part 3 (32 original trilingual items; 0 overlap with B1/B2)
export const MAHA_TET_P1_B3_CDP_PART3: CuratedTrilingualMcq[] = [
  {
    topic: 'KWL Organizer for Active Schema',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Before a Honeybees lesson, pupils list K (What I Know), W (What I Wonder), and later fill L (What I Learned). This organizer builds:',
      opts: [
        'schema activation, learner-generated curiosity, and self-monitored reflection',
        'blind rote memorization of dates',
        'teacher monologue discipline',
        'punitive pre-testing',
      ],
      exp: 'KWL anchors new inquiry directly in students’ prior concepts and genuine questions.',
    },
    mr: {
      q: '"मधमाशी" घटकापूर्वी विद्यार्थी K (मला काय माहित आहे), W (मला काय जाणायचे आहे) व नंतर L (मी काय शिकलो) हा तक्ता भरतात. यामुळे काय साधते?',
      opts: [
        'पूर्वज्ञानाची जागृती, स्वतःची जिज्ञासा व शिकलेल्या ज्ञानाचे स्व-चिंतन',
        'तारीख घोकंपट्टी',
        'एकतर्फी भाषण',
        'दंडात्मक चाचणी',
      ],
      exp: 'KWL तक्त्यामुळे विद्यार्थी स्वतःच्या प्रश्नांच्या शोधात सक्रिय राहतात.',
    },
    hi: {
      q: '"मधुमक्खी" इकाई से पहले बच्चे K (जानता हूँ), W (जानना चाहता हूँ) और अंत में L (सीखा) भरते हैं। इससे क्या विकसित होता है?',
      opts: [
        'पूर्वज्ञान की सक्रियता, जिज्ञासा और सीखने का स्व-आकलन',
        'तिथियों की रटंत',
        'केवल भाषण',
        'दंडात्मक परीक्षण',
      ],
      exp: 'KWL चार्ट जिज्ञासा को पाठ का केंद्र बनाता है।',
    },
  },
  {
    topic: 'Inclusive vs Integrated Education',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Moderate',
    en: {
      q: 'What fundamentally distinguishes Inclusive Education from older Integrated Education?',
      opts: [
        'Inclusive education restructures school teaching, spaces, and attitudes for EVERY child rather than forcing disabled pupils to adapt alone',
        'Inclusive education builds isolated distant boarding schools',
        'Integrated education provides universal UDL',
        'They are identical terms',
      ],
      exp: 'Inclusion transforms the learning ecosystem to welcome diversity.',
    },
    mr: {
      q: '"समावेशक शिक्षण" हे जुन्या "एकात्मिक शिक्षणापेक्षा" मुळात कसे वेगळे आहे?',
      opts: [
        'समावेशक शिक्षणात शाळा स्वतःची रचना व अध्यापन सर्व मुलांच्या गरजांनुसार बदलते, केवळ मुलावरच जुळवून घेण्याची सक्ती नसते',
        'गावाबाहेर वेगळ्या शाळा बांधणे',
        'एकात्मिक शिक्षण सर्वांना UDL देते',
        'दोघांत फरक नाही',
      ],
      exp: 'शाळेने प्रत्येक विद्यार्थ्यानुरूप अनुकूल बदल करणे हा समावेशनाचा गाभा आहे.',
    },
    hi: {
      q: '"समावेशी शिक्षा" पुराने "एकीकृत शिक्षा" मॉडल से मूलतः कैसे भिन्न है?',
      opts: [
        'समावेशी शिक्षा स्वयं विद्यालय के ढाँचे व शिक्षण को हर बच्चे के अनुरूप ढालती है, न कि केवल बच्चे को ढलने पर मजबूर करती है',
        'शहर से दूर अलग स्कूल बनाना',
        'एकीकृत में UDL अनिवार्य था',
        'दोनों समान हैं',
      ],
      exp: 'समावेशन व्यवस्था को विविध शिक्षार्थियों के अनुकूल बनाता है।',
    },
  },
  {
    topic: 'Funds of Knowledge (Moll)',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Inviting a potter or farmer parent to demonstrate soil properties in science class respects students’ "Funds of Knowledge," meaning:',
      opts: [
        'valuing practical household and community expertise as rich intellectual classroom resources',
        'replacing science completely with manual chores',
        'assuming rural homes lack knowledge',
        'collecting festival funds',
      ],
      exp: 'Connecting community craft to school concepts affirms dignity and deepens transfer.',
    },
    mr: {
      q: 'गावातील कुंभार किंवा शेतकरी पालकांना वर्गात बोलावून मातीचे गुणधर्म जाणून घेणे म्हणजे "ज्ञान-संपदेचा" (Funds of Knowledge) सन्मान करणे, याचा अर्थ:',
      opts: [
        'श्रमिक व ग्रामीण कुटुंबांतील व्यावहारिक कौशल्यांना शैक्षणिक संसाधन म्हणून मान्यता देणे',
        'विज्ञान बंद करून मजुरी करणे',
        'ग्रामीण घरांत ज्ञान नसते असे मानणे',
        'वर्गणी गोळा करणे',
      ],
      exp: 'कुटुंबातील अनुभवांना वर्गात स्थान दिल्याने मुलांचा स्वाभिमान व आकलन वाढते.',
    },
    hi: {
      q: 'स्थानीय कुम्हार या किसान अभिभावक को मिट्टी के गुण साझा करने बुलाना बच्चों के "ज्ञान-कोष" (Funds of Knowledge) का सम्मान है, अर्थात्:',
      opts: [
        'परिवारों के समृद्ध व्यावहारिक कौशल को वैध शैक्षणिक संसाधन मानना',
        'विज्ञान समाप्त करना',
        'ग्रामीण परिवारों को ज्ञानहीन मानना',
        'चंदा एकत्र करना',
      ],
      exp: 'परिवारों के जीवन-अनुभवों को कक्षा से जोड़ने पर वंचित पृष्ठभूमि के बच्चे गर्व से जुड़ते हैं।',
    },
  },
  {
    topic: 'Emotional Co-Regulation Response',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'A Class 2 child weeps after spilling watercolours over her art sheet. Which teacher response models calming Co-Regulation first?',
      opts: [
        'Kneel calmly, soothe breathing ("Accidents happen; let’s wipe together and save the corner"), then guide cleanup',
        'Scold loudly across the room for wasting supplies',
        'Send her outside alone',
        'Write 0/10 immediately on the wet paper',
      ],
      exp: 'Regulating distress calmly restores cognitive readiness before problem-solving.',
    },
    mr: {
      q: 'दुसरीतील मुलीच्या हातून चित्रावर रंग सांडतो व ती रडू लागते. शिक्षकाची भावनिक "सह-नियमन" (Co-Regulation) दाखवणारी प्रतिक्रिया कोणती?',
      opts: [
        'शेजारी बसून शांतपणे दिलासा देणे ("चूक होते कधीकधी; आपण एकत्र पुसू आणि उपाय काढू")',
        'साहित्य वाया घालवल्याबद्दल ओरडणे',
        'वर्गाबाहेर उभे करणे',
        'ओल्या कागदावर ०/१० लिहिणे',
      ],
      exp: 'भावनिक उद्रेक शांत झाल्याशिवाय मूल समस्या निवारण करू शकत नाही.',
    },
    hi: {
      q: 'दूसरी कक्षा की बच्ची से चित्र पर रंग गिर जाता है और वह रोने लगती है। शांत "सह-नियमन" का सही शिक्षक व्यवहार क्या होगा?',
      opts: [
        'पास बैठकर शांत स्वर में दिलासा देना ("गलती हो जाती है; चलो मिलकर पोंछते हैं और समाधान देखते हैं")',
        'पूरी कक्षा के सामने चिल्लाना',
        'बाहर खड़ा कर देना',
        'सीधे ०/१० अंक देना',
      ],
      exp: 'तनाव में वयस्क का शांत साथ बच्चे को समस्या-समाधान के लिए तैयार करता है।',
    },
  },
  {
    topic: 'Piaget Heteronomous to Autonomous Morality',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Piaget observed children shifting from viewing game rules as sacred unchangeable edicts ("Heteronomous") to mutually agreed consensus ("Autonomous") around:',
      opts: [
        'ages 9–11 through equal peer play and perspective-taking',
        '6 months old',
        'age 30+',
        '12–18 months',
      ],
      exp: 'Peer negotiation teaches fairness rooted in mutual respect rather than unilateral obedience.',
    },
    mr: {
      q: 'लहान मुले खेळाचे नियम न बदलणारे मानतात (परतंत्र नैतिकता), तर संमतीने नियम बदलता येतात (स्वायत्त नैतिकता) हे केव्हा समजू लागतात?',
      opts: [
        'सुमारे ९ ते ११ वर्षे वयात समवयस्क खेळ व दृष्टिकोन समजल्याने',
        '६ महिन्यांत',
        '३० वर्षांनंतर',
        '१२ महिन्यांत',
      ],
      exp: 'मित्रांसोबत खेळातील न्याय अनुभवातून मुले स्वायत्त नैतिकतेकडे येतात.',
    },
    hi: {
      q: 'पियाजे के अनुसार बच्चे खेल के नियमों को अपरिवर्तनीय (परतंत्र) से आपसी सहमति (स्वायत्त) मानने की ओर किस आयु में बढ़ते हैं?',
      opts: [
        'लगभग ९ से ११ वर्ष की आयु में समवयस्क सहयोग बढ़ने पर',
        '६ माह में',
        '३० वर्ष के बाद',
        '१२ माह में',
      ],
      exp: 'हमउम्र साथियों के साथ नियम बनाने से स्वायत्त नैतिकता विकसित होती है।',
    },
  },
  {
    topic: 'Bandura – Strongest Source of Self-Efficacy',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Among Albert Bandura’s four sources shaping Self-Efficacy ("I can accomplish this task"), which exerts the strongest impact?',
      opts: [
        'Personal Mastery Experiences (overcoming manageable challenges through effort)',
        'Empty flattery without task work',
        'Fear-based threats',
        'Comparing heights',
      ],
      exp: 'Direct personal success builds far more resilient efficacy than verbal pep talks alone.',
    },
    mr: {
      q: 'बंडुराच्या "स्व-कार्यक्षमता" (Self-Efficacy) घडवणाऱ्या चार स्रोतांपैकी सर्वात प्रभावी स्रोत कोणता?',
      opts: [
        'प्रत्यक्ष वैयक्तिक यशाचे अनुभव (Mastery Experiences)',
        'पोकळ स्तुती',
        'भीती दाखवणे',
        'उंचीची तुलना',
      ],
      exp: 'स्वतःच्या कष्टाने यश अनुभवल्यास आत्मविश्वास सर्वात भक्कम बनतो.',
    },
    hi: {
      q: 'बंडूरा के "आत्म-प्रभावकारिता" (Self-Efficacy) के चार स्रोतों में सबसे शक्तिशाली स्रोत कौन-सा है?',
      opts: [
        'स्वयं के निपुणता अनुभव (Mastery Experiences)',
        'खोखली चापलूसी',
        'डरावनी चेतावनी',
        'शारीरिक तुलना',
      ],
      exp: 'चुनौती को स्वयं हल करके मिली सफलता आत्म-विश्वास का सबसे बड़ा आधार होती है।',
    },
  },
  {
    topic: 'Classroom Action Research',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Seeing 14 pupils mix up "b" and "d", a Class 2 teacher designs a 2-week tactile intervention, compares pre/post error tallies, and adapts lessons. This systematic cycle is:',
      opts: [
        'Classroom Action Research',
        'National Decennial Census',
        'Animal Lab Conditioning',
        'Clinical Drug Trial',
      ],
      exp: 'Action Research empowers practitioners to solve local classroom puzzles systematically.',
    },
    mr: {
      q: 'वर्गातील १४ मुले अक्षरलेखनात गोंधळतात हे पाहून शिक्षिका २ आठवडे बहुसंवेदी उपाय राबवून पूर्व-पश्चात तपासणी करते. याला काय म्हणतात?',
      opts: [
        'क्रियात्मक संशोधन (Action Research)',
        'राष्ट्रीय जनगणना',
        'प्रयोगशाळा चाचणी',
        'औषध चाचणी',
      ],
      exp: 'शिक्षकाने स्वतःच्या वर्गातील समस्या सोडवण्यासाठी राबवलेले संशोधन म्हणजे क्रियात्मक संशोधन.',
    },
    hi: {
      q: 'कक्षा २ के छात्रों की लेखन उलझन देखकर शिक्षिका २ सप्ताह तक बहुसंवेदी प्रयोग लागू कर पूर्व-पश्चात जांच व सुधार करती हैं। यह क्या है?',
      opts: [
        'क्रियात्मक अनुसंधान (Action Research)',
        'राष्ट्रीय जनगणना',
        'प्रयोगशाला पशु प्रयोग',
        'औषधि परीक्षण',
      ],
      exp: 'अपनी कक्षा की समस्या सुधारने हेतु नियोजन-क्रियान्वयन-अवलोकन-चिंतन चक्र क्रियात्मक अनुसंधान है।',
    },
  },
  {
    topic: 'Micro-Teaching – Stimulus Variation',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Purposefully varying voice tone, hand gestures, board visuals, and real-object focus during a 10-minute explanation exemplifies which Micro-Teaching skill?',
      opts: [
        'Stimulus Variation',
        'Monotone Lecturing',
        'Summative Paper Setting',
        'Punitive Silence Drill',
      ],
      exp: 'Planned sensory shifts maintain curiosity and curb passive daydreaming.',
    },
    mr: {
      q: 'अध्यापनादरम्यान आवाजातील चढउतार, हातवारे, विराम आणि वस्तूंकडे लक्ष वळवणे हे सूक्ष्म-अध्यापनाचे कोणते कौशल्य आहे?',
      opts: [
        'चेतक बदल / उद्दीपक वैविध्य कौशल्य (Stimulus Variation)',
        'एकसुरी व्याख्यान',
        'संकलित प्रश्नपत्रिका',
        'दंडात्मक मौन',
      ],
      exp: 'मुलांचे अवधान टिकवण्यासाठी शिक्षक दृश्य व श्राव्य संकेतांत हेतुपुरस्सर बदल करतात.',
    },
    hi: {
      q: 'शिक्षण के दौरान स्वर उतार-चढ़ाव, हावभाव, संक्षिप्त विराम और मॉडल की ओर ध्यान मोड़ना सूक्ष्म-शिक्षण का कौन-सा कौशल है?',
      opts: [
        'उद्दीपन परिवर्तन कौशल (Stimulus Variation)',
        'नीरस व्याख्यान',
        'प्रश्न-पत्र निर्माण',
        'दंडात्मक मौन',
      ],
      exp: 'संवेदी केंद्रण में परिवर्तन छात्रों का ध्यान स्वाभाविक रूप से बनाए रखता है।',
    },
  },
  {
    topic: 'Probing Questioning Skill',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'After a partial answer ("Plants need water"), asking "Good—what else do leaves gather from sunlight and air to prepare food?" illustrates:',
      opts: [
        'Probing questioning',
        'Rhetorical dismissal',
        'Punitive conditioning',
        'Closed polling',
      ],
      exp: 'Probing prompts deepen learner reasoning rather than merely jumping to the teacher’s lecture.',
    },
    mr: {
      q: 'विद्यार्थ्याने अपूर्ण उत्तर दिल्यावर शिक्षिका विचारतात, "छान, आणि अन्न तयार करण्यासाठी पाने सूर्यप्रकाश व हवेतून काय घेतात?" हा कोणता प्रश्नप्रकार आहे?',
      opts: [
        'खोलवर नेणारे शोधक प्रश्न (Probing Questions)',
        'टोमणा',
        'दंडात्मक शिक्षा',
        'केवळ हो/नाही प्रश्न',
      ],
      exp: 'विद्यार्थ्याचे अपूर्ण उत्तर स्वीकारून त्यातून सखोल स्पष्टीकरण काढणे शोधक प्रश्न कौशल्यात येते.',
    },
    hi: {
      q: 'छात्र के अधूरे उत्तर ("पौधों को पानी चाहिए") पर पूछना, "बढ़िया, और भोजन बनाने हेतु पत्तियाँ धूप व हवा से क्या लेती हैं?" कौन-सा कौशल है?',
      opts: [
        'खोजपूर्ण / अनुशीलन प्रश्न (Probing Questions)',
        'तिरस्कारपूर्ण उपेक्षा',
        'दंडात्मक प्रतिक्रिया',
        'बंद प्रश्न',
      ],
      exp: 'छात्र के विचार को गहराई व पूर्णता की ओर ले जाना अनुशीलन प्रश्न कहलाता है।',
    },
  },
  {
    topic: 'Bowlby Attachment – Secure Base',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'John Bowlby’s Attachment Theory indicates Class 1 beginners explore classroom corners bravely when:',
      opts: [
        'a warm, predictable adult acts as an emotionally available "Secure Base"',
        'parents vanish abruptly at a locked gate',
        'teachers stay silent and distant all month',
        'children face harsh isolation corners',
      ],
      exp: 'Emotional safety launches curious exploration.',
    },
    mr: {
      q: 'जॉन बॉल्बीच्या लगाव सिद्धांतानुसार, इयत्ता पहिलीची मुले शाळेत निर्भयपणे केव्हा शिकतात?',
      opts: [
        'जेव्हा प्रेमळ व विश्वासार्ह मोठा आधार ("सुरक्षित तळ" / शिक्षक) उपलब्ध असतो',
        'गेटवरून आई-वडिलांना अचानक हाकलल्यास',
        'शिक्षकांनी कडक मौन पाळल्यास',
        'एकट्या कोपऱ्यात बसवल्यास',
      ],
      exp: 'सुरक्षित भावनिक नाते हे जिज्ञासू शोध घेण्याचा मानसिक पाया असते.',
    },
    hi: {
      q: 'जॉन बॉल्बी के लगाव सिद्धांत के अनुसार कक्षा १ के नए बच्चे निडर होकर अन्वेषण कब शुरू करते हैं?',
      opts: [
        'जब स्नेही, विश्वसनीय व उपलब्ध वयस्क ("सुरक्षित आधार") का भरोसा मिले',
        'माता-पिता को गेट पर कठोरता से हटाने पर',
        'शिक्षक के चुप रहने पर',
        'कोने में बैठाने पर',
      ],
      exp: 'भावनात्मक सुरक्षा ही प्रारंभिक विद्यालय में जिज्ञासा का आधार बनती है।',
    },
  },
  {
    topic: 'Proximodistal Motor Direction',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why can children wave whole arms cleanly long before controlling a thin pencil smoothly with fingertips?',
      opts: [
        'Proximodistal growth moves from central body trunk outward to fine extremities',
        'Cephalocaudal growth reverses upward',
        'Muscles grow solely during sleep',
        'Bones shrink during childhood',
      ],
      exp: 'Shoulder and arm coordination mature ahead of fine wrist/finger precision.',
    },
    mr: {
      q: 'लहान मूल अंगठा व बोटांनी बारीक पेन्सिल पकडण्याआधी संपूर्ण हात सहज हलवू शकते. कोणता विकास नियम हे स्पष्ट करतो?',
      opts: [
        'केंद्रापासून परिघाकडे विकास (Proximodistal)',
        'पायाकडून डोक्याकडे विकास',
        'स्नायू झोपेत वाढतात म्हणून',
        'हाडे कमी होतात म्हणून',
      ],
      exp: 'प्रथम मध्य अक्ष (खांदे) व नंतर परिघीय अवयव (बोटे) यांवर ताबा येतो.',
    },
    hi: {
      q: 'बच्चा उंगलियों से पतली पेंसिल संभालने से पहले पूरा हाथ आसानी से हिला लेता है। यह किस सिद्धांत का प्रमाण है?',
      opts: [
        'केंद्र से बाहर की ओर (Proximodistal) विकास',
        'पैर से सिर की ओर विकास',
        'हड्डियाँ घटने के कारण',
        'केवल नींद में वृद्धि',
      ],
      exp: 'समीप-दूराभिमुख सिद्धांत के अनुसार पहले बड़े स्थूल अंगों और बाद में सूक्ष्म उंगलियों पर नियंत्रण आता है।',
    },
  },
  {
    topic: 'Continuous vs Discontinuous Development',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Steady height gain reflects Continuous growth, whereas qualitative leaps in logic (Piaget’s Preoperational -> Concrete Operational shift) illustrate:',
      opts: [
        'Discontinuous (Stage-wise qualitative reorganization)',
        'Reflexive Erosion',
        'Static Homogeneity',
        'Nutritional Stunting',
      ],
      exp: 'Development combines incremental quantitative accumulation with qualitative cognitive transitions.',
    },
    mr: {
      q: 'उंची हळूहळू वाढणे हा "अखंड" विकास आहे, तर विचारांच्या गुणवत्तेतील टप्पानिहाय गुणात्मक बदल काय दर्शवतो?',
      opts: [
        'टप्पानिहाय / खंडित गुणात्मक विकास (Discontinuous Development)',
        'प्रतिक्षिप्त ऱ्हास',
        'स्थिर एकसारखेपणा',
        'पोषण कमतरता',
      ],
      exp: 'विकासात संख्यात्मक वाढीसोबत विचारांच्या संरचनेत गुणात्मक टप्पेही आढळतात.',
    },
    hi: {
      q: 'ऊँचाई का धीरे-धीरे बढ़ना निरंतर विकास है, जबकि चिंतन की गुणवत्ता में चरणबद्ध रूपांतरण क्या दर्शाता है?',
      opts: [
        'असंतत / चरणबद्ध गुणात्मक विकास (Discontinuous Stage-wise Development)',
        'प्रतिवर्त क्षरण',
        'स्थिर एकरूपता',
        'पोषण अवरोध',
      ],
      exp: 'विकास में क्रमिक वृद्धि के साथ संज्ञानात्मक संरचना में गुणात्मक अवस्थाएँ भी होती हैं।',
    },
  },
  {
    topic: 'Maturation Sets Readiness Limits',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Forcing a 10-month-old infant to trace letters produces minimal learning because:',
      opts: [
        'teaching cannot bypass biological and neural Maturation readiness',
        'infants lack eyesight',
        'practice alters DNA overnight',
        'letters contain no curves',
      ],
      exp: 'Training succeeds best once neural maturation enables prerequisite control.',
    },
    mr: {
      q: '१० महिन्यांच्या बाळाला कितीही सराव देऊन अक्षरे गिरवायला लावली तरी यश येत नाही, कारण:',
      opts: [
        'जैविक व मज्जासंस्थेची परिपक्वता (Maturation) गाठल्याशिवाय शिक्षण यशस्वी होऊ शकत नाही',
        'बाळांना दिसत नाही',
        'जनुके बदलतात',
        'अक्षरांत वळण नसते',
      ],
      exp: 'परिपक्वता आवश्यक जैविक पाया व तयारी पुरवते.',
    },
    hi: {
      q: '१० माह के शिशु को जबरदस्ती अक्षर लिखवाने का प्रयास सफल नहीं होता, क्योंकि:',
      opts: [
        'जैविक व तंत्रिकीय परिपक्वता (Maturation) के बिना शिक्षण सफल नहीं होता',
        'शिशुओं में दृष्टि नहीं होती',
        'प्रशिक्षण DNA बदल देता है',
        'अक्षरों में रेखा नहीं होती',
      ],
      exp: 'परिपक्वता सीखने की जैविक तत्परता प्रदान करती है।',
    },
  },
  {
    topic: 'Nature-Nurture Multiplicative Interaction',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Current science describes Heredity (Nature) and Environment (Nurture) in child development as:',
      opts: [
        'a dynamic continuous interaction—much like genetic seed potential blooming under soil, water, and care',
        '99% fixed heredity with 1% school effect',
        'an empty tabula rasa with zero genetic variation',
        'unrelated to brain growth',
      ],
      exp: 'Heredity and environment operate interactively rather than in isolated silos.',
    },
    mr: {
      q: 'आनुवंशिकता (Nature) आणि परिसर (Nurture) यांच्या संबंधाबाबत आधुनिक शास्त्रीय दृष्टिकोन कोणता?',
      opts: [
        'दोघांतील सततची गतिशील आंतरक्रिया – बीजातील क्षमता जमिनीचा पोत व काळजीनुसार बहरते',
        'आनुवंशिकता ९९% व शाळा फक्त १%',
        'मूल पूर्ण कोरी पाटी असते',
        'कशाचाच परिणाम नसतो',
      ],
      exp: 'आनुवंशिकता × पर्यावरण यांच्या परस्परक्रियेतून विकास घडतो.',
    },
    hi: {
      q: 'बाल विकास में आनुवंशिकता (Nature) और पर्यावरण (Nurture) पर आधुनिक वैज्ञानिक सहमति क्या है?',
      opts: [
        'दोनों की निरंतर गतिशील अंतःक्रिया — जैसे बीज की क्षमता मिट्टी व देखभाल की गुणवत्ता से खिलती है',
        'आनुवंशिकता ९९% और पर्यावरण १%',
        'बच्चा पूर्णतः खाली स्लेट है',
        'कोई प्रभाव नहीं पड़ता',
      ],
      exp: 'विकास आनुवंशिकता और पर्यावरण का परस्पर संवादात्मक परिणाम है।',
    },
  },
  {
    topic: 'Goleman EQ – Empathy in Recess',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Seeing a new classmate eating lunch alone nervously, Kabir invites him to play. Daniel Goleman places this caring act under:',
      opts: [
        'Empathy and Social Skills (Emotional Intelligence)',
        'Spatial Rotation',
        'Token Obedience',
        'Phonemic Segmentation',
      ],
      exp: 'EQ spans Self-Awareness, Self-Regulation, Motivation, Empathy, and Social Skills.',
    },
    mr: {
      q: 'शाळेत नवीन आलेला मुलगा एकटा घाबरून डबा खात असल्याचे पाहून कबीर त्याला खेळायला बोलावतो. गोलमनच्या मते हा कशाचा भाग आहे?',
      opts: [
        'भावनिक बुद्धिमत्तेतील (EQ) सहानुभूती व सामाजिक कौशल्ये',
        'अवकाशीय तर्क',
        'बाह्य बक्षिसासाठी आज्ञापालन',
        'ध्वनी संवेदनशीलता',
      ],
      exp: 'इतरांच्या भावना समजून साहाय्य करणे ही सहानुभूती (Empathy) होय.',
    },
    hi: {
      q: 'नए आए छात्र को अकेले सहमा देख कबीर उसे अपने खेल समूह में बुलाता है। गोलमैन के अनुसार यह किसका अंग है?',
      opts: [
        'संवेगात्मक बुद्धि (EQ) के अंतर्गत परानुभूति एवं सामाजिक कौशल',
        'स्थानिक तर्क',
        'पुरस्कार आज्ञापालन',
        'ध्वनि संवेदनशीलता',
      ],
      exp: 'दूसरों की भावना समझकर सहयोग करना परानुभूति (Empathy) है।',
    },
  },
  {
    topic: 'Sociometry (J.L. Moreno)',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Collecting confidential partner preferences ("Name two friends you’d enjoy doing a model with") to spot social isolates uses:',
      opts: [
        'Sociometry / Sociogram (Moreno)',
        'IQ Bell Curve',
        'Inkblot Test',
        'Snellen Eye Chart',
      ],
      exp: 'Sociograms reveal classroom social ties gently so teachers foster inclusion.',
    },
    mr: {
      q: 'मुलांना गोपनीयरीत्या "प्रकल्पासाठी दोन मित्रांची नावे लिहा" असे विचारून वर्गातील मैत्रीचे दुवे व एकाकी मुले शोधण्याच्या तंत्राला काय म्हणतात?',
      opts: [
        'समाजमिती तंत्र / सोशिओग्राम (Sociometry – मोरेनो)',
        'बुद्ध्यांक वक्र',
        'शाईचे ठिपके चाचणी',
        'दृष्टी तपासणी',
      ],
      exp: 'सोशिओग्राममुळे एकाकी विद्यार्थ्यांना गटात समाविष्ट करणे सोपे जाते.',
    },
    hi: {
      q: 'बच्चों से गोपनीय रूप से "प्रोजेक्ट में किन दो सहपाठियों के साथ काम करेंगे" पूछकर अलग-थलग बच्चों को पहचानने की विधि क्या है?',
      opts: [
        'समाजमिति तकनीक / सोशियोग्राम (Moreno)',
        'बुद्धिलब्धि वक्र',
        'स्याही धब्बा परीक्षण',
        'दृष्टि चार्ट',
      ],
      exp: 'समाजमिति से शिक्षक बिना शर्मिंदगी के एकाकी छात्रों को सहयोगी समूहों में जोड़ सकते हैं।',
    },
  },
  {
    topic: 'Objective Anecdotal Record',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Which teacher note exemplifies an objective, helpful Anecdotal Record?',
      opts: [
        '"14 Oct: During clay activity, Rahul shared extra clay with Amina and demonstrated how to steady the base."',
        '"Rahul is always a lazy troublemaker."',
        '"Girls are neater than boys."',
        '"Rahul failed due to bad family habits."',
      ],
      exp: 'Neutral, dated behavioural descriptions preserve observational objectivity.',
    },
    mr: {
      q: 'विद्यार्थ्याच्या दैनंदिन नोंदीतील (Anecdotal Record) अचूक व वस्तुनिष्ठ नोंद कोणती?',
      opts: [
        '"१४ ऑक्टोबर: मातीकामावेळी राहुलने अमिनाला माती दिली व पाया कसा पक्का करावा ते समजावले."',
        '"राहुल नेहमीच आळशी मुलगा आहे."',
        '"मुली नेहमीच स्वच्छ राहतात."',
        '"घरच्या सवयींमुळे राहुल मागे आहे."',
      ],
      exp: 'प्रसंगोचित नोंदीत दिनांकासह प्रत्यक्ष वर्तन पक्षपाताशिवाय नोंदवले जाते.',
    },
    hi: {
      q: 'शिक्षक के उपाख्यानात्मक अभिलेख (Anecdotal Record) की कौन-सी प्रविष्टि वस्तुनिष्ठ है?',
      opts: [
        '"१४ अक्तूबर: मिट्टी कार्य में राहुल ने अमीना को मिट्टी दी और आधार संतुलित करना विनम्रता से समझाया।"',
        '"राहुल हमेशा आलसी है।"',
        '"लड़कियाँ लड़कों से साफ रहती हैं।"',
        '"खराब पारिवारिक आदतों से राहुल पिछड़ा है।"',
      ],
      exp: 'अच्छा उपाख्यानात्मक अभिलेख लेबल लगाने की बजाय तिथि सहित प्रत्यक्ष व्यवहार का तटस्थ वर्णन करता है।',
    },
  },
  {
    topic: 'Parent-Teacher Collaboration Tone',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'What opening sets a constructive tone during a Parent-Teacher Meeting for a pupil facing learning gaps?',
      opts: [
        'Share one genuine strength observed in the child first, then invite parent ideas toward gentle joint steps',
        'Read a harsh list of failures while parents stay silent',
        'Blame family schooling publicly before peers',
        'Reject home observations altogether',
      ],
      exp: 'Strength-first dialogue creates shared trust between home and school.',
    },
    mr: {
      q: 'अभ्यासात अडचण येणाऱ्या विद्यार्थ्यांच्या पालक बैठकीत कोणती सुरुवात खऱ्या सहकार्याचा विश्वास निर्माण करेल?',
      opts: [
        'प्रथम मुलाचे एक खरे बलस्थान सांगून पालकांच्या सहकार्याने पुढील सुधारणेच्या पावलांवर चर्चा करणे',
        'इतर पालकांसमोर तक्रारींचा पाढा वाचणे',
        'पालकांवर दोषारोप करणे',
        'घरातील निरीक्षण नाकारणे',
      ],
      exp: 'सकारात्मक बलस्थानांपासून सुरुवात करून सहकार्य साधल्यास भागीदारी फलदायी होते.',
    },
    hi: {
      q: 'कठिनाई महसूस करने वाले छात्र के माता-पिता से बैठक में कौन-सी शुरुआत सच्ची साझेदारी बनाएगी?',
      opts: [
        'पहले बच्चे की एक खूबी साझा करना और फिर अभिभावक संग अगले ठोस कदम तय करना',
        'सबके सामने शिकायतों की सूची पढ़ना',
        'माता-पिता का दोष निकालना',
        'अभिभावक की बात अनसुनी करना',
      ],
      exp: 'बच्चे की क्षमता सराहते हुए संवाद शुरू करने से घर और स्कूल में विश्वास की नींव पड़ती है।',
    },
  },
  {
    topic: 'Negative Transfer of Learning',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Adding fraction denominators just like whole numbers (1/2 + 1/3 = 2/5) illustrates:',
      opts: [
        'Negative Transfer (prior rule interfering with a new system)',
        'Zero Transfer',
        'Bilateral Motor Transfer',
        'Insightful Subsumption',
      ],
      exp: 'Highlighting where whole-number rules break in fractions inoculates against Negative Transfer.',
    },
    mr: {
      q: 'पूर्णांकांच्या बेरजेप्रमाणे विद्यार्थी अपूर्णांकांतही अंश-अंश व छेद-छेद थेट जोडतात (१/२ + १/३ = २/५). पूर्वीच्या ज्ञानाच्या या चुकीच्या वापराला काय म्हणतात?',
      opts: [
        'ऋणात्मक अध्ययन संक्रमण (Negative Transfer)',
        'शून्य संक्रमण',
        'द्विपार्श्व संक्रमण',
        'सकारात्मक संघटन',
      ],
      exp: 'जुन्या सवयीचा नवीन परिस्थितीत अडथळा निर्माण होणे म्हणजे ऋणात्मक संक्रमण.',
    },
    hi: {
      q: 'पूर्णांकों की आदत से छात्र भिन्नों को सीधे ऊपर-नीचे जोड़ देते हैं (१/२ + १/३ = २/५)। पूर्व ज्ञान का यह गलत हस्तक्षेप क्या है?',
      opts: [
        'नकारात्मक अधिगम अंतरण (Negative Transfer)',
        'शून्य अंतरण',
        'द्विपक्षीय अंतरण',
        'सकारात्मक समावेशन',
      ],
      exp: 'पहले सीखा गया नियम जब नई स्थिति में त्रुटि उत्पन्न करे तो वह ऋणात्मक अंतरण कहलाता है।',
    },
  },
  {
    topic: 'Retroactive vs Proactive Interference',
    pattern: 'Conceptual',
    difficulty: 'Difficult',
    en: {
      q: 'After memorizing a brand-new school helpline number, a pupil temporarily forgets her older home phone number. Newer learning obscuring older recall is:',
      opts: [
        'Retroactive Interference',
        'Proactive Interference',
        'State-Dependent Recall',
        'Procedural Muscle Memory',
      ],
      exp: 'Retroactive = new disrupts old ("backward"); Proactive = old disrupts new ("forward").',
    },
    mr: {
      q: 'नवीन दूरध्वनी क्रमांक पाठ केल्यानंतर मुलगी जुना घरचा क्रमांक तात्पुरती विसरते. नवीन ज्ञानामुळे जुन्या स्मृतीत येणाऱ्या अडथळ्याला काय म्हणतात?',
      opts: [
        'पश्चगामी व्यत्यय (Retroactive Interference)',
        'पुरोगामी व्यत्यय (Proactive Interference)',
        'स्नायू स्मृती',
        'अवस्था-सापेक्ष स्मरण',
      ],
      exp: 'नवीन माहिती जुन्या माहितीला मागे ढकलते म्हणून पश्चगामी (Retroactive) व्यत्यय.',
    },
    hi: {
      q: 'नया नंबर याद करने के बाद छात्रा पुराना नंबर अस्थायी रूप से भूल जाती है। नए अधिगम द्वारा पुरानी स्मृति में बाधा डालना क्या है?',
      opts: [
        'पश्चगामी अवरोध (Retroactive Interference)',
        'पुरोगामी अवरोध (Proactive Interference)',
        'प्रक्रियात्मक स्मृति',
        'अवस्था-निर्भर स्मरण',
      ],
      exp: 'जब नया सीखना पुरानी स्मृति को बाधित करे तो पश्चगामी अवरोध कहलाता है।',
    },
  },
  {
    topic: 'Serial Position Effect (Primacy & Recency)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'When students recall a 15-word list, why are the very first and very last few words remembered much better than words in the middle?',
      opts: [
        'Serial Position Effect (Primacy from rehearsal + Recency still fresh in working memory)',
        'Optical Blind Spot',
        'Halo Interference',
        'Classical Extinction',
      ],
      exp: 'Teachers place vital summary ideas near lesson openings and closings to counter the mid-lesson dip.',
    },
    mr: {
      q: '१५ शब्दांची यादी ऐकल्यावर मुलांना सर्वात सुरुवातीचे आणि अगदी शेवटचे शब्द मधल्या शब्दांपेक्षा जास्त का आठवतात?',
      opts: [
        'क्रमिक स्थान परिणाम (Serial Position Effect – प्राथमिक व ताजेपणाचा प्रभाव)',
        'दृष्टीदोष बिंदू',
        'प्रभावळ व्यत्यय',
        'विलोपन',
      ],
      exp: 'सुरुवातीचे शब्द दीर्घकालीन स्मृतीत व शेवटचे ताज्या कार्यरत स्मृतीत टिकून राहतात.',
    },
    hi: {
      q: '१५ शब्दों की सूची सुनने पर छात्र शुरुआती और अंतिम शब्द बीच के शब्दों से बेहतर क्यों याद रखते हैं?',
      opts: [
        'क्रमिक स्थिति प्रभाव (Serial Position Effect — आद्यता व आसन्नता प्रभाव)',
        'दृष्टि अंध बिंदु',
        'प्रभामंडल अवरोध',
        'विलोपन',
      ],
      exp: 'प्रारंभिक शब्द अभ्यास से दीर्घकालिक स्मृति में और अंतिम शब्द तात्कालिक स्मृति में ताजा रहते हैं।',
    },
  },
  {
    topic: 'Pavlovian Extinction & Spontaneous Recovery',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'If a child once feared a bell paired with loud bangs, gradually ringing the soft bell alone during fun games weakens the fear response. Learning psychology terms this reduction:',
      opts: [
        'Conditioned Extinction (breaking the CS-US predictive pairing)',
        'Stimulus Generalization',
        'Negative Punishment',
        'Cognitive Insight',
      ],
      exp: 'Repeated safe exposure without the aversive event extinguishes the conditioned anxiety response.',
    },
    mr: {
      q: 'कडक आवाजाशी जोडलेल्या घंटेच्या भीतीवर, खेळांसोबत सौम्य घंटा सुरक्षित वातावरणात वारंवार ऐकवल्यास ती भीती हळूहळू नाहीशी होते. याला काय म्हणतात?',
      opts: [
        'अभिसंधित विलोपन (Conditioned Extinction)',
        'उद्दीपक सामान्यीकरण',
        'ऋणात्मक शिक्षा',
        'मर्मदृष्टी',
      ],
      exp: 'त्रासदायक घटनेशिवाय सुरक्षित अनुभव दिल्यास जोडलेली भीती विरून जाते.',
    },
    hi: {
      q: 'तेज धमाके से जुड़ी घंटी का भय दूर करने हेतु खेल के साथ सुरक्षित माहौल में वही सौम्य घंटी बजाने से डर धीरे-धीरे मिट जाता है। इसे क्या कहते हैं?',
      opts: [
        'अनुबंधित विलोपन (Conditioned Extinction)',
        'उद्दीपक सामान्यीकरण',
        'नकारात्मक दंड',
        'अंतर्दृष्टि',
      ],
      exp: 'बिना कष्टप्रद घटना के बार-बार सुरक्षित अनुभव मिलने से अनुबंधित भय समाप्त हो जाता है।',
    },
  },
  {
    topic: 'Premack Principle ("Grandma’s Rule")',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'A teacher uses pupils’ favourite drawing break as an incentive right after finishing 10 minutes of neat handwriting ("First handwriting, then drawing"). Which operant principle is this?',
      opts: [
        'Premack Principle (high-probability preferred activity reinforces lower-probability task)',
        'Learned Helplessness',
        'Overjustification',
        'Classical Discrimination',
      ],
      exp: 'David Premack showed preferred activities serve naturally as powerful motivators for less preferred chores.',
    },
    mr: {
      q: '"प्रथम १० मिनिटे स्वच्छ लेखन पूर्ण करा, मग लगेच आवडत्या चित्रकलेची संधी मिळेल" असे नियोजन स्किनरच्या अभ्यासातील कोणत्या तत्त्वावर आधारित आहे?',
      opts: [
        'प्रीमॅक तत्त्व (Premack Principle – आवडती कृती कमी आवडीच्या कृतीसाठी प्रबलक म्हणून वापरणे)',
        'असहाय्यता तत्त्व',
        'अति-समर्थन दोष',
        'अभिजात भेद',
      ],
      exp: 'विद्यार्थ्याची आवडती कृती (चित्रकला) बक्षीस म्हणून वापरून अभ्यासास प्रोत्साहन देणे हे प्रीमॅक तत्त्व होय.',
    },
    hi: {
      q: '"पहले १० मिनट साफ लेखन पूरा करो, फिर तुरंत पसंदीदा चित्रकारी करो" — यह नीति किस मनोवैज्ञानिक सिद्धांत पर आधारित है?',
      opts: [
        'प्रीमैक सिद्धांत (Premack Principle — उच्च-पसंद गतिविधि को कम-पसंद कार्य के पुनर्बलन रूप में उपयोग करना)',
        'अर्जित असहायता',
        'अति-औचित्य प्रभाव',
        'शास्त्रीय विभेदन',
      ],
      exp: 'बच्चे की स्वाभाविक प्रिय गतिविधि को अपेक्षाकृत कठिन कार्य के बाद रखने से कार्य-प्रेरणा बढ़ती है।',
    },
  },
  {
    topic: 'Seligman Learned Helplessness',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Facing repeated humiliating failures with zero helpful feedback, a pupil stops trying even on easy solvable puzzles, muttering "Nothing I do ever works." Martin Seligman names this condition:',
      opts: [
        'Learned Helplessness',
        'Intrinsic Self-Actualization',
        'Metacognitive Agency',
        'Positive Transfer',
      ],
      exp: 'Breaking learned helplessness requires tiny achievable wins paired with strategy-focused feedback.',
    },
    mr: {
      q: 'मदत न मिळता सततच्या अपयशामुळे व टीकेमुळे एक मूल अगदी सोप्या कोड्यांचा प्रयत्नही सोडून देते आणि म्हणते, "मी काहीही केले तरी चुकणारच." सेलिग्मन याला काय म्हणतात?',
      opts: [
        'अर्जित असहाय्यता (Learned Helplessness)',
        'स्व-साक्षात्कार',
        'अधिबोधनात्मक क्षमता',
        'सकारात्मक संक्रमण',
      ],
      exp: 'छोट्या सोप्या यशांच्या अनुभवातून आणि योग्य मार्गदर्शनातून अर्जित असहाय्यता दूर करता येते.',
    },
    hi: {
      q: 'बिना सही मदद लगातार असफलता व डांट सहकर बच्चा सरल पहेली पर भी प्रयास छोड़ देता है कि "मुझसे कुछ नहीं होगा"। सेलिगमैन इसे क्या कहते हैं?',
      opts: [
        'अर्जित असहायता (Learned Helplessness)',
        'आत्म-सिद्धि',
        'परासंज्ञानात्मक स्वायत्तता',
        'सकारात्मक अंतरण',
      ],
      exp: 'इसे तोड़ने हेतु छोटे साध्य सफल अनुभव व रणनीति-आधारित सहयोग देना जरूरी है।',
    },
  },
  {
    topic: 'Fixed vs Variable Ratio Schedules',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Among Skinner’s intermittent schedules of reinforcement, why does unpredictable occasional praise/recognition ("Variable Ratio") create steadier persistent effort than predictable rewards after every 5th problem?',
      opts: [
        'Anticipation stays steady without post-reward pauses and resists rapid extinction',
        'Pupils stop working whenever a reward is delayed',
        'It causes instant forgetting',
        'It forces negative punishment',
      ],
      exp: 'Variable schedules foster durable self-sustained effort once external tokens fade.',
    },
    mr: {
      q: 'प्रत्येक पाचव्या प्रश्नानंतर ठरलेले बक्षीस देण्यापेक्षा मधूनच अनपेक्षित व खऱ्या कष्टाचे कौतुक केल्यास (Variable Ratio) विद्यार्थ्यांचे सातत्य अधिक का टिकते?',
      opts: [
        'बक्षिसाचे यांत्रिक अवलंबन न बनता सातत्यपूर्ण प्रयत्न राहतात व विलोपनास प्रतिकार होतो',
        'मुले लगेच काम थांबवतात',
        'तात्काळ विस्मरण होते',
        'शिक्षा लागू होते',
      ],
      exp: 'परिवर्ती प्रबलन प्रणालीत वर्तनातील चिकाटी सर्वाधिक दीर्घकाळ टिकते.',
    },
    hi: {
      q: 'हर पाँचवें प्रश्न पर तय इनाम देने की बजाय अनियमित व सच्ची सराहना (Variable Ratio) मिलने से छात्रों की लगन अधिक स्थिर क्यों रहती है?',
      opts: [
        'इनाम के बाद रुकने की आदत नहीं बनती और प्रयास निरंतर बना रहता है',
        'बच्चे तुरंत काम छोड़ देते हैं',
        'तुरंत विस्मृति होती है',
        'दंड लागू होता है',
      ],
      exp: 'परिवर्ती अनुपात पुनर्बलन सबसे टिकाऊ व निरंतर कार्य-प्रेरणा उत्पन्न करता है।',
    },
  },
  {
    topic: 'Zone of Proximal Development Fading (Gradual Release)',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'In the "Gradual Release of Responsibility" model ("I Do -> We Do -> You Together -> You Alone"), deliberately fading out teacher hints matters because:',
      opts: [
        'temporary scaffolding must step back so the learner builds independent competence rather than permanent crutch-dependence',
        'teachers dislike helping anyone',
        'group collaboration is forbidden',
        'pupils never need guided modeling initially',
      ],
      exp: 'Scaffolding differs from permanent crutches precisely because support is progressively dismantled as mastery grows.',
    },
    mr: {
      q: 'जबाबदारीच्या क्रमशः हस्तांतरणात ("मी करतो -> आपण मिळून करू -> तुम्ही सोबतीने -> तुम्ही एकट्याने") शिक्षकांनी हळूहळू मदत कमी का करावी?',
      opts: [
        'आधार (Scaffolding) हा तात्पुरता असतो; तो टप्प्याटप्प्याने काढल्याशिवाय विद्यार्थी स्वावलंबी बनत नाही',
        'शिक्षकांना मदत करणे आवडत नाही',
        'गटचर्चा वर्ज्य असते',
        'सुरुवातीला मार्गदर्शनाची गरज नसते',
      ],
      exp: 'क्षमतेनुसार आधार कमी करत नेणे (Fading) विद्यार्थ्याला स्वतंत्र प्रावीण्याकडे नेते.',
    },
    hi: {
      q: 'जिम्मेदारी के क्रमिक हस्तांतरण ("मैं करूँ -> हम मिलकर करें -> तुम जोड़ी में -> तुम अकेले") में शिक्षक धीरे-धीरे मदद क्यों घटाते हैं?',
      opts: [
        'पाड़ (Scaffolding) अस्थायी होता है; इसे क्रमशः कम करने से ही शिक्षार्थी स्वतंत्र व आत्मनिर्भर बनता है',
        'शिक्षक सहायता करना पसंद नहीं करते',
        'समूह चर्चा वर्जित है',
        'शुरुआत में मॉडलिंग आवश्यक नहीं',
      ],
      exp: 'जैसे-जैसे दक्षता बढ़े, सहायता घटाना (Fading) सच्ची स्वायत्तता निर्माण करता है।',
    },
  },
  {
    topic: 'Concrete Manipulatives Bridging Abstraction',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why must Class 1–3 pupils physically split paper strips and clay balls before solving abstract equations like 1/2 + 1/4?',
      opts: [
        'Meaningful symbolic notation grows out of tangible physical actions and visual mental images',
        'Children lack eyesight until Class 5',
        'Clay costs less than chalk',
        'Abstract formulas cannot be taught in high school',
      ],
      exp: 'Enactive and iconic anchors prevent empty symbol-pushing without understanding.',
    },
    mr: {
      q: 'इयत्ता १–३ च्या मुलांना अमूर्त चिन्हे शिकवण्यापूर्वी कागदाच्या पट्ट्या व मातीचे गोळे का हाताळायला द्यावेत?',
      opts: [
        'प्रत्यक्ष कृती व दृश्य प्रतिमांतूनच अमूर्त चिन्हांचा खरा अर्थ मनात पक्का होतो म्हणून',
        'पाचवीपर्यंत मुलांना दिसत नाही म्हणून',
        'माती खडूपेक्षा स्वस्त असते म्हणून',
        'उच्च वर्गांत सूत्रे नसतात म्हणून',
      ],
      exp: 'मूर्त अनुभवाशिवाय अमूर्त चिन्हे शिकवल्यास केवळ यांत्रिक घोकंपट्टी होते.',
    },
    hi: {
      q: 'कक्षा १–३ के बच्चों को अमूर्त समीकरणों से पहले कागज की पट्टियाँ व मिट्टी के गोले क्यों उपयोग करने चाहिए?',
      opts: [
        'ठोस क्रियाओं व दृश्य छवियों से ही अमूर्त प्रतीकों का वास्तविक अर्थ मस्तिष्क में बैठता है',
        'पाँचवीं तक दृष्टि कमजोर रहती है',
        'मिट्टी सस्ती होती है',
        'उच्च कक्षा में सूत्र नहीं होते',
      ],
      exp: 'मूर्त अनुभव के बिना अमूर्त प्रतीक केवल अर्थहीन रटंत बनकर रह जाते हैं।',
    },
  },
  {
    topic: 'Convergent vs Divergent Questions (Guilford)',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: '"Name two rivers meeting at Sangli" checks Convergent recall, whereas "What might change in our town if annual rainfall doubled?" stimulates:',
      opts: [
        'Divergent Creative Reasoning (exploring multiple plausible consequences)',
        'Single-answer rote memory',
        'Pure spelling recall',
        'Fixed multiple-choice guessing',
      ],
      exp: 'J.P. Guilford distinguished convergent narrowing toward one answer from divergent branching into fresh possibilities.',
    },
    mr: {
      q: '"सांगली येथे कोणती नदी वाहते?" हा अभिसारी प्रश्न आहे, तर "जर गावात पाऊस दुप्पट झाला तर काय काय बदलेल?" हा प्रश्न कशास चालना देतो?',
      opts: [
        'अपसारी व सर्जनशील विचार (Divergent Thinking – अनेक शक्य परिणामांचा शोध)',
        'एकाच उत्तराचे पाठांतर',
        'शुद्धलेखन स्मरण',
        'यांत्रिक तर्क',
      ],
      exp: 'गिलफोर्डनुसार एकापेक्षा जास्त कल्पक व तर्कसंगत उत्तरे सुचणे अपसारी विचारसरणीचे लक्षण आहे.',
    },
    hi: {
      q: '"सांगली में कौन-सी नदी बहती है?" अभिसारी स्मरण है, जबकि "यदि वर्षा दोगुनी हो जाए तो शहर में क्या-क्या बदलेगा?" किस चिंतन को जगाता है?',
      opts: [
        'अपसारी सृजनात्मक चिंतन (Divergent Thinking — अनेक संभावित परिणामों की कल्पना)',
        'एकल उत्तर रटंत',
        'वर्तनी स्मरण',
        'निश्चित विकल्प अनुमान',
      ],
      exp: 'गिलफोर्ड के अनुसार एक प्रश्न के अनेक संभावित व मौलिक उत्तर खोजना अपसारी चिंतन है।',
    },
  },
  {
    topic: 'Critical Thinking – Evaluating Claims With Evidence',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Hearing a viral rumour that eating lemon cures broken bones overnight, a Class 5 teacher asks: "What reliable observation or medical proof would test whether that claim holds?" This nurtures:',
      opts: [
        'Critical Thinking and Scientific Temper (Article 51A(h) constitutional value)',
        'Blind superstition compliance',
        'Personal humiliation of parents',
        'Passive note-copying',
      ],
      exp: 'Evaluating assertions against evidence rather than hearsay builds scientific rationality.',
    },
    mr: {
      q: 'लिंबू खाल्ल्याने तुटलेले हाड एका रात्रीत जुळते अशा अफवेवर शिक्षिका विचारतात, "हे विधान खरे मानण्यापूर्वी कोणता प्रत्यक्ष वैद्यकीय पुरावा व निरीक्षण तपासावे लागेल?" यातून काय घडते?',
      opts: [
        'चिकित्सक विचार व वैज्ञानिक दृष्टिकोन (संविधानातील कलम ५१A(h) चे मूल्य)',
        'अंधश्रद्धेचे समर्थन',
        'पालकांचा अपमान',
        'निष्क्रिय उतरवून घेणे',
      ],
      exp: 'अफवेऐवजी पुराव्याची मागणी करण्याची सवय लावणे हे चिकित्सक शिक्षणाचे मुख्य उद्दिष्ट आहे.',
    },
    hi: {
      q: '"नींबू खाने से टूटी हड्डी रातभर में जुड़ जाती है" जैसी अफवाह पर शिक्षिका पूछती हैं, "इसे सच मानने से पहले कौन-सा वैज्ञानिक प्रमाण जांचना होगा?" इससे क्या विकसित होता है?',
      opts: [
        'आलोचनात्मक चिंतन एवं वैज्ञानिक दृष्टिकोण (अनुच्छेद ५१A(h) मूल्य)',
        'अंधविश्वास समर्थन',
        'अभिभावक अपमान',
        'निष्क्रिय नकल',
      ],
      exp: 'सुनी-सुनाई बात पर तुरंत विश्वास न कर प्रमाण मांगना आलोचनात्मक व वैज्ञानिक चिंतन है।',
    },
  },
  {
    topic: 'Classroom Climate – Psychological Safety',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why do learners take healthy academic risks—raising tough questions or trying unfamiliar words—much more readily in classrooms where mistakes never trigger mockery?',
      opts: [
        'Psychological safety lowers threat fear so curiosity can explore freely',
        'Pupils stop caring about accuracy forever',
        'Mockery speeds up complex reasoning',
        'Zero feedback happens in safe rooms',
      ],
      exp: 'Warm, high-expectation, zero-humiliation classrooms maximize curiosity and courageous problem solving.',
    },
    mr: {
      q: 'ज्या वर्गात चूक झाल्यावर कोणी हसत नाही किंवा थट्टा करत नाही, तिथे मुले नवे प्रश्न विचारायला व कठीण प्रयत्न करायला का पुढे येतात?',
      opts: [
        'मानसिक सुरक्षिततेमुळे (Psychological Safety) भीती नाहीशी होऊन जिज्ञासा मुक्तपणे फुलते',
        'मुलांना अचूकतेची पर्वा उरत नाही',
        'थट्टा केल्याने तर्क वेगवान होतो',
        'सुरक्षित वर्गात अभिप्राय मिळत नाही',
      ],
      exp: 'भीतीमुक्त वातावरण हे निर्भय विचार व प्रामाणिक शंकानिरसनाची पूर्वअट आहे.',
    },
    hi: {
      q: 'जिस कक्षा में गलती होने पर उपहास नहीं होता, वहाँ बच्चे कठिन प्रश्न पूछने व नए प्रयास करने का साहस क्यों दिखाते हैं?',
      opts: [
        'मनोवैज्ञानिक सुरक्षा (Psychological Safety) से भय घटता है और जिज्ञासा निडर होकर खिलती है',
        'बच्चे सटीकता की परवाह छोड़ देते हैं',
        'मजाक से तर्क तेज होता है',
        'सुरक्षित कक्षा में प्रतिपुष्टि नहीं मिलती',
      ],
      exp: 'भयमुक्त व सम्मानजनक वातावरण निर्भय अन्वेषण और सक्रिय प्रश्नोत्तर की आधारशिला है।',
    },
  },
  {
    topic: 'Restorative Conflict Resolution Among Peers',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Two pupils argue angrily after accidentally bumping each other’s geometry boxes. Which restorative resolution builds lifelong socio-emotional skills?',
      opts: [
        'Guide calm "I-statements" ("I felt upset when..."), mutual listening, and deciding together how to fix the mess',
        'Slap rulers on both desks immediately',
        'Ban both pupils from recess for a month',
        'Blame the physically smaller child automatically',
      ],
      exp: 'Restorative dialogue teaches empathy, accountability, and peaceful repair rather than resentment.',
    },
    mr: {
      q: 'दोन मुलांचे कंपास बॉक्स एकमेकांना धडकून पडल्यामुळे भांडण होते. कोणता "पुनर्रचनात्मक उपाय" (Restorative Resolution) जीवनकौशल्य घडवेल?',
      opts: [
        'शांतपणे दोघांचे म्हणणे ऐकून "मला असे वाटले..." संवाद घडवून दोघांनी मिळून सामान सावरण्याचा मार्ग शोधणे',
        'दोघांना पट्टीने मारणे',
        'महिनाभर सुट्टीची बंदी घालणे',
        'लहान मुलाला दोषी ठरवणे',
      ],
      exp: 'संवाद, सहानुभूती आणि स्वतः चूक सुधारण्याची संधी सामाजिक-भावनिक परिपक्वता वाढवते.',
    },
    hi: {
      q: 'ज्यामिति बॉक्स गिरने पर दो छात्रों में झगड़ा हो जाता है। कौन-सा "पुनर्स्थापनात्मक समाधान" (Restorative Resolution) जीवन-कौशल सिखाएगा?',
      opts: [
        'शांत "मैं-कथन" संवाद कराकर एक-दूसरे की बात सुनना और मिलकर सामान व्यवस्थित करने का उपाय निकालना',
        'दोनों को स्केल से सजा देना',
        'एक महीने का विश्राम रोक देना',
        'अपेक्षाकृत छोटे बच्चे को दोषी ठहराना',
      ],
      exp: 'संवाद व जिम्मेदारी-आधारित समाधान प्रतिशोध की बजाय परानुभूति व आत्म-नियंत्रण सिखाता है।',
    },
  },
  {
    topic: 'Gender-Inclusive Textbooks & Role Models',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Easy',
    en: {
      q: 'Inspecting school textbooks to ensure women scientists, farmers, astronauts, and caring fathers appear regularly advances:',
      opts: [
        'constitutional gender equality and broader aspirations for every child',
        'historical distortion',
        'elimination of family life topics',
        'confusion over grammar rules',
      ],
      exp: 'Representative curriculum imagery expands career horizons and self-efficacy for all genders.',
    },
    mr: {
      q: 'पाठ्यपुस्तकांत महिला वैज्ञानिक, शेतकरी, अंतराळवीर आणि घरकामात मदत करणारे वडील दाखवणे काय साध्य करते?',
      opts: [
        'संवैधानिक लिंगभाव समानता आणि सर्व मुलांसाठी व्यापक आकांक्षा निर्माण करणे',
        'इतिहासाचे विद्रुपीकरण',
        'कौटुंबिक विषयांची समाप्ती',
        'व्याकरण गोंधळ',
      ],
      exp: 'विविध व सकारात्मक भूमिकांचे प्रतिनिधित्व मुलांच्या दृष्टीला संकुचित रूढींपासून मुक्त करते.',
    },
    hi: {
      q: 'पाठ्यपुस्तकों में महिला वैज्ञानिक, किसान, अंतरिक्ष यात्री तथा घर की देखभाल करते पिता को दर्शाना क्या बढ़ावा देता है?',
      opts: [
        'संवैधानिक लैंगिक समानता और हर बच्चे के लिए व्यापक आकांक्षाएँ',
        'इतिहास विकृति',
        'पारिवारिक विषयों की समाप्ति',
        'व्याकरण भ्रम',
      ],
      exp: 'संतुलित प्रतिनिधित्व बच्चों के मन से संकीर्ण रूढ़ियाँ मिटाता है।',
    },
  },
];
