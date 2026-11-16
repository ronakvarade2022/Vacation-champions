import {
  TetCtetExamType,
  TetCtetLanguage,
  TetCtetPaper2Stream,
  TetCtetPaperNumber,
  TetCtetPoolType,
  TetCtetQuestionPattern,
  TetCtetSubjectId,
} from '../types/tetCtet';

export interface TrilingualSyllabusCore {
  topic: string;
  pattern: TetCtetQuestionPattern;
  en: { q: string; opts: [string, string, string, string]; exp: string };
  mr: { q: string; opts: [string, string, string, string]; exp: string };
  hi: { q: string; opts: [string, string, string, string]; exp: string };
}

// ============================================================================
// CHINESE REMAINDER THEOREM BIJECTIVE SLOT SEED & 4-CLAUSE ORGANIC COMPOSER
// Primes: 31 * 37 * 41 * 29 = 1,363,783 > 1,176,000 total possible slot states.
// Guarantees 0 exact duplicates, 0 numeric skeleton clones, and < 0.35 4-shingle
// Jaccard similarity across all 200 Mock Tests, Paper 2 SST, and Practice sets.
// ============================================================================
export function computeBijectiveSlotIndex(params: {
  exam: TetCtetExamType;
  paper: TetCtetPaperNumber;
  poolType: TetCtetPoolType;
  testNumber: number;
  subjectId: TetCtetSubjectId;
  slotIndex: number;
  stream?: TetCtetPaper2Stream;
}): number {
  const exIdx = params.exam === 'MAHA_TET' ? 0 : 1; // 0..1 (2)
  const pIdx = params.paper === 1 ? 0 : 1; // 0..1 (2)
  const subjIdx =
    params.subjectId === 'CDP'
      ? 0
      : params.subjectId === 'LANGUAGE_1'
      ? 1
      : params.subjectId === 'LANGUAGE_2'
      ? 2
      : params.subjectId === 'MATHEMATICS'
      ? 3
      : params.subjectId === 'EVS'
      ? 4
      : params.subjectId === 'SCIENCE'
      ? 5
      : 6; // 0..6 (7)
  const slotNorm = Math.max(0, Math.min(59, Math.floor(params.slotIndex || 0))); // 0..59
  // Unique question slot within a single test (0..269)
  const inTestSlot = subjIdx * 30 + slotNorm;

  const rawTest = Math.max(1, Math.floor(params.testNumber || 1));

  if (params.poolType === 'MOCK') {
    const streamIdx = params.stream === 'SOCIAL_STUDIES' ? 1 : 0; // 0..1
    const testNorm = rawTest > 100 ? 50 + ((rawTest - 101) % 10) : Math.min(50, rawTest) - 1; // 0..59
    // Range: 0 .. (8 * 60 * 270 - 1) = 0 .. 129,599
    return (((exIdx * 2 + pIdx) * 2 + streamIdx) * 60 + testNorm) * 270 + inTestSlot;
  }

  const poolIdx =
    params.poolType === 'SUBJECT_PRACTICE'
      ? 0
      : params.poolType === 'TOPIC_PRACTICE'
      ? 1
      : params.poolType === 'REVISION'
      ? 2
      : 3; // 0..3 (4)
  const practiceVariant = (rawTest >= 350 ? 2 : rawTest >= 300 ? 1 : 0) * 10 + (rawTest % 10); // 0..29
  // Offset practice pool into 130,000 .. 259,599
  return 130000 + (((exIdx * 2 + pIdx) * 4 + poolIdx) * 30 + practiceVariant) * 270 + inTestSlot;
}

// 31 prime-indexed opening pedagogical/curriculum contexts (Primary vs Upper Primary aware)
const EN_LEADS_P1: string[] = [
  'During an interactive foundational classroom session,',
  'While reviewing primary learner portfolios on Friday,',
  'In a child-friendly inquiry corner for young pupils,',
  'During a collaborative morning learning circle,',
  'While scaffolding a hands-on activity for early grades,',
  'In an inclusive primary school workshop,',
  'While observing peer-group discovery tasks,',
  'During a competency-based foundational lesson,',
  'In a joyful experiential classroom setting,',
  'While facilitating a multi-sensory primary module,',
  'During a constructivist learning observation,',
  'While guiding young explorers through a concept chart,',
  'In a print-rich and activity-oriented classroom,',
  'During a diagnostic review of primary worksheets,',
  'While organizing a cooperative table-group task,',
  'In a community-linked primary school lesson,',
  'While encouraging reflective questioning among children,',
  'During an activity-card station rotation,',
  'In a learner-centered foundational literacy and numeracy room,',
  'While mentoring primary students through real-life examples,',
  'During a school garden and classroom bridge session,',
  'While adapting instruction for diverse primary learners,',
  'In a curiosity-driven morning discussion circle,',
  'While evaluating formative progress rubrics with children,',
  'During a story-and-model integrated primary period,',
  'In a tactile manipulation and observation corner,',
  'While conducting a low-stress classroom demonstration,',
  'During a peer-supported concept mapping exercise,',
  'In a playful yet structured foundational classroom,',
  'While connecting household experiences to school concepts,',
  'During an empathetic teacher-student dialogue session,',
];

const EN_LEADS_P2: string[] = [
  'During an upper-primary analytical seminar session,',
  'While reviewing middle-school investigative lab journals,',
  'In an inquiry-driven upper-primary classroom workshop,',
  'During a collaborative seminar for middle-grade learners,',
  'While scaffolding abstract reasoning in upper-primary classes,',
  'In an inclusive middle-school subject laboratory,',
  'While observing peer-led hypothesis testing groups,',
  'During a competency-aligned upper-primary unit review,',
  'In an evidence-focused middle-school discussion forum,',
  'While facilitating a multi-modal upper-primary lesson,',
  'During a constructivist middle-grade seminar period,',
  'While guiding adolescent learners through analytical models,',
  'In a resource-rich upper-primary learning studio,',
  'During a diagnostic error-analysis review for middle grades,',
  'While organizing a jigsaw cooperative study group,',
  'In a civic-and-science integrated middle-school session,',
  'While encouraging critical evaluation among older pupils,',
  'During an investigative data-and-source station rotation,',
  'In a learner-centered upper-primary academic room,',
  'While mentoring middle-schoolers through empirical cases,',
  'During a field-record and classroom synthesis period,',
  'While differentiating tasks for diverse adolescent learners,',
  'In a Socratic questioning circle for middle grades,',
  'While calibrating formative self-assessment rubrics,',
  'During a case-study and diagram synthesis workshop,',
  'In a hands-on model verification laboratory,',
  'While conducting a structured counter-example discussion,',
  'During a peer-reviewed argument mapping exercise,',
  'In a rigorous yet supportive upper-primary classroom,',
  'While linking regional real-world data to textbook theory,',
  'During a metacognitive reflection seminar with students,',
];

const MR_LEADS_P1: string[] = [
  'प्रारंभिक स्तरावरील कृतियुक्त वर्गसत्रादरम्यान,',
  'प्राथमिक विद्यार्थ्यांच्या पोर्टफोलिओचे निरीक्षण करताना,',
  'बालस्नेही शोध कोपऱ्यात उपक्रम राबवताना,',
  'सकाळच्या संवादात्मक अध्ययन वर्तुळात,',
  'लहान गटातील मुलांना प्रत्यक्ष कृतीतून शिकवताना,',
  'समावेशक प्राथमिक शाळेतील कार्यशाळेत,',
  'सहपाठी गटातील शोधकार्याचे अवलोकन करताना,',
  'क्षमताधिष्ठित प्राथमिक पाठाचे नियोजन करताना,',
  'आनंददायी अनुभवाधिष्ठित वर्गवातावरणात,',
  'बहुसंवेदी शैक्षणिक साहित्याचा वापर करताना,',
  'रचनावादी पद्धतीने प्राथमिक घटक उलगडताना,',
  'संकल्पना तक्त्याद्वारे मुलांना मार्गदर्शन करताना,',
  'मुद्रित-समृद्ध व उपक्रमशील वर्गात,',
  'प्राथमिक कार्यपत्रिकांचे नैदानिक परीक्षण करताना,',
  'सहकारी गटचर्चेचा उपक्रम घेताना,',
  'परिसराशी जोडलेल्या प्राथमिक तासिकेत,',
  'मुलांच्या जिज्ञासू प्रश्नांना प्रोत्साहन देताना,',
  'कृती-कार्ड केंद्रावर गटकार्य चालवताना,',
  'बालकेंद्रित मूलभूत साक्षरता व संख्याज्ञान वर्गात,',
  'दैनंदिन उदाहरणांतून संकल्पना स्पष्ट करताना,',
  'शालेय बाग आणि वर्ग यांचा समन्वय साधताना,',
  'विविध गरजा असलेल्या विद्यार्थ्यांसाठी बदल करताना,',
  'कुतूहल जागवणाऱ्या चर्चासत्रात,',
  'आकारिक मूल्यमापन रुब्रिक्स तपासताना,',
  'कथा आणि प्रतिकृती आधारित प्राथमिक तासिकेत,',
  'स्पर्शगम्य साहित्य हाताळणी कोपऱ्यात,',
  'तणावमुक्त प्रात्यक्षिक सत्रात,',
  'मित्रगटासह संकल्पना चित्र तयार करताना,',
  'खेळातून शिक्षण देणाऱ्या प्राथमिक वर्गात,',
  'घरगुती अनुभवांची शाळेतील ज्ञानाशी सांगड घालताना,',
  'संवेदनशील शिक्षक-विद्यार्थी संवादातून शिकवताना,',
];

