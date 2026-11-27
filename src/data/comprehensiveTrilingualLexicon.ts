import {
  INITIAL_TRILINGUAL_DICTIONARY,
  TrilingualWordEntry,
  DictionaryPartOfSpeech,
  DictionaryClassGroup,
  DictionaryTopicCategory,
} from './trilingualDictionaryData';

export type DictionaryLanguage = 'en' | 'mr' | 'hi';

export type TranslationDirection =
  | 'en-mr'
  | 'en-hi'
  | 'mr-en'
  | 'hi-en'
  | 'hi-mr'
  | 'mr-hi';

export interface WordFormsInfo {
  baseForm: string;
  pluralOrInflected?: string;
  pastTense?: string;
  pastParticiple?: string;
  presentParticiple?: string;
  thirdPersonSingular?: string;
  comparative?: string;
  superlative?: string;
  derivedForms: string[];
  marathiForms: string[];
  hindiForms: string[];
}

export interface ComprehensiveDictionaryEntry extends TrilingualWordEntry {
  simpleMeaning: {
    english: string;
    marathi: string;
    hindi: string;
  };
  detailedMeaning: {
    english: string;
    marathi: string;
    hindi: string;
  };
  wordForms: WordFormsInfo;
  romanMarathiKeys: string[];
  romanHindiKeys: string[];
  sourceAttribution: string;
}

export const TRANSLATION_DIRECTIONS: Array<{
  id: TranslationDirection;
  label: string;
  shortLabel: string;
  sourceLang: DictionaryLanguage;
  targetLang: DictionaryLanguage;
  description: string;
}> = [
  {
    id: 'en-mr',
    label: 'English → Marathi (इंग्रजी ते मराठी)',
    shortLabel: 'EN → मराठी',
    sourceLang: 'en',
    targetLang: 'mr',
    description: 'Search English words to view Marathi translations, meanings & examples',
  },
  {
    id: 'en-hi',
    label: 'English → Hindi (अंग्रेज़ी से हिन्दी)',
    shortLabel: 'EN → हिन्दी',
    sourceLang: 'en',
    targetLang: 'hi',
    description: 'Search English words to view Hindi translations, meanings & examples',
  },
  {
    id: 'mr-en',
    label: 'Marathi → English (मराठी ते इंग्रजी)',
    shortLabel: 'मराठी → EN',
    sourceLang: 'mr',
    targetLang: 'en',
    description: 'Search Marathi words to view English translations, meanings & examples',
  },
  {
    id: 'hi-en',
    label: 'Hindi → English (हिन्दी से अंग्रेज़ी)',
    shortLabel: 'हिन्दी → EN',
    sourceLang: 'hi',
    targetLang: 'en',
    description: 'Search Hindi words to view English translations, meanings & examples',
  },
  {
    id: 'hi-mr',
    label: 'Hindi → Marathi (हिन्दी से मराठी)',
    shortLabel: 'हिन्दी → मराठी',
    sourceLang: 'hi',
    targetLang: 'mr',
    description: 'Search Hindi words to view Marathi equivalents, meanings & examples',
  },
  {
    id: 'mr-hi',
    label: 'Marathi → Hindi (मराठी ते हिन्दी)',
    shortLabel: 'मराठी → हिन्दी',
    sourceLang: 'mr',
    targetLang: 'hi',
    description: 'Search Marathi words to view Hindi equivalents, meanings & examples',
  },
];

// Compact tuple for additional verified curriculum entries:
// [english, pronunciation, partOfSpeech, classGroup, category, simpleEn, detailedEn, marathiWord, simpleMr, detailedMr, hindiWord, simpleHi, detailedHi, [enSyn, mrSyn, hiSyn], [enAnt, mrAnt, hiAnt], [enEx, mrEx, hiEx], derivedEnForms]
type ExtendedLexiconTuple = [
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
  string,
  string,
  string,
  [string[], string[], string[]],
  [string[], string[], string[]],
  [string, string, string],
  string[]
];

