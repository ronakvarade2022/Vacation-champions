import { CuratedTrilingualMcq } from './types';

// MAHA TET Paper 1 (Classes 1-5) — Mathematics Content Part 2 (35 Distinct Problems)
export const MAHA_TET_P1_B1_MATH_C2: CuratedTrilingualMcq[] = [
  {
    topic: 'Place Value Expansion & Compact Form',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Write in standard compact numeral form: 6 Ten-Thousands + 4 Thousands + 0 Hundreds + 8 Tens + 5 Ones + 9 Hundreds added additionally.',
      opts: ['64,985', '64,085', '65,085', '64,895'],
      exp: '60,000 + 4,000 + (0 + 900) + 80 + 5 = 64,985.',
    },
    mr: {
      q: '६ दशहजार + ४ हजार + ० शतक + ८ दशक + ५ एकक या संख्येत ९ शतक मिळवल्यास कोणती संख्या तयार होईल?',
      opts: ['64,985', '64,085', '65,085', '64,895'],
      exp: '६४,०८५ + ९०० = ६४,९८५.',
    },
    hi: {
      q: '६ दस-हजार + ४ हजार + ० सैकड़ा + ८ दहाई + ५ इकाई में ९ सैकड़ा और जोड़ने पर मान क्या होगा?',
      opts: ['64,985', '64,085', '65,085', '64,895'],
      exp: '६४,०८५ + ९०० = ६४,९८५।',
    },
  },
  {
    topic: 'Rounding to Nearest Hundred Bounds',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'When rounded to the nearest hundred, a town library’s book count becomes 4,600. Which could be the GREATEST exact whole number of books?',
      opts: ['4,649', '4,650', '4,599', '4,699'],
      exp: 'Numbers from 4,550 to 4,649 round to 4,600 (4,650 rounds up to 4,700). Greatest integer = 4,649.',
    },
    mr: {
      q: 'जवळच्या शतकापर्यंत अंदाजित केल्यास ग्रंथालयातील पुस्तकांची संख्या ४,६०० येते. मूळ अचूक संख्या जास्तीत जास्त किती असू शकते?',
      opts: ['4,649', '4,650', '4,599', '4,699'],
      exp: '४,५५० ते ४,६४९ मधील संख्या ४,६०० होतात (४,६५० चे ४,७०० होतात). सर्वात मोठी संख्या = ४,६४९.',
    },
    hi: {
      q: 'निकटतम सैकड़े तक सन्निकटन करने पर पुस्तकालय में ४,६०० पुस्तकें आती हैं। अधिकतम संभव सटीक संख्या क्या हो सकती है?',
      opts: ['4,649', '4,650', '4,599', '4,699'],
      exp: '४,५५० से ४,६४९ तक का सन्निकटन ४,६०० होता है। अधिकतम संख्या = ४,६४९।',
    },
  },
  {
    topic: 'Successor & Predecessor Sum Identity',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'What is the difference between the successor of 99,999 and the predecessor of 10,000?',
      opts: ['90,001', '90,000', '89,999', '90,002'],
      exp: 'Successor of 99,999 = 1,00,000. Predecessor of 10,000 = 9,999. Difference = 1,00,000 − 9,999 = 90,001.',
    },
    mr: {
      q: '९९,९९९ ची पुढची लगतची संख्या (Successor) आणि १०,००० ची मागची लगतची संख्या (Predecessor) यांतील फरक किती?',
      opts: ['90,001', '90,000', '89,999', '90,002'],
      exp: '१,००,००० − ९,९९९ = ९०,००१.',
    },
    hi: {
      q: '९९,९९९ के परवर्ती (उत्तरवर्ती) और १०,००० के पूर्ववर्ती का अंतर क्या है?',
      opts: ['90,001', '90,000', '89,999', '90,002'],
      exp: '१,००,००० − ९,९९९ = ९०,००१।',
    },
  },
  {
    topic: 'Fraction Shading & Equivalent Forms',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Which fraction is NOT equivalent to 3/4: 9/12, 15/20, 21/28, or 24/36?',
      opts: ['24/36', '9/12', '15/20', '21/28'],
      exp: '24/36 reduces to 2/3, whereas 9/12, 15/20, and 21/28 all simplify to 3/4.',
    },
    mr: {
      q: '९/१२, १५/२०, २१/२८ आणि २४/३६ यांपैकी कोणता अपूर्णांक ३/४ चा सममूल्य अपूर्णांक नाही?',
      opts: ['24/36', '9/12', '15/20', '21/28'],
      exp: '२४/३६ चे संक्षिप्त रूप २/३ होते; बाकी तिन्ही ३/४ चे सममूल्य आहेत.',
    },
    hi: {
      q: '९/१२, १५/२०, २१/२८ तथा २४/३६ में से कौन-सा भिन्न ३/४ के तुल्य नहीं है?',
      opts: ['24/36', '9/12', '15/20', '21/28'],
      exp: '२४/३६ सरल करने पर २/३ बनता है, ३/४ नहीं।',
    },
  },
  {
    topic: 'Reciprocal Multiplication Check',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'How many pieces of size 3/8 metre each can be cut from a wooden plank measuring 9/2 metres?',
      opts: ['12 pieces', '6 pieces', '9 pieces', '16 pieces'],
      exp: '(9/2) ÷ (3/8) = (9/2) × (8/3) = 72/6 = 12 pieces.',
    },
    mr: {
      q: '९/२ मीटर लांब लाकडी फळीपासून प्रत्येकी ३/८ मीटर लांबीचे किती तुकडे कापता येतील?',
      opts: ['12 pieces', '6 pieces', '9 pieces', '16 pieces'],
      exp: '(९/२) ÷ (३/८) = (९/२) × (८/३) = १२ तुकडे.',
    },
    hi: {
      q: '९/२ मीटर लंबे तख्ते से ३/८ मीटर लंबाई के कितने टुकड़े काटे जा सकते हैं?',
      opts: ['12 pieces', '6 pieces', '9 pieces', '16 pieces'],
      exp: '(९/२) × (८/३) = १२ टुकड़े।',
    },
  },
  {
    topic: 'Decimal Place Value Shift',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Evaluate: (4 × 10) + (7 × 1) + (3 × 1/10) + (6 × 1/1000).',
      opts: ['47.306', '47.36', '47.036', '47.360'],
      exp: '40 + 7 + 0.3 + 0.006 = 47.306 (hundredths digit is 0).',
    },
    mr: {
      q: '(४ × १०) + (७ × १) + (३ × १/१०) + (६ × १/१०००) याची दशांश रूपातील किंमत कोणती?',
      opts: ['47.306', '47.36', '47.036', '47.360'],
      exp: '४० + ७ + ०.३ + ०.००६ = ४७.३०६ (शतांश स्थानी ० आहे).',
    },
    hi: {
      q: '(४ × १०) + (७ × १) + (३ × १/१०) + (६ × १/१०००) का दशमलव मान क्या है?',
      opts: ['47.306', '47.36', '47.036', '47.360'],
      exp: '४७ + ०.३ + ०.००६ = ४७.३०६।',
    },
  },
  {
    topic: 'Leap Year Exact Divisibility Rule',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which of the following century/calendar years had or will have 29 days in February: 1900, 2000, 2100, or 2023?',
      opts: ['2000', '1900', '2100', '2023'],
      exp: 'Century years ending in 00 are leap years ONLY when divisible by 400. 2000 ÷ 400 = 5 (leap year), whereas 1900 and 2100 are not.',
    },
    mr: {
      q: '१९००, २०००, २१०० आणि २०२३ यांपैकी कोणत्या वर्षी फेब्रुवारी महिन्यात २९ दिवस होते / असतील?',
      opts: ['2000', '1900', '2100', '2023'],
      exp: 'शतकवर्ष लीप असण्यासाठी त्यास ४०० ने भाग जाणे आवश्यक असते; फक्त २००० ला ४०० ने भाग जातो.',
    },
    hi: {
      q: '१९००, २०००, २१०० तथा २०२३ में से किस वर्ष फरवरी माह में २९ दिन थे?',
      opts: ['2000', '1900', '2100', '2023'],
      exp: 'शताब्दी वर्ष के अधिवर्ष होने हेतु ४०० से विभाज्य होना आवश्यक है—केवल २००० विभाज्य है।',
    },
  },
  {
    topic: 'Area Doubling Side Effect',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'If every side of a square garden is doubled in length, how many times larger does its AREA become?',
      opts: ['4 times larger', '2 times larger', '8 times larger', '6 times larger'],
      exp: 'Let original side = s (area s²). New side = 2s (new area = 2s × 2s = 4s²), which is 4 times original.',
    },
    mr: {
      q: 'चौरसाच्या प्रत्येक बाजूची लांबी दुप्पट केल्यास त्या चौरसाचे क्षेत्रफळ मूळ क्षेत्रफळाच्या किती पट होईल?',
      opts: ['4 times larger', '2 times larger', '8 times larger', '6 times larger'],
      exp: 'बाजू दुप्पट केली तर क्षेत्रफळ (२ × २) = ४ पट होते.',
    },
    hi: {
      q: 'यदि किसी वर्ग की प्रत्येक भुजा को दोगुना कर दिया जाए, तो उसका क्षेत्रफल कितने गुना हो जाएगा?',
      opts: ['4 times larger', '2 times larger', '8 times larger', '6 times larger'],
      exp: 'नया क्षेत्रफल = (२a)² = ४a², अर्थात् ४ गुना।',
    },
  },
  {
    topic: 'Compound L-Shape Perimeter Puzzle',
    pattern: 'Problem Solving',
    difficulty: 'Difficult',
    en: {
      q: 'An L-shaped corridor is formed by cutting a small 2 cm × 3 cm rectangle out of ONE corner of a 10 cm × 8 cm card. What is the perimeter of the remaining L-shape?',
      opts: ['36 cm', '26 cm', '31 cm', '40 cm'],
      exp: 'Removing a corner rectangle shifts two inner edges inward without changing total outer horizontal or vertical span! Perimeter remains 2 × (10 + 8) = 36 cm.',
    },
    mr: {
      q: '१० सेमी × ८ सेमी आयताकृती पुठ्ठ्याच्या एका कोपऱ्यातून २ सेमी × ३ सेमी चा छोटा आयत कापून काढला, तर उरलेल्या L-आकाराची परिमिती किती सेमी होईल?',
      opts: ['36 cm', '26 cm', '31 cm', '40 cm'],
      exp: 'कोपरा कापल्यास आत तयार होणाऱ्या दोन कडा कापलेल्या कडांएवढ्याच असतात; परिमिती २ × (१० + ८) = ३६ सेमीच राहते.',
    },
    hi: {
      q: '१० सेमी × ८ सेमी कार्ड के एक कोने से २ सेमी × ३ सेमी का आयत काटने पर बची L-आकृति का परिमाप कितना होगा?',
      opts: ['36 cm', '26 cm', '31 cm', '40 cm'],
      exp: 'कोना काटने पर भी परिमाप अपरिवर्तित रहता है = २ × (१० + ८) = ३६ सेमी।',
    },
  },
  {
    topic: 'Sum of First N Odd Numbers Pattern',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Observe: 1 = 1²; 1 + 3 = 2²; 1 + 3 + 5 = 3². Using this rule, calculate the sum of the first 12 consecutive odd numbers: 1 + 3 + 5 + ... + 23.',
      opts: ['144', '121', '132', '169'],
      exp: 'The sum of the first n odd numbers equals n². Here n = 12, so sum = 12² = 144.',
    },
    mr: {
      q: '१ + ३ = ४ (२²), १ + ३ + ५ = ९ (३²). या नियमानुसार पहिल्या १२ क्रमवार विषम संख्यांची (१ + ३ + ... + २३) बेरीज किती?',
      opts: ['144', '121', '132', '169'],
      exp: 'पहिल्या १२ विषम संख्यांची बेरीज = १२² = १४४.',
    },
    hi: {
      q: '१ + ३ = २², १ + ३ + ५ = ३² नियम से प्रथम १२ विषम संख्याओं (१ + ३ + ... + २३) का योग कितना होगा?',
      opts: ['144', '121', '132', '169'],
      exp: 'प्रथम n विषम संख्याओं का योग = n² = १२² = १४४।',
    },
  },
  {
    topic: 'Ratio & Sharing Candies',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Seema and Varun share 60 marbles in the ratio 2 : 3. How many MORE marbles does Varun receive than Seema?',
      opts: ['12 marbles', '24 marbles', '36 marbles', '15 marbles'],
      exp: 'Total parts = 2 + 3 = 5. Each part = 60 ÷ 5 = 12. Difference = 3 − 2 = 1 part = 12 marbles.',
    },
    mr: {
      q: 'सीमा आणि वरुणने ६० गोट्या २ : ३ या प्रमाणात वाटून घेतल्या. वरुणला सीमापेक्षा किती गोट्या जास्त मिळाल्या?',
      opts: ['12 marbles', '24 marbles', '36 marbles', '15 marbles'],
      exp: '५ भाग = ६० ⇒ १ भाग = १२. वरुणला ३ व सीमाला २ भाग म्हणजे १ भाग = १२ जास्त.',
    },
    hi: {
      q: 'सीमा और वरुण ने ६० कंचे २ : ३ के अनुपात में बाँटे। वरुण को सीमा से कितने अधिक कंचे मिले?',
      opts: ['12 marbles', '24 marbles', '36 marbles', '15 marbles'],
      exp: '५ भाग = ६० ⇒ १ भाग = १२। अंतर (३ − २) = १ भाग = १२ कंचे।',
    },
  },
  {
    topic: 'Unit Rate Grocery Comparison',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Shop A sells 500 g of groundnuts for ₹65, while Shop B sells 750 g for ₹93. Which shop offers a cheaper rate per kg, and by how much?',
      opts: ['Shop B by ₹6 per kg', 'Shop A by ₹4 per kg', 'Shop B by ₹2 per kg', 'Both charge identical rates'],
      exp: 'Shop A per kg = ₹65 × 2 = ₹130/kg. Shop B 250 g = 93 ÷ 3 = ₹31 ⇒ 1 kg = 31 × 4 = ₹124/kg. Shop B is cheaper by ₹6/kg.',
    },
    mr: {
      q: 'दुकान अ मध्ये ५०० ग्रॅम शेंगदाणे ₹६५ ला, तर दुकान ब मध्ये ७५० ग्रॅम शेंगदाणे ₹९३ ला मिळतात. कोणते दुकान प्रति किग्रॅ स्वस्त आहे व कितीने?',
      opts: ['Shop B by ₹6 per kg', 'Shop A by ₹4 per kg', 'Shop B by ₹2 per kg', 'Both charge identical rates'],
      exp: 'दुकान अ = ₹१३०/किग्रॅ. दुकान ब: २५० ग्रॅम = ₹३१ ⇒ १ किग्रॅ = ₹१२४. ब ₹६ ने स्वस्त.',
    },
    hi: {
      q: 'दुकान A में ५०० ग्राम मूँगफली ₹६५ की तथा दुकान B में ७५० ग्राम ₹९३ की मिलती है। प्रति किग्रा कौन सस्ती है और कितनी?',
      opts: ['Shop B by ₹6 per kg', 'Shop A by ₹4 per kg', 'Shop B by ₹2 per kg', 'Both charge identical rates'],
      exp: 'दुकान A = ₹१३०/किग्रा; दुकान B = ₹१२४/किग्रा। दुकान B ₹६/किग्रा सस्ती है।',
    },
  },
  {
    topic: 'Triangle Inequality Side Rule',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Which triplet of wooden straw lengths can NEVER be joined to form a closed triangle?',
      opts: ['4 cm, 5 cm, 9 cm', '6 cm, 7 cm, 8 cm', '5 cm, 12 cm, 13 cm', '8 cm, 8 cm, 10 cm'],
      exp: 'Triangle Inequality requires sum of any two sides > third side. Since 4 + 5 = 9 (not greater than 9), straws flatten flat into a straight line.',
    },
    mr: {
      q: 'खालीलपैकी कोणत्या मापांच्या तीन काड्या जोडून बंद त्रिकोण कधीही तयार होऊ शकणार नाही?',
      opts: ['4 cm, 5 cm, 9 cm', '6 cm, 7 cm, 8 cm', '5 cm, 12 cm, 13 cm', '8 cm, 8 cm, 10 cm'],
      exp: 'त्रिकोणाच्या कोणत्याही दोन बाजूंची बेरीज तिसऱ्या बाजूहून मोठी असावी; ४ + ५ = ९ (मोठी नाही).',
    },
    hi: {
      q: 'निम्न में से किस माप की तीन तिनकों से कभी बंद त्रिभुज नहीं बनाया जा सकता?',
      opts: ['4 cm, 5 cm, 9 cm', '6 cm, 7 cm, 8 cm', '5 cm, 12 cm, 13 cm', '8 cm, 8 cm, 10 cm'],
      exp: 'दो भुजाओं का योग तीसरी से बड़ा होना चाहिए; ४ + ५ = ९ (बड़ा नहीं है)।',
    },
  },
  {
    topic: 'Time Conversion Fractional Hours',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'How many seconds are there in 1/4 of an hour minus 5 minutes?',
      opts: ['600 seconds', '900 seconds', '300 seconds', '450 seconds'],
      exp: '1/4 hour = 15 min. 15 min − 5 min = 10 min = 10 × 60 = 600 seconds.',
    },
    mr: {
      q: 'पाव तासातून (१/४ तास) ५ मिनिटे वजा केल्यास किती सेकंद उरतात?',
      opts: ['600 seconds', '900 seconds', '300 seconds', '450 seconds'],
      exp: '१५ मिनिटे − ५ मिनिटे = १० मिनिटे = १० × ६० = ६०० सेकंद.',
    },
    hi: {
      q: '१/४ घंटे में से ५ मिनट घटाने पर कितने सेकंड शेष रहते हैं?',
      opts: ['600 seconds', '900 seconds', '300 seconds', '450 seconds'],
      exp: '१५ मिनट − ५ मिनट = १० मिनट = ६०० सेकंड।',
    },
  },
  {
    topic: 'Square Number Identification & Next Square',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'What is the SMALLEST whole number that should be added to 185 to make it a perfect square?',
      opts: ['11', '14', '6', '15'],
      exp: '13² = 169 (< 185); 14² = 196. Needed addition = 196 − 185 = 11.',
    },
    mr: {
      q: '१८५ मध्ये लहानात लहान कोणती पूर्ण संख्या मिळवल्यास तिची बेरीज पूर्ण वर्गसंख्या होईल?',
      opts: ['11', '14', '6', '15'],
      exp: '१८५ नंतरची लगतची वर्गसंख्या १४² = १९६ आहे. १९६ − १८५ = ११.',
    },
    hi: {
      q: '१८५ में कौन-सी सबसे छोटी पूर्ण संख्या जोड़ें कि वह पूर्ण वर्ग बन जाए?',
      opts: ['11', '14', '6', '15'],
      exp: '१४² = १९६; अतः १९६ − १८५ = ११ जोड़ने होंगे।',
    },
  },
  {
    topic: 'Circle Diameter & Radius Relationship',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Three identical circular carrom coins are laid touching edge to edge in a straight row spanning a total length of 18 cm. What is the RADIUS of ONE coin?',
      opts: ['3 cm', '6 cm', '9 cm', '4.5 cm'],
      exp: '3 diameters = 18 cm ⇒ 1 diameter = 6 cm ⇒ radius = 6 ÷ 2 = 3 cm.',
    },
    mr: {
      q: 'तीन सारख्या गोलाकार कॅरम सोंगट्या एकमेकींना स्पर्श करून सरळ रेषेत ठेवल्यास एकूण लांबी १८ सेमी भरते. एका सोंगटीची त्रिज्या किती?',
      opts: ['3 cm', '6 cm', '9 cm', '4.5 cm'],
      exp: '३ व्यास = १८ सेमी ⇒ १ व्यास = ६ सेमी ⇒ त्रिज्या = ३ सेमी.',
    },
    hi: {
      q: 'तीन एक जैसी गोल गोटियाँ स्पर्श करती हुई सीधी पंक्ति में कुल १८ सेमी घेरती हैं। एक गोटी की त्रिज्या क्या है?',
      opts: ['3 cm', '6 cm', '9 cm', '4.5 cm'],
      exp: '३ व्यास = १८ सेमी ⇒ व्यास = ६ सेमी ⇒ त्रिज्या = ३ सेमी।',
    },
  },
  {
    topic: 'Factors Sum – Perfect Number 28',
    pattern: 'Conceptual',
    difficulty: 'Difficult',
    en: {
      q: 'Find the sum of all factors of 28 OTHER THAN 28 itself.',
      opts: ['28', '24', '30', '27'],
      exp: 'Factors of 28 excluding 28 are 1 + 2 + 4 + 7 + 14 = 28 (making 28 a Perfect Number).',
    },
    mr: {
      q: '२८ या संख्येचे २८ सोडून इतर सर्व विभाजकांची बेरीज किती येते?',
      opts: ['28', '24', '30', '27'],
      exp: '१ + २ + ४ + ७ + १४ = २८ (म्हणून २८ ही परिपूर्ण संख्या / Perfect Number आहे).',
    },
    hi: {
      q: '२८ को छोड़कर २८ के अन्य सभी गुणनखंडों का योगफल कितना होता है?',
      opts: ['28', '24', '30', '27'],
      exp: '१ + २ + ४ + ७ + १४ = २८ (अतः २८ एक पूर्ण संख्या है)।',
    },
  },
  {
    topic: 'Distance Scale on a School Map',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'On a district map, 1 cm represents an actual road distance of 15 km. If two towns sit 4.4 cm apart on this map, what is the real distance between them?',
      opts: ['66 km', '60 km', '70 km', '64 km'],
      exp: '4.4 × 15 = 66 km.',
    },
    mr: {
      q: 'जिल्ह्याच्या नकाशात १ सेमी = १५ किमी असे प्रमाण आहे. नकाशावर दोन शहरे ४.४ सेमी अंतरावर असल्यास प्रत्यक्ष अंतर किती किमी असेल?',
      opts: ['66 km', '60 km', '70 km', '64 km'],
      exp: '४.४ × १५ = ६६ किमी.',
    },
    hi: {
      q: 'मानचित्र पर १ सेमी = १५ किमी पैमाना है। दो शहर मानचित्र पर ४.४ सेमी दूर हैं, तो वास्तविक दूरी क्या है?',
      opts: ['66 km', '60 km', '70 km', '64 km'],
      exp: '४.४ × १५ = ६६ किमी।',
    },
  },
  {
    topic: 'Milk Rate Daily Monthly Billing (February Non-Leap)',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A household buys 1.5 litres of milk daily at ₹60 per litre throughout February 2025 (28 days). What is their total milk bill for the month?',
      opts: ['₹2,520', '₹2,610', '₹2,700', '₹2,430'],
      exp: 'Daily cost = 1.5 × 60 = ₹90. February 2025 has 28 days. Bill = 28 × 90 = ₹2,520.',
    },
    mr: {
      q: 'एक कुटुंब फेब्रुवारी २०२५ (२८ दिवस) मध्ये दररोज ₹६० प्रति लिटर दराने १.५ लिटर दूध घेते. महिन्याचे एकूण दुधाचे बिल किती होईल?',
      opts: ['₹2,520', '₹2,610', '₹2,700', '₹2,430'],
      exp: 'दैनिक खर्च = १.५ × ६० = ₹९०. २८ × ९० = ₹२,५२०.',
    },
    hi: {
      q: 'एक परिवार फरवरी २०२५ (२८ दिन) में प्रतिदिन ₹६०/लीटर से १.५ लीटर दूध लेता है। माह का कुल बिल कितना होगा?',
      opts: ['₹2,520', '₹2,610', '₹2,700', '₹2,430'],
      exp: 'दैनिक खर्च = ₹९०; २८ × ९० = ₹२,५२०।',
    },
  },
  {
    topic: 'Cuboid Carton Packing Volume Division',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'How many small 4 cm soap cubes can fit tightly inside a rectangular carton measuring 20 cm × 12 cm × 8 cm?',
      opts: ['30 cubes', '24 cubes', '60 cubes', '15 cubes'],
      exp: 'Along length: 20÷4 = 5; width: 12÷4 = 3; height: 8÷4 = 2. Total = 5 × 3 × 2 = 30 cubes.',
    },
    mr: {
      q: '२० सेमी × १२ सेमी × ८ सेमी आकाराच्या आयताकृती खोक्यात ४ सेमी बाजूचे किती लहान घनाकृती ठोकळे मावतील?',
      opts: ['30 cubes', '24 cubes', '60 cubes', '15 cubes'],
      exp: '(२० ÷ ४) × (१२ ÷ ४) × (८ ÷ ४) = ५ × ३ × २ = ३० ठोकळे.',
    },
    hi: {
      q: '२० सेमी × १२ सेमी × ८ सेमी डिब्बे में ४ सेमी भुजा के कितने घनाकार गुटके ठीक से समाएँगे?',
      opts: ['30 cubes', '24 cubes', '60 cubes', '15 cubes'],
      exp: '५ × ३ × २ = ३० घन।',
    },
  },
  {
    topic: 'Fractions – Mixed to Decimal & Comparison',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Express the mixed number 7 and 3/8 in exact decimal form.',
      opts: ['7.375', '7.38', '7.625', '7.125'],
      exp: '3 ÷ 8 = 0.375, so 7 + 0.375 = 7.375.',
    },
    mr: {
      q: '७ पूर्णांक ३/८ या पूर्णांकयुक्त अपूर्णांकाचे अचूक दशांश रूप कोणते?',
      opts: ['7.375', '7.38', '7.625', '7.125'],
      exp: '३/८ = ०.३७५; म्हणून ७.३७५.',
    },
    hi: {
      q: 'मिश्र भिन्न ७ सही ३/८ का सटीक दशमलव रूप क्या है?',
      opts: ['7.375', '7.38', '7.625', '7.125'],
      exp: '३/८ = ०.३७५; अतः ७.३७५।',
    },
  },
  {
    topic: 'Multiples & Common Divisor Word Puzzle',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'Find the SMALLEST whole number greater than 5 which, when divided by 12, 15, and 20, ALWAYS leaves a remainder of 4.',
      opts: ['64', '56', '60', '124'],
      exp: 'LCM(12, 15, 20) = 60. Adding remainder 4 yields 60 + 4 = 64.',
    },
    mr: {
      q: '१२, १५ आणि २० ने भागल्यास प्रत्येक वेळी बाकी ४ उरणारी सर्वात लहान संख्या कोणती?',
      opts: ['64', '56', '60', '124'],
      exp: 'लसावि(१२, १५, २०) = ६०. बाकी ४ मिळवल्यास ६० + ४ = ६४.',
    },
    hi: {
      q: 'वह सबसे छोटी संख्या ज्ञात कीजिए जिसे १२, १५ व २० से भाग देने पर प्रत्येक दशा में ४ शेष बचे।',
      opts: ['64', '56', '60', '124'],
      exp: 'ल.स.(१२, १५, २०) = ६०; अतः ६० + ४ = ६४।',
    },
  },
  {
    topic: 'Bar Graph Scale Reading Difference',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'On a school attendance bar chart, the vertical scale reads 1 unit = 15 students. How much taller (in scale units) is a bar for 105 students compared to 60 students?',
      opts: ['3 units taller', '4 units taller', '2.5 units taller', '5 units taller'],
      exp: 'Difference = 105 − 60 = 45 students. In scale units = 45 ÷ 15 = 3 units.',
    },
    mr: {
      q: 'स्तंभालेखावर Y-अक्षाचे प्रमाण १ एकक = १५ विद्यार्थी आहे. १०५ विद्यार्थी व ६० विद्यार्थी दाखवणाऱ्या स्तंभांच्या उंचीत किती एककांचा फरक असेल?',
      opts: ['3 units taller', '4 units taller', '2.5 units taller', '5 units taller'],
      exp: 'फरक = १०५ − ६० = ४५ विद्यार्थी; ४५ ÷ १५ = ३ एकक.',
    },
    hi: {
      q: 'दंड आलेख में पैमाना १ इकाई = १५ छात्र है। १०५ छात्रों व ६० छात्रों के दंडों की ऊँचाई में कितना अंतर होगा?',
      opts: ['3 units taller', '4 units taller', '2.5 units taller', '5 units taller'],
      exp: 'अंतर = ४५ छात्र ÷ १५ = ३ इकाई।',
    },
  },
  {
    topic: 'Palindrome Numbers Count Reasoning',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Which is the SMALLEST 4-digit palindrome number (reading identically forwards and backwards) that is divisible by 5?',
      opts: ['5,005', '1,001', '5,115', '1,551'],
      exp: 'A 4-digit palindrome ends in the same digit it begins with ("abba"). To be divisible by 5, last digit must be 0 or 5; leading cannot be 0, so a = 5 -> smallest is 5,005.',
    },
    mr: {
      q: 'सुलट व उलट दोन्हीकडून सारखी वाचली जाणारी (पॅलिंड्रोम) आणि ५ ने भाग जाणारी सर्वात लहान ४-अंकी संख्या कोणती?',
      opts: ['5,005', '1,001', '5,115', '1,551'],
      exp: '५ ने भाग जाण्यासाठी एकक व सहस्र दोन्ही स्थानी ५ हवा (० सुरू करू शकत नाही). म्हणून सर्वात लहान = ५,००५.',
    },
    hi: {
      q: 'दोनों ओर से एक जैसी पढ़ी जाने वाली (पैलिंड्रोम) और ५ से विभाज्य सबसे छोटी ४-अंकीय संख्या कौन-सी है?',
      opts: ['5,005', '1,001', '5,115', '1,551'],
      exp: 'इकाई और हज़ार दोनों अंक ५ होने पर सबसे छोटी संख्या ५,००५ बनती है।',
    },
  },
  {
    topic: 'Square Diagonal Property & Triangle Types',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Cutting a square handkerchief cleanly along ONE diagonal splits it into two congruent triangles of which exact type?',
      opts: [
        'Right-angled Isosceles Triangles (angles 90°, 45°, 45°)',
        'Equilateral Triangles (60°, 60°, 60°)',
        'Obtuse Scalene Triangles',
        'Acute Scalene Triangles',
      ],
      exp: 'Two equal sides meet at 90°, splitting the remaining corner angles equally into 45° each.',
    },
    mr: {
      q: 'चौरसाकृती रुमालास एका कर्णावर कापल्यास कोणते दोन एकरूप त्रिकोण तयार होतात?',
      opts: [
        'काटकोन समद्विभुज त्रिकोण (कोन ९०°, ४५°, ४५°)',
        'समभुज त्रिकोण (६०°, ६०°, ६०°)',
        'विशालकोन विषमभुज त्रिकोण',
        'लघुकोन विषमभुज त्रिकोण',
      ],
      exp: 'दोन बाजू समान व मधील कोन ९०° असल्याने काटकोन समद्विभुज त्रिकोण तयार होतात.',
    },
    hi: {
      q: 'वर्गाकार रूमाल को एक विकर्ण पर काटने से बनने वाले दो सर्वांगसम त्रिभुज किस प्रकार के होते हैं?',
      opts: [
        'समकोण समद्विबाहु त्रिभुज (कोण ९०°, ४५°, ४५°)',
        'समबाहु त्रिभुज (६०°, ६०°, ६०°)',
        'अधिककोण विषमबाहु त्रिभुज',
        'न्यूनकोण विषमबाहु त्रिभुज',
      ],
      exp: 'दो समान भुजाएँ ९०° पर मिलने से कोण ९०°, ४५°, ४५° होते हैं।',
    },
  },
  {
    topic: 'Mental Math – Compensating Addition & Subtraction',
    pattern: 'Analytical',
    difficulty: 'Easy',
    en: {
      q: 'A shopkeeper gives change from ₹1,000 for a bill of ₹638 by thinking: "638 + 2 = 640; 640 + 60 = 700; 700 + 300 = 1,000." What change did she compute?',
      opts: ['₹362', '₹372', '₹462', '₹358'],
      exp: 'Shopkeeper counting-on increments: 2 + 60 + 300 = ₹362.',
    },
    mr: {
      q: 'दुकानदाराने ₹१,००० मधून ₹६३८ कापताना मनात मोजले: "६३८ + २ = ६४०; ६४० + ६० = ७००; ७०० + ३०० = १,०००." त्याने किती रुपये परत दिले?',
      opts: ['₹362', '₹372', '₹462', '₹358'],
      exp: '२ + ६० + ३०० = ₹३६२.',
    },
    hi: {
      q: 'दुकानदार ₹१,००० में से ₹६३८ घटाने हेतु गिनता है: "६३८+२=६४०, +६०=७००, +३००=१,०००।" उसने कितने रुपये लौटाए?',
      opts: ['₹362', '₹372', '₹462', '₹358'],
      exp: '२ + ६० + ३०० = ₹३६२।',
    },
  },
  {
    topic: 'Tally Marks Frequency Total',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'In a class favourite-fruit survey, "Mango" shows four crossed five-bundles (|||| with diagonal slash) plus 3 single strokes, while "Banana" shows two crossed five-bundles plus 4 strokes. How many total children chose Mango or Banana?',
      opts: ['37 children', '33 children', '39 children', '34 children'],
      exp: 'Mango = (4 × 5) + 3 = 23. Banana = (2 × 5) + 4 = 14. Combined = 23 + 14 = 37 children.',
    },
    mr: {
      q: 'ताली चिन्हांच्या (Tally Marks) तक्त्यात "आंबा" साठी पाचचे ४ गट आणि ३ सुटे, तर "केळी" साठी पाचचे २ गट आणि ४ सुटे रेषा आहेत. एकूण किती मुलांनी ही दोन फळे निवडली?',
      opts: ['37 children', '33 children', '39 children', '34 children'],
      exp: 'आंबा = २० + ३ = २३; केळी = १० + ४ = १४. एकूण = २३ + १४ = ३७.',
    },
    hi: {
      q: 'टैली चिह्नों में "आम" के आगे ५ के ४ बंडल व ३ रेखाएँ तथा "केला" के आगे ५ के २ बंडल व ४ रेखाएँ हैं। कुल कितने बच्चों ने दोनों फल चुने?',
      opts: ['37 children', '33 children', '39 children', '34 children'],
      exp: 'आम = २३, केला = १४; कुल = २३ + १४ = ३७ बच्चे।',
    },
  },
  {
    topic: 'Decimal Division by Powers of Ten',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'If 100 identical thin exercise notebooks stack to a combined thickness of 42.5 cm, what is the thickness of ONE notebook in millimetres?',
      opts: ['4.25 mm', '42.5 mm', '0.425 mm', '425 mm'],
      exp: 'One book = 42.5 ÷ 100 = 0.425 cm. Since 1 cm = 10 mm, thickness = 0.425 × 10 = 4.25 mm.',
    },
    mr: {
      q: '१०० एकसारख्या पातळ वह्यांच्या गड्ड्याची एकूण जाडी ४२.५ सेमी असल्यास एका वहीची जाडी मिलिमीटरमध्ये (mm) किती?',
      opts: ['4.25 mm', '42.5 mm', '0.425 mm', '425 mm'],
      exp: '१ वही = ४२.५ ÷ १०० = ०.४२५ सेमी = ०.४२५ × १० = ४.२५ मिमी.',
    },
    hi: {
      q: '१०० समान पतली कॉपियों की ढेरी की मोटाई ४२.५ सेमी है। एक कॉपी की मोटाई मिलीमीटर में क्या होगी?',
      opts: ['4.25 mm', '42.5 mm', '0.425 mm', '425 mm'],
      exp: '१ कॉपी = ०.४२५ सेमी × १० = ४.२५ मिमी।',
    },
  },
  {
    topic: 'Mixed Fraction Subtraction From Whole',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Subtract 3 and 5/7 from 10.',
      opts: ['6 and 2/7', '7 and 2/7', '6 and 5/7', '7 and 5/7'],
      exp: 'Rewrite 10 as 9 and 7/7. Then (9 − 3) + (7/7 − 5/7) = 6 and 2/7.',
    },
    mr: {
      q: '१० मधून ३ पूर्णांक ५/७ वजा करा.',
      opts: ['6 and 2/7', '7 and 2/7', '6 and 5/7', '7 and 5/7'],
      exp: '१० = ९ पूर्णांक ७/७. (९ − ३) आणि (७/७ − ५/७) = ६ पूर्णांक २/७.',
    },
    hi: {
      q: '१० में से ३ सही ५/७ घटाइए।',
      opts: ['6 and 2/7', '7 and 2/7', '6 and 5/7', '7 and 5/7'],
      exp: '९ सही ७/७ − ३ सही ५/७ = ६ सही २/७।',
    },
  },
  {
    topic: 'Rotational Half-Turn Year Number Symmetry',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which 4-digit year number looks IDENTICAL when rotated upside-down by 180° (half-turn)?',
      opts: ['1961', '1987', '1989', '2006'],
      exp: 'Rotating 1961 by 180° maps 1→1 and swaps inverted 9↔6, still reading 1961. The digits 7 and 2 do not stay readable numerals upside down, and 1989 rotates into 6861.',
    },
    mr: {
      q: 'खालीलपैकी कोणते ४-अंकी वर्ष १८०° (अर्धे वळण) उलटे फिरवून पाहिल्यासही अगदी तसेच (१ ते तंतोतंत) दिसते?',
      opts: ['1961', '1987', '1989', '2006'],
      exp: '१९६१ मधील १ ला १ व उलटलेल्या ९ चा ६ आणि ६ चा ९ होतो, त्यामुळे १८०° फिरवल्यावरही १९६१ वाचले जाते (१९८९ चे उलट ६८६१ होते).',
    },
    hi: {
      q: 'निम्न में से कौन-सा ४-अंकीय वर्ष १८०° (आधा घुमाव) उलटा करने पर भी ठीक वैसा ही दिखता है?',
      opts: ['1961', '1987', '1989', '2006'],
      exp: '१९६१ को १८०° घुमाने पर १ वैसा ही रहता है और ९ व ६ परस्पर बदलकर पुनः १९६१ बनाते हैं (जबकि १९८९ का ६८६१ बनता है)।',
    },
  },
  {
    topic: 'Prime Number Sum Property',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'Find the sum of all prime numbers lying strictly between 20 and 40.',
      opts: ['120', '119', '97', '149'],
      exp: 'Primes between 20 and 40 are 23, 29, 31, and 37. Sum = 23 + 29 + 31 + 37 = 120.',
    },
    mr: {
      q: '२० ते ४० या दरम्यान येणाऱ्या सर्व मूळ संख्यांची बेरीज किती?',
      opts: ['120', '119', '97', '149'],
      exp: '२० ते ४० मधील मूळ संख्या: २३, २९, ३१, ३७. बेरीज = २३ + २९ + ३१ + ३७ = १२०.',
    },
    hi: {
      q: '२० से ४० के बीच आने वाली सभी अभाज्य संख्याओं का योग कितना है?',
      opts: ['120', '119', '97', '149'],
      exp: 'अभाज्य संख्याएँ: २३, २९, ३१, ३७। योग = २३ + २९ + ३१ + ३७ = १२०।',
    },
  },
  {
    topic: 'Speed & Unit Conversion (m/s vs km/h Concept)',
    pattern: 'Problem Solving',
    difficulty: 'Moderate',
    en: {
      q: 'A cyclist covers 300 metres in 1 minute. At this pace, how many kilometres will she cover in 40 minutes?',
      opts: ['12 km', '1.2 km', '120 km', '9 km'],
      exp: 'In 40 minutes: 300 m × 40 = 12,000 m = 12,000 ÷ 1,000 = 12 km.',
    },
    mr: {
      q: 'एक सायकलस्वार १ मिनिटात ३०० मीटर जाते. याच वेगाने ती ४० मिनिटांत किती किलोमीटर अंतर पार करेल?',
      opts: ['12 km', '1.2 km', '120 km', '9 km'],
      exp: '४० × ३०० मी = १२,००० मीटर = १२ किमी.',
    },
    hi: {
      q: 'एक साइकिल सवार १ मिनट में ३०० मीटर चलती है। इसी गति से वह ४० मिनट में कितने किलोमीटर तय करेगी?',
      opts: ['12 km', '1.2 km', '120 km', '9 km'],
      exp: '४० × ३०० मी = १२,००० मी = १२ किमी।',
    },
  },
  {
    topic: 'Place Value vs Face Value Ratio',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'In the number 5,64,812, what is the quotient when the Place Value of 6 is divided by the Face Value of 6?',
      opts: ['10,000', '1,000', '60,000', '1,00,000'],
      exp: 'Place value of 6 = 60,000; Face value of 6 = 6. Quotient = 60,000 ÷ 6 = 10,000.',
    },
    mr: {
      q: '५,६४,८१२ या संख्येतील ६ च्या स्थानिक किमतीला ६ च्या दर्शनी किमतीने भागल्यास भागाकार किती येईल?',
      opts: ['10,000', '1,000', '60,000', '1,00,000'],
      exp: 'स्थानिक किंमत = ६०,००० ÷ दर्शनी किंमत ६ = १०,०००.',
    },
    hi: {
      q: 'संख्या ५,६४,८१२ में ६ के स्थानीय मान को ६ के अंकित (जातीय) मान से भाग देने पर क्या प्राप्त होगा?',
      opts: ['10,000', '1,000', '60,000', '1,00,000'],
      exp: '६०,००० ÷ ६ = १०,०००।',
    },
  },
  {
    topic: 'Perimeter & Side Reverse Check',
    pattern: 'Problem Solving',
    difficulty: 'Easy',
    en: {
      q: 'The perimeter of a rectangular playground is 94 m. If its length is 28 m, calculate its AREA.',
      opts: ['532 m²', '1,848 m²', '266 m²', '476 m²'],
      exp: 'Half-perimeter (L + B) = 94 ÷ 2 = 47 m. Breadth = 47 − 28 = 19 m. Area = 28 × 19 = 532 m².',
    },
    mr: {
      q: 'एका आयताकृती मैदानाची परिमिती ९४ मी असून लांबी २८ मी आहे, तर त्या मैदानाचे क्षेत्रफळ किती?',
      opts: ['532 m²', '1,848 m²', '266 m²', '476 m²'],
      exp: 'लांबी + रुंदी = ९४ ÷ २ = ४७ मी ⇒ रुंदी = ४७ − २८ = १९ मी. क्षेत्रफळ = २८ × १९ = ५३२ चौ.मी.',
    },
    hi: {
      q: 'एक आयताकार मैदान का परिमाप ९४ मी तथा लंबाई २८ मी है। इसका क्षेत्रफल क्या है?',
      opts: ['532 m²', '1,848 m²', '266 m²', '476 m²'],
      exp: 'चौड़ाई = (९४ ÷ २) − २८ = १९ मी। क्षेत्रफल = २८ × १९ = ५३२ वर्ग मी।',
    },
  },
];