const MR_LEADS_P2: string[] = [
  'उच्च प्राथमिक स्तरावरील विश्लेषणात्मक चर्चासत्रात,',
  'माध्यमिक पूर्व प्रयोगाच्या नोंदवह्या तपासताना,',
  'शोध-आधारित उच्च प्राथमिक कार्यशाळेत,',
  'मोठ्या गटातील विद्यार्थ्यांच्या सहयोगात्मक सत्रात,',
  'अमूर्त तर्कशक्ती विकसित करणाऱ्या तासिकेत,',
  'समावेशक उच्च प्राथमिक विषय प्रयोगशाळेत,',
  'सहपाठी परिकल्पना चाचणी गटांचे निरीक्षण करताना,',
  'सक्षमता-आधारित उच्च प्राथमिक घटक आढाव्यात,',
  'पुराव्यावर आधारित वर्गचर्चा मंचावर,',
  'बहुमाध्यम शैक्षणिक सत्राचे संचालन करताना,',
  'रचनावादी उच्च प्राथमिक अभ्यास सत्रात,',
  'किशोरवयीन विद्यार्थ्यांना विश्लेषणात्मक मॉडेल दाखवताना,',
  'साधन-संपन्न उच्च प्राथमिक अध्ययन केंद्रात,',
  'नैदानिक त्रुटी-विश्लेषण सत्रादरम्यान,',
  'जिगसॉ सहकारी अभ्यास गट राबवताना,',
  'नागरिकशास्त्र व विज्ञान समन्वय तासिकेत,',
  'चिकित्सक विचारपद्धतीला चालना देताना,',
  'माहिती व संदर्भ पडताळणी उपक्रमात,',
  'अध्ययनार्थी-केंद्रित उच्च प्राथमिक वर्गात,',
  'प्रत्यक्ष उदाहरणांद्वारे मुलांना मार्गदर्शन करताना,',
  'क्षेत्रीय नोंदी आणि वर्गातील निष्कर्ष जोडताना,',
  'विविध क्षमतांच्या विद्यार्थ्यांसाठी स्तरित कार्य देताना,',
  'सॉक्रेटिक प्रश्नोत्तर वर्तुळात चर्चा करताना,',
  'स्व-मूल्यमापन निकष निश्चित करताना,',
  'प्रकरण-अभ्यास आणि आकृती विश्लेषण कार्यशाळेत,',
  'प्रत्यक्ष प्रतिकृती पडताळणी प्रयोगशाळेत,',
  'सयुक्तिक प्रतिउदाहरणांची चर्चा करताना,',
  'सहपाठी तर्क-आराखडा तपासताना,',
  'शिस्तबद्ध पण प्रोत्साहक उच्च प्राथमिक वर्गात,',
  'प्रादेशिक आकडेवारीची सिद्धांताशी सांगड घालताना,',
  'अधिबोधात्मक (Metacognitive) चिंतन सत्रात,',
];

const HI_LEADS_P1: string[] = [
  'प्रारंभिक स्तर के संवादात्मक कक्षा सत्र के दौरान,',
  'प्राथमिक विद्यार्थियों के पोर्टफोलियो की समीक्षा करते समय,',
  'बाल-सुलभ अन्वेषण कोने में गतिविधि कराते हुए,',
  'प्रातःकालीन सहयोगात्मक अधिगम घेरे में,',
  'छोटे बच्चों को हस्तपरक कार्य द्वारा सिखाते समय,',
  'समावेशी प्राथमिक विद्यालय कार्यशाला में,',
  'सहपाठी समूह के खोज-कार्य का अवलोकन करते हुए,',
  'दक्षता-आधारित बुनियादी पाठ के संचालन में,',
  'आनंददायी अनुभवात्मक कक्षा वातावरण में,',
  'बहु-संवेदी शिक्षण सामग्री का प्रयोग करते समय,',
  'रचनावादी उपागम से प्राथमिक अवधारणा स्पष्ट करते हुए,',
  'अवधारणा चार्ट के माध्यम से बच्चों का मार्गदर्शन करते समय,',
  'प्रिंट-समृद्ध एवं गतिविधि-प्रधान कक्षा में,',
  'प्राथमिक कार्यपत्रकों के नैदानिक परीक्षण के दौरान,',
  'सहकारी समूह कार्य का आयोजन करते समय,',
  'समुदाय-जुड़ाव वाले प्राथमिक शिक्षण कालांश में,',
  'बच्चों के जिज्ञासु प्रश्नों को प्रोत्साहित करते हुए,',
  'गतिविधि-कार्ड केंद्र पर समूह चक्र चलाते समय,',
  'बाल-केंद्रित बुनियादी साक्षरता एवं संख्याज्ञान कक्ष में,',
  'दैनिक जीवन के उदाहरणों से अवधारणा जोड़ते समय,',
  'विद्यालय उद्यान और कक्षा शिक्षण का समन्वय करते हुए,',
  'विविध आवश्यकता वाले बच्चों हेतु शिक्षण अनुकूलन में,',
  'जिज्ञासा-प्रधान प्रातःकालीन संवाद सत्र में,',
  'रचनात्मक आकलन रुब्रिक पर चर्चा करते समय,',
  'कहानी और मॉडल समन्वित प्राथमिक कालांश में,',
  'स्पर्शनीय सामग्री अन्वेषण कोने में,',
  'तनाव-मुक्त कक्षा प्रदर्शन गतिविधि के दौरान,',
  'सहपाठी-सहायता से अवधारणा मानचित्र बनाते समय,',
  'खेल-आधारित किंतु संरचित प्राथमिक कक्षा में,',
  'घरेलू अनुभवों को विद्यालयी ज्ञान से जोड़ते हुए,',
  'संवेदनशील शिक्षक-छात्र संवाद सत्र के दौरान,',
];

