import { CuratedTrilingualMcq } from './types';

// MAHA TET Paper 1 (Classes 1-5) — Mathematics Pedagogy Part 3 (35 Distinct Items)
export const MAHA_TET_P1_B1_MATH_P3: CuratedTrilingualMcq[] = [
  {
    topic: 'NCF-2005 Narrow Aim vs Higher Aim of Mathematics',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'In NCF-2005’s Position Paper on Teaching of Mathematics, what distinguishes the "Narrow Aim" from the "Higher Aim"?',
      opts: [
        'Narrow aim develops useful numeracy & measurement capabilities; Higher aim develops inner resources to think, reason logically, and handle abstractions',
        'Narrow aim teaches algebra; Higher aim teaches only counting',
        'Narrow aim is for rural schools; Higher aim is for cities',
        'Narrow aim uses textbooks; Higher aim bans written tests',
      ],
      exp: 'NCF-2005 balances turning out "useful" numerate citizens (narrow aim) with cultivating the child’s mathematical mind (higher aim).',
    },
    mr: {
      q: 'NCF-2005 च्या गणित अध्यापन मसुद्यानुसार गणिताचे "संकुचित ध्येय" (Narrow Aim) आणि "उच्च ध्येय" (Higher Aim) यांतील अचूक फरक कोणता?',
      opts: [
        'संकुचित ध्येय म्हणजे उपयुक्त संख्याज्ञान व मापन कौशल्ये, तर उच्च ध्येय म्हणजे तार्किक विचार, अमूर्त संकल्पना हाताळणे व विचारांचे गणितीकरण करणे',
        'संकुचित ध्येयात बीजगणित व उच्च ध्येयात फक्त मोजणी असते',
        'संकुचित ध्येय ग्रामीण भागासाठी व उच्च ध्येय शहरांसाठी असते',
        'उच्च ध्येयात सर्व लेखी परीक्षा बंद असतात',
      ],
      exp: 'उपयुक्त व्यवहारज्ञान (संकुचित) सोबतच विचारांचे गणितीकरण घडवणे (उच्च ध्येय) हा NCF-2005 चा गाभा आहे.',
    },
    hi: {
      q: 'NCF-2005 के अनुसार गणित शिक्षण के "संकीर्ण उद्देश्य" (Narrow Aim) और "उच्च उद्देश्य" (Higher Aim) में क्या अंतर है?',
      opts: [
        'संकीर्ण उद्देश्य उपयोगी संख्यात्मक/मापन कौशल विकसित करना है, जबकि उच्च उद्देश्य तार्किक चिंतन, अमूर्तता और सोच का गणितीकरण विकसित करना है',
        'संकीर्ण में बीजगणित और उच्च में केवल गिनती आती है',
        'संकीर्ण ग्रामीण विद्यालयों व उच्च शहरी विद्यालयों के लिए है',
        'उच्च उद्देश्य में लिखित परीक्षा वर्जित है',
      ],
      exp: 'NCF-2005 उपयोगी गणना के साथ-साथ विद्यार्थी के मस्तिष्क के गणितीकरण को उच्च लक्ष्य मानता है।',
    },
  },
  {
    topic: 'Van Hiele Level 2 Informal Deduction',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 5 pupil argues: "Every square has 4 right angles and 4 equal sides, so every square MUST also be a rectangle—but a non-square rectangle is not a square." Which Van Hiele level does this represent?',
      opts: [
        'Level 2 – Informal Deduction / Abstraction (understanding class inclusion among properties)',
        'Level 0 – Visualization',
        'Level 1 – Isolated Analysis without linking shapes',
        'Level 4 – Axiomatic Rigor',
      ],
      exp: 'Recognizing subclass/inclusion relationships ("every square is a special rectangle") is the hallmark of Van Hiele Level 2.',
    },
    mr: {
      q: 'इयत्ता ५ वीची विद्यार्थिनी म्हणते, "चौरसाचे चारही कोन काटकोन असल्याने प्रत्येक चौरस हा एक प्रकारचा आयतच असतो; पण प्रत्येक आयत चौरस नसतो." हे व्हॅन हिलेच्या कोणत्या स्तराचे लक्षण आहे?',
      opts: [
        'स्तर २ – अनौपचारिक निगमन / अमूर्तीकरण (गुणधर्मांवरून वर्गातील समावेश ओळखणे)',
        'स्तर ० – दृश्यीकरण',
        'स्तर १ – गुणधर्म न जोडता केवळ विश्लेषण',
        'स्तर ४ – काटेकोर स्वयंसिद्धक पातळी',
      ],
      exp: 'एका आकृती प्रकाराचा दुसऱ्या प्रकाराशी गुणधर्मानुसार उपवर्ग संबंध जोडणे म्हणजे स्तर २ (अनौपचारिक निगमन) होय.',
    },
    hi: {
      q: 'कक्षा ५ की छात्रा तर्क देती है: "चूँकि वर्ग के चारों कोण समकोण और सम्मुख भुजाएँ बराबर हैं, इसलिए प्रत्येक वर्ग एक आयत भी है।" यह वैन हीले के किस स्तर का प्रमाण है?',
      opts: [
        'स्तर २ – अनौपचारिक निगमन (गुणधर्मों के आधार पर वर्ग-समावेशन संबंध समझना)',
        'स्तर ० – दृश्यांकन',
        'स्तर १ – केवल पृथक विश्लेषण',
        'स्तर ४ – कठोर अभिगृहीतीय स्तर',
      ],
      exp: 'आकृतियों के बीच उप-समुच्चय संबंध ("हर वर्ग एक आयत है") समझना स्तर २ की पहचान है।',
    },
  },
  {
    topic: 'Why Formal Axiomatic Proofs Are Delayed Beyond Primary',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Why does primary geometry (Classes 1–5) emphasize folding, tracing, tiling, and measuring rather than formal Euclidean deductive proofs?',
      opts: [
        'Van Hiele levels are sequential and experiential: concrete visualization & property discovery MUST precede formal deductive proofs',
        'Euclidean geometry contains errors in primary shapes',
        'Children under age 11 cannot draw straight lines',
        'Measurement is unrelated to deductive geometry',
      ],
      exp: 'Pushing Level 3 formal proofs onto Level 0–1 learners causes rote memorization instead of genuine geometric reasoning.',
    },
    mr: {
      q: 'इयत्ता १ ते ५ च्या भूमितीत औपचारिक सिद्धतांपेक्षा (Proofs) कागद घड्या, लाद्या बसवणे आणि प्रत्यक्ष मोजमाप यांवर भर का दिला जातो?',
      opts: [
        'व्हॅन हिले स्तर अनुभवाधिष्ठित क्रमाने विकसित होतात: प्रत्यक्ष दृश्यीकरण व गुणधर्म शोधानंतरच औपचारिक निगमन शक्य असते',
        'युक्लिडची भूमिती प्राथमिक आकारांसाठी चुकीची आहे',
        '११ वर्षांखालील मुले सरळ रेषा काढू शकत नाहीत',
        'मोजमापाचा भूमितीशी काही संबंध नसतो',
      ],
      exp: 'स्तर ० व १ मधील मुलांवर औपचारिक सिद्धता लादल्यास समज न होता केवळ घोकंपट्टी होते.',
    },
    hi: {
      q: 'कक्षा १-५ की ज्यामिति में औपचारिक युक्लिडीय उपपत्तियों (Proofs) की बजाय कागज मोड़ने, टाइलिंग और मापन पर बल क्यों दिया जाता है?',
      opts: [
        'वैन हीले के स्तर क्रमिक और अनुभवात्मक हैं: मूर्त दृश्यांकन व गुण-अन्वेषण के बाद ही औपचारिक निगमन संभव होता है',
        'युक्लिडीय ज्यामिति में त्रुटियाँ हैं',
        '११ वर्ष से कम बच्चे सीधी रेखा नहीं खींच सकते',
        'मापन का ज्यामिति से कोई संबंध नहीं',
      ],
      exp: 'प्रारंभिक स्तर पर मूर्त अन्वेषण के बिना औपचारिक उपपत्तियाँ थोपना केवल रटने को बढ़ावा देता है।',
    },
  },
  {
    topic: 'Area Grid (Box) Multiplication Strategy',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Teaching 23 × 14 by breaking it into a 2×2 area rectangle of (20+3) × (10+4) = 200 + 80 + 30 + 12 helps Class 4 learners understand:',
      opts: [
        'How each partial product in standard vertical multiplication originates via the Distributive Law',
        'Only how to draw squares accurately',
        'Why multiplication is always commutative only for single digits',
        'How to calculate fraction reciprocals',
      ],
      exp: 'The box/area model reveals the four hidden partial products summed inside the traditional two-digit algorithm.',
    },
    mr: {
      q: '२३ × १४ हा गुणाकार (२०+३) × (१०+४) अशा आयताकृती चौकटीत २०० + ८० + ३० + १२ असा विभागून शिकवल्याने विद्यार्थ्यांना काय स्पष्ट होते?',
      opts: [
        'पारंपरिक उभ्या गुणाकारातील प्रत्येक आंशिक गुणाकार (Partial Product) वितरण नियमातून कसा तयार होतो ते स्पष्ट होते',
        'फक्त चौरस कसे काढावेत ते समजते',
        'फक्त एक-अंकी क्रमनिरेक्षता कळते',
        'अपूर्णांकांचा गुणाकार व्यस्त कळतो',
      ],
      exp: 'चौकट/क्षेत्र मॉडेलमुळे पारंपरिक गुणाकारातील स्थानिक मूल्यांचे चार भाग स्पष्ट दिसतात.',
    },
    hi: {
      q: '२३ × १४ को (२०+३) × (१०+४) आयताकार बॉक्स विधि से २०० + ८० + ३० + १२ में बाँटकर सिखाने से छात्रों को क्या समझ आता है?',
      opts: [
        'मानक ऊर्ध्वाधर गुणा में आने वाले प्रत्येक आंशिक गुणनफल (Partial Product) तथा वितरण नियम का वास्तविक आधार',
        'केवल वर्ग बनाना',
        'केवल एक-अंकीय गुणा',
        'भिन्नों का व्युत्क्रम',
      ],
      exp: 'क्षेत्रफल/बॉक्स प्रतिमान पारंपरिक कलन-विधि के पीछे छिपे आंशिक गुणनफलों को दृश्य बनाता है।',
    },
  },
  {
    topic: 'Partitive vs Quotitive Division Word Models',
    pattern: 'Pedagogical',
    difficulty: 'Difficult',
    en: {
      q: '"Share 24 laddoos equally among 6 plates" vs "Pack 24 laddoos into boxes holding 6 laddoos each." Both use 24 ÷ 6, yet represent which two division models?',
      opts: [
        'Equal Sharing (Partitive) and Equal Grouping / Repeated Subtraction (Quotitive)',
        'Multiplicative Scaling and Fraction Reciprocal',
        'Additive Compensation and Rounding',
        'Commutative and Associative Division',
      ],
      exp: 'Equal sharing finds group size (4 per plate); Equal grouping finds how many groups of 6 can be made (4 boxes).',
    },
    mr: {
      q: '"२४ लाडू ६ ताटांत समान वाटा" आणि "प्रत्येकी ६ लाडू मावणारे किती डबे भरतील?" या दोन्हीसाठी २४ ÷ ६ हीच क्रिया वापरतात; परंतु ही दोन कोणती भागाकार रूपे आहेत?',
      opts: [
        'समान वाटणी (Sharing / Partitive) आणि समान गट पाडणे / पुनरावृत्त वजाबाकी (Grouping / Quotitive)',
        'पटीतील वाढ व गुणाकार व्यस्त',
        'बेरजेची भरपाई व अंदाजन',
        'क्रमनिरेक्ष व सहचारी भागाकार',
      ],
      exp: 'एका प्रकारात गटाचा आकार शोधतात (वाटणी) तर दुसऱ्यात एकूण किती गट बनतील हे शोधतात (गट पाडणे).',
    },
    hi: {
      q: '"२४ लड्डू ६ थालियों में बराबर बाँटें" और "एक डिब्बे में ६ लड्डू आते हैं तो कितने डिब्बे भरेंगे?"—दोनों २४ ÷ ६ से हल होते हैं, पर ये भाग के किन दो मॉडलों को दर्शाते हैं?',
      opts: [
        'समान बँटवारा (Partitive Sharing) तथा समान समूहीकरण / बार-बार घटाव (Quotitive Grouping)',
        'गुणनात्मक पैमाना तथा व्युत्क्रम',
        'क्षतिपूर्ति तथा सन्निकटन',
        'क्रम-विनिमेय एवं साहचर्य भाग',
      ],
      exp: 'बँटवारा मॉडल में प्रति समूह संख्या निकालते हैं और समूहीकरण मॉडल में समूहों की संख्या निकालते हैं।',
    },
  },
  {
    topic: 'Empirical Measurement vs Logical Deduction Limits',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'When students verify that "two triangles fit together to form a rectangle" by cutting and overlapping paper shapes, what limitation should the teacher gently highlight by Class 5?',
      opts: [
        'Scissors and rulers carry minor physical measurement error, whereas logical reasoning guarantees exactness for ALL triangles of that class',
        'Paper models are completely useless for learning geometry',
        'Measuring with rulers is always exact to infinite precision',
        'Only compasses should ever be touched in primary school',
      ],
      exp: 'Hands-on verification builds intuition and conjecture, while teachers gradually bridge learners toward why physical tools approximate.',
    },
    mr: {
      q: 'कागदी त्रिकोण कापून जुळवून पाहिल्यावर इयत्ता ५ वीच्या स्तरावर शिक्षकांनी प्रत्यक्ष मोजमापाच्या कोणत्या मर्यादेची सौम्य जाणीव करून द्यावी?',
      opts: [
        'कापण्यात व पट्टीने मोजण्यात सूक्ष्म प्रत्यक्ष त्रुटी राहू शकते, पण तार्किक गुणधर्मामुळे तो नियम सर्वच अशा आकृत्यांना तंतोतंत लागू पडतो',
        'कागदी प्रतिकृती भूमिती शिकण्यास पूर्णतः निरुपयोगी असतात',
        'पट्टीने घेतलेले माप नेहमी अनंत अचूक असते',
        'प्राथमिक शाळेत फक्त कंपास वापरावा',
      ],
      exp: 'प्रत्यक्ष कृतीतून नियम सुचतो (Conjecture), तर तर्कशास्त्रातून त्याची सार्वत्रिक अचूकता स्पष्ट होते.',
    },
    hi: {
      q: 'कागज के त्रिभुज काटकर जोड़ने के बाद कक्षा ५ स्तर पर शिक्षक को प्रत्यक्ष मापन की किस सीमा का बोध कराना चाहिए?',
      opts: [
        'काटने-नापने में सूक्ष्म भौतिक त्रुटि संभव है, जबकि तार्किक गुणधर्म उस वर्ग की सभी आकृतियों के लिए सर्वत्र सत्य रहते हैं',
        'कागज के मॉडल बिल्कुल व्यर्थ हैं',
        'स्केल से मापन सदैव पूर्णतः त्रुटिरहित होता है',
        'केवल परकार का प्रयोग होना चाहिए',
      ],
      exp: 'प्रयोग से अनुमान (Conjecture) जन्म लेता है और तर्क से उसकी सार्वभौमिक सत्यता सिद्ध होती है।',
    },
  },
  {
    topic: 'Vygotsky ZPD Scaffolding in Word Problems',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 3 student freezes on a multi-step story problem. Instead of giving the answer, the teacher asks: "Can you draw bar boxes showing the two amounts first?" This illustrates:',
      opts: [
        'Scaffolding inside the learner’s Zone of Proximal Development (ZPD)',
        'Operant conditioning punishment',
        'Summative grade reduction',
        'Rote algorithmic dictation',
      ],
      exp: 'Providing a structured visual cue (bar diagram prompt) scaffolds just enough support for the learner to solve the rest independently.',
    },
    mr: {
      q: 'दोन-पायरी शाब्दिक उदाहरणावर विद्यार्थी अडखळतो तेव्हा शिक्षक थेट उत्तर न सांगता विचारतात, "आपण आधी दोन्ही रकमांची पट्टी-चित्र मांडणी करून पाहूया का?" हे कशाचे उदाहरण आहे?',
      opts: [
        'समीपस्थ विकास क्षेत्रातील (ZPD) आधारभूत साहाय्य (Scaffolding)',
        'शिक्षात्मक अनुबंधन',
        'अंतिम गुण कपात',
        'तोंडपाठ श्रुतलेखन',
      ],
      exp: 'योग्य वेळी नेमके आधारभूत मार्गदर्शन (Scaffolding) दिल्याने विद्यार्थी स्वतः पुढची पायरी यशस्वीपणे सोडवतो.',
    },
    hi: {
      q: 'दो-चरणीय इबारती प्रश्न पर अटकने पर शिक्षक उत्तर बताने की बजाय पूछते हैं: "क्या हम पहले दोनों राशियों के पट्टी-चित्र बना सकते हैं?" यह किसका उदाहरण है?',
      opts: [
        'समीपस्थ विकास क्षेत्र (ZPD) के अंतर्गत पाड़/सहारा (Scaffolding)',
        'दंडात्मक अनुबंधन',
        'योगात्मक अंक कटौती',
        'यांत्रिक श्रुतलेख',
      ],
      exp: 'उचित संकेत देकर छात्र को स्वयं समाधान तक पहुँचाना Vygotsky का Scaffolding सिद्धांत है।',
    },
  },
  {
    topic: 'Calendar 2×2 & 3×3 Grid Pattern Discovery',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Asking Class 4 learners to draw a 2×2 box around four calendar dates (e.g., 8, 9 above 15, 16) and notice that 8 + 16 = 9 + 15 cultivates:',
      opts: [
        'Algebraic thinking—spotting invariant numerical structure (+1 across, +7 down) inside everyday calendars',
        'Memorizing public holidays',
        'Converting Gregorian months into lunar years',
        'Calculating leap year centuries only',
      ],
      exp: 'Recognizing that diagonal sums always balance (x + (x+8) = (x+1) + (x+7)) seeds generalized algebraic reasoning.',
    },
    mr: {
      q: 'दिनदर्शिकेवर २×२ चौकट काढून (उदा. ८, ९ आणि खाली १५, १६) तिरक्या संख्यांची बेरीज समान (८ + १६ = ९ + १५) येण्याचे कोडे सोडवण्याने कोणती क्षमता वाढते?',
      opts: [
        'प्रारंभिक बीजगणितीय विचार (आडवे +१ व उभे +७ या नियमित रचनेचे आकलन)',
        'सुट्ट्यांचे दिवस तोंडपाठ होणे',
        'चांद्रमास रूपांतरण',
        'फक्त शतक लीप वर्षाची गणना',
      ],
      exp: 'संख्यांमधील स्थिर आकृतिबंध ओळखणे व सामान्यीकरण करणे हे शालेय बीजगणिताचा पाया आहे.',
    },
    hi: {
      q: 'कैलेंडर पर २×२ बॉक्स (जैसे ८, ९ और नीचे १५, १६) बनाकर तिरछे योग बराबर (८+१६ = ९+१५) खोजना किस कौशल को विकसित करता है?',
      opts: [
        'प्रारंभिक बीजगणितीय चिंतन (क्षैतिज +१ व ऊर्ध्वाधर +७ के नियमित पैटर्न की खोज)',
        'अवकाश दिवस याद करना',
        'चंद्र माह गणना',
        'केवल शताब्दी वर्ष पहचान',
      ],
      exp: 'दैनिक कैलेंडर में छिपे गणितीय संबंधों को खोजना बीजगणितीय सामान्यीकरण की नींव रखता है।',
    },
  },
  {
    topic: 'Equal Sign Relational Meaning Error',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'When given "8 + 4 = ___ + 5", many primary children fill the blank with "12" (or "17"). What misconception causes this, and what fixes it?',
      opts: [
        'Viewing "=" as an operational "do something / write answer next" trigger rather than "both sides balance"; fix using a pan balance scale',
        'Forgetting that 8 + 4 equals 12',
        'Misreading the digit 5 as 2',
        'Lack of knowledge of division tables',
      ],
      exp: 'Children often misread "=" as "gives answer". A physical two-pan balance proves "=" means equal weight on left and right sides.',
    },
    mr: {
      q: '"८ + ४ = ___ + ५" या रिकाम्या जागी अनेक मुले "१२" (किंवा "१७") लिहितात. या चुकीमागील कारण व उपाय कोणता?',
      opts: [
        '"=" चिन्ह म्हणजे "पुढे उत्तर लिहा" अशी कृती मानणे ("दोन्ही बाजू समान" ही कल्पना नसणे); दोन पारड्यांच्या तराजूच्या उपमा व कृतीतून दुरुस्ती करणे',
        '८ + ४ = १२ येत नसणे',
        '५ हा अंक २ वाचणे',
        'भागाकाराचा पाढा न येणे',
      ],
      exp: 'बरोबर चिन्हाचा "समतोल संबंध" (Relational Meaning) तराजूच्या दोन्ही पारड्यांतील समतोल उदाहरणातून पक्का होतो.',
    },
    hi: {
      q: '"८ + ४ = ___ + ५" में अनेक छात्र खाली स्थान पर "१२" या "१७" भर देते हैं। इस त्रुटि का कारण व समाधान क्या है?',
      opts: [
        '"=" को "दोनों पक्ष बराबर" समझने की बजाय केवल "उत्तर लिखने का चिह्न" मानना; दो पलड़ों वाले तराजू के संतुलन उदाहरण से इसे सुधारना',
        '८ + ४ = १२ न आना',
        '५ को २ पढ़ लेना',
        'भाग न आना',
      ],
      exp: 'तराजू के संतुलन से "=" का संबंधपरक अर्थ (Relational Equality) स्पष्ट होता है जो आगे बीजगणित में अनिवार्य है।',
    },
  },
  {
    topic: 'Broken Ruler Measurement Activity Purpose',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'A teacher deliberately gives Class 4 students a broken ruler starting at the 3 cm mark and asks them to measure a 5.5 cm pencil (ending at 8.5 cm). Why is this a great formative task?',
      opts: [
        'It checks whether learners understand length as counted unit intervals (8.5 − 3 = 5.5 cm) rather than mechanically reading the endpoint number',
        'Because the school lacks intact plastic rulers',
        'To force decimal division practice',
        'To discourage measuring starting from zero',
      ],
      exp: 'Students who shout "8.5 cm!" reveal they read ruler numbers blindly instead of counting spaces/intervals.',
    },
    mr: {
      q: 'शिक्षक विद्यार्थ्यांना ३ सेमीपासून सुरू होणारी तुटलेली पट्टी देऊन ५.५ सेमी पेन्सिल मोजायला सांगतात (शेवट ८.५ सेमीवर येतो). हा आकारिक प्रश्न का महत्त्वाचा आहे?',
      opts: [
        'मुले शेवटचा आकडा यांत्रिकपणे (८.५ सेमी) वाचतात की अंतर-एककांची मोजणी (८.५ − ३ = ५.५ सेमी) समजतात हे नेमके तपासता येते',
        'शाळेत पूर्ण पट्ट्या नसल्याने',
        'दशांश भागाकार शिकवण्यासाठी',
        'शून्यापासून मोजण्याची सवय मोडण्यासाठी',
      ],
      exp: 'लांबी म्हणजे शेवटचा आकडा नसून सुरुवातीपासून शेवटपर्यंतची समान एकक अंतरे मोजणे होय हे तुटलेल्या पट्टीच्या प्रश्नातून तपासले जाते.',
    },
    hi: {
      q: 'शिक्षक छात्रों को ३ सेमी से शुरू होने वाला टूटा हुआ स्केल देकर ५.५ सेमी की पेंसिल (८.५ सेमी तक) नपवाते हैं। यह रचनात्मक जाँच क्यों उपयोगी है?',
      opts: [
        'यह परखता है कि छात्र अंतिम अंक (८.५) को आँख मूँदकर पढ़ते हैं या इकाई-अंतरालों की गणना (८.५ − ३ = ५.५ सेमी) समझते हैं',
        'विद्यालय में पूरे स्केल नहीं हैं',
        'दशमलव भाग सिखाने हेतु',
        'शून्य से नापना छुड़ाने हेतु',
      ],
      exp: 'टूटे हुए स्केल का कार्य यह जाँचता है कि बच्चे लंबाई को शून्य से अंतिम चिह्न की बजाय अंतरालों की गिनती के रूप में समझते हैं।',
    },
  },
  {
    topic: 'Tessellation Polygons Classroom Exploration',
    pattern: 'Pedagogical',
    difficulty: 'Difficult',
    en: {
      q: 'During a Class 5 floor-tiling activity using cutout cardboard shapes, learners discover equilateral triangles, squares, and regular hexagons cover a flat sheet without gaps, while regular pentagons leave gaps. Why?',
      opts: [
        'Interior angles of triangles (60°), squares (90°), and hexagons (120°) divide 360° evenly at a vertex, whereas pentagon’s 108° leaves a 36° gap',
        'Pentagons are always smaller in perimeter',
        'Triangles have fewer sides than squares',
        'Hexagons only tile vertically on walls',
      ],
      exp: '3 × 108° = 324°, leaving a 36° wedge gap—experientially connecting polygon angles with real tiling patterns.',
    },
    mr: {
      q: 'फरशीच्या लाद्या जुळवताना (Tessellation) समभुज त्रिकोण, चौरस व समषट्कोण यांत फट न राहता लादी पूर्ण जुळते; पण समपंचकोनात फट का उरते हे कृतीतून मुलांना कळते कारण:',
      opts: [
        'त्रिकोण (६०°), चौरस (९०°) व षट्कोन (१२०°) यांचे कोन ३६०° ला पूर्ण भागतात, परंतु पंचकोनाचा १०८° कोन ३६०° पूर्ण करत नाही (३२४° नंतर ३६° फट उरते)',
        'पंचकोनाची परिमिती लहान असते',
        'त्रिकोणाला बाजू कमी असतात',
        'षट्कोन फक्त भिंतीवर लावतात',
      ],
      exp: 'एका शिरोबिंदूभोवती ३६०° पूर्ण भरणाऱ्या आकारांचीच फटविरहित लादी रचना (Tessellation) होते.',
    },
    hi: {
      q: 'टाइलिंग गतिविधि में छात्र पाते हैं कि समबाहु त्रिभुज, वर्ग व समषट्भुज बिना खाली जगह के तल ढक लेते हैं, पर समपंचभुज में खाली स्थान बचता है। क्यों?',
      opts: [
        '६०°, ९०° व १२०° कोण शीर्ष पर ३६०° को पूर्ण करते हैं, जबकि पंचभुज का १०८° कोण ३६०° का विभाजक नहीं है (३ × १०८° = ३२४°)',
        'पंचभुज का परिमाप छोटा होता है',
        'त्रिभुज में कम भुजाएँ हैं',
        'षट्भुज केवल दीवार पर लगते हैं',
      ],
      exp: 'एक बिंदु के चारों ओर कोणों का योग ३६०° होने पर ही अंतराल-रहित टाइलिंग (Tessellation) संभव होती है।',
    },
  },
  {
    topic: 'Trailing Zeroes in Decimals Understanding (0.3 vs 0.30)',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Some Class 5 students argue "0.30 is ten times bigger than 0.3 because 30 is bigger than 3." How do you disprove this misconception visually?',
      opts: [
        'Shade 3 full tenth-columns out of 10 on Grid A (0.3) alongside 30 tiny squares out of 100 on an identical-sized Grid B (0.30), showing exact equal area',
        'Write 0.30 = 0.3 on the chalkboard ten times',
        'Skip decimals and teach negative numbers',
        'Say trailing zeroes only change money values',
      ],
      exp: 'Seeing 3/10 of a 10×10 square cover the EXACT same shaded region as 30/100 eliminates whole-number overgeneralization.',
    },
    mr: {
      q: '"३ पेक्षा ३० मोठे असल्याने ०.३ पेक्षा ०.३० मोठा असतो" असा गैरसमज दृश्य पद्धतीने कसा दूर कराल?',
      opts: [
        'समान आकाराच्या जाळीवर १० उभ्या पट्ट्यांपैकी ३ पट्ट्या (०.३) आणि १०० लहान चौकोनांपैकी ३० चौकोन (०.३०) रंगवून दोन्ही व्यापलेले क्षेत्र तंतोतंत सारखे दाखवणे',
        'फळ्यावर ०.३० = ०.३ दहा वेळा लिहिणे',
        'दशांश सोडून ऋण संख्या शिकवणे',
        'शेवटचा शून्य फक्त पैशांत बदल करतो असे सांगणे',
      ],
      exp: '३ दशांश व ३० शतांश हे समान क्षेत्रफळ व्यापतात हे जाळीवरील रंगाने तात्काळ पटते.',
    },
    hi: {
      q: 'कुछ छात्र मानते हैं "३० बड़ा है इसलिए ०.३ से ०.३० बड़ा होगा"। इसे दृश्य रूप से कैसे दूर करेंगे?',
      opts: [
        'समान आकार के ग्रिड पर १० पट्टियों में से ३ (०.३) तथा १०० वर्गों में से ३० (०.३०) रंगकर दोनों का बराबर छायांकित भाग दिखाना',
        'श्यामपट्ट पर ०.३० = ०.३ दस बार लिखवाना',
        'दशमलव छोड़कर ऋणात्मक संख्या सिखाना',
        'अंत के शून्य को अनदेखा करने को कहना',
      ],
      exp: 'समान वर्ग ग्रिड पर ३/१० और ३०/१०० का क्षेत्रफल हूबहू बराबर दिखना इस भ्रम को पूरी तरह मिटाता है।',
    },
  },
  {
    topic: '"Multiplication Always Makes Larger" Misconception',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Whole-number multiplication drills often leave students believing "multiplying ALWAYS makes a number bigger." Which counter-example activity breaks this false generalization in Class 5?',
      opts: [
        'Asking students to find 12 × 1 = 12 and 12 × 1/2 = 6 (half of 12 is smaller than 12!)',
        'Giving only problems like 25 × 40 and 18 × 15',
        'Prohibiting fraction multiplication until Class 9',
        'Drilling addition tables instead',
      ],
      exp: 'Comparing ×2 (doubles), ×1 (unchanged), and ×1/2 (halves) demonstrates how multiplier size below 1 shrinks the product.',
    },
    mr: {
      q: '"गुणाकार केल्याने संख्या नेहमीच मोठी होते" हा अपूर्ण समज इयत्ता ५ वीत कोणत्या प्रतिउदाहरणाने (Counter-example) दूर करावा?',
      opts: [
        '१२ × १ = १२ आणि १२ × १/२ = ६ (म्हणजे १ पेक्षा लहान अपूर्णांकाने गुणल्यास उत्तर लहान येते!) हे प्रत्यक्ष उदाहरणातून दाखवणे',
        'फक्त २५ × ४० आणि १८ × १५ अशीच उदाहरणे देणे',
        'इयत्ता ९ वीपर्यंत अपूर्णांक गुणाकार टाळणे',
        'केवळ बेरजेचा सराव घेणे',
      ],
      exp: '१ पेक्षा लहान धन अपूर्णांकाने गुणल्यास मूळ संख्येचा भाग मिळतो व गुणाकार लहान होतो हे दाखवणे आवश्यक आहे.',
    },
    hi: {
      q: '"गुणा करने पर संख्या सदैव बड़ी होती है"—इस गलत सामान्यीकरण को कक्षा ५ में किस प्रत्युदाहरण (Counter-example) से तोड़ा जा सकता है?',
      opts: [
        '१२ × १ = १२ तथा १२ × १/२ = ६ दिखाकर स्पष्ट करना कि १ से छोटे भिन्न से गुणा करने पर परिणाम छोटा हो जाता है',
        'केवल २५ × ४० जैसे पूर्ण संख्या के प्रश्न देना',
        'कक्षा ९ तक भिन्न का गुणा न पढ़ाना',
        'केवल जोड़ का अभ्यास कराना',
      ],
      exp: '१ से छोटे धनात्मक भिन्न (जैसे १/२) से गुणा करने पर गुणनफल घटता है—यह अनुभव बच्चों की संकीर्ण धारणा सुधारता है।',
    },
  },
  {
    topic: '5E Constructivist Learning Cycle in Math',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'In the constructivist 5E Instructional Model applied to primary geometry, what happens during the "Explore" phase?',
      opts: [
        'Students actively manipulate shapes, measure, test conjectures, and observe patterns hands-on BEFORE formal definitions are given',
        'Teacher delivers a 30-minute formal definition lecture first',
        'Students take a timed final grading test',
        'Teacher solves all homework exercises on the board',
      ],
      exp: '5E sequence: Engage → Explore (hands-on discovery) → Explain (formalizing student findings) → Elaborate → Evaluate.',
    },
    mr: {
      q: 'रचनावादातील (Constructivism) ५E अध्यापन प्रतिमानातील "शोध / अन्वेषण" (Explore) या टप्प्यात वर्गात काय घडते?',
      opts: [
        'औपचारिक व्याख्या सांगण्याआधी विद्यार्थी प्रत्यक्ष आकार हाताळतात, मोजतात, अंदाज पडताळतात आणि आकृतिबंधांचे निरीक्षण करतात',
        'शिक्षक आधी ३० मिनिटे व्याख्यान व व्याख्या लिहून देतात',
        'विद्यार्थी अंतिम गुणांकनाची चाचणी देतात',
        'शिक्षक सर्व गृहपाठ फळ्यावर सोडवून देतात',
      ],
      exp: '५E मधील Explore टप्प्यात प्रत्यक्ष कृतीतून अनुभव व निरीक्षण केल्यावरच Explain टप्प्यात औपचारिक नावे/संकल्पना येतात.',
    },
    hi: {
      q: 'रचनावादी ५E शिक्षण प्रतिमान के "अन्वेषण" (Explore) चरण में प्राथमिक गणित कक्षा में क्या होता है?',
      opts: [
        'औपचारिक परिभाषा देने से पहले छात्र स्वयं आकृतियों को छूकर, मापकर और अनुमान परखकर पैटर्न खोजते हैं',
        'शिक्षक पहले ३० मिनट परिभाषाएँ लिखवाते हैं',
        'अंतिम मूल्यांकन परीक्षा ली जाती है',
        'शिक्षक सारा गृहकार्य बोर्ड पर हल कर देते हैं',
      ],
      exp: 'Explore चरण में प्रत्यक्ष हस्त-चालन एवं खोज के बाद ही Explain चरण में औपचारिक शब्दावली जोड़ी जाती है।',
    },
  },
  {
    topic: 'Meaningful Practice vs Mechanical Drill',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'How does "meaningful mathematical practice" differ from "mindless mechanical drill"?',
      opts: [
        'Meaningful practice uses varied contexts, pattern discussions, and number strategies, whereas mindless drill repeats identical steps without thinking',
        'Meaningful practice forbids solving more than one problem per week',
        'Mechanical drill develops creative open-ended reasoning best',
        'There is zero difference between the two',
      ],
      exp: 'Purposeful spaced practice deepens fluency alongside conceptual insight rather than numb repetition.',
    },
    mr: {
      q: '"अर्थपूर्ण सराव" (Meaningful Practice) हा "यांत्रिक घोकंपट्टीच्या सरावापेक्षा" (Mindless Drill) वेगळा कसा असतो?',
      opts: [
        'अर्थपूर्ण सरावात विविध संदर्भ, आकृतिबंध चर्चा व विविध युक्त्यांचा विचार असतो, तर यांत्रिक सरावात विचार न करता तेच ते टप्पे गिरवले जातात',
        'अर्थपूर्ण सरावात आठवड्यातून फक्त एकच उदाहरण देतात',
        'यांत्रिक सरावाने सर्जनशीलता सर्वाधिक वाढते',
        'दोन्हींमध्ये कोणताही फरक नाही',
      ],
      exp: 'विविधीकरण व कारणमीमांसेसह केलेला सराव संकल्पना पक्की करतो; यांत्रिक पुनरावृत्ती लवकर विसरली जाते.',
    },
    hi: {
      q: '"सार्थक अभ्यास" (Meaningful Practice) "यांत्रिक रटंत अभ्यास" (Mindless Drill) से किस प्रकार भिन्न है?',
      opts: [
        'सार्थक अभ्यास में विविध संदर्भ, पैटर्न चर्चा और रणनीतियों पर विचार होता है, जबकि यांत्रिक अभ्यास बिना सोचे एक ही प्रक्रिया दोहराता है',
        'सार्थक अभ्यास में सप्ताह में केवल एक प्रश्न हल होता है',
        'यांत्रिक अभ्यास सृजनात्मकता बढ़ाता है',
        'दोनों बिल्कुल एक जैसे हैं',
      ],
      exp: 'सार्थक अभ्यास समझ के साथ दक्षता बढ़ाता है, न कि बिना अर्थ की यांत्रिक आवृत्ति।',
    },
  },
  {
    topic: 'Classroom Data Collection Survey Project',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'To make "Data Handling & Pictographs" genuinely meaningful for Class 3 students, what should the teacher have them tally first?',
      opts: [
        'Live classroom data collected by students themselves—such as birthdays by month, modes of travel to school, or favourite fruits',
        'Foreign stock-market quarterly tables copied from newspapers',
        'Fictional tables containing 6-digit populations in Europe',
        'Abstract probability percentages',
      ],
      exp: 'Surveying their own classmates gives authentic ownership over data collection, tallying, and visual bar/pictograph display.',
    },
    mr: {
      q: 'इयत्ता ३ रीच्या विद्यार्थ्यांना "माहितीचे व्यवस्थापन व चित्रालेख" (Data Handling) अर्थपूर्ण वाटावे म्हणून सुरुवात कोणत्या माहितीच्या नोंदीने करावी?',
      opts: [
        'विद्यार्थ्यांनी स्वतः वर्गातून गोळा केलेली माहिती—जसे वाढदिवसाचा महिना, शाळेत येण्याचे साधन किंवा आवडते फळ',
        'वर्तमानपत्रातील विदेशी शेअर बाजाराचे तक्ते',
        'युरोपातील शहरांची काल्पनिक ६-अंकी लोकसंख्या',
        'अमूर्त संभाव्यता टक्केवारी',
      ],
      exp: 'स्वतःच्या वर्गातील मित्रांची माहिती मोजून तक्ता व चित्रालेख बनवल्यास माहिती-विश्लेषणाचा अर्थ प्रत्यक्ष जाणवतो.',
    },
    hi: {
      q: 'कक्षा ३ के छात्रों के लिए "आँकड़ों का प्रबंधन एवं चित्रालेख" को सार्थक बनाने हेतु सबसे पहले किस डेटा से शुरुआत करनी चाहिए?',
      opts: [
        'छात्रों द्वारा स्वयं कक्षा से एकत्रित वास्तविक डेटा—जैसे जन्म माह, स्कूल आने का साधन या पसंदीदा फल',
        'विदेशी शेयर बाजार की सारणियाँ',
        'काल्पनिक ६-अंकीय जनसंख्या आँकड़े',
        'प्रायिकता के कठिन प्रतिशत',
      ],
      exp: 'स्वयं के सहपाठियों से सर्वेक्षण कर टैली व चित्रालेख बनाना डेटा-समझ को जीवंत बनाता है।',
    },
  },
  {
    topic: 'Mental Math Strategy: Dividing by Factors',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Helping Class 5 learners compute 240 ÷ 12 mentally as "(240 ÷ 2) ÷ 6" or "(240 ÷ 4) ÷ 3" builds fluency in:',
      opts: [
        'Factor-decomposition mental arithmetic strategies',
        'Rounding every dividend down to 0',
        'Roman numeral subtraction',
        'Blind reliance on long division brackets',
      ],
      exp: 'Splitting a composite divisor into simple mental factors promotes strategic flexibility.',
    },
    mr: {
      q: '२४० ÷ १२ हा भागाकार तोंडी करताना "(२४० ÷ २) ÷ ६" किंवा "(२४० ÷ ४) ÷ ३" अशी रीत शिकवल्याने कोणते कौशल्य वाढते?',
      opts: [
        'अवयव-विभागणी आधारित लवचिक तोंडी गणित रणनीती (Factor Decomposition Strategy)',
        'भाज्याचा अंदाज शून्य करणे',
        'रोमन संख्या वजाबाकी',
        'केवळ दीर्घ भागाकार चौकटीवर अवलंबून राहणे',
      ],
      exp: 'संयुक्त भाजकाचे सोपे अवयव पाडून टप्प्याटप्प्याने भागणे ही अत्यंत प्रभावी तोंडी गणित युक्ती आहे.',
    },
    hi: {
      q: '२४० ÷ १२ को मन में "(२४० ÷ २) ÷ ६" या "(२४० ÷ ४) ÷ ३" के रूप में हल करना किस कौशल को बढ़ाता है?',
      opts: [
        'गुणनखंड-विभाजन आधारित लचीली मानसिक गणना रणनीति',
        'शून्य में सन्निकटन',
        'रोमन अंक घटाव',
        'केवल लंबी भाग विधि पर निर्भरता',
      ],
      exp: 'भाजक के छोटे गुणनखंड करके क्रमशः भाग देना मानसिक गणित की चपलता विकसित करता है।',
    },
  },
  {
    topic: 'Visual Dot Arrays for Odd + Odd = Even Proof',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'How can a Class 4 teacher help pupils SEE why "any two odd numbers always add up to an even number" without using algebra (2n+1)?',
      opts: [
        'Build two L-shaped double-row dot strips each having one "extra odd dot sticking out"; push them together so the two stray dots pair up cleanly!',
        'State "(2a+1) + (2b+1) = 2(a+b+1)" on the blackboard',
        'Ask students to memorize "Odd + Odd = Even" fifty times',
        'Restrict examples only to 3 + 5 = 8',
      ],
      exp: 'Visualizing odd numbers as paired rows + 1 leftover dot visibly proves the two leftover dots form a pair!',
    },
    mr: {
      q: '(2n+1) सारख्या बीजगणिताशिवाय इयत्ता ४ थीच्या मुलांना "दोन विषम संख्यांची बेरीज नेहमी सम असते" हे कसे पटवून द्यावे?',
      opts: [
        'जोड्या करून १ ठिपका बाहेर राहिलेल्या दोन विषम ठिपक्यांच्या पट्ट्या जवळ आणल्यास ते दोन सुटे ठिपके मिळून नवी जोडी बनते हे दाखवून',
        'फळ्यावर (2a+1) + (2b+1) समीकरण लिहून',
        '"विषम + विषम = सम" हे वाक्य पन्नास वेळा म्हणायला लावून',
        'फक्त ३ + ५ = ८ पुरते मर्यादित राहून',
      ],
      exp: 'जोडीत न बसलेले दोन सुटे ठिपके एकत्र येऊन पूर्ण जोडी बनवतात हा प्रत्यक्ष दृश्य पुरावा अत्यंत प्रभावी ठरतो.',
    },
    hi: {
      q: '(2n+1) जैसे बीजगणित के बिना कक्षा ४ के बच्चों को यह कैसे दिखाएँ कि "दो विषम संख्याओं का योग सदैव सम होता है"?',
      opts: [
        'बिंदु-पट्टियों में जोड़े बनाकर बचे १-१ अकेले बिंदुओं को मिलाते हुए दिखाना कि दोनों बचे बिंदु मिलकर नया जोड़ा बना देते हैं',
        'बोर्ड पर (2a+1) + (2b+1) सूत्र लिखकर',
        'नियम को पचास बार रटवाकर',
        'केवल ३ + ५ = ८ दिखाकर',
      ],
      exp: 'दृश्य बिंदु-व्यूह द्वारा बची एक-एक इकाई का युग्म बन जाना प्राथमिक स्तर का सर्वोत्तम अनौपचारिक प्रमाण है।',
    },
  },
  {
    topic: 'NEP-2020 Toy-Based & Local Craft Math Pedagogy',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'NEP-2020 promotes Toy-Based and Art-Integrated Math Pedagogy in the Preparatory Stage (Classes 3–5). Which example best embodies this?',
      opts: [
        'Using spinning tops (bhavra), paper origami planes, and Warli geometric folk patterns to explore symmetry, triangles, and angles',
        'Watching passive cartoon videos during math periods without discussion',
        'Memorizing prices of plastic imported toys from a catalogue',
        'Banning art drawings from math notebooks',
      ],
      exp: 'Local crafts like Warli triangles/circles and origami folds integrate cultural art with authentic geometric reasoning.',
    },
    mr: {
      q: 'NEP-2020 नुसार पूर्वतयारी टप्प्यात (इयत्ता ३–५) खेळणी-आधारित व कला-एकात्मिक (Art-Integrated) गणित अध्यापनाचे सर्वोत्तम उदाहरण कोणते?',
      opts: [
        'ओरिगामी घड्या, भोवरा आणि वारली चित्रकलेतील त्रिकोण-वर्तुळे वापरून सममिती, आकार व कोन यांचा अभ्यास करणे',
        'गणिताच्या तासाला चर्चेविना फक्त कार्टून व्हिडिओ दाखवणे',
        'खेळण्यांच्या किंमतींची यादी पाठ करणे',
        'गणित वहीत चित्र काढण्यास बंदी घालणे',
      ],
      exp: 'वारली कला व ओरिगामीसारख्या स्थानिक माध्यमांतून भूमितीचे आकार व सममिती आनंददायी रीतीने शिकता येतात.',
    },
    hi: {
      q: 'NEP-2020 के अंतर्गत खिलौना-आधारित व कला-एकीकृत (Art-Integrated) गणित शिक्षण का सर्वोत्तम उदाहरण कौन-सा है?',
      opts: [
        'ओरिगामी, लट्टू तथा वारली लोकचित्रकला के त्रिभुज-वृत्त से सममिति, आकृतियाँ व कोणों की खोज करना',
        'बिना चर्चा के केवल कार्टून देखना',
        'खिलौनों की कीमत सूची रटना',
        'गणित कॉपी में चित्र बनाने पर रोक लगाना',
      ],
      exp: 'स्थानीय कला (वारली) व ओरिगामी खिलौनों के माध्यम से ज्यामिति को जीवन और संस्कृति से जोड़ा जाता है।',
    },
  },
  {
    topic: 'Shopkeeper "Counting-Up" Subtraction on Number Line',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Encouraging Class 3 pupils to solve 100 − 67 by jumping on an open number line ("67 + 3 = 70, + 30 = 100 ⇒ 33") teaches subtraction as:',
      opts: [
        'Finding the difference / distance between two numbers by counting on',
        'Pure borrowing across zeroes without checking meaning',
        'Division by 10',
        'Approximating 100 as 90',
      ],
      exp: 'Counting up on an open number line avoids error-prone borrowing across multiple zeroes (like 1000 − 468) and reinforces addition-subtraction duality.',
    },
    mr: {
      q: '१०० − ६७ करताना खुल्या संख्यारेषेवर "६७ + ३ = ७०, पुढे + ३० = १०० म्हणजे फरक ३३" असे मोजण्यास शिकवल्याने वजाबाकीचा कोणता अर्थ पक्का होतो?',
      opts: [
        'दोन संख्यांमधील अंतर / फरक मोजून पुढे जाणे (Additive Difference Model)',
        'अर्थ न समजता शून्यांवरून हच्चे उसणे घेणे',
        '१० ने भागाकार करणे',
        'अंदाज लावून ९० धरणे',
      ],
      exp: 'दोन संख्यांतील फरक काढण्याची दुकानदार-पद्धत शून्यांमधून हच्चा घेण्याच्या नेहमीच्या चुका टाळते.',
    },
    hi: {
      q: '१०० − ६७ हल करने हेतु खुली संख्या रेखा पर "६७ + ३ = ७०, फिर + ३० = १०० ⇒ ३३" सिखाने से घटाव का कौन-सा अर्थ पुष्ट होता है?',
      opts: [
        'दो संख्याओं के बीच की दूरी / अंतर को आगे गिनकर ज्ञात करना',
        'शून्य पर उधार लेने की यांत्रिक रट',
        '१० से भाग करना',
        'गलत सन्निकटन',
      ],
      exp: 'संख्या रेखा पर आगे गिनकर अंतर निकालना शून्य वाले घटाव की त्रुटियों को रोकता है।',
    },
  },
  {
    topic: 'Symmetry vs Congruence Distinction',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'How should a Class 5 teacher clarify the difference between "Symmetry" and "Congruence"?',
      opts: [
        'Congruence compares TWO shapes having identical size and shape (even if rotated), while Symmetry means folding ONE shape onto itself along a line',
        'Congruent shapes never have the same area',
        'Symmetric shapes must always be triangles',
        'Both terms mean exact opposites',
      ],
      exp: 'A single figure has mirror symmetry if one half maps onto the other; two separate cut-outs are congruent if they overlap completely.',
    },
    mr: {
      q: 'इयत्ता ५ वीच्या विद्यार्थ्यांना "सममिती" (Symmetry) आणि "एकरूपता" (Congruence) यांतील फरक कसा स्पष्ट करावा?',
      opts: [
        'एकरूपता म्हणजे समान आकार व माप असणाऱ्या दोन आकृत्या तंतोतंत जुळणे, तर सममिती म्हणजे एकाच आकृतीची घडी घातल्यावर दोन भाग एकमेकांवर जुळणे',
        'एकरूप आकृत्यांचे क्षेत्रफळ कधीही समान नसते',
        'सममिती फक्त त्रिकोणालाच असते',
        'दोन्ही संज्ञा परस्परविरोधी आहेत',
      ],
      exp: 'कागदाचे दोन तंतोतंत तुकडे = एकरूपता; एकाच आकृतीचे घडीवर जुळणारे दोन अर्धे भाग = सममिती.',
    },
    hi: {
      q: 'कक्षा ५ के छात्रों को "सममिति" (Symmetry) और "सर्वांगसमता" (Congruence) का अंतर कैसे स्पष्ट करना चाहिए?',
      opts: [
        'सर्वांगसमता समान आकार-माप वाली दो अलग आकृतियों का पूर्ण मिलान है, जबकि सममिति एक ही आकृति के तह पर दो बराबर भागों का मिलान है',
        'सर्वांगसम आकृतियों का क्षेत्रफल अलग होता है',
        'सममिति केवल त्रिभुज में होती है',
        'दोनों शब्द एक ही हैं',
      ],
      exp: 'दो समान कटआउट का एक-दूसरे को पूरा ढकना सर्वांगसमता है और एक ही आकृति का स्वयं पर मुड़कर ढकना सममिति है।',
    },
  },
  {
    topic: 'Connecting Fraction Bars to Number Line Marks',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'How can a teacher smoothly transition Class 4 pupils from shaded paper strips to locating fractions on a Number Line?',
      opts: [
        'Place a 0-to-1 paper strip divided into 4 equal folds directly ABOVE a 0-to-1 number line so fold creases drop down vertically onto 1/4, 2/4, 3/4, and 4/4',
        'Ask students to memorize number line positions without strips',
        'Draw points outside 0 and 1 first before teaching 1/2',
        'Skip number lines for fractions completely',
      ],
      exp: 'Aligning folded fraction strips straight above the 0–1 segment anchors abstract tick marks to physical equal lengths.',
    },
    mr: {
      q: 'कागदी अपूर्णांक पट्टीवरून संख्यारेषेवर (Number Line) अपूर्णांक दाखवण्याकडे सहज संक्रमण कसे करावे?',
      opts: [
        '० ते १ लांबीची ४ समान घड्या घातलेली कागदी पट्टी थेट ०–१ संख्यारेषेवर ठेवून घड्यांच्या खुणांखाली १/४, २/४, ३/४, ४/४ लिहिणे',
        'पट्टीशिवाय फक्त संख्यारेषेचे बिंदू पाठ करायला लावणे',
        '१/२ आधी मोठे अपूर्णांक दाखवणे',
        'अपूर्णांकासाठी संख्यारेषा पूर्णतः टाळणे',
      ],
      exp: 'घड्या घातलेली पट्टी संख्यारेषेवर ठेवल्याने समान भागांची लांबी व रेषेवरील स्थान यांचा थेट दुवा साधला जातो.',
    },
    hi: {
      q: 'कागज की भिन्न पट्टी से संख्या रेखा (Number Line) पर भिन्न दर्शाने का सहज संक्रमण कैसे कराएँ?',
      opts: [
        '४ बराबर तह की गई ०-से-१ पट्टी को ठीक ०–१ संख्या रेखा के ऊपर रखकर तह की रेखाओं के नीचे १/४, २/४, ३/४, ४/४ अंकित करवाना',
        'बिना पट्टी के सीधे बिंदु रटवाना',
        '१/२ से पहले विषम भिन्न सिखाना',
        'संख्या रेखा छोड़ देना',
      ],
      exp: 'मुड़ी पट्टी को संख्या रेखा के ठीक ऊपर रखने से समान दूरी और चिह्नित बिंदु के बीच प्रत्यक्ष संबंध दिखता है।',
    },
  },
  {
    topic: 'Assessing Creativity Through Problem Posing',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Giving Class 5 pupils the expression "15 × 4 + 10" and asking "Create a realistic shopkeeper story that fits this math expression" assesses:',
      opts: [
        'Problem-posing creativity and authentic translation between real situations and symbolic arithmetic',
        'Speed of vertical multiplication',
        'Spelling accuracy in story essays',
        'Rote formula recall',
      ],
      exp: 'Problem-posing reverses textbook passive solving, testing whether students truly grasp contextual meaning of operations.',
    },
    mr: {
      q: '"१५ × ४ + १० या मांडणीवर आधारित दुकानातील एक वास्तववादी शाब्दिक उदाहरण स्वतः तयार करा" हा उपक्रम विद्यार्थ्यांच्या कोणत्या क्षमतेचे मूल्यमापन करतो?',
      opts: [
        'समस्या-निर्मितीची सर्जनशीलता व व्यावहारिक प्रसंगाला गणितीय चिन्हांत रूपांतरित करण्याची क्षमता',
        'उभ्या गुणाकाराचा वेग',
        'निबंध लेखनाचे शुद्धलेखन',
        'केवळ सूत्र पाठांतर',
      ],
      exp: 'दिलेल्या समीकरणावरून स्वतः उदाहरण रचणे (Problem Posing) ही उच्च स्तराची सर्जनशील व संकल्पनात्मक समज दर्शवते.',
    },
    hi: {
      q: '"१५ × ४ + १० व्यंजक के लिए दुकानदारी की एक वास्तविक कहानी बनाइए"—यह कार्य छात्र की किस क्षमता का मूल्यांकन करता है?',
      opts: [
        'समस्या-निर्माण (Problem Posing) की सृजनात्मकता तथा संदर्भ को गणितीय व्यंजक से जोड़ने की समझ',
        'केवल गुणा की गति',
        'निबंध की वर्तनी',
        'सूत्र रटना',
      ],
      exp: 'दिए गए गणितीय कथन के अनुरूप स्वयं समस्या रचना उच्च-स्तरीय सृजनात्मक समझ का प्रमाण है।',
    },
  },
  {
    topic: 'Home Language Bridge in Early Math (NEP 2020)',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why does NEP-2020 strongly endorse teaching early mathematical concepts using the child’s home/regional language (like Marathi or local dialect) alongside standard vocabulary?',
      opts: [
        'Young children build conceptual bridges smoothly through words they already understand, gradually linking local number terms to formal symbols',
        'Because regional languages lack names for shapes',
        'To avoid teaching English numerals forever',
        'So arithmetic rules differ by region',
      ],
      exp: 'Separating language hurdles from cognitive concept-building lets children focus on quantitative reasoning first.',
    },
    mr: {
      q: 'NEP-2020 नुसार प्राथमिक गणितातील सुरुवातीच्या संकल्पना मुलांच्या मातृभाषेतून / घरगुती भाषेतून शिकवण्याचा आग्रह का धरला जातो?',
      opts: [
        'परिचित भाषेतून संकल्पनेचा अर्थ सहज कळतो व त्यानंतर औपचारिक गणिती संज्ञा-चिन्हांशी मजबूत जोडणी करता येते',
        'स्थानिक भाषांमध्ये आकारांची नावे नसतात म्हणून',
        'इंग्रजी अंक कधीच न शिकवण्यासाठी',
        'प्रत्येक प्रदेशात गणिताचे नियम वेगळे असतात म्हणून',
      ],
      exp: 'भाषिक अडथळा दूर केल्यास मूल संपूर्ण लक्ष संख्या व तार्किक संबंध समजून घेण्यावर केंद्रित करते.',
    },
    hi: {
      q: 'NEP-2020 प्रारंभिक गणितीय अवधारणाओं को बच्चे की मातृभाषा/स्थानीय भाषा में पढ़ाने पर बल क्यों देता है?',
      opts: [
        'परिचित शब्दों के माध्यम से बच्चे अवधारणा का अर्थ सहज समझते हैं और फिर उसे औपचारिक प्रतीकों से जोड़ पाते हैं',
        'क्योंकि क्षेत्रीय भाषाओं में आकृतियों के नाम नहीं होते',
        'ताकि अंग्रेजी अंक न सीखने पड़ें',
        'क्षेत्र के अनुसार गणित के नियम बदलते हैं',
      ],
      exp: 'मातृभाषा में शिक्षण भाषा-बाधा हटाकर बच्चे की ऊर्जा तार्किक गणितीय समझ पर केंद्रित करता है।',
    },
  },
  {
    topic: 'Conservation of Volume via Water Displacement',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'When rolling a single ball of clay into a long snake, some Class 2 children think the snake has "more clay". Pouring the SAME water from a tall narrow glass into a wide bowl helps children grasp:',
      opts: [
        'Conservation of Liquid Volume & Matter regardless of container shape',
        'Area of triangles',
        'Multiplication by 100',
        'Metric prefix "kilo"',
      ],
      exp: 'Observing unchanged volume/mass across shape transformations addresses Piagetian pre-conservation illusions.',
    },
    mr: {
      q: 'चिकणमातीचा गोळा लाटून लांब साप बनवल्यावर किंवा उंच निमुळत्या ग्लासातील पाणी पसरट वाटीत ओतल्यावर मुलांना कोणती संकल्पना समजण्यास मदत होते?',
      opts: [
        'आकार बदलला तरी द्रवाचे घनफळ / मातीचे प्रमाण बदलत नाही (Conservation of Volume & Matter)',
        'त्रिकोणाचे क्षेत्रफळ',
        '१०० ने गुणाकार',
        '"किलो" उपसर्ग',
      ],
      exp: 'भांड्याचा आकार बदलला तरी आतल्या पाण्याचे प्रमाण तेवढेच राहते ही संधारण (Conservation) जाणीव कृतीतून पक्की होते.',
    },
    hi: {
      q: 'सँकरे लंबे गिलास का पानी चौड़े कटोरे में डालने या मिट्टी की गोली को लंबा बेलने की गतिविधि से बच्चों को क्या स्पष्ट होता है?',
      opts: [
        'आकार बदलने पर भी द्रव का आयतन व पदार्थ की मात्रा अपरिवर्तित रहती है (आयतन संरक्षण)',
        'त्रिभुज का क्षेत्रफल',
        '१०० से गुणा',
        'किलो उपसर्ग',
      ],
      exp: 'पात्र का आकार बदलने के बावजूद मात्रा स्थिर रहना संरक्षण (Conservation) की अवधारणा को मूर्त बनाता है।',
    },
  },
  {
    topic: 'Square as Special Rhombus & Rectangle',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'To clarify why a Square sits inside BOTH the Rectangle family and the Rhombus family, what classification diagram works BEST in Class 5?',
      opts: [
        'Two overlapping Venn rings labeled "4 Right Angles (Rectangles)" and "4 Equal Sides (Rhombuses)", placing Squares right inside their overlapping centre',
        'Drawing three completely disconnected boxes with no overlap',
        'Saying squares have 5 sides while rectangles have 4',
        'Teaching abstract trigonometry first',
      ],
      exp: 'Venn overlap visually demonstrates how a square inherits ALL properties of both parents simultaneously.',
    },
    mr: {
      q: '"चौरस हा एकाच वेळी आयत आणि समभुज चौकोन (Rhombus) दोन्ही कुटुंबांत का मोडतो?" हे इयत्ता ५ वीत कोणत्या आकृतीद्वारे सर्वोत्तम स्पष्ट करता येते?',
      opts: [
        '"४ काटकोन (आयत)" आणि "४ समान बाजू (समभुज चौकोन)" अशी दोन परस्परछेदी वेन वर्तुळे काढून त्यांच्या सामाईक मध्यभागी "चौरस" ठेवून',
        'तिन्ही आकृत्यांचे पूर्णपणे वेगळे चौकोन काढून',
        'चौरसाला ५ बाजू असतात असे सांगून',
        'आधी त्रिकोणमिती शिकवून',
      ],
      exp: 'वेन आकृतीच्या सामाईक भागात चौरस ठेवल्याने तो दोन्ही गुणधर्म एकत्र धारण करतो हे त्वरित कळते.',
    },
    hi: {
      q: 'कक्षा ५ में यह स्पष्ट करने का सर्वोत्तम तरीका क्या है कि "वर्ग" आयत तथा समचतुर्भुज (Rhombus) दोनों परिवारों का सदस्य है?',
      opts: [
        '"४ समकोण (आयत)" और "४ बराबर भुजाएँ (समचतुर्भुज)" वाले दो ओवरलैपिंग वेन वृत्त बनाकर उनके साझा केंद्र में "वर्ग" रखना',
        'तीनों को अलग-अलग असंबंधित बॉक्स में रखना',
        'वर्ग की ५ भुजाएँ बताना',
        'त्रिकोणमिति पढ़ाना',
      ],
      exp: 'वेन आरेख का उभयनिष्ठ क्षेत्र स्पष्ट दिखाता है कि वर्ग दोनों गुणधर्मों को एक साथ पूरा करता है।',
    },
  },
  {
    topic: 'Math Vocabulary Word Wall & Ambiguous Everyday Terms',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Why do English-medium math words like "Difference", "Volume", "Face", or "Product" sometimes confuse Class 3–4 learners?',
      opts: [
        'They carry distinct everyday meanings (e.g., loud sound volume, human face, shop product) that differ sharply from their precise mathematical definitions',
        'Because children dislike nouns',
        'Because mathematical symbols have no English names',
        'Because these words are spelled identically backwards',
      ],
      exp: 'Explicitly building a Math Word Wall highlighting everyday vs mathematical registers prevents silent lexical confusion.',
    },
    mr: {
      q: 'गणितातील "Difference" (फरक/मतभेद), "Face" (पृष्ठभाग/चेहरा), "Volume" (घनफळ/आवाज) यांसारखे शब्द अनेकदा विद्यार्थ्यांत गोंधळ का निर्माण करतात?',
      opts: [
        'या शब्दांचे दैनंदिन बोलण्यातील अर्थ आणि गणितातील काटेकोर तांत्रिक अर्थ यांत तफावत असल्याने स्पष्ट शब्दावली सराव आवश्यक असतो',
        'मुलांना नामे आवडत नाहीत म्हणून',
        'गणितात इंग्रजी शब्द नसतात म्हणून',
        'हे शब्द उलट वाचले जातात म्हणून',
      ],
      exp: 'सामान्य भाषा आणि गणितीय परिभाषा यांतील अर्थभेद स्पष्ट करून "गणित शब्द-भिंत" (Word Wall) तयार करणे उपयुक्त ठरते.',
    },
    hi: {
      q: '"Difference", "Face", "Volume", "Product" जैसे शब्द कक्षा ३-४ के छात्रों को कभी-कभी भ्रमित क्यों करते हैं?',
      opts: [
        'इनके दैनिक बोलचाल के अर्थ (जैसे आवाज, चेहरा, उत्पाद) गणितीय सटीक अर्थों से भिन्न होने के कारण भाषाई स्पष्टता आवश्यक होती है',
        'बच्चों को संज्ञा पसंद नहीं होती',
        'गणित में अंग्रेजी शब्द नहीं होते',
        'ये उल्टे लिखे जाते हैं',
      ],
      exp: 'सामान्य और गणितीय शब्दावली का अंतर स्पष्ट करने हेतु गणित शब्द-भित्ति (Math Word Wall) अत्यंत सहायक होती है।',
    },
  },
  {
    topic: 'Mixed-Ability Cooperative Group Work',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'During a Class 4 problem-solving task in groups of four, which grouping strategy promotes maximum mutual learning and confidence?',
      opts: [
        'Heterogeneous mixed-ability groups where each child holds a clear shared role (reader, manipulative builder, recorder, checker)',
        'Separating "weak students" publicly into one corner with zero teacher interaction',
        'Letting one fast solver finish everything while three teammates watch silently',
        'Forbidding any conversation between group members',
      ],
      exp: 'Structured roles in heterogeneous teams ensure every student contributes meaningfully rather than one dominant student doing the work.',
    },
    mr: {
      q: 'इयत्ता ४ थीत चार विद्यार्थ्यांच्या गटकार्यात जास्तीत जास्त परस्पर अध्ययन व आत्मविश्वास वाढण्यासाठी कोणती गट-रचना सर्वोत्तम ठरते?',
      opts: [
        'विविध क्षमता असलेले मिश्र गट (Heterogeneous Groups), ज्यात प्रत्येक मुलाकडे वाचक, साहित्य मांडणी, लेखक व तपासनीस अशी स्पष्ट जबाबदारी असते',
        '"कच्चे विद्यार्थी" वेगळ्या कोपऱ्यात बसवून ठेवणे',
        'एकच हुशार मूल संपूर्ण उदाहरण सोडवते व बाकी शांत बसतात',
        'गटात बोलण्यास पूर्ण बंदी घालणे',
      ],
      exp: 'मिश्र गटांत स्पष्ट भूमिका वाटप केल्यास प्रत्येक विद्यार्थी सक्रियपणे शिकतो व मागे राहिलेल्यांनाही सहकार्यातून बळ मिळते.',
    },
    hi: {
      q: 'कक्षा ४ के समूह कार्य में अधिकतम पारस्परिक अधिगम और आत्मविश्वास बढ़ाने की सर्वोत्तम रणनीति क्या है?',
      opts: [
        'विषम-क्षमता वाले मिश्रित समूह (Heterogeneous Groups) जहाँ प्रत्येक सदस्य की स्पष्ट भूमिका (पाठक, सामग्री-निर्माता, लेखक, जाँचकर्ता) हो',
        'कमजोर छात्रों को कोने में अलग कर देना',
        'केवल एक तेज़ छात्र को पूरा प्रश्न हल करने देना',
        'समूह में बात करना पूरी तरह बंद कर देना',
      ],
      exp: 'स्पष्ट भूमिकाओं वाले मिश्रित समूह सभी छात्रों की सक्रिय भागीदारी व सहपाठी अधिगम सुनिश्चित करते हैं।',
    },
  },
  {
    topic: 'Division Remainder Must Be Smaller Than Divisor Rule',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 4 child divides 38 ÷ 5 and writes "Quotient = 6, Remainder = 8." How do you help the child see why Remainder 8 is invalid?',
      opts: [
        'Ask practically: "If 8 laddoos are still left unshared among 5 friends, can EVERY friend still receive 1 MORE laddoo?" (showing Remainder < Divisor)',
        'Make the child recite the 5-times table backwards',
        'Say "Never leave remainder larger than quotient"',
        'Change the dividend from 38 to 30',
      ],
      exp: 'Connecting Remainder < Divisor to real equal sharing makes the Euclidean bound immediately obvious without memorizing abstract inequalities.',
    },
    mr: {
      q: '३८ ÷ ५ सोडवताना विद्यार्थी "भागाकार = ६, बाकी = ८" असे लिहितो. बाकी ८ ही का चूक आहे ते मुलास स्वतः कसे कळेल?',
      opts: [
        'व्यवहारी प्रश्न विचारणे: "५ मित्रांत वाटल्यावर जर ८ लाडू अजून ताटात उरले असतील, तर प्रत्येक मित्राला आणखी १-१ लाडू मिळू शकतो ना?" (बाकी < भाजक)',
        '५ चा पाढा उलटा म्हणायला लावणे',
        '"बाकी नेहमी भागाकारापेक्षा लहान असावी" असे सांगणे',
        '३८ बदलून ३० लिहिणे',
      ],
      exp: 'उरलेल्या वस्तूंतून पुन्हा एक फेरी वाटप शक्य असल्यास भागाकार पूर्ण झालेला नाही—ही जाणीव बाकी < भाजक नियम पक्का करते.',
    },
    hi: {
      q: '३८ ÷ ५ हल करते समय छात्र लिखता है "भागफल = ६, शेषफल = ८।" शेष ८ क्यों अमान्य है, यह छात्र को कैसे समझाएँ?',
      opts: [
        'व्यावहारिक प्रश्न पूछकर: "यदि ५ दोस्तों में बाँटने के बाद भी ८ लड्डू बचे हैं, तो क्या हर दोस्त को १-१ और लड्डू नहीं मिल सकता?" (शेष < भाजक)',
        '५ का पहाड़ा उल्टा पढ़वाना',
        '"शेष सदैव भागफल से छोटा होता है" कहना',
        '३८ को बदलकर ३० कर देना',
      ],
      exp: 'बराबर बँटवारे के व्यावहारिक अनुभव से "शेषफल सदैव भाजक से छोटा होता है" यह नियम स्वतः स्पष्ट हो जाता है।',
    },
  },
  {
    topic: 'Self-Checking Habit via Inverse & Unit Checks',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Which habit transforms primary students from dependent answer-checkers into independent self-evaluating mathematicians?',
      opts: [
        'Verifying subtraction answers by adding back, checking division via (Quotient × Divisor) + Remainder, and inspecting whether units make real-world sense',
        'Peeking at the textbook answer key at the back after every single digit',
        'Waiting solely for the teacher’s red pen next week',
        'Erasing rough work cleanly before checking',
      ],
      exp: 'Teaching self-verification strategies fosters mathematical autonomy, accuracy, and metacognitive responsibility.',
    },
    mr: {
      q: 'कोणत्या सवयीमुळे प्राथमिक विद्यार्थी उत्तरांसाठी इतरांवर अवलंबून न राहता स्वतःचे उत्तर स्वतः तपासू शकतात?',
      opts: [
        'वजाबाकी बेरजेने तपासणे, (भागाकार × भाजक + बाकी = भाज्य) पडताळणे व उत्तरातील एकक व्यवहार्य आहे का हे स्वतः पाहणे',
        'प्रत्येक ओळीनंतर पुस्तकाच्या मागील उत्तरसूची पाहणे',
        'पुढच्या आठवड्यात शिक्षकांच्या लाल पेनाची वाट पाहणे',
        'तपासण्याआधी कच्चे काम खोडून टाकणे',
      ],
      exp: 'उलट क्रियेने पडताळणी व व्यवहार्यता तपासणी या सवयी विद्यार्थ्यांना स्वावलंबी व अचूक बनवतात.',
    },
    hi: {
      q: 'किस आदत से प्राथमिक छात्र उत्तर के लिए दूसरों पर निर्भर रहने के बजाय स्व-मूल्यांकन में आत्मनिर्भर बनते हैं?',
      opts: [
        'घटाव को जोड़ से जाँचना, भाग को (भागफल×भाजक+शेष) से सत्यापित करना तथा मात्रक की व्यावहारिकता स्वयं परखना',
        'हर चरण के बाद उत्तरमाला देखना',
        'अगले सप्ताह शिक्षक के जाँचने का इंतज़ार करना',
        'जाँच से पहले रफ कार्य मिटा देना',
      ],
      exp: 'विपरीत संक्रिया से सत्यापन व व्यावहारिक जाँच छात्रों में गणितीय आत्मनिर्भरता व सटीकता विकसित करती है।',
    },
  },
  {
    topic: 'Place Value Expanded Understanding in Vertical Addition',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'When adding 38 + 27 vertically, saying aloud "3 tens + 2 tens + 1 carried ten = 6 tens" instead of merely "3 + 2 + 1 = 6" is important because:',
      opts: [
        'It preserves the true place-value meaning (30 + 20 + 10 = 60) rather than treating every column as isolated single digits',
        'It saves time during competitive speed drills',
        'Single digits do not exist in tens place',
        'Students cannot add 3 + 2 without bundles',
      ],
      exp: 'Explicit place-value language prevents students from forgetting why carried digits hold value 10 or 100.',
    },
    mr: {
      q: '३८ + २७ ची उभी बेरीज करताना फक्त "३ + २ + १ = ६" असे न म्हणता "३ दशक + २ दशक + १ हातचाचा दशक = ६ दशक (६०)" असे मोठ्याने म्हणणे महत्त्वाचे का आहे?',
      opts: [
        'प्रत्येक स्तंभातील अंकांना केवळ सुटे एकक न मानता त्यामागील खरी स्थानिक किंमत (३० + २० + १० = ६०) मनात पक्की राहते',
        'स्पर्धा परीक्षेत वेळ वाचतो',
        'दशक स्थानी अंक नसतात',
        'काड्यांशिवाय ३ + २ येत नाही',
      ],
      exp: 'अचूक स्थान-मूल्य भाषा वापरल्याने हातच्याचे वास्तविक मूल्य १०, १०० असते हे मुलांच्या लक्षात राहते.',
    },
    hi: {
      q: '३८ + २७ का ऊर्ध्वाधर जोड़ करते समय केवल "३ + २ + १ = ६" कहने के बजाय "३ दहाई + २ दहाई + १ हासिल दहाई = ६ दहाई" बोलना क्यों महत्वपूर्ण है?',
      opts: [
        'इससे प्रत्येक स्तंभ को केवल एकक अंक मानने की बजाय उसका वास्तविक स्थानीय मान (३० + २० + १० = ६०) स्पष्ट रहता है',
        'समय बचता है',
        'दहाई में अंक नहीं होते',
        'बंडलों के बिना ३ + २ संभव नहीं',
      ],
      exp: 'सही स्थानीय-मान शब्दावली का प्रयोग हासिल के वास्तविक मूल्य को विद्यार्थियों के मस्तिष्क में बनाए रखता है।',
    },
  },
  {
    topic: 'Developing Number Line Fractions Above 1 (Mixed Fractions)',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Why do Class 5 learners often write "1/2 + 2/3 = 7/6" and struggle to picture how a fraction can be GREATER than 1?',
      opts: [
        'They were taught fractions exclusively as "shaded slices inside ONE circle" without cutting or combining parts from TWO whole objects/strips',
        'Because denominators cannot be added',
        'Because 7 is a prime number',
        'Because improper fractions do not exist in daily life',
      ],
      exp: 'Using two whole rotis/strips (e.g., 1 whole roti + 1/6 of a second roti = 7/6) makes improper/mixed fractions tangible.',
    },
    mr: {
      q: 'इयत्ता ५ वीचे विद्यार्थी ७/६ सारखा "अंशाधिक अपूर्णांक" (Improper Fraction > 1) मनात चित्रित का करू शकत नाहीत?',
      opts: [
        'त्यांनी अपूर्णांक फक्त "एकाच पूर्ण गोलाचे भाग" म्हणून पाहिले असतात; दोन पूर्ण भाकऱ्या/पट्ट्यांतून "१ पूर्ण + १/६ दुसऱ्यातील = ७/६" दाखवलेले नसते',
        'छेदांची बेरीज होत नाही म्हणून',
        '७ ही मूळ संख्या आहे म्हणून',
        'दैनंदिन जीवनात असे अपूर्णांक नसतात म्हणून',
      ],
      exp: 'एकापेक्षा जास्त पूर्ण वस्तू सोबत दाखवल्यास अंशाधिक अपूर्णांक व पूर्णांकयुक्त अपूर्णांक सहज समजतात.',
    },
    hi: {
      q: 'कक्षा ५ के छात्रों को ७/६ जैसी "अनुचित भिन्न" (१ से बड़ी भिन्न) की कल्पना करने में कठिनाई क्यों होती है?',
      opts: [
        'उन्हें भिन्न केवल "एक ही वृत्त के हिस्सों" से पढ़ाया गया होता है; दो पूर्ण रोटियों/पट्टियों से "१ पूर्ण + १/६" नहीं दिखाया गया होता',
        'हर को जोड़ा नहीं जा सकता',
        '७ अभाज्य संख्या है',
        'दैनिक जीवन में ऐसी भिन्न नहीं होतीं',
      ],
      exp: 'एक से अधिक पूर्ण इकाइयाँ एक साथ दिखाकर अनुचित व मिश्र भिन्नों की समझ आसानी से बनाई जा सकती है।',
    },
  },
  {
    topic: 'Error Diagnosis in Decimal Alignment Addition',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'A Class 5 student calculates 4.3 + 2.15 and gets "6.18" (adding 3 + 15 = 18 after the point). What targeted prompt resolves this instantly?',
      opts: [
        'Ask: "How many tenths vs hundredths does each have? Line up the decimal points vertically on place-value columns (4.30 + 2.15)"',
        'Ban decimal additions with unequal digit counts',
        'Multiply everything by 1,000 first',
        'Tell the child to ignore decimal points completely',
      ],
      exp: 'Recognizing that 0.3 = 0.30 (tenths align with tenths, hundredths with hundredths) cures right-alignment habits.',
    },
    mr: {
      q: 'इयत्ता ५ वीचा विद्यार्थी ४.३ + २.१५ = ६.१८ (३ व १५ जोडले!) असे सोडवतो. या त्रुटीवर त्वरित उपाय कोणता?',
      opts: [
        'दशांश व शतांश स्तंभांची मांडणी दाखवून विचारणे: "०.३ म्हणजे ३ दशांश (०.३०); त्यामुळे दशांश चिन्हाखाली दशांश चिन्ह अचूक मांडा"',
        'वेगवेगळ्या अंकांच्या दशांश बेरजा बंद करणे',
        'सर्व संख्यांना १,००० ने गुणणे',
        'दशांश चिन्ह पूर्णतः दुर्लक्षित करण्यास सांगणे',
      ],
      exp: 'दशांशाखाली दशांश व सारखे शतांश स्थान दाखवल्याने उजवीकडून टेकवून जोडण्याची पूर्ण-संख्या सवय दूर होते.',
    },
    hi: {
      q: 'कक्षा ५ का छात्र ४.३ + २.१५ = ६.१८ लिखता है (दशमलव के बाद ३ और १५ जोड़कर)। इसे तुरंत कैसे सुधारें?',
      opts: [
        'स्थानीय मान स्तंभों में "दशमलव के नीचे दशमलव" रखवाकर समझाना कि ०.३ का अर्थ ०.३० (३ दशांश ० शतांश) है',
        'असमान अंकों वाले दशमलव जोड़ रोक देना',
        'सबको १,००० से गुणा कराना',
        'दशमलव बिंदु हटा देना',
      ],
      exp: 'दशांश व शतांश स्तंभों को संरेखित करने से पूर्ण-संख्या की दाईं संरेखण (Right-Alignment) त्रुटि दूर होती है।',
    },
  },
  {
    topic: 'Concept of Perimeter as Boundary Walk',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'When introducing "Perimeter" to Class 3 beginners, what physical metaphor builds accurate intuition BEFORE formulas like 2(l + b)?',
      opts: [
        'Walking or tracing a finger completely along the outer edge/fencing around a book, slate, or classroom rug back to the starting corner ("Parimiti = measure around")',
        'Multiplying length and breadth immediately',
        'Covering the desk top completely with square tiles',
        'Weighing the textbook on a scale',
      ],
      exp: 'Experiencing perimeter as an unbroken 1D boundary path separates it cleanly from 2D surface-covering Area.',
    },
    mr: {
      q: 'इयत्ता ३ रीला "परिमिती" (Perimeter) पहिल्यांदाच शिकवताना 2(l + b) सूत्राआधी कोणता प्रत्यक्ष अनुभव सर्वाधिक प्रभावी ठरतो?',
      opts: [
        'पाटी, पुस्तक वा सतरंजीच्या बाह्य कडेवरून बोट फिरवून किंवा मैदानाच्या कडेने चालून मूळ कोपऱ्यापर्यंत परत येणे ("परि + मिती = सभोवतालचे माप")',
        'थेट लांबी × रुंदीचा गुणाकार करणे',
        'बाकावर चौरस फरश्या पसरवून झाकणे',
        'पुस्तकाचे वजन करणे',
      ],
      exp: 'सभोवतालच्या कडेच्या लांबीचा अनुभव क्षेत्रफळाशी (आतील जागा) होणारा गोंधळ सुरुवातीपासूनच टाळतो.',
    },
    hi: {
      q: 'कक्षा ३ में "परिमाप" (Perimeter) का परिचय कराते समय सूत्र से पहले कौन-सा अनुभव सर्वाधिक प्रभावी होता है?',
      opts: [
        'स्लेट, पुस्तक या दरी के बाहरी किनारे-किनारे उँगली चलाकर अथवा मैदान की सीमा पर चलकर प्रारंभिक कोने तक लौटना ("परि + माप = चारों ओर की माप")',
        'सीधे लंबाई × चौड़ाई गुणा कराना',
        'मेज़ को वर्ग टाइलों से ढकना',
        'पुस्तक को तौलना',
      ],
      exp: 'बाहरी सीमा के पथ का अनुभव परिमाप को क्षेत्रफल (भीतरी सतह) से स्पष्ट अलग करता है।',
    },
  },
  {
    topic: 'Role of Concrete Fraction Circles for Unit Fractions',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why do Class 4 children often claim "1/5 is bigger than 1/3 because 5 is bigger than 3"? How do circular fraction cutouts resolve this?',
      opts: [
        'Comparing a 1/5 wedge beside a 1/3 wedge of the SAME circle shows visually that cutting into MORE equal pieces makes EACH single slice SMALLER',
        'Telling them numerator is always smaller than denominator',
        'Giving only 1/2 and 1/4 sums',
        'Teaching cross-multiplication before visual cutouts',
      ],
      exp: 'The inverse relationship between number of equal shares and slice size becomes crystal clear when comparing equal-whole cutouts.',
    },
    mr: {
      q: '"३ पेक्षा ५ मोठे म्हणून १/३ पेक्षा १/५ मोठा" असे अनेक मुले मानतात. वर्तुळाकार अपूर्णांक तुकडे हा गैरसमज कसा दूर करतात?',
      opts: [
        'एकाच आकाराच्या भाकरीचे ५ तुकडे केल्यास प्रत्येक १/५ तुकडा हा ३ तुकड्यांतील १/३ तुकड्यापेक्षा प्रत्यक्ष लहान दिसतो (अधिक वाटे = छोटा तुकडा)',
        'अंश नेहमी छेदापेक्षा लहान असतो असे सांगून',
        'फक्त १/२ व १/४ ची उदाहरणे देऊन',
        'तिरकस गुणाकार पाठ करायला लावून',
      ],
      exp: 'समान वस्तूचे जितके जास्त समान भाग करावेत तितका प्रत्येक भाग लहान होतो हे प्रत्यक्ष तुकड्यांतून तात्काळ कळते.',
    },
    hi: {
      q: 'बच्चे प्रायः कहते हैं "५ बड़ा है इसलिए १/३ से १/५ बड़ा होगा"। गोल भिन्न-कटआउट इस भ्रम को कैसे दूर करते हैं?',
      opts: [
        'एक ही वृत्त के ५ भागों का एक टुकड़ा (१/५) और ३ भागों का एक टुकड़ा (१/३) पास रखने पर स्पष्ट दिखता है कि अधिक हिस्से करने पर प्रत्येक हिस्सा छोटा हो जाता है',
        'अंश को सदैव हर से छोटा बताकर',
        'केवल १/२ और १/४ के प्रश्न देकर',
        'वज्र-गुणन विधि रटवाकर',
      ],
      exp: 'समान पूर्ण को अधिक भागों में बाँटने पर प्रत्येक हिस्सा छोटा होता जाता है—यह व्युत्क्रम संबंध कटआउट से प्रत्यक्ष दिखता है।',
    },
  },
  {
    topic: 'Identifying Misconceptions via Oral Think-Aloud',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why is asking a student "Can you walk me through aloud how you got that answer?" often better than only checking their final written paper?',
      opts: [
        'Even a correct answer might mask a lucky flaw, and a wrong answer’s exact broken step becomes immediately audible for targeted feedback',
        'So other students can copy the answer fast',
        'To reduce the teacher’s reading workload',
        'Because written math is unimportant in exams',
      ],
      exp: '"Think-Aloud" probing reveals the student’s cognitive reasoning behind both correct and incorrect outputs.',
    },
    mr: {
      q: 'केवळ वहीतील अंतिम उत्तर तपासण्यापेक्षा विद्यार्थ्याला "तू हे उत्तर कसे काढलेस ते मोठ्याने समजावून सांगशील का?" असे विचारणे का अधिक उपयुक्त असते?',
      opts: [
        'चूक झालेली नेमकी पायरी किंवा योग्य उत्तरामागील चुकीची युक्ती (Lucky flaw) त्वरित कळून नेमके मार्गदर्शन देता येते',
        'इतर मुले लवकर उतरवून घेऊ शकतात',
        'शिक्षकांचे तपासणी काम कमी होते',
        'परीक्षेत लेखी गणिताला महत्त्व नसते',
      ],
      exp: 'विचारप्रक्रिया मोठ्याने ऐकल्यामुळे (Think-Aloud) विद्यार्थ्याची खरी वैचारिक समज व अडचणी स्पष्ट होतात.',
    },
    hi: {
      q: 'केवल अंतिम उत्तर जाँचने की बजाय छात्र से यह पूछना कि "तुमने यह उत्तर कैसे निकाला, बोलकर बताओ?" क्यों अधिक प्रभावी है?',
      opts: [
        'इससे गलत उत्तर का सटीक त्रुटि-बिंदु और सही उत्तर के पीछे छिपी आकस्मिक भूल भी तुरंत समझ आ जाती है',
        'ताकि दूसरे छात्र नकल कर सकें',
        'शिक्षक का कार्यभार घटाने हेतु',
        'लिखित गणित का महत्व नहीं है',
      ],
      exp: '"थिंक-अलाउड" पूछताछ से छात्र के चिंतन की सटीक प्रक्रिया शिक्षक के सामने स्पष्ट हो जाती है।',
    },
  },
  {
    topic: 'Teaching Metric Conversion Staircase Logic',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'To prevent blind confusion between multiplying or dividing by 1,000 when converting km ↔ m or kg ↔ g, what reasoning check should Class 5 learners internalize?',
      opts: [
        '"Smaller unit needs MORE pieces to match the same length/weight (big unit → small unit = multiply; small unit → big unit = divide)"',
        '"Always multiply whenever you see the letter m"',
        '"Memorize only up to metres and ignore centimetres"',
        '"Add 1,000 instead of multiplying"',
      ],
      exp: 'Understanding the inverse relation between unit size and numerical count (1 m = 100 smaller cm) eliminates arbitrary direction slips.',
    },
    mr: {
      q: 'किमी ↔ मी किंवा किग्रॅ ↔ ग्रॅम रूपांतरण करताना १,००० ने गुणावे की भागावे हा गोंधळ कायमचा दूर करण्यासाठी कोणते तर्कसूत्र शिकवावे?',
      opts: [
        '"लहान एककाची संख्या नेहमी जास्त लागते" (मोठ्या एककातून लहान एकक → गुणाकार; लहानातून मोठे → भागाकार)',
        '"m अक्षर दिसताच नेहमी गुणाकार करावा"',
        '"फक्त मीटरच वापरावेत, सेंटीमीटर नको"',
        '"गुणाकाराऐवजी १,००० मिळवावेत"',
      ],
      exp: 'एककाचा आकार लहान असेल तर त्याचे मोजमाप मोठे असते हा व्यावहारिक तर्क दिशा-चूक थांबवतो.',
    },
    hi: {
      q: 'किमी ↔ मी या किग्रा ↔ ग्राम बदलते समय १००० से गुणा करें या भाग—इस उलझन को स्थायी रूप से कैसे दूर करें?',
      opts: [
        '"छोटी इकाई की संख्या अधिक लगती है" (बड़ी इकाई से छोटी → गुणा; छोटी इकाई से बड़ी → भाग) का तर्क स्पष्ट करना',
        'm देखते ही सदैव गुणा करना',
        'सेंटीमीटर को पाठ्यक्रम से हटाना',
        'गुणा की जगह १००० जोड़ना',
      ],
      exp: 'इकाई का आकार और संख्यात्मक मान के व्युत्क्रम संबंध को समझने से गुणा-भाग की दिशा कभी गलत नहीं होती।',
    },
  },
  {
    topic: 'Connecting 2D Nets to 3D Solids Hands-On',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Having Class 4–5 students cut out unfolded cardboard toothpaste/matchbox cartons and fold them back into 3D cuboids BEST builds:',
      opts: [
        '2D-to-3D spatial visualization (Nets of Solids) and edge-face alignment',
        'Multiplication of 3-digit numbers',
        'Circular arc circumference',
        'Time zone subtraction',
      ],
      exp: 'Opening and re-folding everyday boxes connects flat 2D nets tangibly to 3D faces, edges, and vertices.',
    },
    mr: {
      q: 'इयत्ता ४ थी–५ वीच्या विद्यार्थ्यांकडून रिकामे माचिसचे/टूथपेस्टचे खोके कापून सपाट करणे व पुन्हा जोडून पाहणे ही कृती कशासाठी सर्वोत्तम आहे?',
      opts: [
        'द्विमितीय जाळी (2D Net) आणि त्रिमितीय घन-इष्टिकाचिती (3D Solids) यांतील अवकाशीय संबंध समजण्यासाठी',
        '३-अंकी गुणाकारासाठी',
        'वर्तुळाच्या परिघासाठी',
        'वेळेच्या वजाबाकीसाठी',
      ],
      exp: 'रिकामे खोके उघडून व पुन्हा घड्या घालून पाहिल्याने जाळी (Net) व त्रिमितीय आकृती यांचा संबंध प्रत्यक्ष समजतो.',
    },
    hi: {
      q: 'कक्षा ४-५ के छात्रों से खाली माचिस/टूथपेस्ट के डिब्बे खोलकर सपाट करने और फिर मोड़कर बनाने की गतिविधि किसे मजबूत करती है?',
      opts: [
        'द्वि-आयामी नेट (2D Net) से त्रि-आयामी ठोस (3D Solid) की स्थानिक कल्पना और फलक-किनारा समझ',
        '३-अंकीय गुणा',
        'वृत्त की परिधि',
        'समय-क्षेत्र अंतर',
      ],
      exp: 'दैनिक डिब्बों को खोलने और पुनः जोड़ने से सपाट नेट व ठोस आकृतियों का संबंध मूर्त बनता है।',
    },
  },
];
