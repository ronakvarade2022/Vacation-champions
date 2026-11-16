import { CuratedTrilingualMcq } from './types';

// MAHA TET Paper 1 (Classes 1-5) — EVS Content Part 4 (36 Distinct Food, Nutrition, Water & Shelter Items)
export const MAHA_TET_P1_B1_EVS_C4: CuratedTrilingualMcq[] = [
  {
    topic: 'Vitamin C Deficiency Disease (Scurvy)',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Bleeding gums, swollen joints, and slow wound healing indicate a dietary deficiency of which vitamin abundant in amla, lemon, and oranges?',
      opts: ['Vitamin C (causing Scurvy)', 'Vitamin A (Night Blindness)', 'Vitamin D (Rickets)', 'Vitamin B1 (Beriberi)'],
      exp: 'Ascorbic acid (Vitamin C) deficiency produces Scurvy (bleeding gums and delayed wound healing).',
    },
    mr: {
      q: 'हिरड्यांमधून रक्त येणे, सांधे सुजणे व जखम उशिरा भरणे ही लक्षणे आवळा, लिंबू व संत्र्यांत विपुल असणाऱ्या कोणत्या जीवनसत्त्वाच्या अभावामुळे दिसतात?',
      opts: ['जीवनसत्त्व क / C (स्कर्वी रोग)', 'जीवनसत्त्व अ / A (रातांधळेपणा)', 'जीवनसत्त्व ड / D (मुडदूस)', 'जीवनसत्त्व ब१ / B1 (बेरीबेरी)'],
      exp: 'जीवनसत्त्व क (Vitamin C) च्या कमतरतेमुळे स्कर्वी हा विकार होतो; आवळा, लिंबू, संत्री हे त्याचे उत्तम स्रोत आहेत.',
    },
    hi: {
      q: 'मसूड़ों से खून आना और घाव देर से भरना किस विटामिन की कमी (आँवला, नींबू, संतरा में प्रचुर) से होता है?',
      opts: ['विटामिन C (स्कर्वी रोग)', 'विटामिन A (रतौंधी)', 'विटामिन D (रिकेट्स)', 'विटामिन B1 (बेरीबेरी)'],
      exp: 'विटामिन C की कमी से स्कर्वी रोग होता है, जिसकी पूर्ति खट्टे रसीले फलों से होती है।',
    },
  },
  {
    topic: 'Vitamin A Deficiency & Sources',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'If a child struggles to see clearly in dim dusk lighting (Night Blindness / Xerophthalmia), which food group should be boosted in their daily diet?',
      opts: [
        'Carrots, ripe papaya, mango, spinach, and yellow pumpkin rich in Vitamin A',
        'Polished white sugar and soda',
        'Pure rock salt',
        'Deep-fried potato chips',
      ],
      exp: 'Vitamin A maintains retinal vision health; orange-yellow fruits and dark green leafy vegetables prevent Night Blindness.',
    },
    mr: {
      q: 'मुलाला संध्याकाळच्या मंद प्रकाशात किंवा रात्री नीट न दिसणे (रातांधळेपणा) टाळण्यासाठी आहारात कोणते जीवनसत्त्व-युक्त अन्न वाढवावे?',
      opts: [
        'गाजर, पिकलेली पपई, आंबा, पालक व लाल भोपळा (जीवनसत्त्व A समृद्ध)',
        'फक्त पांढरी साखर व सोडा',
        'केवळ सैंधव मीठ',
        'तळलेले वेफर्स',
      ],
      exp: 'जीवनसत्त्व A च्या कमतरतेमुळे रातांधळेपणा येतो; पिवळी-केशरी फळे व पालेभाज्या डोळ्यांचे रक्षण करतात.',
    },
    hi: {
      q: 'मंद रोशनी में स्पष्ट न दिखने (रतौंधी) से बचाव हेतु बच्चे के आहार में किन खाद्य पदार्थों की मात्रा बढ़ानी चाहिए?',
      opts: [
        'गाजर, पका पपीता, आम, पालक और कद्दू (विटामिन A से भरपूर)',
        'सफेद चीनी और सोडा',
        'केवल नमक',
        'तले हुए चिप्स',
      ],
      exp: 'विटामिन A की कमी से रतौंधी होती है; गाजर, पपीता व हरी पत्तेदार सब्जियाँ आँखों के लिए उत्तम हैं।',
    },
  },
  {
    topic: 'Vitamin D Sunlight Synthesis & Rickets',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Soft, bent leg bones (bowlegs / Rickets) in growing children develop when the body lacks calcium absorption due to deficiency of:',
      opts: ['Vitamin D (synthesized cleanly in skin under mild morning sunlight)', 'Vitamin K', 'Dietary Roughage fibre', 'Sodium Chloride'],
      exp: 'Vitamin D regulates calcium-phosphorus bone mineralization; its deficiency causes Rickets in children.',
    },
    mr: {
      q: 'लहान मुलांची हाडे मऊ होऊन वाकणे (मुडदूस / Rickets) हा आजार सकाळच्या कोवळ्या उन्हातून मिळणाऱ्या कोणत्या जीवनसत्त्वाच्या कमतरतेमुळे होतो?',
      opts: ['जीवनसत्त्व ड (Vitamin D)', 'जीवनसत्त्व के (Vitamin K)', 'चोथायुक्त तंतूमय पदार्थ', 'सोडियम क्लोराईड'],
      exp: 'कॅल्शियम शोषणासाठी जीवनसत्त्व ड आवश्यक असते; त्याच्या कमतरतेने हाडे कमकुवत होऊन मुडदूस होतो.',
    },
    hi: {
      q: 'बच्चों में हड्डियों का नरम होकर मुड़ जाना (सूखा रोग / रिकेट्स) किसकी कमी से होता है?',
      opts: ['विटामिन D (जो प्रातःकालीन धूप से त्वचा में बनता है)', 'विटामिन K', 'आहारीय रेशे (Roughage)', 'नमक'],
      exp: 'विटामिन D कैल्शियम अवशोषण के लिए आवश्यक है; इसकी कमी से रिकेट्स होता है।',
    },
  },
  {
    topic: 'Iron Deficiency Anaemia & Jaggery/Spinach Remedy',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'A primary school health check-up reveals pale nails, tiredness, and low haemoglobin (Anaemia) in several pupils. Which affordable local food combination builds iron best?',
      opts: [
        'Jaggery (Gul), spinach (Palak), fenugreek (Methi), dates, sprouted pulses, and amla/lemon (Vitamin C helps absorb iron)',
        'Carbonated cola drinks and white bread',
        'Plain rice porridge with ghee only',
        'Packaged salted biscuits only',
      ],
      exp: 'Green leafy vegetables, jaggery, and amla provide iron paired with Vitamin C for high intestinal absorption.',
    },
    mr: {
      q: 'शाळेतील आरोग्य तपासणीत मुलांमध्ये थकवा, निस्तेजपणा व हिमोग्लोबिन कमी (रक्तक्षय / Anaemia) आढळल्यास कोणता स्थानिक स्वस्त आहार सर्वोत्तम ठरतो?',
      opts: [
        'गूळ, शेंगदाणे, पालक-मेथी पालेभाज्या, खजूर, मोड आलेली कडधान्ये व आवळा/लिंबू',
        'कोल्ड्रिंक्स व मैद्याचा पाव',
        'फक्त साधा भात व तूप',
        'केवळ खारी बिस्किटे',
      ],
      exp: 'गूळ, पालेभाज्या व आवळा एकत्र घेतल्यास लोह (Iron) शरीरात उत्तम शोषले जाऊन हिमोग्लोबिन वाढते.',
    },
    hi: {
      q: 'विद्यालय स्वास्थ्य जाँच में बच्चों में थकान और कम हीमोग्लोबिन (रक्ताल्पता / एनीमिया) मिलने पर कौन-सा सस्ता स्थानीय आहार श्रेष्ठ है?',
      opts: [
        'गुड़, पालक, मेथी, खजूर, अंकुरित दालें तथा आँवला/नींबू (विटामिन C लौह अवशोषण बढ़ाता है)',
        'कोल्ड ड्रिंक और सफेद ब्रेड',
        'केवल सादा चावल',
        'केवल नमकीन बिस्कुट',
      ],
      exp: 'गुड़ व हरी पत्तेदार सब्जियाँ लौह तत्व देती हैं और आँवला-नींबू उसके अवशोषण में मदद करता है।',
    },
  },
  {
    topic: 'Iodine Deficiency Goitre Prevention',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Swelling of the thyroid gland at the front of the neck—known as Goitre—occurs mainly due to chronic shortage of which mineral in food and water?',
      opts: ['Iodine (hence iodized salt campaigns)', 'Calcium', 'Phosphorus', 'Zinc'],
      exp: 'Thyroid hormone synthesis depends on trace Iodine; lack of iodine causes Goitre and developmental delays.',
    },
    mr: {
      q: 'गळ्याच्या पुढील भागात थायरॉईड ग्रंथीला सूज येणारा "गलगंड" (Goitre) हा विकार मुख्यतः कोणत्या खनिजाच्या कमतरतेमुळे होतो?',
      opts: ['आयोडीन (म्हणून आयोडीनयुक्त मीठ वापरतात)', 'कॅल्शियम', 'फॉस्फरस', 'झिंक'],
      exp: 'आयोडीनच्या कमतरतेमुळे गलगंड हा रोग होतो; त्यामुळे दैनंदिन आहारात आयोडीनयुक्त मीठ वापरण्याचा सल्ला दिला जातो.',
    },
    hi: {
      q: 'गले के अगले भाग में सूजन आने वाला "घेंघा" (Goitre) रोग मुख्यतः किस खनिज की कमी से होता है?',
      opts: ['आयोडीन (इसीलिए आयोडीनयुक्त नमक प्रयोग होता है)', 'कैल्शियम', 'फॉस्फोरस', 'जिंक'],
      exp: 'आयोडीन की कमी से थायरॉइड ग्रंथि बढ़ जाती है जिसे घेंघा रोग कहते हैं।',
    },
  },
  {
    topic: 'Macronutrient Roles: Energy vs Body-Building',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Match major food nutrients accurately with their primary biological roles: Carbohydrates & Fats give Energy. Which nutrient serves primarily as the "Body-Building" material repairing cells and muscles?',
      opts: [
        'Proteins (abundant in pulses/dal, soya, eggs, milk, sprouts)',
        'Refined table sugar only',
        'Distilled drinking water',
        'Roughage indigestible cellulose',
      ],
      exp: 'Proteins build and repair growing muscle, blood, and organ tissues; carbs/fats supply daily energy.',
    },
    mr: {
      q: 'पिष्टमय पदार्थ व स्निग्ध पदार्थ शरीराला ऊर्जा देतात, तर पेशी-स्नायूंची वाढ व झीज भरून काढणारे "शरीरबांधणी करणारे" (Body-Building) मुख्य अन्नघटक कोणते?',
      opts: [
        'प्रथिने / प्रोटीन्स (कडधान्ये, डाळी, सोयाबीन, दूध, अंडी, मोड आलेली धान्ये)',
        'फक्त रिफाईंड साखर',
        'ऊर्ध्वपातित पाणी',
        'न पचणारा चोथा',
      ],
      exp: 'वाढत्या वयातील मुलांच्या शरीरबांधणीसाठी डाळी, सोयाबीन, दूध यांतील प्रथिने अत्यंत आवश्यक असतात.',
    },
    hi: {
      q: 'कार्बोहाइड्रेट और वसा शरीर को ऊर्जा देते हैं, तो ऊतकों की मरम्मत व शारीरिक वृद्धि हेतु मुख्य "शरीर-निर्माणक" पोषक तत्व कौन-सा है?',
      opts: [
        'प्रोटीन (दालें, सोयाबीन, दूध, अंकुरित अनाज, अंडे में प्रचुर)',
        'केवल सफेद चीनी',
        'आसुत जल',
        'अपाच्य रेशा',
      ],
      exp: 'प्रोटीन कोशिकाओं व मांसपेशियों के निर्माण तथा मरम्मत का मुख्य आधार है।',
    },
  },
  {
    topic: 'Dietary Fibre (Roughage) Digestive Importance',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Although Dietary Fibre (Roughage from whole grains, guava, bhakri bran, and salads) supplies ZERO calories or vitamins, why is it vital in daily meals?',
      opts: [
        'It adds bulk to food, retains water, and promotes smooth bowel movement preventing constipation',
        'It melts kidney stones overnight',
        'It acts as our main source of protein',
        'It turns blood blue',
      ],
      exp: 'Plant cellulose roughage absorbs water along the intestine, sweeping out undigested waste smoothly.',
    },
    mr: {
      q: 'भाकरीच्या कोंड्यात, फळांत व पालेभाज्यांत असणाऱ्या "चोथ्यापासून" (Fibre/Roughage) शरीराला कोणतीही ऊर्जा मिळत नसली तरी तो रोजच्या आहारात अत्यावश्यक का असतो?',
      opts: [
        'तो अन्नास आकार देऊन आतड्यांतून न पचलेला टाकाऊ भाग सहज बाहेर टाकण्यास व बद्धकोष्ठता टाळण्यास मदत करतो',
        'तो एका रात्रीत मुतखडा विरघळवतो',
        'तो प्रथिनांचा मुख्य स्रोत आहे',
        'तो रक्ताचा रंग निळा करतो',
      ],
      exp: 'तंतूमय पदार्थ (चोथा) पचनमार्ग स्वच्छ ठेवून पचनक्रिया सुरळीत चालवण्यास मदत करतात.',
    },
    hi: {
      q: 'यद्यपि आहारीय रेशे (Roughage/Fibre) शरीर को कोई ऊर्जा नहीं देते, फिर भी वे दैनिक भोजन में अनिवार्य क्यों हैं?',
      opts: [
        'ये भोजन को स्थूलता प्रदान कर अपाच्य अपशिष्ट को आसानी से बाहर निकालने और कब्ज रोकने में मदद करते हैं',
        'ये पथरी घोल देते हैं',
        'ये प्रोटीन का मुख्य स्रोत हैं',
        'ये रक्त का रंग बदलते हैं',
      ],
      exp: 'संपूर्ण अनाज, छिलके सहित फल व सलाद के रेशे पाचन तंत्र को सुचारु रखते हैं।',
    },
  },
  {
    topic: 'ORS Oral Rehydration Solution During Diarrhoea',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'When a child suffers loose motions (diarrhoea) and vomiting, why do doctors prescribe frequent sips of Boiled-Cooled Water mixed with Sugar and a pinch of Salt (ORS)?',
      opts: [
        'To immediately replenish lost body water, essential sodium salts, and quick glucose energy preventing dangerous dehydration',
        'To freeze the stomach muscles permanently',
        'Because salt and sugar kill intestinal worms directly',
        'To replace solid meals for an entire month',
      ],
      exp: 'Clean ORS water-salt-sugar solution reverses life-threatening dehydration safely.',
    },
    mr: {
      q: 'अतिसार किंवा उलट्या होत असताना रुग्णास उकळून थंड केलेल्या पाण्यात साखर व चिमूटभर मीठ (जलसंजीवनी / ORS) देण्याचा मुख्य हेतू कोणता?',
      opts: [
        'शरीरातून कमी झालेले पाणी, अत्यावश्यक क्षार व त्वरित ऊर्जा भरून काढून निर्जलीकरण (Dehydration) टाळणे',
        'पोटाचे स्नायू गोठवणे',
        'मीठ-साखरेने जंतू थेट मरतात म्हणून',
        'महिनाभर जेवण बंद ठेवण्यासाठी',
      ],
      exp: 'जलसंजीवनी (ORS) शरीरातील पाणी व क्षारांचे संतुलन त्वरित राखून जीव वाचवते.',
    },
    hi: {
      q: 'दस्त और उल्टी के दौरान उबालकर ठंडे किए पानी में चीनी व चुटकी भर नमक (ORS) पिलाने का मुख्य उद्देश्य क्या है?',
      opts: [
        'शरीर से निकले जल, आवश्यक लवणों व तुरंत ऊर्जा की पूर्ति कर घातक निर्जलीकरण (Dehydration) रोकना',
        'पेट की मांसपेशियाँ जमाना',
        'नमक से कीड़े मारना',
        'महीने भर भोजन बंद रखना',
      ],
      exp: 'ORS घोल शरीर में पानी और इलेक्ट्रोलाइट्स की कमी को शीघ्र पूरा कर निर्जलीकरण से बचाता है।',
    },
  },
  {
    topic: 'Food Preservation Methods – Mango Pickle, Papad & Mamidi Tandra',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why can ripe Alphonso mango pulp dried in thin sun-baked sheets with sugar/jaggery (Amba Wadi / Mamidi Tandra) or salted raw mangoes in oil (Lonche) stay edible for months without a fridge?',
      opts: [
        'Sun-drying removes moisture while heavy salt, sugar, and mustard/oil create osmotic barriers preventing microbes and moulds from multiplying',
        'Glass jars dissolve all bacteria chemically into starch',
        'Mangoes possess zero water naturally',
        'Pickling boils microbes in milk',
      ],
      exp: 'Removing moisture (drying, papad) or locking free water with salt/sugar/oil inhibits microbial growth.',
    },
    mr: {
      q: 'आंबा पोळी/आंबा वडी उन्हात वाळवून किंवा कैरीचे लोणचे भरपूर मीठ व तेलात घालून फ्रीजशिवाय महिनेभर का टिकून राहते?',
      opts: [
        'वाळवल्याने ओलावा निघून जातो व भरपूर मीठ, साखर किंवा तेलामुळे बुरशी-जीवाणूंची वाढ होऊ शकत नाही',
        'काचेची बरणी जंतूंना पिष्टमय पदार्थात बदलते',
        'आंब्यात अजिबात पाणी नसते',
        'लोणच्यात दूध उकळतात',
      ],
      exp: 'पाणी कमी करणे (वाळवणे) किंवा मीठ-साखर-तेलाचे आवरण देणे ही अन्न टिकवण्याची शास्त्रीय तत्त्वे आहेत.',
    },
    hi: {
      q: 'आम पापड़ (अमावट) सुखाकर या आम का अचार नमक व तेल में डालकर बिना फ्रिज के महीनों सुरक्षित क्यों रहता है?',
      opts: [
        'सुखाने से नमी समाप्त हो जाती है तथा अधिक नमक, चीनी व तेल सूक्ष्मजीवों और फफूँदी की वृद्धि रोक देते हैं',
        'काँच की बरनी जीवाणु नष्ट करती है',
        'आम में पानी नहीं होता',
        'अचार में दूध मिलाया जाता है',
      ],
      exp: 'नमी हटाना या नमक-चीनी-तेल द्वारा सूक्ष्मजीवों की वृद्धि रोकना पारंपरिक खाद्य परिरक्षण के वैज्ञानिक आधार हैं।',
    },
  },
  {
    topic: 'Pasteurization Science – Louis Pasteur',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'During commercial milk Pasteurization (discovered by Louis Pasteur), milk is heated to around 70°C for 15–30 seconds and then:',
      opts: [
        'Rapidly chilled and sealed to kill harmful bacteria without spoiling milk taste or nutrients',
        'Boiled continuously for 6 hours until dry powder forms',
        'Mixed with bleaching powder',
        'Left uncovered outdoors at 40°C',
      ],
      exp: 'Heating to ~70°C destroys pathogens while sudden cooling prevents surviving spores from proliferating.',
    },
    mr: {
      q: 'पिशवीतील दुधाच्या "पाश्चरायझेशन" (Pasteurization) प्रक्रियेत दूध सुमारे ७०°C पर्यंत १५–३० सेकंद तापवून लगेच काय केले जाते?',
      opts: [
        'झपाट्याने थंड करून हवाबंद केले जाते, ज्यामुळे हानिकारक जीवाणू नष्ट होऊन दुधाची चव व पोषकता टिकून राहते',
        '६ तास उकळून भुकटी करतात',
        'ब्लिचिंग पावडर मिसळतात',
        'उन्हात उघडे ठेवतात',
      ],
      exp: 'लुई पाश्चर यांच्या या पद्धतीत विशिष्ट तापमानास तापवून झटकन थंड केल्याने सूक्ष्मजीव नष्ट होतात व दूध टिकते.',
    },
    hi: {
      q: 'दूध के "पाश्चुरीकरण" (Pasteurization) में दूध को लगभग ७०°C पर १५–३० सेकंड गर्म करके तुरंत क्या किया जाता है?',
      opts: [
        'तेजी से ठंडा कर सीलबंद किया जाता है जिससे हानिकारक जीवाणु नष्ट हो जाते हैं और स्वाद-पोषण सुरक्षित रहता है',
        '६ घंटे उबालकर पाउडर बनाते हैं',
        'ब्लीचिंग पाउडर मिलाते हैं',
        'खुले में गर्म रखते हैं',
      ],
      exp: 'लुई पाश्चर की इस विधि में उच्च ताप व त्वरित शीतलन से रोगजनक जीवाणु नष्ट हो जाते हैं।',
    },
  },
  {
    topic: 'Sprouting Pulses Nutrition Boost',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Soaking whole moong or matki overnight and tying them in a damp cloth until tiny white sprouts appear improves food nutrition mainly by:',
      opts: [
        'Increasing Vitamin C & B-complex levels and breaking complex proteins/starches into easier-to-digest forms',
        'Removing all protein completely',
        'Adding artificial chemical fat',
        'Turning pulses into non-biodegradable plastic',
      ],
      exp: 'Germination activates enzymes that generate vitamins and make legume proteins far more digestible.',
    },
    mr: {
      q: 'मूग, मटकी रात्री भिजवून ओल्या फडक्यांत बांधून "मोड आणल्याने" (Sprouting) त्यांची पौष्टिकता कशी वाढते?',
      opts: [
        'त्यांमध्ये क व ब-समूह जीवनसत्त्वे वाढतात आणि जटिल घटक पचनास अधिक हलके व सहज शोषण्याजोगे होतात',
        'त्यातील सर्व प्रथिने नष्ट होतात',
        'कृत्रिम चरबी तयार होते',
        'धान्य प्लास्टिक बनते',
      ],
      exp: 'अंकुरण प्रक्रियेमुळे कडधान्यांत जीवनसत्त्वांचे प्रमाण वाढते आणि प्रथिनांचे पचन सुलभ होते.',
    },
    hi: {
      q: 'साबुत मूँग या मोठ को भिगोकर गीले कपड़े में "अंकुरित" (Sprouting) करने से उनकी पौष्टिकता कैसे बढ़ती है?',
      opts: [
        'विटामिन C व B-कॉम्प्लेक्स बढ़ते हैं तथा जटिल प्रोटीन व स्टार्च सुपाच्य रूप में टूट जाते हैं',
        'सारा प्रोटीन नष्ट हो जाता है',
        'कृत्रिम वसा जुड़ती है',
        'दालें कठोर हो जाती हैं',
      ],
      exp: 'अंकुरण से एंजाइम सक्रिय होते हैं जो विटामिन बढ़ाते हैं और पाचन को अत्यंत सुगम बनाते हैं।',
    },
  },
  {
    topic: 'Digestion Journey & Acidic Stomach Action',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In human digestion (illustrated in NCERT Class 5 "From Tasting to Digesting" via Dr. Beaumont’s study of Martin), why does churning food inside the stomach digest faster than in a glass jar of plain water?',
      opts: [
        'The stomach secretes acidic digestive juices (Hydrochloric acid + enzymes) and rhythmically churns food warm at body temperature (~37°C)',
        'Teeth keep chewing inside the stomach',
        'The stomach freezes food first',
        'Plain water digests proteins faster than acid',
      ],
      exp: 'Dr. Beaumont’s famous experiments proved digestive juices break down food far more effectively than static room-temperature liquids.',
    },
    mr: {
      q: 'डॉ. ब्यूमाँट यांनी मार्टिनच्या पोटातील प्रयोगातून दाखवल्याप्रमाणे आपल्या जठरातील अन्न पाण्याच्या पेल्यापेक्षा खूप लवकर का पचते?',
      opts: [
        'जठर उबदार तापमानावर अन्नाचे मंथन करते आणि त्यातील आम्ल व पाचक रस अन्नाचे वेगाने विघटन करतात',
        'जठरातही दात चर्वण करतात',
        'जठर अन्न गोठवून ठेवते',
        'साधे पाणी पाचक रसांपेक्षा जलद पचवते',
      ],
      exp: 'जठरातील पाचक रस (आम्ल व विकर) व घुसळण्याची क्रिया पचनाचा वेग अनेक पटींनी वाढवते.',
    },
    hi: {
      q: 'डॉ. ब्यूमॉन्ट के प्रयोगों के अनुसार मनुष्य के आमाशय में भोजन पानी के गिलास की तुलना में अधिक शीघ्र क्यों पचता है?',
      opts: [
        'आमाशय शरीर के ताप पर भोजन को मथता है तथा उसमें स्रावित अम्लीय पाचक रस भोजन को तेजी से तोड़ते हैं',
        'आमाशय में दाँत चबाते हैं',
        'आमाशय भोजन जमा देता है',
        'सादा पानी पाचक रस से तेज पचाता है',
      ],
      exp: 'आमाशय के अम्लीय पाचक रस (HCl व एंजाइम) तथा मंथन गति पाचन को तीव्र करते हैं।',
    },
  },
  {
    topic: 'Tongue Taste Zones & Chewing Saliva Enzyme',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'When you chew plain jowar bhakri or boiled rice slowly 25–30 times, why does it gradually begin to taste noticeably SWEET?',
      opts: [
        'Salivary amylase enzyme inside mouth saliva breaks complex starch down into simple sweet sugars',
        'Teeth inject cane sugar directly into bread',
        'Tongue taste buds invert from bitter to salty',
        'Swallowing pushes sugar upwards from the heart',
      ],
      exp: 'Saliva begins carbohydrate digestion right in the mouth by converting starch into maltose sugar.',
    },
    mr: {
      q: 'ज्वारीची भाकरी किंवा भात सावकाश चावून खाल्ल्यास थोड्या वेळाने तो तोंडात गोडसर का लागतो?',
      opts: [
        'तोंडातील लाळेमधील पाचक घटक भाकरीतील पिष्टमय पदार्थाचे (Starch) रूपांतर साध्या गोड साखरेत करतात',
        'दातांमधून उसाची साखर स्त्रवते',
        'जीभ कडू चव गोड मानते',
        'हृदयातून साखर वर येते',
      ],
      exp: 'लाळेतील विकर (Amylase) मुखातच पचनाची सुरुवात करून स्टार्चचे साध्या शर्करेत रूपांतर करतात.',
    },
    hi: {
      q: 'सादी रोटी या चावल को धीरे-धीरे अधिक चबाने पर वह मीठा क्यों लगने लगता है?',
      opts: [
        'मुँह की लार में मौजूद पाचक एंजाइम जटिल स्टार्च (मंड) को सरल मीठी शर्करा में तोड़ देते हैं',
        'दाँत चीनी छोड़ते हैं',
        'जीभ खट्टा भूल जाती है',
        'हृदय से शर्करा ऊपर आती है',
      ],
      exp: 'लार में उपस्थित एमाइलेज एंजाइम मुँह में ही स्टार्च को शर्करा में बदलना शुरू कर देता है।',
    },
  },
  {
    topic: 'Traditional Indian Water Harvesting Structures',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In Rajasthan and Gujarat, deep stone-stepped community water tanks called "Bawri" (Stepwells) and check-embankments built by villagers ("Johad" / Tarun Bharat Sangh) primarily serve to:',
      opts: [
        'Collect, store, and recharge scarce seasonal rainwater deep underground so communities thrive even in desert droughts',
        'Breed freshwater whales',
        'Run heavy coal turbines',
        'Wash industrial crude oil barrels',
      ],
      exp: 'Stepwells (Bawris), Kunds, and Johads are centuries-old climate-resilient rainwater storage & groundwater recharge marvels.',
    },
    mr: {
      q: 'राजस्थान आणि गुजरातमधील "बावडी" (पायऱ्यांच्या विहिरी) आणि अलवर भागातील "जोहड" (तरुण भारत संघ) हे पारंपरिक जलसंरचनेचे प्रकार कशासाठी बांधले गेले?',
      opts: [
        'अवर्षणप्रवण भागांत पावसाचे मोजके पाणी अडवून, साठवून आणि भूजलात जिरवून वर्षभर पिण्यासाठी व शेतीसाठी उपलब्ध ठेवणे',
        'गोड्या पाण्यात देवमासे पाळण्यासाठी',
        'कोळसा यंत्रे चालवण्यासाठी',
        'खनिज तेलाचे पिंप धुण्यासाठी',
      ],
      exp: 'बावडी व जोहड ही भारताची शतकानुशतके जुनी लोकसमुदाय-आधारित जलसंवर्धन प्रणाली आहे.',
    },
    hi: {
      q: 'राजस्थान व गुजरात में पारंपरिक "बावड़ी" (सीढ़ीदार कुएँ) तथा "जोहड़" (तरुण भारत संघ) निर्माण का मुख्य उद्देश्य क्या है?',
      opts: [
        'शुष्क क्षेत्रों में सीमित वर्षा जल का संचयन और भूजल पुनर्भरण कर सूखे में भी पेयजल व सिंचाई उपलब्ध कराना',
        'व्हेल मछली पालन',
        'कोयला टरबाइन चलाना',
        'तेल के ड्रम धोना',
      ],
      exp: 'बावड़ी और जोहड़ भारत की पारंपरिक सामुदायिक वर्षा-जल संचयन एवं भूजल पुनर्भरण पद्धतियाँ हैं।',
    },
  },
  {
    topic: 'Three States of Water & Natural Water Cycle',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which continuous natural sequence drives Earth’s Water Cycle from oceans back down onto farms and rivers?',
      opts: [
        'Solar Evaporation + Plant Transpiration → Rising Cooling Condensation (Clouds) → Precipitation (Rain/Snow) → Runoff & Groundwater Percolation',
        'Freezing → Combustion → Rusting → Melting',
        'Boiling → Plastic formation → Salinity → Drought',
        'Condensation first → Evaporation underground → Freezing clouds',
      ],
      exp: 'Solar heat evaporates surface water; water vapour cools aloft to condense into droplets forming clouds and rain.',
    },
    mr: {
      q: 'पृथ्वीवर समुद्रापासून नद्या-शेतांपर्यंत सातत्याने चालणाऱ्या नैसर्गिक "जलचक्राचा" अचूक क्रम कोणता?',
      opts: [
        'सूर्यप्रकाशाने बाष्पीभवन → वर जाऊन थंड होऊन संघनन (ढग) → वृष्टी (पाऊस/बर्फ) → ओहोळ-नद्यांतून संकलन व भूजलात जिरणे',
        'गोठणे → ज्वलन → गंजणे → वितळणे',
        'उकळणे → प्लास्टिक बनणे → खारटपणा',
        'जमिनीखाली संघनन → ढग गोठणे',
      ],
      exp: 'बाष्पीभवन, संघनन आणि वृष्टी या तीन टप्प्यांमुळे पृथ्वीवरील जलस्रोत सतत भरले जातात.',
    },
    hi: {
      q: 'पृथ्वी पर निरंतर चलने वाले प्राकृतिक "जल चक्र" (Water Cycle) का सही क्रम क्या है?',
      opts: [
        'सौर वाष्पीकरण → ऊपर जाकर शीतलन व संघनन (बादल) → वर्षण (वर्षा/हिमपात) → नदियों व भूजल में संग्रहण',
        'हिमन → दहन → जंग लगना → गलन',
        'उबाल → प्लास्टिक बनना → सूखा',
        'भूमिगत संघनन → वाष्पीकरण',
      ],
      exp: 'वाष्पीकरण, संघनन और वर्षण के निरंतर चक्र से पृथ्वी पर ताजे जल की आपूर्ति बनी रहती है।',
    },
  },
  {
    topic: 'Dead Sea Extreme Salinity Buoyancy Science',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why can even a non-swimmer float effortlessly flat on their back atop the Dead Sea?',
      opts: [
        'Around 300 grams of salt dissolved per litre raises water density far higher than the human body’s density, producing strong upward buoyant upthrust',
        'Dead Sea water contains zero salt',
        'Magnetic rocks beneath the surface repel people upwards',
        'All water molecules freeze into solid ice',
      ],
      exp: 'Added dissolved salt boosts water density (~1.24 kg/L), increasing buoyant force so humans float easily.',
    },
    mr: {
      q: 'मृत समुद्रात (Dead Sea) पोहता न येणारा माणूसही पाण्यावर सहज का तरंगतो?',
      opts: [
        'प्रति लिटर पाण्यात सुमारे ३०० ग्रॅम क्षार विरघळलेले असल्याने पाण्याची घनता मानवी शरीरापेक्षा खूप जास्त होऊन वर ढकलणारे प्लावक बल वाढते',
        'मृत समुद्रात अजिबात मीठ नाही म्हणून',
        'पाण्याखाली चुंबकीय खडक आहेत म्हणून',
        'पाण्याचे बर्फात रूपांतर झाले आहे म्हणून',
      ],
      exp: 'अतिखारेपणामुळे पाण्याची घनता वाढते आणि घनता वाढल्यास प्लावक बल वाढून वस्तू सहज तरंगतात.',
    },
    hi: {
      q: 'मृत सागर (Dead Sea) में तैरना न जानने वाला व्यक्ति भी पानी की सतह पर आसानी से क्यों तैरता रहता है?',
      opts: [
        'प्रति लीटर लगभग ३०० ग्राम नमक घुला होने से पानी का घनत्व बहुत बढ़ जाता है, जिससे अधिक उत्प्लावन बल ऊपर धकेलता है',
        'उसमें बिल्कुल नमक नहीं है',
        'नीचे चुंबकीय चट्टानें हैं',
        'पानी बर्फ बना रहता है',
      ],
      exp: 'अधिक लवणता से जल का घनत्व बढ़ जाता है जिससे उत्प्लावन बल (Buoyancy) बहुत अधिक हो जाता है।',
    },
  },
  {
    topic: 'Why Alum (Turti) Clarifies Muddy Pond Water',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Swirling a small piece of Alum (Turti) briefly inside a bucket of muddy monsoon river water clears turbidity because:',
      opts: [
        'Alum causes fine suspended clay particles to clump together heavier and settle cleanly to the bottom (Coagulation & Sedimentation)',
        'Alum dissolves sand into sugar',
        'Alum evaporates all water',
        'Alum filters plastic bottles out automatically',
      ],
      exp: 'Alum coagulates fine colloidal mud particles so they settle swiftly; note boiling/chlorination is still required to kill invisible microbes!',
    },
    mr: {
      q: 'पावसाळ्यात गढूळ पाण्यात तुरटी (Alum) फिरवली असता काही वेळातच पाणी स्वच्छ निवळलेले दिसते, कारण:',
      opts: [
        'तुरटीमुळे पाण्यातील सूक्ष्म मातीचे कण एकत्र जड होऊन तळाशी बसतात (अवसादन / Sedimentation) — पण जंतू मारण्यासाठी उकळणे गरजेचे राहते',
        'तुरटी वाळूचे साखरेत रूपांतर करते',
        'तुरटी सर्व पाणी उडवून लावते',
        'तुरटी प्लास्टिक गाळून टाकते',
      ],
      exp: 'तुरटी गढूळपणा दूर करून गाळ खाली बसवते; मात्र सूक्ष्मजंतू नष्ट करण्यासाठी पाणी उकळणे वा क्लोरीन वापरणे आवश्यक असते.',
    },
    hi: {
      q: 'गंदले/मटमैले पानी में फिटकरी (Alum) घुमाने से कुछ समय बाद पानी साफ क्यों दिखाई देने लगता है?',
      opts: [
        'फिटकरी महीन तैरते मिट्टी कणों को जमाकर भारी कर देती है जिससे वे तली में बैठ जाते हैं (स्कंदन व अवसादन)',
        'फिटकरी रेत को चीनी बनाती है',
        'पानी उड़ा देती है',
        'प्लास्टिक अलग करती है',
      ],
      exp: 'फिटकरी निलंबित गंदगी को तली में बिठा देती है, जबकि रोगाणु मारने हेतु उबालना आवश्यक रहता है।',
    },
  },
  {
    topic: 'Malaria Vector Control & Ronald Ross Discovery',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Nobel laureate Dr. Ronald Ross proved in Secunderabad that Malaria spreads via bites of which mosquito—and how does pouring kerosene/oil on stagnant puddles stop them?',
      opts: [
        'Female Anopheles mosquito; oil seals water surface oxygen, suffocating wriggling mosquito larvae before they grow wings',
        'Male housefly; oil freezes mosquitoes',
        'Honeybee; oil gives nectar',
        'Aedes only; oil feeds larvae protein',
      ],
      exp: 'Female Anopheles spreads Plasmodium malaria; thin oil films cut surface air supply to larvae, while Aedes aegypti spreads Dengue.',
    },
    mr: {
      q: 'डॉ. रोनाल्ड रॉस यांनी शोधलेल्या मलेरिया रोगाचा प्रसार कोणत्या डासामार्फत होतो आणि साचलेल्या डबक्यात रॉकेल/तेल फवारल्याने डास कसे नष्ट होतात?',
      opts: [
        'मादी ॲनोफिलीस डास; तेलाचा पातळ थर पाण्यावरील ऑक्सिजन रोखतो व डासांच्या अळ्या गुदमरून मरतात',
        'नर घरमाशी; तेल माशा गोठवते',
        'मधमाशी; तेल मध देते',
        'फक्त एडिस डास; तेल अळ्यांना पोषण देते',
      ],
      exp: 'मादी ॲनोफिलीस डासाच्या चाव्याने मलेरिया (हिवताप) होतो; साचलेल्या पाण्यावर तेलाच्या थराने अळ्यांचा श्वास बंद होतो.',
    },
    hi: {
      q: 'डॉ. रोनाल्ड रॉस ने सिद्ध किया कि मलेरिया किस मच्छर से फैलता है और रुके पानी पर मिट्टी का तेल डालने से लार्वा कैसे समाप्त होते हैं?',
      opts: [
        'मादा एनोफिलीज मच्छर; तेल की परत पानी की सतह पर ऑक्सीजन रोक देती है जिससे लार्वा सांस न ले पाने से मर जाते हैं',
        'नर मक्खी; तेल जमा देता है',
        'मधुमक्खी',
        'केवल एडीज मच्छर; तेल उन्हें पोषण देता है',
      ],
      exp: 'मादा एनोफिलीज मलेरिया फैलाती है; पानी पर तेल की परत मच्छर के लार्वा की ऑक्सीजन आपूर्ति काट देती है।',
    },
  },
  {
    topic: 'Traditional Regional Shelters – Assam Bamboo Stilts',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In Assam’s flood-prone Brahmaputra valleys, why do villagers traditionally build homes 10–12 feet above ground on sturdy bamboo stilts with steeply sloped roofs?',
      opts: [
        'Elevated stilts stay safe above seasonal monsoon floodwaters and damp insects while steep roofs shed heavy rain cleanly',
        'To catch snowfall glaciers cleanly',
        'To bury basements below ground water',
        'Because bamboo does not grow in Assam',
      ],
      exp: 'Regional climate dictates vernacular architecture—high bamboo stilts protect Assam homes against heavy rains and floods.',
    },
    mr: {
      q: 'अतिपावसाच्या व पूरप्रवण आसाम राज्यात गावांतील घरे जमिनीपासून १०–१२ फूट उंच बांबूच्या खांबांवर (Stilt Houses) व उतरत्या छपरांची का बांधली जातात?',
      opts: [
        'पावसाळ्यात पुराचे पाणी घरात शिरू नये, ओलसरपणा व सरपटणाऱ्या प्राण्यांपासून बचाव व्हावा व उतरत्या छपरावरून पाऊस वेगाने वाहून जावा म्हणून',
        'हिमवर्षाव साठवण्यासाठी',
        'तळघर बांधण्यासाठी',
        'आसाममध्ये बांबूच उगवत नाही म्हणून',
      ],
      exp: 'अतिवृष्टी व पुराच्या प्रदेशांत बांबूच्या उंच खांबांवरील घरे हवामानाशी उत्तम अनुकूलन साधतात.',
    },
    hi: {
      q: 'अत्यधिक वर्षा व बाढ़ वाले असम में पारंपरिक घर जमीन से १०–१२ फीट ऊँचे बाँस के खंभों (Stilt Houses) पर ढलवाँ छत के साथ क्यों बनाए जाते हैं?',
      opts: [
        'बाढ़ का पानी घर में न घुसे, नमी व कीड़ों से बचाव हो और ढलवाँ छत से भारी बारिश का पानी तुरंत बह जाए',
        'बर्फ जमा करने के लिए',
        'तहखाना बनाने के लिए',
        'असम में बाँस न होने के कारण',
      ],
      exp: 'ऊँचे बाँस के खंभों वाले घर असम की भारी वर्षा और बाढ़ से सुरक्षा का उत्कृष्ट उदाहरण हैं।',
    },
  },
  {
    topic: 'Ladakh Leh Cold-Desert Mud & Timber Shelters',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In the high-altitude cold desert of Ladakh (Leh), traditional two-storey stone-and-mud homes have thick white-washed walls, wooden floors/ceilings, and ground floors reserved for cattle because:',
      opts: [
        'Thick mud-stone walls and timber insulate freezing winter cold, flat roofs dry apricots/vegetables, and cattle warmth heats living quarters upstairs',
        'Bamboo rafts float inside homes during monsoon',
        'Ladakh experiences 45°C coastal humidity year-round',
        'Houses need steep roofs for tropical cyclones',
      ],
      exp: 'Windowless thick stone ground floors keep livestock warm while their body heat gently insulates the upper family floor.',
    },
    mr: {
      q: 'लडाखच्या (लेह) थंड वाळवंटात पारंपरिक दुमजली घरांच्या जाड माती-दगडाच्या भिंती व तळमजल्यावर गुरांचा गोठा (आणि वर माणसांची खोली) अशी रचना का असते?',
      opts: [
        'जाड दगड-मातीच्या भिंती व लाकडी फरशी कडाक्याच्या थंडीपासून उबदार संरक्षण देतात, तर तळमजल्यावरील जनावरांच्या उबेने वरची खोली गरम राहते',
        'तिथे पावसाळ्यात महापूर येतो',
        'तिथे वर्षभर ४५°C उकाडा असतो',
        'चक्रीवादळापासून बचावासाठी',
      ],
      exp: 'थंड वाळवंटात दगड-माती-लाकडाचे निरोधन (Insulation) आणि सपाट छतावर सुकवण्याची सोय थंडीशी जुळवून घेते.',
    },
    hi: {
      q: 'लद्दाख के ठंडे मरुस्थल में पारंपरिक दो-मंजिला पत्थर-मिट्टी के घरों की निचली मंजिल में मवेशी और ऊपरी मंजिल पर परिवार क्यों रहते हैं?',
      opts: [
        'मोटी पत्थर-मिट्टी की दीवारें व लकड़ी की छत भीषण सर्दी से बचाती हैं तथा नीचे पशुओं की गर्मी से ऊपर का कमरा गर्म रहता है',
        'भारी बाढ़ से बचने के लिए',
        'यहाँ ४५°C तटीय गर्मी रहती है',
        'चक्रवाती बारिश रोकने के लिए',
      ],
      exp: 'बिना खिड़कियों वाली मोटी मिट्टी-पत्थर की दीवारें और लकड़ी लद्दाख की जमा देने वाली ठंड से सुरक्षा देती हैं।',
    },
  },
  {
    topic: 'Rajasthan Desert Mud-Wall & Flat Thorn-Bush Houses',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In scorching desert villages of western Rajasthan, thick mud walls plastered with cow-dung paste and kikar/neem-branch thatched roofs protect residents by:',
      opts: [
        'Insulating intense midday desert heat inside cool shaded interiors while cow-dung mud resists cracking and insects',
        'Floating smoothly across monsoon lakes',
        'Attracting winter blizzards',
        'Melting steel walls',
      ],
      exp: 'Mud has poor thermal conductivity, keeping interior rooms cool during blazing desert summers; neem/kikar wood resists termites.',
    },
    mr: {
      q: 'राजस्थानच्या उष्ण वाळवंटात जाड मातीच्या भिंती, शेणाचे सारवण आणि कडुलिंब-बाभळीच्या फांद्यांचे छत कशासाठी उपयुक्त ठरते?',
      opts: [
        'मातीच्या जाड भिंती तीव्र उष्णता आत येऊ देत नाहीत, तर शेण-कडुलिंबाचे मिश्रण कीटकांपासून संरक्षण करून घर थंड ठेवते',
        'सरोवरात घर तरंगण्यासाठी',
        'हिमवादळापासून बचावासाठी',
        'पोलाद वितळवण्यासाठी',
      ],
      exp: 'माती उष्णतारोधक असल्याने वाळवंटातील कडक उन्हातही घर थंड राहते.',
    },
    hi: {
      q: 'राजस्थान के तपते मरुस्थल में मोटी मिट्टी की दीवारों पर गोबर-मिट्टी की लिपाई और कीकर-नीम की छत क्यों बनाई जाती है?',
      opts: [
        'मिट्टी की मोटी दीवारें ऊष्मारोधी होने से भीषण गर्मी को अंदर नहीं आने देतीं तथा गोबर-नीम कीड़ों से बचाता है',
        'तालाब में तैरने के लिए',
        'बर्फ से बचने के लिए',
        'लोहा गलाने के लिए',
      ],
      exp: 'मिट्टी ऊष्मा की कुचालक होती है, जिससे तपती दोपहरी में भी घर के भीतर ठंडक बनी रहती है।',
    },
  },
  {
    topic: 'Houseboats (Shikara/Donga) in Srinagar & Kerala',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Floating wooden "Donga / Houseboats" on Dal Lake in Srinagar (Kashmir) and Kettuvallam backwater boats in Kerala represent traditional human shelter adapted to:',
      opts: [
        'Perennial calm freshwater lakes and coastal backwaters where water serves simultaneously as residence, garden, and transport corridor',
        'Arid sand dunes in Thar',
        'High volcanic craters',
        'Antarctic icebergs',
      ],
      exp: 'Where abundant perennial waterways sustain daily life, floating wooden boat-dwellings evolved organically.',
    },
    mr: {
      q: 'श्रीनगरच्या दल सरोवरातील "डोंगा / हाऊसबोट" आणि केरळच्या खाजणांमधील नौकागृहे (Houseboats) कोणत्या पर्यावरणाशी जुळवून घेतलेले निवारे आहेत?',
      opts: [
        'बारमाही शांत गोड्या पाण्याचे सरोवर व जलमार्ग, जेथे पाणी हेच घर, वाहतूक व उपजीविकेचे मुख्य माध्यम असते',
        'थारचे वाळवंट',
        'ज्वालामुखीची शिखरे',
        'अंटार्क्टिकाचे हिमनग',
      ],
      exp: 'दल सरोवरासारख्या विस्तृत जलपरिसरात लाकडी हाऊसबोट हे निवासाचे वैशिष्ट्यपूर्ण रूप आहे.',
    },
    hi: {
      q: 'श्रीनगर की डल झील पर "डोंगा/हाउसबोट" और केरल के बैकवाटर के नाव-घर किस परिवेश के अनुकूलित आवास हैं?',
      opts: [
        'बारहमासी शांत झीलों व जलमार्गों के, जहाँ जल ही आवास, परिवहन और आजीविका का मुख्य माध्यम होता है',
        'थार मरुस्थल',
        'ज्वालामुखी शिखर',
        'अंटार्कटिक हिमखंड',
      ],
      exp: 'विस्तृत जल-निकायों में नाव-घर (हाउसबोट) स्थानीय संसाधनों व जल-जीवन से अद्भुत तालमेल दर्शाते हैं।',
    },
  },
  {
    topic: 'Changthang Pashmina Goats & Rebo Tents',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Who are the Changpa pastoralists herding soft-wool Pashmina goats at 5,000 m height on the cold Changthang plateau of Ladakh while dwelling in yak-hair conical tents called "Rebo"?',
      opts: [
        'High-altitude nomadic mountain herders whose winter wool provides delicate Pashmina shawls requiring ~250 hours of hand-weaving',
        'Coastal pearl divers of Konkan',
        'Sugarcane mill workers of Kolhapur',
        'Rubber plantation farmers of Kerala',
      ],
      exp: 'Changpa nomads protect their precious Pashmina goats near stone enclosures ("Lekha") at −40°C.',
    },
    mr: {
      q: 'लडाखच्या ५,००० मी उंचीवरील चांगथांग पठारावर याकच्या केसांपासून बनवलेल्या "रेबो" (Rebo) तंबूत राहणारे "चांगपा" (Changpa) लोक कशासाठी प्रसिद्ध आहेत?',
      opts: [
        'अतिथंड प्रदेशात पश्मिना शेळ्या पाळून जगप्रसिद्ध उबदार हाताने विणलेल्या "पश्मिना शालींचे" मऊ लोकर उत्पादन करण्यासाठी',
        'कोकणातील मोती काढण्यासाठी',
        'कोल्हापूरच्या साखर कारखान्यांसाठी',
        'केरळच्या रबर लागवडीसाठी',
      ],
      exp: 'चांगपा भटके मेंढपाळ शून्याखालील तापमानात पश्मिना शेळ्या पाळतात आणि याक-लोकर तंबूत (रेबो) राहतात.',
    },
    hi: {
      q: 'लद्दाख के ५,००० मी ऊँचे चांगथांग पठार पर याक के बालों से बने "रेबो" (Rebo) तंबुओं में रहने वाली "चांगपा" जनजाति किसके लिए प्रसिद्ध है?',
      opts: [
        'अत्यधिक ठंड में पश्मीना बकरियाँ पालकर विश्वप्रसिद्ध हाथ से बुनी "पश्मीना शॉल" का कोमल ऊन प्राप्त करने हेतु',
        'समुद्री मोती खोजने हेतु',
        'गन्ना मिलों के लिए',
        'रबर बागान हेतु',
      ],
      exp: 'चांगपा घुमंतू पशुपालक शून्य से नीचे के तापमान में पश्मीना बकरियाँ पालते हैं।',
    },
  },
  {
    topic: 'Cooking Fuel Transition & Indoor Smoke Health',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why does replacing smoky firewood and dried dung-cakes (Chulha) with clean LPG gas, Biogas, or Solar cookers dramatically improve rural mothers’ and children’s health?',
      opts: [
        'Smoky biomass indoors emits dense soot and toxic carbon monoxide harming lungs and eyes, whereas LPG/Biogas burns cleanly without smoke',
        'Firewood emits oxygen gas only',
        'LPG food has double salt automatically',
        'Solar cookers work only underwater',
      ],
      exp: 'Cleaner gaseous/solar fuels prevent chronic respiratory illnesses caused by household indoor air pollution.',
    },
    mr: {
      q: 'लाकूड व गोवऱ्यांच्या धुराच्या चुलीऐवजी ग्रामीण घरांत एलपीजी गॅस, बायोगॅस किंवा सौर चूल वापरल्यास महिला व मुलांच्या आरोग्यात मोठी सुधारणा का होते?',
      opts: [
        'लाकडाच्या धुरातील काजळी व विषारी कार्बन मोनॉक्साईडमुळे होणारे फुफ्फुस व डोळ्यांचे आजार टळतात; गॅस धूरविरहित स्वच्छ जळतो',
        'लाकूड जळताना फक्त ऑक्सिजन बाहेर टाकते',
        'गॅसवरचे अन्न आपोआप खारट होते',
        'सौर चूल पाण्याखाली चालते',
      ],
      exp: 'धूरमुक्त स्वयंपाक इंधनामुळे घरातील हवा शुद्ध राहून श्वसनाचे गंभीर आजार टळतात.',
    },
    hi: {
      q: 'धुएँ वाले लकड़ी-उपले के चूल्हे की बजाय LPG, बायोगैस या सोलर कुकर अपनाने से महिलाओं व बच्चों के स्वास्थ्य में भारी सुधार क्यों होता है?',
      opts: [
        'लकड़ी के धुएँ की कालिख व जहरीली गैसों से होने वाले फेफड़ों और आँखों के रोग रुकते हैं, जबकि LPG/बायोगैस धुआँ-रहित जलते हैं',
        'लकड़ी केवल ऑक्सीजन छोड़ती है',
        'गैस पर नमक दोगुना हो जाता है',
        'सोलर कुकर पानी में चलता है',
      ],
      exp: 'स्वच्छ ईंधन घरेलू वायु प्रदूषण समाप्त कर श्वसन संबंधी गंभीर बीमारियों से बचाता है।',
    },
  },
  {
    topic: 'Biogas Clean Rural Fuel & Slurry Manure',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What are the twin village benefits of a Gobar Gas (Biogas) plant digesting cattle dung and kitchen vegetable scraps?',
      opts: [
        'Produces smokeless Methane cooking gas PLUS nutrient-rich organic farm manure slurry',
        'Produces pure petrol PLUS coal tar',
        'Generates nuclear radiation PLUS plastic pellets',
        'Drains ground aquifers completely',
      ],
      exp: 'Anaerobic digestion yields clean methane fuel while preserving nitrogen-rich slurry as top-grade organic fertilizer.',
    },
    mr: {
      q: 'शेण व ओल्या कचऱ्यापासून चालणाऱ्या "गोबरगॅस / बायोगॅस" प्रकल्पाचे ग्रामीण भागास कोणते दुहेरी फायदे मिळतात?',
      opts: [
        'धूरविरहित स्वच्छ मिथेन स्वयंपाक वायू मिळतो आणि शिल्लक स्लरीपासून शेतीसाठी उत्तम सेंद्रिय खत मिळते',
        'शुद्ध पेट्रोल व डांबर मिळते',
        'अणुऊर्जा व प्लास्टिक मिळते',
        'भूजल पूर्ण आटते',
      ],
      exp: 'बायोगॅसमुळे स्वच्छ ऊर्जा व समृद्ध सेंद्रिय खत हे दोन्ही फायदे एकाच वेळी मिळतात.',
    },
    hi: {
      q: 'गोबर और जैविक कचरे से चलने वाले "बायोगैस संयंत्र" से गाँवों को कौन-सा दोहरा लाभ मिलता है?',
      opts: [
        'धुआँ-रहित स्वच्छ मीथेन रसोई गैस तथा खेतों के लिए उत्तम जैविक खाद (स्लरी)',
        'शुद्ध पेट्रोल और डामर',
        'परमाणु ऊर्जा और प्लास्टिक',
        'भूजल की पूर्ण बर्बादी',
      ],
      exp: 'बायोगैस संयंत्र स्वच्छ ऊर्जा के साथ-साथ उच्च गुणवत्ता वाली जैविक खाद भी प्रदान करता है।',
    },
  },
  {
    topic: 'Avoiding Food Wastage & Safe Refrigerated Storage',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why does cooked dal or milk spoil quickly in hot summer weather outside the fridge, yet stay fresh inside a refrigerator at 4°C?',
      opts: [
        'Cold temperatures sharply slow down reproduction of spoilage bacteria and moulds, whereas warm summer moisture speeds microbial growth',
        'Cold destroys nutrients permanently',
        'Refrigerators suck oxygen out of glass jars',
        'Sunlight turns milk directly into salt',
      ],
      exp: 'Low refrigeration temperatures inhibit enzyme and bacterial division without harming food safety.',
    },
    mr: {
      q: 'उन्हाळ्यात शिजवलेली डाळ किंवा दूध बाहेर ठेवल्यास लवकर नासते, परंतु फ्रीजमध्ये (सुमारे ४°C ला) ताजे का राहते?',
      opts: [
        'थंड तापमानामुळे अन्न खराब करणाऱ्या सूक्ष्मजीवांची आणि बुरशीची वाढ खूप मंदावते, तर उबदार दमट हवेत ती झपाट्याने वाढतात',
        'थंडीमुळे अन्नघटक कायमचे नष्ट होतात',
        'फ्रीज बरणीतील ऑक्सिजन काढून घेतो',
        'उन्हात दुधाचे मीठ होते',
      ],
      exp: 'कमी तापमानात जिवाणूंची पुनरुत्पादन क्रिया मंदावत असल्याने अन्न अधिक काळ ताजे राहते.',
    },
    hi: {
      q: 'गर्मियों में पकी दाल या दूध बाहर जल्दी खराब हो जाता है, पर फ्रिज (लगभग ४°C) में ताजा क्यों रहता है?',
      opts: [
        'कम तापमान पर भोजन खराब करने वाले जीवाणुओं और फफूँदी की वृद्धि अत्यंत धीमी पड़ जाती है',
        'ठंड सभी पोषक तत्व नष्ट कर देती है',
        'फ्रिज ऑक्सीजन सोख लेता है',
        'धूप दूध को नमक बनाती है',
      ],
      exp: 'शीत तापमान सूक्ष्मजीवों की सक्रियता व प्रजनन दर को धीमा कर भोजन को सुरक्षित रखता है।',
    },
  },
  {
    topic: 'Balanced Diet (Samtol Aahar) Definition',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What makes a meal a genuinely "Balanced Diet" (Samtol Aahar) for a growing Class 4 child?',
      opts: [
        'A meal containing carbohydrates, proteins, healthy fats, vitamins, minerals, fibre, and water in appropriate proportions—not merely eating one expensive item till full',
        'Eating only sweet laddoos three times a day',
        'Eating double portions of deep-fried samosas daily',
        'Skipping dinner altogether to stay thin',
      ],
      exp: 'Nutritional balance supplies energy, body-building blocks, and protective immunity vitamins together.',
    },
    mr: {
      q: 'वाढत्या वयातील मुलांसाठी "समतोल आहार" (Balanced Diet) कशाला म्हणतात?',
      opts: [
        'ज्या आहारात पिष्टमय पदार्थ, प्रथिने, स्निग्ध पदार्थ, जीवनसत्त्वे, खनिजे, चोथा आणि पाणी हे सर्व घटक योग्य प्रमाणात असतात',
        'दिवसातून तीन वेळा फक्त गोड लाडू खाणे',
        'दररोज फक्त तळलेले समोसे खाणे',
        'रात्रीचे जेवण पूर्ण बंद करणे',
      ],
      exp: 'शरीराच्या गरजेनुसार सर्व पोषक घटकांचा योग्य प्रमाणात समावेश असलेला आहार म्हणजे समतोल आहार होय.',
    },
    hi: {
      q: 'बढ़ते बच्चे के लिए "संतुलित आहार" (Balanced Diet) किसे कहा जाता है?',
      opts: [
        'वह भोजन जिसमें कार्बोहाइड्रेट, प्रोटीन, वसा, विटामिन, खनिज, रेशा तथा जल सभी उचित अनुपात में शामिल हों',
        'दिन में तीन बार केवल मीठे लड्डू खाना',
        'रोज केवल तले समोसे खाना',
        'रात का भोजन बिल्कुल छोड़ देना',
      ],
      exp: 'सभी आवश्यक पोषक तत्वों को सही अनुपात में शामिल करने वाला आहार ही संतुलित आहार कहलाता है।',
    },
  },
  {
    topic: 'Rainwater Harvesting Roof-to-Well Setup',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In an urban apartment or school building implementing Rooftop Rainwater Harvesting, why is a sand-gravel-charcoal filter pit placed BEFORE water enters an underground recharge well?',
      opts: [
        'To strain out rooftop leaves, dust, bird droppings, and suspended grit so clean rainwater recharges the borewell/tank safely',
        'To turn rainwater salty like seawater',
        'To heat rainwater to boiling point',
        'To evaporate water back into clouds immediately',
      ],
      exp: 'First-flush diverters plus gravel-sand-charcoal beds purify rooftop runoff cleanly before groundwater recharge.',
    },
    mr: {
      q: 'शाळेच्या किंवा इमारतीच्या छतावरील "पावसाचे पाणी संकलन" (Rainwater Harvesting) करताना जमिनीखाली कूपनलिकेत पाणी सोडण्यापूर्वी वाळू-खडी-कोळशाचा गाळणी खड्डा का ठेवतात?',
      opts: [
        'छतावरील पालापाचोळा, धूळ व कचरा गाळून स्वच्छ पाणी भूजलात मुरवण्यासाठी',
        'पाणी समुद्रासारखे खारट करण्यासाठी',
        'पाणी उकळण्यासाठी',
        'पाण्याचे लगेच वाफेत रूपांतर करण्यासाठी',
      ],
      exp: 'वाळू-खडी-कोळशाच्या थरांतून गाळल्यामुळे भूजल पातळी प्रदूषित न होता सुरक्षितरीत्या वाढते.',
    },
    hi: {
      q: 'विद्यालय या भवन में छत के वर्षा जल संचयन (Rainwater Harvesting) के दौरान भूमिगत रिचार्ज कुएँ से पहले रेत-कंकड़-कोयला फिल्टर पिट क्यों बनाया जाता है?',
      opts: [
        'छत के पत्ते, धूल व गंदगी को छानकर केवल स्वच्छ वर्षा जल भूमिगत जलस्रोत में भेजने हेतु',
        'पानी को खारा बनाने हेतु',
        'पानी उबालने हेतु',
        'तुरंत वाष्पित करने हेतु',
      ],
      exp: 'रेत-बजरी-कोयला फिल्टर छत की अशुद्धियाँ रोककर स्वच्छ जल से भूजल पुनर्भरण सुनिश्चित करता है।',
    },
  },
  {
    topic: 'Tasting Regions of Tongue & Saliva Connection',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'If you wipe your tongue completely dry with a clean tissue and place a dry crystal of sugar on it without swallowing saliva, why is it hard to taste the sweetness immediately?',
      opts: [
        'Taste buds detect flavour ONLY when food chemicals dissolve in liquid saliva',
        'Sugar loses sweetness in daytime light',
        'The nose tastes sugar instead of the tongue',
        'Dry sugar turns sour automatically',
      ],
      exp: 'Taste receptor cells require food molecules dissolved in saliva to trigger nerve signals.',
    },
    mr: {
      q: 'कोरड्या जिभेवर साखरेचा खडा ठेवला तर जिभेवर लाळ येईपर्यंत गोड चव का जाणवत नाही?',
      opts: [
        'अन्नाचे कण लाळेत विरघळल्याशिवाय जिभेवरील रुचिकालिका (Taste Buds) चव ओळखू शकत नाहीत',
        'साखर दिवसा गोड नसते',
        'साखरेची चव नाक घेते',
        'कोरडी साखर आंबट असते',
      ],
      exp: 'कोणत्याही पदार्थाची चव कळण्यासाठी तो पदार्थ लाळेमध्ये विरघळणे आवश्यक असते.',
    },
    hi: {
      q: 'यदि सूखी जीभ पर चीनी का दाना रखा जाए, तो लार आने से पहले तुरंत मीठा स्वाद क्यों नहीं आता?',
      opts: [
        'जीभ की स्वाद कलिकाएँ (Taste Buds) तभी स्वाद पहचानती हैं जब भोजन के कण लार में घुल जाते हैं',
        'दिन में चीनी मीठी नहीं रहती',
        'चीनी का स्वाद नाक लेती है',
        'सूखी चीनी खट्टी होती है',
      ],
      exp: 'स्वाद ग्रहण करने हेतु खाद्य पदार्थ का लार में घुलना आवश्यक होता है।',
    },
  },
  {
    topic: 'Deficiency Disease Matching – Beriberi & Goitre Check',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Washing milled polished rice repeatedly in excess water before cooking washes away water-soluble Vitamin B1 (Thiamine), risking which nutritional deficiency disease?',
      opts: ['Beriberi', 'Scurvy', 'Rickets', 'Malaria'],
      exp: 'Polishing rice strips outer B1-rich bran and repeated draining dissolves B-vitamins; severe Thiamine deficiency causes Beriberi.',
    },
    mr: {
      q: 'अतिशय पॉलिश केलेला तांदूळ वारंवार खूप पाण्यात धुवून पाणी फेकून दिल्यास कोणते पाण्यात विरघळणारे जीवनसत्त्व कमी होऊन "बेरीबेरी" आजाराचा धोका वाढतो?',
      opts: ['जीवनसत्त्व ब१ (Vitamin B1 / Thiamine)', 'जीवनसत्त्व क (Vitamin C)', 'जीवनसत्त्व ड (Vitamin D)', 'मलेरिया'],
      exp: 'तांदळाच्या वरील आवरणात जीवनसत्त्व ब१ असते; अति धुण्याने ते वाहून गेल्यास बेरीबेरी विकाराचा धोका निर्माण होतो.',
    },
    hi: {
      q: 'अधिक पॉलिश किए चावल को बार-बार ज्यादा पानी में धोने से पानी में घुलनशील किस विटामिन की हानि होकर "बेरीबेरी" रोग का खतरा बढ़ता है?',
      opts: ['विटामिन B1 (थायमिन)', 'विटामिन C', 'विटामिन D', 'मलेरिया'],
      exp: 'विटामिन B1 चावल की ऊपरी परत में होता है और जल में घुलनशील होने से अधिक धोने पर नष्ट हो जाता है; इसकी कमी से बेरीबेरी होता है।',
    },
  },
  {
    topic: 'Water Hardness & Boiling Safety Limits',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why does boiling doubtful tap water at a rolling boil for 1–2 minutes make it safer against Cholera and Typhoid—even though it cannot remove dissolved sand or salt?',
      opts: [
        'High boiling heat kills harmful bacteria, viruses, and parasites causing waterborne diseases, whereas physical filtration removes mud/sand',
        'Boiling converts salt into pure drinking sugar',
        'Boiling removes heavy iron pipes chemically',
        'Cold tap water has higher heat than steam',
      ],
      exp: 'Different purification steps serve distinct targets: filtration removes suspended solids while boiling/chlorination inactivates living pathogens.',
    },
    mr: {
      q: 'गढूळपणा गाळल्यानंतर पाणी उकळल्याने कॉलरा व टायफॉईडसारखे जलजन्य रोग कसे टळतात?',
      opts: [
        'उकळत्या उष्णतेमुळे कॉलरा-टायफॉईड पसरवणारे रोगजंतू नष्ट होतात (गाळण्याने माती वेगळी होते तर उकळण्याने जंतू मरतात)',
        'उकळल्याने मिठाची साखर होते',
        'पाण्यातील लोखंडी नळ्या वितळतात',
        'थंड पाणी उकळत्या पाण्यापेक्षा गरम असते',
      ],
      exp: 'गाळल्याने केवळ दिसणारा कचरा जातो, तर उकळण्याने न दिसणारे रोगकारक सूक्ष्मजीव नष्ट होतात.',
    },
    hi: {
      q: 'संदिग्ध पानी को छानने के बाद उबालने से हैजा व टाइफाइड जैसे जलजनित रोगों से बचाव कैसे होता है?',
      opts: [
        'उबालने की ऊष्मा रोगजनक जीवाणुओं व परजीवियों को नष्ट कर देती है (जबकि छानना केवल ठोस गंदगी हटाता है)',
        'उबालने से नमक चीनी बन जाता है',
        'उबालना लोहे के पाइप गला देता है',
        'ठंडा पानी भाप से अधिक गर्म होता है',
      ],
      exp: 'छानने से भौतिक कचरा और उबालने/क्लोरीनीकरण से अदृश्य रोगाणु नष्ट होते हैं।',
    },
  },
  {
    topic: 'Seasonal Food Diversity & Local Farmer Support',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why do EVS curricula advise eating fresh, seasonal, locally grown fruits and vegetables (like ber, amla, guava in winter; jamun, watermelon in summer) rather than off-season cold-storage imports?',
      opts: [
        'Seasonal local produce ripens naturally with peak vitamins, saves heavy cold-storage & transport fuel pollution, and supports local farmers',
        'Winter guavas contain no water',
        'Imported fruits never grow on trees',
        'Cold-storage adds extra fibre artificially',
      ],
      exp: 'Seasonal local food delivers superior freshness, lower ecological food-miles, and rural farm income.',
    },
    mr: {
      q: 'बाहेरील शीतगृहातील बिगर-हंगामी फळांपेक्षा त्या-त्या ऋतूतील ताजी स्थानिक फळे (उदा. हिवाळ्यात आवळा-बोर-पेरू, उन्हाळ्यात कलिंगड-जांभूळ) खाणे श्रेष्ठ का मानले जाते?',
      opts: [
        'हंगामी स्थानिक फळे नैसर्गिकरीत्या पूर्ण पिकल्याने जास्त पोषक असतात, वाहतुकीचे इंधन-प्रदूषण वाचते व स्थानिक शेतकऱ्यांना रोजगार मिळतो',
        'हिवाळी पेरूत अजिबात पाणी नसते',
        'बाहेरील फळे झाडांवर लागत नाहीत',
        'शीतगृहात कृत्रिम चोथा तयार होतो',
      ],
      exp: 'हंगामी स्थानिक अन्न अधिक पौष्टिक, स्वस्त व पर्यावरणास अनुकूल असते.',
    },
    hi: {
      q: 'बेमौसम कोल्ड-स्टोरेज फलों की बजाय स्थानीय व मौसमी फल-सब्जियाँ (सर्दियों में आँवला-अमरूद, गर्मियों में तरबूज-जामुन) खाने की सलाह क्यों दी जाती है?',
      opts: [
        'मौसमी स्थानीय उत्पाद प्राकृतिक रूप से पकने से अधिक पौष्टिक होते हैं, परिवहन प्रदूषण घटाते हैं और स्थानीय किसानों की आय बढ़ाते हैं',
        'अमरूद में पानी नहीं होता',
        'बाहरी फल पेड़ पर नहीं उगते',
        'कोल्ड-स्टोरेज कृत्रिम रेशा जोड़ता है',
      ],
      exp: 'ताजा स्थानीय व मौसमी आहार श्रेष्ठ पोषण, कम कार्बन पदचिह्न और ग्रामीण अर्थव्यवस्था के लिए उत्तम है।',
    },
  },
  {
    topic: 'Blood Pressure / Pulse & Heart Pumping Basics',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'When you press two fingers gently against your inner wrist after running across the school playground, what causes the rhythmic thumping beat you feel?',
      opts: [
        'Your muscular Heart pumping blood rhythmically through elastic blood vessels (arteries) faster to supply working muscles with oxygen',
        'Wind trapped inside elbow bones',
        'Food sliding down the food pipe',
        'Air bubbles rising from fingernails',
      ],
      exp: 'The heart beats faster during physical exertion so arteries carry extra oxygen-rich blood to muscles.',
    },
    mr: {
      q: 'मैदानावर धावून आल्यानंतर मनगटावर बोट ठेवल्यास जाणवणारे वेगवान ठोके (नाडीचे ठोके) कशामुळे निर्माण होतात?',
      opts: [
        'स्नायूंना जास्त ऑक्सिजन पुरवण्यासाठी आपले हृदय रक्तवाहिन्यांतून अधिक वेगाने रक्त पंप करत असल्यामुळे',
        'हाडांत हवा अडकल्याने',
        'अन्ननलिकेतून अन्न खाली जाताना',
        'नखांतून हवेचे बुडबुडे आल्यामुळे',
      ],
      exp: 'श्रम करताना स्नायूंना अधिक ऊर्जा व ऑक्सिजन लागतो म्हणून हृदयाची स्पंदने वेगवान होतात.',
    },
    hi: {
      q: 'मैदान में दौड़ने के बाद कलाई के भीतरी भाग पर उँगली रखने पर तेज धड़कन (नाड़ी) क्यों महसूस होती है?',
      opts: [
        'व्यायाम में मांसपेशियों को अधिक ऑक्सीजन देने हेतु हृदय धमनियों में तेजी से रक्त पंप कर रहा होता है',
        'हड्डियों में हवा फँसने से',
        'भोजन नली में खाना खिसकने से',
        'नाखूनों से हवा निकलने से',
      ],
      exp: 'शारीरिक श्रम के समय ऑक्सीजन की बढ़ी माँग पूरी करने हेतु हृदय तेजी से रक्त पंप करता है।',
    },
  },
  {
    topic: 'Water Scarcity & Equal Distribution Civic Case',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In several water-scarce colonies, tankers supply luxurious swimming pools while slum taps stay dry for days. Discussing this contrast in Class 5 EVS helps students examine:',
      opts: [
        'Social equity in sharing basic natural resources—treating clean drinking water as a human necessity rather than a luxury commodity',
        'How to build bigger private swimming pools',
        'Why rainwater belongs exclusively to car washes',
        'How to hide municipal water bills',
      ],
      exp: 'NCERT Class 5 "Every Drop Counts" fosters empathy and critical thinking about equitable distribution of drinking water.',
    },
    mr: {
      q: 'एकीकडे झोपडपट्टीत पिण्याच्या पाण्यासाठी नळ कोरडे असतात, तर दुसरीकडे मोठ्या हॉटेलांत पोहण्याचे तलाव भरले जातात—हा विरोधाभास इयत्ता ५ वीत अभ्यासण्याचा हेतू कोणता?',
      opts: [
        'पिण्याचे स्वच्छ पाणी ही प्रत्येक मानवाची मूलभूत गरज असून नैसर्गिक संसाधनांच्या न्याय्य व समतोल वाटपाची जाणीव विद्यार्थ्यांत निर्माण करणे',
        'मोठे खाजगी तलाव कसे बांधायचे ते शिकवणे',
        'पावसाचे पाणी फक्त कार धुण्यासाठी असते असे सांगणे',
        'पाणीपट्टी कशी चुकवायची ते सांगणे',
      ],
      exp: 'जलस्रोतांचे न्याय्य सामाजिक वाटप व पाण्याचा जबाबदार वापर ही नागरी संवेदनशीलता यातून विकसित होते.',
    },
    hi: {
      q: 'एक ओर सूखी बस्तियों में पेयजल का संकट और दूसरी ओर विलासितापूर्ण स्विमिंग पूलों का भरना—कक्षा ५ EVS में इस विरोधाभास पर चर्चा का उद्देश्य क्या है?',
      opts: [
        'प्राकृतिक जल संसाधनों के न्यायपूर्ण वितरण और स्वच्छ पेयजल को सभी के बुनियादी अधिकार के रूप में समझने की संवेदनशीलता जगाना',
        'बड़े निजी स्विमिंग पूल बनाना सिखाना',
        'कार धोने के लिए पानी बचाना',
        'जल-कर से बचना',
      ],
      exp: 'यह चर्चा जल संकट के प्रति सामाजिक न्याय, सहानुभूति और संसाधनों के जिम्मेदार उपयोग की दृष्टि विकसित करती है।',
    },
  },
  {
    topic: 'Clean Drinking Water Source Protection Near Wells',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why must washing soapy laundry clothes, bathing cattle, and open garbage pits be kept strictly AT LEAST 15–20 metres away from a village drinking well?',
      opts: [
        'Soapy runoff, animal waste, and sewage seep directly downward through porous soil/rock and contaminate well water with disease germs',
        'Cows drink up every rock inside the well',
        'Soap turns stones into coal',
        'Well water freezes when laundry is nearby',
      ],
      exp: 'Surface pollutants percolate straight into shallow open wells, spreading jaundice, typhoid, and dysentery.',
    },
    mr: {
      q: 'गावातील पिण्याच्या विहिरीपासून कपडे धुणे, जनावरे धुणे आणि कचराकुंड्या किमान १५–२० मीटर दूर का ठेवल्या पाहिजेत?',
      opts: [
        'साबणाचे पाणी, शेण व सांडपाणी सच्छिद्र मातीतून झिरपून विहिरीच्या पाण्यात मिसळल्यास कावीळ व अतिसारासारखे रोग पसरतात',
        'गायी विहिरीतील दगड पिऊन टाकतात',
        'साबणाने दगडाचा कोळसा होतो',
        'कपड्यांमुळे विहिरीचे पाणी गोठते',
      ],
      exp: 'विहिरीजवळील घाण भूगर्भात झिरपून पेयजल दूषित करते; म्हणून विहिरीसभोवती स्वच्छ व पक्का कठडा आवश्यक असतो.',
    },
    hi: {
      q: 'गाँव के पेयजल कुएँ के पास कपड़े धोना, पशु नहलाना तथा कचरे के गड्ढे क्यों वर्जित होने चाहिए?',
      opts: [
        'साबुन व गंदा पानी छिद्रयुक्त मिट्टी से रिसकर सीधे कुएँ के जल को पीलिया व हैजा के रोगाणुओं से दूषित कर देता है',
        'पशु कुएँ के पत्थर खा जाते हैं',
        'साबुन पत्थरों को कोयला बनाता है',
        'कपड़ों से कुएँ का पानी जम जाता है',
      ],
      exp: 'कुएँ के आसपास की गंदगी जमीन में रिसकर पेयजल को रोगजनक सूक्ष्मजीवों से प्रदूषित कर देती है।',
    },
  },
];