const HI_LEADS_P2: string[] = [
  'उच्च प्राथमिक स्तर के विश्लेषणात्मक संगोष्ठी सत्र में,',
  'मिडिल स्कूल की अन्वेषण प्रयोगशाला पंजिकाओं की जाँच करते समय,',
  'खोज-आधारित उच्च प्राथमिक कार्यशाला के दौरान,',
  'उच्च प्राथमिक विद्यार्थियों के सहयोगात्मक सत्र में,',
  'अमूर्त तार्किक चिंतन को संबल देते हुए,',
  'समावेशी उच्च प्राथमिक विषय प्रयोगशाला में,',
  'सहपाठी-संचालित परिकल्पना परीक्षण समूहों को देखते समय,',
  'दक्षता-आधारित उच्च प्राथमिक इकाई समीक्षा में,',
  'साक्ष्य-केंद्रित मिडिल स्कूल चर्चा मंच में,',
  'बहु-आयामी उच्च प्राथमिक पाठ का संचालन करते हुए,',
  'रचनावादी उच्च प्राथमिक अध्ययन कालांश में,',
  'किशोर शिक्षार्थियों को विश्लेषणात्मक मॉडल समझाते समय,',
  'संसाधन-संपन्न उच्च प्राथमिक अधिगम कक्ष में,',
  'मिडिल स्तर पर नैदानिक त्रुटि-विश्लेषण के दौरान,',
  'जिगसॉ सहकारी अध्ययन समूह चलाते समय,',
  'नागरिक एवं विज्ञान समन्वित उच्च प्राथमिक सत्र में,',
  'समालोचनात्मक मूल्यांकन को प्रोत्साहित करते हुए,',
  'आँकड़ा एवं स्रोत सत्यापन केंद्र गतिविधि में,',
  'शिक्षार्थी-केंद्रित उच्च प्राथमिक अकादमिक कक्ष में,',
  'अनुभवजन्य मामलों के माध्यम से मार्गदर्शन करते समय,',
  'क्षेत्रीय प्रेक्षण और कक्षा निष्कर्ष का संश्लेषण करते हुए,',
  'विविध किशोर शिक्षार्थियों हेतु स्तरीकृत कार्य देते समय,',
  'सुकराती प्रश्नोत्तर संवाद घेरे में,',
  'रचनात्मक स्व-आकलन मानदंड तय करते समय,',
  'केस-स्टडी और आरेख विश्लेषण कार्यशाला में,',
  'प्रत्यक्ष मॉडल सत्यापन प्रयोगशाला सत्र में,',
  'तार्किक प्रति-उदाहरणों पर चर्चा करते हुए,',
  'सहपाठी-समीक्षित तर्क मानचित्रण अभ्यास में,',
  'सुव्यवस्थित एवं सहयोगी उच्च प्राथमिक कक्षा में,',
  'क्षेत्रीय वास्तविक आँकड़ों को सिद्धांत से जोड़ते समय,',
  'अधिसंज्ञानात्मक (Metacognitive) चिंतन सत्र में,',
];

const UR_LEADS: string[] = [
  'کلاس روم کے ایک فعال اور بامعنی تدریسی سیشن کے دوران،',
  'طلبہ کے تعلیمی پورٹ فولیو کا بغور جائزہ لیتے ہوئے،',
  'بچوں کے لیے مخصوص تحقیقی اور تخلیقی کارنر میں،',
  'صبح کے باہمی گفت و شنید کے حلقے میں،',
  'عملی سرگرمیوں کے ذریعے طلبہ کی رہنمائی کرتے وقت،',
  'ایک شمولیتی اسکول کی تعلیمی ورکشاپ میں،',
  'ہم جماعت گروپوں کے تحقیقی کام کا مشاہدہ کرتے ہوئے،',
  'صلاحیت پر مبنی تدریسی سبق کے دوران،',
  'خوشگوار اور تجرباتی کلاس روم کے ماحول میں،',
  'کثیر الحسی تعلیمی وسائل استعمال کرتے وقت،',
  'تعمیری طریقہ کار سے سبق کی وضاحت کرتے ہوئے،',
  'تصوراتی چارٹ کے ذریعے طلبہ کی رہنمائی کے دوران،',
  'مطبوعہ مواد سے آراستہ سرگرمی پر مبنی کمرۂ جماعت میں،',
  'ورک شیٹس کے تشخیصی جائزے کے دوران،',
  'باہمی تعاون پر مبنی گروپ سرگرمی کراتے ہوئے،',
  'معاشرے اور ماحول سے جڑے ہوئے تعلیمی پیریڈ میں،',
  'بچوں کے غور و فکر والے سوالات کی حوصلہ افزائی کرتے وقت،',
  'ایکٹیویٹی کارڈ اسٹیشن پر طلبہ کے کام کے دوران،',
  'طالب علم مرکوز خواندگی اور فہم کے کمرے میں،',
  'روزمرہ زندگی کی مثالوں سے نصاب کو جوڑتے ہوئے،',
  'اسکول کے باغیچے اور کلاس روم کے مربوط سیشن میں،',
  'متنوع طلبہ کی ضرورت کے مطابق تدریس ڈھالتے وقت،',
  'تجسس سے بھرپور صبح کی علمی بحث میں،',
  'تشکیلی جائزہ روبرکس پر طلبہ سے گفتگو کرتے ہوئے،',
  'کہانی اور ماڈل پر مبنی تدریسی گھنٹی کے دوران،',
  'مشاہداتی اور عملی تجربہ گاہ کے کونے میں،',
  'بغیر دباؤ کے کلاس روم مظاہرے کے دوران،',
  'ساتھی طلبہ کی مدد سے تصوراتی نقشہ بناتے وقت،',
  'منظم اور دلچسپ تعلیمی ماحول میں،',
  'گھریلو تجربات کو اسکول کے علم سے مربوط کرتے ہوئے،',
  'استاد اور طالب علم کے درمیان مثبت مکالمے کے دوران،',
];

// 37 prime-indexed educator/student/school context actors
const EN_ACTORS: string[] = [
  'teacher Meenakshi notices that her students',
  'facilitator Rajesh observes that several learners',
  'mentor Sunita records that classroom groups',
  'educator Arvind finds that young participants',
  'instructor Kavita notes that curious pupils',
  'resource teacher Deepak sees that peer pairs',
  'academic coordinator Pratibha remarks that learners',
  'master trainer Sanjay highlights that students',
  'pedagogy fellow Anjali documents that children',
  'subject teacher Vikram discovers that bench partners',
  'school mentor Rohini observes that active learners',
  'classroom guide Hemant notices that table teams',
  'curriculum lead Swati finds that enthusiastic pupils',
  'senior teacher Prakash notes that inquiry groups',
  'learning facilitator Nisha sees that students',
  'workshop lead Madhuri records that young thinkers',
  'co-teacher Gaurav observes that study triads',
  'inclusive mentor Vandana finds that diverse learners',
  'cluster teacher Suresh notes that classroom peers',
  'observation lead Pooja discovers that project teams',
  'lesson designer Amol sees that participating children',
  'activity mentor Rekha remarks that student circles',
  'field educator Nilesh observes that investigative pairs',
  'diagnostic guide Shilpa finds that developing readers',
  'seminar mentor Kiran notes that analytical learners',
  'lab facilitator Varsha sees that student explorers',
  'faculty mentor Milind records that group members',
  'remedial specialist Chhaya observes that learners',
  'district resource person Yogesh finds that pupils',
  'classroom observer Snehal notes that young cohorts',
  'subject mentor Tushar sees that collaborative pairs',
  'pedagogical coach Smita discovers that students',
  'panel educator Ganesh records that learning groups',
  'instructional lead Pallavi observes that pupils',
  'academic guide Sachin finds that classroom thinkers',
  'module facilitator Supriya notes that active peers',
  'evaluation mentor Mahesh sees that student teams',
];

const MR_ACTORS: string[] = [
  'मीनाक्षी टीचर पाहतात की त्यांचे विद्यार्थी',
  'सुलभक राजेश यांच्या लक्षात येते की काही मुले',
  'मार्गदर्शक सुनीता नोंदवतात की वर्गातील गट',
  'शिक्षक अरविंद यांना आढळते की सहभागी मुले',
  'प्रशिक्षक कविता टिपतात की जिज्ञासू विद्यार्थी',
  'संसाधन शिक्षक दीपक पाहतात की मित्र-जोड्या',
  'समन्वयक प्रतिभा सांगतात की अध्ययनार्थी',
  'तज्ज्ञ प्रशिक्षक संजय स्पष्ट करतात की मुले',
  'अध्यापन सहकारी अंजली नोंदवतात की बालके',
  'विषय शिक्षक विक्रम शोधतात की बाकावरील सहकारी',
  'शाळा मार्गदर्शक रोहिणी पाहतात की कृतिशील मुले',
  'वर्ग मार्गदर्शक हेमंत यांना दिसते की टेबल गट',
  'अभ्यासक्रम प्रमुख स्वाती पाहतात की उत्साही मुले',
  'वरिष्ठ शिक्षक प्रकाश नोंदवतात की शोध गट',
  'अध्ययन सुलभक निशा पाहतात की सर्व विद्यार्थी',
  'कार्यशाळा प्रमुख माधुरी टिपतात की विचारशील मुले',
  'सह-शिक्षक गौरव पाहतात की अभ्यास त्रिकुटे',
  'समावेशक मार्गदर्शक वंदना यांना आढळते की विविध मुले',
  'केंद्र शिक्षक सुरेश नोंदवतात की वर्गसहकारी',
  'निरीक्षण प्रमुख पूजा शोधतात की प्रकल्प चमू',
  'पाठ नियोजक अमोल पाहतात की सहभागी बालके',
  'उपक्रम मार्गदर्शक रेखा सांगतात की चर्चा वर्तुळे',
  'क्षेत्र शिक्षक निलेश पाहतात की शोधक जोड्या',
  'नैदानिक मार्गदर्शक शिल्पा यांना दिसते की वाचक मुले',
  'चर्चासत्र मार्गदर्शक किरण नोंदवतात की विश्लेषक मुले',
  'प्रयोगशाळा सुलभक वर्षा पाहतात की शोधक विद्यार्थी',
  'मार्गदर्शक मिलिंद टिपतात की गटसदस्य',
  'उपचारात्मक तज्ज्ञ छाया पाहतात की शिकणारी मुले',
  'जिल्हा तज्ज्ञ योगेश यांना आढळते की विद्यार्थी',
  'वर्ग निरीक्षक स्नेहल नोंदवतात की बालगट',
  'विषय मार्गदर्शक तुषार पाहतात की सहकारी जोड्या',
  'अध्यापन प्रशिक्षक स्मिता शोधतात की मुले',
  'पॅनेल शिक्षक गणेश नोंदवतात की अध्ययन गट',
  'अध्यापन प्रमुख पल्लवी पाहतात की विद्यार्थी',
  'शैक्षणिक मार्गदर्शक सचिन यांना दिसते की विचारवंत मुले',
  'घटक सुलभक सुप्रिया नोंदवतात की सक्रिय सहकारी',
  'मूल्यमापन मार्गदर्शक महेश पाहतात की विद्यार्थी चमू',
];

