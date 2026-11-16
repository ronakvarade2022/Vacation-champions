import { CuratedTrilingualMcq } from './types';

// MAHA TET Paper 1 (Classes 1-5) — Child Development & Pedagogy
// Curated Audit Batch 1 (Tests 1 to 3: 90 Distinct Trilingual Questions)
export const MAHA_TET_P1_B1_CDP_PART1: CuratedTrilingualMcq[] = [
  // ===================== TEST 1 (30 Qs) =====================
  {
    topic: 'Cephalocaudal Principle of Development',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'An infant gains steady control over head and neck muscles months before sitting upright or walking independently. Which principle of physical development does this illustrate?',
      opts: [
        'Cephalocaudal sequence (head-to-toe progression)',
        'Proximodistal sequence (center-to-extremities progression)',
        'Discontinuous stage-skipping maturation',
        'Spiral regression of gross motor reflexes',
      ],
      exp: 'Cephalocaudal development proceeds longitudinally from the head downward toward the trunk and lower limbs.',
    },
    mr: {
      q: 'बाळ चालण्यापूर्वी किंवा आधाराशिवाय बसण्यापूर्वी अनेक महिने आधी डोके व मानेच्या स्नायूंवर नियंत्रण मिळवते. हा शारीरिक विकासाचा कोणता सिद्धांत दर्शवतो?',
      opts: [
        'शिरःपाद विकास दिशा (डोक्याकडून पायाकडे)',
        'मध्य-बाह्य विकास दिशा (केंद्राकडून हातापायांच्या टोकाकडे)',
        'असतत टप्पे ओलांडणारी परिपक्वता',
        'स्थूल कारक कौशल्यांची उलटगती',
      ],
      exp: 'शिरःपाद (Cephalocaudal) तत्त्वानुसार विकास डोक्याकडून पायाच्या दिशेने क्रमशः होतो.',
    },
    hi: {
      q: 'एक शिशु स्वतंत्र रूप से बैठने या चलने से महीनों पहले अपने सिर और गर्दन की मांसपेशियों पर नियंत्रण प्राप्त कर लेता है। यह विकास के किस सिद्धांत को दर्शाता है?',
      opts: [
        'शीर्षगामी क्रम (सिर से पैर की दिशा में विकास)',
        'समीप-दूराभिमुख क्रम (केंद्र से बाहर की ओर)',
        'चरण-रहित असतत परिपक्वता',
        'स्थूल गत्यात्मक प्रतिगमन',
      ],
      exp: 'शीर्षगामी (Cephalocaudal) सिद्धांत के अनुसार शारीरिक नियंत्रण सिर से शुरू होकर पैरों की ओर बढ़ता है।',
    },
  },
  {
    topic: 'Vygotsky ZPD & Scaffolding',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 3 learner solves single-digit addition independently but completes two-digit regrouping sums only when the teacher offers a bundle-of-sticks prompt. According to Vygotsky, what is taking place?',
      opts: [
        'Guided learning within the Zone of Proximal Development (ZPD) through scaffolding',
        'Fixed genetic maturation unaffected by instructional dialogue',
        'Classical conditioning via external tokens',
        'Egocentric regression into sensorimotor habits',
      ],
      exp: 'Vygotsky’s ZPD spans what a child can do independently versus with temporary scaffolded assistance.',
    },
    mr: {
      q: 'इयत्ता तिसरीतील विद्यार्थी एक-अंकी बेरीज स्वतः करतो, पण हातच्याची बेरीज शिक्षकांनी काड्यांच्या गठ्ठ्याची मदत दिल्यावर अचूक सोडवतो. वायगॉत्स्कीच्या मते ही प्रक्रिया कोणती?',
      opts: [
        'समीपस्थ विकास क्षेत्रात (ZPD) तात्पुरत्या आधाराद्वारे (Scaffolding) होणारे अध्ययन',
        'मार्गदर्शनाशिवाय केवळ अनुवंशिक परिपक्वता',
        'बाह्य बक्षिसावर आधारित अभिजात अभिसंधान',
        'संवेदनकारक अवस्थेकडे माघार',
      ],
      exp: 'योग्य वेळी दिलेली तात्पुरती मदत (Scaffolding) विद्यार्थ्याला ZPD मधील कठीण टप्पा पार करण्यास मदत करते.',
    },
    hi: {
      q: 'कक्षा ३ का छात्र एक-अंकीय जोड़ स्वयं कर लेता है, परंतु हासिल वाले जोड़ शिक्षक के तीली-बंडल संकेत से हल करता है। वाइगोत्स्की के अनुसार यह क्या दर्शाता है?',
      opts: [
        'समीपस्थ विकास क्षेत्र (ZPD) में पाड़ (Scaffolding) द्वारा अधिगम',
        'शिक्षण से स्वतंत्र आनुवंशिक परिपक्वता',
        'बाह्य पुरस्कार द्वारा शास्त्रीय अनुबंधन',
        'संवेदी-पेशीय आदतों में प्रतिगमन',
      ],
      exp: 'ZPD वह क्षेत्र है जहाँ शिक्षार्थी कुशल मार्गदर्शन (पाड़) की सहायता से कार्य पूर्ण करता है।',
    },
  },
  {
    topic: 'Piaget Liquid Conservation',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Nine-year-old Aarav recognizes that pouring juice from a tall narrow tumbler into a broad saucer leaves the quantity of juice unchanged. Which Piagetian operation has Aarav mastered?',
      opts: [
        'Conservation of volume (Concrete Operational Stage)',
        'Object permanence (Sensorimotor Stage)',
        'Animistic attribution (Preoperational Stage)',
        'Hypothetico-deductive abstraction (Formal Operational Stage)',
      ],
      exp: 'Reversibility and conservation of liquid volume emerge during Piaget’s Concrete Operational stage (7–11 years).',
    },
    mr: {
      q: 'उंच निमुळत्या पेल्यातून रुंद बशीत सरबत ओतल्यावरही सरबताचे प्रमाण तितकेच राहते, हे ९ वर्षांचा आरव ओळखतो. पियाजेच्या मते त्याने कोणती क्षमता प्राप्त केली?',
      opts: [
        'द्रव आकारमान संधारण (मूर्त क्रियात्मक अवस्था)',
        'वस्तू-स्थायित्व (संवेदनकारक अवस्था)',
        'सजीवत्वारोपण (पूर्व-क्रियात्मक अवस्था)',
        'अमूर्त परिकल्पित निगमन (औपचारिक क्रियात्मक)',
      ],
      exp: 'आकार बदलला तरी प्रमाण स्थिर राहते ही संधारण (Conservation) क्षमता मूर्त क्रियात्मक अवस्थेत येते.',
    },
    hi: {
      q: 'नौ वर्षीय आरव समझता है कि लंबे पतले गिलास से चौड़ी तश्तरी में जूस पलटने पर भी मात्रा बराबर रहती है। पियाजे के अनुसार उसने कौन-सी संक्रिया विकसित की है?',
      opts: [
        'द्रव आयतन संरक्षण (मूर्त संक्रियात्मक अवस्था)',
        'वस्तु स्थायित्व (संवेदी-पेशीय अवस्था)',
        'जीववाद (पूर्व-संक्रियात्मक अवस्था)',
        'अमूर्त निगमनात्मक तर्क (औपचारिक संक्रियात्मक)',
      ],
      exp: 'उलटनीयता और मात्रा-संरक्षण पियाजे की मूर्त संक्रियात्मक अवस्था (७–११ वर्ष) की प्रमुख उपलब्धि है।',
    },
  },
  {
    topic: 'Kohlberg Pre-Conventional Level',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Meera keeps her desk tidy only because she fears losing recess time or hopes to receive a smiley stamp from her teacher. Which moral reasoning level in Kohlberg’s model does this represent?',
      opts: [
        'Pre-conventional Level (Punishment Avoidance and Instrumental Exchange)',
        'Conventional Level (Law and Order Orientation)',
        'Post-conventional Level (Universal Ethical Principles)',
        'Social Contract Democratic Orientation',
      ],
      exp: 'Moral compliance motivated by avoiding punishment or gaining tangible rewards belongs to Kohlberg’s Pre-conventional level.',
    },
    mr: {
      q: 'सुट्टीतील खेळ रद्द होण्याच्या भीतीने किंवा शिक्षकांकडून स्मायली शिक्का मिळवण्यासाठी मीरा आपले बाक स्वच्छ ठेवते. कोहलबर्गच्या नैतिक विकासातील ही कोणती पातळी आहे?',
      opts: [
        'पूर्व-पारंपरिक पातळी (दंड टाळणे व स्वार्थ विनिमय)',
        'पारंपरिक पातळी (कायदा व सुव्यवस्था पालन)',
        'उत्तर-पारंपरिक पातळी (सार्वत्रिक नैतिक तत्त्वे)',
        'सामाजिक करार लोकशाही पातळी',
      ],
      exp: 'शिक्षा टाळणे किंवा प्रत्यक्ष बक्षीस मिळवणे हे पूर्व-पारंपरिक नैतिक पातळीचे लक्षण आहे.',
    },
    hi: {
      q: 'मीरा केवल खेल का समय कटने के डर या स्माइली स्टैम्प पाने की आशा से अपनी मेज साफ रखती है। कोहलबर्ग के मॉडल में यह किस नैतिक स्तर का उदाहरण है?',
      opts: [
        'पूर्व-पारंपरिक स्तर (दंड से बचाव एवं स्व-लाभ अभिविन्यास)',
        'पारंपरिक स्तर (कानून एवं व्यवस्था पालन)',
        'उत्तर-पारंपरिक स्तर (सार्वभौमिक नैतिक सिद्धांत)',
        'सामाजिक अनुबंध उन्मुखता',
      ],
      exp: 'दंड से बचने या बाहरी पुरस्कार पाने पर आधारित नैतिकता पूर्व-पारंपरिक स्तर में आती है।',
    },
  },
  {
    topic: 'Dyslexia Inclusive Accommodation',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 4 pupil narrates stories vividly aloud yet reverses similar letters (b/d, p/q) and struggles with phonetic decoding. Which classroom support reflects inclusive best practice?',
      opts: [
        'Use wide-spaced large print, multi-sensory letter tracing, audio recordings, and oral assessment flexibility',
        'Assign extra lines of silent handwriting punishment during lunch break',
        'Seat the child outside the main classroom permanently',
        'Withhold storybooks until all spellings are memorized faultlessly',
      ],
      exp: 'Dyslexia affects phonological decoding while oral reasoning may be strong; multisensory and audio accommodations ensure equity.',
    },
    mr: {
      q: 'इयत्ता चौथीतील विद्यार्थी गोष्टी तोंडी उत्कृष्ट सांगतो, पण वाचताना b/d, p/q अशा अक्षरांची अदलाबदल करतो. समावेशक वर्गात कोणती उपाययोजना योग्य ठरेल?',
      opts: [
        'मोठा व सुटसुटीत फॉन्ट, बहुसंवेदी अक्षरस्पर्श सराव, ऑडिओ सहाय्य आणि तोंडी मूल्यमापनाचा पर्याय देणे',
        'दुपारच्या सुट्टीत शिक्षा म्हणून अतिरिक्त शुद्धलेखन लिहायला लावणे',
        'विद्यार्थ्याला मुख्य वर्गाबाहेर कायमचे बसवणे',
        'सर्व शब्दलेखन अचूक येईपर्यंत गोष्टींची पुस्तके बंद करणे',
      ],
      exp: 'डिसलेक्सियामध्ये तोंडी आकलन उत्तम असू शकते; बहुसंवेदी साहित्य व लवचिक मूल्यमापन समावेशक शिक्षणाचा पाया आहे.',
    },
    hi: {
      q: 'कक्षा ४ का विद्यार्थी मौखिक रूप से सुंदर कहानी सुनाता है किंतु पढ़ते समय b/d व p/q में भ्रम करता है। समावेशी कक्षा में कौन-सी सहायता सर्वाधिक उपयुक्त है?',
      opts: [
        'बड़े स्पष्ट अक्षर, बहुसंवेदी अभ्यास, श्रव्य सामग्री और मौखिक आकलन का विकल्प देना',
        'मध्यावकाश में दंडस्वरूप अतिरिक्त सुलेख कार्य देना',
        'बच्चे को स्थायी रूप से अलग कमरे में बैठाना',
        'संपूर्ण वर्तनी रटने तक कहानी की किताबें न देना',
      ],
      exp: 'पठन वैकल्य (डिस्लेक्सिया) में बहुसंवेदी साधन और वैकल्पिक आकलन समान अधिगम अवसर सुनिश्चित करते हैं।',
    },
  },
  {
    topic: 'Heredity and Environment Interaction',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Why do contemporary developmental psychologists describe a child’s cognitive growth as an "interaction" between heredity and environment rather than a strict sum?',
      opts: [
        'Genetic potential unfolds dynamically through the quality of nutrition, affection, language exposure, and schooling',
        'Heredity decides adult intelligence completely before birth regardless of schooling',
        'Environment alone shapes eye colour and blood group independently of DNA',
        'Genetic factors vanish completely once formal schooling begins at age six',
      ],
      exp: 'Development arises from continuous multiplicative interplay (epigenetic interaction) between biological inheritance and lived environment.',
    },
    mr: {
      q: 'आधुनिक मानसशास्त्रज्ञ बालकाच्या बोधात्मक विकासाला अनुवंश व परिस्थिती यांची निव्वळ बेरीज न मानता "आंतरक्रिया" का म्हणतात?',
      opts: [
        'अनुवंशिक क्षमता पोषण, स्नेह, भाषिक समृद्धी आणि शालेय संधींच्या गुणवत्तेनुसारच विकसित होतात',
        'जन्मापूर्वीच अनुवंशामुळे आयुष्यभराची बुद्धिमत्ता कायमची ठरलेली असते',
        'परिस्थितीमुळे रक्तगट व डोळ्यांचा रंग अनुवंशाशिवाय बदलतो',
        'वयाच्या सहाव्या वर्षी शाळा सुरू होताच अनुवंशाचा प्रभाव शून्य होतो',
      ],
      exp: 'विकास हा अनुवंशिक शक्यता आणि पर्यावरणीय पोषण यांच्या परस्पर पूरक आंतरक्रियेचा परिणाम असतो.',
    },
    hi: {
      q: 'समकालीन मनोवैज्ञानिक संज्ञानात्मक विकास को आनुवंशिकता और वातावरण का "अंतःक्रियात्मक परिणाम" क्यों मानते हैं?',
      opts: [
        'आनुवंशिक संभावनाएँ पोषण, स्नेह, भाषायी परिवेश और विद्यालयी अवसरों की गुणवत्ता से ही पल्लवित होती हैं',
        'जन्म से पहले ही आनुवंशिकता बिना शिक्षा के अंतिम क्षमता तय कर देती है',
        'वातावरण अकेले रक्त समूह और आँखों का रंग तय करता है',
        'छह वर्ष की आयु के बाद आनुवंशिक प्रभाव पूरी तरह समाप्त हो जाता है',
      ],
      exp: 'मानव विकास जैविक क्षमता (प्रकृति) और सामाजिक-शैक्षिक अनुभव (पोषण) की निरंतर अंतःक्रिया से होता है।',
    },
  },
  {
    topic: 'Primary Socialization Agency',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which social institution functions as the primary agency of socialization for a young child before school entry?',
      opts: [
        'The family and immediate caregivers',
        'District municipal administration',
        'Public examination boards',
        'Television commercial advertising',
      ],
      exp: 'Family is the primary socializing agent transmitting early language, emotional security, habits, and cultural norms.',
    },
    mr: {
      q: 'शाळाप्रवेशापूर्वी लहान बालकाच्या सामाजीकरणाचे प्राथमिक केंद्र कोणते मानले जाते?',
      opts: [
        'कुटुंब व जवळचे संगोपनकर्ते',
        'जिल्हा महानगरपालिका प्रशासन',
        'सार्वजनिक परीक्षा मंडळ',
        'दूरदर्शनवरील जाहिराती',
      ],
      exp: 'कुटुंब हे बालकाच्या सामाजीकरणाचे पहिले व सर्वाधिक प्रभावी प्राथमिक माध्यम असते.',
    },
    hi: {
      q: 'विद्यालय प्रवेश से पूर्व छोटे बालक के समाजीकरण की प्राथमिक संस्था कौन-सी होती है?',
      opts: [
        'परिवार एवं निकटतम देखभालकर्ता',
        'जिला प्रशासन कार्यालय',
        'सार्वजनिक परीक्षा बोर्ड',
        'वाणिज्यिक विज्ञापन माध्यम',
      ],
      exp: 'परिवार प्राथमिक समाजीकरण का केंद्र है जो भाषा, मूल्य, आदतें और भावनात्मक सुरक्षा प्रदान करता है।',
    },
  },
  {
    topic: 'Assessment FOR Learning Tools',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Which classroom practice best exemplifies "Assessment FOR Learning" (formative evaluation) in Class 5?',
      opts: [
        'Collecting student work samples in a portfolio and holding descriptive feedback conferences to guide next steps',
        'Ranking learners 1st to 40th based on a single March final paper',
        'Announcing surprise Friday tests with public humiliation for low scores',
        'Awarding bonus marks solely for neat handwriting margins',
      ],
      exp: 'Assessment FOR learning takes place continuously during instruction to diagnose gaps and steer improvement.',
    },
    mr: {
      q: 'इयत्ता पाचवीच्या वर्गात "अध्ययनासाठी मूल्यमापन" (Assessment FOR Learning) याचे सर्वोत्तम उदाहरण कोणते?',
      opts: [
        'विद्यार्थ्यांच्या कामांचे पोर्टफोलिओ जतन करून पुढील सुधारणेसाठी मार्गदर्शक अभिप्राय देणे',
        'मार्चमधील वार्षिक परीक्षेवरून वर्गात १ ते ४० क्रमांक जाहीर करणे',
        'अचानक चाचणी घेऊन कमी गुणांवर वर्गासमोर टीका करणे',
        'फक्त समास आखणीसाठी जादा गुण देणे',
      ],
      exp: 'शिकण्याच्या प्रक्रियेत सुधारणा घडवून आणणारे आकारिक मूल्यमापन म्हणजे Assessment FOR Learning होय.',
    },
    hi: {
      q: 'कक्षा ५ में "अधिगम के लिए आकलन" (Assessment FOR Learning) का सर्वोत्तम उदाहरण क्या है?',
      opts: [
        'पोर्टफोलियो में कार्य-नमूने संकलित कर सुधार हेतु वर्णनात्मक प्रतिपुष्टि व मार्गदर्शन देना',
        'वार्षिक परीक्षा के आधार पर १ से ४० तक रैंक सूची लगाना',
        'अचानक परीक्षा लेकर कम अंक वालों को सार्वजनिक रूप से डांटना',
        'केवल हाशिया खींचने पर अतिरिक्त अंक देना',
      ],
      exp: 'अधिगम के लिए आकलन शिक्षण-प्रक्रिया के दौरान कमियों की पहचान और सुधार का मार्ग दिखाता है।',
    },
  },
  {
    topic: 'Howard Gardner Multiple Intelligences',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In an EVS lesson on river landforms, students sculpt clay topography and enact how monsoon water carves valleys. Which two Gardner intelligences are engaged together?',
      opts: [
        'Spatial intelligence and Bodily-Kinesthetic intelligence',
        'Linguistic intelligence and Intrapersonal intelligence only',
        'Musical intelligence and Existential intelligence only',
        'Logical-Mathematical deduction only',
      ],
      exp: '3D clay terrain shaping exercises Spatial intelligence while physical movement/role-play engages Bodily-Kinesthetic intelligence.',
    },
    mr: {
      q: 'नदीच्या भूरूपांच्या पाठात विद्यार्थी चिकणमातीतून दऱ्याखोऱ्यांची प्रतिकृती घडवतात व पाण्याचा प्रवाहमार्ग नाट्यरूपाने दाखवतात. गार्डनरच्या कोणत्या दोन बुद्धिमत्ता येथे वापरल्या गेल्या?',
      opts: [
        'अवकाशीय (Spatial) आणि शारीरिक-गतिज (Bodily-Kinesthetic) बुद्धिमत्ता',
        'फक्त भाषिक व आंतर-वैयक्तिक बुद्धिमत्ता',
        'फक्त सांगितिक बुद्धिमत्ता',
        'केवळ तार्किक-गणितीय बुद्धिमत्ता',
      ],
      exp: 'त्रिमितीय मॉडेल घडवण्यात अवकाशीय तर प्रत्यक्ष अभिनयात शारीरिक-गतिज बुद्धिमत्तेचा विकास होतो.',
    },
    hi: {
      q: 'नदी भू-आकृति पाठ में विद्यार्थी मिट्टी का त्रि-आयामी मॉडल बनाते हैं और जल-प्रवाह का अभिनय करते हैं। गार्डनर की किन दो बुद्धियों का समन्वय हुआ है?',
      opts: [
        'स्थानिक (Spatial) और शारीरिक-गतिक (Bodily-Kinesthetic) बुद्धि',
        'केवल भाषायी और अंतःवैयक्तिक बुद्धि',
        'केवल संगीतमय बुद्धि',
        'केवल तार्किक-गणितीय बुद्धि',
      ],
      exp: 'मॉडल निर्माण स्थानिक बुद्धि को और नाटकीय गतिविधि शारीरिक-गतिक बुद्धि को सक्रिय करती है।',
    },
  },
  {
    topic: 'Gender Equity in Primary Classroom',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'While forming school committees, a teacher consistently names boys as "Science Lab Monitors" and girls as "Guest Welcome Ushers". What instructional error is the teacher making?',
      opts: [
        'Reinforcing traditional gender stereotypes that narrow learners’ aspirations',
        'Applying developmentally appropriate cognitive differentiation',
        'Practicing democratic participatory leadership',
        'Fulfilling RTE 2009 gender-parity standards',
      ],
      exp: 'Assigning leadership vs hospitality roles by sex reinforces harmful gender bias; responsibilities should rotate across all children.',
    },
    mr: {
      q: 'शाळेतील समित्या नेमताना शिक्षक नेहमी मुलांना "विज्ञान प्रयोगशाळा प्रमुख" आणि मुलींना "पाहुणे स्वागत कक्ष" देतात. शिक्षकांची कोणती चूक येथे दिसते?',
      opts: [
        'पारंपरिक लिंगभाव साचेबद्धतेला (Gender Stereotype) खतपाणी घालणे',
        'योग्य विकासात्मक भेदभाव पाळणे',
        'लोकशाही नेतृत्व कौशल्य विकसित करणे',
        'बालहक्क कायद्याची अंमलबजावणी करणे',
      ],
      exp: 'जबाबदाऱ्या लिंगानुसार वाटून देणे पूर्वग्रह वाढवते; प्रत्येक विद्यार्थ्यास सर्व भूमिकांची समान संधी मिळावी.',
    },
    hi: {
      q: 'विद्यालय समितियाँ बनाते समय शिक्षक सदैव लड़कों को "विज्ञान प्रयोगशाला प्रमुख" और लड़कियों को "स्वागत दल" सौंपते हैं। यह व्यवहार क्या दर्शाता है?',
      opts: [
        'लैंगिक रूढ़िवादिता को बढ़ावा देना जो विद्यार्थियों के अवसर सीमित करता है',
        'उचित विकासात्मक विभेदीकरण करना',
        'लोकतांत्रिक नेतृत्व विकसित करना',
        'आरटीई मानकों का पालन करना',
      ],
      exp: 'लिंग के आधार पर भूमिकाएँ तय करना रूढ़िवादी पक्षपात है; सभी कार्य सभी छात्रों में समान रूप से बँटने चाहिए।',
    },
  },
  {
    topic: 'RTE Act 2009 Prohibition of Punishment',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which provision is explicitly mandated under Section 17 of the Right to Education (RTE) Act, 2009?',
      opts: [
        'Complete prohibition of physical punishment and mental harassment of any child',
        'Mandatory detention of Class 3 learners failing spelling dictation',
        'Charging refundable admission security deposits in government schools',
        'Requiring parent income interviews before Class 1 enrolment',
      ],
      exp: 'Section 17 of RTE Act 2009 strictly prohibits corporal punishment and mental harassment; Sections 13 and 16 prohibit screening and expulsion.',
    },
    mr: {
      q: 'शिक्षण हक्क कायदा (RTE Act 2009) कलम १७ अन्वये कोणती तरतूद स्पष्टपणे बंधनकारक आहे?',
      opts: [
        'कोणत्याही बालकाला शारीरिक शिक्षा व मानसिक छळ करण्यास पूर्ण बंदी',
        'इयत्ता तिसरीच्या शुद्धलेखनात नापास झालेल्या विद्यार्थ्याला नापास ठेवणे',
        'शासकीय शाळांमध्ये प्रवेश अनामत रक्कम घेणे',
        'इयत्ता पहिलीच्या प्रवेशासाठी पालकांची मुलाखत घेणे',
      ],
      exp: 'RTE कायद्याच्या कलम १७ नुसार शारीरिक शिक्षा व मानसिक त्रास देणे कायदेशीर गुन्हा आहे.',
    },
    hi: {
      q: 'शिक्षा का अधिकार अधिनियम (RTE Act 2009) की धारा १७ के अंतर्गत कौन-सा प्रावधान स्पष्ट रूप से अनिवार्य है?',
      opts: [
        'किसी भी बालक को शारीरिक दंड और मानसिक प्रताड़ना का पूर्ण निषेध',
        'कक्षा ३ में श्रुतलेख अनुत्तीर्ण छात्रों को रोकना',
        'सरकारी विद्यालयों में प्रवेश सुरक्षा शुल्क लेना',
        'कक्षा १ के प्रवेश से पूर्व माता-पिता का साक्षात्कार लेना',
      ],
      exp: 'आरटीई अधिनियम की धारा १७ के तहत शारीरिक दंड और मानसिक उत्पीड़न पूरी तरह वर्जित है।',
    },
  },
  {
    topic: 'Constructivist Error Analysis',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'From a constructivist perspective (NCF 2005), how should a primary teacher interpret repeated conceptual errors in student notebooks?',
      opts: [
        'As valuable windows into children’s current mental schemas and alternative reasoning',
        'As proof of hereditary intellectual deficit',
        'As deliberate indiscipline warranting deduction of conduct grades',
        'As reasons to speed through the syllabus without discussion',
      ],
      exp: 'Errors reveal systematic patterns in a learner’s thinking, helping teachers design targeted conceptual bridges.',
    },
    mr: {
      q: 'ज्ञानरचनावादी दृष्टिकोनातून (NCF 2005) प्राथमिक शिक्षकाने विद्यार्थ्यांच्या वह्यांतील सातत्यपूर्ण संकल्पनात्मक चुकांकडे कसे पाहावे?',
      opts: [
        'मुलांच्या विचारप्रक्रियेतील सद्य आकलन व तर्कपद्धती समजून घेण्याची मौल्यवान संधी म्हणून',
        'अनुवंशिक बौद्धिक कमतरतेचा पुरावा म्हणून',
        'मुद्दाम केलेल्या बेशिस्तीचे लक्षण म्हणून',
        'चर्चा न करता अभ्यासक्रम वेगाने संपवण्याचे कारण म्हणून',
      ],
      exp: 'विद्यार्थ्यांच्या चुका त्यांच्या विचार करण्याची पद्धत दर्शवतात; त्यामुळे योग्य उपचारात्मक अध्यापन करता येते.',
    },
    hi: {
      q: 'संरचनावादी दृष्टिकोण (NCF 2005) के अनुसार प्राथमिक शिक्षक को विद्यार्थियों की अवधारणात्मक त्रुटियों को किस रूप में देखना चाहिए?',
      opts: [
        'बच्चों की वर्तमान मानसिक संरचना और तर्क-प्रणाली को समझने की महत्वपूर्ण खिड़की के रूप में',
        'स्थायी बौद्धिक अक्षमता के प्रमाण के रूप में',
        'जानबूझकर की गई अनुशासनहीनता के रूप में',
        'बिना चर्चा के पाठ्यक्रम तेज़ी से आगे बढ़ाने के संकेत के रूप में',
      ],
      exp: 'त्रुटियाँ अधिगम प्रक्रिया का स्वाभाविक हिस्सा हैं और शिक्षक को बच्चों की सोच समझने में मदद करती हैं।',
    },
  },
  {
    topic: 'Vygotsky Private Speech',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'While assembling a wooden tangram puzzle alone, seven-year-old Kabir softly talks aloud to himself ("Put the big triangle here first..."). How does Vygotsky explain this behaviour?',
      opts: [
        'Private speech used to self-regulate attention and plan problem-solving steps',
        'Immature social isolation unrelated to cognition',
        'Autistic echolalia needing clinical suppression',
        'Auditory processing impairment during play',
      ],
      exp: 'For Vygotsky, private speech serves as a vital self-regulatory tool before internalizing into silent inner thought.',
    },
    mr: {
      q: 'सात वर्षांचा कबीर टॅनग्रॅम कोडे एकटा सोडवताना स्वतःशीच हळू आवाजात बोलतो ("आधी हा मोठा त्रिकोण इथे ठेवू..."). वायगॉत्स्की या वर्तनाचे स्पष्टीकरण कसे देतात?',
      opts: [
        'स्व-नियमन (Self-regulation) आणि कृतीचे नियोजन करण्यासाठी वापरलेली खाजगी भाषा (Private Speech)',
        'विचाराशी काहीही संबंध नसलेला अपरिपक्व एकटेपणा',
        'दडपून टाकण्यायोग्य भाषिक दोष',
        'खेळताना होणारा श्रवणविकार',
      ],
      exp: 'वायगॉत्स्कीच्या मते स्वतःशी बोलणे (Private Speech) बालकाला स्वतःचे वर्तन व विचार नियंत्रित करण्यास मदत करते.',
    },
    hi: {
      q: 'सात वर्षीय कबीर अकेले टैनग्राम पहेली जोड़ते समय स्वयं से धीरे-धीरे बातें करता है ("पहले बड़ा त्रिभुज यहाँ रखूँ...")। वाइगोत्स्की इस व्यवहार की व्याख्या कैसे करते हैं?',
      opts: [
        'ध्यान केंद्रित करने और समस्या-समाधान के नियोजन हेतु स्व-नियमनकारी निजी वाक् (Private Speech)',
        'संज्ञान से असंबंधित असामाजिक आदत',
        'दबाए जाने योग्य भाषायी विकार',
        'खेल के दौरान श्रवण बाधा',
      ],
      exp: 'वाइगोत्स्की के अनुसार निजी वाक् आत्म-निर्देशन का महत्वपूर्ण साधन है जो बाद में आंतरिक विचार बन जाता है।',
    },
  },
  {
    topic: 'Piaget Assimilation vs Accommodation',
    pattern: 'Analytical',
    difficulty: 'Difficult',
    en: {
      q: 'A child calls a zebra a "horse" at first, then learns from her parent to create a distinct mental category for wild striped equids. Updating her schema illustrates:',
      opts: [
        'Accommodation (modifying an existing cognitive structure for new experience)',
        'Pure assimilation without cognitive change',
        'Operant extinction through negative reinforcement',
        'Centration on a single perceptual dimension',
      ],
      exp: 'Assimilation fits new data into an existing schema ("horse"); Accommodation revises or creates a new schema ("zebra") to restore equilibrium.',
    },
    mr: {
      q: 'एक लहान मूल झेब्र्याला प्रथम "घोडा" म्हणते, पण पालकांनी पट्टे व जंगली स्वरूप समजावून सांगितल्यावर ते झेब्र्यासाठी वेगळा मानसिक आकृतीबंध तयार करते. याला पियाजे काय म्हणतात?',
      opts: [
        'समायोजन (Accommodation – नवीन अनुभवानुसार पूर्वीच्या ज्ञानरचनेत बदल करणे)',
        'कोणत्याही बदलाशिवाय निव्वळ आत्मसात करणे',
        'नकारात्मक प्रबलनामुळे विलोपन',
        'एकाच वैशिष्ट्यावर केंद्रीकरण',
      ],
      exp: 'नवीन माहिती सामावून घेण्यासाठी विद्यमान स्कीमामध्ये बदल करणे किंवा नवा स्कीमा घडवणे म्हणजे समायोजन (Accommodation).',
    },
    hi: {
      q: 'एक बच्चा पहले ज़ेबरा को "घोड़ा" कहता है, फिर अंतर समझकर धारीदार वन्य पशु के लिए नई मानसिक श्रेणी बनाता है। यह प्रक्रिया पियाजे के अनुसार क्या है?',
      opts: [
        'समायोजन (Accommodation – नए अनुभव हेतु पूर्व स्कीमा में संशोधन करना)',
        'बिना मानसिक परिवर्तन के केवल आत्मसातीकरण',
        'नकारात्मक पुनर्बलन द्वारा विलोपन',
        'एक ही विशेषता पर केंद्रीकरण',
      ],
      exp: 'नए तथ्य के अनुसार पूर्व मानसिक संरचना (स्कीमा) को बदलना या नया बनाना समायोजन कहलाता है।',
    },
  },
  {
    topic: 'Proximodistal Principle',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why can a Class 1 child swing the whole arm freely to draw big circles on a slate well before holding a thin pencil between thumb and forefinger for neat cursive letters?',
      opts: [
        'Proximodistal growth moves motor control from the central torso/shoulders outward to fine finger joints',
        'Visual acuity develops solely after age nine',
        'Fine motor nerves form prior to spinal column muscles',
        'Left-to-right writing reverses muscular symmetry',
      ],
      exp: 'Proximodistal development progresses from the body’s center outward—shoulder/arm gross control precedes fine wrist/finger precision.',
    },
    mr: {
      q: 'पहिलीतील मूल पाटीवर पूर्ण हात फिरवून मोठी वर्तुळे सहज काढू शकते, पण अंगठा व बोटांत बारीक पेन्सिल धरून छोटे अक्षर काढायला नंतर शिकते. हा कोणता विकास नियम आहे?',
      opts: [
        'मध्य-बाह्य सिद्धांत (Proximodistal – खांद्याकडून बोटांच्या टोकाकडे नियंत्रण)',
        'दृष्टीक्षमता केवळ नऊ वर्षांनंतरच विकसित होते',
        'सूक्ष्म कारक स्नायू आधी आणि पाठीचा कणा नंतर विकसित होतो',
        'डावीकडून उजवीकडे लिहिण्यामुळे स्नायू उलटे होतात',
      ],
      exp: 'प्रॉक्सिमोडिस्टल तत्त्वानुसार शरीराच्या मध्यभागापासून (खांदा, बाहू) बाहेरील टोकांकडे (बोटे) नियंत्रण विकसित होते.',
    },
    hi: {
      q: 'कक्षा १ का बच्चा स्लेट पर पूरा हाथ घुमाकर बड़ा गोला आसानी से बना लेता है, पर उँगलियों से बारीक अक्षर लिखना बाद में सीखता है। यह किस विकास नियम के कारण है?',
      opts: [
        'समीप-दूराभिमुख क्रम (Proximodistal – केंद्र/कंधे से उँगलियों की ओर नियंत्रण)',
        'दृष्टि क्षमता नौ वर्ष बाद ही शुरू होती है',
        'सूक्ष्म पेशियाँ रीढ़ से पहले विकसित होती हैं',
        'बाएँ से दाएँ लिखने पर दिशा बदलती है',
      ],
      exp: 'समीप-दूराभिमुख विकास शरीर के केंद्र से बाहर की ओर (स्थूल बाहु गति से सूक्ष्म उँगली नियंत्रण तक) बढ़ता है।',
    },
  },
  {
    topic: 'NEP 2020 5+3+3+4 Foundational Stage',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Under the NEP 2020 5+3+3+4 curricular structure, which grades constitute the "Foundational Stage" for ages 3 to 8?',
      opts: [
        '3 years of Balvatika/Anganwadi pre-school plus Classes 1 and 2',
        'Classes 1 to 5 exclusively',
        'Classes 3 to 5 preparatory schooling only',
        'Classes 6 to 8 middle schooling',
      ],
      exp: 'NEP 2020 anchors ages 3–8 in a 5-year Foundational Stage: 3 pre-primary years (Balvatika) + Grades 1 and 2.',
    },
    mr: {
      q: 'राष्ट्रीय शैक्षणिक धोरण (NEP 2020) च्या ५+३+३+४ आराखड्यात वय ३ ते ८ वर्षांचा "पायाभूत स्तर" (Foundational Stage) कोणत्या वर्गांचा बनलेला आहे?',
      opts: [
        'बालवाटिका/अंगणवाडीची ३ वर्षे आणि इयत्ता १ ली व २ री',
        'फक्त इयत्ता १ ली ते ५ वी',
        'फक्त इयत्ता ३ री ते ५ वी',
        'इयत्ता ६ वी ते ८ वी',
      ],
      exp: 'NEP 2020 मध्ये ३ ते ८ वयोगटातील ५ वर्षांचा पायाभूत स्तर म्हणजे ३ वर्षे पूर्वप्राथमिक (बालवाटिका) + इयत्ता पहिली व दुसरी.',
    },
    hi: {
      q: 'NEP 2020 की ५+३+३+४ संरचना में ३ से ८ वर्ष आयु वर्ग का "बुनियादी चरण" (Foundational Stage) किन कक्षाओं से मिलकर बनता है?',
      opts: [
        '३ वर्ष की बालवाटिका/आँगनवाड़ी तथा कक्षा १ और कक्षा २',
        'केवल कक्षा १ से ५ तक',
        'केवल कक्षा ३ से ५ का प्रारंभिक चरण',
        'कक्षा ६ से ८ का मध्य चरण',
      ],
      exp: 'बुनियादी चरण में ३ वर्ष पूर्व-प्राथमिक (बालवाटिका) और कक्षा १-२ सम्मिलित हैं।',
    },
  },
  {
    topic: 'Dyscalculia Support',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 3 learner reads history stories eagerly yet mixes up + and × signs, forgets number sequences, and cannot judge whether 19 or 91 is larger. Which condition and support fit best?',
      opts: [
        'Dyscalculia; provide tactile number lines, Dienes blocks, colour-coded operation cues, and extra time',
        'Dysgraphia; require copying multiplication tables twenty times silently',
        'Conduct disorder; suspend from mathematics periods',
        'Speech apraxia; switch to silent reading homework only',
      ],
      exp: 'Persistent difficulty with number sense, quantity magnitude, and arithmetic symbols indicates dyscalculia; concrete manipulatives bridge understanding.',
    },
    mr: {
      q: 'इयत्ता तिसरीतील विद्यार्थी गोष्टी आवडीने वाचतो, पण + आणि × चिन्हांत गोंधळ करतो आणि १९ व ९१ मधील मोठी संख्या ओळखू शकत नाही. ही कोणती अडचण व उपाय आहे?',
      opts: [
        'डिस्कॅल्क्युलिया (गणितीय अक्षमता); संख्यारेषा, मण्यांच्या माळा, रंगीत चिन्हे व अतिरिक्त वेळ देणे',
        'डिसग्राफिया; पाढे वीस वेळा लिहून आणायला सांगणे',
        'वर्तन दोष; गणित तासातून बाहेर काढणे',
        'वाचादोष; फक्त मूक वाचनाचा गृहपाठ देणे',
      ],
      exp: 'संख्याज्ञान व गणितीय क्रियांतील अडचणीस डिस्कॅल्क्युलिया म्हणतात; मूर्त शैक्षणिक साधने येथे प्रभावी ठरतात.',
    },
    hi: {
      q: 'कक्षा ३ का छात्र कहानियाँ मन से पढ़ता है पर + व × चिह्नों में भ्रम करता है और १९ व ९१ की तुलना नहीं कर पाता। कौन-सी स्थिति और सहायता उपयुक्त है?',
      opts: [
        'डिस्कैल्कुलिया (गणितीय वैकल्य); संख्या रेखा, गिनतारा, रंग-संकेत व अतिरिक्त समय देना',
        'डिस्ग्राफिया; पहाड़े बीस बार लिखवाना',
        'आचरण विकार; गणित कक्षा से बाहर करना',
        'वाक् विकार; केवल मौन पठन देना',
      ],
      exp: 'संख्या-बोध एवं संक्रियात्मक कठिनाई डिस्कैल्कुलिया कहलाती है, जिसे ठोस शिक्षण सहायक सामग्री से सुगम बनाया जाता है।',
    },
  },
  {
    topic: 'John Dewey Progressive Education',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'According to John Dewey’s philosophy of progressive education, what role should a primary school classroom fulfill?',
      opts: [
        'A miniature democratic community where children learn actively through purposeful inquiry and shared projects',
        'A silent auditorium where passive pupils transcribe teacher lectures verbatim',
        'A competitive sorting factory ranking learners strictly for industrial jobs',
        'A textbook warehouse isolated from everyday community life',
      ],
      exp: 'Dewey conceived schools as democratic laboratories rooted in experiential "learning by doing" and social cooperation.',
    },
    mr: {
      q: 'जॉन ड्यूई यांच्या पुरोगामी शिक्षण तत्त्वज्ञानानुसार (Progressive Education) प्राथमिक शाळेची भूमिका कशी असावी?',
      opts: [
        'मुले कृतियुक्त शोध व सामूहिक प्रकल्पांतून शिकतील असा छोटा लोकशाही समाज',
        'शिक्षकांचे भाषण शांतपणे लिहून घेणारे निस्तब्ध सभागृह',
        'केवळ क्रमवारी लावणारा स्पर्धात्मक कारखाना',
        'सामाजिक जीवनाशी संबंध नसलेले पाठ्यपुस्तक गोदाम',
      ],
      exp: 'जॉन ड्यूई यांनी "कृतीद्वारे शिक्षण" आणि शाळेचे छोटे लोकशाही समाजस्वरूप मांडले.',
    },
    hi: {
      q: 'जॉन ड्यूई के प्रगतिशील शिक्षा दर्शन के अनुसार प्राथमिक विद्यालय को किस रूप में कार्य करना चाहिए?',
      opts: [
        'एक लघु लोकतांत्रिक समुदाय जहाँ बच्चे सार्थक अन्वेषण और सामूहिक परियोजनाओं से सक्रिय सीखें',
        'एक शांत सभागार जहाँ बच्चे केवल व्याख्यान उतारें',
        'अंकों के आधार पर छात्रों को छांटने वाली प्रतिस्पर्धी फैक्ट्री',
        'सामुदायिक जीवन से कटा हुआ पाठ्यपुस्तक भंडार',
      ],
      exp: 'ड्यूई के अनुसार विद्यालय लोकतंत्र की प्रयोगशाला है जहाँ "करके सीखना" प्रमुख होता है।',
    },
  },
  {
    topic: 'Maslow Hierarchy & Classroom Readiness',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'A Class 2 pupil arrives drowsy and unfocused every morning because his household skips breakfast. Applying Abraham Maslow’s hierarchy of needs, what should precede academic drilling?',
      opts: [
        'Connecting the child immediately with the school Mid-Day Meal / morning nutrition support',
        'Assigning extra arithmetic worksheets to wake the student up',
        'Penalizing low test scores in parent-teacher meetings',
        'Expecting abstract self-actualization projects immediately',
      ],
      exp: 'Maslow’s physiological and safety deficiency needs must be met before higher cognitive curiosity and achievement can flourish.',
    },
    mr: {
      q: 'इयत्ता दुसरीतील एक मुलगा घरी सकाळी न्याहारी न मिळाल्यामुळे वर्गात थकलेला व अस्वस्थ राहतो. अब्राहम मॅस्लो यांच्या गरजांच्या श्रेणीसिद्धांतानुसार प्रथम काय करावे?',
      opts: [
        'शालेय पोषण आहार / सकाळच्या पोषक आहाराची तात्काळ व्यवस्था करणे',
        'लक्ष टिकवण्यासाठी अधिक गणिताची उदाहरणे देणे',
        'पालक सभेत कमी गुणांबद्दल तक्रार करणे',
        'थेट आत्म-साक्षात्काराचे कठीण प्रकल्प देणे',
      ],
      exp: 'मॅस्लोच्या मते भूक व सुरक्षितता या प्राथमिक शारीरिक गरजा पूर्ण झाल्याशिवाय उच्च बौद्धिक अध्ययन घडत नाही.',
    },
    hi: {
      q: 'कक्षा २ का एक बच्चा घर से बिना नाश्ता किए आने के कारण सुस्त व अनमना रहता है। अब्राहम मैस्लो के आवश्यकता पदानुक्रम के अनुसार पहले क्या आवश्यक है?',
      opts: [
        'बच्चे को मध्याह्न भोजन / प्रातःकालीन पोषण सहायता से तुरंत जोड़ना',
        'ध्यान बढ़ाने हेतु अतिरिक्त गणित पत्रक देना',
        'अभिभावक बैठक में कम अंकों की शिकायत करना',
        'उच्च स्तरीय आत्म-सिद्धि परियोजना देना',
      ],
      exp: 'मैस्लो के अनुसार भूख व सुरक्षा जैसी आधारभूत दैहिक आवश्यकताएँ पूरी होने पर ही संज्ञानात्मक रुचि जागृत होती है।',
    },
  },
  {
    topic: 'Attention Span & Task Design',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'In Classes 1 to 5, children’s sustained attention improves dramatically when a 40-minute lesson incorporates:',
      opts: [
        'Short varied segments blending visual stories, peer talk, hands-on manipulation, and brief movement breaks',
        'Forty uninterrupted minutes of single-tone chalk-board copying',
        'Constant threats of weekly elimination tests',
        'Silent reading of unillustrated university textbooks',
      ],
      exp: 'Primary learners thrive on multi-modal pacing (10–12 min activity shifts) matched to age-appropriate working memory span.',
    },
    mr: {
      q: 'इयत्ता १ ते ५ च्या विद्यार्थ्यांचे ४० मिनिटांच्या तासातील अवधान (Attention) सर्वोत्तम केव्हा टिकून राहते?',
      opts: [
        'चित्रकथा, गटसंवाद, हाताळण्याचे साहित्य आणि अल्प हालचाल यांचा समतोल १०-१२ मिनिटांच्या टप्प्यांत वापरल्यास',
        'सलग ४० मिनिटे फळ्यावरून उतरवून घेतल्यास',
        'दर आठवड्याला परीक्षेची भीती दाखवल्यास',
        'चित्रांशिवाय कठीण संदर्भग्रंथ मूकपणे वाचायला दिल्यास',
      ],
      exp: 'प्राथमिक वयोगटातील मुलांचे अवधान मर्यादित असल्याने विविध कृतियुक्त टप्पे अधिक परिणामकारक ठरतात.',
    },
    hi: {
      q: 'कक्षा १ से ५ के बच्चों का ४० मिनट के कालांश में ध्यान (Attention) कब सर्वाधिक प्रभावी ढंग से बना रहता है?',
      opts: [
        'जब पाठ में चित्रकथा, सहपाठी चर्चा, हस्त-गतिविधि और संक्षिप्त विराम छोटे-छोटे चरणों में शामिल हों',
        'लगातार ४० मिनट श्यामपट्ट से नकल उतारने पर',
        'साप्ताहिक परीक्षा के लगातार भय से',
        'बिना चित्रों वाली उच्च स्तरीय पुस्तक के मौन पठन से',
      ],
      exp: 'प्राथमिक स्तर पर बहु-संवेदी और विविधतापूर्ण छोटे शिक्षण खंड ध्यान केंद्रित रखने में सहायक होते हैं।',
    },
  },
  {
    topic: 'Bloom Taxonomy Cognitive Verbs',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: '"Design a three-step rainwater filter using pebbles, sand, and charcoal for our school tap." Which Bloom’s Revised Taxonomy cognitive level does this prompt target?',
      opts: [
        'Creating (highest-order synthesis)',
        'Remembering (verbatim recall)',
        'Passive perceptual recognition',
        'Habitual rote imitation',
      ],
      exp: 'Designing a novel functional solution reorganizes concepts into a new product, representing Bloom’s Creating level.',
    },
    mr: {
      q: '"शाळेतील नळासाठी वाळू, खडी आणि कोळसा वापरून तीन-स्तरीय पर्जन्यजल गाळणीचे नमुना आरेखन तयार करा." हा प्रश्न ब्लूमच्या वर्गीकरणातील कोणत्या पातळीवरचा आहे?',
      opts: [
        'निर्मिती (Creating – उच्चस्तरीय सर्जनशील पातळी)',
        'स्मरण (Remembering – केवळ पाठांतर)',
        'निष्क्रिय ओळख',
        'यांत्रिक अनुकरण',
      ],
      exp: 'नवीन रचना किंवा कार्यक्षम उपाय स्वतः तयार करणे हे ब्लूमच्या सुधारित वर्गीकरणातील सर्वोच्च "निर्मिती" पातळीत येते.',
    },
    hi: {
      q: '"विद्यालय के नल हेतु कंकड़, रेत और चारकोल से तीन-स्तरीय जल फिल्टर का डिज़ाइन तैयार कीजिए।" यह प्रश्न ब्लूम के संशोधित वर्गीकरण के किस स्तर का है?',
      opts: [
        'सृजन (Creating – उच्चतम संज्ञानात्मक स्तर)',
        'स्मरण (Remembering – रटंत दोहराव)',
        'निष्क्रिय पहचान',
        'यांत्रिक अनुकरण',
      ],
      exp: 'उपलब्ध ज्ञान को जोड़कर कोई नया मॉडल या समाधान निर्मित करना ब्लूम के "सृजन" स्तर को दर्शाता है।',
    },
  },
  {
    topic: 'ADHD Classroom Strategy',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Rohan, diagnosed with ADHD, leaves his seat frequently and struggles with multi-step directions. Which classroom adjustment helps him succeed without stigma?',
      opts: [
        'Break tasks into single clear checklists, seat him away from high-traffic distractions, and channel energy into structured helper roles',
        'Force him to stand motionless against the back wall for 30 minutes',
        'Assign twenty tasks at once orally without written cues',
        'Exclude him from group art and science activities',
      ],
      exp: 'Chunked step-by-step instructions, low-distraction seating, and purposeful movement channels support learners with ADHD constructively.',
    },
    mr: {
      q: 'ADHD असलेल्या रोहनला एका जागी शांत बसणे व एकाच वेळी अनेक सूचना लक्षात ठेवणे कठीण जाते. वर्गात कोणती सकारात्मक मदत उपयुक्त ठरेल?',
      opts: [
        'कामांचे छोटे स्पष्ट टप्पे करून यादी देणे, लक्ष विचलित न होणारी आसनव्यवस्था करणे आणि वर्गातील जबाबदारीची कृती सोपवणे',
        '३० मिनिटे वर्गाच्या मागे न हलता उभे राहण्याची शिक्षा देणे',
        'तोंडी वीस सूचना एकाच दमात देणे',
        'कला व विज्ञान गटउपक्रमांतून त्याला वगळणे',
      ],
      exp: 'छोट्या स्पष्ट पायऱ्या आणि रचनात्मक हालचालीची संधी ADHD विद्यार्थ्यांचे लक्ष टिकवण्यास मदत करते.',
    },
    hi: {
      q: 'ADHD से प्रभावित रोहन बार-बार सीट से उठता है और बहु-चरणीय निर्देश भूल जाता है। बिना हीनभावना के उसकी सहायता का श्रेष्ठ तरीका क्या है?',
      opts: [
        'कार्य को छोटे-छोटे स्पष्ट चरणों में बाँटना, शांत स्थान पर बैठाना और सकारात्मक सहायक भूमिका देना',
        '३० मिनट तक पीछे की दीवार के पास चुपचाप खड़ा रखना',
        'बिना लिखे एक साथ बीस मौखिक आदेश देना',
        'सामूहिक कला एवं विज्ञान गतिविधियों से वंचित करना',
      ],
      exp: 'चरणबद्ध सरल निर्देश और उद्देश्यपूर्ण गतिशीलता ADHD बच्चों के आत्म-नियंत्रण को सुगम बनाती है।',
    },
  },
  {
    topic: 'Intrinsic vs Extrinsic Motivation',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Which teacher comment develops intrinsic motivation and mastery orientation rather than fear of comparison?',
      opts: [
        '"Comparing two maps helped you spot why Konkan has more rivers—what else can you infer from the plateau map?"',
        '"Only the top two roll numbers can solve this geography riddle."',
        '"Finish the sheet fast if you want a chocolate bar."',
        '"Your low marks show you are careless."',
      ],
      exp: 'Specific strategy-focused feedback builds curiosity, autonomy, and self-efficacy—the core pillars of intrinsic motivation.',
    },
    mr: {
      q: 'तुलनेच्या भीतीऐवजी विद्यार्थ्यात आंतरिक प्रेरणा व प्राविण्य-अभिमुखता निर्माण करणारे शिक्षकांचे विधान कोणते?',
      opts: [
        '"दोन नकाशांची तुलना केल्यामुळे कोकणात जास्त नद्या का आहेत हे तू शोधलेस—पठारी नकाशावरून आणखी काय निष्कर्ष काढता येईल?"',
        '"हे कोडे फक्त पहिल्या दोन क्रमांकांची मुलेच सोडवू शकतात."',
        '"चॉकलेट हवे असेल तर पटापट स्वाध्याय लिहून दाखवा."',
        '"कमी गुणांवरून तुमचा निष्काळजीपणा दिसतो."',
      ],
      exp: 'प्रयत्न व कार्यनीतीची दाद दिल्यास विद्यार्थ्यात स्वतःहून शिकण्याची आंतरिक ओढ निर्माण होते.',
    },
    hi: {
      q: 'शिक्षक की कौन-सी टिप्पणी तुलना के भय के बजाय आंतरिक अभिप्रेरणा और दक्षता-भाव विकसित करती है?',
      opts: [
        '"दो मानचित्रों की तुलना से तुमने कोंकण की नदियों का कारण खोजा—पठारी मानचित्र से और क्या निष्कर्ष निकलेगा?"',
        '"यह पहेली केवल कक्षा के प्रथम दो छात्र ही हल कर सकते हैं।"',
        '"यदि चॉकलेट चाहिए तो तुरंत कार्य पूरा करो।"',
        '"तुम्हारे कम अंक लापरवाही दिखाते हैं।"',
      ],
      exp: 'सीखने की रणनीति और प्रयास की सराहना जिज्ञासा तथा आंतरिक अभिप्रेरणा को प्रबल करती है।',
    },
  },
  {
    topic: 'Divergent vs Convergent Thinking (Guilford)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which task in a primary classroom primarily nurtures J.P. Guilford’s "Divergent Thinking" (creativity)?',
      opts: [
        '"List as many innovative ways as possible to reuse old plastic bottles inside our school garden."',
        '"Name the capital city of Maharashtra."',
        '"Compute 48 × 5 using the standard algorithm."',
        '"State the date of Maharashtra Foundation Day."',
      ],
      exp: 'Divergent thinking generates multiple fluent, flexible, and original possibilities rather than one single predetermined answer.',
    },
    mr: {
      q: 'प्राथमिक वर्गात जे.पी. गिलफोर्ड यांच्या "अपसारी विचारप्रक्रियेला" (Divergent Thinking / सर्जनशीलता) चालना देणारा प्रश्न कोणता?',
      opts: [
        '"शाळेच्या बागेत जुन्या प्लॅस्टिक बाटल्यांचा पुनर्वापर करण्याचे अधिकाधिक नाविन्यपूर्ण मार्ग सुचवा."',
        '"महाराष्ट्राच्या राजधानीचे शहर कोणते?"',
        '"प्रमाणबद्ध पद्धतीने ४८ × ५ गुणाकार करा."',
        '"महाराष्ट्र दिन कोणत्या तारखेला साजरा होतो?"',
      ],
      exp: 'ज्या प्रश्नातून अनेक नवीन व वैविध्यपूर्ण कल्पना सुचतात त्याला अपसारी विचारप्रक्रिया म्हणतात.',
    },
    hi: {
      q: 'प्राथमिक कक्षा में जे.पी. गिलफोर्ड के "अपसारी चिंतन" (Divergent Thinking) को पोषित करने वाला कार्य कौन-सा है?',
      opts: [
        '"विद्यालय उद्यान में पुरानी प्लास्टिक बोतलों के पुनः उपयोग के जितने संभव हों उतने नवीन उपाय सुझाइए।"',
        '"महाराष्ट्र की राजधानी का नाम लिखिए।"',
        '"मानक विधि से ४८ × ५ की गणना कीजिए।"',
        '"महाराष्ट्र स्थापना दिवस की तिथि बताइए।"',
      ],
      exp: 'अपसारी चिंतन में एक निश्चित उत्तर के बजाय अनेक मौलिक और लचीले विचारों का सृजन होता है।',
    },
  },
  {
    topic: 'Bandura Observational Learning',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Students notice their teacher calmly apologizing when she accidentally skips a student’s turn and politely thanking the school helper. Soon peers imitate this courtesy. Which theory explains this?',
      opts: [
        'Albert Bandura’s Social Observational Learning (Modeling)',
        'Ivan Pavlov’s involuntary salivary conditioning',
        'Strict biological pre-programming',
        'Rote paired-associate memorization',
      ],
      exp: 'Bandura showed that children observe, attend to, retain, and reproduce behaviours modeled by respected adults.',
    },
    mr: {
      q: 'शिक्षिका चुकून एका विद्यार्थ्याचा क्रम राहिल्यास शांतपणे माफी मागतात आणि सेवक काकांचे आभार मानतात; लवकरच विद्यार्थीही हेच सौजन्य पाळू लागतात. हा कोणता अध्ययन सिद्धांत आहे?',
      opts: [
        'अल्बर्ट बंडुरा यांचा सामाजिक निरीक्षणात्मक अध्ययन सिद्धांत (Modeling)',
        'इव्हान पाव्हलॉव्ह यांचे अनैच्छिक अभिसंधान',
        'निव्वळ जैविक पूर्वनियोजन',
        'यांत्रिक पाठांतर पद्धती',
      ],
      exp: 'बंडुराच्या मते मुले आदरणीय व्यक्तींच्या वर्तनाचे निरीक्षण व अनुकरण करून सामाजिक वर्तन शिकतात.',
    },
    hi: {
      q: 'बच्चे देखते हैं कि शिक्षिका भूल होने पर विनम्रता से क्षमा माँगती हैं और सहायक को धन्यवाद देती हैं; शीघ्र ही बच्चे भी वैसा व्यवहार अपनाते हैं। यह किस सिद्धांत को दर्शाता है?',
      opts: [
        'अल्बर्ट बंडुरा का सामाजिक प्रेक्षणात्मक अधिगम (मॉडलिंग)',
        'पावलॉव का अनैच्छिक अनुबंधन',
        'पूर्णतः जैविक पूर्वनिर्धारण',
        'यांत्रिक रटंत स्मरण',
      ],
      exp: 'बंडुरा के अनुसार बच्चे आदर्श व्यक्तियों के व्यवहार का अवलोकन और अनुकरण करके सीखते हैं।',
    },
  },
  {
    topic: 'Bronfenbrenner Microsystem & Mesosystem',
    pattern: 'Analytical',
    difficulty: 'Difficult',
    en: {
      q: 'When parents and the Class 4 teacher collaborate monthly to align reading habits at home and school, which Bronfenbrenner ecological layer is strengthened?',
      opts: [
        'The Mesosystem (interconnections between immediate Microsystems)',
        'The Macrosystem alone (international trade treaties)',
        'The Exosystem solely (unrelated factory shifts)',
        'The Chronosystem solely (geological centuries)',
      ],
      exp: 'Bronfenbrenner’s Mesosystem consists of active linkages between two Microsystems directly experienced by the child (home and school).',
    },
    mr: {
      q: 'पालक व इयत्ता चौथीचे शिक्षक दरमहा संवाद साधून घरातील आणि शाळेतील वाचन सवयींत सुसंगती आणतात. ब्रॉन्फेनब्रेनरच्या परिसंस्थेतील कोणता स्तर येथे बळकट होतो?',
      opts: [
        'मेसोसिस्टम (Mesosystem – घर व शाळा या सूक्ष्म संस्थांमधील परस्पर दुवा)',
        'मॅक्रोसिस्टम (आंतरराष्ट्रीय व्यापार करार)',
        'एक्झोसिस्टम (मुलाशी अप्रत्यक्ष बाह्य व्यवस्था)',
        'क्रोनोसिस्टम (ऐतिहासिक शतके)',
      ],
      exp: 'बालकाच्या दोन थेट सूक्ष्म व्यवस्था (घर व शाळा) यांच्यातील सुसंवाद म्हणजे मेसोसिस्टम होय.',
    },
    hi: {
      q: 'जब अभिभावक और कक्षा ४ के शिक्षक मासिक समन्वय से घर व विद्यालय की पठन आदतों को जोड़ते हैं, तो ब्रॉन्फेनब्रेनर के किस पारिस्थितिक तंत्र को बल मिलता है?',
      opts: [
        'मध्यमंडल / मेसोसिस्टम (तात्कालिक सूक्ष्ममंडलों का परस्पर संबंध)',
        'केवल बृहतमंडल (अंतर्राष्ट्रीय व्यापार नीति)',
        'केवल बाह्यमंडल (अप्रत्यक्ष कार्यस्थल नियम)',
        'केवल कालमंडल (दीर्घकालीन युग)',
      ],
      exp: 'मेसोसिस्टम बालक के प्रत्यक्ष परिवेशों—जैसे परिवार और विद्यालय—के बीच सक्रिय संबंध को दर्शाता है।',
    },
  },
  {
    topic: 'RTE 2009 Primary Pupil-Teacher Ratio',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Under the Schedule of the RTE Act 2009 for primary classes (1 to 5), what is the prescribed minimum norm when total admitted children exceed 200?',
      opts: [
        'The Pupil-Teacher Ratio (excluding the head teacher) shall not exceed 40:1',
        'A single teacher handles up to 90 pupils across all grades',
        'The ratio is fixed at 15:1 strictly for all rural campuses',
        'Only part-time volunteer tutors are permitted',
      ],
      exp: 'RTE Schedule specifies up to 30:1 for primary schools generally and caps PTR (excluding head teacher) at 40:1 above 200 students.',
    },
    mr: {
      q: 'शिक्षण हक्क कायदा (RTE 2009) मधील अनुसूचीनुसार प्राथमिक स्तरावर (इ. १ ते ५) विद्यार्थी संख्या २०० पेक्षा जास्त झाल्यास शिक्षक-विद्यार्थी प्रमाण (मुख्याध्यापक सोडून) कितीपेक्षा जास्त नसावे?',
      opts: [
        '४०:१ पेक्षा जास्त असू नये',
        '९०:१ इतके असावे',
        'सर्व शाळांत कायम १५:१ असावे',
        'फक्त मानसेवी स्वयंसेवक नेमावेत',
      ],
      exp: 'RTE २००९ नुसार २०० पेक्षा अधिक पटसंख्येवर मुख्याध्यापकाव्यतिरिक्त शिक्षक-विद्यार्थी प्रमाण ४०:१ पेक्षा अधिक नसावे.',
    },
    hi: {
      q: 'RTE अधिनियम २००९ की अनुसूची के अनुसार प्राथमिक स्तर (कक्षा १–५) में कुल छात्र संख्या २०० से अधिक होने पर प्रधानाध्यापक को छोड़कर छात्र-शिक्षक अनुपात अधिकतम कितना होना चाहिए?',
      opts: [
        '४०:१ से अधिक नहीं होना चाहिए',
        '९०:१ होना चाहिए',
        'सदैव १५:१ अनिवार्य है',
        'केवल अंशकालिक स्वयंसेवक रखे जाने चाहिए',
      ],
      exp: 'आरटीई अनुसूची के तहत २०० से अधिक नामांकन पर छात्र-शिक्षक अनुपात (प्रधानाध्यापक अतिरिक्त) ४०:१ से अधिक नहीं होगा।',
    },
  },
  {
    topic: 'Holistic Progress Card (NEP 2020)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'What key transformation does NEP 2020 introduce through the 360-degree Holistic Progress Card (HPC)?',
      opts: [
        'Integrating self-assessment, peer feedback, and teacher observations across cognitive, affective, and psychomotor domains',
        'Replacing descriptive profiles with one annual percentage rank',
        'Evaluating students strictly by silent memory recall speed',
        'Eliminating teacher qualitative notes permanently',
      ],
      exp: 'HPC creates a multidimensional 360° profile blending teacher, peer, parent, and learner reflections.',
    },
    mr: {
      q: 'NEP 2020 अंतर्गत ३६०-अंशी समग्र प्रगती पत्रकाद्वारे (Holistic Progress Card) कोणता महत्त्वाचा बदल सुचवला आहे?',
      opts: [
        'बोधात्मक, भावात्मक व क्रियात्मक क्षेत्रांत स्व-मूल्यमापन, सहपाठी अभिप्राय व शिक्षक निरीक्षणांचा समावेश करणे',
        'वार्षिक टक्केवारी व क्रमांकावरच सर्व मूल्यमापन मर्यादित ठेवणे',
        'फक्त पाठांतराच्या वेगावरून श्रेणी ठरवणे',
        'शिक्षकांच्या गुणात्मक नोंदी कायमच्या बंद करणे',
      ],
      exp: 'समग्र प्रगती पत्रक (HPC) मध्ये विद्यार्थी, सहपाठी, पालक आणि शिक्षक यांचे बहुआयामी ३६०° अभिप्राय असतात.',
    },
    hi: {
      q: 'NEP 2020 के अंतर्गत ३६०-डिग्री समग्र प्रगति पत्रक (HPC) किस प्रमुख परिवर्तन को लागू करता है?',
      opts: [
        'संज्ञानात्मक, भावात्मक और मनोगत्यात्मक पक्षों में स्व-आकलन, सहपाठी प्रतिपुष्टि एवं शिक्षक अवलोकन का समन्वय',
        'केवल वार्षिक प्रतिशत अंकों द्वारा रैंक घोषित करना',
        'केवल मौन स्मरण गति से मूल्यांकन करना',
        'शिक्षक की वर्णनात्मक टिप्पणियाँ समाप्त करना',
      ],
      exp: 'समग्र प्रगति पत्रक विद्यार्थी के बहुआयामी विकास को ३६०-डिग्री दृष्टिकोण से दर्शाता है।',
    },
  },
  {
    topic: 'Metacognition in Upper Primary Readiness',
    pattern: 'Pedagogical',
    difficulty: 'Difficult',
    en: {
      q: 'When a Class 5 teacher asks students, "Which step in solving this word problem confused you, and how did you check your final answer?", she is fostering:',
      opts: [
        'Metacognition (awareness and regulation of one’s own thinking process)',
        'Classical stimulus-response conditioning',
        'Motor reflex automation',
        'Extrinsic rank anxiety',
      ],
      exp: 'Reflecting on one’s own comprehension and verification strategies is metacognition ("thinking about thinking").',
    },
    mr: {
      q: 'इयत्ता पाचवीच्या शिक्षिका विद्यार्थ्यांना विचारतात, "हे शाब्दिक उदाहरण सोडवताना कोणती पायरी तुला अवघड वाटली व उत्तर बरोबर असल्याची खात्री कशी केलीस?" येथे कशाचा विकास होत आहे?',
      opts: [
        'अधिबोध (Metacognition – स्वतःच्या विचारप्रक्रियेचे भान व नियमन)',
        'अभिजात उद्दीपक-प्रतिसाद अभिसंधान',
        'स्नायूंचे प्रतिक्षिप्त यांत्रिकीकरण',
        'क्रमांकाची बाह्य भीती',
      ],
      exp: 'आपण कसे शिकतो व चूक कुठे झाली याचा स्वतः विचार करणे म्हणजे अधिबोध (Metacognition) होय.',
    },
    hi: {
      q: 'कक्षा ५ की शिक्षिका पूछती हैं, "इबारती प्रश्न हल करते समय कौन-सा चरण कठिन लगा और तुमने उत्तर की जाँच कैसे की?" वे किस कौशल को विकसित कर रही हैं?',
      opts: [
        'परासंज्ञान / अधिसंज्ञान (Metacognition – अपनी ही चिंतन प्रक्रिया की समझ व नियमन)',
        'शास्त्रीय उद्दीपक-अनुक्रिया अनुबंधन',
        'पेशीय प्रतिवर्त यांत्रिकीकरण',
        'बाहरी रैंक की चिंता',
      ],
      exp: 'अपनी सीखने की रणनीति पर चिंतन व स्व-जाँच करने की क्षमता को परासंज्ञान (Metacognition) कहते हैं।',
    },
  },
  {
    topic: 'Erikson Industry vs Inferiority (6-11 yrs)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'According to Erik Erikson’s psychosocial stages, primary-school children (6–11 years) navigate "Industry vs Inferiority". How should teachers support healthy resolution?',
      opts: [
        'Provide meaningful, attainable classroom projects and recognize sincere effort and skill mastery',
        'Compare work loudly against older siblings to push perfection',
        'Give unachievably difficult tests in Week 1 to weed out slow learners',
        'Restrict all praise solely to neatness competitions',
      ],
      exp: 'Experiencing genuine competence in achievable tasks nurtures Eriksonian "Industry", whereas chronic public failure triggers "Inferiority".',
    },
    mr: {
      q: 'एरिक एरिक्सन यांच्या मनोसामाजिक टप्प्यानुसार प्राथमिक शाळेतील मुले (६–११ वर्षे) "उद्यमशीलता विरुद्ध न्यूनगंड" या अवस्थेत असतात. शिक्षकांनी यास सकारात्मक आधार कसा द्यावा?',
      opts: [
        'क्षमतेनुसार साध्य करता येणारे अर्थपूर्ण उपक्रम देऊन प्रामाणिक प्रयत्नांची व कौशल्यांची दाद देणे',
        'मोठ्या भावंडांशी सतत तुलना करून दबाव आणणे',
        'सुरुवातीलाच अतिशय कठीण चाचण्या देऊन नाउमेद करणे',
        'फक्त सुंदर हस्ताक्षर स्पर्धेतच कौतुक करणे',
      ],
      exp: 'योग्य मार्गदर्शनात कामे यशस्वी पूर्ण केल्यास मुलांत कार्यक्षमता व आत्मविश्वास (Industry) निर्माण होतो.',
    },
    hi: {
      q: 'एरिक एरिक्सन के अनुसार प्राथमिक आयु (६–११ वर्ष) में बच्चे "उद्यमशीलता बनाम हीनता" (Industry vs Inferiority) अवस्था में होते हैं। शिक्षक सकारात्मक समाधान कैसे करें?',
      opts: [
        'सार्थक व प्राप्त करने योग्य परियोजनाएँ देकर ईमानदार प्रयास एवं कौशल की सराहना करना',
        'बड़े भाई-बहनों से तुलना कर दबाव बनाना',
        'प्रथम सप्ताह में ही अत्यधिक कठिन परीक्षा लेकर निराश करना',
        'केवल लिखावट प्रतियोगिता तक प्रशंसा सीमित रखना',
      ],
      exp: 'सफलता के वास्तविक अनुभव और प्रयास की मान्यता बच्चों में उद्यमशीलता एवं आत्म-विश्वास जगाती है।',
    },
  },
  {
    topic: 'Visual Impairment Tactile Adaptation',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A primary classroom welcomes a learner with low vision. Which adaptation best integrates her into an EVS seed-and-leaf lesson?',
      opts: [
        'Provide real textured leaves, raised tactile diagrams, high-contrast large print labels, and verbal descriptions',
        'Seat her in the last row where glare is strongest and ask her to listen silently',
        'Exempt her permanently from all science observations',
        'Hand over a standard tiny-font black-and-white photocopy',
      ],
      exp: 'Tactile exploration (real leaves, embossed outlines) paired with clear verbal cues provides authentic multi-sensory access.',
    },
    mr: {
      q: 'प्राथमिक वर्गात कमी दृष्टी (Low Vision) असलेली विद्यार्थिनी आहे. परिसर अभ्यासाच्या "पाने व बिया" पाठात तिला सहभागी करून घेण्यासाठी सर्वोत्तम उपाय कोणता?',
      opts: [
        'प्रत्यक्ष स्पर्श करता येणारी खडबडीत/गुळगुळीत पाने, उठावाची स्पर्शचित्रे, ठळक अक्षरपट्ट्या आणि स्पष्ट तोंडी वर्णन देणे',
        'तिला शेवटच्या बाकावर बसवून फक्त गप्प ऐकण्यास सांगणे',
        'विज्ञानाच्या सर्व निरीक्षणांतून तिला कायमची सूट देणे',
        'अतिशय बारीक अक्षरांची काळी-पांढरी झेरॉक्स प्रत देणे',
      ],
      exp: 'स्पर्शजन्य साहित्य, ठळक रंगसंगती आणि स्पष्ट वर्णन यांमुळे कमी दृष्टी असलेल्या विद्यार्थ्यांचे अध्ययन प्रभावी होते.',
    },
    hi: {
      q: 'प्राथमिक कक्षा में अल्प-दृष्टि (Low Vision) वाली छात्रा के लिए "बीज और पत्तियाँ" पाठ में सबसे प्रभावी समायोजन क्या होगा?',
      opts: [
        'वास्तविक स्पर्शनीय पत्तियाँ, उभरे हुए स्पर्श-चित्र, बड़े उच्च-विपरीत लेबल और स्पष्ट मौखिक विवरण देना',
        'उसे अंतिम पंक्ति में बैठाकर केवल चुपचाप सुनने को कहना',
        'सभी विज्ञान प्रयोगों से स्थायी छूट देना',
        'अत्यंत छोटे अक्षरों की फोटोकापी दे देना',
      ],
      exp: 'स्पर्शनीय सामग्री, बड़े सुस्पष्ट अक्षर और मौखिक वर्णन दृष्टिबाधित शिक्षार्थियों को सक्रिय सहभागिता देते हैं।',
    },
  },
  {
    topic: 'Child-Centered vs Teacher-Centered Pedagogy',
    pattern: 'Assertion-Reasoning',
    difficulty: 'Easy',
    en: {
      q: 'Which characteristic distinguishes a genuinely child-centered primary classroom from a traditional teacher-dominated lecture hall?',
      opts: [
        'Learners investigate, question, manipulate learning materials, and co-construct concepts at varied paces',
        'Every child sits identically facing forward while copying notes continuously',
        'Silence is treated as the sole measure of effective teaching',
        'Curriculum pacing ignores learner prior experiences completely',
      ],
      exp: 'Child-centered pedagogy values active exploration, dialogue, diverse pacing, and building on children’s prior knowledge.',
    },
    mr: {
      q: 'पारंपरिक शिक्षक-केंद्रित वर्गापेक्षा अस्सल बालकेंद्रित (Child-Centered) प्राथमिक वर्ग कशामुळे वेगळा ठरतो?',
      opts: [
        'विद्यार्थी स्वतः कृती, प्रश्नोत्तरे व साहित्य हाताळणीतून आपापल्या गतीने संकल्पना बांधणी करतात',
        'सर्व मुले एकाच दिशेला शांत बसून फळ्यावरचे उतरवून घेतात',
        'वर्गातील निरव शांतता हाच उत्तम अध्यापनाचा निकष मानला जातो',
        'मुलांच्या पूर्वानुभवांचा विचार न करता पाठ पुढे नेला जातो',
      ],
      exp: 'बालकेंद्रित शिक्षणात विद्यार्थ्याचा सक्रिय सहभाग, कृती व वैयक्तिक शिकण्याची गती केंद्रस्थानी असते.',
    },
    hi: {
      q: 'वास्तविक बाल-केंद्रित प्राथमिक कक्षा पारंपरिक शिक्षक-प्रधान कक्षा से किस बात में भिन्न होती है?',
      opts: [
        'बच्चे अन्वेषण, प्रश्न-पूछताछ, शिक्षण सामग्री के उपयोग और अपनी गति से अवधारणा निर्माण करते हैं',
        'सभी छात्र चुपचाप आगे देखकर लगातार नकल करते हैं',
        'केवल पूर्ण मौन को सफल शिक्षण का प्रमाण माना जाता है',
        'बच्चों के पूर्व अनुभवों की पूरी उपेक्षा की जाती है',
      ],
      exp: 'बाल-केंद्रित शिक्षण में शिक्षार्थी की सक्रिय जिज्ञासा, सहभागिता और वैयक्तिक गति प्रमुख होती है।',
    },
  },
  {
    topic: 'Individual Differences & Differentiated Tasks',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'In a multi-ability Class 4 room where some pupils grasp concepts rapidly while others need concrete visual reinforcement, what is the wisest pedagogical response?',
      opts: [
        'Offer tiered scaffolded stations and flexible extension challenges within the same shared theme',
        'Deliver one rigid lecture paced solely for the fastest three students',
        'Segregate slow learners into permanent remedial classrooms',
        'Cancel exploratory group work completely',
      ],
      exp: 'Differentiated instruction honours individual pace and readiness while maintaining inclusive classroom belonging.',
    },
    mr: {
      q: 'इयत्ता चौथीच्या वर्गात काही विद्यार्थी चटकन संकल्पना समजून घेतात तर काहींना दृश्य व मूर्त आधाराची गरज लागते. शिक्षकांचा सर्वोत्तम प्रतिसाद कोणता असावा?',
      opts: [
        'एकाच विषयांतर्गत विविध पातळीवरील मदतीचे व विस्तारित आव्हानांचे लवचिक कृतीगट तयार करणे',
        'फक्त पहिल्या तीन हुशार मुलांच्या वेगाने एकसुरी तास घेणे',
        'हळू शिकणाऱ्या मुलांना कायमचे वेगळ्या वर्गात टाकणे',
        'सर्व गटउपक्रम रद्द करणे',
      ],
      exp: 'भेददर्शक अध्यापनामुळे (Differentiated Instruction) सर्व स्तरांतील विद्यार्थ्यांना समावेशक वर्गात योग्य आव्हान व आधार मिळतो.',
    },
    hi: {
      q: 'विविध क्षमताओं वाली कक्षा ४ में कुछ छात्र शीघ्र समझते हैं जबकि कुछ को ठोस दृश्य सहायता चाहिए। शिक्षक की श्रेष्ठ रणनीति क्या होगी?',
      opts: [
        'एक ही विषय के भीतर स्तर-आधारित सहायक कार्य एवं लचीली विस्तार गतिविधियाँ देना',
        'केवल तीन सबसे तेज़ छात्रों की गति से एकरूप व्याख्यान देना',
        'धीमे शिक्षार्थियों को स्थायी रूप से अलग कक्षा में भेजना',
        'समूह आधारित खोज कार्य बंद कर देना',
      ],
      exp: 'विभेदित अनुदेशन (Differentiated Instruction) समावेशी कक्षा में हर बच्चे की गति व आवश्यकता को सम्मान देता है।',
    },
  },
  {
    topic: 'Diagnostic Testing Purpose',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What is the primary goal of administering a diagnostic test before planning remedial classes?',
      opts: [
        'Pinpointing the exact sub-skill or misconception causing a learner’s difficulty',
        'Printing merit certificates for prize distribution day',
        'Computing percentile ranks across the district',
        'Detaining low-scoring students in the same grade',
      ],
      exp: 'Diagnostic assessment uncovers specific learning bottlenecks so remedial instruction targets root causes rather than repeating whole chapters.',
    },
    mr: {
      q: 'उपचारात्मक अध्यापन सुरू करण्यापूर्वी नैदानिक चाचणी (Diagnostic Test) घेण्याचा मुख्य हेतू कोणता असतो?',
      opts: [
        'विद्यार्थ्यास नेमक्या कोणत्या उपघटकात किंवा संकल्पनेत अडचण येते याचे अचूक निदान करणे',
        'बक्षीस समारंभासाठी गुणवत्ता प्रमाणपत्रे छापणे',
        'संपूर्ण जिल्ह्याची टक्केवारी क्रमवारी काढणे',
        'कमी गुण मिळालेल्या विद्यार्थ्याला त्याच वर्गात नापास ठेवणे',
      ],
      exp: 'नैदानिक चाचणीद्वारे विद्यार्थ्याची नेमकी अडचण समजते व त्यानुसार अचूक उपचारात्मक मदत देता येते.',
    },
    hi: {
      q: 'उपचारात्मक शिक्षण से पूर्व नैदानिक परीक्षण (Diagnostic Test) आयोजित करने का मुख्य उद्देश्य क्या होता है?',
      opts: [
        'उस विशिष्ट उप-कौशल या भ्रांति की सटीक पहचान करना जहाँ शिक्षार्थी को कठिनाई हो रही है',
        'पुरस्कार वितरण हेतु प्रमाणपत्र मुद्रित करना',
        'जिला स्तर पर पर्सेंटाइल रैंक निकालना',
        'कम अंक पाने वाले छात्रों को उसी कक्षा में रोकना',
      ],
      exp: 'नैदानिक परीक्षण अधिगम-अंतराल के सटीक कारण को पहचानकर लक्षित उपचारात्मक शिक्षण को संभव बनाता है।',
    },
  },
  // ===================== TEST 2 (30 Qs) =====================
  {
    topic: 'Piaget Preoperational Egocentrism',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'A five-year-old covers her own eyes during hide-and-seek and assumes nobody else can see her either. Which Preoperational characteristic does Piaget identify here?',
      opts: [
        'Cognitive egocentrism (difficulty taking another person’s visual perspective)',
        'Concrete reversibility',
        'Formal propositional reasoning',
        'Intentional deception',
      ],
      exp: 'Preoperational egocentrism reflects a young child’s assumption that others perceive and experience the world identically to herself.',
    },
    mr: {
      q: 'लपंडाव खेळताना पाच वर्षांची मुलगी स्वतःचे डोळे हातांनी झाकते आणि तिला वाटते की आता आपल्याला कोणीही पाहू शकत नाही. पियाजेच्या मते हे कोणते वैशिष्ट्य आहे?',
      opts: [
        'अहंकेंद्री विचारसरणी (Egocentrism – दुसऱ्याच्या दृष्टिकोनाची कल्पना न येणे)',
        'मूर्त प्रत्यावर्तनक्षमता',
        'औपचारिक तर्कशक्ती',
        'जाणीवपूर्वक फसवणूक',
      ],
      exp: 'पूर्व-क्रियात्मक अवस्थेत बालकास इतरांचा दृष्टिकोन वेगळा असू शकतो याची जाणीव नसते, याला अहंकेंद्रीपणा म्हणतात.',
    },
    hi: {
      q: 'छुपा-छुपी खेलते समय पाँच वर्षीय बच्ची अपनी आँखें ढक लेती है और समझती है कि कोई उसे देख नहीं सकता। पियाजे के अनुसार यह किस गुण का उदाहरण है?',
      opts: [
        'अहंकेंद्रिता (Egocentrism – दूसरे के दृष्टिकोण को न समझ पाना)',
        'मूर्त प्रतिवर्तन क्षमता',
        'औपचारिक तार्किकता',
        'जानबूझकर किया गया छल',
      ],
      exp: 'पूर्व-संक्रियात्मक अवस्था में बच्चा यह मान लेता है कि अन्य व्यक्ति भी वही देख-समझ रहे हैं जो वह स्वयं देख रहा है।',
    },
  },
  {
    topic: 'Piaget Centration',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Shown two identical rows of 6 marbles, a child agrees they are equal; when one row is spread farther apart, she insists the longer row now has more marbles. Which limitation causes this?',
      opts: [
        'Centration (focusing only on length while ignoring spacing)',
        'Seriation mastery',
        'Combinatorial logic',
        'Scaffolding dependency',
      ],
      exp: 'Centration means attending exclusively to one salient perceptual dimension (row length) rather than coordinating length and density.',
    },
    mr: {
      q: 'समान अंतरावरील ६-६ गोट्यांच्या दोन रांगा एका बालकाला सारख्या वाटतात; पण त्यांपैकी एक रांग पसरून लांब केल्यास लांब रांगेत जास्त गोट्या आहेत असे ते म्हणते. ही मर्यादा कोणती?',
      opts: [
        'केंद्रीकरण (Centration – फक्त लांबीच्या एकाच पैलूवर लक्ष केंद्रित करणे)',
        'क्रमवार लावण्याची क्षमता',
        'संयोगात्मक तर्क',
        'आधारावरील अवलंबित्व',
      ],
      exp: 'एकाच वेळी दोन वैशिष्ट्यांचा (लांबी व अंतर) विचार न करता फक्त एकाच पैलूवर लक्ष ठेवणे म्हणजे केंद्रीकरण (Centration).',
    },
    hi: {
      q: '६-६ कंचों की दो समान पंक्तियों में से एक को फैलाकर लंबा कर देने पर छोटा बच्चा लंबी पंक्ति में अधिक कंचे बताता है। यह किस संज्ञानात्मक सीमा के कारण है?',
      opts: [
        'केंद्रीकरण (Centration – दूरी की उपेक्षा कर केवल लंबाई पर ध्यान देना)',
        'क्रमबद्धता कौशल',
        'संयोजन तर्क',
        'पाड़ निर्भरता',
      ],
      exp: 'एक ही समय में एक ही दृश्य पक्ष (लंबाई) पर ध्यान केंद्रित कर पाना केंद्रीकरण (Centration) कहलाता है।',
    },
  },
  {
    topic: 'Vygotsky Cultural Tools & Language',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'How do Jean Piaget and Lev Vygotsky differ most sharply regarding the relationship between thought and language in young learners?',
      opts: [
        'Piaget views cognitive development as driving language, whereas Vygotsky views social language as shaping higher thought',
        'Piaget asserts private speech guides all learning, while Vygotsky rejects speech entirely',
        'Both argue language has zero connection with conceptual reasoning',
        'Vygotsky claims biology determines vocabulary without culture',
      ],
      exp: 'For Vygotsky, internalized social language is the primary engine of cognitive growth; for Piaget, schemas precede linguistic expression.',
    },
    mr: {
      q: 'विचार आणि भाषा यांच्या संबंधाबाबत जीन पियाजे आणि लेव्ह वायगॉत्स्की यांच्यात कोणता मुख्य फरक आहे?',
      opts: [
        'पियाजे विचारांतून भाषा घडते मानतात, तर वायगॉत्स्की सामाजिक भाषेद्वारे उच्च विचार विकसित होतात मानतात',
        'पियाजे खाजगी भाषेला सर्वश्रेष्ठ मानतात व वायगॉत्स्की भाषा नाकारतात',
        'दोघेही भाषा व विचाराचा काही संबंध नसल्याचे सांगतात',
        'वायगॉत्स्की शब्दसंग्रह संस्कृतीशिवाय जैविक मानतात',
      ],
      exp: 'वायगॉत्स्कीच्या मते सामाजिक संवाद व भाषा उच्च बोधात्मक विचारांचा पाया घडवतात.',
    },
    hi: {
      q: 'विचार और भाषा के संबंध पर जीन पियाजे और लेव वाइगोत्स्की के दृष्टिकोण में प्रमुख अंतर क्या है?',
      opts: [
        'पियाजे संज्ञानात्मक विकास को भाषा से पहले मानते हैं, जबकि वाइगोत्स्की सामाजिक भाषा को उच्च चिंतन का चालक मानते हैं',
        'पियाजे निजी वाक् को सर्वोत्तम मानते हैं और वाइगोत्स्की वाक् को नकारते हैं',
        'दोनों भाषा और विचार में कोई संबंध नहीं मानते',
        'वाइगोत्स्की संस्कृति के बिना जैविक शब्दावली मानते हैं',
      ],
      exp: 'वाइगोत्स्की सामाजिक भाषा के आंतरीकरण को संज्ञानात्मक विकास का मूल आधार मानते हैं।',
    },
  },
  {
    topic: 'Kohlberg Conventional Good-Girl Orientation',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Kiran returns a lost eraser solely so classmates and teachers praise her as an "ideal, well-mannered monitor." Which stage of Kohlberg’s Conventional level does this reflect?',
      opts: [
        'Stage 3: Interpersonal Concordance ("Good boy / Nice girl" orientation)',
        'Stage 1: Obedience to avoid physical pain',
        'Stage 5: Democratic social-contract revision',
        'Stage 6: Universal self-chosen conscience',
      ],
      exp: 'Stage 3 evaluates morality by earning social approval and living up to expectations of being a "good person."',
    },
    mr: {
      q: 'वर्गातील मित्र व शिक्षकांनी आपल्याला "आदर्श, सभ्य वर्गप्रमुख" म्हणावे म्हणून किरण हरवलेला खोडरबर परत देते. कोहलबर्गच्या पारंपरिक पातळीतील हा कोणता टप्पा आहे?',
      opts: [
        'टप्पा ३: परस्पर सलोखा ("चांगला मुलगा / चांगली मुलगी" अभिविन्यास)',
        'टप्पा १: शारीरिक शिक्षा टाळण्यासाठी आज्ञापालन',
        'टप्पा ५: लोकशाही सामाजिक करार',
        'टप्पा ६: सार्वत्रिक सद्सद्विवेकबुद्धी',
      ],
      exp: 'दुसऱ्यांची पसंती व "चांगले मूल" ही प्रतिमा टिकवण्यासाठी नैतिक वागणे म्हणजे टप्पा ३ होय.',
    },
    hi: {
      q: 'किरण खोया हुआ रबड़ इसलिए लौटाती है ताकि सहपाठी व शिक्षक उसे "आदर्श और सभ्य मॉनिटर" कहें। यह कोहलबर्ग के किस चरण को दर्शाता है?',
      opts: [
        'चरण ३: पारस्परिक सद्भाव ("अच्छा लड़का / अच्छी लड़की" अभिविन्यास)',
        'चरण १: दंड से बचने हेतु आज्ञापालन',
        'चरण ५: लोकतांत्रिक सामाजिक अनुबंध',
        'चरण ६: सार्वभौमिक अंतरात्मा सिद्धांत',
      ],
      exp: 'अन्य लोगों की स्वीकृति और "अच्छा बनने" की इच्छा पर आधारित नैतिक निर्णय चरण ३ में आते हैं।',
    },
  },
  {
    topic: 'Dysgraphia Identification',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 5 student answers orally with rich vocabulary, yet her written pages show cramped spacing, uneven letter sizes, tense pencil grip, and frequent spelling omissions. Which specific difficulty is likely?',
      opts: [
        'Dysgraphia (motor-writing transcription difficulty)',
        'Sensory hearing loss',
        'Visual colour blindness',
        'Global intellectual disability',
      ],
      exp: 'Dysgraphia affects fine motor handwriting fluency and orthographic encoding despite intact oral comprehension.',
    },
    mr: {
      q: 'इयत्ता पाचवीतील विद्यार्थी तोंडी उत्तरे समृद्ध शब्दांत देतो, पण लिहिताना अक्षरांचा आकार असमान, घट्ट पेन पकड व शब्दांतील अंतर चुकते. ही कोणती विशिष्ट अडचण असू शकते?',
      opts: [
        'डिसग्राफिया (लेखनविषयक अक्षमता)',
        'श्रवणदोष',
        'रंगांधळेपणा',
        'संपूर्ण बौद्धिक अक्षमता',
      ],
      exp: 'तोंडी क्षमता उत्तम असूनही लेखन कौशल्यात व अक्षररचनेत अडचण येणे हे डिसग्राफियाचे लक्षण आहे.',
    },
    hi: {
      q: 'कक्षा ५ का छात्र मौखिक उत्तर उत्कृष्ट देता है, पर लेखन में अनियमित अक्षर आकार, कसी हुई पकड़ और अनियंत्रित अंतराल दिखता है। यह किस कठिनाई का संकेत है?',
      opts: [
        'डिस्ग्राफिया (लेखन वैकल्य)',
        'श्रवण बाधिता',
        'वर्णांधता',
        'संपूर्ण बौद्धिक अक्षमता',
      ],
      exp: 'मौखिक अभिव्यक्ति सामान्य होने के बावजूद हस्तलेखन व वर्तनी-संगठन में कठिनाई डिस्ग्राफिया का लक्षण है।',
    },
  },
  {
    topic: 'Rabindranath Tagore Naturalistic Pedagogy',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which core educational principle guided Rabindranath Tagore’s founding of Santiniketan?',
      opts: [
        'Learning in open harmony with nature, arts, music, and joyous creative freedom',
        'Strict rote drill inside windowless walled classrooms',
        'Banning regional mother tongues in favour of Latin grammar',
        'Replacing arts and craft completely with clerical tests',
      ],
      exp: 'Tagore championed freedom of mind, nature-immersed inquiry, creative expression through music/art, and joyful childhood.',
    },
    mr: {
      q: 'रवींद्रनाथ टागोर यांनी शांतिनिकेतनची स्थापना कोणत्या मुख्य शैक्षणिक तत्त्वावर केली होती?',
      opts: [
        'निसर्गाच्या सान्निध्यात कला, संगीत आणि मुक्त सर्जनशील आनंदासह शिक्षण',
        'खिडक्या नसलेल्या बंद वर्गखोल्यांत कडक पाठांतर',
        'मातृभाषांवर बंदी घालून लॅटिन व्याकरण शिकवणे',
        'कला व कार्यानुभव काढून केवळ कारकुनी परीक्षा घेणे',
      ],
      exp: 'निसर्गसान्निध्य, कला-संगीत व आनंददायी मुक्त वातावरण हा टागोरांच्या शिक्षण विचाराचा गाभा होता.',
    },
    hi: {
      q: 'रवींद्रनाथ टैगोर ने शांतिनिकेतन की स्थापना किस प्रमुख शैक्षिक सिद्धांत के आधार पर की थी?',
      opts: [
        'प्रकृति के सान्निध्य में कला, संगीत और आनंदपूर्ण रचनात्मक स्वतंत्रता के साथ अधिगम',
        'बंद कमरों में कठोर रटंत अभ्यास',
        'मातृभाषाओं पर प्रतिबंध लगाकर लैटिन व्याकरण पढ़ाना',
        'कला व हस्तशिल्प हटाकर केवल लिपिकीय परीक्षाएँ लेना',
      ],
      exp: 'टैगोर प्रकृति, कला-संस्कृति और भयमुक्त रचनात्मक स्वतंत्रता को वास्तविक शिक्षा का आधार मानते थे।',
    },
  },
  {
    topic: 'Maria Montessori Prepared Environment',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In Maria Montessori’s early-primary classroom, why are sensory wooden apparatus self-correcting (auto-didactic)?',
      opts: [
        'Children independently detect mismatches through tactile feedback without waiting for adult scolding',
        'Only teachers are allowed to touch wooden cylinder blocks',
        'Learners memorize geometric definitions before handling objects',
        'Error awareness is hidden from children until annual promotion',
      ],
      exp: 'Montessori designed self-correcting apparatus (control of error) so young learners build autonomy and sensory precision.',
    },
    mr: {
      q: 'मारिया माँटेसरी यांच्या प्राथमिक वर्गातील लाकडी संवेदी साधने "स्वयं-दुरुस्त" (Self-correcting) का असतात?',
      opts: [
        'शिक्षकांच्या रागावण्याशिवाय बालकाला स्वतःच्या स्पर्श-निरीक्षणातून चूक समजून स्वावलंबन मिळते',
        'लाकडी ठोकळ्यांना फक्त शिक्षकांनाच हात लावता येतो',
        'वस्तू हाताळण्यापूर्वी मुले व्याख्या पाठ करतात',
        'वार्षिक परीक्षेपर्यंत चूक लपवून ठेवली जाते',
      ],
      exp: 'स्वयं-दुरुस्ती साधनांमुळे बालक स्वतःची चूक स्वतः सुधारते व स्वावलंबी बनते.',
    },
    hi: {
      q: 'मारिया मॉन्टेसरी की कक्षा में संवेदी लकड़ी के उपकरण "स्व-सुधारात्मक" (Auto-didactic) क्यों होते हैं?',
      opts: [
        'ताकि बच्चे वयस्क की डाँट के बिना स्पर्श अनुभव से स्वयं त्रुटि पहचानकर स्वावलंबी बनें',
        'केवल शिक्षकों को उपकरण छूने की अनुमति होती है',
        'वस्तु छूने से पहले बच्चे परिभाषा रटते हैं',
        'वार्षिक परीक्षा तक त्रुटि छिपाई जाती है',
      ],
      exp: 'स्व-सुधारात्मक (Control of Error) सामग्री बच्चों में स्व-निर्देशन और संवेदी सूक्ष्मता विकसित करती है।',
    },
  },
  {
    topic: 'Savitribai & Mahatma Phule Inclusive Reform',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why do Maharashtra’s educational history curricula highlight 1848 (Bhide Wada, Pune) by Mahatma Jyotirao Phule and Krantijyoti Savitribai Phule?',
      opts: [
        'They pioneered universal, caste-free school access for girls and marginalized communities in India',
        'They established exclusive boarding schools restricted to British officers',
        'They replaced Marathi medium with compulsory Greek',
        'They discouraged basic literacy for rural peasants',
      ],
      exp: 'The 1848 Bhide Wada school championed universal human dignity, girls’ education, and social justice.',
    },
    mr: {
      q: 'महाराष्ट्राच्या शैक्षणिक इतिहासात १८४८ मधील (भिडे वाडा, पुणे) महात्मा फुले आणि क्रांतिज्योती सावित्रीबाई फुले यांचे कार्य का क्रांतिकारी मानले जाते?',
      opts: [
        'भारतात मुली व उपेक्षित समाजघटकांसाठी जात-भेदविरहित सार्वत्रिक शिक्षणाची पहिली द्वारे त्यांनी उघडली',
        'फक्त ब्रिटिश अधिकाऱ्यांच्या मुलांसाठी वसतिगृह सुरू केले',
        'मराठीऐवजी ग्रीक भाषा सक्तीची केली',
        'ग्रामीण शेतकऱ्यांना अक्षरओळखीपासून दूर ठेवले',
      ],
      exp: '१८४८ मध्ये भिडे वाड्यात सुरू केलेली मुलींची पहिली शाळा समता व सार्वत्रिक शिक्षणाचा पाया ठरली.',
    },
    hi: {
      q: 'महाराष्ट्र के शैक्षिक इतिहास में १८४८ (भिड़े वाड़ा, पुणे) में महात्मा ज्योतिराव फुले व सावित्रीबाई फुले का योगदान क्यों ऐतिहासिक है?',
      opts: [
        'उन्होंने बालिकाओं एवं वंचित वर्गों के लिए जाति-भेद रहित सार्वभौमिक शिक्षा की प्रथम पहल की',
        'केवल ब्रिटिश अधिकारियों के बच्चों के लिए आवासीय विद्यालय खोला',
        'मराठी के स्थान पर ग्रीक भाषा अनिवार्य की',
        'ग्रामीण कृषकों की साक्षरता का विरोध किया',
      ],
      exp: '१८४८ का भिड़े वाड़ा विद्यालय भारत में स्त्री-शिक्षा और सामाजिक न्याय का ऐतिहासिक मील का पत्थर है।',
    },
  },
  {
    topic: 'RTE 2009 EWS 25% Reservation',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'What does Section 12(1)(c) of the RTE Act, 2009 mandate for private unaided non-minority schools at the entry level?',
      opts: [
        'Reserving at least 25% of seats for children belonging to disadvantaged groups and weaker sections',
        'Charging double tuition fees from first-generation learners',
        'Admitting students purely on parental entrance examinations',
        'Conducting weekly interviews with grandparents',
      ],
      exp: 'Section 12(1)(c) promotes social inclusion by reserving at least 25% entry-level seats in private unaided schools for EWS/DG children.',
    },
    mr: {
      q: 'शिक्षण हक्क कायदा (RTE 2009) कलम १२(१)(क) नुसार खाजगी विनाअनुदानित (अल्पसंख्याक नसलेल्या) शाळांत प्रवेश स्तरावर कोणती तरतूद बंधनकारक आहे?',
      opts: [
        'दुर्बल व वंचित घटकांतील बालकांसाठी किमान २५% जागा राखीव ठेवणे',
        'पहिल्या पिढीतील शिकणाऱ्या मुलांकडून दुप्पट शुल्क आकारणे',
        'पालकांच्या लेखी प्रवेश परीक्षेनुसारच प्रवेश देणे',
        'आजी-आजोबांच्या मुलाखती घेणे',
      ],
      exp: 'सामाजिक समता व समावेशनासाठी खाजगी शाळांत प्रवेश वर्गात २५% जागा दुर्बल व वंचित घटकांसाठी राखीव आहेत.',
    },
    hi: {
      q: 'RTE अधिनियम २००९ की धारा १२(१)(ग) गैर-सहायता प्राप्त निजी विद्यालयों को प्रवेश स्तर पर क्या अनिवार्य करती है?',
      opts: [
        'वंचित समूह एवं कमजोर वर्ग के बच्चों के लिए कम से कम २५% सीटें आरक्षित करना',
        'प्रथम पीढ़ी के शिक्षार्थियों से दोगुना शुल्क लेना',
        'अभिभावकों की लिखित प्रवेश परीक्षा के आधार पर चयन करना',
        'मासिक आय की मौखिक प्रतियोगिता आयोजित करना',
      ],
      exp: 'धारा १२(१)(ग) सामाजिक समावेशन हेतु प्रवेश स्तर पर २५% सीटें वंचित व कमजोर वर्ग के लिए सुनिश्चित करती है।',
    },
  },
  {
    topic: 'Spearman Two-Factor Intelligence',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In Charles Spearman’s Two-Factor Theory of Intelligence, what do "g" and "s" represent?',
      opts: [
        '"g" is general mental energy shared across tasks; "s" covers specific abilities particular to one domain',
        '"g" is group conflict; "s" is sensory reflex speed',
        '"g" stands for grade average; "s" stands for syllabus volume',
        '"g" means grammar mastery; "s" means spelling accuracy',
      ],
      exp: 'Spearman proposed a common general factor (g) plus distinct specific factors (s) for domains like music or computation.',
    },
    mr: {
      q: 'चार्ल्स स्पीयरमन यांच्या द्विघटक बुद्धिमत्ता सिद्धांतात "g" आणि "s" घटक काय दर्शवतात?',
      opts: [
        '"g" म्हणजे सर्व कार्यांत उपयोगी सामान्य बौद्धिक क्षमता, तर "s" म्हणजे विशिष्ट क्षेत्रापुरती विशेष क्षमता',
        '"g" म्हणजे गटसंघर्ष आणि "s" म्हणजे संवेदी प्रतिक्षिप्त वेग',
        '"g" म्हणजे सरासरी श्रेणी आणि "s" म्हणजे अभ्यासक्रम मर्यादा',
        '"g" म्हणजे व्याकरण आणि "s" म्हणजे शुद्धलेखन',
      ],
      exp: 'स्पीयरमनच्या मते प्रत्येक कामात सामान्य घटक (g) आणि त्या विशिष्ट कामापुरता विशेष घटक (s) कार्य करतो.',
    },
    hi: {
      q: 'चार्ल्स स्पीयरमैन के द्वि-कारक बुद्धि सिद्धांत में "g" और "s" कारक क्या दर्शाते हैं?',
      opts: [
        '"g" सभी मानसिक कार्यों में निहित सामान्य बुद्धि और "s" किसी एक क्षेत्र की विशिष्ट योग्यता है',
        '"g" समूह विवाद और "s" संवेदी प्रतिवर्त गति है',
        '"g" श्रेणी औसत और "s" पाठ्यक्रम भार है',
        '"g" व्याकरण कौशल और "s" वर्तनी शुद्धता है',
      ],
      exp: 'स्पीयरमैन के अनुसार बुद्धि में एक सर्वनिष्ठ सामान्य कारक (g) तथा अनेक विशिष्ट कारक (s) होते हैं।',
    },
  },
  {
    topic: 'Skinner Positive Reinforcement Scheduling',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Which classroom action applies B.F. Skinner’s "Positive Reinforcement" effectively without encouraging bribery?',
      opts: [
        'Immediately appreciating a shy learner’s genuine attempt during read-aloud so voluntary participation rises',
        'Removing the playground period whenever two students whisper',
        'Ignoring constructive effort while scolding minor smudges',
        'Offering cash prizes for every daily homework signature',
      ],
      exp: 'Positive reinforcement adds an encouraging social/feedback stimulus contingent on desirable behaviour, strengthening recurrence.',
    },
    mr: {
      q: 'लाचलुचपतीची सवय न लावता बी.एफ. स्किनर यांच्या "सकारात्मक प्रबलनाचा" (Positive Reinforcement) वर्गात योग्य वापर कोणता?',
      opts: [
        'लाजाळू विद्यार्थ्याने वाचनात सहभागी होण्याचा प्रामाणिक प्रयत्न करताच लगेच प्रोत्साहनपर दाद देणे',
        'दोन मुले कुजबुजली म्हणून संपूर्ण वर्गाचा खेळाचा तास रद्द करणे',
        'चांगल्या प्रयत्नांकडे दुर्लक्ष करून छोट्या डागांवर ओरडणे',
        'दररोजच्या गृहपाठासाठी रोख बक्षीस देणे',
      ],
      exp: 'चांगल्या प्रयत्नांनंतर दिलेला प्रामाणिक सकारात्मक प्रतिसाद त्या वर्तनाची पुनरावृत्ती वाढवतो.',
    },
    hi: {
      q: 'बिना लालच पैदा किए कक्षा में बी.एफ. स्किनर के "सकारात्मक पुनर्बलन" का प्रभावी प्रयोग कौन-सा है?',
      opts: [
        'संकोची छात्र के पठन-प्रयास की तुरंत सार्थक सराहना करना जिससे उसकी भागीदारी बढ़े',
        'दो छात्रों के फुसफुसाने पर पूरी कक्षा का खेल कालांश रद्द करना',
        'प्रयास की उपेक्षा कर छोटी त्रुटि पर डांटना',
        'दैनिक गृहकार्य पर नकद इनाम बाँटना',
      ],
      exp: 'वांछित प्रयास के बाद तुरंत दिया गया सकारात्मक सामाजिक प्रोत्साहन उस व्यवहार को सुदृढ़ करता है।',
    },
  },
  {
    topic: 'Kohler Insight Learning',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 5 student stares thoughtfully at a geometric puzzle, suddenly notices that two triangles align into a rectangle, and solves it in one "Aha!" flash. Which theory aligns best?',
      opts: [
        'Wolfgang Köhler’s Gestalt Insight Learning',
        'Blind trial-and-error fumbling alone',
        'Involuntary knee-jerk reflex conditioning',
        'Mechanical rote repetition',
      ],
      exp: 'Gestalt insight learning occurs when learners perceive the whole pattern and reorganize relationships suddenly.',
    },
    mr: {
      q: 'इयत्ता पाचवीतील विद्यार्थी भूमितीय कोडे पाहून विचार करतो आणि अचानक दोन त्रिकोण जोडून आयत बनतो हे त्याच्या लक्षात येते ("आहा!" अनुभव). हा कोणता अध्ययन सिद्धांत आहे?',
      opts: [
        'वुल्फगँग कोहलर यांचा मर्मदृष्टी अध्ययन सिद्धांत (Gestalt Insight Learning)',
        'केवळ आंधळी प्रयत्न-प्रमाद चाचपड',
        'अनैच्छिक प्रतिक्षिप्त क्रिया अभिसंधान',
        'यांत्रिक पाठांतर पुनरावृत्ती',
      ],
      exp: 'संपूर्ण परिस्थितीचे आकलन होऊन अचानक उपाय सुचणे म्हणजे मर्मदृष्टी अध्ययन (Insight Learning).',
    },
    hi: {
      q: 'कक्षा ५ का छात्र ज्यामितीय पहेली को ध्यान से देखता है और अचानक ("अहा!" अनुभूति से) दो त्रिभुजों से आयत बनाना समझ जाता है। यह किस सिद्धांत से मेल खाता है?',
      opts: [
        'वोल्फगैंग कोहलर का अंतर्दृष्टि / सूझ सिद्धांत (Gestalt Insight Learning)',
        'अंधाधुंध प्रयत्न और त्रुटि मात्र',
        'अनैच्छिक प्रतिवर्त अनुबंधन',
        'यांत्रिक रटंत अभ्यास',
      ],
      exp: 'संपूर्ण समस्या की संरचना को एक साथ समझकर अचानक समाधान सूझना सूझ/अंतर्दृष्टि अधिगम कहलाता है।',
    },
  },
  {
    topic: 'Positive Transfer of Learning',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'When proficiency in measuring perimeter on square grid paper helps Class 4 students immediately grasp bar-graph scale intervals, what learning phenomenon occurs?',
      opts: [
        'Positive transfer of learning',
        'Proactive interference',
        'Retroactive inhibition',
        'Learned helplessness',
      ],
      exp: 'Positive transfer occurs when prior mastered knowledge facilitates comprehension in a new related domain.',
    },
    mr: {
      q: 'चौरस कागदावरील परिमिती मोजण्याचे कौशल्य इयत्ता चौथीच्या विद्यार्थ्यांना स्तंभालेखाचे प्रमाण समजण्यात लगेच उपयोगी पडते. या प्रक्रियेला काय म्हणतात?',
      opts: [
        'अध्ययनाचे सकारात्मक संक्रमण (Positive Transfer of Learning)',
        'पुढील अडथळा (Proactive Interference)',
        'मागील स्मृती अवरोध',
        'अधिगमित असहायता',
      ],
      exp: 'एका घटकातील शिकलेले ज्ञान दुसऱ्या नवीन घटकाच्या आकलनास मदत करते तेव्हा सकारात्मक अध्ययन संक्रमण होते.',
    },
    hi: {
      q: 'ग्रिड पेपर पर परिमाप मापने की समझ कक्षा ४ के छात्रों को दंड-आलेख का पैमाना समझने में तुरंत मदद करती है। यह क्या कहलाता है?',
      opts: [
        'अधिगम का सकारात्मक स्थानांतरण (Positive Transfer)',
        'अग्रलक्षी अवरोध',
        'पश्चलक्षी अवरोध',
        'अर्जित असहायता',
      ],
      exp: 'पूर्व अर्जित ज्ञान जब नए कार्य को सीखने में सहायता करे तो उसे अधिगम का सकारात्मक स्थानांतरण कहते हैं।',
    },
  },
  {
    topic: 'Autism Spectrum Visual Structure',
    pattern: 'Classroom Scenario',
    difficulty: 'Difficult',
    en: {
      q: 'An eight-year-old learner on the Autism Spectrum gets distressed by sudden timetable surprises and noisy bell transitions. Which support best facilitates calm inclusion?',
      opts: [
        'Provide a predictable visual daily schedule card, calm transition countdowns, and a quiet sensory corner',
        'Change seating and routines randomly every hour to force flexibility',
        'Demand sustained eye contact during loud reprimands',
        'Remove visual cues altogether from the classroom walls',
      ],
      exp: 'Predictable visual routines, gentle warnings before transitions, and sensory-safe zones honour autistic learners’ needs.',
    },
    mr: {
      q: 'ऑटिझम स्पेक्ट्रमवरील आठ वर्षांचा विद्यार्थी वेळापत्रकातील अचानक बदलामुळे आणि मोठ्या घंटेच्या आवाजामुळे अस्वस्थ होतो. वर्गात कोणता समावेशक आधार सर्वोत्तम ठरेल?',
      opts: [
        'दैनिक कृतींचे चित्रमय वेळापत्रक, बदलापूर्वीची शांत पूर्वसूचना आणि शांत संवेदी कोपरा उपलब्ध करणे',
        'लवचिकतेसाठी दर तासाला बसण्याची जागा अचानक बदलणे',
        'रागावताना थेट नजरेला नजर भिडवण्याची सक्ती करणे',
        'वर्गातील सर्व दृश्य तक्ते काढून टाकणे',
      ],
      exp: 'स्पष्ट चित्रमय दिनक्रम आणि बदलांची पूर्वकल्पना ऑटिझम असलेल्या विद्यार्थ्यांना सुरक्षितता व स्थैर्य देते.',
    },
    hi: {
      q: 'ऑटिज़्म स्पेक्ट्रम से जुड़ा ८ वर्षीय छात्र समय-सारणी के अचानक बदलाव और तेज़ घंटी से व्यथित हो जाता है। कक्षा में सबसे सहायक समायोजन क्या होगा?',
      opts: [
        'चित्रमय दैनिक समय-सारणी कार्ड, बदलाव से पहले शांत पूर्व-सूचना और संवेदी विश्राम कोना उपलब्ध कराना',
        'लचीलापन लाने के लिए हर घंटे सीट बदल देना',
        'डाँटते समय लगातार आँख मिलाने की बाध्यता रखना',
        'कक्षा की दीवारों से सभी दृश्य संकेत हटा देना',
      ],
      exp: 'पूर्वानुमेय दृश्य दिनचर्या और संवेदी अनुकूलन ऑटिज़्म शिक्षार्थियों में सुरक्षा-भाव व सहभागिता बढ़ाते हैं।',
    },
  },
  {
    topic: 'Aptitude vs Achievement Distinction',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'How does an "Aptitude test" differ conceptually from a standard school "Achievement test"?',
      opts: [
        'Aptitude assesses future potential/readiness to learn a domain, whereas achievement measures content already learned',
        'Aptitude ignores reasoning completely, whereas achievement predicts genetics',
        'Achievement tests cannot be graded objectively',
        'Aptitude is used solely for attendance registers',
      ],
      exp: 'Achievement looks backward at mastered curriculum; aptitude estimates innate/acquired potential to succeed in future training.',
    },
    mr: {
      q: 'अभियोग्यता चाचणी (Aptitude Test) आणि शालेय संपादन चाचणी (Achievement Test) यांतील मुख्य संकल्पनात्मक फरक कोणता?',
      opts: [
        'अभियोग्यता भविष्यातील शिकण्याची सुप्त क्षमता मोजते, तर संपादन चाचणी आतापर्यंत शिकलेला अभ्यासक्रम मोजते',
        'अभियोग्यतेत तर्काचा संबंध नसतो तर संपादन अनुवंशिकता सांगते',
        'संपादन चाचणीचे वस्तुनिष्ठ मूल्यमापन होऊ शकत नाही',
        'अभियोग्यता फक्त हजेरीपटासाठी वापरतात',
      ],
      exp: 'संपादन चाचणी भूतकाळातील अध्ययन मोजते, तर अभियोग्यता चाचणी भविष्यातील यशाची संभाव्य क्षमता दर्शवते.',
    },
    hi: {
      q: 'अभिक्षमता परीक्षण (Aptitude Test) और विद्यालयी उपलब्धि परीक्षण (Achievement Test) में मुख्य अंतर क्या है?',
      opts: [
        'अभिक्षमता भविष्य में सीखने की संभावित क्षमता आंकती है, जबकि उपलब्धि पहले सीखे गए विषय-ज्ञान को मापती है',
        'अभिक्षमता तर्क को नकारती है और उपलब्धि आनुवंशिकता बताती है',
        'उपलब्धि परीक्षण का वस्तुनिष्ठ अंकन संभव नहीं है',
        'अभिक्षमता केवल उपस्थिति पंजिका के लिए होती है',
      ],
      exp: 'उपलब्धि परीक्षण पूर्व अधिगम को मापता है, जबकि अभिक्षमता परीक्षण भविष्य के प्रशिक्षण में संभावित क्षमता बताता है।',
    },
  },
  {
    topic: 'NCF 2005 Connecting Knowledge Beyond School',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which statement captures the foundational guiding principle of the National Curriculum Framework (NCF) 2005?',
      opts: [
        'Connecting knowledge to life outside the school and shifting learning away from rote methods',
        'Restricting textbooks solely to exam-oriented factual definitions',
        'Doubling heavy homework loads across Classes 1 and 2',
        'Separating school learning completely from local communities',
      ],
      exp: 'NCF 2005 states five core principles, foremost: connect knowledge to outside life and end rote memorization.',
    },
    mr: {
      q: 'राष्ट्रीय अभ्यासक्रम आराखडा (NCF 2005) मधील प्रमुख मार्गदर्शक तत्त्व कोणते आहे?',
      opts: [
        'ज्ञान शाळेबाहेरील प्रत्यक्ष जीवनाशी जोडणे आणि पाठांतराधिष्ठित शिक्षणपद्धतीतून बाहेर पडणे',
        'पाठ्यपुस्तके फक्त परीक्षेपुरत्या व्याख्यांपुरती मर्यादित ठेवणे',
        'इयत्ता १ ली व २ री साठी गृहपाठ दुप्पट करणे',
        'शालेय शिक्षण स्थानिक समाजापासून पूर्णपणे वेगळे ठेवणे',
      ],
      exp: 'शाळेबाहेरील जीवनाशी ज्ञान जोडणे आणि घोकंपट्टी बंद करणे हे NCF 2005 चे मूलभूत तत्त्व आहे.',
    },
    hi: {
      q: 'राष्ट्रीय पाठ्यचर्या की रूपरेखा (NCF 2005) का प्रमुख मार्गदर्शक सिद्धांत कौन-सा है?',
      opts: [
        'ज्ञान को विद्यालय के बाहरी जीवन से जोड़ना और पढ़ाई को रटंत प्रणाली से मुक्त करना',
        'पाठ्यपुस्तकों को केवल परीक्षा-केंद्रित परिभाषाओं तक सीमित रखना',
        'कक्षा १ व २ में गृहकार्य का बोझ दोगुना करना',
        'विद्यालयी शिक्षा को स्थानीय समुदाय से पूरी तरह अलग रखना',
      ],
      exp: 'NCF 2005 का प्रथम मार्गदर्शक सिद्धांत ज्ञान को बाहरी जीवन से जोड़कर रटने की प्रवृत्ति समाप्त करना है।',
    },
  },
  {
    topic: 'Creative & Gifted Learner Enrichment',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A gifted Class 5 learner solves standard fractions in five minutes and grows restless waiting for peers. What should the teacher offer instead of repetitive busywork?',
      opts: [
        'Enrichment tasks involving open-ended inquiry, mathematical puzzles, and cross-disciplinary exploration',
        'Ten more pages of identical basic fraction drills',
        'Asking the student to copy dictionary pages silently',
        'Requiring the learner to sit idle with hands folded for 30 minutes',
      ],
      exp: 'Gifted learners need depth, complexity, and open-ended enrichment—not extra mechanical repetition.',
    },
    mr: {
      q: 'इयत्ता पाचवीतील प्रज्ञावान विद्यार्थी अपूर्णांकांची नियमित उदाहरणे पाच मिनिटांत सोडवून रिकामा बसतो. अशा वेळी शिक्षकाने काय द्यावे?',
      opts: [
        'मुक्तोत्तरी शोधकार्य, तार्किक गणिती कोडी आणि आंतरविद्याशाखीय समृद्धी उपक्रम (Enrichment)',
        'तोच सोपा सराव दहा पाने अधिक लिहायला देणे',
        'शब्दकोशातील पाने शांतपणे उतरवायला लावणे',
        '३० मिनिटे हात बांधून गप्प बसायला सांगणे',
      ],
      exp: 'प्रज्ञावान विद्यार्थ्यांसाठी यांत्रिक पुनरावृत्तीऐवजी सखोल, आव्हानात्मक आणि सर्जनशील समृद्धी उपक्रम (Enrichment) आवश्यक असतात.',
    },
    hi: {
      q: 'कक्षा ५ का प्रतिभाशाली छात्र भिन्न के सामान्य प्रश्न पाँच मिनट में हल कर ऊबने लगता है। शिक्षक को यांत्रिक कार्य के बजाय क्या देना चाहिए?',
      opts: [
        'मुक्त-अंत अन्वेषण, तार्किक पहेलियाँ और अंतर-विषयक संवर्धन (Enrichment) कार्य',
        'उसी सरल अभ्यास के दस और पृष्ठ लिखवाना',
        'चुपचाप शब्दकोश के पृष्ठ नकल करवाना',
        '३० मिनट तक हाथ बाँधकर शांत बैठने को कहना',
      ],
      exp: 'प्रतिभाशाली विद्यार्थियों को अतिरिक्त यांत्रिक अभ्यास नहीं, बल्कि गहन और सृजनात्मक संवर्धन अवसर चाहिए।',
    },
  },
  {
    topic: 'Anecdotal Records vs Checklists',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which qualitative CCE tool captures brief, factual, date-stamped observations of a specific incident or breakthrough in a child’s classroom behaviour?',
      opts: [
        'Anecdotal Record',
        'Multiple-choice OMR optical sheet',
        'Standardized norm-referenced percentile table',
        'Annual attendance summary register',
      ],
      exp: 'An anecdotal record logs objective, concise narratives of meaningful learner behaviours in authentic contexts.',
    },
    mr: {
      q: 'सातत्यपूर्ण सर्वंकष मूल्यमापनात (CCE) विद्यार्थ्याच्या वर्तनातील एखाद्या विशिष्ट प्रसंगाची किंवा प्रगतीची दिनांकनिहाय वस्तुनिष्ठ नोंद कोणत्या साधनात ठेवतात?',
      opts: [
        'दैनंदिन प्रसंग नोंदवही (Anecdotal Record)',
        'बहुपर्यायी OMR उत्तरपत्रिका',
        'प्रमाणित टक्केवारी तक्ता',
        'वार्षिक हजेरीपट गोषवारा',
      ],
      exp: 'विद्यार्थ्याच्या प्रत्यक्ष वर्तनातील लक्षणीय प्रसंगांची वस्तुनिष्ठ नोंद प्रसंग नोंदवहीत (Anecdotal Record) केली जाते.',
    },
    hi: {
      q: 'सतत एवं व्यापक मूल्यांकन (CCE) में किसी विद्यार्थी के व्यवहार की विशिष्ट घटना या उपलब्धि का तिथि-वार तथ्यात्मक विवरण किसमें दर्ज किया जाता है?',
      opts: [
        'उपाख्यानात्मक अभिलेख (Anecdotal Record)',
        'बहुविकल्पीय OMR पत्रक',
        'मानकीकृत पर्सेंटाइल सारणी',
        'वार्षिक उपस्थिति पंजिका',
      ],
      exp: 'उपाख्यानात्मक अभिलेख में कक्षा या खेल के दौरान विद्यार्थी के विशिष्ट व्यवहार का संक्षिप्त वस्तुनिष्ठ विवरण लिखा जाता है।',
    },
  },
  {
    topic: 'Working Memory Load Reduction',
    pattern: 'Pedagogical',
    difficulty: 'Difficult',
    en: {
      q: 'When introducing a multi-step craft or science experiment to Class 3 learners, why does demonstrating one step at a time while keeping a visual icon chart visible improve accuracy?',
      opts: [
        'It prevents working memory overload during novel procedural processing',
        'It permanently eliminates the need for long-term memory storage',
        'It ensures only verbal auditory learners attend to directions',
        'It accelerates forgetting of earlier steps intentionally',
      ],
      exp: 'Young children have limited working memory capacity; chunked visual anchors free cognitive bandwidth for concept meaning.',
    },
    mr: {
      q: 'इयत्ता तिसरीच्या मुलांना नवीन विज्ञान प्रयोग शिकवताना एका वेळी एकच पायरी दाखवून समोर चित्रात्मक तक्ता ठेवल्यास अचूकता का वाढते?',
      opts: [
        'नवीन कृती करताना कार्यकारी स्मृतीवरील (Working Memory) अतिरिक्त ताण टळतो',
        'दीर्घकालीन स्मृतीची गरज कायमची संपते',
        'फक्त ऐकणाऱ्या विद्यार्थ्यांपुरतेच शिक्षण मर्यादित राहते',
        'आधीच्या पायऱ्या विसरण्यास मदत होते',
      ],
      exp: 'लहान मुलांची कार्यकारी स्मृती मर्यादित असते; टप्प्याटप्प्याने व दृश्य आधाराने शिकवल्यास आकलन सहज होते.',
    },
    hi: {
      q: 'कक्षा ३ के बच्चों को नया प्रयोग सिखाते समय एक-एक चरण दिखाकर चित्र-चार्ट सामने रखने से सटीकता क्यों बढ़ती है?',
      opts: [
        'यह नई प्रक्रिया समझते समय कार्यशील स्मृति (Working Memory) के अतिभार को रोकता है',
        'इससे दीर्घकालिक स्मृति की आवश्यकता समाप्त हो जाती है',
        'केवल श्रवण आधारित शिक्षार्थियों को लाभ होता है',
        'यह पिछले चरणों को भूलने में मदद करता है',
      ],
      exp: 'चरणबद्ध प्रदर्शन और दृश्य संकेत कार्यशील स्मृति पर अनावश्यक बोझ घटाकर समझ को स्पष्ट करते हैं।',
    },
  },
  {
    topic: 'Peer Scaffolding & Cooperative Learning',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'During a Class 5 Environmental Studies survey, mixed-ability pairs take turns interviewing elders and drafting charts together. Why is this cooperative pairing effective?',
      opts: [
        'Dialogue with a slightly more skilled partner prompts reasoning articulation and mutual scaffolding',
        'It allows the stronger child to complete 100% of the work alone while the partner copies',
        'It guarantees silent individual isolation',
        'It turns classroom work into zero-sum rank competition',
      ],
      exp: 'Structured cooperative pairs require shared accountability and explanation, driving cognitive elaboration for both partners.',
    },
    mr: {
      q: 'इयत्ता पाचवीच्या परिसर अभ्यास सर्वेक्षणात मिश्र क्षमतांच्या जोड्या एकत्र मुलाखती घेतात व तक्ते बनवतात. ही सहकारी अध्ययन पद्धती का उपयुक्त ठरते?',
      opts: [
        'सहपाठी सोबतच्या संवादातून विचारांची देवाणघेवाण व परस्पर आधार (Peer Scaffolding) मिळतो',
        'एकाने सर्व काम करावे व दुसऱ्याने फक्त उतरवावे म्हणून',
        'वर्गात संपूर्ण शांतता राहावी म्हणून',
        'श्रेणी स्पर्धा तीव्र करण्यासाठी',
      ],
      exp: 'सहकारी अध्ययनातील चर्चा आणि परस्पर जबाबदारीमुळे दोन्ही विद्यार्थ्यांचे आकलन पक्के होते.',
    },
    hi: {
      q: 'कक्षा ५ के EVS सर्वेक्षण में मिश्रित क्षमताओं की जोड़ियाँ मिलकर साक्षात्कार व चार्ट बनाती हैं। यह सहयोगात्मक युग्मन क्यों प्रभावी है?',
      opts: [
        'सहपाठी संवाद से तर्क स्पष्ट करने और परस्पर संबल (Peer Scaffolding) का अवसर मिलता है',
        'ताकि एक छात्र सारा कार्य करे और दूसरा केवल नकल उतारे',
        'पूर्ण एकाकी मौन बनाए रखने हेतु',
        'रैंक प्रतिस्पर्धा को कठोर बनाने हेतु',
      ],
      exp: 'सहयोगात्मक जोड़ी कार्य साझा उत्तरदायित्व और संवाद द्वारा दोनों शिक्षार्थियों की समझ को गहरा करता है।',
    },
  },
  {
    topic: 'Emotional Regulation & Safe Classroom Climate',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'When a Class 2 child begins crying after accidentally spilling water on her drawing sheet, what teacher response supports healthy socio-emotional development?',
      opts: [
        'Validate her feelings calmly ("I see you worked hard on that—let us blot it and rescue the paper together")',
        'Laugh playfully in front of the class to toughen her up',
        'Scold her loudly for wasting school stationery',
        'Send her straight to the principal’s office for discipline',
      ],
      exp: 'Emotional validation followed by collaborative problem-solving models self-regulation and builds psychological safety.',
    },
    mr: {
      q: 'दुसरीतील मुलीच्या चित्रकलेच्या कागदावर चुकून पाणी सांडल्यामुळे ती रडू लागते. शिक्षकांचा कोणता प्रतिसाद तिच्या भावनिक विकासासाठी योग्य ठरेल?',
      opts: [
        'शांतपणे तिची भावना समजून घेणे ("तू छान प्रयत्न केला होतास—आपण मिळून कागद कोरडा करूया")',
        'तिला कणखर बनवण्यासाठी वर्गासमोर हसून चिडवणे',
        'कागद वाया घालवला म्हणून मोठ्याने रागावणे',
        'शिस्तभंगासाठी थेट मुख्याध्यापकांकडे पाठवणे',
      ],
      exp: 'भावनांचा आदर करून सहकार्याने उपाय शोधल्यास विद्यार्थ्यात भावनिक स्थैर्य व सुरक्षिततेची भावना वाढते.',
    },
    hi: {
      q: 'कक्षा २ की बच्ची के चित्र पर गलती से पानी गिरने पर वह रोने लगती है। उसके सामाजिक-भावनात्मक विकास हेतु शिक्षक की श्रेष्ठ प्रतिक्रिया क्या होगी?',
      opts: [
        'शांति से भावना स्वीकारना ("तुमने बहुत मेहनत की थी—आओ मिलकर कागज सुखाकर ठीक करें")',
        'मजबूत बनाने के लिए कक्षा के सामने हँसना',
        'कागज बर्बाद करने पर जोर से डांटना',
        'अनुशासन हेतु प्रधानाचार्य के पास भेजना',
      ],
      exp: 'सहानुभूतिपूर्ण स्वीकृति और समाधान-उन्मुख सहायता बच्चों में भावनात्मक सुरक्षा एवं आत्म-नियमन विकसित करती है।',
    },
  },
  {
    topic: 'Hearing Impairment Seating & Visual Clues',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'What simple environmental adjustment best supports a learner with mild-to-moderate hearing impairment who relies partly on lip-reading?',
      opts: [
        'Seat her near the front in clear view, face the class while speaking (never talk while writing toward the board), and use clear gestures',
        'Speak rapidly while pacing behind students’ desks',
        'Seat her next to a noisy corridor window',
        'Eliminate written keywords on the board',
      ],
      exp: 'Front seating, well-lit unobstructed lip visibility, and written anchor cues dramatically improve classroom access.',
    },
    mr: {
      q: 'अंशतः श्रवणदोष असलेल्या व ओठांच्या हालचालींवरून (Lip-reading) अर्थ समजून घेणाऱ्या विद्यार्थ्यासाठी वर्गातील सर्वोत्तम व्यवस्था कोणती?',
      opts: [
        'पुढच्या रांगेत बसवणे, फळ्याकडे तोंड करून न बोलता वर्गाकडे पाहून स्पष्ट बोलणे आणि हावभाव-मुद्दे वापरणे',
        'वर्गाच्या मागे फिरत वेगाने बोलणे',
        'गोंगाट असलेल्या खिडकीजवळ बसवणे',
        'फळ्यावर मुख्य शब्द न लिहिणे',
      ],
      exp: 'पुढील आसनव्यवस्था, चेहऱ्यावर स्पष्ट प्रकाश आणि फळ्यावरील मुख्य मुद्दे श्रवणदोषित विद्यार्थ्यांना मोठी मदत करतात.',
    },
    hi: {
      q: 'हल्के-मध्यम श्रवण बाधिता वाले छात्र जो होंठों की गति (Lip-reading) से समझता है, उसके लिए सर्वश्रेष्ठ कक्षा व्यवस्था क्या है?',
      opts: [
        'आगे की पंक्ति में बैठाना, बोर्ड की ओर पीठ किए बिना कक्षा की ओर मुख कर स्पष्ट बोलना व दृश्य संकेत देना',
        'बच्चों की मेजों के पीछे घूमते हुए तेज़ बोलना',
        'शोरगुल वाली खिड़की के पास बैठाना',
        'श्यामपट्ट पर मुख्य शब्द न लिखना',
      ],
      exp: 'आगे बैठना, स्पष्ट मुख-दृश्यता और लिखित संकेत श्रवण बाधित विद्यार्थियों की सहभागिता सुनिश्चित करते हैं।',
    },
  },
  {
    topic: 'Thorndike Law of Readiness',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why do effective primary teachers open a lesson with a curious riddle, local story, or hands-on surprise before introducing abstract terminology?',
      opts: [
        'To activate Thorndike’s Law of Readiness (mental and emotional preparedness to learn)',
        'To exhaust working memory before the main topic starts',
        'To satisfy Thorndike’s Law of Disuse',
        'To enforce passive obedience without interest',
      ],
      exp: 'Thorndike’s Law of Readiness states that learning is satisfying and efficient when learners are mentally prepared and curious.',
    },
    mr: {
      q: 'प्राथमिक शिक्षक नवीन पाठ सुरू करण्यापूर्वी मनोरंजक कोडे, स्थानिक गोष्ट किंवा छोटी कृती का घेतात?',
      opts: [
        'थॉर्नडाइकच्या "तयारीचा नियम" (Law of Readiness) नुसार विद्यार्थ्यांची मानसिक व भावनिक पूर्वतयारी साधण्यासाठी',
        'मुख्य पाठ सुरू होण्यापूर्वीच स्मृती थकवण्यासाठी',
        'विस्मरण नियम सिद्ध करण्यासाठी',
        'आवडीशिवाय आज्ञापालन लादण्यासाठी',
      ],
      exp: 'विद्यार्थी मानसिकरीत्या उत्सुक व तयार असतील तर अध्ययन वेगाने व आनंददायी घडते (तयारीचा नियम).',
    },
    hi: {
      q: 'प्रभावी प्राथमिक शिक्षक अमूर्त शब्दावली से पहले किसी रोचक पहेली, स्थानीय कथा या गतिविधि से पाठ क्यों प्रारंभ करते हैं?',
      opts: [
        'थॉर्नडाइक के "तत्परता के नियम" (Law of Readiness) के अनुसार मानसिक व भावनात्मक तैयारी जगाने हेतु',
        'मुख्य पाठ से पहले स्मृति थकाने हेतु',
        'विस्मरण का नियम लागू करने हेतु',
        'बिना रुचि के आज्ञापालन कराने हेतु',
      ],
      exp: 'थॉर्नडाइक के तत्परता के नियम के अनुसार जब शिक्षार्थी मानसिक रूप से तैयार व जिज्ञासु होता है, तभी अधिगम प्रभावी होता है।',
    },
  },
  {
    topic: 'Play-Way Method Significance',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'In primary education (Froebel / Caldwell Cook), why is structured play considered vital rather than a waste of academic time?',
      opts: [
        'Play integrates imagination, rule-negotiation, language expression, and self-regulation naturally',
        'Play replaces all literacy and numeracy outcomes permanently',
        'Play eliminates teacher planning altogether',
        'Play prevents social interaction among peers',
      ],
      exp: 'Play-way pedagogy aligns with children’s natural curiosity, building language, social norms, and executive control simultaneously.',
    },
    mr: {
      q: 'प्राथमिक शिक्षणात (फ्रोबेल / कॉल्डवेल कुक) खेळपद्धती (Play-way) वेळेचा अपव्यय न मानता अत्यावश्यक का मानली जाते?',
      opts: [
        'खेळातून कल्पनाशक्ती, नियमांचे पालन, भाषिक अभिव्यक्ती आणि स्व-नियमन यांचा नैसर्गिक विकास होतो',
        'खेळामुळे वाचन व गणिताची गरजच राहत नाही',
        'खेळपद्धतीत शिक्षकांना कोणतेही नियोजन करावे लागत नाही',
        'खेळामुळे सहपाठी संवाद थांबतो',
      ],
      exp: 'खेळपद्धतीमुळे बालकांचा बौद्धिक, भाषिक, सामाजिक व भावनिक विकास एकाच वेळी सहज घडतो.',
    },
    hi: {
      q: 'प्राथमिक शिक्षा (फ्रोबेल / कॉल्डवेल कुक) में खेल-विधि को समय की बर्बादी न मानकर अनिवार्य क्यों माना जाता है?',
      opts: [
        'खेल कल्पनाशक्ति, नियम-समझ, भाषा अभिव्यक्ति और आत्म-नियमन को स्वाभाविक रूप से समन्वित करता है',
        'खेल से साक्षरता व संख्या-ज्ञान की आवश्यकता समाप्त हो जाती है',
        'खेल-विधि में शिक्षक को कोई तैयारी नहीं करनी पड़ती',
        'खेल सहपाठी संवाद को रोकता है',
      ],
      exp: 'खेल-आधारित शिक्षण बच्चों की स्वाभाविक जिज्ञासा से संज्ञानात्मक, सामाजिक व भाषायी कौशलों का विकास करता है।',
    },
  },
  {
    topic: 'Norm-Referenced vs Criterion-Referenced Assessment',
    pattern: 'Analytical',
    difficulty: 'Difficult',
    en: {
      q: 'When a Class 3 teacher checks whether each student can independently read an unfamiliar 60-word story with 90% accuracy against FLN benchmarks, she is using:',
      opts: [
        'Criterion-Referenced Assessment (measuring mastery against a defined competency standard)',
        'Norm-Referenced Ranking solely against top district scorers',
        'Aptitude Prognostic Testing',
        'Projective Personality Testing',
      ],
      exp: 'Criterion-referenced evaluation compares a learner’s mastery to an explicit competency benchmark rather than comparing peers against each other.',
    },
    mr: {
      q: 'इयत्ता तिसरीतील प्रत्येक विद्यार्थी किमान ६० शब्दांची अपरिचित गोष्ट ९०% अचूकतेने वाचू शकतो का, हे FLN निकषांनुसार तपासणे म्हणजे कोणते मूल्यमापन?',
      opts: [
        'निकष-संदर्भित मूल्यमापन (Criterion-Referenced Assessment)',
        'मानक-संदर्भित क्रमवारी (Norm-Referenced Ranking)',
        'अभियोग्यता भविष्यवेधी चाचणी',
        'व्यक्तिमत्त्व प्रक्षेपण चाचणी',
      ],
      exp: 'ठरवलेल्या अध्ययन निष्पत्तीच्या निकषावर विद्यार्थ्याचे प्राविण्य तपासणे म्हणजे निकष-संदर्भित मूल्यमापन होय.',
    },
    hi: {
      q: 'जब कक्षा ३ की शिक्षिका FLN मानक के अनुसार जाँचती हैं कि प्रत्येक बच्चा ६० शब्दों की अपरिचित कहानी ९०% शुद्धता से पढ़ सकता है या नहीं, तो यह कौन-सा आकलन है?',
      opts: [
        'निकष-संदर्भित आकलन (Criterion-Referenced Assessment)',
        'मानक-संदर्भित रैंक आकलन (Norm-Referenced)',
        'अभिक्षमता पूर्वानुमान परीक्षण',
        'प्रक्षेपी व्यक्तित्व परीक्षण',
      ],
      exp: 'पूर्व-निर्धारित दक्षता मानक के सापेक्ष शिक्षार्थी की दक्षता जाँचना निकष-संदर्भित आकलन कहलाता है।',
    },
  },
  {
    topic: 'RTE 2009 School Management Committee (SMC)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Under Section 21 of the RTE Act, 2009, what minimum proportion of a government/aided school’s School Management Committee (SMC) must consist of parents or guardians of enrolled children?',
      opts: [
        'Three-fourths (75%) of the members, with 50% representation for women',
        'One-tenth (10%) only',
        'Zero parents; only municipal engineers',
        'Twenty-five percent teachers and seventy-five percent contractors',
      ],
      exp: 'RTE Section 21 mandates at least 75% parents/guardians on the SMC (with 50% women) to ensure democratic local school governance.',
    },
    mr: {
      q: 'शिक्षण हक्क कायदा (RTE 2009) कलम २१ नुसार शाळा व्यवस्थापन समितीमध्ये (SMC) शाळेत शिकणाऱ्या मुलांच्या पालकांचे किमान प्रमाण किती असणे आवश्यक आहे?',
      opts: [
        'तीन-चतुर्थांश (७५%) पालक सदस्य, ज्यात ५०% महिला प्रतिनिधित्व',
        'फक्त १०% पालक',
        'पालकांना सदस्यत्व नसते',
        '२५% शिक्षक आणि ७५% कंत्राटदार',
      ],
      exp: 'RTE कलम २१ नुसार शाळा व्यवस्थापन समितीत ७५% पालक/पालकप्रतिनिधी (५०% महिला) असणे बंधनकारक आहे.',
    },
    hi: {
      q: 'RTE अधिनियम २००९ की धारा २१ के अनुसार विद्यालय प्रबंधन समिति (SMC) में नामांकित बच्चों के माता-पिता/अभिभावकों का न्यूनतम अनुपात कितना होना चाहिए?',
      opts: [
        'तीन-चौथाई (७५%) सदस्य, जिनमें ५०% महिलाएँ हों',
        'केवल १०% सदस्य',
        'शून्य अभिभावक; केवल नगर अभियंता',
        '२५% शिक्षक एवं ७५% ठेकेदार',
      ],
      exp: 'आरटीई धारा २१ के तहत एसएमसी के तीन-चौथाई (७५%) सदस्य विद्यार्थियों के अभिभावक होते हैं, जिनमें आधी महिलाएँ होती हैं।',
    },
  },
  // ===================== TEST 3 (30 Qs) =====================
  {
    topic: 'Piaget Seriation & Transitivity',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Eight-year-old Tanvi arranges ten sticks rapidly from shortest to longest and deduces that if Stick A > B and B > C, then A > C. Which two Concrete Operational skills are shown?',
      opts: [
        'Seriation and Transitive Inference',
        'Object permanence and Deferred imitation',
        'Animism and Artificialism',
        'Preoperational symbolic centration',
      ],
      exp: 'Seriation orders objects along a quantitative dimension; transitivity infers indirect size relations logically.',
    },
    mr: {
      q: 'आठ वर्षांची तन्वी दहा काड्या लांबीनुसार चढत्या क्रमाने लावते आणि काडी A > B व B > C असल्यास A > C हे ओळखते. मूर्त क्रियात्मक अवस्थेतील या कोणत्या दोन क्षमता आहेत?',
      opts: [
        'क्रमबद्धता (Seriation) आणि संक्रमण अनुमान (Transitivity)',
        'वस्तू-स्थायित्व आणि विलंबित अनुकरण',
        'सजीवत्वारोपण आणि कृत्रिमतावाद',
        'पूर्व-क्रियात्मक केंद्रीकरण',
      ],
      exp: 'लांबी/आकारानुसार क्रम लावणे म्हणजे क्रमबद्धता (Seriation) आणि अप्रत्यक्ष तुलना जोडणे म्हणजे Transitivity होय.',
    },
    hi: {
      q: 'आठ वर्षीय तन्वी दस छड़ियों को सबसे छोटी से सबसे लंबी के क्रम में लगाती है और समझती है कि यदि A > B तथा B > C, तो A > C होगा। ये कौन-सी क्षमताएँ हैं?',
      opts: [
        'क्रमबद्धता (Seriation) और सकर्मक अनुमान (Transitivity)',
        'वस्तु स्थायित्व और विलंबित अनुकरण',
        'जीववाद और कृत्रिमतावाद',
        'पूर्व-संक्रियात्मक केंद्रीकरण',
      ],
      exp: 'आकारानुसार क्रम में सजाना क्रमबद्धता तथा अप्रत्यक्ष संबंध निकालना सकर्मक अनुमान है, जो मूर्त संक्रियात्मक अवस्था में आता है।',
    },
  },
  {
    topic: 'Piaget Class Inclusion',
    pattern: 'Analytical',
    difficulty: 'Difficult',
    en: {
      q: 'Shown a basket with 7 marigold flowers and 3 roses, a 5-year-old says there are "more marigolds than flowers", whereas a 9-year-old says there are "more flowers than marigolds." Why?',
      opts: [
        'The 9-year-old has mastered hierarchical Class Inclusion (part-whole reasoning)',
        'The 5-year-old cannot count up to ten accurately',
        'The 9-year-old has reached Formal Operational hypothetical deduction',
        'Floral vocabulary begins only in Class 4',
      ],
      exp: 'Class inclusion (understanding a superordinate class "flowers" contains subordinate "marigolds" and "roses") marks the Concrete Operational stage.',
    },
    mr: {
      q: 'टोपलीत ७ झेंडूची आणि ३ गुलाबाची फुले दाखवून विचारल्यास ५ वर्षांचे मूल "फुलांपेक्षा झेंडू जास्त" म्हणते, तर ९ वर्षांचे मूल "झेंडूपेक्षा फुले जास्त" म्हणते. कारण कोणते?',
      opts: [
        '९ वर्षांच्या मुलाने वर्ग-समावेशकता (Class Inclusion – भाग आणि पूर्ण यांचा संबंध) आत्मसात केली आहे',
        '५ वर्षांच्या मुलाला १० पर्यंत मोजता येत नाही',
        '९ वर्षांचे मूल औपचारिक क्रियात्मक अवस्थेत पोहोचले आहे',
        'फुलांची नावे फक्त चौथीत शिकवली जातात',
      ],
      exp: '"फुले" या मुख्य वर्गात झेंडू व गुलाब दोन्ही उपवर्ग समाविष्ट आहेत ही जाणीव म्हणजे वर्ग-समावेशकता (Class Inclusion).',
    },
    hi: {
      q: 'टोकरी में ७ गेंदे व ३ गुलाब के फूल दिखाकर पूछने पर ५ वर्षीय बच्चा "फूलों से ज़्यादा गेंदे" कहता है, पर ९ वर्षीय "गेंदों से ज़्यादा फूल" बताता है। कारण क्या है?',
      opts: [
        '९ वर्षीय बच्चे ने श्रेणी-समावेशन (Class Inclusion – अंश-पूर्ण संबंध) समझ लिया है',
        '५ वर्षीय बच्चा दस तक गिन नहीं सकता',
        '९ वर्षीय बच्चा औपचारिक संक्रियात्मक अवस्था में है',
        'फूलों की शब्दावली केवल कक्षा ४ में आती है',
      ],
      exp: 'उपवर्ग (गेंदा) मुख्य वर्ग (फूल) का भाग है—यह समझ श्रेणी-समावेशन कहलाती है जो मूर्त संक्रियात्मक अवस्था में आती है।',
    },
  },
  {
    topic: 'Mahatma Gandhi Nai Talim (Basic Education)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'What was the central pedagogical aim of Mahatma Gandhi’s Wardha Scheme / Nai Talim (1937)?',
      opts: [
        'Integrating productive local craft work with Head, Heart, and Hand (3Hs) through mother-tongue instruction',
        'Preparing clerical assistants exclusively for colonial offices via English',
        'Separating manual labour from intellectual schooling completely',
        'Banning community crafts inside schools',
      ],
      exp: 'Nai Talim harmonized intellectual, moral, and productive manual education (Head, Heart, Hand) in the mother tongue.',
    },
    mr: {
      q: 'महात्मा गांधींच्या वर्धा शिक्षण योजना / नई तालीम (१९३७) चे मुख्य शैक्षणिक उद्दिष्ट कोणते होते?',
      opts: [
        'मातृभाषेतून उत्पादक हस्तव्यवसायाशी जोडलेले डोके, हृदय आणि हात (3Hs) यांचे एकात्मिक शिक्षण',
        'इंग्रजीतून केवळ सरकारी कारकून तयार करणे',
        'बौद्धिक शिक्षण व श्रमकार्य पूर्णपणे वेगळे ठेवणे',
        'शाळेतून स्थानिक कौशल्ये हद्दपार करणे',
      ],
      exp: 'गांधीजींच्या नई तालीममध्ये मातृभाषा आणि श्रमयुक्त उत्पादक कौशल्याद्वारे सर्वांगीण विकास अभिप्रेत होता.',
    },
    hi: {
      q: 'महात्मा गांधी की वर्धा शिक्षा योजना / नई तालीम (१९३७) का केंद्रीय शिक्षण उद्देश्य क्या था?',
      opts: [
        'मातृभाषा के माध्यम से उत्पादक हस्तशिल्प के साथ मस्तिष्क, हृदय और हाथ (3Hs) का समन्वित विकास',
        'अंग्रेज़ी द्वारा केवल औपनिवेशिक लिपिक तैयार करना',
        'शारीरिक श्रम को बौद्धिक अध्ययन से पूर्णतः अलग करना',
        'विद्यालयों में स्थानीय शिल्प पर रोक लगाना',
      ],
      exp: 'नई तालीम मातृभाषा और सार्थक उत्पादक कार्य के माध्यम से सर्वांगीण मानवीय विकास पर आधारित थी।',
    },
  },
  {
    topic: 'RTE 2009 No Screening or Capitation',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'A private primary school conducts a formal entrance interview of parents and demands a non-refundable "building fund donation" before Class 1 admission. Which RTE Act 2009 section does this violate?',
      opts: [
        'Section 13 (prohibition of capitation fee and screening procedure)',
        'Section 24 (teacher duties on attendance)',
        'Section 29 (academic curriculum authority)',
        'Section 2 (definitions only)',
      ],
      exp: 'Section 13 of the RTE Act 2009 strictly bars capitation fees and screening interviews/tests of children or parents.',
    },
    mr: {
      q: 'एक खाजगी प्राथमिक शाळा इयत्ता पहिलीच्या प्रवेशापूर्वी पालकांची मुलाखत घेते आणि ना-परतावा "इमारत निधी" मागते. हा प्रकार RTE 2009 च्या कोणत्या कलमाचे उल्लंघन करतो?',
      opts: [
        'कलम १३ (प्रवेशासाठी देणगी/कॅपिटेशन फी व चाळणी चाचणीस बंदी)',
        'कलम २४ (शिक्षकांची कर्तव्ये)',
        'कलम २९ (अभ्यासक्रम प्राधिकरण)',
        'कलम २ (केवळ व्याख्या)',
      ],
      exp: 'RTE कलम १३ नुसार प्रवेशासाठी कोणतीही चाळणी परीक्षा, पालकांची मुलाखत किंवा देणगी घेणे कायद्याने गुन्हा आहे.',
    },
    hi: {
      q: 'एक निजी प्राथमिक विद्यालय कक्षा १ में प्रवेश से पहले अभिभावकों का साक्षात्कार लेता है और अप्रतिदेय "भवन निधि" माँगता है। यह RTE २००९ की किस धारा का उल्लंघन है?',
      opts: [
        'धारा १३ (प्रतिव्यक्ति शुल्क और अनुवीक्षण प्रक्रिया का निषेध)',
        'धारा २४ (शिक्षक कर्तव्य)',
        'धारा २९ (पाठ्यक्रम प्राधिकारी)',
        'धारा २ (केवल परिभाषाएँ)',
      ],
      exp: 'आरटीई अधिनियम की धारा १३ कैपिटेशन शुल्क तथा बच्चे या माता-पिता की स्क्रीनिंग परीक्षा पर पूर्ण रोक लगाती है।',
    },
  },
  {
    topic: 'Language and Thought Self-Regulation',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Why does encouraging Class 3 students to "think aloud" and explain their solution steps to a partner strengthen conceptual clarity?',
      opts: [
        'Verbalizing reasoning exposes hidden gaps and helps learners organize mental schemas coherently',
        'Talking aloud keeps students too busy to notice textbook diagrams',
        'Oral explanation replaces all written work forever',
        'Listening to peers creates cognitive silence',
      ],
      exp: 'Articulating thought in language forces learners to sequence steps logically and monitor comprehension.',
    },
    mr: {
      q: 'इयत्ता तिसरीतील विद्यार्थ्यांना गणिताच्या पायऱ्या जोडीदाराला मोठ्याने समजावून सांगण्यास ("Think Aloud") प्रोत्साहन दिल्यास संकल्पना का स्पष्ट होतात?',
      opts: [
        'विचारांना शब्दांत मांडताना स्वतःच्या आकलनातील उणिवा लक्षात येतात व मानसिक रचना सुसूत्र होते',
        'बोलण्यामुळे पाठ्यपुस्तकातील आकृत्यांकडे लक्ष जात नाही',
        'तोंडी सांगण्याने लेखी कामाची गरज कायमची संपते',
        'सहपाठ्यांचे ऐकल्याने विचार थांबतात',
      ],
      exp: 'आपला विचार शब्दांत व्यक्त करताना संकल्पनेची तार्किक सुसूत्रता पक्की होते.',
    },
    hi: {
      q: 'कक्षा ३ के छात्रों को समाधान के चरण सहपाठी को बोलकर समझाने ("Think Aloud") के लिए प्रेरित करने से अवधारणात्मक स्पष्टता क्यों बढ़ती है?',
      opts: [
        'तर्क को शब्दों में पिरोने से छिपी कमियाँ उजागर होती हैं और मानसिक संरचना सुव्यवस्थित होती है',
        'बोलने से पाठ्यपुस्तक के चित्रों पर ध्यान नहीं जाता',
        'मौखिक व्याख्या लिखित कार्य को हमेशा के लिए समाप्त कर देती है',
        'सहपाठी की बात सुनने से चिंतन रुक जाता है',
      ],
      exp: 'अपने विचार को भाषा में व्यक्त करने से तार्किक क्रम बनता है और स्व-निरीक्षण क्षमता बढ़ती है।',
    },
  },
  {
    topic: 'Sternberg Triarchic Intelligence',
    pattern: 'Conceptual',
    difficulty: 'Difficult',
    en: {
      q: 'A Class 5 student shows remarkable "street-smart" skill negotiating fair game teams on the playground and adapting to unfamiliar group roles. Which aspect of Sternberg’s Triarchic Theory stands out?',
      opts: [
        'Contextual / Practical Intelligence',
        'Componential / Analytical Intelligence alone',
        'Pure Fluid Spatial Rotation',
        'Linguistic Phonemic Decoding',
      ],
      exp: 'Sternberg’s Triarchic Theory comprises Analytical (componential), Creative (experiential), and Practical (contextual) intelligence.',
    },
    mr: {
      q: 'इयत्ता पाचवीतील विद्यार्थी मैदानावर खेळात न्याय्य गट पाडणे आणि नवीन परिस्थितीशी चपळ जुळवून घेणे यात तरबेज आहे. स्टर्नबर्गच्या त्रिघटक बुद्धिमत्तेतील कोणता पैलू येथे दिसतो?',
      opts: [
        'संदर्भात्मक / व्यावहारिक बुद्धिमत्ता (Practical Intelligence)',
        'केवळ विश्लेषणात्मक बुद्धिमत्ता',
        'निव्वळ अवकाशीय फिरवणे',
        'ध्वनी-अक्षर वाचन कौशल्य',
      ],
      exp: 'दैनंदिन जीवनातील प्रसंगांत प्रभावीपणे जुळवून घेणे व प्रश्न सोडवणे म्हणजे स्टर्नबर्गची व्यावहारिक (Practical) बुद्धिमत्ता.',
    },
    hi: {
      q: 'कक्षा ५ का छात्र खेल के मैदान में न्यायसंगत दल बनाने और नई सामाजिक परिस्थितियों से तालमेल बिठाने में कुशल है। स्टर्नबर्ग के त्रि-चापीय सिद्धांत का कौन-सा पक्ष प्रमुख है?',
      opts: [
        'व्यावहारिक / संदर्भगत बुद्धि (Practical Intelligence)',
        'केवल विश्लेषणात्मक बुद्धि',
        'शुद्ध स्थानिक घूर्णन',
        'ध्वनि-संकेत पठन',
      ],
      exp: 'दैनिक परिवेश से प्रभावी समायोजन व व्यवहार-कौशल स्टर्नबर्ग के त्रि-चापीय सिद्धांत की व्यावहारिक बुद्धि है।',
    },
  },
  {
    topic: 'Dyspraxia Motor Coordination',
    pattern: 'Classroom Scenario',
    difficulty: 'Difficult',
    en: {
      q: 'A Class 3 learner grasps science concepts quickly but trips frequently, struggles to tie shoelaces or cut paper along lines with scissors, and drops crayons often. Which condition should the teacher consider?',
      opts: [
        'Dyspraxia (Developmental Coordination Disorder)',
        'Dyscalculia',
        'Expressive aphasia',
        'Photophobia',
      ],
      exp: 'Dyspraxia impairs gross and fine motor planning/coordination (balance, scissors, lacing) without impairing intellectual comprehension.',
    },
    mr: {
      q: 'इयत्ता तिसरीतील विद्यार्थ्याला विज्ञान संकल्पना चटकन कळतात, पण चालताना तो अडखळतो, बूट बांधणे किंवा कात्रीने रेषेवर कापणे त्याला जमत नाही. येथे कोणती शक्यता विचारात घ्यावी?',
      opts: [
        'डिसप्रॅक्सिया (कारक समन्वय अक्षमता / Dyspraxia)',
        'डिस्कॅल्क्युलिया',
        'अभिव्यक्ती वाचाघात',
        'प्रकाश संवेदनशीलता',
      ],
      exp: 'बौद्धिक क्षमता ठीक असूनही सूक्ष्म व स्थूल स्नायूंच्या समन्वयात अडचण असणे हे डिसप्रॅक्सियाचे लक्षण आहे.',
    },
    hi: {
      q: 'कक्षा ३ का छात्र विज्ञान जल्दी समझता है, पर अक्सर लड़खड़ाता है, जूते के फीते बाँधने या कैंची से सीधी रेखा काटने में जूझता है। शिक्षक को किस स्थिति पर ध्यान देना चाहिए?',
      opts: [
        'डिस्प्रैक्सिया (विकासात्मक गत्यात्मक समन्वय विकार)',
        'डिस्कैल्कुलिया',
        'अभिव्यंजक वाचाघात',
        'फोटोफोबिया',
      ],
      exp: 'बौद्धिक समझ सामान्य रहते हुए सूक्ष्म और स्थूल पेशीय नियोजन-समन्वय की कठिनाई डिस्प्रैक्सिया कहलाती है।',
    },
  },
  {
    topic: 'Intrinsic Attribution Theory (Weiner)',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'After improving her science score from 12/25 to 21/25, Sneha says, "Drawing labelled diagrams every evening helped me understand!" According to Attribution Theory, this reflects:',
      opts: [
        'Internal, controllable effort/strategy attribution that builds resilience',
        'External, uncontrollable luck attribution',
        'Fixed-ability fatalism',
        'Social comparison dependency',
      ],
      exp: 'Attributing success to controllable strategy and effort empowers persistence when facing future challenges.',
    },
    mr: {
      q: 'विज्ञानातील गुण १२/२५ वरून २१/२५ वर गेल्यावर स्नेहा म्हणते, "दररोज संध्याकाळी नामनिर्देशित आकृत्या काढल्यामुळे मला विषय नीट समजला!" गुणनिवेदन सिद्धांतानुसार (Attribution) हे काय दर्शवते?',
      opts: [
        'आंतरिक व नियंत्रणाखालील प्रयत्न-कार्यनीती श्रेय, जे चिकाटी वाढवते',
        'बाह्य व अनियंत्रित नशीबवादी दृष्टिकोन',
        'स्थिर बुद्धिमत्तेचा दैववाद',
        'सामाजिक तुलनेवरील अवलंबित्व',
      ],
      exp: 'यश किंवा अपयश स्वतःच्या नियंत्रणाखालील प्रयत्न व अभ्यासपद्धतीमुळे घडते ही भावना चिकाटी आणि आत्मविश्वास वाढवते.',
    },
    hi: {
      q: 'विज्ञान में अंक १२/२५ से २१/२५ होने पर स्नेहा कहती है, "रोज़ नामांकित चित्र बनाने से मुझे विषय समझ आया!" आरोपण सिद्धांत के अनुसार यह क्या दर्शाता है?',
      opts: [
        'आंतरिक एवं नियंत्रणीय प्रयास-रणनीति आरोपण, जो जुझारूपन बढ़ाता है',
        'बाहरी अनियंत्रणीय भाग्य आरोपण',
        'स्थिर-योग्यता नियतिवाद',
        'सामाजिक तुलना निर्भरता',
      ],
      exp: 'सफलता को अपने नियंत्रणीय प्रयास व रणनीति से जोड़ना शिक्षार्थी में आत्म-प्रभावकारिता और धैर्य बढ़ाता है।',
    },
  },
  {
    topic: 'Zone of Proximal Development Peer Contrast',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Which statement accurately expresses what falls OUTSIDE a learner’s current Zone of Proximal Development (ZPD)?',
      opts: [
        'Both tasks the child already masters effortlessly alone AND tasks too advanced to attempt even with expert scaffolding',
        'Tasks solved only after watching a peer demonstrate one helpful clue',
        'Collaborative tasks guided by teacher prompting questions',
        'Exercises requiring shared vocabulary modeling',
      ],
      exp: 'ZPD sits strictly between independent mastery (lower boundary) and current unachievable frustration level even with guidance (upper boundary).',
    },
    mr: {
      q: 'कोणती कामे विद्यार्थ्यांच्या सध्याच्या समीपस्थ विकास क्षेत्राच्या (ZPD) बाहेर असतात?',
      opts: [
        'विद्यार्थी मदतीशिवाय सहज करू शकतो ती कामे आणि तज्ज्ञांच्या मदतीनेही सध्या न झेपणारी अतिशय कठीण कामे',
        'मित्रांनी एक संकेत दिल्यावर सुटणारी कामे',
        'शिक्षकांच्या मार्गदर्शक प्रश्नांनी सुटणारे उपक्रम',
        'संवादात्मक शब्दसंग्रह कृती',
      ],
      exp: 'ZPD म्हणजे स्वतंत्रपणे येणारे काम आणि मदतीने करता येणारे काम यामधील नेमके आव्हानात्मक क्षेत्र होय.',
    },
    hi: {
      q: 'कौन-से कार्य विद्यार्थी के वर्तमान समीपस्थ विकास क्षेत्र (ZPD) से बाहर होते हैं?',
      opts: [
        'वे कार्य जो बच्चा बिना सहायता सहज कर ले तथा वे कार्य जो विशेषज्ञ सहायता से भी अभी पहुँच से बाहर हों',
        'वे कार्य जो सहपाठी के हल्के संकेत से हल हो जाएँ',
        'शिक्षक के मार्गदर्शक प्रश्नों से सुलझने वाले कार्य',
        'साझा शब्दावली मॉडलिंग की गतिविधियाँ',
      ],
      exp: 'ZPD स्वतंत्र स्तर से ऊपर और सहायता के साथ भी असंभव स्तर से नीचे के मध्य का सक्रिय अधिगम क्षेत्र है।',
    },
  },
  {
    topic: 'CCE Scholastic vs Co-Scholastic Integration',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why did Continuous and Comprehensive Evaluation (CCE) introduce "Comprehensive" alongside "Continuous"?',
      opts: [
        'To evaluate co-scholastic habits—values, life skills, art, sports, and teamwork—alongside academic subjects',
        'To conduct full-syllabus board exams every single Monday',
        'To grade only neatness of science practical journals',
        'To restrict assessment strictly to arithmetic speed tests',
      ],
      exp: '"Continuous" refers to regularity of formative checks; "Comprehensive" covers both scholastic and co-scholastic whole-child growth.',
    },
    mr: {
      q: 'सातत्यपूर्ण सर्वंकष मूल्यमापनात (CCE) "सातत्यपूर्ण" सोबत "सर्वंकष" (Comprehensive) हा शब्द का समाविष्ट आहे?',
      opts: [
        'शालेय विषयांसोबतच जीवनकौशल्ये, कला, क्रीडा, मूल्ये व सहकार्य या सहशालेय पैलूंचे मूल्यमापन करण्यासाठी',
        'दर सोमवारी संपूर्ण अभ्यासक्रमाची परीक्षा घेण्यासाठी',
        'केवळ प्रयोगवहीच्या स्वच्छतेला गुण देण्यासाठी',
        'मूल्यमापन फक्त गणिताच्या वेगापुरते मर्यादित ठेवण्यासाठी',
      ],
      exp: '"सर्वंकष" म्हणजे बालकाच्या शैक्षणिक आणि सह-शैक्षणिक (भावनिक, सामाजिक, कला-क्रीडा) अशा सर्वांगीण विकासाचे मूल्यमापन.',
    },
    hi: {
      q: 'सतत एवं व्यापक मूल्यांकन (CCE) में "सतत" के साथ "व्यापक" (Comprehensive) शब्द क्यों जोड़ा गया है?',
      opts: [
        'शैक्षिक विषयों के साथ-साथ जीवन कौशल, मूल्य, कला, खेल और सहयोग जैसे सह-शैक्षिक पक्षों के आकलन हेतु',
        'हर सोमवार संपूर्ण पाठ्यक्रम की परीक्षा लेने हेतु',
        'केवल प्रयोग पुस्तिका की सफाई अंकित करने हेतु',
        'मूल्यांकन को केवल गणितीय गति तक सीमित रखने हेतु',
      ],
      exp: '"व्यापक" का अर्थ बच्चे के शैक्षिक और सह-शैक्षिक दोनों आयामों का समग्र आकलन करना है।',
    },
  },
  {
    topic: 'NEP 2020 NIPUN Bharat Mission Target',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What is the core national objective of the NIPUN Bharat Mission aligned with NEP 2020?',
      opts: [
        'Ensuring universal Foundational Literacy and Numeracy (FLN) for every child by the end of Grade 3',
        'Mandating competitive coding entrance exams for nursery children',
        'Replacing Class 1–3 regional storybooks with college reference texts',
        'Conducting state board merit scholarships at age four',
      ],
      exp: 'NIPUN Bharat prioritizes reading with comprehension and basic numeracy mastery for every child by Grade 3 (ages 8–9).',
    },
    mr: {
      q: 'NEP 2020 शी सुसंगत "निपुण भारत" (NIPUN Bharat) अभियानाचे मुख्य राष्ट्रीय उद्दिष्ट कोणते आहे?',
      opts: [
        'इयत्ता तिसरीअखेर प्रत्येक बालकामध्ये पायाभूत साक्षरता व संख्याज्ञान (FLN) शतप्रतिशत विकसित करणे',
        'नर्सरीतील मुलांसाठी स्पर्धात्मक कोडिंग परीक्षा सक्तीची करणे',
        'इयत्ता १ ते ३ च्या गोष्टींच्या पुस्तकांऐवजी महाविद्यालयीन संदर्भग्रंथ ठेवणे',
        'वयाच्या चौथ्या वर्षी शिष्यवृत्ती परीक्षा घेणे',
      ],
      exp: 'इयत्ता तिसरीच्या अखेरीस सर्व विद्यार्थ्यांनी समजपूर्वक वाचन व मूलभूत संख्याक्रिया साध्य करणे हे निपुण भारतचे लक्ष्य आहे.',
    },
    hi: {
      q: 'NEP 2020 के अनुरूप "निपुण भारत" (NIPUN Bharat) मिशन का मुख्य राष्ट्रीय लक्ष्य क्या है?',
      opts: [
        'कक्षा ३ के अंत तक प्रत्येक बच्चे में बुनियादी साक्षरता और संख्याज्ञान (FLN) सुनिश्चित करना',
        'नर्सरी बच्चों हेतु प्रतिस्पर्धी कोडिंग प्रवेश परीक्षा अनिवार्य करना',
        'कक्षा १–३ की कहानियों की जगह कॉलेज संदर्भ ग्रंथ लागू करना',
        'चार वर्ष की आयु में राज्य छात्रवृत्ति परीक्षा आयोजित करना',
      ],
      exp: 'निपुण भारत मिशन का लक्ष्य है कि कक्षा ३ तक हर बच्चा समझ के साथ पढ़ना और बुनियादी गणित हल करना सीख जाए।',
    },
  },
  {
    topic: 'Pavlov Generalization vs Discrimination',
    pattern: 'Analytical',
    difficulty: 'Difficult',
    en: {
      q: 'A young pupil initially fears all white-coated adults after a painful clinic injection, yet happily greets her white-coated school science lab helper once she learns the difference. She exhibits:',
      opts: [
        'Stimulus Discrimination following initial Stimulus Generalization',
        'Spontaneous recovery after complete forgetting',
        'Operant shaping via monetary tokens',
        'Sensorimotor circular reaction',
      ],
      exp: 'Responding similarly to alike cues is generalization; distinguishing safe vs feared cues is stimulus discrimination.',
    },
    mr: {
      q: 'दवाखान्यातील वेदनादायक इंजेक्शननंतर लहान मूल सर्व पांढरा कोट घातलेल्या व्यक्तींना घाबरते, परंतु शाळेतील पांढरा कोट घातलेल्या प्रयोगशाळा सहायकाशी ते आनंदाने बोलते. येथे कोणती प्रक्रिया घडली?',
      opts: [
        'प्रारंभिक उद्दीपक सामान्यीकरणानंतर झालेला उद्दीपक भेदभाव (Stimulus Discrimination)',
        'पूर्ण विस्मरणानंतरची उत्स्फूर्त पुनर्प्राप्ती',
        'आर्थिक बक्षिसावर आधारित वर्तन घडवणूक',
        'संवेदनकारक वर्तुळाकार प्रतिक्रिया',
      ],
      exp: 'समान दिसणाऱ्या उद्दीपकांमधील फरक ओळखून नेमका प्रतिसाद देणे म्हणजे उद्दीपक भेदभाव (Discrimination).',
    },
    hi: {
      q: 'क्लीनिक के दर्दनाक इंजेक्शन के बाद एक बच्चा सफेद कोट वाले सभी लोगों से डरता है, परंतु अंतर समझकर विद्यालय के सफेद कोट वाले प्रयोगशाला सहायक से मुस्कुराकर मिलता है। यह क्या दर्शाता है?',
      opts: [
        'प्रारंभिक उद्दीपक सामान्यीकरण के पश्चात उद्दीपक विभेदन (Stimulus Discrimination)',
        'पूर्ण विस्मरण के बाद स्वतः पुनर्प्राप्ति',
        'आर्थिक पुरस्कार द्वारा आकार देना',
        'संवेदी-पेशीय वृत्तीय प्रतिक्रिया',
      ],
      exp: 'समान उद्दीपकों में अंतर पहचानकर अलग प्रतिक्रिया देना उद्दीपक विभेदन कहलाता है।',
    },
  },
  {
    topic: 'Democratic vs Authoritarian Teaching Style',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Which classroom climate best nurtures mutual respect, self-discipline, and fearless curiosity among Class 4 learners?',
      opts: [
        'Authoritative-democratic guidance combining warm support with clear, jointly discussed norms',
        'Harsh authoritarian fear using shouting and threats of public punishment',
        'Laissez-faire chaos with zero guidance or structure',
        'Unpredictable favouritism toward high scorers',
      ],
      exp: 'Authoritative-democratic classrooms blend high warmth and student voice with consistent, fair boundaries.',
    },
    mr: {
      q: 'इयत्ता चौथीच्या विद्यार्थ्यांमध्ये परस्पर आदर, स्वयंशिस्त आणि निर्भय जिज्ञासा कोणत्या वर्ग वातावरणात सर्वाधिक फुलते?',
      opts: [
        'विद्यार्थ्यांच्या सहभागातून ठरवलेले स्पष्ट नियम व स्नेहपूर्ण आधार असलेले लोकशाही वातावरण',
        'ओरडणे व जाहीर शिक्षेची भीती घालणारे हुकूमशाही वातावरण',
        'कोणतेही नियम किंवा मार्गदर्शन नसलेला स्वैर गोंधळ',
        'केवळ जास्त गुण मिळणाऱ्यांचा पक्षपात करणारे वर्तन',
      ],
      exp: 'स्नेहपूर्ण संवाद आणि सहमतीने ठरवलेले स्पष्ट नियम लोकशाही वर्गात स्वयंशिस्त घडवतात.',
    },
    hi: {
      q: 'कक्षा ४ के विद्यार्थियों में पारस्परिक सम्मान, आत्म-अनुशासन और निर्भय जिज्ञासा किस कक्षा परिवेश में सर्वाधिक विकसित होती है?',
      opts: [
        'स्नेहपूर्ण सहयोग और संवाद से तय स्पष्ट नियमों वाला लोकतांत्रिक परिवेश',
        'चिल्लाने और सार्वजनिक दंड के भय वाला निरंकुश परिवेश',
        'बिना किसी मार्गदर्शन या नियम वाला अनियंत्रित माहौल',
        'केवल उच्च अंक वालों का पक्षपात करने वाला व्यवहार',
      ],
      exp: 'लोकतांत्रिक कक्षा परिवेश आत्मीयता, विद्यार्थी भागीदारी और न्यायसंगत नियमों का संतुलन बनाता है।',
    },
  },
  {
    topic: 'Multilingual Bridge in First-Generation Homes',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A student whose family speaks Banjara or Bhili at home hesitates to speak during Marathi/English periods. How should a responsive Class 1 teacher welcome the child?',
      opts: [
        'Encourage her to share stories in her home language first, display bilingual picture word-walls, and gradually bridge toward the school language',
        'Correct every dialect word publicly and forbid home speech',
        'Treat her silence as low intelligence',
        'Assign extra silent copying sheets until her accent disappears',
      ],
      exp: 'Affirming home language preserves emotional security and transfers oral narrative competence directly into school literacy.',
    },
    mr: {
      q: 'घरी बंजारा किंवा भिल्ली बोली बोलणारा विद्यार्थी पहिलीच्या वर्गात मराठी/इंग्रजी तासाला बोलायला कचरतो. संवेदनशील शिक्षकाने काय करावे?',
      opts: [
        'सुरुवातीला त्याच्या घरच्या भाषेत अनुभव मांडू देऊन, द्विभाषिक चित्रतक्त्यांच्या मदतीने हळूहळू शालेय भाषेचा पूल बांधावा',
        'बोली शब्दांवर जाहीर टीका करून घरची भाषा वर्गात बंद करावी',
        'त्याच्या शांत राहण्याचा अर्थ कमी बुद्धिमत्ता असा लावावा',
        'उच्चार बदलेपर्यंत मूक लेखनाचे जादा पान लिहून घ्यावे',
      ],
      exp: 'बालकाच्या घरच्या भाषेचा सन्मान करून तिच्या आधारे शालेय भाषा शिकवल्यास आत्मविश्वास व आकलन दोन्ही वाढतात.',
    },
    hi: {
      q: 'घर पर बंजारा या भीली बोली बोलने वाला कक्षा १ का छात्र विद्यालयी भाषा में बोलने से झिझकता है। संवेदनशील शिक्षक को क्या करना चाहिए?',
      opts: [
        'पहले घर की भाषा में अपने अनुभव सुनाने का अवसर देकर द्विभाषिक चित्र-दीवार से धीरे-धीरे विद्यालयी भाषा से जोड़ना',
        'बोली के शब्दों पर सार्वजनिक टोककर घर की भाषा वर्जित करना',
        'उसकी चुप्पी को कम बुद्धि मान लेना',
        'उच्चारण बदलने तक अतिरिक्त नकल कार्य देना',
      ],
      exp: 'मातृभाषा/बोली को सम्मान और सेतु बनाने से प्रथम पीढ़ी के शिक्षार्थी में आत्मविश्वास तथा सहज पठन-लेखन विकसित होता है।',
    },
  },
  {
    topic: 'Rubrics for Subjective Project Grading',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Why does sharing an explicit 4-level scoring rubric with students BEFORE they build an EVS poster increase fairness and quality?',
      opts: [
        'Learners clearly understand performance criteria (accuracy, clarity, creativity) beforehand and monitor their own work',
        'It guarantees every student receives identical marks automatically',
        'It prevents students from asking teacher questions during work',
        'It eliminates the need for reading project content',
      ],
      exp: 'Transparent rubrics demystify expectations, reduce subjective bias, and empower self-assessment during creation.',
    },
    mr: {
      q: 'परिसर अभ्यासाचे भित्तिपत्रक (Poster) तयार करण्यापूर्वीच ४-स्तरीय मूल्यमापन रुब्रिक विद्यार्थ्यांना दाखवल्यास न्याय्यता व गुणवत्ता का वाढते?',
      opts: [
        'अपेक्षित निकष (अचूकता, स्पष्टता, सर्जनशीलता) आधीच कळल्याने विद्यार्थी स्वतःच्या कामाचे नियोजन व स्व-तपासणी करू शकतात',
        'यामुळे प्रत्येक विद्यार्थ्याला आपोआप समान गुण मिळतात',
        'काम करताना प्रश्न विचारण्याची गरज राहत नाही',
        'प्रकल्प मजकूर वाचण्याची गरज उरत नाही',
      ],
      exp: 'स्पष्ट रुब्रिक्समुळे मूल्यमापनातील व्यक्तिनिष्ठता कमी होते व विद्यार्थ्यांना गुणवत्तेचे निकष आधीच समजतात.',
    },
    hi: {
      q: 'EVS पोस्टर बनवाने से पहले ही ४-स्तरीय स्कोरिंग रुब्रिक विद्यार्थियों से साझा करने पर निष्पक्षता और गुणवत्ता क्यों बढ़ती है?',
      opts: [
        'छात्र पहले से सटीकता, स्पष्टता और रचनात्मकता के मानदंड समझकर स्व-आकलन व सुधार कर पाते हैं',
        'इससे हर बच्चे को स्वतः समान अंक मिल जाते हैं',
        'इससे कार्य के दौरान प्रश्न पूछना बंद हो जाता है',
        'परियोजना सामग्री पढ़ने की आवश्यकता नहीं रहती',
      ],
      exp: 'पारदर्शी रुब्रिक अपेक्षाओं को स्पष्ट करता है, शिक्षक के पक्षपात को घटाता है और स्व-सुधार को बढ़ावा देता है।',
    },
  },
  {
    topic: 'Bruner Three Modes of Representation',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In Jerome Bruner’s cognitive theory, what is the natural learning sequence when introducing new mathematical or scientific ideas to children?',
      opts: [
        'Enactive (hands-on action) -> Iconic (visual images) -> Symbolic (abstract words/numbers)',
        'Symbolic -> Enactive -> Iconic',
        'Iconic -> Symbolic -> Conditioning',
        'Abstract symbolic proof solely from age five',
      ],
      exp: 'Bruner’s spiral curriculum builds concrete Enactive action through Iconic drawings before Symbolic abstraction.',
    },
    mr: {
      q: 'जेरोम ब्रुनर यांच्या बोधात्मक सिद्धांतानुसार मुलांना नवीन गणिती किंवा वैज्ञानिक संकल्पना शिकवण्याचा नैसर्गिक क्रम कोणता?',
      opts: [
        'क्रियात्मक (Enactive / प्रत्यक्ष कृती) -> प्रतिमात्मक (Iconic / चित्रे) -> प्रतीकात्मक (Symbolic / चिन्हे व सूत्रे)',
        'प्रतीकात्मक -> क्रियात्मक -> प्रतिमात्मक',
        'प्रतिमात्मक -> प्रतीकात्मक -> अभिसंधान',
        'पाचव्या वर्षापासून फक्त अमूर्त सूत्रे',
      ],
      exp: 'ब्रुनरच्या मते प्रत्यक्ष वस्तू हाताळणे, नंतर चित्र व शेवटी चिन्हात्मक अमूर्त मांडणी हा सर्वोत्तम क्रम आहे.',
    },
    hi: {
      q: 'जेरोम ब्रूनर के संज्ञानात्मक सिद्धांत के अनुसार बच्चों को नई अवधारणा सिखाने का स्वाभाविक क्रम क्या है?',
      opts: [
        'सक्रिय / क्रियात्मक (Enactive) -> प्रतिबिंबात्मक / चित्रात्मक (Iconic) -> प्रतीकात्मक (Symbolic)',
        'प्रतीकात्मक -> क्रियात्मक -> चित्रात्मक',
        'चित्रात्मक -> प्रतीकात्मक -> अनुबंधन',
        'पाँच वर्ष से ही केवल अमूर्त सूत्र',
      ],
      exp: 'ब्रूनर के अनुसार ठोस क्रिया से चित्र और फिर अमूर्त प्रतीकों की ओर बढ़ना अधिगम को स्थायी बनाता है।',
    },
  },
  {
    topic: 'Cognitive Load & Bilingual Visual Glossary',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Why is a classroom "Word Wall" pairing new academic terms with sketches and child-friendly meanings effective for primary learners?',
      opts: [
        'It anchors unfamiliar academic vocabulary visually and encourages independent reference during writing',
        'It fills empty wall space purely for annual inspection photographs',
        'It trains students to copy words mechanically without meaning',
        'It discourages reading complete sentences',
      ],
      exp: 'Print-rich word walls provide ongoing visual scaffolding that strengthens orthographic memory and independent expression.',
    },
    mr: {
      q: 'नवीन अभ्यासक्रम शब्दांसोबत चित्रे व सोपे अर्थ लावलेली वर्गातील "शब्दभिंत" (Word Wall) प्राथमिक मुलांसाठी का उपयुक्त ठरते?',
      opts: [
        'अपरिचित शैक्षणिक शब्दांचा दृश्य संदर्भ मिळतो व लेखनावेळी विद्यार्थी स्वतः संदर्भासाठी वापर करू शकतात',
        'फक्त वार्षिक तपासणीच्या छायाचित्रांसाठी भिंत सजवली जाते',
        'अर्थ न समजता शब्द यांत्रिकपणे उतरवण्याची सवय लागते',
        'पूर्ण वाक्ये वाचण्याची सवय कमी होते',
      ],
      exp: 'मुद्रितसमृद्ध शब्दभिंत विद्यार्थ्यांना सतत दृश्य आधार देते आणि स्वावलंबी वाचन-लेखनास मदत करते.',
    },
    hi: {
      q: 'नए शैक्षणिक शब्दों के साथ चित्र और सरल अर्थ वाली कक्षा "शब्द-दीवार" (Word Wall) प्राथमिक शिक्षार्थियों के लिए क्यों प्रभावी है?',
      opts: [
        'यह अपरिचित शब्दों को दृश्य संदर्भ से जोड़ती है और लिखते समय स्वतंत्र संदर्भ सहायता देती है',
        'यह केवल निरीक्षण फोटो के लिए दीवार सजाने का कार्य करती है',
        'यह बिना अर्थ के शब्द नकल करना सिखाती है',
        'यह पूरे वाक्य पढ़ने को हतोत्साहित करती है',
      ],
      exp: 'प्रिंट-समृद्ध शब्द-दीवार निरंतर दृश्य संबल प्रदान कर शब्द-भंडार एवं स्वतंत्र लेखन को सशक्त करती है।',
    },
  },
  {
    topic: 'Intrinsic Curiosity & Questioning Wait-Time',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'After posing a thoughtful "Why?" question in Class 5, a teacher waits silently for 4–5 seconds instead of calling on the first raised hand within one second. What consistently improves?',
      opts: [
        'More learners volunteer, answers become longer and more reasoned, and quiet students gain processing confidence',
        'Classroom discipline collapses due to silence',
        'Only rote one-word answers emerge',
        'Shy learners permanently stop participating',
      ],
      exp: 'Mary Budd Rowe’s Wait-Time research shows 3–5 seconds of thinking pause boosts equity and reasoning depth.',
    },
    mr: {
      q: 'इयत्ता पाचवीत "असे का घडते?" हा विचारप्रवर्तक प्रश्न विचारल्यानंतर शिक्षक पहिल्या एका सेकंदात उत्तर न घेता ४–५ सेकंद शांत थांबतात. यामुळे वर्गात कोणता सकारात्मक बदल घडतो?',
      opts: [
        'अधिक विद्यार्थी सहभागी होतात, सविस्तर तर्कशुद्ध उत्तरे मिळतात आणि लाजाळू मुलांना विचार करण्याची संधी मिळते',
        'शांततेमुळे वर्गाची शिस्त बिघडते',
        'फक्त एका शब्दात पाठांतरी उत्तरे येतात',
        'संकोची मुले कायमची गप्प बसतात',
      ],
      exp: 'प्रश्न विचारल्यानंतर ३–५ सेकंद प्रतीक्षा वेळ (Wait-Time) दिल्यास सर्व विद्यार्थ्यांना विचार करण्याची समान संधी व सखोल उत्तरे मिळतात.',
    },
    hi: {
      q: 'कक्षा ५ में विचारोत्तेजक "क्यों?" प्रश्न पूछने के बाद शिक्षक एक सेकंड में ही पहला हाथ चुनने के बजाय ४–५ सेकंड रुकते हैं। इससे क्या सकारात्मक सुधार होता है?',
      opts: [
        'अधिक विद्यार्थी भाग लेते हैं, तर्कपूर्ण विस्तृत उत्तर आते हैं और संकोची बच्चों को सोचने का समय मिलता है',
        'मौन के कारण अनुशासन भंग होता है',
        'केवल रटे हुए एक-शब्दीय उत्तर आते हैं',
        'संकोची छात्र हमेशा के लिए चुप हो जाते हैं',
      ],
      exp: 'प्रश्न के बाद ३–५ सेकंड का प्रतीक्षा-समय (Wait-Time) सहभागिता और चिंतन की गहराई दोनों बढ़ाता है।',
    },
  },
  {
    topic: 'RTE 2009 Free Uniforms & Textbooks Policy',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why does the RTE Act 2009 define elementary education as "free and compulsory" for every child aged 6 to 14 years?',
      opts: [
        'No child shall be liable to pay any fee/expense that prevents elementary completion, and the State must ensure admission, attendance, and completion',
        'Parents may choose freely to keep children out of school for paid factory work',
        'Compulsory implies imposing cash fines on eight-year-old learners for absence',
        'Free applies solely to school library borrowing fees',
      ],
      exp: '"Free" removes financial barriers (fees, uniforms, textbooks); "Compulsory" casts a statutory obligation on the State/local authority to guarantee schooling.',
    },
    mr: {
      q: 'RTE कायदा २००९ मध्ये ६ ते १४ वयोगटासाठी "मोफत आणि सक्तीचे" शिक्षण याचा अचूक कायदेशीर अर्थ कोणता?',
      opts: [
        'आर्थिक कारणामुळे प्राथमिक शिक्षणात अडथळा आणणारे कोणतेही शुल्क न आकारणे व प्रत्येक बालकाचा प्रवेश, उपस्थिती व शिक्षण पूर्णत्व सुनिश्चित करण्याची जबाबदारी शासनावर असणे',
        'पालक मर्जीनुसार मुलांना कारखान्यात कामाला पाठवू शकतात',
        'गैरहजेरीसाठी लहान मुलांना रोख दंड करणे म्हणजे सक्ती',
        'मोफत म्हणजे फक्त ग्रंथालय शुल्क माफ असणे',
      ],
      exp: '"मोफत" म्हणजे शिक्षणास बाधक शुल्क नसणे आणि "सक्तीचे" म्हणजे प्रत्येक बालकास शिक्षण देण्याचे शासनावर बंधन असणे.',
    },
    hi: {
      q: 'RTE अधिनियम २००९ में ६ से १४ वर्ष के बच्चों हेतु "निःशुल्क और अनिवार्य" शिक्षा का सही अर्थ क्या है?',
      opts: [
        'प्रारंभिक शिक्षा पूर्ण करने में बाधक कोई शुल्क न होना तथा प्रवेश, उपस्थिति व पूर्णता सुनिश्चित करना राज्य का दायित्व होना',
        'माता-पिता बच्चों को स्वेच्छा से कारखाने में काम पर रख सकते हैं',
        'अनिवार्य का अर्थ अनुपस्थिति पर बच्चों पर नकद जुर्माना लगाना है',
        'निःशुल्क केवल पुस्तकालय शुल्क तक सीमित है',
      ],
      exp: '"निःशुल्क" आर्थिक बाधाएँ हटाता है और "अनिवार्य" प्रत्येक बच्चे की प्रारंभिक शिक्षा सुनिश्चित करने का राज्य का कानूनी दायित्व है।',
    },
  },
  {
    topic: 'Portfolio Assessment Principle',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'What makes a student portfolio superior to a single folder of random worksheets when reviewing a semester’s progress?',
      opts: [
        'Purposeful selection of dated drafts, projects, and student self-reflections demonstrating growth over time',
        'Collecting only 100%-scored final tests and discarding all early drafts',
        'Letting only parents assemble colorful covers without student input',
        'Scoring solely by thickness of the plastic file',
      ],
      exp: 'A true portfolio documents longitudinal growth through curated artifacts and learner reflection.',
    },
    mr: {
      q: 'संपूर्ण सत्राच्या प्रगतीचा आढावा घेताना साध्या कच्च्या कागदांच्या फाईलपेक्षा विद्यार्थी "पोर्टफोलिओ" अधिक प्रभावी का ठरतो?',
      opts: [
        'यात दिनांकनिहाय निवडक कामे, प्रकल्प आणि विद्यार्थ्याने केलेले स्व-चिंतन असल्यामुळे कालांतराने झालेली प्रगती स्पष्ट दिसते',
        'केवळ १००% गुण मिळालेल्या चाचण्या ठेवून सुरुवातीचे मसुदे फेकून दिले जातात',
        'विद्यार्थ्याच्या सहभागाशिवाय फक्त पालक रंगीत मुखपृष्ठ बनवतात',
        'केवळ फाईलच्या जाडीवरून गुण दिले जातात',
      ],
      exp: 'नियोजनपूर्वक जपलेले निवडक नमुने व स्व-चिंतन यांमुळे पोर्टफोलिओ विद्यार्थ्याचा विकासात्मक प्रवास दाखवतो.',
    },
    hi: {
      q: 'सत्र भर की प्रगति देखने हेतु अनियमित कार्यपत्रकों के बंडल की तुलना में विद्यार्थी "पोर्टफोलियो" क्यों श्रेष्ठ होता है?',
      opts: [
        'तिथि-वार चयनित कार्य, परियोजनाएँ और छात्र के स्व-चिंतन समय के साथ वास्तविक प्रगति को दर्शाते हैं',
        'केवल शत-प्रतिशत अंक वाली परीक्षाएँ रखकर प्रारंभिक प्रयास फेंक दिए जाते हैं',
        'छात्र की भागीदारी के बिना केवल अभिभावक सजावटी कवर लगाते हैं',
        'केवल फाइल की मोटाई से अंक दिए जाते हैं',
      ],
      exp: 'पोर्टफोलियो सार्थक ढंग से चुने गए कार्य-नमूनों और स्व-समीक्षा के माध्यम से क्रमिक विकास को प्रमाणित करता है।',
    },
  },
  {
    topic: 'Early Childhood Gross vs Fine Motor Play',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Which set of Balvatika / Class 1 activities specifically strengthens fine motor finger-thumb pincer control needed for confident writing?',
      opts: [
        'Bead-threading, clay pinching, paper-tearing collage, and spooning grains',
        'Fifty-metre sprint racing on the playground',
        'Listening silently to a recorded radio story',
        'High-jump over low rope barriers',
      ],
      exp: 'Threading, clay modeling, tearing, and pincer-grip sorting build hand-eye coordination and finger dexterity prior to pencil fluency.',
    },
    mr: {
      q: 'बालवाटिका / इयत्ता पहिलीतील मुलांचा लेखनासाठी आवश्यक अंगठा-बोटांवरील "सूक्ष्म कारक कौशल्य" (Fine Motor) विकास कोणत्या कृतींतून घडतो?',
      opts: [
        'मणी ओवणे, मातीचे गोळे बनवणे, कागदाचे तुकडे करून कोलाज बनवणे आणि चमच्याने धान्य उचलणे',
        'मैदानावर ५० मीटर धावण्याची शर्यत लावणे',
        'रेडिओवरील गोष्ट शांतपणे ऐकणे',
        'दोरीवरून उंच उड्या मारणे',
      ],
      exp: 'मणी ओवणे, मातीकाम व कागद फाडून चिकटवणे यांमुळे हाताच्या बोटांची पकड मजबूत होऊन लेखन सुलभ होते.',
    },
    hi: {
      q: 'बालवाटिका / कक्षा १ के बच्चों में लेखन हेतु आवश्यक उँगलियों के "सूक्ष्म गत्यात्मक कौशल" (Fine Motor) को कौन-सी गतिविधियाँ पुष्ट करती हैं?',
      opts: [
        'मोती पिरोना, मिट्टी गूँधकर आकृति बनाना, कागज फाड़कर कोलाज बनाना व चम्मच से दाने उठाना',
        'मैदान में ५० मीटर की दौड़ लगाना',
        'मौन होकर रेडियो कहानी सुनना',
        'रस्सी पर ऊँची कूद लगाना',
      ],
      exp: 'मोती पिरोना, मिट्टी कला और कोलाज जैसी गतिविधियाँ हाथ-आँख समन्वय व उँगलियों की पकड़ को मजबूत करती हैं।',
    },
  },
  {
    topic: 'NCF 2005 Examination Reforms',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'How does NCF 2005 recommend reducing examination stress in primary and elementary schooling?',
      opts: [
        'Integrating flexible, non-threatening continuous assessment with open-ended problem tasks and avoiding board-style rote anxiety',
        'Adding daily surprise ranking quizzes every afternoon',
        'Publishing failing students’ names on village notice boards',
        'Increasing paper duration to four hours in Class 3',
      ],
      exp: 'NCF 2005 calls for flexible, low-stress, process-oriented assessments embedded naturally in everyday classroom activities.',
    },
    mr: {
      q: 'प्राथमिक स्तरावरील परीक्षेचा ताण कमी करण्यासाठी NCF 2005 ने कोणती सुधारणा सुचवली आहे?',
      opts: [
        'दैनंदिन उपक्रमांत मिसळलेले लवचिक, भीतीमुक्त सातत्यपूर्ण मूल्यमापन व मुक्तोत्तरी कार्यांचा वापर करणे',
        'दररोज दुपारी अचानक क्रमांक लावणाऱ्या चाचण्या घेणे',
        'कमी गुण मिळालेल्यांची नावे ग्रामपंचायत फलकावर लावणे',
        'इयत्ता तिसरीचा पेपर चार तासांचा करणे',
      ],
      exp: 'पाठांतर व परीक्षेची भीती संपवून दैनंदिन शिकण्याचा भाग म्हणून लवचिक मूल्यमापन करावे, असे NCF 2005 सांगते.',
    },
    hi: {
      q: 'प्राथमिक विद्यालय में परीक्षा का तनाव घटाने हेतु NCF 2005 किस सुधार की अनुशंसा करता है?',
      opts: [
        'दैनिक कक्षा गतिविधियों में समाहित लचीला, भयमुक्त सतत आकलन व मुक्त-अंत कार्यों का उपयोग',
        'प्रतिदिन दोपहर में आकस्मिक रैंकिंग परीक्षा लेना',
        'कम अंक पाने वालों के नाम सूचना-पट्ट पर टांगना',
        'कक्षा ३ की परीक्षा अवधि चार घंटे करना',
      ],
      exp: 'NCF 2005 भयमुक्त, लचीले और प्रक्रिया-केंद्रित मूल्यांकन को शिक्षण के अभिन्न अंग के रूप में अपनाने पर बल देता है।',
    },
  },
  {
    topic: 'Creative Questioning Prompts',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Which question prompt by a Class 4 teacher pushes thinking beyond factual recall toward empathy and perspective-taking?',
      opts: [
        '"If you were a migrating bird arriving at an encroached wetland, what changes would you notice and need?"',
        '"Spell the word wetlands aloud three times."',
        '"Which page number shows the wetland photograph?"',
        '"How many letters are in the word bird?"',
      ],
      exp: 'Perspective-taking ("If you were...") invites analytical empathy, ecological reasoning, and imaginative expression.',
    },
    mr: {
      q: 'इयत्ता चौथीच्या शिक्षकाचा कोणता प्रश्न केवळ पाठांतरापेक्षा सहअनुभूती (Empathy) आणि दृष्टिकोन समजून घेण्यास प्रोत्साहन देतो?',
      opts: [
        '"अतिक्रमण झालेल्या पाणथळ जागेवर येणारा स्थलांतरित पक्षी तू असतास, तर तुला कोणते बदल व अडचणी जाणवल्या असत्या?"',
        '"पाणथळ या शब्दाचे अक्षर तीन वेळा मोठ्याने सांगा."',
        '"पाणथळ जागेचे चित्र पुस्तकाच्या कोणत्या पानावर आहे?"',
        '"पक्षी या शब्दात किती अक्षरे आहेत?"',
      ],
      exp: '"तू त्या जागी असतास तर..." असे प्रश्न विद्यार्थ्यांत सृजनशील कल्पनाशक्ती आणि पर्यावरणीय संवेदनशीलता घडवतात.',
    },
    hi: {
      q: 'कक्षा ४ में शिक्षक का कौन-सा प्रश्न रटंत स्मरण से आगे बढ़कर सहानुभूति और दृष्टिकोण-चिंतन को बढ़ावा देता है?',
      opts: [
        '"यदि तुम अतिक्रमित आर्द्रभूमि पर आने वाले प्रवासी पक्षी होते, तो तुम्हें क्या बदलाव और कठिनाइयाँ दिखतीं?"',
        '"आर्द्रभूमि शब्द की वर्तनी तीन बार बोलो।"',
        '"आर्द्रभूमि का चित्र किस पृष्ठ संख्या पर है?"',
        '"पक्षी शब्द में कितने अक्षर हैं?"',
      ],
      exp: 'भूमिका-कल्पना वाले प्रश्न ("यदि तुम होते...") बच्चों में विश्लेषणात्मक सहानुभूति और कल्पनाशील तर्क जगाते हैं।',
    },
  },
  {
    topic: 'Concept Mapping Assessment',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'When students create a Concept Map linking "Water", "Evaporation", "Clouds", and "Transpiration" using labelled arrows, what cognitive gain does the teacher observe?',
      opts: [
        'How learners organize hierarchical relationships and causal connections among concepts',
        'How fast students draw straight borders with rulers',
        'Whether learners memorized dictionary alphabetical order',
        'Solely handwriting speed under time pressure',
      ],
      exp: 'Concept maps (Joseph Novak) visualize propositional networks linking superordinate concepts to related sub-processes.',
    },
    mr: {
      q: 'विद्यार्थी "पाणी", "बाष्पीभवन", "ढग" आणि "बाष्पोत्सर्जन" हे शब्द नामनिर्देशित बाणांनी जोडणारा संकल्पना नकाशा (Concept Map) तयार करतात. यातून शिक्षकास काय कळते?',
      opts: [
        'विद्यार्थ्याने विविध संकल्पनांतील परस्पर संबंध व कार्यकारणभाव कसा जोडला आहे ते समजते',
        'विद्यार्थी मोजपट्टीने किती वेगाने चौकट आखतो ते कळते',
        'शब्दकोशातील अकारविल्हे क्रम पाठ आहे का ते दिसते',
        'वेळेच्या दबावाखालील हस्ताक्षर वेग कळतो',
      ],
      exp: 'संकल्पना नकाशामुळे (Concept Map) विद्यार्थ्यांच्या मनातील संकल्पनांचे जाळे व परस्परसंबंधांचे आकलन स्पष्ट होते.',
    },
    hi: {
      q: 'जब छात्र "जल", "वाष्पीकरण", "बादल" और "वाष्पोत्सर्जन" को नामित तीरों से जोड़कर अवधारणा मानचित्र (Concept Map) बनाते हैं, तो शिक्षक क्या जान पाते हैं?',
      opts: [
        'विद्यार्थियों ने विभिन्न अवधारणाओं के पदानुक्रम और कार्य-कारण संबंधों को कैसे संगठित किया है',
        'छात्र पटरी से कितनी तेज़ी से हाशिया खींचते हैं',
        'क्या बच्चों को शब्दकोश का वर्णक्रम रटा है',
        'केवल समय के दबाव में लिखावट गति',
      ],
      exp: 'अवधारणा मानचित्र विद्यार्थियों के संज्ञानात्मक नेटवर्क और अवधारणाओं के अंतर्संबंधों को स्पष्ट रूप से प्रकट करता है।',
    },
  },
  {
    topic: 'Zero Rejection Inclusive School Policy',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'What does the "Zero Rejection Policy" under Sarva Shiksha Abhiyan / Samagra Shiksha mean for children with special needs (CWSN)?',
      opts: [
        'Every child, regardless of type or severity of disability, has the right to enrolment and appropriate support without denial',
        'Schools may refuse admission if building ramps are not yet painted',
        'Only mildly gifted pupils enter regular classrooms',
        'Private clinics decide school admission eligibility independently',
      ],
      exp: 'Zero Rejection mandates that no school can deny admission to any child on grounds of physical, sensory, or intellectual disability.',
    },
    mr: {
      q: 'सर्व शिक्षा अभियान / समग्र शिक्षा अंतर्गत विशेष गरजा असलेल्या बालकांसाठी (CWSN) "शून्य नकार धोरण" (Zero Rejection Policy) म्हणजे काय?',
      opts: [
        'अपंगत्वाचा प्रकार किंवा तीव्रता काहीही असली तरी कोणत्याही बालकास शाळाप्रवेश नाकारला जाणार नाही व योग्य आधार दिला जाईल',
        'शाळेत रॅम्प रंगवलेला नसल्यास प्रवेश नाकारता येतो',
        'केवळ सौम्य लक्षणे असलेल्या मुलांनाच नियमित प्रवेश मिळतो',
        'प्रवेश पात्रता केवळ खाजगी रुग्णालये ठरवतात',
      ],
      exp: 'शून्य नकार धोरणानुसार शारीरिक, संवेदी किंवा बौद्धिक अपंगत्व असलेल्या प्रत्येक बालकाचा नियमित शाळेत प्रवेश हक्क अबाधित आहे.',
    },
    hi: {
      q: 'सर्व शिक्षा अभियान / समग्र शिक्षा के अंतर्गत विशेष आवश्यकता वाले बच्चों (CWSN) के लिए "शून्य अस्वीकृति नीति" (Zero Rejection Policy) का अर्थ क्या है?',
      opts: [
        'दिव्यांगता के प्रकार या स्तर की परवाह किए बिना किसी भी बच्चे को विद्यालय प्रवेश से वंचित नहीं किया जा सकता',
        'रैंप न होने पर विद्यालय प्रवेश अस्वीकार कर सकते हैं',
        'केवल अत्यंत सामान्य बच्चों को ही नियमित कक्षा मिलेगी',
        'प्रवेश की पात्रता केवल निजी क्लीनिक तय करेंगे',
      ],
      exp: 'शून्य अस्वीकृति नीति सुनिश्चित करती है कि प्रत्येक दिव्यांग बालक को उपयुक्त सहायता के साथ समावेशी प्रवेश मिले।',
    },
  },
  {
    topic: 'Avoiding Gender-Biased Math Word Problems',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'When designing primary arithmetic word problems, how does a gender-sensitive teacher challenge traditional occupational stereotypes?',
      opts: [
        'Depict women as engineers, pilots, or shopkeepers and men as nurses, cooks, or caregivers naturally across everyday math problems',
        'Assign kitchen grocery sums solely to female characters and tractor sums solely to males',
        'Use only abstract letters X and Y to avoid all human names',
        'Remove real-world occupations from math completely',
      ],
      exp: 'Balanced everyday representation in textbooks and worksheets normalizes equal career aspirations for all genders.',
    },
    mr: {
      q: 'प्राथमिक गणिताची शाब्दिक उदाहरणे तयार करताना लिंगभाव-संवेदनशील शिक्षक पारंपरिक साचेबद्धता कशी मोडतात?',
      opts: [
        'उदाहरणांत स्त्रियांना वैमानिक, अभियंता, दुकानदार तर पुरुषांना परिचारक, स्वयंपाकी, संगोपनकर्ते अशा वैविध्यपूर्ण भूमिकांत दर्शवून',
        'किराणा व स्वयंपाकघराची उदाहरणे फक्त मुलींच्या नावावर व ट्रॅक्टरची मुलांच्या नावावर देऊन',
        'मानवी नावे टाळून फक्त X आणि Y वापरून',
        'व्यवहारिक उदाहरणे पूर्णपणे काढून टाकून',
      ],
      exp: 'पाठ्यपुस्तके व कार्यपत्रिकांत विविध व्यावसायिक भूमिकांत स्त्री-पुरुष समान सहभाग दाखवल्याने समतावादी दृष्टिकोन घडतो.',
    },
    hi: {
      q: 'प्राथमिक गणित के इबारती प्रश्न बनाते समय लिंग-संवेदनशील शिक्षक पारंपरिक रूढ़िवादिता को कैसे तोड़ते हैं?',
      opts: [
        'प्रश्नों में महिलाओं को पायलट/इंजीनियर/व्यापारी तथा पुरुषों को रसोइया/नर्स/देखभालकर्ता जैसी विविध भूमिकाओं में सहज दिखाकर',
        'रसोई के प्रश्न सदैव लड़कियों और ट्रैक्टर के प्रश्न सदैव लड़कों पर बनाकर',
        'मानव नाम हटाकर केवल X और Y रखकर',
        'व्यावहारिक व्यवसाय के प्रसंग पूरी तरह हटाकर',
      ],
      exp: 'अभ्यास प्रश्नों में विविध और गैर-रूढ़िवादी भूमिकाओं का चित्रण सभी छात्रों में समान आकांक्षाएँ पोषित करता है।',
    },
  },
];