const EXTENDED_CURRICULUM_LEXICON_TUPLES: ExtendedLexiconTuple[] = [
  // ================= SCIENCE, PHYSICS, CHEMISTRY & BIOLOGY =================
  [
    'Acceleration',
    'ak-sel-uh-RAY-shuhn (अॅक्सिलरेशन)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'The rate at which the velocity of a moving object changes over time.',
    'In physics, acceleration is a vector quantity defined as the rate of change of velocity with respect to time, measured in metres per second squared (m/s²).',
    'त्वरण',
    'काळानुसार गतिमान वस्तूच्या वेगात होणारा बदलाचा दर.',
    'भौतिकशास्त्रात एकक काळात वस्तूच्या वेगात होणाऱ्या बदलास त्वरण म्हणतात. याचे एकक मीटर प्रति सेकंद वर्ग (m/s²) आहे.',
    'त्वरण',
    'समय के साथ किसी गतिशील वस्तु के वेग में होने वाले परिवर्तन की दर।',
    'भौतिक विज्ञान में प्रति इकाई समय में वस्तु के वेग में होने वाले परिवर्तन को त्वरण कहते हैं। इसका मात्रक मीटर प्रति सेकंड वर्ग (m/s²) है।',
    [['Speeding up', 'Rate of velocity change'], ['वेगवाढ', 'गतीवर्धन'], ['वेग-वृद्धि', 'गतिवर्धन']],
    [['Deceleration', 'Retardation'], ['अववेग', 'मंदन'], ['मंदन', 'अवत्वरण']],
    [
      'The acceleration of a freely falling body near Earth is 9.8 m/s².',
      'पृथ्वीवर मुक्तपणे पडणाऱ्या वस्तूचे गुरुत्वीय त्वरण ९.८ मी/से² असते.',
      'पृथ्वी पर मुक्त रूप से गिरती हुई वस्तु का गुरुत्वीय त्वरण 9.8 मी/से² होता है।',
    ],
    ['Accelerate (Verb)', 'Accelerated (Adjective)', 'Accelerator (Noun)'],
  ],
  [
    'Acid',
    'AS-id (अॅसिड)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'A chemical substance with a sour taste that turns blue litmus paper red and has a pH less than 7.',
    'A chemical compound that donates hydrogen ions (H⁺) in an aqueous solution, reacts with bases to form salts, and turns blue litmus indicator red.',
    'आम्ल',
    'चवीला आंबट असणारा आणि निळा लिटमस कागद लाल करणारा रासायनिक पदार्थ.',
    'पाण्याच्या द्रावणात हायड्रोजन आयन (H⁺) देणारा आणि आम्लारीशी अभिक्रिया करून क्षार व पाणी तयार करणारा रासायनिक पदार्थ (pH ७ पेक्षा कमी).',
    'अम्ल',
    'स्वाद में खट्टा रासायनिक पदार्थ जो नीले लिटमस पत्र को लाल कर देता है।',
    'वह रासायनिक यौगिक जो जलीय विलयन में हाइड्रोजन आयन (H⁺) प्रदान करता है तथा जिसका pH मान 7 से कम होता है।',
    [['Acidic compound'], ['आम्लधर्मी पदार्थ'], ['अम्लीय पदार्थ']],
    [['Base', 'Alkali'], ['आम्लारी', 'अल्कली'], ['क्षार', 'भस्म']],
    [
      'Lemon juice contains citric acid, which gives it a sour taste.',
      'लिंबाच्या रसात सायट्रिक आम्ल असते, ज्यामुळे त्याला आंबट चव येते.',
      'नींबू के रस में साइट्रिक अम्ल होता है, जिससे उसका स्वाद खट्टा होता है।',
    ],
    ['Acidic (Adjective)', 'Acidity (Noun)', 'Acidify (Verb)'],
  ],
  [
    'Adaptation',
    'ad-uhp-TAY-shuhn (अॅडॅप्टेशन)',
    'Noun',
    'Classes 4–6',
    'Science & Nature',
    'A special feature or behaviour that helps a plant or animal survive in its environment.',
    'In biology, adaptation is the evolutionary process whereby an organism develops physical or behavioural traits that enable it to survive and reproduce in its habitat.',
    'अनुकूलन',
    'सजीवांना त्यांच्या परिसरात टिकून राहण्यास मदत करणारी शारीरिक किंवा वर्तनातील विशेष रचना.',
    'प्रत्येक सजीव ज्या परिसरात व वातावरणात राहतो, तिथे जगण्यासाठी त्याच्या शरीरात व जीवनपद्धतीत काळाच्या ओघात झालेल्या बदलांना अनुकूलन म्हणतात.',
    'अनुकूलन',
    'किसी जीव को अपने पर्यावरण में जीवित रहने में सहायता करने वाली विशेष शारीरिक या व्यवहारिक विशेषता।',
    'जीव विज्ञान में वह प्रक्रिया जिसके द्वारा कोई जीव अपने प्राकृतिक आवास में जीवित रहने और प्रजनन करने के लिए स्वयं को ढाल लेता है।',
    [['Adjustment', 'Acclimatization'], ['समायोजन', 'जुळवून घेणे'], ['समायोजन', 'ढलना']],
    [['Maladaptation'], ['विसंगती'], ['अननुकूलन']],
    [
      'Camels have remarkable adaptations to survive in dry desert climates.',
      'वाळवंटी प्रदेशात टिकून राहण्यासाठी उंटामध्ये उत्तम शारीरिक अनुकूलन झालेले असते.',
      'रेगिस्तान की शुष्क जलवायु में जीवित रहने के लिए ऊँटों में अद्भुत अनुकूलन पाया जाता है।',
    ],
    ['Adapt (Verb)', 'Adaptive (Adjective)', 'Adaptable (Adjective)'],
  ],
  [
    'Alkali',
    'AL-kuh-ly (अल्कली)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'A base that dissolves in water and turns red litmus paper blue.',
    'A water-soluble chemical base (usually a hydroxide of alkali or alkaline earth metals) that yields hydroxide ions (OH⁻) in solution and has a pH greater than 7.',
    'अल्कली (पाण्यात विरघळणारी आम्लारी)',
    'पाण्यात विरघळणारी आणि लाल लिटमस कागद निळा करणारी आम्लारी.',
    'पाण्यात पूर्णपणे विरघळून हायड्रॉक्साइड आयन (OH⁻) तयार करणारी आम्लारी, जसे सोडियम हायड्रॉक्साइड (NaOH).',
    'क्षार (जल में घुलनशील भस्म)',
    'जल में घुलने वाला भस्म जो लाल लिटमस पत्र को नीला कर देता है।',
    'वह रासायनिक भस्म जो जल में घुलकर हाइड्रॉक्साइड आयन (OH⁻) उत्पन्न करता है और जिसका pH मान 7 से अधिक होता है।',
    [['Soluble base'], ['पाण्यात विरघळणारी आम्लारी'], ['घुलनशील भस्म']],
    [['Acid'], ['आम्ल'], ['अम्ल']],
    [
      'Sodium hydroxide is a strong alkali used in making soap.',
      'सोडियम हायड्रॉक्साइड ही साबण बनवण्यासाठी वापरली जाणारी तीव्र अल्कली आहे.',
      'सोडियम हाइड्रॉक्साइड साबुन बनाने में प्रयुक्त होने वाला एक प्रबल क्षार है।',
    ],
    ['Alkaline (Adjective)', 'Alkalinity (Noun)'],
  ],
  [
    'Alloy',
    'AL-oy (अॅलॉय)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'A uniform mixture of two or more metals, or a metal and a non-metal.',
    'A homogeneous metallic substance composed of two or more elements (at least one being a metal), melted and mixed together to improve strength or prevent corrosion.',
    'संमिश्र',
    'दोन किंवा अधिक धातूंचे अथवा धातू व अधातूंचे एकजीव मिश्रण.',
    'दोन किंवा अधिक धातू अथवा धातू व अधातू ठरावीक प्रमाणात वितळवून एकत्र केल्याने तयार होणाऱ्या एकजिनसी मिश्रणास संमिश्र म्हणतात (उदा. पितळ, पोलाद).',
    'मिश्रधातु',
    'दो या दो से अधिक धातुओं अथवा एक धातु और अधातु का समांगी मिश्रण।',
    'धातुओं की कठोरता बढ़ाने और जंग से बचाने के लिए दो या अधिक तत्वों को मिलाकर बनाई गई समांगी धातु (जैसे पीतल, इस्पात)।',
    [['Metallic mixture', 'Blend'], ['धातूंचे मिश्रण'], ['धातु-मिश्रण']],
    [['Pure metal'], ['शुद्ध धातू'], ['शुद्ध धातु']],
    [
      'Bronze is an alloy made from copper and tin.',
      'कांस्य (ब्रॉन्झ) हे तांबे आणि कथील यांपासून बनवलेले संमिश्र आहे.',
      'कांस्य तांबे और टिन से बनी एक मिश्रधातु है।',
    ],
    ['Alloyed (Adjective)', 'Alloying (Noun)'],
  ],
  [
    'Amplitude',
    'AM-pli-tyood (अॅम्प्लिट्यूड)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'The maximum distance a vibrating wave moves from its central resting position.',
    'In wave physics, amplitude is the maximum displacement of a point on a vibrating body or wave measured from its equilibrium (mean) position; it determines the loudness of sound.',
    'आयाम',
    'कंपन पावणाऱ्या वस्तूचे तिच्या मध्य स्थितीपासून झालेले कमाल विस्थापन.',
    'तरंग किंवा दोलन करणाऱ्या वस्तूचे तिच्या मूळ संतुलन स्थितीपासून एका बाजूला होणारे जास्तीत जास्त विस्थापन म्हणजे आयाम होय.',
    'आयाम',
    'कंपन करती हुई वस्तु का अपनी माध्य स्थिति से अधिकतम विस्थापन।',
    'भौतिकी में किसी तरंग या दोलन करते कण का अपनी साम्यावस्था से किसी एक ओर होने वाला अधिकतम विस्थापन, जिससे ध्वनि की प्रबलता निर्धारित होती है।',
    [['Magnitude', 'Wave height'], ['कमाल विस्थापन', 'विस्तार'], ['अधिकतम विस्थापन', 'विस्तार']],
    [['Zero displacement'], ['शून्य विस्थापन'], ['शून्य विस्थापन']],
    [
      'The loudness of a sound wave depends on its amplitude.',
      'ध्वनीची तीव्रता (मोठेपणा) ध्वनी तरंगाच्या आयामावर अवलंबून असते.',
      'ध्वनि तरंग की प्रबलता उसके आयाम पर निर्भर करती है।',
    ],
    ['Amplitudes (Plural)'],
  ],
  [
    'Atmosphere',
    'AT-muhs-feer (अॅटमॉस्फिअर)',
    'Noun',
    'Classes 4–6',
    'Science & Nature',
    'The protective layer of gases surrounding the Earth or another planet.',
    'The envelope of gases—primarily nitrogen (78%), oxygen (21%), carbon dioxide, and water vapour—held around Earth by gravitational force, protecting life from harmful radiation.',
    'वातावरण',
    'पृथ्वीभोवती असलेले हवेचे व विविध वायूंचे संरक्षक आवरण.',
    'पृथ्वीच्या गुरुत्वाकर्षणामुळे पृथ्वीभोवती टिकून राहिलेले नायट्रोजन, ऑक्सिजन, कार्बन डायऑक्साइड व बाष्प यांचे वायुरूप आवरण.',
    'वायुमंडल',
    'पृथ्वी के चारों ओर फैला हुआ गैसों का सुरक्षात्मक आवरण।',
    'गुरुत्वाकर्षण बल के कारण पृथ्वी को घेरे हुए नाइट्रोजन, ऑक्सीजन, कार्बन डाइऑक्साइड आदि गैसों की परत जो जीवों की रक्षा करती है।',
    [['Air envelope', 'Sky'], ['हवेचे आवरण'], ['वायु-आवरण']],
    [['Vacuum'], ['निर्वात पोकळी'], ['निर्वात']],
    [
      'The ozone layer in the upper atmosphere shields Earth from ultraviolet rays.',
      'उच्च वातावरणातील ओझोनचा थर पृथ्वीचे अतिनील किरणांपासून रक्षण करतो.',
      'ऊपरी वायुमंडल में स्थित ओज़ोन परत पृथ्वी को पराबैंगनी किरणों से बचाती है।',
    ],
    ['Atmospheric (Adjective)'],
  ],
  [
    'Atom',
    'AT-uhm (अॅटम)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'The smallest basic building block of an element that can take part in a chemical reaction.',
    'The fundamental unit of matter consisting of a dense central nucleus (protons and neutrons) surrounded by a cloud of negatively charged electrons.',
    'अणू',
    'रासायनिक अभिक्रियेत भाग घेऊ शकणारा मूलद्रव्याचा सर्वात लहानात लहान कण.',
    'प्रोटॉन, न्यूट्रॉन असलेल्या केंद्रकाभोवती फिरणाऱ्या इलेक्ट्रॉनने बनलेला मूलद्रव्याचा मूलभूत सूक्ष्म घटक.',
    'परमाणु',
    'किसी तत्व का वह सूक्ष्मतम कण जो रासायनिक अभिक्रिया में भाग ले सकता है।',
    'पदार्थ की मूलभूत इकाई जिसके केंद्रक में प्रोटॉन व न्यूट्रॉन होते हैं तथा चारों ओर इलेक्ट्रॉन चक्कर लगाते हैं।',
    [['Particle', 'Basic unit'], ['सूक्ष्म कण', 'मूलकण'], ['सूक्ष्म कण', 'मूल इकाई']],
    [['Whole universe'], ['समग्र विश्व'], ['समग्र ब्रह्मांड']],
    [
      'A single molecule of water is made of two hydrogen atoms and one oxygen atom.',
      'पाण्याचा एक रेणू हायड्रोजनचे दोन अणू आणि ऑक्सिजनचा एक अणू मिळून बनतो.',
      'जल का एक अणु हाइड्रोजन के दो परमाणुओं और ऑक्सीजन के एक परमाणु से मिलकर बनता है।',
    ],
    ['Atoms (Plural)', 'Atomic (Adjective)', 'Subatomic (Adjective)'],
  ],
  [
    'Biodiversity',
    'by-oh-dy-VUR-si-tee (बायोडायव्हर्सिटी)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'The variety of different plant and animal species living in a particular habitat or on Earth.',
    'Biological diversity encompassing genetic variation, species richness, and ecosystem variety across terrestrial, marine, and freshwater environments.',
    'जैवविविधता',
    'पृथ्वीवर किंवा एखाद्या विशिष्ट परिसंस्थेत आढळणाऱ्या वनस्पती, प्राणी व सूक्ष्मजीवांची विविधता.',
    'निसर्गातील विविध प्रजाती, त्यांच्यातील जनुकीय फरक आणि परिसंस्थांची समृद्ध विविधता म्हणजे जैवविविधता होय.',
    'जैव विविधता',
    'पृथ्वी या किसी विशेष आवास में पाए जाने वाले पेड़-पौधों और जीव-जंतुओं की विविधता।',
    'किसी पारिस्थितिकी तंत्र में उपस्थित विभिन्न जीव-जंतुओं, वनस्पतियों और सूक्ष्मजीवों की प्रजातियों की समृद्ध विविधता।',
    [['Biological variety', 'Ecological richness'], ['सजीव विविधता'], ['जैविक विविधता']],
    [['Monoculture', 'Extinction'], ['एकसुरीपणा', 'नामशेषता'], ['एकल संस्कृति', 'विलुप्ति']],
    [
      'The Western Ghats of India are famous for their rich biodiversity.',
      'भारतातील पश्चिम घाट त्याच्या समृद्ध जैवविविधतेसाठी प्रसिद्ध आहे.',
      'भारत का पश्चिमी घाट अपनी समृद्ध जैव विविधता के लिए प्रसिद्ध है।',
    ],
    ['Biodiverse (Adjective)'],
  ],
  [
    'Catalyst',
    'KAT-uh-list (कॅटॅलिस्ट)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'A substance that speeds up a chemical reaction without being used up itself.',
    'In chemistry, a catalyst is an agent that increases the rate of a chemical reaction by lowering the activation energy without undergoing any permanent chemical change itself.',
    'उत्प्रेरक',
    'स्वतःमध्ये कोणताही रासायनिक बदल न होता रासायनिक अभिक्रियेचा वेग वाढवणारा पदार्थ.',
    'ज्या पदार्थाच्या केवळ उपस्थितीमुळे रासायनिक अभिक्रियेचा वेग वाढतो, पण जो स्वतः अभिक्रियेत खर्च होत नाही त्याला उत्प्रेरक म्हणतात.',
    'उत्प्रेरक',
    'वह पदार्थ जो स्वयं परिवर्तित हुए बिना किसी रासायनिक अभिक्रिया की गति को बढ़ा देता है।',
    'रसायन विज्ञान में वह पदार्थ जिसकी उपस्थिति मात्र से रासायनिक अभिक्रिया की दर बढ़ जाती है किंतु वह स्वयं अपरिवर्तित रहता है।',
    [['Accelerator', 'Enzyme'], ['वेगवर्धक', 'विकर'], ['गतिवर्धक']],
    [['Inhibitor'], ['अवरोधक', 'मंदक'], ['संदमक', 'अवरोधक']],
    [
      'Nickel is used as a catalyst in the hydrogenation of vegetable oils.',
      'वनस्पती तेलाच्या हायड्रोजनीकरण प्रक्रियेत निकेलचा वापर उत्प्रेरक म्हणून केला जातो.',
      'वनस्पति तेलों के हाइड्रोजनीकरण में निकल का उपयोग उत्प्रेरक के रूप में किया जाता है।',
    ],
    ['Catalyze (Verb)', 'Catalytic (Adjective)', 'Catalysis (Noun)'],
  ],
  [
    'Cell',
    'SEL (सेल)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'The smallest structural and functional unit of all living organisms.',
    'In biology, the cell is the basic membrane-bound unit that contains the fundamental molecules of life and of which all living things are composed.',
    'पेशी',
    'सर्व सजीवांच्या शरीराचे रचनात्मक आणि कार्यात्मक असलेले सर्वात लहान एकक.',
    'सजीवांचे शरीर ज्या सूक्ष्म घटकांनी बनलेले असते आणि ज्यातून सर्व जैविक क्रिया पार पडतात, त्या मूलभूत घटकास पेशी म्हणतात.',
    'कोशिका',
    'सभी जीवधारियों के शरीर की सबसे छोटी संरचनात्मक और कार्यात्मक इकाई।',
    'जीव विज्ञान में जीवों के शरीर की वह मूलभूत सूक्ष्म इकाई जिससे सभी ऊतक और अंग निर्मित होते हैं।',
    [['Biological unit'], ['जैविक घटक'], ['जैविक इकाई']],
    [['Whole organism'], ['पूर्ण सजीव'], ['संपूर्ण जीव']],
    [
      'Robert Hooke discovered the cell in 1665 while observing a thin slice of cork.',
      'रॉबर्ट हुक यांनी १६६५ मध्ये बुचाच्या पातळ कापाचे निरीक्षण करताना पेशीचा शोध लावला.',
      'रॉबर्ट हुक ने 1665 में कॉर्क के पतले टुकड़े का निरीक्षण करते समय कोशिका की खोज की थी।',
    ],
    ['Cells (Plural)', 'Cellular (Adjective)', 'Unicellular (Adjective)', 'Multicellular (Adjective)'],
  ],
  [
    'Chlorophyll',
    'KLOR-uh-fil (क्लोरोफिल)',
    'Noun',
    'Classes 4–6',
    'Science & Nature',
    'The green pigment in plant leaves that absorbs sunlight to make food.',
    'The green photosynthetic pigment found in the chloroplasts of plants and algae that captures light energy required for photosynthesis.',
    'हरितद्रव्य',
    'वनस्पतींच्या पानांमध्ये असणारे हिरवे रंगद्रव्य, जे सूर्यप्रकाश शोषून अन्न तयार करण्यास मदत करते.',
    'वनस्पतींच्या हरितलवकांमध्ये आढळणारे हिरवे रंगद्रव्य, ज्याच्या मदतीने वनस्पती प्रकाशसंश्लेषण प्रक्रियेद्वारे स्वतःचे अन्न तयार करतात.',
    'पर्णहरित (क्लोरोफिल)',
    'पौधों की पत्तियों में पाया जाने वाला हरा वर्णक जो सूर्य का प्रकाश सोखकर भोजन बनाता है।',
    'पौधों के हरितलवक में उपस्थित हरा वर्णक जो प्रकाश-संश्लेषण की प्रक्रिया के लिए सौर ऊर्जा को अवशोषित करता है।',
    [['Leaf green pigment'], ['पानांतील हिरवे रंगद्रव्य'], ['हरित वर्णक']],
    [['Colorless'], ['रंगहीन'], ['रंगहीन']],
    [
      'Leaves look green because they contain chlorophyll.',
      'पानांमध्ये हरितद्रव्य असल्यामुळे ती हिरवी दिसतात.',
      'पत्तियों में पर्णहरित (क्लोरोफिल) होने के कारण वे हरी दिखाई देती हैं।',
    ],
    ['Chloroplast (Related Noun)'],
  ],
  [
    'Circuit',
    'SUR-kit (सर्किट)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'A complete closed path through which an electric current can flow.',
    'An interconnected closed loop of electrical components (such as a battery, wires, switch, and bulb/resistor) allowing electric charge to flow continuously.',
    'विद्युत परिपथ',
    'विद्युत धारा वाहण्यासाठी तयार केलेला सलग आणि बंद मार्ग.',
    'विद्युत घट, वाहक तारा, कळ आणि विजेचा दिवा किंवा रोध यांना जोडून तयार होणाऱ्या विद्युत धारेच्या पूर्ण बंद मार्गास विद्युत परिपथ म्हणतात.',
    'विद्युत परिपथ',
    'वह पूर्ण और बंद पथ जिससे होकर विद्युत धारा प्रवाहित होती है।',
    'बैटरी, चालक तार, कुंजी और बल्ब आदि विद्युत उपकरणों को जोड़ने से बनने वाला बंद मार्ग जिसमें विद्युत धारा बहती है।',
    [['Electrical loop', 'Closed path'], ['विद्युत मार्ग'], ['विद्युत पथ']],
    [['Disconnection'], ['खंडित मार्ग'], ['खुला पथ']],
    [
      'When the switch is turned on, the electric circuit is complete and the bulb glows.',
      'जेव्हा कळ (स्विच) सुरू केली जाते, तेव्हा विद्युत परिपथ पूर्ण होतो आणि दिवा लागतो.',
      'जब स्विच ऑन किया जाता है, तो विद्युत परिपथ पूर्ण हो जाता है और बल्ब जल उठता है।',
    ],
    ['Circuits (Plural)', 'Circuitry (Noun)'],
  ],
  [
    'Climate',
    'KLY-mit (क्लायमेट)',
    'Noun',
    'Classes 4–6',
    'History, Civics & Geography',
    'The average weather conditions of a region observed over many years.',
    'The long-term pattern of temperature, humidity, atmospheric pressure, wind, and rainfall in a geographic region averaged over 30 or more years.',
    'हवामान',
    'एखाद्या प्रदेशातील अनेक वर्षांच्या दैनंदिन हवेच्या स्थितीची सरासरी.',
    'कोणत्याही भौगोलिक प्रदेशातील तापमान, पर्जन्यमान, आर्द्रता आणि वारे यांच्या सुमारे ३० ते ३५ वर्षांच्या दीर्घकालीन सरासरी स्थितीला हवामान म्हणतात.',
    'जलवायु',
    'किसी क्षेत्र में कई वर्षों तक देखी गई मौसम की औसत स्थिति।',
    'किसी विशाल भौगोलिक क्षेत्र में लंबे समय (लगभग 30 वर्ष या अधिक) के तापमान, वर्षा, आर्द्रता और वायु की औसत अवस्था को जलवायु कहते हैं।',
    [['Long-term weather'], ['दीर्घकालीन हवेची स्थिती'], ['मौसम की दीर्घकालीन स्थिति']],
    [['Instantaneous weather'], ['तात्पुरती हवा'], ['तात्कालिक मौसम']],
    [
      'India has a tropical monsoon climate.',
      'भारताचे हवामान उष्णकटिबंधीय मान्सून प्रकारचे आहे.',
      'भारत की जलवायु उष्णकटिबंधीय मानसूनी प्रकार की है।',
    ],
    ['Climatic (Adjective)', 'Climatology (Noun)'],
  ],
  [
    'Combustion',
    'kuhm-BUS-chuhn (कम्बशन)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'The chemical process of burning a substance in the presence of oxygen to produce heat and light.',
    'A rapid exothermic chemical reaction between a fuel and an oxidant (usually atmospheric oxygen) accompanied by the release of heat and often light/flame.',
    'ज्वलन',
    'ऑक्सिजनच्या उपस्थितीत पदार्थ जळून उष्णता व प्रकाश निर्माण होण्याची रासायनिक प्रक्रिया.',
    'ज्या रासायनिक प्रक्रियेत पदार्थ हवेतील ऑक्सिजनशी अभिक्रिया करून जळतो आणि उष्णता व प्रकाश बाहेर टाकतो, तिला ज्वलन म्हणतात.',
    'दहन',
    'ऑक्सीजन की उपस्थिति में किसी पदार्थ के जलने तथा ऊष्मा और प्रकाश उत्पन्न करने की रासायनिक प्रक्रिया।',
    'वह रासायनिक प्रक्रम जिसमें कोई पदार्थ ऑक्सीजन से अभिक्रिया कर जलता है और ऊष्मा तथा प्रकाश प्रदान करता है।',
    [['Burning', 'Ignition'], ['जळण्याची क्रिया', 'दहन'], ['जलना', 'प्रज्वलन']],
    [['Extinguishing'], ['विझवणे'], ['बुझाना']],
    [
      'Oxygen is essential for the combustion of fuel.',
      'इंधनाच्या ज्वलनासाठी ऑक्सिजन वायू अत्यंत आवश्यक असतो.',
      'ईंधन के दहन के लिए ऑक्सीजन गैस अत्यंत आवश्यक है।',
    ],
    ['Combustible (Adjective)', 'Combust (Verb)'],
  ],
  [
    'Compound',
    'KOM-pownd (कम्पाउंड)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'A pure substance formed when two or more elements combine chemically in a fixed proportion.',
    'In chemistry, a compound is a substance composed of identical molecules consisting of atoms of two or more chemical elements bonded together in a definite ratio by mass.',
    'संयुग',
    'दोन किंवा अधिक मूलद्रव्यांच्या ठरावीक प्रमाणातील रासायनिक संयोगातून तयार झालेला पदार्थ.',
    'दोन किंवा अधिक मूलद्रव्ये वजनी प्रमाणात रासायनिक बंधाने एकत्र येऊन तयार होणाऱ्या नवीन गुणधर्माच्या शुद्ध पदार्थास संयुग म्हणतात (उदा. पाणी H₂O, मीठ NaCl).',
    'यौगिक',
    'दो या दो से अधिक तत्वों के एक निश्चित अनुपात में रासायनिक संयोग से बना शुद्ध पदार्थ।',
    'रसायन विज्ञान में वह शुद्ध पदार्थ जो दो या अधिक तत्वों के निश्चित द्रव्यमान अनुपात में रासायनिक आबंध द्वारा जुड़ने से बनता है (जैसे जल H₂O)।',
    [['Chemical combination'], ['रासायनिक पदार्थ'], ['रासायनिक संयोजन']],
    [['Element'], ['मूलद्रव्य'], ['तत्व']],
    [
      'Common salt (sodium chloride) is a chemical compound of sodium and chlorine.',
      'खाण्याचे मीठ (सोडियम क्लोराइड) हे सोडियम आणि क्लोरीन यांचे रासायनिक संयुग आहे.',
      'साधारण नमक (सोडियम क्लोराइड) सोडियम और क्लोरीन का एक रासायनिक यौगिक है।',
    ],
    ['Compounds (Plural)'],
  ],
  [
    'Condensation',
    'kon-den-SAY-shuhn (कन्डेन्सेशन)',
    'Noun',
    'Classes 4–6',
    'Science & Nature',
    'The process by which water vapour cools down and changes back into liquid water.',
    'The physical phase change of matter from the gaseous state (vapour) into the liquid state upon cooling, essential for cloud formation in the water cycle.',
    'संघनन (सांद्रीभवन)',
    'पाण्याची वाफ थंड होऊन तिचे पुन्हा द्रवरूप पाण्यात रूपांतर होण्याची क्रिया.',
    'वायू किंवा बाष्पाला थंडावा मिळाल्यामुळे त्याचे द्रवात रूपांतर होण्याच्या भौतिक प्रक्रियेला संघनन किंवा सांद्रीभवन म्हणतात; यामुळेच आकाशात ढग तयार होतात.',
    'संघनन',
    'जलवाष्प के ठंडा होकर पुनः द्रव जल में बदलने की प्रक्रिया।',
    'भौतिक रूप से किसी गैस या वाष्प के ठंडा होने पर द्रव अवस्था में परिवर्तित होने की प्रक्रिया, जिससे जल-चक्र में बादल बनते हैं।',
    [['Liquefaction of vapour'], ['सांद्रीभवन', 'बाष्पाचे पाणी होणे'], ['द्रवण', 'वाष्प का जल बनना']],
    [['Evaporation', 'Vaporization'], ['बाष्पीभवन'], ['वाष्पीकरण']],
    [
      'Clouds are formed in the sky by the condensation of water vapour.',
      'हवेतील पाण्याच्या वाफेचे संघनन (सांद्रीभवन) होऊन आकाशात ढग तयार होतात.',
      'आकाश में जलवाष्प के संघनन से बादल बनते हैं।',
    ],
    ['Condense (Verb)', 'Condensed (Adjective)'],
  ],
  [
    'Conductor',
    'kuhn-DUK-tur (कन्डक्टर)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'A material that allows heat or electricity to flow through it easily.',
    'In physics, a conductor is a substance (such as copper, silver, or aluminium) containing free charge carriers that permit electric current or thermal energy to pass readily.',
    'सुवाहक',
    'ज्या पदार्थातून उष्णता किंवा वीज सहजपणे वाहू शकते असा पदार्थ.',
    'ज्या पदार्थांमधून विद्युत धारा किंवा उष्णता अत्यंत सहजतेने एका टोकाकडून दुसऱ्या टोकाकडे प्रवाहित होते, त्यांना सुवाहक म्हणतात (उदा. तांबे, चांदी, अॅल्युमिनियम).',
    'सुचालक',
    'वह पदार्थ जिससे होकर ऊष्मा या विद्युत धारा आसानी से प्रवाहित हो सकती है।',
    'भौतिक विज्ञान में वे पदार्थ जिनमें मुक्त इलेक्ट्रॉन होते हैं और जिनसे विद्युत या ऊष्मा सुगमता से प्रवाहित होती है (जैसे तांबा, चांदी)।',
    [['Thermal/Electrical carrier'], ['विद्युतवाहक', 'उष्णतावाहक'], ['विद्युत चालक']],
    [['Insulator', 'Non-conductor'], ['दुर्वाहक', 'विसंवाहक'], ['कुचालक', 'विद्युतरोधी']],
    [
      'Copper is an excellent conductor of electricity and is used in electrical wiring.',
      'तांबे हा विजेचा उत्तम सुवाहक असल्याने त्याचा वापर विजेच्या तारांमध्ये केला जातो.',
      'तांबा विद्युत का एक उत्तम सुचालक है, इसलिए इसका उपयोग बिजली के तारों में किया जाता है।',
    ],
    ['Conduct (Verb)', 'Conductivity (Noun)', 'Conductive (Adjective)'],
  ],
  [
    'Conservation',
    'kon-sur-VAY-shuhn (कॉन्झर्व्हेशन)',
    'Noun',
    'Classes 4–6',
    'Science & Nature',
    'The careful protection and preservation of natural resources, wildlife, and the environment.',
    'The ethical and scientific management, protection, and sustainable use of natural resources—including forests, water, soil, and energy—to prevent depletion.',
    'संवर्धन (संरक्षण)',
    'नैसर्गिक साधनसंपत्ती, वन्यजीव आणि पर्यावरण यांचे काळजीपूर्वक केलेले जतन व रक्षण.',
    'पाणी, जंगले, मृदा, ऊर्जा आणि वन्यजीव यांचा अपव्यय टाळून भविष्यासाठी त्यांचे शास्त्रशुद्ध पद्धतीने जतन व रक्षण करणे म्हणजे संवर्धन होय.',
    'संरक्षण',
    'प्राकृतिक संसाधनों, वन्यजीवों और पर्यावरण की सावधानीपूर्वक रक्षा और बचाव।',
    'जल, वन, मिट्टी, ऊर्जा और वन्यजीवों को नष्ट होने से बचाना तथा उनका विवेकपूर्ण एवं सतत उपयोग करना संरक्षण कहलाता है।',
    [['Preservation', 'Protection'], ['जतन', 'रक्षण'], ['बचाव', 'सुरक्षा']],
    [['Destruction', 'Wastage'], ['ऱ्हास', 'नासाडी'], ['विनाश', 'अपव्यय']],
    [
      'Rainwater harvesting is an effective method of water conservation.',
      'पावसाच्या पाण्याचे संकलन करणे हा जलसंवर्धनाचा अत्यंत प्रभावी मार्ग आहे.',
      'वर्षा जल संचयन जल संरक्षण की एक प्रभावी विधि है।',
    ],
    ['Conserve (Verb)', 'Conservationist (Noun)'],
  ],
  [
    'Constitution',
    'kon-sti-TOO-shuhn (कॉन्स्टिट्यूशन)',
    'Noun',
    'Classes 7–10',
    'History, Civics & Geography',
    'The supreme written book of fundamental laws and principles by which a country is governed.',
    'The foundational legal document of a sovereign nation that establishes the structure of government, separation of powers, and fundamental rights and duties of citizens.',
    'संविधान (राज्यघटना)',
    'देशाचा राज्यकारभार ज्या मूलभूत कायद्यांनुसार व तत्त्वांनुसार चालतो तो सर्वोच्च लिखित ग्रंथ.',
    'राष्ट्राची शासनव्यवस्था, नागरिकांचे मूलभूत हक्क, कर्तव्ये आणि मार्गदर्शक तत्त्वे स्पष्ट करणारा देशाचा सर्वोच्च कायदा म्हणजे संविधान (राज्यघटना) होय.',
    'संविधान',
    'मौलिक कानूनों और सिद्धांतों का वह सर्वोच्च लिखित ग्रंथ जिसके अनुसार किसी देश का शासन चलता है।',
    'किसी राष्ट्र का सर्वोच्च विधान जो शासन की संरचना, शक्तियों के विभाजन तथा नागरिकों के मौलिक अधिकारों एवं कर्तव्यों को निर्धारित करता है।',
    [['Fundamental law', 'Charter'], ['राज्यघटना', 'मूळ कायदा'], ['सर्वोच्च विधान']],
    [['Lawlessness', 'Anarchy'], ['अराजकता'], ['अराजकता']],
    [
      'Dr. Babasaheb Ambedkar is revered as the chief architect of the Constitution of India.',
      'डॉ. बाबासाहेब आंबेडकर यांना भारतीय संविधानाचे मुख्य शिल्पकार म्हणून गौरवले जाते.',
      'डॉ. बाबासाहेब आंबेडकर को भारतीय संविधान के मुख्य शिल्पकार के रूप में सम्मानित किया जाता है।',
    ],
    ['Constitutional (Adjective)', 'Constitutionalism (Noun)'],
  ],

  // ================= MATHEMATICS, GEOMETRY & LOGIC =================
  [
    'Acute',
    'uh-KYOOT (अक्यूट)',
    'Adjective',
    'Classes 4–6',
    'Mathematics & Logic',
    'In geometry, an angle that measures less than 90 degrees; also means sharp or severe.',
    'Describing an angle strictly greater than 0° and less than 90° (a right angle); in general usage, it denotes keen perception or sharp intensity.',
    'लघु (लघुकोन / तीव्र)',
    'भूमितीमध्ये ९० अंशांपेक्षा कमी माप असलेला (कोन); तसेच तीक्ष्ण किंवा तीव्र.',
    'ज्या कोनाचे माप ० अंशापेक्षा जास्त आणि ९० अंशापेक्षा (काटकोनापेक्षा) कमी असते अशा कोनाला लघुकोन म्हणतात.',
    'न्यून (न्यूनकोण / तीव्र)',
    'ज्यामिति में 90 अंश (डिग्री) से कम माप वाला कोण; अथवा तीक्ष्ण/तीव्र।',
    'वह कोण जिसका माप 0° से अधिक और 90° (समकोण) से कम होता है, न्यूनकोण कहलाता है।',
    [['Sharp', 'Keen'], ['तीक्ष्ण', 'लघुकोन'], ['तीक्ष्ण', 'न्यूनकोण']],
    [['Obtuse', 'Dull'], ['विशाल (विशालकोन)', 'मंद'], ['अधिक (अधिककोण)', 'मंद']],
    [
      'An angle measuring 45 degrees is an acute angle.',
      '४५ अंश मापाचा कोन हा लघुकोन असतो.',
      '45 अंश के माप वाला कोण एक न्यूनकोण होता है।',
    ],
    ['Acutely (Adverb)', 'Acuteness (Noun)'],
  ],
  [
    'Algebra',
    'AL-juh-bruh (अल्जेब्रा)',
    'Noun',
    'Classes 7–10',
    'Mathematics & Logic',
    'A branch of mathematics that uses letters and symbols to represent numbers and quantities in equations.',
    'The major branch of mathematics dealing with variables, algebraic expressions, polynomials, and equations to solve generalized numerical problems.',
    'बीजगणित',
    'अज्ञात संख्या दर्शवण्यासाठी अक्षरांचा (चलांचा) आणि चिन्हांचा वापर करणारी गणिताची शाखा.',
    'संख्यांऐवजी अक्षरे (उदा. x, y, a, b) वापरून समीकरणे व सूत्रे मांडणारी आणि सोडवणारी गणिताची महत्त्वाची शाखा.',
    'बीजगणित',
    'गणित की वह शाखा जिसमें अज्ञात संख्याओं को दर्शाने के लिए अक्षरों (चरों) और प्रतीकों का प्रयोग किया जाता है।',
    'चरों, बहुपदों और समीकरणों के माध्यम से गणितीय समस्याओं को हल करने वाली गणित की प्रमुख शाखा।',
    [['Symbolic mathematics'], ['चल-गणित'], ['अक्षर-गणित']],
    [['Arithmetic'], ['अंकगणित'], ['अंकगणित']],
    [
      'In algebra, we solve equations to find the value of unknown variables like x and y.',
      'बीजगणितात आपण x आणि y सारख्या अज्ञात चलांची किंमत शोधण्यासाठी समीकरणे सोडवतो.',
      'बीजगणित में हम x और y जैसे अज्ञात चरों का मान ज्ञात करने के लिए समीकरण हल करते हैं।',
    ],
    ['Algebraic (Adjective)', 'Algebraically (Adverb)'],
  ],
  [
    'Area',
    'AIR-ee-uh (एरिया)',
    'Noun',
    'Classes 4–6',
    'Mathematics & Logic',
    'The amount of flat surface space covered inside the boundary of a two-dimensional shape.',
    'In geometry, area is the measure of the two-dimensional surface enclosed within a plane figure, expressed in square units (such as cm² or m²).',
    'क्षेत्रफळ',
    'कोणत्याही सपाट बंदिस्त आकृतीने व्यापलेल्या पृष्ठभागाचे माप.',
    'द्विमितीय बंदिस्त आकृतीने सपाट पृष्ठभागावर व्यापलेली एकूण जागा म्हणजे त्या आकृतीचे क्षेत्रफळ होय. याचे एकक चौरस सेमी किंवा चौरस मीटर असते.',
    'क्षेत्रफल',
    'किसी द्वि-आयामी बंद आकृति द्वारा घेरे गए समतल सतह का माप।',
    'ज्यामिति में किसी समतल आकृति की सीमाओं के भीतर घिरे हुए कुल स्थान का माप, जिसे वर्ग इकाई (जैसे वर्ग मीटर) में मापा जाता है।',
    [['Surface extent', 'Region'], ['व्यापलेली जागा', 'विस्तार'], ['सतह का माप', 'विस्तार']],
    [['Perimeter'], ['परिमिती'], ['परिमाप']],
    [
      'The area of a rectangle is calculated by multiplying its length by its breadth.',
      'आयताचे क्षेत्रफळ काढण्यासाठी त्याच्या लांबीला रुंदीने गुणले जाते.',
      'आयत का क्षेत्रफल उसकी लंबाई और चौड़ाई को गुणा करके निकाला जाता है।',
    ],
    ['Areas (Plural)'],
  ],
  [
    'Average',
    'AV-rij (अॅव्हरेज)',
    'Noun',
    'Classes 4–6',
    'Mathematics & Logic',
    'The central value obtained by dividing the sum of a set of numbers by the total count of numbers.',
    'In mathematics and statistics, the arithmetic mean calculated by adding a group of quantities together and dividing by the number of quantities.',
    'सरासरी',
    'दिलेल्या सर्व संख्यांच्या बेरजेला एकूण संख्यांनी भागल्यावर मिळणारी मधली किंमत.',
    'दिलेल्या सामग्रीतील सर्व प्राप्तांकांची बेरीज करून तिला एकूण प्राप्तांकांच्या संख्येने भागले असता मिळणाऱ्या भागाकारास सरासरी (मध्यमान) म्हणतात.',
    'औसत',
    'दी गई संख्याओं के योग को कुल संख्याओं की गिनती से भाग देने पर प्राप्त होने वाला मध्य मान।',
    'गणित और सांख्यिकी में दिए गए आंकड़ों के कुल योग को आंकड़ों की कुल संख्या से विभाजित करने पर प्राप्त समांतर माध्य।',
    [['Arithmetic mean', 'Norm'], ['मध्यमान', 'सरासरी मूल्य'], ['माध्य', 'समांतर माध्य']],
    [['Extreme'], ['टोकाची किंमत'], ['चरम मान']],
    [
      'The average of 10, 20, and 30 is 20.',
      '१०, २० आणि ३० या तीन संख्यांची सरासरी २० आहे.',
      '10, 20 और 30 का औसत 20 है।',
    ],
    ['Averages (Plural)', 'Averaged (Verb)'],
  ],
  [
    'Circumference',
    'sur-KUM-fuh-ruhns (सर्कम्फरन्स)',
    'Noun',
    'Classes 7–10',
    'Mathematics & Logic',
    'The total distance around the outer curved boundary of a circle.',
    'In geometry, the perimeter of a circle or ellipse, calculated using the formula C = 2πr (where r is the radius) or C = πd (where d is the diameter).',
    'परीघ',
    'वर्तुळाच्या बाहेरील गोलाकार कडेची एकूण लांबी.',
    'वर्तुळाच्या केंद्राभोवती असलेल्या पूर्ण वक्र सीमारेषेची लांबी (वर्तुळाची परिमिती) म्हणजे परीघ होय. याचे सूत्र 2πr आहे.',
    'परिधि',
    'किसी वृत्त की बाहरी गोलाकार सीमा की कुल लंबाई।',
    'ज्यामिति में किसी वृत्त के चारों ओर की बंद वक्र रेखा की कुल दूरी, जिसकी गणना 2πr सूत्र से की जाती है।',
    [['Circle perimeter', 'Boundary'], ['वर्तुळाची परिमिती', 'घेरा'], ['वृत्त का परिमाप', 'घेरा']],
    [['Center'], ['वर्तुळकेंद्र'], ['वृत्त-केंद्र']],
    [
      'We use the formula 2πr to find the circumference of a circle.',
      'वर्तुळाचा परीघ शोधण्यासाठी आपण 2πr या सूत्राचा वापर करतो.',
      'वृत्त की परिधि ज्ञात करने के लिए हम 2πr सूत्र का उपयोग करते हैं।',
    ],
    ['Circumferential (Adjective)'],
  ],
  [
    'Denominator',
    'di-NOM-i-nay-tur (डिनॉमिनेटर)',
    'Noun',
    'Classes 4–6',
    'Mathematics & Logic',
    'The bottom number in a fraction that shows into how many equal parts the whole is divided.',
    'In a mathematical fraction (a/b), the denominator (b) is the divisor written below the horizontal fraction bar indicating total equal subdivisions of a unit.',
    'छेद',
    'अपूर्णांकातील आडव्या रेषेखालील संख्या, जी एका पूर्ण वस्तूचे एकूण किती समान भाग केले आहेत ते दर्शवते.',
    'व्यवहारी अपूर्णांकात (अंश/छेद) रेषेच्या खाली लिहिल्या जाणाऱ्या संख्येस छेद म्हणतात.',
    'हर',
    'भिन्न की रेखा के नीचे लिखी जाने वाली संख्या जो बताती है कि पूर्ण के कुल कितने बराबर भाग किए गए हैं।',
    'गणितीय भिन्न (अंश/हर) में बटा रेखा के नीचे स्थित भाजक संख्या को हर कहते हैं।',
    [['Divisor in fraction'], ['अपूर्णांकाचा छेद'], ['भिन्न का भाजक']],
    [['Numerator'], ['अंश'], ['अंश']],
    [
      'In the fraction 3/8, 3 is the numerator and 8 is the denominator.',
      '३/८ या अपूर्णांकात ३ हा अंश आहे आणि ८ हा छेद आहे.',
      'भिन्न 3/8 में, 3 अंश है और 8 हर है।',
    ],
    ['Denominators (Plural)'],
  ],
  [
    'Diameter',
    'dy-AM-i-tur (डायमीटर)',
    'Noun',
    'Classes 4–6',
    'Mathematics & Logic',
    'A straight line passing from one side of a circle to the other through its center.',
    'In geometry, the longest chord of a circle that passes directly through the center, equal to twice the length of the radius (d = 2r).',
    'व्यास',
    'वर्तुळकेंद्रातून जाणारी आणि वर्तुळावरील दोन बिंदूंना जोडणारी सरळ रेषा (सर्वात मोठी जीवा).',
    'वर्तुळाच्या केंद्रातून जाणाऱ्या जीवेला वर्तुळाचा व्यास म्हणतात. व्यासाची लांबी त्रिज्येच्या दुप्पट (d = 2r) असते.',
    'व्यास',
    'वृत्त के केंद्र से होकर गुजरने वाली और परिधि के दो बिंदुओं को मिलाने वाली सीधी रेखा।',
    'वृत्त की सबसे बड़ी जीवा जो केंद्र से होकर जाती है तथा जिसकी लंबाई त्रिज्या की दोगुनी (d = 2r) होती है।',
    [['Central chord'], ['सर्वात मोठी जीवा'], ['केंद्रीय जीवा']],
    [['Radius'], ['त्रिज्या'], ['त्रिज्या']],
    [
      'The diameter of a circle is always twice its radius.',
      'वर्तुळाचा व्यास हा नेहमी त्याच्या त्रिज्येच्या दुप्पट असतो.',
      'किसी वृत्त का व्यास सदैव उसकी त्रिज्या का दोगुना होता है।',
    ],
    ['Diameters (Plural)', 'Diametric (Adjective)'],
  ],
  [
    'Equation',
    'i-KWAY-zhuhn (इक्वेशन)',
    'Noun',
    'Classes 7–10',
    'Mathematics & Logic',
    'A mathematical statement showing that two expressions are equal, using an equals sign (=).',
    'In mathematics, a symbolic statement asserting the equality of two algebraic expressions connected by the equality sign (=).',
    'समीकरण',
    'दोन गणितीय राशी समान आहेत हे बरोबरच्या (=) चिन्हाने दर्शवणारे विधान.',
    'बरोबरच्या (=) चिन्हाने जोडलेल्या दोन बैजिक राशींच्या समानतेला गणितीय भाषेत समीकरण म्हणतात.',
    'समीकरण',
    'बराबर (=) के चिह्न का उपयोग करके दो गणितीय व्यंजकों की समानता दर्शाने वाला कथन।',
    'गणित में समता चिह्न (=) द्वारा जुड़े दो बीजीय व्यंजकों की बराबरी को व्यक्त करने वाला कथन।',
    [['Mathematical equality', 'Formula'], ['गणितीय समानता', 'सूत्र'], ['गणितीय समता', 'सूत्र']],
    [['Inequality'], ['असमानता'], ['असमिका']],
    [
      'To solve the linear equation 2x + 4 = 10, we find that x equals 3.',
      '2x + 4 = 10 हे एकचल समीकरण सोडवल्यावर आपल्याला x ची किंमत ३ मिळते.',
      'रैखिक समीकरण 2x + 4 = 10 को हल करने पर हमें x का मान 3 प्राप्त होता है।',
    ],
    ['Equations (Plural)', 'Equate (Verb)'],
  ],
  [
    'Fraction',
    'FRAK-shuhn (फ्रॅक्शन)',
    'Noun',
    'Classes 4–6',
    'Mathematics & Logic',
    'A numerical quantity that represents one or more equal parts of a whole.',
    'In arithmetic, a number expressed as a quotient of an integer numerator divided by a non-zero integer denominator (a/b), representing a part of a whole.',
    'अपूर्णांक',
    'एका पूर्ण वस्तूचा किंवा संख्येचा एक किंवा अधिक समान भाग दर्शवणारी संख्या.',
    'अंश आणि छेद अशा स्वरूपात लिहिली जाणारी व पूर्ण संख्येचा भाग दर्शवणारी गणितीय संख्या म्हणजे अपूर्णांक होय.',
    'भिन्न',
    'किसी पूर्ण वस्तु या संख्या के एक या अधिक बराबर भागों को दर्शाने वाली संख्या।',
    'गणित में अंश और हर (a/b) के रूप में व्यक्त की जाने वाली संख्या जो किसी पूर्ण इकाई के हिस्से को प्रकट करती है।',
    [['Part', 'Portion', 'Ratio'], ['भाग', 'हिस्सा'], ['अंश', 'हिस्सा']],
    [['Whole number', 'Integer'], ['पूर्णांक संख्या'], ['पूर्ण संख्या', 'पूर्णांक']],
    [
      'One-half (1/2) and three-fourths (3/4) are examples of proper fractions.',
      'अर्धा (१/२) आणि पाऊण (३/४) ही छेदाधिक अपूर्णांकांची उदाहरणे आहेत.',
      'एक-बटा-दो (1/2) और तीन-चौथाई (3/4) उचित भिन्नों के उदाहरण हैं।',
    ],
    ['Fractions (Plural)', 'Fractional (Adjective)'],
  ],
  [
    'Hypotenuse',
    'hy-POT-uh-nyoos (हायपोटेन्यूस)',
    'Noun',
    'Classes 7–10',
    'Mathematics & Logic',
    'The longest side of a right-angled triangle, directly opposite the right angle.',
    'In geometry, the side opposite the 90-degree angle in a right triangle; according to Pythagoras’ theorem, its square equals the sum of squares of the other two sides.',
    'कर्ण',
    'काटकोन त्रिकोणातील काटकोनासमोरील सर्वात मोठी बाजू.',
    'काटकोन त्रिकोणामध्ये ९० अंशाच्या कोनासमोर असणाऱ्या सर्वात लांब बाजूला कर्ण म्हणतात (पायथागोरसच्या प्रमेयानुसार कर्णाचा वर्ग = पाया वर्ग + उंची वर्ग).',
    'कर्ण',
    'समकोण त्रिभुज में समकोण (90°) के ठीक सामने वाली सबसे लंबी भुजा।',
    'ज्यामिति में समकोण त्रिभुज की सबसे बड़ी भुजा, जिसका वर्ग अन्य दो भुजाओं के वर्गों के योग के बराबर होता है।',
    [['Longest side of right triangle'], ['काटकोनासमोरील बाजू'], ['समकोण की सम्मुख भुजा']],
    [['Base', 'Perpendicular'], ['पाया', 'उंची'], ['आधार', 'लंब']],
    [
      'By Pythagoras’ theorem, the square of the hypotenuse equals the sum of the squares of the other two sides.',
      'पायथागोरसच्या प्रमेयानुसार, काटकोन त्रिकोणात कर्णाचा वर्ग हा इतर दोन बाजूंच्या वर्गांच्या बेरजेइतका असतो.',
      'पाइथागोरस प्रमेय के अनुसार, कर्ण का वर्ग अन्य दो भुजाओं के वर्गों के योग के बराबर होता है।',
    ],
    ['Hypotenuses (Plural)'],
  ],
  [
    'Integer',
    'IN-ti-jur (इंटिजर)',
    'Noun',
    'Classes 4–6',
    'Mathematics & Logic',
    'A whole number that can be positive, negative, or zero, without any fractional part.',
    'Any member of the set of positive whole numbers {1, 2, 3...}, negative whole numbers {-1, -2, -3...}, and zero {0}, excluding fractions and decimals.',
    'पूर्णांक संख्या',
    'धन संख्या, ऋण संख्या आणि शून्य यांचा समावेश असलेला पूर्ण संख्यांचा गट (यात अपूर्णांक नसतात).',
    'गणितात सर्व धन पूर्ण संख्या (+१, +२...), शून्य (०) आणि सर्व ऋण पूर्ण संख्या (-१, -२...) यांच्या समूहाला पूर्णांक संख्या म्हणतात.',
    'पूर्णांक',
    'धनात्मक, ऋणात्मक और शून्य सहित वे सभी पूर्ण संख्याएँ जिनमें कोई भिन्न या दशमलव भाग न हो।',
    'गणित में ऋणात्मक पूर्ण संख्याओं, शून्य और धनात्मक पूर्ण संख्याओं के समुच्चय को पूर्णांक कहते हैं।',
    [['Whole number'], ['पूर्ण संख्या'], ['पूर्ण संख्या']],
    [['Fraction', 'Decimal'], ['अपूर्णांक', 'दशांश'], ['भिन्न', 'दशमलव']],
    [
      'Zero is an integer that is neither positive nor negative.',
      'शून्य ही अशी पूर्णांक संख्या आहे जी धनही नाही आणि ऋणही नाही.',
      'शून्य एक ऐसा पूर्णांक है जो न तो धनात्मक है और न ही ऋणात्मक।',
    ],
    ['Integers (Plural)', 'Integral (Adjective)'],
  ],
  [
    'Numerator',
    'NOO-muh-ray-tur (न्यूमरेटर)',
    'Noun',
    'Classes 4–6',
    'Mathematics & Logic',
    'The top number in a fraction that shows how many equal parts are taken or counted.',
    'In a mathematical fraction (a/b), the numerator (a) is the number written above the fraction line representing the dividend or number of selected parts.',
    'अंश',
    'अपूर्णांकातील आडव्या रेषेवरील संख्या, जी समान भागांपैकी किती भाग घेतले आहेत ते दर्शवते.',
    'व्यवहारी अपूर्णांकात आडव्या रेषेच्या वर लिहिल्या जाणाऱ्या संख्येला अंश म्हणतात.',
    'अंश',
    'भिन्न की रेखा के ऊपर लिखी जाने वाली संख्या जो बताती है कि बराबर भागों में से कितने भाग लिए गए हैं।',
    'गणितीय भिन्न (अंश/हर) में बटा रेखा के ऊपर स्थित भाज्य संख्या को अंश कहते हैं।',
    [['Dividend in fraction'], ['अपूर्णांकाचा अंश'], ['भिन्न का भाज्य']],
    [['Denominator'], ['छेद'], ['हर']],
    [
      'When the numerator is smaller than the denominator, it is called a proper fraction.',
      'जेव्हा अंश हा छेदापेक्षा लहान असतो, तेव्हा त्याला छेदाधिक अपूर्णांक म्हणतात.',
      'जब अंश हर से छोटा होता है, तो उसे उचित भिन्न कहा जाता है।',
    ],
    ['Numerators (Plural)'],
  ],
  [
    'Parallel',
    'PAR-uh-lel (पॅरलल)',
    'Adjective',
    'Classes 4–6',
    'Mathematics & Logic',
    'Lines or planes that remain the same distance apart and never meet or cross each other.',
    'In Euclidean geometry, coplanar straight lines that extend infinitely in both directions at a constant perpendicular distance without ever intersecting.',
    'समांतर',
    'एकाच प्रतलात असलेल्या आणि एकमेकींना कधीही न छेदणाऱ्या (समान अंतरावरील रेषा).',
    'एकाच सपाट पृष्ठभागावर (प्रतलात) असणाऱ्या आणि कितीही वाढवल्या तरी एकमेकींना कधीही न छेदणाऱ्या रेषांना समांतर रेषा म्हणतात.',
    'समांतर',
    'ऐसी रेखाएँ जिनके बीच की दूरी सदैव समान रहती है और जो आगे बढ़ाने पर कभी एक-दूसरे को नहीं काटतीं।',
    'ज्यामिति में एक ही समतल में स्थित वे सीधी रेखाएँ जो अनंत तक बढ़ाने पर भी एक-दूसरे को प्रतिच्छेद नहीं करतीं।',
    [['Equidistant', 'Non-intersecting'], ['समदूर', 'न छेदणाऱ्या'], ['समदूरस्थ', 'अप्रतिच्छेदी']],
    [['Intersecting', 'Perpendicular'], ['छेदणाऱ्या', 'लंब'], ['प्रतिच्छेदी', 'लंबवत']],
    [
      'The opposite sides of a rectangle and a railway track are parallel to each other.',
      'आयताच्या समोरासमोरील बाजू आणि रेल्वेचे दोन रूळ एकमेकांना समांतर असतात.',
      'आयत की आमने-सामने की भुजाएँ और रेल की पटरियाँ एक-दूसरे के समांतर होती हैं।',
    ],
    ['Parallelogram (Noun)', 'Parallelism (Noun)'],
  ],
  [
    'Perimeter',
    'puh-RIM-i-tur (पेरिमीटर)',
    'Noun',
    'Classes 4–6',
    'Mathematics & Logic',
    'The total length of the outer boundary of a closed geometric shape.',
    'In geometry, the continuous line forming the boundary of a closed two-dimensional figure, or the total sum of the lengths of all its outer sides.',
    'परिमिती',
    'कोणत्याही बंदिस्त भौमितिक आकृतीच्या सर्व बाजूंच्या लांबीची एकूण बेरीज.',
    'त्रिकोण, चौकोन किंवा कोणत्याही बहुभुजाकृतीच्या बाहेरील सर्व बाजूंच्या लांबीची बेरीज म्हणजे त्या आकृतीची परिमिती होय.',
    'परिमाप',
    'किसी बंद ज्यामितीय आकृति की बाहरी सीमा (सभी भुजाओं) की कुल लंबाई।',
    'किसी द्वि-आयामी बंद आकृति की सभी बाहरी भुजाओं की लंबाइयों का कुल योग उसका परिमाप कहलाता है।',
    [['Outer boundary length', 'Border'], ['बाजूंची एकूण लांबी', 'घेरा'], ['बाहरी घेरा', 'सीमा-लंबाई']],
    [['Area'], ['क्षेत्रफळ'], ['क्षेत्रफल']],
    [
      'The perimeter of a square is four times the length of one of its sides.',
      'चौरसाची परिमिती ही त्याच्या एका बाजूच्या लांबीच्या चार पट असते.',
      'किसी वर्ग का परिमाप उसकी एक भुजा की लंबाई का चार गुना होता है।',
    ],
    ['Perimeters (Plural)'],
  ],
  [
    'Perpendicular',
    'pur-puhn-DIK-yuh-lur (परपेन्डिक्युलर)',
    'Adjective',
    'Classes 7–10',
    'Mathematics & Logic',
    'Meeting or intersecting another line or surface at an exact right angle (90 degrees).',
    'In geometry, two lines, segments, or planes are perpendicular if they intersect to form four congruent right angles of 90°.',
    'लंब (काटकोनात छेदणारी)',
    'दुसऱ्या रेषेला किंवा पृष्ठभागाला बरोबर ९० अंशाच्या कोनात (काटकोनात) छेदणारी.',
    'जेव्हा दोन रेषा एकमेकींना ९० अंशाच्या कोनात (काटकोनात) छेदतात, तेव्हा त्या रेषा परस्परांना लंब आहेत असे म्हणतात.',
    'लंबवत (लंब)',
    'दूसरी रेखा या सतह से ठीक 90 अंश (समकोण) पर मिलने या काटने वाली।',
    'ज्यामिति में जब एक रेखा दूसरी रेखा पर 90° का समकोण बनाती है, तो वे परस्पर लंबवत कहलाती हैं।',
    [['Right-angled', 'Orthogonal'], ['काटकोनी', 'लंबरूप'], ['समकोणिक']],
    [['Parallel'], ['समांतर'], ['समांतर']],
    [
      'A vertical wall stands perpendicular to the horizontal floor.',
      'घराची उभी भिंत ही जमिनीच्या सपाट पृष्ठभागाला लंब असते.',
      'खड़ी दीवार समतल फर्श के लंबवत होती है।',
    ],
    ['Perpendicularity (Noun)', 'Perpendicularly (Adverb)'],
  ],
  [
    'Probability',
    'prob-uh-BIL-i-tee (प्रोबॅबिलिटी)',
    'Noun',
    'Classes 7–10',
    'Mathematics & Logic',
    'The mathematical measure of how likely an event is to happen.',
    'A branch of mathematics that quantifies the likelihood of a random event occurring, expressed as a ratio or number between 0 (impossible) and 1 (certain).',
    'संभाव्यता',
    'एखादी घटना घडण्याची शक्यता किती आहे हे गणितीय पद्धतीने मोजण्याचे माप.',
    'यादृच्छिक प्रयोगात एखादी विशिष्ट घटना घडण्याच्या शक्यतेचे संख्यात्मक मापन म्हणजे संभाव्यता होय.',
    'प्रायिकता (संभावना)',
    'किसी घटना के घटित होने की संभावना का गणितीय माप।',
    'गणित की वह शाखा जिसमें किसी यादृच्छिक घटना के घटित होने की संभावना को 0 से 1 के बीच संख्यात्मक रूप में मापा जाता है।',
    [['Likelihood', 'Chance'], ['शक्यता'], ['संभावना']],
    [['Certainty', 'Impossibility'], ['निश्चितता'], ['निश्चितता']],
    [
      'When you toss a fair coin, the probability of getting heads is 1/2.',
      'एक नाणे फेकले असता छापा (Head) मिळण्याची संभाव्यता १/२ असते.',
      'एक निष्पक्ष सिक्का उछालने पर चित (Head) आने की प्रायिकता 1/2 होती है।',
    ],
    ['Probable (Adjective)', 'Probably (Adverb)'],
  ],
  [
    'Radius',
    'RAY-dee-uhs (रेडियस)',
    'Noun',
    'Classes 4–6',
    'Mathematics & Logic',
    'A straight line segment from the center of a circle to any point on its outer edge.',
    'In geometry, the distance from the center of a circle or sphere to any point on its circumference or surface; half the length of the diameter (r = d/2).',
    'त्रिज्या',
    'वर्तुळाचा केंद्रबिंदू आणि वर्तुळाच्या कडेवरील कोणताही बिंदू यांना जोडणारा रेषाखंड.',
    'वर्तुळकेंद्रापासून वर्तुळाच्या परिघावरील कोणत्याही बिंदूपर्यंतच्या अंतरास त्रिज्या म्हणतात. त्रिज्या ही व्यासाच्या निम्मी असते.',
    'त्रिज्या (अर्धव्यास)',
    'वृत्त के केंद्र से उसकी परिधि के किसी भी बिंदु तक की सीधी दूरी।',
    'ज्यामिति में वृत्त या गोले के केंद्र से उसकी बाहरी सीमा तक जाने वाला रेखाखंड, जो व्यास का आधा (r = d/2) होता है।',
    [['Half-diameter'], ['अर्धव्यास'], ['अर्धव्यास']],
    [['Diameter'], ['व्यास'], ['व्यास']],
    [
      'If the radius of a circle is 7 cm, its diameter is 14 cm.',
      'जर एका वर्तुळाची त्रिज्या ७ सेमी असेल, तर त्याचा व्यास १४ सेमी असतो.',
      'यदि किसी वृत्त की त्रिज्या 7 सेमी है, तो उसका व्यास 14 सेमी होगा।',
    ],
    ['Radii (Plural)', 'Radial (Adjective)'],
  ],

  // ================= HISTORY, CIVICS, GEOGRAPHY & VALUES =================
  [
    'Agriculture',
    'AG-ri-kul-chur (अॅग्रिकल्चर)',
    'Noun',
    'Classes 4–6',
    'History, Civics & Geography',
    'The science and practice of cultivating soil, growing crops, and raising livestock.',
    'The primary economic activity involving farming, soil tillage, crop production, horticulture, and animal husbandry to provide food and raw materials.',
    'शेती (कृषी)',
    'जमिनीची मशागत करून पिके घेण्याचा आणि पशुपालन करण्याचा व्यवसाय व शास्त्र.',
    'अन्नधान्य व कच्च्या मालाच्या उत्पादनासाठी जमिनीची मशागत करून पिके पिकवणे आणि पशुपालन करणे या प्राथमिक व्यवसायाला शेती किंवा कृषी म्हणतात.',
    'कृषि (खेती)',
    'भूमि को जोतकर फसलें उगाने और पशुपालन करने का विज्ञान एवं व्यवसाय।',
    'खाद्यान्न तथा औद्योगिक कच्चे माल के उत्पादन हेतु मिट्टी की जुताई, फसल उत्पादन और पशुपालन की प्राथमिक आर्थिक क्रिया।',
    [['Farming', 'Cultivation', 'Agronomy'], ['कास्तकारी', 'कृषी व्यवसाय'], ['खेती-बाड़ी', 'काश्तकारी']],
    [['Industrialization'], ['औद्योगिकीकरण'], ['औद्योगीकरण']],
    [
      'Agriculture is the primary occupation of a large portion of India’s population.',
      'शेती हा भारतातील बहुसंख्य लोकांचा प्रमुख व्यवसाय आहे.',
      'कृषि भारत की एक बड़ी आबादी का मुख्य व्यवसाय है।',
    ],
    ['Agricultural (Adjective)', 'Agriculturist (Noun)'],
  ],
  [
    'Civilization',
    'siv-uh-ly-ZAY-shuhn (सिव्हिलायझेशन)',
    'Noun',
    'Classes 7–10',
    'History, Civics & Geography',
    'An advanced stage of human society with developed cities, culture, laws, science, and writing.',
    'A complex human society characterized by urban development, social organization, governance, written language, art, architecture, and trade.',
    'संस्कृती (नागरिकत्व / सभ्यता)',
    'मानवी समाजाच्या प्रगतीची अशी प्रगत अवस्था ज्यात शहरे, लिपी, कायदे, कला आणि व्यापार विकसित झालेला असतो.',
    'इतिहासात नदीकाठी विकसित झालेली नगररचना, लिपी, प्रशासन, कला व व्यापार यांनी समृद्ध असलेली मानवी समाजव्यवस्था (उदा. सिंधू संस्कृती).',
    'सभ्यता',
    'मानव समाज के विकास की वह उन्नत अवस्था जिसमें नगर, संस्कृति, कानून, विज्ञान और लेखन प्रणाली विकसित हो।',
    'इतिहास में नगर-नियोजन, शासन, लिपि, कला और व्यापार से युक्त विकसित मानव समाज (जैसे सिंधु घाटी सभ्यता)।',
    [['Advanced society', 'Culture'], ['प्रगत समाजव्यवस्था', 'सभ्यता'], ['विकसित समाज', 'संस्कृति']],
    [['Barbarism', 'Primitiveness'], ['रानटी अवस्था'], ['बर्बरता']],
    [
      'The Indus Valley Civilization was famous for its well-planned towns and drainage system.',
      'सिंधू संस्कृती तिच्या उत्कृष्ट नगररचनेसाठी आणि सांडपाणी व्यवस्थेसाठी प्रसिद्ध होती.',
      'सिंधु घाटी सभ्यता अपने सुनियोजित नगरों और जल-निकासी प्रणाली के लिए प्रसिद्ध थी।',
    ],
    ['Civilize (Verb)', 'Civilized (Adjective)'],
  ],
  [
    'Compassion',
    'kuhm-PASH-uhn (कम्पॅशन)',
    'Noun',
    'Classes 4–6',
    'Values, Character & Emotions',
    'A deep feeling of sympathy and care for someone who is suffering, coupled with a desire to help.',
    'Empathetic concern for the hardships or pain of others that motivates kind action, charity, and relief.',
    'करुणा (दया / अनुकंपा)',
    'दुसऱ्याच्या दुःखाविषयी मनात निर्माण होणारी तीव्र सहानुभूती आणि त्याला मदत करण्याची भावना.',
    'संकटात किंवा दुःखात असलेल्या जीवांविषयी मनात कळवळा येऊन त्यांचे दुःख दूर करण्यासाठी केलेली प्रेमळ कृती म्हणजे करुणा होय.',
    'करुणा (दया / संवेदना)',
    'दूसरों के दुःख को देखकर मन में उठने वाली गहरी सहानुभूति और उनकी सहायता करने की भावना।',
    'पीड़ित या दुःखी व्यक्तियों के प्रति गहरी संवेदना और उनके कष्ट को दूर करने की सक्रिय मानवीय भावना।',
    [['Empathy', 'Mercy', 'Kindness'], ['दया', 'अनुकंपा', 'कणव'], ['दया', 'सहानुभूति', 'अनुकंपा']],
    [['Cruelty', 'Indifference'], ['क्रूरता', 'निर्दयपणा'], ['क्रूरता', 'निष्ठुरता']],
    [
      'We should treat all living creatures with kindness and compassion.',
      'आपण सर्व सजीवांशी प्रेमाने आणि करुणेने वागले पाहिजे.',
      'हमें सभी जीवधारियों के साथ दया और करुणा का व्यवहार करना चाहिए।',
    ],
    ['Compassionate (Adjective)', 'Compassionately (Adverb)'],
  ],
  [
    'Continent',
    'KON-ti-nuhnt (कॉन्टिनन्ट)',
    'Noun',
    'Classes 4–6',
    'History, Civics & Geography',
    'One of the Earth’s seven huge continuous expanses of land.',
    'Any of the world’s main continuous landmasses—Asia, Africa, North America, South America, Antarctica, Europe, and Australia.',
    'खंड',
    'पृथ्वीवरील जमिनीच्या सात प्रचंड मोठ्या सलग भूभागांपैकी एक भाग.',
    'पृथ्वीवरील महासागरांनी वेढलेल्या जमिनीच्या अतिविशाल व सलग भूभागास खंड म्हणतात (उदा. आशिया, आफ्रिका, युरोप).',
    'महाद्वीप',
    'पृथ्वी पर स्थित भूमि के सात विशाल और सतत भू-भागों में से एक।',
    'पृथ्वी की सतह पर समुद्र से घिरे विशाल स्थलीय भूखंड (जैसे एशिया, अफ्रीका, यूरोप आदि सात महाद्वीप)।',
    [['Mainland', 'Landmass'], ['विशाल भूखंड'], ['विशाल भूभाग']],
    [['Ocean', 'Island'], ['महासागर', 'बेट'], ['महासागर', 'द्वीप']],
    [
      'Asia is the largest continent in the world by both area and population.',
      'क्षेत्रफळ आणि लोकसंख्या या दोन्हीच्या दृष्टीने आशिया हा जगातील सर्वात मोठा खंड आहे.',
      'क्षेत्रफल और जनसंख्या दोनों की दृष्टि से एशिया विश्व का सबसे बड़ा महाद्वीप है।',
    ],
    ['Continents (Plural)', 'Continental (Adjective)'],
  ],
  [
    'Diligence',
    'DIL-i-juhns (डिलिजन्स)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'Careful, steady, and persistent hard work done with sincere effort.',
    'Conscientiousness and earnest effort in completing one’s duties or studies thoroughly without giving up.',
    'परिश्रमशीलता (कष्टाळूपणा / सातत्य)',
    'कोणतेही काम किंवा अभ्यास प्रामाणिकपणे, काळजीपूर्वक आणि सातत्याने करण्याची वृत्ती.',
    'ध्येय गाठण्यासाठी न कंटाळता एकाग्रतेने आणि चिकाटीने केलेले प्रामाणिक परिश्रम म्हणजे परिश्रमशीलता होय.',
    'कर्मठता (परिश्रम / लगन)',
    'किसी कार्य या अध्ययन को सावधानीपूर्वक, निरंतर और पूरी लगन से करने का गुण।',
    'अपने कर्तव्य या पढ़ाई को पूर्ण निष्ठा, एकाग्रता और निरंतर परिश्रम के साथ पूरा करने की प्रवृत्ति।',
    [['Hard work', 'Industry', 'Persistence'], ['मेहनत', 'चिकाटी', 'कष्टाळूपणा'], ['मेहनत', 'लगन', 'उद्यम']],
    [['Laziness', 'Negligence'], ['आळस', 'निष्काळजीपणा'], ['आलस्य', 'लापरवाही']],
    [
      'Success in examinations comes through daily diligence and regular revision.',
      'परीक्षेतील यश हे दैनंदिन परिश्रमशीलता आणि नियमित उजळणीतून मिळते.',
      'परीक्षा में सफलता प्रतिदिन की कर्मठता और नियमित पुनरावृत्ति से मिलती है।',
    ],
    ['Diligent (Adjective)', 'Diligently (Adverb)'],
  ],
  [
    'Eloquent',
    'EL-uh-kwuhnt (एलक्वन्ट)',
    'Adjective',
    'Classes 7–10',
    'Daily Life & Communication',
    'Fluent, expressive, and persuasive in speaking or writing.',
    'Having or exercising the power of fluent, forceful, and graceful speech that touches and convinces the audience.',
    'वक्तृत्वसंपन्न (सुस्पष्ट व प्रभावी बोलणारा)',
    'अत्यंत ओघवत्या, प्रभावी आणि मनाला भिडणाऱ्या भाषेत बोलणारा किंवा लिहिणारा.',
    'आपले विचार अत्यंत स्पष्ट, सुंदर आणि श्रोत्यांच्या मनावर प्रभाव पाडतील अशा शब्दांत मांडण्याचे कौशल्य असलेला.',
    'वाक्पटु (प्रभावशाली वक्ता)',
    'बोलने या लिखने में अत्यंत धाराप्रवाह, स्पष्ट और प्रभावशाली।',
    'अपने विचारों को अत्यंत सुंदर, सशक्त और श्रोताओं को प्रभावित करने वाली भाषा में व्यक्त करने में निपुण।',
    [['Articulate', 'Fluent', 'Expressive'], ['ओघवता', 'प्रभावी वक्ता'], ['सुवक्ता', 'मुखर']],
    [['Inarticulate', 'Hesitant'], ['अस्पष्ट बोलणारा'], ['अस्पष्ट', 'संकोची']],
    [
      'Swami Vivekananda delivered an eloquent speech in Chicago in 1893.',
      'स्वामी विवेकानंद यांनी १८९३ मध्ये शिकागो येथे अत्यंत वक्तृत्वसंपन्न व प्रभावी भाषण दिले.',
      'स्वामी विवेकानंद ने 1893 में शिकागो में एक अत्यंत प्रभावशाली और वाक्पटु भाषण दिया।',
    ],
    ['Eloquence (Noun)', 'Eloquently (Adverb)'],
  ],
  [
    'Fortitude',
    'FOR-ti-tyood (फॉर्टिट्यूड)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'Mental and emotional strength in facing difficulty, adversity, or danger bravely.',
    'Courageous endurance and steadfastness of mind when confronting hardship, pain, or severe challenges over a long period.',
    'धैर्य (मनोधैर्य / सहनशीलता)',
    'संकटे, अडचणी किंवा दुःखाच्या प्रसंगी खचून न जाता शांतपणे तोंड देण्याचे मानसिक बळ.',
    'कठीण परिस्थितीतही मनाचा तोल ढळू न देता धिराने व शौर्याने संकटांना सामोरे जाण्याची आंतरिक शक्ती म्हणजे मनोधैर्य होय.',
    'धैर्य (सहनशक्ति / मनोबल)',
    'कठिनाइयों, संकटों या खतरों का साहस और संयम के साथ सामना करने की मानसिक शक्ति।',
    'विपरीत परिस्थितियों और कष्टों में भी विचलित हुए बिना अडिग रहने का आत्मिक बल और साहस।',
    [['Grit', 'Resilience', 'Endurance'], ['मनोधैर्य', 'चिकाटी', 'धीर'], ['मनोबल', 'सहनशीलता', 'दृढ़ता']],
    [['Cowardice', 'Faint-heartedness'], ['भित्रेपणा', 'कचखाऊपणा'], ['कायरता', 'कमज़ोरी']],
    [
      'Chhatrapati Shivaji Maharaj faced every crisis with extraordinary fortitude and wisdom.',
      'छत्रपती शिवाजी महाराजांनी प्रत्येक संकटाचा असामान्य मनोधैर्याने आणि मुत्सद्देगिरीने सामना केला.',
      'छत्रपति शिवाजी महाराज ने प्रत्येक संकट का असाधारण धैर्य और बुद्धिमत्ता से सामना किया।',
    ],
    ['Fortitudinous (Adjective)'],
  ],
  [
    'Gratitude',
    'GRAT-i-tyood (ग्रॅटिट्यूड)',
    'Noun',
    'Classes 1–3',
    'Values, Character & Emotions',
    'The warm feeling of being thankful and appreciative for help or kindness received.',
    'The moral virtue of recognizing, appreciating, and expressing thankfulness toward parents, teachers, nature, and others for their support.',
    'कृतज्ञता',
    'आपल्याला केलेल्या मदतीबद्दल किंवा उपकारांबद्दल मनात असणारी आभाराची व आदराची भावना.',
    'आई-वडील, शिक्षक, समाज आणि निसर्ग यांनी आपल्याला दिलेल्या योगदानाची जाणीव ठेवून त्यांच्याविषयी आदर व आभार व्यक्त करणे म्हणजे कृतज्ञता होय.',
    'कृतज्ञता (आभार)',
    'दूसरों से मिली सहायता या भलाई के प्रति धन्यवाद और आभार प्रकट करने की भावना।',
    'माता-पिता, शिक्षकों और समाज के उपकारों को याद रखने तथा उनके प्रति हृदय से आभार व्यक्त करने का सद्गुण।',
    [['Thankfulness', 'Appreciation'], ['जाणीव', 'आभार'], ['आभार', 'धन्यवाद', 'एहसानमंदी']],
    [['Ingratitude', 'Unthankfulness'], ['कृतघ्नता'], ['कृतघ्नता']],
    [
      'We should always express gratitude to our parents and teachers.',
      'आपण आपल्या आई-वडिलांविषयी आणि शिक्षकांविषयी नेहमी कृतज्ञता बाळगली पाहिजे.',
      'हमें अपने माता-पिता और शिक्षकों के प्रति सदैव कृतज्ञता व्यक्त करनी चाहिए।',
    ],
    ['Grateful (Adjective)', 'Gratefully (Adverb)'],
  ],
  [
    'Heritage',
    'HER-i-tij (हेरिटेज)',
    'Noun',
    'Classes 4–6',
    'History, Civics & Geography',
    'Valuable traditions, monuments, culture, and natural treasures passed down from previous generations.',
    'The cultural, historical, architectural, and natural legacy inherited from ancestors and preserved for future generations.',
    'वारसा',
    'पूर्वजांकडून पुढच्या पिढीकडे आलेल्या ऐतिहासिक वास्तू, परंपरा, कला, संस्कृती आणि नैसर्गिक ठेवा.',
    'आपल्या पूर्वजांनी निर्माण केलेले किल्ले, लेणी, साहित्य, कला, मूल्ये आणि निसर्गसंपदा यांचा पुढील पिढीला मिळालेला अनमोल ठेवा म्हणजे वारसा होय.',
    'विरासत (धरोहर)',
    'पूर्वजों से प्राप्त मूल्यवान परंपराएँ, ऐतिहासिक स्मारक, संस्कृति और प्राकृतिक संपदा।',
    'पीढ़ी-दर-पीढ़ी हस्तांतरित होने वाली सांस्कृतिक, ऐतिहासिक, साहित्यिक और प्राकृतिक धरोहर जिनका संरक्षण हमारा कर्तव्य है।',
    [['Legacy', 'Tradition', 'Inheritance'], ['ऐतिहासिक ठेवा', 'परंपरा'], ['धरोहर', 'परंपरा']],
    [['Destruction of past'], ['विस्मरण'], ['विस्मरण']],
    [
      'The Ajanta and Ellora caves in Maharashtra are world-famous cultural heritage sites.',
      'महाराष्ट्रातील अजिंठा आणि वेरूळची लेणी ही जगप्रसिद्ध सांस्कृतिक वारसा स्थळे आहेत.',
      'महाराष्ट्र की अजंता और एलोरा की गुफाएँ विश्व-प्रसिद्ध सांस्कृतिक विरासत स्थल हैं।',
    ],
    ['Heritages (Plural)'],
  ],
  [
    'Integrity',
    'in-TEG-ri-tee (इंटेग्रिटी)',
    'Noun',
    'Classes 7–10',
    'Values, Character & Emotions',
    'The quality of being completely honest and having strong moral principles even when no one is watching.',
    'Steadfast adherence to a strict moral or ethical code; wholeness of character where one’s actions consistently match one’s words and values.',
    'सच्चोटी (निष्ठा / प्रामाणिकपणा)',
    'कोणी पाहत नसतानाही पूर्णपणे प्रामाणिक राहण्याचा आणि नैतिक मूल्यांशी एकनिष्ठ राहण्याचा गुण.',
    'मनातील विचार, बोलणे आणि प्रत्यक्ष कृती यांमध्ये एकवाक्यता असणे व कोणत्याही प्रलोभनाला बळी न पडता नैतिक तत्त्वांचे पालन करणे म्हणजे सच्चोटी होय.',
    'सत्यनिष्ठा (ईमानदारी)',
    'पूर्ण रूप से ईमानदार रहने और उच्च नैतिक सिद्धांतों पर अडिग रहने का गुण।',
    'चरित्र की वह पवित्रता और अखंडता जिसमें व्यक्ति किसी भी प्रलोभन या भय के बिना सदैव सत्य और धर्म के मार्ग पर चलता है।',
    [['Honesty', 'Rectitude', 'Probity'], ['प्रामाणिकपणा', 'नैतिक निष्ठा'], ['ईमानदारी', 'निष्ठा', 'सच्चाई']],
    [['Dishonesty', 'Corruption'], ['भ्रष्टाचार', 'बेइमानी'], ['बेईमानी', 'भ्रष्टाचार']],
    [
      'A person of integrity is respected and trusted by everyone.',
      'सच्चोटीने वागणाऱ्या व्यक्तीचा सर्वजण आदर करतात आणि तिच्यावर विश्वास ठेवतात.',
      'सत्यनिष्ठा वाले व्यक्ति का सभी सम्मान करते हैं और उस पर विश्वास रखते हैं।',
    ],
    ['Integral (Related Adjective)'],
  ],
  [
    'Irrigation',
    'ir-i-GAY-shuhn (इरिगेशन)',
    'Noun',
    'Classes 4–6',
    'History, Civics & Geography',
    'The artificial supply of water to farmland and crops through canals, pipes, or sprinklers.',
    'The agricultural practice of applying controlled amounts of water to land via canals, wells, drip systems, or sprinklers to assist in growing crops.',
    'जलसिंचन',
    'पावसाव्यतिरिक्त कालवे, विहिरी किंवा ठिबक पद्धतीने शेतातील पिकांना पाणी पुरवण्याची व्यवस्था.',
    'नदी, धरण किंवा विहिरीतील पाणी कालवे, पाट, तुषार किंवा ठिबक सिंचनाद्वारे शेतातील पिकांना नियोजनबद्ध रीतीने देण्याच्या प्रक्रियेस जलसिंचन म्हणतात.',
    'सिंचाई',
    'नहरों, कुओं या पाइपों के माध्यम से खेतों और फसलों को कृत्रिम रूप से पानी पहुँचाने की व्यवस्था।',
    'कृषि में फसलों की वृद्धि के लिए नहर, नलकूप, ड्रिप या फव्वारा पद्धति द्वारा खेतों में जल की आपूर्ति करने की प्रक्रिया।',
    [['Watering crops'], ['पाणीपुरवठा', 'ओलित'], ['जल-आपूर्ति', 'आबपाशी']],
    [['Drought', 'Aridity'], ['कोरडवाहू', 'दुष्काळ'], ['सूखा']],
    [
      'Drip irrigation saves water and delivers moisture directly to the roots of plants.',
      'ठिबक जलसिंचनामुळे पाण्याची बचत होते आणि पाणी थेट वनस्पतींच्या मुळांशी पोहोचते.',
      'ड्रिप सिंचाई से पानी की बचत होती है और नमी सीधे पौधों की जड़ों तक पहुँचती है।',
    ],
    ['Irrigate (Verb)', 'Irrigated (Adjective)'],
  ],
  [
    'Latitude',
    'LAT-i-tyood (लॅटिट्यूड)',
    'Noun',
    'Classes 4–6',
    'History, Civics & Geography',
    'Imaginary horizontal lines drawn east-to-west on a globe to measure distance north or south of the Equator.',
    'In geography, the angular distance of a place north or south of the Earth’s Equator, expressed in degrees and minutes along parallels of latitude.',
    'अक्षांश (अक्षवृत्त)',
    'पृथ्वीच्या गोलावर विषुववृत्ताच्या उत्तरेस किंवा दक्षिणेस अंतर मोजण्यासाठी काढलेल्या काल्पनिक आडव्या पूर्व-पश्चिम रेषा.',
    'विषुववृत्तापासून उत्तरेकडे किंवा दक्षिणेकडे एखाद्या ठिकाणाचे अंशात्मक अंतर दर्शवणाऱ्या काल्पनिक वर्तुळाकार आडव्या रेषांना अक्षवृत्ते आणि त्या मापाला अक्षांश म्हणतात.',
    'अक्षांश',
    'भूमध्य रेखा से उत्तर या दक्षिण की कोणीय दूरी मापने के लिए ग्लोब पर खींची गई काल्पनिक पूर्व-पश्चिम रेखाएँ।',
    'भूगोल में पृथ्वी की भूमध्य रेखा (विषुवत वृत्त) से उत्तर या दक्षिण में स्थित किसी स्थान की कोणीय दूरी, जिसे अंशों (डिग्री) में मापा जाता है।',
    [['Parallel of latitude'], ['अक्षवृत्त'], ['अक्षांश रेखा']],
    [['Longitude'], ['रेखांश (रेखावृत्त)'], ['देशांतर']],
    [
      'The Equator represents zero degrees (0°) latitude.',
      'विषुववृत्त हे शून्य अंश (०°) अक्षांश दर्शवते.',
      'भूमध्य रेखा शून्य अंश (0°) अक्षांश को दर्शाती है।',
    ],
    ['Latitudes (Plural)', 'Latitudinal (Adjective)'],
  ],
  [
    'Longitude',
    'LON-ji-tyood (लॉन्जिट्यूड)',
    'Noun',
    'Classes 4–6',
    'History, Civics & Geography',
    'Imaginary vertical lines running from the North Pole to the South Pole on a globe to measure distance east or west.',
    'In geography, the angular distance of a place east or west of the Prime Meridian (at Greenwich), used for determining standard time zones and coordinates.',
    'रेखांश (रेखावृत्त)',
    'पृथ्वीच्या गोलावर उत्तर ध्रुवापासून दक्षिण ध्रुवापर्यंत काढलेल्या काल्पनिक उभ्या अर्धवर्तुळाकार रेषा.',
    'मूळ रेखावृत्तापासून (ग्रीनिच) पूर्वेकडे किंवा पश्चिमेकडे एखाद्या ठिकाणाचे अंशात्मक अंतर व स्थानिक वेळ ठरवण्यासाठी वापरल्या जाणाऱ्या उभ्या रेषांना रेखावृत्ते व मापाला रेखांश म्हणतात.',
    'देशांतर',
    'ग्लोब पर उत्तरी ध्रुव से दक्षिणी ध्रुव तक खींची गई काल्पनिक खड़ी रेखाएँ जो पूर्व या पश्चिम की दूरी और समय बताती हैं।',
    'भूगोल में प्रधान मध्याह्न रेखा (ग्रीनविच) से पूर्व या पश्चिम में किसी स्थान की कोणीय दूरी, जिससे मानक समय का निर्धारण होता है।',
    [['Meridian'], ['रेखावृत्त'], ['देशांतर रेखा', 'याम्योत्तर']],
    [['Latitude'], ['अक्षांश (अक्षवृत्त)'], ['अक्षांश']],
    [
      'Indian Standard Time is calculated from the 82.5° East longitude passing through Mirzapur.',
      'भारताची प्रमाणवेळ मिर्झापूरवरून जाणाऱ्या ८२.५° पूर्व रेखांशावरून निश्चित केली जाते.',
      'भारतीय मानक समय की गणना मिर्जापुर से गुजरने वाले 82.5° पूर्वी देशांतर से की जाती है।',
    ],
    ['Longitudes (Plural)', 'Longitudinal (Adjective)'],
  ],
  [
    'Metaphor',
    'MET-uh-for (मेटाफर)',
    'Noun',
    'Classes 7–10',
    'Academic & School',
    'A figure of speech that directly compares two different things by saying one thing is another.',
    'In literature and grammar, an implied comparison between two unrelated things that share a common characteristic, without using "like" or "as".',
    'रूपक अलंकार',
    'भाषेमध्ये दोन भिन्न गोष्टींमधील साम्य दाखवताना एक वस्तू म्हणजे दुसरीच वस्तू आहे असे थेट सांगणारा अलंकार.',
    'जेव्हा उपमेय आणि उपमान यांच्यात एकरूपता दाखवून ते दोन्ही भिन्न नसून एकच आहेत असे वर्णन केले जाते, तेव्हा त्यास रूपक अलंकार म्हणतात.',
    'रूपक अलंकार',
    'वह अलंकार जिसमें अत्यधिक समानता के कारण एक वस्तु को सीधे दूसरी वस्तु ही कह दिया जाता है।',
    'साहित्य और व्याकरण में जब उपमेय पर उपमान का अभेद आरोप किया जाता है (बिना "जैसे" या "समान" शब्द के), तो उसे रूपक अलंकार कहते हैं।',
    [['Figure of speech', 'Implied comparison'], ['रूपक', 'भाषिक अलंकार'], ['रूपक', 'काव्यालंकार']],
    [['Literal statement'], ['सरळ विधान'], ['शाब्दिक कथन']],
    [
      'Saying "Books are keys to wisdom’s treasure" is a beautiful metaphor.',
      '"पुस्तके म्हणजे ज्ञानाच्या खजिन्याच्या किल्ल्या आहेत" हे रूपक अलंकाराचे सुंदर उदाहरण आहे.',
      '"पुस्तकें ज्ञान के खजाने की चाबियाँ हैं" यह रूपक अलंकार का एक सुंदर उदाहरण है।',
    ],
    ['Metaphors (Plural)', 'Metaphorical (Adjective)', 'Metaphorically (Adverb)'],
  ],
  [
    'Momentum',
    'moh-MEN-tuhm (मोमेन्टम)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'The quantity of motion of a moving body, measured as the product of its mass and velocity.',
    'In Newtonian mechanics, linear momentum (p = mv) is a conserved vector quantity equal to the mass of an object multiplied by its velocity.',
    'संवेग',
    'गतिमान वस्तूचे वस्तुमान आणि तिचा वेग यांच्या गुणाकाराने मिळणारी गतीची राशी.',
    'भौतिकशास्त्रात वस्तूचे वस्तुमान (m) आणि तिचा वेग (v) यांच्या गुणाकाराला संवेग (p = mv) म्हणतात. ही एक सदिश राशी आहे.',
    'संवेग',
    'किसी गतिशील वस्तु के द्रव्यमान और उसके वेग के गुणनफल के बराबर गति की मात्रा।',
    'भौतिकी में किसी वस्तु के द्रव्यमान (m) और वेग (v) के गुणनफल को संवेग (p = mv) कहते हैं। यह एक सदिश राशि है।',
    [['Impetus', 'Force of motion'], ['गतीचा जोर'], ['गति-बल', 'वेग-मात्रा']],
    [['Inertia at rest'], ['स्थिरता'], ['विराम अवस्था']],
    [
      'A heavy truck moving at high speed has a very large momentum.',
      'वेगाने जाणाऱ्या जड ट्रकचा संवेग खूप जास्त असतो.',
      'तेज गति से चलते हुए भारी ट्रक का संवेग बहुत अधिक होता है।',
    ],
    ['Momenta (Plural)'],
  ],
  [
    'Peninsula',
    'puh-NIN-suh-luh (पेनिन्सुला)',
    'Noun',
    'Classes 4–6',
    'History, Civics & Geography',
    'A large piece of land that is surrounded by water on three sides and connected to the mainland on one side.',
    'In geography, a landmass projecting out into a body of water and bordered by seas or oceans on three sides while remaining attached to a continent.',
    'द्वीपकल्प',
    'तिन्ही बाजूंनी पाण्याने वेढलेला आणि एका बाजूने मुख्य जमिनीला जोडलेला विशाल भूभाग.',
    'ज्या जमिनीच्या तीन बाजूंना समुद्र किंवा महासागर असतो आणि एक बाजू मुख्य भूमीला जोडलेली असते, अशा भूभागाला द्वीपकल्प म्हणतात (उदा. भारतीय द्वीपकल्प).',
    'प्रायद्वीप',
    'भूमि का वह विशाल भाग जो तीन ओर से जल (समुद्र) से घिरा हो और एक ओर से मुख्य भूमि से जुड़ा हो।',
    'भूगोल में तीन तरफ से समुद्र या जल से घिरा हुआ भू-भाग (जैसे दक्षिणी भारत का प्रायद्वीपीय पठार)।',
    [['Headland', 'Cape'], ['तिन्ही बाजूंनी पाण्याने वेढलेला प्रदेश'], ['तीन ओर जल से घिरा भूभाग']],
    [['Island', 'Gulf'], ['बेट', 'आखात'], ['द्वीप', 'खाड़ी']],
    [
      'Southern India is a peninsula surrounded by the Arabian Sea, the Indian Ocean, and the Bay of Bengal.',
      'दक्षिण भारत हा अरबी समुद्र, हिंदी महासागर आणि बंगालचा उपसागर यांनी वेढलेला एक द्वीपकल्प आहे.',
      'दक्षिणी भारत अरब सागर, हिंद महासागर और बंगाल की खाड़ी से घिरा हुआ एक प्रायद्वीप है।',
    ],
    ['Peninsulas (Plural)', 'Peninsular (Adjective)'],
  ],
  [
    'Precision',
    'pri-SIZH-uhn (प्रिसिजन)',
    'Noun',
    'Classes 7–10',
    'Academic & School',
    'The quality of being exact, accurate, and very careful in measurement or expression.',
    'In science and mathematics, the degree of exactness, refinement, and reproducibility with which a measurement is made or an operation is performed.',
    'अचूकता (नेमकेपणा)',
    'मोजमाप, गणित किंवा कामामध्ये असलेला तंतोतंतपणा आणि बारीकसारीक काळजी.',
    'कोणतेही वैज्ञानिक मोजमाप, आकडेमोड किंवा भाषिक मांडणी करताना एकही चूक न होऊ देता साधलेला तंतोतंतपणा म्हणजे अचूकता होय.',
    'सटीकता (सूक्ष्मता / यथार्थता)',
    'मापन, गणना या कार्य में पूर्णतः सटीक और सावधान होने का गुण।',
    'विज्ञान और गणित में किसी माप या कार्य को बिना किसी त्रुटि के अत्यंत सूक्ष्मता और यथार्थता के साथ संपन्न करने की विशेषता।',
    [['Exactness', 'Accuracy', 'Care'], ['तंतोतंतपणा', 'सूक्ष्मता'], ['यथार्थता', 'शुद्धता']],
    [['Inaccuracy', 'Carelessness'], ['निष्काळजीपणा', 'अंदाजे काम'], ['अशुद्धता', 'लापरवाही']],
    [
      'Scientific experiments require high precision in recording observations.',
      'वैज्ञानिक प्रयोगांमध्ये निरीक्षणे नोंदवताना उच्च पातळीची अचूकता आवश्यक असते.',
      'वैज्ञानिक प्रयोगों में प्रेक्षण दर्ज करते समय उच्च सटीकता की आवश्यकता होती है।',
    ],
    ['Precise (Adjective)', 'Precisely (Adverb)'],
  ],
  [
    'Refraction',
    'ri-FRAK-shuhn (रिफ्रॅक्शन)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'The bending of a light ray when it passes obliquely from one transparent medium into another.',
    'In optics, the change in direction of propagation of a light wave as it crosses the boundary between two media with different optical densities (such as air and water).',
    'अपवर्तन',
    'प्रकाशाचा किरण एका पारदर्शक माध्यमातून दुसऱ्या पारदर्शक माध्यमात तिरकस जाताना त्याची दिशा बदलण्याची क्रिया.',
    'प्रकाशाचा वेग वेगवेगळ्या माध्यमांत भिन्न असल्याने, प्रकाश एका पारदर्शक माध्यमातून (उदा. हवा) दुसऱ्या माध्यमात (उदा. पाणी किंवा काच) जाताना मार्ग बदलतो; यास प्रकाशाचे अपवर्तन म्हणतात.',
    'अपवर्तन',
    'प्रकाश की किरण का एक पारदर्शी माध्यम से दूसरे पारदर्शी माध्यम में तिरछा प्रवेश करते समय अपने मार्ग से मुड़ जाना।',
    'प्रकाशिकी में जब प्रकाश किरण विरल माध्यम (हवा) से सघन माध्यम (जल या काँच) में जाती है तो उसकी चाल व दिशा में परिवर्तन होता है, इसे अपवर्तन कहते हैं।',
    [['Bending of light'], ['प्रकाशकिरण वळणे'], ['प्रकाश का मुड़ना']],
    [['Reflection'], ['परावर्तन'], ['परावर्तन']],
    [
      'A pencil partially dipped in a glass of water appears bent due to the refraction of light.',
      'पाण्याने भरलेल्या काचेच्या पेल्यात अर्धवट बुडवलेली पेन्सिल प्रकाशाच्या अपवर्तनामुळे वाकलेली दिसते.',
      'पानी से भरे गिलास में आंशिक रूप से डूबी हुई पेंसिल प्रकाश के अपवर्तन के कारण मुड़ी हुई दिखाई देती है।',
    ],
    ['Refract (Verb)', 'Refractive (Adjective)'],
  ],
  [
    'Sovereignty',
    'SOV-rin-tee (सॉव्हरिन्टी)',
    'Noun',
    'Classes 7–10',
    'History, Civics & Geography',
    'The supreme and independent power of a country to govern itself without any foreign control.',
    'In political science and constitutional law, the full right and supreme authority of an independent state to make its own laws and policies free from external interference.',
    'सार्वभौमत्व',
    'कोणत्याही परकीय सत्तेच्या नियंत्रणाशिवाय स्वतःचा राज्यकारभार स्वतंत्रपणे चालवण्याचा राष्ट्राचा सर्वोच्च अधिकार.',
    'देशांतर्गत कायदे करण्याचा आणि परराष्ट्र धोरण ठरवण्याचा कोणत्याही बाह्य हस्तक्षेपाशिवाय असलेला स्वतंत्र राष्ट्राचा सर्वोच्च अधिकार म्हणजे सार्वभौमत्व होय.',
    'संप्रभुता (प्रभुसत्ता)',
    'किसी राष्ट्र का किसी बाहरी नियंत्रण के बिना स्वयं पर शासन करने का सर्वोच्च और स्वतंत्र अधिकार।',
    'राजनीति विज्ञान में किसी स्वतंत्र राष्ट्र की वह सर्वोच्च शक्ति जिसके द्वारा वह आंतरिक और बाह्य मामलों में पूर्णतः स्वतंत्र निर्णय लेता है।',
    [['Supreme authority', 'Self-rule', 'Independence'], ['सर्वोच्च स्वातंत्र्य', 'स्वराज्य'], ['सर्वोच्च सत्ता', 'पूर्ण स्वतंत्रता']],
    [['Subjugation', 'Colonial rule'], ['पारतंत्र्य', 'दास्यत्व'], ['पराधीनता', 'गुलामी']],
    [
      'The Preamble of the Constitution declares India to be a Sovereign Socialist Secular Democratic Republic.',
      'संविधानाच्या उद्देशिकेत भारताला सार्वभौम, समाजवादी, धर्मनिरपेक्ष, लोकशाही गणराज्य घोषित केले आहे.',
      'संविधान की प्रस्तावना भारत को एक संपूर्ण प्रभुत्व-संपन्न, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य घोषित करती है।',
    ],
    ['Sovereign (Noun & Adjective)'],
  ],
  [
    'Symmetry',
    'SIM-i-tree (सिमेट्री)',
    'Noun',
    'Classes 4–6',
    'Mathematics & Logic',
    'A balanced arrangement where one half of a shape is the exact mirror image of the other half.',
    'In geometry and nature, the property of an object or figure being made up of exactly similar parts facing each other around an axis or center.',
    'सममिती',
    'एखाद्या आकृतीच्या मध्यरेषेमुळे तिचे दोन तंतोतंत जुळणारे समान भाग होण्याची रचना.',
    'ज्या रेषेवर आकृती दुमडली असता तिचे दोन्ही भाग एकमेकांवर तंतोतंत जुळतात, त्या गुणधर्माला सममिती म्हणतात.',
    'सममिति',
    'ऐसी संतुलित संरचना जिसमें किसी आकृति का एक आधा भाग दूसरे आधे भाग का बिल्कुल दर्पण प्रतिबिंब होता है।',
    'ज्यामिति में किसी आकृति का वह गुण जिसके कारण किसी रेखा या बिंदु के सापेक्ष उसके दोनों भाग आकार और माप में पूर्णतः समान होते हैं।',
    [['Balance', 'Proportion', 'Mirror harmony'], ['समानता', 'समतोल रचना'], ['संतुलन', 'समानुपात']],
    [['Asymmetry', 'Imbalance'], ['असममिती', 'विषमता'], ['असममिति', 'असंतुलन']],
    [
      'A butterfly’s wings are a beautiful natural example of bilateral symmetry.',
      'फुलपाखराचे पंख हे निसर्गातील द्विपार्श्व सममितीचे एक अतिशय सुंदर उदाहरण आहे.',
      'तितली के पंख प्रकृति में द्विपार्श्विक सममिति का एक सुंदर उदाहरण हैं।',
    ],
    ['Symmetrical (Adjective)', 'Symmetrically (Adverb)', 'Asymmetry (Antonym Noun)'],
  ],
  [
    'Theorem',
    'THEE-uh-ruhm (थिअरम)',
    'Noun',
    'Classes 7–10',
    'Mathematics & Logic',
    'A mathematical statement or rule that has been logically proved to be true.',
    'In mathematics, a general proposition not self-evident but proved by a chain of logical reasoning and accepted axioms.',
    'प्रमेय',
    'तर्कशुद्ध सिद्धतेच्या आधारे सत्य असल्याचे सिद्ध केलेले गणितीय किंवा भूमितीमधील विधान.',
    'भूमिती व गणितात गृहीतके आणि नियमांच्या आधारे तर्कशुद्ध पद्धतीने सिद्ध करता येणाऱ्या विधानास प्रमेय म्हणतात.',
    'प्रमेय',
    'वह गणितीय कथन या नियम जिसे तार्किक प्रमाणों द्वारा सत्य सिद्ध किया गया हो।',
    'गणित और ज्यामिति में वह सामान्य कथन जिसे पूर्व-स्थापित अभिगृहीतों और तार्किक चरणों के आधार पर प्रमाणित किया जाता है।',
    [['Proved proposition', 'Mathematical law'], ['सिद्ध विधान', 'गणितीय नियम'], ['सिद्ध कथन', 'गणितीय सिद्धांत']],
    [['Conjecture', 'Unproved guess'], ['अनुमान', 'अंदाज'], ['अनुमान']],
    [
      'The Pythagoras theorem applies to all right-angled triangles.',
      'पायथागोरसचे प्रमेय सर्व काटकोन त्रिकोणांना लागू होते.',
      'पाइथागोरस प्रमेय सभी समकोण त्रिभुजों पर लागू होता है।',
    ],
    ['Theorems (Plural)', 'Theoretical (Adjective)'],
  ],
  [
    'Velocity',
    'vuh-LOS-i-tee (व्हेलोसिटी)',
    'Noun',
    'Classes 7–10',
    'Science & Nature',
    'The speed of an object moving in a specific, stated direction.',
    'In physics, velocity is a vector quantity defined as the rate of change of displacement of an object with respect to time in a particular direction.',
    'वेग',
    'विशिष्ट दिशेने एकक काळात वस्तूचे झालेले विस्थापन (दिशेसह असलेली चाल).',
    'भौतिकशास्त्रात एकक कालावधीत विशिष्ट दिशेने वस्तूने पार केलेल्या अंतरास (विस्थापनास) वेग म्हणतात. वेग ही सदिश राशी आहे.',
    'वेग',
    'किसी निश्चित दिशा में गतिशील वस्तु की चाल (इकाई समय में हुआ विस्थापन)।',
    'भौतिक विज्ञान में किसी वस्तु द्वारा एकांक समय में एक निश्चित दिशा में तय किए गए विस्थापन को वेग कहते हैं। यह एक सदिश राशि है।',
    [['Directed speed', 'Pace'], ['दिशेसह गती'], ['दिशात्मक चाल', 'गति']],
    [['Stillness', 'Rest'], ['स्थिरता', 'विराम'], ['स्थिरता', 'विराम']],
    [
      'Speed has only magnitude, whereas velocity has both magnitude and direction.',
      'चालीला केवळ परिमाण असते, तर वेगाला परिमाण आणि दिशा दोन्ही असतात.',
      'चाल में केवल परिमाण होता है, जबकि वेग में परिमाण और दिशा दोनों होते हैं।',
    ],
    ['Velocities (Plural)'],
  ],
  [
    'School',
    'SKOOL (स्कूल)',
    'Noun',
    'Classes 1–3',
    'Academic & School',
    'An educational institution where children and students go to learn from teachers.',
    'A structured centre of learning and character development where students receive formal education across academic subjects, sports, arts, and moral values under the guidance of qualified teachers.',
    'शाळा',
    'विद्यार्थ्यांना शिक्षकांकडून विविध विषयांचे शिक्षण व संस्कार दिले जाणारे विद्यामंदिर.',
    'विद्यार्थ्यांच्या बौद्धिक, शारीरिक व नैतिक विकासासाठी विविध विषय, कला, क्रीडा आणि मूल्यांचे औपचारिक शिक्षण देणारी शैक्षणिक संस्था म्हणजे शाळा (विद्यालय).',
    'विद्यालय',
    'वह शैक्षणिक संस्था जहाँ विद्यार्थी शिक्षकों से ज्ञान, शिक्षा और संस्कार प्राप्त करते हैं।',
    'बच्चों और विद्यार्थियों के सर्वांगीण बौद्धिक, चारित्रिक तथा शैक्षणिक विकास के लिए औपचारिक शिक्षा प्रदान करने वाली संस्था को विद्यालय या पाठशाला कहते हैं।',
    [['Academy', 'Educational institution'], ['विद्यालय', 'विद्यामंदिर', 'प्रशाला'], ['पाठशाला', 'शिक्षण संस्थान', 'विद्यामंदिर']],
    [['Ignorance'], ['अज्ञान'], ['अज्ञान']],
    [
      'Our school encourages students to read books in English, Marathi, and Hindi.',
      'आमची शाळा विद्यार्थ्यांना इंग्रजी, मराठी आणि हिंदी पुस्तके वाचण्यास प्रोत्साहन देते.',
      'हमारा विद्यालय विद्यार्थियों को अंग्रेजी, मराठी और हिन्दी पुस्तकें पढ़ने के लिए प्रोत्साहित करता है।',
    ],
    ['Schools (Plural)', 'Schooling (Noun)', 'Scholar (Noun)'],
  ],
];

