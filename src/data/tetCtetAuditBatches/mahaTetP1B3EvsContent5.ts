import { CuratedTrilingualMcq } from './types';

// Batch 3 Primary EVS Content Part 5 (28 verified trilingual MCQs: Human Body, Nutrition, Senses, Diseases & First Aid)
export const MAHA_TET_P1_B3_EVS_C5: CuratedTrilingualMcq[] = [
  {
    topic: 'Saliva Amylase Starting Digestion Inside the Mouth',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why does plain unsweetened jowar bhakri or boiled rice start tasting mildly SWEET after chewing thoroughly for 30–40 seconds inside the mouth?',
      opts: [
        'Salivary amylase enzyme in saliva breaks complex starch down into simpler sweet-tasting sugars',
        'Taste buds on the tongue dissolve tooth enamel into honey',
        'Chewing melts dietary fats directly into sucrose',
        'Warm air breathed inward turns salt into sugar',
      ],
      exp: 'Mechanical chewing + salivary amylase (ptyalin) initiate carbohydrate digestion right inside the oral cavity.',
    },
    mr: {
      q: 'मीठ-साखर नसलेली साधी ज्वारीची भाकरी किंवा भात तोंडात ३०–४० सेकंद नीट चावल्यावर ती किंचित गोडसर का लागू लागते?',
      opts: [
        'लाळेतील अमायलेज (टायलिन) नावाचे विकर पिष्टमय पदार्थांचे रूपांतर साध्या गोड शर्करेत करू लागते म्हणून',
        'जिभेवरील चवकलिका दातांचे तुकडे वितळवतात म्हणून',
        'चावल्याने स्निग्ध पदार्थांची साखर होते म्हणून',
        'तोंडातील हवा मिठाचे रूपांतर साखरेत करते म्हणून',
      ],
      exp: 'पचनाची सुरुवात तोंडातच होते; लाळेतील विकर गुंतागुंतीच्या पिष्टमय पदार्थांना साध्या शर्करेत मोडते.',
    },
    hi: {
      q: 'बिना चीनी वाली सादी ज्वार की रोटी या उबले चावल को मुँह में 30–40 सेकंड चबाने पर वह हल्का मीठा क्यों लगने लगता है?',
      opts: [
        'लार में उपस्थित एमाइलेज़ एंजाइम जटिल स्टार्च (मंड) को सरल मीठी शर्करा में तोड़ना शुरू कर देता है',
        'जीभ की स्वाद कलिकाएँ दाँतों को घोलती हैं',
        'चबाने से वसा चीनी बन जाती है',
        'गर्म हवा नमक को शक्कर में बदलती है',
      ],
      exp: 'पाचन मुँह से ही प्रारंभ हो जाता है—लार का एमाइलेज़ एंजाइम स्टार्च को माल्टोज़ जैसी सरल शर्करा में बदलता है।',
    },
  },
  {
    topic: 'Human Tooth Types – Incisors, Canines, Premolars & Molars',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'In human dentition (`32` adult permanent teeth following `20` milk teeth), which pointed teeth right beside the flat front incisors are specialized specifically for TEARING tough fibres?',
      opts: [
        'Canines (`4` total — 2 upper, 2 lower)',
        'Molars (`12` total)',
        'Premolars (`8` total)',
        'Flat front incisors (`8` total)',
      ],
      exp: 'Incisors cut/bite, pointed Canines tear, and broad Premolars + Molars crush and grind food cleanly.',
    },
    mr: {
      q: 'मानवी जबड्यात (`२०` दुधाच्या दातांनंतर `३२` कायमचे दात) पुढच्या पटाशीच्या दातांच्या शेजारी असणारे कोणते टोकदार दात अन्न फाडण्याचे काम करतात?',
      opts: [
        'सुळे / रदनक (Canines — एकूण ४)',
        'उपदाढा (Premolars)',
        'दाढा (Molars)',
        'पटाशीचे दात (Incisors)',
      ],
      exp: 'पटाशीचे दात कापण्यासाठी, सुळे (Canines) फाडण्यासाठी आणि उपदाढा-दाढा अन्न चावून बारीक दळण्यासाठी असतात.',
    },
    hi: {
      q: 'मानव दंत-विन्यास (`20` दूध के दाँतों के बाद `32` स्थायी दाँत) में आगे के कृंतकों के ठीक बगल में भोजन फाड़ने वाले नुकीले दाँत कौन-से हैं?',
      opts: [
        'रदनक / श्वदंत (Canines — कुल 4)',
        'चर्वणक (Molars)',
        'अग्रचर्वणक (Premolars)',
        'कृंतक (Incisors)',
      ],
      exp: 'कृंतक काटते हैं, नुकीले रदनक फाड़ते हैं, तथा चौड़े अग्रचर्वणक व चर्वणक भोजन को पीसते हैं।',
    },
  },
  {
    topic: 'Human Joints – Ball-and-Socket vs Hinge vs Pivot',
    pattern: 'Factual',
    difficulty: 'Moderate',
    en: {
      q: 'Why can your arm swing freely in a full circle at the shoulder while your knee bends cleanly back-and-forth along only ONE plane like a door?',
      opts: [
        'Shoulder uses a Ball-and-Socket joint (360° mobility), whereas the knee has a Hinge joint permitting single-plane flexion',
        'Knee bones lack cartilage completely',
        'Shoulder contains zero muscles',
        'Hinge joints rotate 360° sideways easily',
      ],
      exp: 'Ball-and-socket (shoulder/hip) allows multi-axis rotation; Hinge (knee/elbow) opens one plane; Pivot (neck/atlas) turns side-to-side.',
    },
    mr: {
      q: 'आपला खांद्याचा हात सर्व दिशांना गोलाकार फिरू शकतो, पण गुडघा मात्र दरवाजाच्या बिजागरीप्रमाणे एकाच बाजूला का वाकतो?',
      opts: [
        'खांद्यामध्ये "उखळीचा सांधा" (Ball-and-Socket) असतो, तर गुडघ्यात एकाच दिशेने हालचाल करणारा "बिजागरीचा सांधा" (Hinge joint) असतो',
        'गुडघ्यात हाडेच नसतात',
        'खांद्यात स्नायू नसतात',
        'बिजागरीचा सांधा ३६०° फिरतो',
      ],
      exp: 'उखळीचा सांधा (खांदा-कंबर) सर्व दिशांत, तर बिजागरीचा सांधा (कोपर-गुडघा) एकाच पातळीत हालचाल करू देतो.',
    },
    hi: {
      q: 'हमारी बाँह कंधे पर चारों ओर घूम सकती है, पर घुटना दरवाज़े के कब्जे की तरह केवल एक ही दिशा में क्यों मुड़ता है?',
      opts: [
        'कंधे में "कंदुक-खल्लिका संधि" (Ball-and-Socket) होती है, जबकि घुटने में केवल एक तल में मुड़ने वाली "हिंज/कब्जा संधि" होती है',
        'घुटने की हड्डियों में उपास्थि नहीं होती',
        'कंधे में मांसपेशियाँ नहीं होतीं',
        'कब्जा संधि 360° घूमती है',
      ],
      exp: 'कंदुक-खल्लिका संधि (कंधा/कूल्हा) पूर्ण घूर्णन देती है जबकि कब्जा संधि (घुटना/कोहनी) केवल एक दिशा में मुड़ती है।',
    },
  },
  {
    topic: 'Blood Cells & Their Functions – RBC, WBC, Platelets',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Which component of human blood acts immediately at a scraped knee cut to clot blood and seal the wound against continuous bleeding?',
      opts: [
        'Platelets (Thrombocytes)',
        'Red Blood Cells (carrying haemoglobin oxygen)',
        'Sweat glands',
        'Salivary droplets',
      ],
      exp: 'Platelets trigger fibrin clotting to plug cuts; RBCs carry O₂ via iron-rich haemoglobin; WBCs fight pathogens.',
    },
    mr: {
      q: 'खेळताना गुडघ्याला जखम होऊन रक्त वाहू लागल्यास रक्ताची गुठळी करून रक्तस्त्राव थांबवण्याचे महत्त्वाचे काम रक्तातील कोणता घटक करतो?',
      opts: [
        'रक्तबिंबिका (Platelets)',
        'तांबड्या रक्तपेशी (हिमोग्लोबिनद्वारे ऑक्सिजन वाहक)',
        'घाम ग्रंथी',
        'लाळ ग्रंथी',
      ],
      exp: 'तांबड्या पेशी ऑक्सिजन वाहतात, पांढऱ्या पेशी जंतूंशी लढतात, तर रक्तबिंबिका (Platelets) जखमेवर रक्ताची गुठळी तयार करतात.',
    },
    hi: {
      q: 'चोट लगने पर बहते रक्त का थक्का जमाकर रक्तस्राव रोकने का तुरंत कार्य रक्त का कौन-सा घटक करता है?',
      opts: [
        'प्लेटलेट्स (बिंबाणु)',
        'लाल रक्त कणिकाएँ (ऑक्सीजन वाहक)',
        'स्वेद ग्रंथियाँ',
        'लार कण',
      ],
      exp: 'प्लेटलेट्स थक्का जमाकर घाव बंद करती हैं, RBC ऑक्सीजन ले जाती हैं और WBC संक्रमण से लड़ती हैं।',
    },
  },
  {
    topic: 'Deficiency Diseases Matching – Scurvy, Rickets, Goitre, Anaemia',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Which vitamin/mineral deficiency pair correctly matches `Bleeding & swollen gums (Scurvy)` and `Swollen neck thyroid gland (Goitre)`?',
      opts: [
        'Vitamin C (Ascorbic acid) and Iodine',
        'Vitamin A and Calcium',
        'Vitamin D and Iron',
        'Vitamin B1 and Phosphorus',
      ],
      exp: 'Amla/citrus Vitamin C prevents Scurvy; iodized salt prevents Goitre; Vitamin D/sunlight prevents Rickets; Vitamin A prevents night blindness.',
    },
    mr: {
      q: '`हिरड्यांमधून रक्त येणे (स्कर्व्ही)` आणि `गळ्याजवळील अवटू ग्रंथीला सूज येणे (गलगंड / Goitre)` हे विकार अनुक्रमे कशाच्या अभावामुळे होतात?',
      opts: [
        'जीवनसत्त्व क (Vitamin C) आणि आयोडीन',
        'जीवनसत्त्व अ आणि कॅल्शियम',
        'जीवनसत्त्व ड आणि लोह',
        'जीवनसत्त्व ब१ आणि फॉस्फरस',
      ],
      exp: 'आवळा-लिंबू वर्गीय जीवनसत्त्व क अभावी स्कर्व्ही, तर आयोडीन अभावी गलगंड (Goitre) होतो.',
    },
    hi: {
      q: '`मसूड़ों से खून आना (स्कर्वी)` और `गले की थायरॉयड ग्रंथि में सूजन (घेंघा / Goitre)` क्रमशः किन पोषक तत्वों की कमी से होते हैं?',
      opts: [
        'विटामिन C और आयोडीन',
        'विटामिन A और कैल्शियम',
        'विटामिन D और आयरन',
        'विटामिन B1 और फॉस्फोरस',
      ],
      exp: 'विटामिन C की कमी से स्कर्वी और आयोडीन की कमी से घेंघा (गॉयटर) रोग होता है।',
    },
  },
  {
    topic: 'Ronald Ross – Malaria Mosquito Discovery (Secunderabad 1897)',
    pattern: 'Factual',
    difficulty: 'Moderate',
    en: {
      q: 'Working tirelessly with microscopes in Secunderabad (`1897`, Nobel Prize `1902`), Dr. Ronald Ross proved that deadly malaria parasites (`Plasmodium`) are transmitted by:',
      opts: [
        'Female Anopheles mosquitoes breeding in stagnant water',
        'Polluted dry mountain dust',
        'Aedes mosquitoes during bright mid-day only (which spread Dengue)',
        'Houseflies carrying table salt',
      ],
      exp: 'Ronald Ross spotted brownish malaria cysts inside female Anopheles mosquitoes’ stomachs; female Aedes aegypti carries Dengue/Chikungunya.',
    },
    mr: {
      q: '१८९७ मध्ये सिकंदराबाद येथे सूक्ष्मदर्शकाखाली संशोधन करून डॉ. रोनाल्ड रॉस यांनी मलेरियाचा (हिवतापाचा) प्रसार कशामार्फत होतो हे सिद्ध केले?',
      opts: [
        'साचलेल्या पाण्यात वाढणाऱ्या मादी अ‍ॅनोफिलिस डासामार्फत',
        'कोरड्या डोंगराळ धुळीमार्फत',
        'दिवसा चावणाऱ्या एडिस डासामार्फत (ज्यामुळे डेंग्यू होतो)',
        'घरमाशांच्या पायावरील मिठामुळे',
      ],
      exp: 'मादी अ‍ॅनोफिलिस डासाच्या पोटात प्लाझमोडियम परजीवी शोधून रोनाल्ड रॉस यांनी मलेरियाच्या प्रसाराचे कोडे सोडवले.',
    },
    hi: {
      q: '1897 में सिकंदराबाद में सूक्ष्मदर्शी से शोध कर डॉ. रोनाल्ड रॉस ने (नोबेल 1902) सिद्ध किया कि मलेरिया परजीवी का वाहक कौन है?',
      opts: [
        'ठहरे पानी में पनपने वाली मादा एनोफिलीज़ मच्छर',
        'सूखी पहाड़ी धूल',
        'केवल दिन में काटने वाला एडीज़ मच्छर (जो डेंगू फैलाता है)',
        'घरेलू मक्खी द्वारा नमक से',
      ],
      exp: 'रोनाल्ड रॉस ने मादा एनोफिलीज़ मच्छर के आमाशय में मलेरिया परजीवी खोजकर रोग संचरण सिद्ध किया।',
    },
  },
  {
    topic: 'Dengue Prevention – Aedes Mosquito Breeds in Clean Stagnant Water',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Unlike drainage-dwelling mosquitoes, tiger-striped Aedes aegypti mosquitoes (vectors of Dengue & Chikungunya) bite primarily during DAYLIGHT and lay eggs in:',
      opts: [
        'Even small pockets of clean stagnant water—desert coolers, flowerpots, discarded tyres, and uncovered overhead tanks',
        'Dry wooden bookshelves inside locked cupboards',
        'Rapid ocean surf waves',
        'Boiling kitchen pressure cookers',
      ],
      exp: 'Weekly "Dry Day" emptying and scrubbing coolers, plant saucers, and spare tyres breaks the Aedes life cycle.',
    },
    mr: {
      q: 'डेंग्यू व चिकुनगुनिया पसरवणारे पट्टेरी एडिस इजिप्ती डास प्रामुख्याने दिवसा चावतात आणि त्यांची अंडी कोठे घालतात?',
      opts: [
        'कुलरमधील, कुंडीच्या ताटलीतील, जुन्या टायरमधील आणि उघड्या टाक्यांमधील स्वच्छ साठलेल्या पाण्यात',
        'बंद कपाटातील कोरड्या पुस्तकांवर',
        'समुद्राच्या खवळलेल्या लाटांत',
        'उकळत्या प्रेशर कुकरमध्ये',
      ],
      exp: 'आठवड्यातून एकदा "कोरडा दिवस" पाळून कुलर, टायर्स व कुंड्या रिकाम्या केल्यास डेंग्यूच्या डासांची पैदास थांबते.',
    },
    hi: {
      q: 'डेंगू व चिकनगुनिया फैलाने वाले धारीदार एडीज़ एजिप्टी मच्छर मुख्यतः दिन में काटते हैं और कहाँ अंडे देते हैं?',
      opts: [
        'कूलर, गमले की तश्तरी, पुराने टायर और खुली टंकियों में जमा साफ ठहरे पानी में',
        'बंद अलमारी की सूखी किताबों पर',
        'तेज़ समुद्री लहरों में',
        'उबलते कुकर में',
      ],
      exp: 'सप्ताह में एक बार कूलर, गमले व टायर खाली कर सुखाने से डेंगू वाहक एडीज़ मच्छरों का प्रजनन चक्र टूट जाता है।',
    },
  },
  {
    topic: 'Nutritious Indian Millets (Shri Anna – Jowar, Bajra, Nachni/Ragi)',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'In Maharashtra’s traditional diets, nutrient-dense small-seeded dryland grains known as Millets (`Bhakri grains` like Nachni/Ragi, Bajra, and Jowar) are especially celebrated for providing:',
      opts: [
        'High calcium (especially Ragi/Nachni), iron, dietary fibre, and drought-resilient slow energy release',
        'Zero dietary fibre and zero minerals',
        'Solely artificial food colouring',
        'Excess refined sucrose syrup',
      ],
      exp: 'Nachni/Ragi is extraordinarily rich in bone-building calcium; Bajra supplies warmth & iron; Jowar provides gut-healthy fibre.',
    },
    mr: {
      q: 'महाराष्ट्राच्या पारंपरिक आहारातील नाचणी (रागी), बाजरी व ज्वारी या भरडधान्यांना ("श्री अन्न") आरोग्यासाठी अत्यंत मौल्यवान का मानले जाते?',
      opts: [
        'त्यांत भरपूर कॅल्शियम (विशेषतः नाचणीत), लोह, फायबर आणि कमी पाण्यातही टिकाऊ संथ ऊर्जा असते म्हणून',
        'त्यांत कोणतेच फायबर किंवा खनिजे नसतात म्हणून',
        'केवळ कृत्रिम रंगामुळे',
        'जास्त साखरेच्या पाकामुळे',
      ],
      exp: 'नाचणी (कॅल्शियम), बाजरी (लोह) व ज्वारी (तंतुमय पदार्थ) ही भरडधान्ये कुपोषण दूर करण्यात मोठी भूमिका बजावतात.',
    },
    hi: {
      q: 'पारंपरिक भारतीय आहार में रागी (नाचनी), बाजरा और ज्वार जैसे मोटे अनाज ("श्री अन्न") पोषण की दृष्टि से अत्यंत मूल्यवान क्यों हैं?',
      opts: [
        'इनमें प्रचुर कैल्शियम (विशेषकर रागी में), लौह तत्व, रेशे (फाइबर) और कम पानी में उगने की जलवायु-सहनशीलता होती है',
        'इनमें कोई खनिज या रेशा नहीं होता',
        'केवल कृत्रिम रंग के कारण',
        'अधिक रिफाइंड चीनी के कारण',
      ],
      exp: 'रागी कैल्शियम का, बाजरा आयरन का और ज्वार पाचक फाइबर का उत्कृष्ट कम-लागत स्रोत हैं।',
    },
  },
  {
    topic: 'Homemade ORS Ratio for Childhood Diarrhoea Dehydration',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'When commercial ORS packets are unavailable during sudden watery diarrhoea in a village, what safe home ratio of clean water, sugar, and salt restores lost fluids (`jeevan-rakshak ghol`)?',
      opts: [
        '1 litre of clean boiled-and-cooled water + 6 level teaspoons sugar + ½ level teaspoon salt (just less salty than tears)',
        '1 glass milk + 10 spoons chilli powder',
        '1 litre pond water + 5 tablespoons salt',
        'Pure honey with zero water',
      ],
      exp: 'Too much salt worsens dehydration; `1 L clean water + 6 tsp sugar + ½ tsp salt` aids sodium-glucose water absorption safely.',
    },
    mr: {
      q: 'अतिसारामुळे शरीरातील पाणी कमी झाल्यास घरी सुरक्षित "जलसंजीवनी (ORS)" तयार करण्याचे प्रमाण कोणते?',
      opts: [
        '१ लिटर उकळून थंड केलेले स्वच्छ पाणी + ६ चमचे साखर + अर्धा चमचा मीठ (अश्रूंपेक्षा खारट नसावे)',
        '१ पेला दुधात तिखट',
        '१ लिटर विहिरीचे न गाळलेले पाणी + ५ चमचे मीठ',
        'पाण्याविना निव्वळ मध',
      ],
      exp: '१ लिटर स्वच्छ पाण्यात ६ लहान चमचे साखर व ½ चमचा मीठ मिसळून थोड्या थोड्या अंतराने दिल्यास जलशोषण सुरक्षितपणे सुधारते.',
    },
    hi: {
      q: 'अतिसार (दस्त) के दौरान घर पर सुरक्षित "जीवन रक्षक घोल (ORS)" बनाने का सही अनुपात क्या है?',
      opts: [
        '1 लीटर उबालकर ठंडा किया साफ पानी + 6 छोटे चम्मच चीनी + ½ छोटा चम्मच नमक (आँसू से अधिक नमकीन न हो)',
        'दूध में मिर्च मिलाकर',
        'तालाब के पानी में 5 चम्मच नमक',
        'बिना पानी केवल शहद',
      ],
      exp: 'संतुलित `1 लीटर पानी + 6 चम्मच चीनी + ½ चम्मच नमक` का घोल आँतों द्वारा जल एवं लवण अवशोषण को तुरंत बहाल करता है।',
    },
  },
  {
    topic: 'Super Senses in Animals – Snake Sound Vibrations & Eagle Vision',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'NCERT Class 5 "Super Senses" highlights remarkable animal sensory adaptations. How does a snake sense approaching footsteps WITHOUT any external ear pinnae?',
      opts: [
        'It feels ground vibrations directly through its lower jaw and belly skin pressed on the earth',
        'It hears high-pitched flutes in thin air via ears behind its tail',
        'It reads human signboards optically',
        'It uses echolocation sonar underwater only',
      ],
      exp: 'Snakes lack external ears (`outer pinnae`) and eardrums; they detect seismic earth vibrations through jawbone-to-inner-ear conduction.',
    },
    mr: {
      q: 'सापाला बाह्य कान नसतात; मग जवळ येणाऱ्या पावलांची चाहूल सापाला कशी लागते?',
      opts: [
        'जमिनीवर टेकलेला खालचा जबडा व शरीराच्या त्वचेद्वारे जमिनीतील कंपने (Vibrations) जाणवून',
        'शेपटीमागच्या कानांनी पुंगीचा आवाज ऐकून',
        'पाट्या वाचून',
        'पाण्यातल्या प्रतिध्वनीवरून',
      ],
      exp: 'सापांना बाह्य कान नसल्याने ते पुंगीचे हवेतील सूर नव्हे तर जमिनीतील सूक्ष्म कंपने ओळखतात.',
    },
    hi: {
      q: 'साँप के बाहरी कान नहीं होते; फिर भी वह आसपास की आहट या कदमों की गति को कैसे महसूस कर लेता है?',
      opts: [
        'ज़मीन से सटे अपने निचले जबड़े और त्वचा के माध्यम से धरती के कंपन (Vibrations) महसूस करके',
        'पूंछ के पास वाले कानों से बीन की हवा में ध्वनि सुनकर',
        'चेतावनी बोर्ड पढ़कर',
        'पानी के भीतर सोनार से',
      ],
      exp: 'बाहरी कान न होने के कारण साँप हवा की ध्वनि के बजाय धरती में होने वाले कंपनों को जबड़े की हड्डी से ग्रहण करते हैं।',
    },
  },
  {
    topic: 'Bird Vision – Fixed Eyes vs Owls’ Forward Binocular Head Rotation',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Why do most birds like pigeons and crows bob and turn their entire heads constantly, whereas eagles can spot a tiny mouse from `2 km` away?',
      opts: [
        'Most birds’ eyeballs are fixed in sockets so turning the head scans both sides, while raptors (eagles/kites) enjoy `4×` sharper human-equivalent telescopic daytime sight',
        'Birds cannot blink eyelids smoothly',
        'Eagles see strictly in pitch-black caves using whiskers',
        'Crows rotate eyes 360° inside eyelids without moving their necks',
      ],
      exp: 'Avian eyeballs sit tightly inside bony orbits (`moving heads compensates`), and eagles pack ultra-dense retinal cones for `4×` distance acuity.',
    },
    mr: {
      q: 'कबुतर किंवा कावळा यांसारखे बहुतांश पक्षी पाहताना वारंवार मान का हलवतात, तर गरुड–घार दूरवरील भक्ष्य कसे टिपतात?',
      opts: [
        'बहुतांश पक्ष्यांच्या डोळ्यांच्या बाहुल्या स्थिर असतात म्हणून पाहण्यासाठी मान फिरवावी लागते; गरुड-घारीची दृष्टी मानवापेक्षा सुमारे ४ पट तीक्ष्ण असते',
        'पक्ष्यांच्या पापण्या हलत नाहीत म्हणून',
        'गरुड फक्त अंधारात मिशांनी पाहतात',
        'कावळ्याचे डोळे मान न हलवता ३६०° फिरतात',
      ],
      exp: 'डोळ्यांच्या बाहुल्या हाडांत घट्ट बसलेल्या असल्याने पक्षी मान वळवून सभोवती पाहतात.',
    },
    hi: {
      q: 'कबूतर व कौवे जैसे अधिकांश पक्षी देखते समय बार-बार गर्दन क्यों घुमाते हैं, जबकि चील-बाज़ दूर से छोटा शिकार पहचान लेते हैं?',
      opts: [
        'अधिकांश पक्षियों की आँखों की पुतलियाँ स्थिर होती हैं अतः चारों ओर देखने को पूरा सिर घुमाना पड़ता है; चील-बाज़ की दृष्टि मानव से ~4 गुनी तेज़ होती है',
        'पक्षी पलक नहीं झपका सकते',
        'चील अँधेरी गुफा में मूँछों से देखती है',
        'कौवे बिना गर्दन हिलाए पुतली 360° घुमाते हैं',
      ],
      exp: 'आँख की पुतलियाँ कोटर में स्थिर होने से पक्षियों को दिशा बदलने के लिए पूरी गर्दन घुमानी पड़ती है।',
    },
  },
  {
    topic: 'Daily Animal Sleep Durations (Sloth 17h vs Giraffe 2h vs Cow 4h)',
    pattern: 'Factual',
    difficulty: 'Moderate',
    en: {
      q: 'Which sloth-forest mammal from NCERT EVS hangs peacefully upside down from tree branches sleeping almost `17 hours` a day and descending roughly once a week?',
      opts: ['Sloth', 'Tiger', 'Python', 'Giraffe'],
      exp: 'Slow-metabolism Sloths sleep ~`17 h/day` upside down eating leaves of one tree; cows sleep ~`4 h`, giraffes ~`2 h`, pythons ~`18 h`.',
    },
    mr: {
      q: 'कोणता सस्तन प्राणी झाडाच्या फांदीला उलटा लटकून दिवसातील सुमारे `१७ तास` झोपतो व आठवड्यातून फक्त एकदाच झाडावरून खाली उतरतो?',
      opts: ['स्लॉथ (Sloth)', 'वाघ', 'अजगर', 'जिराफ'],
      exp: 'स्लॉथ हा प्राणी दिवसातील सुमारे १७ तास उलटा लटकून झोपतो (गाय ~४ तास, जिराफ ~२ तास, तर अजगर ~१८ तास झोपतो).',
    },
    hi: {
      q: 'कौन-सा स्तनधारी जीव पेड़ की डाल से उल्टा लटककर दिन में लगभग `17 घंटे` सोता है और सप्ताह में लगभग एक बार ही नीचे उतरता है?',
      opts: ['स्लॉथ (Sloth)', 'बाघ', 'अजगर', 'जिराफ'],
      exp: 'धीमी चयापचय वाला स्लॉथ ~17 घंटे उल्टा लटककर सोता है (गाय ~4 घंटे, जिराफ ~2 घंटे और अजगर ~18 घंटे)।',
    },
  },
  {
    topic: 'Ants Trail Pheromones & Mosquito Heat-CO2 Detection',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Even after rubbing a finger gently across a marching line of ants, how do trailing ants locate the food path again—and how do female mosquitoes track sleeping humans in total darkness?',
      opts: [
        'Ants follow invisible scent chemicals (`pheromones`) left by scout ants, while mosquitoes detect body smell (`foot scent`) and exhaled warm `CO₂`',
        'Ants shout ultrasonic calls and mosquitoes read house numbers',
        'Both rely solely on moonlight shadows',
        'Ants trace magnetic copper buried under floors',
      ],
      exp: 'Chemical scent trails guide ant colonies, whereas mosquitoes use thermal/carbon-dioxide and skin-odour receptors.',
    },
    mr: {
      q: 'मुंग्या रांगेने कशा चालतात आणि गडद अंधारातही डास झोपलेल्या माणसाला अचूक कसे शोधतात?',
      opts: [
        'पुढच्या मुंगीने सोडलेल्या गंधामुळे (Pheromones) मागच्या मुंग्या वाट शोधतात; तर डास शरीराचा उष्ण वास व उच्छ्वासातील `CO₂` ओळखतात',
        'मुंग्या ओरडून सांगतात व डास घराचा क्रमांक वाचतात',
        'दोघेही केवळ चंद्रप्रकाशावर अवलंबून असतात',
        'मुंग्या जमिनीखालील चुंबक पाहतात',
      ],
      exp: 'मुंग्यांच्या रांगेत रासायनिक गंधखुणा, तर डासांमध्ये शरीराची उष्णता व गंध ओळखण्याची तीक्ष्ण संवेदना असते.',
    },
    hi: {
      q: 'चींटियाँ एक सीधी कतार में कैसे चलती हैं और घुप अँधेरे में भी मच्छर सोते हुए इंसान को ठीक कैसे खोज लेते हैं?',
      opts: [
        'आगे वाली चींटी की छोड़ी गंध (Pheromones) सूँघकर, जबकि मच्छर शरीर/तलवे की गंध व साँस की `CO₂` की गर्मी से खोजते हैं',
        'चींटियाँ चिल्लाती हैं और मच्छर घर नंबर पढ़ते हैं',
        'दोनों चाँद की छाया देखते हैं',
        'चींटियाँ भूमिगत तांबे को सूँघती हैं',
      ],
      exp: 'चींटियों में रासायनिक गंध-पथ और मच्छरों में मानव पसीने की गंध व `CO₂`/ताप संवेदन होता है।',
    },
  },
  {
    topic: 'Stomach Hydrochloric Acid & Mucus Lining Balance',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Inside the human stomach, digestive juices contain strong Hydrochloric Acid (`HCl`) to kill swallowed bacteria and activate protein enzymes. Why doesn’t this acid burn a hole through our own stomach wall?',
      opts: [
        'A protective slimy layer of MUCUS lines the inner stomach wall continuously',
        'The stomach wall is forged from solid cartilage',
        'Saliva neutralizes every drop of acid permanently',
        'Water swallowed after lunch turns acid into oil',
      ],
      exp: 'Stomach goblet cells secrete alkaline mucus shielding epithelial walls against `HCl` and pepsin.',
    },
    mr: {
      q: 'मानवी जठरात जंतू मारण्यासाठी तीव्र हायड्रोक्लोरिक आम्ल (`HCl`) स्रवते; तरीही आपल्या जठराच्या आतील भिंतीला इजा का होत नाही?',
      opts: [
        'जठराच्या आतील पृष्ठभागावर बुळबुळीत श्लेष्माचे (Mucus) संरक्षक आवरण सातत्याने असते म्हणून',
        'जठराची भिंत हाडांची असते म्हणून',
        'लाळ सर्व आम्ल कायमचे संपवते म्हणून',
        'पाण्याने आम्लाचे तेल होते म्हणून',
      ],
      exp: 'जठरातील श्लेष्मल थर (Mucus lining) स्वतःच्या ऊतींचे तीव्र आम्लापासून संरक्षण करतो.',
    },
    hi: {
      q: 'मानव आमाशय में जीवाणु नष्ट करने हेतु तीव्र हाइड्रोक्लोरिक अम्ल (`HCl`) निकलता है; फिर भी आमाशय की अपनी दीवार क्यों नहीं गलती?',
      opts: [
        'आमाशय की भीतरी सतह पर श्लेष्मा (Mucus) की सुरक्षात्मक चिकनी परत लगातार ढाल बनाती है',
        'आमाशय कठोर हड्डी का बना होता है',
        'लार सारे अम्ल को निष्क्रिय कर देती है',
        'पानी अम्ल को तेल में बदल देता है',
      ],
      exp: 'आमाशय की आंतरिक श्लेष्मा परत (Mucus lining) दीवार को तीव्र पाचक अम्ल व एंजाइम से सुरक्षित रखती है।',
    },
  },
  {
    topic: 'Lactobacillus Curd Setting & Yeast Idli Fermentation',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Which beneficial microorganisms respectfully turn lukewarm milk into sour creamy dahi (`curd`) and make idli/dhokla batter rise fluffy with tiny gas pockets?',
      opts: [
        'Lactobacillus bacteria (in curd) and Yeast fungi releasing `CO₂` gas (in batter/dough)',
        'Plasmodium protozoa and Anopheles larvae',
        'Amoeba and earthworms',
        'Tapeworms and bread mould only',
      ],
      exp: 'Friendly microbes work daily in Indian kitchens: Lactobacillus converts lactose to lactic acid, while yeast respires producing fluffy `CO₂`.',
    },
    mr: {
      q: 'कोमट दुधाचे दही करणारे व इडली-ढोकळ्याचे पीठ फुलवणारे उपयुक्त सूक्ष्मजीव कोणते?',
      opts: [
        'लॅक्टोबॅसिलस जिवाणू (दह्यात) आणि यीस्ट किण्व ज्यातून `CO₂` वायू सुटतो (पिठात)',
        'प्लाझमोडियम व अळ्या',
        'अमीबा व गांडूळ',
        'टेपवर्म व बुरशी',
      ],
      exp: 'लॅक्टोबॅसिलस दुधातील शर्करेचे लॅक्टिक आम्लात रूपांतर करतात, तर यीस्टमुळे `CO₂` तयार होऊन पीठ हलके व जाळीदार होते.',
    },
    hi: {
      q: 'गुनगुने दूध को दही में बदलने और इडली-ढोकला के घोल को स्पंजी फुलाने वाले उपयोगी सूक्ष्मजीव कौन-से हैं?',
      opts: [
        'लैक्टोबैसिलस जीवाणु (दही में) और `CO₂` गैस छोड़ने वाला यीस्ट/खमीर (घोल में)',
        'प्लाज्मोडियम और लार्वा',
        'अमीबा और केंचुए',
        'फीताकृमि केवल',
      ],
      exp: 'लैक्टोबैसिलस दूध को दही जमाते हैं और खमीर किण्वन से निकलने वाली `CO₂` गैस आटे/घोल को जालीदार व मुलायम बनाती है।',
    },
  },
  {
    topic: 'Rabies First Aid – Immediate 15-Min Soap & Running Water Wash',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'If a child gets bitten or deeply scratched by an unvaccinated stray dog, what is the CRITICAL immediate first-aid step before rushing to the clinic for Anti-Rabies vaccine?',
      opts: [
        'Wash the wound thoroughly with plenty of SOAP and running clean water continuously for at least `10–15` minutes (do NOT pack chilli powder or cow dung!)',
        'Seal the bite tightly with red chilli paste and turmeric mud',
        'Wait 7 days to check whether fever starts first',
        'Tie a tourniquet firmly above the shoulder permanently',
      ],
      exp: 'Immediate soap-and-running-water flushing washes away rabies virus from saliva followed promptly by post-exposure vaccination.',
    },
    mr: {
      q: 'भटक्या कुत्र्याने चावा घेतल्यास आरोग्य केंद्रात लस घेण्यापूर्वी घरीच ताबडतोब करायचा सर्वात महत्त्वाचा प्रथमोपचार कोणता?',
      opts: [
        'जखम किमान `१०–१५` मिनिटे भरपूर साबण व वाहत्या स्वच्छ पाण्याने स्वच्छ धुवावी (मिरचीपूड किंवा शेण अजिबात लावू नये!)',
        'जखमेवर मिरची-हळद व माती दाबून भरावी',
        'ताप येईपर्यंत ७ दिवस वाट पाहावी',
        'जखमेवर घट्ट पट्टी बांधून ठेवावी',
      ],
      exp: 'वाहत्या पाण्याने व साबणाने १०–१५ मिनिटे धुतल्याने लाळेतील रेबीज विषाणू बऱ्याच प्रमाणात धुतले जातात; त्यानंतर त्वरित अँटी-रेबीज लस घ्यावी.',
    },
    hi: {
      q: 'आवारा कुत्ते के काटने पर चिकित्सालय में एंटी-रेबीज़ टीका लगवाने से पहले घर पर तुरंत कौन-सा प्राथमिक उपचार करना अनिवार्य है?',
      opts: [
        'घाव को कम से कम `10–15` मिनट तक भरपूर साबुन और बहते साफ पानी से अच्छी तरह धोना (मिर्च या गोबर न लगाना!)',
        'घाव पर लाल मिर्च और हल्दी-मिट्टी भरना',
        'बुखार आने तक 7 दिन प्रतीक्षा करना',
        'ऊपर कसकर पट्टी बाँध देना',
      ],
      exp: 'तुरंत 15 मिनट साबुन व बहते पानी से धोना लार के रेबीज़ विषाणुओं को हटाता है, जिसके बाद तुरंत टीकाकरण आवश्यक है।',
    },
  },
  {
    topic: 'Pulse Polio Campaign (OPV Drops Under Age 5) & Herd Immunity',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Under India’s "Do Boond Zindagi Ki" Pulse Polio drives (`India certified Polio-free by WHO in 2014`), which age group receives oral polio drops free at booths to prevent childhood limb paralysis?',
      opts: [
        'Every child from birth (`0`) up to `5 years` of age regardless of prior doses',
        'Only teenagers aged `15–18 years`',
        'Only senior citizens above `60`',
        'Only newborn twins',
      ],
      exp: 'Oral Polio Vaccine (`OPV`) two-drop doses under age `5` erased wild poliovirus transmission in India.',
    },
    mr: {
      q: '"दो बूंद जिंदगी की" पल्स पोलिओ लसीकरण मोहिमेद्वारे (`भारत २०१४ पासून पोलिओमुक्त घोषित`) कोणत्या वयोगटातील सर्व बालकांना तोंडावाटे पोलिओचे थेंब पाजले जातात?',
      opts: [
        'जन्मापासून `५ वर्षांखालील` सर्व बालकांना',
        'फक्त १५–१८ वयोगटातील किशोरवयीन मुलांना',
        'फक्त ६० वर्षांवरील ज्येष्ठांना',
        'फक्त जुळ्या बाळांना',
      ],
      exp: 'पाच वर्षांखालील प्रत्येक बालकाला पोलिओचे दोन थेंब देऊन भारताने डब्ल्यूएचओकडून २०१४ मध्ये पोलिओमुक्त प्रमाणपत्र मिळवले.',
    },
    hi: {
      q: '"दो बूंद ज़िंदगी की" पल्स पोलियो अभियान (`WHO द्वारा 2014 में भारत पोलियो-मुक्त`) के अंतर्गत किस आयु वर्ग के सभी बच्चों को पोलियो की खुराक पिलाई जाती है?',
      opts: [
        'जन्म से `5 वर्ष` तक के सभी बच्चों को',
        'केवल 15–18 वर्ष के किशोरों को',
        'केवल 60+ बुजुर्गों को',
        'केवल जुड़वाँ बच्चों को',
      ],
      exp: '0–5 वर्ष के प्रत्येक बच्चे को नियमित ओरल पोलियो ड्रॉप्स देकर भारत ने पोलियो उन्मूलन की ऐतिहासिक सफलता प्राप्त की।',
    },
  },
  {
    topic: 'Alum (`Turti`) Coagulation in Muddy Water Clarification',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'After villagers swirl a clean piece of Alum (`Turti`) briefly inside a pot of muddy monsoon river water, fine suspended mud particles rapidly clump together and sink because:',
      opts: [
        'Alum acts as a coagulant making tiny light clay specks stick into heavier flocs that settle faster (though boiling/filtration is STILL needed to kill invisible microbes!)',
        'Alum boils water chemically to `100°C` inside the clay pot',
        'Alum converts soil directly into dissolved vitamins',
        'Swirling turns microbes into edible salt',
      ],
      exp: 'Alum (`loading`) clarifies suspended silt (`turbidity`), while boiling or chlorination eliminates invisible bacteria and viruses.',
    },
    mr: {
      q: 'पावसाळ्यातील गढूळ पाण्यात "तुरटी" फिरवल्यास मातीचे सूक्ष्म कण चटकन तळाशी का बसतात (परंतु जंतू मारण्यासाठी उकळणे आवश्यक का राहते)?',
      opts: [
        'तुरटीमुळे हलके सूक्ष्म मातीकण एकत्र चिकटून जड होतात व तळाशी बसतात (लोडिंग), पण अदृश्य सूक्ष्मजंतू मारण्यासाठी गाळून उकळणे आवश्यक असतेच',
        'तुरटी पाण्याचे तापमान १००°C करते',
        'तुरटी मातीचे जीवनसत्त्वांत रूपांतर करते',
        'फिरवल्याने जंतूंचे मीठ होते',
      ],
      exp: 'तुरटी गढूळपणा दूर करते (निवळणे), पण सूक्ष्मजंतू नष्ट करण्यासाठी उकळणे किंवा क्लोरिन वापरणे गरजेचे असते.',
    },
    hi: {
      q: 'बरसात के मटमैले पानी में "फिटकरी (`तुरटी`)" घुमाने से मिट्टी के महीन कण जल्दी तली में क्यों बैठ जाते हैं (हालांकि रोगाणु मारने हेतु उबालना फिर भी ज़रूरी है)?',
      opts: [
        'फिटकरी स्कंदक के रूप में महीन मिट्टी कणों को जोड़कर भारी कर देती है जिससे वे बैठ जाते हैं, पर अदृश्य जीवाणु नष्ट करने हेतु छानकर उबालना आवश्यक है',
        'फिटकरी पानी को 100°C तक खौलाती है',
        'फिटकरी मिट्टी को विटामिन बना देती है',
        'घुमाने से जीवाणु नमक बन जाते हैं',
      ],
      exp: 'फिटकरी भार बढ़ाकर निलंबित गंदगी बैठाती है (अवसादन सहायता), जबकि सूक्ष्मजीव नष्ट करने के लिए उबालना या क्लोरीनीकरण आवश्यक है।',
    },
  },
  {
    topic: 'Communicable vs Non-Communicable Diseases Classification',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which disease group below consists STRICTLY of NON-COMMUNICABLE conditions (cannot spread from person to person through cough, mosquito, or touch)?',
      opts: [
        'Diabetes, Hypertension, Goitre, and Rickets',
        'Tuberculosis, Measles, and Cholera',
        'Malaria, Dengue, and Influenza',
        'Typhoid, Common Cold, and Chickenpox',
      ],
      exp: 'Diabetes/Hypertension (lifestyle/metabolic) and Goitre/Rickets (nutrient deficiencies) never spread contagiously between classmates.',
    },
    mr: {
      q: 'खालीलपैकी कोणता गट केवळ "अ-संसर्गजन्य" (एकमेकांच्या संपर्कातून न पसरणारे) आजारांचा आहे?',
      opts: [
        'मधुमेह, उच्च रक्तदाब, गलगंड आणि मुडदूस',
        'क्षयरोग (TB), गोवर आणि पटकी (कॉलरा)',
        'मलेरिया, डेंग्यू आणि फ्ल्यू',
        'विषमज्वर, सर्दी आणि कांजिण्या',
      ],
      exp: 'जीवनशैली किंवा पोषणाच्या कमतरतेमुळे होणारे मधुमेह, रक्तदाब, गलगंड व मुडदूस हे अ-संसर्गजन्य विकार आहेत.',
    },
    hi: {
      q: 'निम्नलिखित में से कौन-सा समूह पूरी तरह "असंक्रामक रोगों" (जो एक व्यक्ति से दूसरे व्यक्ति में नहीं फैलते) का है?',
      opts: [
        'मधुमेह, उच्च रक्तचाप, घेंघा (गॉयटर) और रिकेट्स',
        'तपेदिक (TB), खसरा और हैजा',
        'मलेरिया, डेंगू और इन्फ्लुएंजा',
        'टाइफॉइड, जुकाम और चेचक',
      ],
      exp: 'मधुमेह, उच्च रक्तचाप तथा आयोडीन/विटामिन कमी से होने वाले घेंघा व रिकेट्स एक व्यक्ति से दूसरे में नहीं फैलते।',
    },
  },
  {
    topic: 'Food Spoilage Triggers vs Preservation (Mamidi Tandra / Papad / Pickles)',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why do traditional Indian mango papad (`Amba Poli` / `Mamidi Tandra`), salted raw mango pickles (`Lonche`), and sun-dried chillies last safely for 8–12 months without refrigerators?',
      opts: [
        'Removing MOISTURE (sun-drying) and adding natural preservatives (salt, mustard/sesame oil, sugar) stop microbes/fungi from growing',
        'Glass jars dissolve oxygen atoms into helium',
        'Sun-drying turns bacteria into carbohydrates',
        'Raw mangoes naturally resist spoiling in wet dark mud',
      ],
      exp: 'Bacteria and moulds need moisture and moderate osmotic conditions; dehydration plus salt/oil/sugar blocks microbial multiplication.',
    },
    mr: {
      q: 'आंबापोळी, मिरच्या वाळवणे आणि तेला-मिठाचे कैरीचे लोणचे फ्रीजशिवाय वर्षभर खराब का होत नाहीत?',
      opts: [
        'उन्हात वाळवून "आर्द्रता (पाणी)" काढून घेतल्याने तसेच मीठ, साखर व तेलामुळे सूक्ष्मजंतू व बुरशीची वाढ थांबते',
        'काचेच्या बरणीत ऑक्सिजनचे हीलियम होते',
        'उन्हाने जंतूंचे पिष्टमय पदार्थ बनतात',
        'कैरी ओल्या मातीतही सडत नाही',
      ],
      exp: 'पाण्याचा अंश कमी करणे आणि मीठ, साखर, तेल किंवा व्हिनेगर वापरल्याने अन्न दीर्घकाळ टिकते.',
    },
    hi: {
      q: 'आम पापड़, धूप में सूखी मिर्च और नमक-तेल का अचार बिना फ्रिज के भी 8–12 महीने सुरक्षित कैसे टिके रहते हैं?',
      opts: [
        'सुखाकर "नमी" हटाने तथा नमक, चीनी व तेल जैसे प्राकृतिक परिरक्षकों से जीवाणुओं और फफूँदी की वृद्धि रुक जाती है',
        'काँच का जार ऑक्सीजन को हीलियम बना देता है',
        'धूप जीवाणुओं को कार्बोहाइड्रेट में बदल देती है',
        'कच्चा आम गीली मिट्टी में भी नहीं सड़ता',
      ],
      exp: 'निर्जलीकरण (नमी हटाना) और नमक, चीनी व तेल का उपयोग सूक्ष्मजीवों के पनपने के लिए प्रतिकूल वातावरण बनाता है।',
    },
  },
  {
    topic: 'Human Respiratory Diaphragm Mechanics (Inhale vs Exhale)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'During quiet INHALATION inside the human chest cavity, what happens smoothly to the dome-shaped diaphragm muscle beneath the lungs?',
      opts: [
        'The diaphragm contracts and FLATTENS downward while ribs lift outward, expanding chest volume and drawing outside air in',
        'The diaphragm rises up sharply pushing oxygen out',
        'Windpipes close shut until breathing stops',
        'Stomach acids inflate the lungs from below',
      ],
      exp: 'Diaphragm flattens downward (`chest volume up -> pressure drops`), sucking fresh air in; relaxing upward pushes stale air out.',
    },
    mr: {
      q: 'श्वास आत घेताना (Inhalation) आपल्या फुफ्फुसांखालच्या श्वासपटलाची (Diaphragm) हालचाल कशी होते?',
      opts: [
        'श्वासपटल आकुंचन पावून खाली सरकतो (सपाट होतो) आणि बरगड्या वर-बाहेर उचलल्या गेल्याने छातीची पोकळी वाढून हवा आत खेचली जाते',
        'श्वासपटल वर चढून हवा बाहेर ढकलतो',
        'श्वसननलिका बंद होते',
        'जठरातील आम्ल फुफ्फुसे फुगवते',
      ],
      exp: 'श्वासपटल खाली आल्याने व बरगड्या पसरल्याने छातीत कमी दाब तयार होऊन बाहेरची हवा फुफ्फुसांत भरते.',
    },
    hi: {
      q: 'साँस अंदर लेते समय (अंतःश्वसन) फेफड़ों के नीचे स्थित डायाफ्राम मांसपेशी में क्या गति होती है?',
      opts: [
        'डायाफ्राम संकुचित होकर नीचे की ओर चपटा होता है और पसलियाँ ऊपर-बाहर उठती हैं, जिससे वक्ष गुहा फैलती है और हवा अंदर खिंचती है',
        'डायाफ्राम ऊपर उठकर हवा बाहर धकेलता है',
        'श्वासनली बंद हो जाती है',
        'पेट का अम्ल फेफड़े फुलाता है',
      ],
      exp: 'डायाफ्राम के नीचे झुकने से वक्ष गुहा का आयतन बढ़ता व वायुदाब घटता है, जिससे हवा भीतर प्रवेश करती है।',
    },
  },
  {
    topic: 'Human Heart – 4 Chambers & Stethoscope Function',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'About the size of one’s closed fist and beating roughly `72` times per minute at rest, the human heart is divided into how many chambers—and which instrument amplifies its "lub-dub" valve sounds for doctors?',
      opts: [
        '4 chambers (2 atria, 2 ventricles) and Stethoscope',
        '2 chambers and Thermometer',
        '6 chambers and Barometer',
        '1 single sac and Anemometer',
      ],
      exp: 'The 4-chambered heart separates oxygen-poor and oxygen-rich blood cleanly; René Laennec invented the stethoscope (`1816`).',
    },
    mr: {
      q: 'मुठीएवढ्या आकाराचे व विश्रांतीच्या अवस्थेत मिनिटाला सुमारे `७२` वेळा धडधडणारे मानवी हृदय किती कप्प्यांचे असते, आणि त्याचे ठोके डॉक्टर कोणत्या साधनाने ऐकतात?',
      opts: [
        '४ कप्पे (२ अलिंद, २ निलय) आणि स्टेथोस्कोप (Stethoscope)',
        '२ कप्पे आणि थर्मोमीटर',
        '६ कप्पे आणि बॅरोमीटर',
        '१ कप्पा आणि अॅनिमोमीटर',
      ],
      exp: 'मानवी हृदयात ४ कप्पे असतात व झडपांच्या "लब-डब" आवाजाची तपासणी स्टेथोस्कोपने केली जाते.',
    },
    hi: {
      q: 'लगभग मुट्ठी के आकार का और विश्राम में प्रति मिनट ~`72` बार धड़कने वाला मानव हृदय कितने कक्षों का होता है, तथा डॉक्टर इसकी धड़कन किस यंत्र से सुनते हैं?',
      opts: [
        '4 कक्ष (2 आलिंद, 2 निलय) और स्टेथोस्कोप',
        '2 कक्ष और थर्मामीटर',
        '6 कक्ष और बैरोमीटर',
        '1 कक्ष और एनीमोमीटर',
      ],
      exp: '4-कक्षीय मानव हृदय शुद्ध व अशुद्ध रक्त को अलग रखता है और इसके वाल्व की ध्वनि स्टेथोस्कोप से सुनी जाती है।',
    },
  },
  {
    topic: 'Vitamin A vs Protein Energy Malnutrition (`Kwashiorkor`)',
    pattern: 'Factual',
    difficulty: 'Moderate',
    en: {
      q: 'In primary nutrition clinics, thin limbs paired with a swollen fluid-filled belly and stunted growth in young toddlers (`Kwashiorkor`) signal chronic deficiency primarily of:',
      opts: ['Proteins (pulses, milk, eggs, soy)', 'Plain table salt', 'Water alone', 'Artificially sweetened soda'],
      exp: 'Severe dietary Protein deficiency leads to Kwashiorkor, whereas combined energy + protein starvation causes Marasmus.',
    },
    mr: {
      q: 'लहान बालकांमध्ये हातपाय बारीक पण पोट सुजल्यासारखे दिसणे आणि वाढ खुंटणे ("क्वाशिओरकॉर") ही लक्षणे मुख्यत्वे कोणत्या पोषक घटकाच्या तीव्र कमतरतेमुळे दिसतात?',
      opts: ['प्रथिने / प्रोटीन्स (डाळी, दूध, सोयाबीन, अंडी)', 'साधे मीठ', 'फक्त पाणी', 'कृत्रिम शीतपेये'],
      exp: 'आहारात प्रथिनांची तीव्र कमतरता असल्यास क्वाशिओरकॉर, तर प्रथिने व उष्मांक दोन्ही कमी असल्यास मॅरॅस्मस होतो.',
    },
    hi: {
      q: 'छोटे बच्चों में पतले हाथ-पैर के साथ सूजा हुआ पेट और अवरुद्ध वृद्धि ("क्वाशिओरकोर") मुख्यतः किस पोषक तत्व की गंभीर कमी का संकेत है?',
      opts: ['प्रोटीन (दालें, दूध, सोयाबीन, अंडे)', 'साधारण नमक', 'केवल पानी', 'मीठा सोडा'],
      exp: 'आहार में प्रोटीन की भारी कमी से क्वाशिओरकोर और प्रोटीन व ऊर्जा दोनों की कमी से मरास्मस होता है।',
    },
  },
  {
    topic: 'Iron-Rich Local Foods Combating Adolescent & Childhood Anaemia',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'When a Class 5 health screening spots pale nails, constant fatigue, and low haemoglobin (Anaemia) in pupils, which affordable everyday Maharashtra meal booster improves iron absorption best?',
      opts: [
        'Green leafy vegetables (palak, methi, rajgira) + jaggery/dates + Vitamin-C-rich amla or lemon squeeze (which boosts iron uptake!)',
        'Polished white sugar candy only',
        'Instant tea right after every meal (tea tannins block iron absorption!)',
        'Salty fried potato wafers alone',
      ],
      exp: 'NCERT Class 5 "A Treat for Mosquitoes" highlights jaggery, amla, and green leafy veggies (`plus avoiding tea/coffee right with iron meals`).',
    },
    mr: {
      q: 'शाळेतील आरोग्य तपासणीत मुलांचे हिमोग्लोबिन कमी (रक्तक्षय / Anaemia) आढळल्यास कोणता घरगुती आहार लोह शोषण्यास सर्वोत्तम मदत करतो?',
      opts: [
        'पालेभाज्या (पालक, मेथी, राजगिरा), गूळ, खजूर आणि त्यासोबत क-जीवनसत्त्वयुक्त लिंबू किंवा आवळा (जे लोह शोषण वाढवते!)',
        'फक्त पांढरी साखर',
        'जेवणानंतर लगेच चहा पिणे',
        'फक्त खारट बटाटा वेफर्स',
      ],
      exp: 'पालक, गूळ, खजूर व आवळा/लिंबू यांचा एकत्रित आहार रक्तातील हिमोग्लोबिन झपाट्याने वाढवतो.',
    },
    hi: {
      q: 'स्कूल स्वास्थ्य जाँच में कम हीमोग्लोबिन (रक्ताल्पता / एनीमिया) मिलने पर कौन-सा सुलभ घरेलू भोजन आयरन अवशोषण को सबसे अधिक बढ़ाता है?',
      opts: [
        'हरी पत्तेदार सब्ज़ियाँ (पालक, मेथी, चौलाई), गुड़, खजूर और साथ में विटामिन-C युक्त आँवला या नींबू रस',
        'केवल सफेद मिश्री',
        'भोजन के तुरंत बाद चाय पीना (जो आयरन रोकती है)',
        'केवल तले हुए चिप्स',
      ],
      exp: 'आँवला/नींबू के विटामिन-C के साथ पालक, गुड़ व हरी पत्तेदार सब्ज़ियाँ खाने से आयरन का अवशोषण कई गुना बढ़ जाता है।',
    },
  },
  {
    topic: 'Kidney Filtration & Excretory System Function',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Shaped like two dark beans flanking the lower back spine, which paired internal organs continuously filter urea and excess salts out of human blood as urine?',
      opts: [
        'Kidneys (Vrukka)',
        'Lungs (exclusively filtering `CO₂`)',
        'Liver (gallbladder bile)',
        'Spleen',
      ],
      exp: 'Healthy kidneys filter blood through millions of microscopic nephrons daily, excreting nitrogenous wastes via ureters and bladder.',
    },
    mr: {
      q: 'पाठीच्या कण्याच्या खालच्या बाजूला असणारी घेवड्याच्या दाण्यासारख्या आकाराची कोणती जोडीची इंद्रिये रक्तातील युरिया व अतिरिक्त क्षार गाळून मूत्राद्वारे बाहेर टाकतात?',
      opts: [
        'मूत्रपिंडे (Kidneys / वृक्क)',
        'फुफ्फुसे (ती `CO₂` बाहेर टाकतात)',
        'यकृत',
        'प्लीहा',
      ],
      exp: 'दोन्ही मूत्रपिंडे (Kidneys) रक्ताचे सतत गाळण करून टाकाऊ नायट्रोजनयुक्त पदार्थ शरीराबाहेर काढतात.',
    },
    hi: {
      q: 'रीढ़ के निचले हिस्से के दोनों ओर सेम के दाने के आकार के कौन-से अंग रक्त से यूरिया और अतिरिक्त लवण छानकर मूत्र के रूप में बाहर निकालते हैं?',
      opts: [
        'वृक्क (Kidneys)',
        'फेफड़े (जो `CO₂` निकालते हैं)',
        'यकृत',
        'प्लीहा',
      ],
      exp: 'दोनों वृक्क (गुर्दे) सूक्ष्म नेफ्रॉन द्वारा रक्त को छानकर अपशिष्ट यूरिया व अतिरिक्त जल बाहर करते हैं।',
    },
  },
  {
    topic: 'Choking First Aid & Avoiding Unsafe Ear/Nose Object Poking',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Why must adults NEVER insert sharp hairpins, matchsticks, or unsterilized cotton buds deep into a child’s ear canal to clean earwax?',
      opts: [
        'Deep poking risks tearing the delicate eardrum (`tympanic membrane`) and packing wax tighter inward; gentle outer wiping suffices',
        'Earwax converts into inner hair naturally',
        'Matchsticks dissolve bone marrow',
        'Eardrums regenerate painlessly overnight',
      ],
      exp: 'The ear canal is self-cleaning; cotton buds push wax inward against the fragile tympanic membrane.',
    },
    mr: {
      q: 'लहान मुलांच्या कानातील मळ काढण्यासाठी हेअरपिन, काडी किंवा टोकदार कापूस आत घालू नये अशी ताकीद डॉक्टर का देतात?',
      opts: [
        'कानाच्या नाजूक पडद्याला इजा होऊन बहिरेपणा येऊ शकतो आणि मळ अधिक आत ढकलला जातो; बाहेरून ओल्या फडक्याने पुसणे पुरेसे असते',
        'कानाचा मळ आपोआप केस बनतो',
        'काडीने हाडे वितळतात',
        'कानाचा पडदा एका रात्रीत पुन्हा तयार होतो',
      ],
      exp: 'कानातील मळ नैसर्गिकरीत्या बाहेर सरकतो; काड्या घालण्याने पडदा फाटण्याचा गंभीर धोका असतो.',
    },
    hi: {
      q: 'बच्चों के कान से मैल निकालने के लिए पिन, माचिस की तीली या नुकीली बड अंदर डालने से डॉक्टर सख्त मना क्यों करते हैं?',
      opts: [
        'नाजुक कान का पर्दा फटने (बहरापन) का खतरा रहता है और मैल अंदर दब जाता है; बाहरी हिस्से को गीले कपड़े से पोंछना पर्याप्त है',
        'कान का मैल बाल बन जाता है',
        'तीली हड्डी गला देती है',
        'पर्दा एक रात में नया उग आता है',
      ],
      exp: 'कान स्वयं सफाई करता है; कोई भी तीली या बड कान के पर्दे को स्थायी क्षति पहुँचा सकती है।',
    },
  },
  {
    topic: 'Night-Active Animals vs Daytime Colour Vision',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'According to animal sensory biology taught in Class 5 EVS, strictly nocturnal creatures awake in the dark night—like bats and owls—predominantly perceive the world in:',
      opts: [
        'Black, white, and shades of grey (`low-light rod cells` dominate)',
        'Full neon ultraviolet rainbows',
        'Bright crimson red exclusively',
        'Infrared heat flames only',
      ],
      exp: 'Nocturnal eyes pack light-sensitive rods (`black-and-white contrast`), whereas diurnal animals like humans see colour via cone cells.',
    },
    mr: {
      q: 'इ. ५ वी EVS नुसार वटवाघूळ किंवा घुबड यांसारख्या केवळ रात्री जागणाऱ्या निशाचर प्राण्यांना अंधारात जग प्रामुख्याने कसे दिसते?',
      opts: [
        'काळे-पांढरे व राखाडी छटांमध्ये (कारण त्यांच्या डोळ्यांत दंडपेशी अधिक असतात)',
        'फक्त इंद्रधनुष्याच्या सात निऑन रंगांत',
        'केवळ गडद लाल रंगात',
        'फक्त उष्ण ज्वाळांसारखे',
      ],
      exp: 'निशाचर प्राण्यांना रात्रीचे तीक्ष्ण काळे-पांढरे दिसते, तर दिवसा कार्यरत प्राणी विविध रंग ओळखतात.',
    },
    hi: {
      q: 'कक्षा 5 EVS के अनुसार चमगादड़ व उल्लू जैसे मुख्यतः रात्रिचर (रात में जागने वाले) जीवों को संसार सामान्यतः किन रंगों में दिखता है?',
      opts: [
        'केवल काले, सफेद और धूसर शेड्स में (कम रोशनी वाली शलाका कोशिकाओं के कारण)',
        'संपूर्ण इंद्रधनुषी नियॉन रंगों में',
        'केवल चमकीले लाल रंग में',
        'केवल अवरक्त लपटों में',
      ],
      exp: 'रात में जागने वाले जीव कम रोशनी में स्पष्ट देखने के कारण मुख्यतः श्वेत-श्याम (Black & White) देखते हैं।',
    },
  },
  {
    topic: 'Pasteurization of Milk (Louis Pasteur – Heat & Rapid Chill)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why do dairy pouches labeled "Pasteurized Milk" stay fresh for a couple of days chilled cleanly WITHOUT boiling away nutrients—invented by French scientist Louis Pasteur?',
      opts: [
        'Milk is heated quickly to ~`70°C` for `15–30 seconds` (`killing harmful microbes`) and rapidly chilled right back down',
        'Milk is boiled continuously for `5` whole hours',
        'Milk is mixed with chalk powder',
        'Milk is frozen into dry solid ice powder forever',
      ],
      exp: 'Pasteurization (`HTST: 72°C for 15s, rapid cooling`) destroys pathogens while preserving milk’s taste and vitamins.',
    },
    mr: {
      q: 'फ्रेंच शास्त्रज्ञ लुई पाश्चर यांनी शोधलेल्या "पाश्चरायझेशन (Pasteurization)" पद्धतीने पिशवीतील दूध पोषक मूल्य टिकवून सुरक्षित कसे राहते?',
      opts: [
        'दूध ~`७०°C` पर्यंत `१५–३० सेकंद` झटपट गरम करून (हानिकारक जंतू नष्ट करून) लगेचच थंड केले जाते म्हणून',
        'दूध सतत ५ तास उकळून',
        'दुधात खडूची पूड मिसळून',
        'दुधाची कायमची पावडर करून',
      ],
      exp: 'पाश्चरीकरणामुळे दुधातील रोगकारक सूक्ष्मजंतू मरतात व पोषणमूल्य तसेच चव अबाधित राहते.',
    },
    hi: {
      q: 'लुई पाश्चर द्वारा खोजी गई "पाश्चरीकरण (Pasteurization)" प्रक्रिया थैली के दूध को बिना पोषण नष्ट किए सुरक्षित कैसे बनाती है?',
      opts: [
        'दूध को ~`70°C` पर `15–30 सेकंड` तेजी से गर्म कर हानिकारक जीवाणु नष्ट कर तुरंत ठंडा किया जाता है',
        'दूध को लगातार 5 घंटे उबाला जाता है',
        'दूध में चॉक पाउडर मिलाया जाता है',
        'दूध को हमेशा के लिए जमा दिया जाता है',
      ],
      exp: 'पाश्चरीकरण से रोगाणु नष्ट हो जाते हैं और दूध का प्राकृतिक स्वाद व पोषक गुण सुरक्षित रहते हैं।',
    },
  },
  {
    topic: 'Human Skeletal Protection – Ribcage, Skull & Backbone',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'How does the human skeleton (`206` bones in adults) act like a protective helmet and armour cage around our vital soft organs?',
      opts: [
        'The Skull shields the Brain (`cranium`), and the curved Ribcage shields both the Heart and Lungs',
        'Kneecaps protect the brain directly',
        'Fingernails shield the liver',
        'Jawbone guards the kidneys',
      ],
      exp: 'Hard fused cranial bones encase the brain while flexible ribcage + sternum protect heart and lungs.',
    },
    mr: {
      q: 'प्रौढ मानवाची `२०६` हाडे आपल्या शरीरातील नाजूक अंतर्भागांचे कवचाप्रमाणे संरक्षण कसे करतात?',
      opts: [
        'कवटी मेंदूचे रक्षण करते, तर फासळ्यांचा पिंजरा हृदय आणि फुफ्फुसांचे संरक्षण करतो',
        'गुडघ्याची वाटी मेंदूचे रक्षण करते',
        'बोटांची नखे यकृताचे रक्षण करतात',
        'जबड्याचे हाड मूत्रपिंडाचे रक्षण करते',
      ],
      exp: 'कवटी मेंदूला व छातीचा पिंजरा हृदय-फुफ्फुसांना सुरक्षित ठेवतो, तर पाठीचा कणा मज्जारज्जूचे रक्षण करतो.',
    },
    hi: {
      q: 'मानव कंकाल की `206` हड्डियाँ शरीर के कोमल आंतरिक अंगों को सुरक्षा-कवच की तरह कैसे बचाती हैं?',
      opts: [
        'खोपड़ी मस्तिष्क की रक्षा करती है तथा पसलियों का पिंजरा हृदय और फेफड़ों को सुरक्षित रखता है',
        'घुटने की कटोरी मस्तिष्क बचाती है',
        'नाखून यकृत की रक्षा करते हैं',
        'जबड़ा गुर्दों को ढकता है',
      ],
      exp: 'कपाल मस्तिष्क की, वक्ष-पिंजरा हृदय-फेफड़ों की और मेरुदंड मेरुरज्जु की रक्षा करता है।',
    },
  },
  {
    topic: 'Sleep Hygiene & Limiting Excessive Screen Glare Before Bed',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why do child-health pediatricians advise switching off bright mobile screens at least `45–60` minutes before primary schoolchildren sleep?',
      opts: [
        'Bright blue screen light tricks the brain into suppressing sleep-hormone melatonin, delaying deep restorative sleep needed for memory and growth',
        'Screens consume all bedroom oxygen overnight',
        'Sleeping near phones doubles tooth cavities directly',
        'Shutting screens erases school homework silently',
      ],
      exp: 'Blue light suppresses evening melatonin secretion, disrupting memory consolidation and daytime attention.',
    },
    mr: {
      q: 'झोपण्यापूर्वी किमान `४५–६०` मिनिटे आधी लहान मुलांनी मोबाईल-टीव्हीचा प्रखर प्रकाश बंद करावा असा सल्ला बालरोगतज्ज्ञ का देतात?',
      opts: [
        'स्क्रीनच्या निळ्या प्रकाशामुळे मेंदूला दिवस वाटतो व झोपेचे संप्रेरक (Melatonin) मंदावते, ज्यामुळे गाढ झोप आणि वाढीवर परिणाम होतो',
        'स्क्रीन खोलीतील सर्व ऑक्सिजन खातो',
        'फोनमुळे दात थेट किडतात',
        'स्क्रीन बंद केल्यास गृहपाठ पुसला जातो',
      ],
      exp: 'गाढ झोपेसाठी आवश्यक मेलाटोनिन संप्रेरकावर स्क्रीनच्या निळ्या प्रकाशाचा प्रतिकूल परिणाम होतो.',
    },
    hi: {
      q: 'बाल रोग विशेषज्ञ बच्चों के सोने से `45–60` मिनट पहले तेज़ मोबाइल स्क्रीन बंद करने की सलाह क्यों देते हैं?',
      opts: [
        'स्क्रीन की नीली रोशनी मस्तिष्क में नींद के हार्मोन मेलाटोनिन को दबाती है, जिससे गहरी नींद, स्मृति व वृद्धि प्रभावित होती है',
        'स्क्रीन रात में सारी ऑक्सीजन खींच लेती है',
        'फोन से सीधे दाँत सड़ते हैं',
        'स्क्रीन बंद होने से होमवर्क मिट जाता है',
      ],
      exp: 'नीली रोशनी मेलाटोनिन स्राव रोकती है, जिससे बच्चों की गहरी नींद और एकाग्रता बाधित होती है।',
    },
  },
];
