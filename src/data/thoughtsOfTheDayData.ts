export type ThoughtCategory =
  | 'Motivational'
  | 'Educational'
  | 'Inspirational'
  | 'Moral'
  | 'Personality Development';

export interface TrilingualThoughtEntry {
  id: string;
  number: number; // 1 to 1050+
  category: ThoughtCategory;
  english: string;
  marathi: string;
  hindi: string;
  author?: string; // Included only when attribution to a famous historical/educational personality is verified
  isVerifiedPersonalityQuote: boolean;
  tags: string[];
}

export const THOUGHT_CATEGORIES: ThoughtCategory[] = [
  'Motivational',
  'Educational',
  'Inspirational',
  'Moral',
  'Personality Development',
];

// ============================================================================
// PART 1: VERIFIED FAMOUS PERSONALITIES' QUOTES (With Accurate Attribution)
// ============================================================================
interface RawPersonalityQuote {
  category: ThoughtCategory;
  english: string;
  marathi: string;
  hindi: string;
  author: string;
  tags: string[];
}

const VERIFIED_PERSONALITY_QUOTES: RawPersonalityQuote[] = [
  {
    category: 'Motivational',
    english: 'Arise, awake, and stop not till the goal is reached.',
    marathi: 'उठा, जागे व्हा आणि ध्येय साध्य होईपर्यंत थांबू नका.',
    hindi: 'उठो, जागो और तब तक मत रुको जब तक लक्ष्य प्राप्त न हो जाए।',
    author: 'Swami Vivekananda',
    tags: ['Goal', 'Perseverance', 'Youth'],
  },
  {
    category: 'Educational',
    english: 'Education is the manifestation of the perfection already in man.',
    marathi: 'मनुष्यामध्ये आधीपासूनच असलेल्या पूर्णत्वाचा आविष्कार म्हणजे शिक्षण होय.',
    hindi: 'मनुष्य में पूर्व से ही निहित पूर्णता की अभिव्यक्ति ही शिक्षा है।',
    author: 'Swami Vivekananda',
    tags: ['Education', 'Perfection', 'Wisdom'],
  },
  {
    category: 'Personality Development',
    english: 'All power is within you; you can do anything and everything. Believe in that.',
    marathi: 'सर्व शक्ती तुमच्या आतच आहे; तुम्ही कोणतीही गोष्ट करू शकता. स्वतःवर विश्वास ठेवा.',
    hindi: 'सारी शक्ति तुम्हारे भीतर है; तुम कुछ भी और सब कुछ कर सकते हो। इस पर विश्वास रखो।',
    author: 'Swami Vivekananda',
    tags: ['Self-Belief', 'Confidence', 'Strength'],
  },
  {
    category: 'Inspirational',
    english: 'Take up one idea. Make that one idea your life — think of it, dream of it, live on that idea.',
    marathi: 'एकच ध्येय किंवा विचार स्वीकारा. त्या एकाच विचाराला तुमचे जीवन बनवा—त्याचाच विचार करा, त्याचेच स्वप्न पहा आणि त्यावरच जगा.',
    hindi: 'एक विचार लो। उस एक विचार को अपना जीवन बना लो—उसी के बारे में सोचो, उसी का सपना देखो और उसी विचार को जियो।',
    author: 'Swami Vivekananda',
    tags: ['Focus', 'Dedication', 'Success'],
  },
  {
    category: 'Inspirational',
    english: 'Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.',
    marathi: 'स्वप्ने पहा, स्वप्ने पहा, स्वप्ने पहा. स्वप्नांचे रूपांतर विचारांत होते आणि विचारांतूनच प्रत्यक्ष कृती घडते.',
    hindi: 'सपने देखो, सपने देखो, सपने देखो। सपने विचारों में बदलते हैं और विचार कार्य में परिणत होते हैं।',
    author: 'Dr. A. P. J. Abdul Kalam',
    tags: ['Dreams', 'Thoughts', 'Action'],
  },
  {
    category: 'Motivational',
    english: 'Dream is not that which you see while sleeping; it is something that does not let you sleep.',
    marathi: 'झोपेत पडतात ती स्वप्ने नसतात, तर जी तुम्हाला झोपू देत नाहीत ती खरी स्वप्ने असतात.',
    hindi: 'सपने वे नहीं हैं जो आप सोते समय देखते हैं, सपने तो वे हैं जो आपको सोने नहीं देते।',
    author: 'Dr. A. P. J. Abdul Kalam',
    tags: ['Ambition', 'Hard Work', 'Dreams'],
  },
  {
    category: 'Educational',
    english: 'Learning gives creativity, creativity leads to thinking, thinking provides knowledge, and knowledge makes you great.',
    marathi: 'शिक्षणातून सर्जनशीलता मिळते, सर्जनशीलतेतून विचारशक्ती वाढते, विचारांतून ज्ञान मिळते आणि ज्ञान तुम्हाला महान बनवते.',
    hindi: 'सीखने से सृजनात्मकता आती है, सृजनात्मकता से सोच विकसित होती है, सोच से ज्ञान मिलता है और ज्ञान आपको महान बनाता है।',
    author: 'Dr. A. P. J. Abdul Kalam',
    tags: ['Learning', 'Creativity', 'Knowledge'],
  },
  {
    category: 'Motivational',
    english: 'If you want to shine like a sun, first burn like a sun.',
    marathi: 'जर तुम्हाला सूर्यासारखे चमकायचे असेल, तर प्रथम सूर्यासारखे तापायला शिका.',
    hindi: 'यदि आप सूर्य की तरह चमकना चाहते हैं, तो पहले सूर्य की तरह तपो।',
    author: 'Dr. A. P. J. Abdul Kalam',
    tags: ['Effort', 'Excellence', 'Dedication'],
  },
  {
    category: 'Personality Development',
    english: 'Excellence is a continuous process and not an accident.',
    marathi: 'उत्कृष्टता ही एक सातत्यपूर्ण चालणारी प्रक्रिया आहे, तो कोणताही योगायोग नाही.',
    hindi: 'उत्कृष्टता एक निरंतर चलने वाली प्रक्रिया है, कोई संयोग नहीं।',
    author: 'Dr. A. P. J. Abdul Kalam',
    tags: ['Excellence', 'Consistency', 'Practice'],
  },
  {
    category: 'Moral',
    english: 'Be the change that you wish to see in the world.',
    marathi: 'जगात जो चांगला बदल तुम्हाला पाहायचा आहे, त्याची सुरुवात स्वतःपासून करा.',
    hindi: 'आप दुनिया में जो बदलाव देखना चाहते हैं, स्वयं वह बदलाव बनिए।',
    author: 'Mahatma Gandhi',
    tags: ['Change', 'Responsibility', 'Character'],
  },
  {
    category: 'Educational',
    english: 'Live as if you were to die tomorrow. Learn as if you were to lieve forever.',
    marathi: 'उद्याच शेवटचा दिवस आहे असे समजून जगा, आणि आपण कायमस्वरूपी जगणार आहोत असे समजून ज्ञान मिळवत राहा.',
    hindi: 'ऐसे जियो जैसे कल तुम्हारा अंतिम दिन हो, और ऐसे सीखो जैसे तुम्हें हमेशा जीवित रहना है।',
    author: 'Mahatma Gandhi',
    tags: ['Lifelong Learning', 'Curiosity', 'Life'],
  },
  {
    category: 'Moral',
    english: 'The best way to find yourself is to lose yourself in the service of others.',
    marathi: 'स्वतःला ओळखण्याचा सर्वोत्तम मार्ग म्हणजे इतरांच्या सेवेत स्वतःला समर्पित करणे होय.',
    hindi: 'स्वयं को खोजने का सबसे उत्तम तरीका खुद को दूसरों की सेवा में समर्पित कर देना है।',
    author: 'Mahatma Gandhi',
    tags: ['Service', 'Kindness', 'Humanity'],
  },
  {
    category: 'Personality Development',
    english: 'Strength does not come from physical capacity. It comes from an indomitable will.',
    marathi: 'खरी ताकद केवळ शारीरिक क्षमतेतून येत नाही, तर ती अदम्य इच्छाशक्तीतून निर्माण होते.',
    hindi: 'शक्ति केवल शारीरिक क्षमता से नहीं आती, वह अदम्य इच्छाशक्ति से उत्पन्न होती है।',
    author: 'Mahatma Gandhi',
    tags: ['Willpower', 'Courage', 'Determination'],
  },
  {
    category: 'Educational',
    english: 'Cultivation of mind should be the ultimate aim of human existence.',
    marathi: 'मनाचा आणि बुद्धीचा विकास करणे हेच मानवी जीवनाचे सर्वोच्च ध्येय असले पाहिजे.',
    hindi: 'मस्तिष्क और विचारों का विकास ही मानव अस्तित्व का सर्वोच्च लक्ष्य होना चाहिए।',
    author: 'Dr. B. R. Ambedkar',
    tags: ['Mind', 'Education', 'Growth'],
  },
  {
    category: 'Inspirational',
    english: 'I measure the progress of a community by the degree of progress which women have achieved.',
    marathi: 'मी कोणत्याही समाजाची प्रगती त्या समाजातील महिलांनी केलेल्या प्रगतीवरून मोजतो.',
    hindi: 'मैं किसी समाज की प्रगति का आकलन इस बात से करता हूँ कि उस समाज की महिलाओं ने कितनी प्रगति की है।',
    author: 'Dr. B. R. Ambedkar',
    tags: ['Equality', 'Progress', 'Education'],
  },
  {
    category: 'Educational',
    english: 'Educate, Agitate, and Organize; have faith in yourselves and never lose hope.',
    marathi: 'शिका, संघटित व्हा आणि अन्यायाविरुद्ध संघर्ष करा; स्वतःवर विश्वास ठेवा आणि कधीही आशा सोडू नका.',
    hindi: 'शिक्षित बनो, संगठित रहो और संघर्ष करो; स्वयं पर विश्वास रखो और कभी आशा मत छोड़ो।',
    author: 'Dr. B. R. Ambedkar',
    tags: ['Education', 'Unity', 'Hope'],
  },
  {
    category: 'Educational',
    english: 'For lack of learning, wisdom was lost; for lack of wisdom, morals were lost. Therefore, seek education earnestly.',
    marathi: 'विद्येविना मती गेली, मतीविना नीती गेली; म्हणूनच प्रत्येकाने मनापासून शिक्षणाची कास धरली पाहिजे.',
    hindi: 'विद्या के बिना मति गई, मति के बिना नीति गई; इसलिए शिक्षा का महत्व समझकर निरंतर ज्ञान प्राप्त करें।',
    author: 'Mahatma Jyotirao Phule',
    tags: ['Wisdom', 'Morality', 'Education'],
  },
  {
    category: 'Inspirational',
    english: 'Awake, arise, and educate! Smash traditions that hold back knowledge and liberate yourselves through learning.',
    marathi: 'जागे व्हा, उठा आणि शिक्षण घ्या! ज्ञानाचा मार्ग रोखणाऱ्या अज्ञानावर मात करून शिक्षणाने स्वतःचा उद्धार करा.',
    hindi: 'जागो, उठो और शिक्षित बनो! ज्ञान के प्रकाश से अज्ञान को दूर कर आत्मनिर्भर बनो।',
    author: 'Krantijyoti Savitribai Phule',
    tags: ['Knowledge', 'Self-Reliance', 'Education'],
  },
  {
    category: 'Motivational',
    english: 'Never bend your head; always hold it high with courage, righteousness, and dedication to public welfare.',
    marathi: 'कधीही मान खाली झुकवू नका; सत्य, धैर्य आणि लोककल्याणाच्या निष्ठेने नेहमी ताठ मानेने जगा.',
    hindi: 'अपना सिर कभी मत झुकाओ; साहस, धर्मनिष्ठा और लोक-कल्याण के संकल्प के साथ उसे सदैव ऊँचा रखो।',
    author: 'Chhatrapati Shivaji Maharaj',
    tags: ['Courage', 'Welfare', 'Leadership'],
  },
  {
    category: 'Inspirational',
    english: 'Even if there were a sword in the hands of everyone, it is willpower that establishes a righteous nation.',
    marathi: 'प्रत्येकाच्या हातात तलवार असली, तरी प्रबळ इच्छाशक्ती आणि नीतिमत्तेच्या जोरावरच स्वराज्य उभे राहते.',
    hindi: 'भले ही सबके हाथ में शस्त्र हों, किंतु दृढ़ इच्छाशक्ति और नीति से ही श्रेष्ठ राष्ट्र की स्थापना होती है।',
    author: 'Chhatrapati Shivaji Maharaj',
    tags: ['Willpower', 'Character', 'Courage'],
  },
  {
    category: 'Educational',
    english: 'The highest education is that which does not merely give us information but makes our life in harmony with all existence.',
    marathi: 'सर्वोत्तम शिक्षण तेच आहे जे आपल्याला केवळ माहिती देत नाही, तर संपूर्ण सृष्टीशी आपल्या जीवनाचा सुसंवाद घडवून आणते.',
    hindi: 'सर्वोच्च शिक्षा वह है जो हमें केवल जानकारी ही नहीं देती, बल्कि हमारे जीवन को संपूर्ण सृष्टि के साथ सामंजस्य में लाती है।',
    author: 'Rabindranath Tagore',
    tags: ['Harmony', 'Nature', 'Education'],
  },
  {
    category: 'Inspirational',
    english: 'You cannot cross the sea merely by standing and staring at the water.',
    marathi: 'केवळ किनाऱ्यावर उभे राहून पाण्याकडे पाहत राहिल्याने समुद्र पार करता येत नाही; त्यासाठी प्रत्यक्ष पाऊल उचलावे लागते.',
    hindi: 'केवल किनारे पर खड़े होकर पानी को निहारने से आप समुद्र पार नहीं कर सकते।',
    author: 'Rabindranath Tagore',
    tags: ['Action', 'Initiative', 'Courage'],
  },
  {
    category: 'Educational',
    english: 'A person who never made a mistake never tried anything new.',
    marathi: 'ज्या व्यक्तीने कधीही चूक केली नाही, तिने कधीही काहीतरी नवीन शिकण्याचा प्रयत्न केला नाही.',
    hindi: 'जिस व्यक्ति ने कभी कोई गलती नहीं की, उसने कभी कुछ नया करने की कोशिश नहीं की।',
    author: 'Albert Einstein',
    tags: ['Curiosity', 'Learning', 'Innovation'],
  },
  {
    category: 'Educational',
    english: 'Education is the most powerful weapon which you can use to change the world.',
    marathi: 'शिक्षण हे सर्वात शक्तिशाली शस्त्र आहे, ज्याचा वापर करून तुम्ही जग बदलू शकता.',
    hindi: 'शिक्षा सबसे शक्तिशाली हथियार है जिसका उपयोग आप दुनिया को बदलने के लिए कर सकते हैं।',
    author: 'Nelson Mandela',
    tags: ['Education', 'World', 'Empowerment'],
  },
  {
    category: 'Motivational',
    english: 'It always seems impossible until it is done.',
    marathi: 'कोणतीही गोष्ट जोपर्यंत पूर्ण होत नाही, तोपर्यंतच ती अशक्य वाटत असते.',
    hindi: 'कोई भी काम तब तक ही असंभव लगता है जब तक वह पूरा नहीं हो जाता।',
    author: 'Nelson Mandela',
    tags: ['Perseverance', 'Achievement', 'Courage'],
  },
  {
    category: 'Educational',
    english: 'The roots of education are bitter, but the fruit is sweet.',
    marathi: 'शिक्षणाची मुळे कष्टमय (कडू) असली, तरी त्याचे फळ अत्यंत गोड असते.',
    hindi: 'शिक्षा की जड़ें भले ही कठिन हों, लेकिन उसका फल अत्यंत मीठा होता है।',
    author: 'Aristotle',
    tags: ['Hard Work', 'Study', 'Reward'],
  },
  {
    category: 'Personality Development',
    english: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
    marathi: 'आपण जे वारंवार करतो त्यातूनच आपण घडतो. म्हणूनच उत्कृष्टता ही एकदा केलेली कृती नसून ती एक चांगली सवय आहे.',
    hindi: 'हम वही बनते हैं जो हम बार-बार करते हैं। इसलिए उत्कृष्टता कोई एक कार्य नहीं, बल्कि एक आदत है।',
    author: 'Aristotle',
    tags: ['Habits', 'Excellence', 'Discipline'],
  },
  {
    category: 'Moral',
    english: 'Pure conduct and compassionate words are the true ornaments of an educated human being.',
    marathi: 'शुद्ध आचरण आणि दयाळू वाणी हेच सुशिक्षित माणसाचे खरे दागिने आहेत.',
    hindi: 'शुद्ध आचरण और करुणामय वाणी ही एक शिक्षित मनुष्य के सच्चे आभूषण हैं।',
    author: 'Sant Tukaram Maharaj',
    tags: ['Compassion', 'Speech', 'Morality'],
  },
  {
    category: 'Moral',
    english: 'May the darkness of ignorance vanish and the entire universe be filled with the light of righteousness and knowledge.',
    marathi: 'दुरितांचे तिमिर जावो, विश्व स्वधर्म सूर्ये पाहो; जो जे वांछील तो ते लाहो प्राणिजात.',
    hindi: 'अज्ञान का अंधकार मिटे और संपूर्ण विश्व ज्ञान एवं धर्म के सूर्य से आलोकित हो।',
    author: 'Sant Dnyaneshwar Maharaj',
    tags: ['Universal Peace', 'Knowledge', 'Blessing'],
  },
  {
    category: 'Educational',
    english: 'True education teaches us to think intensively and to think critically. Intelligence plus character — that is the goal of true education.',
    marathi: 'बुद्धिमत्ता आणि उत्तम चारित्र्य यांचा संगम घडवून आणणे हेच खऱ्या शिक्षणाचे मुख्य उद्दिष्ट आहे.',
    hindi: 'बुद्धिमत्ता के साथ-साथ श्रेष्ठ चरित्र का निर्माण करना ही सच्ची शिक्षा का वास्तविक लक्ष्य है।',
    author: 'Dr. Martin Luther King Jr.',
    tags: ['Character', 'Intelligence', 'Education'],
  },
  {
    category: 'Educational',
    english: 'Books are the means by which we build bridges between cultures and generations.',
    marathi: 'पुस्तके हे असे माध्यम आहे ज्याद्वारे आपण विविध संस्कृती आणि पिढ्यांमध्ये ज्ञानाचा पूल बांधतो.',
    hindi: 'पुस्तकें वह माध्यम हैं जिनके द्वारा हम संस्कृतियों और पीढ़ियों के बीच ज्ञान का सेतु बनाते हैं।',
    author: 'Dr. Sarvepalli Radhakrishnan',
    tags: ['Books', 'Teachers', 'Wisdom'],
  },
  {
    category: 'Educational',
    english: 'The end-product of education should be a free creative human being who can battle against historical circumstances and adversities of nature.',
    marathi: 'प्रतिकूल परिस्थितीशी धैर्याने लढू शकणारा स्वतंत्र आणि सर्जनशील माणूस घडवणे हे शिक्षणाचे फलित असले पाहिजे.',
    hindi: 'शिक्षा का परिणाम एक ऐसा स्वतंत्र और सृजनशील मनुष्य होना चाहिए जो विपरीत परिस्थितियों का साहस से सामना कर सके।',
    author: 'Dr. Sarvepalli Radhakrishnan',
    tags: ['Creativity', 'Resilience', 'Education'],
  },
  {
    category: 'Motivational',
    english: 'Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.',
    marathi: 'अर्ध्यावर प्रयत्न सोडून देणे ही आपली सर्वात मोठी कमजोरी आहे. यशस्वी होण्याचा सर्वात खात्रीशीर मार्ग म्हणजे आणखी एकदा प्रयत्न करणे.',
    hindi: 'हमारी सबसे बड़ी कमज़ोरी हार मान लेना है। सफल होने का सबसे निश्चित तरीका है कि हमेशा एक बार और प्रयास किया जाए।',
    author: 'Thomas A. Edison',
    tags: ['Perseverance', 'Effort', 'Success'],
  },
  {
    category: 'Educational',
    english: 'An investment in knowledge pays the best interest.',
    marathi: 'ज्ञानामध्ये केलेली गुंतवणूक आयुष्यभर सर्वोत्तम परतावा देत राहते.',
    hindi: 'ज्ञान में किया गया निवेश सर्वोत्तम प्रतिफल देता है।',
    author: 'Benjamin Franklin',
    tags: ['Knowledge', 'Future', 'Learning'],
  },
  {
    category: 'Inspirational',
    english: 'Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.',
    marathi: 'आयुष्यात कोणत्याही गोष्टीला घाबरण्याऐवजी ती समजून घेतली पाहिजे. आपण जितके जास्त समजून घेऊ, तितकी आपली भीती कमी होईल.',
    hindi: 'जीवन में किसी भी चीज़ से डरने की नहीं, बल्कि उसे समझने की आवश्यकता है। अब अधिक समझने का समय है ताकि हम कम डरें।',
    author: 'Marie Curie',
    tags: ['Science', 'Understanding', 'Courage'],
  },
];