const HI_ACTORS: string[] = [
  'शिक्षिका मीनाक्षी देखती हैं कि उनके विद्यार्थी',
  'सुगमकर्ता राजेश पाते हैं कि कई शिक्षार्थी',
  'मार्गदर्शक सुनीता दर्ज करती हैं कि कक्षा समूह',
  'शिक्षक अरविंद देखते हैं कि सहभागी बच्चे',
  'प्रशिक्षक कविता नोट करती हैं कि जिज्ञासु छात्र',
  'संसाधन शिक्षक दीपक देखते हैं कि सहपाठी जोड़े',
  'समन्वयक प्रतिभा बताती हैं कि अध्ययनरत बच्चे',
  'मास्टर ट्रेनर संजय रेखांकित करते हैं कि विद्यार्थी',
  'शिक्षण अध्येता अंजलि लिखती हैं कि बालक',
  'विषय शिक्षक विक्रम पाते हैं कि बेंच साथी',
  'विद्यालय मेंटर रोहिणी देखती हैं कि सक्रिय शिक्षार्थी',
  'कक्षा मार्गदर्शक हेमंत नोटिस करते हैं कि टेबल टीमें',
  'पाठ्यक्रम प्रमुख स्वाति पाती हैं कि उत्साही छात्र',
  'वरिष्ठ शिक्षक प्रकाश दर्ज करते हैं कि अन्वेषण समूह',
  'अधिगम सुगमकर्ता निशा देखती हैं कि सभी छात्र',
  'कार्यशाला प्रमुख माधुरी लिखती हैं कि युवा चिंतक',
  'सह-शिक्षक गौरव देखते हैं कि अध्ययन तिकड़ी',
  'समावेशी मेंटर वंदना पाती हैं कि विविध शिक्षार्थी',
  'संकुल शिक्षक सुरेश नोट करते हैं कि कक्षा सहपाठी',
  'अवलोकन प्रमुख पूजा खोजती हैं कि परियोजना दल',
  'पाठ अभिकल्पक अमोल देखते हैं कि सहभागी बच्चे',
  'गतिविधि मेंटर रेखा बताती हैं कि छात्र घेरे',
  'क्षेत्रीय शिक्षक निलेश देखते हैं कि खोजी जोड़े',
  'नैदानिक मार्गदर्शक शिल्पा पाती हैं कि उभरते पाठक',
  'संगोष्ठी मेंटर किरण नोट करते हैं कि विश्लेषक छात्र',
  'प्रयोगशाला सुगमकर्ता वर्षा देखती हैं कि खोजी विद्यार्थी',
  'संकाय मेंटर मिलिंद दर्ज करते हैं कि समूह सदस्य',
  'उपचारात्मक विशेषज्ञ छाया देखती हैं कि शिक्षार्थी',
  'जिला संदर्भ व्यक्ति योगेश पाते हैं कि छात्रगण',
  'कक्षा पर्यवेक्षक स्नेहल नोट करती हैं कि बाल समूह',
  'विषय मार्गदर्शक तुषार देखते हैं कि सहयोगी जोड़े',
  'शिक्षण कोच स्मिता खोजती हैं कि विद्यार्थी',
  'पैनल शिक्षक गणेश दर्ज करते हैं कि अधिगम समूह',
  'अनुदेशन प्रमुख पल्लवी देखती हैं कि छात्र',
  'अकादमिक मार्गदर्शक सचिन पाते हैं कि कक्षा चिंतक',
  'मॉड्यूल सुगमकर्ता सुप्रिया नोट करती हैं कि सक्रिय साथी',
  'मूल्यांकन मेंटर महेश देखते हैं कि विद्यार्थी दल',
];

const UR_ACTORS: string[] = [
  'معلمہ میناکشی مشاہدہ کرتی ہیں کہ ان کے طلبہ',
  'سہولت کار راجیش دیکھتے ہیں کہ متعدد متعلمین',
  'سرپرست سنیتا نوٹ کرتی ہیں کہ کلاس کے گروپ',
  'استاد اروند پاتے ہیں کہ شریک بچے',
  'ٹرینر کویتا دیکھتی ہیں کہ متجسس طلبہ',
  'ریسورس ٹیچر دیپک مشاہدہ کرتے ہیں کہ ساتھی جوڑے',
  'تعلیمی رابطہ کار پرتبھا بتاتی ہیں کہ طلبہ',
  'ماسٹر ٹرینر سنجے واضح کرتے ہیں کہ شاگرد',
  'تدریسی فیلو انجلی درج کرتی ہیں کہ بچے',
  'مضمون کے استاد وکرم پاتے ہیں کہ بینچ کے ساتھی',
  'اسکول مینٹور روہنی دیکھتی ہیں کہ فعال طلبہ',
  'کلاس گائیڈ ہیمنت نوٹ کرتے ہیں کہ ٹیبل ٹیمیں',
  'نصاب کی سربراہ سواتی دیکھتی ہیں کہ پرجوش طلبہ',
  'سینئر استاد پرکاش درج کرتے ہیں کہ تحقیقی گروپ',
  'تعلیمی سہولت کار نشا دیکھتی ہیں کہ تمام طلبہ',
  'ورکشاپ لیڈ مادھوری لکھتی ہیں کہ نوجوان مفکرین',
  'معاون استاد گورو مشاہدہ کرتے ہیں کہ مطالعاتی گروپ',
  'شمولیتی سرپرست وندنا پاتی ہیں کہ متنوع طلبہ',
  'کلسٹر ٹیچر سریش نوٹ کرتے ہیں کہ ہم جماعت ساتھی',
  'مشاہداتی سربراہ پوجا دیکھتی ہیں کہ پراجیکٹ ٹیمیں',
  'سبق ساز امول مشاہدہ کرتے ہیں کہ شریک طلبہ',
  'سرگرमी مینٹور ریکھا بتاتی ہیں کہ طلبہ کے حلقے',
  'فیلڈ ایجوکیٹر نلیش دیکھتے ہیں کہ تحقیقی جوڑے',
  'تشخیصی گائیڈ شلپا پاتی ہیں کہ ابھرتے ہوئے قارئین',
  'سیمینار مینٹور کرن نوٹ کرتے ہیں کہ تجزیاتی طلبہ',
  'لیب سہولت کار ورشا دیکھتی ہیں کہ کھوجی شاگرد',
  'فیکلٹی مینٹور ملند درج کرتے ہیں کہ گروپ اراکین',
  'علاجی ماہر چھایا مشاہدہ کرتی ہیں کہ متعلمین',
  'ضلعی ریسورس پرسن یوگیش پاتے ہیں کہ طلبہ',
  'کلاس مبصر سنیہل نوٹ کرتی ہیں کہ بچوں کے دستے',
  'مضمون کے سرپرست تشار دیکھते ہیں کہ باہمی جوڑے',
  'تدریسی کوچ سمتا دریافت کرتی ہیں کہ شاگرد',
  'پینल استاد گنیش درج کرتے ہیں کہ تعلیمی گروپ',
  'تدریسی سربراہ پلوی دیکھتی ہیں کہ طلبہ',
  'علمی گائیڈ سچن پاتے ہیں کہ کلاس کے مفکرین',
  'ماڈیول سہولت کار سپریا نوٹ کرتی ہیں کہ فعال ساتھی',
  'جائزہ مینٹور مہیش دیکھتے ہیں کہ طلبہ کی ٹیمیں',
];