/**
 * Generates automatic morphological word forms (Plural, Past, Participle, Comparative, Derived forms)
 * plus Marathi and Hindi grammatical variations for any dictionary entry.
 */
export function deriveWordFormsForEntry(
  english: string,
  partOfSpeech: DictionaryPartOfSpeech,
  marathiWord: string,
  hindiWord: string,
  synonyms: { english: string[]; marathi: string[]; hindi: string[] },
  explicitDerived?: string[]
): WordFormsInfo {
  const base = english.trim();
  const lower = base.toLowerCase();
  const info: WordFormsInfo = {
    baseForm: base,
    derivedForms: explicitDerived ? [...explicitDerived] : [],
    marathiForms: [marathiWord, ...synonyms.marathi.slice(0, 2)].filter(Boolean),
    hindiForms: [hindiWord, ...synonyms.hindi.slice(0, 2)].filter(Boolean),
  };

  if (partOfSpeech === 'Noun') {
    if (lower.endsWith('y') && !/[aeiou]y$/.test(lower)) {
      info.pluralOrInflected = `${base.slice(0, -1)}ies`;
    } else if (/(s|x|z|ch|sh)$/.test(lower)) {
      info.pluralOrInflected = `${base}es`;
    } else {
      info.pluralOrInflected = `${base}s`;
    }
    if (info.derivedForms.length === 0) {
      info.derivedForms.push(`${base} (Singular)`, `${info.pluralOrInflected} (Plural)`);
    }
  } else if (partOfSpeech === 'Verb') {
    if (lower.endsWith('e')) {
      info.pastTense = `${base}d`;
      info.pastParticiple = `${base}d`;
      info.presentParticiple = `${base.slice(0, -1)}ing`;
      info.thirdPersonSingular = `${base}s`;
    } else if (lower.endsWith('y') && !/[aeiou]y$/.test(lower)) {
      info.pastTense = `${base.slice(0, -1)}ied`;
      info.pastParticiple = `${base.slice(0, -1)}ied`;
      info.presentParticiple = `${base}ing`;
      info.thirdPersonSingular = `${base.slice(0, -1)}ies`;
    } else {
      info.pastTense = `${base}ed`;
      info.pastParticiple = `${base}ed`;
      info.presentParticiple = `${base}ing`;
      info.thirdPersonSingular = `${base}s`;
    }
    if (info.derivedForms.length === 0) {
      info.derivedForms.push(
        `${info.thirdPersonSingular} (3rd Person)`,
        `${info.presentParticiple} (Gerund / Continuous)`,
        `${info.pastTense} (Past / Participle)`
      );
    }
  } else if (partOfSpeech === 'Adjective') {
    if (lower.length <= 6 && !lower.endsWith('ful') && !lower.endsWith('ous')) {
      const stem = lower.endsWith('e') ? base.slice(0, -1) : base;
      info.comparative = `${stem}er`;
      info.superlative = `${stem}est`;
    } else {
      info.comparative = `More ${lower}`;
      info.superlative = `Most ${lower}`;
    }
    const adv = lower.endsWith('y') ? `${base.slice(0, -1)}ily` : `${base}ly`;
    if (info.derivedForms.length === 0) {
      info.derivedForms.push(
        `${info.comparative} (Comparative)`,
        `${info.superlative} (Superlative)`,
        `${adv} (Adverb form)`
      );
    }
  } else if (info.derivedForms.length === 0) {
    info.derivedForms.push(`${base} (${partOfSpeech})`);
  }

  return info;
}

