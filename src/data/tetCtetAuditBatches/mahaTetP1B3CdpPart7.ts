import { CuratedTrilingualMcq } from './types';

// Batch 3 CDP Part 7 (32 original trilingual items; Learning Theories, Ecological Systems, Intelligence & Assessment)
export const MAHA_TET_P1_B3_CDP_PART7: CuratedTrilingualMcq[] = [
  {
    topic: 'Bronfenbrenner – Exosystem',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'When a factory suddenly changes a parent’s shift timings, leaving their Class 4 child stressed at bedtime even though the child never visits the factory, which Bronfenbrenner ecological layer is operating?',
      opts: [
        'Exosystem — indirect external setting affecting the child via family',
        'Microsystem — direct face-to-face classroom peer bond',
        'Chronosystem — century-scale cultural evolution only',
        'Genetic reflex system unrelated to environment',
      ],
      exp: 'The Exosystem encompasses linkages between settings where the child does not actively participate (e.g., parent’s workplace) yet feels indirect ripple effects.',
    },
    mr: {
      q: 'पालकांच्या कारखान्यातील कामाच्या वेळा अचानक बदलल्यामुळे इ. ४ थीतील मुलाचा झोपेचा नित्यक्रम विस्कळीत होतो, जरी मूल कधीही कारखान्यात गेले नसले तरी; ब्रॉन्फेनब्रेनरच्या कोणत्या पर्यावरणीय स्तराचा हा प्रभाव आहे?',
      opts: [
        'बाह्य प्रणाली (Exosystem) — मुलाचा थेट सहभाग नसलेला पण कुटुंबाद्वारे परिणाम करणारा परिसर',
        'सूक्ष्म प्रणाली — थेट वर्गमित्रांचा सहवास',
        'काल प्रणाली — केवळ शतकातील ऐतिहासिक बदल',
        'वातावरणाशी संबंध नसलेली आनुवंशिक प्रतिक्रिया',
      ],
      exp: 'जेथे मूल प्रत्यक्ष सहभागी नसते (उदा. पालकांचे कार्यस्थळ) पण त्याचा अप्रत्यक्ष परिणाम मुलाच्या जीवनावर होतो, ती बाह्य प्रणाली (Exosystem) होय.',
    },
    hi: {
      q: 'माता-पिता के कारखाने की शिफ्ट अचानक बदलने से कक्षा 4 के बच्चे की नींद प्रभावित होती है, भले ही बच्चा कारखाने न जाता हो; ब्रॉन्फेनब्रेनर की यह कौन-सी पारिस्थितिक परत है?',
      opts: [
        'बाह्यमंडल (Exosystem) — अप्रत्यक्ष बाहरी परिवेश जो परिवार के माध्यम से बच्चे को प्रभावित करे',
        'सूक्ष्ममंडल — कक्षा में प्रत्यक्ष सहपाठी संवाद',
        'कालमंडल — केवल सदी-स्तरीय सांस्कृतिक परिवर्तन',
        'वातावरण से असंबंधित आनुवंशिक प्रतिवर्त',
      ],
      exp: 'बाह्यमंडल (Exosystem) में ऐसे बाहरी स्थान शामिल हैं जहाँ बच्चा स्वयं नहीं जाता, पर परिवार पर पड़े असर से वह प्रभावित होता है।',
    },
  },
  {
    topic: 'Ausubel – Advance Organizer',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Before starting a dense chapter on Maharashtra’s Sahyadri rivers, a teacher shares a crisp 4-box comparison map linking "Rain -> Highland Ridge -> East vs West Flow -> Crops." David Ausubel calls this bridging tool:',
      opts: [
        'An Advance Organizer anchoring new facts to existing cognitive structure',
        'Punitive rote drill before instruction',
        'Unstructured pure discovery without cues',
        'Post-exam summative grading rubric',
      ],
      exp: 'Ausubel’s Advance Organizers give learners an inclusive conceptual scaffold prior to detailed content so meaningful subsumption occurs.',
    },
    mr: {
      q: 'सह्याद्रीच्या नद्यांचा धडा सुरू करण्यापूर्वी शिक्षक "पाऊस -> डोंगररांग -> पूर्व व पश्चिम प्रवाह -> पिके" असा संक्षिप्त तुलनात्मक नकाशा देतात; डेव्हिड ऑसुबेल या साधनाला काय म्हणतात?',
      opts: [
        'पूर्व-संघटक (Advance Organizer) — नवीन माहिती पूर्वज्ञानाशी जोडणारा सेतू',
        'शिक्षणापूर्वीचा यांत्रिक दंडात्मक सराव',
        'कोणत्याही संकेताविना अनिर्बंध शोध',
        'परीक्षेनंतरची अंतिम श्रेणी तपासणी',
      ],
      exp: 'ऑसुबेलचा पूर्व-संघटक (Advance Organizer) सविस्तर पाठापूर्वी विद्यार्थ्यांच्या विद्यमान संज्ञानात्मक संरचनेला व्यापक चौकट पुरवतो.',
    },
    hi: {
      q: 'सह्याद्रि नदियों का अध्याय शुरू करने से पहले शिक्षक "वर्षा -> पर्वत श्रेणी -> पूर्व बनाम पश्चिम प्रवाह -> फसलें" का संक्षिप्त तुलनात्मक चार्ट दिखाते हैं; डेविड ऑसुबेल इसे क्या कहते हैं?',
      opts: [
        'अग्रिम संगठक (Advance Organizer) — नए ज्ञान को पूर्व संज्ञानात्मक ढाँचे से जोड़ने वाला सेतु',
        'शिक्षण से पूर्व यांत्रिक दंडात्मक रटंत',
        'बिना किसी संकेत के अनियंत्रित खोज',
        'परीक्षा के बाद की योगात्मक अंकन तालिका',
      ],
      exp: 'ऑसुबेल का अग्रिम संगठक (Advance Organizer) विस्तृत पाठ से पहले छात्रों को एक व्यापक वैचारिक ढाँचा प्रदान करता है।',
    },
  },
  {
    topic: 'Tolman – Latent Learning & Cognitive Map',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 3 pupil walks calmly along the school campus garden for weeks without any reward, yet when asked during an emergency drill to locate the rear gate, leads everyone straight there. Edward Tolman explains this via:',
      opts: [
        'Latent Learning stored internally as a Cognitive Map until needed',
        'Strict trial-and-error conditioned only by candy rewards',
        'Spontaneous motor reflex with zero mental representation',
        'Classical Pavlovian salivation conditioning',
      ],
      exp: 'Tolman demonstrated that organisms acquire spatial Cognitive Maps through unreinforced exploration (Latent Learning), revealing mastery once motivated.',
    },
    mr: {
      q: 'इ. ३ रीतील विद्यार्थी कोणत्याही बक्षिसाशिवाय अनेक आठवडे शाळेच्या बागेतून सहज फिरतो, पण आपत्कालीन सरावावेळी मागच्या दरवाजाचा मार्ग अचूक दाखवतो; एडवर्ड टॉलमन याचे स्पष्टीकरण कशाने देतो?',
      opts: [
        'अप्रकट अध्ययन (Latent Learning) जे गरज पडेपर्यंत संज्ञानात्मक नकाशाच्या (Cognitive Map) रूपात साठवले जाते',
        'केवळ खाऊच्या बक्षिसामुळे झालेले प्रयत्न-प्रमाद अध्ययन',
        'मानसिक प्रतिमेविना अचानक झालेली स्नायू प्रतिक्रिया',
        'पॅव्हलॉव्हचे अभिजात अभिसंधान',
      ],
      exp: 'कोणत्याही तात्काळ प्रबलनाशिवाय निरीक्षणातून तयार होणारा संज्ञानात्मक नकाशा (Cognitive Map) आणि गरजेवेळी दिसणारे ज्ञान म्हणजे अप्रकट अध्ययन होय.',
    },
    hi: {
      q: 'कक्षा 3 का छात्र बिना किसी पुरस्कार के सप्ताहों तक स्कूल बगीचे में टहलता है, पर आपात अभ्यास में पिछले गेट का सही रास्ता तुरंत दिखा देता है; एडवर्ड टॉलमैन इसे किससे समझाते हैं?',
      opts: [
        'अव्यक्त अधिगम (Latent Learning) जो आवश्यकता पड़ने तक संज्ञानात्मक मानचित्र के रूप में संचित रहता है',
        'केवल टॉफी पुरस्कार से प्रेरित प्रयत्न-भूल अनुबंधन',
        'बिना मानसिक चित्र के आकस्मिक पेशीय प्रतिवर्त',
        'पावलॉव का शास्त्रीय अनुबंधन',
      ],
      exp: 'टॉलमैन के अनुसार बिना तात्कालिक पुरस्कार के भी मस्तिष्क में संज्ञानात्मक मानचित्र (Cognitive Map) बनता है, जो आवश्यकता होने पर प्रकट होता है।',
    },
  },
  {
    topic: 'Köhler – Insight Learning',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'After staring quietly at two short bamboo sticks and an out-of-reach science chart, a Class 5 pupil suddenly brightens ("Aha!"), joins the sticks, and hooks the chart down smoothly. Gestalt psychology identifies this as:',
      opts: [
        'Insight Learning arising from sudden perceptual restructuring of the whole problem',
        'Blind random repetition over hundreds of failures',
        'Passive copying from the blackboard without thinking',
        'External fear-based avoidance conditioning',
      ],
      exp: 'Wolfgang Köhler’s experiments showed Insight ("Aha!") occurs when a learner perceives new functional relationships among elements simultaneously.',
    },
    mr: {
      q: 'दोन लहान बांबूच्या काठ्या आणि उंचावरील विज्ञान तक्ता शांतपणे पाहिल्यानंतर इ. ५ वीतील मुलगा अचानक ("अरे वा!") म्हणत काठ्या जोडून तक्ता खाली आणतो; गेस्टाल्ट मानसशास्त्र याला काय म्हणते?',
      opts: [
        'मर्मदृष्टी अध्ययन (Insight Learning) — संपूर्ण परिस्थितीच्या अचानक पुनर्रचनेतून सुचलेला उपाय',
        'शेकडो अपयशांनंतरची अंध यांत्रिक पुनरावृत्ती',
        'विचार न करता फळ्यावरून केलेली निष्क्रिय नक्कल',
        'भीतीवर आधारित टाळण्याची सवय',
      ],
      exp: 'वोल्फगँग कोहलरच्या मर्मदृष्टी (Insight) सिद्धांतानुसार, समस्येतील सर्व घटकांचे एकत्रित आकलन झाल्यावर अचानक उपाय ("आहा!" अनुभव) सुचतो.',
    },
    hi: {
      q: 'दो छोटी बाँस की छड़ियों और ऊँचाई पर टँगे विज्ञान चार्ट को शांत होकर देखने के बाद कक्षा 5 का छात्र अचानक ("अरे वाह!") कहकर छड़ियाँ जोड़ता है और चार्ट उतार लेता है; गेस्टाल्ट मनोविज्ञान इसे क्या कहता है?',
      opts: [
        'अंतर्दृष्टि अधिगम (Insight Learning) — संपूर्ण स्थिति के अचानक प्रत्यक्षात्मक पुनर्गठन से उपजा समाधान',
        'सैकड़ों असफलताओं के बाद अंधी यांत्रिक पुनरावृत्ति',
        'बिना सोचे श्यामपट्ट से निष्क्रिय नकल',
        'भय-आधारित परिहार अनुबंधन',
      ],
      exp: 'वोल्फगैंग कोहलर के अनुसार, समस्या के समग्र संबंधों को एक साथ समझने पर अचानक "आहा!" अनुभूति के साथ अंतर्दृष्टि (Insight) उत्पन्न होती है।',
    },
  },
  {
    topic: 'Premack Principle – Behavioral Reinforcement',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 4 teacher notices students adore 10 minutes of clay modeling and gently states: "Once our three fraction puzzles are checked, the clay corner opens!" Which Skinnerian rule is applied here?',
      opts: [
        'Premack Principle — pairing a high-frequency preferred activity as reinforcer for a lower-frequency task',
        'Negative punishment by confiscating lunch boxes',
        'Learned helplessness via impossible assignments',
        'Sensory extinction through complete silence',
      ],
      exp: 'David Premack showed that a high-probability behavior (clay play) reliably reinforces completion of a lower-probability academic behavior.',
    },
    mr: {
      q: 'मुलांना मातीकाम (Clay modeling) खूप आवडते हे ओळखून शिक्षक म्हणतात: "आपली तीन अपूर्णांकांची कोडी तपासून झाल्यावर लगेच मातीकामाचा कोपरा सुरू होईल!" येथे कोणते तत्त्व वापरले आहे?',
      opts: [
        'प्रीमॅक तत्त्व (Premack Principle) — आवडत्या उच्च-पसंतीच्या कृतीचा वापर कमी पसंतीच्या कामासाठी प्रबलक म्हणून करणे',
        'डबे जप्त करून केलेली नकारात्मक शिक्षा',
        'अशक्य कामांतून निर्माण केलेली हतबलता',
        'पूर्ण शांततेतून केलेले संवेदी विलोपन',
      ],
      exp: 'प्रीमॅक तत्त्वानुसार, विद्यार्थ्यांना अधिक आवडणाऱ्या कृतीची संधी नियमित अभ्यासाशी जोडल्यास कामाची प्रेरणा वाढते.',
    },
    hi: {
      q: 'कक्षा 4 के छात्रों को मिट्टी के खिलौने बनाना बेहद पसंद है, यह देखकर शिक्षक कहते हैं: "तीन भिन्न पहेलियाँ पूरी होते ही क्ले कॉर्नर खुलेगा!" यहाँ कौन-सा नियम लागू है?',
      opts: [
        'प्रीमैक सिद्धांत (Premack Principle) — अधिक पसंदीदा गतिविधि को कम पसंदीदा कार्य के पुनर्बलन रूप में उपयोग करना',
        'लंच बॉक्स जब्त कर नकारात्मक दंड देना',
        'असंभव गृहकार्य से अर्जित असहायता उत्पन्न करना',
        'पूर्ण मौन द्वारा संवेदी विलोपन',
      ],
      exp: 'प्रीमैक सिद्धांत के अनुसार, उच्च-प्राथमिकता वाली रुचिकर गतिविधि कम-रुचिकर शैक्षणिक कार्य को पूरा करने के लिए प्रभावी पुनर्बलक बनती है।',
    },
  },
  {
    topic: 'Variable Ratio Reinforcement',
    pattern: 'Conceptual',
    difficulty: 'Difficult',
    en: {
      q: 'Among B.F. Skinner’s reinforcement schedules, which pattern builds steady student reading effort that remains MOST resistant to extinction even when praise pauses for a while?',
      opts: [
        'Variable Ratio (VR) — genuine recognition after unpredictable numbers of completed efforts',
        'Fixed Interval — strictly every Friday at 4 p.m. regardless of effort',
        'Continuous 1:1 candy for every single word spoken',
        'Zero feedback ever across the whole academic year',
      ],
      exp: 'Variable Ratio reinforcement prevents predictability slumps and sustains persistent effort far longer when external praise temporarily stops.',
    },
    mr: {
      q: 'बी. एफ. स्किनरच्या प्रबलन वेळापत्रकांपैकी कोणत्या प्रकारामुळे विद्यार्थ्यांचे वाचन प्रयत्न अधिक टिकाऊ होतात आणि तात्पुरती प्रशंसा थांबली तरी विलोपन (Extinction) सहज होत नाही?',
      opts: [
        'परिवर्ती प्रमाण (Variable Ratio) — अनियमित संख्येच्या प्रयत्नांनंतर मिळणारी अनपेक्षित खरी दाद',
        'निश्चित कालावधी — प्रयत्नांकडे न पाहता दर शुक्रवारी संध्याकाळी ४ वाजता',
        'प्रत्येक उच्चारलेल्या शब्दामागे १:१ चॉकलेट',
        'संपूर्ण वर्षभर कोणताही अभिप्राय न देणे',
      ],
      exp: 'परिवर्ती प्रमाण (Variable Ratio) प्रबलनात पुढचे बक्षीस कधी मिळेल हे अनिश्चित असल्याने सातत्यपूर्ण प्रयत्न आणि विलोपन-प्रतिकार सर्वाधिक असतो.',
    },
    hi: {
      q: 'बी. एफ. स्किनर की पुनर्बलन अनुसूचियों में से कौन-सा पैटर्न छात्रों के पठन प्रयास को सबसे अधिक टिकाऊ बनाता है और प्रशंसा रुकने पर भी विलोपन (Extinction) के प्रति सर्वाधिक प्रतिरोधी रहता है?',
      opts: [
        'परिवर्ती अनुपात (Variable Ratio) — प्रयासों की अनिश्चित संख्या के बाद मिलने वाली वास्तविक सराहना',
        'निश्चित अंतराल — प्रयास देखे बिना हर शुक्रवार शाम 4 बजे',
        'बोले गए प्रत्येक शब्द पर 1:1 टॉफी',
        'पूरे वर्ष कोई प्रतिपुष्टि न देना',
      ],
      exp: 'परिवर्ती अनुपात (Variable Ratio) अनुसूची में पुनर्बलन अप्रत्याशित अंतराल के प्रयासों पर मिलता है, जिससे व्यवहार विलोपन से सर्वाधिक सुरक्षित रहता है।',
    },
  },
  {
    topic: 'Stimulus Discrimination vs Generalization',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Earlier a nervous Class 1 newcomer cried whenever ANY adult entered wearing a white apron; within two weeks, the child smiles at the school nurse in white while still fearing the clinic needle room. This shift illustrates:',
      opts: [
        'Stimulus Discrimination — distinguishing the safe cue from the threatening context',
        'Backward amnesia of language vocabulary',
        'Maturational motor ceiling in gross balance',
        'Fixed mindset toward mathematical symbols',
      ],
      exp: 'In Classical Conditioning, learning to respond specifically to one context rather than over-generalizing across similar cues is Stimulus Discrimination.',
    },
    mr: {
      q: 'सुरुवातीला पांढरा अ‍ॅप्रन घातलेल्या कोणत्याही व्यक्तीला पाहून रडणारे इ. १ लीतील मूल दोन आठवड्यांत शाळेतील परिचारिकेला पाहून हसू लागते, पण केवळ दवाखान्याच्या सुईच्या खोलीलाच घाबरते; हा बदल काय दर्शवतो?',
      opts: [
        'उद्दीपक विभेदन (Stimulus Discrimination) — सुरक्षित व धोक्याच्या संकेतातील फरक ओळखणे',
        'शब्दांचा भूतकाळातील विसर',
        'स्थूल संतुलनाची परिपक्वता मर्यादा',
        'गणितीय चिन्हांबद्दलची जड मानसिकता',
      ],
      exp: 'समान दिसणाऱ्या उद्दीपकांपैकी (पांढरा अ‍ॅप्रन) नेमक्या सुरक्षित संदर्भाचा फरक ओळखून प्रतिसाद बदलणे म्हणजे उद्दीपक विभेदन होय.',
    },
    hi: {
      q: 'शुरू में सफेद एप्रन पहने किसी भी व्यक्ति को देख रोने वाला कक्षा 1 का बच्चा दो सप्ताह में स्कूल नर्स को देखकर मुस्कुराता है, पर केवल क्लीनिक के इंजेक्शन कक्ष से डरता है; यह बदलाव क्या दर्शाता है?',
      opts: [
        'उद्दीपक विभेदन (Stimulus Discrimination) — सुरक्षित संकेत और भययुक्त संदर्भ में अंतर समझना',
        'शब्दावली की पश्चगामी स्मृति लोप',
        'स्थूल संतुलन की परिपक्वता सीमा',
        'गणितीय प्रतीकों के प्रति स्थिर मानसिकता',
      ],
      exp: 'समान दिखने वाले उद्दीपकों के बीच अंतर पहचानकर केवल विशिष्ट संदर्भ पर प्रतिक्रिया देना उद्दीपक विभेदन (Stimulus Discrimination) कहलाता है।',
    },
  },
  {
    topic: 'Thorndike – Law of Readiness',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Forcing an exhausted Class 2 child straight after a 40-minute hot-sun parade to copy 3 pages of cursive drills usually causes resentment and sloppy letters. Which Thorndike law explains why priming readiness first matters?',
      opts: [
        'Law of Readiness — learning succeeds best when neural, emotional, and physical preparedness align',
        'Law of Punishment — pain accelerates neat handwriting automatically',
        'Theory of Tabula Rasa requiring blank exhaustion',
        'Fluid mechanics of ink viscosity',
      ],
      exp: 'Thorndike’s Law of Readiness notes that compelling action when an organism is unready produces annoyance rather than satisfying learning.',
    },
    mr: {
      q: 'उन्हातील ४० मिनिटांच्या कवायतीनंतर लगेचच थकलेल्या इ. २ रीतील मुलाला ३ पाने सुलेखन करण्यास भाग पाडल्यास चिडचिड व अशुद्ध अक्षर येते; थॉर्नडाइकचा कोणता नियम आधी तयारी का महत्त्वाची हे सांगतो?',
      opts: [
        'सिद्धतेचा नियम (Law of Readiness) — शारीरिक, भावनिक व मानसिक तयारी असतानाच अध्ययन प्रभावी होते',
        'शिक्षेचा नियम — त्रास दिल्याने अक्षर आपोआप सुधारते',
        'कोऱ्या पाटीचा थकवणारा सिद्धांत',
        'शाईच्या प्रवाहीपणाचा नियम',
      ],
      exp: 'थॉर्नडाइकच्या सिद्धतेच्या नियमानुसार, विद्यार्थी शिकण्यास शारीरिक व मानसिकदृष्ट्या तयार नसेल तेव्हा सक्ती केल्यास असंतोष निर्माण होतो.',
    },
    hi: {
      q: 'धूप में 40 मिनट की परेड के तुरंत बाद थके हुए कक्षा 2 के बच्चे से 3 पृष्ठ सुलेख लिखवाने पर चिड़चिड़ापन और गंदा लेख आता है; थॉर्नडाइक का कौन-सा नियम पहले तत्परता का महत्व बताता है?',
      opts: [
        'तत्परता का नियम (Law of Readiness) — शारीरिक, मानसिक व भावनात्मक तैयारी होने पर ही सीखना सुखद व प्रभावी होता है',
        'दंड का नियम — कष्ट से हस्तलेख अपने आप सुंदर होता है',
        'कोरी स्लेट सिद्धांत जो थकान माँगता है',
        'स्याही प्रवाह का भौतिक नियम',
      ],
      exp: 'थॉर्नडाइक के तत्परता के नियम के अनुसार, जब शिक्षार्थी सीखने को तैयार न हो तब जबरदस्ती करने से खीझ उत्पन्न होती है और अधिगम घटता है।',
    },
  },
  {
    topic: 'Bandura – Self-Efficacy vs Outcome',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'A shy Class 5 pupil watches a peer of similar height and background solve a tricky tangram puzzle step by step, then whispers, "If she cracked it by trying twice, I can do this too!" Bandura names this belief:',
      opts: [
        'Vicarious boost to personal Self-Efficacy ("I can execute the required steps")',
        'External fatalistic Locus of Control',
        'Narcissistic over-estimation detached from effort',
        'Fixed trait inheritance of IQ',
      ],
      exp: 'Observing a relatable peer succeed through persistent strategy is one of Albert Bandura’s four classic sources for raising learner Self-Efficacy.',
    },
    mr: {
      q: 'इ. ५ वीतील एक लाजाळू मुलगी आपल्याच वर्गातील मैत्रिणीला अवघड टॅनग्रॅम कोडे टप्प्याटप्प्याने सोडवताना पाहते आणि म्हणते, "तिने दोन प्रयत्नांत केले, तर मीही करू शकते!" बंडुरा या विश्वासाला काय म्हणतो?',
      opts: [
        'परोक्ष अनुभवातून वाढलेली स्व-कार्यक्षमता (Self-Efficacy)',
        'बाह्य दैववादी नियंत्रण स्थान',
        'प्रयत्नांशिवाय निर्माण झालेला अहंकार',
        'बुद्ध्यांकाची स्थिर आनुवंशिकता',
      ],
      exp: 'आपल्यासारख्याच समवयस्क मित्राला प्रयत्नातून यश मिळताना पाहणे हा अल्बर्ट बंडुराच्या मते स्व-कार्यक्षमता (Self-Efficacy) वाढवणारा प्रमुख स्रोत आहे.',
    },
    hi: {
      q: 'कक्षा 5 की संकोची छात्रा अपनी जैसी ही सहपाठी को कठिन टैनग्राम पहेली चरणबद्ध हल करते देख कहती है, "यदि वह दो प्रयास में कर सकती है, तो मैं भी कर सकती हूँ!" बंडूरा इस विश्वास को क्या कहते हैं?',
      opts: [
        'अप्रत्यक्ष अनुभव से बढ़ी आत्म-प्रभावकारिता (Self-Efficacy)',
        'बाह्य भाग्यवादी नियंत्रण केंद्र',
        'प्रयास से कटा अवास्तविक अहंकार',
        'बुद्धि-लब्धि की स्थिर आनुवंशिकता',
      ],
      exp: 'अपने समान सहपाठी को प्रयास से सफल होते देखना अल्बर्ट बंडूरा के अनुसार आत्म-प्रभावकारिता (Self-Efficacy) बढ़ाने का मुख्य स्रोत है।',
    },
  },
  {
    topic: 'Seligman – Learned Helplessness',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'After receiving red-crossed zeros on four consecutive un-scaffolded tests without knowing what went wrong, a pupil drops the pencil saying, "Why bother trying? Nothing I do works." Martin Seligman identifies this trap as:',
      opts: [
        'Learned Helplessness — perceived non-contingency between personal effort and outcomes',
        'Intrinsic mastery flow',
        'Constructive cognitive disequilibrium',
        'Positive transfer of subtraction skills',
      ],
      exp: 'Learned Helplessness develops when repeated inescapable failure convinces learners their actions cannot change results; graded achievable wins reverse it.',
    },
    mr: {
      q: 'चूक नेमकी कुठे झाली हे न सांगता सलग चार कठीण चाचण्यांत शून्य गुण मिळाल्यावर एक मूल पेन्सिल खाली ठेवून म्हणते, "प्रयत्न करून तरी काय उपयोग? मला काहीच जमत नाही." सेलिगमन या अवस्थेला काय म्हणतो?',
      opts: [
        'अर्जित असहायता / हतबलता (Learned Helplessness) — प्रयत्नांचा परिणामावर परिणाम होत नसल्याची भावना',
        'आंतरिक प्रभुत्वाचा आनंदमय प्रवाह',
        'रचनात्मक संज्ञानात्मक असमतोल',
        'वजाबाकी कौशल्यांचे सकारात्मक संक्रमण',
      ],
      exp: 'योग्य मार्गदर्शनाशिवाय वारंवार येणाऱ्या अपयशामुळे "आपण काहीही केले तरी यश मिळणार नाही" अशी भावना दृढ होणे म्हणजे अर्जित हतबलता होय.',
    },
    hi: {
      q: 'बिना गलती समझाए लगातार चार कठिन परीक्षाओं में शून्य मिलने पर एक छात्र पेन्सिल रखकर कहता है, "प्रयास से क्या फायदा? मेरे बस का कुछ नहीं।" मार्टिन सेलिगमैन इस स्थिति को क्या कहते हैं?',
      opts: [
        'अर्जित असहायता (Learned Helplessness) — प्रयास और परिणाम के बीच संबंध न होने की धारणा',
        'आंतरिक निपुणता प्रवाह',
        'रचनात्मक संज्ञानात्मक असंतुलन',
        'घटाव कौशल का सकारात्मक अंतरण',
      ],
      exp: 'लगातार अनियंत्रित असफलता से जब छात्र मान ले कि प्रयास का कोई असर नहीं होता, तो इसे अर्जित असहायता (Learned Helplessness) कहते हैं।',
    },
  },
  {
    topic: 'Rotter – Internal vs External Locus of Control',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Comparing two Class 5 peers after a spelling quiz: Aarav says, "I skipped silent-letter revision, so I will practice those 10 words tonight," whereas Kabir blames "unlucky seating near the window." Aarav displays:',
      opts: [
        'An Internal Locus of Control linking outcomes to adjustable strategy and effort',
        'External fatalistic Locus of Control',
        'Auditory sensory impairment',
        'Blind conformity to peer rumors',
      ],
      exp: 'Julian Rotter’s Internal Locus of Control reflects believing one’s own controllable actions and study habits drive success and improvement.',
    },
    mr: {
      q: 'शुद्धलेखन चाचणीनंतर इ. ५ वीतील आरव म्हणतो, "मी जोडाक्षरांचा सराव कमी केला, आज रात्री ते १० शब्द लिहून काढीन," तर कबीर खिडकीजवळच्या बाकाला दोष देतो; आरव कोणता दृष्टिकोन दर्शवतो?',
      opts: [
        'आंतरिक नियंत्रण स्थान (Internal Locus of Control) — यशापयश स्वतःच्या प्रयत्नांशी जोडणे',
        'बाह्य दैववादी नियंत्रण स्थान',
        'श्रवण संवेदना दोष',
        'अफवांचे अंधानुकरण',
      ],
      exp: 'जुलियन रॉटरच्या मते, स्वतःच्या प्रयत्नांमुळे व रणनीतीमुळे परिणाम बदलू शकतात असा विश्वास म्हणजे आंतरिक नियंत्रण स्थान (Internal Locus of Control).',
    },
    hi: {
      q: 'वर्तनी जांच के बाद आरव कहता है, "मैंने संयुक्ताक्षर दोहराए नहीं, आज रात इन 10 शब्दों का अभ्यास करूँगा," जबकि कबीर खिड़की के पास की सीट को दोष देता है; आरव क्या दर्शाता है?',
      opts: [
        'आंतरिक नियंत्रण केंद्र (Internal Locus of Control) — परिणामों को अपने प्रयास व रणनीति से जोड़ना',
        'बाह्य भाग्यवादी नियंत्रण केंद्र',
        'श्रवण संवेदी दोष',
        'अफवाहों का अंधानुकरण',
      ],
      exp: 'जूलियन रॉटर के अनुसार, सफलता-सुधार को अपने नियंत्रण योग्य प्रयास व रणनीति से जोड़ना आंतरिक नियंत्रण केंद्र (Internal Locus of Control) है।',
    },
  },
  {
    topic: 'Sternberg – Triarchic Theory (Practical Intelligence)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'During a school fair, while one student computes percentages rapidly on paper (Analytical) and another invents a catchy puppet jingle (Creative), a third deftly reorganizes the crowded stall queue to double sales. Sternberg labels the third strength:',
      opts: [
        'Practical (Contextual) Intelligence — adapting, shaping, and managing everyday real-world contexts',
        'Solely rote semantic memory',
        'Unrelated motor reflex only',
        'Analytical deductive logic alone',
      ],
      exp: 'Robert Sternberg’s Triarchic Theory balances Analytical, Creative, and Practical ("street-smart / everyday problem-solving") intelligence.',
    },
    mr: {
      q: 'शाळेच्या आनंदमेळ्यात एक विद्यार्थी कागदावर टक्केवारी पटकन काढतो (विश्लेषणात्मक), दुसरा आकर्षक गीत रचतो (सर्जनशील), तर तिसरा गर्दीची रांग शिस्तबद्ध लावून विक्री दुप्पट करतो; स्टर्नबर्गच्या मते ही तिसरी क्षमता कोणती?',
      opts: [
        'व्यावहारिक बुद्धिमत्ता (Practical Intelligence) — प्रत्यक्ष परिस्थितीनुसार प्रभावी समन्वय साधण्याचे कौशल्य',
        'केवळ घोकंपट्टी स्मरणशक्ती',
        'निखळ शारीरिक प्रतिक्षिप्त क्रिया',
        'केवळ अमूर्त निगमनिक तर्क',
      ],
      exp: 'रॉबर्ट स्टर्नबर्गच्या त्रि-घटकीय (Triarchic) सिद्धांतातील व्यावहारिक बुद्धिमत्ता दैनंदिन वास्तविक समस्या कुशलतेने सोडवण्याची क्षमता दर्शवते.',
    },
    hi: {
      q: 'स्कूल मेले में एक छात्र कागज़ पर प्रतिशत तेज़ी से निकालता है (विश्लेषणात्मक), दूसरा गीत रचता है (सृजनात्मक), और तीसरा भीड़ भरी कतार सुव्यवस्थित कर बिक्री दोगुनी करता है; स्टर्नबर्ग के अनुसार तीसरी क्षमता है:',
      opts: [
        'व्यावहारिक बुद्धि (Practical Intelligence) — वास्तविक जीवन की परिस्थितियों को कुशलता से सँभालना',
        'केवल यांत्रिक शाब्दिक स्मृति',
        'केवल अनैच्छिक पेशीय प्रतिवर्त',
        'केवल अमूर्त निगमनात्मक तर्क',
      ],
      exp: 'रॉबर्ट स्टर्नबर्ग के त्रितंत्र सिद्धांत में व्यावहारिक बुद्धि वास्तविक परिवेश से अनुकूलन व दैनिक समस्या-समाधान क्षमता को दर्शाती है।',
    },
  },
  {
    topic: 'Cattell – Fluid vs Crystallized Intelligence',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which comparison accurately separates Raymond Cattell’s Fluid Intelligence (Gf) from Crystallized Intelligence (Gc)?',
      opts: [
        'Gf solves novel abstract pattern puzzles speeded by neural agility; Gc draws on accumulated vocabulary, cultural knowledge, and schooling',
        'Gf equals memorized poetry only; Gc fades completely after age 10',
        'Gf depends strictly on textbook reading; Gc never grows through life experience',
        'Both are identical measures of height and lung capacity',
      ],
      exp: 'Fluid Intelligence (Gf) drives novel reasoning independent of prior instruction, whereas Crystallized Intelligence (Gc) reflects stored skills and cultural knowledge.',
    },
    mr: {
      q: 'रेमंड कॅटेल यांच्या प्रवाही बुद्धिमत्ता (Gf) आणि स्फटिकीकृत बुद्धिमत्ता (Gc) यांतील अचूक फरक कोणता?',
      opts: [
        'Gf नवीन अमूर्त कोडी सोडवण्याच्या वेगवान तर्कक्षमतेशी संबंधित आहे, तर Gc संचित शब्दसंग्रह, ज्ञान व अनुभवांवर आधारित असते',
        'Gf म्हणजे केवळ पाठ केलेल्या कविता व Gc वयाच्या १० व्या वर्षी पूर्ण संपते',
        'Gf केवळ पाठ्यपुस्तकावर अवलंबून असते आणि Gc अनुभवाने कधीच वाढत नाही',
        'दोन्ही फक्त उंची व फुफ्फुसांची क्षमता मोजतात',
      ],
      exp: 'प्रवाही बुद्धिमत्ता (Gf) नवीन व अनोळखी समस्यांतील तर्काशी निगडित असते, तर स्फटिकीकृत बुद्धिमत्ता (Gc) शिक्षण व अनुभवातून संचित झालेल्या ज्ञानाचे प्रतीक आहे.',
    },
    hi: {
      q: 'रेमंड कैटेल की तरल बुद्धि (Gf) और ठोस/क्रिस्टलीकृत बुद्धि (Gc) के बीच सही अंतर कौन-सा है?',
      opts: [
        'Gf नवीन अमूर्त पहेलियाँ हल करने की तार्किक चपलता है; Gc संचित शब्दावली, अनुभव और स्कूली ज्ञान पर आधारित है',
        'Gf केवल रटी कविताएँ हैं; Gc 10 वर्ष की उम्र के बाद पूरी तरह समाप्त हो जाती है',
        'Gf केवल पाठ्यपुस्तक पर निर्भर है; Gc अनुभव से कभी नहीं बढ़ती',
        'दोनों केवल कद और फेफड़ों की क्षमता मापती हैं',
      ],
      exp: 'तरल बुद्धि (Gf) नए व अपरिचित पैटर्न समझने की क्षमता है, जबकि क्रिस्टलीकृत बुद्धि (Gc) शिक्षा व अनुभव से संचित ज्ञान को दर्शाती है।',
    },
  },
  {
    topic: 'Vygotsky – Private Speech in Young Learners',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'While assembling a 12-piece map of Maharashtra alone at her desk, 6-year-old Sara whispers aloud: "Now find the coastline... blue goes left, Konkan stays vertical." According to Lev Vygotsky, this talk is:',
      opts: [
        'Adaptive Private Speech used for self-regulation before transitioning into silent Inner Speech',
        'Egocentric distraction that teachers must forbid completely',
        'Signs of severe phonological disorder',
        'Passive echolalia with no cognitive goal',
      ],
      exp: 'Unlike Piaget’s view of egocentric speech, Vygotsky showed children talk aloud to guide attention, plan steps, and self-regulate during challenges.',
    },
    mr: {
      q: 'बाकावर एकटी बसून महाराष्ट्राच्या नकाशाचे १२ तुकडे जोडताना ६ वर्षांची सारा स्वतःशीच हळू बोलत आहे: "आता समुद्रकिनारा शोधू... निळा रंग डावीकडे, कोकण उभे..." वायगोट्स्कीच्या मते हे बोलणे काय आहे?',
      opts: [
        'स्व-नियमनासाठी वापरलेले उपयुक्त खासगी संभाषण (Private Speech), जे पुढे शांत अंतर्गत वाणीत रूपांतरित होते',
        'अहंकेंद्री व्यत्यय जो शिक्षकांनी पूर्णपणे बंद केला पाहिजे',
        'गंभीर वाचादोषाचे लक्षण',
        'कोणत्याही विचारशक्तीशिवाय केलेली यांत्रिक बडबड',
      ],
      exp: 'वायगोट्स्कीच्या मते, मुले कठीण काम करताना स्वतःला दिशा देण्यासाठी व लक्ष केंद्रित ठेवण्यासाठी मोठ्याने किंवा कुजबुजत "खासगी संभाषण" (Private Speech) करतात.',
    },
    hi: {
      q: 'डेस्क पर अकेले महाराष्ट्र मानचित्र के 12 टुकड़े जोड़ते हुए 6 वर्षीया सारा स्वयं से बुदबुदाती है: "अब समुद्रतट ढूँढें... नीला बाईं ओर, कोंकण सीधा..." वाइगोत्स्की के अनुसार यह बातचीत है:',
      opts: [
        'आत्म-नियमन के लिए उपयोगी निजी वाक् (Private Speech) जो आगे चलकर मौन आंतरिक वाक् में बदलता है',
        'अहंकेंद्रित विघ्न जिसे शिक्षक को पूरी तरह रोकना चाहिए',
        'गंभीर वाक् विकार का लक्षण',
        'बिना किसी संज्ञानात्मक उद्देश्य की नकल',
      ],
      exp: 'वाइगोत्स्की के अनुसार, बच्चे चुनौतीपूर्ण कार्यों में स्वयं का मार्गदर्शन व नियमन करने के लिए निजी वाक् (Private Speech) का सहारा लेते हैं।',
    },
  },
  {
    topic: 'Piaget – Class Inclusion Task',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Show a 5-year-old 7 wooden beads—5 painted red and 2 painted yellow—and ask: "Are there more red beads or more wooden beads?" Answering "More red beads!" reveals difficulty with Piaget’s concrete logical operation of:',
      opts: [
        'Class Inclusion — grasping that a subclass fits wholly inside a broader superordinate class simultaneously',
        'Object permanence across a visual curtain',
        'Babbling phoneme imitation',
        'Gross-motor hopping balance',
      ],
      exp: 'Preoperational thinkers struggle to mentally compare part (red) against whole (wooden) at the same time; Concrete Operational children master Class Inclusion.',
    },
    mr: {
      q: '५ वर्षांच्या मुलाला ७ लाकडी मणी (५ लाल व २ पिवळे) दाखवून विचारले: "लाल मणी जास्त की लाकडी मणी जास्त?" मुलाने "लाल मणी जास्त!" असे उत्तर दिल्यास पियाजेच्या कोणत्या संबोधात अडचण दिसते?',
      opts: [
        'वर्ग समावेशकता (Class Inclusion) — उपवर्ग हा मोठ्या मुख्य वर्गाचाच भाग असल्याचे एकाच वेळी आकलन न होणे',
        'पडद्याआडच्या वस्तूचे वस्तुसातत्य',
        'बोबड्या उच्चारांचे अनुकरण',
        'एका पायावर उड्या मारण्याचे संतुलन',
      ],
      exp: 'पूर्व-क्रियात्मक अवस्थेतील मुले भाग (लाल मणी) व पूर्ण (सर्व लाकडी मणी) यांची एकाच वेळी तुलना करू शकत नाहीत; ही संकल्पना वर्ग समावेशकता (Class Inclusion) होय.',
    },
    hi: {
      q: '5 वर्षीय बच्चे को 7 लकड़ी के मोती (5 लाल, 2 पीले) दिखाकर पूछें: "लाल मोती अधिक हैं या लकड़ी के मोती?" उसका उत्तर "लाल मोती अधिक!" पियाजे की किस तार्किक संक्रिया की कमी दिखाता है?',
      opts: [
        'वर्ग समावेशन (Class Inclusion) — यह समझ न पाना कि उपवर्ग एक ही समय बड़े मुख्य वर्ग का हिस्सा है',
        'पर्दे के पीछे वस्तु स्थायित्व',
        'बबलाने की ध्वनि नकल',
        'एक पैर पर कूदने का संतुलन',
      ],
      exp: 'पूर्व-संक्रियात्मक अवस्था में बच्चा एक साथ भाग (लाल) और पूर्ण (लकड़ी के मोती) की तुलना नहीं कर पाता; इसे वर्ग समावेशन (Class Inclusion) कहते हैं।',
    },
  },
  {
    topic: 'Piaget – Seriation & Transitive Inference',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Asking Class 3 students to line up 8 sugarcane stalks strictly from shortest to tallest (and deduce that if Stalk A > Stalk B and B > C, then A > C without holding A beside C) assesses:',
      opts: [
        'Seriation and Transitivity emerging in Concrete Operational thought',
        'Preoperational animistic fantasy',
        'Sensorimotor circular palmar grasp',
        'Post-conventional ethical reasoning',
      ],
      exp: 'Ordering items along a quantitative dimension (Seriation) and inferring indirect rank order (Transitivity) are hallmarks of ages 7–11.',
    },
    mr: {
      q: 'इ. ३ रीतील विद्यार्थ्यांना उसाचे ८ तुकडे लहानापासून मोठ्यापर्यंत क्रमाने लावण्यास सांगणे (आणि "अ > ब" व "ब > क" तर थेट मोजणीविना "अ > क" ओळखणे) पियाजेच्या कोणत्या क्षमता तपासते?',
      opts: [
        'क्रमबद्धता (Seriation) व संक्रामकता (Transitivity) — मूर्त क्रियात्मक विचारक्षमता',
        'पूर्व-क्रियात्मक सजीव आरोपण',
        'संवेदी-कारक मूठ पकड प्रतिक्षेप',
        'नैतिक उत्तर-पारंपरिक तत्त्वज्ञान',
      ],
      exp: 'आकारमानानुसार क्रमाने मांडणे (क्रमबद्धता) आणि अप्रत्यक्ष तुलना ओळखणे (संक्रामकता) या ७ ते ११ वयोगटातील मूर्त क्रियात्मक क्षमता आहेत.',
    },
    hi: {
      q: 'कक्षा 3 के छात्रों से गन्ने के 8 टुकड़े छोटे से बड़े क्रम में लगाने को कहना (और बिना मापे यह निष्कर्ष निकालना कि यदि A > B और B > C तो A > C) किस क्षमता का आकलन है?',
      opts: [
        'क्रमबद्धता (Seriation) और संक्रामकता (Transitivity) — मूर्त संक्रियात्मक चिंतन',
        'पूर्व-संक्रियात्मक जीववाद कल्पना',
        'संवेदी-पेशीय मुट्ठी पकड़ प्रतिवर्त',
        'उत्तर-पारंपरिक नैतिक दर्शन',
      ],
      exp: 'मात्रात्मक क्रम में सजाना (क्रमबद्धता) और अप्रत्यक्ष क्रम-संबंध समझना (संक्रामकता) मूर्त संक्रियात्मक अवस्था (7–11 वर्ष) के प्रमुख गुण हैं।',
    },
  },
  {
    topic: 'Chomsky – Language Acquisition Device (LAD)',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'When 3-year-olds spontaneously say "I goed to shop" or Marathi toddlers say "मी गेलो होतो" applying regular rules to irregular verbs they never heard adults utter, Noam Chomsky cites this as evidence of:',
      opts: [
        'An innate Language Acquisition Device (LAD) extracting grammatical rules naturally',
        'Strict adult correction of every sentence before age two',
        'Pure mechanical parrot mimicry',
        'Defective hearing threshold',
      ],
      exp: 'Overregularization errors ("goed", "foots") prove children actively deduce underlying syntax via an innate linguistic readiness rather than mere imitation.',
    },
    mr: {
      q: 'लहान मुले मोठ्यांकडून न ऐकलेले नियम लावून उत्स्फूर्तपणे "मी खाल्लास" किंवा इंग्रजीत "I goed" असे अति-नियमित (Overregularized) प्रयोग करतात; नोआम चॉम्स्कीच्या मते हा कशाचा पुरावा आहे?',
      opts: [
        'व्याकरणाचे नियम नैसर्गिकरीत्या आत्मसात करणाऱ्या जन्मजात भाषा संपादन यंत्रणेचा (LAD)',
        'वयाच्या दुसऱ्या वर्षाआधी मोठ्यांनी केलेल्या कडक शिक्षेचा',
        'केवळ पोपटपंची नकलेचा',
        'श्रवणशक्तीतील त्रुटीचा',
      ],
      exp: 'मुले केवळ ऐकलेल्या शब्दांची नक्कल न करता मेंदूतील भाषा संपादन यंत्रणेद्वारे (LAD) व्याकरणाचे नियम स्वतः बांधतात, हे अशा प्रयोगांतून सिद्ध होते.',
    },
    hi: {
      q: 'जब 3 वर्षीय बच्चे वयस्कों से सुने बिना स्वयं नियम लगाकर "I goed" या हिंदी में अनियमित क्रियाओं का नियमित प्रयोग करने लगते हैं, तो नोआम चॉम्स्की इसे किसका प्रमाण मानते हैं?',
      opts: [
        'जन्मजात भाषा अर्जन तंत्र (LAD) जो स्वाभाविक रूप से व्याकरण नियम गढ़ता है',
        'दो वर्ष की उम्र से पहले वयस्कों के कठोर सुधार का',
        'शुद्ध यांत्रिक तोता-नकल का',
        'श्रवण क्षमता की कमी का',
      ],
      exp: 'अति-नियमीकरण (Overregularization) त्रुटियाँ दिखाती हैं कि बच्चे केवल रटते नहीं, बल्कि जन्मजात भाषा अर्जन तंत्र (LAD) से नियम बनाते हैं।',
    },
  },
  {
    topic: 'Baumrind – Authoritative Parenting / Teaching',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Across Diana Baumrind’s styles, which adult approach combines HIGH warmth and affectionate listening with CLEAR, reasoned, age-appropriate boundaries—consistently linked to confident, self-disciplined children?',
      opts: [
        'Authoritative — warm responsiveness paired with democratic, explained expectations',
        'Authoritarian — rigid obedience ("Because I said so") with low warmth',
        'Permissive-Indulgent — high warmth but practically zero consistent limits',
        'Uninvolved / Neglectful — low warmth and low structure',
      ],
      exp: 'Authoritative adults validate feelings while explaining logical rules, fostering internal responsibility and high socio-emotional resilience.',
    },
    mr: {
      q: 'डायना बाउम्रिंडच्या मते, उच्च स्नेहपूर्ण जिव्हाळा व ऐकून घेण्याची वृत्ती आणि त्याच वेळी स्पष्ट, तर्कसंगत नियम यांचा संगम असलेली कोणती पद्धत आत्मविश्वासी व स्व-शिस्तप्रिय मुले घडवते?',
      opts: [
        'लोकशाही / अधिकारपूर्ण (Authoritative) — प्रेमळ प्रतिसाद व कारणमीमांसेसह स्पष्ट अपेक्षा',
        'हुकूमशाही (Authoritarian) — कमी जिव्हाळा व "मी सांगितले म्हणून ऐका" कठोरता',
        'अति-सूट देणारी (Permissive) — प्रचंड लाड पण जवळपास शून्य मर्यादा',
        'उदासीन / दुर्लक्ष करणारी — कमी जिव्हाळा व शून्य मार्गदर्शन',
      ],
      exp: 'अधिकारपूर्ण / लोकशाही (Authoritative) शैलीत आत्मीयता व तार्किक शिस्त यांचा समतोल असल्याने मुलांत स्व-नियमन व आत्मविश्वास वाढतो.',
    },
    hi: {
      q: 'डायना बॉमरिंड की शैलियों में कौन-सा दृष्टिकोण उच्च स्नेह व संवेदनशील श्रवण के साथ स्पष्ट, तर्कसंगत सीमाओं को जोड़ता है—जो आत्मविश्वासी व स्व-अनुशासित बच्चे तैयार करता है?',
      opts: [
        'अधिकारपूर्ण / लोकतांत्रिक (Authoritative) — स्नेहशील संवाद के साथ तार्किक अपेक्षाएँ',
        'सत्तावादी (Authoritarian) — कम स्नेह और कठोर अंधाधुंध आज्ञापालन',
        'अति-अनुमतिशील (Permissive) — अत्यधिक लाड़ पर लगभग शून्य नियम',
        'असंलग्न / उपेक्षापूर्ण — कम स्नेह और शून्य ढाँचा',
      ],
      exp: 'लोकतांत्रिक / अधिकारपूर्ण (Authoritative) शैली में भावनात्मक अपनापन और स्पष्ट तर्कसंगत सीमाएँ साथ रहती हैं, जिससे स्व-अनुशासन विकसित होता है।',
    },
  },
  {
    topic: 'Gilligan – Ethic of Care Critique',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'How did Carol Gilligan constructively expand Lawrence Kohlberg’s moral development framework in educational psychology?',
      opts: [
        'By highlighting an "Ethic of Care" rooted in empathy, relationships, and mutual responsibility alongside abstract justice rules',
        'By proving infants at 3 months memorize civil tax codes',
        'By claiming moral reasoning has zero connection to empathy',
        'By replacing moral dilemmas with physical push-up tests',
      ],
      exp: 'Gilligan argued Kohlberg privileged detached rule-based justice while overlooking relational caregiving responsibility equally vital to mature morality.',
    },
    mr: {
      q: 'कॅरोल गिलिगन यांनी लॉरेन्स कोहलबर्गच्या नैतिक विकास सिद्धांतात कोणती महत्त्वपूर्ण भर घातली?',
      opts: [
        'केवळ अमूर्त न्याय-नियमांबरोबरच सहानुभूती, नातेसंबंध व परस्पर जबाबदारीवर आधारित "काळजीचे नीतिशास्त्र (Ethic of Care)" अधोरेखित केले',
        '३ महिन्यांचे बाळ कायद्याची कलमे पाठ करते हे सिद्ध केले',
        'नैतिक विचारांचा सहानुभूतीशी काहीच संबंध नसतो असा दावा केला',
        'नैतिक चर्चा रद्द करून केवळ शारीरिक कसरती ठेवल्या',
      ],
      exp: 'गिलिगन यांनी दाखवून दिले की नैतिक परिपक्वतेमध्ये केवळ कोरड्या नियमांपेक्षा परस्पर काळजी, करुणा आणि संबंधांची जपणूक तितकीच महत्त्वाची असते.',
    },
    hi: {
      q: 'कैरोल गिलिगन ने लॉरेंस कोहलबर्ग के नैतिक विकास सिद्धांत का रचनात्मक विस्तार किस प्रकार किया?',
      opts: [
        'अमूर्त न्याय नियमों के साथ-साथ सहानुभूति, संबंधों और परस्पर उत्तरदायित्व पर आधारित "देखभाल की नैतिकता (Ethic of Care)" को उजागर करके',
        'यह सिद्ध करके कि 3 माह के शिशु कानून याद कर लेते हैं',
        'यह दावा करके कि नैतिक तर्क का करुणा से कोई संबंध नहीं है',
        'नैतिक दुविधाओं को शारीरिक व्यायाम परीक्षण से बदलकर',
      ],
      exp: 'गिलिगन ने बताया कि कोहलबर्ग ने न्याय-नियमों पर अधिक बल दिया, जबकि संबंधों की जिम्मेदारी और करुणा आधारित नैतिकता भी उतनी ही महत्वपूर्ण है।',
    },
  },
  {
    topic: 'Bloom Affective Domain Hierarchy',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In Krathwohl & Bloom’s Affective Domain (attitudes, values, empathy), when a Class 5 student voluntarily stops friends from wasting tap water during break even when no teacher is watching, which highest level is reached?',
      opts: [
        'Characterization by a Value — the conservation value consistently guides everyday lifestyle automatically',
        'Passive Receiving — merely noticing a poster exists',
        'Mechanical Psychomotor Imitation',
        'Pure verbal rote recall',
      ],
      exp: 'Across Receiving -> Responding -> Valuing -> Organization -> Characterization, internalizing a principle into habitual integrity marks the top tier.',
    },
    mr: {
      q: 'क्रॅथवोल आणि ब्लूम यांच्या भावात्मक क्षेत्रात (Affective Domain), कोणीही शिक्षक पाहत नसतानाही इ. ५ वीतील मुलगा सुट्टीत नळाचे पाणी वाया घालवणाऱ्या मित्रांना स्वतःहून समजावून थांबवतो; हा कोणता सर्वोच्च स्तर आहे?',
      opts: [
        'मूल्याद्वारे चारित्र्यीकरण (Characterization) — मूल्य दैनंदिन वर्तनाचा अविभाज्य भाग बनणे',
        'निष्क्रिय ग्रहण — केवळ भिंतीवरील पोस्टर पाहणे',
        'यांत्रिक शारीरिक अनुकरण',
        'केवळ शाब्दिक घोकंपट्टी',
      ],
      exp: 'ग्रहण -> प्रतिसाद -> मूल्यमापन -> संघटन -> चारित्र्यीकरण या श्रेणीत, नैसर्गिक जीवनशैलीत मूल्यांचे रूपांतर होणे हा सर्वोच्च टप्पा आहे.',
    },
    hi: {
      q: 'क्रैथवॉल और ब्लूम के भावात्मक पक्ष (Affective Domain) में, जब कोई शिक्षक न देख रहा हो तब भी कक्षा 5 का छात्र मध्यांतर में मित्रों को नल का पानी बर्बाद करने से स्वयं रोकता है; यह कौन-सा सर्वोच्च स्तर है?',
      opts: [
        'मूल्य द्वारा चरित्रीकरण (Characterization) — मूल्य का दैनिक आचरण में स्वतः समाहित हो जाना',
        'निष्क्रिय ग्रहण — केवल दीवार का पोस्टर देखना',
        'यांत्रिक मनोगत्यात्मक अनुकरण',
        'केवल शाब्दिक रटंत स्मरण',
      ],
      exp: 'भावात्मक पक्ष के सर्वोच्च स्तर "चरित्रीकरण" में कोई नैतिक मूल्य व्यक्ति के सहज दैनिक जीवन और व्यवहार का स्थायी हिस्सा बन जाता है।',
    },
  },
  {
    topic: 'Psychomotor Domain – Dave Taxonomy',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'When learning to use a magnifying glass safely in Class 4 science: first mimicking the teacher (Imitation), next following printed steps (Manipulation), then focusing accurately without shaking (Precision), and finally adjusting distance smoothly across field specimens—this tracks which domain?',
      opts: [
        'Psychomotor Domain (skillful physical coordination progressing toward Precision and Articulation)',
        'Purely Affective aesthetic appreciation',
        'Abstract philosophical ontology',
        'Rote chronological history recall',
      ],
      exp: 'R.H. Dave’s Psychomotor levels—Imitation, Manipulation, Precision, Articulation, Naturalization—describe progressive mastery of hands-on tools.',
    },
    mr: {
      q: 'इ. ४ थीच्या विज्ञानात भिंग (Magnifying glass) वापरताना प्रथम शिक्षकांचे अनुकरण, नंतर लिखित सूचनांनुसार हाताळणी, पुढे हात न थरथरता अचूक केंद्रित करणे व नंतर सहज बदल करणे—ही प्रगती कोणत्या क्षेत्रातील आहे?',
      opts: [
        'मनोगत्यात्मक / क्रियात्मक क्षेत्र (Psychomotor Domain — अनुकरण ते अचूकता व समन्वय)',
        'केवळ भावात्मक सौंदर्य आस्वाद',
        'अमूर्त तात्त्विक तर्कशास्त्र',
        'ऐतिहासिक कालक्रम घोकंपट्टी',
      ],
      exp: 'आर. एच. दवे यांच्या मनोगत्यात्मक वर्गीकरणात अनुकरण, हाताळणी, अचूकता, सुसंगती व स्वाभाविकीकरण हे कौशल्यात्मक टप्पे येतात.',
    },
    hi: {
      q: 'कक्षा 4 के विज्ञान में आवर्धक लेंस का सुरक्षित उपयोग सीखते हुए पहले शिक्षक की नकल, फिर लिखित चरणों से संचालन, फिर बिना काँपे सटीक फोकस करना और फिर सहजता से उपयोग—यह किस पक्ष की प्रगति है?',
      opts: [
        'मनोगत्यात्मक पक्ष (Psychomotor Domain — अनुकरण से परिशुद्धता व समायोजन)',
        'केवल भावात्मक सौंदर्य बोध',
        'अमूर्त दार्शनिक मीमांसा',
        'ऐतिहासिक तिथियों का रटंत स्मरण',
      ],
      exp: 'आर. एच. दवे के मनोगत्यात्मक वर्गीकरण में अनुकरण, कार्यसाधन, परिशुद्धता, स्पष्ट अभिव्यक्ति और स्वाभाविकीकरण हस्त-कौशल की अवस्थाएँ हैं।',
    },
  },
  {
    topic: 'Jigsaw Cooperative Learning',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Dividing a chapter on "Four Crops of Maharashtra" so each home-group student masters ONE crop in an "Expert Group" (Jowar, Cotton, Mango, Sugarcane) and returns to teach peers relies on Elliot Aronson’s:',
      opts: [
        'Jigsaw Classroom — positive interdependence where every learner holds an irreplaceable piece',
        'Cutthroat rank-curve individual competition',
        'Silent solitary worksheet copying',
        'Unplanned free-for-all seating',
      ],
      exp: 'The Jigsaw strategy builds mutual respect and accountability because teammates genuinely depend on each member’s expert explanation.',
    },
    mr: {
      q: '"महाराष्ट्राची चार पिके" हा धडा शिकवताना प्रत्येक गटातील एकेक विद्यार्थी "तज्ज्ञ गटात" (ज्वारी, कापूस, आंबा, ऊस) एका पिकाची सखोल माहिती घेऊन मूळ गटात परत येऊन इतरांना शिकवतो; एलियट अ‍ॅरॉनसनच्या या तंत्राला काय म्हणतात?',
      opts: [
        'जिगसॉ सहकारी अध्ययन पद्धत (Jigsaw Classroom) — प्रत्येक सदस्याच्या योगदानावर आधारित परस्पर अवलंबित्व',
        'स्पर्धात्मक वैयक्तिक क्रमांक पद्धत',
        'शांत बसून स्वतंत्र कार्यपत्रिका उतरवणे',
        'कोणत्याही नियोजनाशिवाय बसण्याची व्यवस्था',
      ],
      exp: 'जिगसॉ (Jigsaw) पद्धतीत प्रत्येक विद्यार्थी एक आवश्यक भाग शिकून गटाला शिकवतो, ज्यामुळे सकारात्मक परस्पर अवलंबित्व व आदर वाढतो.',
    },
    hi: {
      q: '"महाराष्ट्र की चार फसलें" पढ़ाते समय प्रत्येक समूह का एक छात्र "विशेषज्ञ समूह" में एक फसल (ज्वार, कपास, आम, गन्ना) सीखकर अपने मूल समूह को पढ़ाता है; एलियट एरोनसन की यह विधि है:',
      opts: [
        'जिग्सॉ सहकारी अधिगम (Jigsaw Classroom) — सकारात्मक परस्पर निर्भरता जहाँ हर सदस्य अनिवार्य कड़ी हो',
        'गलाकाट व्यक्तिगत अंक-स्पर्धा',
        'मौन एकाकी कार्यपत्रक नकल',
        'अनियोजित अव्यवस्थित बैठक',
      ],
      exp: 'जिग्सॉ (Jigsaw) विधि में प्रत्येक छात्र किसी एक अंश का विशेषज्ञ बनकर साथियों को पढ़ाता है, जिससे सहभागिता और आपसी सम्मान बढ़ता है।',
    },
  },
  {
    topic: 'SQ3R Comprehension Strategy',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Teaching upper-primary pupils the SQ3R study routine before reading an EVS passage expands correctly to:',
      opts: [
        'Survey, Question, Read, Recite, Review',
        'Skip, Memorize, Repeat, Copy, Sleep',
        'Spell, Quiz, Rank, Rush, Erase',
        'Sit, Quiet, Read-fast, Rest, Forget',
      ],
      exp: 'Francis Robinson’s SQ3R turns passive reading into active inquiry: skimming headings, posing questions, reading purposefully, summarizing orally, and reviewing.',
    },
    mr: {
      q: 'परिसर अभ्यासाचा उतारा वाचण्यापूर्वी शिकवलेली SQ3R अध्ययन पद्धती म्हणजे अचूकपणे कोणता क्रम?',
      opts: [
        'सर्वेक्षण (Survey), प्रश्ननिर्मिती (Question), वाचन (Read), उजळणी/कथन (Recite), पुनरावलोकन (Review)',
        'टाळा, पाठ करा, घोकंपट्टी करा, नक्कल करा, झोपा',
        'अक्षरलेखन, प्रश्नमंजुषा, क्रमांक, घाई, पुसून टाका',
        'बसा, गप्प राहा, वेगाने वाचा, विश्रांती घ्या, विसरा',
      ],
      exp: 'SQ3R पद्धती (Survey, Question, Read, Recite, Review) वाचनाला निष्क्रिय न ठेवता प्रश्नोत्तरात्मक व सखोल आकलनाचे रूप देते.',
    },
    hi: {
      q: 'पर्यावरण अध्ययन का पाठ पढ़ने से पहले सिखाई जाने वाली SQ3R अध्ययन रणनीति का सही विस्तार क्या है?',
      opts: [
        'सर्वेक्षण (Survey), प्रश्न (Question), पठन (Read), सस्वर दोहराव (Recite), समीक्षा (Review)',
        'छोड़ो, रटो, दोहराओ, नकल करो, सो जाओ',
        'वर्तनी, प्रश्नोत्तरी, श्रेणी, जल्दबाजी, मिटाना',
        'बैठो, चुप रहो, तेज़ पढ़ो, आराम करो, भूल जाओ',
      ],
      exp: 'SQ3R (Survey, Question, Read, Recite, Review) निष्क्रिय पठन को सक्रिय प्रश्न-आधारित समझ और समेकन में बदलता है।',
    },
  },
  {
    topic: 'Sociometry – Peer Relationships',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 5 teacher quietly asks each pupil to name two classmates they would love to sit beside during a picnic bus ride and plots the arrows on paper to spot lonely "isolates" needing gentle peer integration. Who pioneered this Sociometry tool?',
      opts: [
        'Jacob L. Moreno — mapping informal social acceptance and isolation within groups',
        'Ivan Pavlov — salivation reflex measurement',
        'Alfred Binet — chronological digit span',
        'Abraham Maslow — physiological calorie count',
      ],
      exp: 'Jacob Moreno’s Sociogram reveals stars, cliques, mutual pairs, and isolates so teachers can sensitively foster inclusive peer belonging.',
    },
    mr: {
      q: 'इ. ५ वीचे शिक्षक सहलीच्या बसमध्ये सोबत बसायला आवडणाऱ्या दोन मित्रांची नावे प्रत्येकाला गुपचूप लिहायला सांगून वर्गात एकटे पडणारे विद्यार्थी ("Isolates") शोधण्यासाठी आराखडा काढतात; या समाजमिती (Sociometry) तंत्राचे जनक कोण?',
      opts: [
        'जेकब मोरेनो (Jacob Moreno) — गटातील अनौपचारिक सामाजिक स्वीकार व एकाकीपणा मोजण्याचे शास्त्र',
        'इव्हान पॅव्हलॉव्ह — लाळ गळण्याचे मोजमाप',
        'अल्फ्रेड बिने — अंक स्मरण चाचणी',
        'अब्राहम मॅस्लो — उष्मांक मोजणी',
      ],
      exp: 'जेकब मोरेनो यांच्या समाजमिती (Sociometry / Sociogram) तंत्रामुळे वर्गातील लोकप्रिय विद्यार्थी व एकाकी पडलेले विद्यार्थी ओळखून सर्वांना सामावून घेता येते.',
    },
    hi: {
      q: 'कक्षा 5 के शिक्षक पिकनिक बस में साथ बैठने के लिए दो पसंदीदा सहपाठियों के नाम गोपनीय रूप से लिखवाकर कक्षा में अलग-थलग ("Isolates") बच्चों को पहचानने का चित्र बनाते हैं; इस समाजमिति (Sociometry) के जनक कौन हैं?',
      opts: [
        'जेकब एल. मोरेनो — समूह में सामाजिक स्वीकृति और अलगाव का मानचित्रण',
        'इवान पावलॉव — लार प्रतिवर्त मापन',
        'अल्फ्रेड बिने — अंक स्मृति अवधि',
        'अब्राहम मैस्लो — कैलोरी मापन',
      ],
      exp: 'जेकब मोरेनो की समाजमिति (Sociometry) कक्षा के सामाजिक संबंधों, समूहों और एकाकी बच्चों को पहचानकर समावेशन बढ़ाने में मदद करती है।',
    },
  },
  {
    topic: 'Criterion-Referenced vs Norm-Referenced',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'When the NIPUN Bharat oral reading check verifies whether EVERY Class 3 learner reads 60 words per minute with comprehension against a fixed competency benchmark—without ranking peers against one another—it is:',
      opts: [
        'Criterion-Referenced Assessment measuring individual mastery against defined standards',
        'Norm-Referenced competitive bell-curve ranking',
        'Hostile aptitude elimination test',
        'Unreliable subjective guesswork',
      ],
      exp: 'Criterion-Referenced evaluation judges performance against clear learning outcomes (so 100% of pupils can succeed), unlike Norm-Referenced ranking.',
    },
    mr: {
      q: 'निपुण भारत अंतर्गत इ. ३ रीतील प्रत्येक मूल समजुतीसह मिनिटाला ६० शब्द वाचू शकते का, हे कोणाचीही इतरांशी तुलना न करता ठरलेल्या निकषावर तपासणे म्हणजे कोणते मूल्यमापन?',
      opts: [
        'निकष-संदर्भित मूल्यमापन (Criterion-Referenced Assessment) — निर्धारित अध्ययन निष्पत्तीशी प्रगती तपासणे',
        'प्रमाणक-संदर्भित (Norm-Referenced) तुलनात्मक क्रमवारी चाचणी',
        'स्पर्धात्मक काढून टाकण्याची चाचणी',
        'अंदाजावर आधारित व्यक्तिनिष्ठ तपासणी',
      ],
      exp: 'निकष-संदर्भित मूल्यमापनात विद्यार्थ्यांची तुलना एकमेकांशी न करता निश्चित अध्ययन निकषांशी (उदा. वाचन ओघ) केली जाते.',
    },
    hi: {
      q: 'निपुण भारत के अंतर्गत जब यह जाँचा जाता है कि कक्षा 3 का प्रत्येक बच्चा समझ के साथ 60 शब्द प्रति मिनट पढ़ सकता है या नहीं—बिना छात्रों की आपस में रैंकिंग किए—तो यह है:',
      opts: [
        'मानदंड-संदर्भित आकलन (Criterion-Referenced Assessment) — निर्धारित दक्षता मानक पर व्यक्तिगत निपुणता मापना',
        'मानक-संदर्भित प्रतिस्पर्धी रैंकिंग',
        'छात्र छँटनी अभिक्षमता परीक्षा',
        'अविश्वसनीय व्यक्तिपरक अनुमान',
      ],
      exp: 'मानदंड-संदर्भित आकलन (Criterion-Referenced) किसी पूर्व-निर्धारित अधिगम मानक के विरुद्ध प्रत्येक बच्चे की दक्षता जाँचता है, न कि सहपाठियों से तुलना करता है।',
    },
  },
  {
    topic: 'Anecdotal Record vs Rating Scale',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Writing a brief, dated, objective factual note ("14 Aug: During group cleanup, Rohan quietly lent his eraser to Meera and swept chalk dust without being asked") without judgmental labels exemplifies:',
      opts: [
        'An Anecdotal Record capturing significant spontaneous behavioral events objectively',
        'A numerical percentile bell curve',
        'A standardized IQ profile',
        'A summative semester mark sheet',
      ],
      exp: 'Anecdotal records document concrete, observed incidents with date and context separately from teacher interpretation.',
    },
    mr: {
      q: '"१४ ऑगस्ट: वर्ग स्वच्छतेवेळी रोहनने कोणाच्याही सांगण्याशिवाय मीराला खोडरबर दिला व खडूची पूड गोळा केली"—ही दिनांकित, वस्तुनिष्ठ व लेबलविरहित लहान नोंद काय दर्शवते?',
      opts: [
        'प्रसंगात्मक नोंद (Anecdotal Record) — स्वाभाविक वर्तनातील लक्षणीय घटनेचे वस्तुनिष्ठ टिपण',
        'संख्यात्मक शतमान घंटाकार वक्र',
        'प्रमाणित बुद्ध्यांक चाचणी अहवाल',
        'सत्राअखेरची अंतिम गुणपत्रिका',
      ],
      exp: 'प्रसंगात्मक नोंद (Anecdotal Record) म्हणजे विद्यार्थ्याच्या रोजच्या निरीक्षणातील महत्त्वाची घटना पूर्वग्रह न ठेवता वस्तुनिष्ठपणे लिहून ठेवणे होय.',
    },
    hi: {
      q: '"14 अगस्त: कक्षा सफाई के समय रोहन ने बिना कहे मीरा को रबड़ दिया और चॉक का चूरा समेटा"—बिना किसी लेबल के लिखा यह दिनांकित व वस्तुनिष्ठ संक्षिप्त विवरण क्या कहलाता है?',
      opts: [
        'उपाख्यानात्मक अभिलेख (Anecdotal Record) — स्वाभाविक महत्वपूर्ण व्यवहार का वस्तुनिष्ठ विवरण',
        'संख्यात्मक प्रतिशत घंटी वक्र',
        'मानकीकृत बुद्धि-लब्धि प्रोफ़ाइल',
        'सत्रांत योगात्मक अंकतालिका',
      ],
      exp: 'उपाख्यानात्मक अभिलेख (Anecdotal Record) में शिक्षक किसी तात्कालिक वास्तविक घटना को दिनांक व संदर्भ सहित बिना पक्षपात के दर्ज करते हैं।',
    },
  },
  {
    topic: 'Dyscalculia – Number Sense Difficulty',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'A bright Class 4 pupil reads stories fluently and paints beautifully, yet consistently struggles to compare whether 39 or 51 is larger, loses count past 12 fingers, and confuses clock hands. Which specific support fits best?',
      opts: [
        'Screening for Dyscalculia and offering visual-tactile ten-frames, number lines, and un-timed concrete manipulatives',
        'Calling the pupil lazy and multiplying timed flashcard drills tenfold',
        'Removing the child from creative art and story periods',
        'Administering high-dose medication without medical evaluation',
      ],
      exp: 'Dyscalculia affects foundational number sense and magnitude comparison; concrete base-10 blocks and number lines build visual quantity anchors.',
    },
    mr: {
      q: 'इ. ४ थीतील हुशार मुलगी गोष्टी छान वाचते व चित्रही सुंदर काढते, पण ३९ आणि ५१ पैकी मोठी संख्या कोणती हे सांगताना गोंधळते व घड्याळाचे काटे वाचू शकत नाही; कोणती मदत सर्वाधिक योग्य आहे?',
      opts: [
        'गणन-अक्षमता (Dyscalculia) लक्षात घेऊन दहाची चौकट (Ten-frames), संख्यारेषा व मूर्त मण्यांची साधने वापरून वेळेच्या दडपणाशिवाय सराव देणे',
        'तिला आळशी म्हणून वेगवान मौखिक पाढ्यांचा सराव दहापट वाढवणे',
        'तिचे चित्रकला व गोष्टींचे तास बंद करणे',
        'डॉक्टरांशिवाय औषधे देणे',
      ],
      exp: 'गणन-अक्षमतेत (Dyscalculia) मूळ संख्याज्ञान व परिमाण तुलना कठीण जाते; त्यामुळे मूर्त दशांश गट आणि संख्यारेषेचा आधार अत्यंत प्रभावी ठरतो.',
    },
    hi: {
      q: 'कक्षा 4 की मेधावी छात्रा कहानियाँ धाराप्रवाह पढ़ती है व सुंदर चित्र बनाती है, पर 39 और 51 में बड़ी संख्या पहचानने तथा घड़ी देखने में लगातार उलझती है; सबसे उपयुक्त सहायता क्या होगी?',
      opts: [
        'डिस्कैलकुलिया (गणना-वैकल्य) के अनुरूप टेन-फ्रेम, संख्या रेखा और मूर्त ब्लॉक द्वारा बिना समय-दबाव के अभ्यास कराना',
        'उसे आलसी कहकर समयबद्ध फ्लैशकार्ड रटंत दस गुना बढ़ाना',
        'चित्रकला और कहानी के पीरियड बंद कर देना',
        'चिकित्सक की सलाह के बिना दवा देना',
      ],
      exp: 'डिस्कैलकुलिया में संख्या-बोध और मात्रा-तुलना प्रभावित होती है; मूर्त दहाई-इकाई ब्लॉक और संख्या रेखा इससे उबरने में सहायक हैं।',
    },
  },
  {
    topic: 'Dyspraxia – Motor Planning Support',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'When a Class 2 learner with Developmental Coordination Disorder (Dyspraxia) drops scissors awkwardly, smudges ruler lines, and tires quickly holding slim pencils despite sharp oral answers, an inclusive classroom offers:',
      opts: [
        'Thick ergonomic pencil grips, non-slip ruler mats, spring-loop scissors, and oral/typed response options',
        'Deduction of full science marks for messy margins',
        'Mandatory extra 20-page cursive punishment after school',
        'Exclusion from all art and science experiments',
      ],
      exp: 'Dyspraxia impacts fine/gross motor planning rather than intellect; assistive grips and alternative output let learners demonstrate true understanding.',
    },
    mr: {
      q: 'इ. २ रीतील एक मुलगा तोंडी उत्तरे उत्तम देतो, पण समन्वय अक्षमतेमुळे (Dyspraxia) कात्री पकडताना हातातून निसटते, पट्टी सरकते व बारीक पेन्सिलने हात लवकर दुखतो; समावेशक वर्गात काय उपाय कराल?',
      opts: [
        'जाड पकडीची पेन्सिल ग्रिप, न सरकणारी पट्टी, स्प्रिंग कात्री आणि तोंडी/डिजिटल उत्तरांचा पर्याय देणे',
        'हस्तलेखन अस्वच्छ म्हणून विज्ञानाचे पूर्ण गुण कापणे',
        'शाळेनंतर २० पाने शुद्धलेखनाची शिक्षा देणे',
        'सर्व कला व विज्ञान प्रयोगांतून वगळणे',
      ],
      exp: 'डिस्प्रेक्सिया (Dyspraxia) हा बुद्धीचा नव्हे तर स्नायू समन्वयाचा प्रश्न आहे; सहाय्यक साधने व पर्यायी अभिव्यक्तीमुळे मूल पूर्ण क्षमतेने शिकते.',
    },
    hi: {
      q: 'कक्षा 2 का छात्र मौखिक उत्तर बहुत अच्छे देता है, पर विकासात्मक समन्वय विकार (Dyspraxia) के कारण कैंची व पटरी सँभालने में कठिनाई व पतली पेन्सिल से जल्दी थकान महसूस करता है; समावेशी कक्षा में क्या करेंगे?',
      opts: [
        'मोटी एर्गोनॉमिक पेन्सिल ग्रिप, न फिसलने वाली पटरी, स्प्रिंग कैंची और मौखिक/टाइप किए उत्तर के विकल्प देना',
        'गंदे हाशिए के लिए विज्ञान के पूरे अंक काट लेना',
        'स्कूल के बाद 20 पृष्ठ सुलेख का दंड देना',
        'सभी कला व विज्ञान प्रयोगों से अलग करना',
      ],
      exp: 'डिस्प्रेक्सिया (Dyspraxia) बुद्धि नहीं बल्कि पेशीय समन्वय को प्रभावित करता है; सहायक ग्रिप व वैकल्पिक माध्यम से छात्र अपनी वास्तविक समझ दिखा पाते हैं।',
    },
  },
  {
    topic: 'Enrichment vs Acceleration for Gifted Learners',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 4 pupil finishes standard addition tables in 5 minutes daily. Rather than assigning 50 repetitive routine sums, how does "Curriculum Enrichment" engage this gifted learner?',
      opts: [
        'Offering open-ended depth—magic squares, local bazaar budget design, or coding pattern challenges',
        'Forcing the child to sharpen pencils for the class silently',
        'Repeating the exact same 2-digit sums endlessly as busywork',
        'Ignoring the learner while praising slower peers publicly',
      ],
      exp: 'Enrichment deepens conceptual inquiry horizontally without forcing premature social separation, avoiding boredom and busywork.',
    },
    mr: {
      q: 'इ. ४ थीतील हुशार मुलगी नेहमीचा बेरजेचा सराव ५ मिनिटांत पूर्ण करते; तिला तीच ५० उदाहरणे पुन्हा न देता "अभ्यासक्रम समृद्धी (Enrichment)" अंतर्गत कोणते काम देणे योग्य ठरेल?',
      opts: [
        'जादूचे चौरस (Magic squares), बाजारपेठ अंदाजपत्रक रचना किंवा नमुन्यांची आव्हानात्मक कोडी सोडवायला देणे',
        'इतरांच्या पेन्सिली तासून देण्याचे काम सांगणे',
        'वेळ घालवण्यासाठी त्याच दोन-अंकी बेरजा पुन्हा पुन्हा करायला लावणे',
        'तिच्याकडे पूर्ण दुर्लक्ष करणे',
      ],
      exp: 'समृद्धीकरण (Enrichment) म्हणजे केवळ वरवरच्या कामाचा भार न वाढवता तार्किक खोली व सृजनशील आव्हाने देऊन प्रतिभेला चालना देणे होय.',
    },
    hi: {
      q: 'कक्षा 4 की एक प्रतिभाशाली छात्रा सामान्य जोड़ अभ्यास 5 मिनट में कर लेती है; उसी तरह के 50 और सवाल देने के बजाय "पाठ्यक्रम संवर्धन (Enrichment)" के तहत क्या देना श्रेष्ठ होगा?',
      opts: [
        'गहन व मुक्त चुनौतियाँ—जैसे जादुई वर्ग (Magic squares), स्थानीय हाट बजट योजना या पैटर्न पहेलियाँ',
        'बाकी कक्षा की पेन्सिलें छीलने का काम सौंपना',
        'व्यस्त रखने के लिए वही दो-अंकीय जोड़ बार-बार करवाना',
        'उसकी जिज्ञासा की अनदेखी करना',
      ],
      exp: 'पाठ्यक्रम संवर्धन (Enrichment) उबाऊ दोहराव के बजाय वैचारिक गहराई, समस्या-समाधान और सृजनशील विस्तार प्रदान करता है।',
    },
  },
  {
    topic: 'ADHD – Classroom Environmental Supports',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Which practical classroom adjustment supports an energetic Class 3 child with Attention-Deficit/Hyperactivity Disorder (ADHD) far better than public reprimands?',
      opts: [
        'Breaking directions into single clear steps, seating away from noisy doorways, and building purposeful movement breaks',
        'Expecting 90 minutes of motionless sitting with zero reminders',
        'Shaming the child’s name on a red board every morning',
        'Cutting all recess and outdoor play completely',
      ],
      exp: 'Chunked visual instructions, reduced visual/auditory distractions, and structured physical movement jobs (distributing books) sustain focus.',
    },
    mr: {
      q: 'अतिचंचलता व लक्ष केंद्रित करण्यातील अडचण (ADHD) असलेल्या इ. ३ रीतील मुलाला सार्वजनिक रागावण्यापेक्षा वर्गात कोणती रचनात्मक मदत अधिक परिणामकारक ठरते?',
      opts: [
        'सूचना लहान स्पष्ट टप्प्यांत देणे, गोंगाटाच्या दारापासून दूर बसवणे आणि पुस्तके वाटण्यासारख्या उपयुक्त हालचालींच्या संधी देणे',
        'सलग ९० मिनिटे न हलता स्तब्ध बसण्याची सक्ती करणे',
        'दररोज सकाळी लाल फळ्यावर त्याचे नाव लिहून अपमान करणे',
        'त्याचा मधल्या सुट्टीतील खेळ पूर्णपणे बंद करणे',
      ],
      exp: 'तुकड्यांतील स्पष्ट सूचना, शांत बैठक जागा आणि उद्दिष्टपूर्ण शारीरिक हालचालींमुळे ADHD असलेले विद्यार्थी आपली ऊर्जा अभ्यासाकडे वळवू शकतात.',
    },
    hi: {
      q: 'अतिसक्रियता व ध्यान-अभाव (ADHD) वाले कक्षा 3 के बच्चे के लिए सार्वजनिक डाँट के बजाय कौन-सा कक्षा प्रबंधन अधिक सहायक है?',
      opts: [
        'निर्देशों को छोटे स्पष्ट चरणों में देना, शोरगुल वाले दरवाज़े से दूर बैठाना और कॉपी बाँटने जैसे सार्थक गतिशील विराम देना',
        'बिना हिले-डुले लगातार 90 मिनट बैठने की अपेक्षा करना',
        'हर सुबह लाल बोर्ड पर नाम लिखकर शर्मिंदा करना',
        'मध्यांतर का खेल पूरी तरह बंद कर देना',
      ],
      exp: 'छोटे चरणों वाले निर्देश, कम विकर्षण वाली सीट और संरचित शारीरिक गतिविधि (चहलकदमी का सार्थक कार्य) ADHD छात्रों की एकाग्रता बढ़ाते हैं।',
    },
  },
  {
    topic: 'ASD – Visual Schedules & Sensory Predictability',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'For a Class 2 learner on the Autism Spectrum (ASD) who becomes distressed by loud school bells or sudden timetable changes, which proactive strategy prevents sensory overload?',
      opts: [
        'Using a calm picture-icon daily schedule board, advance quiet countdown cards before transitions, and optional ear-muffs during assemblies',
        'Surrounding the child with louder drumbeats to "toughen them up"',
        'Forcing intense eye contact during every tantrum',
        'Changing room routines unexpectedly every afternoon',
      ],
      exp: 'Visual predictability and gentle sensory accommodations respect neurodivergent processing and prevent avoidable meltdowns.',
    },
    mr: {
      q: 'इ. २ रीतील स्वमग्नता (Autism Spectrum) असलेल्या मुलाला मोठ्या घंटेचा आवाज किंवा वेळापत्रकातील अचानक बदलामुळे त्रास होत असल्यास, संवेदी ताण टाळण्यासाठी कोणता पूर्व-उपाय कराल?',
      opts: [
        'चित्र-आधारित दैनिक वेळापत्रक फलक वापरणे, बदलाआधी शांत कार्डने पूर्वसूचना देणे व मोठ्या आवाजावेळी इअर-मफ्सचा पर्याय देणे',
        '"कणखर बनवण्यासाठी" अधिक मोठे ढोल वाजवणे',
        'अस्वस्थ असताना जबरदस्तीने नजरेला नजर भिडवायला लावणे',
        'दर दुपारी अचानक वर्गाचे नियम बदलणे',
      ],
      exp: 'चित्रमय पूर्वनियोजन, शांत पूर्वसूचना आणि संवेदी अनुकूलता यांमुळे स्वमग्न विद्यार्थ्यांना सुरक्षित व तणावमुक्त वातावरण मिळते.',
    },
    hi: {
      q: 'ऑटिज़्म स्पेक्ट्रम (ASD) वाले कक्षा 2 के छात्र को तेज़ घंटी की आवाज़ या अचानक समय-सारणी बदलने से कष्ट होता है; संवेदी अधिभार रोकने का श्रेष्ठ उपाय क्या है?',
      opts: [
        'चित्र-आधारित दैनिक समय-तालिका बोर्ड रखना, बदलाव से पहले शांत संकेत कार्ड दिखाना और सभा में ईयर-मफ्स का विकल्प देना',
        '"मजबूत बनाने" के लिए अधिक तेज़ ढोल बजाना',
        'तनाव के समय जबरन आँखों में आँखें डालकर देखने को कहना',
        'हर दोपहर अचानक कक्षा के नियम बदल देना',
      ],
      exp: 'दृश्य पूर्वानुमेयता (Visual schedules) और संवेदी अनुकूलन न्यूरोडाइवर्जेंट बच्चों की असहजता को काफी कम कर देते हैं।',
    },
  },
  {
    topic: 'Diagnostic vs Placement Assessment',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'A Class 5 teacher already knows from unit scores that four pupils missed fraction-addition items, and designs a 5-item error-analysis probe ("added denominators directly vs misread numerator") strictly to uncover WHY those mistakes happen before reteaching. This probe is:',
      opts: [
        'Diagnostic Assessment pinpointing specific underlying conceptual error patterns',
        'End-of-year external certification ranking',
        'Punitive gatekeeping entrance exam',
        'Unrelated personality preference survey',
      ],
      exp: 'Diagnostic Assessment probes root causes and specific error mechanisms (like adding denominators: 1/2 + 1/3 = 2/5) to guide targeted remediation.',
    },
    mr: {
      q: 'अपूर्णांकांच्या बेरजेत चार विद्यार्थी चुकत असल्याचे लक्षात आल्यावर, ते नेमके का चुकतात ("छेदांची थेट बेरीज करतात की अंश वाचण्यात गफलत होते") हे शोधण्यासाठी शिक्षकांनी ५ प्रश्नांची सूक्ष्म चाचणी घेतली; ही चाचणी कोणती?',
      opts: [
        'निदानात्मक मूल्यमापन (Diagnostic Assessment) — चुकीच्या मूळ कारणांचा नेमका शोध घेणे',
        'वर्षाअखेरची बाह्य क्रमवारी परीक्षा',
        'प्रवेश नाकारणारी दंडात्मक चाचणी',
        'व्यक्तिमत्त्व आवडीनिवडीचे सर्वेक्षण',
      ],
      exp: 'निदानात्मक चाचणीचा हेतू केवळ गुण देणे नसून विद्यार्थ्याच्या विशिष्ट संकल्पनात्मक चुकीचे नेमके कारण शोधून उपचारात्मक अध्यापन करणे हा असतो.',
    },
    hi: {
      q: 'चार छात्रों द्वारा भिन्न के जोड़ में गलती करने पर शिक्षक यह पता लगाने के लिए 5 प्रश्नों की सूक्ष्म जांच करते हैं कि गलती क्यों हो रही है ("हर को सीधे जोड़ रहे हैं या अंश गलत पढ़ रहे हैं"); यह जांच है:',
      opts: [
        'निदानात्मक आकलन (Diagnostic Assessment) — त्रुटि के विशिष्ट मूल कारण की पहचान करना',
        'वर्षांत बाह्य प्रमाणन रैंकिंग',
        'दंडात्मक प्रवेश छँटनी परीक्षा',
        'व्यक्तित्व रुचि सर्वेक्षण',
      ],
      exp: 'निदानात्मक आकलन (Diagnostic Assessment) यह खोजता है कि छात्र किस विशिष्ट वैचारिक कारण से गलती कर रहा है ताकि सटीक उपचारात्मक शिक्षण हो सके।',
    },
  },
  {
    topic: 'Think-Pair-Share Engagement',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Why does Frank Lyman’s "Think -> Pair -> Share" routine consistently encourage quiet rural primary students to speak up more than sudden whole-class cold-calling?',
      opts: [
        'Silent thinking protects processing time and pairing lets shy pupils rehearse ideas safely with one peer before addressing the whole room',
        'It eliminates individual thinking completely',
        'It guarantees only the loudest monitor talks for 30 minutes',
        'It removes the teacher from listening altogether',
      ],
      exp: 'Private think time plus low-stakes partner rehearsal sharply lowers speaking anxiety and raises universal intellectual participation.',
    },
    mr: {
      q: 'संपूर्ण वर्गासमोर अचानक एकाच मुलाला विचारण्यापेक्षा "विचार करा -> जोडीने चर्चा -> वर्गासमोर सांगा (Think-Pair-Share)" या तंत्रामुळे ग्रामीण भागातील लाजाळू मुलेही अधिक बोलकी का होतात?',
      opts: [
        'स्वतंत्र विचाराला वेळ मिळतो आणि जोडीदारासोबत मताची सुरक्षित चाचणी झाल्यामुळे वर्गासमोर बोलण्याची भीती कमी होते',
        'यामुळे वैयक्तिक विचार पूर्णपणे बंद होतो',
        'यात केवळ वर्गातील सर्वांत बोलका प्रमुख ३० मिनिटे बोलतो',
        'यात शिक्षक मुलांचे ऐकणेच बंद करतात',
      ],
      exp: 'थिंक-पेअर-शेअरमध्ये प्रथम वैयक्तिक विचार आणि नंतर जोडीतील सुरक्षित संवादातून आत्मविश्वास मिळाल्यामुळे प्रत्येक मूल निर्भयपणे व्यक्त होते.',
    },
    hi: {
      q: 'पूरी कक्षा के सामने अचानक किसी एक को खड़ा करने की बजाय "सोचें -> जोड़ी में चर्चा -> साझा करें (Think-Pair-Share)" से संकोची छात्र भी क्यों बोलने लगते हैं?',
      opts: [
        'मौन सोचने का समय मिलता है और एक साथी के साथ सुरक्षित अभ्यास कर लेने से पूरी कक्षा के सामने बोलने का संकोच घटता है',
        'यह व्यक्तिगत सोच को पूरी तरह समाप्त कर देता है',
        'इसमें केवल कक्षा मॉनीटर 30 मिनट बोलता है',
        'इसमें शिक्षक सुनना पूरी तरह बंद कर देते हैं',
      ],
      exp: 'Think-Pair-Share में निजी विचार-समय और जोड़ी में सुरक्षित पूर्व-अभ्यास के कारण झिझक दूर होती है और सहभागिता बढ़ती है।',
    },
  },
];