// 41 prime-indexed pedagogical settings & instructional methods
const EN_SETTINGS: string[] = [
  'using tactile manipulatives and peer reflection logs',
  'through structured observation cards and group dialogue',
  'with bilingual concept charts and real-life specimens',
  'by comparing local field notes with textbook diagrams',
  'using diagnostic self-checklists and guided prompts',
  'through collaborative storyboards and role-play tasks',
  'with hands-on sorting trays and visual organizer grids',
  'by analyzing authentic classroom work samples together',
  'using inquiry question walls and evidence journals',
  'through step-by-step discovery stations and rubrics',
  'with interactive number lines and pictorial models',
  'by connecting community crafts to school learning goals',
  'using open-ended problem cards and peer explanation',
  'through reflective learning diaries and teacher conferencing',
  'with multi-sensory flash cards and audio-visual cues',
  'by evaluating counter-examples in small study circles',
  'using environmental observation walks and sketchbooks',
  'through formative exit tickets and error-remediation talks',
  'with cooperative jigsaw reading and synthesis sheets',
  'by constructing low-cost working models in teams',
  'using graphic timelines and primary source extracts',
  'through scaffolded think-pair-share classroom routines',
  'with competency-mapped activity sheets and peer review',
  'by linking seasonal local phenomena to core syllabus ideas',
  'using inclusive braille-and-print tactile resource kits',
  'through guided inductive examples before stating rules',
  'with experiential measurement tools and recording tables',
  'by cross-checking hypotheses against empirical observations',
  'using folk narratives and local proverbs as entry bridges',
  'through portfolio curation and mastery-oriented feedback',
  'with visual fraction bars and geometric dot-grid paper',
  'by organizing mock civic assemblies and role discussions',
  'using graded reading corners and comprehension maps',
  'through error-pattern diagnosis and targeted scaffolding',
  'with thematic project integration across school subjects',
  'by encouraging divergent questions and reasoned debate',
  'using daily weather logs and biodiversity tally charts',
  'through contextual word-building games and discourse tasks',
  'with analogical reasoning bridges from familiar routines',
  'by reviewing peer arguments against official NCF criteria',
  'using structured lab observation sheets and safety norms',
];

const MR_SETTINGS: string[] = [
  'स्पर्शगम्य साहित्य व सहपाठी चिंतन नोंदवहीच्या मदतीने',
  'नियोजनबद्ध निरीक्षण कार्ड व गटसंवादाच्या माध्यमातून',
  'द्विभाषिक संकल्पना तक्ते व प्रत्यक्ष नमुन्यांच्या आधारे',
  'स्थानिक क्षेत्रनोंदींची पाठ्यपुस्तकातील आकृत्यांशी तुलना करत',
  'नैदानिक स्व-तपासणी यादी व मार्गदर्शक प्रश्नांद्वारे',
  'सहयोगात्मक चित्रफलक व भूमिकाभिनय उपक्रमातून',
  'प्रत्यक्ष वर्गीकरण ट्रे व दृश्य नियोजक तक्त्यांच्या सहाय्याने',
  'वर्गातील प्रत्यक्ष कार्य-नमुन्यांचे एकत्रित विश्लेषण करून',
  'जिज्ञासा प्रश्न-भिंत व पुरावा नोंदवही वापरून',
  'टप्प्याटप्प्यांच्या शोध-केंद्रांवर रुब्रिक्सच्या मदतीने',
  'संवादात्मक संख्यारेषा व चित्रात्मक प्रतिकृती वापरून',
  'स्थानिक हस्तकलेची शालेय अध्ययन उद्दिष्टांशी सांगड घालत',
  'मुक्तोत्तरी प्रश्न-कार्डे व सहपाठी स्पष्टीकरणाद्वारे',
  'चिंतनशील दैनंदिनी व शिक्षक-विद्यार्थी संवादातून',
  'बहुसंवेदी शब्दकार्डे व दृक-श्राव्य संकेतांच्या मदतीने',
  'लहान अभ्यास वर्तुळात प्रतिउदाहरणांचे मूल्यमापन करत',
  'परिसर निरीक्षण फेरी व रेखाटन वहीच्या सहाय्याने',
  'आकारिक एक्झिट टिकीट व त्रुटी-निरसन चर्चेद्वारे',
  'जिगसॉ सहकारी वाचन व संश्लेषण पत्रकांच्या आधारे',
  'कमी खर्चातील कार्यशील प्रतिकृती गटात तयार करून',
  'कालरेषा तक्ते व प्राथमिक ऐतिहासिक संदर्भांचा वापर करून',
  'थिंक-पेअर-शेअर या आधारभूत वर्गपद्धतीच्या माध्यमातून',
  'सक्षमता-आधारित कृतीपत्रिका व सहपाठी आढाव्याद्वारे',
  'स्थानिक ऋतुमानातील घटनांची मूळ घटकाशी सांगड घालत',
  'समावेशक ब्रेल व स्पर्शगम्य शैक्षणिक संचाच्या सहाय्याने',
  'नियम सांगण्यापूर्वी उद्गामी उदाहरणांचे निरीक्षण करून',
  'प्रत्यक्ष मोजमाप साधने व नोंद-तक्त्यांच्या वापरातून',
  'प्रयोगातील निरीक्षणांच्या आधारे गृहीतकांची पडताळणी करत',
  'लोककथा व स्थानिक म्हणींचा पूर्वज्ञानाचा पूल म्हणून वापर करत',
  'पोर्टफोलिओ संकलन व प्राविण्य-अभिमुख अभिप्रायाद्वारे',
  'अपूर्णांक पट्ट्या व भूमितीय बिंदू-कागदाच्या सहाय्याने',
  'अभिरूप बालसंसद व भूमिका-चर्चेचे आयोजन करून',
  'स्तरित वाचन कोपरा व आकलन नकाशांच्या मदतीने',
  'चुकांच्या आकृतिबंधांचे निदान व लक्षित आधाराद्वारे',
  'आंतरविषयी प्रकल्प समन्वयाच्या माध्यमातून',
  'बहुमुखी प्रश्न व सयुक्तिक वादविवादाला प्रोत्साहन देत',
  'दैनंदिन हवामान नोंदी व जैवविविधता तक्त्यांच्या आधारे',
  'संदर्भयुक्त शब्दखेळ व संभाषण उपक्रमांमधून',
  'परिचित दैनंदिन अनुभवांच्या साम्य-तर्काचा वापर करून',
  'अधिकृत राष्ट्रीय अभ्यासक्रम निकषांवर युक्तिवाद तपासून',
  'सुबद्ध प्रयोगशाळा निरीक्षण पत्रक व सुरक्षा नियमांनुसार',
];

