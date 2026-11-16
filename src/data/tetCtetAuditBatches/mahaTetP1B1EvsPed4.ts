import { CuratedTrilingualMcq } from './types';

// MAHA TET Paper 1 (Classes 1-5) — EVS Pedagogy Part 4 (35 Distinct Misconceptions, Yashpal Burden-Free, KWL & Inclusive Pedagogy Items)
export const MAHA_TET_P1_B1_EVS_P4: CuratedTrilingualMcq[] = [
  {
    topic: 'Yashpal Committee 1993 Learning Without Burden in EVS',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why did the landmark Yashpal Committee Report ("Learning Without Burden", 1993) warn sharply against stuffing thick encyclopedia facts into primary EVS textbooks?',
      opts: [
        'Dense unexplained information forces joyless rote cramming; genuine learning blooms through fewer core themes explored deeply via curiosity and direct experience',
        'Printed books weigh too heavily for trucks to carry',
        'Primary children should only study advanced calculus',
        'Teachers prefer lecturing purely from empty chalkboards',
      ],
      exp: 'The Yashpal Committee inspired NCF-2005’s shift from encyclopedic memorization to activity-based conceptual depth.',
    },
    mr: {
      q: 'यशपाल समितीच्या १९९३ च्या "ओझ्याविना शिक्षण" (Learning Without Burden) अहवालाने प्राथमिक EVS पुस्तकांत अवाढव्य माहितीचा भडिमार का टाळावा असे ठामपणे सांगितले?',
      opts: [
        'अनावश्यक माहितीची गर्दी केल्याने नीरस घोकंपट्टी वाढते; मोजक्याच मूळ संकल्पना प्रत्यक्ष अनुभव व जिज्ञासेतून सखोल शिकल्यास खरे आकलन होते',
        'पुस्तकांचे वजन ट्रकमधून नेण्यास जड होते म्हणून',
        'मुलांनी फक्त उच्च गणितच शिकावे म्हणून',
        'शिक्षकांनी रिकाम्या फळ्यावरूनच शिकवावे म्हणून',
      ],
      exp: 'यशपाल समितीने "जास्त माहिती"पेक्षा "खरी समज व आनंददायी अनुभव" हा क्रांतिकारी पाया घातला.',
    },
    hi: {
      q: 'यशपाल समिति (१९९३) की "बोझ के बिना शिक्षा" (Learning Without Burden) रिपोर्ट ने प्राथमिक EVS किताबों में भारी-भरकम तथ्य भरने का विरोध क्यों किया?',
      opts: [
        'अधिक बिना समझे तथ्यों से नीरस रटंत बढ़ती है; कम मूल विषयों को जिज्ञासा व प्रत्यक्ष अनुभव से गहराई से समझना वास्तविक अधिगम है',
        'किताबें ट्रक में ढोने हेतु भारी थीं',
        'केवल उच्च गणित पढ़ाने के लिए',
        'बिना किताब के पढ़ाने के लिए',
      ],
      exp: 'यशपाल समिति ने सूचनाओं के बोझ को कम कर अवधारणात्मक स्पष्टता और आनंददायी गतिविधि-आधारित शिक्षण की नींव रखी।',
    },
  },
  {
    topic: 'Using KWL Graphic Charts Before & After Inquiry',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Before starting "Magnets and Compasses", a Class 5 teacher draws a three-column K-W-L Chart ("What I Know" / "What I Wonder" / "What I Learned") on chart paper. What is the prime benefit of filling K and W BEFORE experiments?',
      opts: [
        'It surfaces learners’ prior conceptions and personal curiosity questions, giving learners genuine ownership before exploring and filling L afterwards',
        'It reveals all exam answers on Day 1',
        'It replaces hands-on magnet testing',
        'It forces identical thoughts onto every student',
      ],
      exp: 'K-W-L scaffolds metacognitive tracking from prior ideas through self-posed inquiry to consolidated reflection.',
    },
    mr: {
      q: '"चुंबक व होकायंत्र" हा पाठ सुरू करण्यापूर्वी शिक्षक फळ्यावर K-W-L तक्ता (काय माहीत आहे / काय जाणून घ्यायचे आहे / काय शिकलो) बनवून पहिले दोन रकाने आधी का भरून घेतात?',
      opts: [
        'विद्यार्थ्यांचे पूर्वज्ञान आणि स्वतःचे कुतूहल प्रश्न समोर येतात, ज्यामुळे प्रयोग करताना त्यांना स्वतःच्या प्रश्नांची उत्तरे शोधण्याची गोडी लागते',
        'पहिल्याच दिवशी सर्व परीक्षेची उत्तरे सांगता येतात म्हणून',
        'प्रत्यक्ष प्रयोग करण्याची गरज उरत नाही म्हणून',
        'सर्वांचे विचार एकसारखे करण्यासाठी',
      ],
      exp: 'K-W-L तक्ता पूर्वज्ञान, जिज्ञासा व अध्ययनानंतरचे आत्मपरीक्षण यांना सुंदरपणे जोडतो.',
    },
    hi: {
      q: '"चुंबक और दिक्सूचक" पाठ शुरू करने से पहले शिक्षक K-W-L चार्ट ("मैं क्या जानता हूँ / क्या जानना चाहता हूँ / मैंने क्या सीखा") के पहले दो कॉलम क्यों भरवाता है?',
      opts: [
        'इससे बच्चों का पूर्व-ज्ञान व व्यक्तिगत जिज्ञासा सामने आती है, और प्रयोग के दौरान बच्चे स्वयं के प्रश्नों के उत्तर खोजने से जुड़ते हैं',
        'पहले दिन परीक्षा के उत्तर देने हेतु',
        'प्रयोग समाप्त करने हेतु',
        'सभी की सोच एक जैसी करने हेतु',
      ],
      exp: 'K-W-L चार्ट पूर्व-ज्ञान, जिज्ञासा-आधारित प्रश्नों और अधिगम के बाद अधिसंज्ञानात्मक समीक्षा को जोड़ता है।',
    },
  },
  {
    topic: 'Clarifying Tumbler Condensation vs "Leaking Glass Pores"',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Seeing water droplets form outside a chilled steel steel bottle, a Class 5 learner assumes "Cold water oozed out through tiny invisible pores in the steel!" Which simple classroom check refutes this misconception clearly?',
      opts: [
        'Drop a dark blue ink drop ONLY inside the iced water—after 10 minutes, the outer surface droplets remain completely CLEAR colourless water (proving they condensed from invisible humid room air, not leaked inside!)',
        'Tell the student loudly "Steel has zero pores; stop guessing"',
        'Smash the steel bottle with a hammer',
        'Freeze the bottle inside a dark cupboard overnight',
      ],
      exp: 'Coloured-ice condensation is an unforgettable discrepant event demonstrating atmospheric water vapour cleanly.',
    },
    mr: {
      q: 'थंडगार स्टीलच्या बाटलीच्या बाहेर पाण्याचे थेंब पाहून एक मूल म्हणते: "आतले थंड पाणी स्टीलच्या सूक्ष्म छिद्रांतून बाहेर झिरपले!" हा गैरसमज कोणत्या साध्या प्रयोगाने त्वरित दूर होईल?',
      opts: [
        'आतल्या बर्फाच्या पाण्यात निळ्या शाईचे दोन थेंब टाकणे — १० मिनिटांनंतरही बाटलीच्या बाहेर साचणारे थेंब पूर्णतः रंगहीन व स्वच्छच राहतात (म्हणजे ते हवेतील बाष्पाचे संघनन आहे!)',
        '"स्टीलला छिद्रे नसतात, गप्प बस!" असे सांगणे',
        'बाटली हातोड्याने फोडणे',
        'बाटली रात्रभर कपाटात ठेवणे',
      ],
      exp: 'रंगीत बर्फाच्या पेल्याचा प्रयोग हवा-बाष्पाचे संघनन थेट पुराव्यानिशी सिद्ध करतो.',
    },
    hi: {
      q: 'ठंडे स्टील गिलास के बाहर पानी की बूँदें देखकर बच्चा कहता है: "भीतर का पानी स्टील के सूक्ष्म छेदों से रिसकर बाहर आ गया!" इस भ्रांति को किस सरल प्रयोग से दूर करेंगे?',
      opts: [
        'भीतर के बर्फीले पानी में नीली स्याही की बूँद डालना — बाहर बनने वाली बूँदें फिर भी बिल्कुल रंगहीन व पारदर्शी रहेंगी (जो हवा की जलवाष्प का संघनन सिद्ध करता है)',
        'केवल कह देना कि स्टील में छेद नहीं होते',
        'गिलास तोड़ देना',
        'गिलास अलमारी में बंद करना',
      ],
      exp: 'रंगीन बर्फीले पानी का प्रयोग प्रत्यक्ष प्रमाण से दिखाता है कि बाहरी बूँदें रिसाव नहीं बल्कि वायुमंडलीय संघनन हैं।',
    },
  },
  {
    topic: 'Clarifying Why Rivers Flow Along Slope Not Always South',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Looking at India’s north–south rivers on a wall map, a student concludes "All rivers flow toward the bottom of India because water goes South!" Using Narmada/Tapi (flowing West) and a tilted clay tray, what core principle should the teacher clarify?',
      opts: [
        'Water always flows downhill from higher land slopes/mountains toward lower seas under gravity—whether East (Godavari/Krishna), West (Narmada/Tapi), or North (Chambal/Son)',
        'Wall maps make water run straight downward onto the floor',
        'Only southern oceans pull river currents magnetically',
        'Rivers never flow westward anywhere in the world',
      ],
      exp: 'Pouring water over a tilted clay relief tray lets pupils see topography slope—not compass direction—governs river flow.',
    },
    mr: {
      q: 'भिंतीवरील नकाशा पाहून एक मूल समजते की "सर्व नद्या फक्त दक्षिणेकडे (खाली) वाहतात!" नर्मदा-तापी (पश्चिमवाहिनी) व उतरत्या मातीच्या ट्रेवरून शिक्षक कोणते मूळ तत्त्व स्पष्ट करेल?',
      opts: [
        'पाणी दिशांवरून नव्हे तर गुरुत्वाकर्षणामुळे नेहमी उंच डोंगर-उताराकडून सखल भागाकडे (मग ती पूर्ववाहिनी गोदावरी असो वा पश्चिमवाहिनी नर्मदा किंवा उत्तरवाहिनी चंबळ) वाहते',
        'भिंतीवरील नकाशा मुळे पाणी खाली पडते',
        'दक्षिण समुद्र चुंबकाने नदी ओढतो',
        'नद्या कधीच पश्चिमेस वाहत नाहीत',
      ],
      exp: 'कलत्या मातीच्या प्रतिकृतीवर पाणी ओतल्याने "उताराच्या दिशेने प्रवाह" ही भौगोलिक संकल्पना सहज कळते.',
    },
    hi: {
      q: 'दीवार के मानचित्र पर देखकर बच्चा सोचता है: "सभी नदियाँ सदैव नीचे (दक्षिण) की ओर ही बहती हैं!" नर्मदा-तापी (पश्चिमवाहिनी) व ढलवाँ मिट्टी की ट्रे से शिक्षक क्या स्पष्ट करेगा?',
      opts: [
        'जल गुरुत्वाकर्षण के कारण सदैव ऊँची भूमि/पहाड़ी ढलान से निचले तल की ओर बहता है—चाहे पूर्व (गोदावरी), पश्चिम (नर्मदा) या उत्तर (चंबल) दिशा हो',
        'दक्षिण महासागर चुंबक की तरह खींचता है',
        'मानचित्र ऊँचा होने से पानी नीचे गिरता है',
        'कोई नदी पश्चिम में नहीं बहती',
      ],
      exp: 'ढलवाँ मॉडल पर पानी बहाकर दिखाने से स्पष्ट होता है कि प्रवाह दिशा पर नहीं, भू-आकृति के ढलान पर निर्भर करता है।',
    },
  },
  {
    topic: 'Addressing "Trees Give Oxygen 24 Hours" Misconception',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Class 5 learners often believe "Plants take CO2 and give Oxygen during the day, so they sleep without breathing at night!" How should the teacher clarify plant respiration accurately?',
      opts: [
        'Explain clearly: Plants respire 24 hours daily (taking O2 and releasing CO2 just like us!), while sunlight-driven Photosynthesis occurs ONLY in daytime producing net excess Oxygen',
        'Confirm plants never perform cellular respiration',
        'Tell pupils trees hold their breath at night',
        'Say night air turns leaf oxygen into solid chalk',
      ],
      exp: 'Separating 24-hour respiration from daytime photosynthesis prevents two classic science misconceptions.',
    },
    mr: {
      q: 'इयत्ता ५ वीच्या मुलांना वाटते की "झाडे फक्त दिवसा ऑक्सिजन देतात व रात्री श्वसन न करता झोपतात!" शिक्षकाने वनस्पती श्वसनाचे अचूक सत्य कसे समजावून सांगावे?',
      opts: [
        'वनस्पती २४ तास श्वसन करतात (प्राण्यांप्रमाणेच O2 घेऊन CO2 सोडतात), परंतु दिवसाच्या सूर्यप्रकाशात प्रकाशसंश्लेषण वेगाने होत असल्याने त्या निव्वळ जास्त ऑक्सिजन बाहेर टाकतात',
        'वनस्पती अजिबात श्वसन करत नाहीत',
        'झाडे रात्री श्वास रोखून धरतात',
        'रात्री ऑक्सिजनचा खडू बनतो',
      ],
      exp: 'श्वसन (२४ तास) व प्रकाशसंश्लेषण (फक्त दिवसा) या दोन स्वतंत्र क्रियांचा फरक स्पष्ट करणे अत्यंत महत्त्वाचे आहे.',
    },
    hi: {
      q: 'बच्चे प्रायः मानते हैं: "पौधे दिन में ऑक्सीजन देते हैं और रात को बिना साँस लिए सो जाते हैं!" शिक्षक पादप श्वसन का सही विज्ञान कैसे स्पष्ट करे?',
      opts: [
        'पौधे भी जीवित प्राणी हैं जो २४ घंटे श्वसन (O2 लेना व CO2 छोड़ना) करते हैं; परंतु दिन के सूर्यप्रकाश में प्रकाश-संश्लेषण की दर अधिक होने से शुद्ध ऑक्सीजन मुक्त होती है',
        'पौधे कभी श्वसन नहीं करते',
        'रात में पौधे साँस रोक लेते हैं',
        'पत्ते रात में जम जाते हैं',
      ],
      exp: 'चौबीस घंटे चलने वाले श्वसन और केवल दिन में होने वाले प्रकाश-संश्लेषण के बीच का अंतर स्पष्ट करना प्रमुख वैचारिक सुधार है।',
    },
  },
  {
    topic: 'Clarifying "Clouds Are Not Solid Cotton Balls"',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Many young pupils picture fluffy sky clouds as solid floating cotton pillows strong enough to sit on. Which concrete analogy & experiment helps Class 4–5 grasp real cloud composition?',
      opts: [
        'Connect morning valley fog/mist and steam condensing above warm kettle droplets—clouds are trillions of tiny weightless liquid water droplets (or ice crystals) suspended on air updrafts',
        'Show white cotton wool balls glued to blue charts only',
        'Tell children astronauts stitch wool clouds aloft',
        'Insist clouds are solid white marble slabs',
      ],
      exp: 'Relating clouds to walk-through ground fog and kettle mist turns magical wool pillows into clear condensation physics.',
    },
    mr: {
      q: 'लहान मुले ढगांना आकाशात तरंगणाऱ्या कापसाच्या गाद्या समजतात. ढगांची खरी रचना स्पष्ट करण्यासाठी कोणता प्रत्यक्ष अनुभव उपयुक्त ठरतो?',
      opts: [
        'थंडीतील जमिनीवरचे धुके व गरम पाण्यावर वाफ थंड होताना दिसणारे सूक्ष्म थेंब दाखवून समजावणे की ढग म्हणजे हवेत तरंगणारे पाण्याचे असंख्य अतिसूक्ष्म थेंब किंवा हिमकण आहेत',
        'निळ्या कागदावर कापसाचे गोळे चिकटवून दाखवणे',
        'अंतराळवीर ढग शिवतात असे सांगणे',
        'ढग संगमरवराचे असतात असे सांगणे',
      ],
      exp: 'धुके आणि ढग एकच आहेत हा संबंध दाखवल्यास कापसाच्या ढगांची बालसुलभ कल्पना शास्त्रीय जाणिवेकडे जाते.',
    },
    hi: {
      q: 'छोटे बच्चे बादलों को रूई के ठोस गद्दे समझते हैं जिन पर बैठा जा सकता है। वास्तविक बादल संरचना समझाने का सबसे सार्थक अनुभव क्या है?',
      opts: [
        'सुबह के कोहरे व भाप के संघनन से जोड़कर समझाना कि बादल हवा में तैरती जल की असंख्य सूक्ष्म बूँदों या हिम-कणों के समूह हैं',
        'चार्ट पर केवल रूई के गोले चिपकाना',
        'बादलों को संगमरमर का बताना',
        'यह कहना कि फरिश्ते रूई रखते हैं',
      ],
      exp: 'धरातल के कोहरे (Fog) और वाष्प के सूक्ष्म कणों से जोड़कर समझाना बच्चों की बादलों संबंधी भ्रांति को सरलता से दूर करता है।',
    },
  },
  {
    topic: 'Iterative Engineering Design: Homemade Water Filter',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'In an iterative EVS design activity, teams build a plastic-bottle filter using cotton, charcoal, fine sand, and pebbles to clean muddy water. When Team B’s water flows still brown on Trial 1, how should the teacher mentor them?',
      opts: [
        'Prompt engineering reflection: "Compare your layer order and thickness with clear filters—what happens if you rinse gravel first or place fine sand below coarse pebbles?"',
        'Immediately give Team B zero marks and dismantle their bottle',
        'Build the whole filter silently for them',
        'Declare muddy water completely clean to end class early',
      ],
      exp: 'Design-test-refine cycles build engineering persistence, troubleshooting, and pride in iteration.',
    },
    mr: {
      q: 'कापूस, कोळसा, बारीक वाळू व खडी वापरून प्लास्टिक बाटलीचे पाणी शुद्धीकरण गाळणी (Filter) बनवताना "गट ब" चे पाणी पहिल्या प्रयत्नात अजूनही गढूळ येते. शिक्षकाने कसे मार्गदर्शन करावे?',
      opts: [
        'पुनर्रचनेस प्रवृत्त करणे: "तुमच्या थरांचा क्रम आणि जाडी तपासूया—आधी खडी धुऊन मोठी खडी वर आणि बारीक वाळू-कोळसा खाली ठेवल्यास काय फरक पडतो ते पाहू!"',
        'गट ब ला ताबडतोब शून्य गुण देऊन बाटली फेकणे',
        'शिक्षकाने स्वतः संपूर्ण गाळणी बनवून देणे',
        'गढूळ पाणी स्वच्छ असल्याचे खोटे सांगणे',
      ],
      exp: 'बनवा–तपासा–सुधारा या अभियांत्रिकी पुनरावृत्ती चक्रातून समस्या निराकरण व वैज्ञानिक आत्मविश्वास वाढतो.',
    },
    hi: {
      q: 'रुई, कोयला, महीन रेत व कंकड़ से बोतल जल-फिल्टर बनाते समय समूह B का पानी पहले प्रयास में भी मटमैला निकलता है। शिक्षक को कैसे मार्गदर्शन करना चाहिए?',
      opts: [
        'डिजाइन समीक्षा हेतु प्रेरित करना: "अपनी परतों के क्रम व मोटाई की जाँच करें—कंकड़ धोकर ऊपर व महीन रेत-कोयला नीचे रखने पर क्या बदलाव आता है?"',
        'तुरंत शून्य अंक दे देना',
        'शिक्षक द्वारा स्वयं पूरा फिल्टर बना देना',
        'मटमैले पानी को ही साफ बता देना',
      ],
      exp: 'निर्माण–परीक्षण–सुधार (Design-Test-Refine) की प्रक्रिया बच्चों में इंजीनियरिंग सोच और धैर्यपूर्ण समस्या-समाधान विकसित करती है।',
    },
  },
  {
    topic: 'Teaching Non-Anthropocentric Food Webs',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'While explaining forest food chains ("Grass → Deer → Tiger"), some pupils label the tiger "cruel, evil villain" and dear deer "innocent angel". What balanced ecological perspective must the teacher foster?',
      opts: [
        'Explain neutrally that predators are not morally wicked—every trophic consumer plays a vital balancing role preventing overgrazing and keeping forests healthy',
        'Agree tigers are wicked monsters that should be wiped out',
        'Claim tigers survive purely on mangoes in real forests',
        'Erase predators from textbook food-web charts',
      ],
      exp: 'Scientific ecology replaces moralistic fairy-tale labels with understanding of energy transfer and ecological balance.',
    },
    mr: {
      q: '"गवत → हरिण → वाघ" ही अन्नसाखळी समजावताना मुले वाघाला "क्रूर खलनायक" म्हणतात. शिक्षकाने कोणता संतुलित पर्यावरणीय दृष्टिकोन स्पष्ट करावा?',
      opts: [
        'निसर्गात शिकारी प्राणी "वाईट किंवा क्रूर" नसतात; प्रत्येक भक्षक (Carnivore) तृणभक्षकांची संख्या मर्यादित ठेवून जंगलाचे व गवताचे आरोग्य संतुलित ठेवतो',
        'वाघ खरोखरच वाईट राक्षस असून त्यांना संपवावे हे मान्य करणे',
        'जंगलातील वाघ फक्त आंबे खाऊन जगतात असे सांगणे',
        'अन्नसाखळीतून वाघाचे नाव काढून टाकणे',
      ],
      exp: 'परीकथेतील नैतिक दृष्टिकोनापेक्षा अन्नसाखळीतील ऊर्जा प्रवाह व निसर्ग-संतुलनाची भूमिका स्पष्ट करणे शास्त्रीय ठरते.',
    },
    hi: {
      q: '"घास → हिरण → बाघ" खाद्य शृंखला पढ़ाते समय कुछ बच्चे बाघ को "क्रूर खलनायक" कहने लगते हैं। शिक्षक को कौन-सा संतुलित पारिस्थितिक दृष्टिकोण स्पष्ट करना चाहिए?',
      opts: [
        'प्रकृति में मांसाहारी जीव नैतिक रूप से बुरे नहीं होते; प्रत्येक उपभोक्ता शाकाहारियों की संख्या नियंत्रित कर वन पारिस्थितिकी का संतुलन बनाए रखता है',
        'बाघों को दुष्ट मानकर समाप्त करने का समर्थन करना',
        'यह कहना कि बाघ जंगल में केवल फल खाते हैं',
        'खाद्य शृंखला से बाघ का नाम हटाना',
      ],
      exp: 'पारिस्थितिक शिक्षा मानवी नैतिक लेबल लगाने के बजाय ऊर्जा प्रवाह और प्राकृतिक संतुलन में प्रत्येक जीव की भूमिका को समझाती है।',
    },
  },
  {
    topic: 'Universal Campus Accessibility Audits for Differently-Abled Empathy',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Guiding Class 5 learners on an "Accessibility Audit" of their school (checking ramp slope gradients, handrail height, toilet door width, tactile paths, and Braille labels) nurtures:',
      opts: [
        'Authentic civic empathy, architectural awareness of barrier-free public spaces, and advocacy for rights of Persons with Disabilities (RPwD Act spirit)',
        'Pitying charity without checking physical barriers',
        'Mocking wheelchair users on staircases',
        'Memorizing building cement costs',
      ],
      exp: 'Auditing physical design barriers shifts perspective from personal "sympathy/pity" to systemic social accessibility and dignity.',
    },
    mr: {
      q: 'इयत्ता ५ वीच्या मुलांना स्वतःच्या शाळेत "सुलभता तपासणी" (Accessibility Audit — रॅम्पचा उतार, आधाराचे दांडे, स्वच्छतागृह दरवाजे, स्पर्शमार्ग) करायला लावल्याने कोणती जाणीव विकसित होते?',
      opts: [
        'अडथळामुक्त सार्वजनिक रचनेची जाणीव, खऱ्या सहानुभूतीची नागरी दृष्टी आणि दिव्यांग व्यक्तींच्या हक्कांप्रति (RPwD Act) आदरभाव',
        'केवळ दयेची भावना आणि अडथळ्यांकडे दुर्लक्ष',
        'पायऱ्यांवर थट्टा करणे',
        'सिमेंटचा खर्च पाठ करणे',
      ],
      exp: 'शारीरिक अडथळे शोधण्याच्या उपक्रमातून दयेऐवजी समान प्रवेशाचा घटनात्मक हक्क व रचनात्मक संवेदनशीलता उमगते.',
    },
    hi: {
      q: 'कक्षा ५ के छात्रों द्वारा विद्यालय का "सुगम्यता ऑडिट" (Accessibility Audit — रैंप की ढलान, रेलिंग, शौचालय चौड़ाई, स्पर्श पथ) कराने से क्या विकसित होता है?',
      opts: [
        'बाधामुक्त सार्वजनिक स्थलों की समझ, संवेदनशील नागरिक दृष्टिकोण तथा दिव्यांगजन अधिकार (RPwD अधिनियम) के प्रति सम्मान',
        'भौतिक बाधाओं की अनदेखी कर केवल दया दिखाना',
        'सीढ़ियों पर उपहास करना',
        'सीमेंट की कीमत याद करना',
      ],
      exp: 'सुगम्यता ऑडिट बच्चों की दृष्टि को सहानुभूति या दया से हटाकर समावेशी डिजाइन और समान नागरिक अधिकारों की ओर ले जाता है।',
    },
  },
  {
    topic: 'Supporting Seasonal Migrant Pupils Joining Mid-Term',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Children of sugarcane-harvesting or brick-kiln migrant workers often join a primary class mid-year without complete prior notebooks. How can the EVS teacher support their smooth integration?',
      opts: [
        'Welcome their rich inter-district travel & livelihood experiences warmly in class, pair supportive peer buddies, offer visual summary bridge sheets, and assess oral/hands-on strengths fairly',
        'Fail them automatically for missing September worksheets',
        'Segregate seasonal children in the last bench silently',
        'Scold them for travelling with their families',
      ],
      exp: 'Compassionate welcoming, peer buddies, and strength-based bridge scaffolding uphold RTE equity.',
    },
    mr: {
      q: 'ऊसतोड किंवा वीटभट्टी कामगारांची स्थलांतरित मुले वर्षाच्या मध्यात अपूर्ण वह्यांसह वर्गात दाखल होतात. EVS शिक्षकाने त्यांचे समावेशन कसे साधावे?',
      opts: [
        'त्यांच्या विविध प्रदेशांतील प्रवास-श्रमाच्या अनुभवांचे आदराने स्वागत करणे, समवयस्क मित्र-मदतनीस जोडणे, चित्रमय संक्षिप्त पूल-साहित्य देणे व तोंडी-कृतीतून मूल्यमापन करणे',
        'सप्टेंबरमधील वह्या नसल्याने थेट नापास करणे',
        'शेवटच्या बाकावर वेगळे बसवणे',
        'स्थलांतरावरून मुलांना रागावणे',
      ],
      exp: 'शिक्षण हक्क कायद्यानुसार (RTE) स्थलांतरित मुलांचे प्रेमाने स्वागत व पूरक आधार देणे हे संवेदनशील शिक्षकाचे कर्तव्य आहे.',
    },
    hi: {
      q: 'गन्ना कटाई या ईंट-भट्टा श्रमिकों के प्रवासी बच्चे प्रायः सत्र के बीच में बिना पिछली कॉपियों के कक्षा में आते हैं। EVS शिक्षक उनका समावेश कैसे करे?',
      opts: [
        'उनके यात्रा व जीवन-अनुभवों का सम्मानपूर्वक स्वागत करना, सहायक सहपाठी जोड़ना, दृश्य सेतु-सामग्री देना व मौखिक/क्रियात्मक आकलन अपनाना',
        'पिछले कार्य न होने पर फेल कर देना',
        'अंतिम बेंच पर अलग बैठाना',
        'परिवार के साथ जाने पर डाँटना',
      ],
      exp: 'प्रवासी बच्चों के समृद्ध जीवन अनुभवों को कक्षा से जोड़ना व सहयोगी सेतु बनाना शिक्षा के अधिकार (RTE) के अनुरूप न्यायसंगत शिक्षण है।',
    },
  },
  {
    topic: 'Swachh Vidyalaya Equality Without Stereotyped Labour',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'During "Clean School & Water Point Care Day", a teacher notices boys picking up heavy banners while insisting "sweeping and mopping are girls’ work" (or targeting specific community children). How must duties be assigned?',
      opts: [
        'Rotate every clean-care task democratically across ALL genders and social backgrounds equally, affirming shared pride and zero stereotyping',
        'Assign sweeping strictly to girls and marginalized groups',
        'Keep boys out of all cleanliness responsibilities',
        'Force only monitor-selected weak learners to clean',
      ],
      exp: 'Inclusive dignity of labour demolishes gender and social hierarchies through equal shared participation.',
    },
    mr: {
      q: '"स्वच्छ शाळा दिन" राबवताना काही मुले म्हणतात की झाडलोट व फरशी पुसणे ही मुलींची कामे आहेत (किंवा विशिष्ट वर्गातील मुलांची). शिक्षकाने कामे कशी वाटावीत?',
      opts: [
        'लिंग किंवा सामाजिक पार्श्वभूमीचा कोणताही भेद न करता प्रत्येक विद्यार्थ्याला सर्व स्वच्छता व सजावट कामे आलटून-पालटून समान वाटून देणे',
        'फक्त मुलींनाच झाडलोट देणे',
        'मुलांना सर्व स्वच्छता कामांतून सूट देणे',
        'कमी गुण मिळणाऱ्यांनाच काम देणे',
      ],
      exp: 'समान कामवाटपातून लिंगसमता, जातिनिर्मूलन जाणीव व सर्व श्रमांचा समान आदर प्रत्यक्ष कृतीतून रुजतो.',
    },
    hi: {
      q: '"स्वच्छ विद्यालय दिवस" पर कुछ लड़के कहते हैं कि झाड़ू-पोंछा लड़कियों (या किसी विशेष वर्ग) का काम है। शिक्षक को कार्य वितरण कैसे करना चाहिए?',
      opts: [
        'बिना किसी लैंगिक या सामाजिक भेदभाव के सभी छात्रों को बारी-बारी से हर स्वच्छता व व्यवस्था कार्य में समान भागीदारी देना',
        'केवल लड़कियों से झाड़ू लगवाना',
        'लड़कों को स्वच्छता कार्य से अलग रखना',
        'कमजोर छात्रों को ही काम देना',
      ],
      exp: 'समान व चक्रीय कार्य-वितरण लैंगिक और सामाजिक रूढ़ियों को तोड़कर श्रम की गरिमा तथा समता स्थापित करता है।',
    },
  },
  {
    topic: 'Comic-Strip Speech Bubbles for Cause-and-Effect Assessment',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Asking Class 4 learners to fill blank 4-panel Comic-Strip speech bubbles showing "What happened to the pond fish after factory dye leaked upstream → How the village solved it" assesses:',
      opts: [
        'Sequential cause-and-effect reasoning, ecological empathy, and expressive synthesis visually—even for reluctant essay writers',
        'Pure memorization of factory dates',
        'Rote dictionary spelling accuracy only',
        'Comic hero movie trivia',
      ],
      exp: 'Graphic storytelling lowers writing anxiety while vividly exposing ecological logic and civic solutions.',
    },
    mr: {
      q: 'इयत्ता ४ थीच्या मुलांना "कारखान्याचे रंगीत पाणी ओढ्यात सोडल्यावर माशांचे काय झाले → गावाने तोडगा कसा काढला" यावर ४ चौकटींच्या चित्रकथेतील रिकाम्या संवाद-फुग्यांत (Comic Strips) संवाद लिहायला लावल्याने काय तपासले जाते?',
      opts: [
        'कार्यकारणभाव (Cause-and-Effect), पर्यावरणीय संवेदनशीलता आणि कमी शब्दांत प्रभावी अभिव्यक्ती क्षमता',
        'फक्त कारखान्याच्या तारखांचे पाठांतर',
        'फक्त शुद्धलेखन गती',
        'चित्रपट कथांची माहिती',
      ],
      exp: 'संवाद-चित्रकथा (Comic Strips) दीर्घ निबंधाचे दडपण न आणता कार्यकारण व उपाययोजनेची समज प्रभावीपणे तपासतात.',
    },
    hi: {
      q: 'कक्षा ४ के छात्रों से "फैक्ट्री का रंगीन पानी तालाब में मिलने से मछलियों पर असर → गाँव का समाधान" पर ४-खाँचे वाली कॉमिक स्ट्रिप के संवाद बुलबुले भरवाना किसे आँकता है?',
      opts: [
        'क्रमिक कारण-प्रभाव तर्क, पारिस्थितिक संवेदनशीलता और रचनात्मक अभिव्यक्ति (कम लेखन-दबाव के साथ)',
        'कारखाने की स्थापना तिथि रटना',
        'केवल वर्तनी गति जाँचना',
        'फिल्मी कहानियों का ज्ञान',
      ],
      exp: 'कॉमिक स्ट्रिप गतिविधि लंबे निबंध के भय बिना कारण-परिणाम समझ और समस्या-समाधान को रोचक रूप से प्रकट करती है।',
    },
  },
  {
    topic: 'No-Bag Day Experiential Activities Under NEP 2020',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'How should schools best utilize NEP 2020’s recommended "10 Bagless Days" for enriching Primary EVS?',
      opts: [
        'Local artisan workshops (pottery, basket weaving, kitchen gardening), rainwater/compost hands-on fairs, puppetry, and community heritage walks',
        'Making children sit motionless memorizing double homework sheets without bags',
        'Cancelling school and declaring holidays',
        'Giving online computer MCQs tests for 6 hours',
      ],
      exp: 'Bagless days immerse learners in tactile skills, local trades, outdoor ecology, and community mentorship.',
    },
    mr: {
      q: 'NEP 2020 मध्ये सुचवलेल्या "दप्तराविना १० दिवस" (Bagless Days) उपक्रमाचा प्राथमिक EVS समृद्ध करण्यासाठी सर्वोत्तम वापर कसा करावा?',
      opts: [
        'स्थानिक कारागीर कार्यशाळा (कुंभारकाम, टोपली विणकाम, परसबाग), गांडूळखत-जलसंवर्धन कृती, बाहुलीनाट्य आणि गाव-वारसा सहली आयोजित करून',
        'दप्तराविना बसवून दुप्पट पाठांतर व चाचण्या घेऊन',
        'शाळेला सुट्टी जाहीर करून',
        'सलग ६ तास संगणक चाचणी घेऊन',
      ],
      exp: 'दप्तराविना दिवसांचा हेतू हस्तकौशल्य, निसर्ग-सहवास व स्थानिक कार्यअनुभवातून आनंददायी शिक्षण देणे हा आहे.',
    },
    hi: {
      q: 'NEP 2020 में अनुशंसित "बैग-रहित १० दिनों" (Bagless Days) का प्राथमिक EVS को समृद्ध करने हेतु सर्वश्रेष्ठ उपयोग कैसे किया जाना चाहिए?',
      opts: [
        'स्थानीय शिल्प कार्यशालाएँ (मिट्टी कला, बागवानी), कम्पोस्ट व जल-संरक्षण गतिविधियाँ, कठपुतली व स्थानीय विरासत भ्रमण द्वारा',
        'बिना बैग के बैठाकर दोगुना रटवाना',
        'छुट्टी घोषित कर देना',
        '६ घंटे ऑनलाइन परीक्षा लेना',
      ],
      exp: 'बैग-रहित दिवस व्यावसायिक हस्तकौशल, सामुदायिक जुड़ाव और आनंददायी अनुभवात्मक पर्यावरणीय अधिगम को प्रोत्साहित करते हैं।',
    },
  },
  {
    topic: 'Safe Heat & Boiling Demos in Primary Rooms',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'When demonstrating evaporation or steam condensation using warm/hot water in a Class 4 room with 40 pupils, what mandatory safety practice protects young learners?',
      opts: [
        'The teacher strictly handles heating sources & hot vessels behind a safe cleared perimeter desk, using moderately hot thermos water rather than crowded open flames near children',
        'Ask Class 4 pupils to carry open kerosene stoves between cramped benches',
        'Hold boiling pans over students’ heads to see bottom bubbles',
        'Skip adult supervision completely while heating',
      ],
      exp: 'Safety always comes first: clear safety perimeter, adult handling of hot liquids, and pre-heated thermos pours eliminate scald hazards.',
    },
    mr: {
      q: '४० विद्यार्थ्यांच्या वर्गात बाष्पीभवन किंवा वाफेचे संघनन दाखवताना कोणत्या सुरक्षा नियमांचे काटेकोर पालन अत्यावश्यक आहे?',
      opts: [
        'गरम भांडे व उष्णतेचा स्रोत शिक्षकाच्या सुरक्षित अंतरावरील टेबलावरच हाताळणे आणि मुलांच्या बाकांजवळ उघडी ज्योत न आणता थर्मासमधील गरम पाणी वापरणे',
        'मुलांना बाकांमधून पेटता स्टोव्ह फिरवायला सांगणे',
        'उकळते भांडे मुलांच्या डोक्यावरून धरणे',
        'प्रौढ देखरेखीशिवाय उकळणे',
      ],
      exp: 'प्रत्यक्ष प्रात्यक्षिकांत सुरक्षित अंतर आणि गरम साधनांची शिक्षक-नियंत्रित हाताळणी मुलांच्या सुरक्षिततेची हमी देते.',
    },
    hi: {
      q: '४० बच्चों की कक्षा में वाष्पीकरण या भाप संघनन दिखाते समय कौन-सी सुरक्षा सावधानी अनिवार्य है?',
      opts: [
        'गर्म बर्तन व ताप स्रोत को सुरक्षित दूरी पर केवल शिक्षक द्वारा संभालना तथा बच्चों के बीच खुली लौ रखने के बजाय थर्मस के गर्म पानी का उपयोग करना',
        'बच्चों से बेंचों के बीच स्टोव्ह ले जाने को कहना',
        'उबलता पतीला सिर के ऊपर पकड़ना',
        'बिना निगरानी गर्म करना',
      ],
      exp: 'सुरक्षित दूरी और गर्म उपकरणों का वयस्क-नियंत्रित उपयोग अनुभवात्मक विज्ञान को दुर्घटना-मुक्त रखता है।',
    },
  },
  {
    topic: 'Time-Lapse Daily Sketch Logs of Plant / Moon Changes',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Having pupils draw dated sketches in one small notebook square every second day for 14 days tracking a sprouting seed or waxing crescent Moon develops:',
      opts: [
        'Longitudinal patience, careful noticing of subtle sequential change over time, and visual empirical record-keeping',
        'Immediate gratification within 30 seconds',
        'Memorizing moon craters’ Latin coordinates',
        'Copying artist calendars from markets',
      ],
      exp: 'Sustained multi-day observation unveils gradual natural processes impossible to witness in one 35-minute period.',
    },
    mr: {
      q: '१४ दिवस दर दोन दिवसांनी उगवणाऱ्या रोपाचे किंवा शुक्ल पक्षातील चंद्राचे तारीखवार छोटे रेखाटन एकाच पानावर काढून घेतल्याने कोणती कौशल्ये विकसित होतात?',
      opts: [
        'दीर्घकालीन संयम, काळाबरोबर होणाऱ्या सूक्ष्म क्रमागत बदलांचे अचूक निरीक्षण आणि दृश्य नोंदी ठेवण्याची वैज्ञानिक सवय',
        '३० सेकंदांत त्वरित परिणाम पाहण्याची घाई',
        'चंद्रावरील विवरांची लॅटिन नावे पाठ करणे',
        'बाजारातील कॅलेंडरची नक्कल करणे',
      ],
      exp: 'अनेक दिवसांची सलग निरीक्षण-नोंद निसर्गातील संथ व क्रमागत बदल प्रत्यक्ष अनुभवण्यास मदत करते.',
    },
    hi: {
      q: '१४ दिनों तक हर दूसरे दिन अंकुरित बीज या बढ़ते चंद्रमा के तिथिबद्ध छोटे रेखाचित्र बनवाने से बच्चों में कौन-सा कौशल विकसित होता है?',
      opts: [
        'दीर्घकालिक धैर्य, समय के साथ होने वाले सूक्ष्म क्रमिक परिवर्तनों का गहन अवलोकन और व्यवस्थित दृश्य अभिलेखन',
        '३० सेकंड में परिणाम पाने की जल्दबाजी',
        'लैटिन नाम रटना',
        'बाजार के कैलेंडर की नकल करना',
      ],
      exp: 'बहु-दिवसीय सतत अवलोकन उन क्रमिक प्राकृतिक प्रक्रियाओं को समझने में मदद करता है जो एक पीरियड में नहीं दिख सकतीं।',
    },
  },
  {
    topic: 'Multi-Perspective Debate on Development vs Ecology',
    pattern: 'Classroom Scenario',
    difficulty: 'Difficult',
    en: {
      q: 'In Class 5, organizing a structured role-play debate on "Proposed Dam / Highway Through a Tribal Forest" where teams voice Farmers’ Irrigation Needs, Forest Wildlife/Tribal Rights, and Elevated Wildlife Overpasses develops:',
      opts: [
        'Critical multi-perspective thinking, weighing ecological trade-offs calmly, democratic listening, and sustainable compromise thinking',
        'Angry shouting matches with personal insults',
        'Memorizing government tender prices',
        'Believing development and conservation can never collaborate',
      ],
      exp: 'Age-appropriate socio-scientific dilemmas nurture balanced democratic reasoning and sustainable design awareness.',
    },
    mr: {
      q: 'इयत्ता ५ वीमध्ये "जंगलातून जाणारा महामार्ग/धरण" या विषयावर शेतकरी सिंचन गरज, वन्यजीव-आदिवासी हक्क आणि प्राण्यांसाठी उड्डाणपूल (Wildlife Overpass) अशा विविध बाजूंची भूमिका-चर्चा घडवल्याने काय साध्य होते?',
      opts: [
        'बहुआयामी चिकित्सक विचार, विकास व पर्यावरण यांतील समतोल तपासणे, लोकशाही श्रवण आणि शाश्वत उपायांची समज',
        'वैयक्तिक अपमान करणारी आरडाओरड',
        'कंत्राटाच्या किमती पाठ करणे',
        'विकास व निसर्ग कधीच एकत्र राहू शकत नाहीत ही निराशा',
      ],
      exp: 'विविध दृष्टिकोन मांडणाऱ्या चर्चेतून मुले एकतर्फी मतांऐवजी शाश्वत व न्याय्य समाधानांचा विचार करायला शिकतात.',
    },
    hi: {
      q: 'कक्षा ५ में "वन क्षेत्र से प्रस्तावित राजमार्ग/बाँध" विषय पर किसानों की सिंचाई, वन्यजीव-आदिवासी अधिकार व वन्यजीव पुल (Overpass) के विभिन्न पक्षों पर भूमिका-संवाद कराने से क्या विकसित होता है?',
      opts: [
        'बहुआयामी आलोचनात्मक चिंतन, विकास और पारिस्थितिकी के बीच संतुलन समझना, लोकतांत्रिक श्रवण तथा संधारणीय समाधान की सोच',
        'शोरगुल और व्यक्तिगत बहस',
        'ठेके की कीमतें रटना',
        'पूर्ण निराशावादी दृष्टिकोण',
      ],
      exp: 'सामाजिक-वैज्ञानिक मुद्दों पर विविध पक्षों की भूमिका निभाकर संवाद करने से संतुलित लोकतांत्रिक और टिकाऊ निर्णय क्षमता बढ़ती है।',
    },
  },
  {
    topic: 'Constructive Error Feedback vs Punitive Red-Ink Marking',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'When correcting Class 4 EVS notebooks, a child writes "Roots push water down into clouds" or confuses Gill vs Lung. What feedback practice helps learning grow best?',
      opts: [
        'Write a brief encouraging guiding prompt ("Nice effort tracing roots! Check our potted-plant ink experiment again—did red ink travel UP the stem or DOWN?") and discuss gently',
        'Draw huge angry red crosses across the entire page with "CARELESS!!"',
        'Tear the page out publicly',
        'Tick "Right" blindly without reading so the child keeps the wrong concept',
      ],
      exp: 'Diagnostic, non-humiliating written cues provoke self-correction while safeguarding curiosity and confidence.',
    },
    mr: {
      q: 'इयत्ता ४ थीची वही तपासताना मुलाने "मुळे पाणी ढगांत ढकलतात" किंवा कल्ले-फुप्फुसांत गोंधळ केलेला दिसतो. शिक्षकाचा कोणता अभिप्राय सर्वात उपयुक्त ठरेल?',
      opts: [
        'प्रोत्साहक व मार्गदर्शक टीप लिहिणे ("मुळांचा शोध छान मांडला! आपल्या रंगीत पाण्यातील रोपाचा प्रयोग आठव—रंग देठातून वर गेला की खाली?") व प्रेमाने चर्चा करणे',
        'संपूर्ण पानावर मोठी लाल फुली मारून "निष्काळजी!" लिहिणे',
        'पान फाडून टाकणे',
        'न वाचताच बरोबर खूण करणे',
      ],
      exp: 'चुकलेल्या उत्तरावर रागापेक्षा मार्गदर्शक प्रश्न लिहिल्यास विद्यार्थी स्वतः विचार करून चूक सुधारतो.',
    },
    hi: {
      q: 'कक्षा ४ की कॉपी जाँचते समय बच्चे ने लिखा "जड़ें पानी को नीचे बादलों में धकेलती हैं"। शिक्षक की कौन-सी प्रतिपुष्टि (Feedback) अधिगम को सर्वाधिक बढ़ावा देगी?',
      opts: [
        'प्रोत्साहन के साथ मार्गदर्शक प्रश्न लिखना ("अच्छा प्रयास! रंगीन पानी में रखे पौधे के प्रयोग को याद करो—रंग तने में ऊपर गया था या नीचे?") और सहज संवाद करना',
        'पूरे पन्ने पर लाल क्रॉस और "लापरवाह!" लिखना',
        'पन्ना फाड़ देना',
        'बिना पढ़े सही का निशान लगाना',
      ],
      exp: 'रचनात्मक, सम्मानजनक और प्रश्न-आधारित प्रतिपुष्टि बच्चे के आत्मविश्वास को बचाते हुए स्व-सुधार को प्रेरित करती है।',
    },
  },
  {
    topic: 'Classroom Pet/Aquarium Ethics vs Field Pond Observation',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Should primary teachers trap small wild river fish or field frogs permanently inside tiny un-aerated glass jars on the windowsill to teach aquatic life?',
      opts: [
        'No—avoid confining wild animals in cramped bowls where they suffer or die; prefer outdoor pond walks, safe local observation, photographs, or large well-cared-for school pond habitats',
        'Yes—keeping 10 fish in one jam jar teaches survival nicely',
        'Yes—replace dead fish secretly every morning',
        'Keep wild turtles inside dry chalk boxes',
      ],
      exp: 'Compassion and ecological authenticity favour observing creatures freely inside healthy natural habitats.',
    },
    mr: {
      q: 'जलीय जीवन शिकवण्यासाठी वर्गातील खिडकीवर लहान हवाबंद काचेच्या बरणीत जिवंत मासे किंवा बेडूक कायमचे बंद करून ठेवणे योग्य आहे का?',
      opts: [
        'नाही — लहान कोंडलेल्या भांड्यात वन्य जीव गुदमरतात व मरतात; त्याऐवजी परिसरातील तलाव भेट, मोठा नैसर्गिक शाळा तलाव किंवा चित्रे-व्हिडिओ वापरून प्राणिदया जपावी',
        'हो — लहान बरणीत १० मासे ठेवणे उत्तम असते',
        'हो — रोज सकाळी मेलेले मासे गुपचूप बदलावेत',
        'कासवांना कोरड्या खडूच्या डब्यात ठेवावे',
      ],
      exp: 'सजीवांच्या नैसर्गिक स्वातंत्र्याचा व कल्याणाचा आदर करूनच निसर्ग-शिक्षण दिले पाहिजे.',
    },
    hi: {
      q: 'जलीय जीवन पढ़ाने के लिए क्या कक्षा की खिड़की पर छोटे, बिना हवा वाले जार में जंगली मछलियों या मेंढक को बंद रखना उचित है?',
      opts: [
        'नहीं — छोटे जार में वन्यजीव तड़पते व मरते हैं; इसके बजाय तालाब अवलोकन, बड़ा प्राकृतिक उद्यान तालाब या चित्र/वीडियो उपयोग कर जीव-दया का सम्मान करें',
        'हाँ — छोटे जार में १० मछलियाँ रखना सही है',
        'हाँ — रोज सुबह मरी मछली बदल दें',
        'कछुए को सूखे डिब्बे में रखें',
      ],
      exp: 'पर्यावरण अध्ययन में जीवों को बंधक बनाकर कष्ट देने के बजाय उनके प्राकृतिक आवास में सम्मानपूर्वक अवलोकन को प्राथमिकता देनी चाहिए।',
    },
  },
  {
    topic: 'Framing Meaningful Student-Led Inquiry Questions',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'After reading a case study on disappearing groundwater in a nearby taluka, instead of giving 10 pre-printed questions, the teacher asks groups to frame 3 investigation questions they want answered. Why?',
      opts: [
        'Question-formulation trains learners to think critically, spot gaps in evidence, and shift from passive answer-reciters to active inquirers',
        'The teacher was unprepared and lacked questions',
        'It reduces classroom silence permanently',
        'Students stop reading textbooks forever',
      ],
      exp: 'Asking good questions is an essential higher-order scientific competency too often monopolized solely by teachers.',
    },
    mr: {
      q: 'जवळच्या तालुक्यातील घटत्या भूजलाची सत्य घटना वाचल्यानंतर शिक्षकांनी स्वतःचे १० प्रश्न देण्याऐवजी गटांना "यावरून तुम्हाला कोणते ३ शोधप्रश्न विचारायचे आहेत ते तयार करा" सांगितले. याचे कारण काय?',
      opts: [
        'स्वतः प्रश्न तयार केल्याने चिकित्सक विचार, पुराव्यातील त्रुटी शोधणे आणि केवळ उत्तर-पाठांतरकर्त्याऐवजी सक्रिय अभ्यासक बनण्याचे कौशल्य विकसित होते',
        'शिक्षक तयारी न करता वर्गात आले होते म्हणून',
        'वर्गातील शांतता भंग करण्यासाठी',
        'पुस्तक वाचन बंद करण्यासाठी',
      ],
      exp: 'चांगले प्रश्न निर्माण करणे हे केवळ शिक्षकांचे नव्हे तर प्रत्येक विद्यार्थ्याचे उच्च-स्तरीय वैज्ञानिक कौशल्य आहे.',
    },
    hi: {
      q: 'पास के क्षेत्र में गिरते भूजल का केस स्टडी पढ़ने के बाद शिक्षक स्वयं १० प्रश्न देने के बजाय छात्रों के समूहों से ३ जाँच-प्रश्न स्वयं बनाने को कहते हैं। क्यों?',
      opts: [
        'स्वयं प्रश्न निर्माण करने से आलोचनात्मक चिंतन, प्रमाण की कमी पहचानना और निष्क्रिय रटने वाले से सक्रिय अन्वेषक बनने की क्षमता विकसित होती है',
        'शिक्षक बिना तैयारी आए थे',
        'शोर मचाने के लिए',
        'किताब पढ़ना बंद करने के लिए',
      ],
      exp: 'सार्थक प्रश्न पूछना व गढ़ना उच्च-स्तरीय वैज्ञानिक और तार्किक चिंतन की प्रमुख दक्षता है।',
    },
  },
  {
    topic: 'Oral Picture-Talk Interviews for Emergent Writers',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'A Class 3 pupil understands food chains and monsoon crops brilliantly when speaking orally, yet freezes when asked to write two full pages in an exam. How does an authentic EVS teacher assess this child’s learning fairly?',
      opts: [
        'Combine oral picture-talk interviews, labelled quick sketches, sorting picture cards, and short assisted captions so emergent literacy never masks scientific understanding',
        'Fail the pupil completely in EVS until handwriting matures',
        'Ignore the child’s oral insights completely',
        'Force 5-page written essays daily after school',
      ],
      exp: 'Separating conceptual understanding assessment from heavy prose writing ensures fair inclusion of diverse learners.',
    },
    mr: {
      q: 'इयत्ता ३ रीच्या एका विद्यार्थ्याला अन्नसाखळी व पावसाळी पिके तोंडी अत्यंत सुंदर सांगता येतात, पण परीक्षेत दोन पाने लिहिताना तो अडखळतो. न्याय्य मूल्यमापनासाठी शिक्षकाने काय करावे?',
      opts: [
        'तोंडी चित्र-संवाद, नावे लिहिलेली छोटी चित्रे, चित्रकार्ड क्रम लावणे व लहान वाक्यांत नोंदी घेणे असे बहुविध मार्ग वापरून त्याच्या खऱ्या EVS समजेचे मूल्यमापन करणे',
        'हस्ताक्षर सुधारूपर्यंत EVS मध्ये नापास करणे',
        'तोंडी ज्ञानाकडे पूर्ण दुर्लक्ष करणे',
        'दररोज ५ पाने लिहिण्याची शिक्षा देणे',
      ],
      exp: 'लेखन गतीच्या मर्यादेमुळे मुलाच्या खऱ्या वैज्ञानिक व पर्यावरणीय आकलनावर अन्याय होऊ नये म्हणून बहुविध मूल्यमापन आवश्यक असते.',
    },
    hi: {
      q: 'कक्षा ३ का एक बच्चा खाद्य शृंखला और फसलों के बारे में मौखिक रूप से अद्भुत बताता है, पर दो पन्ने लिखने में अटक जाता है। निष्पक्ष आकलन हेतु शिक्षक क्या करे?',
      opts: [
        'मौखिक चित्र-वार्ता, नामांकित सरल रेखाचित्र, चित्र-कार्ड छँटाई और छोटे वाक्यों द्वारा उसकी वास्तविक EVS समझ का आकलन करना',
        'लेखन धीमा होने पर EVS में फेल कर देना',
        'मौखिक समझ को अनदेखा करना',
        'रोज ५ पन्ने लिखवाना',
      ],
      exp: 'लेखन गति को वैचारिक समझ के आकलन में बाधा नहीं बनने देना चाहिए; मौखिक व चित्रात्मक आकलन समान रूप से वैध हैं।',
    },
  },
  {
    topic: 'Step-by-Step Proportional Map Scale Scaffolding',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'To scaffold Class 5 pupils into grasping how "1 cm = 10 metres" on paper represents a real basketball/kho-kho ground, which concrete progression works smoothly?',
      opts: [
        'Measure real steps/string across the courtyard first → Represent 10 paces with 1 finger/matchstick indoors → Transition cleanly to 1 cm grid squares representing 10 metres',
        'Jump straight into 1 : 25,00,000 world atlas fractions on Day 1',
        'Memorize metric multiplication tables without measuring anything',
        'Skip scale bars completely on every map',
      ],
      exp: 'Concrete-Pictorial-Abstract scaling bridges lived footsteps seamlessly into formal cartographic ratios.',
    },
    mr: {
      q: 'इयत्ता ५ वीच्या मुलांना "नकाशावरील १ सेमी = प्रत्यक्ष १० मीटर" हे प्रमाण समजण्यासाठी कोणती क्रमिक कृती सर्वात सुलभ व प्रभावी ठरेल?',
      opts: [
        'आधी मैदानावर प्रत्यक्ष पावले/दोरीने अंतर मोजणे → वर्गात १० पावलांसाठी १ काडी किंवा बोटाचे अंतर दाखवणे → त्यानंतर १ सेमी चौकोनाला १० मीटरशी जोडणे',
        'पहिल्याच दिवशी १ : २५,००,००० जागतिक नकाशाचे अपूर्णांक सांगणे',
        'न मोजता फक्त कोष्टके पाठ करणे',
        'नकाशाचे प्रमाण पूर्णपणे वगळणे',
      ],
      exp: 'मूर्त पावले → चित्र/काडी प्रमाण → अमूर्त सेंटीमीटर प्रमाण या क्रमामुळे नकाशा प्रमाणबद्धता सहज कळते.',
    },
    hi: {
      q: 'कक्षा ५ के बच्चों को "कागज पर १ सेमी = वास्तविक १० मीटर" पैमाना सिखाने के लिए कौन-सा मूर्त क्रमिक मार्ग सबसे प्रभावी है?',
      opts: [
        'पहले प्रांगण में कदमों/रस्सी से दूरी नापना → अंदर १० कदम के लिए १ तीली/अँगुली उपयोग करना → फिर १ सेमी ग्रिड वर्ग को १० मीटर से जोड़ना',
        'पहले दिन १ : २५,००,००० विश्व एटलस भिन्न देना',
        'बिना नापे पहाड़े रटवाना',
        'मानचित्र पैमाना छोड़ देना',
      ],
      exp: 'मूर्त–चित्रात्मक–अमूर्त (CPA) क्रम से बच्चे वास्तविक दूरी और कागज के पैमाने का अनुपात सहजता से समझ लेते हैं।',
    },
  },
  {
    topic: 'Visualizing Linear Landfill Waste vs Circular Compost/Reuse',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why does comparing two simple diagrams—one straight dead-end arrow ("Mine → Use → Dump Mountain") versus a closed forest/compost loop ("Peels → Redworms → Rich Soil → New Veg")—help primary pupils grasp sustainability?',
      opts: [
        'It makes the contrast between wasteful linear consumption and nature’s zero-waste cyclical regeneration crystal clear visually',
        'It promotes building taller plastic garbage mountains',
        'It claims trees grow from buried plastic bags',
        'It avoids discussing recycling habits completely',
      ],
      exp: 'Simple loop visuals translate circular economy ideas into child-friendly nature-inspired logic.',
    },
    mr: {
      q: 'सरळ संपणारा बाण ("खाणकाम → वापर → कचऱ्याचा डोंगर") आणि गोल वर्तुळ ("साली → गांडुळे → सुपीक माती → नवी पिके") या दोन आकृत्यांच्या तुलनेतून मुलांना काय सहज उमगते?',
      opts: [
        'एकमार्गी कचरा-निर्मिती व निसर्गाच्या शून्य-कचरा चक्रीय पुनर्निर्मितीतील (Sustainability) फरक दृश्य रूपाने स्पष्ट होतो',
        'प्लास्टिकचे मोठे डोंगर उभारण्यास प्रोत्साहन मिळते',
        'प्लास्टिकच्या पिशव्यांतून झाडे उगवतात असे दिसते',
        'पुनर्वापराची चर्चा टळते',
      ],
      exp: 'चक्रीय आकृत्या निसर्गातील शून्य-कचरा व्यवस्थापनाचे तत्त्व बालकांना सहज पटवून देतात.',
    },
    hi: {
      q: 'एक सीधी रेखा ("खनन → उपयोग → कचरे का पहाड़") बनाम बंद चक्र ("छिलके → केंचुए → उपजाऊ मिट्टी → नई फसल") की तुलना बच्चों को सतत विकास कैसे समझाती है?',
      opts: [
        'यह अपव्ययी रेखीय उपभोग और प्रकृति के शून्य-अपशिष्ट चक्रीय पुनर्नवीनीकरण के अंतर को दृश्य रूप से बिल्कुल स्पष्ट कर देती है',
        'प्लास्टिक के पहाड़ बढ़ाने को कहती है',
        'प्लास्टिक से पेड़ उगना दिखाती है',
        'पुनर्चक्रण की चर्चा रोकती है',
      ],
      exp: 'चक्रीय आरेख बच्चों को प्रकृति की भाँति चक्रीय अर्थव्यवस्था और शून्य-कचरा जीवनशैली का तर्क सहजता से समझाते हैं।',
    },
  },
  {
    topic: 'Addressing Misconception: "Composting Stinks Dirty; Only Urea Feeds Crops"',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'When students wrinkle their noses saying "Kitchen compost smells awful and chemical white urea is cleaner and better for plants!", how can an EVS garden plot resolve both notions?',
      opts: [
        'Demonstrate balanced aeration + dry brown leaves inside a neat school compost bin (producing sweet earthy-smelling humus—zero foul stink!) and compare soil earthworms & moisture retention against over-salted chemical plots',
        'Agree composting is disgusting and ban garden bins',
        'Pour raw plastic and cooked meat curries into open sunny piles',
        'Pour double chemical urea bags onto classroom pots',
      ],
      exp: 'Properly balanced green-wet + brown-dry aerated compost smells like fresh monsoon forest soil while nourishing soil biodiversity.',
    },
    mr: {
      q: 'मुले नाक मुरडून म्हणतात: "कचऱ्याच्या खताला घाण वास येतो; त्यापेक्षा पांढरा रासायनिक युरिया स्वच्छ व पिकासाठी चांगला!" हा गैरसमज शाळेच्या परसबागेतून कसा दूर कराल?',
      opts: [
        'हवा खेळती ठेवून ओल्या कचऱ्यासोबत सुका पालापाचोळा थर लावून खत बनवून दाखवणे (ज्यास दुर्गंधी न येता सुगंधी ओली माती तयार होते!) आणि खतातील गांडुळे व ओलावा टिकण्याची क्षमता प्रत्यक्ष दाखवणे',
        'कंपोस्ट घाण असते हे मान्य करून खतखड्डा बंद करणे',
        'खड्ड्यात प्लास्टिक व शिळे अन्न उघड्यावर टाकणे',
        'कुंडीत दुप्पट युरिया टाकणे',
      ],
      exp: 'योग्य प्रमाणात ओला व सुका पालापाचोळा मिसळून केलेले खत सुगंधी व जमिनीची सजीवता टिकवणारे असते हे प्रत्यक्ष प्रयोगातून कळते.',
    },
    hi: {
      q: 'बच्चे नाक सिकोड़कर कहते हैं: "कम्पोस्ट खाद बदबूदार होती है; सफेद रासायनिक यूरिया अधिक साफ व बेहतर है!" विद्यालय वाटिका से यह भ्रांति कैसे दूर करें?',
      opts: [
        'संतुलित वायु-संचार के साथ गीले कचरे में सूखे पत्ते मिलाकर खाद बनाना दिखाना (जिससे दुर्गंध नहीं बल्कि ताजी मिट्टी की खुशबू आती है!) और मिट्टी की नमी व केंचुओं की तुलना दिखाना',
        'कम्पोस्ट को गंदा मानकर बंद करना',
        'खुले में प्लास्टिक व बचा खाना फेंकना',
        'दोगुना यूरिया डालना',
      ],
      exp: 'संतुलित हरे-सूखे कचरे और वायु-संचार से बना कम्पोस्ट दुर्गंधरहित होता है तथा मिट्टी के सूक्ष्मजीवों व केंचुओं को जीवित रखता है।',
    },
  },
  {
    topic: 'Local Artisan Heritage Corner Inside School',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Creating a small classroom "Grandparents’ Tools Corner" holding an old stone hand-mill (Jata), wooden butter churner (Ravi), brass oil lamp, and mud water vessel supports "Things We Make and Do" by:',
      opts: [
        'Preserving material heritage tangibly, exploring simple machines & materials firsthand, and fostering intergenerational pride',
        'Mocking traditional villagers as backward',
        'Selling donated antiques privately',
        'Banning modern science tools',
      ],
      exp: 'Tactile community artifacts spark inquiry into materials, levers/pulleys, energy efficiency, and cultural continuity.',
    },
    mr: {
      q: 'वर्गात जुने दगडी जाते, लाकडी रवी, पितळी दिवा व मातीचे भांडे यांचा "आजी-आजोबांच्या साधनांचा कोपरा" ठेवल्याने "आपण जे बनवतो व करतो" या थीमला कशी मदत होते?',
      opts: [
        'भौतिक सांस्कृतिक वारसा जपला जातो, साधी यंत्रे व पदार्थांचे गुणधर्म स्पर्श करून अनुभवता येतात आणि पिढ्यांमधील आदर वाढतो',
        'ग्रामीण परंपरेची थट्टा होते',
        'वस्तूंची खाजगी विक्री करता येते',
        'आधुनिक विज्ञान बंद होते',
      ],
      exp: 'स्थानिक पारंपरिक साधनांचा संग्रह साधी यंत्रे, साहित्य विज्ञान आणि सांस्कृतिक सातत्य यांचा जिवंत संगम घडवतो.',
    },
    hi: {
      q: 'कक्षा में पुरानी पत्थर की चक्की (जाता), लकड़ी की मथनी, पीतल का दीया व मिट्टी के घड़े का "दादा-दादी उपकरण कोना" बनाने से "हम चीजें कैसे बनाते हैं" थीम को क्या लाभ होता है?',
      opts: [
        'भौतिक सांस्कृतिक विरासत का संरक्षण होता है, बच्चे सरल मशीनों व सामग्रियों को छूकर समझते हैं तथा पीढ़ियों के प्रति सम्मान बढ़ता है',
        'ग्रामीण जीवन का उपहास होता है',
        'वस्तुओं का निजी व्यापार होता है',
        'आधुनिक विज्ञान बंद होता है',
      ],
      exp: 'पारंपरिक उपकरणों का स्पर्शनीय संग्रह सरल मशीनों, स्थानीय सामग्री और सांस्कृतिक ज्ञान के प्रति गर्व व समझ बढ़ाता है।',
    },
  },
  {
    topic: 'Guided Exit-Slip Mini-Exhibitions at Unit End',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Concluding a 3-week "Water" unit with a 20-minute Gallery Walk where pairs stand beside their handmade filter/rain-gauge charts explaining ideas to visiting classmates plus dropping one "Today’s Key Takeaway" exit slip promotes:',
      opts: [
        'Authentic communication mastery, peer learning across the room, and quick formative closure visibility for the teacher',
        'Stressful silent memorization panic',
        'Teacher talking nonstop for the whole final period',
        'Zero individual accountability',
      ],
      exp: 'Gallery Walks turn every learner into a confident explainer and provide immediate exit-slip insight into lingering questions.',
    },
    mr: {
      q: '"पाणी" घटक संपल्यावर २० मिनिटांची वर्ग-प्रदर्शनी (Gallery Walk) घेऊन जोड्यांनी आपले तक्ते समजावून सांगणे आणि अखेरीस "आज शिकलेली मुख्य गोष्ट" चिठ्ठी (Exit Slip) देणे कशास चालना देते?',
      opts: [
        'अस्सल संप्रेषण कौशल्य, समवयस्क अध्ययन आणि शिक्षकांना संपूर्ण वर्गाच्या आकलनाचा त्वरित आकारिक अंदाज',
        'ताणतणावाची घोकंपट्टी',
        'शेवटच्या तासाला फक्त शिक्षकाचेच भाषण',
        'कोणतीही जबाबदारी नसणे',
      ],
      exp: 'गॅलरी वॉक व एक्झिट स्लिप प्रत्येक विद्यार्थ्याला आपले विचार मांडण्याची संधी देऊन तात्काळ आकलन तपासणी करतात.',
    },
    hi: {
      q: '"जल" इकाई के अंत में २० मिनट की "गैलरी वॉक" प्रदर्शनी (जहाँ जोड़ियाँ अपने चार्ट समझाती हैं) और अंत में एक "एग्जिट स्लिप" (Exit Slip) लेना किसे बढ़ावा देता है?',
      opts: [
        'प्रामाणिक संप्रेषण कौशल, सहपाठी अधिगम और शिक्षक को कक्षा की समझ का तुरंत रचनात्मक आकलन',
        'तनावपूर्ण रटंत',
        'केवल शिक्षक का व्याख्यान',
        'कोई उत्तरदायित्व न होना',
      ],
      exp: 'गैलरी वॉक और एग्जिट स्लिप हर विद्यार्थी को आत्मविश्वासपूर्ण वक्ता बनाते हैं और तुरंत रचनात्मक प्रतिपुष्टि प्रदान करते हैं।',
    },
  },
  {
    topic: 'Self-Checked Sun/Wind Evaporation Laundry Investigation',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'To let Class 4 pupils investigate factors speeding up Evaporation safely at home, which self-experiment inquiry task is ideal?',
      opts: [
        'Wet two identical cotton handkerchiefs equally: hang one spread open in sunny wind and fold the other tight in indoor shade, timing which dries first and explaining why',
        'Boil petrol over kitchen gas stoves alone',
        'Leave steel spoons outside to see if metal evaporates in 10 minutes',
        'Memorize latent heat Joules per kilogram formulas',
      ],
      exp: 'Handkerchief drying directly illustrates how surface area, temperature, and air movement accelerate evaporation.',
    },
    mr: {
      q: 'इयत्ता ४ थीच्या मुलांना घरी सुरक्षितपणे "बाष्पीभवनाचा वेग वाढवणारे घटक" स्वतः शोधण्यासाठी कोणता प्रयोग सर्वोत्तम आहे?',
      opts: [
        'दोन सारखे सुती रुमाल समान ओले करून एक पूर्ण पसरवून उन्हात-वाऱ्यात आणि दुसरा घडी घालून सावलीत ठेवणे व कोणता लवकर वाळतो याची कारणमीमांसा करणे',
        'स्वयंपाकघरात एकट्याने पेट्रोल उकळणे',
        'स्टीलचा चमचा १० मिनिटांत बाष्पीभवनाने उडतो का पाहणे',
        'बाष्पन गुप्त ऊर्जेची ज्यूल/किग्रॅ सूत्रे पाठ करणे',
      ],
      exp: 'ओल्या रुमालाच्या प्रयोगातून पृष्ठभागाचे क्षेत्रफळ, तापमान व वारा यांचा बाष्पीभवनावरील परिणाम सहज सिद्ध होतो.',
    },
    hi: {
      q: 'कक्षा ४ के बच्चों को घर पर सुरक्षित रूप से "वाष्पीकरण की दर बढ़ाने वाले कारक" खोजने के लिए कौन-सी स्व-जाँच गतिविधि सर्वोत्तम है?',
      opts: [
        'दो समान सूती रूमालों को बराबर गीला कर एक को धूप-हवा में फैलाकर और दूसरे को तह कर छाया में रखकर देखना कि कौन पहले सूखता है और कारण लिखना',
        'अकेले गैस पर पेट्रोल गर्म करना',
        'स्टील चम्मच के भाप बनने का इंतजार करना',
        'गुप्त ऊष्मा के जूल सूत्र रटना',
      ],
      exp: 'गीले रूमाल की गतिविधि बच्चों को सुरक्षित ढंग से सतह क्षेत्रफल, तापमान व वायु प्रवाह का वाष्पीकरण पर प्रभाव सिखाती है।',
    },
  },
  {
    topic: 'Distinguishing Shadows From Sunlight Blocking (Noon Inquiry)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Class 3 children notice their morning playground shadows grow long, shrink tiny directly beneath their shoes at noon, and stretch opposite in evening—leading one child to guess "Shadows hide inside our shoes at 12 PM!" How do we clarify shadow formation?',
      opts: [
        'Use a handheld torch moved in an arc above a pencil standing upright on a desk: high overhead light makes a tiny stubby shadow right under the opaque object, whereas low-angle light casts long shadows',
        'Agree shadows crawl inside shoe soles for lunch',
        'Tell children shadows are living ghosts',
        'Forbid outdoor playground checks after 11 AM',
      ],
      exp: 'The simple torch-and-pencil arc turns shadow angle changes into an instant "aha!" visual geometry insight.',
    },
    mr: {
      q: 'सकाळी लांब असलेली सावली दुपारी १२ वाजता पायाखाली अगदी छोटी का होते, याचे "सावली बुटात लपते" असे उत्तर एका मुलाने दिले. हा गैरसमज कसा दूर कराल?',
      opts: [
        'बाकावर उभी पेन्सिल ठेवून तिच्या वर टॉर्च अर्धवर्तुळात फिरवून दाखवणे — टॉर्च अगदी डोक्यावर असताना सावली पायाशी छोटी पडते, तर तिरप्या कोनातून लांब सावली पडते',
        'सावली खरोखर दुपारी जेवायला बुटात जाते असे सांगणे',
        'सावल्या जिवंत भुते असतात असे सांगणे',
        '११ नंतर मैदानात जाणे बंद करणे',
      ],
      exp: 'टॉर्च व पेन्सिलचा साधा प्रयोग प्रकाशाचा कोन आणि अपारदर्शक वस्तूची सावली यांचा संबंध त्वरित स्पष्ट करतो.',
    },
    hi: {
      q: 'सुबह लंबी परछाईं दोपहर १२ बजे पैरों के नीचे छोटी दिखने पर एक बच्चा कहता है: "दोपहर में परछाईं जूतों में छिप जाती है!" यह भ्रांति कैसे दूर करेंगे?',
      opts: [
        'मेज पर खड़ी पेंसिल के ऊपर टॉर्च को अर्धवृत्त में घुमाकर दिखाना — ठीक ऊपर से प्रकाश पड़ने पर छाया नीचे छोटी और तिरछे कोण से लंबी बनती है',
        'मान लेना कि परछाईं जूते में छिपती है',
        'परछाईं को जीवित भूत बताना',
        '११ बजे के बाद बाहर जाना रोकना',
      ],
      exp: 'टॉर्च और पेंसिल का सरल मॉडल अपारदर्शी वस्तु द्वारा प्रकाश रोकने और आपतन कोण के आधार पर छाया की लंबाई बदलना स्पष्ट करता है।',
    },
  },
  {
    topic: 'Early Fact-Checking of Misleading Online Health & Nature Clips',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'When students mention sensational viral phone videos (e.g., "Drinking plain lemon water melts gold inside the stomach" or "Five-headed snakes guard old coins"), how can Class 5 EVS cultivate calm critical verification?',
      opts: [
        'Coach three simple verification questions gently: "Who observed this?", "Does it match real digestive/animal science or school books?", "Can we verify with a trusted science source or teacher?"',
        'Believe every phone forward unconditionally',
        'Punish children for mentioning home videos',
        'Share unverified rumours back on the school group',
      ],
      exp: 'Basic evidence-checking questions safeguard young learners against health misinformation and superstition.',
    },
    mr: {
      q: 'विद्यार्थी मोबाईलवरील खोटे व्हायरल व्हिडिओ सांगतात (उदा. "लिंबू पाण्याने पोटात सोने विरघळते" किंवा "पाच तोंडाचा साप नाणी राखतो"). शिक्षकाने शांत चिकित्सक तपासणीची सवय कशी लावावी?',
      opts: [
        'तीन सोपे तपासणी प्रश्न शिकवणे: "हे प्रत्यक्षात कोणी वैज्ञानिकरीत्या पाहिले?", "हे आपल्या विज्ञान/निसर्ग नियमांशी जुळते का?", "विश्वसनीय वैज्ञानिक स्रोतातून तपासता येईल का?"',
        'मोबाईलवरील प्रत्येक संदेश सत्य मानणे',
        'व्हिडिओचा उल्लेख केल्याबद्दल शिक्षा करणे',
        'अफवा शाळेच्या गटात पुढे पाठवणे',
      ],
      exp: 'पुराव्याची तपासणी करण्याची साधी सवय भावी नागरिकांना आरोग्य व निसर्गविषयक अफवांपासून सुरक्षित ठेवते.',
    },
    hi: {
      q: 'जब छात्र मोबाइल के भ्रामक वायरल वीडियो ("नींबू पानी पेट में सोना गला देता है" या "पाँच सिर वाला साँप") की बात करें, तो कक्षा ५ EVS में तथ्य-जाँच कैसे सिखाएँगे?',
      opts: [
        'तीन सरल जाँच प्रश्न सिखाना: "इसका वैज्ञानिक प्रमाण क्या है?", "क्या यह जीव/पाचन विज्ञान के नियमों से मेल खाता है?", "क्या हम विश्वसनीय स्रोत से पुष्टि कर सकते हैं?"',
        'हर वायरल वीडियो पर आँख मूँदकर विश्वास करना',
        'बच्चों को बोलने पर दंडित करना',
        'अफवाहें आगे भेजना',
      ],
      exp: 'सरल साक्ष्य-जाँच प्रश्न सिखाना बच्चों को स्वास्थ्य और प्रकृति संबंधी अंधविश्वासों व भ्रामक सूचनाओं से बचाता है।',
    },
  },
  {
    topic: 'Using Weather Thermometers & Classroom Rain-Gauge Routinely',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Placing a safe alcohol wall thermometer and an empty plastic-bottle rain gauge in the courtyard for two monsoon months teaches primary learners primarily to:',
      opts: [
        'Collect authentic quantitative measurements over time and link daily weather changes (cloudiness, temperature dips, rainfall mm) empirically',
        'Control next week’s monsoon arrival mechanically',
        'Memorize foreign Celsius–Kelvin equations without looking outside',
        'Break glass mercury thermometers bare-handed',
      ],
      exp: 'Routine simple weather measurement makes abstract climate tables tangible, personal, and data-driven.',
    },
    mr: {
      q: 'पावसाळ्यातील दोन महिने शाळेच्या अंगणात सुरक्षित भिंतीवरील तापमापक व प्लास्टिक बाटलीचा पर्जन्यमापक ठेवल्याने प्राथमिक विद्यार्थ्यांना काय मुख्य अनुभव मिळतो?',
      opts: [
        'कालांतराने प्रत्यक्ष संख्यात्मक नोंदी गोळा करून ढगाळ हवामान, तापमान घट व पाऊस (मिमी) यांचा अनुभवाधिष्ठित संबंध जोडता येतो',
        'पुढच्या आठवड्याचा पाऊस नियंत्रित करता येतो',
        'बाहेर न पाहता फक्त सूत्रे पाठ होतात',
        'पारा तापमापक फोडण्याचा सराव होतो',
      ],
      exp: 'नियमित साधे हवामान मापन हवामानाच्या अमूर्त तक्त्यांना जिवंत व व्यक्तिगत अनुभवाशी जोडते.',
    },
    hi: {
      q: 'मानसून के दो महीनों तक विद्यालय आँगन में सुरक्षित दीवार थर्मामीटर व प्लास्टिक बोतल वर्षा-मापी रखने से प्राथमिक बच्चों को क्या मुख्य अनुभव मिलता है?',
      opts: [
        'समय के साथ वास्तविक मात्रात्मक आँकड़े एकत्र कर बादल, तापमान गिरावट व वर्षा (मिमी) के बीच प्रत्यक्ष संबंध समझना',
        'अगले सप्ताह की बारिश नियंत्रित करना',
        'बाहर देखे बिना सूत्र रटना',
        'पारा थर्मामीटर तोड़ना',
      ],
      exp: 'नियमित सरल मौसम-मापन अमूर्त जलवायु आँकड़ों को बच्चों के प्रत्यक्ष दैनिक अनुभव से जोड़ता है।',
    },
  },
  {
    topic: 'Gentle Gender-Neutral & Culturally Diverse Classroom Examples',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'When crafting oral EVS examples about mountain climbers, doctors, farmers, cooks, and engineers, why should a teacher intentionally rotate diverse names, regions, and genders equally?',
      opts: [
        'So every child regardless of gender, caste, disability, or region sees themselves reflected as capable contributors in all fields',
        'To confuse students with difficult names',
        'Because boys cannot cook and girls cannot climb mountains',
        'To skip regional diversity completely',
      ],
      exp: 'Inclusive representation quietly normalizes equality and expands every learner’s imagined future possibilities.',
    },
    mr: {
      q: 'गिर्यारोहक, डॉक्टर, शेतकरी, स्वयंपाकी व अभियंते यांची उदाहरणे देताना शिक्षकाने जाणीवपूर्वक विविध नावे, प्रदेश आणि स्त्री-पुरुष समान सहभाग का दाखवावा?',
      opts: [
        'लिंग, जात, प्रदेश किंवा क्षमता कोणतीही असो, प्रत्येक विद्यार्थ्याला स्वतःचे प्रतिबिंब प्रत्येक क्षेत्रात सक्षम योगदानकर्ता म्हणून दिसावे यासाठी',
        'कठीण नावांनी गोंधळ उडवण्यासाठी',
        'मुली गिर्यारोहण करू शकत नाहीत म्हणून',
        'प्रादेशिक विविधता टाळण्यासाठी',
      ],
      exp: 'सर्वसमावेशक उदाहरणे नकळतपणे समता, आत्मविश्वास व प्रत्येक मुलाच्या स्वप्नांचे क्षितिज विस्तारतात.',
    },
    hi: {
      q: 'पर्वतारोही, डॉक्टर, किसान, रसोइया व इंजीनियर के मौखिक उदाहरण देते समय शिक्षक को जानबूझकर विविध नाम, क्षेत्र और महिला-पुरुष समान रूप से क्यों शामिल करने चाहिए?',
      opts: [
        'ताकि लिंग, जाति, क्षेत्र या क्षमता से परे हर बच्चा स्वयं को हर कार्यक्षेत्र में सक्षम योगदानकर्ता के रूप में देख सके',
        'कठिन नामों से भ्रमित करने हेतु',
        'यह मानकर कि लड़के खाना नहीं पका सकते',
        'क्षेत्रीय विविधता हटाने हेतु',
      ],
      exp: 'समावेशी प्रतिनिधित्व स्वाभाविक रूप से समता स्थापित करता है और हर शिक्षार्थी की आकांक्षाओं को विस्तृत करता है।',
    },
  },
  {
    topic: 'Connecting Habitat Conservation to Real Everyday Choices',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'After studying wetland bird migration and deforestation, how does an EVS teacher translate global ecological concern into meaningful child-sized agency without despair?',
      opts: [
        'Co-design simple concrete steps learners control directly: summer clay water bowls for birds, saving notebooks/paper both sides, native sapling care, and turning off idle taps',
        'Tell 9-year-olds Earth will end soon and nothing helps',
        'Ask children to single-handedly build national highways',
        'Ban discussing environmental care altogether',
      ],
      exp: 'Actionable, age-appropriate stewardship bridges global biodiversity themes with empowering everyday choices.',
    },
    mr: {
      q: 'स्थलांतरित पक्षी व जंगलतोड अभ्यासल्यानंतर मुलांमध्ये निराशा न येता जागतिक पर्यावरण जाणीव वयानुसार योग्य कृतीत कशी रूपांतरित करावी?',
      opts: [
        'मुले स्वतः करू शकतील अशा ठोस कृती घडवणे — उन्हाळ्यात पक्ष्यांसाठी मातीचे पाणपात्र ठेवणे, कागदाच्या दोन्ही बाजू वापरणे, देशी रोपांची निगा राखणे आणि गळणारे नळ बंद करणे',
        '९ वर्षांच्या मुलांना पृथ्वी लवकरच नष्ट होईल असे सांगून घाबरवणे',
        'मुलांना महामार्ग बांधायला सांगणे',
        'पर्यावरण चर्चा बंद करणे',
      ],
      exp: 'वयाला साजेसे छोटे पण ठोस कृती-उपाय मुलांमध्ये आशावाद व जबाबदार पर्यावरण रक्षण वृत्ती घडवतात.',
    },
    hi: {
      q: 'प्रवासी पक्षियों व वनोन्मूलन को पढ़ने के बाद बच्चों में निराशा लाए बिना वैश्विक पर्यावरणीय चिंता को आयु-उपयुक्त सकारात्मक कदमों से कैसे जोड़ें?',
      opts: [
        'बच्चों के नियंत्रण वाले ठोस कदम तय करना — गर्मी में पक्षियों हेतु मिट्टी के सकोरे, कागज के दोनों तरफ उपयोग, देशी पौधे की देखभाल और नल बंद करना',
        '९ वर्षीय बच्चों को डराना कि पृथ्वी खत्म हो जाएगी',
        'बच्चों से राष्ट्रीय राजमार्ग बनवाना',
        'पर्यावरण चर्चा बंद करना',
      ],
      exp: 'आयु-उपयुक्त व्यावहारिक कदम वैश्विक पारिस्थितिक चिंता को आशावादी व सशक्त दैनिक नागरिक व्यवहार में बदलते हैं।',
    },
  },
  {
    topic: 'Reading Picture Books Visually (Visual Literacy)',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why do Balbharati Classes 3–5 EVS chapters dedicate large full-colour comic panels and "Observe & Tell" picture spreads alongside minimal paragraphs?',
      opts: [
        'Picture reading builds visual observation, inferential prediction, and oral expression equally for confident and hesitant print readers',
        'Textbook illustrators wanted to avoid printing sentences altogether',
        'To turn science lessons purely into silent colouring books',
        'To reduce the curriculum down to ten words',
      ],
      exp: 'Rich illustrations act as shared observational anchors inviting every pupil into rich verbal reasoning.',
    },
    mr: {
      q: 'इयत्ता ३ री–५ वीच्या बालभारती परिसर अभ्यास पुस्तकांमध्ये मोठ्या मजकुराऐवजी रंगीत "पहा व सांगा" चित्रमालिका व संवादपट का दिले आहेत?',
      opts: [
        'चित्रवाचनातून सूक्ष्म निरीक्षण, तर्क अनुमान आणि तोंडी अभिव्यक्ती सर्वच मुलांमध्ये सहज विकसित होते',
        'लेखकांना वाक्ये लिहिण्याचा कंटाळा आला म्हणून',
        'विज्ञानाचे रूपांतर फक्त रंगकामात करण्यासाठी',
        'अभ्यासक्रम दहा शब्दांत संपवण्यासाठी',
      ],
      exp: 'दृश्य चित्रवाचन हा सर्वसमावेशक निरीक्षणाचा व तोंडी चर्चेचा प्रभावी आधार आहे.',
    },
    hi: {
      q: 'कक्षा ३–५ की EVS किताबों में लंबे अनुच्छेदों के बजाय बड़े रंगीन "देखो और बताओ" चित्र-पैनल क्यों शामिल किए जाते हैं?',
      opts: [
        'चित्र-पठन सभी बच्चों में सूक्ष्म अवलोकन, अनुमान और मौखिक अभिव्यक्ति को सहजता से विकसित करता है',
        'लेखक लिखना नहीं चाहते थे',
        'विज्ञान को केवल रंग भरने का विषय बनाने को',
        'पाठ्यक्रम को दस शब्दों में समेटने को',
      ],
      exp: 'सार्थक चित्र सभी स्तरों के विद्यार्थियों को समान अवलोकन और संवाद के अवसर प्रदान करते हैं।',
    },
  },
  {
    topic: 'Avoiding Rote Slogans: Teaching Balanced Nutrition Practically',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'To help Class 4 learners distinguish healthy local snacks from sugary ultra-processed food without preaching shame, which activity works best?',
      opts: [
        'Let learners build a "Rainbow Tiffin Wheel" comparing real homemade snacks (roasted peanuts-jaggery, bhakri, cucumber, buttermilk) against sugar-laden chips using actual ingredient cards',
        'Throw away any child’s commercial snack inside the dustbin loudly',
        'Lecture about cardiovascular surgery to nine-year-olds',
        'Give extra detention for bringing a biscuit once',
      ],
      exp: 'Hands-on comparative tiffin boards teach smart balanced eating positively rather than shaming families.',
    },
    mr: {
      q: 'मुलांचा अपमान न करता किंवा कोरडे उपदेश न देता घरगुती पौष्टिक खाऊ व अति-प्रक्रियायुक्त जंक फूड यांतील फरक कसा समजावून सांगावा?',
      opts: [
        'शेंगदाणा-गूळ, भाकरी, काकडी, ताक यांसारख्या घरगुती खाऊची साखर-मीठ प्रमाणानुसार पॅकेटच्या पदार्थांशी तुलना करणारे "सप्तरंगी डबा चक्र" तयार करून घेणे',
        'वर्गासमोर मुलाचा बिस्कीट पुडा कचराकुंडीत फेकणे',
        '९ वर्षांच्या मुलांना हृदयशस्त्रक्रियेचे भाषण देणे',
        'शिक्षा सुनावणे',
      ],
      exp: 'तुलनात्मक सप्तरंगी आहार तक्ता कुटुंबांचा अनादर न करता आरोग्यदायी निवडीचे भान देतो.',
    },
    hi: {
      q: 'बिना शर्मिंदा किए या उपदेश दिए कक्षा ४ के बच्चों को स्वास्थ्यकर घरेलू नाश्ते व पैकेटबंद जंक फूड का अंतर कैसे समझाएँ?',
      opts: [
        'मूँगफली-गुड़, रोटी, खीरा, छाछ आदि के घटक कार्ड की तुलना चिप्स-कोल्डड्रिंक से करते हुए "इंद्रधनुषी टिफिन चक्र" बनवाकर',
        'सबके सामने बच्चे का बिस्कुट कूड़ेदान में फेंककर',
        'हृदय शल्यचिकित्सा पर व्याख्यान देकर',
        'दंड देकर',
      ],
      exp: 'सकारात्मक तुलनात्मक गतिविधियाँ किसी परिवार को नीचा दिखाए बिना संतुलित आहार की समझ देती हैं।',
    },
  },
  {
    topic: 'Documenting Student Voice via Exit Interviews & Audio Notes',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'In multi-grade rural schools where reading/writing levels vary widely, recording 1-minute oral reflections during a field walk ("What surprised you most near the well today?") provides:',
      opts: [
        'Rich authentic formative evidence capturing curiosity, vocabulary growth, and ecological reasoning free from writing fatigue',
        'A replacement for teaching basic reading and writing',
        'Evidence usable only to punish noisy talkers',
        'Unnecessary distraction from syllabus',
      ],
      exp: 'Brief oral reflections honour authentic voice and complement written notebooks cleanly.',
    },
    mr: {
      q: 'बहुवर्गीय ग्रामीण शाळांमध्ये लेखन पातळीत खूप तफावत असताना क्षेत्रभेटीनंतर "आज विहिरीजवळ तुम्हाला सर्वात जास्त काय आश्चर्यकारक वाटले?" यावर १ मिनिटाचे तोंडी अनुभव-कथन घेतल्याने काय साधते?',
      opts: [
        'लेखन थकव्याविना मुलांचे कुतूहल, शब्दसंग्रह आणि पर्यावरणीय तर्क यांचे अस्सल आकारिक मूल्यमापन मिळते',
        'वाचन-लेखन शिकवणे बंद होते',
        'बोलणाऱ्यांना शिक्षा करता येते',
        'वेळ वाया जातो',
      ],
      exp: 'तोंडी अनुभव-कथन मुलांचा खरा विचारप्रवाह व निरीक्षणशक्ती अचूक टिपते.',
    },
    hi: {
      q: 'विविध लेखन स्तरों वाली ग्रामीण कक्षा में भ्रमण के बाद "आज कुएँ के पास आपको सबसे अनोखा क्या लगा?" पर १ मिनट की मौखिक प्रतिक्रिया लेने से क्या मिलता है?',
      opts: [
        'लेखन के बोझ के बिना बच्चों की जिज्ञासा, शब्द-विकास और पारिस्थितिक तर्क का प्रामाणिक रचनात्मक प्रमाण',
        'पढ़ना-लिखना बंद करना',
        'शोर करने वालों को दंड देना',
        'समय की बर्बादी',
      ],
      exp: 'संक्षिप्त मौखिक अभिव्यक्ति हर विद्यार्थी की वास्तविक समझ व अवलोकन को निष्पक्षता से सामने लाती है।',
    },
  },
  {
    topic: 'Connecting Local Heritage Wells & Forts to Civic Responsibility',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'During a Class 5 heritage visit to a historical stone fort or stepwell where walls are covered in chalk scratches and plastic litter, how should the teacher guide learners?',
      opts: [
        'Discuss why public monuments belong to future generations equally, design respectful "Preserve Our Heritage" signage, and avoid carving names or littering personally',
        'Encourage students to scratch their own class initials higher on the arch',
        'Claim old forts are worthless stones',
        'Cancel all heritage awareness topics',
      ],
      exp: 'Connecting historical pride (e.g., Balbharati Std 4 forts!) directly to anti-vandalism stewardship builds active civic care.',
    },
    mr: {
      q: 'इयत्ता ५ वीच्या विद्यार्थ्यांनी ऐतिहासिक किल्ल्यावर किंवा प्राचीन बारवेवर खडूने कोरलेली नावे व प्लास्टिक कचरा पाहिल्यास शिक्षकाने कोणते नागरी शिक्षण द्यावे?',
      opts: [
        'ऐतिहासिक वारसा भावी पिढ्यांचाही आहे हे समजावून स्वतः नावे न कोरण्याची व कचरा न टाकण्याची जबाबदारी व वारसा संवर्धन फलक तयार करणे',
        'मुलांनाही कमानीवर स्वतःचे नाव कोरायला सांगणे',
        'जुने किल्ले निरुपयोगी दगड असल्याचे सांगणे',
        'वारसा सहल बंद करणे',
      ],
      exp: 'किल्ले व ऐतिहासिक वास्तूंच्या भेटीतून नागरी जबाबदारी व राष्ट्रीय वारसा संवर्धन प्रत्यक्ष रुजवले जाते.',
    },
    hi: {
      q: 'कक्षा ५ के भ्रमण में किसी ऐतिहासिक किले या पुरानी बावड़ी की दीवारों पर खुदे नाम व प्लास्टिक कचरा देखकर शिक्षक को कौन-सी नागरिक शिक्षा देनी चाहिए?',
      opts: [
        'यह समझाना कि विरासत स्थल भावी पीढ़ियों की साझा धरोहर हैं, अतः स्वयं नाम न खोदने, कचरा न फैलाने व संरक्षण संदेश बनाने की जिम्मेदारी निभाना',
        'बच्चों से भी मेहराब पर नाम खुदवाना',
        'किले को बेकार पत्थर बताना',
        'विरासत पाठ हटाना',
      ],
      exp: 'ऐतिहासिक स्थलों का अवलोकन बच्चों में सार्वजनिक संपत्ति की रक्षा और सांस्कृतिक धरोहर के प्रति गर्व व उत्तरदायित्व जगाता है।',
    },
  },
];