/**
 * Simple Devanagari-to-Roman phonetic transliteration helper so users can search Marathi/Hindi words
 * using either Devanagari script ("ज्ञान", "क्षमता") OR English Roman letters ("dnyan", "kshamata", "gyan").
 */
const DEVANAGARI_TO_ROMAN_MAP: Record<string, string> = {
  अ: 'a',
  आ: 'aa',
  इ: 'i',
  ई: 'ee',
  उ: 'u',
  ऊ: 'oo',
  ऋ: 'ri',
  ए: 'e',
  ऐ: 'ai',
  ओ: 'o',
  औ: 'au',
  क: 'k',
  ख: 'kh',
  ग: 'g',
  घ: 'gh',
  च: 'ch',
  छ: 'chh',
  ज: 'j',
  झ: 'jh',
  ट: 't',
  ठ: 'th',
  ड: 'd',
  ढ: 'dh',
  ण: 'n',
  त: 't',
  थ: 'th',
  द: 'd',
  ध: 'dh',
  न: 'n',
  प: 'p',
  फ: 'ph',
  ब: 'b',
  भ: 'bh',
  म: 'm',
  य: 'y',
  र: 'r',
  ल: 'l',
  ळ: 'l',
  व: 'v',
  श: 'sh',
  ष: 'sh',
  स: 's',
  ह: 'h',
  क्ष: 'ksh',
  ज्ञ: 'dny',
  'ा': 'a',
  'ि': 'i',
  'ी': 'ee',
  'ु': 'u',
  'ू': 'oo',
  'े': 'e',
  'ै': 'ai',
  'ो': 'o',
  'ौ': 'au',
  'ं': 'n',
  'ः': 'h',
  '्': '',
  'ॅ': 'a',
  'ॉ': 'o',
  'ृ': 'ri',
};