const HI_SETTINGS: string[] = [
  'स्पर्शनीय सामग्री और सहपाठी चिंतन पंजिका की सहायता से',
  'संरचित अवलोकन कार्ड और समूह संवाद के माध्यम से',
  'द्विभाषी अवधारणा चार्ट और वास्तविक नमूनों के आधार पर',
  'स्थानीय क्षेत्रीय टिप्पणियों की पाठ्यपुस्तक आरेखों से तुलना करके',
  'नैदानिक स्व-जाँच सूची और निर्देशित संकेतों के द्वारा',
  'सहयोगात्मक स्टोरीबोर्ड और भूमिका-अभिनय गतिविधि से',
  'हस्तपरक वर्गीकरण ट्रे और दृश्य आयोजक ग्रिड की मदद से',
  'कक्षा के प्रामाणिक कार्य-नमूनों का सामूहिक विश्लेषण करते हुए',
  'जिज्ञासा प्रश्न-पटल और साक्ष्य पंजिका का उपयोग करके',
  'चरणबद्ध खोज केंद्रों और रुब्रिक मानदंडों के माध्यम से',
  'संवादात्मक संख्या-रेखा और चित्रात्मक मॉडल का प्रयोग कर',
  'स्थानीय शिल्प और समुदाय के अनुभवों को अधिगम लक्ष्यों से जोड़कर',
  'मुक्त-अंत प्रश्न कार्ड और सहपाठी व्याख्या के द्वारा',
  'चिंतनशील अधिगम डायरी और शिक्षक परामर्श के माध्यम से',
  'बहु-संवेदी फ्लैश कार्ड और दृश्य-श्रव्य संकेतों की सहायता से',
  'छोटे अध्ययन घेरों में प्रति-उदाहरणों का मूल्यांकन करते हुए',
  'पर्यावरण अवलोकन भ्रमण और स्केचबुक के माध्यम से',
  'रचनात्मक एग्जिट टिकट और त्रुटि-निवारण संवाद द्वारा',
  'जिगसॉ सहकारी पठन और संश्लेषण पत्रकों के आधार पर',
  'समूहों में कम लागत के कार्यशील मॉडल का निर्माण करके',
  'ग्राफिक समय-रेखा और प्राथमिक स्रोत अंशों का उपयोग कर',
  'थिंक-पेयर-शेयर की सोपानिक कक्षा प्रक्रिया के माध्यम से',
  'दक्षता-आधारित कार्यपत्रकों और सहपाठी समीक्षा की सहायता से',
  'स्थानीय मौसमी परिघटनाओं को मूल पाठ्यक्रम से जोड़ते हुए',
  'समावेशी ब्रेल और स्पर्शनीय संसाधन किट का उपयोग करके',
  'नियम बताने से पूर्व आगमन विधि के उदाहरणों का विश्लेषण कर',
  'अनुभवात्मक मापन उपकरणों और प्रेक्षण तालिकाओं के प्रयोग से',
  'प्रयोगजन्य प्रेक्षणों से परिकल्पनाओं का सत्यापन करते हुए',
  'लोककथाओं और स्थानीय लोकोक्तियों को पूर्वज्ञान सेतु बनाकर',
  'पोर्टफोलियो संकलन और दक्षता-उन्मुख प्रतिपुष्टि के माध्यम से',
  'दृश्य भिन्न-पट्टियों और ज्यामितीय बिंदु-ग्रिड कागज की मदद से',
  'मॉक बाल-संसद और नागरिक चर्चा सत्र आयोजित करके',
  'स्तरीकृत पठन कोने और बोध मानचित्रों का उपयोग करते हुए',
  'त्रुटि-पैटर्न निदान और लक्षित पाड़ (Scaffolding) के द्वारा',
  'विषयों के मध्य अंतर-विषयक परियोजना समन्वय स्थापित करके',
  'अपसारी प्रश्नों और तार्किक संवाद को प्रोत्साहित करते हुए',
  'दैनिक मौसम पंजिका और जैव-विविधता मिलान चार्ट की सहायता से',
  'संदर्भयुक्त शब्द-निर्माण खेल और विमर्श कार्यों के माध्यम से',
  'परिचित दिनचर्या से सादृश्यमूलक तर्क का सेतु बनाते हुए',
  'आधिकारिक NCF मानदंडों के आलोक में सहपाठी तर्कों की जाँच कर',
  'सुव्यवस्थित प्रयोगशाला प्रेक्षण पत्रक और सुरक्षा मानकों के साथ',
];

const UR_SETTINGS: string[] = [
  'عملی وسائل اور ساتھی طلبہ کی فکری ڈائری کی مدد سے',
  'منظم مشاہداتی کارڈز اور گروپ مکالمے کے ذریعے',
  'دولسانی تصوراتی چارٹ اور حقیقی نمونوں کی بنیاد پر',
  'مقامی مشاہدات کا درسی کتاب کی اشکال سے موازنہ کر کے',
  'تشخیصی خود جانچ فہرست اور رہنما اشاروں کے ذریعے',
  'باہمی اسٹوری بورڈ اور رول پلے سرگرمیوں کی مدد سے',
  'درجہ بندی ٹرے اور بصری خاکوں کو استعمال کرتے ہوئے',
  'کلاس روم کے حقیقی تحقیقی نمونوں کا اجتماعی تجزیہ کر کے',
  'تحقیقی سوالاتی بورڈ اور شواہد رجسٹر کے استعمال سے',
  'مرحلہ وار دریافت اسٹیشنوں اور روبرکس کے ذریعے',
  'انٹرایکٹو عدد لائن اور تصویری ماڈلز کی مدد سے',
  'مقامی ہنر اور سماجی تجربات کو تعلیمی مقاصد سے جوڑ کر',
  'مفتوح السوالات کارڈز اور باہمی وضاحت کے ذریعے',
  'فکری ڈائری اور استاد کی مشاورت کے توسط سے',
  'کثیر الحسی فلیش کارڈز اور سمعی و بصری اشاروں کے ساتھ',
  'چھوٹے مطالعاتی حلقوں میں جوابی مثالوں کا جائزہ لیتے ہوئے',
  'ماحولیاتی مشاہداتی سیر اور اسکیچ بک کے ذریعے',
  'تشکیلی ایگزٹ ٹکٹ اور اصلاحِ اغلاط کی گفتگو سے',
  'جگسا باہمی مطالعہ اور خلاصہ شیٹس کی بنیاد پر',
  'ٹیموں میں کم لاگت کے فعال ماڈل تیار کر کے',
  'تاریخی ٹائم لائن اور بنیادی ماخذ کے اقتباسات سے',
  'تھنک پیئر شیئر کے منظم طریقۂ کار کے ذریعے',
  'صلاحیت پر مبنی ایکٹیویٹی شیٹس اور ہم جماعت جائزے سے',
  'مقامی موسمی مظاہر کو بنیادی نصاب سے مربوط کرتے ہوئے',
  'شمولیتی بریل اور لمسی تعلیمی کٹ کو بروئے کار لا کر',
  'اصول بتانے سے پہلے استقرائی مثالوں کا مشاہدہ کروا کے',
  'عملی پیमाئشی آلات اور مشاہداتی جدول کے استعمال سے',
  'تجرباتی مشاہدات کی روشنی میں مفروضوں کی تصدیق کر کے',
  'لوک کہانیوں اور مقامی ضرب الامثال کو تعلیمی پُل بنا کر',
  'پورٹ فولیو ترتیب اور مہارت پر مبنی فیڈ بیک کے ذریعے',
  'بصری کسر پٹیوں اور جیومیٹری ڈاٹ گرڈ پیپر کی مدد سے',
  'تمثیلی بزمِ طلبہ اور شہری مباحثے کا انعقاد کر کے',
  'درجہ بند مطالعہ کارنر اور فہم کے نقشوں کے ذریعے',
  'اغلاط کے رجحانات کی تشخیص اور مربوط رہنمائی سے',
  'مضامین کے درمیان مربوط پراجیکٹ سرگرمیوں کے ذریعے',
  'تخلیقی سوالات اور مدلل مباحثے کی حوصلہ افزائی کر کے',
  'روزانہ موسمی ڈائری اور حیاتیاتی تنوع کے چارٹ کی مدد سے',
  'سیاق و سباق پر مبنی الفاظ سازی اور مکالماتی مشق سے',
  'مانوس روزمرہ تجربات سے تمثیلی استدلال جوڑتے ہوئے',
  'سرکاری قومی نصابی معیارات کی روشنی میں دلائل جانچ کر',
  'منظم لیبارٹری مشاہداتی شیٹ اور حفاظتی اصولوں کے ساتھ',
];

// 29 prime-indexed analytical inquiry tails
const EN_TAILS: string[] = [
  'Which option best captures the sound pedagogical conclusion here?',
  'Select the most accurate curriculum-aligned interpretation below:',
  'Which response reflects authentic constructivist understanding?',
  'Identify the scientifically and pedagogically valid explanation:',
  'Which choice aligns directly with official NCF and NEP guidelines?',
  'Determine the most accurate analytical conclusion from the options:',
  'Which statement represents the verified conceptual principle?',
  'Choose the option that accurately resolves this classroom inquiry:',
  'Which justification best demonstrates deep conceptual mastery?',
  'Select the valid evidence-based answer among the four choices:',
  'Which pedagogical action or inference is most appropriate here?',
  'Identify the accurate rule and reasoning supported by the syllabus:',
  'Which explanation correctly links theory to classroom practice?',
  'Choose the most accurate competence-based conclusion below:',
  'Which option provides the exact verified solution and rationale?',
  'Select the sound diagnostic and conceptual judgement here:',
  'Which alternative accurately reflects national curriculum standards?',
  'Identify the precise conceptual truth demonstrated in this case:',
  'Which option best supports equitable and accurate understanding?',
  'Choose the verified explanation that avoids rote misconceptions:',
  'Which conclusion is both factually accurate and pedagogically sound?',
  'Select the option that best answers this syllabus question:',
  'Which statement accurately synthesizes the underlying concept?',
  'Identify the correct principle from the official exam framework:',
  'Which choice gives the unmistakable verified answer here?',
  'Choose the option that best explains the phenomenon under study:',
  'Which reasoning path is completely accurate in this context?',
  'Select the exact syllabus-verified proposition from the list:',
  'Which answer best fulfills the learning outcome targeted here?',
];

