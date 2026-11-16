import { CuratedTrilingualMcq } from './types';

// Batch 2 Mathematics Pedagogy Part 2 (28 unique Primary Math Pedagogy Qs)
export const MAHA_TET_P1_B2_MATH_PED2: CuratedTrilingualMcq[] = [
  {
    topic: 'Newman Error Analysis Step 3 Transformation Error',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'In Anne Newman’s Error Analysis, a Class 4 pupil reads a word problem fluently and explains orally that she needs to share `36` laddoos equally among `4` plates, yet writes `36 − 4 = 32` in her notebook. Which error stage occurred?',
      opts: [
        'Transformation Error — failing to translate comprehended verbal meaning into the correct mathematical operation (`÷`)',
        'Reading Error — inability to decode printed digits or text',
        'Process Skill Error — making a computational slip while dividing `36 ÷ 4`',
        'Encoding Error — miswriting the final calculated quotient awkwardly',
      ],
      exp: 'Newman’s 5 steps progress: Reading → Comprehension → Transformation (choosing the operation) → Process Skills → Encoding. Correctly explaining sharing (`÷`) yet writing `−` marks a Transformation Error.',
    },
    mr: {
      q: 'ॲन न्यूमनच्या त्रुटी विश्लेषणानुसार एक विद्यार्थी शाब्दिक उदाहरण अचूक वाचतो व `36` लाडू `4` ताटांत समान वाटायचे आहेत हेही सांगतो, पण वहीत `36 − 4 = 32` लिहितो. हा कोणत्या टप्प्यावरील दोष आहे?',
      opts: [
        'रूपांतरण त्रुटी (Transformation Error) — समजलेल्या अर्थाचे योग्य गणितीय क्रियेत (`÷`) रूपांतर न जमणे',
        'वाचन त्रुटी (Reading Error) — शब्द व अंक वाचता न येणे',
        'प्रक्रिया कौशल्य त्रुटी — `36 ÷ 4` मोजताना झालेली आकडेमोडीची चूक',
        'लेखन/संकेतन त्रुटी (Encoding Error) — आलेले उत्तर चुकीच्या स्वरूपात लिहिणे',
      ],
      exp: 'प्रश्नाचा अर्थ कळला असूनही योग्य गणितीय चिन्ह (`÷` ऐवजी `−`) निवडण्यात अपयश येणे ही रूपांतरण त्रुटी होय.',
    },
    hi: {
      q: 'ऐनी न्यूमैन के त्रुटि विश्लेषण के अनुसार एक छात्र प्रश्न पढ़कर बताता है कि `36` लड्डू `4` थालियों में बराबर बाँटने हैं, पर कॉपी में `36 − 4 = 32` लिखता है। यह किस स्तर की त्रुटि है?',
      opts: [
        'रूपांतरण त्रुटि (Transformation Error) — समझे गए अर्थ को सही गणितीय संक्रिया (`÷`) में न बदल पाना',
        'पठन त्रुटि — अंक न पढ़ पाना',
        'प्रक्रिया कौशल त्रुटि — `36 ÷ 4` की गणना में चूक',
        'कूटलेखन त्रुटि — सही उत्तर को ठीक से न लिख पाना',
      ],
      exp: 'प्रश्न समझने के बाद सही गणितीय संक्रिया चुनने में विफलता को न्यूमैन ने रूपांतरण त्रुटि (Step 3) कहा है।',
    },
  },
  {
    topic: 'Bruner Spiral Curriculum Fractions Progression Classes 2 to 5',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'How does Jerome Bruner’s "Spiral Curriculum" structure fraction instruction across Maharashtra Classes 2 to 5?',
      opts: [
        'Revisits fractions repeatedly at higher cognitive depth: half/quarter paper folding in Class 2–3, equivalent/comparison models in Class 4, and arithmetic operations in Class 5',
        'Completes the entire fraction chapter in Class 2 and never mentions fractions again until Class 6',
        'Teaches fraction formulas purely by memorizing definitions in Class 1 before touching objects',
        'Covers only decimals in primary grades and pushes fractions exclusively to secondary school',
      ],
      exp: 'A spiral curriculum circles back to core big ideas at developmentally richer stages—moving from concrete fair-sharing to pictorial equivalence and formal computation.',
    },
    mr: {
      q: 'जेरोम ब्रुनर यांच्या "सर्पिलाकार अभ्यासक्रम (Spiral Curriculum)" तत्त्वानुसार इयत्ता २ ते ५ मध्ये अपूर्णांकांची रचना कशी केलेली असते?',
      opts: [
        'तीच संकल्पना टप्प्याटप्प्याने सखोल होत जाते: २ री-३ रीत अर्धा/पाव कागद घडी, ४ थीत सममूल्य व तुलना आणि ५ वीत अपूर्णांकांच्या क्रिया',
        'इयत्ता २ रीत संपूर्ण अपूर्णांक संपवून सहावीपर्यंत त्याकडे न पाहणे',
        'पहिलीतच सर्व सूत्रे तोंडपाठ करून घेणे',
        'प्राथमिक शाळेत फक्त दशांश ठेवून अपूर्णांक माध्यमिक शाळेत नेणे',
      ],
      exp: 'ब्रुनरच्या सर्पिलाकार रचनेत प्रत्येक टप्प्यावर पूर्वज्ञानावर उभारणी करून संकल्पना अधिकाधिक समृद्ध केली जाते.',
    },
    hi: {
      q: 'जेरोम ब्रूनर के "सर्पिलाकार पाठ्यक्रम (Spiral Curriculum)" के अनुसार कक्षा 2 से 5 तक भिन्नों का शिक्षण कैसे व्यवस्थित होता है?',
      opts: [
        'बढ़ते स्तर के साथ क्रमिक पुनरावृत्ति: कक्षा 2–3 में आधा-चौथाई कागज़ मोड़ना, कक्षा 4 में समतुल्य व तुलना, तथा कक्षा 5 में संक्रियाएँ',
        'कक्षा 2 में एक ही बार पूरा अध्याय समाप्त कर देना',
        'कक्षा 1 में ही केवल अमूर्त परिभाषाएँ रटवा देना',
        'प्राथमिक स्तर से भिन्न हटाकर केवल माध्यमिक में रखना',
      ],
      exp: 'सर्पिलाकार पाठ्यक्रम मूल अवधारणा को बार-बार अधिक गहन स्तर पर लाकर समझ को मजबूत करता है।',
    },
  },
  {
    topic: 'Multiplying By 10 Add Zero Misconception With Decimals',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Why does teaching the shortcut "To multiply any number by `10`, just put a `0` at the right end" create a serious misconception in Class 5?',
      opts: [
        'Pupils write `0.4 × 10 = 0.40` (no change in value!) instead of realizing that multiplying by `10` shifts every digit ONE place LEFT on the place-value chart',
        'Because `10` cannot multiply any two-digit whole number accurately',
        'Because putting a zero decreases whole numbers by ten',
        'Because calculators prohibit zeros in decimal answers',
      ],
      exp: 'Rules that expire ("just tack on a zero") mislead students with decimals; teaching "digits shift one place left across the decimal point" remains true for both `24 × 10 = 240` and `0.4 × 10 = 4`.',
    },
    mr: {
      q: '"कोणत्याही संख्येला `10` ने गुणताना शेवटी फक्त एक `0` जोडा" हा सोपा शॉर्टकट शिकवल्याने इयत्ता पाचवीत कोणता मोठा गैरसमज तयार होतो?',
      opts: [
        'दशांश अपूर्णांकांत विद्यार्थी `0.4 × 10 = 0.40` अशी चूक करतात; प्रत्येक अंक स्थानिक मूल्य तक्त्यात एक घर डावीकडे सरकतो हे शिकवणे सर्वत्र अचूक राहते',
        'कारण दोन-अंकी पूर्ण संख्यांना `10` ने गुणता येत नाही',
        'कारण शेवटी शून्य जोडल्याने पूर्ण संख्या लहान होते',
        'कारण संगणक दशांशामध्ये शून्य स्वीकारत नाही',
      ],
      exp: 'दशांशातही टिकणारा खरा नियम म्हणजे "`10` ने गुणल्यास प्रत्येक अंक एक स्थान डावीकडे जातो", न की केवळ शून्य चिकटवणे.',
    },
    hi: {
      q: '"किसी संख्या को `10` से गुणा करने पर अंत में बस एक `0` लगा दो" जैसी शॉर्टकट ट्रिक कक्षा 5 में कौन-सा बड़ा भ्रम पैदा करती है?',
      opts: [
        'छात्र `0.4 × 10 = 0.40` लिख देते हैं, जबकि वास्तव में `10` से गुणा करने पर हर अंक स्थानीय मान चार्ट में एक स्थान बाईं ओर खिसकता है',
        'क्योंकि पूर्ण संख्याओं को `10` से गुणा नहीं किया जा सकता',
        'क्योंकि शून्य लगाने से पूर्ण संख्या छोटी हो जाती है',
        'क्योंकि दशमलव में शून्य वर्जित है',
      ],
      exp: '"समाप्त होने वाले नियम (rules that expire)" के बजाय स्थानीय मान में अंक खिसकने का नियम पूर्ण व दशमलव दोनों में सत्य रहता है।',
    },
  },
  {
    topic: 'Clock Reading Misconception Hour Hand Between Numbers',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Looking at an analog clock showing `3:50`, a Class 3 pupil reads it as `4:50` because the hour hand is very close to the `4`. How should the teacher clarify this?',
      opts: [
        'Use a geared teaching clock (one where turning the minute hand smoothly advances the hour hand) to show that the hour hand moves steadily through the `3`-zone until reaching `12`',
        'Tell the child to cover the hour hand with tape and guess',
        'Use digital clocks exclusively and drop analog clock reading',
        'Scold the child for poor eyesight',
      ],
      exp: 'Observing a linked mechanical clock move from `3:00 → 3:30 → 3:50 → 4:00` shows why the hour hand approaches `4` during the `3 o’clock` hour without having passed it yet.',
    },
    mr: {
      q: 'घड्याळात `3:50` वाजले असताना तास काटा `4` च्या अगदी जवळ असल्याने इयत्ता तिसरीचा विद्यार्थी वेळ `4:50` वाचतो. शिक्षकांनी हा संभ्रम कसा दूर करावा?',
      opts: [
        'मिनिट काटा फिरवला की तास काटा हळूहळू पुढे सरकणारे गियर-घड्याळ वापरून, जोपर्यंत मिनिट काटा `12` वर पोहोचत नाही तोपर्यंत तास `3` चाच असतो हे दाखवून',
        'तास काटा कागदाने झाकून अंदाज लावायला सांगून',
        'काट्यांचे घड्याळ काढून फक्त डिजिटल घड्याळ शिकवून',
        'विद्यार्थ्याला डोळे तपासण्यास सांगून',
      ],
      exp: 'दोन्ही काटे जोडलेल्या घड्याळात `3:00 → 3:30 → 3:50 → 4:00` अशी हालचाल पाहिल्याने तास काट्याचे संक्रमण स्पष्ट होते.',
    },
    hi: {
      q: 'घड़ी में `3:50` बजने पर घंटे की सुई `4` के बहुत पास देख कर कक्षा 3 का छात्र उसे `4:50` पढ़ता है। शिक्षक इसे कैसे स्पष्ट करें?',
      opts: [
        'गियर-युक्त शिक्षण घड़ी घुमाकर यह दिखाएँ कि `3:00` से `4:00` के बीच घंटे की सुई धीरे-धीरे `4` की ओर बढ़ती है पर `12` से पहले `3` ही गिनी जाती है',
        'केवल डिजिटल घड़ी पढ़ाकर सुई वाली घड़ी हटा दें',
        'घंटे की सुई पर पट्टी चिपका दें',
        'बच्चे को केवल रटने को कहें',
      ],
      exp: 'जुड़े हुए काँटों की क्रमिक गति देखने से छात्र समझता है कि `4` के करीब दिखना `3` बजकर 50 मिनट ही है।',
    },
  },
  {
    topic: 'Non-Standard Area Measurement Bottle Caps Leave Gaps Square Tiling',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Before teaching `sq cm` area formulas, why is it illuminating to let Class 4 pupils try covering an A4 sheet first with circular bottle caps and then with square sticky-notes?',
      opts: [
        'Seeing unmeasurable gaps left between round bottle caps convinces pupils WHY area units must be gap-free tessellating squares (`sq units`)',
        'Because circular caps measure perimeter while squares measure weight',
        'Because square sticky-notes are always bigger than `1 sq m`',
        'So pupils learn how to glue waste plastic caps permanently into notebooks',
      ],
      exp: 'Circular objects fail to tile a plane without empty spaces; discovering that squares pack edge-to-edge without gaps builds deep intuition for square area units.',
    },
    mr: {
      q: '`चौ.सेमी.` क्षेत्रफळ सूत्र शिकवण्यापूर्वी इयत्ता चौथीच्या विद्यार्थ्यांना एका कागदावर प्रथम गोल बाटलीची झाकणे आणि नंतर चौरसाकृती कागदी चिठ्ठ्या ठेवून कागद झाकायला सांगण्याचा काय फायदा होतो?',
      opts: [
        'गोल झाकणांमध्ये मोकळ्या फटी राहतात हे पाहून क्षेत्रफळ मोजण्यासाठी रिकामी जागा न ठेवणारे "चौरस एकक" का निवडले जातात हे स्वतःच समजते',
        'कारण गोल झाकण परिमिती व चौरस वजन मोजतो',
        'कारण चौरस चिठ्ठ्या नेहमी `1 चौ.मी.` असतात',
        'वहीत प्लॅस्टिकची झाकणे चिकटवण्यासाठी',
      ],
      exp: 'वर्तुळांमध्ये फटी सुटतात आणि चौरस पूर्ण पृष्ठभाग न सोडता झाकतो हा अनुभव "क्षेत्रफळाचे एकक चौरस का असते?" याचे उत्तर देतो.',
    },
    hi: {
      q: 'कक्षा 4 में क्षेत्रफल का सूत्र सिखाने से पहले कागज़ को पहले गोल ढक्कनों और फिर वर्गाकार पर्चियों से ढकने का प्रयोग क्यों प्रभावशाली है?',
      opts: [
        'गोल ढक्कनों के बीच छूटी खाली जगह देखकर बच्चे स्वयं समझ जाते हैं कि क्षेत्रफल की इकाई बिना अंतराल के जुड़ने वाला "वर्ग" क्यों होती है',
        'क्योंकि गोल ढक्कन भार मापते हैं',
        'क्योंकि वर्ग का परिमाप नहीं होता',
        'ताकि कॉपियों पर प्लास्टिक चिपकाया जा सके',
      ],
      exp: 'बिना खाली स्थान छोड़े सतह ढकने (टेसेलेशन) का गुण क्षेत्रफल की मानक वर्गाकार इकाई की आवश्यकता समझाता है।',
    },
  },
  {
    topic: 'Van Hiele Level 2 Informal Deduction Class Inclusion Quadrilaterals',
    pattern: 'Analytical',
    difficulty: 'Pedagogical HOTS',
    en: {
      q: 'A Class 5 student reasons: "Since a rectangle has opposite sides parallel, every rectangle belongs inside the parallelogram family, even though not every parallelogram has `90°` corners." Which Van Hiele level is this?',
      opts: [
        'Level 2 (Abstraction / Informal Deduction) — forming hierarchical class-inclusion relationships among properties',
        'Level 0 (Visualization) — judging shapes purely by holistic appearance',
        'Level 4 (Rigor) — comparing non-Euclidean axiomatic systems',
        'Pre-recognition — unable to tell curved shapes from straight edges',
      ],
      exp: 'At Van Hiele Level 2, learners logically interrelate properties and deduce subset hierarchies ("rectangles are a subset of parallelograms").',
    },
    mr: {
      q: 'इयत्ता पाचवीचा विद्यार्थी तर्क करतो: "आयताच्या संमुख बाजू समांतर असतात म्हणून प्रत्येक आयत हा समांतरभुज चौकोन असतो, पण प्रत्येक समांतरभुज चौकोन आयत नसतो." हे व्हॅन हिलीची कोणती पातळी आहे?',
      opts: [
        'पातळी २ (अनौपचारिक निगमन / Abstraction) — गुणधर्मांवर आधारित आकृत्यांचे उपसंच व वर्ग-समावेश संबंध लावणे',
        'पातळी ० (दृश्यीकरण) — फक्त बाह्य रूपावरून ओळखणे',
        'पातळी ४ (कठोर स्वयंसिद्धी) — अ-युक्लिडियन भूमितीची तुलना करणे',
        'पूर्व-ओळख पातळी — वक्र व सरळ रेषा न कळणे',
      ],
      exp: 'गुणधर्मांचे तार्किक नाते जोडून एक गट दुसऱ्या गटाचा उपसंच मानणे हे व्हॅन हिलीच्या पातळी २ (अनौपचारिक निगमन) चे लक्षण आहे.',
    },
    hi: {
      q: 'कक्षा 5 का छात्र तर्क देता है: "चूँकि आयत की सम्मुख भुजाएँ समानांतर होती हैं, इसलिए हर आयत एक समानांतर चतुर्भुज है, पर हर समानांतर चतुर्भुज आयत नहीं।" यह वैन हीले का कौन-सा स्तर है?',
      opts: [
        'स्तर 2 (अनौपचारिक निगमन / अमूर्तन) — गुणधर्मों के आधार पर आकृतियों के वर्गीय समावेश संबंध समझना',
        'स्तर 0 (दृश्यीकरण) — केवल बाहरी रूप देखकर पहचानना',
        'स्तर 4 (कठोरता) — गैर-यूक्लिडियन सिद्धांतों की तुलना',
        'पूर्व-पहचान स्तर',
      ],
      exp: 'आकृतियों के गुणों के बीच तार्किक उप-समूह संबंध स्थापित करना वैन हीले स्तर 2 (Informal Deduction) की पहचान है।',
    },
  },
  {
    topic: 'Error Analysis Corner Spot The Mistake Peer Review',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'During revision, a teacher puts an anonymous worked problem on the board (`2.5 + 1.35 = 1.60`) and asks, "Spot what went right and where the thinking slipped." What is the pedagogical benefit?',
      opts: [
        'Normalizes mistakes as diagnostic clues, builds critical error-spotting habits, and lets pupils examine misconceptions safely without personal embarrassment',
        'Humiiliates weak students publicly to make them study harder',
        'Wastes instructional time that should go to silent copying',
        'Proves that decimal rules are unreliable',
      ],
      exp: 'Analyzing an anonymous flawed solution actively engages pupils in checking place-value alignment (`2.50 + 1.35 = 3.85`) without shaming any child.',
    },
    mr: {
      q: 'सरावाच्या वेळी शिक्षिका फळ्यावर कोणाचेही नाव न लिहिता एक चुकीचे सोडवलेले उदाहरण (`2.5 + 1.35 = 1.60`) लिहून विचारतात, "यात काय बरोबर झाले आणि चूक कोठे घडली ते शोधा." याचा शैक्षणिक फायदा कोणता?',
      opts: [
        'कोणाही मुलाचा अपमान न करता चुकांकडे निदानात्मक सुगावा म्हणून पाहण्याची व स्वतःच्या चुका तपासण्याची चिकित्सक सवय वाढते',
        'कमकुवत विद्यार्थ्यांना वर्गासमोर लाजवण्यासाठी',
        'केवळ शांतपणे उतरवून घेण्याचा वेळ वाचवण्यासाठी',
        'दशांश नियम निरुपयोगी असल्याचे दाखवण्यासाठी',
      ],
      exp: 'अनामिक त्रुटींचे विश्लेषण केल्याने विद्यार्थी निर्भयपणे दशांश स्थळांची मांडणी व वैचारिक तर्क तपासतात.',
    },
    hi: {
      q: 'पुनरावृत्ति के दौरान शिक्षक बिना किसी का नाम लिए श्यामपट्ट पर गलत हल (`2.5 + 1.35 = 1.60`) लिखकर पूछते हैं, "इसमें क्या सही है और सोच कहाँ फिसली?" इसका मुख्य लाभ क्या है?',
      opts: [
        'बिना किसी बच्चे को शर्मिंदा किए गलतियों को सीखने के सुराग के रूप में देखना और आलोचनात्मक जाँच कौशल विकसित करना',
        'कमज़ोर बच्चों को सबके सामने दंडित करना',
        'मूक नकल के समय को बढ़ाना',
        'यह सिद्ध करना कि दशमलव नियम काम नहीं करते',
      ],
      exp: 'अनाम त्रुटि-विश्लेषण कक्षा में सुरक्षित वातावरण बनाकर स्थान-मान और तर्क-जाँच की क्षमता निखारता है।',
    },
  },
  {
    topic: 'Verifying Zero Quotient Error Using Inverse Multiplication',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'When a Class 4 pupil incorrectly writes `618 ÷ 6 = 13`, which self-checking strategy empowers the pupil to catch the missing zero (`103`) independently?',
      opts: [
        'Checking by inverse multiplication and estimation: "`6 × 13` is only `78`, nowhere near `618` (`600 ÷ 6 = 100`)!"',
        'Erasing the work immediately without comment',
        'Adding `6 + 1 + 8` to check divisibility by `3`',
        'Drawing `618` tally sticks one by one in the margin',
      ],
      exp: 'Pairing inverse multiplication (`Quotient × Divisor`) with magnitude estimation (`600 ÷ 6 = 100`) catches omitted internal zeroes instantaneously.',
    },
    mr: {
      q: 'इयत्ता चौथीचा विद्यार्थी `618 ÷ 6 = 13` अशी `0` गाळण्याची चूक करतो. त्याला स्वतःहून `103` ही चूक लक्षात आणून देण्यासाठी कोणती स्व-तपासणी युक्ती सर्वोत्तम आहे?',
      opts: [
        'अंदाज व व्यस्त गुणाकार तपासणी: "`6 × 13 = 78` फक्त! पण `600 ÷ 6 = 100` च्या आसपास उत्तर यायला हवे होते ना!"',
        'काहीही न बोलता थेट खोडून टाकणे',
        '`6 + 1 + 8` ची बेरीज करून विभाज्यता तपासणे',
        'समासात `618` उभ्या रेषा काढायला लावणे',
      ],
      exp: 'भागाकाराची उलट क्रिया (गुणाकार) व अंदाजे प्रमाण तपासल्याने मधील शून्य सुटल्याची चूक लगेच समजते.',
    },
    hi: {
      q: 'कक्षा 4 का छात्र `618 ÷ 6 = 13` लिखकर बीच का शून्य छोड़ देता है। छात्र को स्वयं अपनी त्रुटि (`103` न लिखने) पकड़ने में कौन-सी आत्म-जाँच युक्ति समर्थ बनाएगी?',
      opts: [
        'अनुमान और व्युत्क्रम गुणा द्वारा जाँच: "`6 × 13 = 78` ही होता है, जबकि `600 ÷ 6 = 100` के आसपास उत्तर होना चाहिए!"',
        'बिना बताए तुरंत कॉपी काट देना',
        '`6+1+8` जोड़कर विभाज्यता जाँचना',
        'कॉपी के किनारे `618` डंडे खींचना',
      ],
      exp: 'परिमाण का अनुमान और `भाजक × भागफल` की उलटी जाँच छात्र को मूक शून्य की भूल तुरंत दिखा देती है।',
    },
  },
  {
    topic: 'Limitations Of Mechanical Cross-Multiplication Butterfly Fractions',
    pattern: 'Pedagogical',
    difficulty: 'Pedagogical HOTS',
    en: {
      q: 'Why do mathematics educators caution against relying exclusively on the mechanical "Butterfly Cross-Multiplication Trick" to add or compare `3/4` and `2/5`?',
      opts: [
        'It obscures equivalent fractions and common unit partitioning, fails when adding three fractions (`1/2 + 1/3 + 1/4`), and prevents sensible magnitude estimation',
        'Because butterflies violate geometric symmetry rules',
        'Because cross-multiplication yields the wrong numerical sum for two fractions',
        'Because paper size is too small to draw butterfly wings',
      ],
      exp: 'Understanding common denominators (`15/20 + 8/20`) links directly to fraction strips, works for three or more addends, and generalizes later to algebraic fractions in middle school.',
    },
    mr: {
      q: '`3/4` आणि `2/5` यांची बेरीज किंवा तुलना करताना केवळ यांत्रिक "तिरकस गुणाकार (Butterfly) युक्ती" वापरण्यापासून गणित तज्ज्ञ का सावध करतात?',
      opts: [
        'ही युक्ती सममूल्य अपूर्णांक व समान छेदाचा अर्थ झाकते, तीन अपूर्णांकांच्या बेरजेत (`1/2+1/3+1/4`) उपयोगी पडत नाही व परिमाण-अंदाज रोखते',
        'कारण फुलपाखरू सममितीचे नियम मोडते',
        'कारण दोन अपूर्णांकांत तिरकस गुणाकार नेहमी चुकीचे उत्तर देतो',
        'कारण वहीच्या पानावर चित्र काढायला जागा नसते',
      ],
      exp: 'समान एकक-भाग (सामाईक छेद) समजल्याने चित्र-पट्ट्या, तीन अपूर्णांक आणि पुढील बीजगणित या सर्वांचा भक्कम पाया तयार होतो.',
    },
    hi: {
      q: 'गणित शिक्षाविद् `3/4 + 2/5` सिखाने के लिए केवल यांत्रिक "तितली तिर्यक-गुणा ट्रिक" पर निर्भर रहने से क्यों मना करते हैं?',
      opts: [
        'यह समतुल्य भिन्न और समान हर के विभाजन का अर्थ छिपाती है, तीन भिन्नों के जोड़ में विफल होती है, और परिमाण अनुमान को रोकती है',
        'क्योंकि दो भिन्नों में इससे हमेशा गलत उत्तर आता है',
        'क्योंकि कॉपी में पंख बनाने की जगह नहीं होती',
        'क्योंकि तितली ज्यामिति से असंबंधित है',
      ],
      exp: 'उभयनिष्ठ हर (समतुल्य भिन्न) की समझ तीन या अधिक भिन्नों, संख्या-रेखा और बीजगणितीय भिन्नों तक सहज विस्तारित होती है।',
    },
  },
  {
    topic: 'Rich Mathematical Investigation Rectangles Perimeter 20 cm',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Compare Task X ("Find the perimeter of a `6 cm × 4 cm` rectangle") with Task Y ("Draw as many different rectangles with whole-number sides as you can whose perimeter is `20 cm`, and note which encloses the LARGEST area"). Why is Task Y richer?',
      opts: [
        'Task Y invites systematic listing, pattern discovery (`l + b = 10`), reasoning, and the surprising insight that a square maximizes area for a given perimeter',
        'Task Y avoids teaching any formula and gives less writing work',
        'Task X has more than five possible answers',
        'Task Y removes geometry and turns into spelling practice',
      ],
      exp: 'Reversing a closed exercise into an open constrained search (`1×9`, `2×8`, `3×7`, `4×6`, `5×5`) builds systematic investigation and optimization intuition.',
    },
    mr: {
      q: 'कार्य अ ("`6 सेमी × 4 सेमी` आयताची परिमिती काढा") पेक्षा कार्य ब ("पूर्णांक बाजू असलेले `20 सेमी` परिमितीचे विविध आयत काढा आणि सर्वाधिक क्षेत्रफळ कोणाचे ते शोधा") अधिक समृद्ध का आहे?',
      opts: [
        'कार्य ब पद्धतशीर मांडणी (`लांबी + रुंदी = 10`), नमुना निरीक्षण व "दिलेल्या परिमितीत चौरसाचे क्षेत्रफळ कमाल असते" हा शोध घडवून आणते',
        'कार्य ब मध्ये कोणतेही सूत्र वापरावे लागत नाही',
        'कार्य अ ला पाचपेक्षा जास्त उत्तरे असतात',
        'कार्य ब मध्ये भूमितीचा संबंधच येत नाही',
      ],
      exp: 'खुल्या शोध-प्रश्नांमुळे विद्यार्थी तर्क, सारणीबद्ध मांडणी आणि क्षेत्रफळ-परिमिती संबंध स्वतः अनुभवतात.',
    },
    hi: {
      q: 'कार्य X ("`6×4 सेमी` आयत का परिमाप निकालो") की अपेक्षा कार्य Y ("`20 सेमी` परिमाप वाले सभी पूर्णांक भुजा आयत बनाओ और अधिकतम क्षेत्रफल खोजो") अधिक समृद्ध क्यों है?',
      opts: [
        'कार्य Y व्यवस्थित सूचीबद्धता (`l+b=10`), पैटर्न खोज और यह निष्कर्ष देता है कि निश्चित परिमाप में वर्ग का क्षेत्रफल अधिकतम होता है',
        'कार्य Y में किसी सूत्र की आवश्यकता नहीं होती',
        'कार्य X के पाँच से अधिक उत्तर संभव हैं',
        'कार्य Y में ज्यामिति समाप्त हो जाती है',
      ],
      exp: 'बंधे-बँधाए मानकों के बजाय सीमित-खुली खोज (Rich Investigation) उच्च-स्तरीय तार्किक चिंतन विकसित करती है।',
    },
  },
  {
    topic: 'Progression From Informal To Formal Geometric Vocabulary',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'A Class 2 pupil describes a rectangle’s corner as "sharp like a book edge" and parallel railway tracks as "lines that never bump into each other." How should the teacher develop geometric vocabulary?',
      opts: [
        'Validate the child’s vivid informal intuition first and gradually anchor formal terms ("right angle", "parallel lines") onto those exact descriptions',
        'Interrupt immediately and deduct marks whenever informal everyday words are spoken',
        'Wait until Class 9 before introducing terms like "parallel" or "right angle"',
        'Require copying textbook glossary definitions verbatim twenty times',
      ],
      exp: 'Bridging informal everyday metaphors ("never meet even if stretched forever" → parallel) anchors precise mathematical vocabulary securely in meaning.',
    },
    mr: {
      q: 'इयत्ता दुसरीचा मुलगा काटकोनाला "पुस्तकाच्या कोपऱ्यासारखा टोकदार कोपरा" आणि समांतर रेषांना "कधीच एकमेकींना न धडकणारे रेल्वेचे रूळ" म्हणतो. शिक्षकाने भूमितीय शब्दसंग्रह कसा विकसित करावा?',
      opts: [
        'विद्यार्थ्याच्या या सजीव अनुभवाचे स्वागत करून त्याच वर्णनाशी हळूहळू "काटकोन" आणि "समांतर रेषा" या अचूक संज्ञा जोडून द्याव्यात',
        'अनौपचारिक शब्द बोलल्याबरोबर लगेच थांबवून गुण कापावेत',
        'इयत्ता नववीपर्यंत हे शब्द वापरणे टाळावे',
        'शब्दकोशातील व्याख्या वीस वेळा लिहून घ्याव्यात',
      ],
      exp: 'मुलांच्या अनौपचारिक निरीक्षणांना अचूक गणितीय संज्ञांची जोड दिल्यास संज्ञा रटण्याऐवजी अर्थपूर्ण बनतात.',
    },
    hi: {
      q: 'कक्षा 2 का बच्चा कोने को "किताब के किनारे जैसा कोना" और समानांतर रेखाओं को "कभी न टकराने वाली रेल की पटरी" कहता है। शिक्षक को ज्यामितीय शब्दावली कैसे विकसित करनी चाहिए?',
      opts: [
        'बच्चे की सजीव सहज समझ को स्वीकारते हुए धीरे-धीरे उसी अनुभव से "समकोण" और "समानांतर रेखाएँ" जैसे औपचारिक शब्द जोड़ने चाहिए',
        'अनौपचारिक शब्द बोलने पर तुरंत टोककर अंक काटने चाहिए',
        'कक्षा 9 तक "समानांतर" शब्द बोलने से बचना चाहिए',
        'पुस्तक की परिभाषा 20 बार लिखवानी चाहिए',
      ],
      exp: 'दैनिक भाषा की उपमाओं से औपचारिक गणितीय शब्दावली का सेतु बनाना सार्थक भाषा-विकास की कुंजी है।',
    },
  },
  {
    topic: 'Subtraction Across Zeroes Compensation Strategy 400 Minus 168',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Many Class 4 students make repeated regrouping mistakes on `400 − 168`. Which alternative mental/written compensation strategy helps pupils see why `232` is right?',
      opts: [
        'Constant-difference shift: subtract `1` from both numbers (`399 − 167 = 232`) so NO regrouping across zeroes is required',
        'Swapping top and bottom digits (`400` and `168`) in the tens and ones columns',
        'Crossing out all zeroes so it becomes `4 − 168`',
        'Rounding `168` down to `100` and keeping `300` as exact answer',
      ],
      exp: 'Shifting both numbers down by `1` (`(400−1) − (168−1) = 399 − 167`) preserves the exact difference `232` while eliminating double borrowing across zeroes.',
    },
    mr: {
      q: '`400 − 168` या वजाबाकीत अनेक विद्यार्थी हातचे घेताना चुकतात. यावर कोणती पर्यायी "समान फरक / भरपाई (Compensation)" युक्ती शून्यावरील गोंधळ टाळून `232` हे उत्तर सोपे करते?',
      opts: [
        'दोन्ही संख्यांतून `1` कमी करून `399 − 167 = 232` सोडवणे, ज्यामुळे कोणत्याही शून्यातून हातचा घेण्याची गरजच उरत नाही',
        'वरचे व खालचे अंक अदलाबदल करून वजा करणे',
        'शून्य खोडून फक्त `4 − 168` करणे',
        '`168` चे अंदाजे `100` धरून `300` उत्तर मानणे',
      ],
      exp: 'दोन्ही संख्या एकाने कमी केल्यास त्यांच्यातील अंतर (वजाबाकी) बदलत नाही (`399 − 167 = 232`), हा उत्तम संख्या-बोध होय.',
    },
    hi: {
      q: '`400 − 168` में कई छात्र शून्य से उधार लेने में गलती करते हैं। कौन-सी वैकल्पिक "समान-अंतर / क्षतिपूर्ति (Compensation)" युक्ति बिना किसी उधार के `232` निकालना आसान बनाती है?',
      opts: [
        'दोनों संख्याओं से `1` घटाकर `399 − 167 = 232` हल करना, जिससे शून्य के आर-पार पुनर्समूहन ही नहीं करना पड़ता',
        'इकाई व दहाई के अंक उलटकर घटाना',
        'दोनों शून्य काटकर `4 − 168` करना',
        '`168` को `100` मानकर `300` उत्तर लिख देना',
      ],
      exp: 'दोनों संख्याओं को `1` से खिसकाने (`399 − 167`) पर अंतर समान (`232`) रहता है और शून्य की त्रुटि समाप्त हो जाती है।',
    },
  },
  {
    topic: 'Grid Paper Accommodation Dyscalculia Alignment',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 4 learner with mild dyscalculia understands addition and multiplication concepts orally, yet keeps mixing up ones, tens, and hundreds columns during vertical notebook work. What low-cost classroom scaffold helps immediately?',
      opts: [
        'Providing wide-square grid / graph paper (one digit per box) with colour-coded place-value header bands (`H | T | O`)',
        'Replacing math notebooks with unruled blank drawing sheets',
        'Forcing the child to work in pen without erasing mistakes',
        'Moving the child to a completely separate room permanently',
      ],
      exp: 'Wide-grid boxed paper visually locks each digit into its place-value column, reducing spatial clutter and working-memory strain.',
    },
    mr: {
      q: 'डिस्कॅल्क्युलियाची सौम्य लक्षणे असणाऱ्या इयत्ता चौथीच्या मुलाला तोंडी बेरीज-गुणाकार समजतो, पण वहीत उभ्या मांडणीत शतक-दशक-एकक स्तंभ सरकतात. तात्काळ उपयुक्त ठरणारे कमी खर्चाचे साधन कोणते?',
      opts: [
        'मोठ्या चौकटींचा आलेख/चौकटी कागद (प्रत्येक चौकटीत एक अंक) आणि रंगीत `श | द | ए` शीर्षक पट्टी देणे',
        'रघ नसलेले कोरे चित्रकलेचे कागद देणे',
        'खोडरबर न वापरता थेट पेनाने लिहिण्याची सक्ती करणे',
        'विद्यार्थ्याला कायमचे वेगळ्या खोलीत बसवणे',
      ],
      exp: 'चौकटींचा कागद व रंगीत स्थान-स्तंभ अवकाशीय गोंधळ टाळून स्थानिक किमतीची मांडणी अचूक ठेवण्यास मदत करतात.',
    },
    hi: {
      q: 'हल्के डिस्कैलकुलिया वाले कक्षा 4 के छात्र को मौखिक संक्रिया समझ आती है, पर कॉपी में ऊर्ध्वाधर जोड़-गुणा करते समय इकाई-दहाई के स्तंभ गड़बड़ा जाते हैं। तुरंत सहायक कम-लागत उपाय क्या है?',
      opts: [
        'बड़े खानों वाला ग्रिड/ग्राफ़ पेपर (प्रत्येक खाने में एक अंक) और रंग-कोडित `सैकड़ा | दहाई | इकाई` पट्टी देना',
        'बिना लाइनों वाले कोरे ड्राइंग पेपर देना',
        'बिना मिटाए पेन से लिखने की सख्ती करना',
        'बच्चे को हमेशा के लिए अलग कमरे में बैठाना',
      ],
      exp: 'चौखाने (Grid Paper) दृश्य व्यवधान कम करके प्रत्येक अंक को सही स्थानीय मान स्तंभ में स्थिर रखते हैं।',
    },
  },
  {
    topic: 'Connecting Classroom Math To PM POSHAN Mid-Day Meal',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'In a rural Zilla Parishad primary school, asking Class 5 pupils to compute daily rice requirements for `84` children when the PM POSHAN norm is `100 g` per child (and converting grams to `kg`) achieves what goal?',
      opts: [
        'Connects unitary multiplication and metric unit conversion (`g → kg`) to authentic daily civic school management ("Mathematization of surroundings")',
        'Trains primary students to replace school cooks',
        'Reduces textbook syllabus weight artificially',
        'Limits mathematics strictly to grain weighing',
      ],
      exp: 'Using authentic school contexts like Mid-Day Meal rations makes unitary math, division, and metric conversions socially meaningful and concrete.',
    },
    mr: {
      q: 'जिल्हा परिषद प्राथमिक शाळेत प्रधानमंत्री पोषण आहार (PM POSHAN) योजनेंतर्गत प्रति विद्यार्थी `100 ग्रॅम` तांदूळ याप्रमाणे `84` मुलांसाठी लागणारे धान्य व त्याचे `किग्रॅ` मध्ये रूपांतर विद्यार्थ्यांकडून काढून घेतल्यास कोणता हेतू साध्य होतो?',
      opts: [
        'एकमान पद्धती व मापन एकक रूपांतरण (`ग्रॅम → किग्रॅ`) प्रत्यक्ष शालेय दैनंदिन व्यवस्थापनाशी जोडून परिसराचे गणितीकरण होते',
        'विद्यार्थ्यांना स्वयंपाकाचे प्रशिक्षण देणे',
        'अभ्यासक्रमाचे ओझे कृत्रिमरीत्या कमी करणे',
        'गणित फक्त धान्य मोजण्यापुरते मर्यादित करणे',
      ],
      exp: 'शाळेतील प्रत्यक्ष मध्यान्ह भोजन हिशोब हे NCF-2005 नुसार अस्सल, अर्थपूर्ण व जीवनाभिमुख गणितीकरणाचे उत्तम उदाहरण आहे.',
    },
    hi: {
      q: 'प्राथमिक विद्यालय में कक्षा 5 के छात्रों से PM POSHAN के अंतर्गत प्रति बच्चा `100 ग्रा` चावल के हिसाब से `84` बच्चों की दैनिक आवश्यकता (`किग्रा` में) निकलवाना किस उद्देश्य को पूरा करता है?',
      opts: [
        'ऐकिक नियम और मात्रक रूपांतरण (`ग्रा → किग्रा`) को विद्यालय के वास्तविक सामाजिक प्रबंधन से जोड़कर "परिवेश का गणितीकरण" करना',
        'बच्चों से रसोई का कार्य करवाना',
        'गणित को केवल अनाज तौलने तक सीमित करना',
        'पाठ्यपुस्तक का उपयोग पूरी तरह बंद करना',
      ],
      exp: 'मध्याह्न भोजन जैसी वास्तविक स्कूली गणनाएँ गणित को जीवन से जोड़ती हैं और मात्रक रूपांतरण को सार्थक बनाती हैं।',
    },
  },
  {
    topic: 'Using Reflective Mirror Over Folding Symmetry Check',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Besides folding paper cutouts, why is placing a small unbreakable mirror upright along a drawn line on a printed shape so helpful when teaching Reflection Symmetry?',
      opts: [
        'Students immediately see whether the mirror image matches the hidden half (e.g., testing diagonal lines of a parallelogram, which look symmetric until tested)',
        'Because mirrors can only show curved shapes and not triangles',
        'Because mirrors measure the exact perimeter in centimetres',
        'So students practice drawing circular circles',
      ],
      exp: 'A parallelogram diagonal looks tempting as a symmetry line until a mirror reflects the half perpendicular to the diagonal—exposing the mismatch visually in seconds.',
    },
    mr: {
      q: 'कागद दुमडण्यासोबतच आकृतीच्या रेषेवर लहान आरसा उभा ठेवून सममिती तपासण्याचा उपक्रम का अत्यंत उपयुक्त ठरतो?',
      opts: [
        'आरशातील प्रतिबिंब आकृतीच्या दुसऱ्या भागाशी जुळते की नाही (उदा. समांतरभुज चौकोनाचा कर्ण सममिती देत नाही) हे एका क्षणात स्पष्ट दिसते',
        'कारण आरशात फक्त वर्तुळच दिसते, त्रिकोण दिसत नाही',
        'कारण आरसा सेंटीमीटरमध्ये परिमिती मोजतो',
        'कारण विद्यार्थ्यांना वर्तुळ काढण्याचा सराव होतो',
      ],
      exp: 'सामान्य आयताचा व समांतरभुज चौकोनाचा कर्ण सममितीचा अक्ष का नसतो हे आरशाच्या प्रतिबिंबातून अचूक व रंजकपणे समजते.',
    },
    hi: {
      q: 'कागज़ मोड़ने के साथ-साथ आकृति की रेखा पर छोटा समतल दर्पण रखकर सममिति जाँचना क्यों अत्यधिक प्रभावी होता है?',
      opts: [
        'दर्पण में दिखने वाला प्रतिबिंब छुपे हुए भाग से मेल खाता है या नहीं (जैसे समानांतर चतुर्भुज का विकर्ण सममिति नहीं देता), यह तुरंत दिख जाता है',
        'क्योंकि दर्पण में केवल गोल आकृतियाँ दिखती हैं',
        'क्योंकि दर्पण सेंटीमीटर में परिमाप नापता है',
        'ताकि छात्र केवल गोले बनाना सीखें',
      ],
      exp: 'दर्पण परीक्षण आयत व समानांतर चतुर्भुज के विकर्ण संबंधी आम भ्रम को क्षणभर में दूर कर देता है।',
    },
  },
  {
    topic: 'Equal Sign Relational Balance vs Execute Operator',
    pattern: 'Analytical',
    difficulty: 'Pedagogical HOTS',
    en: {
      q: 'When asked `7 + 5 = ___ + 4`, over half of a Class 3 batch write `12` in the blank instead of `8`. What fundamental misconception about the `=` sign does this expose?',
      opts: [
        'Students view `=` strictly as a "compute-the-answer-now" arrow rather than a relational balance showing both sides hold the exact same value',
        'Students do not know that `7 + 5 = 12`',
        'Students forgot how to add `12 + 4`',
        'Students confuse the `+` symbol with `×`',
      ],
      exp: 'Treating `=` as "write total next" ignores everything to the right (`+ 4`). Using a two-pan balance model builds relational understanding of equivalence (`12 = 8 + 4`).',
    },
    mr: {
      q: '`7 + 5 = ___ + 4` या उदाहरणात इयत्ता तिसरीतील निम्म्याहून अधिक मुले रिकाम्या जागी `8` ऐवजी `12` लिहितात. यातून `=` चिन्हाबद्दलचा कोणता मूलभूत गैरसमज दिसतो?',
      opts: [
        'विद्यार्थी `=` हे दोन्ही बाजूंचे मूल्य समान असल्याचा तराजू मानण्याऐवजी फक्त "पुढे उत्तर लिहा" असा आदेश समजतात',
        'विद्यार्थ्यांना `7 + 5 = 12` येत नाही',
        'विद्यार्थ्यांना `12 + 4` ची बेरीज विसरली',
        'विद्यार्थी `+` ला `×` समजतात',
      ],
      exp: 'दोन तागड्यांच्या तराजूप्रमाणे `=` म्हणजे दोन्ही बाजूंचे संतुलन ही जाणीव विकसित केल्यास पुढील समीकरणे सोडवणे सोपे जाते.',
    },
    hi: {
      q: '`7 + 5 = ___ + 4` में आधे से अधिक बच्चे `8` के बजाय `12` भर देते हैं। इससे बराबर (`=`) चिह्न के प्रति किस मूल भ्रम का पता चलता है?',
      opts: [
        'बच्चे `=` को दोनों पक्षों की समानता (तराजू संतुलन) समझने के बजाय केवल "अब उत्तर लिखो" वाला निर्देश चिह्न मान लेते हैं',
        'बच्चों को `7 + 5 = 12` जोड़ना नहीं आता',
        'बच्चे `+` को `×` समझ लेते हैं',
        'बच्चों को `4` की पहचान नहीं है',
      ],
      exp: 'तराजू मॉडल से `=` को संबंधात्मक समतुल्यता के रूप में समझाने से यह भ्रम दूर होता है और बीजगणित का आधार बनता है।',
    },
  },
  {
    topic: 'Reasonableness Estimation Before Computing Exact Product',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why does a Class 4 teacher ask students to call out an estimate ("Should `38 × 21` be near `80`, `800`, or `8,000`?") BEFORE performing paper-and-pencil multiplication?',
      opts: [
        'Prior estimation creates an immediate mental safety net so pupils catch place-alignment bugs (like forgetting the placeholder zero in tens multiplication) themselves',
        'Because exact multiplication answers are discouraged in exams',
        'To fill extra minutes at the end of the bell',
        'Because `38 × 21` cannot be solved with standard algorithms',
      ],
      exp: 'If a child forgets the placeholder zero and gets `38 + 76 = 114`, comparing against the `40 × 20 = 800` estimate alerts them immediately that `114` cannot be correct.',
    },
    mr: {
      q: 'कागदावर `38 × 21` चा गुणाकार करण्यापूर्वी शिक्षिका मुलांना विचारतात, "उत्तर `80`, `800`, की `8,000` च्या आसपास येईल?" या पूर्व-अंदाजाचा मुख्य फायदा काय?',
      opts: [
        'दशकाने गुणताना एककाचा शून्य विसरून आलेले `114` सारखे चुकीचे उत्तर विद्यार्थ्याला `40 × 20 = 800` च्या अंदाजावरून स्वतःच पकडता येते',
        'कारण परीक्षेत अचूक गुणाकार करू नये असा नियम आहे',
        'कारण तासाचा शेवटचा वेळ भरून काढण्यासाठी',
        'कारण `38 × 21` चा अचूक गुणाकार काढता येत नाही',
      ],
      exp: 'गणनेआधी अंदाजे परिमाण ठरवल्यास मोठी स्थानिक-किमतीची चूक विद्यार्थी स्वतःच दुरुस्त करू शकतात.',
    },
    hi: {
      q: 'कागज पर `38 × 21` हल करने से पहले शिक्षिका पूछती हैं, "क्या उत्तर `80`, `800` या `8,000` के पास होगा?" इस पूर्व-अनुमान का मुख्य लाभ क्या है?',
      opts: [
        'अनुमान एक सुरक्षा-जाल बनाता है जिससे दहाई के गुणा का शून्य छूटने पर आने वाले `114` जैसे गलत उत्तर को छात्र स्वयं पकड़ लेते हैं',
        'क्योंकि परीक्षा में सटीक उत्तर लिखना मना है',
        'ताकि समय व्यतीत किया जा सके',
        'क्योंकि `38 × 21` का सटीक गुणनफल संभव नहीं है',
      ],
      exp: 'गणना से पहले परिमाण का अनुमान संख्या-बोध और स्व-त्रुटि सुधार की क्षमता को मजबूत करता है।',
    },
  },
  {
    topic: 'Square Dot Paper vs Isometric Grid In Primary Geometry',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'How does Isometric Dot Paper (equilateral triangle dot grid) complement Square Grid Paper in Class 4–5 geometry?',
      opts: [
        'Square grids make right angles and rectangle areas easy to sketch, whereas isometric dot paper lets pupils draw accurate `60°/120°` equilateral triangles, hexagons, and 3D cube projections effortlessly',
        'Isometric dot paper is used only for handwriting cursive letters',
        'Square grids cannot show perpendicular lines',
        'Isometric paper automatically calculates division remainders',
      ],
      exp: 'Trying to draw a convincing cube or regular hexagon on square grids distorts side lengths; isometric triangular grids keep `60°` edges crisp and natural.',
    },
    mr: {
      q: 'इयत्ता ४–५ च्या भूमितीत चौरस ठिपक्यांच्या कागदासोबतच समभुज त्रिकोणी ठिपक्यांचा कागद (Isometric Dot Paper) वापरण्याचा विशेष फायदा कोणता?',
      opts: [
        'चौरस जाळीवर काटकोन व आयताचे क्षेत्रफळ सहज काढता येते, तर आयसोमेट्रिक कागदावर `60°/120°` चे समभुज त्रिकोण, षटकोन व त्रिमितीय घन अचूक काढता येतात',
        'आयसोमेट्रिक कागद फक्त इंग्रजी हस्ताक्षर सरावासाठी वापरतात',
        'चौरस जाळीवर लंब रेषा काढता येत नाहीत',
        'आयसोमेट्रिक कागद भागाकाराची बाकी आपोआप सांगतो',
      ],
      exp: 'त्रिमितीय घनाकृतीची चित्रे व समभुज षटकोन यांच्या बाजूंची लांबी अचूक राखण्यासाठी आयसोमेट्रिक ठिपकेदार कागद अत्यंत उपयुक्त ठरतो.',
    },
    hi: {
      q: 'कक्षा 4–5 की ज्यामिति में वर्गाकार बिंदु-ग्रिड के साथ-साथ सममितीय बिंदु कागज़ (Isometric Dot Paper) कैसे पूरक बनता है?',
      opts: [
        'वर्गाकार ग्रिड समकोण व आयत क्षेत्रफल के लिए उत्तम है, जबकि आइसोमेट्रिक ग्रिड `60°/120°` वाले समबाहु त्रिभुज, षट्भुज और 3D घन के चित्र सटीक बनाता है',
        'आइसोमेट्रिक कागज़ केवल सुलेख अभ्यास के काम आता है',
        'वर्गाकार ग्रिड पर लंब रेखाएँ नहीं बन सकतीं',
        'आइसोमेट्रिक कागज़ भाग का शेषफल बताता है',
      ],
      exp: 'त्रिभुजाकार आइसोमेट्रिक बिंदु ग्रिड से घनाकृतियों और षट्भुजों की 3D दृश्यात्मक समझ आसानी से बनती है।',
    },
  },
  {
    topic: 'Gender Fair & Inclusive Word Problem Contexts NCF',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'A primary math workbook notices that all problems about buying bangles/cooking depict mothers while all problems about land measurement, carpentry, and banking depict fathers. According to NCF-2005 and NEP-2020, what correction is needed?',
      opts: [
        'Design balanced everyday problems showing women and men equally across farming, engineering, banking, tailoring, and cooking to break gender stereotypes',
        'Remove all human names from math textbooks completely',
        'Write problems exclusively about imaginary space aliens',
        'Keep the stereotypes unchanged because math answers stay identical',
      ],
      exp: 'Textbooks carry subtle social messages ("hidden curriculum"); portraying diverse genders and communities competently in math contexts promotes equity and aspiration.',
    },
    mr: {
      q: 'एका प्राथमिक गणिताच्या पुस्तकात फक्त आई भाज्या/बांगड्या घेताना आणि फक्त वडील बँक व्यवहार व शेतजमीन मोजताना दाखवले आहेत. NCF-2005 व NEP-2020 नुसार यात कोणता बदल आवश्यक आहे?',
      opts: [
        'लिंगभेद दर्शवणारे साचे मोडून स्त्रिया व पुरुष दोघांनाही बँक, अभियांत्रिकी, शेती, सुतारकाम व घरकाम अशा सर्व क्षेत्रांत समान दाखवणारी उदाहरणे तयार करणे',
        'गणिताच्या पुस्तकातून सर्व व्यक्तींची नावे काढून टाकणे',
        'फक्त परग्रहवासी काल्पनिक प्राण्यांचीच उदाहरणे घेणे',
        'उत्तर तेच येत असल्याने साचे कायम ठेवणे',
      ],
      exp: 'गणिताची उदाहरणेही अप्रत्यक्ष सामाजिक मूल्ये (Hidden Curriculum) रुजवतात; त्यामुळे सर्वसमावेशक व लिंग-समान संदर्भ आवश्यक असतात.',
    },
    hi: {
      q: 'एक गणित कार्यपुस्तिका में रसोई व चूड़ियों के सवालों में केवल माँ और बैंक, बढ़ई व खेत मापने के सवालों में केवल पिता दिखाए गए हैं। NCF-2005 व NEP-2020 के अनुसार क्या सुधार आवश्यक है?',
      opts: [
        'लैंगिक रूढ़िवादिता तोड़कर महिला और पुरुष दोनों को समान रूप से बैंकिंग, विज्ञान, खेती, शिल्प और घर के कार्यों में दर्शाना',
        'पुस्तक से सभी मानव नाम हटा देना',
        'केवल काल्पनिक एलियंस के प्रश्न बनाना',
        'रूढ़ियाँ यथावत रखना क्योंकि संख्यात्मक उत्तर नहीं बदलता',
      ],
      exp: 'संतुलित और लैंगिक-संवेदनशील संदर्भ सभी विद्यार्थियों में गणित और विविध व्यवसायों के प्रति समान आकांक्षा जगाते हैं।',
    },
  },
  {
    topic: 'Anecdotal Observations Counting On vs Counting All',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'During a board-game addition task (`8 + 3`), Student A counts `1, 2, ... 8, 9, 10, 11` on fingers from `1`, while Student B starts at `8` and taps `9, 10, 11`. Recording this distinction in teacher anecdotal notes helps determine what?',
      opts: [
        'Progression in developmental strategy sophistication ("Counting All" vs more efficient "Counting On"), guiding targeted next-step support',
        'Which student deserves detention after school',
        'Student A’s overall IQ score permanently',
        'Whether Student B cheated on written exams',
      ],
      exp: 'Process observation captures strategy maturity that right/wrong test scores hide (`11` marks right for both, yet Student A needs "Counting On" scaffolding).',
    },
    mr: {
      q: '`8 + 3` करताना विद्यार्थी अ बोटांवर `1` पासून मोजून `11` काढतो, तर विद्यार्थी ब `8` मनात धरून पुढे `9, 10, 11` मोजतो. शिक्षकांच्या प्रासंगिक नोंदीत (Anecdotal Records) हा फरक नोंदवण्याचा उपयोग काय?',
      opts: [
        'विद्यार्थ्यांच्या रणनीतीतील विकासात्मक टप्पा ("सगळे मोजणे" वि. प्रगत "पुढे मोजणे") ओळखून नेमकी पुढची मदत ठरवता येते',
        'कोणत्या विद्यार्थ्याला शिक्षा द्यायची हे ठरवण्यासाठी',
        'विद्यार्थ्याचा कायमस्वरूपी बुद्ध्यांक ठरवण्यासाठी',
        'विद्यार्थी ब ने कॉपी केली का हे शोधण्यासाठी',
      ],
      exp: 'दोघांचे अंतिम उत्तर `11` बरोबर असले तरी विचारप्रक्रियेतील प्रगतीचे निरीक्षण पुढच्या अध्यापनाची दिशा ठरवते.',
    },
    hi: {
      q: '`8 + 3` जोड़ते समय छात्र A उँगलियों पर `1` से `11` तक गिनता है, जबकि छात्र B `8` से आगे `9, 10, 11` गिनता है। शिक्षक की उपाख्यानात्मक टिप्पणी (Anecdotal Record) में यह अंतर लिखने से क्या पता चलता है?',
      opts: [
        'विकासात्मक रणनीति की परिपक्वता ("सब गिनना" बनाम "आगे गिनना") पता चलती है, जिससे सही अगला शिक्षण सहारा तय होता है',
        'किस छात्र को सज़ा देनी है',
        'छात्र A का स्थायी आईक्यू अंक',
        'कि छात्र B ने नकल की है',
      ],
      exp: 'दोनों का उत्तर `11` सही होने पर भी प्रक्रिया का अवलोकन शिक्षण की सटीक योजना बनाने में सहायता करता है।',
    },
  },
  {
    topic: 'Scope Of Roman Numerals In Primary Grades Focus Literacy',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why do modern primary math curricula limit Roman Numerals mostly to `I–C` recognition (clocks, chapters, monuments) instead of teaching Roman multiplication or long division?',
      opts: [
        'Roman notation lacks a zero and place-value system, making multi-digit arithmetic cumbersome; cultural literacy on clocks and dates is the realistic primary objective',
        'Because Roman multiplication gives incorrect answers compared to Hindu-Arabic numbers',
        'Because ancient Romans never traded goods',
        'Because Roman letters are identical to Marathi vowels',
      ],
      exp: 'Appreciating *why* the Indian/Hindu-Arabic positional base-10 system replaced additive Roman symbols (`MMMDCCCLXXXVIII`) for calculation highlights the elegance of zero and place value.',
    },
    mr: {
      q: 'प्राथमिक अभ्यासक्रमात रोमन संख्यांची ओळख प्रामुख्याने घड्याळ, प्रकरण क्रमांक यांपुरती (`I–C`) मर्यादित ठेवून त्यांचे गुणाकार-भागाकार का शिकवले जात नाहीत?',
      opts: [
        'रोमन पद्धतीत शून्य व स्थानिक किंमत रचना नसल्याने मोठी आकडेमोड क्लिष्ट होते; त्यामुळे घड्याळ-तारीख वाचनापुरती ओळख व दशमान पद्धतीचे महत्त्व जाणणे हा हेतू असतो',
        'कारण रोमन गुणाकाराचे उत्तर वेगळे येते',
        'कारण रोमन लोक व्यापार करत नव्हते',
        'कारण रोमन अक्षरे मराठी स्वरांसारखी असतात',
      ],
      exp: 'रोमन बेरीज-प्रधान चिन्हांची मर्यादा अनुभवल्याने भारतीय दशमान व शून्य पद्धतीची श्रेष्ठता विद्यार्थ्यांना उमगते.',
    },
    hi: {
      q: 'प्राथमिक पाठ्यक्रम में रोमन अंकों को घड़ी, अध्याय संख्या (`I–C`) आदि पढ़ने तक सीमित रखकर उनमें गुणा-भाग क्यों नहीं सिखाया जाता?',
      opts: [
        'रोमन प्रणाली में शून्य और स्थानीय मान न होने से बड़ी गणना जटिल है; इसका उद्देश्य सांस्कृतिक/व्यावहारिक साक्षरता और दशमलव प्रणाली की श्रेष्ठता समझाना है',
        'क्योंकि रोमन गुणा से गलत संख्या बनती है',
        'क्योंकि प्राचीन रोम में व्यापार नहीं होता था',
        'क्योंकि रोमन अक्षर हिंदी स्वरों जैसे हैं',
      ],
      exp: 'शून्य व स्थानीय मान के बिना गणना की कठिनाई देखकर विद्यार्थी भारतीय दशमलव पद्धति का महत्व समझते हैं।',
    },
  },
  {
    topic: 'Informal Negative Integers Temperature And Basement Floors',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Although formal integer arithmetic rules start in Class 6, how can Class 5 teachers gently plant intuitive familiarity with values below zero?',
      opts: [
        'Discussing winter temperatures in Leh/Drass (`−5°C`), mall elevator basement buttons (`B1, B2`), and ground-level depth versus height above sea level',
        'Drilling `"(-7) × (-3) = +21"` sign-rule chants daily in Class 5',
        'Claiming nothing below zero can ever exist in reality',
        'Waiting until Class 8 before mentioning winter temperatures',
      ],
      exp: 'Vertical contexts like thermometers and elevator floors make `"below zero"` concrete and natural long before formal negative integer equations.',
    },
    mr: {
      q: 'पूर्णांक संख्यांचे औपचारिक नियम इयत्ता सहावीत असले तरी पाचवीत शून्याखालील मूल्यांची सहज ओळख कशी करून देता येईल?',
      opts: [
        'लेह-लडाखचे हिवाळी तापमान (`−5°C`), मॉलमधील लिफ्टचे तळघर (`B1, B2`) आणि समुद्रसपाटीपासूनची उंची-खोली या संदर्भांतून',
        'पाचवीतच `"(-) × (-) = (+)"` हे नियम घोकून घेऊन',
        'शून्याखाली काहीच नसते असे सांगून',
        'इयत्ता आठवीपर्यंत हिवाळी तापमानाचा उल्लेख टाळून',
      ],
      exp: 'तापमापी आणि लिफ्टचे मजले यांसारखे उभे संदर्भ विद्यार्थ्यांना ऋण मूल्यांची नैसर्गिक पूर्वकल्पना देतात.',
    },
    hi: {
      q: 'यद्यपि पूर्णांकों के औपचारिक नियम कक्षा 6 से शुरू होते हैं, कक्षा 5 में शून्य से नीचे के मानों की सहज समझ कैसे जगाई जा सकती है?',
      opts: [
        'लेह-लद्दाख के सर्दियों के तापमान (`−5°C`), मॉल लिफ्ट के बेसमेंट बटन (`B1, B2`) और समुद्र तल से गहराई की चर्चा द्वारा',
        'कक्षा 5 में ही `"(-) × (-) = (+)"` रटवाकर',
        'यह कहकर कि शून्य से नीचे कुछ नहीं होता',
        'कक्षा 8 तक तापमान की बात टालकर',
      ],
      exp: 'थर्मामीटर और लिफ्ट फ्लोर जैसे व्यावहारिक उदाहरण औपचारिक नियमों से पहले सहज संख्या-रेखा की नींव डालते हैं।',
    },
  },
  {
    topic: 'Transition From One-to-One Pictograph To Scaled Bar Graph',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'In Class 3, one flower sticker stands for `1` garden rose; in Class 5, one tree icon stands for `20` village trees. What key conceptual leap must teachers scaffold explicitly during this transition?',
      opts: [
        'Moving from one-to-one counting to many-to-one scaling—understanding that `1` symbol represents a whole group (`20`) and half a symbol represents half that scale (`10`)',
        'Changing paper orientation from portrait to landscape only',
        'Coloring the bars red instead of blue',
        'Using only whole numbers under `5` on the vertical axis',
      ],
      exp: 'Many-to-one scaling is a crucial multiplicative leap: without explicit practice, Class 4–5 learners mistakenly count `3` tree icons as `3` trees rather than `3 × 20 = 60` trees.',
    },
    mr: {
      q: 'तिसरीत `1` फुलाचे चित्र = `1` फूल असे असते, तर पाचवीत `1` झाडाचे चित्र = `20` झाडे असे प्रमाण वापरले जाते. या संक्रमणात शिक्षकाने कोणती मुख्य पायरी आवर्जून स्पष्ट करावी?',
      opts: [
        'एकास-एक मोजणीतून "एकास-अनेक प्रमाण (Many-to-One Scale)" कडे जाणे — जिथे `1` चित्र `20` चा गट आणि अर्धे चित्र `10` दर्शवते',
        'कागद उभ्याऐवजी आडवा पकडायला सांगणे',
        'स्तंभांचा रंग निळ्याऐवजी लाल करणे',
        'उभ्या अक्षावर `5` पेक्षा लहानच अंक ठेवणे',
      ],
      exp: 'प्रमाणाचे गुणक भान न दिल्यास मुले `3` झाडांच्या चित्रांना `60` ऐवजी `3` च मोजण्याची चूक करतात.',
    },
    hi: {
      q: 'कक्षा 3 में `1` चित्र = `1` फूल होता है, जबकि कक्षा 5 में `1` वृक्ष चित्र = `20` वृक्ष होता है। इस बदलाव में शिक्षक को कौन-सी अवधारणा स्पष्ट रूप से सिखानी चाहिए?',
      opts: [
        'एक-से-एक गिनती से "एक-से-अनेक पैमाना (Many-to-One Scale)" पर आना — जहाँ `1` चिह्न `20` का समूह और आधा चिह्न `10` दर्शाता है',
        'केवल कागज़ को आड़ा घुमाना',
        'बार का रंग लाल करना',
        'ऊर्ध्वाधर अक्ष पर केवल `5` तक गिनती रखना',
      ],
      exp: 'पैमाना (Scale) का गुणात्मक अर्थ स्पष्ट न करने पर बच्चे `3` चित्रों को `60` के बजाय `3` ही गिन लेते हैं।',
    },
  },
  {
    topic: 'Enrichment For Mathematically Gifted Primary Learners',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 4 pupil finishes standard textbook division exercises accurately in five minutes and asks for challenge work. Which enrichment choice aligns BEST with NEP-2020?',
      opts: [
        'Offering non-routine open-ended math puzzles (KenKen grids, magic squares, finding multiple solution paths, framing word problems) that deepen reasoning rather than rushing ahead mechanically',
        'Assigning `50` identical extra long-division drill sums just to keep the child quiet',
        'Making the child stand outside the door to supervise lines',
        'Forcing the child to copy Class 9 trigonometry definitions blindly',
      ],
      exp: 'Horizontal enrichment (depth, pattern puzzles, justification, problem-posing) nurtures mathematical creativity instead of busywork repetition or mechanical acceleration.',
    },
    mr: {
      q: 'इयत्ता चौथीतील एक प्रतिभावान विद्यार्थी नेहमीचा सराव पाच मिनिटांत अचूक पूर्ण करतो. NEP-2020 नुसार त्याच्यासाठी सर्वोत्तम समृद्धी उपक्रम (Enrichment) कोणता?',
      opts: [
        'केनकेन कोडी, जादूचे चौरस, एकाच प्रश्नाचे विविध मार्ग शोधणे व स्वतः आव्हानात्मक प्रश्न तयार करणे यांसारखे सखोल विचारप्रवर्तक उपक्रम देणे',
        'त्याला शांत ठेवण्यासाठी तशीच आणखी `50` भागाकाराची उदाहरणे देणे',
        'त्याला वर्गाबाहेर रांग सांभाळायला उभे करणे',
        'नववीच्या त्रिकोणमितीची सूत्रे न समजता उतरवून घ्यायला सांगणे',
      ],
      exp: 'प्रतिभावान विद्यार्थ्यांना अधिक खोलीचे व तर्क-समृद्ध उपक्रम (Horizontal Enrichment) देणे म्हणजे केवळ यांत्रिक पुनरावृत्ती टाळणे होय.',
    },
    hi: {
      q: 'कक्षा 4 का एक मेधावी छात्र सामान्य अभ्यास 5 मिनट में सही हल कर लेता है। NEP-2020 के अनुसार उसे किस प्रकार का संवर्धन (Enrichment) कार्य देना सर्वोत्तम है?',
      opts: [
        'जादुई वर्ग, सुडोकू/केनकेन पहेलियाँ, एक समस्या के अनेक समाधान खोजना और स्वयं नए प्रश्न गढ़ने जैसे गहन तार्किक कार्य देना',
        'उसे व्यस्त रखने के लिए वैसे ही `50` अतिरिक्त भाग के सवाल दे देना',
        'कक्षा के बाहर कतार देखने के लिए खड़ा कर देना',
        'कक्षा 9 की त्रिकोणमिति बिना समझे रटने को देना',
      ],
      exp: 'क्षैतिज संवर्धन (गहराई, पहेलियाँ और बहु-विधि चिंतन) प्रतिभाशाली छात्रों की सृजनात्मकता को निखारता है।',
    },
  },
  {
    topic: 'Developing Productive Mathematical Disposition Mindset',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'What does "Productive Disposition" mean among the five strands of mathematical proficiency highlighted in global and NCF-aligned primary reforms?',
      opts: [
        'Seeing mathematics as sensible, useful, and worthwhile, alongside believing that steady effort and strategy exploration lead to growth',
        'Always getting 100% on the first try without ever struggling',
        'Believing math ability is a fixed birth gift that some students simply lack',
        'Finishing worksheets silently without asking questions',
      ],
      exp: 'Productive disposition builds resilience ("I haven’t cracked this pattern YET, let me try a diagram") instead of fragile fixed-ability anxiety.',
    },
    mr: {
      q: 'गणितीय प्रावीण्यातील "सकारात्मक/उत्पादक वृत्ती (Productive Disposition)" या घटकाचा अचूक अर्थ काय?',
      opts: [
        'गणित हे तर्कसंगत, उपयुक्त व शिकण्याजोगे आहे असा विश्वास असणे आणि सातत्यपूर्ण प्रयत्नांतून व युक्ती शोधातून प्रगती होते ही धारणा बाळगणे',
        'पहिल्याच प्रयत्नात कोणत्याही संघर्षाशिवाय १००% गुण मिळणे',
        'गणित ही फक्त जन्मतः मिळालेली देणगी आहे असे मानणे',
        'कोणताही प्रश्न न विचारता शांतपणे वही भरणे',
      ],
      exp: 'सकारात्मक वृत्तीमुळे कठीण प्रश्नासमोर खचून न जाता आकृती, तक्ता किंवा वेगळा मार्ग शोधण्याचा आत्मविश्वास राहतो.',
    },
    hi: {
      q: 'गणितीय दक्षता के संदर्भ में "सकारात्मक/उत्पादक मनोवृत्ति (Productive Disposition)" का सही अर्थ क्या है?',
      opts: [
        'गणित को सार्थक, उपयोगी व समझने योग्य मानना तथा यह विश्वास रखना कि निरंतर प्रयास व रणनीति से इसमें सुधार संभव है',
        'बिना किसी संघर्ष के पहली ही बार में शत-प्रतिशत अंक पाना',
        'यह मानना कि गणितीय क्षमता जन्मजात और अपरिवर्तनीय होती है',
        'बिना कोई सवाल पूछे चुपचाप कार्यपत्रिका भरना',
      ],
      exp: 'यह विकासशील मानसिकता बच्चों में जिज्ञासा और कठिन समस्याओं से जूझने का धैर्य पैदा करती है।',
    },
  },
  {
    topic: 'Composite Perimeter Interior Edge Trap Joining Two Squares',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Two square handkerchiefs of side `10 cm` each are placed side by side cleanly edge-to-edge to form a `20 cm × 10 cm` rectangle. Many students claim the new perimeter is `40 + 40 = 80 cm`. How do you clear this misconception?',
      opts: [
        'Ask pupils to trace ONLY the outer boundary with a coloured sketch-pen or string, discovering that the two touching interior edges (`10 + 10 = 20 cm`) lie inside and no longer belong to the perimeter (`60 cm`)',
        'Tell them to add the areas instead of sides',
        'Confirm `80 cm` is right whenever squares are wooden',
        'Remove perimeter formulas from the syllabus completely',
      ],
      exp: 'Tracing the exterior path physically with string reveals immediately why internal shared seams disappear from outer perimeter (`80 − 20 = 60 cm`).',
    },
    mr: {
      q: '`10 सेमी` बाजू असलेले दोन चौरसाकृती रुमाल कडेने एकमेकांना जोडून `20 सेमी × 10 सेमी` आयत बनवला. बरेच विद्यार्थी नवीन परिमिती `40 + 40 = 80 सेमी` मानतात. ही चूक कशी दूर कराल?',
      opts: [
        'फक्त बाहेरील कडेवरून दोरा किंवा रंगीत पेन फिरवायला सांगून दाखवणे की आतील जोडलेल्या दोन कडा (`10 + 10 = 20 सेमी`) आत गेल्यामुळे परिमिती `60 सेमी` होते',
        'बाजूऐवजी क्षेत्रफळाची बेरीज करायला सांगणे',
        'रुमालाऐवजी लाकडी चौरस असल्यास `80 सेमी` बरोबर ठरते असे सांगणे',
        'परिमितीचे सूत्र अभ्यासक्रमातून वगळणे',
      ],
      exp: 'दोऱ्याने बाहेरील सीमा मोजल्यास आत दडलेल्या कडा परिमितीत का धरत नाहीत हे प्रत्यक्ष पटते.',
    },
    hi: {
      q: '`10 सेमी` भुजा वाले दो वर्गाकार रूमालों को सटाकर `20 × 10 सेमी` का आयत बनाया गया। कई छात्र नया परिमाप `40 + 40 = 80 सेमी` बता देते हैं। यह भ्रम कैसे दूर करेंगे?',
      opts: [
        'केवल बाहरी सीमा पर धागा या स्केच-पेन चलवाकर दिखाना कि बीच में सटी दोनों भुजाएँ (`10+10=20 सेमी`) अब अंदर चली गईं, अतः बाहरी परिमाप `60 सेमी` है',
        'भुजाओं की जगह क्षेत्रफल जोड़ने को कहना',
        'लकड़ी के वर्ग होने पर `80 सेमी` सही मानना',
        'परिमाप का विषय हटा देना',
      ],
      exp: 'बाहरी घेरे पर धागा घुमाने की गतिविधि आंतरिक साझा भुजाओं को न गिनने का कारण तुरंत स्पष्ट करती है।',
    },
  },
  {
    topic: 'NEP 2020 Art Integration Rangoli & Warli Dot Grids',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Under NEP-2020’s Art-Integrated Learning guidelines, how can creating dot-grid Rangoli patterns and Warli geometric motifs enrich primary mathematics?',
      opts: [
        'Pupils concretely explore reflection symmetry, tessellation, rotational regularity, triangle counts, and spatial proportions rooted in Maharashtra’s cultural heritage',
        'It replaces arithmetic testing completely with painting grades',
        'It limits math instruction only to Diwali week celebrations',
        'It teaches exclusively freehand sketching without any counting or geometry',
      ],
      exp: 'Maharashtra’s `ठिपक्यांची रांगोळी` (dot-grid rangoli) and Warli art naturally embed coordinate grids, mirror axes, triangles, and repeating patterns.',
    },
    mr: {
      q: 'NEP-2020 च्या कला-एकात्मिक अध्ययन (Art-Integrated Learning) मार्गदर्शक तत्त्वांनुसार महाराष्ट्रातील ठिपक्यांची रांगोळी व वारली चित्रे प्राथमिक गणिताला कशी समृद्ध करतात?',
      opts: [
        'सांस्कृतिक कलांमधूनच सममिती, भौमितिक आकार, नमुन्यांची आवर्तने (tessellation), त्रिकोण मोजणी व अवकाशीय प्रमाण यांचा प्रत्यक्ष आनंददायी अनुभव मिळतो',
        'यामुळे गणिताची सर्व आकडेमोड परीक्षा बंद होते',
        'हे केवळ दिवाळीच्या आठवड्यापुरतेच मर्यादित असते',
        'यात मोजणी किंवा भूमितीचा काहीच संबंध नसतो',
      ],
      exp: 'ठिपक्यांची रांगोळी व वारली आकृत्यांमध्ये समन्वयक जाळी, प्रतिबिंब-सममिती व त्रिकोणांची रचना सहजपणे सामावलेली असते.',
    },
    hi: {
      q: 'NEP-2020 के कला-समेकित अधिगम के अंतर्गत डॉट-ग्रिड रंगोली और वर्ली ज्यामितीय चित्रण प्राथमिक गणित को कैसे समृद्ध करते हैं?',
      opts: [
        'विद्यार्थी क्षेत्रीय सांस्कृतिक धरोहर से जुड़कर सममिति, टेसेलेशन, त्रिभुज-संयोजन, पैटर्न व स्थानिक अनुपात का प्रत्यक्ष अनुभव करते हैं',
        'इससे अंकगणित की सभी संक्रियाएँ समाप्त हो जाती हैं',
        'यह केवल दिवाली सप्ताह तक सीमित अभ्यास है',
        'इसमें किसी गिनती या ज्यामिति का प्रयोग नहीं होता',
      ],
      exp: 'रंगोली की बिंदु-ग्रिड और वर्ली कला में सममिति, ज्यामितीय आकार और क्रमिक पैटर्न स्वाभाविक रूप से गुँथे होते हैं।',
    },
  },
  {
    topic: 'True Meaning Of Procedural Fluency vs Brittle Memorization',
    pattern: 'Pedagogical',
    difficulty: 'Pedagogical HOTS',
    en: {
      q: 'Which student performance best exemplifies genuine "Procedural Fluency" in primary mathematics rather than brittle mechanical drill?',
      opts: [
        'Computing `99 + 46` accurately and flexibly by thinking `100 + 46 − 1 = 145`, while also able to verify with standard vertical addition when needed',
        'Chanting multiplication tables at high speed without knowing `6 × 8` means `6` groups of `8`',
        'Executing only one rigid algorithm even on `500 − 499` by crossing out across zeroes',
        'Copying steps blindly without checking whether `405 − 38 = 433` makes sense',
      ],
      exp: 'True procedural fluency encompasses four pillars: efficiency, accuracy, flexibility (adapting strategy to numbers like `99 + 46` or `500 − 499`), and conceptual appropriateness.',
    },
    mr: {
      q: 'प्राथमिक गणितात यांत्रिक पाठांतराऐवजी अस्सल "प्रक्रियात्मक प्रवाहीपणा (Procedural Fluency)" चे सर्वोत्तम उदाहरण कोणते?',
      opts: [
        '`99 + 46` ची बेरीज लवचिकपणे `100 + 46 − 1 = 145` अशी अचूक व जलद करणे आणि गरज पडल्यास उभी मांडणीही पडताळता येणे',
        '`6 × 8` चा अर्थ न कळता फक्त वेगात पाढे म्हणणे',
        '`500 − 499` सारख्या सोप्या उदाहरणासाठीही हातच्याची लांबलचक रीत वापरणे',
        '`405 − 38 = 433` आले तरी अर्थ न तपासता उतरवून ठेवणे',
      ],
      exp: 'खऱ्या प्रक्रियात्मक प्रवाहीपणात अचूकता, कार्यक्षमता आणि संख्येनुसार योग्य युक्ती निवडण्याची लवचिकता यांचा संगम असतो.',
    },
    hi: {
      q: 'प्राथमिक गणित में यांत्रिक रटने के बजाय वास्तविक "प्रक्रियात्मक प्रवाह (Procedural Fluency)" का सर्वोत्तम उदाहरण कौन-सा है?',
      opts: [
        '`99 + 46` को लचीले ढंग से `100 + 46 − 1 = 145` सोचकर सटीक हल करना और आवश्यकता होने पर मानक विधि से जाँच भी कर पाना',
        '`6 × 8` का अर्थ जाने बिना तेज़ी से पहाड़ा बोलना',
        '`500 − 499` के लिए भी केवल कठोर उधार लेने की लंबी विधि पर अड़े रहना',
        'उत्तर `405 − 38 = 433` की तर्कसंगतता न जाँचना',
      ],
      exp: 'प्रक्रियात्मक प्रवाह में सटीकता, दक्षता तथा संख्याओं की प्रकृति के अनुसार लचीली रणनीति चुनने की समझ शामिल होती है।',
    },
  },
];