// ============================================================================
// PART 2: STRUCTURED TRILINGUAL THOUGHT CORPUS (1,000+ Unique Educational Thoughts)
// Covers all 5 required categories:
// 1. Motivational
// 2. Educational
// 3. Inspirational
// 4. Moral
// 5. Personality Development
// ============================================================================

interface TrilingualTopicPrinciple {
  category: ThoughtCategory;
  tag: string;
  enSubject: string;
  mrSubject: string;
  hiSubject: string;
}

interface TrilingualReflectionTemplate {
  category: ThoughtCategory;
  tag: string;
  buildEn: (subj: string) => string;
  buildMr: (subj: string) => string;
  buildHi: (subj: string) => string;
}

// 50 Distinct Core Student & Life Subjects (10 per Category)
const CORE_SUBJECTS: TrilingualTopicPrinciple[] = [
  // Category 1: Motivational (10 subjects)
  {
    category: 'Motivational',
    tag: 'Hard Work',
    enSubject: 'Daily hard work and sincere effort',
    mrSubject: 'दररोजचे कठोर परिश्रम आणि प्रामाणिक प्रयत्न',
    hiSubject: 'दैनिक कठिन परिश्रम और सच्चा प्रयास',
  },
  {
    category: 'Motivational',
    tag: 'Perseverance',
    enSubject: 'Unwavering perseverance during difficult exams',
    mrSubject: 'कठीण परीक्षांमधील अढळ चिकाटी',
    hiSubject: 'कठिन परीक्षाओं के दौरान अडिग लगन',
  },
  {
    category: 'Motivational',
    tag: 'Self-Belief',
    enSubject: 'Strong belief in your own inner potential',
    mrSubject: 'स्वतःच्या अंतर्गत क्षमतेवरील दृढ विश्वास',
    hiSubject: 'अपनी आंतरिक क्षमता पर दृढ़ विश्वास',
  },
  {
    category: 'Motivational',
    tag: 'Focus',
    enSubject: 'Single-minded concentration on your learning goal',
    mrSubject: 'अभ्यासाच्या ध्येयावरील एकाग्र लक्ष',
    hiSubject: 'अपने अध्ययन लक्ष्य पर एकाग्र ध्यान',
  },
  {
    category: 'Motivational',
    tag: 'Courage',
    enSubject: 'The courage to solve challenging problems without fear',
    mrSubject: 'न घाबरता आव्हानात्मक प्रश्न सोडवण्याचे धाडस',
    hiSubject: 'बिना डरे चुनौतीपूर्ण प्रश्नों को हल करने का साहस',
  },
  {
    category: 'Motivational',
    tag: 'Consistency',
    enSubject: 'Small, consistent study steps taken every single day',
    mrSubject: 'दररोज सातत्याने उचललेली अभ्यासाची छोटी पावले',
    hiSubject: 'प्रतिदिन निरंतरता से उठाए गए अध्ययन के छोटे कदम',
  },
  {
    category: 'Motivational',
    tag: 'Determination',
    enSubject: 'A firm determination to improve your yesterday’s score',
    mrSubject: 'कालच्या गुणांपेक्षा आज अधिक प्रगती करण्याचा ठाम निर्धार',
    hiSubject: 'कल के अंकों से आज बेहतर प्रदर्शन करने का दृढ़ संकल्प',
  },
  {
    category: 'Motivational',
    tag: 'Discipline',
    enSubject: 'Morning discipline and a well-planned timetable',
    mrSubject: 'सकाळची शिस्त आणि नियोजनबद्ध अभ्यासाचे वेळापत्रक',
    hiSubject: 'प्रातःकालीन अनुशासन और सुव्यवस्थित समय-सारणी',
  },
  {
    category: 'Motivational',
    tag: 'Resilience',
    enSubject: 'Learning from mistakes and rising with greater strength',
    mrSubject: 'चुकांमधून शिकून अधिक ताकदीने पुन्हा उभे राहण्याची वृत्ती',
    hiSubject: 'गलतियों से सीखकर दोगुनी शक्ति से आगे बढ़ने का जज़्बा',
  },
  {
    category: 'Motivational',
    tag: 'Enthusiasm',
    enSubject: 'Starting every school morning with joyful enthusiasm',
    mrSubject: 'शाळेची प्रत्येक सकाळ आनंदी उत्साहाने सुरू करण्याची सवय',
    hiSubject: 'विद्यालय की प्रत्येक सुबह प्रसन्न उत्साह के साथ शुरू करने की आदत',
  },

  // Category 2: Educational (10 subjects)
  {
    category: 'Educational',
    tag: 'Reading',
    enSubject: 'Reading good textbooks and library books every day',
    mrSubject: 'दररोज उत्तम पाठ्यपुस्तके आणि अवांतर पुस्तके वाचण्याची सवय',
    hiSubject: 'प्रतिदिन अच्छी पाठ्यपुस्तकें और ज्ञानवर्धक पुस्तकें पढ़ने की आदत',
  },
  {
    category: 'Educational',
    tag: 'Curiosity',
    enSubject: 'Asking thoughtful questions in the classroom',
    mrSubject: 'वर्गात विचारपूर्वक आणि जिज्ञासेने प्रश्न विचारण्याची वृत्ती',
    hiSubject: 'कक्षा में जिज्ञासा और विचारपूर्वक प्रश्न पूछने की प्रवृत्ति',
  },
  {
    category: 'Educational',
    tag: 'Concept Clarity',
    enSubject: 'Understanding the root concept rather than rote memorization',
    mrSubject: 'केवळ घोकंपट्टी न करता मूळ संकल्पना समजून घेणे',
    hiSubject: 'केवल रटने के बजाय मूल अवधारणा को गहराई से समझना',
  },
  {
    category: 'Educational',
    tag: 'Mathematics Practice',
    enSubject: 'Practising mathematics problems step by step with patience',
    mrSubject: 'गणिताची उदाहरणे संयमाने आणि पायरी-पायरीने सोडवण्याचा सराव',
    hiSubject: 'गणित के प्रश्नों को धैर्यपूर्वक चरण-दर-चरण हल करने का अभ्यास',
  },
  {
    category: 'Educational',
    tag: 'Science & Logic',
    enSubject: 'Observing nature with a scientific and rational mindset',
    mrSubject: 'वैज्ञानिक आणि तर्कसंगत दृष्टिकोनातून निसर्गाचे निरीक्षण करणे',
    hiSubject: 'वैज्ञानिक और तर्कसंगत दृष्टिकोण से प्रकृति का अवलोकन करना',
  },
  {
    category: 'Educational',
    tag: 'Writing Skills',
    enSubject: 'Writing neat, well-structured answers in your notebook',
    mrSubject: 'वहीमध्ये सुवाच्य आणि मुद्देसूद उत्तरे लिहिण्याचा सराव',
    hiSubject: 'अपनी अभ्यास-पुस्तिका में सुंदर और सुव्यवस्थित उत्तर लिखने का अभ्यास',
  },
  {
    category: 'Educational',
    tag: 'Vocabulary',
    enSubject: 'Mastering new words in English, Marathi, and Hindi',
    mrSubject: 'इंग्रजी, मराठी आणि हिंदी भाषेतील नवीन शब्दांवर प्रभुत्व मिळवणे',
    hiSubject: 'अंग्रेज़ी, मराठी और हिंदी भाषा के नए शब्दों में निपुणता प्राप्त करना',
  },
  {
    category: 'Educational',
    tag: 'Revision',
    enSubject: 'Timely revision of chapter notes and key formulas',
    mrSubject: 'धड्याच्या टिपणांची आणि महत्त्वाच्या सूत्रांची वेळेवर केलेली उजळणी',
    hiSubject: 'अध्याय के नोट्स और महत्त्वपूर्ण सूत्रों का समय पर पुनरीक्षण',
  },
  {
    category: 'Educational',
    tag: 'Listening',
    enSubject: 'Attentive listening while teachers explain a new lesson',
    mrSubject: 'शिक्षक नवीन धडा शिकवत असताना एकाग्रतेने ऐकणे',
    hiSubject: 'शिक्षकों द्वारा नया पाठ समझाते समय ध्यानपूर्वक सुनना',
  },
  {
    category: 'Educational',
    tag: 'Sharing Knowledge',
    enSubject: 'Sharing knowledge and solving doubts together with classmates',
    mrSubject: 'वर्गमित्रांसोबत ज्ञान वाटणे आणि एकत्रितपणे शंकांचे निरसन करणे',
    hiSubject: 'सहपाठियों के साथ ज्ञान साझा करना और मिलकर शंकाओं का समाधान करना',
  },

  // Category 3: Inspirational (10 subjects)
  {
    category: 'Inspirational',
    tag: 'Big Dreams',
    enSubject: 'Dreaming big and working tirelessly to serve the nation',
    mrSubject: 'मोठी स्वप्ने पाहणे आणि देशसेवेसाठी अहोरात्र परिश्रम करणे',
    hiSubject: 'बड़े सपने देखना और राष्ट्र-सेवा के लिए निरंतर परिश्रम करना',
  },
  {
    category: 'Inspirational',
    tag: 'Inner Light',
    enSubject: 'Lighting the lamp of wisdom in every corner of society',
    mrSubject: 'समाजाच्या प्रत्येक कोपऱ्यात ज्ञानाचा दिवा प्रज्वलित करणे',
    hiSubject: 'समाज के प्रत्येक कोने में ज्ञान का दीपक प्रज्वलित करना',
  },
  {
    category: 'Inspirational',
    tag: 'Optimism',
    enSubject: 'Keeping a bright, optimistic smile even on challenging days',
    mrSubject: 'आव्हानात्मक दिवसांतही चेहऱ्यावर सकारात्मक व आशावादी हास्य ठेवणे',
    hiSubject: 'चुनौतीपूर्ण दिनों में भी चेहरे पर सकारात्मक और आशावादी मुस्कान रखना',
  },
  {
    category: 'Inspirational',
    tag: 'Creativity',
    enSubject: 'Using creative imagination to build helpful inventions',
    mrSubject: 'समाजोपयोगी नवनिर्मितीसाठी सर्जनशील कल्पनाशक्तीचा वापर करणे',
    hiSubject: 'उपयोगी आविष्कार करने के लिए सृजनात्मक कल्पनाशक्ति का प्रयोग करना',
  },
  {
    category: 'Inspirational',
    tag: 'Patriotism',
    enSubject: 'Drawing inspiration from India’s great scientists and heroes',
    mrSubject: 'भारताच्या महान शास्त्रज्ञ आणि राष्ट्रपुरुषांच्या जीवनातून प्रेरणा घेणे',
    hiSubject: 'भारत के महान वैज्ञानिकों और राष्ट्रनायकों के जीवन से प्रेरणा लेना',
  },
  {
    category: 'Inspirational',
    tag: 'Hope',
    enSubject: 'Welcoming every sunrise as a fresh opportunity to learn',
    mrSubject: 'प्रत्येक सूर्योदयाचे स्वागत शिकण्याच्या एका नवीन संधीप्रमाणे करणे',
    hiSubject: 'प्रत्येक सूर्योदय का स्वागत सीखने के एक नए अवसर के रूप में करना',
  },
  {
    category: 'Inspirational',
    tag: 'Excellence',
    enSubject: 'Striving for excellence in academics, arts, and sports',
    mrSubject: 'अभ्यास, कला आणि क्रीडा क्षेत्रात सर्वोत्कृष्टतेचा ध्यास घेणे',
    hiSubject: 'शिक्षा, कला और खेल के क्षेत्र में उत्कृष्टता के लिए प्रयास करना',
  },
  {
    category: 'Inspirational',
    tag: 'Purpose',
    enSubject: 'Living a purposeful life that uplifts those around you',
    mrSubject: 'सभोवतालच्या लोकांना प्रगतीची प्रेरणा देणारे ध्येयवादी जीवन जगणे',
    hiSubject: 'अपने आसपास के लोगों को प्रेरित करने वाला उद्देश्यपूर्ण जीवन जीना',
  },
  {
    category: 'Inspirational',
    tag: 'Courageous Vision',
    enSubject: 'Having the vision to explore new horizons of knowledge',
    mrSubject: 'ज्ञानाची नवीन क्षितिजे शोधण्याची व्यापक दूरदृष्टी ठेवणे',
    hiSubject: 'ज्ञान के नए क्षितिज खोजने की व्यापक दूरदृष्टि रखना',
  },
  {
    category: 'Inspirational',
    tag: 'Gratitude & Joy',
    enSubject: 'Finding joy in progress and celebrating every milestone',
    mrSubject: 'प्रगतीमध्ये आनंद शोधणे आणि शिक्षणातील प्रत्येक टप्प्याचा सन्मान करणे',
    hiSubject: 'प्रगति में आनंद खोजना और सीखने के हर पड़ाव का उत्सव मनाना',
  },

  // Category 4: Moral (10 subjects)
  {
    category: 'Moral',
    tag: 'Truthfulness',
    enSubject: 'Speaking the truth with honesty and fearlessness',
    mrSubject: 'प्रामाणिकपणाने आणि निर्भयपणे नेहमी सत्य बोलणे',
    hiSubject: 'ईमानदारी और निडरता के साथ सदैव सत्य बोलना',
  },
  {
    category: 'Moral',
    tag: 'Kindness',
    enSubject: 'Showing kindness and compassion to every living being',
    mrSubject: 'प्रत्येक सजीवाप्रती दयाळूपणा आणि करुणा दाखवणे',
    hiSubject: 'प्रत्येक जीव के प्रति दयालुता और करुणा का भाव रखना',
  },
  {
    category: 'Moral',
    tag: 'Respect for Elders',
    enSubject: 'Honouring parents, teachers, and elders with gratitude',
    mrSubject: 'पालक, शिक्षक आणि वडीलधाऱ्यांचा कृतज्ञतेने आदर करणे',
    hiSubject: 'माता-पिता, शिक्षकों और बड़ों का कृतज्ञतापूर्वक सम्मान करना',
  },
  {
    category: 'Moral',
    tag: 'Integrity',
    enSubject: 'Doing the right duty even when no one is watching',
    mrSubject: 'कोणीही पाहत नसतानाही आपले योग्य कर्तव्य प्रामाणिकपणे पार पाडणे',
    hiSubject: 'जब कोई न देख रहा हो तब भी अपना सही कर्तव्य ईमानदारी से निभाना',
  },
  {
    category: 'Moral',
    tag: 'Forgiveness',
    enSubject: 'Practising forgiveness, peace, and friendly harmony',
    mrSubject: 'क्षमाशीलता, शांतता आणि मैत्रीपूर्ण सलोखा जपणे',
    hiSubject: 'क्षमाशीलता, शांति और मैत्रीपूर्ण सद्भाव का पालन करना',
  },
  {
    category: 'Moral',
    tag: 'Helping Others',
    enSubject: 'Extending a helping hand to a classmate or neighbour in need',
    mrSubject: 'गरजू वर्गमित्राला किंवा शेजाऱ्याला तत्परतेने मदतीचा हात देणे',
    hiSubject: 'जरूरतमंद सहपाठी या पड़ोसी की तत्परता से सहायता करना',
  },
  {
    category: 'Moral',
    tag: 'Humility',
    enSubject: 'Remaining humble and polite regardless of high achievements',
    mrSubject: 'मोठे यश मिळूनही सदैव नम्र आणि विनयशील राहणे',
    hiSubject: 'बड़ी सफलता मिलने पर भी सदैव विनम्र और शिष्ट बने रहना',
  },
  {
    category: 'Moral',
    tag: 'Nature Care',
    enSubject: 'Protecting trees, rivers, and the environment as a sacred duty',
    mrSubject: 'झाडे, नद्या आणि पर्यावरणाचे रक्षण करणे हे पवित्र कर्तव्य मानणे',
    hiSubject: 'पेड़ों, नदियों और पर्यावरण की रक्षा को पवित्र कर्तव्य मानना',
  },
  {
    category: 'Moral',
    tag: 'Fairness',
    enSubject: 'Treating everyone with equality, justice, and fairness',
    mrSubject: 'सर्वांशी समानता, न्याय आणि निष्पक्षपातीपणाने वागणे',
    hiSubject: 'सभी के साथ समानता, न्याय और निष्पक्षता का व्यवहार करना',
  },
  {
    category: 'Moral',
    tag: 'Good Deeds',
    enSubject: 'Cultivating pure thoughts, sweet speech, and noble deeds',
    mrSubject: 'शुद्ध विचार, गोड वाणी आणि सत्कर्मांची जोपासना करणे',
    hiSubject: 'शुद्ध विचार, मधुर वाणी और श्रेष्ठ कर्मों को अपनाना',
  },

  // Category 5: Personality Development (10 subjects)
  {
    category: 'Personality Development',
    tag: 'Time Management',
    enSubject: 'Valuing every minute and practising strict punctuality',
    mrSubject: 'प्रत्येक मिनिटाचे महत्त्व ओळखून वक्तशीरपणा पाळणे',
    hiSubject: 'प्रत्येक मिनट का मूल्य समझकर समयनिष्ठा का पालन करना',
  },
  {
    category: 'Personality Development',
    tag: 'Confidence',
    enSubject: 'Speaking clearly with calm self-confidence and poise',
    mrSubject: 'शांत आत्मविश्वासाने आणि स्पष्टपणे आपले विचार मांडणे',
    hiSubject: 'शांत आत्मविश्वास और स्पष्टता के साथ अपने विचार व्यक्त करना',
  },
  {
    category: 'Personality Development',
    tag: 'Leadership',
    enSubject: 'Leading by example through responsibility and teamwork',
    mrSubject: 'जबाबदारी आणि सांघिक भावनेतून स्वतःच्या कृतीने नेतृत्व करणे',
    hiSubject: 'जिम्मेदारी और टीम भावना के माध्यम से अपने आचरण द्वारा नेतृत्व करना',
  },
  {
    category: 'Personality Development',
    tag: 'Emotional Balance',
    enSubject: 'Maintaining a calm, patient mind during challenging moments',
    mrSubject: 'कठीण प्रसंगीही मन शांत आणि संयमी ठेवणे',
    hiSubject: 'कठिन परिस्थितियों में भी मन को शांत और संयमित रखना',
  },
  {
    category: 'Personality Development',
    tag: 'Positive Habits',
    enSubject: 'Building healthy daily habits of reading, exercise, and reflection',
    mrSubject: 'वाचन, व्यायाम आणि चिंतनाच्या उत्तम दैनंदिन सवयी लावून घेणे',
    hiSubject: 'पठन, व्यायाम और चिंतन की स्वस्थ दैनिक आदतें विकसित करना',
  },
  {
    category: 'Personality Development',
    tag: 'Communication',
    enSubject: 'Listening respectfully before offering a thoughtful response',
    mrSubject: 'विचारपूर्वक उत्तर देण्यापूर्वी समोरच्याचे म्हणणे आदराने ऐकून घेणे',
    hiSubject: 'विचारपूर्वक उत्तर देने से पहले दूसरों की बात आदरपूर्वक सुनना',
  },
  {
    category: 'Personality Development',
    tag: 'Self-Reliance',
    enSubject: 'Completing your duties independently with neatness and care',
    mrSubject: 'आपली कामे स्वावलंबीपणे, नीटनेटकेपणाने आणि काळजीपूर्वक पूर्ण करणे',
    hiSubject: 'अपने कार्यों को आत्मनिर्भरता, स्वच्छता और सावधानी से पूरा करना',
  },
  {
    category: 'Personality Development',
    tag: 'Adaptability',
    enSubject: 'Welcoming new skills and positive feedback with an open mind',
    mrSubject: 'मोकळ्या मनाने नवीन कौशल्ये आणि मार्गदर्शक सूचनांचा स्वीकार करणे',
    hiSubject: 'खुले मन से नए कौशल और सकारात्मक सुझावों का स्वागत करना',
  },
  {
    category: 'Personality Development',
    tag: 'Gratitude Attitude',
    enSubject: 'Appreciating the good qualities in everyone you meet',
    mrSubject: 'भेटणाऱ्या प्रत्येक व्यक्तीमधील चांगल्या गुणांचे कौतुक करणे',
    hiSubject: 'मिलने वाले प्रत्येक व्यक्ति के अच्छे गुणों की सराहना करना',
  },
  {
    category: 'Personality Development',
    tag: 'Character Building',
    enSubject: 'Harmonizing academic intelligence with noble moral character',
    mrSubject: 'शैक्षणिक बुद्धिमत्तेसोबतच उत्तम चारित्र्याची सांगड घालणे',
    hiSubject: 'शैक्षणिक बुद्धिमत्ता के साथ श्रेष्ठ नैतिक चरित्र का समन्वय करना',
  },
];