const MR_TAILS: string[] = [
  'येथे कोणता पर्याय अचूक शैक्षणिक व शास्त्रीय निष्कर्ष दर्शवतो?',
  'खालीलपैकी अभ्यासक्रमाशी सुसंगत व अचूक अर्थ कोणता?',
  'कोणता प्रतिसाद खऱ्या रचनावादी आकलनाचे दर्शन घडवतो?',
  'शास्त्रीय व अध्यापनशास्त्रीयदृष्ट्या वैध स्पष्टीकरण ओळखा:',
  'कोणता पर्याय अधिकृत NCF आणि NEP मार्गदर्शक तत्त्वांशी जुळतो?',
  'दिलेल्या पर्यायांमधून सर्वात अचूक विश्लेषणात्मक निष्कर्ष निवडा:',
  'कोणते विधान प्रमाणित संकल्पनात्मक तत्त्व अचूक मांडते?',
  'या वर्ग-जिज्ञासेचे अचूक निरसन करणारा पर्याय कोणता?',
  'कोणते समर्थन सखोल संकल्पनात्मक प्रभुत्व सिद्ध करते?',
  'चार पर्यायांमधून पुराव्यावर आधारित अचूक उत्तर निवडा:',
  'येथे कोणती शैक्षणिक कृती किंवा अनुमान सर्वात योग्य ठरेल?',
  'अभ्यासक्रमानुसार अचूक नियम व तर्कसंगती दर्शवणारा पर्याय ओळखा:',
  'कोणते स्पष्टीकरण सिद्धांताची प्रत्यक्ष वर्गव्यवहाराशी अचूक सांगड घालते?',
  'खालीलपैकी सर्वात अचूक सक्षमता-आधारित निष्कर्ष निवडा:',
  'कोणता पर्याय अचूक पडताळलेले उत्तर व कारणमीमांसा देतो?',
  'येथे योग्य नैदानिक व संकल्पनात्मक निर्णय कोणता ठरेल?',
  'कोणता पर्याय राष्ट्रीय अभ्यासक्रम मानकांशी तंतोतंत जुळतो?',
  'या उदाहरणातून स्पष्ट होणारे अचूक संकल्पनात्मक सत्य ओळखा:',
  'कोणता पर्याय सर्वसमावेशक व अचूक आकलनाला बळकटी देतो?',
  'घोकंपट्टीतील गैरसमज टाळणारे प्रमाणित स्पष्टीकरण निवडा:',
  'कोणता निष्कर्ष तथ्यात्मक व अध्यापनशास्त्रीयदृष्ट्या पूर्णपणे बरोबर आहे?',
  'या अभ्यासक्रम प्रश्नाचे सर्वोत्तम उत्तर देणारा पर्याय निवडा:',
  'कोणते विधान मूळ संकल्पनेचे अचूक संश्लेषण करते?',
  'अधिकृत परीक्षा आराखड्यातील अचूक तत्त्व ओळखा:',
  'येथे कोणता पर्याय निःसंदिग्ध व अचूक उत्तर देतो?',
  'अभ्यासाखालील घटनेचे सर्वोत्तम स्पष्टीकरण देणारा पर्याय निवडा:',
  'या संदर्भात कोणता तार्किक मार्ग पूर्णपणे अचूक आहे?',
  'यादीतून अभ्यासक्रम-प्रमाणित अचूक विधान निवडा:',
  'लक्षित अध्ययन निष्पत्ती पूर्ण करणारे सर्वोत्तम उत्तर कोणते?',
];

const HI_TAILS: string[] = [
  'यहाँ कौन-सा विकल्प सटीक शैक्षणिक और वैज्ञानिक निष्कर्ष दर्शाता है?',
  'नीचे दिए गए विकल्पों में से पाठ्यक्रम-सम्मत सही व्याख्या चुनिए:',
  'कौन-सी प्रतिक्रिया प्रामाणिक रचनावादी समझ को प्रकट करती है?',
  'वैज्ञानिक और शिक्षणशास्त्रीय रूप से वैध स्पष्टीकरण पहचानिए:',
  'कौन-सा विकल्प आधिकारिक NCF और NEP दिशा-निर्देशों के अनुरूप है?',
  'विकल्पों में से सबसे सटीक विश्लेषणात्मक निष्कर्ष निर्धारित कीजिए:',
  'कौन-सा कथन सत्यापित वैचारिक सिद्धांत को सही रूप में प्रस्तुत करता है?',
  'इस कक्षा-जिज्ञासा का सटीक समाधान करने वाला विकल्प चुनिए:',
  'कौन-सा तर्क गहन अवधारणात्मक दक्षता को प्रमाणित करता है?',
  'चारों विकल्पों में से साक्ष्य-आधारित सही उत्तर का चयन कीजिए:',
  'यहाँ कौन-सा शैक्षणिक कदम या निष्कर्ष सर्वाधिक उपयुक्त है?',
  'पाठ्यक्रम द्वारा समर्थित सही नियम और तर्क की पहचान कीजिए:',
  'कौन-सा स्पष्टीकरण सिद्धांत को कक्षा-व्यवहार से सही जोड़ता है?',
  'नीचे से सर्वाधिक सटीक दक्षता-आधारित निष्कर्ष चुनिए:',
  'कौन-सा विकल्प पूर्णतः सत्यापित समाधान और तर्क प्रदान करता है?',
  'यहाँ सही नैदानिक और वैचारिक निर्णय कौन-सा होगा?',
  'कौन-सा विकल्प राष्ट्रीय पाठ्यचर्या मानकों को सटीक दर्शाता है?',
  'इस प्रकरण में प्रदर्शित सटीक वैचारिक सत्य की पहचान कीजिए:',
  'कौन-सा विकल्प समतामूलक और सटीक समझ को पुष्ट करता है?',
  'रटंत भ्रांतियों से मुक्त सत्यापित स्पष्टीकरण चुनिए:',
  'कौन-सा निष्कर्ष तथ्यात्मक और शैक्षणिक दोनों दृष्टि से सही है?',
  'इस पाठ्यक्रम प्रश्न का सर्वोत्तम उत्तर देने वाला विकल्प चुनिए:',
  'कौन-सा कथन मूल अवधारणा का सटीक संश्लेषण करता है?',
  'आधिकारिक परीक्षा रूपरेखा के अनुसार सही सिद्धांत पहचानिए:',
  'यहाँ कौन-सा विकल्प असंदिग्ध और सटीक उत्तर देता है?',
  'अध्ययनाधीन परिघटना की सर्वोत्तम व्याख्या करने वाला विकल्प चुनिए:',
  'इस संदर्भ में कौन-सा तार्किक मार्ग पूर्णतः सटीक है?',
  'सूची में से पाठ्यक्रम-सत्यापित सही कथन का चयन कीजिए:',
  'यहाँ लक्षित अधिगम प्रतिफल को पूरा करने वाला सही उत्तर कौन-सा है?',
];

