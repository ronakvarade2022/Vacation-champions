import { CuratedTrilingualMcq } from './types';

// Batch 3 CDP Part 5 (32 original trilingual items; 0 overlap with B1/B2 or Parts 1–4)
export const MAHA_TET_P1_B3_CDP_PART5: CuratedTrilingualMcq[] = [
  {
    topic: 'SMC Composition under RTE Act 2009',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Moderate',
    en: {
      q: 'Under Section 21 of the RTE Act 2009, what share of a government/aided School Management Committee (SMC) must consist of parents/guardians of studying children?',
      opts: [
        'At least three-fourths (75%), with proportionate representation of women (~50%) and disadvantaged groups',
        '10% only',
        'Zero parents; officers only',
        '25% parents maximum',
      ],
      exp: 'RTE embeds community accountability by placing 75% parent representation (at least 50% women) at the heart of school governance.',
    },
    mr: {
      q: 'RTE 2009 कलम २१ नुसार शाळा व्यवस्थापन समितीमध्ये (SMC) शाळेत शिकणाऱ्या मुलांच्या पालकांचे प्रमाण किमान किती असणे आवश्यक आहे?',
      opts: [
        'किमान तीन-चतुर्थांश (७५%), त्यांत महिलांचे ५०% व दुर्बल घटकांचे प्रमाणबद्ध प्रतिनिधित्व',
        'फक्त १०%',
        'एकही पालक नाही',
        'कमाल २५%',
      ],
      exp: 'स्थानिक लोकसहभाग व पारदर्शकतेसाठी ७५% पालक सदस्यांची तरतूद करण्यात आली आहे.',
    },
    hi: {
      q: 'RTE अधिनियम २००९ की धारा २१ के अनुसार विद्यालय प्रबंधन समिति (SMC) में कम-से-कम कितने प्रतिशत सदस्य अध्ययनरत बच्चों के अभिभावक होने चाहिए?',
      opts: [
        'कम-से-कम तीन-चौथाई (७५%), जिनमें कम-से-कम ५०% महिलाएँ तथा वंचित वर्गों का प्रतिनिधित्व हो',
        'केवल १०%',
        'कोई अभिभावक नहीं',
        'अधिकतम २५%',
      ],
      exp: 'सामुदायिक उत्तरदायित्व हेतु SMC में तीन-चौथाई अभिभावकों की भागीदारी अनिवार्य है।',
    },
  },
  {
    topic: 'Vygotsky – MKO (More Knowledgeable Other) as Peer',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Does Vygotsky’s "More Knowledgeable Other (MKO)" always mean an adult teacher?',
      opts: [
        'No — a classmate, older sibling, or digital simulation with slightly stronger mastery of a specific skill can act as an effective MKO',
        'Yes, strictly a university professor',
        'No human can ever serve as MKO',
        'Only parents qualify legally',
      ],
      exp: 'MKO simply refers to anyone possessing greater understanding of the particular task at hand.',
    },
    mr: {
      q: 'वायगॉत्स्की यांच्या सिद्धांतातील "अधिक जाणकार व्यक्ती" (More Knowledgeable Other – MKO) म्हणजे नेहमी प्रौढ शिक्षकच असतो का?',
      opts: [
        'नाही — एखादा हुशार वर्गमित्र, मोठे भावंड किंवा विशिष्ट कौशल्य जाणणारे कोणीही MKO ची भूमिका बजावू शकते',
        'होय, फक्त प्राध्यापकच',
        'कोणताच माणूस MKO असू शकत नाही',
        'केवळ मुख्याध्यापक',
      ],
      exp: 'ज्या विशिष्ट कार्यात सहकार्य हवे आहे त्यात अधिक गती असलेला वर्गमित्रही उत्तम MKO ठरतो.',
    },
    hi: {
      q: 'क्या वाइगोत्स्की के सिद्धांत में "अधिक जानकार व्यक्ति" (MKO) से तात्पर्य हमेशा किसी वयस्क शिक्षक से ही होता है?',
      opts: [
        'नहीं — उस विशेष कार्य की बेहतर समझ रखने वाला सहपाठी, बड़ा भाई-बहन या कोई भी साथी प्रभावी MKO हो सकता है',
        'हाँ, केवल विश्वविद्यालय प्राध्यापक',
        'कोई मानव MKO नहीं हो सकता',
        'केवल माता-पिता',
      ],
      exp: 'MKO का अर्थ किसी विशेष कौशल या अवधारणा में अपेक्षाकृत अधिक दक्ष किसी भी व्यक्ति से है।',
    },
  },
  {
    topic: 'Piaget – Animism & Artificialism in Early Years',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'A 4-year-old says, "The sun went behind the clouds because it is sleepy and tired." Jean Piaget named attributing living intentions to inanimate natural objects:',
      opts: [
        'Animism (characteristic of Preoperational thought)',
        'Conservation of Mass',
        'Hypothetico-Deductive Logic',
        'Seriation Reversibility',
      ],
      exp: 'Preoperational preschoolers frequently endow clouds, dolls, and bicycles with human feelings.',
    },
    mr: {
      q: 'चार वर्षांचे मूल म्हणते, "सूर्य दमला म्हणून झोपायला ढगांमागे गेला आहे." निर्जीव वस्तूंवर सजीव भावना आरोपित करण्याच्या प्रवृत्तीला पियाजे काय म्हणतात?',
      opts: [
        'सजीवत्वारोपण (Animism – पूर्व-क्रियात्मक अवस्थेचे लक्षण)',
        'वस्तुमान संधारण',
        'औपचारिक निगमन तर्क',
        'प्रत्यावर्तनशीलता',
      ],
      exp: 'पूर्व-क्रियात्मक बालक निसर्गातील वस्तूंनाही मानवी जाणिवा व हेतू असल्याचे मानते.',
    },
    hi: {
      q: 'चार वर्षीय बच्चा कहता है, "सूरज थककर सोने के लिए बादलों के पीछे चला गया।" निर्जीव वस्तुओं में जीवित भावनाएँ मानने की इस प्रवृत्ति को पियाजे क्या कहते हैं?',
      opts: [
        'जीववाद (Animism — पूर्व-संक्रियात्मक अवस्था का लक्षण)',
        'द्रव्यमान संरक्षण',
        'निगमनात्मक तर्क',
        'उत्क्रमणीयता',
      ],
      exp: 'पूर्व-संक्रियात्मक बच्चे गुड़िया, चाँद, हवा आदि निर्जीव चीजों में भी इच्छा व थकान की कल्पना करते हैं।',
    },
  },
  {
    topic: 'Piaget – Irreversibility of Thought',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Asked "Do you have a brother?", 5-year-old Rohan says "Yes, Kabir." Asked "Does Kabir have a brother?", Rohan insists "No!" This reflects preoperational:',
      opts: [
        'Irreversibility (difficulty mentally reversing a directional relationship)',
        'Abstract Propositional Symmetry',
        'Spatial Conservation',
        'Object Permanence Deficit',
      ],
      exp: 'Concrete operational learners grasp relational symmetry and inverse operations smoothly after age 7.',
    },
    mr: {
      q: 'पाच वर्षांच्या रोहनला "तुला भाऊ आहे का?" विचारता तो "हो, कबीर" म्हणतो; पण "कबीरला भाऊ आहे का?" विचारता "नाही!" म्हणतो. पियाजेनुसार ही कोणती मर्यादा आहे?',
      opts: [
        'अप्रत्यावर्तनशीलता (Irreversibility – विचारांची दिशा उलट तपासण्याची अडचण)',
        'औपचारिक सममिती',
        'संधारण सिद्धता',
        'वस्तू-स्थायित्व',
      ],
      exp: 'संबंध किंवा क्रिया उलट क्रमाने तपासण्याची क्षमता (Reversibility) मूर्त क्रियात्मक अवस्थेत पक्की होते.',
    },
    hi: {
      q: 'पाँच वर्षीय रोहन "क्या तुम्हारा कोई भाई है?" पर "हाँ, कबीर" कहता है, किंतु "क्या कबीर का कोई भाई है?" पर "नहीं!" कहता है। यह पूर्व-संक्रियात्मक अवस्था की कौन-सी सीमा है?',
      opts: [
        'अनुत्क्रमणीयता / पलटावी चिंतन का अभाव (Irreversibility)',
        'औपचारिक सममिति',
        'संरक्षण सिद्धि',
        'वस्तु स्थायित्व',
      ],
      exp: 'संबंध को विपरीत दिशा से सोच पाने (Reversibility) की क्षमता ७–११ वर्ष में विकसित होती है।',
    },
  },
  {
    topic: 'Sensorimotor Milestone – Object Permanence',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'When an 8-month-old infant lifts a cloth napkin to retrieve a rattle hidden underneath seconds ago, she demonstrates developing:',
      opts: [
        'Object Permanence (objects still exist when out of direct sight)',
        'Concrete Conservation',
        'Moral Autonomy',
        'Hypothetical Combinatorics',
      ],
      exp: 'Between 8 and 18 months of Piaget’s Sensorimotor stage, infants construct enduring mental representations of unseen objects.',
    },
    mr: {
      q: 'आठ महिन्यांचे बाळ आपल्यासमोर रुमालाखाली लपवलेला खुळखुळा रुमाल बाजूला सारून शोधून काढते. हे कोणते संवेदनकारक टप्पे दर्शवते?',
      opts: [
        'वस्तू-स्थायित्व (Object Permanence – नजरेआड झालेली वस्तू अस्तित्वात असते याची जाणीव)',
        'मूर्त संधारण',
        'स्वायत्त नैतिकता',
        'अमूर्त परिकल्पना',
      ],
      exp: 'वस्तू डोळ्यांसमोर नसली तरी तिचे अस्तित्व कायम राहते हे समजणे हा संवेदनकारक अवस्थेचा मोठा टप्पा आहे.',
    },
    hi: {
      q: 'आठ माह का शिशु रूमाल के नीचे छिपाया गया झुनझुना रूमाल हटाकर खोज लेता है। यह किस संज्ञानात्मक उपलब्धि का प्रमाण है?',
      opts: [
        'वस्तु स्थायित्व (Object Permanence — आँखों से ओझल वस्तु के अस्तित्व की समझ)',
        'मूर्त संरक्षण',
        'स्वायत्त नैतिकता',
        'अमूर्त परिकल्पना',
      ],
      exp: 'संवेदी-पेशीय अवस्था में वस्तु स्थायित्व विकसित होने पर बच्चा छिपी वस्तुओं की खोज करने लगता है।',
    },
  },
  {
    topic: 'Erikson – Initiative vs Guilt (Preschool 3–5)',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'During ages 3–5 ("Initiative vs. Guilt"), children eagerly plan pretend picnics, invent messy block towers, and ask constant "Why?" questions. Supportive teachers encourage:',
      opts: [
        'purposeful Initiative and joyful curiosity rather than crushing guilt over harmless spills',
        'silent motionless conformity for hours',
        'harsh scolding for asking questions',
        'strict competitive rankings',
      ],
      exp: 'Gentle encouragement of child-initiated projects fosters confident curiosity and sense of purpose.',
    },
    mr: {
      q: 'वयाच्या ३–५ वर्षांत ("पुढाकार विरुद्ध अपराधीपणा" – Initiative vs Guilt) मुले स्वतःहून खेळ रचतात, ठोकळे रचतात व सतत "का?" विचारतात. सुज्ञ शिक्षक काय करतात?',
      opts: [
        'निरुपद्रवी गोंधळाबद्दल अपराधीपणा न देता मुलांच्या सर्जनशील पुढाकाराला व जिज्ञासेला प्रोत्साहन देतात',
        'तासनतास शांत बसवतात',
        'प्रश्न विचारल्यास रागावतात',
        'स्पर्धात्मक क्रमवारी लावतात',
      ],
      exp: 'पुढाकार घेण्याची वृत्ती बहरल्यास मूल ध्येयनिष्ठ व उत्साही बनते.',
    },
    hi: {
      q: '३–५ वर्ष की आयु ("पहल बनाम अपराधबोध") में बच्चे स्वयं खेल की योजना बनाते व लगातार "क्यों?" पूछते हैं। सहायक शिक्षक क्या करते हैं?',
      opts: [
        'छोटी-मोटी गंदगी पर अपराधबोध डाले बिना बच्चों की सृजनात्मक पहल और जिज्ञासा को प्रोत्साहित करते हैं',
        'घंटों मौन बैठाते हैं',
        'प्रश्न पूछने पर डांटते हैं',
        'कठोर रैंक निकालते हैं',
      ],
      exp: 'सहायक वातावरण में बच्चों में उद्देश्यपूर्ण पहल और आत्मविश्वास जन्म लेता है।',
    },
  },
  {
    topic: 'Erikson – Identity vs Role Confusion (Adolescence)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In Erik Erikson’s 5th stage (ages 12–18), adolescents explore personal values, career goals, and social groups to resolve:',
      opts: [
        'Identity vs. Role Confusion ("Who am I and where am I heading?")',
        'Trust vs. Mistrust',
        'Autonomy vs. Shame',
        'Integrity vs. Despair',
      ],
      exp: 'Adolescent exploration of roles and values prepares grounded adult commitment.',
    },
    mr: {
      q: 'एरिकसनच्या पाचव्या टप्प्यात (किशोरवय १२–१८ वर्षे) किशोरवयीन मुले-मुली आपली मूल्ये, करिअर व सामाजिक भूमिका शोधून कोणते आव्हान सोडवतात?',
      opts: [
        'स्व-ओळख विरुद्ध भूमिका गोंधळ (Identity vs Role Confusion)',
        'विश्वास विरुद्ध अविश्वास',
        'स्वायत्तता विरुद्ध लाज',
        'एकसंधता विरुद्ध नैराश्य',
      ],
      exp: '"मी कोण आहे आणि माझ्या जीवनाची दिशा काय?" या प्रश्नाचे उत्तर शोधण्याचा हा महत्त्वाचा टप्पा आहे.',
    },
    hi: {
      q: 'एरिकसन के पाँचवें चरण (किशोरावस्था १२–१८ वर्ष) में किशोर अपने मूल्यों, रुचियों व भविष्य भूमिकाओं की खोज कर किस संकट का समाधान करते हैं?',
      opts: [
        'पहचान बनाम भूमिका भ्रम (Identity vs Role Confusion)',
        'विश्वास बनाम अविश्वास',
        'स्वायत्तता बनाम लज्जा',
        'संपूर्णता बनाम निराशा',
      ],
      exp: '"मैं कौन हूँ और मेरा उद्देश्य क्या है?" — यह पहचान निर्माण किशोरावस्था का केंद्रीय कार्य है।',
    },
  },
  {
    topic: 'Kohlberg – Stage 4 Law & Social Order',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Asked about jumping a red traffic light when the road looks empty at 2 a.m., a student says: "Rules hold society together safely; if everyone breaks laws when convenient, traffic collapses." This reflects Kohlberg’s:',
      opts: [
        'Conventional Stage 4 (Law, Duty, and Social Order Maintenance)',
        'Pre-conventional Stage 1 (Blind Fear of Fine)',
        'Pre-conventional Stage 2 (Personal Bribe Trade)',
        'Amoral Reflex',
      ],
      exp: 'Stage 4 values upholding civic rules to preserve dependable social institutions.',
    },
    mr: {
      q: 'रात्री रस्ता रिकामा असतानाही लाल सिग्नल का पाळावा यावर विद्यार्थी म्हणतो, "कायद्यामुळे समाजाची सुरक्षित व्यवस्था टिकते; प्रत्येकजण नियम मोडू लागला तर व्यवस्था कोसळेल." हा कोहलबर्गचा कोणता टप्पा आहे?',
      opts: [
        'पारंपरिक स्तर ४ (कायदा, कर्तव्य व सामाजिक सुव्यवस्था)',
        'पूर्व-पारंपरिक स्तर १ (केवळ दंडाची भीती)',
        'पूर्व-पारंपरिक स्तर २ (स्वार्थ सौदा)',
        'नैतिकपूर्व प्रतिक्षेप',
      ],
      exp: 'समाजाची सुव्यवस्था व नियमबद्धता टिकवण्यासाठी कर्तव्य पाळणे हा चौथा टप्पा होय.',
    },
    hi: {
      q: 'रात में खाली सड़क पर भी लाल बत्ती का पालन क्यों करना चाहिए, इस पर छात्र कहता है: "नियम समाज की सुरक्षा व्यवस्था बनाए रखते हैं; हर कोई तोड़ने लगा तो व्यवस्था ढह जाएगी।" यह है:',
      opts: [
        'पारंपरिक चरण ४ (कानून, कर्तव्य एवं सामाजिक व्यवस्था अनुरक्षण)',
        'पूर्व-पारंपरिक चरण १ (केवल चालान का डर)',
        'पूर्व-पारंपरिक चरण २ (स्वार्थ सौदा)',
        'नवजात प्रतिवर्त',
      ],
      exp: 'संस्थागत व्यवस्था और नागरिक कर्तव्य की रक्षा करना चौथे नैतिक चरण की विशेषता है।',
    },
  },
  {
    topic: 'Kohlberg – Stage 5 Social Contract & Welfare Reform',
    pattern: 'Conceptual',
    difficulty: 'Difficult',
    en: {
      q: 'At Kohlberg’s Post-Conventional Stage 5, citizens recognize that laws deserve respect yet:',
      opts: [
        'laws represent flexible democratic contracts meant to protect fundamental human rights and can be peacefully reformed when unjust',
        'laws can never ever be amended even when harming human dignity',
        'might always makes right physically',
        'rules vanish in favour of total selfishness',
      ],
      exp: 'Stage 5 prioritizes democratic rights and public welfare over blind legalism.',
    },
    mr: {
      q: 'कोहलबर्गच्या उत्तर-पारंपरिक स्तर ५ (सामाजिक करार) मध्ये नागरिकांची कायद्याबाबत भूमिका कशी असते?',
      opts: [
        'कायदे हे मानवी हक्क व लोककल्याणासाठी केलेला लोकशाही करार असतात व ते अन्यायकारक ठरल्यास शांततापूर्ण मार्गाने बदलता येतात',
        'अन्यायकारक असले तरी कायदे कधीच बदलू नयेत',
        'बळी तो कान पिळी',
        'स्वतःचाच स्वार्थ पाहावा',
      ],
      exp: 'लोकांचे मूलभूत हक्क व कल्याण हे कायद्याच्या अक्षरापेक्षा श्रेष्ठ मानले जाते.',
    },
    hi: {
      q: 'कोहलबर्ग के उत्तर-पारंपरिक चरण ५ (सामाजिक अनुबंध) में कानूनों के प्रति क्या दृष्टिकोण होता है?',
      opts: [
        'कानून मानवाधिकार व जनकल्याण हेतु लोकतांत्रिक अनुबंध हैं और अन्यायपूर्ण होने पर लोकतांत्रिक ढंग से बदले जा सकते हैं',
        'अन्यायपूर्ण होने पर भी कानून कभी नहीं बदले जाने चाहिए',
        'बलवान ही सही होता है',
        'केवल निजी स्वार्थ सर्वोपरि है',
      ],
      exp: 'चरण ५ में कानूनी जड़ता से ऊपर उठकर मानवाधिकार व जनकल्याण को प्राथमिकता दी जाती है।',
    },
  },
  {
    topic: 'Inclusive Differentiated Products (Tomlinson)',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Carol Ann Tomlinson defines Differentiated Instruction across Content, Process, Product, and Affect. Letting pupils demonstrate what they learned about water pollution via an illustrated comic, a short skit, or a written chart differentiates the:',
      opts: [
        'Product (output medium showcasing mastery)',
        'Grading Penalty Only',
        'Standardized Test Booklet',
        'Attendance Register',
      ],
      exp: 'Varying Products lets diverse learners show genuine understanding using personal strengths.',
    },
    mr: {
      q: 'पाण्याचे प्रदूषण या घटकावर मुलांना माहितीपत्रक, लघू नाटिका किंवा तक्ता यांपैकी एका मार्गाने सादरीकरण करण्याची निवड देणे हे टॉमलिन्सनच्या कोणत्या प्रकारचे भिन्न अध्यापन (Differentiation) आहे?',
      opts: [
        'उत्पादन / अभिव्यक्ती विविधता (Differentiating Product)',
        'केवळ गुणदंड',
        'प्रमाणित चाचणी पुस्तक',
        'हजेरीपट',
      ],
      exp: 'सर्व मुले समान संकल्पना शिकतात, परंतु आपले ज्ञान व्यक्त करण्याचे माध्यम आवडीनुसार निवडू शकतात.',
    },
    hi: {
      q: 'जल प्रदूषण विषय पर छात्रों को कॉमिक स्ट्रिप, लघु नाटक या लिखित चार्ट में से किसी एक रूप में अपनी समझ दिखाने की छूट देना टॉमलिनसन के किस विभेदन (Differentiation) का उदाहरण है?',
      opts: [
        'उत्पाद / अभिव्यक्ति विभेदन (Differentiating Product)',
        'केवल दंड अंकन',
        'मानकीकृत पुस्तिका',
        'उपस्थिति रजिस्टर',
      ],
      exp: 'अवधारणा समान रखते हुए छात्रों को अपने कौशल अनुसार प्रदर्शन का माध्यम चुनने देना Product Differentiation है।',
    },
  },
  {
    topic: 'Metacognitive Planning – Pre-Task Strategy',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Before starting a multi-step math word problem, a teacher asks: "What do you know, what is missing, and which diagram might help?" This models metacognitive:',
      opts: [
        'Planning (goal-setting and strategy selection before acting)',
        'Impulsive guessing',
        'Mechanical erasure',
        'Classical salivation',
      ],
      exp: 'Metacognition comprises Planning (before), Monitoring (during), and Evaluating (after).',
    },
    mr: {
      q: 'मोठे शाब्दिक उदाहरण सोडवण्यापूर्वी शिक्षक विचारतात: "काय दिले आहे? काय शोधायचे आहे? कोणती आकृती मदत करेल?" यातून कोणता अधिबोधन (Metacognition) टप्पा घडतो?',
      opts: [
        'नियोजन (Planning – कृतीपूर्वी धोरण निवडणे)',
        'घाईचा अंदाज',
        'यांत्रिक खोडकाम',
        'अभिजात प्रतिक्षेप',
      ],
      exp: 'अधिबोधनाचे तीन टप्पे: नियोजन (आधी), निरीक्षण (दरम्यान) आणि मूल्यांकन (नंतर).',
    },
    hi: {
      q: 'जटिल इबारती सवाल शुरू करने से पहले शिक्षक पूछते हैं: "क्या दिया है? क्या ज्ञात करना है? कौन-सा आरेख मदद करेगा?" यह परासंज्ञान का कौन-सा चरण है?',
      opts: [
        'नियोजन (Planning — कार्य से पहले रणनीति चयन)',
        'जल्दबाजी भरा अनुमान',
        'यांत्रिक मिटाना',
        'शास्त्रीय प्रतिवर्त',
      ],
      exp: 'परासंज्ञान के तीन चरण हैं: कार्य से पूर्व नियोजन, कार्य के दौरान निगरानी और अंत में मूल्यांकन।',
    },
  },
  {
    topic: 'Metacognitive Evaluation – Post-Task Reflection',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'After completing an experiment, asking pairs "Which step worked smoothly, and what would you tweak next time?" trains metacognitive:',
      opts: [
        'Evaluation (reviewing effectiveness of chosen strategy)',
        'Blind copying',
        'Extrinsic bribing',
        'Phonemic blending',
      ],
      exp: 'Reflective post-mortems convert trial outcomes into reusable strategic wisdom.',
    },
    mr: {
      q: 'प्रयोग पूर्ण झाल्यावर जोड्यांना विचारणे, "कोणती कृती उत्तम जमली आणि पुढच्या वेळी काय सुधाराल?" यातून कोणता अधिबोधन घटक विकसित होतो?',
      opts: [
        'मूल्यांकन (Evaluating – निवडलेल्या धोरणाची परिणामकारकता तपासणे)',
        'अंध नकल',
        'बाह्य प्रलोभन',
        'ध्वनी संश्लेषण',
      ],
      exp: 'कार्यानंतरच्या आत्मपरीक्षणामुळे पुढील समस्येत अधिक सुजाण धोरणे वापरता येतात.',
    },
    hi: {
      q: 'प्रयोग पूरा होने के बाद जोड़ियों से पूछना, "कौन-सा चरण सबसे ठीक चला और अगली बार क्या सुधार करोगे?" परासंज्ञान का कौन-सा पहलू है?',
      opts: [
        'मूल्यांकन (Evaluating — अपनी रणनीति की प्रभावशीलता की समीक्षा)',
        'अंध नकल',
        'बाहरी प्रलोभन',
        'ध्वनि संश्लेषण',
      ],
      exp: 'कार्य के बाद चिंतन अनुभव को भविष्य के लिए उपयोगी रणनीति में बदल देता है।',
    },
  },
  {
    topic: 'Peer Pressure Moderation & Assertiveness Skills',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'When older pre-teens worry about fitting in with friends teasing a quieter classmate, teaching polite boundary scripts ("No thanks, let’s keep games fair") strengthens:',
      opts: [
        'prosocial assertiveness and healthy resistance to negative peer pressure',
        'social isolation forever',
        'aggressive fistfighting',
        'total silence in groups',
      ],
      exp: 'Assertiveness sits calmly between passive submission and hostile aggression.',
    },
    mr: {
      q: 'मित्रांनी शांत सहपाठ्यास चिडवण्यास सांगितले असता, "नाही रे, आपण सर्वजण मिळून योग्य खेळ खेळू" असे ठाम पण नम्रपणे सांगण्याचे कौशल्य कशाचा विकास करते?',
      opts: [
        'सकारात्मक ठामपणा (Assertiveness) आणि चुकीच्या समवयस्क दबावास प्रतिकार',
        'कायमचे एकाकीपण',
        'आक्रमक भांडण',
        'पूर्ण मौन',
      ],
      exp: 'दुसऱ्याचा अपमान न करता स्वतःचे नैतिक मत ठामपणे मांडणे हे महत्त्वाचे जीवनकौशल्य आहे.',
    },
    hi: {
      q: 'जब मित्र किसी शांत सहपाठी को चिढ़ाने का दबाव डालें, तब विनम्र व दृढ़ संवाद ("नहीं यार, सबके साथ सही खेल खेलते हैं") सिखाना क्या विकसित करता है?',
      opts: [
        'सकारात्मक मुखरता / दृढ़ता (Assertiveness) और नकारात्मक सहपाठी दबाव का स्वस्थ प्रतिरोध',
        'स्थायी अलगाव',
        'आक्रामक झगड़ा',
        'पूर्ण चुप्पी',
      ],
      exp: 'बिना आक्रामकता या दब्बूपन के अपनी सही बात दृढ़ता से कहना जीवन-कौशल है।',
    },
  },
  {
    topic: 'Emotional Intelligence – Naming Feelings ("Name It to Tame It")',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Posting a "Feelings Wheel" (frustrated, nervous, proud, disappointed, relieved) in Class 2 helps young pupils develop emotional regulation mainly because:',
      opts: [
        'precise emotional vocabulary helps children recognize and articulate feelings instead of hitting or throwing things',
        'children only ever experience happiness',
        'labelling feelings teaches advanced grammar tenses',
        'pictures replace lunchtime',
      ],
      exp: 'Putting words to intense feelings engages prefrontal regulation over raw amygdala reactivity.',
    },
    mr: {
      q: 'दुसरीच्या वर्गात "भावनांचे चक्र" (वैतागलेला, घाबरलेला, अभिमान वाटणारा, शांत) लावल्याने मुलांचे भावनिक नियमन कसे सुधारते?',
      opts: [
        'अचूक भावनिक शब्दसंग्रह मिळाल्याने मुले मारामारी किंवा रडण्याऐवजी स्वतःची भावना नेमक्या शब्दांत मांडू शकतात',
        'मुलांना फक्त आनंदच होतो',
        'केवळ व्याकरण काळ शिकले जातात',
        'जेवणाची सुट्टी बंद होते',
      ],
      exp: 'भावनांना अचूक नाव देता आल्यास (Emotional Literacy) त्यावर संयम ठेवणे सोपे जाते.',
    },
    hi: {
      q: 'कक्षा २ में "भावना चक्र" (निराश, घबराया, गर्वित, शांत) लगाने से बच्चों का संवेगात्मक नियंत्रण क्यों बेहतर होता है?',
      opts: [
        'सटीक भावात्मक शब्दावली मिलने से बच्चे हाथ उठाने या रोने के बजाय अपनी भावना शब्दों में कह पाते हैं',
        'बच्चों को केवल खुशी होती है',
        'केवल व्याकरण काल सीखे जाते हैं',
        'मध्याह्न भोजन बंद होता है',
      ],
      exp: 'भावनाओं को नाम दे पाने (Emotional Literacy) से आवेग पर मस्तिष्कीय नियंत्रण बढ़ता है।',
    },
  },
  {
    topic: 'Bloom – Analysis Level Question Example',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Which question sits squarely at the "Analyzing" tier of Revised Bloom’s Taxonomy?',
      opts: [
        '"Compare the root systems and leaf venation of the two collected weeds to see what pattern links them."',
        '"Define the term taproot."',
        '"List five names of desert plants."',
        '"Read paragraph 3 aloud."',
      ],
      exp: 'Analyzing breaks wholes into component parts, examines relationships, and identifies structural evidence.',
    },
    mr: {
      q: 'सुधारित ब्लूमच्या वर्गीकरणानुसार पुढीलपैकी कोणता प्रश्न "विश्लेषण" (Analyzing) पातळीचा आहे?',
      opts: [
        '"गोळा केलेल्या दोन रोपांच्या मुळांची रचना व पानांवरील शिराविन्यास यांची तुलना करून त्यांतील संबंध शोधा."',
        '"सोटमूळ याची व्याख्या लिहा."',
        '"पाच वाळवंटी वनस्पतींची नावे सांगा."',
        '"तिसरा परिच्छेद मोठ्याने वाचा."',
      ],
      exp: 'घटकांची तुलना करणे, परस्पर संबंध तपासणे व पुरावे वेगळे करणे हे विश्लेषणाचे कार्य असते.',
    },
    hi: {
      q: 'संशोधित ब्लूम वर्गीकरण के अनुसार निम्नलिखित में से कौन-सा प्रश्न "विश्लेषण" (Analyzing) स्तर का है?',
      opts: [
        '"एकत्रित दो पौधों की जड़-संरचना और पत्ती की शिरा-रचना की तुलना कर उनके बीच का संबंध पहचानिए।"',
        '"मूसला जड़ की परिभाषा लिखिए।"',
        '"पाँच मरुस्थलीय पौधों के नाम बताइए।"',
        '"तीसरा अनुच्छेद जोर से पढ़िए।"',
      ],
      exp: 'तुलना करना, घटकों को अलग करके संरचनात्मक संबंध खोजना विश्लेषण स्तर का परिचायक है।',
    },
  },
  {
    topic: 'Bloom – Creating Level Question Example',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Which classroom task exemplifies the highest "Creating" process in Revised Bloom’s Taxonomy?',
      opts: [
        '"Design and build a working cardboard rainwater filter using gravel, sand, and cloth to clean muddy runoff."',
        '"Copy the water filter sketch from page 62."',
        '"Recall the boiling point of pure water."',
        '"Match column A words to column B."',
      ],
      exp: 'Creating reorganizes elements into an original functional plan, prototype, or synthesis.',
    },
    mr: {
      q: 'सुधारित ब्लूम वर्गीकरणानुसार सर्वोच्च "सृजन / नवनिर्मिती" (Creating) पातळीची कृती कोणती?',
      opts: [
        '"गढूळ पाणी स्वच्छ करण्यासाठी वाळू, खडी आणि कापडाचा वापर करून स्वतःचे कार्यरत जलशुद्धीकरण मॉडेल डिझाइन करून बनवा."',
        '"पान ६२ वरील चित्र जसेच्या तसे उतरवून काढा."',
        '"पाण्याचा उत्कलन बिंदू सांगा."',
        '"जोड्या जुळवा."',
      ],
      exp: 'नवीन रचना, आराखडा किंवा कार्यरत प्रतिकृती स्वतः तयार करणे ही सर्वोच्च सृजन पातळी होय.',
    },
    hi: {
      q: 'संशोधित ब्लूम वर्गीकरण में सर्वोच्च "सृजन करना" (Creating) स्तर का कार्य कौन-सा है?',
      opts: [
        '"गंदला पानी साफ करने हेतु बजरी, रेत और कपड़े से स्वयं एक कार्यशील जल-छनन मॉडल डिज़ाइन व निर्मित कीजिए।"',
        '"पृष्ठ ६२ का चित्र हूबहू उतारिए।"',
        '"जल का क्वथनांक बताइए।"',
        '"स्तंभ मिलाइए।"',
      ],
      exp: 'विभिन्न घटकों को जोड़कर मौलिक उत्पाद, योजना या प्रोटोटाइप बनाना सृजन स्तर है।',
    },
  },
  {
    topic: 'Standardized vs Teacher-Made Classroom Tests',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'When planning weekly instructional adjustments for a rural Class 4 section, why is a well-crafted teacher-made quiz superior to a rigid national standardized test?',
      opts: [
        'It aligns directly with local pace, taught lessons, cultural examples, and gives rapid diagnostic feedback',
        'Teacher-made tests never follow scoring keys',
        'Standardized tests have zero validity anywhere',
        'Local quizzes ignore syllabus outcomes completely',
      ],
      exp: 'Both serve distinct purposes: teacher-made assessments guide daily instruction closely, while standardized tests allow macro benchmarking.',
    },
    mr: {
      q: 'दैनंदिन अध्यापनात तात्काळ सुधारणा करण्यासाठी राष्ट्रीय प्रमाणित चाचणीपेक्षा शिक्षकांनी बनवलेली घटक चाचणी अधिक उपयुक्त का ठरते?',
      opts: [
        'ती शिकवलेल्या पाठांच्या गतीशी व स्थानिक उदाहरणांशी थेट सुसंगत असून त्वरित निदानात्मक अभिप्राय देते',
        'शिक्षकांच्या चाचणीला उत्तरसूची नसते',
        'प्रमाणित चाचण्या कुठेच वैध नसतात',
        'घटक चाचणी अभ्यासक्रम दुर्लक्षित करते',
      ],
      exp: 'स्थानिक अध्यापनाच्या गतीनुसार अचूक निदान व तात्काळ उपचार करण्यासाठी शिक्षक-निर्मित चाचणी सर्वोत्तम ठरते.',
    },
    hi: {
      q: 'दैनिक कक्षा शिक्षण में तुरंत सुधार हेतु राष्ट्रीय मानकीकृत परीक्षण से अधिक उपयोगी शिक्षक-निर्मित परीक्षण क्यों होता है?',
      opts: [
        'यह पढ़ाए गए पाठों की गति व स्थानीय संदर्भ से सीधे जुड़कर त्वरित निदानात्मक फीडबैक देता है',
        'शिक्षक-निर्मित परीक्षा में उत्तर कुंजी नहीं होती',
        'मानकीकृत परीक्षण कहीं वैध नहीं होते',
        'इकाई परीक्षा पाठ्यक्रम छोड़ देती है',
      ],
      exp: 'शिक्षक-निर्मित परीक्षण दैनिक शिक्षण व उपचारात्मक मदद का मार्गदर्शन करने में अत्यंत लचीला व प्रासंगिक होता है।',
    },
  },
  {
    topic: 'Objective Item Construction – Distractor Quality',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'When designing a fair Multiple-Choice Question (MCQ) for primary learners, what makes a strong "Distractor" (incorrect option)?',
      opts: [
        'It reflects a genuine common student misconception, making options plausibly balanced in length and grammar',
        'It uses silly jokes obviously wrong to anyone without reading',
        'All distractors are three times shorter than the right answer',
        'Two options are exact synonyms meaning the same thing',
      ],
      exp: 'Plausible misconception-based distractors yield genuine diagnostic clarity instead of giveaway guessing.',
    },
    mr: {
      q: 'चांगल्या बहुपर्यायी प्रश्नातील (MCQ) चुकीच्या पर्यायांचे (Distractors) वैशिष्ट्य काय असावे?',
      opts: [
        'ते विद्यार्थ्यांच्या सामान्य गैरसमजांवर आधारित, व्याकरणदृष्ट्या सुसंगत व लांबीला अचूक पर्यायासारखे विश्वसनीय असावेत',
        'न वाचताही ओळखता येतील असे हास्यास्पद असावेत',
        'अचूक उत्तरापेक्षा तिप्पट लहान असावेत',
        'दोन पर्यायांचा अर्थ अगदी सारखा असावा',
      ],
      exp: 'सामान्य गैरसमजांशी निगडित पर्यायांमुळे विद्यार्थ्याला संकल्पना खरंच समजली आहे का हे अचूक तपासता येते.',
    },
    hi: {
      q: 'उत्तम बहुविकल्पीय प्रश्न (MCQ) के गलत विकल्पों (Distractors) की मुख्य विशेषता क्या होनी चाहिए?',
      opts: [
        'वे सामान्य छात्र-भ्रांतियों पर आधारित, व्याकरण व लंबाई में संतुलित और विश्वसनीय प्रतीत होने वाले हों',
        'बिना पढ़े ही पहचाने जाने वाले हास्यास्पद हों',
        'सही उत्तर से तीन गुना छोटे हों',
        'दो विकल्प बिल्कुल समानार्थी हों',
      ],
      exp: 'सामान्य भ्रांतियों पर आधारित विश्वसनीय विकल्प वास्तविक समझ व निदान को सुनिश्चित करते हैं।',
    },
  },
  {
    topic: 'NCF-FS 2022 – Panchakosha & Toy-Based Pedagogy',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Moderate',
    en: {
      q: 'India’s National Curriculum Framework for the Foundational Stage (NCF-FS 2022) highlights "Jaadui Pitara" (play-based learning box) and Panchakosha Vikas aiming to unite:',
      opts: [
        'physical vitality, sensory awareness, emotional balance, intellectual curiosity, and joyful inner spirit through indigenous stories and toys',
        'pure silent examination cramming at age 3',
        'banning regional stories',
        'computer coding exams for 4-year-olds',
      ],
      exp: 'NCF-FS 2022 weaves holistic five-fold Panchakosha development into joyful toys, stories, music, and sensory discovery.',
    },
    mr: {
      q: 'पायाभूत स्तरावरील राष्ट्रीय अभ्यासक्रम आराखडा (NCF-FS 2022) मधील "जादुई पिटारा" व पंचकोश विकास कशाचा संगम साधतो?',
      opts: [
        'देशी खेळणी, गोष्टी व गाण्यांद्वारे शारीरिक, प्राणिक, भावनिक, बौद्धिक आणि आनंदमय अशा पाचही पैलूंचा समग्र विकास',
        '३ व्या वर्षी मूक परीक्षा घोकंपट्टी',
        'प्रादेशिक गोष्टींवर बंदी',
        '४ वर्षांच्या मुलांची संगणक कोडिंग परीक्षा',
      ],
      exp: 'खेळातून व स्थानिक साहित्यातून बालकाचा सर्वांगीण पंचकोश विकास NCF-FS 2022 चा केंद्रबिंदू आहे.',
    },
    hi: {
      q: 'आधारभूत चरण हेतु राष्ट्रीय पाठ्यचर्या (NCF-FS 2022) का "जादुई पिटारा" व पंचकोश विकास किसका संगम करता है?',
      opts: [
        'स्वदेशी खिलौनों, कहानियों व गीतों के माध्यम से शारीरिक, प्राणिक, मानसिक, बौद्धिक एवं आनंदमय समग्र विकास',
        '३ वर्ष की आयु में कठोर परीक्षा रटंत',
        'क्षेत्रीय कहानियों पर रोक',
        '४ वर्ष के बच्चों की कोडिंग परीक्षा',
      ],
      exp: 'NCF-FS 2022 खेल, प्रकृति और आनंदमय खिलौनों द्वारा पंचकोश समग्र विकास को बढ़ावा देता है।',
    },
  },
  {
    topic: 'School Readiness – Vidya Pravesh (3-Month Module)',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Easy',
    en: {
      q: 'What is the purpose of NCERT/NEP 2020’s "Vidya Pravesh" 3-month play-based bridge module at the entry of Class 1?',
      opts: [
        'To ensure every incoming child—including those without prior pre-schooling—gains joyful social comfort, oral language, and pre-numeracy readiness',
        'To filter and reject children failing an IQ screening test',
        'To complete full Class 2 algebra ahead of schedule',
        'To enforce 6-hour silent bench posture',
      ],
      exp: 'Vidya Pravesh smooths emotional and foundational transitions for diverse first-time school entrants.',
    },
    mr: {
      q: 'NEP 2020 अंतर्गत इयत्ता पहिलीच्या प्रारंभी राबवल्या जाणाऱ्या ३ महिन्यांच्या "विद्या प्रवेश" (Vidya Pravesh) खेळ-आधारित उपक्रमाचा मुख्य हेतू काय?',
      opts: [
        'पूर्व-प्राथमिक शिक्षण न मिळालेल्या मुलांसह सर्व नवप्रवेशित बालकांना आनंददायी सामाजिक स्थैर्य, तोंडी भाषा व पूर्व-गणित सज्जता देणे',
        'चाचणी घेऊन मुलांना नाकारणे',
        'इयत्ता दुसरीचे बीजगणित आधीच संपवणे',
        '६ तास शांत बसवणे',
      ],
      exp: 'प्रत्येक नव्या विद्यार्थ्यास आत्मविश्वासाने शाळेशी जोडणे हा विद्या प्रवेश कार्यक्रमाचा गाभा आहे.',
    },
    hi: {
      q: 'NEP 2020 के अंतर्गत कक्षा १ की शुरुआत में ३ माह के खेल-आधारित "विद्या प्रवेश" मॉड्यूल का मुख्य उद्देश्य क्या है?',
      opts: [
        'बिना पूर्व-विद्यालय अनुभव वाले बच्चों सहित सभी नवागंतुकों को आनंददायी सामाजिक सहजता, मौखिक भाषा व पूर्व-संख्या तैयारी देना',
        'IQ जांच कर बच्चों को अस्वीकार करना',
        'कक्षा २ का गणित पहले ही निपटाना',
        '६ घंटे मौन बैठाना',
      ],
      exp: 'विद्या प्रवेश हर नए छात्र के लिए विद्यालय में सहज व आनंदपूर्ण संक्रमण सुनिश्चित करता है।',
    },
  },
  {
    topic: 'Peer Feedback Protocol – Two Stars and a Wish',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Teaching Class 4 partners to review each other’s posters using "Two Stars and a Wish" primarily teaches:',
      opts: [
        'respectful appreciation of strengths paired with specific constructive suggestion',
        'jealous ranking of classmates',
        'erasing a friend’s entire drawing',
        'ignoring assessment goals completely',
      ],
      exp: 'Structured peer critique makes feedback encouraging, specific, and collaborative.',
    },
    mr: {
      q: 'चौथीतील मित्रांनी एकमेकांच्या प्रकल्प तक्त्याचे परीक्षण करताना "दोन तारे (चांगल्या बाजू) आणि एक इच्छा (सुधारणेची सूचना)" वापरल्यास काय विकसित होते?',
      opts: [
        'आदरपूर्वक कौतुक व नेमकी सकारात्मक सुधारणा सुचवण्याची सहकार्य संस्कृती',
        'ईर्ष्येची स्पर्धा',
        'मित्राचे चित्र पुसणे',
        'निकषांकडे दुर्लक्ष',
      ],
      exp: 'संतुलित सहपाठी अभिप्राय वर्गात परस्पर आदर व गुणवत्तेची जाण वाढवतो.',
    },
    hi: {
      q: 'कक्षा ४ के साथियों द्वारा एक-दूसरे के पोस्टर की समीक्षा "टू स्टार्स एंड अ विश" (दो सराहना व एक सुधार सुझाव) से करना क्या सिखाता है?',
      opts: [
        'खूबियों की सम्मानजनक सराहना के साथ स्पष्ट व रचनात्मक सुझाव देना',
        'ईर्ष्यापूर्ण रैंकिंग',
        'मित्र का चित्र मिटाना',
        'लक्ष्यों की अनदेखी',
      ],
      exp: 'संरचित सहपाठी प्रतिपुष्टि सहयोगी व सुरक्षित सुधार संस्कृति निर्मित करती है।',
    },
  },
  {
    topic: 'Cognitive Apprenticeship – Modelling & Coaching (Collins)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Just as a master potter lets an apprentice watch hand motions while narrating thoughts aloud ("Think-Aloud Modelling"), Collins’s Cognitive Apprenticeship helps pupils by:',
      opts: [
        'making invisible expert reasoning steps visible and audible before learners attempt guided practice',
        'hiding how problems are solved until finals',
        'grading blind trial-and-error immediately',
        'banning pupil imitation',
      ],
      exp: 'Modelling -> Coaching -> Scaffolding -> Articulation -> Reflection -> Exploration turns implicit thinking strategies explicit.',
    },
    mr: {
      q: 'कुंभार आपल्या शिकाऊ कारागिराला काम करताना विचार बोलून दाखवतो तसे शिक्षक गणित सोडवताना स्वतःचे विचार मोठ्याने बोलून दाखवतात (Think-Aloud). याला बोधनात्मक उमेदवारीत काय लाभ होतो?',
      opts: [
        'तज्ज्ञांची अदृश्य विचारप्रक्रिया मुलांना स्पष्ट दिसते व ऐकू येते, ज्याचा सराव पुढे मुले मार्गदर्शनाखाली करतात',
        'परीक्षेपर्यंत पद्धत लपवली जाते',
        'अंध चुकींवर तात्काळ गुण कापले जातात',
        'अनुकरणास बंदी असते',
      ],
      exp: 'विचारप्रक्रिया प्रकट (Visible Thinking) केल्यास कठीण कौशल्ये शिकणे सोपे होते.',
    },
    hi: {
      q: 'जैसे उस्ताद कारीगर काम करते हुए मन की प्रक्रिया बोलकर दिखाता है (Think-Aloud Modelling), वैसे ही शिक्षक द्वारा विचार स्पष्ट बोलना छात्र की कैसे मदद करता है?',
      opts: [
        'विशेषज्ञ की अदृश्य तर्क-प्रक्रिया स्पष्ट दिखने-सुनने से छात्र निर्देशित अभ्यास में उसे अपना सकते हैं',
        'अंतिम परीक्षा तक तरीका छिपा रहता है',
        'तुरंत अंक काटे जाते हैं',
        'अनुकरण वर्जित होता है',
      ],
      exp: 'चिंतन के चरणों को दृश्य व श्रव्य बनाना कठिन समस्या-समाधान को सुलभ बना देता है।',
    },
  },
  {
    topic: 'Hawthorne Effect Awareness in Classroom Pilots',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'When students briefly boost effort for 3 days mainly because special cameras and visitors are watching a new pilot activity, educators term this temporary novelty lift the:',
      opts: [
        'Hawthorne Effect',
        'ZPD Consolidation',
        'Object Permanence',
        'Maturation Threshold',
      ],
      exp: 'Evaluating educational reforms over full terms separates genuine learning gains from short-lived Hawthorne novelty.',
    },
    mr: {
      q: 'नवीन उपक्रमात निरीक्षक व पाहुणे पाहत आहेत म्हणून मुले काही दिवस अधिक उत्साहाने काम करतात; या तात्पुरत्या नावीन्य परिणामास काय म्हणतात?',
      opts: [
        'हॉथॉर्न परिणाम (Hawthorne Effect)',
        'समीपस्थ विकास क्षेत्र',
        'वस्तू-स्थायित्व',
        'परिपक्वता मर्यादा',
      ],
      exp: 'कायमस्वरूपी शैक्षणिक सुधारणा तपासण्यासाठी दीर्घकालीन निरीक्षण आवश्यक असते.',
    },
    hi: {
      q: 'किसी नए प्रयोग के दौरान निरीक्षकों की उपस्थिति व नवीनता के कारण छात्रों का प्रयास कुछ दिनों के लिए बढ़ जाना क्या कहलाता है?',
      opts: [
        'हॉथॉर्न प्रभाव (Hawthorne Effect)',
        'ZPD सुदृढ़ीकरण',
        'वस्तु स्थायित्व',
        'परिपक्वता सीमा',
      ],
      exp: 'दीर्घकालिक मूल्यांकन से पता चलता है कि सुधार वास्तविक है या केवल अस्थायी आकर्षण।',
    },
  },
  {
    topic: 'Schema Distortion & Cultural Scripts (Bartlett)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Frederic Bartlett showed learners recall unfamiliar stories more accurately when linked to their cultural schemas, whereas alien details get reshaped to fit expectations. For teachers, this means before reading an unfamiliar cultural text, we should:',
      opts: [
        'build a brief shared context bridge using images and familiar analogies first',
        'assume everyone magically shares identical urban-or-foreign references',
        'never show visual maps of distant places',
        'punish pupils for misinterpreting unfamiliar customs',
      ],
      exp: 'Pre-building cultural background prevents comprehension distortion.',
    },
    mr: {
      q: 'अपारंपरिक किंवा दूरच्या संस्कृतीतील पाठ वाचताना मुलांचा गोंधळ व चुकीचा अर्थ लावणे टाळण्यासाठी अध्यापनापूर्वी शिक्षकाने काय करावे?',
      opts: [
        'चित्रे व परिचित उदाहरणांच्या मदतीने संबंधित सांस्कृतिक पार्श्वभूमीचा छोटा पूल आधी तयार करावा',
        'सर्वांना सर्व संदर्भ आपोआप माहित आहेत असे मानावे',
        'नकाशे दाखवू नयेत',
        'गोंधळ झाल्यास शिक्षा करावी',
      ],
      exp: 'पूर्व-पार्श्वभूमी स्पष्ट केल्यास अपरिचित मजकुराचे अचूक आकलन होते.',
    },
    hi: {
      q: 'अपरिचित सांस्कृतिक पृष्ठभूमि वाला पाठ पढ़ाने से पहले गलत अर्थ निकलने से रोकने हेतु शिक्षक को क्या करना चाहिए?',
      opts: [
        'चित्रों व परिचित उदाहरणों द्वारा आवश्यक सांस्कृतिक संदर्भ का संक्षिप्त सेतु पहले बना लेना चाहिए',
        'मान लेना चाहिए कि सबको सब कुछ पहले से पता है',
        'मानचित्र न दिखाएँ',
        'भ्रमित होने पर दंड दें',
      ],
      exp: 'पूर्व संदर्भ निर्माण से अपरिचित पाठ का बोध सटीक होता है।',
    },
  },
  {
    topic: 'Avoiding Gender-Biased Career Steering',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Two pupils express opposite interests: Meena wants to repair school solar lamps while Harsh loves embroidery and tailoring design. How should a responsive primary school guide them?',
      opts: [
        'Encourage both enthusiastically based on genuine curiosity and craftsmanship without gender stereotyping',
        'Swap their choices by force to fit traditional labels',
        'Mock Harsh in front of boys',
        'Keep Meena away from electrical kits',
      ],
      exp: 'Every vocational and STEM skill belongs to interested humans regardless of gender.',
    },
    mr: {
      q: 'मीनाला सौर दिवे दुरुस्त करण्यात रस आहे तर हर्षला भरतकाम व शिवणकला डिझाइन आवडते. संवेदनशील शाळेने कसे मार्गदर्शन करावे?',
      opts: [
        'लिंगभाव रूढी न ठेवता दोघांच्याही खऱ्या आवडीला व कौशल्याला तितक्याच उत्साहाने प्रोत्साहन द्यावे',
        'दोघांची कामे जबरदस्तीने अदलाबदल करावीत',
        'हर्षची थट्टा करावी',
        'मीनाला विद्युत उपकरणांपासून दूर ठेवावे',
      ],
      exp: 'प्रत्येक कला आणि तंत्रज्ञानावर सर्व विद्यार्थ्यांचा समान अधिकार असतो.',
    },
    hi: {
      q: 'मीना को सौर लैंप ठीक करने में रुचि है और हर्ष को कढ़ाई व परिधान डिज़ाइन पसंद है। संवेदनशील विद्यालय को क्या करना चाहिए?',
      opts: [
        'बिना लैंगिक रूढ़ि के दोनों की वास्तविक रुचि और कौशल को समान उत्साह से प्रोत्साहित करना चाहिए',
        'जबरदस्ती उनके काम बदलवा दें',
        'हर्ष का मजाक उड़ाएँ',
        'मीना को उपकरणों से दूर रखें',
      ],
      exp: 'प्रत्येक कौशल व विज्ञान क्षेत्र हर इच्छुक शिक्षार्थी के लिए खुला होना चाहिए।',
    },
  },
  {
    topic: 'Interleaved Practice in Problem Solving',
    pattern: 'Pedagogical',
    difficulty: 'Difficult',
    en: {
      q: 'Instead of solving twenty identical fraction-addition sums in a row ("Blocked Practice"), mixing addition, subtraction, and multiplication fraction word puzzles ("Interleaved Practice") improves transfer because:',
      opts: [
        'learners must actively inspect each problem’s cue and choose WHICH strategy fits rather than mindlessly repeating one trick',
        'pupils forget arithmetic completely',
        'tests take zero thought',
        'copying peers becomes easier',
      ],
      exp: 'Interleaving builds discrimination between problem types—a crucial skill on real exams.',
    },
    mr: {
      q: 'सलग वीस सारखीच बेरजेची उदाहरणे सोडवण्यापेक्षा बेरीज, वजाबाकी व गुणाकाराची शाब्दिक उदाहरणे मिसळून ("Interleaved Practice") दिल्यास वास्तविक परीक्षेत यश का वाढते?',
      opts: [
        'प्रत्येक उदाहरणात यांत्रिक नकल न करता कोणती नेमकी क्रिया निवडावी याचा सक्रिय विचार विद्यार्थी करतात म्हणून',
        'मुले गणित विसरतात म्हणून',
        'विचार करावा लागत नाही म्हणून',
        'कॉपी सोपी होते म्हणून',
      ],
      exp: 'विविध प्रकारची उदाहरणे आलटून पालटून सोडवल्याने योग्य युक्ती ओळखण्याची क्षमता तीक्ष्ण होते.',
    },
    hi: {
      q: 'लगातार बीस एक-जैसे जोड़ सवाल करने की बजाय जोड़, घटाव व गुणा के मिश्रित सवाल (Interleaved Practice) हल करने से परीक्षा प्रदर्शन क्यों सुधरता है?',
      opts: [
        'छात्र यांत्रिक दोहराव के बजाय हर सवाल को पढ़कर स्वयं तय करते हैं कि कौन-सी सही संक्रिया अपनानी है',
        'छात्र गणित भूल जाते हैं',
        'बिना सोचे उत्तर आ जाता है',
        'नकल आसान होती है',
      ],
      exp: 'मिश्रित अभ्यास अलग-अलग समस्याओं के बीच सही रणनीति पहचानने का विवेक विकसित करता है।',
    },
  },
  {
    topic: 'Emotional Regulation Through Movement Breaks',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'After two back-to-back desk periods, leading a lively 90-second stretch-and-breathe transition before math helps primary learners primarily by:',
      opts: [
        'refreshing oxygen alertness, resetting restlessness, and restoring executive attention',
        'wasting curriculum hours unnecessarily',
        'making noise habits permanent',
        'replacing physical education',
      ],
      exp: 'Brief structured movement energizers dramatically boost subsequent seated focus.',
    },
    mr: {
      q: 'सलग दोन बैठ्या तासांनंतर गणितापूर्वी ९० सेकंदांचा हलका ताण-व्यायाम व दीर्घ श्वसन घेतल्यास मुलांचा कोणता फायदा होतो?',
      opts: [
        'अस्वस्थता कमी होऊन मेंदूची ताजेतवाने एकाग्रता पुन्हा प्रस्थापित होते',
        'वेळ वाया जातो',
        'गोंगाट कायम होतो',
        'क्रीडा तास रद्द होतो',
      ],
      exp: 'छोट्या कृती-विश्रांतीमुळे वर्गातील सक्रिय अवधान लक्षणीयरीत्या वाढते.',
    },
    hi: {
      q: 'दो लगातार बैठी कक्षाओं के बाद गणित से पहले ९० सेकंड का हल्का स्ट्रेच और गहरी सांस सत्र छात्रों की कैसे मदद करता है?',
      opts: [
        'बेचैनी दूर कर मस्तिष्क की ताजगी और कार्यकारी एकाग्रता को पुनः जाग्रत करता है',
        'समय व्यर्थ करता है',
        'शोर स्थायी करता है',
        'खेल काल समाप्त करता है',
      ],
      exp: 'संक्षिप्त शारीरिक विश्राम अगली बैठी कक्षा में ध्यान व ऊर्जा को कई गुना बढ़ाता है।',
    },
  },
  {
    topic: 'Supporting First-Generation Learners Without Deficit Bias',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Moderate',
    en: {
      q: 'When parents work long agricultural shifts and cannot supervise evening notebooks, an empathetic inclusive school:',
      opts: [
        'completes key practice during school hours using peer/teacher guidance, clear home-check cards, and welcoming flexible parent chats',
        'punishes the pupil daily for unsigned notebooks',
        'labels the family "uninterested in education"',
        'assigns triple homework nightly',
      ],
      exp: 'Equity avoids penalizing pupils for home labour realities outside their control.',
    },
    mr: {
      q: 'पालक दिवसभर शेतात किंवा मजुरीवर असल्याने संध्याकाळी गृहपाठात मदत करू शकत नाहीत; अशा पहिल्या पिढीतील विद्यार्थ्यांसाठी संवेदनशील शाळेने काय करावे?',
      opts: [
        'मुख्य सराव शाळेतच शिक्षक-सहपाठी मदतीने पूर्ण करून घ्यावा व स्वाक्षरी न मिळाल्यास शिक्षा करू नये',
        'स्वाक्षरी नसल्याबद्दल रोज शिक्षा करावी',
        'कुटुंबाला शिक्षणाची पर्वा नाही असे लेबल लावावे',
        'तिप्पट गृहपाठ द्यावा',
      ],
      exp: 'सामाजिक-आर्थिक परिस्थितीचा फटका मुलांच्या शिक्षणास बसू न देणे ही खरी समता आहे.',
    },
    hi: {
      q: 'माता-पिता मजदूरी या कृषि कार्य के कारण शाम को गृहकार्य में मदद नहीं कर पाते; ऐसे प्रथम-पीढ़ी के छात्र के लिए संवेदनशील विद्यालय क्या करे?',
      opts: [
        'मुख्य अभ्यास स्कूल के समय में शिक्षक-सहपाठी सहयोग से पूरा कराए और हस्ताक्षर न होने पर दंड न दे',
        'रोज दंड दे',
        'परिवार को पढ़ाई में अरुचि वाला कहे',
        'तिगुना गृहकार्य दे',
      ],
      exp: 'सच्ची शैक्षिक समता सुनिश्चित करती है कि घर की आर्थिक विवशता का दंड बच्चे को न मिले।',
    },
  },
  {
    topic: 'Authentic Formative Questioning – Wait & Bounce',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'In the "Pose -> Pause -> Pounce -> Bounce" questioning routine, what does "Bounce" mean after Student A shares an idea?',
      opts: [
        'Bouncing the thought to Student B ("Do you agree with Asha’s reason, or would you add another clue?") to spark peer-to-peer dialogue',
        'Throwing a chalk piece at inattentive kids',
        'Rejecting every answer noisily',
        'Jumping out of seats loudly',
      ],
      exp: 'Bouncing shifts dialogue from teacher-ping-pong to genuine collaborative classroom thinking.',
    },
    mr: {
      q: 'वर्गात प्रश्नोत्तराच्या "Pose -> Pause -> Pounce -> Bounce" तंत्रात विद्यार्थ्याने उत्तर दिल्यानंतर "Bounce" म्हणजे काय?',
      opts: [
        'तो विचार दुसऱ्या विद्यार्थ्याकडे वळवणे ("तुम्हाला आशाच्या कारणांशी सहमत वाटते का की आणखी वेगळा मुद्दा जोडाल?") जेणेकरून वर्गात चर्चा घडेल',
        'बेशिस्त मुलाकडे खडू फेकणे',
        'प्रत्येक उत्तर नाकारणे',
        'जागेवरून उड्या मारणे',
      ],
      exp: 'उत्तर थेट शिक्षकांकडून न थांबता विद्यार्थ्यांमध्ये संवाद फिरत राहणे प्रभावी चर्चेची खूण आहे.',
    },
    hi: {
      q: 'कक्षा प्रश्नोत्तर की "Pose -> Pause -> Pounce -> Bounce" तकनीक में छात्र के उत्तर के बाद "Bounce" का क्या अर्थ है?',
      opts: [
        'विचार को दूसरे छात्र तक बढ़ाना ("क्या आप आशा के तर्क से सहमत हैं या कोई अन्य कारण जोड़ेंगे?") ताकि सहपाठी संवाद चले',
        'चॉक फेंकना',
        'हर उत्तर खारिज करना',
        'सीट से कूदना',
      ],
      exp: 'उत्तरों को छात्रों के बीच उछालने से एकतरफा रस्म टूटकर जीवंत सामूहिक चिंतन शुरू होता है।',
    },
  },
  {
    topic: 'Assessing Process Skills Alongside Content Knowledge',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Observation checklists tracking whether pupils "predict safely, measure honestly, record neatly, and share equipment" evaluate:',
      opts: [
        'learning Process Skills and Attitudes alongside factual recall',
        'memorized textbook definitions only',
        'cursive handwriting slant',
        'uniform colour code',
      ],
      exp: 'Assessing how learners investigate captures vital scientific and collaborative dispositions.',
    },
    mr: {
      q: 'विद्यार्थी "अंदाज बांधतो का, प्रामाणिक मोजमाप घेतो का, अचूक नोंदवतो का व साहित्य वाटून वापरतो का" हे पाहणारे निरीक्षण तक्ते कशाचे मूल्यमापन करतात?',
      opts: [
        'अध्ययन प्रक्रिया कौशल्ये आणि वैज्ञानिक दृष्टीकोन-वृत्तींचे',
        'केवळ व्याख्या पाठांतराचे',
        'हस्ताक्षर तिरपेपणाचे',
        'गणवेश रंगाचे',
      ],
      exp: 'केवळ अंतिम उत्तरापेक्षा शिकण्याची प्रक्रिया व सहकार्य तपासणे समग्र मूल्यमापन असते.',
    },
    hi: {
      q: 'यह जांचने वाली अवलोकन सूची कि छात्र "सही अनुमान लगाते हैं, ईमानदारी से मापते हैं, साफ लिखते हैं व उपकरण साझा करते हैं", क्या मापती है?',
      opts: [
        'तथ्यों के साथ अधिगम प्रक्रिया कौशल एवं सहयोगात्मक अभिवृत्तियाँ',
        'केवल रटी परिभाषाएँ',
        'सुलेख झुकाव',
        'यूनिफॉर्म रंग',
      ],
      exp: 'सीखने की प्रक्रिया और कार्य-आदतों का आकलन समग्र मूल्यांकन का महत्वपूर्ण हिस्सा है।',
    },
  },
  {
    topic: 'Child Protection Awareness – Safe & Unsafe Touch',
    pattern: 'Policy / NCF / NEP',
    difficulty: 'Moderate',
    en: {
      q: 'Teaching primary children age-appropriate personal safety ("Safe vs. Unsafe Touch, No-Go-Tell rule, and trusted adults") aligns with child protection goals under:',
      opts: [
        'POCSO awareness and holistic child safety empowerment',
        'unnecessary frightening of infants',
        'grammar translation lessons',
        'mathematics numeration tables',
      ],
      exp: 'Empowering children with clear safety words and trusted reporting channels safeguards wellbeing without fear-mongering.',
    },
    mr: {
      q: 'प्राथमिक मुलांना वयानुरूप "सुरक्षित व असुरक्षित स्पर्श" आणि "नाही म्हणा – दूर जा – विश्वासू मोठ्यांना सांगा" हे शिकवणे कशाशी सुसंगत आहे?',
      opts: [
        'POCSO अंतर्गत बालसंरक्षण जागृती व बालसक्षमीकरण',
        'अनावश्यक भीती पसरवणे',
        'व्याकरण भाषांतर',
        'गणित पाढे',
      ],
      exp: 'विश्वासू प्रौढांना मोकळेपणाने सांगण्याचे धैर्य देणारे शिक्षण बालसुरक्षेसाठी अत्यावश्यक आहे.',
    },
    hi: {
      q: 'प्राथमिक बच्चों को आयु-अनुरूप "सुरक्षित बनाम असुरक्षित स्पर्श" व "ना कहें – दूर जाएँ – विश्वसनीय बड़े को बताएँ" सिखाना किससे जुड़ा है?',
      opts: [
        'POCSO जागरूकता और बाल सुरक्षा सशक्तिकरण',
        'अनावश्यक डराना',
        'व्याकरण अनुवाद',
        'गणित पहाड़े',
      ],
      exp: 'स्पष्ट सुरक्षा शब्दावली व भरोसेमंद बड़ों तक बात पहुँचाने की समझ बच्चों की रक्षा करती है।',
    },
  },
  {
    topic: 'Reflective Teacher Practice (Schon)',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Donald Schön distinguished "Reflection-in-action" (adapting mid-lesson when pupils look puzzled) from "Reflection-on-action" (reviewing afterwards what worked and why). Keeping a brief post-class teaching journal exemplifies:',
      opts: [
        'Reflection-on-action for continuous professional growth',
        'mechanical compliance with zero adaptation',
        'punishing tired pupils',
        'ignoring lesson failures',
      ],
      exp: 'Reflective practitioners examine assumptions and outcomes daily to refine future lessons.',
    },
    mr: {
      q: 'तास संपल्यावर शिक्षकाने "आजचा कोणता उपक्रम प्रभावी ठरला व कुठे दुरुस्ती हवी?" याची संक्षिप्त दैनंदिनीत नोंद करणे हे डोनाल्ड शॉन यांच्या मते काय आहे?',
      opts: [
        'कृती-पश्चात चिंतन (Reflection-on-Action – सतत व्यावसायिक सुधारणेसाठी)',
        'बिनडोक यांत्रिक पालन',
        'थकलेल्या मुलांना शिक्षा',
        'अयशस्वी मुद्द्यांकडे दुर्लक्ष',
      ],
      exp: 'तासादरम्यानचे तत्काळ समायोजन (in-action) व तासानंतरचे आत्मचिंतन (on-action) उत्तम शिक्षक घडवते.',
    },
    hi: {
      q: 'कक्षा समाप्त होने के बाद शिक्षक का डायरी में लिखना कि "आज कौन-सा प्रयोग सफल रहा और कहाँ सुधार चाहिए", डोनाल्ड शॉन के अनुसार क्या है?',
      opts: [
        'क्रिया-पश्चात चिंतन (Reflection-on-Action — सतत व्यावसायिक सुधार हेतु)',
        'बिना सोचे यांत्रिक पालन',
        'थके छात्रों को दंड',
        'कमियों की अनदेखी',
      ],
      exp: 'कक्षा के भीतर त्वरित सुधार (in-action) और कक्षा के बाद समीक्षा (on-action) चिंतनशील शिक्षक की पहचान है।',
    },
  },
];
