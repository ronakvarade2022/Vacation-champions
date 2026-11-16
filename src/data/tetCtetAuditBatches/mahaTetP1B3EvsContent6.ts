import { CuratedTrilingualMcq } from './types';

// Batch 3 Primary EVS Content Part 6 (28 verified trilingual MCQs: Plants, Animals, Simple Machines, Matter, Light & Energy)
export const MAHA_TET_P1_B3_EVS_C6: CuratedTrilingualMcq[] = [
  {
    topic: 'Nepenthes Pitcher Plant – Why Insectivorous Plants Trap Insects',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Green Pitcher Plants (`Nepenthes`, found in Meghalaya’s misty hills) ALREADY have green chlorophyll and perform photosynthesis. Then why do their modified jug-shaped leaves still lure and digest insects?',
      opts: [
        'They grow in waterlogged soils poor in NITROGEN minerals, so digested insects supply the missing nitrogen proteins',
        'They lack green chlorophyll completely and live underground',
        'Insects pump drinking water up their stems',
        'Pitcher leaves only decorate rainforest floors',
      ],
      exp: 'NCERT Class 5 notes Nepenthes photosynthesizes carbs normally yet traps insects specifically to obtain scarce soil Nitrogen.',
    },
    mr: {
      q: 'मेघालयातील हिरव्या "घटपर्णी (Nepenthes / Pitcher Plant)" वनस्पतीमध्ये हरितद्रव्य असून ती स्वतः प्रकाशसंश्लेषण करते; तरीही ती किटकांची शिकार का करते?',
      opts: [
        'जिथे ती वाढते त्या दलदलीच्या जमिनीत "नायट्रोजन" खनिजाची कमतरता असते; ती उणीव भरून काढण्यासाठी ती किटकांचे पचन करते',
        'तिच्यात हरितद्रव्य अजिबात नसते म्हणून',
        'किटक तिच्या खोडात पाणी भरतात म्हणून',
        'फक्त जंगलाची शोभा वाढवण्यासाठी',
      ],
      exp: 'घटपर्णी वनस्पती सूर्यप्रकाशात अन्न बनवतेच, परंतु नायट्रोजनची गरज भागवण्यासाठी किटकांचा आहार घेते.',
    },
    hi: {
      q: 'मेघालय में पाया जाने वाला हरा "घटपर्णी (Nepenthes)" पौधा क्लोरोफिल से स्वयं प्रकाश-संश्लेषण करता है; फिर भी वह कीड़ों का शिकार क्यों करता है?',
      opts: [
        'वह ऐसी मिट्टी में उगता है जहाँ "नाइट्रोजन" की भारी कमी होती है; अतः नाइट्रोजन-प्रोटीन की पूर्ति हेतु कीड़ों को पचाता है',
        'उसमें क्लोरोफिल बिल्कुल नहीं होता',
        'कीड़े उसके तने में पानी भरते हैं',
        'केवल जंगल सजाने के लिए',
      ],
      exp: 'घटपर्णी स्वपोषी प्रकाश-संश्लेषण के साथ-साथ मिट्टी में नाइट्रोजन की कमी पूरी करने के लिए कीटभक्षी होता है।',
    },
  },
  {
    topic: 'George de Mestral & Velcro Hook-and-Loop Invention (Cocklebur)',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Inspecting tiny burr seeds (`Xanthium` / Gokharu) clinging stubbornly to his dog’s fur and trousers under a microscope in `1948`, Swiss engineer George de Mestral invented which everyday fastener inspired by seed dispersal?',
      opts: ['Velcro', 'Zipper metal teeth', 'Magnetic fridge door seal', 'Rubber shoe soles'],
      exp: 'Burr seeds evolved tiny elastic hooks to hitchhike on passing fur (`animal seed dispersal`)—inspiring Velcro.',
    },
    mr: {
      q: 'कुत्र्याच्या केसांना व कपड्यांना चिकटलेल्या काटेरी बियांचे (`गोखरू / Xanthium`) सूक्ष्मदर्शकाखाली निरीक्षण करून जॉर्ज द मेस्ट्राल यांनी `१९४८` मध्ये कोणती उपयुक्त वस्तू शोधून काढली?',
      opts: ['व्हेल्क्रो (Velcro पट्टी)', 'धातूची चैन', 'चुंबकीय कुलूप', 'रबरी चप्पल'],
      exp: 'प्राण्यांच्या केसांद्वारे बीजप्रसारासाठी बियांना असलेले सूक्ष्म आकडे (Hooks) पाहून व्हेल्क्रोचा शोध लागला.',
    },
    hi: {
      q: '1948 में अपने कुत्ते के बालों व कपड़ों पर चिपके काँटेदार बीजों (गोखरू) को सूक्ष्मदर्शी से देखकर जॉर्ज मेस्ट्रल ने किस दैनिक चीज़ का आविष्कार किया?',
      opts: ['वेल्क्रो (Velcro चिपकने वाली पट्टी)', 'धातु की ज़िप', 'चुंबकीय फ्रिज सील', 'रबड़ का सोल'],
      exp: 'जंतुओं द्वारा बीज-प्रकीर्णन हेतु बीजों पर बने सूक्ष्म हुकों की नकल से वेल्क्रो का आविष्कार हुआ।',
    },
  },
  {
    topic: 'Seed Dispersal Modes Matching – Coconut, Drumstick, Balsam, Burr',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Which seed dispersal match pairs `Water currents (fibrous buoyant husk)`, `Wind gusts (papery wings)`, and `Sudden Pod Bursting` accurately?',
      opts: [
        'Coconut (water), Drumstick/Moringa (wind), and Balsam/Terda (explosive pod bursting)',
        'Mango (wind), Poppy (ocean waves), and Coconut (exploding pods)',
        'Lotus (eagle claws), Rice (bursting pods), and Maple (water)',
        'Sunflower (earthworms), Gram (waves), and Pea (winged flight)',
      ],
      exp: 'Coconut floats across coastlines via coir husk; drumstick/milkweed glide on wind; mature balsam pods snap open tossing seeds.',
    },
    mr: {
      q: 'अनुक्रमे `पाणी (तरंगणारे आवरण)`, `वारा (पंखयुक्त बी)` आणि `शेंग फुटून स्फोट (Bursting)` यांद्वारे होणाऱ्या बीजप्रसाराची अचूक जोडी कोणती?',
      opts: [
        'नारळ (पाणी), शेवगा/रुई (वारा) आणि तेरडा/बाल्सम (शेंग तडकून फुटणे)',
        'आंबा (वारा), खसखस (समुद्र), नारळ (स्फोट)',
        'कमळ (पक्षी), तांदूळ (स्फोट), शेवगा (पाणी)',
        'सूर्यफूल (गांडूळ), हरभरा (लाटा), वाटाणा (पंख)',
      ],
      exp: 'नारळाचे काथ्याचे आवरण पाण्यावर तरंगते, शेवगा-रुई वाऱ्याने उडतात तर तेरड्याची फळे वाळल्यावर तडकून बिया दूर फेकतात.',
    },
    hi: {
      q: '`जल प्रवाह`, `वायु (पंख/रोएँ)` और `फली फटकर विस्फोट` द्वारा बीज प्रकीर्णन की सही जोड़ी कौन-सी है?',
      opts: [
        'नारियल (जल), सहजन/आक (वायु) और बाल्सम/गुलमेहंदी (फली फटना)',
        'आम (वायु), खसखस (समुद्र) और नारियल (विस्फोट)',
        'कमल (चील), धान (विस्फोट) और सहजन (जल)',
        'सूरजमुखी (केंचुए), चना (लहरें) और मटर (पंख)',
      ],
      exp: 'नारियल रेशेदार खोल से तैरता है, सहजन-मदार हवा से उड़ते हैं और बाल्सम की फली फटकर बीज छिटकती है।',
    },
  },
  {
    topic: 'Honeybee Waggle Dance & Colony Division of Labour',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'NCERT Class 4 ("Anita and the Honeybees"): When a scout worker bee discovers nectar-rich litchi or mustard blossoms, how does she communicate exact direction and distance inside the dark hive?',
      opts: [
        'By performing a special figure-8 rhythmic "Waggle Dance" on the honeycomb',
        'By stinging the Queen bee gently three times',
        'By whistling ultrasonic tunes outside the hive',
        'By drawing nectar maps with wax pellets',
      ],
      exp: 'Karl von Frisch decoded honeybee round & waggle dances communicating nectar bearing relative to the sun and distance.',
    },
    mr: {
      q: 'एखाद्या कामकरी मधमाशीला मधाने भरलेल्या फुलांचा स्रोत सापडल्यावर ती मधाच्या पोळ्यावरील इतर माशांना दिशा व अंतर कसे कळवते?',
      opts: [
        'पोळ्यावर एक विशिष्ट तालबद्ध नृत्य ("Waggle Dance") करून',
        'राणी माशीला तीन वेळा चावा घेऊन',
        'पोळ्याबाहेर शिट्टी वाजवून',
        'मेणाने नकाशा काढून',
      ],
      exp: 'मधमाशा विशिष्ट प्रकारचे नृत्य करून अन्नाची दिशा व अंतर इतर कामकरी माशांना कळवतात (हे कार्ल वॉन फ्रिश यांनी शोधले).',
    },
    hi: {
      q: 'जब एक श्रमिक मधुमक्खी को रस से भरे फूल मिल जाते हैं, तो वह छत्ते की अन्य मक्खियों को ठीक दिशा व दूरी कैसे बताती है?',
      opts: [
        'छत्ते पर एक विशेष लयबद्ध नृत्य ("वैगल डांस") करके',
        'रानी मक्खी को तीन बार डंक मारकर',
        'बाहर तेज़ सीटी बजाकर',
        'मोम से नक्शा बनाकर',
      ],
      exp: 'मधुमक्खियाँ सूर्य के सापेक्ष कोण व दूरी बताने हेतु विशेष वैगल नृत्य करती हैं (कार्ल वॉन फ्रिश द्वारा खोजा गया)।',
    },
  },
  {
    topic: 'Banyan Aerial Prop Roots vs Maize Stilt Roots',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why does a century-old Banyan tree (`Vad`) drop thick rope-like roots straight downward from horizontal branches into the soil far from its central trunk?',
      opts: [
        'Those hanging aerial PROP ROOTS anchor into the ground and thicken into pillar-like trunks supporting the enormous spreading canopy',
        'They serve solely as hanging swings for eagles',
        'They absorb moonlight rays at midnight',
        'They pump stored nectar downward out of leaves',
      ],
      exp: 'Adventitious prop roots act as living structural pillars (`like the Great Banyan`) holding massive lateral limbs upright.',
    },
    mr: {
      q: 'जुनाट वडाच्या झाडाच्या (Banyan) आडव्या फांद्यांवरून जमिनीकडे सरळ खाली येणाऱ्या जाड पारंब्यांचे मुख्य कार्य कोणते?',
      opts: [
        'जमिनीत रुजल्यावर खांबांसारखे काम करून वडाच्या अवाढव्य पसरलेल्या फांद्यांना भक्कम यांत्रिक आधार देणे (आधारमुळे / Prop roots)',
        'फक्त गरुडांना झोके देण्यासाठी',
        'रात्रीचा चंद्रप्रकाश शोषण्यासाठी',
        'पानांतील मध जमिनीत ओतण्यासाठी',
      ],
      exp: 'वडाच्या पारंब्या जमिनीत गेल्यावर जणू नवे खोड बनून प्रचंड विस्तारलेल्या फांद्यांचा भार पेलतात.',
    },
    hi: {
      q: 'पुराने बरगद के पेड़ की चौड़ी डालों से ज़मीन की ओर सीधी उतरने वाली मोटी जटाएँ (प्रॉप जड़ें) मुख्यतः क्या कार्य करती हैं?',
      opts: [
        'ज़मीन में धँसकर मजबूत स्तंभों की तरह विशाल फैली हुई शाखाओं को यांत्रिक सहारा प्रदान करती हैं',
        'केवल पक्षियों के झूलने के काम आती हैं',
        'रात्रि में चाँदनी सोखती हैं',
        'पत्तों का रस ज़मीन में डालती हैं',
      ],
      exp: 'बरगद की अवस्तंभ/स्तंभ जड़ें (Prop roots) भारी-भरकम क्षैतिज डालों को जीवित खंभों की तरह सहारा देती हैं।',
    },
  },
  {
    topic: 'Desert Plant Adaptations – Cactus Green Stem & Spines',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'On desert cacti (`Opuntia` / `Nivdung`), leaves have shrunk into sharp SPINES while the thick stem turned bright green and fleshy. Why do BOTH changes help cactus survive hot deserts?',
      opts: [
        'Spines sharply cut water loss by transpiration and deter thirsty animals, while the green fleshy stem stores water and performs photosynthesis',
        'Spines absorb rain while stems shade sand dunes',
        'Green stems store diesel fuel naturally',
        'Spines turn sand into fresh clay nightly',
      ],
      exp: 'Reduced leaf surface cuts evaporation dramatically while waxy succulent stems manufacture sugars safely.',
    },
    mr: {
      q: 'वाळवंटातील निवडुंगाची (Cactus) पाने काट्यांत रूपांतरित होऊन खोड हिरवे व मांसल का झालेले असते?',
      opts: [
        'काट्यांमुळे बाष्पीभवनातून पाणी वाया जाणे टळते व प्राण्यांपासून संरक्षण होते, तर हिरवे मांसल खोड पाणी साठवून प्रकाशसंश्लेषण करते',
        'काटे पाऊस शोषतात म्हणून',
        'खोडात इंधन साठते म्हणून',
        'काटे वाळूची माती बनवतात म्हणून',
      ],
      exp: 'शुष्क हवामानात पाणी वाचवण्यासाठी पानांचे काटे बनतात व अन्ननिर्मितीचे काम हिरवे खोड करते.',
    },
    hi: {
      q: 'मरुस्थलीय नागफनी (कैक्टस) में पत्तियाँ काँटों में क्यों बदल जाती हैं और तना मोटा व हरा क्यों होता है?',
      opts: [
        'काँटों से वाष्पोत्सर्जन द्वारा जल-हानि रुकती है व पशुओं से रक्षा होती है, जबकि हरा मांसल तना जल संचय व प्रकाश-संश्लेषण करता है',
        'काँटे बारिश सोखते हैं',
        'तने में ईंधन जमा होता है',
        'काँटे रेत को मिट्टी बनाते हैं',
      ],
      exp: 'मरुस्थलीय अनुकूलन के तहत काँटे जल बचाते हैं और हरा गूदेदार तना भोजन बनाने व पानी जमा करने का काम संभालता है।',
    },
  },
  {
    topic: 'Flower Reproductive Parts – Stamen, Pistil/Carpel & Ovules',
    pattern: 'Factual',
    difficulty: 'Moderate',
    en: {
      q: 'Examining a large red Hibiscus (`Jaswand`) flower under a hand lens, after pollen grains land on the sticky STIGMA, which swollen bottom part of the pistil turns into the FRUIT while its tiny ovules become SEEDS?',
      opts: ['Ovary', 'Sepals (green calyx)', 'Anther sac', 'Petiole stalk'],
      exp: 'Post-fertilization: Swollen Ovary -> Fruit; Ovules -> Seeds; colourful petals & stamens wither away cleanly.',
    },
    mr: {
      q: 'जास्वंदीच्या फुलात परागकण कुक्षीवर (Stigma) पडल्यावर फलनानंतर स्त्रीकेसराच्या तळाशी असलेला कोणता फुगीर भाग "फळ" बनतो व आतील बीजांडे "बिया" बनतात?',
      opts: ['अंडाशय (Ovary)', 'हिरवा निदलपुंज (Sepals)', 'परागकोश (Anther)', 'देठ'],
      exp: 'फलनानंतर अंडाशयाचे रूपांतर फळात आणि बीजांडांचे (Ovules) रूपांतर बियांमध्ये होते.',
    },
    hi: {
      q: 'गुड़हल के फूल में वर्तिकाग्र पर परागकण पहुँचने के बाद निषेचन होने पर स्त्रीकेसर का कौन-सा फूला हुआ निचला भाग "फल" बनता है और बीजांड "बीज" बनते हैं?',
      opts: ['अंडाशय (Ovary)', 'बाह्यदल (Sepals)', 'परागकोश (Anther)', 'डंठल'],
      exp: 'निषेचन के उपरांत अंडाशय विकसित होकर फल तथा उसके भीतर स्थित बीजांड बीज बन जाते हैं।',
    },
  },
  {
    topic: 'Classes of Levers – First, Second & Third Class Everyday Examples',
    pattern: 'Factual',
    difficulty: 'Moderate',
    en: {
      q: 'Using the `FLE` (`Fulcrum–Load–Effort` middle position) rule for Levers, which everyday tool sequence matches `Class 1, Class 2, and Class 3` levers accurately?',
      opts: [
        'Scissors/Seesaw (Fulcrum middle), Nutcracker/Lemon squeezer (Load middle), and Sugar-tongs/Broom (Effort middle)',
        'Lemon squeezer (Class 1), Seesaw (Class 2), Wheelbarrow (Class 3)',
        'Crowbar (Class 3), Fishing rod (Class 2), Tweezers (Class 1)',
        'Ramp, Screw, and Pulley',
      ],
      exp: 'Remember `1-2-3 -> F-L-E`: Class 1 has Fulcrum between (scissors), Class 2 has Load between (nutcracker/wheelbarrow), Class 3 has Effort between (tongs/tweezers).',
    },
    mr: {
      q: '`टेकू – भार – बल (FLE)` मधोमध असण्यावरून पहिल्या, दुसऱ्या आणि तिसऱ्या प्रकारच्या तरफेची (Lever) अचूक क्रमवार उदाहरणे कोणती?',
      opts: [
        'कात्री/सी-सॉ (प्रकार १ - टेकू मध्ये), अडकित्ता/लिंबू पिळण्याचे यंत्र (प्रकार २ - भार मध्ये), आणि चिमटा (प्रकार ३ - बल मध्ये)',
        'लिंबू पिळणी (प्रकार १), सी-सॉ (प्रकार २), हातगाडी (प्रकार ३)',
        'पहार (प्रकार ३), गळ (प्रकार २), चिमटा (प्रकार १)',
        'उतरण, स्क्रू आणि कप्पी',
      ],
      exp: 'मध्यभागी टेकू तर प्रकार १ (कात्री), मध्यभागी भार तर प्रकार २ (अडकित्ता/एकचाकी हातगाडी), आणि मध्यभागी बल तर प्रकार ३ (चिमटा).',
    },
    hi: {
      q: 'मध्य स्थिति (`आलंब–भार–आयास / FLE`) नियम से प्रथम, द्वितीय और तृतीय श्रेणी के उत्तोलक की सही क्रमबद्ध जोड़ी कौन-सी है?',
      opts: [
        'कैंची/सी-सॉ (आलंब मध्य — प्रथम), सरौता/नींबू निचोड़नी (भार मध्य — द्वितीय), और चिमटा (आयास मध्य — तृतीय)',
        'नींबू निचोड़नी (प्रथम), सी-सॉ (द्वितीय), ठेला (तृतीय)',
        'सब्बल (तृतीय), मछली डंडा (द्वितीय), चिमटा (प्रथम)',
        'आनत तल, पेंच और घिरनी',
      ],
      exp: 'प्रथम में आलंब बीच (कैंची), द्वितीय में भार बीच (सरौता/पहिएदार ठेला) और तृतीय में प्रयास बीच (चिमटा) होता है।',
    },
  },
  {
    topic: 'Inclined Plane Wheelchair Ramp & Mountain Hairpin Roads',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why do winding mountain roads climb in gentle zig-zag hairpin loops and why do hospitals build long sloped wheelchair ramps instead of lifting chairs vertically up steps?',
      opts: [
        'An Inclined Plane spreads the vertical height over a longer gentle distance, slashing the pushing effort needed at any instant',
        'Ramps cancel gravitational pull inside buildings permanently',
        'Zig-zag loops halve the vertical height of mountains',
        'Wheels roll upward effortlessly on 90° vertical walls',
      ],
      exp: 'Inclined planes (`ghat zig-zags`, screw threads, hospital ramps) trade extra distance for reduced instantaneous force.',
    },
    mr: {
      q: 'घाटातील रस्ते नागमोडी वळणांचे का असतात आणि रुग्णालयांत पायऱ्यांऐवजी लांब उताराचे रॅम्प (उतरण) का बांधतात?',
      opts: [
        'उतरण (Inclined Plane) या साध्या यंत्रामुळे अंतर थोडे वाढते पण वस्तू/व्हीलचेअर वर नेण्यासाठी लागणारे बल खूप कमी होते',
        'उतरणीमुळे गुरुत्वाकर्षण कायमचे शून्य होते म्हणून',
        'वळणांमुळे डोंगराची उंची निम्मी होते म्हणून',
        'चाके ९०° भिंतीवरही सहज चढतात म्हणून',
      ],
      exp: 'लांब सौम्य उताराच्या उतरणीमुळे कमी बलात जड वजन उंचावर सहज नेता येते.',
    },
    hi: {
      q: 'पहाड़ी सड़कें घुमावदार (ज़िग-ज़ैग) क्यों बनाई जाती हैं और अस्पतालों में सीढ़ियों के साथ लंबा ढालू रैंप क्यों होता है?',
      opts: [
        'आनत तल (Inclined Plane) ऊँचाई को लंबी दूरी पर फैलाकर किसी भी क्षण लगने वाले धकेलने के बल को काफी कम कर देता है',
        'रैंप से गुरुत्वाकर्षण शून्य हो जाता है',
        'घुमाव से पहाड़ की ऊँचाई आधी हो जाती है',
        'पहिए 90° खड़ी दीवार पर चढ़ सकते हैं',
      ],
      exp: 'आनत तल (ढालू रैंप) थोड़ी अधिक दूरी के बदले कम प्रयास में भारी वस्तु या व्हीलचेयर को ऊपर ले जाने में सहायता करता है।',
    },
  },
  {
    topic: 'Sublimation – Camphor (`Kapoor`) & Naphthalene Solid-to-Gas',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Placed inside woollen clothes trunks or lit in rituals, solid camphor (`Kapoor`) or white naphthalene balls vanish gradually into fragrance WITHOUT ever turning into a puddle of liquid. What is this state change called?',
      opts: ['Sublimation (Samplavan)', 'Condensation', 'Freezing', 'Sedimentation'],
      exp: 'Sublimation changes certain solids directly into vapour on warming without passing through a liquid phase.',
    },
    mr: {
      q: 'कपड्यांच्या कपाटात ठेवलेल्या डांबराच्या गोळ्या किंवा कापूर वडी द्रवरूप न होता थेट स्थायूरूपातून वायुरूपात रूपांतरित होऊन हवेत विरघळते; या क्रियेला काय म्हणतात?',
      opts: ['संप्वन / संप्लवन (Sublimation)', 'संघनन (Condensation)', 'गोठण', 'निवळण'],
      exp: 'काही स्थायू पदार्थ तापवल्यास किंवा हवेत द्रव अवस्था न येता थेट वायुरूपात जातात, याला संप्लवन (Sublimation) म्हणतात.',
    },
    hi: {
      q: 'ऊनी कपड़ों के बीच रखी कपूर की टिकिया या नेफ़्थलीन की गोलियाँ बिना तरल बने सीधे ठोस से गैस बनकर गायब हो जाती हैं; यह परिवर्तन क्या कहलाता है?',
      opts: ['ऊर्ध्वपातन (Sublimation)', 'संघनन (Condensation)', 'हिमीकरण', 'अवसादन'],
      exp: 'ठोस से द्रव में बदले बिना सीधे वाष्प/गैस बन जाने की प्रक्रिया को ऊर्ध्वपातन (Sublimation) कहते हैं।',
    },
  },
  {
    topic: 'Reversible Physical Change vs Irreversible Chemical Change',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Among kitchen and craft changes, which pair clearly shows one REVERSIBLE physical change (`no new substance`) followed by one IRREVERSIBLE chemical change (`new substance formed`)?',
      opts: [
        'Melting coconut oil in winter sunshine -> Turning fresh milk into sour curd',
        'Burning a paper sheet -> Baking bread dough in oven',
        'Rusting an iron nail -> Ripening a green mango',
        'Freezing tap water into ice -> Dissolving table sugar in water',
      ],
      exp: 'Melted oil freezes back reversibly, whereas milk fermentation forms new lactic acid irreversibly.',
    },
    mr: {
      q: 'खालीलपैकी कोणती जोडी अनुक्रमे एक "परिवर्तनीय भौतिक बदल" (मूळ पदार्थ परत मिळतो) आणि एक "अपरिवर्तनीय रासायनिक बदल" (नवीन पदार्थ तयार होतो) दर्शवते?',
      opts: [
        'उन्हात गोठलेले खोबरेल तेल वितळणे -> दुधाचे दही होणे',
        'कागद जळणे -> भाकरी भाजणे',
        'लोखंडाला गंज चढणे -> कैरी पिकून आंबा होणे',
        'बर्फ होणे -> पाण्यात साखर विरघळणे',
      ],
      exp: 'खोबरेल तेल वितळल्यावर थंड करताच पुन्हा गोठते (भौतिक बदल), तर दुधाचे दही झाल्यावर पुन्हा दूध मिळू शकत नाही (रासायनिक बदल).',
    },
    hi: {
      q: 'निम्न में से कौन-सा युग्म क्रमशः एक "उत्क्रमणीय भौतिक परिवर्तन" और एक "अनुत्क्रमणीय रासायनिक परिवर्तन" को सही दर्शाता है?',
      opts: [
        'धूप में जमे नारियल तेल का पिघलना -> दूध से दही जमना',
        'कागज़ जलना -> रोटी पकना',
        'लोहे में जंग लगना -> आम पकना',
        'पानी से बर्फ बनना -> पानी में चीनी घुलना',
      ],
      exp: 'नारियल तेल का पिघलना उत्क्रमणीय भौतिक परिवर्तन है, जबकि दूध से दही बनना नया पदार्थ बनाने वाला अनुत्क्रमणीय रासायनिक परिवर्तन है।',
    },
  },
  {
    topic: 'Iron Rusting Requires BOTH Oxygen AND Water Moisture',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In coastal Mumbai or Ratnagiri, unpainted iron window grilles rust MUCH faster than identical grilles in dry Vidarbha summers. Why does coating iron with red-oxide paint or zinc (`galvanization`) block rusting?',
      opts: [
        'It seals the bare iron surface away from BOTH atmospheric oxygen AND humid moisture required simultaneously for rust (`iron oxide`) formation',
        'Paint chills iron below freezing point',
        'Zinc turns atmospheric nitrogen into solid gold',
        'Paint makes iron invisible to sea waves',
      ],
      exp: 'Rust requires iron + oxygen + water/humidity simultaneously; barrier coatings (paint, oil, zinc) break that contact.',
    },
    mr: {
      q: 'कोरड्या भागापेक्षा कोकणातील दमट हवामानात लोखंडी जाळ्या लवकर गंजतात; त्यांवर ऑइल पेंट किंवा जस्ताचे आवरण (Galvanization) लावल्याने गंज कसा टळतो?',
      opts: [
        'गंजण्यासाठी लागणाऱ्या हवेतील ऑक्सिजन आणि दमट ओलावा या दोन्हींशी लोखंडाचा थेट संपर्क तुटतो म्हणून',
        'पेंटमुळे लोखंड थंड राहते म्हणून',
        'जस्तामुळे नायट्रोजनचे सोने होते म्हणून',
        'पेंटमुळे लाटा दिसत नाहीत म्हणून',
      ],
      exp: 'लोखंड गंजण्यासाठी हवा (ऑक्सिजन) व पाणी/ओलावा दोन्ही एकाच वेळी लागतात; रंग किंवा जस्त हा संपर्क रोखतो.',
    },
    hi: {
      q: 'तटीय नम कोंकण में लोहे की खिड़कियों पर जंग तेज़ी से क्यों लगती है, और पेंट या जस्ता लेपन (गैल्वनाइजेशन) से जंग कैसे रुकती है?',
      opts: [
        'लेपन लोहे की सतह का वायु के ऑक्सीजन और नमी दोनों से संपर्क तोड़ देता है, जो जंग लगने के लिए एक साथ आवश्यक हैं',
        'पेंट लोहे को बर्फ जितना ठंडा रखता है',
        'जस्ता नाइट्रोजन को सोने में बदलता है',
        'पेंट से समुद्री हवा दिखती नहीं',
      ],
      exp: 'जंग (आयरन ऑक्साइड) बनने के लिए ऑक्सीजन और जल/नमी दोनों ज़रूरी हैं; पेंट या ज़िंक परत यह संपर्क रोक देती है।',
    },
  },
  {
    topic: 'Why Friction Is Both Friend & Foe (Treaded Tyres vs Ball Bearings)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Without friction, we could neither walk forward nor stop a moving bicycle. Yet engineers deliberately pack steel ball bearings and grease inside bicycle wheel axles specifically to:',
      opts: [
        'Reduce unnecessary sliding friction (`replacing sliding with tiny rolling friction`), preventing heat wear and saving pedaling energy',
        'Lock the wheel rigidly like rubber brakes',
        'Make bicycle tyres heavier on wet mud',
        'Multiply rust inside metal spokes',
      ],
      exp: 'We increase friction on shoe soles and brake pads (`grip`) while reducing friction via lubricants & ball bearings at axles.',
    },
    mr: {
      q: 'चालण्यासाठी व ब्रेक मारण्यासाठी घर्षण गरजेचे असूनही सायकलच्या चाकांच्या आसामध्ये (Axle) स्टीलचे छरे (Ball bearings) व ग्रीस का भरतात?',
      opts: [
        'अनावश्यक घर्षण कमी करून (सरकत्या घर्षणाचे रूपांतर लहान लोटत्या घर्षणात करून) झीज व उष्णता टाळण्यासाठी आणि सायकल हलकी चालण्यासाठी',
        'चाक कायमचे घट्ट अडकवण्यासाठी',
        'चाकांचे वजन वाढवण्यासाठी',
        'गंज वेगाने वाढवण्यासाठी',
      ],
      exp: 'बूट व ब्रेकपॅडवर आपण घर्षण वाढवतो, तर फिरणाऱ्या आसांत बॉल बेअरिंग व वंगण वापरून घर्षण कमी करतो.',
    },
    hi: {
      q: 'चलने व ब्रेक लगाने हेतु घर्षण आवश्यक होने पर भी साइकिल के पहियों की धुरी में बॉल बेयरिंग और ग्रीस क्यों लगाए जाते हैं?',
      opts: [
        'अनावश्यक फिसलन-घर्षण को कम लोटनिक-घर्षण में बदलकर ऊर्जा बचाने और पुर्जों की घिसावट व ऊष्मा रोकने के लिए',
        'पहिए को हमेशा जाम करने के लिए',
        'टायर का वजन बढ़ाने के लिए',
        'जंग तेज़ी से फैलाने के लिए',
      ],
      exp: 'ब्रेक व जूतों के तलवों में घर्षण बढ़ाया जाता है, जबकि धुरी में बॉल बेयरिंग व स्नेहक से घर्षण घटाया जाता है।',
    },
  },
  {
    topic: 'Sound Requires a Material Medium – Cannot Travel in Vacuum',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'On the airless Moon, if two astronauts wearing helmets stand just `2` metres apart and clap loudly without radio sets, neither can hear the other because:',
      opts: [
        'Sound waves need vibrating matter (`air, water, or solid`) to travel and CANNOT travel through empty vacuum',
        'Moon gravity freezes vocal cords into ice',
        'Sunlight absorbs loud sounds instantly',
        'Air on the Moon is too thick for clapping',
      ],
      exp: 'Unlike light (electromagnetic waves), sound is a mechanical compression wave requiring particles—hence astronauts use radio waves.',
    },
    mr: {
      q: 'हवा नसलेल्या चंद्रावर दोन अंतराळवीर २ मीटर अंतरावर उभे राहून रेडिओशिवाय टाळ्या वाजवल्यास एकमेकांना आवाज ऐकू येणार नाही, कारण:',
      opts: [
        'ध्वनी लहरींच्या प्रसारासाठी माध्यमाची (हवा, पाणी किंवा स्थायू) आवश्यकता असते; निर्वात पोकळीतून (Vacuum) ध्वनी प्रवास करू शकत नाही',
        'चंद्राच्या गुरुत्वाकर्षणाने स्वरयंत्र गोठते म्हणून',
        'सूर्यप्रकाश आवाज गिळतो म्हणून',
        'चंद्रावरची हवा खूप दाट आहे म्हणून',
      ],
      exp: 'प्रकाश निर्वात पोकळीतून प्रवास करू शकतो, पण ध्वनीसाठी भौतिक माध्यम अत्यावश्यक असते.',
    },
    hi: {
      q: 'वायु-रहित चंद्रमा पर यदि दो अंतरिक्ष यात्री रेडियो के बिना 2 मीटर की दूरी से ताली बजाएँ, तो आवाज़ एक-दूसरे को क्यों नहीं सुनाई देगी?',
      opts: [
        'ध्वनि तरंगों के संचरण के लिए भौतिक माध्यम (हवा, जल या ठोस) आवश्यक है; ध्वनि निर्वात (Vacuum) में नहीं चल सकती',
        'चंद्रमा का गुरुत्व स्वर-रज्जु जमा देता है',
        'धूप ध्वनि को सोख लेती है',
        'चंद्रमा की हवा बहुत भारी है',
      ],
      exp: 'प्रकाश निर्वात में चल सकता है, पर ध्वनि एक यांत्रिक तरंग होने से बिना माध्यम के आगे नहीं बढ़ सकती।',
    },
  },
  {
    topic: 'Earthworms & Vermicomposting (`Red Wigglers` Turning Kitchen Scraps)',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Often hailed as the "Farmer’s Best Friend" (`NCERT Class 5`), earthworms dramatically enrich farmland and school compost beds by:',
      opts: [
        'Tunneling through soil to aerate roots with oxygen & rainwater AND excreting nutrient-rich organic worm castings (`vermicompost`)',
        'Eating living healthy green mango fruits off tall treetops',
        'Pumping synthetic urea factories underground',
        'Hardening mud permanently into waterproof bricks',
      ],
      exp: 'Earthworms swallow dead leaf litter and soil, leaving porous channels for air/water and fertile humus castings.',
    },
    mr: {
      q: 'गांडुळांना "शेतकऱ्याचा मित्र" का म्हणतात आणि ते गांडूळखत प्रकल्पात जमिनीची सुपीकता कशी वाढवतात?',
      opts: [
        'जमिनीत भुसभुशीत बिळे करून हवा व पावसाचे पाणी आत पोहोचवतात आणि पालापाचोळा खाऊन अत्यंत पोषक सेंद्रिय खत (गांडूळखत) तयार करतात',
        'उंच झाडावरील आंबे खातात म्हणून',
        'जमिनीत रासायनिक युरिया बनवतात म्हणून',
        'मातीच्या विटा घडवतात म्हणून',
      ],
      exp: 'गांडुळांमुळे जमीन भुसभुशीत व सच्छिद्र होते आणि सेंद्रिय कचऱ्याचे उत्तम खतात रूपांतर होते.',
    },
    hi: {
      q: 'केंचुओं को "किसान का मित्र" क्यों कहा जाता है और वे वर्मीकम्पोस्ट द्वारा मिट्टी को उपजाऊ कैसे बनाते हैं?',
      opts: [
        'वे मिट्टी में सुरंगें बनाकर हवा व वर्षाजल को जड़ों तक पहुँचाते हैं तथा सड़े पत्तों को खाकर अत्यंत पोषक जैविक खाद (वर्मीकम्पोस्ट) बनाते हैं',
        'पेड़ के हरे आम खाकर',
        'ज़मीन के नीचे कृत्रिम यूरिया बनाकर',
        'मिट्टी को पक्की ईंट जैसा कठोर बनाकर',
      ],
      exp: 'केंचुए मिट्टी को भुरभुरा व वायुयुक्त बनाकर जैविक कचरे को उत्तम ह्यूमस खाद में बदलते हैं।',
    },
  },
  {
    topic: 'Forest Fire Prevention & Canopy Microclimate Role',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why does dry leaf litter burning (`vanva` / summer forest fires) across Maharashtra’s Sahyadri hillsides damage streams for years afterward?',
      opts: [
        'It wipes out saplings, burrowing insects, and topsoil humus sponge—causing monsoon torrents to wash bare soil away rather than soak into springs',
        'Ash permanently turns rainwater into honey',
        'Forest fires attract heavier summer snowfall',
        'Burned rocks instantly become lush evergreens overnight',
      ],
      exp: 'Intact forest litter slows raindrops like a sponge, feeding groundwater springs throughout dry months.',
    },
    mr: {
      q: 'उन्हाळ्यात सह्याद्रीच्या डोंगरांना लागणारे वणवे (वन-आग) पुढची अनेक वर्षे झऱ्यांचे व जमिनीचे गंभीर नुकसान का करतात?',
      opts: [
        'रोपे, जमिनीतील उपयुक्त जीव व कुजलेला सेंद्रिय पालापाचोळा जळून जातो; त्यामुळे पावसाचे पाणी मुरण्याऐवजी माती वाहून नेते व झरे आटतात',
        'राखेमुळे पावसाचे पाणी गोड मध होते',
        'वणव्याने उन्हाळ्यात बर्फवृष्टी होते',
        'जळालेले दगड एका रात्रीत सदाहरित होतात',
      ],
      exp: 'वणव्यामुळे मातीचा सेंद्रिय थर व सूक्ष्मजीव नष्ट होतात, परिणामी पाणी मुरण्याची क्षमता घटते व भूजल पातळी खालावते.',
    },
    hi: {
      q: 'गर्मियों में लगने वाली दावानल (जंगल की आग) पहाड़ी झरनों और मिट्टी को कई वर्षों तक क्यों नुकसान पहुँचाती है?',
      opts: [
        'नन्हे पौधे, मिट्टी के जीव और ह्यूमस-स्पंज जल जाते हैं जिससे मानसून में पानी रिसने के बजाय उपजाऊ मिट्टी बहा ले जाता है',
        'राख बारिश के पानी को शहद बना देती है',
        'आग से गर्मियों में बर्फबारी होती है',
        'जली चट्टानें रातोंरात पेड़ बन जाती हैं',
      ],
      exp: 'जंगल की आग से पत्तों की स्पंज-परत व सूक्ष्मजीव नष्ट होने से भूजल रिचार्ज रुकता है और मृदा अपरदन बढ़ता है।',
    },
  },
  {
    topic: 'Transparent vs Translucent vs Opaque Materials & Shadows',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Holding an oil-stained paper sheet, clear window glass, and a wooden slate in bright sunlight, which object casts the DARKEST crisp shadow and why?',
      opts: [
        'The wooden slate—because OPAQUE materials completely block light rays from passing through',
        'Clear window glass—because transparent glass blocks all photons',
        'Oil-stained paper—because translucent paper blocks 100% of sunlight',
        'Shadows form only in total pitch darkness',
      ],
      exp: 'Shadow formation needs three items: a light source, an opaque/translucent blocker, and a screen (`glass lets light pass through cleanly`).',
    },
    mr: {
      q: 'तेल लावलेला कागद, स्वच्छ काच आणि लाकडी पाटी सूर्याच्या प्रकाशात धरली असता सर्वात गडद व स्पष्ट सावली कोणाची पडेल आणि का?',
      opts: [
        'लाकडी पाटीची—कारण "अपारदर्शक (Opaque)" वस्तू प्रकाशकिरणांना पूर्णपणे अडवतात',
        'स्वच्छ काचेची—कारण ती सर्व प्रकाश अडवते',
        'तेलकट कागदाची—कारण तो १००% प्रकाश रोखतो',
        'सावल्या फक्त संपूर्ण अंधारातच पडतात',
      ],
      exp: 'अपारदर्शक वस्तू प्रकाश पूर्ण अडवतात म्हणून गडद सावली तयार होते; पारदर्शक काचेतून प्रकाश आरपार जातो.',
    },
    hi: {
      q: 'तेल लगा कागज़, साफ काँच और लकड़ी की स्लेट को धूप में रखने पर सबसे गहरी और स्पष्ट छाया किसकी बनेगी और क्यों?',
      opts: [
        'लकड़ी की स्लेट की—क्योंकि "अपारदर्शी (Opaque)" वस्तुएँ प्रकाश किरणों को पूरी तरह रोक लेती हैं',
        'साफ काँच की—क्योंकि वह पूरा प्रकाश रोकता है',
        'तेल लगे कागज़ की—क्योंकि वह 100% प्रकाश रोकता है',
        'छाया केवल पूर्ण अँधेरे में बनती है',
      ],
      exp: 'अपारदर्शी वस्तुएँ प्रकाश का मार्ग पूरी तरह अवरुद्ध कर गहरी छाया बनाती हैं, जबकि पारदर्शी काँच प्रकाश को गुजरने देता है।',
    },
  },
  {
    topic: 'Biogas (`Gobar Gas`) Clean Village Renewable Fuel',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Inside an underground village biogas plant, anaerobic bacteria digest cow dung slurry and kitchen/farm waste without oxygen to yield a clean smokeless cooking gas composed mainly of:',
      opts: [
        'Methane (`CH₄`) + left-over nitrogen-rich organic fertilizer slurry',
        'Liquid petrol mixed with carbon monoxide',
        'Pure chlorine gas',
        'Coal tar smoke',
      ],
      exp: 'Biogas yields clean methane cooking fuel (`~55–70% CH₄`), stops indoor smoke lung damage, and leaves rich organic slurry.',
    },
    mr: {
      q: 'गावातील गोबर गॅस (बायोगॅस) संयंत्रात शेण व ओल्या कचऱ्याचे ऑक्सिजनविरहित विघटन होऊन स्वयंपाकासाठी कोणता धूररहित स्वच्छ इंधन वायू तयार होतो?',
      opts: [
        'मिथेन (`CH₄`) वायू आणि सोबत उत्तम सेंद्रिय स्लरी खत मिळते',
        'द्रव पेट्रोल व कार्बन मोनॉक्साईड',
        'शुद्ध क्लोरिन वायू',
        'डांबराचा धूर',
      ],
      exp: 'बायोगॅसमुळे स्वच्छ मिथेन इंधन, गृहिणींना धुरापासून मुक्ती व शेतीसाठी उत्कृष्ट सेंद्रिय खत असे तिहेरी फायदे मिळतात.',
    },
    hi: {
      q: 'गाँव के बायोगैस (गोबर गैस) संयंत्र में गोबर व जैविक कचरे के अवायवीय पाचन से बिना धुएँ वाली कौन-सी प्रमुख स्वच्छ रसोई गैस बनती है?',
      opts: [
        'मीथेन (`CH₄`) गैस और साथ में उत्तम जैविक खाद स्लरी',
        'तरल पेट्रोल व कार्बन मोनोऑक्साइड',
        'शुद्ध क्लोरीन गैस',
        'कोलतार का धुआँ',
      ],
      exp: 'बायोगैस से मुख्यतः मीथेन (`CH₄`) ईंधन प्राप्त होता है जो धुआँ-मुक्त रसोई व उपजाऊ खाद दोनों देता है।',
    },
  },
  {
    topic: 'Bending Pencil in Water Glass – Light Refraction Phenomenon',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'When a straight wooden pencil stands dipped obliquely inside a clear glass tumbler half-filled with water, it looks magically bent or broken at the water surface due to:',
      opts: [
        'Refraction of light—light rays change speed and bend slightly as they cross from water into air on the way to your eyes',
        'Water dissolving half of the wooden pencil cleanly',
        'Total freezing of air bubbles around wood',
        'Gravitational bending of wooden cellulose',
      ],
      exp: 'Light travels slightly slower in denser water than in air, bending rays at the interface (`Refraction`).',
    },
    mr: {
      q: 'अर्धवट पाण्याने भरलेल्या काचेच्या पेल्यात तिरपी ठेवलेली सरळ पेन्सिल पाण्याच्या पृष्ठभागावर वाकडी किंवा तुटल्यासारखी का भासते?',
      opts: [
        'प्रकाशाचे अपवर्तन (Refraction)—पाण्यातून हवेत येताना प्रकाशाच्या किरणांचा वेग व दिशा किंचित बदलते म्हणून',
        'पाण्याने पेन्सिल अर्धी विरघळवली म्हणून',
        'हवेचे बुडबुडे गोठले म्हणून',
        'गुरुत्वाकर्षणामुळे लाकूड वाकते म्हणून',
      ],
      exp: 'एका पारदर्शक माध्यमातून (पाणी) दुसऱ्या माध्यमात (हवा) प्रवेश करताना प्रकाशाच्या दिशेत होणाऱ्या बदलास अपवर्तन म्हणतात.',
    },
    hi: {
      q: 'आधे पानी से भरे काँच के गिलास में तिरछी रखी सीधी पेंसिल जल की सतह पर मुड़ी या टूटी हुई क्यों दिखाई देती है?',
      opts: [
        'प्रकाश का अपवर्तन (Refraction)—पानी से हवा में निकलते समय प्रकाश की गति व दिशा बदल जाती है',
        'पानी आधी लकड़ी घोल देता है',
        'बुलबुले लकड़ी को तोड़ देते हैं',
        'गुरुत्वाकर्षण लकड़ी को मोड़ देता है',
      ],
      exp: 'एक पारदर्शी माध्यम से दूसरे में जाने पर प्रकाश किरणों के मुड़ने को अपवर्तन (Refraction) कहते हैं।',
    },
  },
  {
    topic: 'Dead Sea Salinity Density – Why Everything Floats Effortlessly',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why can a swimmer who doesn’t even know swimming lie back reading a book floating effortlessly atop the salty Dead Sea (`~300 g salt/litre` — highlighted in NCERT Class 5 "Experiments with Water")?',
      opts: [
        'Dissolved heavy salts raise the water’s DENSITY far above the human body’s density, boosting upward buoyant thrust',
        'Cold underwater rocks blow balloons upward',
        'Zero gravity pulls bodies at sea level there',
        'Human bones turn hollow only near salt lakes',
      ],
      exp: 'Salty water (`higher density`) increases buoyant upthrust—easily demonstrated in class with a whole lemon sinking in tap water yet floating after stirring in 4 spoons of salt!',
    },
    mr: {
      q: 'अतिशय खारट असलेल्या "मृत समुद्रातील (Dead Sea)" पाण्यात पोहता न येणारा माणूसही सहज तरंगत का राहतो?',
      opts: [
        'पाण्यात खूप मीठ विरघळल्यामुळे पाण्याची घनता (Density) मानवी शरीरापेक्षा जास्त होते व वर ढकलणारे प्लावक बल वाढते म्हणून',
        'समुद्राखालील खडक हवा फुंकतात म्हणून',
        'तिथे गुरुत्वाकर्षण शून्य असते म्हणून',
        'खाऱ्या पाण्याजवळ हाडे पोकळ होतात म्हणून',
      ],
      exp: 'घनता वाढल्याने प्लावक बल वाढते (साध्या पाण्यात बुडणारे लिंबू मीठ विरघळवल्यावर तरंगते, हा याचाच वर्गप्रयोग आहे).',
    },
    hi: {
      q: 'अत्यंत खारे "मृत सागर (Dead Sea)" में बिना तैरना जानने वाला व्यक्ति भी पानी की सतह पर आराम से क्यों तैरता रहता है?',
      opts: [
        'अधिक घुले नमक से पानी का घनत्व मानव शरीर के घनत्व से बहुत अधिक हो जाता है, जिससे ऊपर की ओर उत्प्लावन बल बढ़ जाता है',
        'समुद्री पत्थर नीचे से हवा फेंकते हैं',
        'वहाँ गुरुत्वाकर्षण शून्य है',
        'हड्डियाँ खोखली हो जाती हैं',
      ],
      exp: 'नमक घुलने से जल का घनत्व बढ़ता है; कक्षा में भी सादे पानी में डूबता नींबू नमक घोलने पर तैरने लगता है।',
    },
  },
  {
    topic: 'Water Cycle Processes Matching – Evaporation, Transpiration, Condensation',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Alongside solar evaporation from oceans and lakes, which vital biological plant process releases vast invisible water vapour through leaf stomata up into the sky?',
      opts: ['Transpiration (Baspotsarjan)', 'Germination', 'Photosynthesis storage only', 'Soil erosion'],
      exp: 'Plants transpire water vapour continually through tiny leaf pores (`stomata`), cooling leaves and feeding monsoon clouds.',
    },
    mr: {
      q: 'समुद्र व तलावांतील बाष्पीभवनासोबतच वनस्पतींच्या पानांवरील पर्णरंध्रांतून हवेत बाष्प सोडणाऱ्या प्रक्रियेला काय म्हणतात?',
      opts: ['बाष्पोत्सर्जन (Transpiration)', 'अंकुरण', 'अन्नसाठा', 'धूप होणे'],
      exp: 'वनस्पती मुळांद्वारे शोषलेले अतिरिक्त पाणी पानांवरील पर्णरंध्रांतून बाष्पाच्या रूपात बाहेर टाकतात (बाष्पोत्सर्जन).',
    },
    hi: {
      q: 'समुद्र व झीलों के वाष्पीकरण के साथ-साथ पौधों की पत्तियों के रंध्रों से जलवाष्प के वायुमंडल में निकलने की प्रक्रिया क्या कहलाती है?',
      opts: ['वाष्पोत्सर्जन (Transpiration)', 'अंकुरण', 'केवल भोजन संग्रह', 'मृदा अपरदन'],
      exp: 'वाष्पोत्सर्जन द्वारा पौधे पत्तियों के रंध्रों से जलवाष्प छोड़ते हैं जो बादल निर्माण में योगदान देती है।',
    },
  },
  {
    topic: 'Turgor & Wilting – Seed Germination Moisture + Air + Warmth',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Soaked moong/chana seeds sprout quickly inside a damp breathable muslin cloth, whereas identical soaked seeds submerged deeply under an airtight layer of oil/water rot instead of sprouting because:',
      opts: [
        'Germinating embryos need oxygen AIR alongside moisture and gentle warmth to respire and grow',
        'Chana seeds require direct noon blazing flames',
        'Muslin cloth adds green chlorophyll genes',
        'Air prevents root radicles from emerging',
      ],
      exp: 'Three universal conditions for germination: Moisture + Oxygen Air + Suitable Warmth (dark/light varies by species).',
    },
    mr: {
      q: 'भिजवलेली मटकी ओलसर सुती कापडात बांधल्यावर छान मोड येतात, पण संपूर्ण पाण्यात किंवा हवाबंद तेलात बुडवून ठेवल्यास ती का सडते?',
      opts: [
        'बीजांकुरणासाठी ओलावा व उबदारपणाबरोबरच श्वसनासाठी "हवा (ऑक्सिजन)" अत्यंत आवश्यक असते म्हणून',
        'कडधान्यांना थेट अग्नीची गरज असते म्हणून',
        'सुती कापड हरितद्रव्य देते म्हणून',
        'हवेमुळे अंकुर थांबतात म्हणून',
      ],
      exp: 'बीज उगवण्यासाठी पाणी, हवा (ऑक्सिजन) आणि योग्य उष्णता या तीनही बाबींची गरज असते.',
    },
    hi: {
      q: 'भीगे हुए चने-मूँग गीले सूती कपड़े में जल्दी अंकुरित होते हैं, पर पूरी तरह पानी/तेल में डूबे रहने पर सड़ क्यों जाते हैं?',
      opts: [
        'अंकुरण के लिए नमी और उचित तापमान के साथ श्वसन हेतु "वायु (ऑक्सीजन)" भी अनिवार्य होती है',
        'चने को आग की आवश्यकता होती है',
        'कपड़ा क्लोरोफिल देता है',
        'हवा जड़ निकलने से रोकती है',
      ],
      exp: 'बीज अंकुरण के तीन आवश्यक कारक हैं: जल (नमी), वायु (ऑक्सीजन) और उपयुक्त ताप।',
    },
  },
  {
    topic: 'Soil Horizons – Topsoil Humus Value vs Subsoil Bedrock',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Taking hundreds of years to form naturally just `1 cm` thick from weathered rock and decayed leaves, which topmost dark layer (`Horizon A`) supports crops and worms best?',
      opts: [
        'Topsoil (rich in dark organic Humus and fine minerals)',
        'Solid unweathered Bedrock (`Horizon R`)',
        'Pure washed marine gravel',
        'Dry concrete crust',
      ],
      exp: 'Humus-rich dark Topsoil holds moisture and nutrients; losing it to monsoon gullying devastates harvests.',
    },
    mr: {
      q: 'खडकांच्या अपक्षयातून १ सेमी जाडीचा थर तयार व्हायला शेकडो वर्षे लागतात; कोणता गडद थर कुजलेल्या सेंद्रिय पदार्थामुळे (ह्युमस) पिकांच्या वाढीसाठी सर्वाधिक सुपीक असतो?',
      opts: [
        'वरचा कसदार थर — पृष्ठमृदा (Topsoil / ह्युमसयुक्त थर)',
        'तळाचा अखंड मूळ खडक (Bedrock)',
        'निव्वळ समुद्री खडी',
        'कोरडे काँक्रीट',
      ],
      exp: 'सर्वांत वरच्या पृष्ठमृदेत ह्युमस व खनिजे भरपूर असल्याने सर्व वनस्पतींची मुळे याच थरात वाढतात.',
    },
    hi: {
      q: 'चट्टानों के अपक्षय से `1 सेमी` परत बनने में सैकड़ों वर्ष लगते हैं; फसलों के लिए ह्यूमस से भरपूर सबसे उपजाऊ ऊपरी परत कौन-सी है?',
      opts: [
        'ऊपरी मृदा (Topsoil / ह्यूमस युक्त स्तर)',
        'अखंड आधार चट्टान (Bedrock)',
        'साफ समुद्री बजरी',
        'सूखा कंक्रीट',
      ],
      exp: 'सबसे ऊपरी मृदा परत में सड़े जैविक पदार्थ (ह्यूमस), सूक्ष्मजीव और नमी होती है जो फसलों को पोषण देती है।',
    },
  },
  {
    topic: 'Solar Cooker Principle – Black Interior + Glass Lid Greenhouse + Reflector',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Inside a box-type Solar Cooker, why is the inner cooking wall painted matte BLACK and covered tightly by a clear glass lid alongside a tilted mirror flap?',
      opts: [
        'Mirror reflects extra sunlight in, matte black absorbs maximum radiant heat, and the glass lid traps warmed infrared heat inside (`greenhouse trap`)',
        'Black paint cools rice down gently below `0°C`',
        'Glass lid reflects 100% of sunshine back away immediately',
        'Black dye turns glass into an electric coil',
      ],
      exp: 'Three physics principles cooperate cleanly inside a solar box cooker: reflection, maximum black-body absorption, and glass heat-trapping.',
    },
    mr: {
      q: 'सौरचूल (Solar Cooker) पेटीचा आतील भाग काळा का रंगवतात आणि वर पारदर्शक काचेचे झाकण व आरसा का लावतात?',
      opts: [
        'आरसा जादा सूर्यप्रकाश आत वळवतो, काळा रंग जास्तीत जास्त उष्णता शोषतो आणि काचेचे झाकण आतील उष्णता बाहेर जाऊ देत नाही (हरितगृह परिणाम)',
        'काळा रंग अन्न ०°C पेक्षा थंड करतो म्हणून',
        'काच सर्व सूर्यप्रकाश परत फेकते म्हणून',
        'काळ्या रंगामुळे विजेची तार तयार होते म्हणून',
      ],
      exp: 'परावर्तन (आरसा), कमाल उष्णता शोषण (काळा रंग) व उष्णता कोंडणे (काच) या तीन तत्त्वांवर सौरचूल कार्य करते.',
    },
    hi: {
      q: 'बॉक्स टाइप सोलर कुकर की भीतरी सतह काली क्यों रंगी जाती है और ऊपर काँच का ढक्कन व तिरछा दर्पण क्यों लगा होता है?',
      opts: [
        'दर्पण अतिरिक्त धूप अंदर भेजता है, काला रंग अधिकतम ऊष्मा सोखता है और काँच का ढक्कन अंदर की गर्मी को बाहर निकलने से रोकता है',
        'काला रंग खाना ठंडा रखता है',
        'काँच सारी धूप वापस लौटा देता है',
        'काला रंग बिजली पैदा करता है',
      ],
      exp: 'सोलर कुकर में परावर्तन, काले रंग द्वारा अधिकतम ऊष्मा-अवशोषण और काँच द्वारा ग्रीनहाउस ऊष्मा-बंधन एक साथ काम करते हैं।',
    },
  },
  {
    topic: 'Litmus & Natural Acid-Base Indicators (Turmeric & Hibiscus)',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'When washing soap (`a mild alkali/base`) touches a yellow turmeric (`Halad`) curry stain on a white school shirt, the yellow spot instantly turns what colour—just like an acid-base indicator?',
      opts: ['Reddish-brown', 'Deep navy blue', 'Invisible transparent white', 'Bright emerald green'],
      exp: 'Turmeric stays bright yellow in acids (`lemon/vinegar`) and turns reddish-brown in alkaline solutions (`soap/baking soda`).',
    },
    mr: {
      q: 'पांढऱ्या शर्टवरील पिवळ्या हळदीच्या डागावर अल्कधर्मी साबण चोळल्यास तो डाग तात्काळ कोणत्या रंगाचा होतो (नैसर्गिक दर्शकाप्रमाणे)?',
      opts: ['तांबूस-तपकिरी / लालसर', 'गडद निळा', 'पूर्ण पारदर्शक पांढरा', 'चमकदार हिरवा'],
      exp: 'हळद हा नैसर्गिक अल्क-दर्शक आहे: आम्लात (लिंबू) ती पिवळीच राहते, तर अल्कलीमध्ये (साबण) लालसर-तपकिरी होते.',
    },
    hi: {
      q: 'सफेद शर्ट पर लगे पीले हल्दी के दाग पर क्षारीय साबुन रगड़ने से वह तुरंत किस रंग का हो जाता है?',
      opts: ['लाल-भूरा (ताँबई)', 'गहरा नीला', 'बिल्कुल पारदर्शी', 'चमकीला हरा'],
      exp: 'हल्दी प्राकृतिक अम्ल-क्षार सूचक है—अम्ल में पीली रहती है तथा साबुन या खाने के सोडे जैसे क्षार में लाल-भूरी हो जाती है।',
    },
  },
  {
    topic: 'Magnetic vs Non-Magnetic Metals Classification',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Testing objects across a science table with a strong bar magnet, which set contains ONLY materials strongly attracted by a magnet?',
      opts: [
        'Iron safety pin, Steel paperclip, Cobalt coin, and Nickel strip',
        'Copper wire, Aluminium foil, and Brass bell',
        'Plastic ruler, Wooden pencil, and Silver bangle',
        'Glass marble, Gold ring, and Rubber eraser',
      ],
      exp: 'Only ferromagnetic metals—principally Iron, Nickel, Cobalt, and Steel—cling to magnets; copper, aluminium, gold, and brass are non-magnetic.',
    },
    mr: {
      q: 'प्रयोगशाळेत पट्टीचुंबकाकडे जोरदारपणे आकर्षित होणाऱ्या केवळ "चुंबकीय पदार्थांचा" अचूक गट कोणता?',
      opts: [
        'लोखंडी सेफ्टीपिन, स्टीलची क्लिप, कोबाल्ट व निकेल',
        'तांब्याची तार, अॅल्युमिनियम फॉईल व पितळेची घंटा',
        'प्लास्टिक पट्टी, पेन्सिल व चांदीची बांगडी',
        'काचेची गोटी, सोन्याची अंगठी व रबर',
      ],
      exp: 'लोखंड, निकेल व कोबाल्ट (आणि त्यांचे पोलाद मिश्रधातू) चुंबकीय असतात; तांबे, अॅल्युमिनियम, सोने व पितळ अचुंबकीय असतात.',
    },
    hi: {
      q: 'छड़ चुंबक द्वारा केवल प्रबल रूप से आकर्षित होने वाले "चुंबकीय पदार्थों" का सही समूह कौन-सा है?',
      opts: [
        'लोहे की सेफ्टी पिन, स्टील क्लिप, कोबाल्ट और निकल',
        'तांबे का तार, एल्यूमीनियम फॉइल और पीतल',
        'प्लास्टिक पैमाना, लकड़ी और चाँदी',
        'काँच, सोना और रबड़',
      ],
      exp: 'लोहा, निकल और कोबाल्ट चुंबकीय धातुएँ हैं; तांबा, एल्यूमीनियम, सोना व पीतल अचुंबकीय हैं।',
    },
  },
  {
    topic: 'Evaporation vs Boiling – Cooling by Sweating & Earthen Matka',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why does drinking water stored in a porous clay earthen pot (`Matka` / `Kund`) become delightfully cool on scorching `42°C` May afternoons without electricity?',
      opts: [
        'Microscopic pores seep tiny droplets onto the outer clay surface; as those droplets EVAPORATE into dry summer air, they draw latent heat away from the water inside',
        'Baked terracotta clay manufactures cold ice crystals internally',
        'Earthen lids block all water molecules permanently',
        'Metal steel pots evaporate water faster through solid walls',
      ],
      exp: 'Evaporative cooling (`same physics that cools sweating skin under a fan!`) takes heat from the pot’s contents.',
    },
    mr: {
      q: 'मे महिन्यातील `४२°C` उन्हाळ्यात विजेविना मातीच्या माठातील पाणी नैसर्गिकरीत्या थंडगार का होते?',
      opts: [
        'माठाच्या सूक्ष्म छिद्रांतून बाहेर झिरपलेल्या पाण्याचे बाष्पीभवन होताना ते आतील पाण्याची उष्णता शोषून घेते म्हणून (बाष्पीभवनामुळे थंडावा)',
        'भाजलेली लाल माती आतून बर्फ तयार करते म्हणून',
        'झाकणामुळे पाणी गोठते म्हणून',
        'स्टीलच्या भांड्यांत छिद्रे अधिक असतात म्हणून',
      ],
      exp: 'द्रवाचे बाष्प होताना सभोवतालची उष्णता शोषली जाते—याच तत्त्वाने माठातील पाणी व अंगावरील घाम थंड होतो.',
    },
    hi: {
      q: 'मई की `42°C` तपती गर्मी में बिना बिजली के भी मिट्टी के घड़े (`मटका`) का पानी ठंडा कैसे रहता है?',
      opts: [
        'घड़े के सूक्ष्म छिद्रों से बाहर रिसा पानी वाष्पित होते समय भीतर के जल से गुप्त ऊष्मा सोख लेता है (वाष्पीकरण से शीतलता)',
        'मिट्टी भीतर बर्फ बनाती है',
        'ढक्कन हवा जमा देता है',
        'स्टील के बर्तन ज़्यादा छिद्रयुक्त होते हैं',
      ],
      exp: 'वाष्पीकरण हमेशा आसपास से ऊष्मा खींचकर शीतलता पैदा करता है—यही सिद्धांत मटके और पसीने के सूखने में काम करता है।',
    },
  },
  {
    topic: 'Microbial Nitrogen Fixation – Rhizobium in Legume Root Nodules',
    pattern: 'Factual',
    difficulty: 'Moderate',
    en: {
      q: 'Why do savvy Maharashtra farmers rotate wheat or cotton fields with pulses (`Tur, Moong, Groundnut, Gram`) carrying tiny pink bead-like root nodules?',
      opts: [
        'Beneficial Rhizobium bacteria living inside legume root nodules convert unusable air nitrogen into soluble soil nitrates naturally',
        'Legume roots convert atmospheric oxygen directly into lime',
        'Roots release synthetic pesticides for mosquitoes',
        'Pulses remove all moisture permanently',
      ],
      exp: 'Symbiotic Rhizobium inside leguminous root nodules replenishes soil fertility biologically without heavy chemical urea.',
    },
    mr: {
      q: 'शेतकरी गहू किंवा कापसाच्या पिकानंतर शेतात तूर, मूग, हरभरा किंवा भुईमूग यांसारख्या शेंगावर्गीय पिकांची फेरपालट का करतात?',
      opts: [
        'शेंगावर्गीय वनस्पतींच्या मुळांवरील गाठींत राहणारे "रायझोबियम" जिवाणू हवेतील नायट्रोजन जमिनीत स्थिर करून जमीन नैसर्गिकरीत्या सुपीक बनवतात म्हणून',
        'त्यांची मुळे ऑक्सिजनचा चुना बनवतात म्हणून',
        'मुळांतून डास मारणारे विष सुटते म्हणून',
        'शेंगांमुळे जमीन कायमची कोरडी राहते म्हणून',
      ],
      exp: 'रायझोबियम जिवाणू व शेंगावर्गीय पिकांच्या सहजीवनातून जमिनीत नैसर्गिक नायट्रोजन साठवला जातो.',
    },
    hi: {
      q: 'किसान गेहूँ या कपास के बाद खेत में अरहर, मूँग, चना या मूँगफली जैसी फलीदार फसलें चक्र में क्यों उगाते हैं?',
      opts: [
        'फलीदार पौधों की जड़-गाँठों में रहने वाले "राइज़ोबियम" जीवाणु वायुमंडलीय नाइट्रोजन को घुलनशील उर्वरक में बदलकर मिट्टी उपजाऊ बनाते हैं',
        'इनकी जड़ें ऑक्सीजन को चूना बनाती हैं',
        'जड़ें मच्छर मारने की दवा छोड़ती हैं',
        'दलहन सारी नमी सोख लेती है',
      ],
      exp: 'फलीदार फसलों व राइज़ोबियम जीवाणुओं का सहजीवन बिना अतिरिक्त रासायनिक यूरिया के मिट्टी में नाइट्रोजन लौटाता है।',
    },
  },
];
