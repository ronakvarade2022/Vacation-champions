import { CuratedTrilingualMcq } from './types';

// MAHA TET Paper 1 (Classes 1-5) — EVS Content Part 5 (40 Distinct Plants, Animals, Conservation, Space, Maps & Fuels Items)
export const MAHA_TET_P1_B1_EVS_C5: CuratedTrilingualMcq[] = [
  {
    topic: 'Insectivorous Pitcher Plant (Nepenthes)',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why does the Meghalaya pitcher plant (Nepenthes khasiana), though green and capable of photosynthesis, trap and digest insects inside its pitcher leaf?',
      opts: [
        'It grows in nitrogen-deficient marshy soils, so digesting insects supplies essential nitrogen',
        'It lacks chlorophyll completely and cannot absorb sunlight',
        'It uses insect wings purely for pollination music',
        'It needs liquid calcium to freeze its roots',
      ],
      exp: 'Pitcher plants perform photosynthesis for sugar energy but capture insects to obtain scarce nitrogen compounds.',
    },
    mr: {
      q: 'मेघालयात आढळणारी घटपर्णी वनस्पती (Nepenthes) हिरवी असून स्वतःचे अन्न बनवू शकत असूनही कीटकांना सापळ्यात पकडून का पचवते?',
      opts: [
        'ती नायट्रोजनची कमतरता असलेल्या जमिनीत वाढत असल्याने नायट्रोजनची गरज भागवण्यासाठी कीटकांचे भक्षण करते',
        'तिच्यात हरितद्रव्य नसते आणि ती सूर्यप्रकाश शोषू शकत नाही',
        'फक्त परागकणांच्या आवाजासाठी कीटक पकडते',
        'मुळांना गोठवण्यासाठी कॅल्शियम मिळवायला',
      ],
      exp: 'घटपर्णी प्रकाशसंश्लेषण करते; मात्र जमिनीतील नायट्रोजनच्या अभावामुळे ती कीटकांतून नायट्रोजन मिळवते.',
    },
    hi: {
      q: 'मेघालय में पाया जाने वाला घटपर्णी (निपेंथीस) पौधा हरा होने तथा प्रकाश-संश्लेषण करने के बावजूद कीड़ों को फँसाकर क्यों खाता है?',
      opts: [
        'यह नाइट्रोजन की कमी वाली दलदली मिट्टी में उगता है, अतः कीड़ों को पचाकर नाइट्रोजन प्राप्त करता है',
        'इसमें पर्णहरित (क्लोरोफिल) बिल्कुल नहीं होता',
        'यह केवल परागण ध्वनि के लिए कीड़े पकड़ता है',
        'जड़ों को ठंडा रखने के लिए',
      ],
      exp: 'घटपर्णी प्रकाश-संश्लेषण से भोजन बनाता है किंतु नाइट्रोजन की पूर्ति के लिए कीटभक्षी होता है।',
    },
  },
  {
    topic: 'Seed Dispersal Agents in Nature',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Match plant seeds correctly with their primary dispersal mechanism: Light winged drumsticks/milkweed seeds, hooked Xanthium (Gokhru/cocklebur) burs, and heavy floating coconuts spread respectively by:',
      opts: [
        'Wind, Animal fur/clothing hooks, and Ocean Water currents',
        'Gravity, Lightning, and Ants',
        'Fire, Bats, and Underground tunnels',
        'Bees, Moss, and Hailstorms',
      ],
      exp: 'Silky tufts/wings ride wind, hooked spines cling to grazing animals, and fibrous waterproof coconut husks float across seas.',
    },
    mr: {
      q: 'शेवग्याच्या पंख असलेल्या बिया, गोखरू/लांडगा (Xanthium) च्या काटेरी बिया आणि नारळ यांचा बीजप्रसार अनुक्रमे कोणत्या घटकांद्वारे होतो?',
      opts: [
        'वारा, प्राण्यांचे केस/कपडे आणि समुद्राचे पाणी',
        'गुरुत्वाकर्षण, वीज आणि मुंग्या',
        'आग, वटवाघूळ आणि भुयारे',
        'मधमाशा, शेवाळ आणि गारा',
      ],
      exp: 'हलक्या पंखांच्या बिया वाऱ्याने, काटेरी बिया प्राण्यांना चिकटून तर नारळ पाण्यावर तरंगून दूरवर पसरतात.',
    },
    hi: {
      q: 'सहिजन के पंखदार बीज, गोखरू के काँटेदार बीज तथा नारियल का प्रकीर्णन क्रमशः किन माध्यमों से होता है?',
      opts: [
        'हवा, पशुओं के रोएँ/कपड़े तथा समुद्री जल धाराएँ',
        'गुरुत्वाकर्षण, बिजली और चींटियाँ',
        'आग, चमगादड़ और सुरंगें',
        'मधुमक्खी, काई और ओले',
      ],
      exp: 'हल्के-पंखदार बीज हवा से, काँटेदार बीज जंतुओं से चिपककर तथा खोखले रेशेदार नारियल जल में तैरकर फैलते हैं।',
    },
  },
  {
    topic: 'Bishnoi Community & Khejri Tree Conservation',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In Rajasthan’s Khejarli village history (Amrita Devi Bishnoi’s sacrifice), why is the native Khejri tree (Prosopis cineraria) revered across arid desert villages?',
      opts: [
        'It thrives with minimal water, enriches soil nitrogen, gives shade, edible pods (Sangri), fodder, and medicinal bark without dying during droughts',
        'It needs daily river flooding to survive',
        'Its roots pump saltwater to the surface',
        'It sheds leaves forever in monsoon only',
      ],
      exp: 'Khejri is the lifeline of Thar desert ecology; Amrita Devi and 363 Bishnois sacrificed lives in 1730 CE protecting Khejri trees.',
    },
    mr: {
      q: 'राजस्थानच्या खेजडली गावातील अमृतादेवी बिश्नोईंच्या बलिदानाशी जोडलेले "खेजडी" (शमी) वृक्ष वाळवंटी गावांत का पूज्य मानले जातात?',
      opts: [
        'ते अत्यंत कमी पाण्यात तग धरतात, सावली-चारा-सांगरी शेंगा देतात व मातीचा कस टिकवतात',
        'त्यांना रोज नदीचे पूरपाणी लागते',
        'त्यांची मुळे खारे पाणी वर आणतात',
        'ते फक्त पावसाळ्यातच जिवंत राहतात',
      ],
      exp: 'खेजडी हा थर वाळवंटाचा कल्पवृक्ष आहे; १७३० मध्ये अमृतादेवी व ३६३ बिश्नोईंनी वृक्ष रक्षणासाठी प्राण दिले.',
    },
    hi: {
      q: 'राजस्थान के खेजड़ली गाँव (अमृता देवी बिश्नोई का बलिदान) में "खेजड़ी" वृक्ष को मरुस्थल का जीवनदाता क्यों माना जाता है?',
      opts: [
        'यह बहुत कम पानी में उगता है, छाया, चारा, सांगरी फली व औषधीय छाल देता है और मिट्टी उपजाऊ रखता है',
        'इसे प्रतिदिन बाढ़ का पानी चाहिए',
        'इसकी जड़ें खारा पानी बाहर निकालती हैं',
        'यह केवल बरसात में उगता है',
      ],
      exp: 'खेजड़ी थार मरुस्थल का कल्पवृक्ष है; सन् १७३० में अमृता देवी व ३६३ बिश्नोईयों ने इसकी रक्षा में प्राण त्याग दिए।',
    },
  },
  {
    topic: 'Chipko Movement Origin & Sunderlal Bahuguna',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'The historic 1973 Chipko Movement—where rural hill women hugged trees to stop commercial logging in Uttarakhand’s Chamoli/Reni forests—was catalyzed by local leader Chandi Prasad Bhatt, Gaura Devi, and:',
      opts: ['Sunderlal Bahuguna', 'Dr. Salim Ali', 'M. S. Swaminathan', 'Verghese Kurien'],
      exp: 'Chipko ("embrace the trees") arose in 1973 in Garhwal Himalayas (Reni/Mandal) led by Chandi Prasad Bhatt, Gaura Devi, and Sunderlal Bahuguna.',
    },
    mr: {
      q: '१९७३ मध्ये उत्तराखंडातील चमोली/रेणी जंगलातील वृक्षतोड रोखण्यासाठी महिलांनी झाडांना मिठी मारली त्या ऐतिहासिक "चिपको आंदोलनाचे" नेतृत्व चंडीप्रसाद भट्ट, गौरादेवी यांच्यासोबत कोणी केले?',
      opts: ['सुंदरलाल बहुगुणा', 'डॉ. सलीम अली', 'एम. एस. स्वामीनाथन', 'वर्गीस कुरियन'],
      exp: 'सुंदरलाल बहुगुणा, चंडीप्रसाद भट्ट व गौरादेवी हे १९७३ च्या चिपको आंदोलनाचे प्रमुख आधारस्तंभ होते.',
    },
    hi: {
      q: '१९७३ में उत्तराखंड के चमोली/रेणी वनों की कटाई रोकने हेतु महिलाओं द्वारा पेड़ों से लिपटने वाले "चिपको आंदोलन" के प्रमुख प्रणेताओं में चंडीप्रसाद भट्ट व गौरा देवी के साथ कौन जुड़े थे?',
      opts: ['सुंदरलाल बहुगुणा', 'डॉ. सलीम अली', 'एम. एस. स्वामीनाथन', 'वर्गीज कुरियन'],
      exp: 'सुंदरलाल बहुगुणा ने चिपको आंदोलन ("जंगल बचाओ") को राष्ट्रीय व वैश्विक पहचान दिलाई।',
    },
  },
  {
    topic: 'Maharashtra & India National Parks Match',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which National Park and flagship protected wildlife species pairing is 100% geographically accurate?',
      opts: [
        'Kaziranga (Assam) — One-Horned Indian Rhinoceros; Gir (Gujarat) — Asiatic Lion; Tadoba-Andhari (Maharashtra) — Bengal Tiger',
        'Kaziranga (Gujarat) — Polar Bear',
        'Gir (Assam) — Asiatic Elephant only',
        'Tadoba (Kerala) — Snow Leopard',
      ],
      exp: 'Kaziranga (Assam) protects the Greater One-Horned Rhino, Gir (Gujarat) is the sole home of Asiatic Lions, and Tadoba (Chandrapur, MH) is Maharashtra’s oldest Tiger Reserve.',
    },
    mr: {
      q: 'खालीलपैकी राष्ट्रीय उद्यान आणि त्यातील प्रमुख संरक्षित प्राण्याची कोणती जोडी पूर्णतः अचूक आहे?',
      opts: [
        'काझीरंगा (आसाम) — एकशिंगी गेंडा; गीर (गुजरात) — आशियाई सिंह; ताडोबा-अंधारी (चंद्रपूर, महाराष्ट्र) — पट्टेरी वाघ',
        'काझीरंगा (गुजरात) — ध्रुवीय अस्वल',
        'गीर (आसाम) — फक्त हत्ती',
        'ताडोबा (केरळ) — हिमबिबट्या',
      ],
      exp: 'आसाममधील काझीरंगा एकशिंगी गेंड्यासाठी, गुजरातमधील गीर आशियाई सिंहासाठी व महाराष्ट्रातील ताडोबा व्याघ्रप्रकल्पासाठी प्रसिद्ध आहे.',
    },
    hi: {
      q: 'निम्नलिखित में से राष्ट्रीय उद्यान और उनके प्रमुख संरक्षित वन्यजीव का कौन-सा युग्म पूर्णतः सही है?',
      opts: [
        'काजीरंगा (असम) — एक सींग वाला गैंडा; गिर (गुजरात) — एशियाई शेर; ताडोबा-अंधारी (महाराष्ट्र) — बाघ',
        'काजीरंगा (गुजरात) — ध्रुवीय भालू',
        'गिर (असम) — केवल हाथी',
        'ताडोबा (केरल) — हिम तेंदुआ',
      ],
      exp: 'काजीरंगा (असम) एक-सींग गैंडे, गिर (गुजरात) एशियाई शेर तथा ताडोबा (महाराष्ट्र) बाघ संरक्षण हेतु विख्यात हैं।',
    },
  },
  {
    topic: 'Jim Corbett National Park Pioneer Status',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Established in 1936 as Hailey National Park in present-day Uttarakhand, which is India’s very first National Park and the launch site of Project Tiger (1973)?',
      opts: ['Jim Corbett National Park', 'Sanjay Gandhi National Park', 'Sundarbans National Park', 'Periyar National Park'],
      exp: 'Jim Corbett National Park (1936) is India’s oldest national park and inaugurated Project Tiger in 1973.',
    },
    mr: {
      q: '१९३६ मध्ये "हेली नॅशनल पार्क" म्हणून स्थापन झालेले भारतातील पहिले राष्ट्रीय उद्यान आणि १९७३ च्या "व्याघ्र प्रकल्पाचे" (Project Tiger) उद्गाते स्थळ कोणते?',
      opts: ['जिम कॉर्बेट राष्ट्रीय उद्यान (उत्तराखंड)', 'संजय गांधी राष्ट्रीय उद्यान', 'सुंदरबन राष्ट्रीय उद्यान', 'पेरियार राष्ट्रीय उद्यान'],
      exp: 'उत्तराखंडमधील जिम कॉर्बेट हे भारतातील सर्वात पहिले राष्ट्रीय उद्यान आहे.',
    },
    hi: {
      q: '१९३६ में "हेली नेशनल पार्क" के रूप में स्थापित भारत का प्रथम राष्ट्रीय उद्यान तथा १९७३ में "प्रोजेक्ट टाइगर" की जन्मस्थली कौन-सा है?',
      opts: ['जिम कॉर्बेट राष्ट्रीय उद्यान (उत्तराखंड)', 'संजय गांधी राष्ट्रीय उद्यान', 'सुंदरवन राष्ट्रीय उद्यान', 'पेरियार राष्ट्रीय उद्यान'],
      exp: 'जिम कॉर्बेट भारत का पहला राष्ट्रीय उद्यान है, जहाँ १ अप्रैल १९७३ को प्रोजेक्ट टाइगर प्रारंभ हुआ।',
    },
  },
  {
    topic: 'Sloth Biology & Behaviour',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which forest mammal resembles a bear, spends roughly 17 hours daily sleeping upside down from tree branches, lives ~40 years, and descends once a week merely for relief?',
      opts: ['Sloth', 'Red Panda', 'Langur', 'Cheetah'],
      exp: 'Sloths are ultra-slow South/Central American arboreal mammals that spend almost their entire ~40-year life hanging upside down in ~8 trees.',
    },
    mr: {
      q: 'अस्वलासारखा दिसणारा, दिवसातील सुमारे १७ तास झाडाच्या फांदीवर उलटा लटकून झोपणारा व ४० वर्षांच्या आयुष्यात फक्त आठ झाडांवरच जीवन घालवणारा प्राणी कोणता?',
      opts: ['स्लॉथ (Sloth)', 'रेड पांडा', 'वानर', 'चित्ता'],
      exp: 'स्लॉथ हा अतिशय संथ चयापचय असलेला प्राणी फांदीवर उलटा लटकून पाने खातो व झोपतो.',
    },
    hi: {
      q: 'भालू जैसा दिखने वाला, दिन में लगभग १७ घंटे पेड़ की डाल से उल्टा लटककर सोने वाला और ४० वर्ष के जीवन में लगभग ८ पेड़ों पर रहने वाला जीव कौन-सा है?',
      opts: ['स्लॉथ (Sloth)', 'लाल पांडा', 'लंगूर', 'चीता'],
      exp: 'स्लॉथ उल्टा लटककर सोता है तथा सप्ताह में एक बार ही शौच के लिए पेड़ से नीचे उतरता है।',
    },
  },
  {
    topic: 'Bird Eyes Position & Neck Turning',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why do most common birds (pigeons, sparrows, hens) constantly nod and swivel their entire heads sharply from side to side while looking around?',
      opts: [
        'Their eyes are fixed in eye sockets and cannot roll independently, so moving the head shifts their field of view',
        'They cannot breathe without shaking their necks',
        'Their ears grow inside their beaks',
        'Moving heads helps them digest pebbles faster',
      ],
      exp: 'Fixed eyeballs force birds to rotate heads for depth perception and scanning; owls have forward binocular eyes, whereas birds like eagles/kites spot prey 4× farther than humans!',
    },
    mr: {
      q: 'कबुतर, चिमणी, कोंबडी असे अनेक पक्षी आजूबाजूला पाहताना सतत आपली मान झटक्याने इकडे-तिकडे का हलवतात?',
      opts: [
        'अनेक पक्ष्यांच्या डोळ्यांच्या बाहुल्या स्थिर असतात (त्या फिरवता येत नाहीत), म्हणून सभोवताल पाहण्यासाठी त्यांना मान व डोके हलवावे लागते',
        'मान न हलवल्यास त्यांना श्वास घेता येत नाही',
        'त्यांचे कान चोचीत असतात',
        'अन्न गिळण्यासाठी मान हलवावी लागते',
      ],
      exp: 'डोळ्यांच्या खोबणीत बुबुळे स्थिर असल्याने पक्षी मान फिरवून दृष्टीचा कोन बदलतात.',
    },
    hi: {
      q: 'अधिकांश पक्षी (कबूतर, गौरैया, मुर्गी) आसपास देखते समय बार-बार अपनी गर्दन क्यों घुमाते या झटकते रहते हैं?',
      opts: [
        'अधिकांश पक्षियों की आँखों की पुतलियाँ स्थिर रहती हैं और घूम नहीं सकतीं, इसलिए देखने के लिए वे पूरी गर्दन घुमाते हैं',
        'बिना गर्दन हिलाए वे साँस नहीं ले सकते',
        'उनके कान चोंच में होते हैं',
        'उड़ान से पहले वजन कम करने हेतु',
      ],
      exp: 'आँखें स्थिर होने के कारण पक्षी विभिन्न दिशाओं में देखने के लिए सिर व गर्दन घुमाते हैं।',
    },
  },
  {
    topic: 'Snakes of India & Farmer Friendship',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Out of dozens of snake species found across India, only FOUR major species are dangerously venomous to humans (Cobra/Nag, Common Krait/Manyar, Russell’s Viper/Ghonas, Saw-scaled Viper/Phoorsa). Why do ecologists call non-venomous snakes friends of farmers?',
      opts: [
        'Snakes consume huge numbers of crop-destroying rats and field mice naturally',
        'Snakes plough deep soil furrows',
        'Snakes secrete nitrogen fertilizer onto wheat',
        'Snakes hear loud musical flute tunes through external ears',
      ],
      exp: 'Snakes lack external ears (they feel ground vibrations!) and serve farms by controlling rodent populations; antivenom is prepared from snake venom itself.',
    },
    mr: {
      q: 'भारतातील सापांपैकी केवळ चार जाती (नाग, मण्यार, घोणस, फुरसे) विषारी असतात. उर्वरित बिनविषारी सापांना "शेतकऱ्यांचा मित्र" का म्हणतात?',
      opts: [
        'साप शेतातील पिकांची नासाडी करणारे उंदीर व घुशी खाऊन त्यांची संख्या नियंत्रित ठेवतात',
        'साप नांगरणी करतात',
        'साप पिकांवर खत फवारतात',
        'साप बासरीचे सूर बाह्य कानांनी ऐकतात म्हणून',
      ],
      exp: 'साप उंदीर खाऊन धान्य रक्षण करतात; तसेच सापांना बाह्य कान नसतात, ते जमिनीतील कंपने ओळखतात.',
    },
    hi: {
      q: 'भारत में मुख्यतः चार प्रकार के साँप (नाग, करैत, दुबोइया, अफाई) ही जहरीले होते हैं। साँपों को "किसानों का मित्र" क्यों कहा जाता है?',
      opts: [
        'वे खेतों में फसल बर्बाद करने वाले चूहों को खाकर फसल की रक्षा करते हैं',
        'वे खेत की जुताई करते हैं',
        'वे मिट्टी में खाद बनाते हैं',
        'वे बाहरी कानों से बीन सुनते हैं',
      ],
      exp: 'साँप चूहों पर नियंत्रण रखकर किसानों की मदद करते हैं; साँप के बाहरी कान नहीं होते, वे कंपन महसूस करते हैं।',
    },
  },
  {
    topic: 'Honeybee Colony Roles & Flowering Season',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Inside a honeybee hive (such as in Bihar’s Muzaffarpur litchi orchards where Anita Khushwaha kept boxes), which statement accurately describes worker bees?',
      opts: [
        'Female worker bees do almost all the hive building, nectar foraging, and baby care, while Queen bees lay eggs (mostly October–December)',
        'Male drone bees collect 90% of honey and guard the hive',
        'Every bee lays eggs simultaneously',
        'Honeybees swarm only during icy January blizzards',
      ],
      exp: 'Most hive labour—building wax combs, collecting nectar, and performing the waggle dance to share flower location—is done by female worker bees.',
    },
    mr: {
      q: 'मधमाशांच्या पोळ्यातील (उदा. मुजफ्फरपूरमधील लिची बागा) कामांच्या विभागणीबाबत खालीलपैकी कोणते विधान बरोबर आहे?',
      opts: [
        'राणीमाशी अंडी घालते, तर बहुतांश पोळे बांधणे, मध गोळा करणे व पिलांची काळजी घेणे ही कामे कामकरी माद्या करतात (ऑक्टोबर–डिसेंबर अंडी घालण्याचा मुख्य काळ)',
        'नर माशा ९०% मध गोळा करतात',
        'प्रत्येक माशी अंडी घालते',
        'मधमाशा फुलांची माहिती शिट्टी वाजवून देतात',
      ],
      exp: 'पोळ्यातील कामकरी माद्या फुलांचा शोध घेतात, विशेष नृत्याद्वारे दिशा कळवतात व मध संकलन करतात.',
    },
    hi: {
      q: 'मधुमक्खी के छत्ते की संरचना व कार्य-विभाजन के बारे में कौन-सा कथन सत्य है?',
      opts: [
        'रानी मक्खी अंडे देती है (मुख्यतः अक्टूबर–दिसंबर), जबकि छत्ता बनाने, रस एकत्र करने व बच्चों को पालने का सारा कार्य श्रमिक मादा मक्खियाँ करती हैं',
        'नर मक्खियाँ ९०% शहद बनाती हैं',
        'प्रत्येक मक्खी अंडे देती है',
        'मक्खियाँ सीटी बजाकर फूलों का पता बताती हैं',
      ],
      exp: 'छत्ते का अधिकांश श्रम श्रमिक मक्खियाँ करती हैं जो विशेष नृत्य द्वारा अन्य मक्खियों को रस की दिशा बताती हैं।',
    },
  },
  {
    topic: 'Mosquito-Borne Diseases & Ronald Ross',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Dr. Ronald Ross won the 1902 Nobel Prize in Medicine for discovering in Secunderabad that Malaria is transmitted through the bite of:',
      opts: [
        'Female Anopheles mosquitoes carrying microscopic Plasmodium parasites',
        'Male houseflies feeding on sugar',
        'Female Aedes mosquitoes spreading night blindness',
        'Earthworms crawling in wet soil',
      ],
      exp: 'Female Anopheles spreads Malaria (treated with Cinchona bark/quinine); Female Aedes spreads Dengue & Chikungunya!',
    },
    mr: {
      q: '१९०२ चे नोबेल पारितोषिक विजेते डॉ. रोनाल्ड रॉस यांनी सिकंदराबाद येथे संशोधन करून सिद्ध केले की "हिवताप / मलेरिया" हा रोग कोणामुळे पसरतो?',
      opts: [
        'प्लाझमोडियम परजीवी वाहून नेणाऱ्या मादी अॅनाफिलीस (Anopheles) डासांच्या चावण्यामुळे',
        'घरमाशीच्या चावण्यामुळे',
        'नर डास गोड फळे खाल्ल्यामुळे',
        'गांडुळाच्या स्पर्शामुळे',
      ],
      exp: 'मादी अॅनाफिलीस डास मलेरिया पसरवतो (सिंकोना वृक्षाच्या सालीपासून क्विनाईन औषध बनवतात), तर एडिस डास डेंग्यू पसरवतो.',
    },
    hi: {
      q: '१९०२ के नोबेल पुरस्कार विजेता डॉ. रोनाल्ड रॉस ने सिकंदराबाद में यह खोज की कि "मलेरिया" रोग किसके काटने से फैलता है?',
      opts: [
        'प्लाज्मोडियम परजीवी की वाहक मादा एनाफिलीस मच्छर',
        'घरेलू मक्खी',
        'नर मच्छर',
        'केंचुआ',
      ],
      exp: 'मादा एनाफिलीस मलेरिया (सिनकोना छाल से दवा) फैलाती है, जबकि एडीज मच्छर डेंगू व चिकनगुनिया फैलाती है।',
    },
  },
  {
    topic: 'Preventing Stagnant Water Mosquito Breeding',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Health workers often spray a thin film of kerosene oil over stagnant drain puddles where mosquito larvae wriggle. How does this thin oil layer stop mosquito breeding?',
      opts: [
        'It cuts off oxygen supply at the water surface so larvae floating up to breathe through air tubes suffocate',
        'It turns water into solid wax',
        'It makes mosquito wings grow twice as fast',
        'It feeds frogs on the bank',
      ],
      exp: 'Mosquito larvae and pupae breathe atmospheric air at the surface; kerosene breaks surface tension and blocks oxygen access.',
    },
    mr: {
      q: 'साचलेल्या डबक्यांवर डासांच्या अळ्या नष्ट करण्यासाठी आरोग्य कर्मचारी रॉकेलचा पातळ थर का पसरवतात?',
      opts: [
        'पाण्यावर तेलाचा तवंग आल्याने श्वसनासाठी पृष्ठभागावर येणाऱ्या डासांच्या अळ्यांचा ऑक्सिजन पुरवठा तुटून त्या मरतात',
        'रॉकेलने पाणी घट्ट मेण बनते',
        'अळ्यांचे पंख लवकर वाढतात',
        'बेडकांना अन्न मिळते',
      ],
      exp: 'पाण्यावर तेलाचा थर पृष्ठताण कमी करून अळ्यांचा हवेशी असलेला संपर्क तोडतो.',
    },
    hi: {
      q: 'रुके हुए गंदे पानी में मच्छरों के लार्वा नष्ट करने के लिए मिट्टी का तेल (केरोसीन) छिड़कने से वे क्यों मर जाते हैं?',
      opts: [
        'पानी की सतह पर तेल की परत ऑक्सीजन की आपूर्ति रोक देती है जिससे साँस लेने सतह पर आने वाले लार्वा दम तोड़ देते हैं',
        'पानी बर्फ बन जाता है',
        'लार्वा के पंख तेजी से बढ़ते हैं',
        'मछलियाँ उड़ जाती हैं',
      ],
      exp: 'तेल जल का पृष्ठ तनाव कम कर ऑक्सीजन का मार्ग अवरुद्ध कर देता है, जिससे मच्छर के लार्वा नष्ट हो जाते हैं।',
    },
  },
  {
    topic: 'Photosynthesis Inputs, Outputs & Chlorophyll',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'During daytime Photosynthesis, green leaves act like natural kitchens converting which simple raw inputs into glucose food and life-giving Oxygen gas?',
      opts: [
        'Carbon dioxide (from air via stomata) + Water (absorbed by roots) + Sunlight trapped by green Chlorophyll',
        'Oxygen gas + Dry sand + Moonlight',
        'Nitrogen gas + Saltwater + Thunder',
        'Coal smoke + Ice + Plastics',
      ],
      exp: 'Plants intake CO2 and H2O using solar energy captured by chlorophyll to produce carbohydrates and release O2.',
    },
    mr: {
      q: 'दिवसा वनस्पतींची हिरवी पाने "प्रकाशसंश्लेषण" प्रक्रियेत कोणत्या घटकांच्या मदतीने अन्न (ग्लुकोज) तयार करतात व ऑक्सिजन वायू बाहेर सोडतात?',
      opts: [
        'हवेतील कार्बन डायऑक्साईड (पर्णरंध्रांद्वारे) + मुळांनी शोषलेले पाणी + हरितद्रव्याने शोषलेला सूर्यप्रकाश',
        'ऑक्सिजन + कोरडी वाळू + चंद्रप्रकाश',
        'नायट्रोजन + खारे पाणी',
        'कोळशाचा धूर + बर्फ',
      ],
      exp: 'हरितद्रव्य व सूर्यप्रकाशाच्या साहाय्याने पाने CO2 व पाण्यापासून अन्न व ऑक्सिजन निर्माण करतात.',
    },
    hi: {
      q: 'दिन में हरे पौधे "प्रकाश-संश्लेषण" प्रक्रिया द्वारा भोजन (ग्लूकोज) व जीवनदायी ऑक्सीजन बनाने के लिए किन कच्चे घटकों का उपयोग करते हैं?',
      opts: [
        'वायु से कार्बन डाइऑक्साइड (रंध्रों द्वारा) + जड़ों से जल + पर्णहरित द्वारा अवशोषित सूर्य का प्रकाश',
        'ऑक्सीजन + सूखी रेत + चाँदनी',
        'नाइट्रोजन + समुद्री नमक',
        'धुआँ + बर्फ',
      ],
      exp: 'पर्णहरित की उपस्थिति में पौधे CO2 और जल से सूर्य के प्रकाश में कार्बोहाइड्रेट बनाते व O2 मुक्त करते हैं।',
    },
  },
  {
    topic: 'Cactus Desert Leaf-to-Spine Adaptation',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In desert plants like Opuntia (Prickly Pear Cactus), true leaves are modified into sharp spines while the stem turns thick, fleshy, and green. Why?',
      opts: [
        'Spines minimize water loss by transpiration and protect against grazers, while the green fleshy stem stores water and performs photosynthesis',
        'Spines absorb rainwater directly from clouds',
        'Cactus needs to freeze desert sand',
        'Stems turn green only to attract desert lions',
      ],
      exp: 'Reducing leaf surface area into spines drastically slashes evaporation while thick waxy stems photosynthesize and retain moisture.',
    },
    mr: {
      q: 'निवडुंगासारख्या (Cactus) वाळवंटी वनस्पतींमध्ये पानांचे रूपांतर काट्यांत व खोडाचे रूपांतर हिरव्या मांसल भागात का झालेले असते?',
      opts: [
        'काट्यांमुळे बाष्पोत्सर्जनाद्वारे होणारा पाण्याचा अपव्यय टळतो व प्राण्यांपासून संरक्षण होते, तर हिरवे मांसल खोड पाणी साठवून प्रकाशसंश्लेषण करते',
        'काटे ढगांतून थेट पाणी शोषतात',
        'वाळू गोठवण्यासाठी',
        'सिंह आकर्षित करण्यासाठी',
      ],
      exp: 'वाळवंटात पाणी वाचवण्यासाठी पाने काट्यांत बदलतात व हिरवे खोड अन्ननिर्मितीचे कार्य करते.',
    },
    hi: {
      q: 'नागफनी (कैक्टस) जैसे मरुस्थलीय पौधों में पत्तियाँ काँटों में तथा तना हरा व गूदेदार क्यों रूपांतरित हो जाता है?',
      opts: [
        'काँटे वाष्पोत्सर्जन से जल-हानि कम कर पशुओं से रक्षा करते हैं, जबकि हरा तना जल संचय व प्रकाश-संश्लेषण करता है',
        'काँटे बादलों से पानी खींचते हैं',
        'रेत जमाने के लिए',
        'शेर बुलाने के लिए',
      ],
      exp: 'मरुस्थलीय अनुकूलन के तहत काँटे जल की हानि रोकते हैं और तना भोजन व जल संरक्षण करता है।',
    },
  },
  {
    topic: 'Aquatic Lotus & Duckweed Floating Adaptations',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why do broad Lotus leaves float comfortably atop pond water without rotting, and why do duck feet stay agile in water?',
      opts: [
        'Lotus leaves have a waxy water-repellent cuticle & hollow air-filled stems, while ducks have webbed toes acting as paddles and oil-coated waterproof feathers',
        'Lotus leaves contain solid iron cores',
        'Ducks grow gills like sharks',
        'Pond water has zero gravity',
      ],
      exp: 'Waxy waterproof surfaces prevent waterlogging on leaves/feathers, air-spaces provide buoyancy, and webbed feet push water effectively.',
    },
    mr: {
      q: 'कमळाची पाने पाण्यावर न सडता कशी तरंगतात आणि बदके पाण्यात सहज का पोहू शकतात?',
      opts: [
        'कमळाच्या पानांवर मेणचट थर व देठात हवेच्या पोकळ्या असतात, तर बदकांचे पाय पडद्यांनी जोडलेले (Webbed) व पिसे तेलकट असतात',
        'कमळाच्या पानांत लोखंड असते',
        'बदकांना माशांसारखे कल्ले असतात',
        'तलावात गुरुत्वाकर्षण नसते',
      ],
      exp: 'मेणचट थर पाणी टिकू देत नाही; हवेच्या पोकळ्या व पडदेदार पाय हे जलीय जीवनाचे अनुकूलन आहे.',
    },
    hi: {
      q: 'कमल की पत्तियाँ पानी पर बिना सड़े कैसे तैरती हैं तथा बत्तख पानी में आसानी से कैसे तैरती है?',
      opts: [
        'कमल की पत्तियों पर मोमी परत व तने में वायु कोष होते हैं, जबकि बत्तख के जालयुक्त पैर (Webbed feet) व तैलीय पंख मदद करते हैं',
        'कमल की पत्तियों में लोहा होता है',
        'बत्तख में गलफड़े होते हैं',
        'तालाब में गुरुत्व नहीं होता',
      ],
      exp: 'मोमी जलरोधी परत, वायु-कोष और जालदार पैर जलीय पर्यावरण के विशिष्ट अनुकूलन हैं।',
    },
  },
  {
    topic: 'Solar System Planets Order & Characteristics',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Arrange the first four rocky inner planets and largest gas giant correctly moving outward from the Sun:',
      opts: [
        'Mercury → Venus (hottest planet) → Earth → Mars (Red planet) → Jupiter (largest planet)',
        'Venus → Mercury → Mars → Earth → Saturn',
        'Mercury → Earth → Venus → Jupiter → Mars',
        'Mars → Earth → Venus → Mercury → Neptune',
      ],
      exp: 'Order from Sun: Mercury, Venus, Earth, Mars (terrestrial), Jupiter, Saturn, Uranus, Neptune (gas/ice giants).',
    },
    mr: {
      q: 'सूर्यापासून अंतराच्या क्रमाने चार अंतर्गत खडकाळ ग्रह आणि सर्वात मोठा ग्रह यांचा योग्य क्रम कोणता?',
      opts: [
        'बुध → शुक्र (सर्वात उष्ण ग्रह) → पृथ्वी → मंगळ (लाल ग्रह) → गुरू (सर्वात मोठा ग्रह)',
        'शुक्र → बुध → मंगळ → पृथ्वी → शनी',
        'बुध → पृथ्वी → शुक्र → गुरू → मंगळ',
        'मंगळ → पृथ्वी → शुक्र → बुध → नेपच्यून',
      ],
      exp: 'सूर्यापासून क्रम: बुध, शुक्र, पृथ्वी, मंगळ, गुरू, शनी, युरेनस, नेपच्यून.',
    },
    hi: {
      q: 'सूर्य से बढ़ती दूरी के अनुसार प्रथम चार आंतरिक ग्रहों तथा सबसे बड़े ग्रह का सही क्रम कौन-सा है?',
      opts: [
        'बुध → शुक्र (सबसे गर्म ग्रह) → पृथ्वी → मंगल (लाल ग्रह) → बृहस्पति (सबसे बड़ा ग्रह)',
        'शुक्र → बुध → मंगल → पृथ्वी → शनि',
        'बुध → पृथ्वी → शुक्र → बृहस्पति → मंगल',
        'मंगल → पृथ्वी → शुक्र → बुध → वरुण',
      ],
      exp: 'सूर्य से क्रमशः बुध, शुक्र, पृथ्वी, मंगल (आंतरिक/पार्थिव ग्रह) और फिर बृहस्पति (सबसे बड़ा) स्थित हैं।',
    },
  },
  {
    topic: 'Earth Rotation vs Revolution Seasons',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What causes Earth’s recurring Day & Night cycle versus its changing Annual Seasons (Summer/Winter)?',
      opts: [
        'Earth’s daily axial Rotation (~24 hrs) causes Day & Night; its 23.5° tilted axial Revolution around the Sun (~365.25 days) causes Seasons',
        'Moonlight causes seasons while ocean tides cause night',
        'Sun revolves around Earth once every month',
        'Rotation causes winter and Revolution causes day/night',
      ],
      exp: 'Axial spin exposes half Earth to sunlight daily; axial tilt during orbital revolution varies solar angle across hemispheres seasonally.',
    },
    mr: {
      q: 'पृथ्वीवर दिवस-रात्र आणि उन्हाळा-हिवाळा हे ऋतू अनुक्रमे कोणत्या गतींमुळे घडतात?',
      opts: [
        'पृथ्वीच्या अक्षाभोवतीच्या परिवलनामुळे (सुमारे २४ तास) दिवस-रात्र, तर २३.५° कललेल्या अक्षासह सूर्याभोवतीच्या परिभ्रमणामुळे (३६५ दिवस) ऋतू होतात',
        'चंद्राच्या प्रकाशामुळे ऋतू होतात',
        'सूर्य पृथ्वीभोवती फिरतो म्हणून',
        'परिवलनामुळे हिवाळा होतो',
      ],
      exp: 'परिवलनामुळे दिवस-रात्र होतात आणि कललेल्या अक्षावरील परिभ्रमणामुळे ऋतुचक्र निर्माण होते.',
    },
    hi: {
      q: 'पृथ्वी पर दिन-रात तथा ऋतु परिवर्तन क्रमशः किस कारण से होते हैं?',
      opts: [
        'अपनी धुरी पर घूर्णन (लगभग २४ घंटे) से दिन-रात तथा २३.५° झुकी धुरी के साथ सूर्य की परिक्रमा (३६५ दिन) से ऋतुएँ बदलती हैं',
        'चाँदनी से ऋतुएँ बनती हैं',
        'सूर्य पृथ्वी की परिक्रमा करता है',
        'घूर्णन से सर्दी होती है',
      ],
      exp: 'दैनिक घूर्णन से दिन-रात और झुकी धुरी पर वार्षिक परिक्रमण से मौसम/ऋतुएँ उत्पन्न होती हैं।',
    },
  },
  {
    topic: 'Lunar Phases & Solar vs Lunar Eclipses',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which celestial alignment happens strictly on a Full Moon (Pournima) versus a New Moon (Amavasya)?',
      opts: [
        'Lunar Eclipse (Earth between Sun & Moon) occurs on Full Moon; Solar Eclipse (Moon between Sun & Earth) occurs on New Moon',
        'Solar Eclipse occurs on Full Moon; Lunar Eclipse on Quarter Moon',
        'Both eclipses occur every single Tuesday',
        'Sun comes directly between Earth and Moon',
      ],
      exp: 'A Lunar Eclipse casts Earth’s shadow onto the Full Moon; a Solar Eclipse casts Moon’s shadow onto Earth during New Moon.',
    },
    mr: {
      q: 'पौर्णिमेला आणि अमावास्येला अनुक्रमे कोणते ग्रहण लागू शकते?',
      opts: [
        'पौर्णिमेला चंद्रग्रहण (सूर्य व चंद्र यांच्या मध्ये पृथ्वी) आणि अमावास्येला सूर्यग्रहण (सूर्य व पृथ्वी यांच्या मध्ये चंद्र)',
        'पौर्णिमेला सूर्यग्रहण असते',
        'दोन्ही ग्रहणे दर आठवड्याला असतात',
        'सूर्य पृथ्वी व चंद्राच्या मध्ये येतो',
      ],
      exp: 'पृथ्वीची सावली चंद्रावर पडल्यास पौर्णिमेस चंद्रग्रहण व चंद्राची सावली पृथ्वीवर पडल्यास अमावास्येस सूर्यग्रहण होते.',
    },
    hi: {
      q: 'पूर्णिमा और अमावस्या के दिन क्रमशः कौन-सा ग्रहण लग सकता है?',
      opts: [
        'पूर्णिमा को चंद्रग्रहण (सूर्य-चंद्र के बीच पृथ्वी) तथा अमावस्या को सूर्यग्रहण (सूर्य-पृथ्वी के बीच चंद्रमा)',
        'पूर्णिमा को सूर्यग्रहण लगता है',
        'दोनों ग्रहण हर सप्ताह होते हैं',
        'सूर्य बीच में आ जाता है',
      ],
      exp: 'चंद्रग्रहण सदैव पूर्णिमा को (पृथ्वी की छाया चंद्रमा पर) और सूर्यग्रहण सदैव अमावस्या को लगता है।',
    },
  },
  {
    topic: 'Indian Festivals Linked to Lunar Calendar',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which famous trio of Indian festivals is traditionally celebrated specifically on a FULL MOON (Pournima) night?',
      opts: [
        'Holi (Phalgun Pournima), Raksha Bandhan (Shravan Pournima), and Guru Nanak Jayanti (Kartik Pournima)',
        'Diwali, Eid-ul-Fitr, and Makar Sankranti',
        'Diwali, Holi, and Republic Day',
        'Christmas, Eid, and Gudi Padwa',
      ],
      exp: 'Holi, Raksha Bandhan, and Guru Nanak Jayanti fall on Full Moon; Diwali falls on Kartik Amavasya, and Eid-ul-Fitr marks the crescent New Moon sighting.',
    },
    mr: {
      q: 'खालीलपैकी भारतीय सणांचा कोणता गट पारंपरिकरीत्या नेहमी "पौर्णिमेला" साजरा केला जातो?',
      opts: [
        'होळी, रक्षाबंधन (नारळी पौर्णिमा) आणि गुरुनानक जयंती (कार्तिक पौर्णिमा)',
        'दिवाळी, ईद व मकर संक्रांत',
        'दिवाळी, होळी व गुढीपाडवा',
        'ख्रिसमस, ईद व दिवाळी',
      ],
      exp: 'होळी, रक्षाबंधन, बुद्ध पौर्णिमा व गुरुनानक जयंती पौर्णिमेस, तर दिवाळी अमावास्येस येते.',
    },
    hi: {
      q: 'निम्नलिखित में से भारतीय त्योहारों का कौन-सा समूह पारंपरिक रूप से सदैव "पूर्णिमा" को मनाया जाता है?',
      opts: [
        'होली, रक्षाबंधन और गुरुनानक जयंती',
        'दीपावली, ईद और मकर संक्रांति',
        'दीपावली, होली और गुड़ी पड़वा',
        'क्रिसमस, ईद और दीपावली',
      ],
      exp: 'होली, रक्षाबंधन व गुरुनानक जयंती पूर्णिमा को; दीपावली अमावस्या को तथा ईद नवचंद्र दिखने पर मनाई जाती है।',
    },
  },
  {
    topic: 'Atmosphere Composition & Nitrogen Role',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Earth’s dry atmosphere comprises approximately 78% Nitrogen, 21% Oxygen, and ~1% Argon, CO2, and other gases. Why is Nitrogen vital despite not being breathed directly?',
      opts: [
        'It dilutes Oxygen preventing runaway fires and feeds plant protein building once fixed by soil bacteria like Rhizobium in legume root nodules',
        'It makes seawater taste salty',
        'It freezes oceans at night',
        'It turns iron into gold',
      ],
      exp: 'Nitrogen moderates combustion and builds amino acids/proteins in plants once nitrogen-fixing microbes convert N2 into soil nitrates.',
    },
    mr: {
      q: 'पृथ्वीच्या वातावरणात सुमारे ७८% नायट्रोजन आणि २१% ऑक्सिजन असतो. श्वसनास थेट वापरला जात नसूनही नायट्रोजन अत्यंत महत्त्वाचा का आहे?',
      opts: [
        'तो ज्वलन नियंत्रणात ठेवतो आणि शेंगावर्गीय वनस्पतींच्या मुळांवरील रायझोबियम जीवाणूंद्वारे स्थिर होऊन प्रथिने बनवण्यास मदत करतो',
        'त्यामुळे समुद्र खारट होतो',
        'रात्री महासागर गोठतात',
        'लोखंडाचे सोने बनते',
      ],
      exp: 'नायट्रोजन हवेतील ज्वलनावर नियंत्रण ठेवतो व रायझोबियमद्वारे जमिनीत स्थिरीकरण होऊन पिकांच्या वाढीस मदत करतो.',
    },
    hi: {
      q: 'पृथ्वी के वायुमंडल में लगभग ७८% नाइट्रोजन और २१% ऑक्सीजन है। सीधे श्वसन में काम न आने पर भी नाइट्रोजन अनिवार्य क्यों है?',
      opts: [
        'यह दहन को नियंत्रित रखती है और दलहनी पौधों की जड़ों में राइजोबियम जीवाणुओं द्वारा स्थिर होकर पौधों में प्रोटीन निर्माण करती है',
        'यह समुद्र को खारा बनाती है',
        'रात में सागर जमाती है',
        'लोहे को सोना बनाती है',
      ],
      exp: 'नाइट्रोजन आग पर नियंत्रण रखती है तथा जैविक स्थिरीकरण से पौधों व संपूर्ण खाद्य शृंखला के प्रोटीन का आधार बनती है।',
    },
  },
  {
    topic: 'Greenhouse Effect & Climate Action',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'While a natural trace of Carbon Dioxide (CO2) keeps Earth warm enough for liquid oceans, excessive burning of coal, petrol, and deforestation causes Global Warming because:',
      opts: [
        'Excess greenhouse gases (CO2, Methane) trap outgoing infrared heat radiation from Earth inside the atmosphere, steadily raising global temperatures',
        'CO2 blocks all oxygen from reaching clouds',
        'Coal ashes reflect 100% of sunlight back into space',
        'Trees produce greenhouse heat at night',
      ],
      exp: 'Greenhouse gases let incoming sunlight pass but absorb outgoing terrestrial thermal heat, causing climate warming and polar ice melt.',
    },
    mr: {
      q: 'कोळसा-पेट्रोलचा अतिवापर व जंगलतोडीमुळे कार्बन डायऑक्साईड वाढून "जागतिक तापमानवाढ" (Global Warming) का होत आहे?',
      opts: [
        'अतिरिक्त हरितगृह वायू (CO2, मिथेन) पृथ्वीवरून बाहेर पडणारी उष्णता वातावरणात अडकवून ठेवतात, त्यामुळे तापमान वाढते',
        'CO2 सर्व ऑक्सिजन नष्ट करतो',
        'राख सूर्यप्रकाश परत पाठवते',
        'झाडे रात्री उष्णता सोडतात',
      ],
      exp: 'हरितगृह वायू सूर्यप्रकाश आत येऊ देतात पण पृथ्वीने उत्सर्जित केलेली उष्णता बाहेर जाऊ देत नसल्याने तापमान वाढते.',
    },
    hi: {
      q: 'जीवाश्म ईंधन के अत्यधिक दहन और वनों की कटाई से "वैश्विक तापन" (Global Warming) क्यों बढ़ रहा है?',
      opts: [
        'अतिरिक्त ग्रीनहाउस गैसें (CO2, मीथेन) पृथ्वी से लौटने वाली ऊष्मा विकिरण को वायुमंडल में रोक लेती हैं, जिससे औसत तापमान बढ़ता है',
        'CO2 सारा ऑक्सीजन सोख लेती है',
        'राख सूर्य की रोशनी लौटाती है',
        'पेड़ गर्मी छोड़ते हैं',
      ],
      exp: 'ग्रीनहाउस प्रभाव में बढ़ी हुई CO2 पृथ्वी से निकलने वाली अवरक्त ऊष्मा को रोककर जलवायु को गर्म करती है।',
    },
  },
  {
    topic: 'Stratospheric Ozone Layer Protection',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'High in the Stratosphere, the Ozone (O3) shield protects all terrestrial life by absorbing harmful:',
      opts: [
        'Solar Ultraviolet (UV) radiation (which otherwise causes skin cancer & cataracts)',
        'Radio broadcast waves',
        'Visible green rainbow rays',
        'Ocean tidal waves',
      ],
      exp: 'Ozone absorbs >97% of dangerous solar UV-B rays; the Montreal Protocol phased out ozone-depleting CFC refrigerants.',
    },
    mr: {
      q: 'वातावरणाच्या स्थितांबर (Stratosphere) थरातील "ओझोन थर" (O3) पृथ्वीवरील सजीवांचे सूर्याच्या कोणत्या घातक किरणांपासून संरक्षण करतो?',
      opts: [
        'अतिनील (Ultraviolet / UV) किरणांपासून (जे त्वचा कर्करोग व मोतीबिंदू घडवू शकतात)',
        'रेडिओ लहरींपासून',
        'हिरव्या रंगांपासून',
        'समुद्राच्या लाटांपासून',
      ],
      exp: 'ओझोन थर सूर्याची घातक अतिनील किरणे शोषून सजीवांचे रक्षण करतो; CFC वायूमुळे ओझोन थराला धोका पोहोचतो.',
    },
    hi: {
      q: 'समताप मंडल (Stratosphere) में स्थित "ओजोन परत" (O3) सूर्य की किन हानिकारक किरणों को सोखकर पृथ्वी के जीवों की रक्षा करती है?',
      opts: [
        'पराबैंगनी (Ultraviolet / UV) किरणें',
        'रेडियो तरंगें',
        'इंद्रधनुष की हरी किरणें',
        'ज्वार-भाटा तरंगें',
      ],
      exp: 'ओजोन परत हानिकारक UV किरणों को रोकती है; CFC (क्लोरोफ्लोरोकार्बन) गैसों को रोकने हेतु मॉन्ट्रियल प्रोटोकॉल अपनाया गया।',
    },
  },
  {
    topic: 'Renewable vs Non-Renewable Fuels',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Identify the clean, inexhaustible RENEWABLE energy cluster compared against exhaustible Fossil Fuels:',
      opts: [
        'Solar, Wind, Tidal, Geothermal, and Biogas energy',
        'Coal, Petrol, Diesel, and Natural Gas',
        'Kerosene, Coal Tar, and Lignite',
        'Paraffin wax, Diesel, and Charcoal',
      ],
      exp: 'Solar, wind, hydro/tidal, and biogas replenish naturally with minimal pollution, whereas coal/petroleum took millions of years to form.',
    },
    mr: {
      q: 'मर्यादित जीवाश्म इंधनांच्या तुलनेत खालीलपैकी कोणता पूर्णतः "अपारंपरिक / नूतनीकरणीय" (Renewable) ऊर्जास्रोत गट आहे?',
      opts: [
        'सौर ऊर्जा, पवन ऊर्जा, भरती-ओहोटी, भूऔष्णिक आणि बायोगॅस (गोबरगॅस)',
        'दगडी कोळसा, पेट्रोल, डिझेल व नैसर्गिक वायू',
        'रॉकेल, डांबर व लिग्नाइट',
        'पॅराफिन मेण व डिझेल',
      ],
      exp: 'सौर, पवन, जल व बायोगॅस हे शाश्वत नूतनीकरणीय स्रोत आहेत; कोळसा-पेट्रोल मर्यादित जीवाश्म इंधने आहेत.',
    },
    hi: {
      q: 'समाप्त होने वाले जीवाश्म ईंधनों की तुलना में कौन-सा समूह पूर्णतः "नवीकरणीय" (Renewable) ऊर्जा स्रोतों का है?',
      opts: [
        'सौर ऊर्जा, पवन ऊर्जा, ज्वारीय ऊर्जा, भूतापीय और बायोगैस',
        'कोयला, पेट्रोल, डीजल और प्राकृतिक गैस',
        'मिट्टी का तेल, कोलतार और लिग्नाइट',
        'मोम, डीजल और लकड़ी का कोयला',
      ],
      exp: 'सौर, पवन और बायोगैस प्रकृति में सतत पुनः प्राप्त होने वाले स्वच्छ ऊर्जा स्रोत हैं।',
    },
  },
  {
    topic: 'Petroleum Refining Byproducts',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In an oil refinery (like Mumbai High crude oil processing), which set consists ENTIRELY of products separated from Petroleum?',
      opts: [
        'Petrol, Diesel, Kerosene, LPG, Lubricating Oil, Paraffin Wax, and Bitumen (asphalt)',
        'Petrol, Solar Silicon, Iron Ore, and Mica',
        'Diesel, Limestone, Copper, and Biogas',
        'Kerosene, Coal, Cotton, and Gypsum',
      ],
      exp: 'Fractional distillation of crude petroleum yields LPG, petrol, kerosene, diesel, engine oil, wax, and road-surfacing bitumen.',
    },
    mr: {
      q: 'खनिज तेलाच्या (Petroleum / उदा. मुंबई हाय) शुद्धीकरणातून मिळणाऱ्या पदार्थांचा अचूक गट कोणता?',
      opts: [
        'पेट्रोल, डिझेल, केरोसीन, LPG, वंगण तेल, पॅराफिन मेण आणि डांबर (बिटुमेन)',
        'पेट्रोल, लोहखनिज, तांबे व अभ्रक',
        'डिझेल, चुनखडी व बायोगॅस',
        'केरोसीन, कापूस व जिप्सम',
      ],
      exp: 'अशुद्ध खनिज तेलाच्या ऊर्ध्वपातनातून पेट्रोल, डिझेल, रॉकेल, LPG, वंगण, मेण व डांबर मिळतात.',
    },
    hi: {
      q: 'कच्चे पेट्रोलियम (जैसे मुंबई हाई) के परिष्करण से प्राप्त उत्पादों का पूर्णतः सही समूह कौन-सा है?',
      opts: [
        'पेट्रोल, डीजल, केरोसीन, LPG, स्नेहक तेल, पैराफिन मोम और बिटुमेन (डामर)',
        'पेट्रोल, लौह अयस्क, ताँबा और अभ्रक',
        'डीजल, चूना पत्थर और बायोगैस',
        'केरोसीन, कपास और जिप्सम',
      ],
      exp: 'पेट्रोलियम के प्रभाजी आसवन से पेट्रोल, डीजल, मिट्टी का तेल, LPG, मोम व सड़क बनाने वाला बिटुमेन मिलता है।',
    },
  },
  {
    topic: 'Reading Maps: Scale, Symbols & Compass',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'If a village-to-town map uses the scale "1 cm = 110 metres" and two schools measure 15 cm apart on paper, what is their real ground distance?',
      opts: ['1.65 km (1,650 metres)', '16.5 km', '125 metres', '110 km'],
      exp: '15 × 110 m = 1,650 metres = 1.65 kilometres.',
    },
    mr: {
      q: 'एका नकाशाचे प्रमाण "१ सेमी = ११० मीटर" असल्यास नकाशावर १५ सेमी अंतरावर असलेल्या दोन शाळांमधील प्रत्यक्ष जमिनीवरील अंतर किती?',
      opts: ['१.६५ किमी (१,६५० मीटर)', '१६.५ किमी', '१२५ मीटर', '११० किमी'],
      exp: '१५ × ११० मीटर = १,६५० मीटर = १.६५ किलोमीटर.',
    },
    hi: {
      q: 'यदि किसी मानचित्र का पैमाना "१ सेमी = ११० मीटर" है और दो विद्यालयों के बीच की दूरी १५ सेमी है, तो वास्तविक दूरी कितनी होगी?',
      opts: ['१.६५ किमी (१,६५० मीटर)', '१६.५ किमी', '१२५ मीटर', '११० किमी'],
      exp: '१५ × ११० मीटर = १,६५० मीटर = १.६५ किलोमीटर।',
    },
  },
  {
    topic: 'Compass Direction Finding After Turns',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Standing at your school gate facing East (rising Sun), you walk straight, turn 90° Right, walk again, and turn 90° Right once more. Which direction do you face now?',
      opts: ['West', 'North', 'South', 'East'],
      exp: 'Facing East → 90° Right faces South → another 90° Right faces West (opposite East).',
    },
    mr: {
      q: 'शाळेच्या फाटकाशी उगवत्या सूर्याकडे (पूर्वेकडे) तोंड करून उभे राहिल्यानंतर तुम्ही ९०° उजवीकडे वळलात व चालून पुन्हा ९०° उजवीकडे वळलात, तर आता तुमचे तोंड कोणत्या दिशेला असेल?',
      opts: ['पश्चिम', 'उत्तर', 'दक्षिण', 'पूर्व'],
      exp: 'पूर्वेकडून उजवीकडे ९०° = दक्षिण; पुन्हा उजवीकडे ९०° = पश्चिम दिशा.',
    },
    hi: {
      q: 'विद्यालय के द्वार पर पूर्व (उगते सूर्य) की ओर मुँह करके खड़े होने के बाद आप ९०° दाएँ मुड़ते हैं और फिर ९०° दाएँ मुड़ते हैं, तो अब आपका मुँह किस दिशा में होगा?',
      opts: ['पश्चिम', 'उत्तर', 'दक्षिण', 'पूर्व'],
      exp: 'पूर्व से पहला दायाँ मोड़ = दक्षिण, दूसरा दायाँ मोड़ = पश्चिम दिशा।',
    },
  },
  {
    topic: 'Relative Map Direction of India States',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'If a teacher travels by train from Bhopal (Madhya Pradesh) to Gangtok (Sikkim) and then to Thiruvananthapuram (Kerala), what are the two main directions relative to Bhopal?',
      opts: [
        'North-East for Gangtok, and South (slightly South-West) for Thiruvananthapuram',
        'North-West for Gangtok, and East for Thiruvananthapuram',
        'South for Gangtok, and North for Thiruvananthapuram',
        'Due West for both cities',
      ],
      exp: 'Sikkim lies North-East of central MP, while Kerala lies South of Bhopal.',
    },
    mr: {
      q: 'नकाशावर मध्य भारतातील भोपाळ (मध्य प्रदेश) येथून गंगटोक (सिक्कीम) आणि नंतर तिरुवनंतपुरम (केरळ) कोणत्या दिशांना आहेत?',
      opts: [
        'गंगटोक ईशान्येस (North-East) आणि तिरुवनंतपुरम दक्षिणेस (किंचित नैऋत्येस)',
        'गंगटोक वायव्येस व केरळ पूर्वेस',
        'गंगटोक दक्षिणेस व केरळ उत्तरेस',
        'दोन्ही शहरे पश्चिमेस',
      ],
      exp: 'भोपाळच्या ईशान्येला सिक्कीम तर दक्षिणेला केरळ राज्य स्थित आहे.',
    },
    hi: {
      q: 'भारत के मानचित्र पर भोपाल (मध्य प्रदेश) के सापेक्ष गंगटोक (सिक्किम) तथा तिरुवनंतपुरम (केरल) की दिशाएँ क्रमशः क्या हैं?',
      opts: [
        'गंगटोक उत्तर-पूर्व (ईशान्य) तथा तिरुवनंतपुरम दक्षिण (किंचित दक्षिण-पश्चिम)',
        'गंगटोक उत्तर-पश्चिम तथा तिरुवनंतपुरम पूर्व',
        'गंगटोक दक्षिण तथा तिरुवनंतपुरम उत्तर',
        'दोनों पश्चिम में',
      ],
      exp: 'मध्य भारत में स्थित भोपाल से सिक्किम उत्तर-पूर्व में तथा केरल दक्षिण दिशा में स्थित है।',
    },
  },
  {
    topic: 'Magnetic Poles Repulsion & Freely Suspended Needle',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'When two bar magnets have their North poles brought close together, they forcefully push apart; yet a single freely suspended bar magnet always aligns horizontally along:',
      opts: [
        'Geographic North–South direction (because Earth itself behaves like a giant weak magnet)',
        'East–West direction only',
        'Vertical up-and-down towards clouds',
        'Random directions changing every second',
      ],
      exp: 'Like poles repel, unlike poles attract; a free magnetic needle settles North–South, forming the principle of a Mariner’s Compass.',
    },
    mr: {
      q: 'दोन चुंबकांचे समान ध्रुव जवळ आणल्यास ते एकमेकांना दूर ढकलतात (प्रतिकर्षण), तर एकटा मोकळा टांगलेला चुंबक नेहमी कोणत्या दिशेस स्थिर होतो?',
      opts: [
        'दक्षिण–उत्तर दिशेस (कारण पृथ्वी स्वतः एका महाकाय चुंबकाप्रमाणे वागते)',
        'केवळ पूर्व–पश्चिम दिशेस',
        'आकाशाकडे उभा',
        'दर सेकंदाला बदलणाऱ्या दिशेस',
      ],
      exp: 'समान ध्रुवांत प्रतिकर्षण असते व मुक्त चुंबक उत्तर–दक्षिण दिशेस स्थिरावतो (होकायंत्राचे तत्त्व).',
    },
    hi: {
      q: 'दो चुंबकों के समान ध्रुव पास लाने पर वे प्रतिकर्षित होते हैं, किंतु स्वतंत्रतापूर्वक लटका एक चुंबक सदैव किस दिशा में ठहरता है?',
      opts: [
        'उत्तर–दक्षिण दिशा में (पृथ्वी के चुंबकीय क्षेत्र के कारण)',
        'केवल पूर्व–पश्चिम दिशा में',
        'ऊर्ध्वाधर आकाश की ओर',
        'हर सेकंड बदलती दिशा में',
      ],
      exp: 'समान ध्रुव प्रतिकर्षित व असमान आकर्षित होते हैं; मुक्त चुंबक सदैव उत्तर–दक्षिण ठहरता है (दिक्सूचक का सिद्धांत)।',
    },
  },
  {
    topic: 'Friction Force: Utility vs Wear',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why do car tyres have grooved treads, kabaddi players rub dry soil on palms, and icy roads require spreading sand?',
      opts: [
        'To INCREASE Friction between surfaces so we gain firm grip and prevent slipping',
        'To reduce friction to zero so wheels spin forever',
        'To increase magnetic pull',
        'To lower Earth’s gravity',
      ],
      exp: 'While friction wears shoe soles out, necessary friction enables walking, gripping, writing with chalk, and safe braking.',
    },
    mr: {
      q: 'वाहनांच्या टायर्सवर खाचा असणे, कबड्डीपटूंनी हाताला माती लावणे आणि बर्फाळ रस्त्यावर वाळू पसरणे हे कशासाठी केले जाते?',
      opts: [
        'पृष्ठभागांमधील "घर्षण बल" (Friction) वाढवून मजबूत पकड मिळवणे आणि घसरणे टाळणे',
        'घर्षण शून्य करण्यासाठी',
        'चुंबकीय शक्ती वाढवण्यासाठी',
        'गुरुत्वाकर्षण कमी करण्यासाठी',
      ],
      exp: 'चालणे, वस्तू पकडणे, लिहिणे व ब्रेक लावणे यासाठी आवश्यक घर्षण बल अत्यावश्यक असते.',
    },
    hi: {
      q: 'वाहनों के टायरों में खाँचे होना, कबड्डी खिलाड़ियों का हाथों में मिट्टी लगाना व बर्फीली सड़क पर रेत डालना किस उद्देश्य से होता है?',
      opts: [
        'सतहों के बीच "घर्षण बल" (Friction) बढ़ाकर मजबूत पकड़ बनाना और फिसलन रोकना',
        'घर्षण शून्य करने के लिए',
        'चुंबकीय बल बढ़ाने के लिए',
        'गुरुत्वाकर्षण घटाने के लिए',
      ],
      exp: 'चलने, पकड़ने, लिखने और ब्रेक लगाने के लिए पर्याप्त घर्षण बल आवश्यक होता है।',
    },
  },
  {
    topic: 'Simple Machines Classification in Daily Life',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Match everyday tools to their classical Simple Machine type: Staircase ramp, Scissors/Seesaw, Well Bucket Wheel, and Bottle-cap Jar threads belong respectively to:',
      opts: [
        'Inclined Plane, Lever, Pulley, and Screw',
        'Screw, Pulley, Wedge, and Lever',
        'Lever, Inclined Plane, Magnet, and Gear',
        'Wedge, Screw, Spring, and Pulley',
      ],
      exp: 'Ramps are inclined planes, scissors are levers, well ropes run over pulleys, and jar lids/bolts use helical screws.',
    },
    mr: {
      q: 'दैनंदिन वापरातील साधने व साध्या यंत्रांचा प्रकार यांची योग्य जोडी कोणती: उताराचा रॅम्प, कात्री/सी-सॉ, विहिरीचे रहाट (कप्पी) आणि बाटलीच्या झाकणाचे आटे?',
      opts: [
        'उतरण (Inclined Plane), तरफ (Lever), कप्पी (Pulley) आणि स्क्रू (Screw)',
        'स्क्रू, कप्पी, पाचर व तरफ',
        'तरफ, उतरण, चुंबक व गिअर',
        'पाचर, स्क्रू, स्प्रिंग व कप्पी',
      ],
      exp: 'उतरण, तरफ, कप्पी, पाचर, चाक-आस आणि स्क्रू ही सहा मुख्य साधी यंत्रे मानवी श्रम सोपे करतात.',
    },
    hi: {
      q: 'दैनिक उपकरणों और सरल मशीनों का सही मिलान क्रम क्या है: ढलवाँ रैंप, कैंची/झूला, कुएँ की घिरनी और बोतल के ढक्कन की चूड़ियाँ?',
      opts: [
        'आनत तल (Inclined Plane), उत्तोलक (Lever), घिरनी (Pulley) और पेंच (Screw)',
        'पेंच, घिरनी, पच्चर और उत्तोलक',
        'उत्तोलक, आनत तल, चुंबक और गियर',
        'पच्चर, पेंच, स्प्रिंग और घिरनी',
      ],
      exp: 'आनत तल, उत्तोलक, घिरनी, पच्चर, पहिया-धुरी और पेंच छह प्रमुख सरल मशीनें हैं।',
    },
  },
  {
    topic: 'Sink vs Float Density Rule',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why does a tiny iron nail sink straight to the bottom of a bucket of water while a huge hollow iron ship floats steadily on the ocean?',
      opts: [
        'The ship encloses a huge volume of air, making its overall average density (mass ÷ volume) LESS than water’s density so displaced water upthrust supports it',
        'Seawater turns iron into plastic',
        'Iron nails weigh more than steel ships',
        'Ocean ships carry helium balloons inside cabins',
      ],
      exp: 'By Archimedes’ Principle, an object floats when its average density (solid shell + enclosed hollow air) is lower than the displaced water.',
    },
    mr: {
      q: 'पाण्याच्या बादलीत लोखंडी लहान खिळा बुडतो पण लोखंडाचे महाकाय जहाज समुद्रावर सहज तरंगते, कारण:',
      opts: [
        'जहाजाची रचना आतून पोकळ असल्याने त्यात भरपूर हवा राहते व जहाजाची एकूण सरासरी घनता पाण्यापेक्षा कमी होते; विस्थापित पाण्याचे प्लावक बल जहाजाला वर धरते',
        'समुद्राचे पाणी लोखंडाचे प्लास्टिक बनवते',
        'लहान खिळ्याचे वजन जहाजापेक्षा जास्त असते',
        'जहाजात हेलियम फुगे असतात',
      ],
      exp: 'आर्किमिडीजच्या तत्त्वानुसार पोकळ जहाज जास्त पाणी बाजूला सारून सरासरी घनता पाण्यापेक्षा कमी ठेवते व तरंगते.',
    },
    hi: {
      q: 'एक छोटी लोहे की कील पानी में डूब जाती है जबकि लोहे का विशाल जहाज समुद्र पर तैरता रहता है, क्यों?',
      opts: [
        'जहाज का ढाँचा भीतर से खोखला होने के कारण उसमें हवा भरी रहती है, जिससे उसका औसत घनत्व पानी से कम हो जाता है और उत्प्लावन बल उसे संभाल लेता है',
        'समुद्र का पानी लोहे को प्लास्टिक बना देता है',
        'कील जहाज से भारी होती है',
        'जहाज में हीलियम गुब्बारे होते हैं',
      ],
      exp: 'खोखले आकार से जहाज अपने भार के बराबर पानी विस्थापित कर देता है तथा उसका औसत घनत्व जल से कम रहता है।',
    },
  },
  {
    topic: 'Separate Salt, Sand & Camphor Mixture',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Which sequence of physical separation techniques cleanly recovers Camphor, Sand, and Common Salt mixed together in one beaker?',
      opts: [
        '1. Gentle Heating/Sublimation (collects camphor vapour) → 2. Dissolve in Water & Filtration (traps sand) → 3. Evaporation of brine (recovers dry salt)',
        '1. Filtering dry sand → 2. Magnetic pickup → 3. Freezing',
        '1. Boiling everything → 2. Handpicking salt crystals',
        '1. Churning with curd → 2. Sieving salt away',
      ],
      exp: 'Camphor sublimes directly solid→vapour, sand stays insoluble on filter paper, and dissolved salt crystallizes upon evaporation.',
    },
    mr: {
      q: 'कापूर, वाळू आणि मीठ यांचे मिश्रण वेगळे करण्यासाठी कोणत्या भौतिक पद्धतींचा अचूक क्रम वापरावा?',
      opts: [
        '१. संप्लवन (उष्णता देऊन कापूर वेगळा करणे) → २. पाण्यात विरघळवून गाळणे (वाळू वेगळी) → ३. बाष्पीभवन (मीठ परत मिळवणे)',
        '१. कोरडे गाळणे → २. चुंबक फिरवणे → ३. गोठवणे',
        '१. सर्व उकळणे → २. मीठ हाताने वेचणे',
        '१. चाळणीने चाळणे → २. घुसळणे',
      ],
      exp: 'कापूर संप्लवनशील असल्याने उष्णतेने सरळ वाफ होतो, वाळू गाळणकागदावर राहते व मीठ बाष्पीभवनाने मिळते.',
    },
    hi: {
      q: 'कपूर, रेत और नमक के मिश्रण को अलग करने के लिए भौतिक पृथक्करण विधियों का सही क्रम क्या होगा?',
      opts: [
        '१. ऊर्ध्वपातन (गर्म कर कपूर पृथक) → २. जल में घोलकर छानना (रेत पृथक) → ३. वाष्पीकरण (नमक प्राप्त)',
        '१. सूखा छानना → २. चुंबक उपयोग → ३. हिमन',
        '१. उबालना → २. हाथ से चुनना',
        '१. चलनी से छानना → २. मथना',
      ],
      exp: 'कपूर ऊर्ध्वपातन से सीधे वाष्प बनकर अलग होता है, रेत छनन से, तथा नमक वाष्पीकरण द्वारा पुनः प्राप्त होता है।',
    },
  },
  {
    topic: 'Physical vs Chemical Reversible Changes',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which set contains ONLY IRREVERSIBLE Chemical Changes producing completely new substances?',
      opts: [
        'Curdling of milk into dahi, rusting of wet iron, baking chapati dough, and burning wood into ash',
        'Melting ice cubes, folding paper boat, dissolving sugar in water',
        'Stretching a rubber band, boiling water to steam, cutting chalk',
        'Freezing juice popsicles, glowing electric bulb filament',
      ],
      exp: 'New substances with altered chemical properties form during fermentation/curdling, rusting, cooking, and combustion.',
    },
    mr: {
      q: 'खालीलपैकी कोणत्या गटात केवळ अपरिवर्तनीय "रासायनिक बदल" (नवीन पदार्थ तयार होणे) आहेत?',
      opts: [
        'दुधाचे दही होणे, ओल्या लोखंडावर गंज चढणे, कणकेची पोळी भाजणे आणि लाकूड जळून राख होणे',
        'बर्फ वितळणे, कागदाची होडी करणे, साखर पाण्यात विरघळणे',
        'रबर ताणणे, पाण्याची वाफ होणे, खडू तोडणे',
        'रस गोठवणे, विजेचा दिवा लागणे',
      ],
      exp: 'दही बनणे, गंजणे, शिजवणे व ज्वलन या क्रियांमध्ये मूळ पदार्थाचे गुणधर्म बदलून नवीन पदार्थ तयार होतो.',
    },
    hi: {
      q: 'निम्नलिखित में से किस समूह में केवल अनुत्क्रमणीय "रासायनिक परिवर्तन" (नए पदार्थ का निर्माण) शामिल हैं?',
      opts: [
        'दूध से दही बनना, लोहे में जंग लगना, आटे से रोटी पकना और लकड़ी का जलकर राख बनना',
        'बर्फ पिघलना, कागज की नाव बनाना, पानी में चीनी घुलना',
        'रबर खींचना, पानी का भाप बनना, चॉक तोड़ना',
        'जूस जमाना, बल्ब जलना',
      ],
      exp: 'किण्वन, जंग लगना, पकाना और दहन रासायनिक परिवर्तन हैं जिनमें नया पदार्थ बनता है।',
    },
  },
  {
    topic: 'Sound Propagation Requires a Medium',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why can two astronauts walking side by side on the Moon NOT hear each other’s unassisted voices unless they speak through radio headsets inside helmets?',
      opts: [
        'The Moon has virtually no atmosphere (vacuum), and Sound mechanical waves require a material medium (solid, liquid, or gas) to travel',
        'Moon’s gravity pulls sound waves straight underground',
        'Lunar dust blocks visible light entirely',
        'Cold moon rocks freeze vocal cords instantly',
      ],
      exp: 'Unlike electromagnetic radio/light waves, sound vibrations cannot propagate through empty vacuum.',
    },
    mr: {
      q: 'चंद्रावर बाजूलाच उभे असलेले दोन अंतराळवीर रेडिओ हेडसेटशिवाय एकमेकांचा आवाज का ऐकू शकत नाहीत?',
      opts: [
        'चंद्रावर हवा (वातावरण / माध्यम) नसून पोकळी आहे आणि ध्वनी तरंगांच्या प्रसारणासाठी घन, द्रव किंवा वायू माध्यमाची गरज असते',
        'चंद्राचे गुरुत्वाकर्षण आवाज खाली खेचते',
        'चंद्राची धूळ प्रकाश अडवते',
        'थंडीमुळे स्वरयंत्र गोठते',
      ],
      exp: 'ध्वनी लहरी निर्वात पोकळीतून प्रवास करू शकत नाहीत; त्यांना प्रसारणासाठी माध्यमाची आवश्यकता असते.',
    },
    hi: {
      q: 'चंद्रमा पर पास-पास खड़े दो अंतरिक्ष यात्री बिना रेडियो उपकरण के एक-दूसरे की सामान्य आवाज क्यों नहीं सुन सकते?',
      opts: [
        'चंद्रमा पर वायुमंडल नहीं है (निर्वात है), और ध्वनि तरंगों के संचरण के लिए ठोस, द्रव या गैस माध्यम आवश्यक होता है',
        'चंद्रमा का गुरुत्व आवाज को नीचे खींच लेता है',
        'धूल प्रकाश को रोक देती है',
        'ठंड से गला जम जाता है',
      ],
      exp: 'प्रकाश व रेडियो तरंगों के विपरीत ध्वनि तरंगें निर्वात (Vacuum) में गमन नहीं कर सकतीं।',
    },
  },
  {
    topic: 'Black Regur Soil & Maharashtra Cash Crops',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Developed from weathered Deccan Basalt lava rocks, Maharashtra’s fertile Black Soil ("Regur") holds moisture deeply and is ideally suited for cultivating:',
      opts: [
        'Cotton, Jowar (Sorghum), Tur, Soybean, and Sugarcane',
        'Tea and Apple orchards exclusively',
        'Saffron and Pineapples only',
        'Mangrove palms in coastal salt',
      ],
      exp: 'Basalt weathering across Vidarbha, Marathwada, and Khandesh produced moisture-retaining Black Regur Cotton Soil.',
    },
    mr: {
      q: 'दख्खनच्या बेसॉल्ट लाव्हारस खडकांच्या अपक्षयातून तयार झालेली महाराष्ट्रातील सुपीक "काळी रेगूर मृदा" ओलावा टिकवून धरते आणि ती प्रामुख्याने कोणत्या पिकांसाठी अत्यंत उपयुक्त असते?',
      opts: [
        'कापूस, ज्वारी, तूर, सोयाबीन आणि ऊस',
        'फक्त चहा व सफरचंदाच्या बागा',
        'फक्त केशर व अननस',
        'खारफुटीची जंगले',
      ],
      exp: 'बेसॉल्ट खडकांपासून बनलेली काळी रेगूर माती विदर्भ-मराठवाडा-खानदेशातील कापूस व ज्वारी उत्पादनाचा कणा आहे.',
    },
    hi: {
      q: 'दक्कन के बेसाल्ट लावा चट्टानों के अपक्षय से बनी महाराष्ट्र की उपजाऊ "काली रेगुर मिट्टी" नमी धारण करने के कारण किन फसलों के लिए सर्वोत्तम है?',
      opts: [
        'कपास, ज्वार, अरहर (तूर), सोयाबीन और गन्ना',
        'केवल चाय व सेब',
        'केवल केसर व अनानास',
        'तटीय मैंग्रोव',
      ],
      exp: 'काली रेगुर मिट्टी को "काली कपास मिट्टी" भी कहा जाता है, जो महाराष्ट्र में कपास, सोयाबीन व ज्वार के लिए प्रसिद्ध है।',
    },
  },
  {
    topic: 'Rabi vs Kharif vs Zaid Cropping Seasons',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which cropping pair accurately matches Indian monsoon-sown (Kharif) versus winter-sown (Rabi) field crops?',
      opts: [
        'Kharif (June–Oct): Rice/Paddy, Soybean, Cotton, Jowar, Bajra; Rabi (Oct–March): Wheat, Gram (Chana), Mustard, Linseed',
        'Kharif: Wheat & Mustard; Rabi: Paddy & Cotton',
        'Kharif: Watermelon only; Rabi: Paddy only',
        'Both Kharif and Rabi are harvested only in mid-May deserts',
      ],
      exp: 'Kharif relies on SW monsoon rains; Rabi grows in cool dry winters (wheat, gram, peas, mustard); Zaid brings summer cucurbits.',
    },
    mr: {
      q: 'भारतातील पावसाळी (खरीप) आणि हिवाळी (रब्बी) हंगामांतील पिकांची अचूक जोडी कोणती?',
      opts: [
        'खरीप (जून–ऑक्टोबर): भात (तांदूळ), सोयाबीन, कापूस, बाजरी; रब्बी (ऑक्टोबर–मार्च): गहू, हरभरा, मोहरी, जवस',
        'खरीप: गहू व मोहरी; रब्बी: भात व कापूस',
        'खरीप: फक्त कलिंगड; रब्बी: फक्त भात',
        'दोन्ही पिके फक्त मे महिन्यात घेतात',
      ],
      exp: 'मान्सूनवर आधारित खरीप पिकांत भात-सोयाबीन-कापूस, तर हिवाळी रब्बी पिकांत गहू-हरभरा-मोहरी येतात.',
    },
    hi: {
      q: 'भारत के मानसूनी (खरीफ) तथा शीतकालीन (रबी) फसल चक्रों का सही मिलान कौन-सा है?',
      opts: [
        'खरीफ (जून–अक्टूबर): धान, सोयाबीन, कपास, बाजरा; रबी (अक्टूबर–मार्च): गेहूँ, चना, सरसों, अलसी',
        'खरीफ: गेहूँ व सरसों; रबी: धान व कपास',
        'खरीफ: केवल तरबूज; रबी: केवल धान',
        'दोनों केवल मई में कटती हैं',
      ],
      exp: 'खरीफ फसलें मानसून वर्षा के साथ बोई जाती हैं, जबकि रबी फसलें शीत ऋतु में बोई जाती हैं।',
    },
  },
  {
    topic: 'Vertebrate Respiratory Organs Diversity',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Match each animal with its primary gas-exchange breathing structure: Fish, Earthworm, Frog on land vs in water, and Cockroach:',
      opts: [
        'Gills (Fish), Moist Skin (Earthworm), Lungs + Moist Skin (Frog), Spiracles & Tracheae (Cockroach)',
        'Lungs (Fish), Gills (Earthworm), Dry Scales (Frog), Wings (Cockroach)',
        'Spiracles (Fish), Tracheae (Earthworm), Fins (Frog)',
        'All four breathe solely through nasal nostrils',
      ],
      exp: 'Aquatic fish extract dissolved O2 via gills; earthworms & submerged frogs breathe through moist skin; insects use spiracles/tracheae.',
    },
    mr: {
      q: 'खालील प्राणी आणि त्यांच्या प्रमुख श्वसन अवयवांची अचूक जोडी कोणती: मासा, गांडूळ, बेडूक आणि झुरळ?',
      opts: [
        'कल्ले (मासा), ओलसर त्वचा (गांडूळ), फुप्फुसे व ओलसर त्वचा (बेडूक), श्वासरंध्रे व श्वासनलिका (झुरळ)',
        'फुप्फुसे (मासा), कल्ले (गांडूळ), कोरडे खवले (बेडूक)',
        'श्वासरंध्रे (मासा), कल्ले (झुरळ)',
        'सर्व चार प्राणी फक्त नाकपुड्यांनी श्वसन करतात',
      ],
      exp: 'मासे कल्ल्यांद्वारे, गांडूळ ओलसर त्वचेद्वारे, बेडूक उभयचर असल्याने त्वचा व फुप्फुसांद्वारे, तर कीटक श्वासरंध्रांनी श्वसन करतात.',
    },
    hi: {
      q: 'निम्नलिखित जीवों और उनके मुख्य श्वसन अंगों का सही क्रम क्या है: मछली, केंचुआ, मेंढक और तिलचट्टा?',
      opts: [
        'गलफड़े (मछली), नम त्वचा (केंचुआ), फेफड़े व नम त्वचा (मेंढक), श्वासरंध्र व श्वास नलिका (तिलचट्टा)',
        'फेफड़े (मछली), गलफड़े (केंचुआ), पंख (तिलचट्टा)',
        'श्वासरंध्र (मछली), गलफड़े (तिलचट्टा)',
        'सभी केवल नाक से साँस लेते हैं',
      ],
      exp: 'मछली गलफड़ों से, केंचुआ नम त्वचा से, उभयचर मेंढक फेफड़ों व त्वचा दोनों से तथा कीट श्वासरंध्रों से श्वसन करते हैं।',
    },
  },
  {
    topic: 'Vertebrates vs Invertebrates & Oviparous/Viviparous',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Notice the common biological pattern linking Whales, Bats, Cows, and Dolphins despite swimming or flying in completely different habitats:',
      opts: [
        'All four are warm-blooded MAMMALS that breathe air with lungs, nourish young with mother’s milk, and mostly give direct live birth',
        'Bats are birds and whales are giant fish laying eggs',
        'Dolphins breathe underwater with gills',
        'All four are cold-blooded amphibians',
      ],
      exp: 'Mammals (including marine whales/dolphins and flying bats!) have mammary glands, hair, lungs, and give birth to live young (barring rare platypus/echidna).',
    },
    mr: {
      q: 'समुद्रात पोहणारे देवमासे व डॉल्फिन, हवेत उडणारे वटवाघूळ आणि जमिनीवरील गाय या सर्वांमध्ये कोणता समान जीवशास्त्रीय गुणधर्म आहे?',
      opts: [
        'हे सर्व उष्णरक्ती "सस्तन प्राणी" (Mammals) असून फुप्फुसांनी श्वसन करतात, पिलांना जन्म देतात व दूध पाजतात',
        'वटवाघूळ हा पक्षी असून देवमासा हा अंडी घालणारा मासा आहे',
        'डॉल्फिन पाण्यात कल्ल्यांनी श्वसन करतो',
        'हे सर्व शीतरक्ती उभयचर आहेत',
      ],
      exp: 'देवमासा, डॉल्फिन व वटवाघूळ हे मासे किंवा पक्षी नसून अस्सल सस्तन प्राणी आहेत.',
    },
    hi: {
      q: 'जल में तैरने वाली व्हेल व डॉल्फिन, उड़ने वाला चमगादड़ और स्थलीय गाय में कौन-सी प्रमुख जैविक समानता है?',
      opts: [
        'ये सभी समतापी "स्तनधारी" (Mammals) हैं जो फेफड़ों से साँस लेते हैं, शिशुओं को जन्म देते हैं व दूध पिलाते हैं',
        'चमगादड़ पक्षी है और व्हेल अंडे देने वाली मछली है',
        'डॉल्फिन गलफड़ों से साँस लेती है',
        'ये सभी उभयचर हैं',
      ],
      exp: 'व्हेल, डॉल्फिन और चमगादड़ क्रमशः मछली व पक्षी नहीं बल्कि स्तनधारी जीव हैं।',
    },
  },
  {
    topic: '3Rs + 2Rs Circular Waste Management & Vermicomposting',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'In municipal segregated waste bins, green-bin kitchen vegetable peels & garden leaves are converted into rich black organic manure within weeks using Redworms ("Eisenia fetida") via:',
      opts: [
        'Vermicomposting (biodegradable composting by earthworms)',
        'Open plastic incineration',
        'Landfill metal smelting',
        'Glass pulverization',
      ],
      exp: 'Redworms digest wet biodegradable vegetable scraps into nutrient-dense vermicompost; plastic, glass, and metal cannot be composted by worms.',
    },
    mr: {
      q: 'ओल्या कचऱ्याच्या हिरव्या डब्यातील भाजीपाल्याची देठे, साली व सुका पालापाचोळा लाल गांडुळांच्या (Redworms) मदतीने काही आठवड्यांत उत्तम सेंद्रिय खतात रूपांतरित करण्याच्या पद्धतीला काय म्हणतात?',
      opts: [
        'गांडूळ खत निर्मिती (Vermicomposting)',
        'प्लास्टिक जाळणे',
        'धातू वितळवणे',
        'काच बारीक करणे',
      ],
      exp: 'ओला जैवविघटनशील कचरा गांडुळांमार्फत समृद्ध सेंद्रिय खतात बदलला जातो; प्लास्टिक व काच मात्र निळी कचरापेटी / पुनर्वापरासाठी असतात.',
    },
    hi: {
      q: 'हरे कूड़ेदान के गीले रसोई कचरे (सब्जी छिलके व पत्ते) को लाल केंचुओं (Redworms) की सहायता से उपजाऊ काली जैविक खाद में बदलने की प्रक्रिया क्या कहलाती है?',
      opts: [
        'वर्मीकंपोस्टिंग (केंचुआ खाद निर्माण)',
        'प्लास्टिक भस्मीकरण',
        'धातु गलाना',
        'काँच पीसना',
      ],
      exp: 'जैविक अपशिष्ट को केंचुओं द्वारा पोषक खाद में बदलना वर्मीकंपोस्टिंग कहलाता है।',
    },
  },
  {
    topic: 'Acid Rain Causes & Monument Corrosion',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why has the gleaming white marble of Agra’s Taj Mahal turned yellowish ("Marble Cancer") due to emissions from nearby refineries and coal units?',
      opts: [
        'Sulphur dioxide (SO2) and Nitrogen oxides (NOx) react with atmospheric moisture forming Acid Rain (Sulphuric & Nitric acids) that corrodes calcium carbonate marble',
        'Carbon monoxide freezes marble surfaces white',
        'Pure oxygen bleaches marble yellow',
        'Yamuna river salt melts stone pillars',
      ],
      exp: 'Industrial SO2 and NO2 dissolve in rainwater droplets producing acid rain that erodes marble, historic statues, soil fertility, and aquatic life.',
    },
    mr: {
      q: 'आग्रा येथील ताजमहालच्या शुभ्र संगमरवरावर पिवळसर डाग ("मार्बल कॅन्सर") पडण्याचे मुख्य रासायनिक कारण कोणते?',
      opts: [
        'हवेतील सल्फर डायऑक्साईड (SO2) व नायट्रोजन ऑक्साईड्स पावसाच्या पाण्याशी संयोग पावून "आम्लवर्षा" (Acid Rain) होते व संगमरवर झिजतो',
        'कार्बन मोनॉक्साईडमुळे दगड गोठतो',
        'शुद्ध ऑक्सिजन दगड पिवळा करतो',
        'यमुनेचे पाणी मीठ सोडते',
      ],
      exp: 'उद्योगांतून निघणारे SO2 व NO2 वायू आम्लपर्जन्य घडवून ऐतिहासिक वास्तू व मातीचे नुकसान करतात.',
    },
    hi: {
      q: 'आगरा के ताजमहल के सफेद संगमरमर के पीले पड़ने ("मार्बल कैंसर") का प्रमुख पर्यावरणीय कारण क्या है?',
      opts: [
        'औद्योगिक धुएँ के सल्फर डाइऑक्साइड (SO2) व नाइट्रोजन ऑक्साइड नमी से क्रिया कर "अम्ल वर्षा" (Acid Rain) बनाते हैं जो संगमरमर का क्षरण करती है',
        'शुद्ध ऑक्सीजन पत्थर पीला करती है',
        'कार्बन मोनोऑक्साइड बर्फ जमाती है',
        'यमुना का पानी नमक छोड़ता है',
      ],
      exp: 'SO2 और NO2 गैसें वर्षा जल में घुलकर सल्फ्यूरिक व नाइट्रिक अम्ल बनाती हैं, जिससे अम्ल वर्षा होती है।',
    },
  },
  {
    topic: 'Airborne vs Waterborne vs Vector-Borne Diseases',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which classification accurately groups purely WATERBORNE human infectious diseases transmitted via contaminated drinking water?',
      opts: [
        'Cholera, Typhoid, Hepatitis A (Jaundice), and Amoebic Dysentery',
        'Tuberculosis, Measles, Chickenpox, and Influenza',
        'Malaria, Dengue, Filaria, and Chikungunya',
        'Scurvy, Goitre, Anaemia, and Rickets',
      ],
      exp: 'Cholera, typhoid, and hepatitis A spread via faecal-contaminated water/food; TB/measles are airborne; malaria/dengue are mosquito-borne; scurvy/goitre are non-communicable nutritional deficiencies.',
    },
    mr: {
      q: 'दूषित पिण्याच्या पाण्याद्वारे पसरणाऱ्या "जलजन्य" (Waterborne) संसर्गजन्य रोगांचा पूर्णतः अचूक गट कोणता?',
      opts: [
        'कॉलरा (पटकी), टायफॉईड (विषमज्वर), कावीळ (Hepatitis A) आणि हगवण',
        'क्षयरोग (TB), गोवर, कांजिण्या व फ्लू',
        'मलेरिया, डेंग्यू, हत्तीरोग व चिकनगुनिया',
        'स्कर्वी, गलगंड, रक्तक्षय व मुडदूस',
      ],
      exp: 'कॉलरा, टायफॉईड व कावीळ हे जलजन्य रोग आहेत; TB/गोवर हवेतून, तर मलेरिया/डेंग्यू डासांमार्फत पसरतात.',
    },
    hi: {
      q: 'दूषित पेयजल से फैलने वाले पूर्णतः "जल-जनित" (Waterborne) संक्रामक रोगों का सही समूह कौन-सा है?',
      opts: [
        'हैजा (कॉलरा), टाइफॉइड, पीलिया (हेपेटाइटिस A) और पेचिश',
        'तपेदिक (TB), खसरा, चेचक और इन्फ्लुएंजा',
        'मलेरिया, डेंगू, फाइलेरिया और चिकनगुनिया',
        'स्कर्वी, घेंघा, एनीमिया और रिकेट्स',
      ],
      exp: 'हैजा, टाइफॉइड व पीलिया जल-जनित हैं; TB वायु-जनित, मलेरिया/डेंगू मच्छर-जनित और स्कर्वी/घेंघा पोषण-अभाव रोग हैं।',
    },
  },
  {
    topic: 'Traditional Regional Shelters of India',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why do rural houses in Assam’s flood-prone Brahmaputra valleys stand raised 10–12 feet above ground on sturdy bamboo pillars ("Stilt Houses"), whereas Leh-Ladakh houses feature thick 2-foot mud-stone walls & wooden floors?',
      opts: [
        'Assam stilt houses avoid heavy monsoon floods & snakes, while Ladakh’s thick stone-mud walls & wooden floors insulate against freezing sub-zero desert cold',
        'Assam houses avoid snowfall while Ladakh has monsoon floods',
        'Stilt houses rotate towards wind like fans',
        'Ladakh uses mud only because bamboo grows everywhere there',
      ],
      exp: 'Vernacular architecture adapts brilliantly to climate: stilts lift homes above water/dampness in Assam; thick thermal mass retains warmth in cold desert Ladakh (ground floor for livestock, top floor for living, flat roof for drying).',
    },
    mr: {
      q: 'आसाममधील घरे मजबूत बांबूंच्या खांबांवर १०–१२ फूट उंचावर (Stilt Houses) बांधली जातात, तर लडाखमधील घरे दगड-मातीच्या जाड भिंती व लाकडी फरशीची का असतात?',
      opts: [
        'आसाममध्ये अतिवृष्टी व पुराच्या पाण्यापासून वाचण्यासाठी उंच घरे, तर थंड वाळवंटी लडाखमध्ये कडाक्याच्या थंडीपासून उबदार निरोधनासाठी जाड दगड-मातीची घरे बांधतात',
        'आसाममध्ये बर्फवृष्टी असते म्हणून',
        'उंच घरे वाऱ्याने फिरतात',
        'लडाखमध्ये बांबूची जंगले आहेत म्हणून',
      ],
      exp: 'प्रादेशिक घरबांधणी ही स्थानिक हवामान, पूर-पाऊस आणि उपलब्ध नैसर्गिक साहित्याशी सुसंगत असते.',
    },
    hi: {
      q: 'असम के ग्रामीण घर जमीन से १०–१२ फीट ऊपर बाँस के मजबूत खंभों पर क्यों बनाए जाते हैं, जबकि लेह-लद्दाख के घर मोटी पत्थर-मिट्टी की दीवारों व लकड़ी के फर्श वाले होते हैं?',
      opts: [
        'असम में भारी वर्षा व बाढ़ से बचाव हेतु ऊँचे खंभे, तथा ठंडे मरुस्थल लद्दाख में जमा देने वाली सर्दी से ऊष्मा-रोधन हेतु मोटी दीवारें व लकड़ी का प्रयोग होता है',
        'असम में बर्फबारी होती है',
        'ऊँचे घर हवा में घूमते हैं',
        'लद्दाख में बाँस बहुतायत में मिलता है',
      ],
      exp: 'पारंपरिक आवास निर्माण स्थानीय जलवायु, वर्षा, तापमान और उपलब्ध संसाधनों के वैज्ञानिक अनुकूलन को दर्शाता है।',
    },
  },
];
