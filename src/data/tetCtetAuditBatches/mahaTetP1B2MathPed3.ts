import { CuratedTrilingualMcq } from './types';

// Batch 2 Mathematics Pedagogy Part 3 (26 unique Primary Math Pedagogy Qs)
export const MAHA_TET_P1_B2_MATH_PED3: CuratedTrilingualMcq[] = [
  {
    topic: 'Hundredths Grid Visual 0.4 vs 0.04 Decimal Density',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'What visual model MOST clearly corrects a Class 5 pupil’s confusion between `0.4` and `0.04`?',
      opts: [
        'Shading two identical `10×10` hundredths squares: `4` full columns (`40` small squares) for `0.4` versus just `4` tiny squares for `0.04`',
        'Asking the child to read decimal digits from right to left',
        'Removing the decimal point so both appear as whole number `4`',
        'Explaining only verbally that zeros after a point are invisible',
      ],
      exp: 'Comparing `40` shaded out of `100` (`0.40`) side-by-side against `4` out of `100` (`0.04`) builds unmistakable area intuition for decimal tenths versus hundredths.',
    },
    mr: {
      q: 'इयत्ता पाचवीच्या विद्यार्थ्याचा `0.4` आणि `0.04` यांमधील गोंधळ कोणते दृश्य मॉडेल सर्वात स्पष्टपणे दूर करते?',
      opts: [
        'दोन समान `10×10` शतमांश जाळ्यांत एकात `4` पूर्ण उभ्या पट्ट्या (`40` चौकोन = `0.4`) आणि दुसऱ्यात फक्त `4` लहान चौकोन (`0.04`) रंगवून दाखवणे',
        'दशांश अंक उजवीकडून डावीकडे वाचायला सांगणे',
        'दशांश चिन्ह काढून दोन्हीना `4` मानणे',
        'केवळ तोंडी सांगणे की बिंदूनंतरचा शून्य अदृश्य असतो',
      ],
      exp: '`10×10` ग्रिडवर `40` चौकोन विरुद्ध `4` चौकोन पाहिल्याने दशांश व शतांश यांतील दसपट फरक चटकन स्पष्ट होतो.',
    },
    hi: {
      q: 'कक्षा 5 के छात्र का `0.4` और `0.04` के बीच का भ्रम किस दृश्य मॉडल से सबसे स्पष्ट रूप से दूर होता है?',
      opts: [
        'दो एकसमान `10×10` ग्रिड में पहले पर `4` पूरे स्तंभ (`40` खाने = `0.4`) और दूसरे पर केवल `4` छोटे खाने (`0.04`) छायांकित करके दिखाना',
        'दशमलव के अंक दाएँ से बाएँ पढ़ने को कहना',
        'दशमलव बिंदु हटाकर दोनों को `4` मान लेना',
        'मौखिक रूप से कहना कि बिंदु के बाद का शून्य अदृश्य है',
      ],
      exp: '`10×10` सौ-खानों के ग्रिड पर `40/100` और `4/100` की तुलना दशांश व शतांश का वास्तविक अंतर दिखा देती है।',
    },
  },
  {
    topic: 'Mixed-Operation Word Problems vs Single-Operation Pages',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Why is a worksheet containing only `20` multiplication word problems at the end of a multiplication chapter pedagogically weaker than mixing `+`, `−`, `×`, and `÷` situations?',
      opts: [
        'Single-operation pages let pupils mechanically multiply every pair of numbers without even reading the story, whereas mixed pages require genuine problem comprehension',
        'Because children cannot multiply more than twice in one day',
        'Because mixed worksheets use fewer numbers overall',
        'Because addition should never appear alongside multiplication',
      ],
      exp: 'Mixing operations compels students to model the actual action/relationship in each scenario before picking an operation.',
    },
    mr: {
      q: 'गुणाकाराच्या धड्याशेवटी फक्त `20` गुणाकाराचीच शाब्दिक उदाहरणे देण्यापेक्षा बेरीज, वजाबाकी, गुणाकार व भागाकार अशी संमिश्र उदाहरणे देणे का अधिक श्रेष्ठ ठरते?',
      opts: [
        'एकाच क्रियेच्या पानावर मुले प्रश्न न वाचता सर्व संख्यांचा गुणाकार करतात; संमिश्र उदाहरणे प्रत्येक उदाहरणाचा खरा अर्थ समजून घेण्याची सवय लावतात',
        'कारण एका दिवसात दोनदापेक्षा जास्त गुणाकार करू नये',
        'कारण संमिश्र पानावर लहान संख्या असतात',
        'कारण बेरीज व गुणाकार एकत्र शिकवू नयेत',
      ],
      exp: 'मिश्र प्रश्नांमुळे विद्यार्थ्यांना प्रत्येक संदर्भाचा विचार करून कोणती गणितीय क्रिया योग्य आहे हे स्वतः ठरवावे लागते.',
    },
    hi: {
      q: 'गुणा के अध्याय के अंत में केवल गुणा के `20` इबारती सवाल देने के बजाय `+`, `−`, `×` और `÷` के मिश्रित सवाल देना क्यों बेहतर है?',
      opts: [
        'एक ही संक्रिया वाले पृष्ठ पर बच्चे कहानी पढ़े बिना बस गुणा कर देते हैं, जबकि मिश्रित प्रश्न वास्तविक समझ से संक्रिया चुनने को प्रेरित करते हैं',
        'क्योंकि बच्चे एक दिन में दो से अधिक गुणा नहीं कर सकते',
        'क्योंकि मिश्रित प्रश्नों में छोटी संख्याएँ होती हैं',
        'क्योंकि जोड़ और गुणा साथ नहीं सिखाने चाहिए',
      ],
      exp: 'मिश्रित संक्रिया वाले प्रश्न छात्रों को प्रश्न का संदर्भ पढ़कर उपयुक्त मॉडल चुनने का अभ्यास देते हैं।',
    },
  },
  {
    topic: 'Partial Quotients Chunking Division Scaffold Class 4',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'When introducing `96 ÷ 4` to struggling Class 4 students, how does the "Partial Quotients (Chunking)" method support understanding better than rushing into rigid digit-by-digit long division?',
      opts: [
        'Pupils subtract comfortable friendly chunks (`10 × 4 = 40`, another `10 × 4 = 40`, leaving `16`, then `4 × 4 = 16`, totaling `24`) while preserving whole-number meaning',
        'It forbids students from knowing multiplication tables',
        'It always produces larger quotients than standard division',
        'It eliminates any need to track remainders',
      ],
      exp: 'Chunking respects each child’s known multiplication facts and keeps place value transparent (`40` really means ten groups of `4`) before streamlining into standard notation.',
    },
    mr: {
      q: 'इयत्ता चौथीतील विद्यार्थ्यांना `96 ÷ 4` शिकवताना थेट यांत्रिक पद्धतीऐवजी "आंशिक भागाकार (Chunking)" पध्दत का उपयुक्त ठरते?',
      opts: [
        'विद्यार्थी सोयीचे मोठे गट (`4 × 10 = 40`, पुन्हा `40`, उरले `16 = 4 × 4`, एकूण `24`) वजा करत जातात, ज्यामुळे भागाकारामागील संपूर्ण संख्येचा अर्थ टिकून राहतो',
        'यात पाढ्यांची अजिबात गरज नसते',
        'यात नेहमी वेगळे उत्तर येते',
        'यात बाकी शिल्लक राहत नाही',
      ],
      exp: 'आंशिक भागाकारात विद्यार्थी आपल्या सोयीनुसार दहाचे वा पाचचे गट करून संख्यात्मक अर्थ न गमावता भागाकार आत्मसात करतात.',
    },
    hi: {
      q: 'कक्षा 4 में `96 ÷ 4` सिखाते समय कठोर पारंपरिक विधि से पहले "आंशिक भागफल (Chunking)" विधि क्यों अधिक सहायक होती है?',
      opts: [
        'छात्र अपने सहज गुणज-समूह (`10×4=40`, पुनः `40`, शेष `16=4×4`, कुल `24`) घटाते हुए संख्या का वास्तविक मान समझते हैं',
        'इसमें पहाड़ों की आवश्यकता नहीं होती',
        'इससे मानक भाग से बड़ा उत्तर आता है',
        'इसमें शेषफल कभी नहीं आता',
      ],
      exp: 'आंशिक भागफल स्थान-मान और समान-समूहन के अर्थ को जीवित रखकर मानक एल्गोरिद्म की ओर सेतु बनाता है।',
    },
  },
  {
    topic: 'Concrete Calendar Four-Year Leap Accumulation Quarter Days',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'How can a Class 4 teacher make the Leap Year rule ("one extra day added every four years") genuinely intuitive instead of a memorized trivia fact?',
      opts: [
        'Demonstrate with four circular paper "1/4-day" wedges (`6 hours` each) clipped from the Earth’s yearly orbit that lock together after `4` years into `1` complete `24-hour` day placed on `29 February`',
        'Tell pupils February borrows a day randomly from July',
        'Have pupils copy leap years from 1900 to 2100 ten times',
        'State that the Moon slows down every fourth summer',
      ],
      exp: 'Piecing four `1/4-day` (`6 h`) fractions into `1` whole day connects astronomy, fraction addition (`4 × 1/4 = 1`), and calendar rules smoothly.',
    },
    mr: {
      q: 'इयत्ता चौथीतील विद्यार्थ्यांना "दर चार वर्षांनी फेब्रुवारीत २९ दिवस (लीप वर्ष) का येतात?" हे रटाळ माहितीऐवजी प्रत्यक्ष अनुभवातून कसे पटवून द्यावे?',
      opts: [
        'पृथ्वीच्या प्रदक्षिणेतील दरवर्षी उरणारे `6 तास` म्हणजे `1/4 दिवसाचे` चार कागदी तुकडे जोडून `4` वर्षांत `1 पूर्ण दिवस (24 तास)` कसा तयार होतो हे दाखवून',
        'फेब्रुवारी जुलैमधून एक दिवस उसना घेतो असे सांगून',
        '१९०० ते २१०० मधील लीप वर्षे दहा वेळा लिहून घेऊन',
        'दर चौथ्या उन्हाळ्यात चंद्र संथ फिरतो असे सांगून',
      ],
      exp: 'चार `1/4` दिवसांचे काप एकत्र करून `1` पूर्ण दिवस घडवल्याने अपूर्णांक बेरीज व दिनदर्शिकेचा नियम एकाच वेळी स्पष्ट होतात.',
    },
    hi: {
      q: 'कक्षा 4 के बच्चों को लीप वर्ष ("हर चार साल में 29 फरवरी") का कारण रटाने के बजाय सहज रूप से कैसे समझाया जा सकता है?',
      opts: [
        'कागज़ के चार `1/4-दिन` (`6 घंटे`) वाले टुकड़ों को जोड़कर दिखाना कि `4` वर्षों के अतिरिक्त चौथाई दिन मिलकर `1 पूरा दिन (24 घंटे)` बनाते हैं',
        'यह कहकर कि फरवरी जुलाई से एक दिन उधार लेती है',
        '1900 से 2100 तक के वर्ष दस बार लिखवाकर',
        'यह बताकर कि हर चौथे वर्ष चंद्रमा धीमा हो जाता है',
      ],
      exp: '`4 × 1/4 = 1 पूरा दिन` का कागज़ी मॉडल खगोल, भिन्न और कैलेंडर नियम को जीवंत रूप से जोड़ता है।',
    },
  },
  {
    topic: 'Think-Pair-Share Quiet Learner Participation Math Discourse',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Whenever the teacher asks a challenging question, the same three vocal pupils raise their hands instantly while twenty others stay silent. How does the "Think–Pair–Share" routine fix this?',
      opts: [
        'Everyone receives silent wait-time to think first, then rehearses and refines their reasoning safely with ONE partner before sharing with the full class',
        'It eliminates class discussion altogether in favor of silent copying',
        'It assigns marks only to the fastest hand-raiser',
        'It groups all vocal students together while silent pupils leave the room',
      ],
      exp: 'Wait-time plus low-stakes partner rehearsal multiplies active mathematical thinking and confidence across shy and second-language learners.',
    },
    mr: {
      q: 'वर्गात अवघड प्रश्न विचारताच नेहमी तेच तीन मुले हात वर करतात आणि बाकी मुले शांत राहतात. "विचार–जोडी–सामायिकरण (Think–Pair–Share)" तंत्र ही समस्या कशी सोडवते?',
      opts: [
        'प्रत्येकाला प्रथम शांतपणे विचार करण्याची वेळ मिळते, नंतर एका जोडीदारासोबत आपले मत मोकळेपणाने तपासता येते आणि मग वर्गासमोर मांडण्याचा आत्मविश्वास वाढतो',
        'यामुळे वर्गातील संवाद कायमचा बंद होतो',
        'फक्त सर्वात आधी हात वर करणाऱ्यालाच गुण मिळतात',
        'यात शांत मुले वर्गाबाहेर राहतात',
      ],
      exp: 'जोडीदाराशी आधी चर्चा केल्याने लाजाळू व विचार करण्यास थोडा अधिक वेळ घेणाऱ्या विद्यार्थ्यांचाही सक्रिय सहभाग सुनिश्चित होतो.',
    },
    hi: {
      q: 'कक्षा में प्रश्न पूछते ही हमेशा वही तीन मुखर बच्चे हाथ उठाते हैं जबकि बाकी चुप रहते हैं। "सोचो–जोड़ी बनाओ–साझा करो (Think–Pair–Share)" इसमें कैसे मदद करता है?',
      opts: [
        'सभी बच्चों को पहले शांत सोचने का समय मिलता है, फिर एक साथी से विचार जाँचने का सुरक्षित अवसर पाकर पूरी कक्षा में बोलने का आत्मविश्वास बढ़ता है',
        'इससे कक्षा में चर्चा पूरी तरह बंद हो जाती है',
        'केवल सबसे तेज़ हाथ उठाने वाले को अंक मिलते हैं',
        'इसमें शांत छात्रों को बाहर बैठाया जाता है',
      ],
      exp: 'प्रतीक्षा-समय और साथी के साथ अभ्यास करने से संकोची व धीमी गति से सोचने वाले बच्चे भी गणितीय संवाद में जुड़ते हैं।',
    },
  },
  {
    topic: 'Open Number Line Starting Beyond Zero 38 to 52',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'When teaching `52 − 38` via counting-up or jumping on a number line, why is drawing an Open Number Line starting at `38` better than starting every paper strip strictly from `0`?',
      opts: [
        'Open number lines keep diagrams uncluttered and highlight proportional magnitude jumps (`38 + 2 → 40 + 10 → 50 + 2 → 52`, sum `14`)',
        'Because `0` does not belong on standard number lines',
        'Because open number lines forbid subtraction',
        'To prevent students from learning number order from `1` to `10`',
      ],
      exp: 'Focused segments on an open number line free pupils from squeezing 50 tiny ticks onto narrow notebook pages and showcase efficient mental landmarks (`40, 50`).',
    },
    mr: {
      q: 'संख्यारेषेवर `52 − 38` सोडवताना प्रत्येक वेळी `0` पासून सुरुवात न करता थेट `38` पासून सुरू होणारी "मुक्त संख्यारेषा (Open Number Line)" काढणे का अधिक उपयुक्त असते?',
      opts: [
        'वहीत गर्दी न होता `38 + 2 → 40 + 10 → 50 + 2 → 52` अशा सोयीच्या टप्प्यांच्या उड्या (`14`) स्पष्टपणे दाखवता येतात',
        'कारण संख्यारेषेवर `0` नसतोच',
        'कारण मुक्त संख्यारेषेवर वजाबाकी करता येत नाही',
        '१ ते १० संख्यांचा क्रम विसरण्यासाठी',
      ],
      exp: 'मुक्त संख्यारेषेमुळे १० च्या टप्प्यांवर उड्या मारण्याची लवचिक मानसिक गणितीय विचारसरणी विकसित होते.',
    },
    hi: {
      q: 'संख्या-रेखा पर `52 − 38` हल करते समय हर बार `0` से शुरू करने के बजाय `38` से शुरू होने वाली "खुली संख्या-रेखा (Open Number Line)" बनाना क्यों बेहतर है?',
      opts: [
        'इससे पृष्ठ पर अनावश्यक निशानों की भीड़ नहीं होती और `38 + 2 → 40 + 10 → 50 + 2 → 52` (`14`) जैसी सहज छलाँगें स्पष्ट दिखती हैं',
        'क्योंकि संख्या-रेखा पर `0` नहीं होता',
        'क्योंकि खुली संख्या-रेखा पर घटाव नहीं हो सकता',
        'ताकि बच्चे 1 से 10 गिनती भूल जाएँ',
      ],
      exp: 'खुली संख्या-रेखा दहाई के आधार बिंदुओं (40, 50) तक छलाँग लगाकर अंतर निकालने की मानसिक रणनीति सिखाती है।',
    },
  },
  {
    topic: 'Prime vs Composite Discovery Tile Arrays Class 5',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'When exploring Factors, Prime numbers, and Composite numbers in Class 5, what happens when pupils arrange `12` square tiles into every possible rectangle versus trying to rearrange `11` tiles?',
      opts: [
        '`12` forms three distinct rectangles (`1×12`, `2×6`, `3×4`), whereas `11` forms ONLY a single straight row (`1×11`) — making the distinction between composite and prime tactile and visual',
        '`11` forms more rectangles because odd numbers are longer',
        'Both `11` and `12` form identical square grids',
        'Tile arrays prove `1` has infinitely many factors',
      ],
      exp: 'Connecting factors to rectangle dimensions transforms "prime vs composite" from an abstract rule into a physical geometric discovery.',
    },
    mr: {
      q: 'इयत्ता पाचवीत विभाजक, मूळ संख्या व संयुक्त संख्या शिकवताना `12` चौरस तुकड्यांचे सर्व शक्य आयत (`1×12, 2×6, 3×4`) आणि `11` तुकड्यांचा फक्त एकच लांब आयत (`1×11`) बनवून पाहण्याचा काय फायदा होतो?',
      opts: [
        'विविध आयत बनणारी (`12`) ही संयुक्त संख्या आणि फक्त एकच रांग बनणारी (`11`) ही मूळ संख्या, हा फरक स्पर्श व दृष्टीतून पक्का होतो',
        '`11` चे जास्त आयत बनतात कारण विषम संख्या लांब असते',
        '`11` आणि `12` दोन्हीचे चौरस बनतात',
        '`1` चे अनंत विभाजक आहेत हे सिद्ध होते',
      ],
      exp: 'आयत रचनेतून अवयवांची जोडणी केल्याने मूळ व संयुक्त संख्यांची कल्पना मूर्त व अविस्मरणीय बनते.',
    },
    hi: {
      q: 'कक्षा 5 में गुणनखंड, अभाज्य और भाज्य संख्याएँ सिखाते समय `12` वर्गाकार टाइलों से कई आयत (`1×12, 2×6, 3×4`) बनाम `11` टाइलों से केवल एक ही आयत (`1×11`) बनवाना क्यों प्रभावी है?',
      opts: [
        'अनेक आयत बनने से भाज्य (`12`) और केवल एक सीधी कतार बनने से अभाज्य (`11`) संख्या का अंतर स्पर्श व दृष्टि से स्पष्ट हो जाता है',
        '`11` से अधिक आयत बनते हैं',
        'दोनों से पूर्ण वर्ग बनता है',
        'इससे `1` अभाज्य सिद्ध होता है',
      ],
      exp: 'टाइल आयतों के माध्यम से गुणनखंड खोजने पर अभाज्य व भाज्य संख्याओं की अवधारणा प्रत्यक्ष ज्यामितीय अनुभव बन जाती है।',
    },
  },
  {
    topic: 'Size vs Weight Misconception Large Cotton vs Small Iron',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'Seeing a large cardboard box and a small brass `1 kg` weight, a Class 2 pupil assumes the big box MUST be heavier. Which classroom investigation breaks this volume-equals-mass misconception?',
      opts: [
        'Having the child lift both objects and place the big cotton/foam-filled box on one side of a two-pan balance against the compact `1 kg` iron weight on the other',
        'Reading a definition of density from a Class 9 physics guide',
        'Measuring the perimeter of both objects with thread',
        'Painting both objects the same bright colour',
      ],
      exp: 'Seeing the tiny metal weight tip the pan down against a huge fluffy box teaches directly that outer volume does not dictate mass.',
    },
    mr: {
      q: 'मोठे कार्डबोर्डचे खोके आणि लहान `1 किग्रॅ` लोखंडी माप पाहून इयत्ता दुसरीचा मुलगा मानतो की मोठे खोकेच जड असणार. "मोठा आकार म्हणजे जास्त वजन" हा गैरसमज कोणती कृती दूर करते?',
      opts: [
        'दोन्ही वस्तू हातात उचलून दोन तागड्यांच्या तराजूत एका बाजूला कापूस/फोम भरलेले मोठे खोके व दुसऱ्या बाजूला लहान `1 किग्रॅ` माप ठेवण्याचा प्रत्यक्ष अनुभव देऊन',
        'नववीच्या पुस्तकातील घनतेची व्याख्या वाचून दाखवून',
        'दोन्हीची परिमिती दोऱ्याने मोजून',
        'दोन्हींना एकच रंग देऊन',
      ],
      exp: 'तराजूमध्ये मोठे हलके खोके वर उचलले जाताना पाहिल्याने आकार व वजन यांतील फरक त्वरित कळतो.',
    },
    hi: {
      q: 'एक बड़ा गत्ते का डिब्बा और छोटा `1 किग्रा` का बाट देखकर कक्षा 2 का बच्चा मानता है कि बड़ा डिब्बा ही भारी होगा। यह भ्रम किस प्रयोग से दूर होगा?',
      opts: [
        'बच्चे से दोनों उठवाना और दो पलड़ों वाले तराजू पर रुई/स्पंज से भरे बड़े डिब्बे के सामने छोटा `1 किग्रा` का बाट तौलकर दिखाना',
        'कक्षा 9 की घनत्व की परिभाषा रटवाना',
        'दोनों का परिमाप धागे से नापना',
        'दोनों पर एक जैसा रंग करना',
      ],
      exp: 'तराजू के पलड़े पर छोटे लोहे के बाट को भारी होते देखना आकार और द्रव्यमान का अंतर प्रत्यक्ष स्पष्ट करता है।',
    },
  },
  {
    topic: 'Newspaper Cricket & Weather Charts Data Handling',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why is bringing real newspaper tables (cricket run-rates, weekly district maximum/minimum temperatures, train arrival tables) into Class 5 Data Handling classes strongly recommended?',
      opts: [
        'Authentic messy data motivates interpreting scales, range, averages, and trends meaningfully instead of artificial tidy textbook tables alone',
        'Because school libraries lack graph notebooks',
        'So pupils memorize sports players’ jersey numbers',
        'To replace mathematical graphs with reading prose articles',
      ],
      exp: 'Real civic/sports datasets show students how citizens actually read averages, comparisons, and weather patterns outside school.',
    },
    mr: {
      q: 'इयत्ता पाचवीच्या माहिती व्यवस्थापन (Data Handling) पाठात वर्तमानपत्रातील खरेखुरे तापमान तक्ते, क्रिकेट धावगती किंवा रेल्वे वेळापत्रक का आणले पाहिजे?',
      opts: [
        'खऱ्या आयुष्यातील आकडेवारीमुळे स्केल, सरासरी, कमाल-किमान तुलना व कल समजून घेण्यास नैसर्गिक आवड आणि अर्थ प्राप्त होतो',
        'कारण शाळेत आलेख वह्या उपलब्ध नसतात',
        'खेळाडूंचे जर्सी क्रमांक पाठ करण्यासाठी',
        'आलेख काढणे पूर्ण बंद करण्यासाठी',
      ],
      exp: 'अस्सल दैनंदिन माहितीवरून केलेली आकडेमोड विद्यार्थ्यांना माध्यमांतील आकडेवारी वाचण्याची साक्षरता देते.',
    },
    hi: {
      q: 'कक्षा 5 में आँकड़ों का प्रबंधन पढ़ाते समय समाचार-पत्रों से वास्तविक मौसम तापमान सारणी, क्रिकेट स्कोरकार्ड या रेल समय-सारणी लाना क्यों अनुशंसित है?',
      opts: [
        'वास्तविक आँकड़ों से पैमाना, औसत, परिसर और तुलना पढ़ना विद्यार्थियों के लिए सार्थक और रोचक बनता है',
        'क्योंकि पुस्तकों में संख्याएँ कम होती हैं',
        'ताकि खिलाड़ी जर्सी नंबर याद किए जाएँ',
        'ग्राफ़ बनाना बंद करने के लिए',
      ],
      exp: 'असली मीडिया आँकड़े कक्षा के गणित को बाहर की दुनिया की डेटा-साक्षरता से जोड़ते हैं।',
    },
  },
  {
    topic: 'Interpreting Remainder Contextually Field Trip Vans',
    pattern: 'Analytical',
    difficulty: 'Moderate',
    en: {
      q: 'Solve the problem: "`25` students go on a nature trail; each jeep seats `4` students safely. How many jeeps are required?" Many Class 4 pupils mechanically answer `6 remainder 1`. What pedagogical need does this reveal?',
      opts: [
        'Teaching students to interpret remainders in real context—rounding UP (`7` jeeps so the `25th` child is not left behind!) rather than writing raw textbook `"6 R 1"`',
        'Allowing `5` children to squeeze onto one jeep seat unsafely',
        'Changing `25` to `24` so students never face remainders',
        'Proving division `25 ÷ 4` has no real-world meaning',
      ],
      exp: 'Contextualizing remainders (round up for vehicles, drop remainder for buying maximum chocolates, split as fraction for sharing ribbons) is vital for real-world math.',
    },
    mr: {
      q: '"`25` विद्यार्थी सहलीला जातात व एका जीपमध्ये सुरक्षितपणे `4` मुले बसतात, तर किती जीप लागतील?" या प्रश्नाचे उत्तर अनेक मुले `6 बाकी 1` लिहितात. यातून कोणती शैक्षणिक गरज अधोरेखित होते?',
      opts: [
        'संदर्भानुसार बाकीचा अर्थ लावणे शिकवणे — `1` मुलगा मागे राहू नये म्हणून `7` जीप लागतील (`6 बाकी 1` नव्हे) हे वास्तव भान देणे',
        'एका सीटवर जादा मुले दाटीवाटीने बसवणे',
        'फक्त नि:शेष भाग जाणाऱ्या संख्याच (`24`) उदाहरणात देणे',
        '`25 ÷ 4` चा व्यवहारात काहीच उपयोग नाही असे मानणे',
      ],
      exp: 'संदर्भानुसार बाकी पूर्णांकात वाढवायची (जीप), सोडून द्यायची (वस्तू खरेदी), की अपूर्णांकात वाटायची (रिबीन) हे निर्णय घेणे खरे गणिती साक्षरतेचे लक्षण आहे.',
    },
    hi: {
      q: '"`25` छात्र भ्रमण पर जा रहे हैं और एक जीप में केवल `4` छात्र सुरक्षित बैठ सकते हैं; कितनी जीप चाहिए?" कई बच्चे `6 शेष 1` उत्तर लिखते हैं। यह किस शिक्षण आवश्यकता को दर्शाता है?',
      opts: [
        'वास्तविक संदर्भ में शेषफल की व्याख्या करना — ताकि `1` बच्चा छूट न जाए इसलिए `7` जीप चाहिए, न कि यांत्रिक `"6 शेष 1"`',
        'एक सीट पर अतिरिक्त बच्चे बिठा देना',
        'परीक्षा में केवल `24 ÷ 4` जैसे पूरे कटने वाले सवाल देना',
        'यह मानना कि शेषफल का कोई अर्थ नहीं होता',
      ],
      exp: 'संदर्भ के आधार पर शेषफल को ऊपर पूर्णांक करना, छोड़ना या भिन्न में बाँटना वास्तविक जीवन गणित की महत्वपूर्ण दक्षता है।',
    },
  },
  {
    topic: 'Prototype Bias Rotated Triangles Horizontal Base Misconception',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'A Class 3 child confidently points to an upright triangle with a flat horizontal bottom edge, yet insists an inverted triangle resting on a sharp vertex point (`▽`) is "not a real triangle—it’s an ice-cream cone!" What caused this?',
      opts: [
        'Over-exposure to rigid horizontal-base textbook prototypes (Van Hiele Level 0 fixation) instead of showing triangles rotated in varied orientations',
        'Color blindness in green shapes',
        'Inability to count up to `3` edges',
        'Learning trigonometry too early',
      ],
      exp: 'Rotating cutouts and drawing tilted/upside-down triangles teaches that invariant attributes (`3` closed straight sides, `3` vertices), not upright orientation, define a triangle.',
    },
    mr: {
      q: 'इयत्ता तिसरीचा मुलगा सपाट तळावर उभा असलेला त्रिकोण अचूक ओळखतो, पण टोकावर उलटा ठेवलेला त्रिकोण (`▽`) पाहून म्हणतो, "हा त्रिकोण नाही, हा आइस्क्रीमचा कोन आहे!" याचे कारण काय?',
      opts: [
        'पुस्तकात नेहमी एकाच सपाट पायाच्या साच्यात (prototype) त्रिकोण दाखवल्याने आणि विविध कोनांत फिरवून न दाखवल्याने झालेली रचना-बांधिलकी',
        'रंग आंधळेपणा',
        '३ कडा मोजता न येणे',
        'लहानपणीच त्रिकोणमिती शिकवणे',
      ],
      exp: 'आकार कोणत्याही दिशेला फिरवले तरी त्यांचे `3` बाजू व `3` कोन हे गुणधर्म बदलत नाहीत, हे विविध अवस्थांतील आकृत्या दाखवून स्पष्ट करावे लागते.',
    },
    hi: {
      q: 'कक्षा 3 का छात्र सपाट आधार वाले त्रिभुज को पहचानता है, पर शीर्ष पर टिके उलटे त्रिभुज (`▽`) को "आइसक्रीम कोन" कहता है, त्रिभुज नहीं। इसका कारण क्या है?',
      opts: [
        'केवल क्षैतिज आधार वाले मानक नमूने (Prototype Bias) बार-बार दिखाना और आकृतियों को घुमाकर विविध अभिविन्यास में न दिखाना',
        'तीन तक गिनती न आना',
        'रंगों की पहचान न होना',
        'अधिक कठिन परिभाषा पढ़ाना',
      ],
      exp: 'भिन्न-भिन्न घुमावों व अनुपातों में आकृतियाँ दिखाने से बच्चे स्थिति के बजाय स्थायी ज्यामितीय गुणों से पहचानना सीखते हैं।',
    },
  },
  {
    topic: 'One-to-One Correspondence Reciting Chants Without Touching',
    pattern: 'Classroom Scenario',
    difficulty: 'Easy',
    en: {
      q: 'A Class 1 child recites "one-two-three-four-five-six" rapidly while tapping `4` buttons, missing two counts or tapping the same button twice. Which foundational counting principle needs strengthening?',
      opts: [
        'One-to-One Correspondence — pairing exactly one spoken number tag to each single physical object moved aside ("touch-and-slide")',
        'Subtraction with regrouping',
        'Prime factorization',
        'Reading analog seconds',
      ],
      exp: 'Gelman & Gallistel’s One-to-One Correspondence improves dramatically when learners physically slide each counted pebble from an "uncounted pile" to a "counted tray".',
    },
    mr: {
      q: 'इयत्ता पहिलीचा विद्यार्थी समोर `4` बटणे असताना वेगाने "एक-दोन-तीन-चार-पाच-सहा" म्हणत बोट फिरवतो व मोजणी चुकवतो. येथे कोणते मूलभूत मोजणी तत्त्व दृढ करण्याची गरज आहे?',
      opts: [
        'एकास-एक संगती (One-to-One Correspondence) — प्रत्येक मोजलेली वस्तू हाताने बाजूला सरकवून तिला नेमका एकच अंक जोडणे',
        'हातच्याची वजाबाकी',
        'मूळ अवयव पाडणे',
        'घड्याळाचे सेकंद वाचणे',
      ],
      exp: 'मोजलेली प्रत्येक वस्तू स्पर्श करून बाजूला ठेवल्यास मोजणीचा वेग व बोटाची हालचाल यांचा अचूक मेळ बसतो.',
    },
    hi: {
      q: 'कक्षा 1 का बच्चा `4` बटनों पर तेजी से उँगली घुमाकर "एक-दो-तीन-चार-पाँच-छह" बोल देता है और गिनती गलत करता है। कौन-सा आधारभूत सिद्धांत मजबूत करना होगा?',
      opts: [
        'एक-से-एक संगति (One-to-One Correspondence) — प्रत्येक वस्तु को छूकर व अलग खिसकाकर ठीक एक संख्या नाम से जोड़ना',
        'उधार वाला घटाव',
        'अभाज्य गुणनखंडन',
        'सेकंड की सुई पढ़ना',
      ],
      exp: 'गिनी गई वस्तु को धीरे-धीरे अलग खिसकाने की गतिविधि बोलने और गिनने के बीच एक-से-एक तालमेल बनाती है।',
    },
  },
  {
    topic: 'Which One Doesnt Belong Open Reasoning Routine 9 16 25 43',
    pattern: 'Pedagogical',
    difficulty: 'Pedagogical HOTS',
    en: {
      q: 'A teacher writes four numbers `{9, 16, 25, 43}` on the board and asks, "Give a valid mathematical reason why ANY one of these could be the odd one out." Why is this routine valuable?',
      opts: [
        'Every number invites legitimate justification (`9` = single digit, `16` = only even, `25` = only multiple of 5, `43` = only non-square/prime), promoting multiple valid arguments',
        'Because math problems should have ambiguous ungradable answers on tests',
        'Because `43` cannot be analyzed using digits',
        'To reduce computation time during board exams',
      ],
      exp: '"Which One Doesn’t Belong?" lowers participation barriers while challenging pupils to state precise mathematical properties (`even`, `prime`, `square`, `multiple of 5`).',
    },
    mr: {
      q: 'शिक्षक फळ्यावर `{9, 16, 25, 43}` या चार संख्या लिहून विचारतात, "यांपैकी कोणतीही एक संख्या इतर तीनपेक्षा वेगळी का आहे याचे अचूक गणितीय कारण द्या." या उपक्रमाचे मूल्य काय?',
      opts: [
        'प्रत्येक संख्येसाठी अचूक तर्क देता येतो (`9` एक-अंकी, `16` एकमेव सम, `25` ५ ची पट, `43` एकमेव मूळ व अवर्ग), ज्यामुळे बहुविध तार्किक विचार फुलतो',
        'कारण परीक्षेत संदिग्ध प्रश्न विचारायचे असतात',
        'कारण `43` वर कोणतीही क्रिया होत नाही',
        'आकडेमोड पूर्ण बंद करण्यासाठी',
      ],
      exp: 'अशा बहु-पर्यायी तर्क उपक्रमांमुळे विद्यार्थी संख्यांच्या गुणधर्मांचे बारकाईने निरीक्षण करतात व आपले मत पुराव्यासह मांडतात.',
    },
    hi: {
      q: 'शिक्षक बोर्ड पर `{9, 16, 25, 43}` लिखकर पूछते हैं, "कोई एक गणितीय कारण बताइए कि इनमें से कोई भी संख्या बाकी तीन से अलग क्यों हो सकती है।" इस अभ्यास का मुख्य महत्व क्या है?',
      opts: [
        'प्रत्येक संख्या के लिए वैध तर्क निकलता है (`9` एक-अंकीय, `16` एकमात्र सम, `25` पाँच की गुणज, `43` अभाज्य/गैर-वर्ग), जिससे बहु-आयामी तार्किक अभिव्यक्ति बढ़ती है',
        'क्योंकि परीक्षा में संदिग्ध प्रश्न दिए जाते हैं',
        'क्योंकि `43` का कोई गुणधर्म नहीं होता',
        'गणना का समय समाप्त करने हेतु',
      ],
      exp: 'इसमें हर विद्यार्थी किसी न किसी गुणधर्म की पहचान करके सटीक गणितीय भाषा में अपना दावा सिद्ध कर सकता है।',
    },
  },
  {
    topic: 'Co-Created Student Anchor Charts vs Store Bought Posters',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why are classroom Math Anchor Charts built collaboratively WITH pupils after an investigation more effective learning aids than pre-printed commercial wall posters hung on day one?',
      opts: [
        'Co-created charts capture the class’s own examples, drawings, and discoveries—so learners actually read and reference them as personal memory anchors',
        'Commercial posters always contain mathematical calculation errors',
        'Handwritten charts save wall paint',
        'Printed posters cannot show geometric polygons clearly',
      ],
      exp: 'Students rarely look at dense commercial walls, whereas charts summarizing their own class-discovered strategies ("How we checked `1/2 = 2/4`") serve as active thinking tools.',
    },
    mr: {
      q: 'पहिल्याच दिवशी बाजारातून विकत आणलेले पोस्टर भिंतीवर लावण्यापेक्षा शोध-उपक्रमानंतर विद्यार्थ्यांसोबत मिळून तयार केलेले गणितीय संदर्भ तक्ते (Anchor Charts) अधिक प्रभावी का ठरतात?',
      opts: [
        'त्यावर वर्गाची स्वतःची उदाहरणे, चित्रे व शोधलेले नियम असल्याने मुले ते आपले मानून प्रत्यक्ष अभ्यासात त्यांचा आधार घेतात',
        'कारण विकतच्या पोस्टरमध्ये नेहमी गणितीय चुका असतात',
        'हाताने बनवलेले तक्ते भिंतीचा रंग वाचवतात',
        'छापील पोस्टरवर बहुभुज दिसत नाहीत',
      ],
      exp: 'सह-निर्मित तक्त्यांशी विद्यार्थ्यांची भावनिक व वैचारिक गुंतवणूक असल्याने ते सक्रिय संदर्भ साधन म्हणून काम करतात.',
    },
    hi: {
      q: 'बाज़ार से खरीदे गए तैयार पोस्टरों की अपेक्षा विद्यार्थियों के साथ मिलकर बनाए गए "एंकर चार्ट" अधिक प्रभावी क्यों होते हैं?',
      opts: [
        'सह-निर्मित चार्ट में कक्षा के स्वयं के उदाहरण, चित्र और निष्कर्ष दर्ज होते हैं, जिन्हें छात्र अपने संदर्भ के रूप में बार-बार देखते हैं',
        'बाज़ार के पोस्टरों में हमेशा गलत सूत्र छपे होते हैं',
        'हाथ के चार्ट दीवार को साफ रखते हैं',
        'मुद्रित पोस्टरों पर ज्यामितीय आकृतियाँ नहीं छप सकतीं',
      ],
      exp: 'अन्वेषण के बाद विद्यार्थियों द्वारा रचित चार्ट सक्रिय स्मृति-आधार और स्वामित्व की भावना प्रदान करते हैं।',
    },
  },
  {
    topic: 'Face Value vs Place Value Conceptual Clarity 2745',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'A Class 4 child says the Place Value of `7` in `2,745` is `7` instead of `700`. How do you make the difference between "Face Value" and "Place Value" crystal clear?',
      opts: [
        'Compare a `₹100` note vs a `₹10` note: the printed digit "`7`" stays `7` everywhere (Face Value), just like the count of notes, while its seat/position (`Hundreds` vs `Tens`) decides its total worth (`7 × 100 = 700` Place Value)',
        'Have the pupil count backwards from `2,745` to `700`',
        'Tell the pupil Face Value applies only to odd digits',
        'Erase the `45` so `7` stands alone',
      ],
      exp: 'Using "how many packets" (Face Value) times "size of packet at that seat" (Hundred-packet = `100`) cleanly prevents confusing the digit symbol with its positional worth.',
    },
    mr: {
      q: 'इयत्ता चौथीचा विद्यार्थी `2,745` मधील `7` ची स्थानिक किंमत `700` ऐवजी `7` सांगतो. "दर्शनी किंमत (Face Value)" आणि "स्थानिक किंमत (Place Value)" यांतील फरक कसा स्पष्ट कराल?',
      opts: [
        '`7` हा अंक म्हणजे नोटांची संख्या (`7` नोटा = दर्शनी किंमत), पण त्या शतकाच्या घरात बसल्यास प्रत्येक नोट ₹१०० ची असल्याने एकूण मूल्य `700` (स्थानिक किंमत) होते हे दाखवून',
        '`2,745` पासून `700` पर्यंत उलटे मोजायला सांगून',
        'दर्शनी किंमत फक्त विषम अंकांनाच असते असे सांगून',
        '`45` खोडून फक्त `7` ठेवून',
      ],
      exp: 'अंकाची स्वतःची ओळख (दर्शनी) आणि घरावरून मिळणारे मूल्य (स्थानिक) हा फरक चलनी नोटांच्या संख्येवरून व किमतीवरून चटकन पटतो.',
    },
    hi: {
      q: 'कक्षा 4 का छात्र `2,745` में `7` का स्थानीय मान `700` के बजाय `7` बताता है। "अंकित/जातीय मान (Face Value)" और "स्थानीय मान (Place Value)" का अंतर कैसे स्पष्ट करेंगे?',
      opts: [
        'यह समझाकर कि `7` नोटों की संख्या/चेहरा है (जातीय मान = `7`), परंतु सैकड़े के स्थान पर बैठने से हर बंडल `100` का हो जाता है, अतः कुल मान `700` (स्थानीय मान) है',
        '`2,745` से `700` तक उलटी गिनती कराकर',
        'यह कहकर कि जातीय मान केवल विषम अंकों का होता है',
        '`45` मिटाकर केवल `7` लिखकर',
      ],
      exp: '"अंक कितने हैं" (जातीय मान) और "किस मूल्य के स्थान पर बैठे हैं" (स्थानीय मान) यह भेद समझाने से भ्रम समाप्त होता है।',
    },
  },
  {
    topic: 'Early Algebraic Thinking Input-Output Function Boxes Class 5',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'How do Class 4–5 "Magic Rule Boxes" (Input `2 → Out 7`, `3 → Out 10`, `5 → Out 16`) foster Algebraic Thinking before formal `x` and `y` variables?',
      opts: [
        'Learners hunt for the invariant functional rule (`× 3 + 1`) governing pairs of changing numbers, cultivating generalization without intimidating algebraic letters',
        'They teach rote memorizing of one-digit squares only',
        'They replace geometry polygons with computer hardware wiring',
        'They force pupils to memorize quadratic equations in Class 4',
      ],
      exp: 'Spotting functional input-output relationships ("triple the number and add one") builds early algebraic generalization naturally.',
    },
    mr: {
      q: 'इयत्ता ४–५ मध्ये औपचारिक `x` आणि `y` चलांशिवाय "जादुई नियम पेटी (इनपुट `2 → 7`, `3 → 10`, `5 → 16`)" सारखे उपक्रम बीजगणितीय विचारसरणी कशी घडवतात?',
      opts: [
        'बदलणाऱ्या संख्यांमधील कायम राहणारा नियम (`× 3 + 1`) शोधल्यामुळे `x` अक्षरांच्या भीतीशिवाय सामान्यीकरणाचे (generalization) बीज रोवले जाते',
        'यामुळे फक्त एक-अंकी वर्ग पाठ होतात',
        'यामुळे भूमितीऐवजी संगणक जोडणी शिकवली जाते',
        'चौथीतच वर्गसमीकरणे पाठ करावी लागतात',
      ],
      exp: 'इनपुट-आउटपुट नमुन्यांतून संबंध शोधणे हे औपचारिक बीजगणिताच्या पूर्वतयारीचा (Early Algebra) उत्तम पाया आहे.',
    },
    hi: {
      q: 'कक्षा 4–5 में औपचारिक `x, y` चर से पहले "जादुई नियम बॉक्स (इनपुट `2 → 7`, `3 → 10`, `5 → 16`)" बीजगणितीय चिंतन कैसे जगाते हैं?',
      opts: [
        'बदलती संख्याओं के बीच छिपा स्थायी नियम (`× 3 + 1`) खोजने से बिना अक्षर-भय के सामान्यीकरण (generalization) की क्षमता विकसित होती है',
        'इससे केवल वर्ग रटने की आदत बनती है',
        'इससे ज्यामिति समाप्त हो जाती है',
        'इसमें कक्षा 4 में ही द्विघात समीकरण हल करने पड़ते हैं',
      ],
      exp: 'संबंध-नियम खोजना प्राथमिक स्तर पर पूर्व-बीजगणितीय चिंतन (Early Algebraic Thinking) को सहजता से विकसित करता है।',
    },
  },
  {
    topic: 'Diagnosing Multiplication Carry Before Multiply Bug 27 x 3',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'Solving `27 × 3`, a Class 4 student does `7 × 3 = 21` (writes `1`, carries `2`), then adds the carried `2` to `2` FIRST (`2 + 2 = 4`) and multiplies `4 × 3 = 12`, getting `121` instead of `81`. How should the teacher fix this?',
      opts: [
        'Show expanded partial products (`3 × 7 = 21` plus `3 × 20 = 60`, sum `81`) so the pupil sees clearly that the `2` tens carried from `21` get ADDED after multiplying `20 × 3`',
        'Make the student recite the 3-times table backwards',
        'Confirm `121` is close enough for estimation',
        'Ban carrying digits on paper completely',
      ],
      exp: 'Expanded partial-product notation makes it unmistakably clear why carrying `2` (`20`) does NOT become part of the tens multiplier (`(20+20) × 3` is wrong; it is `60 + 20 = 80`).',
    },
    mr: {
      q: '`27 × 3` सोडवताना इयत्ता चौथीचा विद्यार्थी `7 × 3 = 21` चा `2` हातचा वर लिहितो, पण नंतर आधी `2 + 2 = 4` करून `4 × 3 = 12` म्हणजे `121` उत्तर आणतो. शिक्षक ही चूक कशी सुधारतील?',
      opts: [
        'विस्तारित आंशिक गुणाकार (`3 × 7 = 21` आणि `3 × 20 = 60`, एकूण `81`) दाखवून पटवून देणे की हातचा आलेले `2` दशक गुणाकारानंतर मिळवले जातात, आधी नाही',
        '३ चा पाढा उलटा म्हणायला लावून',
        '`121` हे अंदाजे बरोबर मानून',
        'कागदावर हातचा लिहिण्यास बंदी घालून',
      ],
      exp: 'विस्तारित पद्धत दाखवल्यास गुणाकारातील प्राधान्य व स्थानिक मूल्यांची जोड चटकन समजते आणि हातच्याच्या चुकीची पुनरावृत्ती थांबते.',
    },
    hi: {
      q: '`27 × 3` करते समय एक छात्र `7 × 3 = 21` का हासिल `2` ऊपर लिखता है, फिर पहले `2 + 2 = 4` करके `4 × 3 = 12` (`121`) लिख देता है। शिक्षक इसे कैसे सुधारें?',
      opts: [
        'विस्तारित आंशिक गुणनफल (`3 × 7 = 21` तथा `3 × 20 = 60`, योग `81`) दिखाकर स्पष्ट करना कि हासिल की `2` दहाई `20 × 3` के बाद जोड़ी जाती है, पहले नहीं',
        '3 का पहाड़ा उल्टा रटवाना',
        '`121` को अनुमानित सही मान लेना',
        'कॉपी पर हासिल लिखने पर रोक लगाना',
      ],
      exp: 'आंशिक गुणनफल से `3 × 20` और `+20` का क्रम दिखने पर यह आम गुणाकार-क्रम त्रुटि तुरंत दूर हो जाती है।',
    },
  },
  {
    topic: 'Informal Balance Scale Equations Without Formal Variables',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Why are pictorial pan-balance puzzles (`2 apples + 100 g = 400 g`) widely used in Classes 4–5 before teaching algebraic linear equations (`2x + 100 = 400`)?',
      opts: [
        'Removing the exact same weight (`100 g`) or halving identical items equally on both pans teaches equation-solving logic physically before symbolic transposition rules',
        'Because primary textbooks are barred from weighing fruits',
        'To replace fractions with geometry circles',
        'Because `400 g` cannot be subtracted in Class 4',
      ],
      exp: 'Pan balance symmetry teaches the real reason behind "move `+100` as `−100`": doing the same fair action to both sides keeps the balance level.',
    },
    mr: {
      q: '`2x + 100 = 400` सारखी औपचारिक समीकरणे शिकवण्यापूर्वी इयत्ता ४–५ मध्ये तराजूची चित्रे (`2 सफरचंद + 100 ग्रॅम = 400 ग्रॅम`) का वापरली जातात?',
      opts: [
        'दोन्ही पारड्यांतून समान वजन कमी करणे किंवा दोन्हींचा समभाग करणे या भौतिक तर्कातून पुढे "बाजू बदलताना चिन्ह का बदलते" याचा पाया पक्का होतो',
        'कारण प्राथमिक पुस्तकांत फळांचे वजन निषिद्ध आहे',
        'अपूर्णांकाऐवजी वर्तुळे आणण्यासाठी',
        'कारण चौथीत `400` ची वजाबाकी येत नाही',
      ],
      exp: 'तराजूमध्ये दोन्ही बाजूंना समान क्रिया करून संतुलन राखणे हे बीजगणितीय समीकरण सोडवण्याचे मूळ तत्त्व मूर्त स्वरूपात शिकवते.',
    },
    hi: {
      q: 'औपचारिक रेखीय समीकरण (`2x + 100 = 400`) से पहले कक्षा 4–5 में तराजू पहेलियाँ (`2 सेब + 100 ग्रा = 400 ग्रा`) क्यों उपयोगी होती हैं?',
      opts: [
        'दोनों पलड़ों से समान भार घटाना या आधा करना प्रत्यक्ष दिखाकर पक्षांतर के पीछे के संतुलन-तर्क को मजबूत बनाता है',
        'क्योंकि प्राथमिक स्तर पर `400` घटाना कठिन है',
        'भिन्नों को ज्यामिति से बदलने के लिए',
        'फलों का चित्र बनाना अनिवार्य होने से',
      ],
      exp: 'तराजू संतुलन का अनुभव यह सिखाता है कि दोनों पक्षों में समान संक्रिया करने से समता बनी रहती है।',
    },
  },
  {
    topic: 'Multiple Cultural Multiplication Methods Grid & Lattice',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'During a Class 5 discussion on `34 × 26`, one student uses Indian/Gelosia lattice multiplication while another uses the box area method `(30+4)(20+6)`. How does honoring valid alternative algorithms benefit learning?',
      opts: [
        'Comparing how different methods organize the exact same four partial products (`600 + 180 + 80 + 24`) deepens place-value insight and celebrates diverse reasoning traditions',
        'It confuses everyone unless only one rigid algorithm is permitted',
        'It wastes time because different algorithms yield different products',
        'Lattice grids only work on prime numbers',
      ],
      exp: 'Seeing all valid algorithms break `34 × 26` into the same partial products builds conceptual connections and mathematical confidence.',
    },
    mr: {
      q: 'इयत्ता पाचवीत `34 × 26` सोडवताना एक विद्यार्थी जालक/लॅटिस (Gelosia) पद्धत वापरतो तर दुसरा चौकट क्षेत्रफळ पद्धत `(30+4)(20+6)` वापरतो. विविध अचूक पद्धतींना मान देण्याचा फायदा काय?',
      opts: [
        'प्रत्येक पद्धतीमध्ये तेच चार आंशिक गुणाकार (`600 + 180 + 80 + 24`) कसे मांडले जातात हे पाहून स्थानिक किमतीची समज खोलवर जाते आणि वैविध्यपूर्ण विचारांचा आदर होतो',
        'वेगवेगळ्या पद्धतींमुळे नेहमी वेगवेगळी उत्तरे येतात',
        'केवळ एकच रीत सक्तीची न केल्यास कोणीच शिकत नाही',
        'जालक पद्धत फक्त मूळ संख्यांवरच चालते',
      ],
      exp: 'विविध वैध मार्गांची तुलना केल्याने सूत्रांपलीकडची समान गणितीय संरचना विद्यार्थ्यांना स्पष्ट दिसते.',
    },
    hi: {
      q: '`34 × 26` हल करते समय एक छात्र जाली (लैटिस) विधि और दूसरा बॉक्स क्षेत्रफल विधि `(30+4)(20+6)` अपनाता है। विविध वैध विधियों को स्वीकारने का क्या लाभ है?',
      opts: [
        'यह देखकर कि दोनों विधियाँ समान चार आंशिक गुणनफलों (`600+180+80+24`) को व्यवस्थित करती हैं, स्थानीय मान की समझ गहरी होती है',
        'अलग विधियों से अलग-अलग उत्तर आते हैं',
        'एक ही कठोर विधि के बिना कक्षा अराजक हो जाती है',
        'जाली विधि केवल अभाज्य संख्याओं के लिए है',
      ],
      exp: 'विभिन्न वैध रणनीतियों की तुलना से यह स्पष्ट होता है कि गणितीय संरचना एक ही है, जिससे लचीला चिंतन बढ़ता है।',
    },
  },
  {
    topic: 'Formative Feedback Commenting On Strategy Before Calculation Slip',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'A Class 5 student sets up a complex 3-step word problem flawlessly (`₹ 450 − 3 × 85`), yet slips on `3 × 85 = 245` instead of `255` on the final line. What formative feedback builds growth best?',
      opts: [
        '"Your 3-step plan and grouping logic (`450 − 3 × 85`) are spot on! Re-check `3 × 80 + 3 × 5` on your final multiplication line."',
        'Write a large `0 / 5` with a red cross across the entire page without notes',
        'Mark it right (`5/5`) without mentioning the `245` arithmetic slip',
        'Ask the child to stop showing solution steps in tests',
      ],
      exp: 'Descriptive feedback separates conceptual problem-setup mastery from minor computational slips, motivating careful self-verification rather than discouragement.',
    },
    mr: {
      q: 'इयत्ता पाचवीच्या विद्यार्थ्याने तीन टप्प्यांचे शाब्दिक उदाहरण अचूक मांडले (`450 − 3 × 85`), पण शेवटी `3 × 85 = 255` ऐवजी चुकून `245` लिहिले. कोणत्या रचनात्मक अभिप्रायाने त्याचा विकास होईल?',
      opts: [
        '"तुझी तिन्ही पावलांची तार्किक मांडणी (`450 − 3 × 85`) अगदी अचूक आहे! फक्त शेवटचा `3 × 80 + 3 × 5` गुणाकार पुन्हा तपासून पहा."',
        'काहीही न लिहिता संपूर्ण पानावर लाल फुली मारून `0/5` देणे',
        'चूक न सांगता पूर्ण `5/5` गुण देणे',
        'पायऱ्या लिहिणे बंद करायला सांगणे',
      ],
      exp: 'विशिष्ट वर्णनात्मक अभिप्राय विद्यार्थ्याचे बरोबर असलेले तार्किक कौशल्य टिकवून फक्त लहान आकडेमोडीची त्रुटी सुधारण्यास प्रोत्साहन देतो.',
    },
    hi: {
      q: 'एक छात्र तीन-चरणीय प्रश्न की समीकरण योजना (`450 − 3 × 85`) बिल्कुल सही बनाता है, पर अंत में `3 × 85 = 255` की जगह `245` लिख देता है। सर्वोत्तम रचनात्मक प्रतिपुष्टि (Feedback) क्या होगी?',
      opts: [
        '"आपकी समस्या-योजना और तार्किक चरण बहुत सटीक हैं! बस अंतिम पंक्ति में `3 × 80 + 3 × 5` का गुणा पुनः जाँचें।"',
        'बिना टिप्पणी किए पूरे पृष्ठ पर बड़ा लाल क्रॉस और `0/5` लिखना',
        'त्रुटि बताए बिना पूरे अंक दे देना',
        'चरण लिखना बंद करवाना',
      ],
      exp: 'रणनीति की सराहना के साथ सटीक सुधार-संकेत देने से छात्र का आत्मविश्वास बना रहता है और आत्म-जाँच की आदत पड़ती है।',
    },
  },
  {
    topic: 'Metric Prefix Staircase Base-10 Unified Understanding',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Why does teaching `kilo–hecto–deca–(metre/gram/litre)–deci–centi–milli` as ONE shared base-10 ladder benefit Class 5 learners more than drilling `kg→g`, `km→m`, and `L→mL` as three unrelated memorization lists?',
      opts: [
        'Pupils realize that `kilo-` ALWAYS means `1,000 ×` and `centi-` ALWAYS means `1/100` across length, mass, and capacity—halving memory load through base-10 structure',
        'Because metric prefixes differ completely between grams and litres',
        'So pupils avoid using decimal points forever',
        'Because `1 km = 100 m` on the unified ladder',
      ],
      exp: 'Seeing the universal base-10 symmetry of metric prefixes (`×10` each step down, `÷10` each step up) unifies measurement with decimal place value.',
    },
    mr: {
      q: '`किलो–हेक्टो–डेका–एकक–डेसी–सेंटी–मिली` ही मापन शिडी लांबी, वजन व धारकता या तिन्हींसाठी एकच आधार-१० रचना म्हणून शिकवण्याचा काय फायदा होतो?',
      opts: [
        '`किलो` म्हणजे नेहमी `1,000 पटीने` आणि `सेंटी` म्हणजे `1/100` हे तिन्ही मापनांत सारखेच असल्याने पाठांतराचा भार कमी होऊन दशमान रचना स्पष्ट होते',
        'कारण ग्रॅम आणि लिटरसाठी उपसर्ग पूर्ण वेगळे असतात',
        'दशांश चिन्ह कायमचे टाळण्यासाठी',
        'कारण या शिडीवर `1 किमी = 100 मी` असते',
      ],
      exp: 'तिन्ही भौतिक मापनांसाठी एकच दशमान-शिडी जोडल्याने एकक रूपांतरण सोपे आणि तर्कसंगत बनते.',
    },
    hi: {
      q: '`किलो–हेक्टो–डेका–(मीटर/ग्राम/लीटर)–डेसी–सेंटी–मिली` को तीन अलग सूचियों के बजाय एक साझा आधार-10 सीढ़ी के रूप में सिखाने का क्या लाभ है?',
      opts: [
        'विद्यार्थी समझ जाते हैं कि लंबाई, भार और धारिता सभी में `किलो` सदैव `1,000×` और `सेंटी` सदैव `1/100` होता है, जिससे रटना घटता है',
        'क्योंकि ग्राम और लीटर के उपसर्ग अलग होते हैं',
        'ताकि दशमलव की आवश्यकता न रहे',
        'क्योंकि `1 किमी = 100 मी` होता है',
      ],
      exp: 'साझा आधार-10 संरचना मापन इकाइयों और दशमलव स्थानीय मान को एक सूत्र में पिरो देती है।',
    },
  },
  {
    topic: 'Elapsed Time Subtraction Error 9:15 Minus 8:50 Base-60',
    pattern: 'Classroom Scenario',
    difficulty: 'Moderate',
    en: {
      q: 'To find the duration from `8:50 a.m.` to `9:15 a.m.`, a Class 4 student writes `915 − 850 = 65 minutes` instead of `25 minutes`. What caused this classic error, and how do you resolve it?',
      opts: [
        'Applying base-10 regrouping (`100`) to a base-60 clock (`1 hour = 60 min`); resolve by bridging to the nearest whole hour on a timeline (`8:50 → 9:00 = 10 min`, plus `15 min = 25 min`)',
        'Misreading morning a.m. as afternoon p.m.',
        'Forgetting `9 − 8 = 1`',
        'Treating minutes as fractions of `24`',
      ],
      exp: 'Bridging across whole hours on a linear timeline avoids erroneous base-10 borrowing (`100` instead of `60`) in elapsed-time calculations.',
    },
    mr: {
      q: 'सकाळी `8:50` ते `9:15` दरम्यानचा वेळ काढताना विद्यार्थी `915 − 850 = 65 मिनिटे` असे चुकीचे उत्तर काढतो (`25 मिनिटे` ऐवजी). या चुकीचे कारण व उपाय काय?',
      opts: [
        'आधार-60 (1 तास = 60 मिनिटे) च्या घड्याळावर आधार-10 (`100`) ची वजाबाकी केल्याने; पूर्ण तासाचा पूल (`8:50 → 9:00 = 10 मि` + `15 मि = 25 मि`) वापरून सोडवणे',
        'सकाळ व संध्याकाळचा गोंधळ होणे',
        '`9 − 8 = 1` विसरणे',
        'तासाचे २४ मिनिटे धरणे',
      ],
      exp: 'पूर्ण तासाच्या टप्प्यांवरून पुढे मोजण्याची "कालरेषा पूल" पद्धती आधार-६० मधील हातच्याच्या चुका टाळते.',
    },
    hi: {
      q: 'सुबह `8:50` से `9:15` के बीच का समय निकालने के लिए एक छात्र `915 − 850 = 65 मिनट` उत्तर लिख देता है (`25 मिनट` के बजाय)। इस त्रुटि का कारण व समाधान क्या है?',
      opts: [
        'आधार-60 (`1 घंटा = 60 मिनट`) समय पर आधार-10 (`100`) घटाव लगाना; समय-रेखा पर पूरे घंटे का सेतु (`8:50 → 9:00 = 10 मि` + `15 मि = 25 मि`) बनाना',
        'a.m. और p.m. भूल जाना',
        '`9 − 8 = 1` की गणना भूल',
        'एक दिन में `60` घंटे मान लेना',
      ],
      exp: 'पूरे घंटे तक गिनकर आगे बढ़ने की सेतु-विधि समय के आधार-60 घटाव की भ्रांति को पूरी तरह रोकती है।',
    },
  },
  {
    topic: 'Spatial Visualization Fold-And-Cut Prediction Symmetry',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Before unfolding a folded square sheet in which a Class 4 student just snipped a triangular notch out of the center fold, why should the teacher ask pupils to PREDICT and sketch the opened pattern first?',
      opts: [
        'Mental prediction prior to unfolding actively exercises spatial visualization and reflection-symmetry transformation rather than passive surprise',
        'Because scissors become dull if sheets are unfolded too quickly',
        'To reduce the number of paper sheets consumed',
        'So pupils never check their sketches against real cutouts',
      ],
      exp: 'Predict → Sketch → Unfold & Verify turns paper-cutting crafts into powerful geometric spatial reasoning.',
    },
    mr: {
      q: 'घडी घातलेल्या चौरस कागदाच्या मध्यभागावर कातरीने त्रिकोणी खाच कापल्यानंतर, कागद उघडण्यापूर्वीच विद्यार्थ्यांना "उघडल्यावर कोणती आकृती दिसेल याचे चित्र काढा" असे का सांगावे?',
      opts: [
        'प्रत्यक्ष उघडण्याआधी मनात प्रतिबिंब-सममितीची कल्पना केल्याने अवकाशीय दृश्यीकरण (Spatial Visualization) कौशल्य सक्रियपणे विकसित होते',
        'कारण कागद लवकर उघडल्यास कात्री बोथट होते',
        'कागदांची संख्या कमी करण्यासाठी',
        'खऱ्या कागदाशी तुलना टाळण्यासाठी',
      ],
      exp: 'अंदाज बांधणे → रेखाचित्र काढणे → प्रत्यक्ष उघडून तपासणे हा क्रम हस्तकलेला सखोल भूमितीय तर्कात बदलतो.',
    },
    hi: {
      q: 'मुड़े हुए कागज़ के बीच में त्रिभुजाकार कटाव लगाने के बाद, कागज़ खोलने से पहले ही बच्चों से आकृति का अनुमान लगाकर चित्र बनवाना क्यों उपयोगी है?',
      opts: [
        'खोलने से पहले मानसिक कल्पना व चित्रण करने से स्थानिक दृश्यात्मकता (Spatial Visualization) और सममिति परिवर्तन का सक्रिय अभ्यास होता है',
        'ताकि कैंची जल्दी खराब न हो',
        'कागज़ बचाने के लिए',
        'ताकि वास्तविक कटाव से मिलान न करना पड़े',
      ],
      exp: 'अनुमान–चित्रण–सत्यापन चक्र कागज़-कटिंग को गंभीर ज्यामितीय चिंतन गतिविधि बना देता है।',
    },
  },
  {
    topic: 'Premature Formula Memorization Area vs Perimeter Swap',
    pattern: 'Pedagogical',
    difficulty: 'Moderate',
    en: {
      q: 'Why do Class 5 learners frequently write "`2 × (l + b)`" when asked for Area, or "`l × b`" when asked for Perimeter?',
      opts: [
        'Formulas were memorized prematurely as abstract letter strings without anchoring Perimeter to walking around the boundary and Area to covering the interior with unit squares',
        'Because `l` and `b` stand for completely unrelated quantities',
        'Because area and perimeter always have the same units',
        'Because rectangles lack parallel sides',
      ],
      exp: 'Experiential grounding ("fencing the boundary vs laying floor tiles") ensures students reconstruct formulas logically rather than guessing letter combinations.',
    },
    mr: {
      q: 'इयत्ता पाचवीचे विद्यार्थी क्षेत्रफळ विचारल्यास "`2 × (लांबी + रुंदी)`" किंवा परिमिती विचारल्यास "`लांबी × रुंदी`" अशी सूत्रांची अदलाबदल का करतात?',
      opts: [
        'बाहेरील कडेला कुंपण (परिमिती) व आतील पृष्ठभागावर फरशा बसवणे (क्षेत्रफळ) या प्रत्यक्ष अनुभवाआधीच केवळ अक्षरांची सूत्रे घोकून घेतल्यामुळे',
        'कारण लांबी आणि रुंदी यांचा काहीच संबंध नसतो',
        'कारण दोन्हींची एकके समान असतात',
        'कारण आयताच्या बाजू समांतर नसतात',
      ],
      exp: 'कुंपणाची लांबी विरुद्ध फरशांची मोजणी हा अर्थ पक्का असल्यास विद्यार्थी स्वतः सूत्र तयार करतात व अदलाबदल टळते.',
    },
    hi: {
      q: 'कक्षा 5 के छात्र अक्सर क्षेत्रफल पूछने पर "`2 × (l + b)`" और परिमाप पूछने पर "`l × b`" क्यों लिख देते हैं?',
      opts: [
        'घेरे की बाड़ (परिमाप) और भीतर की टाइलें बिछाना (क्षेत्रफल) अनुभव किए बिना समय से पहले सूत्र रटवाने के कारण',
        'क्योंकि लंबाई और चौड़ाई असंबद्ध हैं',
        'क्योंकि दोनों की इकाइयाँ समान होती हैं',
        'क्योंकि आयत में समानांतर भुजाएँ नहीं होतीं',
      ],
      exp: 'सीमा पर चलना बनाम वर्ग-टाइलें गिनना इस मूर्त अंतर के बाद सूत्र स्वयं निकलने पर सूत्र-भ्रम कभी नहीं होता।',
    },
  },
  {
    topic: 'Cooperative Jigsaw Exploration Packaging Boxes 3D Nets',
    pattern: 'Pedagogical',
    difficulty: 'Easy',
    en: {
      q: 'Using empty toothpaste cartons, chalk boxes, cylindrical oatmeal tins, and ice-cream cones brought from home, a Class 4 teacher has groups carefully unfold boxes along glued seams. What 3D geometry skill grows through this?',
      opts: [
        'Connecting 3D solids (`cuboid`, `cylinder`, `cone`) dynamically to their flat 2D Nets (`faces`, `edges`, `curved surfaces`) through low-cost local realia',
        'Learning commercial brand advertising slogans',
        'Calculating complex surface integrals formally',
        'Replacing math textbooks with grocery packaging permanently',
      ],
      exp: 'Unfolding everyday packaging into flat nets makes faces, edges, and surface layout tactile at zero cost.',
    },
    mr: {
      q: 'घरातील रिकामी टूथपेस्टची खोकी, खडूचे बॉक्स आणि दंडगोलाकार डबे गटांत उकलून पाहिल्याने इयत्ता चौथीच्या मुलांमध्ये कोणते त्रिमितीय भूमितीय कौशल्य विकसित होते?',
      opts: [
        'कमी खर्चातील दैनंदिन वस्तूंवरून त्रिमितीय घन आकार (`इष्टिकाचिती, दंडगोल, शंकू`) आणि त्यांचे सपाट द्विमितीय जाळे (Nets), पृष्ठे व कडा यांतील नाते समजते',
        'व्यापारी जाहिराती पाठ होतात',
        'उच्च महाविद्यालयीन समाकलन शिकता येते',
        'पाठ्यपुस्तके कायमची बंद होतात',
      ],
      exp: 'तयार खोक्याची घडी उघडून पुन्हा बंद केल्याने घनाकृतीची घडण (Net) आणि पृष्ठांची संख्या सहज स्पष्ट होते.',
    },
    hi: {
      q: 'घर से लाए खाली टूथपेस्ट डिब्बों, चॉक बॉक्स और बेलनाकार टिन को जोड़ों से खोलकर देखने की गतिविधि कक्षा 4 में किस 3D ज्यामिति कौशल को बढ़ाती है?',
      opts: [
        'शून्य लागत वाली वास्तविक सामग्री से 3D ठोस आकारों (`घनाभ, बेलन, शंकु`) और उनके 2D जाल (Nets), फलकों व किनारों का संबंध समझना',
        'व्यावसायिक विज्ञापन के नारे याद करना',
        'कठिन समाकलन गणना करना',
        'पाठ्यपुस्तकों को पूरी तरह हटा देना',
      ],
      exp: 'दैनिक पैकेजिंग डिब्बों को खोलने और मोड़ने से फलक, शीर्ष और जाल (Nets) की समझ अत्यंत जीवंत हो जाती है।',
    },
  },
];
