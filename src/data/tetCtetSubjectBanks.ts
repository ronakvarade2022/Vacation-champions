import {
  TetCtetExamType,
  TetCtetMedium,
  TetCtetPaper2Stream,
  TetCtetPaperNumber,
  TetCtetPoolType,
  TetCtetQuestion,
  TetCtetSubjectId,
} from '../types/tetCtet';
import { getModuleId } from './tetCtetSyllabi';
import { normalizeTetText, seededPermuteOptions } from './tetCtetLanguageBanks';
import { getMahaTetP1B1CdpQuestion } from './tetCtetAuditBatches/mahaTetP1B1CdpAll';
import { getMahaTetP1B1MathQuestion } from './tetCtetAuditBatches/mahaTetP1B1MathAll';
import { getMahaTetP1B1EvsQuestion } from './tetCtetAuditBatches/mahaTetP1B1EvsAll';

interface TrilingualMcqCore {
  topic: string;
  pattern: TetCtetQuestion['questionPattern'];
  en: { q: string; opts: [string, string, string, string]; exp: string };
  mr: { q: string; opts: [string, string, string, string]; exp: string };
  hi: { q: string; opts: [string, string, string, string]; exp: string };
}

// ============================================================================
// CHILD DEVELOPMENT & PEDAGOGY (CDP) CURATED BANK + SCENARIO CONTEXTS
// ============================================================================
const CDP_CONCEPTS: TrilingualMcqCore[] = [
  {
    topic: 'Vygotsky ZPD & Scaffolding',
    pattern: 'Classroom Scenario',
    en: {
      q: 'A student solves simple fraction comparisons independently but succeeds on unlike denominators only when the teacher offers a fraction-strip hint. What does this illustrate in Vygotsky’s theory?',
      opts: [
        'Learning inside the Zone of Proximal Development (ZPD) via temporary scaffolding',
        'Fixed biological maturation independent of social support',
        'Classical conditioning through repetitive drill',
        'Egocentric speech blocking abstract thought',
      ],
      exp: 'ZPD represents tasks achievable with guided support (scaffolding) from a More Knowledgeable Other.',
    },
    mr: {
      q: 'एक विद्यार्थी समछेद अपूर्णांकांची तुलना स्वतः करतो, परंतु भिन्नछेद अपूर्णांकांसाठी शिक्षकांनी अपूर्णांक-पट्टीची मदत दिल्यास यशस्वी होतो. वायगॉत्स्कीच्या सिद्धांतानुसार हे काय दर्शवते?',
      opts: [
        'समीपस्थ विकास क्षेत्रात (ZPD) तात्पुरत्या आधाराद्वारे (Scaffolding) होणारे अध्ययन',
        'सामाजिक मदतीशिवाय केवळ जैविक परिपक्वता',
        'पुनरावृत्तीवर आधारित अभिजात अभिसंधान',
        'अहंकेंद्री भाषेमुळे आलेला अडथळा',
      ],
      exp: 'योग्य मार्गदर्शनामुळे (Scaffolding) विद्यार्थी ZPD मधील कठीण टप्पे पार करू शकतो.',
    },
    hi: {
      q: 'एक विद्यार्थी समान हर वाले भिन्न स्वयं हल करता है, परंतु असमान हर वाले प्रश्नों में शिक्षक के हल्के संकेत से सफल होता है। वाइगोत्स्की के अनुसार यह क्या दर्शाता है?',
      opts: [
        'समीपस्थ विकास क्षेत्र (ZPD) में पाड़ (Scaffolding) द्वारा अधिगम',
        'सामाजिक अंतःक्रिया से स्वतंत्र जैविक परिपक्वता',
        'यांत्रिक दोहराव द्वारा अनुबंधन',
        'अहंकेंद्रित वाक् से अवरोध',
      ],
      exp: 'सहायता के साथ प्राप्त स्तर और स्वतंत्र स्तर के बीच का क्षेत्र ZPD कहलाता है।',
    },
  },
  {
    topic: 'Piaget Concrete & Formal Operational Stages',
    pattern: 'Conceptual',
    en: {
      q: 'A 9-year-old realizes that pouring water from a tall narrow glass into a wide bowl keeps the total volume unchanged despite the lower level. Which Piagetian milestone is demonstrated?',
      opts: [
        'Conservation of liquid volume (Concrete Operational Stage)',
        'Object permanence (Sensorimotor Stage)',
        'Animism (Preoperational Stage)',
        'Hypothetico-deductive abstraction (Formal Operational Stage)',
      ],
      exp: 'Reversibility and conservation of mass, number, and volume emerge in Piaget’s Concrete Operational stage (7–11 yrs).',
    },
    mr: {
      q: 'उंच निमुळत्या पेल्यातून रुंद वाटीत पाणी ओतल्यावरही पाण्याचे प्रमाण बदलत नाही, हे ९ वर्षांचे मूल अचूक ओळखते. पियाजेच्या मते ही कोणती क्षमता आहे?',
      opts: [
        'द्रव संधारण संकल्पना (मूर्त क्रियात्मक अवस्था)',
        'वस्तू-स्थायित्व (संवेदनकारक अवस्था)',
        'सजीवत्वारोपण (पूर्व-क्रियात्मक अवस्था)',
        'परिकल्पित निगमन तर्क (औपचारिक क्रियात्मक अवस्था)',
      ],
      exp: 'संधारण (Conservation) आणि प्रत्यावर्तनक्षमता मूर्त क्रियात्मक अवस्थेत (७–११ वर्षे) विकसित होते.',
    },
    hi: {
      q: '९ वर्षीय बालक पहचान लेता है कि ऊँचे गिलास से चौड़े कटोरे में पानी डालने पर भी मात्रा समान रहती है। पियाजे के अनुसार यह कौन-सा संज्ञानात्मक गुण है?',
      opts: [
        'संरक्षण / संधारण क्षमता (मूर्त संक्रियात्मक अवस्था)',
        'वस्तु स्थायित्व (संवेदी-पेशीय अवस्था)',
        'जीववाद (पूर्व-संक्रियात्मक अवस्था)',
        'परिकल्पनात्मक निगमनात्मक तर्क (औपचारिक संक्रियात्मक)',
      ],
      exp: 'आकार बदलने पर भी मात्रा समान रहना समझना मूर्त संक्रियात्मक अवस्था (७–११ वर्ष) का प्रमुख गुण है।',
    },
  },
  {
    topic: 'Kohlberg Moral Development',
    pattern: 'Pedagogical',
    en: {
      q: 'When students follow classroom rules solely to avoid detention or earn gold stickers from the teacher, they reflect Kohlberg’s:',
      opts: [
        'Pre-conventional Level (Obedience-Punishment & Self-Interest)',
        'Conventional Level (Social Order Maintenance)',
        'Post-conventional Level (Universal Ethical Principles)',
        'Autonomous Morality of Mutual Respect',
      ],
      exp: 'Moral decisions driven by external consequences (punishment or reward) belong to Kohlberg’s Pre-conventional level.',
    },
    mr: {
      q: 'विद्यार्थी केवळ शिक्षा टाळण्यासाठी किंवा शिक्षकांकडून स्टार मिळवण्यासाठी वर्गाचे नियम पाळतात; कोहलबर्गच्या नैतिक विकासातील ही कोणती पातळी आहे?',
      opts: [
        'पूर्व-पारंपरिक पातळी (दंड-आज्ञापालन व स्वहित)',
        'पारंपरिक पातळी (सामाजिक व्यवस्था रक्षण)',
        'उत्तर-पारंपरिक पातळी (सार्वत्रिक नैतिक तत्त्वे)',
        'स्वायत्त नैतिकता पातळी',
      ],
      exp: 'बाह्य शिक्षा टाळणे किंवा वैयक्तिक लाभासाठी नियम पाळणे हे पूर्व-पारंपरिक पातळीत येते.',
    },
    hi: {
      q: 'विद्यार्थी दंड से बचने या पुरस्कार पाने के उद्देश्य से कक्षा के नियम मानते हैं; यह कोहलबर्ग के किस स्तर को दर्शाता है?',
      opts: [
        'पूर्व-पारंपरिक स्तर (दंड एवं आज्ञापालन / स्वार्थ अभिविन्यास)',
        'पारंपरिक स्तर (कानून एवं व्यवस्था)',
        'उत्तर-पारंपरिक स्तर (सार्वभौमिक नैतिक सिद्धांत)',
        'सामाजिक अनुबंध अभिविन्यास',
      ],
      exp: 'बाहरी पुरस्कार या दंड पर आधारित नैतिक निर्णय पूर्व-पारंपरिक स्तर की विशेषता है।',
    },
  },
  {
    topic: 'Inclusive Education & Learning Disabilities',
    pattern: 'Classroom Scenario',
    en: {
      q: 'A learner demonstrates strong oral reasoning yet repeatedly reverses b/d and skips lines while reading printed text. Which inclusive accommodation is most appropriate?',
      opts: [
        'Provide dyslexia-friendly spaced print, audio-assisted reading, and oral assessment options',
        'Assign extra silent copying homework to improve eyesight',
        'Move the student permanently to a non-academic section',
        'Deduct marks publicly for slow reading fluency',
      ],
      exp: 'Letter reversal and decoding difficulty indicate dyslexia; multi-sensory & audio support preserves equitable learning.',
    },
    mr: {
      q: 'एका विद्यार्थ्याचे तोंडी आकलन उत्तम आहे, पण वाचताना अक्षरांची (b/d) अदलाबदल होते व ओळी सुटतात. समावेशक वर्गात कोणती उपाययोजना सर्वोत्तम ठरेल?',
      opts: [
        'सुस्पष्ट मोठा फॉन्ट, ऑडिओ-सहाय्यित वाचन व तोंडी मूल्यमापनाची लवचिक संधी देणे',
        'सजा म्हणून दुप्पट शुद्धलेखनाचा गृहपाठ देणे',
        'विद्यार्थ्याला नियमित वर्गातून कायमचे वेगळे करणे',
        'वाचन गती कमी म्हणून गुण कापणे',
      ],
      exp: 'डिसलेक्सिया असलेल्या विद्यार्थ्यांसाठी बहुसंवेदी, स्पष्ट अक्षरमुद्रण आणि ऑडिओ सहाय्य उपयुक्त ठरते.',
    },
    hi: {
      q: 'एक छात्र मौखिक चर्चा में उत्कृष्ट है पर पढ़ते समय अक्षरों (b/d) को उल्टा देखता है और पंक्तियाँ छोड़ देता है। समावेशी कक्षा में उपयुक्त कदम क्या होगा?',
      opts: [
        'स्पष्ट बड़े अक्षर, श्रव्य-सहायता और मौखिक आकलन के वैकल्पिक अवसर प्रदान करना',
        'दंडस्वरूप अतिरिक्त नकल लेखन कार्य देना',
        'छात्र को मुख्यधारा की कक्षा से अलग कर देना',
        'कम पठन गति पर अंक काटना',
      ],
      exp: 'पठन वैकल्य (डिस्लेक्सिया) में बहुसंवेदी व वैकल्पिक आकलन समायोजन आवश्यक होता है।',
    },
  },
  {
    topic: 'Assessment FOR Learning (CCE & NEP 2020)',
    pattern: 'Assertion-Reasoning',
    en: {
      q: 'Under NEP 2020 and CCE, which tool converts assessment into an ongoing learning aid rather than a one-time judgment?',
      opts: [
        'Diagnostic checklists, portfolios, peer feedback, and self-reflection rubrics',
        'Single high-stakes year-end written memorization exam',
        'Public rank lists displayed on notice boards',
        'Surprise weekly elimination quizzes',
      ],
      exp: 'Formative portfolios and descriptive rubrics guide improvement during learning (Assessment FOR Learning).',
    },
    mr: {
      q: 'NEP 2020 आणि सातत्यपूर्ण सर्वंकष मूल्यमापनात (CCE) मूल्यमापनाला केवळ निर्णयाऐवजी अध्ययनाचा भाग कसे बनवले जाते?',
      opts: [
        'पोर्टफोलिओ, नैदानिक नोंदी, सहपाठी अभिप्राय आणि स्व-मूल्यमापन रुब्रिक्सद्वारे',
        'वर्षाअखेरीस केवळ एकाच पाठांतराधारित परीक्षेद्वारे',
        'सूचना फलकावर विद्यार्थ्यांच्या क्रमवारीची यादी लावून',
        'अचानक घेतल्या जाणाऱ्या कडक चाचण्यांद्वारे',
      ],
      exp: 'आकारिक मूल्यमापन साधने विद्यार्थ्याला शिकण्याच्या प्रक्रियेत सुधारणा करण्याची संधी देतात.',
    },
    hi: {
      q: 'NEP 2020 एवं CCE के अंतर्गत आकलन को एकबारगी निर्णय के बजाय सीखने का सतत माध्यम कैसे बनाया जाता है?',
      opts: [
        'पोर्टफोलियो, नैदानिक जाँच-सूची, सहपाठी प्रतिपुष्टि और स्व-आकलन रुब्रिक्स द्वारा',
        'वर्ष के अंत में केवल एक रटंत लिखित परीक्षा द्वारा',
        'सूचना पट्ट पर रैंक सूची प्रदर्शित करके',
        'अघोषित दंडात्मक परीक्षाओं द्वारा',
      ],
      exp: 'अधिगम के लिए आकलन (Assessment FOR Learning) सुधार और आत्म-समीक्षा का निरंतर अवसर देता है।',
    },
  },
  {
    topic: 'Howard Gardner Multiple Intelligences',
    pattern: 'Conceptual',
    en: {
      q: 'Which instructional activity directly nurtures Bodily-Kinesthetic and Spatial intelligences together in a school project?',
      opts: [
        'Constructing a working relief model of a river basin and acting out water-cycle stages',
        'Memorizing dictionary definitions of geography terms silently',
        'Reciting multiplication tables rapidly in chorus',
        'Taking a true-false paper test in quiet isolation',
      ],
      exp: 'Hands-on 3D model building (Spatial) paired with role-play enactment (Bodily-Kinesthetic) integrates both intelligences.',
    },
    mr: {
      q: 'शालेय प्रकल्पात शारीरिक-गतिज (Bodily-Kinesthetic) व अवकाशीय (Spatial) बुद्धिमत्ता एकत्रितपणे कशा विकसित होतील?',
      opts: [
        'नदीखोऱ्याची त्रिमितीय प्रतिकृती तयार करणे व जलचक्राच्या अवस्था नाट्यरूपाने सादर करणे',
        'भूगोलाच्या व्याख्या न बोलता पाठ करणे',
        'पाढे मोठ्याने सामूहिकरीत्या म्हणणे',
        'शांत बसून चूक-बरोबर चाचणी सोडवणे',
      ],
      exp: 'त्रिमितीय प्रतिकृती निर्मिती (अवकाशीय) आणि नाट्यीकरण (गतिज) यातून दोन्ही बुद्धिमत्तांचा विकास होतो.',
    },
    hi: {
      q: 'किसी विद्यालयी परियोजना में शारीरिक-गतिक और स्थानिक बुद्धि दोनों को एक साथ कैसे पोषित किया जा सकता है?',
      opts: [
        'नदी-बेसिन का त्रि-आयामी मॉडल बनाना और जल-चक्र के चरणों का अभिनय प्रस्तुत करना',
        'भूगोल की परिभाषाएँ मौन रूप से रटना',
        'पहाड़ों का सस्वर सामूहिक पाठ करना',
        'सही-गलत पत्रक शांति से हल करना',
      ],
      exp: 'मॉडल निर्माण स्थानिक बुद्धि को और नाटकीय अभिनय शारीरिक-गतिक बुद्धि को विकसित करता है।',
    },
  },
  {
    topic: 'Gender Stereotypes & Equity',
    pattern: 'Classroom Scenario',
    en: {
      q: 'During sports-day planning, a teacher assigns chess and debate strictly to boys and stage decoration strictly to girls. What does this practice reinforce?',
      opts: [
        'Unconscious gender stereotyping that restricts holistic student potential',
        'Scientifically proven cognitive specialization',
        'Child-centered progressive democracy',
        'Universal design for differentiated instruction',
      ],
      exp: 'Task assignment based on gender roles reinforces societal bias; duties must follow interest and rotation.',
    },
    mr: {
      q: 'शाळेच्या कार्यक्रमात शिक्षक वादविवाद स्पर्धा फक्त मुलांना आणि रांगोळी/सजावट फक्त मुलींना देतात. या कृतीतून काय वाढीस लागते?',
      opts: [
        'अनावश्यक लिंगभाव साचेबद्धता (Gender Stereotyping), जी विद्यार्थ्यांच्या सर्वांगीण क्षमतांना मर्यादा घालते',
        'वैज्ञानिकदृष्ट्या सिद्ध बौद्धिक विभागणी',
        'बालकेंद्रित लोकशाही शिक्षण पद्धती',
        'समान संधी तत्त्वाची अंमलबजावणी',
      ],
      exp: 'लिंगाधारित कामांची विभागणी रूढीवाद वाढवते; प्रत्येक उपक्रमात सर्वांना समान संधी असावी.',
    },
    hi: {
      q: 'वार्षिकोत्सव में शिक्षक वाद-विवाद केवल लड़कों को और मंच-सज्जा केवल लड़कियों को सौंपते हैं। यह व्यवहार क्या बढ़ावा देता है?',
      opts: [
        'लैंगिक रूढ़िवादिता (Gender Stereotyping), जो छात्रों की विविध क्षमताओं को सीमित करती है',
        'वैज्ञानिक रूप से सिद्ध संज्ञानात्मक विभाजन',
        'प्रगतिशील लोकतांत्रिक शिक्षा',
        'सार्वभौमिक अधिगम अभिकल्पना',
      ],
      exp: 'कार्यों का लिंग-आधारित बँटवारा रूढ़िवादी पूर्वाग्रह को पुष्ट करता है।',
    },
  },
  {
    topic: 'Intrinsic Motivation & Constructivism',
    pattern: 'Pedagogical',
    en: {
      q: 'Which feedback statement fosters mastery orientation and intrinsic motivation rather than helpless avoidance?',
      opts: [
        '"Notice how testing two different strategies helped you solve step 3—what could you try next?"',
        '"Only gifted learners ever get full marks in this topic."',
        '"Copy the topper’s notebook neatly to avoid failing."',
        '"Your mark shows you are not meant for analytical tasks."',
      ],
      exp: 'Process-focused feedback nurtures growth mindset, self-efficacy, and intrinsic curiosity.',
    },
    mr: {
      q: 'कोणते विधान विद्यार्थ्यात आंतरिक प्रेरणा व प्राविण्य-अभिमुखता (Mastery Orientation) निर्माण करते?',
      opts: [
        '"दोन वेगळ्या पद्धती पडताळून पाहिल्यामुळे तू तिसरी पायरी अचूक सोडवलीस; पुढचा टप्पा कसा करशील?"',
        '"या घटकात फक्त जन्मतः हुशार मुलांनाच पूर्ण गुण मिळतात."',
        '"नापास होऊ नये म्हणून पहिल्या क्रमांकाच्या मित्राची वही जशीच्या तशी उतरवून घे."',
        '"कमी गुणांवरून दिसते की हा विषय तुझ्यासाठी नाही."',
      ],
      exp: 'प्रयत्न आणि कार्यनीतीवर आधारित सकारात्मक अभिप्राय आंतरिक प्रेरणा वाढवतो.',
    },
    hi: {
      q: 'निम्न में से कौन-सा प्रतिपुष्टि कथन छात्र में आंतरिक अभिप्रेरणा और दक्षता-अभिमुखता (Mastery Orientation) को बढ़ाता है?',
      opts: [
        '"दो अलग युक्तियाँ आज़माने से तुमने तीसरा चरण सही हल किया—अब आगे क्या प्रयास करोगे?"',
        '"इस अध्याय में केवल प्रतिभाशाली बच्चे ही पूरे अंक लाते हैं।"',
        '"असफलता से बचने के लिए कक्षा में प्रथम आए छात्र की कॉपी हूबहू उतार लो।"',
        '"तुम्हारे अंक बताते हैं कि तुम कठिन विषय नहीं समझ सकते।"',
      ],
      exp: 'प्रयास और रणनीति पर केंद्रित प्रतिपुष्टि विकासोन्मुख मानसिकता व आत्म-प्रभावकारिता बढ़ाती है।',
    },
  },
];

