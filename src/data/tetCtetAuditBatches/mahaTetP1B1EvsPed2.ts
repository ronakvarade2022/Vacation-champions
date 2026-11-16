import { CuratedTrilingualMcq } from './types';

// MAHA TET Paper 1 (Classes 1-5) — EVS Pedagogy Part 2 (32 Distinct Fair Testing, Cross-Curricular, Inclusive & Assessment Items)
export const MAHA_TET_P1_B1_EVS_P2: CuratedTrilingualMcq[] = [
  {
    topic: 'Fair Testing & Controlling One Variable at a Time',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 5 group wants to test scientifically whether bean seeds need SUNLIGHT to sprout. They place Pot A (wet cotton, sunny windowsill) and Pot B (dry cotton, dark cupboard). Why is this NOT a fair test?',
      opts: [
        'Two variables (light AND moisture) were changed simultaneously; Pot B must also receive equal water so only sunlight varies',
        'Pot A had green cotton instead of blue',
        'Seeds cannot sprout on cotton',
        'Cupboards block gravity',
      ],
      exp: 'A fair experiment keeps all conditions equal (same seeds, cotton, water, temperature) except the single tested variable (light).',
    },
    mr: {
      q: 'इयत्ता ५ वीच्या गटाला "बीज अंकुरणासाठी सूर्यप्रकाश आवश्यक असतो का?" हे तपासायचे आहे. त्यांनी कुंडी अ (ओला कापूस, सूर्यप्रकाशात) व कुंडी ब (कोरडा कापूस, अंधारात) ठेवली. हा "निष्पक्ष प्रयोग" (Fair Test) का नाही?',
      opts: [
        'येथे प्रकाश आणि ओलावा हे दोन घटक एकाच वेळी बदलले आहेत; दोन्ही कुंड्यांत समान पाणी ठेवून फक्त प्रकाश हा एकच घटक बदलायला हवा',
        'कापूस रंगीत नव्हता',
        'कापसावर बिया उगवत नाहीत',
        'कपाटात गुरुत्वाकर्षण नसते',
      ],
      exp: 'वैज्ञानिक प्रयोगात निष्कर्षाची अचूकता राखण्यासाठी इतर सर्व घटक समान ठेवून एका वेळी फक्त एकच चल (Variable) बदलावे लागते.',
    },
    hi: {
      q: 'कक्षा ५ के बच्चे जाँचना चाहते हैं कि अंकुरण के लिए धूप आवश्यक है या नहीं। वे गमला A (गीली रुई, धूप में) व गमला B (सूखी रुई, अंधेरे में) रखते हैं। यह निष्पक्ष परीक्षण (Fair Test) क्यों नहीं है?',
      opts: [
        'दोनों में धूप और नमी—दो चर एक साथ बदल दिए गए हैं; दोनों में समान जल रखकर केवल प्रकाश को ही बदलना चाहिए',
        'रुई सफेद थी',
        'रुई पर बीज नहीं उगते',
        'अंधेरे में गुरुत्व नहीं होता',
      ],
      exp: 'निष्पक्ष वैज्ञानिक प्रयोग में अन्य सभी कारकों को समान रखकर एक समय में केवल एक ही परीक्षण-चर बदला जाता है।',
    },
  },
  {
    topic: 'Prediction vs Wild Guessing in Inquiry',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Before placing a peeled boiled egg into plain tap water versus salty water, the teacher asks students to PREDICT what will happen and explain WHY. How does a scientific prediction differ from blind guessing?',
      opts: [
        'Prediction connects prior knowledge or earlier observations with logical reasoning to anticipate an outcome',
        'Prediction must always turn out 100% right or lose marks',
        'Guessing uses calculators while prediction uses dice',
        'Prediction bans discussing earlier experiences',
      ],
      exp: 'Even when an experiment disproves a reasoned prediction, cognitive disequilibrium deepens scientific conceptual restructuring.',
    },
    mr: {
      q: 'उकडलेले अंडे साध्या पाण्यात व खारट पाण्यात टाकण्यापूर्वी शिक्षक मुलांना "काय होईल याचा अंदाज (Prediction) बांधून कारण सांगा" म्हणतात. शास्त्रीय अंदाज व आंधळा तर्क यांत काय फरक आहे?',
      opts: [
        'शास्त्रीय अंदाज पूर्वीचे अनुभव व निरीक्षणांवर आधारित तर्कशुद्ध कारणासह मांडलेला असतो',
        'अंदाज बरोबर न आल्यास गुण कापले जातात',
        'आंधळा तर्क जास्त वैज्ञानिक असतो',
        'अंदाजात पूर्वीचे अनुभव वापरता येत नाहीत',
      ],
      exp: 'कारणासह मांडलेला अंदाज तपासल्यावर जरी वेगळे फळ मिळाले तरी विचारांची पुनर्रचना होऊन संकल्पना अधिक पक्की होते.',
    },
    hi: {
      q: 'प्रयोग से पहले शिक्षक बच्चों से उबले अंडे के सादे व खारे पानी में डूबने-तैरने का तर्क सहित "पूर्वानुमान" (Prediction) पूछते हैं। वैज्ञानिक पूर्वानुमान अंधे तुक्के से कैसे भिन्न है?',
      opts: [
        'पूर्वानुमान पूर्व-अनुभव व अवलोकन पर आधारित तार्किक कारण के साथ संभावित परिणाम बताता है',
        'पूर्वानुमान गलत होने पर अंक काटे जाते हैं',
        'तुक्का अधिक वैज्ञानिक है',
        'पूर्वानुमान में पूर्व-ज्ञान निषिद्ध है',
      ],
      exp: 'तर्क आधारित पूर्वानुमान और फिर प्रत्यक्ष परीक्षण (Predict-Observe-Explain) बच्चों में गहन वैचारिक समझ निर्मित करता है।',
    },
  },
  {
    topic: 'Handling Unexpected or Failed Experiment Results',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'During a class demonstration of rainwater condensation on an ice tumbler, high dry heat causes mist not to show clearly on the glass immediately. What should the EVS teacher model?',
      opts: [
        'Respond openly: "Interesting! Why did droplets not appear yet? Let us observe temperature, humidity, and wait or check glass coldness together!"',
        'Falsify the answer verbally and ban children from looking closely',
        'Scold students for staring at the tumbler',
        'Conclude water vapour does not exist in nature',
      ],
      exp: 'Scientific integrity values honest observation, investigating anomalies, and refining conditions rather than faking textbook outcomes.',
    },
    mr: {
      q: 'बर्फाच्या पेल्याबाहेर पाण्याचे थेंब (संघनन) दाखवण्याच्या प्रयोगात कोरड्या उष्णतेमुळे लगेच थेंब न दिसल्यास शिक्षकाने कोणता आदर्श वैज्ञानिक दृष्टिकोन दाखवावा?',
      opts: [
        'प्रामाणिकपणे मुलांना विचारणे: "वा! अद्याप थेंब का दिसले नाहीत? हवा खूप कोरडी आहे का किंवा बर्फ कमी थंड आहे का, चला एकत्र तपासूया!"',
        'खोटेच थेंब दिसले असे सांगून मुलांना जवळ पाहण्यास मनाई करणे',
        'मुलांना रागावणे',
        'हवेत बाष्प नसते असा निष्कर्ष जाहीर करणे',
      ],
      exp: 'अपेक्षित परिणाम न आल्यास कारणे शोधणे व प्रामाणिक राहणे हाच खऱ्या वैज्ञानिक वृत्तीचा पाया आहे.',
    },
    hi: {
      q: 'बर्फ के गिलास पर संघनन दिखाने के प्रयोग में शुष्क मौसम के कारण तुरंत बूँदें न दिखें, तो शिक्षक को कौन-सा वैज्ञानिक दृष्टिकोण अपनाना चाहिए?',
      opts: [
        'ईमानदारी से जिज्ञासा जगाना: "बूँदें अभी क्यों नहीं बनीं? आइए तापमान व आर्द्रता की स्थिति एक साथ जाँचें!"',
        'झूठ बोलकर बच्चों को पास न आने देना',
        'छात्रों को डाँटना',
        'हवा में जलवाष्प न होने का दावा करना',
      ],
      exp: 'अनपेक्षित परिणामों को छिपाने के बजाय उनके कारणों की पड़ताल करना सच्ची वैज्ञानिक ईमानदारी और खोजी प्रवृत्ति सिखाता है।',
    },
  },
  {
    topic: 'Spiral Curriculum Progression Across Classes 3 to 5',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Notice how the theme "Water" appears in Class 3 (local sources, storing water), Class 4 (river journey, pollution, ORS), and Class 5 (rainwater harvesting, Dead Sea salinity, groundwater crisis). This curriculum pattern represents:',
      opts: [
        'Bruner’s Spiral Curriculum — revisiting core themes with progressively deeper conceptual, social, and analytical complexity',
        'Unplanned careless repetition of identical lessons',
        'Deleting topics randomly every year',
        'Teaching postgraduate hydrology in Class 3',
      ],
      exp: 'Spiral organization honours children’s growing cognitive maturity, expanding from immediate home water to ecological and civic water systems.',
    },
    mr: {
      q: '"पाणी" ही थीम इयत्ता ३ री (स्थानिक स्रोत), ४ थी (नदीचा प्रवास, प्रदूषण, ORS) व ५ वी (जलसंचयन, मृत समुद्र, भूजल टंचाई) अशी वाढत्या सखोलतेने येते. ही अभ्यासक्रम रचना कोणती?',
      opts: [
        'ब्रुनरचा वर्तुळाकार/सर्पिलाकार अभ्यासक्रम (Spiral Curriculum) — वाढत्या वयानुसार तीच थीम अधिक सखोल व व्यापक स्तरावर उलगडणे',
        'नियोजनशून्य पुनरावृत्ती',
        'विषय अचानक वगळणे',
        'तिसरीतच महाविद्यालयीन जलशास्त्र शिकवणे',
      ],
      exp: 'सर्पिलाकार मांडणीत विद्यार्थ्यांच्या बौद्धिक परिपक्वतेनुसार परिचित अनुभवांतून वैज्ञानिक व सामाजिक व्याप्ती वाढवली जाते.',
    },
    hi: {
      q: '"जल" थीम कक्षा ३ (स्थानीय स्रोत), कक्षा ४ (नदी की यात्रा, प्रदूषण, ORS) व कक्षा ५ (वर्षा जल संचयन, मृत सागर, भूजल संकट) में क्रमिक गहराई से आती है। यह संरचना कहलाती है:',
      opts: [
        'ब्रूनर का वर्तुलाकार पाठ्यक्रम (Spiral Curriculum) — परिचित विषयों को बढ़ती आयु के साथ अधिक गहन स्तर पर दोहराना',
        'अनावश्यक दोहराव',
        'यादृच्छिक कटौती',
        'कक्षा ३ में कॉलेज स्तर का ज्ञान',
      ],
      exp: 'वर्तुलाकार पाठ्यक्रम बच्चे के संज्ञानात्मक विकास के अनुरूप बुनियादी थीम को क्रमशः विस्तृत व विश्लेषणात्मक बनाता है।',
    },
  },
  {
    topic: 'Integrating EVS With Primary Mathematics',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Which authentic classroom task meaningfully integrates Primary EVS with Mathematics?',
      opts: [
        'Recording weekly classroom rain-gauge millimetres or weighing lunch nutrition portions and plotting simple pictographs/bar charts',
        'Solving 50 abstract five-digit division drills unrelated to life',
        'Copying multiplication tables backwards silently',
        'Memorizing dictionary spellings of animal names',
      ],
      exp: 'Measurement, data handling, map scales, and weather graphs showcase Mathematics as a living tool inside environmental inquiry.',
    },
    mr: {
      q: 'खालीलपैकी कोणता उपक्रम प्राथमिक EVS आणि गणित विषयांचा अर्थपूर्ण समन्वय (Integration) साधतो?',
      opts: [
        'शाळेतील पर्जन्यमापकात साठलेल्या पावसाचे मिलिमीटर मोजून किंवा घरच्या पाणी वापराचे लिटर नोंदवून साधा स्तंभालेख/चित्रालेख काढणे',
        'जीवनाशी संबंध नसलेली ५० मोठी भागाकार गणिते सोडवणे',
        'पाढे उलट्या क्रमाने लिहिणे',
        'फक्त प्राण्यांची स्पेलिंग पाठ करणे',
      ],
      exp: 'मापन, माहिती संकलन, नकाशा प्रमाण व आलेख यांद्वारे गणित थेट परिसर अभ्यासाचे प्रभावी साधन बनते.',
    },
    hi: {
      q: 'निम्नलिखित में से कौन-सी गतिविधि प्राथमिक EVS और गणित विषय का सार्थक समन्वय करती है?',
      opts: [
        'साप्ताहिक वर्षा-मापी में मिलीमीटर या घरेलू जल उपयोग लीटर दर्ज कर सरल चित्रालेख/दंड-आलेख बनाना',
        'संदर्भहीन पचास बड़े भाग के सवाल हल करना',
        'उल्टे पहाड़े लिखना',
        'जानवरों की वर्तनी रटना',
      ],
      exp: 'मापन, आँकड़ों का संग्रहण, मानचित्र पैमाना और मौसम ग्राफ गणित को पर्यावरणीय अन्वेषण से सहज जोड़ते हैं।',
    },
  },
  {
    topic: 'Integrating EVS With Art, Music & Craft',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Creating fallen-leaf rubbings, clay animal toys, and composing short Marathi/Hindi folk songs on monsoon frogs during EVS lessons exemplifies:',
      opts: [
        'Art-Integrated Learning (NEP 2020) deepening sensory observation, joy, and creative environmental expression',
        'Wasting precious textbook lecture minutes',
        'Replacing EVS completely with drawing exams',
        'Forcing professional sculpture standards',
      ],
      exp: 'Leaf rubbing reveals venation patterns effortlessly while craft and songs build joyous affective attachment to nature.',
    },
    mr: {
      q: 'गळालेल्या पानांचे ठसे (Leaf Rubbing), मातीचे प्राणी बनवणे आणि पावसाळी बेडकांवर गाणी रचणे हे EVS उपक्रम कशाचे प्रतीक आहेत?',
      opts: [
        'कला-एकात्मिक अध्ययन (Art-Integrated Learning — NEP 2020), ज्यामुळे सूक्ष्म निरीक्षण, आनंद आणि सर्जनशील अभिव्यक्ती वाढते',
        'अभ्यासाचा वेळ वाया घालवणे',
        'फक्त चित्रकलेची परीक्षा घेणे',
        'व्यावसायिक शिल्पकार बनवणे',
      ],
      exp: 'पानांचे ठसे काढल्याने शिरांची रचना सहज कळते आणि कला-गाणी निसर्गाशी भावनिक नाते घट्ट करतात.',
    },
    hi: {
      q: 'गिरे पत्तों की छाप (Leaf Rubbing), मिट्टी के खिलौने बनाना और बरसात के गीत रचना EVS शिक्षण में क्या दर्शाते हैं?',
      opts: [
        'कला-एकीकृत अधिगम (NEP 2020), जो संवेदी अवलोकन, आनंद और सृजनात्मक पर्यावरणीय अभिव्यक्ति को गहरा करता है',
        'पढ़ाई का समय बर्बाद करना',
        'EVS को चित्रकला परीक्षा में बदलना',
        'पेशेवर मूर्तिकार बनाना',
      ],
      exp: 'कला-एकीकृत गतिविधियाँ (पत्ती के छापे, मिट्टी कला, लोकगीत) प्राकृतिक संरचनाओं के अवलोकन और आनंददायी सीखने को समृद्ध करती हैं।',
    },
  },
  {
    topic: 'Addressing Family Diversity With Sensitivity',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'During the theme "My Family", a learner lives with a single mother or with grandparents because parents migrated for work, while textbooks mostly show nuclear mother-father-two-kids drawings. What must the teacher ensure?',
      opts: [
        'Affirm diverse family structures warmly (joint, nuclear, single-parent, extended caregivers) so every child feels belonging and dignity',
        'Insist only mother-father-two-children households qualify as "real families"',
        'Ask the child publicly why their father lives away',
        'Skip the child’s family tree activity entirely',
      ],
      exp: 'Inclusive EVS affirms varied caregiving structures respectfully without embarrassing or marginalizing any pupil.',
    },
    mr: {
      q: '"माझे कुटुंब" घटकात एका विद्यार्थ्याचे आई-वडील कामासाठी स्थलांतरित असल्याने तो आजी-आजोबांकडे राहतो किंवा एकल पालक कुटुंबात राहतो. शिक्षकाने कोणती संवेदनशील भूमिका घ्यावी?',
      opts: [
        'विभक्त, एकत्र, एकल पालक व आजी-आजोबांसोबतचे असे सर्व कुटुंब प्रकार तितकेच आदरणीय व नैसर्गिक मानून प्रत्येक मुलास आपलेपणा जाणवू देणे',
        'फक्त आई-वडील-दोन मुले हेच खरे कुटुंब असल्याचे सांगणे',
        'वर्गासमोर मुलाची खाजगी कौटुंबिक चौकशी करणे',
        'त्या मुलाला उपक्रमातून वगळणे',
      ],
      exp: 'प्रत्येक मुलाच्या कौटुंबिक रचनेचा सन्मान केल्याने वर्गात सुरक्षितता व समावेशक वातावरण राहते.',
    },
    hi: {
      q: '"मेरा परिवार" पाठ में कोई बच्चा एकल माता या दादा-दादी के साथ रहता है जबकि चित्रों में प्रायः माता-पिता-दो बच्चे दिखाए जाते हैं। शिक्षक को क्या सुनिश्चित करना चाहिए?',
      opts: [
        'संयुक्त, एकल, दादा-दादी या एकल-अभिभावक सभी पारिवारिक रूपों को समान सम्मान व अपनत्व के साथ स्वीकार करना',
        'केवल चार लोगों वाले परिवार को ही असली बताना',
        'सबके सामने निजी पारिवारिक प्रश्न पूछना',
        'बच्चे को गतिविधि से हटा देना',
      ],
      exp: 'पारिवारिक विविधता को सहज व सम्मानपूर्ण स्वीकृति देना समावेशी EVS शिक्षण की प्रमुख आवश्यकता है।',
    },
  },
  {
    topic: 'Handling Dietary & Cultural Food Habits Without Bias',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'While sharing tiffin box foods during "Foods We Eat", one pupil mocks another child’s fermented bamboo shoot / millet bhakri / dry fish lunch as "weird smelling". What should the EVS teacher do?',
      opts: [
        'Calmly guide the class to appreciate how climate, soil, crops, and regional heritage shape diverse healthy cuisines, cultivating cultural respect',
        'Ban home tiffins containing regional dishes permanently',
        'Side with the mocking student to encourage conformity',
        'Assign extra writing homework to the child who brought regional food',
      ],
      exp: 'Food lessons celebrate regional agricultural diversity and reject culinary prejudice or bullying.',
    },
    mr: {
      q: 'डबा वाटून खाताना एका मुलाने दुसऱ्याच्या भाकरी, बांबू भाजी किंवा प्रादेशिक पदार्थांच्या वासाची खिल्ली उडवली. शिक्षकाने काय करावे?',
      opts: [
        'हवामान, पीकपद्धती आणि सांस्कृतिक परंपरांनुसार भारतातील अन्नविविधता कशी समृद्ध आहे हे शांतपणे समजावून परस्परांच्या अन्नाचा आदर शिकवावा',
        'प्रादेशिक पदार्थ डब्यात आणण्यास बंदी घालावी',
        'थट्टा करणाऱ्या मुलाचे समर्थन करावे',
        'वेगळा डबा आणणाऱ्या मुलाला शिक्षा द्यावी',
      ],
      exp: 'अन्नविषयक पाठ विविध संस्कृतींतील अन्नपरंपरांचा आदर व सहिष्णुता रुजवण्यासाठी असतात.',
    },
    hi: {
      q: 'टिफिन साझा करते समय एक बच्चा दूसरे के क्षेत्रीय भोजन (जैसे बाजरे की रोटी या बांस की सब्जी) की गंध पर हँसता है। शिक्षक को क्या करना चाहिए?',
      opts: [
        'यह समझाना कि स्थानीय जलवायु, फसलों और संस्कृति के अनुसार भोजन में विविधता स्वाभाविक व समृद्ध है, अतः हर भोजन का सम्मान करें',
        'क्षेत्रीय भोजन लाने पर रोक लगाना',
        'हँसने वाले का समर्थन करना',
        'पीड़ित बच्चे को दंडित करना',
      ],
      exp: 'भोजन पाठों का उद्देश्य क्षेत्रीय व सांस्कृतिक विविधता के प्रति सम्मान और पूर्वाग्रह-मुक्ति विकसित करना है।',
    },
  },
  {
    topic: 'School Campus as Living Outdoor Learning Lab',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Establishing a school "Herb Patch, Rainwater Barrel, Bird Water Bowl, and Leaf-Compost Pit" turns the schoolyard into an outdoor EVS lab mainly because:',
      opts: [
        'Students observe authentic daily ecological cycles, seasons, insects, and plant growth firsthand rather than solely through flat textbook pages',
        'It eliminates the need for indoor classrooms completely',
        'Students clean grounds merely as unpaid labour',
        'It replaces reading and writing skills',
      ],
      exp: 'Living campus corners create continuous daily curiosity, stewardship, and multisensory observation.',
    },
    mr: {
      q: 'शाळेच्या आवारात औषधी वनस्पती कोपरा, पावसाळी पाणी संकलन, पक्ष्यांसाठी पाणपोई आणि पालापाचोळा खतखड्डा तयार केल्याने शाळा "जिवंत परिसर प्रयोगशाळा" का बनते?',
      opts: [
        'विद्यार्थी केवळ छापील पुस्तकांपलीकडे जाऊन ऋतू, कीटक, रोपांची वाढ आणि निसर्गचक्र रोज प्रत्यक्ष अनुभवू शकतात',
        'त्यामुळे वर्गखोल्यांची गरज संपते',
        'मुलांकडून श्रम करवून घेण्यासाठी',
        'वाचन-लेखन बंद करण्यासाठी',
      ],
      exp: 'परिसरातील जिवंत उपक्रम मुलांमध्ये रोजचे निरीक्षण, जबाबदारी व पर्यावरणीय कृतिशीलता वाढवतात.',
    },
    hi: {
      q: 'विद्यालय परिसर में औषधीय पौधों की क्यारी, वर्षा-जल संग्रहण, पक्षी जल-पात्र व कम्पोस्ट गड्ढा बनाने से परिसर जीवंत प्रयोगशाला कैसे बनता है?',
      opts: [
        'बच्चे किताबों से आगे बढ़कर पौधों की वृद्धि, कीट-पक्षी और पारिस्थितिक चक्रों का प्रतिदिन प्रत्यक्ष अवलोकन व देखभाल करते हैं',
        'इससे कक्षाओं की जरूरत खत्म हो जाती है',
        'बच्चों से मुफ्त मजदूरी कराने को',
        'पढ़ना-लिखना बंद करने को',
      ],
      exp: 'जीवंत परिसर कोने निरंतर अवलोकन, देखभाल की आदत और व्यावहारिक पारिस्थितिक समझ विकसित करते हैं।',
    },
  },
  {
    topic: 'Diagnostic Pre-Assessment Before New Unit',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Before beginning a unit on "Where Does Our Food Digest and Travel?", the teacher hands blank body outlines asking learners to sketch where they think eaten roti goes inside. Why use this quick diagnostic sketch?',
      opts: [
        'To uncover learners’ existing mental models and intuitive misconceptions early so instruction bridges directly from what they already believe',
        'To enter permanent report-card marks before teaching anything',
        'To ridicule wrong anatomical drawings',
        'To test drawing speed purely',
      ],
      exp: 'Diagnostic probing illuminates starting understandings and hidden misconceptions prior to formal explanation.',
    },
    mr: {
      q: '"अन्नाचे पचन कसे होते?" हा घटक सुरू करण्यापूर्वी शिक्षिका प्रत्येकाला मानवी शरीराची रिकामी बाह्यरेषा देऊन "खाल्लेली पोळी आत कुठे जाते ते काढून दाखवा" सांगतात. या निदानात्मक कृतीचा हेतू काय?',
      opts: [
        'अध्यापनापूर्वी विद्यार्थ्यांच्या मनातील पूर्वकल्पना व संभाव्य गैरसमज जाणून घेऊन त्यानुसार अचूक मार्गदर्शन सुरू करणे',
        'शिकवण्याआधीच गुणपत्रकावर कायमचे गुण देणे',
        'चुकीच्या चित्रांची थट्टा करणे',
        'फक्त चित्रकलेचा वेग मोजणे',
      ],
      exp: 'पूर्वज्ञानाची व पूर्वधारणांची निदानात्मक तपासणी केल्यास नवीन वैज्ञानिक संकल्पना योग्य प्रकारे बांधता येतात.',
    },
    hi: {
      q: '"भोजन का पाचन" शुरू करने से पहले शिक्षिका शरीर के खाली खाके पर बच्चों से यह चित्र बनाने को कहती हैं कि खाई गई रोटी अंदर कहाँ जाती है। इस निदानात्मक कार्य का उद्देश्य क्या है?',
      opts: [
        'शिक्षण से पूर्व बच्चों की मौजूदा मानसिक धारणाओं और संभावित भ्रांतियों को जानना ताकि प्रभावी सेतु बनाया जा सके',
        'पढ़ाने से पहले रिपोर्ट कार्ड के अंक देना',
        'गलत चित्रों का मज़ाक उड़ाना',
        'चित्रकला की गति जाँचना',
      ],
      exp: 'निदानात्मक आकलन शिक्षण से पहले बच्चे के पूर्व-ज्ञान व वैकल्पिक अवधारणाओं की पहचान करने में मदद करता है।',
    },
  },
  {
    topic: 'Analytic Rubrics for EVS Models & Group Projects',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Instead of assigning an arbitrary single number like "7/10" to students’ rain-harvesting models, why should an EVS teacher co-share a transparent Analytic Rubric beforehand?',
      opts: [
        'Students see clear criteria (concept clarity, eco-friendly materials, working demonstration, teamwork, oral explanation) guiding focused self-improvement',
        'Rubrics make grading impossible to understand',
        'Rubrics ensure only expensive store-bought kits win prizes',
        'Teachers never need to inspect the actual models',
      ],
      exp: 'Clear rubrics reduce bias, communicate expectations early, and celebrate conceptual understanding over costly purchased kits.',
    },
    mr: {
      q: 'मुलांनी बनवलेल्या जलसंचयन प्रतिकृतींना मनमानी "७/१०" गुण देण्यापेक्षा स्पष्ट "मूल्यांकन निकषपत्रिका" (Analytic Rubric) आधीच का द्यावी?',
      opts: [
        'संकल्पना स्पष्टता, पर्यावरणपूरक साहित्य, प्रात्यक्षिक, गटसहकार्य व सादरीकरण हे निकष विद्यार्थ्यांना आधीच कळून स्व-सुधारणा साधता येते',
        'निकषांमुळे तपासणी कठीण होते',
        'फक्त बाजारातील महागड्या वस्तूंना बक्षीस मिळते',
        'प्रतिकृती पाहण्याची गरज राहत नाही',
      ],
      exp: 'स्पष्ट रूब्रिकमुळे मूल्यांकन पारदर्शक व निष्पक्ष होते आणि महागड्या सजावटीपेक्षा वैज्ञानिक समजेला महत्त्व मिळते.',
    },
    hi: {
      q: 'वर्षा-जल संचयन मॉडल पर मनमाना "७/१०" अंक देने के बजाय शिक्षक को पहले से पारदर्शी "रूब्रिक" (Rubric) क्यों साझा करना चाहिए?',
      opts: [
        'इससे छात्रों को स्पष्ट मानदंड (अवधारणा स्पष्टता, कम लागत/पुनर्नवीनीकृत सामग्री, कार्यप्रणाली, टीमवर्क, व्याख्या) ज्ञात होते हैं और वे स्व-सुधार कर पाते हैं',
        'रूब्रिक मूल्यांकन को अस्पष्ट बनाता है',
        'इससे केवल महँगे बाजारू मॉडल जीतते हैं',
        'मॉडल देखने की जरूरत नहीं पड़ती',
      ],
      exp: 'विश्लेषणात्मक रूब्रिक मूल्यांकन को वस्तुनिष्ठ व पारदर्शी बनाता है तथा महँगी सजावट की जगह वैचारिक समझ को महत्व देता है।',
    },
  },
  {
    topic: 'Zero-Waste Models vs Store-Bought Thermocol',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'For the school science exhibition on "Save Earth", a parent buys a shiny non-biodegradable thermocol-and-plastic factory model. How should the teacher guide future exhibitions consistently with EVS values?',
      opts: [
        'Encourage student-built low-cost models using recycled cardboard, clay, twigs, and scrap paper while valuing child-explained understanding over flashy store-bought polish',
        'Award first prize strictly to the costliest market thermocol model',
        'Ban parents from attending exhibitions',
        'Require single-use styrofoam boards for neatness',
      ],
      exp: 'Practising what EVS preaches means using low-waste reusable materials and judging learners’ authentic voice.',
    },
    mr: {
      q: '"पृथ्वी वाचवा" प्रदर्शनासाठी एका विद्यार्थ्याने दुकानातून विकत घेतलेली महागडी थर्माकोल-प्लास्टिकची प्रतिकृती आणली. EVS मूल्यांनुसार शिक्षकाने यापुढे कोणती दिशा द्यावी?',
      opts: [
        'मुलांनी स्वतः पुठ्ठा, माती, काटक्या व टाकाऊ कागदापासून बनवलेल्या प्रतिकृतींना आणि त्यांच्या स्वतःच्या स्पष्टीकरणाला प्राधान्य देणे',
        'सर्वात महागड्या विकतच्या थर्माकोल मॉडेललाच पहिले बक्षीस देणे',
        'पालकांना प्रदर्शनात येण्यास बंदी घालणे',
        'सजावटीसाठी थर्माकोल अनिवार्य करणे',
      ],
      exp: 'पर्यावरणपूरक साहित्य व मुलांची स्वतःची कृतिशील समज हेच खऱ्या EVS प्रदर्शनाचे मूल्य आहे.',
    },
    hi: {
      q: '"पृथ्वी बचाओ" प्रदर्शनी में एक अभिभावक बाजार से चमकदार थर्माकोल का मॉडल खरीद लाता है। EVS मूल्यों के अनुरूप शिक्षक को क्या बढ़ावा देना चाहिए?',
      opts: [
        'बच्चों द्वारा स्वयं गत्ते, मिट्टी, बेकार कागज से बने कम-लागत पर्यावरण-अनुकूल मॉडलों और बच्चों की अपनी व्याख्या को प्राथमिकता देना',
        'सबसे महँगे बाजारू मॉडल को प्रथम पुरस्कार देना',
        'अभिभावकों के प्रवेश पर रोक लगाना',
        'थर्माकोल अनिवार्य करना',
      ],
      exp: 'EVS के सिद्धांतों के अनुरूप पुनर्नवीनीकृत सामग्री से छात्र-निर्मित मॉडल और उनकी मौलिक समझ को प्रोत्साहित करना चाहिए।',
    },
  },
  {
    topic: 'Peer Assessment and Self-Reflection Checklists',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'After group presentations on "Local Birds", learners fill out a friendly 3-star peer card ("One neat fact I learned from your group + One helpful question"). Why incorporate structured peer assessment?',
      opts: [
        'Active listening improves, children internalize quality standards, and constructive feedback builds collaborative learning community',
        'Students replace teachers’ salary duties',
        'Friends compete fiercely to tear peers down',
        'Teachers never read student presentations again',
      ],
      exp: 'Structured, supportive peer review develops metacognition, attentive listening, and respectful critique.',
    },
    mr: {
      q: '"स्थानिक पक्षी" गट सादरीकरणानंतर मुले मित्रांना "तुमच्या गटातून शिकलेली एक छान गोष्ट + एक उपयुक्त प्रश्न" लिहून देतात. समवयस्क मूल्यमापनाचा (Peer Assessment) मुख्य फायदा काय?',
      opts: [
        'मुले एकाग्रतेने ऐकतात, कामाचा दर्जा समजून घेतात व सकारात्मक अभिप्रायातून सहकार्याची संस्कृती वाढते',
        'मुले शिक्षकांची नोकरी घेतात',
        'मित्र एकमेकांना कमी लेखण्याची स्पर्धा करतात',
        'शिक्षकांनी कधीच सादरीकरण पाहू नये म्हणून',
      ],
      exp: 'सकारात्मक समवयस्क मूल्यमापनातून सक्रिय श्रवण, स्व-निरीक्षण व रचनात्मक संवाद कौशल्ये वाढतात.',
    },
    hi: {
      q: '"स्थानीय पक्षी" प्रस्तुति के बाद बच्चे साथियों को "आपसे सीखा एक रोचक तथ्य + एक सहायक प्रश्न" कार्ड देते हैं। सहपाठी आकलन (Peer Assessment) का मुख्य लाभ क्या है?',
      opts: [
        'सक्रिय श्रवण बढ़ता है, बच्चे गुणवत्ता मानक समझते हैं और रचनात्मक प्रतिपुष्टि से सहयोगी समुदाय बनता है',
        'छात्र शिक्षक की जगह लेते हैं',
        'आपसी कटु प्रतिस्पर्धा बढ़ती है',
        'शिक्षक को सुनने की जरूरत नहीं रहती',
      ],
      exp: 'संरचित सहपाठी आकलन बच्चों में ध्यानपूर्वक सुनने, अधिसंज्ञान और सम्मानजनक समीक्षा का कौशल विकसित करता है।',
    },
  },
  {
    topic: 'Supporting Slow-Paced & First-Generation Learners',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'In a class where several first-generation schoolgoers struggle to read dense textbook paragraphs about "Seeds and Germination", how can an EVS teacher scaffold success immediately?',
      opts: [
        'Pair visual picture sequencing cards, live soaked seed dissections, bilingual home words, and collaborative buddy sharing before reading short captions',
        'Wait passively until they master silent dictionary reading in Class 6',
        'Seat struggling readers in the back corner during science games',
        'Ask them to copy paragraphs ten times at home',
      ],
      exp: 'Multimodal concrete scaffolding unlocks scientific ideas regardless of decoding fluency while simultaneously nurturing reading.',
    },
    mr: {
      q: 'पहिल्या पिढीतील काही विद्यार्थ्यांना "बियांचे अंकुरण" हा मोठा परिच्छेद वाचायला अडचण येत असल्यास शिक्षकाने त्वरित कोणती आधारभूत रचना (Scaffolding) करावी?',
      opts: [
        'प्रत्यक्ष भिजवलेली बी उघडून दाखवणे, चित्रक्रमाची कार्डे, घरचे परिचित शब्द आणि मित्रांच्या सहकार्याने अनुभवानंतर लहान वाक्यांचे वाचन घेणे',
        'वाचन सुधारण्याची इयत्ता ६ वीपर्यंत वाट पाहणे',
        'त्या मुलांना मागील बाकावर बसवणे',
        'तोच परिच्छेद घरी दहा वेळा लिहून आणायला सांगणे',
      ],
      exp: 'दृश्य, स्पर्श व मौखिक अनुभवांचा आधार दिल्यास वाचनाची गती कमी असली तरी मूल वैज्ञानिक संकल्पना सहज आत्मसात करते.',
    },
    hi: {
      q: 'यदि पहली पीढ़ी के कुछ शिक्षार्थियों को "बीज अंकुरण" का लंबा गद्यांश पढ़ने में कठिनाई आ रही हो, तो शिक्षक को तुरंत क्या सहायता (Scaffolding) देनी चाहिए?',
      opts: [
        'प्रत्यक्ष भीगा बीज खोलकर दिखाना, चित्र-क्रम कार्ड, घरेलू शब्द और सहपाठी सहयोग के साथ अनुभव के बाद छोटे वाक्यों से जोड़ना',
        'कक्षा ६ तक इंतजार करना',
        'उन्हें पीछे बैठा देना',
        'दस बार नकल लिखवाना',
      ],
      exp: 'मूर्त व बहुसंवेदी सहायता (Scaffolding) पढ़ने में धीमे बच्चों को भी अवधारणात्मक समझ से वंचित नहीं होने देती।',
    },
  },
  {
    topic: 'Extending Gifted & High-Curiosity Learners',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Two Class 5 students quickly finish measuring leaf shapes and excitedly ask whether cacti breathe differently at night than mango trees. How should the teacher nurture these advanced inquirers?',
      opts: [
        'Offer an open enrichment challenge (e.g., designing a comparison table of desert vs rainforest adaptations using library books) rather than assigning repetitive extra sums',
        'Tell them "That is Class 11 biology; sit quietly and wait!"',
        'Assign them to write the same worksheet five extra times',
        'Send them out to sweep the corridor for finishing early',
      ],
      exp: 'Enrichment deepens inquiry autonomously without humiliating curiosity or giving punitive busywork.',
    },
    mr: {
      q: 'इयत्ता ५ वीचे दोन जिज्ञासू विद्यार्थी पानांचा उपक्रम लवकर पूर्ण करून "निवडुंग आणि आंब्याचे झाड रात्री वेगळ्या प्रकारे श्वसन करतात का?" असा सखोल प्रश्न विचारतात. शिक्षकाने काय करावे?',
      opts: [
        'तोच सराव पुन्हा न देता वाळवंटी व सदाहरित वनस्पतींच्या अनुकूलनांचा तुलनात्मक तक्ता पुस्तकालयातून शोधण्याचे पूरक आव्हान (Enrichment) देणे',
        '"हा अकरावीचा भाग आहे, गप्प बसा!" असे सांगणे',
        'तीच कार्यपत्रिका पाच वेळा लिहायला सांगणे',
        'ओसरी झाडायला पाठवणे',
      ],
      exp: 'जिज्ञासू विद्यार्थ्यांच्या प्रश्नांना पूरक शोधकार्य (Enrichment) दिल्याने त्यांची संशोधनवृत्ती बहरते.',
    },
    hi: {
      q: 'कक्षा ५ के दो जिज्ञासु बच्चे गतिविधि शीघ्र पूरी कर पूछते हैं कि क्या कैक्टस और आम का पेड़ अलग तरह से श्वसन करते हैं। शिक्षक को क्या करना चाहिए?',
      opts: [
        'दोहराव वाले कार्य के बजाय पुस्तकालय से मरुस्थलीय व सदाबहार पौधों के अनुकूलन की तुलनात्मक तालिका खोजने का संवर्धन कार्य (Enrichment) देना',
        '"यह कक्षा ११ का विषय है, चुप बैठो" कहना',
        'वही कार्यपत्रक पाँच बार लिखवाना',
        'बाहर भेज देना',
      ],
      exp: 'प्रतिभाशाली व जिज्ञासु शिक्षार्थियों को अतिरिक्त दोहराव के बजाय गहराई से खोजबीन के संवर्धन अवसर देने चाहिए।',
    },
  },
  {
    topic: 'Overcoming Fear of Animals/Insects With Ecological Facts',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'When a harmless garden spider or dragonfly enters the classroom and students panic shouting "Kill it immediately!", how should an EVS teacher respond?',
      opts: [
        'Calmly guide safe observation from a respectful distance, highlight how spiders/dragonflies control mosquitoes and pests, and gently release it outdoors',
        'Crush it loudly to demonstrate human dominance',
        'Run screaming out of school to stay relatable',
        'Lock students inside with the insect as punishment',
      ],
      exp: 'Calm curiosity replaces fear-driven destruction with ecological appreciation and safe, humane handling.',
    },
    mr: {
      q: 'वर्गात बिनविषारी कोळी किंवा चतुर (Dragonfly) आल्यावर मुले घाबरून "त्याला मारून टाका!" असे ओरडतात. EVS शिक्षकाने काय करावे?',
      opts: [
        'मुलांना शांत करून सुरक्षित अंतरावरून त्याचे निरीक्षण घडवणे, कोळी-चतुर हे डास व कीटक नियंत्रणात कसे मदत करतात हे सांगून त्याला हळुवारपणे बाहेर निसर्गात सोडणे',
        'सर्वांसमोर त्याला चिरडून मारणे',
        'शिक्षकानेही किंचाळत पळून जाणे',
        'मुलांना वर्गात कोंडून ठेवणे',
      ],
      exp: 'भीतीऐवजी शांत निरीक्षण व पर्यावरणीय उपयुक्ततेची जाणीव करून दिल्यास प्राणिदया व वैज्ञानिक दृष्टी विकसित होते.',
    },
    hi: {
      q: 'कक्षा में एक हानिरहित मकड़ी या व्याधपतंग (Dragonfly) आने पर बच्चे डरकर "इसे मार दो!" चिल्लाते हैं। शिक्षक को क्या करना चाहिए?',
      opts: [
        'शांत रहकर सुरक्षित दूरी से अवलोकन कराना, बताना कि ये मच्छरों को खाकर मदद करते हैं और सावधानी से बाहर प्रकृति में छोड़ देना',
        'सबके सामने कुचल देना',
        'बच्चों के साथ चिल्लाकर भागना',
        'बच्चों को अंदर बंद करना',
      ],
      exp: 'भय के स्थान पर शांत अवलोकन और पारिस्थितिक महत्व बताना जीवों के प्रति संवेदनशीलता व वैज्ञानिक दृष्टि जगाता है।',
    },
  },
  {
    topic: 'Using Audio-Visual Simulations for Inaccessible Phenomena',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Since primary schoolers cannot physically visit a coral reef, volcanic crater, or outer space microgravity station, when are interactive digital videos or simulations MOST effective?',
      opts: [
        'Used selectively alongside teacher pauses, predictive questioning, and concrete local analogies rather than passive screen-watching',
        'Played nonstop all week while the teacher checks messages',
        'Substituted even for touching real leaves, rocks, and water in the schoolyard',
        'Shown in silence without any follow-up reflection',
      ],
      exp: 'Technology complements—never replaces—hands-on reality, bridging inaccessible phenomena when anchored by active inquiry pauses.',
    },
    mr: {
      q: 'प्राथमिक वर्गातील मुले प्रत्यक्ष अंतराळ स्थानक, प्रवाळ बेटे किंवा ज्वालामुखी पाहू शकत नसल्याने दृक-श्राव्य व्हिडिओ व सिम्युलेशन केव्हा सर्वाधिक प्रभावी ठरतात?',
      opts: [
        'निष्क्रियपणे सलग न दाखवता शिक्षकाने मध्येच थांबवून प्रश्न विचारत, स्थानिक उदाहरणांशी जोडत व चर्चेद्वारे दाखवल्यास',
        'शिक्षकाच्या जागी आठवडाभर सतत स्क्रीन चालू ठेवल्यास',
        'शाळेच्या बागेतील खरी पाने-माती स्पर्श करण्याऐवजी फक्त व्हिडिओ दाखवल्यास',
        'कोणतीही चर्चा न करता मूक दाखवल्यास',
      ],
      exp: 'तंत्रज्ञान प्रत्यक्ष अनुभवांना पूरक असावे; मध्येच थांबून विचारलेले प्रश्न आणि चर्चा स्क्रीन अध्ययन सक्रिय ठेवतात.',
    },
    hi: {
      q: 'चूँकि बच्चे प्रत्यक्ष अंतरिक्ष, प्रवाल भित्ति या ज्वालामुखी नहीं देख सकते, अतः डिजिटल वीडियो या सिमुलेशन कब सर्वाधिक प्रभावी होते हैं?',
      opts: [
        'जब शिक्षक उन्हें बीच-बीच में रोककर प्रश्न पूछे, स्थानीय उदाहरणों से जोड़े और सक्रिय चिंतन कराए (न कि निष्क्रिय स्क्रीन दर्शन)',
        'जब पूरा सप्ताह बिना रुके चलाया जाए',
        'जब स्कूल के असली पौधे छूने की जगह केवल वीडियो दिखाया जाए',
        'बिना किसी चर्चा के चुपचाप दिखाया जाए',
      ],
      exp: 'तकनीक प्रत्यक्ष अनुभव की पूरक है; सार्थक विराम और संवाद वीडियो को सक्रिय अधिगम में बदलते हैं।',
    },
  },
  {
    topic: 'Critical Literacy on Food Packaging & Nutrition Labels',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Asking Class 5 children to bring empty biscuit wrappers, juice cartons, and ORS sachets to read Manufacture/Expiry dates, FSSAI seal, Ingredient order, and Sugar grams achieves what?',
      opts: [
        'Develops critical consumer literacy, health awareness, and functional reading of real-world environmental print',
        'Promotes eating junk chips daily in class',
        'Acts as free advertising for soda companies',
        'Tests memorizing corporate CEO addresses',
      ],
      exp: 'Examining nutrition panels empowers children to question misleading TV commercials and pick wholesome foods.',
    },
    mr: {
      q: 'इयत्ता ५ वीच्या मुलांना बिस्किट पुडे, ज्यूस पॅकेट व ORS पाकीट आणून त्यावरील उत्पादन/मुदतबाह्य तारीख (Expiry Date), FSSAI चिन्ह व साखरेचे प्रमाण वाचायला लावल्याने कोणता हेतू साध्य होतो?',
      opts: [
        'सजग ग्राहक साक्षरता, आरोग्य जाणीव आणि खऱ्या जीवनातील माहितीचे चिकित्सक वाचन विकसित होते',
        'वर्गात रोज जंक फूड खाण्यास उत्तेजन मिळते',
        'कंपन्यांची मोफत जाहिरात होते',
        'कंपनी मालकाचा पत्ता पाठ होतो',
      ],
      exp: 'अन्न वेष्टनावरील घटक व तारीख वाचण्याची सवय मुलांना फसव्या जाहिरातींपासून वाचवणारी सजग नागरिक बनवते.',
    },
    hi: {
      q: 'कक्षा ५ के छात्रों से खाली बिस्कुट पैकेट, जूस कार्टन व ORS पैकेट पर निर्माण/समाप्ति तिथि (Expiry Date), FSSAI चिह्न व चीनी की मात्रा पढ़वाने का मुख्य लाभ क्या है?',
      opts: [
        'आलोचनात्मक उपभोक्ता साक्षरता, स्वास्थ्य जागरूकता और वास्तविक मुद्रित सामग्री के विश्लेषण की क्षमता विकसित होती है',
        'जंक फूड खाने को बढ़ावा मिलता है',
        'कंपनियों का मुफ्त विज्ञापन होता है',
        'केवल पते याद होते हैं',
      ],
      exp: 'पोषण लेबल व एक्सपायरी तिथि पढ़ना बच्चों को भ्रामक विज्ञापनों के प्रति जागरूक व विवेकशील उपभोक्ता बनाता है।',
    },
  },
  {
    topic: 'Concept Mapping to Synthesize Interdependence',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'At the end of the "Forests & Soil" unit, students draw linked bubbles showing how "Trees → Roots Hold Soil → Absorb Rain → Recharge Wells → Feed Crops → Support Birds & Humans" using linking verbs on arrows. This tool is:',
      opts: [
        'A Concept Map (Novak) visualizing meaningful ecological relationships rather than isolated facts',
        'An alphabetical spelling glossary',
        'A timed attendance table',
        'A punitive detention diagram',
      ],
      exp: 'Novakian concept maps organize hierarchical and cyclical connections meaningfully in long-term memory.',
    },
    mr: {
      q: '"जंगल आणि मृदा" घटक संपल्यावर मुले बाणांवर जोडशब्द लिहून "झाडे → मुळे माती धरतात → पाणी मुरते → विहिरी भरतात → पिके व पक्षी जगतात" अशी परस्परसंबंधांची साखळी काढतात. या साधनास काय म्हणतात?',
      opts: [
        'संकल्पना चित्र / नकाशा (Concept Map — नोव्हाक), जे सुट्ट्या तथ्यांऐवजी परस्परावलंबन स्पष्ट करते',
        'वर्णानुक्रमे शब्दकोश',
        'हजेरी तक्ता',
        'शिक्षेचा आराखडा',
      ],
      exp: 'संकल्पना चित्रांमुळे विविध घटकांमधील परस्परसंबंध व कारणमीमांसा एका दृष्टिक्षेपात समजते.',
    },
    hi: {
      q: '"वन और मृदा" इकाई के अंत में बच्चे तीरों पर संयोजक शब्द लिखकर "पेड़ → जड़ें मिट्टी रोकती हैं → वर्षा जल रिसता है → कुएँ भरते हैं → फसलें उगती हैं" का आरेख बनाते हैं। यह उपकरण है:',
      opts: [
        'अवधारणा मानचित्र (Concept Map — नोवाक), जो अलग तथ्यों के बजाय पारिस्थितिक अंतर्संबंध दर्शाता है',
        'वर्णमाला शब्दकोश',
        'उपस्थिति तालिका',
        'दंडात्मक चार्ट',
      ],
      exp: 'अवधारणा मानचित्र विभिन्न पर्यावरणीय घटकों के बीच अर्थपूर्ण संबंधों को व्यवस्थित व स्थायी रूप से दर्शाता है।',
    },
  },
  {
    topic: 'Humane Ethics When Studying Small Garden Insects',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'When students inspect an earthworm or ladybug during a soil exploration task, what ethical boundary must every primary EVS teacher insist upon?',
      opts: [
        'Observe gently in natural shade with damp soil without hurting, starving, or trapping the creature, then return it promptly to its exact habitat',
        'Pin dried beetles permanently onto cardboard displays as Class 3 homework',
        'Pour salt or soap onto earthworms to watch them squirm',
        'Keep frogs sealed inside dry jars for a week',
      ],
      exp: 'Scientific inquiry in primary school explicitly nurtures reverence for life ("Ahimsa" / compassionate stewardship).',
    },
    mr: {
      q: 'मातीच्या अभ्यासादरम्यान मुले गांडूळ किंवा सोनकिड्याचे निरीक्षण करत असताना शिक्षकाने कोणती नैतिक मर्यादा काटेकोरपणे पाळावी?',
      opts: [
        'त्याला कोणतीही इजा न करता ओलसर सावलीत शांतपणे निरीक्षण करून लगेच त्याच्या मूळ जागी सुरक्षित सोडून देणे',
        'इयत्ता ३ रीच्या गृहपाठासाठी कीटकांना टाचण्या टोचून पुठ्ठ्यावर चिकटवणे',
        'गांडुळावर मीठ किंवा साबण टाकून मजा पाहणे',
        'बेडकाला आठवडाभर कोरड्या बरणीत बंद ठेवणे',
      ],
      exp: 'प्राथमिक EVS मधील निरीक्षण नेहमी सजीवसृष्टीबद्दलच्या करुणा व आदरभावाशी सुसंगत असावे.',
    },
    hi: {
      q: 'मृदा अध्ययन के दौरान केंचुए या गुबरैले का अवलोकन करते समय शिक्षक को किस नैतिक नियम का सख्ती से पालन कराना चाहिए?',
      opts: [
        'बिना किसी कष्ट के नम छाया में सूक्ष्म अवलोकन कर तुरंत उसे सुरक्षित उसके प्राकृतिक आवास में वापस छोड़ देना',
        'गृहकार्य हेतु कीड़ों को पिन से गत्ते पर चिपकाना',
        'केंचुए पर नमक या साबुन डालना',
        'मेंढक को सूखे जार में हफ्ते भर बंद रखना',
      ],
      exp: 'प्राथमिक स्तर पर वैज्ञानिक अन्वेषण में जीवों के प्रति करुणा और अहिंसक व्यवहार अनिवार्य मूल्य है।',
    },
  },
  {
    topic: 'Intrinsic Eco-Stewardship vs Bribes & Competition',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'If a school offers expensive cash prizes only to the single student who brings the most plastic bottles to collect, children sometimes buy fresh bottles just to dump them for prizes. What cultivates genuine eco-stewardship instead?',
      opts: [
        'Celebrating collective class zero-plastic milestones, canteen reduction habits, and cloth-bag pledge reflections that reward genuine behavioural reduction',
        'Doubling the individual cash prize for bottle weight',
        'Fining poor families automatically every Monday',
        'Judging cleanliness solely by decorative plastic banners',
      ],
      exp: 'Extrinsic competitive hoarding often backfires (Cobra Effect); collective reflection builds intrinsic sustainable habits.',
    },
    mr: {
      q: 'सर्वात जास्त प्लास्टिक बाटल्या गोळा करणाऱ्या एकाच मुलाला मोठे बक्षीस ठेवल्यास मुले जिंकण्यासाठी नवीन बाटल्या फेकू शकतात. खऱ्या पर्यावरण-दक्षतेसाठी काय अधिक योग्य ठरते?',
      opts: [
        'कापडी पिशवी वापरणे, वर्गाचा एकत्रित "कमी-प्लास्टिक" संकल्प आणि रोजच्या सवयींतील बदलांचे सामूहिक कौतुक करणे',
        'वैयक्तिक रोख बक्षीस दुप्पट करणे',
        'गरीब कुटुंबांना दर सोमवारी दंड लावणे',
        'प्लास्टिकच्याच सजावटीवर स्वच्छता मोजणे',
      ],
      exp: 'वैयक्तिक अति-स्पर्धेपेक्षा सामूहिक कृती व दैनंदिन सवयींतील सकारात्मक बदल खऱ्या अर्थाने टिकाऊ ठरतात.',
    },
    hi: {
      q: 'सबसे अधिक प्लास्टिक बोतलें जमा करने वाले एक बच्चे को बड़ा नकद इनाम रखने पर बच्चे जीतने के लिए नई बोतलें ला सकते हैं। सच्चे पर्यावरण संरक्षण हेतु क्या बेहतर है?',
      opts: [
        'कपड़े के थैले का उपयोग, कक्षा के सामूहिक "प्लास्टिक-मुक्ति" लक्ष्य और दैनिक व्यवहार परिवर्तन की सराहना करना',
        'नकद इनाम दोगुना करना',
        'गरीब परिवारों पर जुर्माना लगाना',
        'केवल प्लास्टिक बैनरों से मूल्यांकन करना',
      ],
      exp: 'बाह्य व्यक्तिगत प्रतिस्पर्धा के बजाय सामूहिक पर्यावरणीय लक्ष्य और आंतरिक आदत परिवर्तन स्थायी परिणाम देते हैं।',
    },
  },
  {
    topic: 'Overcoming Urban Text Bias & Valuing Rural/Forest Knowledge',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Many rural, tribal, and farming children recognize 20+ wild greens, monsoon cloud shifts, and soil textures intuitively, yet feel shy because standardized tests celebrate only urban gadgets. An equitable EVS teacher will:',
      opts: [
        'Integrate learners’ rich ecological and agricultural funds of knowledge directly into classroom inquiry so rural/indigenous wisdom shines alongside urban examples',
        'Dismiss wild herbs as "uneducated village talk"',
        'Test strictly using air-conditioned metro rail diagrams',
        'Discourage farm children from speaking about crops',
      ],
      exp: 'Honouring diverse local funds of knowledge ("Funds of Knowledge" pedagogy) closes equity gaps and validates every child’s dignity.',
    },
    mr: {
      q: 'ग्रामीण व आदिवासी भागातील मुलांना वीसपेक्षा जास्त रानभाज्या, मातीचे प्रकार व पावसाचे संकेत उपजत माहीत असतात, पण शहरी केंद्रित परीक्षांमुळे ती बुजतात. समताधिष्ठित EVS शिक्षक काय करेल?',
      opts: [
        'ग्रामीण व आदिवासी विद्यार्थ्यांच्या समृद्ध पारंपरिक निसर्गज्ञानाला ("Funds of Knowledge") वर्गातील अभ्यासात मानाचे स्थान देऊन सर्व अनुभवांचा सन्मान करणे',
        'रानभाज्यांच्या माहितीला "अडाणी गावठी गोष्टी" म्हणून झिडकारणे',
        'फक्त मेट्रो रेल्वेच्या आकृत्यांवर परीक्षा घेणे',
        'शेतीविषयक बोलण्यास बंदी घालणे',
      ],
      exp: 'विद्यार्थ्यांच्या जीवनविश्वातील ज्ञानाचा आदर केल्याने ग्रामीण व वंचित घटकांतील मुलांचा आत्मविश्वास व सहभाग वाढतो.',
    },
    hi: {
      q: 'ग्रामीण व जनजातीय बच्चों को अनेक स्थानीय साग-सब्जियों, मिट्टी व मौसम के संकेतों का गहरा व्यावहारिक ज्ञान होता है, पर शहरी-केंद्रित परीक्षाओं के कारण वे संकोच करते हैं। न्यायसंगत शिक्षक क्या करेगा?',
      opts: [
        'ग्रामीण व देशज पारिस्थितिक ज्ञान को कक्षा अन्वेषण में सम्मानजनक स्थान देकर हर बच्चे की पृष्ठभूमि को मूल्यवान मानना',
        'इसे "गाँव की अनपढ़ बातें" कहकर नकारना',
        'केवल मेट्रो रेल के चित्रों पर परीक्षा लेना',
        'खेती की चर्चा रोकना',
      ],
      exp: 'बच्चों के स्थानीय व पारंपरिक ज्ञान को पाठ्यक्रम से जोड़ना शैक्षिक समता और गरिमा सुनिश्चित करता है।',
    },
  },
  {
    topic: 'Differentiated Multi-Station Classroom Organization',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'In a large Class 4 room with limited science equipment (one magnifying glass, one compass, one balance scale), how should the teacher organize an interactive EVS practical period?',
      opts: [
        'Set up rotating Learning Stations (Lens Station, Compass Station, Weighing Station, Picture-Card Station) where small groups rotate every 10 minutes hands-on',
        'Keep every tool locked in the cupboard while lecturing about them',
        'Let only the top two rankers touch the tools while 45 watch',
        'Cancel all activities permanently due to scarce kits',
      ],
      exp: 'Rotating small-group stations ensure every pupil touches scarce equipment actively without chaos or elitism.',
    },
    mr: {
      q: 'वर्गात केवळ एक भिंग, एक होकायंत्र व एक तराजू असे मर्यादित साहित्य असताना ४५ मुलांसाठी प्रात्यक्षिक तास कसा राबवावा?',
      opts: [
        'भिंग कोपरा, होकायंत्र कोपरा, वजन कोपरा व चित्रकार्ड कोपरा अशी "फिरती अध्ययन केंद्रे" (Learning Stations) करून गटांना दर १० मिनिटांनी सर्व साधने स्वतः हाताळायला देणे',
        'साधने कपाटात कुलूपबंद ठेवून फक्त भाषण देणे',
        'फक्त पहिल्या दोन मुलांनाच साधने वापरायला देणे',
        'सर्व उपक्रम कायमचे बंद करणे',
      ],
      exp: 'फिरत्या अध्ययन केंद्रांमुळे मर्यादित साधनांतही प्रत्येक विद्यार्थ्यास प्रत्यक्ष कृतीची समान संधी मिळते.',
    },
    hi: {
      q: 'सीमित उपकरणों (केवल एक आवर्धक लेंस, एक दिक्सूचक, एक तराजू) के साथ ४५ बच्चों की कक्षा में शिक्षक व्यावहारिक गतिविधि कैसे आयोजित करे?',
      opts: [
        'अधिगम केंद्र (Learning Stations — लेंस कोना, दिशा कोना, तौल कोना, चित्र कार्ड कोना) बनाकर छोटे समूहों को बारी-बारी से प्रत्यक्ष अनुभव देना',
        'उपकरण अलमारी में बंद रखकर व्याख्यान देना',
        'केवल दो अव्वल छात्रों को छूने देना',
        'गतिविधि रद्द कर देना',
      ],
      exp: 'रोटेटिंग लर्निंग स्टेशन्स कम संसाधनां में भी प्रत्येक विद्यार्थी की सक्रिय सहभागिता सुनिश्चित करते हैं।',
    },
  },
  {
    topic: 'Reflective Teacher Practice & Diary Keeping',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'After completing an EVS unit on "Shelter", why does a dedicated teacher note in a reflective journal: "Girls spoke actively during courtyard interviews, whereas map legend symbols confused 8 learners—use larger colour blocks tomorrow"?',
      opts: [
        'Systematic self-reflection helps the teacher evaluate what worked, uncover hidden barriers, and refine future instructional design',
        'To impress inspectors with neat cursive fonts only',
        'To blame students permanently for confusion',
        'Because diaries replace student portfolios',
      ],
      exp: 'Reflective practitioners iteratively improve pedagogy based on genuine classroom evidence.',
    },
    mr: {
      q: '"निवारा" पाठानंतर शिक्षिका आपल्या दैनंदिनीत नोंद करतात: "मुलाखत गटात मुलींचा सहभाग उत्तम होता, पण नकाशा चिन्हे ८ मुलांना गोंधळात टाकतात—उद्या मोठी रंगीत चिन्हे वापरू." या चिंतनात्मक नोंदीचा फायदा काय?',
      opts: [
        'स्वतःच्या अध्यापनाचे चिकित्सक परीक्षण करून पुढच्या तासाची रणनीती अधिक परिणामकारकपणे सुधारता येते',
        'फक्त तपासणी अधिकाऱ्यांना सुंदर हस्ताक्षर दाखवण्यासाठी',
        'विद्यार्थ्यांवर दोष ढकलण्यासाठी',
        'विद्यार्थ्यांच्या संचयिकेची जागा घेण्यासाठी',
      ],
      exp: 'शिक्षकाची चिंतनशील नोंद अध्यापनातील त्रुटी शोधून सतत व्यावसायिक सुधारणा घडवते.',
    },
    hi: {
      q: '"आवास" पाठ के बाद शिक्षिका अपनी डायरी में लिखती हैं: "साक्षात्कार में छात्राएँ सक्रिय रहीं, पर मानचित्र संकेतों ने ८ बच्चों को भ्रमित किया—कल बड़े रंगीन प्रतीक प्रयोग करेंगे।" इसका मुख्य लाभ क्या है?',
      opts: [
        'नियमित आत्म-चिंतन शिक्षक को शिक्षण की प्रभावशीलता परखने और अगले दिन की रणनीति सुधारने में मदद करता है',
        'केवल निरीक्षक को सुंदर लिखावट दिखाने को',
        'छात्रों को दोष देने को',
        'छात्र पोर्टफोलियो हटाने को',
      ],
      exp: 'चिंतनशील शिक्षण (Reflective Practice) कक्षा के वास्तविक प्रमाणों के आधार पर निरंतर सुधार सुनिश्चित करता है।',
    },
  },
  {
    topic: 'Toy-Based & Game Pedagogy Under NEP 2020',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Aligning with NEP 2020’s Toy-Based Pedagogy, how can traditional indigenous toys (like clay spinning tops, paper pinwheels, bamboo whistles, or Snakes-and-Ladders) enrich primary EVS?',
      opts: [
        'Learners playfully explore real physics & ecology concepts (wind spin, balance, moisture, conservation games) using culturally familiar joyful tools',
        'Distract classes purely so no curriculum gets covered',
        'Mandate battery-operated imported video consoles',
        'Treat play strictly as an activity forbidden inside school hours',
      ],
      exp: 'Indigenous toys embody everyday mechanics, local artisan heritage, and stress-free joyful experiential learning.',
    },
    mr: {
      q: 'NEP 2020 च्या "खेळण्यांवर आधारित शिक्षणशास्त्रानुसार" (Toy-Based Pedagogy) मातीचा भोवरा, कागदी फिरकी, बांबूची शिट्टी किंवा सापशिडी यांचा EVS मध्ये कसा उपयोग होतो?',
      opts: [
        'परिचित पारंपरिक खेळण्यांतून वारा, संतुलन, ध्वनी, जलसंवर्धन यांसारख्या संकल्पना मुले आनंददायी खेळाद्वारे सहज अनुभवतात',
        'अभ्यासक्रम टाळून वेळ घालवण्यासाठी',
        'महागड्या परदेशी व्हिडिओ गेम्सची सक्ती करण्यासाठी',
        'शाळेत खेळ पूर्णतः बंद करण्यासाठी',
      ],
      exp: 'स्वदेशी खेळणी स्थानिक कारागिरीशी जोडलेली असून खेळता-खेळता वैज्ञानिक व पर्यावरणीय संकल्पना स्पष्ट करतात.',
    },
    hi: {
      q: 'NEP 2020 के "खिलौना-आधारित शिक्षणशास्त्र" (Toy-Based Pedagogy) के अनुसार मिट्टी का लट्टू, कागज की फिरकी या बाँस की सीटी EVS में कैसे सहायक हैं?',
      opts: [
        'बच्चे परिचित स्वदेशी खिलौनों से खेल-खेल में हवा, संतुलन, ध्वनि और संरक्षण जैसी वैज्ञानिक अवधारणाएँ आनंदपूर्वक सीखते हैं',
        'पाठ्यक्रम टालने के लिए',
        'महँगे विदेशी वीडियो गेम लाने हेतु',
        'विद्यालय में खेल बंद करने हेतु',
      ],
      exp: 'पारंपरिक खिलौने स्थानीय शिल्प से जोड़ते हुए आनंददायी और अनुभवात्मक विज्ञान-पर्यावरण अधिगम को बढ़ावा देते हैं।',
    },
  },
  {
    topic: 'Avoiding Fear-Mongering in Disaster & Weather Lessons',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'When teaching "Floods, Earthquakes, and Climate Change" to 8–10 year olds, what emotional balance must an EVS teacher maintain?',
      opts: [
        'Pair honest age-appropriate facts with empowering practical action (Drop-Cover-Hold drills, emergency kits, planting trees) rather than terrifying apocalyptic hopelessness',
        'Show graphic horror disasters to scare children into obedience',
        'Claim earthquakes and floods never occur in India',
        'Tell Class 4 pupils adults are helpless so nothing matters',
      ],
      exp: 'Empowering agency and practical preparedness build resilience without inducing eco-anxiety or trauma.',
    },
    mr: {
      q: '८–१० वयोगटातील मुलांना "पूर, भूकंप आणि हवामान बदल" शिकवताना शिक्षकाने कोणता भावनिक समतोल राखावा?',
      opts: [
        'वयानुसार योग्य सत्य माहितीसोबतच बचावाचे प्रत्यक्ष सराव (भूकंप सुरक्षा, प्रथमोपचार पेटी, वृक्षारोपण) शिकवून भीतीऐवजी कृतिशील आत्मविश्वास निर्माण करणे',
        'भीतीदायक व हिंसक चित्रफिती दाखवून दहशत निर्माण करणे',
        'भारतात कधीच पूर वा भूकंप येत नाहीत असे सांगणे',
        'मानव पूर्णपणे असहाय आहे असे निराशावादी बोलणे',
      ],
      exp: 'आपत्ती व्यवस्थापनात व पर्यावरणीय प्रश्नांत भीतीपेक्षा व्यावहारिक दक्षता आणि सकारात्मक कृतीचे बळ देणे आवश्यक असते.',
    },
    hi: {
      q: '८–१० वर्ष के बच्चों को "बाढ़, भूकंप और जलवायु परिवर्तन" पढ़ाते समय शिक्षक को कैसा भावनात्मक संतुलन रखना चाहिए?',
      opts: [
        'आयु-उपयुक्त तथ्यों के साथ व्यावहारिक बचाव व सकारात्मक कदम (भूकंप ड्रिल, आपदा किट, पौधरोपण) सिखाकर भय के बजाय आत्मविश्वास व सजगता बढ़ाना',
        'भयावह दृश्य दिखाकर बच्चों को डराना',
        'भारत में आपदाएँ न आने की बात कहना',
        'पूर्ण निराशा फैलाना',
      ],
      exp: 'पर्यावरणीय व आपदा शिक्षा का लक्ष्य बच्चों को भयभीत करना नहीं, बल्कि व्यावहारिक तैयारी और समाधान-उन्मुख क्षमता देना है।',
    },
  },
  {
    topic: 'Active Inclusion of Quiet Pupils in Field & Class Work',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'During noisy whole-class EVS discussions, the same five vocal pupils dominate while shy learners never raise hands. Which strategy ensures equitable voice?',
      opts: [
        'Use Think-Pair-Share (30s silent think → whisper-share with one partner → share paired idea) or rotating small-group roles (recorder, illustrator, reporter)',
        'Force quiet children to stand on desks until they shout',
        'Only call on the fastest three speakers daily',
        'Excuse shy pupils from learning completely',
      ],
      exp: 'Low-risk Think-Pair-Share and clear small-group roles empower hesitant voices comfortably.',
    },
    mr: {
      q: 'वर्गातील मोठ्या चर्चेत नेहमीच तीच ५ बोलकी मुले उत्तरे देतात आणि लाजाळू मुले गप्प राहतात. सर्वांचा समान सहभाग मिळवण्यासाठी कोणती पद्धत सर्वोत्तम ठरेल?',
      opts: [
        '"विचार करा–जोडीने बोला–सामायिक करा" (Think-Pair-Share) पद्धत तसेच गटात लेखनिक, चित्रकार, निवेदक अशा बदलत्या भूमिका देणे',
        'शांत मुलांना बाकावर उभे करून ओरडायला लावणे',
        'दररोज फक्त जलद बोलणाऱ्या तिघांनाच संधी देणे',
        'लाजाळू मुलांना उपक्रमातून वगळणे',
      ],
      exp: 'जोडीने विचारांची देवाणघेवाण केल्याने सुरक्षित वाटून लाजाळू मुलेही आत्मविश्वासाने सहभागी होतात.',
    },
    hi: {
      q: 'पूरी कक्षा की चर्चा में सदैव वही पाँच मुखर बच्चे बोलते हैं और संकोची बच्चे चुप रहते हैं। सभी की समान भागीदारी हेतु सर्वोत्तम रणनीति क्या है?',
      opts: [
        '"सोचो–जोड़ी बनाओ–साझा करो" (Think-Pair-Share) तथा छोटे समूहों में बारी-बारी से लेखक, चित्रकार, वक्ता की भूमिकाएँ देना',
        'चुप बच्चों को खड़ा कर डाँटना',
        'केवल तेज बोलने वालों से ही पूछना',
        'संकोची बच्चों को छोड़ देना',
      ],
      exp: 'Think-Pair-Share सुरक्षित माहौल देता है जिससे संकोची बच्चे भी पहले साथी के साथ और फिर आत्मविश्वास से कक्षा में बोलते हैं।',
    },
  },
];
