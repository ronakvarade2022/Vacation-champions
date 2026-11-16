import { CuratedTrilingualMcq } from './types';

// Batch 2 EVS Content Part 6 (32 unique Classes 3-5 EVS-1 & EVS-2 Qs)
export const MAHA_TET_P1_B2_EVS_C6: CuratedTrilingualMcq[] = [
  {
    topic: 'Over-extraction Coastal Borewells & Saltwater Intrusion',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Why does excessive pumping of groundwater from deep borewells near the Konkan coastline often turn well water brackish or salty over a few summers?',
      opts: [
        'Lowering the coastal freshwater table draws adjacent seawater inland into empty aquifer pores, causing saltwater intrusion',
        'Ocean winds blow pure table salt crystals down through concrete borewell pipes during noon',
        'Underground basalt rocks melt into sodium chloride whenever electric pump motors heat up',
        'Fish migrate through limestone cracks and release brine inside village drinking wells',
      ],
      exp: 'When freshwater aquifers along coasts are over-pumped faster than monsoon recharge, declining pressure lets denser seawater seep inland (saltwater intrusion).',
    },
    mr: {
      q: 'कोकण किनारपट्टीजवळच्या खोल विंधनविहिरींतून (बोअरवेल) भूजलाचा अतिरेकी उपसा केल्यास काही उन्हाळ्यांनंतर पाणी खारट का होते?',
      opts: [
        'गोड्या भूजलाची पातळी घसरल्याने आजूबाजूच्या सच्छिद्र खडकांत समुद्राचे खारे पाणी आत शिरते (खारपाण घुसखोरी)',
        'समुद्री वारे थेट बोअरवेलच्या पाइपमध्ये मीठ भरतात',
        'विद्युत पंप गरम झाल्यामुळे जमिनीखालील काळा दगड मिठात रूपांतरित होतो',
        'समुद्रातील मासे जमिनीखालून येऊन विहिरीचे पाणी खारट करतात',
      ],
      exp: 'किनारपट्टीवर पुनर्भरणापेक्षा अधिक वेगाने भूजल उपसल्यास दाब कमी होऊन समुद्राचे खारे पाणी गोड्या पाण्याच्या थरांत शिरते.',
    },
    hi: {
      q: 'कोंकण तट के पास गहरे बोरवेल से अत्यधिक भूजल निकालने पर कुछ गर्मियों बाद कुओं का पानी खारा क्यों हो जाता है?',
      opts: [
        'मीठे भूजल का स्तर गिरने से आसपास के जलभृत छिद्रों में समुद्र का खारा पानी भीतर प्रवेश कर जाता है (लवणीय अंतर्वेधन)',
        'समुद्री हवाएँ सीधे बोरवेल पाइप के भीतर नमक के क्रिस्टल डाल देती हैं',
        'विद्युत मोटर के गर्म होने से भूमिगत बेसाल्ट चट्टान नमक में बदल जाती है',
        'समुद्री मछलियाँ दरारों से आकर ग्रामीण कुओं में खारापन छोड़ती हैं',
      ],
      exp: 'तटीय क्षेत्रों में वर्षा पुनर्भरण से तेज दोहन करने पर दाब घटता है और खारा समुद्री जल मीठे जलभृतों में घुस जाता है।',
    },
  },
  {
    topic: 'Drip Irrigation & Sprinkler Water Efficiency',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why is drip irrigation strongly recommended over traditional flood irrigation for orchards and vegetable farms in drought-prone parts of Maharashtra?',
      opts: [
        'It delivers measured water drops slowly right near plant roots, slashing evaporation and runoff wastage while keeping weeds suppressed',
        'It sprays pressurized water jets high into dry afternoon air so clouds form directly above the field',
        'It converts salty groundwater into distilled rainwater inside black plastic pipes automatically',
        'It stops plant roots from absorbing soil minerals so crops stay shorter and lighter',
      ],
      exp: 'Drip emitters deliver slow drops directly to the root zone, conserving 40–70% water compared to open-channel flood irrigation.',
    },
    mr: {
      q: 'महाराष्ट्रातील अवर्षणप्रवण भागांत फळबागा आणि भाजीपाला पिकांसाठी मोकाट सिंचनाऐवजी ठिबक सिंचनाची शिफारस का केली जाते?',
      opts: [
        'हे पाणी थेट पिकांच्या मुळांजवळ थेंब-थेंब देते, त्यामुळे बाष्पीभवन व वाहून जाणारी नासाडी वाचते आणि तणही कमी उगवते',
        'हे भरदुपारी हवेत फवारे सोडून शेतावर तत्काळ ढग तयार करते',
        'हे काळ्या नळ्यांमध्ये खारे पाणी आपोआप गोड्या पावसाच्या पाण्यात बदलते',
        'हे पिकांच्या मुळांना खनिजे शोषण्यापासून रोखते',
      ],
      exp: 'ठिबक सिंचनामुळे थेट मुळांशी नियंत्रित पाणी मिळून पाण्याची मोठी बचत होते आणि बाष्पीभवनाचा ऱ्हास टाळला जातो.',
    },
    hi: {
      q: 'महाराष्ट्र के सूखा-प्रवण क्षेत्रों में बागों व सब्जियों के लिए खुले प्रवाह सिंचाई की बजाय टपक (ड्रिप) सिंचाई की सलाह क्यों दी जाती है?',
      opts: [
        'यह सीधे पौधों की जड़ों के पास बूँद-बूँद पानी पहुँचाती है, जिससे वाष्पीकरण व बहाव की बर्बादी घटती है और खरपतवार भी कम उगते हैं',
        'यह दोपहर की गर्म हवा में ऊँचे फव्वारे छोड़कर खेत के ऊपर बादल बनाती है',
        'यह प्लास्टिक पाइपों के भीतर खारे पानी को स्वतः वर्षा जल में बदल देती है',
        'यह पौधों की जड़ों को मृदा खनिज सोखने से रोकती है',
      ],
      exp: 'ड्रिप सिंचाई जड़ क्षेत्र में धीरे-धीरे जल देकर वाष्पीकरण और अपवाह से होने वाली जल हानि को भारी मात्रा में कम करती है।',
    },
  },
  {
    topic: 'Sahyadri Windward Heavy Rain vs Eastern Rain-Shadow Belt',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Why do Amboli and Mahabaleshwar receive over 5,000–6,000 mm of monsoon rainfall whereas nearby eastern plateau towns like Baramati or Phaltan often face scarcity below 600 mm?',
      opts: [
        'Moist southwest monsoon winds rise up the western Sahyadri slope and shed heavy orographic rain there, reaching the leeward east as dry descending air',
        'Eastern Maharashtra lies inside the Arctic Polar Circle where clouds freeze completely before June',
        'Baramati stands at a higher altitude than Mahabaleshwar, pushing moisture clouds downward into the Konkan sea',
        'Windmills in western Maharashtra blow away all monsoon vapour clouds before they can touch Satara',
      ],
      exp: 'The Western Ghats (Sahyadri) intercept moisture-laden SW monsoon winds, creating heavy windward rainfall and a distinct eastern rain-shadow zone.',
    },
    mr: {
      q: 'आंबोली व महाबळेश्वर येथे पावसाळ्यात ५,०००–६,००० मिमीहून अधिक पाऊस पडतो, पण पूर्वेकडील बारामती किंवा फलटण येथे ६०० मिमीपेक्षा कमी पाऊस का पडतो?',
      opts: [
        'नैऋत्य मान्सूनचे बाष्पयुक्त वारे सह्याद्रीच्या पश्चिम उतारावर अडवून मुसळधार पाऊस देतात आणि पूर्वेकडील पर्जन्यछायेच्या प्रदेशात कोरडे उतरतात',
        'पूर्व महाराष्ट्र उत्तर ध्रुवाजवळ असल्यामुळे तेथील ढग गोठतात',
        'बारामतीची उंची महाबळेश्वरपेक्षा जास्त असल्याने ढग कोकणाकडे परत ढकलले जातात',
        'पवनचक्क्या मान्सूनचे सर्व ढग पुढे जाण्यापासून रोखतात',
      ],
      exp: 'सह्याद्री पर्वतरांगेमुळे बाष्पयुक्त वाऱ्यांना प्रतिरोध होऊन पश्चिमेकडे जोरदार पाऊस पडतो व पूर्वेकडे पर्जन्यछायेचा प्रदेश तयार होतो.',
    },
    hi: {
      q: 'अंबोली और महाबलेश्वर में 5,000–6,000 मिमी से अधिक मानसूनी वर्षा होती है, जबकि पूर्वी ओर स्थित बारामती या फलटण में 600 मिमी से कम वर्षा क्यों होती है?',
      opts: [
        'नमीयुक्त दक्षिण-पश्चिम मानसूनी हवाएँ सह्याद्रि के पश्चिमी ढलान पर चढ़कर भारी पर्वतीय वर्षा करती हैं और पूर्वी वृष्टि-छाया क्षेत्र में शुष्क होकर उतरती हैं',
        'पूर्वी महाराष्ट्र आर्कटिक वृत्त में स्थित होने के कारण वहाँ बादल जम जाते हैं',
        'बारामती की ऊँचाई महाबलेश्वर से अधिक होने से बादल समुद्र की ओर लौट जाते हैं',
        'पश्चिमी महाराष्ट्र की पवनचक्कियाँ मानसूनी वाष्प को आगे जाने से रोकती हैं',
      ],
      exp: 'सह्याद्रि पर्वत श्रेणी के अवरोध से पश्चिमी ढलान पर अत्यधिक वर्षा तथा पूर्वी भाग में स्पष्ट वृष्टि-छाया (रेन-शैडो) क्षेत्र बनता है।',
    },
  },
  {
    topic: 'Maharashtra Protected Wildlife Sanctuaries & Flagship Species',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which sanctuary or reserve in Maharashtra is accurately paired with both its district and flagship wildlife species?',
      opts: [
        'Melghat Tiger Reserve (Amravati) — Bengal Tiger & Satpura Forest Owls | Mayureshwar Sanctuary (Supe, Pune) — Indian Chinkara',
        'Melghat Reserve (Sindhudurg) — Polar Penguins | Mayureshwar Sanctuary (Gadchiroli) — Himalayan Yak',
        'Nagzira Sanctuary (Mumbai Suburban) — Desert Camel | Koyna Sanctuary (Nandurbar) — Artic Fox',
        'Tadoba Sanctuary (Thane) — Marine Whale | Bhimashankar (Latur) — One-horned Rhino',
      ],
      exp: 'Melghat in Amravati protects Bengal Tigers in the Satpura hills, while Mayureshwar at Supe (Pune) conserves Chinkara gazelles in grassland.',
    },
    mr: {
      q: 'महाराष्ट्रातील अभयारण्य, जिल्हा आणि प्रमुख वन्यजीव यांची अचूक जोडी कोणती?',
      opts: [
        'मेळघाट व्याघ्र प्रकल्प (अमरावती) — पट्टेरी वाघ | मयुरेश्वर अभयारण्य (सुपा, पुणे) — भारतीय चिंकारा',
        'मेळघाट (सिंधुदुर्ग) — पेंग्विन | मयुरेश्वर (गडचिरोली) — हिमालयीन याक',
        'नागझिरा (मुंबई उपनगर) — उंट | कोयना (नंदुरबार) — आर्क्टिक कोल्हा',
        'ताडोबा (ठाणे) — देवमासा | भीमाशंकर (लातूर) — एकशिंगी गेंडा',
      ],
      exp: 'अमरावती जिल्ह्यातील मेळघाट हे सातपुड्यातील वाघांसाठी, तर पुणे जिल्ह्यातील सुपा येथील मयुरेश्वर अभयारण्य चिंकारासाठी प्रसिद्ध आहे.',
    },
    hi: {
      q: 'महाराष्ट्र के अभयारण्य/रिजर्व, जिले और प्रमुख वन्यजीव का सही जोड़ा कौन-सा है?',
      opts: [
        'मेलघाट टाइगर रिजर्व (अमरावती) — रॉयल बंगाल बाघ | मयूरेश्वर अभयारण्य (सुपा, पुणे) — भारतीय चिंकारा',
        'मेलघाट (सिंधुदुर्ग) — ध्रुवीय पेंगुइन | मयूरेश्वर (गढ़चिरौली) — हिमालयी याक',
        'नगझिरा (मुंबई उपनगर) — रेगिस्तानी ऊँट | कोयना (नंदुरबार) — आर्कटिक लोमड़ी',
        'ताडोबा (ठाणे) — व्हेल मछली | भीमाशंकर (लातूर) — एक सींग वाला गैंडा',
      ],
      exp: 'अमरावती स्थित मेलघाट सतपुड़ा में बाघ संरक्षण हेतु तथा पुणे के सुपा का मयूरेश्वर अभयारण्य चिंकारा संरक्षण हेतु प्रसिद्ध है।',
    },
  },
  {
    topic: 'Velas Olive Ridley Sea Turtle Conservation Ratnagiri',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'What exemplary community-led coastal conservation effort takes place every year at Velas beach in Maharashtra’s Ratnagiri district?',
      opts: [
        'Local villagers and Sahyadri Nisarga Mitra protect Olive Ridley sea turtle nests from predators and safely release hatchlings into the sea',
        'Deep-sea trawlers capture adult green sea turtles to build coastal limestone jetties',
        'Fishermen cover sandy nesting shores with asphalt concrete to prevent ocean waves from touching eggs',
        'Tourists collect wild turtle shells inside glass bottles to test monsoon salinity',
      ],
      exp: 'At Velas (Ratnagiri), local families partner with conservationists to safeguard Olive Ridley clutches and guide hatchlings safely back to ocean currents.',
    },
    mr: {
      q: 'रत्नागिरी जिल्ह्यातील वेळास समुद्रकिनाऱ्यावर दरवर्षी ग्रामस्थ व निसर्गमित्र कोणता उल्लेखनीय संवर्धन उपक्रम राबवतात?',
      opts: [
        'ऑलिव्ह रिडले समुद्री कासवांच्या अंड्यांचे रक्षण करून पिल्लांना सुरक्षितपणे समुद्रात सोडण्याचा कासव महोत्सव',
        'किनाऱ्यावरील सर्व कासवे पकडून मत्स्यालयात बंदिस्त करणे',
        'वाळूच्या किनाऱ्यावर सिमेंटचे रस्ते बांधून अंडी झाकणे',
        'पर्यटकांना विक्रीसाठी समुद्री कासवांची कवचे गोळा करणे',
      ],
      exp: 'वेळास येथे ग्रामस्थ व सह्याद्री निसर्ग मित्र संस्थेच्या सहकार्याने ऑलिव्ह रिडले कासवांच्या घरट्यांचे रक्षण व पिल्लांचे समुद्रार्पण केले जाते.',
    },
    hi: {
      q: 'महाराष्ट्र के रत्नागिरी जिले के वेलास समुद्रतट पर ग्रामीणों और संरक्षणकर्ताओं द्वारा हर वर्ष कौन-सी अनुकरणीय पहल की जाती है?',
      opts: [
        'ऑलिव रिडले समुद्री कछुओं के अंडों की सुरक्षा करना और नन्हे कछुओं को सुरक्षित रूप से समुद्र में छोड़ना',
        'समुद्री कछुओं को पकड़कर काँच के टैंकों में बंद करना',
        'रेतीले तट पर डामर-कंक्रीट की सड़क बिछाकर अंडों को ढकना',
        'लवणता जाँचने हेतु कछुओं के खोल इकट्ठा करना',
      ],
      exp: 'वेलास तट पर स्थानीय ग्रामीण और सह्याद्रि निसर्ग मित्र मिलकर ऑलिव रिडले कछुए के घोंसलों की रक्षा और हैचलिंग्स का सुरक्षित विमोचन करते हैं।',
    },
  },
  {
    topic: 'Mahatma Phule Satyashodhak Samaj & Lokmanya Tilak Kesari',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which landmark pairing of 19th–20th century Maharashtra social-freedom figures with their influential work or institution is historically accurate?',
      opts: [
        'Mahatma Jotirao Phule — Founded Satyashodhak Samaj & authored Gulamgiri | Gopal Ganesh Agarkar — Edited Sudharak championing rational reform',
        'Mahatma Jotirao Phule — Edited Kesari newspaper in English only | Gopal Ganesh Agarkar — Led the 1857 Jhansi regiment',
        'Lokmanya Tilak — Founded Deccan Sabha against Swaraj | Vasudev Balwant Phadke — Built Tarapur Atomic Station',
        'Rajarshi Shahu Maharaj — Banned girls’ education across Kolhapur State | Maharshi Karve — Opposed widow remarriage',
      ],
      exp: 'Phule founded the Satyashodhak Samaj (1873) and wrote Gulamgiri, while Agarkar started Sudharak advocating reason, equality, and women’s education.',
    },
    mr: {
      q: '१९व्या व २०व्या शतकातील महाराष्ट्रातील समाजसुधारक व त्यांचे कार्य यांतील अचूक ऐतिहासिक जोडी कोणती?',
      opts: [
        'महात्मा जोतीराव फुले — सत्यशोधक समाजाची स्थापना व ‘गुलामगिरी’ ग्रंथ | गोपाळ गणेश आगरकर — बुद्धिप्रामाण्यवाद मांडणारे ‘सुधारक’ वृत्तपत्र',
        'महात्मा फुले — केवळ इंग्रजी ‘केसरी’चे संपादन | आगरकर — १८५७ मधील झाशीच्या सैन्याचे नेतृत्व',
        'लोकमान्य टिळक — स्वराज्यविरोधी डेक्कन सभेची स्थापना | वासुदेव बळवंत फडके — तारापूर अणुप्रकल्प उभारणी',
        'राजर्षी शाहू महाराज — मुलींच्या शिक्षणावर बंदी | महर्षी कर्वे — विधवा पुनर्विवाहाला विरोध',
      ],
      exp: 'महात्मा फुले यांनी १८७३ मध्ये सत्यशोधक समाजाची स्थापना व गुलामगिरी लेखन केले, तर आगरकरांनी सुधारकद्वारे समता व बुद्धिवादाचा पुरस्कार केला.',
    },
    hi: {
      q: '19वीं–20वीं सदी के महाराष्ट्र के समाज सुधारकों और उनके प्रमुख योगदान की सही ऐतिहासिक जोड़ी कौन-सी है?',
      opts: [
        'महात्मा जोतीराव फुले — सत्यशोधक समाज की स्थापना व ‘गुलामगिरी’ | गोपाल गणेश आगरकर — तार्किक सुधार हेतु ‘सुधारक’ पत्रिका',
        'महात्मा फुले — केवल अंग्रेजी केसरी का संपादन | आगरकर — 1857 की झाँसी टुकड़ी का नेतृत्व',
        'लोकमान्य तिलक — स्वराज के विरुद्ध संस्था स्थापना | वासुदेव बलवंत फड़के — तारापुर परमाणु संयंत्र निर्माण',
        'राजर्षि शाहू महाराज — बालिका शिक्षा पर प्रतिबंध | महर्षि कर्वे — विधवा पुनर्विवाह का विरोध',
      ],
      exp: 'महात्मा फुले ने 1873 में सत्यशोधक समाज स्थापित किया व गुलामगिरी लिखी, जबकि आगरकर ने सुधारक के माध्यम से तर्कसंगत सामाजिक सुधार आगे बढ़ाए।',
    },
  },
  {
    topic: 'National Aquatic Animal Gangetic Dolphin & Heritage Elephant',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why does conservation of India’s National Aquatic Animal — the Gangetic River Dolphin (Susu) — serve as a vital indicator of freshwater river health?',
      opts: [
        'As a blind echolocating river mammal living at the top of the river food web, its survival requires clean, unpolluted, uninterrupted flowing water',
        'It only breathes oceanic saltwater and travels inland exclusively during desert dust storms',
        'It builds concrete check-dams across mountain waterfalls using river pebbles',
        'It feeds exclusively on floating plastic wrappers and factory chemical dyes',
      ],
      exp: 'Declared India’s National Aquatic Animal (2009), the Gangetic Dolphin thrives only in clean, deep, minimally disturbed river stretches.',
    },
    mr: {
      q: 'भारताचा राष्ट्रीय जलचर प्राणी — ‘गंगा नदीतील डॉल्फिन’ (सूस) हा गोड्या पाण्याच्या नदीच्या आरोग्याचा महत्त्वाचा निदर्शक का मानला जातो?',
      opts: [
        'प्रतिध्वनी स्थाननिश्चितीवर (इकोलोकेशन) अवलंबून असलेला हा सस्तन जलचर केवळ स्वच्छ, प्रदूषणमुक्त व वाहत्या नदीच्या परिसंस्थेतच जिवंत राहू शकतो',
        'हा केवळ खारट समुद्रात श्वास घेतो आणि वाळवंटातील वादळात नदीत येतो',
        'हा नदीतील दगडांपासून धबधब्यांवर सिमेंटचे बंधारे बांधतो',
        'हा केवळ तरंगणारे प्लास्टिक व कारखान्यांचे रसायनयुक्त रंग खातो',
      ],
      exp: 'गंगा डॉल्फिन हा नदीच्या अन्नसाखळीतील शीर्षस्थ प्राणी असल्याने त्याचे अस्तित्व स्वच्छ व अखंड वाहत्या नदीचे द्योतक आहे.',
    },
    hi: {
      q: 'भारत का राष्ट्रीय जलीय जीव — गांगेय डॉल्फिन (सुसु) — मीठे पानी की नदी के स्वास्थ्य का प्रमुख संकेतक क्यों माना जाता है?',
      opts: [
        'प्रतिध्वनि-निर्धारण (इकोलोकेशन) से शिकार करने वाला यह स्तनधारी जीव केवल स्वच्छ, प्रदूषण-रहित और अविरल बहती नदी में ही जीवित रह सकता है',
        'यह केवल खारे समुद्र में रहता है और रेगिस्तानी आंधी में नदियों में आता है',
        'यह पत्थरों से झरनों पर पक्के बाँध बनाता है',
        'यह तैरते प्लास्टिक और रासायनिक रंगों को खाकर जीवित रहता है',
      ],
      exp: 'गांगेय डॉल्फिन नदी पारिस्थितिकी तंत्र के शीर्ष पर है, इसलिए इसकी उपस्थिति स्वच्छ और कम प्रदूषित जल प्रवाह का संकेत देती है।',
    },
  },
  {
    topic: 'Nasal Hair Mucus Filtration & Diaphragm Breathing Mechanics',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'During inhalation, how do the nose and the dome-shaped diaphragm muscle beneath the lungs work together to bring fresh air cleanly into the lungs?',
      opts: [
        'Nasal hair and mucus warm, moisten, and trap dust particles while the diaphragm contracts and flattens downward, expanding chest volume so air rushes in',
        'Nasal bones block oxygen completely while the diaphragm rises upward to squeeze lungs smaller during inhalation',
        'Air enters directly through the food pipe into the stomach where gastric acid pushes oxygen to ribs',
        'The diaphragm moves sideways out of the ribcage only when a child holds breath underwater',
      ],
      exp: 'Nose cilia and mucus filter and warm inhaled air; simultaneously, the diaphragm contracts downward to enlarge the thoracic cavity and draw air in.',
    },
    mr: {
      q: 'श्वास घेताना (अंतःश्वसन) नाक आणि फुफ्फुसांखालचा घुमटाकार श्वासपटल (डायफ्राम) स्वच्छ हवा आत घेण्यासाठी एकत्रितपणे कसे कार्य करतात?',
      opts: [
        'नाकातील केस व श्लेष्मा धुळीचे कण अडवून हवा उबदार करतात, तर श्वासपटल खाली सरकून छातीची पोकळी वाढवतो आणि हवा फुफ्फुसांत शिरते',
        'नाकाची हाडे ऑक्सिजन अडवतात आणि श्वास घेताना श्वासपटल वर जाऊन फुफ्फुसे दाबतो',
        'हवा अन्ननलिकेतून जठरात जाते आणि तेथून बरगड्यांत पोहोचते',
        'श्वासपटल केवळ पाण्याखाली श्वास रोखल्यावरच बाजूला सरकतो',
      ],
      exp: 'नाकातील केस व स्त्राव हवा गाळून स्वच्छ करतात आणि श्वासपटल आकुंचन पावून खाली गेल्याने छातीचा आकार वाढून हवा आत खेचली जाते.',
    },
    hi: {
      q: 'श्वास अंदर खींचते समय नाक और फेफड़ों के नीचे स्थित गुंबदनुमा डायफ्राम पेशी मिलकर शुद्ध हवा फेफड़ों तक कैसे पहुँचाते हैं?',
      opts: [
        'नाक के बाल व श्लेष्मा धूलकणों को छानकर हवा को गर्म-नम करते हैं, जबकि डायफ्राम सिकुड़कर नीचे की ओर सपाट होता है जिससे वक्ष गुहा फैलती है और हवा भीतर आती है',
        'नाक की हड्डियाँ ऑक्सीजन रोकती हैं और डायफ्राम ऊपर उठकर फेफड़ों को दबाता है',
        'हवा सीधे भोजन नली से आमाशय में जाकर पसलियों में फैलती है',
        'डायफ्राम केवल पानी के नीचे साँस रोकने पर ही पसलियों से बाहर सरकता है',
      ],
      exp: 'नाक धूल को छानती है और अंतःश्वसन के दौरान डायफ्राम के नीचे आने से वक्ष आयतन बढ़ता है, जिससे वायु फेफड़ों में प्रवेश करती है।',
    },
  },
  {
    topic: 'Human Alimentary Canal Sequence & Small vs Large Intestine',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Which sequence correctly traces human digestion along with the primary absorption role of the two intestines?',
      opts: [
        'Mouth (saliva) → Oesophagus → Stomach → Small Intestine (digested nutrients absorbed) → Large Intestine (water & salts absorbed) → Rectum',
        'Mouth → Windpipe → Large Intestine (protein digestion) → Liver → Small Intestine (pure air storage)',
        'Nose → Stomach → Heart → Small Intestine (water only) → Large Intestine (bone marrow formation)',
        'Oesophagus → Mouth → Gallbladder → Large Intestine (glucose absorption) → Small Intestine (waste removal)',
      ],
      exp: 'Food travels Mouth → Oesophagus → Stomach → Small Intestine (main nutrient absorption) → Large Intestine (water reabsorption) → Rectum.',
    },
    mr: {
      q: 'मानवी पचनमार्गाचा अचूक क्रम आणि दोन्ही आतड्यांचे मुख्य कार्य कोणते?',
      opts: [
        'तोंड (लाळ) → अन्ननलिका → जठर → लहान आतडे (पचलेल्या पोषकद्रव्यांचे शोषण) → मोठे आतडे (पाणी व क्षार शोषण) → मलाशय',
        'तोंड → श्वासनलिका → मोठे आतडे → यकृत → लहान आतडे (हवा साठवणूक)',
        'नाक → जठर → हृदय → लहान आतडे (केवळ पाणी) → मोठे आतडे',
        'अन्ननलिका → तोंड → पित्ताशय → मोठे आतडे (ग्लुकोज शोषण) → लहान आतडे',
      ],
      exp: 'अन्न तोंड–अन्ननलिका–जठरातून लहान आतड्यात जाते (जेथे मुख्य पोषकद्रव्ये शोषली जातात) आणि पुढे मोठ्या आतड्यात पाणी शोषले जाते.',
    },
    hi: {
      q: 'मानव पाचन पथ का सही क्रम तथा छोटी और बड़ी आंत की मुख्य अवशोषण भूमिका कौन-सी है?',
      opts: [
        'मुख (लार) → ग्रासनली → आमाशय → छोटी आंत (पचे पोषक तत्वों का अवशोषण) → बड़ी आंत (जल व लवण अवशोषण) → मलाशय',
        'मुख → श्वासनली → बड़ी आंत → यकृत → छोटी आंत (वायु संग्रहण)',
        'नाक → आमाशय → हृदय → छोटी आंत (केवल जल) → बड़ी आंत',
        'ग्रासनली → मुख → पित्ताशय → बड़ी आंत (ग्लूकोज अवशोषण) → छोटी आंत',
      ],
      exp: 'भोजन मुख से ग्रासनली, आमाशय होकर छोटी आंत (मुख्य पोषक अवशोषण) और बड़ी आंत (जल अवशोषण) के बाद मलाशय तक पहुँचता है।',
    },
  },
  {
    topic: 'Vitamin B12 Nerve-RBC Health & ORS Zinc-Potassium Recovery',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why do paediatric health guidelines recommend adding a 14-day Zinc supplement alongside clean ORS solution when a child suffers acute watery diarrhoea?',
      opts: [
        'ORS restores lost water and sodium/potassium salts immediately, while Zinc helps heal intestinal lining and cuts future diarrhoea severity and duration',
        'Zinc freezes stomach water into solid ice cubes while high-sugar cola replaces lost electrolytes',
        'ORS provides Vitamin D sunlight directly while Zinc turns intestinal bacteria into muscle protein',
        'Antibiotic painkillers alone stop dehydration even if the child drinks zero clean water',
      ],
      exp: 'WHO/Indian health guidelines pair ORS (preventing dehydration) with Zinc supplementation to regenerate gut epithelium and shorten illness.',
    },
    mr: {
      q: 'लहान मुलांना अतिसार (जुलाब) झाल्यास स्वच्छ ओआरएस (ORS) सोबत झिंक (जस्त) देण्याची शिफारस बालआरोग्य मार्गदर्शक तत्त्वांत का केली जाते?',
      opts: [
        'ओआरएस शरीरातील कमी झालेले पाणी व क्षार भरून काढतो, तर झिंक आतड्यांचे अस्तर बरे करून आजाराचा कालावधी व तीव्रता कमी करते',
        'झिंक जठरातील पाण्याचे बर्फात रूपांतर करते आणि गोड शीतपेये क्षार देतात',
        'ओआरएस थेट सूर्यप्रकाशातील जीवनसत्त्व ड पुरवतो आणि झिंक जीवाणूंचे स्नायूंत रूपांतर करते',
        'मूल अजिबात पाणी न पिता केवळ वेदनाशामक गोळीने निर्जलीकरण टळते',
      ],
      exp: 'ओआरएस त्वरित जल-क्षार संतुलन राखते, तर झिंक आतड्यांची झीज भरून काढण्यास व जुलाबाची तीव्रता घटवण्यास मदत करते.',
    },
    hi: {
      q: 'बच्चों को तीव्र दस्त (डायरिया) होने पर स्वच्छ ओआरएस (ORS) के साथ जिंक देने की अनुशंसा क्यों की जाती है?',
      opts: [
        'ORS खोए हुए जल और सोडियम-पोटैशियम लवण तुरंत लौटाता है, जबकि जिंक आंतों की परत को ठीक कर दस्त की अवधि व गंभीरता घटाता है',
        'जिंक आमाशय के जल को बर्फ बना देता है और कोल्ड ड्रिंक लवणों की पूर्ति करता है',
        'ORS सूर्य से विटामिन D बनाता है और जिंक जीवाणुओं को मांसपेशी बनाता है',
        'बिना पानी पिए केवल दर्द-निवारक गोली से निर्जलीकरण रुक जाता है',
      ],
      exp: 'ORS निर्जलीकरण रोकता है और जिंक आंतों की उपकला की मरम्मत कर बीमारी की अवधि तथा दोबारा होने के खतरे को कम करता है।',
    },
  },
  {
    topic: 'Freeze Drying Dehydration & Airtight Vacuum Food Preservation',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'How do traditional sun-drying of kokum/fenugreek leaves and modern vacuum-sealing both keep dry foods safe for months without chemical preservatives?',
      opts: [
        'Drying removes moisture needed by moulds/bacteria to multiply, while vacuum-sealing removes oxygen and prevents humid air re-entry',
        'Both methods raise internal food temperature permanently above 200°C inside steel cupboards',
        'Vacuum bags pump extra rainwater into crisp papads so yeast stays asleep permanently',
        'Sun-drying coats grains with lead oxide while plastic seals generate UV rays inside dark pantries',
      ],
      exp: 'Microbes need moisture and (for aerobic spoilage) oxygen/humidity; removing water and sealing out damp air halts spoilage naturally.',
    },
    mr: {
      q: 'पारंपरिक पद्धतीने कोकम/मेथी वाळवणे आणि आधुनिक ‘व्हॅक्यूम पॅकिंग’ या दोन्ही पद्धती रासायनिक संरक्षकांशिवाय अन्न महिने कसे टिकवतात?',
      opts: [
        'वाळवल्याने बुरशी व जीवाणूंच्या वाढीसाठी लागणारा ओलावा निघून जातो, तर व्हॅक्यूम पॅकिंग हवा (ऑक्सिजन व आर्द्रता) बाहेर काढून पुनःप्रवेश रोखते',
        'दोन्ही पद्धती कपाटात अन्नाचे तापमान कायम २००° से. पेक्षा जास्त ठेवतात',
        'व्हॅक्यूम पिशव्या पापडांत जास्त पावसाचे पाणी भरतात',
        'उन्हात वाळवल्याने धान्यावर शिशाचा थर बसतो',
      ],
      exp: 'सूक्ष्मजीवांच्या वाढीसाठी ओलावा व हवा आवश्यक असते; आर्द्रता काढणे आणि हवाबंद पॅकिंग केल्यास अन्न नैसर्गिकरीत्या सुरक्षित राहते.',
    },
    hi: {
      q: 'कोकम या मेथी को धूप में सुखाना और आधुनिक वैक्यूम-सीलिंग दोनों ही बिना रासायनिक परिरक्षकों के भोजन को महीनों सुरक्षित कैसे रखते हैं?',
      opts: [
        'सुखाने से फफूँद व जीवाणुओं की वृद्धि के लिए जरूरी नमी हट जाती है, जबकि वैक्यूम-सीलिंग ऑक्सीजन निकालकर नमीयुक्त हवा का प्रवेश रोकती है',
        'दोनों तरीके अलमारी के अंदर भोजन का तापमान स्थायी रूप से 200°C से ऊपर रखते हैं',
        'वैक्यूम थैलियाँ पापड़ के अंदर अतिरिक्त वर्षा जल भर देती हैं',
        'धूप में सुखाने से अनाज पर लेड ऑक्साइड की परत चढ़ जाती है',
      ],
      exp: 'सूक्ष्मजीवों के पनपने हेतु नमी और वायु आवश्यक होती है; निर्जलीकरण व वायुरोधी पैकिंग प्राकृतिक रूप से खराब होने से बचाते हैं।',
    },
  },
  {
    topic: 'Microplastics in Aquatic Food Chains & Reusable Cloth Bags',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why is carrying a stitched cloth bag (kapdi pishvi) to markets considered far safer for rivers and cattle than accepting single-use thin polythene bags?',
      opts: [
        'Thin plastic bags never biodegrade naturally; they choke cattle if swallowed with food scraps and break into harmful microplastics entering aquatic food webs',
        'Cloth bags release nitrogen gas into kitchen shelves that turns stale vegetables back into fresh sprouts',
        'Polythene bags dissolve instantly into harmless glucose syrup during the first monsoon shower',
        'Cattle digest multi-layered plastic wrappers easily to increase pure milk calcium',
      ],
      exp: 'Single-use polythene causes fatal intestinal blockages in stray animals, clogs drains, and fragments into microplastics polluting water bodies.',
    },
    mr: {
      q: 'बाजारहाट करताना एकदाच वापरल्या जाणाऱ्या पातळ प्लास्टिक पिशव्यांऐवजी कापडी पिशवी वापरणे नद्या व जनावरांसाठी अधिक सुरक्षित का आहे?',
      opts: [
        'पातळ प्लास्टिक नैसर्गिकरीत्या कुजत नाही; कचऱ्यासोबत जनावरांच्या पोटात जाऊन अडकते आणि सूक्ष्म प्लास्टिक (मायक्रोप्लास्टिक) बनून जलचर अन्नसाखळीत शिरते',
        'कापडी पिशवी शिळ्या भाज्यांचे पुन्हा ताज्या मोडांत रूपांतर करते',
        'पॉलिथीन पिशव्या पहिल्या पावसात बिनधोक साखरेत विरघळतात',
        'गुरे प्लास्टिक पिशव्या सहज पचवून अधिक कॅल्शियमयुक्त दूध देतात',
      ],
      exp: 'एकेरी वापराचे प्लास्टिक कुजत नसल्याने नाले तुंबतात, गुरांचा जीव धोक्यात येतो आणि सूक्ष्म प्लास्टिक जलप्रवाहांद्वारे अन्नसाखळी प्रदूषित करते.',
    },
    hi: {
      q: 'बाजार जाते समय एकल-उपयोग पतली पॉलीथीन थैलियों के बजाय कपड़े का थैला (कापड़ी पिशवी) ले जाना नदियों और मवेशियों के लिए क्यों सुरक्षित है?',
      opts: [
        'पतली प्लास्टिक थैलियाँ प्राकृतिक रूप से नहीं सड़तीं; कचरे संग मवेशियों का पेट अवरुद्ध करती हैं तथा टूटकर सूक्ष्म-प्लास्टिक के रूप में जलीय खाद्य श्रृंखला में पहुँचती हैं',
        'कपड़े का थैला बासी सब्जियों को पुनः ताजा कर देता है',
        'पॉलीथीन थैलियाँ पहली बारिश में हानिरहित ग्लूकोज में घुल जाती हैं',
        'मवेशी प्लास्टिक रैपर पचाकर दूध में कैल्शियम बढ़ाते हैं',
      ],
      exp: 'एकल-उपयोग प्लास्टिक जैव-निम्नीकरणीय नहीं है; यह नालों को जाम करता है, पशुओं को नुकसान पहुँचाता है और माइक्रोप्लास्टिक प्रदूषण फैलाता है।',
    },
  },
  {
    topic: 'Urban Heat Island Effect & School Rooftop White Paint / Greenery',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Why do densely concreted cities stay several degrees warmer at night than surrounding wooded villages, and what helps cool school terraces?',
      opts: [
        'Dark asphalt and concrete trap daytime heat (Urban Heat Island effect); shaded native trees and reflective white/green rooftops cool buildings significantly',
        'Rural village air contains solid icebergs underneath mango trees all year long',
        'Tall glass towers absorb all wind energy and convert moonlight directly into microwave heat',
        'Painting every school roof jet-black makes classrooms stay 10°C cooler in May afternoon sun',
      ],
      exp: 'Concrete and tar absorb and slowly re-radiate solar heat (Urban Heat Island); planting shade trees and using white/vegetated roofs lowers surface heat.',
    },
    mr: {
      q: 'सिमेंट-डांबराने भरलेली शहरे सभोवतालच्या वृक्षसंपन्न खेड्यांपेक्षा रात्रीही अधिक गरम का राहतात आणि शाळेचे छत थंड ठेवण्यासाठी काय उपयुक्त ठरते?',
      opts: [
        'डांबर व काँक्रीट दिवसाची उष्णता शोषून रात्री हळूहळू सोडतात (अर्बन हीट आयलंड); स्थानिक झाडे व छतावरील पांढरा रंग किंवा बाग तापमान लक्षणीय कमी करतात',
        'गावांतील आंब्याच्या झाडांखाली वर्षभर बर्फाचे डोंगर असतात',
        'काचेच्या इमारती चांदण्यातून मायक्रोवेव्ह उष्णता निर्माण करतात',
        'शाळेच्या छताला काळा गडद रंग दिल्यास वर्ग उन्हाळ्यात १०° से. अधिक थंड राहतात',
      ],
      exp: 'काँक्रीट व डांबर सूर्योष्णता साठवून ठेवतात; हिरवळ आणि छतावरील परावर्तक पांढरा रंग उष्णता परावर्तित करून तापमान घटवतात.',
    },
    hi: {
      q: 'कंक्रीट और डामर से भरे शहर आसपास के हरे-भरे गाँवों की तुलना में रात में भी अधिक गर्म क्यों रहते हैं, और स्कूल की छत को ठंडा रखने में क्या सहायक है?',
      opts: [
        'गहरा डामर व कंक्रीट दिन की ऊष्मा सोखकर रात में छोड़ते हैं (अर्बन हीट आइलैंड); छायादार पेड़ व सफेद परावर्तक या हरी छतें इमारतों को ठंडा रखती हैं',
        'गाँवों में पेड़ों के नीचे साल भर बर्फ की चट्टानें रहती हैं',
        'काँच की इमारतें चाँदनी को माइक्रोवेव गर्मी में बदलती हैं',
        'स्कूल की छत को काला रंगने से कक्षाएँ मई की धूप में 10°C अधिक ठंडी रहती हैं',
      ],
      exp: 'कंक्रीट और सड़कें सौर ऊष्मा संचित करती हैं; वृक्षारोपण और सफेद परावर्तक/हरित छत शहरी ताप द्वीप प्रभाव को कम करते हैं।',
    },
  },
  {
    topic: 'Noise Pollution Decibels & Silence Zones Around Schools',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why do traffic regulations designate 100-metre zones around schools and hospitals as strict "Silence Zones" forbidding pressure horns and loudspeakers?',
      opts: [
        'Sustained loud noise (measured in decibels, dB) damages sensitive eardrums, raises blood pressure/stress, and disrupts patient recovery and student concentration',
        'Loud truck horns magnetize classroom chalkboards so chalk dust sticks permanently in air',
        'Hospitals store delicate vacuum bottles that turn seawater into alcohol above 40 dB',
        'Acoustic noise freezes nearby tap water pipes when students whisper during exams',
      ],
      exp: 'High-decibel noise pollution causes hearing loss, sleep disruption, stress, and impaired concentration, making Silence Zones vital near schools/hospitals.',
    },
    mr: {
      q: 'शाळा व रुग्णालयांच्या १०० मीटर परिसरात ‘शांतता क्षेत्र’ घोषित करून कर्कश हॉर्न व ध्वनिक्षेपकांना बंदी का घालतात?',
      opts: [
        'सततचा मोठा आवाज (डेसिबलमध्ये मोजला जाणारा) कानांच्या पडद्याला इजा करतो, ताण व रक्तदाब वाढवतो तसेच रुग्ण व विद्यार्थ्यांची एकाग्रता भंग करतो',
        'मोठ्या हॉर्नमुळे वर्गातील फळे चुंबकीय होतात',
        '४० डेसिबलवर रुग्णालयातील नळांचे पाणी गोठते',
        'आवाजामुळे परीक्षेच्या वेळी शाळेतील खडू आपोआप विरघळतात',
      ],
      exp: 'ध्वनिप्रदूषणामुळे श्रवणहानी, मानसिक ताण, रक्तदाब वाढणे व अभ्यासातील एकाग्रता कमी होणे असे दुष्परिणाम होतात; म्हणून शांतता क्षेत्र आवश्यक असते.',
    },
    hi: {
      q: 'स्कूलों और अस्पतालों के 100 मीटर दायरे को सख्त "मौन क्षेत्र" (साइलेंस ज़ोन) घोषित कर तेज हॉर्न व लाउडस्पीकर पर रोक क्यों लगाई जाती है?',
      opts: [
        'लगातार तेज शोर (डेसिबल, dB में मापा जाने वाला) कान के परदों को नुकसान पहुँचाता है, तनाव/रक्तचाप बढ़ाता है और रोगियों व छात्रों की एकाग्रता भंग करता है',
        'तेज ट्रक हॉर्न से कक्षा के ब्लैकबोर्ड चुंबकीय हो जाते हैं',
        '40 डेसिबल से ऊपर अस्पताल की नल पाइपों का पानी जम जाता है',
        'शोर से परीक्षा के समय चॉक हवा में ही घुल जाती है',
      ],
      exp: 'उच्च डेसिबल का ध्वनि प्रदूषण श्रवण क्षमता को क्षति, तनाव और एकाग्रता भंग करता है, इसलिए संवेदनशील स्थानों के पास मौन क्षेत्र जरूरी हैं।',
    },
  },
  {
    topic: 'Sound Pitch Frequency vs Loudness Amplitude on Tabla & Sitar',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'While tuning a sitar or tanpura, how does tightening a thin steel string affect its sound compared with plucking the same string much harder?',
      opts: [
        'Tightening the thin string increases vibration frequency (higher shrill pitch), whereas plucking harder increases vibration amplitude (greater loudness)',
        'Tightening slows vibration to zero while plucking harder turns sound waves into ultraviolet light',
        'Both tightening and harder plucking decrease pitch and loudness equally to produce silent air',
        'Plucking harder shortens the wooden neck of the sitar while tightening reduces air pressure to zero',
      ],
      exp: 'Pitch depends on frequency (higher tension/thinner string = higher pitch), while loudness depends on vibration amplitude (stronger pluck = louder sound).',
    },
    mr: {
      q: 'सतार किंवा तानपुऱ्याची पातळ तार अधिक ताणून बांधणे आणि तीच तार जोरात छेडणे यांमुळे आवाजात कोणता फरक पडतो?',
      opts: [
        'तार अधिक ताणल्याने कंपन वारंवारता वाढून आवाज अधिक तीक्ष्ण (उच्च स्वर/पिच) होतो, तर जोरात छेडल्याने कंपनाचा विस्तार (आयाम) वाढून आवाज मोठा होतो',
        'तार ताणल्याने कंपने शून्य होतात आणि जोरात छेडल्यास प्रकाश निर्माण होतो',
        'ताणणे व जोरात छेडणे या दोन्हीमुळे आवाज पूर्णपणे बंद होतो',
        'जोरात छेडल्याने तानपुऱ्याचा दांडा लहान होतो',
      ],
      exp: 'आवाजाची उच्चता/तीक्ष्णता (पिच) वारंवारतेवर (तारेचा ताण/जाडी) तर मोठ्या आवाजाची पातळी (लाउडनेस) कंपनाच्या आयामावर अवलंबून असते.',
    },
    hi: {
      q: 'सितार या तानपूरे की पतली तार को अधिक कसने और उसी तार को अधिक जोर से झंकृत करने पर ध्वनि में क्या अंतर आता है?',
      opts: [
        'तार अधिक कसने से कंपन आवृत्ति बढ़ती है (तीक्ष्ण उच्च तारत्व/पिच), जबकि जोर से बजाने पर कंपन आयाम बढ़ता है (अधिक प्रबलता/तेज आवाज)',
        'तार कसने से कंपन रुक जाते हैं और जोर से बजाने पर ध्वनि पराबैंगनी प्रकाश बन जाती है',
        'दोनों क्रियाएँ ध्वनि की पिच और प्रबलता को समान रूप से शून्य कर देती हैं',
        'जोर से बजाने पर तानपूरे की लकड़ी सिकुड़ जाती है',
      ],
      exp: 'तारत्व (पिच) कंपन की आवृत्ति पर निर्भर करता है (अधिक कसाव = उच्च पिच), जबकि ध्वनि की प्रबलता कंपन के आयाम पर निर्भर करती है।',
    },
  },
  {
    topic: 'Plane Mirror Lateral Inversion & Convex Vehicle Side Mirrors',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why is the word "AMBULANCE" painted horizontally reversed on the front bonnet of emergency vans, and why do outer rear-view mirrors on cars curve outward (convex)?',
      opts: [
        'Plane rear-view mirrors flip images laterally so drivers ahead read "AMBULANCE" upright, while convex side mirrors widen the rear field of view',
        'Convex mirrors invert the sky upside down while reversed paint cools ambulance radiator coolant',
        'Drivers always read backwards in Marathi and English naturally without looking at glass mirrors',
        'Concave outer mirrors magnify a single motorcycle wheel to hide the entire road behind',
      ],
      exp: 'Lateral inversion in a driver’s flat mirror flips reversed lettering back to normal; convex side mirrors stay erect and provide a wide-angle view.',
    },
    mr: {
      q: 'रुग्णवाहिकेच्या पुढील भागावर ‘AMBULANCE’ हे नाव उलट्या क्रमाने का रंगवतात आणि वाहनांचे बाजूचे आरसे बहिर्वक्र (कॉन्वेक्स) का असतात?',
      opts: [
        'सपाट आरशात पार्श्व-उलट (लॅटरल इन्व्हर्जन) प्रतिमा दिसत असल्याने पुढील चालकाला नाव सरळ वाचता येते, तर बहिर्वक्र आरशात मागचा विस्तृत परिसर दिसतो',
        'बहिर्वक्र आरसे आकाश उलटे दाखवतात आणि उलटे रंग इंजिन थंड ठेवतात',
        'चालक आरशात न पाहता नेहमी उलटे वाचण्याचा सराव करतात',
        'अंतर्वक्र आरसे मोटारसायकलचे एकच चाक मोठे दाखवून रस्ता लपवतात',
      ],
      exp: 'सपाट आरशातील पार्श्व-व्युत्क्रमणामुळे उलटे अक्षर सरळ दिसते; बहिर्वक्र आरशातून लहान पण सुलट आणि विस्तृत दृश्य मिळते.',
    },
    hi: {
      q: 'एम्बुलेंस के आगे "AMBULANCE" अक्षर उल्टे (पार्श्व-विपरीत) क्यों लिखे जाते हैं, और वाहनों के साइड मिरर उत्तल (कॉनवेक्स) क्यों होते हैं?',
      opts: [
        'समतल पश्च-दर्पण में पार्श्व-उलट प्रतिबिंब बनने से आगे वाले चालक को नाम सीधा दिखता है, जबकि उत्तल साइड मिरर पीछे का व्यापक दृश्यक्षेत्र दिखाता है',
        'उत्तल दर्पण आसमान को उल्टा दिखाते हैं और उल्टा पेंट रेडिएटर ठंडा रखता है',
        'वाहन चालक बिना दर्पण देखे हमेशा उल्टा पढ़ने के अभ्यस्त होते हैं',
        'अवतल साइड मिरर केवल एक पहिया बड़ा दिखाकर पूरी सड़क छिपा देते हैं',
      ],
      exp: 'समतल दर्पण के पार्श्व-परिवर्तन से उल्टा लिखा शब्द सीधा पढ़ा जाता है, और उत्तल दर्पण सीधा व विस्तृत दृश्य क्षेत्र प्रदान करते हैं।',
    },
  },
  {
    topic: 'Proper Storage of Bar Magnets with Keepers & Compass Errors',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'How should school laboratory bar magnets be stored safely in wooden boxes, and why can a hiker’s magnetic compass misread right next to a steel railway track?',
      opts: [
        'Store bar magnets in pairs with unlike poles side-by-side linked by soft-iron keepers (never heat or hammer); nearby iron rails deflect the compass needle',
        'Boil magnets in saltwater before locking them inside cast-iron safes; railway tracks repel the geographic North Pole away',
        'Stack identical North poles tightly together with rubber hammers; wood sleepers reverse Earth’s magnetic core',
        'Wrap magnets in copper wire plugged into wall sockets so gravity cancels magnetic deflection',
      ],
      exp: 'Opposite poles with soft-iron keepers preserve magnetic domains; heating, hammering, or dropping demagnetizes magnets, and nearby iron deflects compasses.',
    },
    mr: {
      q: 'शाळेच्या प्रयोगशाळेत पट्टी चुंबक (बार मॅग्नेट) सुरक्षित कसे जपून ठेवावेत आणि लोखंडी रेल्वे रुळांजवळ होकायंत्राची सुई चुकीची दिशा का दाखवू शकते?',
      opts: [
        'पट्टी चुंबक जोड्यांनी विरुद्ध ध्रुव शेजारी ठेवून दोन्हींकडे मऊ लोखंडाच्या पट्ट्या (कीपर्स) लावून व न तापवता-न ठोकता ठेवावेत; जवळच्या लोखंडी रुळांमुळे सुई विचलित होते',
        'चुंबक खाऱ्या पाण्यात उकळून लोखंडी तिजोरीत कुलूपबंद करावेत',
        'समान उत्तर ध्रुव जोरात आपटून लाकडी खोक्यात बंद करावेत',
        'चुंबकाभोवती तांब्याची तार गुंडाळून थेट वीजपुरवठ्याला जोडावी',
      ],
      exp: 'मऊ लोखंडी कीपर्स व विरुद्ध ध्रुव रचना चुंबकत्व टिकवते; गरम केल्यास किंवा ठोकल्यास चुंबकत्व घटते आणि जवळचे लोखंड होकायंत्राला विचलित करते.',
    },
    hi: {
      q: 'विद्यालय की प्रयोगशाला में छड़ चुंबकों को सुरक्षित कैसे रखना चाहिए, और लोहे की रेल पटरी के ठीक पास चुंबकीय कम्पास गलत दिशा क्यों दिखा सकता है?',
      opts: [
        'छड़ चुंबकों को जोड़े में विपरीत ध्रुव आमने-सामने रखकर दोनों सिरों पर नरम लोहे के कीपर लगाएँ (गर्म न करें, न पीटें); पास का लोहा कम्पास की सुई को विचलित करता है',
        'चुंबकों को खारे पानी में उबालकर लोहे की तिजोरी में बंद करें',
        'समान उत्तरी ध्रुवों को हथौड़े से ठोककर एक साथ चिपका दें',
        'चुंबक पर ताँबे का तार लपेटकर बिजली के सॉकेट में लगाएँ',
      ],
      exp: 'विपरीत ध्रुवों व नरम लोहे के कीपर चुंबकत्व बनाए रखते हैं; ताप व आघात से चुंबकत्व नष्ट होता है तथा पास स्थित लोहा कम्पास सुई को भटकाता है।',
    },
  },
  {
    topic: 'CNG Cleaner Public Transit Fuel & Solar Electric Buses',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why have cities like Pune and Mumbai transitioned many public buses from old diesel engines to CNG (Compressed Natural Gas) and electric buses?',
      opts: [
        'CNG burns more cleanly with far lower soot (PM2.5) and smoke, while electric buses eliminate tailpipe exhaust pollution on crowded streets altogether',
        'CNG is harvested directly from sugarcane juice and releases pure liquid oxygen through exhaust pipes',
        'Electric buses consume coal inside passenger seats to double urban carbon monoxide smog',
        'Diesel fuel evaporates harmlessly into vitamin water before reaching bus engines',
      ],
      exp: 'CNG reduces particulate matter and unburnt hydrocarbons dramatically, and battery-electric buses produce zero tailpipe emissions in urban corridors.',
    },
    mr: {
      q: 'पुणे व मुंबईसारख्या शहरांत अनेक सार्वजनिक बस जुन्या डिझेलऐवजी सीएनजी (CNG) व विद्युत (इलेक्ट्रिक) बसेसकडे का वळल्या आहेत?',
      opts: [
        'सीएनजी अधिक स्वच्छपणे जळून काजळी (PM2.5) व धूर खूप कमी होतो, तर विद्युत बसेसमुळे रस्त्यावरचा धूर-उत्सर्जन पूर्णतः टळते',
        'सीएनजी थेट उसाच्या रसापासून बनतो व सायलेन्सरमधून शुद्ध प्राणवायू सोडतो',
        'विद्युत बसेस प्रवाशांच्या आसनांखाली दगडी कोळसा जाळून धूर वाढवतात',
        'डिझेल इंजिनपर्यंत पोहोचण्यापूर्वीच वाफ होऊन गायब होते',
      ],
      exp: 'सीएनजीच्या पूर्ण ज्वलनामुळे धूलिकण व काळा धूर घटतो, तर बॅटरीवर चालणाऱ्या विद्युत बसेसमुळे स्थानिक वायूप्रदूषण शून्य राहते.',
    },
    hi: {
      q: 'पुणे और मुंबई जैसे शहरों में कई सार्वजनिक बसों को पुराने डीज़ल इंजनों से बदलकर सीएनजी (CNG) और इलेक्ट्रिक बसों में क्यों बदला गया है?',
      opts: [
        'CNG अधिक स्वच्छ जलती है जिससे कालिख (PM2.5) व धुआँ बहुत कम होता है, जबकि इलेक्ट्रिक बसें भीड़भाड़ वाली सड़कों पर टेलपाइप उत्सर्जन पूरी तरह समाप्त करती हैं',
        'CNG सीधे गन्ने के रस से बनती है और साइलेंसर से शुद्ध ऑक्सीजन छोड़ती है',
        'इलेक्ट्रिक बसें सीटों के नीचे कोयला जलाकर धुआँ दोगुना करती हैं',
        'डीज़ल इंजन तक पहुँचने से पहले ही विटामिन जल में वाष्पित हो जाता है',
      ],
      exp: 'CNG से सूक्ष्म कणों और धुएँ में भारी कमी आती है, तथा बैटरी-इलेक्ट्रिक बसें शहरी सड़कों पर शून्य टेलपाइप प्रदूषण उत्पन्न करती हैं।',
    },
  },
  {
    topic: 'Coastal Tsunami Early Warning & Mangrove Wave Buffers',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'After the 2004 Indian Ocean Tsunami lesson, how do deep-ocean pressure buoys and dense coastal mangrove forests work together to protect coastal villages?',
      opts: [
        'Deep-sea buoys detect sudden undersea earthquake wave changes for early evacuation warnings, while tangled mangrove roots absorb wave energy before reaching shore',
        'Mangrove roots freeze the ocean surface solid while buoys pump monsoon rivers backwards into mountain tops',
        'Tsunami waves occur only during dry noon eclipses and stop automatically when boats blow whistles',
        'Concrete sea-walls taller than Mount Everest surround every fishing boat permanently',
      ],
      exp: 'INCOIS tsunami buoys provide timely coastal alerts for evacuation, and coastal mangroves act as natural bioshields dissipating wave impact.',
    },
    mr: {
      q: '२००४ च्या हिंद महासागरातील त्सुनामीच्या धड्यानंतर खोल समुद्रातील सेन्सर बॉय (Buoys) आणि किनाऱ्यावरील खारफुटीची जंगले गावांचे संरक्षण कसे करतात?',
      opts: [
        'समुद्रतळातील भूकंपामुळे होणारा दाबबदल बॉय लगेच टिपून आगाऊ धोक्याचा इशारा देतात, तर खारफुटीची दाट मुळे लाटांचा वेग व ऊर्जा शोषून किनारा वाचवतात',
        'खारफुटीची मुळे संपूर्ण समुद्र गोठवून बर्फ बनवतात',
        'त्सुनामी लाटा केवळ दुपारी शिट्टी वाजवल्यास आपोआप शांत होतात',
        'प्रत्येक होडीभोवती एव्हरेस्टएवढी उंच सिमेंटची भिंत बांधतात',
      ],
      exp: 'त्सुनामी पूर्वसूचना यंत्रणा वेळेत नागरिकांना सुरक्षित स्थळी हलवण्यास मदत करते, तर खारफुटीचे वन नैसर्गिक संरक्षण कवच म्हणून लाटांची तीव्रता कमी करते.',
    },
    hi: {
      q: '2004 की हिंद महासागर सुनामी से मिले सबक के बाद गहरे समुद्र के चेतावनी बॉय और तटीय मैंग्रोव वन ग्रामों की रक्षा मिलकर कैसे करते हैं?',
      opts: [
        'समुद्री बॉय समुद्रतटीय भूकंप से उठने वाली तरंगों के दाब परिवर्तन को पहचानकर पूर्व चेतावनी देते हैं, जबकि घने मैंग्रोव की जड़ें तट तक पहुँचने से पहले लहरों की ऊर्जा सोखती हैं',
        'मैंग्रोव की जड़ें पूरे समुद्र की सतह को बर्फ में जमा देती हैं',
        'सुनामी केवल नावों की सीटी बजाने से स्वतः रुक जाती है',
        'हर मछली पकड़ने वाली नाव के चारों ओर एवरेस्ट जितनी ऊँची कंक्रीट दीवार बनाई जाती है',
      ],
      exp: 'सुनामी पूर्व-चेतावनी बॉय समय पर निकासी का अलर्ट देते हैं और मैंग्रोव वन प्राकृतिक जैव-ढाल बनकर लहरों की मारक शक्ति घटाते हैं।',
    },
  },
  {
    topic: 'Shukla Paksha Waxing vs Krishna Paksha Waning & Spring Tides',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In the lunar cycle observed across Indian calendars, what distinguishes Shukla Paksha from Krishna Paksha, and when do the highest ocean tides (Spring Tides) occur?',
      opts: [
        'Shukla Paksha is the waxing fortnight from Amavasya to Pournima (Full Moon), Krishna Paksha is the waning half, and Spring Tides peak near Pournima & Amavasya',
        'Shukla Paksha happens only in December while Krishna Paksha means the Moon turns green and orbits Mars',
        'Highest tides happen only during solar midnight eclipses when Earth stops rotating completely',
        'New Moon creates zero ocean motion while Half-Moon drains the Arabian Sea completely dry',
      ],
      exp: 'During the waxing Shukla Paksha the sunlit Moon grows to Pournima, then wanes during Krishna Paksha; Sun–Earth–Moon alignment at Full/New Moon drives Spring Tides.',
    },
    mr: {
      q: 'भारतीय पंचांगातील चंद्रकला चक्रात ‘शुक्ल पक्ष’ आणि ‘कृष्ण पक्ष’ यांतील फरक कोणता, आणि समुद्राला सर्वात मोठे उधाण (Spring Tide) केव्हा येते?',
      opts: [
        'अमावास्येपासून पौर्णिमेपर्यंत चंद्र वाढत जाण्याचा पंधरवडा म्हणजे शुक्ल पक्ष, तर पौर्णिमेपासून अमावास्येपर्यंत घटण्याचा कृष्ण पक्ष; पौर्णिमा व अमावास्येला सर्वात मोठे उधाण येते',
        'शुक्ल पक्ष केवळ डिसेंबरमध्ये येतो आणि कृष्ण पक्षात चंद्र मंगळाभोवती फिरतो',
        'पृथ्वीचे स्वतःभोवती फिरणे पूर्ण थांबल्यावरच सर्वात मोठी भरती येते',
        'अष्टमीला अरबी समुद्र पूर्णपणे कोरडा पडतो',
      ],
      exp: 'अमावास्या ते पौर्णिमा शुक्ल पक्ष (वाढती चंद्रकला) व पौर्णिमा ते अमावास्या कृष्ण पक्ष असतो; सूर्य-पृथ्वी-चंद्र एका रेषेत येणाऱ्या पौर्णिमा-अमावास्येस उधाणाची भरती येते.',
    },
    hi: {
      q: 'भारतीय पंचांग के चंद्र चक्र में शुक्ल पक्ष और कृष्ण पक्ष में क्या अंतर है, तथा समुद्र में सबसे ऊँचा ज्वार (बृहत् ज्वार) कब आता है?',
      opts: [
        'अमावस्या से पूर्णिमा तक चाँद के बढ़ने का पखवाड़ा शुक्ल पक्ष और पूर्णिमा से अमावस्या तक घटने का कृष्ण पक्ष है; बृहत् ज्वार पूर्णिमा व अमावस्या के आसपास आता है',
        'शुक्ल पक्ष केवल दिसंबर में होता है और कृष्ण पक्ष में चंद्रमा मंगल की परिक्रमा करता है',
        'सबसे ऊँचा ज्वार पृथ्वी का घूर्णन रुकने पर ही आता है',
        'अर्धचंद्र के दिन अरब सागर पूरी तरह सूख जाता है',
      ],
      exp: 'शुक्ल पक्ष में चंद्रमा अमावस्या से पूर्णिमा तक बढ़ता है व कृष्ण पक्ष में घटता है; पूर्णिमा व अमावस्या पर सूर्य-पृथ्वी-चंद्र एक सीध में होने से बृहत् ज्वार उठता है।',
    },
  },
  {
    topic: 'Saptarshi Big Dipper Pointer Stars & Orion Constellation',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How can a night-sky observer find the Pole Star (Dhruv Tara) cleanly using the seven bright stars of the Saptarshi (Big Dipper) constellation?',
      opts: [
        'Trace an imaginary straight line through the two outer "pointer" stars at the front of Saptarshi’s bowl upward about five times their distance to meet Dhruv Tara',
        'Look directly straight south beneath the Horizon Crescent exactly at sunrise',
        'Follow the curved tail star downward to the western ocean floor until Mars glows blue',
        'Count three red stars inside Orion’s belt pointing straight toward the South Pole',
      ],
      exp: 'Extending a straight line from the two front bowl stars of Saptarshi (Dubhe & Merak) leads directly to the stationary northern Pole Star.',
    },
    mr: {
      q: 'रात्रीच्या आकाशात ‘सप्तर्षी’ (बिग डिपर) तारकासमूहाच्या मदतीने उत्तर दिशेचा ध्रुवतारा (Dhruv Tara) अचूक कसा ओळखतात?',
      opts: [
        'सप्तर्षीच्या चौकोनी भागातील पुढील दोन तारे जोडणारी सरळ काल्पनिक रेषा पुढे वाढवल्यास ती थेट अचल ध्रुवताऱ्याला मिळते',
        'सूर्योदयाच्या वेळी थेट दक्षिण क्षितिजाखाली पाहून',
        'मृग नक्षत्राच्या तीन मधल्या ताऱ्यांना दक्षिणेकडे जोडून',
        'पौर्णिमेच्या चंद्रामागील काळ्या ढगात शोधून',
      ],
      exp: 'सप्तर्षीच्या आकृतीतील समोरील दोन ताऱ्यांतून जाणारी सरळ रेषा उत्तरेकडे वाढवल्यास बरोबर ध्रुवताऱ्यापाशी पोहोचते.',
    },
    hi: {
      q: 'रात्रि आकाश में सप्तर्षि (बिग डिपर) तारामंडल के सात चमकीले तारों की सहायता से ध्रुव तारा (उत्तर दिशा) कैसे पहचाना जाता है?',
      opts: [
        'सप्तर्षि की करछुल के अगले दो संकेतक तारों को मिलाने वाली सीधी काल्पनिक रेखा को आगे बढ़ाने पर वह सीधे स्थिर ध्रुव तारे तक पहुँचती है',
        'सूर्योदय के समय सीधे दक्षिण क्षितिज के नीचे देखकर',
        'मृग (ओरियन) की बेल्ट के तीन तारों को दक्षिण ध्रुव की ओर बढ़ाकर',
        'पश्चिमी समुद्र में नीले मंगल ग्रह का पीछा करके',
      ],
      exp: 'सप्तर्षि के प्याले के अगले दो तारों से गुजरती सीधी रेखा को उत्तर की ओर आगे बढ़ाने पर ध्रुव तारा स्पष्ट दिखाई देता है।',
    },
  },
  {
    topic: 'Seed Coat Radicle Root & Plumule Shoot Anatomy',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'When students open a soaked gram (chana) or bean seed carefully, which two future plant parts lie tucked inside the embryo between the cotyledons?',
      opts: [
        'The lower radicle that grows downward into the primary root, and the upper plumule that grows upward into the stem and first leaves',
        'A hard glass bottle neck and a woody bark ring that drops off before watering',
        'Dry green petals already covered in beeswax and sweet honey nectar',
        'Two separate insect cocoons storing soil nitrates for adult grasshoppers',
      ],
      exp: 'Inside the seed coat (testa), the embryo consists of the radicle (developing into roots) and plumule (developing into the leafy shoot).',
    },
    mr: {
      q: 'भिजवलेले हरभऱ्याचे किंवा घेवड्याचे बी हळुवार उघडल्यास दोन्ही बीजदलांच्या मधोमध असलेल्या भ्रूणात भावी वनस्पतीचे कोणते दोन भाग दिसतात?',
      opts: [
        'खालच्या दिशेने वाढून मूळ बनणारा आदिमूळ (रॅडिकल) आणि वरच्या दिशेने वाढून खोड व पाने बनणारा अंकुर (प्ल्युम्यूल)',
        'काचेसारखी नळी आणि लाकडी साल',
        'मध व मेणाने भरलेल्या सुक्या रंगीत पाकळ्या',
        'मातीतील किटकांचे दोन कोश',
      ],
      exp: 'बीजावरणाच्या आत भ्रूणात ‘आदिमूळ’ (जमिनीकडे जाणारे मूळ) आणि ‘अंकुर/प्रांकुर’ (वर वाढणारे खोड व पाने) हे भाग असतात.',
    },
    hi: {
      q: 'भीगे हुए चने या सेम के बीज को सावधानी से खोलने पर दोनों बीजपत्रों के बीच स्थित भ्रूण में भावी पौधे के कौन-से दो भाग दिखाई देते हैं?',
      opts: [
        'नीचे की ओर बढ़कर जड़ बनने वाला मूलांकुर (रैडिकल) और ऊपर बढ़कर तना व पत्तियाँ बनने वाला प्रांकुर (प्ल्यूम्यूल)',
        'काँच की नली और कठोर लकड़ी का छल्ला',
        'मधुमक्खी के मोम से ढकी सूखी पंखुड़ियाँ',
        'टिड्डों के दो अलग-अलग कोकून',
      ],
      exp: 'बीज चोल के भीतर स्थित भ्रूण में मूलांकुर (जड़ तंत्र बनाने वाला) तथा प्रांकुर (प्ररोह/तना व पत्ती बनाने वाला) होते हैं।',
    },
  },
  {
    topic: '10% Energy Pyramid & Why Carnivores Are Fewer Than Grasses',
    pattern: 'Analytical',
    difficulty: 'Difficult',
    en: {
      q: 'In an Indian grassland ecosystem (Grass → Deer → Tiger), why do forests always require huge meadows of grass and many deer to support even a handful of tigers?',
      opts: [
        'Only about 10% of stored energy passes cleanly from one trophic level to the next, while most energy is spent on life processes and lost as heat',
        'Tigers eat dry grass stalks directly all summer while deer hunt flying eagles at midnight',
        'Each tiger produces ten times more solar sunlight energy than ten thousand blades of green grass',
        'Grass seeds steal 90% of a deer’s muscle mass whenever deer sleep beneath banyan trees',
      ],
      exp: 'Energy flows unidirectionally with ~90% lost at each step to respiration/heat, forming an upright energy pyramid supporting far fewer top carnivores.',
    },
    mr: {
      q: 'गवताळ प्रदेशातील अन्नसाखळीत (गवत → हरीण → वाघ) मोजक्याच वाघांच्या जगण्यासाठी प्रचंड गवताची कुरणे व अनेक हरणांची गरज का असते?',
      opts: [
        'प्रत्येक पोषण स्तरावर केवळ सुमारे १०% ऊर्जाच पुढच्या स्तराकडे हस्तांतरित होते; बाकी ऊर्जा जीवनक्रिया व उष्णतेच्या रूपात खर्च होते',
        'वाघ उन्हाळ्यात थेट सुके गवत खातात आणि हरणे रात्री गरुडांची शिकार करतात',
        'प्रत्येक वाघ हजारो गवताच्या पात्यांपेक्षा जास्त सौरऊर्जा स्वतः तयार करतो',
        'वडाच्या झाडाखाली झोपल्यावर गवत हरणांचे स्नायू शोषून घेते',
      ],
      exp: 'ऊर्जा पिरॅमिडनुसार प्रत्येक टप्प्यावर सुमारे ९०% ऊर्जा श्वसन व दैनंदिन क्रियांमध्ये खर्च होत असल्याने उच्चस्तरीय मांसभक्षकांची संख्या नेहमी मर्यादित असते.',
    },
    hi: {
      q: 'घास के मैदान की खाद्य श्रृंखला (घास → हिरण → बाघ) में गिने-चुने बाघों के जीवित रहने के लिए विशाल घास क्षेत्र और अनेक हिरणों की आवश्यकता क्यों होती है?',
      opts: [
        'एक पोषण स्तर से अगले स्तर तक केवल लगभग 10% ऊर्जा ही स्थानांतरित होती है, जबकि अधिकांश ऊर्जा जैविक क्रियाओं और ऊष्मा में खर्च हो जाती है',
        'बाघ गर्मियों में सीधे सूखी घास खाते हैं और हिरण रात में बाजों का शिकार करते हैं',
        'प्रत्येक बाघ हजारों घास के तिनकों से दस गुना अधिक सौर ऊर्जा बनाता है',
        'बरगद के नीचे सोने पर घास हिरण की मांसपेशियों का 90% हिस्सा सोख लेती है',
      ],
      exp: 'ऊर्जा प्रवाह के 10% नियम के कारण उच्च पोषण स्तरों तक उपलब्ध ऊर्जा तेजी से घटती है, इसलिए शीर्ष मांसाहारियों की संख्या कम रहती है।',
    },
  },
  {
    topic: 'Neem Leaves Grain Storage & Non-Toxic Pest Prevention',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why have Indian households traditionally tucked dried neem leaves inside airtight metal grain drums (kothi) after sun-drying wheat or jowar?',
      opts: [
        'Natural bitter compounds (azadirachtin) in dried neem leaves repel grain weevils and borers safely without leaving toxic chemical insecticide residues',
        'Dried neem leaves turn dry jowar grains soft and wet so fungus grows thicker inside drums',
        'Neem leaves dissolve all metal drum seams so rainwater can wash wheat every week',
        'Weevils eat neem leaves to multiply twice as fast and warm the kitchen floor',
      ],
      exp: 'Dried neem leaves contain natural insect-repellent compounds (like azadirachtin) that protect dry stored grains safely without chemical toxins.',
    },
    mr: {
      q: 'गहू किंवा ज्वारी उन्हात वाळवून हवाबंद डब्यात/कोठीत भरताना त्यांत वाळलेली कडुलिंबाची पाने ठेवण्याची पारंपरिक पद्धत का उपयुक्त ठरते?',
      opts: [
        'कडुलिंबातील नैसर्गिक कडू घटक (अॅझाडायरेक्टिन) धान्यातील कीड व सोंडे कीटक दूर ठेवतात आणि विषारी रासायनिक कीटकनाशकांचा अंश उरत नाही',
        'कडुलिंबाची पाने धान्य ओले करून त्यावर बुरशी वाढवतात',
        'ही पाने धातूचा डबा विरघळवून पावसाचे पाणी आत सोडतात',
        'धान्यातील कीड ही पाने खाऊन दुप्पट वेगाने वाढते',
      ],
      exp: 'वाळलेल्या कडुलिंबाच्या पानांतील नैसर्गिक कीटक-प्रतिबंधक गुणधर्म विषारी रसायनांशिवाय धान्याचे कीडीपासून रक्षण करतात.',
    },
    hi: {
      q: 'गेहूँ या ज्वार को धूप में सुखाकर वायुरोधी कोठी/डब्बे में भरते समय सूखी नीम की पत्तियाँ रखने की पारंपरिक विधि क्यों उपयोगी मानी जाती है?',
      opts: [
        'नीम की पत्तियों में मौजूद प्राकृतिक कड़वे तत्व (एज़ाडायरेक्टिन) अनाज के घुन व कीड़ों को बिना जहरीले रासायनिक अवशेष छोड़े सुरक्षित रूप से दूर रखते हैं',
        'नीम की पत्तियाँ अनाज को गीला कर उसमें फफूँद बढ़ाती हैं',
        'ये पत्तियाँ लोहे के डब्बे को गलाकर वर्षा जल भीतर जाने देती हैं',
        'घुन नीम की पत्तियाँ खाकर दोगुनी तेजी से प्रजनन करते हैं',
      ],
      exp: 'सूखी नीम की पत्तियाँ प्राकृतिक कीट-विकर्षक के रूप में कार्य करती हैं, जिससे अनाज रसायन-मुक्त और सुरक्षित रहता है।',
    },
  },
  {
    topic: 'First Aid Sprain RICE & Nosebleed Forward Lean',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'During school games, one pupil twists an ankle slightly and another develops a sudden nosebleed in summer heat. Which first-aid response is medically sound for both?',
      opts: [
        'For the sprain apply Rest, Ice pack, gentle Compression, Elevation (R.I.C.E.); for the nosebleed sit the pupil leaning slightly FORWARD while pinching the soft nostrils gently',
        'Force the sprained child to sprint 400 metres while tilting the nosebleed pupil’s head far BACKWARD so blood drains into the throat',
        'Rub hot chilli paste onto the swollen ankle and pack dry chalk powder deep inside both nostrils',
        'Plunge both children immediately into hot boiling water baths without telling the school nurse',
      ],
      exp: 'R.I.C.E. reduces sprain swelling safely; leaning slightly forward while pinching the soft part of the nose stops nosebleeds without choking or swallowing blood.',
    },
    mr: {
      q: 'शाळेच्या मैदानावर खेळताना एका विद्यार्थ्याचा घोटा मुरगळतो आणि उन्हामुळे दुसऱ्याच्या नाकातून रक्त (घोळणा) येऊ लागते. दोन्हीसाठी अचूक प्रथमोपचार कोणते?',
      opts: [
        'मुरगळलेल्या घोट्याला विश्रांती, बर्फाचा शेक, हलकी पट्टी व पाय उंचावर ठेवणे (R.I.C.E.); घोळणा फुटल्यास डोकं किंचित पुढे झुकवून नाकाचा मऊ भाग हलका दाबून धरणे',
        'घोट्याला जोरदार धावायला लावणे आणि नाक फुटलेल्याचे डोके पूर्ण मागे झुकवणे जेणेकरून रक्त घशात जाईल',
        'सुजलेल्या घोट्यावर तिखट लावणे आणि नाकात खडूची पूड भरणे',
        'दोघांनाही तत्काळ उकळत्या गरम पाण्यात बसवणे',
      ],
      exp: 'लचक/मुरगळण्यावर R.I.C.E. सूज कमी करते; घोळणा आल्यास पुढे झुकून नाक दाबल्याने रक्त श्वासनलिकेत किंवा पोटात न जाता थबकते.',
    },
    hi: {
      q: 'खेल के दौरान एक विद्यार्थी के टखने में मोच आ जाती है और गर्मी से दूसरे की नकसीर (नाक से खून) फूट जाती है। दोनों के लिए सही प्राथमिक उपचार क्या है?',
      opts: [
        'मोच के लिए आराम, बर्फ की सिकाई, हल्की पट्टी व पैर ऊपर उठाना (R.I.C.E.); नकसीर में सिर हल्का आगे झुकाकर नाक के मुलायम हिस्से को धीमे से दबाए रखना',
        'मोच वाले बच्चे को 400 मीटर दौड़ाना और नकसीर वाले का सिर पीछे की ओर पूरा झुका देना ताकि खून गले में जाए',
        'सूजे टखने पर मिर्च लेप लगाना और नाक में चॉक पाउडर भरना',
        'दोनों को बिना नर्स को बताए तुरंत उबलते गर्म पानी में बैठा देना',
      ],
      exp: 'R.I.C.E. विधि मोच की सूजन घटाती है और आगे की ओर झुककर नाक दबाने से खून गले में जाने के खतरे के बिना रक्तस्राव रुकता है।',
    },
  },
  {
    topic: 'Never Pour Water on Petrol Oil Fires or Live Electrical Fires',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Why must bystanders NEVER throw buckets of water onto a burning petrol/cooking-oil pan or a sparking electrical switchboard fire?',
      opts: [
        'Oil/petrol is lighter than water and floats atop it spreading the flames wider, while water conducts electricity and risks fatal electric shock on live wires',
        'Cold tap water instantly converts kitchen cooking oil into pure liquid oxygen and freezing dry ice',
        'Petrol is five times heavier than basalt granite and turns buckets into glowing iron magnets',
        'Electrical switches turn tap water into sweet milk foam that feeds wooden chairs',
      ],
      exp: 'Water sinks beneath lighter burning oil/petrol spreading blazing fuel, and mineral tap water conducts electricity; use dry sand, a lid, or CO2/dry-powder extinguishers.',
    },
    mr: {
      q: 'जळणारे पेट्रोल/तेल किंवा ठिणग्या पडणारे विद्युत उपकरण यांवरील आगीवर कधीही पाण्याची बादली का ओतू नये?',
      opts: [
        'तेल व पेट्रोल पाण्यापेक्षा हलके असल्याने पाण्यावर तरंगून आग अधिक पसरवतात, तर पाण्यातून वीज प्रवाहित होऊन जीवघेणा विजेचा धक्का बसतो',
        'थंड पाणी तेलाचे ताबडतोब शुद्ध ऑक्सिजन व कोरड्या बर्फात रूपांतर करते',
        'पेट्रोल पाण्यापेक्षा पाचपट जड असून बादलीचे लोखंडी चुंबक बनवते',
        'विजेचे बटण नळाच्या पाण्याचे दुधात रूपांतर करते',
      ],
      exp: 'पेट्रोल/तेल पाण्यावर तरंगून आग भडकवते आणि पाणी वीजवाहक असल्याने शॉक लागतो; अशा वेळी वाळू, झाकण किंवा CO2/पावडर अग्निशामक वापरावे.',
    },
    hi: {
      q: 'जलते हुए पेट्रोल/खाना पकाने के तेल या चिंगारी छोड़ते बिजली के स्विचबोर्ड की आग पर कभी भी पानी की बाल्टी क्यों नहीं डालनी चाहिए?',
      opts: [
        'तेल/पेट्रोल पानी से हल्का होने के कारण उस पर तैरकर आग को और फैलाता है, जबकि पानी बिजली का सुचालक होकर जानलेवा करंट का खतरा पैदा करता है',
        'ठंडा नल का पानी तेल को तुरंत शुद्ध ऑक्सीजन और सूखी बर्फ में बदल देता है',
        'पेट्रोल बेसाल्ट पत्थर से भारी होकर बाल्टी को चुंबक बना देता है',
        'बिजली के स्विच पानी को मीठे दूध के झाग में बदल देते हैं',
      ],
      exp: 'पानी हल्के जलते तेल के नीचे बैठकर लपटें फैलाता है और बिजली प्रवाहित करता है; ऐसी आग पर सूखी रेत, ढक्कन या CO2/ड्राई-पाउडर बुझाने वाले यंत्र प्रयोग करें।',
    },
  },
  {
    topic: 'Consumer Marks MRP Expiry ISI AGMARK & FSSAI Awareness',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which verification checklist reflects a responsible consumer inspecting packaged groceries, electrical irons, and spice packets under India’s Jago Grahak Jago awareness?',
      opts: [
        'Check Best-Before/Expiry Date & MRP ceiling, verify FSSAI licence on food packs, AGMARK on spices/ghee/oils, and ISI safety mark on electrical appliances',
        'Tear off all date labels before buying so shops can charge triple the printed MRP silently',
        'Look exclusively for bright cartoon stickers regardless of broken seals, bulging tins, or missing dates',
        'Prefer unregistered loose electrical heaters carrying expired medicine seals',
      ],
      exp: 'Authentic FSSAI, AGMARK, and ISI certification marks along with unbroken seals, MRP, and expiry dates protect consumer health and safety.',
    },
    mr: {
      q: '‘जागो ग्राहक जागो’ जनजागृतीनुसार पॅकबंद किराणा, मसाले आणि विजेची इस्त्री खरेदी करताना जागरूक ग्राहकाने कोणती तपासणी करावी?',
      opts: [
        'किमतीची कमाल मर्यादा (MRP) व अंतिम मुदत (Expiry Date) पाहणे, अन्नावर FSSAI, मसाले-तूप-तेलावर AGMARK आणि विद्युत उपकरणांवर ISI प्रमाणचिन्ह तपासणे',
        'खरेदीपूर्वी सर्व तारखेची लेबले फाडून टाकणे जेणेकरून दुकानदार तिप्पट किंमत घेतील',
        'फुगलेले डबे व तुटलेली सील पाहून केवळ रंगीत कार्टून स्टिकर्सवरून वस्तू निवडणे',
        'कालबाह्य औषधांचा शिक्का असलेली अनधिकृत विजेची उपकरणे विकत घेणे',
      ],
      exp: 'अबाधित सील, MRP व Expiry तारखेसह FSSAI, AGMARK व ISI ही प्रमाणचिन्हे ग्राहकांचे आरोग्य व सुरक्षितता सुनिश्चित करतात.',
    },
    hi: {
      q: '‘जागो ग्राहक जागो’ जागरूकता के तहत पैकेट बंद किराना, मसाले और बिजली की प्रेस खरीदते समय एक सतर्क उपभोक्ता को क्या जांचना चाहिए?',
      opts: [
        'अधिकतम खुदरा मूल्य (MRP) व समाप्ति तिथि (Expiry Date) देखना, खाद्य पैकेट पर FSSAI, मसाले-घी-तेल पर AGMARK और विद्युत उपकरणों पर ISI चिह्न सत्यापित करना',
        'खरीदने से पहले सभी तिथि लेबल फाड़ देना ताकि दुकानदार तीन गुना कीमत वसूल सकें',
        'टूटी सील और फूले डिब्बों को अनदेखा कर केवल कार्टून स्टिकर देखकर सामान लेना',
        'बिना मानक चिह्न वाले खुले बिजली के हीटर खरीदना',
      ],
      exp: 'MRP, वैध समाप्ति तिथि, सुरक्षित पैकिंग के साथ FSSAI, AGMARK और ISI मानक चिह्न उपभोक्ता सुरक्षा व गुणवत्ता की गारंटी देते हैं।',
    },
  },
  {
    topic: '6-Digit Indian PIN Code Structure Zone 4 Maharashtra',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In India’s 6-digit Postal Index Number (PIN) system (for example, 411001 in Pune), what do the digits systematically encode to speed up mail sorting?',
      opts: [
        'Digit 1 identifies the postal zone (4 covers Maharashtra & Goa), Digit 2 the sub-zone, Digit 3 the sorting district, and the last 3 digits pinpoint the delivery post office',
        'All six digits display the postman’s bicycle licence plate number and house roof height',
        'Digit 1 counts the river bridges crossed, while the last five digits denote total stamps glued',
        'Numbers starting with 4 indicate exclusively overseas airmail packages bound for Antarctica',
      ],
      exp: 'Introduced in 1972, the 6-digit PIN encodes Region (1st digit; Zone 4 = Maharashtra/Goa/MP-CG), Sub-region (2nd), Sorting District (3rd), and Post Office (last 3).',
    },
    mr: {
      q: 'भारताच्या ६-अंकी पिन कोड (PIN) प्रणालीत (उदा. पुण्याचा ४११००१) टपाल वर्गीकरण जलद होण्यासाठी ते सहा अंक काय दर्शवतात?',
      opts: [
        'पहिला अंक टपाल विभाग (४ म्हणजे महाराष्ट्र/गोवा/म.प्र. विभाग), दुसरा उपविभाग, तिसरा वर्गीकरण जिल्हा आणि शेवटचे तीन अंक नेमके वितरण टपाल कार्यालय दर्शवतात',
        'सहाही अंक टपालवाल्याच्या सायकलचा क्रमांक व घराची उंची सांगतात',
        'पहिला अंक नदीवरील पूल आणि शेवटचे पाच अंक तिकिटांची संख्या मोजतात',
        '४ ने सुरू होणारे क्रमांक केवळ अंटार्क्टिका खंडातील टपालासाठी असतात',
      ],
      exp: '१९७२ मध्ये सुरू झालेल्या ६-अंकी पिनकोडमध्ये पहिले तीन अंक क्षेत्र-उपक्षेत्र-जिल्हा तर शेवटचे तीन अंक संबंधित टपाल कार्यालयाचा पत्ता निश्चित करतात.',
    },
    hi: {
      q: 'भारत की 6-अंकीय पिन कोड (PIN) प्रणाली (जैसे पुणे के लिए 411001) में डाक छँटाई तेज करने हेतु ये छह अंक क्रमशः क्या दर्शाते हैं?',
      opts: [
        'पहला अंक डाक क्षेत्र (4 में महाराष्ट्र व गोवा आदि आते हैं), दूसरा उप-क्षेत्र, तीसरा छँटाई जिला और अंतिम तीन अंक वितरण डाकघर दर्शाते हैं',
        'सभी छह अंक डाकिये की साइकिल का नंबर और मकान की ऊँचाई बताते हैं',
        'पहला अंक पुलों की संख्या और अंतिम पाँच अंक डाक टिकटों की गिनती बताते हैं',
        '4 से शुरू होने वाले कोड केवल अंटार्कटिका जाने वाली हवाई डाक के लिए होते हैं',
      ],
      exp: '1972 में लागू 6-अंकीय PIN कोड में प्रथम तीन अंक डाक क्षेत्र, उप-क्षेत्र व छँटाई जिले तथा अंतिम तीन अंक विशिष्ट डाकघर की पहचान कराते हैं।',
    },
  },
  {
    topic: 'Ancient Punch-Marked Coins Numismatics as Historical Sources',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'How do ancient silver and copper punch-marked coins (like Karshapanas unearthed in Maharashtra’s Deccan sites) act as invaluable primary sources for historians?',
      opts: [
        'Their stamped royal emblems, scripts, alloy purity, and geographic spread reveal past dynasties, trade routes, economic prosperity, and metallurgy skills',
        'Archaeologists melt every ancient coin immediately to predict next year’s Arabian Sea monsoon tide',
        'Punch-marked coins served solely as round playing marbles for prehistoric cave tigers',
        'Every ancient bronze coin prints modern GPS satellite coordinates along its inner rim',
      ],
      exp: 'Numismatics (study of coins) verifies rulers, chronology, inscriptions, metallurgy, and long-distance trade networks.',
    },
    mr: {
      q: 'दख्खन व महाराष्ट्रातील उत्खननांत सापडलेली प्राचीन आहत नाणी (कार्षापण) इतिहासकारांसाठी अत्यंत मौल्यवान भौतिक साधन का ठरतात?',
      opts: [
        'त्यांवरील ठसे/राजचिन्हे, लिपी, धातूची शुद्धता आणि ती सापडण्याची ठिकाणे यांवरून प्राचीन राजसत्ता, व्यापार मार्ग, आर्थिक स्थिती व धातूविज्ञान समजते',
        'पुरातत्त्वज्ञ ही नाणी वितळवून पुढील पावसाळ्याचा अंदाज लावतात',
        'ही नाणी केवळ अश्मयुगीन गुहांतील खेळण्याच्या गोट्या होत्या',
        'प्रत्येक प्राचीन नाण्यावर आधुनिक उपग्रह जीपीएस क्रमांक कोरलेला असतो',
      ],
      exp: 'नाणकशास्त्रानुसार (न्यूमिस्मॅटिक्स) नाण्यांवरील मुद्रा, धातू व वितरण यांतून तत्कालीन राज्यकर्ते, अर्थव्यवस्था व परदेश व्यापाराची खात्रीशीर माहिती मिळते.',
    },
    hi: {
      q: 'महाराष्ट्र व दक्कन के पुरास्थलों से प्राप्त प्राचीन आहत (पंच-मार्क) सिक्के इतिहासकारों के लिए अमूल्य ऐतिहासिक स्रोत कैसे हैं?',
      opts: [
        'उन पर अंकित राजचिह्न, लिपि, धातु की शुद्धता और प्राप्ति-स्थल तत्कालीन राजवंशों, व्यापार मार्गों, आर्थिक समृद्धि व धातुकर्म कौशल को प्रमाणित करते हैं',
        'पुरातत्वविद् अगले वर्ष के मानसून की भविष्यवाणी के लिए हर सिक्के को पिघला देते हैं',
        'आहत सिक्के केवल गुफा युग के खेल के कंचे थे',
        'हर प्राचीन काँस्य सिक्के पर आधुनिक GPS निर्देशांक खुदे होते हैं',
      ],
      exp: 'मुद्राशास्त्र (न्यूमिस्मैटिक्स) के अंतर्गत सिक्कों के प्रतीक, लेख, धातु मिश्रण और प्रसार से शासकों, कालक्रम व व्यापार का विश्वसनीय प्रमाण मिलता है।',
    },
  },
  {
    topic: 'World Continents & Oceans Superlatives',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which factual statement accurately describes major continents and oceans on Earth’s globe?',
      opts: [
        'Asia is the largest continent by area and population, Africa holds the Sahara Desert, and the Pacific Ocean is Earth’s largest and deepest ocean',
        'Australia is Earth’s largest frozen ocean while Antarctica is the warmest rainforest continent',
        'The Indian Ocean covers every North Pole glacier while Europe contains the Amazon River basin',
        'South America contains zero rivers and lies directly underneath the Atlantic Ocean floor',
      ],
      exp: 'Earth has 7 continents (Asia largest, Australia smallest) and 5 oceans (Pacific largest/deepest); Sahara is in northern Africa.',
    },
    mr: {
      q: 'पृथ्वीवरील प्रमुख खंड आणि महासागर यांसंबंधी खालीलपैकी कोणते विधान पूर्णपणे अचूक आहे?',
      opts: [
        'क्षेत्रफळ व लोकसंख्येने आशिया सर्वात मोठा खंड आहे, सहारा वाळवंट आफ्रिकेत आहे आणि प्रशांत (पॅसिफिक) हा सर्वात मोठा व खोल महासागर आहे',
        'ऑस्ट्रेलिया हा सर्वात मोठा गोठलेला महासागर असून अंटार्क्टिका सर्वाधिक उष्ण वर्षावन खंड आहे',
        'हिंद महासागर उत्तर ध्रुवावर आहे आणि ॲमेझॉन खोरे युरोपमध्ये आहे',
        'दक्षिण अमेरिकेत एकही नदी नसून तो अटलांटिक महासागराच्या तळाशी बुडालेला आहे',
      ],
      exp: 'आशिया हा जगातील सर्वात मोठा खंड असून प्रशांत महासागर आकार व खोलीने सर्वात मोठा आहे; सहारा हे जगातील मोठे उष्ण वाळवंट आफ्रिकेत आहे.',
    },
    hi: {
      q: 'पृथ्वी के प्रमुख महाद्वीपों और महासागरों के विषय में कौन-सा तथ्य पूर्णतः सही है?',
      opts: [
        'क्षेत्रफल और जनसंख्या में एशिया सबसे बड़ा महाद्वीप है, सहारा मरुस्थल अफ्रीका में है तथा प्रशांत महासागर पृथ्वी का सबसे बड़ा और गहरा महासागर है',
        'ऑस्ट्रेलिया सबसे बड़ा हिमाच्छादित महासागर है और अंटार्कटिका सबसे गर्म वर्षावन महाद्वीप है',
        'हिंद महासागर उत्तरी ध्रुव पर स्थित है और अमेज़न नदी बेसिन यूरोप में है',
        'दक्षिण अमेरिका में कोई नदी नहीं है और वह अटलांटिक महासागर के तल में डूबा है',
      ],
      exp: 'पृथ्वी पर 7 महाद्वीप (एशिया सबसे बड़ा) और 5 महासागर (प्रशांत सबसे बड़ा व गहरा) हैं; सहारा मरुस्थल उत्तरी अफ्रीका में स्थित है।',
    },
  },
  {
    topic: 'Outdoor Play & 9-10 Hours Screen-Free Sleep in Childhood Growth',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why do primary school health guidelines advise outdoor physical play and 9–10 hours of undisturbed, screen-free night sleep alongside nutritious meals?',
      opts: [
        'Outdoor sunlight and running strengthen bones and heart fitness, while deep sleep triggers growth hormone release and consolidates classroom memory',
        'Late-night smartphone glow doubles haemoglobin production inside a child’s fingernails',
        'Sitting still for 16 hours daily turns white sugar snacks directly into solid femur bone',
        'Skipping sleep completely forces digestive enzymes to work twice as fast during exams',
      ],
      exp: 'Active outdoor play builds musculoskeletal/cardiovascular strength, and adequate deep sleep supports physical growth, immunity, and learning retention.',
    },
    mr: {
      q: 'प्राथमिक आरोग्य मार्गदर्शक तत्त्वांत पौष्टिक आहारासोबतच मैदानी खेळ आणि रात्री ९–१० तास स्क्रीन-मुक्त शांत झोपेचा सल्ला का दिला जातो?',
      opts: [
        'मैदानी खेळ व कोवळ्या उन्हामुळे हाडे व हृदय बळकट होतात, तर गाढ झोपेत वृद्धी संप्रेरक (ग्रोथ हार्मोन) स्रवून दिवसा शिकलेल्या गोष्टींची स्मृती पक्की होते',
        'रात्री उशिरा मोबाइल स्क्रीन पाहिल्याने नखांतील हिमोग्लोबिन दुप्पट होते',
        'दिवसाला १६ तास एकाच जागी बसून राहिल्यास साखरेचे रूपांतर मजबूत हाडांत होते',
        'झोप पूर्णपणे टाळल्याने परीक्षेच्या काळात पचनशक्ती दुप्पट वेगाने काम करते',
      ],
      exp: 'शारीरिक हालचाल, मैदानी खेळ व पुरेशी शांत झोप मुलांची शारीरिक वाढ, प्रतिकारशक्ती आणि बौद्धिक स्मरणशक्तीसाठी अत्यावश्यक असते.',
    },
    hi: {
      q: 'प्राथमिक विद्यालय स्वास्थ्य दिशानिर्देशों में पौष्टिक आहार के साथ-साथ बाहरी खेल और रात में 9–10 घंटे की स्क्रीन-मुक्त नींद की सलाह क्यों दी जाती है?',
      opts: [
        'मैदानी खेल व धूप हड्डियों तथा हृदय को मजबूत करते हैं, जबकि गहरी नींद में वृद्धि हार्मोन स्रावित होता है और दिन भर सीखी बातें स्मृति में पक्की होती हैं',
        'देर रात मोबाइल की रोशनी देखने से नाखूनों में हीमोग्लोबिन दोगुना हो जाता है',
        'रोज 16 घंटे बिना हिले बैठने से चीनी सीधे मजबूत हड्डी में बदल जाती है',
        'नींद पूरी तरह छोड़ने से परीक्षा के दौरान पाचन एंजाइम दोगुनी गति से काम करते हैं',
      ],
      exp: 'शारीरिक गतिविधि, बाहरी खेल और पर्याप्त गहरी नींद बाल विकास, रोग प्रतिरोधक क्षमता और स्मरण शक्ति के सुदृढ़ीकरण के लिए आवश्यक हैं।',
    },
  },
  {
    topic: 'Clean Drinking Water Chlorine Drops & Potable Standards',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Following heavy monsoon floods when tap water turns mildly turbid, what safe sequence ensures drinking water at a relief camp does not spread cholera or dysentery?',
      opts: [
        'Allow mud to settle (or filter through clean cloth/sand), then boil water at a rolling boil (or treat with measured chlorine drops) and store covered with a ladle',
        'Serve clear-looking cold river water straight from open buckets using bare hands',
        'Add two tablespoons of river silt back into the pot so germs sink gently to the bottom forever',
        'Expose sealed metal drums to moonlight for ten minutes instead of boiling',
      ],
      exp: 'Clarifying turbidity first and then disinfecting via rolling boil or measured chlorination eliminates waterborne pathogens like Vibrio cholerae.',
    },
    mr: {
      q: 'जोरदार पूर आल्यानंतर नळाचे पाणी गढूळ झाल्यास कॉलरा किंवा अतिसार टाळण्यासाठी पाणी पिण्यायोग्य करण्याची सुरक्षित पद्धत कोणती?',
      opts: [
        'पाण्यातील गाळ खाली बसवून/स्वच्छ कापडातून गाळून घ्यावे, नंतर ते उकळून (किंवा मोजके क्लोरीन थेंब टाकून) झाकलेल्या भांड्यात दांड्याच्या ओगराळ्याने वापरावे',
        'नदीचे थंड दिसणारे पाणी तसेच उघड्या बादलीत हाताने बुडवून प्यावे',
        'मातीचे दोन चमचे पुन्हा पाण्यात मिसळावेत म्हणजे जंतू तळाशीच राहतील',
        'पाणी न उकळता केवळ दहा मिनिटे चांदण्यात ठेवावे',
      ],
      exp: 'गढूळपणा दूर करून पाणी उकळल्यास किंवा योग्य प्रमाणात क्लोरीन मिसळल्यास जलजन्य रोगजंतू नष्ट होतात; हात बुडवणे टाळल्याने पुनर्प्रदूषण टळते.',
    },
    hi: {
      q: 'भारी मानसूनी बाढ़ के बाद नल का पानी मटमैला हो जाने पर हैजा व पेचिश रोकने हेतु पेयजल को सुरक्षित बनाने का सही तरीका क्या है?',
      opts: [
        'पहले गाद बैठने दें या स्वच्छ कपड़े से छानें, फिर पानी को अच्छी तरह उबालें (या मापे हुए क्लोरीन बूँद डालें) और ढके बर्तन में डंडी वाले लोटे से निकालें',
        'साफ दिखने वाला नदी का ठंडा पानी सीधे खुली बाल्टी में हाथ डुबोकर पिलाएँ',
        'मिट्टी के दो चम्मच वापस घड़े में डाल दें ताकि जीवाणु तल पर दब जाएँ',
        'उबालने के बजाय बंद स्टील ड्रम को दस मिनट चाँदनी में रख दें',
      ],
      exp: 'पहले गंदलापन दूर कर फिर उबालने या क्लोरीनीकरण से जलजनित रोगाणु नष्ट हो जाते हैं और ढके बर्तन से पुनः संदूषण नहीं होता।',
    },
  },
  {
    topic: 'Maharashtra Tribal Bamboo Crafts & Forest Minor Produce',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'How do sustainable forest-based livelihoods in eastern Maharashtra (such as Gadchiroli and Melghat) protect forest biodiversity while supporting local communities?',
      opts: [
        'Communities harvest renewable minor forest produce like bamboo baskets, mahua flowers, tendu leaves, and wild honey without clear-felling old forest trees',
        'Villagers burn down entire teak forests every April to turn red soil into concrete parking lots',
        'Hunters trap every hornbill and owl in bamboo cages to increase wild tamarind yields',
        'Logging trucks strip riverbanks bare so monsoon landslides bury hillside villages',
      ],
      exp: 'Non-timber forest produce (NTFP) such as bamboo, mahua, and honey lets local communities earn dignified livelihoods while keeping forests standing.',
    },
    mr: {
      q: 'गडचिरोली व मेळघाटासारख्या पूर्व महाराष्ट्रातील वनभागांत बांबू, मोहफुले, मध व डिंक यांसारख्या गौण वनउपजांवर आधारित उपजीविका वनसंवर्धनास कशी मदत करते?',
      opts: [
        'जुन्या वृक्षांची तोड न करता बांबूच्या वस्तू, मोहफुले व वनमध यांसारख्या शाश्वत वनउपजांचे संकलन केल्याने स्थानिकांना रोजगार मिळून जंगलही सुरक्षित राहते',
        'दर एप्रिलमध्ये संपूर्ण सागवानाचे जंगल जाळून काँक्रीटचे मैदान केले जाते',
        'चिंचेचे पीक वाढवण्यासाठी धनेश पक्षी व घुबडांना पिंजऱ्यात बंद केले जाते',
        'नदीकाठची सर्व झाडे तोडून दरडी कोसळण्यास प्रोत्साहन दिले जाते',
      ],
      exp: 'गौण वनउपजांचे शाश्वत संकलन केल्याने जंगल टिकवून ठेवण्यात ग्रामस्थांचा थेट सहभाग व आर्थिक हित जपले जाते.',
    },
    hi: {
      q: 'गढ़चिरौली और मेलघाट जैसे पूर्वी महाराष्ट्र के वन क्षेत्रों में बांस, महुआ, तेंदू पत्ता व शहद जैसे लघु वनोपज पर आधारित आजीविका जैव-विविधता कैसे बचाती है?',
      opts: [
        'पुराने पेड़ों को काटे बिना बांस शिल्प, महुआ फूल और वन शहद के सतत संग्रह से स्थानीय लोगों को रोजगार मिलता है और जंगल खड़े व सुरक्षित रहते हैं',
        'हर अप्रैल में पूरे सागौन जंगल को जलाकर कंक्रीट पार्किंग बनाई जाती है',
        'इमली की उपज बढ़ाने हेतु हॉर्नबिल व उल्लुओं को पिंजरों में बंद किया जाता है',
        'नदी तट के सभी पेड़ काटकर मानसूनी भूस्खलन बढ़ाया जाता है',
      ],
      exp: 'गैर-काष्ठ लघु वनोपज का टिकाऊ उपयोग वनवासियों को सम्मानजनक आय प्रदान करते हुए वन संरक्षण को प्रोत्साहित करता है।',
    },
  },
  {
    topic: 'Atmospheric Air Pressure & Drinking Through a Straw',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'When you suck air out of a drinking straw dipped in coconut water, what physical force actually pushes the liquid upward into your mouth?',
      opts: [
        'Removing air lowers pressure inside the straw, so greater outside atmospheric air pressure pushing down on the coconut water surface forces liquid up the straw',
        'Earth’s magnetic core pulls coconut water molecules upward whenever lips touch plastic',
        'Gravity suddenly reverses upward inside thin cylindrical straws below room temperature',
        'Liquid water drops climb upward purely because sugar tastes heavier than steel',
      ],
      exp: 'Sucking lowers internal straw pressure below atmospheric pressure; the surrounding atmospheric air pushing on the liquid surface drives water up the straw.',
    },
    mr: {
      q: 'शहाळ्याच्या पाण्यात स्ट्रॉ (नळी) घालून वरून हवा ओढल्यावर पाणी स्ट्रॉतून वर आपल्या तोंडात कशामुळे येते?',
      opts: [
        'स्ट्रॉतील हवा ओढल्याने आतील हवेचा दाब कमी होतो आणि बाहेरच्या वातावरणीय हवेच्या जास्त दाबामुळे पाणी स्ट्रॉतून वर ढकलले जाते',
        'पृथ्वीचे चुंबकीय केंद्र नारळाचे पाणी थेट ओठांकडे खेचते',
        'पातळ नळीत गुरुत्वाकर्षण अचानक उलट्या दिशेने वर काम करू लागते',
        'साखर पोलादापेक्षा जड असल्यामुळे पाणी स्वतःच वर चढते',
      ],
      exp: 'स्ट्रॉमधून हवा काढल्यामुळे आत कमी दाब निर्माण होतो आणि द्रवाच्या पृष्ठभागावर पडणारा वातावरणीय दाब पाणी वर ढकलतो.',
    },
    hi: {
      q: 'नारियल पानी में स्ट्रॉ डालकर ऊपर से हवा खींचने पर वास्तव में कौन-सा भौतिक बल द्रव को स्ट्रॉ के रास्ते मुँह तक ऊपर धकेलता है?',
      opts: [
        'हवा खींचने से स्ट्रॉ के भीतर वायु दाब कम हो जाता है, जिससे नारियल पानी की सतह पर बाहर से लगने वाला अधिक वायुमंडलीय दाब द्रव को ऊपर चढ़ा देता है',
        'पृथ्वी का चुंबकीय केंद्र होठों के छूते ही नारियल पानी को ऊपर खींच लेता है',
        'पतली नली के अंदर गुरुत्वाकर्षण अचानक ऊपर की दिशा में पलट जाता है',
        'शक्कर के भारी स्वाद के कारण पानी की बूँदें स्वयं ऊपर चढ़ती हैं',
      ],
      exp: 'चूसने से स्ट्रॉ के अंदर दाब घटता है और तरल की खुली सतह पर कार्यरत वायुमंडलीय दाब द्रव को ऊपर की ओर धकेलता है।',
    },
  },
  {
    topic: 'Solar Water Heater Absorption Dark Matte Pipes',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why are solar water-heater collector tubes on terraced roofs painted matte black and angled toward the Sun rather than coated in shiny white?',
      opts: [
        'Matte black surfaces absorb maximum radiant solar heat efficiently while shiny white surfaces reflect most sunlight away',
        'Black paint generates electric voltage directly out of moonlight during cloudy nights',
        'White glass pipes freeze warm morning water into heavy hailstones inside copper tanks',
        'Black tubes stop atmospheric nitrogen from escaping cold bathroom taps',
      ],
      exp: 'Dark matte finishes are strong thermal absorbers (and poor reflectors), transferring maximum solar radiation to water inside collector tubes.',
    },
    mr: {
      q: 'घरांच्या छतावरील सौर जलतापक (सोलर वॉटर हिटर) यंत्राच्या काचेच्या नळ्या चमकदार पांढऱ्या न ठेवता गडद काळ्या का रंगवलेल्या असतात?',
      opts: [
        'काळा पृष्ठभाग सूर्याची उष्णता सर्वाधिक प्रमाणात शोषून घेतो, तर चमकदार पांढरा रंग बहुतांश सूर्यप्रकाश परावर्तित करतो',
        'काळा रंग ढगाळ रात्री चांदण्यातून थेट वीज निर्माण करतो',
        'पांढऱ्या नळ्या सकाळच्या पाण्याचे गारांमध्ये रूपांतर करतात',
        'काळ्या नळ्या नळातील पाण्यातील नायट्रोजन बाहेर पडू देत नाहीत',
      ],
      exp: 'गडद काळे पृष्ठभाग सौर उष्णता विकिरणांचे उत्तम शोषक असल्याने पाणी जलद व कार्यक्षमतेने तापते.',
    },
    hi: {
      q: 'छतों पर लगे सौर जल-तापक (सोलर वॉटर हीटर) की संग्राहक नलियाँ चमकदार सफेद के बजाय गहरे काले रंग की क्यों होती हैं?',
      opts: [
        'मैट काला रंग सौर ऊष्मा विकिरण का सर्वाधिक अवशोषण करता है, जबकि चमकदार सफेद सतह अधिकांश सूर्यप्रकाश परावर्तित कर देती है',
        'काला रंग बादलों भरी रात में चाँदनी से सीधे बिजली पैदा करता है',
        'सफेद नलियाँ सुबह के पानी को तांबे की टंकी में ओलों में जमा देती हैं',
        'काली नलियाँ नल के पानी से नाइट्रोजन को बाहर जाने से रोकती हैं',
      ],
      exp: 'गहरा काला पृष्ठभाग सूर्य की ऊष्मा का उत्कृष्ट अवशोषक होता है, जिससे पानी तेजी से गर्म होता है।',
    },
  },
];