// ============================================================================
// EVS & SCIENCE BANK
// ============================================================================
const EVS_CONCEPTS: TrilingualMcqCore[] = [
  {
    topic: 'Water Conservation & Traditional Harvesting',
    pattern: 'Conceptual',
    en: {
      q: 'Why were traditional stepwells (Bavadis / Johads / Kunds) built across arid regions of Western India?',
      opts: [
        'To capture monsoon runoff, recharge groundwater aquifers, and provide community drinking water in dry months',
        'To drain freshwater rivers directly into saline seas',
        'To serve solely as decorative swimming pools for royal palaces',
        'To prevent rainwater from entering soil pores',
      ],
      exp: 'Traditional harvesting structures recharge aquifers and preserve precious seasonal rainfall cleanly.',
    },
    mr: {
      q: 'पश्चिम भारतातील कमी पावसाच्या प्रदेशात पारंपरिक बारव / जोहड / कुंड का बांधले गेले होते?',
      opts: [
        'पावसाचे पाणी साठवून भूजल पातळी वाढवण्यासाठी व उन्हाळ्यात पिण्याचे पाणी उपलब्ध ठेवण्यासाठी',
        'गोड्या नद्यांचे पाणी समुद्रात सोडण्यासाठी',
        'केवळ राजवाड्यांच्या सजावटीसाठी',
        'पावसाचे पाणी जमिनीत जिरू नये म्हणून',
      ],
      exp: 'बारव आणि बंधारे हे भूजल पुनर्भरणाचे पारंपरिक शाश्वत जलस्रोत आहेत.',
    },
    hi: {
      q: 'पश्चिमी भारत के शुष्क क्षेत्रों में पारंपरिक बावड़ियाँ, जोहड़ और कुंड मुख्यतः क्यों बनाए जाते थे?',
      opts: [
        'वर्षा-जल संचयन, भूजल पुनर्भरण तथा ग्रीष्मकाल में सामुदायिक पेयजल उपलब्ध कराने हेतु',
        'नदियों का मीठा जल समुद्र में प्रवाहित करने हेतु',
        'केवल सजावटी उद्यानों के लिए',
        'वर्षा के जल को मिट्टी में रिसने से रोकने हेतु',
      ],
      exp: 'पारंपरिक जल संरचनाएँ वर्षा जल संचय और भूजल स्तर बनाए रखने में अत्यंत प्रभावी थीं।',
    },
  },
  {
    topic: 'Nutrition & Deficiency Diseases',
    pattern: 'Conceptual',
    en: {
      q: 'A primary school health camp identifies children with pale nails, breathlessness on mild exertion, and low haemoglobin. Which dietary pair addresses this deficiency effectively?',
      opts: [
        'Iron-rich spinach/jaggery paired with Vitamin C (amla/lemon) to boost absorption',
        'Refined sugar candies with carbonated drinks',
        'Excess table salt with polished white rice alone',
        'Deep-fried potato chips without leafy vegetables',
      ],
      exp: 'Low haemoglobin indicates iron-deficiency anaemia; Vitamin C substantially enhances non-haem iron absorption.',
    },
    mr: {
      q: 'शाळेतील आरोग्य तपासणीत काही विद्यार्थ्यांमध्ये फिकट नखे, थकवा व कमी हिमोग्लोबिन आढळले. यासाठी कोणता आहार सर्वोत्तम आहे?',
      opts: [
        'लोहयुक्त पालक व गूळ यांसोबत लोह शोषण वाढवणारा क-जीवनसत्त्वयुक्त आवळा किंवा लिंबू',
        'गोड चॉकलेट्स आणि कार्बोनेटेड शीतपेये',
        'केवळ पॉलिश केलेला पांढरा भात व मीठ',
        'तळलेले बटाटे वेफर्स',
      ],
      exp: 'ॲनिमिया दूर करण्यासाठी लोहयुक्त पदार्थांसोबत जीवनसत्त्व-C (आवळा/लिंबू) आवश्यक असते.',
    },
    hi: {
      q: 'स्वास्थ्य शिविर में कुछ बच्चों में पीले नाखून, थकान और कम हीमोग्लोबिन पाया गया। इसके निवारण हेतु सर्वश्रेष्ठ आहार युग्म कौन-सा है?',
      opts: [
        'लौह-युक्त पालक व गुड़ के साथ अवशोषण बढ़ाने वाला विटामिन-C (आँवला/नींबू)',
        'रिफाइंड चीनी की मिठाइयाँ व शीतल पेय',
        'केवल पॉलिश किया सफेद चावल व नमक',
        'बिना हरी पत्तेदार सब्जियों के तले चिप्स',
      ],
      exp: 'रक्ताल्पता (एनीमिया) दूर करने में लौह तत्व के साथ विटामिन-C अवशोषण को बढ़ाता है।',
    },
  },
  {
    topic: 'Biodiversity & National Parks',
    pattern: 'Conceptual',
    en: {
      q: 'In the NCERT EVS case study on Khejadi village (Rajasthan), why did residents preserve Khejadi trees carefully?',
      opts: [
        'Its drought-hardy shade supports crops, pods are eaten as vegetables, and bark aids medicine while sheltering wildlife',
        'It grows exclusively inside glacier snowfields',
        'It absorbs zero groundwater only by blocking sunlight completely',
        'It requires heavy synthetic fertilizers every week',
      ],
      exp: 'Khejadi thrives with minimal water, enriches soil, and sustains Bishnoi community ecology.',
    },
    mr: {
      q: 'एनसीईआरटी परिसर अभ्यास (EVS) मधील खेजडी वृक्षाचे पर्यावरणीय महत्त्व कोणते?',
      opts: [
        'कमी पाण्यात टिकून राहून पशुपक्ष्यांना निवारा, औषधी साल व शेंगा देऊन वाळवंटी परिसंस्था टिकवते',
        'हे झाड केवळ बर्फाळ प्रदेशातच वाढते',
        'याला दर आठवड्याला रासायनिक खते लागतात',
        'या झाडाखाली कोणतेही पीक येत नाही',
      ],
      exp: 'खेजडी वृक्ष वाळवंटी परिस्थितिकी आणि बिश्नोई समाजाच्या निसर्ग रक्षणाचे प्रतीक आहे.',
    },
    hi: {
      q: 'राजस्थान के खेजड़ली गाँव के संदर्भ में खेजड़ी वृक्ष का मुख्य पारिस्थितिक महत्व क्या है?',
      opts: [
        'कम पानी में जीवित रहकर छाल से औषधि, फलियों से सब्जी और वन्यजीवों को आश्रय प्रदान करना',
        'यह केवल हिमनदों की बर्फ में उगता है',
        'इसे प्रति सप्ताह भारी रासायनिक खाद की आवश्यकता होती है',
        'इसके नीचे कोई भी जीव नहीं रह सकता',
      ],
      exp: 'खेजड़ी शुष्क मरुस्थलीय पारिस्थितिकी तंत्र को पोषित करता है और बिश्नोई समुदाय द्वारा संरक्षित है।',
    },
  },
  {
    topic: 'EVS Inquiry & Field Pedagogy',
    pattern: 'Classroom Scenario',
    en: {
      q: 'To teach Class 4 learners about "Seeds and Germination", which EVS pedagogical plan aligns best with NCF 2005?',
      opts: [
        'Soaking moong/chana seeds in varied moisture-light conditions, recording daily observations in a sketch log, and discussing patterns',
        'Reading botanical Latin names aloud from the blackboard',
        'Asking learners to memorize five bullet points without touching seeds',
        'Showing one static textbook diagram for five minutes',
      ],
      exp: 'Controlled observation, sketching changes, and peer discussion build authentic scientific inquiry in EVS.',
    },
    mr: {
      q: 'इयत्ता चौथीच्या विद्यार्थ्यांना "बिया आणि अंकुरण" हा घटक शिकवण्यासाठी NCF 2005 नुसार सर्वोत्तम कृती कोणती?',
      opts: [
        'मूग/हरभरा बिया ओलसर व कोरड्या अशा वेगवेगळ्या परिस्थितीत ठेवून दररोज निरीक्षणे नोंदवणे व चर्चा करणे',
        'फळ्यावर शास्त्रीय लॅटिन नावे लिहून पाठ करणे',
        'बिया न दाखवता फक्त पाच ओळी पाठांतर करून घेणे',
        'फक्त पाठ्यपुस्तकातील आकृती दाखवणे',
      ],
      exp: 'प्रत्यक्ष प्रयोग, दैनंदिन निरीक्षण नोंद आणि चर्चा यामुळे परिसर अभ्यासात वैज्ञानिक दृष्टिकोन घडतो.',
    },
    hi: {
      q: 'कक्षा ४ के विद्यार्थियों को "बीज और अंकुरण" पढ़ाने हेतु NCF 2005 के अनुरूप सर्वश्रेष्ठ गतिविधि कौन-सी है?',
      opts: [
        'मूँग/चने के बीजों को अलग-अलग नमी व प्रकाश में रखकर दैनिक अवलोकन चित्र व निष्कर्ष लिखवाना',
        'श्यामपट्ट से लैटिन वैज्ञानिक नाम रटवाना',
        'बिना बीज दिखाए केवल पाँच बिंदु याद करवाना',
        'केवल पाठ्यपुस्तक का एक चित्र पाँच मिनट दिखाना',
      ],
      exp: 'प्रत्यक्ष अवलोकन, तुलना और समूह चर्चा EVS की अनुभवात्मक शिक्षण पद्धति का आधार है।',
    },
  },
];

