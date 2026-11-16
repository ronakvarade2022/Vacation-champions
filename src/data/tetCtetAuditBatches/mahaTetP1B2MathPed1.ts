import { CuratedTrilingualMcq } from './types';

// Batch 2 Mathematics Pedagogy Part 1 (28 unique Primary Math Pedagogy Qs)
export const MAHA_TET_P1_B2_MATH_PED1: CuratedTrilingualMcq[] = [
  {
    topic: 'Skemp Relational vs Instrumental Understanding Fractions',
    pattern: 'Pedagogical',
    difficulty: 'Pedagogical HOTS',
    en: {
      q: 'In Richard Skemp’s framework of mathematical learning, what distinguishes "Relational Understanding" from "Instrumental Understanding"?',
      opts: [
        'Relational understanding knows both what procedure works and why it works mathematically, enabling flexible transfer to novel problems',
        'Relational understanding depends on memorizing faster multiplication tables without visual models',
        'Instrumental understanding requires proof derivation whereas relational understanding avoids formulas altogether',
        'Instrumental understanding applies only to geometry instruments like compasses and protractors',
      ],
      exp: 'Skemp defined Instrumental understanding as "rules without reasons" (e.g., invert-and-multiply without knowing why), whereas Relational understanding connects underlying principles so pupils adapt across contexts.',
    },
    mr: {
      q: 'रिचर्ड स्केम्प यांच्या गणित अध्ययन प्रारूपानुसार "संबंधात्मक आकलन (Relational Understanding)" आणि "साधनात्मक आकलन (Instrumental Understanding)" यांतील मुख्य फरक कोणता?',
      opts: [
        'संबंधात्मक आकलनात प्रक्रिया कशी आणि का कार्य करते याचे सखोल कारण समजते, ज्यामुळे नवीन उदाहरणांतही ती वापरता येते',
        'संबंधात्मक आकलनासाठी फक्त पाढे तोंडपाठ असणे पुरेसे असते',
        'साधनात्मक आकलनात प्रमेय सिद्ध करावे लागतात आणि संबंधात्मक आकलनात सूत्रे नसतात',
        'साधनात्मक आकलन फक्त कंपास व कोनमापकाच्या वापराशी संबंधित आहे',
      ],
      exp: 'स्केम्प यांच्या मते "कारणांशिवाय नियम" म्हणजे साधनात्मक आकलन, तर "नियमांमागील गणितीय तर्क समजणे" म्हणजे संबंधात्मक आकलन होय.',
    },
    hi: {
      q: 'रिचर्ड स्केम्प के अनुसार "संबंधात्मक समझ (Relational Understanding)" और "उपकरणात्मक समझ (Instrumental Understanding)" में क्या मुख्य अंतर है?',
      opts: [
        'संबंधात्मक समझ में विद्यार्थी यह जानता है कि कोई विधि क्या करती है और गणितीय रूप से क्यों काम करती है',
        'संबंधात्मक समझ का अर्थ बिना समझे पहाड़े कंठस्थ करना है',
        'उपकरणात्मक समझ केवल ज्यामिति बॉक्स के उपकरणों के उपयोग तक सीमित है',
        'संबंधात्मक समझ में सभी सूत्रों का पूर्ण बहिष्कार किया जाता है',
      ],
      exp: 'स्केम्प ने "बिना कारण नियम रटने" को उपकरणात्मक तथा "नियम के पीछे का कारण व संबंध समझने" को संबंधात्मक समझ कहा है।',
    },
  },
  {
    topic: 'Zoltan Dienes Perceptual Variability Principle Place Value',
    pattern: 'Pedagogical',
    difficulty: 'Pedagogical HOTS',
    en: {
      q: 'A Class 3 teacher illustrates the number `34` using ice-cream stick bundles, Base-10 blocks, play ₹10 notes with ₹1 coins, and an abacus. Which principle of Zoltan Dienes is she applying?',
      opts: [
        'Perceptual Variability Principle — presenting the same mathematical structure across multiple physical embodiments',
        'Dynamic Memorization Principle — drilling identical worksheets daily until speed doubles',
        'Formal Axiomatic Principle — introducing abstract algebraic symbols before concrete objects',
        'Mechanical Conditioning Principle — rewarding silent individual copying from the blackboard',
      ],
      exp: 'Dienes’ Perceptual Variability Principle states that varying materials while keeping the underlying mathematical structure constant helps children abstract the true concept (place value) rather than tying it to one toy.',
    },
    mr: {
      q: 'इयत्ता तिसरीच्या शिक्षिका `34` ही संख्या काड्यांचे गठे, बेस-१० ठोकळे, १० व १ रुपयांची खेळण्यातील नाणी आणि मणीमाळ अशा विविध साधनांतून दाखवतात. त्या झोल्टन डिनेस यांचे कोणते तत्त्व वापरत आहेत?',
      opts: [
        'बोधन विविधता तत्त्व (Perceptual Variability) — एकच गणितीय रचना विविध भौतिक साधनांतून समजावून देणे',
        'यांत्रिक पाठांतर तत्त्व — समान कार्यपत्रिकांचा वेगवान सराव घेणे',
        'अमूर्त स्वयंसिद्ध तत्त्व — मूर्त वस्तूंऐवजी थेट बीजगणितीय चिन्हे देणे',
        'अनुबंधन तत्त्व — फळ्यावरून शांतपणे उतरवून घेण्यास बक्षीस देणे',
      ],
      exp: 'डिनेस यांच्या बोधन विविधता तत्त्वानुसार विविध साधनांतून तीच गणितीय संकल्पना मांडल्यास विद्यार्थी संकल्पनेचा खरा गाभा आत्मसात करतात.',
    },
    hi: {
      q: 'कक्षा 3 की शिक्षिका संख्या `34` को तीलियों के बंडल, बेस-10 ब्लॉक, ₹10 के नोट-सिक्के और गिनतारा से दर्शाती हैं। यह ज़ोल्टन डीन्स के किस सिद्धांत का उपयोग है?',
      opts: [
        'बोधगम्य विविधता सिद्धांत (Perceptual Variability) — विभिन्न भौतिक सामग्रियों से एक ही गणितीय संरचना का अमूर्तन कराना',
        'केवल यांत्रिक अभ्यास सिद्धांत',
        'मूर्त उदाहरणों से पहले अमूर्त बीजगणित पढ़ाना',
        'श्यामपट्ट से चुपचाप नकल करवाने का सिद्धांत',
      ],
      exp: 'विभिन्न सामग्रियों के माध्यम से समान संरचना प्रस्तुत करने पर बच्चा स्थानीय मान की मूल अवधारणा को किसी एक खिलौने तक सीमित न रखकर समझता है।',
    },
  },
  {
    topic: 'Regrouping Subtraction Borrowing Ten Conceptual Language',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'When explaining vertical subtraction `52 − 18`, why should a primary teacher prefer saying "unbundle 1 ten into 10 ones" instead of "borrow 1 from 5"?',
      opts: [
        'Saying "borrow 1" misleads children into treating the tens digit `5` as `5` single ones rather than `5 tens` (`50`), obscuring place-value conservation',
        'Because "unbundle" is longer and makes blackboard writing look more academic',
        'Because children cannot subtract single digits unless the word "borrow" is banned from textbooks',
        'Because regrouping changes the actual total value of the number `52`',
      ],
      exp: 'Decomposing `5 tens + 2 ones` into `4 tens + 12 ones` preserves the total value `52` visibly; "borrow 1" hides that `1 ten = 10 ones` and fosters errors like `2 + 1 = 3` instead of `12`.',
    },
    mr: {
      q: '`52 − 18` ही हातच्याची वजाबाकी शिकवताना "५ मधून १ उसना घेणे" असे म्हणण्यापेक्षा "१ दशक मोकळा करून १० एकक करणे" हे का अधिक उपयुक्त ठरते?',
      opts: [
        '"१ उसना" म्हटल्याने विद्यार्थी ५ दशक म्हणजे `50` हे विसरून `2 + 1 = 3` अशी स्थानिक किमतीची चूक करू शकतात; दशक मोकळा करणे मूल्य कायम ठेवते',
        'कारण "मोकळा करणे" हा शब्द पाठपुस्तकात मोठा दिसतो',
        'कारण त्यामुळे `52` ची एकूण किंमत बदलून लहान होते',
        'कारण मुले लहान अंकांची वजाबाकी करू शकत नाहीत',
      ],
      exp: '`5 दशक 2 एकक` चे `4 दशक 12 एकक` असे विभाजन दाखवल्याने `52` ची किंमत बदलत नाही हे स्पष्ट होते आणि दशमान पद्धतीचा पाया पक्का होतो.',
    },
    hi: {
      q: '`52 − 18` पढ़ाते समय "5 से 1 उधार लो" कहने के बजाय "1 दहाई को खोलकर 10 इकाई बनाओ" कहना क्यों बेहतर है?',
      opts: [
        '"1 उधार" कहने से बच्चे 5 को दहाई के बजाय 1 इकाई समझकर `2+1=3` की स्थानीय मान त्रुटि कर सकते हैं; विघटन कुल मान को सुरक्षित रखता है',
        'क्योंकि "उधार" शब्द बोलना कठिन होता है',
        'क्योंकि पुनर्समूहन से संख्या `52` का कुल मान बदल जाता है',
        'क्योंकि बिना इसके बच्चे 1 से 9 तक गिनती नहीं कर पाते',
      ],
      exp: '`5 दहाई 2 इकाई` को `4 दहाई 12 इकाई` रूप में बोलने से स्थानीय मान संरक्षण और `1 दहाई = 10 इकाई` की समझ सुदृढ़ होती है।',
    },
  },
  {
    topic: 'Word Problem Schemas Compare Harder Than Change',
    pattern: 'Analytical',
    difficulty: 'Pedagogical HOTS',
    en: {
      q: 'Why do Class 2 students typically find "Asha has `14` marbles; she has `5` MORE than Ravi; how many does Ravi have?" harder than "Ravi had `9` marbles and won `5` more"?',
      opts: [
        'In the Compare-Referent-Unknown problem, the relational cue word "MORE" conflicts with the subtraction needed (`14 − 5`), requiring higher relational thinking',
        'Because `14` is a two-digit number that Class 2 children cannot recognize visually',
        'Because marbles are inappropriate manipulatives for subtraction lessons',
        'Because the first problem requires multiplication before subtraction',
      ],
      exp: 'In inconsistent-language Compare problems, "more" points upward while finding Ravi’s smaller set demands subtracting `14 − 5 = 9`; children relying on keyword tricks falsely add `14 + 5`.',
    },
    mr: {
      q: 'इयत्ता दुसरीच्या विद्यार्थ्यांना "रवीकडे ९ गोट्या होत्या, त्याला अजून ५ मिळाल्या" पेक्षा "आशाकडे १४ गोट्या आहेत, तिच्याकडे रवीपेक्षा ५ जास्त आहेत, तर रवीकडे किती?" हे उदाहरण का कठीण वाटते?',
      opts: [
        'या तुलनात्मक प्रश्नात "जास्त" हा शब्द असूनही उत्तर काढण्यासाठी वजाबाकी (`14 − 5`) करावी लागते, ज्यामुळे शब्द-सापळ्यात अडकलेल्या मुलांचा गोंधळ होतो',
        'कारण `14` ही दोन-अंकी संख्या दुसरीच्या मुलांना वाचता येत नाही',
        'कारण गोट्या हे मोजमापाचे योग्य साधन नाही',
        'कारण पहिल्या उदाहरणात गुणाकार करावा लागतो',
      ],
      exp: 'तुलनात्मक शाब्दिक उदाहरणात नात्याचा अर्थ लावावा लागतो; "जास्त" शब्द पाहून बेरीज करण्याची यांत्रिक सवय येथे चुकीचे उत्तर देते.',
    },
    hi: {
      q: 'कक्षा 2 के बच्चों को "रवि के पास 9 कंचे थे, 5 और मिले" की तुलना में "आशा के पास 14 कंचे हैं, जो रवि से 5 अधिक हैं; रवि के पास कितने हैं?" अधिक कठिन क्यों लगता है?',
      opts: [
        'इस तुलनात्मक प्रश्न में "अधिक" शब्द होने के बावजूद उलटी संक्रिया घटाव (`14 − 5`) करनी पड़ती है, जिससे शब्द-संकेत रटने वाले बच्चे भ्रमित हो जाते हैं',
        'क्योंकि 14 दो-अंकीय संख्या है जिसे वे पहचान नहीं सकते',
        'क्योंकि इसमें गुणा और भाग दोनों की आवश्यकता है',
        'क्योंकि कंचों का उपयोग गणित में वर्जित है',
      ],
      exp: 'असंगत भाषा वाले तुलनात्मक प्रश्नों में संबंध को समझकर घटाना होता है, न कि केवल "अधिक" शब्द देखकर जोड़ना।',
    },
  },
  {
    topic: 'Fraction Division Meaning How Many Halves In Twelve',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 5 student gets confused by `12 ÷ 1/2 = 24`, asking how dividing can give a LARGER answer `24`. Which real-life framing resolves this misconception?',
      opts: [
        'Framing it through measurement (quotitive) division: "If we have `12` full chapatis and give `1/2` chapati to each child, how many children can we serve?"',
        'Insisting that "invert the second fraction and multiply" is a fixed magic rule with no real meaning',
        'Asking the child to skip fraction division until Class 8 algebra',
        'Replacing `12 ÷ 1/2` with `12 × 0.5` so the answer stays smaller',
      ],
      exp: 'Viewing `12 ÷ 1/2` as "How many `1/2`-sized pieces fit inside `12` wholes?" makes `24` completely intuitive and breaks the overgeneralization that division always shrinks a number.',
    },
    mr: {
      q: '`12 ÷ 1/2 = 24` या उत्तरात इयत्ता पाचवीच्या विद्यार्थ्याला शंका येते की भागाकार करून उत्तर मोठे कसे आले? हा संभ्रम कोणता वास्तव संदर्भ दूर करेल?',
      opts: [
        '"जर आपल्याकडे `12` पूर्ण भाकऱ्या असतील आणि प्रत्येकाला `1/2` भाकरी दिली तर किती मुलांना पुरेल?" हा मोजणी (Quotitive) भागाकाराचा अनुभव देऊन',
        '"दुसरा अपूर्णांक उलटा करून गुणा" हा नियम न विचारता पाठ करायला सांगून',
        'इयत्ता आठवीपर्यंत अपूर्णांक भागाकार पुढे ढकलून',
        '`12 × 0.5` असे लिहून लहान उत्तर आणून',
      ],
      exp: 'एका पूर्ण गोष्टीत किती अर्धे भाग मावतात हा दृष्टिकोन दिल्यास `12 ÷ 1/2 = 24` सहज व तर्कसंगत वाटते.',
    },
    hi: {
      q: 'कक्षा 5 का छात्र `12 ÷ 1/2 = 24` देखकर चकरा जाता है कि भाग करने पर उत्तर बड़ा कैसे हो गया। कौन-सी व्यावहारिक स्थिति यह भ्रम दूर करेगी?',
      opts: [
        '"यदि हमारे पास `12` पूरी रोटियाँ हैं और हर बच्चे को `1/2` रोटी दी जाए, तो कितने बच्चों को रोटी मिलेगी?" पूछकर',
        '"दूसरी भिन्न पलटकर गुणा करो" यह जादुई नियम रटाकर',
        'कक्षा 8 तक भिन्न का भाग टालकर',
        'इसे `12 × 0.5` में बदलकर छोटा उत्तर लाकर',
      ],
      exp: '"12 पूर्ण वस्तुओं में कितने आधे भाग समाते हैं" यह परिमाणात्मक भाग दृष्टिकोण `24` उत्तर को तुरंत सार्थक बना देता है।',
    },
  },
  {
    topic: 'Misconception Comparing Fractions Of Different Wholes',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'A pupil claims `1/4` is ALWAYS smaller than `1/2`, yet sees that `1/4` of a large family bhakri is bigger than `1/2` of a tiny biscuit. What essential prerequisite of fractions does this highlight?',
      opts: [
        'Fractions can be directly compared by size only when they refer to the SAME whole (unit reference)',
        'Fraction comparison rules reverse completely for circular food items',
        'Unit fractions with larger denominators are actually bigger in every context',
        'Food items should never be used to represent fractions in primary school',
      ],
      exp: 'A fraction describes a part relative to a defined whole. Comparing `1/4` and `1/2` algebraically (`1/4 < 1/2`) holds strictly when both fractions come from identical wholes.',
    },
    mr: {
      q: 'एका विद्यार्थ्याला वाटते `1/4` नेहमी `1/2` पेक्षा लहान असतो, पण मोठ्या भाकरीचा `1/4` तुकडा लहान बिस्किटाच्या `1/2` तुकड्यापेक्षा मोठा दिसतो. यावरून अपूर्णांकाचा कोणता महत्त्वाचा नियम स्पष्ट होतो?',
      opts: [
        'दोन अपूर्णांकांची थेट तुलना तेव्हाच करता येते जेव्हा त्यांचे संदर्भ "पूर्ण (Whole)" समान आकाराचे असतात',
        'गोलाकार खाद्यपदार्थांसाठी अपूर्णांकाचे नियम उलट होतात',
        'मोठा छेद असलेला अपूर्णांक नेहमी मोठाच असतो',
        'प्राथमिक शाळेत अपूर्णांकांसाठी खाद्यपदार्थांची उदाहरणे देऊ नयेत',
      ],
      exp: 'अपूर्णांक हा मूळ "पूर्ण वस्तू" शी संबंधित असतो; त्यामुळे समान पूर्ण वस्तूंचेच भाग तुलनायोग्य असतात.',
    },
    hi: {
      q: 'एक छात्र देखता है कि बड़ी रोटी का `1/4` भाग छोटे बिस्कुट के `1/2` से बड़ा है, जबकि नियम कहता है `1/4 < 1/2`। इससे भिन्न का कौन-सा आवश्यक सिद्धांत स्पष्ट होता है?',
      opts: [
        'भिन्नों की सीधी तुलना तभी मान्य होती है जब वे एक ही या समान आकार के "पूर्ण (Whole)" के संदर्भ में हों',
        'गोल वस्तुओं के लिए भिन्न के नियम उलट जाते हैं',
        'बड़े हर वाली भिन्न हर परिस्थिति में बड़ी होती है',
        'खाद्य वस्तुओं से भिन्न नहीं पढ़ानी चाहिए',
      ],
      exp: 'भिन्न सदैव एक संदर्भित पूर्ण (Whole) के सापेक्ष भाग होती है; अतः तुलना हेतु समान पूर्ण आवश्यक है।',
    },
  },
  {
    topic: 'Mental Math Strategy Doubling And Halving Multiplication',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'During a Number Talk, a Class 5 pupil solves `16 × 25` mentally as `8 × 50 = 4 × 100 = 400`. How should the teacher respond?',
      opts: [
        'Validate the child’s Doubling-and-Halving strategy and help the class notice why halving one factor while doubling the other preserves the product',
        'Reject the answer because the standard vertical two-line multiplication method was not followed',
        'Advise the student not to attempt mental shortcuts during Class 5',
        'Give extra copying homework on the 25-times table',
      ],
      exp: 'Doubling-and-halving applies the associative property (`16 × 25 = (4 × 4) × 25 = 4 × (4 × 25) = 400`), showcasing high number sense and flexible mental computation advocated by NCF-2005.',
    },
    mr: {
      q: 'तोंडी गणिताच्या चर्चेत इयत्ता पाचवीचा विद्यार्थी `16 × 25` हे `8 × 50 = 4 × 100 = 400` असे मनातच सोडवतो. शिक्षकाची प्रतिक्रिया कशी असावी?',
      opts: [
        'विद्यार्थ्याच्या "निमपट आणि दुप्पट" युक्तीचे कौतुक करून, एका गुणकाला निम्मे व दुसऱ्याला दुप्पट केल्यास गुणाकार का कायम राहतो हे वर्गाला समजून सांगणे',
        'उभ्या मांडणीची नेहमीची पद्धत वापरली नसल्याने उत्तर नाकारणे',
        'तोंडी युक्त्या न वापरण्याची तंबी देणे',
        '२५ चा पाढा १० वेळा लिहिण्याचा गृहपाठ देणे',
      ],
      exp: 'सहचारी गुणधर्मावर आधारित ही संख्या-संवेदनशील युक्ती NCF-2005 च्या तर्कशुद्ध लवचिक विचाराला प्रोत्साहन देते.',
    },
    hi: {
      q: 'संख्या-चर्चा के दौरान कक्षा 5 का छात्र `16 × 25` को मन में `8 × 50 = 4 × 100 = 400` हल करता है। शिक्षक की सबसे उपयुक्त प्रतिक्रिया क्या होगी?',
      opts: [
        'उसकी "आधा और दोगुना" युक्ति की सराहना करना और कक्षा को यह समझाना कि इससे गुणनफल क्यों अपरिवर्तित रहता है',
        'मानक ऊर्ध्वाधर विधि न अपनाने के कारण उत्तर अस्वीकार करना',
        'मन में शॉर्टकट न लगाने की सलाह देना',
        '25 का पहाड़ा बार-बार लिखने का गृहकार्य देना',
      ],
      exp: 'यह युक्ति साहचर्य गुणधर्म और उन्नत संख्या बोध को दर्शाती है, जिसे साझा करने से पूरी कक्षा की तार्किक क्षमता बढ़ती है।',
    },
  },
  {
    topic: 'Diagnostic Subtraction Across Zero Misconception',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 4 pupil writes `304 − 128 = 224` (doing `8 − 4 = 4`? No—wait: writing `3 − 1 = 2`, `2 − 0 = 2`, `8 − 4 = 4`). What systematic error pattern does this represent?',
      opts: [
        'Smaller-from-larger bug: subtracting the smaller digit from the larger digit in each column regardless of whether it sits in the minuend or subtrahend',
        'Addition instead of subtraction error',
        'Misreading the hundreds place as thousands',
        'Random guessing without place alignment',
      ],
      exp: 'In every column (`4 vs 8`, `0 vs 2`, `3 vs 1`), the pupil avoided regrouping and simply took `|top − bottom|` (`8−4=4, 2−0=2, 3−1=2`), yielding `224`.',
    },
    mr: {
      q: 'इयत्ता चौथीचा विद्यार्थी `304 − 128` ची वजाबाकी `224` अशी करतो (प्रत्येक स्तंभात `8−4=4`, `2−0=2`, `3−1=2`). ही कोणती पद्धतशीर त्रुटी (systematic bug) आहे?',
      opts: [
        'दशक मोकळा न करता प्रत्येक स्तंभात वर-खाली न पाहता मोठ्या अंकातून लहान अंक वजा करण्याची सवय',
        'वजाबाकीऐवजी बेरीज करण्याची चूक',
        'शतकाचा अंक हजार मानण्याची चूक',
        'कोणताही तर्क न लावता अंदाज लावणे',
      ],
      exp: 'हातचा न घेता प्रत्येक स्तंभातील मोठ्या अंकातून लहान अंक काढण्याची ही एक अतिशय सामान्य निदानात्मक त्रुटी आहे.',
    },
    hi: {
      q: 'कक्षा 4 का छात्र `304 − 128 = 224` लिखता है (`8−4=4, 2−0=2, 3−1=2`)। यह किस प्रकार की व्यवस्थित त्रुटि है?',
      opts: [
        'पुनर्समूहन से बचने के लिए प्रत्येक स्तंभ में ऊपर-नीचे का क्रम देखे बिना बड़े अंक में से छोटा अंक घटा देने की त्रुटि',
        'घटाव के स्थान पर जोड़ करने की त्रुटि',
        'सैकड़े को हज़ार पढ़ लेने की भूल',
        'बिना स्तंभ मिलाए अंदाज़ा लगाना',
      ],
      exp: 'प्रत्येक स्तंभ में `|ऊपर − नीचे|` कर देना "छोटे को बड़े से घटाने" वाली सामान्य पुनर्समूहन-रहित त्रुटि है।',
    },
  },
  {
    topic: 'Role Of Counterexamples Disproving False Generalizations',
    pattern: 'Pedagogical',
    difficulty: 'Pedagogical HOTS',
    en: {
      q: 'A Class 5 student claims, "Every odd number is a prime number." Instead of directly marking it wrong, the teacher asks the class to test `9` and `15`. What mathematical habit does this cultivate?',
      opts: [
        'Using counterexamples to test conjectures and verify mathematical claims with evidence',
        'Memorizing composite tables blindly',
        'Avoiding classroom debates about prime definitions',
        'Proving general theorems using single examples alone',
      ],
      exp: 'Even a single valid counterexample (`9 = 3 × 3`) disproves a universal claim ("every odd number is prime"), building logical reasoning and proof habits early.',
    },
    mr: {
      q: 'इयत्ता पाचवीचा विद्यार्थी म्हणतो, "प्रत्येक विषम संख्या ही मूळ संख्या असते." शिक्षिका थेट चूक न ठरवता `9` आणि `15` तपासायला सांगतात. यातून कोणती गणितीय सवय विकसित होते?',
      opts: [
        'विरोधी उदाहरण (Counterexample) शोधून विधानाची सत्यता पुराव्यानिशी तपासण्याची तर्कशुद्ध सवय',
        'संयुक्त संख्यांचे तक्ते पाठ करण्याची सवय',
        'वर्गात गणितीय चर्चा टाळण्याची वृत्ती',
        'एकाच उदाहरणावरून सर्व नियम सिद्ध मानण्याची सवय',
      ],
      exp: '`9 = 3 × 3` या एकाच विरोधी उदाहरणाने "सर्व विषम संख्या मूळ असतात" हे विधान चुकीचे ठरते, ज्यातून गणितीय तर्काचा पाया भक्कम होतो.',
    },
    hi: {
      q: 'एक छात्र कहता है, "हर विषम संख्या अभाज्य होती है।" शिक्षक सीधे गलत कहने के बजाय `9` और `15` की जाँच करने को कहते हैं। इससे कौन-सी गणितीय आदत विकसित होती है?',
      opts: [
        'प्रतिउदाहरण (Counterexample) द्वारा किसी अनुमान या सामान्य कथन का तार्किक परीक्षण करना',
        'यौगिक संख्याएँ बिना सोचे रटना',
        'कक्षा में बहस को रोकना',
        'केवल एक उदाहरण से सार्वभौम नियम सिद्ध कर देना',
      ],
      exp: '`9 = 3 × 3` जैसा एक ही प्रतिउदाहरण सार्वभौम गलत दावे को खंडित कर तार्किक प्रमाण कौशल सिखाता है।',
    },
  },
  {
    topic: 'Paper Folding Origami Rhombus vs Square Diagonals',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'When teaching properties of a Rhombus in Class 5, why is folding a paper rhombus along both diagonals highly effective?',
      opts: [
        'Pupils directly observe that its diagonals bisect each other at `90°` and act as lines of symmetry without requiring formal deductive geometry',
        'Because paper folding eliminates the need to teach what a diagonal is',
        'Because every rhombus has equal diagonal lengths when folded carefully',
        'Because origami is only meant for art periods and saves blackboard chalk',
      ],
      exp: 'Hands-on folding reveals that the two opposite corners meet identically (perpendicular bisectors & symmetry axes), while also showing the two diagonals themselves differ in length unless it is a square.',
    },
    mr: {
      q: 'इयत्ता पाचवीत समभुज चौकोनाचे (Rhombus) गुणधर्म शिकवताना कागदाचा समभुज चौकोन दोन्ही कर्णांवर दुमडण्याचा उपक्रम का उपयुक्त ठरतो?',
      opts: [
        'औपचारिक प्रमेयाशिवाय कर्ण परस्परांना काटकोनात दुभागतात व सममितीचे अक्ष ठरतात हे विद्यार्थी प्रत्यक्ष पाहून व अनुभवून शोधतात',
        'कारण कागद दुमडल्यामुळे कर्ण म्हणजे काय हे सांगावे लागत नाही',
        'कारण समभुज चौकोनाचे दोन्ही कर्ण नेहमी समान लांबीचे असतात',
        'कारण खडूची बचत होते',
      ],
      exp: 'कागदाच्या घड्या घातल्याने कर्णांचे परस्पर काटकोन दुभाजन व सममिती प्रत्यक्ष अनुभवातून स्पष्ट होते.',
    },
    hi: {
      q: 'कक्षा 5 में समचतुर्भुज (Rhombus) के गुण सिखाने के लिए कागज़ के समचतुर्भुज को दोनों विकर्णों के अनुदिश मोड़ना क्यों प्रभावशाली है?',
      opts: [
        'बिना औपचारिक उपपत्ति के विद्यार्थी प्रत्यक्ष देख लेते हैं कि विकर्ण परस्पर `90°` पर समद्विभाजित करते हैं और सममिति रेखाएँ बनते हैं',
        'क्योंकि इससे विकर्ण की परिभाषा बताना जरूरी नहीं रहता',
        'क्योंकि हर समचतुर्भुज के दोनों विकर्ण बराबर लंबाई के होते हैं',
        'क्योंकि इससे श्यामपट्ट पर लिखना नहीं पड़ता',
      ],
      exp: 'कागज़ मोड़ने (ओरिगेमी) से विद्यार्थी स्पर्श व दृश्य अनुभव द्वारा समकोण समद्विभाजन स्वयं खोज लेते हैं।',
    },
  },
  {
    topic: 'Informal Chance And Probability Words Class 5',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'How should informal ideas of Chance and Data prediction be introduced at the primary level (Class 4–5)?',
      opts: [
        'Through everyday likelihood discussions ("Certain", "Likely", "Unlikely", "Impossible") and tally trials with coins or colour spinners',
        'By teaching Bayes theorem and permutations formulas right away',
        'By forcing pupils to compute decimal probabilities to four places',
        'By excluding chance topics altogether until Class 11',
      ],
      exp: 'Classifying familiar events (sun rising tomorrow = certain; getting `7` on a standard die = impossible) and tallying coin flips prepares intuitive probabilistic thinking before formal formulas.',
    },
    mr: {
      q: 'प्राथमिक स्तरावर (इयत्ता ४–५) संभाव्यता व अंदाजांची अनौपचारिक कल्पना कशी रुजवावी?',
      opts: [
        'दैनंदिन घटनांचे "निश्चित, शक्य, अशक्य" असे वर्गीकरण करून व नाणी किंवा रंगांच्या फिरकीच्या (spinner) नोंदी घेऊन',
        'थेट क्रमचय-संचय (Permutations) व जटिल सूत्रे शिकवून',
        'चार दशांश स्थळांपर्यंत आकडेमोड सक्तीची करून',
        'अकरावीपर्यंत संभाव्यतेचा उल्लेख पूर्ण टाळून',
      ],
      exp: 'नाणेफेक व दैनंदिन घटनांची शक्यता तपासल्याने उच्च वर्गातील संभाव्यता शास्त्राचा सहज पाया तयार होतो.',
    },
    hi: {
      q: 'प्राथमिक स्तर (कक्षा 4–5) पर "अवसर और प्रायिकता" की अनौपचारिक समझ कैसे विकसित करनी चाहिए?',
      opts: [
        'दैनिक घटनाओं को "निश्चित, संभावित, असंभव" में बाँटकर तथा सिक्के या स्पिनर के टैली प्रयोग कराकर',
        'सीधे क्रमचय-संचय के जटिल सूत्र पढ़ाकर',
        'चार दशमलव स्थानों तक गणना अनिवार्य करके',
        'कक्षा 11 से पहले इस पर बात ही न करके',
      ],
      exp: 'सिक्का उछालने व रोज़मर्रा की संभावनाओं पर चर्चा से बच्चों में सहज सांख्यिकीय व प्रायिकता सोच बनती है।',
    },
  },
  {
    topic: 'Bridging Fractions Percentages Using Paise And Rupee',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why is connecting `50 paise = ₹0.50 = 1/2 rupee = 50%` so powerful when introducing percentages to Class 5 learners?',
      opts: [
        'Because `1 rupee = 100 paise` naturally anchors "per cent" (out of 100) in familiar currency experiences children already count',
        'Because coins are only valid for percentage sums and not fractions',
        'Because children cannot understand the `%` sign unless coins are present during exams',
        'Because decimal points are absent in Indian currency notation',
      ],
      exp: 'Since `₹1` contains `100` equal paise, every paisa literally represents `1%` of a rupee—building a seamless bridge across fractions, decimals, and percentages.',
    },
    mr: {
      q: 'इयत्ता पाचवीत शेकडेवारी शिकवताना `50 पैसे = ₹0.50 = 1/2 रुपया = 50%` हा दुवा का अत्यंत प्रभावी ठरतो?',
      opts: [
        '`1 रुपया = 100 पैसे` या परिचित नाण्यांच्या अनुभवातून "शेकडा (शंभरातून)" ही संकल्पना अपूर्णांक व दशांशाशी सहज जोडली जाते',
        'कारण नाणी फक्त शेकडेवारीसाठीच वापरली जातात',
        'कारण भारतीय चलनात दशांश चिन्ह वापरत नाहीत',
        'कारण परीक्षेत नाणी आणल्याशिवाय `%` चिन्ह कळत नाही',
      ],
      exp: '`100 पैशांचा 1 रुपया` असल्यामुळे `25 पैसे = 25%` हे नाते विद्यार्थ्यांना अत्यंत नैसर्गिकरीत्या समजते.',
    },
    hi: {
      q: 'कक्षा 5 में प्रतिशत पढ़ाते समय `50 पैसे = ₹0.50 = 1/2 रुपया = 50%` का संबंध जोड़ना क्यों अत्यंत उपयोगी होता है?',
      opts: [
        'क्योंकि `1 रुपया = 100 पैसे` बच्चों के परिचित मुद्रा अनुभव में "प्रति सैकड़ा (100 में से)" की अवधारणा को भिन्न व दशमलव से जोड़ता है',
        'क्योंकि सिक्के केवल प्रतिशत के सवालों में काम आते हैं',
        'क्योंकि भारतीय मुद्रा में दशमलव नहीं होता',
        'क्योंकि परीक्षा में बिना सिक्के देखे छात्र `%` चिह्न नहीं पहचानते',
      ],
      exp: '₹1 के 100 समान भाग (पैसे) होने से प्रतिशत, भिन्न और दशमलव का एक साथ सजीव बोध हो जाता है।',
    },
  },
  {
    topic: 'Timed Speed Drills vs Math Anxiety Impact',
    pattern: 'Pedagogical',
    difficulty: 'Pedagogical HOTS',
    en: {
      q: 'Research on primary mathematics classrooms warns that frequent high-stakes timed speed drills ("finish 40 sums in 2 minutes or stand up") often backfire. Why?',
      opts: [
        'Time pressure overloads working memory with anxiety, blocking conceptual reasoning and making capable pupils believe math equals fast guessing',
        'Because fast calculation has zero usefulness in any career',
        'Because timed drills use too much paper and ink',
        'Because students finish too quickly and go to sleep',
      ],
      exp: 'NCF-2005 notes that equating math competence with speed races breeds math anxiety and hides true conceptual sense-making behind panicked guesswork.',
    },
    mr: {
      q: 'प्राथमिक वर्गात वारंवार स्पर्धात्मक वेळेचे बंधन घालून गणिताच्या चाचण्या ("२ मिनिटांत ४० उदाहरणे सोडवा") घेतल्यास विपरीत परिणाम का होऊ शकतो?',
      opts: [
        'वेळेच्या दबावामुळे ताण वाढून विद्यार्थ्यांची कार्यरत स्मृती (working memory) बाधित होते आणि गणित म्हणजे फक्त वेगवान रटाळपणा असा गैरसमज निर्माण होतो',
        'कारण गणिताच्या जलद आकडेमोडीचा भविष्यात काहीच उपयोग नसतो',
        'कारण त्यात खूप कागद वाया जातात',
        'कारण विद्यार्थी लवकर सोडवून झोपतात',
      ],
      exp: 'तणावपूर्ण वेग-स्पर्धा गणित-भीती वाढवते; त्याऐवजी अचूकता, रणनीती व तर्कशुद्ध समज यांवर भर देणे आवश्यक असते.',
    },
    hi: {
      q: 'प्राथमिक कक्षाओं में बार-बार समय-बद्ध गति दौड़ ("2 मिनट में 40 सवाल करो वरना खड़े रहो") अक्सर नुकसानदेह क्यों सिद्ध होती है?',
      opts: [
        'समय के दबाव की चिंता कार्यशील स्मृति (working memory) को अवरुद्ध करती है और गणित-भय पैदा करके अवधारणात्मक समझ को दबा देती है',
        'क्योंकि गणना की गति का जीवन में कोई उपयोग नहीं है',
        'क्योंकि इससे कक्षा का समय बहुत बच जाता है',
        'क्योंकि सभी बच्चे बिना अभ्यास के ही सब सीख जाते हैं',
      ],
      exp: 'NCF-2005 के अनुसार गणित को केवल तेज़ रफ्तार की दौड़ बना देने से बच्चों में गणित का डर पनपता है।',
    },
  },
  {
    topic: 'Measurement Anchor Benchmarks Everyday Objects',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why should Class 3–4 learners build personal "measurement benchmarks" (e.g., little finger width ≈ `1 cm`, classroom door height ≈ `2 m`, water bottle = `1 L`)?',
      opts: [
        'Anchor benchmarks help pupils estimate measurements realistically in daily life and spot impossible calculator/arithmetic answers quickly',
        'So schools do not have to buy plastic scales or weighing pans',
        'To replace exact standard measurements permanently with body estimates',
        'Because metric units change from district to district',
      ],
      exp: 'Real-world benchmarks foster reasonableness checks—for instance, immediately recognizing that calculating a pupil’s height as `14 metres` or `1400 cm` must be a decimal/unit error.',
    },
    mr: {
      q: 'इयत्ता तिसरी-चौथीतील मुलांनी वैयक्तिक "मापन संदर्भ मानके" (जसे करंगळीची रुंदी ≈ `1 सेमी`, दाराची उंची ≈ `2 मी`, बाटली = `1 लि`) का लक्षात ठेवावीत?',
      opts: [
        'रोजच्या जीवनात अचूक अंदाज बांधण्यासाठी व गणितात आलेले असंभव उत्तर (उदा. मुलाची उंची `14 मीटर`) चटकन ओळखण्यासाठी',
        'जेणेकरून शाळेला मोजपट्टी विकत घ्यावी लागणार नाही',
        'प्रमाणित मापनाऐवजी कायमचे शरीराचे अंदाजे माप वापरण्यासाठी',
        'कारण जिल्ह्यानुसार मेट्रिक एकके बदलतात',
      ],
      exp: 'संदर्भ मानकांमुळे मापनाचे वास्तव भान येते व गणितातील मोठ्या एकक-चुका विद्यार्थी स्वतःच पकडू शकतात.',
    },
    hi: {
      q: 'कक्षा 3–4 के विद्यार्थियों को व्यक्तिगत "मापन संदर्भ मानक" (जैसे छोटी उँगली की चौड़ाई ≈ `1 सेमी`, दरवाज़ा ≈ `2 मी`) क्यों बनाने चाहिए?',
      opts: [
        'दैनिक जीवन में सटीक अनुमान लगाने और गणना में आई अव्यावहारिक त्रुटियों (जैसे छात्र की ऊँचाई `14 मी`) को तुरंत पहचानने के लिए',
        'ताकि विद्यालय को स्केल या तराजू न खरीदने पड़ें',
        'मानक इकाइयों को हमेशा के लिए हटाने के लिए',
        'क्योंकि हर जिले में मीटर की लंबाई अलग होती है',
      ],
      exp: 'संदर्भ मानक मापन की व्यावहारिक समझ और उत्तर की तर्कसंगतता जाँचने में मदद करते हैं।',
    },
  },
  {
    topic: 'Reversing Digits Mirror Writing Remediation Class 2',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 2 pupil frequently writes `31` when asked for `13` and writes digits `5` or `7` mirrored backward. What is the MOST constructive supportive step?',
      opts: [
        'Provide multisensory tracing (sand tray, raised clay numerals) paired with Base-10 bundles (`1` ten-stick + `3` loose units) before judging speed',
        'Label the child careless and assign 100 punishment lines daily',
        'Promote immediate timed dictation tests without any concrete tools',
        'Ask parents to stop reading storybooks at home',
      ],
      exp: 'Tactile directional tracing strengthens visual-motor spatial directionality, while concrete ten-bundles clarify why `13` (`1` ten, `3` ones) differs fundamentally from `31` (`3` tens, `1` one).',
    },
    mr: {
      q: 'इयत्ता दुसरीचा एक विद्यार्थी `13` ऐवजी `31` लिहितो आणि काही वेळा `5` किंवा `7` आरशातील प्रतिमेप्रमाणे उलटा काढतो. शिक्षकाने कोणती रचनात्मक मदत करावी?',
      opts: [
        'वाळूतील किंवा चिकणमातीवरील बोटाने गिरवण्याचा बहु-संवेदी सराव आणि `1 दशक काडी + 3 सुटे मणी` असे मूर्त स्पष्टीकरण देणे',
        'निष्काळजी ठरवून रोज १०० वेळा लिहिण्याची शिक्षा देणे',
        'कोणत्याही साधनाशिवाय तात्काळ वेगवान श्रुतलेखन चाचणी घेणे',
        'पालकांना घरी गोष्टींची पुस्तके वाचणे बंद करण्यास सांगणे',
      ],
      exp: 'स्पर्शजन्य लेखन सरावाने अंकांची दिशा स्पष्ट होते आणि दशक-एकक गठ्ठ्यांनी `13` व `31` मधील फरक पक्का होतो.',
    },
    hi: {
      q: 'कक्षा 2 का एक बच्चा `13` के स्थान पर `31` लिखता है और कभी-कभी `5` या `7` उल्टा बनाता है। सबसे रचनात्मक सहायता क्या होगी?',
      opts: [
        'रेत की ट्रे या उभरे हुए अंकों पर उँगली फेरने का बहु-संवेदी अभ्यास तथा `1 दहाई बंडल + 3 इकाई` से स्थानीय मान स्पष्ट करना',
        'लापरवाह मानकर रोज़ 100 बार लिखने की सज़ा देना',
        'बिना किसी सामग्री के तेज़ गति श्रुतलेख परीक्षा लेना',
        'घर पर कहानी की किताबें पढ़ना बंद करवाना',
      ],
      exp: 'बहु-संवेदी ट्रेसिंग से दिशा-भ्रम दूर होता है और बंडलों से `13` बनाम `31` का स्थान-मान अंतर स्पष्ट होता है।',
    },
  },
  {
    topic: 'Inclusive Tactile Geometry Visually Impaired Students',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'To include a student with severe visual impairment actively in a Class 4 Symmetry and Triangles lesson, which adaptation works BEST?',
      opts: [
        'Supplying raised embossed cardboard shapes, tactile peg-boards/geoboards with rubber bands, and Braille-notched rulers paired with peer oral description',
        'Giving the student an unrelated audio story to listen to at the back desk',
        'Exempting the child from all geometry activities permanently',
        'Drawing shapes with a thicker yellow marker on the distant whiteboard',
      ],
      exp: 'RPwD Act 2016 and NEP-2020 mandate Universal Design for Learning: tactile embossed outlines, geoboards, and Braille measuring tools let learners with low/no vision construct and verify geometry directly by touch.',
    },
    mr: {
      q: 'इयत्ता चौथीतील सममिती व त्रिकोण या पाठात तीव्र दृष्टिबाधित विद्यार्थ्याचा सक्रिय सहभाग होण्यासाठी सर्वोत्तम समावेशक अनुकूलन कोणते?',
      opts: [
        'उठावदार स्पर्शजन्य पुठ्ठ्याचे आकार, रबर बँड असलेला स्पर्श-जिओबोर्ड आणि ब्रेल खुणांची मोजपट्टी उपलब्ध करून देणे',
        'विद्यार्थ्याला मागील बाकावर बसवून इतर गोष्टी ऐकायला सांगणे',
        'विद्यार्थ्याला सर्व भूमिती उपक्रमांतून कायमची सूट देणे',
        'दूरच्या फळ्यावर पिवळ्या मार्करने आकृती गडद करणे',
      ],
      exp: 'उठावदार आकार, जिओबोर्ड आणि ब्रेल साधनांमुळे दृष्टिबाधित विद्यार्थी स्पर्शातून स्वतः भूमितीय गुणधर्म तपासू शकतात.',
    },
    hi: {
      q: 'कक्षा 4 के सममिति और त्रिभुज पाठ में गंभीर दृष्टिबाधित विद्यार्थी की सक्रिय भागीदारी सुनिश्चित करने हेतु सर्वोत्तम अनुकूलन क्या होगा?',
      opts: [
        'उभरी हुई स्पर्शनीय ज्यामितीय आकृतियाँ, रबर बैंड वाला जियोबोर्ड और ब्रेल चिह्नित स्केल उपलब्ध कराना',
        'बच्चे को पीछे बैठाकर कोई अलग कहानी सुनने देना',
        'बच्चे को सभी ज्यामिति गतिविधियों से हमेशा के लिए छूट देना',
        'दूर श्यामपट्ट पर मोटे पीले मार्कर से बनाना',
      ],
      exp: 'उभरी आकृतियाँ और जियोबोर्ड (यूनिवर्सल डिज़ाइन) दृष्टिबाधित विद्यार्थियों को स्पर्श द्वारा ज्यामितीय अनुभव प्रदान करते हैं।',
    },
  },
  {
    topic: 'Deaf Hearing Impaired Math Storyboard Visualization',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 3 student with hearing loss understands numerical calculations well when written as `24 + 15`, yet struggles with long verbal word problems read aloud by the teacher. What helps MOST?',
      opts: [
        'Supporting word problems with clear printed text, visual comic-strip storyboards, ISL/gestural cues, and acting out the problem concretely',
        'Speaking twice as loudly while facing away toward the blackboard',
        'Assigning only bare drill equations and skipping story contexts forever',
        'Evaluating the child solely on oral table recitation',
      ],
      exp: 'Visual access (never turning away from the learner when speaking), illustrated step-by-step problem cards, and role-play translate language barriers into clear mathematical situations.',
    },
    mr: {
      q: 'श्रवणदोष असलेला इयत्ता तिसरीचा विद्यार्थी `24 + 15` अशी संख्यात्मक उदाहरणे छान सोडवतो, पण शिक्षकाने तोंडी वाचलेल्या शाब्दिक उदाहरणांत गोंधळतो. सर्वात उपयुक्त मदत कोणती?',
      opts: [
        'शाब्दिक उदाहरणे लिखित कार्डावर, चित्रकथेच्या (storyboard) रूपात आणि नाट्यीकरण व सांकेतिक भाषेच्या मदतीने सादर करणे',
        'फळ्याकडे तोंड करून जोरात ओरडून वाचणे',
        'शाब्दिक उदाहरणे कायमची वगळून फक्त बेरजेची पाने देणे',
        'केवळ तोंडी पाढ्यांवर मूल्यमापन करणे',
      ],
      exp: 'चित्ररूप सादरीकरण, लिखित मजकूर आणि कृतियुक्त नाट्यीकरणामुळे श्रवणबाधित विद्यार्थ्याला प्रश्नातील गणितीय संदर्भ स्पष्ट समजतो.',
    },
    hi: {
      q: 'श्रवणबाधित कक्षा 3 का छात्र `24 + 15` आसानी से हल करता है, परंतु शिक्षक द्वारा मौखिक पढ़े गए लंबे इबारती प्रश्नों में उलझ जाता है। सबसे अधिक मदद क्या करेगी?',
      opts: [
        'प्रश्नों को लिखित पाठ, चित्र-कथा (स्टोरीबोर्ड), सांकेतिक भाषा और अभिनय/भूमिका-निर्वहन के साथ प्रस्तुत करना',
        'श्यामपट्ट की ओर मुँह करके दोगुनी आवाज़ में बोलना',
        'इबारती सवाल हमेशा के लिए हटाकर केवल जोड़ के सवाल देना',
        'केवल मौखिक पहाड़े सुनकर मूल्यांकन करना',
      ],
      exp: 'लिखित और चित्रात्मक स्टोरीबोर्ड तथा प्रत्यक्ष अभिनय भाषा की बाधा दूर कर गणितीय स्थिति को स्पष्ट करते हैं।',
    },
  },
  {
    topic: 'Inductive Exploration Divisibility Rule Of 9',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 5 teacher asks students to list ten multiples of `9` (`18, 27, 36, 45, 54, 108, 234...`), add the digits of each number, notice the pattern, and formulate a rule before testing `7,452`. Which teaching sequence is this?',
      opts: [
        'Inductive-to-Deductive approach — discovering a general pattern from specific examples first, then applying the rule to new cases',
        'Pure rote conditioning without testing examples',
        'Deductive memorization starting from an unproved rule on day one',
        'Historical storytelling unrelated to divisibility',
      ],
      exp: 'Observing multiple instances (`1+8=9`, `2+7=9`, `1+0+8=9`) inductively leads pupils to hypothesize the divisibility test for `9`, then verify/apply it deductively to `7,452`.',
    },
    mr: {
      q: 'इयत्ता पाचवीचे शिक्षक मुलांना `9` च्या पाढ्यातील `18, 27, 36, 45, 108, 234` संख्यांच्या अंकांची बेरीज करून नियम शोधायला सांगतात आणि नंतर तो `7,452` वर तपासतात. ही कोणती अध्यापन पद्धती आहे?',
      opts: [
        'उद्गामी-ते-अवगामी (Inductive-to-Deductive) पद्धती — विशिष्ट उदाहरणांतून नियम शोधून तो नवीन संख्येवर लागू करणे',
        'कोणत्याही तपासणीशिवाय घोकंपट्टी करणे',
        'पहिल्याच मिनिटाला नियम पाठ करून घेणे',
        'विभाज्यतेशी संबंध नसलेली गोष्ट सांगणे',
      ],
      exp: 'विविध उदाहरणांतील पॅटर्न निरीक्षणातून नियम स्वतः शोधणे (उद्गामी) आणि नंतर मोठ्या संख्येवर तपासणे (अवगामी) यामुळे नियम कायमचा लक्षात राहतो.',
    },
    hi: {
      q: 'कक्षा 5 के शिक्षक बच्चों से `18, 27, 36, 108, 234` के अंक जोड़कर पैटर्न खोजने को कहते हैं और फिर नियम को `7,452` पर परखते हैं। यह कौन-सी शिक्षण विधि है?',
      opts: [
        'आगमन-से-निगमन विधि (Inductive-to-Deductive) — विशिष्ट उदाहरणों से नियम खोजना और फिर नए उदाहरण पर लागू करना',
        'केवल बिना तर्क के नियम रटवाना',
        'प्रथम दिन ही बिना प्रमाण के सूत्र लिखवा देना',
        'केवल ऐतिहासिक कहानी सुनाना',
      ],
      exp: 'उदाहरणों के पैटर्न से स्वयं नियम निकालना (आगमन) और उसका अनुप्रयोग करना (निगमन) प्राथमिक कक्षाओं के लिए सर्वश्रेष्ठ है।',
    },
  },
  {
    topic: 'Laboratory Method Volume Capacity Litre Cubic Centimetre',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Which hands-on Laboratory Method experiment convinces Class 5 students that `1 litre` equals `1,000 cubic centimetres` (`10 cm × 10 cm × 10 cm`)?',
      opts: [
        'Pouring a full `1-litre` measured water bottle cleanly into a waterproof hollow cube whose internal sides measure `10 cm × 10 cm × 10 cm`',
        'Writing "`1 L = 1,000 cm³`" twenty times on the left page of the notebook',
        'Measuring the perimeter of a textbook using a plastic scale',
        'Comparing two balloons filled with air by blowing into them',
      ],
      exp: 'Watching `1 L` of liquid fill a `10 cm`-edge hollow cube right to the brim creates an unforgettable physical link between capacity (`litres`) and spatial volume (`cm³`).',
    },
    mr: {
      q: 'इयत्ता पाचवीच्या मुलांना `1 लिटर = 1,000 घन सेमी` (`10 सेमी × 10 सेमी × 10 सेमी`) हे प्रत्यक्ष पटवून देण्यासाठी कोणता प्रयोगशाळा पद्धतीचा उपक्रम सर्वोत्तम आहे?',
      opts: [
        'मोजलेल्या `1 लिटर` पाण्याची बाटली आतील बाजू `10 सेमी` असलेल्या पोकळ घनाकृती भांड्यात ओतून ती काठोकाठ भरते हे दाखवणे',
        '"`1 लि = 1,000 घ.सेमी.`" हे वहीत वीस वेळा लिहून घेणे',
        'पाठ्यपुस्तकाची परिमिती मोजपट्टीने मोजणे',
        'दोन फुग्यांत हवा भरून तुलना करणे',
      ],
      exp: '`10 सेमी × 10 सेमी × 10 सेमी` घनात `1 लिटर` पाणी तंतोतंत मावते हे प्रत्यक्ष पाहिल्याने धारकता व घनफळ यांतील नाते पक्के होते.',
    },
    hi: {
      q: 'कक्षा 5 के विद्यार्थियों को यह प्रत्यक्ष सिद्ध करके दिखाने के लिए कि `1 लीटर = 1,000 घन सेमी` (`10 सेमी × 10 सेमी × 10 सेमी`), कौन-सा प्रयोग सबसे उपयुक्त है?',
      opts: [
        '`1 लीटर` मापी गई पानी की बोतल को `10 सेमी` आंतरिक भुजा वाले खोखले घन डिब्बे में उड़ेलकर पूरा भरते हुए दिखाना',
        '"`1 ली = 1,000 घन सेमी`" कॉपी में बीस बार लिखवाना',
        'पुस्तक का परिमाप स्केल से नापना',
        'गुब्बारों में हवा भरकर तुलना करना',
      ],
      exp: 'प्रयोगशाला विधि द्वारा `1 लीटर` पानी का `10 सेमी` वाले घन में ठीक भर जाना आयतन और धारिता के संबंध को सजीव बना देता है।',
    },
  },
  {
    topic: 'Formative Exit Ticket Prompt Writing Word Story From Equation',
    pattern: 'Classroom Scenario',
    difficulty: 'Pedagogical HOTS',
    en: {
      q: 'At the end of a lesson, the teacher gives an Exit Slip prompt: "Write your own real-life story problem whose solution uses `24 ÷ 6`." What higher-order skill does this assess?',
      opts: [
        'Translating symbolic mathematical operations back into meaningful real-world contexts (problem posing and conceptual transfer)',
        'Handwriting neatness and spelling speed only',
        'Mechanical memorization of division tables up to 10',
        'Ability to copy teacher examples from the blackboard verbatim',
      ],
      exp: 'Problem posing forces students to think carefully about equal sharing (`24` sweets among `6` friends) or grouping (`6` per packet), revealing far deeper comprehension than solving bare `24 ÷ 6 = ___`.',
    },
    mr: {
      q: 'पाठाच्या शेवटी शिक्षिका निरोप चिठ्ठीवर (Exit Slip) देतात: "`24 ÷ 6` या क्रियेवर आधारित तुमच्या स्वतःच्या अनुभवातील एक शाब्दिक उदाहरण तयार करा." यातून कोणते उच्च कौशल्य तपासले जाते?',
      opts: [
        'अमूर्त गणितीय चिन्हांचे दैनंदिन वास्तव जीवनातील संदर्भात रूपांतर करण्याची व प्रश्ननिर्मितीची सखोल क्षमता',
        'फक्त हस्ताक्षराची स्वच्छता आणि लेखन वेग',
        '१० पर्यंतचे पाढे पाठांतर करण्याची क्षमता',
        'फळ्यावरील मजकूर जसाच्या तसा उतरवण्याचे कौशल्य',
      ],
      exp: 'स्वतः शाब्दिक प्रश्न तयार करताना विद्यार्थ्याला समान वाटणी किंवा गट करणे या भागाकाराच्या गाभ्याचा विचार करावा लागतो.',
    },
    hi: {
      q: 'पाठ के अंत में शिक्षिका एक एग्ज़िट स्लिप देती हैं: "`24 ÷ 6` से हल होने वाला अपना एक वास्तविक जीवन का इबारती प्रश्न बनाइए।" इससे किस उच्च कौशल का आकलन होता है?',
      opts: [
        'प्रतीकात्मक गणितीय संक्रिया को सार्थक वास्तविक संदर्भ में रूपांतरित करने (प्रश्न-निर्माण और अवधारणात्मक अंतरण) की क्षमता',
        'केवल सुंदर लिखावट और लिखने की गति',
        'पहाड़े रटने की क्षमता',
        'श्यामपट्ट से हूबहू नकल उतारने का कौशल',
      ],
      exp: 'स्वयं प्रश्न गढ़ना (Problem Posing) यह जाँचता है कि छात्र वास्तव में भाग की समान-वितरण या समूहन प्रकृति समझता है या नहीं।',
    },
  },
  {
    topic: 'Capacity Measurement Error Reading Eye Level Meniscus',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'While measuring `250 mL` of water using a graduated beaker on a desk, a student stands up and reads the scale steeply from above, reporting `235 mL`. What procedural habit should the teacher demonstrate?',
      opts: [
        'Keeping the cylinder on a flat horizontal surface and lowering eyes horizontally level with the water mark to avoid parallax error',
        'Tilting the measuring jar at a 45-degree angle while reading',
        'Estimating liquid volume by shaking the container',
        'Reading only the highest splash droplet on the glass rim',
      ],
      exp: 'Reading a graduated scale from above or below creates parallax error; flat placement and eye-level alignment ensure accurate capacity measurement.',
    },
    mr: {
      q: 'टेबलावर ठेवलेल्या मापन पात्रात `250 मिली` पाणी मोजताना विद्यार्थी उभे राहून वरून तिरके पाहतो आणि चुकीने `235 मिली` नोंदवतो. शिक्षकांनी कोणती योग्य सवय दाखवावी?',
      opts: [
        'मापन पात्र सपाट पृष्ठभागावर ठेवून डोळे अगदी पाण्याच्या पातळीशी समतल (eye-level) आणून अचूक वाचन करणे',
        'वाचताना पात्र ४५ अंशांत तिरके पकडणे',
        'पाणी हलवून आवाजावरून अंदाज लावणे',
        'काचेच्या कडेवरील सर्वात वरच्या थेंबावर आधारित वाचन करणे',
      ],
      exp: 'पाण्याच्या पातळीशी डोळे समतल ठेवल्याने दृष्टिक्षेप त्रुटी (parallax error) टळते व अचूक धारकता मोजली जाते.',
    },
    hi: {
      q: 'मेज़ पर रखे मापक बीकर में `250 मिली` पानी मापते समय एक छात्र खड़े होकर ऊपर से तिरछा देखता है और `235 मिली` पढ़ता है। शिक्षक को कौन-सी सही प्रक्रिया सिखानी चाहिए?',
      opts: [
        'मापक पात्र को समतल सतह पर रखकर आँखों को ठीक पानी के तल की सीध (eye-level) में लाकर पढ़ना',
        'पढ़ते समय बीकर को 45° पर झुका लेना',
        'बोतल हिलाकर आवाज़ से आयतन आंकना',
        'ग्लास की ऊपरी किनारी पर लगी बूंदों से माप लेना',
      ],
      exp: 'समतल सतह और आँख के समतल स्तर से पढ़ने से लंबन त्रुटि (parallax error) नहीं होती।',
    },
  },
  {
    topic: 'Angle Concept Dynamic Turn Before Static Two Rays',
    pattern: 'Pedagogical',
    difficulty: 'Pedagogical HOTS',
    en: {
      q: 'When introducing "Angle" to Class 4 students, why is starting with dynamic turning experiences (opening a classroom door, clock hands rotating, pivoting one’s arm) better than jumping straight to static textbook drawings?',
      opts: [
        'Experiencing angle as an "amount of turn" clears away the later misconception that longer drawn ray arms create a bigger angle',
        'Because children cannot recognize straight lines in Class 4',
        'Because doors always swing exclusively to `90°`',
        'So teachers never have to introduce vertices or degree units',
      ],
      exp: 'Understanding angle as degree of rotation (turn) explains intuitively why ray length is irrelevant and connects seamlessly to reading a protractor scale.',
    },
    mr: {
      q: 'इयत्ता चौथीच्या विद्यार्थ्यांना "कोन" शिकवताना पुस्तकातील स्थिर आकृत्यांऐवजी दार उघडणे, घड्याळाचे काटे फिरवणे किंवा हाताची हालचाल यांतून सुरुवात करणे का अधिक चांगले असते?',
      opts: [
        'कोन म्हणजे "वळणाचे प्रमाण (amount of turn)" हे अनुभवल्यामुळे "लांब भुजा म्हणजे मोठा कोन" हा पुढील गैरसमज मूळातून टळतो',
        'कारण चौथीतील मुलांना सरळ रेषा ओळखता येत नाहीत',
        'कारण दार नेहमी फक्त `90°` वरच उघडते',
        'जेणेकरून शिरोबिंदू व अंशांची माहिती द्यावी लागू नये',
      ],
      exp: 'वळणाच्या गतिशील अनुभवातून कोनाचे माप रेषांच्या लांबीवर नव्हे तर फिरण्याच्या अंशावर अवलंबून असते हे सहज पटते.',
    },
    hi: {
      q: 'कक्षा 4 में "कोण" की शुरुआत स्थिर चित्रों के बजाय दरवाज़ा खोलने, घड़ी की सुई घुमाने या बाँह मोड़ने जैसे गतिशील अनुभवों से करना क्यों बेहतर है?',
      opts: [
        'कोण को "घुमाव की मात्रा (amount of turn)" के रूप में अनुभव करने से यह भ्रम नहीं बनता कि लंबी भुजाओं वाला कोण बड़ा होता है',
        'क्योंकि कक्षा 4 के बच्चे सीधी रेखा नहीं पहचानते',
        'क्योंकि दरवाज़ा हमेशा केवल `90°` तक ही खुलता है',
        'ताकि कोणमापक या डिग्री पढ़ाने की आवश्यकता न पड़े',
      ],
      exp: 'घुमाव के रूप में कोण समझने से बच्चे जान जाते हैं कि कोण भुजा की लंबाई पर नहीं बल्कि झुकाव/घूर्णन पर निर्भर है।',
    },
  },
  {
    topic: 'Same Area Different Perimeters 12 Square Tiles Discovery',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A teacher gives pairs of Class 5 pupils `12` identical square tiles and asks them to build every distinct rectangle possible (`1×12`, `2×6`, `3×4`) and record both Area and Perimeter. What key insight does this investigation unlock?',
      opts: [
        'Shapes with the exact same area (`12 sq units`) can have very different perimeters (`26, 16, 14 units`), breaking the false "same area implies same perimeter" rule',
        'Rectangles become smaller in area when packed more compactly',
        'Area is always numerically greater than perimeter for every rectangle',
        'Only squares can be built from `12` unit tiles',
      ],
      exp: 'Comparing `1×12` (P = `26`), `2×6` (P = `16`), and `3×4` (P = `14`) visually demonstrates that compact shapes enclose the same area with less boundary length.',
    },
    mr: {
      q: 'इयत्ता पाचवीच्या विद्यार्थ्यांना `12` समान चौरसाकृती तुकड्यांपासून सर्व शक्य आयत (`1×12`, `2×6`, `3×4`) तयार करून प्रत्येकाचे क्षेत्रफळ व परिमिती नोंदवायला सांगितले. या शोधातून कोणते मुख्य सत्य उलगडते?',
      opts: [
        'समान क्षेत्रफळ (`12 चौ. एकक`) असणाऱ्या आकृत्यांची परिमिती वेगवेगळी (`26, 16, 14`) असू शकते, ज्यामुळे "क्षेत्रफळ समान तर परिमिती समान" हा गैरसमज दूर होतो',
        'आकृती आटोपशीर मांडल्यास तिचे क्षेत्रफळ कमी होते',
        'सर्व आयतांचे क्षेत्रफळ नेहमी परिमितीपेक्षा मोठेच असते',
        '१२ तुकड्यांपासून फक्त चौरसच बनतो',
      ],
      exp: 'एकच १२ तुकड्यांचे क्षेत्रफळ ठेवून मांडणी बदलल्यास कडांची एकूण लांबी (परिमिती) कशी बदलते हे प्रत्यक्ष प्रयोगातून स्पष्ट होते.',
    },
    hi: {
      q: 'शिक्षक कक्षा 5 के विद्यार्थियों को `12` एकसमान वर्गाकार टाइलें देकर सभी संभावित आयत (`1×12`, `2×6`, `3×4`) बनाने तथा उनका क्षेत्रफल व परिमाप लिखने को कहते हैं। इससे कौन-सा मुख्य निष्कर्ष निकलता है?',
      opts: [
        'समान क्षेत्रफल (`12 वर्ग इकाई`) वाली आकृतियों के परिमाप भिन्न-भिन्न (`26, 16, 14`) हो सकते हैं, जिससे "समान क्षेत्रफल = समान परिमाप" का भ्रम टूटता है',
        'कॉम्पैक्ट आकृति बनाने से क्षेत्रफल घट जाता है',
        'हर आयत का क्षेत्रफल परिमाप से सदैव बड़ा होता है',
        '12 टाइलों से केवल एक वर्ग ही बन सकता है',
      ],
      exp: 'एक ही 12 टाइलों को अलग-अलग विन्यास में सजाने से दिखता है कि क्षेत्रफल समान रहते हुए भी बाहरी घेरा (परिमाप) बदलता है।',
    },
  },
  {
    topic: 'Mother Tongue Local Fraction Words Bridge Marathi Hindi',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Many Maharashtra primary pupils already hear market words like `पाव` (quarter), `अर्धा` (half), `पाऊण` (three-quarters), and `सवा` (`1¼`) before formal fraction symbols. How should a teacher use this?',
      opts: [
        'Use children’s familiar community vocabulary as a natural conceptual scaffold directly alongside symbolic notation `1/4, 1/2, 3/4, 1¼`',
        'Forbid local fraction words in class because they do not sound English',
        'Teach symbolic notation first and mention local words only in Class 7',
        'Tell parents that `पाऊण` and `सवा` confuse subtraction algorithms',
      ],
      exp: 'NEP-2020 and NCF-FS emphasize Funds of Knowledge: linking `पाव–अर्धा–पाऊण` and clock/weight phrases (`पावणे दोन`, `सवा किलो`) to written fractions builds effortless comprehension.',
    },
    mr: {
      q: 'महाराष्ट्रातील प्राथमिक विद्यार्थी बाजारात व घरी `पाव, अर्धा, पाऊण, सवा` हे शब्द आधीच वापरतात. शिक्षकाने या पूर्वज्ञानाचा वापर अपूर्णांक शिकवताना कसा करावा?',
      opts: [
        'या परिचित लोकव्यवहारातील शब्दांना भक्कम आधार मानून त्यांची थेट `1/4, 1/2, 3/4, 1¼` या गणितीय चिन्हांशी जोड घालून द्यावी',
        'हे स्थानिक शब्द शाळेत वापरण्यास बंदी घालावी',
        'प्रथम फक्त चिन्हे शिकवून सातवीत स्थानिक शब्दांचा उल्लेख करावा',
        '`पाऊण` व `सवा` मुळे वजाबाकी बिघडते असे सांगावे',
      ],
      exp: 'विद्यार्थ्याच्या दैनंदिन अनुभवातील भाषा (`पाव लिटर`, `पाऊण तास`) आणि औपचारिक चिन्हे यांचा सेतू बांधल्याने अपूर्णांक जीवंत होतात.',
    },
    hi: {
      q: 'कई बच्चे स्कूल आने से पहले ही घर व बाज़ार में `पाव, आधा, पौन, सवा` जैसे शब्द जानते हैं। शिक्षक को भिन्न पढ़ाते समय इनका उपयोग कैसे करना चाहिए?',
      opts: [
        'इन परिचित सामुदायिक शब्दों को आधार (scaffolding) बनाकर इन्हें सीधे `1/4, 1/2, 3/4, 1¼` के प्रतीकात्मक रूप से जोड़ना चाहिए',
        'कक्षा में इन स्थानीय शब्दों के प्रयोग पर प्रतिबंध लगा देना चाहिए',
        'केवल अंग्रेजी शब्द ही बोलने का नियम बनाना चाहिए',
        'अभिभावकों से इन शब्दों को बोलना बंद करने को कहना चाहिए',
      ],
      exp: 'NEP-2020 बच्चों की मातृभाषा व दैनिक अनुभवों को औपचारिक गणितीय प्रतीकों से जोड़ने का पुरज़ोर समर्थन करती है।',
    },
  },
  {
    topic: 'Productive Struggle vs Teacher Rescuing Immediately',
    pattern: 'Classroom Scenario',
    difficulty: 'Pedagogical HOTS',
    en: {
      q: 'When a Class 4 student gets stuck midway through a two-step problem, what happens if the teacher immediately takes the pencil and writes the next line for the child?',
      opts: [
        'It removes the student’s cognitive ownership ("productive struggle"), breeding learned helplessness rather than independent problem-solving confidence',
        'It guarantees deeper long-term retention of multi-step reasoning',
        'It satisfies Vygotsky’s principle of fading support accurately',
        'It prevents peers from talking during group work',
      ],
      exp: 'Optimal scaffolding asks a minimal guiding prompt ("What information have we found so far, and what is still missing?") instead of taking over the thinking.',
    },
    mr: {
      q: 'इयत्ता चौथीचा विद्यार्थी दोन-टप्प्यांच्या उदाहरणात मध्यभागी अडखळतो तेव्हा शिक्षकाने ताबडतोब पेन्सिल हातात घेऊन पुढची पायरी स्वतः लिहून दिली तर काय नुकसान होते?',
      opts: [
        'विद्यार्थ्याचा विचार करण्याचा "सकारात्मक संघर्ष (Productive Struggle)" हिरावला जातो व त्याच्यात स्वावलंबनाऐवजी परावलंबी वृत्ती वाढते',
        'त्यामुळे विद्यार्थ्याचे दीर्घकालीन तर्कशास्त्र पक्के होते',
        'वायगॉट्स्कीच्या मते हीच सर्वोत्तम मदत मानली जाते',
        'त्यामुळे गटातील संभाषण अधिक सखोल होते',
      ],
      exp: 'स्वतः लिहून देण्याऐवजी "आपण आत्तापर्यंत काय शोधले आणि पुढे काय हवे आहे?" असा सूक्ष्म मार्गदर्शक प्रश्न विचारणे योग्य ठरते.',
    },
    hi: {
      q: 'यदि कोई छात्र दो-चरणीय प्रश्न के बीच में अटक जाता है और शिक्षक तुरंत उसकी कॉपी लेकर अगला चरण स्वयं लिख देते हैं, तो इसका क्या नकारात्मक प्रभाव पड़ता है?',
      opts: [
        'विद्यार्थी का संज्ञानात्मक स्वामित्व और "सार्थक संघर्ष (Productive Struggle)" छिन जाता है, जिससे स्वतंत्र समस्या-समाधान का आत्मविश्वास नहीं बनता',
        'इससे उसकी दीर्घकालिक तार्किक स्मृति मजबूत होती है',
        'यह वाइगोत्स्की के मचान हटाने (fading) का आदर्श रूप है',
        'इससे अन्य छात्र भी तेजी से तर्क करना सीखते हैं',
      ],
      exp: 'सीधे उत्तर लिख देने के बजाय छोटा-सा संकेत या मार्गदर्शक प्रश्न पूछकर बच्चे को स्वयं सोचने का अवसर देना चाहिए।',
    },
  },
];
