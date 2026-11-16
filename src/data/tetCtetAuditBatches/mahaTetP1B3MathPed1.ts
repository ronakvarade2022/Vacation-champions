import { CuratedTrilingualMcq } from './types';

// Batch 3 Primary Mathematics Pedagogy Part 1 (28 verified trilingual MCQs)
export const MAHA_TET_P1_B3_MATH_PED1: CuratedTrilingualMcq[] = [
  {
    topic: 'Gelman-Gallistel – Cardinality Principle in Counting',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 1 pupil touches 7 pebbles neatly from left to right saying "One, two, three, four, five, six, seven," yet when the teacher asks immediately, "So how many pebbles are in the pile?", the child starts counting "One, two, three..." all over again. Which Gelman–Gallistel counting principle is NOT yet consolidated?',
      opts: [
        'Cardinality Principle — grasping that the final tag word represents the total quantity of the whole set',
        'Order-Irrelevance Principle — counting right to left gives a different sum',
        'Stable-Order Principle — reciting random un-sequenced number names',
        'Abstraction Principle — inability to count heterogeneous toys',
      ],
      exp: 'Mastering One-to-One Correspondence and Stable Order precedes Cardinality: knowing the last counted number names the set size.',
    },
    mr: {
      q: 'इ. १ लीतील मूल ७ गोट्यांना बोट लावून "एक, दोन, तीन, चार, पाच, सहा, सात" असे बरोबर मोजते; पण शिक्षकांनी लगेच "एकूण गोट्या किती?" विचारताच ते पुन्हा "एक, दोन..." पासून मोजू लागते. येथे मोजणीचे कोणते तत्त्व अजून पक्के झालेले नाही?',
      opts: [
        'गणनसंख्या तत्त्व (Cardinality Principle) — मोजताना उच्चारलेला शेवटचा शब्द संपूर्ण संचाची संख्या दर्शवतो हे न कळणे',
        'क्रम-अनिरपेक्षता तत्त्व',
        'स्थिर-क्रम तत्त्व',
        'अमूर्तता तत्त्व',
      ],
      exp: 'प्रत्येक वस्तूवर एकच संख्या बोलणे जमले तरी शेवटची संख्या हीच एकूण संख्या असते हे समजणे म्हणजे गणनसंख्या तत्त्व (Cardinality) होय.',
    },
    hi: {
      q: 'कक्षा 1 का बच्चा 7 कंकड़ छूते हुए "एक, दो, तीन, चार, पांच, छह, सात" सही गिनता है, पर "कुल कितने कंकड़ हैं?" पूछने पर फिर से "एक, दो..." गिनने लगता है। गिनती का कौन-सा सिद्धांत अभी अपरिपक्व है?',
      opts: [
        'गणनसंख्या सिद्धांत (Cardinality Principle) — अंतिम बोला गया अंक पूरे समूह की कुल मात्रा दर्शाता है, यह न समझ पाना',
        'क्रम-निरपेक्षता सिद्धांत',
        'स्थिर-क्रम सिद्धांत',
        'अमूर्तता सिद्धांत',
      ],
      exp: 'एक-एक संगति के बाद अंतिम गिने गए शब्द को पूरे समूह की कुल संख्या मानना गणनसंख्या सिद्धांत (Cardinality) कहलाता है।',
    },
  },
  {
    topic: 'Subitizing – Instant Small Quantity Recognition',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why do modern NIPUN Bharat / Class 1 math workbooks display quick-flash dot cards (like die faces of 4 or 5 dots) for 2 seconds before hiding them?',
      opts: [
        'To build "Perceptual Subitizing"—recognizing small quantities instantly by sight without slow finger-by-finger counting',
        'To teach rapid cursive numeral handwriting speed',
        'To test blurry long-distance vision thresholds',
        'To force 5-year-olds to memorize multiplication tables',
      ],
      exp: 'Subitizing forms a vital bridge from concrete one-by-one counting toward flexible part-whole mental arithmetic.',
    },
    mr: {
      q: 'निपुण भारत / इ. १ लीच्या गणितात फाशावरील ४ किंवा ५ ठिपक्यांची कार्डे २ सेकंद दाखवून झाकण्याचा "झटपट ओळख" खेळ कशासाठी घेतला जातो?',
      opts: [
        'सबिटायझिंग (Subitizing) — बोटावर न मोजता नजरेच्या एका झटक्यात लहान प्रमाण अचूक ओळखण्याची क्षमता घडवण्यासाठी',
        'वेगाने अंकलेखन सुधारण्यासाठी',
        'डोळ्यांची दूरदृष्टी तपासण्यासाठी',
        '५ वर्षांच्या मुलांकडून पाढे पाठ करवून घेण्यासाठी',
      ],
      exp: 'मोजणी न करता लहान गट थेट ओळखणे (Subitizing) पुढे मानसिक बेरीज-वजाबाकी व संख्या-विभाजनाचा भक्कम पाया रचते.',
    },
    hi: {
      q: 'निपुण भारत / कक्षा 1 के गणित में पासे जैसे 4 या 5 बिंदुओं वाले कार्ड 2 सेकंड दिखाकर छिपा देने की गतिविधि किसलिए कराई जाती है?',
      opts: [
        'सबिटाइज़िंग (Subitizing) विकसित करने के लिए — बिना उँगली से गिने देखते ही छोटी मात्रा तुरंत पहचान लेना',
        'अंक लिखने की गति तेज़ करने के लिए',
        'आँखों की दूरदृष्टि जाँचने के लिए',
        '5 वर्षीय बच्चों को पहाड़े रटवाने के लिए',
      ],
      exp: 'सबिटाइज़िंग बच्चों को एक-एक गिनने से आगे बढ़कर संख्याओं के समूह और भाग-पूर्ण संबंध मानसिक रूप से देखने में सक्षम बनाती है।',
    },
  },
  {
    topic: 'ELPS Pedagogical Progression in Primary Math',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In primary mathematics pedagogy, the acronym E–L–P–S stands for the authentic developmental teaching sequence:',
      opts: [
        'Experience (concrete objects) -> Language (describing aloud) -> Picture (diagrams) -> Symbol (written digits & signs)',
        'Exam -> Lecture -> Punishment -> Score',
        'Equation -> Logarithm -> Proof -> Summary',
        'Example -> Listening -> Passive Copying -> Silence',
      ],
      exp: 'PAMELA Liebeck’s ELPS guarantees abstract mathematical notation sits atop lived manipulation, spoken meaning, and visual models.',
    },
    mr: {
      q: 'प्राथमिक गणित अध्यापनातील E–L–P–S हा मान्यवर टप्पाक्रम कोणता?',
      opts: [
        'अनुभव (Experience) -> भाषा (Language) -> चित्र (Picture) -> चिन्ह (Symbol)',
        'परीक्षा -> व्याख्यान -> शिक्षा -> गुण',
        'समीकरण -> लॉग -> सिद्धता -> सारांश',
        'उदाहरण -> ऐकणे -> नक्कल -> शांतता',
      ],
      exp: 'प्रत्यक्ष वस्तूंचा अनुभव (E), त्याचे भाषिक वर्णन (L), चित्रात्मक मांडणी (P) आणि शेवटी गणितीय चिन्हे (S) असा क्रम नैसर्गिक ठरतो.',
    },
    hi: {
      q: 'प्राथमिक गणित शिक्षणशास्त्र में E–L–P–S का सही विकासात्मक क्रम क्या है?',
      opts: [
        'अनुभव (Experience) -> भाषा (Language) -> चित्र (Picture) -> संकेत/प्रतीक (Symbol)',
        'परीक्षा -> व्याख्यान -> दंड -> अंक',
        'समीकरण -> लघुगणक -> उपपत्ति -> सारांश',
        'उदाहरण -> सुनना -> नकल -> मौन',
      ],
      exp: 'ELPS क्रम सुनिश्चित करता है कि गणितीय चिह्नों (S) से पहले ठोस अनुभव (E), मौखिक संवाद (L) और चित्रांकन (P) पक्के हों।',
    },
  },
  {
    topic: 'Van Hiele Level 0 Misconception – Tilted Square',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Many Class 3 learners recognize an upright square □ immediately, yet insist a 45°-rotated square ◇ is "a diamond, NOT a square!" Van Hiele’s geometric framework attributes this error to:',
      opts: [
        'Level 0 (Visualization) — judging shapes holistically by standard prototypical orientation rather than invariant side/angle properties',
        'Level 3 (Formal Deduction) geometric proof rigor',
        'Dysgraphia in compass drawing',
        'Failure to memorize Roman numerals',
      ],
      exp: 'Rotating triangles, squares, and rectangles into non-standard orientations nudges pupils toward Van Hiele Level 1 (Analysis of properties).',
    },
    mr: {
      q: 'इ. ३ रीतील अनेक मुले सरळ चौरस □ चटकन ओळखतात, पण ४५° फिरवलेला चौरस ◇ पाहून "हा पतंग/हिरा आहे, चौरस नाही!" असे म्हणतात. व्हॅन हिलीच्या भूमिती पातळीनुसार हा गोंधळ का होतो?',
      opts: [
        'स्तर ० (दृश्यीकरण / Visualization) — बाजू व कोनांच्या गुणधर्मांऐवजी केवळ ठराविक सरळ दिसण्यावरून आकार ओळखणे',
        'स्तर ३ (औपचारिक सिद्धता) मधील काटेकोरपणा',
        'कंपास वापरण्यातील हस्तलेखन दोष',
        'रोमन संख्यांचे अज्ञान',
      ],
      exp: 'आकृत्या नेहमी एकाच सरळ स्थितीत न दाखवता विविध कोनांत फिरवून दाखवल्यास मुले गुणधर्मांवर आधारित स्तर १ (विश्लेषण) कडे जातात.',
    },
    hi: {
      q: 'कक्षा 3 के कई छात्र सीधा वर्ग □ तो तुरंत पहचान लेते हैं, पर 45° घुमाया गया वर्ग ◇ देखकर कहते हैं "यह बर्फी/हीरा है, वर्ग नहीं!" वैन हीले के ज्यामितीय स्तरानुसार यह त्रुटि किस कारण होती है?',
      opts: [
        'स्तर 0 (प्रत्यक्षीकरण / Visualization) — भुजाओं व कोणों के गुणों की बजाय केवल परिचित सीधी छवि से आकृति पहचानना',
        'स्तर 3 (औपचारिक निगमन) की कठोरता',
        'परकार पकड़ने में लेखन अक्षमता',
        'रोमन अंकों की अनभिज्ञता',
      ],
      exp: 'आकृतियों को विभिन्न झुकावों में दिखाने से बच्चे दिखावट से आगे बढ़कर स्तर 1 (विश्लेषण — समान भुजाएँ व समकोण) तक पहुँचते हैं।',
    },
  },
  {
    topic: 'Decimal Length Fallacy – Comparing 0.45 and 0.7',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Asked which is larger between 0.45 and 0.7, a Class 5 pupil answers "0.45 is bigger because 45 is larger than 7!" What conceptual bridge fixes this "whole-number thinking" error cleanly?',
      opts: [
        'Using 10×10 shaded hundred-grids (45 shaded squares vs 7 full columns = 70 squares) and place-value alignment (0.45 vs 0.70)',
        'Telling the pupil to memorize "ignore digits after the second dot"',
        'Converting directly to 5-digit scientific notation',
        'Penalizing decimal mistakes with extra copying',
      ],
      exp: 'Shading tenths strips alongside hundredths squares visually proves 7 tenths (0.70) far exceeds 45 hundredths (0.45).',
    },
    mr: {
      q: '०.४५ आणि ०.७ यांत मोठे कोणते विचारल्यावर इ. ५ वीतील मूल म्हणते, "०.४५ मोठे, कारण ४५ हे ७ पेक्षा मोठे आहेत!" ही पूर्णांक-समजुतीची चूक कायमची कशी दुरुस्त कराल?',
      opts: [
        '१०×१० च्या शतक-चौकटीत ४५ छोटे चौकोन विरुद्ध ७ पूर्ण पट्ट्या (७० चौकोन) रंगवून व ०.४५ विरुद्ध ०.७० असे समान दशांश स्थान दाखवून',
        '"दशांशापुढचे आकडे मनाने पुसून टाका" असा नियम पाठ करायला सांगून',
        'थेट वैज्ञानिक घातांक पद्धत शिकवून',
        'अधिक उदाहरणे उतरवण्याची शिक्षा देऊन',
      ],
      exp: 'शतक-तक्त्यावर ७ दशांश (७० शतांश) विरुद्ध ४५ शतांश प्रत्यक्ष रंगवल्याने दशांशाचे खरे स्थानिक मूल्य डोळ्यांना स्पष्ट दिसते.',
    },
    hi: {
      q: '0.45 और 0.7 में कौन बड़ा है पूछने पर कक्षा 5 का छात्र कहता है "0.45 बड़ा है क्योंकि 45, 7 से बड़ा है!" इस पूर्ण-संख्या सोच भ्रांति को कैसे सुधारेंगे?',
      opts: [
        '10×10 के सौ-वर्ग ग्रिड में 45 छोटे खाने बनाम 7 पूरी पट्टियाँ (70 खाने) रंगकर तथा 0.45 बनाम 0.70 का स्थानीय मान मिलान दिखाकर',
        'यह रटवाकर कि "दशमलव के बाद दूसरा अंक छोड़ दो"',
        'तुरंत 5-अंकीय वैज्ञानिक संकेतन सिखाकर',
        'दंडस्वरूप अतिरिक्त नकल कार्य देकर',
      ],
      exp: 'दसवें और सौवें भाग की ग्रिड पर 7 दहाई पट्टियों (0.70) की तुलना 45 सौवें खानों (0.45) से करने पर भ्रम तुरंत मिटता है।',
    },
  },
  {
    topic: 'Diagnostic Error – Misaligned Vertical Addition',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'A Class 3 child solves 425 + 37 horizontally by lining digits up on the LEFT (4 beneath 3, 2 beneath 7), writing 425 + 370? Wait: writing 795! Why does place-value grid paper solve this?',
      opts: [
        'Pre-labeled H–T–O columns reinforce aligning ones under ones and tens under tens rather than treating numbers as left-aligned words',
        'Grid boxes force smaller handwriting automatically',
        'H–T–O columns eliminate carrying entirely',
        'Left alignment is actually correct in metric addition',
      ],
      exp: 'Students accustomed to writing Marathi/English left-to-right sometimes left-align addends; H–T–O place-value mats anchor column value.',
    },
    mr: {
      q: '४२५ + ३७ हे गणित उभे मांडताना इ. ३ रीतील मूल उजवीकडून नाही तर डावीकडून जुळवते (४ च्या खाली ३ व २ च्या खाली ७) आणि उत्तर ७९५ लिहिते; शतक-दशक-एकक (H-T-O) चौकोनी कागद ही चूक कशी टाळतो?',
      opts: [
        'एकक खाली एकक व दशक खाली दशक लिहिण्याची सवय दृढ होते आणि संख्यांना डावीकडून लिहिलेल्या शब्दांप्रमाणे मांडण्याची चूक टळते',
        'त्यामुळे अक्षर लहान होते',
        'हातचा घेण्याची गरजच राहत नाही',
        'डावीकडून जुळवणेच बरोबर असते',
      ],
      exp: 'भाषा डावीकडून उजवीकडे लिहिण्याच्या सवयीमुळे काही मुले संख्याही डावीकडून जुळवतात; स्थान-रकाने ही चूक मुळापासून सुधारतात.',
    },
    hi: {
      q: '425 + 37 को लंबवत लिखते समय कक्षा 3 का बच्चा अंकों को दाईं के बजाय बाईं ओर से सटाता है (4 के नीचे 3, 2 के नीचे 7) और उत्तर 795 लिखता है; सैकड़ा-दहाई-इकाई (H-T-O) ग्रिड पेपर इसे कैसे सुधारता है?',
      opts: [
        'यह सुनिश्चित करता है कि इकाई के नीचे इकाई व दहाई के नीचे दहाई आए, न कि शब्दों की तरह बाईं ओर से संरेखण हो',
        'ग्रिड से हस्तलेख अपने आप छोटा होता है',
        'इससे हासिल की ज़रूरत समाप्त होती है',
        'बाईं ओर सटाना ही सही नियम है',
      ],
      exp: 'बाएँ-से-दाएँ लिखने की आदत के कारण बच्चे संख्याओं को बाईं ओर से सटा देते हैं; स्थानीय मान स्तंभ इस त्रुटि को तुरंत रोकते हैं।',
    },
  },
  {
    topic: 'Commutative Property via Rotated Arrays',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Having Class 3 pupils arrange 15 bottle caps into 3 rows of 5, and then turn the cardboard tray sideways 90° so it visibly becomes 5 rows of 3 without adding or removing a single cap, concretely proves:',
      opts: [
        'Commutativity of Multiplication (3 × 5 = 5 × 3)',
        'Division by zero is undefined',
        'Rounding to the nearest ten',
        'Area never equals rows times columns',
      ],
      exp: 'Rotating a rectangular array turns "a × b" visibly into "b × a" with identical cap count—cutting table memorization burden in half.',
    },
    mr: {
      q: '१५ टोप्या ३ रांगांत प्रत्येकी ५ अशा मांडून तोच पुठ्ठा ९०° फिरवल्यास ५ रांगांत प्रत्येकी ३ टोप्या सहज दिसतात; टोप्या न बदलता दिसणारी ही कृती कोणता गुणधर्म प्रत्यक्ष सिद्ध करते?',
      opts: [
        'गुणाकाराचा क्रमनिपेक्षता गुणधर्म (Commutativity: ३ × ५ = ५ × ३)',
        'शून्याने भागाकार शक्य नसणे',
        'नजीकच्या दशकात पूर्णांकन',
        'क्षेत्रफळाचे मोजमाप',
      ],
      exp: 'आयताकृती मांडणी ९०° फिरवून पाहिल्याने ३×५ आणि ५×३ समानच असल्याचे डोळ्यांना दिसते व पाढे शिकणे निम्म्याने सोपे होते.',
    },
    hi: {
      q: '15 बोतल के ढक्कनों को 3×5 की आयताकार पंक्तियों में सजाकर गत्ते को 90° घुमाने पर वही 5×3 रूप में दिखते हैं; बिना ढक्कन बदले यह गतिविधि क्या सिद्ध करती है?',
      opts: [
        'गुणा का क्रम-विनिमेय गुण (Commutative Property: 3 × 5 = 5 × 3)',
        'शून्य से भाग अपरिभाषित है',
        'निकटतम दहाई सन्निकटन',
        'क्षेत्रफल कभी समान नहीं होता',
      ],
      exp: 'आयताकार सरणी को घुमाकर देखने से क्रम-विनिमेय नियम प्रत्यक्ष सिद्ध होता है और पहाड़े याद करने का बोझ आधा हो जाता है।',
    },
  },
  {
    topic: 'Distributive Area Model Multiplication',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Splitting a 7 × 14 grid rectangle vertically into a 7 × 10 section (70) plus a 7 × 4 section (28) to compute 7 × 14 = 98 intuitively visualizes:',
      opts: [
        'The Distributive Property of Multiplication over Addition: 7 × (10 + 4) = 7×10 + 7×4',
        'The Associative Property of Subtraction',
        'Inverse fraction reciprocity',
        'Prime factorization by 11',
      ],
      exp: 'Area grids justify multi-digit multiplication conceptually instead of treating "carry-over digits" as mysterious magic.',
    },
    mr: {
      q: '७ × १४ चा आयत उभा तोडून ७ × १० (७०) आणि ७ × ४ (२८) असे दोन भाग करून ९८ उत्तर काढणे कोणत्या गुणधर्माचे दृश्य रूप आहे?',
      opts: [
        'गुणाकाराचा बेरजेवरील वितरण गुणधर्म (Distributive Property): ७ × (१० + ४) = ७×१० + ७×४',
        'वजाबाकीचा सहचारी गुणधर्म',
        'अपूर्णांकांची व्यस्तता',
        '११ चे मूळ अवयव',
      ],
      exp: 'क्षेत्रफळ नमुन्याद्वारे (Area model) वितरण गुणधर्म पाहिल्यामुळे दोन-अंकी गुणाकारातील पायऱ्यांचे खरे कारण मुलांना समजते.',
    },
    hi: {
      q: '7 × 14 के आयत को 7 × 10 (70) और 7 × 4 (28) दो खंडों में बाँटकर 98 निकालना किस गणितीय नियम को दृश्य रूप देता है?',
      opts: [
        'जोड़ पर गुणा का वितरण नियम (Distributive Property): 7 × (10 + 4) = 7×10 + 7×4',
        'घटाव का साहचर्य नियम',
        'भिन्न व्युत्क्रम नियम',
        '11 का अभाज्य गुणनखंडन',
      ],
      exp: 'क्षेत्रफल मॉडल (Area Model) दो-अंकीय गुणा में वितरण नियम को स्पष्ट कर रटंत विधि से बचाता है।',
    },
  },
  {
    topic: 'Partitive vs Quotative Division Models',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Compare two Class 4 word problems: Problem A ("Share 24 laddoos equally among 6 children; how many does each get?") vs Problem B ("Pack 24 laddoos putting 4 in each box; how many boxes fill?"). Recognizing BOTH require 24 ÷ ... distinguishes:',
      opts: [
        'Partitive (equal sharing) vs Quotative (repeated-subtraction / grouping) division structures',
        'Multiplication vs exponentiation',
        'Perimeter vs volume',
        'Prime vs composite estimation',
      ],
      exp: 'Exposing learners to both equal-sharing and equal-grouping division scenarios ensures versatile problem modeling.',
    },
    mr: {
      q: 'उदाहरण अ ("२४ लाडू ६ मुलांत समान वाटले तर प्रत्येकाला किती?") व उदाहरण ब ("२४ लाडवांपैकी एका डब्यात ४ लाडू भरले तर किती डबे भरतील?") या दोन्ही समस्यांत भागाकार असला तरी त्यातील कोणते दोन प्रकार दिसतात?',
      opts: [
        'समान वाटणी (Partitive / Sharing) आणि गट पाडणे / पुनःपुन्हा वजाबाकी (Quotative / Grouping) भागाकार',
        'गुणाकार व घातांक',
        'परिमिती व घनफळ',
        'मूळ व संयुक्त अंदाज',
      ],
      exp: 'भागाकाराच्या वाटणी आणि गट-पाडणी अशा दोन्ही प्रकारच्या शाब्दिक उदाहरणांचा सराव सर्व बाजूंनी समज पक्की करतो.',
    },
    hi: {
      q: 'प्रश्न A ("24 लड्डू 6 बच्चों में बराबर बाँटें तो प्रत्येक को कितने?") और प्रश्न B ("24 लड्डू में से हर डिब्बे में 4 भरें तो कितने डिब्बे?")—दोनों में भाग की किन दो संरचनाओं का अंतर दिखता है?',
      opts: [
        'समान बँटवारा (Partitive / Sharing) बनाम समूह निर्माण / बार-बार घटाव (Quotative / Grouping) भाग',
        'गुणा बनाम घातांक',
        'परिमाप बनाम आयतन',
        'अभाज्य बनाम भाज्य आकलन',
      ],
      exp: 'बाँटने (Partitive) और समूह बनाने (Quotative) दोनों प्रकार के इबारती प्रश्न कराने से भाग की अवधारणा संपूर्ण होती है।',
    },
  },
  {
    topic: 'Protractor Dual-Scale Angle Error',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Measuring a clearly narrow sharp ACUTE angle with a half-circle protractor, a Class 5 pupil reads the outer scale and writes "135°." What crucial preliminary habit cures protractor scale confusion?',
      opts: [
        'Always classify visually FIRST ("Smaller than a square 90° corner -> Acute, so it MUST be 45°, NOT 135°!") before reading numbers',
        'Always pick the larger of the two numbers printed on the protractor',
        'Never align the baseline on 0°',
        'Measure arc centimeters with a ruler instead of degrees',
      ],
      exp: 'Bench-marking against a 90° right-angle corner eliminates 90% of inner/outer scale slips immediately.',
    },
    mr: {
      q: 'कोनमापकाने (Protractor) स्पष्टपणे निमुळता दिसणारा लघुकोन मोजताना इ. ५ वीतील मुलगा चुकीने बाहेरील पट्टी वाचून "१३५°" लिहितो; ही चूक टाळण्याची सर्वोत्तम पूर्व-सवय कोणती?',
      opts: [
        'आकडा वाचण्याआधी डोळ्यांनी तुलना करणे ("हा ९०° काटकोनापेक्षा लहान लघुकोन आहे, म्हणून उत्तर ४५° असेल, १३५° नाही!")',
        'नेहमी कोनमापकावरील मोठा आकडा निवडणे',
        'कधीही तळरेषा ०° वर न ठेवणे',
        'अंशाऐवजी सेमी पट्टीने मोजणे',
      ],
      exp: 'मोजमापाआधी कोन काटकोनापेक्षा लहान (लघुकोन) की मोठा (विशालकोन) याचा अंदाज घेतल्यास कोनमापकावरील उलट्या पट्टीची चूक टळते.',
    },
    hi: {
      q: 'चाँदे से स्पष्टतः नुकीला न्यूनकोण नापते समय कक्षा 5 का छात्र बाहरी पैमाना पढ़कर "135°" लिख देता है; इस भ्रांति को रोकने की सर्वोत्तम पूर्व-आदत क्या है?',
      opts: [
        'माप पढ़ने से पहले दृष्टि से अनुमान लगाना ("यह 90° समकोण से छोटा है—न्यूनकोण, अतः 45° होगा, 135° नहीं!")',
        'हमेशा चाँदे पर छपा बड़ा अंक चुनना',
        'आधार रेखा कभी 0° पर न रखना',
        'डिग्री की बजाय पटरी से सेंटीमीटर मापना',
      ],
      exp: 'मापने से पहले 90° समकोण से तुलना कर कोटि तय कर लेने से भीतरी-बाहरी पैमाने की भूल तुरंत पकड़ में आ जाती है।',
    },
  },
  {
    topic: 'Same-Perimeter Unequal-Area Misconception',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Many Class 5 learners mistakenly assume, "If two rectangles have the exact same 24 cm perimeter, they must also enclose the exact same area!" How should a teacher dismantle this misconception constructively?',
      opts: [
        'Have pairs tie a 24 cm string loop around geoboard pins to form 1×11 (Area 11), 4×8 (Area 32), and 6×6 (Area 36) shapes and count enclosed squares directly',
        'Dictate "Area and Perimeter are unrelated" five times loudly',
        'Forbid students from drawing rectangles of different shapes',
        'Avoid teaching area until Class 9',
      ],
      exp: 'Fixed-loop string exploration proves visually that long skinny shapes hold tiny areas while compact squares maximize enclosed space.',
    },
    mr: {
      q: 'इ. ५ वीतील अनेक विद्यार्थ्यांचा असा गैरसमज असतो की "दोन आयतांची परिमिती २४ सेमी समान असेल तर त्यांचे क्षेत्रफळही समानच असते!" हा गैरसमज रचनात्मकरीत्या कसा दूर कराल?',
      opts: [
        '२४ सेमी लांबीच्या एकाच दोऱ्याचा फास जिओबोर्डवर ठेवून १×११ (क्षेत्रफळ ११), ४×८ (३२) व ६×६ (३६) आकार तयार करून आतील चौरस मोजायला लावून',
        'फक्त व्याख्या पाच वेळा मोठ्याने सांगून',
        'वेगवेगळ्या लांबी-रुंदीचे आयत काढण्यास मनाई करून',
        'क्षेत्रफळ शिकवणे इ. ९ वीपर्यंत पुढे ढकलून',
      ],
      exp: 'एकाच परिमितीच्या दोऱ्यातून वेगवेगळ्या क्षेत्रफळांचे आकार प्रत्यक्ष तयार केल्यास परिमिती-क्षेत्रफळ भिन्नता कायमची स्पष्ट होते.',
    },
    hi: {
      q: 'कक्षा 5 के कई छात्रों की भ्रांति होती है कि "यदि दो आयतों का परिमाप 24 सेमी बराबर है तो उनका क्षेत्रफल भी बराबर होगा!" इस भ्रांति को रचनात्मक रूप से कैसे तोड़ेंगे?',
      opts: [
        '24 सेमी के एक ही धागे के लूप से जियोबोर्ड पर 1×11 (क्षेत्रफल 11), 4×8 (32) और 6×6 (36) आयत बनाकर भीतर के वर्ग गिनवाकर',
        '"परिमाप और क्षेत्रफल अलग हैं" पाँच बार रटवाकर',
        'अलग आकृति के आयत बनाने से रोककर',
        'कक्षा 9 तक क्षेत्रफल टालकर',
      ],
      exp: 'स्थिर परिमाप वाले धागे से विभिन्न आयत बनवाकर भीतर के वर्ग गिनने से छात्र स्वयं देखते हैं कि आकार बदलने पर क्षेत्रफल बदलता है।',
    },
  },
  {
    topic: 'Zero as Multiplier Concrete Context',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Notice several Class 2 learners write "6 × 0 = 6" because multiplying "usually makes numbers bigger or leaves things alone." Which concrete classroom story corrects this immediately?',
      opts: [
        'Placing 6 empty paper plates on the table with 0 laddoos on each plate and asking: "How many laddoos are there altogether on all 6 plates?"',
        'Explaining axiomatic ring identity properties formally',
        'Cross-marking papers silently without discussion',
        'Banning zero from multiplication tables altogether',
      ],
      exp: 'Framing `a × b` as `a` groups of `b` items makes `6 groups of 0` self-evidently 0.',
    },
    mr: {
      q: 'इ. २ रीतील काही मुले "६ × ० = ६" असे लिहितात; ही चूक तात्काळ सुधारण्यासाठी कोणते प्रत्यक्ष वर्गातील उदाहरण सर्वोत्तम ठरेल?',
      opts: [
        'टेबलावर ६ रिकाम्या कागदी ताटल्या ठेवून प्रत्येक ताटलीत ० लाडू आहेत असे दाखवून विचारणे: "सर्व ६ ताटल्यांत मिळून एकूण किती लाडू आहेत?"',
        'बीजगणिती रिंग तत्त्वांची औपचारिक व्याख्या देणे',
        'चर्चा न करता फक्त लाल फुल्या मारणे',
        'पाढ्यांतून शून्य पूर्णपणे काढून टाकणे',
      ],
      exp: 'गुणाकार म्हणजे "गट × प्रत्येक गटातील वस्तू" या अर्थामुळे ६ रिकाम्या ताटल्यांतील एकूण लाडू = ० हे सहज कळते.',
    },
    hi: {
      q: 'कक्षा 2 के कई छात्र "6 × 0 = 6" लिखते हैं। इस त्रुटि को तुरंत सुधारने के लिए कौन-सा ठोस संदर्भ श्रेष्ठ होगा?',
      opts: [
        'मेज़ पर 6 खाली कागज़ की प्लेटें रखकर और हर प्लेट में 0 लड्डू बताकर पूछना: "सभी 6 प्लेटों में मिलाकर कुल कितने लड्डू हैं?"',
        'बीजगणितीय वलय अभिगृहीतों की औपचारिक परिभाषा देना',
        'बिना चर्चा चुपचाप क्रॉस लगा देना',
        'पहाड़ों से शून्य को पूरी तरह हटा देना',
      ],
      exp: 'गुणा को "समूह × प्रत्येक समूह में वस्तुएँ" रूप में दिखाने से 6 खाली प्लेटों में कुल 0 लड्डू होना स्वतः स्पष्ट हो जाता है।',
    },
  },
  {
    topic: 'Non-Standard Units Before Standard Ruler',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why do Class 2–3 curricula ask pupils to measure the teacher’s desk first with handspans (वित), foot-lengths, and matchsticks BEFORE introducing the 30 cm metric ruler?',
      opts: [
        'Experiencing differing handspan counts between a tall and a short classmate creates genuine curiosity and need for an agreed universal standard unit',
        'Handspans remain more precise for bridge engineering than millimetres',
        'Schools cannot afford plastic scales in Class 3',
        'Young children must never see numbers above 10',
      ],
      exp: 'Discovering why non-standard body units clash gives historical and logical motivation for standard centimetres/metres.',
    },
    mr: {
      q: '३० सेमीची प्रमाणित पट्टी शिकवण्याआधी इ. २ री–३ रीत मुलांना बाक किंवा टेबलाची लांबी वीत, पाऊल व काड्यांनी मोजायला का सांगतात?',
      opts: [
        'वेगवेगळ्या मुलांच्या वितांची संख्या वेगळी आल्याचा प्रत्यक्ष अनुभव घेतल्यानेच सर्वांसाठी एकसारख्या प्रमाणित एककाची गरज मनापासून जाणवते',
        'इंजिनिअरिंगमध्ये वितांचे माप मिमीपेक्षा अचूक असते',
        'शाळांकडे प्लास्टिकच्या पट्ट्या नसतात',
        'लहान मुलांना १० पेक्षा मोठ्या संख्या दाखवू नयेत',
      ],
      exp: 'अप्रेमाणित एककांतील तफावत स्वतः अनुभवल्यामुळेच मीटर-सेंटीमीटर या प्रमाणित एककांचे महत्त्व तार्किकदृष्ट्या पटते.',
    },
    hi: {
      q: '30 सेमी का मानक पैमाना (रूलर) सिखाने से पहले कक्षा 2–3 में मेज़ को बालिश्त, कदम और माचिस की तीलियों से क्यों नपवाया जाता है?',
      opts: [
        'अलग-अलग बच्चों के बालिश्त से अलग संख्या आने का अनुभव स्वयं यह आवश्यकता जगाता है कि सबके लिए एक समान मानक इकाई होनी चाहिए',
        'इंजीनियरिंग में बालिश्त मिलीमीटर से अधिक सटीक होता है',
        'स्कूलों में प्लास्टिक के रूलर उपलब्ध नहीं होते',
        'बच्चों को 10 से बड़ी संख्या नहीं दिखानी चाहिए',
      ],
      exp: 'अमानक इकाइयों से मिलने वाले भिन्न परिणाम स्वयं प्रमाणित सेंटीमीटर/मीटर की उपयोगिता को तर्कसंगत बनाते हैं।',
    },
  },
  {
    topic: 'Paper-Strip Folding Before Cross-Multiplying Fractions',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Before drilling rules like "multiply top and bottom by the same number," having Class 4 pupils fold three equal paper strips into halves (1/2 shaded), quarters (2/4 shaded), and eighths (4/8 shaded) stacked vertically enables them to:',
      opts: [
        'See physically that equal lengths are covered even though cut into finer pieces—constructing equivalent fractions meaningfully',
        'Practice origami airplane throwing only',
        'Believe 4/8 is four times bigger than 1/2',
        'Avoid learning fractions until high school',
      ],
      exp: 'Aligning folded fraction walls anchors why 1/2 = 2/4 = 4/8 represents identical proportion partitioned differently.',
    },
    mr: {
      q: '"अंश व छेदाला एकाच संख्येने गुणा" हा नियम पाठ करवण्याआधी इ. ४ थीच्या मुलांना तीन सारख्या कागदी पट्ट्यांचे निम्मे (१/२), चार (२/४) व आठ (४/८) भाग घड्या घालून एकाखाली एक ठेवून पाहू दिल्यास काय साध्य होते?',
      opts: [
        'तुकडे लहान झाले तरी रंगवलेली एकूण लांबी तंतोतंत सारखीच राहते हे प्रत्यक्ष पाहून सममूल्य अपूर्णांकांची खरी समज तयार होते',
        'केवळ कागदी विमाने बनवण्याचा सराव होतो',
        '४/८ हे १/२ पेक्षा चौपट मोठे असल्याचा गैरसमज होतो',
        'अपूर्णांक शिकणे माध्यमिक स्तरावर ढकलले जाते',
      ],
      exp: 'कागदी पट्ट्यांच्या सममूल्य भिंतीवरून अपूर्णांकाची किंमत न बदलता विभागांची संख्या कशी बदलते हे सहज समजते.',
    },
    hi: {
      q: '"अंश व हर को समान संख्या से गुणा करो" नियम रटवाने से पहले कक्षा 4 के छात्रों से तीन बराबर कागज़ी पट्टियों को आधा (1/2), चौथाई (2/4) और आठवाँ (4/8) मोड़कर ऊपर-नीचे रखवाने से क्या सधता है?',
      opts: [
        'वे प्रत्यक्ष देखते हैं कि हिस्से छोटे होने पर भी रंगा कुल भाग बिल्कुल बराबर है—जिससे तुल्य भिन्न की सार्थक समझ बनती है',
        'केवल कागज़ के हवाई जहाज बनाने का अभ्यास होता है',
        'भ्रम होता है कि 4/8, 1/2 से चार गुना बड़ा है',
        'हाई स्कूल तक भिन्न टाल दिए जाते हैं',
      ],
      exp: 'कागज़ी पट्टी की भिन्न-दीवार दिखाती है कि बराबर मात्रा को अधिक छोटे भागों में बाँटने पर ही तुल्य भिन्न बनते हैं।',
    },
  },
  {
    topic: 'Mental Number Talk Decomposition Strategy',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'During a 5-minute mental math "Number Talk" on 68 + 29 without paper, one pupil shares: "I added 68 + 30 = 98, then took away 1 to get 97!" Which mathematical capacity should the teacher explicitly celebrate here?',
      opts: [
        'Flexible number sense and Landmark/Compensation strategy rather than mimicking only rigid right-to-left column carrying',
        'Reprimand for not lining digits up vertically in air',
        'Accusing the student of guessing without standard column marks',
        'Insisting everyone follow only one approved written script',
      ],
      exp: 'Landmark rounding + compensation demonstrates deep number flexibility central to numeracy fluency.',
    },
    mr: {
      q: 'कागद-पेन न वापरता "६८ + २९" तोंडी सोडवताना एक विद्यार्थी सांगतो: "मी ६८ + ३० = ९८ केले आणि १ जादा घेतलेला वजा करून ९७ काढले!" शिक्षकाने यातून नेमके कशाचे कौतुक करावे?',
      opts: [
        'लवचिक संख्याज्ञान व पूर्ण दशक भरपाई युक्तीचे (Landmark/Compensation Strategy) — यांत्रिक उभ्या बेरजेपलीकडचा विचार',
        'हवेत उभे आकडे न लिहिल्याबद्दल रागावणे',
        'पद्धत चुकली असा आरोप करणे',
        'सर्वांनी केवळ एकच ठरलेली रीत वापरण्याची सक्ती करणे',
      ],
      exp: 'संख्यांना पूर्ण दशकाजवळ नेऊन नंतर तफावत समायोजित करणे हे प्रगल्भ संख्याज्ञानाचे व लवचिक मानसिक गणिताचे लक्षण आहे.',
    },
    hi: {
      q: 'बिना कागज़-कलम के "68 + 29" की मौखिक चर्चा (Number Talk) में एक छात्र कहता है: "मैंने 68 + 30 = 98 जोड़े, फिर 1 घटाकर 97 निकाल लिया!" शिक्षक को किस क्षमता की सराहना करनी चाहिए?',
      opts: [
        'लचीले संख्या-बोध और पूर्ण दहाई क्षतिपूर्ति रणनीति (Compensation Strategy) की, न कि केवल यांत्रिक स्तंभ-विधि की',
        'हवा में लंबवत स्तंभ न बनाने पर टोकना',
        'बिना मानक हासिल चिह्नों के तुक्का लगाने का आरोप लगाना',
        'सब पर केवल एक ही लिखित चरणबद्ध विधि थोपना',
      ],
      exp: 'निकटतम दहाई से जोड़कर क्षतिपूर्ति करना गहरा संख्यात्मक लचीलापन और उच्च कोटि की मानसिक गणना दर्शाता है।',
    },
  },
  {
    topic: 'Keyword Trap in Word Problems',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Teaching a shortcut like "Whenever a problem says ALTOGETHER or MORE, ALWAYS add!" backfires severely when Class 3 pupils meet: "Asha has 12 marbles altogether. 5 are blue. How many are red?" Why?',
      opts: [
        'Blind keyword rules bypass reading comprehension and situation modeling—here "altogether" states the whole (12), requiring subtraction (12 − 5)',
        'Because children in Class 3 cannot read two sentences',
        'Because subtraction never handles marble problems',
        'Because keywords are 100% reliable in all competitive exams',
      ],
      exp: 'Visual part-whole bar diagrams ("Total = 12, Blue = 5, Red = ?") build genuine comprehension instead of brittle keyword tricks.',
    },
    mr: {
      q: '"प्रश्नात ‘एकूण’ किंवा ‘अधिक’ शब्द दिसला की नेहमी बेरीज करा!" अशी यांत्रिक क्लृप्ती शिकवल्यास "आशाकडे एकूण १२ गोट्या आहेत, त्यांतील ५ निळ्या आहेत तर लाल किती?" या प्रश्नात मुले का फसतात?',
      opts: [
        'शब्द-क्लृप्त्यांमुळे वाचन-आकलन बाजूला राहते; येथे "एकूण" पूर्ण संच (१२) दाखवतो ज्यातून वजाबाकी (१२ − ५) करणे आवश्यक आहे',
        'इ. ३ रीतील मुलांना दोन वाक्ये वाचता येत नाहीत',
        'गोट्यांच्या प्रश्नात वजाबाकी वापरता येत नाही',
        'शब्द-क्लृप्त्या सर्व परीक्षांत १००% बिनचूक असतात',
      ],
      exp: 'यांत्रिक कीवर्ड नियम समस्येच्या संदर्भाची समज मारतात; त्याऐवजी भाग-पूर्ण पट्टी आकृती (Bar model) काढायला शिकवणे अचूक ठरते.',
    },
    hi: {
      q: '"जब भी प्रश्न में ‘कुल’ या ‘अधिक’ शब्द दिखे, हमेशा जोड़ करो!" जैसा शॉर्टकट सिखाने पर बच्चे "आशा के पास कुल 12 कंचे हैं, 5 नीले हैं, लाल कितने?" में क्यों गलती करते हैं?',
      opts: [
        'अंधे कीवर्ड नियम संदर्भ की समझ रोकते हैं—यहाँ "कुल" संपूर्ण (12) बताता है और लाल कंचे निकालने हेतु घटाव (12 − 5) चाहिए',
        'कक्षा 3 के बच्चे दो वाक्य नहीं पढ़ सकते',
        'कंचों के प्रश्न में घटाव लागू नहीं होता',
        'कीवर्ड ट्रिक हर परीक्षा में 100% सही बैठती है',
      ],
      exp: 'कीवर्ड रटवाने के बजाय परिस्थिति का चित्र या भाग-पूर्ण बार मॉडल बनवाना वास्तविक समस्या-समाधान समझ विकसित करता है।',
    },
  },
  {
    topic: 'Estimation Before Exact Vertical Computation',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'When multiplying 38 × 49 vertically, a Class 5 pupil forgets the tens-row zero and writes 494 instead of 1,862. Asking FIRST "Roughly how big should ~40 × 50 be?" (≈ 2,000) nurtures:',
      opts: [
        'Reasonableness estimation — catching gross decimal/place-value blunders independently before turning papers in',
        'Wild careless guessing to avoid exact arithmetic',
        'Slower mental fatigue during unit exams',
        'Ignoring units digits completely',
      ],
      exp: 'Habitual ballpark estimation empowers pupils to self-audit absurd answers immediately.',
    },
    mr: {
      q: '३८ × ४९ चा गुणाकार करण्यापूर्वी "अंदाजे ४० × ५० च्या आसपास (सुमारे २,०००) उत्तर यायला हवे" हा प्राथमिक अंदाज काढण्याची सवय लावल्याने मुलांत कोणती क्षमता वाढते?',
      opts: [
        'उत्तराच्या समर्पकतेची पडताळणी (Reasonableness check) — शून्य किंवा दशांशाची मोठी चूक स्वतःच तात्काळ पकडण्याची क्षमता',
        'अचूक गणित टाळून अंदाधुंद ठोकताळे बांधणे',
        'परीक्षेत विनाकारण वेग कमी होणे',
        'एकक अंकांकडे पूर्ण दुर्लक्ष करणे',
      ],
      exp: 'प्रत्यक्ष हिशेबापूर्वी ढोबळ अंदाज काढण्याची सवय विद्यार्थ्यांना स्वतःच्या उत्तरातील मोठ्या स्थानिक किमतीच्या चुका तपासायला शिकवते.',
    },
    hi: {
      q: '38 × 49 हल करने से पहले "यह लगभग 40 × 50 = 2,000 के आसपास होना चाहिए" ऐसा अनुमान लगाने की आदत छात्रों में क्या विकसित करती है?',
      opts: [
        'उत्तर की तार्किक उपयुक्तता जाँच (Reasonableness check) — जिससे शून्य या दशमलव की बड़ी भूल छात्र स्वयं पकड़ लेते हैं',
        'सटीक गणना से बचने की लापरवाह तुक्केबाज़ी',
        'परीक्षा में अनावश्यक थकान',
        'इकाई के अंक की पूरी उपेक्षा',
      ],
      exp: 'गणना से पूर्व सन्निकट अनुमान लगाना बच्चों को असंभव उत्तरों को स्वतः पहचानने और सुधारने में सक्षम बनाता है।',
    },
  },
  {
    topic: 'Open-Ended vs Closed Mathematical Prompts',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Compare Task X: "Calculate 36 ÷ 4" with Task Y: "Create TWO different rectangles whose area is 36 sq cm and compare their perimeters." Why does NCF 2005 advocate weaving Task Y regularly alongside basic practice?',
      opts: [
        'Open-ended tasks invite multiple valid solutions, mathematical argumentation, and deeper conceptual relationships rather than single mechanical recall',
        'Task Y eliminates the need to know multiplication tables',
        'Closed tasks have zero educational value anywhere',
        'Open-ended tasks can never be evaluated',
      ],
      exp: 'Open-ended questions stretch both struggling and gifted students simultaneously at varied entry points.',
    },
    mr: {
      q: 'प्रश्न अ ("३६ ÷ ४ किती?") च्या तुलनेत प्रश्न ब ("३६ चौ.सेमी. क्षेत्रफळ असलेले दोन वेगवेगळे आयत काढा व त्यांच्या परिमितीची तुलना करा") असे मुक्त-उत्तर (Open-ended) प्रश्न नियमित ठेवण्यास NCF 2005 का सांगते?',
      opts: [
        'यामुळे एकापेक्षा अधिक वैध उत्तरे, तर्कशुद्ध चर्चा आणि संकल्पनांतील परस्परसंबंधांची सखोल समज विकसित होते',
        'यामुळे पाढे पाठ करण्याची गरजच राहत नाही',
        'बंद-उत्तर प्रश्नांना काहीच किंमत नसते',
        'मुक्त-उत्तर प्रश्नांचे मूल्यमापनच होऊ शकत नाही',
      ],
      exp: 'मुक्त-उत्तर गणिती प्रश्न विद्यार्थ्यांना विचार स्वातंत्र्य, विविध मार्ग शोधण्याची संधी आणि सखोल तर्क मांडण्याची सवय देतात.',
    },
    hi: {
      q: 'प्रश्न X ("36 ÷ 4 ज्ञात करें") की तुलना में प्रश्न Y ("36 वर्ग सेमी क्षेत्रफल वाले दो अलग आयत बनाएँ और उनके परिमापों की तुलना करें") जैसे मुक्त-अंत प्रश्न NCF 2005 क्यों सुझाता है?',
      opts: [
        'मुक्त-अंत प्रश्न एक से अधिक सही समाधान, गणितीय तर्क-वितर्क और अवधारणाओं के गहरे अंतर्संबंध खोजने का अवसर देते हैं',
        'इनसे पहाड़े सीखने की आवश्यकता ही नहीं रहती',
        'बंद-अंत प्रश्नों का कोई शैक्षिक मूल्य नहीं है',
        'मुक्त-अंत प्रश्नों की जाँच कभी नहीं हो सकती',
      ],
      exp: 'मुक्त-अंत गणितीय कार्य यांत्रिक गणना से आगे बढ़कर सृजनात्मक अन्वेषण और संबंधों की समझ को बढ़ावा देते हैं।',
    },
  },
  {
    topic: 'Pólya Four-Step Problem Solving Model',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What is the fourth and frequently neglected final phase of George Pólya’s famous four-step mathematical problem-solving framework?',
      opts: [
        'Looking Back (checking reasonableness, reflecting on alternative methods, and generalizing the insight)',
        'Erasing rough work immediately',
        'Skipping word problems entirely',
        'Memorizing the textbook page number',
      ],
      exp: 'Pólya’s four stages—Understand the Problem, Devise a Plan, Carry Out the Plan, Look Back—treat verification and reflection as core.',
    },
    mr: {
      q: 'जॉर्ज पोलिया यांच्या चार-टप्पी गणितीय समस्या-निराकरण आराखड्यातील अनेकदा दुर्लक्षित केला जाणारा चौथा आणि अत्यंत महत्त्वाचा अंतिम टप्पा कोणता?',
      opts: [
        'मागे वळून तपासणे (Looking Back — उत्तराची पडताळणी, पर्यायी रीतींचा विचार व सामान्यीकरण)',
        'कच्चे काम लगेच पुसून टाकणे',
        'शाब्दिक उदाहरणे सोडून देणे',
        'पाठ्यपुस्तकाचा पृष्ठ क्रमांक पाठ करणे',
      ],
      exp: 'समजणे -> योजना -> अंमलबजावणी -> मागे वळून तपासणे (Looking Back) हा चौथा टप्पा चुका सुधारतो व शिकलेले सामान्यीकरण पक्के करतो.',
    },
    hi: {
      q: 'जॉर्ज पोल्या के चार-चरणीय समस्या-समाधान मॉडल का चौथा और अक्सर उपेक्षित अंतिम चरण क्या है?',
      opts: [
        'पीछे मुड़कर जाँचना (Looking Back — उत्तर की उपयुक्तता सत्यापित करना, वैकल्पिक विधियाँ सोचना और सामान्यीकरण करना)',
        'रफ कार्य तुरंत मिटा देना',
        'इबारती प्रश्न छोड़ देना',
        'पाठ्यपुस्तक की पृष्ठ संख्या रट लेना',
      ],
      exp: 'पोल्या के चार चरण—समझना, योजना बनाना, क्रियान्वयन करना, और पीछे मुड़कर जाँचना (Looking Back)—आत्म-सत्यापन को केंद्र में रखते हैं।',
    },
  },
  {
    topic: 'Geoboard & Tangram Spatial Flexibility',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Using a 7-piece Tangram puzzle and rubber-band Geoboards in Classes 2–4 develops which crucial geometric foundation?',
      opts: [
        'Conservation of shape under transformations, decomposing/composing composite figures, and spatial visualization',
        'Memorizing trigonometric identities mechanically',
        'Measuring liquid volume in litres',
        'Copying neat cursive signatures',
      ],
      exp: 'Tangrams and Geoboards let learners physically rotate, combine, and partition polygons dynamically.',
    },
    mr: {
      q: 'इ. २ री ते ४ थ्या वर्गात ७-तुकड्यांचा टॅनग्रॅम (Tangram) आणि जिओबोर्ड (Geoboard) वापरल्याने कोणता महत्त्वाचा भूमितीय पाया भक्कम होतो?',
      opts: [
        'आकृत्या फिरवल्या तरी आकार टिकणे, मोठ्या आकारांचे तुकडे जोडणे-विभागणे आणि अवकाशीय कल्पनाशक्ती विकसित होणे',
        'त्रिकोणमितीय सूत्रे यांत्रिकपणे पाठ होणे',
        'लिटरमध्ये द्रव आकारमान मोजणे',
        'सुलेखन स्वाक्षऱ्या करणे',
      ],
      exp: 'टॅनग्रॅम व जिओबोर्डमुळे मुले बहुभुजाकृती स्वतः हाताने जोडून, बदलून व विभागून अवकाशीय तर्क शिकतात.',
    },
    hi: {
      q: 'कक्षा 2–4 में 7-टुकड़ों वाले टैनग्राम और रबर-बैंड जियोबोर्ड के उपयोग से किस प्रमुख ज्यामितीय आधार का विकास होता है?',
      opts: [
        'आकृतियों के संयोजन-विभाजन, रूपांतरण में आकृति संरक्षण और स्थानिक दृश्य कल्पना का विकास',
        'त्रिकोणमितीय सर्वसमिकाएँ यांत्रिक रूप से रटना',
        'लीटर में द्रव मापना',
        'सुलेख हस्ताक्षर का अभ्यास',
      ],
      exp: 'टैनग्राम और जियोबोर्ड बच्चों को बहुभुजों को प्रत्यक्ष जोड़ने, तोड़ने और घुमाकर स्थानिक तर्क समझने की शक्ति देते हैं।',
    },
  },
  {
    topic: 'Developmental Sequence in Data Representation',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which developmental progression aligns naturally with how primary pupils learn Data Handling from Class 1 to Class 5?',
      opts: [
        'Sorting concrete objects -> Tally marks/real pictographs (1:1) -> Scaled pictographs (1 icon = 5 units) -> Bar graphs with uniform axes',
        'Histograms and Pie-chart radians first -> Concrete sorting later',
        'Memorizing standard deviation formulas in Class 2',
        'Skipping graphs completely until algebra',
      ],
      exp: 'Moving from physical sorting -> 1:1 pictures -> many-to-one scaled icons -> coordinate axes tracks abstraction smoothly.',
    },
    mr: {
      q: 'इ. १ ली ते ५ वीपर्यंत "माहिती व्यवस्थापन (Data Handling)" शिकण्याचा नैसर्गिक विकासात्मक क्रम कोणता?',
      opts: [
        'प्रत्यक्ष वस्तूंचे वर्गीकरण -> ताळ्याच्या खुणा / १:१ चित्रालेख -> प्रमाणबद्ध चित्रालेख (१ चिन्ह = ५ वस्तू) -> स्तंभालेख',
        'प्रथम वृत्तालेख व प्रमाण विचलन -> नंतर वस्तू वर्गीकरण',
        'इ. २ रीतच मानक विचलन सूत्रे पाठ करणे',
        'बीजगणितापर्यंत सर्व आलेख वगळणे',
      ],
      exp: 'मूर्त वस्तूंचे गट, नंतर १:१ चित्रे, पुढे प्रमाणबद्ध चिन्हे व अखेरीस अक्षावरील स्तंभालेख असा क्रम आकलनास सुकर असतो.',
    },
    hi: {
      q: 'कक्षा 1 से 5 तक "आँकड़ों का प्रबंधन (Data Handling)" सीखने का स्वाभाविक विकासात्मक क्रम कौन-सा है?',
      opts: [
        'ठोस वस्तुओं का वर्गीकरण -> टैली चिह्न व 1:1 चित्रालेख -> पैमाने वाले चित्रालेख (1 प्रतीक = 5) -> एकसमान अक्षों वाले दंड आलेख',
        'पहले पाई-चार्ट डिग्री व आयतचित्र -> बाद में वस्तु छँटाई',
        'कक्षा 2 में मानक विचलन सूत्र रटना',
        'बीजगणित तक सभी ग्राफ छोड़ देना',
      ],
      exp: 'प्रत्यक्ष वर्गीकरण से 1:1 चित्र, फिर बहु-इकाई स्केल और अंत में दंड आलेख की ओर बढ़ना संज्ञानात्मक विकास के अनुरूप है।',
    },
  },
  {
    topic: 'Clock Reading Pedagogy Progression',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Using a geared classroom demonstration clock where turning the minute hand moves the hour hand naturally helps Class 2–3 children avoid which classic confusion?',
      opts: [
        'Assuming the hour hand freezes stiffly on 3 until 3:59 (helping them see at 3:45 the hour hand sits nearly three-quarters toward 4)',
        'Confusing digital minutes with kilogram weights',
        'Reading Roman numbers upside down',
        'Ignoring seconds hands during leap years',
      ],
      exp: 'Geared clocks reveal continuous proportional movement between both hands rather than jerky hourly jumps.',
    },
    mr: {
      q: 'मिनिटकाटा फिरवल्यास तासकाटाही आपोआप हळूहळू पुढे सरकणाऱ्या गिअरच्या घड्याळाने शिकवल्यास इ. २ री–३ रीतील मुलांचा कोणता नेहमीचा गोंधळ टळतो?',
      opts: [
        '३:४५ वाजता तासकाटा ३ वरच चिकटलेला नसून ४ च्या जवळ पोहोचलेला असतो हे नैसर्गिकरीत्या समजून घड्याळ चुकत नाही',
        'डिजिटल मिनिटे व किलोग्रॅमची गल्लत होते',
        'रोमन अंक उलटे वाचले जातात',
        'लीप वर्षांत सेकंद काटा थांबतो',
      ],
      exp: 'सांधेबंद (Geared) घड्याळामुळे तासकाट्याची सततची सूक्ष्म हालचाल प्रत्यक्ष दिसते आणि पावणे-साडे मधील गोंधळ टळतो.',
    },
    hi: {
      q: 'ऐसी गियर वाली प्रदर्शन घड़ी से पढ़ाना जिसमें मिनट सुई घुमाने पर घंटे की सुई भी स्वाभाविक रूप से सरके, किस आम भ्रम से बचाता है?',
      opts: [
        'यह मानने से कि 3:45 पर घंटे की सुई 3 पर जमी रहती है—बच्चे देखते हैं कि वह 4 के तीन-चौथाई करीब पहुँच जाती है',
        'मिनटों को किलोग्राम समझने से',
        'रोमन अंक उलटे पढ़ने से',
        'लीप वर्ष में सेकंड सुई अनदेखी करने से',
      ],
      exp: 'गियर वाली घड़ी दोनों सुइयों की सतत गति दिखाकर पौने और साढ़े जैसे समय पढ़ने की आम गलतियों को रोकती है।',
    },
  },
  {
    topic: 'Manipulative Dependency Prevention ("Bridging")',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Concrete Dienes blocks and ice-cream sticks are priceless when introducing regrouping. How does an expert teacher ensure Class 3 learners eventually transition cleanly BEYOND physical blocks to symbolic fluency?',
      opts: [
        'Pairing physical bundle actions side-by-side with quick visual sketches and written steps, then gradually fading blocks once oral explanation holds firm',
        'Confiscating all blocks abruptly on Day 2 without explanation',
        'Keeping 300-stick bundles mandatory even during Class 8 tests',
        'Never allowing blocks at all even in Class 1',
      ],
      exp: 'Bridging manipulative action -> sketch -> symbol prevents permanent block-dependence while cementing conceptual meaning.',
    },
    mr: {
      q: 'दशांश गट व काड्या हाताच्या बेरजेसाठी उत्तम आहेत, पण इ. ३ रीतील मुले कायम काड्यांवरच अवलंबून राहू नयेत म्हणून तज्ज्ञ शिक्षक चिन्हात्मक प्रवाहीपणाकडे कसा पूल बांधतात?',
      opts: [
        'काड्यांच्या कृतीसोबतच शेजारी छोटे चित्र व लिखित पायऱ्या जोडून, तोंडी स्पष्टीकरण पक्के झाल्यावर हळूहळू काड्यांचा आधार कमी करणे',
        'दुसऱ्याच दिवशी स्पष्टीकरणाविना काड्या हिसकावून घेणे',
        'इ. ८ वीच्या परीक्षेतही ३०० काड्यांचे गठ्ठे सक्तीचे ठेवणे',
        'इ. १ लीतही कधीच काड्या वापरू न देणे',
      ],
      exp: 'मूर्त कृती -> रेखाचित्र -> लिखित चिन्हे असा टप्प्याटप्प्याने आधार कमी केल्यास संकल्पना व अचूक गती दोन्ही साधतात.',
    },
    hi: {
      q: 'हासिल जोड़ सिखाने में डीन्स ब्लॉक और तीलियाँ अमूल्य हैं, पर कक्षा 3 के छात्र हमेशा इन्हीं पर निर्भर न रहें इसके लिए कुशल शिक्षक प्रतीकात्मक दक्षता की ओर सेतु कैसे बनाते हैं?',
      opts: [
        'ठोस ब्लॉक क्रिया के साथ-साथ चित्रांकन व लिखित चरण जोड़कर, और मौखिक समझ पक्की होने पर धीरे-धीरे ब्लॉक हटाकर',
        'दूसरे ही दिन बिना समझाए सारे ब्लॉक जब्त करके',
        'कक्षा 8 की परीक्षा में भी 300 तीलियों के बंडल अनिवार्य रखकर',
        'कक्षा 1 में भी कभी ब्लॉक न दिखाकर',
      ],
      exp: 'ठोस क्रिया के साथ समानांतर चित्र व लिखित संकेत जोड़ने और फिर धीरे-धीरे ब्लॉक हटाने से बिना रटे प्रतीकात्मक निपुणता आती है।',
    },
  },
  {
    topic: 'Cross-Curricular Math & EVS Integration',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'In July, a Class 5 section measures daily playground rainfall using a simple straight-sided jar rain gauge, records mm totals, computes weekly averages, and plots a monsoon bar chart. This project exemplifies:',
      opts: [
        'Meaningful integration of Mathematics (measurement, mean, graphing) with Environmental Studies',
        'Replacing math textbooks entirely with meteorology jargon',
        'Wasting arithmetic periods outdoors with zero data precision',
        'Pure memorization of state capitals',
      ],
      exp: 'Authentic local data makes millimetre units, averages, and vertical axis scales come alive purposefully.',
    },
    mr: {
      q: 'जुलै महिन्यात इ. ५ वीची मुले सरळ बाजूच्या काचेच्या बरणीतून रोजचा पाऊस मिलिमीटरमध्ये मोजतात, आठवड्याची सरासरी काढतात व स्तंभालेख बनवतात; हा उपक्रम काय साधतो?',
      opts: [
        'गणित (मापन, सरासरी, आलेख) आणि परिसर अभ्यास यांचे अर्थपूर्ण आंतरविद्याशाखीय एकीकरण',
        'हवामानशास्त्राच्या कठीण शब्दांनी गणिताचे पुस्तक बदलणे',
        'अचूकतेशिवाय बाहेर वेळ घालवणे',
        'केवळ राज्यांच्या राजधान्या पाठ करणे',
      ],
      exp: 'स्वतः मोजलेल्या पावसाच्या नोंदींवरून सरासरी व आलेख काढल्याने मिमी एकके व सांख्यिकी अर्थपूर्ण बनतात.',
    },
    hi: {
      q: 'जुलाई में कक्षा 5 के छात्र सीधी दीवार वाले जार से दैनिक वर्षा मिलीमीटर में मापते हैं, साप्ताहिक औसत निकालते हैं और दंड आलेख बनाते हैं; यह परियोजना क्या दर्शाती है?',
      opts: [
        'गणित (मापन, औसत, आलेख) का पर्यावरण अध्ययन के साथ सार्थक अंतःविषयक एकीकरण',
        'मौसम विज्ञान की शब्दावली से गणित पुस्तक बदलना',
        'बिना किसी आँकड़े के बाहर समय गँवाना',
        'केवल राज्यों की राजधानियाँ रटना',
      ],
      exp: 'स्वयं एकत्र किए वास्तविक वर्षा आँकड़ों पर औसत और ग्राफ बनाने से गणितीय अवधारणाएँ जीवंत व प्रासंगिक बनती हैं।',
    },
  },
  {
    topic: 'Symmetric Pattern Completion Mirror Axis',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Using a tiny pocket mirror held upright along a chalk line on dot-grid paper to predict and verify the reflection of half a butterfly or Rangoli pattern primarily helps Class 3–4 learners grasp:',
      opts: [
        'Equidistance and perpendicular reversal across an axis of reflection symmetry',
        'Three-dimensional prism volume formulas',
        'Compound interest rounding rules',
        'Linear equations with two unknowns',
      ],
      exp: 'Mirror checking gives immediate sensory verification of point-by-point symmetry across horizontal, vertical, and diagonal folds.',
    },
    mr: {
      q: 'ठिपक्यांच्या कागदावर अर्ध्या फुलपाखराचे किंवा रांगोळीचे चित्र काढून त्यावर छोटा आरसा उभा धरून प्रतिबिंब तपासणे इ. ३ री–४ थीच्या मुलांना कोणती संकल्पना प्रत्यक्ष समजावते?',
      opts: [
        'सममिती अक्षापासून बिंदूंचे समान अंतर व उलट परावर्तन (Reflection Symmetry)',
        'त्रिमितीय चितीच्या घनफळाचे सूत्र',
        'चक्रवाढ व्याज पूर्णांकन नियम',
        'दोन चलांतील रेषीय समीकरणे',
      ],
      exp: 'आरशातील प्रतिमेचा प्रत्यक्ष अनुभव अक्षीय सममितीतील समान अंतर व दिशा-बदल अचूकपणे दाखवतो.',
    },
    hi: {
      q: 'बिंदु-ग्रिड कागज़ पर आधी तितली या रंगोली बनाकर बीच में छोटा दर्पण खड़ा कर प्रतिबिंब जाँचना कक्षा 3–4 के छात्रों को क्या समझने में मदद करता है?',
      opts: [
        'परावर्तन सममिति अक्ष के दोनों ओर समान दूरी और विपरीत दिशा का संबंध',
        'त्रि-आयामी प्रिज्म आयतन सूत्र',
        'चक्रवृद्धि ब्याज सन्निकटन',
        'दो चरों वाले रैखिक समीकरण',
      ],
      exp: 'दर्पण परीक्षण क्षैतिज, ऊर्ध्वाधर और विकर्ण सममिति अक्षों के आर-पार समान दूरी की तत्काल दृश्य पुष्टि देता है।',
    },
  },
  {
    topic: 'Fair-Share Fraction Division Meaning',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Asking Class 4 pupils: "3 identical bhakris (flatbreads) must be shared equally among 4 friends—how much does each friend get?" BEFORE teaching `a ÷ b = a/b` leads children naturally to slice each bhakri into quarters and discover:',
      opts: [
        '3 wholes divided by 4 equals 3 quarters (3/4 each), linking division directly with fractions',
        'Sharing evenly is impossible whenever numerator < denominator',
        'Each friend receives 4/3 bhakris',
        'Fractions apply only to shaded pizzas larger than 1 whole',
      ],
      exp: 'Equal-sharing food problems unify whole-number division (`3 ÷ 4`) seamlessly with fractional notation (`3/4`).',
    },
    mr: {
      q: '`a ÷ b = a/b` हे सूत्र आधी न शिकवता इ. ४ थीच्या मुलांना विचारले, "३ सारख्या भाकऱ्या ४ मित्रांत समान वाटायच्या आहेत, तर प्रत्येकाला किती मिळेल?" कागदी वर्तुळे कापून मुले स्वतः कोणता संबंध शोधतात?',
      opts: [
        '३ पूर्ण भाकऱ्या भागिले ४ म्हणजे प्रत्येकाला तीन पाव (३/४), ज्यातून भागाकार व अपूर्णांक यांचा थेट संबंध जुळतो',
        'लहान संख्येला मोठ्या संख्येने भागताच येत नाही',
        'प्रत्येकाला ४/३ भाकरी मिळते',
        'अपूर्णांक फक्त १ पेक्षा मोठ्या वस्तूंवरच लागू होतात',
      ],
      exp: 'समान वाटणीच्या व्यावहारिक प्रसंगांतून ३ ÷ ४ = ३/४ हा भागाकार-अपूर्णांक सेतू आपोआप स्पष्ट होतो.',
    },
    hi: {
      q: '`a ÷ b = a/b` नियम पहले बताए बिना कक्षा 4 में पूछना: "3 बराबर रोटियाँ 4 दोस्तों में बराबर बाँटनी हैं—प्रत्येक को कितनी मिलेगी?" इससे छात्र स्वयं क्या खोजते हैं?',
      opts: [
        '3 को 4 से बाँटने पर प्रत्येक को 3/4 (तीन-चौथाई) मिलता है—जो भाग को सीधे भिन्न से जोड़ता है',
        'जब अंश हर से छोटा हो तो बराबर बाँटना असंभव है',
        'प्रत्येक को 4/3 रोटी मिलेगी',
        'भिन्न केवल 1 से बड़ी संख्याओं पर लागू होते हैं',
      ],
      exp: 'बराबर बँटवारे की व्यावहारिक समस्याएँ पूर्ण-संख्या विभाजन (3 ÷ 4) को भिन्न संकेतन (3/4) से स्वाभाविक रूप से जोड़ती हैं।',
    },
  },
  {
    topic: 'Mathematization Goal – NCF 2005 Narrow vs Higher',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'According to the NCF 2005 Position Paper on Teaching of Mathematics, what distinguishes the "Higher Aim" of school mathematics from the "Narrow Aim"?',
      opts: [
        'Narrow aim develops useful numeracy (calculations/measurements), whereas Higher aim develops children’s inner resources to think and reason mathematically ("Mathematization of the child’s mind")',
        'Narrow aim teaches calculus; Higher aim bans arithmetic',
        'Higher aim means memorizing longer phone numbers faster',
        'Both aims mean copying formulas silently from Class 1 to 10',
      ],
      exp: 'David Wheeler / NCF 2005 emphasize "Mathematization"—framing problems, abstracting structure, and validating logical arguments—as the supreme aim.',
    },
    mr: {
      q: 'NCF 2005 च्या गणित अध्यापन दस्तऐवजानुसार शालेय गणिताचे "संकुचित ध्येय" आणि "उच्च ध्येय" यांतील मुख्य फरक कोणता?',
      opts: [
        'संकुचित ध्येय दैनंदिन उपयुक्त संख्याज्ञान (बेरीज-मापन) देते, तर उच्च ध्येय मुलाच्या मनाचे गणितीकरण (तर्कशुद्ध विचार व समस्या-मांडणी) घडवते',
        'संकुचित ध्येय कलनशास्त्र शिकवते व उच्च ध्येय अंकगणित बंद करते',
        'उच्च ध्येय म्हणजे मोठे फोन नंबर वेगाने पाठ करणे',
        'दोन्हींचा अर्थ इ. १ ते १० पर्यंत फक्त सूत्रे उतरवणे असा आहे',
      ],
      exp: 'NCF 2005 नुसार केवळ उपयुक्त हिशेबापलीकडे जाऊन मुलांच्या विचारप्रक्रियेचे गणितीकरण (Mathematization) करणे हे उच्च ध्येय आहे.',
    },
    hi: {
      q: 'NCF 2005 के गणित शिक्षण आधार-पत्र के अनुसार स्कूली गणित के "संकीर्ण उद्देश्य" और "उच्च उद्देश्य" में क्या अंतर है?',
      opts: [
        'संकीर्ण उद्देश्य उपयोगी संख्यात्मक कौशल (गणना-मापन) सिखाता है, जबकि उच्च उद्देश्य बच्चे के मस्तिष्क का गणितीयकरण (तर्कपूर्ण व अमूर्त चिंतन) विकसित करता है',
        'संकीर्ण उद्देश्य कलन सिखाता है और उच्च उद्देश्य अंकगणित हटाता है',
        'उच्च उद्देश्य का अर्थ बड़े फ़ोन नंबर रटना है',
        'दोनों का अर्थ केवल सूत्र नकल करना है',
      ],
      exp: 'NCF 2005 उपयोगी गणना (संकीर्ण उद्देश्य) से ऊपर उठकर तार्किक सोच व समस्या-निरूपण यानी "मस्तिष्क के गणितीयकरण" को उच्च लक्ष्य मानता है।',
    },
  },
  {
    topic: 'Diagnostic Error – Subtracting Smaller Digit Always',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'A Class 3 learner solves `62 − 28 = 46` (explaining: "6 − 2 = 4 and 8 − 2 = 6!"). How should the teacher guide her away from this "always subtract smaller from larger" bug?',
      opts: [
        'Represent 62 literally as 6 ten-bundles + 2 loose sticks, ask her to physically hand over 8 loose sticks, triggering the concrete need to unbundle one ten into 12 ones',
        'Circle 46 in bright red and write "Careless, redo 10 times"',
        'Tell her to guess closer to 40 automatically',
        'Skip 2-digit subtraction and teach multiplication immediately',
      ],
      exp: 'Unbundling a physical 10-bundle makes 12 − 8 tangible so pupils never treat columns as detached upward-downward pairs.',
    },
    mr: {
      q: 'इ. ३ रीतील मुलगी `६२ − २८ = ४६` करते ("६ − २ = ४ आणि ८ − २ = ६!"). नेहमी मोठ्या अंकातून लहान अंक वजा करण्याची ही चूक कशी सुधाराल?',
      opts: [
        '६२ म्हणजे १० च्या ६ जुड्या व २ सुट्या काड्या प्रत्यक्ष मांडून त्यांतून ८ सुट्या काड्या देण्यास सांगणे, ज्यामुळे एक जुडी सुटी करून १२ करण्याची गरज स्वतः जाणवेल',
        'लाल पेनाने फुली मारून १० वेळा पुन्हा लिहायला लावणे',
        'फक्त ४० च्या जवळ उत्तर अंदाजायला सांगणे',
        'वजाबाकी सोडून थेट गुणाकार सुरू करणे',
      ],
      exp: 'दशक जुडी मोडून सुटे एकक करून दाखवल्याने वरचा लहान अंक मोठा कसा होतो व खालील दोन स्तंभांत उलट वजाबाकी का चालत नाही हे स्पष्ट होते.',
    },
    hi: {
      q: 'कक्षा 3 की छात्रा `62 − 28 = 46` हल करती है ("6 − 2 = 4 और 8 − 2 = 6!")। "हमेशा बड़े अंक से छोटा घटाने" की इस भ्रांति को कैसे सुधारेंगे?',
      opts: [
        '62 को 6 दहाई बंडल + 2 खुली तीलियों से दिखाकर 8 खुली तीलियाँ निकालने को कहना—ताकि एक दहाई खोलकर 12 इकाई बनाने की वास्तविक आवश्यकता दिखे',
        'लाल पेन से काटकर "लापरवाह, 10 बार लिखो" कहना',
        '40 के आसपास अनुमान लगाने को कहना',
        'घटाव छोड़कर तुरंत गुणा शुरू कर देना',
      ],
      exp: 'ठोस दहाई बंडल खोलने की क्रिया दिखाती है कि ऊपर की संख्या छोटी होने पर कैसे दहाई से उधार लेकर 12 इकाइयाँ बनती हैं।',
    },
  },
];
