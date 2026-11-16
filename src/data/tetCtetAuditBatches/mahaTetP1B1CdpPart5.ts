import { CuratedTrilingualMcq } from './types';

// MAHA TET Paper 1 (Classes 1-5) — Child Development & Pedagogy
// Curated Audit Batch 1 Part 5 (35 Distinct Trilingual Questions)
export const MAHA_TET_P1_B1_CDP_PART5: CuratedTrilingualMcq[] = [
  {
    topic: 'Lev Vygotsky Social Speech to Inner Speech Sequence',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'According to Lev Vygotsky, what developmental trajectory do young children follow as speech transforms into verbal thought?',
      opts: [
        'Social Speech (communicating aloud with caregivers) -> Private Speech (self-guiding aloud) -> Silent Inner Speech',
        'Inner Speech -> Autism -> Social Speech',
        'Written Grammar -> Social Speech -> Private Speech',
        'Motor Babbling -> Complete Silence by Age 8',
      ],
      exp: 'Vygotsky traced speech originating socially around age 2, branching into self-regulatory private speech (~3–7), and becoming silent inner verbal thought.',
    },
    mr: {
      q: 'लेव्ह वायगॉत्स्की यांच्या मते बालकातील भाषा अंतर्गत विचारांत रूपांतरित होण्याचा विकासात्मक क्रम कोणता?',
      opts: [
        'सामाजिक भाषा (इतरांशी संवाद) -> खाजगी भाषा (स्वतःला मोठ्याने मार्गदर्शन) -> शांत आंतरिक भाषा (Inner Speech)',
        'आंतरिक भाषा -> सामाजिक भाषा -> मौन',
        'लेखन व्याकरण -> सामाजिक भाषा -> खाजगी भाषा',
        'बडबड -> वय ८ पर्यंत पूर्ण शांतता',
      ],
      exp: 'वायगॉत्स्कीनुसार आधी सामाजिक संवादातून भाषा येते, नंतर स्वतःशी बोलणे (खाजगी भाषा) व शेवटी ती आंतरिक विचार बनते.',
    },
    hi: {
      q: 'लेव वाइगोत्स्की के अनुसार बच्चे की भाषा के आंतरिक चिंतन में बदलने का सही विकासात्मक क्रम क्या है?',
      opts: [
        'सामाजिक वाक् (दूसरों से संवाद) -> निजी वाक् (स्व-निर्देशन हेतु बोलना) -> मौन आंतरिक वाक् (Inner Speech)',
        'आंतरिक वाक् -> सामाजिक वाक् -> मौन',
        'लिखित व्याकरण -> सामाजिक वाक् -> निजी वाक्',
        'बबलाना -> ८ वर्ष तक पूर्ण चुप्पी',
      ],
      exp: 'वाइगोत्स्की के अनुसार पहले सामाजिक वाक्, फिर स्व-नियमनकारी निजी वाक् और अंत में मौन आंतरिक चिंतन विकसित होता है।',
    },
  },
  {
    topic: 'Piaget Deferred Imitation Emergence',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Around 18–24 months, a toddler watches an older cousin stir tea gently and the very next morning picks up a toy spoon to mimic stirring inside an empty cup. What capability emerged?',
      opts: [
        'Deferred Imitation (mental symbolic representation bridging memory across time)',
        'Concrete logical seriation',
        'Propositional deductive argument',
        'Post-conventional empathy',
      ],
      exp: 'Deferred imitation signals the child can form and recall mental symbols after a model is no longer present.',
    },
    mr: {
      q: '१८–२४ महिन्यांचे बाळ आदल्या दिवशी मोठ्या भावाने चमच्याने चहा ढवळताना पाहते आणि दुसऱ्या दिवशी सकाळी रिकाम्या कपात खेळण्यातील चमचा फिरवते. यास काय म्हणतात?',
      opts: [
        'विलंबित अनुकरण (Deferred Imitation – पाहिल्याचा मानसिक ठसा नंतर कृतीत आणणे)',
        'मूर्त क्रमबद्धता',
        'औपचारिक निगमन तर्क',
        'उत्तर-पारंपरिक सहअनुभूती',
      ],
      exp: 'समोर नमुना नसतानाही पूर्वी पाहिलेल्या कृतीची नक्कल करणे म्हणजे विलंबित अनुकरण, जे प्रतीकात्मक विचाराची नांदी ठरते.',
    },
    hi: {
      q: '१८–२४ माह का शिशु एक दिन बड़े भाई को चम्मच से चाय हिलाते देखता है और अगली सुबह खाली कप में खिलौने का चम्मच घुमाता है। यह क्या दर्शाता है?',
      opts: [
        'विलंबित अनुकरण (Deferred Imitation – समय अंतराल के बाद मानसिक प्रतीक का प्रदर्शन)',
        'मूर्त क्रमबद्धता',
        'निगमनात्मक तर्क',
        'उत्तर-पारंपरिक सहानुभूति',
      ],
      exp: 'मॉडल के सामने न रहने पर भी बाद में उसकी क्रिया दोहराना विलंबित अनुकरण है, जो प्रतीकात्मक चिंतन का आरंभ दर्शाता है।',
    },
  },
  {
    topic: 'Piaget Compensation Principle Conservation',
    pattern: 'Analytical',
    difficulty: 'Difficult',
    en: {
      q: 'Asked why two unequal-height glasses hold the same milk, 8-year-old Irfan answers: "This glass is taller, yes—but it is also narrower, so both balance out!" Which justification is this?',
      opts: [
        'Compensation / Reciprocity (decentering to coordinate two changing dimensions simultaneously)',
        'Preoperational centration on height',
        'Egocentric animism',
        'Retroactive interference',
      ],
      exp: 'Compensation recognizes that a gain in one dimension (height) offsets a reduction in another (width), marking decentration.',
    },
    mr: {
      q: 'वेगळ्या उंचीच्या दोन पेल्यांत समान दूध का आहे? यावर ८ वर्षांचा इरफान म्हणतो, "हा पेला जास्त उंच आहे खरा—पण तो अरुंदही आहे, त्यामुळे दोन्ही जुळून येते!" हा कोणता तर्क आहे?',
      opts: [
        'भरपाई / परस्पर समन्वय (Compensation – एकाच वेळी उंची व रुंदी या दोन्ही मितींचा विकेंद्रीकृत विचार)',
        'पूर्व-क्रियात्मक उंची केंद्रीकरण',
        'अहंकेंद्री सजीवत्वारोपण',
        'पश्चलक्षी अवरोध',
      ],
      exp: 'एका बाजूची वाढ दुसऱ्या बाजूच्या कमीपणाची भरपाई करते ही समज म्हणजे विकेंद्रीकरण व भरपाई तर्क (Compensation).',
    },
    hi: {
      q: 'अलग ऊँचाई के दो गिलासों में समान दूध होने पर ८ वर्षीय इरफान कहता है, "यह गिलास ऊँचा जरूर है—पर पतला भी है, इसलिए दोनों बराबर हैं!" यह कौन-सा तर्क है?',
      opts: [
        'क्षतिपूर्ति / व्युत्क्रम समन्वय (Compensation – एक साथ ऊँचाई व चौड़ाई दोनों पर विकेंद्रित ध्यान)',
        'पूर्व-संक्रियात्मक ऊँचाई केंद्रीकरण',
        'अहंकेंद्रित जीववाद',
        'पश्चलक्षी अवरोध',
      ],
      exp: 'एक आयाम की बढ़त दूसरे आयाम की कमी की भरपाई करती है—यह समझना विकेंद्रीकरण और क्षतिपूर्ति तर्क है।',
    },
  },
  {
    topic: 'Inclusive Dyslexia Spelling Evaluation Mercy',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'In an EVS test, a learner with documented dyslexia writes "The rivr wotr flowd fast to the see" showing accurate scientific understanding of runoff despite phonetic spelling swaps. How should a fair teacher grade content?',
      opts: [
        'Award full conceptual credit for accurate science meaning while addressing spelling separately in multisensory literacy practice',
        'Mark the entire science answer zero due to phonetic spelling',
        'Display her answer paper as a warning example',
        'Force her to repeat Grade 4 solely for spelling',
      ],
      exp: 'Separating conceptual science assessment from decoding/orthographic accommodations prevents penalizing subject knowledge.',
    },
    mr: {
      q: 'परिसर अभ्यासाच्या उत्तरात डिसलेक्सिया असलेल्या विद्यार्थ्याने संकल्पना अचूक मांडली, पण काही शब्दांत ऱ्हस्व-दीर्घ वा अक्षरांची अदलाबदल झाली. न्याय्य शिक्षकाने गुण कसे द्यावेत?',
      opts: [
        'वैज्ञानिक आकलनास पूर्ण विषय-गुण देऊन शुद्धलेखनाचा सराव वेगळ्या बहुसंवेदी भाषा वेळेत घेणे',
        'अक्षर चुकांमुळे संपूर्ण विज्ञान उत्तर शून्य गुण देणे',
        'तिची उत्तरपत्रिका वर्गासमोर इशारा म्हणून दाखवणे',
        'फक्त शुद्धलेखनासाठी इयत्ता चौथीत नापास ठेवणे',
      ],
      exp: 'विषयाच्या संकल्पनात्मक आकलनाचे मूल्यमापन शुद्धलेखन अक्षमतेपासून वेगळे ठेवल्यास न्याय्य व समावेशक मूल्यांकन होते.',
    },
    hi: {
      q: 'EVS उत्तर में डिस्लेक्सिया से प्रभावित छात्र ने वैज्ञानिक तथ्य बिल्कुल सही समझाया पर ध्वन्यात्मक वर्तनी अशुद्धियाँ कीं। निष्पक्ष मूल्यांकन कैसा होना चाहिए?',
      opts: [
        'सही वैज्ञानिक समझ के लिए पूर्ण विषय-अंक देना और वर्तनी सुधार को अलग बहुसंवेदी भाषा अभ्यास में रखना',
        'वर्तनी अशुद्धि के कारण पूरा विज्ञान उत्तर शून्य कर देना',
        'उसकी कॉपी कक्षा में चेतावनी स्वरूप दिखाना',
        'केवल वर्तनी पर कक्षा ४ में रोक देना',
      ],
      exp: 'अवधारणात्मक विषय-ज्ञान का आकलन वर्तनी-कठिनाई से अलग रखकर करना ही समावेशी न्याय है।',
    },
  },
  {
    topic: 'RTE 2009 Teacher Accountability Section 24',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which core professional duties of a school teacher are explicitly mandated under Section 24(1) of the RTE Act, 2009?',
      opts: [
        'Maintaining regularity and punctuality, completing curriculum within specified time, assessing each child’s learning ability, and holding regular parent-teacher meetings',
        'Collecting monthly cash maintenance donations from parents',
        'Conducting weekly ranking elimination exams in Class 1',
        'Supervising municipal road construction projects',
      ],
      exp: 'Section 24(1) outlines punctuality, timely syllabus completion, individualized learning assessment, supplementary coaching, and parent-teacher dialogue.',
    },
    mr: {
      q: 'शिक्षण हक्क कायदा (RTE 2009) कलम २४(१) अंतर्गत शिक्षकांची कोणती व्यावसायिक कर्तव्ये स्पष्टपणे नमूद केली आहेत?',
      opts: [
        'नियमितता व वक्तशीरपणा पाळणे, विहित वेळेत अभ्यासक्रम पूर्ण करणे, प्रत्येक बालकाच्या क्षमतेचे मूल्यमापन व नियमित पालक बैठका घेणे',
        'पालकांकडून मासिक रोख वर्गणी गोळा करणे',
        'पहिलीत दर आठवड्याला चाळणी परीक्षा घेणे',
        'रस्ते बांधकामाचे पर्यवेक्षण करणे',
      ],
      exp: 'RTE कलम २४(१) शिक्षकांची नियमितता, वेळेवर अभ्यासक्रम पूर्णत्व, वैयक्तिक अध्ययन मूल्यमापन व पालक संवाद ही कर्तव्ये सांगते.',
    },
    hi: {
      q: 'RTE अधिनियम २००९ की धारा २४(१) के अंतर्गत विद्यालय शिक्षक के कौन-से मुख्य कर्तव्य निर्धारित हैं?',
      opts: [
        'नियमितता व समयबद्धता, निर्धारित समय में पाठ्यक्रम पूर्ण करना, प्रत्येक बच्चे की सीखने की क्षमता का आकलन और नियमित अभिभावक बैठकें',
        'अभिभावकों से मासिक नकद चंदा इकट्ठा करना',
        'कक्षा १ में साप्ताहिक छंटनी परीक्षा लेना',
        'सड़क निर्माण की निगरानी करना',
      ],
      exp: 'धारा २४(१) समय की पाबंदी, समय पर पाठ्यक्रम पूरा करने, वैयक्तिक आकलन और अभिभावक संवाद को शिक्षक के मूल दायित्व बताती है।',
    },
  },
  {
    topic: 'Krashen Affective Filter Low-Anxiety Class',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Even in general learning psychology, why do warm laughter, gentle error normalization, and supportive peers lower what linguists call the "Affective Filter"?',
      opts: [
        'Reduced embarrassment and fear allow working memory and voluntary participation to operate freely',
        'Laughter erases printed blackboard sentences',
        'Fear sharpens divergent creativity naturally',
        'Silence blocks social belonging completely',
      ],
      exp: 'When anxiety, embarrassment, or harsh perfectionism stay low (low affective filter), children take intellectual risks willingly.',
    },
    mr: {
      q: 'स्नेहपूर्ण हास्य, चुकांची सहज स्वीकृती आणि सहकाऱ्यांचा आधार यामुळे वर्गातील "भावनिक गाळणी" (Affective Filter / ताण) कशी कमी होते?',
      opts: [
        'अपमानाची व चुकीची भीती कमी झाल्याने कार्यकारी स्मृती मोकळी राहते व मुले निर्भयपणे सहभागी होतात',
        'हसण्यामुळे फळ्यावरचे शब्द पुसले जातात',
        'भीतीमुळे सर्जनशीलता आपोआप वाढते',
        'शांततेमुळे सामाजिक आपलेपणा संपतो',
      ],
      exp: 'भीती व संकोच कमी झाल्यास (Low Affective Filter) विद्यार्थ्यांमधील शिकण्याची ग्रहणशीलता मोठ्या प्रमाणात वाढते.',
    },
    hi: {
      q: 'स्नेहपूर्ण माहौल, त्रुटियों की सहज स्वीकृति और सहपाठी सहयोग कक्षा में "भावात्मक अवरोध" (Affective Filter) को कैसे घटाते हैं?',
      opts: [
        'शर्म और भय घटने से कार्यशील स्मृति मुक्त रहती है और बच्चे निडर होकर भागीदारी करते हैं',
        'हँसी से श्यामपट्ट की लिखावट मिट जाती है',
        'भय से अपसारी रचनात्मकता अपने आप तेज होती है',
        'मौन से अपनापन समाप्त होता है',
      ],
      exp: 'कम चिंता और उच्च आत्मविश्वास (निम्न भावात्मक अवरोध) विद्यार्थियों में सीखने व प्रयोग करने का साहस बढ़ाते हैं।',
    },
  },
  {
    topic: 'Vygotsky Make-Believe Play Role in Self-Control',
    pattern: 'Conceptual',
    difficulty: 'Difficult',
    en: {
      q: 'Why did Lev Vygotsky observe that a 5-year-old playing "traffic police officer" or "post office clerk" exhibits higher impulse control than during ordinary chores?',
      opts: [
        'Sociodramatic make-believe play embeds internal social rules that motivate the child to curb impulses voluntarily to stay in role',
        'Play uniforms tighten arm circulation',
        'Post-office play stops verbal communication',
        'Toys contain zero symbolic thinking',
      ],
      exp: 'Vygotsky famously noted that in pretend play, a child behaves "a head taller than himself" by practicing voluntary rule-following.',
    },
    mr: {
      q: 'लेव्ह वायगॉत्स्की यांच्या मते "पोस्टमन" किंवा "वाहतूक पोलीस" असा नाट्यात्मक खेळ खेळणारे ५ वर्षांचे मूल एरवीपेक्षा अधिक स्वयं-नियंत्रण का दाखवते?',
      opts: [
        'नाट्यात्मक खेळात भूमिका निभावण्यासाठी मूल स्वेच्छेने स्वतःच्या आवेगांवर नियंत्रण ठेवून सामाजिक नियमांचे पालन करते',
        'खेळाच्या गणवेशामुळे हात जखडतात',
        'या खेळात बोलणे पूर्ण थांबते',
        'खेळण्यांत प्रतीकात्मक विचार नसतो',
      ],
      exp: 'वायगॉत्स्कीच्या मते कल्पनाशील भूमिका-खेळात बालक आपल्या रोजच्या क्षमतेपेक्षा एक पाऊल वर जाऊन स्वयंशिस्तीचा सराव करते.',
    },
    hi: {
      q: 'वाइगोत्स्की के अनुसार "ट्रैफिक पुलिस" या "डाकघर" का अभिनय-खेल खेलते समय ५ वर्षीय बच्चा सामान्य काम की तुलना में अधिक आत्म-नियमन क्यों दिखाता है?',
      opts: [
        'भूमिका-खेल के आंतरिक सामाजिक नियम बच्चे को पात्र में बने रहने हेतु स्वेच्छा से आवेग रोकने की प्रेरणा देते हैं',
        'खेल की वर्दी हाथ बाँध देती है',
        'डाकघर खेल मौखिक संवाद रोकता है',
        'खिलौनों में प्रतीकात्मक चिंतन नहीं होता',
      ],
      exp: 'वाइगोत्स्की के अनुसार काल्पनिक खेल में बच्चा सामाजिक नियमों का स्वेच्छा से पालन कर आत्म-नियमन का उच्च स्तर अभ्यास करता है।',
    },
  },
  {
    topic: 'Inclusive Gender Non-Conforming Empathy',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 5 boy enjoys embroidery and rangoli design while a girl prefers carpentry and football. Peers snicker during hobby club registration. How should a teacher handle this?',
      opts: [
        'Protect both learners respectfully, normalize diverse skills across all genders with real examples, and praise craftsmanship openly',
        'Switch the boy forcefully into wrestling and the girl into sewing to prevent teasing',
        'Ban hobby clubs permanently',
        'Join peers in laughing lightly so the tension fades',
      ],
      exp: 'Human interests and talents know no gender boundaries; teachers must actively safeguard every child’s freedom of expression.',
    },
    mr: {
      q: 'पाचवीतील एका मुलाला रांगोळी व भरतकाम आवडते तर एका मुलीला फुटबॉल व सुतारकाम आवडते. छंद मंडळ नोंदणीत इतर मुले हसतात. शिक्षकांनी काय करावे?',
      opts: [
        'दोघांच्याही आवडींचे आदराने संरक्षण करून विविध क्षेत्रांतील उदाहरणांतून सर्व कौशल्ये सर्वांसाठी खुली असल्याचे स्पष्ट करणे व कौतुक करणे',
        'चिडवणे टाळण्यासाठी मुलाला कुस्तीत व मुलीला शिवणकामात बळजबरीने घालणे',
        'छंद मंडळ कायमचे बंद करणे',
        'ताण हलका करण्यासाठी मुलांसोबत हसणे',
      ],
      exp: 'कोणत्याही कलेला वा क्रीडेला लिंगाचे बंधन नसते; शिक्षकाने प्रत्येक विद्यार्थ्यांच्या निवडीचा आदर व संरक्षण करावे.',
    },
    hi: {
      q: 'कक्षा ५ के एक लड़के को कढ़ाई-रंगोली और एक लड़की को फुटबॉल-बढ़ईगीरी पसंद है। हॉबी क्लब पंजीकरण में सहपाठी हँसते हैं। शिक्षक को क्या करना चाहिए?',
      opts: [
        'दोनों की रुचियों की गरिमापूर्वक रक्षा करना, वास्तविक उदाहरणों से सभी कौशलों को सबके लिए सहज बताना और कला की सराहना करना',
        'चिढ़ाने से बचने के लिए लड़के को कुश्ती और लड़की को सिलाई में जबरदस्ती डालना',
        'हॉबी क्लब हमेशा के लिए बंद करना',
        'बच्चों के साथ हल्के से हँस देना',
      ],
      exp: 'रुचियों और प्रतिभाओं का कोई जेंडर नहीं होता; हर बच्चे की स्वतंत्र रचनात्मक अभिव्यक्ति की सुरक्षा शिक्षक का कर्तव्य है।',
    },
  },
  {
    topic: 'Portfolio Selection Criteria vs Work Dump',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Who should participate in selecting items to include inside a student’s semester growth portfolio?',
      opts: [
        'The student collaboratively with teacher guidance (so learners reflect on why a piece shows effort or breakthrough)',
        'Only an external anonymous district clerk',
        'Only parents discarding anything below 95%',
        'Randomly pulling every third torn scrap paper',
      ],
      exp: 'Learner involvement in selecting and annotating portfolio artifacts fosters metacognition and ownership.',
    },
    mr: {
      q: 'विद्यार्थ्याच्या सत्रातील प्रगती पोर्टफोलिओमध्ये कोणती कामे ठेवावीत हे निवडण्यात कोणाचा सहभाग असावा?',
      opts: [
        'शिक्षकांच्या मार्गदर्शनासह स्वतः विद्यार्थ्याचा (ज्यामुळे आपण का प्रगती केली यावर तो स्व-चिंतन करतो)',
        'केवळ बाहेरील अज्ञात जिल्हा लिपिकाचा',
        '९५% पेक्षा कमी असलेले सर्व फेकून देणाऱ्या पालकांचा',
        'दर तिसऱ्या फाटलेल्या कागदाची यादृच्छिक निवड',
      ],
      exp: 'स्वतःची सर्वोत्तम व सुधारित कामे निवडण्यात विद्यार्थ्याचा सहभाग असल्यास आत्म-परीक्षण व जबाबदारी वाढते.',
    },
    hi: {
      q: 'विद्यार्थी के सत्र-प्रगति पोर्टफोलियो में कौन-से कार्य-नमूने शामिल हों, इसके चयन में किसकी भागीदारी होनी चाहिए?',
      opts: [
        'शिक्षक के मार्गदर्शन के साथ स्वयं विद्यार्थी की (ताकि वह सोच सके कि किस कार्य में उसकी प्रगति व प्रयास दिखते हैं)',
        'केवल बाहरी अज्ञात लिपिक की',
        '९५% से कम सब फेंक देने वाले अभिभावकों की',
        'हर तीसरे फटे कागज के यादृच्छिक चयन की',
      ],
      exp: 'पोर्टफोलियो सामग्री के चयन व टिप्पणी में छात्र की भागीदारी से परासंज्ञान और स्व-स्वामित्व बढ़ता है।',
    },
  },
  {
    topic: 'RTE 2009 Free Uniforms Textbooks Midday Equality',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why does providing free textbooks, uniforms, and Mid-Day Meals alongside zero tuition fees serve constitutional educational equity?',
      opts: [
        'Indirect schooling costs and hidden hunger still exclude marginalized families even when tuition fees are waived',
        'Uniforms stop seasonal monsoon rainfall',
        'Textbooks replace classroom teachers permanently',
        'Meals prevent mathematics homework completely',
      ],
      exp: 'Removing both direct tuition and hidden out-of-pocket costs plus classroom hunger secures genuine access and attendance.',
    },
    mr: {
      q: 'शिक्षण शुल्क माफ असूनही मोफत पाठ्यपुस्तके, गणवेश आणि मध्यान्ह पोषण आहार देणे समतेसाठी आवश्यक का आहे?',
      opts: [
        'केवळ फी माफी पुरेशी नसते; पुस्तके-गणवेशाचा अप्रत्यक्ष खर्च व भूक यांमुळे वंचित कुटुंबांतील मुले शाळेबाहेर राहू नयेत म्हणून',
        'गणवेशामुळे पावसाळा थांबतो म्हणून',
        'पाठ्यपुस्तके शिक्षकांची जागा घेतात म्हणून',
        'आहारामुळे गणित गृहपाठ बंद होतो म्हणून',
      ],
      exp: 'प्रत्यक्ष व अप्रत्यक्ष शैक्षणिक अडथळे आणि कुपोषण दूर केल्यासच प्रत्येक बालक नियमित शाळेत टिकून राहतो.',
    },
    hi: {
      q: 'ट्यूशन शुल्क माफ होने के बावजूद निःशुल्क पाठ्यपुस्तकें, गणवेश और मध्याह्न भोजन प्रदान करना शैक्षिक समता के लिए क्यों आवश्यक है?',
      opts: [
        'केवल फीस माफी पर्याप्त नहीं है; पुस्तकों-वर्दी का अप्रत्यक्ष खर्च और भूख भी वंचित बच्चों के विद्यालय में ठहराव को प्रभावित करते हैं',
        'वर्दी से मानसून वर्षा रुकती है',
        'पाठ्यपुस्तकें शिक्षकों का स्थान लेती हैं',
        'भोजन गणित गृहकार्य रोकता है',
      ],
      exp: 'अप्रत्यक्ष खर्च और पोषण-असुरक्षा हटाकर ही सार्वभौमिक नामांकन एवं नियमित उपस्थिति सुनिश्चित की जा सकती है।',
    },
  },
  {
    topic: 'NCF 2005 Avoiding Exam Question Leakage of Understanding',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Why does changing numbers or rewording a familiar textbook problem slightly ("Instead of apples and baskets, ask about mangoes shared among 4 friends") test true learning?',
      opts: [
        'It distinguishes genuine conceptual transfer from blind memorization of textbook page answers',
        'It tricks honest students unfairly into failing',
        'Mangoes use different arithmetic laws than apples',
        'It makes the paper impossible to grade objectively',
      ],
      exp: 'Familiar-context variation checks whether students understand underlying structure rather than surface wording.',
    },
    mr: {
      q: 'परीक्षेत पुस्तकातीलच शब्द जसेच्या तसे न देता थोडा संदर्भ बदलल्यास ("सफरचंदाच्या जागी ४ मित्रांत आंबे वाटणे") खरे अध्ययन कसे तपासले जाते?',
      opts: [
        'यामुळे पाठांतराने उत्तर लक्षात ठेवणे आणि मूळ संकल्पनेचे खरे उपयोजन यांतील फरक स्पष्ट कळतो',
        'प्रामाणिक मुलांना नापास करण्यासाठी फसवणूक होते',
        'आंब्यांसाठी गणिताचे नियम वेगळे असतात',
        'उत्तरपत्रिका तपासणे अशक्य होते',
      ],
      exp: 'नवीन पण परिचित उदाहरणात तत्त्व लागू करता येणे हाच खऱ्या आकलनाचा पुरावा असतो.',
    },
    hi: {
      q: 'परीक्षा में किताब के प्रश्न को हूबहू देने के बजाय संदर्भ थोड़ा बदलकर पूछने ("सेब के बजाय ४ मित्रों में आम बाँटना") से वास्तविक सीख कैसे परखी जाती है?',
      opts: [
        'इससे पता चलता है कि छात्र ने प्रश्न का उत्तर रटा है या मूल अवधारणा को समझकर नए संदर्भ में लागू कर पा रहा है',
        'यह छात्रों को फेल करने का अनुचित जाल है',
        'आम के लिए गणित के नियम बदल जाते हैं',
        'इससे वस्तुनिष्ठ अंकन असंभव होता है',
      ],
      exp: 'थोड़े बदले हुए परिचित संदर्भ में समस्या हल करना रटंत के विपरीत वास्तविक अवधारणात्मक स्थानांतरण की पुष्टि करता है।',
    },
  },
  {
    topic: 'Bronfenbrenner Macrosystem Cultural Belief',
    pattern: 'Conceptual',
    difficulty: 'Difficult',
    en: {
      q: 'National laws (like the RTE Act 2009), constitutional equality values, and broad cultural attitudes toward girls’ schooling belong to which Bronfenbrenner ecological layer?',
      opts: [
        'The Macrosystem',
        'The Microsystem',
        'Immediate sibling dyad only',
        'Biological zygote heredity',
      ],
      exp: 'Bronfenbrenner’s Macrosystem encompasses society-wide laws, cultural ideologies, economic structures, and constitutional values.',
    },
    mr: {
      q: 'राष्ट्रीय कायदे (जसे RTE २००९), संवैधानिक समता मूल्ये आणि मुलींच्या शिक्षणाबाबतचा व्यापक सांस्कृतिक दृष्टिकोन ब्रॉन्फेनब्रेनरच्या कोणत्या स्तरात येतो?',
      opts: [
        'मॅक्रोसिस्टम (Macrosystem – व्यापक सामाजिक-सांस्कृतिक व कायदेशीर चौकट)',
        'मायक्रोसिस्टम (सूक्ष्म स्तर)',
        'केवळ भावंडांचे नाते',
        'जैविक गुणसूत्र वारसा',
      ],
      exp: 'समाजातील कायदे, संविधानिक मूल्ये, परंपरा व धोरणे हे ब्रॉन्फेनब्रेनरच्या मॅक्रोसिस्टमचा भाग असतात.',
    },
    hi: {
      q: 'राष्ट्रीय कानून (जैसे RTE २००९), संवैधानिक समता मूल्य और बालिका शिक्षा के प्रति व्यापक सांस्कृतिक दृष्टिकोण ब्रॉन्फेनब्रेनर के किस तंत्र में आते हैं?',
      opts: [
        'बृहतमंडल (Macrosystem – व्यापक सांस्कृतिक मूल्य, नीतियाँ एवं कानून)',
        'सूक्ष्ममंडल (Microsystem)',
        'केवल भाई-बहन संबंध',
        'जैविक आनुवंशिकता',
      ],
      exp: 'समाज के व्यापक कानून, सांस्कृतिक विचारधाराएँ और संवैधानिक मानक ब्रॉन्फेनब्रेनर के बृहतमंडल (Macrosystem) में आते हैं।',
    },
  },
  {
    topic: 'ADHD Executive Organization Visual Cues',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Why does taping a tiny 3-icon picture checklist ("1. Date  2. Margin  3. Check units") cleanly onto the top corner of a distracted learner’s desk help more than constant verbal reminders?',
      opts: [
        'It offloads working memory calmly and promotes private self-monitoring without repeated public nagging',
        'Tape improves ink flow in ballpoint pens',
        'Icons forbid students from asking questions',
        'Public scolding works slower than silent desk corners',
      ],
      exp: 'Discrete visual self-monitoring cues preserve dignity and foster independent executive routines.',
    },
    mr: {
      q: 'अस्वस्थ/चंचल लक्ष असलेल्या विद्यार्थ्यांच्या बाकाच्या कोपऱ्यावर सतत तोंडी टोकण्यापेक्षा ३-चिन्हांची छोटी यादी ("१. दिनांक २. समास ३. एकक तपासा") चिकटवणे अधिक उपयुक्त का ठरते?',
      opts: [
        'सारख्या जाहीर रागावण्याशिवाय कार्यकारी स्मृतीला शांत आधार मिळतो आणि स्वतः तपासण्याची सवय लागते',
        'चिकटपट्टीमुळे पेनाची शाई चांगली चालते',
        'चिन्हांमुळे प्रश्न विचारण्यास मनाई होते',
        'जाहीर ओरडणे शांतपणे होतात',
      ],
      exp: 'बाकावरील छोटे दृश्य संकेत (Visual Cues) विद्यार्थ्याचा स्वाभिमान जपून स्व-नियमन कौशल्य वाढवतात.',
    },
    hi: {
      q: 'ध्यान भटकने वाले छात्र को बार-बार मौखिक टोकने के बजाय उसकी मेज के कोने पर ३-चिह्न की छोटी जांच-पट्टी ("१. तिथि २. हाशिया ३. इकाई") चिपकाना अधिक मददगार क्यों है?',
      opts: [
        'यह सार्वजनिक डांट के बिना कार्यशील स्मृति को शांत सहारा देता है और निजी स्व-निरीक्षण की आदत विकसित करता है',
        'टेप से पेन की स्याही तेज चलती है',
        'चिह्न प्रश्न पूछना रोकते हैं',
        'सार्वजनिक डांट कम सुनाई देती है',
      ],
      exp: 'निजी मेज संकेत सम्मान बनाए रखते हुए कार्य-नियोजन एवं आत्म-निगरानी को सरल बनाते हैं।',
    },
  },
  {
    topic: 'Bloom Understanding Level Paraphrasing Test',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: '"Explain in your own two sentences why water drops form on the outside of a cold earthen pot during humid afternoons." Which Bloom level does "explain in your own words" assess?',
      opts: [
        'Understanding (Comprehension)',
        'Rote Remembering solely',
        'Psychomotor muscle strength',
        'Norm-referenced percentile speed',
      ],
      exp: 'Restating or interpreting a scientific phenomenon in one’s own words assesses Comprehension / Understanding beyond verbatim recall.',
    },
    mr: {
      q: '"थंड मातीच्या मडक्याच्या बाहेरील पृष्ठभागावर पावसाळ्यात पाण्याचे थेंब का जमा होतात ते तुमच्या स्वतःच्या शब्दांत दोन वाक्यांत स्पष्ट करा." हा ब्लूमच्या कोणत्या पातळीचा प्रश्न आहे?',
      opts: [
        'आकलन (Understanding – स्वतःच्या शब्दांत स्पष्टीकरण)',
        'केवळ पाठांतर (Remembering)',
        'स्नायूंची ताकद',
        'टक्केवारी वेग',
      ],
      exp: 'पुस्तकातील वाक्य जसेच्या तसे न सांगता स्वतःच्या शब्दांत कारण स्पष्ट करणे म्हणजे आकलन (Understanding) पातळी होय.',
    },
    hi: {
      q: '"नम दोपहर में ठंडे मिट्टी के घड़े के बाहर पानी की बूँदें क्यों जमती हैं—अपने शब्दों में दो वाक्यों में समझाइए।" यह ब्लूम के किस स्तर का आकलन है?',
      opts: [
        'अवबोध / समझ (Understanding – अपने शब्दों में व्याख्या)',
        'केवल रटंत स्मरण',
        'पेशीय शक्ति',
        'पर्सेंटाइल गति',
      ],
      exp: 'किसी वैज्ञानिक प्रक्रिया की अपने शब्दों में व्याख्या करना ब्लूम के "अवबोध" (Understanding) स्तर को जांचता है।',
    },
  },
  {
    topic: 'Inclusive Gifted Sensitivity to Boredom Signals',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'When gifted students finish tasks cleanly in a fraction of allotted time and stare out windows respectfully, what misinterpretation should teachers avoid?',
      opts: [
        'Misreading under-challenged boredom as laziness or attention disorder; instead offer tiered inquiry depth or independent mini-research',
        'Assigning extra dull identical drill sheets as "discipline"',
        'Referring them hastily for expulsion',
        'Reducing recess minutes as motivation',
      ],
      exp: 'Under-challenged curious minds look disengaged during repetitive drills; meaningful complexity rekindles focus immediately.',
    },
    mr: {
      q: 'प्रज्ञावान विद्यार्थी दिलेले काम वेळेआधी अचूक पूर्ण करून खिडकीबाहेर पाहत बसतात. शिक्षकांनी कोणता चुकीचा अर्थ लावणे टाळावे?',
      opts: [
        'आव्हान न मिळाल्याने आलेल्या कंटाळ्याला आळशीपणा किंवा अवधानदोष समजू नये; त्याऐवजी सखोल शोधकार्य व स्वतंत्र लहान प्रकल्प द्यावेत',
        'शिस्त म्हणून त्याच प्रकारचा कंटाळवाणा सराव अधिक द्यावा',
        'तातडीने शाळेतून काढण्याचा विचार करावा',
        'सुट्टीतील खेळ कमी करावेत',
      ],
      exp: 'योग्य बौद्धिक आव्हानाअभावी प्रज्ञावान मुले अस्वस्थ दिसू शकतात; समृद्ध विस्तारित कार्य त्यांना पुन्हा प्रवृत्त करते.',
    },
    hi: {
      q: 'प्रतिभाशाली छात्र दिए गए कार्य को आधे समय में ही सही कर खिड़की से बाहर देखने लगते हैं। शिक्षक को किस गलतफहमी से बचना चाहिए?',
      opts: [
        'चुनौती की कमी से उपजी ऊब को आलस्य या ध्यान-विकार मानने की भूल न करें; उन्हें गहन अन्वेषण या स्वतंत्र लघु-शोध दें',
        'अनुशासन के नाम पर उसी तरह का अतिरिक्त उबाऊ अभ्यास दें',
        'निष्कासन की सिफारिश करें',
        'मध्यावकाश कम कर दें',
      ],
      exp: 'पर्याप्त चुनौती न मिलने पर प्रतिभाशाली छात्र ऊब सकते हैं; स्तरानुकूल गहन कार्य उनकी सक्रिय जिज्ञासा लौटाता है।',
    },
  },
  {
    topic: 'Skinner Shaping by Successive Approximations',
    pattern: 'Conceptual',
    difficulty: 'Difficult',
    en: {
      q: 'A hesitant first-grader initially only points at a picture book, then says single nouns ("Dog"), next short phrases ("Brown dog runs"), and each step receives encouraging teacher warmth. In operant psychology this step-by-step building is:',
      opts: [
        'Shaping (reinforcing successive approximations toward a complex target skill)',
        'Classical extinction',
        'Spontaneous amnesia',
        'Retroactive interference',
      ],
      exp: 'Shaping reinforces gradual closer approximations systematically rather than demanding finished perfection on Day 1.',
    },
    mr: {
      q: 'संकोचणारा पहिलीचा विद्यार्थी सुरुवातीला फक्त चित्राकडे बोट दाखवतो, नंतर एक शब्द ("कुत्रा") म्हणतो आणि पुढे छोटे वाक्य ("तपकिरी कुत्रा पळतो") बोलतो; प्रत्येक टप्प्यावर स्नेहपूर्ण प्रोत्साहन मिळते. याला काय म्हणतात?',
      opts: [
        'वर्तन घडवणूक / आकार देणे (Shaping – अंतिम कौशल्याच्या दिशेने क्रमिक टप्प्यांचे प्रबलन)',
        'अभिजात विलोपन',
        'उत्स्फूर्त विस्मरण',
        'पश्चलक्षी अवरोध',
      ],
      exp: 'प्रथम दिवसापासून परिपूर्णतेची अपेक्षा न करता प्रत्येक छोट्या सुधारणेचे कौतुक करून कौशल्य घडवणे म्हणजे Shaping होय.',
    },
    hi: {
      q: 'संकोची कक्षा १ का छात्र पहले चित्र की ओर इशारा करता है, फिर एक शब्द ("कुत्ता") और बाद में छोटा वाक्य ("भूरा कुत्ता दौड़ता है") बोलता है तथा हर कदम पर सराहना पाता है। यह प्रक्रिया क्या है?',
      opts: [
        'आकार देना / क्रमिक सन्निकटन (Shaping – लक्षित जटिल कौशल के क्रमिक चरणों का पुनर्बलन)',
        'शास्त्रीय विलोपन',
        'स्वतः विस्मृति',
        'पश्चलक्षी अवरोध',
      ],
      exp: 'अंतिम पूर्णता की पहले ही दिन मांग न कर हर छोटे सार्थक कदम को प्रोत्साहित करना क्रमिक आकार देना (Shaping) कहलाता है।',
    },
  },
  {
    topic: 'Individual Differences Learning Environment Choice Boards',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'After reading a chapter on Shivaji Maharaj’s forts, a Class 4 teacher offers a "Choice Board": draw a labelled fort cross-section, write a 6-line courier diary, OR enact a two-minute scene with partners. Why is this inclusive?',
      opts: [
        'Multiple means of expression let diverse learners—visual, verbal, kinesthetic—demonstrate deep comprehension equitably',
        'It eliminates reading the history lesson completely',
        'Teachers skip marking two of the three options',
        'Only artistic students receive passing grades',
      ],
      exp: 'Offering structured multiple means of action and expression (UDL principle) taps strengths while honoring shared historical concepts.',
    },
    mr: {
      q: 'शिवरायांच्या किल्ल्यांचा पाठ वाचल्यावर शिक्षक पर्याय-तक्ता (Choice Board) देतात: नामनिर्देशित किल्ल्याची आकृती काढा, ६ ओळींचे किल्लेदाराचे पत्र लिहा, किंवा २ मिनिटांचे नाट्यीकरण करा. हे समावेशक का आहे?',
      opts: [
        'अभिव्यक्तीचे अनेक पर्याय (UDL तत्त्व) दिल्याने दृश्य, भाषिक आणि कृतिशील अशा विविध विद्यार्थ्यांना आपली समज समानपणे मांडता येते',
        'त्यामुळे इतिहास वाचण्याची गरज उरत नाही',
        'तीनपैकी दोन पर्याय तपासलेच जात नाहीत',
        'फक्त चित्रकार मुलेच उत्तीर्ण होतात',
      ],
      exp: 'अभिव्यक्तीचे बहुविध मार्ग दिल्यास विविध क्षमतांच्या विद्यार्थ्यांना समान यश अनुभवता येते.',
    },
    hi: {
      q: 'शिवाजी महाराज के किलों का पाठ पढ़ने के बाद शिक्षक विकल्प-पट्ट (Choice Board) देते हैं: नामांकित चित्र बनाएँ, ६-पंक्ति की डायरी लिखें, या २-मिनट का नाट्य मंचन करें। यह समावेशी क्यों है?',
      opts: [
        'अभिव्यक्ति के बहु-विकल्प (UDL सिद्धांत) दृश्य, भाषायी और गत्यात्मक शिक्षार्थियों को अपनी समझ समान रूप से दिखाने देते हैं',
        'इससे इतिहास पाठ पढ़ना जरूरी नहीं रहता',
        'शिक्षक तीन में से दो विकल्प जाँचते ही नहीं',
        'केवल चित्रकार छात्र ही पास होते हैं',
      ],
      exp: 'अभिव्यक्ति के विविध माध्यम (Universal Design for Learning) हर प्रकार के शिक्षार्थी को अपनी दक्षता प्रमाणित करने देते हैं।',
    },
  },
  {
    topic: 'RTE 2009 No Board Exams at Primary Level Section 30',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'What examination reform does Section 30(1) of the RTE Act, 2009 provide regarding external Board Examinations before completing elementary education?',
      opts: [
        'No child shall be required to pass any external Board examination till completion of elementary education (Classes 1–8)',
        'Mandatory state public board exam after Class 2',
        'Biannual university entrance interviews in Class 5',
        'Elimination of continuous classroom feedback',
      ],
      exp: 'Section 30(1) protects primary and upper-primary learners from high-stakes external Board pressure prior to completing Class 8.',
    },
    mr: {
      q: 'शिक्षण हक्क कायदा (RTE 2009) कलम ३०(१) अंतर्गत प्राथमिक शिक्षण पूर्ण होण्यापूर्वी बाह्य बोर्ड परीक्षांच्या बाबतीत कोणती तरतूद आहे?',
      opts: [
        'प्रारंभिक शिक्षण (इयत्ता १ ते ८) पूर्ण होईपर्यंत कोणत्याही बालकास कोणतीही बाह्य बोर्ड परीक्षा उत्तीर्ण होणे बंधनकारक नसेल',
        'इयत्ता दुसरीनंतर राज्यस्तरीय बोर्ड परीक्षा सक्तीची असेल',
        'पाचवीत विद्यापीठ प्रवेश मुलाखती घेतल्या जातील',
        'वर्गातील सातत्यपूर्ण अभिप्राय बंद केले जातील',
      ],
      exp: 'RTE कलम ३०(१) नुसार इयत्ता आठवीपर्यंत कोणत्याही बाह्य बोर्ड परीक्षेचे बंधन बालकांवर लादता येत नाही.',
    },
    hi: {
      q: 'RTE अधिनियम २००९ की धारा ३०(१) प्रारंभिक शिक्षा पूर्ण होने से पहले बाहरी बोर्ड परीक्षाओं के संबंध में क्या प्रावधान करती है?',
      opts: [
        'प्रारंभिक शिक्षा (कक्षा १–८) पूर्ण होने तक किसी भी बच्चे को कोई बाहरी बोर्ड परीक्षा उत्तीर्ण करना आवश्यक नहीं होगा',
        'कक्षा २ के बाद राज्य बोर्ड परीक्षा अनिवार्य होगी',
        'कक्षा ५ में विश्वविद्यालय प्रवेश साक्षात्कार होंगे',
        'कक्षा के सतत आकलन को समाप्त किया जाएगा',
      ],
      exp: 'धारा ३०(१) के तहत कक्षा १ से ८ तक की प्रारंभिक शिक्षा पूरी होने से पहले कोई बाहरी बोर्ड परीक्षा अनिवार्य नहीं की जा सकती।',
    },
  },
  {
    topic: 'Constructivist Schema Activation KWL Routine',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Before reading an informational text on birds’ nests, a Class 4 teacher draws a 3-column K-W-L chart ("What We Know", "What We Wonder", "What We Learned"). What purpose do the first two columns serve?',
      opts: [
        'Activating prior personal schemas and surfacing authentic student questions to guide purposeful reading',
        'Testing final unit grades before teaching starts',
        'Checking handwriting neatness solely',
        'Replacing the actual reading text permanently',
      ],
      exp: 'K-W-L connects existing background knowledge ("Know") and curiosity ("Wonder") directly to post-reading synthesis ("Learned").',
    },
    mr: {
      q: 'पक्ष्यांची घरटी हा माहितीपर पाठ शिकवण्यापूर्वी शिक्षक ३-स्तंभी K-W-L तक्ता ("आपल्याला काय माहित आहे", "काय जाणून घ्यायचे आहे", "काय शिकलो") फळ्यावर काढतात. पहिल्या दोन स्तंभांचा हेतू कोणता?',
      opts: [
        'मुलांचे पूर्वज्ञान जागृत करणे आणि स्वतःच्या कुतूहलपूर्ण प्रश्नांच्या आधारे हेतूपूर्ण वाचनास दिशा देणे',
        'शिकवण्यापूर्वीच अंतिम गुण देणे',
        'फक्त हस्ताक्षर तपासणे',
        'मूळ धडा पूर्णपणे रद्द करणे',
      ],
      exp: 'पूर्वज्ञान व स्वतःच्या शंका नोंदवल्यामुळे मुले अधिक जिज्ञासेने व सक्रिय हेतूने नवीन पाठ वाचतात.',
    },
    hi: {
      q: 'पक्षियों के घोंसले पाठ से पहले कक्षा ४ के शिक्षक ३-स्तंभ K-W-L चार्ट ("क्या जानते हैं", "क्या जानना चाहते हैं", "क्या सीखा") बनाते हैं। पहले दो स्तंभ क्या करते हैं?',
      opts: [
        'पूर्व ज्ञान को सक्रिय करते हैं और बच्चों के स्वाभाविक प्रश्नों से उद्देश्यपूर्ण पठन को दिशा देते हैं',
        'शिक्षण से पहले ही अंतिम ग्रेड देते हैं',
        'केवल लिखावट की सफाई जांचते हैं',
        'मूल पाठ को पूरी तरह हटा देते हैं',
      ],
      exp: 'K-W-L चार्ट विद्यार्थियों के पूर्व-अनुभव और जिज्ञासा को नए पाठ के सक्रिय अवबोध से जोड़ता है।',
    },
  },
  {
    topic: 'Vygotsky Play & Moral Rules Internalization',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'In primary playground team games like Kho-Kho or Langdi, why do disputes over "Who crossed the boundary line?" gradually train moral autonomy?',
      opts: [
        'Children actively debate fairness, negotiate mutually respected rules among equals, and recognize shared accountability',
        'Teachers shout louder over whistles',
        'Boundary chalk dissolves immediately',
        'Winners avoid shaking hands with opponents',
      ],
      exp: 'Peer negotiation in rule-governed games shifts moral reasoning from blind obedience toward reciprocal fairness (Piaget & Vygotsky).',
    },
    mr: {
      q: 'खो-खो किंवा लंगडीसारख्या शालेय मैदानी खेळांत "रेषा कोणी ओलांडली?" या चर्चेतून मुलांची नैतिक स्वायत्तता कशी घडते?',
      opts: [
        'समान पातळीवर मुले न्याय्यतेचा विचार करतात, सहमतीने नियम ठरवतात आणि परस्पर जबाबदारी स्वीकारायला शिकतात',
        'शिक्षक शिट्टीपेक्षा मोठ्याने ओरडतात',
        'खडूची रेषा लगेच पुसली जाते',
        'विजेते पराभूतांशी हस्तांदोलन टाळतात',
      ],
      exp: 'नियमांवर आधारित खेळांतील सहपाठी संवाद आंधळ्या आज्ञापालनापेक्षा न्याय व सहकार्याधारित स्वायत्त नैतिकता घडवतो.',
    },
    hi: {
      q: 'खो-खो या लंगड़ी जैसे मैदानी खेलों में "रेखा किसने पार की?" इस बातचीत से बच्चों में नैतिक स्वायत्तता कैसे विकसित होती है?',
      opts: [
        'बच्चे बराबरी के स्तर पर न्याय पर चर्चा करते हैं, आपसी नियमों पर सहमति बनाते हैं और साझा जिम्मेदारी सीखते हैं',
        'शिक्षक सीटी से तेज चिल्लाते हैं',
        'चॉक की रेखा मिट जाती है',
        'विजेता हाथ मिलाने से बचते हैं',
      ],
      exp: 'नियमाधारित खेलों में सहपाठी संवाद बच्चों को बाहरी भय के बजाय परस्पर न्याय और नियम-समझ की ओर ले जाता है।',
    },
  },
  {
    topic: 'Cognitive Curiosity Prediction Before Experiment',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Right before pouring vinegar onto baking soda in a Class 5 demonstration bottle, why should the teacher ask pupils to write a 1-line prediction first?',
      opts: [
        'Committing to a hypothesis invests personal curiosity and sharpens observation compared to passive watching',
        'It fills empty notebook corners neatly',
        'Prediction alters the chemical pH of vinegar',
        'It prevents students from smiling during bubbles',
      ],
      exp: 'Explicit prediction primes attention to discrepancies between expectation and actual empirical outcome.',
    },
    mr: {
      q: 'खाण्याच्या सोड्यावर लिंबू/व्हिनेगर टाकण्याचा प्रयोग दाखवण्यापूर्वी शिक्षकाने मुलांना एका ओळीत अंदाज लिहायला का सांगावे?',
      opts: [
        'स्वतःचा अंदाज नोंदवल्यास मुलांची वैयक्तिक जिज्ञासा जागी होते आणि निष्क्रिय पाहण्यापेक्षा त्यांचे निरीक्षण अधिक तीक्ष्ण होते',
        'वहीचा रिकामा कोपरा भरतो',
        'अंदाजामुळे रसायनाचा pH बदलतो',
        'बुडबुड्यांवर मुले हसू नयेत म्हणून',
      ],
      exp: 'प्रयोगापूर्वी स्वतःचा अंदाज मांडल्याने विद्यार्थी निष्क्रिय प्रेक्षक न राहता सक्रिय वैज्ञानिक निरीक्षक बनतात.',
    },
    hi: {
      q: 'कक्षा ५ में बेकिंग सोडा पर सिरका डालने के प्रयोग से ठीक पहले शिक्षक बच्चों से एक पंक्ति में अनुमान क्यों लिखवाते हैं?',
      opts: [
        'अपना अनुमान तय करने से व्यक्तिगत जिज्ञासा जगती है और निष्क्रिय देखने की अपेक्षा अवलोकन अधिक सूक्ष्म होता है',
        'कॉपी के खाली कोने भरते हैं',
        'अनुमान से सिरके का pH बदल जाता है',
        'बुलबुले देख बच्चों को मुस्कुराने से रोकता है',
      ],
      exp: 'प्रयोग से पहले अनुमान लगवाने से विद्यार्थियों का ध्यान अपेक्षा और वास्तविक परिणाम की तुलना पर केंद्रित होता है।',
    },
  },
  {
    topic: 'Inclusive CWSN IEP Individualized Education Plan',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'What is the core purpose of preparing an Individualized Education Plan (IEP) jointly with parents and special educators for a child with significant developmental needs?',
      opts: [
        'Setting realistic, strength-based measurable goals, tailored teaching accommodations, and periodic review benchmarks inside the inclusive school',
        'Removing the child completely from peer lunch breaks',
        'Cloning identical yearly targets for every disability type',
        'Replacing parent voice with standardized district rank tables',
      ],
      exp: 'An IEP customizes concrete goals, assistive adaptations, and supportive transitions collaboratively around the individual child.',
    },
    mr: {
      q: 'विशेष शैक्षणिक गरजा असलेल्या बालकासाठी पालक व विशेष शिक्षकांच्या सहभागातून "वैयक्तिकृत शैक्षणिक आराखडा" (IEP) तयार करण्याचा मुख्य उद्देश कोणता?',
      opts: [
        'विद्यार्थ्याच्या सामर्थ्यावर आधारित वास्तववादी मोजता येणारी उद्दिष्टे, योग्य अध्यापन सवलती व नियमित प्रगती आढावा निश्चित करणे',
        'मध्यान्ह भोजनाच्या वेळी सहपाठ्यांपासून वेगळे ठेवणे',
        'सर्वच दिव्यांग प्रकारांसाठी एकच यांत्रिक लक्ष्य ठेवणे',
        'पालकांचा आवाज वगळून जिल्हा क्रमवारी तक्ते लावणे',
      ],
      exp: 'IEP मुळे प्रत्येक विशेष बालकाच्या क्षमतेनुरूप वैयक्तिक उद्दिष्टे व समावेशक आधार प्रणाली ठरवता येते.',
    },
    hi: {
      q: 'विशेष विकासात्मक आवश्यकता वाले बच्चे के लिए अभिभावकों और विशेष शिक्षक के साथ "वैयक्तिकृत शिक्षा योजना" (IEP) बनाने का मुख्य उद्देश्य क्या है?',
      opts: [
        'बच्चे की क्षमताओं के अनुरूप व्यावहारिक मापनीय लक्ष्य, विशेष शिक्षण समायोजन और आवधिक समीक्षा मानदंड तय करना',
        'बच्चे को साथियों के भोजन अवकाश से अलग रखना',
        'हर दिव्यांगता के लिए एक जैसा लक्ष्य थोपना',
        'अभिभावक सहभागिता की जगह जिला रैंक तालिका रखना',
      ],
      exp: 'IEP प्रत्येक विशेष आवश्यकता वाले शिक्षार्थी के सामर्थ्य और आवश्यकताओं के अनुरूप लक्षित समावेशी योजना तैयार करता है।',
    },
  },
  {
    topic: 'Intrinsic Reading Fluency Choral & Paired Echo Strategy',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'A hesitant Class 2 reader freezes whenever asked to read a paragraph solo in front of 35 classmates. Which non-threatening strategy builds expressive fluency smoothly?',
      opts: [
        'Paired Echo / Shared Choral reading alongside a supportive partner or small group before inviting solo turns',
        'Forcing solo standing on the podium until every comma is flawless',
        'Grading reading pace publicly with a stopwatch every Friday',
        'Asking her to read silently inside a dark storeroom',
      ],
      exp: 'Low-stakes choral and paired reading reduces public performance anxiety while modeling natural prosody and pacing.',
    },
    mr: {
      q: 'इयत्ता दुसरीतील संकोचणारी विद्यार्थिनी ३५ जणांसमोर एकटी वाचताना दबकते. तिचा ओघ व आत्मविश्वास वाढवण्यासाठी कोणती भीतीमुक्त पद्धत सर्वोत्तम आहे?',
      opts: [
        'एकट्याने वाचायला लावण्यापूर्वी स्नेहपूर्ण जोडीदारासोबत "सह-वाचन / प्रतिध्वनी वाचन" (Paired / Choral Reading) घेणे',
        'प्रत्येक विरामचिन्ह बरोबर येईपर्यंत एकटीला मंचावर उभे ठेवणे',
        'दर शुक्रवारी स्टॉपवॉचने वेग मोजून जाहीर गुण सांगणे',
        'अंधाऱ्या खोलीत मूक वाचन करायला लावणे',
      ],
      exp: 'जोडीने किंवा लहान गटात एकत्रित वाचन घेतल्याने भीती कमी होते व नैसर्गिक आरोह-अवरोह आत्मसात होतो.',
    },
    hi: {
      q: 'कक्षा २ की संकोची छात्रा ३५ सहपाठियों के सामने अकेले अनुच्छेद पढ़ने में घबराती है। सहज धाराप्रवाहता बढ़ाने की भयमुक्त तकनीक क्या होगी?',
      opts: [
        'अकेले पढ़वाने से पहले सहयोगी साथी या छोटे समूह के साथ "प्रतिध्वनि / साझा पठन" (Echo / Paired Reading) कराना',
        'हर विराम चिह्न सही होने तक मंच पर अकेले खड़ा रखना',
        'हर शुक्रवार स्टॉपवॉच से पठन गति के अंक सार्वजनिक करना',
        'अंधेरे कमरे में मौन पठन कराना',
      ],
      exp: 'साझा एवं प्रतिध्वनि पठन प्रदर्शन के भय को घटाकर स्वाभाविक लय, उच्चारण और आत्मविश्वास विकसित करता है।',
    },
  },
  {
    topic: 'Memory Serial Position Primacy Effect',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Notice why students recall the opening hook and the closing 2-minute recap of a lesson better than dense facts buried silently at Minute 22. Which memory pattern explains this?',
      opts: [
        'The Serial Position Effect (Primacy and Recency advantages); teachers break mid-lesson monotony with an active mini-recap or activity',
        'Conditioned eyelid closure',
        'Cephalocaudal muscle readiness',
        'Fixed hereditary amnesia',
      ],
      exp: 'Primacy (beginning) and Recency (end) recall edges explain why short active 10-minute learning segments outperform long uninterrupted monologues.',
    },
    mr: {
      q: 'तासाच्या २२ व्या मिनिटाला सांगितलेल्या कोरड्या माहितीपेक्षा तासाच्या सुरुवातीची प्रस्तावना व शेवटची २ मिनिटांची उजळणी विद्यार्थ्यांना अधिक लक्षात राहते. यास कोणता मानसशास्त्रीय नियम म्हणतात?',
      opts: [
        'क्रमस्थान परिणाम (Serial Position Effect – प्रारंभिक व अंतिम भागाचे अधिक स्मरण); म्हणून मधे सक्रिय कृती टप्पे ठेवणे उपयुक्त ठरते',
        'अभिसंधित पापणी बंद क्रिया',
        'शिरःपाद स्नायू तयारी',
        'अनुवंशिक विस्मरण',
      ],
      exp: 'सुरुवात (Primacy) व शेवट (Recency) उत्तम स्मरणात राहतात; त्यामुळे मध्ये लहान कृती टप्पे ठेवल्यास अधिक प्रभावी स्मरण होते.',
    },
    hi: {
      q: 'कक्षा के २२वें मिनट पर बताए गए नीरस तथ्यों की तुलना में पाठ का प्रारंभिक प्रसंग और अंतिम २-मिनट का सार छात्रों को बेहतर याद रहता है। इसका कारण क्या है?',
      opts: [
        'क्रम-स्थिति प्रभाव (Serial Position Effect – प्रारंभ व अंत का श्रेष्ठ स्मरण); अतः बीच में सक्रिय गतिविधि खंड जोड़ना श्रेष्ठ है',
        'अनुबंधित पलक झपकाना',
        'शीर्षगामी पेशीय तैयारी',
        'आनुवंशिक विस्मृति',
      ],
      exp: 'प्राथमिकता और नवीनता प्रभाव के कारण छोटे-छोटे सक्रिय शिक्षण खंड लंबे एकतरफा व्याख्यान से कहीं अधिक स्मरणशील होते हैं।',
    },
  },
  {
    topic: 'NCF 2005 Continuous Assessment Without Labellings',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why does reporting primary students’ progress using descriptive indicators ("Reads aloud with expression; working on regrouping subtraction") outperform stamping "DULL" or "WEAK" on report cards?',
      opts: [
        'Descriptive feedback specifies actionable strengths and exact next steps without inflicting permanent stigma',
        'Descriptive lines save ink stamps financially',
        'Adjectives like weak have no meaning in English',
        'Descriptive notes abolish parent meetings',
      ],
      exp: 'Strength-based descriptive reporting preserves learner dignity while guiding specific targeted support at school and home.',
    },
    mr: {
      q: 'प्रगतीपत्रकावर "ढ" किंवा "कमकुवत" असा शिक्का मारण्यापेक्षा वर्णनात्मक नोंदी ("गोष्ट आवडीने वाचते; वजाबाकीतील हातचा घेण्याचा सराव चालू आहे") ठेवणे श्रेष्ठ का ठरते?',
      opts: [
        'वर्णनात्मक नोंदी विद्यार्थ्यावर कायमचा हीन शिक्का न लावता त्याचे सामर्थ्य व नेमकी पुढील सुधारणा स्पष्ट करतात',
        'यामुळे शिक्क्याची शाई वाचते',
        'कमकुवत या शब्दाला अर्थ नसतो',
        'वर्णनात्मक नोंदींमुळे पालक सभा बंद होतात',
      ],
      exp: 'लेबलिंग टाळून सकारात्मक वर्णनात्मक अभिप्राय दिल्यास विद्यार्थ्यास सुधारणेची स्पष्ट दिशा व आत्मविश्वास मिळतो.',
    },
    hi: {
      q: 'प्रगति-पत्र पर "कमजोर" या "सुस्त" लिखने के बजाय वर्णनात्मक टिप्पणी ("भावपूर्ण पठन करता है; हासिल के घटाव पर अभ्यास जारी") लिखना श्रेष्ठ क्यों है?',
      opts: [
        'वर्णनात्मक प्रतिपुष्टि बच्चे पर स्थायी हीन लेबल लगाए बिना उसकी शक्तियाँ और अगला सुधारात्मक कदम स्पष्ट करती है',
        'इससे स्याही की बचत होती है',
        'कमजोर शब्द का अर्थ नहीं होता',
        'इससे अभिभावक बैठकें समाप्त हो जाती हैं',
      ],
      exp: 'लेबलिंग से बचकर वर्णनात्मक एवं मार्गदर्शक प्रतिपुष्टि देना बच्चे की गरिमा और सुधार-संभावना दोनों की रक्षा करता है।',
    },
  },
  {
    topic: 'Inclusive Gifted Sensitivity Social Isolation Risk',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'An academically accelerated 8-year-old struggles to make friends because he lectures peers constantly and corrects everyone’s grammar mid-game. How should the teacher guide social development?',
      opts: [
        'Coach empathetic turn-taking, active listening, and collaborative roles alongside interest-based peer clubs rather than isolating him',
        'Tell peers to avoid sitting near him completely',
        'Let him skip playground breaks permanently to read alone',
        'Praise correcting peers harshly in every game',
      ],
      exp: 'Gifted learners also need gentle coaching in perspective-taking, conversational reciprocity, and inclusive friendship skills.',
    },
    mr: {
      q: 'अभ्यासात खूप पुढे असलेला ८ वर्षांचा मुलगा खेळातही मित्रांना सतत उपदेश देतो व व्याकरण चुका काढतो, त्यामुळे मित्र त्याच्यापासून दूर राहतात. शिक्षकाने कशी मदत करावी?',
      opts: [
        'त्याला एकटे न पाडता सहकाऱ्यांचे ऐकण्याची, आलटून-पालटून बोलण्याची संवेदनशील कला व समान आवडीच्या गटउपक्रमांत सहकार्य शिकवावे',
        'इतर मुलांना त्याच्या शेजारी न बसण्यास सांगावे',
        'मैदानी सुट्टी कायमची रद्द करून एकटे बसवावे',
        'मित्रांच्या चुका काढण्याबद्दल त्याचे कौतुक करावे',
      ],
      exp: 'बौद्धिक क्षमतेसोबतच भावनिक-सामाजिक संवाद व सहकार्याचे मार्गदर्शन केल्यास प्रज्ञावान मुले समवयस्कांत आनंदाने मिसळतात.',
    },
    hi: {
      q: 'पढ़ाई में अत्यंत आगे ८ वर्षीय छात्र खेल के बीच भी साथियों को उपदेश देता व व्याकरण टोकता है, जिससे दोस्त दूर हटते हैं। शिक्षक क्या मार्गदर्शन दें?',
      opts: [
        'उसे अलग-थलग करने के बजाय बारी-बारी सुनने, सहानुभूति रखने और समान रुचि क्लबों में सहयोगात्मक कौशल का अभ्यास कराएँ',
        'बाकी बच्चों को उसके पास बैठने से रोकें',
        'उसे अकेले पढ़ने के लिए खेल अवकाश से बाहर रखें',
        'हर खेल में दूसरों को टोकने की प्रशंसा करें',
      ],
      exp: 'संज्ञानात्मक तीव्रता के साथ-साथ संवेदनशील संवाद और पारस्परिक सुनने का प्रशिक्षण सामाजिक जुड़ाव को सुगम बनाता है।',
    },
  },
  {
    topic: 'RTE 2009 Free Elementary Special Training Focus',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Under the RTE Rules, what is the specific objective of "Special Training" arranged on school premises for late-admitted out-of-school children?',
      opts: [
        'Bridging foundational literacy, numeracy, and social comfort intensively so the child integrates smoothly with age peers in her regular class',
        'Segregating migrant learners permanently for all eight school years',
        'Teaching vocational factory welding in Class 3',
        'Eliminating regional mother tongues altogether',
      ],
      exp: 'Special Training functions as a time-bound bridge preparing age-admitted children to thrive alongside regular peers.',
    },
    mr: {
      q: 'RTE नियमांनुसार उशिरा शाळेत दाखल झालेल्या शाळाबाह्य बालकांसाठी शाळेत राबवल्या जाणाऱ्या "विशेष प्रशिक्षणाचे" (Special Training) नेमके उद्दिष्ट कोणते?',
      opts: [
        'पायाभूत भाषा, संख्याज्ञान व सामाजिक सहजतेचा पूल बांधून बालकाला तिच्या वयानुरूप नियमित वर्गात समरस करणे',
        'स्थलांतरित मुलांना आठ वर्षे कायमचे वेगळे ठेवणे',
        'तिसरीत कारखाना कामगार प्रशिक्षण देणे',
        'मातृभाषा पूर्णपणे काढून टाकणे',
      ],
      exp: 'विशेष प्रशिक्षण हा तात्पुरता पूरक सेतू असून त्याचा उद्देश विद्यार्थ्याला वयानुरूप नियमित वर्गाच्या प्रवाहात यशस्वीपणे आणणे हा असतो.',
    },
    hi: {
      q: 'RTE नियमों के तहत देर से प्रवेश पाए विद्यालय-बाह्य बच्चों के लिए "विशेष प्रशिक्षण" (Special Training) का सटीक उद्देश्य क्या है?',
      opts: [
        'बुनियादी साक्षरता, संख्याज्ञान व सामाजिक सहजता का सेतु बनाकर बच्चे को अपनी आयु के समवयस्कों की नियमित कक्षा में जोड़ना',
        'प्रवासी बच्चों को आठों वर्ष स्थायी रूप से अलग रखना',
        'कक्षा ३ में कारखाना वेल्डिंग सिखाना',
        'मातृभाषा पूरी तरह समाप्त करना',
      ],
      exp: 'विशेष प्रशिक्षण एक समय-बद्ध ब्रिज कार्यक्रम है ताकि बच्चा अपनी आयु-अनुकूल नियमित कक्षा के साथ सहजता से आगे बढ़ सके।',
    },
  },
  {
    topic: 'Piaget Animism vs Artificialism Contrast',
    pattern: 'Conceptual',
    difficulty: 'Difficult',
    en: {
      q: 'A four-year-old gazes at mountain peaks and asks, "Which giant builder piled up those stones to make that mountain?" In Piaget’s Preoperational stage, believing natural geographic features were built by humans is termed:',
      opts: [
        'Artificialism',
        'Conservation',
        'Hypothetico-deductive realism',
        'Stimulus discrimination',
      ],
      exp: 'Piaget defined Artificialism as the preoperational belief that natural phenomena (clouds, rivers, mountains) were crafted by people.',
    },
    mr: {
      q: 'चार वर्षांचे मूल डोंगर पाहून विचारते, "हा डोंगर कोणत्या मोठ्या कारागिराने दगड रचून बांधला?" पियाजेच्या पूर्व-क्रियात्मक अवस्थेत नैसर्गिक गोष्टी मानवाने बनवल्या मानण्याच्या प्रवृत्तीस काय म्हणतात?',
      opts: [
        'कृत्रिमतावाद (Artificialism)',
        'संधारण (Conservation)',
        'परिकल्पित निगमन वास्तववाद',
        'उद्दीपक भेदभाव',
      ],
      exp: 'नदी, डोंगर, ढग यांसारख्या नैसर्गिक गोष्टी कोणीतरी मानवाने घडवल्या आहेत असा बालपणीचा समज म्हणजे कृत्रिमतावाद (Artificialism).',
    },
    hi: {
      q: 'चार वर्षीय बच्चा पहाड़ देखकर पूछता है, "इतने बड़े पत्थर किस मिस्त्री ने सजाकर पहाड़ बनाया?" पियाजे की पूर्व-संक्रियात्मक अवस्था में प्राकृतिक चीजों को मानव-निर्मित मानने की प्रवृत्ति क्या कहलाती है?',
      opts: [
        'कृत्रिमतावाद (Artificialism)',
        'संरक्षण (Conservation)',
        'परिकल्पनात्मक निगमन यथार्थवाद',
        'उद्दीपक विभेदन',
      ],
      exp: 'पर्वत, नदी या बादल जैसी प्राकृतिक रचनाओं को किसी व्यक्ति द्वारा निर्मित मानना पूर्व-संक्रियात्मक अवस्था का कृत्रिमतावाद है।',
    },
  },
  {
    topic: 'Constructivist Open Lab vs Cookbook Steps',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'In primary science inquiry, why does asking Class 5 pairs "How could we test which soil holds rainwater longest?" build richer scientific thinking than handing out a fixed recipe telling every answer beforehand?',
      opts: [
        'Students learn to frame fair tests (equal soil mass, equal water poured, timed drainage) and interpret evidence actively',
        'Fixed recipes waste classroom chalkboard chalk',
        'Water passes faster through unlabelled cups',
        'Students avoid measuring liquid volumes altogether',
      ],
      exp: 'Designing fair-test variables fosters authentic scientific reasoning rather than mechanical obedience to pre-known answers.',
    },
    mr: {
      q: 'प्राथमिक विज्ञान शोधकार्यात सर्व उत्तरे आधीच छापील कृतीत देण्यापेक्षा "कोणती माती जास्त पाणी धरून ठेवते ते आपण कसे तपासू शकतो?" हा प्रश्न मुलांना विचारणे श्रेष्ठ का ठरते?',
      opts: [
        'विद्यार्थी समान माती, समान पाणी व समान वेळ अशी "न्याय्य चाचणी" (Fair Test) स्वतः रचून पुराव्यांचा अर्थ लावायला शिकतात',
        'छापील कृतीमुळे खडू वाया जातो',
        'नाव नसलेल्या कपातून पाणी वेगाने जाते',
        'मुले मोजमाप टाळतात',
      ],
      exp: 'निष्पक्ष चाचणीची (Fair Test) स्वतः आखणी केल्यास मुलांत प्रयोगशीलता व वैज्ञानिक तर्कशक्ती खऱ्या अर्थाने विकसित होते.',
    },
    hi: {
      q: 'कक्षा ५ के विज्ञान में पहले से तय उत्तर वाली विधि देने के बजाय "हम कैसे जाँचें कि कौन-सी मिट्टी अधिक पानी रोकती है?" पूछना अधिक वैज्ञानिक सोच क्यों बनाता है?',
      opts: [
        'विद्यार्थी समान मिट्टी, समान जल और समान समय जैसा "निष्पक्ष परीक्षण" (Fair Test) स्वयं डिजाइन कर साक्ष्य पढ़ना सीखते हैं',
        'तय विधि से चॉक बर्बाद होती है',
        'बिना लेबल कप से पानी तेज बहता है',
        'बच्चे मापना छोड़ देते हैं',
      ],
      exp: 'नियंत्रित एवं निष्पक्ष परीक्षण (Fair Test) की स्वयं योजना बनाना वास्तविक वैज्ञानिक अन्वेषण कौशल विकसित करता है।',
    },
  },
  {
    topic: 'Parent Literacy Barrier Voice Message Innovation',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Knowing several parents in a rural primary cluster work long farm hours and cannot read printed circulars easily, how can teachers maintain warm, inclusive home communication?',
      opts: [
        'Use brief respectful oral phone calls, voice messages in the local language, visual pictorial calendar notes, and flexible evening PTM slots',
        'Send legalistic printed English warning letters only',
        'Assume busy farm families do not care about learning',
        'Suspend pupils whose circulars return unsigned',
      ],
      exp: 'Accessible, multilingual, and dignified communication modes welcome every family equally as educational partners.',
    },
    mr: {
      q: 'ग्रामीण भागातील अनेक पालक दिवसभर शेतात काम करतात व त्यांना छापील परिपत्रके वाचणे कठीण जाते. शिक्षकांनी स्नेहपूर्ण संवाद कसा राखावा?',
      opts: [
        'स्थानिक भाषेत संक्षिप्त ध्वनी संदेश (Voice Note), सोपे चित्रमय सूचनापत्रक आणि सायंकाळच्या लवचिक पालक भेटींचे आयोजन करणे',
        'केवळ इंग्रजीतील कडक छापील इशारापत्रे पाठवणे',
        'शेतकरी पालकांना शिक्षणात रस नाही असे मानणे',
        'सही नसलेल्या मुलांना शाळेतून निलंबित करणे',
      ],
      exp: 'पालकांच्या कामाच्या वेळा व भाषिक सोयीचा आदर करणारा संवाद शाळा-समाज नाते अधिक बळकट करतो.',
    },
    hi: {
      q: 'ग्रामीण क्षेत्र के कई अभिभावक दिनभर खेतों में काम करते हैं और छपे परिपत्र आसानी से नहीं पढ़ पाते। समावेशी संवाद हेतु शिक्षक क्या करें?',
      opts: [
        'स्थानीय भाषा में संक्षिप्त वॉयस संदेश, चित्रमय सूचना पर्चियाँ और शाम के लचीले अभिभावक संपर्क समय अपनाना',
        'केवल अंग्रेज़ी में कठोर कानूनी चेतावनी पत्र भेजना',
        'मान लेना कि व्यस्त परिवार शिक्षा की परवाह नहीं करते',
        'हस्ताक्षर न होने पर बच्चों को निलंबित करना',
      ],
      exp: 'स्थानीय भाषा में सरल, चित्रात्मक एवं लचीला संपर्क हर परिवार को सम्मानजनक भागीदार बनाता है।',
    },
  },
  {
    topic: 'Metacognitive Self-Questioning Before Submitting',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Training Class 5 math learners to ask themselves "Does my answer make real-world sense?" (e.g., noticing that 18 apples shared among 3 friends cannot equal 54 apples!) builds:',
      opts: [
        'Estimation sense and metacognitive error monitoring',
        'Passive dependence on red teacher ticks',
        'Confusion between division and subtraction',
        'Rote memorizing of answer keys',
      ],
      exp: 'Sanity-checking magnitude against real-world context catches gross computational slips instantly and builds mathematical confidence.',
    },
    mr: {
      q: 'इयत्ता पाचवीच्या विद्यार्थ्यांना उत्तर लिहिल्यानंतर स्वतःला विचारण्याची सवय लावणे—उदा. "१८ आंबे ३ मित्रांत वाटल्यास प्रत्येकाला ५४ आंबे कसे मिळतील?"—यातून काय विकसित होते?',
      opts: [
        'अंदाज बांधण्याची क्षमता आणि अधिबोधनात्मक चूक-पडताळणी (Metacognitive Error Monitoring)',
        'शिक्षकांच्या लाल पेनावर निष्क्रिय अवलंबित्व',
        'भागाकार व वजाबाकीतील गोंधळ',
        'उत्तरसूची पाठांतर',
      ],
      exp: 'उत्तर व्यावहारिक संदर्भात सुसंगत आहे का हे स्वतः तपासण्याची सवय गंभीर चुका तात्काळ टाळते.',
    },
    hi: {
      q: 'कक्षा ५ के छात्रों को हल करने के बाद स्वयं से पूछना सिखाना—"क्या १८ आम ३ दोस्तों में बाँटने पर ५४ उत्तर व्यावहारिक है?"—क्या विकसित करता है?',
      opts: [
        'अनुमान बोध और परासंज्ञानात्मक त्रुटि-निरीक्षण (Metacognitive Monitoring)',
        'शिक्षक की लाल स्याही पर निष्क्रिय निर्भरता',
        'भाग और घटाव का भ्रम',
        'उत्तरमाला का रटंत अभ्यास',
      ],
      exp: 'उत्तर को वास्तविक संदर्भ से जाँचने की आदत बड़ी गणना-त्रुटियों को स्वयं पकड़ने की दक्षता देती है।',
    },
  },
  {
    topic: 'Gardner Existential & Ethical Curiosity Seeds',
    pattern: 'Conceptual',
    difficulty: 'Difficult',
    en: {
      q: 'When an upper-primary Class 5 child asks thoughtful big questions during a tree-planting drive—"Why do tiny seeds hold whole future forests inside them?"—how should a balanced teacher respond?',
      opts: [
        'Honour the philosophical wonder warmly alongside observing cotyledons and embryo germination empirically',
        'Mock big "why" questions as childish daydreaming',
        'Tell the child philosophy starts only after age 25',
        'Interrupt immediately with a spelling test',
      ],
      exp: 'Balancing poetic/existential wonder with empirical biological inquiry keeps deep human curiosity alive in science.',
    },
    mr: {
      q: 'वृक्षारोपण उपक्रमात पाचवीचा विद्यार्थी गंभीर कुतूहलाने विचारतो, "एवढ्याशा बीजामध्ये भविष्यातील संपूर्ण जंगल कसे दडलेले असते?" शिक्षकांचा संतुलित प्रतिसाद कोणता?',
      opts: [
        'त्याच्या तात्त्विक कुतूहलाचा स्नेहपूर्ण सन्मान करून सोबतच द्विदल व भ्रूण अंकुरणाचे प्रत्यक्ष निरीक्षण जोडणे',
        'अशा मोठ्या प्रश्नांना बालिश दिवास्वप्न म्हणून हिणवणे',
        'तत्त्वज्ञान २५ वर्षांनंतर सुरू होते असे सांगणे',
        'लगेच शुद्धलेखन चाचणी घेऊन विषय बंद करणे',
      ],
      exp: 'तात्त्विक विस्मय व वैज्ञानिक निरीक्षण यांचा संगम बालकाची उच्चतर जिज्ञासा अखंड जिवंत ठेवतो.',
    },
    hi: {
      q: 'पौधरोपण के समय कक्षा ५ का बच्चा गहरी जिज्ञासा से पूछता है, "इतने छोटे बीज में भविष्य का पूरा जंगल कैसे छिपा होता है?" शिक्षक कैसे प्रतिक्रिया दें?',
      opts: [
        'उसकी दार्शनिक जिज्ञासा का आदर करते हुए साथ में बीजपत्र और अंकुरण का प्रत्यक्ष वैज्ञानिक अवलोकन जोड़ना',
        'ऐसे बड़े प्रश्नों को बचकाना दिवास्वप्न कहकर टालना',
        'दर्शनशास्त्र २५ वर्ष बाद पढ़ना ऐसा कहना',
        'तुरंत श्रुतलेख परीक्षा शुरू कर देना',
      ],
      exp: 'विस्मय-भाव और वैज्ञानिक प्रयोग का समन्वय बच्चों में आजीवन खोज व संवेदनशील चिंतन को पोषित करता है।',
    },
  },
  {
    topic: 'NEP 2020 Bagless Days Experiential Exposure',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why does NEP 2020 encourage designated "Bagless Days" featuring local craftsmen visits, nature trails, gardening, and vocational play experiences across schools?',
      opts: [
        'To nurture hands-on life skills, dignity of manual crafts, local ecology connection, and joyful experiential learning beyond textbooks',
        'To shut down school libraries indefinitely',
        'To force heavy industrial overtime on primary children',
        'To delete mathematics and language permanently',
      ],
      exp: 'Bagless Days connect classroom concepts joyfully with community crafts, gardening, arts, and practical skill respect.',
    },
    mr: {
      q: 'NEP 2020 मध्ये स्थानिक कारागीर भेटी, निसर्गभ्रमंती, बागकाम व कौशल्य अनुभवांसाठी "दप्तराविना दिवस" (Bagless Days) का प्रोत्साहित केले आहेत?',
      opts: [
        'पाठ्यपुस्तकांपलीकडील प्रत्यक्ष जीवनकौशल्ये, श्रमप्रतिष्ठा, स्थानिक परिसंस्था आणि आनंददायी अनुभवात्मक शिक्षण घडवण्यासाठी',
        'शाळेची ग्रंथालये कायमची बंद करण्यासाठी',
        'मुलांकडून औद्योगिक मजुरी करून घेण्यासाठी',
        'गणित व भाषा कायमचे काढून टाकण्यासाठी',
      ],
      exp: 'दप्तराविना दिवसांमुळे मुलांना कृतिशील अनुभव, व्यावसायिक कौशल्ये आणि स्थानिक संस्कृतीशी जिवंत नाते जोडता येते.',
    },
    hi: {
      q: 'NEP 2020 विद्यालयों में स्थानीय कारीगरों से भेंट, प्रकृति भ्रमण, बागवानी व हस्त-कौशल हेतु "बस्ता-रहित दिवस" (Bagless Days) को क्यों प्रोत्साहित करती है?',
      opts: [
        'किताबों से परे व्यावहारिक जीवन कौशल, श्रम की गरिमा, स्थानीय परिवेश से जुड़ाव और आनंदपूर्ण अनुभवात्मक सीख विकसित करने हेतु',
        'पुस्तकालयों को अनिश्चितकाल के लिए बंद करने हेतु',
        'बच्चों से औद्योगिक श्रम कराने हेतु',
        'गणित और भाषा हटाने हेतु',
      ],
      exp: 'बस्ता-रहित दिवस कला, शिल्प, बागवानी और सामुदायिक कौशल के माध्यम से समग्र अनुभवात्मक शिक्षा को बढ़ावा देते हैं।',
    },
  },
  {
    topic: 'Inclusive Gender Stereotype Storybook Audit',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Opening an old reading-corner storybook, a teacher notices mothers pictured exclusively inside kitchens and fathers exclusively reading newspapers. Without banning the book, how can she build critical equity?',
      opts: [
        'Invite pupils to discuss "What happens in your families too?" and collaboratively author new illustrated pages showing diverse shared caregiving and work',
        'Insist household chores are biologically reserved for mothers',
        'Make girls copy the kitchen pages repeatedly',
        'Keep silent so students absorb stereotypes passively',
      ],
      exp: 'Using existing texts as springboards for critical reflection and student-authored counter-stories builds active media awareness.',
    },
    mr: {
      q: 'जुन्या गोष्टीच्या पुस्तकात आई फक्त स्वयंपाकघरात व बाबा फक्त वर्तमानपत्र वाचताना दिसतात. पुस्तक न जाळता समतावादी विचार कसा रुजवावा?',
      opts: [
        '"तुमच्या घरात कोण कोणती कामे मिळून करते?" अशी चर्चा घेऊन मुलांकडूनच सहकार्य व विविध भूमिका दाखवणारी नवीन चित्रे-पाने तयार करून घेणे',
        'घरकामे केवळ आईचीच आहेत असे सांगणे',
        'मुलींकडून स्वयंपाकघराची पाने उतरवून घेणे',
        'मुलांवर रूढींचा प्रभाव पडूनही गप्प बसणे',
      ],
      exp: 'चर्चेद्वारे पारंपरिक चित्रांवर चिकित्सक विचार करणे व स्वतः समतावादी नवी पाने तयार करणे मुले अधिक जागरूक बनवते.',
    },
    hi: {
      q: 'पुरानी कहानी पुस्तक में माँ केवल रसोई में और पिता केवल अखबार पढ़ते दिखते हैं। पुस्तक हटाए बिना शिक्षक समतामूलक सोच कैसे जगाएँ?',
      opts: [
        'बच्चों से "तुम्हारे घर में काम कैसे बँटते हैं?" पर संवाद कर साझा देखभाल व विविध कार्य दिखाते नए चित्र-पृष्ठ स्वयं बनवाना',
        'कहना कि घर के काम केवल माँ के लिए हैं',
        'लड़कियों से रसोई पृष्ठ की नकल करवाना',
        'चुप रहकर रूढ़ियाँ स्वीकार होने देना',
      ],
      exp: 'मौजूदा पुस्तकों पर आलोचनात्मक चर्चा और बच्चों द्वारा समतावादी पूरक कहानियाँ रचवाना जागरूक चिंतन विकसित करता है।',
    },
  },
  {
    topic: 'Holistic Stress-Free Oral Read-Aloud Comprehension',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Why does pausing mid-story during a teacher read-aloud to ask Class 1 learners "Wait—what do you think the little squirrel might try next?" boost comprehension markedly?',
      opts: [
        'Active prediction connects character motives, cause-effect reasoning, and vocabulary anticipation while listening',
        'Pausing makes the story last until tomorrow intentionally',
        'Interruptions erase sentence endings',
        'Children dislike imagining story endings',
      ],
      exp: 'Dialogic read-alouds (predicting, connecting, questioning) deepen narrative comprehension far more than uninterrupted rapid reading.',
    },
    mr: {
      q: 'इयत्ता पहिलीला गोष्ट सांगताना मधेच थांबून "थांबा—आता ती खारूताई पुढे काय युक्ती करेल असे तुम्हाला वाटते?" असे विचारल्याने आकलन लक्षणीयरीत्या का वाढते?',
      opts: [
        'अंदाज बांधल्यामुळे पात्रांचा हेतू, कार्यकारणभाव आणि नवीन शब्द ऐकण्याची उत्सुकता व आकलन सक्रिय राहते',
        'उद्यापर्यंत गोष्ट लांबवण्यासाठी',
        'थांबण्याने वाक्यांचा शेवट पुसला जातो',
        'मुलांना कल्पना करायला आवडत नाही',
      ],
      exp: 'संवादात्मक गोष्ट वाचनामुळे (Dialogic Read-aloud) मुले केवळ श्रोते न राहता कथेशी विचारपूर्वक जोडली जातात.',
    },
    hi: {
      q: 'कक्षा १ को कहानी सुनाते समय बीच में रुककर "बताओ—अब छोटी गिलहरी आगे क्या उपाय सोचेगी?" पूछने से समझ काफी क्यों बढ़ती है?',
      opts: [
        'सक्रिय अनुमान लगाने से पात्रों के उद्देश्य, कार्य-कारण संबंध और कहानी की समझ गहरी होती है',
        'ताकि कहानी कल तक खींची जा सके',
        'रुकने से वाक्यों का अंत मिट जाता है',
        'बच्चों को कल्पना करना नापसंद है',
      ],
      exp: 'संवादात्मक कहानी पठन (Dialogic Read-Aloud) बच्चों को निष्क्रिय श्रोता के बजाय सक्रिय अर्थ-निर्माता बनाता है।',
    },
  },
  {
    topic: 'RTE 2009 Curriculum Academic Authority Bodies',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Under the RTE Act 2009 and NEP architecture in Maharashtra, which apex state academic institution designs state-level elementary curriculum frameworks, Balbharati alignment, and teacher training guidelines?',
      opts: [
        'SCERT Maharashtra (State Council of Educational Research and Training, Pune)',
        'State Public Works Highway Board',
        'Municipal Water Supply Corporation',
        'District Agricultural Seed Registry',
      ],
      exp: 'SCERT Maharashtra (formerly MSCERT, Pune) serves as the notified state academic authority guiding curriculum and teacher capacity.',
    },
    mr: {
      q: 'RTE कायदा २००९ आणि महाराष्ट्रातील शैक्षणिक रचनेनुसार राज्यस्तरीय प्राथमिक अभ्यासक्रम, शिक्षक प्रशिक्षण व बालभारती समन्वयासाठी कोणती शिखर शैक्षणिक संस्था कार्य करते?',
      opts: [
        'SCERT महाराष्ट्र (राज्य शैक्षणिक संशोधन व प्रशिक्षण परिषद, पुणे)',
        'राज्य सार्वजनिक बांधकाम महामार्ग मंडळ',
        'महानगरपालिका पाणीपुरवठा निगम',
        'जिल्हा बियाणे नोंदणी कार्यालय',
      ],
      exp: 'पुणे येथील SCERT महाराष्ट्र ही राज्यातील शालेय अभ्यासक्रम व शिक्षक प्रशिक्षणाची शिखर शैक्षणिक प्राधिकरण संस्था आहे.',
    },
    hi: {
      q: 'RTE २००९ और महाराष्ट्र की शैक्षिक संरचना के अंतर्गत राज्य-स्तरीय प्रारंभिक पाठ्यचर्या, बालभारती समन्वय और शिक्षक प्रशिक्षण का मार्गदर्शन कौन-सी शीर्ष संस्था करती है?',
      opts: [
        'SCERT महाराष्ट्र (राज्य शैक्षिक अनुसंधान एवं प्रशिक्षण परिषद, पुणे)',
        'राज्य लोक निर्माण राजमार्ग बोर्ड',
        'नगरपालिका जल आपूर्ति निगम',
        'जिला कृषि बीज पंजीयन कार्यालय',
      ],
      exp: 'SCERT महाराष्ट्र (पुणे) राज्य में विद्यालयी पाठ्यचर्या और शिक्षक व्यावसायिक विकास का प्रमुख शैक्षिक प्राधिकारी है।',
    },
  },
  {
    topic: 'Self-Regulation Delayed Gratification Marshmallow Insight',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Walter Mischel’s classic self-control studies revealed that young children succeed better at waiting patiently when they use cognitive distraction strategies ("imagining the sweet is a fluffy picture") rather than staring hungrily. What classroom skill does this illustrate?',
      opts: [
        'Metacognitive attentional redirection / self-regulation strategies',
        'Operant extinction',
        'Blind Pavlovian salivation',
        'Retroactive vocabulary interference',
      ],
      exp: 'Self-regulation improves dramatically when learners are explicitly taught practical attentional cooling strategies rather than lectured to "try harder".',
    },
    mr: {
      q: 'वॉल्टर मिशेल यांच्या आत्म-नियंत्रण अभ्यासानुसार खाऊकडे एकटक पाहण्याऐवजी "ते चित्र आहे" अशी कल्पना करणाऱ्या लहान मुलांनी अधिक संयम राखला. यातून कोणते वर्ग कौशल्य दिसते?',
      opts: [
        'विचार-दिशा बदलण्याचे व स्व-नियमनाचे अधिबोधनात्मक कौशल्य (Self-regulation Strategies)',
        'अभिजात विलोपन',
        'पाव्हलॉव्ह लाळ प्रतिक्षेप',
        'पश्चलक्षी शब्द अडथळा',
      ],
      exp: 'केवळ "शांत बसा" सांगण्यापेक्षा लक्ष वळवण्याच्या व श्वासोच्छ्वासाच्या प्रत्यक्ष युक्त्या शिकवल्यास मुलांचे आत्म-नियंत्रण वाढते.',
    },
    hi: {
      q: 'वॉल्टर मिशेल के आत्म-नियंत्रण प्रयोग में मिठाई को भूखी नजर से घूरने के बजाय "उसे बादल का चित्र मानकर" ध्यान मोड़ने वाले बच्चे अधिक धैर्य रख पाए। यह किस कौशल को दर्शाता है?',
      opts: [
        'ध्यान पुनः-निर्देशन एवं आत्म-नियमन की परासंज्ञानात्मक युक्तियाँ',
        'सक्रिय विलोपन',
        'पावलॉव लार प्रतिवर्त',
        'पश्चलक्षी शब्दावली अवरोध',
      ],
      exp: 'बच्चों को केवल "धैर्य रखो" कहने के बजाय ध्यान मोड़ने व शांत रहने की ठोस मानसिक युक्तियाँ सिखाना आत्म-नियमन को सुगम बनाता है।',
    },
  },
];
