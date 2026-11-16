import { CuratedTrilingualMcq } from './types';

// MAHA TET Paper 1 (Classes 1-5) — EVS Pedagogy Part 3 (32 Distinct Inquiry Models, Realia, Safety & Higher-Order Pedagogy Items)
export const MAHA_TET_P1_B1_EVS_P3: CuratedTrilingualMcq[] = [
  {
    topic: '5E Instructional Model in Primary EVS',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In BSCS 5E Constructivist Learning Cycle applied to an EVS lesson on "Soil Erosion", what is the accurate pedagogical sequence of phases?',
      opts: [
        'Engage → Explore → Explain → Elaborate → Evaluate',
        'Evaluate → Explain → Ignore → Memorize → Explore',
        'Explain → Dictate → Punish → Evaluate',
        'Elaborate → Engage → Skip Explore → Test',
      ],
      exp: 'Students are hooked (Engage), investigate soil/water trays directly (Explore), build terminology (Explain), apply to hillside farming (Elaborate), and reflect (Evaluate).',
    },
    mr: {
      q: '"मृदेची धूप" (Soil Erosion) हा पाठ ज्ञानरचनावादी ५-E पद्धतीने (5E Model) शिकवताना टप्प्यांचा अचूक क्रम कोणता?',
      opts: [
        'प्रवृत्त करणे (Engage) → शोध घेणे (Explore) → स्पष्ट करणे (Explain) → विस्तार करणे (Elaborate) → मूल्यमापन (Evaluate)',
        'मूल्यमापन → स्पष्टीकरण → पाठांतर → शोध',
        'व्याख्यान → श्रुतलेखन → शिक्षा',
        'विस्तार → शोध वगळणे → चाचणी',
      ],
      exp: '५-E प्रारूपानुसार मुले आधी कुतूहलाने जोडली जातात, प्रत्यक्ष शोध घेतात आणि स्वतःच्या शब्दांत संकल्पना बांधतात.',
    },
    hi: {
      q: '"मृदा अपरदन" पाठ में रचनावादी ५-E शिक्षण मॉडल (5E Model) के चरणों का सही अनुक्रम क्या है?',
      opts: [
        'संलग्न करना (Engage) → अन्वेषण (Explore) → व्याख्या (Explain) → विस्तार (Elaborate) → मूल्यांकन (Evaluate)',
        'मूल्यांकन → व्याख्या → रटना → अन्वेषण',
        'व्याख्यान → श्रुतलेख → दंड',
        'विस्तार → संलग्न → परीक्षा',
      ],
      exp: '५-E चक्र में बच्चे जिज्ञासा से जुड़कर पहले स्वयं प्रयोग व अन्वेषण करते हैं और फिर अवधारणा निर्माण व विस्तार करते हैं।',
    },
  },
  {
    topic: 'Predict-Observe-Explain (POE) Demonstration Strategy',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Rather than silently pouring vinegar over baking soda at the front desk, the teacher follows POE (Predict–Observe–Explain). Why does asking pupils to PREDICT aloud first transform a teacher demo into active learning?',
      opts: [
        'Predicting commits learners mentally to a hypothesis, focuses keen observation on fizzing gas bubbles, and triggers cognitive reconciliation afterwards',
        'It stalls time so less syllabus is covered',
        'It ensures only the teacher touches materials forever',
        'It proves students’ guesses are always silly',
      ],
      exp: 'POE activates prior beliefs, heightens observational attention, and deepens conceptual resolution.',
    },
    mr: {
      q: 'वर्गासमोर प्रात्यक्षिक दाखवताना शिक्षकांनी "अंदाज–निरीक्षण–स्पष्टीकरण" (POE) तंत्र वापरल्यास विद्यार्थी फक्त निष्क्रिय प्रेक्षक न राहता सक्रिय का होतात?',
      opts: [
        'आधी अंदाज बांधल्याने विद्यार्थ्यांचे मन त्या प्रयोगाशी गुंतते, निरीक्षणाकडे बारकाईने लक्ष राहते आणि तर्क जुळवून समज पक्की होते',
        'तास संपेपर्यंत वेळ काढता येतो म्हणून',
        'फक्त शिक्षकाकडेच साहित्य राहते म्हणून',
        'मुलांचे अंदाज चुकीचे ठरवून हसण्यासाठी',
      ],
      exp: 'POE पद्धत कोणतेही प्रात्यक्षिक सक्रिय वैचारिक शोधात रूपांतरित करते.',
    },
    hi: {
      q: 'प्रदर्शन प्रयोग के समय "पूर्वानुमान–अवलोकन–व्याख्या" (POE) रणनीति बच्चों को निष्क्रिय दर्शक के बजाय सक्रिय अधिगमकर्ता कैसे बनाती है?',
      opts: [
        'पहले पूर्वानुमान लगाने से बच्चा मानसिक रूप से प्रयोग से जुड़ता है, सूक्ष्म अवलोकन करता है और फिर तर्कसंगत व्याख्या द्वारा समझ बनाता है',
        'पाठ्यक्रम धीमा करने के लिए',
        'सारी सामग्री शिक्षक के पास रखने हेतु',
        'गलत अनुमान का उपहास करने हेतु',
      ],
      exp: 'POE विधि छात्रों के पूर्व-विश्वासों को चुनौती देकर अवलोकन को उद्देश्यपूर्ण व गहन बनाती है।',
    },
  },
  {
    topic: 'Heuristic Method (Armstrong) Spirit in Primary Grades',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Prof. H. E. Armstrong’s "Heuristic Method" ("Heurisko" = "I discover") places primary learners in the role of young discoverers. Which classroom condition best reflects true guided discovery?',
      opts: [
        'Providing magnets, coins, pins, and plastic spoons with prompt cards asking "Find out which materials attract and record your rule"',
        'Handing unguided dangerous acids with zero scaffolding',
        'Dictating "Iron is magnetic; plastic is non-magnetic" for rote copying',
        'Giving zero feedback when students look stuck',
      ],
      exp: 'In primary grades, structured/guided discovery combines genuine self-investigation with safe scaffolding.',
    },
    mr: {
      q: 'प्रा. आर्मस्ट्राँग यांच्या "स्वयंशोधन पद्धतीनुसार" (Heuristic Method — "मी स्वतः शोधतो") प्राथमिक वर्गात कोणती स्थिती अस्सल मार्गदर्शित शोधाचे प्रतीक आहे?',
      opts: [
        'चुंबक, नाणी, टाचण्या व प्लास्टिक चमचे देऊन "कोणत्या वस्तू चिकटतात ते स्वतः तपासून तुमचा नियम नोंदवा" असे आव्हान देणे',
        'कोणत्याही मार्गदर्शनाशिवाय धोकादायक आम्ल हातात देणे',
        'फक्त फळ्यावरील वाक्ये उतरवायला लावणे',
        'मुले अडकली तरी अजिबात मदत न करणे',
      ],
      exp: 'प्राथमिक स्तरावर सुरक्षित आधारभूत साहित्यासह विद्यार्थ्यांना नियम स्वतः शोधू देणे ही स्वयंशोधनाची योग्य पद्धत आहे.',
    },
    hi: {
      q: 'प्रो. आर्मस्ट्रांग की "ह्यूरिस्टिक / खोज विधि" ("मैं स्वयं खोजता हूँ") के अनुसार प्राथमिक EVS में कौन-सी परिस्थिति सार्थक मार्गदर्शित खोज को दर्शाती है?',
      opts: [
        'चुंबक, सिक्के, पिन व प्लास्टिक चम्मच देकर यह कार्य देना: "स्वयं जाँचकर पता लगाओ कि कौन-सी वस्तुएँ आकर्षित होती हैं और नियम लिखो"',
        'बिना सुरक्षा व मार्गदर्शन के खतरनाक रसायन देना',
        'बोर्ड से रटे-रटाए वाक्य लिखवाना',
        'अटकने पर कोई सहायता न देना',
      ],
      exp: 'प्राथमिक स्तर पर सुरक्षित सामग्री व उपयुक्त मार्गदर्शन के साथ नियम स्वयं खोजना ह्यूरिस्टिक भावना का सही प्रयोग है।',
    },
  },
  {
    topic: 'Ethical Rules for Making Plant Herbarium Albums',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'To create a Class 4 "Leaf Diversity Album" responsibly without harming living campus shrubs, what instruction must the teacher enforce strictly?',
      opts: [
        'Collect ONLY freshly fallen dry/shed leaves from the ground—NEVER pluck live flowers, rare roots, or healthy green branches',
        'Uproot whole small flowering plants for neat album roots',
        'Break big branches off school shade trees',
        'Buy plastic imitation leaves from toy stores',
      ],
      exp: 'Conservation ethics must be lived in every school assignment—protect living flora while studying naturally shed specimens.',
    },
    mr: {
      q: 'इयत्ता ४ थीचा "पानांचा संग्रह" (Herbarium) तयार करताना परिसरातील जिवंत झाडांना इजा होऊ नये म्हणून शिक्षकाने कोणता सक्त नियम घालावा?',
      opts: [
        'केवळ जमिनीवर नैसर्गिकरीत्या गळून पडलेलीच पाने गोळा करणे — जिवंत पाने, फुले किंवा फांद्या कधीच तोडू नयेत',
        'सुंदर मुळांसह संपूर्ण लहान रोप उपटून आणणे',
        'सावलीच्या झाडांच्या फांद्या मोडणे',
        'दुकानातून प्लास्टिकची पाने आणणे',
      ],
      exp: 'प्रत्येक शालेय प्रकल्पात निसर्ग-रक्षणाची कृतीशील सवय जपणे अत्यावश्यक असते.',
    },
    hi: {
      q: 'कक्षा ४ का "पत्ती संग्रह एल्बम" (Herbarium) बनाते समय जीवित पौधों की रक्षा हेतु शिक्षक को कौन-सा नियम सख्ती से लागू करना चाहिए?',
      opts: [
        'केवल जमीन पर प्राकृतिक रूप से गिरी हुई पत्तियाँ ही एकत्र करें — जीवित डालियाँ, फूल या पौधे कभी न तोड़ें',
        'जड़ों सहित पूरा छोटा पौधा उखाड़ लाना',
        'छायादार पेड़ों की टहनियाँ तोड़ना',
        'बाजार से प्लास्टिक की पत्तियाँ लाना',
      ],
      exp: 'पर्यावरण अध्ययन की हर गतिविधि में जीवित प्रकृति के संरक्षण का नैतिक व्यवहार प्रत्यक्ष रूप से सिखाया जाना चाहिए।',
    },
  },
  {
    topic: 'Overcoming "North = Up in Sky" Map Misconception',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Hanging a vertical wall map, a Class 4 pupil looks upward at the ceiling saying "Jammu & Kashmir is up in the sky and Kanyakumari is near the basement!" How should the teacher clarify map orientation?',
      opts: [
        'Lay the map FLAT on the floor aligned with real geographic North using a compass so children grasp that North on flat ground—not skyward height—sits at the top margin of wall maps by convention',
        'Confirm Kashmir floats higher in clouds than Kerala',
        'Ban wall maps until secondary college',
        'Tell students south means underground mines',
      ],
      exp: 'Laying paper maps horizontally on desks/floor matching cardinal directions dissolves the "North = Up in air" vertical illusion.',
    },
    mr: {
      q: 'भिंतीवर लावलेल्या नकाशाकडे पाहून विद्यार्थी म्हणतो: "काश्मीर आकाशात वर आहे आणि कन्याकुमारी जमिनीत खाली आहे!" नकाशाच्या दिशांचा हा गैरसमज कसा दूर करावा?',
      opts: [
        'नकाशा जमिनीवर सपाट अंथरून होकायंत्राच्या साहाय्याने खऱ्या उत्तर दिशेशी जुळवून दाखवावा, म्हणजे भिंतीवरील नकाशात "वर" म्हणजे उत्तर दिशा असते—आकाश नव्हे—हे स्पष्ट होते',
        'काश्मीर खरोखर ढगांवर तरंगतो असे सांगणे',
        'भिंतीवरील नकाशे कायमचे काढून टाकणे',
        'दक्षिण म्हणजे जमिनीखालील खाण असे सांगणे',
      ],
      exp: 'जमिनीवर सपाट नकाशा ठेवून प्रत्यक्ष दिशांशी जोडल्यास "वर = आकाश" हा भ्रम त्वरित दूर होतो.',
    },
    hi: {
      q: 'दीवार पर टंगे मानचित्र को देखकर बच्चा कहता है: "कश्मीर आकाश में ऊपर है और कन्याकुमारी जमीन के नीचे!" इस दिशा-भ्रम को कैसे दूर करें?',
      opts: [
        'मानचित्र को फर्श पर समतल बिछाकर दिक्सूचक से वास्तविक उत्तर दिशा के अनुरूप रखें, ताकि स्पष्ट हो कि मानचित्र में "ऊपर" का अर्थ आकाश नहीं बल्कि क्षैतिज उत्तर दिशा है',
        'यह मान लेना कि कश्मीर बादलों में है',
        'मानचित्र पढ़ाना बंद कर देना',
        'दक्षिण को भूमिगत बताना',
      ],
      exp: 'समतल फर्श पर वास्तविक दिशाओं से जोड़कर मानचित्र रखने से ऊर्ध्वाधर ऊँचाई व उत्तर दिशा का भ्रम दूर हो जाता है।',
    },
  },
  {
    topic: 'Student-Invented Legends Before Standard Map Symbols',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Before drilling standard Survey-of-India conventional map icons (blue circles for wells, red dashes for tracks), why let Class 3–4 learners first invent their OWN picture keys for mapping the school playground?',
      opts: [
        'Children grasp the conceptual PURPOSE of standardized shared legends ("If everyone uses different secret doodles, friends cannot read my map!") before adopting common symbols',
        'Survey symbols are scientifically incorrect',
        'Doodling fills empty drawing notebooks quickly',
        'So maps can never be shared with anyone',
      ],
      exp: 'Experiencing the communication problem of idiosyncratic symbols makes standard legends personally meaningful rather than arbitrary memorization.',
    },
    mr: {
      q: 'प्रमाणित सांकेतिक खुणा (विहिरीसाठी निळा गोल, रस्त्यासाठी रेषा) पाठ करवून घेण्यापूर्वी मुलांना शाळेच्या मैदानाचा नकाशा काढताना स्वतःची सांकेतिक चिन्हे व सूची (Legend) तयार करू देण्याचा मुख्य फायदा काय?',
      opts: [
        'मुलांना स्वतःच जाणवते की प्रत्येकाने वेगळ्या खुणा केल्यास दुसऱ्याला नकाशा वाचता येत नाही; त्यामुळे समान प्रमाणित चिन्हांची गरज व अर्थ सहज कळतो',
        'प्रमाणित चिन्हे चुकीची असतात म्हणून',
        'रिकाम्या वह्या लवकर भरण्यासाठी',
        'नकाशा कोणालाही कळू नये म्हणून',
      ],
      exp: 'स्वतःची चिन्हे वापरून इतरांना वाचायला दिल्यावरच प्रमाणित नकाशा-सूचीचे व्यावहारिक महत्त्व मुलांना उमगते.',
    },
    hi: {
      q: 'मानक मानचित्र रूढ़ प्रतीकों को सिखाने से पहले कक्षा ३–४ के बच्चों को विद्यालय परिसर के मानचित्र के लिए स्वयं के संकेत व कुंजी (Legend) बनाने का अवसर क्यों दें?',
      opts: [
        'बच्चे स्वयं अनुभव करते हैं कि अलग-अलग निजी चिह्नों से दूसरे लोग नक्शा नहीं पढ़ सकते, जिससे मानक प्रतीकों का उद्देश्य व आवश्यकता स्पष्ट होती है',
        'मानक प्रतीक गलत होते हैं',
        'कॉपी के पन्ने भरने हेतु',
        'गुप्त नक्शा रखने हेतु',
      ],
      exp: 'स्वयं के प्रतीक बनाकर सहपाठियों से पढ़वाने से बच्चे मानक रूढ़ प्रतीकों के महत्व को रटे बिना तार्किक रूप से समझते हैं।',
    },
  },
  {
    topic: 'Teaching Historical Change Using Visual Timelines',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Primary learners frequently confuse "100 years ago" and "2,000 years ago" as equally blurry old times. Which concrete classroom visual best scaffolds chronological sense in Class 5 EVS?',
      opts: [
        'A classroom "Clothesline Timeline" pinning dated photos/sketches from Baby Birth → Grandparent Youth → Freedom 1947 → Shivaji Maharaj Swarajya → Harappan Pots proportionally',
        'Reciting 60 isolated treaty dates fast',
        'Mixing ancient and modern photos randomly in a box',
        'Claiming all history happened on the same Tuesday',
      ],
      exp: 'Spatial clothesline timelines convert abstract time intervals into visible spatial distance and intergenerational steps.',
    },
    mr: {
      q: 'प्राथमिक वर्गातील मुलांना "१०० वर्षांपूर्वी" व "२,००० वर्षांपूर्वी" यांतील काळाचा फरक अस्पष्ट वाटतो. हा कालक्रमबोध (Chronology) स्पष्ट करण्यासाठी कोणते दृश्य साधन सर्वात प्रभावी ठरेल?',
      opts: [
        'वर्गातील "कालरेषा दोरी" (Timeline Clothesline) — स्वतःचा जन्म → आजी-आजोबांचे बालपण → १९४७ स्वातंत्र्य → शिवकाल → हडप्पा भांडी अशी प्रमाणबद्ध चित्रांची मांडणी',
        'फक्त ६० ऐतिहासिक सनावळ्या वेगाने पाठ करणे',
        'जुनी व नवीन चित्रे एका डब्यात मिसळणे',
        'सर्व इतिहास एकाच वर्षात घडल्याचे सांगणे',
      ],
      exp: 'अवकाशीय कालरेषेमुळे अमूर्त ऐतिहासिक काळ मुलांना दृश्य अंतराच्या स्वरूपात स्पष्टपणे जाणवतो.',
    },
    hi: {
      q: 'प्राथमिक स्तर के बच्चे "१०० वर्ष पहले" और "२,००० वर्ष पहले" के समय-अंतर को स्पष्ट नहीं समझ पाते। कालक्रम बोध विकसित करने का सर्वोत्तम मूर्त साधन क्या है?',
      opts: [
        'कक्षा में "समय-रेखा डोरी" (Clothesline Timeline) — स्वयं का जन्म → दादा-दादी का बचपन → १९४७ स्वतंत्रता → शिवाजी महाराज काल → हड़प्पा काल को क्रम से लगाना',
        'केवल ६० तिथियाँ रटना',
        'सभी चित्र डिब्बे में मिलाना',
        'पूरे इतिहास को एक ही दिन का बताना',
      ],
      exp: 'दृष्टिगत समय-रेखा (Timeline) अमूर्त ऐतिहासिक समय को मूर्त स्थानिक दूरी और पीढ़ियों के क्रम में बदलकर स्पष्ट बनाती है।',
    },
  },
  {
    topic: 'Authentic Print Realia: Railway Timetables, Electricity Bills & Tickets',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Why do Class 4 & 5 EVS chapters include real Indian Railway reservation tickets, bus passes, and monthly electricity bills inside exercises?',
      opts: [
        'To train functional life skills—interpreting PNR/coach numbers, departure times, distance km, unit kWh energy usage, and consumer costs from authentic print',
        'To teach children how to print fake travel tickets',
        'To bore learners with tax accounting statutes',
        'To memorize every train number across India by heart',
      ],
      exp: 'Real-world print literacy connects classroom learning directly with family travel, energy saving, and everyday civic independence.',
    },
    mr: {
      q: 'इयत्ता ४ थी–५ वीच्या EVS पुस्तकांत खरे रेल्वे तिकीट, बस पास व घरगुती वीजबिल पाहून प्रश्न सोडवायचे उपक्रम का दिले आहेत?',
      opts: [
        'प्रत्यक्ष जीवनातील तिकीट वेळ, अंतर, डबा क्रमांक, वीज युनिट्स (kWh) व खर्च वाचण्याची व्यावहारिक जीवनकौशल्ये विकसित करण्यासाठी',
        'खोटी तिकिटे छापायला शिकवण्यासाठी',
        'कर-कायद्यांचे दडपण आणण्यासाठी',
        'भारतातील सर्व गाड्यांचे क्रमांक पाठ करण्यासाठी',
      ],
      exp: 'अस्सल दैनंदिन कागदपत्रांचे वाचन मुलांना प्रवास नियोजन, ऊर्जा बचत व व्यावहारिक साक्षरतेसाठी सक्षम करते.',
    },
    hi: {
      q: 'कक्षा ४ व ५ के EVS पाठों में वास्तविक रेल टिकट, बस पास और बिजली बिल पर आधारित प्रश्न क्यों शामिल किए जाते हैं?',
      opts: [
        'वास्तविक जीवन में प्रस्थान समय, दूरी, कोच संख्या, बिजली यूनिट (kWh) और खर्च पढ़ने के व्यावहारिक जीवन कौशल विकसित करने हेतु',
        'नकली टिकट बनाना सिखाने हेतु',
        'कर कानून रटाने हेतु',
        'सभी ट्रेनों के नंबर याद कराने हेतु',
      ],
      exp: 'दैनिक जीवन की प्रामाणिक मुद्रित सामग्री (Tickets, Bills) बच्चों में व्यावहारिक पठन, ऊर्जा सजगता और आत्मनिर्भरता विकसित करती है।',
    },
  },
  {
    topic: 'Connecting Mid-Day Meal (PM POSHAN) to Balanced Diet & Hygiene',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'How can a primary teacher integrate the school’s daily Mid-Day Meal (PM POSHAN) directly into EVS learning?',
      opts: [
        'Discuss ingredients’ food groups (dal proteins, seasonal greens, grains), practice proper soap handwashing before eating, avoid plate food wastage, and value community cooks equally',
        'Rush students silently in 5 minutes without washing hands',
        'Segregate children by social background during meals',
        'Skip food nutrition chapters saying school lunch is unrelated to study',
      ],
      exp: 'Common shared meals provide unmatched live opportunities for nutrition literacy, hand hygiene, gratitude, and social equality.',
    },
    mr: {
      q: 'शाळेतील दैनंदिन मध्यान्ह भोजन (PM POSHAN) उपक्रम EVS अध्यापनाशी थेट कसा जोडता येईल?',
      opts: [
        'आहारातील अन्नघटक (डाळ-प्रथिने, पालेभाज्या, धान्ये), जेवणापूर्वी साबणाने हात धुणे, अन्न वाया न घालवणे आणि स्वयंपाकी मावशींचा आदर व सहभोजन समता शिकवून',
        'हात न धुता ५ मिनिटांत गपचूप जेवण आटोपून',
        'जेवणावेळी मुलांत भेदभाव करून',
        'अन्नघटक पाठ पूर्ण वगळून',
      ],
      exp: 'मध्यान्ह भोजन हा पोषण, स्वच्छता, अन्नसंवर्धन आणि सामाजिक समता प्रत्यक्ष जगण्याचा सर्वोत्तम शैक्षणिक प्रसंग आहे.',
    },
    hi: {
      q: 'विद्यालय की दैनिक मध्याह्न भोजन (PM POSHAN) व्यवस्था को प्राथमिक EVS शिक्षण से प्रत्यक्ष रूप से कैसे जोड़ा जा सकता है?',
      opts: [
        'भोजन के पोषक घटकों (दाल प्रोटीन, हरी सब्जी, अनाज) पर चर्चा, भोजन पूर्व साबुन से हाथ धोना, जूठन न छोड़ना तथा रसोइयों का सम्मान व समानता सिखाकर',
        'हाथ धोए बिना ५ मिनट में चुपचाप खत्म कराकर',
        'भोजन में बच्चों को अलग बिठाकर',
        'पोषण पाठ को असंबंधित बताकर',
      ],
      exp: 'मध्याह्न भोजन पोषण शिक्षा, स्वच्छता आदतों, भोजन अपव्यय रोकने और सामाजिक समरसता का जीवंत अवसर है।',
    },
  },
  {
    topic: 'Fact vs Myth in Weather & Eclipse Beliefs Respectfully',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Before an upcoming Solar Eclipse, a Class 5 pupil mentions fears heard at home that stepping outside even briefly poisons food or curses people. How should an EVS teacher foster scientific temper respectfully?',
      opts: [
        'Explain the simple Sun–Moon–Earth shadow geometry using torch, football, and marble models, demonstrate safe pinhole-projector viewing, and respect family elders while sharing clear scientific facts',
        'Mock and insult the child’s grandparents harshly',
        'Confirm eclipses unleash invisible monsters',
        'Shut school curtains and ban asking astronomy questions',
      ],
      exp: 'Article 51A(h) calls for developing scientific temper gently through clear demonstration and evidence without demeaning family elders.',
    },
    mr: {
      q: 'सूर्यग्रहणापूर्वी एक विद्यार्थी घरची अंधश्रद्धा सांगतो की ग्रहणात घराबाहेर पडल्यास वाईट परिणाम होतात. शिक्षकाने कुटुंबाचा अनादर न करता वैज्ञानिक दृष्टिकोन कसा रुजवावा?',
      opts: [
        'टॉर्च, चेंडू व गोटीच्या मॉडेलने सूर्य-चंद्र-पृथ्वी सावलीचे शास्त्रीय कारण समजावून सुरक्षित पिनहोल प्रक्षेपकाने ग्रहण पाहण्याचे प्रात्यक्षिक दाखवणे (कुटुंबाचा अपमान न करता सत्य मांडणे)',
        'विद्यार्थ्याच्या आजी-आजोबांची कठोर शब्दांत थट्टा करणे',
        'ग्रहणात अदृश्य राक्षस येतात यास होकार देणे',
        'खगोलीय प्रश्न विचारण्यास बंदी घालणे',
      ],
      exp: 'संविधानिक वैज्ञानिक दृष्टिकोन (कलम ५१A-h) प्रयोगाधारित पुराव्यांतून आणि संवेदनशील संवादातून रुजतो.',
    },
    hi: {
      q: 'सूर्यग्रहण से पूर्व एक बच्चा घर से सुनी धारणा बताता है कि ग्रहण में बाहर निकलने से भोजन विषैला या अशुभ हो जाता है। शिक्षक सम्मानपूर्वक वैज्ञानिक दृष्टिकोण कैसे विकसित करे?',
      opts: [
        'टॉर्च, गेंद व कंचे के मॉडल से सूर्य-चंद्र-पृथ्वी की छाया का सरल विज्ञान समझाना, सुरक्षित पिनहोल प्रोजेक्टर दिखाना और परिवार का उपहास किए बिना वैज्ञानिक तथ्य स्पष्ट करना',
        'बच्चे के बुजुर्गों का कठोर अपमान करना',
        'राक्षसों की बात का समर्थन करना',
        'खगोल संबंधी प्रश्न पूछना बंद कराना',
      ],
      exp: 'मूर्त मॉडल और सुरक्षित अवलोकन द्वारा बिना किसी का अपमान किए वैज्ञानिक दृष्टिकोण (अनुच्छेद 51A-h) विकसित किया जाता है।',
    },
  },
  {
    topic: 'Managing Outdoor Nature Walks Safely (Buddy System)',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'While organizing a local pond/park biodiversity walk for 35 Class 4 pupils, which safety & management protocol is essential?',
      opts: [
        'Clear visible boundaries, a Student Buddy Pair check-in system, first-aid kit, drinking water, pre-briefed "look don’t pluck/touch unknown wild berries" rules, and headcounts',
        'Let students scatter wherever they please for an hour solo',
        'Forbid drinking water during outdoor walks',
        'Leave first-aid supplies back in the headmaster’s locked office',
      ],
      exp: 'Clear boundaries, buddy pairs, and pre-agreed eco-safety habits keep outdoor exploration joyful and accident-free.',
    },
    mr: {
      q: '३५ विद्यार्थ्यांना जवळच्या उद्यान किंवा तलाव परिसरात निसर्ग-भ्रमंतीसाठी (Nature Walk) नेताना कोणती सुरक्षा व्यवस्था अत्यावश्यक आहे?',
      opts: [
        'स्पष्ट परिसराची मर्यादा, "जोडीदार प्रणाली" (Buddy System), प्रथमोपचार पेटी, पिण्याचे पाणी, अनोळखी फळे/कीटक न शिवण्याचे नियम व वेळोवेळी संख्यामोजणी',
        'मुलांना एकटेच दूर कुठेही भटकायला सोडून देणे',
        'भ्रमंतीत पाणी पिण्यास बंदी घालणे',
        'प्रथमोपचार पेटी शाळेतच कुलूपबंद ठेवणे',
      ],
      exp: 'नियोजित सुरक्षा व जोडीदार पद्धतीमुळे निसर्ग-सहल आनंददायी आणि पूर्णतः सुरक्षित राहते.',
    },
    hi: {
      q: '३५ छात्रों को पास के पार्क या तालाब की प्रकृति-सैर (Nature Walk) पर ले जाते समय कौन-सी सुरक्षा व्यवस्था अनिवार्य है?',
      opts: [
        'स्पष्ट सीमाएँ, सहपाठी जोड़ी प्रणाली (Buddy System), प्राथमिक चिकित्सा किट, पेयजल, अनजान पौधे/कीट न छूने के पूर्व-नियम और नियमित गिनती',
        'बच्चों को अकेले कहीं भी बिखरने देना',
        'पानी पीने पर रोक लगाना',
        'प्राथमिक चिकित्सा किट विद्यालय में छोड़ आना',
      ],
      exp: 'सुनिश्चित सीमाएँ, बडी सिस्टम और पूर्व-नियम बाहरी अधिगम को सुरक्षित व सुव्यवस्थित रखते हैं।',
    },
  },
  {
    topic: 'Why Primary EVS Homework Should Be Observational',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Which weekend EVS home task aligns best with Balbharati/NCF child-centric ideals?',
      opts: [
        '"Watch the Moon at 8 PM on Saturday & Sunday, sketch its shape, and ask one elder which regional festival falls this fortnight"',
        '"Copy the entire 6-page Water chapter neatly four times in cursive"',
        '"Download and memorize a 30-page college water engineering PDF"',
        '"Solve 40 identical fill-in-the-blank cramming sheets"',
      ],
      exp: 'Meaningful home tasks connect observation, sky-watching, kitchen curiosity, and family dialogue.',
    },
    mr: {
      q: 'बालभारती व NCF च्या बालकेंद्रित तत्त्वांशी सुसंगत असा आठवड्याच्या शेवटचा (Weekend) सर्वोत्तम EVS गृहपाठ कोणता?',
      opts: [
        '"शनिवारी व रविवारी रात्री ८ वाजता चंद्राचा आकार पाहून त्याचे चित्र काढा आणि घरी वडीलधाऱ्यांना या पंधरवड्यात कोणता सण आहे ते विचारा"',
        '"६ पानांचा पाठ सुंदर अक्षरात चार वेळा जसाचा तसा उतरवून आणा"',
        '"महाविद्यालयीन अभियांत्रिकीची ३० पाने पाठ करा"',
        '"४० सारख्याच गाळलेल्या जागा घोकून लिहा"',
      ],
      exp: 'निरीक्षण, आकाशदर्शन व कौटुंबिक संवादावर आधारित गृहपाठ मुलांसाठी आनंददायी व अर्थपूर्ण ठरतो.',
    },
    hi: {
      q: 'NCF के बाल-केंद्रित सिद्धांतों के अनुरूप सप्ताहांत का सबसे सार्थक EVS गृहकार्य कौन-सा होगा?',
      opts: [
        '"शनिवार व रविवार रात ८ बजे चंद्रमा का आकार देखकर चित्र बनाएँ और घर के बड़ों से इस पखवाड़े के त्योहार के बारे में पूछें"',
        '"६ पृष्ठ का पूरा पाठ चार बार सुंदर लिखावट में नकल करें"',
        '"३० पृष्ठ का कॉलेज इंजीनियरिंग नोट्स याद करें"',
        '"४० समान रिक्त स्थान रटकर लिखें"',
      ],
      exp: 'अवलोकन, प्रकृति-दर्शन और पारिवारिक संवाद पर आधारित गृहकार्य बोझ के बजाय जिज्ञासा व सीखने का विस्तार करता है।',
    },
  },
  {
    topic: 'Constructing Higher-Order EVS Assessment Questions',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Which unit-test question evaluates HIGHER-ORDER APPLICATION & ANALYSIS rather than simple rote recall?',
      opts: [
        '"Reema boiled pond water, poured it into an unwashed clay pot, and caught diarrhoea—diagnose what went wrong and recommend two safe practices"',
        '"Write the boiling point of water in Celsius."',
        '"Spell the word Evaporation five times."',
        '"Name any two rivers in Maharashtra."',
      ],
      exp: 'Diagnosing a realistic hygiene breakdown and prescribing preventive action checks genuine conceptual transfer.',
    },
    mr: {
      q: 'खालीलपैकी कोणता चाचणी प्रश्न केवळ पाठांतराऐवजी विद्यार्थ्यांच्या "उपयोजन व विश्लेषण" (Higher-Order Thinking) क्षमतेची तपासणी करतो?',
      opts: [
        '"रीमाने पाणी उकळून ते न धुतलेल्या मडक्यात ओतले व तिला हगवण झाली—नेमकी चूक कोठे झाली व दोन सुरक्षित उपाय सुचवा"',
        '"पाण्याचा उत्कलन बिंदू किती अंश सेल्सिअस असतो?"',
        '"बाष्पीभवन हा शब्द पाच वेळा लिहा."',
        '"महाराष्ट्रातील कोणत्याही दोन नद्यांची नावे लिहा."',
      ],
      exp: 'वास्तविक परिस्थितीतील त्रुटी ओळखून उपाय सुचवणे हा प्रश्न उपयोजन व चिकित्सक विचारांची चाचणी घेतो.',
    },
    hi: {
      q: 'निम्नलिखित में से कौन-सा प्रश्न केवल रटने के बजाय "अनुप्रयोग एवं विश्लेषण" (Higher-Order Thinking) का परीक्षण करता है?',
      opts: [
        '"रीमा ने पानी उबालकर बिना धुले घड़े में रख दिया और वह बीमार पड़ गई—बताइए गलती कहाँ हुई और दो सुरक्षित उपाय सुझाइए"',
        '"पानी का क्वथनांक कितने डिग्री सेल्सियस होता है?"',
        '"वाष्पीकरण शब्द पाँच बार लिखें।"',
        '"महाराष्ट्र की दो नदियों के नाम लिखें।"',
      ],
      exp: 'वास्तविक जीवन की समस्या का निदान कर सुरक्षित समाधान सुझाने वाले प्रश्न उच्च-स्तरीय चिंतन का आकलन करते हैं।',
    },
  },
  {
    topic: 'Teaching Puberty & Menstrual Hygiene Respectfully (Class 5)',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'In Class 5 health & hygiene discussions, when sensitive questions arise around growing bodies or menstrual hygiene (as addressed gently in national school health programmes), how should a teacher respond?',
      opts: [
        'Answer calmly, accurately, and respectfully using biological facts, affirming natural growth, clean pad/cloth hygiene, and eliminating shame or stigma',
        'Shush learners angrily calling body questions "bad manners"',
        'Invent false superstitious stories to stop curiosity',
        'Mock growing students in front of peers',
      ],
      exp: 'Dignified, factual, stigma-free health guidance equips older primary pupils with safe body literacy and empathy.',
    },
    mr: {
      q: 'इयत्ता ५ वीच्या आरोग्य व स्वच्छता चर्चेदरम्यान वाढत्या शरीरातील बदल किंवा मासिक पाळी स्वच्छतेबद्दल प्रश्न विचारल्यास शिक्षकाने कसा प्रतिसाद द्यावा?',
      opts: [
        'कोणताही संकोच किंवा लाज न बाळगता शांतपणे अचूक शास्त्रीय माहिती देऊन हा नैसर्गिक बदल असून स्वच्छता व सॅनिटरी पॅड/स्वच्छ कापडाचा वापर किती महत्त्वाचा आहे हे समजावून सांगावे',
        '"असले वाईट प्रश्न विचारू नका!" असे रागावून गप्प करावे',
        'भीतीपोटी खोट्या अंधश्रद्धा सांगाव्यात',
        'वर्गासमोर विद्यार्थ्यांची थट्टा करावी',
      ],
      exp: 'सन्मानजनक, विज्ञाननिष्ठ व लाजरहित आरोग्य संवाद मुलांना सुरक्षित व निरोगी किशोरवयाकडे नेतो.',
    },
    hi: {
      q: 'कक्षा ५ की स्वास्थ्य एवं स्वच्छता चर्चा में शारीरिक परिवर्तनों या मासिक धर्म स्वच्छता से जुड़े प्रश्न आने पर शिक्षक को कैसी प्रतिक्रिया देनी चाहिए?',
      opts: [
        'बिना झिझक या शर्म के शांत, सटीक वैज्ञानिक जानकारी देना, इसे प्राकृतिक प्रक्रिया बताकर स्वच्छता समझाना और संकोच/भ्रांतियाँ दूर करना',
        '"बुरे प्रश्न मत पूछो" कहकर डाँटना',
        'झूठी अंधविश्वासी बातें बताना',
        'सहपाठियों के सामने उपहास करना',
      ],
      exp: 'गरिमापूर्ण, तथ्यपरक और कलंक-मुक्त स्वास्थ्य संवाद बच्चों में सही शरीर-साक्षरता व स्वच्छता आदतें विकसित करता है।',
    },
  },
  {
    topic: 'Avoiding Anthropomorphism vs Productive Metaphor',
    pattern: 'Pedagogical',
    difficulty: 'Difficult',
    en: {
      q: 'A Class 3 child asks: "Does a sunflower FEEL happy when morning sunlight wakes it up?" How should an EVS teacher handle this animistic/anthropomorphic question skilfully?',
      opts: [
        'Appreciate the gentle empathy warmly while gently clarifying scientific fact: plants do not have human feelings/brains, yet respond naturally to sunlight through phototropism',
        'Declare plants possess human sorrow and weep real tears',
        'Ridicule the child’s question for being unscientific',
        'Ban all poetic nature metaphors completely',
      ],
      exp: 'Bridging Piagetian early animism gracefully honours empathy while introducing accurate biological causality.',
    },
    mr: {
      q: 'इयत्ता ३ रीचा विद्यार्थी विचारतो: "सकाळचा सूर्य पाहून सूर्यफूल माणसासारखे आनंदी होते का?" या बालसुलभ सचेतनवादी (Animistic) प्रश्नास शिक्षक कसे उत्तर देईल?',
      opts: [
        'मुलाच्या निसर्गप्रेमाचे कौतुक करत हळुवारपणे वैज्ञानिक तथ्य स्पष्ट करणे: वनस्पतींना मानवी मेंदू किंवा भावना नसतात, पण प्रकाशाच्या दिशेने वळण्याचा नैसर्गिक प्रतिसाद (Phototropism) असतो',
        'झाडे खरोखर माणसांसारखी रडतात असे सांगणे',
        'हा प्रश्न मूर्खपणाचा ठरवून थट्टा करणे',
        'निसर्गावरील कविता पूर्णपणे बंद करणे',
      ],
      exp: 'पियाजेच्या सचेतनवादातून शास्त्रीय कारणाकडे हळुवारपणे नेणे संवेदनशीलता व अचूक विज्ञान यांचा समतोल साधते.',
    },
    hi: {
      q: 'कक्षा ३ का बच्चा पूछता है: "क्या सुबह की धूप देखकर सूरजमुखी खुश होता है?" इस जीववादी (Animistic) प्रश्न का शिक्षक कैसे उत्तर दे?',
      opts: [
        'बच्चे की संवेदनशीलता की सराहना करते हुए सहजता से वैज्ञानिक तथ्य बताना कि पौधों में मस्तिष्क या मानवी भावनाएँ नहीं होतीं, वे प्रकाश के प्रति प्राकृतिक प्रतिक्रिया (प्रकाशानुवर्तन) करते हैं',
        'पौधों में सचमुच मानवी दुःख-सुख होने का दावा करना',
        'प्रश्न को मूर्खतापूर्ण कहकर हँसना',
        'प्रकृति की सभी कविताएँ बंद करना',
      ],
      exp: 'पियाजे की प्रारंभिक जीववादी सोच से बच्चों की कोमल संवेदनशीलता का सम्मान करते हुए उन्हें धीरे-धीरे सटीक वैज्ञानिक कारण की ओर ले जाना चाहिए।',
    },
  },
  {
    topic: 'Building Junior People’s Biodiversity Register (PBR)',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Guiding Class 5 groups to compile a "School/Village Biodiversity Register" documenting local butterflies, frogs, medicinal weeds, and elders’ names for rare crops develops:',
      opts: [
        'Scientific documentation skills, pride in local ecology, conservation awareness, and citizen-science participation',
        'Commercial smuggling of rare orchids',
        'Mechanical copying from foreign encyclopedias',
        'Disinterest in surrounding village life',
      ],
      exp: 'Junior Biodiversity Registers empower learners as young citizen scientists valuing local ecological wealth.',
    },
    mr: {
      q: 'इयत्ता ५ वीच्या मुलांकडून गावातील फुलपाखरे, बेडूक, औषधी वनस्पती आणि दुर्मीळ पिकांची स्थानिक नावे नोंदवणारी "शाळा/गाव जैवविविधता नोंदवही" (Biodiversity Register) तयार करून घेतल्याने काय विकसित होते?',
      opts: [
        'वैज्ञानिक नोंदी ठेवण्याचे कौशल्य, स्थानिक पर्यावरणाविषयी अभिमान, संवर्धन जाणीव आणि नागरिक-विज्ञान (Citizen Science) सहभाग',
        'दुर्मीळ वनस्पतींची तस्करी',
        'परदेशी विश्वकोशाची नक्कल',
        'गावाविषयी अनास्था',
      ],
      exp: 'स्थानिक जैवविविधता नोंदवही मुलांना आपल्या परिसराचे जबाबदार अभ्यासक व संरक्षक बनवते.',
    },
    hi: {
      q: 'कक्षा ५ के बच्चों द्वारा अपने गाँव/विद्यालय की तितलियों, मेंढकों, औषधीय पौधों और स्थानीय फसलों का "जैव-विविधता रजिस्टर" (Biodiversity Register) तैयार कराने से क्या विकसित होता है?',
      opts: [
        'वैज्ञानिक प्रलेखन कौशल, स्थानीय पारिस्थितिकी पर गर्व, संरक्षण चेतना और नागरिक-विज्ञान भागीदारी',
        'दुर्लभ पौधों की तस्करी',
        'विदेशी किताबों की नकल',
        'ग्रामीण परिवेश से अलगाव',
      ],
      exp: 'जूनियर जैव-विविधता रजिस्टर बच्चों को अपने स्थानीय पारिस्थितिक तंत्र के सक्रिय नागरिक वैज्ञानिक व संरक्षक के रूप में तैयार करता है।',
    },
  },
  {
    topic: 'Using Venn Diagrams to Compare Biological Groups',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Asking pupils to sort cards into two overlapping circles—Left: "Lives on Land", Right: "Lives in Water", Centre Overlap: "Lives comfortably in BOTH"—with Frogs, Crocodiles, and Salamanders placed inside the centre teaches:',
      opts: [
        'Graphic comparative classification and systematic logical categorization using Venn diagrams',
        'Solving algebraic quadratics',
        'Drawing national flags',
        'Memorizing telephone directories',
      ],
      exp: 'Venn diagrams visually clarify shared versus distinct attributes across overlapping habitats and food habits (Herbivores/Carnivores/Omnivores).',
    },
    mr: {
      q: '"जमिनीवर राहणारे" व "पाण्यात राहणारे" अशा दोन परस्परछेदक वर्तुळांच्या मध्यभागी बेडूक, मगर व कासव ठेवण्याची कृती (Venn Diagram) मुलांना काय शिकवते?',
      opts: [
        'वैशिष्ट्यांच्या आधारे तुलनात्मक वर्गीकरण व तार्किक गटवारी करण्याची दृश्य पद्धत',
        'वर्गसमीकरणे सोडवणे',
        'राष्ट्रध्वज काढणे',
        'दूरध्वनी क्रमांक पाठ करणे',
      ],
      exp: 'व्हेन आकृतीमुळे उभयचर किंवा मिश्राहारी प्राण्यांचे सामायिक व वेगळे गुणधर्म एका दृष्टिक्षेपात स्पष्ट होतात.',
    },
    hi: {
      q: '"स्थल पर रहने वाले" और "जल में रहने वाले" दो परस्पर काटते वृत्तों के मध्य भाग में मेंढक, मगरमच्छ व कछुए को रखना (वेन आरेख) बच्चों को क्या सिखाता है?',
      opts: [
        'समान व भिन्न गुणों के आधार पर तुलनात्मक वर्गीकरण तथा तार्किक श्रेणीबद्धता',
        'द्विघात समीकरण हल करना',
        'ध्वज बनाना',
        'फोन नंबर याद करना',
      ],
      exp: 'वेन आरेख उभयचर आवास या शाकाहारी-मांसाहारी-सर्वाहारी जैसे साझा गुणों को दृश्य रूप से स्पष्ट करते हैं।',
    },
  },
  {
    topic: 'Simulated Courtyard Road-Safety & Traffic Signs',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Drawing chalk zebra crossings, miniature roundabouts, and cardboard road signs (School Ahead, No Horn, Red/Amber/Green signals) in the courtyard lets learners practise:',
      opts: [
        'Kinesthetic civic road-safety rules, sign literacy, and empathetic pedestrian-driver habits safely',
        'Driving real motorcycles inside classrooms',
        'Breaking traffic lights playfully',
        'Skipping health and safety topics',
      ],
      exp: 'Simulated role-play embeds lifelong pedestrian crossing, helmet, and traffic signal compliance naturally.',
    },
    mr: {
      q: 'शाळेच्या मैदानावर खडूने झेब्रा क्रॉसिंग, गोल चौक व पुठ्ठ्याची वाहतूक चिन्हे (पुढे शाळा, नो हॉर्न, सिग्नल) तयार करून घेतलेल्या अभ्यासातून काय साध्य होते?',
      opts: [
        'प्रत्यक्ष कृतीतून रस्ते सुरक्षा नियम, वाहतूक चिन्ह साक्षरता व पादचारी-वाहनचालक संवेदनशीलता सुरक्षितपणे रुजते',
        'वर्गात मोटारसायकल चालवणे',
        'सिग्नल तोडण्याची मजा घेणे',
        'सुरक्षा धडे वगळणे',
      ],
      exp: 'अभिनयात्मक सराव मुलांमध्ये रस्ता ओलांडण्याचे नियम व वाहतूक शिस्त कायमस्वरूपी रुजवतो.',
    },
    hi: {
      q: 'विद्यालय प्रांगण में चॉक से ज़ेबरा क्रॉसिंग, चौराहा और गत्ते के यातायात चिह्न (आगे स्कूल है, नो हॉर्न, सिग्नल) बनाकर अभ्यास कराने से क्या लाभ होता है?',
      opts: [
        'क्रियात्मक अनुभव द्वारा सड़क सुरक्षा नियमों, यातायात संकेत साक्षरता और संवेदनशील नागरिक व्यवहार का सुरक्षित अभ्यास',
        'कक्षा में मोटरसाइकिल चलाना',
        'सिग्नल तोड़ना सीखना',
        'सुरक्षा पाठ छोड़ना',
      ],
      exp: 'सिमुलेशन और भूमिका-निर्वाह बच्चों में जीवनपर्यंत सुरक्षित सड़क व्यवहार और यातायात अनुशासन विकसित करते हैं।',
    },
  },
  {
    topic: 'Rotating "Eco-Energy & Water Monitor" Class Duties',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why is rotating a weekly student "Light, Fan & Tap Stewardship Duty" across ALL children better than lecturing on energy bills?',
      opts: [
        'Shared democratic responsibility turns environmental conservation into lived daily classroom habit and pride without singling out one pupil forever',
        'Teachers avoid touching electric switches completely',
        'Students clean school toilets instead of studying',
        'Punishes weak scorers with monitor chores',
      ],
      exp: 'Rotating stewardship embeds democratic participation and turns conservation principles into effortless daily routines.',
    },
    mr: {
      q: 'दर आठवड्याला सर्व विद्यार्थ्यांमध्ये आलटून-पालटून "वीज, पंखे व नळ संरक्षण दक्षता" जबाबदारी वाटून देणे नुसत्या भाषणापेक्षा अधिक प्रभावी का ठरते?',
      opts: [
        'समान लोकशाही सहभागातून ऊर्जा व पाणी वाचवणे ही रोजची सवय आणि सामूहिक अभिमानाची कृती बनते',
        'शिक्षकांना बटण दाबावे लागू नये म्हणून',
        'अभ्यासाऐवजी स्वच्छता काम करून घेण्यासाठी',
        'कमी गुण मिळणाऱ्यांना शिक्षा देण्यासाठी',
      ],
      exp: 'आळीपाळीने मिळणाऱ्या जबाबदारीमुळे प्रत्येक मूल स्वतःला पर्यावरणाचा कृतिशील रक्षक मानू लागते.',
    },
    hi: {
      q: 'सप्ताह में बारी-बारी से सभी छात्रों को "बिजली, पंखा व नल संरक्षण दायित्व" सौंपना केवल ऊर्जा बिल पर भाषण देने से बेहतर क्यों है?',
      opts: [
        'साझा लोकतांत्रिक जिम्मेदारी से ऊर्जा व जल संरक्षण दैनिक आदत और सामूहिक गर्व का व्यवहार बन जाता है',
        'शिक्षक को स्विच न छूना पड़े इसलिए',
        'पढ़ाई बंद कराने हेतु',
        'कमजोर छात्रों को दंड देने हेतु',
      ],
      exp: 'बारी-बारी से मिलने वाला उत्तरदायित्व हर बच्चे में पर्यावरणीय संरक्षण की व्यावहारिक आदत और स्वामित्व विकसित करता है।',
    },
  },
  {
    topic: 'Supporting Hearing-Impaired Learners in EVS',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'To include a learner with moderate-to-severe hearing impairment seamlessly during a noisy Class 4 Water Cycle group discussion, what adaptation is essential?',
      opts: [
        'Seat clearly facing the teacher’s well-lit lip/expression view, pair live visual flowcharts, caption keywords on the board, and assign visual-tactile roles inside small groups',
        'Shout loudly right behind the learner’s neck',
        'Exclude the learner from group science experiments',
        'Speak rapidly while facing away toward the blackboard',
      ],
      exp: 'Clear sightlines, visual graphic organizers, written cue cards, and cooperative visual roles enable equal conceptual participation.',
    },
    mr: {
      q: 'श्रवणदोष असलेल्या विद्यार्थ्यास "जलचक्र" या गटचर्चेत सहज सामावून घेण्यासाठी शिक्षकाने कोणती उपाययोजना करावी?',
      opts: [
        'विद्यार्थ्याला शिक्षकाचा चेहरा व ओठांच्या हालचाली स्पष्ट दिसतील असे समोर बसवणे, दृश्य प्रवाह-तक्ते (Flowcharts), फळ्यावर मुख्य शब्द लिहिणे व गटात दृश्य-स्पर्श भूमिका देणे',
        'मुलाच्या मानेमागे मोठ्याने ओरडणे',
        'गटप्रयोगातून मुलास वगळणे',
        'फळ्याकडे पाठ फिरवून वेगाने बोलणे',
      ],
      exp: 'दृश्य साधने, स्पष्ट संपर्क व गटसहकार्यामुळे श्रवणदोष असलेला विद्यार्थी पूर्ण क्षमतेने शिकू शकतो.',
    },
    hi: {
      q: 'श्रवण बाधित शिक्षार्थी को "जल चक्र" समूह चर्चा में सहज सम्मिलित करने के लिए कौन-सा अनुकूलन आवश्यक है?',
      opts: [
        'शिक्षार्थी को शिक्षक के चेहरे व होंठ स्पष्ट दिखने वाली सामने की सीट पर बैठाना, दृश्य फ्लोचार्ट, बोर्ड पर मुख्य शब्द लिखना व समूह में दृश्य-स्पर्श कार्य देना',
        'बच्चे के पीछे जोर से चिल्लाना',
        'प्रयोग से अलग कर देना',
        'श्यामपट्ट की ओर मुँह करके तेजी से बोलना',
      ],
      exp: 'स्पष्ट दृश्य संपर्क, फ्लोचार्ट, लिखित संकेत शब्द और सहयोगी भूमिकाएँ श्रवण बाधित छात्रों की पूर्ण भागीदारी सुनिश्चित करती हैं।',
    },
  },
  {
    topic: 'Accommodating Learners With ADHD / High Activity Needs',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 3 learner with Attention-Deficit Hyperactivity traits struggles sitting motionless through 35-minute lecture reading. Which EVS teaching adaptation channels their energy positively?',
      opts: [
        'Break tasks into brief 8–10 minute active chunks with hands-on specimen sorting, purposeful movement (collecting rain-gauge cup, handing leaf cards), and clear visual checklists',
        'Tie or lock the child in a quiet corner chair for disrespect',
        'Give three times more silent seated handwriting worksheets',
        'Send the child home whenever they fidget',
      ],
      exp: 'Channeling kinetic movement into structured, brief hands-on errands transforms restlessness into productive classroom contribution.',
    },
    mr: {
      q: 'लक्ष विचलित होणाऱ्या व अतिचंचल (ADHD) इयत्ता ३ रीच्या विद्यार्थ्यास ३५ मिनिटे एका जागी शांत बसणे कठीण जाते. त्याची ऊर्जा सकारात्मकरीत्या कशी वळवावी?',
      opts: [
        '८–१० मिनिटांच्या लहान कृतीशील टप्प्यांत गटवारी करणे, बिया निवडणे, पर्जन्यमापक आणणे किंवा कार्डे वाटणे अशा हेतुपूर्ण हालचाली व स्पष्ट दृश्य यादी देणे',
        'मुलाला एका कोपऱ्यात खुर्चीवर बांधून/कोंडून ठेवणे',
        'तीनपट जास्त शांत बसून लिहिण्याचा गृहपाठ देणे',
        'अस्वस्थ झाल्यावर घरी पाठवणे',
      ],
      exp: 'अतिचंचल मुलांच्या हालचालींना अर्थपूर्ण व अल्पकालीन कृतीकार्याची जोड दिल्यास त्यांचे लक्ष व सहभाग उत्तम वाढतो.',
    },
    hi: {
      q: 'कक्षा ३ का एक अति-सक्रिय (ADHD) बच्चा ३५ मिनट तक एक स्थान पर चुप बैठकर पढ़ने में कठिनाई महसूस करता है। शिक्षक उसकी ऊर्जा को सकारात्मक दिशा कैसे दे?',
      opts: [
        'कार्य को ८–१० मिनट के छोटे सक्रिय खंडों में बाँटना, बीज छँटाई, वर्षा-मापी लाना या कार्ड बाँटने जैसे सार्थक गतिशील कार्य व स्पष्ट दृश्य जांच-सूची देना',
        'कोने में कुर्सी पर सख्ती से बाँधकर बैठाना',
        'तीन गुना मौन लेखन कार्य देना',
        'हिलने-डुलने पर घर भेज देना',
      ],
      exp: 'संरचित छोटे सक्रिय चरण और उद्देश्यपूर्ण शारीरिक कार्य अति-सक्रिय बच्चों के ध्यान और सहभागिता में उल्लेखनीय सुधार करते हैं।',
    },
  },
  {
    topic: 'Evaluating Puppets & Posters Authentically in EVS',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'While assessing student-designed sock puppets performing "Why Sparrow Numbers Dropped", what criterion deserves the HIGHEST rubric weight?',
      opts: [
        'Accuracy and empathy of ecological reasoning (loss of nesting eaves, mobile towers, pesticide-scarce insects, summer water bowls) articulated by the learners',
        'Expensive glitter sequins glued onto socks',
        'Memorizing an adult’s printed script word-for-word',
        'Whether parents stitched the puppet silently at night',
      ],
      exp: 'In EVS, artistic media serve conceptual communication and ecological insight—never glitter cost.',
    },
    mr: {
      q: '"चिमण्यांची संख्या का घटली?" यावर विद्यार्थ्यांनी बनवलेल्या बाहुली नाट्याचे (Puppet Show) मूल्यमापन करताना कोणत्या निकषास सर्वाधिक महत्त्व असावे?',
      opts: [
        'विद्यार्थ्यांनी मांडलेले अचूक पर्यावरणीय कारणमीमांसा व संवेदनशीलता (घरट्यांच्या जागांचा अभाव, कीटकनाशके, उन्हाळ्यातील पाणी) आणि स्वतःचे सादरीकरण',
        'बाहुलीवर लावलेली महागडी चमकदार नक्षी',
        'पालकांनी लिहून दिलेले पाठ केलेले भाषण',
        'रात्री पालकांनी शिवलेली बाहुली',
      ],
      exp: 'कलाकृतीच्या बाह्य झगमगाटापेक्षा विद्यार्थ्याची पर्यावरणीय समज व स्वतंत्र अभिव्यक्ती यांना सर्वोच्च प्राधान्य असावे.',
    },
    hi: {
      q: '"गौरैया की संख्या क्यों घटी?" विषय पर छात्रों के कठपुतली नाटक (Puppet Show) का मूल्यांकन करते समय किस मानदंड को सर्वाधिक महत्व मिलना चाहिए?',
      opts: [
        'छात्रों द्वारा व्यक्त सटीक पारिस्थितिक कारण (घोंसलों की कमी, कीटनाशक, गर्मी में जल अभाव) और संवेदनशील समझ',
        'कठपुतली पर चिपकी महँगी चमक',
        'माता-पिता द्वारा लिखी स्क्रिप्ट को शब्दशः रटना',
        'अभिभावकों द्वारा सिली गई सजावट',
      ],
      exp: 'EVS में कला माध्यम का मूल्यांकन सजावट के खर्च पर नहीं, बल्कि बच्चे की वैचारिक व पारिस्थितिक समझ की स्पष्टता पर होना चाहिए।',
    },
  },
  {
    topic: 'Storytelling & Biographies of Diverse Role Models',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why do Class 4 & 5 EVS textbooks weave true biographical stories of Sunita Williams, Karnam Malleswari, Suryamani ("Girl Star" Jharkhand), and Lt. Cdr. Wahida Prism?',
      opts: [
        'To break caste, rural-urban, and gender ceilings, inspiring every child—especially girls and marginalized pupils—toward science, sports, ecology, and civic courage',
        'To distract children from water and soil lessons',
        'To fill blank chapter pages quickly',
        'To celebrate only historical kings and warriors',
      ],
      exp: 'Relatable grassroots heroes prove determination, education, and ecological commitment transcend gender and background barriers.',
    },
    mr: {
      q: 'इयत्ता ४ थी–५ वीच्या EVS पाठ्यपुस्तकांत सुनीता विल्यम्स, कर्णम मल्लेश्वरी, सूर्यमणी (झारखंड) आणि डॉ. वहिदा प्रिझम यांच्या सत्य जीवनकथा का समाविष्ट केल्या आहेत?',
      opts: [
        'लिंगभेद, ग्रामीण-शहरी व सामाजिक बंधने तोडून सर्वच मुलांना—विशेषतः मुलींना—विज्ञान, क्रीडा, जंगल संवर्धन व देशसेवेची प्रेरणा मिळावी म्हणून',
        'पाणी व मातीचे धडे विसरण्यासाठी',
        'पुस्तकाची पाने भरण्यासाठी',
        'फक्त राजांचीच स्तुती करण्यासाठी',
      ],
      exp: 'खऱ्या प्रेरणादायी व्यक्तिमत्त्वांच्या कथा समान संधी, आत्मविश्वास व निसर्ग-रक्षणाचा आदर्श उभा करतात.',
    },
    hi: {
      q: 'कक्षा ४ व ५ की EVS पाठ्यपुस्तकों में सुनीता विलियम्स, कर्णम मल्लेश्वरी, सूर्यमणि (झारखंड) व वहीदा प्रिज्म की सच्ची जीवन-कथाएँ क्यों शामिल की गई हैं?',
      opts: [
        'लैंगिक, ग्रामीण-शहरी व सामाजिक रूढ़ियों को तोड़कर सभी बच्चों—विशेषकर बालिकाओं—में विज्ञान, खेल, वन संरक्षण और साहस की प्रेरणा जगाने हेतु',
        'जल व मिट्टी के पाठ टालने हेतु',
        'पन्ने भरने हेतु',
        'केवल राजाओं की कहानियाँ बताने हेतु',
      ],
      exp: 'वास्तविक नायिकाओं की जीवन-कथाएँ समान अवसर, आत्मविश्वास और पर्यावरणीय नेतृत्व का जीवंत आदर्श प्रस्तुत करती हैं।',
    },
  },
  {
    topic: 'Brainstorming Rules Before Eco-Campaign Action',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Before designing a "Zero Plastic Canteen Day", the teacher leads a 10-minute Brainstorming session asking learners for feasible ideas. What is the GOLDEN rule during the initial brainstorming stage?',
      opts: [
        'Welcome ALL student ideas without judging, mocking, or filtering prematurely—evaluate feasibility only in the second sorting step',
        'Shoot down unconventional ideas immediately so only the teacher’s idea wins',
        'Allow only the class monitor to speak',
        'Force everyone to write silent dictionary paragraphs',
      ],
      exp: 'Osborn’s brainstorming defers criticism during ideation so creative practical alternatives flow freely.',
    },
    mr: {
      q: '"प्लास्टिकमुक्त शाळा दिन" आखण्यापूर्वी शिक्षिका १० मिनिटे "विचारमंथन" (Brainstorming) सत्र घेतात. सुरुवातीच्या विचारमंथन टप्प्यातील सुवर्णनियम कोणता?',
      opts: [
        'सुरुवातीला कोणतीही टीका, थट्टा किंवा नकार न देता विद्यार्थ्यांच्या सर्वच कल्पनांचे खुले स्वागत करणे — व्यवहार्यता तपासणी नंतरच्या टप्प्यात करणे',
        'वेगळी कल्पना सुचवताच ती तात्काळ चुकीची ठरवून फेटाळणे',
        'फक्त वर्गप्रमुखालाच बोलू देणे',
        'शांतपणे शब्दकोश लिहायला सांगणे',
      ],
      exp: 'टीका विरहित मोकळे विचारमंथन नवीन व सर्जनशील समस्या-निराकरण पर्यायांना जन्म देते.',
    },
    hi: {
      q: '"प्लास्टिक-मुक्त कैंटीन दिवस" की योजना से पहले शिक्षिका १० मिनट का "विचार-मंथन" (Brainstorming) सत्र रखती हैं। प्रारंभिक विचार-मंथन का स्वर्णिम नियम क्या है?',
      opts: [
        'शुरुआत में बिना आलोचना, उपहास या रोक-टोक के सभी बच्चों के विचारों का खुला स्वागत करना — व्यावहारिकता की जाँच दूसरे चरण में करना',
        'अनोखे विचार आते ही खारिज कर देना',
        'केवल मॉनिटर को बोलने देना',
        'मौन लेखन कराना',
      ],
      exp: 'ऑसबोर्न के विचार-मंथन सिद्धांत के अनुसार प्रारंभिक चरण में आलोचना न करने से मौलिक व रचनात्मक समाधान सहजता से आते हैं।',
    },
  },
  {
    topic: 'Observing Folk Proverbs & Monsoon Agricultural Calendars',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Asking rural and semi-urban students to collect Marathi/Hindi agricultural proverbs or Nakshatra rain sayings (e.g., Rohini, Mrig, Ashlesha rains) from elders enriches Class 5 EVS by:',
      opts: [
        'Bridging indigenous seasonal observation and cultural heritage respectfully with meteorological concepts of monsoon winds and cropping cycles',
        'Replacing rain gauges with superstitious fortune telling',
        'Proving modern weather satellites are fake',
        'Restricting farmers strictly to city classrooms',
      ],
      exp: 'Traditional Nakshatra lore captures centuries of keen seasonal phenology that dialogues constructively with modern science.',
    },
    mr: {
      q: 'मुलांना घरी वडीलधाऱ्यांकडून मृग, रोहिणी, हस्त नक्षत्राच्या पावसाविषयीच्या पारंपरिक म्हणी व कृषी संकेत गोळा करायला सांगण्याचा शैक्षणिक फायदा काय?',
      opts: [
        'पारंपरिक ऋतू-निरीक्षण व सांस्कृतिक वारसा आधुनिक हवामानशास्त्र आणि पीकचक्राशी आदरपूर्वक जोडला जातो',
        'पर्जन्यमापक बंद करून भविष्यकथन करणे',
        'हवामान उपग्रह खोटे सिद्ध करणे',
        'शेती माहिती बंद करणे',
      ],
      exp: 'लोकपरंपरेतील ऋतूनिरीक्षण आणि आधुनिक हवामानशास्त्र यांची सांगड घातल्यास विषय अधिक जिवंत व सांस्कृतिकदृष्ट्या समृद्ध होतो.',
    },
    hi: {
      q: 'बच्चों को घर से मृग, रोहिणी, हस्त नक्षत्र वर्षा से जुड़ी पारंपरिक लोक-कहावतें व कृषि संकेत संकलित करने का कार्य देने से EVS शिक्षण कैसे समृद्ध होता है?',
      opts: [
        'पारंपरिक मौसमी अवलोकन व सांस्कृतिक धरोहर को आधुनिक मौसम विज्ञान और फसल चक्र के साथ सम्मानपूर्वक जोड़ा जा सकता है',
        'वर्षा-मापी यंत्र हटाकर भविष्यवाणी करना',
        'मौसम उपग्रहों को झूठा बताना',
        'कृषि ज्ञान नकारना',
      ],
      exp: 'लोक-परंपरा में संचित ऋतु-अवलोकन और आधुनिक विज्ञान के बीच संवाद स्थापित करना शिक्षण को सार्थक व सांस्कृतिक रूप से जुड़ा बनाता है।',
    },
  },
  {
    topic: 'Neighbourhood Survey & Data Ethics With Respect',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'When assigning Class 5 pupils a neighbourhood survey ("Which cooking fuel—LPG, Biogas, Firewood, Solar—does your family use most?"), what ethical guideline must precede going out?',
      opts: [
        'Ask politely after explaining school purpose, respect anyone declining to answer, record responses honestly without judging poorer firewood households, and maintain anonymity on charts',
        'Demand entry into neighbours’ kitchens forcibly',
        'Publicly list names of poor households using firewood on school noticeboards',
        'Invent fake numbers sitting on the playground bench',
      ],
      exp: 'Community research teaches civic courtesy, confidentiality, data honesty, and dignity without shaming economic status.',
    },
    mr: {
      q: 'परिसरातील घरांत कोणते इंधन (LPG, बायोगॅस, लाकूड, सौर) वापरले जाते याचे सर्वेक्षण करण्यापूर्वी मुलांना कोणते नैतिक नियम समजावून सांगावेत?',
      opts: [
        'विनम्रपणे शाळेचा हेतू सांगून परवानगी घेणे, माहिती न देऊ इच्छिणाऱ्यांचा आदर करणे, चूल वापरणाऱ्या गरीब कुटुंबांविषयी पूर्वग्रह न ठेवणे व नावे गोपनीय ठेवून खरी आकडेवारी नोंदवणे',
        'शेजाऱ्यांच्या स्वयंपाकघरात जबरदस्तीने शिरणे',
        'चूल वापरणाऱ्यांची नावे फलकावर जाहीर करणे',
        'मैदानावर बसूनच खोटी आकडेवारी लिहिणे',
      ],
      exp: 'शालेय सर्वेक्षणांतून विनम्रता, गोपनीयता, प्रामाणिकपणा व सामाजिक संवेदनशीलता ही नागरी मूल्ये रुजतात.',
    },
    hi: {
      q: 'आस-पड़ोस में खाना पकाने के ईंधन (LPG, बायोगैस, लकड़ी, सौर) का सर्वेक्षण करने से पहले बच्चों को कौन-से नैतिक नियम सिखाने चाहिए?',
      opts: [
        'विनम्रता से उद्देश्य बताकर अनुमति लेना, उत्तर न देने वालों का सम्मान करना, लकड़ी उपयोग करने वाले गरीब परिवारों को हेय न समझना और नाम गुप्त रखकर सच्चे आँकड़े दर्ज करना',
        'जबरदस्ती रसोई में घुसना',
        'गरीब परिवारों के नाम सूचना-पट्ट पर लिखना',
        'बैठकर मनगढ़ंत आँकड़े भरना',
      ],
      exp: 'सामुदायिक सर्वेक्षण बच्चों में विनम्रता, गोपनीयता, डेटा ईमानदारी और सामाजिक संवेदनशीलता विकसित करते हैं।',
    },
  },
  {
    topic: 'Parent & Grandparent Community Seed Exhibition',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Hosting an afternoon "Heirloom Seed & Traditional Food Fair" where parents and village elders display jowar/bajra varieties, millet recipes, and organic storage wisdom strengthens EVS primarily by:',
      opts: [
        'Building warm home–school partnership, validating community wisdom, and motivating learners through authentic audience sharing',
        'Turning schools into profit-only grocery shops',
        'Making teachers avoid planning any lessons all semester',
        'Competing over who owns costliest packaged cereal',
      ],
      exp: 'Community showcases honor parents as co-educators and foster living cultural preservation of biodiversity.',
    },
    mr: {
      q: 'पालक व गावातील ज्येष्ठांसह "पारंपरिक बियाणे व पौष्टिक तृणधान्य प्रदर्शन" भरवल्याने EVS शिक्षण कसे बळकट होते?',
      opts: [
        'शाळा–पालक–समाज सहभाग वाढतो, स्थानिक बियाणे-ज्ञानाचा सन्मान होतो आणि खऱ्या श्रोत्यांसमोर सादरीकरणातून मुलांचा उत्साह वाढतो',
        'शाळेचे नफा कमावणाऱ्या किराणा दुकानात रूपांतर होते',
        'शिक्षकांना काहीच शिकवावे लागत नाही',
        'महागड्या पॅकबंद खाद्यपदार्थांची स्पर्धा लागते',
      ],
      exp: 'समाज व पालक सहभागातून शालेय शिक्षण अधिक जिवंत, स्थानिक ज्ञानाशी जोडलेले व प्रेरणादायी बनते.',
    },
    hi: {
      q: 'अभिभावकों व बुजुर्गों के साथ "पारंपरिक बीज एवं मोटा अनाज मेला" आयोजित करने से EVS शिक्षण को मुख्यतः क्या लाभ होता है?',
      opts: [
        'विद्यालय–अभिभावक–समुदाय साझेदारी मजबूत होती है, स्थानीय ज्ञान का सम्मान होता है और वास्तविक दर्शकों के समक्ष बच्चों का उत्साह बढ़ता है',
        'विद्यालय किराने की दुकान बन जाता है',
        'शिक्षकों को पढ़ाना नहीं पड़ता',
        'महँगे पैकेटबंद भोजन की होड़ लगती है',
      ],
      exp: 'समुदाय और अभिभावकों की सक्रिय सहभागिता शिक्षा को जीवंत, प्रासंगिक और सांस्कृतिक जड़ों से जोड़ती है।',
    },
  },
  {
    topic: 'Using Riddles & Crossword Puzzles for EVS Consolidation',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Closing a chapter on "Plant Roots, Stems & Leaves" with fun riddles ("I live underground, drink mineral water, and stop soil sliding down hills—who am I?") serves to:',
      opts: [
        'Reinforce conceptual attributes playfully, sharpen inferential clue-matching, and make revision stress-free',
        'Replace hands-on plant observation completely from Day 1',
        'Punish slow writers publicly',
        'Eliminate the need for scientific reasoning',
      ],
      exp: 'Riddles engage inferential recall joyfully after hands-on observation has established concrete meaning.',
    },
    mr: {
      q: '"वनस्पतींचे अवयव" हा पाठ संपल्यावर ("मी जमिनीखाली राहते, क्षार व पाणी शोषते आणि मातीची धूप थांबवते—मी कोण?") अशा कोडी व शब्दकोड्यांचा वापर कशासाठी करावा?',
      opts: [
        'हसतखेळत संकल्पनांची उजळणी करणे, गुणधर्मांवरून तर्क करण्याची क्षमता वाढवणे आणि तणावमुक्त पुनरावलोकन साधणे',
        'पहिल्या दिवसापासून प्रत्यक्ष झाडे पाहणे पूर्ण बंद करणे',
        'हळू लिहिणाऱ्यांना शिक्षा करणे',
        'वैज्ञानिक विचार संपवणे',
      ],
      exp: 'प्रत्यक्ष अनुभवानंतर कोडी व खेळांच्या माध्यमातून केलेली उजळणी संकल्पना अधिक आनंददायी व स्थायी करते.',
    },
    hi: {
      q: '"पौधे के भाग" पाठ के अंत में पहेलियों ("मैं जमीन के नीचे रहती हूँ, खनिज-जल सोखती हूँ और मिट्टी का कटाव रोकती हूँ—मैं कौन?") का उपयोग किसलिए उत्तम है?',
      opts: [
        'खेल-खेल में अवधारणाओं की पुनरावृत्ति करना, तार्किक संकेत-मिलान क्षमता बढ़ाना और तनावमुक्त अभ्यास कराना',
        'प्रत्यक्ष पौधे देखना पूरी तरह बंद करना',
        'धीमे लिखने वालों को दंडित करना',
        'वैज्ञानिक तर्क समाप्त करना',
      ],
      exp: 'प्रत्यक्ष अनुभव के बाद पहेलियाँ और शब्द-जाल तनावमुक्त व आनंददायी ढंग से अवधारणात्मक सुदृढ़ीकरण करते हैं।',
    },
  },
  {
    topic: 'Reviewing Unfair Occupational Bias in Textbooks',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Noticing an older reference chart that depicts only doctors in lab coats as "Important Helpers" while overlooking sanitation workers, farm labourers, and bus conductors, what critical pedagogy action should the teacher encourage?',
      opts: [
        'Invite learners to critically notice who is missing from the chart, add every essential community worker respectfully, and discuss equal civic dignity under India’s Constitution',
        'Agree that doctors matter more than farmers or cleaners',
        'Hide sanitation workers’ contributions so tests stay simpler',
        'Ask students to memorize the flawed chart blindly',
      ],
      exp: 'Encouraging critical media/text questioning empowers young citizens to spot bias and affirm constitutional equality and dignity of all labour.',
    },
    mr: {
      q: 'एका जुन्या तक्त्यात केवळ डॉक्टरांनाच "महत्त्वाचे मदतनीस" दाखवून स्वच्छता कामगार, शेतमजूर व वाहक यांना वगळले असल्याचे दिसते. शिक्षकाने वर्गात कोणती चिकित्सक कृती घडवावी?',
      opts: [
        'तक्त्यात कोण सुटले आहे हे मुलांना स्वतः शोधू देणे, सर्व अत्यावश्यक कामगारांची चित्रे त्यात आदराने जोडणे आणि संविधानातील समानतेवर व श्रमाच्या प्रतिष्ठेवर चर्चा करणे',
        'फक्त डॉक्टरच जास्त महत्त्वाचे असल्याचे मान्य करणे',
        'स्वच्छता कामगारांचा उल्लेख टाळणे',
        'तो सदोष तक्ता जसाच्या तसा पाठ करायला सांगणे',
      ],
      exp: 'पाठ्यसाहित्याचे चिकित्सक वाचन व श्रमप्रतिष्ठा शिकवणे हा लोकशाही नागरिकत्वाचा पाया आहे.',
    },
    hi: {
      q: 'एक पुराने चार्ट में केवल डॉक्टरों को "महत्वपूर्ण सहायक" दिखाया गया है, जबकि सफाई कर्मियों, खेतिहर मजदूरों और बस कंडक्टरों को छोड़ दिया गया है। शिक्षक को क्या करना चाहिए?',
      opts: [
        'बच्चों से पूछना कि चार्ट में कौन छूट गया है, सभी आवश्यक कर्मियों को सम्मानपूर्वक जुड़वाना तथा संवैधानिक समता व श्रम की गरिमा पर संवाद कराना',
        'डॉक्टरों को अन्य सभी से श्रेष्ठ मानना',
        'सफाई कर्मियों का उल्लेख न करना',
        'त्रुटिपूर्ण चार्ट को ज्यों का त्यों रटवाना',
      ],
      exp: 'पाठ्य-सामग्री का आलोचनात्मक विश्लेषण और हर श्रम की समान संवैधानिक गरिमा सिखाना EVS की प्रमुख सामाजिक भूमिका है।',
    },
  },
];