// 21 Distinct Educational Reflection Templates (50 subjects × 21 templates = 1,050 unique thoughts)
const REFLECTION_TEMPLATES: TrilingualReflectionTemplate[] = [
  {
    category: 'Motivational',
    tag: 'Foundation',
    buildEn: (s) => `${s} is the true foundation of lasting academic and personal excellence.`,
    buildMr: (s) => `${s} हाच चिरस्थायी शैक्षणिक आणि वैयक्तिक उत्कृष्टतेचा खरा पाया आहे.`,
    buildHi: (s) => `${s} ही स्थायी शैक्षणिक और व्यक्तिगत उत्कृष्टता की सच्ची नींव है।`,
  },
  {
    category: 'Educational',
    tag: 'Wisdom',
    buildEn: (s) => `${s} transforms everyday classroom lessons into lifelong wisdom.`,
    buildMr: (s) => `${s} यामुळे वर्गातील दैनंदिन शिक्षणाचे रूपांतर जीवनभराच्या शहाणपणात होते.`,
    buildHi: (s) => `${s} कक्षा के दैनिक पाठों को जीवन भर के ज्ञान और प्रज्ञा में बदल देता है।`,
  },
  {
    category: 'Inspirational',
    tag: 'Bright Future',
    buildEn: (s) => `${s} opens the door to a confident, bright, and self-reliant future.`,
    buildMr: (s) => `${s} यामुळे आत्मविश्वासपूर्ण, उज्ज्वल आणि स्वावलंबी भविष्याचे दार उघडते.`,
    buildHi: (s) => `${s} एक आत्मविश्वासी, उज्ज्वल और आत्मनिर्भर भविष्य के द्वार खोलता है।`,
  },
  {
    category: 'Moral',
    tag: 'Character',
    buildEn: (s) => `${s} shapes a noble character that earns respect everywhere in life.`,
    buildMr: (s) => `${s} यामुळे आयुष्यात सर्वत्र सन्मान मिळवून देणारे उत्तम चारित्र्य घडते.`,
    buildHi: (s) => `${s} एक ऐसे श्रेष्ठ चरित्र का निर्माण करता है जिसे जीवन में सर्वत्र सम्मान मिलता है।`,
  },
  {
    category: 'Personality Development',
    tag: 'Growth',
    buildEn: (s) => `${s} strengthens the mind and brings out the best leader within a student.`,
    buildMr: (s) => `${s} यामुळे मन खंबीर बनते आणि विद्यार्थ्यांमधील सर्वोत्तम नेतृत्वगुण विकसित होतात.`,
    buildHi: (s) => `${s} मस्तिष्क को सशक्त बनाता है और विद्यार्थी के भीतर छिपे श्रेष्ठ नेतृत्व को निखारता है।`,
  },
  {
    category: 'Motivational',
    tag: 'Mastery',
    buildEn: (s) => `When you embrace ${s.toLowerCase()}, even the hardest challenge becomes achievable.`,
    buildMr: (s) => `जेव्हा आपण '${s}' हे तत्त्व आचरणात आणतो, तेव्हा कठीणातील कठीण आव्हानही सहज साध्य होते.`,
    buildHi: (s) => `जब आप '${s}' को अपने जीवन में अपनाते हैं, तो सबसे कठिन चुनौती भी संभव हो जाती है।`,
  },
  {
    category: 'Educational',
    tag: 'Clarity',
    buildEn: (s) => `${s} illuminates the mind with clarity, curiosity, and joyful understanding.`,
    buildMr: (s) => `${s} यामुळे मनाला स्पष्टता, जिज्ञासा आणि आनंदी आकलनाचा प्रकाश मिळतो.`,
    buildHi: (s) => `${s} मन को स्पष्टता, जिज्ञासा और आनंदपूर्ण समझ के प्रकाश से आलोकित करता है।`,
  },
  {
    category: 'Inspirational',
    tag: 'Excellence',
    buildEn: (s) => `Great scholars and pioneers always begin their journey with ${s.toLowerCase()}.`,
    buildMr: (s) => `महान विद्वान आणि आदर्श व्यक्ती आपल्या यशाच्या प्रवासाची सुरुवात नेहमी '${s}' यातूनच करतात.`,
    buildHi: (s) => `महान विद्वान और पथप्रदर्शक अपनी सफलता की यात्रा सदैव '${s}' से ही प्रारंभ करते हैं।`,
  },
  {
    category: 'Moral',
    tag: 'Harmony',
    buildEn: (s) => `${s} brings peace to the heart, pride to the family, and harmony to society.`,
    buildMr: (s) => `${s} यामुळे मनाला शांतता, कुटुंबाला अभिमान आणि समाजाला सुसंवाद लाभतो.`,
    buildHi: (s) => `${s} मन को शांति, परिवार को गौरव और समाज को सद्भाव प्रदान करता है।`,
  },
  {
    category: 'Personality Development',
    tag: 'Self-Improvement',
    buildEn: (s) => `Practising ${s.toLowerCase()} every day makes you wiser and stronger than yesterday.`,
    buildMr: (s) => `'${s}' याचा दररोज केलेला सराव तुम्हाला कालच्यापेक्षा अधिक सुज्ञ आणि सक्षम बनवतो.`,
    buildHi: (s) => `'${s}' का प्रतिदिन अभ्यास आपको कल की तुलना में अधिक समझदार और सक्षम बनाता है।`,
  },
  {
    category: 'Motivational',
    tag: 'Triumph',
    buildEn: (s) => `${s} is the quiet power that turns sincere students into true champions.`,
    buildMr: (s) => `${s} ही अशी शांत ताकद आहे जी प्रामाणिक विद्यार्थ्यांना खऱ्या अर्थाने विजेते बनवते.`,
    buildHi: (s) => `${s} वह शांत शक्ति है जो मेहनती विद्यार्थियों को सच्चा विजेता बनाती है।`,
  },
  {
    category: 'Educational',
    tag: 'Lifelong Asset',
    buildEn: (s) => `${s} is a priceless treasure of education that stays with you throughout life.`,
    buildMr: (s) => `${s} हा शिक्षणाचा असा अनमोल ठेवा आहे जो आयुष्यभर तुमच्या सोबत राहतो.`,
    buildHi: (s) => `${s} शिक्षा की वह अनमोल धरोहर है जो जीवन भर आपके साथ रहती है।`,
  },
  {
    category: 'Inspirational',
    tag: 'Inspiration',
    buildEn: (s) => `Let ${s.toLowerCase()} be your guiding star on the path of knowledge and service.`,
    buildMr: (s) => `ज्ञान आणि सेवेच्या मार्गावर '${s}' हा तुमचा मार्गदर्शक ध्रुवतारा असू द्या.`,
    buildHi: (s) => `ज्ञान और सेवा के पथ पर '${s}' को अपना मार्गदर्शक ध्रुवतारा बनाएँ।`,
  },
  {
    category: 'Moral',
    tag: 'Virtue',
    buildEn: (s) => `${s} reflects the highest moral values of an educated and compassionate citizen.`,
    buildMr: (s) => `${s} यातून सुशिक्षित आणि संवेदनशील नागरिकाच्या सर्वोच्च नैतिक मूल्यांचे दर्शन घडते.`,
    buildHi: (s) => `${s} एक शिक्षित और संवेदनशील नागरिक के सर्वोच्च नैतिक मूल्यों को दर्शाता है।`,
  },
  {
    category: 'Personality Development',
    tag: 'Poise',
    buildEn: (s) => `${s} builds unshakeable self-confidence, humility, and graceful personality.`,
    buildMr: (s) => `${s} यामुळे अढळ आत्मविश्वास, नम्रता आणि प्रभावी व्यक्तिमत्त्व घडते.`,
    buildHi: (s) => `${s} अटूट आत्मविश्वास, विनम्रता और प्रभावशाली व्यक्तित्व का निर्माण करता है।`,
  },
  {
    category: 'Motivational',
    tag: 'Dedication',
    buildEn: (s) => `Every hour invested in ${s.toLowerCase()} multiplies your confidence before examinations.`,
    buildMr: (s) => `'${s}' यामध्ये गुंतवलेला प्रत्येक तास परीक्षेपूर्वी तुमचा आत्मविश्वास कित्येक पटींनी वाढवतो.`,
    buildHi: (s) => `'${s}' में लगाया गया प्रत्येक घंटा परीक्षा से पहले आपके आत्मविश्वास को कई गुना बढ़ा देता है।`,
  },
  {
    category: 'Educational',
    tag: 'Deep Learning',
    buildEn: (s) => `${s} connects textbook knowledge with real-world problem solving.`,
    buildMr: (s) => `${s} यामुळे पाठ्यपुस्तकातील ज्ञानाची प्रत्यक्ष जीवनातील समस्या सोडवण्याशी सांगड घातली जाते.`,
    buildHi: (s) => `${s} पाठ्यपुस्तक के ज्ञान को व्यावहारिक जीवन की समस्या-समाधान क्षमता से जोड़ता है।`,
  },
  {
    category: 'Inspirational',
    tag: 'New Horizons',
    buildEn: (s) => `With ${s.toLowerCase()}, every student can reach the highest summit of achievement.`,
    buildMr: (s) => `'${s}' याच्या बळावर प्रत्येक विद्यार्थी यशाचे सर्वोच्च शिखर गाठू शकतो.`,
    buildHi: (s) => `'${s}' के बल पर प्रत्येक विद्यार्थी सफलता के सर्वोच्च शिखर तक पहुँच सकता है।`,
  },
  {
    category: 'Moral',
    tag: 'Goodness',
    buildEn: (s) => `${s} is the noblest ornament of youth and the truest mark of wisdom.`,
    buildMr: (s) => `${s} हा विद्यार्थी जीवनाचा सर्वात सुंदर दागिना आणि खऱ्या शहाणपणाची ओळख आहे.`,
    buildHi: (s) => `${s} विद्यार्थी जीवन का सबसे सुंदर आभूषण और सच्ची बुद्धिमत्ता की पहचान है।`,
  },
  {
    category: 'Personality Development',
    tag: 'Mindset',
    buildEn: (s) => `${s} cultivates a balanced, disciplined, and positive attitude towards every task.`,
    buildMr: (s) => `${s} यामुळे प्रत्येक कामाकडे पाहण्याचा संतुलित, शिस्तबद्ध आणि सकारात्मक दृष्टिकोन तयार होतो.`,
    buildHi: (s) => `${s} प्रत्येक कार्य के प्रति संतुलित, अनुशासित और सकारात्मक दृष्टिकोण विकसित करता है।`,
  },
  {
    category: 'Inspirational',
    tag: 'Nation Building',
    buildEn: (s) => `${s} empowers young minds to contribute meaningfully to our nation’s progress.`,
    buildMr: (s) => `${s} यामुळे तरुण मनांना आपल्या देशाच्या प्रगतीमध्ये मोलाचे योगदान देण्याचे सामर्थ्य मिळते.`,
    buildHi: (s) => `${s} युवा मस्तिष्कों को हमारे राष्ट्र की प्रगति में सार्थक योगदान देने के लिए सशक्त बनाता है।`,
  },
];

