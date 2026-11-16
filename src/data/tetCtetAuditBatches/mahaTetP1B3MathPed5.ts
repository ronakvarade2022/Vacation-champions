import { CuratedTrilingualMcq } from './types';

// Batch 3 Primary Mathematics Pedagogy Part 5 (20 verified trilingual MCQs)
export const MAHA_TET_P1_B3_MATH_PED5: CuratedTrilingualMcq[] = [
  {
    topic: 'Newman’s Error Hierarchy – Locating Breakdown Stage',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'According to Anne Newman’s diagnostic error-analysis hierarchy for word problems (`Reading -> Comprehension -> Transformation -> Process Skills -> Encoding`), a pupil who reads fluently, explains the story accurately, picks the wrong operation (adds instead of dividing), fails at which stage?',
      opts: [
        'Transformation (translating the understood real story into the right mathematical operation/equation)',
        'Decoding printed letters ("Reading")',
        'Arithmetic computation fluency ("Process Skills")',
        'Writing final answer unit neatly ("Encoding")',
      ],
      exp: 'Newman’s interview pinpoints whether a child stumbled on vocabulary, comprehension, operation selection (Transformation), calculation, or writing units.',
    },
    mr: {
      q: 'अॅन न्यूमनच्या शाब्दिक उदाहरण त्रुटी-विश्लेषण टप्प्यांनुसार (`वाचन -> आकलन -> रूपांतरण -> प्रक्रिया -> लेखन`) जर मूल गोष्ट अचूक समजावून सांगते पण भागाकाराऐवजी चुकून बेरीज निवडते, तर ते कोणत्या टप्प्यावर अडखळले?',
      opts: [
        'रूपांतरण (Transformation — समजलेल्या कथेचे अचूक गणितीय क्रियेत रूपांतर करणे)',
        'अक्षर वाचन (Reading)',
        'गणितीय आकडेमोड कौशल्य (Process)',
        'शेवटचे उत्तर एककासह लिहिणे (Encoding)',
      ],
      exp: 'न्यूमनची ५-पायरी मुलाखत नेमकी कोणती पायरी चुकली (आकलन, क्रिया निवड की आकडेमोड) हे अचूक दाखवते.',
    },
    hi: {
      q: 'ऐन न्यूमैन की इबारती समस्या त्रुटि-श्रृंखला (`पठन -> बोध -> रूपांतरण -> प्रक्रिया -> कूटलेखन`) में यदि छात्र कहानी ठीक समझाता है पर भाग के बजाय जोड़ चुन लेता है, तो वह किस स्तर पर अटका है?',
      opts: [
        'रूपांतरण (Transformation — समझे गए प्रसंग को सही गणितीय संक्रिया/समीकरण में बदलना)',
        'अक्षर पठन (Reading)',
        'गणना कौशल (Process Skills)',
        'अंतिम इकाई सहित लिखना (Encoding)',
      ],
      exp: 'न्यूमैन विश्लेषण यह पहचानने में मदद करता है कि छात्र भाषा, अर्थ, संक्रिया चयन या गणना में से ठीक कहाँ अटक रहा है।',
    },
  },
  {
    topic: 'Bridging Counting-All to Counting-On From Larger Addend',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Seeing a Class 1 child solve `3 + 9` by counting `1, 2, 3` AND then `1, 2, 3, ..., 12` ("Counting-All"), how does the teacher gently nudge toward "Counting-On From Larger"?',
      opts: [
        'Put `9` beads inside a covered box saying "9 are ALREADY inside—just tap 3 more: 10, 11, 12!", highlighting commutativity `9 + 3 = 3 + 9`',
        'Force immediate memorization of `18 × 18` tables',
        'Hide all concrete beads so the child guesses wildly',
        'Insist counting MUST always begin strictly from `1`',
      ],
      exp: 'Hiding the larger set (`9`) inside an opaque cup forces mental retention of `9` and counting-on just `3` steps.',
    },
    mr: {
      q: 'इ. १ लीतील मूल `३ + ९` साठी दोन्ही ढीग पुन्हा `१ पासून १२ पर्यंत` मोजते; याला "मोठ्या संख्येपासून पुढे मोजणे (Counting-On)" कडे हळुवार कसे न्यावे?',
      opts: [
        'डब्यात `९` मणी झाकून ठेवून "`९` तर आत पक्के आहेत—आता वरचे ३ पुढे मोज: १०, ११, १२!" असा खेळ खेळून व क्रमविनिमेय गुणधर्म वापरून',
        'थेट १८ चे पाढे पाठ करायला लावून',
        'सर्व मणी काढून आंधळा अंदाज लावायला सांगून',
        'मोजणी नेहमी १ पासूनच केली पाहिजे असा हट्ट धरून',
      ],
      exp: 'मोठा गट डब्यात लपवल्याने मुले १ पासून पुन्हा न मोजता थेट `९` च्या पुढे तीन पावले मोजण्याची प्रगती साध्य करतात.',
    },
    hi: {
      q: 'कक्षा 1 का बच्चा `3 + 9` के लिए दोनों ढेर मिलाकर `1 से 12 तक` गिनता है ("Counting-All"); उसे "बड़ी संख्या से आगे गिनने (Counting-On)" तक सहज कैसे लाएँ?',
      opts: [
        'डिब्बे में `9` मोती ढककर कहना: "अंदर 9 पक्के हैं—अब केवल 3 और आगे गिनो: 10, 11, 12!" और क्रम-विनिमेय का उपयोग करना',
        'सीधे 18 के पहाड़े रटवाना',
        'सभी मोती हटाकर तुक्का लगवाना',
        'हमेशा 1 से ही गिनने पर अड़े रहना',
      ],
      exp: 'बड़ी संख्या को कप में ढकने का खेल बच्चे को `1` से दोबारा गिनती छुड़ाकर `9` से केवल 3 कदम आगे गिनना सिखाता है।',
    },
  },
  {
    topic: 'Hundred-Chart Patterns for Mental `+10` & `+9` Operations',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Tracing downward moves (`+10` per row: `24 -> 34 -> 44`) and diagonal moves (`+11` or `+9`) on a `1–100` classroom pocket chart empowers Class 2–3 learners to:',
      opts: [
        'Add or subtract tens (`47 + 20 = 67`) and adjust `+9` (`+10 − 1`) mentally without counting ones on fingers',
        'Lose track of place-value columns permanently',
        'Add diagonally across unrelated calendars',
        'Memorize `100` unrelated random labels',
      ],
      exp: 'The 10×10 chart turns base-10 jumps (`±10` down/up, `±1` right/left) into an intuitive spatial mental map.',
    },
    mr: {
      q: '`१–१००` च्या तक्त्यावर उभ्या रांगेत खाली जाणे (`+१०`) व तिरपे जाणे (`+११` किंवा `+९`) यांचा शोध घेतल्याने इ. २ री–३ रीतील मुले काय आत्मसात करतात?',
      opts: [
        'बोटे न मोजता मनातल्या मनात दशकांची बेरीज-वजाबाकी (`४७ + २० = ६७`) आणि `+९` म्हणजे (`+१० − १`) झटपट करण्याची क्षमता',
        'स्थानिक किंमत कायमची विसरणे',
        'दिनदर्शिकेवर तिरपी बेरीज करणे',
        '१०० स्वतंत्र नावे पाठ करणे',
      ],
      exp: '१००-संख्येचा तक्ता दहा-दहाच्या उड्या (`±१०`) डोळ्यांसमोर आणून मानसिक आकडेमोड गतिमान करतो.',
    },
    hi: {
      q: '`1–100` के चार्ट पर सीधे नीचे जाने (`+10`) और तिरछे जाने (`+11` या `+9`) का पैटर्न खोजने से कक्षा 2–3 के बच्चे क्या सीखते हैं?',
      opts: [
        'उँगलियाँ गिने बिना मन में दहाइयाँ जोड़ना-घटाना (`47 + 20 = 67`) और `+9` को (`+10 − 1`) के रूप में तेज़ी से हल करना',
        'स्थानीय मान हमेशा के लिए भूल जाना',
        'कैलेंडर पर तिरछा जोड़ना',
        '100 असंबद्ध नाम रटना',
      ],
      exp: '10×10 संख्या-चार्ट आधार-10 की छलाँगों (`±10`) का स्पष्ट स्थानिक मानचित्र बना देता है।',
    },
  },
  {
    topic: 'Eratosthenes Sieve Guided Discovery for Prime Numbers',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Having Class 5 students systematically cross `1`, then multiples of `2` (beyond 2), multiples of `3` (beyond 3), `5`, and `7` on a `1–100` grid ("Sieve of Eratosthenes") beats handing out a pre-printed list because:',
      opts: [
        'Learners witness WHY composite numbers drop out through multiplication tables and discover why checking beyond `7` (`√100 = 10`) catches no new composites up to `100`',
        'Crossing numbers wastes coloured crayons nicely',
        'Pre-printed lists teach divisibility patterns faster',
        'It proves `91 = 7 × 13` is prime',
      ],
      exp: 'Active sieving connects multiples directly to prime emergence and prevents false-prime traps like `51`, `87`, and `91`.',
    },
    mr: {
      q: 'मूळ संख्यांची छापलेली यादी पाठ करण्यापेक्षा `१–१००` तक्त्यावर `१` खोडून मग `२, ३, ५, ७` च्या पटीतील संख्या गाळण्याची "इरॅटोस्थेनिसची चाळणी" अधिक उपयुक्त का ठरते?',
      opts: [
        'पाढ्यांत येणाऱ्या संयुक्त संख्या कशा गळून पडतात व `५१, ८७, ९१` या मूळ का नाहीत हे विद्यार्थी स्वतः शोधून अनुभवतात',
        'खडूचे रंग वाया जातात म्हणून',
        'छापील यादीत विभाज्यता लवकर कळते',
        '`९१` ही मूळ संख्या ठरते म्हणून',
      ],
      exp: 'चाळणीच्या प्रयोगातून `९१ = ७ × १३` व `५१ = ३ × १७` यांसारख्या फसव्या संख्या आपोआप बाजूला पडतात.',
    },
    hi: {
      q: 'अभाज्य संख्याओं की छपी सूची रटाने के बजाय `1–100` ग्रिड पर `1` तथा `2, 3, 5, 7` के गुणज काटकर "इरैटोस्थनीज़ की छलनी" खुद बनाने का क्या लाभ है?',
      opts: [
        'बच्चे स्वयं देखते हैं कि पहाड़ों के गुणज कैसे कटते हैं और `51`, `87`, `91` जैसी दिखने वाली संख्याएँ अभाज्य क्यों नहीं हैं',
        'रंग भरने का समय कटता है',
        'छपी सूची भाज्यता तेज़ी से सिखाती है',
        'इससे `91` अभाज्य सिद्ध होता है',
      ],
      exp: 'सक्रिय छलनी गतिविधि गुणज व विभाज्यता को सीधे अभाज्य पहचान से जोड़कर `51, 91` जैसे भ्रम समाप्त करती है।',
    },
  },
  {
    topic: 'Hands-On Circle Ratio Discovery via Bangles & Thread',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Before ever stating `C = π × d`, Class 5 pairs wrap string around circular tiffin lids, bicycle wheels, and glass bangles, measure circumference and diameter, and compute `C ÷ d`. Discovering every ratio hovers near `3.1` cultivates:',
      opts: [
        'Genuine empirical reverence for `π` as a universal constant ratio invariant across tiny coins and huge tractor tyres alike',
        'Proof that circumference equals diameter minus 3',
        'Needless fear of decimal division',
        'Memorization of `22/7` with zero geometric meaning',
      ],
      exp: 'Measuring real circles inductively anchors `π` as "a little over 3 diameters around every circle".',
    },
    mr: {
      q: '`परिघ = π × व्यास` सांगण्यापूर्वी डब्याचे झाकण, बांगडी व सायकलचे चाक यांचा परिघ दोऱ्याने मोजून `परिघ ÷ व्यास` काढल्यास सर्व उत्तरे `३.१` च्या आसपास येतात; या प्रयोगातून काय साधते?',
      opts: [
        'छोट्या नाण्यापासून मोठ्या चाकापर्यंत सर्व वर्तुळांत हा गुणोत्तर अचल राहतो—`π` हा जादूचा आकडा नसून एक सार्वत्रिक भौमितिक सत्य असल्याची प्रचीती येते',
        'परिघ हा व्यास वजा ३ असतो हे सिद्ध होते',
        'दशांश भागाकाराची भीती वाटते',
        'अर्थ न समजता `२२/७` पाठ होते',
      ],
      exp: 'बांगडी-दोरीच्या प्रत्यक्ष प्रयोगातून `π` म्हणजे "परिघ हा नेहमी व्यासाच्या सव्वातीन पट" ही संकल्पना जन्मभर लक्षात राहते.',
    },
    hi: {
      q: '`परिधि = π × व्यास` बताने से पहले डिब्बे के ढक्कन, चूड़ी व पहिए की परिधि धागे से नापकर `परिधि ÷ व्यास` निकालने पर हर बार मान `3.1` के पास आता है; इस खोज से क्या बनता है?',
      opts: [
        'छोटे सिक्के से बड़े पहिए तक हर वृत्त में यह अनुपात स्थिर रहता है—`π` कोई रटने का प्रतीक नहीं बल्कि एक सार्वभौमिक ज्यामितीय सत्य है',
        'सिद्ध होता है कि परिधि = व्यास − 3',
        'दशमलव भाग का अनावश्यक भय पैदा होता है',
        'बिना अर्थ समझे `22/7` रटा जाता है',
      ],
      exp: 'वास्तविक वृत्तों को मापकर `π` खोजने से बच्चा समझता है कि हर वृत्त का घेरा उसके व्यास का लगभग 3.14 गुना होता है।',
    },
  },
  {
    topic: 'Avoiding Irrelevant Attributes in Shape Definitions',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In Class 2–3 geometry, why is it essential to display NON-EXAMPLES and varied-orientation triangles (thin scalene, upside-down, tiny, red AND green) rather than only upright green equilateral triangles?',
      opts: [
        'So pupils abstract defining invariants (3 closed straight sides/vertices) rather than falsely linking "triangle" to green colour, upright base, or equal sides',
        'Because upright triangles have 4 sides',
        'To confuse young learners intentionally about angles',
        'Because green equilateral triangles are illegal polygons',
      ],
      exp: 'Concept attainment theory stresses varying irrelevant attributes (size, colour, rotation) and contrasting close non-examples.',
    },
    mr: {
      q: 'इ. २ री–३ रीत केवळ सरळ उभ्या हिरव्या समभुज त्रिकोणांऐवजी वेगवेगळ्या रंगांचे, उलट्या दिशेचे, पातळ विषमभुज त्रिकोण आणि "अ-उदाहरणे" दाखवणे का गरजेचे असते?',
      opts: [
        'त्रिकोण म्हणजे हिरवा रंग किंवा सपाट तळ नसून "३ बंद सरळ बाजू" हाच खरा गुणधर्म आहे हे विद्यार्थी वेगळे काढून शिकतात',
        'उभ्या त्रिकोणाला ४ बाजू असतात म्हणून',
        'मुलांचा गोंधळ उडवण्यासाठी',
        'समभुज त्रिकोण बेकायदेशीर असतात म्हणून',
      ],
      exp: 'अनावश्यक गुणधर्म (रंग, आकार, कोनाची दिशा) बदलून दाखवल्यानेच आकृतीची अचूक व्याख्या मनात तयार होते.',
    },
    hi: {
      q: 'कक्षा 2–3 में केवल सीधे हरे समबाहु त्रिभुजों के बजाय उलटे, पतले विषमबाहु, अलग-अलग रंगों के त्रिभुज और गैर-उदाहरण दिखाना क्यों आवश्यक है?',
      opts: [
        'ताकि बच्चे रंग या सीधी स्थिति जैसे अप्रासंगिक गुणों से हटकर असली परिभाषा (3 बंद सीधी भुजाएँ) की पहचान कर सकें',
        'क्योंकि सीधे त्रिभुज में 4 भुजाएँ होती हैं',
        'जानबूझकर भ्रम पैदा करने हेतु',
        'समबाहु त्रिभुज अमान्य हैं इसलिए',
      ],
      exp: 'अप्रासंगिक गुण (रंग, आकार, झुकाव) बदलते रहने से ज्यामितीय अवधारणा की शुद्ध परिभाषा निर्मित होती है।',
    },
  },
  {
    topic: 'Mental Subtraction via Constant Difference Compensation',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Demonstrating mentally that `703 − 298` equals `705 − 300 = 405` (adding `+2` equally to BOTH numbers) on a visual number line builds:',
      opts: [
        'Flexible relational thinking—understanding subtraction as the fixed GAP/distance between two points that stays unchanged when both slide by `+2`',
        'A violation of inverse subtraction rules',
        'Confusion with vertical addition carries',
        'A rule that ONLY works when subtracting `1`',
      ],
      exp: 'Seeing subtraction as distance along the number line makes the Constant-Difference shift intuitive and eliminates zero-borrowing mistakes.',
    },
    mr: {
      q: 'संख्यारेषेवर `७०३ − २९८` ही वजाबाकी दोन्ही संख्यांत समान `+२` मिळवून `७०५ − ३०० = ४०५` अशी तोंडी काढून दाखवल्याने कोणता विचार बळकट होतो?',
      opts: [
        'वजाबाकी म्हणजे दोन बिंदूंमधील अंतर (Gap)—दोन्ही बिंदू समान `+२` पुढे सरकवल्यास त्यांच्यातील अंतर तेच राहते ही लवचिक समज',
        'वजाबाकीच्या नियमांचा भंग',
        'उभ्या बेरजेतील हातच्याशी गल्लत',
        'फक्त `१` साठीच चालणारी मर्यादित युक्ती',
      ],
      exp: 'वजाबाकी ही संख्यारेषेवरील अंतर आहे हे समजल्यावर `७०३−२९८` मधील शून्य-हातचा चूक टळते.',
    },
    hi: {
      q: 'संख्या-रेखा पर `703 − 298` को दोनों संख्याओं में समान `+2` जोड़कर `705 − 300 = 405` हल करके दिखाना क्या पुष्ट करता है?',
      opts: [
        'घटाव दो बिंदुओं के बीच की दूरी है—दोनों को बराबर `+2` खिसकाने पर अंतर अपरिवर्तित रहता है, यह लचीली संबंधात्मक सूझ',
        'घटाव नियमों का उल्लंघन',
        'हासिल जोड़ के साथ भ्रम',
        'केवल `1` घटाने का सीमित नियम',
      ],
      exp: 'स्थिर अंतर (Constant difference) रणनीति शून्य से उधार की झंझट के बिना सटीक मानसिक घटाव सिखाती है।',
    },
  },
  {
    topic: 'Curing "Longer Rays = Larger Angle" Misconception',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Many Class 4 learners say an angle with `8 cm` arms looks "bigger" than an identical `45°` angle with `3 cm` arms. Which tactile demonstration refutes this permanently?',
      opts: [
        'Slide a transparent plastic `45°` cut-out directly over BOTH corners so pupils see the vertex opening matches identically regardless of how far the arms extend',
        'Measure arm lengths in centimetres and declare `8 cm` wins',
        'Only ever draw angles with exact `5 cm` arms',
        'Postpone angle comparison until Class 8',
      ],
      exp: 'Superposing transparent angle templates proves angle measures rotational spread (opening), NOT line-segment length.',
    },
    mr: {
      q: 'इ. ४ थीतील मुले समान `४५°` मापाच्या कोनांत `८ सेमी` बाजूंचा कोन `३ सेमी` बाजूंच्या कोनापेक्षा "मोठा" समजतात; हा गैरसमज कोणता प्रयोग कायमचा दूर करतो?',
      opts: [
        'पारदर्शक प्लास्टिकच्या एकाच `४५°` कोन-पट्टीने दोन्ही कोन झाकून बाजू कितीही लांब असल्या तरी कोनाचे तोंड/वळण सारखेच असल्याचे दाखवणे',
        'बाजू सेंमीमध्ये मोजून ८ सेमी मोठा ठरवणे',
        'नेहमीच ५ सेमी बाजूंचे कोन काढणे',
        'इ. ८ वीपर्यंत कोन तुलना पुढे ढकलणे',
      ],
      exp: 'अध्यारोपण (Superposition) करून कोन म्हणजे बाजूंची लांबी नसून दोन किरणांतील वळण/पसरण आहे हे प्रत्यक्ष दाखवता येते.',
    },
    hi: {
      q: 'कक्षा 4 के कई बच्चे समान `45°` माप होने पर भी `8 सेमी` भुजा वाले कोण को `3 सेमी` वाले से "बड़ा" बताते हैं; कौन-सा प्रयोग यह भ्रम मिटाता है?',
      opts: [
        'एक पारदर्शी `45°` कट-आउट दोनों कोनों पर रखकर दिखाना कि भुजाएँ कितनी भी लंबी हों, शीर्ष पर फैलाव ठीक बराबर है',
        'भुजाएँ सेमी में नापकर 8 सेमी को बड़ा मान लेना',
        'हमेशा 5 सेमी भुजा के ही कोण बनवाना',
        'कक्षा 8 तक कोण तुलना टालना',
      ],
      exp: 'पारदर्शी कट-आउट के अध्यारोपण से सिद्ध होता है कि कोण रेखा की लंबाई नहीं, बल्कि घुमाव/फैलाव की माप है।',
    },
  },
  {
    topic: 'Decimal Trailing-Zero Equivalence (`0.5 = 0.50`) Visually',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Using a `10×10` grid divided into `10` tall vertical strips (tenths) alongside `100` small squares (hundredths), how does a teacher show `0.4 = 0.40` effortlessly?',
      opts: [
        'Shade `4` full tenth-strips (`0.4`) and count that those exact shaded strips simultaneously contain `40` small hundredth-squares (`0.40`) covering identical area',
        'Erase the last zero quietly without reason',
        'Say decimals ignore zero rules completely',
        'Compare `0.4` to `40` whole rupees',
      ],
      exp: 'Seeing `4` tenths columns physically partition into `40` hundredths squares makes `0.4 = 0.40` visually indisputable.',
    },
    mr: {
      q: '`१० × १०` च्या जाळीत `१०` उभ्या पट्ट्या (दशांश) व `१००` छोटे चौकोन (शतांश) वापरून `०.४ = ०.४०` हे सहज कसे दाखवावे?',
      opts: [
        '`४` पूर्ण दशांश पट्ट्या रंगवून दाखवणे की त्यांतच बरोबर `४०` शतांश चौकोन (`०.४०`) सामावलेले आहेत—रंगवलेली जागा तंतोतंत सारखीच राहते',
        'कारण न देता शेवटचा शून्य पुसून टाकणे',
        'दशांशात शून्याचा नियम लागू नाही असे सांगणे',
        '`०.४` ला ४० पूर्ण रुपये मानणे',
      ],
      exp: '४ पट्ट्यांचे ४० चौकोनांत विभाजन डोळ्यांना दिसल्यास `०.४` व `०.४०` चे समान मूल्य पक्के होते.',
    },
    hi: {
      q: '`10 × 10` ग्रिड में `10` लंबी पट्टियाँ (दशांश) और `100` छोटे वर्ग (शतांश) दिखाकर `0.4 = 0.40` आसानी से कैसे सिद्ध किया जाता है?',
      opts: [
        '`4` पूरी पट्टियाँ (`0.4`) रंगकर गिनवाना कि ठीक उसी रंगे भाग में `40` छोटे वर्ग (`0.40`) हैं—कुल क्षेत्रफल बिल्कुल बराबर है',
        'बिना कारण अंतिम शून्य मिटा देना',
        'कहना कि दशमलव में शून्य बेकार है',
        '`0.4` की तुलना `40` पूर्ण रुपयों से करना',
      ],
      exp: 'दशांश पट्टियों का शतांश वर्गों में विभाजन दिखाता है कि अंतिम शून्य जोड़ने पर भी मात्रा अपरिवर्तित रहती है।',
    },
  },
  {
    topic: 'Polya Step 4 – Looking Back & Plausibility Check Culture',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'After a Class 5 learner finishes solving a word problem ("Price of 1 pencil if 8 cost ₹96 -> answers `₹768`"), instilling Polya’s Step 4 ("Look Back") prevents this slip by prompting:',
      opts: [
        '"Pause and ask: Can ONE single pencil possibly cost ₹768 when a whole pack of 8 pencils costs only ₹96?!" — testing real-world magnitude plausibility',
        '"Never re-read a finished word problem"',
        '"Underline the final digits in red ink only"',
        '"Start the next page immediately for speed bonuses"',
      ],
      exp: 'Polya’s Looking-Back reflection catches absurd `×` vs `÷` slips before papers are even handed in.',
    },
    mr: {
      q: '"८ पेन्सिलींची किंमत ₹९६ तर १ पेन्सिलची किती?" याचे उत्तर मूल `₹७६८` काढते; पोल्याची ४ थी पायरी ("मागे वळून तपासणी / Look Back") ही चूक कशी रोखते?',
      opts: [
        '"अरे, ८ पेन्सिलींचा संपूर्ण पुडा फक्त ₹९६ ला असताना एकटी १ पेन्सिल ₹७६८ ची कशी असू शकेल?" असा व्यावहारिक ताळमेळ तपासून',
        'सोडवलेले उदाहरण पुन्हा वाचायचे नाही असा नियम करून',
        'केवळ शेवटच्या उत्तराखाली लाल रेघ ओढून',
        'वेगासाठी लगेच पुढच्या पानावर पळून',
      ],
      exp: 'उत्तराची व्यावहारिक शक्यता तपासण्याची सवय गुणाकार-भागाकाराच्या उलट्या चुका त्वरित पकडते.',
    },
    hi: {
      q: '"8 पेंसिलों की कीमत ₹96 है तो 1 पेंसिल कितने की?" का उत्तर छात्र `₹768` निकालता है; पोल्या का चरण 4 ("पुनरावलोकन / Look Back") इसे कैसे रोकता है?',
      opts: [
        '"ज़रा सोचो—जब 8 पेंसिलों का पूरा पैकेट ₹96 का है, तो अकेली 1 पेंसिल ₹768 की कैसे हो सकती है?" जैसा व्यावहारिक औचित्य जाँचकर',
        'हल किए सवाल को दोबारा न पढ़ने का नियम बनाकर',
        'केवल अंतिम संख्या के नीचे लाल रेखा खींचकर',
        'तेज़ी के लिए तुरंत अगले प्रश्न पर बढ़कर',
      ],
      exp: 'पोल्या का चौथा चरण उत्तर की वास्तविक तार्किक संगति परखने की आदत डालकर बड़ी गणना-त्रुटियों को रोकता है।',
    },
  },
  {
    topic: 'Visual Shape-Equation Balance Puzzles for Algebra Readiness',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Posing playful picture puzzles in Class 4—such as `★ + ★ + 6 = 20` and `★ + ▲ = 15`—smoothly prepares learners for secondary algebra without cognitive overload because:',
      opts: [
        'Shapes serve as friendly intuitive placeholders representing unknown fixed numbers before symbolic `x` and `y` letters appear',
        'Stars obey completely different arithmetic laws from digits',
        'Letters `x` and `y` are banned from primary arithmetic permanently',
        'Shapes require trigonometric tables to evaluate',
      ],
      exp: 'Iconic unknowns (`★`, `▲`) establish substitution and balancing operations smoothly ahead of formal letter variables.',
    },
    mr: {
      q: 'इ. ४ थीत `★ + ★ + ६ = २०` आणि `★ + ▲ = १५` अशी रंजक चिन्ह-कोडी देण्याने माध्यमिक बीजगणिताची तयारी ओझ्याविना कशी होते?',
      opts: [
        'अज्ञात निश्चित संख्या दर्शवण्यासाठी `x, y` सारख्या अक्षरांपूर्वी ही सोपी चित्रे मैत्रीपूर्ण सेतूचे काम करतात',
        'ताऱ्यांचे गणितीय नियम अंकांपेक्षा वेगळे असतात',
        'अक्षरांवर कायमची बंदी असते',
        'चिन्हे काढण्यासाठी त्रिकोणमिती लागते',
      ],
      exp: 'प्रतीकात्मक कोडी (Iconic equations) संतुलन व किंमत ठेवण्याची प्रक्रिया आनंददायी पद्धतीने रुजवतात.',
    },
    hi: {
      q: 'कक्षा 4 में `★ + ★ + 6 = 20` तथा `★ + ▲ = 15` जैसी चित्र-पहेलियाँ देना माध्यमिक बीजगणित की सहज तैयारी कैसे करता है?',
      opts: [
        'औपचारिक `x, y` अक्षरों से पहले ये आकृतियाँ अज्ञात निश्चित मान के मैत्रीपूर्ण प्रतीक बनकर संतुलन व प्रतिस्थापन सिखाती हैं',
        'तारों के गणितीय नियम अंकों से भिन्न होते हैं',
        'अक्षर हमेशा के लिए वर्जित रहते हैं',
        'इन्हें हल करने में त्रिकोणमिति लगती है',
      ],
      exp: 'आकृति-समीकरण (Iconic unknowns) बिना संज्ञानात्मक बोझ के समीकरण हल करने की तार्किक नींव रखते हैं।',
    },
  },
  {
    topic: 'Squared Grid Notebooks for Dysgraphic Place-Value Alignment',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Providing wide `1 cm`-squared graph/grid notebooks (instead of blank unruled pages) to students struggling with motor control or spatial drift immediately reduces vertical addition/multiplication errors because:',
      opts: [
        'Every printed square forces one single digit cleanly inside its own column (`Th | H | T | O`), eliminating skewed diagonal misalignment',
        'Grid pages halve total syllabus topics',
        'Grid boxes solve carries automatically without thinking',
        'Blank unruled sheets enforce tighter column spacing',
      ],
      exp: 'Visual column boundaries remove working-memory strain from spacing digits neatly, letting pupils focus on place value.',
    },
    mr: {
      q: 'अक्षर व आंकडे वाकडे लिहिणाऱ्या विद्यार्थ्यांना कोऱ्या कागदाऐवजी मोठ्या `१ सेमी` चौकोनी चौकटींची वही दिल्यास बेरीज-गुणाकारातील चुका तात्काळ कमी का होतात?',
      opts: [
        'प्रत्येक चौकटीत एकच अंक बसल्याने एकक-दशक-शतक स्तंभ सरळ रेषेत राहतात आणि आडव्या-तिरप्या मांडणीतून होणाऱ्या चुका टळतात',
        'चौकोनी वहीमुळे अभ्यासक्रम निम्मा होतो',
        'चौकोन स्वतःच हातचा सोडवतात',
        'कोऱ्या पानावर स्तंभ अधिक घट्ट बसतात',
      ],
      exp: 'चौकटींच्या स्पष्ट मार्गदर्शनामुळे हस्तलेखन अडचणी असलेल्या मुलांचे स्थानिक किंमत स्तंभ अचूक जुळतात.',
    },
    hi: {
      q: 'लिखने व स्थान-संतुलन में कठिनाई वाले बच्चों को सादे कागज़ के बजाय बड़े `1 सेमी` वर्ग-ग्रिड वाली कॉपी देने से जोड़-गुणा की त्रुटियाँ तुरंत क्यों घटती हैं?',
      opts: [
        'हर खाने में एक अंक रखने से इकाई-दहाई-सैकड़ा के स्तंभ सीधे रहते हैं और टेढ़े खिसकने वाली भूलें रुक जाती हैं',
        'ग्रिड से पाठ्यक्रम आधा हो जाता है',
        'डिब्बे खुद हासिल हल कर देते हैं',
        'सादा कागज़ स्तंभों को ज़्यादा सीधा रखता है',
      ],
      exp: 'स्पष्ट ग्रिड-रेखाएँ स्थानिक व गामक कठिनाई वाले शिक्षार्थियों के लिए स्थानीय मान के स्तंभ सँभाले रखती हैं।',
    },
  },
  {
    topic: 'Transparent Equal Containers for Comparing Liquid Capacity',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'When two learners hold differently shaped water bottles (one wide flask, one tall tumbler) arguing who holds more water, what simple fair-test step settles capacity accurately?',
      opts: [
        'Pour each bottle one-by-one into a SAME uniform transparent cup/beaker, or fill a graduated cylinder marking levels identically',
        'Measure bottle outer height with a centimetre ruler only',
        'Weigh only the empty plastic caps',
        'Pick whichever bottle looks taller from across the desk',
      ],
      exp: 'Pouring into one invariant reference unit isolates internal liquid volume from misleading outer container height.',
    },
    mr: {
      q: 'रुंद फ्लास्क व उंच ग्लास यांपैकी कोणात जास्त पाणी मावते यावर दोन मुलांत वाद झाल्यास अचूक व निःपक्षपाती तपासणी कशी करावी?',
      opts: [
        'दोन्ही भांड्यांतील पाणी एकाच सारख्या पारदर्शक पेल्यात/मोजपात्रात स्वतंत्रपणे ओतून किती प्याले भरतात किंवा पातळी कुठवर येते ते तपासणे',
        'फक्त पट्टीने भांड्यांची बाहेरील उंची मोजणे',
        'फक्त रिकाम्या झाकणांचे वजन करणे',
        'दूरून जो उंच दिसेल तो मोठा ठरवणे',
      ],
      exp: 'दोन्ही भांड्यांचे मापन एकाच समान संदर्भ-पात्रात केल्याने बाह्य आकाराचा भ्रम दूर होऊन खरी धारकता समजते.',
    },
    hi: {
      q: 'चौड़े फ्लास्क और लंबे गिलास में से किसमें अधिक पानी आता है, इस बहस को निष्पक्ष व सटीक रूप से कैसे सुलझाया जाए?',
      opts: [
        'दोनों का पानी बारी-बारी से एक ही समान पारदर्शी गिलास या माप-पात्र में डालकर देखना कि किससे अधिक कप भरते हैं या स्तर ऊँचा जाता है',
        'पैमाने से बाहर की ऊँचाई नापकर तय करना',
        'केवल खाली ढक्कन तौलना',
        'दूर से जो ऊँचा दिखे उसे बड़ा मान लेना',
      ],
      exp: 'एक समान मानक संदर्भ-पात्र में पलटकर नापना बाहरी ऊँचाई के भ्रम से अलग वास्तविक धारिता सिद्ध करता है।',
    },
  },
  {
    topic: 'Project Rubric Clarity Over Arbitrary Percentage Deductions',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Before Class 5 pupils construct a 3D Geometric Village model from cardboard nets, sharing a 4-part Analytic Rubric (`Accuracy of Nets, Correct Labels, Edge Joins, Creative Application`) benefits students because:',
      opts: [
        'Expectations are transparent from Day 1, empowering self-assessment and fair constructive feedback rather than mystery lump-sum scores',
        'Rubrics prevent creative colour choices completely',
        'All projects automatically receive identical marks',
        'Students avoid learning prism names',
      ],
      exp: 'Clear descriptive criteria guide self-monitoring during making and make project grading objective and formative.',
    },
    mr: {
      q: 'इ. ५ वीचा ३D भौमितिक गाव प्रकल्प सुरू करण्यापूर्वीच ४ निकषांचा पारदर्शक गुण-तक्ता (`जाळ्यांची अचूकता, योग्य नावे, सांधे, सर्जनशील मांडणी`) मुलांसोबत सामायिक केल्याने काय फायदा होतो?',
      opts: [
        'पहिल्या दिवसापासून स्पष्ट अपेक्षा माहीत असल्याने मुले स्वतःच्या कामाचे मूल्यमापन करू शकतात व तंतोतंत अभिप्राय मिळतो',
        'त्यामुळे रंगांच्या निवडीवर बंदी येते',
        'सर्व प्रकल्पांना आपोआप सारखेच गुण मिळतात',
        'मुले लोलकांची नावे शिकणे टाळतात',
      ],
      exp: 'स्पष्ट मूल्यमापन निकष (Rubric) प्रकल्प निर्मितीदरम्यान स्व-परीक्षण व न्याय्य मार्गदर्शन शक्य करतात.',
    },
    hi: {
      q: 'कक्षा 5 की 3D ज्यामितीय गाँव मॉडल परियोजना से पहले 4-बिंदु रूब्रिक (`जाल सटीकता, सही नाम, जोड़ सफाई, सृजनात्मक प्रयोग`) साझा करने से छात्रों को क्या लाभ होता है?',
      opts: [
        'पहले दिन से अपेक्षाएँ स्पष्ट रहती हैं जिससे स्व-आकलन और पारदर्शी रचनात्मक प्रतिपुष्टि संभव होती है',
        'रंग चुनने की स्वतंत्रता खत्म हो जाती है',
        'सभी मॉडलों को अपने आप एक जैसे अंक मिलते हैं',
        'बच्चे प्रिज्म के नाम नहीं सीखते',
      ],
      exp: 'स्पष्ट वर्णनात्मक रूब्रिक निर्माण प्रक्रिया के दौरान स्व-सुधार का मार्गदर्शन करता है और मूल्यांकन को वस्तुनिष्ठ बनाता है।',
    },
  },
  {
    topic: 'Encouraging Diagram Sketching Before Formula Hunting',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Building a classroom habit of "Draw a quick rough sketch FIRST!" before tackling fencing, path-border, or train-distance word problems reduces careless mistakes dramatically because:',
      opts: [
        'Sketching externalizes spatial geometry—showing, for example, that a `2 m` path OUTSIDE a rectangular garden adds `4 m` (`2 + 2`) to BOTH length and breadth',
        'Fine-art shading earns half the arithmetic marks',
        'Sketches replace exact decimal multiplication completely',
        'Drawing slows down visual spatial perception',
      ],
      exp: 'Visualizing inner vs outer borders (`L + 4`) eliminates the classic "forgot both sides of border (`+ 2` instead of `+ 4`)" error.',
    },
    mr: {
      q: 'कुंपण, बागेभोवतीचा रस्ता किंवा रेल्वे अंतर यांवरील उदाहरणांपूर्वी "आधी छोटी कच्ची आकृती काढा!" ही सवय लावल्याने चुका झपाट्याने कमी का होतात?',
      opts: [
        'कच्च्या आकृतीमुळे बाहेरील `२ मी` रुंद रस्ता लांबी व रुंदीत दोन्ही बाजूंनी मिळून `४ मी` (`२+२`) भर टाकतो हे तात्काळ डोळ्यांना दिसते',
        'चित्रकलेच्या रंगछटांना निम्मे गुण मिळतात',
        'आकृती काढल्याने दशांश गुणाकाराची गरज उरत नाही',
        'चित्रामुळे अवकाशीय जाण मंदावते',
      ],
      exp: 'कच्च्या आकृतीमुळे अंतर्गत व बाह्य सीमांची नेमकी लांबी कळते व निम्मी बाजू विसरण्याची चूक टळते.',
    },
    hi: {
      q: 'बाड़, बाग के बाहर रास्ता या दूरी-सवालों से पहले "पहले छोटा रफ चित्र बनाओ!" की आदत डालने से लापरवाही की गलतियाँ क्यों घटती हैं?',
      opts: [
        'कच्चे स्केच में तुरंत दिख जाता है कि बाहर `2 मी` चौड़ा रास्ता दोनों ओर जुड़कर लंबाई और चौड़ाई दोनों में `4 मी` (`2+2`) बढ़ाता है',
        'रंग भरने से आधे अंक मिलते हैं',
        'स्केच दशमलव गुणा की जगह ले लेता है',
        'चित्र बनाने से स्थानिक समझ धीमी होती है',
      ],
      exp: 'त्वरित स्केचिंग आंतरिक बनाम बाहरी सीमा की दुगुनी वृद्धि को दृश्य बनाकर क्लासिक बॉर्डर त्रुटि को रोकती है।',
    },
  },
  {
    topic: 'Authentic School Mid-Day Meal & Attendance Math Logs',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Using real anonymized school data—computing daily attendance %, weekly kg of rice/dal scaled at `100 g/pupil` for the Mid-Day Meal, and seasonal absences—connects Class 5 math cleanly to:',
      opts: [
        'Civic school stewardship, unitary scaling, and practical averages rooted in pupils’ own daily school environment',
        'Memorizing unrelated foreign currency charts',
        'Administrative paperwork done by pupils instead of staff',
        'Pure memorization of 20-digit divisions',
      ],
      exp: 'Real school kitchen scaling (`g -> kg`) gives authentic purpose to metric conversions and percentage calculation.',
    },
    mr: {
      q: 'शाळेतील रोजची पटसंख्या-उपस्थिती टक्केवारी आणि शालेय पोषण आहारासाठी `१०० ग्रॅम/विद्यार्थी` दराने लागणारे साप्ताहिक धान्य (`ग्रॅम -> किग्रॅ`) काढायला सांगणे इ. ५ वीच्या गणिताला कशाशी जोडते?',
      opts: [
        'स्वतःच्याच दैनंदिन शाळेतील एकक पद्धत, दशांश रूपांतरण व टक्केवारीच्या व्यावहारिक उपयोगाशी',
        'असंबंधित परदेशी चलन तक्त्यांच्या पाठांतराशी',
        'मुलांकडून कार्यालयाचे काम करून घेण्याशी',
        'केवळ २०-अंकी भागाकाराशी',
      ],
      exp: 'शाळेतील प्रत्यक्ष दैनंदिन आकडेवारी गणिताला मुलांच्या स्वतःच्या जीवनाचा सार्थक भाग बनवते.',
    },
    hi: {
      q: 'कक्षा 5 में दैनिक उपस्थिति प्रतिशत और मध्याह्न भोजन हेतु `100 ग्रा/छात्र` के हिसाब से साप्ताहिक राशन (`ग्रा -> किग्रा`) निकालना गणित को किससे जोड़ता है?',
      opts: [
        'अपने ही विद्यालय-परिवेश में ऐकिक अनुपात, मीट्रिक रूपांतरण और प्रतिशत के वास्तविक व्यावहारिक उपयोग से',
        'असंबद्ध विदेशी मुद्रा रटने से',
        'कर्मचारियों के बजाय बच्चों से दफ्तर का काम कराने से',
        'केवल 20-अंकीय भाग से',
      ],
      exp: 'विद्यालय के वास्तविक आँकड़े दशमलव रूपांतरण व प्रतिशत गणना को जीवंत और उद्देश्यपूर्ण बनाते हैं।',
    },
  },
  {
    topic: 'Cooperative Math Strategy Relay Over Individual Speed Race',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'In a cooperative "4-Role Math Relay" where Pupil 1 draws a model, Pupil 2 estimates bounds, Pupil 3 computes, and Pupil 4 checks reasonableness in context, what pedagogical shift occurs compared to individual silent races?',
      opts: [
        'Every team member holds a vital metacognitive role, strengthening planning, estimation, and error-checking alongside peer interdependence',
        'Only Pupil 3 practices any arithmetic at all',
        'Pupils conceal methods secretly from teammates',
        'Teams finish without ever checking reasonableness',
      ],
      exp: 'Structured cooperative roles weave estimation and verification into teamwork instead of leaving slower writers behind.',
    },
    mr: {
      q: 'सहकारी "४-भूमिका गणित रिले" मध्ये पहिला आकृती काढतो, दुसरा अंदाज बांधतो, तिसरा आकडेमोड करतो व चौथा उत्तराची व्यवहार्यता तपासतो; वैयक्तिक वेग-शर्यतीपेक्षा यात कोणता मोठा शैक्षणिक बदल घडतो?',
      opts: [
        'प्रत्येक मुलाकडे महत्त्वाची विचार-भूमिका येते आणि नियोजन, अंदाज व पडताळणी यांचा सामूहिक समन्वय साधला जातो',
        'फक्त तिसराच विद्यार्थी गणित शिकतो',
        'मुले पद्धती लपवून ठेवतात',
        'उत्तराची तपासणी न करता गट थांबतो',
      ],
      exp: 'स्पष्ट जबाबदाऱ्यांच्या सहकारी गटात प्रत्येक स्तरावरील विद्यार्थ्याला अर्थपूर्ण योगदान देता येते.',
    },
    hi: {
      q: 'सहयोगी "4-भूमिका गणित रिले" में पहला बच्चा चित्र बनाता है, दूसरा अनुमान लगाता है, तीसरा गणना करता है व चौथा औचित्य जाँचता है; व्यक्तिगत रफ्तार-दौड़ से यह कैसे बेहतर है?',
      opts: [
        'हर साथी के पास महत्वपूर्ण अधिसंज्ञानात्मक भूमिका होती है जिससे योजना, अनुमान और जाँच की साझा संस्कृति बनती है',
        'केवल तीसरा छात्र ही गणित करता है',
        'साथी एक-दूसरे से विधि छुपाते हैं',
        'बिना जाँचे टीम रुक जाती है',
      ],
      exp: 'भूमिका-बँटवारे वाले सहकारी कार्य में गणना के साथ-साथ योजना, अनुमान और स्व-जाँच बराबर महत्व पाते हैं।',
    },
  },
  {
    topic: 'Reflective Math Journal Prompts for Metacognition',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Having Class 4–5 learners write two sentences each Friday in a Math Journal—"One mistake that taught me a trick this week..." or "Why `1/3 > 1/5` even though `3 < 5`..."—cultivates:',
      opts: [
        'Metacognitive self-awareness, clearer mathematical writing, and deep conceptual retention through putting reasoning into their own words',
        'Pure poetry recitation detached from numbers',
        'Elimination of practice problems forever',
        'Identical copied paragraph templates',
      ],
      exp: 'Explaining concepts in one’s own words ("Writing to Learn Math") cements deep structure and surfaces lingering doubts for teachers.',
    },
    mr: {
      q: 'दर शुक्रवारी मुलांनी "गणित डायरीत" दोन वाक्ये लिहिणे—"या आठवड्यात मला कोणत्या चुकीतून काय नवीन कळले?" किंवा "`३ < ५` असूनही `१/३ > १/५` का?"—यामुळे काय विकसित होते?',
      opts: [
        'अधिसंज्ञानात्मक स्व-जाणीव (Metacognition), गणितीय लेखन स्पष्टता आणि स्वतःच्या शब्दांत मांडल्याने होणारी खोल धारणा',
        'अंकांपासून दूर केवळ कविता वाचन',
        'सरावाची उदाहरणे कायमची बंद होणे',
        'एकसारखे पाठ केलेले परिच्छेद',
      ],
      exp: 'स्वतःच्या शब्दांत तर्क लिहिण्याच्या सवयीमुळे संकल्पना कायमच्या पक्क्या होतात व शिक्षकांनाही विद्यार्थ्यांची विचारप्रक्रिया कळते.',
    },
    hi: {
      q: 'हर शुक्रवार कक्षा 4–5 के छात्रों द्वारा "गणित डायरी" में दो वाक्य लिखना—"इस सप्ताह किस गलती ने मुझे नया सबक दिया" या "`3 < 5` होने पर भी `1/3 > 1/5` क्यों?"—क्या विकसित करता है?',
      opts: [
        'अधिसंज्ञानात्मक स्व-जागरूकता, गणितीय लेखन स्पष्टता और अपने शब्दों में तर्क गढ़ने से स्थायी अवधारणात्मक समझ',
        'संख्याओं से दूर मात्र कविता पाठ',
        'अभ्यास प्रश्नों का पूर्ण अंत',
        'एक जैसे रटे अनुच्छेद',
      ],
      exp: 'गणित को अपने शब्दों में लिखने से विचार स्पष्ट होते हैं और शिक्षक को भी छिपे संदेह पता चलते हैं।',
    },
  },
];
