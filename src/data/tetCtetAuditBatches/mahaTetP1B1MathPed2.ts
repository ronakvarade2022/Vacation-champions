import { CuratedTrilingualMcq } from './types';

// MAHA TET Paper 1 (Classes 1-5) — Mathematics Pedagogy Part 2 (33 Distinct Items)
export const MAHA_TET_P1_B1_MATH_P2: CuratedTrilingualMcq[] = [
  {
    topic: 'Word Problem Key-Word Trap Danger',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Teaching students a mechanical shortcut like "whenever you see the word MORE, always ADD" is risky because:',
      opts: [
        'In problems like "Sita has 12 beads, which is 5 MORE than Raju. How many does Raju have?", mechanical keyword matching triggers the wrong operation (subtraction is required)',
        'The word "more" never appears in Class 4 exams',
        'Addition takes longer than subtraction',
        'Students forget how to spell addition',
      ],
      exp: 'Keyword tricks bypass comprehension. Understanding quantitative relationships in context prevents reversal errors.',
    },
    mr: {
      q: '"शाब्दिक उदाहरणात ‘जास्त’ हा शब्द आला की नेहमी बेरीजच करावी" असा यांत्रिक क्लुप्ती-नियम शिकवणे धोक्याचे का ठरते?',
      opts: [
        '"सीताकडे १२ मणी आहेत जे राजूपेक्षा ५ जास्त आहेत, तर राजूकडे किती?" अशा प्रश्नांत अर्थ न समजल्यास मुले वजाबाकीऐवजी चुकीची बेरीज करतात',
        'परीक्षेत "जास्त" हा शब्द कधीच येत नाही',
        'बेरीज करायला जास्त वेळ लागतो',
        'मुले शब्दांचे स्पेलिंग विसरतात',
      ],
      exp: 'की-वर्ड यांत्रिकपणा आकलन थांबवतो; उदाहरणातील प्रत्यक्ष संबंध समजून कृती निवडणे आवश्यक असते.',
    },
    hi: {
      q: '"इबारती प्रश्न में ‘अधिक’ शब्द दिखे तो सदैव जोड़ करें" जैसी यांत्रिक ट्रिक सिखाना हानिकारक क्यों है?',
      opts: [
        '"सीता के पास १२ मोती हैं जो राजू से ५ अधिक हैं, राजू के पास कितने हैं?" जैसे प्रश्नों में बच्चे बिना समझे घटाव की जगह गलत जोड़ कर बैठते हैं',
        'परीक्षा में "अधिक" शब्द नहीं आता',
        'जोड़ में समय अधिक लगता है',
        'बच्चे वर्तनी भूल जाते हैं',
      ],
      exp: 'मुख्य-शब्द रटने की बजाय संदर्भ की मात्रात्मक संबंध-समझ से संक्रिया का चयन सिखाना चाहिए।',
    },
  },
  {
    topic: 'Van Hiele Level 1 Analysis Indicators',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Which student statement demonstrates Van Hiele Level 1 (Analysis) rather than Level 0 (Visualization)?',
      opts: [
        '"A rectangle always has 4 right-angled corners and its opposite sides are equal in length"',
        '"This shape looks like the door of our classroom"',
        '"A kite is completely different from a quadrilateral"',
        '"By proving alternate interior angles equal, every parallelogram’s opposite angles must match"',
      ],
      exp: 'At Level 1 (Analysis), learners analyze figures through component parts and invariant geometric properties.',
    },
    mr: {
      q: 'खालीलपैकी कोणते विद्यार्थ्याचे विधान व्हॅन हिले यांच्या स्तर १ – विश्लेषण (Analysis) अवस्थेचे द्योतक आहे?',
      opts: [
        '"आयताचे चारही कोन काटकोन असतात आणि त्याच्या समोरासमोरील बाजू समान लांबीच्या असतात"',
        '"हा आकार आमच्या वर्गाच्या दरवाजासारखा दिसतो"',
        '"पतंग हा चौकोन प्रकारात मोडत नाही"',
        '"व्युत्क्रम कोन सिद्धांतावरून समांतरभुज चौकोनाचे संमुख कोन समान सिद्ध होतात"',
      ],
      exp: 'स्तर १ मध्ये विद्यार्थी आकृतीच्या बाजू, कोन यांतील ठराविक गुणधर्मांचे विश्लेषण करून तिला ओळखतो.',
    },
    hi: {
      q: 'निम्न में से कौन-सा कथन वैन हीले के स्तर १ (विश्लेषण / Analysis) को दर्शाता है?',
      opts: [
        '"आयत के चारों कोण समकोण होते हैं और उसकी सम्मुख भुजाएँ लंबाई में बराबर होती हैं"',
        '"यह आकृति हमारी कक्षा के दरवाजे जैसी दिखती है"',
        '"पतंग चतुर्भुज नहीं हो सकती"',
        '"एकांतर कोण प्रमेय से समांतर चतुर्भुज के सम्मुख कोण सिद्ध होते हैं"',
      ],
      exp: 'स्तर १ (विश्लेषण) पर छात्र आकृति के अंगों तथा उसके निश्चित गुणधर्मों की पहचान करने लगता है।',
    },
  },
  {
    topic: 'Piaget Conservation of Number Experiment',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Two rows each hold 6 coins. When the teacher spreads Row B farther apart so it looks longer, a 5-year-old says Row B now has MORE coins. According to Piaget, the child lacks:',
      opts: [
        'Conservation of Number',
        'Object Permanence',
        'Symbolic Alphabet Decoding',
        'Deductive Syllogism',
      ],
      exp: 'Piaget’s Preoperational child relies on visual length ("stretched = more") until Conservation of Number develops.',
    },
    mr: {
      q: 'दोन ओळींत प्रत्येकी ६ नाणी ठेवली आहेत. दुसऱ्या ओळीतील नाणी पसरून लांब ठेवल्यावर ५ वर्षांचे मूल म्हणते की दुसऱ्या ओळीत जास्त नाणी आहेत. पियाजेनुसार या मुलात कशाचा अभाव आहे?',
      opts: [
        'संख्या संधारण (Conservation of Number)',
        'वस्तू-स्थायित्व (Object Permanence)',
        'अक्षर ओळख',
        'निगमनात्मक तर्क',
      ],
      exp: 'दिसणाऱ्या लांबीवरून संख्या जास्त मानणे हे संख्या-संधारण (Conservation) विकसित न झाल्याचे लक्षण आहे.',
    },
    hi: {
      q: 'दो पंक्तियों में ६-६ सिक्के रखे हैं। दूसरी पंक्ति को फैलाकर लंबा कर देने पर ५ वर्षीय बच्चा कहता है कि दूसरी पंक्ति में अधिक सिक्के हैं। पियाजे के अनुसार बच्चे में किसका अभाव है?',
      opts: [
        'संख्या संरक्षण (Conservation of Number)',
        'वस्तु स्थायित्व',
        'अक्षर पहचान',
        'निगमनात्मक तर्क',
      ],
      exp: 'स्थान बदलने पर भी मात्रा अपरिवर्तित रहती है—यह समझ "संख्या संरक्षण" कहलाती है।',
    },
  },
  {
    topic: 'Concept of Perimeter vs Area Confusion',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Many Class 5 students mistakenly believe "If two rectangles have the same perimeter, they MUST have the same area." How can a teacher disprove this misconception experientially?',
      opts: [
        'Give each group a 20-cm string loop on square-grid paper to shape a 9×1 rectangle (area 9) and a 6×4 rectangle (area 24) and compare enclosed squares',
        'Make them memorize both formulas separately for 5 days',
        'Test only squares where perimeter uniquely fixes area',
        'Deduct marks until they avoid area problems',
      ],
      exp: 'Forming different rectangles from the SAME fixed string loop makes constant perimeter vs changing interior area vividly clear.',
    },
    mr: {
      q: '"दोन आयतांची परिमिती समान असल्यास त्यांचे क्षेत्रफळही समानच असते" हा इयत्ता ५ वीतील गैरसमज प्रत्यक्ष अनुभवातून कसा दूर करावा?',
      opts: [
        'आलेख कागदावर २० सेमी लांबीच्या दोऱ्याच्या वळ्यापासून ९×१ (क्षेत्रफळ ९) व ६×४ (क्षेत्रफळ २४) असे आयत बनवून आतील चौरस मोजायला लावणे',
        'पाच दिवस दोन्ही सूत्रे फक्त तोंडपाठ करून घेणे',
        'फक्त चौरसांचीच उदाहरणे घेणे',
        'चुकीबद्दल गुण कमी करणे',
      ],
      exp: 'एकाच बंद दोऱ्यापासून वेगवेगळे आयत केल्यास परिमिती समान राहूनही आतील क्षेत्रफळ बदलते हे प्रत्यक्ष दिसते.',
    },
    hi: {
      q: '"समान परिमाप वाले दो आयतों का क्षेत्रफल भी सदैव समान होता है"—कक्षा ५ की इस भ्रांति को अनुभव द्वारा कैसे दूर करें?',
      opts: [
        'वर्ग-ग्रिड पर २० सेमी धागे के छल्ले से ९×१ (क्षेत्रफल ९) व ६×४ (क्षेत्रफल २४) आयत बनवाकर भीतर के वर्ग गिनवाना',
        '५ दिन तक सूत्र रटवाना',
        'केवल वर्गों के प्रश्न हल कराना',
        'गलती पर अंक काटना',
      ],
      exp: 'समान लंबाई के धागे से विभिन्न आयत बनाने पर परिमाप स्थिर रहते हुए क्षेत्रफल बदलने का प्रत्यक्ष प्रमाण मिलता है।',
    },
  },
  {
    topic: 'Role of Mathematical Games and Puzzles',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why should Magic Squares, Sudoku-style grids, and number riddles be integrated into primary mathematics classrooms?',
      opts: [
        'They motivate joyful pattern-seeking, logical deduction, and non-routine problem solving without exam stress',
        'They pass extra time when syllabus finishes early',
        'They teach students how to gamble with dice',
        'They eliminate the need to learn basic facts',
      ],
      exp: 'Puzzles cultivate mathematical curiosity, persistence, and flexible arithmetic reasoning.',
    },
    mr: {
      q: 'प्राथमिक गणितात जादूचे चौरस (Magic Squares), संख्या कोडी व गणितीय खेळ यांचा समावेश का केला जातो?',
      opts: [
        'परीक्षेच्या ताणाशिवाय आनंददायी वातावरणात आकृतिबंध शोधणे, तर्क करणे व अ-पारंपरिक समस्या-निराकरण विकसित होते',
        'अभ्यासक्रम लवकर संपल्यास वेळ घालवण्यासाठी',
        'फाशांचे जुगाराचे खेळ शिकवण्यासाठी',
        'पाढे शिकण्याची गरज संपते म्हणून',
      ],
      exp: 'कोडी व खेळांमुळे विद्यार्थ्यांत गणिताविषयी आवड, चिकाटी आणि लवचिक विचारक्षमता वाढते.',
    },
    hi: {
      q: 'प्राथमिक गणित में जादुई वर्ग (Magic Squares), पहेलियाँ और गणितीय खेल क्यों शामिल किए जाने चाहिए?',
      opts: [
        'ये बिना परीक्षा-तनाव के आनंदपूर्वक पैटर्न खोज, तर्कशक्ति तथा समस्या-समाधान को प्रोत्साहित करते हैं',
        'सिलेबस जल्दी पूरा होने पर समय बिताने हेतु',
        'पासे से जुआ सिखाने हेतु',
        'मूल संक्रियाएँ सीखने की आवश्यकता समाप्त करने हेतु',
      ],
      exp: 'पहेलियाँ और खेल गणितीय जिज्ञासा, धैर्य और सृजनात्मक तर्क का विकास करते हैं।',
    },
  },
  {
    topic: 'Peer Collaborative Math Talk',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Encouraging students in pairs to explain *why* they chose a strategy ("Math Talk") primarily develops:',
      opts: [
        'Mathematical communication, metacognitive reflection, and precision of reasoning',
        'Loud classroom chatter unrelated to arithmetic',
        'Blind copying of partner’s final number',
        'Speed of erasing slate mistakes',
      ],
      exp: 'Articulating justifications to peers exposes hidden assumptions and strengthens conceptual clarity.',
    },
    mr: {
      q: 'विद्यार्थ्यांना जोड्यांमध्ये "आपण हीच रीत का निवडली?" हे एकमेकांना समजावून सांगण्यास ("Math Talk") प्रोत्साहन दिल्याने प्रामुख्याने काय साध्य होते?',
      opts: [
        'गणितीय संभाषण कौशल्य, स्वतःच्या विचारांचे परीक्षण (Metacognition) व तार्किक स्पष्टता',
        'वर्गात विनाकारण गोंगाट वाढतो',
        'मित्राचे उत्तर न समजता उतरवून घेणे',
        'पाटी पुसण्याचा वेग वाढतो',
      ],
      exp: 'इतरांना कारणमीमांसा सांगताना स्वतःची वैचारिक मांडणी अधिक स्पष्ट व अचूक होते.',
    },
    hi: {
      q: 'विद्यार्थियों को जोड़ियों में यह समझाने के लिए कहना कि "उन्होंने यही विधि क्यों चुनी" (Math Talk), मुख्यतः क्या विकसित करता है?',
      opts: [
        'गणितीय संप्रेषण, अधिसंज्ञान (Metacognition) तथा तर्क की स्पष्टता',
        'कक्षा में अनावश्यक शोर',
        'साथी का उत्तर बिना समझे नकल करना',
        'स्लेट मिटाने की गति',
      ],
      exp: 'सहपाठी को तर्क समझाने से अपनी अवधारणात्मक कमियाँ उजागर होती हैं और समझ गहरी होती है।',
    },
  },
  {
    topic: 'Fractions Beyond "Pizza Slice" Part-Whole Model',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'If a teacher ONLY shows shaded circle slices for fractions, what difficulty do Class 4 pupils often encounter later?',
      opts: [
        'Difficulty viewing a fraction as a number on a Number Line or as a part of a discrete collection (e.g., 1/4 of 12 marbles)',
        'Inability to draw circles with a coin',
        'Confusion between triangles and pentagons',
        'Forgetting how to multiply by 10',
      ],
      exp: 'Over-reliance on circular pizza regions limits understanding of fractions as points on a number line, ratios, and parts of sets.',
    },
    mr: {
      q: 'शिक्षकांनी अपूर्णांक शिकवताना केवळ गोलाकार भाकरी/पिझ्झाचे रंगवलेले भागच दाखवले, तर इयत्ता ४ थीच्या विद्यार्थ्यांना पुढे कोणती अडचण येऊ शकते?',
      opts: [
        'संख्यारेषेवर अपूर्णांक दाखवणे किंवा समूहाचा भाग (उदा. १२ गोट्यांपैकी १/४ गोट्या) समजण्यात अडचण येते',
        'नाण्याने वर्तुळ काढता येत नाही',
        'त्रिकोण व पंचकोनात गोंधळ होतो',
        '१० चा गुणाकार विसरतात',
      ],
      exp: 'अपूर्णांक म्हणजे केवळ गोलाचा तुकडा नसून समूहाचा भाग, गुणोत्तर व संख्यारेषेवरील स्थान आहे हे विविध मॉडेल्समधून दाखवावे.',
    },
    hi: {
      q: 'यदि शिक्षक भिन्न सिखाने के लिए केवल गोल पिज़्ज़ा/रोटी के छायांकित टुकड़े ही दिखाता है, तो छात्रों को बाद में क्या कठिनाई होती है?',
      opts: [
        'संख्या रेखा पर भिन्न को संख्या के रूप में देखने तथा समूह का भाग (जैसे १२ कंचों का १/४) समझने में कठिनाई',
        'सिक्के से वृत्त न बना पाना',
        'त्रिभुज व पंचभुज में भ्रम',
        '१० से गुणा भूल जाना',
      ],
      exp: 'विभिन्न प्रतिमानों (समूह, पट्टी, संख्या रेखा) से भिन्न पढ़ाना बहु-आयामी समझ के लिए अनिवार्य है।',
    },
  },
  {
    topic: 'Formative Assessment Checkpoints Inside Lesson',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'During a Class 4 multiplication lesson, a teacher observes students solving 24 × 13 at their desks to spot carry errors immediately before assigning homework. This is:',
      opts: [
        'Assessment FOR Learning (Formative Assessment)',
        'Assessment OF Learning (Summative Final Grading)',
        'Standardized National Board Selection',
        'Annual Promotion Certification',
      ],
      exp: 'Ongoing feedback during instruction to adjust teaching and correct misconceptions on the spot is Formative Assessment.',
    },
    mr: {
      q: 'इयत्ता ४ थीच्या गुणाकाराच्या तासादरम्यान शिक्षक बाकांजवळ फिरून २४ × १३ सोडवताना विद्यार्थ्यांच्या चुका तात्काळ पाहतात व मार्गदर्शन करतात. हे कोणते मूल्यमापन आहे?',
      opts: [
        'अध्ययनासाठी मूल्यमापन (Assessment FOR Learning / आकारिक)',
        'अध्ययनाचे मूल्यमापन (Summative / अंतिम श्रेणी)',
        'राष्ट्रीय निवड चाचणी',
        'वार्षिक श्रेणी प्रमाणपत्र',
      ],
      exp: 'अध्यापन सुरू असतानाच सुधारणेसाठी घेतलेला तात्काळ आढावा म्हणजे आकारिक मूल्यमापन (Assessment FOR Learning) होय.',
    },
    hi: {
      q: 'गुणा के शिक्षण के दौरान शिक्षक कक्षा में घूमकर छात्रों की तत्काल त्रुटियाँ सुधारता है। यह मूल्यांकन का कौन-सा रूप है?',
      opts: [
        'अधिगम के लिए आकलन (Assessment FOR Learning / रचनात्मक)',
        'अधिगम का आकलन (योगात्मक)',
        'राष्ट्रीय चयन परीक्षा',
        'वार्षिक पदोन्नति प्रमाणन',
      ],
      exp: 'शिक्षण के दौरान ही सुधार हेतु किया गया आकलन "अधिगम के लिए आकलन" कहलाता है।',
    },
  },
  {
    topic: 'Ramanujan Number 1729 Historical Engagement',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Sharing brief stories of Indian mathematicians like Aryabhata, Bhaskaracharya II (Lilavati), and Srinivasa Ramanujan in primary math lessons helps to:',
      opts: [
        'Humanize mathematics, spark cultural pride, and inspire curiosity in number patterns',
        'Add extra biographical dates for rote memorization tests',
        'Replace solving arithmetic exercises in textbooks',
        'Teach ancient Sanskrit grammar rules instead of math',
      ],
      exp: 'Historical anecdotes show mathematics as a living human endeavor across cultures, boosting motivation.',
    },
    mr: {
      q: 'प्राथमिक गणितात आर्यभट्ट, भास्कराचार्य (लीलावती) आणि श्रीनिवास रामानुजन यांच्या छोट्या गोष्टी सांगण्यामागील मुख्य शैक्षणिक फायदा कोणता?',
      opts: [
        'गणित हे मानवी सर्जनशीलतेचे जिवंत शास्त्र असल्याची जाणीव होऊन संख्या-आकृतिबंधांविषयी कुतूहल व अभिमान वाढतो',
        'परीक्षेत जन्म-मृत्यू तारखा पाठ करून घेता येतात',
        'पाठ्यपुस्तकातील गणिते सोडवण्याची गरज उरत नाही',
        'गणिताऐवजी संस्कृत व्याकरण शिकवले जाते',
      ],
      exp: 'गणितज्ञांच्या रोचक कथांमुळे विषय अधिक रंजक, मानवी व प्रेरणादायी बनतो.',
    },
    hi: {
      q: 'प्राथमिक गणित में आर्यभट्ट, भास्कराचार्य (लीलावती) तथा रामानुजन से जुड़े रोचक प्रसंग साझा करने का मुख्य लाभ क्या है?',
      opts: [
        'गणित को मानवीय और सजीव रूप में प्रस्तुत कर संख्या-पैटर्न के प्रति जिज्ञासा व सांस्कृतिक गौरव जगाना',
        'रटने के लिए जन्म-तिथियाँ जोड़ना',
        'अभ्यास प्रश्न हल करने से बचना',
        'गणित की जगह संस्कृत व्याकरण पढ़ाना',
      ],
      exp: 'ऐतिहासिक प्रसंग गणित को एक जीवंत मानवीय खोज के रूप में प्रस्तुत कर विद्यार्थियों को प्रेरित करते हैं।',
    },
  },
  {
    topic: 'Alternative Student Algorithms Validation',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'To compute 63 − 28 mentally, a Class 3 student says: "63 − 30 = 33, then add back 2 = 35." How should the teacher respond?',
      opts: [
        'Praise the valid compensation strategy and ask the student to share *why* adding back 2 works with the whole class',
        'Cross it out and demand vertical borrowing only',
        'Tell the student never to change 28 into 30',
        'Ignore the answer because no rough column work was written',
      ],
      exp: 'Invented mental compensation strategies reflect deep number flexibility and should be celebrated alongside standard algorithms.',
    },
    mr: {
      q: '६३ − २८ ही वजाबाकी तोंडी करताना विद्यार्थी म्हणतो, "६३ मधून ३० वजा केले तर ३३ आणि परत २ मिळवले तर ३५." शिक्षकाची प्रतिक्रिया कशी असावी?',
      opts: [
        'या तार्किक पद्धतीचे कौतुक करून परत २ का मिळवले हे संपूर्ण वर्गाला समजावून सांगण्यास प्रोत्साहन द्यावे',
        'ती रीत खोडून फक्त उभ्या मांडणीचा हच्चाच वापरायला लावावा',
        '२८ चे ३० करणे चुकीचे असल्याचे सांगावे',
        'पायऱ्या न लिहिल्यामुळे उत्तर ग्राह्य धरू नये',
      ],
      exp: 'स्वतः शोधलेल्या तोंडी पद्धती (Invented Strategies) मजबूत संख्याज्ञानाचे द्योतक आहेत; त्यांचा वर्गात सन्मान करावा.',
    },
    hi: {
      q: '६३ − २८ मन में हल करते हुए छात्र कहता है: "६३ − ३० = ३३, फिर २ वापस जोड़े = ३५।" शिक्षक को क्या करना चाहिए?',
      opts: [
        'इस वैध क्षतिपूर्ति रणनीति की सराहना करें और कक्षा के साथ साझा कराएँ कि २ वापस क्यों जोड़ा गया',
        'काटकर केवल ऊर्ध्वाधर उधार विधि से लिखने को कहें',
        '२८ को ३० मानना गलत बताएँ',
        'रफ कार्य न लिखने पर उत्तर अमान्य करें',
      ],
      exp: 'स्व-निर्मित मानसिक रणनीतियाँ गहरी संख्या-लचीलेपन को दर्शाती हैं और इन्हें प्रोत्साहित किया जाना चाहिए।',
    },
  },
  {
    topic: 'Concrete Fraction Strips Equivalent Recognition',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why do teachers align a "1/2 strip" directly underneath "two 1/4 strips" of the same total length?',
      opts: [
        'To let students visually verify that 1/2 = 2/4 occupy identical length (Equivalent Fractions)',
        'To prove that 2/4 is twice as big as 1/2',
        'To teach perpendicular line construction',
        'To measure blackboard widths in inches',
      ],
      exp: 'Side-by-side equal-length fraction bars demonstrate equivalence visually before symbolic cross-multiplication.',
    },
    mr: {
      q: 'समान लांबीच्या "१/२" पट्टीच्या बरोबर खाली "१/४ + १/४" अशा दोन पट्ट्या ठेवल्यास मुलांना कोणती संकल्पना प्रत्यक्ष कळते?',
      opts: [
        '१/२ आणि २/४ हे दोन्ही सारखीच जागा व्यापणारे सममूल्य अपूर्णांक (Equivalent Fractions) आहेत',
        '२/४ हा १/२ पेक्षा दुप्पट मोठा आहे',
        'लंब रेषा काढणे',
        'फळ्याची रुंदी इंचावर मोजणे',
      ],
      exp: 'समान लांबीच्या पट्ट्या एकमेकांखाली ठेवल्याने सममूल्य अपूर्णांक दृश्यरीत्या सिद्ध होतात.',
    },
    hi: {
      q: 'समान लंबाई की "१/२ पट्टी" के ठीक नीचे दो "१/४ पट्टियाँ" रखने से बच्चों को कौन-सी अवधारणा स्पष्ट होती है?',
      opts: [
        '१/२ तथा २/४ समान लंबाई घेरने वाले तुल्य भिन्न (Equivalent Fractions) हैं',
        '२/४, १/२ से दोगुना बड़ा है',
        'लंब रेखा खींचना',
        'श्यामपट्ट की चौड़ाई नापना',
      ],
      exp: 'समान पूर्ण की पट्टियों के मिलान से तुल्य भिन्न की संकल्पना मूर्त रूप से स्पष्ट होती है।',
    },
  },
  {
    topic: 'Meaningful Homework Design Principle',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Which primary mathematics homework assignment best follows NCF-2005 recommendations?',
      opts: [
        'Measuring capacities of 4 household vessels (cup, mug, bottle, bucket) using a 200 mL measuring cup and recording a comparison table',
        'Writing the 19 times table 25 times in a rough notebook',
        'Solving 60 identical 5-digit vertical addition exercises',
        'Copying textbook definitions word-for-word without examples',
      ],
      exp: 'Investigative real-world homework connects home environments to measurement concepts without monotonous drudgery.',
    },
    mr: {
      q: 'प्राथमिक गणितासाठी NCF-2005 च्या मार्गदर्शक तत्त्वांनुसार सर्वात प्रभावी गृहपाठ कोणता?',
      opts: [
        'घरातील ४ भांड्यांची (कप, मग, बाटली, बादली) धारकता २०० मिलि मापाने मोजून तुलनात्मक तक्ता बनवणे',
        '१९ चा पाढा २५ वेळा लिहून आणणे',
        'एकाच प्रकारची ६० पाच-अंकी बेरजेची उदाहरणे सोडवणे',
        'पाठ्यपुस्तकातील व्याख्या जशाच्या तशा उतरवून आणणे',
      ],
      exp: 'घरगुती अनुभवांशी जोडलेले निरीक्षण व कृतीयुक्त गृहपाठ कंटाळवाण्या घोकंपट्टीपेक्षा खूप प्रभावी असतात.',
    },
    hi: {
      q: 'NCF-2005 के अनुसार प्राथमिक गणित का सबसे सार्थक गृहकार्य कौन-सा है?',
      opts: [
        '२०० मिली मापक से घर के ४ बर्तनों (कप, मग, बोतल, बाल्टी) की धारिता नापकर तुलना तालिका बनाना',
        '१९ का पहाड़ा २५ बार लिखकर लाना',
        'एक जैसे ६० पाँच-अंकीय जोड़ हल करना',
        'पाठ्यपुस्तक की परिभाषाएँ ज्यों की त्यों उतारना',
      ],
      exp: 'खोजपरक एवं जीवन से जुड़े गृहकार्य यांत्रिक रटंत की बजाय सार्थक सीखने को बढ़ावा देते हैं।',
    },
  },
  {
    topic: 'Skip Counting Foundation for Multiplication',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'How does practicing "skip counting by 3s and 5s" on a 100-number grid prepare Class 2 pupils for multiplication?',
      opts: [
        'It reveals equal-group jumping patterns and visual rhythm behind multiplication tables',
        'It teaches negative integer subtraction',
        'It replaces learning how to count by 1s',
        'It helps memorize geometric angle names',
      ],
      exp: 'Skip counting makes repeated equal additions concrete and highlights regular column patterns on the 100-chart.',
    },
    mr: {
      q: '१ ते १०० च्या अंकी तक्त्यावर "३ च्या किंवा ५ च्या उड्यांनी मोजणे" (Skip Counting) इयत्ता २ रीच्या मुलांना गुणाकारासाठी कशी तयारी करून देते?',
      opts: [
        'समान गटांची वारंवार बेरीज व पाढ्यांमधील नियमित आकृतिबंध प्रत्यक्ष दिसू लागतात',
        'ऋण संख्यांची वजाबाकी शिकते',
        '१ ने मोजण्याची पद्धत बंद होते',
        'कोनांची नावे पाठ होतात',
      ],
      exp: 'टप्प्याटप्प्याने उड्या मोजल्याने गुणाकार म्हणजे समान गटांची पुनरावृत्त बेरीज हे स्पष्ट होते.',
    },
    hi: {
      q: '१ से १०० के चार्ट पर "३-३ या ५-५ छोड़कर गिनना" (Skip Counting) कक्षा २ के बच्चों को गुणा के लिए कैसे तैयार करता है?',
      opts: [
        'यह समान समूहों की पुनरावृत्त छलाँगों तथा पहाड़ों के नियमित पैटर्न को दर्शाता है',
        'ऋणात्मक पूर्णांक सिखाता है',
        '१-१ से गिनती समाप्त कर देता है',
        'कोणों के नाम याद कराता है',
      ],
      exp: 'छलाँग-गिनती पहाड़ों के पीछे छिपे समान समूहों के आवर्ती योग को मूर्त बनाती है।',
    },
  },
  {
    topic: 'Math Lab Purpose in Primary School',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'What is the core objective of setting up a dedicated Mathematics Corner / Math Lab in a primary school?',
      opts: [
        'Providing accessible hands-on models, puzzles, balances, and measuring tools so students learn math by doing and verifying',
        'Locking expensive glass displays away for inspection days only',
        'Conducting silent written weekly tests inside a separate room',
        'Replacing classroom blackboards entirely',
      ],
      exp: 'A Math Lab enables discovery-based ("learning by doing") exploration with concrete apparatus.',
    },
    mr: {
      q: 'प्राथमिक शाळेत "गणित कोपरा / गणित प्रयोगशाळा" (Math Lab) स्थापन करण्याचे मुख्य उद्दिष्ट कोणते?',
      opts: [
        'विद्यार्थ्यांना प्रत्यक्ष साधने, कोडी, तराजू, मापके हाताळून "कृतीतून व पडताळणीतून गणित" शिकण्याची संधी देणे',
        'फक्त तपासणीच्या दिवशी दाखवण्यासाठी कपाटात प्रतिकृती कुलूपबंद ठेवणे',
        'वेगळ्या खोलीत शांत लेखी परीक्षा घेणे',
        'वर्गातील फळा पूर्णपणे काढून टाकणे',
      ],
      exp: 'गणित कोपरा/प्रयोगशाळा म्हणजे मूर्त साहित्याद्वारे शोधक व कृतियुक्त अध्ययनाचे केंद्र होय.',
    },
    hi: {
      q: 'प्राथमिक विद्यालय में "गणित प्रयोगशाला / गणित कोना" (Math Lab) स्थापित करने का मुख्य उद्देश्य क्या है?',
      opts: [
        'छात्रों को मॉडल, पहेलियाँ, तराजू और मापन उपकरण उपलब्ध कराकर "करके सीखने" व सत्यापन का अवसर देना',
        'निरीक्षण दिवस हेतु सामग्री अलमारी में बंद रखना',
        'अलग कक्ष में केवल लिखित परीक्षा लेना',
        'कक्षा के श्यामपट्ट को हटाना',
      ],
      exp: 'गणित प्रयोगशाला मूर्त सामग्रियों के माध्यम से अन्वेषण व सक्रिय अधिगम को संभव बनाती है।',
    },
  },
  {
    topic: 'Remedial Teaching Cycle Principles',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'After diagnosing a group of 6 Class 4 students struggling with 2-digit division, what distinguishes effective REMEDIAL teaching from simple repetition?',
      opts: [
        'Using simpler concrete sharing activities, adjusting pace, breaking steps visibly, and addressing the specific root gap rather than repeating identical lecture explanations',
        'Speaking louder while solving the exact same textbook example faster',
        'Assigning twice as many homework sheets without teacher support',
        'Requiring students to stand until they memorize division steps',
      ],
      exp: 'Remedial teaching alters the *mode*, *scaffolding*, and *entry level* to match the learner’s diagnosed gap.',
    },
    mr: {
      q: '२-अंकी भागाकारात अडखळणाऱ्या ६ विद्यार्थ्यांसाठी घेतलेले "उपचारात्मक अध्यापन" (Remedial Teaching) हे केवळ पुनरावृत्तीपेक्षा वेगळे कसे असते?',
      opts: [
        'नेमका अडथळा ओळखून सोप्या मूर्त साहित्यासह गती जुळवून, टप्पे फोडून आणि नवीन दृष्टिकोनातून शिकवणे (केवळ तेच व्याख्यान पुन्हा न देणे)',
        'तेच पुस्तक उदाहरण मोठ्या आवाजात वेगाने पुन्हा सांगणे',
        'मदतीशिवाय दुप्पट गृहपाठ देणे',
        'पायऱ्या पाठ होईपर्यंत उभे ठेवणे',
      ],
      exp: 'उपचारात्मक अध्यापनात विद्यार्थ्यांच्या अडचणीनुसार पद्धती व आधार बदलला जातो, केवळ यांत्रिक पुनरावृत्ती केली जात नाही.',
    },
    hi: {
      q: '२-अंकीय भाग में कठिनाई झेल रहे ६ छात्रों हेतु प्रभावी "उपचारात्मक शिक्षण" साधारण दोहराव से किस प्रकार भिन्न होता है?',
      opts: [
        'विशिष्ट कमी के अनुरूप सरल मूर्त गतिविधि, धीमी गति व चरणबद्ध सहारे के साथ नए तरीके से सिखाना (न कि वही व्याख्यान दोहराना)',
        'वही प्रश्न जोर से और तेजी से दोबारा बोलना',
        'बिना सहायता के दोगुना गृहकार्य देना',
        'दंडस्वरूप खड़े रखना',
      ],
      exp: 'उपचारात्मक शिक्षण में निदान के अनुसार शिक्षण-विधि और कठिनाई स्तर को अनुकूलित किया जाता है।',
    },
  },
  {
    topic: 'Zero in Quotient Misconception (412 ÷ 4 = 13)',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 4 pupil divides 412 ÷ 4 and writes the quotient as 13 instead of 103. How can the teacher help the child catch this error independently?',
      opts: [
        'Teach checking via estimation & inverse multiplication: "4 × 13 = 52, nowhere near 412; should quotient be over 100?"',
        'Mark a red cross without explanation',
        'Drill 400 ÷ 4 orally fifty times',
        'Tell the child never to divide numbers containing 1 in the tens place',
      ],
      exp: 'Prompting rough estimation (~400 ÷ 4 = 100) and multiplication verification empowers self-correction of dropped placeholder zeroes.',
    },
    mr: {
      q: '४१२ ÷ ४ करताना विद्यार्थी भागाकार १०३ ऐवजी १३ लिहितो. विद्यार्थ्याने स्वतःच ही चूक पकडावी म्हणून शिक्षकाने कोणती युक्ती शिकवावी?',
      opts: [
        'अंदाज व उलट गुणाकार पडताळणी: "४ × १३ तर फक्त ५२ होतात; उत्तर १०० च्या आसपास हवे ना?" असे विचारणे',
        'स्पष्टीकरण न देता लाल रेघ मारणे',
        '४०० ÷ ४ हे ५० वेळा मोठ्याने म्हणायला लावणे',
        'दशकात १ असलेल्या संख्यांचा भागाकार टाळण्यास सांगणे',
      ],
      exp: 'अंदाज व गुणाकार पडताळणीची सवय लावल्यास भागाकारातील मधले शून्य वगळण्याची चूक मुले स्वतः सुधारतात.',
    },
    hi: {
      q: '४१२ ÷ ४ हल करते समय छात्र भागफल १०३ की जगह १३ लिख देता है। छात्र स्वयं यह त्रुटि पकड़ सके, इसके लिए क्या सिखाना चाहिए?',
      opts: [
        'आकलन व गुणा-जाँच की आदत: "४ × १३ = ५२ होते हैं, ४१२ के करीब नहीं; क्या उत्तर १०० से अधिक नहीं होना चाहिए?"',
        'बिना बताए लाल निशान लगाकर काट देना',
        '४०० ÷ ४ पचास बार बोलवाना',
        'ऐसी संख्याओं का भाग छोड़ देना',
      ],
      exp: 'अनुमान (~४०० ÷ ४ = १००) और गुणन जाँच सिखाने से बीच का शून्य छूटने की त्रुटि छात्र स्वयं पकड़ लेते हैं।',
    },
  },
  {
    topic: 'Deductive Method Appropriate Stage',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'In primary vs upper schooling, where does the Deductive Method fit BEST in mathematics?',
      opts: [
        'Applying an already discovered or verified general formula to solve specific practice problems quickly',
        'Introducing pre-number sorting to Class 1 beginners',
        'Helping Class 2 children discover what symmetry means for the first time',
        'Replacing all hands-on activities in Class 1–3',
      ],
      exp: 'Induction helps *discover* rules from experience; Deduction efficiently *applies* established rules to new cases.',
    },
    mr: {
      q: 'गणित अध्यापनात "अवगामी पद्धती" (Deductive Method) चा वापर केव्हा सर्वात योग्य ठरतो?',
      opts: [
        'शोधून काढलेले व पटवून घेतलेले सामान्य सूत्र किंवा नियम वापरून विविध सराव उदाहरणे वेगाने सोडवताना',
        'इयत्ता १ लीत संख्या-पूर्व वर्गीकरण शिकवताना',
        'इयत्ता २ रीच्या मुलांना पहिल्यांदाच सममितीची ओळख करून देताना',
        'इयत्ता १ ते ३ मधील सर्व कृती बंद करताना',
      ],
      exp: 'नियम शोधण्यासाठी उद्गामी (Inductive), तर सिद्ध झालेला नियम विविध उदाहरणांवर लागू करण्यासाठी अवगामी (Deductive) पद्धत उत्तम असते.',
    },
    hi: {
      q: 'गणित शिक्षण में "निगमन विधि" (Deductive Method) का उपयोग कब सबसे उपयुक्त होता है?',
      opts: [
        'खोजे एवं सत्यापित किए जा चुके सामान्य सूत्र या नियम को विशिष्ट प्रश्नों पर शीघ्र लागू करने के लिए',
        'कक्षा १ में संख्या-पूर्व वर्गीकरण प्रारंभ करते समय',
        'कक्षा २ में पहली बार सममिति की खोज कराते समय',
        'सभी मूर्त गतिविधियाँ बंद करते समय',
      ],
      exp: 'नियम की खोज में आगमन विधि तथा स्थापित नियम के अनुप्रयोग एवं अभ्यास में निगमन विधि श्रेष्ठ रहती है।',
    },
  },
  {
    topic: 'Project Method in Elementary Math',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Organizing a "Class Mock Vegetable Market" where pupils act as shopkeepers and buyers using play money exemplifies:',
      opts: [
        'Project / Experiential Activity Method rooted in real-life social interaction',
        'Abstract Axiomatic Lecture Method',
        'Heuristic Silent Reading Method',
        'Standardized Summative Testing',
      ],
      exp: 'Role-playing a market puts weights, unit prices, billing addition, and making change into purposeful action.',
    },
    mr: {
      q: 'वर्गात "नकली भाजी बाजार" भरवून विद्यार्थ्यांकडून खेळण्यातील नोटांच्या साहाय्याने खरेदी-विक्री व सुटे पैसे मोजून घेणे हे कोणत्या पद्धतीचे उदाहरण आहे?',
      opts: [
        'प्रकल्प / अनुभवात्मक कृती पद्धत (Project / Activity Method)',
        'अमूर्त व्याख्यान पद्धत',
        'मौन वाचन पद्धत',
        'प्रमाणित वार्षिक परीक्षा पद्धत',
      ],
      exp: 'प्रत्यक्ष भूमिका व व्यवहार कृतीतून वजन, दर व हिशोब यांचा अनुभव मिळतो.',
    },
    hi: {
      q: 'कक्षा में "नकली सब्जी बाज़ार" लगाकर नकली नोटों से क्रय-विक्रय एवं लेन-देन कराना किस शिक्षण पद्धति का उदाहरण है?',
      opts: [
        'प्रोजेक्ट / अनुभवात्मक गतिविधि विधि',
        'अमूर्त व्याख्यान विधि',
        'मौन पठन विधि',
        'मानकीकृत योगात्मक परीक्षा',
      ],
      exp: 'भूमिका-निर्वाह एवं बाजार गतिविधि से मूल्य, वजन और जोड़-घटाव का जीवंत व्यावहारिक अनुभव मिलता है।',
    },
  },
  {
    topic: 'Heuristic Method Core Philosophy',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Professor H.E. Armstrong’s "Heuristic Method" in teaching mathematics places the child in the role of:',
      opts: [
        'An independent discoverer who investigates and finds patterns under guided prompts rather than a passive listener',
        'A passive recorder copying solved board answers verbatim',
        'A drill assistant memorizing rules blindly',
        'A strict grader of classmates’ errors',
      ],
      exp: '"Heurisko" means "I discover"—students actively inquire, test hypotheses, and verify patterns.',
    },
    mr: {
      q: 'प्रा. एच. ई. आर्मस्ट्राँग यांच्या "स्वयंशोधन पद्धती" (Heuristic Method) मध्ये विद्यार्थ्याची भूमिका कोणती असते?',
      opts: [
        'निष्क्रिय श्रोत्याऐवजी मार्गदर्शनाखाली स्वतः शोध घेणारा अन्वेषक (Discoverer)',
        'फळ्यावरून उत्तरे न पाहता उतरवून घेणारा लेखनिक',
        'सूत्रे पाठ करणारा विद्यार्थी',
        'इतरांच्या चुका मोजणारा तपासनीस',
      ],
      exp: 'Heuristic म्हणजे "मी स्वतः शोधतो"—विद्यार्थी स्वतः प्रयोग, पडताळणी व निष्कर्ष काढतो.',
    },
    hi: {
      q: 'प्रो. एच. ई. आर्मस्ट्रांग की "ह्यूरिस्टिक (खोज) विधि" में विद्यार्थी की भूमिका क्या होती है?',
      opts: [
        'निष्क्रिय श्रोता न रहकर एक स्वतंत्र अन्वेषक (Discoverer) जो संकेत पाकर स्वयं नियम खोजता है',
        'श्यामपट्ट से नकल उतारने वाला लिपिक',
        'केवल नियम रटने वाला',
        'दूसरों की त्रुटियाँ दंडित करने वाला',
      ],
      exp: '"ह्यूरिस्को" का अर्थ है "मैं खोजता हूँ"—जहाँ छात्र स्वयं अन्वेषण कर निष्कर्ष तक पहुँचता है।',
    },
  },
  {
    topic: 'Venn Diagram Classification Activity',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Asking Class 4 learners to place number cards inside two overlapping hula-hoops—one for "Multiples of 2" and one for "Multiples of 3"—visually builds understanding of:',
      opts: [
        'Common multiples (Multiples of 6 sitting inside the overlapping intersection)',
        'Prime factorization of decimals',
        'Angles greater than 180°',
        'Currency rounding rules',
      ],
      exp: 'Overlapping loops form a physical Venn diagram showing numbers divisible by BOTH 2 and 3 (multiples of 6).',
    },
    mr: {
      q: 'दोन एकमेकांत गुंतलेल्या रिंगणांमध्ये अनुक्रमे "२ च्या पटीतील" आणि "३ च्या पटीतील" संख्या कार्ड ठेवल्यास दोन्ही रिंगणांच्या सामाईक भागात (६, १२, १८) ठेवताना मुलांना कोणती संकल्पना समजते?',
      opts: [
        'सामाईक विभाज्य (Common Multiples – वेन आकृतीतून ६ च्या पटीतील संख्या)',
        'दशांशांचे मूळ अवयव',
        '१८०° पेक्षा मोठे कोन',
        'नाण्यांचे अंदाजन नियम',
      ],
      exp: 'परस्परछेदी रिंगणांमुळे (Venn Diagram) २ आणि ३ या दोन्ही संख्यांचे सामाईक विभाज्य दृश्य स्वरूपात स्पष्ट होतात.',
    },
    hi: {
      q: 'दो परस्पर ओवरलैपिंग छल्लों में "२ के गुणज" तथा "३ के गुणज" वाले संख्या-कार्ड रखने से बच्चे क्या समझते हैं?',
      opts: [
        'उभयनिष्ठ गुणज (Common Multiples — बीच के साझा भाग में ६ के गुणज)',
        'दशमलव का अभाज्य गुणनखंडन',
        '१८०° से बड़े कोण',
        'मुद्रा सन्निकटन',
      ],
      exp: 'वेन आरेख रूपी छल्लों के उभयनिष्ठ क्षेत्र में ६, १२, १८ रखकर बच्चे साझा गुणज प्रत्यक्ष समझते हैं।',
    },
  },
  {
    topic: 'Protractor Common Zero-Scale Reading Error',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 5 pupil measures a visibly ACUTE angle with a dual-scale semi-circular protractor and records "130°" instead of "50°". What is the teacher’s best coaching tip?',
      opts: [
        'Prompt visual estimation first ("Is this angle narrower or wider than a 90° square corner?") before reading the scale starting from 0° along the baseline',
        'Paint over one of the protractor scales permanently',
        'Tell the student all acute angles exceed 100°',
        'Measure angles using a straight centimetre ruler instead',
      ],
      exp: 'Estimating relative to a 90° right-angle benchmark prevents reading the opposite-side supplementary scale (130° instead of 50°).',
    },
    mr: {
      q: 'इयत्ता ५ वीचा विद्यार्थी उघडपणे दिसणाऱ्या लघुकोनाचे माप कोनमापकाने (Protractor) ५०° ऐवजी १३०° वाचतो. ही चूक टाळण्यासाठी कोणती सवय लावावी?',
      opts: [
        'मोजण्यापूर्वी अंदाज घेणे: "हा कोन ९०° काटकोनापेक्षा लहान आहे की मोठा?" असे ठरवून तळाच्या ०° पासून अचूक पट्टी वाचणे',
        'कोनमापकावरील एक स्केल कायमचा पुसून टाकणे',
        'लघुकोन १००° पेक्षा मोठा असतो असे सांगणे',
        'कोनाऐवजी सेमी पट्टीने माप घेणे',
      ],
      exp: '९०° च्या संदर्भाने लघुकोन/विशालकोन आधीच ठरवल्यास कोनमापकाची विरुद्ध स्केल वाचण्याची चूक टळते.',
    },
    hi: {
      q: 'कक्षा ५ का छात्र एक स्पष्ट न्यूनकोण को चाँदे से ५०° के स्थान पर १३०° पढ़ता है। इस त्रुटि से बचने की सर्वोत्तम सलाह क्या है?',
      opts: [
        'मापने से पहले अनुमान लगवाना ("क्या यह ९०° समकोण से छोटा है या बड़ा?") और आधार-रेखा के ०° से गिनती शुरू करना',
        'चाँदे का एक पैमाना हमेशा के लिए मिटा देना',
        'न्यूनकोण १००° से बड़ा बताना',
        'चाँदे की जगह सेंटीमीटर स्केल प्रयोग करना',
      ],
      exp: '९०° समकोण से तुलनात्मक आकलन पहले करने पर विपरीत पैमाना (१३०° बनाम ५०°) पढ़ने की भूल रुकती है।',
    },
  },
  {
    topic: 'Multiple Mathematical Representations (Lesh Model)',
    pattern: 'Pedagogical',
    difficulty: 'Difficult',
    en: {
      q: 'Deep understanding of a fraction like 3/4 requires connecting FIVE representations: Real-world context, Manipulative model, Pictures, Spoken language, and Written symbols. This holistic approach highlights:',
      opts: [
        'Multi-representational translation (Lesh Translation Model)',
        'Single-channel lecture transmission',
        'Exclusive algorithmic speed training',
        'Silent textbook copying',
      ],
      exp: 'Moving smoothly across concrete, pictorial, verbal, contextual, and symbolic forms ensures deep transferable understanding.',
    },
    mr: {
      q: '३/४ सारख्या अपूर्णांकाची पक्की समज होण्यासाठी प्रत्यक्ष वस्तू, चित्र, व्यवहार प्रसंग, तोंडी भाषा आणि गणिती चिन्ह या पाचही रूपांतील दुवा जोडला जातो. हे तत्त्व कशाला महत्त्व देते?',
      opts: [
        'बहु-प्रस्तुतीकरण समन्वय (Multi-representational / Lesh Model)',
        'फक्त व्याख्यान पद्धती',
        'केवळ यांत्रिक वेगाचा सराव',
        'मौन उतरवून काढणे',
      ],
      exp: 'संदर्भ, साहित्य, चित्र, भाषा व चिन्ह या रूपांत सहज रूपांतर करता येणे ही सखोल गणितीय समजेची खूण आहे.',
    },
    hi: {
      q: '३/४ जैसी अवधारणा की गहन समझ हेतु वास्तविक संदर्भ, मूर्त सामग्री, चित्र, मौखिक भाषा व लिखित प्रतीक को आपस में जोड़ना किसे दर्शाता है?',
      opts: [
        'बहु-निरूपण रूपांतरण (Multi-representational / Lesh Model)',
        'एकल-माध्यम व्याख्यान प्रणाली',
        'केवल यांत्रिक गति प्रशिक्षण',
        'मौन पाठ्यपुस्तक नकल',
      ],
      exp: 'विभिन्न निरूपणों (मूर्त, चित्र, मौखिक, प्रतीक, संदर्भ) के बीच संबंध स्थापित करना सार्थक गणित अधिगम का आधार है।',
    },
  },
  {
    topic: 'Oral & Mental Math Role in Daily Routine',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Allocating 10 minutes daily to lively oral mental math games (e.g., "What adds to 37 to make 100?") primarily strengthens:',
      opts: [
        'Number agility, working memory strategies, and confidence in everyday calculation',
        'Copying speed from the chalkboard',
        'Drawing neat margins in notebooks',
        'Passive dependency on pocket calculators',
      ],
      exp: 'Mental math warms up flexible number decomposition (e.g., 37 + 3 = 40 + 60 = 100) without paper dependency.',
    },
    mr: {
      q: 'दररोज तासाच्या सुरुवातीस १० मिनिटे "३७ मध्ये किती मिळवल्यास १०० होतील?" असे तोंडी गणितीय खेळ घेतल्याने प्रामुख्याने काय विकसित होते?',
      opts: [
        'संख्या हाताळण्याची चपळता (Number Agility), कार्यरत स्मृती व दैनंदिन हिशोबाचा आत्मविश्वास',
        'फळ्यावरून उतरवण्याचा वेग',
        'वहीत समास आखण्याची सवय',
        'कॅल्क्युलेटरवरील अवलंबित्व',
      ],
      exp: 'तोंडी सराव आणि खेळकर कोडींमुळे मनातच संख्यांचे तुकडे करून जोडण्याची लवचिक क्षमता वाढते.',
    },
    hi: {
      q: 'प्रतिदिन १० मिनट रोचक मौखिक गणित (जैसे "३७ में क्या जोड़ें कि १०० बने?") कराने से मुख्यतः क्या मजबूत होता है?',
      opts: [
        'संख्यात्मक चपलता, मानसिक रणनीतियाँ तथा दैनिक गणना में आत्मविश्वास',
        'श्यामपट्ट से नकल की गति',
        'कॉपी में हाशिया खींचना',
        'कैलकुलेटर पर निर्भरता',
      ],
      exp: 'दैनिक मौखिक गणित अभ्यास से संख्याओं को तोड़कर व जोड़कर सोचने की लचीली क्षमता बढ़ती है।',
    },
  },
  {
    topic: 'Meaning of "Zero" Introduced via Subtraction',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Which teaching sequence is MOST intuitive when introducing the number ZERO ("0") to Class 1 pupils?',
      opts: [
        'Count down concrete items being eaten/removed ("3 biscuits → 2 → 1 → plate empty = 0 left") AFTER learners grasp 1 to 9',
        'Teach zero as the very first abstract symbol before 1, 2, 3',
        'Explain zero as the additive identity of rational numbers',
        'Skip zero until decimal place values appear in Class 4',
      ],
      exp: 'Zero is cognitively harder than counting objects 1–9; experiencing "nothing left" via countdown makes 0 immediately meaningful.',
    },
    mr: {
      q: 'इयत्ता १ लीच्या मुलांना "शून्य (0)" या अंकाची ओळख करून देताना कोणता क्रम सर्वात नैसर्गिक व सोपा ठरतो?',
      opts: [
        '१ ते ९ मोजता आल्यानंतर वस्तू कमी होण्याच्या कृतीतून ("३ लाडू → २ → १ → आता काहीच नाही = ०") शून्य दाखवणे',
        '१, २, ३ च्या आधीच अमूर्त शून्य शिकवणे',
        'शून्य हा बेरजेचा अखंड घटक (Additive Identity) आहे अशी व्याख्या सांगणे',
        'इयत्ता ४ थीपर्यंत शून्य टाळणे',
      ],
      exp: 'वस्तू संपल्यावर "काहीच उरले नाही" या प्रत्यक्ष घटनेतून १ ते ९ नंतर शून्य शिकवणे अत्यंत नैसर्गिक ठरते.',
    },
    hi: {
      q: 'कक्षा १ के बच्चों को "शून्य (0)" की अवधारणा से परिचित कराने का सबसे स्वाभाविक तरीका कौन-सा है?',
      opts: [
        '१ से ९ की समझ के बाद वस्तुएँ कम होने की गतिविधि से ("३ बिस्कुट → २ → १ → प्लेट खाली = ०") शून्य सिखाना',
        '१, २, ३ से पहले ही अमूर्त ० सिखाना',
        'परिमेय संख्याओं का योज्य तत्समक बताना',
        'कक्षा ४ तक शून्य टालना',
      ],
      exp: 'गिनती (१–९) आने के बाद घटाव द्वारा "कुछ न बचना" दिखाने से शून्य की सार्थक समझ बनती है।',
    },
  },
  {
    topic: 'Classroom Use of Geogebra / Dynamic Tools at Upper Primary Transition',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'When using a visual bar chart activity on a tablet or grid board in Class 5, what key convention MUST learners understand first?',
      opts: [
        'Equal width of all bars, uniform spacing between bars, and choosing an appropriate uniform axis scale (e.g., 1 box = 5 students)',
        'Making favourite categories have wider bars so they look nicer',
        'Omitting axis labels and titles',
        'Drawing curved zigzag bars',
      ],
      exp: 'Proportional visual comparison relies on uniform bar width and consistent axis scaling.',
    },
    mr: {
      q: 'इयत्ता ५ वीमध्ये स्तंभालेख (Bar Graph) काढताना विद्यार्थ्यांनी कोणता मूलभूत नियम पाळणे सर्वात महत्त्वाचे आहे?',
      opts: [
        'सर्व स्तंभांची रुंदी समान, स्तंभांमधील अंतर समान आणि अक्षावर योग्य एकसमान प्रमाण (Scale) असणे',
        'आवडत्या गोष्टीचा स्तंभ अधिक रुंद काढणे',
        'अक्षांना नावे व शीर्षक न देणे',
        'वाकडे-तिकडे नागमोडी स्तंभ काढणे',
      ],
      exp: 'स्तंभालेखातील अचूक तुलना ही समान रुंदी व अक्षावरील एकसमान प्रमाणावर अवलंबून असते.',
    },
    hi: {
      q: 'कक्षा ५ में दंड आलेख (Bar Graph) बनाते समय छात्रों को सबसे पहले किस मूल नियम को समझना आवश्यक है?',
      opts: [
        'सभी दंडों की समान चौड़ाई, उनके बीच समान दूरी तथा अक्ष पर उपयुक्त एकसमान पैमाना (Scale)',
        'पसंदीदा श्रेणी का दंड अधिक चौड़ा बनाना',
        'अक्षों के नाम व शीर्षक न लिखना',
        'टेढ़े-मेढ़े दंड बनाना',
      ],
      exp: 'दंड आलेख की सार्थक तुलना के लिए समान चौड़ाई व एकसमान पैमाना अनिवार्य होता है।',
    },
  },
  {
    topic: 'Rubrics for Assessing Math Problem Solving',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Why is an analytic scoring Rubric better than "Right/Wrong tick marks only" when assessing multi-step Class 5 word problems?',
      opts: [
        'It awards partial credit transparently across problem understanding, chosen strategy, calculation, and unit clarity—guiding improvement',
        'It eliminates the teacher’s need to read student work',
        'It guarantees every student gets 100%',
        'It focuses exclusively on neat cursive handwriting',
      ],
      exp: 'Analytic rubrics value valid reasoning even when a minor arithmetic slip occurs, giving actionable feedback.',
    },
    mr: {
      q: 'इयत्ता ५ वीच्या बहु-पायरी शाब्दिक उदाहरणांचे मूल्यांकन करताना केवळ "बरोबर/चूक" पेक्षा "रुब्रिक" (Rubric) वापरणे श्रेष्ठ का ठरते?',
      opts: [
        'समस्या आकलन, निवडलेली पद्धत, आकडेमोड आणि अचूक एकक या प्रत्येक टप्प्यास पारदर्शक गुण व सुधारणेची दिशा मिळते',
        'शिक्षकांना विद्यार्थ्यांचे उत्तर वाचण्याची गरज राहत नाही',
        'प्रत्येक विद्यार्थ्यास १००% गुण मिळतात',
        'केवळ सुंदर हस्ताक्षरावर गुण दिले जातात',
      ],
      exp: 'रुब्रिकमुळे शेवटच्या पायरीत थोडी आकडेमोड चुकली तरी विद्यार्थ्यांच्या योग्य विचारांचे व प्रक्रियेचे योग्य मूल्यमापन होते.',
    },
    hi: {
      q: 'कक्षा ५ के बहु-चरणीय इबारती प्रश्नों के आकलन में केवल "सही/गलत" की बजाय "रुब्रिक" (Rubric) का उपयोग बेहतर क्यों है?',
      opts: [
        'यह समस्या-समझ, रणनीति, गणना व मात्रक स्पष्टता जैसे चरणों पर पारदर्शी आंशिक अंक व सुधार की दिशा प्रदान करता है',
        'शिक्षक को उत्तर पढ़ने की आवश्यकता नहीं रहती',
        'हर छात्र को १००% अंक मिलते हैं',
        'केवल सुंदर लिखावट पर ध्यान दिया जाता है',
      ],
      exp: 'रुब्रिक अंतिम गणना की छोटी भूल होने पर भी छात्र के सही तर्क और प्रक्रिया को महत्व देता है।',
    },
  },
  {
    topic: 'Developing Place Value Grouping with Bundles & Loose Sticks',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Tying 10 matchsticks or ice-cream sticks with a rubber band to form 1 "ten-bundle" is MOST effective for helping Class 1–2 learners understand:',
      opts: [
        'Grouping 10 ones into 1 ten (decimal base-10 bundling)',
        'Fraction denominator multiplication',
        'Perimeter of pentagons',
        'Conversion from litres to millilitres',
      ],
      exp: 'Physical bundling and unbundling of 10 sticks cements the base-10 trading relationship between tens and ones.',
    },
    mr: {
      q: '१० काड्या रबर बँडने बांधून एक "दशकाचा गट्टा" तयार करण्याची कृती इयत्ता १ ली–२ रीच्या मुलांना कशासाठी सर्वाधिक उपयोगी पडते?',
      opts: [
        '१० सुटे एकक मिळून १ दशक तयार होतो ही दशमान पद्धतीची मूळ संकल्पना अनुभवण्यासाठी',
        'अपूर्णांकांचा गुणाकार करण्यासाठी',
        'पंचकोनाची परिमिती काढण्यासाठी',
        'लिटरचे मिलिमध्ये रूपांतर करण्यासाठी',
      ],
      exp: 'काड्या बांधणे व सोडणे या कृतीतून १० सुटे = १ दशक ही स्थानिक किमतीची पायाभूत जाणीव दृढ होते.',
    },
    hi: {
      q: '१० तीलियों को रबर बैंड से बाँधकर १ "दहाई का बंडल" बनाने की गतिविधि कक्षा १-२ के छात्रों को क्या सिखाने में सर्वाधिक प्रभावी है?',
      opts: [
        '१० इकाइयों के समूह से १ दहाई बनती है—यह आधार-१० (दशमलव प्रणाली) का मूल सिद्धांत',
        'भिन्नों का गुणा',
        'पंचभुज का परिमाप',
        'लीटर से मिलीलीटर रूपांतरण',
      ],
      exp: 'तीलियों के बंडल बनाने व खोलने से इकाइयों और दहाइयों के बीच १०-के-समूह का संबंध मूर्त बनता है।',
    },
  },
  {
    topic: 'Inclusive Math Support for Dyscalculia',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'If a primary learner exhibits persistent indicators of Dyscalculia (difficulty remembering number facts and aligning columns), which classroom accommodation is MOST helpful?',
      opts: [
        'Provide squared grid/graph paper for vertical digit alignment, multi-sensory manipulatives, extra processing time, and visual number lines',
        'Exclude the student permanently from mathematics classes',
        'Double daily timed speed tests under a stopwatch',
        'Force memorization of all formulas through copy-writing',
      ],
      exp: 'Visual grids, tactile manipulatives, reduced time stress, and step-by-step scaffolds empower learners with dyscalculia.',
    },
    mr: {
      q: 'एखाद्या प्राथमिक विद्यार्थ्यात डिस्कॅल्क्युलियाची (Dyscalculia – अंक ओळख, स्तंभ जुळवणूक व आकडेमोडीत सातत्यपूर्ण अडचण) लक्षणे दिसल्यास कोणता आधार सर्वात उपयुक्त ठरेल?',
      opts: [
        'स्तंभ अचूक जुळवण्यासाठी चौकोनी चौरस वही (Grid Paper), बहुसंवेदी साहित्य, संख्यारेषा व अतिरिक्त वेळ देणे',
        'त्या विद्यार्थ्यास गणिताच्या तासातून कायमचे वगळणे',
        'स्टॉपवॉच लावून दररोज वेगाच्या चाचण्या दुप्पट करणे',
        'सूत्रे पाहून लिहिण्याची शिक्षा देणे',
      ],
      exp: 'चौकोनी कागद, मूर्त साहित्य व ताणरहित अतिरिक्त वेळ डिस्कॅल्क्युलिया असलेल्या मुलांना अत्यंत सहाय्यक ठरतो.',
    },
    hi: {
      q: 'यदि किसी छात्र में डिस्कैल्कुलिया (Dyscalculia—अंक-तथ्य व स्तंभ मिलान में स्थायी कठिनाई) के लक्षण दिखें, तो कौन-सी सहायता सर्वोत्तम है?',
      opts: [
        'अंकों को सीध में लिखने हेतु चौखानेदार कागज (Grid Paper), बहु-संवेदी मूर्त सामग्री, संख्या रेखा तथा अतिरिक्त समय देना',
        'छात्र को गणित कक्षा से बाहर कर देना',
        'स्टॉपवॉच के साथ गति-परीक्षाएँ दोगुनी करना',
        'दंडस्वरूप सूत्र बार-बार लिखवाना',
      ],
      exp: 'चौखानेदार कागज, स्पर्शनीय सामग्री व समय-दबाव से मुक्ति डिस्कैल्कुलिया से जूझ रहे छात्रों की बड़ी मदद करती है।',
    },
  },
  {
    topic: 'Concept of Multiplication as Scaling vs Repeated Addition',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Why must Class 4–5 instruction gradually expand multiplication beyond "repeated addition" alone to include area/array and scaling ("3 times as long")?',
      opts: [
        'Because repeated addition makes sense for whole numbers (3 × 4), whereas multiplying fractions/decimals (like 1/2 × 1/3) or area requires rectangular array/scaling understanding',
        'Because addition becomes obsolete after Class 3',
        'Because scaling eliminates multiplication tables',
        'So children forget how to add',
      ],
      exp: 'Broadening models from repeated addition to array/area and scaling prepares learners smoothly for fractions and proportional reasoning.',
    },
    mr: {
      q: 'इयत्ता ४ थी–५ वीमध्ये गुणाकार हा केवळ "पुनरावृत्त बेरीज" इतकाच मर्यादित न ठेवता क्षेत्रफळ/आयत रचना आणि "पट तुलना" (Scaling) यांवरही भर का दिला जातो?',
      opts: [
        'कारण पूर्ण संख्यांपुरती पुनरावृत्त बेरीज पुरेशी असली तरी अपूर्णांकांचा गुणाकार (उदा. १/२ × १/३) व क्षेत्रफळ समजण्यासाठी पट व क्षेत्र मॉडेल आवश्यक असते',
        'कारण इयत्ता ३ री नंतर बेरीज वापरली जात नाही',
        'पट मॉडेलमुळे पाढे लागणार नाहीत म्हणून',
        'मुले बेरीज विसरावीत म्हणून',
      ],
      exp: 'क्षेत्रफळ व पट (Scaling) दृष्टिकोनामुळे पुढे अपूर्णांक, दशांश व गुणोत्तर या संकल्पनांमध्ये अडथळा येत नाही.',
    },
    hi: {
      q: 'कक्षा ४-५ में गुणा को केवल "बार-बार जोड़" तक सीमित न रखकर क्षेत्रफल/आयताकार व्यूह व "गुना पैमाने" (Scaling) से क्यों जोड़ा जाता है?',
      opts: [
        'क्योंकि बार-बार जोड़ केवल पूर्ण संख्याओं में सहज है, जबकि भिन्न/दशमलव गुणा (जैसे १/२ × १/३) और क्षेत्रफल के लिए व्यूह/पैमाना समझ आवश्यक है',
        'कक्षा ३ के बाद जोड़ समाप्त हो जाता है',
        'इससे पहाड़ों की आवश्यकता नहीं रहती',
        'ताकि छात्र जोड़ भूल जाएँ',
      ],
      exp: 'आयताकार व्यूह और स्केलिंग मॉडल आगे चलकर भिन्न, दशमलव व अनुपात की समझ को सहज बनाते हैं।',
    },
  },
  {
    topic: 'Comparing Angles by Ray Length Misconception',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 4 child looks at two 40° angles: Angle A has short arms (2 cm rays) while Angle B has long arms (8 cm rays), and says "Angle B is bigger." What misconception needs correction?',
      opts: [
        'Confusing arm/ray length with the degree of turn/opening between the two rays',
        'Confusing triangles with rectangles',
        'Misreading digits 4 and 0',
        'Not knowing the formula for circle area',
      ],
      exp: 'An angle measures rotation/opening at the vertex, completely independent of how far its rays are drawn.',
    },
    mr: {
      q: 'दोनही कोन ४०° चे आहेत; कोन A च्या बाजू २ सेमी, तर कोन B च्या बाजू ८ सेमी काढल्या आहेत. एक मुलगा "कोन B मोठा आहे" असे म्हणतो. या गैरसमजाचे अचूक कारण कोणते?',
      opts: [
        'दोन किरणांमधील कोनीय वळण/उघड (Amount of Turn) न पाहता किरणांच्या बाह्य लांबीवरून कोन मोजण्याची चूक',
        'त्रिकोण व आयत यांतील गोंधळ',
        '४ आणि ० अंक वाचण्याची चूक',
        'वर्तुळाच्या क्षेत्रफळाचे सूत्र न येणे',
      ],
      exp: 'कोनाचे माप किरणांच्या लांबीवर नव्हे, तर दोन किरणांमधील वळणावर (अंशांवर) अवलंबून असते हे काडीच्या कोन-पट्ट्यांनी स्पष्ट करावे.',
    },
    hi: {
      q: 'दो ४०° के कोणों में से एक की भुजाएँ २ सेमी और दूसरे की ८ सेमी खींची गई हैं; छात्र लंबी भुजाओं वाले कोण को बड़ा बताता है। वह किस भ्रम में है?',
      opts: [
        'दोनों किरणों के बीच के घुमाव/फैलाव के बजाय किरणों की लंबाई को कोण का माप समझ बैठना',
        'त्रिभुज व आयत में भ्रम',
        'अंक पढ़ने की गलती',
        'वृत्त का क्षेत्रफल न जानना',
      ],
      exp: 'कोण का माप भुजाओं की लंबाई से स्वतंत्र होकर शीर्ष पर बनने वाले घुमाव पर निर्भर करता है।',
    },
  },
  {
    topic: 'Contextual Decimal Understanding via Currency',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'When introducing decimals like ₹12.50 and ₹12.05 to Class 4 pupils, why is Indian money (rupees and paise) an ideal starting context?',
      opts: [
        '100 paise = ₹1 naturally grounds tenths and hundredths in familiar shopping experience (₹12.50 = 12 rupees 50 paise vs ₹12.05 = 12 rupees 5 paise)',
        'Because rupees never require decimal points',
        'So children learn international stock exchange rates',
        'Because paise operate in base 60 like minutes',
      ],
      exp: 'Money uses base-100 subdivisions that children encounter daily, bridging decimals cleanly before abstract metric tables.',
    },
    mr: {
      q: 'इयत्ता ४ थीत ₹१२.५० आणि ₹१२.०५ यांसारखे दशांश शिकवताना "रुपये आणि पैसे" हा संदर्भ आदर्श का मानला जातो?',
      opts: [
        '१०० पैसे = १ रुपया असल्याने दशांश व शतांश यांची संकल्पना परिचित व्यवहारातून (५० पैसे विरुद्ध ५ पैसे) सहज कळते',
        'रुपयांमध्ये दशांश चिन्ह कधीच नसते म्हणून',
        'आंतरराष्ट्रीय शेअर बाजार शिकवण्यासाठी',
        'पैशांचे प्रमाण घड्याळाप्रमाणे ६० वर चालते म्हणून',
      ],
      exp: 'शंभरावर आधारित रुपया-पैसे प्रणाली दैनंदिन परिचयाची असल्याने दशांशाचा पाया पक्का करते.',
    },
    hi: {
      q: 'कक्षा ४ में ₹१२.५० तथा ₹१२.०५ जैसे दशमलव सिखाने हेतु "रुपये और पैसे" का संदर्भ आदर्श क्यों माना जाता है?',
      opts: [
        '१०० पैसे = ₹१ होने के कारण दशांश व शतांश की समझ दैनिक खरीदारी के अनुभव (५० पैसे बनाम ५ पैसे) से जुड़ जाती है',
        'रुपयों में दशमलव नहीं होता',
        'अंतर्राष्ट्रीय मुद्रा बाजार सिखाने के लिए',
        'पैसे घड़ी की तरह ६० के आधार पर चलते हैं',
      ],
      exp: 'रुपये-पैसे की १००-आधारित प्रणाली बच्चों के पूर्व-अनुभव से दशमलव की सार्थक समझ जोड़ती है।',
    },
  },
];
