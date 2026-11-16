import { CuratedTrilingualMcq } from './types';

// Batch 3 Primary Mathematics Content Part 5 (28 verified trilingual MCQs: Data Handling, Patterns, Unitary Method, SI, Ages, Speed)
export const MAHA_TET_P1_B3_MATH_C5: CuratedTrilingualMcq[] = [
  {
    topic: 'Pictograph Symbol Value Comparison',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'In a tree-plantation pictograph, 1 tree icon represents 12 saplings. Village A shows 4 full icons and 1 half icon, whereas Village B shows 6 full icons and 1 half icon. How many MORE saplings did Village B plant than Village A?',
      opts: ['24', '18', '30', '12'],
      exp: 'Difference = (6.5 − 4.5) icons = 2 full icons. Saplings = 2 × 12 = 24.',
    },
    mr: {
      q: 'एका वृक्षारोपण चित्रालेखात १ झाडाचे चिन्ह = १२ रोपे दर्शवते. गाव अ पुढे ४ पूर्ण व १ अर्धे चिन्ह, तर गाव ब पुढे ६ पूर्ण व १ अर्धे चिन्ह आहे; गाव ब ने गाव अ पेक्षा किती अधिक रोपे लावली?',
      opts: ['२४', '१८', '३०', '१२'],
      exp: 'फरक = ६.५ − ४.५ = २ पूर्ण चिन्हे; २ × १२ = २४ रोपे.',
    },
    hi: {
      q: 'एक वृक्षारोपण चित्रालेख में 1 पेड़ का प्रतीक 12 पौधे दर्शाता है। गाँव A में 4 पूरे व 1 आधा प्रतीक तथा गाँव B में 6 पूरे व 1 आधा प्रतीक हैं। गाँव B ने गाँव A से कितने अधिक पौधे लगाए?',
      opts: ['24', '18', '30', '12'],
      exp: 'अंतर = (6.5 − 4.5) = 2 प्रतीक; 2 × 12 = 24 पौधे।',
    },
  },
  {
    topic: 'Average Adjustment With New Entrant',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'The average score of 6 students in a math test is 72. When a 7th student joins the group, the average rises to 74. How many marks did the 7th student score?',
      opts: ['86', '84', '78', '82'],
      exp: 'Total of 6 = 6 × 72 = 432. Total of 7 = 7 × 74 = 518. 7th score = 518 − 432 = 86.',
    },
    mr: {
      q: '६ विद्यार्थ्यांचे गणितातील सरासरी गुण ७२ आहेत. सातवा विद्यार्थी समूहात आल्यावर सरासरी ७४ झाली, तर सातव्या विद्यार्थ्याचे गुण किती?',
      opts: ['८६', '८४', '७८', '८२'],
      exp: '६ जणांची बेरीज = ४३२; ७ जणांची बेरीज = ५१८; सातव्याचे गुण = ५१८ − ४३२ = ८६.',
    },
    hi: {
      q: '6 विद्यार्थियों के गणित में औसत अंक 72 हैं। 7वें विद्यार्थी के जुड़ने पर औसत बढ़कर 74 हो जाता है। 7वें विद्यार्थी के अंक कितने हैं?',
      opts: ['86', '84', '78', '82'],
      exp: '6 का योग = 432; 7 का योग = 518; 7वें के अंक = 518 − 432 = 86.',
    },
  },
  {
    topic: 'Doubling Plus One Number Sequence',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Find the missing next term in the pattern: 4, 9, 19, 39, 79, ___',
      opts: ['159', '149', '161', '158'],
      exp: 'Each term follows (previous × 2) + 1: (79 × 2) + 1 = 158 + 1 = 159.',
    },
    mr: {
      q: 'संख्यामालिकेतील पुढील पद ओळखा: ४, ९, १९, ३९, ७९, ___',
      opts: ['१५९', '१४९', '१६१', '१५८'],
      exp: 'नियम: (मागील पद × २) + १. म्हणून (७९ × २) + १ = १५९.',
    },
    hi: {
      q: 'दी गई संख्या श्रृंखला में अगला पद ज्ञात कीजिए: 4, 9, 19, 39, 79, ___',
      opts: ['159', '149', '161', '158'],
      exp: 'नियम: (पिछला पद × 2) + 1 -> (79 × 2) + 1 = 159.',
    },
  },
  {
    topic: 'Increasing Even Differences Sequence',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Complete the number sequence: 3, 7, 13, 21, 31, ___',
      opts: ['43', '41', '45', '42'],
      exp: 'Consecutive differences increase by 2: +4, +6, +8, +10, +12. So 31 + 12 = 43.',
    },
    mr: {
      q: 'क्रमवार मालिका पूर्ण करा: ३, ७, १३, २१, ३१, ___',
      opts: ['४३', '४१', '४५', '४२'],
      exp: 'फरक अनुक्रमे +४, +६, +८, +१०, +१२ असा वाढतो; ३१ + १२ = ४३.',
    },
    hi: {
      q: 'श्रृंखला पूर्ण कीजिए: 3, 7, 13, 21, 31, ___',
      opts: ['43', '41', '45', '42'],
      exp: 'अंतर +4, +6, +8, +10, +12 के क्रम से बढ़ रहा है। 31 + 12 = 43.',
    },
  },
  {
    topic: 'Two-Interleaved Number Pattern',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Identify the missing number in this alternating sequence: 2, 15, 5, 12, 8, 9, 11, ___',
      opts: ['6', '14', '7', '5'],
      exp: 'Odd positions increase by 3 (2, 5, 8, 11); even positions decrease by 3 (15, 12, 9, 6).',
    },
    mr: {
      q: 'एकाआड एक संख्यांची ही मालिका पूर्ण करा: २, १५, ५, १२, ८, ९, ११, ___',
      opts: ['६', '१४', '७', '५'],
      exp: 'विषम स्थानी +३ (२, ५, ८, ११) व सम स्थानी −३ (१५, १२, ९, ६).',
    },
    hi: {
      q: 'इस एकांतर श्रृंखला में लुप्त संख्या ज्ञात कीजिए: 2, 15, 5, 12, 8, 9, 11, ___',
      opts: ['6', '14', '7', '5'],
      exp: 'विषम स्थान (+3): 2, 5, 8, 11; सम स्थान (−3): 15, 12, 9, 6.',
    },
  },
  {
    topic: 'Unitary Method Dozens to Pieces',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'If 2 dozen bananas cost ₹108, what will be the cost of 18 bananas at the same rate?',
      opts: ['₹81', '₹72', '₹90', '₹84'],
      exp: '2 dozen = 24 bananas cost ₹108 -> 18/24 = 3/4 -> (3/4) × 108 = ₹81.',
    },
    mr: {
      q: '२ डझन केळ्यांची किंमत ₹१०८ आहे, तर त्याच दराने १८ केळ्यांची किंमत किती होईल?',
      opts: ['₹८१', '₹७२', '₹९०', '₹८४'],
      exp: '२ डझन = २४ केळी -> १८/२४ = ३/४ पट -> (३/४) × १०८ = ₹८१.',
    },
    hi: {
      q: 'यदि 2 दर्जन केलों का मूल्य ₹108 है, तो उसी दर से 18 केलों का मूल्य क्या होगा?',
      opts: ['₹81', '₹72', '₹90', '₹84'],
      exp: '24 केलों का मूल्य ₹108, अतः 18 केलों = (18/24) × 108 = ₹81.',
    },
  },
  {
    topic: 'Simple Interest Total Amount Returned',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A farmer deposits ₹4,500 in a cooperative bank paying 8% per annum simple interest. What TOTAL amount (principal + interest) will he get back after 3 years?',
      opts: ['₹5,580', '₹5,480', '₹5,620', '₹1,080'],
      exp: 'SI = (4,500 × 8 × 3) ÷ 100 = ₹1,080. Total amount = 4,500 + 1,080 = ₹5,580.',
    },
    mr: {
      q: 'एका शेतकऱ्याने सहकारी बँकेत द.सा.द.शे. ८% सरळव्याजाने ₹४,५०० ठेवले, तर ३ वर्षांनंतर त्याला व्याजासह एकूण किती रास परत मिळेल?',
      opts: ['₹५,५८०', '₹५,४८०', '₹५,६२०', '₹१,०८०'],
      exp: 'सरळव्याज = (४,५०० × ८ × ३) ÷ १०० = ₹१,०८०. एकूण रास = ४,५०० + १,०८० = ₹५,५८०.',
    },
    hi: {
      q: 'एक किसान सहकारी बैंक में 8% वार्षिक साधारण ब्याज पर ₹4,500 जमा करता है। 3 वर्ष बाद उसे कुल कितनी मिश्रधन राशि वापस मिलेगी?',
      opts: ['₹5,580', '₹5,480', '₹5,620', '₹1,080'],
      exp: 'साधारण ब्याज = (4500×8×3)/100 = ₹1,080. कुल राशि = 4,500 + 1,080 = ₹5,580.',
    },
  },
  {
    topic: 'Simple Interest Rate Determination',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'At what annual rate of simple interest will ₹3,000 earn ₹720 as interest in 4 years?',
      opts: ['6% p.a.', '5% p.a.', '8% p.a.', '4.5% p.a.'],
      exp: 'Rate = (SI × 100) ÷ (P × T) = (720 × 100) ÷ (3,000 × 4) = 72,000 ÷ 12,000 = 6% p.a.',
    },
    mr: {
      q: 'द.सा.द.शे. किती टक्के सरळव्याज दराने ₹३,००० मुदलाचे ४ वर्षांत ₹७२० व्याज मिळेल?',
      opts: ['६%', '५%', '८%', '४.५%'],
      exp: 'दर = (७२० × १००) ÷ (३,००० × ४) = ६%.',
    },
    hi: {
      q: 'किस वार्षिक साधारण ब्याज दर से ₹3,000 पर 4 वर्षों में ₹720 ब्याज प्राप्त होगा?',
      opts: ['6%', '5%', '8%', '4.5%'],
      exp: 'दर = (720 × 100) ÷ (3,000 × 4) = 6% वार्षिक।',
    },
  },
  {
    topic: 'Mother-Daughter Age Word Puzzle',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'Currently, a mother is 3 times as old as her daughter. After 10 years, the mother will be twice as old as her daughter. What is the daughter’s PRESENT age?',
      opts: ['10 years', '12 years', '8 years', '15 years'],
      exp: 'Let daughter = x, mother = 3x. In 10 years: 3x + 10 = 2(x + 10) -> 3x + 10 = 2x + 20 -> x = 10 years.',
    },
    mr: {
      q: 'आईचे सध्याचे वय तिच्या मुलीच्या वयाच्या तिप्पट आहे. १० वर्षांनंतर आईचे वय मुलीच्या वयाच्या दुप्पट होईल, तर मुलीचे आजचे वय किती?',
      opts: ['१० वर्षे', '१२ वर्षे', '८ वर्षे', '१५ वर्षे'],
      exp: '३x + १० = २(x + १०) -> x = १० वर्षे (आज १० व ३०; दहा वर्षांनी २० व ४०).',
    },
    hi: {
      q: 'वर्तमान में माता की आयु अपनी पुत्री की आयु की 3 गुनी है। 10 वर्ष बाद माता की आयु पुत्री की आयु की दोगुनी होगी। पुत्री की वर्तमान आयु क्या है?',
      opts: ['10 वर्ष', '12 वर्ष', '8 वर्ष', '15 वर्ष'],
      exp: '3x + 10 = 2(x + 10) से x = 10 वर्ष।',
    },
  },
  {
    topic: 'Equal Coin Denominations Puzzle',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A piggy bank contains equal numbers of ₹5 coins and ₹2 coins totaling ₹98 in value. How many ₹5 coins are inside?',
      opts: ['14', '12', '16', '18'],
      exp: 'Each pair (₹5 + ₹2) equals ₹7. Number of pairs = 98 ÷ 7 = 14 coins each.',
    },
    mr: {
      q: 'एका गल्ल्यात ₹५ ची आणि ₹२ ची समान संख्येने नाणी असून त्यांची एकूण किंमत ₹९८ आहे, तर त्यात ₹५ ची किती नाणी आहेत?',
      opts: ['१४', '१२', '१६', '१८'],
      exp: 'एका जोडीची किंमत ₹७ -> ९८ ÷ ७ = १४ नाणी.',
    },
    hi: {
      q: 'एक गुल्लक में ₹5 और ₹2 के बराबर संख्या में सिक्के हैं, जिनका कुल मूल्य ₹98 है। इसमें ₹5 के कितने सिक्के हैं?',
      opts: ['14', '12', '16', '18'],
      exp: 'एक जोड़ी = ₹7; जोड़ों की संख्या = 98 ÷ 7 = 14 सिक्के।',
    },
  },
  {
    topic: 'Bar Data Monthly Book Lending Comparison',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A school library recorded monthly book loans: June = 120, July = 165, August = 210, September = 195. How many MORE books were borrowed in August and September combined than in June and July combined?',
      opts: ['120', '105', '135', '90'],
      exp: 'Aug + Sep = 210 + 195 = 405; Jun + Jul = 120 + 165 = 285. Difference = 405 − 285 = 120.',
    },
    mr: {
      q: 'शाळेच्या ग्रंथालयातून देवघेव झालेल्या पुस्तकांची संख्या: जून १२०, जुलै १६५, ऑगस्ट २१०, सप्टेंबर १९५. जून-जुलै एकत्रितपेक्षा ऑगस्ट-सप्टेंबरमध्ये किती पुस्तके अधिक नेली गेली?',
      opts: ['१२०', '१०५', '१३५', '९०'],
      exp: '(२१० + १९५) − (१२० + १६५) = ४०५ − २८५ = १२०.',
    },
    hi: {
      q: 'स्कूल पुस्तकालय में पुस्तक निर्गम: जून = 120, जुलाई = 165, अगस्त = 210, सितंबर = 195। जून-जुलाई के योग से अगस्त-सितंबर में कितनी अधिक पुस्तकें ली गईं?',
      opts: ['120', '105', '135', '90'],
      exp: '(210 + 195) − (120 + 165) = 405 − 285 = 120.',
    },
  },
  {
    topic: 'Inverse Proportion Masons Wall Construction',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'If 12 masons can build a school compound wall in 15 days, how many days will 18 masons working at the same pace take to build it?',
      opts: ['10 days', '12 days', '9 days', '22.5 days'],
      exp: 'Total work = 12 × 15 = 180 mason-days. Days for 18 masons = 180 ÷ 18 = 10 days.',
    },
    mr: {
      q: '१२ गवंडी शाळेची संरक्षक भिंत १५ दिवसांत बांधतात, तर त्याच वेगाने १८ गवंडी ती भिंत किती दिवसांत बांधतील?',
      opts: ['१० दिवस', '१२ दिवस', '९ दिवस', '२२.५ दिवस'],
      exp: '१२ × १५ = १८० माणूस-दिवस; १८ गवंड्यांना = १८० ÷ १८ = १० दिवस.',
    },
    hi: {
      q: '12 राजमिस्त्री एक दीवार 15 दिनों में बनाते हैं। उसी गति से 18 राजमिस्त्री उसे कितने दिनों में बनाएँगे?',
      opts: ['10 दिन', '12 दिन', '9 दिन', '22.5 दिन'],
      exp: 'कुल कार्य = 12 × 15 = 180; दिन = 180 ÷ 18 = 10 दिन।',
    },
  },
  {
    topic: 'Endpoint Tree Planting Interval Count',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'Along one side of a straight 480 m road, trees are planted every 12 metres, starting right at the 0 m beginning point and ending at the 480 m mark. How many trees are planted in all?',
      opts: ['41', '40', '39', '42'],
      exp: 'Number of intervals = 480 ÷ 12 = 40. Including both starting and ending trees: 40 + 1 = 41.',
    },
    mr: {
      q: '४८० मीटर लांबीच्या सरळ रस्त्याच्या एका कडेने सुरुवातीच्या बिंदूपासून शेवटच्या बिंदूपर्यंत दर १२ मीटर अंतरावर झाडे लावली, तर एकूण किती झाडे लागतील?',
      opts: ['४१', '४०', '३९', '४२'],
      exp: 'टप्पे = ४८० ÷ १२ = ४०; पहिले व शेवटचे दोन्ही झाड धरून = ४० + १ = ४१.',
    },
    hi: {
      q: '480 मी लंबी सीधी सड़क के एक किनारे 0 मी से 480 मी तक हर 12 मीटर पर पौधे लगाए जाते हैं। कुल कितने पौधे लगेंगे?',
      opts: ['41', '40', '39', '42'],
      exp: 'अंतराल = 480 ÷ 12 = 40; दोनों सिरे शामिल करने पर 40 + 1 = 41 पौधे।',
    },
  },
  {
    topic: 'Quiz Marking Scheme Positive & Negative Score',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A 25-question scholarship quiz awards +4 marks for each correct answer and deducts 1 mark (−1) for each wrong answer. Ananya answered all 25 questions and scored 70 marks. How many questions did she answer CORRECTLY?',
      opts: ['19', '18', '20', '17'],
      exp: 'Let correct = c, wrong = 25 − c. 4c − (25 − c) = 70 -> 5c = 95 -> c = 19 (19×4 − 6 = 70).',
    },
    mr: {
      q: '२५ प्रश्नांच्या स्पर्धेत बरोबर उत्तरास +४ गुण व चुकीच्या उत्तरास −१ गुण मिळतो. अनन्याने सर्व २५ प्रश्न सोडवले व तिला ७० गुण मिळाले, तर तिचे किती प्रश्न बरोबर आले?',
      opts: ['१९', '१८', '२०', '१७'],
      exp: '४c − (२५ − c) = ७० -> ५c = ९५ -> c = १९ (१९×४ − ६ = ७०).',
    },
    hi: {
      q: '25 प्रश्नों की प्रश्नोत्तरी में सही उत्तर के +4 और गलत उत्तर के −1 अंक हैं। अनन्या ने सभी 25 प्रश्न हल किए और 70 अंक पाए। उसने कितने प्रश्न सही किए?',
      opts: ['19', '18', '20', '17'],
      exp: '4c − (25 − c) = 70 -> 5c = 95 -> c = 19.',
    },
  },
  {
    topic: 'Reverse Arithmetic Operations Puzzle',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Sneha thinks of a whole number, doubles it, subtracts 9 from the product, and divides the difference by 3 to get 11. What was her original number?',
      opts: ['21', '19', '24', '18'],
      exp: 'Work backward: 11 × 3 = 33; 33 + 9 = 42; 42 ÷ 2 = 21.',
    },
    mr: {
      q: 'स्नेहाच्या मनातील एका संख्येची दुप्पट करून त्यातून ९ वजा केले व आलेल्या उत्तराला ३ ने भागल्यास भागाकार ११ येतो, तर ती मूळ संख्या कोणती?',
      opts: ['२१', '१९', '२४', '१८'],
      exp: 'उलट क्रमाने: ११ × ३ = ३३; ३३ + ९ = ४२; ४२ ÷ २ = २१.',
    },
    hi: {
      q: 'स्नेहा एक संख्या सोचती है, उसे दोगुना कर 9 घटाती है और परिणाम को 3 से भाग देने पर 11 प्राप्त होता है। मूल संख्या क्या थी?',
      opts: ['21', '19', '24', '18'],
      exp: 'उल्टा क्रम: 11 × 3 = 33; 33 + 9 = 42; 42 ÷ 2 = 21.',
    },
  },
  {
    topic: 'Overlapping Four-Day Mean Temperature',
    pattern: 'Word Problem',
    difficulty: 'Difficult',
    en: {
      q: 'For a 7-day week (Monday–Sunday), the mean temperature is 32°C. The mean of Monday–Thursday is 31°C, and the mean of Thursday–Sunday is 34°C. What was Thursday’s temperature?',
      opts: ['36°C', '35°C', '34°C', '33°C'],
      exp: 'Mon–Sun sum = 7×32 = 224. Mon–Thu sum = 4×31 = 124; Thu–Sun sum = 4×34 = 136. Thu = 124 + 136 − 224 = 36°C.',
    },
    mr: {
      q: 'सोमवार ते रविवार या ७ दिवसांचे सरासरी तापमान ३२°C आहे. सोमवार–गुरुवारची सरासरी ३१°C व गुरुवार–रविवारची सरासरी ३४°C असल्यास गुरुवारी तापमान किती होते?',
      opts: ['३६°C', '३५°C', '३४°C', '३३°C'],
      exp: '(४×३१ + ४×३४) − (७×३२) = (१२४ + १३६) − २२४ = ३६°C.',
    },
    hi: {
      q: 'सोमवार से रविवार (7 दिन) का औसत तापमान 32°C है। सोम–गुरु का औसत 31°C और गुरु–रवि का औसत 34°C है। गुरुवार का तापमान क्या था?',
      opts: ['36°C', '35°C', '34°C', '33°C'],
      exp: '(124 + 136) − 224 = 36°C.',
    },
  },
  {
    topic: 'Cyclic Bead Color Pattern Remainder',
    pattern: 'Visual Reasoning',
    difficulty: 'Easy',
    en: {
      q: 'Colored beads are threaded repeatedly in this exact 5-bead order: Red, Blue, Blue, Yellow, Green, Red, Blue, Blue, Yellow, Green, ... What color is the 48th bead?',
      opts: ['Blue', 'Red', 'Yellow', 'Green'],
      exp: 'Cycle length = 5. 48 = 5 × 9 + remainder 3. The 3rd position in the cycle is Blue.',
    },
    mr: {
      q: 'लाल, निळा, निळा, पिवळा, हिरवा या ५ मण्यांच्या क्रमाने एक माळ अखंड ओवली आहे, तर या माळेतील ४८ वा मणी कोणत्या रंगाचा असेल?',
      opts: ['निळा', 'लाल', 'पिवळा', 'हिरवा'],
      exp: '४८ ÷ ५ केल्यास बाकी ३ उरते; क्रमानुसार ३ रा मणी निळा आहे.',
    },
    hi: {
      q: 'रंगीन मोती लाल, नीला, नीला, पीला, हरा के 5-मोती चक्र में बार-बार पिरोए गए हैं। 48वाँ मोती किस रंग का होगा?',
      opts: ['नीला', 'लाल', 'पीला', 'हरा'],
      exp: '48 को 5 से भाग देने पर शेष 3 बचता है; तीसरे स्थान पर नीला मोती है।',
    },
  },
  {
    topic: 'Relative Separation Opposite Cyclists',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'At 9:00 a.m., Cyclist A rides due East at 14 km/h and Cyclist B rides due West at 18 km/h starting from the same school gate. How far apart will they be at 11:30 a.m.?',
      opts: ['80 km', '72 km', '64 km', '90 km'],
      exp: 'Combined speed = 14 + 18 = 32 km/h. Time = 2.5 hours. Separation = 32 × 2.5 = 80 km.',
    },
    mr: {
      q: 'सकाळी ९:०० वाजता शाळेच्या दरवाजातून अ पूर्वेकडे १४ किमी/तास व ब पश्चिमेकडे १८ किमी/तास वेगाने निघाले, तर सकाळी ११:३० वाजता ते एकमेकांपासून किती दूर असतील?',
      opts: ['८० किमी', '७२ किमी', '६४ किमी', '९० किमी'],
      exp: 'सापेक्ष वेग = १४ + १८ = ३२ किमी/तास; वेळ = २.५ तास; अंतर = ३२ × २.५ = ८० किमी.',
    },
    hi: {
      q: 'सुबह 9:00 बजे एक ही गेट से साइकिल चालक A पूर्व की ओर 14 किमी/घं तथा B पश्चिम की ओर 18 किमी/घं से चलते हैं। 11:30 बजे वे आपस में कितनी दूर होंगे?',
      opts: ['80 किमी', '72 किमी', '64 किमी', '90 किमी'],
      exp: 'सापेक्ष गति = 14 + 18 = 32 किमी/घं; समय = 2.5 घंटे; दूरी = 80 किमी।',
    },
  },
  {
    topic: 'Overhead Repair Cost & Profit Percentage',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'Vikram bought a used bicycle for ₹3,200, spent ₹300 on new tyres, and sold it for ₹4,200. What is his percentage profit?',
      opts: ['20%', '25%', '18%', '15%'],
      exp: 'Effective CP = 3,200 + 300 = ₹3,500. Profit = 4,200 − 3,500 = ₹700. Profit % = (700 ÷ 3,500) × 100 = 20%.',
    },
    mr: {
      q: 'विक्रमने एक जुनी सायकल ₹३,२०० ना घेतली, दुरुस्तीवर ₹३०० खर्च केले व ₹४,२०० ना विकली, तर त्याला शेकडा नफा किती झाला?',
      opts: ['२०%', '२५%', '१८%', '१५%'],
      exp: 'एकूण खरेदी = ३,५००; नफा = ७००; शेकडा नफा = (७०० ÷ ३,५००) × १०० = २०%.',
    },
    hi: {
      q: 'विक्रम ने एक पुरानी साइकिल ₹3,200 में खरीदी, ₹300 मरम्मत पर खर्च किए और ₹4,200 में बेच दी। उसका लाभ प्रतिशत क्या है?',
      opts: ['20%', '25%', '18%', '15%'],
      exp: 'कुल लागत = ₹3,500; लाभ = ₹700; लाभ% = (700/3500)×100 = 20%.',
    },
  },
  {
    topic: 'Total Handshakes Among Eight Teachers',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'At a cluster meeting, 8 teachers each shake hands with every other teacher exactly once. How many handshakes take place in total?',
      opts: ['28', '56', '32', '64'],
      exp: 'Total unique pairs = 8 × 7 ÷ 2 = 28 handshakes.',
    },
    mr: {
      q: 'एका बैठकीत ८ शिक्षकांनी प्रत्येकाने इतर प्रत्येक शिक्षकाशी एकदाच हस्तांदोलन केले, तर एकूण किती हस्तांदोलने झाली?',
      opts: ['२८', '५६', '३२', '६४'],
      exp: 'एकूण हस्तांदोलने = (८ × ७) ÷ २ = २८.',
    },
    hi: {
      q: 'एक बैठक में 8 शिक्षकों ने एक-दूसरे से ठीक एक-एक बार हाथ मिलाया। कुल कितनी बार हाथ मिलाए गए?',
      opts: ['28', '56', '32', '64'],
      exp: 'कुल हस्तमिलन = (8 × 7) ÷ 2 = 28.',
    },
  },
  {
    topic: 'Sum of Even Numbers From 2 to 40',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Find the sum of all even numbers from 2 to 40 inclusive: 2 + 4 + 6 + ... + 40.',
      opts: ['420', '400', '440', '380'],
      exp: '20 terms with first = 2 and last = 40. Sum = (20 ÷ 2) × (2 + 40) = 10 × 42 = 420.',
    },
    mr: {
      q: '२ ते ४० पर्यंतच्या सर्व सम संख्यांची बेरीज किती? (२ + ४ + ६ + ... + ४०)',
      opts: ['४२०', '४००', '४४०', '३८०'],
      exp: 'एकूण २० पदे; बेरीज = (२० ÷ २) × (२ + ४०) = १० × ४२ = ४२०.',
    },
    hi: {
      q: '2 से 40 तक की सभी सम संख्याओं का योग ज्ञात कीजिए: 2 + 4 + 6 + ... + 40.',
      opts: ['420', '400', '440', '380'],
      exp: 'कुल 20 पद; योग = (20/2) × (2 + 40) = 420.',
    },
  },
  {
    topic: 'Hostel Water Reserve With Extra Students',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'A residential school tank holds enough water to last 60 students for 24 days. If 20 more students join the hostel, how many days will the same supply last?',
      opts: ['18 days', '16 days', '20 days', '32 days'],
      exp: 'Supply = 60 × 24 = 1,440 student-days. With 60 + 20 = 80 students: 1,440 ÷ 80 = 18 days.',
    },
    mr: {
      q: 'एका वसतिगृहातील पाणीसाठा ६० विद्यार्थ्यांना २४ दिवस पुरतो. तिथे आणखी २० विद्यार्थी दाखल झाल्यास तोच साठा किती दिवस पुरेल?',
      opts: ['१८ दिवस', '१६ दिवस', '२० दिवस', '३२ दिवस'],
      exp: '(६० × २४) ÷ (६० + २०) = १,४४० ÷ ८० = १८ दिवस.',
    },
    hi: {
      q: 'एक छात्रावास की जल आपूर्ति 60 छात्रों के लिए 24 दिन चलती है। यदि 20 और छात्र आ जाएँ, तो वही पानी कितने दिन चलेगा?',
      opts: ['18 दिन', '16 दिन', '20 दिन', '32 दिन'],
      exp: '(60 × 24) ÷ 80 = 1,440 ÷ 80 = 18 दिन।',
    },
  },
  {
    topic: 'Sum of First Nine Odd Rows',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'In a school formation, Row 1 has 1 pupil, Row 2 has 3, Row 3 has 5, continuing up to Row 9 (17 pupils). How many pupils stand in all 9 rows together?',
      opts: ['81', '72', '90', '64'],
      exp: 'Sum of the first 9 consecutive odd numbers (1 + 3 + ... + 17) = 9² = 81.',
    },
    mr: {
      q: 'शाळेच्या कवायतीमध्ये पहिल्या रांगेत १, दुसऱ्या रांगेत ३, तिसऱ्या रांगेत ५ याप्रमाणे ९ व्या रांगेत १७ विद्यार्थी उभे आहेत, तर सर्व ९ रांगांत एकूण किती विद्यार्थी आहेत?',
      opts: ['८१', '७२', '९०', '६४'],
      exp: 'पहिल्या ९ विषम संख्यांची बेरीज = ९² = ८१.',
    },
    hi: {
      q: 'स्कूल परेड की पहली पंक्ति में 1, दूसरी में 3, तीसरी में 5 इसी क्रम से 9वीं पंक्ति तक छात्र खड़े हैं। सभी 9 पंक्तियों में कुल कितने छात्र हैं?',
      opts: ['81', '72', '90', '64'],
      exp: 'प्रथम 9 विषम संख्याओं का योग = 9² = 81.',
    },
  },
  {
    topic: 'Cost Price From Loss Percentage',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'Selling an old wooden desk for ₹2,700 results in a 10% loss. What was the original COST PRICE of the desk?',
      opts: ['₹3,000', '₹2,970', '₹2,430', '₹3,100'],
      exp: '90% of CP = ₹2,700 -> 1% = ₹30 -> CP = 100 × 30 = ₹3,000.',
    },
    mr: {
      q: 'एक जुने लाकडी टेबल ₹२,७०० ला विकल्यामुळे १०% तोटा झाला, तर त्या टेबलाची मूळ खरेदी किंमत किती होती?',
      opts: ['₹३,०००', '₹२,९७०', '₹२,४३०', '₹३,१००'],
      exp: '९०% = २,७०० -> १००% = (२,७०० ÷ ९०) × १०० = ₹३,०००.',
    },
    hi: {
      q: 'एक पुरानी मेज़ ₹2,700 में बेचने पर 10% की हानि होती है। मेज़ का क्रय मूल्य क्या था?',
      opts: ['₹3,000', '₹2,970', '₹2,430', '₹3,100'],
      exp: '90% = 2,700, अतः 100% = (2,700 ÷ 90) × 100 = ₹3,000.',
    },
  },
  {
    topic: 'Tally Chart Election Margin',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'During a Class 5 monitor vote using groups of 5 tallies, Candidate A received 5 full tally bundles plus 3 single strokes, while Candidate B received 3 full bundles plus 4 single strokes. By how many votes did Candidate A win?',
      opts: ['9 votes', '11 votes', '8 votes', '7 votes'],
      exp: 'A = 5×5 + 3 = 28 votes; B = 3×5 + 4 = 19 votes. Margin = 28 − 19 = 9 votes.',
    },
    mr: {
      q: 'ताळ्याच्या खुणांनी (Tally marks) घेतलेल्या मतदानात उमेदवार अ ला ५ चे ५ पूर्ण गट व ३ सुट्या रेषा, तर ब ला ५ चे ३ पूर्ण गट व ४ सुट्या रेषा मिळाल्या; अ किती मतांच्या फरकाने विजयी झाला?',
      opts: ['९ मतांनी', '११ मतांनी', '८ मतांनी', '७ मतांनी'],
      exp: 'अ = २८ मते; ब = १९ मते. फरक = २८ − १९ = ९ मते.',
    },
    hi: {
      q: 'मॉनीटर चुनाव में टैली चिह्नों (5 के बंडल) से A को 5 पूरे बंडल और 3 अकेले निशान तथा B को 3 पूरे बंडल और 4 अकेले निशान मिले। A कितने मतों से जीता?',
      opts: ['9 मत', '11 मत', '8 मत', '7 मत'],
      exp: 'A = 28 मत, B = 19 मत; जीत का अंतर = 28 − 19 = 9 मत।',
    },
  },
  {
    topic: 'Smaller Number From Sum and Difference',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'The sum of two numbers is 94 and their difference is 28. What is the SMALLER of the two numbers?',
      opts: ['33', '61', '38', '28'],
      exp: 'Smaller number = (Sum − Difference) ÷ 2 = (94 − 28) ÷ 2 = 66 ÷ 2 = 33.',
    },
    mr: {
      q: 'दोन संख्यांची बेरीज ९४ व त्यांतील फरक २८ आहे, तर त्यांपैकी लहान संख्या कोणती?',
      opts: ['३३', '६१', '३८', '२८'],
      exp: 'लहान संख्या = (९४ − २८) ÷ २ = ६६ ÷ २ = ३३.',
    },
    hi: {
      q: 'दो संख्याओं का योग 94 और अंतर 28 है। इनमें से छोटी संख्या क्या है?',
      opts: ['33', '61', '38', '28'],
      exp: 'छोटी संख्या = (94 − 28) ÷ 2 = 33.',
    },
  },
  {
    topic: 'Train Crossing Platform Time',
    pattern: 'Word Problem',
    difficulty: 'Difficult',
    en: {
      q: 'A 140 m long train running at 54 km/h completely crosses a 160 m long railway platform. How many seconds does it take?',
      opts: ['20 seconds', '18 seconds', '24 seconds', '15 seconds'],
      exp: 'Speed = 54 × (5/18) = 15 m/s. Total distance = 140 + 160 = 300 m. Time = 300 ÷ 15 = 20 seconds.',
    },
    mr: {
      q: '५४ किमी/तास वेगाने धावणारी १४० मी लांबीची आगगाडी १६० मी लांबीचा प्लॅटफॉर्म किती सेकंदांत पूर्णपणे ओलांडेल?',
      opts: ['२० सेकंद', '१८ सेकंद', '२४ सेकंद', '१५ सेकंद'],
      exp: 'वेग = ५४ × (५/१८) = १५ मी/से. एकूण अंतर = १४० + १६० = ३०० मी. वेळ = ३०० ÷ १५ = २० सेकंद.',
    },
    hi: {
      q: '54 किमी/घं की चाल से चलती 140 मी लंबी रेलगाड़ी 160 मी लंबे प्लेटफॉर्म को कितने सेकंड में पूरी तरह पार करेगी?',
      opts: ['20 सेकंड', '18 सेकंड', '24 सेकंड', '15 सेकंड'],
      exp: 'चाल = 54 × (5/18) = 15 मी/से; कुल दूरी = 300 मी; समय = 300 ÷ 15 = 20 सेकंड।',
    },
  },
  {
    topic: 'Finding Median of Nine Unsorted Marks',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Find the MEDIAN of these nine quiz scores: 18, 25, 14, 29, 21, 16, 24, 30, 19.',
      opts: ['21', '22', '19', '24'],
      exp: 'Sort ascending: 14, 16, 18, 19, 21, 24, 25, 29, 30. The middle (5th) value is 21.',
    },
    mr: {
      q: '१८, २५, १४, २९, २१, १६, २४, ३०, १९ या नऊ गुणांचा मध्यक (Median) काढा.',
      opts: ['२१', '२२', '१९', '२४'],
      exp: 'चढता क्रम: १४, १६, १८, १९, २१, २४, २५, २९, ३०. मध्यपद (५ वे) = २१.',
    },
    hi: {
      q: 'दिए गए नौ प्राप्तांकों की माध्यिका (Median) ज्ञात कीजिए: 18, 25, 14, 29, 21, 16, 24, 30, 19.',
      opts: ['21', '22', '19', '24'],
      exp: 'आरोही क्रम: 14, 16, 18, 19, 21, 24, 25, 29, 30. ठीक बीच का 5वाँ मान = 21.',
    },
  },
];