const UR_TAILS: string[] = [
  'یہاں کون سا متبادل درست تعلیمی اور تحقیقی نتیجہ پیش کرتا ہے؟',
  'ذیل کے متبادلات میں سے نصاب کے مطابق درست تشریح منتخب کریں:',
  'کون سا جواب حقیقی تعمیری فہم کی عکاسی کرتا ہے؟',
  'سائنسی اور تدریسی طور پر درست وضاحت کی نشاندہی کریں:',
  'کون سا انتخاب سرکاری قومی نصابی رہنما اصولوں کے عین مطابق ہے؟',
  'دیے گئے اختیارات میں سے درست ترین تجزیاتی نتیجہ متعین کریں:',
  'کون سا بیان تصدیق شدہ تصوراتی اصول کی نمائندگی کرتا ہے؟',
  'اس تعلیمی سوال کا درست حل پیش کرنے والا متبادل چنیں:',
  'کون سی دلیل گہری تصوراتی مہارت کو ثابت کرتی ہے؟',
  'چاروں متبادلات میں سے شواہد پر مبنی درست جواب منتخب کریں:',
  'اس صورتِ حال میں کون سا تدریسی اقدام سب سے مناسب ہے؟',
  'نصاب سے ہم آہंग درست قاعدے اور استدلال کی شناخت کریں:',
  'کون سی وضاحت نظریے کو کلاس روم کے عمل سے درست جوڑتی ہے؟',
  'ذیل میں سے صلاحیت پر مبنی درست ترین نتیجہ منتخب کریں:',
  'کون سا متبادل مکمل طور پر تصدیق شدہ حل اور منطق فراہم کرتا ہے؟',
  'یہاں درست تشخیصی اور تصوراتی فیصلہ کون سا ہوگا؟',
  'کون سا متبادل قومی نصابی معیارات کی درست ترجمانی کرتا है؟',
  'اس مثال سے واضح ہونے والی درست تصوراتی حقیقت بتائیں:',
  'کون سا انتخاب مساوی اور درست فہم کی بہترین تائید کرتا ہے؟',
  'رٹے کی غلط فہمیوں سے پاک تصدیق شدہ وضاحت منتخب کریں:',
  'کون سا نتیجہ حقائق اور تدریسی اصولوں دونوں لحاظ سے درست ہے؟',
  'اس نصابی سوال کا بہترین جواب دینے والا متبادل چنیں:',
  'کون سا بیان بنیادی تصور کا درست خلاصہ پیش کرتا ہے؟',
  'سرکاری امتحانی فریم ورक کے مطابق درست اصول پہچانیں:',
  'یہاں کون سا انتخاب غیر مبہم اور تصدیق شدہ جواب دیتا ہے؟',
  'زیرِ مطالعہ مظہر کی بہترین وضاحت کرنے والا متبادل چنیں:',
  'اس سیاق و سباق میں کون سا منطقی راستہ مکمل طور پر درست ہے؟',
  'فہرست میں से نصاب سے تصدیق شدہ درست قول منتخب کریں:',
  'یہاں مطلوبہ تعلیمی ماحصل کو پورا کرنے والا درست جواب کون سا ہے؟',
];

export function composeVariedTrilingualStem(params: {
  core: TrilingualSyllabusCore;
  bijectiveSeed: number;
  paper: TetCtetPaperNumber;
  exam: TetCtetExamType;
}): { enQ: string; mrQ: string; hiQ: string } {
  const { core, bijectiveSeed, paper, exam } = params;
  // Multiply by prime 100003 (< 1,363,783 and coprime to 31, 37, 41, 29) so consecutive
  // slots also jump across all 4 residue classes while preserving strict CRT bijection.
  const k = Math.abs(bijectiveSeed);
  const iLead = (k * 3) % 31;
  const iActor = (k * 5) % 37;
  const iSetting = (k * 7) % 41;
  const iTail = (k * 11) % 29;

  const enLead = (paper === 1 ? EN_LEADS_P1 : EN_LEADS_P2)[iLead];
  const mrLead = (paper === 1 ? MR_LEADS_P1 : MR_LEADS_P2)[iLead];
  const hiLead = (paper === 1 ? HI_LEADS_P1 : HI_LEADS_P2)[iLead];

  const enActor = EN_ACTORS[iActor];
  const mrActor = MR_ACTORS[iActor];
  const hiActor = HI_ACTORS[iActor];

  const enSetting = EN_SETTINGS[iSetting];
  const mrSetting = MR_SETTINGS[iSetting];
  const hiSetting = HI_SETTINGS[iSetting];

  const enTail = EN_TAILS[iTail];
  const mrTail = MR_TAILS[iTail];
  const hiTail = HI_TAILS[iTail];

  const boardEn = exam === 'MAHA_TET' ? 'Maharashtra state curriculum' : 'national CBSE curriculum';
  const boardMr = exam === 'MAHA_TET' ? 'महाराष्ट्र राज्य अभ्यासक्रम' : 'राष्ट्रीय सीबीएसई अभ्यासक्रम';
  const boardHi = exam === 'MAHA_TET' ? 'महाराष्ट्र राज्य पाठ्यचर्या' : 'राष्ट्रीय सीबीएसई पाठ्यचर्या';

  return {
    enQ: `${enLead} ${enActor} explore ${core.topic} ${enSetting} under the ${boardEn}: ${core.en.q} ${enTail}`,
    mrQ: `${mrLead} ${mrActor} ${mrSetting} ${boardMr} अंतर्गत '${core.topic}' हा घटक अभ्यासतात: ${core.mr.q} ${mrTail}`,
    hiQ: `${hiLead} ${hiActor} ${hiSetting} ${boardHi} के अंतर्गत '${core.topic}' का अध्ययन करते हैं: ${core.hi.q} ${hiTail}`,
  };
}

export function composeVariedLanguageStem(params: {
  language: TetCtetLanguage;
  topic: string;
  corePrompt: string;
  bijectiveSeed: number;
  paper: TetCtetPaperNumber;
  exam: TetCtetExamType;
  passageTitle?: string;
  passageText?: string;
}): string {
  const { language, topic, corePrompt, bijectiveSeed, paper, exam, passageTitle, passageText } =
    params;
  const k = Math.abs(bijectiveSeed);
  const iLead = (k * 3) % 31;
  const iActor = (k * 5) % 37;
  const iSetting = (k * 7) % 41;
  const iTail = (k * 11) % 29;

  if (language === 'Marathi') {
    const lead = (paper === 1 ? MR_LEADS_P1 : MR_LEADS_P2)[iLead];
    const actor = MR_ACTORS[iActor];
    const setting = MR_SETTINGS[iSetting];
    const tail = MR_TAILS[iTail];
    const board = exam === 'MAHA_TET' ? 'महाराष्ट्र राज्य भाषा अभ्यासक्रम' : 'राष्ट्रीय भाषा अभ्यासक्रम';
    const questionLine = `${lead} ${actor} ${setting} ${board} संदर्भात '${topic}' या घटकाचे विश्लेषण करतात: ${corePrompt} ${tail}`;
    if (passageText) {
      return `दिलेल्या उताऱ्याचे काळजीपूर्वक वाचन करा ("${passageTitle || topic}"): "${passageText}"\n\n${questionLine}`;
    }
    return questionLine;
  }

  if (language === 'Hindi') {
    const lead = (paper === 1 ? HI_LEADS_P1 : HI_LEADS_P2)[iLead];
    const actor = HI_ACTORS[iActor];
    const setting = HI_SETTINGS[iSetting];
    const tail = HI_TAILS[iTail];
    const board = exam === 'MAHA_TET' ? 'महाराष्ट्र राज्य भाषा पाठ्यचर्या' : 'राष्ट्रीय भाषा पाठ्यचर्या';
    const questionLine = `${lead} ${actor} ${setting} ${board} के अंतर्गत '${topic}' का विश्लेषण करते हैं: ${corePrompt} ${tail}`;
    if (passageText) {
      return `निम्नलिखित गद्यांश/पद्यांश को ध्यानपूर्वक पढ़िए ("${passageTitle || topic}"): "${passageText}"\n\n${questionLine}`;
    }
    return questionLine;
  }

  if (language === 'Urdu') {
    const lead = UR_LEADS[iLead];
    const actor = UR_ACTORS[iActor];
    const setting = UR_SETTINGS[iSetting];
    const tail = UR_TAILS[iTail];
    const questionLine = `${lead} ${actor} ${setting} '${topic}' کے پہلو کا جائزہ لیتے ہیں: ${corePrompt} ${tail}`;
    if (passageText) {
      return `Read the following اقتباس ("${passageTitle || topic}"): "${passageText}"\n\n${questionLine}`;
    }
    return questionLine;
  }

  const lead = (paper === 1 ? EN_LEADS_P1 : EN_LEADS_P2)[iLead];
  const actor = EN_ACTORS[iActor];
  const setting = EN_SETTINGS[iSetting];
  const tail = EN_TAILS[iTail];
  const board = exam === 'MAHA_TET' ? 'Maharashtra state language curriculum' : 'national CBSE language curriculum';
  const questionLine = `${lead} ${actor} examine ${topic} ${setting} under the ${board}: ${corePrompt} ${tail}`;
  if (passageText) {
    return `Read the following passage ("${passageTitle || topic}"): "${passageText}"\n\n${questionLine}`;
  }
  return questionLine;
}
