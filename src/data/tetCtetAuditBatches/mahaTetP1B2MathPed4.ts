import { CuratedTrilingualMcq } from './types';

// Batch 2 Mathematics Pedagogy Part 4 (28 unique Primary Math Pedagogy Qs)
export const MAHA_TET_P1_B2_MATH_PED4: CuratedTrilingualMcq[] = [
  {
    topic: 'Pairwise Visual Grouping Odd vs Even Numbers Concept',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Before stating "numbers ending in `1, 3, 5, 7, 9` are odd", how should a Class 2 teacher build true conceptual meaning for Even and Odd numbers?',
      opts: [
        'Asking children to arrange counters into two-by-two partner pairs: collections pairing cleanly without leftovers are Even, whereas collections leaving `1` odd partner out are Odd',
        'Making pupils memorize a five-digit chant `"1-3-5-7-9"` without manipulatives',
        'Explaining odd numbers using negative remainders',
        'Telling pupils only prime numbers can be odd',
      ],
      exp: 'Seeing `7` buttons form `3` pairs with `1` lone leftover makes even/odd parity concrete and explains immediately why `odd + odd = even` (the two lone leftovers pair up!).',
    },
    mr: {
      q: '"`1, 3, 5, 7, 9` एकक स्थानी असणाऱ्या संख्या विषम असतात" हा नियम सांगण्यापूर्वी इयत्ता दुसरीच्या मुलांना सम व विषम संख्यांचा खरा अर्थ कसा समजावावा?',
      opts: [
        'मण्यांच्या दोन-दोनच्या जोड्या लावायला सांगून: सर्व जोड्या पूर्ण झाल्या तर सम, आणि `1` मणी एकटा उरला तर विषम संख्या हे प्रत्यक्ष दाखवून',
        'कोणत्याही साधनाशिवाय फक्त `1-3-5-7-9` पाठांतर करून घेऊन',
        'ऋण बाकी वापरून व्याख्या सांगून',
        'फक्त मूळ संख्याच विषम असतात असे सांगून',
      ],
      exp: 'दोन-दोनच्या जोड्यांमधून `1` सुटा उरणे ही संकल्पना पक्की झाल्यावर "दोन विषम संख्यांची बेरीज नेहमी सम का येते?" हेही आपोआप कळते.',
    },
    hi: {
      q: '"`1, 3, 5, 7, 9` पर समाप्त होने वाली संख्याएँ विषम होती हैं" यह नियम रटाने से पहले कक्षा 2 में सम और विषम की वास्तविक अवधारणा कैसे बनानी चाहिए?',
      opts: [
        'बच्चों से गोटियों की दो-दो की जोड़ियाँ बनवाना: पूरी जोड़ियाँ बनें तो सम और `1` गोटी अकेली बच जाए तो विषम संख्या',
        'बिना वस्तुओं के केवल `1-3-5-7-9` मंत्र की तरह रटवाकर',
        'ऋणात्मक शेषफल से परिभाषित करके',
        'केवल अभाज्य संख्याओं को विषम बताकर',
      ],
      exp: 'दो-दो के जोड़े बनाने की गतिविधि सम-विषम का मूर्त बोध कराती है और आगे चलकर `विषम + विषम = सम` का तर्क भी सरल बनाती है।',
    },
  },
  {
    topic: 'Nominal vs Cardinal vs Ordinal Number Uses Pin Code Bus Route',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 3 pupil asks: "If Pune’s PIN code is `411001` and Bus No. `52` is bigger than Bus No. `7`, does Bus `52` carry more passengers or arrive later?" What distinction helps answer this?',
      opts: [
        'Nominal numbers (labels/IDs like PIN codes, bus routes, jersey numbers) only identify items—unlike Cardinal numbers (quantities/counts) or Ordinal numbers (rank/order)',
        'Bus numbers are fractional values that shrink as routes lengthen',
        'PIN codes must always be added before mailing letters',
        'All numbers printed on signboards always represent quantities',
      ],
      exp: 'Clarifying the three roles of numbers—Cardinal (how many), Ordinal (which position), and Nominal (just a name/tag)—prevents absurd arithmetic on phone or bus numbers.',
    },
    mr: {
      q: 'इयत्ता तिसरीचा मुलगा विचारतो, "बस क्र. `52` ही बस क्र. `7` पेक्षा मोठी असल्याने तिच्यात जास्त प्रवासी बसतात का?" या शंकेचे निरसन कोणता संख्या-भेद करून देतो?',
      opts: [
        'नामवाचक (Nominal) संख्या या फक्त ओळख-खूण असतात (पिनकोड, बस क्रमांक), त्या संख्यात्मक प्रमाण (गणनवाचक) किंवा क्रम (क्रमवाचक) दर्शवत नाहीत',
        'बस क्रमांक नेहमी अपूर्णांक असतात',
        'पत्र पाठवताना पिनकोडची बेरीज करावी लागते',
        'बोर्डावरील सर्व अंक नेहमी वस्तूंचे प्रमाण दर्शवतात',
      ],
      exp: 'गणनवाचक (किती?), क्रमवाचक (कितवे?) आणि नामवाचक (ओळख खूण) या तीन उपयोगांचा फरक दैनंदिन संख्या-साक्षरतेसाठी आवश्यक असतो.',
    },
    hi: {
      q: 'कक्षा 3 का छात्र पूछता है: "बस नं. `52`, बस नं. `7` से बड़ा है तो क्या इसमें ज़्यादा यात्री बैठते हैं?" यह भ्रम किस भेद से दूर होगा?',
      opts: [
        'नाममात्र/अभिधान संख्याएँ (Nominal: पिनकोड, बस रूट, जर्सी नंबर) केवल पहचान के लेबल हैं—ये मात्रा (गणन) या स्थान-क्रम (क्रमसूचक) नहीं बतातीं',
        'बस नंबर हमेशा दशमलव में होते हैं',
        'पिनकोड को जोड़ना अनिवार्य होता है',
        'सभी लिखी संख्याएँ केवल वजन या गिनती दर्शाती हैं',
      ],
      exp: 'गणन (Cardinal), क्रमसूचक (Ordinal) और नाममात्र (Nominal) संख्याओं का भेद व्यावहारिक संख्या-साक्षरता का हिस्सा है।',
    },
  },
  {
    topic: 'Reading Decimals Digit By Digit 0.25 vs Point Twenty Five',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why do primary math teachers insist on reading `0.25` aloud as "zero point two five" rather than "zero point twenty-five"?',
      opts: [
        'Reading `"twenty-five"` makes pupils treat post-decimal digits as whole tens/ones, causing errors like assuming `0.25 > 0.4` because `25 > 4`',
        'Because `"twenty-five"` is grammatically wrong in English spelling',
        'Because `25` cannot be written as a fraction `25/100`',
        'To shorten oral reading duration only',
      ],
      exp: 'Whole-number naming after the decimal point reinforces the "whole number bias" (`0.25 > 0.4`); reading digit-by-digit ("two tenths, five hundredths") aligns with place value.',
    },
    mr: {
      q: 'प्राथमिक शाळेत `0.25` चे वाचन "शून्य दशांश पंचवीस" असे न करता "शून्य दशांश दोन पाच" असे का करून घेतले जाते?',
      opts: [
        '"पंचवीस" म्हटल्याने विद्यार्थी दशांशानंतरचे अंक पूर्ण संख्या मानून `25 > 4` म्हणून `0.25 > 0.4` अशी तुलनात्मक चूक करतात',
        'कारण मराठी व्याकरणात पंचवीस हा शब्द चुकीचा आहे',
        'कारण `25/100` लिहिता येत नाही',
        'फक्त वाचण्याचा वेळ वाचवण्यासाठी',
      ],
      exp: 'दशांशानंतर एकेक अंक वाचल्याने `2` दशांश व `5` शतांश ही स्थानिक किंमत जपली जाते आणि `0.4` वि. `0.25` तुलना अचूक होते.',
    },
    hi: {
      q: 'शिक्षक कक्षा में `0.25` को "शून्य दशमलव पच्चीस" के बजाय "शून्य दशमलव दो पाँच" पढ़वाने पर क्यों ज़ोर देते हैं?',
      opts: [
        '"पच्चीस" बोलने से बच्चे दशमलव के बाद के अंकों को पूर्ण संख्या मानकर `0.25 > 0.4` (क्योंकि `25 > 4`) जैसी गंभीर भूल करते हैं',
        'क्योंकि पच्चीस बोलना भाषा की दृष्टि से अशुद्ध है',
        'क्योंकि इसे भिन्न में नहीं बदला जा सकता',
        'केवल समय बचाने के लिए',
      ],
      exp: 'दशमलव बिंदु के बाद एक-एक अंक अलग पढ़ना "पूर्ण संख्या पक्षपात" रोकता है और दशांश-शतांश की समझ सुरक्षित रखता है।',
    },
  },
  {
    topic: 'Meaningful Brackets Order Of Operations Grocery Receipt',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'To help Class 5 students appreciate why brackets `( )` matter in `5 × (10 + 4)` vs `5 × 10 + 4`, which context builds instant clarity?',
      opts: [
        'Packing `5` gift hampers each containing `1` ₹10 pen + `1` ₹4 eraser (`5 × (10 + 4) = ₹70`), compared against buying `5` pens plus just `1` lone eraser (`5 × 10 + 4 = ₹54`)',
        'Memorizing the acronym PEMDAS blindly without situations',
        'Adding brackets around single numbers randomly',
        'Prohibiting two operations in the same word problem',
      ],
      exp: 'Comparing bundled sets (`5` groups of `pen + eraser`) vs unbundled single items transforms brackets from arbitrary rules into clear visual grouping.',
    },
    mr: {
      q: 'इयत्ता पाचवीत `5 × (10 + 4)` आणि `5 × 10 + 4` यांतील कंसाचे महत्त्व समजावून सांगण्यासाठी कोणता संदर्भ तात्काळ स्पष्टता देतो?',
      opts: [
        'प्रत्येकात `₹10` चे पेन व `₹4` चे खोडरबर असलेले `5` भेट संच (`5 × (10+4) = ₹70`) विरुद्ध `5` पेन आणि फक्त एकच सुटे खोडरबर (`5 × 10 + 4 = ₹54`) यांची तुलना',
        'कोणत्याही उदाहरणाशिवाय फक्त "कंचेभागुबेव" पाठ करून घेणे',
        'एकाच संख्येभोवती उगाचच कंस टाकणे',
        'एका प्रश्नात दोन क्रिया एकत्र न देणे',
      ],
      exp: 'वस्तूंचे संच एकत्र बांधण्याचा अर्थ कंसाशी जोडल्याने पदावलीतील क्रियांचा क्रम नैसर्गिकरीत्या पटतो.',
    },
    hi: {
      q: 'कक्षा 5 में `5 × (10 + 4)` बनाम `5 × 10 + 4` में कोष्ठक `( )` का महत्व समझाने के लिए कौन-सा संदर्भ तुरंत स्पष्टता देता है?',
      opts: [
        '`₹10` के पेन और `₹4` की रबर वाले `5` उपहार पैक (`5×(10+4)=₹70`) की तुलना `5` पेन तथा केवल `1` रबर (`5×10+4=₹54`) से करना',
        'बिना संदर्भ केवल BODMAS अक्षर रटवाना',
        'अकेली संख्या पर कोष्ठक लगाना',
        'एक सवाल में दो संक्रियाएँ न देना',
      ],
      exp: 'पैकेट/समूहन की वास्तविक स्थिति से जोड़ने पर कोष्ठक का अर्थ यांत्रिक नियम के बजाय जीवंत हो उठता है।',
    },
  },
  {
    topic: 'Single-Handed Hour Clock Estimation Activity Class 2',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Before introducing the minute and second hands in Class 2, why do some primary pedagogies let children practice reading an analog clock with ONLY the Hour Hand first?',
      opts: [
        'Eliminating minute-hand distraction teaches children to read "just after 3", "halfway past 3", and "almost 4" reliably by watching the hour hand’s position alone',
        'Because minute hands break easily on plastic clocks',
        'Because school bells ring only every 12 hours',
        'So pupils never need to count by `5s` in Class 3',
      ],
      exp: 'Mastering how the short hour hand sweeps from `3` toward `4` prevents the single commonest clock mistake (`3:55` misread as `4:55`).',
    },
    mr: {
      q: 'इयत्ता दुसरीत मिनिट व सेकंद काटे शिकवण्यापूर्वी काही अध्यापन पद्धतींत मुलांना फक्त एकाच "तास काट्याचे" घड्याळ वाचायला का देतात?',
      opts: [
        'मिनिट काट्याचा गोंधळ न होता तास काट्याच्या जागेवरून "३ वाजून गेले", "अर्धा तास झाला", "जवळजवळ ४ वाजले" हे अचूक अनुमान पक्के होते',
        'कारण प्लॅस्टिकचे मिनिट काटे लवकर तुटतात',
        'कारण शाळेची घंटा फक्त १२ तासांनी वाजते',
        'तिसरीत ५ ने मोजणी करावी लागू नये म्हणून',
      ],
      exp: 'आधी तास काट्याचे सूक्ष्म निरीक्षण केल्याने पुढील वर्गात मिनिट काटा जोडल्यावर चुकीचे तास वाचण्याची चूक टळते.',
    },
    hi: {
      q: 'कक्षा 2 में मिनट व सेकंड की सुइयों से पहले केवल एक "घंटे वाली सुई" की घड़ी पढ़वाने की तकनीक क्यों अपनाई जाती है?',
      opts: [
        'मिनट सुई के भ्रम के बिना बच्चे घंटे की सुई से ही "3 से थोड़ा आगे", "साढ़े 3 के पास", "लगभग 4" पढ़ने का मजबूत बोध बना लेते हैं',
        'क्योंकि मिनट की सुई जल्दी टूटती है',
        'ताकि `5` के पहाड़े की जरूरत न पड़े',
        'क्योंकि केवल 12 बजे ही घंटी बजती है',
      ],
      exp: 'घंटे की सुई की निरंतर गति समझ लेने पर बच्चे बाद में `3:55` को `4:55` पढ़ने की त्रुटि नहीं करते।',
    },
  },
  {
    topic: 'Peer Explaining Pair Collaboration Retention Effect',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'When a Class 5 pupil who already grasps Equivalent Fractions pairs up to explain her folding diagram to a confused classmate, who benefits mathematically?',
      opts: [
        'BOTH learners: the confused partner gains accessible peer phrasing, while the explainer deepens and organizes her own conceptual understanding by articulating it aloud',
        'Neither learner, because peers cannot hold teaching degrees',
        'Only the confused pupil, while the explainer wastes time',
        'Neither, unless both copy silently from the blackboard',
      ],
      exp: 'Explaining *why* a solution holds reorganizes knowledge mentally and reveals hidden gaps even for strong pupils (Protégé Effect).',
    },
    mr: {
      q: 'सममूल्य अपूर्णांक समजलेली इयत्ता पाचवीची विद्यार्थिनी आपल्या वर्गमैत्रिणीला कागद घडीची आकृती समजावून सांगते तेव्हा गणितीयदृष्ट्या कोणाचा फायदा होतो?',
      opts: [
        'दोघींचाही: अडखळणाऱ्या मैत्रिणीला सोप्या शब्दांत मदत मिळते, आणि समजावून सांगणाऱ्या विद्यार्थिनीची स्वतःची समज स्पष्ट व सुसंघटित होते',
        'कोणाचाच नाही कारण विद्यार्थ्यांकडे पदवी नसते',
        'फक्त अडखळणाऱ्या मैत्रिणीचा, सांगणाऱ्याचा वेळ वाया जातो',
        'दोघीही शांत बसल्यास जास्त फायदा होतो',
      ],
      exp: 'दुसऱ्याला समजावून सांगताना स्वतःचे विचार शब्दांत बांधावे लागतात, ज्यामुळे संकल्पना अधिक पक्की होते.',
    },
    hi: {
      q: 'समतुल्य भिन्न समझ चुकी कक्षा 5 की छात्रा जब अपनी सहपाठी को कागज़ मोड़कर समझाती है, तो गणितीय रूप से किसे लाभ होता है?',
      opts: [
        'दोनों को: सहपाठी को सरल भाषा में समझ मिलती है और समझाने वाली छात्रा की अपनी अवधारणा मुखर अभिव्यक्ति से और गहरी होती है',
        'किसी को नहीं क्योंकि वह शिक्षक नहीं है',
        'केवल सुनने वाली को, समझाने वाली का समय नष्ट होता है',
        'मूक नकल करने पर अधिक लाभ होता है',
      ],
      exp: 'सहपाठी शिक्षण (Peer Explaining) दोनों विद्यार्थियों की तार्किक स्पष्टता व आत्मविश्वास बढ़ाता है।',
    },
  },
  {
    topic: 'Dial Scale Intermediate Sub-Tick Reading Error Mass',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'On a circular kitchen weighing scale, big numbered marks read `0, 1 kg, 2 kg` with `4` equal spaces between `0` and `1 kg`. If the pointer stops at the first small line past `1 kg`, a student reads `1.1 kg` instead of `1.25 kg`. What skill needs practice?',
      opts: [
        'Calculating the value of ONE sub-interval on any graduated scale (`1,000 g ÷ 4 spaces = 250 g = 0.25 kg` per tick) rather than assuming every small tick always equals `0.1`',
        'Ignoring small ticks and rounding everything to whole kilograms',
        'Weighing items without zeroing the pointer',
        'Adding `1 + 4` to get `5 kg`',
      ],
      exp: 'Computing interval scale unit (`interval span ÷ number of equal spaces`) transfers across rulers, thermometers, measuring jugs, and bar-graph axes.',
    },
    mr: {
      q: 'एका वजन काट्यावर `0` आणि `1 किग्रॅ` दरम्यान `4` समान भाग आहेत. काटा `1 किग्रॅ` नंतरच्या पहिल्या लहान रेषेवर असताना विद्यार्थी `1.25 किग्रॅ` ऐवजी `1.1 किग्रॅ` वाचतो. कोणते कौशल्य सरावले पाहिजे?',
      opts: [
        'प्रत्येक लहान खूण नेहमी `0.1` असते असे न मानता मोठ्या एककाला समान भागांनी भागून एका लहान भागाचे अचूक मूल्य (`1,000 ग्रॅम ÷ 4 = 250 ग्रॅम`) काढणे',
        'लहान रेषा दुर्लक्षित करून पूर्णांकात वजन वाचणे',
        'काटा शून्यावर न आणता वजन करणे',
        '`1 + 4 = 5 किग्रॅ` बेरीज करणे',
      ],
      exp: 'मापनावरील एका उप-विभागाचे मूल्य (`अंतर ÷ समान कप्पे`) काढण्याचे कौशल्य मोजपट्टी, तापमापी व आलेख अक्ष सर्वत्र उपयोगी पडते.',
    },
    hi: {
      q: 'एक तौल मशीन के डायल पर `0` से `1 किग्रा` के बीच `4` बराबर खाने बने हैं। काँटा `1 किग्रा` के बाद पहले छोटे निशान पर हो तो छात्र `1.25 किग्रा` के बजाय `1.1 किग्रा` पढ़ता है। क्या सिखाना ज़रूरी है?',
      opts: [
        'हर छोटे निशान को स्वतः `0.1` न मानकर पहले एक उप-विभाग का मान (`1,000 ग्रा ÷ 4 = 250 ग्रा = 0.25 किग्रा`) निकालना',
        'छोटे निशानों को अनदेखा करना',
        'शून्य मिलाए बिना तौलना',
        '`1 + 4 = 5` जोड़ना',
      ],
      exp: 'किसी भी मापन पैमाने के एक उप-अंतराल का मान निकालना रूलर, बीकर, थर्मामीटर और ग्राफ़ पढ़ने का सार्वभौमिक कौशल है।',
    },
  },
  {
    topic: 'Tessellation Brick Walls & Angles Around Point 360',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Why do Class 5 NCERT/Balbharati geometry chapters include brick wall patterns, honeycomb hexagons, and floor-tile tessellations?',
      opts: [
        'To build intuitive readiness for which polygons fit snugly around a vertex point without gaps or overlaps (interior angles summing to a divisor of `360°`)',
        'To train Class 5 children for masonry construction jobs',
        'Because circles tessellate without leaving any gaps',
        'To remove triangles from geometry lessons',
      ],
      exp: 'Investigating why squares (`4 × 90°`), equilateral triangles (`6 × 60°`), and regular hexagons (`3 × 120°`) tile seamlessly while regular pentagons (`108°`) leave gaps connects craft to angle geometry.',
    },
    mr: {
      q: 'इयत्ता पाचवीच्या भूमिती पाठात विटांची भिंत, मधमाशीचे षटकोनी पोळे आणि फरश्यांचे आकृतिबंध (Tessellations) का समाविष्ट केले आहेत?',
      opts: [
        'कोणते बहुभुज मोकळी जागा न ठेवता एका बिंदूभोवती (`360°`) अचूक बसतात (चौरस, समभुज त्रिकोण, षटकोन) याचे प्रत्यक्ष कोन-भान देण्यासाठी',
        'मुलांना गवंडी कामाचे प्रशिक्षण देण्यासाठी',
        'कारण वर्तुळे फटी न ठेवता फरशीवर बसतात',
        'त्रिकोण अभ्यासातून काढून टाकण्यासाठी',
      ],
      exp: 'एका बिंदूभोवती `360°` पूर्ण होण्याचे तत्त्व दैनंदिन फरश्या व मधमाशांच्या पोळ्याच्या सुंदर रचनेतून सहज कळते.',
    },
    hi: {
      q: 'कक्षा 5 की ज्यामिति में ईंट की दीवार, मधुमक्खी का षट्कोणीय छत्ता और फर्श की टाइलिंग (Tessellations) क्यों शामिल किए जाते हैं?',
      opts: [
        'यह सहज बोध जगाने के लिए कि कौन-से बहुभुज बिना खाली जगह छोड़े एक बिंदु (`360°`) के चारों ओर सटीक जुड़ सकते हैं',
        'बच्चों को राजमिस्त्री प्रशिक्षण देने हेतु',
        'क्योंकि वृत्त बिना खाली जगह छोड़े टाइल बनाते हैं',
        'त्रिभुजों को हटाने के लिए',
      ],
      exp: 'दैनिक पैटर्न और प्रकृति से जोड़कर `360°` बिंदु-समायोजन की ज्यामितीय समझ विकसित होती है।',
    },
  },
  {
    topic: 'Remedial Scaffolding Chunked Cards Checklist Slow Learners',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'What instructional adjustment best supports a slow-paced learner overwhelmed by a multi-step Class 4 word problem worksheet containing `15` dense problems on one sheet?',
      opts: [
        'Breaking the task into well-spaced chunked cards (`2–3` problems at a time) with a visual step-checklist ("1. Circle knowns → 2. Draw bar model → 3. Choose operation → 4. Check answer sense")',
        'Giving `30` problems instead of `15` for extra speed',
        'Telling the child to skip word problems permanently and only copy answers from a neighbor',
        'Making the child stay back alone during recess every day',
      ],
      exp: 'Reducing visual crowding and supplying a structured problem-solving checklist scaffolds executive function while holding high cognitive expectations.',
    },
    mr: {
      q: 'एकाच पानावर `15` किचकट शाब्दिक उदाहरणे पाहून गोंधळून जाणाऱ्या संथ गतीच्या विद्यार्थ्याला कोणते अध्यापन सहाय्य सर्वात उपयुक्त ठरेल?',
      opts: [
        'मोकळी जागा असलेली लहान टप्प्यांची कार्डे (`2–3` उदाहरणे एका वेळी) आणि पायरीवार चित्र-सूची ("१. माहिती गोल करा → २. चित्र काढा → ३. क्रिया निवडा → ४. उत्तर तपासा") देणे',
        'सरावासाठी `15` ऐवजी `30` उदाहरणे देणे',
        'शेजाऱ्याची वही बघून उतरवायला सांगणे',
        'रोज मधल्या सुट्टीत एकटे वर्गात बसवून ठेवणे',
      ],
      exp: 'गर्दी कमी करून स्पष्ट पायरी-सूची दिल्यास संथ गतीचा विद्यार्थीही स्वतःच्या गतीने अचूक विचारप्रक्रिया शिकतो.',
    },
    hi: {
      q: 'एक ही पृष्ठ पर `15` सघन इबारती सवाल देखकर घबराने वाले धीमे शिक्षार्थी की सहायता का सर्वश्रेष्ठ उपाय क्या है?',
      opts: [
        'एक बार में स्पष्ट स्थान वाले `2–3` प्रश्नों के छोटे कार्ड और एक दृश्य चरण-जाँचसूची ("1. दिया गया गोल करें → 2. आरेख बनाएँ → 3. संक्रिया चुनें → 4. जाँचें") देना',
        '`15` की जगह `30` सवाल दे देना',
        'पड़ोसी की कॉपी से नकल करने देना',
        'प्रतिदिन मध्यावकाश में अकेले रोकना',
      ],
      exp: 'दृश्य भीड़ कम करना और चरणबद्ध चेकलिस्ट देना संज्ञानात्मक बोझ घटाकर आत्मनिर्भर समस्या-समाधान को बढ़ावा देता है।',
    },
  },
  {
    topic: 'Fraction Subtraction Borrowing Error 3 Minus 1/4',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'When asked to solve `3 − 1/4`, a Class 5 student mistakenly writes `2 whole 1/4` instead of `2 whole 3/4`. How can paper fraction circles make the real answer self-evident?',
      opts: [
        'Place `3` whole paper circles on the desk, ask the student to cut ONE whole circle into `4` quarters (`4/4`), and physically remove `1` quarter—leaving `2` intact circles and `3/4` remaining',
        'Instruct the student to multiply `3 × 1/4` instead',
        'Write `3.00 − 0.14 = 2.86` without showing quarters',
        'Tell the child subtraction ignores denominators',
      ],
      exp: 'Unpacking `3` into `2 + 4/4` physically parallels base-10 regrouping (`1 whole = 4 quarters`), making `2 + 3/4` completely visual.',
    },
    mr: {
      q: '`3 − 1/4` सोडवताना इयत्ता पाचवीचा विद्यार्थी `2¾` ऐवजी चुकून `2¼` लिहितो. कागदी गोल तुकड्यांतून हा संभ्रम आपोआप कसा दूर होईल?',
      opts: [
        'टेबलावर `3` पूर्ण गोल ठेवून, त्यांपैकी एका गोलाचे `4` समान पाव तुकडे (`4/4`) करून त्यातून `1/4` काढून घेण्यास सांगणे—ज्यामुळे `2` पूर्ण व `3/4` शिल्लक स्पष्ट दिसतात',
        '`3 × 1/4` गुणाकार करायला सांगणे',
        '`3.00 − 0.14` लिहून दाखवणे',
        'वजाबाकीत छेदाकडे पाहू नका असे सांगणे',
      ],
      exp: '`3` म्हणजे `2 + 4/4` हे सुटे केल्यावर `4/4 − 1/4 = 3/4` हे डोळ्यांसमोर प्रत्यक्ष घडते.',
    },
    hi: {
      q: '`3 − 1/4` हल करते समय कक्षा 5 का छात्र `2¾` के स्थान पर `2¼` लिख देता है। कागज़ के वृत्ताकार मॉडलों से सही उत्तर स्वयं कैसे स्पष्ट होगा?',
      opts: [
        'मेज़ पर `3` पूरे वृत्त रखकर उनमें से एक वृत्त को `4` चौथाइयों (`4/4`) में काटकर `1` चौथाई अलग हटवाना—जिससे `2` पूरे और `3/4` बचे साफ़ दिखें',
        'गुणा `3 × 1/4` करने को कहना',
        'इसे `3.00 − 0.14` लिखना',
        'यह कहना कि घटाव में हर अनदेखा करें',
      ],
      exp: '`3 = 2 + 4/4` का मूर्त विनिमय दिखाने से छात्र तुरंत देखते हैं कि १ पूरे में से `1/4` जाने पर `3/4` बचता है।',
    },
  },
  {
    topic: 'Meaningful Understanding vs Empty Mnemonics King Henry',
    pattern: 'Pedagogical',
    difficulty: 'Pedagogical HOTS',
    en: {
      q: 'A Class 5 teacher relies solely on a mnemonic rhyme for metric units without ever letting students weigh 1 gram vs 1 kilogram or measure 1 cm vs 1 metre. What risk does NCF-2005 highlight in such reliance?',
      opts: [
        'Students may shift decimal points smoothly on worksheets yet have zero intuitive feel for whether a classmate’s water bottle holds `1 L` or `100 mL` or `10 kL`',
        'Rhymes permanently damage singing voice in music periods',
        'Students become too fast at converting metric measurements',
        'Mnemonics are forbidden by grammar rules',
      ],
      exp: 'Mnemonics can aid recall AFTER measurement concepts exist, but without sensory anchors they produce meaningless symbol pushing detached from reality.',
    },
    mr: {
      q: 'विद्यार्थ्यांना `1 ग्रॅम` व `1 किग्रॅ` चा प्रत्यक्ष वजन अनुभव किंवा `1 सेमी` व `1 मी` ची लांबी न दाखवता शिक्षक फक्त पाठांतराची यमक-ओळ वापरून मापन शिकवतात. NCF-2005 नुसार यातील धोका कोणता?',
      opts: [
        'मुले कागदावर दशांश स्थळे पुढे-मागे सरकवतील, पण पाण्याची बाटली `1 लिटर` की `100 मिली` की `10 किलोलिटर` असते याचे कोणतेही वास्तव भान त्यांच्याकडे नसेल',
        'यमक ओळींमुळे संगीत तासावर विपरीत परिणाम होतो',
        'मुले एकक रूपांतरण अतिशय वेगाने करू लागतात',
        'व्याकरणानुसार यमक निषिद्ध असते',
      ],
      exp: 'प्रत्यक्ष मापन अनुभवानंतर स्मरण-युक्त्या पूरक ठरू शकतात; पण अनुभवाशिवाय त्या निव्वळ यांत्रिक चिन्ह-चाळणी ठरतात.',
    },
    hi: {
      q: 'बिना `1 ग्राम` बनाम `1 किग्रा` का वजन दिखाए या `1 सेमी` बनाम `1 मी` नपवाए केवल याद रखने वाली तुकबंदी से मात्रक पढ़ाने में NCF-2005 के अनुसार क्या जोखिम है?',
      opts: [
        'बच्चे परीक्षा में दशमलव खिसकाना रट लेंगे, पर उन्हें व्यावहारिक बोध नहीं होगा कि पानी की बोतल `1 ली` है या `100 मिली` या `10 किलोलीटर`',
        'तुकबंदी संगीत की कक्षा में बाधा डालती है',
        'बच्चे गणना बहुत तेज़ी से करने लगेंगे',
        'व्याकरण तुकबंदी की अनुमति नहीं देता',
      ],
      exp: 'प्रत्यक्ष भौतिक मापन अनुभव के बिना स्मृति-सूत्र मात्र अर्थहीन यांत्रिक गणना बनकर रह जाते हैं।',
    },
  },
  {
    topic: 'Rubrics For Open-Ended Geometric Art Tangram Projects',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Class 4 pupils design original Tangram animals and symmetrical Rangoli cards. How should a teacher grade this performance task fairly under CCE?',
      opts: [
        'Using an analytic rubric rating clear mathematical criteria: (1) accurate non-overlapping shape joins, (2) symmetry/geometric properties explained, (3) neat craftsmanship',
        'Awarding `10/10` solely to whoever used the most expensive glitter paper',
        'Ranking students strictly from prettiest to ugliest with no feedback',
        'Skipping grading completely because geometry art cannot be assessed',
      ],
      exp: 'Clear rubrics protect objectivity on creative tasks, focusing assessment on mathematical precision and geometric reasoning rather than fancy stationery.',
    },
    mr: {
      q: 'इयत्ता चौथीच्या विद्यार्थ्यांनी टॅनग्रामचे प्राणी व सममित रांगोळी कार्डे तयार केली आहेत. सातत्यपूर्ण सर्वंकष मूल्यमापन (CCE) अंतर्गत हे कार्य न्याय्यपणे कसे तपासावे?',
      opts: [
        'स्पष्ट गणितीय निकषांच्या विश्लेषणात्मक तपासणी सूचीद्वारे (Rubric): आकार अचूक जुळणे, सममिती/गुणधर्मांचे अचूक स्पष्टीकरण आणि मांडणीची सुबकता',
        'ज्याने सर्वात महागडे चमकते कागद वापरले त्याला `10/10` देऊन',
        'कोणताही अभिप्राय न देता सुंदरतेनुसार क्रम लावून',
        'कलाकृतीचे मूल्यमापनच न करता सोडून देऊन',
      ],
      exp: 'रूब्रिकमुळे सर्जनशील उपक्रमांचे मूल्यमापन साहित्याच्या खर्चाऐवजी गणितीय अचूकता आणि तर्कावर आधारित राहते.',
    },
    hi: {
      q: 'कक्षा 4 के छात्र टैनग्राम से आकृतियाँ और सममित रंगोली कार्ड बनाते हैं। सतत और व्यापक मूल्यांकन (CCE) में इस रचनात्मक कार्य का निष्पक्ष आकलन कैसे होना चाहिए?',
      opts: [
        'विश्लेषणात्मक रूब्रिक (Rubric) द्वारा: (1) बिना अतिव्यापन सटीक आकृति-संयोजन, (2) सममिति व ज्यामितीय गुणों की सही व्याख्या, (3) स्पष्ट प्रस्तुति',
        'सबसे महँगे चमकदार कागज़ का उपयोग करने वाले को पूरे अंक देकर',
        'बिना टिप्पणी के केवल सुंदरता की रैंकिंग करके',
        'रचनात्मक कार्यों का आकलन ही न करके',
      ],
      exp: 'स्पष्ट रूब्रिक रचनात्मक गणित कार्यों में विषयनिष्ठता कम कर गणितीय सटीकता पर केंद्रित आकलन सुनिश्चित करता है।',
    },
  },
  {
    topic: 'Capacity Reasonableness Sorting Spoons Buckets Bottles',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Asking Class 3 students to match `5 mL`, `250 mL`, `1 L`, and `20 L` respectively to a medicine spoon, a tea cup, a school water bottle, and a bathing bucket develops which core skill?',
      opts: [
        'Quantitative estimation and real-world magnitude sense for metric liquid capacity units',
        'Long multiplication of 4-digit numbers',
        'Converting litres into square metres',
        'Memorizing chemical boiling points of water',
      ],
      exp: 'Connecting unit numbers to familiar household containers keeps `mL` vs `L` grounded in lived physical intuition.',
    },
    mr: {
      q: 'इयत्ता तिसरीच्या मुलांना `5 मिली`, `250 मिली`, `1 लि` आणि `20 लि` यांच्या अनुक्रमे औषधाचा चमचा, चहाचा कप, पाण्याची बाटली आणि आंघोळीची बादली यांच्याशी जोड्या लावायला दिल्याने कोणते कौशल्य वाढते?',
      opts: [
        'मेट्रिक धारकता एककांचे (`मिली` व `लि`) वास्तव प्रमाण-भान आणि अंदाजाचे कौशल्य',
        'चार-अंकी संख्यांचा मोठा गुणाकार',
        'लिटरचे चौरस मीटरमध्ये रूपांतरण',
        'पाण्याचा उत्कलन बिंदू पाठ करणे',
      ],
      exp: 'घरगुती भांड्यांशी एककांची सांगड घातल्याने `mL` आणि `L` यांतील फरक कायमचा लक्षात राहतो.',
    },
    hi: {
      q: 'कक्षा 3 के बच्चों से `5 मिली`, `250 मिली`, `1 ली` और `20 ली` का मिलान क्रमशः दवा के चम्मच, चाय के कप, स्कूल की बोतल और नहाने की बाल्टी से कराना किस कौशल को बढ़ाता है?',
      opts: [
        'धारिता के मीट्रिक मात्रकों (`mL` बनाम `L`) का व्यावहारिक परिमाण बोध और अनुमान कौशल',
        'चार अंकों का गुणा',
        'लीटर को वर्ग मीटर में बदलना',
        'पानी का क्वथनांक रटना',
      ],
      exp: 'दैनिक पात्रों से मात्रकों को जोड़ने से `मिलीलीटर` और `लीटर` के परिमाण की सजीव समझ बनती है।',
    },
  },
  {
    topic: 'Zero Three Distinct Roles Placeholder Value Identity',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why is teaching the number ZERO (`0`) carefully across Grades 1–4 crucial in primary mathematics?',
      opts: [
        'Zero plays three critical roles: representing an empty count (`5 − 5 = 0`), acting as additive identity (`a + 0 = a`), and holding empty place columns (`405` vs `45`)',
        'Because zero makes numbers larger when placed on the left (`045`)',
        'Because division by zero gives infinity in Class 1',
        'Because zero only exists in Roman numerals',
      ],
      exp: 'Understanding zero simultaneously as empty set cardinality, additive identity, and positional placeholder (discovered/formalized in India!) underpins all base-10 arithmetic.',
    },
    mr: {
      q: 'प्राथमिक गणितात (इयत्ता १–४) शून्य (`0`) ही संकल्पना काळजीपूर्वक शिकवणे का अत्यंत महत्त्वाचे ठरते?',
      opts: [
        'शून्य तीन मुख्य भूमिका बजावते: रिकाम्या संचाचे मूल्य (`5 − 5 = 0`), बेरजेचा अविकारक घटक (`a + 0 = a`) आणि स्थानिक किंमत रक्षक (`405` वि. `45`)',
        'कारण डाव्या बाजूला लावल्यास संख्या मोठी होते (`045`)',
        'कारण रोमन पद्धतीत शून्याला मुख्य स्थान आहे',
        'कारण शून्याने भागल्यास उत्तर शून्य येते',
      ],
      exp: 'शून्याची शून्य-संकल्पना, बेरजेतील तटस्थता आणि स्थानिक रक्षक या तिन्ही भूमिका दशमान संख्यापद्धतीचा पाया आहेत.',
    },
    hi: {
      q: 'कक्षा 1–4 में शून्य (`0`) की अवधारणा को गहराई से पढ़ाना क्यों अत्यंत महत्वपूर्ण है?',
      opts: [
        'शून्य तीन प्रमुख भूमिकाएँ निभाता है: रिक्त मात्रा का मान (`5−5=0`), योज्य तत्समक (`a+0=a`), तथा स्थानीय मान धारक (`405` बनाम `45`)',
        'क्योंकि बाईं ओर लगाने से संख्या बड़ी होती है',
        'क्योंकि रोमन प्रणाली शून्य पर आधारित है',
        'क्योंकि शून्य से भाग देने पर शून्य आता है',
      ],
      exp: 'रिक्त गणन, योज्य तत्समक और स्थानीय मान धारक के रूप में शून्य की तिहरी भूमिका दशमलव प्रणाली की आधारशिला है।',
    },
  },
  {
    topic: 'Vertical vs Horizontal Segment Length Illusion Check',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Looking at an upside-down `"T"` diagram where the vertical stick and horizontal base are both exactly `6 cm`, many Class 2 children insist the vertical stick is longer. How should a teacher turn this optical illusion into a math lesson?',
      opts: [
        'Let students predict first, then verify directly by laying a `6 cm` paper strip or ruler against both segments—proving why measurement beats visual illusion',
        'Tell them vertical lines really are longer whenever printed black',
        'Never draw vertical lines in geometry exercises',
        'Correct them verbally without letting them measure',
      ],
      exp: 'Discovering that eyes can be fooled ("vertical-horizontal illusion") motivates WHY standard measuring tools (`rulers/strips`) are indispensable in science and math.',
    },
    mr: {
      q: 'उलट्या `"T"` आकाराच्या आकृतीत उभी व आडवी दोन्ही रेघ तंतोतंत `6 सेमी` असतानाही अनेक मुले उभी रेघ लांब असल्याचे सांगतात. या दृष्टिभ्रमाचे रूपांतर गणित पाठात कसे कराल?',
      opts: [
        'आधी अंदाज घेण्यास सांगून मग दोरा किंवा मोजपट्टीने दोन्ही रेघा प्रत्यक्ष मोजायला लावणे—ज्यामुळे नजरेच्या अंदाजापेक्षा अचूक मोजमापाचे महत्त्व पटते',
        'उभ्या रेषा खरोखरच जास्त लांब असतात असे सांगून',
        'भूमितीत उभ्या रेषा काढणेच बंद करून',
        'मोजू न देता फक्त तोंडी चूक सांगून',
      ],
      exp: 'दृष्टिभ्रमाची अनुभूती मोजपट्टी व प्रमाणित साधनांची गरज मुलांना सहज पटवून देते.',
    },
    hi: {
      q: 'उलटे `"T"` चित्र में ऊर्ध्वाधर और क्षैतिज दोनों रेखाएँ ठीक `6 सेमी` होने पर भी कई बच्चे ऊर्ध्वाधर रेखा को बड़ा बताते हैं। इस दृष्टिभ्रम को गणित सीखने में कैसे बदलें?',
      opts: [
        'पहले अनुमान लगवाकर फिर कागज़ की पट्टी या स्केल से दोनों को स्वयं नपवाना—जिससे आँखों के धोखे पर सटीक मापन की उपयोगिता सिद्ध हो',
        'यह कहकर कि ऊर्ध्वाधर रेखा हमेशा लंबी होती है',
        'चित्रों में खड़ी रेखाएँ बनाना बंद करके',
        'मापन का मौका दिए बिना डाँटकर',
      ],
      exp: 'दृष्टिभ्रम का प्रत्यक्ष परीक्षण यह सिखाता है कि विश्वसनीय तुलना के लिए मानक मापन यंत्र क्यों आवश्यक हैं।',
    },
  },
  {
    topic: 'Fair Proportional Comparison Percentages Quiz Out Of Different Totals',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'To motivate WHY percentages exist for Class 5 beginners, which opening scenario creates immediate genuine curiosity?',
      opts: [
        '"Asha scored `18 out of 20` on Friday’s math quiz, while Vikram scored `34 out of 40` on Marathi. Who had the higher score rate—and how can we put both tests on a fair `out of 100` track?"',
        'Writing `"x% = x/100"` ten times silently at the start of class',
        'Converting `100` different decimal fractions right on day one',
        'Explaining banking compound interest loans first',
      ],
      exp: 'Comparing unequal denominators (`18/20` vs `34/40`) creates an authentic need for a common standard denominator of `100` (`90%` vs `85%`).',
    },
    mr: {
      q: 'इयत्ता पाचवीच्या मुलांना "शेकडेवारी (`%`) का निर्माण झाली?" हे समजावण्यासाठी कोणता सुरुवातीचा प्रसंग तात्काळ कुतूहल निर्माण करेल?',
      opts: [
        '"आशाला गणितात `20 पैकी 18` आणि विक्रमला मराठीत `40 पैकी 34` गुण मिळाले. दोघांपैकी कोणाची कामगिरी अधिक चांगली? दोघांची `100 पैकी` समान पातळीवर तुलना कशी कराल?"',
        'वर्गाच्या सुरुवातीलाच `x% = x/100` दहा वेळा लिहून घेणे',
        'पहिल्याच दिवशी १०० दशांश अपूर्णांकांची रूपांतरे देणे',
        'आधी बँकेचे चक्रवाढ व्याज समजावून सांगणे',
      ],
      exp: 'वेगवेगळ्या एकूण गुणांकांची (`20` व `40`) न्याय्य तुलना करण्याची गरज भासल्यावर `100` हा सामाईक पाया नैसर्गिकरीत्या अर्थपूर्ण ठरतो.',
    },
    hi: {
      q: 'कक्षा 5 के बच्चों को यह समझाने के लिए कि "प्रतिशत (`%`) की आवश्यकता क्यों पड़ी", कौन-सी आरंभिक स्थिति तुरंत जिज्ञासा जगाएगी?',
      opts: [
        '"आशा को गणित में `20 में से 18` और विक्रम को हिंदी में `40 में से 34` अंक मिले। किसका प्रदर्शन बेहतर है और दोनों को `100` के समान पैमाने पर कैसे परखें?"',
        'कक्षा शुरू होते ही `x% = x/100` दस बार लिखवाना',
        'पहले ही दिन सौ दशमलव सवाल हल कराना',
        'चक्रवृद्धि ब्याज के ऋण से शुरुआत करना',
      ],
      exp: 'असमान पूर्णांकों (`20` बनाम `40`) की निष्पक्ष तुलना करने की वास्तविक ज़रूरत `100` के साझा आधार (प्रतिशत) का उद्देश्य स्पष्ट करती है।',
    },
  },
  {
    topic: 'Classroom Birthday Bar Graph Intuitive Mode Discovery',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Class 4 pupils place their name stickers in columns above their birth months (`Jan` to `Dec`) on a wall chart and notice `August` stands tallest with `9` birthdays. What statistical idea have they encountered intuitively?',
      opts: [
        'Mode — the most frequently occurring category/value in a dataset, read straight from the tallest bar',
        'Standard deviation spread',
        'Weighted harmonic mean',
        'Probability tree diagrams',
      ],
      exp: 'Tallest column in a birthday bar graph gives pupils an instant concrete image of "Mode" (most common) well before formal statistics terminology.',
    },
    mr: {
      q: 'इयत्ता चौथीच्या मुलांनी भिंतीवरील तक्त्यावर आपापल्या जन्म-महिन्यांवर (`जानेवारी–डिसेंबर`) नावाच्या पट्ट्या चिकटवल्या आणि पाहिले की `ऑगस्ट` महिन्याचा स्तंभ सर्वाधिक (`9`) उंच आहे. त्यांनी अनौपचारिकपणे कोणती सांख्यिकीय कल्पना अनुभवली?',
      opts: [
        'बहुलक (Mode) — माहितीतील सर्वात जास्त वेळा येणारा घटक किंवा सर्वाधिक उंच स्तंभ',
        'प्रमाण विचलन (Standard Deviation)',
        'हरात्मक मध्य',
        'संभाव्यता वृक्ष आकृती',
      ],
      exp: 'जन्म-महिन्याच्या स्तंभालेखातून सर्वात उंच स्तंभ ओळखणे ही बहुलक (Mode) संकल्पनेची सहज व वैयक्तिक ओळख घडवते.',
    },
    hi: {
      q: 'कक्षा 4 के बच्चे दीवार चार्ट पर अपने जन्म-माह के ऊपर नाम की पर्ची चिपकाते हैं और देखते हैं कि `अगस्त` का स्तंभ सबसे ऊँचा (`9`) है। उन्होंने अनौपचारिक रूप से किस सांख्यिकीय विचार का अनुभव किया?',
      opts: [
        'बहुलक (Mode) — आँकड़ों में सबसे अधिक बार आने वाला मान, जो सबसे ऊँचे स्तंभ से दिखता है',
        'मानक विचलन',
        'हरात्मक माध्य',
        'प्रायिकता वृक्ष आरेख',
      ],
      exp: 'अपनी कक्षा के जन्म-माह के डेटा से सबसे ऊँचा बार पहचानना बहुलक (Mode) का सजीव पहला परिचय है।',
    },
  },
  {
    topic: 'Floor Number-Line Mat Kinesthetic Support For ADHD Learners',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'A Class 2 child with ADHD struggles to stay seated while solving worksheet additions (`7 + 5`, `14 − 6`). Which movement-friendly math adaptation turns high energy into learning focus?',
      opts: [
        'Using a giant taped floor number line (`0–20`) where the child physically hops forward (`+`) or backward (`−`) to act out calculations before recording them',
        'Punishing the child by removing all physical play periods',
        'Giving longer silent 60-problem paper worksheets',
        'Seating the child facing a blank corner wall',
      ],
      exp: 'Channelling kinesthetic energy through floor-mat number-line hopping engages embodied cognition and sustains engagement smoothly.',
    },
    mr: {
      q: 'चंचलता/ADHD असणाऱ्या इयत्ता दुसरीच्या मुलाला एका जागी बसून `7 + 5`, `14 − 6` सोडवणे कठीण जाते. त्याची ऊर्जा अभ्यासात वळवण्यासाठी कोणता गतिशील उपाय सर्वोत्तम आहे?',
      opts: [
        'वर्गाच्या फरशीवर मोठ्या `0–20` संख्यारेषेची टेप लावून त्यावर पुढे (`+`) व मागे (`−`) प्रत्यक्ष उड्या मारून बेरीज-वजाबाकी सोडवण्याची संधी देणे',
        'खेळाचा तास बंद करून शिक्षा देणे',
        '६० प्रश्नांची मोठी लेखी कार्यपत्रिका देणे',
        'रिकाम्या भिंतीकडे तोंड करून बसवणे',
      ],
      exp: 'जमिनीवरील संख्यारेषेवर उड्या मारल्याने शारीरिक हालचालींची गरज पूर्ण होऊन गणितीय प्रक्रिया मेंदूत पक्की होते.',
    },
    hi: {
      q: 'ADHD वाले कक्षा 2 के बच्चे को एक जगह बैठकर `7+5`, `14−6` हल करने में कठिनाई होती है। उसकी ऊर्जा को सीखने में बदलने का सर्वोत्तम उपाय क्या है?',
      opts: [
        'फर्श पर बड़ी `0–20` संख्या-रेखा चिपकाकर बच्चे को आगे (`+`) व पीछे (`−`) कूदकर गणना करने का गतिसंवेदी अवसर देना',
        'खेल का पीरियड बंद कर देना',
        '60 सवालों की लंबी लिखित शीट दे देना',
        'कोने में दीवार की ओर मुँह करके बिठाना',
      ],
      exp: 'फर्श की संख्या-रेखा पर कूदना गतिज ऊर्जा को सकारात्मक शिक्षण और संख्या-रेखा बोध में बदल देता है।',
    },
  },
  {
    topic: 'Division By 10 Remainder vs Decimal Trap 254 Divided By 10',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'After drilling `240 ÷ 10 = 24` and `380 ÷ 10 = 38`, a student learns "just chop off the last digit when dividing by `10`" and writes `254 ÷ 10 = 25`, losing the `4` entirely! How do you fix this misconception?',
      opts: [
        'Clarify that dividing by `10` shifts every digit ONE place RIGHT across the decimal point—leaving `25` wholes and `4` tenths (`25.4`, or `25 remainder 4`) instead of erasing `4`',
        'Assign only multiples of `10` for the rest of primary school',
        'Confirm `25` is completely exact for `254 ÷ 10`',
        'Avoid dividing 3-digit numbers by `10`',
      ],
      exp: 'Replacing "drop the last digit" with "shift all digits one column right" covers both whole-ten dividends (`24.0 = 24`) and general numbers (`25.4`).',
    },
    mr: {
      q: '`240 ÷ 10 = 24` पाहून विद्यार्थी "`10` ने भागताना शेवटचा अंक काढून टाकावा" अशी चुकीची समजूत करून घेतो आणि `254 ÷ 10 = 25` लिहून `4` गाळून टाकतो. हा संभ्रम कसा सोडवाल?',
      opts: [
        '`10` ने भागल्यास प्रत्येक अंक एक स्थान उजवीकडे सरकतो (`25.4` म्हणजेच `25` पूर्ण व `4` दशांश किंवा बाकी `4`) हे स्थानिक मूल्य तक्त्यावरून स्पष्ट करणे',
        'पुढे फक्त `10` च्या पटीतीलच संख्या भागाकारास देणे',
        '`25` हे अचूक उत्तर मानणे',
        '३-अंकी संख्यांचा `10` ने भागाकार टाळणे',
      ],
      exp: 'शून्य गाळण्याच्या तात्पुरत्या युक्तीऐवजी सर्व अंक एक घर उजवीकडे सरकण्याचा सर्वसमावेशक नियम शिकवल्यास दशांश भागाकार अचूक राहतो.',
    },
    hi: {
      q: '`240 ÷ 10 = 24` के अभ्यास के बाद एक छात्र "`10` से भाग देने पर बस आखिरी अंक हटा दो" मानकर `254 ÷ 10 = 25` लिख देता है और `4` गायब कर देता है। इसे कैसे सुधारें?',
      opts: [
        'यह स्पष्ट करना कि `10` से भाग देने पर हर अंक स्थानीय मान में एक स्थान दाईं ओर खिसकता है, जिससे `25.4` (या `25` शेष `4`) मिलता है, अंक मिटता नहीं',
        'आगे केवल `10` के गुणज ही देना',
        '`25` को सटीक मान लेना',
        '3-अंकीय भाग हटा देना',
      ],
      exp: 'अंक हटाने की गलत ट्रिक को हटाकर "एक स्थान दाईं ओर खिसकना" सिखाने से पूर्ण और दशमलव दोनों भाग स्पष्ट होते हैं।',
    },
  },
  {
    topic: 'Mathematical Storybooks Narrative Inquiry Exponential Rice Story',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why does narrating mathematical folk tales (such as "One Grain of Rice Doubling Daily on a Chessboard" or Lilavati bird riddles) enrich Class 4–5 classrooms?',
      opts: [
        'Rich narratives lower math anxiety, ignite curiosity about surprising growth/patterns, and invite pupils to predict, verify, and debate outcomes collaboratively',
        'Stories turn math classes into passive nap times',
        'Folk stories replace arithmetic accuracy with fantasy numbers',
        'They restrict geometry strictly to medieval chess rules',
      ],
      exp: 'Story contexts embed big ideas like doubling growth (`1, 2, 4, 8...`) in memorable human drama that prompts genuine mathematical prediction.',
    },
    mr: {
      q: 'इयत्ता ४–५ च्या वर्गात "बुद्धिबळाच्या पटावर रोज दुप्पट होणारे तांदळाचे दाणे" किंवा लीलावतीतील पहेल्या यांसारख्या गणितीय कथा सांगण्याचा काय फायदा होतो?',
      opts: [
        'रंजक कथेमुळे गणिताची भीती कमी होते, दुप्पट वाढीचे आश्चर्यचकित करणारे नमुने शोधण्याची उत्सुकता वाढते आणि मुले अंदाजावर चर्चा करतात',
        'कथांमुळे गणिताचा तास कंटाळवाणा होतो',
        'अचूक गणिताऐवजी काल्पनिक उत्तरे मानली जातात',
        'भूमिती फक्त बुद्धिबळापुरती मर्यादित होते',
      ],
      exp: 'कथारूप गणितामुळे दुप्पट वाढ व संख्या-नमुने भावनिक आणि बौद्धिकदृष्ट्या कायमचे स्मरणात राहतात.',
    },
    hi: {
      q: 'कक्षा 4–5 में "शतरंज की बिसात पर प्रतिदिन दोगुने होते चावल के दाने" या लीलावती की पहेलियों जैसी गणितीय कहानियाँ सुनाने से क्या लाभ होता है?',
      opts: [
        'कथाएँ गणित का डर कम करती हैं, चरघातांकी/दोगुनी वृद्धि के पैटर्न पर आश्चर्य व अनुमान-चर्चा जगाती हैं',
        'इससे कक्षा में नींद आने लगती है',
        'गणना की सटीकता समाप्त हो जाती है',
        'केवल शतरंज खेलना सिखाया जाता है',
      ],
      exp: 'कहानी संदर्भ अमूर्त पैटर्न और समस्या-समाधान को रोचक मानवीय प्रसंगों से जोड़ देते हैं।',
    },
  },
  {
    topic: 'Informal Congruence vs Similarity Photocopy Enlargement Class 5',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'How can a Class 5 teacher clarify the intuitive difference between "Congruent" shapes and "Similar" shapes without heavy Class 10 theorems?',
      opts: [
        'Overlay two identical notebook pages to show "exact match in both shape AND size" (congruent) versus a postcard photo and its zoomed poster enlargement showing "same shape, scaled size" (similar)',
        'Make students memorize `SSS, SAS, ASA` postulates in Class 5',
        'Claim that any two triangles with equal area are congruent',
        'Avoid showing scaled photographs in primary geometry',
      ],
      exp: 'Superposition ("fits right on top with zero overhang") vs photographic zoom gives crystal-clear intuition for congruence versus similarity.',
    },
    mr: {
      q: 'दहावीची कठीण प्रमेये न वापरता इयत्ता पाचवीच्या विद्यार्थ्यांना "एकरूप (Congruent)" आणि "समरूप (Similar)" आकृत्यांमधील फरक सहज कसा समजावता येईल?',
      opts: [
        'एकावर एक तंतोतंत बसणारी वहीची दोन पाने (समान आकार व माप = एकरूप) आणि एकाच फोटोचे लहान कार्ड व मोठे पोस्टर (समान आकार पण वेगळे प्रमाण = समरूप) दाखवून',
        'पाचवीतच `बाकोबा, कोबाको` प्रमेयाच्या कसोट्या पाठ करून घेऊन',
        'समान क्षेत्रफळाचे कोणतेही दोन त्रिकोण एकरूप असतात असे सांगून',
        'लहान-मोठ्या चित्रांचा वापर पूर्ण टाळून',
      ],
      exp: 'एकावर एक तंतोतंत जुळणे विरुद्ध फोटो झूम करणे ही दैनंदिन उदाहरणे एकरूपता व समरूपतेचा पाया घालतात.',
    },
    hi: {
      q: 'कक्षा 10 के कठिन प्रमेय पढ़ाए बिना कक्षा 5 में "सर्वांगसम (Congruent)" और "समरूप (Similar)" आकृतियों का अंतर कैसे स्पष्ट किया जाए?',
      opts: [
        'एक के ऊपर एक ठीक ढक लेने वाले दो कॉपी पृष्ठ ("आकार व माप दोनों समान" = सर्वांगसम) बनाम एक फोटो और उसके बड़े पोस्टर ("आकार समान पर माप अलग" = समरूप) से',
        'कक्षा 5 में ही `SAS, ASA` कसौटियाँ रटवाकर',
        'समान क्षेत्रफल वाले सभी आकृतियों को सर्वांगसम बताकर',
        'चित्रों के विस्तार का उदाहरण हटाकर',
      ],
      exp: 'अध्यारोपण (एक-दूसरे को ढकना) और फोटो ज़ूम का सहज अनुभव आगे की औपचारिक ज्यामिति के लिए स्पष्ट आधार बनाता है।',
    },
  },
  {
    topic: 'Teacher Wait Time Three Seconds After Higher-Order Question',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'After asking the class "Why can a square never have only three right angles?", why does deliberately pausing silently for `3–5 seconds` (Wait Time) dramatically improve mathematical responses?',
      opts: [
        'Wait time lets slower-processing and thoughtful learners formulate complete logical explanations, yielding longer, more accurate peer reasoning instead of impulsive guesses',
        'Because pupils need `5` seconds to sharpen their pencils',
        'Wait time pressures nervous children into freezing',
        'It reduces the number of students allowed to speak',
      ],
      exp: 'Mary Budd Rowe’s research proved increasing post-question wait time from `<1 s` to `3–5 s` expands student participation, explanation length, and analytical quality.',
    },
    mr: {
      q: 'शिक्षकाने वर्गात "चौरसाला फक्त तीनच काटकोन का असू शकत नाहीत?" असा विचारप्रवर्तक प्रश्न विचारल्यानंतर मुद्दाम `3–5 सेकंद` शांत प्रतीक्षा (Wait Time) केल्याने काय सुधारणा होते?',
      opts: [
        'विचार करणाऱ्या व संथ गतीच्या विद्यार्थ्यांनाही तर्क जुळवायला वेळ मिळतो, ज्यामुळे घाईच्या अंदाजाऐवजी सखोल व अचूक स्पष्टीकरणे समोर येतात',
        'मुलांना पेन्सिल टोकदार करण्यासाठी वेळ मिळतो',
        'विद्यार्थ्यांवर ताण वाढतो',
        'बोलणाऱ्या मुलांची संख्या कमी होते',
      ],
      exp: 'प्रश्नानंतर दिलेला ३–५ सेकंदांचा शांत विचार-अवधी वर्गातील विचारशील सहभाग व उत्तरांची गुणवत्ता लक्षणीयरीत्या वाढवतो.',
    },
    hi: {
      q: '"एक वर्ग में केवल तीन समकोण क्यों नहीं हो सकते?" जैसे उच्च-स्तरीय प्रश्न के बाद शिक्षक द्वारा `3–5 सेकंड` का मौन प्रतीक्षा-समय (Wait Time) देने से क्या लाभ होता है?',
      opts: [
        'अधिक छात्रों को तार्किक उत्तर गढ़ने का समय मिलता है, जिससे जल्दबाजी के तुक्कों के बजाय गहन व सटीक तर्क सामने आते हैं',
        'छात्रों को पेंसिल छीलने का समय मिलता है',
        'छात्र डरकर चुप हो जाते हैं',
        'बोलने वाले बच्चों की संख्या घटती है',
      ],
      exp: 'शोध दर्शाते हैं कि प्रश्न के बाद `3–5` सेकंड रुकने से उत्तरों की लंबाई, तर्क-गुणवत्ता और समावेशी भागीदारी बढ़ती है।',
    },
  },
  {
    topic: 'Parent Workshops Explaining Conceptual Math Over 50 Mechanical Sums',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Several parents complain during a PTM that the school gives "only 6 thoughtful math problems for homework instead of 50 rote multiplication sums like in our childhood." What is the BEST response?',
      opts: [
        'Demonstrate warmly during a brief PTM activity how solving `6` varied visual/word problems builds deep problem-solving flexibility rather than blind copying of `50` identical drills',
        'Immediately start giving `60` repetitive sums every evening to silence complaints',
        'Dismiss parents by saying they do not understand modern education',
        'Stop assigning all homework altogether without discussion',
      ],
      exp: 'Engaging parents hands-on with one conceptual puzzle vs rote drill builds home-school alignment around NEP-2020’s shift away from rote overload.',
    },
    mr: {
      q: 'पालक सभेत काही पालक तक्रार करतात की "आमच्या काळी रोज ५० गुणाकार द्यायचे, तुम्ही फक्त ६ च विचार करायला लावणारी उदाहरणे का देता?" शिक्षकाची सर्वोत्तम प्रतिक्रिया कोणती?',
      opts: [
        'पालकांनाच लहानशा प्रात्यक्षिकातून दाखवून देणे की ५० एकसारख्या रटाळ गणितांपेक्षा विविध संदर्भांतील ६ विचारप्रवर्तक प्रश्न मुलांची तर्कशक्ती आणि अचूकता कशी वाढवतात',
        'तक्रारी बंद करण्यासाठी लगेच रोज ६० एकसारखी उदाहरणे सुरू करणे',
        'पालकांना आधुनिक शिक्षण कळत नाही असे म्हणून फेटाळून लावणे',
        'चर्चा न करता सर्व गृहपाठ बंद करणे',
      ],
      exp: 'पालकांना संकल्पनात्मक गणिताचा प्रत्यक्ष अनुभव दिल्यास शाळा व घर यांच्यात NEP-2020 पूरक सकारात्मक सहकार्य निर्माण होते.',
    },
    hi: {
      q: 'अभिभावक-शिक्षक बैठक में कुछ अभिभावक शिकायत करते हैं कि "हमारे बचपन में रोज़ 50 रटे-रटाए सवाल मिलते थे, आप केवल 6 विचारशील प्रश्न ही क्यों देते हैं?" सर्वोत्तम प्रतिक्रिया क्या होगी?',
      opts: [
        'संक्षिप्त गतिविधि द्वारा आत्मीयता से दिखाना कि 50 यांत्रिक दोहरावों की तुलना में 6 विविध संदर्भ-आधारित प्रश्न कैसे गहरी समझ व लचीली समस्या-समाधान क्षमता बनाते हैं',
        'तुरंत प्रतिदिन 60 यांत्रिक सवाल देना शुरू कर देना',
        'अभिभावकों को अनभिज्ञ कहकर टाल देना',
        'बिना संवाद सभी गृहकार्य बंद कर देना',
      ],
      exp: 'अभिभावकों को अवधारणात्मक शिक्षण का प्रत्यक्ष अनुभव कराना रटंत-विरोधी सुधारों में उन्हें भागीदार बनाता है।',
    },
  },
  {
    topic: 'Rotational Symmetry Pinwheels Quarter And Half Turn Class 5',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'How does making and spinning a 4-blade paper pinwheel or drawing quarter-turn Rangoli fans introduce "Rotational Symmetry" naturally in Class 5?',
      opts: [
        'Observing that turning the pinwheel through a quarter turn (`90°`) or half turn (`180°`) makes it look identical to its starting position turns rotation into playful discovery',
        'Because pinwheels calculate perimeter automatically',
        'Because paper fans only have `1` symmetry line and zero turns',
        'To replace angles with wind-speed physics',
      ],
      exp: 'Balbharati/NCERT Class 5 "Does It Look the Same?" chapters use pinwheels and alphabet turns (`N, S, H, Z`) to build rotational intuition without formulas.',
    },
    mr: {
      q: 'इयत्ता पाचवीत कागदी फिरकी (Pinwheel) किंवा पाकळ्यांची रांगोळी चौथाई व अर्ध्या फेरीत फिरवून पाहण्याने "परिवलनी सममिती (Rotational Symmetry)" कशी नैसर्गिकरीत्या उलगडते?',
      opts: [
        'फिरकीला `90°` (पाव वळण) किंवा `180°` (अर्धा फेरा) फिरवल्यावरही ती मूळ आकृतीसारखीच तंतोतंत दिसते हे खेळाच्या अनुभवातून स्पष्ट होते',
        'कारण फिरकी आपोआप परिमिती मोजते',
        'कारण फिरकीला फिरवल्यावर ती बदलून जाते',
        'वाऱ्याचा वेग मोजण्यासाठी',
      ],
      exp: 'अक्षरे व फिरक्या प्रत्यक्ष फिरवून पाहिल्यामुळे कोनात्मक परिवलनाची संकल्पना सूत्राशिवाय पक्की होते.',
    },
    hi: {
      q: 'कक्षा 5 में कागज़ की फिरकी (Pinwheel) या पंखुड़ी पैटर्न को चौथाई और आधा घुमाकर देखना "घूर्णन सममिति (Rotational Symmetry)" को कैसे सहज बनाता है?',
      opts: [
        'यह देखकर कि चौथाई (`90°`) या आधा (`180°`) घुमाने पर भी फिरकी ठीक पहले जैसी ही दिखती है, बच्चे खेल-खेल में घूर्णन सममिति खोज लेते हैं',
        'क्योंकि फिरकी परिमाप नापती है',
        'क्योंकि कागज़ की फिरकी घूमने पर बदल जाती है',
        'पवन ऊर्जा का भौतिकी नियम पढ़ाने के लिए',
      ],
      exp: 'एनसीईआरटी/बालभारती के "क्या यह वैसा ही दिखता है?" जैसे खेल-आधारित अभ्यास घूर्णन सममिति को दृश्य व आनंददायक बनाते हैं।',
    },
  },
  {
    topic: 'Self-Correction Inverse Operation Habit Addition By Subtraction',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'After solving `4,365 − 1,789 = 2,576`, encouraging Class 4 pupils to check `"2,576 + 1,789 = 4,365"` builds what essential mathematical habit?',
      opts: [
        'Self-verification using inverse operations (`+` and `−` undo each other), shifting ownership of accuracy from the teacher’s red pen to the student',
        'Memorizing that subtraction always yields `4,365`',
        'Making homework unnecessarily twice as long for punishment',
        'Avoiding mental estimation',
      ],
      exp: 'Teaching inverse verification pairs (`− ↔ +`, `÷ ↔ ×`) fosters autonomy and reveals relational links between operations.',
    },
    mr: {
      q: '`4,365 − 1,789 = 2,576` सोडवल्यानंतर इयत्ता चौथीच्या विद्यार्थ्यांना "`2,576 + 1,789 = 4,365`" अशी पडताळणी करायला लावण्याने कोणती महत्त्वाची सवय लागते?',
      opts: [
        'व्यस्त क्रियेद्वारे स्व-पडताळणी करण्याची सवय—ज्यामुळे उत्तर बरोबर की चूक यासाठी शिक्षकांच्या लाल पेनावर अवलंबून न राहता स्वतः तपासण्याचे स्वावलंबन येते',
        'वजाबाकीचे उत्तर नेहमी `4,365` येते हे पाठ होते',
        'शिक्षा म्हणून दुप्पट लेखन करावे लागते',
        'अंदाज बांधणे बंद होते',
      ],
      exp: 'बेरीज-वजाबाकी व गुणाकार-भागाकार या व्यस्त क्रियांच्या साहाय्याने स्वतःचे उत्तर तपासणे विद्यार्थ्यांना स्वावलंबी गणिती बनवते.',
    },
    hi: {
      q: '`4,365 − 1,789 = 2,576` हल करने के बाद कक्षा 4 के छात्रों को "`2,576 + 1,789 = 4,365`" जाँचने की आदत डलवाने से क्या महत्वपूर्ण गुण विकसित होता है?',
      opts: [
        'व्युत्क्रम संक्रिया द्वारा स्व-सत्यापन की आदत—जिससे सटीकता की ज़िम्मेदारी शिक्षक के लाल पेन से हटकर स्वयं विद्यार्थी के पास आती है',
        'यह रटना कि उत्तर हमेशा `4,365` आता है',
        'दंड स्वरूप गृहकार्य दोगुना करना',
        'मानसिक अनुमान रोकना',
      ],
      exp: 'जोड़-घटाव तथा गुणा-भाग के व्युत्क्रम संबंध से स्वयं जाँच करना आत्मनिर्भर गणितीय सोच का चिह्न है।',
    },
  },
  {
    topic: 'Additive Weight Decomposition Standard Brass Weights Activity',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'At a play-store weighing station having ONLY `500 g`, `200 g`, `100 g`, and `50 g` standard weights, asking Class 3 pupils to find TWO different ways to weigh `350 g` of chickpeas strengthens what concept?',
      opts: [
        'Flexible additive decomposition (`200 + 100 + 50`, or `500` on left vs `350` chickpeas + `100 + 50` on right) alongside metric mass conservation',
        'Showing that `350 g` cannot be weighed accurately without a `350 g` iron block',
        'Training pupils to ignore balance needles',
        'Replacing gram measurements with dozen counts',
      ],
      exp: 'Combining standard weights multiplicatively/subtractively on both pans develops creative numerical decomposition and equivalence sense.',
    },
    mr: {
      q: 'खेळातील किराणा दुकानात फक्त `500 ग्रॅम`, `200 ग्रॅम`, `100 ग्रॅम` व `50 ग्रॅम` ची मापे असताना `350 ग्रॅम` हरभरे तोलण्याचे दोन वेगवेगळे मार्ग शोधण्यास सांगितल्याने कोणती संकल्पना बळकट होते?',
      opts: [
        'लवचिक संख्या-विभाजन (`200 + 100 + 50` किंवा एका पारड्यात `500` व दुसऱ्यात हरभरे + `100 + 50`) आणि समतोल तत्त्वाची सखोल समज',
        '`350 ग्रॅम` चे माप असल्याशिवाय तोलताच येत नाही हे दाखवणे',
        'तराजूचा काटा दुर्लक्षित करणे',
        'ग्रॅमऐवजी डझन वापरणे',
      ],
      exp: 'मर्यादित मापांतून वजन जुळवण्याचे कोडे तराजूमधील समतोल आणि संख्यांची बहुविध फोड एकत्रितपणे शिकवते.',
    },
    hi: {
      q: 'कक्षा के खेल-किराना स्टोर पर केवल `500 ग्रा, 200 ग्रा, 100 ग्रा` और `50 ग्रा` के बाट होने पर `350 ग्रा` चना तौलने के दो अलग तरीके खोजने से क्या समझ मजबूत होती है?',
      opts: [
        'लचीला संख्या-विघटन (`200+100+50` या एक पलड़े में `500` और दूसरे में चना + `100+50`) तथा तराजू संतुलन की समझ',
        'यह कि `350 ग्रा` तौला ही नहीं जा सकता',
        'तराजू की सुई अनदेखी करना',
        'ग्राम के बजाय दर्जन गिनना',
      ],
      exp: 'मानक बाटों से विभिन्न संयोजन खोजना भार संरक्षण व समीकरण संतुलन का मज़ेदार व्यावहारिक अभ्यास है।',
    },
  },
  {
    topic: 'NEP 2020 Holistic Progress Card Primary Math Assessment',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'How does NEP-2020’s 360-degree Holistic Progress Card (HPC) transform assessment in primary school mathematics compared to a single end-of-year mark sheet?',
      opts: [
        'Combines teacher observation of conceptual reasoning and group collaboration with student self-reflection, peer feedback, and creative portfolio artifacts across all domains',
        'Evaluates pupils solely on fastest arithmetic recall speed',
        'Removes all feedback from teachers completely',
        'Focuses exclusively on handwriting neatness in geometry notebooks',
      ],
      exp: 'PARAKH/NEP-2020 HPC captures cognitive, socio-emotional, and practical numeracy growth over time through multi-source evidence.',
    },
    mr: {
      q: 'वार्षिक परीक्षेच्या केवळ एका गुणपत्रिकेपेक्षा NEP-2020 मधील ३६०-अंशी समग्र प्रगती पत्रक (Holistic Progress Card) प्राथमिक गणिताचे मूल्यमापन कसे बदलते?',
      opts: [
        'संकल्पनात्मक तर्क व गट-सहकार्याचे शिक्षक निरीक्षण, विद्यार्थ्याचे स्व-मूल्यांकन, सहध्यायी अभिप्राय आणि पोर्टफोलिओ कार्य या सर्वांचा एकत्रित समावेश करते',
        'फक्त वेगवान तोंडी पाढे म्हणण्याच्या वेगावर गुण देते',
        'शिक्षकांचा अभिप्राय पूर्णपणे काढून टाकते',
        'केवळ भूमिती वहीतील सुंदर अक्षरावर गुण देते',
      ],
      exp: 'समग्र प्रगती पत्रकामुळे केवळ वार्षिक स्मरणाऐवजी विद्यार्थ्याच्या बहुआयामी गणितीय विकासाची अचूक नोंद घेतली जाते.',
    },
    hi: {
      q: 'NEP-2020 का 360-डिग्री समग्र प्रगति कार्ड (Holistic Progress Card) प्राथमिक गणित मूल्यांकन को केवल वार्षिक अंकतालिका से कैसे बदलता है?',
      opts: [
        'यह शिक्षक अवलोकन, छात्र स्व-मूल्यांकन, सहपाठी प्रतिपुष्टि और पोर्टफोलियो कार्यों के माध्यम से अवधारणात्मक तर्क व सहभागिता का समग्र आकलन करता है',
        'केवल गणना की अधिकतम गति पर अंक देता है',
        'शिक्षक टिप्पणी को पूर्णतः समाप्त करता है',
        'केवल कॉपी की सजावट देखता है',
      ],
      exp: 'समग्र प्रगति कार्ड बहु-स्रोतीय साक्ष्यों से विद्यार्थी की वास्तविक गणितीय, तार्किक और सहयोगात्मक वृद्धि दर्शाता है।',
    },
  },
];