export function transliterateDevanagariToRoman(devanagari: string): string {
  let out = '';
  for (let i = 0; i < devanagari.length; i++) {
    const twoChar = devanagari.slice(i, i + 2);
    if (DEVANAGARI_TO_ROMAN_MAP[twoChar] !== undefined) {
      out += DEVANAGARI_TO_ROMAN_MAP[twoChar];
      i++;
      continue;
    }
    const ch = devanagari[i];
    if (DEVANAGARI_TO_ROMAN_MAP[ch] !== undefined) {
      out += DEVANAGARI_TO_ROMAN_MAP[ch];
    } else if (/[a-zA-Z0-9]/.test(ch)) {
      out += ch.toLowerCase();
    }
  }
  return out;
}

/**
 * Upgrade existing TrilingualWordEntry into a ComprehensiveDictionaryEntry with
 * simpleMeaning, detailedMeaning, wordForms, and Roman search keys.
 */
export function upgradeToComprehensiveEntry(
  base: TrilingualWordEntry,
  customSimple?: { english: string; marathi: string; hindi: string },
  customDetailed?: { english: string; marathi: string; hindi: string },
  explicitDerived?: string[],
  sourceAttribution: string = 'MyStudyZone Verified Trilingual Educational Lexicon (Classes 1–10)'
): ComprehensiveDictionaryEntry {
  const simpleEn = customSimple?.english || base.englishMeaning;
  const simpleMr = customSimple?.marathi || base.marathiMeaning;
  const simpleHi = customSimple?.hindi || base.hindiMeaning;

  const detailedEn =
    customDetailed?.english ||
    `${base.englishMeaning} Commonly used as a ${base.partOfSpeech.toLowerCase()} in ${base.category} (${base.classGroup}). Synonyms include ${base.synonyms.english.join(', ')}.`;
  const detailedMr =
    customDetailed?.marathi ||
    `‘${base.marathiWord}’ (${base.english}) — ${base.marathiMeaning} समानार्थी शब्द: ${base.synonyms.marathi.join(', ')}. विरुद्धार्थी शब्द: ${base.antonyms.marathi.join(', ')}.`;
  const detailedHi =
    customDetailed?.hindi ||
    `‘${base.hindiWord}’ (${base.english}) — ${base.hindiMeaning} पर्यायवाची शब्द: ${base.synonyms.hindi.join(', ')}. विलोम शब्द: ${base.antonyms.hindi.join(', ')}.`;

  const wordForms = deriveWordFormsForEntry(
    base.english,
    base.partOfSpeech,
    base.marathiWord,
    base.hindiWord,
    base.synonyms,
    explicitDerived
  );

  const romanMarathiKeys = [
    transliterateDevanagariToRoman(base.marathiWord),
    ...base.synonyms.marathi.map(transliterateDevanagariToRoman),
  ].filter(Boolean);

  const romanHindiKeys = [
    transliterateDevanagariToRoman(base.hindiWord),
    ...base.synonyms.hindi.map(transliterateDevanagariToRoman),
  ].filter(Boolean);

  return {
    ...base,
    simpleMeaning: {
      english: simpleEn,
      marathi: simpleMr,
      hindi: simpleHi,
    },
    detailedMeaning: {
      english: detailedEn,
      marathi: detailedMr,
      hindi: detailedHi,
    },
    wordForms,
    romanMarathiKeys,
    romanHindiKeys,
    sourceAttribution,
  };
}