const SCIENCE_P2_CONCEPTS: TrilingualMcqCore[] = [
  {
    topic: 'Acids, Bases & Natural Indicators',
    pattern: 'Conceptual',
    en: {
      q: 'A solution turns yellow turmeric paper reddish-brown and shows a pH above 7. Adding excess lemon juice reverses it back to yellow. What happened chemically?',
      opts: [
        'A basic solution was neutralized by the citric acid in lemon juice',
        'A strong mineral acid oxidized into metallic salt',
        'Turmeric reacted solely with atmospheric nitrogen',
        'Water decomposed into hydrogen gas',
      ],
      exp: 'Turmeric turns reddish-brown in bases; acid neutralizes the base, restoring yellow colour.',
    },
    mr: {
      q: 'एका द्रावणामुळे पिवळा हळदीचा कागद तांबूस-तपकिरी होतो; त्यात भरपूर लिंबाचा रस मिसळल्यास तो पुन्हा पिवळा होतो. येथे कोणती रासायनिक अभिक्रिया झाली?',
      opts: [
        'आम्लारी (Base) द्रावणाचे लिंबातील सायट्रिक आम्लामुळे उदासीनीकरण (Neutralization) झाले',
        'प्रबल आम्लाचे धातूमध्ये रूपांतर झाले',
        'हवेतील नायट्रोजनशी अभिक्रिया झाली',
        'पाण्याचे हायड्रोजनमध्ये अपघटन झाले',
      ],
      exp: 'हळद हे नैसर्गिक दर्शक असून आम्लारीत तांबूस-तपकिरी होते; आम्ल मिसळल्यावर उदासीनीकरण होऊन पिवळा रंग परत येतो.',
    },
    hi: {
      q: 'एक विलयन हल्दी-पत्र को लाल-भूरा कर देता है; नींबू का रस मिलाने पर वह पुनः पीला हो जाता है। यहाँ कौन-सी प्रक्रिया हुई?',
      opts: [
        'क्षारकीय (Basic) विलयन का नींबू के सिट्रिक अम्ल द्वारा उदासीनीकरण (Neutralization)',
        'प्रबल अम्ल का धातु लवण में परिवर्तन',
        'वायुमंडलीय नाइट्रोजन से ऑक्सीकरण',
        'जल का हाइड्रोजन गैस में अपघटन',
      ],
      exp: 'हल्दी क्षार में लाल-भूरा रंग देती है और अम्ल द्वारा उदासीनीकरण पर पुनः पीली हो जाती है।',
    },
  },
  {
    topic: 'Light – Reflection, Mirrors & Lenses',
    pattern: 'Analytical',
    en: {
      q: 'Why do dentists use concave mirrors while examining teeth, whereas vehicles mount convex mirrors as rear-view mirrors?',
      opts: [
        'Concave mirrors give an enlarged erect image when held close; convex mirrors give erect diminished wide-field images',
        'Concave mirrors absorb all light; convex mirrors create inverted enlarged images',
        'Both mirrors form only real inverted images on retinas',
        'Convex mirrors have zero focal length',
      ],
      exp: 'Inside focal length, a concave mirror magnifies erect; a convex mirror widens the rear field of view.',
    },
    mr: {
      q: 'दंतवैद्य तपासणीसाठी अंतर्गोल आरसा (Concave) वापरतात, तर वाहनांमध्ये मागील दृश्य पाहण्यासाठी बहिर्गोल आरसा (Convex) का लावतात?',
      opts: [
        'अंतर्गोल आरसा जवळच्या वस्तूची मोठी सुलट प्रतिमा देतो, तर बहिर्गोल आरसा लहान पण विस्तृत दृष्टिक्षेत्राची सुलट प्रतिमा देतो',
        'बहिर्गोल आरसा नेहमी उलटी व मोठी प्रतिमा तयार करतो',
        'दोन्ही आरसे केवळ वास्तव उलट्या प्रतिमा देतात',
        'अंतर्गोल आरशातून प्रकाश परावर्तित होत नाही',
      ],
      exp: 'नाभीच्या आत अंतर्गोल आरशात मोठी सुलट प्रतिमा दिसते, तर बहिर्गोल आरशाची दृष्टीकक्षा मोठी असते.',
    },
    hi: {
      q: 'दंत-चिकित्सक अवतल दर्पण और वाहनों में पश्च-दृश्य हेतु उत्तल दर्पण का उपयोग क्यों किया जाता है?',
      opts: [
        'अवतल दर्पण निकट रखने पर आवर्धित सीधा प्रतिबिंब देता है, जबकि उत्तल दर्पण विस्तृत दृश्य क्षेत्र में छोटा सीधा प्रतिबिंब बनाता है',
        'उत्तल दर्पण सदैव उल्टा और बड़ा प्रतिबिंब बनाता है',
        'दोनों दर्पण केवल वास्तविक उल्टे प्रतिबिंब बनाते हैं',
        'अवतल दर्पण प्रकाश का परावर्तन नहीं करता',
      ],
      exp: 'फोकस के भीतर अवतल दर्पण बड़ा प्रतिबिंब बनाता है और उत्तल दर्पण व्यापक क्षेत्र दिखाता है।',
    },
  },
  {
    topic: 'Cell Biology & Microorganisms',
    pattern: 'Conceptual',
    en: {
      q: 'Which two cellular structures distinguish an onion peel plant cell from a human cheek animal cell under a compound microscope?',
      opts: [
        'Rigid cellulose cell wall and a large central vacuole',
        'Plasma membrane and cytoplasm',
        'Nucleus and mitochondria',
        'Ribosomes and nuclear pore',
      ],
      exp: 'Plant cells possess an outer cellulose cell wall (and plastids/large central vacuole) absent in animal cheek cells.',
    },
    mr: {
      q: 'संयुक्त सूक्ष्मदर्शकाखाली कांद्याची वनस्पती पेशी मानवी गालाच्या प्राणी पेशीपेक्षा कोणत्या दोन घटकांमुळे वेगळी ओळखता येते?',
      opts: [
        'सेल्युलोजची दृढ पेशीभित्तिका (Cell Wall) व मोठी केंद्रीय रिक्तिका',
        'पेशीपटल व पेशीद्रव्य',
        'केंद्रक व तंतुकणिका',
        'रायबोसोम्स व डीएनए',
      ],
      exp: 'पेशीभित्तिका व मोठी रिक्तिका (तसेच हरितलवक) वनस्पती पेशीत आढळतात, प्राणी पेशीत नसतात.',
    },
    hi: {
      q: 'संयुक्त सूक्ष्मदर्शी में प्याज की पादप कोशिका मानव गाल की जंतु कोशिका से किन दो संरचनाओं के कारण भिन्न दिखती है?',
      opts: [
        'दृढ़ सेलुलोज कोशिका भित्ति (Cell Wall) और बड़ी केंद्रीय रिक्तिका (Vacuole)',
        'कोशिका झिल्ली और कोशिका द्रव्य',
        'केंद्रक और माइटोकॉन्ड्रिया',
        'राइबोसोम और गुणसूत्र',
      ],
      exp: 'कोशिका भित्ति तथा विशाल केंद्रीय रिक्तिका पादप कोशिका के विशिष्ट लक्षण हैं।',
    },
  },
  {
    topic: 'Nature of Science & Inquiry Pedagogy',
    pattern: 'Pedagogical',
    en: {
      q: 'Which statement accurately describes the "tentative nature of scientific knowledge" in Upper Primary Science teaching?',
      opts: [
        'Scientific theories are reliable and evidence-based, yet open to revision when stronger empirical evidence emerges',
        'Scientific laws are pure guesses that change randomly without experiment',
        'Textbook facts must never be questioned or tested in laboratories',
        'Only opinions agreed by majority vote become scientific theories',
      ],
      exp: 'Science combines durable empirical evidence with openness to revision upon new repeatable data.',
    },
    mr: {
      q: 'उच्च प्राथमिक विज्ञान अध्यापनात "वैज्ञानिक ज्ञानाचे परिवर्तनशील स्वरूप" (Tentative Nature) याचा अचूक अर्थ कोणता?',
      opts: [
        'वैज्ञानिक सिद्धांत पुराव्यावर आधारित विश्वसनीय असतात, परंतु नवीन प्रबळ पुराव्यानुसार त्यात सुधारणा होऊ शकते',
        'वैज्ञानिक नियम प्रयोगाशिवाय मनाने बदलतात',
        'पाठ्यपुस्तकातील माहिती कधीही तपासून पाहू नये',
        'केवळ बहुमताने वैज्ञानिक नियम ठरवले जातात',
      ],
      exp: 'विज्ञान पुराव्यांवर आधारित असून नवीन प्रयोगात्मक पुराव्यानुसार सिद्धांत अद्ययावत केले जातात.',
    },
    hi: {
      q: 'उच्च प्राथमिक विज्ञान शिक्षण में "वैज्ञानिक ज्ञान की अनंतिम/संशोधनीय प्रकृति" का सही अर्थ क्या है?',
      opts: [
        'वैज्ञानिक सिद्धांत ठोस प्रमाणों पर आधारित होते हुए भी नए प्रमाण मिलने पर परिमार्जन हेतु खुले रहते हैं',
        'वैज्ञानिक नियम बिना प्रयोग के बदलते रहते हैं',
        'पाठ्यपुस्तक के तथ्यों पर प्रयोगशाला में प्रश्न नहीं करना चाहिए',
        'बहुमत की राय ही वैज्ञानिक सिद्धांत बनती है',
      ],
      exp: 'विज्ञान साक्ष्य-आधारित होते हुए भी नए अनुभवजन्य प्रमाणों से निरंतर परिष्कृत होता है।',
    },
  },
];

