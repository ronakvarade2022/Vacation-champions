import { CuratedTrilingualMcq } from './types';

// Batch 3 CDP Part 8 (32 original trilingual items; NEP 2020, NCF 2005, Evaluation Validity/Reliability, Socio-Emotional & Classroom Practice)
export const MAHA_TET_P1_B3_CDP_PART8: CuratedTrilingualMcq[] = [
  {
    topic: 'Assessment – Reliability vs Validity',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'A poorly constructed 20-mark Class 4 EVS worksheet keeps yielding identical high scores on Monday and Friday, yet all 20 items actually test difficult Class 7 English grammar instead of local water conservation. Psychometrically, this tool is:',
      opts: [
        'Consistent (Reliable) across repeats, yet Invalid because it fails to measure the intended EVS outcomes',
        'Highly Valid for EVS even though off-topic',
        'Free from any construct error',
        'Standardized diagnostic environmental mastery',
      ],
      exp: 'Validity asks whether an assessment truly measures what it claims to measure; Reliability alone (repeat consistency) never fixes an off-target test.',
    },
    mr: {
      q: 'इ. ४ थीची २० गुणांची परिसर अभ्यास चाचणी सोमवारी आणि शुक्रवारी सारखेच गुण देते, परंतु तिचे सर्व २० प्रश्न स्थानिक जलसंधारणाऐवजी इ. ७ वीचे कठीण इंग्रजी व्याकरण तपासतात; ही चाचणी मानसमितीच्या दृष्टीने कशी आहे?',
      opts: [
        'विश्वसनीय (Reliable — सारखेच गुण देते), परंतु असप्रमाण / अवैध (Invalid — अपेक्षित परिसर अभ्यास घटक मोजत नाही)',
        'विषयाबाहेर असूनही परिसर अभ्यासासाठी अत्यंत वैध',
        'कोणत्याही रचनात्मक दोषापासून मुक्त',
        'प्रमाणित निदानात्मक पर्यावरण चाचणी',
      ],
      exp: 'विश्वसनीयता म्हणजे निकालातील सातत्य, तर सप्रमाणता (Validity) म्हणजे चाचणीने नेमका तोच अपेक्षित घटक मोजणे; विषयाबाहेरची चाचणी अवैध ठरते.',
    },
    hi: {
      q: 'कक्षा 4 के 20 अंकों के पर्यावरण अध्ययन पत्र से सोमवार और शुक्रवार को लगभग समान अंक आते हैं, परंतु सभी 20 प्रश्न जल संरक्षण के बजाय कक्षा 7 का कठिन अंग्रेजी व्याकरण पूछते हैं; यह परीक्षण है:',
      opts: [
        'विश्वसनीय (Reliable — दोहराव में समान परिणाम), पर अवैध (Invalid — अपेक्षित पर्यावरण दक्षता नहीं मापता)',
        'विषय से बाहर होने पर भी पूर्णतः वैध',
        'हर रचनात्मक त्रुटि से मुक्त',
        'मानकीकृत निदानात्मक पर्यावरण मूल्यांकन',
      ],
      exp: 'विश्वसनीयता परिणामों की स्थिरता है, जबकि वैधता (Validity) यह देखती है कि परीक्षण वास्तव में वही माप रहा है या नहीं जिसके लिए वह बना है।',
    },
  },
  {
    topic: 'PARAKH – NEP 2020 Assessment Reform',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Under NEP 2020, what is the core mandate of PARAKH (Performance Assessment, Review, and Analysis of Knowledge for Holistic Development)?',
      opts: [
        'Setting norms, standards, and competency-based evaluation guidelines across Indian school boards while moving away from rote recall',
        'Abolishing all classroom formative portfolios and projects',
        'Conducting weekly ranking competitions for preschool toddlers',
        'Replacing mother-tongue literacy with Latin translations',
      ],
      exp: 'PARAKH functions as the national assessment center establishing equitable standards and competency-oriented school assessment across boards.',
    },
    mr: {
      q: 'राष्ट्रीय शैक्षणिक धोरण (NEP 2020) अंतर्गत स्थापन केलेल्या "परख" (PARAKH) या राष्ट्रीय केंद्राचा मुख्य उद्देश कोणता?',
      opts: [
        'घोकंपट्टी कमी करून सर्व भारतीय शिक्षण मंडळांसाठी क्षमताधिष्ठित मूल्यमापनाचे मानके व मार्गदर्शक तत्त्वे निश्चित करणे',
        'वर्गातील सर्व आकारिक संचयिका व प्रकल्प बंद करणे',
        'बालवाडीतील मुलांसाठी साप्ताहिक क्रमवारी स्पर्धा घेणे',
        'मातृभाषा साक्षरतेऐवजी परदेशी भाषा सक्तीच्या करणे',
      ],
      exp: 'PARAKH हे सर्व शालेय मंडळांमध्ये समग्र, क्षमताधिष्ठित व दर्जेदार मूल्यमापन पद्धती विकसित करणारे राष्ट्रीय केंद्र आहे.',
    },
    hi: {
      q: 'NEP 2020 के अंतर्गत स्थापित राष्ट्रीय मूल्यांकन केंद्र PARAKH का मुख्य कार्य क्या है?',
      opts: [
        'रटंत प्रवृत्ति घटाकर सभी भारतीय स्कूल बोर्डों के लिए दक्षता-आधारित मूल्यांकन मानक और दिशानिर्देश तय करना',
        'कक्षा के सभी रचनात्मक पोर्टफोलियो और प्रोजेक्ट बंद करना',
        'प्री-स्कूल बच्चों के लिए साप्ताहिक रैंकिंग परीक्षा लेना',
        'मातृभाषा साक्षरता की जगह विदेशी अनुवाद लागू करना',
      ],
      exp: 'PARAKH (Performance Assessment, Review, and Analysis of Knowledge for Holistic Development) सभी बोर्डों में समग्र दक्षता-आधारित आकलन के मानक तय करता है।',
    },
  },
  {
    topic: 'NEP 2020 – 360-Degree Holistic Progress Card',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How does the Holistic Progress Card (HPC) recommended in NEP 2020 fundamentally differ from traditional single-number report cards?',
      opts: [
        'It captures multidimensional cognitive, affective, and psychomotor growth by blending teacher, self, and peer reflections',
        'It prints only one annual percentage and parent income column',
        'It deletes art, teamwork, and curiosity from student profiles',
        'It ranks toddlers strictly by handwriting speed',
      ],
      exp: 'The 360-degree HPC treats learners as whole human beings—integrating self-assessment, peer feedback, projects, and life skills.',
    },
    mr: {
      q: 'NEP 2020 ने सुचवलेले ३६०-अंशीय "समग्र प्रगती पत्रक (Holistic Progress Card)" पारंपरिक केवळ गुणांच्या प्रगती पुस्तकापेक्षा वेगळे कसे आहे?',
      opts: [
        'त्यात शिक्षक, विद्यार्थी स्वतःचे व समवयस्क मित्रांचे मूल्यमापन एकत्र करून बोधात्मक, भावात्मक व क्रियात्मक प्रगतीची नोंद असते',
        'त्यात केवळ वार्षिक टक्केवारी आणि पालकांचे उत्पन्न छापलेले असते',
        'त्यातून कला, सहकार्य आणि जिज्ञासा हे घटक वगळलेले असतात',
        'त्यात बालवाडीतील मुलांना केवळ लेखन वेगावरून क्रमांक दिले जातात',
      ],
      exp: 'समग्र प्रगती पत्रक (HPC) विद्यार्थ्याच्या सर्वांगीण विकासाचे ३६०-अंशीय चित्र स्वतःचे, मित्रांचे व शिक्षकांचे निरीक्षण जोडून सादर करते.',
    },
    hi: {
      q: 'NEP 2020 द्वारा अनुशंसित 360-डिग्री "समग्र प्रगति पत्र (Holistic Progress Card)" पारंपरिक केवल-अंक रिपोर्ट कार्ड से कैसे भिन्न है?',
      opts: [
        'यह शिक्षक, स्व-आकलन और सहपाठी प्रतिपुष्टि को मिलाकर संज्ञानात्मक, भावात्मक व क्रियात्मक विकास को दर्ज करता है',
        'यह केवल वार्षिक प्रतिशत छापता है',
        'यह कला, सहयोग और जिज्ञासा को छात्र प्रोफ़ाइल से हटा देता है',
        'यह छोटे बच्चों को केवल लिखने की गति से रैंक करता है',
      ],
      exp: 'समग्र प्रगति पत्र (HPC) स्व-मूल्यांकन, सहपाठी अवलोकन और शिक्षक टिप्पणियों के संगम से विद्यार्थी का बहुआयामी विकास दर्शाता है।',
    },
  },
  {
    topic: 'Balavatika – Preparatory Year Prior to Class 1',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In India’s 5+3+3+4 curricular architecture, "Balavatika" specifically strengthens school readiness for children aged 5–6 immediately before Class 1 through:',
      opts: [
        'Joyful play, storytelling, emergent oral-number games, fine-motor art, and social curiosity—free from formal textbook pressure',
        'Three-hour silent standardized bubbling-sheet exams',
        'Memorizing 50-line cursive essays in English',
        'Eliminating singing and puppet play altogether',
      ],
      exp: 'Balavatika bridges pre-primary play with Class 1 foundational literacy and numeracy via experiential, age-appropriate activities.',
    },
    mr: {
      q: 'भारताच्या ५+३+३+४ शैक्षणिक आराखड्यात, इयत्ता १ लीपूर्वी ५ ते ६ वयोगटातील मुलांसाठी असलेली "बालवाटिका" शाळेची पूर्वतयारी कशी साधते?',
      opts: [
        'औपचारिक पाठ्यपुस्तकांच्या ओझ्याशिवाय आनंददायी खेळ, गोष्टी, मौखिक-संख्या खेळ, सूक्ष्म स्नायू कला व सामाजिक जिज्ञासेतून',
        'तीन तासांच्या शांत मानकीकृत ओएमआर (OMR) परीक्षांमधून',
        '५० ओळींचे इंग्रजी निबंध पाठ करवून घेऊन',
        'गाणी व बाहुली खेळ पूर्णपणे बंद करून',
      ],
      exp: 'बालवाटिका (Balavatika) खेळ, संवाद, कला व गोष्टींद्वारे मुलांना कोणताही ताण न देता इयत्ता १ लीसाठी आनंदाने सज्ज करते.',
    },
    hi: {
      q: 'भारत की 5+3+3+4 संरचना में कक्षा 1 से ठीक पहले 5–6 वर्ष के बच्चों के लिए "बालवाटिका" विद्यालयी तत्परता किस माध्यम से पुष्ट करती है?',
      opts: [
        'औपचारिक पाठ्यपुस्तक दबाव से मुक्त आनंदमयी खेल, कहानी, मौखिक-संख्या खेल, हस्तकला और सामाजिक जिज्ञासा द्वारा',
        'तीन घंटे की मौन मानकीकृत ओएमआर परीक्षाओं द्वारा',
        'अंग्रेजी के 50 पंक्तियों के निबंध रटवाकर',
        'गीत और कठपुतली खेल पूरी तरह हटाकर',
      ],
      exp: 'बालवाटिका खेल, संवाद, कला और बुनियादी अनुभवों से बच्चों को बिना अकादमिक तनाव के कक्षा 1 के लिए सहज रूप से तैयार करती है।',
    },
  },
  {
    topic: 'NCF 2005 – Guiding Principles (Outward Connection)',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which core guiding maxim anchors the National Curriculum Framework (NCF) 2005 for primary textbooks and daily lessons?',
      opts: [
        'Connecting school knowledge to life outside the school and shifting learning away from rote methods',
        'Confining every classroom topic strictly inside textbook margins',
        'Treating marks in annual memory tests as the sole goal of childhood',
        'Standardizing identical silent lectures for all grades',
      ],
      exp: 'NCF 2005 explicitly champions linking classroom concepts with real community experience while enriching curriculum beyond textbooks.',
    },
    mr: {
      q: 'राष्ट्रीय अभ्यासक्रम आराखडा (NCF 2005) मधील प्राथमिक शिक्षणाचे मुख्य मार्गदर्शक तत्त्व कोणते?',
      opts: [
        'शाळेतील ज्ञान बाहेरील वास्तविक जीवनाशी जोडणे आणि घोकंपट्टीपासून शिक्षण मुक्त करणे',
        'प्रत्येक विषय केवळ पाठ्यपुस्तकाच्या चौकटीतच बंदिस्त ठेवणे',
        'वार्षिक स्मरणशक्ती परीक्षेतील गुण हेच बालपणाचे अंतिम ध्येय मानणे',
        'सर्व इयत्तांसाठी एकसारखी शांत व्याख्याने देणे',
      ],
      exp: 'NCF 2005 नुसार, शालेय ज्ञान विद्यार्थ्यांच्या दैनंदिन जीवनाशी जोडणे व अभ्यासक्रम पाठ्यपुस्तकापलीकडे समृद्ध करणे अत्यंत आवश्यक आहे.',
    },
    hi: {
      q: 'राष्ट्रीय पाठ्यचर्या रूपरेखा (NCF 2005) का कौन-सा प्रमुख मार्गदर्शक सिद्धांत प्राथमिक शिक्षा की आधारशिला है?',
      opts: [
        'स्कूली ज्ञान को स्कूल के बाहरी वास्तविक जीवन से जोड़ना और पढ़ाई को रटंत प्रणाली से मुक्त करना',
        'प्रत्येक विषय को केवल पाठ्यपुस्तक के हाशिये तक सीमित रखना',
        'वार्षिक रटंत परीक्षा के अंकों को बचपन का एकमात्र लक्ष्य मानना',
        'सभी कक्षाओं में एक जैसा मौन व्याख्यान देना',
      ],
      exp: 'NCF 2005 ज्ञान को बाहरी जीवन से जोड़ने, रटंत प्रणाली से मुक्ति और पाठ्यपुस्तक से परे समग्र पाठ्यक्रम के निर्माण पर बल देता है।',
    },
  },
  {
    topic: 'NIPUN Bharat – Foundational Numeracy Goal',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Under the NIPUN Bharat Mission, foundational numeracy by the end of Grade 3 emphasizes more than reciting "1 to 999"—what deeper capacity must learners demonstrate?',
      opts: [
        'Understanding place value, comparing quantities, performing meaningful simple operations, and applying measurement/shapes to everyday problems',
        'Memorizing 30-times multiplication tables in under 15 seconds blindly',
        'Solving secondary-level quadratic equations without understanding addition',
        'Drawing geometric compass proofs silently',
      ],
      exp: 'NIPUN Bharat stresses conceptual number sense, place value, and practical problem-solving rather than mechanical digit recitation.',
    },
    mr: {
      q: 'निपुण भारत अभियानांतर्गत इयत्ता ३ रीअखेर "मूलभूत संख्याज्ञान" म्हणजे केवळ १ ते ९९९ बोलणे नव्हे, तर विद्यार्थ्यांत कोणती सखोल क्षमता अपेक्षित आहे?',
      opts: [
        'स्थानिक किंमत समजणे, परिमाणांची तुलना करणे, अर्थपूर्ण सोप्या गणिती क्रिया व मापन-आकार दैनंदिन समस्यांत वापरणे',
        'डोळे झाकून १५ सेकंदांत ३० चा पाढा घोकून म्हणणे',
        'बेरीज न समजताच माध्यमिक स्तरावरील वर्गसमीकरणे सोडवणे',
        'शांतपणे भूमितीय प्रमेये लिहून काढणे',
      ],
      exp: 'निपुण भारत मोहीम यांत्रिक मोजणीऐवजी संख्यांची समज, स्थानिक किंमत आणि व्यावहारिक गणिती विचार विकसित करण्यावर भर देते.',
    },
    hi: {
      q: 'निपुण भारत मिशन के तहत कक्षा 3 के अंत तक "बुनियादी संख्या ज्ञान" केवल 1 से 999 बोलना नहीं है, बल्कि किस गहरी क्षमता पर बल दिया गया है?',
      opts: [
        'स्थानीय मान की समझ, मात्रा तुलना, सार्थक सरल संक्रियाएँ और मापन-आकृतियों का दैनिक जीवन में प्रयोग',
        '15 सेकंड में 30 का पहाड़ा अंधाधुंध सुना देना',
        'जोड़ समझे बिना माध्यमिक स्तर के द्विघात समीकरण हल करना',
        'मौन रूप से ज्यामितीय प्रमेय सिद्ध करना',
      ],
      exp: 'निपुण भारत यांत्रिक गिनती की बजाय संख्या-बोध, स्थानीय मान और दैनिक समस्या-समाधान आधारित संख्यात्मकता पर जोर देता है।',
    },
  },
  {
    topic: 'RTE Act 2009 – Pupil-Teacher Ratio (Primary)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Under the Schedule of the Right to Education (RTE) Act 2009 for Classes 1 to 5, how many teachers are mandated once admitted student strength sits between 61 and 90?',
      opts: [
        'Three regular teachers (scaling to 4 above 90, keeping primary PTR near 30:1)',
        'Only one single multi-grade teacher',
        'Ten specialist university professors',
        'Zero permanent teachers until enrolment reaches 300',
      ],
      exp: 'The RTE Schedule specifies: up to 60 -> 2 teachers; 61–90 -> 3; 91–120 -> 4; 121–200 -> 5 + Head Teacher.',
    },
    mr: {
      q: 'शिक्षण हक्क कायदा (RTE Act 2009) च्या परिशिष्टानुसार इयत्ता १ ली ते ५ वीसाठी प्रवेशित विद्यार्थी संख्या ६१ ते ९० दरम्यान असल्यास किमान किती शिक्षक आवश्यक आहेत?',
      opts: [
        'तीन नियमित शिक्षक (प्राथमिक स्तरावर सुमारे ३०:१ प्रमाण राखण्यासाठी)',
        'केवळ एकच बहुवर्ग शिक्षक',
        'दहा तज्ज्ञ विद्यापीठ प्राध्यापक',
        '३०० पटसंख्या होईपर्यंत शून्य कायम शिक्षक',
      ],
      exp: 'RTE परिशिष्टानुसार प्राथमिक स्तरावर ६० पर्यंत २ शिक्षक, ६१–९० साठी ३ शिक्षक, ९१–१२० साठी ४ शिक्षक व १२१–२०० साठी ५ शिक्षक + मुख्याध्यापक असावेत.',
    },
    hi: {
      q: 'शिक्षा का अधिकार अधिनियम (RTE Act 2009) की अनुसूची के अनुसार कक्षा 1 से 5 में छात्र संख्या 61 से 90 के बीच होने पर कम से कम कितने शिक्षक अनिवार्य हैं?',
      opts: [
        'तीन नियमित शिक्षक (प्राथमिक स्तर पर लगभग 30:1 अनुपात बनाए रखने हेतु)',
        'केवल एक ही बहुकक्षा शिक्षक',
        'दस विश्वविद्यालय प्राध्यापक',
        '300 नामांकन तक शून्य स्थायी शिक्षक',
      ],
      exp: 'RTE 2009 के अनुसार प्राथमिक स्तर पर 60 तक 2 शिक्षक, 61–90 पर 3, 91–120 पर 4 और 121–200 पर 5 शिक्षक व प्रधानाध्यापक अनिवार्य हैं।',
    },
  },
  {
    topic: 'RTE Act 2009 – Minimum Instructional Hours',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'According to the Schedule of the RTE Act 2009, what are the minimum working days and instructional hours mandated per academic year for Classes 1 to 5?',
      opts: [
        '200 working days and 800 instructional hours (rising to 220 days / 1,000 hours for Classes 6–8)',
        '90 working days and 300 instructional hours',
        '340 working days and 2,500 hours',
        '120 working days with no annual hour minimum',
      ],
      exp: 'RTE 2009 establishes 200 working days / 800 hours at Primary (1–5) and 220 days / 1,000 hours at Upper Primary (6–8), plus 45 teacher hours/week including preparation.',
    },
    mr: {
      q: 'शिक्षण हक्क कायदा (RTE 2009) नुसार इयत्ता १ ली ते ५ वीसाठी एका शैक्षणिक वर्षात किमान किती कामाचे दिवस व अध्यापनाचे तास निश्चित केले आहेत?',
      opts: [
        '२०० कामाचे दिवस व ८०० अध्यापन तास (उच्च प्राथमिक इ. ६–८ साठी २२० दिवस / १,००० तास)',
        '९० कामाचे दिवस व ३०० तास',
        '३४० कामाचे दिवस व २,५०० तास',
        'केवळ १२० दिवस, तासांची मर्यादा नाही',
      ],
      exp: 'RTE कायद्यानुसार प्राथमिक वर्गांसाठी वार्षिक २०० दिवस व ८०० तास आणि उच्च प्राथमिकसाठी २२० दिवस व १,००० अध्यापन तास बंधनकारक आहेत.',
    },
    hi: {
      q: 'RTE अधिनियम 2009 की अनुसूची के अनुसार कक्षा 1 से 5 के लिए प्रति शैक्षणिक वर्ष न्यूनतम कार्यदिवस और शिक्षण घंटे कितने निर्धारित हैं?',
      opts: [
        '200 कार्यदिवस तथा 800 शिक्षण घंटे (कक्षा 6–8 के लिए 220 दिन / 1,000 घंटे)',
        '90 कार्यदिवस तथा 300 शिक्षण घंटे',
        '340 कार्यदिवस तथा 2,500 घंटे',
        '120 दिन तथा घंटों की कोई सीमा नहीं',
      ],
      exp: 'RTE 2009 में प्राथमिक (1–5) हेतु न्यूनतम 200 कार्यदिवस / 800 घंटे तथा उच्च प्राथमिक (6–8) हेतु 220 दिन / 1,000 शिक्षण घंटे निर्धारित हैं।',
    },
  },
  {
    topic: 'Gender Stereotyping – Subtle Classroom Cues',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Notice a Class 4 teacher routinely asking boys to carry chairs and operate the science projector while assigning only girls to sweep chalk dust and arrange welcome bouquets. Even with polite tone, what hidden curriculum risk occurs?',
      opts: [
        'Subtle reinforcement of traditional gender-role division inside everyday school chores',
        'Equal skill empowerment across all students',
        'Objective STEM laboratory calibration',
        'Phonemic awareness remediation',
      ],
      exp: 'Rotating technical, leadership, physical, and caretaking responsibilities equally across genders dismantles unconscious stereotyping.',
    },
    mr: {
      q: 'इ. ४ थीचे शिक्षक सभ्य आवाजात पण नेहमी फक्त मुलांना खुर्च्या उचलायला व प्रोजेक्टर लावायला सांगतात, तर केवळ मुलींना खडूची पूड साफ करायला व पुष्पगुच्छ सजवायला सांगतात; यातून कोणता अप्रत्यक्ष धोका निर्माण होतो?',
      opts: [
        'दैनंदिन कामांतून पारंपरिक लिंगभाव-साचेबद्धतेचे (Gender stereotyping) सूक्ष्म दृढीकरण होणे',
        'सर्व विद्यार्थ्यांचे समान तांत्रिक सक्षमीकरण',
        'प्रयोगशाळेचे वस्तुनिष्ठ मूल्यमापन',
        'ध्वनिजाणीव उपचारात्मक शिक्षण',
      ],
      exp: 'तांत्रिक, शारीरिक व निगा राखण्याच्या सर्व जबाबदाऱ्या सर्व विद्यार्थ्यांत आलटून-पालटून वाटल्यानेच लिंगभाव समानतेचे संस्कार होतात.',
    },
    hi: {
      q: 'कक्षा 4 के शिक्षक विनम्र स्वर में पर हमेशा लड़कों से ही कुर्सियाँ उठाने व प्रोजेक्टर चलाने को कहते हैं और केवल लड़कियों को चॉक साफ करने व गुलदस्ते सजाने का काम देते हैं; इससे क्या छिपा जोखिम पैदा होता है?',
      opts: [
        'दैनिक कार्यों के माध्यम से पारंपरिक लैंगिक रूढ़िवादिता का सूक्ष्म सुदृढ़ीकरण',
        'सभी छात्रों का समान तकनीकी सशक्तिकरण',
        'विज्ञान प्रयोगशाला का वस्तुनिष्ठ मानकीकरण',
        'ध्वनि-बोध उपचारात्मक शिक्षण',
      ],
      exp: 'तकनीकी, नेतृत्व और देखभाल से जुड़े सभी कार्यों को बिना लैंगिक भेदभाव के बारी-बारी सबको सौंपने से ही वास्तविक समानता आती है।',
    },
  },
  {
    topic: 'Intrinsic vs Extrinsic Motivation (Overjustification)',
    pattern: 'Conceptual',
    difficulty: 'Difficult',
    en: {
      q: 'A Class 3 boy already loves sketching birds joyfully after homework. Suddenly a new adult rewards every single sketch with 5 rupees, then stops paying two weeks later—and the boy abruptly quits drawing too! Social psychology terms this:',
      opts: [
        'Overjustification Effect — extrinsic rewards can undermine pre-existing intrinsic enjoyment once removed',
        'Spontaneous neural creativity burst',
        'Positive transfer of drawing motor schema',
        'Scaffolding inside the Zone of Proximal Development',
      ],
      exp: 'When external payoffs shift a child’s attribution from "I love drawing" to "I draw for coins," stopping payment often dampens original interest.',
    },
    mr: {
      q: 'इ. ३ रीतील मुलगा आनंदाने स्वतःहून पक्ष्यांची चित्रे काढायचा; अचानक प्रत्येक चित्रामागे ५ रुपये बक्षीस देणे सुरू करून दोन आठवड्यांनी ते बंद केल्यावर मुलाने चित्र काढणेच सोडून दिले! याला मानसशास्त्रात काय म्हणतात?',
      opts: [
        'अति-समर्थन परिणाम (Overjustification Effect) — अनावश्यक बाह्य बक्षिसामुळे मूळ आंतरिक आवड कमी होणे',
        'उत्स्फूर्त सर्जनशीलतेचा विस्फोट',
        'चित्रकला कौशल्याचे सकारात्मक संक्रमण',
        'समीपस्थ विकास क्षेत्रातील आधार (Scaffolding)',
      ],
      exp: 'ज्या कृतीत मुलाला आधीच आंतरिक आनंद आहे, तिथे अनावश्यक रोख बक्षीस लावल्यास कामाचा हेतू बक्षिसापुरता मर्यादित होऊन नंतर मूळ रस कमी होतो.',
    },
    hi: {
      q: 'कक्षा 3 का बालक अपने आनंद से पक्षियों के चित्र बनाता था; अचानक हर चित्र पर 5 रुपये पुरस्कार देकर दो सप्ताह बाद बंद करने पर उसने चित्र बनाना ही छोड़ दिया! इसे मनोविज्ञान में क्या कहते हैं?',
      opts: [
        'अति-औचित्य प्रभाव (Overjustification Effect) — अनावश्यक बाह्य पुरस्कार से पहले से मौजूद आंतरिक रुचि का घट जाना',
        'सहज सृजनात्मकता का विस्फोट',
        'चित्रकला कौशल का सकारात्मक अंतरण',
        'समीपस्थ विकास क्षेत्र में पाड़ (Scaffolding)',
      ],
      exp: 'जहाँ बच्चा पहले से आंतरिक आनंद से काम कर रहा हो, वहाँ अनावश्यक बाह्य पुरस्कार जोड़ने से लक्ष्य बदल जाता है और पुरस्कार रुकते ही रुचि घट सकती है।',
    },
  },
  {
    topic: 'Growth Mindset Praise – Process vs Person',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Which teacher comment after a tough Class 4 geometry puzzle fosters Carol Dweck’s "Growth Mindset" most sustainably?',
      opts: [
        '"Testing three folds before cutting saved your symmetry—nice strategic persistence!"',
        '"You are just naturally born a genius, never make a mistake!"',
        '"Some brains simply are not built for shapes."',
        '"Finish faster than everyone else or lose your stars!"',
      ],
      exp: 'Praising controllable effort, strategy choices, and mistake-learning keeps students resilient when tasks inevitably grow harder.',
    },
    mr: {
      q: 'इ. ४ थीचे अवघड भूमिती कोडे सुटल्यानंतर शिक्षकांचे कोणते कौतुक कॅरोल ड्वेक यांच्या "विकासाभिमुख मानसिकतेला (Growth Mindset)" सर्वाधिक बळ देते?',
      opts: [
        '"कापण्यापूर्वी कागदाच्या तीन घड्या तपासून पाहिल्यामुळे तुमची सममिती अचूक आली—छान धोरणात्मक प्रयत्न!"',
        '"तू जन्मापासूनच जीनियस आहेस, कधीच चूक करू नकोस!"',
        '"काही जणांचा मेंदू आकारांसाठी बनलेलाच नसतो."',
        '"इतरांपेक्षा आधी पूर्ण कर नाहीतर तारे कापले जातील!"',
      ],
      exp: 'जन्मजात हुशारीऐवजी विद्यार्थ्याची योग्य कार्यपद्धती, चिकाटी आणि प्रयत्नांचे कौतुक केल्यास कठीण आव्हानांतही आत्मविश्वास टिकून राहतो.',
    },
    hi: {
      q: 'कक्षा 4 की कठिन ज्यामिति पहेली हल होने पर शिक्षक की कौन-सी टिप्पणी कैरोल ड्वेक की "संवृद्धि मानसिकता (Growth Mindset)" को सर्वाधिक पोषित करती है?',
      opts: [
        '"काटने से पहले तीन मोड़ परखने की तुम्हारी रणनीति से सममिति सटीक बैठी—बढ़िया धैर्य और प्रयास!"',
        '"तुम जन्म से ही जीनियस हो, कभी गलती मत करना!"',
        '"कुछ बच्चों का दिमाग आकृतियों के लिए बना ही नहीं होता।"',
        '"सबसे पहले खत्म करो वरना तुम्हारे सितारे कट जाएँगे!"',
      ],
      exp: 'जन्मजात प्रतिभा की बजाय रणनीति, प्रयास और सीखने की प्रक्रिया की सराहना करने से कठिन चुनौतियों में भी जुझारूपन बना रहता है।',
    },
  },
  {
    topic: 'Cognitive Load – Split-Attention Avoidance',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'When designing a science diagram of a bean seed for Class 4, placing crisp short labels RIGHT NEXT to each part with clean pointer arrows—instead of putting 1–8 codes at the bottom corner—works better because it reduces:',
      opts: [
        'Extraneous Split-Attention Cognitive Load spent hunting back and forth',
        'Natural curiosity about plant germination',
        'Visual color perception in cones',
        'Fine-motor wrist strength',
      ],
      exp: 'Integrated labels eliminate unnecessary eye-scanning split attention, freeing limited Working Memory for understanding seed structure.',
    },
    mr: {
      q: 'इ. ४ थीसाठी वाल/घेवड्याच्या बियाची आकृती तयार करताना १–८ क्रमांकांची यादी कोपऱ्यात देण्याऐवजी प्रत्येक भागाजवळच बाणाने सुटसुटीत नाव लिहिणे अधिक प्रभावी का ठरते?',
      opts: [
        'नजर इकडे-तिकडे फिरवण्यात वाया जाणारा अनावश्यक संज्ञानात्मक भार (Split-Attention Load) कमी होतो',
        'बियांच्या उगवणीची नैसर्गिक जिज्ञासा कमी होते',
        'डोळ्यांची रंग ओळखण्याची क्षमता घटते',
        'मनगटाच्या स्नायूंची ताकद कमी होते',
      ],
      exp: 'संबंधित नावे थेट आकृतीजवळ जोडल्यास कार्यरत स्मृतीवरील अनावश्यक ताण वाचतो व संकल्पना चटकन लक्षात राहते.',
    },
    hi: {
      q: 'कक्षा 4 के लिए सेम के बीज का चित्र बनाते समय कोने में 1–8 की अलग सूची देने के बजाय प्रत्येक भाग के ठीक पास तीर से संक्षिप्त नाम लिखना क्यों अधिक प्रभावी होता है?',
      opts: [
        'आँखें बार-बार घुमाने में लगने वाला अनावश्यक विभाजित-ध्यान संज्ञानात्मक भार (Split-Attention Load) घटता है',
        'पौधों के अंकुरण की स्वाभाविक जिज्ञासा कम होती है',
        'आँखों का रंग-बोध कमजोर होता है',
        'कलाई की सूक्ष्म-पेशीय शक्ति घटती है',
      ],
      exp: 'चित्र के ठीक पास लेबल लगाने से ध्यान बँटने (Split-Attention) में लगने वाली कार्यशील स्मृति बचती है और अवधारणा स्पष्ट समझ आती है।',
    },
  },
  {
    topic: 'Dual Coding Theory – Verbal + Visual',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Pairing concise spoken/written descriptions of the water cycle with a clean student-drawn cloud-rain-river sketch boosts recall far better than text alone. Allan Paivio calls this:',
      opts: [
        'Dual Coding Theory — encoding information across both verbal and visual memory channels',
        'Retroactive interference across subjects',
        'Motor reflex decay',
        'Strict auditory isolation',
      ],
      exp: 'Dual Coding creates two complementary mental pathways (verbal + imagery), making retrieval much more durable and interconnected.',
    },
    mr: {
      q: 'जलचक्राचे संक्षिप्त शाब्दिक वर्णन आणि विद्यार्थ्यांनी काढलेले ढग-पाऊस-नदीचे स्वच्छ रेखाचित्र एकत्र जोडल्यास केवळ मजकुरापेक्षा अधिक काळ लक्षात राहते; अ‍ॅलन पैव्हिओ याला काय म्हणतो?',
      opts: [
        'द्वि-सांकेतिकरण सिद्धांत (Dual Coding Theory) — शाब्दिक व दृक् अशा दोन्ही माध्यमांतून स्मृतीत साठवण',
        'विषयांमधील पूर्वगामी अडथळा',
        'स्नायू प्रतिक्षेपाचा ऱ्हास',
        'कठोर श्रवण विलगीकरण',
      ],
      exp: 'द्वि-सांकेतिकरण (Dual Coding) सिद्धांतानुसार, शब्द आणि दृश्य प्रतिमा एकत्र वापरल्यास मेंदूत दुहेरी स्मृती मार्ग तयार होतात.',
    },
    hi: {
      q: 'जल-चक्र के संक्षिप्त विवरण के साथ छात्रों द्वारा बनाया गया बादल-वर्षा-नदी का स्पष्ट रेखाचित्र जोड़ने से केवल पाठ की अपेक्षा कहीं बेहतर स्मरण रहता है; एलन पाविओ इसे क्या कहते हैं?',
      opts: [
        'द्वि-कोडिंग सिद्धांत (Dual Coding Theory) — शाब्दिक व दृश्य दोनों स्मृति माध्यमों से सूचना संचयन',
        'विषयों के बीच पश्चगामी अवरोध',
        'पेशीय प्रतिवर्त क्षरण',
        'कठोर श्रवण अलगाव',
      ],
      exp: 'द्वि-कोडिंग सिद्धांत (Dual Coding) के अनुसार, शाब्दिक और दृश्य संकेतों को साथ प्रस्तुत करने से मस्तिष्क में दोहरे स्मृति मार्ग बनते हैं।',
    },
  },
  {
    topic: 'Transfer of Learning – Negative Interference Guard',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Having just mastered comparing positive integers (e.g., 8 > 3), some upper-primary pupils mistakenly write "1/8 > 1/3" or "-8 > -3". Which pedagogical phenomenon explains this error?',
      opts: [
        'Negative Transfer — over-applying an earlier rule indiscriminately into a new mathematical system',
        'Positive creative synthesis',
        'Severe dysgraphia in wrist posture',
        'Complete memory erasure',
      ],
      exp: 'Proactively contrasting whole-number rules against unit fractions and negatives prevents Negative Transfer interference.',
    },
    mr: {
      q: 'धन पूर्णांकांची तुलना (उदा. ८ > ३) शिकल्यानंतर काही विद्यार्थी चुकीने "१/८ > १/३" किंवा "-८ > -३" असे लिहितात; ही चूक कोणत्या शैक्षणिक घटनेमुळे होते?',
      opts: [
        'नकारात्मक संक्रमण (Negative Transfer) — जुना नियम नवीन गणिती संदर्भात तसाच चुकीने लागू करणे',
        'सकारात्मक सर्जनशील संश्लेषण',
        'मनगटाच्या लेखनातील गंभीर दोष',
        'स्मृतीचा पूर्ण लोप',
      ],
      exp: 'एका परिस्थितीत शिकलेला नियम भिन्न वैशिष्ट्ये असलेल्या नवीन क्षेत्रात चुकीने वापरल्यास नकारात्मक संक्रमण (Negative Transfer) घडून येते.',
    },
    hi: {
      q: 'धन पूर्णांकों की तुलना (जैसे 8 > 3) सीखने के बाद कुछ छात्र गलती से "1/8 > 1/3" या "-8 > -3" लिख देते हैं; यह त्रुटि किस अधिगम घटना से होती है?',
      opts: [
        'नकारात्मक अंतरण (Negative Transfer) — पुराने नियम को बिना अंतर समझे नई गणितीय प्रणाली पर लागू करना',
        'सकारात्मक सृजनात्मक संश्लेषण',
        'कलाई मुद्रा में गंभीर लेखन विकार',
        'पूर्ण स्मृति लोप',
      ],
      exp: 'जब किसी एक संदर्भ का नियम उससे भिन्न नए नियम-क्षेत्र में बाधक बन जाए, तो इसे अधिगम का नकारात्मक अंतरण (Negative Transfer) कहते हैं।',
    },
  },
  {
    topic: 'Active Retrieval Practice vs Passive Rereading',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Before closing the notebook after reading a history lesson, asking pairs to shut their books and jot 3 key causes from memory, then check gaps immediately—beats silently rereading the page 4 times because it harnesses:',
      opts: [
        'Retrieval Practice ("Testing Effect") strengthening memory recall pathways directly',
        'Visual illusion of passive familiarity without recall effort',
        'Punitive examination anxiety',
        'Motor fatigue in finger joints',
      ],
      exp: 'Actively pulling knowledge from memory—and promptly checking accuracy—cements retention far more powerfully than passive highlighting or rereading.',
    },
    mr: {
      q: 'इतिहासाचा पाठ वाचल्यानंतर तो ४ वेळा शांतपणे पुन्हा वाचण्यापेक्षा, पुस्तक बंद करून आठवणारे ३ प्रमुख मुद्दे लिहून काढणे व लगेच तपासून पाहणे अधिक प्रभावी का ठरते?',
      opts: [
        'प्रत्याह्वान सराव (Retrieval Practice) — मेंदूतून माहिती आठवून काढण्याच्या प्रक्रियेमुळे स्मृती मार्ग मजबूत होतात',
        'कोणत्याही प्रयत्नांशिवाय ओळखीचा आभास होतो',
        'दंडात्मक परीक्षेची भीती निर्माण होते',
        'बोटांच्या सांध्यांना थकवा येतो',
      ],
      exp: 'निष्क्रियपणे पुन्हा पुन्हा वाचण्यापेक्षा वाचलेले बंद पुस्तकाने आठवून लिहिणे (Retrieval Practice) दीर्घकालीन स्मरणासाठी सर्वाधिक प्रभावी ठरते.',
    },
    hi: {
      q: 'इतिहास का पाठ पढ़ने के बाद उसे 4 बार चुपचाप दोबारा पढ़ने की तुलना में, किताब बंद कर याद आए 3 मुख्य बिंदु लिखना और तुरंत मिलान करना क्यों अधिक प्रभावी है?',
      opts: [
        'प्रत्यास्मरण अभ्यास (Retrieval Practice) — स्मृति से जानकारी खींचकर लाने से दीर्घकालिक स्मृति पथ मजबूत होते हैं',
        'बिना प्रयास के परिचित होने का केवल भ्रम पैदा होता है',
        'दंडात्मक परीक्षा चिंता बढ़ती है',
        'उँगलियों के जोड़ों में थकान आती है',
      ],
      exp: 'निष्क्रिय पुनरावलोकन से कहीं बेहतर है किताब बंद कर सक्रिय प्रत्यास्मरण (Retrieval Practice) करना, जिससे स्मृति सुदृढ़ होती है।',
    },
  },
  {
    topic: 'Conflict Resolution – Peer Restorative Circle',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'After two Class 5 groups clash over who damaged a shared clay fort model, instead of shouting or cancelling recess for the whole class, the teacher facilitates calm "I felt... / Next time I need... / How can we repair?" dialogue. This embodies:',
      opts: [
        'Restorative Conflict Resolution — building empathy, accountability, and repair rather than collective punishment',
        'Authoritarian collective guilt imposition',
        'Ignoring property care completely',
        'Zero-tolerance suspension for 10-year-olds',
      ],
      exp: 'Restorative practice guides children to hear impact on others and co-create practical repair, cultivating lifelong civic maturity.',
    },
    mr: {
      q: 'इ. ५ वीच्या दोन गटांत मातीचा किल्ला मोडण्यावरून वाद झाल्यावर संपूर्ण वर्गाची सुट्टी रद्द न करता शिक्षक शांतपणे "मला काय वाटले... / पुढे आपण हे कसे दुरुस्त करू?" असा संवाद घडवतात; हा कोणता दृष्टिकोन आहे?',
      opts: [
        'पुनर्संचयक संघर्ष निवारण (Restorative Practice) — सामूहिक शिक्षेऐवजी संवेदनशील संवाद, जबाबदारी व दुरुस्तीची भावना घडवणे',
        'संपूर्ण वर्गावर हुकूमशाही सामूहिक शिक्षा लादणे',
        'साहित्याच्या काळजीकडे पूर्ण दुर्लक्ष करणे',
        '१० वर्षांच्या मुलांना थेट निलंबित करणे',
      ],
      exp: 'पुनर्संचयक संवादामुळे (Restorative dialogue) मुलांना इतरांच्या भावनांची जाणीव होते व चुकीची भरपाई करण्याची जबाबदार सवय लागते.',
    },
    hi: {
      q: 'कक्षा 5 के दो समूहों में मिट्टी के किले का मॉडल टूटने पर विवाद होने पर, पूरी कक्षा का मध्यांतर रद्द करने के बजाय शिक्षक शांत "मुझे कैसा लगा... / हम इसे कैसे सुधारें?" संवाद कराते हैं; यह पद्धति है:',
      opts: [
        'पुनर्स्थापनात्मक संघर्ष समाधान (Restorative Practice) — सामूहिक दंड के बजाय सहानुभूति, जिम्मेदारी और सुधार पर बल',
        'पूरी कक्षा पर सत्तावादी सामूहिक दंड',
        'सामान की देखभाल की पूर्ण अनदेखी',
        '10 वर्षीय बच्चों का सीधा निलंबन',
      ],
      exp: 'पुनर्स्थापनात्मक (Restorative) संवाद बच्चों में दूसरे का पक्ष सुनने, अपनी जिम्मेदारी स्वीकारने और रचनात्मक सुधार करने का कौशल विकसित करता है।',
    },
  },
  {
    topic: 'Trauma-Informed Sensitivity in School',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Following severe village crop flooding, a usually cheerful Class 4 student arrives withdrawn, startles easily at loud sounds, and forgets simple instructions. A trauma-sensitive educator prioritizes:',
      opts: [
        'Emotional safety, calm predictable routines, gentle one-to-one check-ins, and flexible low-pressure deadlines',
        'Publicly scolding the child for "sudden laziness after floods"',
        'Doubling detention homework until alertness returns',
        'Forcing detailed public speeches describing family losses on stage',
      ],
      exp: 'Acute distress hijacks executive attention; warmth, predictability, and non-intrusive support help nervous systems regain learning readiness.',
    },
    mr: {
      q: 'गावात अतिवृष्टीने पिकांचे नुकसान झाल्यानंतर नेहमी हसणारा इ. ४ थीतील मुलगा अचानक शांत, घाबरलेला राहतो व सोप्या सूचनाही विसरतो; अशा वेळी संवेदनशील शिक्षक कशाला प्राधान्य देतील?',
      opts: [
        'भावनिक सुरक्षितता, शांत व नियमित दिनचर्या, आपुलकीचा वैयक्तिक संवाद आणि तणावमुक्त लवचिक अपेक्षा ठेवण्याला',
        '"पुरानंतर अचानक आळशी झालास" असे वर्गासमोर ओरडण्याला',
        'जागरूकता येईपर्यंत दुप्पट गृहपाठाची शिक्षा देण्याला',
        'व्यासपीठावर सर्वांसमोर घरचे नुकसान सांगण्याची सक्ती करण्याला',
      ],
      exp: 'आघातानंतर कार्यकारी लक्ष तात्पुरते कमी होते; सुरक्षित, प्रेमळ व स्थिर शालेय वातावरण मुलांना पुन्हा शिक्षणात स्थिरावण्यास मदत करते.',
    },
    hi: {
      q: 'गाँव में बाढ़ से फसल क्षति के बाद आमतौर पर खुश रहने वाला कक्षा 4 का छात्र अचानक गुमसुम, डरा हुआ रहता है और सरल निर्देश भूल जाता है; संवेदनशील शिक्षक किसे प्राथमिकता देंगे?',
      opts: [
        'भावनात्मक सुरक्षा, शांत पूर्वानुमेय दिनचर्या, आत्मीय व्यक्तिगत संवाद और बिना दबाव की लचीली अपेक्षाओं को',
        'कक्षा के सामने "बाढ़ के बाद अचानक आलसी हो जाने" पर डाँटने को',
        'दोगुना गृहकार्य दंड देने को',
        'मंच पर सबके सामने पारिवारिक क्षति सुनाने के लिए मजबूर करने को',
      ],
      exp: 'आघात-संवेदनशील शिक्षण (Trauma-informed approach) भावनात्मक सुरक्षा, स्थिर दिनचर्या और करुणामय लचीलेपन से बच्चे को पुनः संतुलन पाने में मदद करता है।',
    },
  },
  {
    topic: 'Parent-Teacher Partnership – Assets Lens',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'During Parent-Teacher Meetings with non-literate artisan or farming families, which practice honors parents as genuine partners in their child’s primary education?',
      opts: [
        'Communicating verbally in home language, valuing everyday family storytelling/counting at home, and sharing concrete work samples warmly',
        'Handing over dense English-only red-ink fault reports silently',
        'Lecturing parents that working families cannot raise capable students',
        'Comparing their child unfavorably with the class topper in public',
      ],
      exp: 'Every household holds rich oral, ethical, and practical funds of knowledge; respectful home-language dialogue fosters trust and attendance.',
    },
    mr: {
      q: 'औपचारिक शिक्षण नसलेल्या कारागीर किंवा शेतकरी पालकांसोबत पालक-शिक्षक सभेमध्ये त्यांना मुलांच्या शिक्षणात खरे भागीदार मानणारी कृती कोणती?',
      opts: [
        'घरच्या भाषेत आत्मीय संवाद साधणे, घरातील गोष्टी सांगणे व हिशेब या ज्ञानाचा गौरव करणे आणि मुलांचे प्रत्यक्ष काम दाखवणे',
        'न बोलता केवळ लाल शाईने भरलेला इंग्रजी त्रुटी अहवाल हातात ठेवणे',
        'कष्टकरी कुटुंबे हुशार मुले घडवू शकत नाहीत असे सुनावणे',
        'इतरांसमोर पहिल्या क्रमांकाच्या मुलाशी अपमानास्पद तुलना करणे',
      ],
      exp: 'पालकांशी त्यांच्याच भाषेत सन्मानाने संवाद साधून कौटुंबिक अनुभवांचा आदर केल्यास शाळा व कुटुंब यांत भक्कम विश्वास निर्माण होतो.',
    },
    hi: {
      q: 'कम औपचारिक शिक्षा प्राप्त कारीगर या किसान अभिभावकों के साथ अभिभावक-शिक्षक बैठक (PTM) में उन्हें सच्चा शैक्षिक साझेदार मानने वाला व्यवहार कौन-सा है?',
      opts: [
        'घर की भाषा में आत्मीय संवाद करना, परिवार की कहानियों व व्यावहारिक गणना-ज्ञान का सम्मान करना और बच्चे के वास्तविक कार्य दिखाना',
        'चुपचाप लाल स्याही से भरा कठिन अंग्रेजी शिकायत पत्र थमा देना',
        'यह उपदेश देना कि मेहनतकश परिवार मेधावी बच्चे नहीं पढ़ा सकते',
        'सबके सामने कक्षा के टॉपर से अपमानजनक तुलना करना',
      ],
      exp: 'अभिभावकों की भाषा व पारिवारिक अनुभवों का सम्मान करने और बच्चे की ठोस प्रगति साझा करने से घर-विद्यालय का विश्वास गहरा होता है।',
    },
  },
  {
    topic: 'Multigrade Classroom Management',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'In a single-room rural school where one teacher guides Classes 2 and 3 simultaneously, which structured planning strategy keeps BOTH grades meaningfully engaged?',
      opts: [
        'Alternating direct guided instruction with one grade while the other runs self-directed tactile learning stations, plus shared thematic stories/art',
        'Leaving Class 2 completely idle with silent heads-down for three hours daily',
        'Teaching only Class 8 algebra so neither primary grade follows',
        'Allowing zero peer cooperation across benches',
      ],
      exp: 'Staggered direct-teach + self-learning corner cycles alongside common multi-level themes maximize active time on task in multigrade settings.',
    },
    mr: {
      q: 'ज्या ग्रामीण शाळेत एकाच वर्गात इ. २ री आणि इ. ३ री एकाच वेळी एका शिक्षकाने शिकवाव्या लागतात (बहुवर्ग अध्यापन), तिथे दोन्ही वर्गांना सतत गुंतवून ठेवण्याची उत्तम योजना कोणती?',
      opts: [
        'एका इयत्तेला प्रत्यक्ष मार्गदर्शन करताना दुसऱ्या इयत्तेसाठी स्वयं-अध्ययन कार्ड कोपरा ठेवणे व चित्रकला/गोष्टींसारखे समान विषय एकत्र घेणे',
        'रोज तीन तास इ. २ रीला बाकावर डोके ठेवून शांत बसवणे',
        'दोघांनाही न कळणारे इ. ८ वीचे बीजगणित शिकवणे',
        'मित्रांमधील कोणतेही सहकार्य पूर्णपणे बंद करणे',
      ],
      exp: 'बहुवर्ग अध्यापनात प्रत्यक्ष अध्यापन व स्वयं-अध्ययन साधनांची आलटून-पालटून जोड आणि समान स्तरीय उपक्रम अत्यंत प्रभावी ठरतात.',
    },
    hi: {
      q: 'एक ही कक्ष में जब एक शिक्षक को कक्षा 2 और 3 दोनों को साथ (बहुकक्षा शिक्षण) पढ़ाना हो, तो दोनों वर्गों को सार्थक रूप से सक्रिय रखने की श्रेष्ठ रणनीति कौन-सी है?',
      opts: [
        'एक कक्षा को प्रत्यक्ष मार्गदर्शन देते समय दूसरी के लिए स्व-अध्ययन गतिविधि कोना चलाना, तथा कहानी-कला जैसे साझा विषयों को साथ जोड़ना',
        'कक्षा 2 को रोज़ तीन घंटे डेस्क पर सिर रखकर खाली बिठाना',
        'कक्षा 8 का बीजगणित पढ़ाना ताकि कोई न समझ पाए',
        'सहपाठियों के बीच किसी भी सहयोग पर रोक लगाना',
      ],
      exp: 'बहुकक्षा शिक्षण में बारी-बारी प्रत्यक्ष शिक्षण व स्व-अध्ययन कार्य-केंद्र तथा साझा विषयगत गतिविधियाँ दोनों कक्षाओं का समय सार्थक बनाती हैं।',
    },
  },
  {
    topic: 'Digital Literacy Safety – Primary Level',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'When introducing Class 5 students to educational videos or tablet quizzes in the school ICT lab, what foundational digital citizenship habit should be cultivated alongside mouse skills?',
      opts: [
        'Critical verification ("Who created this? Is it fact or ad?"), privacy protection (never share home address/passwords), and balanced screen habits',
        'Clicking every flashing pop-up prize banner immediately',
        'Sharing family phone numbers in public comment threads',
        'Trusting every forwarded rumor blindly as science',
      ],
      exp: 'Early digital literacy integrates critical source-checking, personal privacy safety, and healthy screen balance.',
    },
    mr: {
      q: 'शाळेच्या संगणक प्रयोगशाळेत इ. ५ वीच्या मुलांना शैक्षणिक व्हिडिओ व टॅब्लेट प्रश्नमंजुषा वापरताना माउस कौशल्यासोबत कोणती डिजिटल नागरिकत्वाची सवय लावली पाहिजे?',
      opts: [
        'माहितीची पडताळणी करणे ("हे कोणी बनवले? सत्य की जाहिरात?"), गोपनीयता जपणे (घरचा पत्ता/पासवर्ड न देणे) व स्क्रीन वेळेचा समतोल राखणे',
        'प्रत्येक चमकणाऱ्या बक्षिसाच्या पॉप-अपवर लगेच क्लिक करणे',
        'सार्वजनिक टिप्पण्यांमध्ये घरचा फोन नंबर लिहिणे',
        'प्रत्येक फॉरवर्ड केलेल्या अफवेवर विज्ञान म्हणून विश्वास ठेवणे',
      ],
      exp: 'प्राथमिक डिजिटल साक्षरतेत तांत्रिक कौशल्यासोबतच सुरक्षितता, गोपनीयता व माहितीची सत्यता तपासण्याचे भान देणे आवश्यक असते.',
    },
    hi: {
      q: 'स्कूल की ICT लैब में कक्षा 5 के छात्रों को शैक्षिक वीडियो व टैबलेट प्रश्नोत्तरी सिखाते समय माउस कौशल के साथ कौन-सी डिजिटल नागरिकता आदत विकसित करनी चाहिए?',
      opts: [
        'तथ्य-सत्यापन ("स्रोत कौन है? तथ्य या विज्ञापन?"), निजता सुरक्षा (पता/पासवर्ड साझा न करना) और संतुलित स्क्रीन समय',
        'हर चमकते इनामी पॉप-अप पर तुरंत क्लिक करना',
        'सार्वजनिक कमेंट में परिवार का फ़ोन नंबर लिखना',
        'हर फॉरवर्ड की गई अफवाह को आँख मूँदकर विज्ञान मान लेना',
      ],
      exp: 'प्रारंभिक डिजिटल साक्षरता में उपकरण चलाने के साथ-साथ स्रोत की जाँच, व्यक्तिगत निजता की सुरक्षा और संतुलित उपयोग शामिल होना चाहिए।',
    },
  },
  {
    topic: 'Creative Problem-Solving – Divergent Fluency vs Originality',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Asking Class 4 pupils, "List as many creative ways as possible to reuse an empty plastic bottle in our school garden," evaluates Torrance/Guilford divergent thinking indicators across:',
      opts: [
        'Fluency (number of ideas), Flexibility (varied categories like planter/dripper/bird-feeder), and Originality (unusual clever uses)',
        'Single fixed textbook recall accuracy',
        'Uniformity of cursive handwriting slant',
        'Speed of erasing chalkboards',
      ],
      exp: 'Divergent creativity combines quantity (fluency), category breadth (flexibility), uniqueness (originality), and practical detail (elaboration).',
    },
    mr: {
      q: 'इ. ४ थीच्या मुलांना विचारले, "शाळेच्या बागेत रिकाम्या प्लॅस्टिकच्या बाटलीचे जास्तीत जास्त वेगवेगळे पुनर्वापर सुचवा"; हा प्रश्न टॉरेन्स/गिलफोर्डच्या अपसारी विचाराचे कोणते घटक तपासतो?',
      opts: [
        'प्रवाहीता (विचारांची संख्या), लवचिकता (विविध प्रकार — कुंडी/ठिबक/पक्षी पात्र) आणि मौलिकता (अनोख्या कल्पना)',
        'पाठ्यपुस्तकातील एकाच ठरलेल्या उत्तराची अचूकता',
        'सुलेखनातील अक्षरांचा समान कल',
        'फळा पुसण्याचा वेग',
      ],
      exp: 'अपसारी सर्जनशील विचारामध्ये विचारांची संख्या (Fluency), विविध क्षेत्रांतील वैविध्य (Flexibility) आणि नावीन्य (Originality) तपासले जाते.',
    },
    hi: {
      q: 'कक्षा 4 के छात्रों से पूछना, "स्कूल बगीचे में खाली प्लास्टिक बोतल के जितने अधिक संभव हों उतने उपयोगी पुनरुपयोग बताइए"; यह टॉरेंस/गिलफोर्ड के अपसारी चिंतन के किन आयामों को जाँचता है?',
      opts: [
        'प्रवाह (विचारों की संख्या), लचीलापन (विविध श्रेणियाँ—गमला/ड्रिप सिंचाई/पक्षी दानापात्र) और मौलिकता (अनूठे विचार)',
        'पाठ्यपुस्तक के एक निश्चित उत्तर का सटीक रटंत',
        'सुलेख में अक्षरों के झुकाव की एकरूपता',
        'श्यामपट्ट मिटाने की गति',
      ],
      exp: 'अपसारी सृजनात्मक चिंतन में विचारों की संख्या (प्रवाह), विविधता (लचीलापन) और नवीनता (मौलिकता) का मूल्यांकन किया जाता है।',
    },
  },
  {
    topic: 'Memory Encoding – Chunking Strategy',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Remembering a 10-digit school helpline number effortlessly as "1800 – 233 – 4567" instead of ten stray digits succeeds because grouping reduces Working Memory bottlenecks through:',
      opts: [
        'Chunking — bundling smaller separate items into meaningful compact units',
        'Sensory decay of auditory nerves',
        'Classical fear conditioning',
        'Massed sleep-deprived cramming',
      ],
      exp: 'George Miller showed Working Memory holds ~4–7 meaningful units; Chunking organizes discrete symbols into manageable bundles.',
    },
    mr: {
      q: '१० अंकी शालेय मदत क्रमांक सुट्या दहा अंकांऐवजी "१८०० - २३३ - ४५६७" असा तीन गटांत लक्षात ठेवल्यास सहज आठवतो; कार्यरत स्मृतीतील ताण कमी करणाऱ्या या तंत्राला काय म्हणतात?',
      opts: [
        'गटीकरण / चंकिंग (Chunking) — सुट्या घटकांचे अर्थपूर्ण लहान गटांत रूपांतर करणे',
        'श्रवण नसांचा संवेदी ऱ्हास',
        'भीतीवर आधारित अभिजात अभिसंधान',
        'झोप टाळून केलेली घोकंपट्टी',
      ],
      exp: 'जॉर्ज मिलरच्या मते कार्यरत स्मृती मर्यादित घटकांची असते; मोठ्या माहितीचे अर्थपूर्ण गट (Chunking) केल्यास ती सहज लक्षात राहते.',
    },
    hi: {
      q: '10 अंकों का स्कूल हेल्पलाइन नंबर अलग-अलग अंकों की बजाय "1800 - 233 - 4567" के रूप में आसानी से याद रह जाता है; कार्यशील स्मृति की सीमा सँभालने की यह तकनीक है:',
      opts: [
        'चंकिंग / समूहीकरण (Chunking) — बिखरी इकाइयों को सार्थक छोटे समूहों में बाँधना',
        'श्रवण तंत्रिका का संवेदी क्षय',
        'शास्त्रीय भय अनुबंधन',
        'नींद त्यागकर लगातार रटना',
      ],
      exp: 'जॉर्ज मिलर के अनुसार कार्यशील स्मृति सीमित इकाइयाँ रखती है; सूचना को सार्थक खंडों (Chunking) में बाँटने से धारण क्षमता बढ़ जाती है।',
    },
  },
  {
    topic: 'Storytelling as Pedagogical Bridge',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Opening a Class 3 lesson on "Honest Measurement" with a vivid folktale about a potter’s balanced scales before measuring classroom jars works powerfully because stories:',
      opts: [
        'Activate emotion, mental imagery, narrative memory, and moral curiosity that anchor abstract concepts warmly',
        'Eliminate the need for any hands-on measurement afterwards',
        'Replace factual curriculum with superstition',
        'Require zero teacher preparation',
      ],
      exp: 'Narrative context bridges familiar cultural emotion with new formal reasoning, making concepts meaningful and sticky.',
    },
    mr: {
      q: '"प्रामाणिक मापन" हा इ. ३ रीचा पाठ सुरू करताना डबे मोजण्याआधी कुंभाराच्या तराजूची एक जिवंत लोककथा सांगणे अत्यंत परिणामकारक का ठरते?',
      opts: [
        'कथा भावना, मानसिक कल्पना व नैतिक जिज्ञासा जागृत करतात, ज्यामुळे पुढील अमूर्त संकल्पना मनात घट्ट रुजतात',
        'त्यामुळे नंतर प्रत्यक्ष मापन कृती करण्याची गरजच राहत नाही',
        'त्यामुळे अभ्यासक्रमाची जागा अंधश्रद्धा घेतात',
        'कथा सांगण्यासाठी कोणतेच पूर्वनियोजन लागत नाही',
      ],
      exp: 'कथा व लोकसाहित्याची भावनिक जोड मिळाल्यास नवीन औपचारिक संकल्पना विद्यार्थ्यांशी जवळीक साधतात व दीर्घकाळ स्मरणात राहतात.',
    },
    hi: {
      q: 'कक्षा 3 में "ईमानदार मापन" का पाठ सीधे डिब्बे नापने से पहले एक कुम्हार के तराजू की रोचक लोककथा से शुरू करना क्यों बेहद असरदार होता है?',
      opts: [
        'कहानियाँ भावना, मानसिक कल्पना और नैतिक जिज्ञासा जगाती हैं, जिससे अमूर्त अवधारणाएँ सरलता से जुड़ जाती हैं',
        'इससे बाद में किसी व्यावहारिक मापन अभ्यास की ज़रूरत ही नहीं रहती',
        'इससे पाठ्यक्रम की जगह अंधविश्वास ले लेता है',
        'कथा कहने में शिक्षक को कोई तैयारी नहीं करनी पड़ती',
      ],
      exp: 'कहानी की कथात्मक और भावनात्मक पृष्ठभूमि बच्चों की कल्पना से जुड़कर औपचारिक अवधारणाओं को यादगार और सार्थक बनाती है।',
    },
  },
  {
    topic: 'Constructive Error Handling in Oral Reading',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'During read-aloud time, a Class 2 child hesitates over the unfamiliar word "परिसर" (surroundings) and guesses "परिवार." How does a supportive teacher respond to build decoding confidence?',
      opts: [
        'Pause kindly ("Look closely at the middle letters: प-रि-स-र — does that match the picture of our school garden?"), coaching self-correction',
        'Snatch the book abruptly and shout the word before finishing the line',
        'Ask the entire class to laugh softly to "motivate improvement"',
        'Skip the student’s turn for the entire semester',
      ],
      exp: 'Prompting grapho-phonic and meaning cues preserves dignity while strengthening independent decoding strategies.',
    },
    mr: {
      q: 'प्रकट वाचनावेळी इ. २ रीतील मूल "परिसर" या शब्दावर अडखळून "परिवार" असे वाचते; वाचनाचा आत्मविश्वास वाढवण्यासाठी शिक्षक कसा प्रतिसाद देतील?',
      opts: [
        '"मधली अक्षरे नीट बघूया: प-रि-स-र — शाळेच्या बागेच्या चित्राशी कोणता शब्द जुळतो?" असे विचारून स्वतः सुधारण्याची संधी देणे',
        'पुस्तक हिसकावून घेऊन ओरडून शब्द सांगणे',
        'इतर मुलांना हसायला लावून "सुधारण्याची प्रेरणा" देणे',
        'संपूर्ण सत्रात त्या मुलाची वाचनाची पाळीच रद्द करणे',
      ],
      exp: 'त्वरित ओरडण्याऐवजी अक्षर-ध्वनी व चित्रांच्या संदर्भाचे सूक्ष्म संकेत दिल्यास मूल स्वतः दुरुस्ती करत स्वावलंबी वाचक बनते.',
    },
    hi: {
      q: 'सस्वर पठन के समय कक्षा 2 का बच्चा "परिसर" शब्द पर अटककर "परिवार" पढ़ देता है; पठन आत्मविश्वास बढ़ाने के लिए सहायक शिक्षक कैसी प्रतिक्रिया देंगे?',
      opts: [
        'स्नेह से रुककर ("बीच के अक्षर ध्यान से देखो: प-रि-स-र — बगीचे के चित्र से कौन-सा शब्द मेल खाता है?") स्व-सुधार में मदद करेंगे',
        'किताब छीनकर तेज़ आवाज़ में डाँटते हुए शब्द बोल देंगे',
        'पूरी कक्षा को हँसने देंगे ताकि "सुधार की प्रेरणा" मिले',
        'पूरे सत्र के लिए उस छात्र के पढ़ने की बारी ही बंद कर देंगे',
      ],
      exp: 'शब्द-ध्वनि और अर्थ-संदर्भ के सौम्य संकेत देकर बच्चे को स्वयं शब्द सुधारने का अवसर देना आत्मनिर्भर पठन कौशल विकसित करता है।',
    },
  },
  {
    topic: 'Local Field Museum / Learning Corner',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Inviting Class 3–4 learners to curate a tiny "Classroom Discovery Table" of fallen leaves, soil samples, old brass weights, and seed pods brought safely from their own farms accomplishes what pedagogically?',
      opts: [
        'Grounds observation and classification in tangible local artifacts while affirming rural/home knowledge inside school',
        'Clutters desks solely for decorative exhibition photos',
        'Replaces science experiments with passive viewing',
        'Discourages questioning beyond wall posters',
      ],
      exp: 'A student-curated Discovery Table turns local biodiversity and heritage into living inquiry labs rooted in learners’ own lives.',
    },
    mr: {
      q: 'इ. ३ री–४ थीच्या मुलांनी स्वतःच्या शेतातून वा परिसरातून गळालेली पाने, मातीचे नमुने, जुनी वजने व बिया सुरक्षितपणे आणून वर्गात "शोध-मेज (Discovery Table)" सजवल्यास शैक्षणिकदृष्ट्या काय साध्य होते?',
      opts: [
        'स्थानिक वस्तूंच्या प्रत्यक्ष निरीक्षणातून वर्गीकरण कौशल्य वाढते आणि घरातील ज्ञानाला शाळेत सन्मान मिळतो',
        'केवळ फोटो काढण्यासाठी बाकावर गर्दी होते',
        'प्रत्यक्ष विज्ञान प्रयोग पूर्णपणे बंद होतात',
        'पोस्टरबाहेर प्रश्न विचारणे थांबते',
      ],
      exp: 'विद्यार्थ्यांनीच उभारलेले स्थानिक वस्तूंचे संग्रहालय वर्गातील विज्ञानाला सजीव व अनुभवाधारित स्वरूप देते.',
    },
    hi: {
      q: 'कक्षा 3–4 के विद्यार्थियों द्वारा अपने परिवेश से गिरे पत्ते, मिट्टी के नमूने, पुराने बाट और बीज सुरक्षित लाकर कक्षा में "खोज मेज़ (Discovery Table)" सजाने से शैक्षणिक रूप से क्या सधता है?',
      opts: [
        'स्थानीय ठोस वस्तुओं से अवलोकन व वर्गीकरण कौशल विकसित होता है और छात्रों के घरेलू ज्ञान को विद्यालय में सम्मान मिलता है',
        'केवल फोटो खिंचवाने के लिए डेस्क पर भीड़ बढ़ती है',
        'विज्ञान प्रयोग पूरी तरह बंद हो जाते हैं',
        'पोस्टर से बाहर प्रश्न पूछना समाप्त हो जाता है',
      ],
      exp: 'छात्र-निर्मित खोज मेज़ स्थानीय जैवविविधता और परिवेश को कक्षा की जीवंत प्रयोगशाला में बदल देता है।',
    },
  },
  {
    topic: 'Teacher Wellbeing & Professional Learning Communities',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'When cluster teachers meet monthly in a CRC (Cluster Resource Centre) workshop to openly co-design local math games and share tricky classroom cases without fear of blame, what professional dynamic emerges?',
      opts: [
        'A collaborative Professional Learning Community (PLC) driving reflective growth and shared instructional craft',
        'Bureaucratic isolated paperwork checking only',
        'Hostile competition to hide teaching ideas from neighbors',
        'Unreflective mechanical adherence to outdated scripts',
      ],
      exp: 'Peer learning circles (PLCs) transform isolated teaching into collective problem-solving and continuous pedagogical renewal.',
    },
    mr: {
      q: 'केंद्रस्तरीय (CRC) मासिक बैठकीत शिक्षक कोणत्याही दोषारोपाच्या भीतीशिवाय स्थानिक गणिताचे खेळ एकत्र तयार करून वर्गातील आव्हानांवर चर्चा करतात; यातून कोणती व्यावसायिक संस्कृती घडते?',
      opts: [
        'सहयोगी व्यावसायिक शिक्षण समुदाय (Professional Learning Community) — चिंतनशील सुधारणा व परस्पर सहकार्याचे अध्यापन',
        'केवळ कागदपत्रे तपासण्याची बंदिस्त नोकरशाही',
        'शेजारच्या शाळेपासून अध्यापन कल्पना लपवण्याची स्पर्धा',
        'जुन्या साचेबद्ध नोंदींचे यांत्रिक अनुकरण',
      ],
      exp: 'सहकारी शिक्षक मंचांमुळे (PLC) एकटेपणा दूर होऊन नवनवीन शैक्षणिक उपक्रम व समस्या-निवारणाची सामूहिक ताकद निर्माण होते.',
    },
    hi: {
      q: 'संकुल संसाधन केंद्र (CRC) की मासिक कार्यशाला में जब शिक्षक बिना किसी दोषारोपण के डर के स्थानीय गणित खेल मिलकर गढ़ते हैं और कक्षा की चुनौतियाँ साझा करते हैं, तो क्या विकसित होता है?',
      opts: [
        'सहयोगी व्यावसायिक शिक्षण समुदाय (PLC) — चिंतनशील सुधार व साझा शिक्षण कौशल',
        'केवल फाइल-कागज़ जाँचने की एकाकी औपचारिकता',
        'पड़ोसी स्कूलों से शिक्षण विचार छिपाने की प्रतिस्पर्धा',
        'पुरानी लकीरों का बिना सोचे यांत्रिक पालन',
      ],
      exp: 'शिक्षक शिक्षण समुदाय (PLC) एकाकीपन तोड़कर सामूहिक समस्या-समाधान और निरंतर शिक्षण नवाचार को बढ़ावा देते हैं।',
    },
  },
];
