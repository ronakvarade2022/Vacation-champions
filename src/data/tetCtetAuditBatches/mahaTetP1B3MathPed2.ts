import { CuratedTrilingualMcq } from './types';

// Batch 3 Primary Mathematics Pedagogy Part 2 (28 verified trilingual MCQs)
export const MAHA_TET_P1_B3_MATH_PED2: CuratedTrilingualMcq[] = [
  {
    topic: 'Place Value – Ten-Frame Anchoring Around 10',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Why is the "Ten-Frame" (a 2×5 grid) superior to unstructured piles of pebbles for teaching early addition like `8 + 5` in Class 1–2?',
      opts: [
        'It makes the "make-a-ten" bridge visual: moving 2 counters from 5 to fill the 8-frame leaves 10 + 3 = 13 immediately obvious',
        'It eliminates the number zero permanently',
        'It prevents pupils from recognizing 5 as half of 10',
        'It requires expensive electronic sensors in every bench',
      ],
      exp: 'Ten-frames exploit base-10 visual structure so children decompose `5` into `2 + 3` fluently instead of counting fingers one-by-one.',
    },
    mr: {
      q: 'इ. १ ली–२ रीत `८ + ५` सारख्या बेरजा शिकवण्यासाठी सुट्या खड्यांच्या ढिगापेक्षा २×५ ची "दहाची चौकट (Ten-Frame)" अधिक श्रेष्ठ का ठरते?',
      opts: [
        'दहा पूर्ण करण्याचा सेतू डोळ्यांना दिसतो: ५ मधले २ मणी ८ मध्ये भरल्यावर पूर्ण १० आणि बाहेरचे ३ = १३ हे चटकन कळते',
        'त्यामुळे शून्य हा अंक कायमचा निघून जातो',
        '५ हे १० चे निम्मे आहेत हे कळणे बंद होते',
        'त्यासाठी प्रत्येक बाकावर महागडे इलेक्ट्रॉनिक यंत्र लागते',
      ],
      exp: 'दहाच्या चौकटीमुळे दशकपूर्ण करून बेरीज करण्याची मानसिक युक्ती सहज दृष्टीला पडते आणि बोटे मोजण्याची गरज कमी होते.',
    },
    hi: {
      q: 'कक्षा 1–2 में `8 + 5` जैसे जोड़ सिखाने के लिए बिखरे कंकड़ों के ढेर से 2×5 का "टेन-फ्रेम (Ten-Frame)" अधिक श्रेष्ठ क्यों है?',
      opts: [
        'यह "दस बनाओ" सेतु को दृश्य बनाता है: 5 से 2 गोटियाँ 8 वाले फ्रेम में भरते ही 10 + 3 = 13 तुरंत दिख जाता है',
        'यह शून्य अंक को स्थायी रूप से हटा देता है',
        'यह 5 को 10 का आधा देखने से रोकता है',
        'इसके लिए हर डेस्क पर महँगा इलेक्ट्रॉनिक सेंसर चाहिए',
      ],
      exp: 'टेन-फ्रेम आधार-10 की संरचना उजागर करता है जिससे बच्चे उँगलियाँ गिनने की बजाय `8+2+3 = 13` जैसा मानसिक विभाजन सीखते हैं।',
    },
  },
  {
    topic: 'Diagnostic Error – Fraction Addition Denominator Sum',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Seeing a Class 5 pupil write `1/2 + 1/3 = 2/5` ("added numerators AND added denominators!"), how can a teacher instantly trigger self-correction using reasonableness logic?',
      opts: [
        'Ask gently: "Wait—you started with 1/2 (half a roti) and ADDED more (1/3), yet 2/5 is even LESS than half a roti! Can adding two positive pieces shrink your share?"',
        'Drill "Cross-multiply diagonally!" fifty times with zero meaning',
        'Mark "Wrong" and move straight to percentages',
        'Praise `2/5` as an acceptable alternative answer',
      ],
      exp: 'Benchmarking against `1/2` proves `2/5 < 1/2` is absurd visually, motivating common-sized equal pieces (`3/6 + 2/6 = 5/6`).',
    },
    mr: {
      q: 'इ. ५ वीतील मूल `१/२ + १/३ = २/५` असे लिहिते तेव्हा अर्थाच्या आधारे तात्काळ स्व-सुधारणा घडवून आणणारा शिक्षकाचा प्रश्न कोणता?',
      opts: [
        '"अरे वा—तुझ्याकडे आधी अर्धी भाकरी (१/२) होती, त्यात आणखी १/३ भाकरी मिळवली, मग उत्तर २/५ म्हणजे अर्ध्यापेक्षाही कमी कसे आले?"',
        '"तिरकस गुणाकार कर!" असे ५० वेळा म्हणायला लावणे',
        'काही न बोलता "चूक" लिहून टक्केवारीकडे वळणे',
        '२/५ हे पर्यायी उत्तर म्हणून मान्य करणे',
      ],
      exp: '१/२ शी तुलना करून दाखवल्यास मुले स्वतः चूक ओळखतात आणि समान आकाराचे तुकडे (समच्छेद ६) का करावे लागतात हे समजू शकतात.',
    },
    hi: {
      q: 'कक्षा 5 के छात्र को `1/2 + 1/3 = 2/5` लिखते देख, तर्क-आधारित स्व-सुधार जगाने वाला सबसे सटीक शिक्षक प्रश्न कौन-सा होगा?',
      opts: [
        '"ज़रा सोचो—तुम्हारे पास आधी रोटी (1/2) थी और उसमें 1/3 और जोड़ा, तो उत्तर 2/5 यानी आधी से भी कम कैसे आ सकता है?"',
        '"तिरछा गुणा करो!" पचास बार रटवाना',
        'बिना बात किए क्रॉस लगाकर प्रतिशत पढ़ाने बढ़ जाना',
        '2/5 को वैकल्पिक सही उत्तर मान लेना',
      ],
      exp: '1/2 जैसे संदर्भ मानक से तुलना कराते ही छात्र स्वयं असंभवता पहचान लेते हैं और समान हर (एक जैसे टुकड़े) की ज़रूरत समझते हैं।',
    },
  },
  {
    topic: 'Bar Graph Y-Axis Scale Reading Care',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Two printed bar graphs display identical student library counts, yet Bar Graph A uses scale `1 unit = 10 books` (tall bars) and Bar Graph B uses `1 unit = 50 books` (short bars). Training Class 5 learners to inspect the Y-axis scale FIRST prevents:',
      opts: [
        'Visual deception — misjudging quantity purely by raw bar height without reading numerical axis units',
        'Adding colors nicely to paper charts',
        'Forgetting how to draw horizontal X-axis labels',
        'Computing mode and median accurately',
      ],
      exp: 'Critical data literacy teaches learners that identical data look tall or tiny solely by changing vertical scale intervals.',
    },
    mr: {
      q: 'एकाच वाचनालयाच्या पुस्तकांचा आलेख अ मध्ये `१ सेमी = १० पुस्तके` (उंच स्तंभ) व ब मध्ये `१ सेमी = ५० पुस्तके` (ठेंगणे स्तंभ) असा दाखवला आहे. इ. ५ वीच्या मुलांना प्रथम प्रमाण (Scale) वाचायला शिकवल्याने कोणता धोका टळतो?',
      opts: [
        'केवळ स्तंभांची उंची पाहून आकडे न वाचता होणारी दृश्य फसवणूक (Visual deception) टळते',
        'तक्त्यात रंग भरण्याचे कौशल्य कमी होते',
        'आडव्या अक्षाची नावे लिहिणे विसरले जाते',
        'बहुलक व मध्यक अचूक निघणे बंद होते',
      ],
      exp: 'स्तंभालेख वाचताना प्रमाणपट्टी (Scale) तपासण्याची सवय आकड्यांच्या चुकीच्या तुलनेपासून व माहितीतील फसवणुकीपासून वाचवते.',
    },
    hi: {
      q: 'एक ही डेटा को दंड आलेख A में `1 इकाई = 10 पुस्तकें` (ऊँचे स्तंभ) और आलेख B में `1 इकाई = 50 पुस्तकें` (छोटे स्तंभ) से दिखाया गया है। पहले अक्ष-पैमाना पढ़ने की आदत किस खतरे से बचाती है?',
      opts: [
        'केवल स्तंभ की ऊँचाई देखकर पैमाने के बिना मात्रा का गलत अंदाज़ा लगाने (दृश्य भ्रम) से बचाती है',
        'चार्ट में रंग भरने की रुचि घटती है',
        'क्षैतिज X-अक्ष के नाम भूल जाते हैं',
        'बहुलक निकालने में बाधा आती है',
      ],
      exp: 'डेटा साक्षरता के लिए हमेशा ग्राफ की ऊँचाई से पहले अक्ष-पैमाने (Scale) और प्रारंभिक बिंदु की जाँच आवश्यक होती है।',
    },
  },
  {
    topic: 'Perimeter-Area Concrete Exploration on Grid Paper',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'When introducing Area in Class 4, letting pupils tile leaves and notebook covers directly with 1 cm × 1 cm transparent grid squares BEFORE presenting `Area = l × b` establishes what core concept?',
      opts: [
        'Area measures total flat surface coverage in identical non-overlapping square units, whereas `l × b` is simply a fast array shortcut for counting them',
        'Only rectangles with whole-number metres possess area',
        'Perimeter and area share identical linear centimetre units',
        'Triangles and irregular leaves have zero area',
      ],
      exp: 'Counting unit-square rows turns `l × b` into an obvious rectangular array generalization rather than an arbitrary formula.',
    },
    mr: {
      q: '`क्षेत्रफळ = लांबी × रुंदी` हे सूत्र सांगण्यापूर्वी इ. ४ थीच्या मुलांना पानांवर व वह्यांवर १ सेमी × १ सेमी च्या पारदर्शक चौरस जाळीने पृष्ठभाग झाकून मोजायला सांगण्याचा मुख्य हेतू कोणता?',
      opts: [
        'क्षेत्रफळ म्हणजे सपाट पृष्ठभाग एकसारख्या चौरस एककांनी किती व्यापला हे मोजणे, आणि `लांबी × रुंदी` ही केवळ चौरस मोजण्याची जलद युक्ती असल्याचे समजणे',
        'फक्त पूर्णांक मीटरच्या आयतांनाच क्षेत्रफळ असते',
        'परिमिती व क्षेत्रफळ दोन्हींचे एकक साधे सेंटीमीटरच असते',
        'त्रिकोण व पानांना क्षेत्रफळच नसते',
      ],
      exp: 'प्रत्यक्ष चौरस एककांनी झाकून मोजल्यामुळे क्षेत्रफळाचा अर्थ व "चौरस एकक" का लिहितात हे सहज कळते.',
    },
    hi: {
      q: '`क्षेत्रफल = लंबाई × चौड़ाई` सूत्र बताने से पहले कक्षा 4 में पत्तियों और कॉपियों पर 1 सेमी × 1 सेमी ग्रिड रखकर वर्ग गिनवाने से कौन-सी मूल अवधारणा स्पष्ट होती है?',
      opts: [
        'क्षेत्रफल सतह के कुल फैलाव को समान वर्ग इकाइयों में मापना है, और `l × b` केवल उन वर्गों को तेज़ी से गिनने का गुणन रूप है',
        'केवल पूर्णांक लंबाई वाले आयतों का ही क्षेत्रफल होता है',
        'परिमाप और क्षेत्रफल दोनों की इकाई एक ही होती है',
        'अनियमित पत्तियों का क्षेत्रफल शून्य होता है',
      ],
      exp: 'इकाई वर्गों से ढककर गिनना यह स्थापित करता है कि क्षेत्रफल सतह माप है और वर्ग इकाई में क्यों व्यक्त होता है।',
    },
  },
  {
    topic: 'Classroom Market Roleplay for Money & Regrouping',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Running a bustling "Class 3 Grocery Counter" with real empty spice packets, price tags (₹12, ₹25, ₹8), and cardboard coins/notes helps learners internalize:',
      opts: [
        'Combined addition-multiplication bills, making change accurately via counting-up, and decimal rupee-paise sense in lively social context',
        'Solely blind copying from arithmetic tables',
        'Consumer brand advertising preferences',
        'Memorizing international exchange rates silently',
      ],
      exp: 'Roleplay market stalls ground arithmetic procedures in authentic purchasing decisions and peer accountability.',
    },
    mr: {
      q: 'रिकामी पाकिटे, किमतीच्या चिठ्ठ्या (₹१२, ₹२५, ₹८) व पुठ्ठ्याच्या नोटा वापरून वर्गात "इ. ३ रीचे दुकान" भरवल्याने विद्यार्थ्यांत कोणती गणितीय कौशल्ये नैसर्गिकरीत्या रुजतात?',
      opts: [
        'बेरीज-गुणाकाराचे एकत्रित बिल तयार करणे, सुटे पैसे मोजून देणे आणि रुपया-पैसे व्यवहाराची व्यावहारिक समज',
        'केवळ पाढ्यांची यांत्रिक नक्कल',
        'जाहिरात ब्रँड लक्षात ठेवणे',
        'आंतरराष्ट्रीय चलन दर पाठ करणे',
      ],
      exp: 'वर्गातील आनंददायी बाजारामुळे नाणी-नोटा, हिशेब व सुटे पैसे देण्याचे व्यावहारिक गणित जिवंत अनुभवातून पक्के होते.',
    },
    hi: {
      q: 'असली खाली पैकेट, मूल्य-टैग (₹12, ₹25, ₹8) और गत्ते के सिक्के-नोटों से "कक्षा 3 की किराना दुकान" सजाने से छात्र सहज क्या आत्मसात करते हैं?',
      opts: [
        'जोड़-गुणा वाले बिल बनाना, गिनकर सही छुट्टे पैसे लौटाना और जीवंत सामाजिक संदर्भ में रुपया-पैसा बोध',
        'केवल पहाड़ों की यांत्रिक नकल',
        'ब्रांड विज्ञापन याद रखना',
        'अंतर्राष्ट्रीय विनिमय दर रटना',
      ],
      exp: 'कक्षा-दुकान नाटक मुद्रा गणना, बिल जोड़ने और खुले पैसे लौटाने के कौशलों को वास्तविक जीवन से जोड़ता है।',
    },
  },
  {
    topic: 'Mathematics Lab Corner – Low-Cost Teacher-Made TLMs',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'What makes locally crafted materials—broomstick angles joined by cycle-valve rubber, bottle-cap counters, and knotted string—often MORE effective in a primary Math Corner than locked glass-case plastic kits?',
      opts: [
        'Pupils can freely handle, bend, break/rebuild, and replicate them cheaply at home without fear of damaging pricey apparatus',
        'Plastic factory kits violate arithmetic rules mathematically',
        'Broomsticks never require measurement alignment',
        'Glass-case display items teach geometry just by staring from afar',
      ],
      exp: 'Low-cost, repairable TLMs invite universal tactile inquiry at school and home alike ("Zero-fear hands-on ownership").',
    },
    mr: {
      q: 'काचेच्या कपाटात कुलुपबंद ठेवलेल्या महागड्या प्लास्टिक साहित्यापेक्षा सायकलच्या व्हॉल्व्ह-ट्यूब व झाडूच्या काड्यांपासून बनवलेले कोन, बाटली टोपणे व गाठींची दोरी अधिक प्रभावी का ठरते?',
      opts: [
        'महागडे साहित्य तुटेल या भीतीविना प्रत्येक मूल ते मनसोक्त हाताळू शकते, बदलू शकते व घरीही सहज तयार करू शकते',
        'प्लास्टिक साहित्यात गणिताचे नियम बदलतात',
        'काड्यांना कधीच मापाची गरज नसते',
        'कपाटाबाहेरून फक्त पाहिल्याने भूमिती आपोआप येते',
      ],
      exp: 'कमी खर्चाचे स्थानिक शैक्षणिक साहित्य सर्व विद्यार्थ्यांच्या हातात निर्भयपणे खेळायला व प्रयोग करायला उपलब्ध राहते.',
    },
    hi: {
      q: 'अलमारी में बंद महँगे प्लास्टिक किट की बजाय साइकिल वाल्व-ट्यूब व सींकों से बने कोण, बोतल के ढक्कन और गाँठ वाली रस्सी प्राथमिक गणित कोने में अधिक प्रभावी क्यों हैं?',
      opts: [
        'टूटने के डर के बिना हर बच्चा इन्हें खुलकर छू, मोड़ व बना सकता है और घर पर भी सस्ते में दोहरा सकता है',
        'प्लास्टिक किट गणित के नियम बदल देते हैं',
        'सींकों में मापन की आवश्यकता नहीं होती',
        'बंद काँच के बाहर से देखने भर से ज्यामिति आ जाती है',
      ],
      exp: 'सस्ती व स्थानीय स्तर पर बनी सामग्री बिना किसी भय के हर बच्चे के हाथ में प्रत्यक्ष प्रयोग और रचनात्मकता लाती है।',
    },
  },
  {
    topic: 'Handling Multiple Valid Solution Paths With Respect',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'When finding the perimeter of a 9 cm × 5 cm rectangle, Pupil A adds `9 + 5 + 9 + 5 = 28`, Pupil B computes `2×9 + 2×5 = 28`, and Pupil C computes `2 × (9 + 5) = 28`. How should the teacher respond?',
      opts: [
        'Celebrate all three valid paths, guide the class to notice why they are algebraically equivalent, and highlight how C saves steps cleanly',
        'Cross out A and B because only formula `2(l+b)` earns marks in textbooks',
        'Force Pupil A to erase and memorize C blindly without seeing the connection',
        'Claim `9+5+9+5` is technically wrong geometry',
      ],
      exp: 'Bridging intuitive additive perimeter (`9+5+9+5`) toward factored `2(l+b)` preserves meaning while nurturing elegance.',
    },
    mr: {
      q: '९ सेमी × ५ सेमी आयताची परिमिती काढताना मुलगा अ `९+५+९+५=२८`, ब `२×९ + २×५=२८` आणि क `२×(९+५)=२८` काढतो; शिक्षकाचा आदर्श प्रतिसाद कोणता?',
      opts: [
        'तीनही बरोबर पद्धतींचा सन्मान करून त्यांतला तार्किक संबंध दाखवणे आणि क ची पद्धत पायऱ्या कशा वाचवते ते स्पष्ट करणे',
        'पाठ्यपुस्तकातील सूत्र नाही म्हणून अ व ब चे गुण कापणे',
        'संबंध न समजावता अ ला पुसून क पाठ करायला लावणे',
        '९+५+९+५ ही भूमितीय चूक असल्याचे सांगणे',
      ],
      exp: 'सोप्या बेरजेपासून सूत्राकडे जाणारा प्रवास पाहिल्यामुळे सर्व विद्यार्थी सूत्राचा खरा अर्थ समजून घेतात.',
    },
    hi: {
      q: '9 सेमी × 5 सेमी आयत का परिमाप निकालने में छात्र A `9+5+9+5=28`, छात्र B `2×9 + 2×5=28` और छात्र C `2×(9+5)=28` करता है; शिक्षक की श्रेष्ठ प्रतिक्रिया क्या होगी?',
      opts: [
        'तीनों सही विधियों की सराहना कर उनके बीच का तार्किक संबंध जोड़ना और दिखाना कि C की विधि समय कैसे बचाती है',
        'केवल सूत्र `2(l+b)` मान्य मानकर A और B को गलत काटना',
        'बिना संबंध समझाए A को रटने को मजबूर करना',
        '`9+5+9+5` को ज्यामितीय रूप से गलत बताना',
      ],
      exp: 'सहज योग-विधि से संक्षिप्त सूत्र तक सेतु बनाने से सूत्र रटंत की बजाय समतुल्यता की स्पष्ट समझ के रूप में स्थापित होता है।',
    },
  },
  {
    topic: 'Equivalence Sign (=) Misconception ("Makes Answer")',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Many Class 4 students stare baffled at `9 + 5 = ___ + 6` and write `14` in the blank (`14 + 6 = 20`?!) because they misread the `=` sign as:',
      opts: [
        'An action button meaning "put the calculation answer RIGHT NOW" instead of a relational balance sign ("left side equals right side")',
        'A subtraction shortcut symbol',
        'An inequality indicator ("greater than")',
        'A decorative punctuation mark',
      ],
      exp: 'Using two-pan balance scales and true/false equations like `14 = 9 + 5` builds the relational meaning of `=` critical for future algebra.',
    },
    mr: {
      q: 'इ. ४ थीची अनेक मुले `९ + ५ = ___ + ६` या रिकाम्या जागी चुकून `१४` लिहितात, कारण त्यांना `=` या चिन्हाचा नेमका कोणता चुकीचा अर्थ वाटत असतो?',
      opts: [
        '"दोन्ही बाजू समान आहेत" या समतोल संबंधाऐवजी "डाव्या बाजूचे उत्तर इथे लिहा!" अशी कृतीची खूण समजणे',
        'वजाबाकीचे चिन्ह समजणे',
        '"पेक्षा मोठे" दर्शवणारे चिन्ह समजणे',
        'केवळ सजावटीचे विरामचिन्ह समजणे',
      ],
      exp: 'तराजूची उपमा व `१४ = ९ + ५` अशी दोन्ही बाजूंची समीकरणे दिल्याने `=` म्हणजे समतोल संबंध असल्याचे पक्के होते.',
    },
    hi: {
      q: 'कक्षा 4 के कई छात्र `9 + 5 = ___ + 6` में खाली स्थान पर `14` भर देते हैं क्योंकि वे `=` चिह्न को गलत रूप से क्या मान बैठते हैं?',
      opts: [
        'दोनों पक्षों के बीच संतुलन संबंध के बजाय "तुरंत आगे उत्तर लिखो" वाला क्रिया-बटन मान लेना',
        'घटाव का संक्षिप्त चिह्न समझना',
        '"से बड़ा" का प्रतीक मानना',
        'सजावटी विराम चिह्न समझना',
      ],
      exp: 'तराजू के दोनों पलड़ों और `14 = 9 + 5` जैसे संतुलन अभ्यास से `=` का संबंधात्मक अर्थ मजबूत होता है जो आगे बीजगणित की नींव है।',
    },
  },
  {
    topic: 'Diagnostic Error – Remainder Ignored in Context',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Solve: "65 school campers travel in mini-vans holding at most 8 pupils each. How many mini-vans are needed so EVERY camper gets a seat?" Answering `8 remainder 1` -> `8 vans` misses what crucial step of contextual modeling?',
      opts: [
        'Interpreting the remainder within real-life constraints—that 1 leftover pupil still requires a 9th mini-van',
        'Rounding 65 down to 60 before dividing',
        'Writing the remainder as decimal `.125` of a van',
        'Dropping remainders completely in all word problems',
      ],
      exp: 'Contextual rounding up (vans) vs rounding down (maximum bouquets tied) teaches learners to interpret division remainders thoughtfully.',
    },
    mr: {
      q: '"६५ विद्यार्थी प्रत्येकी कमाल ८ जण बसणाऱ्या मिनी-व्हॅनने सहलीला जात आहेत; सर्व विद्यार्थ्यांना बसायला किमान किती व्हॅन लागतील?" येथे `६५ ÷ ८ = ८ बाकी १` काढूनही `८ व्हॅन` उत्तर देणारा विद्यार्थी काय विसरतो?',
      opts: [
        'प्रत्यक्ष परिस्थितीत बाकीचा अर्थ लावणे — उरलेल्या त्या १ विद्यार्थ्यासाठीही ९ वी व्हॅन आवश्यक आहे हे ओळखणे',
        '६५ ला ६० करून भागणे',
        'उत्तर ८.१२५ व्हॅन लिहिणे',
        'शाब्दिक उदाहरणांत बाकीकडे नेहमी दुर्लक्ष करणे',
      ],
      exp: 'संदर्भानुसार बाकीसाठी अतिरिक्त गाडी घ्यावी (Round up) की अपूर्ण वस्तू सोडावी हे ओळखणे व्यावहारिक गणितीय विचारशक्तीची कसोटी आहे.',
    },
    hi: {
      q: '"65 छात्र अधिक-से-अधिक 8 सीटों वाली वैन से जा रहे हैं; सभी के बैठने हेतु कितनी वैन चाहिए?" `65 ÷ 8 = 8 शेष 1` के बावजूद `8 वैन` लिखने वाला छात्र किस वास्तविक कदम को चूक जाता है?',
      opts: [
        'संदर्भ के अनुसार शेषफल की व्याख्या करना—कि बचे हुए 1 छात्र को भी बैठाने हेतु 9वीं वैन लगेगी',
        '65 को 60 मानकर भाग देना',
        '8.125 वैन उत्तर लिखना',
        'इबारती सवालों में शेष को हमेशा छोड़ देना',
      ],
      exp: 'वास्तविक जीवन में भाग के शेषफल को संदर्भ के अनुसार समझना (कब बढ़ाना और कब छोड़ना) सार्थक गणितीय मॉडलिंग है।',
    },
  },
  {
    topic: 'Word-to-Numeral Place Value Listening Check',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'When dictating "Twelve thousand and fifteen" orally, two Class 4 learners write `12,15` or `1,20,015`. Which diagnostic follow-up strengthens multi-digit listening?',
      opts: [
        'Drawing period houses ("Lakhs | Thousands | Units") so pupils verify the Units house ALWAYS fills three places (`015`), giving `12,015`',
        'Repeating the exact dictation louder three times',
        'Moving directly to 9-digit numbers',
        'Dropping zero placeholders from textbooks',
      ],
      exp: 'Period-house mats train learners to allocate exact digits inside each comma period (`12` in Thousands, `015` in Units).',
    },
    mr: {
      q: 'तोंडी "बारा हजार पंधरा" सांगितल्यावर मुले `१२,१५` किंवा `१,२०,०१५` लिहितात; ही चूक कायमची सुधारण्यासाठी कोणता उपाय प्रभावी ठरतो?',
      opts: [
        '"लाख | हजार | एकक" अशी घरे काढून एककाच्या घरात नेहमी तीनच अंक (`०१५`) भरावे लागतात हे दाखवणे -> `१२,०१५`',
        'तेच शब्द तीन वेळा मोठ्या आवाजात पुन्हा ओरडून सांगणे',
        'थेट ९-अंकी संख्या शिकवणे',
        'पुस्तकातून शून्य काढून टाकणे',
      ],
      exp: 'अल्पविराम-घरांच्या (Period houses) मांडणीमुळे शेवटच्या गटात तीन अंक पूर्ण करण्यासाठी लागणारे शून्य आपोआप स्पष्ट होतात.',
    },
    hi: {
      q: '"बारह हज़ार पंद्रह" बोलने पर कुछ छात्र `12,15` या `1,20,015` लिख देते हैं; इस श्रुतलेख त्रुटि को सुधारने का श्रेष्ठ उपाय क्या है?',
      opts: [
        '"लाख | हज़ार | इकाई" आवर्त-घर बनवाकर दिखाना कि इकाई के घर में हमेशा तीन स्थान (`015`) होते हैं, जिससे `12,015` बनेगा',
        'तीन बार और ज़ोर से बोलकर दोहराना',
        'सीधे 9-अंकीय संख्याएँ सिखाना',
        'किताबों से शून्य स्थान-धारक हटा देना',
      ],
      exp: 'आवर्त-घर (Period boxes) बनाने से छात्र हर अल्पविराम खंड के निश्चित स्थान (इकाई खंड में 3 अंक) भरना सीखते हैं।',
    },
  },
  {
    topic: 'Remedial Math Scaffolding Without Public Stigma',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'After a Class 4 fractions checkup, six students still struggle with unit fraction comparison while twenty-four are ready for mixed addition. How does a compassionate teacher organize differentiated support?',
      opts: [
        'Run a quiet 15-minute small guided table with fraction circles for those 6 while the rest tackle engaging enrichment task-cards in pairs',
        'Announce loudly: "The 6 weak students stay at the front corner of shame!"',
        'Hold back all 30 students repeating the identical lesson for two extra weeks',
        'Ignore the 6 struggling pupils so averages look faster',
      ],
      exp: 'Station rotation pairs dignified small-group reteaching with purposeful peer challenges for everyone.',
    },
    mr: {
      q: 'अपूर्णांक तपासणीनंतर ६ विद्यार्थ्यांना अजून मूळ संकल्पनेत अडचण दिसते, तर २४ जण पुढच्या पायरीसाठी सज्ज आहेत; संवेदनशील शिक्षक वर्गव्यवस्था कशी करतील?',
      opts: [
        'इतर मुले जोडीने आव्हानात्मक उपक्रम-कार्ड सोडवत असताना या ६ जणांसोबत शांतपणे १५ मिनिटांच्या लहान गटात अपूर्णांक वर्तुळांनी मार्गदर्शन करणे',
        '"६ कमजोर विद्यार्थी समोरच्या कोपऱ्यात बसा" असे जाहीर करणे',
        'संपूर्ण ३० जणांना दोन आठवडे तेच ते पुन्हा शिकवत थांबणे',
        '६ विद्यार्थ्यांकडे दुर्लक्ष करून पुढे निघून जाणे',
      ],
      exp: 'अपमानजनक लेबलिंग न करता लहान गटातील नेमकी मदत व इतरांसाठी समृद्धी कार्य हा समावेशक उपचारात्मक अध्यापनाचा गाभा आहे.',
    },
    hi: {
      q: 'भिन्न जाँच के बाद 6 छात्र अभी इकाई-भिन्न तुलना में अटक रहे हैं जबकि 24 आगे के अभ्यास को तैयार हैं; संवेदनशील शिक्षक विभेदित सहायता कैसे देंगे?',
      opts: [
        'बाकी जोड़ी में रोचक संवर्धन कार्ड हल करते समय उन 6 के साथ 15 मिनट का शांत छोटा समूह बनाकर भिन्न-वृत्त से मार्गदर्शन करना',
        'ज़ोर से घोषणा करना: "ये 6 कमज़ोर बच्चे शर्म के कोने में आएँ!"',
        'पूरी कक्षा को दो सप्ताह वहीं रोके रखना',
        'उन 6 की अनदेखी कर पाठ्यक्रम भगाना',
      ],
      exp: 'बिना सार्वजनिक हीनभावना के छोटे समूह में केंद्रित मार्गदर्शन और अन्य के लिए सार्थक चुनौतियाँ समावेशी कक्षा का आदर्श है।',
    },
  },
  {
    topic: 'Symmetric Multiplication Checking Strategy',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Teaching Class 4 pupils to verify subtraction answers using inverse addition (e.g., checking `84 − 39 = 45` by adding `45 + 39 = 84`) primarily builds:',
      opts: [
        'Understanding of inverse operations and self-reliant accuracy habits without waiting for teacher red ticks',
        'Reliance on neighbor’s answer sheet',
        'Fear of making any rough notes',
        'Pure memorization of 3-digit answers',
      ],
      exp: 'Inverse verification connects subtraction and addition structurally while cultivating autonomous error detection.',
    },
    mr: {
      q: '`८४ − ३९ = ४५` हे वजाबाकीचे उत्तर बरोबर आहे का हे तपासण्यासाठी `४५ + ३९ = ८४` ही व्यस्त बेरीज करून पाहण्यास शिकवल्याने कोणती क्षमता वाढते?',
      opts: [
        'व्यस्त क्रियांचा संबंध समजतो व शिक्षकांच्या तपासणीची वाट न पाहता स्वतः अचूकता तपासण्याची स्वावलंबी सवय लागते',
        'शेजारच्या मित्राची वही पाहण्याची सवय',
        'कच्चे काम करण्याची भीती',
        'केवळ तीन-अंकी उत्तरे पाठ करण्याची सवय',
      ],
      exp: 'बेरीज-वजाबाकीचा व्यस्त संबंध वापरून स्व-पडताळणी करणे विद्यार्थ्यांना गणितीयदृष्ट्या स्वावलंबी बनवते.',
    },
    hi: {
      q: '`84 − 39 = 45` की सत्यता जाँचने के लिए व्युत्क्रम जोड़ `45 + 39 = 84` करने की आदत मुख्यतः क्या विकसित करती है?',
      opts: [
        'व्युत्क्रम संक्रियाओं की समझ और शिक्षक के लाल टिक की प्रतीक्षा किए बिना स्व-सत्यापन की आत्मनिर्भर आदत',
        'पड़ोसी की कॉपी पर निर्भरता',
        'रफ कार्य करने का डर',
        'केवल 3-अंकीय उत्तर रटना',
      ],
      exp: 'व्युत्क्रम संक्रिया (जोड़-घटाव या गुणा-भाग संबंध) से उत्तर जाँचना आत्म-नियमन और अवधारणात्मक जुड़ाव दोनों को पुष्ट करता है।',
    },
  },
  {
    topic: 'Fractions on Number Line vs Circular Pies',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why must Class 4–5 fraction teaching complement round pizza/bhakri pies with placing fractions (`1/4, 3/4, 5/4`) on a horizontal NUMBER LINE?',
      opts: [
        'Number lines reveal fractions as true numerical quantities with exact order, density, and values larger than 1—not merely eaten cake slices',
        'Circles cannot show halves cleanly',
        'Number lines are strictly unrelated to decimals or rulers',
        'Pies encourage pupils to eat chalk',
      ],
      exp: 'Moving beyond area-model pies to number lines bridges fractions smoothly into improper fractions, rulers, and decimals.',
    },
    mr: {
      q: 'केवळ गोल भाकरीच्या तुकड्यांऐवजी इ. ४ थी–५ वीत `१/४, ३/४, ५/४` हे अपूर्णांक आडव्या "संख्यारेषेवर (Number Line)" दाखवणे अत्यावश्यक का आहे?',
      opts: [
        'अपूर्णांक हे केवळ खायचे तुकडे नसून त्या स्वतः निश्चित क्रम व स्थान असलेल्या संख्या आहेत (आणि १ पेक्षा मोठ्याही असू शकतात) हे संख्यारेषेवरून स्पष्ट होते',
        'वर्तुळात अर्धा भाग दाखवता येत नाही',
        'संख्यारेषेचा पट्टी व दशांशाशी काही संबंध नाही',
        'गोल चित्रांमुळे खडू खाण्याची सवय लागते',
      ],
      exp: 'संख्यारेषेवरील स्थानामुळे अंश अधिक अपूर्णांक (५/४) आणि मापनपट्टी-दशांश यांच्याशी अपूर्णांकांची घट्ट सांगड बसते.',
    },
    hi: {
      q: 'कक्षा 4–5 में केवल गोल रोटी/केक के टुकड़ों तक सीमित रहने के बजाय `1/4, 3/4, 5/4` जैसे भिन्नों को "संख्या रेखा (Number Line)" पर दिखाना क्यों अनिवार्य है?',
      opts: [
        'संख्या रेखा दिखाती है कि भिन्न केवल काटे गए टुकड़े नहीं, बल्कि निश्चित क्रम व मान वाली वास्तविक संख्याएँ हैं (जो 1 से बड़ी भी हो सकती हैं)',
        'वृत्त में आधा हिस्सा नहीं दिखाया जा सकता',
        'संख्या रेखा का रूलर व दशमलव से कोई संबंध नहीं है',
        'गोल चित्र चॉक खाने को प्रेरित करते हैं',
      ],
      exp: 'संख्या रेखा भिन्नों को मात्र क्षेत्रफल के हिस्से से आगे बढ़ाकर संख्यात्मक परिमाण, अनुचित भिन्न और दशमलव से जोड़ती है।',
    },
  },
  {
    topic: 'Avoiding Premature Cross-Multiplication Mechanicalism',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why do primary mathematics educators discourage drilling "butterfly cross-multiply" tricks (`a/b + c/d`) before Class 5 learners grasp common denominators via equal partitioning?',
      opts: [
        'Tricks produce right digits briefly without meaning, failing completely on three-fraction sums (`1/2 + 1/3 + 1/4`) or fraction comparison intuition',
        'Common denominators are mathematically incorrect',
        'Butterfly drawings violate geometry standards',
        'Memorized tricks guarantee deep proportional reasoning forever',
      ],
      exp: 'Understanding common unit size ("halves and thirds both split cleanly into sixths") transfers cleanly across any number of terms.',
    },
    mr: {
      q: 'समान छेदाचे मूळ कारण समजण्याआधीच "बटरफ्लाय तिरकस गुणाकाराची ट्रिक" घोकून घेतल्यास पुढे इ. ५ वीत ती का फोल ठरते?',
      opts: [
        'ती तात्पुरते बरोबर आकडे देत असली तरी तीन अपूर्णांकांच्या बेरजेत (`१/२ + १/३ + १/४`) किंवा आकाराच्या अंदाजात विद्यार्थी पूर्णपणे गोंधळतात',
        'समच्छेद करणे गणितीयदृष्ट्या चुकीचे असते',
        'फुलपाखराची आकृती भूमितीविरुद्ध असते',
        'घोकलेल्या ट्रिक्स नेहमीच सखोल समज देतात',
      ],
      exp: 'अर्धे व तिसरा हिस्सा यांचा समान तुकडा (सहावा भाग) का करतात हे समजल्यावर तीन-चार अपूर्णांकांची बेरीजही सहज सुटते.',
    },
    hi: {
      q: 'समान हर की समझ बने बिना ही केवल "बटरफ्लाई तिरछा गुणा ट्रिक" रटवाने से कक्षा 5 के छात्र आगे क्यों अटकते हैं?',
      opts: [
        'बिना अर्थ समझे यह ट्रिक तीन भिन्नों (`1/2 + 1/3 + 1/4`) या तुलनात्मक अनुमान में पूरी तरह फेल हो जाती है',
        'समान हर बनाना गणितीय रूप से गलत है',
        'तितली चित्र बनाना ज्यामिति नियम के विरुद्ध है',
        'रटी हुई ट्रिक हमेशा गहरी समझ देती है',
      ],
      exp: 'समान इकाई-आकार (समच्छेद) की अवधारणा समझकर जोड़ने से दो, तीन या अधिक भिन्नों का जोड़ व तुलना सदा के लिए स्पष्ट हो जाती है।',
    },
  },
  {
    topic: 'Calendar & Clock Word Problem Scaffolding',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'When Class 4 learners stumble subtracting `4 hours 10 minutes − 1 hour 45 minutes` by writing `3 hours 35 minutes` (subtracting 10 from 45 or borrowing 100 instead of 60!), which visual strategy fixes the base-60 shift cleanly?',
      opts: [
        'Using an open "Timeline Hop" (`1:45 -> +15m -> 2:00 -> +2h -> 4:00 -> +10m -> 4:10` = `2h 25m`) alongside showing `1 hour = 60 minutes` exchange explicitly',
        'Saying "Time works just like decimal rupees of 100 paise"',
        'Forbidding any subtraction across hours',
        'Drilling base-12 multiplication silently',
      ],
      exp: 'Empty Timeline Hops leverage intuitive hourly landmarks while preventing faulty base-100 borrowing errors.',
    },
    mr: {
      q: '`४ तास १० मिनिटे − १ तास ४५ मिनिटे` सोडवताना मुले ६० ऐवजी १०० हातचा घेऊन किंवा उलट वजाबाकी करून चूक करतात; तास-मिनिटातील ६० चा पाया स्पष्ट करणारी उत्तम पद्धत कोणती?',
      opts: [
        '"वेळ-रेषा उड्या (Timeline Hop)" (`१:४५ -> +१५ मि -> २:०० -> +२ तास -> ४:०० -> +१० मि -> ४:१० = २ तास २५ मि`) आणि १ तास = ६० मिनिटे रूपांतरण प्रत्यक्ष दाखवणे',
        '"वेळही १०० पैशांच्या रुपयांसारखीच मोजतात" असे सांगणे',
        'तास-मिनिट वजाबाकी अभ्यासक्रमातून काढून टाकणे',
        '१२ चे पाढे शांतपणे घोकणे',
      ],
      exp: 'काल-रेषेवरील उड्या व १ तास = ६० मिनिटे या रूपांतरामुळे १०० च्या पायाने हातचा घेण्याची नेहमीची चूक पूर्ण टळते.',
    },
    hi: {
      q: '`4 घंटे 10 मिनट − 1 घंटा 45 मिनट` में छात्र अक्सर 60 के बजाय 100 उधार लेकर या उलटा घटाकर गलती करते हैं; आधार-60 स्पष्ट करने की श्रेष्ठ तकनीक क्या है?',
      opts: [
        'खुली "समय-रेखा छलाँग (Timeline Hop)" (`1:45 -> +15मि -> 2:00 -> +2घं -> 4:00 -> +10मि -> 4:10 = 2 घं 25 मि`) व 1 घंटा = 60 मिनट रूपांतरण दिखाना',
        'यह कहना कि समय भी 100 पैसे के रुपये जैसा है',
        'घंटे-मिनट के घटाव पर रोक लगाना',
        'आधार-12 के पहाड़े रटना',
      ],
      exp: 'समय-रेखा छलाँग विधि सहज पूर्ण-घंटे के पड़ावों का उपयोग कर दशमलव-100 उधार की त्रुटि से पूरी तरह बचाती है।',
    },
  },
  {
    topic: 'Geometric Angles – Static Corner vs Dynamic Turn',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why does introducing angles both as static corners (triangle tips) AND as dynamic turns (opening a classroom door, bending an elbow, rotating two ice-cream sticks pinned at one end) eliminate the "longer arms = bigger angle" error?',
      opts: [
        'When arms turn around a hinged pin, pupils visibly experience that angle size depends strictly on AMOUNT OF TURN/SPREAD, never on stick length',
        'Longer sticks actually create larger degree measures geometrically',
        'Doors and elbows never form right angles',
        'Static corners forbid rotating figures',
      ],
      exp: 'Hinged-strip rotation makes angular turn independent of arm length, resolving a classic Class 4–5 geometric misconception.',
    },
    mr: {
      q: 'कोन केवळ कोपरे म्हणून न दाखवता वर्गाचे दार उघडणे, कोपर वाकवणे किंवा पिन लावलेल्या दोन काड्या फिरवणे अशा "वळण (Turn)" अनुभवांतून शिकवल्यास "मोठ्या भुजा = मोठा कोन" हा गैरसमज का दूर होतो?',
      opts: [
        'काड्या किती फिरल्या (वळणाचे प्रमाण) यावर कोन ठरतो, काड्या किती लांब आहेत यावर नाही हे डोळ्यांना प्रत्यक्ष दिसते',
        'लांब काड्यांमुळे खरोखरच अधिक अंशांचा कोन तयार होतो',
        'दार किंवा कोपर कधीच काटकोन करत नाहीत',
        'स्थिर कोपऱ्यांत आकृती फिरवता येत नाही',
      ],
      exp: 'पिन लावलेल्या कमी-जास्त लांबीच्या काड्यांवर कोनाचे माप सारखेच राहते हे दाखवल्याने भुजांच्या लांबीचा भ्रम तुटतो.',
    },
    hi: {
      q: 'कोण को केवल कोनों तक सीमित न रखकर दरवाज़ा खोलने, कोहनी मोड़ने या पिन से जुड़ी दो पट्टियाँ घुमाने ("घूर्णन / Turn") से पढ़ाने पर "लंबी भुजा = बड़ा कोण" भ्रम क्यों टूटता है?',
      opts: [
        'छात्र प्रत्यक्ष देखते हैं कि कोण घुमाव/फैलाव की मात्रा से तय होता है, न कि भुजाओं की लंबाई से',
        'लंबी भुजाएँ वास्तव में अधिक अंश का कोण बनाती हैं',
        'दरवाज़ा कभी समकोण नहीं बनाता',
        'स्थिर कोनों में आकृति घुमाने की अनुमति नहीं होती',
      ],
      exp: 'कब्ज़ेदार पट्टियों से कोण घुमाकर देखने पर स्पष्ट होता है कि भुजा छोटी हो या बड़ी, घुमाव समान रहने पर कोण समान रहता है।',
    },
  },
  {
    topic: 'Peer Verification & Math Debate Culture',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Instead of instantly saying "Right!" or "Wrong!" after every student response, a Class 5 teacher asks the class: "Do you agree or disagree with Kabir’s method, and why?" This simple routine cultivates:',
      opts: [
        'Logical justification, active listening to peer reasoning, and ownership of mathematical truth based on proof rather than teacher authority',
        'Unnecessary classroom chaos and personal insults',
        'Blind dependence on the teacher nodding first',
        'Memorizing answers silently without questioning',
      ],
      exp: 'Inviting respectful critique shifts proof authority from "because teacher said so" to shared logical evidence.',
    },
    mr: {
      q: 'प्रत्येक विद्यार्थ्याच्या उत्तरावर लगेच "बरोबर!" किंवा "चूक!" न म्हणता शिक्षक वर्गास विचारतात, "कबीरच्या या रीतीशी तुम्ही सहमत आहात का? का?" या साध्या सवयीतून वर्गात काय घडते?',
      opts: [
        'शिक्षकांच्या अधिकाराऐवजी तार्किक पुराव्यावर आधारित सत्य शोधण्याची, इतरांचे तर्क लक्षपूर्वक ऐकण्याची व कारणमीमांसा करण्याची संस्कृती घडते',
        'अनावश्यक गोंधळ व वैयक्तिक अपमान होतात',
        'शिक्षकांच्या होकारावरची अंध अवलंबिता वाढते',
        'प्रश्न न विचारता मुकेपणाने उत्तरे पाठ होतात',
      ],
      exp: '"का व कसे?" या चर्चेमुळे मुले स्वतः तर्काची पडताळणी करायला शिकतात आणि गणितीय संवादाची संस्कृती तयार होते.',
    },
    hi: {
      q: 'हर उत्तर पर तुरंत "सही!" या "गलत!" कहने के बजाय शिक्षक पूरी कक्षा से पूछते हैं: "क्या आप कबीर की विधि से सहमत हैं, और क्यों?" इससे कक्षा में क्या विकसित होता है?',
      opts: [
        'शिक्षक के अधिकार की बजाय तार्किक प्रमाण से सत्य परखने, साथियों का तर्क ध्यान से सुनने और कारण बताने की संस्कृति',
        'अनावश्यक शोर और व्यक्तिगत उपहास',
        'शिक्षक की सहमति पर अंधी निर्भरता',
        'बिना सवाल किए चुपचाप उत्तर रटना',
      ],
      exp: 'सम्मानजनक गणितीय बहस छात्रों को "शिक्षक ने कहा" के बजाय तार्किक प्रमाण के आधार पर सत्य सत्यापित करने की शक्ति देती है।',
    },
  },
  {
    topic: 'Assessing Process Over Just Final Numerical Answer',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'When grading a 3-mark Class 5 multi-step word problem, awarding 2 marks for clear problem setup and valid intermediate steps even if a tiny last subtraction slip occurred honors what principle?',
      opts: [
        'Step-wise Process Assessment recognizing genuine conceptual modeling rather than all-or-nothing binary grading',
        'Lowering mathematical precision intentionally',
        'Rewarding illegible messy scribbling',
        'Eliminating numerical accuracy checks completely',
      ],
      exp: 'Rubric-based step credit diagnoses where reasoning shines versus where minor calculation care needs sharpening.',
    },
    mr: {
      q: '३ गुणांच्या बहु-टप्पी शाब्दिक उदाहरणात विद्यार्थ्याने अचूक मांडणी व मधल्या सर्व पायऱ्या बरोबर केल्या, पण अगदी शेवटच्या वजाबाकीत लहानशी चूक झाली; त्याला टप्प्यांनुसार २ गुण देणे कोणते तत्त्व जपते?',
      opts: [
        'सर्व-किंवा-शून्य (All-or-nothing) तपासणीऐवजी तार्किक मांडणी व विचारप्रक्रियेला योग्य श्रेय देणारे पायरीनिहाय मूल्यमापन',
        'गणिताची अचूकता जाणीवपूर्वक कमी करणे',
        'अस्पष्ट खरडलेल्या अक्षराला बक्षीस देणे',
        'संख्यात्मक अचूकतेची तपासणी बंद करणे',
      ],
      exp: 'पायऱ्यांना गुण दिल्यामुळे विद्यार्थ्याच्या मजबूत संकल्पनात्मक विचारांचे योग्य मूल्यमापन होते व नेमकी हिशेबातील चूकच सुधारता येते.',
    },
    hi: {
      q: '3 अंकों के बहु-चरणीय इबारती सवाल में यदि छात्र ने सही ढाँचा और बीच के सभी चरण सही लिखे पर अंतिम घटाव में छोटी भूल कर दी, तो उसे चरणबद्ध 2 अंक देना किस सिद्धांत को पुष्ट करता है?',
      opts: [
        'सब-या-शून्य अंकन की बजाय वास्तविक वैचारिक मॉडलिंग और तर्क-प्रक्रिया को मान्यता देने वाला चरणबद्ध मूल्यांकन',
        'गणितीय परिशुद्धता जानबूझकर कम करना',
        'अस्पष्ट गंदी लिखावट को पुरस्कृत करना',
        'गणना की सटीकता जाँच पूरी तरह बंद करना',
      ],
      exp: 'चरण-आधारित रूब्रिक सही समस्या-समझ को उचित श्रेय देता है और केवल गणना सावधानी में सुधार का संकेत देता है।',
    },
  },
  {
    topic: 'Zero as Placeholder – Abacus Spike Visualization',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Using a 4-spike Place Value Abacus (Th–H–T–O) to display `3,040` visually shows Class 3 beginners why:',
      opts: [
        'Empty Hundreds and Ones spikes cannot simply be skipped—`0` holds those exact empty columns visibly open so `3,040` never collapses into `34`',
        'Zeros on the abacus have heavier bead mass than nines',
        'Three beads on Thousands equal three beads on Ones',
        'Zero means the entire number equals nothing',
      ],
      exp: 'An empty spike physically demonstrates zero as an indispensable positional placeholder.',
    },
    mr: {
      q: 'हजार–शतक–दशक–एकक (Th-H-T-O) या चार काड्यांच्या मणी-साधनावर (Abacus) `३,०४०` दाखवल्यास इ. ३ रीच्या नवशिक्यांना नेमके काय स्पष्ट दिसते?',
      opts: [
        'शतक व एककाची काडी रिकामी असूनही ती वगळता येत नाही—ती रिकामा रकाना राखून ठेवण्यासाठीच `०` आवश्यक आहे, नाहीतर `३,०४०` चे `३४` होईल',
        'शून्य असलेल्या काडीचे मणी नऊपेक्षा जड असतात',
        'हजार आणि एकक काडीचे मूल्य सारखेच असते',
        'शून्य आल्यास संपूर्ण संख्याच शून्य होते',
      ],
      exp: 'मणी-साधनावरील रिकामी काडी ही शून्याच्या "स्थानिक धारक (Placeholder)" भूमिकेचा सर्वोत्तम दृश्य पुरावा ठरते.',
    },
    hi: {
      q: '4-छड़ वाले स्थानीय मान गिनतारे (Abacus: हज़ार–सैकड़ा–दहाई–इकाई) पर `3,040` दिखाने से कक्षा 3 के छात्रों को क्या स्पष्ट समझ आता है?',
      opts: [
        'सैकड़ा और इकाई की खाली छड़ों को छोड़ा नहीं जा सकता—उन खाली स्थानों को सँभालने के लिए `0` अनिवार्य है, वरना `3,040` सिमटकर `34` बन जाएगा',
        'गिनतारे में शून्य के मोती 9 से भारी होते हैं',
        'हज़ार और इकाई छड़ का मान समान होता है',
        'शून्य होने पर पूरी संख्या ही शून्य हो जाती है',
      ],
      exp: 'गिनतारे की खाली छड़ प्रत्यक्ष दिखाती है कि शून्य किसी स्थान के खाली होने का अनिवार्य स्थान-धारक संकेत है।',
    },
  },
  {
    topic: 'Rounding & Significant Practical Judgment',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Discussing when to round UP vs use EXACT figures—comparing "Ordering sweets for ~140 guests -> round generously up to 150" against "Entering a 10-digit school scholarship bank account number -> MUST be 100% exact"—cultivates:',
      opts: [
        'Practical mathematical judgment regarding precision versus sensible estimation in real life',
        'Confusion between bank accounts and arithmetic sums',
        'Refusal to ever compute exact sums anywhere',
        'Treating rounding as an arbitrary coin flip',
      ],
      exp: 'Understanding WHEN exactness matters and WHEN estimation serves best marks authentic everyday numeracy.',
    },
    mr: {
      q: 'वर्गात दोन प्रसंगांची तुलना करणे—"१४० पाहुण्यांच्या लाडवांसाठी अंदाज १५० धरून वाढीव घेणे" विरुद्ध "१०-अंकी शिष्यवृत्ती बँक खाते क्रमांक तंतोतंत बिनचूक लिहिणे"—विद्यार्थ्यांत कोणते शहाणपण घडवते?',
      opts: [
        'दैनंदिन जीवनात कुठे अंदाजे पूर्णांकन उपयोगी ठरते आणि कुठे १००% अचूकता अपरिहार्य असते याचा व्यावहारिक विवेक',
        'बँक खाते व बेरजेची गल्लत होणे',
        'कधीच अचूक हिशेब न करण्याची सवय',
        'पूर्णांकन म्हणजे केवळ नाणेफेक मानणे',
      ],
      exp: 'अंदाज व अचूकता या दोन्हींच्या योग्य वापराची समज वास्तविक जीवनातील गणिती साक्षरता पूर्ण करते.',
    },
    hi: {
      q: 'कक्षा में दो स्थितियों की तुलना करना—"140 मेहमानों की मिठाई हेतु उदारता से ~150 का अनुमान लगाना" बनाम "10-अंकीय छात्रवृत्ति बैंक खाता संख्या शत-प्रतिशत सटीक भरना"—छात्रों में क्या विकसित करता है?',
      opts: [
        'दैनिक जीवन में कब सन्निकट अनुमान उपयोगी है और कब पूर्ण सटीकता अनिवार्य है, इसका व्यावहारिक गणितीय विवेक',
        'बैंक खाते और जोड़ के बीच भ्रम',
        'कहीं भी सटीक गणना न करने की आदत',
        'सन्निकटन को मनमाना तुक्का मानना',
      ],
      exp: 'संदर्भ के अनुसार अनुमान बनाम सटीकता का सही निर्णय लेना परिपक्व संख्यात्मक साक्षरता की पहचान है।',
    },
  },
  {
    topic: 'Using Storybooks to Spark Mathematical Curiosity',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Reading a cheerful picture book like "One Grain of Rice" (doubling grains daily on chessboard squares) to Class 5 learners primarily sparks intuitive wonder around:',
      opts: [
        'Exponential multiplicative growth versus slow linear addition long before formal powers notation appears',
        'Exact grain moisture testing in agricultural labs',
        'Passive spelling memorization of rice varieties',
        'Ignoring mathematics during story periods',
      ],
      exp: 'Mathematical picture stories ignite curiosity about rapid doubling, patterns, and proportion naturally.',
    },
    mr: {
      q: 'बुद्धिबळाच्या प्रत्येक घरात तांदळाचे दाणे दररोज दुप्पट करत नेण्याची ("तांदळाचा एक दाणा") गोष्ट इ. ५ वीच्या मुलांना वाचून दाखवल्याने सहजपणे कशाचे कुतूहल जागृत होते?',
      opts: [
        'साध्या संथ बेरजेपेक्षा दुप्पट होणाऱ्या घातांकीय वाढीच्या (Multiplicative growth) प्रचंड वेगाचे विस्मयकारक आकलन',
        'शेती प्रयोगशाळेतील तांदूळ आर्द्रता तपासणी',
        'तांदळाच्या जातींचे केवळ शुद्धलेखन पाठांतर',
        'गोष्टींच्या तासात गणिताकडे दुर्लक्ष करणे',
      ],
      exp: 'गणितीय कथांमुळे औपचारिक घातांक सूत्रांपूर्वीच दुप्पट वाढ व संख्यांच्या पटीबद्दल निखळ कुतूहल निर्माण होते.',
    },
    hi: {
      q: 'कक्षा 5 के छात्रों को शतरंज के हर खाने में रोज़ दोगुने होते चावल के दानों वाली कहानी ("चावल का एक दाना") सुनाना सहज रूप से किसकी जिज्ञासा जगाता है?',
      opts: [
        'धीमी रैखिक वृद्धि (जोड़) की तुलना में दोगुनी होती चरघातांकी गुणन-वृद्धि (Multiplicative growth) की चमत्कारी गति का सहज बोध',
        'कृषि प्रयोगशाला में नमी जाँच का प्रशिक्षण',
        'चावल की किस्मों की वर्तनी रटना',
        'कहानी के समय गणित से बचना',
      ],
      exp: 'गणितीय चित्र-कथाएँ औपचारिक घातांक संकेतों से बहुत पहले पैटर्न, दोहराव और विशाल संख्याओं की सहज कल्पना जगाती हैं।',
    },
  },
  {
    topic: 'Diagnosing Pattern Rule Fixation vs Structural Rule',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Shown triangular matchstick houses (`1 house = 4 sticks, 2 joined houses = 7 sticks, 3 joined houses = 10 sticks`), asking Class 5 pupils "How many sticks for 10 joined houses WITHOUT drawing all 10?" nudges learners from recursive "+3" counting toward:',
      opts: [
        'Discovering general algebraic structure (`1 + 3×n` -> 1 starter stick + 3 per house = 31 sticks)',
        'Giving up whenever shapes exceed 3 figures',
        'Multiplying `4 × 10 = 40` mistakenly ignoring shared walls',
        'Measuring matchstick gram mass',
      ],
      exp: 'Matchstick generalizing tasks cultivate algebraic functional thinking smoothly inside primary grades.',
    },
    mr: {
      q: 'काडीपेटीच्या काड्यांची साखळी (`१ घर = ४ काड्या, २ जोडलेली घरे = ७, ३ जोडलेली घरे = १०`) दाखवून "न काढता थेट १० जोडलेल्या घरांसाठी किती काड्या लागतील?" असे विचारल्याने मुले क्रमाने ३ मोजण्याऐवजी कशाकडे वळतात?',
      opts: [
        'सामान्य संरचनात्मक सूत्र शोधण्याकडे (`१ सुरुवातीची काडी + प्रत्येक घरासाठी ३`, म्हणजे `१ + ३×१० = ३१ काड्या`)',
        '३ आकृत्यांपेक्षा जास्त असल्यास हार मानण्याकडे',
        'सामायिक भिंती विसरून `४ × १० = ४०` करण्याकडे',
        'काड्यांचे वजन मोजण्याकडे',
      ],
      exp: 'काड्यांच्या आकृतिबंधांचे सामान्यीकरण केल्याने प्राथमिक वर्गातच बीजगणितीय विचारांचा मजबूत पाया तयार होतो.',
    },
    hi: {
      q: 'माचिस की तीलियों की श्रृंखला (`1 घर = 4 तीलियाँ, 2 जुड़े घर = 7, 3 जुड़े घर = 10`) दिखाकर पूछना: "बिना चित्र बनाए 10 जुड़े घरों के लिए कितनी तीलियाँ लगेंगी?" छात्रों को किस ओर ले जाता है?',
      opts: [
        'सामान्य बीजीय संरचना खोजने की ओर (`1 शुरुआती तीली + प्रति घर 3 तीली`, अर्थात् `1 + 3×10 = 31`)',
        '3 आकृतियों से अधिक होने पर प्रयास छोड़ने की ओर',
        'साझा दीवार भूलकर `4 × 10 = 40` करने की ओर',
        'तीलियों का भार मापने की ओर',
      ],
      exp: 'तीलियों के पैटर्न से सामान्य नियम निकालना प्राथमिक स्तर पर ही बीजीय फलन-चिंतन की नींव डालता है।',
    },
  },
];