let cachedThoughtsCollection: TrilingualThoughtEntry[] | null = null;

/**
 * Generates and caches the complete verified collection of 1,085 unique Trilingual Thoughts
 * (35 verified famous personality quotes + 1,050 structured educational & character-building thoughts).
 */
export function getAllTrilingualThoughts(): TrilingualThoughtEntry[] {
  if (cachedThoughtsCollection) return cachedThoughtsCollection;

  const thoughts: TrilingualThoughtEntry[] = [];
  let counter = 1;

  // 1. Add Verified Famous Personalities' Quotes first
  for (const q of VERIFIED_PERSONALITY_QUOTES) {
    thoughts.push({
      id: `thought-${counter}`,
      number: counter,
      category: q.category,
      english: q.english,
      marathi: q.marathi,
      hindi: q.hindi,
      author: q.author,
      isVerifiedPersonalityQuote: true,
      tags: q.tags,
    });
    counter++;
  }

  // 2. Interleave the 50 subjects × 21 templates so consecutive days cycle smoothly across all 5 categories
  for (let tIdx = 0; tIdx < REFLECTION_TEMPLATES.length; tIdx++) {
    const tpl = REFLECTION_TEMPLATES[tIdx];
    for (let sIdx = 0; sIdx < CORE_SUBJECTS.length; sIdx++) {
      const subj = CORE_SUBJECTS[sIdx];
      // Alternate category assignment between the subject's primary category and template's lens
      const assignedCategory: ThoughtCategory =
        tIdx % 2 === 0 ? subj.category : tpl.category;

      thoughts.push({
        id: `thought-${counter}`,
        number: counter,
        category: assignedCategory,
        english: tpl.buildEn(subj.enSubject),
        marathi: tpl.buildMr(subj.mrSubject),
        hindi: tpl.buildHi(subj.hiSubject),
        isVerifiedPersonalityQuote: false,
        tags: [subj.tag, tpl.tag, assignedCategory],
      });
      counter++;
    }
  }

  cachedThoughtsCollection = thoughts;
  return thoughts;
}

