import { CuratedTrilingualMcq } from './types';

// Batch 3 CDP Part 1 (32 original trilingual items; 0 overlap with B1/B2)
export const MAHA_TET_P1_B3_CDP_PART1: CuratedTrilingualMcq[] = [
  {
    topic: 'Piaget – Egocentrism in Preoperational Thought',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A 4-year-old boy holds his drawing facing himself and asks his grandmother across the room, "Look, Granny, do you like my tractor?" What preoperational feature does this show?',
      opts: [
        'Cognitive egocentrism — assuming others share his exact visual perspective',
        'Object permanence mastery',
        'Propositional combinatorial reasoning',
        'Moral autonomy',
      ],
      exp: 'Piaget showed preoperational children (ages 2–7) struggle to decenter and adopt another’s spatial viewpoint.',
    },
    mr: {
      q: 'चार वर्षांचा मुलगा स्वतःचे चित्र स्वतःकडेच धरून आजीला विचारतो, "आजी, माझा ट्रॅक्टर कसा वाटला?" पियाजेच्या मते हे पूर्व-क्रियात्मक अवस्थेचे कोणते लक्षण आहे?',
      opts: [
        'बोधनात्मक स्वकेंद्रितता (Egocentrism) – इतरांनाही आपल्यासारखेच दिसते अशी समजूत',
        'वस्तू-स्थायित्व प्राप्ती',
        'औपचारिक तर्कशुद्ध संयोग',
        'स्वायत्त नैतिक निर्णय',
      ],
      exp: 'पूर्व-क्रियात्मक अवस्थेत (२–७ वर्षे) बालकांना दुसऱ्याच्या दृष्टिकोनातून पाहणे (Decentering) कठीण जाते.',
    },
    hi: {
      q: 'चार वर्षीय बालक अपना चित्र स्वयं की ओर पकड़े रखकर दूर बैठी दादी से पूछता है, "दादी, मेरा ट्रैक्टर कैसा लगा?" पियाजे के अनुसार यह पूर्व-संक्रियात्मक अवस्था का कौन-सा गुण है?',
      opts: [
        'अहंकेंद्रिता (Egocentrism) — यह मानना कि दूसरे भी वही देख रहे हैं जो वह देख रहा है',
        'वस्तु स्थायित्व की सिद्धि',
        'औपचारिक तार्किक निगमन',
        'स्वायत्त नैतिक बोध',
      ],
      exp: 'पूर्व-संक्रियात्मक बच्चे दूसरों के स्थानिक दृष्टिकोण को आसानी से नहीं अपना पाते।',
    },
  },
  {
    topic: 'Piaget – Centration vs Decentration',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why does a 5-year-old judge a spread-out row of 6 coins as having "more" coins than a closely packed row of 6 coins?',
      opts: [
        'Centration — focusing on one perceptual dimension (row length) while ignoring density',
        'Hypothetico-deductive testing',
        'Identity constancy mastery',
        'Reversible operational thinking',
      ],
      exp: 'Preoperational thinkers center on one striking visual cue rather than coordinating length and spacing.',
    },
    mr: {
      q: 'सहा नाण्यांच्या लांब पसरलेल्या रांगेत जवळजवळ ठेवलेल्या सहा नाण्यांपेक्षा "जास्त नाणी" आहेत असे पाच वर्षांचे मूल का म्हणते?',
      opts: [
        'एककेंद्रित विचार (Centration) – केवळ रांगेच्या लांबीवर लक्ष केंद्रित करून घनतेकडे दुर्लक्ष करणे',
        'परिकल्पित-निगमन चाचणी',
        'प्रत्यावर्तन क्षमता प्राप्त होणे',
        'अमूर्त सांख्यिकी ज्ञान',
      ],
      exp: 'पूर्व-क्रियात्मक बालक एकाच ठळक बाबीवर (लांबी) लक्ष केंद्रित करते.',
    },
    hi: {
      q: 'पाँच वर्षीय बच्चा छह दूर-दूर रखे सिक्कों की पंक्ति को पास रखे छह सिक्कों से "अधिक" क्यों बताता है?',
      opts: [
        'केंद्रीकरण (Centration) — केवल एक पक्ष (लंबाई) पर ध्यान देना और अंतर की उपेक्षा करना',
        'परिकल्पनात्मक निगमनात्मक चिंतन',
        'उत्क्रमणीयता की परिपक्वता',
        'अमूर्त सांख्यिकी प्रवीणता',
      ],
      exp: 'पूर्व-संक्रियात्मक अवस्था में बच्चे किसी स्थिति के एक ही दृश्य पहलू पर अटक जाते हैं।',
    },
  },
  {
    topic: 'Piaget – Seriation & Transitivity',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'If Ram is taller than Shyam, and Shyam is taller than Mohan, a Class 4 student instantly concludes Ram is taller than Mohan without seeing them together. Which concrete operational ability is this?',
      opts: [
        'Transitive inference (Transitivity) paired with mental seriation',
        'Animistic projection',
        'Syncretic reasoning',
        'Deferred imitation',
      ],
      exp: 'Understanding relational order (A > B > C implies A > C) consolidates in Piaget’s Concrete Operational stage (7–11 yrs).',
    },
    mr: {
      q: 'राम शामपेक्षा उंच आहे आणि शाम मोहनपेक्षा उंच आहे, यावरून प्रत्यक्ष न पाहता चौथीतील विद्यार्थी "राम मोहनपेक्षा उंच आहे" असा निष्कर्ष काढतो. ही मूर्त क्रियात्मक अवस्थेची कोणती क्षमता आहे?',
      opts: [
        'संक्रामक तर्क (Transitivity) व क्रमबद्ध मांडणी (Seriation)',
        'सजीवत्वारोपण',
        'विलंबित अनुकरण',
        'संवेदनकारक प्रतिक्षेप',
      ],
      exp: 'मूर्त क्रियात्मक अवस्थेत (७–११ वर्षे) वस्तूंची क्रमबद्ध मांडणी व संबंध तर्क (A > B > C => A > C) विकसित होतात.',
    },
    hi: {
      q: 'राम श्याम से लंबा है और श्याम मोहन से लंबा है — चौथी का छात्र बिना देखे निष्कर्ष निकालता है कि राम मोहन से लंबा है। यह मूर्त संक्रियात्मक अवस्था का कौन-सा कौशल है?',
      opts: [
        'सकर्मक अनुमान (Transitivity) एवं क्रमबद्धता (Seriation)',
        'जीववादी कल्पना',
        'विलंबित अनुकरण',
        'संवेदी प्रतिवर्त',
      ],
      exp: '७–११ वर्ष की अवस्था में क्रमबद्ध संबंधों से तार्किक अनुमान लगाने की क्षमता विकसित हो जाती है।',
    },
  },
  {
    topic: 'Piaget – Schema Assimilation vs Accommodation',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A toddler calls a fluffy lamb "doggie", until her father explains it has wool and says "baa", prompting her to form a new "sheep" category. Revising her mental category exemplifies:',
      opts: [
        'Accommodation — modifying existing cognitive schemas to fit discrepant experience',
        'Pure habituation without schema change',
        'Classical extinction',
        'Sensorimotor circular reaction only',
      ],
      exp: 'Fitting the lamb into "doggie" was assimilation; creating the "sheep" schema to resolve disequilibrium is accommodation.',
    },
    mr: {
      q: 'कुत्र्याला ओळखणारे मूल मेंढीलाही "कुत्रा" म्हणते; वडिलांनी तिची लोकर व "बॅ" आवाज सांगितल्यावर मूल मेंढीसाठी वेगळा मानसिक साचा बनवते. याला पियाजे काय म्हणतात?',
      opts: [
        'समायोजन (Accommodation) – नवीन अनुभवानुसार मानसिक साचा सुधारणे',
        'केवळ यांत्रिक पुनरावृत्ती',
        'अभिजात विलोपन',
        'अपरिपक्व प्रतिक्षेप',
      ],
      exp: 'जुन्या साच्यात बसवणे म्हणजे आत्मसात्करण (Assimilation), तर साच्यात बदल घडवणे म्हणजे समायोजन (Accommodation).',
    },
    hi: {
      q: 'बच्चा पहले भेड़ को "कुत्ता" कहता है, पर पिता द्वारा ऊन व "मैं-मैं" समझाने पर वह "भेड़" की अलग मानसिक श्रेणी बना लेता है। यह सुधार क्या कहलाता है?',
      opts: [
        'समायोजन (Accommodation) — नई सूचना के अनुसार वर्तमान स्कीमा में संशोधन करना',
        'केवल यांत्रिक दोहराव',
        'अभिजात विलोपन',
        'संवेदी विभ्रम',
      ],
      exp: 'नए अनुभव के अनुसार पुराने स्कीमा को बदलना या नया स्कीमा बनाना समायोजन कहलाता है।',
    },
  },
  {
    topic: 'Vygotsky – Private Speech to Inner Speech',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'According to Lev Vygotsky, how does a 6-year-old’s audible "Private Speech" ("Now turn the red piece sideways...") transform by age 8–9?',
      opts: [
        'It goes underground as silent verbal thought ("Inner Speech") for self-regulation',
        'It disappears completely leaving humans thoughtless',
        'It reverts into infantile babbling',
        'It signals permanent speech delay',
      ],
      exp: 'Vygotsky traced speech progression: Social Speech -> audible Private Speech -> internalized Inner Speech.',
    },
    mr: {
      q: 'वायगॉत्स्की यांच्या मते ६ वर्षांच्या मुलाचे मोठ्याने स्वतःशी बोलणे ("आता हा लाल तुकडा फिरवू...") वयाच्या ८–९ व्या वर्षी कशात रूपांतरित होते?',
      opts: [
        'स्व-नियमनासाठीच्या मूक "आंतरिक भाषेत" (Inner Speech)',
        'विचारशक्ती पूर्णपणे नष्ट होते',
        'लहान बाळाच्या बोबड्या बोलात परत जाते',
        'कायमस्वरूपी भाषादोषात रूपांतरित होते',
      ],
      exp: 'सामाजिक भाषा -> खाजगी संवाद -> आंतरिक विचारभाषा (Inner Speech) हा विकासाचा क्रम असतो.',
    },
    hi: {
      q: 'वाइगोत्स्की के अनुसार ६ वर्षीय बच्चे का जोर से स्वयं से बोलना ("अब लाल टुकड़ा घुमाऊँ...") ८–९ वर्ष तक किसमें बदल जाता है?',
      opts: [
        'स्व-नियमन हेतु मौन "आंतरिक वाक्" (Inner Speech) में',
        'चिंतन पूर्णतः समाप्त हो जाता है',
        'शिशु बबलाने में लौट जाता है',
        'स्थायी वाक् दोष बन जाता है',
      ],
      exp: 'सामाजिक वाक् से निजी वाक् और अंततः आंतरिक वाक् (मौन चिंतन) विकसित होता है।',
    },
  },
  {
    topic: 'Vygotsky – Make-Believe Play as ZPD Creator',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Vygotsky argued that socio-dramatic pretend play creates a powerful Zone of Proximal Development primarily because:',
      opts: [
        'children voluntarily follow social role rules and exercise higher self-restraint than in daily life',
        'play destroys academic discipline',
        'pretending replaces literacy forever',
        'adults script every single word',
      ],
      exp: 'In pretend play children behave beyond their average age by holding mental symbols and role rules in mind.',
    },
    mr: {
      q: 'वायगॉत्स्की यांनी "शाळा-शाळा" किंवा "दवाखाना" सारख्या काल्पनिक नाट्यखेळाला ZPD घडवणारे प्रभावी साधन का मानले?',
      opts: [
        'पात्रांच्या सामाजिक नियमांचे पालन करताना मुले स्वतःहून उच्च आत्मसंयम व प्रतीकात्मक विचार दाखवतात',
        'खेळामुळे शिस्त नष्ट होते',
        'यात प्रौढ प्रत्येक शब्द रटून घेतात',
        'वाचनाची गरज संपते',
      ],
      exp: 'कल्पनाशील खेळात बालक आपल्या वास्तविक वयापेक्षा वरच्या पातळीवर विचार व स्व-नियंत्रण करते.',
    },
    hi: {
      q: 'वाइगोत्स्की ने "डॉक्टर-रोगी" या "स्कूल-स्कूल" जैसे काल्पनिक नाट्य खेल को ZPD का जनक क्यों माना?',
      opts: [
        'भूमिका के सामाजिक नियमों का पालन करते हुए बच्चे सामान्य से अधिक आत्म-नियमन व प्रतीकात्मक चिंतन करते हैं',
        'खेल से सारा अनुशासन नष्ट होता है',
        'इसमें वयस्क हर वाक्य रटवाते हैं',
        'इससे साक्षरता समाप्त होती है',
      ],
      exp: 'खेल में बच्चा अपनी वास्तविक आयु से ऊपर उठकर सामाजिक भूमिकाओं के नियम सीखता है।',
    },
  },
  {
    topic: 'Kohlberg – Stage 1 Obedience vs Punishment',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Asked why he didn’t tear a library page, Arjun replies: "Because the teacher will send me to the principal and punish me." Under Kohlberg’s stages, Arjun reasons at:',
      opts: [
        'Pre-conventional Stage 1 (Obedience and Punishment Orientation)',
        'Conventional Stage 4 (Social Order Orientation)',
        'Post-conventional Stage 5 (Social Contract)',
        'Post-conventional Stage 6 (Universal Ethics)',
      ],
      exp: 'Stage 1 judges right and wrong strictly by physical punishment or authority retaliation.',
    },
    mr: {
      q: 'पुस्तकाचे पान का फाडले नाही असे विचारता अर्जुन म्हणतो, "कारण बाई मला मुख्याध्यापकांकडे नेऊन शिक्षा करतील." कोहलबर्गनुसार हा कोणता स्तर आहे?',
      opts: [
        'पूर्व-पारंपरिक स्तर १ (आज्ञापालन व शिक्षा भय)',
        'पारंपरिक स्तर ४ (कायदा व सुव्यवस्था)',
        'उत्तर-पारंपरिक स्तर ५ (सामाजिक करार)',
        'उत्तर-पारंपरिक स्तर ६ (सार्वत्रिक तत्त्वे)',
      ],
      exp: 'शिक्षेच्या भीतीने नियम पाळणे हे पूर्व-पारंपरिक स्तराच्या पहिल्या टप्प्याचे लक्षण आहे.',
    },
    hi: {
      q: 'किताब का पन्ना क्यों नहीं फाड़ा पूछने पर अर्जुन कहता है, "क्योंकि मैडम दंड दिलवाएँगी।" कोहलबर्ग के अनुसार यह किस चरण का तर्क है?',
      opts: [
        'पूर्व-पारंपरिक चरण १ (दंड एवं आज्ञापालन उन्मुखता)',
        'पारंपरिक चरण ४ (कानून एवं व्यवस्था)',
        'उत्तर-पारंपरिक चरण ५ (सामाजिक अनुबंध)',
        'उत्तर-पारंपरिक चरण ६ (सार्वभौमिक नीति)',
      ],
      exp: 'पहले चरण में सही-गलत का निर्णय मुख्यतः दंड से बचने पर आधारित होता है।',
    },
  },
  {
    topic: 'Kohlberg – Stage 3 Interpersonal Accord',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Riya tidies the art table explaining, "Everyone will praise me as a helpful, nice classmate!" Which Kohlberg stage drives her reasoning?',
      opts: [
        'Conventional Stage 3 ("Good Boy – Nice Girl" interpersonal approval orientation)',
        'Pre-conventional Stage 2 (Instrumental exchange)',
        'Post-conventional Stage 6 (Universal conscience)',
        'Amoral reflex phase',
      ],
      exp: 'Stage 3 seeks social approval and preserving a "nice person" image in immediate relationships.',
    },
    mr: {
      q: 'रिया कला-कोपरा आवरते कारण "सर्वजण माझे कौतुक करतील व मला समजूतदार म्हणतील!" कोहलबर्गनुसार तिचा हा कोणता नैतिक टप्पा आहे?',
      opts: [
        'पारंपरिक स्तर ३ ("चांगला मुलगा – चांगली मुलगी" सामाजिक कौतुक अभिमुखता)',
        'पूर्व-पारंपरिक स्तर २ (स्वार्थ देवाणघेवाण)',
        'उत्तर-पारंपरिक स्तर ६ (सार्वत्रिक विवेक)',
        'नैतिकपूर्व काळ',
      ],
      exp: 'आप्तेष्ट व मित्रांकडून प्रशंसा मिळवण्याची अपेक्षा तिसऱ्या टप्प्याचा केंद्रबिंदू असते.',
    },
    hi: {
      q: 'रिया मेज़ साफ करते हुए कहती है, "सब मुझे अच्छी और मददगार सहपाठी मानेंगे!" कोहलबर्ग के अनुसार यह नैतिक तर्क किस चरण को दर्शाता है?',
      opts: [
        'पारंपरिक चरण ३ ("अच्छा लड़का – अच्छी लड़की" पारस्परिक स्वीकृति उन्मुखता)',
        'पूर्व-पारंपरिक चरण २ (लाभ-विनिमय)',
        'उत्तर-पारंपरिक चरण ६ (सार्वभौमिक अंतरात्मा)',
        'नवजात प्रतिवर्त',
      ],
      exp: 'चरण ३ में नैतिक निर्णय दूसरों की प्रशंसा और अच्छे संबंध बनाए रखने की इच्छा से प्रेरित होते हैं।',
    },
  },
  {
    topic: 'Gilligan Critique of Kohlberg',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'How did Carol Gilligan constructively critique Lawrence Kohlberg’s moral development theory?',
      opts: [
        'Kohlberg used mostly male samples framing morality as abstract justice while undervaluing an "Ethic of Care" and relational responsibility',
        'Kohlberg focused solely on infants under age 1',
        'Kohlberg rejected all interviews in research',
        'Gilligan showed moral reasoning ends by age 4',
      ],
      exp: 'Gilligan highlighted that care, empathy, and interpersonal responsiveness represent an equally mature moral voice.',
    },
    mr: {
      q: 'कॅरोल गिलिगन यांनी कोहलबर्गच्या नैतिक विकास सिद्धांतावर कोणती रचनात्मक टीका केली?',
      opts: [
        'कोहलबर्गने प्रामुख्याने पुरुष नमुन्यांवर आधारित केवळ अमूर्त न्याय-तत्त्वावर भर दिला व सहानुभूती-काळजीच्या नैतिकतेला ("Ethic of Care") दुय्यम मानले',
        'कोहलबर्गने केवळ एक वर्षाखालील बाळांचा अभ्यास केला',
        'कोहलबर्गने मुलाखती घेतल्याच नाहीत',
        'नैतिक विकास वयाच्या चौथ्या वर्षी पूर्ण होतो असे गिलिगन यांनी मानले',
      ],
      exp: 'परस्पर संवेदनशीलता आणि इतरांची काळजी घेणे ही तितकीच प्रगल्भ नैतिक बाजू असल्याचे गिलिगन यांनी मांडले.',
    },
    hi: {
      q: 'कैरोल गिलिगन ने कोहलबर्ग के नैतिक विकास सिद्धांत की क्या प्रमुख आलोचना की?',
      opts: [
        'कोहलबर्ग ने मुख्यतः पुरुष नमूनों के आधार पर केवल अमूर्त न्याय पर बल दिया और करुणा व देखभाल की नैतिकता (Ethic of Care) को कम आंका',
        'कोहलबर्ग ने केवल एक वर्ष के शिशुओं का अध्ययन किया',
        'कोहलबर्ग ने कोई साक्षात्कार नहीं लिया',
        'नैतिक तर्क ४ वर्ष में पूर्ण हो जाता है',
      ],
      exp: 'गिलिगन ने दर्शाया कि संबंधों की जिम्मेदारी और देखभाल (Care) न्याय के समान ही परिपक्व नैतिक आधार है।',
    },
  },
  {
    topic: 'Erikson – Autonomy vs Shame and Doubt',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'A 2.5-year-old insists "Me do it!" while trying to button her sweater slowly. Allowing patient practice instead of scolding fosters:',
      opts: [
        'a healthy sense of Autonomy rather than Shame and Doubt',
        'Identity vs Role Confusion',
        'Generativity vs Stagnation',
        'Integrity vs Despair',
      ],
      exp: 'Erikson’s second psychosocial crisis (18 months–3 years) centers on self-help competence.',
    },
    mr: {
      q: 'अडीच वर्षांची मुलगी स्वतःचा स्वेटर घालताना "मीच करते!" म्हणते. धीराने करू दिल्यास तिच्यात कोणता गुण विकसित होतो?',
      opts: [
        'स्वायत्तता (Autonomy) व आत्मविश्वास (लाज व संशयाऐवजी)',
        'ओळख विरुद्ध भूमिका गोंधळ',
        'सर्जकता विरुद्ध स्थिरता',
        'एकसंधता विरुद्ध नैराश्य',
      ],
      exp: 'दीड ते ३ वर्षे वयात स्वतःची कामे स्वतः करण्याची संधी मिळाल्यास बालकात स्वायत्तता बळावते.',
    },
    hi: {
      q: 'ढाई वर्षीय बच्ची स्वेटर का बटन खुद लगाते हुए कहती है, "मैं खुद करूँगी!" धैर्यपूर्वक अवसर देने से क्या विकसित होता है?',
      opts: [
        'स्वायत्तता (Autonomy) बनाम लज्जा एवं संदेह में सकारात्मक विश्वास',
        'पहचान बनाम भूमिका भ्रम',
        'उत्पादकता बनाम स्थिरता',
        'संपूर्णता बनाम निराशा',
      ],
      exp: 'एरिकसन के दूसरे चरण (१.५–३ वर्ष) में स्वतंत्र प्रयास का समर्थन स्वायत्तता को पुष्ट करता है।',
    },
  },
  {
    topic: 'Erikson – Industry vs Inferiority',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Why is Erikson’s 4th stage—Industry vs. Inferiority (ages 6–11)—vital for Classes 1 to 5 teachers?',
      opts: [
        'Mastery experiences and encouraging feedback build pride in competence, whereas constant failure breeds lasting inadequacy',
        'Primary pupils are planning retirement',
        'Toddlers master toilet training in Grade 4',
        'Adolescent career identity dominates Grade 1',
      ],
      exp: 'During elementary school, children evaluate themselves through academic, artistic, and peer achievements.',
    },
    mr: {
      q: 'एरिकसनची चौथी अवस्था — "उद्योगशीलता विरुद्ध न्यूनगंड" (Industry vs Inferiority, ६–११ वर्षे) — इयत्ता १ ते ५ च्या शिक्षकांसाठी का महत्त्वाची आहे?',
      opts: [
        'नवे कौशल्य शिकण्यात यश व कौतुकामुळे आत्मविश्वास वाढतो, तर सतत अपयश-अपमानाने कायमचा न्यूनगंड बसू शकतो',
        'प्राथमिक मुले निवृत्तीचे नियोजन करतात म्हणून',
        'चौथीतील मुले शिशु अवस्थेत असतात म्हणून',
        'या वयात कोणतेच कौशल्य शिकवले जात नाही',
      ],
      exp: 'प्राथमिक शाळेच्या वयात वाचन, गणित, खेळ व उपक्रमांत यशाचा अनुभव मिळणे ही उद्योगशीलतेची आधारशिला आहे.',
    },
    hi: {
      q: 'एरिकसन का चौथा चरण — "परिश्रम बनाम हीनता" (६–११ वर्ष) — कक्षा १ से ५ के शिक्षकों के लिए क्यों महत्वपूर्ण है?',
      opts: [
        'सफलता और प्रोत्साहन से कार्य-दक्षता का गर्व जन्म लेता है, जबकि लगातार तुलना से हीनभावना बैठ सकती है',
        'इस उम्र में बच्चे सेवानिवृत्ति की योजना बनाते हैं',
        'पहली कक्षा में शैशव अवस्था चलती है',
        'इस चरण में कोई नया कौशल नहीं सीखा जाता',
      ],
      exp: 'प्राथमिक विद्यालय के वर्षों में कौशल निर्माण और सकारात्मक प्रतिपुष्टि आत्म-सक्षमता को सुदृढ़ करती है।',
    },
  },
  {
    topic: 'Bronfenbrenner – Mesosystem Collaboration',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In Bronfenbrenner’s Ecological Systems Theory, when parents and a teacher coordinate smoothly at a PTM to support a child’s reading, this link sits inside the:',
      opts: [
        'Mesosystem (connections between two direct microsystems)',
        'Chronosystem only',
        'Exosystem factory workplace',
        'Biological genome layer',
      ],
      exp: 'Home and school are Microsystems; active links connecting them form the Mesosystem.',
    },
    mr: {
      q: 'ब्रॉन्फेनब्रेनरच्या परिसंस्थात्मक सिद्धांतानुसार, पालक-शिक्षक सभेत पालक आणि शिक्षक मुलाच्या वाचनासाठी एकत्र नियोजन करतात, तेव्हा ही आंतरक्रिया कोणत्या स्तरावर घडते?',
      opts: [
        'मेसोसिस्टिम (Mesosystem – दोन प्रत्यक्ष सूक्ष्मपरिसरांतील परस्पर दुवा)',
        'केवळ क्रोनोसिस्टिम',
        'अप्रत्यक्ष बाह्य कामाचे ठिकाण (Exosystem)',
        'केवळ आनुवंशिक स्तर',
      ],
      exp: 'घर व शाळा हे स्वतंत्र मायक्रोसिस्टिम आहेत; त्यांच्यातील संबंध व सहकार्य मेसोसिस्टिम बनवते.',
    },
    hi: {
      q: 'ब्रॉन्फेनब्रेनर के पारिस्थितिक तंत्र सिद्धांत में जब अभिभावक-शिक्षक बैठक में माता-पिता व शिक्षक बच्चे के पठन हेतु मिलकर योजना बनाते हैं, तो यह किस स्तर में आता है?',
      opts: [
        'मेसोसिस्टम / मध्य-मंडल (दो प्रत्यक्ष सूक्ष्म-तंत्रों का आपसी संबंध)',
        'केवल क्रोनोसिस्टम',
        'एक्सोसिस्टम',
        'आनुवंशिक परत',
      ],
      exp: 'घर और विद्यालय (दो माइक्रोसिस्टम) के बीच का सक्रिय संबंध मेसोसिस्टम कहलाता है।',
    },
  },
  {
    topic: 'Gardner – Visual-Spatial Intelligence',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'A pupil solves origami geometry puzzles rapidly, crafts relief clay maps, and mentally rotates 3D blocks accurately. Under Howard Gardner, she excels in:',
      opts: [
        'Spatial (Visual-Spatial) Intelligence',
        'Interpersonal Intelligence only',
        'Naturalistic Classification solely',
        'Intrapersonal Meditation',
      ],
      exp: 'Spatial intelligence involves perceiving, transforming, and constructing 2D/3D spatial representations.',
    },
    mr: {
      q: 'एक विद्यार्थिनी कागदाच्या घड्यांची (ओरिगामी) भूमिती चटकन सोडवते, मातीचे अचूक नकाशे घडवते आणि फिरवलेल्या आकृत्या सहज ओळखते. गार्डनरनुसार तिची कोणती बुद्धिमत्ता प्रबळ आहे?',
      opts: [
        'अवकाशीय / दृश्य-स्थानिक बुद्धिमत्ता (Spatial Intelligence)',
        'केवळ आंतरवैयक्तिक बुद्धिमत्ता',
        'केवळ निसर्गवादी बुद्धिमत्ता',
        'केवळ संगीतमय बुद्धिमत्ता',
      ],
      exp: 'त्रिमितीय आकार, दिशा, नकाशे व दृश्य रूपांतरे समजण्याची क्षमता अवकाशीय बुद्धिमत्तेत येते.',
    },
    hi: {
      q: 'एक छात्रा ओरिगामी पहेलियाँ शीघ्र हल करती है, मिट्टी से सटीक मानचित्र बनाती है और घुमाई गई आकृतियाँ पहचानती है। गार्डनर के अनुसार उसमें कौन-सी बुद्धि प्रमुख है?',
      opts: [
        'स्थानिक / दृश्य-स्थानिक बुद्धि (Spatial Intelligence)',
        'केवल अंतर्वैयक्तिक बुद्धि',
        'केवल प्रकृतिवादी बुद्धि',
        'केवल सांगीतिक बुद्धि',
      ],
      exp: 'त्रि-आयामी आकृतियों, दिशाओं और मानचित्रों की सटीक कल्पना स्थानिक बुद्धि की पहचान है।',
    },
  },
  {
    topic: 'Gardner – Intrapersonal vs Interpersonal',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Recognizing one’s own emotional triggers, strengths, and quiet self-reflection exemplifies Howard Gardner’s:',
      opts: [
        'Intrapersonal Intelligence',
        'Interpersonal Intelligence',
        'Musical-Rhythmic Intelligence',
        'Linguistic Intelligence',
      ],
      exp: 'Intrapersonal looks inward for self-understanding; interpersonal reads others’ moods and motives.',
    },
    mr: {
      q: 'स्वतःच्या भावना, बलस्थाने व मर्यादा यांची सखोल जाण असणे आणि आत्मपरीक्षण करणे हे गार्डनरच्या कोणत्या बुद्धिमत्ता प्रकारात येते?',
      opts: [
        'आंतर-आत्मिक / स्व-बोध बुद्धिमत्ता (Intrapersonal Intelligence)',
        'आंतरवैयक्तिक बुद्धिमत्ता (Interpersonal)',
        'संगीतमय बुद्धिमत्ता',
        'भाषिक बुद्धिमत्ता',
      ],
      exp: 'स्वतःला ओळखण्याची क्षमता Intrapersonal, तर इतरांच्या भावना समजणे Interpersonal बुद्धिमत्ता असते.',
    },
    hi: {
      q: 'अपनी भावनाओं, क्षमताओं और सीमाओं की गहरी समझ व आत्म-चिंतन करना हॉवर्ड गार्डनर की किस बुद्धि का उदाहरण है?',
      opts: [
        'अंतःवैयक्तिक / आत्म-बोध बुद्धि (Intrapersonal Intelligence)',
        'अंतर्वैयक्तिक बुद्धि (Interpersonal)',
        'सांगीतिक बुद्धि',
        'भाषिक बुद्धि',
      ],
      exp: 'स्वयं के भीतर झाँककर आत्म-नियमन व समझ रखना अंतःवैयक्तिक बुद्धि है।',
    },
  },
  {
    topic: 'Sternberg – Practical Intelligence',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In Robert Sternberg’s Triarchic Theory (Analytical, Creative, Practical), adapting adeptly to real-world school or market challenges demonstrates:',
      opts: [
        'Practical (Contextual) Intelligence',
        'Pure g-factor psychometric recall',
        'Crystallized Latin trivia',
        'Spatial rotation speed solely',
      ],
      exp: 'Practical intelligence applies tacit everyday know-how to adapt to, shape, or select real contexts.',
    },
    mr: {
      q: 'रॉबर्ट स्टर्नबर्ग यांच्या त्रितत्त्व सिद्धांतानुसार बदलत्या वास्तविक परिस्थितीशी जुळवून घेऊन दैनंदिन प्रश्न सोडवण्याची क्षमता कोणती आहे?',
      opts: [
        'व्यावहारिक / संदर्भानुकूल बुद्धिमत्ता (Practical Intelligence)',
        'केवळ यांत्रिक स्मरण',
        'शाब्दिक पाठांतर',
        'केवळ चित्रकला वेग',
      ],
      exp: 'जीवनातील प्रत्यक्ष व्यवहार, परिस्थिती हाताळणे व योग्य निर्णय घेणे हे व्यावहारिक बुद्धिमत्तेत मोडते.',
    },
    hi: {
      q: 'रॉबर्ट स्टर्नबर्ग के त्रिचापीय सिद्धांत में वास्तविक जीवन की परिस्थितियों के अनुकूल ढलकर समस्या सुलझाने की क्षमता क्या कहलाती है?',
      opts: [
        'व्यावहारिक / संदर्भगत बुद्धि (Practical Intelligence)',
        'केवल यांत्रिक स्मृति',
        'शाब्दिक रटंत',
        'स्थानिक घूर्णन गति',
      ],
      exp: 'दैनिक जीवन की वास्तविक चुनौतियों में व्यावहारिक ज्ञान का प्रयोग Practical Intelligence है।',
    },
  },
  {
    topic: 'Spearman – General Factor "g"',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In Charles Spearman’s Two-Factor Theory, what does the "g" factor denote?',
      opts: [
        'A broad general mental capacity active across cognitive tasks, alongside task-specific "s" skills',
        'Genetically fixed muscular strength',
        'Grammar score only',
        'Group conformity bias',
      ],
      exp: 'Positive manifold correlations across varied tests led Spearman to posit general ability ("g") plus specific ("s") factors.',
    },
    mr: {
      q: 'चार्ल्स स्पियरमन यांच्या द्वि-घटक बुद्धिमत्ता सिद्धांतात "g-घटक" कशाचे प्रतिनिधित्व करतो?',
      opts: [
        'सर्वच बौद्धिक कार्यांत कार्यरत असणारी सामान्य मानसिक क्षमता, जिच्या सोबत विशिष्ट "s-घटक" असतात',
        'केवळ स्नायूंची ताकद',
        'केवळ व्याकरण गुण',
        'केवळ वयाची संख्या',
      ],
      exp: 'विविध चाचण्यांतील सहसंबंधावरून स्पियरमन यांनी सार्वत्रिक सामान्य क्षमता (g) व कार्यविशिष्ट क्षमता (s) सुचवली.',
    },
    hi: {
      q: 'चार्ल्स स्पीयरमैन के द्वि-कारक बुद्धि सिद्धांत में "g-कारक" क्या दर्शाता है?',
      opts: [
        'सभी संज्ञानात्मक कार्यों में प्रयुक्त सामान्य मानसिक ऊर्जा, जिसके साथ विशिष्ट "s-कारक" होते हैं',
        'केवल शारीरिक बल',
        'केवल व्याकरण के अंक',
        'आयु का माप',
      ],
      exp: 'सामान्य बौद्धिक क्षमता (g) हर मानसिक कार्य में सहायक होती है जबकि (s) विशिष्ट दक्षता है।',
    },
  },
  {
    topic: 'Cattell – Fluid vs Crystallized Intelligence',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Solving a brand-new abstract symbol-pattern puzzle without relying on memorized school facts assesses Raymond Cattell’s:',
      opts: [
        'Fluid Intelligence (reasoned pattern induction)',
        'Crystallized historical recall',
        'Mechanical spelling',
        'Bodily reflex speed',
      ],
      exp: 'Fluid intelligence handles novel reasoning; Crystallized intelligence stores accumulated cultural and lexical knowledge.',
    },
    mr: {
      q: 'रेमंड कॅटेल यांच्या सिद्धांतानुसार, पूर्वी कधीही न पाहिलेल्या नवीन आकृती-नमुन्यांचे कोडे सोडवण्यात कोणती बुद्धिमत्ता कार्य करते?',
      opts: [
        'प्रवाही बुद्धिमत्ता (Fluid Intelligence – नवीन समस्यांतील तर्कक्षम लवचिकता)',
        'केवळ पाठांतरावर आधारित ऐतिहासिक ज्ञान',
        'यांत्रिक अक्षर गिरवणे',
        'केवळ शब्दार्थ स्मरण',
      ],
      exp: 'पूर्वज्ञानाशिवाय नवीन तर्क लावण्याची क्षमता प्रवाही (Fluid), तर संचित ज्ञान स्फटिकीकृत (Crystallized) असते.',
    },
    hi: {
      q: 'रेमंड कैटेल के अनुसार बिना किसी पूर्व स्कूली तथ्य के एकदम नई अमूर्त पैटर्न पहेली हल करना किस बुद्धि का प्रमाण है?',
      opts: [
        'तरल बुद्धि (Fluid Intelligence — नवीन समस्याओं में लचीला तर्क)',
        'केवल रटे हुए ऐतिहासिक तथ्य',
        'यांत्रिक वर्तनी अभ्यास',
        'शारीरिक प्रतिवर्त गति',
      ],
      exp: 'तरल बुद्धि नवीन तार्किक संबंध खोजती है, जबकि ठोस (Crystallized) बुद्धि संचित ज्ञान पर आधारित होती है।',
    },
  },
  {
    topic: 'Bandura – Four Observational Learning Steps',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Under Albert Bandura’s Social Cognitive Theory, what are the four sequential processes for observational learning?',
      opts: [
        'Attention -> Retention -> Motor Reproduction -> Motivation',
        'Punishment -> Fear -> Memorization -> Silence',
        'Reflex -> Sleep -> Recitation -> Grading',
        'Conditioning -> Extinction -> Forgetting -> Repetition',
      ],
      exp: 'Learners attend to the model, retain symbolic memory, reproduce actions, and act when motivated.',
    },
    mr: {
      q: 'अल्बर्ट बंडुरा यांच्या सामाजिक अध्ययन सिद्धांतानुसार निरीक्षणद्वारे शिकण्याचे चार अचूक टप्पे कोणते?',
      opts: [
        'अवधान -> धारण -> पुनरुत्पादन -> अभिप्रेरणा (Motivation)',
        'शिक्षा -> भीती -> पाठांतर -> मौन',
        'प्रतिक्षेप -> निद्रा -> वाचन -> गुणांकन',
        'विलोपन -> विस्मरण -> गोंधळ -> ताण',
      ],
      exp: 'लक्ष देणे, लक्षात ठेवणे, कृती करून दाखवणे आणि प्रेरक बळ मिळणे हे बंडुराचे चार टप्पे आहेत.',
    },
    hi: {
      q: 'अल्बर्ट बंडूरा के अनुसार प्रेक्षणात्मक (अवलोकन) अधिगम के चार क्रमिक चरण कौन-से हैं?',
      opts: [
        'अवधान -> धारण -> पुनरुत्पादन -> अभिप्रेरणा',
        'दंड -> भय -> रटना -> मौन',
        'प्रतिवर्त -> निद्रा -> पठन -> अंकन',
        'विलोप -> विस्मृति -> भ्रम -> तनाव',
      ],
      exp: 'ध्यान देना, स्मृति में संजोना, करके दिखाना और सकारात्मक प्रेरणा पाना इसके चार आधार हैं।',
    },
  },
  {
    topic: 'Skinner – Negative Reinforcement vs Punishment',
    pattern: 'Conceptual',
    difficulty: 'Difficult',
    en: {
      q: 'When a teacher announces, "Pupils who check all math steps neatly skip Friday’s extra worksheet," neat checking rises. In Skinner’s operant terms, this is:',
      opts: [
        'Negative Reinforcement (strengthening desired work by removing an aversive chore)',
        'Positive Punishment',
        'Response Extinction',
        'Classical Unconditioned Reflex',
      ],
      exp: 'Reinforcement ALWAYS increases behaviour; removing an unpleasant chore contingent on good effort reinforces that effort.',
    },
    mr: {
      q: '"जो विद्यार्थी वर्गातील उदाहरणे अचूक व स्वच्छ सोडवेल, त्याला आजचा अतिरिक्त गृहपाठ करावा लागणार नाही." यामुळे अचूकतेचा प्रयत्न वाढतो. स्किनरच्या परिभाषेत हे काय आहे?',
      opts: [
        'ऋणात्मक प्रबलन (Negative Reinforcement – अप्रिय ओझे काढून योग्य वर्तन बळकट करणे)',
        'धनात्मक शिक्षा',
        'अभिजात विलोपन',
        'जैविक प्रतिक्षेप',
      ],
      exp: 'अतिरिक्त कामाचा ताण माफ करून योग्य वर्तनाला चालना देणे हे ऋणात्मक प्रबलन असते.',
    },
    hi: {
      q: 'शिक्षक कहते हैं, "जो छात्र कार्य साफ और सही पूरा करेगा, उसे अतिरिक्त अभ्यास-पत्र नहीं करना होगा।" इससे सही कार्य बढ़ता है। स्किनर के अनुसार यह क्या है?',
      opts: [
        'नकारात्मक पुनर्बलन (Negative Reinforcement — अप्रिय बोझ हटाकर वांछित व्यवहार बढ़ाना)',
        'सकारात्मक दंड',
        'विलोप प्रक्रिया',
        'प्राकृतिक प्रतिवर्त',
      ],
      exp: 'नकारात्मक पुनर्बलन दंड नहीं है; यह असुविधाजनक कार्य हटाकर अच्छे व्यवहार की आवृत्ति बढ़ाता है।',
    },
  },
  {
    topic: 'Pavlov – Stimulus Generalization',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Scolded harshly during spelling quizzes, a pupil soon feels anxious even when holding a fun storybook. Pavlov describes this spread of anxiety as:',
      opts: [
        'Stimulus Generalization',
        'Insightful Problem Solving',
        'Metacognitive Monitoring',
        'Intrinsic Motivation',
      ],
      exp: 'Conditioned fear triggered by quiz print generalizes to similar-looking book situations.',
    },
    mr: {
      q: 'तोंडी शुद्धलेखन परीक्षेत सतत रागावल्यामुळे एका मुलाला आता गोष्टीचे पुस्तक हातात घेतानाही भीती वाटते. पाव्हलॉव्हच्या मते हा कोणता परिणाम आहे?',
      opts: [
        'उद्दीपक सामान्यीकरण (Stimulus Generalization)',
        'अंतर्दृष्टीपूर्ण समस्या निवारण',
        'अधिबोधनात्मक निरीक्षण',
        'अंतर्गत प्रेरणा',
      ],
      exp: 'एका अनुभवाशी जोडलेली भय-प्रतिक्रिया तशाच दिसणाऱ्या इतर प्रसंगांवरही पसरणे म्हणजे उद्दीपक सामान्यीकरण.',
    },
    hi: {
      q: 'श्रुतलेख परीक्षा में डांट से डरा बच्चा अब कहानी की किताब पकड़ते समय भी घबरा जाता है। पावलव के अनुसार यह क्या है?',
      opts: [
        'उद्दीपक सामान्यीकरण (Stimulus Generalization)',
        'अंतर्दृष्टि अधिगम',
        'परासंज्ञानात्मक निगरानी',
        'आंतरिक अभिप्रेरणा',
      ],
      exp: 'एक अनुबंधित भय-प्रतिक्रिया का मिलते-जुलते अन्य उद्दीपकों पर फैल जाना उद्दीपक सामान्यीकरण कहलाता है।',
    },
  },
  {
    topic: 'Kohler – Insight Learning',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'After studying a geometry puzzle quietly, a student exclaims "Aha! Moving this triangle forms a rectangle!" Which learning theory highlights sudden perceptual reorganization?',
      opts: [
        'Gestalt Insight Learning (Wolfgang Köhler)',
        'Blind Trial-and-Error Conditioning (Thorndike)',
        'Classical Salivation Reflex',
        'Token Economy',
      ],
      exp: 'Gestalt psychologists showed how grasping holistic structure sparks sudden "Aha!" insight.',
    },
    mr: {
      q: 'भूमितीच्या कोड्याचा शांत विचार केल्यावर विद्यार्थी अचानक म्हणतो, "आहा! हा त्रिकोण इकडे जोडला की आयत बनतो!" अचानक आलेल्या या समजला कोणता सिद्धांत स्पष्ट करतो?',
      opts: [
        'समष्टिवादी अंतर्दृष्टी अध्ययन सिद्धांत (Insight Learning – कोहलर / गेस्टाल्ट)',
        'अंध प्रयत्न-प्रमाद पद्धती',
        'केवळ प्रतिक्षिप्त क्रिया',
        'टोकन अर्थव्यवस्था',
      ],
      exp: 'परिस्थितीचे समग्र आकलन होऊन अचानक सुचणारे अचूक उत्तर म्हणजे अंतर्दृष्टी अध्ययन.',
    },
    hi: {
      q: 'ज्यामिति पहेली पर विचार करने के बाद छात्र अचानक कहता है, "अरे हाँ! इस त्रिभुज को उधर जोड़ने से आयत बनता है!" यह किस सिद्धांत से जुड़ा है?',
      opts: [
        'गेस्टाल्ट अंतर्दृष्टि / सूझ सिद्धांत (कोहलर)',
        'अंध प्रयास एवं त्रुटि',
        'केवल प्रतिवर्त क्रिया',
        'टोकन अर्थव्यवस्था',
      ],
      exp: 'समग्र परिस्थिति के संबंध पहचानकर अचानक समाधान पाना अंतर्दृष्टि अधिगम कहलाता है।',
    },
  },
  {
    topic: 'Thorndike – Law of Readiness',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Before starting division, a teacher plays a 4-minute candy-sharing game to spark curiosity and verify multiplication basics. This respects Thorndike’s:',
      opts: [
        'Law of Readiness (mental and motivational preparedness)',
        'Law of Disuse',
        'Law of Extinction',
        'Law of Blind Drill',
      ],
      exp: 'Learning is satisfying and efficient when the learner is mentally prepared and curious.',
    },
    mr: {
      q: 'भागाकार घटक सुरू करण्यापूर्वी शिक्षिका गोळ्या वाटपाचा खेळ खेळून मुलांत कुतूहल जागवते व गुणाकाराचा आढावा घेते. हे थॉर्नडाईकच्या कोणत्या नियमाशी सुसंगत आहे?',
      opts: [
        'सिद्धतेचा / तयारीचा नियम (Law of Readiness)',
        'अनुपयोगाचा नियम',
        'विलोपनाचा नियम',
        'सक्तीचा नियम',
      ],
      exp: 'विद्यार्थी मानसिकदृष्ट्या तयार असतानाच अध्ययन आनंददायी व प्रभावी घडते.',
    },
    hi: {
      q: 'भाग शुरू करने से पहले शिक्षिका मिठाई-बँटवारा खेल कराकर जिज्ञासा जगाती हैं व गुणन जाँचती हैं। यह थॉर्नडाइक के किस नियम का पालन है?',
      opts: [
        'तत्परता का नियम (Law of Readiness)',
        'अनुपयोग का नियम',
        'विलोपन का नियम',
        'दंड का नियम',
      ],
      exp: 'जब शिक्षार्थी मानसिक व भावनात्मक रूप से तैयार होता है, तब सीखना स्थायी होता है।',
    },
  },
  {
    topic: 'Maslow Hierarchy – Basic Needs First',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'A pupil arriving without breakfast sits anxious about being scolded. Maslow’s Hierarchy explains focus lags until basic:',
      opts: [
        'physiological and emotional safety/belonging needs are met',
        'self-actualization fame awards arrive',
        'algebra homework doubles',
        'rank boards are hung',
      ],
      exp: 'Unmet hunger, fatigue, or fear of scolding blocks higher cognitive growth needs.',
    },
    mr: {
      q: 'सकाळी उपाशी पोटी व रागावतील या भीतीने एकाग्र नसलेल्या मुलाचे गणितात लक्ष लागत नाही. मॅस्लोच्या मते प्रथम कोणत्या गरजांची पूर्तता आवश्यक असते?',
      opts: [
        'शारीरिक (अन्न) आणि भावनिक सुरक्षितता व आपुलकीच्या गरजा',
        'केवळ स्व-साक्षात्कार व मानसन्मान',
        'स्पर्धात्मक गुणपत्रके',
        'अधिक गृहपाठ',
      ],
      exp: 'मूलभूत शारीरिक व सुरक्षिततेच्या गरजा असुरक्षित राहिल्यास उच्च बोधनात्मक शिक्षण खुंटते.',
    },
    hi: {
      q: 'बिना नाश्ते के आया बच्चा डांट के डर से विचलित है। मास्लो के अनुसार पहले किन आवश्यकताओं का ध्यान जरूरी है?',
      opts: [
        'शारीरिक (भोजन) तथा भावनात्मक सुरक्षा व अपनेपन की आवश्यकताएँ',
        'आत्म-सिद्धि पुरस्कार',
        'अतिरिक्त गृहकार्य',
        'कठोर रैंक तुलना',
      ],
      exp: 'भूख और भय जैसी मूलभूत कमियों की पूर्ति हुए बिना उच्च संज्ञानात्मक विकास अवरुद्ध रहता है।',
    },
  },
  {
    topic: 'Intrinsic Motivation & Overjustification',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Self-Determination Theory warns that offering big bribes for something a child already enjoys (like drawing) can backfire by:',
      opts: [
        'undermining Intrinsic Motivation once rewards end ("Overjustification Effect")',
        'making intrinsic joy permanently immortal',
        'increasing holiday drawing without rewards',
        'eliminating all competition',
      ],
      exp: 'Controlling material bribes shift motivation externally; genuine informational appreciation nurtures autonomy.',
    },
    mr: {
      q: 'जी गोष्ट मुलाला आधीच आवडते (उदा. चित्रकला) त्यासाठी सतत महागडी बक्षिसे देऊ केल्यास कोणता उलट परिणाम होऊ शकतो?',
      opts: [
        'बक्षिसे थांबताच नैसर्गिक अंतर्गत प्रेरणा घटू शकते',
        'अंतर्गत आवड दहापट अमर होते',
        'बक्षिसाशिवाय वाचन वाढते',
        'विचारक्षमता दुप्पट होते',
      ],
      exp: 'बाह्य प्रलोभनांवर अति-अवलंबित्व केल्यास क्रियेतील नैसर्गिक आनंद कमी होतो.',
    },
    hi: {
      q: 'जो कार्य बच्चा पहले से आनंद लेकर करता है, उस पर लगातार महँगे बाहरी इनाम रखने से क्या विपरीत प्रभाव पड़ सकता है?',
      opts: [
        'पुरस्कार बंद होते ही आंतरिक अभिप्रेरणा घट सकती है (Overjustification Effect)',
        'आंतरिक रुचि सदा के लिए बढ़ जाती है',
        'बिना इनाम प्रयास दोगुना होगा',
        'तार्किक क्षमता तुरंत बढ़ेगी',
      ],
      exp: 'अत्यधिक बाहरी प्रलोभन आंतरिक आनंद को कमजोर कर सकते हैं।',
    },
  },
  {
    topic: 'Carol Dweck – Growth Mindset Praise',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Which teacher feedback nurtures a resilient "Growth Mindset"?',
      opts: [
        '"Your step-by-step diagram strategy and careful revision helped you crack that tough puzzle!"',
        '"You are a born genius; you never need to try!"',
        '"Some kids simply lack the math gene."',
        '"Finishing fastest is all that counts."',
      ],
      exp: 'Praising strategy, effort, and revision teaches that capability grows through challenge.',
    },
    mr: {
      q: 'कॅरोल ड्वेक यांच्या मते विद्यार्थ्यात "विकासशील मानसिकता" (Growth Mindset) घडवणारा अभिप्राय कोणता?',
      opts: [
        '"तू पायरी-पायरीने आकृती काढून पुन्हा प्रयत्न केलास म्हणून हे कठीण कोडे सुटले!"',
        '"तू जन्मापासूनच अद्भुत हुशार आहेस, मेहनतीची गरजच नाही!"',
        '"काही मुलांच्या मेंदूत गणित नसतेच."',
        '"सर्वांपेक्षा वेगात लिहिलेस हेच महत्त्वाचे."',
      ],
      exp: 'प्रयत्न, धोरण आणि चिकाटीचे कौतुक केल्यास आव्हानांना सामोरे जाण्याची मानसिकता घडते.',
    },
    hi: {
      q: 'कैरोल ड्वेक के अनुसार "विकासोन्मुख मानसिकता" (Growth Mindset) बढ़ाने वाली टिप्पणी कौन-सी है?',
      opts: [
        '"तुम्हारे क्रमबद्ध चित्र बनाने की रणनीति और प्रयास ने इस कठिन सवाल को सुलझाया!"',
        '"तुम जन्मजात प्रतिभाशाली हो, मेहनत की जरूरत नहीं!"',
        '"कुछ बच्चों में गणित क्षमता होती ही नहीं।"',
        '"सबसे जल्दी खत्म कर देना ही सब कुछ है।"',
      ],
      exp: 'जन्मजात गुण के बजाय रणनीति, प्रयास और सुधार की सराहना विद्यार्थियों को जुझारू बनाती है।',
    },
  },
  {
    topic: 'Weiner Attribution Theory',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'A pupil who explains failure as "I haven’t practised fraction diagrams yet" (controllable) recovers much better than one saying:',
      opts: [
        '"I am permanently stupid" (stable, uncontrollable)',
        '"I will review two examples daily"',
        '"Colour coding signs will help me"',
        '"Asking doubts will clear step two"',
      ],
      exp: 'Controllable effort/strategy attributions sustain agency and future persistence.',
    },
    mr: {
      q: 'अपयशाचे कारण "मी अपूर्णांक आकृत्या सरावल्या नाहीत" (सुधारता येण्याजोगे) मानणारा विद्यार्थी कोणापेक्षा लवकर सावरतो?',
      opts: [
        '"माझ्यात कायमच बुद्धी कमी आहे" (स्थिर व अनियंत्रित कारण)',
        '"रोज दोन उदाहरणे सराव करेन"',
        '"रंगीत चिन्हांनी पडताळणी करेन"',
        '"शंका विचारून पायरी दोन समजेन"',
      ],
      exp: 'अपयशाला स्थिर अक्षमतेऐवजी सुधारण्याजोग्या धोरणाची कमतरता मानल्यास आत्मविश्वास टिकतो.',
    },
    hi: {
      q: 'जो छात्र असफलता का कारण "मैंने अभी अभ्यास रणनीति नहीं अपनाई" मानता है, वह किस सोच वाले छात्र से बेहतर उबरता है?',
      opts: [
        '"मैं हमेशा से ही मंदबुद्धि हूँ" (स्थायी और अनियंत्रित कारण)',
        '"अगले सप्ताह रोज अभ्यास करूँगा"',
        '"रंग-संकेत से चरण जाँचूँगा"',
        '"शंका पूछकर सुधार करूँगा"',
      ],
      exp: 'असफलता को स्थिर अक्षमता न मानकर सुधार योग्य प्रयास की कमी मानना आगे बढ़ने की शक्ति देता है।',
    },
  },
  {
    topic: 'Flavell – Metacognitive Monitoring',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'While reading a tough paragraph, a Class 5 pupil notices, "Wait—I missed paragraph 2, let me reread it slowly." John Flavell terms this:',
      opts: [
        'Metacognitive monitoring and self-regulation',
        'Blind conditioning',
        'Acoustic echolalia',
        'Egocentric regression',
      ],
      exp: 'Metacognition ("thinking about one’s own thinking") monitors comprehension breakdowns and selects repairs.',
    },
    mr: {
      q: 'कठीण परिच्छेद वाचताना पाचवीतील मुलगी स्वतःलाच थांबवून विचारते, "दुसरा परिच्छेद नीट समजला नाही; पुन्हा हळू वाचते." फ्लेवेल याला काय म्हणतात?',
      opts: [
        'अधिबोधन निरीक्षण व स्व-नियमन (Metacognitive Monitoring)',
        'यांत्रिक अभिसंधान',
        'ध्वनी-पुनरावृत्ती',
        'स्वकेंद्री माघार',
      ],
      exp: 'स्वतःच्या आकलन प्रक्रियेवर लक्ष ठेवून योग्य वेळी अभ्यास-पद्धती सुधारणे म्हणजे अधिबोधन (Metacognition).',
    },
    hi: {
      q: 'कठिन अनुच्छेद पढ़ते समय छात्रा स्वयं सोचती है, "दूसरा भाग समझ नहीं आया; इसे धीरे से दोबारा पढ़ती हूँ।" फ्लेवेल इसे क्या कहते हैं?',
      opts: [
        'परासंज्ञानात्मक निगरानी एवं स्व-नियमन (Metacognitive Monitoring)',
        'यांत्रिक अनुबंधन',
        'ध्वनि पुनरावृत्ति',
        'अहंकेंद्रित प्रतिगमन',
      ],
      exp: 'अपनी समझ व चिंतन की निगरानी करके सुधार की रणनीति चुनना परासंज्ञान (Metacognition) है।',
    },
  },
  {
    topic: 'Working Memory Chunking',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Grouping a 10-digit code into 3 segments (272-504-1988) improves immediate recall over 10 isolated digits because:',
      opts: [
        'Chunking packs items into meaningful groups fitting Working Memory limits',
        'Eyes expand optically',
        'Long-term memory shuts down',
        'Digits become musical tones',
      ],
      exp: 'Chunking respects limited working-memory slots by storing integrated meaningful units.',
    },
    mr: {
      q: 'दहा सुटे अंक लक्षात ठेवण्यापेक्षा ते तीन गटांत (२७२-५०४-१९८८) विभागून लक्षात ठेवणे सोपे का जाते?',
      opts: [
        'गटबांधणी (Chunking) मुळे मर्यादित कार्यरत स्मृतीची भारक्षमता अर्थपूर्णरीत्या वाढते म्हणून',
        'डोळे मोठे होतात म्हणून',
        'दीर्घकालीन स्मृती नष्ट होते म्हणून',
        'अंक स्वरांत बदलतात म्हणून',
      ],
      exp: 'अर्थपूर्ण गट केल्यास मर्यादित कार्यरत स्मृतीत जास्त माहिती सहज साठवली जाते.',
    },
    hi: {
      q: 'दस अलग अंकों की बजाय उन्हें ३ समूहों (२७२-५०४-१९८८) में बाँटकर याद रखना क्यों आसान होता है?',
      opts: [
        'समूहन (Chunking) सीमित कार्यकारी स्मृति की क्षमता का सार्थक उपयोग बढ़ा देता है',
        'आँखों की रोशनी बढ़ जाती है',
        'दीर्घकालिक स्मृति मिट जाती है',
        'अंक संगीत में बदल जाते हैं',
      ],
      exp: 'अर्थपूर्ण टुकड़ों में बाँटने से कार्यकारी स्मृति पर बोझ घटता है।',
    },
  },
  {
    topic: 'Sweller Cognitive Load – Spatial Contiguity',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Cognitive Load Theory advises placing labels right beside diagram parts rather than in distant footnotes because:',
      opts: [
        'integrating text and image avoids wasteful split-attention ("Extraneous Load")',
        'it hides spelling from learners',
        'it fills margins',
        'distant notes sharpen eyesight',
      ],
      exp: 'Eliminating visual hunting frees working memory for conceptual schema building.',
    },
    mr: {
      q: 'बोधनात्मक भार सिद्धांतानुसार, आकृतीवरील नावे खाली तळटीपेत देण्याऐवजी थेट भागाजवळच का लिहावीत?',
      opts: [
        'लक्ष विखुरण्याचा अनावश्यक ताण टळून संपूर्ण लक्ष संकल्पना समजण्यावर राहते म्हणून',
        'मुलांना नावे लपवता येतात म्हणून',
        'कागदाची जागा भरण्यासाठी',
        'दृष्टीची चाचणी घेण्यासाठी',
      ],
      exp: 'आकृती आणि स्पष्टीकरण एकत्रित दिल्यास बोधनात्मक प्रक्रिया सुलभ होते.',
    },
    hi: {
      q: 'संज्ञानात्मक भार सिद्धांत के अनुसार चित्र के नाम फुटनोट के बजाय सीधे संबंधित हिस्से के पास क्यों लिखने चाहिए?',
      opts: [
        'ध्यान बँटने से उत्पन्न व्यर्थ अतिरिक्त संज्ञानात्मक भार (Extraneous Load) कम हो जाता है',
        'इससे वर्तनी छिप जाती है',
        'कागज भरने हेतु',
        'आँखों की जाँच हेतु',
      ],
      exp: 'चित्र और लेबल पास होने से कार्यकारी स्मृति मूल अवधारणा समझने में लगती है।',
    },
  },
  {
    topic: 'Paivio Dual Coding Theory',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Teaching the water cycle using vivid labelled arrows alongside verbal storytelling boosts memory via Paivio’s Dual Coding because it activates:',
      opts: [
        'both verbal and visual-imagery memory channels together',
        'sleep reflex circuits',
        'punitive conditioning',
        'algebraic substitution',
      ],
      exp: 'Dual visual and verbal traces create two mutually supportive retrieval cues.',
    },
    mr: {
      q: 'पायव्हिओ यांच्या द्वि-संकेतन सिद्धांतानुसार, जलचक्र शब्दांसह स्पष्ट चित्रातून शिकवल्यास दीर्घकाळ स्मरणात का राहते?',
      opts: [
        'शाब्दिक आणि दृश्य अशा दोन्ही स्मृती-मार्गांवर माहिती एकाच वेळी साठवली जाते म्हणून',
        'केवळ रात्रीच्या झोपेमुळे',
        'शिक्षेच्या भीतीमुळे',
        'बीजगणित समीकरणांमुळे',
      ],
      exp: 'शब्द आणि चित्र यांची जोड दिल्यास आठवण्याच्या दोन पूरक वाटा तयार होतात.',
    },
    hi: {
      q: 'पैवियो के द्वैत कूटन सिद्धांत के अनुसार जल-चक्र को शब्दों के साथ नामांकित चित्र से पढ़ाने पर स्मृति क्यों बढ़ती है?',
      opts: [
        'यह एक साथ शाब्दिक और दृश्य दोनों संज्ञानात्मक मार्गों को सक्रिय करता है',
        'केवल नींद के कारण',
        'दंड के भय से',
        'बीजगणित सूत्रों से',
      ],
      exp: 'भाषिक और चित्रात्मक दोनों रूपों में सीखने से पुनःस्मरण सटीक व स्थायी होता है।',
    },
  },
  {
    topic: 'Retrieval Practice (Testing Effect)',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Closing the book to recall 3 main points from memory beats passively rereading four times. Cognitive science terms this the:',
      opts: [
        'Retrieval Practice / Testing Effect',
        'Zeigarnik Blocking Bias',
        'Illusion of Competence',
        'Passive Priming Trap',
      ],
      exp: 'Effortful retrieval actively strengthens long-term memory pathways.',
    },
    mr: {
      q: 'पुस्तक चार वेळा वाचण्यापेक्षा पुस्तक बंद करून तीन मुख्य मुद्दे स्मरणातून लिहून काढणे प्रभावी ठरते. मानसशास्त्रात याला काय म्हणतात?',
      opts: [
        'पुनःस्मरण सराव प्रभाव (Retrieval Practice / Testing Effect)',
        'सक्षमता भ्रम',
        'अवरोध पूर्वग्रह',
        'निष्क्रिय सवय',
      ],
      exp: 'सक्रियपणे माहिती आठवण्याचा प्रयत्न केल्याने स्मृती मार्ग अधिक बळकट होतात.',
    },
    hi: {
      q: 'पाठ को चार बार पढ़ने की बजाय किताब बंद करके तीन मुख्य बिंदु स्मृति से लिखना अधिक प्रभावी होता है। इसे क्या कहते हैं?',
      opts: [
        'पुनःप्राप्ति अभ्यास / परीक्षण प्रभाव (Retrieval Practice)',
        'सक्षमता का भ्रम',
        'अवरोध पूर्वाग्रह',
        'निष्क्रिय आदत',
      ],
      exp: 'सक्रिय रूप से याद करने का प्रयास मस्तिष्क में स्मृति-संबंधों को गहरा करता है।',
    },
  },
  {
    topic: 'Spacing Effect (Distributed Practice)',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Studying 15 minutes across four separate evenings outperforms one 60-minute marathon cram night due to the:',
      opts: [
        'Spacing Effect (Distributed Practice)',
        'Halo Effect',
        'Hawthorne Effect',
        'Pygmalion Trap',
      ],
      exp: 'Spaced intervals exploit sleep consolidation and stronger durable encoding.',
    },
    mr: {
      q: 'सलग ६० मिनिटे घोकंपट्टी करण्यापेक्षा चार दिवस रोज १५ मिनिटे सराव करणे अधिक टिकाऊ ठरते. हा कोणता नियम आहे?',
      opts: [
        'अंतरित सराव प्रभाव (Spacing / Distributed Practice Effect)',
        'प्रभावळ दोष',
        'हॉथॉर्न परिणाम',
        'पिग्मॅलियन सापळा',
      ],
      exp: 'विभागून सराव केल्यास स्मृती स्थिरीकरण घडून दीर्घकाळ टिकते.',
    },
    hi: {
      q: 'लगातार ६० मिनट रटने की अपेक्षा चार दिनों तक रोज़ १५ मिनट अभ्यास करना अधिक स्थायी होता है। यह किसका उदाहरण है?',
      opts: [
        'वितरित अभ्यास / अंतराल प्रभाव (Spacing Effect)',
        'प्रभामंडल प्रभाव',
        'हॉथॉर्न प्रभाव',
        'पिग्मेलियन जाल',
      ],
      exp: 'समय-अंतराल के साथ अभ्यास दीर्घकालिक स्मृति सुदृढ़ीकरण को बढ़ावा देता है।',
    },
  },
];