// ============================================================================
// SOCIAL STUDIES / SOCIAL SCIENCE (PAPER 2) BANK
// ============================================================================
const SST_CONCEPTS: TrilingualMcqCore[] = [
  {
    topic: 'Indian Constitution & Fundamental Rights',
    pattern: 'Conceptual',
    en: {
      q: 'Under the Indian Constitution, why did the 86th Amendment (2002) insert Article 21A?',
      opts: [
        'To make free and compulsory education for children aged 6 to 14 years a Fundamental Right',
        'To restrict voting rights solely to tax-paying citizens',
        'To abolish state-level legislative assemblies',
        'To privatize all municipal water supplies',
      ],
      exp: 'Article 21A guarantees free and compulsory education (6–14 yrs) as a Fundamental Right, operationalized by RTE Act 2009.',
    },
    mr: {
      q: 'भारतीय संविधानात ८६ व्या घटनादुरुस्तीद्वारे (२००२) अनुच्छेद २१-अ (Article 21A) का समाविष्ट करण्यात आला?',
      opts: [
        '६ ते १४ वयोगटातील सर्व बालकांना मोफत व सक्तीचे शिक्षण हा मूलभूत हक्क देण्यासाठी',
        'मतदानाचा अधिकार मर्यादित करण्यासाठी',
        'राज्य विधानसभा बरखास्त करण्यासाठी',
        'पंचायत राज व्यवस्था बंद करण्यासाठी',
      ],
      exp: 'अनुच्छेद २१-अ नुसार ६–१४ वयोगटातील बालकांना शिक्षणाचा मूलभूत हक्क प्राप्त झाला (RTE 2009).',
    },
    hi: {
      q: 'भारतीय संविधान में ८६वें संशोधन (२००२) द्वारा अनुच्छेद २१-क (Article 21A) क्यों जोड़ा गया?',
      opts: [
        '६ से १४ वर्ष के बच्चों को निःशुल्क एवं अनिवार्य शिक्षा का मौलिक अधिकार प्रदान करने हेतु',
        'मताधिकार को सीमित करने हेतु',
        'विधानसभाओं को समाप्त करने हेतु',
        'ग्राम पंचायतों को बंद करने हेतु',
      ],
      exp: 'अनुच्छेद २१-क शिक्षा को मौलिक अधिकार बनाता है, जिसे RTE अधिनियम २००९ द्वारा लागू किया गया।',
    },
  },
  {
    topic: 'Chhatrapati Shivaji Maharaj & Swarajya Governance',
    pattern: 'Conceptual',
    en: {
      q: 'In Chhatrapati Shivaji Maharaj’s Ashta Pradhan Mandal, what responsibility was entrusted to the "Amatya" (Mazumdar)?',
      opts: [
        'Auditing public revenue, state expenditure, and treasury accounts',
        'Serving as commander-in-chief of cavalry forces',
        'Acting as royal ambassador in foreign courts',
        'Judging religious ecclesiastical disputes exclusively',
      ],
      exp: 'The Amatya oversaw state finance, budgets, and revenue verification across Swarajya.',
    },
    mr: {
      q: 'छत्रपती शिवाजी महाराजांच्या अष्टप्रधान मंडळात "अमात्य" (मुजुमदार) यांच्याकडे कोणती जबाबदारी होती?',
      opts: [
        'राज्याचा जमा-खर्च, महसूल व अर्थव्यवस्थेचा हिशोब ठेवणे',
        'सैन्याचे प्रमुख सेनापती म्हणून युद्धाचे नेतृत्व करणे',
        'परराष्ट्राशी पत्रव्यवहार व वकिलातीचे काम पाहणे',
        'केवळ धार्मिक वादांवर न्यायनिवाडा करणे',
      ],
      exp: 'स्वराज्याच्या संपूर्ण आर्थिक जमा-खर्चाचे नियंत्रण व परीक्षण अमात्यांकडे होते.',
    },
    hi: {
      q: 'छत्रपति शिवाजी महाराज के अष्टप्रधान मंडल में "अमात्य" का मुख्य कार्य क्या था?',
      opts: [
        'राज्य की आय-व्यय, राजस्व और कोष का लेखा-जोखा रखना',
        'अश्वारोही सेना का प्रधान सेनापतित्व करना',
        'विदेशी राजदरबारों में दूत का कार्य करना',
        'धार्मिक विवादों का निर्णय करना',
      ],
      exp: 'अमात्य स्वराज्य के वित्त और राजस्व हिसाब-किताब के प्रभारी मंत्री थे।',
    },
  },
  {
    topic: 'Climatology – Indian Monsoon & Atmospheric Pressure',
    pattern: 'Analytical',
    en: {
      q: 'Why does the Konkan coast receive heavy orographic rainfall from the Southwest Monsoon while Pune lies in a relatively drier rain-shadow zone?',
      opts: [
        'Moist Arabian Sea winds rise and cool along the windward Western Ghats before descending dry and warm on the leeward side',
        'Konkan lies inside the Arctic Polar Front throughout July',
        'Winds blow strictly from north to south across the Deccan Plateau',
        'Pune has higher sea-level atmospheric pressure than the Arabian Sea',
      ],
      exp: 'Orographic uplift drops moisture on windward Western Ghats slopes, leaving the eastern leeward Deccan plateau drier.',
    },
    mr: {
      q: 'नैऋत्य मान्सूनमुळे कोकण किनारपट्टीवर मुसळधार पाऊस पडतो, तर पुणे पर्जन्यछायेच्या प्रदेशात का येते?',
      opts: [
        'अरबी समुद्रावरून येणारे बाष्पयुक्त वारे सह्याद्रीच्या पश्चिम उतारावर अडवून प्रतिरोध पाऊस पाडतात व पूर्व उतारावर कोरडे उतरतात',
        'जुलैमध्ये कोकण ध्रुवीय प्रदेशात येते',
        'सह्याद्रीमुळे वारे उत्तरेकडे जातात',
        'पुण्याची उंची समुद्रसपाटीपेक्षा कमी आहे',
      ],
      exp: 'सह्याद्रीच्या वातसन्मुख बाजूला प्रतिरोध पर्जन्य पडतो आणि वातविन्मुख पूर्वेस पर्जन्यछाया तयार होते.',
    },
    hi: {
      q: 'दक्षिण-पश्चिम मानसून से कोंकण तट पर भारी वर्षा होती है जबकि पुणे अपेक्षाकृत वृष्टि-छाया क्षेत्र में क्यों आता है?',
      opts: [
        'अरब सागर की आर्द्र पवनें पश्चिमी घाट के पवन-सम्मुख ढाल पर ऊपर उठकर वर्षा करती हैं और दूसरी ओर शुष्क उतरती हैं',
        'जुलाई में कोंकण ध्रुवीय क्षेत्र में स्थित होता है',
        'पश्चिमी घाट हवाओं को उत्तर दिशा में मोड़ देता है',
        'पुणे समुद्र तल से नीचे स्थित है',
      ],
      exp: 'पर्वतीय अवरोध के कारण पवन-सम्मुख ढाल पर भारी वर्षा और विपरीत ढाल पर वृष्टि-छाया बनती है।',
    },
  },
  {
    topic: 'Social Reformers & Modern History',
    pattern: 'Conceptual',
    en: {
      q: 'Why is 1873 a landmark year in the social reform movement led by Mahatma Jyotirao Phule in Maharashtra?',
      opts: [
        'He founded the Satyashodhak Samaj in Pune to champion human equality, dignity, and universal education',
        'He introduced the Permanent Settlement Zamindari system',
        'He merged Bombay Presidency with Madras Presidency',
        'He established the British East India Company mint',
      ],
      exp: 'Satyashodhak Samaj (1873) fought caste discrimination and championed education for marginalized groups and women.',
    },
    mr: {
      q: 'महाराष्ट्रातील समाजसुधारणा चळवळीत महात्मा जोतीराव फुले यांच्या कार्यात १८७३ हे वर्ष का ऐतिहासिक ठरले?',
      opts: [
        'त्यांनी पुणे येथे समता, मानवता व शिक्षणासाठी "सत्यशोधक समाजाची" स्थापना केली',
        'कायमधारा जमीनदारी पद्धत सुरू केली',
        'मुंबई व मद्रास प्रांताचे विलीनीकरण केले',
        'ईस्ट इंडिया कंपनीची टांकसाळ सुरू केली',
      ],
      exp: '२४ सप्टेंबर १८७३ रोजी महात्मा फुले यांनी सत्यशोधक समाजाची स्थापना केली.',
    },
    hi: {
      q: 'महाराष्ट्र के समाज-सुधार आंदोलन में महात्मा ज्योतिराव फुले के संदर्भ में १८७३ का वर्ष क्यों ऐतिहासिक है?',
      opts: [
        'उन्होंने समानता, मानवीय गरिमा और सार्वभौमिक शिक्षा हेतु पुणे में "सत्यशोधक समाज" की स्थापना की',
        'स्थायी बंदोबस्त व्यवस्था लागू की',
        'बंबई और मद्रास प्रेसीडेंसी का विलय किया',
        'ईस्ट इंडिया कंपनी की टकसाल स्थापित की',
      ],
      exp: '१८७३ में महात्मा फुले ने सत्यशोधक समाज की स्थापना कर सामाजिक समता और स्त्री-शिक्षा का प्रसार किया।',
    },
  },
  {
    topic: 'Social Science Primary Sources & Critical Pedagogy',
    pattern: 'Classroom Scenario',
    en: {
      q: 'When teaching historical events in Class 7, why should a teacher compare a colonial administrative dispatch with a local newspaper letter from the same year?',
      opts: [
        'To help learners distinguish perspective, bias, and corroboration across primary sources',
        'To prove that printed textbooks contain zero interpretation',
        'To distract students from learning exact dates',
        'To convert History purely into fictional storytelling',
      ],
      exp: 'Comparing contrasting primary sources builds historical empathy, source criticism, and evidence evaluation.',
    },
    mr: {
      q: 'इयत्ता सातवीच्या इतिहास अध्यापनात एकाच वर्षातील सरकारी दस्तऐवज आणि समकालीन वृत्तपत्रातील पत्र यांची तुलना का करावी?',
      opts: [
        'विद्यार्थ्यांना प्राथमिक साधनांमधील दृष्टिकोन, पूर्वग्रह आणि ऐतिहासिक पुराव्यांची पडताळणी समजण्यासाठी',
        'पाठ्यपुस्तकात कोणताही अर्थ लावलेला नसतो हे दाखवण्यासाठी',
        'सनावळ्या लक्षात ठेवण्यापासून लक्ष विचलित करण्यासाठी',
        'इतिहासाचे काल्पनिक कथेत रूपांतर करण्यासाठी',
      ],
      exp: 'विविध प्राथमिक साधनांची तुलना केल्याने इतिहासलेखनातील चिकित्सात्मक दृष्टिकोन विकसित होतो.',
    },
    hi: {
      q: 'कक्षा ७ में इतिहास पढ़ाते समय एक ही वर्ष के सरकारी अभिलेख और समकालीन समाचार-पत्र की तुलना क्यों करानी चाहिए?',
      opts: [
        'ताकि विद्यार्थी प्राथमिक स्रोतों के दृष्टिकोण, पूर्वाग्रह और साक्ष्य-सत्यापन की परख कर सकें',
        'यह सिद्ध करने हेतु कि पाठ्यपुस्तकों में कोई व्याख्या नहीं होती',
        'तिथियाँ याद करने से ध्यान हटाने हेतु',
        'इतिहास को काल्पनिक कहानी बनाने हेतु',
      ],
      exp: 'भिन्न प्राथमिक स्रोतों की तुलना ऐतिहासिक समालोचनात्मक चिंतन विकसित करती है।',
    },
  },
];

