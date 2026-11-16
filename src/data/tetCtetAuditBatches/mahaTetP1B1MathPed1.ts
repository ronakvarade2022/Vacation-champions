import { CuratedTrilingualMcq } from './types';

// MAHA TET Paper 1 (Classes 1-5) — Mathematics Pedagogy Part 1 (34 Distinct Items)
export const MAHA_TET_P1_B1_MATH_P1: CuratedTrilingualMcq[] = [
  {
    topic: 'NCF-2005 Aim of Mathematics Education',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'According to NCF-2005, what is the MAIN goal of mathematics education in primary schools?',
      opts: [
        'Mathematization of the child’s thought processes and logical reasoning',
        'Memorization of multiplication tables up to 30 through daily drills',
        'Completing textbook exercise sheets quickly for annual exams',
        'Preparing every student for engineering entrance calculations',
      ],
      exp: 'NCF-2005 states that developing the child’s inner resources to think and reason mathematically (mathematization of thinking) is the central aim.',
    },
    mr: {
      q: 'राष्ट्रीय अभ्यासक्रम आराखडा (NCF-2005) नुसार प्राथमिक शाळांमध्ये गणित शिक्षणाचे मुख्य ध्येय कोणते आहे?',
      opts: [
        'मुलांच्या विचार प्रक्रियेचे गणितीकरण (Mathematization) व तार्किक विचार विकास',
        'दररोजच्या सरावतून ३० पर्यंतचे पाढे तोंडपाठ करून घेणे',
        'वार्षिक परीक्षेसाठी पाठ्यपुस्तकातील उदाहरणे वेगाने सोडवून घेणे',
        'प्रत्येक विद्यार्थ्यास अभियांत्रिकी प्रवेश परीक्षेसाठी तयार करणे',
      ],
      exp: 'NCF-2005 नुसार मुलांच्या विचारांचे गणितीकरण करणे व तार्किक निष्कर्ष काढण्याची क्षमता विकसित करणे हे मुख्य उद्दिष्ट आहे.',
    },
    hi: {
      q: 'NCF-2005 के अनुसार प्राथमिक विद्यालयों में गणित शिक्षा का मुख्य उद्देश्य क्या है?',
      opts: [
        'बालक की चिंतन प्रक्रिया का गणितीकरण (Mathematization) तथा तार्किक क्षमता विकास',
        'प्रतिदिन के अभ्यास से ३० तक पहाड़े रटवाना',
        'वार्षिक परीक्षा हेतु पाठ्यपुस्तक के प्रश्न शीघ्र हल कराना',
        'सभी छात्रों को इंजीनियरिंग प्रवेश परीक्षा के लिए तैयार करना',
      ],
      exp: 'NCF-2005 के अनुसार गणित शिक्षण का प्रमुख उद्देश्य बालक की सोच का गणितीकरण करना है।',
    },
  },
  {
    topic: 'Van Hiele Level 0 Visualization',
    pattern: 'Pedagogy',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 2 pupil identifies a tilted square as a "diamond" and calls only horizontally resting squares "squares". According to Van Hiele’s geometric levels, this learner is at:',
      opts: [
        'Level 0 – Visualization (identifying shapes solely by appearance)',
        'Level 1 – Analysis (identifying properties of figures)',
        'Level 2 – Informal Deduction (ordering properties)',
        'Level 3 – Formal Deduction (axiomatic proof)',
      ],
      exp: 'At Level 0 (Visualization), children judge figures holistically by prototype look and orientation rather than invariant geometric properties.',
    },
    mr: {
      q: 'इयत्ता २ रीचा विद्यार्थी तिरका ठेवलेला चौरस पाहून त्याला "पतंग/हिरा" म्हणतो आणि फक्त सरळ आडवा चौरस पाहिल्यावरच "चौरस" ओळखतो. व्हॅन हिले (Van Hiele) यांच्या भूमिती स्तरांनुसार हा विद्यार्थी कोणत्या स्तरावर आहे?',
      opts: [
        'स्तर ० – दृश्यीकरण (Visualization: केवळ बाह्य स्वरूपावरून ओळखणे)',
        'स्तर १ – विश्लेषण (Analysis: गुणधर्मांवरून ओळखणे)',
        'स्तर २ – अनौपचारिक निगमन (Informal Deduction)',
        'स्तर ३ – औपचारिक निगमन (Formal Deduction)',
      ],
      exp: 'स्तर ० (दृश्यीकरण) मध्ये मुले आकृतीच्या दिशेवरून व बाह्य रूपावरून ती ओळखतात, कोन वा बाजूंच्या गुणधर्मांवरून नव्हे.',
    },
    hi: {
      q: 'कक्षा २ का छात्र तिरछे रखे वर्ग को "हीरा" कहता है और केवल सीधे रखे वर्ग को ही वर्ग मानता है। वैन हीले के ज्यामितीय स्तरों के अनुसार वह किस स्तर पर है?',
      opts: [
        'स्तर ० – दृश्यांकन (Visualization: केवल आकृति के रूप से पहचानना)',
        'स्तर १ – विश्लेषण (Analysis)',
        'स्तर २ – अनौपचारिक निगमन',
        'स्तर ३ – औपचारिक निगमन',
      ],
      exp: 'स्तर ० पर बालक गुणधर्मों की बजाय आकृति के संपूर्ण दिखने के ढंग (orientation) के आधार पर पहचान करता है।',
    },
  },
  {
    topic: 'Dienes Blocks Manipulative Use',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'Dienes Base-Ten Blocks (unit cubes, tens rods, hundreds flats) are MOST effective for teaching which primary concept?',
      opts: [
        'Place value, regrouping in addition/subtraction, and decimal tenths/hundredths',
        'Measuring angles inside acute and obtuse triangles',
        'Constructing bar graphs from weather data tables',
        'Reciting prime numbers sequentially',
      ],
      exp: 'Base-Ten Dienes blocks physically model powers of 10 (1s, 10s, 100s, 1000s), making trading/regrouping concrete.',
    },
    mr: {
      q: 'डीन्स ब्लॉक्स (Dienes Base-Ten Blocks – एकक ठोकळे, दशक दांड्या, शतक पाट्या) कोणत्या प्राथमिक संकल्पनेच्या अध्यापनासाठी सर्वाधिक प्रभावी ठरतात?',
      opts: [
        'स्थानिक किंमत, हातच्याची बेरीज-वजाबाकी व दशांश संकल्पना',
        'त्रिकोणांचे कोन मोजणे',
        'हवामान आकडेवारीवरून स्तंभालेख काढणे',
        'मूळ संख्या क्रमाने तोंडपाठ करणे',
      ],
      exp: 'डीन्स ब्लॉक्स १० च्या पटीतील एकक, दशक, शतक गट प्रत्यक्ष हाताळण्यासाठी सर्वोत्तम साधन आहेत.',
    },
    hi: {
      q: 'डीन्स बेस-टेन ब्लॉक्स (Dienes Blocks) किस प्राथमिक अवधारणा के शिक्षण हेतु सर्वाधिक प्रभावी हैं?',
      opts: [
        'स्थानीय मान, हासिल वाले जोड़-घटाव तथा दशमलव अवधारणा',
        'त्रिभुज के कोण मापना',
        'मौसम आँकड़ों से दंड आलेख बनाना',
        'अभाज्य संख्याएँ क्रम से रटना',
      ],
      exp: 'डीन्स ब्लॉक्स १० के गुणजों (इकाई, दहाई, सैकड़ा) को मूर्त रूप से समझाने का श्रेष्ठ साधन हैं।',
    },
  },
  {
    topic: 'Geoboard Teaching Purpose',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'A wooden Geoboard fitted with grid pegs and rubber bands is BEST suited in Class 4 for exploring:',
      opts: [
        '2D polygon shapes, perimeter, and unit-square area through hands-on stretching',
        'Long division with 3-digit divisors',
        'Memorizing metric mass conversions (grams to kilograms)',
        'Calculating simple interest percentages',
      ],
      exp: 'Geoboards allow children to build triangles, rectangles, and irregular shapes interactively while counting boundary units and interior squares.',
    },
    mr: {
      q: 'लाकडी जिओबोर्ड (Geoboard) आणि रबर बँडचा वापर इयत्ता ४ थीमध्ये प्रामुख्याने कशासाठी सर्वोत्तम ठरतो?',
      opts: [
        'द्विमितीय बहुभुज आकार, परिमिती आणि चौरस एककांतील क्षेत्रफळ अनुभवणे',
        '३-अंकी भाजकांनी दीर्घ भागाकार करणे',
        'वजनाची मेट्रिक एकके पाठ करणे',
        'सरळव्याजाची टक्केवारी काढणे',
      ],
      exp: 'जिओबोर्डवरील खिळ्यांभोवती रबर ताणून मुले आकार, बाजू, कोन, परिमिती व क्षेत्रफळ स्वतः पडताळतात.',
    },
    hi: {
      q: 'कक्षा ४ में जियोबोर्ड (Geoboard) तथा रबर बैंड का उपयोग किसके शिक्षण के लिए सर्वोत्तम है?',
      opts: [
        'द्वि-आयामी बहुभुज, परिमाप तथा वर्ग-इकाई क्षेत्रफल की खोज',
        '३-अंकीय भाजक से दीर्घ भाग',
        'द्रव्यमान की इकाइयाँ रटना',
        'साधारण ब्याज की गणना',
      ],
      exp: 'जियोबोर्ड पर बच्चे विभिन्न बहुभुजों के परिमाप व क्षेत्रफल का मूर्त अन्वेषण कर सकते हैं।',
    },
  },
  {
    topic: 'Error Analysis: Fraction Numerator-Denominator Add',
    pattern: 'Pedagogy',
    difficulty: 'Moderate',
    en: {
      q: 'A student writes 1/2 + 1/3 = 2/5. What does this error reveal, and what is the MOST appropriate remedial step?',
      opts: [
        'Child treats numerator and denominator as separate whole numbers; remediate using paper-folding fraction strips of equal whole size',
        'Child is careless and must write 50 homework sums of LCM rules',
        'Child cannot multiply 2 × 3 and needs multiplication table punishment',
        'Child should skip fractions and start decimals directly',
      ],
      exp: 'Overgeneralizing whole-number addition across numerator and denominator is corrected conceptually using visual fraction strips showing unequal parts cannot be added directly.',
    },
    mr: {
      q: 'एक विद्यार्थी १/२ + १/३ = २/५ असे लिहितो. या चुकीचे निदान करून सर्वात योग्य उपचारात्मक उपाय कोणता?',
      opts: [
        'अंश व छेद हे स्वतंत्र पूर्ण संख्या मानण्याची चूक; समान आकाराच्या कागदी अपूर्णांक पट्ट्या (Fraction Strips) घड्या घालून प्रत्यक्ष दाखवणे',
        'विद्यार्थी बेफिकीर असल्याने ५० उदाहरणे गृहपाठ देणे',
        'पाढे येत नसल्याने शिक्षा करणे',
        'अपूर्णांक सोडून थेट दशांश शिकवणे',
      ],
      exp: 'अंश व छेदाची स्वतंत्र बेरीज ही वैचारिक गैरसमजूत आहे; समान पट्टीच्या तुकड्यांमधून समछेद का आवश्यक आहे ते स्पष्ट होते.',
    },
    hi: {
      q: 'एक छात्र १/२ + १/३ = २/५ लिखता है। इस त्रुटि का सबसे उपयुक्त उपचारात्मक उपाय क्या है?',
      opts: [
        'वह अंश व हर को अलग पूर्ण संख्या मान रहा है; कागज की समान भिन्न पट्टियों से समहर की आवश्यकता दिखाना',
        'उसे ५० प्रश्न गृहकार्य में दंडस्वरूप देना',
        'पहाड़े रटने को कहना',
        'भिन्न छोड़कर सीधे दशमलव पढ़ाना',
      ],
      exp: 'भिन्न पट्टियों द्वारा असमान भागों की तुलना दिखाकर समहर (Common Denominator) की अवधारणा बनती है।',
    },
  },
  {
    topic: 'Polya Problem Solving Stages',
    pattern: 'Pedagogy',
    difficulty: 'Moderate',
    en: {
      q: 'Arrange George Polya’s four classic stages of mathematical problem solving in correct logical order:',
      opts: [
        'Understand the problem → Devise a plan → Carry out the plan → Look back/Reflect',
        'Devise a plan → Understand the problem → Compute rapidly → Submit answer',
        'Memorize formula → Substitute numbers → Check answer key → Finish',
        'Look back → Carry out plan → Understand problem → Devise plan',
      ],
      exp: 'Polya’s four steps: (1) Understand the problem, (2) Devise a plan, (3) Carry out the plan, (4) Look back/verify.',
    },
    mr: {
      q: 'जॉर्ज पोल्या (George Polya) यांनी मांडलेल्या गणितीय समस्या-निराकरणाच्या चार पायऱ्यांचा योग्य क्रम कोणता?',
      opts: [
        'समस्या समजून घेणे → योजना आखणे → योजना अमलात आणणे → मागे वळून तपासणे (Look back)',
        'योजना आखणे → समस्या वाचणे → वेगाने हिशोब करणे → उत्तर सादर करणे',
        'सूत्र पाठ करणे → किमती टाकणे → उत्तरसूची पाहणे → पूर्ण करणे',
        'तपासणे → कृती करणे → समस्या समजणे → योजना आखणे',
      ],
      exp: 'पोल्याचे चार टप्पे: समजणे → नियोजन → अंमलबजावणी → पडताळणी/सिंहावलोकन.',
    },
    hi: {
      q: 'जॉर्ज पोल्या द्वारा दिए गए गणितीय समस्या-समाधान के चार चरणों का सही क्रम क्या है?',
      opts: [
        'समस्या समझना → योजना बनाना → योजना लागू करना → पीछे मुड़कर जाँचना (Look back)',
        'योजना बनाना → समस्या पढ़ना → शीघ्र गणना → उत्तर लिखना',
        'सूत्र रटना → मान रखना → उत्तरमाला देखना → समाप्त करना',
        'जाँचना → हल करना → समझना → योजना बनाना',
      ],
      exp: 'पोल्या के चार चरण: समझना → योजना → क्रियान्वयन → पुनर्विचार।',
    },
  },
  {
    topic: 'Tangram Spatial Reasoning Benefits',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'Including 7-piece Chinese Tangram puzzles in the NCERT Class 3–4 Math-Magic textbook primarily nurtures:',
      opts: [
        'Spatial visualization, geometric transformation sense, and shape composition',
        'Long multiplication speed with 4-digit numbers',
        'Conversion between rupees and paise',
        'Bar chart frequency tabulation',
      ],
      exp: 'Tangrams develop spatial sense, rotation/flipping intuition, and decomposing composite shapes into triangles and quadrilaterals.',
    },
    mr: {
      q: 'प्राथमिक गणित पाठ्यपुस्तकात ७ तुकड्यांच्या टॅनग्राम (Tangram) कोडीचा समावेश प्रामुख्याने कोणती क्षमता वाढवण्यासाठी केला आहे?',
      opts: [
        'अवकाशीय कल्पनाशक्ती (Spatial sense), आकार जुळवणूक आणि भौमितिक रूपांतरण',
        '४-अंकी गुणाकाराचा वेग वाढवणे',
        'रुपये-पैसे रूपांतरण करणे',
        'स्तंभालेख वारंवारता सारणी बनवणे',
      ],
      exp: 'टॅनग्राममुळे मुले त्रिकोण व चौकोन फिरवून विविध आकार तयार करतात व अवकाशीय समज विकसित होते.',
    },
    hi: {
      q: 'प्राथमिक गणित पाठ्यपुस्तक में ७-टुकड़ों वाले टैनग्राम (Tangram) का समावेश मुख्यतः किसे विकसित करता है?',
      opts: [
        'स्थानिक समझ (Spatial sense), आकृतियों का संयोजन तथा ज्यामितीय कल्पना',
        '४-अंकीय गुणा की गति',
        'रुपये-पैसे रूपांतरण',
        'दंड आलेख सारणीयन',
      ],
      exp: 'टैनग्राम से आकृतियों के घुमाव, संयोजन और स्थानिक तर्कशक्ति का विकास होता है।',
    },
  },
  {
    topic: 'Bruner CPA Sequence (ELPS)',
    pattern: 'Pedagogy',
    difficulty: 'Moderate',
    en: {
      q: 'In primary math instruction (CPA / ELPS framework), what is the ideal progression when introducing "addition with carry"?',
      opts: [
        'Concrete (real bundles of sticks) → Pictorial (drawings/diagrams) → Abstract Symbols (27 + 15)',
        'Abstract written algorithm first → Concrete sticks at end of year',
        'Memorize carry rule rhyme → Dictate 100 sums without visual aids',
        'Start directly with 5-digit carry sums in Class 1',
      ],
      exp: 'Jerome Bruner’s Enactive-Iconic-Symbolic (Concrete-Pictorial-Abstract) model builds meaning before symbolic notation.',
    },
    mr: {
      q: '"हातच्याची बेरीज" ही संकल्पना प्राथमिक वर्गात शिकवताना CPA (मूर्त-चित्र-अमूर्त) सूत्रानुसार कोणता क्रम सर्वोत्तम ठरतो?',
      opts: [
        'मूर्त वस्तू (काड्यांचे गट्टे) → चित्रात्मक मांडणी → अमूर्त अंकात्मक चिन्हे (२७ + १५)',
        'आधी अमूर्त अंकांची रीत आणि वर्षाच्या शेवटी प्रत्यक्ष काड्या',
        'हातच्याचा नियम तोंडपाठ करून १०० उदाहरणे सांगणे',
        'थेट इयत्ता १ लीत ५-अंकी हातच्याची बेरीज शिकवणे',
      ],
      exp: 'ब्रुनर व CPA तत्त्वानुसार मूर्त अनुभवातून चित्र व नंतर अमूर्त चिन्हांकडे नेल्यास संकल्पना पक्की होते.',
    },
    hi: {
      q: 'प्राथमिक कक्षा में "हासिल वाला जोड़" सिखाते समय CPA (मूर्त-चित्रात्मक-अमूर्त) का सही क्रम क्या है?',
      opts: [
        'मूर्त वस्तुएँ (तीलियों के बंडल) → चित्र रूप → अमूर्त प्रतीक (२७ + १५)',
        'पहले अमूर्त नियम और अंत में वस्तुएँ दिखाना',
        'केवल रटकर १०० प्रश्न हल कराना',
        'कक्षा १ में सीधे ५-अंकीय जोड़ सिखाना',
      ],
      exp: 'मूर्त से चित्रात्मक और फिर अमूर्त प्रतीकों की ओर बढ़ना सार्थक अधिगम सुनिश्चित करता है।',
    },
  },
  {
    topic: 'Graph Paper Estimation of Irregular Area',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'To help Class 5 children estimate the area of an irregular leaf, which classroom activity is MOST pedagogically sound?',
      opts: [
        'Tracing the leaf onto a 1-cm squared grid paper and counting full squares plus half/more-than-half squares',
        'Measuring the leaf perimeter with string and multiplying by 4',
        'Using the circular formula πr² directly',
        'Reading its weight on a spring balance',
      ],
      exp: 'Tracing on 1 cm × 1 cm grid paper builds authentic conceptual understanding of area as surface-covering square units.',
    },
    mr: {
      q: 'इयत्ता ५ वीच्या विद्यार्थ्यांना अनियमित आकाराच्या झाडाच्या पानाचे क्षेत्रफळ अंदाजे काढायचे असल्यास कोणती कृती सर्वाधिक शास्त्रीय आहे?',
      opts: [
        '१ चौ.सेमी आकाराच्या आलेख कागदावर (Graph Paper) पानाची कड आखून पूर्ण व अर्ध्याहून अधिक चौरस मोजणे',
        'दोऱ्याने कड मोजून त्यास ४ ने गुणणे',
        'थेट वर्तुळाचे सूत्र πr² वापरणे',
        'वजन काट्यावर पानाचे वजन करणे',
      ],
      exp: 'आलेख कागदावर चौरस मोजल्याने क्षेत्रफळ म्हणजे पृष्ठभागाने व्यापलेले एकक चौरस ही संकल्पना स्पष्ट होते.',
    },
    hi: {
      q: 'कक्षा ५ के छात्रों को अनियमित आकार की पत्ती का क्षेत्रफल अनुमानित करने हेतु सबसे उपयुक्त गतिविधि क्या है?',
      opts: [
        '१-सेमी वर्गाकार ग्राफ पेपर पर पत्ती की रूपरेखा खींचकर पूरे व आधे से अधिक वर्ग गिनना',
        'धागे से परिमाप नापकर ४ से गुणा करना',
        'वृत्त का सूत्र πr² लगाना',
        'तुला पर पत्ती तौलना',
      ],
      exp: 'ग्राफ पेपर पर वर्ग गिनने से क्षेत्रफल की इकाई-वर्ग अवधारणा मूर्त रूप से स्पष्ट होती है।',
    },
  },
  {
    topic: 'Decimal Size Misconception Diagnosis',
    pattern: 'Pedagogy',
    difficulty: 'Moderate',
    en: {
      q: 'When asked which is larger, 0.5 or 0.25, a Class 5 learner picks 0.25 arguing "25 is bigger than 5". Which teaching resource BEST resolves this misconception?',
      opts: [
        'Shading equal 10×10 decimal grid cards (50 shaded squares vs 25 shaded squares) alongside money (50 paise vs 25 paise)',
        'Instructing the child to blindly append zeroes without visual explanation',
        'Making the student copy decimal place-value charts 20 times',
        'Moving directly to division of decimals by decimals',
      ],
      exp: 'Comparing shaded parts on identical 10×10 hundredths grids visibly proves 0.50 (50 parts) > 0.25 (25 parts).',
    },
    mr: {
      q: '०.५ आणि ०.२५ यांपैकी कोणती संख्या मोठी, असे विचारल्यावर एक विद्यार्थी "५ पेक्षा २५ मोठे म्हणून ०.२५ मोठा" असे उत्तर देतो. हा गैरसमज दूर करण्याचे सर्वोत्तम साधन कोणते?',
      opts: [
        'समान १०×१० चौरसांच्या दशांश जाळीत (Decimal Grid) ५० चौकोन विरुद्ध २५ चौकोन रंगवून तसेच ५० पैसे व २५ पैसे तुलना दाखवणे',
        'अर्थ न सांगता फक्त उजवीकडे शून्य लावण्याचा नियम सांगणे',
        'स्थानिक किंमत तक्ता २० वेळा लिहून घेणे',
        'थेट दशांश अपूर्णांकांचा भागाकार सुरू करणे',
      ],
      exp: '१०×१० शतांश जाळीत ०.५ (५० चौरस) हे ०.२५ (२५ चौरस) पेक्षा मोठे असल्याचे दृश्यरीत्या स्पष्ट होते.',
    },
    hi: {
      q: '०.५ और ०.२५ में बड़ा कौन है, पूछने पर छात्र कहता है "२५ बड़ा है इसलिए ०.२५ बड़ा है"। इस भ्रम को दूर करने का सर्वोत्तम माध्यम क्या है?',
      opts: [
        'समान १०×१० दशमलव ग्रिड में ५० वर्ग बनाम २५ वर्ग रंगकर तथा ५० पैसे बनाम २५ पैसे से तुलना दिखाना',
        'बिना समझाए केवल अंत में शून्य लगाने को कहना',
        'स्थानीय मान तालिका २० बार लिखवाना',
        'सीधे दशमलव का भाग पढ़ाना',
      ],
      exp: 'समान १०×१० ग्रिड पर छायांकित क्षेत्र की तुलना करने से विद्यार्थी ०.५० > ०.२५ स्वयं देख पाते हैं।',
    },
  },
  {
    topic: 'Open-Ended vs Closed-Ended Math Questions',
    pattern: 'Pedagogy',
    difficulty: 'Moderate',
    en: {
      q: 'Which of the following teacher prompts is an OPEN-ENDED question encouraging divergent mathematical thinking?',
      opts: [
        'Construct three DIFFERENT rectangles that all share a perimeter of 24 cm',
        'Calculate the perimeter of a rectangle with length 7 cm and breadth 5 cm',
        'What is 144 divided by 12?',
        'State the formula for the area of a square',
      ],
      exp: 'Allowing multiple valid dimensions summing to 12 (e.g., 11×1, 10×2, 8×4, 6×6) fosters divergent exploration and creativity.',
    },
    mr: {
      q: 'खालीलपैकी कोणता प्रश्न विद्यार्थ्यांमध्ये बहुविध व सर्जनशील गणितीय विचार (Divergent / Open-Ended Thinking) चालना देतो?',
      opts: [
        '२४ सेमी परिमिती असणारे तीन वेगवेगळ्या मापांचे आयत तयार करा',
        '७ सेमी लांबी व ५ सेमी रुंदीच्या आयताची परिमिती काढा',
        '१४४ ला १२ ने भागल्यास उत्तर किती येते?',
        'चौरसाच्या क्षेत्रफळाचे सूत्र सांगा',
      ],
      exp: '२४ सेमी परिमितीचे विविध आयत (११×१, १०×२, ८×४ इ.) काढण्यास सांगितल्याने अनेक अचूक उत्तरे व शोधक वृत्ती वाढते.',
    },
    hi: {
      q: 'निम्न में से कौन-सा प्रश्न विद्यार्थियों में अपसारी व मुक्त (Open-Ended) गणितीय चिंतन को बढ़ावा देता है?',
      opts: [
        '२४ सेमी परिमाप वाले तीन अलग-अलग आयत बनाइए',
        '७ सेमी लंबाई व ५ सेमी चौड़ाई वाले आयत का परिमाप निकालिए',
        '१४४ को १२ से भाग देने पर क्या आता है?',
        'वर्ग के क्षेत्रफल का सूत्र लिखिए',
      ],
      exp: 'मुक्त प्रश्न अनेक वैध उत्तर खोजने और संबंधों का विश्लेषण करने का अवसर देते हैं।',
    },
  },
  {
    topic: 'Inductive Method of Teaching Rules',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'A Class 4 teacher asks students to measure interior angles of five different paper triangles, sum them up (getting ~180° each time), and then generalize "Sum of triangle angles = 180°". Which method is this?',
      opts: [
        'Inductive Method (particular examples to general rule)',
        'Deductive Method (general rule to particular cases)',
        'Rote Drill Method',
        'Historical Biographical Method',
      ],
      exp: 'Observing multiple concrete instances first and discovering the general rule defines the Inductive Method.',
    },
    mr: {
      q: 'शिक्षक विद्यार्थ्यांना पाच वेगवेगळ्या त्रिकोणांचे तीन कोन मोजून त्यांची बेरीज करायला सांगतात व त्यावरून "त्रिकोणाच्या तीन कोनांची बेरीज १८०° असते" हा नियम शोधून काढायला लावतात. ही कोणती पद्धत आहे?',
      opts: [
        'उद्गामी पद्धत (Inductive Method – उदाहरणांकडून नियमाकडे)',
        'अवगामी पद्धत (Deductive Method – नियमाकडून उदाहरणाकडे)',
        'घोकंपट्टी व सराव पद्धत',
        'ऐतिहासिक चरित्र पद्धत',
      ],
      exp: 'अनेक विशिष्ट उदाहरणांतून सामान्य सिद्धांत निष्पन्न करणे ही उद्गामी (Inductive) अध्यापन पद्धत होय.',
    },
    hi: {
      q: 'शिक्षक छात्रों से पाँच अलग त्रिभुजों के कोण मापवाकर उनका योग १८०° निकालते हैं और नियम प्रतिपादित करवाते हैं। यह कौन-सी शिक्षण विधि है?',
      opts: [
        'आगमन विधि (Inductive Method: उदाहरण से नियम की ओर)',
        'निगमन विधि (Deductive Method)',
        'रटंत अभ्यास विधि',
        'ऐतिहासिक विधि',
      ],
      exp: 'विशिष्ट उदाहरणों के निरीक्षण द्वारा सामान्य नियम स्थापित करना आगमन विधि कहलाता है।',
    },
  },
  {
    topic: 'Zero as Placeholder on Abacus',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'Why is an empty vertical spike (0 beads) on a physical wooden Abacus so valuable when teaching 407 vs 47 to primary children?',
      opts: [
        'It visually proves that the tens place exists and holds zero bundles, preventing 407 from collapsing into 47',
        'It makes the abacus lighter to carry home',
        'It eliminates the need to teach subtraction',
        'It helps students spell English number words faster',
      ],
      exp: 'The empty tens rod on a spike abacus makes the placeholder role of zero tangible and unambiguous.',
    },
    mr: {
      q: 'लाकडी मणी पाटीवर (Abacus) ४०७ दाखवताना दशक काडी रिकामी ठेवणे प्राथमिक मुलांसाठी का महत्त्वाचे ठरते?',
      opts: [
        'शून्य हा दशकाचे रिकामे स्थान राखून ठेवतो (Placeholder), त्यामुळे ४०७ आणि ४७ मधील फरक प्रत्यक्ष दिसतो',
        'मणी पाटीचे वजन हलके राहते',
        'वजाबाकी शिकवण्याची गरज उरत नाही',
        'इंग्रजी स्पेलिंग लवकर पाठ होतात',
      ],
      exp: 'दशक स्थान रिकामे राहिल्याने शून्याचे स्थान-धारक (Placeholder) कार्य मूर्त स्वरूपात कळते.',
    },
    hi: {
      q: 'प्राथमिक बच्चों को ४०७ और ४७ का अंतर समझाने में अबेकस (Abacus) पर खाली दहाई की छड़ क्यों उपयोगी है?',
      opts: [
        'यह दिखाती है कि दहाई का स्थान रिक्त (०) होने पर भी बना रहता है, जिससे स्थान-धारक शून्य की समझ बनती है',
        'अबेकस हल्का रहता है',
        'घटाव सिखाने की आवश्यकता समाप्त होती है',
        'अंग्रेजी वर्तनी जल्दी याद होती है',
      ],
      exp: 'अबेकस की खाली छड़ शून्य की स्थान-धारक (Placeholder) भूमिका को स्पष्ट दर्शाती है।',
    },
  },
  {
    topic: 'NIPUN Bharat FLN Class 3 Numeracy Goal',
    pattern: 'Pedagogy',
    difficulty: 'Moderate',
    en: {
      q: 'Under the NIPUN Bharat Mission (Foundational Numeracy target by end of Grade 3), learners are expected to:',
      opts: [
        'Read and write numbers up to 9,999 and solve simple daily-life problems using addition/subtraction (up to 999) and basic multiplication/division',
        'Solve quadratic equations and trigonometric ratios',
        'Calculate compound interest and square roots up to 10,000',
        'Only count orally up to 50 without number symbols',
      ],
      exp: 'NIPUN Bharat Lakshyas for Balvatika to Grade 3 target fluency up to 9,999, 3-digit +/-, basic ×/÷ facts, and everyday measurement.',
    },
    mr: {
      q: 'निपुण भारत (NIPUN Bharat) अभियानांतर्गत इयत्ता ३ रीच्या अखेरीस पायाभूत संख्याज्ञान (FLN) उद्दिष्टांमध्ये कशाचा समावेश आहे?',
      opts: [
        '९,९९९ पर्यंत संख्या वाचन-लेखन आणि दैनंदिन जीवनातील बेरीज-वजाबाकी (९९९ पर्यंत) व सोपा गुणाकार-भागाकार सोडवणे',
        'वर्गसमीकरणे व त्रिकोणमिती सोडवणे',
        'चक्रवाढ व्याज व वर्गमूळ काढणे',
        'फक्त ५० पर्यंत तोंडी मोजणे',
      ],
      exp: 'निपुण भारत लक्ष्यांनुसार इयत्ता ३ रीच्या शेवटी मुले ९,९९९ पर्यंत संख्याज्ञान व मूलभूत क्रिया अर्थपूर्णरीत्या करू शकतात.',
    },
    hi: {
      q: 'निपुण भारत (NIPUN Bharat) मिशन के अंतर्गत कक्षा ३ के अंत तक आधारभूत संख्यात्मकता का मुख्य लक्ष्य क्या है?',
      opts: [
        '९,९९९ तक संख्याएँ पढ़ना-लिखना तथा दैनिक जीवन के जोड़-घटाव व सरल गुणा-भाग हल करना',
        'द्विघात समीकरण और त्रिकोणमिति हल करना',
        'चक्रवृद्धि ब्याज व वर्गमूल ज्ञात करना',
        'केवल ५० तक मौखिक गिनती गिनना',
      ],
      exp: 'कक्षा ३ के अंत तक ९,९९९ तक की संख्या समझ और मूलभूत संक्रियाओं में दक्षता अपेक्षित है।',
    },
  },
  {
    topic: 'Borrowing Subtraction Error Diagnosis',
    pattern: 'Pedagogy',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 3 child computes: 42 − 17 = 35 (subtracting smaller digit 2 from larger digit 7 in ones column). What is the underlying cause?',
      opts: [
        'The child reverses subtraction to avoid regrouping ("smaller from larger" bug) due to weak tens-into-ones exchange understanding',
        'The child does not know single-digit subtraction facts like 7 − 2 = 5',
        'The child misread 42 as 52',
        'The child suffers from severe visual dyslexia',
      ],
      exp: 'Subtracting top-or-bottom indiscriminately ("always smaller digit from bigger digit") is the classic regrouping misconception.',
    },
    mr: {
      q: 'इयत्ता ३ रीतील विद्यार्थी ४२ − १७ = ३५ असे सोडवतो (एकक स्थानी ७ मधून २ वजा करतो). या चुकीमागील अचूक कारण कोणते?',
      opts: [
        'दशकातून एककाकडे १० सुटे घेण्याची (हच्चा/पुनर्गठन) संकल्पना अपूर्ण असल्याने "मोठ्या अंकातून लहान अंक" उलट वजा करणे',
        'त्याला ७ − २ = ५ ही साधी वजाबाकी येत नाही',
        'त्याने ४२ ऐवजी ५२ वाचले',
        'त्याला गंभीर दृष्टीदोष आहे',
      ],
      exp: 'हच्चा न घेता मोठ्या अंकातून लहान अंक वजा करणे ही पुनर्गठनाची (Regrouping) सामान्य त्रुटी आहे.',
    },
    hi: {
      q: 'कक्षा ३ का छात्र ४२ − १७ = ३५ हल करता है (इकाई में ७ से २ घटाकर)। इस त्रुटि का मूल कारण क्या है?',
      opts: [
        'दहाई को इकाई में बदलने (पुनर्समूहन/उधार) की समझ के अभाव में सदैव बड़े अंक से छोटा अंक घटा देना',
        'उसे ७ − २ = ५ का एक-अंकीय घटाव नहीं आता',
        'उसने ४२ को ५२ पढ़ लिया',
        'उसे गंभीर दृष्टि दोष है',
      ],
      exp: 'पुनर्समूहन (Regrouping) के बिना ऊपर-नीचे के छोटे-बड़े अंक बदलकर घटाना एक प्रसिद्ध वैचारिक त्रुटी है।',
    },
  },
  {
    topic: 'Mental Math & Estimation Value',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'Why does primary mathematics curriculum emphasize estimation and approximation alongside exact calculation?',
      opts: [
        'It builds number sense and equips learners to judge whether a calculated answer is reasonable',
        'So teachers never have to check exact written homework',
        'Because exact arithmetic is unnecessary after Class 4',
        'To replace calculators during sports activities',
      ],
      exp: 'Estimation helps children verify reasonableness of results (e.g., spotting decimal-point slips) and make quick real-life decisions.',
    },
    mr: {
      q: 'प्राथमिक गणित अभ्यासक्रमात अचूक आकडेमोडीसोबत "अंदाज बांधणे" (Estimation) या कौशल्यावर भर का दिला जातो?',
      opts: [
        'त्यामुळे संख्याजाण विकसित होते व आलेल्या उत्तराची व्यवहार्यता (Reasonableness) तपासता येते',
        'शिक्षकांना अचूक गृहपाठ तपासावा लागू नये म्हणून',
        'इयत्ता ४ थीनंतर अचूक आकडेमोड गरजेची नसते म्हणून',
        'क्रीडा स्पर्धेत कॅल्क्युलेटरऐवजी वापरण्यासाठी',
      ],
      exp: 'अंदाज बांधल्याने दशांश वा मोठ्या चुकीचे उत्तर तात्काळ लक्षात येते आणि संख्याजाण बळकट होते.',
    },
    hi: {
      q: 'प्राथमिक गणित पाठ्यक्रम में सटीक गणना के साथ-साथ "आकलन/अनुमान" (Estimation) पर बल क्यों दिया जाता है?',
      opts: [
        'यह संख्या-समझ बढ़ाता है तथा विद्यार्थी को प्राप्त उत्तर की तर्कसंगतता जाँचने में सक्षम बनाता है',
        'ताकि शिक्षकों को सटीक उत्तर न जाँचने पड़ें',
        'कक्षा ४ के बाद सटीक गणना की आवश्यकता नहीं रहती',
        'कैलकुलेटर के स्थान पर उपयोग के लिए',
      ],
      exp: 'आकलन से विद्यार्थी यह परख पाते हैं कि उनका गणना-परिणाम व्यावहारिक व संभव है या नहीं।',
    },
  },
  {
    topic: 'Mathematics Anxiety & Classroom Climate',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'According to NCF-2005, which classroom practice is MOST responsible for generating "Mathematics Anxiety" and fear of failure?',
      opts: [
        'Emphasizing timed mechanical drills, public embarrassment over mistakes, and single-method rigidity',
        'Using games, puzzles, and collaborative group discussions',
        'Allowing multiple solution strategies to reach an answer',
        'Connecting word problems to local markets and festivals',
      ],
      exp: 'Fear stems from rigid rote-drill pressure and punishing mistakes rather than treating errors as learning windows.',
    },
    mr: {
      q: 'NCF-2005 नुसार विद्यार्थ्यांमध्ये "गणिताची भीती" (Math Anxiety) निर्माण होण्यामागे खालीलपैकी कोणती वर्गपद्धती प्रामुख्याने कारणीभूत ठरते?',
      opts: [
        'वेळेच्या मर्यादेतील यांत्रिक सराव, चुकांवरून सर्वांसमोर लाजवणे आणि एकाच ठराविक रीतीचा हट्ट',
        'खेळ, कोडी आणि गटचर्चेचा वापर करणे',
        'उत्तर शोधण्याच्या अनेक पद्धतींना परवानगी देणे',
        'शाब्दिक उदाहरणे स्थानिक बाजार व सणांशी जोडणे',
      ],
      exp: 'यांत्रिक घोकंपट्टी, शिक्षा व चुकांकडे नकारात्मक दृष्टी यामुळे गणिताची अनाठायी भीती निर्माण होते.',
    },
    hi: {
      q: 'NCF-2005 के अनुसार छात्रों में "गणित का भय" (Math Anxiety) उत्पन्न होने का सबसे प्रमुख कारण कौन-सी कक्षा-प्रथा है?',
      opts: [
        'समयबद्ध यांत्रिक रटंत अभ्यास, त्रुटियों पर सार्वजनिक अपमान तथा केवल एक ही विधि अपनाने की कठोरता',
        'खेल, पहेलियाँ और समूह चर्चा का उपयोग',
        'एक समस्या के अनेक समाधान तरीकों की स्वीकृति',
        'स्थानीय बाज़ार से जुड़े व्यावहारिक प्रश्न पूछना',
      ],
      exp: 'यांत्रिक दबाव और त्रुटियों के प्रति कठोर रवैया गणितीय चिंता व भय को जन्म देता है।',
    },
  },
  {
    topic: 'Measuring Non-Standard to Standard Units',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'Before handing a standard centimetre ruler to Class 2 students, why should a teacher let them measure their desk using handspans and pencils first?',
      opts: [
        'So children discover why non-standard units vary from person to person and realize the NEED for a universal standard unit',
        'Because rulers are too expensive for Class 2 use',
        'To teach multiplication of fractions before length',
        'Because Maharashtra schools prohibit rulers before Class 5',
      ],
      exp: 'Experiencing variation between a teacher’s handspan and a child’s handspan creates genuine conceptual need for standard centimetres/metres.',
    },
    mr: {
      q: 'इयत्ता २ रीच्या मुलांच्या हातात प्रमाणित सेंटीमीटर पट्टी देण्याआधी शिक्षक त्यांना बाकाची लांबी वीत (Handspan) व पेन्सिलने मोजायला का सांगतात?',
      opts: [
        'प्रत्येकाची वीत वेगळी असल्याने मापे बदलतात व त्यामुळे "प्रमाणित एककाची गरज" मुलांना स्वतः जाणवते',
        'पट्टी खूप महाग असते म्हणून',
        'लांबीआधी अपूर्णांकाचा गुणाकार शिकवण्यासाठी',
        'इयत्ता ५ वीआधी पट्टी वापरण्यास बंदी आहे म्हणून',
      ],
      exp: 'अप्रमाणित साधनांतील तफावत अनुभवल्यावर प्रमाणित (Standard) एककाचे महत्त्व स्वतः लक्षात येते.',
    },
    hi: {
      q: 'कक्षा २ के छात्रों को मानक स्केल देने से पहले शिक्षक मेज़ को बालिश्त (बित्ते) व पेंसिल से क्यों नपवाते हैं?',
      opts: [
        'ताकि बच्चे व्यक्ति-दर-व्यक्ति माप भिन्न होने से "मानक इकाई की आवश्यकता" स्वयं महसूस करें',
        'क्योंकि स्केल महँगा होता है',
        'लंबाई से पहले भिन्न सिखाने हेतु',
        'कक्षा ५ से पहले स्केल वर्जित है',
      ],
      exp: 'अमानक इकाइयों की भिन्नता अनुभव करने पर मानक इकाई (सेमी/मीटर) की आवश्यकता स्पष्ट होती है।',
    },
  },
  {
    topic: 'Diagnostic vs Summative Evaluation Focus',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'What is the primary purpose of conducting a Diagnostic Test in primary mathematics?',
      opts: [
        'Pinpointing specific conceptual gaps and learning difficulties so targeted remedial teaching can be planned',
        'Ranking students for annual prize distribution',
        'Determining class promotion or detention strictly by cut-off marks',
        'Evaluating how fast students copy blackboard solutions',
      ],
      exp: 'Diagnostic tests identify *where* and *why* errors occur to guide individualized remediation, not to rank or grade.',
    },
    mr: {
      q: 'प्राथमिक गणितात "निदानात्मक चाचणी" (Diagnostic Test) घेण्यामागचा मुख्य उद्देश कोणता असतो?',
      opts: [
        'विद्यार्थ्यांच्या नेमक्या वैचारिक उणिवा व चुका शोधून त्यांवर योग्य उपचारात्मक अध्यापन नियोजित करणे',
        'वार्षिक बक्षीस समारंभासाठी गुणानुक्रम लावणे',
        'फक्त टक्केवारीवरून पुढील वर्गात प्रवेश ठरवणे',
        'फळ्यावरून उतरवून घेण्याचा वेग मोजणे',
      ],
      exp: 'निदानात्मक चाचणी गुण देण्यासाठी नसून विद्यार्थ्याचे नेमके कच्चे दुवे शोधून उपचारात्मक मार्गदर्शन करण्यासाठी असते.',
    },
    hi: {
      q: 'प्राथमिक गणित में "निदानात्मक परीक्षण" (Diagnostic Test) आयोजित करने का मुख्य उद्देश्य क्या होता है?',
      opts: [
        'विशिष्ट अवधारणात्मक कमियों एवं त्रुटि के कारणों को पहचानकर लक्षित उपचारात्मक शिक्षण की योजना बनाना',
        'वार्षिक पुरस्कार हेतु रैंक निर्धारित करना',
        'केवल उत्तीर्ण-अनुत्तीर्ण का निर्णय लेना',
        'श्यामपट्ट से नकल करने की गति मापना',
      ],
      exp: 'निदानात्मक परीक्षण का उद्देश्य अंक देना नहीं बल्कि अधिगम की कठिनाइयों का सटीक पता लगाना है।',
    },
  },
  {
    topic: 'Newman’s Error Analysis Hierarchy',
    pattern: 'Pedagogy',
    difficulty: 'Difficult',
    en: {
      q: 'In Anne Newman’s 5-step Error Analysis for math word problems, what is the VERY FIRST hurdle checked before calculation errors?',
      opts: [
        'Reading & Comprehension (whether the student can read the words and understand what the problem asks)',
        'Arithmetic computation speed',
        'Writing neat units in the final answer',
        'Drawing geometric margins',
      ],
      exp: 'Newman’s 5 steps: Reading → Comprehension → Transformation (choosing operation) → Process Skills → Encoding.',
    },
    mr: {
      q: 'शाब्दिक उदाहरणे सोडवताना होणाऱ्या चुकांच्या अभ्यासासाठी ॲन न्यूमन (Newman’s Error Analysis) पद्धतीत आकडेमोडीआधी कोणत्या पहिल्या टप्प्यांची तपासणी केली जाते?',
      opts: [
        'वाचन आणि आकलन (विद्यार्थी प्रश्न अचूक वाचून त्याचा अर्थ समजतो का?)',
        'केवळ गुणाकार-भागाकाराचा वेग',
        'उत्तरापुढे एकक लिहिणे',
        'समास आखणे',
      ],
      exp: 'न्यूमनच्या ५ पायऱ्यांत वाचन व आकलन हे आकडेमोड कौशल्यांपूर्वीचे पहिले टप्पे आहेत.',
    },
    hi: {
      q: 'इबारती प्रश्नों में न्यूमैन के त्रुटि विश्लेषण (Newman’s Error Analysis) के अंतर्गत गणना से पहले सबसे प्रथम किसकी जाँच की जाती है?',
      opts: [
        'पठन एवं बोध (क्या छात्र प्रश्न पढ़कर उसका अर्थ समझ पाया?)',
        'केवल पहाड़ों की गति',
        'उत्तर में मात्रक लिखना',
        'कॉपी की लिखावट',
      ],
      exp: 'न्यूमैन के ५ चरणों में पठन (Reading) व बोध (Comprehension) प्रक्रिया-कौशल से पहले आते हैं।',
    },
  },
  {
    topic: 'Commutative Property Concrete Discovery',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'A Class 3 teacher asks pupils to arrange 12 buttons as "3 rows of 4" and then turn the card 90° to see "4 rows of 3". This activity builds intuitive proof of:',
      opts: [
        'The Commutative Property of Multiplication (3 × 4 = 4 × 3)',
        'The Associative Property of Division',
        'Prime factorization of 12',
        'Subtraction with regrouping',
      ],
      exp: 'Rotating a rectangular array visibly proves why swapping factors preserves the total count.',
    },
    mr: {
      q: 'इयत्ता ३ रीच्या विद्यार्थ्यांनी १२ बटणे "४ च्या ३ रांगा" अशी मांडली व नंतर तीच मांडणी ९०° फिरवून "३ च्या ४ रांगा" पाहिल्या. या कृतीतून कोणता गुणधर्म प्रत्यक्ष समजतो?',
      opts: [
        'गुणाकाराचा क्रमनिरेक्ष गुणधर्म (Commutative Property: ३ × ४ = ४ × ३)',
        'भागाकाराचा सहचारी नियम',
        '१२ चे मूळ अवयव',
        'हातच्याची वजाबाकी',
      ],
      exp: 'बटणांची मांडणी फिरवल्यास एकूण संख्या १२ च राहते यातून क्रमनिरेक्ष गुणधर्म सिद्ध होतो.',
    },
    hi: {
      q: 'कक्षा ३ के छात्र १२ बटनों को "३ पंक्तियों में ४-४" रखते हैं और फिर कार्ड को ९०° घुमाकर "४ पंक्तियों में ३-३" देखते हैं। इससे किस गुण की समझ बनती है?',
      opts: [
        'गुणन का क्रम-विनिमेय नियम (Commutative Property: ३ × ४ = ४ × ३)',
        'भाग का साहचर्य नियम',
        '१२ का अभाज्य गुणनखंडन',
        'हासिल वाला घटाव',
      ],
      exp: 'आयताकार व्यूह को घुमाने पर कुल वस्तुएँ समान रहने से क्रम-विनिमेय गुण मूर्त रूप से स्पष्ट होता है।',
    },
  },
  {
    topic: 'Analytic vs Synthetic Teaching Strategy',
    pattern: 'Pedagogy',
    difficulty: 'Difficult',
    en: {
      q: 'Which statement accurately distinguishes the Analytic Method from the Synthetic Method in math instruction?',
      opts: [
        'Analytic starts from "what is to be found/proved" and works back to given data; Synthetic moves forward from given data to the conclusion',
        'Analytic forbids logical reasoning while Synthetic uses only intuition',
        'Analytic is restricted to algebra and Synthetic to arithmetic',
        'Synthetic requires no prior theorems or assumptions',
      ],
      exp: 'Analysis moves from unknown ("what do we need?") to known; Synthesis moves logically from known premises to result.',
    },
    mr: {
      q: 'गणित अध्यापनातील "विश्लेषण पद्धती" (Analytic Method) आणि "संश्लेषण पद्धती" (Synthetic Method) यांतील अचूक फरक कोणता?',
      opts: [
        'विश्लेषणात अज्ञाताकडून (साध्याकडून) ज्ञाताकडे प्रवास असतो, तर संश्लेषणात दिलेल्या ज्ञाताकडून साध्याकडे प्रवास असतो',
        'विश्लेषणात तर्कशास्त्र नसते तर संश्लेषणात फक्त अंदाज असतो',
        'विश्लेषण फक्त बीजगणितात वापरतात',
        'संश्लेषणाला कोणत्याही पूर्वज्ञानाची गरज नसते',
      ],
      exp: 'विश्लेषण पद्धतीत "काय शोधायचे आहे?" येथून मागे ज्ञात माहितीकडे जातात; संश्लेषणात ज्ञाताकडून अज्ञाताकडे जातात.',
    },
    hi: {
      q: 'गणित शिक्षण में "विश्लेषण विधि" और "संश्लेषण विधि" के बीच सटीक अंतर क्या है?',
      opts: [
        'विश्लेषण में अज्ञात (निष्कर्ष) से ज्ञात की ओर बढ़ते हैं, जबकि संश्लेषण में ज्ञात तथ्यों से अज्ञात परिणाम की ओर बढ़ते हैं',
        'विश्लेषण में तर्क का अभाव होता है',
        'विश्लेषण केवल बीजगणित तक सीमित है',
        'संश्लेषण बिना किसी ज्ञात तथ्य के प्रारंभ होता है',
      ],
      exp: 'विश्लेषण खोज का मार्ग (अज्ञात से ज्ञात) और संश्लेषण प्रस्तुति का मार्ग (ज्ञात से अज्ञात) है।',
    },
  },
  {
    topic: 'Cardinality vs Ordinality Concept Distinction',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'When a Class 1 pupil says "Meera is standing 3rd in the prayer line" versus "There are 3 pencils in my pouch", the child is using numbers respectively in which senses?',
      opts: [
        'Ordinal (rank/position) and Cardinal (total quantity)',
        'Cardinal and Nominal (label)',
        'Nominal and Ordinal',
        'Fractional and Cardinal',
      ],
      exp: 'Ordinal expresses sequence/position (1st, 2nd, 3rd); Cardinal expresses quantity ("how many").',
    },
    mr: {
      q: 'इयत्ता १ लीचा विद्यार्थी "मीरा रांगेत ३ री उभी आहे" आणि "माझ्या कंपासमध्ये ३ पेन्सिली आहेत" अशी दोन्ही वाक्ये वापरतो. यात ३ चा वापर अनुक्रमे कोणत्या अर्थाने झाला आहे?',
      opts: [
        'क्रमवाचक (Ordinal – स्थान) आणि संख्यावाचक (Cardinal – एकूण प्रमाण)',
        'संख्यावाचक आणि नामवाचक (Nominal)',
        'नामवाचक आणि क्रमवाचक',
        'अपूर्णांकात्मक आणि संख्यावाचक',
      ],
      exp: 'रांगेतील क्रमांक (३ री) = क्रमवाचक (Ordinal); एकूण वस्तू मोजणी (३ पेन्सिली) = संख्यावाचक (Cardinal).',
    },
    hi: {
      q: 'कक्षा १ का छात्र कहता है "मीरा कतार में तीसरे स्थान पर है" तथा "मेरी पेटी में ३ पेंसिल हैं"। यहाँ संख्या के किन रूपों का प्रयोग हुआ है?',
      opts: [
        'क्रमसूचक (Ordinal) तथा गणनावाचक/मात्रात्मक (Cardinal)',
        'गणनावाचक तथा नामसूचक (Nominal)',
        'नामसूचक तथा क्रमसूचक',
        'भिन्नात्मक तथा गणनावाचक',
      ],
      exp: 'स्थिति/क्रम बताना Ordinal और कुल मात्रा/गिनती बताना Cardinal संख्या बोध है।',
    },
  },
  {
    topic: 'Connecting Word Problems to Cultural Context',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'Why does NCF-2005 advocate framing primary math tasks around local farmers’ markets, cooking recipes, and bus tickets?',
      opts: [
        'Children transfer street-math intuition into formal school math and recognize mathematics as meaningful in daily life',
        'Because textbook printing costs decrease when recipes are added',
        'To prevent students from learning standard algorithms',
        'So parents can solve children’s homework effortlessly',
      ],
      exp: 'Contextualized tasks bridge informal everyday numeracy ("ethnomathematics") with formal classroom concepts.',
    },
    mr: {
      q: 'प्राथमिक गणितातील उदाहरणे स्थानिक आठवडे बाजार, पाककृती वा बस तिकिटांवर आधारित असावीत असे NCF-2005 का सुचवते?',
      opts: [
        'मुले दैनंदिन व्यवहारातील सहज गणिती जाण शालेय गणिताशी जोडून गणित अर्थपूर्ण असल्याचा अनुभव घेतात',
        'पाठ्यपुस्तक छपाईचा खर्च कमी होतो म्हणून',
        'मुलांना प्रमाणित पद्धती शिकू न देण्यासाठी',
        'पालकांनी घरचा अभ्यास स्वतः सोडवावा म्हणून',
      ],
      exp: 'व्यवहारातील अनुभवांशी जोडल्याने औपचारिक गणित अमूर्त व कंटाळवाणे न वाटता अर्थपूर्ण होते.',
    },
    hi: {
      q: 'NCF-2005 प्राथमिक गणित के प्रश्नों को स्थानीय बाज़ार, व्यंजनों और बस टिकटों से जोड़ने की अनुशंसा क्यों करता है?',
      opts: [
        'ताकि बच्चे अपने दैनिक जीवन के अनौपचारिक गणित को विद्यालयी गणित से जोड़कर सार्थक समझ बना सकें',
        'छपाई लागत कम करने के लिए',
        'मानक विधियाँ न सिखाने के लिए',
        'ताकि अभिभावक गृहकार्य हल कर सकें',
      ],
      exp: 'संदर्भित समस्याएँ दैनिक गणित और औपचारिक गणित के बीच सेतु का कार्य करती हैं।',
    },
  },
  {
    topic: 'Place Value Error: 35 Written as 305',
    pattern: 'Pedagogy',
    difficulty: 'Moderate',
    en: {
      q: 'Asked to write "Four hundred twenty-seven" in numerals, a Class 2 pupil writes "400207". What diagnosis explains this error?',
      opts: [
        'The student writes expanded verbal chunks literally side-by-side without integrating place-value columns (400 + 20 + 7)',
        'The student cannot recognize digits 4, 2, or 7',
        'The student is reversing digits right-to-left',
        'The child forgot subtraction tables',
      ],
      exp: 'Concatenating spoken words ("400" then "20" then "7") is resolved using overlapping Arrow/Montessori Place-Value Cards.',
    },
    mr: {
      q: '"चारशे सत्तावीस" ही संख्या अंकांत लिहिण्यास सांगितल्यावर इयत्ता २ रीचा मुलगा "400207" असे लिहितो. यामागील अचूक निदान कोणते?',
      opts: [
        'विद्यार्थी बोललेल्या विस्तारित रूपातील ४००, २० आणि ७ हे गट स्थानिक स्तंभांत न एकत्र करता जसेच्या तसे शेजारी लिहितो',
        'मुलास ४, २ आणि ७ हे अंक ओळखता येत नाहीत',
        'मुलगा अंक उजवीकडून डावीकडे उलटे लिहितो',
        'विद्यार्थी वजाबाकी विसरला आहे',
      ],
      exp: '४०० + २० + ७ हे एकमेकांवर ठेवणारी स्थान-मूल्य कार्डे (Arrow Cards) वापरल्यास ही चूक तात्काळ सुधारते.',
    },
    hi: {
      q: '"चार सौ सत्ताईस" लिखने को कहने पर कक्षा २ का छात्र "400207" लिखता है। इस त्रुटि का सटीक कारण क्या है?',
      opts: [
        'छात्र बोले गए विस्तारित खंडों (४००, २०, ७) को स्थानीय मान स्तंभों में समाहित किए बिना ज्यों का त्यों साथ जोड़कर लिख रहा है',
        'वह ४, २, ७ अंक नहीं पहचानता',
        'वह अंकों को उल्टा लिख रहा है',
        'वह घटाव भूल गया है',
      ],
      exp: 'ओवरलैपिंग प्लेस-वैल्यू (Arrow) कार्ड्स के अभ्यास से बच्चे विस्तारित भागों को सही स्थान पर समाहित करना सीखते हैं।',
    },
  },
  {
    topic: 'Teaching Symmetry via Paper Ink-Blot & Folding',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'Which hands-on classroom task BEST introduces the concept of "Line of Reflection Symmetry" to Class 3–4 learners?',
      opts: [
        'Folding a paper sheet in half with a paint drop inside (or cutting along a fold) and observing identical matching halves',
        'Defining axial symmetry algebraically on coordinate axes',
        'Memorizing dictionary spellings of "horizontal" and "vertical"',
        'Finding areas of irregular scalene triangles',
      ],
      exp: 'Paper folding and ink-blot/cutout activities let learners physically verify exact mirror overlap along the crease line.',
    },
    mr: {
      q: 'इयत्ता ३ री–४ थीच्या विद्यार्थ्यांना "प्रतिबिंब सममिती अक्ष" (Line of Symmetry) ही संकल्पना ओळख करून देण्यासाठी सर्वोत्तम कृती कोणती?',
      opts: [
        'कागद मधोमध दुमडून आत शाईचा थेंब टाकून दाबणे किंवा घडीवर आकार कापून दोन्ही तंतोतंत जुळणारे भाग दाखवणे',
        'निर्देशक भूमितीवरील अक्षीय समीकरणे फळ्यावर लिहिणे',
        '"क्षैतिज" व "ऊर्ध्व" या शब्दांचे स्पेलिंग पाठ करणे',
        'विषमभुज त्रिकोणाचे क्षेत्रफळ मोजणे',
      ],
      exp: 'कागद घडी व शाई-ठसा कृतीतून घडीची रेषा हा सममिती अक्ष असल्याचे प्रत्यक्ष पटते.',
    },
    hi: {
      q: 'कक्षा ३-४ के छात्रों को "दर्पण सममिति रेखा" (Line of Symmetry) की संकल्पना समझाने की सर्वोत्तम गतिविधि कौन-सी है?',
      opts: [
        'कागज को बीच से मोड़कर अंदर स्याही की बूँद दबाना या तह पर आकृति काटकर दोनों बराबर हिस्सों का मिलान दिखाना',
        'निर्देशांक ज्यामिति के समीकरण लिखवाना',
        'क्षैतिज व ऊर्ध्वाधर शब्दों की वर्तनी रटवाना',
        'विषमबाहु त्रिभुज का क्षेत्रफल निकालना',
      ],
      exp: 'कागज मोड़ने और स्याही-धब्बे की गतिविधि से सममिति अक्ष पर दोनों भागों का सटीक अध्यारोपण मूर्त रूप से दिखता है।',
    },
  },
  {
    topic: 'Gender Equity in Math Classroom',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'A primary teacher notices boys dominating board responses in mathematics while girls stay hesitant. Which action reflects sound gender-inclusive math pedagogy?',
      opts: [
        'Ensure equitable wait-time, avoid gendered problem stereotypes, and affirm every student’s problem-solving reasoning regardless of gender',
        'Assign easier arithmetic sheets to girls and harder puzzles only to boys',
        'Call exclusively on boys when visitors observe the class',
        'Tell girls mathematics is mainly meant for boys’ careers',
      ],
      exp: 'Research proves zero innate gender gap in math capability; equitable participation and affirming feedback erase classroom stereotype threat.',
    },
    mr: {
      q: 'गणिताच्या तासाला फक्त मुलेच पुढे येऊन उत्तरे देतात आणि मुली मागे राहतात असे शिक्षकाच्या लक्षात येते. सर्वसमावेशक (Gender-Inclusive) अध्यापनासाठी कोणता उपाय योग्य आहे?',
      opts: [
        'सर्वांना विचार करण्यास समान वेळ देणे, लैंगिक साचेबद्ध उदाहरणे टाळणे आणि सर्व विद्यार्थ्यांच्या तार्किक प्रयत्नांना समान प्रोत्साहन देणे',
        'मुलींना सोपे आणि मुलांना कठीण प्रश्न देणे',
        'अधिकारी पाहणीस आल्यावर फक्त मुलांनाच विचारणे',
        'गणित हे फक्त मुलांचे विषयक्षेत्र असल्याचे सांगणे',
      ],
      exp: 'समान संधी, प्रतीक्षा वेळ (Wait-time) आणि पूर्वग्रहमुक्त वातावरण यामुळे सर्व मुला-मुलींचा आत्मविश्वास वाढतो.',
    },
    hi: {
      q: 'शिक्षक देखता है कि गणित कक्षा में लड़के अधिक उत्तर देते हैं और लड़कियाँ संकोच करती हैं। समावेशी शिक्षण के लिए कौन-सा कदम सही है?',
      opts: [
        'सभी को समान प्रतीक्षा-समय (Wait-time) देना, लैंगिक रूढ़िवादी उदाहरण हटाना और सभी के तर्कों को समान प्रोत्साहन देना',
        'लड़कियों को आसान और लड़कों को कठिन प्रश्न देना',
        'निरीक्षण के समय केवल लड़कों से प्रश्न पूछना',
        'गणित को केवल लड़कों का विषय बताना',
      ],
      exp: 'समान भागीदारी और रूढ़िमुक्त प्रोत्साहन से सभी विद्यार्थियों में गणितीय आत्मविश्वास बढ़ता है।',
    },
  },
  {
    topic: 'Assessment of Conceptual vs Procedural Knowledge',
    pattern: 'Pedagogy',
    difficulty: 'Moderate',
    en: {
      q: 'Which question tests CONCEPTUAL understanding of division rather than mere procedural computation?',
      opts: [
        'Write a real-life story problem that can be solved by calculating 48 ÷ 6, and explain what the quotient 8 represents',
        'Compute 48 ÷ 6 quickly',
        'Multiply 8 × 6 mentally',
        'Copy the division table of 6 three times',
      ],
      exp: 'Generating a valid partitioning or grouping story context requires genuine conceptual grasp of what division means.',
    },
    mr: {
      q: 'खालीलपैकी कोणता प्रश्न केवळ यांत्रिक रीतीपेक्षा (Procedural) "संकल्पनात्मक आकलन" (Conceptual Understanding) तपासतो?',
      opts: [
        '४८ ÷ ६ या क्रियेवर आधारित दैनंदिन जीवनातील एक शाब्दिक उदाहरण तयार करा आणि भागाकार ८ चा अर्थ सांगा',
        '४८ ÷ ६ चा भागाकार वेगाने लिहा',
        '८ × ६ तोंडी सांगा',
        '६ चा पाढा तीन वेळा पाहून लिहा',
      ],
      exp: 'क्रियेनुसार स्वतःचे संदर्भ-उदाहरण रचण्यासाठी समान वाटणी वा गट करणे ही संकल्पना पूर्णतः समजलेली असणे आवश्यक असते.',
    },
    hi: {
      q: 'निम्न में से कौन-सा प्रश्न केवल यांत्रिक गणना के बजाय भाग की "अवधारणात्मक समझ" (Conceptual Understanding) की जाँच करता है?',
      opts: [
        '४८ ÷ ६ पर आधारित एक दैनिक जीवन का इबारती प्रश्न बनाइए और बताइए कि भागफल ८ क्या दर्शाता है',
        '४८ ÷ ६ का उत्तर शीघ्र लिखिए',
        '८ × ६ का गुणनफल बताइए',
        '६ का पहाड़ा तीन बार लिखिए',
      ],
      exp: 'किसी गणितीय संक्रिया के लिए सार्थक कहानी/संदर्भ गढ़ना उसकी गहन अवधारणात्मक समझ का प्रमाण है।',
    },
  },
  {
    topic: 'Using Cuisenaire Rods for Fraction Ratios',
    pattern: 'Pedagogy',
    difficulty: 'Moderate',
    en: {
      q: 'Colour-coded wooden rods of lengths 1 cm to 10 cm (Cuisenaire Rods) are especially powerful in Class 3–5 for:',
      opts: [
        'Exploring number bonds, equivalent fractions, and multiplicative comparisons without fixed unit labels',
        'Measuring classroom door heights in kilometres',
        'Constructing 60° angles with a protractor',
        'Reading digital 24-hour railway timetables',
      ],
      exp: 'Because any rod can temporarily act as the "whole (1)", Cuisenaire rods model relative fractional relationships fluidly.',
    },
    mr: {
      q: '१ सेमी ते १० सेमी लांबीच्या रंगीत काड्या (Cuisenaire Rods) इयत्ता ३ री ते ५ वी मध्ये कोणत्या शिक्षणासाठी विशेष उपयुक्त ठरतात?',
      opts: [
        'संख्याबंध (Number bonds), सममूल्य अपूर्णांक आणि पटीतील तुलना प्रत्यक्ष अनुभवाने समजण्यासाठी',
        'दरवाजाची उंची किलोमीटरमध्ये मोजण्यासाठी',
        'कोनमापकाने ६०° चा कोन काढण्यासाठी',
        '२४-ताशी रेल्वे वेळापत्रक वाचण्यासाठी',
      ],
      exp: 'कोणत्याही एका काडीस "पूर्ण (१)" मानून इतर काड्यांच्या मदतीने सममूल्य अपूर्णांक व पटींचे संबंध सहज स्पष्ट होतात.',
    },
    hi: {
      q: '१ से १० सेमी लंबाई की रंग-कोडित छड़ें (Cuisenaire Rods) कक्षा ३-५ में किसके शिक्षण हेतु अत्यंत उपयोगी हैं?',
      opts: [
        'संख्या-बंध, तुल्य भिन्न तथा गुणज-तुलना को मूर्त रूप से खोजने के लिए',
        'दरवाजे की ऊँचाई किलोमीटर में नापने के लिए',
        'चाँदे से ६०° का कोण बनाने के लिए',
        '२४-घंटे की समय-सारणी पढ़ने के लिए',
      ],
      exp: 'किसी भी छड़ को इकाई (१) मानकर तुलनात्मक भिन्न और संख्या संबंध अत्यंत स्पष्टता से दर्शाए जा सकते हैं।',
    },
  },
  {
    topic: 'Concrete Clock Face Teaching of Elapsed Time',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'Why do Class 4 children commonly make errors like calculating "2:40 + 30 min = 2:70"? How should teachers prevent this?',
      opts: [
        'Children apply Base-10 regrouping instead of Base-60 time trading; teach elapsed time using a geared physical clock face counting 5-minute steps',
        'Avoid adding minutes altogether until Class 7',
        'Ask students to convert every time into seconds first',
        'Replace analog clocks with calendars',
      ],
      exp: 'Base-60 carry over (60 minutes = 1 hour) clashes with ingrained Base-10 carry rules; geared clock faces make the "60 crossover at 12" visible.',
    },
    mr: {
      q: 'मुले वेळ जोडताना अनेकदा "२:४० + ३० मिनिटे = २:७०" अशी चूक का करतात आणि ती टाळण्यासाठी कोणती पद्धत सर्वोत्तम आहे?',
      opts: [
        'दशमान (Base-10) हातच्याच्या सवयीमुळे वेळेचा ६०-मिनिटांचा (Base-60) नियम विसरतात; प्रत्यक्ष फिरत्या घड्याळाच्या काट्यावर ५-५ मिनिटे मोजून १२ ओलांडणे दाखवणे',
        'इयत्ता ७ वीपर्यंत वेळेची बेरीजच शिकवू नये',
        'प्रत्येक वेळ सेकंदात रूपांतरित करण्यास सांगावे',
        'घड्याळाऐवजी दिनदर्शिका वापरावी',
      ],
      exp: 'प्रत्यक्ष घड्याळावर १२ चा आकडा ओलांडताना १ तास पूर्ण होत असल्याचे दिसल्यास ६० मिनिटे = १ तास ही कल्पना पक्की होते.',
    },
    hi: {
      q: 'बच्चे प्रायः समय जोड़ते समय "२:४० + ३० मिनट = २:७०" जैसी त्रुटि क्यों करते हैं और इसे कैसे सुधारें?',
      opts: [
        'दशमलव (आधार-१०) की आदत के कारण वे ६०-मिनट के आधार को भूल जाते हैं; गियर वाली घड़ी पर ५-५ मिनट गिनकर १२ पार करना दिखाना',
        'कक्षा ७ तक समय का जोड़ न पढ़ाएँ',
        'हर समय को पहले सेकंड में बदलवाएँ',
        'घड़ी की जगह कैलेंडर प्रयोग करें',
      ],
      exp: 'घड़ी के डायल पर ६० मिनट पूरे होकर नया घंटा शुरू होते देखने से आधार-६० का समूहन स्वतः समझ में आता है।',
    },
  },
  {
    topic: 'Math Portfolio Assessment Contents',
    pattern: 'Pedagogy',
    difficulty: 'Easy',
    en: {
      q: 'What makes a "Student Mathematics Portfolio" uniquely valuable inside Continuous Comprehensive Evaluation (CCE)?',
      opts: [
        'It showcases growth over time through varied work samples—geometric drawings, error self-corrections, project logs, and investigations',
        'It consists solely of final marks entered on a report card',
        'It replaces all teacher explanations in class',
        'It stores only neat handwriting pages with zero rough work',
      ],
      exp: 'Portfolios capture longitudinal progress, creative problem-solving, and metacognitive reflection rather than one-shot exam scores.',
    },
    mr: {
      q: 'सातत्यपूर्ण सर्वंकष मूल्यमापनात (CCE) "विद्यार्थ्यांचे गणित पोर्टफोलिओ" (Portfolio) विशेष मौल्यवान का मानले जाते?',
      opts: [
        'भौमितिक आकृत्या, स्वतः दुरुस्त केलेल्या चुका, प्रकल्प नोंदी व कृती नमुन्यांतून कालांतराने झालेली प्रगती स्पष्ट दिसते',
        'त्यात फक्त अंतिम परीक्षेचे गुण लिहिलेले असतात',
        'ते वर्गातील शिक्षकांच्या स्पष्टीकरणाची जागा घेते',
        'त्यात कच्चे काम पूर्णपणे टाळले जाते',
      ],
      exp: 'पोर्टफोलिओमुळे विद्यार्थ्याची दीर्घकालीन वैचारिक प्रगती, सर्जनशीलता व शिकण्याचा प्रवास समजतो.',
    },
    hi: {
      q: 'सतत एवं व्यापक मूल्यांकन (CCE) में "छात्र गणित पोर्टफोलियो" (Portfolio) विशेष रूप से मूल्यवान क्यों है?',
      opts: [
        'यह समय के साथ ज्यामितीय चित्रों, त्रुटि-सुधार, परियोजना लॉग और अन्वेषण कार्यों के माध्यम से प्रगति दर्शाता है',
        'इसमें केवल अंतिम परीक्षा के अंक होते हैं',
        'यह कक्षा शिक्षण को पूरी तरह समाप्त कर देता है',
        'इसमें केवल रफ-रहित साफ पन्ने रखे जाते हैं',
      ],
      exp: 'पोर्टफोलियो एकबारगी परीक्षा की बजाय विद्यार्थी की क्रमिक प्रगति और गणितीय सोच का समग्र प्रमाण प्रस्तुत करता है।',
    },
  },
  {
    topic: 'Division by Zero Conceptual Explanation',
    pattern: 'Pedagogy',
    difficulty: 'Moderate',
    en: {
      q: 'A bright Class 5 pupil asks: "If 6 ÷ 2 = 3, why isn’t 6 ÷ 0 equal to 0?" Which explanation is mathematically accurate and child-friendly?',
      opts: [
        'Connect division to repeated subtraction/inverse multiplication: no number multiplied by 0 can ever give 6 (0 × ? = 6 is impossible), so division by zero is undefined',
        'Say 6 ÷ 0 is actually 6 because zero removes nothing',
        'Reply "Just memorize it is forbidden in textbooks"',
        'Explain calculus limits in college terminology',
      ],
      exp: 'Testing the inverse multiplication check (if 6 ÷ 0 = k, then 0 × k = 6, which is impossible!) makes undefined division clear at primary level.',
    },
    mr: {
      q: 'इयत्ता ५ वीचा जिज्ञासू विद्यार्थी विचारतो, "जर ६ ÷ २ = ३, तर ६ ÷ ० बरोबर ० का नाही?" यावर गणितदृष्ट्या अचूक व सोपे स्पष्टीकरण कोणते?',
      opts: [
        'भागाकार ही गुणाकाराची उलट क्रिया आहे: ० ला कोणत्याही संख्येने गुणल्यास ६ कधीच मिळू शकत नाही (० × ? = ६ अशक्य), म्हणून शून्याने भागणे अव्याख्येय (Undefined) असते',
        'शून्याची किंमत काहीच नसल्याने ६ ÷ ० = ६ असते असे सांगावे',
        'फक्त नियमामुळे ते मनाई आहे असे म्हणून विषय टाळावा',
        'कॉलेजमधील कॅल्क्युलसची भाषा वापरावी',
      ],
      exp: 'भागाकार × भाजक = भाज्य या उलट पडताळणीने ० × उत्तर = ६ अशक्य असल्याचे मुलांना सहज कळते.',
    },
    hi: {
      q: 'कक्षा ५ का एक जिज्ञासु छात्र पूछता है: "यदि ६ ÷ २ = ३ है, तो ६ ÷ ० = ० क्यों नहीं होता?" इसका सही और सरल स्पष्टीकरण क्या है?',
      opts: [
        'भाग गुणा की विपरीत संक्रिया है: ० को किसी भी संख्या से गुणा करने पर कभी ६ नहीं मिल सकता (० × ? = ६ असंभव), अतः शून्य से भाग अपरिभाषित है',
        'शून्य कुछ नहीं घटाता इसलिए उत्तर ६ होगा',
        'कह दें कि किताबों में मना है, बस रट लो',
        'उच्च कैलकुलस की परिभाषा लिखवाएँ',
      ],
      exp: 'गुणा की विपरीत जाँच (० × भागफल = ६ संभव नहीं) प्राथमिक स्तर पर इस अवधारणा को पूर्णतः स्पष्ट करती है।',
    },
  },
  {
    topic: 'Subitizing Early Number Sense Skill',
    pattern: 'Pedagogy',
    difficulty: 'Difficult',
    en: {
      q: 'When a Class 1 child looks briefly at 4 dots arranged on a dice face and instantly recognizes "4" WITHOUT counting "1, 2, 3, 4" one by one, this foundational cognitive ability is called:',
      opts: [
        'Subitizing',
        'Seriation',
        'Transitivity',
        'Algorithmic Conservation',
      ],
      exp: 'Subitizing is the perceptual ability to instantly apprehend small quantities (1–5) visually, forming a bridge to number bonds.',
    },
    mr: {
      q: 'इयत्ता १ लीचा विद्यार्थी फाशावरील ४ ठिपके एक-एक न मोजता नजरेक्षणातच "४" ओळखतो. या प्राथमिक संख्याज्ञानाच्या क्षमतेस काय म्हणतात?',
      opts: [
        'सबिटायझिंग (Subitizing)',
        'क्रमवार मांडणी (Seriation)',
        'संक्रामकता (Transitivity)',
        'अल्गोरिदम संधारण',
      ],
      exp: '१ ते ५ पर्यंतच्या लहान समूहांची संख्या एक-एक न मोजता झटकन ओळखण्याची क्षमता म्हणजे Subitizing होय.',
    },
    hi: {
      q: 'कक्षा १ का बालक पासे पर बने ४ बिंदुओं को एक-एक गिने बिना तुरंत "४" पहचान लेता है। इस प्रारंभिक गणितीय क्षमता को क्या कहते हैं?',
      opts: [
        'सबिटाइजिंग (Subitizing)',
        'क्रमबद्धता (Seriation)',
        'संक्रामकता (Transitivity)',
        'कलनात्मक संरक्षण',
      ],
      exp: 'छोटी मात्राओं (१ से ५) को बिना एक-एक गिने दृष्टि मात्र से पहचान लेने की क्षमता Subitizing कहलाती है।',
    },
  },
  {
    topic: 'Pre-Number Concepts Sequence',
    pattern: 'Pedagogy',
    difficulty: 'Moderate',
    en: {
      q: 'Which set of Pre-Number Concepts should children master in Balvatika/Class 1 BEFORE formal addition symbols (+, =)?',
      opts: [
        'Sorting/Classification, One-to-One Correspondence, Patterning, and Seriation (big-to-small)',
        'Division, LCM, Percentages, and Averages',
        'Roman numerals up to M and Bar Graphs',
        'Coordinate axes and Prime Factorization',
      ],
      exp: 'Classifying objects, matching 1-to-1, ordering by size (seriation), and spotting patterns build readiness for formal numbers.',
    },
    mr: {
      q: 'बालवाटिका व इयत्ता १ लीमध्ये औपचारिक बेरीज चिन्हे (+, =) शिकण्याआधी मुलांमध्ये कोणत्या "संख्या-पूर्व संकल्पना" (Pre-Number Concepts) विकसित कराव्यात?',
      opts: [
        'वर्गीकरण (Sorting), एकास-एक संगती (One-to-One Correspondence), आकृतिबंध आणि क्रमवारी (लहान-मोठेपणा)',
        'भागाकार, लसावि, टक्केवारी व सरासरी',
        'रोमन अंक व स्तंभालेख',
        'निर्देशक अक्ष व मूळ अवयव',
      ],
      exp: 'वर्गीकरण, एकास-एक जुळवणी व क्रमवारी या संख्या-पूर्व अनुभवांमुळे अंकांची अर्थपूर्ण समज तयार होते.',
    },
    hi: {
      q: 'बालवाटिका/कक्षा १ में औपचारिक जोड़ (+, =) से पहले किन "संख्या-पूर्व अवधारणाओं" (Pre-Number Concepts) का विकास आवश्यक है?',
      opts: [
        'वर्गीकरण (Sorting), एक-से-एक संगति, पैटर्न तथा क्रमबद्धता (छोटा-बड़ा)',
        'भाग, ल.स., प्रतिशत और औसत',
        'रोमन अंक तथा दंड आलेख',
        'निर्देशांक अक्ष व अभाज्य गुणनखंड',
      ],
      exp: 'वर्गीकरण, एक-से-एक मिलान और क्रमबद्धता औपचारिक संख्या-ज्ञान की आवश्यक नींव हैं।',
    },
  },
];