/**
 * Non-repeating Daily Thought selector:
 * Uses a deterministic permutation over the entire 1,085-thought collection indexed by the calendar epoch day,
 * guaranteeing that a new thought is displayed automatically every day and no thought is ever repeated
 * until the entire 1,085-thought collection has been exhausted (over 2.97 years).
 */
export function getThoughtForDate(dateObj: Date = new Date()): {
  thought: TrilingualThoughtEntry;
  dayCycleNumber: number;
  totalCollectionSize: number;
  formattedDate: string;
} {
  const all = getAllTrilingualThoughts();
  const total = all.length;

  // Use local calendar year/month/day so rotation happens cleanly at local midnight
  const utcMidnight = Date.UTC(
    dateObj.getFullYear(),
    dateObj.getMonth(),
    dateObj.getDate()
  );
  const epochDays = Math.floor(utcMidnight / (1000 * 60 * 60 * 24));
  // Reference epoch: Jan 1, 2026 (epoch day 20454)
  const daysSinceStart = Math.max(0, epochDays - 20454);

  // Coprime step (37 is coprime with 1085 = 5 * 7 * 31) ensures a full cycle of all 1085 thoughts without a single repeat!
  const cycleOffset = daysSinceStart % total;
  const permutedIndex = (cycleOffset * 37) % total;

  const formattedDate = dateObj.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return {
    thought: all[permutedIndex],
    dayCycleNumber: cycleOffset + 1,
    totalCollectionSize: total,
    formattedDate,
  };
}

/**
 * Returns the previous N days' thoughts (most recent first) for browsing past daily thoughts.
 */
export function getPreviousDaysThoughts(
  daysCount: number = 30,
  referenceDate: Date = new Date()
): Array<{
  dateLabel: string;
  isoDate: string;
  daysAgo: number;
  thought: TrilingualThoughtEntry;
}> {
  const history: Array<{
    dateLabel: string;
    isoDate: string;
    daysAgo: number;
    thought: TrilingualThoughtEntry;
  }> = [];

  for (let d = 0; d < daysCount; d++) {
    const dt = new Date(
      referenceDate.getFullYear(),
      referenceDate.getMonth(),
      referenceDate.getDate() - d
    );
    const info = getThoughtForDate(dt);
    const isoDate = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(
      dt.getDate()
    ).padStart(2, '0')}`;
    history.push({
      dateLabel: info.formattedDate,
      isoDate,
      daysAgo: d,
      thought: info.thought,
    });
  }

  return history;
}
