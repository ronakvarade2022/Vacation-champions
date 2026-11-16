import { CuratedTrilingualMcq } from './types';

// Batch 3 Primary Mathematics Content Part 1 (28 verified trilingual MCQs: Number System, Divisibility, HCF/LCM, Roman Numerals)
export const MAHA_TET_P1_B3_MATH_C1: CuratedTrilingualMcq[] = [
  {
    topic: 'Five-Digit Odd & Even Difference',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Using the digits 3, 0, 7, 4, 9 each exactly once, what is the difference between the GREATEST 5-digit ODD number and the SMALLEST 5-digit EVEN number that can be formed?',
      opts: ['66,609', '66,945', '62,613', '67,609'],
      exp: 'Greatest 5-digit odd number = 97,403. Smallest 5-digit even number = 30,794. Difference: 97,403 − 30,794 = 66,609.',
    },
    mr: {
      q: '३, ०, ७, ४, ९ हे अंक प्रत्येकी एकदाच वापरून तयार होणारी सर्वांत मोठी ५-अंकी विषम संख्या आणि सर्वांत लहान ५-अंकी सम संख्या यांतील फरक किती?',
      opts: ['६६,६०९', '६६,९४५', '६२,६१३', '६७,६०९'],
      exp: 'सर्वांत मोठी ५-अंकी विषम संख्या = ९७,४०३ व सर्वांत लहान ५-अंकी सम संख्या = ३०,७९४. फरक: ९७,४०३ − ३०,७९४ = ६६,६०९.',
    },
    hi: {
      q: '3, 0, 7, 4, 9 अंकों में प्रत्येक का ठीक एक बार प्रयोग कर बनने वाली सबसे बड़ी 5-अंकीय विषम संख्या और सबसे छोटी 5-अंकीय सम संख्या का अंतर कितना होगा?',
      opts: ['66,609', '66,945', '62,613', '67,609'],
      exp: 'सबसे बड़ी 5-अंकीय विषम संख्या = 97,403 और सबसे छोटी 5-अंकीय सम संख्या = 30,794. अंतर = 97,403 − 30,794 = 66,609.',
    },
  },
  {
    topic: 'Place Value Quotient With Face Value',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'In the number 6,48,295, what is the quotient when the PLACE VALUE of digit 4 is divided by the FACE VALUE of digit 8?',
      opts: ['5,000', '500', '4,000', '8,000'],
      exp: 'Place value of 4 = 40,000; Face value of 8 = 8. Quotient = 40,000 ÷ 8 = 5,000.',
    },
    mr: {
      q: '६,४८,२९५ या संख्येत ४ या अंकाच्या स्थानिक किमतीला ८ या अंकाच्या दर्शनी किमतीने भागल्यास भागाकार किती येतो?',
      opts: ['५,०००', '५००', '४,०००', '८,०००'],
      exp: '४ ची स्थानिक किंमत = ४०,००० व ८ ची दर्शनी किंमत = ८. भागाकार = ४०,००० ÷ ८ = ५,०००.',
    },
    hi: {
      q: 'संख्या 6,48,295 में अंक 4 के स्थानीय मान को अंक 8 के अंकित मान से भाग देने पर भागफल कितना आएगा?',
      opts: ['5,000', '500', '4,000', '8,000'],
      exp: '4 का स्थानीय मान = 40,000 और 8 का अंकित मान = 8. भागफल = 40,000 ÷ 8 = 5,000.',
    },
  },
  {
    topic: 'Roman Numerals Arithmetic Evaluation',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Evaluate and express the result in Roman numerals: (DCCXX ÷ XII) + XCIV =',
      opts: ['CLIV', 'CXLIV', 'CLVI', 'CXXXIV'],
      exp: 'DCCXX = 720, XII = 12, XCIV = 94. (720 ÷ 12) + 94 = 60 + 94 = 154 = CLIV.',
    },
    mr: {
      q: 'रोमन संख्यांमध्ये उत्तर लिहा: (DCCXX ÷ XII) + XCIV =',
      opts: ['CLIV', 'CXLIV', 'CLVI', 'CXXXIV'],
      exp: 'DCCXX = ७२०, XII = १२, XCIV = ९४. (७२० ÷ १२) + ९४ = ६० + ९४ = १५४ = CLIV.',
    },
    hi: {
      q: 'मान ज्ञात कर उत्तर रोमन अंकों में लिखिए: (DCCXX ÷ XII) + XCIV =',
      opts: ['CLIV', 'CXLIV', 'CLVI', 'CXXXIV'],
      exp: 'DCCXX = 720, XII = 12, XCIV = 94. (720 ÷ 12) + 94 = 60 + 94 = 154 = CLIV.',
    },
  },
  {
    topic: 'Division Algorithm Missing Divisor',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'When 2,374 is divided by a natural number d, the quotient is 38 and the remainder is 18. Find the divisor d.',
      opts: ['62', '58', '64', '56'],
      exp: 'd = (Dividend − Remainder) ÷ Quotient = (2,374 − 18) ÷ 38 = 2,356 ÷ 38 = 62.',
    },
    mr: {
      q: '२,३७४ या संख्येला एका नैसर्गिक संख्येने (d) भागल्यास भागाकार ३८ व बाकी १८ उरते, तर भाजक d किती?',
      opts: ['६२', '५८', '६४', '५६'],
      exp: 'भाजक = (भाज्य − बाकी) ÷ भागाकार = (२,३७४ − १८) ÷ ३८ = २,३५६ ÷ ३८ = ६२.',
    },
    hi: {
      q: 'जब 2,374 को किसी प्राकृत संख्या d से विभाजित किया जाता है, तो भागफल 38 तथा शेषफल 18 आता है। भाजक d ज्ञात कीजिए।',
      opts: ['62', '58', '64', '56'],
      exp: 'd = (भाज्य − शेषफल) ÷ भागफल = (2,374 − 18) ÷ 38 = 2,356 ÷ 38 = 62.',
    },
  },
  {
    topic: 'LCM Application – Synchronized Traffic Signals',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'Three traffic signals at a junction flash green every 18 seconds, 24 seconds, and 32 seconds respectively. If all three flash together at 08:15:00 a.m., when will they flash together next?',
      opts: ['08:19:48 a.m.', '08:18:24 a.m.', '08:17:48 a.m.', '08:20:12 a.m.'],
      exp: 'LCM(18, 24, 32) = 288 seconds = 4 minutes 48 seconds. Next flash = 08:15:00 + 4m 48s = 08:19:48 a.m.',
    },
    mr: {
      q: 'चौकातील तीन वाहतूक सिग्नल अनुक्रमे १८ सेकंद, २४ सेकंद व ३२ सेकंदांनी हिरवे होतात. ते तिन्ही सकाळी ०८:१५:०० वाजता एकत्र लागले असल्यास पुन्हा एकत्र कधी लागतील?',
      opts: ['०८:१९:४८ सकाळी', '०८:१८:२४ सकाळी', '०८:१७:४८ सकाळी', '०८:२०:१२ सकाळी'],
      exp: 'लसावि(१८, २४, ३२) = २८८ सेकंद = ४ मिनिटे ४८ सेकंद. पुढील वेळ = ०८:१९:४८.',
    },
    hi: {
      q: 'चौराहे के तीन ट्रैफिक सिग्नल क्रमशः 18 सेकंड, 24 सेकंड और 32 सेकंड में हरे होते हैं। यदि वे सुबह 08:15:00 बजे एक साथ जले, तो अगली बार एक साथ कब जलेंगे?',
      opts: ['08:19:48 प्रातः', '08:18:24 प्रातः', '08:17:48 प्रातः', '08:20:12 प्रातः'],
      exp: 'ल.स.(18, 24, 32) = 288 सेकंड = 4 मिनट 48 सेकंड। अगला समय = 08:19:48 प्रातः।',
    },
  },
  {
    topic: 'HCF Courtyard Minimum Square Tiles',
    pattern: 'Word Problem',
    difficulty: 'Difficult',
    en: {
      q: 'A rectangular hall floor measures 15 m 60 cm by 12 m. What is the MINIMUM number of identical whole square tiles required to pave the entire floor without cutting?',
      opts: ['130', '120', '156', '65'],
      exp: 'HCF(1560 cm, 1200 cm) = 120 cm tile side. Number of tiles = (1560 ÷ 120) × (1200 ÷ 120) = 13 × 10 = 130.',
    },
    mr: {
      q: 'एका आयताकृती सभागृहाची लांबी १५ मी ६० सेमी व रुंदी १२ मी आहे. न कापता पूर्ण फरशी बसवण्यासाठी समान आकाराच्या चौरसाकृती फरश्यांची किमान संख्या किती लागेल?',
      opts: ['१३०', '१२०', '१५६', '६५'],
      exp: 'मसावि(१५६० सेमी, १२०० सेमी) = १२० सेमी फरशीची बाजू. फरश्या = (१५६० ÷ १२०) × (१२०० ÷ १२०) = १३ × १० = १३०.',
    },
    hi: {
      q: 'एक आयताकार हॉल का फर्श 15 मी 60 सेमी लंबा और 12 मी चौड़ा है। बिना काटे पूरा फर्श ढकने के लिए एक समान वर्गाकार टाइलों की न्यूनतम संख्या कितनी होगी?',
      opts: ['130', '120', '156', '65'],
      exp: 'म.स.(1560 सेमी, 1200 सेमी) = 120 सेमी टाइल भुजा। टाइलें = (1560 ÷ 120) × (1200 ÷ 120) = 13 × 10 = 130.',
    },
  },
  {
    topic: 'Divisibility Rule of 11',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'If the 6-digit number 73*842 is completely divisible by 11, which digit must replace *?',
      opts: ['2', '5', '8', '0'],
      exp: 'Sum of odd positions (from right): 2 + 8 + 3 = 13. Even positions: 4 + * + 7 = 11 + *. Difference (11 + *) − 13 = * − 2 = 0 -> * = 2.',
    },
    mr: {
      q: '७३*८४२ या ६-अंकी संख्येला ११ ने निःशेष भाग जातो, तर * च्या जागी कोणता अंक येईल?',
      opts: ['२', '५', '८', '०'],
      exp: 'उजवीकडील विषम स्थानचे अंक: २ + ८ + ३ = १३; सम स्थानचे अंक: ४ + * + ७ = ११ + *. फरक शून्य होण्यासाठी * = २ (७३२८४२ ÷ ११ = ६६,६२२).',
    },
    hi: {
      q: 'यदि 6-अंकीय संख्या 73*842, 11 से पूर्णतः विभाज्य है, तो * के स्थान पर कौन-सा अंक आएगा?',
      opts: ['2', '5', '8', '0'],
      exp: 'विषम स्थानों का योग: 2 + 8 + 3 = 13; सम स्थानों का योग: 4 + * + 7 = 11 + *. अंतर शून्य होने के लिए * = 2.',
    },
  },
  {
    topic: 'Divisibility by 36 (4 and 9)',
    pattern: 'Numerical',
    difficulty: 'Difficult',
    en: {
      q: 'If the 5-digit number 54A6B is divisible by 36, what is the GREATEST possible value of (A + B)?',
      opts: ['12', '9', '15', '18'],
      exp: '36 = 4 × 9. For 6B divisible by 4, B ∈ {0, 4, 8}. Digit sum = 15 + A + B. For B = 8, A = 4 (sum 12); for B = 4, A = 8 (sum 12); for B = 0, A = 3 (sum 3). Max (A + B) = 12.',
    },
    mr: {
      q: '५४A६B या ५-अंकी संख्येला ३६ ने निःशेष भाग जात असेल, तर (A + B) ची कमाल शक्य किंमत किती?',
      opts: ['१२', '९', '१५', '१८'],
      exp: '३६ = ४ × ९. ६B ला ४ ने भाग जाण्यासाठी B = ०, ४ किंवा ८. अंकांची बेरीज १५ + A + B ला ९ ने भाग जाण्यासाठी B=८ तर A=४ (बेरीज १२), B=४ तर A=८ (बेरीज १२). कमाल १२.',
    },
    hi: {
      q: 'यदि 5-अंकीय संख्या 54A6B, 36 से विभाज्य है, तो (A + B) का अधिकतम संभव मान क्या होगा?',
      opts: ['12', '9', '15', '18'],
      exp: '36 = 4 × 9. अंतिम दो अंक 6B, 4 से कटने हेतु B ∈ {0, 4, 8}. अंक-योग 15 + A + B के लिए B=8 पर A=4 (योग 12) या B=4 पर A=8 (योग 12)। अधिकतम = 12.',
    },
  },
  {
    topic: 'Primes Between 50 and 80',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Find the sum of the SMALLEST and the GREATEST prime numbers lying strictly between 50 and 80.',
      opts: ['132', '130', '128', '134'],
      exp: 'Primes between 50 and 80: 53, 59, 61, 67, 71, 73, 79. Smallest = 53, Greatest = 79. Sum = 53 + 79 = 132.',
    },
    mr: {
      q: '५० ते ८० दरम्यानच्या सर्वांत लहान मूळ संख्येची व सर्वांत मोठ्या मूळ संख्येची बेरीज किती?',
      opts: ['१३२', '१३०', '१२८', '१३४'],
      exp: '५० ते ८० मधील मूळ संख्या: ५३, ५९, ६१, ६७, ७१, ७३, ७९. लहान (५३) + मोठी (७९) = १३२.',
    },
    hi: {
      q: '50 और 80 के बीच स्थित सबसे छोटी और सबसे बड़ी अभाज्य संख्या का योगफल ज्ञात कीजिए।',
      opts: ['132', '130', '128', '134'],
      exp: '50 से 80 के बीच अभाज्य संख्याएँ: 53, 59, 61, 67, 71, 73, 79. योग = 53 + 79 = 132.',
    },
  },
  {
    topic: 'Least 4-Digit Number With Common Remainder',
    pattern: 'Numerical',
    difficulty: 'Difficult',
    en: {
      q: 'What is the SMALLEST 4-digit number that leaves a remainder of 5 whenever divided by 12, 16, or 18?',
      opts: ['1,013', '1,008', '1,157', '1,018'],
      exp: 'LCM(12, 16, 18) = 144. Smallest 4-digit multiple = 144 × 7 = 1,008. Adding remainder 5 gives 1,008 + 5 = 1,013.',
    },
    mr: {
      q: 'अशी सर्वांत लहान ४-अंकी संख्या कोणती जिला १२, १६ किंवा १८ ने भागल्यास प्रत्येक वेळी बाकी ५ उरते?',
      opts: ['१,०१३', '१,००८', '१,१५७', '१,०१८'],
      exp: 'लसावि(१२, १६, १८) = १४४. लहानात लहान ४-अंकी पट = १४४ × ७ = १,००८. बाकी ५ मिळवून = १,०१३.',
    },
    hi: {
      q: 'वह सबसे छोटी 4-अंकीय संख्या कौन-सी है जिसे 12, 16 या 18 से भाग देने पर हर बार शेषफल 5 बचता है?',
      opts: ['1,013', '1,008', '1,157', '1,018'],
      exp: 'ल.स.(12, 16, 18) = 144. सबसे छोटा 4-अंकीय गुणज = 144 × 7 = 1,008. शेष 5 जोड़ने पर 1,013.',
    },
  },
  {
    topic: 'Successor and Predecessor Difference',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Find the value of: (Successor of 99,999) − (Predecessor of 10,000).',
      opts: ['90,001', '89,999', '90,000', '91,001'],
      exp: 'Successor of 99,999 = 1,00,000. Predecessor of 10,000 = 9,999. Difference = 1,00,000 − 9,999 = 90,001.',
    },
    mr: {
      q: '(९९,९९९ ची लगतची पुढची संख्या) − (१०,००० ची लगतची मागची संख्या) = किती?',
      opts: ['९०,००१', '८९,९९९', '९०,०००', '९१,००१'],
      exp: '९९,९९९ ची पुढची = १,००,००० आणि १०,००० ची मागची = ९,९९९. वजाबाकी = १,००,००० − ९,९९९ = ९०,००१.',
    },
    hi: {
      q: '(99,999 की परवर्ती संख्या) − (10,000 की पूर्ववर्ती संख्या) का मान क्या होगा?',
      opts: ['90,001', '89,999', '90,000', '91,001'],
      exp: '99,999 की परवर्ती = 1,00,000 और 10,000 की पूर्ववर्ती = 9,999. अंतर = 90,001.',
    },
  },
  {
    topic: 'Total Number of Factors',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'How many total distinct whole-number factors (divisors) does 72 have?',
      opts: ['12', '10', '9', '14'],
      exp: '72 = 2³ × 3². Total factors = (3 + 1)(2 + 1) = 4 × 3 = 12 (namely 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72).',
    },
    mr: {
      q: '७२ या संख्येचे एकूण भिन्न विभाजक (अवयव) किती आहेत?',
      opts: ['१२', '१०', '९', '१४'],
      exp: '७२ = २³ × ३². एकूण विभाजक = (३+१)(२+१) = ४ × ३ = १२.',
    },
    hi: {
      q: 'संख्या 72 के कुल कितने भिन्न गुणनखंड (भाजक) हैं?',
      opts: ['12', '10', '9', '14'],
      exp: '72 = 2³ × 3². कुल गुणनखंड = (3 + 1)(2 + 1) = 12.',
    },
  },
  {
    topic: 'Two Numbers From HCF and LCM',
    pattern: 'Numerical',
    difficulty: 'Difficult',
    en: {
      q: 'Two numbers have HCF = 14 and LCM = 210. If neither number equals 14, what is the SUM of the two numbers?',
      opts: ['112', '98', '126', '84'],
      exp: 'Let numbers be 14a, 14b with gcd(a,b)=1. 14ab = 210 -> ab = 15. Since neither is 14, (a,b) = (3,5). Numbers = 42 and 70; sum = 42 + 70 = 112.',
    },
    mr: {
      q: 'दोन संख्यांचा मसावि १४ व लसावि २१० आहे. त्यांपैकी कोणतीही संख्या १४ नसल्यास, त्या दोन संख्यांची बेरीज किती?',
      opts: ['११२', '९८', '१२६', '८४'],
      exp: 'संख्या १४a व १४b मानल्यास १४ab = २१० म्हणून ab = १५. कोणीही १४ नसल्याने (a,b) = (३,५). संख्या ४२ व ७०; बेरीज = ११२.',
    },
    hi: {
      q: 'दो संख्याओं का म.स. 14 और ल.स. 210 है। यदि उनमें से कोई भी संख्या 14 नहीं है, तो दोनों संख्याओं का योग कितना है?',
      opts: ['112', '98', '126', '84'],
      exp: 'संख्याएँ 14a और 14b लेने पर 14ab = 210 -> ab = 15. चूँकि कोई 14 नहीं है, (a,b)=(3,5), अतः संख्याएँ 42 व 70 हैं; योग = 112.',
    },
  },
  {
    topic: 'Greatest Divisor With Specific Remainders',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Find the GREATEST number that divides 137 leaving remainder 2 and divides 188 leaving remainder 8.',
      opts: ['45', '15', '30', '60'],
      exp: 'Required divisor = HCF(137 − 2, 188 − 8) = HCF(135, 180) = 45.',
    },
    mr: {
      q: 'अशी सर्वांत मोठी संख्या कोणती जिने १३७ ला भागल्यास बाकी २ व १८८ ला भागल्यास बाकी ८ उरते?',
      opts: ['४५', '१५', '३०', '६०'],
      exp: 'इष्ट संख्या = मसावि(१३७ − २, १८८ − ८) = मसावि(१३५, १८०) = ४५.',
    },
    hi: {
      q: 'वह सबसे बड़ी संख्या ज्ञात कीजिए जिससे 137 को भाग देने पर शेष 2 और 188 को भाग देने पर शेष 8 बचे।',
      opts: ['45', '15', '30', '60'],
      exp: 'अभीष्ट भाजक = म.स.(137 − 2, 188 − 8) = म.स.(135, 180) = 45.',
    },
  },
  {
    topic: 'Rounding Large Numbers and Adding',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Round 6,47,849 to the nearest ten thousand and round 32,450 to the nearest thousand, then find their sum.',
      opts: ['6,82,000', '6,72,000', '6,83,000', '6,73,000'],
      exp: '6,47,849 rounds to 6,50,000; 32,450 rounds to 32,000. Sum = 6,50,000 + 32,000 = 6,82,000.',
    },
    mr: {
      q: '६,४७,८४९ ही संख्या नजीकच्या दशहजारात आणि ३२,४५० ही संख्या नजीकच्या हजारात पूर्णांकित करून त्यांची बेरीज किती?',
      opts: ['६,८२,०००', '६,७२,०००', '६,८३,०००', '६,७३,०००'],
      exp: '६,४७,८४९ -> ६,५०,००० आणि ३२,४५० -> ३२,०००. बेरीज = ६,८२,०००.',
    },
    hi: {
      q: '6,47,849 को निकटतम दस हज़ार तक तथा 32,450 को निकटतम हज़ार तक सन्निकटित करके उनका योग ज्ञात कीजिए।',
      opts: ['6,82,000', '6,72,000', '6,83,000', '6,73,000'],
      exp: '6,47,849 -> 6,50,000 तथा 32,450 -> 32,000. योग = 6,82,000.',
    },
  },
  {
    topic: 'Consecutive Odd Numbers Extremes Product',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'The sum of five consecutive odd numbers is 185. What is the product of the SMALLEST and the LARGEST of these five numbers?',
      opts: ['1,353', '1,295', '1,443', '1,365'],
      exp: 'Middle number = 185 ÷ 5 = 37. Numbers are 33, 35, 37, 39, 41. Product = 33 × 41 = 1,353.',
    },
    mr: {
      q: 'पाच क्रमवार विषम संख्यांची बेरीज १८५ आहे, तर त्यांपैकी सर्वांत लहान व सर्वांत मोठ्या संख्येचा गुणाकार किती?',
      opts: ['१,३५३', '१,२९५', '१,४४३', '१,३६५'],
      exp: 'मधली संख्या = १८५ ÷ ५ = ३७. संख्या: ३३, ३५, ३७, ३९, ४१. गुणाकार = ३३ × ४१ = १,३५३.',
    },
    hi: {
      q: 'पाँच क्रमागत विषम संख्याओं का योग 185 है। इनमें से सबसे छोटी और सबसे बड़ी संख्या का गुणनफल क्या है?',
      opts: ['1,353', '1,295', '1,443', '1,365'],
      exp: 'मध्य संख्या = 185 ÷ 5 = 37. संख्याएँ: 33, 35, 37, 39, 41. गुणनफल = 33 × 41 = 1,353.',
    },
  },
  {
    topic: 'Remainder Reduction With Factor Divisor',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'When a whole number N is divided by 56, the remainder is 29. What remainder will be obtained when N is divided by 8?',
      opts: ['5', '3', '7', '1'],
      exp: 'Since 56 is a multiple of 8, divide 29 by 8: 29 = 8 × 3 + 5, so the remainder is 5.',
    },
    mr: {
      q: 'एका पूर्ण संख्येला N ला ५६ ने भागल्यास बाकी २९ उरते, तर त्याच N संख्येला ८ ने भागल्यास बाकी किती उरेल?',
      opts: ['५', '३', '७', '१'],
      exp: '५६ ही ८ च्या पटीत असल्याने २९ ला ८ ने भागल्यावर मिळणारी बाकी (२९ = ८×३ + ५) म्हणजेच ५ हे अचूक उत्तर आहे.',
    },
    hi: {
      q: 'जब किसी पूर्ण संख्या N को 56 से भाग दिया जाता है तो शेष 29 बचता है। N को 8 से भाग देने पर क्या शेष बचेगा?',
      opts: ['5', '3', '7', '1'],
      exp: 'चूँकि 56, 8 का गुणज है, अतः 29 को 8 से भाग देने पर 29 = 8×3 + 5, शेषफल 5 आएगा।',
    },
  },
  {
    topic: 'Palindromic Four-Digit Numbers Difference',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Find the difference between the GREATEST 4-digit palindrome divisible by 5 and the SMALLEST 4-digit palindrome.',
      opts: ['4,994', '4,995', '4,894', '8,998'],
      exp: 'Greatest 4-digit palindrome divisible by 5 = 5,995. Smallest 4-digit palindrome = 1,001. Difference = 5,995 − 1,001 = 4,994.',
    },
    mr: {
      q: '५ ने भाग जाणारी सर्वांत मोठी ४-अंकी पॅलिंड्रोम (उलट-सुलट सारखी) संख्या आणि सर्वांत लहान ४-अंकी पॅलिंड्रोम संख्या यांतील फरक किती?',
      opts: ['४,९९४', '४,९९५', '४,८९४', '८,९९८'],
      exp: '५ ने भाग जाणारी मोठी ४-अंकी पॅलिंड्रोम = ५,९९५; सर्वांत लहान ४-अंकी पॅलिंड्रोम = १,००१. फरक = ४,९९४.',
    },
    hi: {
      q: '5 से विभाज्य सबसे बड़ी 4-अंकीय पैलिंड्रोम संख्या और सबसे छोटी 4-अंकीय पैलिंड्रोम संख्या का अंतर कितना है?',
      opts: ['4,994', '4,995', '4,894', '8,998'],
      exp: '5 से कटने वाली सबसे बड़ी 4-अंकीय पैलिंड्रोम = 5,995; सबसे छोटी = 1,001. अंतर = 4,994.',
    },
  },
  {
    topic: 'Identifying Coprime Pair',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which pair of numbers below is a COPRIME pair (having HCF = 1)?',
      opts: ['(35, 64)', '(39, 65)', '(51, 85)', '(57, 95)'],
      exp: '35 = 5 × 7 and 64 = 2⁶ share no common factor besides 1. Wait: (39,65) share 13; (51,85) share 17; (57,95) share 19.',
    },
    mr: {
      q: 'खालीलपैकी सहमूळ संख्यांची (Coprime) जोडी कोणती?',
      opts: ['(३५, ६४)', '(३९, ६५)', '(५१, ८५)', '(५७, ९५)'],
      exp: '३५ (५×७) व ६४ (२⁶) यांचा मसावि १ आहे; इतर जोड्यांचे विभाजक अनुक्रमे १३, १७ व १९ आहेत.',
    },
    hi: {
      q: 'निम्नलिखित में से कौन-सा युग्म सह-अभाज्य (Coprime) संख्याओं का है?',
      opts: ['(35, 64)', '(39, 65)', '(51, 85)', '(57, 95)'],
      exp: '35 और 64 का म.स. 1 है, जबकि अन्य युग्मों के उभयनिष्ठ गुणनखंड क्रमशः 13, 17 और 19 हैं।',
    },
  },
  {
    topic: 'Expanded Form Standard Notation',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'Write in standard numeral form: (8 × 1,00,000) + (4 × 1,000) + (9 × 100) + (7 × 1).',
      opts: ['8,04,907', '8,40,907', '8,04,970', '84,907'],
      exp: '8,00,000 + 4,000 + 900 + 7 = 8,04,907 (note 0 in ten-thousands and tens places).',
    },
    mr: {
      q: '(८ × १,००,०००) + (४ × १,०००) + (९ × १००) + (७ × १) या विस्तारित रूपाची मूळ संख्या कोणती?',
      opts: ['८,०४,९०७', '८,४०,९०७', '८,०४,९७०', '८४,९०७'],
      exp: '८,००,००० + ४,००० + ९०० + ७ = ८,०४,९०७.',
    },
    hi: {
      q: 'मानक रूप में लिखिए: (8 × 1,00,000) + (4 × 1,000) + (9 × 100) + (7 × 1).',
      opts: ['8,04,907', '8,40,907', '8,04,970', '84,907'],
      exp: '8,00,000 + 4,000 + 900 + 7 = 8,04,907.',
    },
  },
  {
    topic: 'Units Digit Arithmetic Expression',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'What is the UNITS (ones) digit of the expression: (23 × 27 × 39 × 41) + (14 × 18)?',
      opts: ['1', '7', '3', '9'],
      exp: 'Units digits of first product: 3×7 -> 1; 1×9 -> 9; 9×1 -> 9. Second product: 4×8 -> 2. Sum: 9 + 2 = 11 -> units digit is 1.',
    },
    mr: {
      q: '(२३ × २७ × ३९ × ४१) + (१४ × १८) या पदावलीच्या उत्तराचा एकक स्थानचा अंक कोणता?',
      opts: ['१', '७', '३', '९'],
      exp: 'पहिल्या गुणाकाराचा एकक अंक: ३×७->१, १×९->९, ९×१->९. दुसऱ्याचा: ४×८->२. बेरीज: ९ + २ = ११ म्हणून एकक अंक १.',
    },
    hi: {
      q: 'व्यंजक (23 × 27 × 39 × 41) + (14 × 18) के परिणाम का इकाई का अंक क्या होगा?',
      opts: ['1', '7', '3', '9'],
      exp: 'पहले गुणनफल का इकाई अंक: 3×7=21 (1), 1×9=9, 9×1=9. दूसरे का: 4×8=32 (2). योग: 9 + 2 = 11 -> इकाई अंक 1.',
    },
  },
  {
    topic: 'Prime Factorization Sum of Exponents',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Express 1,080 in prime-factor form as 2^a × 3^b × 5^c. What is the value of (a + b + c)?',
      opts: ['7', '6', '8', '5'],
      exp: '1,080 = 8 × 27 × 5 = 2³ × 3³ × 5¹. So a = 3, b = 3, c = 1 -> a + b + c = 7.',
    },
    mr: {
      q: '१,०८० चे मूळ अवयव 2^a × 3^b × 5^c या रूपात मांडल्यास (a + b + c) ची किंमत किती?',
      opts: ['७', '६', '८', '५'],
      exp: '१,०८० = ८ × २७ × ५ = २³ × ३³ × ५¹. म्हणून a + b + c = ३ + ३ + १ = ७.',
    },
    hi: {
      q: '1,080 को अभाज्य गुणनखंड रूप 2^a × 3^b × 5^c में लिखने पर (a + b + c) का मान कितना होगा?',
      opts: ['7', '6', '8', '5'],
      exp: '1,080 = 2³ × 3³ × 5¹. अतः a + b + c = 3 + 3 + 1 = 7.',
    },
  },
  {
    topic: 'Missing Digit Subtraction Reconstruction',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'In the subtraction problem 7,425 − 3,*68 = 3,557, what digit stands for *?',
      opts: ['8', '7', '9', '6'],
      exp: '7,425 − 3,557 = 3,868, so the missing hundreds digit * equals 8.',
    },
    mr: {
      q: '७,४२५ − ३,*६८ = ३,५५७ या वजाबाकीत * च्या जागी कोणता अंक येईल?',
      opts: ['८', '७', '९', '६'],
      exp: '७,४२५ − ३,५५७ = ३,८६८, म्हणून * = ८.',
    },
    hi: {
      q: 'घटाव प्रश्न 7,425 − 3,*68 = 3,557 में * के स्थान पर कौन-सा अंक आएगा?',
      opts: ['8', '7', '9', '6'],
      exp: '7,425 − 3,557 = 3,868, अतः * = 8.',
    },
  },
  {
    topic: 'Ordering Roman Numerals Ascending',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which option arranges these four Roman numerals strictly in ASCENDING order?',
      opts: [
        'LXXXIX, XCII, XCV, CIX',
        'XCII, LXXXIX, XCV, CIX',
        'LXXXIX, XCV, XCII, CIX',
        'CIX, XCV, XCII, LXXXIX',
      ],
      exp: 'LXXXIX = 89, XCII = 92, XCV = 95, CIX = 109. Thus 89 < 92 < 95 < 109.',
    },
    mr: {
      q: 'खालीलपैकी कोणता पर्याय चारही रोमन संख्यांचा अचूक चढता क्रम दर्शवतो?',
      opts: [
        'LXXXIX, XCII, XCV, CIX',
        'XCII, LXXXIX, XCV, CIX',
        'LXXXIX, XCV, XCII, CIX',
        'CIX, XCV, XCII, LXXXIX',
      ],
      exp: 'LXXXIX=८९, XCII=९२, XCV=९५, CIX=१०९. चढता क्रम: ८९ < ९२ < ९५ < १०९.',
    },
    hi: {
      q: 'निम्न में से कौन-सा विकल्प चारों रोमन संख्याओं का सही आरोही (बढ़ता) क्रम दर्शाता है?',
      opts: [
        'LXXXIX, XCII, XCV, CIX',
        'XCII, LXXXIX, XCV, CIX',
        'LXXXIX, XCV, XCII, CIX',
        'CIX, XCV, XCII, LXXXIX',
      ],
      exp: 'LXXXIX=89, XCII=92, XCV=95, CIX=109; अतः 89 < 92 < 95 < 109.',
    },
  },
  {
    topic: 'Negative & Positive Temperature Change',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'At sunrise in Leh, the thermometer read −6°C. By noon the temperature rose by 14°C, and by evening it dropped by 5°C. What was the evening temperature?',
      opts: ['+3°C', '−3°C', '+13°C', '+5°C'],
      exp: '−6 + 14 = +8°C at noon; +8 − 5 = +3°C in the evening.',
    },
    mr: {
      q: 'लेहमध्ये सूर्योदयावेळी तापमान −६°C होते. दुपारपर्यंत ते १४°C ने वाढले व संध्याकाळी ५°C ने घसरले, तर संध्याकाळचे तापमान किती?',
      opts: ['+३°C', '−३°C', '+१३°C', '+५°C'],
      exp: '−६ + १४ = +८°C; नंतर +८ − ५ = +३°C.',
    },
    hi: {
      q: 'लेह में सूर्योदय के समय तापमान −6°C था। दोपहर तक यह 14°C बढ़ा और शाम को 5°C गिर गया। शाम का तापमान क्या था?',
      opts: ['+3°C', '−3°C', '+13°C', '+5°C'],
      exp: '−6 + 14 − 5 = +3°C.',
    },
  },
  {
    topic: 'Divisibility by 6 With Fixed Tens Digit',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'What is the GREATEST 3-digit multiple of 6 whose tens digit is 5?',
      opts: ['954', '958', '956', '950'],
      exp: 'Hundreds max = 9, tens = 5 -> 95B. Must be even (B∈{0,2,4,6,8}) and 9+5+B divisible by 3 -> B = 4 (sum 18). So 954 (954 ÷ 6 = 159).',
    },
    mr: {
      q: 'दशक स्थानी ५ हा अंक असलेली ६ च्या पटीतील सर्वांत मोठी ३-अंकी संख्या कोणती?',
      opts: ['९५४', '९५८', '९५६', '९५०'],
      exp: '९५B ही सम असून ९+५+B ला ३ ने भाग जाण्यासाठी B=४ हवे. म्हणून ९५४.',
    },
    hi: {
      q: 'दहाई अंक 5 वाली, 6 से विभाज्य सबसे बड़ी 3-अंकीय संख्या कौन-सी है?',
      opts: ['954', '958', '956', '950'],
      exp: '95B के सम और 3 से कटने के लिए 9+5+B में B=4 होगा। अतः 954.',
    },
  },
  {
    topic: 'Minimum Library Books With Remainder',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A librarian tries bundling storybooks into packs of 15, 20, or 25, and in every case 4 books remain extra. What is the LEAST possible number of books above 4?',
      opts: ['304', '296', '154', '604'],
      exp: 'LCM(15, 20, 25) = 300. Minimum books = 300 + 4 = 304.',
    },
    mr: {
      q: 'ग्रंथपाल पुस्तकांचे १५, २० किंवा २५ चे गठ्ठे बांधतात तेव्हा प्रत्येक वेळी ४ पुस्तके शिल्लक उरतात, तर ४ पेक्षा जास्त पुस्तकांची किमान संख्या किती?',
      opts: ['३०४', '२९६', '१५४', '६०४'],
      exp: 'लसावि(१५, २०, २५) = ३००. किमान पुस्तके = ३०० + ४ = ३०४.',
    },
    hi: {
      q: 'एक पुस्तकालयाध्यक्ष किताबों के 15, 20 या 25 के बंडल बनाते हैं और हर बार 4 किताबें बच जाती हैं। 4 से अधिक किताबों की न्यूनतम संख्या कितनी है?',
      opts: ['304', '296', '154', '604'],
      exp: 'ल.स.(15, 20, 25) = 300. न्यूनतम संख्या = 300 + 4 = 304.',
    },
  },
  {
    topic: 'Indian to International System Conversion',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How is the Indian numeral "Forty-two lakh six thousand nineteen" written in the International place-value system?',
      opts: [
        '4,206,019 (Four million two hundred six thousand nineteen)',
        '42,060,019 (Forty-two million sixty thousand nineteen)',
        '4,260,019 (Four million two hundred sixty thousand nineteen)',
        '420,619 (Four hundred twenty thousand six hundred nineteen)',
      ],
      exp: '42,06,019 = 4 × 10⁶ + 206 × 10³ + 19 = 4,206,019.',
    },
    mr: {
      q: '"बेचाळीस लाख सहा हजार एकोणीस" ही संख्या आंतरराष्ट्रीय संख्यालेखन पद्धतीत कशी लिहिली जाते?',
      opts: [
        '4,206,019 (चार दशलक्ष दोनशे सहा हजार एकोणीस)',
        '42,060,019 (बेचाळीस दशलक्ष साठ हजार एकोणीस)',
        '4,260,019 (चार दशलक्ष दोनशे साठ हजार एकोणीस)',
        '420,619 (चारशे वीस हजार सहाशे एकोणीस)',
      ],
      exp: 'भारतीय पद्धतीत ४२,०६,०१९ म्हणजेच आंतरराष्ट्रीय गटांत 4,206,019.',
    },
    hi: {
      q: 'भारतीय प्रणाली की संख्या "बयालीस लाख छह हज़ार उन्नीस" को अंतर्राष्ट्रीय प्रणाली में कैसे लिखेंगे?',
      opts: [
        '4,206,019 (चार मिलियन दो सौ छह हज़ार उन्नीस)',
        '42,060,019 (बयालीस मिलियन साठ हज़ार उन्नीस)',
        '4,260,019 (चार मिलियन दो सौ साठ हज़ार उन्नीस)',
        '420,619 (चार सौ बीस हज़ार छह सौ उन्नीस)',
      ],
      exp: '42,06,019 को तीन-तीन के अंतर्राष्ट्रीय समूह में लिखने पर 4,206,019 प्राप्त होता है।',
    },
  },
];