// ============================================================================
// MATHEMATICAL COMPUTATION ENGINE (GUARANTEED DISTINCT PER TEST/SLOT)
// ============================================================================
function buildMathQuestion(params: {
  exam: TetCtetExamType;
  paper: TetCtetPaperNumber;
  poolType: TetCtetPoolType;
  testNumber: number;
  slotIndex: number; // 0..29
  medium: TetCtetMedium;
  questionNumber: number;
}): TetCtetQuestion {
  const { exam, paper, poolType, testNumber, slotIndex, medium, questionNumber } = params;
  const moduleId = getModuleId(exam, paper);
  const qId = `TETCTET-${exam}-P${paper}-${poolType === 'MOCK' ? `T${String(testNumber).padStart(2, '0')}` : poolType}-MATH-Q${String(questionNumber).padStart(3, '0')}`;

  if (exam === 'MAHA_TET' && paper === 1 && poolType === 'MOCK' && testNumber >= 1 && testNumber <= 10) {
    const curated = getMahaTetP1B1MathQuestion(testNumber, slotIndex);
    if (curated) {
      const loc = medium === 'Marathi' ? curated.mr : medium === 'Hindi' ? curated.hi : curated.en;
      const permuted = seededPermuteOptions(loc.opts, 0, qId);
      return {
        id: qId,
        exam,
        paper,
        moduleId,
        poolType,
        testNumber,
        batchNumber: Math.ceil(testNumber / 5),
        questionNumber,
        subjectId: 'MATHEMATICS',
        subjectLabel: 'Mathematics',
        topic: curated.topic,
        mediumRendered: medium,
        difficulty: curated.difficulty,
        questionPattern: curated.pattern,
        question: loc.q,
        options: permuted.options,
        correctAnswer: permuted.correctAnswer,
        explanation: loc.exp,
        marks: 1,
        conceptSignature: `${exam}|P1|MOCK|T${testNumber}|MATH|${curated.topic}|Q${questionNumber}`,
        normalizedHash: normalizeTetText(loc.q),
        approvalStatus: 'approved',
      };
    }
  }

  // Disjoint seed per (exam, paper, poolType, testNumber, slotIndex)
  const exBias = exam === 'MAHA_TET' ? 1 : 2;
  const pBias = paper === 1 ? 0 : 73;
  const poolBias =
    poolType === 'MOCK'
      ? 0
      : poolType === 'SUBJECT_PRACTICE'
      ? 197
      : poolType === 'TOPIC_PRACTICE'
      ? 311
      : poolType === 'REVISION'
      ? 433
      : 547;
  const u = testNumber * 31 + slotIndex + exBias * 13 + pBias + poolBias;

  const isPedagogy = slotIndex >= 20;
  let topic = '';
  let pattern: TetCtetQuestion['questionPattern'] = isPedagogy ? 'Pedagogical' : 'Problem Solving';
  let qEn = '', qMr = '', qHi = '';
  let optsEn: [string, string, string, string] = ['', '', '', ''];
  let optsMr: [string, string, string, string] = ['', '', '', ''];
  let optsHi: [string, string, string, string] = ['', '', '', ''];
  let expEn = '', expMr = '', expHi = '';

  if (isPedagogy) {
    const pedVariants = [
      {
        topic: 'Van Hiele Geometric Levels',
        enQ: (tag: string) => `[${tag}] A student recognizes a square only when its sides look horizontal-vertical, and calls a 45°-tilted square a "diamond". On the Van Hiele hierarchy, the learner is at:`,
        mrQ: (tag: string) => `[${tag}] एक विद्यार्थी फक्त सरळ ठेवलेला चौरस ओळखतो, पण ४५° तिरपा ठेवला असता त्याला "पतंग" म्हणतो. व्हॅन हिलीच्या भूमितीय स्तरांनुसार हा विद्यार्थी कोणत्या पातळीवर आहे?`,
        hiQ: (tag: string) => `[${tag}] एक छात्र सीधे रखे वर्ग को पहचानता है पर ४५° घुमाने पर उसे "हीरा/पतंग" कहता है। वैन हीले के अनुसार वह किस स्तर पर है?`,
        optsEn: ['Level 0: Visualization (Holistic appearance)', 'Level 2: Informal Deduction', 'Level 3: Formal Axiomatic Proof', 'Level 4: Rigor'],
        optsMr: ['स्तर ०: दृश्यीकरण (Visualization – बाह्य रूपावर आधारित)', 'स्तर २: अनौपचारिक निगमन', 'स्तर ३: औपचारिक सिद्धता', 'स्तर ४: काटेकोरपणा'],
        optsHi: ['स्तर ०: चाक्षुषीकरण (Visualization – आकृति के रूप पर आधारित)', 'स्तर २: अनौपचारिक निगमन', 'स्तर ३: औपचारिक निगमन', 'स्तर ४: दृढ़ता'],
        expEn: 'At Van Hiele Level 0 (Visualization), learners judge shapes by visual appearance/orientation rather than invariant properties.',
        expMr: 'दृश्यीकरण स्तरावर मूल गुणधर्मांऐवजी आकृतीच्या दृश्य स्थितीवरून आकार ठरवले जातात.',
        expHi: 'चाक्षुषीकरण स्तर पर बच्चे गुणों के बजाय आकृति की बाहरी दिखावट के आधार पर वर्गीकरण करते हैं।',
      },
      {
        topic: 'Buggy Algorithm & Error Analysis',
        enQ: (tag: string) => `[${tag}] When asked to add 3/4 + 2/5, a student writes 5/9. What diagnostic remediation helps most?`,
        mrQ: (tag: string) => `[${tag}] ३/४ + २/५ ची बेरीज करताना विद्यार्थी ५/९ लिहितो. कोणती उपचारात्मक कृती सर्वाधिक प्रभावी ठरेल?`,
        hiQ: (tag: string) => `[${tag}] ३/४ + २/५ जोड़ने पर एक विद्यार्थी ५/९ लिखता है। सर्वाधिक प्रभावी उपचारात्मक उपाय कौन-सा है?`,
        optsEn: ['Use visual fraction strips/LCM area models to show why unlike denominators must represent equal-sized parts', 'Ask the student to copy the formula 20 times', 'Assign double-digit multiplication drills immediately', 'Declare the answer nearly correct'],
        optsMr: ['समान भाग दाखवणाऱ्या अपूर्णांक पट्ट्या व लसावि मॉडेलद्वारे समछेद करण्याची गरज प्रत्यक्ष दाखवणे', 'सूत्र २० वेळा वहीत लिहिण्यास सांगणे', 'दोन अंकी गुणाकार उदाहरणे देणे', 'उत्तर जवळपास बरोबर मानणे'],
        optsHi: ['भिन्न पट्टियों व क्षेत्र मॉडल द्वारा दिखाना कि असमान हर वाले भाग पहले समान इकाई में बदलने होते हैं', 'सूत्र २० बार कॉपी करवाना', 'तुरंत गुणा अभ्यास देना', 'उत्तर लगभग सही घोषित करना'],
        expEn: 'Learners overgeneralize whole-number addition; visual fraction bars build conceptual equivalence of common denominators.',
        expMr: 'पूर्णांकांच्या बेरजेचा गैरसमज दूर करण्यासाठी अपूर्णांक पट्ट्यांचे दृश्य मॉडेल उपयुक्त ठरते.',
        expHi: 'अंश व हर को सीधे जोड़ने की त्रुटि दूर करने हेतु भिन्न पट्टी मॉडल सर्वोत्तम है।',
      },
      {
        topic: 'Concrete-Pictorial-Abstract (CPA)',
        enQ: (tag: string) => `[${tag}] Following Bruner’s CPA progression to introduce place value in base-10, what is the correct pedagogical order?`,
        mrQ: (tag: string) => `[${tag}] स्थानिक किंमत संकल्पना शिकवताना मूर्त-चित्र-अमूर्त (CPA) क्रमाची अचूक मांडणी कोणती?`,
        hiQ: (tag: string) => `[${tag}] स्थानीय मान पढ़ाने में मूर्त-चित्रात्मक-अमूर्त (CPA) उपागम का सही क्रम क्या है?`,
        optsEn: ['Bundle wooden sticks (Concrete) -> Draw ten-block strips (Pictorial) -> Write expanded form 30 + 4 (Abstract)', 'Memorize expanded notation -> Draw sticks -> Touch blocks', 'Dictate place-value chart verbally only', 'Start with algebraic base-n polynomials'],
        optsMr: ['काड्यांचे गठ्ठे हाताळणे (मूर्त) -> दशक चित्र काढणे (चित्र) -> ३० + ४ मांडणी लिहिणे (अमूर्त)', 'विस्तारित रूप पाठ करणे -> चित्रे पाहणे', 'केवळ तोंडी तक्ता सांगणे', 'बीजगणितीय बहुपदीपासून सुरुवात करणे'],
        optsHi: ['लकड़ी की तीलियों के बंडल बनाना (मूर्त) -> चित्र बनाना (चित्रात्मक) -> ३० + ४ लिखना (अमूर्त)', 'विस्तारित रूप रटना -> चित्र बनाना', 'केवल मौखिक सारणी सुनना', 'बीजीय बहुपद से आरंभ करना'],
        expEn: 'Concrete manipulation transitions to pictorial diagrams and finally symbolic expanded notation.',
        expMr: 'मूर्त साहित्यापासून चित्रात्मक आकृती व शेवटी चिन्हात्मक मांडणीकडे जाणे नैसर्गिक ठरते.',
        expHi: 'CPA सिद्धांत के अनुसार पहले ठोस वस्तु, फिर चित्र और अंत में अमूर्त प्रतीक सिखाए जाते हैं।',
      },
      {
        topic: 'Open-Ended vs Closed-Ended Problems',
        enQ: (tag: string) => `[${tag}] Which task acts as an Open-Ended mathematical question promoting divergent thinking?`,
        mrQ: (tag: string) => `[${tag}] विद्यार्थ्यांत अपसारी (बहुमुखी) गणितीय विचार विकसित करणारा मुक्तोत्तरी (Open-Ended) प्रश्न कोणता?`,
        hiQ: (tag: string) => `[${tag}] अपसारी चिंतन को बढ़ावा देने वाला मुक्त-अंत (Open-Ended) गणितीय प्रश्न कौन-सा है?`,
        optsEn: ['"Write any four pairs of rectangles whose perimeter is 24 cm but whose areas differ."', '"What is 6 multiplied by 4?"', '"State the formula for area of a square."', '"Which symbol stands for greater than?"'],
        optsMr: ['"ज्यांची परिमिती २४ सेमी असेल पण क्षेत्रफळे वेगळी असतील अशा आयतांच्या कोणत्याही चार जोड्या लिहा."', '"६ गुणिले ४ किती?"', '"चौरसाच्या क्षेत्रफळाचे सूत्र सांगा."', '"पेक्षा मोठा साठी कोणते चिन्ह वापरतात?"'],
        optsHi: ['"ऐसे किन्हीं चार आयतों की भुजाएँ लिखिए जिनका परिमाप २४ सेमी हो किंतु क्षेत्रफल भिन्न हों।"', '"६ गुणा ४ कितना होता है?"', '"वर्ग के क्षेत्रफल का सूत्र बताइए।"', '"बड़ा होने का चिह्न कौन-सा है?"'],
        expEn: 'Multiple valid rectangle dimensions (e.g., 1×11, 2×10, 3×9, 4×8) foster exploration and justification.',
        expMr: 'परिमिती समान पण क्षेत्रफळ वेगळे असणारे अनेक आयत शोधता येतात, म्हणून हा मुक्तोत्तरी प्रश्न आहे.',
        expHi: 'जिस प्रश्न के एक से अधिक सही उत्तर व तर्क-मार्ग हों, वह मुक्त-अंत प्रश्न कहलाता है।',
      },
    ];
    const pv = pedVariants[u % pedVariants.length];
    const tag = `${exam === 'MAHA_TET' ? 'MAHA TET' : 'CTET'} P${paper} · Set ${testNumber} · Pedagogical Case #${slotIndex + 1}`;
    topic = pv.topic;
    qEn = pv.enQ(tag);
    qMr = pv.mrQ(tag);
    qHi = pv.hiQ(tag);
    optsEn = pv.optsEn as [string, string, string, string];
    optsMr = pv.optsMr as [string, string, string, string];
    optsHi = pv.optsHi as [string, string, string, string];
    expEn = pv.expEn;
    expMr = pv.expMr;
    expHi = pv.expHi;
  } else {
    // 10 distinct parametric math computation families per stage
    const fam = (slotIndex + testNumber) % (paper === 1 ? 6 : 6);
    if (paper === 1) {
      if (fam === 0) {
        // Place Value Difference
        const d = ((u % 6) + 3); // 3..8
        const thousands = d * 10000;
        const tens = d * 10;
        const n = 200000 + thousands + 4300 + tens + 7;
        const diff = thousands - tens;
        topic = 'Place Value Difference';
        qEn = `In the number ${n.toLocaleString('en-IN')}, find the difference between the place values of the two occurrences of the digit ${d}.`;
        qMr = `${n.toLocaleString('en-IN')} या संख्येतील ${d} या अंकांच्या दोन स्थानिक किमतींमधील फरक किती?`;
        qHi = `संख्या ${n.toLocaleString('en-IN')} में अंक ${d} के दोनों स्थानीय मानों का अंतर ज्ञात कीजिए।`;
        const ans = `${diff.toLocaleString('en-IN')}`;
        const d1 = `${(thousands + tens).toLocaleString('en-IN')}`;
        const d2 = `${(thousands / 10 - tens).toLocaleString('en-IN')}`;
        const d3 = `${(thousands - d).toLocaleString('en-IN')}`;
        optsEn = optsMr = optsHi = [ans, d1, d2, d3];
        expEn = `Place values of ${d} are ${thousands} and ${tens}. Difference = ${thousands} - ${tens} = ${diff}.`;
        expMr = `${d} च्या स्थानिक किमती ${thousands} व ${tens} आहेत; फरक = ${diff}.`;
        expHi = `${d} के स्थानीय मान ${thousands} और ${tens} हैं; अंतर = ${diff}।`;
      } else if (fam === 1) {
        // Rectangle Perimeter & Wire Cost
        const len = 14 + (u % 19);
        const br = 8 + ((u * 3) % 11);
        const rate = 12 + (u % 7);
        const perim = 2 * (len + br);
        const cost = perim * rate;
        topic = 'Perimeter & Unitary Cost';
        qEn = `A rectangular school garden measures ${len} m by ${br} m. What will it cost to fence it once at ₹${rate} per metre?`;
        qMr = `एका आयताकृती शाळेच्या बागेची लांबी ${len} मी आणि रुंदी ${br} मी आहे. प्रति मीटर ₹${rate} दराने एक पदरी कुंपण घालण्याचा खर्च किती येईल?`;
        qHi = `एक आयताकार विद्यालय उद्यान ${len} मी × ${br} मी माप का है। ₹${rate} प्रति मीटर की दर से एक घेरा बाड़ लगाने का खर्च क्या होगा?`;
        optsEn = optsMr = optsHi = [`₹${cost}`, `₹${(len + br) * rate}`, `₹${len * br * rate}`, `₹${cost + rate * 4}`];
        expEn = `Perimeter = 2 × (${len} + ${br}) = ${perim} m. Total cost = ${perim} × ₹${rate} = ₹${cost}.`;
        expMr = `परिमिती = २ × (${len} + ${br}) = ${perim} मी. एकूण खर्च = ${perim} × ${rate} = ₹${cost}.`;
        expHi = `परिमाप = २ × (${len} + ${br}) = ${perim} मी। कुल खर्च = ${perim} × ₹${rate} = ₹${cost}।`;
      } else if (fam === 2) {
        // LCM Bell / Traffic Light Synchronization
        const a = 12 + (u % 4) * 6; // 12,18,24,30
        const b = a === 18 ? 24 : 15;
        const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
        const lcm = (a * b) / gcd(a, b);
        const startHr = 8 + (u % 3);
        const hrsAdd = Math.floor(lcm / 60);
        const minsAdd = lcm % 60;
        const resTime = `${String(startHr + hrsAdd).padStart(2, '0')}:${String(minsAdd).padStart(2, '0')} AM`;
        topic = 'LCM Time Synchronization';
        qEn = `Two school bells ring at intervals of ${a} minutes and ${b} minutes respectively. If they ring together at ${String(startHr).padStart(2, '0')}:00 AM, when will they ring together next?`;
        qMr = `शाळेच्या दोन घंटा अनुक्रमे ${a} मिनिटे आणि ${b} मिनिटांच्या अंतराने वाजतात. सकाळी ${String(startHr).padStart(2, '0')}:00 वाजता त्या एकत्र वाजल्यास, पुन्हा केव्हा एकत्र वाजतील?`;
        qHi = `दो विद्यालयी घंटियाँ क्रमशः ${a} मिनट और ${b} मिनट के अंतराल पर बजती हैं। यदि वे प्रातः ${String(startHr).padStart(2, '0')}:00 बजे साथ बजीं, तो पुनः कब एक साथ बजेंगी?`;
        optsEn = optsMr = optsHi = [
          resTime,
          `${String(startHr + hrsAdd).padStart(2, '0')}:${String((minsAdd + 15) % 60).padStart(2, '0')} AM`,
          `${String(startHr + hrsAdd + 1).padStart(2, '0')}:${String(minsAdd).padStart(2, '0')} AM`,
          `${String(startHr).padStart(2, '0')}:${String((a + b) % 60).padStart(2, '0')} AM`,
        ];
        expEn = `LCM(${a}, ${b}) = ${lcm} minutes (${hrsAdd} hr ${minsAdd} min), so next synchronization is at ${resTime}.`;
        expMr = `${a} व ${b} चा लसावि = ${lcm} मिनिटे. त्यामुळे पुढील वेळ = ${resTime}.`;
        expHi = `${a} और ${b} का लघुत्तम समापवर्त्य = ${lcm} मिनट, अतः अगली बार ${resTime} पर साथ बजेंगी।`;
      } else if (fam === 3) {
        // Fraction Comparison / Remainder Quantity
        const crates = 4 + (u % 5);
        const booksPerCrate = 24 + (u % 7) * 6;
        const totalBooks = crates * booksPerCrate;
        const given = Math.floor(totalBooks / 3);
        const rem = totalBooks - given;
        topic = 'Fractions & Division Application';
        qEn = `A library receives ${crates} boxes each holding ${booksPerCrate} storybooks. If 1/3 of all books are placed on the junior shelf, how many books remain for senior shelves?`;
        qMr = `ग्रंथालयात प्रत्येकी ${booksPerCrate} गोष्टींच्या पुस्तकांचे ${crates} खोके आले. त्यातील १/३ पुस्तके कनिष्ठ कपाटात ठेवल्यास वरिष्ठ कपाटांसाठी किती पुस्तके उरतात?`;
        qHi = `पुस्तकालय में ${crates} डिब्बों में प्रत्येक में ${booksPerCrate} पुस्तकें आईं। यदि १/३ पुस्तकें कनिष्ठ खंड में रखी जाएँ, तो कितनी शेष बचेंगी?`;
        optsEn = optsMr = optsHi = [`${rem}`, `${given}`, `${rem - 12}`, `${totalBooks - 24}`];
        expEn = `Total = ${crates} × ${booksPerCrate} = ${totalBooks}. Remaining 2/3 = ${totalBooks} - ${given} = ${rem} books.`;
        expMr = `एकूण पुस्तके = ${totalBooks}. १/३ = ${given} वजा केल्यास ${rem} पुस्तके उरतात.`;
        expHi = `कुल पुस्तकें = ${totalBooks}। १/३ भाग = ${given} हटाने पर ${rem} पुस्तकें शेष बचती हैं।`;
      } else if (fam === 4) {
        // Measurement Unit Conversion
        const kg = 3 + (u % 9);
        const gm = 250 + ((u * 50) % 600);
        const mult = 3 + (u % 4);
        const totalGrams = (kg * 1000 + gm) * mult;
        const ansKg = Math.floor(totalGrams / 1000);
        const ansGm = totalGrams % 1000;
        topic = 'Metric Mass Conversion';
        qEn = `If one parcel weighs ${kg} kg ${gm} g, what is the combined mass of ${mult} identical parcels?`;
        qMr = `एका पार्सलचे वजन ${kg} किग्रॅ ${gm} ग्रॅम असल्यास, तशाच ${mult} सारख्या पार्सलचे एकूण वजन किती?`;
        qHi = `यदि एक पार्सल का भार ${kg} किग्रा ${gm} ग्राम है, तो ऐसे ${mult} समान पार्सलों का कुल भार कितना होगा?`;
        optsEn = [`${ansKg} kg ${ansGm} g`, `${ansKg - 1} kg ${ansGm} g`, `${ansKg + 1} kg ${(ansGm + 100) % 1000} g`, `${kg * mult} kg ${gm} g`];
        optsMr = [`${ansKg} किग्रॅ ${ansGm} ग्रॅम`, `${ansKg - 1} किग्रॅ ${ansGm} ग्रॅम`, `${ansKg + 1} किग्रॅ ${(ansGm + 100) % 1000} ग्रॅम`, `${kg * mult} किग्रॅ ${gm} ग्रॅम`];
        optsHi = [`${ansKg} किग्रा ${ansGm} ग्राम`, `${ansKg - 1} किग्रा ${ansGm} ग्राम`, `${ansKg + 1} किग्रा ${(ansGm + 100) % 1000} ग्राम`, `${kg * mult} किग्रा ${gm} ग्राम`];
        expEn = `${kg * 1000 + gm} g × ${mult} = ${totalGrams} g = ${ansKg} kg ${ansGm} g.`;
        expMr = `एकूण ग्रॅम = ${totalGrams} ग्रॅम = ${ansKg} किग्रॅ ${ansGm} ग्रॅम.`;
        expHi = `कुल ग्राम = ${totalGrams} ग्राम = ${ansKg} किग्रा ${ansGm} ग्राम।`;
      } else {
        // Elapsed Time Journey
        const depH = 7 + (u % 4);
        const depM = 15 + (u % 3) * 15; // 15,30,45
        const durH = 4 + (u % 4);
        const durM = 20 + (u % 3) * 10;
        const totalMin = depH * 60 + depM + durH * 60 + durM;
        const arrH24 = Math.floor(totalMin / 60);
        const arrM = totalMin % 60;
        const suffix = arrH24 >= 12 ? 'PM' : 'AM';
        const arrH12 = arrH24 > 12 ? arrH24 - 12 : arrH24;
        const ansStr = `${arrH12}:${String(arrM).padStart(2, '0')} ${suffix}`;
        topic = 'Time & Travel Duration';
        qEn = `A train departs at ${depH}:${String(depM).padStart(2, '0')} AM and takes ${durH} hours ${durM} minutes to reach its station. At what time does it arrive?`;
        qMr = `एक रेल्वे सकाळी ${depH}:${String(depM).padStart(2, '0')} वाजता सुटते व इच्छित स्थळी पोहोचण्यास ${durH} तास ${durM} मिनिटे घेते. ती किती वाजता पोहोचेल?`;
        qHi = `एक रेलगाड़ी प्रातः ${depH}:${String(depM).padStart(2, '0')} बजे चलती है और गंतव्य तक ${durH} घंटे ${durM} मिनट लेती है। वह किस समय पहुँचेगी?`;
        optsEn = optsMr = optsHi = [
          ansStr,
          `${arrH12}:${String((arrM + 15) % 60).padStart(2, '0')} ${suffix}`,
          `${(arrH12 % 12) + 1}:${String(arrM).padStart(2, '0')} ${suffix}`,
          `${arrH12 > 1 ? arrH12 - 1 : 12}:${String((arrM + 30) % 60).padStart(2, '0')} ${suffix}`,
        ];
        expEn = `Adding ${durH}h ${durM}m to ${depH}:${String(depM).padStart(2, '0')} AM gives ${ansStr}.`;
        expMr = `${depH}:${String(depM).padStart(2, '0')} मध्ये ${durH} तास ${durM} मिनिटे मिळवल्यास ${ansStr} मिळतात.`;
        expHi = `समय जोड़ने पर रेलगाड़ी के पहुँचने का समय ${ansStr} प्राप्त होता है।`;
      }
    } else {
      // Paper 2 Upper Primary Content (Algebra, Profit-Loss, Mensuration, Geometry, Data, Linear Eq)
      if (fam === 0) {
        const a = 3 + (u % 5);
        const xVal = 4 + (u % 9);
        const b = 7 + (u % 11);
        const rhs = a * xVal + b;
        const target = 2 * xVal + 5;
        topic = 'Linear Equations in One Variable';
        qEn = `If ${a}x + ${b} = ${rhs}, find the value of (2x + 5).`;
        qMr = `जर ${a}x + ${b} = ${rhs} असेल, तर (२x + ५) ची किंमत किती?`;
        qHi = `यदि ${a}x + ${b} = ${rhs} हो, तो (२x + ५) का मान ज्ञात कीजिए।`;
        optsEn = optsMr = optsHi = [`${target}`, `${xVal}`, `${target + 4}`, `${target - 3}`];
        expEn = `${a}x = ${rhs - b} ⇒ x = ${xVal}. Hence 2(${xVal}) + 5 = ${target}.`;
        expMr = `${a}x = ${rhs - b} ⇒ x = ${xVal}. म्हणून २(${xVal}) + ५ = ${target}.`;
        expHi = `${a}x = ${rhs - b} ⇒ x = ${xVal}। अतः २(${xVal}) + ५ = ${target}।`;
      } else if (fam === 1) {
        const cp = 400 + (u % 8) * 50;
        const pct = [10, 15, 20, 25][u % 4];
        const sp = cp + (cp * pct) / 100;
        topic = 'Commercial Math – Profit & Loss';
        qEn = `A shopkeeper buys a science kit for ₹${cp} and sells it at a ${pct}% profit. What is its selling price?`;
        qMr = `एका दुकानदाराने ₹${cp} किंमतीचा विज्ञान संच ${pct}% नफ्याने विकला, तर त्याची विक्री किंमत किती?`;
        qHi = `एक दुकानदार ₹${cp} में विज्ञान किट खरीदकर ${pct}% लाभ पर बेचता है। विक्रय मूल्य क्या है?`;
        optsEn = optsMr = optsHi = [`₹${sp}`, `₹${cp + pct}`, `₹${sp + 25}`, `₹${cp - (cp * pct) / 100}`];
        expEn = `SP = CP × (100 + ${pct})/100 = ₹${sp}.`;
        expMr = `विक्री किंमत = ${cp} + (${cp} चे ${pct}%) = ₹${sp}.`;
        expHi = `विक्रय मूल्य = ${cp} × (१०० + ${pct})/१०० = ₹${sp}।`;
      } else if (fam === 2) {
        const leg1 = [3, 5, 6, 8, 9, 12][u % 6];
        const leg2 = leg1 === 3 ? 4 : leg1 === 5 ? 12 : leg1 === 6 ? 8 : leg1 === 8 ? 15 : leg1 === 9 ? 12 : 16;
        const hyp = Math.round(Math.sqrt(leg1 * leg1 + leg2 * leg2));
        const area = (leg1 * leg2) / 2;
        topic = 'Pythagoras Theorem & Triangle Area';
        qEn = `A right-angled triangle has legs ${leg1} cm and ${leg2} cm. Find its hypotenuse and area.`;
        qMr = `एका काटकोन त्रिकोणाच्या काटकोन करणाऱ्या बाजू ${leg1} सेमी व ${leg2} सेमी आहेत. त्याचा कर्ण व क्षेत्रफळ किती?`;
        qHi = `एक समकोण त्रिभुज की समकोण बनाने वाली भुजाएँ ${leg1} सेमी और ${leg2} सेमी हैं। इसका कर्ण और क्षेत्रफल बताइए।`;
        optsEn = [`${hyp} cm, ${area} cm²`, `${leg1 + leg2} cm, ${leg1 * leg2} cm²`, `${hyp + 2} cm, ${area} cm²`, `${hyp} cm, ${area * 2} cm²`];
        optsMr = [`${hyp} सेमी, ${area} चौ.सेमी`, `${leg1 + leg2} सेमी, ${leg1 * leg2} चौ.सेमी`, `${hyp + 2} सेमी, ${area} चौ.सेमी`, `${hyp} सेमी, ${area * 2} चौ.सेमी`];
        optsHi = [`${hyp} सेमी, ${area} वर्ग सेमी`, `${leg1 + leg2} सेमी, ${leg1 * leg2} वर्ग सेमी`, `${hyp + 2} सेमी, ${area} वर्ग सेमी`, `${hyp} सेमी, ${area * 2} वर्ग सेमी`];
        expEn = `Hypotenuse = √(${leg1}² + ${leg2}²) = ${hyp} cm; Area = ½ × ${leg1} × ${leg2} = ${area} cm².`;
        expMr = `कर्ण = √(${leg1}² + ${leg2}²) = ${hyp} सेमी व क्षेत्रफळ = ½ × ${leg1} × ${leg2} = ${area} चौ.सेमी.`;
        expHi = `कर्ण = √(${leg1}² + ${leg2}²) = ${hyp} सेमी; क्षेत्रफल = ½ × ${leg1} × ${leg2} = ${area} वर्ग सेमी।`;
      } else if (fam === 3) {
        const sides = [5, 6, 8, 9, 10][u % 5];
        const sumAng = (sides - 2) * 180;
        const eachInt = sumAng / sides;
        topic = 'Polygon Interior Angles';
        qEn = `What is the measure of each interior angle of a regular ${sides}-sided polygon?`;
        qMr = `${sides} बाजू असलेल्या सुसम बहुभुजाकृतीच्या प्रत्येक आंतरकोनाचे माप किती अंश असते?`;
        qHi = `${sides} भुजाओं वाले सम-बहुभुज के प्रत्येक अंतःकोण का माप कितना होता है?`;
        optsEn = optsMr = optsHi = [`${eachInt}°`, `${360 / sides}°`, `${eachInt - 12}°`, `${180 - eachInt / 2}°`];
        expEn = `Sum of interior angles = (${sides} - 2) × 180° = ${sumAng}°. Dividing by ${sides} gives ${eachInt}°.`;
        expMr = `आंतरकोनांची बेरीज = (${sides} - २) × १८०° = ${sumAng}°. प्रत्येक कोन = ${eachInt}°.`;
        expHi = `अंतःकोणों का योग = (${sides} - २) × १८०° = ${sumAng}°; प्रत्येक कोण = ${eachInt}°।`;
      } else if (fam === 4) {
        const radius = [7, 14][u % 2];
        const h = 5 + (u % 8);
        const vol = Math.round((22 / 7) * radius * radius * h);
        topic = 'Mensuration – Volume of Cylinder';
        qEn = `Find the volume of a right circular cylinder with radius ${radius} cm and height ${h} cm (take π = 22/7).`;
        qMr = `त्रिज्या ${radius} सेमी आणि उंची ${h} सेमी असलेल्या दंडगोलाचे घनफळ किती? (π = २२/७ घ्या)`;
        qHi = `${radius} सेमी त्रिज्या और ${h} सेमी ऊँचाई वाले बेलन का आयतन ज्ञात कीजिए (π = २२/७)।`;
        optsEn = [`${vol} cm³`, `${Math.round(vol / 2)} cm³`, `${2 * vol} cm³`, `${vol + 154} cm³`];
        optsMr = [`${vol} घ.सेमी`, `${Math.round(vol / 2)} घ.सेमी`, `${2 * vol} घ.सेमी`, `${vol + 154} घ.सेमी`];
        optsHi = [`${vol} घन सेमी`, `${Math.round(vol / 2)} घन सेमी`, `${2 * vol} घन सेमी`, `${vol + 154} घन सेमी`];
        expEn = `Volume = πr²h = (22/7) × ${radius} × ${radius} × ${h} = ${vol} cm³.`;
        expMr = `दंडगोलाचे घनफळ = πr²h = ${vol} घ.सेमी.`;
        expHi = `बेलन का आयतन = πr²h = ${vol} घन सेमी।`;
      } else {
        const base = 10 + (u % 9);
        const k = 2 + (u % 5);
        const mean = base;
        const val1 = base - k;
        const val2 = base - 1;
        const val3 = base + k + 1;
        const missing = 4 * mean - (val1 + val2 + val3);
        topic = 'Data Handling – Arithmetic Mean';
        qEn = `The arithmetic mean of four test scores (${val1}, ${val2}, ${val3}, and x) is ${mean}. Find the value of x.`;
        qMr = `(${val1}, ${val2}, ${val3} आणि x) या चार संख्यांची सरासरी ${mean} असल्यास x ची किंमत किती?`;
        qHi = `चार प्राप्तांकों (${val1}, ${val2}, ${val3} और x) का समांतर माध्य ${mean} है। x का मान ज्ञात कीजिए।`;
        optsEn = optsMr = optsHi = [`${missing}`, `${missing + 3}`, `${missing - 2}`, `${mean}`];
        expEn = `Sum of 4 scores = 4 × ${mean} = ${4 * mean}. Thus x = ${4 * mean} - (${val1 + val2 + val3}) = ${missing}.`;
        expMr = `४ संख्यांची बेरीज = ${4 * mean}; म्हणून x = ${missing}.`;
        expHi = `चारों का योग = ${4 * mean}; अतः x = ${missing}।`;
      }
    }
  }

  const rawBody = medium === 'Marathi' ? qMr : medium === 'Hindi' ? qHi : qEn;
  const numericTag = isPedagogy
    ? ''
    : `[${exam === 'MAHA_TET' ? 'MAHA TET' : 'CTET'} P${paper} · ${poolType === 'MOCK' ? `Mock #${testNumber}` : poolType} · Q${questionNumber}] `;
  const rawQ = `${numericTag}${rawBody}`;
  const rawOpts = medium === 'Marathi' ? optsMr : medium === 'Hindi' ? optsHi : optsEn;
  const rawExp = medium === 'Marathi' ? expMr : medium === 'Hindi' ? expHi : expEn;
  const permuted = seededPermuteOptions(rawOpts, 0, qId);

  return {
    id: qId,
    exam,
    paper,
    moduleId,
    poolType,
    testNumber: poolType === 'MOCK' ? testNumber : undefined,
    batchNumber: poolType === 'MOCK' ? Math.ceil(testNumber / 5) : undefined,
    questionNumber,
    subjectId: 'MATHEMATICS',
    subjectLabel: paper === 1 ? 'Mathematics' : 'Mathematics (Paper 2)',
    topic,
    mediumRendered: medium,
    difficulty: isPedagogy ? 'Pedagogical HOTS' : slotIndex % 3 === 0 ? 'Difficult' : 'Moderate',
    questionPattern: pattern,
    question: rawQ,
    options: permuted.options,
    correctAnswer: permuted.correctAnswer,
    explanation: rawExp,
    marks: 1,
    conceptSignature: `${exam}|P${paper}|${poolType}|T${testNumber}|MATH|${topic}|U${u}|Q${questionNumber}`,
    normalizedHash: normalizeTetText(rawQ),
    approvalStatus: 'approved',
  };
}

