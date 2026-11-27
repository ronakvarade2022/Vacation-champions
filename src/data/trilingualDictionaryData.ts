export type DictionaryPartOfSpeech =
  | 'Noun'
  | 'Verb'
  | 'Adjective'
  | 'Adverb'
  | 'Preposition'
  | 'Conjunction';

export type DictionaryClassGroup = 'Classes 1–3' | 'Classes 4–6' | 'Classes 7–10';

export type DictionaryTopicCategory =
  | 'Academic & School'
  | 'Science & Nature'
  | 'Mathematics & Logic'
  | 'History, Civics & Geography'
  | 'Values, Character & Emotions'
  | 'Daily Life & Communication'
  | 'Action Verbs & Grammar';

export interface TrilingualWordEntry {
  id: string;
  english: string;
  pronunciation: string; // Phonetic + Devanagari pronunciation guide
  partOfSpeech: DictionaryPartOfSpeech;
  classGroup: DictionaryClassGroup;
  category: DictionaryTopicCategory;
  englishMeaning: string;
  marathiWord: string;
  marathiMeaning: string;
  hindiWord: string;
  hindiMeaning: string;
  synonyms: {
    english: string[];
    marathi: string[];
    hindi: string[];
  };
  antonyms: {
    english: string[];
    marathi: string[];
    hindi: string[];
  };
  examples: {
    english: string;
    marathi: string;
    hindi: string;
  };
  letter: string; // Uppercase A-Z
}

// Tuple format for compact, verified linguistic representation:
// [english, pronunciation, partOfSpeech, classGroup, category, englishMeaning, marathiWord, marathiMeaning, hindiWord, hindiMeaning, [enSyn, mrSyn, hiSyn], [enAnt, mrAnt, hiAnt], [enEx, mrEx, hiEx]]
type RawWordTuple = [
  string,
  string,
  DictionaryPartOfSpeech,
  DictionaryClassGroup,
  DictionaryTopicCategory,
  string,
  string,
  string,
  string,
  string,
  [string[], string[], string[]],
  [string[], string[], string[]],
  [string, string, string]
];

