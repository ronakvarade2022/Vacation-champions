import { CuratedTrilingualMcq } from './types';

// MAHA TET Paper 1 (Classes 1-5) — EVS Content Part 1 (36 Distinct Maharashtra Balbharati Geography Items)
export const MAHA_TET_P1_B1_EVS_C1: CuratedTrilingualMcq[] = [
  {
    topic: 'Maharashtra Highest Mountain Peak',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which is the highest peak in Maharashtra, located in the Sahyadri (Western Ghats) range?',
      opts: ['Kalsubai (1,646 m)', 'Salher', 'Mahabaleshwar', 'Harishchandragad'],
      exp: 'Kalsubai (1,646 m), situated on the border of Ahmednagar (Ahilyanagar) and Nashik districts, is the highest peak in Maharashtra.',
    },
    mr: {
      q: 'महाराष्ट्रातील सह्याद्री पर्वतरांगेतील सर्वात उंच शिखर कोणते आहे?',
      opts: ['कळसूबाई (१,६४६ मी)', 'साल्हेर', 'महाबळेश्वर', 'हरिश्चंद्रगड'],
      exp: 'अहिल्यानगर व नाशिक जिल्ह्यांच्या सीमेवरील कळसूबाई (१,६४६ मीटर) हे महाराष्ट्रातील सर्वोच्च शिखर आहे.',
    },
    hi: {
      q: 'महाराष्ट्र में सह्याद्री पर्वत श्रेणी की सबसे ऊँची चोटी कौन-सी है?',
      opts: ['कलसूबाई (१,६४६ मी)', 'साल्हेर', 'महाबलेश्वर', 'हरिश्चंद्रगढ़'],
      exp: 'कलसूबाई (१,६४६ मीटर) महाराष्ट्र की सर्वोच्च पर्वत चोटी है।',
    },
  },
  {
    topic: 'Godavari River Origin in Maharashtra',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'From which sacred place in Nashik district does the Godavari—the longest river flowing across Maharashtra—originate?',
      opts: ['Trimbakeshwar (Brahmagiri Hills)', 'Mahabaleshwar', 'Bhimashankar', 'Amboli'],
      exp: 'The Godavari originates at Brahmagiri Hills near Trimbakeshwar in Nashik district and flows eastwards across the Deccan Plateau.',
    },
    mr: {
      q: 'महाराष्ट्रातील सर्वात लांब नदी असलेली गोदावरी नाशिक जिल्ह्यातील कोणत्या ठिकाणी उगम पावते?',
      opts: ['त्र्यंबकेश्वर (ब्रह्मगिरी डोंगर)', 'महाबळेश्वर', 'भीमाशंकर', 'आंबोली'],
      exp: 'गोदावरी नदीचा उगम नाशिक जिल्ह्यातील त्र्यंबकेश्वर येथील ब्रह्मगिरी पर्वतावर होतो.',
    },
    hi: {
      q: 'महाराष्ट्र की सबसे लंबी नदी गोदावरी का उद्गम नाशिक जिले के किस स्थान से होता है?',
      opts: ['त्र्यंबकेश्वर (ब्रह्मगिरि पहाड़ियाँ)', 'महाबलेश्वर', 'भीमाशंकर', 'आंबोली'],
      exp: 'गोदावरी नदी नाशिक जिले में त्र्यंबकेश्वर के पास ब्रह्मगिरि पहाड़ियों से निकलती है।',
    },
  },
  {
    topic: 'Krishna River Origin Panchganga Confluence',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which hill station in Satara district is the famous origin point of five rivers including the Krishna, Koyna, Venna, Savitri, and Gayatri?',
      opts: ['Mahabaleshwar (Kshetra Mahabaleshwar)', 'Matheran', 'Chikhaldara', 'Lonavala'],
      exp: 'At Kshetra Mahabaleshwar (Panchaganga Temple), the Krishna river originates alongside four sister streams.',
    },
    mr: {
      q: 'सातारा जिल्ह्यातील कोणते थंड हवेचे ठिकाण कृष्णा, कोयना, वेण्णा, सावित्री आणि गायत्री या पाच नद्यांचे उगमस्थान म्हणून प्रसिद्ध आहे?',
      opts: ['महाबळेश्वर (क्षेत्र महाबळेश्वर)', 'माथेरान', 'चिखलदरा', 'लोणावळा'],
      exp: 'क्षेत्र महाबळेश्वर येथील पंचगंगा मंदिरातून कृष्णा व इतर नद्यांचा उगम होतो.',
    },
    hi: {
      q: 'सातारा जिले का कौन-सा पर्वतीय स्थल कृष्णा, कोयना, वेण्णा, सावित्री और गायत्री नदियों के उद्गम हेतु प्रसिद्ध है?',
      opts: ['महाबलेश्वर (क्षेत्र महाबलेश्वर)', 'माथेरान', 'चिखलदरा', 'लोणावला'],
      exp: 'क्षेत्र महाबलेश्वर स्थित पंचगंगा मंदिर से कृष्णा सहित पाँच धाराएँ निकलती हैं।',
    },
  },
  {
    topic: 'Konkan Coast vs Deccan Plateau Rainfall',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why does the Konkan coastal strip receive heavy monsoon rainfall while districts immediately east of the Sahyadri ridge (like Solapur or Ahilyanagar) lie in a Rain Shadow?',
      opts: [
        'South-West monsoon winds rise up the western Sahyadri wall cooling to rain heavily over Konkan, then descend dry down the eastern leeward side',
        'Konkan lies closer to the North Pole',
        'East Maharashtra has no trees anywhere',
        'Arabian Sea winds blow only during winter months',
      ],
      exp: 'Orographic uplift drops heavy moisture on the windward Konkan side, leaving eastern Desh districts in a rain-shadow zone.',
    },
    mr: {
      q: 'कोकण किनारपट्टीवर मुसळधार पाऊस पडतो, परंतु सह्याद्रीच्या पूर्वेकडील सोलापूर किंवा अहिल्यानगर या भागांत "पर्जन्यछायेचा प्रदेश" का तयार होतो?',
      opts: [
        'नैऋत्य मोसमी वारे सह्याद्रीच्या पश्चिम कड्याला अडवून कोकणात जोरदार पाऊस देतात आणि घाट ओलांडून पूर्वेकडे उतरताना बाष्पहीन कोरडे होतात',
        'कोकण उत्तर ध्रुवाच्या जवळ आहे',
        'पूर्व महाराष्ट्रात अजिबात झाडे नाहीत',
        'अरबी समुद्राचे वारे फक्त हिवाळ्यात वाहतात',
      ],
      exp: 'सह्याद्री पर्वताच्या वातविमुख (Leeward) पूर्वेकडील बाजूस बाष्प कमी झाल्याने पर्जन्यछायेचा प्रदेश निर्माण होतो.',
    },
    hi: {
      q: 'कोंकण तट पर भारी वर्षा होती है, जबकि सह्याद्री के ठीक पूर्व (सोलापुर आदि) में "वृष्टि-छाया क्षेत्र" क्यों बनता है?',
      opts: [
        'दक्षिण-पश्चिम मानसूनी पवनें सह्याद्री की पश्चिमी ढलान से टकराकर कोंकण में खूब बरसती हैं और पूर्व की ओर उतरते समय शुष्क हो जाती हैं',
        'कोंकण उत्तरी ध्रुव के पास है',
        'पूर्वी महाराष्ट्र में कोई वृक्ष नहीं हैं',
        'अरब सागर की पवनें केवल सर्दियों में चलती हैं',
      ],
      exp: 'पर्वतीय अवरोध के कारण पवनविमुख पूर्वी ढलान पर नमी घटने से वृष्टि-छाया क्षेत्र बनता है।',
    },
  },
  {
    topic: 'Lonar Crater Lake Buldhana Unique Origin',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Lonar Lake in Buldhana district of Maharashtra is globally renowned among scientists as a unique natural:',
      opts: [
        'Hyper-velocity Meteorite Impact Crater filled with saline-alkaline water in basalt rock',
        'Artificial hydro-electric concrete dam reservoir',
        'Glacial lake melted from Himalayan snow',
        'Coral reef lagoon bordering the Konkan coast',
      ],
      exp: 'Lonar Sarovar is one of Earth’s few hyper-velocity impact craters formed in volcanic basalt rock roughly 50,000 years ago.',
    },
    mr: {
      q: 'महाराष्ट्रातील बुलढाणा जिल्ह्यातील जगप्रसिद्ध "लोणार सरोवर" शास्त्रीयदृष्ट्या कशामुळे निर्माण झाले आहे?',
      opts: [
        'बेसॉल्ट खडकावर झालेल्या प्रचंड उल्कापातामुळे (Meteorite Impact Crater) तयार झालेले खारे सरोवर',
        'मानवनिर्मित जलविद्युत धरण',
        'हिमनदी वितळून तयार झालेले गोड्या पाण्याचे सरोवर',
        'कोकण किनाऱ्यावरील प्रवाळ बेट',
      ],
      exp: 'लोणार सरोवर हे बेसॉल्ट खडकातील उल्कापाताने निर्माण झालेले जगातील दुर्मिळ खाऱ्या पाण्याचे विवर सरोवर आहे.',
    },
    hi: {
      q: 'महाराष्ट्र के बुलढाणा जिले की प्रसिद्ध "लोनार झील" वैज्ञानिक दृष्टि से किस कारण निर्मित हुई है?',
      opts: [
        'बेसाल्ट चट्टान पर हुए विशाल उल्कापिंड प्रहार (Meteorite Crater) से बनी खारे पानी की झील',
        'मानवनिर्मित जलविद्युत बाँध',
        'हिमनद से बनी मीठे पानी की झील',
        'समुद्री प्रवाल द्वीप लैगून',
      ],
      exp: 'लोनार झील बेसाल्ट चट्टान में उल्कापात से बना एक दुर्लभ प्राकृतिक क्रेटर सरोवर है।',
    },
  },
  {
    topic: 'Laterite Soil (Jambha Mruda) in Konkan',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which reddish, iron-rich coastal soil found abundantly across Ratnagiri and Sindhudurg districts is famous for Alphonso mangoes and cashew orchards?',
      opts: [
        'Laterite Soil (Jambha Mruda)',
        'Black Cotton Soil (Regur)',
        'Desert Sandy Loam',
        'Alpine Peat Soil',
      ],
      exp: 'Heavy tropical leaching produces brick-red Laterite (Jambha) soil ideal for Konkan Alphonso mangoes, cashews, and jackfruit.',
    },
    mr: {
      q: 'रत्नागिरी व सिंधुदुर्ग जिल्ह्यांत हापूस आंबा व काजू बागांसाठी प्रसिद्ध असलेली तांबूस रंगाची माती कोणती?',
      opts: [
        'जांभी मृदा (Laterite Soil)',
        'काळी कसदार रेगूर मृदा',
        'वाळवंटी वाळू',
        'हिमालयीन गाळाची माती',
      ],
      exp: 'अतिपावसाच्या कोकण भागात लोहसमृद्ध जांभी मृदा आढळते, जी आंबा व काजूच्या पिकांसाठी उत्तम असते.',
    },
    hi: {
      q: 'रत्नागिरी और सिंधुदुर्ग जिलों में हापुस आम व काजू की बागवानी हेतु प्रसिद्ध लाल-भूरी मिट्टी कौन-सी है?',
      opts: [
        'लैटेराइट मिट्टी (जांभा मृदा)',
        'काली कपास मिट्टी (रेगुर)',
        'मरुस्थलीय बलुई मिट्टी',
        'पर्वतीय पीट मिट्टी',
      ],
      exp: 'अत्यधिक वर्षा वाले कोंकण क्षेत्र में लौह-युक्त लैटेराइट (जांभा) मृदा आम व काजू के लिए आदर्श है।',
    },
  },
  {
    topic: 'West-Flowing Rivers of Maharashtra',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Unlike the east-flowing Godavari and Krishna, which pair of major rivers flows WESTWARDS to join the Arabian Sea?',
      opts: [
        'Tapi (Tapti) and Narmada (plus Konkan coastal rivers like Ulhas & Savitri)',
        'Bhima and Indrayani',
        'Penganga and Wainganga',
        'Manjara and Pravara',
      ],
      exp: 'Narmada (along northern Nandurbar border) and Tapi flow westward into the Arabian Sea; Godavari, Bhima, Krishna flow eastward.',
    },
    mr: {
      q: 'पूर्ववाहिनी गोदावरी व कृष्णा नद्यांप्रमाणे न वाहता खालीलपैकी कोणत्या प्रमुख नद्या पश्चिमेकडे अरबी समुद्रास मिळतात?',
      opts: [
        'तापी आणि नर्मदा (तसेच उल्हास, सावित्रीसारख्या कोकण नद्या)',
        'भीमा आणि इंद्रायणी',
        'पैनगंगा आणि वैनगंगा',
        'मांजरा आणि प्रवरा',
      ],
      exp: 'तापी व नर्मदा या पश्चिमवाहिनी प्रमुख नद्या अरबी समुद्राला जाऊन मिळतात.',
    },
    hi: {
      q: 'पूर्व की ओर बहने वाली गोदावरी-कृष्णा के विपरीत, इनमें से कौन-सी प्रमुख नदियाँ पश्चिम की ओर अरब सागर में गिरती हैं?',
      opts: [
        'तापी और नर्मदा (तथा उल्हास-सावित्री जैसी कोंकण नदियाँ)',
        'भीमा और इंद्रायणी',
        'पैनगंगा और वैनगंगा',
        'मांजरा और प्रवरा',
      ],
      exp: 'तापी और नर्मदा पश्चिमवाहिनी नदियाँ हैं जो अरब सागर में मिलती हैं।',
    },
  },
  {
    topic: 'Jayakwadi Dam (Nath Sagar) Location',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'The large Jayakwadi Irrigation Project (Nath Sagar reservoir) in Marathwada is constructed at Paithan across which river?',
      opts: ['Godavari', 'Koyna', 'Tapi', 'Wardha'],
      exp: 'Jayakwadi Dam at Paithan (Chhatrapati Sambhajinagar district) impounds the Godavari river, watering fertile Marathwada farmlands.',
    },
    mr: {
      q: 'मराठवाड्यातील प्रसिद्ध "जायकवाडी धरण" (नाथसागर जलाशय) पैठण येथे कोणत्या नदीवर बांधलेले आहे?',
      opts: ['गोदावरी', 'कोयना', 'तापी', 'वर्धा'],
      exp: 'छत्रपती संभाजीनगर जिल्ह्यातील पैठण येथे गोदावरी नदीवर जायकवाडी धरण बांधलेले आहे.',
    },
    hi: {
      q: 'मराठवाड़ा की प्रसिद्ध "जायकवाड़ी बाँध परियोजना" (नाथ सागर) पैठण में किस नदी पर बनी है?',
      opts: ['गोदावरी', 'कोयना', 'तापी', 'वर्धा'],
      exp: 'जायकवाड़ी बाँध पैठण (छत्रपति संभाजीनगर जिला) में गोदावरी नदी पर स्थित है।',
    },
  },
  {
    topic: 'Black Cotton Soil (Regur) Crop Suitability',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why is the Black Soil (Regur) formed from weathered Deccan lava rock across Vidarbha and Marathwada ideal for cotton cultivation?',
      opts: [
        'It retains moisture deeply for long periods, turns clayey when wet, and develops aeration cracks in dry spells',
        'It drains every drop of rainwater within five minutes',
        'It is composed entirely of coastal white sand',
        'It remains permanently frozen during winter',
      ],
      exp: 'High moisture-retentive basaltic Regur soil supports cotton, jowar, tur, and soybean across plateau districts.',
    },
    mr: {
      q: 'विदर्भ व मराठवाड्यातील दख्खनच्या लाव्हा खडकापासून बनलेली "काळी कसदार रेगूर मृदा" कापूस पिकासाठी उत्तम का मानली जाते?',
      opts: [
        'ती ओलावा दीर्घकाळ धरून ठेवते आणि उन्हाळ्यात भेगा पडून जमिनीत हवा खेळती राहते',
        'ती पावसाचे सर्व पाणी पाच मिनिटांत वाहून नेते',
        'ती पूर्णतः समुद्रकिनाऱ्यावरील पांढऱ्या वाळूची असते',
        'ती हिवाळ्यात बर्फासारखी गोठते',
      ],
      exp: 'बेसॉल्ट खडकापासून तयार झालेली काळी रेगूर माती उच्च जलधारण क्षमतेमुळे कापूस व ज्वारीसाठी अत्यंत सुपीक असते.',
    },
    hi: {
      q: 'विदर्भ और मराठवाड़ा की काली मिट्टी (रेगुर) कपास की खेती के लिए आदर्श क्यों मानी जाती है?',
      opts: [
        'इसमें नमी लंबे समय तक धारण करने की उच्च क्षमता होती है और सूखने पर दरारों से स्वतः वायु-संचार होता है',
        'यह वर्षा जल को तुरंत सुखा देती है',
        'यह केवल तटीय रेत से बनी है',
        'यह सर्दियों में जम जाती है',
      ],
      exp: 'दक्कन लावा चट्टानों से बनी काली रेगुर मिट्टी उच्च जलधारण क्षमता के कारण कपास के लिए सर्वोत्तम है।',
    },
  },
  {
    topic: 'Maharashtra Cash Crops Regional Specialization',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Match these Maharashtra cities cleanly with their hallmark agricultural produce: Nagpur — Mandarins (Oranges); Jalgaon — Bananas; Nashik — Grapes. Which coastal district pair leads in Cashews & Alphonso mangoes?',
      opts: [
        'Ratnagiri and Sindhudurg',
        'Gondia and Gadchiroli',
        'Latur and Dharashiv',
        'Dhule and Nandurbar',
      ],
      exp: 'Coastal Konkan districts Ratnagiri and Sindhudurg are renowned nationwide for GI-tagged Alphonso mangoes and cashews.',
    },
    mr: {
      q: 'नागपूरची संत्री, जळगावची केळी, नाशिकची द्राक्षे याप्रमाणे हापूस आंबा व काजूसाठी महाराष्ट्रातील कोणती जिल्हा जोडी अग्रगण्य आहे?',
      opts: [
        'रत्नागिरी आणि सिंधुदुर्ग',
        'गोंदिया आणि गडचिरोली',
        'लातूर आणि धाराशिव',
        'धुळे आणि नंदुरबार',
      ],
      exp: 'कोकणातील रत्नागिरी व सिंधुदुर्ग जिल्हे जगप्रसिद्ध हापूस आंबा व काजू उत्पादनासाठी प्रसिद्ध आहेत.',
    },
    hi: {
      q: 'नागपुर के संतरे, जलगाँव के केले और नाशिक के अंगूर की तरह हापुस आम व काजू के लिए कौन-से जिले प्रसिद्ध हैं?',
      opts: [
        'रत्नागिरी और सिंधुदुर्ग',
        'गोंदिया और गढ़चिरौली',
        'लातूर और धाराशिव',
        'धुले और नंदुरबार',
      ],
      exp: 'कोंकण तट के रत्नागिरी व सिंधुदुर्ग जिले हापुस आम और काजू के प्रमुख उत्पादक हैं।',
    },
  },
  {
    topic: 'Konkan Railway Engineering Feature',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which rail corridor passes along Maharashtra’s scenic western coastline linking Mumbai through Ratnagiri and Sindhudurg toward Goa and Karnataka via hundreds of bridges and tunnels?',
      opts: [
        'Konkan Railway',
        'Deccan Queen Narrow-Gauge',
        'Vidarbha Coal Express Line',
        'Khandesh Desert Loop',
      ],
      exp: 'The Konkan Railway traverses rugged Sahyadri spurs, creeks, and tunnels along Maharashtra’s coastal belt.',
    },
    mr: {
      q: 'मुंबईहून रत्नागिरी-सिंधुदुर्गमार्गे गोवा व कर्नाटकला शेकडो बोगदे व पुलांतून जोडणारा महाराष्ट्रातील निसर्गरम्य रेल्वे मार्ग कोणता?',
      opts: [
        'कोकण रेल्वे (Konkan Railway)',
        'डेक्कन क्वीन नॅरो-गेज',
        'विदर्भ कोळसा मार्ग',
        'खानदेश वाळवंट मार्ग',
      ],
      exp: 'कोकण रेल्वे ही सह्याद्रीच्या डोंगररांगांतील बोगदे व खाड्यांवरील पुलांतून जाणारी अभियांत्रिकी दृष्ट्या अद्वितीय रेल्वे आहे.',
    },
    hi: {
      q: 'सैकड़ों सुरंगों और पुलों से होकर मुंबई से रत्नागिरी-सिंधुदुर्ग होते हुए गोवा-कर्नाटक को जोड़ने वाला तटीय रेल मार्ग कौन-सा है?',
      opts: [
        'कोंकण रेलवे',
        'डेक्कन क्वीन नैरो-गेज',
        'विदर्भ कोयला लाइन',
        'खानदेश मरुस्थल मार्ग',
      ],
      exp: 'कोंकण रेलवे पश्चिमी तट की पहाड़ियों और खाड़ियों को पार कर महाराष्ट्र, गोवा और कर्नाटक को जोड़ती है।',
    },
  },
  {
    topic: 'Coastal vs Inland Salt Farming & Fisheries',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why are Salt Pans (Mithagare) and marine fishing thriving occupations around Palghar, Raigad, and Thane coastal belts?',
      opts: [
        'Shallow tidal creeks let sea water evaporate cleanly under sunshine to leave sea salt, while coastal waters support abundant fish',
        'High mountain snowfall freezes seawater into blocks',
        'Underground coal mines push sea salt to mountain tops',
        'Zero evaporation happens near the Arabian Sea',
      ],
      exp: 'Low-lying tidal flats around Mumbai, Palghar, and Raigad capture high-tide brine for solar evaporation salt pans.',
    },
    mr: {
      q: 'पालघर, ठाणे आणि रायगडच्या किनारी पट्ट्यात "मिठागरे" (Salt Pans) आणि सागरी मत्स्यव्यवसाय मोठ्या प्रमाणात का चालतो?',
      opts: [
        'खाड्यांच्या सपाट भागांत भरतीचे खारे पाणी अडवून सूर्यप्रकाशात बाष्पीभवनाने मीठ मिळवता येते व किनारी समुद्रात मासे भरपूर असतात',
        'हिमवर्षावामुळे समुद्राचे पाणी गोठते म्हणून',
        'डोंगराखाली कोळशाच्या खाणी आहेत म्हणून',
        'अरबी समुद्राजवळ बाष्पीभवन होत नाही म्हणून',
      ],
      exp: 'समुद्रकिनारी भरतीचे पाणी वाफ्यांत साठवून सौर बाष्पीभवनाद्वारे मीठ तयार केले जाते.',
    },
    hi: {
      q: 'पालघर, ठाणे और रायगढ़ के तटीय क्षेत्रों में नमक के आगर (Salt Pans) और समुद्री मत्स्य पालन प्रमुख व्यवसाय क्यों हैं?',
      opts: [
        'समतल ज्वारीय खाड़ियों में खारा पानी रोककर धूप से वाष्पीकरण द्वारा नमक प्राप्त होता है तथा तट पर मछलियाँ प्रचुर हैं',
        'पहाड़ी हिमपात से पानी जम जाता है',
        'कोयले की खदानों से नमक निकलता है',
        'अरब सागर के पास वाष्पीकरण नहीं होता',
      ],
      exp: 'ज्वार का पानी क्यारियों में भरकर सूर्य के ताप से वाष्पित कर समुद्री नमक तैयार किया जाता है।',
    },
  },
  {
    topic: 'Maharashtra Geographical Neighboring States',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which neighboring Indian state borders Maharashtra directly to its SOUTH and SOUTH-EAST?',
      opts: [
        'Karnataka (south) and Telangana (south-east), plus Goa at the south-west tip',
        'Gujarat and Rajasthan',
        'Uttarakhand and Himachal Pradesh',
        'Odisha and West Bengal',
      ],
      exp: 'Maharashtra touches Gujarat & MP (north), Chhattisgarh (east), Telangana (south-east), Karnataka (south), and Goa (south-west).',
    },
    mr: {
      q: 'महाराष्ट्राच्या दक्षिण आणि आग्नेय सीमेवर कोणती भारतीय राज्ये लागून आहेत?',
      opts: [
        'दक्षिणेस कर्नाटक, आग्नेयेस तेलंगणा आणि नैऋत्येस गोवा',
        'गुजरात आणि राजस्थान',
        'उत्तराखंड आणि हिमाचल प्रदेश',
        'ओडिशा आणि पश्चिम बंगाल',
      ],
      exp: 'महाराष्ट्राच्या दक्षिणेस कर्नाटक व गोवा तर आग्नेयेस तेलंगणा राज्य आहे (उत्तरेस मध्य प्रदेश, वायव्येस गुजरात, पूर्वेस छत्तीसगड).',
    },
    hi: {
      q: 'महाराष्ट्र की दक्षिण तथा दक्षिण-पूर्व सीमा से कौन-से भारतीय राज्य सटे हैं?',
      opts: [
        'दक्षिण में कर्नाटक, दक्षिण-पूर्व में तेलंगाना तथा दक्षिण-पश्चिम में गोवा',
        'गुजरात और राजस्थान',
        'उत्तराखंड और हिमाचल प्रदेश',
        'ओडिशा और पश्चिम बंगाल',
      ],
      exp: 'महाराष्ट्र के दक्षिण में कर्नाटक व गोवा तथा दक्षिण-पूर्व में तेलंगाना स्थित हैं।',
    },
  },
  {
    topic: 'Maharashtra State Bird, Animal, Flower & Tree Symbols',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which pair correctly identifies the State Animal and State Bird of Maharashtra?',
      opts: [
        'Indian Giant Squirrel (Shekru) and Yellow-footed Green Pigeon (Haroli / Haryal)',
        'Asiatic Lion and Peacock',
        'One-horned Rhinoceros and Great Indian Bustard',
        'Snow Leopard and House Sparrow',
      ],
      exp: 'Maharashtra’s State Animal is the Shekru (found at Bhimashankar), State Bird is Haryal, State Tree is Mango, and State Flower is Jarul (Tamhan).',
    },
    mr: {
      q: 'महाराष्ट्राचा राज्यप्राणी व राज्यपक्षी यांची अचूक जोडी कोणती?',
      opts: [
        'शेकरू (भीमाशंकरची मोठी खार) आणि हरियाल (पिवळ्या पायांचा हिरवा कबुतर)',
        'आशियाई सिंह आणि मोर',
        'एकशिंगी गेंडा आणि माळढोक',
        'हिमबिबट्या आणि चिमणी',
      ],
      exp: 'महाराष्ट्राचा राज्यप्राणी शेकरू, राज्यपक्षी हरियाल, राज्यवृक्ष आंबा आणि राज्यफूल ताम्हण (जारुळ) आहे.',
    },
    hi: {
      q: 'महाराष्ट्र का राजकीय पशु और राजकीय पक्षी कौन-सा युग्म सही दर्शाता है?',
      opts: [
        'विशाल गिलहरी (शेकरू) तथा पीले पैरों वाला हरा कबूतर (हरियाल)',
        'एशियाई शेर और मोर',
        'एक सींग वाला गैंडा और गोडावण',
        'हिम तेंदुआ और गौरैया',
      ],
      exp: 'महाराष्ट्र का राजकीय पशु शेकरू, पक्षी हरियाल, वृक्ष आम तथा पुष्प ताम्हण (जरूल) है।',
    },
  },
  {
    topic: 'Maharashtra Administrative Geography – Koyna Hydro Power',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why is the Koyna Project in Satara district often called the "Lifeline of Maharashtra" in school EVS textbooks?',
      opts: [
        'It is one of the state’s largest hydroelectric power generators supplying electricity across Maharashtra alongside irrigation',
        'It is the world’s longest salt canal',
        'It produces geothermal lava heat',
        'It mines natural diamonds from reservoirs',
      ],
      exp: 'Koyna Hydroelectric Project (Shivsagar reservoir) generates vital peak electricity for Maharashtra.',
    },
    mr: {
      q: 'सातारा जिल्ह्यातील "कोयना प्रकल्पास" महाराष्ट्राची भाग्यरेषा / जीवनरेषा का म्हटले जाते?',
      opts: [
        'त्यातून राज्यातील सर्वात मोठ्या जलविद्युत प्रकल्पाद्वारे मोठ्या प्रमाणावर वीजनिर्मिती व सिंचन होते',
        'तो जगातील सर्वात लांब खारा कालवा आहे',
        'तेथून भू-औष्णिक वीज काढली जाते',
        'धरणांतून हिरे काढले जातात',
      ],
      exp: 'कोयना (शिवसागर जलाशय) जलविद्युत प्रकल्प महाराष्ट्राला मोठा वीजपुरवठा करतो.',
    },
    hi: {
      q: 'सातारा जिले की "कोयना परियोजना" को महाराष्ट्र की जीवनरेखा क्यों कहा जाता है?',
      opts: [
        'यह राज्य की प्रमुख जलविद्युत एवं सिंचाई परियोजना है जो बड़े हिस्से को बिजली उपलब्ध कराती है',
        'यह खारे पानी की नहर है',
        'यहाँ से कोयला निकलता है',
        'यहाँ हीरे की खदानें हैं',
      ],
      exp: 'कोयना जलविद्युत परियोजना (शिवसागर जलाशय) महाराष्ट्र को प्रमुख विद्युत ऊर्जा प्रदान करती है।',
    },
  },
  {
    topic: 'Mangrove Forests Protection Along Creeks',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why is conserving dense Mangrove shrubs (Kandalvan / Tivar) along Thane, Navi Mumbai, and Konkan creeks crucial for coastal towns?',
      opts: [
        'Their tangled stilt roots anchor mudbanks against tidal erosion, absorb cyclone wave fury, and shelter fish nurseries',
        'They drain ocean water completely dry',
        'They grow best in dry desert sand dunes',
        'They scare monsoon clouds away',
      ],
      exp: 'Coastal mangroves serve as natural bio-shields dampening storm surges and protecting marine biodiversity.',
    },
    mr: {
      q: 'ठाणे, नवी मुंबई व कोकणच्या खाड्यांच्या कडेला "कांदळवन" (Mangroves / तिवर) जंगले वाचवणे का अत्यंत गरजेचे आहे?',
      opts: [
        'त्यांची मुळे दलदलीची धूप रोखतात, चक्रीवादळाच्या लाटांचा वेग कमी करतात आणि लहान माशांना सुरक्षित निवारा देतात',
        'ती समुद्राचे पाणी पूर्णपणे शोषून वाळवतात',
        'ती कोरड्या वाळवंटात वाढतात',
        'ती पावसाळी ढग पळवून लावतात',
      ],
      exp: 'कांदळवने किनारपट्टीचे नैसर्गिक संरक्षण कवच असून सागरी परिसंस्थेचे प्रजनन केंद्र आहेत.',
    },
    hi: {
      q: 'मुंबई, ठाणे और कोंकण की खाड़ियों के किनारे "मैंग्रोव वन" (कांदळवन) का संरक्षण तटीय नगरों के लिए क्यों आवश्यक है?',
      opts: [
        'इनकी उलझी जड़ें मिट्टी के कटाव को रोकती हैं, चक्रवाती लहरों का वेग कम करती हैं तथा मछलियों की नर्सरी बनाती हैं',
        'ये समुद्र सुखा देती हैं',
        'ये केवल रेगिस्तान में उगती हैं',
        'ये मानसूनी बादल रोकती हैं',
      ],
      exp: 'मैंग्रोव वन तटीय कटाव और समुद्री तूफानों से प्राकृतिक सुरक्षा ढाल का कार्य करते हैं।',
    },
  },
  {
    topic: 'Bhandardara / Wilson Dam & Harishchandragad Region',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which river feeds the scenic Bhandardara (Wilson Dam / Arthur Lake) and Randha Falls located in the northern Sahyadris of Ahilyanagar district?',
      opts: ['Pravara River', 'Tapi River', 'Wainganga River', 'Savitri River'],
      exp: 'The Pravara river (tributary of Godavari) flows past Randha Falls and is impounded at Wilson Dam, Bhandardara.',
    },
    mr: {
      q: 'अहिल्यानगर जिल्ह्यातील भंडारदरा (विल्सन धरण) आणि रंधा धबधबा कोणत्या नदीवर आहेत?',
      opts: ['प्रवरा नदी', 'तापी नदी', 'वैनगंगा नदी', 'सावित्री नदी'],
      exp: 'गोदावरीची उपनदी असलेली प्रवरा नदी भंडारदरा येथील विल्सन धरणातून व रंधा धबधब्यातून वाहते.',
    },
    hi: {
      q: 'अहिल्यानगर जिले का सुंदर भंडारदरा (विल्सन बाँध) और रंधा जलप्रपात किस नदी पर स्थित हैं?',
      opts: ['प्रवरा नदी', 'तापी नदी', 'वैनगंगा नदी', 'सावित्री नदी'],
      exp: 'प्रवरा नदी (गोदावरी की सहायक) पर भंडारदरा का विल्सन बाँध और रंधा जलप्रपात स्थित हैं।',
    },
  },
  {
    topic: 'Vidarbha Eastern Forest & Bamboo Belt Districts',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which easternmost Vidarbha district is famous in Maharashtra EVS maps for dense teak and bamboo forests, tribal Gond crafts, and rich biodiversity?',
      opts: ['Gadchiroli', 'Sangli', 'Beed', 'Palghar'],
      exp: 'Gadchiroli (along with Chandrapur & Gondia) contains Maharashtra’s densest forest cover and bamboo resources.',
    },
    mr: {
      q: 'महाराष्ट्रातील सर्वाधिक दाट साग व बांबूची जंगले आणि समृद्ध आदिवासी हस्तकलेसाठी पूर्वेकडील कोणता जिल्हा विशेष प्रसिद्ध आहे?',
      opts: ['गडचिरोली', 'सांगली', 'बीड', 'पालघर'],
      exp: 'पूर्वेकडील गडचिरोली, चंद्रपूर व गोंदिया जिल्ह्यांत राज्यातील सर्वाधिक दाट वनसंपदा आढळते.',
    },
    hi: {
      q: 'महाराष्ट्र में घने सागौन व बाँस के जंगलों तथा आदिवासी हस्तशिल्प के लिए पूर्वी विदर्भ का कौन-सा जिला प्रसिद्ध है?',
      opts: ['गढ़चिरौली', 'सांगली', 'बीड', 'पालघर'],
      exp: 'गढ़चिरौली (तथा चंद्रपुर-गोंदिया) महाराष्ट्र के सर्वाधिक सघन वन-क्षेत्रों वाले जिले हैं।',
    },
  },
  {
    topic: 'Western Ghats Biodiversity Hotspot Status',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why has UNESCO recognized Maharashtra’s Sahyadri range (including Kaas Plateau near Satara) within the Western Ghats World Natural Heritage?',
      opts: [
        'Extreme endemism of seasonal wildflowers, amphibians, medicinal herbs, and evergreen shola forests found nowhere else on Earth',
        'Large deposits of desert gypsum',
        'Highest concentration of steel factories',
        'Longest snow glaciers in Asia',
      ],
      exp: 'Kaas Plateau ("Valley of Flowers of Maharashtra") hosts hundreds of rare endemic monsoon plants within the UNESCO Western Ghats hotspot.',
    },
    mr: {
      q: 'सातारा जवळील "कास पठारासह" सह्याद्रीचा (पश्चिम घाट) समावेश युनेस्कोच्या जागतिक नैसर्गिक वारसा यादीत का केला आहे?',
      opts: [
        'जगात अन्यत्र न आढळणाऱ्या दुर्मिळ स्थानिक रानफुले, औषधी वनस्पती आणि उभयचर प्राण्यांच्या अद्वितीय जैवविविधतेमुळे',
        'वाळवंटातील जिप्समच्या साठ्यामुळे',
        'पोलाद कारखान्यांच्या सर्वाधिक संख्येमुळे',
        'आशियातील सर्वात लांब हिमनद्यांमुळे',
      ],
      exp: 'पश्चिम घाट हा जागतिक जैवविविधतेचा हॉटस्पॉट असून कास पठार दुर्मीळ रानफुलांसाठी जगप्रसिद्ध आहे.',
    },
    hi: {
      q: 'सातारा के कास पठार सहित सह्याद्री (पश्चिमी घाट) को यूनेस्को विश्व प्राकृतिक धरोहर में क्यों शामिल किया गया है?',
      opts: [
        'अत्यंत दुर्लभ स्थानिक जंगली फूलों, औषधीय पौधों और उभयचरों की अनूठी जैव-विविधता के कारण',
        'मरुस्थलीय जिप्सम भंडार के कारण',
        'इस्पात कारखानों के कारण',
        'बर्फीले हिमनदों के कारण',
      ],
      exp: 'पश्चिमी घाट (सह्याद्री) विश्व के प्रमुख जैव-विविधता हॉटस्पॉट में से एक है।',
    },
  },
  {
    topic: 'Purna & Penganga Plateau Drainage Direction',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Into which major river basin do the Wardha and Wainganga rivers unite (as Pranhita) before ultimately meeting the sea?',
      opts: [
        'Godavari River Basin (flowing into the Bay of Bengal)',
        'Tapi Basin (Arabian Sea)',
        'Narmada Basin',
        'Indus Basin',
      ],
      exp: 'Wardha and Wainganga converge as the Pranhita river, joining the Godavari basin eastwards toward the Bay of Bengal.',
    },
    mr: {
      q: 'विदर्भातील वर्धा आणि वैनगंगा नद्या एकत्र येऊन ("प्राणहिता" नावाने) पुढे कोणत्या प्रमुख नदीखोऱ्यास मिळतात?',
      opts: [
        'गोदावरी नदीखोरे (बंगालच्या उपसागराकडे वाहणारे)',
        'तापी नदीखोरे',
        'नर्मदा नदीखोरे',
        'सिंधू नदीखोरे',
      ],
      exp: 'वर्धा व वैनगंगा यांचा संगम प्राणहिता नदी बनून दक्षिणेस गोदावरी नदीला मिळतो.',
    },
    hi: {
      q: 'विदर्भ की वर्धा और वैनगंगा नदियाँ मिलकर ("प्राणहिता" के रूप में) किस प्रमुख नदी बेसिन में विलीन होती हैं?',
      opts: [
        'गोदावरी नदी बेसिन (बंगाल की खाड़ी की ओर)',
        'तापी बेसिन',
        'नर्मदा बेसिन',
        'सिंधु बेसिन',
      ],
      exp: 'वर्धा व वैनगंगा का संगम प्राणहिता नदी बनकर आगे गोदावरी में मिलता है।',
    },
  },
  {
    topic: 'Solapur Textiles & Kolhapur Traditional Crafts',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In Std 4 EVS ("Our District, Our State"), which two cities are paired correctly with their famous local traditional handicrafts?',
      opts: [
        'Solapur — Chaddars/terry towels & Paithan — handwoven Paithani silk sarees',
        'Ratnagiri — Woollen pashmina shawls & Nashik — Ivory carvings',
        'Wardha — Marine coral pearls & Chandrapur — Ship anchor smithing',
        'Satara — Tea garden plucking & Thane — Glacial wool',
      ],
      exp: 'Paithani sarees (Paithan/Yeola) and Solapur chaddars carry GI recognition across Maharashtra.',
    },
    mr: {
      q: 'महाराष्ट्रातील पारंपरिक हस्तकला व उत्पादनांची कोणती जोडी तंतोतंत अचूक आहे?',
      opts: [
        'सोलापूर — सोलापुरी चादरी आणि पैठण/येवला — हातमागाच्या पैठणी साड्या',
        'रत्नागिरी — पश्मीना शाली',
        'वर्धा — सागरी मोती',
        'सातारा — चहाचे मळे',
      ],
      exp: 'पैठण व येवल्याची पैठणी तसेच सोलापूरची चादर ही महाराष्ट्राची भौगोलिक मानांकन (GI) प्राप्त वैशिष्ट्ये आहेत.',
    },
    hi: {
      q: 'महाराष्ट्र के पारंपरिक शिल्प व उत्पादों का कौन-सा युग्म बिल्कुल सही है?',
      opts: [
        'सोलापुर — सोलापुरी चादरें और पैठण/येवला — हाथ से बुनी पैठणी रेशमी साड़ियाँ',
        'रत्नागिरी — ऊनी पश्मीना शॉल',
        'वर्धा — समुद्री मोती',
        'सातारा — चाय बागान',
      ],
      exp: 'सोलापुर की चादर और पैठण की पैठणी साड़ियाँ महाराष्ट्र की प्रसिद्ध भौगोलिक संकेतक (GI) धरोहर हैं।',
    },
  },
  {
    topic: 'Season Cycle & Tropical Monsoon Calendar in India',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Between June and September in Maharashtra, which moisture-bearing seasonal wind system provides nearly 85% of the state’s annual rainfall for Kharif crops?',
      opts: [
        'South-West Monsoon Winds arriving from the Arabian Sea',
        'Dry North-East Polar Winds',
        'Mediterranean Western Disturbances',
        'Local afternoon sea-land breezes in February',
      ],
      exp: 'The South-West Monsoon strikes the Konkan coast in early June, nourishing Kharif rice, jowar, bajra, and pulses.',
    },
    mr: {
      q: 'जून ते सप्टेंबर या कालावधीत महाराष्ट्रात खरीप पिकांसाठी जवळपास ८५% पाऊस कोणत्या मोसमी वाऱ्यांमुळे पडतो?',
      opts: [
        'अरबी समुद्रावरून येणारे नैऋत्य मोसमी वारे (South-West Monsoon)',
        'कोरडे ईशान्य ध्रुवीय वारे',
        'भूमध्य सागरी पश्चिमी चक्रवात',
        'फेब्रुवारीतील स्थानिक वारे',
      ],
      exp: 'जूनच्या पहिल्या आठवड्यात केरळमार्गे कोकणात पोहोचणारे नैऋत्य मोसमी वारे महाराष्ट्राचा मुख्य पावसाळा घडवतात.',
    },
    hi: {
      q: 'जून से सितंबर के बीच महाराष्ट्र में खरीफ फसलों हेतु लगभग ८५% वर्षा किन पवनों से प्राप्त होती है?',
      opts: [
        'अरब सागर से आने वाली दक्षिण-पश्चिम मानसूनी पवनें',
        'शुष्क उत्तर-पूर्वी ध्रुवीय पवनें',
        'पश्चिमी विक्षोभ',
        'फरवरी की स्थानीय पवनें',
      ],
      exp: 'दक्षिण-पश्चिम मानसून जून में कोंकण तट से टकराकर महाराष्ट्र की प्रमुख वर्षा लाता है।',
    },
  },
  {
    topic: 'Kharif vs Rabi Agricultural Seasons',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which crops are predominantly sown at the onset of the June monsoon rains and harvested in autumn (Kharif Season) in Maharashtra?',
      opts: [
        'Rice (Paddy), Bajra, Cotton, Soybean, and Tur',
        'Wheat, Gram (Harbhara), and Linseed',
        'Apple, Saffron, and Cherry',
        'Winter Mustard only',
      ],
      exp: 'Kharif crops (June–October) depend on monsoon showers; Rabi crops like wheat and gram (harbhara) are winter-grown (Oct–Mar).',
    },
    mr: {
      q: 'जूनमध्ये पावसाळ्याच्या सुरुवातीस पेरली जाणारी व ऑक्टोबरच्या सुमारास काढली जाणारी महाराष्ट्रातील प्रमुख "खरीप पिके" कोणती?',
      opts: [
        'भात (तांदूळ), बाजरी, कापूस, सोयाबीन आणि तूर',
        'गहू, हरभरा आणि जवस',
        'सफरचंद व केशर',
        'फक्त हिवाळी मोहरी',
      ],
      exp: 'भात, बाजरी, कापूस व सोयाबीन ही खरीप (पावसाळी) पिके असून गहू व हरभरा ही रब्बी (हिवाळी) पिके आहेत.',
    },
    hi: {
      q: 'महाराष्ट्र में जून में मानसून की शुरुआत में बोई जाने वाली प्रमुख "खरीफ फसलें" कौन-सी हैं?',
      opts: [
        'धान (चावल), बाजरा, कपास, सोयाबीन और अरहर (तूर)',
        'गेहूँ, चना और अलसी',
        'सेब और केसर',
        'केवल सर्दियों की सरसों',
      ],
      exp: 'धान, बाजरा, कपास और सोयाबीन खरीफ फसलें हैं, जबकि गेहूँ व चना रबी फसलें हैं।',
    },
  },
  {
    topic: 'Chikhaldara Hill Station Amravati Gavilgad Range',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Known as the "Kashmir of Vidarbha" and Maharashtra’s famous coffee-growing plateau, Chikhaldara sits in which mountain range of Amravati district?',
      opts: ['Satpura / Gavilgad Range', 'Ajanta Range', 'Mahadeo Hills', 'Nilgiri Hills'],
      exp: 'Chikhaldara lies in the Gavilgad spur of the Satpura range near Melghat Tiger Reserve.',
    },
    mr: {
      q: 'कॉफीच्या बागा व निसर्गसौंदर्यासाठी प्रसिद्ध असलेले अमरावती जिल्ह्यातील "चिखलदरा" हे थंड हवेचे ठिकाण कोणत्या पर्वतरांगेत आहे?',
      opts: ['सातपुडा / गाविलगड रांग', 'अजिंठा रांग', 'महादेव डोंगर', 'नीलगिरी पर्वत'],
      exp: 'अमरावती जिल्ह्यातील चिखलदरा हे सातपुडा पर्वताच्या गाविलगड रांगेत मेळघाट व्याघ्र प्रकल्पाजवळ वसलेले आहे.',
    },
    hi: {
      q: 'कॉफी बागानों के लिए प्रसिद्ध अमरावती जिले का "चिखलदरा" हिल स्टेशन किस पर्वत श्रेणी में स्थित है?',
      opts: ['सतपुड़ा / गाविलगढ़ श्रेणी', 'अजंता श्रेणी', 'महादेव पहाड़ियाँ', 'नीलगिरि पर्वत'],
      exp: 'चिखलदरा सतपुड़ा की गाविलगढ़ श्रेणी में मेलघाट बाघ अभयारण्य के निकट स्थित है।',
    },
  },
  {
    topic: 'Contour Bunding & Terraced Step Farming on Slopes',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why do farmers along steep Sahyadri hillsides cultivate paddy (rice) in flat stepped terraces (Khachar Sheti)?',
      opts: [
        'Steps slow rapid rainwater runoff, prevent fertile topsoil erosion, and hold shallow standing water for rice saplings',
        'Steps allow tractors to drive vertically straight up cliffs',
        'Terraces dry the soil faster for desert cacti',
        'Terraces keep birds permanently invisible',
      ],
      exp: 'Terrace cultivation checks slope erosion and traps monsoon water cleanly for hill rice cultivation.',
    },
    mr: {
      q: 'सह्याद्रीच्या डोंगरउतारांवर शेतकरी भाताच्या शेतीसाठी "खाचर शेती" (Terrace / Step Farming) का करतात?',
      opts: [
        'पायऱ्यांमुळे पावसाच्या पाण्याचा वेग मंदावतो, सुपीक मातीची धूप थांबते आणि भातासाठी पाणी रोखून ठेवता येते',
        'उभ्या कड्यावरून ट्रॅक्टर वेगाने नेता येतो म्हणून',
        'जमीन पूर्ण कोरडी ठेवण्यासाठी',
        'पक्षी शेतात येऊ नयेत म्हणून',
      ],
      exp: 'डोंगरउतारावर पायऱ्या केल्याने माती वाहून न जाता भात पिकासाठी आवश्यक पाणी शेतात थांबून राहते.',
    },
    hi: {
      q: 'सह्याद्री की ढलानों पर किसान धान उगाने हेतु सीढ़ीदार खेत (Terrace Farming) क्यों बनाते हैं?',
      opts: [
        'सीढ़ियाँ तेज़ बहते वर्षा जल को धीमा कर मृदा अपरदन रोकती हैं और धान के लिए पानी रोके रखती हैं',
        'ताकि खड़ी ढलान पर ट्रैक्टर चल सके',
        'मिट्टी सुखाने के लिए',
        'पक्षियों को दूर रखने के लिए',
      ],
      exp: 'सीढ़ीदार खेती पहाड़ी ढलानों पर मिट्टी का कटाव रोककर जल-संरक्षण करती है।',
    },
  },
  {
    topic: 'Maharashtra Caves – Ajanta, Ellora & Elephanta',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which UNESCO World Heritage cave complex near Chhatrapati Sambhajinagar is famous for rock-cut temples of Kailasa carved top-down from a SINGLE basalt hill?',
      opts: ['Ellora Caves (Verul)', 'Elephanta Caves (Gharapuri)', 'Karla Caves', 'Pandavleni Caves'],
      exp: 'Cave 16 (Kailasa Temple) at Ellora (Verul) is the world’s largest monolithic top-down rock excavation.',
    },
    mr: {
      q: 'एकाच अखंड बेसॉल्ट डोंगरातून कळसापासून पायाकडे कोरलेले जगप्रसिद्ध "कैलास मंदिर" छत्रपती संभाजीनगर जवळील कोणत्या लेण्यांत आहे?',
      opts: ['वेरूळ लेणी (Ellora Caves)', 'घारापुरी लेणी (Elephanta)', 'कार्ले लेणी', 'पांडवलेणी'],
      exp: 'वेरूळ (एलोरा) येथील लेणे क्र. १६ मधील कैलास मंदिर हे एकाच खडकात वरून खाली कोरलेले अद्वितीय शिल्प आहे.',
    },
    hi: {
      q: 'एक ही विशाल चट्टान को ऊपर से नीचे तराशकर बनाया गया विश्वप्रसिद्ध "कैलास मंदिर" किस गुफा समूह में स्थित है?',
      opts: ['एलोरा की गुफाएँ (वेरूल)', 'एलिफेंटा गुफाएँ', 'कार्ला गुफाएँ', 'पांडवलेणी'],
      exp: 'एलोरा (छत्रपति संभाजीनगर के पास) की गुफा १६ का कैलास मंदिर एकाश्म वास्तुकला का अद्भुत उदाहरण है।',
    },
  },
  {
    topic: 'Bhima-Sina Basin & Pandharpur Pilgrimage River',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Along the crescent-shaped banks ("Chandrabhaga") of which river does the historic town of Pandharpur sit in Solapur district?',
      opts: ['Bhima River', 'Godavari River', 'Mula River', 'Tapi River'],
      exp: 'Originating at Bhimashankar, the Bhima river bends into a half-moon curve at Pandharpur and is lovingly called Chandrabhaga.',
    },
    mr: {
      q: 'सोलापूर जिल्ह्यातील श्रीक्षेत्र पंढरपूर येथे चंद्राच्या कोरीसारखा आकार घेतल्याने कोणत्या नदीस "चंद्रभागा" या नावाने ओळखले जाते?',
      opts: ['भीमा नदी', 'गोदावरी नदी', 'मुळा नदी', 'तापी नदी'],
      exp: 'भीमाशंकर येथे उगम पावणारी भीमा नदी पंढरपुरात चंद्रकोरीप्रमाणे वळण घेतल्याने तिला चंद्रभागा म्हणतात.',
    },
    hi: {
      q: 'सोलापुर जिले के पंढरपुर में अर्धचंद्राकार मोड़ लेने के कारण किस नदी को "चंद्रभागा" कहा जाता है?',
      opts: ['भीमा नदी', 'गोदावरी नदी', 'मुला नदी', 'तापी नदी'],
      exp: 'भीमाशंकर से निकलने वाली भीमा नदी पंढरपुर में अर्धचंद्र आकार में मुड़ती है, जिसे चंद्रभागा कहते हैं।',
    },
  },
  {
    topic: 'Soil Conservation by Tree Plantation & Shelter Belts',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In dry wind-swept areas of Marathwada and Solapur, planting dense rows of trees along field borders helps crops mainly by:',
      opts: [
        'Acting as Windbreaks (Shelterbelts) that lower dry wind speed, curb soil blowing away, and slow evaporation',
        'Blocking all sunlight for entire months',
        'Turning fields into salty lakes',
        'Removing oxygen from surrounding soil',
      ],
      exp: 'Field shelterbelts reduce wind velocity, protecting fertile topsoil and conserving precious soil moisture.',
    },
    mr: {
      q: 'मराठवाडा व सोलापूरसारख्या कोरड्या भागांत शेताच्या बांधावर दाट झाडांची रांग (वारा-रोधक पट्टे) लावण्याचा मुख्य फायदा कोणता?',
      opts: [
        'जोरदार वाऱ्याचा वेग अडवून सुपीक माती उडून जाणे रोखणे व जमिनीतील बाष्पीभवन कमी करणे',
        'सूर्यप्रकाश पूर्णपणे बंद करणे',
        'शेततळ्यात खारट पाणी भरणे',
        'मातीतील ऑक्सिजन काढून घेणे',
      ],
      exp: 'बांधावरील झाडे वाऱ्याची गती कमी करून धूप व ओलाव्याचा अपव्यय टाळतात.',
    },
    hi: {
      q: 'शुष्क क्षेत्रों में खेतों की मेड़ों पर सघन वृक्षों की कतारें (वायु-अवरोधक पट्टियाँ) लगाने का मुख्य लाभ क्या है?',
      opts: [
        'तेज़ हवा का वेग कम कर उपजाऊ मिट्टी का कटाव रोकना तथा नमी का वाष्पीकरण घटाना',
        'सूर्य का प्रकाश पूरी तरह बंद करना',
        'खेत में खारा पानी भरना',
        'मिट्टी की ऑक्सीजन समाप्त करना',
      ],
      exp: 'रक्षक मेखलाएँ हवा की गति घटाकर पवन अपरदन और जल-वाष्पीकरण दोनों से बचाती हैं।',
    },
  },
  {
    topic: 'Maharashtra 36 Districts & Coastal Konkan Count',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Maharashtra’s administrative geography comprises 36 districts divided across 6 revenue divisions. Which coastal strip includes Palghar, Thane, Mumbai, Raigad, Ratnagiri, and Sindhudurg?',
      opts: ['Konkan Division', 'Pune (Desh) Division', 'Amravati Division', 'Nagpur Division'],
      exp: 'Konkan Division covers the entire Arabian Sea coastal belt (Mumbai City, Mumbai Suburban, Thane, Palghar, Raigad, Ratnagiri, Sindhudurg = 7 districts).',
    },
    mr: {
      q: 'महाराष्ट्रातील ३६ जिल्ह्यांपैकी पालघर, ठाणे, मुंबई, रायगड, रत्नागिरी व सिंधुदुर्ग हे सागरी किनारपट्टीचे जिल्हे कोणत्या प्रशासकीय विभागात येतात?',
      opts: ['कोकण विभाग', 'पुणे विभाग', 'अमरावती विभाग', 'नागपूर विभाग'],
      exp: 'कोकण विभागात अरबी समुद्रकिनाऱ्यावरील सर्व ७ सागरी जिल्ह्यांचा समावेश होतो.',
    },
    hi: {
      q: 'महाराष्ट्र के ३६ जिलों में से पालघर, ठाणे, मुंबई, रायगढ़, रत्नागिरी व सिंधुदुर्ग किस राजस्व संभाग में आते हैं?',
      opts: ['कोंकण संभाग', 'पुणे संभाग', 'अमरावती संभाग', 'नागपुर संभाग'],
      exp: 'कोंकण संभाग के अंतर्गत अरब सागर तट से सटे सभी तटीय जिले आते हैं।',
    },
  },
  {
    topic: 'Salt-Water vs Fresh-Water Creek Ecosystem',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What makes a coastal "Creek" (Khadi, such as Thane Creek or Dabhol Creek) ecologically distinct from an inland freshwater pond?',
      opts: [
        'Fresh river water mixes daily with rising ocean high-tide saltwater, forming brackish water rich in flamingoes, crabs, and mangroves',
        'Water stays frozen beneath glaciers all year',
        'No fish or birds can survive near brackish water',
        'It lies above 3,000 m mountain altitude',
      ],
      exp: 'Estuaries and tidal creeks blend river water and sea tides, making them vibrant feeding grounds for migratory flamingos and aquatic life.',
    },
    mr: {
      q: 'ठाणे खाडी किंवा दाभोळ खाडी यांसारखी किनारी "खाडी" (Creek) ही गोड्या पाण्याच्या तलावापेक्षा वेगळी कशी असते?',
      opts: [
        'भरतीच्या वेळी समुद्राचे खारे पाणी नदीच्या गोड्या पाण्यात मिसळून मचूळ पाणी तयार होते, जे कांदळवन, खेकडे व रोहित (Flamingo) पक्ष्यांसाठी समृद्ध अन्नक्षेत्र असते',
        'तेथील पाणी वर्षभर गोठलेले असते',
        'त्यात कोणतेही जलचर जगू शकत नाहीत',
        'ती ३,००० मी उंच डोंगरावर असते',
      ],
      exp: 'खाडीत समुद्राचे खारे पाणी व नदीचे गोडे पाणी एकत्र येत असल्याने तेथे विशिष्ट मचूळ जलपरिसंस्था तयार होते.',
    },
    hi: {
      q: 'ठाणे या दाभोल जैसी तटीय "खाड़ी" (Creek) मीठे पानी के तालाब से किस प्रकार भिन्न होती है?',
      opts: [
        'ज्वार के समय समुद्र का खारा पानी नदी के मीठे पानी से मिलकर खारा-मीठा (Brackish) जल बनाता है जो मैंग्रोव व फ्लेमिंगो पक्षियों का आश्रय है',
        'पानी वर्ष भर जमा रहता है',
        'यहाँ कोई जीव जीवित नहीं रह सकता',
        'यह ३,००० मी ऊँचाई पर स्थित है',
      ],
      exp: 'खाड़ियों में नदी और समुद्र के जल के संगम से अत्यंत समृद्ध ज्वारनदमुख (Estuarine) पारिस्थितिकी बनती है।',
    },
  },
  {
    topic: 'Mineral Wealth in Eastern Maharashtra (Chandrapur/Nagpur)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which natural fossil fuel resource is mined extensively in Chandrapur, Nagpur, and Yavatmal districts of eastern Vidarbha to run thermal power stations like Koradi and Chandrapur?',
      opts: ['Coal', 'Crude ocean petroleum oil', 'Uranium glass', 'Diamond crystals'],
      exp: 'The Wardha-Godavari Gondwana rock belt in eastern Vidarbha holds rich coal deposits fueling major thermal stations.',
    },
    mr: {
      q: 'कोराडी व चंद्रपूर औष्णिक वीज केंद्रांना लागणारा कोणता प्रमुख खनिज इंधन साठा पूर्व विदर्भातील चंद्रपूर, नागपूर व यवतमाळ जिल्ह्यांत आढळतो?',
      opts: ['दगडी कोळसा (Coal)', 'समुद्री खनिज तेल', 'युरेनियम काच', 'हिरे'],
      exp: 'पूर्व विदर्भातील वर्धा-वैनगंगा खोऱ्यात दगडी कोळशाच्या मोठ्या खाणी आहेत.',
    },
    hi: {
      q: 'कोराडी व चंद्रपुर ताप विद्युत केंद्रों के लिए पूर्वी विदर्भ के चंद्रपुर, नागपुर व यवतमाल जिलों में किसका खनन प्रमुखता से होता है?',
      opts: ['कोयला (Coal)', 'कच्चा समुद्री पेट्रोलियम', 'यूरेनियम', 'हीरे'],
      exp: 'पूर्वी विदर्भ की गोंडवाना चट्टानों में कोयले के समृद्ध भंडार पाए जाते हैं।',
    },
  },
  {
    topic: 'Offshore Bombay High Energy Resource',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Located roughly 160 km off Mumbai in the Arabian Sea, "Mumbai High" (Bombay High) is India’s renowned offshore production field for:',
      opts: [
        'Crude Petroleum Oil and Natural Gas',
        'Bauxite aluminium ore',
        'Fresh drinking icebergs',
        'Windmill wooden timber',
      ],
      exp: 'Drilled from the Sagar Samrat platform off Mumbai’s coast, Mumbai High supplies crucial offshore crude oil and natural gas.',
    },
    mr: {
      q: 'मुंबई किनाऱ्यापासून अरबी समुद्रात सुमारे १६० किमी अंतरावर असलेले "मुंबई हाय" हे क्षेत्र कशाच्या उत्पादनासाठी भारतभर प्रसिद्ध आहे?',
      opts: [
        'खनिज तेल (Petroleum) आणि नैसर्गिक वायू',
        'बॉक्साईट धातू',
        'गोड्या पाण्याचे हिमनग',
        'सागवान लाकूड',
      ],
      exp: 'अरबी समुद्रातील "मुंबई हाय" येथून "सागर सम्राट" सारख्या तळांद्वारे खनिज तेल व नैसर्गिक वायू काढला जातो.',
    },
    hi: {
      q: 'मुंबई तट से लगभग १६० किमी दूर अरब सागर में स्थित "मुंबई हाई" किसके उत्पादन के लिए प्रसिद्ध है?',
      opts: [
        'कच्चा पेट्रोलियम तेल एवं प्राकृतिक गैस',
        'बॉक्साइट अयस्क',
        'मीठे पानी के हिमखंड',
        'सागौन की लकड़ी',
      ],
      exp: 'मुंबई हाई भारत का प्रमुख अपतटीय (Offshore) पेट्रोलियम व प्राकृतिक गैस उत्पादक क्षेत्र है।',
    },
  },
  {
    topic: 'Ralegan Siddhi & Hiware Bazar Watershed Models',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In drought-prone Ahilyanagar district, which pair of Maharashtra villages transformed themselves into green water-surplus models through community Watershed Development (Jal-Sandharan)?',
      opts: [
        'Ralegan Siddhi and Hiware Bazar',
        'Alibag and Murud',
        'Matheran and Panchgani',
        'Dahanu and Tarapur',
      ],
      exp: 'Through contour trenches, check dams, shramdaan, and cropping discipline, Ralegan Siddhi and Hiware Bazar became global rural water-harvesting showcases.',
    },
    mr: {
      q: 'दुष्काळग्रस्त अहिल्यानगर जिल्ह्यात लोकसहभागातून पाणलोट क्षेत्र विकासाद्वारे (जलसंधारण) हरित व पाणीसमृद्ध आदर्श ठरलेली दोन गावे कोणती?',
      opts: [
        'राळेगणसिद्धी आणि हिवरे बाजार',
        'अलिबाग आणि मुरुड',
        'माथेरान आणि पाचगणी',
        'डहाणू आणि तारापूर',
      ],
      exp: 'सलग समतल चर, बंधारे व ग्रामश्रमदानातून राळेगणसिद्धी आणि हिवरे बाजार जलसंधारणाचे जागतिक आदर्श ठरले आहेत.',
    },
    hi: {
      q: 'सूखा-प्रवण अहिल्यानगर जिले के कौन-से दो गाँव सामुदायिक जलसंभरण विकास (Jal-Sandharan) द्वारा जल-समृद्ध आदर्श मॉडल बने हैं?',
      opts: [
        'रालेगण सिद्धि और हिवरे बाज़ार',
        'अलीबाग और मुरुड',
        'माथेरान और पंचगनी',
        'डहाणू और तारापुर',
      ],
      exp: 'चेक डैम, समतल खाई और श्रमदान से रालेगण सिद्धि व हिवरे बाज़ार विश्व-प्रसिद्ध जल संरक्षण उदाहरण बने हैं।',
    },
  },
  {
    topic: 'Traditional Monsoon Food & Coastal Diet Adaptation',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why is boiled rice with fish curry or coconut-rich lentil curry the staple daily meal in Konkan, whereas jowar/bajra bhakri with spicy pithla/thecha dominates inland Plateau (Desh/Marathwada)?',
      opts: [
        'Local staple diets naturally reflect regional climate, soil, rainfall, and locally abundant crops/marine resources',
        'Plateau residents are banned from eating rice',
        'Konkan receives zero rainfall for rice crops',
        'Transporting spices is illegal in cities',
      ],
      exp: 'NCERT/Balbharati EVS highlights how food habits adapt closely to local climate, water availability, and traditional agriculture.',
    },
    mr: {
      q: 'कोकणात भात-मासे-नारळाचे पदार्थ तर देश/मराठवाड्यात ज्वारी-बाजरीची भाकरी व झणझणीत पिठले-ठेचा हा मुख्य आहार असण्यामागे कोणते भौगोलिक कारण आहे?',
      opts: [
        'स्थानिक हवामान, पाऊस, मृदा आणि तेथे नैसर्गिकरीत्या पिकणारे धान्य-सागरी संपत्ती यानुसार आहारसंस्कृती विकसित होते',
        'पठारावर भात खाण्यास बंदी आहे',
        'कोकणात अजिबात पाऊस पडत नाही',
        'शहरांत मसाले विकण्यास मनाई असते',
      ],
      exp: 'कोकणातील अतिपावसात भात व किनारपट्टीवर मासे मुबलक मिळतात, तर कमी पावसाच्या पठारावर ज्वारी-बाजरी उत्तम पिकते.',
    },
    hi: {
      q: 'कोंकण में चावल-नारियल-मछली तथा पठारी क्षेत्र (देश/मराठवाड़ा) में ज्वार-बाजरे की भाकरी प्रमुख भोजन होने का मुख्य कारण क्या है?',
      opts: [
        'स्थानीय जलवायु, वर्षा, मिट्टी और क्षेत्रीय फसलों/संसाधनों की उपलब्धता के अनुसार पारंपरिक खान-पान विकसित होता है',
        'पठार पर चावल खाना वर्जित है',
        'कोंकण में वर्षा नहीं होती',
        'शहरों में मसाले नहीं मिलते',
      ],
      exp: 'प्रादेशिक जलवायु व कृषि उत्पादन ही स्थानीय भोजन संस्कृति को आकार देते हैं।',
    },
  },
  {
    topic: 'Protected National Parks & Sanctuaries in Maharashtra',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Tadoba-Andhari (Chandrapur), Pench (Nagpur), and Melghat (Amravati) are Maharashtra’s renowned protected:',
      opts: [
        'Tiger Reserves / National Parks',
        'Flamingo Salt Pans',
        'Deep-sea Coral Gardens',
        'Commercial Mining Quarries',
      ],
      exp: 'Tadoba-Andhari is Maharashtra’s oldest and largest Tiger Reserve alongside Melghat, Pench, Navegaon-Nagzira, Bor, and Sahyadri.',
    },
    mr: {
      q: 'ताडोबा-अंधारी (चंद्रपूर), पेंच (नागपूर) आणि मेळघाट (अमरावती) ही महाराष्ट्रातील संरक्षित वने प्रामुख्याने कशासाठी प्रसिद्ध आहेत?',
      opts: [
        'व्याघ्र प्रकल्प व राष्ट्रीय उद्याने (Tiger Reserves)',
        'फ्लेमिंगो मिठागरे',
        'खोल समुद्रातील प्रवाळ बेटे',
        'व्यावसायिक दगड खाणी',
      ],
      exp: 'ताडोबा-अंधारी, मेळघाट, पेंच, सह्याद्री, बोर आणि नवेगाव-नागझिरा हे महाराष्ट्रातील प्रमुख व्याघ्र प्रकल्प आहेत.',
    },
    hi: {
      q: 'ताडोबा-अंधारी (चंद्रपुर), पेंच (नागपुर) और मेलघाट (अमरावती) महाराष्ट्र के किस संरक्षण हेतु प्रसिद्ध हैं?',
      opts: [
        'बाघ अभयारण्य / राष्ट्रीय उद्यान (Tiger Reserves)',
        'नमक के आगर',
        'गहरे समुद्र के प्रवाल उद्यान',
        'व्यावसायिक पत्थर खदानें',
      ],
      exp: 'ताडोबा-अंधारी, मेलघाट व पेंच महाराष्ट्र के प्रमुख बाघ अभयारण्य (Tiger Reserves) हैं।',
    },
  },
  {
    topic: 'Sahyadri Mountain Passes (Ghats) Connecting Konkan & Desh',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Historic mountain passes (Ghats) such as Thal Ghat, Bhor Ghat (Khandala), Kumbharli Ghat, and Amboli Ghat play what vital role in Maharashtra?',
      opts: [
        'They serve as natural road and rail corridors cutting across the steep Sahyadri escarpment to link coastal Konkan ports with inland Plateau towns',
        'They store glacier ice throughout summer',
        'They block river flow into the sea',
        'They exist only along the northern Satpura desert',
      ],
      exp: 'Since ancient trade times (including Naneghat), ghats provided essential passage over the towering Western Ghats barrier.',
    },
    mr: {
      q: 'थळघाट, बोरघाट (खंडाळा), कुंभार्ली घाट आणि आंबोली घाट यांची महाराष्ट्राच्या भूगोलात कोणती महत्त्वाची भूमिका आहे?',
      opts: [
        'उंच सह्याद्री कडा ओलांडून कोकणातील बंदरे व शहरे यांना पठारावरील (देश) शहरांशी जोडणारे नैसर्गिक रस्ते व रेल्वे मार्ग',
        'हिमनगांचा बर्फ साठवणे',
        'नद्यांचा समुद्रप्रवाह अडवणे',
        'फक्त उत्तरेकडील वाळवंटात असणे',
      ],
      exp: 'नाणेघाट, थळघाट, बोरघाट या घाटमार्गांमुळेच कोकण व दख्खनचे पठार वाहतूक व व्यापाराने जोडले गेले.',
    },
    hi: {
      q: 'थल घाट, भोर घाट (खंडाला), कुंभार्ली घाट व आंबोली घाट जैसे दर्रों की महाराष्ट्र में क्या महत्वपूर्ण भूमिका है?',
      opts: [
        'ये ऊँचे सह्याद्री पर्वत को पार कर कोंकण के तटीय क्षेत्रों को आंतरिक पठार (देश) से जोड़ने वाले प्राकृतिक सड़क-रेल मार्ग हैं',
        'बर्फ जमा रखना',
        'नदियों का मार्ग रोकना',
        'केवल रेगिस्तान में होना',
      ],
      exp: 'सदियों से ये घाट मार्ग तटीय कोंकण और पठारी महाराष्ट्र के बीच व्यापार व यातायात के प्रमुख सेतु रहे हैं।',
    },
  },
];
