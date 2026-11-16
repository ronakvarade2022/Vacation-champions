import { CuratedTrilingualMcq } from './types';

// Batch 3 Primary Mathematics Pedagogy Part 4 (24 verified trilingual MCQs)
export const MAHA_TET_P1_B3_MATH_PED4: CuratedTrilingualMcq[] = [
  {
    topic: '10-to-1 Exchange Bank Game for Regrouping',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'In the "10-for-1 Bank Exchange" dice game, pupils earn unit beads each roll and MUST trade any pile of `10` units for `1` tens-rod immediately. Which arithmetic concept does this rule turn into joyous second nature?',
      opts: [
        'Base-10 carrying/regrouping ("10 ones pack neatly into 1 ten") during vertical addition',
        'Deleting tens columns completely',
        'Counting purely in dozens (`12`s)',
        'Ignoring leftover unit beads forever',
      ],
      exp: 'Physical 10-for-1 trading embeds why `1` carried to the tens column truly represents a bundle of `10` ones.',
    },
    mr: {
      q: '"१० सुट्या मण्यांच्या बदल्यात १ दशकाची काडी बँकेकडून घ्या" या फाशांच्या खेळामुळे वर्गात कोणती गणितीय प्रक्रिया आनंददायी सवय बनते?',
      opts: [
        'उभ्या बेरजेतील हातचा घेणे / दशकाचे गठ्ठे करणे ("१० एकक = १ दशक") या नियमाचा प्रत्यक्ष अनुभव',
        'दशक स्थान कायमचे काढून टाकणे',
        'फक्त १२ च्या डझनमध्ये मोजणे',
        'शिल्लक एककांकडे दुर्लक्ष करणे',
      ],
      exp: 'प्रत्यक्ष १०-ला-१ अदलाबदल खेळल्यामुळे बेरजेत वर लिहिलेला "हातचा १" म्हणजे खरे १० एकक असतात हे पक्के होते.',
    },
    hi: {
      q: '"10 खुली मोतियों के बदले 1 दहाई की छड़ी लेने" वाले पाँसे के बैंक खेल से छात्रों में कौन-सी संक्रिया सहज बनती है?',
      opts: [
        'आधार-10 का समूहन और हासिल ("10 इकाई = 1 दहाई") का जीवंत व्यावहारिक बोध',
        'दहाई स्तंभ हमेशा के लिए हटाना',
        'केवल 12 के दर्जन में गिनना',
        'बची इकाइयों की अनदेखी करना',
      ],
      exp: 'भौतिक 10-से-1 विनिमय खेल यह दिखाता है कि दहाई के ऊपर लिखा "हासिल 1" वास्तव में दस इकाइयों का एक बंडल है।',
    },
  },
  {
    topic: 'Inconsistent Language Subtraction ("More" Requiring Minus)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In "Meera has 24 shells, which is 7 MORE than Kavita—how many shells does Kavita have?", many pupils mistakenly add `24 + 7 = 31` because:',
      opts: [
        'They hunt for the surface trigger word "MORE -> add" instead of picturing who holds the larger pile (`Meera > Kavita`)',
        'They cannot add 24 and 7 accurately',
        'The word "shells" always denotes multiplication',
        'Kavita must always hold more items than Meera',
      ],
      exp: 'Inconsistent relational phrasing ("A has 7 more than B -> find B") cures mechanical keyword-hunting when students sketch bar comparisons first.',
    },
    mr: {
      q: '"मीराकडे २४ शिंपले आहेत, जे कवितापेक्षा ७ ने जास्त आहेत; तर कविताकडे किती शिंपले?" येथे अनेक मुले चुकून `२४ + ७ = ३१` करतात कारण:',
      opts: [
        'कोणाकडे जास्त आहेत (`मीरा > कविता`) याचे चित्र मनात न काढता फक्त "जास्त = बेरीज" हा वरवरचा शब्द पकडून क्रिया केली जाते',
        'त्यांना २४ व ७ ची बेरीज करता येत नाही',
        '"शिंपले" या शब्दाचा अर्थ गुणाकार असतो',
        'कविताकडे नेहमी जास्तच असले पाहिजेत',
      ],
      exp: 'वाक्याचा तुलनात्मक संबंध ("मीराकडे मोठा ढीग आहे") चित्र रूपात मांडल्यास शब्दांच्या सापळ्यात अडकणे बंद होते.',
    },
    hi: {
      q: '"मीरा के पास 24 सीपियाँ हैं, जो कविता से 7 अधिक हैं; कविता के पास कितनी हैं?" इसमें कई बच्चे गलत `24 + 7 = 31` क्यों कर बैठते हैं?',
      opts: [
        'यह सोचे बिना कि अधिक सीपियाँ किसके पास हैं (`मीरा > कविता`), वे केवल "अधिक = जोड़" जैसे सतही संकेत शब्द से उत्तर चुन लेते हैं',
        'उन्हें 24 और 7 जोड़ना नहीं आता',
        '"सीपियाँ" शब्द गुणा बताता है',
        'कविता के पास हमेशा ज़्यादा होनी चाहिए',
      ],
      exp: 'संबंध-आधारित तुलना (छोटा-बड़ा ढेर चित्रित करना) बच्चों को कीवर्ड-रटने के जाल से बचाती है।',
    },
  },
  {
    topic: 'Resolving "Multiplication Always Makes Bigger" Fallacy',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Up through Class 4 whole numbers, pupils notice `5 × 4 = 20 > 5`. When Class 5 decimal/fraction multiplication yields `12 × 0.5 = 6` (`< 12`), how does a teacher dismantle cognitive shock constructively?',
      opts: [
        'Frame `12 × 0.5` as "HALF OF a 12-litre can" (`0.5` groups of `12`), explaining that multiplying by `< 1` takes ONLY a part of the starting quantity',
        'Claim `12 × 0.5 = 6` is a temporary exception to avoid',
        'Replace `0.5` permanently with `5`',
        'State blindly: "In Class 5 rules reverse backwards"',
      ],
      exp: 'Meaning-first scaling ("groups of / fraction of") preserves intuition across whole numbers AND fractions/decimals.',
    },
    mr: {
      q: 'पूर्ण संख्यांत `५ × ४ = २०` हे नेहमी मूळ संख्येपेक्षा मोठे येते; पण इ. ५ वीत `१२ × ०.५ = ६` असे लहान उत्तर येताच मुलांचा गोंधळ कसा दूर करावा?',
      opts: [
        '`१२ × ०.५` म्हणजे "१२ लिटरचा अर्धा भाग" घेणे होय—`१` पेक्षा लहान संख्येने गुणल्यास मूळ राशीचा केवळ एक हिस्सा मिळतो हे पटवून देणे',
        'हा तात्पुरता अपवाद आहे असे सांगणे',
        '`०.५` च्या जागी नेहमी `५` वापरणे',
        '"इ. ५ वीत नियम उलटे होतात" असे सांगणे',
      ],
      exp: 'गुणाकाराचा अर्थ "पट / भाग घेणे" (Scaling) असा विस्तारित केल्यास दशांश व अपूर्णांक गुणाकारातील धक्का टळतो.',
    },
    hi: {
      q: 'पूर्ण संख्याओं में `5 × 4 = 20` हमेशा बड़ा उत्तर देता है; कक्षा 5 में `12 × 0.5 = 6` (छोटा मान) देखकर बच्चों का भ्रम कैसे सुलझाएँ?',
      opts: [
        '`12 × 0.5` को "12 लीटर का आधा हिस्सा" रूप में समझाना—कि 1 से छोटी संख्या से गुणा करने पर मूल राशि का एक अंश ही लिया जाता है',
        'इसे अस्थायी अपवाद बताकर टाल देना',
        '`0.5` को `5` में बदल देना',
        'कहना कि कक्षा 5 में नियम उलट जाते हैं',
      ],
      exp: 'गुणा को "बार-बार जोड़" से आगे "गुना करना / हिस्सा लेना (Scaling)" तक बढ़ाने पर दशमलव व भिन्न गुणन स्वाभाविक लगता है।',
    },
  },
  {
    topic: 'Resolving "Division Always Makes Smaller" Fallacy',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'When students protest that `6 ÷ 1/2 = 12` ("How can dividing `6` give BIGGER `12`?!"), which real-world question dissolves the paradox instantly?',
      opts: [
        '"If you have 6 whole apples and slice EACH into HALF-apple portions (`1/2`), how many half-pieces do you now hold?" (`12` pieces!)',
        '"Never argue with invert-and-multiply rules!"',
        '"Wait until Class 9 algebra to ask!"',
        '"Half-apples actually weigh double!"',
      ],
      exp: 'Quotative measurement division ("How many `1/2`-sized scoops fit inside `6`?") makes quotient `12 > 6` visually undeniable.',
    },
    mr: {
      q: '`६ ÷ १/२ = १२` हे उत्तर `६` पेक्षा मोठे कसे आले या विद्यार्थ्यांच्या शंकेचे निरसन करणारे सर्वात स्पष्ट व्यावहारिक उदाहरण कोणते?',
      opts: [
        '"तुमच्याकडे ६ सफरचंद आहेत व प्रत्येकाचे अर्धे-अर्धे (`१/२`) तुकडे केले, तर एकूण किती अर्धे तुकडे मिळतील?" (`१२` तुकडे!)',
        '"व्यस्त करून गुणण्याच्या नियमावर प्रश्न विचारू नका!"',
        '"इ. ९ वीपर्यंत थांबा!"',
        '"अर्धे तुकडे वजनाला दुप्पट असतात!"',
      ],
      exp: '६ मध्ये `१/२` चे किती माप बसतात ही मोजमाप भागाकाराची दृष्टी देताच `१२` हे उत्तर डोळ्यासमोर उभे राहते.',
    },
    hi: {
      q: '`6 ÷ 1/2 = 12` (भाग देने पर उत्तर `6` से बड़ा कैसे?) पर विद्यार्थियों की हैरानी मिटाने वाला सबसे स्पष्ट उदाहरण कौन-सा है?',
      opts: [
        '"आपके पास 6 सेब हैं और हर सेब को आधे-आधे (`1/2`) टुकड़ों में काटें, तो कुल कितने आधे टुकड़े बनेंगे?" (`12` टुकड़े!)',
        '"पलटकर गुणा करने के नियम पर तर्क मत करो!"',
        '"कक्षा 9 तक प्रतीक्षा करो!"',
        '"आधे टुकड़ों का भार दुगुना होता है!"',
      ],
      exp: 'मापन-भागाकार ("6 में `1/2` की कितनी हिस्सेदारी समाती है?") भाग से बड़ा मान आने के विरोधाभास को तुरंत समाप्त कर देता है।',
    },
  },
  {
    topic: 'Discovering Triangle Inequality via Geo-Strips',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Giving pairs punched cardboard strips of lengths `3 cm, 4 cm, and 9 cm` to assemble with brass fasteners lets Class 5 pupils independently discover why:',
      opts: [
        'A triangle CANNOT close unless the sum of its two shorter sides strictly exceeds the longest side (`3 + 4 < 9` falls flat!)',
        'Every three strips always snap into a rigid triangle',
        'Longer strips produce smaller angles',
        'Squares need only three cardboard strips',
      ],
      exp: 'Physically watching `3 cm` and `4 cm` arms fail to meet across a `9 cm` base teaches the Triangle Inequality theorem inductively.',
    },
    mr: {
      q: 'मुलांच्या जोड्यांना `३ सेमी, ४ सेमी व ९ सेमी` लांबीच्या पुठ्ठ्याच्या पट्ट्या खिळ्यांनी जोडून त्रिकोण बनवायला दिल्यास त्यांना स्वतःहून कोणता शोध लागतो?',
      opts: [
        'कोणत्याही दोन लहान बाजूंची बेरीज तिसऱ्या मोठ्या बाजूहून मोठी नसेल तर त्रिकोण बंदच होत नाही (`३ + ४ < ९` मध्ये हात जुळतच नाहीत!)',
        'कोणत्याही तीन पट्ट्यांचा नेहमी त्रिकोण बनतोच',
        'लांब पट्टीमुळे कोन लहान होतो',
        'चौरसासाठी तीनच पट्ट्या पुरतात',
      ],
      exp: 'पट्ट्यांची टोकं न जुळल्याचा प्रत्यक्ष अनुभव त्रिकोणाच्या बाजूंच्या बेरजेचा गुणधर्म कायमचा पक्का करतो.',
    },
    hi: {
      q: 'जोड़ियों को `3 सेमी, 4 सेमी और 9 सेमी` की गत्ते की पट्टियाँ पिन से जोड़कर त्रिभुज बनाने को देने पर वे स्वयं क्या खोज लेते हैं?',
      opts: [
        'दो छोटी भुजाओं का योग तीसरी सबसे बड़ी भुजा से अधिक न होने पर त्रिभुज बंद ही नहीं हो सकता (`3 + 4 < 9` में सिरे नहीं मिलते!)',
        'कोई भी तीन पट्टियाँ हमेशा त्रिभुज बनाती हैं',
        'लंबी भुजा से छोटा कोण बनता है',
        'वर्ग में तीन पट्टियाँ लगती हैं',
      ],
      exp: 'पट्टियों को जोड़ते समय सिरे न मिलने का प्रत्यक्ष अनुभव त्रिभुज असमिका को आगमनात्मक रूप से सिद्ध कर देता है।',
    },
  },
  {
    topic: 'Why Zero Is an Even Number – Concrete Pair Logic',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Class 4 pupils often insist `0` is "neither even nor odd". Using the buddy-pairing rule (and alternating `+1` pattern `... 4, 3, 2, 1, 0`), how does a teacher clarify `0` clearly?',
      opts: [
        'Show two traits together: `0 ÷ 2 = 0` with `0` leftover buddies, AND alternating numbers (`odd=3, even=2, odd=1, even=0`) keep parity regular across `0`',
        'Declare "Zero is half-even, half-odd"',
        'Avoid placing `0` in number lines completely',
        'Claim `0` ends in zero so `10` must also be neither',
      ],
      exp: 'Both divisibility by 2 (`0 = 2 × 0`, remainder 0) and alternating parity establish `0` unambiguously as even.',
    },
    mr: {
      q: 'इ. ४ थीची मुले अनेकदा "`०` समही नाही व विषमही नाही" असे मानतात; शिक्षकांनी `०` हा सम अंक असल्याचे सोप्या तर्काने कसे पटवावे?',
      opts: [
        'एकतर दोन गटांत वाटल्यास `०` बाकी उरते (`० ÷ २ = ०`), आणि एक-आड-एक साखळीत (`३-विषम, २-सम, १-विषम, ०-सम`) ० ची जागा सम क्रमावरच येते हे दाखवून',
        '`०` अर्धा सम व अर्धा विषम आहे असे सांगून',
        'संख्यारेषेवरून `०` काढून टाकून',
        '`०` शेवटी येत असल्याने `१०` ही सम नाही असे सांगून',
      ],
      exp: 'दोन्ही बाजूंनी (`२` च्या पाढ्यातील एकांतर क्रम व बाकी `०`) शून्य हा सम पूर्णांक असल्याचा तर्क स्पष्ट होतो.',
    },
    hi: {
      q: 'कक्षा 4 के बच्चे अक्सर कहते हैं कि `0` "न सम है न विषम"। शिक्षक सरल तर्क से `0` के सम होने को कैसे स्पष्ट करेंगे?',
      opts: [
        '`0 ÷ 2 = 0` में कोई शेष नहीं बचता और एकांतर क्रम (`3 विषम, 2 सम, 1 विषम, 0 सम`) में `0` का स्थान सम पर ही आता है, यह दिखाकर',
        '`0` को आधा सम-आधा विषम मानकर',
        'संख्या-रेखा से `0` हटाकर',
        'यह कहकर कि `10` भी सम नहीं है',
      ],
      exp: '2 से विभाज्यता (शेष `0`) और सम-विषम एकांतर पैटर्न दोनों स्पष्ट करते हैं कि `0` एक सम संख्या है।',
    },
  },
  {
    topic: 'Diagnosing Borrow-Across-Zero Error (`500 − 246 = 344`)',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'A pupil calculates `500 − 246` and gets `346` or `344` (borrowing 1 from `5` -> `4`, turning `0` directly into `10` without passing to ones, or skipping tens change). Which concrete bundle aid directly fixes this?',
      opts: [
        'Untying ONE 100-stick bundle into `10` tens-bundles first, placing them in Tens, THEN untying ONE tens-bundle into `10` ones (leaving `4` hundreds, `9` tens, `10` ones)',
        'Chanting "Cross zero, write 9!" ten times with no sticks',
        'Skipping subtraction of zeros until Class 6',
        'Rewriting `500` as `555`',
      ],
      exp: 'Two-step physical bundle exchange makes the `4 | 9 | 10` cascade transparent instead of mysterious magic slashes.',
    },
    mr: {
      q: '`५०० − २४६` सोडवताना मूल `३४६` किंवा `३४४` उत्तर काढते (शतकातून उसना घेतल्यावर दशकात `९` राहिले हे विसरते); ही चूक मुळापासून कोणती कृती सुधारते?',
      opts: [
        'काड्यांच्या गठ्ठ्यांतून आधी `१` शतकाचा गठ्ठा सोडून दशकात `१०` गठ्ठे ठेवणे व त्यातील `१` गठ्ठा सोडून एककात `१०` सुट्या काड्या नेणे -> `४ | ९ | १०` प्रत्यक्ष दिसते',
        'फक्त "शून्यावर रेघ मारून ९ लिही" हे तोंडपाठ करणे',
        'इ. ६ वीपर्यंत शून्याची वजाबाकी टाळणे',
        '`५००` ऐवजी `५५५` लिहिणे',
      ],
      exp: 'प्रत्यक्ष शतक-गठ्ठा व दशक-गठ्ठा सोडून दाखवल्यास `४ शतक, ९ दशक, १० एकक` ही पायरी कायमची स्पष्ट होते.',
    },
    hi: {
      q: '`500 − 246` में छात्र `346` या `344` लिख देता है (शून्य के ऊपर `9` छोड़ना भूल जाता है); कौन-सी मूर्त गतिविधि इस त्रुटि को जड़ से ठीक करती है?',
      opts: [
        'पहले 1 सैकड़े का बंडल खोलकर दहाई में `10` बंडल रखना, फिर उनमें से 1 दहाई खोलकर इकाई में `10` तीलियाँ ले जाना—ताकि `4 | 9 | 10` साफ़ दिखे',
        'बिना समझे "शून्य काटकर 9 लिखो" रटवाना',
        'कक्षा 6 तक शून्य वाले घटाव टालना',
        '`500` को `555` मान लेना',
      ],
      exp: 'दो-चरणीय बंडल खोलने की क्रिया दिखाती है कि शतक से एक उधार पहले दहाई को `10` और फिर इकाई को देने पर दहाई में `9` क्यों बचता है।',
    },
  },
  {
    topic: 'Fraction Benchmarks (`0`, `1/2`, `1`) Before Common Denominators',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'How can a Class 5 pupil compare `3/8` and `5/9` MENTALLY in 3 seconds without computing `LCM(8, 9) = 72`?',
      opts: [
        'Benchmark both against `1/2`: `3/8 < 4/8 (= 1/2)` whereas `5/9 > 4.5/9 (= 1/2)`, so `5/9` is strictly larger immediately',
        'Compare numerators only (`5 > 3`) in every fraction pair regardless of denominators',
        'Always turn every fraction into decimal to 5 places',
        'Add numerator and denominator of each fraction',
      ],
      exp: 'Benchmarking (`< 1/2` vs `> 1/2`) develops agile quantitative estimation rather than rigid reliance on large LCM products.',
    },
    mr: {
      q: '`८` व `९` चा लसावि `७२` न काढता इ. ५ वीतील विद्यार्थी `३/८` व `५/९` यांची ३ सेकंदांत अचूक मानसिक तुलना कसा करतो?',
      opts: [
        '`१/२` हा मध्यबिंदू वापरून: `३/८` हे अर्ध्यापेक्षा (`४/८`) लहान आहे, तर `५/९` हे अर्ध्यापेक्षा (`४.५/९`) मोठे आहे; म्हणून `५/९ > ३/८`',
        'छेद न पाहता फक्त अंश (`५ > ३`) पाहून',
        'प्रत्येक अपूर्णांक ५ दशांश स्थळांपर्यंत भागून',
        'अंश व छेदाची बेरीज करून',
      ],
      exp: '`०, १/२, १` या संदर्भ-टप्प्यांशी तुलना करणे हे प्रगत संख्या-सजगतेचे (Number Sense) लक्षण आहे.',
    },
    hi: {
      q: '`LCM = 72` निकाले बिना कक्षा 5 का छात्र 3 सेकंड में `3/8` और `5/9` की मानसिक तुलना कैसे कर सकता है?',
      opts: [
        'मानक `1/2` से तुलना करके: `3/8` आधे (`4/8`) से कम है जबकि `5/9` आधे (`4.5/9`) से अधिक है, अतः `5/9` बड़ा है',
        'हर जोड़ी में केवल अंश (`5 > 3`) देखकर',
        'हमेशा 5 दशमलव स्थान तक भाग देकर',
        'अंश और हर जोड़कर',
      ],
      exp: '`0`, `1/2` और `1` जैसे संदर्भ-मानकों से भिन्न तुलना लचीले संख्या-बोध को विकसित करती है।',
    },
  },
  {
    topic: 'Geared Demonstration Clock vs Loose-Hands Cardboard Clock',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Why is a geared teacher clock (where rotating the minute hand advances the hour hand smoothly) far more accurate conceptually for `3:45` than a loose-pin paper clock?',
      opts: [
        'It preserves covariation: at `3:45`, the hour hand sits NEAR `4` (3/4 of the way past `3`), preventing pupils from pointing it rigidly straight at `3`',
        'Paper clocks display only 24-hour railway numbers',
        'Geared clocks skip minute ticks completely',
        'Loose hands teach digital time faster',
      ],
      exp: 'Continuous geared motion fixes the common bug of drawing the hour hand dead on `3` at `3:45`.',
    },
    mr: {
      q: '`३:४५` ही वेळ शिकवताना सुटे काटे फिरणाऱ्या पुठ्ठ्याच्या घड्याळापेक्षा मिनिट-काट्यासोबत तास-काटाही हळू सरकणारे दातेरी घड्याळ का श्रेष्ठ ठरते?',
      opts: [
        'मिनिट-काटा फिरताना तास-काटाही हळूहळू `३` पासून `४` कडे सरकतो (`३:४५` ला तो `४` च्या जवळ असतो), त्यामुळे तास-काटा चुकून थेट `३` वर ठेवण्याची चूक टळते',
        'पुठ्ठ्याच्या घड्याळात २४ तास असतात',
        'दातेरी घड्याळात मिनिटाच्या खुणा नसतात',
        'सुटे काटे डिजिटल वेळ लवकर शिकवतात',
      ],
      exp: 'दोन्ही काट्यांतील सहसंबंधित हालचालीमुळे `३:४५` व `४:४५` मधील तास-काट्याची अचूक जागा मुले ओळखतात.',
    },
    hi: {
      q: '`3:45` सिखाने में ढीली पिन वाली कागज़ी घड़ी की तुलना में गियर वाली घड़ी (जहाँ मिनट की सुई घुमाने पर घंटे की सुई भी धीरे खिसकती है) क्यों बेहतर है?',
      opts: [
        '`3:45` पर घंटे की सुई `3` से सरककर `4` के काफी करीब होती है—गियर वाली घड़ी यह सह-संबंध दिखाकर घंटे की सुई को ठीक `3` पर अटकाने की भूल रोकती है',
        'कागज़ी घड़ी में 24 घंटे होते हैं',
        'गियर वाली घड़ी में मिनट के निशान नहीं होते',
        'ढीली सुई डिजिटल समय तेज़ी से सिखाती है',
      ],
      exp: 'सह-संबंधित गियर गति सिखाती है कि घंटा व मिनट सुइयाँ एक साथ निरंतर चलती हैं।',
    },
  },
  {
    topic: 'Partial-Products Box Method Before Standard Two-Digit Multiplication',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Having Class 4 learners split `34 × 26` into a 4-cell rectangle `(30 + 4) × (20 + 6)` = `600 + 180 + 80 + 24 = 884` BEFORE introducing the compact 2-line algorithm accomplishes:',
      opts: [
        'Showing every partial product visibly with full place-value zero integrity (why the second line shifts or starts with `0` in `20 × 34 = 680`)',
        'Replacing mental estimation permanently',
        'Removing addition from multiplication',
        'Limiting multiplication strictly to multiples of `10`',
      ],
      exp: 'The Area-Box model reveals the distributive law geometrically and destroys the "mystery zero on the second row" bug.',
    },
    mr: {
      q: 'नेहमीचा दोन-ओळी गुणाकार शिकवण्यापूर्वी इ. ४ थीत `३४ × २६` साठी `(३०+४) × (२०+६)` या ४ चौकोनांची "क्षेत्रफळ चौकट" करून `६०० + १८० + ८० + २४` दाखवण्याचा मुख्य फायदा कोणता?',
      opts: [
        'प्रत्येक भागाची पूर्ण स्थानिक किंमत स्पष्ट होते आणि दुसऱ्या ओळीत दशक `२०` ने गुणताना शेवटी `०` का ठेवतात याचे रहस्य उलगडते',
        'तोंडी अंदाज कायमचा बंद होतो',
        'गुणाकारातील बेरीज निघून जाते',
        'केवळ १० च्या पटीतीलच गुणाकार शिकवता येतात',
      ],
      exp: 'चौकट-पद्धतीमुळे विभाजन गुणधर्म व दुसऱ्या ओळीतील शून्याचे तार्किक कारण सहज समजते.',
    },
    hi: {
      q: 'मानक 2-पंक्ति विधि से पहले कक्षा 4 में `34 × 26` को `(30+4) × (20+6)` के 4-खानों वाले बॉक्स से `600+180+80+24` हल कराने का मुख्य लाभ क्या है?',
      opts: [
        'हर आंशिक गुणनफल का पूरा स्थानीय मान दिखता है और दूसरी पंक्ति में दहाई `20` से गुणा करने पर `0` या खिसकाव क्यों होता है, यह स्पष्ट होता है',
        'मानसिक अनुमान समाप्त हो जाता है',
        'गुणा से जोड़ गायब हो जाता है',
        'केवल 10 के गुणज ही हल हो सकते हैं',
      ],
      exp: 'बॉक्स-क्षेत्रफल विधि वितरण नियम को दृश्य बनाकर मानक एल्गोरिदम की दूसरी पंक्ति के शून्य का रहस्य खोलती है।',
    },
  },
  {
    topic: 'Local Weekly Bazaar Price Graph for Data Literacy',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Asking Class 5 pupils to track the per-kg price of tomatoes or onions at their local weekly haat/market for four Sundays and plot a bar/line chart creates:',
      opts: [
        'Authentic data ownership—students interpret trends, minimum/maximum spikes, and family budget effects rather than lifeless textbook numbers',
        'Distraction from memorizing geometry theorems',
        'Pure agricultural career training outside math',
        'Identical textbook charts memorized in advance',
      ],
      exp: 'Student-collected community price logs make data-handling graphs personally meaningful and analytically rich.',
    },
    mr: {
      q: 'इ. ५ वीच्या मुलांना स्थानिक आठवडी बाजारातील चार रविवारचे कांदा किंवा टोमॅटोचे प्रतिकिलो भाव नोंदवून स्तंभालेख काढायला सांगितल्याने वर्गात काय साधते?',
      opts: [
        'स्वतः गोळा केलेल्या जिवंत माहितीवरून चढ-उतार, कमाल-किमान भाव व घरगुती खर्चावरील परिणाम मुले अर्थपूर्ण रीतीने अभ्यासतात',
        'भूमितीच्या प्रमेयांपासून लक्ष विचलित होते',
        'गणिताबाहेर केवळ शेती प्रशिक्षण होते',
        'पाठ्यपुस्तकातीलच ठराविक आलेख पाठ होतात',
      ],
      exp: 'स्वतःच्या परिसरातील प्रत्यक्ष आकडेवारीवर आधारित आलेख विश्लेषणामुळे माहिती हाताळणी विषय जिवंत होतो.',
    },
    hi: {
      q: 'कक्षा 5 के बच्चों को चार रविवार तक स्थानीय हाट-बाज़ार से प्याज़ या टमाटर का प्रति किलो दाम दर्ज कर ग्राफ बनाने को देने से क्या हासिल होता है?',
      opts: [
        'स्वयं जुटाए गए जीवंत आँकड़ों से उतार-चढ़ाव, न्यूनतम-अधिकतम और घरेलू बजट प्रभाव का सार्थक विश्लेषण विकसित होता है',
        'ज्यामिति से ध्यान भटकता है',
        'गणित से हटकर केवल कृषि प्रशिक्षण होता है',
        'किताब के रटे ग्राफ दोहराए जाते हैं',
      ],
      exp: 'छात्रों द्वारा स्वयं संकलित सामुदायिक आँकड़े ग्राफ को निर्जीव अभ्यास के बजाय अर्थपूर्ण विश्लेषण बनाते हैं।',
    },
  },
  {
    topic: 'Inclusive Tactile TLMs for Visually Impaired Learners',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'To include a low-vision or blind learner fully in a Class 4 Geometry & Data unit alongside sighted classmates, which low-cost classroom adaptation works immediately?',
      opts: [
        'Provide raised glue-line / wool-string tactile bar charts, notched plastic rulers, and Taylor-frame/Braille dice so shapes and bars are felt effortlessly by fingertip',
        'Exempt the child from all Geometry and Graph units permanently',
        'Have classmates shout answers into the child’s ear without letting them handle shapes',
        'Wait until university before introducing polygons',
      ],
      exp: 'Tactile raised-line graphics and notched scales grant direct independent spatial access inside inclusive classrooms.',
    },
    mr: {
      q: 'इ. ४ थीच्या वर्गातील दृष्टीदोष असलेल्या विद्यार्थ्याला भूमिती व आलेख उपक्रमांत सर्व मुलांसोबत पूर्ण सहभागी करून घेण्यासाठी कोणता तात्काळ कमी खर्चाचा उपाय सर्वोत्तम?',
      opts: [
        'लोकर/फेव्हिकॉलच्या उंचवट्याची स्पर्श-आकृती व स्तंभालेख, खाचा असलेली मोजपट्टी आणि स्पर्श-फासे देऊन बोटांच्या स्पर्शाने स्वतंत्र आकलन घडवणे',
        'त्या मुलाला भूमिती व आलेख घटकातून कायमची सूट देणे',
        'साहित्य हातात न देता इतरांकडून फक्त तोंडी उत्तरे सांगायला लावणे',
        'महाविद्यालयापर्यंत बहुभुज शिकवणे पुढे ढकलणे',
      ],
      exp: 'स्पर्श-सुलभ उंचवट्याच्या आकृत्या व खाचांची पट्टी सर्वसमावेशक वर्गात समान सक्रिय सहभाग सुनिश्चित करतात.',
    },
    hi: {
      q: 'कक्षा 4 में दृष्टिबाधित शिक्षार्थी को ज्यामिति और ग्राफ गतिविधि में पूर्ण रूप से शामिल करने हेतु कौन-सा कम लागत वाला समायोजन तुरंत कारगर है?',
      opts: [
        'ऊन या सूखे गोंद की उभरी हुई स्पर्श-आकृतियाँ व दंड-आलेख, खाँचेदार पैमाना व स्पर्श-पाँसे देना ताकि उँगलियों से स्वयं अनुभव कर सके',
        'उसे ज्यामिति व ग्राफ इकाइयों से स्थायी छूट दे देना',
        'बिना सामग्री छुआए सहपाठियों से केवल उत्तर बोलवाने को कहना',
        'कॉलेज तक बहुभुज टाल देना',
      ],
      exp: 'उभरे स्पर्श-आलेख और खाँचेदार माप उपकरण समावेशी कक्षा में स्वतंत्र सक्रिय भागीदारी प्रदान करते हैं।',
    },
  },
  {
    topic: 'Always-Sometimes-Never True Reasoning Statements',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Asking Class 5 groups to debate statements like "A rectangle is a square" -> ("Sometimes true—when all sides become equal!") or "The product of two odd numbers is odd" -> ("Always true!") fosters:',
      opts: [
        'Deep deductive justification, counterexample hunting, and clear logical classification beyond mechanical one-answer sums',
        'Guessing blindly among three memorized words',
        'Eliminating numerical calculation from school completely',
        'Avoiding precise geometric vocabulary',
      ],
      exp: 'Always/Sometimes/Never prompts ignite mathematical argumentation—defending claims with counterexamples and properties.',
    },
    mr: {
      q: 'इ. ५ वीच्या गटांना "`आयत हा चौरस असतो`" ("कधीतरी—सर्व बाजू समान असल्यास!") किंवा "`दोन विषम संख्यांचा गुणाकार विषम असतो`" ("नेहमीच!") यांवर चर्चा करायला लावल्याने काय बहरते?',
      opts: [
        'तार्किक स्पष्टीकरण, प्रति-उदाहरणे (Counterexamples) शोधणे व गुणधर्मांवर आधारित सखोल वर्गीकरण क्षमता',
        'तीन शब्दांतून आंधळा अंदाज मारणे',
        'संख्यात्मक गणित शाळेतून हद्दपार करणे',
        'अचूक भूमितीय शब्द टाळणे',
      ],
      exp: '"नेहमी / कधीतरी / कधीच नाही" चर्चा विद्यार्थ्यांत गणितीय तर्क मांडणी व प्रति-उदाहरणांद्वारे सिद्ध करण्याची सवय लावते.',
    },
    hi: {
      q: 'कक्षा 5 के समूहों को `"आयत एक वर्ग होता है"` ("कभी-कभी—जब सभी भुजाएँ बराबर हों!") व `"दो विषम संख्याओं का गुणनफल विषम होता है"` ("हमेशा!") पर बहस कराने से क्या पनपता है?',
      opts: [
        'गहन तार्किक औचित्य, प्रति-उदाहरण खोजना और यांत्रिक एकल-उत्तर सवालों से आगे गुणधर्म वर्गीकरण',
        'तीन शब्दों में अंधा तुक्का लगाना',
        'गणना को स्कूल से हटाना',
        'सटीक शब्दावली से बचना',
      ],
      exp: '"सदैव / कभी-कभी / कभी नहीं" कथन बच्चों में तार्किक बहस, प्रमाण और प्रति-उदाहरण खोजने की संस्कृति जगाते हैं।',
    },
  },
  {
    topic: 'Ratio Tables Before Formal Cross-Multiplication',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'If 4 notebooks cost `₹96`, why does building a visual ratio table (`4 -> ₹96`, `2 -> ₹48`, `1 -> ₹24`, `7 -> ₹168`) empower Class 5 students better than rote cross-multiplication `x/7 = 96/4`?',
      opts: [
        'Students preserve visible proportional scaling (halving, doubling, unit step, adding columns) and grasp WHY costs scale together',
        'Tables forbid dividing by 2',
        'Cross-multiplication gives a different numerical answer',
        'Ratio tables work only for odd quantities',
      ],
      exp: 'Ratio tables harness flexible multiplicative scaling (`÷2`, `×7`) instead of blind diagonal cross-product recipes.',
    },
    mr: {
      q: '४ वह्यांची किंमत `₹९६` असल्यास थेट `x/७ = ९६/४` हा तिरकस गुणाकार करण्यापेक्षा गुणोत्तर तक्ता (`४ -> ९६`, `२ -> ४८`, `१ -> २४`, `७ -> १६८`) तयार करणे अधिक सक्षम का ठरते?',
      opts: [
        'निम्मे करणे, एककाची किंमत काढणे व स्तंभ जोडणे यांतून प्रमाणबद्धता का व कशी वाढते याचा थेट तर्क विद्यार्थ्याच्या हाती राहतो',
        'तक्त्यात २ ने भागता येत नाही',
        'तिरकस गुणाकाराचे उत्तर वेगळे येते',
        'तक्ता केवळ विषम संख्यांसाठीच चालतो',
      ],
      exp: 'गुणोत्तर तक्त्यामुळे एकक पद्धत व लवचिक प्रमाण-तर्क (Proportional reasoning) भक्कम होतो.',
    },
    hi: {
      q: 'यदि 4 कॉपियाँ `₹96` की हैं, तो सीधे `x/7 = 96/4` तिरछा गुणा रटाने से पहले अनुपात सारणी (`4->96`, `2->48`, `1->24`, `7->168`) बनाना क्यों श्रेष्ठ है?',
      opts: [
        'आधा करने, इकाई मान निकालने और जोड़ने में छात्र स्पष्ट आनुपातिक स्केलिंग देखते हैं कि कीमत कैसे साथ बढ़ती-घटती है',
        'सारणी में 2 से भाग वर्जित है',
        'तिरछे गुणा से भिन्न उत्तर आता है',
        'सारणी केवल विषम संख्याओं पर चलती है',
      ],
      exp: 'अनुपात सारणी आनुपातिक तर्क (Proportional reasoning) और ऐकिक विधि को स्वाभाविक रूप से जोड़ती है।',
    },
  },
  {
    topic: 'Function Machine Pattern Discovery in Primary Algebra Readiness',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Playing a "Secret Rule Box" game on the board—In `2 -> Out 7`, In `4 -> Out 11`, In `5 -> Out 13`, In `10 -> ?`—nurtures early algebraic readiness by:',
      opts: [
        'Training learners to spot functional co-variation rules (`× 2 + 3`) across paired inputs before formal `y = 2x + 3` letter notation arrives',
        'Teaching polynomial factoring prematurely in Class 3',
        'Discouraging mental arithmetic checks',
        'Proving inputs determine outputs randomly',
      ],
      exp: 'Input-output rule boxes cultivate generalized algebraic pattern thinking naturally in primary grades.',
    },
    mr: {
      q: 'फळ्यावर "जादूचा नियम डबा" खेळ—आत `२ -> बाहेर ७`, आत `४ -> बाहेर ११`, आत `५ -> बाहेर १३`, तर `१० -> ?`—खेळल्याने बीजगणिताची पूर्वतयारी कशी होते?',
      opts: [
        'अक्षर-चल (`x, y`) येण्यापूर्वीच जोड्यांतून कार्यात्मक संबंधाचा नियम (`× २ + ३`) शोधण्याची सामान्यीकरण क्षमता विकसित होते',
        'इ. ३ रीतच बहुपदीचे अवयव शिकवले जातात',
        'तोंडी पडताळणी बंद होते',
        'उत्तरे यादृच्छिक असतात हे सिद्ध होते',
      ],
      exp: 'आदान-प्रदान नियम डब्यामुळे अंकगणितापासून बीजगणितातील संबंध-विचाराकडे सहज प्रवास घडतो.',
    },
    hi: {
      q: 'बोर्ड पर "जादुई नियम बॉक्स" खेल—इनपुट `2 -> 7`, `4 -> 11`, `5 -> 13`, तो `10 -> ?`—प्राथमिक स्तर पर बीजगणितीय तत्परता कैसे जगाता है?',
      opts: [
        'अक्षर `x, y` से पहले ही जोड़े गए मानों के बीच फलन नियम (`× 2 + 3`) खोजने की सामान्यीकरण दृष्टि विकसित करता है',
        'कक्षा 3 में ही बहुपद गुणनखंड सिखा देता है',
        'मानसिक जाँच हतोत्साहित करता है',
        'दिखाता है कि नियम यादृच्छिक होते हैं',
      ],
      exp: 'इनपुट-आउटपुट नियम खेल अंकगणित से बीजगणितीय सह-परिवर्तन सोच की ओर स्वाभाविक सेतु बनाता है।',
    },
  },
  {
    topic: 'Wait-Time After Math Questions for Equitable Participation',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Pausing quietly for a full `5 seconds` (Wait-Time) after posing a thoughtful Class 5 fraction puzzle—before calling on anyone—dramatically improves learning because:',
      opts: [
        'Reflective, bilingual, and quiet learners gain processing space to form full answers rather than losing out every time to the two fastest hand-raisers',
        'Silence wastes instructional curriculum hours',
        'Pupils stop thinking after `2 seconds`',
        'Only fast memorizers belong in primary math',
      ],
      exp: 'Rowe’s Wait-Time research shows 3–5 s pauses raise response length, reasoning quality, and quiet-student participation sharply.',
    },
    mr: {
      q: 'इ. ५ वीत विचारप्रवर्तक प्रश्न विचारल्यानंतर कोणालाही बोलण्यापूर्वी शिक्षकांनी पूर्ण `५ सेकंद` शांत थांबल्यास (Wait-Time) वर्गात कोणता सकारात्मक बदल दिसतो?',
      opts: [
        'केवळ हात वर करणाऱ्या दोघांचीच मक्तेदारी संपून संकोची, विचारशील व शांत विद्यार्थ्यांनाही स्वतःचे उत्तर बांधायला वेळ व आत्मविश्वास मिळतो',
        'शांततेमुळे अभ्यासक्रम वाया जातो',
        '२ सेकंदांनंतर मुले विचार करणे थांबवतात',
        'फक्त वेगवान पाठांतर करणाऱ्यांनाच संधी मिळावी',
      ],
      exp: 'प्रश्नोत्तरांमधील ३–५ सेकंदांची प्रतीक्षा सर्व विद्यार्थ्यांची विचार-खोली व सहभाग लक्षणीयरीत्या वाढवते.',
    },
    hi: {
      q: 'विचारशील गणितीय प्रश्न पूछने के बाद किसी का नाम लेने से पहले पूरे `5 सेकंड` शांत रुकने (Wait-Time) से कक्षा में क्या सुधार होता है?',
      opts: [
        'केवल तेज़ हाथ उठाने वाले कुछ बच्चों का एकाधिकार टूटता है और शांत, द्विभाषी व चिंतनशील बच्चों को उत्तर गढ़ने का समय मिलता है',
        'मौन से पाठ्यक्रम का समय बर्बाद होता है',
        '2 सेकंड बाद बच्चे सोचना बंद कर देते हैं',
        'गणित केवल तेज़ रटने वालों का विषय है',
      ],
      exp: '3–5 सेकंड का प्रतीक्षा-काल उत्तर की गुणवत्ता, तर्क की लंबाई और शांत विद्यार्थियों की भागीदारी में भारी वृद्धि करता है।',
    },
  },
  {
    topic: 'Clarifying `<` vs `>` Inequality Symbols Without Crocodile Gimmick Trap',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'While "hungry alligator eats the bigger number" helps early recall, coupling `<` and `>` with the visual cue "2 wide open dots face the LARGER side, 1 narrow tip points to the SMALLER side" also prepares pupils for:',
      opts: [
        'Understanding true geometric width-vs-vertex narrowing AND reading inequalities effortlessly in either left-to-right or algebraic `x < 5` direction',
        'Drawing realistic wildlife sketches in math notebooks',
        'Substituting `=` whenever numbers differ',
        'Reversing left-hand and right-hand decimals',
      ],
      exp: 'Wide-opening-vs-pointy-tip correspondence stays crystal clear even when variables (`x > 7`) appear later.',
    },
    mr: {
      q: '"मोठ्या संख्येकडे तोंड उघडे (`2` बिंदू), लहानाकडे टोक (`1` बिंदू)" हे तार्किक दृश्य चिन्ह केवळ मगरीच्या तोंडाच्या गोष्टीपेक्षा अधिक टिकाऊ का ठरते?',
      opts: [
        'आकारातील रुंदी (मोठे) विरुद्ध टोक (लहान) हा थेट तर्क पुढे `x < ५` सारख्या बीजगणितातील चलांसोबतही विनागोंधळ वापरता येतो',
        'वहीत प्राण्यांची चित्रे काढायला उपयोगी पडते',
        'भिन्न संख्यांसाठी `=` चिन्ह वापरण्यास प्रवृत्त करते',
        'दशांश संख्या उलट्या करते',
      ],
      exp: 'चिन्हाच्या रुंद तोंडाची व निमुळत्या टोकाची तार्किक जाण पुढे बीजगणितातील असमानता वाचताना गोंधळ होऊ देत नाही.',
    },
    hi: {
      q: 'केवल "भूखे मगरमच्छ" की कहानी के बजाय "चौड़ा खुला मुँह बड़ी ओर, नुकीला सिरा छोटी ओर" दृश्य तर्क जोड़ना आगे भी अधिक उपयोगी क्यों रहता है?',
      opts: [
        'यह चौड़ाई (बड़ा) बनाम नोक (छोटा) का संबंध सीधे दिखाता है जो आगे `x < 5` जैसे बीजगणितीय कथनों को भी बिना भ्रम पढ़ने देता है',
        'गणित कॉपी में वन्यजीव चित्र बनाने में मदद करता है',
        'हमेशा `=` लगाने को कहता है',
        'दशमलव को उलट देता है',
      ],
      exp: 'प्रतीक की चौड़ी बनाम नुकीली ज्यामितीय आकृति पर ध्यान केंद्रित करना उच्च कक्षाओं के बीजगणित में भी स्थायी रहता है।',
    },
  },
  {
    topic: 'Portfolio Assessment Capturing Longitudinal Math Growth',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Maintaining a year-long Student Math Portfolio containing dated origami fractions, error-correction reflections, market bills, and problem-posing cards alongside periodic quizzes gives parents:',
      opts: [
        'Rich longitudinal proof of conceptual growth, persistence, and creative representation across the whole year—far deeper than one snapshot mark',
        'A heavy bundle to discard before summer break',
        'Evidence solely of handwriting neatness',
        'Replacement for basic counting fluency',
      ],
      exp: 'Portfolios document process, improvement over time, and multiple competencies consistent with CCE & NEP-2020.',
    },
    mr: {
      q: 'केवळ एका चाचणीच्या गुणाऐवजी वर्षभरातील कागदाच्या घड्यांचे अपूर्णांक, स्वतः सुधारलेल्या चुका, बाजार बिले व रचलेले प्रश्न यांचा "गणित पोर्टफोलिओ" ठेवल्याने पालकांना काय दिसते?',
      opts: [
        'मुलाच्या वर्षभरातील विचार-प्रगतीचा, चिकाटीचा व संकल्पनात्मक वाढीचा जिवंत आलेख—जो एका परीक्षेच्या आकड्यापेक्षा कितीतरी सखोल असतो',
        'उन्हाळ्यात टाकून देण्याचा कागदाचा ढिगारा',
        'केवळ हस्ताक्षराचा नमुना',
        'मूळ मोजणीला पर्याय',
      ],
      exp: 'सातत्यपूर्ण सर्वंकष मूल्यमापन (CCE) व NEP-२०२० नुसार पोर्टफोलिओ विद्यार्थ्याच्या सर्वांगीण गणितीय विकासाचा दस्तऐवज आहे.',
    },
    hi: {
      q: 'केवल एक परीक्षा-अंक के बजाय पूरे साल के कागज़-मोड़ भिन्न, त्रुटि-सुधार नोट्स, बाजार बिल और स्व-रचित सवालों का "गणित पोर्टफोलियो" अभिभावकों को क्या दिखाता है?',
      opts: [
        'पूरे वर्ष की अवधारणात्मक प्रगति, धैर्य और सृजनात्मक विकास का सजीव प्रमाण—जो एक एकल अंक से कहीं अधिक गहरा है',
        'गर्मी की छुट्टी से पहले फेंकने का गट्ठर',
        'केवल सुलेख का सबूत',
        'मौलिक गिनती का विकल्प',
      ],
      exp: 'पोर्टफोलियो समय के साथ सीखने की प्रक्रिया, सुधार और बहुआयामी क्षमताओं का प्रमाणिक CCE अभिलेख है।',
    },
  },
  {
    topic: 'Integrating Calendar Months & School Timetables Authentically',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Inviting Class 3–4 learners to plan how many school days remain until the Annual Sports Day using the real wall calendar (excluding Sundays and public holidays) builds:',
      opts: [
        'Authentic calendar navigation, grouped counting by 7s (weeks), and purposeful day-interval arithmetic',
        'Blind recitation of 12 English month spellings alone',
        'Confusion between years and minutes',
        'Skipping subtraction skills',
      ],
      exp: 'Real school countdowns weave 7-day calendar structure seamlessly into daily child-centered arithmetic.',
    },
    mr: {
      q: 'भिंतीवरील खऱ्या दिनदर्शिकेवरून रविवार व सुट्ट्या वगळून "वार्षिक क्रीडा दिनापर्यंत शाळेचे किती दिवस उरले?" हे इ. ३ री–४ थीच्या मुलांकडून काढून घेतल्याने कोणते कौशल्य घडते?',
      opts: [
        'दिनदर्शिका वाचन, ७ दिवसांच्या आठवड्याने गट-मोजणी व सार्थक दिवस-मध्यांतर हिशेब',
        'केवळ १२ महिन्यांच्या स्पेलिंगचे पाठांतर',
        'वर्षे व मिनिटांतील गोंधळ',
        'वजाबाकीचे कौशल्य टाळणे',
      ],
      exp: 'शाळेतील प्रत्यक्ष कार्यक्रमांची मोजदाद दिनदर्शिकेचा गणितीय वापर जिवंत व उत्साही बनवते.',
    },
    hi: {
      q: 'दीवार के असली कैलेंडर से रविवार व छुट्टियाँ घटाकर "वार्षिक खेल दिवस तक कितने स्कूल दिवस बचे हैं?" गिनवाना कक्षा 3–4 में क्या विकसित करता है?',
      opts: [
        'कैलेंडर पठन, 7-दिन के सप्ताह से समूहन गिनती और सार्थक तिथि-अंतराल गणना',
        'केवल 12 महीनों की वर्तनी रटना',
        'वर्ष और मिनट में भ्रम',
        'घटाव कौशल छोड़ देना',
      ],
      exp: 'विद्यालय के वास्तविक आयोजनों की उलटी गिनती कैलेंडर गणित को रोचक व व्यावहारिक बनाती है।',
    },
  },
  {
    topic: 'Connecting Shadow Lengths Outside to Proportional Intuition',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'At 10:00 a.m. in the schoolyard, Class 5 pairs measure a `1 m` stick’s shadow (`80 cm`) alongside the flagpole’s shadow (`400 cm`). Even before formal trigonometry, what proportionality insight clicks immediately?',
      opts: [
        'The pole casts `5×` the shadow of the stick (`400 ÷ 80 = 5`), so the unreachable flagpole height must also be `5 × 1 m = 5 m`!',
        'Only short sticks cast measurable shadows',
        'Shadows always match object mass in kilograms',
        'Flagpoles cannot be measured indirectly',
      ],
      exp: 'Indirect outdoor shadow measurement bridges everyday ratio intuition directly into future similar-triangles geometry.',
    },
    mr: {
      q: 'सकाळी १० वाजता शाळेच्या मैदानावर इ. ५ वीच्या जोड्या `१ मी` काठीची सावली (`८० सेमी`) आणि ध्वजस्तंभाची सावली (`४०० सेमी`) मोजतात; त्रिकोणमितीविना कोणती प्रमाणबद्ध युक्ती चमकते?',
      opts: [
        'ध्वजस्तंभाची सावली काठीपेक्षा `५ पट` (`४०० ÷ ८० = ५`) आहे, म्हणून न चढता स्तंभाची उंचीही `५ × १ मी = ५ मी` असेल!',
        'फक्त लहान काठ्यांच्याच सावल्या मोजता येतात',
        'सावली नेहमी किलोग्रॅम वजनाएवढी असते',
        'स्तंभाची उंची अप्रत्यक्षपणे मोजताच येत नाही',
      ],
      exp: 'अप्रत्यक्ष सावली मापनाच्या उपक्रमातून दैनंदिन गुणोत्तर तर्क व पुढील समरूप त्रिकोणाची पायाभरणी सहज होते.',
    },
    hi: {
      q: 'सुबह 10 बजे स्कूल के मैदान में कक्षा 5 की जोड़ियाँ `1 मी` छड़ी की छाया (`80 सेमी`) व झंडे के खंभे की छाया (`400 सेमी`) नापती हैं; त्रिकोणमिति के बिना कौन-सी आनुपातिक सूझ तुरंत चमकती है?',
      opts: [
        'खंभे की छाया छड़ी से `5 गुनी` (`400 ÷ 80 = 5`) है, अतः बिना ऊपर चढ़े खंभे की ऊँचाई भी `5 × 1 मी = 5 मी` होगी!',
        'केवल छोटी छड़ियों की ही छाया मापी जा सकती है',
        'छाया हमेशा किलोग्राम भार के बराबर होती है',
        'ऊँचाई अप्रत्यक्ष रूप से नहीं नापी जा सकती',
      ],
      exp: 'मैदानी छाया-मापन रोज़मर्रा के अनुपात-बोध को समरूप ज्यामिति की शुरुआती समझ से जोड़ देता है।',
    },
  },
  {
    topic: 'Avoiding Rote Slogans When Introducing Prime vs Composite Numbers',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Giving Class 5 pupils `12` square tiles vs `7` square tiles and challenging them to arrange EVERY tile into neat solid rectangles makes the meaning of prime vs composite tangible because:',
      opts: [
        '`12` tiles form multiple rectangles (`1×12`, `2×6`, `3×4` -> composite), while `7` tiles form ONLY `1×7` (or `7×1`) -> prime! And `1` forms just one `1×1` square (neither!)',
        'Prime numbers cannot be counted with tiles',
        'Square numbers have zero factors',
        '`7` forms a `3×2` rectangle cleanly',
      ],
      exp: 'Rectangular tile arrangements reveal visually why `1` is unique (only 1 array) while primes form strictly one `1 × p` strip.',
    },
    mr: {
      q: 'इ. ५ वीच्या मुलांना `१२` आणि `७` चौरस तुकडे देऊन त्यांचे शक्य तेवढे आयत रचायला सांगितल्याने मूळ व संयुक्त संख्यांचा अर्थ कसा ठोस होतो?',
      opts: [
        '`१२` चे अनेक आयत (`१×१२, २×६, ३×४`) बनतात म्हणून ती संयुक्त, तर `७` ची केवळ `१×७` ची एकच पट्टी बनते म्हणून मूळ; आणि `१` ला एकच चौरस (`१×१`) असल्याने ती ना मूळ ना संयुक्त!',
        'मूळ संख्या तुकड्यांनी मोजता येत नाहीत',
        'चौरस संख्यांना अवयव नसतात',
        '`७` चा `३×२` आयत बनतो',
      ],
      exp: 'चौरस फरश्यांच्या आयताकृती मांडणीमुळे अवयव, मूळ-संयुक्त भेद व `१` ची विशेष स्थिती डोळ्यांना स्पष्ट दिसते.',
    },
    hi: {
      q: 'कक्षा 5 के बच्चों को `12` व `7` वर्गाकार टाइलें देकर उनसे सभी संभव आयत बनाने को कहने पर अभाज्य बनाम भाज्य संख्या कैसे स्पष्ट होती है?',
      opts: [
        '`12` से कई आयत (`1×12, 2×6, 3×4` -> भाज्य) बनते हैं, जबकि `7` से केवल `1×7` की पट्टी ही बनती है (अभाज्य); और `1` का केवल एक `1×1` वर्ग बनता है (न अभाज्य न भाज्य)!',
        'अभाज्य संख्याएँ टाइलों से नहीं गिनी जा सकतीं',
        'वर्ग संख्याओं के गुणनखंड नहीं होते',
        '`7` से `3×2` का आयत बनता है',
      ],
      exp: 'आयताकार टाइल विन्यास दृश्य रूप से दिखाता है कि अभाज्य संख्या का केवल एक ही आयत (`1 × p`) क्यों संभव है और `1` विशिष्ट क्यों है।',
    },
  },
  {
    topic: 'Peer Explaining ("Convince Your Skeptical Partner") Routine',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'In the pair protocol "Solve, then convince a skeptical partner WHY your answer must hold", learners develop:',
      opts: [
        'Mathematical communication precision, logical justification skills, and ability to spot hidden flaws in one’s own explanation while defending it',
        'Shouting louder than classmates to win debates',
        'Blind trust in whichever student speaks fastest',
        'Refusal to check calculations',
      ],
      exp: 'Having to persuade a "friendly skeptic" transforms silent answer-hunting into rigorous proof habits suited to primary age.',
    },
    mr: {
      q: '"स्वतः सोडवा आणि तुमच्या शंका घेणाऱ्या जोडीदाराला उत्तर बरोबर का आहे ते पटवून द्या" या जोडी-उपक्रमातून विद्यार्थ्यांत काय विकसित होते?',
      opts: [
        'गणितीय संवादातील अचूकता, तार्किक युक्तिवाद कौशल्य आणि स्वतःच्याच पायऱ्यांतील त्रुटी शोधण्याची जागरूकता',
        'इतरांपेक्षा मोठ्याने ओरडून वाद जिंकण्याची सवय',
        'वेगाने बोलणाऱ्या मुलावर आंधळा विश्वास',
        'गणिताची तपासणी न करण्याची सवय',
      ],
      exp: 'मित्राला तर्काने पटवून देण्याच्या जबाबदारीमुळे मुले गणिताची भाषा स्पष्टपणे बोलू व तपासू लागतात.',
    },
    hi: {
      q: '"पहले हल करो, फिर अपने संदेह करने वाले साथी को प्रमाण सहित समझाओ कि उत्तर सही क्यों है" गतिविधि से छात्रों में क्या विकसित होता है?',
      opts: [
        'गणितीय संप्रेषण की सटीकता, तार्किक औचित्य कौशल और समझाते समय स्वयं की तर्क-कमियाँ पकड़ने की क्षमता',
        'तेज़ आवाज़ में बहस जीतने की आदत',
        'जल्दी बोलने वाले पर अंधविश्वास',
        'गणना न जाँचने की आदत',
      ],
      exp: 'तर्कशील साथी को संतुष्ट करने की प्रक्रिया प्राथमिक स्तर पर ही प्रमाण-आधारित गणितीय संवाद की नींव रखती है।',
    },
  },
];