const RAW_DICTIONARY_TUPLES: RawWordTuple[] = [
  // ================= A =================
  [
    'Ability',
    'uh-BIL-i-tee (अबिलिटी)',
    'Noun',
    'Classes 4–6',
    'Academic & School',
    'The power, skill, or capacity to do something well.',
    'क्षमता',
    'एखादे काम उत्तमरीत्या करण्याचे कौशल्य किंवा ताकद.',
    'योग्यता',
    'किसी कार्य को कुशलता से करने की शक्ति या क्षमता।',
    [['Capability', 'Skill', 'Talent'], ['कौशल्य', 'पात्रता', 'कुवत'], ['क्षमता', 'कौशल', 'प्रतिभा']],
    [['Inability', 'Weakness'], ['अक्षमता', 'दुर्बलता'], ['अयोग्यता', 'अक्षमता']],
    [
      'Regular practice improves our ability to solve mathematics problems.',
      'नियमित सरावामुळे गणिताची उदाहरणे सोडवण्याची आपली क्षमता वाढते.',
      'नियमित अभ्यास से गणित के प्रश्न हल करने की हमारी योग्यता बढ़ती है।'
    ]
  ],
  [
    'Abundant',
    'uh-BUN-duhnt (अबंडंट)',
    'Adjective',
    'Classes 7–10',
    'Science & Nature',
    'Existing or available in large quantities; plentiful.',
    'मुबलक',
    'मोठ्या प्रमाणात उपलब्ध असलेला; भरपूर.',
    'प्रचुर',
    'बहुत अधिक मात्रा में उपलब्ध; भरपूर।',
    [['Plentiful', 'Ample', 'Bountiful'], ['भरपूर', 'विपुल', 'पर्याप्त'], ['भरपूर', 'पर्याप्त', 'विपुल']],
    [['Scarce', 'Rare', 'Limited'], ['दुर्मीळ', 'कमतरता असलेला'], ['दुर्लभ', 'कम', 'सीमित']],
    [
      'India has abundant solar energy throughout the year.',
      'भारतात वर्षभर मुबलक सौर ऊर्जा उपलब्ध असते.',
      'भारत में वर्ष भर प्रचुर सौर ऊर्जा उपलब्ध रहती है।'
    ]
  ],
  [
    'Accelerate',
    'ak-SEL-uh-rayt (अॅक्सिलरेट)',
    'Verb',
    'Classes 7–10',
    'Science & Nature',
    'To increase in speed or make something happen faster.',
    'वेग वाढवणे',
    'गती वाढवणे किंवा एखादी क्रिया अधिक वेगाने घडवून आणणे.',
    'गति बढ़ाना',
    'चाल या गति में वृद्धि करना; त्वरित करना।',
    [['Speed up', 'Hasten', 'Quicken'], ['गती देणे', 'त्वरित करणे'], ['तेज़ करना', 'त्वरित करना']],
    [['Decelerate', 'Slow down', 'Delay'], ['वेग कमी करणे', 'मंदावणे'], ['धीमा करना', 'मंद करना']],
    [
      'A falling object continues to accelerate due to gravity.',
      'गुरुत्वाकर्षणामुळे खाली पडणाऱ्या वस्तूचा वेग सतत वाढत जातो.',
      'गुरुत्वाकर्षण के कारण गिरती हुई वस्तु की गति लगातार बढ़ती है।'
    ]
  ],
  [
    'Accurate',
    'AK-yuh-rit (अॅक्युरेट)',
    'Adjective',
    'Classes 4–6',
    'Mathematics & Logic',
    'Correct in all details; exact and free from error.',
    'अचूक',
    'कोणतीही चूक नसलेला; तंतोतंत बरोबर.',
    'सटीक',
    'पूरी तरह से सही और त्रुटिरहित; यथार्थ।',
    [['Exact', 'Precise', 'Correct'], ['बरोबर', 'तंतोतंत', 'नेमका'], ['सही', 'यथार्थ', 'शुद्ध']],
    [['Inaccurate', 'Wrong', 'Faulty'], ['चुकीचा', 'सदोष'], ['गलत', 'अशुद्ध', 'त्रुटिपूर्ण']],
    [
      'Always use a ruler to draw an accurate geometric diagram.',
      'अचूक भौमितिक आकृती काढण्यासाठी नेहमी पट्टीचा वापर करा.',
      'सटीक ज्यामितीय आकृति बनाने के लिए हमेशा पैमाने का उपयोग करें।'
    ]
  ],
  [
    'Achieve',
    'uh-CHEEV (अचीव्ह)',
    'Verb',
    'Classes 4–6',
    'Values, Character & Emotions',
    'To successfully reach a desired goal or result through effort.',
    'साध्य करणे',
    'कष्ट आणि प्रयत्नांच्या जोरावर ध्येय प्राप्त करणे किंवा यश मिळवणे.',
    'प्राप्त करना',
    'मेहनत और प्रयास से किसी लक्ष्य या सफलता को हासिल करना।',
    [['Accomplish', 'Attain', 'Succeed'], ['मिळवणे', 'संपादन करणे', 'यशस्वी होणे'], ['हासिल करना', 'सफल होना', 'पाना']],
    [['Fail', 'Lose', 'Forfeit'], ['अपयशी ठरणे', 'गमावणे'], ['असफल होना', 'खोना']],
    [
      'Hard work and discipline help students achieve high marks.',
      'कठोर परिश्रम आणि शिस्तीमुळे विद्यार्थ्यांना उत्तम गुण साध्य करता येतात.',
      'कठिन परिश्रम और अनुशासन से विद्यार्थियों को अच्छे अंक प्राप्त करने में मदद मिलती है।'
    ]
  ],
  [
    'Acknowledge',
    'ak-NOL-ij (अॅक्नॉलेज)',
    'Verb',
    'Classes 7–10',
    'Daily Life & Communication',
    'To accept or admit the existence or truth of something; to express gratitude.',
    'मान्य करणे',
    'एखाद्या गोष्टीचे सत्य स्वीकारणे किंवा कृतज्ञता व्यक्त करणे.',
    'स्वीकार करना',
    'किसी बात की सत्यता को मानना या आभार प्रकट करना।',
    [['Admit', 'Accept', 'Recognize'], ['स्वीकारणे', 'दखल घेणे'], ['मानना', 'पहुँच स्वीकारना']],
    [['Deny', 'Ignore', 'Reject'], ['नाकारणे', 'दुर्लक्ष करणे'], ['अस्वीकार करना', 'अनदेखा करना']],
    [
      'The principal acknowledged the efforts of all science fair participants.',
      'मुख्याध्यापकांनी विज्ञान प्रदर्शनातील सर्व स्पर्धकांच्या प्रयत्नांची दखल घेतली.',
      'प्रधानाचार्य ने विज्ञान प्रदर्शनी के सभी प्रतिभागियों के प्रयासों को स्वीकार किया।'
    ]
  ],
  [
    'Acquire',
    'uh-KWIRE (अक्वायर)',
    'Verb',
    'Classes 7–10',
    'Academic & School',
    'To learn, develop, or gain a skill, habit, or possession.',
    'आत्मसात करणे',
    'नवीन ज्ञान, कौशल्य किंवा सवय शिकून प्राप्त करणे.',
    'अर्जित करना',
    'नया ज्ञान, कौशल या अनुभव सीखना और प्राप्त करना।',
    [['Gain', 'Obtain', 'Learn'], ['प्राप्त करणे', 'मिळवणे'], ['प्राप्त करना', 'सीखना']],
    [['Lose', 'Forfeit'], ['गमावणे', 'सोडून देणे'], ['खोना', 'गँवाना']],
    [
      'Reading books daily helps us acquire rich vocabulary.',
      'दररोज पुस्तके वाचल्याने आपणास समृद्ध शब्दसंग्रह आत्मसात करण्यास मदत होते.',
      'प्रतिदिन पुस्तकें पढ़ने से हमें समृद्ध शब्द-भंडार अर्जित करने में सहायता मिलती है।'
    ]
  ],
  [
    'Adapt',
    'uh-DAPT (अडॅप्ट)',
    'Verb',
    'Classes 7–10',
    'Science & Nature',
    'To adjust to new conditions or a changing environment.',
    'जुळवून घेणे',
    'नवीन परिस्थिती किंवा बदलांनुसार स्वतःमध्ये बदल करणे.',
    'अनुकूलन करना',
    'नई परिस्थितियों या वातावरण के अनुसार स्वयं को ढालना।',
    [['Adjust', 'Acclimatize', 'Modify'], ['अनुकूल होणे', 'बदल स्वीकारणे'], ['ढालना', 'समायोजित करना']],
    [['Resist', 'Misfit'], ['विरोध करणे', 'न जुळणे'], ['विरोध करना', 'असहमत होना']],
    [
      'Desert plants adapt to survive with very little water.',
      'वाळवंटातील वनस्पती अत्यंत कमी पाण्यात जगण्यासाठी परिस्थितीशी जुळवून घेतात.',
      'मरुस्थलीय पौधे बहुत कम पानी में जीवित रहने के लिए अनुकूलन करते हैं।'
    ]
  ],
  [
    'Admire',
    'ad-MIRE (अॅडमायर)',
    'Verb',
    'Classes 4–6',
    'Values, Character & Emotions',
    'To regard someone or something with respect and warm approval.',
    'कौतुक करणे',
    'एखाद्याच्या चांगल्या गुणांचा आदर करणे किंवा प्रशंसा करणे.',
    'प्रशंसा करना',
    'किसी के अच्छे गुणों या कार्यों का सम्मान और सराहना करना।',
    [['Praise', 'Respect', 'Appreciate'], ['प्रशंसा करणे', 'आदर करणे'], ['सराहना करना', 'आदर करना']],
    [['Despise', 'Criticize', 'Dislike'], ['तिरस्कार करणे', 'टीका करणे'], ['निंदा करना', 'नापसंद करना']],
    [
      'We all admire the courage and wisdom of Chhatrapati Shivaji Maharaj.',
      'आपण सर्वजण छत्रपती शिवाजी महाराजांच्या शौर्याचे आणि दूरदृष्टीचे कौतुक करतो.',
      'हम सभी छत्रपति शिवाजी महाराज के साहस और बुद्धिमत्ता की प्रशंसा करते हैं।'
    ]
  ],
  [
    'Agriculture',
    'AG-ri-kul-cher (अॅग्रिकल्चर)',
    'Noun',
    'Classes 4–6',
    'History, Civics & Geography',
    'The science and practice of farming, growing crops, and rearing animals.',
    'शेती (कृषी)',
    'पिके पिकवण्याचा आणि पशुपालन करण्याचा व्यवसाय व शास्त्र.',
    'कृषि (खेती)',
    'फसल उगाने और पशुपालन करने का विज्ञान तथा व्यवसाय।',
    [['Farming', 'Cultivation', 'Agronomy'], ['कृषी', 'शेतकी', 'लागवड'], ['खेती', 'काश्तकारी']],
    [['Industry', 'Urbanization'], ['औद्योगिकीकरण'], ['उद्योग', 'शहरीकरण']],
    [
      'Agriculture is the primary occupation of a large population in India.',
      'शेती हा भारतातील मोठ्या लोकसंख्येचा मुख्य व्यवसाय आहे.',
      'कृषि भारत की एक बड़ी आबादी का मुख्य व्यवसाय है।'
    ]
  ],
  [
    'Ambition',
    'am-BISH-uhn (अॅम्बिशन)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'A strong desire and determination to achieve success in life.',
    'महत्त्वाकांक्षा',
    'आयुष्यात काहीतरी मोठे यश मिळवण्याची तीव्र इच्छा व ध्येय.',
    'महत्त्वाकांक्षा',
    'जीवन में बड़ी सफलता या लक्ष्य प्राप्त करने की प्रबल इच्छा।',
    [['Aspiration', 'Goal', 'Aim'], ['ध्येय', 'उद्दिष्ट', 'आकांक्षा'], ['लक्ष्य', 'आकांक्षा', 'उद्देश्य']],
    [['Indifference', 'Lethargy'], ['उदासीनता', 'आळस'], ['उदासीनता', 'आलस्य']],
    [
      'Her ambition is to become a space scientist at ISRO.',
      'इस्रोमध्ये अंतराळ शास्त्रज्ञ होण्याची तिची महत्त्वाकांक्षा आहे.',
      'उसकी महत्त्वाकांक्षा इसरो में अंतरिक्ष वैज्ञानिक बनने की है।'
    ]
  ],
  [
    'Ancient',
    'AYN-shuhnt (एन्शंट)',
    'Adjective',
    'Classes 4–6',
    'History, Civics & Geography',
    'Belonging to the very distant past; very old.',
    'प्राचीन',
    'खूप जुन्या काळातील; पुरातन.',
    'प्राचीन',
    'बहुत पुराने समय का; पुरातन।',
    [['Old', 'Antique', 'Prehistoric'], ['पुरातन', 'जुना', 'ऐतिहासिक'], ['पुरातन', 'पुराना', 'ऐतिहासिक']],
    [['Modern', 'New', 'Recent'], ['आधुनिक', 'नवीन', 'अलीकडील'], ['आधुनिक', 'नया', 'नवीन']],
    [
      'Nalanda and Takshashila were famous universities in ancient India.',
      'नालंदा आणि तक्षशिला ही प्राचीन भारतातील प्रसिद्ध विद्यापीठे होती.',
      'नालंदा और तक्षशिला प्राचीन भारत के प्रसिद्ध विश्वविद्यालय थे।'
    ]
  ],
  [
    'Atmosphere',
    'AT-muhs-feer (अॅटमॉस्फिअर)',
    'Noun',
    'Classes 4–6',
    'Science & Nature',
    'The envelope of gases surrounding the Earth or another planet.',
    'वातावरण',
    'पृथ्वीभोवती असलेले हवेचे व विविध वायूंचे आवरण.',
    'वायुमंडल',
    'पृथ्वी के चारों ओर फैला हुआ गैसों का आवरण।',
    [['Air', 'Sky', 'Environment'], ['हवामान', 'परिसर'], ['वातावरण', 'हवा', 'परिवेश']],
    [['Vacuum'], ['निर्वात पोकळी'], ['निर्वात']],
    [
      'The Earth’s atmosphere protects us from harmful ultraviolet rays.',
      'पृथ्वीचे वातावरण आपले हानिकारक अतिनील किरणांपासून रक्षण करते.',
      'पृथ्वी का वायुमंडल हमें हानिकारक पराबैंगनी किरणों से बचाता है।'
    ]
  ],
  [
    'Authentic',
    'aw-THEN-tik (ऑथेंटिक)',
    'Adjective',
    'Classes 7–10',
    'Academic & School',
    'Genuine, real, and based on verified facts.',
    'अस्सल (विश्वसनीय)',
    'खरा, प्रमाणित आणि विश्वास ठेवण्यायोग्य.',
    'प्रामाणिक',
    'असली, खरा और तथ्यों पर आधारित।',
    [['Genuine', 'Real', 'Reliable'], ['खरा', 'प्रमाणित', 'विश्वसनीय'], ['असली', 'सच्चा', 'विश्वसनीय']],
    [['Fake', 'Counterfeit', 'False'], ['बनावट', 'खोटा'], ['नकली', 'झूठा', 'जाली']],
    [
      'Historians rely on authentic inscriptions and coins to study the past.',
      'इतिहासाचा अभ्यास करण्यासाठी इतिहासकार अस्सल शिलालेख आणि नाण्यांवर अवलंबून राहतात.',
      'इतिहासकार अतीत का अध्ययन करने के लिए प्रामाणिक शिलालेखों और सिक्कों पर निर्भर करते हैं।'
    ]
  ],

  // ================= B =================
  [
    'Balance',
    'BAL-uhns (बॅलन्स)',
    'Noun',
    'Classes 1–3',
    'Science & Nature',
    'An even distribution of weight or a state of harmony and stability.',
    'समतोल',
    'दोन्ही बाजू समान असण्याची स्थिती; संतुलन.',
    'संतुलन',
    'बराबर वजन या सामंजस्य बने रहने की स्थिति।',
    [['Equilibrium', 'Stability', 'Harmony'], ['संतुलन', 'स्थिरता'], ['सामंजस्य', 'स्थिरता']],
    [['Imbalance', 'Instability'], ['असमतोल', 'अस्थिरता'], ['असंतुलन', 'अस्थिरता']],
    [
      'Trees play a vital role in maintaining the balance of nature.',
      'निसर्गाचा समतोल राखण्यात झाडे महत्त्वाची भूमिका बजावतात.',
      'प्रकृति का संतुलन बनाए रखने में पेड़ महत्त्वपूर्ण भूमिका निभाते हैं।'
    ]
  ],
  [
    'Beneficial',
    'ben-uh-FISH-uhl (बेनिफिशिअल)',
    'Adjective',
    'Classes 7–10',
    'Daily Life & Communication',
    'Resulting in good; favourable or helpful.',
    'फायदेशीर',
    'ज्याचा चांगला उपयोग किंवा फायदा होतो असा; उपयुक्त.',
    'लाभदायक',
    'जिससे लाभ या भलाई हो; हितकारी।',
    [['Helpful', 'Useful', 'Advantageous'], ['उपयुक्त', 'हितकारक', 'लाभदायक'], ['उपयोगी', 'हितकारी', 'फायदेमंद']],
    [['Harmful', 'Detrimental', 'Useless'], ['हानिकारक', 'निरुपयोगी'], ['हानिकारक', 'नुकसानदेह']],
    [
      'Morning exercise and yoga are highly beneficial for physical and mental health.',
      'सकाळचा व्यायाम आणि योगासने शारीरिक व मानसिक आरोग्यासाठी अत्यंत फायदेशीर आहेत.',
      'सुबह का व्यायाम और योग शारीरिक तथा मानसिक स्वास्थ्य के लिए अत्यंत लाभदायक हैं।'
    ]
  ],
  [
    'Biodiversity',
    'by-oh-dy-VUR-si-tee (बायोडायव्हर्सिटी)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'The variety of plant and animal life in the world or in a particular habitat.',
    'जैवविविधता',
    'निसर्गातील विविध प्रकारच्या वनस्पती, प्राणी आणि सूक्ष्मजीवांची समृद्ध विविधता.',
    'जैव विविधता',
    'किसी क्षेत्र या पृथ्वी पर पाए जाने वाले जीव-जंतुओं और पेड़-पौधों की विविधता।',
    [['Ecological variety', 'Flora and fauna'], ['सजीव विविधता'], ['जीव-जंतु विविधता']],
    [['Monoculture', 'Extinction'], ['एकसुरीपणा', 'नामशेष'], ['एकरूपता', 'विलुप्ति']],
    [
      'The Western Ghats of Maharashtra are famous for their rich biodiversity.',
      'महाराष्ट्रातील पश्चिम घाट आपल्या समृद्ध जैवविविधतेसाठी प्रसिद्ध आहे.',
      'महाराष्ट्र का पश्चिमी घाट अपनी समृद्ध जैव विविधता के लिए प्रसिद्ध है।'
    ]
  ],
  [
    'Brave',
    'BRAYV (ब्रेव्ह)',
    'Adjective',
    'Classes 1–3',
    'Values, Character & Emotions',
    'Ready to face and endure danger or difficulty with courage.',
    'शूर (धाडसी)',
    'संकटाला न घाबरता धैर्याने सामोरे जाणारा; पराक्रमी.',
    'वीर (साहसी)',
    'संकट या कठिनाई का निडरता से सामना करने वाला; बहादुर।',
    [['Courageous', 'Fearless', 'Bold'], ['धाडसी', 'निर्भय', 'पराक्रमी'], ['साहसी', 'निडर', 'बहादुर']],
    [['Cowardly', 'Timid', 'Fearful'], ['भित्रा', 'घाबरट'], ['कायर', 'डरपोक']],
    [
      'Brave soldiers protect our nation’s borders day and night.',
      'शूर सैनिक आपल्या देशाच्या सीमांचे अहोरात्र रक्षण करतात.',
      'वीर सैनिक दिन-रात हमारे देश की सीमाओं की रक्षा करते हैं।'
    ]
  ],
  [
    'Brilliant',
    'BRIL-yuhnt (ब्रिलियंट)',
    'Adjective',
    'Classes 4–6',
    'Academic & School',
    'Exceptionally clever, talented, or shining brightly.',
    'हुशार (तेजस्वी)',
    'अत्यंत बुद्धिमान, कल्पक किंवा प्रखर प्रकाश देणारा.',
    'प्रतिभाशाली (तेजस्वी)',
    'अत्यधिक बुद्धिमान, कुशाग्र या चमकदार।',
    [['Intelligent', 'Bright', 'Gifted'], ['बुद्धिमान', 'कुशाग्र', 'चमकदार'], ['बुद्धिमान', 'मेधावी', 'चमकदार']],
    [['Dull', 'Foolish', 'Dim'], ['मंद', 'अंधूक'], ['मंदबुद्धि', 'धुँधला']],
    [
      'Dr. B. R. Ambedkar was a brilliant scholar and the chief architect of our Constitution.',
      'डॉ. बाबासाहेब आंबेडकर हे एक तेजस्वी विद्वान आणि आपल्या संविधानाचे प्रमुख शिल्पकार होते.',
      'डॉ. बी. आर. आंबेडकर एक प्रतिभाशाली विद्वान और हमारे संविधान के मुख्य निर्माता थे।'
    ]
  ],

  // ================= C =================
  [
    'Calculate',
    'KAL-kyuh-layt (कॅल्क्युलेट)',
    'Verb',
    'Classes 4–6',
    'Mathematics & Logic',
    'To determine the amount or number of something mathematically.',
    'मोजमाप करणे (गणना करणे)',
    'गणिताच्या साहाय्याने आकडेमोड करून उत्तर काढणे.',
    'गणना करना',
    'गणितीय विधि से हिसाब लगाना या मान निकालना।',
    [['Compute', 'Count', 'Estimate'], ['आकडेमोड करणे', 'मोजणे'], ['हिसाब लगाना', 'गिनना']],
    [['Guess', 'Ignore'], ['अंदाज बांधणे'], ['अंदाज़ा लगाना']],
    [
      'Can you calculate the area and perimeter of this rectangle?',
      'तुम्ही या आयताचे क्षेत्रफळ आणि परिमिती मोजू शकता का?',
      'क्या आप इस आयत का क्षेत्रफल और परिमाप की गणना कर सकते हैं?'
    ]
  ],
  [
    'Calm',
    'KAHM (काम)',
    'Adjective',
    'Classes 1–3',
    'Values, Character & Emotions',
    'Peaceful, quiet, and free from anger, nervousness, or strong wind.',
    'शांत',
    'कोणताही गोंधळ, राग किंवा अस्वस्थता नसलेला; स्थिर.',
    'शांत',
    'बिना किसी घबराहट, क्रोध या शोर के; स्थिर।',
    [['Peaceful', 'Quiet', 'Serene'], ['स्थिर', 'संयमी', 'निवांत'], ['स्थिर', 'सौम्य', 'शांतिपूर्ण']],
    [['Angry', 'Noisy', 'Agitated'], ['अशांत', 'रागावलेला', 'गोंधळलेला'], ['अशांत', 'उत्तेजित', 'क्रोधित']],
    [
      'Stay calm and read the question paper carefully before writing answers.',
      'उत्तरे लिहिण्यापूर्वी शांत राहा आणि प्रश्नपत्रिका काळजीपूर्वक वाचा.',
      'उत्तर लिखने से पहले शांत रहें और प्रश्नपत्र को ध्यानपूर्वक पढ़ें।'
    ]
  ],
  [
    'Capacity',
    'kuh-PAS-i-tee (कपॅसिटी)',
    'Noun',
    'Classes 4–6',
    'Mathematics & Logic',
    'The maximum amount that something can contain or produce.',
    'धारणक्षमता',
    'एखाद्या भांड्यात किंवा जागेत मावू शकणारे कमाल प्रमाण.',
    'धारिता (क्षमता)',
    'किसी पात्र या स्थान में समा सकने वाली अधिकतम मात्रा।',
    [['Volume', 'Capability', 'Limit'], ['क्षमता', 'आकारमान'], ['आयतन', 'सामर्थ्य']],
    [['Incapacity', 'Emptiness'], ['अक्षमता'], ['अक्षमता']],
    [
      'The capacity of this water tank is five thousand litres.',
      'या पाण्याच्या टाकीची धारणक्षमता पाच हजार लिटर आहे.',
      'इस पानी की टंकी की धारिता पाँच हज़ार लीटर है।'
    ]
  ],
  [
    'Century',
    'SEN-chuh-ree (सेंचुरी)',
    'Noun',
    'Classes 4–6',
    'History, Civics & Geography',
    'A period of one hundred years, or a score of one hundred runs in cricket.',
    'शतक',
    'शंभर वर्षांचा कालखंड किंवा क्रिकेटमधील शंभर धावा.',
    'शताब्दी (शतक)',
    'सौ वर्षों की अवधि या क्रिकेट में सौ रन।',
    [['Hundred years', 'Centennial'], ['शंभर वर्षे'], ['सौ वर्ष']],
    [['Year', 'Decade'], ['वर्ष', 'दशक'], ['वर्ष', 'दशक']],
    [
      'The twenty-first century is an era of science, digital literacy, and innovation.',
      'एकविसावे शतक हे विज्ञान, डिजिटल साक्षरता आणि नवनिर्मितीचे युग आहे.',
      'इक्कीसवीं शताब्दी विज्ञान, डिजिटल साक्षरता और नवाचार का युग है।'
    ]
  ],
  [
    'Challenge',
    'CHAL-inj (चॅलेंज)',
    'Noun',
    'Classes 4–6',
    'Values, Character & Emotions',
    'A new or difficult task that tests someone’s ability and determination.',
    'आव्हान',
    'आपल्या कौशल्याची आणि जिद्दीची परीक्षा पाहणारे कठीण कार्य.',
    'चुनौती',
    'ऐसा कठिन कार्य जो किसी की क्षमता और साहस की परीक्षा लेता है।',
    [['Test', 'Trial', 'Obstacle'], ['कसौटी', 'परीक्षा'], ['कसौटी', 'परीक्षा']],
    [['Ease', 'Comfort'], ['सोपी गोष्ट'], ['आसानी', 'सुविधा']],
    [
      'Every difficult exam is an opportunity to rise to a new challenge.',
      'प्रत्येक कठीण परीक्षा ही एका नवीन आव्हानाला सामोरे जाण्याची संधी असते.',
      'प्रत्येक कठिन परीक्षा एक नई चुनौती का सामना करने का अवसर होती है।'
    ]
  ],
  [
    'Citizen',
    'SIT-i-zuhn (सिटिझन)',
    'Noun',
    'Classes 4–6',
    'History, Civics & Geography',
    'A legally recognized member of a country with rights and duties.',
    'नागरिक',
    'एखाद्या देशाचा कायदेशीर रहिवासी ज्याला हक्क आणि कर्तव्ये असतात.',
    'नागरिक',
    'किसी देश का वैध निवासी जिसे संविधान द्वारा अधिकार और कर्तव्य प्राप्त होते हैं।',
    [['Resident', 'Inhabitant', 'National'], ['रहिवासी', 'देशवासी'], ['निवासी', 'देशवासी']],
    [['Foreigner', 'Alien'], ['परदेशी व्यक्ती'], ['विदेशी']],
    [
      'Every responsible citizen must follow the rules and protect public property.',
      'प्रत्येक जबाबदार नागरिकाने नियमांचे पालन केले पाहिजे आणि सार्वजनिक मालमत्तेचे रक्षण केले पाहिजे.',
      'प्रत्येक जिम्मेदार नागरिक को नियमों का पालन करना चाहिए और सार्वजनिक संपत्ति की रक्षा करनी चाहिए।'
    ]
  ],
  [
    'Climate',
    'KLY-mit (क्लायमेट)',
    'Noun',
    'Classes 4–6',
    'History, Civics & Geography',
    'The average weather conditions of a region over a long period of years.',
    'हवामान',
    'एखाद्या प्रदेशातील दीर्घकाळापर्यंत असणारी हवेची सरासरी स्थिती.',
    'जलवायु',
    'किसी क्षेत्र में लंबे समय तक रहने वाली मौसम की औसत स्थिति।',
    [['Weather pattern', 'Atmosphere'], ['ऋतुमान', 'वातावरण'], ['मौसम', 'वातावरण']],
    [['Instant change'], ['तात्पुरता बदल'], ['तात्कालिक परिवर्तन']],
    [
      'The climate of coastal Maharashtra is warm and humid.',
      'महाराष्ट्राच्या किनारपट्टीचे हवामान उष्ण आणि दमट आहे.',
      'महाराष्ट्र के तटीय क्षेत्र की जलवायु गर्म और आर्द्र है।'
    ]
  ],
  [
    'Compassion',
    'kuhm-PASH-uhn (कम्पॅशन)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'Sympathetic pity and concern for the sufferings or misfortunes of others.',
    'करुणा (दया)',
    'इतरांच्या दुःखाविषयी वाटणारी मनापासूनची सहानुभूती व मदतीची भावना.',
    'करुणा (दया)',
    'दूसरों के दुःख और पीड़ा को देखकर मन में उठने वाली दया और सहानुभूति की भावना।',
    [['Kindness', 'Empathy', 'Mercy'], ['दयाळूपणा', 'सहानुभूती', 'माया'], ['दया', 'सहानुभूति', 'संवेदना']],
    [['Cruelty', 'Indifference', 'Harshness'], ['क्रूरता', 'निर्दयता'], ['क्रूरता', 'कठोरता']],
    [
      'Showing compassion towards animals and the needy is a noble human virtue.',
      'प्राणी आणि गरजू लोकांप्रती करुणा दाखवणे हा एक श्रेष्ठ मानवी गुण आहे.',
      'पशुओं और जरूरतमंदों के प्रति करुणा दिखाना एक श्रेष्ठ मानवीय गुण है।'
    ]
  ],
  [
    'Comprehend',
    'kom-pri-HEND (कॉम्प्रिहेंड)',
    'Verb',
    'Classes 7–10',
    'Academic & School',
    'To grasp the full meaning of something; to understand clearly.',
    'आकलन करणे (समजून घेणे)',
    'एखाद्या विषयाचा किंवा मजकुराचा अर्थ पूर्णपणे समजून घेणे.',
    'समझना (बोध करना)',
    'किसी विषय या विचार के अर्थ को पूरी तरह से समझना।',
    [['Understand', 'Grasp', 'Fathom'], ['समजणे', 'उमगणे', 'जाणणे'], ['समझना', 'जानना', 'ग्रहण करना']],
    [['Misunderstand', 'Confuse'], ['गैरसमज होणे', 'गोंधळणे'], ['गलत समझना', 'भ्रमित होना']],
    [
      'Read the passage twice so that you can comprehend its central idea.',
      'उताऱ्याची मध्यवर्ती कल्पना नीट समजून घेण्यासाठी तो दोनदा वाचा.',
      'गद्यांश के मुख्य विचार को अच्छी तरह समझने के लिए उसे दो बार पढ़ें।'
    ]
  ],
  [
    'Concentrate',
    'KON-suhn-trayt (कॉन्सन्ट्रेट)',
    'Verb',
    'Classes 4–6',
    'Academic & School',
    'To focus all one’s attention or mental effort on a particular activity.',
    'लक्ष केंद्रित करणे',
    'आपले संपूर्ण मन आणि लक्ष एकाच कामावर किंवा अभ्यासावर स्थिर करणे.',
    'ध्यान केंद्रित करना',
    'अपने मन और ध्यान को किसी एक कार्य या अध्ययन पर पूरी तरह लगाना।',
    [['Focus', 'Attend', 'Pay attention'], ['एकाग्र होणे', 'लक्ष देणे'], ['एकाग्र होना', 'ध्यान लगाना']],
    [['Daydream', 'Distract'], ['लक्ष विचलित होणे'], ['भटकना', 'ध्यान हटाना']],
    [
      'Meditation helps students concentrate better on their studies.',
      'ध्यानधारणेमुळे विद्यार्थ्यांना अभ्यासावर अधिक चांगल्या प्रकारे लक्ष केंद्रित करण्यास मदत होते.',
      'ध्यान करने से विद्यार्थियों को अपनी पढ़ाई पर बेहतर ध्यान केंद्रित करने में मदद मिलती है।'
    ]
  ],
  [
    'Confidence',
    'KON-fi-duhns (कॉन्फिडन्स)',
    'Noun',
    'Classes 4–6',
    'Values, Character & Emotions',
    'Belief and trust in one’s own abilities, qualities, and preparation.',
    'आत्मविश्वास',
    'स्वतःच्या क्षमतेवर आणि अभ्यासावर असलेला ठाम विश्वास.',
    'आत्मविश्वास',
    'अपनी योग्यता, परिश्रम और क्षमता पर दृढ़ विश्वास।',
    [['Self-belief', 'Assurance', 'Courage'], ['स्वतःवरील विश्वास', 'धैर्य'], ['भरोसा', 'निश्चय', 'साहस']],
    [['Doubt', 'Fear', 'Hesitation'], ['शंका', 'भीती', 'कचरण्याची वृत्ती'], ['संदेह', 'भय', 'संकोच']],
    [
      'Thorough revision before the exam builds strong confidence.',
      'परीक्षेपूर्वी केलेली सखोल उजळणी प्रबळ आत्मविश्वास निर्माण करते.',
      'परीक्षा से पहले किया गया गहन पुनरीक्षण दृढ़ आत्मविश्वास पैदा करता है।'
    ]
  ],
  [
    'Conservation',
    'kon-ser-VAY-shuhn (कॉन्झर्व्हेशन)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'Careful preservation and protection of natural resources such as water, forests, and wildlife.',
    'संवर्धन (संरक्षण)',
    'पाणी, जंगले आणि वन्यजीव यांसारख्या नैसर्गिक साधनसंपत्तीचे काळजीपूर्वक जतन करणे.',
    'संरक्षण',
    'जल, वन और वन्यजीव जैसे प्राकृतिक संसाधनों की सुरक्षा तथा बचाव।',
    [['Preservation', 'Protection', 'Saving'], ['जतन', 'रक्षण', 'बचत'], ['बचाव', 'सुरक्षा', 'रक्षा']],
    [['Destruction', 'Wastage', 'Depletion'], ['नाश', 'अपव्यय'], ['विनाश', 'बर्बादी']],
    [
      'Rainwater harvesting is an effective method of water conservation.',
      'पावसाच्या पाण्याचे संकलन ही जलसंवर्धनाची एक प्रभावी पद्धत आहे.',
      'वर्षा जल संचयन जल संरक्षण की एक प्रभावी विधि है।'
    ]
  ],
  [
    'Constitution',
    'kon-sti-TOO-shuhn (कॉन्स्टिट्यूशन)',
    'Noun',
    'Classes 7–10',
    'History, Civics & Geography',
    'The supreme body of fundamental principles and laws according to which a nation is governed.',
    'संविधान (राज्यघटना)',
    'देशाचा राज्यकारभार ज्या मूलभूत कायद्यांनुसार आणि तत्त्वांनुसार चालतो तो सर्वोच्च ग्रंथ.',
    'संविधान',
    'मौलिक कानूनों और सिद्धांतों का वह सर्वोच्च ग्रंथ जिसके अनुसार देश का शासन चलता है।',
    [['Charter', 'Fundamental law'], ['राज्यघटना', 'मूलभूत कायदा'], ['विधान', 'मूल कानून']],
    [['Lawlessness', 'Anarchy'], ['अराजकता'], ['अराजकता']],
    [
      'The Constitution of India guarantees fundamental rights to every citizen.',
      'भारताचे संविधान प्रत्येक नागरिकाला मूलभूत हक्कांची हमी देते.',
      'भारत का संविधान प्रत्येक नागरिक को मौलिक अधिकारों की गारंटी देता है।'
    ]
  ],
  [
    'Courage',
    'KUR-ij (करेज)',
    'Noun',
    'Classes 1–3',
    'Values, Character & Emotions',
    'Mental or moral strength to face danger, fear, or difficulty.',
    'धैर्य (शौर्य)',
    'भीती किंवा संकटावर मात करून पुढे जाण्याची मनाची ताकद; हिंमत.',
    'साहस (हिम्मत)',
    'भय या कठिनाई का डटकर सामना करने की मानसिक शक्ति।',
    [['Bravery', 'Valour', 'Fearlessness'], ['हिंमत', 'धाडस', 'पराक्रम'], ['वीरता', 'बहादुरी', 'निडरता']],
    [['Cowardice', 'Fear', 'Timidity'], ['भीती', 'भित्रेपणा'], ['कायरता', 'डर']],
    [
      'It takes courage to speak the truth and stand up for what is right.',
      'सत्य बोलण्यासाठी आणि योग्य गोष्टीच्या बाजूने उभे राहण्यासाठी धैर्य लागते.',
      'सच बोलने और सही के पक्ष में खड़े होने के लिए साहस की आवश्यकता होती है।'
    ]
  ],
  [
    'Curiosity',
    'kyoor-ee-OS-i-tee (क्युरिऑसिटी)',
    'Noun',
    'Classes 4–6',
    'Academic & School',
    'A strong desire to know or learn how things work.',
    'जिज्ञासा (कुतूहल)',
    'नवीन गोष्टी जाणून घेण्याची आणि शिकण्याची तीव्र इच्छा.',
    'जिज्ञासा (उत्सुकता)',
    'नई बातें जानने और सीखने की प्रबल इच्छा।',
    [['Inquisitiveness', 'Interest', 'Wonder'], ['कुतूहल', 'उत्सुकता'], ['उत्सुकता', 'जानने की इच्छा']],
    [['Apathy', 'Indifference'], ['उदासीनता', 'अनास्था'], ['उदासीनता', 'अरुचि']],
    [
      'Curiosity is the mother of all scientific discoveries and inventions.',
      'जिज्ञासा ही सर्व वैज्ञानिक शोध आणि नवनिर्मितीची जननी आहे.',
      'जिज्ञासा सभी वैज्ञानिक खोजों और आविष्कारों की जननी है।'
    ]
  ],

  // ================= D =================
  [
    'Dedication',
    'ded-i-KAY-shuhn (डेडिकेशन)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'The quality of being committed and devoted to a task or purpose.',
    'समर्पण (निष्ठा)',
    'एखाद्या ध्येयासाठी किंवा अभ्यासासाठी स्वतःला पूर्णपणे वाहून घेण्याची वृत्ती.',
    'समर्पण (निष्ठा)',
    'किसी लक्ष्य या कार्य के प्रति पूर्ण निष्ठा और लगन का भाव।',
    [['Commitment', 'Devotion', 'Loyalty'], ['निष्ठा', 'चिकाटी', 'तळमळ'], ['निष्ठा', 'लगन', 'प्रतिबद्धता']],
    [['Neglect', 'Apathy', 'Laziness'], ['दुर्लक्ष', 'आळस'], ['उपेक्षा', 'आलस्य']],
    [
      'Success in competitive exams requires daily dedication and practice.',
      'स्पर्धा परीक्षांमध्ये यश मिळवण्यासाठी दैनंदिन समर्पण आणि सरावाची गरज असते.',
      'प्रतियोगी परीक्षाओं में सफलता के लिए दैनिक समर्पण और अभ्यास आवश्यक है।'
    ]
  ],
  [
    'Democracy',
    'di-MOK-ruh-see (डेमॉक्रसी)',
    'Noun',
    'Classes 7–10',
    'History, Civics & Geography',
    'A system of government by the whole population through elected representatives.',
    'लोकशाही',
    'लोकांनी लोकांसाठी निवडून दिलेल्या प्रतिनिधींमार्फत चालवले जाणारे शासन.',
    'लोकतंत्र (प्रजातंत्र)',
    'जनता द्वारा चुने गए प्रतिनिधियों के माध्यम से चलने वाली शासन प्रणाली।',
    [['Republic', 'Self-government'], ['प्रजासत्ताक', 'लोकराज्य'], ['प्रजातंत्र', 'जनतंत्र']],
    [['Dictatorship', 'Autocracy', 'Monarchy'], ['हुकूमशाही', 'राजाशाही'], ['तानाशाही', 'राजतंत्र']],
    [
      'India is the largest democracy in the world.',
      'भारत हा जगातील सर्वात मोठा लोकशाही देश आहे.',
      'भारत विश्व का सबसे बड़ा लोकतंत्र है।'
    ]
  ],
  [
    'Determination',
    'di-tur-mi-NAY-shuhn (डिटर्मिनेशन)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'Firmness of purpose; the resolve to continue trying despite difficulties.',
    'निर्धार (निश्चय)',
    'कितीही अडचणी आल्या तरी ध्येय पूर्ण करण्याचा ठाम निश्चय; जिद्द.',
    'दृढ़ निश्चय (संकल्प)',
    'कठिनाइयों के बावजूद अपने लक्ष्य को पूरा करने का पक्का इरादा।',
    [['Resolve', 'Willpower', 'Perseverance'], ['ठाम निश्चय', 'जिद्द', 'चिकाटी'], ['संकल्प', 'इच्छाशक्ति', 'लगन']],
    [['Hesitation', 'Weakness', 'Doubt'], ['संशय', 'कचखाऊपणा'], ['दुविधा', 'कमज़ोरी']],
    [
      'With strong determination, any student can master difficult subjects.',
      'पक्क्या निर्धाराच्या जोरावर कोणताही विद्यार्थी कठीण विषयांवर प्रभुत्व मिळवू शकतो.',
      'दृढ़ निश्चय के बल पर कोई भी विद्यार्थी कठिन विषयों में महारत हासिल कर सकता है।'
    ]
  ],
  [
    'Diligent',
    'DIL-i-juhnt (डिलिजंट)',
    'Adjective',
    'Classes 7–10',
    'Values, Character & Emotions',
    'Having or showing care, steady effort, and conscientiousness in one’s work or study.',
    'मेहनती (उद्योगी)',
    'कोणतेही काम किंवा अभ्यास अतिशय प्रामाणिकपणे व चिकाटीने करणारा.',
    'परिश्रमी (मेहनती)',
    'अपने काम या पढ़ाई में निरंतर मेहनत और लगन दिखाने वाला।',
    [['Hardworking', 'Industrious', 'Studious'], ['कष्टाळू', 'अभ्यासु', 'दक्ष'], ['मेहनती', 'उद्यमी', 'अध्ययनशील']],
    [['Lazy', 'Idle', 'Careless'], ['आळशी', 'निष्काळजी'], ['आलसी', 'लापरवाह']],
    [
      'A diligent student completes classwork and revision on time.',
      'मेहनती विद्यार्थी आपला वर्गपाठ आणि उजळणी वेळेवर पूर्ण करतो.',
      'एक परिश्रमी विद्यार्थी अपना कक्षा-कार्य और पुनरीक्षण समय पर पूरा करता है।'
    ]
  ],
  [
    'Discipline',
    'DIS-uh-plin (डिसिप्लिन)',
    'Noun',
    'Classes 4–6',
    'Values, Character & Emotions',
    'The practice of training oneself to obey rules and work systematically.',
    'शिस्त',
    'नियमांचे पालन करण्याची आणि वेळेवर योग्य पद्धतीने काम करण्याची सवय.',
    'अनुशासन',
    'नियमों का पालन करने और व्यवस्थित रूप से कार्य करने की आदत।',
    [['Self-control', 'Order', 'Regulation'], ['स्वयंशिस्त', 'नियमबद्धता'], ['संयम', 'नियमबद्धता', 'व्यवस्था']],
    [['Indiscipline', 'Disorder', 'Chaos'], ['बेशिस्त', 'गोंधळ'], ['अनुशासनहीनता', 'अव्यवस्था']],
    [
      'Self-discipline is the bridge between setting goals and accomplishing them.',
      'स्वयंशिस्त हा ध्येय ठरवणे आणि ते पूर्ण करणे यामधील महत्त्वाचा दुवा आहे.',
      'आत्मानुशासन लक्ष्य निर्धारित करने और उन्हें प्राप्त करने के बीच का सेतु है।'
    ]
  ],
  [
    'Discover',
    'di-SKUV-er (डिस्कव्हर)',
    'Verb',
    'Classes 4–6',
    'Science & Nature',
    'To find or learn about something that already existed in nature for the first time.',
    'शोध लावणे',
    'निसर्गात आधीपासून अस्तित्वात असलेल्या पण अज्ञात गोष्टीचा प्रथमच शोध लावणे.',
    'खोज करना',
    'प्रकृति में पहले से मौजूद किसी अज्ञात तथ्य या स्थान का पता लगाना।',
    [['Find', 'Uncover', 'Explore'], ['शोधून काढणे', 'उलगडणे'], ['पता लगाना', 'ढूँढ़ निकालना']],
    [['Hide', 'Conceal', 'Lose'], ['लपवणे', 'गमावणे'], ['छिपाना', 'खोना']],
    [
      'Sir Isaac Newton discovered the universal law of gravitation.',
      'सर आयझॅक न्यूटन यांनी गुरुत्वाकर्षणाच्या वैश्विक नियमाचा शोध लावला.',
      'सर आइजैक न्यूटन ने गुरुत्वाकर्षण के सार्वत्रिक नियम की खोज की।'
    ]
  ],
  [
    'Diversity',
    'dy-VUR-si-tee (डायव्हर्सिटी)',
    'Noun',
    'Classes 7–10',
    'History, Civics & Geography',
    'The state of having many different forms, cultures, languages, or ideas.',
    'विविधता',
    'भाषा, संस्कृती, निसर्ग आणि विचारांमधील वेगळेपणा व समृद्धता.',
    'विविधता',
    'भाषा, संस्कृति, परंपराओं या विचारों में पाई जाने वाली भिन्नता।',
    [['Variety', 'Multiplicity'], ['वैविध्य', 'अनेकता'], ['विभिन्नता', 'अनेकता']],
    [['Uniformity', 'Sameness'], ['एकसारखेपणा'], ['एकरूपता', 'समानता']],
    [
      'Unity in diversity is the greatest strength of Indian culture.',
      'विविधतेत एकता ही भारतीय संस्कृतीची सर्वात मोठी ताकद आहे.',
      'विविधता में एकता भारतीय संस्कृति की सबसे बड़ी शक्ति है।'
    ]
  ],

  // ================= E =================
  [
    'Education',
    'ej-oo-KAY-shuhn (एज्युकेशन)',
    'Noun',
    'Classes 1–3',
    'Academic & School',
    'The process of receiving or giving systematic instruction, knowledge, and moral values.',
    'शिक्षण',
    'ज्ञान, कौशल्ये, संस्कार आणि विचार करण्याची क्षमता विकसित करण्याची प्रक्रिया.',
    'शिक्षा',
    'ज्ञान, कौशल, संस्कार और चरित्र का विकास करने की व्यवस्थित प्रक्रिया।',
    [['Learning', 'Schooling', 'Knowledge'], ['विद्या', 'ज्ञानार्जन', 'अध्ययन'], ['विद्या', 'अध्ययन', 'ज्ञान']],
    [['Ignorance', 'Illiteracy'], ['अज्ञान', 'निरक्षरता'], ['अज्ञान', 'निरक्षरता']],
    [
      'Education empowers every child to build a bright and self-reliant future.',
      'शिक्षण प्रत्येक मुलाला उज्ज्वल आणि स्वावलंबी भविष्य घडवण्याचे सामर्थ्य देते.',
      'शिक्षा प्रत्येक बच्चे को उज्ज्वल और आत्मनिर्भर भविष्य बनाने में सक्षम बनाती है।'
    ]
  ],
  [
    'Efficient',
    'i-FISH-uhnt (इफिशिअंट)',
    'Adjective',
    'Classes 7–10',
    'Daily Life & Communication',
    'Working in a well-organized way with minimum waste of time, effort, or energy.',
    'कार्यक्षम',
    'कमीत कमी वेळ आणि ऊर्जेचा अपव्यय न करता उत्तम काम करणारा.',
    'कार्यकुशल (दक्ष)',
    'कम समय और ऊर्जा में उत्तम एवं व्यवस्थित परिणाम देने वाला।',
    [['Effective', 'Productive', 'Capable'], ['प्रभावी', 'दक्ष', 'कुशल'], ['कुशल', 'प्रभावी', 'सक्षम']],
    [['Inefficient', 'Wasteful', 'Slow'], ['अकार्यक्षम', 'वेळ वाया घालवणारा'], ['अकुशल', 'अप्रभावी']],
    [
      'LED bulbs are much more energy-efficient than old filament bulbs.',
      'एलईडी बल्ब जुन्या दिव्यांपेक्षा ऊर्जेच्या बाबतीत अधिक कार्यक्षम असतात.',
      'एलईडी बल्ब पुराने बल्बों की तुलना में कहीं अधिक ऊर्जा-दक्ष होते हैं।'
    ]
  ],
  [
    'Effort',
    'EF-ert (एफर्ट)',
    'Noun',
    'Classes 1–3',
    'Values, Character & Emotions',
    'Vigorous or determined attempt; physical or mental exertion.',
    'प्रयत्न (परिश्रम)',
    'एखादे काम पूर्ण करण्यासाठी केलेले प्रामाणिक कष्ट आणि धडपड.',
    'प्रयास (परिश्रम)',
    'किसी लक्ष्य या कार्य को पूरा करने के लिए किया गया शारीरिक या मानसिक प्रयत्न।',
    [['Attempt', 'Endeavour', 'Hard work'], ['कष्ट', 'मेहनत', 'धडपड'], ['कोशिश', 'मेहनत', 'प्रयत्न']],
    [['Idleness', 'Neglect'], ['आळस', 'निष्क्रियता'], ['आलस्य', 'निष्क्रियता']],
    [
      'Consistent effort every day leads to extraordinary improvement.',
      'दररोज केलेले सातत्यपूर्ण प्रयत्न असाधारण प्रगतीकडे घेऊन जातात.',
      'प्रतिदिन किया गया निरंतर प्रयास असाधारण सुधार की ओर ले जाता है।'
    ]
  ],
  [
    'Electricity',
    'i-lek-TRIS-i-tee (इलेक्ट्रिसिटी)',
    'Noun',
    'Classes 4–6',
    'Science & Nature',
    'A form of energy resulting from the flow of charged particles such as electrons.',
    'विद्युत (वीज)',
    'इलेक्ट्रॉन्सच्या प्रवाहामुळे निर्माण होणारी ऊर्जा जी दिवे व यंत्रे चालवते.',
    'विद्युत (बिजली)',
    'आवेशित कणों के प्रवाह से उत्पन्न ऊर्जा का एक रूप।',
    [['Electric power', 'Current'], ['वीज', 'विद्युतशक्ती'], ['बिजली', 'विद्युत ऊर्जा']],
    [['Darkness', 'Powerlessness'], ['अंधार', 'ऊर्जाहीनता'], ['अंधकार', 'ऊर्जाहीनता']],
    [
      'We should switch off fans and lights when not in use to save electricity.',
      'विजेची बचत करण्यासाठी गरज नसताना पंखे आणि दिवे बंद ठेवले पाहिजेत.',
      'बिजली बचाने के लिए उपयोग में न होने पर हमें पंखे और बत्तियाँ बंद कर देनी चाहिए।'
    ]
  ],
  [
    'Encourage',
    'en-KUR-ij (एनकरेज)',
    'Verb',
    'Classes 4–6',
    'Values, Character & Emotions',
    'To give support, confidence, or hope to someone.',
    'प्रोत्साहन देणे',
    'एखाद्याला पुढे जाण्यासाठी किंवा चांगले काम करण्यासाठी धीर व प्रेरणा देणे.',
    'प्रोत्साहित करना',
    'किसी को आगे बढ़ने के लिए उत्साह, साहस या प्रेरणा देना।',
    [['Inspire', 'Motivate', 'Support'], ['प्रेरणा देणे', 'पाठींबा देणे'], ['प्रेरित करना', 'हौसला बढ़ाना']],
    [['Discourage', 'Deter'], ['नाउमेद करणे', 'निरुत्साहित करणे'], ['हतोत्साहित करना', 'रोकना']],
    [
      'Teachers always encourage students to ask questions in class.',
      'शिक्षक विद्यार्थ्यांना वर्गात प्रश्न विचारण्यासाठी नेहमी प्रोत्साहन देतात.',
      'शिक्षक हमेशा विद्यार्थियों को कक्षा में प्रश्न पूछने के लिए प्रोत्साहित करते हैं।'
    ]
  ],
  [
    'Environment',
    'en-VY-ruhn-muhnt (एन्व्हायर्नमेंट)',
    'Noun',
    'Classes 1–3',
    'Science & Nature',
    'The natural world and surroundings in which people, animals, and plants live.',
    'पर्यावरण',
    'आपल्या सभोवतालचा निसर्ग, हवा, पाणी, जमीन आणि सजीवांचे जग.',
    'पर्यावरण',
    'हमारे चारों ओर का प्राकृतिक परिवेश जिसमें जीव-जंतु, पेड़-पौधे और मनुष्य रहते हैं।',
    [['Nature', 'Surroundings', 'Habitat'], ['निसर्ग', 'सभोवताल', 'परिसर'], ['प्रकृति', 'परिवेश', 'वातावरण']],
    [['Pollution'], ['प्रदूषण'], ['प्रदूषण']],
    [
      'Planting trees and avoiding plastic helps keep our environment clean.',
      'झाडे लावल्याने आणि प्लास्टिक टाळल्याने आपले पर्यावरण स्वच्छ राहण्यास मदत होते.',
      'पेड़ लगाने और प्लास्टिक से बचने से हमारा पर्यावरण स्वच्छ रखने में मदद मिलती है।'
    ]
  ],
  [
    'Equality',
    'i-KWOL-i-tee (इक्वॉलिटी)',
    'Noun',
    'Classes 7–10',
    'History, Civics & Geography',
    'The state of being equal, especially in status, rights, and opportunities.',
    'समानता',
    'सर्वांना समान हक्क, आदर आणि संधी मिळण्याची स्थिती.',
    'समानता',
    'सभी व्यक्तियों को समान अधिकार, सम्मान और अवसर मिलने की स्थिति।',
    [['Fairness', 'Justice', 'Parity'], ['समता', 'न्याय'], ['समता', 'बराबरी', 'न्याय']],
    [['Inequality', 'Discrimination'], ['असमानता', 'भेदभाव'], ['असमानता', 'भेदभाव']],
    [
      'Equality before the law is a fundamental pillar of our Constitution.',
      'कायद्यासमोर समानता हा आपल्या संविधानाचा एक मूलभूत स्तंभ आहे.',
      'कानून के समक्ष समानता हमारे संविधान का एक मूलभूत स्तंभ है।'
    ]
  ],
  [
    'Equation',
    'i-KWAY-zhuhn (इक्वेशन)',
    'Noun',
    'Classes 7–10',
    'Mathematics & Logic',
    'A mathematical statement showing that two expressions are equal.',
    'समीकरण',
    'गणितातील दोन बाजू समान असल्याचे दर्शवणारे चिन्हांकित विधान.',
    'समीकरण',
    'गणित में दो व्यंजकों की समानता दर्शाने वाला कथन।',
    [['Formula', 'Expression'], ['सूत्र', 'राशी'], ['सूत्र', 'व्यंजक']],
    [['Inequality'], ['असमानता'], ['असमिका']],
    [
      'We solved a linear equation in one variable during our algebra class.',
      'आम्ही आमच्या बीजगणिताच्या तासाला एका चलातील रेषीय समीकरण सोडवले.',
      'हमने अपनी बीजगणित की कक्षा में एक चर वाला रैखिक समीकरण हल किया।'
    ]
  ],
  [
    'Evaporation',
    'i-vap-uh-RAY-shuhn (इव्हॅपोरेशन)',
    'Noun',
    'Classes 4–6',
    'Science & Nature',
    'The process of turning from liquid into vapour due to heat.',
    'बाष्पीभवन',
    'उष्णतेमुळे पाण्याचे किंवा द्रवाचे वाफेत रूपांतर होण्याची क्रिया.',
    'वाष्पीकरण',
    'गर्मी के कारण द्रव का वाष्प (भाप) में बदलने की प्रक्रिया।',
    [['Vaporization', 'Drying'], ['वाफ होणे'], ['भाप बनना']],
    [['Condensation'], ['संघनन (सांद्रण)'], ['संघनन']],
    [
      'Evaporation of seawater by the sun is the first step of the water cycle.',
      'सूर्याच्या उष्णतेमुळे समुद्राच्या पाण्याचे होणारे बाष्पीभवन ही जलचक्राची पहिली पायरी आहे.',
      'सूर्य की गर्मी से समुद्री जल का वाष्पीकरण जल-चक्र का पहला चरण है।'
    ]
  ],
  [
    'Excellence',
    'EK-suh-luhns (एक्सलन्स)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'The quality of being outstanding or extremely good at something.',
    'उत्कृष्टता (श्रेष्ठत्व)',
    'कोणत्याही कार्यात किंवा गुणवत्तेत सर्वोत्तम असण्याचा गुण.',
    'उत्कृष्टता (श्रेष्ठता)',
    'किसी कार्य या गुण में सर्वोत्तम और अत्यंत श्रेष्ठ होने की अवस्था।',
    [['Perfection', 'Distinction', 'Mastery'], ['सर्वोत्कृष्टता', 'प्रावीण्य'], ['श्रेष्ठता', 'निपुणता']],
    [['Mediocrity', 'Inferiority'], ['साधारणपणा', 'न्यूनता'], ['साधारणता', 'हीनता']],
    [
      'Excellence is achieved through continuous learning, practice, and humility.',
      'सततचे शिक्षण, सराव आणि नम्रतेतून उत्कृष्टता प्राप्त होते.',
      'निरंतर सीखने, अभ्यास और विनम्रता से उत्कृष्टता प्राप्त होती है।'
    ]
  ],
  [
    'Experiment',
    'ik-SPER-uh-muhnt (एक्सपेरिमेंट)',
    'Noun',
    'Classes 4–6',
    'Science & Nature',
    'A scientific procedure undertaken to make a discovery or test a hypothesis.',
    'प्रयोग',
    'वैज्ञानिक सत्य तपासण्यासाठी किंवा नवीन शोध लावण्यासाठी केलेली प्रत्यक्ष कृती.',
    'प्रयोग',
    'वैज्ञानिक सत्य की जाँच करने या खोज करने के लिए की जाने वाली प्रायोगिक क्रिया।',
    [['Test', 'Investigation', 'Trial'], ['चाचणी', 'परीक्षण'], ['परीक्षण', 'जाँच']],
    [['Theory', 'Assumption'], ['अंदाज'], ['अनुमान']],
    [
      'We performed an experiment in the science laboratory to test acids and bases.',
      'आम्ल आणि आम्लारी तपासण्यासाठी आम्ही विज्ञान प्रयोगशाळेत एक प्रयोग केला.',
      'हमने अम्ल और क्षार की जाँच के लिए विज्ञान प्रयोगशाला में एक प्रयोग किया।'
    ]
  ],

  // ================= F =================
  [
    'Faithful',
    'FAYTH-fuhl (फेथफुल)',
    'Adjective',
    'Classes 1–3',
    'Values, Character & Emotions',
    'Remaining loyal, true, and steadfast in affection or duty.',
    'प्रामाणिक (निष्ठावंत)',
    'नेहमी साथ देणारा आणि विश्वासाला पात्र असणारा; इमानदार.',
    'निष्ठावान (वफ़ादार)',
    'अपने कर्तव्य या मित्र के प्रति सच्चा और ईमानदार रहने वाला।',
    [['Loyal', 'True', 'Devoted'], ['इमानदार', 'एकनिष्ठ', 'विश्वासू'], ['ईमानदार', 'सच्चा', 'समर्पित']],
    [['Unfaithful', 'Disloyal'], ['अप्रामाणिक', 'विश्वासघातकी'], ['बेईमान', 'विश्वासघाती']],
    [
      'A dog is known as a faithful animal and a true friend to humans.',
      'कुत्रा हा एक प्रामाणिक प्राणी आणि मानवाचा खरा मित्र म्हणून ओळखला जातो.',
      'कुत्ता एक वफ़ादार प्राणी और मनुष्य के सच्चे मित्र के रूप में जाना जाता है।'
    ]
  ],
  [
    'Fertile',
    'FUR-tyl (फर्टाइल)',
    'Adjective',
    'Classes 4–6',
    'History, Civics & Geography',
    'Capable of producing abundant vegetation or crops.',
    'सुपीक',
    'ज्या जमिनीत पिके उत्तम आणि मुबलक प्रमाणात येतात अशी जमीन.',
    'उपजाऊ (उर्वर)',
    'वह भूमि जिसमें फसलें और पेड़-पौधे बहुत अच्छी तरह उगते हैं।',
    [['Productive', 'Rich', 'Fruitful'], ['कसदार', 'फलद्रूप'], ['उर्वर', 'फलदायक']],
    [['Barren', 'Infertile', 'Arid'], ['नापीक', 'ओसाड'], ['बंजर', 'अनुपजाऊ']],
    [
      'Alluvial soil found along river banks is very fertile for agriculture.',
      'नदीकाठी आढळणारी गाळाची मृदा शेतीसाठी अतिशय सुपीक असते.',
      'नदी के किनारों पर पाई जाने वाली जलोढ़ मिट्टी कृषि के लिए बहुत उपजाऊ होती है।'
    ]
  ],
  [
    'Forgive',
    'fer-GIV (फरगिव्ह)',
    'Verb',
    'Classes 1–3',
    'Values, Character & Emotions',
    'To stop feeling angry or resentful towards someone for a mistake.',
    'क्षमा करणे (माफ करणे)',
    'एखाद्याची चूक पोटात घालून राग सोडून देणे.',
    'क्षमा करना (माफ़ करना)',
    'किसी की गलती पर क्रोध त्याग कर उसे माफ़ कर देना।',
    [['Pardon', 'Excuse'], ['माफ करणे', 'सोडून देणे'], ['माफ़ करना', 'दोषमुक्त करना']],
    [['Blame', 'Punish', 'Resent'], ['शिक्षा करणे', 'राग धरणे'], ['दंड देना', 'दोष देना']],
    [
      'Strong and kind people know how to forgive mistakes and move forward.',
      'मनाने खंबीर आणि दयाळू लोक चुकांना क्षमा करून पुढे कसे जायचे हे जाणतात.',
      'मजबूत और दयालु लोग गलतियों को क्षमा करना और आगे बढ़ना जानते हैं।'
    ]
  ],
  [
    'Foundation',
    'fown-DAY-shuhn (फाउंडेशन)',
    'Noun',
    'Classes 4–6',
    'Academic & School',
    'The solid base or underlying principle on which something stands or is built.',
    'पाया',
    'कोणतीही इमारत किंवा ज्ञान ज्यावर उभे राहते तो मूळ आधार.',
    'नींव (आधार)',
    'वह मूल आधार जिस पर कोई भवन, ज्ञान या व्यक्तित्व खड़ा होता है।',
    [['Base', 'Groundwork', 'Bedrock'], ['मूळ आधार', 'तळ'], ['आधार', 'मूल', 'जड़']],
    [['Peak', 'Superstructure'], ['कळस', 'शिखर'], ['शिखर', 'चोटी']],
    [
      'Primary school education builds a strong foundation for higher studies.',
      'प्राथमिक शालेय शिक्षण हे उच्च शिक्षणाचा भक्कम पाया रचते.',
      'प्राथमिक विद्यालय की शिक्षा उच्च अध्ययन के लिए एक मजबूत नींव तैयार करती है।'
    ]
  ],
  [
    'Fraction',
    'FRAK-shuhn (फ्रॅक्शन)',
    'Noun',
    'Classes 4–6',
    'Mathematics & Logic',
    'A numerical quantity that represents a part of a whole, written with a numerator and denominator.',
    'अपूर्णांक',
    'पूर्ण वस्तूचा किंवा संख्येचा काही भाग दर्शवणारी अंश व छेद रूपातील संख्या.',
    'भिन्न',
    'किसी पूर्ण संख्या के एक भाग को अंश और हर के रूप में व्यक्त करने वाली संख्या।',
    [['Part', 'Portion', 'Ratio'], ['भाग', 'हिस्सा'], ['अंश', 'भाग', 'अनुपात']],
    [['Whole', 'Integer'], ['पूर्णांक', 'पूर्ण संख्या'], ['पूर्णांक', 'संपूर्ण']],
    [
      'In the fraction three-fourths (3/4), three is the numerator and four is the denominator.',
      'तीन छेद चार (3/4) या अपूर्णांकात तीन हा अंश आणि चार हा छेद आहे.',
      'तीन बटा चार (3/4) भिन्न में तीन अंश है और चार हर है।'
    ]
  ],
  [
    'Freedom',
    'FREE-duhm (फ्रीडम)',
    'Noun',
    'Classes 4–6',
    'History, Civics & Geography',
    'The power or right to act, speak, or think independently without foreign rule or bondage.',
    'स्वातंत्र्य',
    'कोणत्याही पारतंत्र्याशिवाय विचार करण्याचा, बोलण्याचा आणि जगण्याचा अधिकार.',
    'स्वतंत्रता (आज़ादी)',
    'बिना किसी पराधीनता के स्वतंत्र रूप से जीने, विचार करने और कार्य करने का अधिकार।',
    [['Independence', 'Liberty', 'Autonomy'], ['मुक्ती', 'स्वराज्य'], ['आज़ादी', 'स्वाधीनता']],
    [['Slavery', 'Captivity', 'Bondage'], ['पारतंत्र्य', 'गुलामगिरी'], ['पराधीनता', 'गुलामी']],
    [
      'Countless freedom fighters sacrificed their lives for India’s independence.',
      'भारताच्या स्वातंत्र्यासाठी असंख्य स्वातंत्र्यसैनिकांनी आपल्या प्राणांचे बलिदान दिले.',
      'भारत की स्वतंत्रता के लिए अनगिनत स्वतंत्रता सेनानियों ने अपने प्राणों का बलिदान दिया।'
    ]
  ],

  // ================= G =================
  [
    'Generous',
    'JEN-er-uhs (जेनरस)',
    'Adjective',
    'Classes 4–6',
    'Values, Character & Emotions',
    'Showing a readiness to give more of something, such as help or kindness, than is strictly necessary.',
    'उदार (दानशूर)',
    'इतरांना मदत करण्यासाठी नेहमी मोठ्या मनाने पुढे येणारा.',
    'उदार (दानशील)',
    'दूसरों की सहायता करने के लिए खुले दिल से देने वाला।',
    [['Kind', 'Charitable', 'Magnanimous'], ['मोकळ्या मनाचा', 'परोपकारी'], ['दयालु', 'परोपकारी', 'दानी']],
    [['Selfish', 'Greedy', 'Stingy'], ['स्वार्थी', 'कंजूस'], ['स्वार्थी', 'कंजूस', 'लोभी']],
    [
      'A generous person shares knowledge and helps classmates in need.',
      'उदार व्यक्ती आपले ज्ञान इतरांना वाटते आणि गरजू वर्गमित्रांना मदत करते.',
      'एक उदार व्यक्ति अपना ज्ञान साझा करता है और जरूरतमंद सहपाठियों की मदद करता है।'
    ]
  ],
  [
    'Geometry',
    'jee-OM-i-tree (जॉमेट्री)',
    'Noun',
    'Classes 4–6',
    'Mathematics & Logic',
    'The branch of mathematics concerned with points, lines, angles, surfaces, and shapes.',
    'भूमिती',
    'बिंदू, रेषा, कोन, त्रिकोण आणि विविध आकारांचा अभ्यास करणारी गणिताची शाखा.',
    'ज्यामिति (रेखागणित)',
    'गणित की वह शाखा जिसमें बिंदु, रेखा, कोण और आकृतियों का अध्ययन किया जाता है।',
    [['Shape mathematics', 'Mensuration'], ['रचनाशास्त्र', 'रेखागणित'], ['रेखागणित', 'क्षेत्रमिति']],
    [['Arithmetic'], ['अंकगणित'], ['अंकगणित']],
    [
      'We use a compass and protractor to construct angles in geometry.',
      'भूमितीमध्ये कोन काढण्यासाठी आपण कंपास आणि कोनमापकाचा वापर करतो.',
      'ज्यामिति में कोण बनाने के लिए हम परकार और चाँदे का उपयोग करते हैं।'
    ]
  ],
  [
    'Gratitude',
    'GRAT-i-tood (ग्रॅटिट्यूड)',
    'Noun',
    'Classes 4–6',
    'Values, Character & Emotions',
    'The quality of being thankful; readiness to show appreciation for and to return kindness.',
    'कृतज्ञता',
    'आपल्याला केलेल्या मदतीची आणि उपकारांची जाणीव ठेवण्याची भावना.',
    'कृतज्ञता (आभार)',
    'किसी के उपकार या सहायता के प्रति धन्यवाद और सम्मान प्रकट करने का भाव।',
    [['Thankfulness', 'Appreciation'], ['आभार', 'उपकाराची जाणीव'], ['आभार', 'धन्यवाद', 'एहसानमंदी']],
    [['Ingratitude', 'Unthankfulness'], ['कृतघ्नता'], ['कृतघ्नता', 'अकृतज्ञता']],
    [
      'We must always express gratitude towards our parents and teachers.',
      'आपण आपल्या पालकांप्रती आणि शिक्षकांप्रती नेहमी कृतज्ञता व्यक्त केली पाहिजे.',
      'हमें अपने माता-पिता और शिक्षकों के प्रति सदैव कृतज्ञता व्यक्त करनी चाहिए।'
    ]
  ],
  [
    'Gravity',
    'GRAV-i-tee (ग्रॅव्हिटी)',
    'Noun',
    'Classes 4–6',
    'Science & Nature',
    'The natural force that attracts objects towards the centre of the Earth.',
    'गुरुत्वाकर्षण',
    'पृथ्वीने सर्व वस्तूंना स्वतःच्या केंद्राकडे खेचून घेण्याची नैसर्गिक शक्ती.',
    'गुरुत्वाकर्षण',
    'पृथ्वी द्वारा वस्तुओं को अपने केंद्र की ओर खींचने का प्राकृतिक बल।',
    [['Gravitation', 'Attraction force'], ['गुरुत्व बल', 'आकर्षण शक्ती'], ['गुरुत्व बल', 'आकर्षण शक्ति']],
    [['Weightlessness'], ['वजनरहित स्थिती'], ['भारहीनता']],
    [
      'Fruits fall down from trees to the ground because of Earth’s gravity.',
      'पृथ्वीच्या गुरुत्वाकर्षणामुळे झाडाची फळे खाली जमिनीवर पडतात.',
      'पृथ्वी के गुरुत्वाकर्षण के कारण पेड़ों से फल नीचे ज़मीन पर गिरते हैं।'
    ]
  ],
  [
    'Guidance',
    'GY-duhns (गायडन्स)',
    'Noun',
    'Classes 4–6',
    'Academic & School',
    'Advice or information aimed at resolving a problem or showing the right direction.',
    'मार्गदर्शन',
    'योग्य दिशा दाखवण्यासाठी दिलेला अनुभवी सल्ला किंवा शिकवण.',
    'मार्गदर्शन',
    'सही दिशा दिखाने या समस्या हल करने के लिए दी गई सलाह और दिशा-निर्देश।',
    [['Advice', 'Direction', 'Counsel'], ['सल्ला', 'दिशादर्शन', 'उपदेश'], ['सलाह', 'दिशा-निर्देश', 'परामर्श']],
    [['Misguidance', 'Confusion'], ['दिशाभूल'], ['भटकाव', 'भ्रम']],
    [
      'Under the proper guidance of teachers, students can excel in every field.',
      'शिक्षकांच्या योग्य मार्गदर्शनाखाली विद्यार्थी प्रत्येक क्षेत्रात यश मिळवू शकतात.',
      'शिक्षकों के उचित मार्गदर्शन में विद्यार्थी प्रत्येक क्षेत्र में उत्कृष्ट प्रदर्शन कर सकते हैं।'
    ]
  ],

  // ================= H =================
  [
    'Habitat',
    'HAB-i-tat (हॅबिटॅट)',
    'Noun',
    'Classes 4–6',
    'Science & Nature',
    'The natural home or environment of an animal, plant, or other organism.',
    'أधिवास (नैसर्गिक निवासस्थान)',
    'प्राणी किंवा वनस्पती ज्या नैसर्गिक परिसरात राहतात व वाढतात ते ठिकाण.',
    'आवास (प्राकृतिक वास)',
    'वह प्राकृतिक स्थान या पर्यावरण जहाँ कोई जीव-जंतु या पौधा रहता है।',
    [['Natural home', 'Environment'], ['निवासस्थान', 'नैसर्गिक घर'], ['निवास-स्थान', 'परिवेश']],
    [['Unnatural cage'], ['पिंजरा'], ['कृत्रिम स्थान']],
    [
      'Forests are the natural habitat of tigers, elephants, and countless birds.',
      'जंगले हा वाघ, हत्ती आणि असंख्य पक्षांचा नैसर्गिक अधिवास आहे.',
      'जंगल बाघ, हाथी और अनगिनत पक्षियों का प्राकृतिक आवास हैं।'
    ]
  ],
  [
    'Harmony',
    'HAR-muh-nee (हार्मनी)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'A state of peaceful agreement, mutual respect, and friendly togetherness.',
    'सलोखा (सुसंवाद)',
    'परस्परांमध्ये प्रेम, शांतता आणि एकजूट असण्याची स्थिती.',
    'सामंजस्य (सद्भाव)',
    'आपसी प्रेम, शांति और मेल-जोल के साथ रहने की स्थिति।',
    [['Peace', 'Unity', 'Accord'], ['एकता', 'शांतता', 'मेळ'], ['सद्भाव', 'एकता', 'मेल-जोल']],
    [['Conflict', 'Discord', 'Quarrel'], ['वाद', 'भांडण', 'विसंवाद'], ['विवाद', 'कलह', 'असहमति']],
    [
      'People of various festivals and languages live together in harmony in India.',
      'भारतात विविध सण आणि भाषा बोलणारे लोक आनंदाने व सलोख्याने एकत्र राहतात.',
      'भारत में विभिन्न त्योहारों और भाषाओं के लोग आपसी सद्भाव के साथ मिलकर रहते हैं।'
    ]
  ],
  [
    'Heritage',
    'HER-i-tij (हेरिटेज)',
    'Noun',
    'Classes 7–10',
    'History, Civics & Geography',
    'Valuable traditions, monuments, and culture passed down from previous generations.',
    'वारसा',
    'पूर्वजांकडून पुढील पिढीला मिळालेली संस्कृती, गड-किल्ले आणि परंपरा.',
    'विरासत (धरोहर)',
    'पूर्वजों से प्राप्त मूल्यवान संस्कृति, ऐतिहासिक स्मारक और परंपराएँ।',
    [['Legacy', 'Tradition', 'Inheritance'], ['संस्कृती', 'ठेवा', 'परंपरा'], ['धरोहर', 'परंपरा', 'दाय']],
    [['Forgetting'], ['विस्मरण'], ['विस्मरण']],
    [
      'The forts of Maharashtra are a proud part of our historical heritage.',
      'महाराष्ट्रातील गड-किल्ले हा आपल्या ऐतिहासिक वारशाचा अभिमानास्पद भाग आहे.',
      'महाराष्ट्र के किले हमारी ऐतिहासिक विरासत का गौरवशाली हिस्सा हैं।'
    ]
  ],
  [
    'Honest',
    'ON-ist (ऑनेस्ट)',
    'Adjective',
    'Classes 1–3',
    'Values, Character & Emotions',
    'Free of deceit and untruthfulness; sincere and truthful.',
    'प्रामाणिक',
    'कधीही खोटे न बोलणारा आणि फसवणूक न करणारा; सत्यवादी.',
    'ईमानदार',
    'सदैव सच बोलने वाला और छल-कपट से दूर रहने वाला।',
    [['Truthful', 'Sincere', 'Upright'], ['खरा', 'सत्यवादी', 'निष्कपट'], ['सच्चा', 'निष्कपट', 'खरा']],
    [['Dishonest', 'Deceitful', 'False'], ['अप्रामाणिक', 'खोटा'], ['बेईमान', 'कपटी', 'झूठा']],
    [
      'An honest student is respected by teachers and friends alike.',
      'प्रामाणिक विद्यार्थ्याचा शिक्षक आणि मित्र सर्वजण आदर करतात.',
      'एक ईमानदार विद्यार्थी का शिक्षक और मित्र सभी सम्मान करते हैं।'
    ]
  ],
  [
    'Humility',
    'hyoo-MIL-i-tee (ह्युमिलिटी)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'A modest view of one’s own importance; freedom from pride or arrogance.',
    'नम्रता (विनयशीलता)',
    'यश किंवा ज्ञान मिळूनही अहंकार न बाळगता नम्र राहण्याचा गुण.',
    'विनम्रता',
    'ज्ञान या सफलता मिलने पर भी अहंकार से मुक्त और सरल रहने का गुण।',
    [['Modesty', 'Meekness', 'Politeness'], ['विनय', 'सौजन्य', 'साधेपणा'], ['नम्रता', 'सादगी', 'शालीनता']],
    [['Arrogance', 'Pride', 'Vanity'], ['अहंकार', 'गर्व', 'उद्धटपणा'], ['अहंकार', 'घमंड', 'अभिमान']],
    [
      'True knowledge brings humility, just as a fruit-laden branch bends low.',
      'फळांनी लगडलेली फांदी जशी खाली वाकते, तसेच खरे ज्ञान माणसाला नम्रता देते.',
      'जिस प्रकार फलों से लदी डाल झुक जाती है, उसी प्रकार सच्चा ज्ञान विनम्रता लाता है।'
    ]
  ],

  // ================= I =================
  [
    'Illuminate',
    'i-LOO-muh-nayt (इल्युमिनेट)',
    'Verb',
    'Classes 7–10',
    'Science & Nature',
    'To light up a place or to make a subject clear and easy to understand.',
    'प्रकाशित करणे (उजळून टाकणे)',
    'उजेड पसरवणे किंवा एखादा कठीण विषय स्पष्ट करून सांगणे.',
    'प्रकाशित करना (आलोकित करना)',
    'रोशनी फैलाना या किसी विषय को स्पष्ट रूप से समझाना।',
    [['Light up', 'Brighten', 'Clarify'], ['उजळणे', 'स्पष्ट करणे'], ['उजाला करना', 'स्पष्ट करना']],
    [['Darken', 'Obscure'], ['अंधार करणे', 'अस्पष्ट ठेवणे'], ['अंधकारमय करना', 'धुँधला करना']],
    [
      'Books illuminate our minds with wisdom and new ideas.',
      'पुस्तके आपले मन शहाणपण आणि नवीन विचारांनी प्रकाशित करतात.',
      'पुस्तकें हमारे मस्तिष्क को ज्ञान और नए विचारों से प्रकाशित करती हैं।'
    ]
  ],
  [
    'Imagination',
    'i-maj-uh-NAY-shuhn (इमॅजिनेशन)',
    'Noun',
    'Classes 4–6',
    'Academic & School',
    'The ability of the mind to be creative and form new ideas or images.',
    'कल्पनाशक्ती',
    'मनात नवीन विचार, चित्र किंवा संकल्पना तयार करण्याची सर्जनशील क्षमता.',
    'कल्पनाशक्ति',
    'मन में नए विचार, चित्र और सृजनात्मक संकल्पनाएँ बनाने की क्षमता।',
    [['Creativity', 'Vision', 'Invention'], ['सर्जनशीलता', 'कल्पकता'], ['सृजनशीलता', 'कल्पना']],
    [['Literalness', 'Stagnation'], ['कल्पनाशून्यता'], ['कल्पनाहीनता']],
    [
      'Drawing and story writing develop a child’s imagination.',
      'चित्रकला आणि कथा लेखनामुळे मुलांची कल्पनाशक्ती विकसित होते.',
      'चित्रकला और कहानी लेखन से बच्चों की कल्पनाशक्ति का विकास होता है।'
    ]
  ],
  [
    'Improve',
    'im-PROOV (इम्प्रूव्ह)',
    'Verb',
    'Classes 1–3',
    'Academic & School',
    'To make or become better in quality, skill, or performance.',
    'सुधारणा करणे (प्रगती करणे)',
    'आधीपेक्षा अधिक चांगले होणे किंवा आपल्या कामात सुधारणा करणे.',
    'सुधार करना (बेहतर बनाना)',
    'अपनी योग्यता, कार्य या प्रदर्शन को पहले से अधिक अच्छा बनाना।',
    [['Enhance', 'Upgrade', 'Better'], ['प्रगती करणे', 'उंचावणे'], ['निखारना', 'उन्नति करना']],
    [['Worsen', 'Deteriorate'], ['खालावणे', 'बिघडणे'], ['बिगाड़ना', 'गिरना']],
    [
      'Reading aloud every day helps improve pronunciation and fluency.',
      'दररोज मोठ्याने वाचन केल्याने उच्चार आणि अस्खलितपणा सुधारण्यास मदत होते.',
      'प्रतिदिन सस्वर पठन करने से उच्चारण और प्रवाह में सुधार होता है।'
    ]
  ],
  [
    'Inspire',
    'in-SPIRE (इन्स्पायर)',
    'Verb',
    'Classes 4–6',
    'Values, Character & Emotions',
    'To fill someone with the urge or ability to do something noble and creative.',
    'प्रेरणा देणे',
    'एखाद्याच्या मनात चांगले व मोठे कार्य करण्याची इच्छा जागृत करणे.',
    'प्रेरित करना',
    'किसी के मन में श्रेष्ठ कार्य करने का उत्साह और संकल्प जगाना।',
    [['Motivate', 'Encourage', 'Uplift'], ['प्रोत्साहित करणे', 'स्फूर्ती देणे'], ['उत्साहित करना', 'प्रोत्साहित करना']],
    [['Discourage', 'Depress'], ['निरुत्साहित करणे'], ['हतोत्साहित करना']],
    [
      'The life of Dr. A. P. J. Abdul Kalam continues to inspire millions of students.',
      'डॉ. ए. पी. जे. अब्दुल कलाम यांचे जीवन लाखो विद्यार्थ्यांना सतत प्रेरणा देत राहते.',
      'डॉ. ए. पी. जे. अब्दुल कलाम का जीवन लाखों विद्यार्थियों को निरंतर प्रेरित करता है।'
    ]
  ],
  [
    'Integrity',
    'in-TEG-ri-tee (इंटेग्रिटी)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'The quality of being honest and having strong moral principles; unity.',
    'सच्चोटी (एकात्मता)',
    'कोणत्याही परिस्थितीत नैतिक मूल्ये आणि प्रामाणिकपणा न सोडण्याचा गुण; अखंडता.',
    'सत्यनिष्ठा (अखंडता)',
    'हर परिस्थिति में ईमानदारी और नैतिक सिद्धांतों पर अडिग रहने का गुण।',
    [['Honesty', 'Rectitude', 'Unity'], ['प्रामाणिकपणा', 'नैतिकता', 'अखंडता'], ['ईमानदारी', 'नैतिकता', 'एकता']],
    [['Corruption', 'Dishonesty'], ['भ्रष्टाचार', 'अप्रामाणिकपणा'], ['बेईमानी', 'भ्रष्टाचार']],
    [
      'A person of integrity stays truthful even when no one is watching.',
      'सच्चोटी असलेली व्यक्ती कोणीही पाहत नसतानाही सत्याच्या मार्गावर कायम राहते.',
      'सत्यनिष्ठा वाला व्यक्ति तब भी सच्चा रहता है जब कोई उसे देख न रहा हो।'
    ]
  ],
  [
    'Invention',
    'in-VEN-shuhn (इन्व्हेंशन)',
    'Noun',
    'Classes 4–6',
    'Science & Nature',
    'A new device, method, or process created through study and experimentation.',
    'नवनिर्मिती (शोध)',
    'पूर्वी अस्तित्वात नसलेले नवीन यंत्र किंवा तंत्रज्ञान तयार करणे.',
    'आविष्कार',
    'अध्ययन और प्रयोग द्वारा किसी नई मशीन या तकनीक का निर्माण।',
    [['Creation', 'Innovation'], ['निर्मिती', 'नाविन्यपूर्ण शोध'], ['नवाचार', 'रचना']],
    [['Imitation'], ['अनुकरण'], ['नकल']],
    [
      'The invention of the printing press revolutionized education around the world.',
      'छपाई यंत्राच्या शोधामुळे जगभरातील शिक्षण क्षेत्रात क्रांती झाली.',
      'मुद्रण यंत्र के आविष्कार ने दुनिया भर में शिक्षा के क्षेत्र में क्रांति ला दी।'
    ]
  ],

  // ================= J =================
  [
    'Journey',
    'JUR-nee (जर्नी)',
    'Noun',
    'Classes 1–3',
    'Daily Life & Communication',
    'An act of travelling from one place to another, or a long process of growth.',
    'प्रवास',
    'एका ठिकाणाहून दुसऱ्या ठिकाणी जाण्याची क्रिया किंवा जीवन-शिकण्याचा प्रवास.',
    'यात्रा (सफ़र)',
    'एक स्थान से दूसरे स्थान तक जाने की क्रिया या विकास की प्रक्रिया।',
    [['Trip', 'Voyage', 'Expedition'], ['सफर', 'यात्रा'], ['सफ़र', 'भ्रमण']],
    [['Halt', 'Stay'], ['थांबा', 'मुक्काम'], ['ठहराव', 'विराम']],
    [
      'Learning is a lifelong journey that begins with curiosity.',
      'शिकणे हा एक जीवनभर चालणारा प्रवास आहे ज्याची सुरुवात जिज्ञासेतून होते.',
      'सीखना एक जीवनपर्यंत चलने वाली यात्रा है जो जिज्ञासा से शुरू होती है।'
    ]
  ],
  [
    'Justice',
    'JUS-tis (जस्टिस)',
    'Noun',
    'Classes 7–10',
    'History, Civics & Geography',
    'Fair behaviour or treatment; the upholding of what is right and lawful.',
    'न्याय',
    'कोणताही पक्षपात न करता सत्याच्या व कायद्याच्या बाजूने दिलेला योग्य निवाडा.',
    'न्याय',
    'बिना किसी भेदभाव के सत्य और धर्म के अनुसार किया गया निष्पक्ष व्यवहार।',
    [['Fairness', 'Equity', 'Righteousness'], ['निष्पक्षता', 'समता', 'नीती'], ['निष्पक्षता', 'इंसाफ़']],
    [['Injustice', 'Bias', 'Unfairness'], ['अन्याय', 'पक्षपात'], ['अन्याय', 'पक्षपात']],
    [
      'The Preamble of the Indian Constitution secures social, economic, and political justice.',
      'भारतीय संविधानाची उद्देशिका सामाजिक, आर्थिक आणि राजकीय न्यायाची हमी देते.',
      'भारतीय संविधान की प्रस्तावना सामाजिक, आर्थिक और राजनीतिक न्याय सुनिश्चित करती है।'
    ]
  ],

  // ================= K =================
  [
    'Kindness',
    'KYND-nis (काइंडनेस)',
    'Noun',
    'Classes 1–3',
    'Values, Character & Emotions',
    'The quality of being friendly, generous, and considerate towards others.',
    'दयाळूपणा (मायाळूपणा)',
    'इतरांशी प्रेमाने, आपुलकीने आणि मदतीच्या भावनेने वागण्याचा गुण.',
    'दयालुता',
    'दूसरों के प्रति स्नेह, सहानुभूति और भलाई करने का स्वभाव।',
    [['Compassion', 'Goodness', 'Gentleness'], ['माया', 'करुणा', 'सौजन्य'], ['करुणा', 'भलाई', 'सौम्यता']],
    [['Cruelty', 'Harshness', 'Meanness'], ['क्रूरता', 'कठोरपणा'], ['क्रूरता', 'कठोरता']],
    [
      'A small act of kindness can bring a big smile to someone’s face.',
      'दयाळूपणाची एक छोटीशी कृती कोणाच्या तरी चेहऱ्यावर मोठा आनंद आणू शकते.',
      'दयालुता का एक छोटा-सा कार्य किसी के चेहरे पर बड़ी मुस्कान ला सकता है।'
    ]
  ],
  [
    'Knowledge',
    'NOL-ij (नॉलेज)',
    'Noun',
    'Classes 1–3',
    'Academic & School',
    'Facts, information, and skills acquired through experience or education.',
    'ज्ञान',
    'अभ्यास, वाचन आणि अनुभवातून मिळालेली माहिती व समज.',
    'ज्ञान',
    'अध्ययन, अनुभव और शिक्षा से प्राप्त सत्य जानकारी तथा समझ।',
    [['Wisdom', 'Learning', 'Understanding'], ['विद्या', 'जाणीव', 'शहाणपण'], ['विद्या', 'समझ', 'बोध']],
    [['Ignorance', 'Unawareness'], ['अज्ञान'], ['अज्ञान', 'अभिज्ञता']],
    [
      'Knowledge increases when we share it with others.',
      'ज्ञान इतरांना वाटल्याने ते कमी न होता अधिक वाढते.',
      'ज्ञान दूसरों के साथ बाँटने से बढ़ता है।'
    ]
  ],

  // ================= L =================
  [
    'Laboratory',
    'LAB-ruh-tor-ee (लॅबोरेटरी)',
    'Noun',
    'Classes 4–6',
    'Science & Nature',
    'A room or building equipped for scientific experiments and research.',
    'प्रयोगशाळा',
    'विज्ञानाचे प्रयोग आणि संशोधन करण्यासाठी उपकरणांनी सुसज्ज असलेली खोली.',
    'प्रयोगशाला',
    'वैज्ञानिक प्रयोग और अनुसंधान करने के लिए उपकरणों से युक्त कक्ष।',
    [['Science lab', 'Research centre'], ['विज्ञान कक्ष', 'संशोधन केंद्र'], ['विज्ञान कक्ष', 'अनुसंधान केंद्र']],
    [['Playground'], ['खेळाचे मैदान'], ['खेल का मैदान']],
    [
      'Students observed plant cells under a microscope in the biology laboratory.',
      'विद्यार्थ्यांनी जीवशास्त्र प्रयोगशाळेत सूक्ष्मदर्शकाखाली वनस्पती पेशींचे निरीक्षण केले.',
      'विद्यार्थियों ने जीवविज्ञान प्रयोगशाला में सूक्ष्मदर्शी से पादप कोशिकाओं का अवलोकन किया।'
    ]
  ],
  [
    'Leadership',
    'LEE-der-ship (लीडरशिप)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'The ability to guide, inspire, and lead a group of people towards a common goal.',
    'नेतृत्व',
    'संपूर्ण संघाला एकत्र घेऊन योग्य दिशा दाखवण्याचे आणि प्रेरित करण्याचे कौशल्य.',
    'नेतृत्व',
    'किसी समूह या समाज को सही दिशा दिखाने और लक्ष्य तक पहुँचाने की क्षमता।',
    [['Guidance', 'Direction', 'Stewardship'], ['पुढाकार', 'मार्गदर्शन'], ['मार्गदर्शन', 'अगुवाई']],
    [['Submission', 'Mismanagement'], ['गैरव्यवस्थापन'], ['कुप्रबंधन']],
    [
      'True leadership means taking responsibility and helping every team member succeed.',
      'खरे नेतृत्व म्हणजे जबाबदारी स्वीकारणे आणि संघातील प्रत्येक सदस्याला यशस्वी होण्यास मदत करणे.',
      'सच्चा नेतृत्व जिम्मेदारी लेने और टीम के प्रत्येक सदस्य को सफल बनाने में मदद करने का नाम है।'
    ]
  ],
  [
    'Liberty',
    'LIB-er-tee (लिबर्टी)',
    'Noun',
    'Classes 7–10',
    'History, Civics & Geography',
    'The state of being free within society from oppressive restrictions on thought and action.',
    'स्वातंत्र्य',
    'समाजात सन्मानाने विचार करण्याचे, अभिव्यक्तीचे आणि प्रगती करण्याचे स्वातंत्र्य.',
    'स्वतंत्रता (स्वाधीनता)',
    'समाज में विचार, अभिव्यक्ति और विश्वास की गरिमापूर्ण स्वतंत्रता।',
    [['Freedom', 'Independence'], ['मोकळीक', 'मुक्तता'], ['आज़ादी', 'मुक्ति']],
    [['Bondage', 'Oppression'], ['बंधने', 'दडपशाही'], ['परतंत्रता', 'दमन']],
    [
      'Liberty of thought and expression is essential for human progress.',
      'मानवी प्रगतीसाठी विचार आणि अभिव्यक्तीचे स्वातंत्र्य अत्यंत आवश्यक आहे.',
      'मानव प्रगति के लिए विचार और अभिव्यक्ति की स्वतंत्रता अत्यंत आवश्यक है।'
    ]
  ],
  [
    'Literature',
    'LIT-er-uh-cher (लिटरेचर)',
    'Noun',
    'Classes 7–10',
    'Academic & School',
    'Written works such as poetry, stories, plays, and essays of lasting artistic merit.',
    'साहित्य (वाङ्मय)',
    'कथा, कविता, कादंबरी, नाटक आणि वैचारिक लेखन यांचा समृद्ध ठेवा.',
    'साहित्य',
    'कविता, कहानी, नाटक और निबंध जैसी उत्कृष्ट लिखित रचनाओं का संग्रह।',
    [['Letters', 'Poetry and prose'], ['वाङ्मय', 'ग्रंथसंपदा'], ['वाङ्मय', 'काव्य एवं गद्य']],
    [['Illiteracy'], ['निरक्षरता'], ['निरक्षरता']],
    [
      'Marathi, Hindi, and English literature teach us deep human values.',
      'मराठी, हिंदी आणि इंग्रजी साहित्य आपल्याला सखोल मानवी मूल्ये शिकवते.',
      'मराठी, हिंदी और अंग्रेज़ी साहित्य हमें गहरे मानवीय मूल्य सिखाता है।'
    ]
  ],
  [
    'Loyal',
    'LOY-uhl (लॉयल)',
    'Adjective',
    'Classes 4–6',
    'Values, Character & Emotions',
    'Giving or showing firm and constant support to a person, principle, or country.',
    'निष्ठावंत (एकनिष्ठ)',
    'आपला देश, कर्तव्य किंवा मित्राशी सदैव प्रामाणिक राहणारा.',
    'निष्ठावान (वफ़ादार)',
    'अपने देश, कर्तव्य या मित्र के प्रति सदैव अडिग और समर्पित रहने वाला।',
    [['Faithful', 'Devoted', 'Steadfast'], ['प्रामाणिक', 'इमानदार'], ['समर्पित', 'ईमानदार', 'सच्चा']],
    [['Disloyal', 'Treacherous'], ['विश्वासघातकी', 'फितूर'], ['विश्वासघाती', 'गद्दार']],
    [
      'Tanaji Malusare was a brave and loyal commander of Swarajya.',
      'तानाजी मालुसरे हे स्वराज्याचे शूर आणि निष्ठावंत सेनानी होते.',
      'तानाजी मालुसरे स्वराज्य के वीर और निष्ठावान सेनापति थे।'
    ]
  ],

  // ================= M =================
  [
    'Magnificent',
    'mag-NIF-i-suhnt (मॅग्निफिसंट)',
    'Adjective',
    'Classes 7–10',
    'Daily Life & Communication',
    'Extremely beautiful, grand, or impressive.',
    'भव्य (अप्रतिम)',
    'पाहताक्षणी भुरळ पाडणारा; अतिशय सुंदर आणि विशाल.',
    'भव्य (शानदार)',
    'अत्यंत सुंदर, विशाल और प्रभावशाली।',
    [['Splendid', 'Grand', 'Majestic'], ['शानदार', 'दिमाखदार', 'आलीशान'], ['शानदार', 'आलीशान', 'विशाल']],
    [['Ordinary', 'Modest', 'Plain'], ['साधारण', 'सामान्य'], ['साधारण', 'सामान्य']],
    [
      'Raigad Fort offers a magnificent view of the Sahyadri mountain ranges.',
      'रायगड किल्ल्यावरून सह्याद्रीच्या पर्वतरांगांचे भव्य दृश्य दिसते.',
      'रायगढ़ किले से सह्याद्रि पर्वत श्रृंखलाओं का भव्य दृश्य दिखाई देता है।'
    ]
  ],
  [
    'Magnitude',
    'MAG-ni-tood (मॅग्निट्यूड)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'The great size, extent, or numerical value of a physical quantity.',
    'परिमाण (तीव्रता / आकारमान)',
    'भौतिक राशीचे संख्यात्मक मूल्य किंवा एखाद्या घटनेची विशालता.',
    'परिमाण (तीव्रता)',
    'किसी भौतिक राशि का संख्यात्मक मान या किसी घटना का विशाल आकार।',
    [['Size', 'Extent', 'Scale'], ['प्रमाण', 'व्याप्ती', 'तीव्रता'], ['मात्रा', 'विस्तार', 'आकार']],
    [['Insignificance', 'Smallness'], ['नगण्यता', 'सूक्ष्मता'], ['सूक्ष्मता', 'तुच्छता']],
    [
      'The Richter scale measures the magnitude of an earthquake.',
      'रिस्टर स्केलवर भूकंपाची तीव्रता (परिमाण) मोजली जाते.',
      'रिक्टर पैमाने पर भूकंप का परिमाण (तीव्रता) मापा जाता है।'
    ]
  ],
  [
    'Measure',
    'MEZH-er (मेझर)',
    'Verb',
    'Classes 1–3',
    'Mathematics & Logic',
    'To find the exact size, weight, length, or amount of something using standard units.',
    'मोजणे',
    'प्रमाणित एककांचा वापर करून लांबी, वजन किंवा प्रमाण ठरवणे.',
    'मापना (तौलना)',
    'मानक इकाइयों का उपयोग करके किसी वस्तु की लंबाई, भार या मात्रा ज्ञात करना।',
    [['Quantify', 'Gauge', 'Weigh'], ['माप घेणे', 'तपासणे'], ['नापना', 'आकलन करना']],
    [['Guess', 'Estimate'], ['अंदाज करणे'], ['अंदाज़ा लगाना']],
    [
      'We use a thermometer to measure body temperature.',
      'शरीराचे तापमान मोजण्यासाठी आपण तापमापकाचा (थर्मामीटरचा) वापर करतो.',
      'शरीर का तापमान मापने के लिए हम थर्मामीटर का उपयोग करते हैं।'
    ]
  ],
  [
    'Meditation',
    'med-i-TAY-shuhn (मेडिटेशन)',
    'Noun',
    'Classes 4–6',
    'Values, Character & Emotions',
    'The practice of focusing the mind in silence for mental peace and concentration.',
    'ध्यान (चिंतन)',
    'मनाची एकाग्रता आणि शांततेसाठी शांत बसून केलेले चिंतन.',
    'ध्यान (चिंतन)',
    'मानसिक शांति और एकाग्रता के लिए शांत बैठकर मन को केंद्रित करने का अभ्यास।',
    [['Contemplation', 'Mindfulness'], ['एकाग्रता', 'मनन'], ['एकाग्रता', 'साधना', 'मनन']],
    [['Distraction', 'Restlessness'], ['अस्वस्थता', 'चंचलता'], ['चंचलता', 'व्याकुलता']],
    [
      'Ten minutes of daily meditation improves memory and reduces exam stress.',
      'दररोज दहा मिनिटे ध्यान केल्याने स्मरणशक्ती वाढते आणि परीक्षेचा ताण कमी होतो.',
      'प्रतिदिन दस मिनट का ध्यान स्मरण-शक्ति बढ़ाता है और परीक्षा का तनाव कम करता है।'
    ]
  ],
  [
    'Meticulous',
    'muh-TIK-yuh-luhs (मेटिक्युलस)',
    'Adjective',
    'Classes 7–10',
    'Academic & School',
    'Showing great attention to detail; very careful and precise.',
    'काटेकोर (सूक्ष्म लक्ष देणारा)',
    'प्रत्येक लहानसहान गोष्टीकडे अत्यंत बारकाईने लक्ष देऊन अचूक काम करणारा.',
    'सूक्ष्मदर्शी (अति सावधान)',
    'प्रत्येक छोटी-बड़ी बात पर गहराई से ध्यान देकर अत्यंत सावधानी से कार्य करने वाला।',
    [['Careful', 'Thorough', 'Precise'], ['बारकाईने काम करणारा', 'दक्ष'], ['सावधान', 'सटीक', 'व्यवस्थित']],
    [['Careless', 'Sloppy', 'Negligent'], ['निष्काळजी', 'गबाळा'], ['लापरवाह', 'असावधान']],
    [
      'A meticulous study timetable helps cover every chapter before exams.',
      'काटेकोरपणे आखलेले अभ्यासाचे वेळापत्रक परीक्षेपूर्वी प्रत्येक धडा पूर्ण करण्यास मदत करते.',
      'सावधानीपूर्वक बनाई गई अध्ययन समय-सारणी परीक्षा से पहले हर अध्याय पूरा करने में मदद करती है।'
    ]
  ],
  [
    'Momentum',
    'moh-MEN-tuhm (मोमेंटम)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'The quantity of motion of a moving body, measured as a product of its mass and velocity.',
    'संवेग (गतीची ताकद)',
    'वस्तूचे वस्तुमान आणि वेग यांचा गुणाकार; पुढे जाण्याची गती.',
    'संवेग (गतिबल)',
    'किसी गतिमान वस्तु के द्रव्यमान और वेग का गुणनफल; गति की शक्ति।',
    [['Impetus', 'Drive', 'Force'], ['वेग', 'प्रवाह', 'चालना'], ['गति', 'प्रवाह', 'वेग']],
    [['Inertia', 'Halt'], ['स्थिरता', 'थांबा'], ['जड़त्व', 'ठहराव']],
    [
      'A heavy truck moving fast has a very large momentum.',
      'वेगाने जाणाऱ्या जड ट्रकचा संवेग खूप जास्त असतो.',
      'तेज़ गति से चलते हुए भारी ट्रक का संवेग बहुत अधिक होता है।'
    ]
  ],

  // ================= N =================
  [
    'Navigate',
    'NAV-i-gayt (नॅव्हिगेट)',
    'Verb',
    'Classes 7–10',
    'History, Civics & Geography',
    'To plan and direct the route of a ship, aircraft, or journey using maps and instruments.',
    'दिशा शोधणे (मार्गक्रमण करणे)',
    'नकाशा किंवा होकायंत्राच्या साहाय्याने प्रवासाचा योग्य मार्ग शोधून पुढे जाणे.',
    'मार्गदर्शन करना (रास्ता खोजना)',
    'मानचित्र या दिशासूचक यंत्र की सहायता से यात्रा का सही मार्ग निर्धारित करना।',
    [['Steer', 'Pilot', 'Guide'], ['मार्ग काढणे', 'वल्हवणे'], ['दिशा दिखाना', 'संचालन करना']],
    [['Wander', 'Stray'], ['भटकणे', 'वाट चुकणे'], ['भटकना', 'रास्ता भूलना']],
    [
      'Ancient sailors used the North Star and a compass to navigate across oceans.',
      'प्राचीन दर्यावर्दी महासागरातून मार्ग शोधण्यासाठी ध्रुवतारा आणि होकायंत्राचा वापर करत असत.',
      'प्राचीन नाविक महासागरों में रास्ता खोजने के लिए ध्रुव तारे और दिशासूचक यंत्र का उपयोग करते थे।'
    ]
  ],
  [
    'Nourish',
    'NUR-ish (नरिश)',
    'Verb',
    'Classes 4–6',
    'Science & Nature',
    'To provide with the food or other substances necessary for growth, health, and good condition.',
    'पोषण करणे',
    'वाढीसाठी आणि उत्तम आरोग्यासाठी आवश्यक असलेले अन्न व जीवनसत्त्वे पुरवणे.',
    'पोषण करना',
    'स्वस्थ वृद्धि और विकास के लिए आवश्यक आहार तथा पोषक तत्व प्रदान करना।',
    [['Feed', 'Nurture', 'Sustain'], ['वाढवणे', 'जोपासणे'], ['पालन-पोषण करना', 'पुष्ट करना']],
    [['Starve', 'Neglect'], ['उपासमार होणे', 'दुर्लक्ष करणे'], ['कुपोषित रखना', 'उपेक्षा करना']],
    [
      'Healthy food nourishes the body, while good books nourish the mind.',
      'पौष्टिक अन्न शरीराचे पोषण करते, तर चांगली पुस्तके मनाचे पोषण करतात.',
      'पौष्टिक भोजन शरीर का पोषण करता है, जबकि अच्छी पुस्तकें मस्तिष्क का पोषण करती हैं।'
    ]
  ],
  [
    'Numerous',
    'NOO-mer-uhs (न्युमरस)',
    'Adjective',
    'Classes 4–6',
    'Daily Life & Communication',
    'Great in number; many.',
    'अनेक (असंख्य)',
    'संख्येने खूप जास्त असलेले; पुष्कळ.',
    'अनेक (बहुत सारे)',
    'संख्या में बहुत अधिक; अनगिनत।',
    [['Many', 'Countless', 'Several'], ['पुष्कळ', 'भरपूर'], ['कई', 'असंख्य', 'बहुसंख्य']],
    [['Few', 'Rare', 'Single'], ['मोजके', 'कमी'], ['कुछ', 'कम', 'गिने-चुने']],
    [
      'Our school library has numerous books on science, history, and mathematics.',
      'आमच्या शाळेच्या ग्रंथालयात विज्ञान, इतिहास आणि गणितावर अनेक पुस्तके आहेत.',
      'हमारे विद्यालय के पुस्तकालय में विज्ञान, इतिहास और गणित पर अनेक पुस्तकें हैं।'
    ]
  ],

  // ================= O =================
  [
    'Obedient',
    'oh-BEE-dee-uhnt (ओबीडियंट)',
    'Adjective',
    'Classes 1–3',
    'Values, Character & Emotions',
    'Willing to comply with the orders or guidance of parents, teachers, and rules.',
    'आज्ञाधारक',
    'मोठ्यांचे, पालकांचे आणि शिक्षकांचे सांगणे आदराने ऐकणारा.',
    'आज्ञाकारी',
    'माता-पिता, शिक्षकों और बड़ों की आज्ञा का आदरपूर्वक पालन करने वाला।',
    [['Respectful', 'Compliant', 'Dutiful'], ['नम्र', 'शिस्तप्रिय'], ['विनम्र', 'कर्तव्यनिष्ठ']],
    [['Disobedient', 'Rebellious', 'Unruly'], ['उद्धट', 'आज्ञा न पाळणारा'], ['अवज्ञाकारी', 'उद्दंड']],
    [
      'An obedient child listens carefully to the advice of parents and elders.',
      'आज्ञाधारक मूल पालकांचा आणि मोठ्यांचा सल्ला लक्षपूर्वक ऐकते.',
      'एक आज्ञाकारी बच्चा माता-पिता और बड़ों की सलाह ध्यान से सुनता है।'
    ]
  ],
  [
    'Observe',
    'uhb-ZURV (ऑब्झर्व्ह)',
    'Verb',
    'Classes 4–6',
    'Science & Nature',
    'To watch carefully and attentively, especially to learn or collect scientific facts.',
    'निरीक्षण करणे',
    'एखादी गोष्ट समजून घेण्यासाठी तिच्याकडे अत्यंत बारकाईने पाहणे.',
    'अवलोकन करना (निरीक्षण करना)',
    'किसी वस्तु या घटना को समझने के लिए उसे ध्यानपूर्वक देखना।',
    [['Watch', 'Examine', 'Notice'], ['बारकाईने पाहणे', 'तपासणे'], ['ध्यान से देखना', 'परखना']],
    [['Ignore', 'Overlook'], ['दुर्लक्ष करणे'], ['अनदेखा करना']],
    [
      'Scientists observe the movement of planets through powerful telescopes.',
      'शास्त्रज्ञ शक्तिशाली दुर्बिणीतून ग्रहांच्या हालचालींचे निरीक्षण करतात.',
      'वैज्ञानिक शक्तिशाली दूरबीनों के माध्यम से ग्रहों की गति का अवलोकन करते हैं।'
    ]
  ],
  [
    'Obstacle',
    'OB-stuh-kuhl (ऑब्स्टॅकल)',
    'Noun',
    'Classes 4–6',
    'Values, Character & Emotions',
    'A thing that blocks one’s way or prevents progress.',
    'अडथळा (संकट)',
    'कामात किंवा प्रगतीच्या मार्गात येणारी अडचण.',
    'बाधा (अड़चन)',
    'रास्ते या प्रगति में आने वाली रुकावट या कठिनाई।',
    [['Hurdle', 'Barrier', 'Difficulty'], ['अडचण', 'अडसर'], ['रुकावट', 'कठिनाई', 'अवरोध']],
    [['Aid', 'Advantage', 'Support'], ['मदत', 'सोय'], ['सहायता', 'सुविधा']],
    [
      'Courageous students treat every obstacle as a stepping stone to success.',
      'धाडसी विद्यार्थी प्रत्येक अडथळ्याकडे यशाची एक पायरी म्हणून पाहतात.',
      'साहसी विद्यार्थी हर बाधा को सफलता की एक सीढ़ी मानते हैं।'
    ]
  ],
  [
    'Opportunity',
    'op-er-TOO-ni-tee (ऑपॉर्च्युनिटी)',
    'Noun',
    'Classes 4–6',
    'Values, Character & Emotions',
    'A favourable time or set of circumstances that makes it possible to do something.',
    'संधी',
    'पुढे जाण्यासाठी किंवा स्वतःची गुणवत्ता सिद्ध करण्यासाठी मिळालेला योग्य वेळ व प्रसंग.',
    'अवसर (मौका)',
    'आगे बढ़ने या कुछ अच्छा कर दिखाने के लिए मिलने वाला अनुकूल समय।',
    [['Chance', 'Occasion', 'Opening'], ['योग्य वेळ', 'वाव'], ['मौका', 'सुयोग']],
    [['Misfortune', 'Obstacle'], ['अडचण', 'गमावलेली वेळ'], ['बाधा', 'दुर्भाग्य']],
    [
      'Every school competition is a wonderful opportunity to learn new skills.',
      'शाळेतील प्रत्येक स्पर्धा ही नवीन कौशल्ये शिकण्याची एक उत्तम संधी असते.',
      'विद्यालय की प्रत्येक प्रतियोगिता नए कौशल सीखने का एक शानदार अवसर होती है।'
    ]
  ],
  [
    'Optimistic',
    'op-tuh-MIS-tik (ऑप्टिमिस्टिक)',
    'Adjective',
    'Classes 7–10',
    'Values, Character & Emotions',
    'Hopeful and confident about the future and positive outcomes.',
    'आशावादी',
    'भविष्यात चांगलेच घडेल असा सकारात्मक दृष्टिकोन ठेवणारा.',
    'आशावादी',
    'भविष्य और परिस्थितियों के प्रति सकारात्मक तथा उत्साहपूर्ण दृष्टिकोण रखने वाला।',
    [['Hopeful', 'Positive', 'Confident'], ['सकारात्मक', 'उत्साही'], ['सकारात्मक', 'उत्साही', 'आशान्वित']],
    [['Pessimistic', 'Hopeless', 'Negative'], ['निराशावादी', 'नकारात्मक'], ['निराशावादी', 'नकारात्मक']],
    [
      'An optimistic mindset helps us find solutions even in tough situations.',
      'आशावादी दृष्टिकोनामुळे आपल्याला कठीण परिस्थितीतही मार्ग शोधण्यास मदत होते.',
      'आशावादी सोच हमें कठिन परिस्थितियों में भी समाधान खोजने में मदद करती है।'
    ]
  ],

  // ================= P =================
  [
    'Patience',
    'PAY-shuhns (पेशन्स)',
    'Noun',
    'Classes 4–6',
    'Values, Character & Emotions',
    'The capacity to accept delay, trouble, or learning challenges without getting angry or upset.',
    'संयम (धीर)',
    'घाई न करता किंवा राग न मानता शांतपणे प्रयत्न सुरू ठेवण्याचा गुण.',
    'धैर्य (धीरज)',
    'कठिनाई या विलंब होने पर भी विचलित हुए बिना शांत और अडिग रहने का गुण।',
    [['Tolerance', 'Endurance', 'Calmness'], ['सबुरी', 'सहनशीलता', 'शांतता'], ['सहनशीलता', 'संयम', 'धीरज']],
    [['Impatience', 'Haste', 'Anger'], ['अधीरता', 'घाई', 'संताप'], ['अधीरता', 'जल्दबाज़ी']],
    [
      'Learning a new skill like Abacus or Vedic Maths requires patience and regular practice.',
      'अबॅकस किंवा वैदिक गणितासारखे नवीन कौशल्य शिकण्यासाठी संयम आणि नियमित सरावाची गरज असते.',
      'अबेकस या वैदिक गणित जैसा नया कौशल सीखने के लिए धैर्य और नियमित अभ्यास की आवश्यकता होती है।'
    ]
  ],
  [
    'Patriotism',
    'PAY-tree-uh-tiz-uhm (पेट्रियटिझम)',
    'Noun',
    'Classes 7–10',
    'History, Civics & Geography',
    'Devotion to and vigorous support for one’s country.',
    'देशभक्ती (राष्ट्रप्रेम)',
    'आपल्या मातृभूमीवर निस्सीम प्रेम करणे आणि देशाच्या प्रगतीसाठी झटणे.',
    'देशभक्ति (राष्ट्रप्रेम)',
    'अपनी मातृभूमि के प्रति गहरा प्रेम, सम्मान और समर्पण का भाव।',
    [['Nationalism', 'Love of country'], ['राष्ट्रनिष्ठा', 'देशप्रेम'], ['राष्ट्रभक्ति', 'स्वदेश-प्रेम']],
    [['Treason', 'Disloyalty'], ['देशद्रोह'], ['देशद्रोह']],
    [
      'Keeping our cities clean and obeying laws is a practical form of patriotism.',
      'आपली शहरे स्वच्छ ठेवणे आणि कायद्यांचे पालन करणे हे देशभक्तीचे प्रत्यक्ष रूप आहे.',
      'अपने शहरों को स्वच्छ रखना और कानूनों का पालन करना देशभक्ति का व्यावहारिक रूप है।'
    ]
  ],
  [
    'Perseverance',
    'pur-suh-VEER-uhns (पर्सिव्हिअरन्स)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'Persistence in doing something despite difficulty or delay in achieving success.',
    'चिकाटी (सातत्य)',
    'अपयश किंवा अडचणी आल्या तरीही न थांबता सतत प्रयत्न करत राहण्याचा गुण.',
    'लगन (दृढ़ता)',
    'कठिनाइयों और बाधाओं के बावजूद निरंतर प्रयास करते रहने का गुण।',
    [['Persistence', 'Tenacity', 'Dedication'], ['सातत्य', 'जिद्द', 'दीर्घोद्योग'], ['निरंतरता', 'अध्यवसाय', 'अडिगता']],
    [['Quitting', 'Laziness', 'Giving up'], ['अर्ध्यावर सोडणे', 'आळस'], ['हार मानना', 'आलस्य']],
    [
      'Thomas Edison invented the electric bulb through tireless perseverance.',
      'थॉमस एडिसन यांनी अथक चिकाटीच्या जोरावर विजेच्या दिव्याचा शोध लावला.',
      'थॉमस एडिसन ने अथक लगन और प्रयास के बल पर बिजली के बल्ब का आविष्कार किया।'
    ]
  ],
  [
    'Photosynthesis',
    'foh-toh-SIN-thuh-sis (फोटोसिंथेसिस)',
    'Noun',
    'Classes 4–6',
    'Science & Nature',
    'The process by which green plants use sunlight, water, and carbon dioxide to make food.',
    'प्रकाशसंश्लेषण',
    'हिरव्या वनस्पतींनी सूर्यप्रकाश, पाणी आणि कार्बन डायऑक्साइडच्या साहाय्याने अन्न तयार करण्याची क्रिया.',
    'प्रकाश-संश्लेषण',
    'हरे पौधों द्वारा सूर्य के प्रकाश, जल और कार्बन डाइऑक्साइड की सहायता से भोजन बनाने की प्रक्रिया।',
    [['Plant food synthesis'], ['अन्ननिर्मिती प्रक्रिया'], ['पादप भोजन निर्माण']],
    [['Respiration'], ['श्वसन'], ['श्वसन']],
    [
      'During photosynthesis, green plants release life-giving oxygen into the air.',
      'प्रकाशसंश्लेषणाच्या प्रक्रियेत हिरव्या वनस्पती हवेत जीवनदायी ऑक्सिजन सोडतात.',
      'प्रकाश-संश्लेषण की प्रक्रिया के दौरान हरे पौधे हवा में जीवनदायी ऑक्सीजन छोड़ते हैं।'
    ]
  ],
  [
    'Polite',
    'puh-LYTE (पोलाइट)',
    'Adjective',
    'Classes 1–3',
    'Values, Character & Emotions',
    'Having or showing behaviour that is respectful and considerate of other people.',
    'विनम्र (सभ्य)',
    'इतरांशी आदराने, गोड भाषेत आणि सौजन्याने वागणारा.',
    'विनम्र (शिष्ट)',
    'दूसरों के साथ आदर, सभ्यता और मधुर वाणी में व्यवहार करने वाला।',
    [['Courteous', 'Respectful', 'Well-mannered'], ['सौजन्यशील', 'आदरयुक्त'], ['शिष्ट', 'सभ्य', 'मृदुभाषी']],
    [['Rude', 'Impolite', 'Arrogant'], ['उद्धट', 'असभ्य'], ['अशिष्ट', 'रूखा', 'अहंकारी']],
    [
      'Always use polite words like "Please", "Thank you", and "Sorry".',
      'नेहमी "कृपया", "धन्यवाद" आणि "क्षमस्व" यांसारख्या विनम्र शब्दांचा वापर करा.',
      'सदैव "कृपया", "धन्यवाद" और "क्षमा करें" जैसे विनम्र शब्दों का प्रयोग करें।'
    ]
  ],
  [
    'Preserve',
    'pri-ZURV (प्रिझर्व्ह)',
    'Verb',
    'Classes 7–10',
    'History, Civics & Geography',
    'To maintain something in its original or existing state and protect it from harm.',
    'जतन करणे',
    'एखादी मौल्यवान वस्तू, निसर्ग किंवा ऐतिहासिक ठेवा खराब होऊ न देता सुरक्षित ठेवणे.',
    'संरक्षित रखना (बचाए रखना)',
    'किसी मूल्यवान वस्तु, प्रकृति या धरोहर को सुरक्षित और मूल स्थिति में बनाए रखना।',
    [['Protect', 'Conserve', 'Safeguard'], ['संरक्षण करणे', 'टिकवून ठेवणे'], ['बचाना', 'सुरक्षित रखना']],
    [['Destroy', 'Neglect', 'Damage'], ['नष्ट करणे', 'नुकसान करणे'], ['नष्ट करना', 'नुकसान पहुँचाना']],
    [
      'It is our duty to preserve historical forts, monuments, and manuscripts.',
      'ऐतिहासिक किल्ले, स्मारके आणि हस्तलिखिते यांचे जतन करणे हे आपले कर्तव्य आहे.',
      'ऐतिहासिक किलों, स्मारकों और पांडुलिपियों को संरक्षित रखना हमारा कर्तव्य है।'
    ]
  ],
  [
    'Punctual',
    'PUNGK-choo-uhl (पंक्च्युअल)',
    'Adjective',
    'Classes 4–6',
    'Values, Character & Emotions',
    'Doing something or arriving at the exact appointed time; not late.',
    'वक्तशीर',
    'दिलेल्या वेळेवरच हजर राहणारा आणि प्रत्येक काम वेळेवर पूर्ण करणारा.',
    'समयनिष्ठ (समय का पाबंद)',
    'निर्धारित समय पर पहुँचने और प्रत्येक कार्य समय पर पूरा करने वाला।',
    [['On time', 'Prompt', 'Timely'], ['वेळेचे भान ठेवणारा', 'तत्पर'], ['समय का पाबंद', 'तत्पर']],
    [['Late', 'Tardy', 'Delayed'], ['उशिरा येणारा', 'बेफिकीर'], ['विलंबित', 'देर करने वाला']],
    [
      'Being punctual to school every morning shows respect for time and learning.',
      'दररोज सकाळी शाळेत वक्तशीर जाणे हे वेळ आणि शिक्षणाविषयीचा आदर दर्शवते.',
      'प्रतिदिन सुबह समय पर विद्यालय पहुँचना समय और शिक्षा के प्रति सम्मान दर्शाता है।'
    ]
  ],

  // ================= Q =================
  [
    'Quality',
    'KWOL-i-tee (क्वॉलिटी)',
    'Noun',
    'Classes 4–6',
    'Academic & School',
    'The standard of excellence of something, or a distinctive personal trait or virtue.',
    'दर्जा (गुणवत्ता / गुण)',
    'एखाद्या वस्तूचा किंवा कामाचा उत्तमपणा किंवा व्यक्तीच्या अंगी असलेला चांगला गुण.',
    'गुणवत्ता (गुण)',
    'किसी वस्तु या कार्य की श्रेष्ठता का स्तर अथवा व्यक्ति की विशेषता।',
    [['Excellence', 'Standard', 'Virtue'], ['उत्कृष्टता', 'वैशिष्ट्य'], ['श्रेष्ठता', 'विशेषता', 'स्तर']],
    [['Inferiority', 'Defect'], ['निकृष्टपणा', 'दोष'], ['निम्न स्तर', 'दोष']],
    [
      'Honesty and perseverance are two qualities found in every great leader.',
      'प्रामाणिकपणा आणि चिकाटी हे दोन गुण प्रत्येक महान नेत्यामध्ये आढळतात.',
      'ईमानदारी और लगन ये दो गुण प्रत्येक महान नेता में पाए जाते हैं।'
    ]
  ],
  [
    'Quest',
    'KWEST (क्वेस्ट)',
    'Noun',
    'Classes 7–10',
    'Academic & School',
    'A long or arduous search for knowledge, truth, or a noble goal.',
    'शोधयात्रा (ध्यास)',
    'ज्ञान किंवा सत्याच्या प्राप्तीसाठी केलेला दीर्घ आणि जिद्दीचा शोध.',
    'खोज (तलाश)',
    'ज्ञान, सत्य या किसी महान लक्ष्य को पाने के लिए की गई लंबी खोज।',
    [['Search', 'Pursuit', 'Mission'], ['शोध', 'मोहीम', 'साधना'], ['अन्वेषण', 'अभियान', 'साधना']],
    [['Retreat', 'Apathy'], ['माघार', 'उदासीनता'], ['पलायन', 'उदासीनता']],
    [
      'Science is a never-ending quest to understand the mysteries of the universe.',
      'विज्ञान ही विश्वातील रहस्ये समजून घेण्याची एक अखंड शोधयात्रा आहे.',
      'विज्ञान ब्रह्मांड के रहस्यों को समझने की एक निरंतर खोज है।'
    ]
  ],

  // ================= R =================
  [
    'Rational',
    'RASH-uh-nuhl (रॅशनल)',
    'Adjective',
    'Classes 7–10',
    'Mathematics & Logic',
    'Based on clear reason, logic, and scientific thinking rather than superstition.',
    'तर्कसंगत (विवेकवादी)',
    'अंधश्रद्धेवर विश्वास न ठेवता विचार, तर्क आणि विज्ञानावर आधारित असलेला.',
    'तर्कसंगत (विवेकपूर्ण)',
    'अंधविश्वास के बजाय तर्क, बुद्धि और वैज्ञानिक सोच पर आधारित।',
    [['Logical', 'Reasonable', 'Sensible'], ['बुद्धिवादी', 'सुज्ञ', 'विचारी'], ['तार्किक', 'बुद्धिमान', 'यथार्थ']],
    [['Irrational', 'Illogical'], ['अतार्किक', 'अविचारी'], ['अतार्किक', 'अविवेकी']],
    [
      'Education teaches us to take rational decisions in life.',
      'शिक्षण आपल्याला आयुष्यात तर्कसंगत आणि सुज्ञ निर्णय घ्यायला शिकवते.',
      'शिक्षा हमें जीवन में तर्कसंगत और विवेकपूर्ण निर्णय लेना सिखाती है।'
    ]
  ],
  [
    'Reflect',
    'ri-FLEKT (रिफ्लेक्ट)',
    'Verb',
    'Classes 4–6',
    'Science & Nature',
    'To throw back light, heat, or sound from a surface; or to think deeply about something.',
    'परावर्तित करणे (चिंतन करणे)',
    'पृष्ठभागावरून प्रकाश परत फेकणे किंवा एखाद्या गोष्टीवर शांतपणे विचार करणे.',
    'परावर्तित करना (चिंतन करना)',
    'किसी सतह से प्रकाश का लौटकर आना या किसी विषय पर गहराई से विचार करना।',
    [['Mirror', 'Bounce back', 'Ponder'], ['परत फेकणे', 'विचार करणे'], ['लौटाना', 'मनन करना']],
    [['Absorb', 'Disregard'], ['शोषून घेणे'], ['अवशोषित करना']],
    [
      'A polished mirror reflects almost all the light that falls on it.',
      'गुळगुळीत आरसा त्यावर पडणारा जवळजवळ सर्व प्रकाश परावर्तित करतो.',
      'एक चमकदार दर्पण उस पर पड़ने वाले लगभग पूरे प्रकाश को परावर्तित करता है।'
    ]
  ],
  [
    'Reliable',
    'ri-LY-uh-buhl (रिलायबल)',
    'Adjective',
    'Classes 7–10',
    'Values, Character & Emotions',
    'Consistently good in quality or performance; able to be trusted.',
    'विश्वासार्ह (भरवशाचा)',
    'ज्यावर आपण पूर्णपणे विश्वास ठेवू शकतो असा व्यक्ती किंवा माहितीचा स्रोत.',
    'विश्वसनीय (भरोसेमंद)',
    'जिस पर पूरी तरह से भरोसा किया जा सके; खरा और प्रामाणिक।',
    [['Dependable', 'Trustworthy', 'Authentic'], ['खात्रीशीर', 'विश्वासू'], ['भरोसेमंद', 'प्रामाणिक']],
    [['Unreliable', 'Doubtful'], ['अविश्वसनीय', 'संशयास्पद'], ['अविश्वसनीय', 'संदिग्ध']],
    [
      'Textbooks and verified encyclopedias are reliable sources of academic knowledge.',
      'पाठ्यपुस्तके आणि प्रमाणित विश्वकोश हे शैक्षणिक ज्ञानाचे विश्वासार्ह स्रोत आहेत.',
      'पाठ्यपुस्तकें और प्रामाणिक विश्वकोश शैक्षणिक ज्ञान के विश्वसनीय स्रोत हैं।'
    ]
  ],
  [
    'Renewable',
    'ri-NOO-uh-buhl (रिन्युएबल)',
    'Adjective',
    'Classes 7–10',
    'Science & Nature',
    'Capable of being replenished naturally without being depleted, such as solar or wind energy.',
    'नूतनीकरणक्षम (अक्षय)',
    'निसर्गात पुन्हा पुन्हा निर्माण होणारी आणि कधीही न संपणारी (उदा. सौर व पवन ऊर्जा).',
    'नवीकरणीय (अक्षय)',
    'जो प्रकृति में स्वतः पुनः उत्पन्न हो सके और समाप्त न हो (जैसे सौर एवं पवन ऊर्जा)।',
    [['Sustainable', 'Inexhaustible'], ['अक्षय', 'शाश्वत'], ['अक्षय', 'सतत']],
    [['Non-renewable', 'Exhaustible'], ['संपणारी', 'अनूतनीकरणक्षम'], ['अनवीकरणीय', 'समाप्त होने योग्य']],
    [
      'Solar energy and wind power are clean, renewable sources of energy.',
      'सौर ऊर्जा आणि पवन ऊर्जा हे स्वच्छ आणि नूतनीकरणक्षम ऊर्जास्रोत आहेत.',
      'सौर ऊर्जा और पवन ऊर्जा स्वच्छ तथा नवीकरणीय ऊर्जा के स्रोत हैं।'
    ]
  ],
  [
    'Resilience',
    'ri-ZIL-yuhns (रेझिलियन्स)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'The capacity to recover quickly from difficulties and bounce back stronger.',
    'लवचिकता (संकटातून पुन्हा उभे राहण्याची ताकद)',
    'अपयश किंवा संकटातून न खचता पुन्हा नव्या जोमाने उभे राहण्याची मानसिक क्षमता.',
    'लचीलापन (जूझने की क्षमता)',
    'कठिनाइयों या असफलताओं से उबरकर पुनः दोगुने उत्साह से खड़े होने की शक्ति।',
    [['Toughness', 'Grit', 'Strength'], ['कणखरपणा', 'जिद्द'], ['दृढ़ता', 'जीवटता', 'सहनशक्ति']],
    [['Fragility', 'Weakness'], ['कमकुवतपणा', 'खचणे'], ['कमज़ोरी', 'निर्बलता']],
    [
      'Sports teach students teamwork, discipline, and mental resilience.',
      'खेळांमुळे विद्यार्थ्यांना सांघिक भावना, शिस्त आणि मानसिक कणखरपणा शिकायला मिळतो.',
      'खेल विद्यार्थियों को टीम भावना, अनुशासन और मानसिक दृढ़ता सिखाते हैं।'
    ]
  ],
  [
    'Respect',
    'ri-SPEKT (रिस्पेक्ट)',
    'Noun',
    'Classes 1–3',
    'Values, Character & Emotions',
    'A feeling of deep admiration and polite regard for someone’s elders, teachers, or rights.',
    'आदर (सन्मान)',
    'मोठ्यांविषयी, शिक्षकांविषयी आणि चांगल्या गुणांविषयी मनात असलेला पूज्यभाव.',
    'सम्मान (आदर)',
    'बड़ों, शिक्षकों और दूसरों के अधिकारों के प्रति आदर तथा श्रद्धा का भाव।',
    [['Honour', 'Regard', 'Esteem'], ['मान', 'सन्मान', 'श्रद्धा'], ['आदर', 'श्रद्धा', 'प्रतिष्ठा']],
    [['Disrespect', 'Insult', 'Contempt'], ['अनादर', 'अपमान'], ['अनादर', 'अपमान']],
    [
      'When we give respect to others, we earn respect in return.',
      'जेव्हा आपण इतरांना आदर देतो, तेव्हा आपल्यालाही बदल्यात आदर मिळतो.',
      'जब हम दूसरों को सम्मान देते हैं, तो बदले में हमें भी सम्मान मिलता है।'
    ]
  ],
  [
    'Responsibility',
    'ri-spon-suh-BIL-i-tee (रिस्पॉन्सिबिलिटी)',
    'Noun',
    'Classes 4–6',
    'Values, Character & Emotions',
    'A duty to deal with something or take accountability for one’s actions.',
    'जबाबदारी (कर्तव्य)',
    'आपल्यावर सोपवलेले काम किंवा कर्तव्य प्रामाणिकपणे पार पाडण्याची जाणीव.',
    'जिम्मेदारी (उत्तरदायित्व)',
    'अपने कर्तव्य और कार्यों को निष्ठापूर्वक निभाने का दायित्व।',
    [['Duty', 'Accountability', 'Obligation'], ['कर्तव्य', 'दायित्व'], ['दायित्व', 'कर्तव्य', 'जवाबदेही']],
    [['Irresponsibility', 'Negligence'], ['बेजबाबदारपणा', 'निष्काळजीपणा'], ['गैर-जिम्मेदारी', 'लापरवाही']],
    [
      'Taking care of school books and classroom cleanliness is every student’s responsibility.',
      'शाळेच्या पुस्तकांची काळजी घेणे आणि वर्ग स्वच्छ ठेवणे ही प्रत्येक विद्यार्थ्याची जबाबदारी आहे.',
      'विद्यालय की पुस्तकों की देखभाल करना और कक्षा की स्वच्छता बनाए रखना प्रत्येक विद्यार्थी की जिम्मेदारी है।'
    ]
  ],

  // ================= S =================
  [
    'Sanctuary',
    'SANGK-choo-er-ee (सँक्चुअरी)',
    'Noun',
    'Classes 4–6',
    'Science & Nature',
    'A protected natural area where wild animals and birds live safely without fear of hunting.',
    'अभयारण्य',
    'वन्य प्राणी आणि पक्षी निर्भयपणे जगू शकतील असे शासनाने संरक्षित केलेले जंगल.',
    'अभयारण्य',
    'वह संरक्षित वन क्षेत्र जहाँ पशु-पक्षी बिना किसी भय के सुरक्षित रहते हैं।',
    [['Wildlife reserve', 'Refuge'], ['संरक्षित वन', 'आश्रयस्थान'], ['वन्यजीव संरक्षण क्षेत्र', 'शरणस्थली']],
    [['Danger zone'], ['धोकादायक क्षेत्र'], ['असुरक्षित क्षेत्र']],
    [
      'Radhanagari and Koyna are famous wildlife sanctuaries in Maharashtra.',
      'राधानगरी आणि कोयना ही महाराष्ट्रातील प्रसिद्ध वन्यजीव अभयारण्ये आहेत.',
      'राधानगरी और कोयना महाराष्ट्र के प्रसिद्ध वन्यजीव अभयारण्य हैं।'
    ]
  ],
  [
    'Scholar',
    'SKOL-er (स्कॉलर)',
    'Noun',
    'Classes 4–6',
    'Academic & School',
    'A deeply learned person or a student who excels in academic studies and wins a scholarship.',
    'विद्वान (शिष्यवृत्तीधारक विद्यार्थी)',
    'सखोल अभ्यास असलेला पंडित किंवा अभ्यासात विशेष प्रावीण्य मिळवणारा विद्यार्थी.',
    'विद्वान (मेधावी छात्र)',
    'गहन अध्ययन करने वाला ज्ञानी व्यक्ति या छात्रवृत्ति प्राप्त करने वाला मेधावी विद्यार्थी।',
    [['Intellectual', 'Savant', 'Topper'], ['पंडित', 'प्रज्ञावंत', 'अभ्यासक'], ['मनीषी', 'पंडित', 'मेधावी']],
    [['Ignoramus', 'Idler'], ['अज्ञानी'], ['अज्ञानी']],
    [
      'Regular practice of mental ability and mathematics prepares a student to become a scholarship scholar.',
      'बुद्धिमत्ता चाचणी आणि गणिताच्या नियमित सरावामुळे विद्यार्थी शिष्यवृत्ती परीक्षेत प्रज्ञावंत ठरतो.',
      'मानसिक योग्यता और गणित का नियमित अभ्यास विद्यार्थी को छात्रवृत्ति परीक्षा का मेधावी छात्र बनाता है।'
    ]
  ],
  [
    'Serene',
    'suh-REEN (सिरीन)',
    'Adjective',
    'Classes 7–10',
    'Daily Life & Communication',
    'Calm, peaceful, and untroubled.',
    'शांत व प्रसन्न',
    'मनाला प्रसन्नता देणारा; अत्यंत शांत आणि निरामय.',
    'शांत एवं सौम्य',
    'अत्यंत शांत, निर्मल और मन को प्रसन्न करने वाला।',
    [['Calm', 'Peaceful', 'Tranquil'], ['निरामय', 'प्रसन्न', 'स्थिर'], ['निर्मल', 'प्रसन्न', 'शांतिपूर्ण']],
    [['Turbulent', 'Noisy', 'Stormy'], ['खवळलेला', 'गोंगाटाचा'], ['अशांत', 'कोलाहलपूर्ण']],
    [
      'The serene atmosphere of the morning is the best time for studying.',
      'सकाळचे शांत व प्रसन्न वातावरण अभ्यासासाठी सर्वोत्तम वेळ असते.',
      'सुबह का शांत एवं सौम्य वातावरण अध्ययन के लिए सर्वोत्तम समय होता है।'
    ]
  ],
  [
    'Significant',
    'sig-NIF-i-kuhnt (सिग्निफिकंट)',
    'Adjective',
    'Classes 7–10',
    'Academic & School',
    'Sufficiently great or important to be worthy of attention.',
    'महत्त्वाचा (लक्षणीय)',
    'लक्ष देण्याजोगा आणि मोठा परिणाम घडवून आणणारा; महत्त्वपूर्ण.',
    'महत्त्वपूर्ण (उल्लेखनीय)',
    'ध्यान देने योग्य और विशेष प्रभाव या महत्त्व रखने वाला।',
    [['Important', 'Notable', 'Major'], ['मोलाचा', 'विशेष', 'प्रमुख'], ['प्रमुख', 'विशेष', 'अहम']],
    [['Insignificant', 'Minor', 'Trivial'], ['किरकोळ', 'नगण्य'], ['तुच्छ', 'साधारण', 'गौण']],
    [
      'India has made significant progress in space technology and satellite launches.',
      'भारताने अंतराळ तंत्रज्ञान आणि उपग्रह प्रक्षेपणामध्ये लक्षणीय प्रगती केली आहे.',
      'भारत ने अंतरिक्ष प्रौद्योगिकी और उपग्रह प्रक्षेपण में महत्त्वपूर्ण प्रगति की है।'
    ]
  ],
  [
    'Sincere',
    'sin-SEER (सिन्सिअर)',
    'Adjective',
    'Classes 4–6',
    'Values, Character & Emotions',
    'Proceeding from genuine feelings; free from pretence or deceit.',
    'मनापासूनचा (प्रामाणिक)',
    'कोणताही दिखावा न करता मनापासून अभ्यास किंवा काम करणारा.',
    'सच्चा (निष्ठावान)',
    'बिना किसी दिखावे के सच्चे मन और लगन से कार्य करने वाला।',
    [['Genuine', 'Honest', 'Earnest'], ['खरा', 'तळमळीचा', 'निष्कपट'], ['ईमानदार', 'निष्कपट', 'गंभीर']],
    [['Insincere', 'Fake', 'Hypocritical'], ['दिखाऊ', 'खोटा'], ['दिखावटी', 'कपटी']],
    [
      'Sincere effort in daily homework makes exam preparation effortless.',
      'दररोजच्या गृहपाठात मनापासून केलेले प्रयत्न परीक्षेची तयारी सोपी करतात.',
      'दैनिक गृहकार्य में किया गया सच्चा प्रयास परीक्षा की तैयारी को आसान बना देता है।'
    ]
  ],
  [
    'Sovereign',
    'SOV-rin (सॉव्हरिन)',
    'Adjective',
    'Classes 7–10',
    'History, Civics & Geography',
    'Possessing supreme, independent authority over a country without external control.',
    'सार्वभौम',
    'कोणत्याही बाह्य देशाच्या नियंत्रणाखाली नसलेला; स्वतःचे निर्णय स्वतः घेण्यास पूर्ण स्वतंत्र.',
    'संप्रभु (सार्वभौम)',
    'किसी बाहरी शक्ति के नियंत्रण से पूर्णतः मुक्त और सर्वोच्च अधिकार रखने वाला राष्ट्र।',
    [['Independent', 'Supreme', 'Autonomous'], ['स्वतंत्र', 'स्वयंपूर्ण'], ['स्वतंत्र', 'सर्वोच्च', 'स्वाधीन']],
    [['Subordinate', 'Dependent', 'Colonial'], ['परावलंबी', 'पारतंत्र्यातील'], ['पराधीन', 'अधीन']],
    [
      'India is a sovereign, socialist, secular, and democratic republic.',
      'भारत हे एक सार्वभौम, समाजवादी, धर्मनिरपेक्ष आणि लोकशाही प्रजासत्ताक राष्ट्र आहे.',
      'भारत एक संपूर्ण प्रभुत्व-संपन्न, समाजवादी, पंथनिरपेक्ष और लोकतांत्रिक गणराज्य है।'
    ]
  ],
  [
    'Symmetry',
    'SIM-i-tree (सिमेट्री)',
    'Noun',
    'Classes 4–6',
    'Mathematics & Logic',
    'The quality of being made up of exactly similar parts facing each other or around an axis.',
    'सममिती',
    'एखाद्या आकृतीचे मध्यरेषेवर दुमडल्यास दोन्ही भाग तंतोतंत जुळण्याचा गुणधर्म.',
    'सममिति',
    'किसी आकृति को मध्य रेखा से मोड़ने पर दोनों भागों के बिल्कुल समान होने का गुण।',
    [['Balance', 'Proportion', 'Harmony'], ['समान रचना', 'संतुलन'], ['समानुपात', 'संतुलन']],
    [['Asymmetry', 'Irregularity'], ['असममिती', 'विषमता'], ['असममिति', 'विषमता']],
    [
      'The wings of a butterfly show beautiful bilateral symmetry.',
      'फुलपाखराचे पंख अतिशय सुंदर द्विपक्षीय सममिती दर्शवतात.',
      'तितली के पंख अत्यंत सुंदर द्विपक्षीय सममिति दर्शाते हैं।'
    ]
  ],

  // ================= T =================
  [
    'Talent',
    'TAL-uhnt (टॅलेंट)',
    'Noun',
    'Classes 1–3',
    'Academic & School',
    'Natural aptitude or skill in arts, academics, sports, or problem-solving.',
    'कौशल्य (उपजत गुण / प्रतिभा)',
    'चित्रकला, गायन, खेळ किंवा अभ्यासात असलेली विशेष नैसर्गिक क्षमता.',
    'प्रतिभा (हुनर)',
    'कला, खेल, संगीत या अध्ययन के क्षेत्र में पाई जाने वाली स्वाभाविक कुशलता।',
    [['Gift', 'Aptitude', 'Skill'], ['गुण', 'कला', 'नैपुण्य'], ['कौशल', 'योग्यता', 'हुनर']],
    [['Inability', 'Weakness'], ['अक्षमता'], ['अक्षमता']],
    [
      'Every child is born with a unique talent that blossoms with practice.',
      'प्रत्येक मूल एका वेगळ्या प्रतिभेसह जन्माला येते जी सरावाने फुलून येते.',
      'प्रत्येक बच्चा एक अनूठी प्रतिभा के साथ जन्म लेता है जो अभ्यास से निखरती है।'
    ]
  ],
  [
    'Telescope',
    'TEL-uh-skohp (टेलिस्कोप)',
    'Noun',
    'Classes 4–6',
    'Science & Nature',
    'An optical instrument designed to make distant objects in space appear nearer and clearer.',
    'दुर्बीण',
    'आकाशातील दूरवरचे ग्रह, तारे आणि खगोलीय वस्तू जवळ व स्पष्ट पाहण्याचे वैज्ञानिक उपकरण.',
    'दूरबीन (दूरदर्शी)',
    'अंतरिक्ष में स्थित दूर के ग्रहों और तारों को बड़ा तथा स्पष्ट देखने का वैज्ञानिक यंत्र।',
    [['Optical scope', 'Spyglass'], ['आकाशदुर्बीण'], ['दूरदर्शी यंत्र']],
    [['Microscope'], ['सूक्ष्मदर्शक'], ['सूक्ष्मदर्शी']],
    [
      'Galileo used a telescope to observe the moons of Jupiter.',
      'गॅलिलिओने गुरू ग्रहाच्या चंद्रांचे निरीक्षण करण्यासाठी दुर्बिणीचा वापर केला.',
      'गैलीलियो ने बृहस्पति ग्रह के चंद्रमाओं का अवलोकन करने के लिए दूरबीन का उपयोग किया।'
    ]
  ],
  [
    'Tolerance',
    'TOL-er-uhns (टॉलरन्स)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'The willingness to respect opinions, beliefs, or practices that differ from one’s own.',
    'सहिष्णुता (सहनशीलता)',
    'आपल्यापेक्षा वेगळ्या विचारांचा, मतांचा आणि संस्कृतींचा आदर करण्याची उदार वृत्ती.',
    'सहिष्णुता (सहनशीलता)',
    'दूसरों के भिन्न विचारों, विश्वासों और संस्कृतियों का सम्मान करने की उदार भावना।',
    [['Broad-mindedness', 'Patience', 'Respect'], ['उदारमतवाद', 'सहनशक्ती'], ['उदारता', 'धैर्य', 'समभाव']],
    [['Intolerance', 'Prejudice', 'Bigotry'], ['असहिष्णुता', 'पूर्वग्रह'], ['असहिष्णुता', 'संकीर्णता']],
    [
      'Mutual respect and tolerance strengthen peace in society.',
      'परस्पर आदर आणि सहिष्णुतेमुळे समाजातील शांतता अधिक दृढ होते.',
      'पारस्परिक सम्मान और सहिष्णुता समाज में शांति को मजबूत करते हैं।'
    ]
  ],
  [
    'Tradition',
    'truh-DISH-uhn (ट्रॅडिशन)',
    'Noun',
    'Classes 4–6',
    'History, Civics & Geography',
    'A custom, festival, or belief passed down from generation to generation.',
    'परंपरा',
    'एका पिढीकडून दुसऱ्या पिढीकडे चालत आलेली चांगली प्रथा किंवा संस्कृती.',
    'परंपरा',
    'पीढ़ी-दर-पीढ़ी चली आ रही सांस्कृतिक रीति, उत्सव या मान्यता।',
    [['Custom', 'Heritage', 'Practice'], ['प्रथा', 'रीतिरिवाज', 'संस्कृती'], ['रीति-रिवाज', 'प्रथा', 'संस्कृति']],
    [['Modernization', 'Innovation'], ['नवप्रवाह'], ['आधुनिकता']],
    [
      'Respecting teachers and elders is a cherished tradition of Indian culture.',
      'शिक्षक आणि वडीलधाऱ्यांचा आदर करणे ही भारतीय संस्कृतीची एक मोलाची परंपरा आहे.',
      'शिक्षकों और बड़ों का सम्मान करना भारतीय संस्कृति की एक गौरवशाली परंपरा है।'
    ]
  ],
  [
    'Transparent',
    'trans-PAIR-uhnt (ट्रान्सपरंट)',
    'Adjective',
    'Classes 4–6',
    'Science & Nature',
    'Allowing light to pass through so that objects behind can be distinctly seen; honest and clear.',
    'पारदर्शक',
    'ज्यातून प्रकाश आरपार जातो व पलीकडची वस्तू स्पष्ट दिसते असा पदार्थ; निष्कपट.',
    'पारदर्शी',
    'जिसके आर-पार प्रकाश जा सके और दूसरी ओर की वस्तु स्पष्ट दिखाई दे; निष्कपट।',
    [['Clear', 'See-through', 'Lucid'], ['स्वच्छ', 'स्पष्ट'], ['स्पष्ट', 'साफ़', 'निर्मल']],
    [['Opaque', 'Cloudy', 'Hidden'], ['अपारदर्शक', 'गढूळ'], ['अपारदर्शी', 'धुँधला']],
    [
      'Clean glass and pure water are transparent materials.',
      'स्वच्छ काच आणि शुद्ध पाणी हे पारदर्शक पदार्थ आहेत.',
      'स्वच्छ काँच और शुद्ध जल पारदर्शी पदार्थ हैं।'
    ]
  ],
  [
    'Triumph',
    'TRY-uhmf (ट्रायम्फ)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'A great victory or achievement won after hard struggle.',
    'विजय (मोठे यश)',
    'कठोर परिश्रम आणि संघर्षानंतर मिळवलेले भव्य यश.',
    'विजय (महान सफलता)',
    'कठिन संघर्ष और परिश्रम के बाद प्राप्त हुई बड़ी जीत या उपलब्धि।',
    [['Victory', 'Success', 'Achievement'], ['यश', 'जय', 'पराक्रम'], ['जीत', 'सफलता', 'उपलब्धि']],
    [['Defeat', 'Failure', 'Loss'], ['पराभव', 'अपयश'], ['पराजय', 'असफलता', 'हार']],
    [
      'Winning the national science Olympiad was a moment of proud triumph for the school team.',
      'राष्ट्रीय विज्ञान ऑलिम्पियाड जिंकणे हा शाळेच्या संघासाठी अभिमानास्पद विजयाचा क्षण होता.',
      'राष्ट्रीय विज्ञान ओलंपियाड जीतना विद्यालय की टीम के लिए गौरवपूर्ण विजय का क्षण था।'
    ]
  ],

  // ================= U =================
  [
    'Unanimous',
    'yoo-NAN-uh-muhs (युनेनिमस)',
    'Adjective',
    'Classes 7–10',
    'History, Civics & Geography',
    'Fully in agreement by all people involved without a single opposing vote.',
    'एकमताने (सर्वसंमत)',
    'कोणाचाही विरोध नसताना सर्वांच्या संमतीने घेतलेला निर्णय.',
    'सर्वसम्मत (एकमत)',
    'जिसमें सभी सदस्य बिना किसी विरोध के पूरी तरह सहमत हों।',
    [['United', 'Agreed', 'Harmonious'], ['एकमुखी', 'सर्वांच्या संमतीचा'], ['एकमत', 'समान मत']],
    [['Divided', 'Disputed'], ['दुभंगलेला', 'वादग्रस्त'], ['विभाजित', 'विवादित']],
    [
      'The class monitor was elected by a unanimous vote of all students.',
      'सर्व विद्यार्थ्यांच्या एकमताने वर्गप्रमुखाची निवड करण्यात आली.',
      'सभी विद्यार्थियों के सर्वसम्मत मत से कक्षा मॉनिटर चुना गया।'
    ]
  ],
  [
    'Understand',
    'un-der-STAND (अंडरस्टँड)',
    'Verb',
    'Classes 1–3',
    'Academic & School',
    'To perceive the intended meaning of words, concepts, or another person’s feelings.',
    'समजणे',
    'एखाद्या गोष्टीचा अर्थ, संकल्पना किंवा दुसऱ्याच्या भावना लक्षात येणे.',
    'समझना',
    'किसी शब्द, विषय या दूसरे व्यक्ति के भाव का सही अर्थ जानना।',
    [['Comprehend', 'Grasp', 'Realize'], ['आकलन होणे', 'उमजणे'], ['जानना', 'बोध होना']],
    [['Misunderstand', 'Ignore'], ['गैरसमज होणे'], ['न समझना', 'भ्रमित होना']],
    [
      'Always understand the concept behind a formula instead of just memorizing it.',
      'कोणतेही सूत्र केवळ पाठ न करता त्यामागील मूळ संकल्पना समजून घ्या.',
      'किसी सूत्र को केवल रटने के बजाय उसके पीछे की अवधारणा को हमेशा समझें।'
    ]
  ],
  [
    'Unique',
    'yoo-NEEK (युनिक)',
    'Adjective',
    'Classes 4–6',
    'Daily Life & Communication',
    'Being the only one of its kind; unlike anything else.',
    'अद्वितीय (आगळावेगळा)',
    'ज्याची कोणाशीही तुलना होऊ शकत नाही असा एकमेव आणि वैशिष्ट्यपूर्ण.',
    'अद्वितीय (अनोखा)',
    'अपने जैसा अकेला और विशेष; जिसकी किसी से तुलना न हो सके।',
    [['Distinctive', 'Special', 'Singular'], ['एकमेव', 'वैशिष्ट्यपूर्ण'], ['अनोखा', 'विशेष', 'विलक्षण']],
    [['Common', 'Ordinary', 'Usual'], ['सामान्य', 'नेहमीचा'], ['सामान्य', 'साधारण']],
    [
      'Every student has a unique way of learning and expressing creativity.',
      'प्रत्येक विद्यार्थ्याची शिकण्याची आणि सर्जनशीलता व्यक्त करण्याची एक अद्वितीय पद्धत असते.',
      'प्रत्येक विद्यार्थी का सीखने और अपनी सृजनात्मकता व्यक्त करने का एक अद्वितीय तरीका होता है।'
    ]
  ],
  [
    'Unity',
    'YOO-ni-tee (युनिटी)',
    'Noun',
    'Classes 1–3',
    'Values, Character & Emotions',
    'The state of being united or joined as a whole; togetherness.',
    'एकता (ऐक्य)',
    'सर्वांनी मिळूनमिसळून एकत्र राहण्याची आणि काम करण्याची भावना.',
    'एकता',
    'सबके मिलकर एक साथ रहने और कार्य करने का भाव; संगठन।',
    [['Solidarity', 'Harmony', 'Union'], ['एकजूट', 'संघटन'], ['संगठन', 'मेल', 'अखंडता']],
    [['Division', 'Disunity', 'Conflict'], ['फूट', 'दुही'], ['विभाजन', 'फूट']],
    [
      'Unity gives strength to a family, a team, and a nation.',
      'एकतेमुळे कुटुंबाला, संघाला आणि देशाला मोठी ताकद मिळते.',
      'एकता परिवार, टीम और राष्ट्र को शक्ति प्रदान करती है।'
    ]
  ],
  [
    'Universe',
    'YOO-ni-vurs (युनिव्हर्स)',
    'Noun',
    'Classes 4–6',
    'Science & Nature',
    'All existing matter and space considered as a whole, including galaxies, stars, and planets.',
    'विश्व (ब्रह्मांड)',
    'पृथ्वी, सूर्यमाला, अब्जावधी तारे आणि आकाशगंगा यांनी मिळून बनलेले अथांग अंतराळ.',
    'ब्रह्मांड (विश्व)',
    'पृथ्वी, सौरमंडल, असंख्य तारे और आकाशगंगाओं सहित संपूर्ण अंतरिक्ष।',
    [['Cosmos', 'Creation', 'Space'], ['ब्रह्मांड', 'सृष्टी'], ['अंतरिक्ष', 'सृष्टि', 'जगत']],
    [['Atom', 'Speck'], ['सूक्ष्म कण'], ['अणु', 'कण']],
    [
      'Our solar system is a part of the Milky Way galaxy in the vast universe.',
      'आपली सूर्यमाला ही अथांग विश्वातील मंदाकिनी आकाशगंगेचा एक भाग आहे.',
      'हमारा सौरमंडल विशाल ब्रह्मांड में आकाशगंगा (मंदाकिनी) का एक हिस्सा है।'
    ]
  ],

  // ================= V =================
  [
    'Valuable',
    'VAL-yoo-uh-buhl (व्हॅल्युएबल)',
    'Adjective',
    'Classes 4–6',
    'Values, Character & Emotions',
    'Of great worth, importance, or usefulness.',
    'मौल्यवान (बहुमोल)',
    'अत्यंत महत्त्वाचा आणि ज्याची किंमत किंवा उपयुक्तता खूप जास्त आहे असा.',
    'मूल्यवान (बहुमूल्य)',
    'अत्यधिक महत्त्वपूर्ण, उपयोगी और कीमती।',
    [['Precious', 'Priceless', 'Important'], ['अनमोल', 'किमती', 'महत्त्वाचा'], ['अनमोल', 'कीमती', 'महत्त्वपूर्ण']],
    [['Worthless', 'Useless', 'Cheap'], ['कवडीमोल', 'निरुपयोगी'], ['व्यर्थ', 'निरुपयोगी']],
    [
      'Time is the most valuable resource a student possesses.',
      'वेळ ही विद्यार्थ्याजवळ असलेली सर्वात मौल्यवान संपत्ती आहे.',
      'समय किसी विद्यार्थी के पास मौजूद सबसे मूल्यवान संसाधन है।'
    ]
  ],
  [
    'Velocity',
    'vuh-LOS-i-tee (व्हेलोसिटी)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'The speed of something moving in a specific given direction.',
    'वेग (दिशादर्शक गती)',
    'ठराविक दिशेने जाणाऱ्या वस्तूने एकक काळात कापलेले अंतर.',
    'वेग',
    'किसी निश्चित दिशा में गतिमान वस्तु द्वारा इकाई समय में तय किया गया विस्थापन।',
    [['Speed', 'Pace', 'Rate'], ['गती', 'चाल'], ['गति', 'चाल']],
    [['Rest', 'Stillness'], ['विराम अवस्था'], ['विराम अवस्था']],
    [
      'Velocity has both magnitude and direction, whereas speed has only magnitude.',
      'वेगाला परिमाण आणि दिशा दोन्ही असतात, तर चालीला केवळ परिमाण असते.',
      'वेग में परिमाण और दिशा दोनों होते हैं, जबकि चाल में केवल परिमाण होता है।'
    ]
  ],
  [
    'Victory',
    'VIK-tuh-ree (व्हिक्टरी)',
    'Noun',
    'Classes 1–3',
    'Values, Character & Emotions',
    'An act of winning a competition, struggle, or overcoming a challenge.',
    'विजय',
    'स्पर्धेत किंवा संघर्षात मिळालेले यश.',
    'विजय (जीत)',
    'किसी प्रतियोगिता, संघर्ष या चुनौती में प्राप्त हुई सफलता।',
    [['Triumph', 'Success', 'Win'], ['यश', 'जय'], ['जीत', 'सफलता']],
    [['Defeat', 'Loss', 'Failure'], ['पराभव', 'अपयश'], ['हार', 'पराजय']],
    [
      'Victory belongs to those who prepare sincerely and never lose hope.',
      'जे प्रामाणिकपणे तयारी करतात आणि कधीही आशा सोडत नाहीत, विजय त्यांचाच होतो.',
      'विजय उन्हीं की होती है जो ईमानदारी से तैयारी करते हैं और कभी आशा नहीं छोड़ते।'
    ]
  ],
  [
    'Virtue',
    'VUR-choo (व्हर्च्यू)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'Behaviour showing high moral standards; a good and noble quality of character.',
    'सद्गुण (नीतिमत्ता)',
    'माणसाच्या चारित्र्यातील चांगला व नैतिक गुण (जसे सत्य, दया, प्रामाणिकपणा).',
    'सद्गुण (नैतिक गुण)',
    'उच्च नैतिक आचरण और चरित्र का श्रेष्ठ गुण (जैसे सत्य, करुणा, ईमानदारी)।',
    [['Goodness', 'Morality', 'Merit'], ['चांगुलपणा', 'सदाचार', 'गुण'], ['सदाचार', 'अच्छाई', 'नैतिकता']],
    [['Vice', 'Fault', 'Evil'], ['दुर्गुण', 'दोष'], ['दुर्गुण', 'अवगुण', 'बुराई']],
    [
      'Truthfulness, humility, and kindness are virtues that build great character.',
      'सत्यवचन, नम्रता आणि दयाळूपणा हे उत्तम चारित्र्य घडवणारे सद्गुण आहेत.',
      'सत्यवादिता, विनम्रता और दयालुता ऐसे सद्गुण हैं जो महान चरित्र का निर्माण करते हैं।'
    ]
  ],
  [
    'Vocabulary',
    'voh-KAB-yuh-ler-ee (व्होकॅब्युलरी)',
    'Noun',
    'Classes 4–6',
    'Academic & School',
    'The body of words used in a particular language or known to an individual.',
    'शब्दसंग्रह (शब्दसंपत्ती)',
    'एखाद्या भाषेतील किंवा व्यक्तीला माहित असलेल्या एकूण शब्दांचा साठा.',
    'शब्द-भंडार (शब्दावली)',
    'किसी भाषा में प्रयुक्त होने वाले या किसी व्यक्ति द्वारा जाने गए शब्दों का संग्रह।',
    [['Lexicon', 'Word power', 'Glossary'], ['शब्दसाठा', 'शब्दावली'], ['शब्दावली', 'शब्दकोश']],
    [['Wordlessness'], ['शब्ददारिद्र्य'], ['शब्दहीनता']],
    [
      'Learning five new words in English, Marathi, and Hindi daily builds a strong vocabulary.',
      'दररोज इंग्रजी, मराठी आणि हिंदीतील पाच नवीन शब्द शिकल्याने उत्तम शब्दसंग्रह तयार होतो.',
      'प्रतिदिन अंग्रेज़ी, मराठी और हिंदी के पाँच नए शब्द सीखने से मजबूत शब्द-भंडार बनता है।'
    ]
  ],

  // ================= W =================
  [
    'Welfare',
    'WEL-fair (वेलफेअर)',
    'Noun',
    'Classes 7–10',
    'History, Civics & Geography',
    'The health, happiness, safety, and prosperity of a person or community.',
    'कल्याण (हित)',
    'समाजाचे किंवा जनतेचे आरोग्य, सुख आणि प्रगती जपण्याचे कार्य.',
    'कल्याण (हित)',
    'व्यक्ति या समाज के स्वास्थ्य, सुख, सुरक्षा और उन्नति की स्थिति।',
    [['Well-being', 'Benefit', 'Good'], ['लोककल्याण', 'भले'], ['भलाई', 'लोकहित', 'मंगल']],
    [['Harm', 'Misery', 'Neglect'], ['नुकसान', 'दुर्दशा'], ['अहित', 'नुकसान']],
    [
      'Chhatrapati Shivaji Maharaj always worked for the welfare of the common farmers and citizens.',
      'छत्रपती शिवाजी महाराजांनी नेहमीच सामान्य शेतकरी आणि रयतेच्या कल्याणासाठी कार्य केले.',
      'छत्रपति शिवाजी महाराज ने सदैव सामान्य किसानों और प्रजा के कल्याण के लिए कार्य किया।'
    ]
  ],
  [
    'Wisdom',
    'WIZ-duhm (विझडम)',
    'Noun',
    'Classes 4–6',
    'Values, Character & Emotions',
    'The ability to use knowledge and experience sensibly to make right judgements.',
    'शहाणपण (सुज्ञपणा / प्रज्ञा)',
    'मिळालेल्या ज्ञानाचा आणि अनुभवाचा योग्य वेळी योग्य वापर करण्याची समज.',
    'बुद्धिमत्ता (प्रज्ञा / समझदारी)',
    'प्राप्त ज्ञान और अनुभव का सही समय पर उचित उपयोग करने की विवेकपूर्ण समझ।',
    [['Sagacity', 'Prudence', 'Insight'], ['विवेक', 'समजूतदारपणा', 'प्रज्ञा'], ['विवेक', 'समझदारी', 'दूरदर्शिता']],
    [['Folly', 'Foolishness', 'Ignorance'], ['मूर्खपणा', 'अविचार'], ['मूर्खता', 'अविवेक']],
    [
      'Knowledge is knowing facts, while wisdom is knowing how to apply them for good.',
      'माहिती असणे म्हणजे ज्ञान, तर त्या ज्ञानाचा चांगल्या कामासाठी वापर करणे म्हणजे शहाणपण.',
      'तथ्यों को जानना ज्ञान है, जबकि उनका भलाई के लिए सही उपयोग करना बुद्धिमत्ता है।'
    ]
  ],
  [
    'Wonder',
    'WUN-der (वंडर)',
    'Noun',
    'Classes 1–3',
    'Daily Life & Communication',
    'A feeling of amazement and admiration, caused by something beautiful or remarkable.',
    'आश्चर्य (नवल)',
    'एखादी अद्भुत किंवा सुंदर गोष्ट पाहून मनात निर्माण होणारे कौतुक व कुतूहल.',
    'आश्चर्य (अचंभा)',
    'किसी अद्भुत या सुंदर वस्तु को देखकर मन में उठने वाला विस्मय और प्रशंसा का भाव।',
    [['Amazement', 'Marvel', 'Awe'], ['अचंबा', 'कौतुक', 'चमत्कार'], ['विस्मय', 'चमत्कार', 'कौतूहल']],
    [['Indifference', 'Boredom'], ['नीरसता'], ['उदासीनता']],
    [
      'Children looked at the stars and planets in the planetarium with wonder.',
      'तारांगणातील तारे आणि ग्रह पाहून मुलांना मोठे आश्चर्य वाटले.',
      'बच्चों ने तारामंडल में तारों और ग्रहों को आश्चर्य के साथ देखा।'
    ]
  ],

  // ================= X =================
  [
    'Xylem',
    'ZY-luhm (झायलम)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'The vascular tissue in plants that conducts water and dissolved minerals upward from the roots to the leaves.',
    'जलवाहिनी (झायलम)',
    'वनस्पतींच्या मुळांकडून पाणी आणि क्षार पानांपर्यंत पोहोचवणारी अंतर्गत उती.',
    'दारु (ज़ाइलम / जल-संवहनी ऊतक)',
    'पौधों का वह संवहनी ऊतक जो जड़ों से जल और खनिज लवणों को पत्तियों तक पहुँचाता है।',
    [['Water-conducting tissue'], ['वनस्पती जलवाहिनी'], ['जल-संवहनी ऊतक']],
    [['Phloem (food-conducting tissue)'], ['रसवाहिनी (फ्लोएम)'], ['पोषवाह (फ्लोएम)']],
    [
      'In plants, xylem transports water from roots while phloem transports prepared food.',
      'वनस्पतींमध्ये जलवाहिनी (झायलम) मुळांकडून पाणी वाहून नेते, तर रसवाहिनी तयार अन्न पोहोचवते.',
      'पौधों में ज़ाइलम जड़ों से जल ले जाता है जबकि फ्लोएम तैयार भोजन का परिवहन करता है।'
    ]
  ],
  [
    'Xylophone',
    'ZY-luh-fohn (झायलोफोन)',
    'Noun',
    'Classes 1–3',
    'Academic & School',
    'A musical instrument played by striking a row of wooden or metal bars of graduated length with mallets.',
    'काष्ठतरंग (झायलोफोन)',
    'वेगवेगळ्या लांबीच्या लाकडी किंवा धातूच्या पट्ट्यांवर छोट्या काठ्यांनी आघात करून वाजवले जाणारे वाद्य.',
    'काष्ठतरंग (ज़ाइलोफ़ोन)',
    'लकड़ी या धातु की क्रमिक पट्टियों पर छोटी छड़ियों से प्रहार करके बजाया जाने वाला वाद्ययंत्र।',
    [['Musical chimes', 'Marimba'], ['सूरपट्टी वाद्य'], ['संगीत वाद्ययंत्र']],
    [['Silence'], ['शांतता'], ['मौन']],
    [
      'The young student played a cheerful melody on the xylophone during the school assembly.',
      'छोट्या विद्यार्थ्याने शाळेच्या परिपाठात झायलोफोनवर एक सुंदर धून वाजवली.',
      'नन्हे विद्यार्थी ने विद्यालय की प्रार्थना सभा में ज़ाइलोफ़ोन पर एक मधुर धुन बजाई।'
    ]
  ],

  // ================= Y =================
  [
    'Yield',
    'YEELD (यील्ड)',
    'Verb',
    'Classes 7–10',
    'History, Civics & Geography',
    'To produce or provide a natural, agricultural, or educational result.',
    'उत्पन्न देणे (फळ देणे)',
    'शेतीतून पीक मिळणे किंवा केलेल्या परिश्रमातून चांगले फळ प्राप्त होणे.',
    'उत्पादन देना (फल देना)',
    'कृषि से फसल प्राप्त होना या परिश्रम के परिणामस्वरूप अच्छा फल मिलना।',
    [['Produce', 'Generate', 'Harvest'], ['उत्पादन देणे', 'प्राप्त होणे'], ['उपज देना', 'प्रदान करना']],
    [['Consume', 'Withhold'], ['वाया जाणे'], ['नष्ट करना']],
    [
      'Good seeds and timely rainfall yield a rich harvest for farmers.',
      'उत्तम बियाणे आणि वेळेवर पडलेला पाऊस शेतकऱ्यांना भरघोस पीक (उत्पन्न) देतात.',
      'अच्छे बीज और समय पर हुई वर्षा किसानों को भरपूर फसल (उपज) देते हैं।'
    ]
  ],
  [
    'Youth',
    'YOOTH (यूथ)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'The period between childhood and adult age; young people collectively.',
    'तारुण्य (युवाशक्ती)',
    'बालपण आणि प्रौढत्व यामधील उत्साहाचा काळ; देशाची तरुण पिढी.',
    'युवावस्था (युवा शक्ति)',
    'बचपन और प्रौढ़ावस्था के बीच का ऊर्जावान काल; देश की युवा पीढ़ी।',
    [['Young people', 'Adolescence'], ['तरुण पिढी', 'युवक'], ['तरुणाई', 'युवा पीढ़ी']],
    [['Old age', 'Senescence'], ['वृद्धापकाळ'], ['वृद्धावस्था']],
    [
      'Swami Vivekananda believed that educated and courageous youth can transform the nation.',
      'सुशिक्षित आणि धाडसी युवाशक्ती देशात मोठे परिवर्तन घडवू शकते, असा स्वामी विवेकानंदांचा विश्वास होता.',
      'स्वामी विवेकानंद का विश्वास था कि शिक्षित और साहसी युवा राष्ट्र को बदल सकते हैं।'
    ]
  ],

  // ================= Z =================
  [
    'Zeal',
    'ZEEL (झील)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'Great energy or enthusiasm in pursuit of a cause or an objective.',
    'उत्साह (तळमळ / जोम)',
    'एखादे चांगले काम किंवा अभ्यास पूर्ण करण्यासाठी मनात असलेला प्रचंड उत्साह आणि ऊर्जा.',
    'उत्साह (उमंग / जोश)',
    'किसी लक्ष्य या श्रेष्ठ कार्य को पूरा करने के लिए मन में रहने वाला तीव्र उत्साह और लगन।',
    [['Enthusiasm', 'Passion', 'Eagerness'], ['जोश', 'उमेद', 'आस्था'], ['जोश', 'तत्परता', 'लगन']],
    [['Apathy', 'Indifference', 'Laziness'], ['निरुत्साह', 'आळस'], ['उदासीनता', 'आलस्य']],
    [
      'Students participated in the school science exhibition with great zeal.',
      'विद्यार्थ्यांनी शाळेच्या विज्ञान प्रदर्शनात मोठ्या उत्साहाने सहभाग घेतला.',
      'विद्यार्थियों ने विद्यालय की विज्ञान प्रदर्शनी में बड़े उत्साह के साथ भाग लिया।'
    ]
  ],
  [
    'Zenith',
    'ZEE-nith (झेनिथ)',
    'Noun',
    'Classes 7–10',
    'Academic & School',
    'The highest point or peak of success, power, or celestial position.',
    'शिखर (कळस)',
    'यशाचा, प्रगतीचा किंवा आकाशातील सर्वोच्च बिंदू.',
    'शिखर (चरम बिंदु)',
    'सफलता, उन्नति या आकाश का सर्वोच्च बिंदु।',
    [['Peak', 'Pinnacle', 'Summit'], ['सर्वोच्च पातळी', 'उच्चांक'], ['चोटी', 'पराकाष्ठा', 'शीर्ष']],
    [['Nadir', 'Bottom', 'Base'], ['तळ', 'खालची पातळी'], ['अधोबिंदु', 'तल']],
    [
      'Continuous dedication takes a student to the zenith of academic excellence.',
      'सातत्यपूर्ण समर्पणामुळे विद्यार्थी शैक्षणिक उत्कृष्टतेच्या शिखरावर पोहोचतो.',
      'निरंतर समर्पण विद्यार्थी को शैक्षणिक उत्कृष्टता के शिखर पर पहुँचाता है।'
    ]
  ],
  [
    'Zero',
    'ZEER-oh (झीरो)',
    'Noun',
    'Classes 1–3',
    'Mathematics & Logic',
    'The numerical symbol 0 denoting the absence of quantity; a foundational Indian mathematical contribution.',
    'शून्य',
    'कोणतेही परिमाण नसल्याचे दर्शवणारा ० हा अंक; भारतीय गणितज्ञांचे जगाला लाभलेले महान योगदान.',
    'शून्य',
    'मात्रा के अभाव को दर्शाने वाला अंक 0; विश्व को भारतीय गणित की महान देन।',
    [['Nought', 'Cipher', 'Nil'], ['पूज्य (०)'], ['सिफ़र (०)']],
    [['Infinity'], ['अनंत'], ['अनंत']],
    [
      'Ancient Indian mathematician Aryabhata and Brahmagupta gave the rules of zero to the world.',
      'प्राचीन भारतीय गणितज्ञ आर्यभट्ट आणि ब्रह्मगुप्त यांनी जगाला शून्याचे नियम दिले.',
      'प्राचीन भारतीय गणितज्ञ आर्यभट्ट और ब्रह्मगुप्त ने विश्व को शून्य के नियम दिए।'
    ]
  ],

  // ================= ADDITIONAL CORE SCHOOL VOCABULARY (A-Z EXPANSION) =================
  [
    'Addition',
    'uh-DISH-uhn (अॅडिशन)',
    'Noun',
    'Classes 1–3',
    'Mathematics & Logic',
    'The mathematical process of combining two or more numbers to find their total sum.',
    'बेरीज',
    'दोन किंवा अधिक संख्या एकत्र करून त्यांची एकूण संख्या काढण्याची गणिती क्रिया.',
    'जोड़ (योग)',
    'दो या दो से अधिक संख्याओं को मिलाकर कुल योग निकालने की गणितीय क्रिया।',
    [['Sum', 'Total', 'Plus'], ['एकूण', 'जमा'], ['योग', 'कुल']],
    [['Subtraction', 'Deduction'], ['वजाबाकी'], ['घटाव']],
    [
      'The addition of fifteen and二十-five gives a sum of forty.',
      'पंधरा आणि पंचवीस यांची बेरीज चाळीस येते.',
      'पंद्रह और पच्चीस का जोड़ चालीस होता है।'
    ]
  ],
  [
    'Subtraction',
    'suhb-TRAK-shuhn (सबट्रॅक्शन)',
    'Noun',
    'Classes 1–3',
    'Mathematics & Logic',
    'The mathematical operation of taking one number or amount away from another.',
    'वजाबाकी',
    'एका संख्येतून दुसरी संख्या कमी करून उरलेली संख्या काढण्याची क्रिया.',
    'घटाव (व्यवकलन)',
    'एक संख्या में से दूसरी संख्या को कम करके शेष ज्ञात करने की प्रक्रिया।',
    [['Deduction', 'Minus', 'Difference'], ['कमी करणे', 'फरक'], ['अंतर', 'कम करना']],
    [['Addition'], ['बेरीज'], ['जोड़']],
    [
      'We checked our subtraction answer by adding the difference back.',
      'आम्ही आलेल्या फरकाची पुन्हा बेरीज करून आमचे वजाबाकीचे उत्तर तपासून पाहिले.',
      'हमने अंतर को वापस जोड़कर अपने घटाव के उत्तर की जाँच की।'
    ]
  ],
  [
    'Multiplication',
    'mul-tuh-pli-KAY-shuhn (मल्टिप्लिकेशन)',
    'Noun',
    'Classes 1–3',
    'Mathematics & Logic',
    'The mathematical operation of repeated addition of a number.',
    'गुणाकार',
    'एखाद्या संख्येची ठराविक वेळा केलेली पुनरावृत्ती बेरीज; पट करण्याची क्रिया.',
    'गुणा (गुणन)',
    'किसी संख्या को निश्चित बार बार-बार जोड़ने की संक्षिप्त गणितीय प्रक्रिया।',
    [['Product', 'Times'], ['पट करणे', 'गुणन'], ['गुणनफल']],
    [['Division'], ['भागाकार'], ['भाग']],
    [
      'Knowing multiplication tables from 2 to 20 makes calculation very fast.',
      '२ ते २० पर्यंतचे पाढे पाठ असल्यामुळे गुणाकाराची आकडेमोड खूप वेगाने होते.',
      '2 से 20 तक पहाड़े याद होने से गुणा की गणना बहुत तेज़ हो जाती है।'
    ]
  ],
  [
    'Division',
    'di-VIZH-uhn (डिव्हिजन)',
    'Noun',
    'Classes 1–3',
    'Mathematics & Logic',
    'The process of splitting a number or quantity into equal parts or groups.',
    'भागाकार (विभाजन)',
    'दिलेल्या संख्येचे किंवा वस्तूंचे समान भागांत वाटप करण्याची गणिती क्रिया.',
    'भाग (विभाजन)',
    'किसी संख्या या मात्रा को बराबर भागों में बाँटने की गणितीय क्रिया।',
    [['Sharing equally', 'Partition'], ['समान वाटणी', 'विभागणी'], ['बँटवारा', 'विभाजन']],
    [['Multiplication'], ['गुणाकार'], ['गुणा']],
    [
      'In division, the number being divided is called the dividend.',
      'भागाकारात ज्या संख्येला भागले जाते तिला भाज्य म्हणतात.',
      'भाग की क्रिया में जिस संख्या को विभाजित किया जाता है उसे भाज्य कहते हैं।'
    ]
  ],
  [
    'Perimeter',
    'puh-RIM-i-ter (पेरिमीटर)',
    'Noun',
    'Classes 4–6',
    'Mathematics & Logic',
    'The continuous line forming the boundary of a closed geometric figure, or its total length.',
    'परिमिती',
    'बंदिस्त भौमितिक आकृतीच्या सर्व बाजूंच्या लांबीची एकूण बेरीज.',
    'परिमाप',
    'किसी बंद ज्यामितीय आकृति की सभी भुजाओं की कुल लंबाई का योग।',
    [['Boundary length', 'Circumference'], ['कडेची एकूण लांबी', 'घेरा'], ['घेरा', 'सीमा की लंबाई']],
    [['Interior area'], ['अंतर्गत भाग'], ['आंतरिक भाग']],
    [
      'The perimeter of a square is four times the length of its side.',
      'चौरसाची परिमिती त्याच्या एका बाजूच्या लांबीच्या चौपट असते.',
      'वर्ग का परिमाप उसकी एक भुजा की लंबाई का चार गुना होता है।'
    ]
  ],
  [
    'Peninsula',
    'puh-NIN-suh-luh (पेनिन्सुला)',
    'Noun',
    'Classes 7–10',
    'History, Civics & Geography',
    'A large landmass surrounded by water on three sides and connected to main land on one side.',
    'द्वीपकल्प',
    'तिन्ही बाजूंनी पाण्याने वेढलेला आणि एका बाजूने जमिनीला जोडलेला विशाल भूभाग.',
    'प्रायद्वीप',
    'तीन ओर से जल से घिरा हुआ और एक ओर से मुख्य भूमि से जुड़ा हुआ विशाल भू-भाग।',
    [['Headland', 'Cape'], ['तीन बाजूंनी समुद्र असलेला प्रदेश'], ['तीन ओर समुद्र से घिरा भूभाग']],
    [['Island', 'Inland'], ['बेट', 'अंतर्गत भूभाग'], ['द्वीप']],
    [
      'Southern India is a large peninsula surrounded by the Arabian Sea, the Indian Ocean, and the Bay of Bengal.',
      'दक्षिण भारत हा अरबी समुद्र, हिंदी महासागर आणि बंगालच्या उपसागराने वेढलेला एक मोठा द्वीपकल्प आहे.',
      'दक्षिण भारत अरब सागर, हिंद महासागर और बंगाल की खाड़ी से घिरा एक विशाल प्रायद्वीप है।'
    ]
  ],
  [
    'Photosensitive',
    'foh-toh-SEN-si-tiv (फोटोसेन्सिटिव्ह)',
    'Adjective',
    'Classes 7–10',
    'Science & Nature',
    'Responding or reacting chemically or electrically to visible light.',
    'प्रकाशसंवेदी',
    'प्रकाशाच्या संपर्कात आल्यावर प्रतिक्रिया देणारा किंवा बदल दर्शवणारा.',
    'प्रकाश-संवेदी',
    'प्रकाश के प्रति संवेदनशील या प्रकाश पड़ने पर प्रतिक्रिया देने वाला।',
    [['Light-sensitive'], ['प्रकाशाला प्रतिसाद देणारा'], ['प्रकाश-ग्राही']],
    [['Light-resistant'], ['प्रकाशरोधक'], ['प्रकाश-असंवेदी']],
    [
      'The retina of the human eye contains photosensitive cells called rods and cones.',
      'मानवी डोळ्याच्या दृष्टीपटलावर प्रकाशसंवेदी पेशी असतात.',
      'मानव नेत्र के दृष्टिपटल (रेटिना) में प्रकाश-संवेदी कोशिकाएँ होती हैं।'
    ]
  ],
];