let cachedComprehensiveLexicon: ComprehensiveDictionaryEntry[] | null = null;

export function getComprehensiveTrilingualLexicon(): ComprehensiveDictionaryEntry[] {
  if (cachedComprehensiveLexicon) return cachedComprehensiveLexicon;

  const map = new Map<string, ComprehensiveDictionaryEntry>();

  // 1. Preserve 100% of existing verified dictionary entries
  for (const item of INITIAL_TRILINGUAL_DICTIONARY) {
    map.set(item.english.toLowerCase(), upgradeToComprehensiveEntry(item));
  }

  // 2. Merge extended curriculum lexicon entries
  EXTENDED_CURRICULUM_LEXICON_TUPLES.forEach((t, idx) => {
    const [
      english,
      pronunciation,
      partOfSpeech,
      classGroup,
      category,
      simpleEn,
      detailedEn,
      marathiWord,
      simpleMr,
      detailedMr,
      hindiWord,
      simpleHi,
      detailedHi,
      [enSyn, mrSyn, hiSyn],
      [enAnt, mrAnt, hiAnt],
      [enEx, mrEx, hiEx],
      derivedForms,
    ] = t;

    const baseEntry: TrilingualWordEntry = {
      id: `ext-dict-${idx + 1}-${english.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      english,
      pronunciation,
      partOfSpeech,
      classGroup,
      category,
      englishMeaning: simpleEn,
      marathiWord,
      marathiMeaning: simpleMr,
      hindiWord,
      hindiMeaning: simpleHi,
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
        english: enEx,
        marathi: mrEx,
        hindi: hiEx,
      },
      letter: english.charAt(0).toUpperCase(),
    };

    map.set(
      english.toLowerCase(),
      upgradeToComprehensiveEntry(
        baseEntry,
        { english: simpleEn, marathi: simpleMr, hindi: simpleHi },
        { english: detailedEn, marathi: detailedMr, hindi: detailedHi },
        derivedForms
      )
    );
  });

  // 3. Also index every unique Synonym & Antonym pair from the verified entries as its own cross-referenced headword
  // so students searching any synonym (e.g. "Bravery", "Capability", "Velocity", "Trustworthy", "Persevere") find a complete verified word card!
  const snapshotEntries = Array.from(map.values());
  let synCounter = 1;
  for (const parent of snapshotEntries) {
    const maxSyns = Math.min(
      parent.synonyms.english.length,
      parent.synonyms.marathi.length,
      parent.synonyms.hindi.length
    );
    for (let i = 0; i < maxSyns; i++) {
      const synEnRaw = parent.synonyms.english[i].trim();
      const synMrRaw = parent.synonyms.marathi[i].trim();
      const synHiRaw = parent.synonyms.hindi[i].trim();

      // Only promote single-word or clean two-word synonyms not already present as primary headwords
      if (
        synEnRaw &&
        synMrRaw &&
        synHiRaw &&
        /^[A-Za-z][A-Za-z\s-]{1,22}$/.test(synEnRaw) &&
        !map.has(synEnRaw.toLowerCase())
      ) {
        const formattedEn = synEnRaw.charAt(0).toUpperCase() + synEnRaw.slice(1);
        const synBase: TrilingualWordEntry = {
          id: `syn-dict-${synCounter++}-${formattedEn.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          english: formattedEn,
          pronunciation: `${formattedEn.toLowerCase()} (Related to ${parent.english})`,
          partOfSpeech: parent.partOfSpeech,
          classGroup: parent.classGroup,
          category: parent.category,
          englishMeaning: `${parent.englishMeaning} ( closely related to ${parent.english}).`,
          marathiWord: synMrRaw,
          marathiMeaning: `${parent.marathiMeaning} (मूळ संदर्भ शब्द: ${parent.marathiWord}).`,
          hindiWord: synHiRaw,
          hindiMeaning: `${parent.hindiMeaning} (मूल संदर्भ शब्द: ${parent.hindiWord})।`,
          synonyms: {
            english: [parent.english, ...parent.synonyms.english.filter((s) => s !== synEnRaw)],
            marathi: [parent.marathiWord, ...parent.synonyms.marathi.filter((s) => s !== synMrRaw)],
            hindi: [parent.hindiWord, ...parent.synonyms.hindi.filter((s) => s !== synHiRaw)],
          },
          antonyms: parent.antonyms,
          examples: parent.examples,
          letter: formattedEn.charAt(0).toUpperCase(),
        };
        map.set(
          formattedEn.toLowerCase(),
          upgradeToComprehensiveEntry(
            synBase,
            {
              english: synBase.englishMeaning,
              marathi: synBase.marathiMeaning,
              hindi: synBase.hindiMeaning,
            },
            {
              english: `${parent.detailedMeaning.english} ("${formattedEn}" is a verified synonym of "${parent.english}").`,
              marathi: `${parent.detailedMeaning.marathi}`,
              hindi: `${parent.detailedMeaning.hindi}`,
            }
          )
        );
      }
    }
  }

  cachedComprehensiveLexicon = Array.from(map.values()).sort((a, b) =>
    a.english.localeCompare(b.english)
  );
  return cachedComprehensiveLexicon;
}