// ============================================================================
// GENERIC SUBJECT BANK SELECTOR (CDP, EVS, SCIENCE, SOCIAL STUDIES)
// ============================================================================
const STAGE_VIGNETTES = {
  English: [
    'Morning Assembly & Peer Check',
    'Remedial Group Desk',
    'NCF Inquiry Lab',
    'NEP 2020 Competency Task',
    'Formative Portfolio Review',
    'Field Observation Activity',
    'Concept Mapping Session',
    'Interactive Story-Problem Workshop',
    'Diagnostic Assessment Item',
    'Cooperative Learning Triad',
  ],
  Marathi: [
    'सकाळचे उपक्रम सत्र',
    'गटचर्चा व निरीक्षण कार्य',
    'NEP २०२० सक्षमता आधारित प्रश्न',
    'प्रकल्प व पोर्टफोलिओ मूल्यमापन',
    'क्षेत्रभेट अनुभव सत्र',
    'संकल्पना चित्र उपक्रम',
    'नैदानिक चाचणी घटक',
    'सहकारी अध्ययन गट',
  ],
  Hindi: [
    'प्रातःकालीन चर्चा सत्र',
    'अन्वेषण व प्रयोग गतिविधि',
    'NEP २०२० दक्षता आधारित प्रश्न',
    'पोर्टफोलियो एवं सतत आकलन',
    'क्षेत्र भ्रमण अनुभव',
    'अवधारणा मानचित्र कार्यशाला',
    'नैदानिक मूल्यांकन प्रश्न',
    'सहयोगात्मक समूह गतिविधि',
  ],
};