const CUSTOM_DICTIONARY_STORAGE_KEY = 'msz_custom_trilingual_dictionary_v1';

function buildEntryFromTuple(tuple: RawWordTuple, index: number): TrilingualWordEntry {
  const [
    english,
    pronunciation,
    partOfSpeech,
    classGroup,
    category,
    englishMeaning,
    marathiWord,
    marathiMeaning,
    hindiWord,
    hindiMeaning,
    [enSyn, mrSyn, hiSyn],
    [enAnt, mrAnt, hiAnt],
    [enEx, mrEx, hiEx],
  ] = tuple;

  // Clean accidental non-ASCII typo in example if any
  const cleanEnEx = enEx.replace('二十-five', 'twenty-five');

  return {
    id: `dict-word-${index + 1}-${english.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    english,
    pronunciation,
    partOfSpeech,
    classGroup,
    category,
    englishMeaning,
    marathiWord,
    marathiMeaning,
    hindiWord,
    hindiMeaning,
    synonyms: {
      english: enSyn,
      marathi: mrSyn,
      hindi: hiSyn,
    },
    antonyms: {
      english: enAnt,
      marathi: mrAnt,
      hindi: hiAnt,
    },
    examples: {
      english: cleanEnEx,
      marathi: mrEx,
      hindi: hiEx,
    },
    letter: english.charAt(0).toUpperCase(),
  };
}

export const INITIAL_TRILINGUAL_DICTIONARY: TrilingualWordEntry[] = RAW_DICTIONARY_TUPLES.map(
  (t, idx) => buildEntryFromTuple(t, idx)
).sort((a, b) => a.english.localeCompare(b.english));

export function loadTrilingualDictionaryEntries(): TrilingualWordEntry[] {
  if (typeof window === 'undefined') return INITIAL_TRILINGUAL_DICTIONARY;
  try {
    const raw = localStorage.getItem(CUSTOM_DICTIONARY_STORAGE_KEY);
    if (!raw) return INITIAL_TRILINGUAL_DICTIONARY;
    const customList = JSON.parse(raw) as TrilingualWordEntry[];
    if (!Array.isArray(customList) || customList.length === 0) {
      return INITIAL_TRILINGUAL_DICTIONARY;
    }
    const mergedMap = new Map<string, TrilingualWordEntry>();
    for (const item of INITIAL_TRILINGUAL_DICTIONARY) {
      mergedMap.set(item.english.toLowerCase(), item);
    }
    for (const custom of customList) {
      if (custom && custom.english) {
        mergedMap.set(custom.english.toLowerCase(), {
          ...custom,
          letter: custom.english.charAt(0).toUpperCase(),
        });
      }
    }
    return Array.from(mergedMap.values()).sort((a, b) => a.english.localeCompare(b.english));
  } catch {
    return INITIAL_TRILINGUAL_DICTIONARY;
  }
}

export function saveCustomDictionaryEntry(newEntry: TrilingualWordEntry): TrilingualWordEntry[] {
  if (typeof window === 'undefined') return INITIAL_TRILINGUAL_DICTIONARY;
  try {
    const raw = localStorage.getItem(CUSTOM_DICTIONARY_STORAGE_KEY);
    const existingCustom: TrilingualWordEntry[] = raw ? JSON.parse(raw) : [];
    const filtered = existingCustom.filter(
      (item) => item.english.toLowerCase() !== newEntry.english.toLowerCase()
    );
    const updatedCustom = [...filtered, newEntry];
    localStorage.setItem(CUSTOM_DICTIONARY_STORAGE_KEY, JSON.stringify(updatedCustom));
  } catch {
    // Ignore storage quota errors
  }
  return loadTrilingualDictionaryEntries();
}

/**
 * Returns deterministic Daily Vocabulary words (5 words rotated automatically every calendar day).
 */
export function getDailyVocabularyWords(
  allWords: TrilingualWordEntry[],
  dateObj: Date = new Date(),
  count: number = 5
): TrilingualWordEntry[] {
  if (allWords.length === 0) return [];
  const startOfYear = new Date(dateObj.getFullYear(), 0, 0);
  const diff = dateObj.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const startIndex = (dayOfYear * count) % allWords.length;

  const result: TrilingualWordEntry[] = [];
  for (let i = 0; i < Math.min(count, allWords.length); i++) {
    result.push(allWords[(startIndex + i) % allWords.length]);
  }
  return result;
}