/**
 * Bounded Levenshtein edit distance for spelling correction ("knowlege" -> "Knowledge", "abillity" -> "Ability").
 */
export function computeLevenshteinDistance(a: string, b: string): number {
  const s1 = a.toLowerCase();
  const s2 = b.toLowerCase();
  if (s1 === s2) return 0;
  if (s1.length === 0) return s2.length;
  if (s2.length === 0) return s1.length;
  if (Math.abs(s1.length - s2.length) > 4) return 5;

  const matrix: number[][] = [];
  for (let i = 0; i <= s1.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= s2.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[s1.length][s2.length];
}

export interface DictionarySearchMatch {
  entry: ComprehensiveDictionaryEntry;
  matchType: 'exact' | 'prefix' | 'substring' | 'synonym' | 'spelling';
  matchedLanguage: DictionaryLanguage;
  score: number;
}

/**
 * Single-word intelligent search & suggestion engine across English, Marathi, and Hindi.
 * Supports exact matches, partial-word prefix/substring matches, Devanagari script,
 * Roman transliteration, and fuzzy spelling suggestions.
 */
export function searchDictionarySuggestions(
  allEntries: ComprehensiveDictionaryEntry[],
  rawQuery: string,
  languageFilter: 'all' | DictionaryLanguage = 'all',
  maxResults: number = 10
): {
  directMatches: DictionarySearchMatch[];
  spellingSuggestions: DictionarySearchMatch[];
} {
  const q = rawQuery.trim().toLowerCase();
  if (!q) {
    return { directMatches: [], spellingSuggestions: [] };
  }

  const directMatches: DictionarySearchMatch[] = [];
  const spellingCandidates: DictionarySearchMatch[] = [];

  for (const entry of allEntries) {
    const enLower = entry.english.toLowerCase();
    const mrWord = entry.marathiWord.toLowerCase();
    const hiWord = entry.hindiWord.toLowerCase();

    let bestScore = 0;
    let bestType: DictionarySearchMatch['matchType'] = 'substring';
    let matchedLang: DictionaryLanguage = 'en';

    // 1. Check English
    if (languageFilter === 'all' || languageFilter === 'en') {
      if (enLower === q) {
        bestScore = 1000;
        bestType = 'exact';
        matchedLang = 'en';
      } else if (enLower.startsWith(q)) {
        bestScore = Math.max(bestScore, 800 - (enLower.length - q.length));
        bestType = 'prefix';
        matchedLang = 'en';
      } else if (enLower.includes(q)) {
        bestScore = Math.max(bestScore, 600);
        bestType = 'substring';
        matchedLang = 'en';
      } else if (entry.synonyms.english.some((s) => s.toLowerCase().startsWith(q))) {
        bestScore = Math.max(bestScore, 500);
        bestType = 'synonym';
        matchedLang = 'en';
      } else if (entry.wordForms.derivedForms.some((f) => f.toLowerCase().startsWith(q))) {
        bestScore = Math.max(bestScore, 480);
        bestType = 'prefix';
        matchedLang = 'en';
      }
    }

    // 2. Check Marathi (Devanagari & Roman transliteration)
    if (languageFilter === 'all' || languageFilter === 'mr') {
      if (mrWord === q || entry.synonyms.marathi.some((s) => s.toLowerCase() === q)) {
        if (980 > bestScore) {
          bestScore = 980;
          bestType = 'exact';
          matchedLang = 'mr';
        }
      } else if (
        mrWord.startsWith(q) ||
        entry.synonyms.marathi.some((s) => s.toLowerCase().startsWith(q)) ||
        entry.romanMarathiKeys.some((rk) => rk === q || rk.startsWith(q))
      ) {
        if (780 > bestScore) {
          bestScore = 780;
          bestType = 'prefix';
          matchedLang = 'mr';
        }
      } else if (
        mrWord.includes(q) ||
        entry.simpleMeaning.marathi.toLowerCase().includes(q)
      ) {
        if (550 > bestScore) {
          bestScore = 550;
          bestType = 'substring';
          matchedLang = 'mr';
        }
      }
    }

    // 3. Check Hindi (Devanagari & Roman transliteration)
    if (languageFilter === 'all' || languageFilter === 'hi') {
      if (hiWord === q || entry.synonyms.hindi.some((s) => s.toLowerCase() === q)) {
        if (975 > bestScore) {
          bestScore = 975;
          bestType = 'exact';
          matchedLang = 'hi';
        }
      } else if (
        hiWord.startsWith(q) ||
        entry.synonyms.hindi.some((s) => s.toLowerCase().startsWith(q)) ||
        entry.romanHindiKeys.some((rk) => rk === q || rk.startsWith(q))
      ) {
        if (775 > bestScore) {
          bestScore = 775;
          bestType = 'prefix';
          matchedLang = 'hi';
        }
      } else if (
        hiWord.includes(q) ||
        entry.simpleMeaning.hindi.toLowerCase().includes(q)
      ) {
        if (545 > bestScore) {
          bestScore = 545;
          bestType = 'substring';
          matchedLang = 'hi';
        }
      }
    }

    if (bestScore > 0) {
      directMatches.push({
        entry,
        matchType: bestType,
        matchedLanguage: matchedLang,
        score: bestScore,
      });
    } else if (q.length >= 3) {
      // Check Levenshtein spelling distance against English, Marathi, Hindi, and Roman keys
      const maxAllowedDist = q.length <= 5 ? 1 : 2;
      const distEn = computeLevenshteinDistance(q, enLower);
      const distMr = computeLevenshteinDistance(q, mrWord);
      const distHi = computeLevenshteinDistance(q, hiWord);
      const distRomanMr = Math.min(
        ...entry.romanMarathiKeys.map((rk) => computeLevenshteinDistance(q, rk)),
        99
      );
      const distRomanHi = Math.min(
        ...entry.romanHindiKeys.map((rk) => computeLevenshteinDistance(q, rk)),
        99
      );

      const minDist = Math.min(distEn, distMr, distHi, distRomanMr, distRomanHi);
      if (minDist <= maxAllowedDist) {
        const lang: DictionaryLanguage =
          minDist === distMr || minDist === distRomanMr
            ? 'mr'
            : minDist === distHi || minDist === distRomanHi
            ? 'hi'
            : 'en';
        spellingCandidates.push({
          entry,
          matchType: 'spelling',
          matchedLanguage: lang,
          score: 300 - minDist * 80,
        });
      }
    }
  }

  directMatches.sort((a, b) => b.score - a.score || a.entry.english.localeCompare(b.entry.english));
  spellingCandidates.sort(
    (a, b) => b.score - a.score || a.entry.english.localeCompare(b.entry.english)
  );

  return {
    directMatches: directMatches.slice(0, maxResults),
    spellingSuggestions: spellingCandidates.slice(0, 6),
  };
}
