import { CuratedTrilingualMcq } from './types';

// Batch 3 CDP Part 2 (32 original trilingual items; 0 overlap with B1/B2)
export const MAHA_TET_P1_B3_CDP_PART2: CuratedTrilingualMcq[] = [
  {
    topic: 'Pygmalion Effect (Expectation Prophecy)',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'In Rosenthal & Jacobson’s classic study, pupils randomly labelled "bloomers" progressed faster because teachers offered warmer wait-time and deeper prompts. This is the:',
      opts: [
        'Pygmalion Effect (Self-Fulfilling Prophecy)',
        'Split-Attention Overload',
        'Halo Scoring Bias',
        'Norm-Referenced Ceiling',
      ],
      exp: 'High teacher expectations translate into richer instructional support and real student growth.',
    },
    mr: {
      q: 'ज्या विद्यार्थ्यांबद्दल शिक्षकांना "ते पुढे उत्तम प्रगती करतील" असे वाटले, त्यांना अधिक धीर व संधी दिल्यामुळे त्यांची खरोखर प्रगती झाली. याला काय म्हणतात?',
      opts: [
        'पिग्मॅलियन परिणाम (Pygmalion Effect – सकारात्मक अपेक्षांचा परिणाम)',
        'लक्ष विभाजन ताण',
        'प्रभावळ दोष',
        'मानक चाचणी मर्यादा',
      ],
      exp: 'शिक्षकांचा सकारात्मक विश्वास प्रत्यक्ष गुणवत्तेत वाढ घडवून आणतो.',
    },
    hi: {
      q: 'जिन छात्रों के बारे में शिक्षकों को विश्वास था कि वे तेजी से सीखेंगे, उन्हें अधिक धैर्य व अवसर मिलने से वे सचमुच आगे बढ़े। इसे क्या कहते हैं?',
      opts: [
        'पिग्मेलियन प्रभाव (Pygmalion Effect — शिक्षक अपेक्षा की स्वतःसिद्ध भविष्यवाणी)',
        'ध्यान विभाजन भार',
        'प्रभामंडल त्रुटि',
        'मानक सीमा',
      ],
      exp: 'शिक्षक की सकारात्मक अपेक्षाएँ बेहतर मार्गदर्शन में बदलकर वास्तविक उपलब्धि बढ़ाती हैं।',
    },
  },
  {
    topic: 'Halo Effect in Grading Bias',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A teacher unknowingly awards extra marks to an average essay because the pupil always wears an immaculate uniform and speaks politely. This grading bias is the:',
      opts: [
        'Halo Effect (one positive trait biasing unrelated judgments)',
        'Criterion-Referenced Mastery',
        'Inter-Rater Reliability',
        'Standard Error of Measurement',
      ],
      exp: 'Blind script coding and clear rubrics curb Halo and Horn rating biases.',
    },
    mr: {
      q: 'विद्यार्थ्याचा पोशाख स्वच्छ व वर्तन नम्र असल्यामुळे शिक्षिकेने त्याच्या सामान्य निबंधालाही नकळत जास्त गुण दिले. हा मूल्यमापनातील कोणता दोष आहे?',
      opts: [
        'प्रभावळ परिणाम (Halo Effect – एका गुणाचा इतर मूल्यमापनावर अयोग्य प्रभाव)',
        'निकष-संदर्भित प्रावीण्य',
        'परीक्षक विश्वसनीयता',
        'वस्तुनिष्ठ रूब्रिक मापन',
      ],
      exp: 'बाह्य गुणांचा अनावश्यक प्रभाव टाळण्यासाठी स्पष्ट निकष-रूब्रिक्स वापरतात.',
    },
    hi: {
      q: 'साफ वेशभूषा और विनम्र व्यवहार से प्रभावित होकर शिक्षक अनजाने में सामान्य निबंध में भी अधिक अंक दे देते हैं। यह त्रुटि क्या कहलाती है?',
      opts: [
        'प्रभामंडल प्रभाव (Halo Effect)',
        'निकष-संदर्भित दक्षता',
        'अंतर-परीक्षक विश्वसनीयता',
        'वस्तुनिष्ठ रूब्रिक जांच',
      ],
      exp: 'किसी एक सकारात्मक विशेषता का अन्य असंबद्ध कौशलों के अंकन पर अनुचित प्रभाव Halo Effect है।',
    },
  },
  {
    topic: 'Norm-Referenced vs Criterion-Referenced Assessment',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Verifying whether a Class 3 child "Subtracts 2-digit numbers with regrouping accurately (8/10)" regardless of peers’ scores illustrates:',
      opts: [
        'Criterion-Referenced Assessment (measuring against specific competencies)',
        'Norm-Referenced Percentile Ranking',
        'Competitive Elimination Quota',
        'Bell-Curve Grading',
      ],
      exp: 'Criterion-referenced evaluation measures mastery against explicit standards rather than peer standing.',
    },
    mr: {
      q: 'इतरांच्या गुणांशी तुलना न करता विद्यार्थी "दशक घेऊन वजाबाकी अचूक करतो का (८/१०)" हे तपासणे कोणत्या मूल्यमापनाचे उदाहरण आहे?',
      opts: [
        'निकष-संदर्भित मूल्यमापन (Criterion-Referenced Assessment)',
        'मानक-संदर्भित क्रमवारी (Norm-Referenced)',
        'बेल-वक्र स्पर्धा कोटा',
        'चाचणी क्रमवारी',
      ],
      exp: 'अपेक्षित अध्ययन निष्पत्ती साध्य झाली का हे पाहणे म्हणजे निकष-संदर्भित मूल्यमापन.',
    },
    hi: {
      q: 'अन्य सहपाठियों से तुलना किए बिना यह जांचना कि छात्र "हासिल लेकर दो-अंकीय घटाव सही कर पाता है (८/१०)" क्या कहलाता है?',
      opts: [
        'निकष-संदर्भित मूल्यांकन (Criterion-Referenced Assessment)',
        'मानक-संदर्भित रैंकिंग (Norm-Referenced)',
        'बेल-वक्र कोटा परीक्षण',
        'प्रतियोगी छंटनी परीक्षा',
      ],
      exp: 'पूर्व-निर्धारित दक्षता के सापेक्ष मूल्यांकन करना निकष-संदर्भित मूल्यांकन है।',
    },
  },
  {
    topic: 'Reliability vs Validity in Testing',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'A math quiz yields identical scores on every retest, yet 80% of its problems test tricky archaic English phrasing instead of arithmetic. This quiz shows:',
      opts: [
        'High Reliability (consistency) but Low Validity (not measuring arithmetic)',
        'High Construct Validity and Low Reliability',
        '100% Predictive Validity without consistency',
        'Face Validity without reliability',
      ],
      exp: 'Consistency without measuring the target construct equals reliability without validity.',
    },
    mr: {
      q: 'गणिताची चाचणी वारंवार घेतल्यास सारखेच गुण देते, पण तिच्यातील ८०% प्रश्न गणितापेक्षा क्लिष्ट इंग्रजी भाषेवर अवलंबून आहेत. या चाचणीत काय दिसते?',
      opts: [
        'उच्च विश्वसनीयता (Reliability) पण कमी सप्रमाणता / वैधता (Validity)',
        'उच्च वैधता व कमी विश्वसनीयता',
        'शून्य विश्वसनीयता व पूर्ण वैधता',
        'केवळ आदर्श रचना',
      ],
      exp: 'ज्या कौशल्याचे मापन अपेक्षित आहे तेच मोजले जात नसेल तर चाचणी वैध ठरत नाही.',
    },
    hi: {
      q: 'गणित परीक्षा बार-बार लेने पर समान अंक देती है, पर ८०% प्रश्न कठिन भाषा पर आधारित हैं। इसमें क्या स्थिति है?',
      opts: [
        'उच्च विश्वसनीयता (संगति) किंतु निम्न वैधता (Validity)',
        'उच्च वैधता एवं निम्न विश्वसनीयता',
        'शून्य विश्वसनीयता व उच्च वैधता',
        'पूर्ण प्रासंगिकता',
      ],
      exp: 'विश्वसनीयता अंकों की स्थिरता है, जबकि वैधता बताती है कि परीक्षा सचमुच अपेक्षित विषय मापती है या नहीं।',
    },
  },
  {
    topic: 'UDL – Multiple Means of Representation',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Moderate',
    en: {
      q: 'Presenting a botany lesson via real leaves, captioned video, and labelled diagrams alongside print exemplifies Universal Design for Learning (UDL) principle:',
      opts: [
        'Multiple Means of Representation',
        'Rigid Ability Streaming',
        'Segregated Special Curricula',
        'Single-Channel Copying',
      ],
      exp: 'UDL embeds varied perceptual pathways ("what" of learning) proactively for all learners.',
    },
    mr: {
      q: 'सार्वत्रिक अध्ययन रचना (UDL) नुसार वनस्पतीचा घटक प्रत्यक्ष पाने, सबटायटल्ससह चित्रफीत व आकृत्यांतून सादर करणे कशाचे उदाहरण आहे?',
      opts: [
        'सादरीकरणाचे बहुविध मार्ग (Multiple Means of Representation)',
        'क्षमताधारित वेगळे वर्ग',
        'स्वतंत्र विशेष अभ्यासक्रम',
        'एकमागी पाठांतर',
      ],
      exp: 'विविध इंद्रिय व अध्ययन शैलींच्या विद्यार्थ्यांसाठी अनेक मार्ग UDL मध्ये दिले जातात.',
    },
    hi: {
      q: 'UDL के अंतर्गत विज्ञान पाठ को वास्तविक पत्तियों, सबटाइटल वीडियो व सरल आरेख से पढ़ाना किस सिद्धांत का उदाहरण है?',
      opts: [
        'प्रस्तुतिकरण के विविध माध्यम (Multiple Means of Representation)',
        'कठोर योग्यता वर्गीकरण',
        'पृथक विशेष पाठ्यक्रम',
        'एकल-चैनल रटंत',
      ],
      exp: 'UDL विविध शिक्षार्थियों तक पहुँच बनाने हेतु जानकारी को कई संवेदी रूपों में प्रस्तुत करता है।',
    },
  },
  {
    topic: 'RTE Act 2009 – Pupil-Teacher Ratio (Primary)',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Easy',
    en: {
      q: 'Under the Schedule of the RTE Act 2009 for Primary Schools (Classes 1–5) having 61 to 90 students, how many teachers are required?',
      opts: [
        '3 teachers (upholding ~30:1 PTR norms)',
        '1 teacher only',
        '6 teachers',
        'No fixed teacher minimum',
      ],
      exp: 'RTE Schedule: up to 60 -> 2 teachers; 61–90 -> 3; 91–120 -> 4; above 150 -> 5 + 1 Head Teacher.',
    },
    mr: {
      q: 'शिक्षण हक्क कायदा (RTE 2009) नुसार प्राथमिक शाळेत ६१ ते ९० विद्यार्थी असल्यास किमान किती शिक्षक बंधनकारक आहेत?',
      opts: [
        '३ शिक्षक (३०:१ प्रमाणानुसार)',
        'केवळ १ शिक्षक',
        '६ शिक्षक',
        'संख्या निश्चित नाही',
      ],
      exp: 'RTE नुसार ६० पर्यंत २, ६१–९० साठी ३ व ९१–१२० साठी ४ शिक्षक अपेक्षित आहेत.',
    },
    hi: {
      q: 'RTE अधिनियम २००९ की अनुसूची के अनुसार कक्षा १–५ में ६१ से ९० छात्रों के लिए कितने शिक्षक अनिवार्य हैं?',
      opts: [
        '३ शिक्षक (३०:१ छात्र-शिक्षक अनुपात मानक के अनुरूप)',
        'केवल १ शिक्षक',
        '६ शिक्षक',
        'कोई न्यूनतम मानक नहीं',
      ],
      exp: 'RTE मानदंड: ६० तक २, ६१–९० पर ३, तथा ९१–१२० पर ४ शिक्षक निर्धारित हैं।',
    },
  },
  {
    topic: 'RTE Act 2009 – Annual Instructional Hours (Primary)',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Moderate',
    en: {
      q: 'What are the minimum annual working days and instructional hours mandated under RTE Act 2009 for Classes 1 to 5?',
      opts: [
        '200 working days and 800 instructional hours per year',
        '120 working days and 400 hours',
        '250 working days and 1,500 hours',
        '180 working days and 600 hours',
      ],
      exp: 'RTE specifies 200 days / 800 hours for Classes 1–5 (and 220 days / 1,000 hours for Classes 6–8).',
    },
    mr: {
      q: 'RTE 2009 नुसार इयत्ता १ ते ५ साठी शैक्षणिक वर्षात किमान किती कामकाजाचे दिवस व अध्यापन तास अनिवार्य आहेत?',
      opts: [
        '२०० कामकाजाचे दिवस आणि ८०० अध्यापन तास',
        '१२० दिवस आणि ४०० तास',
        '२५० दिवस आणि १,५०० तास',
        '१८० दिवस आणि ६०० तास',
      ],
      exp: 'प्राथमिकसाठी २०० दिवस / ८०० तास, तर उच्च प्राथमिकसाठी २२० दिवस / १,००० तास अनिवार्य आहेत.',
    },
    hi: {
      q: 'RTE अधिनियम २००९ के अंतर्गत कक्षा १ से ५ के लिए प्रति वर्ष न्यूनतम कार्यदिवस व शिक्षण घंटे कितने हैं?',
      opts: [
        '२०० कार्यदिवस और ८०० शिक्षण घंटे',
        '१२० कार्यदिवस और ४०० घंटे',
        '२५० कार्यदिवस और १,५०० घंटे',
        '१८० कार्यदिवस और ६०० घंटे',
      ],
      exp: 'प्राथमिक स्तर (१–५) हेतु २०० दिन / ८०० घंटे और उच्च प्राथमिक हेतु २२० दिन / १,००० घंटे निर्धारित हैं।',
    },
  },
  {
    topic: 'RTE Act 2009 – Age-Appropriate Admission & Bridge Course',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A 9-year-old out-of-school migrant child seeks admission in October. Under Section 4 of RTE Act 2009, the school must:',
      opts: [
        'admit her in an age-appropriate class (~Class 4) and provide special bridge training to catch up',
        'place her inside Class 1 with 6-year-olds',
        'deny entry until next June for lacking documents',
        'require a screening admission test first',
      ],
      exp: 'RTE mandates immediate age-appropriate admission backed by special remedial training.',
    },
    mr: {
      q: 'कधीच शाळेत न गेलेले ९ वर्षांचे स्थलांतरित मूल ऑक्टोबरमध्ये प्रवेश मागते. RTE कलम ४ नुसार शाळेने काय करावे?',
      opts: [
        'वयानुरूप वर्गात (सुमारे इ. ४ थी) प्रवेश देऊन समपातळीवर आणण्यासाठी विशेष पूरक प्रशिक्षण द्यावे',
        '९ वर्षांच्या मुलाला इयत्ता १ लीत बसवावे',
        'पुढच्या जूनपर्यंत प्रवेश नाकारावा',
        'प्रवेशापूर्वी लेखी चाचणी घ्यावी',
      ],
      exp: 'वयानुरूप वर्गात प्रवेश आणि विशेष प्रशिक्षण देणे RTE अंतर्गत अनिवार्य आहे.',
    },
    hi: {
      q: 'कभी स्कूल न गई ९ वर्षीय प्रवासी बालिका अक्तूबर में प्रवेश चाहती है। RTE धारा ४ के अंतर्गत विद्यालय क्या करे?',
      opts: [
        'आयु के अनुरूप कक्षा (~कक्षा ४) में प्रवेश देकर विशेष प्रशिक्षण देना चाहिए',
        '९ वर्ष की बच्ची को कक्षा १ में बैठाए',
        'अगले जून तक प्रवेश रोके',
        'पहले प्रवेश परीक्षा ले',
      ],
      exp: 'RTE आयु-अनुरूप कक्षा में तुरंत प्रवेश व विशेष प्रशिक्षण का अधिकार देता है।',
    },
  },
  {
    topic: 'RPwD Act 2016 – 21 Recognized Disabilities',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Easy',
    en: {
      q: 'The Rights of Persons with Disabilities (RPwD) Act, 2016 expanded recognized disability categories in India from 7 to:',
      opts: [
        '21 specified disability categories',
        '10 categories',
        '12 categories',
        '5 categories only',
      ],
      exp: 'RPwD 2016 covers 21 conditions including Specific Learning Disabilities, Autism Spectrum, and Blood Disorders.',
    },
    mr: {
      q: 'दिव्यांग व्यक्ती हक्क अधिनियम (RPwD Act, 2016) अंतर्गत भारतातील मान्यताप्राप्त दिव्यांगत्व प्रकार ७ वरून किती करण्यात आले?',
      opts: [
        '२१ विशिष्ट प्रकार (अध्ययन अक्षमता, ऑटिझम इ. सह)',
        '१० प्रकार',
        '१२ प्रकार',
        'केवळ ५ प्रकार',
      ],
      exp: 'RPwD कायदा २०१६ ने २१ दिव्यांग प्रकारांना समावेशक शिक्षणाचा कायदेशीर हक्क दिला.',
    },
    hi: {
      q: 'दिव्यांगजन अधिकार अधिनियम (RPwD Act, 2016) में मान्यताप्राप्त दिव्यांगता श्रेणियाँ ७ से बढ़ाकर कितनी की गईं?',
      opts: [
        '२१ निर्दिष्ट श्रेणियाँ',
        '१० श्रेणियाँ',
        '१२ श्रेणियाँ',
        'केवल ५ श्रेणियाँ',
      ],
      exp: 'RPwD 2016 ने विशिष्ट अधिगम अक्षमता व ऑटिज्म सहित २१ श्रेणियों को मान्यता दी।',
    },
  },
  {
    topic: 'ADHD Classroom Modifications',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 3 child with ADHD fidgets and drifts during 25-minute unbroken lectures. Which adjustment supports learning best?',
      opts: [
        'Chunk tasks into 5–8 minute steps, build constructive movement duties, and use clear visual checklists',
        'Force him to stand holding heavy books silently',
        'Give one 50-problem silent sheet',
        'Seat him by the busy noisy door',
      ],
      exp: 'Short task chunks, movement breaks, and low-distraction seating harness energy constructively.',
    },
    mr: {
      q: 'ADHD असलेला तिसरीतील मुलगा सलग २५ मिनिटांच्या व्याख्यानात अस्वस्थ होतो. शिक्षकाने कोणती उपयुक्त रचना करावी?',
      opts: [
        'कामे ५–८ मिनिटांच्या छोट्या टप्प्यांत विभागणे, कार्ड वाटण्यासारख्या हालचालींची संधी देणे व दृश्य यादी वापरणे',
        'सकाळभर दप्तर घेऊन उभे करणे',
        'एकाच वेळी ५० प्रश्नांची मोठी चाचणी देणे',
        'गोंगाटी दाराशेजारी बसवणे',
      ],
      exp: 'छोटे कृती टप्पे व रचनात्मक हालचाल ADHD विद्यार्थ्यांना एकाग्र राहण्यास मदत करते.',
    },
    hi: {
      q: 'ADHD वाला कक्षा ३ का बच्चा २५ मिनट के लंबे व्याख्यान में विचलित रहता है। कौन-सा समायोजन सर्वोत्तम होगा?',
      opts: [
        'कार्य को ५–८ मिनट के छोटे चरणों में बाँटना, सकारात्मक गतिविधि भूमिका देना व दृश्य चेकलिस्ट रखना',
        'पूरे समय चुपचाप खड़ा रखना',
        '५० प्रश्नों की लंबी वर्कशीट देना',
        'शोर वाले दरवाजे के पास बैठाना',
      ],
      exp: 'छोटे खंडों में कार्य और कम विकर्षण वाली सीट ADHD प्रबंधन में अत्यंत सहायक हैं।',
    },
  },
  {
    topic: 'Autism Spectrum – Visual Routine Predictability',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'An autistic primary pupil becomes distressed when classroom schedules change abruptly. What proactive support eases transitions?',
      opts: [
        'Post a predictable visual schedule on his desk and give calm advance cues before transitions',
        'Shout over sudden changes so he toughens up',
        'Cancel arts and quiet breaks permanently',
        'Leave him outside in the corridor',
      ],
      exp: 'Advance transition signals and visual routines reduce sensory anxiety respectfully.',
    },
    mr: {
      q: 'ऑटिझम (स्वमग्नता) असलेल्या मुलाला वेळापत्रक अचानक बदलल्यास अस्वस्थता येते. यावर कोणती पूर्वकाळजी मदतगार ठरेल?',
      opts: [
        'बाकावर दैनंदिन वेळापत्रकाचे चित्रमय कार्ड ठेवणे व बदलापूर्वी शांत पूर्वसूचना देणे',
        'ओरडून सवय लावण्याचा प्रयत्न करणे',
        'कला व विश्रांतीचे तास बंद करणे',
        'वर्गाबाहेर ठेवणे',
      ],
      exp: 'दृश्य पूर्वनियोजन व पूर्वसूचना संवेदनशील ताण मोठ्या प्रमाणात कमी करतात.',
    },
    hi: {
      q: 'ऑटिज़्म स्पेक्ट्रम वाला छात्र दैनिक दिनचर्या में अचानक बदलाव होने पर घबरा जाता है। कौन-सा सक्रिय सहयोग उसकी सहायता करेगा?',
      opts: [
        'डेस्क पर दृश्य चित्र-सारणी रखना और बदलाव से पहले शांत पूर्व-सूचना देना',
        'जोर से डांटकर ढलने को कहना',
        'सारे कला व विश्राम काल रद्द करना',
        'बाहर खड़ा रखना',
      ],
      exp: 'पूर्वानुमेय दृश्य दिनचर्या और बदलाव से पहले शांत संकेत संवेदी तनाव कम करते हैं।',
    },
  },
  {
    topic: 'Dyscalculia Tool & Scaffold Support',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 4 pupil reads stories fluently yet struggles to tell whether 47 is nearer 40 or 50, or mixes + and × signs. Which support addresses Dyscalculia?',
      opts: [
        'Concrete base-ten blocks, colour-coded number lines, and multisensory quantity estimation activities',
        '100 timed multiplication drills every morning',
        'Banning finger counting strictly',
        'Dropping school art periods',
      ],
      exp: 'Dyscalculia requires concrete tactile-visual representations bridging symbols to actual magnitude.',
    },
    mr: {
      q: 'चौथीतील एक मुलगी गोष्टी छान वाचते, पण ४७ हे ४० जवळ की ५० जवळ हे ठरवू शकत नाही आणि +, × चिन्हांत गोंधळते. या गणित-अक्षमतेवर (Dyscalculia) कोणता उपाय योग्य?',
      opts: [
        'मूर्त दशक-एकक ठोकळे, रंगीत संख्यारेषा आणि स्पर्शजन्य मोजणी साहित्य वापरणे',
        'दररोज सकाळी १०० पाढ्यांची शिक्षा देणे',
        'बोटांवर मोजण्यास कडक बंदी घालणे',
        'चित्रकला तास बंद करणे',
      ],
      exp: 'मूर्त साहित्य व संख्यारेषा संख्येची मानसिक प्रतिमा घडवतात.',
    },
    hi: {
      q: 'चौथी की छात्रा कहानियाँ अच्छा पढ़ती है पर ४७ किसके पास है (४० या ५०) नहीं आंक पाती और +, × में उलझती है। डिस्केलकुलिया में क्या सहायता उपयोगी है?',
      opts: [
        'ठोस दहाई-इकाई ब्लॉक, रंग-संकेतित संख्या रेखा और स्पर्शजन्य गणितीय सामग्री',
        'प्रतिदिन १०० समयबद्ध पहाड़ों की सजा',
        'उंगलियों पर गिनने पर रोक',
        'कला की कक्षाएं बंद करना',
      ],
      exp: 'डिस्केलकुलिया में संख्या-बोध हेतु मूर्त व दृश्य उपकरण सर्वाधिक सहायक होते हैं।',
    },
  },
  {
    topic: 'Torrance Creativity – Fluency vs Flexibility vs Originality',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Asked for creative uses of an empty tin can, a student generates ideas across totally distinct categories (flowerpot, drum, bird feeder, pinhole camera). Torrance defines crossing categories as:',
      opts: [
        'Flexibility (total count = Fluency; rare novelty = Originality)',
        'Convergent Recall',
        'Functional Fixedness',
        'Elaboration Blindness',
      ],
      exp: 'Torrance’s divergent indicators: Fluency, Flexibility, Originality, and Elaboration.',
    },
    mr: {
      q: 'रिकाम्या डब्याचे वेगवेगळे उपयोग विचारता विद्यार्थी कुंडी, तबला, पक्षी-पात्र, पिनहोल कॅमेरा अशा विविध क्षेत्रांतील कल्पना सांगतो. टॉरेन्सच्या मते याला काय म्हणतात?',
      opts: [
        'लवचिकता (Flexibility – एकूण संख्या Fluency व नावीन्य Originality असते)',
        'अभिसारी कडक स्मरण',
        'कार्यात्मक जडत्व',
        'विस्ताराचा अभाव',
      ],
      exp: 'विविध श्रेणींमधून विचार सुचणे म्हणजे सर्जनशील लवचिकता (Flexibility).',
    },
    hi: {
      q: 'टिन के खाली डिब्बे के उपयोग पूछने पर छात्र बिल्कुल अलग-अलग श्रेणियों के विचार बताता है (गमला, ढोल, दानापात्र, कैमरा)। टोरेंस के अनुसार यह क्या है?',
      opts: [
        'विचार लचीलापन (Flexibility — कुल संख्या Fluency व अनूठापन Originality)',
        'अभिसारी स्मृति',
        'कार्यात्मक जड़ता',
        'विस्तारहीनता',
      ],
      exp: 'विविध श्रेणियों में सोच पाना सृजनात्मक चिंतन का लचीलापन (Flexibility) कहलाता है।',
    },
  },
  {
    topic: 'Overcoming Functional Fixedness',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Pupils fail to build a lever balance because they assume "a wooden ruler is ONLY for drawing lines." Solving this requires breaking:',
      opts: [
        'Functional Fixedness',
        'Sensory Adaptation',
        'Object Permanence',
        'Classical Generalization',
      ],
      exp: 'Seeing beyond conventional object uses unlocks creative problem solving.',
    },
    mr: {
      q: 'तुलादान प्रयोगाची समस्या मुले सोडवू शकत नाहीत कारण त्यांना वाटते "पट्टी फक्त रेषा काढण्यासाठीच असते." या मानसिक अडथळ्याला काय म्हणतात?',
      opts: [
        'कार्यात्मक जडत्व (Functional Fixedness)',
        'संवेदनशील अनुकूलन',
        'वस्तू-स्थायित्व',
        'अभिजात सामान्यीकरण',
      ],
      exp: 'वस्तूचा फक्त पारंपरिक एकच उपयोग दिसणे म्हणजे Functional Fixedness.',
    },
    hi: {
      q: 'छात्र लीवर पहेली नहीं सुलझा पाते क्योंकि वे मानते हैं कि "लकड़ी का स्केल केवल सीधी रेखा खींचने हेतु है"। इस मानसिक बाधा को क्या कहते हैं?',
      opts: [
        'कार्यात्मक स्थिरता / जड़ता (Functional Fixedness)',
        'संवेदी अनुकूलन',
        'वस्तु स्थायित्व',
        'शास्त्रीय सामान्यीकरण',
      ],
      exp: 'किसी वस्तु को केवल पारंपरिक कार्य तक सीमित देखना सृजनात्मक समाधान में बाधा बनता है।',
    },
  },
  {
    topic: 'Enrichment vs Acceleration for Gifted Pupils',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 4 pupil finishes standard math in half time. Giving her richer open-ended logic quests and mini-investigations alongside age peers demonstrates:',
      opts: [
        'Curriculum Enrichment (depth without social isolation)',
        'Punitive Repetition Drills',
        'Grade Retention',
        'Ignoring differences',
      ],
      exp: 'Enrichment expands intellectual depth while preserving peer friendships.',
    },
    mr: {
      q: 'चौथीतील प्रज्ञावान मूल नियमित गणित अर्ध्या वेळेत संपवते. तिला समवयस्क मित्रांसोबत ठेवून सखोल कोडी व शोधप्रकल्प देणे म्हणजे:',
      opts: [
        'अभ्यासक्रम समृद्धीकरण (Curriculum Enrichment)',
        'शिक्षात्मक पुनरावृत्ती',
        'वर्ग अवनती',
        'वैयक्तिक भेदांकडे दुर्लक्ष',
      ],
      exp: 'समृद्धीकरणामुळे प्रज्ञावान मुलाची बौद्धिक भूक भागते व सामाजिक नातेही अबाधित राहते.',
    },
    hi: {
      q: 'प्रतिभाशाली छात्र आधे समय में ही गणित पूर्ण कर लेता है। उसे साथियों के साथ रखते हुए गहन तार्किक पहेलियाँ व शोध कार्य देना क्या है?',
      opts: [
        'पाठ्यक्रम संवर्धन (Curriculum Enrichment)',
        'दंडात्मक दोहराव',
        'कक्षा अवनति',
        'अंतर की अनदेखी',
      ],
      exp: 'संवर्धन प्रतिभाशाली बच्चों को सामाजिक अलगाव के बिना उच्च बौद्धिक चुनौती प्रदान करता है।',
    },
  },
  {
    topic: 'NCF 2005 – Five Core Guiding Principles',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Easy',
    en: {
      q: 'Which core principle anchors NCF 2005 curriculum reform in India?',
      opts: [
        'Connecting knowledge to life outside school and shifting away from rote methods',
        'Separating school lessons from local community occupations',
        'Limiting evaluation to one silent annual recall test',
        'Making textbook memorization the sole objective',
      ],
      exp: 'NCF 2005 champions real-life connection, anti-rote pedagogy, holistic beyond-text growth, flexible assessment, and democratic values.',
    },
    mr: {
      q: 'राष्ट्रीय अभ्यासक्रम आराखडा (NCF 2005) च्या पाच मार्गदर्शक तत्त्वांपैकी प्रमुख तत्त्व कोणते?',
      opts: [
        'ज्ञान शाळेबाहेरील प्रत्यक्ष जीवनाशी जोडणे आणि घोकंपट्टीपासून शिक्षण मुक्त करणे',
        'शाळेला स्थानिक जीवनापासून अलिप्त ठेवणे',
        'केवळ एका लेखी परीक्षेपुरते मूल्यमापन ठेवणे',
        'पाठ्यपुस्तक पाठांतर हेच ध्येय मानणे',
      ],
      exp: 'जीवनाशी जोडणी व रटणमुक्ती हे NCF 2005 चे गाभाभूत तत्त्व आहे.',
    },
    hi: {
      q: 'NCF 2005 के पाँच मार्गदर्शक सिद्धांतों में से प्रमुख सिद्धांत कौन-सा है?',
      opts: [
        'ज्ञान को विद्यालय के बाहर के जीवन से जोड़ना तथा रटंत प्रणाली से मुक्ति दिलाना',
        'पाठ्यपुस्तकों को स्थानीय परिवेश से अलग रखना',
        'केवल एक कठोर वार्षिक परीक्षा रखना',
        'कंठस्थीकरण को केंद्र में रखना',
      ],
      exp: 'NCF 2005 जीवन-संयोजन और रटंत-मुक्त अधिगम पर बल देता है।',
    },
  },
  {
    topic: 'NEP 2020 – 5+3+3+4 Foundational Stage',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Easy',
    en: {
      q: 'In NEP 2020’s 5+3+3+4 design, which age group and classes form the 5-year "Foundational Stage"?',
      opts: [
        'Ages 3–8: 3 years of Anganwadi/Balvatika pre-school + Classes 1 and 2',
        'Ages 6–11: Classes 1 to 5 only',
        'Ages 8–11: Classes 3 to 5',
        'Ages 11–14: Classes 6 to 8',
      ],
      exp: 'Foundational = 5 yrs (Balvatika + Cl 1–2); Preparatory = 3 yrs (Cl 3–5); Middle = Cl 6–8; Secondary = Cl 9–12.',
    },
    mr: {
      q: 'NEP 2020 च्या ५+३+३+४ रचनेत पहिल्या ५ वर्षांच्या "पायाभूत टप्प्यात" कोणते वयोगट व वर्ग येतात?',
      opts: [
        'वय ३–८ वर्षे: ३ वर्षे बालवाटिका/अंगणवाडी + इयत्ता १ ली व २ री',
        'वय ६–११ वर्षे: फक्त इयत्ता १ ते ५',
        'वय ८–११ वर्षे: इयत्ता ३ ते ५',
        'वय ११–१४ वर्षे: इयत्ता ६ ते ८',
      ],
      exp: 'पायाभूत (वय ३–८), पूर्वतयारी (वय ८–११, इ. ३–५), मध्य (इ. ६–८) व माध्यमिक (इ. ९–१२) अशी रचना आहे.',
    },
    hi: {
      q: 'NEP 2020 की ५+३+३+४ संरचना में प्रारंभिक ५ वर्षीय "आधारभूत चरण" में कौन-सी कक्षाएँ सम्मिलित हैं?',
      opts: [
        'आयु ३–८ वर्ष: ३ वर्ष बालवाटिका/आंगनवाड़ी + कक्षा १ व २',
        'आयु ६–११ वर्ष: केवल कक्षा १ से ५',
        'आयु ८–११ वर्ष: कक्षा ३ से ५',
        'आयु ११–१४ वर्ष: कक्षा ६ से ८',
      ],
      exp: 'आधारभूत चरण (३–८ वर्ष) में ३ वर्ष पूर्व-प्राथमिक तथा कक्षा १ व २ शामिल हैं।',
    },
  },
  {
    topic: 'NEP 2020 – Preparatory Stage Shift',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Moderate',
    en: {
      q: 'NEP 2020 characterizes the Preparatory Stage (Classes 3–5) as evolving from pure play toward:',
      opts: [
        'activity-based, discovery-oriented interactive learning with light textbooks',
        '8-hour silent lecture coaching',
        'dropping sports and art completely',
        'semi-annual high-stakes board elimination exams',
      ],
      exp: 'Classes 3–5 unite playful discovery with structured inquiry and solid FLN.',
    },
    mr: {
      q: 'NEP 2020 नुसार पूर्वतयारी टप्पा (इयत्ता ३ ते ५) खेळ-आधारित शिक्षणाकडून कशाकडे वाटचाल करतो?',
      opts: [
        'कृती-आधारित, शोधक व संवादात्मक अध्ययन (हलक्या पाठ्यपुस्तकांसह)',
        'सलग ८ तास व्याख्यान',
        'क्रीडा व कला बंद करणे',
        'कठीण गाळण परीक्षा',
      ],
      exp: 'इयत्ता ३–५ मध्ये खेळासोबत शोध, चर्चा व सुगम पाठ्यपुस्तकांचा समतोल साधला जातो.',
    },
    hi: {
      q: 'NEP 2020 के अनुसार "प्रारंभिक चरण" (कक्षा ३–५) खेल-आधारित शिक्षा से किस ओर बढ़ता है?',
      opts: [
        'गतिविधि-आधारित, खोजपरक व संवादात्मक अधिगम (हल्की पाठ्यपुस्तकों सहित)',
        'लंबे नीरस व्याख्यान',
        'खेल और कला हटाना',
        'कठोर बोर्ड छंटनी परीक्षा',
      ],
      exp: 'कक्षा ३–५ में आनंददायी खोजपूर्ण गतिविधियों व हल्की पाठ्यपुस्तकों का संतुलित समावेश होता है।',
    },
  },
  {
    topic: 'NEP 2020 – 360-Degree Holistic Progress Card',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Moderate',
    en: {
      q: 'How does NEP 2020’s 360-Degree Holistic Progress Card advance beyond traditional report cards?',
      opts: [
        'It integrates teacher assessment, self-assessment, peer feedback, and project/socio-emotional growth across cognitive, affective, and psychomotor domains',
        'It prints only one annual percentage number',
        'It omits teacher comments in favour of IQ scores',
        'It grades solely on uniform neatness',
      ],
      exp: 'Designed under PARAKH norms, it documents multidimensional student growth.',
    },
    mr: {
      q: 'NEP 2020 मधील "३६०-अंश समग्र प्रगती पत्रक" पारंपरिक गुणपत्रकापेक्षा कसे वेगळे आहे?',
      opts: [
        'शिक्षक निरीक्षणासोबत स्व-मूल्यमापन, सहपाठी अभिप्राय व बोधनात्मक-भावनिक-कौशल्य प्रगतीची समग्र नोंद असते',
        'फक्त वार्षिक टक्केवारी छापलेली असते',
        'केवळ बुद्ध्यांक लिहिला जातो',
        'केवळ गणवेशावरून गुण दिले जातात',
      ],
      exp: 'PARAKH अंतर्गत विद्यार्थ्याची सर्वांगीण बहुआयामी प्रगती नोंदवली जाते.',
    },
    hi: {
      q: 'NEP 2020 का "३६०-डिग्री समग्र प्रगति कार्ड" पारंपरिक अंकतालिका से किस प्रकार भिन्न है?',
      opts: [
        'इसमें शिक्षक आकलन के साथ स्व-मूल्यांकन, सहपाठी प्रतिपुष्टि व संज्ञानात्मक-भावात्मक-मनोपेशीय विकास शामिल है',
        'केवल वार्षिक प्रतिशत छपता है',
        'केवल IQ लिखा जाता है',
        'केवल उपस्थिति दर्ज होती है',
      ],
      exp: 'PARAKH मानकों के अनुरूप यह कार्ड बच्चे की बहुआयामी प्रगति दर्शाता है।',
    },
  },
  {
    topic: 'Revised Bloom Taxonomy (2001)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In Anderson & Krathwohl’s 2001 Revision of Bloom’s Cognitive Taxonomy, what changed at the top two levels?',
      opts: [
        'Categories shifted from nouns to action verbs, and "Creating" surpassed "Evaluating" as the pinnacle level',
        'Remembering became highest above Analysing',
        'Understanding was removed',
        'Applying merged into Psychomotor',
      ],
      exp: 'Revised order: Remember -> Understand -> Apply -> Analyse -> Evaluate -> Create.',
    },
    mr: {
      q: 'अँडरसन व क्रॅथवॉल यांनी २००१ मध्ये ब्लूमच्या बोधनात्मक वर्गीकरणात कोणता प्रमुख बदल केला?',
      opts: [
        'क्रियापदे वापरली व "सृजन करणे" (Creating) हे "मूल्यमापन" च्या वर सर्वोच्च स्थानी नेले',
        '"स्मरण" सर्वोच्च स्तर बनवला',
        '"आकलन" काढून टाकले',
        'उपयोजन भावनिक क्षेत्रात विलीन केले',
      ],
      exp: 'सुधारित क्रम: स्मरण -> आकलन -> उपयोजन -> विश्लेषण -> मूल्यमापन -> सृजन.',
    },
    hi: {
      q: 'एंडरसन व क्रेथवॉल द्वारा २००१ में ब्लूम के संज्ञानात्मक वर्गीकरण में शीर्ष स्तरों पर क्या संशोधन हुआ?',
      opts: [
        'श्रेणियों को क्रियाओं में बदला गया तथा "सृजन करना" (Creating) को "मूल्यांकन" से ऊपर सर्वोच्च स्थान दिया गया',
        '"स्मरण" सबसे ऊपर आया',
        '"समझ" हटाया गया',
        'अनुप्रयोग को भावात्मक पक्ष में मिलाया गया',
      ],
      exp: 'संशोधित क्रम: स्मरण -> समझ -> अनुप्रयोग -> विश्लेषण -> मूल्यांकन -> सृजन।',
    },
  },
  {
    topic: 'Psychomotor Domain – Naturalization (Dave)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'When a Class 5 pupil assembles a simple bulb circuit effortlessly and automatically without looking at instructions, R.H. Dave’s Psychomotor scale labels this mastery:',
      opts: [
        'Naturalization',
        'Imitation',
        'Passive Sensory Reception',
        'Affective Valuing only',
      ],
      exp: 'Dave’s stages: Imitation -> Manipulation -> Precision -> Articulation -> Naturalization.',
    },
    mr: {
      q: 'पाचवीतील विद्यार्थी मार्गदर्शक कागद न पाहता सहजगत्या व अचूक विद्युत परिपथ जोडतो तेव्हा डेव्हच्या क्रियात्मक वर्गीकरणानुसार ही कोणती पायरी आहे?',
      opts: [
        'सहजीकरण / स्वाभाविकीकरण (Naturalization)',
        'प्राथमिक अनुकरण (Imitation)',
        'निष्क्रिय श्रवण',
        'शाब्दिक स्मरण',
      ],
      exp: 'कौशल्य पूर्णतः आत्मसात होऊन सहज स्वयंचलित होणे म्हणजे स्वाभाविकीकरण.',
    },
    hi: {
      q: 'कक्षा ५ का छात्र बिना निर्देश देखे सहज व स्वचालित रूप से विद्युत परिपथ जोड़ लेता है। आर.एच. डेव के मनोपेशीय क्रम में यह स्तर है:',
      opts: [
        'स्वभाविकरण (Naturalization)',
        'प्रारंभिक अनुकरण (Imitation)',
        'निष्क्रिय श्रवण',
        'शाब्दिक स्मृति',
      ],
      exp: 'डेव के चरण: अनुकरण -> कार्यसाधन -> परिशुद्धता -> स्पष्ट अभिव्यक्ति -> स्वाभाविकीकरण।',
    },
  },
  {
    topic: 'Affective Domain – Characterization (Krathwohl)',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'A pupil quietly switches off empty classroom fans daily without anyone watching, reflecting deep internal commitment. Krathwohl calls this Affective peak:',
      opts: [
        'Characterization by a Value',
        'Receiving',
        'Mechanical Fear Compliance',
        'Token Seeking',
      ],
      exp: 'Affective hierarchy: Receiving -> Responding -> Valuing -> Organization -> Characterization by Value.',
    },
    mr: {
      q: 'कोणीही पाहत नसतानाही एक मुलगी रोज न वापरलेले वर्गातील पंखे स्वतःहून बंद करते. क्रॅथवॉलच्या भावनिक क्षेत्रातील हा कोणता सर्वोच्च टप्पा आहे?',
      opts: [
        'मूल्याचे चारित्र्याकरण (Characterization by a Value)',
        'केवळ ग्रहण करणे (Receiving)',
        'भीतीपोटी पालन',
        'बक्षिसाची अपेक्षा',
      ],
      exp: 'योग्य मूल्य जेव्हा दैनंदिन स्वभावाचा अविभाज्य भाग बनते तेव्हा ते चारित्र्याकरण असते.',
    },
    hi: {
      q: 'कोई न देख रहा हो तब भी छात्र रोज खाली कक्षा के पंखे बंद कर देता है। क्रेथवॉल के भावात्मक पक्ष का यह सर्वोच्च स्तर क्या है?',
      opts: [
        'मूल्य का चरित्रीकरण (Characterization by a Value)',
        'केवल ग्रहण करना (Receiving)',
        'दंड के भय से पालन',
        'पुरस्कार अपेक्षा',
      ],
      exp: 'भावात्मक स्तर: ग्रहण -> अनुक्रिया -> अनमूल्यन -> संगठन -> चरित्रीकरण।',
    },
  },
  {
    topic: 'Diagnostic Pre-Assessment Timing',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'A quick 5-item ungraded check BEFORE teaching fractions to find who misses equal sharing serves as:',
      opts: [
        'Diagnostic / Placement Pre-assessment',
        'Summative Board Examination',
        'Norm-Referenced Ranking',
        'Punitive Gatekeeping',
      ],
      exp: 'Diagnostic assessment maps readiness and misconceptions prior to new instruction.',
    },
    mr: {
      q: 'अपूर्णांक शिकवण्यापूर्वी सोमवारी घेतलेली ५ गुणांची बिन-गुणदानाची पूर्वचाचणी काय असते?',
      opts: [
        'निदानात्मक / पूर्वतयारी चाचणी (Diagnostic Pre-assessment)',
        'संकलित परीक्षा',
        'मानक क्रमवारी',
        'नापास चाचणी',
      ],
      exp: 'अध्यापनापूर्वी पूर्वज्ञान व गैरसमज ओळखण्यासाठी निदानात्मक चाचणी घेतली जाते.',
    },
    hi: {
      q: 'भिन्न अध्याय शुरू करने से पहले यह जानने हेतु ली गई ५ प्रश्नों की अनअंकित जांच कि बच्चे समान हिस्से समझते हैं या नहीं, क्या है?',
      opts: [
        'निदानात्मक / पूर्व-तैयारी आकलन (Diagnostic Pre-assessment)',
        'वार्षिक संकलित परीक्षा',
        'बोर्ड रैंकिंग',
        'फेल करने की जांच',
      ],
      exp: 'शिक्षण से पूर्व छात्रों के पूर्वज्ञान व भ्रांतियों को पहचानना निदानात्मक आकलन है।',
    },
  },
  {
    topic: 'Assessment AS Learning',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'When pupils themselves apply a rubric checklist to critique and revise their own science journal entry, that exemplifies:',
      opts: [
        'Assessment AS Learning (metacognitive self-regulation)',
        'Assessment OF Learning',
        'External Audit',
        'Unconnected Standardized Testing',
      ],
      exp: 'Assessment AS learning builds learner self-monitoring capacity.',
    },
    mr: {
      q: 'जेव्हा विद्यार्थी स्वतः निकष-तक्ता वापरून आपला स्वाध्याय सुधारतो तेव्हा ते काय असते?',
      opts: [
        'अध्ययन म्हणून मूल्यमापन (Assessment AS Learning)',
        'अध्ययनाचे अंतिम संकलित मूल्यमापन (OF Learning)',
        'बाह्य तपासणी',
        'यांत्रिक यादी',
      ],
      exp: 'स्वतःच्या कामाचे निकषांवर परीक्षण करून शिकणे हे "Assessment AS Learning" असते.',
    },
    hi: {
      q: 'जब विद्यार्थी स्वयं रूब्रिक जांच-सूची का उपयोग करके अपनी नोटबुक की समीक्षा व सुधार करते हैं, तो यह क्या है?',
      opts: [
        'अधिगम के रूप में आकलन (Assessment AS Learning)',
        'अधिगम का अंतिम संकलित आकलन (OF Learning)',
        'बाहरी निरीक्षण',
        'मानकीकृत रैंकिंग',
      ],
      exp: 'जब शिक्षार्थी स्वयं मानदंडों के आधार पर अपने सीखने का मूल्यांकन व सुधार करे, वह Assessment AS Learning है।',
    },
  },
  {
    topic: 'Bruner Spiral Curriculum',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why do fractions, symmetry, and water conservation reappear in Classes 2, 4, and 7 at rising sophistication? Bruner termed this:',
      opts: [
        'a Spiral Curriculum (Enactive -> Iconic -> Symbolic progression)',
        'Circular Repetition',
        'Tabula Rasa Erasure',
        'Linear Isolation',
      ],
      exp: 'Revisiting core structures with deepening abstraction matches cognitive readiness.',
    },
    mr: {
      q: '"अपूर्णांक" किंवा "सममिती" या संकल्पना इयत्ता २, ४ व ७ मध्ये वाढत्या खोलीसह पुन्हा का येतात? ब्रुनर याला काय म्हणतात?',
      opts: [
        'सर्पिलाकार अभ्यासक्रम (Spiral Curriculum)',
        'निरर्थक पुनरावृत्ती',
        'कोरी पाटी पुसणे',
        'सुटी रचना',
      ],
      exp: 'मूळ संकल्पना वयानुरूप वाढत्या खोलीसह शिकवणे हे सर्पिलाकार अभ्यासक्रमाचे तत्त्व आहे.',
    },
    hi: {
      q: '"भिन्न" या "सममिति" जैसी अवधारणाएँ कक्षा २, ४ और ७ में उत्तरोत्तर गहराई से क्यों आती हैं? ब्रूनर ने इसे क्या कहा?',
      opts: [
        'सर्पिलाकार पाठ्यक्रम (Spiral Curriculum)',
        'व्यर्थ दोहराव',
        'कोरी स्लेट मिटाना',
        'पृथक अलगाव',
      ],
      exp: 'मूल विचारों को आयु के अनुसार बढ़ती गहराई के साथ जोड़ना सर्पिलाकार पाठ्यक्रम है।',
    },
  },
  {
    topic: 'Guided Discovery vs Unguided Chaos',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Research prefers "Guided Discovery" over totally unassisted discovery in primary classes because:',
      opts: [
        'strategic questions and curated materials keep inquiry productive without working-memory overload',
        'teachers simply read out answers beforehand',
        'hypotheses are forbidden',
        'only adults benefit from hints',
      ],
      exp: 'Structured scaffolding prevents floundering while preserving genuine pupil discovery.',
    },
    mr: {
      q: 'प्राथमिक विद्यार्थ्यांसाठी अनियंत्रित शोधण्यापेक्षा "मार्गदर्शित शोध अध्ययन" (Guided Discovery) अधिक प्रभावी का ठरते?',
      opts: [
        'योग्य साहित्य व नेमक्या प्रश्नांमुळे गोंधळ न होता विद्यार्थी स्वतः अचूक निष्कर्षापर्यंत पोहोचतात म्हणून',
        'शिक्षक आधीच उत्तर सांगून टाकतात म्हणून',
        'निरीक्षणाला परवानगी नसते म्हणून',
        'फक्त मोठ्यांसाठी मर्यादित असते म्हणून',
      ],
      exp: 'योग्य आधारासह शोध घेणे कार्यरत स्मृतीवरील अनावश्यक ताण टाळून अर्थपूर्ण ज्ञाननिर्मिती करते.',
    },
    hi: {
      q: 'प्राथमिक कक्षाओं में दिशाहीन खोज की बजाय "निर्देशित खोज अधिगम" अधिक प्रभावी क्यों होता है?',
      opts: [
        'सुविचारित प्रश्न व सामग्री अनावश्यक भ्रम रोककर छात्रों को सही निष्कर्ष तक ले जाते हैं',
        'शिक्षक पहले ही उत्तर बता देते हैं',
        'अवलोकन वर्जित होता है',
        'केवल वयस्कों के लिए है',
      ],
      exp: 'उचित पाड़ (Scaffolding) के साथ खोज सार्थक अवधारणा निर्माण सुनिश्चित करती है।',
    },
  },
  {
    topic: 'Ausubel Advance Organizer',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Before teaching Konkan vs Vidarbha crops, presenting a brief 2-minute overview map linking soil and rainfall exemplifies Ausubel’s:',
      opts: [
        'Advance Organizer (anchoring new material to prior schemas)',
        'Rote Conditioning',
        'Distractor Analysis',
        'Retroactive Interference',
      ],
      exp: 'Advance organizers bridge what learners already know with upcoming structured concepts.',
    },
    mr: {
      q: '"कोकण व विदर्भातील पिके" धड्यापूर्वी हवामान व मृदेची जोडणारी छोटी रूपरेषा मांडणे डेव्हिड ऑसुबेलच्या मते काय आहे?',
      opts: [
        'अग्रिम संघटक (Advance Organizer)',
        'यांत्रिक घोकंपट्टी',
        'चाचणी विश्लेषण',
        'विस्मरण अडथळा',
      ],
      exp: 'अग्रिम संघटकामुळे नवीन तपशील पूर्वीच्या संज्ञानात्मक चौकटीत व्यवस्थित बसतात.',
    },
    hi: {
      q: '"कोंकण व विदर्भ की फसलें" पाठ से पहले मिट्टी व वर्षा से जोड़ती संक्षिप्त रूपरेखा रखना आसुबेल के अनुसार क्या है?',
      opts: [
        'अग्रिम आयोजक (Advance Organizer)',
        'यांत्रिक रटंत',
        'उत्तर-परीक्षण विश्लेषण',
        'पूर्वव्यापी अवरोध',
      ],
      exp: 'अग्रिम आयोजक नए तथ्यों को पूर्व संज्ञानात्मक संरचना से जोड़ने वाला सेतु है।',
    },
  },
  {
    topic: 'Challenging Gender Stereotypes',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'A Class 4 boy says, "Cooking is only for girls; boys shouldn’t join the salad club." The wisest teacher response is to:',
      opts: [
        'highlight nutrition as a vital life skill for everyone with inspiring male and female examples',
        'segregate all school clubs strictly by gender',
        'punish the pupil publicly before parents',
        'cancel cooking clubs permanently',
      ],
      exp: 'Constructive counter-examples dismantle rigid gender stereotypes without shaming.',
    },
    mr: {
      q: 'चौथीतील मुलगा म्हणतो, "स्वयंपाक फक्त मुलींचा असतो!" शिक्षकाचा सुज्ञ प्रतिसाद कोणता असावा?',
      opts: [
        'पोषण व अन्न-तयारी प्रत्येकासाठी जीवनकौशल्य असल्याचे सांगून प्रसिद्ध पुरुष व महिला शेफची उदाहरणे देणे',
        'मुला-मुलींचे स्वतंत्र कप्पे पाडणे',
        'मुलाचा जाहीर अपमान करणे',
        'उपक्रम रद्द करणे',
      ],
      exp: 'लिंगभाव रूढींवर सकारात्मक उदाहरणांनी संवाद साधणे समानतेचे संस्कार घडवते.',
    },
    hi: {
      q: 'कक्षा ४ का छात्र कहता है, "खाना बनाना सिर्फ लड़कियों का काम है!" शिक्षक की सर्वोत्तम प्रतिक्रिया क्या होगी?',
      opts: [
        'पोषण को सभी के लिए आवश्यक जीवन-कौशल बताकर प्रसिद्ध महिला व पुरुष रसोइयों के उदाहरण साझा करना',
        'लड़के-लड़कियों के क्लब अलग कर देना',
        'सबके सामने दंडित करना',
        'क्लब बंद कर देना',
      ],
      exp: 'संवाद और सकारात्मक उदाहरणों द्वारा लैंगिक रूढ़ियों को तोड़ना समावेशी शिक्षा का आधार है।',
    },
  },
  {
    topic: 'Hidden Curriculum Wait-Time Equity',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Equalizing call-outs, challenging math questions, and wait-time across boys and girls directly repairs:',
      opts: [
        'Hidden Curriculum gender bias',
        'Standard Error of Mean',
        'Phonemic Interference',
        'Spatial Centration',
      ],
      exp: 'Conscious equitable distribution ensures equal academic voice regardless of gender.',
    },
    mr: {
      q: 'मुलांपेक्षा मुलींना नकळत कमी प्रतीक्षा-वेळ देणे किंवा फक्त मुलांनाच प्रयोग उपकरणे देणे हा कोणता दोष आहे?',
      opts: [
        'छुपा अभ्यासक्रम लिंगभाव पक्षपात (Hidden Curriculum Gender Bias)',
        'सांख्यिकीय त्रुटी',
        'ध्वनी-अडथळा',
        'अवकाशीय एककेंद्रीपणा',
      ],
      exp: 'समान प्रतीक्षा-वेळ व जबाबदारी देणे छुप्या पक्षपाताला दूर करते.',
    },
    hi: {
      q: 'अनजाने में लड़कों को सोचने का अधिक समय देना या प्रयोग सामग्री केवल लड़कों को मँगाने कहना किस दोष का उदाहरण है?',
      opts: [
        'प्रच्छन्न पाठ्यचर्या लैंगिक पूर्वाग्रह (Hidden Curriculum Gender Bias)',
        'माध्यमान त्रुटि',
        'ध्वनि व्यवधान',
        'स्थानिक केंद्रीकरण',
      ],
      exp: 'प्रतीक्षा समय और अवसरों में समानता रखकर प्रच्छन्न लैंगिक भेदभाव दूर किया जाता है।',
    },
  },
  {
    topic: 'Individual Differences in Learning Pace',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'When one pupil grasps place value in 10 minutes while another needs three hands-on sessions, sound pedagogy views this as:',
      opts: [
        'natural diversity in learning pace and entry pathway requiring differentiated scaffolds',
        'permanent moral failure',
        'genetic impossibility',
        'disobedience',
      ],
      exp: 'Mastery depends on tailored time and representation rather than uniform speed.',
    },
    mr: {
      q: 'एका विद्यार्थ्याला स्थानिक किंमत १० मिनिटांत समजते तर दुसऱ्याला मूर्त साहित्याची तीन सत्रे लागतात. प्रभावी अध्यापनशास्त्र याकडे कसे पाहते?',
      opts: [
        'अध्ययन गतीतील स्वाभाविक वैयक्तिक फरक (वेगळा वेग व आधार द्यावा)',
        'बौद्धिक निकामीपणा',
        'अवज्ञा',
        'न बदलणारे नशीब',
      ],
      exp: 'योग्य वेळ व अनुरूप साहित्य दिल्यास जवळपास सर्व मुले संकल्पना साध्य करू शकतात.',
    },
    hi: {
      q: 'एक विद्यार्थी स्थानीय मान १० मिनट में समझता है जबकि दूसरे को ठोस सामग्री के तीन सत्र लगते हैं। प्रभावी शिक्षाशास्त्र इसे क्या मानता है?',
      opts: [
        'सीखने की गति व शैली में स्वाभाविक वैयक्तिक भिन्नता',
        'स्थायी हीनता',
        'अवज्ञा',
        'अपरिवर्तनीय अक्षमता',
      ],
      exp: 'पर्याप्त समय व उपयुक्त शिक्षण माध्यम मिलने पर अधिकांश बच्चे दक्षता प्राप्त कर लेते हैं।',
    },
  },
  {
    topic: 'Cooperative Learning – Johnson & Johnson',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'What turns simple group seating into genuine Cooperative Learning (Johnson & Johnson)?',
      opts: [
        'Positive Interdependence and Individual Accountability where every member contributes and understands',
        'One top scorer completing work while three copy',
        'Total silence among teammates',
        'Grading only the group leader',
      ],
      exp: 'Shared goals plus personal accountability prevent free-riding in team tasks.',
    },
    mr: {
      q: 'केवळ ४ मुलांना एकत्र बसवण्यापेक्षा खरे "सहकारी अध्ययन" कशामुळे वेगळे ठरते?',
      opts: [
        'सकारात्मक परस्परावलंबन आणि वैयक्तिक उत्तरदायित्व (प्रत्येक सदस्याची भूमिका अनिवार्य असणे)',
        'एकानेच काम करून इतरांनी उतरवणे',
        'बोलण्यास सक्त मनाई',
        'फक्त गटप्रमुखालाच गुण',
      ],
      exp: 'सहकारी अध्ययनात प्रत्येक सदस्याला विषय समजून मांडावा लागतो.',
    },
    hi: {
      q: 'केवल चार बच्चों को साथ बैठा देने की तुलना में वास्तविक "सहकारी अधिगम" किससे अलग होता है?',
      opts: [
        'सकारात्मक परस्पर निर्भरता व व्यक्तिगत उत्तरदायित्व',
        'केवल एक छात्र सारा काम करे और बाकी नकल करें',
        'आपसी बातचीत पर रोक',
        'केवल समूह नेता को अंक',
      ],
      exp: 'जॉनसन व जॉनसन के अनुसार सकारात्मक अंतरनिर्भरता और व्यक्तिगत जवाबदेही आवश्यक है।',
    },
  },
  {
    topic: 'Think-Pair-Share Equity Routine',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Inserting 30s solo Think + 60s Pair discussion before Share improves equity chiefly because:',
      opts: [
        'shy learners formulate and test thoughts safely with a partner before speaking to the whole class',
        'only the fastest hand ever responds',
        'listening to peers stops',
        'homework doubles',
      ],
      exp: 'Think-Pair-Share distributes cognitive participation across every seat.',
    },
    mr: {
      q: 'हात वर करण्यापूर्वी "स्वतः विचार (Think) – जोडीशी चर्चा (Pair) – वर्गात मांडणी (Share)" ही पद्धत का उपयुक्त ठरते?',
      opts: [
        'संकोची विद्यार्थ्यांना विचार मांडण्यास वेळ मिळून जोडीदाराच्या साथीने आत्मविश्वास वाढतो',
        'फक्त घाई करणाराच बोलतो',
        'ऐकणे बंद होते',
        'गृहपाठ दुप्पट होतो',
      ],
      exp: 'या तंत्रामुळे वर्गातील प्रत्येक विद्यार्थ्याचा सक्रिय सहभाग वाढतो.',
    },
    hi: {
      q: 'हाथ उठवाने से पहले "स्वयं सोचें (Think) -> जोड़ीदार से चर्चा (Pair) -> साझा (Share)" अपनाने से क्या लाभ है?',
      opts: [
        'संकोची छात्रों को भी सोचने व मित्र के साथ विचार परखने का सुरक्षित अवसर मिलता है',
        'केवल सबसे तेज हाथ वाला ही बोलता है',
        'सुनना बंद हो जाता है',
        'गृहकार्य दोगुना होता है',
      ],
      exp: 'Think-Pair-Share पूरी कक्षा की सक्रिय सहभागिता सुनिश्चित करता है।',
    },
  },
];
