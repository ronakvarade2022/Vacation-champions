import { CuratedTrilingualMcq } from './types';

// Batch 2 EVS Content Part 2 (30 unique Classes 3-5 EVS-1 & EVS-2 Qs)
export const MAHA_TET_P1_B2_EVS_C2: CuratedTrilingualMcq[] = [
  {
    topic: 'Translucent Transparent Opaque Classroom Window Test',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which group of everyday school materials correctly demonstrates **Transparent**, **Translucent**, and **Opaque** objects in that exact order?',
      opts: [
        'Clear glass windowpane — butter/oiled paper — wooden classroom door',
        'Wooden desk — frosted glass — clear air',
        'Brick wall — clear drinking water — oiled tracing paper',
        'Frosted bottle — cardboard sheet — clear spectacles lens',
      ],
      exp: 'Transparent clears nearly all light (`glass pane`), translucent scatters light partially (`oiled paper`), and opaque blocks light completely (`wood door`), casting sharp shadows.',
    },
    mr: {
      q: 'खालीलपैकी कोणता क्रम **पारदर्शक**, **अर्धपारदर्शक** आणि **अपारदर्शक** पदार्थांची अचूक जोडी दर्शवतो?',
      opts: [
        'स्वच्छ खिडकीची काच — तेल लावलेला कागद — लाकडी दरवाजा',
        'लाकडी बाक — धूसर काच — हवा',
        'विटांची भिंत — स्वच्छ पाणी — ट्रेसिंग पेपर',
        'धूसर बाटली — पुठ्ठा — चष्म्याची काच',
      ],
      exp: 'स्वच्छ काचेतून आरपार दिसते (पारदर्शक), तेलकट कागदातून धूसर दिसते (अर्धपारदर्शक) व लाकडी दारातून अजिबात दिसत नाही (अपारदर्शक).',
    },
    hi: {
      q: 'निम्नलिखित में से कौन-सा क्रम **पारदर्शी**, **पारभासी** और **अपारदर्शी** वस्तुओं का सही उदाहरण है?',
      opts: [
        'साफ खिड़की का काँच — तेल लगा कागज़ — लकड़ी का दरवाज़ा',
        'लकड़ी का डेस्क — धुँधला काँच — हवा',
        'ईंट की दीवार — साफ जल — ट्रेसिंग पेपर',
        'धुँधली बोतल — गत्ता — चश्मे का लेंस',
      ],
      exp: 'साफ काँच पारदर्शी, तेल लगा कागज़ पारभासी (अर्धपारदर्शी) और लकड़ी का दरवाज़ा अपारदर्शी होता है।',
    },
  },
  {
    topic: 'Levers Class 1 2 3 Seesaw Wheelbarrow Tongs',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In primary science classification of simple levers (`Class 1`, `Class 2`, `Class 3`), why do a pair of sugar/chapati tongs require MORE effort force than the weight of the chapati lifted?',
      opts: [
        'Tongs are a Class 3 lever (`Fulcrum–Effort–Load`), where effort acts closer to the hinge than the distant load—trading extra force for speed and precision',
        'Tongs have two fulcrums at the tip',
        'Effort is always zero in metal instruments',
        'Because steel tongs act as magnetic pulleys',
      ],
      exp: 'In Class 3 levers (`tongs, broom, fishing rod`), Effort sits between Fulcrum and Load, amplifying reach/delicacy rather than multiplying mechanical force.',
    },
    mr: {
      q: 'साध्या यंत्रांच्या तऱ्हेनुसार चिमटा (Tongs) वापरताना उचललेल्या भाकरीच्या वजनापेक्षा हाताने लावावे लागणारे बल जास्त का असते?',
      opts: [
        'चिमटा हा तिसऱ्या प्रकारचा तरफ (टेकू–बल–भार) आहे; यात बल टेकूच्या जवळ तर भार लांब टोकावर असल्याने अचूकतेसाठी जास्त बल लागते',
        'चिमट्याला टोकाशी दोन टेकू असतात',
        'धातूच्या वस्तूंमध्ये बल लागतच नाही',
        'चिमटा कप्पीसारखा काम करतो',
      ],
      exp: 'तिसऱ्या वर्गाच्या तरफेत (चिमटा, झाडू) टेकू व भार यांच्यामध्ये बल लावले जाते, ज्यामुळे नाजूक व जलद हालचाल साधते.',
    },
    hi: {
      q: 'सरल मशीनों के वर्गीकरण में चिमटे (Tongs) से रोटी उठाते समय रोटी के भार से अधिक बल क्यों लगाना पड़ता है?',
      opts: [
        'चिमटा तृतीय वर्ग का उत्तोलक (`आलंब–प्रयास–भार`) है, जिसमें प्रयास जोड़ के पास और भार दूर सिरे पर होने से सटीकता के लिए अधिक बल लगता है',
        'चिमटे में दो आलंब होते हैं',
        'धातु के यंत्र में बल शून्य होता है',
        'चिमटा घिरनी की तरह काम करता है',
      ],
      exp: 'तृतीय श्रेणी उत्तोलक में प्रयास आलंब और भार के बीच होता है, जो बल बढ़ाने के बजाय नाजुक व त्वरित पकड़ देता है।',
    },
  },
  {
    topic: 'Friction Utility Sole Grooves vs Bicycle Chain Oiling',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'Why do athletes’ running shoes have deep patterned rubber grooves underneath, whereas cyclists apply smooth oil drops onto bicycle chains and axles?',
      opts: [
        'Shoe grooves INCREASE useful friction to grip slippery ground safely, while oiling lubricates chains to REDUCE unwanted wear-and-tear friction',
        'Both grooves and oil serve to increase friction equally',
        'Oil washes rubber off bicycle rims',
        'Shoe grooves reduce friction so runners slide endlessly on wet tiles',
      ],
      exp: 'Friction is both friend and foe: deliberately increased (`treads, chalk dust, brake pads`) for safe grip, and decreased (`oil, grease, ball bearings`) where smooth motion saves energy.',
    },
    mr: {
      q: 'धावपटूंच्या बुटांच्या तळाशी खोल नक्षीचे खाचे असतात, पण सायकलच्या साखळीला मात्र तेल लावले जाते—यामागील विज्ञान काय?',
      opts: [
        'बुटांचे खाचे जमिनीवर सुरक्षित पकड मिळवण्यासाठी घर्षण वाढवतात, तर तेल साखळीतील अनावश्यक झीज व घर्षण कमी करून वेग सुलभ करते',
        'खाचे आणि तेल दोन्ही घर्षण वाढवतात',
        'तेल लावल्याने रबर वितळते',
        'बुटांचे खाचे फरशीवर घसरण्यासाठी असतात',
      ],
      exp: 'गरजेनुसार घर्षण वाढवणे (बूट, टायर नक्षी) व गरज नसताना कमी करणे (तेल, वंगण, बॉल बेअरिंग) हा दैनंदिन विज्ञान वापर आहे.',
    },
    hi: {
      q: 'खिलाड़ियों के जूतों के तले खाँचेदार बनाए जाते हैं जबकि साइकिल की चेन में तेल डाला जाता है—इसके पीछे क्या वैज्ञानिक कारण है?',
      opts: [
        'जूतों के खाँचे फिसलन रोकने के लिए उपयोगी घर्षण बढ़ाते हैं, जबकि तेल स्नेहक बनकर अनावश्यक घर्षण व घिसाव कम करता है',
        'दोनों ही घर्षण बढ़ाने के लिए होते हैं',
        'तेल टायर का रबर गलाता है',
        'खाँचे फर्श पर फिसलने के लिए होते हैं',
      ],
      exp: 'जहाँ पकड़ चाहिए वहाँ घर्षण बढ़ाया जाता है और जहाँ सुगम गति चाहिए वहाँ स्नेहक से घर्षण घटाया जाता है।',
    },
  },
  {
    topic: 'Solubility Temperature Sugar Water & Egg Salt Density',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'A fresh whole egg sinks straight to the bottom of a glass filled with plain tap water, yet rises and floats steadily when five spoons of table salt are stirred thoroughly in. Why?',
      opts: [
        'Dissolving salt increases the density (mass per unit volume) of water above the egg’s density, increasing upward buoyant force',
        'Salt dissolves the egg’s limestone shell into air bubbles',
        'Stirring turns liquid water temporarily into ice crystals',
        'Plain water pulls objects down harder using magnetism',
      ],
      exp: 'Adding dissolved salt packs extra mass into the water without expanding volume proportionately, raising brine density past the egg’s density (`NCERT Class 5 Experiments with Water`).',
    },
    mr: {
      q: 'ताज्या अंड्याला साध्या नळाच्या पाण्यात सोडल्यास ते तळाशी बुडते, पण पाण्यात पाच चमचे मीठ विरघळवल्यावर ते तरंगू लागते. असे का घडते?',
      opts: [
        'मीठ विरघळल्याने पाण्याची घनता अंड्याच्या घनतेपेक्षा जास्त होते आणि पाण्याचा उर्ध्व प्लावक बल (buoyancy) वाढतो',
        'मीठ अंड्याचे कवच विरघळवून हवा भरते',
        'ढवळल्यामुळे पाण्याचे बर्फात रूपांतर होते',
        'साध्या पाण्यात चुंबकीय आकर्षण असते',
      ],
      exp: 'खाऱ्या पाण्याची घनता जास्त असल्याने ते वस्तूंवर अधिक प्लावक जोर लावते—हाच मृत समुद्रातील तरंगण्याचाही सिद्धांत आहे.',
    },
    hi: {
      q: 'एक ताज़ा अंडा सादे पानी में डूब जाता है, लेकिन उसी पानी में पाँच चम्मच नमक घोल देने पर वह तैरने लगता है। इसका वैज्ञानिक कारण क्या है?',
      opts: [
        'नमक घुलने से जल का घनत्व अंडे के घनत्व से अधिक हो जाता है, जिससे ऊपर की ओर उत्प्लावन बल बढ़ जाता है',
        'नमक अंडे के छिलके को गलाकर गैस भर देता है',
        'हिलाने से पानी बर्फ बन जाता है',
        'सादे पानी में चुंबकीय खिंचाव होता है',
      ],
      exp: 'लवणता बढ़ने से जल का घनत्व बढ़ता है और उत्प्लावक बल अंडे को ऊपर तैरा देता है।',
    },
  },
  {
    topic: 'Coastal Sea Breeze Daytime Convection Konkan Coast',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Along Konkan beaches like Alibag or Ganpatipule on a bright sunny afternoon, cool winds consistently blow FROM the Arabian Sea toward the land (`Sea Breeze`). What drives this?',
      opts: [
        'Land heats up faster than ocean water, causing warm low-pressure air to rise over land while cooler, denser air rushes inland from the sea',
        'Ocean waves push air mechanically like giant fans',
        'Seawater heats up twice as fast as beach sand in sunlight',
        'Earth’s rotation pushes winds exclusively eastward at `2 p.m.`',
      ],
      exp: 'Differential heating (`land warms and cools faster than water`) drives daytime sea breezes and reverses into nighttime land breezes.',
    },
    mr: {
      q: 'कोकण किनारपट्टीवर उन्हाळ्याच्या दुपारी थंड वारे समुद्राकडून जमिनीकडे (सागरी वारे) का वाहतात?',
      opts: [
        'पाण्यापेक्षा जमीन लवकर तापते; जमिनीवरील गरम हलकी हवा वर गेल्याने तयार झालेली पोकळी भरून काढण्यासाठी समुद्रावरील थंड हवा जमिनीकडे वाहते',
        'समुद्राच्या लाटा पंख्याप्रमाणे वारा ढकलतात',
        'समुद्राचे पाणी वाळूपेक्षा दुप्पट वेगाने तापते',
        'पृथ्वी फक्त दुपारीच पूर्वेकडे फिरते',
      ],
      exp: 'जमीन व पाणी यांच्या तापण्याच्या वेगातील फरकामुळे दिवसा सागरी वारे व रात्री भूमीय वारे वाहतात.',
    },
    hi: {
      q: 'कोंकण जैसे तटीय क्षेत्रों में तेज धूप वाली दोपहर को ठंडी हवा समुद्र से ज़मीन की ओर (समुद्री समीर) क्यों बहती है?',
      opts: [
        'समुद्री जल की तुलना में स्थल तेजी से गर्म होता है; ज़मीन की गर्म हवा ऊपर उठने पर समुद्र के ऊपर की ठंडी-सघन हवा ज़मीन की ओर आती है',
        'समुद्री लहरें पंखे की तरह हवा धकेलती हैं',
        'समुद्र का पानी रेत से दोगुनी तेज़ी से गर्म होता है',
        'पृथ्वी केवल दोपहर में घूमती है',
      ],
      exp: 'स्थल और जल के असमान तापन के कारण दिन में समुद्री समीर और रात में स्थलीय समीर चलती है।',
    },
  },
  {
    topic: 'Sunita In Space Zero Gravity & Moon Footprints',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In NCERT Std 5 EVS ("Sunita in Space"), why do water droplets float like shimmering blobs inside an orbiting spacecraft, and why do astronauts’ footprints on the Moon last for millions of years?',
      opts: [
        'Orbiting spacecraft experience weightlessness (free-fall microgravity), while the Moon lacks wind and rain atmosphere to erode footprints',
        'Spacecraft turn liquid water into solid diamonds',
        'Strong lunar hurricanes freeze human footprints instantly',
        'Astronauts wear sticky magnetic soles on spaceships',
      ],
      exp: 'Microgravity stops downward pouring in orbit, while zero air/weather on the Moon leaves Apollo bootprints untouched indefinitely.',
    },
    mr: {
      q: '"अंतराळात सुनीता" या पाठानुसार अंतराळयानात पाण्याचे थेंब हवेत तरंगताना का दिसतात आणि चंद्रावर उमटलेली पावले लाखों वर्षे तशीच का टिकून राहतात?',
      opts: [
        'अंतराळयानात भारहीनता (सूक्ष्म-गुरुत्वाकर्षण) असल्याने सर्व वस्तू तरंगतात, आणि चंद्रावर हवा, वारा किंवा पाऊस नसल्याने पावलांचे ठसे पुसले जात नाहीत',
        'अंतराळयान पाण्याचे हिरे बनवते',
        'चंद्रावरील वादळामुळे ठसे दगडात कोरले जातात',
        'यानात चुंबकीय बूट वापरले जातात',
      ],
      exp: 'अवकाशयानातील सूक्ष्म-गुरुत्वाकर्षणामुळे तरंगणारे पाण्याचे गोळे आणि चंद्रावरील वातावरणाचा अभाव हे दोन्ही अद्भुत वैज्ञानिक सत्य आहेत.',
    },
    hi: {
      q: 'कक्षा 5 EVS ("सुनीता अंतरिक्ष में") के अनुसार अंतरिक्ष यान में पानी की बूँदें हवा में तैरती गोलाकार क्यों रहती हैं और चंद्रमा पर बने पदचिह्न लाखों वर्षों तक क्यों नहीं मिटते?',
      opts: [
        'अंतरिक्ष यान में भारहीनता (सूक्ष्म गुरुत्व) के कारण वस्तुएँ तैरती हैं, और चंद्रमा पर हवा-पानी/वायुमंडल न होने से अपरदन नहीं होता',
        'यान पानी को हीरे में बदल देता है',
        'चाँद के तूफ़ान पदचिह्नों को सीमेंट बना देते हैं',
        'अंतरिक्ष यात्री चुंबकीय जूते पहनते हैं',
      ],
      exp: 'अंतरिक्ष यान में मुक्त पतन की भारहीनता और चंद्रमा पर वायुमंडल का अभाव इनके सटीक वैज्ञानिक कारण हैं।',
    },
  },
  {
    topic: 'River Delta vs Estuary Mouth East vs West Coast',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'East-flowing rivers like the Godavari and Ganga form wide, fertile fan-shaped **Deltas** at the Bay of Bengal, whereas fast west-flowing rivers like Narmada, Tapi, and Konkan streams form funnel-like **Estuaries** at the Arabian Sea. Why?',
      opts: [
        'Long gentle east-coast slopes let slow rivers deposit heavy silt at the mouth (delta), while steep Sahyadri/west-coast currents sweep silt directly out into deep tidal mouths (estuary)',
        'Because the Arabian Sea boils silt into steam',
        'Because east-flowing rivers carry zero mud or sand',
        'Because estuaries exist only near snowy polar caps',
      ],
      exp: 'Gentle eastern plains slow down silt-laden rivers into braided deltas, whereas steep short western gradients flush sediment out cleanly.',
    },
    mr: {
      q: 'गोदावरी व गंगा या पूर्ववाहिनी नद्या मुखाशी सुपीक "त्रिभुज प्रदेश (Delta)" तयार करतात, तर नर्मदा, तापी व कोकणातील पश्चिमवाहिनी नद्या "खाडी (Estuary)" का तयार करतात?',
      opts: [
        'पूर्व किनारपट्टीचा उतार मंद असल्याने गाळ मुखाशी साचून त्रिभुज प्रदेश बनतो, तर सह्याद्रीच्या तीव्र उतारामुळे वेगाने वाहणाऱ्या नद्या गाळ थेट अरबी समुद्रात वाहून नेत असल्याने खाडी तयार होते',
        'अरबी समुद्र गाळ वितळवतो म्हणून',
        'पूर्ववाहिनी नद्यांत गाळ नसतो म्हणून',
        'खाड्या फक्त ध्रुवीय बर्फाजवळच असतात',
      ],
      exp: 'जमिनीचा उतार व नदीचा वेग यांवर मुखाशी त्रिभुज प्रदेश किंवा खाडी निर्माण होणे अवलंबून असते.',
    },
    hi: {
      q: 'गोदावरी व गंगा जैसी पूर्व-वाहिनी नदियाँ मुहाने पर उपजाऊ **डेल्टा** बनाती हैं, जबकि नर्मदा, तापी व कोंकण की नदियाँ **ज्वारनदमुख (Estuary)** क्यों बनाती हैं?',
      opts: [
        'पूर्वी ढाल मंद होने से धीमी नदियाँ मुहाने पर गाद जमा कर डेल्टा बनाती हैं, जबकि पश्चिमी तीव्र ढाल वाली तेज़ नदियाँ गाद को सीधे गहरे समुद्र में बहा ले जाती हैं',
        'अरब सागर गाद को भाप बना देता है',
        'पूर्व की नदियों में रेत नहीं होती',
        'ज्वारनदमुख केवल ध्रुवों पर बनते हैं',
      ],
      exp: 'ढाल की तीव्रता और अवसाद जमाव की गति भारत के पूर्वी डेल्टा और पश्चिमी एस्चुरी का मुख्य कारण है।',
    },
  },
  {
    topic: 'Humus Topsoil Horizon Fertility & Erosion Prevention',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why does washing away the dark uppermost `Topsoil` horizon (`O/A` layer) during heavy monsoon floods severely damage farm fertility for decades?',
      opts: [
        'Topsoil contains decaying organic `humus`, beneficial microbes, and essential plant nutrients accumulated slowly over centuries—absent in rocky subsoil underneath',
        'Topsoil is made entirely of synthetic urea factory pellets',
        'Bedrock immediately sprouts greener seeds faster than humus',
        'Earthworms survive only inside solid bedrock granite',
      ],
      exp: 'Forming just `2–3 cm` of humus-rich topsoil takes hundreds of years; grass strips, contour bunds, and tree roots protect it from washout.',
    },
    mr: {
      q: 'मुसळधार पावसात जमिनीचा सर्वात वरचा गडद रंगाचा मातीचा थर (Topsoil) वाहून गेल्यास शेतीची सुपीकता अनेक वर्षे का घटते?',
      opts: [
        'या वरच्या थरात शेकडो वर्षांत तयार झालेला सेंद्रिय कुथित पदार्थ (`ह्युमस`), उपयुक्त सूक्ष्मजीव आणि वनस्पतींची पोषक तत्त्वे सामावलेली असतात जी खालच्या खडकाळ थरात नसतात',
        'वरचा थर कारखान्यातील रासायनिक युरियाचा बनलेला असतो',
        'खालच्या खडकात बिया जास्त वेगाने रुजतात',
        'गांडुळे फक्त कठीण ग्रॅनाइट खडकातच जगतात',
      ],
      exp: 'ह्युमसयुक्त सुपीक वरचा थर तयार होण्यास शतके लागतात; म्हणून बांधबंदिस्ती व वृक्षारोपणाने मृदा संधारण अत्यावश्यक असते.',
    },
    hi: {
      q: 'भारी वर्षा में मिट्टी की सबसे ऊपरी गहरी परत (`Topsoil`) बह जाने पर खेतों की उर्वरता दशकों तक क्यों घट जाती है?',
      opts: [
        'ऊपरी परत में सैकड़ों वर्षों में बना जैविक ह्यूमस, सूक्ष्मजीव और पोषक तत्व होते हैं, जो नीचे की पथरीली उप-मृदा में नहीं होते',
        'ऊपरी परत कृत्रिम खाद की बनी होती है',
        'नीचे की चट्टानों में फसल तेज़ी से उगती है',
        'केंचुए केवल ठोस चट्टान में रहते हैं',
      ],
      exp: 'ह्यूमस से भरपूर ऊपरी मृदा को अपरदन से बचाना टिकाऊ कृषि का आधार है।',
    },
  },
  {
    topic: 'Human Skeletal Joints Hinge Elbow vs Ball Socket Shoulder',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why can you swing your cricket-bowling arm around in a full circle at your shoulder, whereas your knee and elbow bend smoothly in only ONE forward-backward plane?',
      opts: [
        'The shoulder has a multi-directional **Ball-and-Socket joint**, while the elbow and knee have one-plane **Hinge joints** like a classroom door',
        'Knee bones contain zero cartilage or tendons',
        'Elbows contain spherical rubber gears',
        'Shoulder blades have no joints attached at all',
      ],
      exp: 'Classifying everyday body joints (Ball-and-Socket at shoulder/hip, Hinge at elbow/knee, Pivot at neck) links biology directly to simple mechanics.',
    },
    mr: {
      q: 'आपण खांद्यातून हात गोलाकार चहूबाजूंनी फिरवू शकतो, पण कोपर आणि गुडघा मात्र दाराच्या बिजागरीप्रमाणे एकाच दिशेने का वाकतात?',
      opts: [
        'खांद्यामध्ये चहूबाजूंनी फिरणारा **उखळीचा सांधा (Ball-and-Socket)** असतो, तर कोपर व गुडघ्यात एकाच दिशेने हलणारा **बिजागरीचा सांधा (Hinge joint)** असतो',
        'गुडघ्यात अजिबात हाडे नसतात',
        'कोपऱ्यात रबरी चक्र असते',
        'खांद्याला कोणताही सांधा नसतो',
      ],
      exp: 'शरीरातील सांध्यांच्या रचनेमुळे (उखळी, बिजागरी, खुंटी सांधा) अवयवांच्या हालचालींची दिशा ठरते.',
    },
    hi: {
      q: 'हम कंधे से हाथ को चारों ओर घुमा सकते हैं, परंतु कोहनी और घुटना दरवाज़े के कब्जे की तरह केवल एक ही दिशा में क्यों मुड़ते हैं?',
      opts: [
        'कंधे में **कंदुक-खल्लिका संधि (Ball-and-Socket)** होती है, जबकि कोहनी और घुटने में एक-तलीय **हिंज/कब्जा संधि (Hinge joint)** होती है',
        'घुटने में कोई हड्डी नहीं होती',
        'कोहनी में रबर का पहिया होता है',
        'कंधे में कोई जोड़ नहीं होता',
      ],
      exp: 'अस्थि-संधियों की बनावट शरीर के विभिन्न अंगों की गति की सीमा निर्धारित करती है।',
    },
  },
  {
    topic: 'Human Teeth Incisors Canines Molars Functional Roles',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which match pairs human permanent tooth types correctly with their mechanical feeding function taught in Balbharati Std 4–5?',
      opts: [
        'Incisors — cutting/biting; Canines — tearing; Premolars & Molars — crushing and grinding food smoothly',
        'Incisors — grinding grain; Molars — slicing air bubbles',
        'Canines — flat grinding exclusively; Molars — sharp biting',
        'Milk teeth — permanent adult molars replaced twice',
      ],
      exp: 'Chisel-shaped front incisors bite (`8`), pointed canines tear (`4`), and broad ridged premolars/molars (`8 + 12`) grind food thoroughly for digestion.',
    },
    mr: {
      q: 'इयत्ता ४–५ विज्ञाननुसार मानवी दातांचे प्रकार आणि त्यांचे अचूक कार्य यांची कोणती जोडी योग्य आहे?',
      opts: [
        'पटाशीचे दात (Incisors) — कापणे; सुळे (Canines) — फाडणे; उपदाढा व दाढा — अन्न बारीक दळणे',
        'पटाशीचे दात — दळणे; दाढा — कापणे',
        'सुळे — फक्त चघळणे; दाढा — अणकुचीदार टोक',
        'दुधाचे दात — प्रौढ वयातील कायमच्या दाढा',
      ],
      exp: 'अन्न चावून बारीक करण्यासाठी पटाशीचे दात, सुळे आणि दाढा आपापली विशिष्ट कामे करतात.',
    },
    hi: {
      q: 'मानव दाँतों के प्रकार और उनके भोजन संबंधी कार्यों की कौन-सी जोड़ी बिल्कुल सही है?',
      opts: [
        'कृंतक (Incisors) — काटना; रदनक (Canines) — चीरना-फाड़ना; अग्रचर्वणक व चर्वणक (दाढ़) — भोजन चबाना व पीसना',
        'कृंतक — पीसना; चर्वणक — काटना',
        'रदनक — केवल पीसना',
        'दूध के दाँत — वयस्क स्थायी अक्ल दाढ़',
      ],
      exp: 'आगे के कृंतक काटने, नुकीले रदनक फाड़ने और चौड़ी दाढ़ें भोजन पीसने का कार्य करती हैं।',
    },
  },
  {
    topic: 'Infectious Airborne TB Measles vs Non-Communicable Diabetes',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 5 group classifies illnesses into **Communicable (Infectious)** vs **Non-Communicable**. Which grouping is 100% accurate?',
      opts: [
        'Communicable: Tuberculosis, Measles, Ringworm | Non-Communicable: Diabetes, Rickets, Night Blindness',
        'Communicable: Diabetes, Anaemia, Goitre | Non-Communicable: Flu, Cholera',
        'Communicable: Fracture, Rickets | Non-Communicable: Typhoid, Common Cold',
        'Communicable: Goitre, Night Blindness | Non-Communicable: Malaria, Measles',
      ],
      exp: 'Tuberculosis, measles, ringworm, cholera, and typhoid transmit via microbes/vectors; diabetes, rickets, goitre, and anaemia do NOT spread from person to person.',
    },
    mr: {
      q: 'रोगांच्या वर्गीकरणात **संसर्गजन्य (Communicable)** आणि **अ-संसर्गजन्य (Non-Communicable)** रोगांचा कोणता गट १००% अचूक आहे?',
      opts: [
        'संसर्गजन्य: क्षयरोग (TB), गोवर, गजकर्ण | अ-संसर्गजन्य: मधुमेह, मुडदूस, रातआंधळेपणा',
        'संसर्गजन्य: मधुमेह, रक्तक्षय, गलगंड | अ-संसर्गजन्य: कॉलरा, सर्दी',
        'संसर्गजन्य: हाड मोडणे, मुडदूस | अ-संसर्गजन्य: टायफॉईड',
        'संसर्गजन्य: गलगंड | अ-संसर्गजन्य: गोवर, मलेरिया',
      ],
      exp: 'जीवाणू, विषाणू व बुरशीमुळे होणारे क्षय, गोवर, गजकर्ण एकाकडून दुसऱ्यास होतात; जीवनसत्त्व/खनिज कमतरता व मधुमेह संसर्गजन्य नाहीत.',
    },
    hi: {
      q: 'रोगों के वर्गीकरण में **संक्रामक (Communicable)** और **असंक्रामक (Non-Communicable)** का कौन-सा युग्म शत-प्रतिशत सही है?',
      opts: [
        'संक्रामक: क्षयरोग (TB), खसरा, दाद | असंक्रामक: मधुमेह, रिकेट्स, रतौंधी',
        'संक्रामक: मधुमेह, एनीमिया, घेंघा | असंक्रामक: हैजा, जुकाम',
        'संक्रामक: हड्डी टूटना | असंक्रामक: टाइफाइड',
        'संक्रामक: घेंघा | असंक्रामक: खसरा, मलेरिया',
      ],
      exp: 'क्षयरोग, खसरा व दाद सूक्ष्मजीवों से फैलते हैं, जबकि मधुमेह व पोषण की कमी वाले रोग एक व्यक्ति से दूसरे में नहीं फैलते।',
    },
  },
  {
    topic: 'Summer Milk Souring Lactobacillus Refrigeration Slows Bacteria',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'Why does fresh boiled milk left on a kitchen counter turn sour or curdle within hours during peak April–May summer heat, yet stays fresh for a day or more inside a refrigerator?',
      opts: [
        'Warm summer temperatures speed up multiplication of acid-producing bacteria, whereas cold refrigerator air slows microbial growth drastically',
        'Cold air inside refrigerators kills glass jugs cleanly',
        'Summer sunlight changes water molecules into sour lemon juice',
        'Milk stops souring only in metal vessels without cooling',
      ],
      exp: 'Balbharati Std 5 ("Preserving Food"): microbes multiply rapidly in warm, moist conditions (`25–40°C`) and slow down below `5°C`.',
    },
    mr: {
      q: 'एप्रिल–मेच्या कडक उन्हाळ्यात स्वयंपाकघरातील गरम तापमानात ठेवलेले दूध काही तासांतच नासते, पण फ्रीजमध्ये मात्र दीर्घकाळ टिकते. याचे कारण काय?',
      opts: [
        'उबदार तापमानात दुधात आम्ल तयार करणाऱ्या जिवाणूंची वाढ वेगाने होते, तर फ्रीजमधील थंड तापमानामुळे सूक्ष्मजीवांची वाढ अत्यंत मंदावते',
        'फ्रीजमधील थंड हवा दुधाचे पाण्यात रूपांतर करते',
        'उन्हाळ्याचा प्रकाश दुधात लिंबाचा रस तयार करतो',
        'फक्त स्टीलच्या भांड्यात ठेवल्याने दूध कधीच नासत नाही',
      ],
      exp: 'उष्ण व दमट वातावरणात सूक्ष्मजीवांची झपाट्याने वाढ होते; शीतकरण (Refrigeration) त्यांची क्रियाशीलता मंदावून अन्न सुरक्षित ठेवते.',
    },
    hi: {
      q: 'मई की तेज़ गर्मी में रसोई के बाहर रखा दूध कुछ ही घंटों में फट जाता है, पर फ्रिज़ में अधिक समय तक ताज़ा क्यों रहता है?',
      opts: [
        'गर्म तापमान में अम्ल बनाने वाले जीवाणु तेजी से बढ़ते हैं, जबकि फ्रिज़ की ठंडक सूक्ष्मजीवों की वृद्धि को बहुत धीमा कर देती है',
        'फ्रिज़ दूध को जमाकर पत्थर बना देता है',
        'गर्मी दूध को नींबू रस में बदल देती है',
        'स्टील के बर्तन में दूध कभी नहीं फटता',
      ],
      exp: 'कम तापमान सूक्ष्मजीवों की प्रजनन गति को रोककर खाद्य संरक्षण करता है।',
    },
  },
  {
    topic: 'Anita Honeybees Oct-Dec Beekeeping Litchi Waggle Dance',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In NCERT Std 4 EVS ("Anita and the Honeybees"), why is **October to December** considered the ideal season for honeybees to lay eggs and start beekeeping boxes in Bihar/northern plains, and how does a scout bee guide hive-mates to distant nectar flowers?',
      opts: [
        'Bees find abundant nectar during winter-flowering blooms and the queen lays eggs plentifully; scout bees perform a rhythmic "dance" signaling nectar direction and distance',
        'Queens hibernate completely from October to December',
        'Scout bees leave written chalk marks on tree bark',
        'Only drone male bees gather floral pollen and wax',
      ],
      exp: 'Bee colonies thrive when flowering blossoms peak, and returning foragers perform specific waggle/round dances to recruit workers.',
    },
    mr: {
      q: 'मधमाश्यांविषयी अभ्यासलेल्या पाठानुसार कामकरी मधमाशीला मधाचा मुबलक साठा असलेल्या फुलांचा पत्ता सापडल्यावर ती पोळ्यातील इतर मधमाशांना ही माहिती कशी कळवते?',
      opts: [
        'पोळ्याजवळ विशिष्ट लयबद्ध "नृत्य (Waggle Dance)" करून त्या फुलांची दिशा व अंतर सांगते',
        'झाडाच्या सालीवर खुणा कोरून ठेवते',
        'फक्त नर मधमाशा रस गोळा करून आणतात',
        'राणी मधमाशी स्वतः जाऊन एकेकाला बोलावते',
      ],
      exp: 'कामकरी मधमाश्या विशिष्ट नृत्याद्वारे सूर्य व अंतराचा अचूक संकेत इतर माश्यांना देतात; मध गोळा करणे, मेण व पोळे रक्षण ही कामे मादी कामकरी करतात.',
    },
    hi: {
      q: 'कक्षा 4 EVS ("अनीता की मधुमक्खियाँ") के अनुसार **अक्टूबर से दिसंबर** मधुमक्खी पालन शुरू करने का सबसे अच्छा समय क्यों होता है, और खोजी मक्खी साथी मक्खियों को फूलों का पता कैसे बताती है?',
      opts: [
        'इस मौसम में रानी मक्खी खूब अंडे देती है व पर्याप्त फूल उपलब्ध होते हैं; रस मिलने पर खोजी मक्खी एक विशेष "नाच (डांस)" करके दिशा-दूरी बताती है',
        'अक्टूबर-दिसंबर में रानी मक्खी सोती रहती है',
        'नर मक्खियाँ शहद बनाती हैं',
        'मक्खियाँ पेड़ की छाल पर निशान बनाती हैं',
      ],
      exp: 'अक्टूबर-दिसंबर में कॉलोनी तेजी से बढ़ती है और श्रमिक मक्खियाँ विशेष नृत्य से रस-स्रोत की सूचना देती हैं।',
    },
  },
  {
    topic: 'Seed Cotyledons Stored Food Monocot Wheat vs Dicot Bean',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'When soaked `moong` or `chana` seeds sprout in a wet cloth before any soil nutrients or green leaves appear, where does the emerging white baby shoot (`plumule/radicle`) get food energy to grow?',
      opts: [
        'From the starchy food stored inside the seed’s fleshy **Cotyledons (Seed Leaves)**',
        'From photosynthesis performed inside dark roots underground',
        'From mineral pebbles glued onto the seed coat',
        'From rainwater oxygen dissolving stone dust',
      ],
      exp: 'Cotyledons feed the germinating embryo until its first true green leaves unfurl to perform photosynthesis.',
    },
    mr: {
      q: 'ओल्या कापडात बांधलेल्या मूग किंवा हरभऱ्याला जमिनीत माती किंवा हिरवी पाने येण्यापूर्वीच पांढरा अंकुर वाढण्यासाठी अन्न कोठून मिळते?',
      opts: [
        'बियांच्या मांसल **बीजपत्रांमध्ये (Cotyledons)** साठवलेल्या अन्नसाठ्यातून',
        'मुळांनी केलेल्या प्रकाशसंश्लेषणातून',
        'पाण्यातील दगडांच्या धुळीतून',
        'कापडाच्या धाग्यांतून',
      ],
      exp: 'पहिली हिरवी पाने येऊन स्वतः अन्न तयार होईपर्यंत बीजपत्रांतील साठवलेले अन्न अंकुराला वाढीसाठी ऊर्जा देते.',
    },
    hi: {
      q: 'गीले कपड़े में बँधे मूँग या चने के अंकुरण के समय मिट्टी व हरी पत्तियों के बिना भी नन्हे पौधे को बढ़ने के लिए भोजन कहाँ से मिलता है?',
      opts: [
        'बीज के मोटे **बीजपत्रों (Cotyledons)** में संचित भोजन से',
        'जड़ों में होने वाले प्रकाश-संश्लेषण से',
        'कपड़े के रेशों से',
        'केवल कंकड़ों से',
      ],
      exp: 'प्रथम हरी पत्तियाँ निकलने तक बीजपत्रों में संग्रहीत मंड/पोषण भ्रूण का पोषण करता है।',
    },
  },
  {
    topic: 'Leaf Transpiration Stomata Sealed Polythene Bag Experiment',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 5 student ties a clean dry transparent polythene bag gently around a leafy sunlit twig on a potted plant. After two hours, tiny clear water droplets fog the inside of the bag. What vital plant process does this reveal?',
      opts: [
        '**Transpiration** — plants release excess water as vapour through microscopic leaf pores called **Stomata**, pulling water and minerals upward from the roots',
        'Plastic melting into dew droplets under sunlight',
        'Roots absorbing vapour from glass pots backward',
        'Leaves converting chlorophyll green pigment directly into rain',
      ],
      exp: 'Water vapour escaping through leaf stomata condenses on the cool inner polythene surface (`Transpiration`), driving the ascent of sap.',
    },
    mr: {
      q: 'कुंडीतील झाडाच्या एका पानांच्या डहाळीभोवती कोरडी पारदर्शक प्लॅस्टिक पिशवी सैल बांधून उन्हात ठेवल्यास दोन तासांनी आत पाण्याचे थेंब जमा होतात. यातून वनस्पतीची कोणती क्रिया दिसते?',
      opts: [
        '**बाष्पोत्सर्जन (Transpiration)** — पानांवरील सूक्ष्म **पर्णरंध्रांतून (Stomata)** अतिरिक्त पाणी वाफेच्या रूपात बाहेर टाकले जाते',
        'उन्हामुळे प्लॅस्टिक वितळून पाणी तयार होते',
        'मूळांऐवजी पाने माती शोषतात',
        'हरितद्रव्याचे पाण्यात रूपांतर होते',
      ],
      exp: 'पर्णरंध्रांतून होणारे बाष्पोत्सर्जन झाडाचे तापमान थंड ठेवते व मुळांकडून पाणी वर खेचण्यास मदत करते.',
    },
    hi: {
      q: 'गमले के पौधे की पत्तियों वाली टहनी पर साफ सूखी पारदर्शी पॉलिथीन बांधकर धूप में रखने पर भीतर पानी की नन्ही बूँदें दिखती हैं। यह किस प्रक्रिया को दर्शाता है?',
      opts: [
        '**वाष्पोत्सर्जन (Transpiration)** — पत्तियों के सूक्ष्म **रंध्रों (Stomata)** द्वारा जलवाष्प बाहर निकलना, जो जड़ों से जल ऊपर खींचता है',
        'धूप से प्लास्टिक का पानी में पिघलना',
        'पर्णहरित का जल बन जाना',
        'केवल बाहर की हवा से नमी आना',
      ],
      exp: 'पत्तियों के रंध्रों से निकली जलवाष्प पॉलिथीन के भीतर संघनित होकर वाष्पोत्सर्जन सिद्ध करती है।',
    },
  },
  {
    topic: 'Decomposers Earthworms Vermicompost & Forest Nutrient Cycling',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In an undisturbed forest floor, fallen dry leaves disappear steadily without anyone sweeping them, turning into dark nutrient-rich soil. Who drives this natural recycling chain?',
      opts: [
        'Microscopic **Decomposers** (fungi and bacteria) along with detritivores like earthworms and termites that break dead matter back into fertile mineral soil',
        'Wind blowing leaves permanently into outer space',
        'Trees swallowing dead dry leaves straight through bark cracks',
        'Sunlight evaporating solid woody twigs into clouds',
      ],
      exp: 'Decomposers and earthworms ("farmer’s friends") recycle dead organic debris into humus, sustaining the nutrient loop for fresh plants.',
    },
    mr: {
      q: 'दाट जंगलात कोणीही झाडू मारत नसताना जमिनीवर पडलेला पालापाचोळा हळूहळू नाहीसा होऊन त्याचे सुपीक काळ्या मातीत रूपांतर कसे होते?',
      opts: [
        'बुरशी, सूक्ष्म जिवाणू (विघटक) आणि गांडुळे व वाळवी यांसारखे सजीव मृत पालापाचोळ्याचे सेंद्रिय खतात विघटन करतात',
        'वारा सर्व पाने अवकाशात उडवून नेतो',
        'झाडे खोडातून वाळलेली पाने गिळून टाकतात',
        'उन्हामुळे लाकडी काड्या वाफ बनून उडून जातात',
      ],
      exp: 'विघटक (Decomposers) व गांडुळे निसर्गाचे स्वच्छतादूत असून ते पोषक द्रव्ये पुन्हा मातीत मिसळतात.',
    },
    hi: {
      q: 'जंगल में बिना किसी सफाईकर्मी के गिरी हुई सूखी पत्तियाँ धीरे-धीरे गायब होकर उपजाऊ काली मिट्टी में कैसे बदल जाती हैं?',
      opts: [
        'कवक व जीवाणु जैसे **अपघटक (Decomposers)** तथा केंचुए आदि मृत जैव पदार्थों को तोड़कर पुनः उपजाऊ ह्यूमस में बदल देते हैं',
        'हवा पत्तियों को अंतरिक्ष में ले जाती है',
        'पेड़ तने से पत्तियाँ निगल लेते हैं',
        'धूप से पत्तियाँ भाप बनकर उड़ जाती हैं',
      ],
      exp: 'अपघटक और केंचुए प्राकृतिक पुनर्चक्रण चक्र चलाकर मृदा की उर्वरता बनाए रखते हैं।',
    },
  },
  {
    topic: 'Ramsar Wetlands Maharashtra Nandur Madhmeshwar & Thane Creek',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Known lovingly as the "Bharatpur of Maharashtra" for welcoming thousands of winter migratory waterbirds along the Godavari–Kadwa confluence in Nashik district, which wetland holds prestigious international **Ramsar Site** status?',
      opts: ['Nandur Madhmeshwar Bird Sanctuary', 'Bhima Shankar Forest', 'Panhala Hill', 'Chakan Stepwell'],
      exp: 'Nandur Madhmeshwar (Nashik) became Maharashtra’s first Ramsar Wetland of International Importance, later joined by Lonar Lake and Thane Creek Flamingo Sanctuary.',
    },
    mr: {
      q: 'नाशिक जिल्ह्यात गोदावरी-कादवा संगमावरील कोणते पाणथळ पक्षी अभयारण्य "महाराष्ट्राचे भरतपूर" म्हणून प्रसिद्ध असून ते आंतरराष्ट्रीय **रामसर (Ramsar)** स्थळ घोषित झाले आहे?',
      opts: ['नांदूर मध्यमेश्वर पक्षी अभयारण्य', 'भीमाशंकर अरण्य', 'पन्हाळगड टेकडी', 'चाकण बारव'],
      exp: 'नांदूर मध्यमेश्वर हे महाराष्ट्रातील पहिले रामसर पाणथळ स्थळ असून तेथे हजारो स्थलांतरित पक्षी येतात.',
    },
    hi: {
      q: 'नासिक जिले में गोदावरी-कदवा संगम पर स्थित कौन-सा आर्द्रभूमि पक्षी अभयारण्य "महाराष्ट्र का भरतपुर" कहलाता है और अंतर्राष्ट्रीय **रामसर (Ramsar)** स्थल घोषित है?',
      opts: ['नांदूर मध्यमेश्वर पक्षी अभयारण्य', 'भीमाशंकर वन', 'पन्हाला पहाड़ी', 'चाकण बावड़ी'],
      exp: 'नांदूर मध्यमेश्वर महाराष्ट्र का प्रथम रामसर आर्द्रभूमि स्थल है (लोनार झील व ठाणे क्रीक भी रामसर सूची में हैं)।',
    },
  },
  {
    topic: 'Waterman Rajendra Singh Tarun Bharat Sangh Johads',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Featured in NCERT Std 5 EVS ("Every Drop Counts"), how did Darki Mai’s village in Alwar (Rajasthan) and Dr. Rajendra Singh’s *Tarun Bharat Sangh* revive parched seasonal streams and wells?',
      opts: [
        'By mobilizing villagers collectively to build traditional earthen rainwater-harvesting ponds and check-dams called **Johads**, recharging village groundwater naturally',
        'By digging `500-metre` deep industrial tubewells continuously',
        'By importing bottled river water via cargo airplanes',
        'By paving all village pastures with concrete sheets',
      ],
      exp: 'Community-built `Johads` captured monsoon runoff, refilling dried aquifers and bringing dried rivers like the Arvari back to life.',
    },
    mr: {
      q: '"थेंब थेंब पाणी" या पाठात राजस्थानमधील अलवर जिल्ह्यात डॉ. राजेंद्र सिंग ("वॉटरमॅन ऑफ इंडिया") व गावकऱ्यांनी सुकलेले ओढे व विहिरी पुन्हा कशा जिवंत केल्या?',
      opts: [
        'संपूर्ण गावाने एकत्र येऊन **जोहड (Johads)** नावाचे पारंपरिक मातीचे बंधारे व तळी बांधून पावसाचे पाणी जमिनीत मुरवले',
        '५०० मीटर खोल यांत्रिक बोअरवेल खोदून',
        'विमानाने बाटलीबंद पाणी मागवून',
        'संपूर्ण कुरणावर सिमेंट-काँक्रीट टाकून',
      ],
      exp: 'लोकसहभागातून बांधलेल्या जोहडांमुळे भूजल पातळी वाढून कोरड्या नद्या पुन्हा प्रवाहित झाल्या.',
    },
    hi: {
      q: 'कक्षा 5 EVS ("बूँद-बूँद, दरिया-दरिया") में राजेंद्र सिंह ("भारत के जलपुरुष") और अलवर के ग्रामीणों ने सूखी नदियों व कुओं को फिर से कैसे जीवित किया?',
      opts: [
        'सामूहिक श्रम से **जोहड़ (Johads)** नामक पारंपरिक मिट्टी के ताल व चेक-डैम बनाकर वर्षा जल से भूजल पुनर्भरण करके',
        '500 मीटर गहरे अनगिनत बोरवेल खोदकर',
        'हवाई जहाज़ से पानी मँगवाकर',
        'चरागाहों पर पक्की सीमेंट बिछाकर',
      ],
      exp: 'सामुदायिक जोहड़ निर्माण ने सूखे इलाकों में भूजल संचयन और मृत नदियों के पुनर्जीवन का ऐतिहासिक उदाहरण प्रस्तुत किया।',
    },
  },
  {
    topic: 'Suryamani Torang Jharkhand Whose Forests Collective Bank',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In NCERT Std 5 EVS ("Whose Forests?"), what does Suryamani’s `Torang` centre in Jharkhand highlight through the Kurukh slogan *"Forests are our collective bank"*?',
      opts: [
        'Sustainable Adivasi forest stewardship: conserving medicinal herbs, bamboo, fruits, language, and livelihoods while taking only what regenerates without destroying biodiversity',
        'Clearing every bamboo grove to build shopping malls',
        'Treating forests as private personal vaults locked against local communities',
        'Cutting all Sal trees once every five years',
      ],
      exp: 'Suryamani (Girl Star) and the Right to Forest Act (2007) underscore community conservation and respect for indigenous ecological wisdom.',
    },
    mr: {
      q: 'झारखंडमधील सूर्यमणी यांचे "तोरंग" केंद्र आणि "जंगल ही आमची सामुदायिक बँक आहे" ही आदिवासी संकल्पना काय संदेश देते?',
      opts: [
        'वनवासी समुदाय जंगलाची नासाडी न करता औषधी वनस्पती, बांबू, फळे, संस्कृती व उपजीविका यांचे शाश्वत जतन करतात—फक्त गरजेपुरताच वापर करून निसर्ग टिकवतात',
        'सर्व बांबूची बने तोडून मॉल बांधणे',
        'जंगल फक्त एका श्रीमंत व्यक्तीची मालमत्ता मानणे',
        'दर पाच वर्षांनी सर्व साल वृक्ष तोडणे',
      ],
      exp: 'सूर्यमणी यांचा संघर्ष व वनहक्क कायदा २००७ स्थानिक समुदायांच्या निसर्ग-पूरक संवर्धन ज्ञानाचा सन्मान करतो.',
    },
    hi: {
      q: 'कक्षा 5 EVS ("किसके जंगल?") में झारखंड की सूर्यमणि का "तोरंग" केंद्र और "जंगल हमारा साझा बैंक है" विचार क्या संदेश देता है?',
      opts: [
        'आदिवासी समुदाय जैवविविधता नष्ट किए बिना औषधियों, बाँस, फलों, अपनी संस्कृति व आजीविका का टिकाऊ संरक्षण करते हैं',
        'सभी बाँस काटकर शॉपिंग मॉल बनाना',
        'जंगल को एक व्यक्ति की निजी तिजोरी मानना',
        'हर पाँच साल में सभी साल पेड़ काटना',
      ],
      exp: 'सूर्यमणि का कार्य व वन अधिकार अधिनियम (2007) सामुदायिक वन-संरक्षण और पारंपरिक ज्ञान के सम्मान पर बल देता है।',
    },
  },
  {
    topic: 'Pole Star Dhruv Tara & Jantar Mantar Sundial Direction',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Before magnetic compasses were widespread, why did nocturnal travellers in India look for the **Pole Star (`Dhruv Tara`)**, and how did Sawai Jai Singh’s `Jantar Mantar` observatories measure local daytime hours?',
      opts: [
        '`Dhruv Tara` aligns above Earth’s North Pole and appears stationary due **North**, while giant stone sundials (`Samrat Yantra`) tracked shifting Sun shadows across calibrated arcs',
        '`Dhruv Tara` orbits across the southern horizon every two hours',
        'Sundials measured wind speed using wool flags',
        '`Dhruv Tara` shines brightest only on new-moon days',
      ],
      exp: 'Polaris aligns almost directly with Earth’s northern rotational axis, staying fixed North, while Jantar Mantar gnomons track solar shadow geometry.',
    },
    mr: {
      q: 'होकायंत्रापूर्वी भारतातील प्रवासी रात्री दिशा ठरवण्यासाठी **ध्रुव ताऱ्याचा (`Pole Star`)** आणि दिवसा वेळ मोजण्यासाठी सवाई जयसिंगांच्या **जंतर मंतर** वेधशाळेचा वापर कसा करत?',
      opts: [
        'ध्रुव तारा पृथ्वीच्या उत्तर ध्रुवाच्या अक्षावर स्थिर असल्याने नेहमी अचूक **उत्तर दिशा** दाखवतो, तर जंतर मंतरमधील महाकाय सूर्यघड्याळे सावलीच्या कोनावरून अचूक वेळ दाखवत',
        'ध्रुव तारा दर दोन तासांनी दक्षिणेकडे सरकतो',
        'सूर्यघड्याळ वाऱ्याचा वेग मोजते',
        'ध्रुव तारा फक्त अमावस्येलाच दिसतो',
      ],
      exp: 'पृथ्वीच्या परिवलन अक्षाच्या दिशेने असल्याने ध्रुव तारा स्थिर दिसतो आणि सूर्यघड्याळ सावलीच्या लांबी-कोनावरून स्थानिक वेळ मोजते.',
    },
    hi: {
      q: 'दिशासूचक से पहले रात्रि यात्री **ध्रुव तारा (`Pole Star`)** और दिन में **जंतर-मंतर** की वेधशालाओं का उपयोग कैसे करते थे?',
      opts: [
        'ध्रुव तारा पृथ्वी के उत्तरी अक्ष के ठीक ऊपर स्थिर रहकर सदैव **उत्तर दिशा** बताता है, जबकि जंतर-मंतर के विशाल धूपघड़ी (सम्राट यंत्र) सूर्य की छाया से समय नापते थे',
        'ध्रुव तारा हर दो घंटे में दक्षिण चला जाता है',
        'धूपघड़ी हवा की गति मापती थी',
        'ध्रुव तारा केवल अमावस्या को दिखता है',
      ],
      exp: 'पृथ्वी के घूर्णन अक्ष से संरेखित होने के कारण ध्रुव तारा अचल उत्तर दिशा का विश्वसनीय संकेतक है।',
    },
  },
  {
    topic: 'Sericulture Silkworm Cocoon Paithani vs Bast Jute Fibre',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Match these natural textile fibres used across India—**Silk (`Paithani` of Yeola/Paithan)**, **Cotton**, **Jute**, and **Wool**—to their exact biological source:',
      opts: [
        'Silk = insect pupa cocoon thread; Cotton = seed hair boll; Jute = plant stem fibre; Wool = sheep/yak/goat fleece',
        'Silk = mulberry tree root bark; Cotton = silkworm saliva',
        'Jute = yak hair; Wool = cotton seed pods',
        'Silk = coal petroleum plastic; Jute = fruit peel',
      ],
      exp: 'Natural fibres span animal protein fibres (`silk cocoon, wool fleece`) and plant cellulose fibres (`cotton seed-hair, jute stem bast`).',
    },
    mr: {
      q: 'येवला-पैठणच्या पैठणीतील **रेशीम**, **कापूस**, **ताग (Jute)** आणि **लोकर** या नैसर्गिक धाग्यांचे अचूक उगमस्रोत कोणते?',
      opts: [
        'रेशीम = रेशीम किड्याचा कोष; कापूस = बियांचे बोंड; ताग = वनस्पतीच्या खोडाचे तंतू; लोकर = मेंढी/याक/शेळीचे केस',
        'रेशीम = तुतीच्या मुळांची साल; कापूस = अळीची लाळ',
        'ताग = शेळीचे केस; लोकर = कापसाची बोंडे',
        'रेशीम = दगडी कोळसा; ताग = फळांची साल',
      ],
      exp: 'प्राणिज तंतू (रेशीम कोष व लोकर) आणि वनस्पती तंतू (कापूस फळ-बोंड व ताग खोड) यांतील फरक तंतू-ओळख पाठात शिकवला जातो.',
    },
    hi: {
      q: 'प्राकृतिक रेशों—**रेशम (पैठणी वस्त्र)**, **कपास**, **जूट (पटसन)** और **ऊन**—का उनके सही जैविक स्रोत से मिलान क्या है?',
      opts: [
        'रेशम = रेशमकीट का कोकून; कपास = बीज के रेशे (बिनौला); जूट = पौधे के तने का रेशा; ऊन = भेड़/याक/बकरी के बाल',
        'रेशम = शहतूत की जड़; कपास = कीट की लार',
        'जूट = याक के बाल; ऊन = कपास फल',
        'रेशम = कोयला; जूट = फलों का छिलका',
      ],
      exp: 'रेशम व ऊन जंतु रेशे हैं, जबकि कपास (बीज) और जूट (तना) पादप रेशे हैं।',
    },
  },
  {
    topic: 'Bronze Alloy Copper Tin & Iron Rusting Prevention',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In NCERT Std 5 ("Walls Tell Stories" on Golconda bronze cannons), what metals combine to form **Bronze**, and what two environmental agents must both be blocked by paint/oil to keep **Iron** tools from rusting?',
      opts: [
        'Bronze = Copper + Tin (`तांबे + कथिल`); Iron rusting requires blocking BOTH Moisture (water) and Oxygen (air)',
        'Bronze = Iron + Mercury; Iron rusts only in dry vacuum',
        'Bronze = Gold + Aluminium; Iron requires darkness only',
        'Bronze = Lead + Plastic; Iron requires carbon dioxide alone',
      ],
      exp: 'Artisans alloyed soft copper with tin into tough non-rusting bronze centuries ago; iron oxidizes only when exposed simultaneously to water and oxygen.',
    },
    mr: {
      q: '"किल्ल्यांच्या गोष्टी" मध्ये उल्लेख असलेला **कांस्य (Bronze)** हा मिश्रधातू कोणत्या धातूंपासून बनतो आणि **लोखंडाला** गंजण्यापासून वाचवण्यासाठी रंग किंवा तेलाने कोणते दोन घटक रोखावे लागतात?',
      opts: [
        'कांस्य = तांबे + कथिल (`Copper + Tin`); लोखंड गंजण्यासाठी पाणी (ओलावा) आणि ऑक्सिजन (हवा) हे दोन्ही रोखणे आवश्यक असते',
        'कांस्य = लोखंड + पारा; लोखंड फक्त कोरड्या निर्वात जागेत गंजते',
        'कांस्य = सोने + ॲल्युमिनियम; लोखंड फक्त अंधारात गंजते',
        'कांस्य = शिसे + प्लॅस्टिक; लोखंड फक्त कार्बन डायऑक्साइडने गंजते',
      ],
      exp: 'तांबे व कथिल यांच्या संयोगातून टिकाऊ कांस्य बनते, तर लोखंडावर तेल-रंग देऊन हवा व ओलावा यांचा संपर्क तोडल्यास गंज येत नाही.',
    },
    hi: {
      q: 'कक्षा 5 EVS ("बोलती इमारतें") में वर्णित **काँसा (Bronze)** किन धातुओं का मिश्रण है और **लोहे** को जंग लगने से बचाने के लिए पेंट/तेल द्वारा किन दो कारकों को रोकना ज़रूरी है?',
      opts: [
        'काँसा = ताँबा + टिन (`Copper + Tin`); लोहे में जंग लगने के लिए नमी (जल) और ऑक्सीजन (हवा) दोनों की उपस्थिति रोकनी पड़ती है',
        'काँसा = लोहा + पारा; लोहा सूखे निर्वात में जंग खाता है',
        'काँसा = सोना + एल्युमिनियम',
        'लोहा केवल कार्बन डाइऑक्साइड से जंग खाता है',
      ],
      exp: 'ताँबे और टिन से बना काँसा अत्यंत टिकाऊ होता है; लोहे पर तेल या पेंट लगाकर हवा व नमी का संपर्क रोका जाता है।',
    },
  },
  {
    topic: 'Deccan Plateau Volcanic Basalt & Nilgiri Ghats Junction',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Much of Maharashtra rests on the **Deccan Plateau**, formed millions of years ago by ancient fissure volcanic lava flows creating dark **Basalt** rock—and far to the south, India’s Western Ghats (`Sahyadri`) and Eastern Ghats converge at which hill complex?',
      opts: ['Nilgiri Hills', 'Aravalli Range', 'Vindhya Range', 'Purvanchal Hills'],
      exp: 'Deccan Traps basalt weathered into fertile black Regur soil, while the Western and Eastern Ghats join geographically at the Nilgiri Hills.',
    },
    mr: {
      q: 'ज्वालामुखीच्या लाव्हा रसापासून बनलेल्या काळ्या **बेसॉल्ट (Basalt)** खडकाचे दख्खनचे पठार महाराष्ट्रात पसरलेले आहे; तर दक्षिणेकडे पश्चिम घाट (सह्याद्री) आणि पूर्व घाट कोणत्या डोंगररांगेत एकत्र येतात?',
      opts: ['निलगिरी डोंगररांग', 'अरवली पर्वतरांग', 'विंध्य पर्वत', 'पूर्वांचल टेकड्या'],
      exp: 'दख्खनच्या बेसॉल्ट खडकापासून काळी रेगूर मृदा तयार झाली, आणि पश्चिम व पूर्व घाटांचा संगम निलगिरी पर्वतरांगेत होतो.',
    },
    hi: {
      q: 'महाराष्ट्र में विशाल दक्कन पठार प्राचीन लावा प्रवाह से बने गहरे **बेसाल्ट (Basalt)** शैल से निर्मित है; दक्षिण भारत में पश्चिमी घाट और पूर्वी घाट किस पर्वत गाँठ पर मिलते हैं?',
      opts: ['नीलगिरि पहाड़ियाँ', 'अरावली पर्वत', 'विंध्य पर्वत', 'पूर्वांचल पहाड़ियाँ'],
      exp: 'दक्कन के बेसाल्ट अपक्षय से कपास की काली मिट्टी बनी तथा पश्चिमी व पूर्वी घाट का संगम नीलगिरि की पहाड़ियों पर होता है।',
    },
  },
  {
    topic: 'Maharashtra Hill Forts vs Sea Forts Sindhudurg Janjira',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In Balbharati Std 4 ("Shivaji Maharaj’s Forts"), which pair classifies one famous **Sea Fort (Jaldurg)** and one famous **Hill Fort (Giridurg)** of Maharashtra accurately?',
      opts: [
        'Sea Fort: Sindhudurg (Malvan Island) | Hill Fort: Raigad (Sahyadri Crest)',
        'Sea Fort: Pratapgad | Hill Fort: Vijaydurg',
        'Sea Fort: Torna | Hill Fort: Murud-Janjira',
        'Sea Fort: Sinhagad | Hill Fort: Suvarnadurg',
      ],
      exp: 'Sindhudurg, Murud-Janjira, Suvarnadurg, and Vijaydurg guarded the Konkan coast (`Jaldurg`), while Raigad, Torna, Pratapgad, and Sinhagad crowned steep Sahyadri peaks (`Giridurg`).',
    },
    mr: {
      q: 'महाराष्ट्रातील किल्ल्यांच्या वर्गीकरणानुसार एक प्रसिद्ध **जलदुर्ग (सागरी किल्ला)** आणि एक प्रसिद्ध **गिरिदुर्ग (डोंगरी किल्ला)** यांची बरोबर जोडी कोणती?',
      opts: [
        'जलदुर्ग: सिंधुदुर्ग (मालवण) | गिरिदुर्ग: रायगड (सह्याद्री)',
        'जलदुर्ग: प्रतापगड | गिरिदुर्ग: विजयदुर्ग',
        'जलदुर्ग: तोरणा | गिरिदुर्ग: मुरुड-जंजिरा',
        'जलदुर्ग: सिंहगड | गिरिदुर्ग: सुवर्णदुर्ग',
      ],
      exp: 'सिंधुदुर्ग, सुवर्णदुर्ग, विजयदुर्ग व जंजिरा हे सागरी जलदुर्ग आहेत तर रायगड, तोरणा, प्रतापगड व सिंहगड हे डोंगरी गिरिदुर्ग आहेत.',
    },
    hi: {
      q: 'महाराष्ट्र के ऐतिहासिक दुर्गों में एक प्रसिद्ध **जलदुर्ग (समुद्री किला)** और एक प्रसिद्ध **गिरिदुर्ग (पहाड़ी किला)** का सही युग्म कौन-सा है?',
      opts: [
        'जलदुर्ग: सिंधुदुर्ग (मालवण द्वीप) | गिरिदुर्ग: रायगढ़ (सह्याद्रि पर्वत)',
        'जलदुर्ग: प्रतापगढ़ | गिरिदुर्ग: विजयदुर्ग',
        'जलदुर्ग: तोरणा | गिरिदुर्ग: मुरुड-जंजीरा',
        'जलदुर्ग: सिंहगढ़ | गिरिदुर्ग: सुवर्णदुर्ग',
      ],
      exp: 'सिंधुदुर्ग, विजयदुर्ग व जंजीरा प्रमुख समुद्री जलदुर्ग हैं, जबकि रायगढ़, तोरणा व सिंहगढ़ पहाड़ी गिरिदुर्ग हैं।',
    },
  },
  {
    topic: 'Tarabai Shinde Stri Purush Tulana & Chhatrapati Sambhaji Maharaj',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'From Maharashtra’s rich social-reform heritage, who authored the pioneering 1882 Marathi treatise *Stri-Purush Tulana* (`Comparison Between Women and Men`), challenging double standards against widows and women’s rights?',
      opts: ['Tarabai Shinde (Buldhana)', 'Muktabai', 'Rani Tarabai Bhosale', 'Ahilyabai Holkar'],
      exp: 'Tarabai Shinde from Buldhana wrote *Stri-Purush Tulana* (`1882`), widely regarded as one of modern India’s earliest feminist critiques.',
    },
    mr: {
      q: 'महाराष्ट्राच्या समाजसुधारणा चळवळीत १८८२ मध्ये "स्त्री-पुरुष तुलना" हा ऐतिहासिक ग्रंथ लिहून महिलांवरील अन्याय्य दुहेरी निकषांवर परखड प्रहार कोणी केला?',
      opts: ['ताराबाई शिंदे (बुलढाणा)', 'संत मुक्ताबाई', 'महाराणी ताराबाई भोसले', 'अहिल्याबाई होळकर'],
      exp: 'बुलढाणा येथील ताराबाई शिंदे यांनी १८८२ मध्ये "स्त्री-पुरुष तुलना" हा भारतातील आद्य स्त्रीवादी क्रांतिकारक निबंध लिहिला.',
    },
    hi: {
      q: 'महाराष्ट्र की समाज-सुधार विरासत में 1882 में "स्त्री-पुरुष तुलना" नामक अग्रणी पुस्तक लिखकर महिलाओं के प्रति दोहरे सामाजिक मापदंडों को चुनौती किसने दी?',
      opts: ['ताराबाई शिंदे (बुलढाणा)', 'संत मुक्ताबाई', 'महारानी ताराबाई भोसले', 'अहिल्याबाई होल्कर'],
      exp: 'बुलढाणा (महाराष्ट्र) की ताराबाई शिंदे की रचना "स्त्री-पुरुष तुलना" (1882) आधुनिक भारतीय नारीवादी चिंतन की आधारशिला मानी जाती है।',
    },
  },
  {
    topic: 'Maharani Tarabai Bhosale Maratha Resistance History',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Who demonstrated extraordinary administrative and military leadership after Chhatrapati Rajaram Maharaj (`1700`), defending Maharashtra’s Swarajya tirelessly for seven critical years against Aurangzeb’s massive imperial army?',
      opts: ['Maharani Tarabai Bhosale', 'Rajmata Jijabai', 'Lakshmibai of Jhansi', 'Kittur Chennamma'],
      exp: 'Balbharati history honors Maharani Tarabai’s fearless strategic command (`1700–1707`), shifting Maratha forces swiftly across Malwa and Deccan.',
    },
    mr: {
      q: 'छत्रपती राजाराम महाराज यांच्या निधनानंतर (`1700`) मुघल सम्राट औरंगजेबाच्या प्रचंड सैन्याशी सात वर्षे अखंड झुंज देत स्वराज्याचे नेतृत्व करणाऱ्या शूर महाराणी कोण?',
      opts: ['महाराणी ताराबाई भोसले', 'राजमाता जिजाबाई', 'झाशीची राणी लक्ष्मीबाई', 'राणी चेन्नम्मा'],
      exp: 'महाराणी ताराबाईंनी सन १७०० ते १७०७ या अत्यंत कठीण काळात स्वराज्याचे शौर्यपूर्ण व कुशल संरक्षण केले.',
    },
    hi: {
      q: '1700 में छत्रपति राजाराम महाराज के निधन के बाद लगातार सात वर्षों तक मुगल सम्राट औरंगज़ेब की विशाल सेना के विरुद्ध स्वराज्य का अदम्य नेतृत्व किसने किया?',
      opts: ['महारानी ताराबाई भोसले', 'राजमाता जिजाबाई', 'झाँसी की रानी लक्ष्मीबाई', 'किट्टूर चेन्नम्मा'],
      exp: 'महारानी ताराबाई ने अद्वितीय रणनीतिक कौशल और साहस से विपरीत परिस्थितियों में मराठा स्वराज्य की रक्षा की।',
    },
  },
  {
    topic: 'Nana Shankarsheth Pioneers Railways & Early Bombay Schools',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Often called the "Architect of Modern Mumbai", which Maharashtra social benefactor championed India’s first passenger railway (`Mumbai–Thane, 1853`), girls’ schools alongside Phule, and educational colleges in western India?',
      opts: ['Jagannath (Nana) Shankarsheth', 'Dadoba Pandurang', 'Gopal Ganesh Agarkar', 'Vishnushastri Chiplunkar'],
      exp: 'Nana Shankarsheth helped establish the Great Indian Peninsula Railway (`1853`), Native Education Society schools, and supported Phule’s pioneering women’s education.',
    },
    mr: {
      q: 'आधुनिक मुंबईचे शिल्पकार मानले जाणारे व भारतातील पहिली रेल्वे (`मुंबई–ठाणे, 1853`) तसेच पश्चिम भारतातील आद्य शाळा-महाविद्यालयांच्या उभारणीत अग्रणी योगदान देणारे कोण?',
      opts: ['नाना जगन्नाथ शंकरशेठ', 'दादोबा पांडुरंग', 'गोपाळ गणेश आगरकर', 'विष्णुशास्त्री चिपळूणकर'],
      exp: 'नाना शंकरशेठ यांनी मुंबई-ठाणे रेल्वे प्रकल्प, एलफिन्स्टन संस्था व शिक्षणप्रसारात अमूल्य भूमिका बजावली.',
    },
    hi: {
      q: '"आधुनिक मुंबई के शिल्पकार" कहे जाने वाले किस महाराष्ट्र समाजसेवी ने भारत की प्रथम रेल (`मुंबई–ठाणे, 1853`) तथा पश्चिमी भारत में प्रारंभिक विद्यालयों की स्थापना में अग्रणी भूमिका निभाई?',
      opts: ['जगन्नाथ (नाना) शंकरशेठ', 'दादोबा पांडुरंग', 'गोपाल गणेश अगरकर', 'विष्णुशास्त्री चिपलूणकर'],
      exp: 'नाना शंकरशेठ ने मुंबई-ठाणे रेल और जन-शिक्षा संस्थानों के विकास में ऐतिहासिक योगदान दिया।',
    },
  },
  {
    topic: 'Democracy Voting Age 18 & Secret Ballot Civic Duty',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In Indian Civics taught in Class 5–6, at what minimum age does an Indian citizen earn the right to vote under Universal Adult Franchise, and why is voting conducted via **Secret Ballot**?',
      opts: [
        'At age `18` years; Secret Ballot protects every voter’s freedom from intimidation, bribery, or pressure when choosing leaders',
        'At age `25` years; votes are shouted aloud in village squares',
        'At age `14` years; only landowners hold ballot rights',
        'At age `21` years exclusively for city taxpayers',
      ],
      exp: 'Every citizen aged `18+` holds one equal vote (Universal Adult Franchise) cast privately by secret ballot to keep elections free and fair.',
    },
    mr: {
      q: 'भारतीय संविधानानुसार नागरिकाला किती व्या वर्षी मतदानाचा हक्क मिळतो आणि निवडणुकीत **गुप्त मतदान (Secret Ballot)** पद्धत का वापरली जाते?',
      opts: [
        'वयाच्या `18` व्या वर्षी; गुप्त मतदानामुळे मतदारावर कोणाचाही दबाव किंवा दडपण न येता निर्भयपणे योग्य उमेदवार निवडता येतो',
        'वयाच्या `25` व्या वर्षी; गावचौकात ओरडून मत देण्यासाठी',
        'फक्त `14` व्या वर्षी व जमीनदारांसाठी',
        'केवळ `21` वर्षांवरील करदात्यांसाठी',
      ],
      exp: 'प्रौढ मताधिकारानुसार `18` वर्षांवरील प्रत्येक नागरिकाला समान मतदानाचा हक्क असून गुप्त मतदान लोकशाही निर्भय ठेवते.',
    },
    hi: {
      q: 'भारतीय लोकतंत्र में नागरिक को किस न्यूनतम आयु में मताधिकार (सार्वभौमिक वयस्क मताधिकार) मिलता है और मतदान **गुप्त मतदान (Secret Ballot)** द्वारा क्यों होता है?',
      opts: [
        '`18` वर्ष की आयु में; गुप्त मतदान प्रत्येक मतदाता को बिना किसी डर, दबाव या प्रलोभन के स्वतंत्र रूप से प्रतिनिधि चुनने की रक्षा देता है',
        '`25` वर्ष की आयु में; चौराहे पर जोर से बोलकर चुनने हेतु',
        '`14` वर्ष में केवल ज़मींदारों के लिए',
        '`21` वर्ष केवल शहरवासियों के लिए',
      ],
      exp: '`18` वर्ष की आयु से प्रत्येक नागरिक को एक समान मत का अधिकार है और गुप्त मतदान निष्पक्ष चुनाव सुनिश्चित करता है।',
    },
  },
  {
    topic: 'Konkan Rivers North To South Geographical Sequence',
    pattern: 'Conceptual',
    difficulty: 'Difficult',
    en: {
      q: 'Moving **North to South** along Maharashtra’s Konkan coastline from Palghar toward Sindhudurg, which sequence lists coastal rivers in correct geographical order?',
      opts: [
        'Vaitarna → Ulhas → Savitri → Vashishti → Shastri',
        'Shastri → Vaitarna → Savitri → Ulhas → Terekhol',
        'Savitri → Vaitarna → Terekhol → Ulhas → Karli',
        'Terekhol → Vashishti → Ulhas → Vaitarna → Savitri',
      ],
      exp: 'Going North-to-South across Konkan: Damanganga / Vaitarna (Palghar) → Ulhas (Thane/Raigad) → Amba/Kundalika → Savitri (Raigad/Ratnagiri border) → Vashishti (Chiplun) → Shastri → Karli → Terekhol (Sindhudurg).',
    },
    mr: {
      q: 'महाराष्ट्राच्या कोकण किनारपट्टीवरील नद्यांचा **उत्तरेकडून दक्षिणेकडे** जाणारा अचूक भौगोलिक क्रम कोणता?',
      opts: [
        'वैतरणा → उल्हास → सावित्री → वाशिष्ठी → शास्त्री',
        'शास्त्री → वैतरणा → सावित्री → उल्हास → तेरेखोल',
        'सावित्री → वैतरणा → तेरेखोल → उल्हास → कर्ली',
        'तेरेखोल → वाशिष्ठी → उल्हास → वैतरणा → सावित्री',
      ],
      exp: 'कोकणात उत्तरेकडून दक्षिणेकडे पालघरची वैतरणा, ठाणे-रायगडची उल्हास, रायगड-रत्नागिरी सीमेवरील सावित्री व पुढे वाशिष्ठी-शास्त्री असा क्रम आहे.',
    },
    hi: {
      q: 'महाराष्ट्र के कोंकण तट के साथ **उत्तर से दक्षिण** की ओर बहने वाली तटीय नदियों का सही भौगोलिक क्रम कौन-सा है?',
      opts: [
        'वैतरणा → उल्हास → सावित्री → वाशिष्ठी → शास्त्री',
        'शास्त्री → वैतरणा → सावित्री → उल्हास → तेरेखोल',
        'सावित्री → वैतरणा → तेरेखोल → उल्हास → कर्ली',
        'तेरेखोल → वाशिष्ठी → उल्हास → वैतरणा → सावित्री',
      ],
      exp: 'पालघर से सिंधुदुर्ग की ओर क्रमशः वैतरणा, उल्हास, सावित्री, वाशिष्ठी और शास्त्री नदियाँ आती हैं।',
    },
  },
  {
    topic: 'Fire Triangle Stop Drop Roll Cutting Oxygen Safety',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'If a kitchen stove grease flare or stray spark sets someone’s clothes alight, why must they **STOP, DROP to the floor, and ROLL wrapped in a thick woollen/cotton blanket** instead of running out into the wind?',
      opts: [
        'Running feeds fresh oxygen (`air`) fanning flames taller, whereas rolling tightly in a heavy blanket smothers the fire by cutting off its **Oxygen** supply',
        'Running drops water droplets onto floors',
        'Blankets add electrical static sparks',
        'Oxygen extinguishes fire only above `100°C`',
      ],
      exp: 'Fire needs three things (`Fuel + Heat + Oxygen`); smothering flames cuts oxygen immediately (just as sand or `CO2` extinguishers work).',
    },
    mr: {
      q: 'अंगावरील कपड्यांनी चुकून पेट घेतल्यास पळत न सुटता जमिनीवर लोळून अंगाभोवती जाड गोधडी किंवा ब्लँकेट गुंडाळण्याचा सल्ला का दिला जातो?',
      opts: [
        'धावल्यास वाऱ्यामुळे आगीला अधिक **ऑक्सिजन** मिळून ज्वाळा भडकतात; उलट लोळल्याने व घट्ट ब्लँकेटने ऑक्सिजनचा पुरवठा बंद होऊन आग लगेच विझते',
        'धावल्याने जमिनीवर पाणी सांडते',
        'ब्लँकेटमध्ये विद्युत ठिणग्या असतात',
        'ऑक्सिजन आग विझवतो म्हणून',
      ],
      exp: 'ज्वलनासाठी इंधन, उष्णता व ऑक्सिजन हे तीन घटक लागतात; ब्लँकेटने हवा (ऑक्सिजन) रोखताच आग विझते.',
    },
    hi: {
      q: 'यदि किसी के कपड़ों में आग लग जाए तो हवा में दौड़ने के बजाय **रुककर, ज़मीन पर लोटने और मोटा कंबल लपेटने** की सलाह क्यों दी जाती है?',
      opts: [
        'दौड़ने से तेज़ हवा अधिक **ऑक्सीजन** देकर लपटें भड़काती है, जबकि कंबल लपेटकर लोटने से ऑक्सीजन की आपूर्ति कट जाती है और आग बुझ जाती है',
        'दौड़ने से फर्श पर पानी फैलता है',
        'कंबल बिजली पैदा करता है',
        'ऑक्सीजन आग बुझाने वाली गैस है',
      ],
      exp: 'आग के लिए ईंधन, ताप और ऑक्सीजन आवश्यक हैं; कंबल से ढककर ऑक्सीजन रोकते ही आग बुझ जाती है।',
    },
  },
];