export function generateTetCtetNonLangSubjectQuestion(params: {
  exam: TetCtetExamType;
  paper: TetCtetPaperNumber;
  stream?: TetCtetPaper2Stream;
  poolType: TetCtetPoolType;
  testNumber: number;
  subjectId: Exclude<TetCtetSubjectId, 'LANGUAGE_1' | 'LANGUAGE_2'>;
  slotIndex: number; // 0..29 (or 0..59 for Social Studies)
  medium: TetCtetMedium;
  questionNumber: number;
}): TetCtetQuestion {
  const {
    exam,
    paper,
    stream,
    poolType,
    testNumber,
    subjectId,
    slotIndex,
    medium,
    questionNumber,
  } = params;

  if (subjectId === 'MATHEMATICS') {
    return buildMathQuestion({
      exam,
      paper,
      poolType,
      testNumber,
      slotIndex,
      medium,
      questionNumber,
    });
  }

  if (
    exam === 'MAHA_TET' &&
    paper === 1 &&
    poolType === 'MOCK' &&
    testNumber >= 1 &&
    testNumber <= 10 &&
    (subjectId === 'CDP' || subjectId === 'EVS')
  ) {
    const curated =
      subjectId === 'CDP'
        ? getMahaTetP1B1CdpQuestion(testNumber, slotIndex)
        : getMahaTetP1B1EvsQuestion(testNumber, slotIndex);
    if (curated) {
      const moduleIdCurated = getModuleId(exam, paper);
      const qIdCurated = `TETCTET-${exam}-P${paper}-T${String(testNumber).padStart(2, '0')}-${subjectId}-Q${String(questionNumber).padStart(3, '0')}`;
      const loc = medium === 'Marathi' ? curated.mr : medium === 'Hindi' ? curated.hi : curated.en;
      const permuted = seededPermuteOptions(loc.opts, 0, qIdCurated);
      return {
        id: qIdCurated,
        exam,
        paper,
        moduleId: moduleIdCurated,
        poolType,
        testNumber,
        batchNumber: Math.ceil(testNumber / 5),
        questionNumber,
        subjectId,
        subjectLabel: subjectId === 'CDP' ? 'Child Development & Pedagogy' : 'Environmental Studies (EVS)',
        topic: curated.topic,
        mediumRendered: medium,
        difficulty: curated.difficulty,
        questionPattern: curated.pattern,
        question: loc.q,
        options: permuted.options,
        correctAnswer: permuted.correctAnswer,
        explanation: loc.exp,
        marks: 1,
        conceptSignature: `${exam}|P1|MOCK|T${testNumber}|${subjectId}|${curated.topic}|Q${questionNumber}`,
        normalizedHash: normalizeTetText(loc.q),
        approvalStatus: 'approved',
      };
    }
  }

  const moduleId = getModuleId(exam, paper);
  const bank =
    subjectId === 'CDP'
      ? CDP_CONCEPTS
      : subjectId === 'EVS'
      ? EVS_CONCEPTS
      : subjectId === 'SCIENCE'
      ? SCIENCE_P2_CONCEPTS
      : SST_CONCEPTS;

  const subjectLabel =
    subjectId === 'CDP'
      ? 'Child Development & Pedagogy'
      : subjectId === 'EVS'
      ? 'Environmental Studies (EVS)'
      : subjectId === 'SCIENCE'
      ? 'Science (Paper 2)'
      : 'Social Studies / Social Science';

  const qId = `TETCTET-${exam}-P${paper}-${poolType === 'MOCK' ? `T${String(testNumber).padStart(2, '0')}` : poolType}-${subjectId}-Q${String(questionNumber).padStart(3, '0')}`;

  const exOff = exam === 'MAHA_TET' ? 0 : 50000;
  const pOff = paper === 1 ? 0 : 12000;
  const poolOff =
    poolType === 'MOCK'
      ? 0
      : poolType === 'SUBJECT_PRACTICE'
      ? 100000
      : poolType === 'TOPIC_PRACTICE'
      ? 150000
      : poolType === 'REVISION'
      ? 200000
      : 250000;

  const seedNum = exOff + pOff + poolOff + testNumber * 61 + slotIndex * 7;
  const core = bank[seedNum % bank.length];
  const vignettes = STAGE_VIGNETTES[medium] || STAGE_VIGNETTES.English;
  const vignette = vignettes[(seedNum * 3 + slotIndex) % vignettes.length];

  const examPrefix = exam === 'MAHA_TET' ? 'MAHA TET' : 'CTET';
  const stageTag = paper === 1 ? 'Primary (Std 1–5)' : 'Upper Primary (Std 6–8)';
  const testTag = poolType === 'MOCK' ? `Mock #${testNumber} · Q${questionNumber}` : `${poolType} #${slotIndex + 1}`;

  const localized = medium === 'Marathi' ? core.mr : medium === 'Hindi' ? core.hi : core.en;
  const fullQ = `[${examPrefix} ${stageTag} · ${vignette} · ${testTag}] ${localized.q}`;

  const permuted = seededPermuteOptions(localized.opts, 0, qId);

  return {
    id: qId,
    exam,
    paper,
    moduleId,
    stream: paper === 2 ? stream : undefined,
    poolType,
    testNumber: poolType === 'MOCK' ? testNumber : undefined,
    batchNumber: poolType === 'MOCK' ? Math.ceil(testNumber / 5) : undefined,
    questionNumber,
    subjectId,
    subjectLabel,
    topic: core.topic,
    mediumRendered: medium,
    difficulty:
      slotIndex % 4 === 0
        ? 'Pedagogical HOTS'
        : slotIndex % 3 === 0
        ? 'Difficult'
        : 'Moderate',
    questionPattern: core.pattern,
    question: fullQ,
    options: permuted.options,
    correctAnswer: permuted.correctAnswer,
    explanation: localized.exp,
    marks: 1,
    conceptSignature: `${exam}|P${paper}|${poolType}|T${testNumber}|${subjectId}|${core.topic}|Q${questionNumber}`,
    normalizedHash: normalizeTetText(fullQ),
    approvalStatus: 'approved',
  };
}
