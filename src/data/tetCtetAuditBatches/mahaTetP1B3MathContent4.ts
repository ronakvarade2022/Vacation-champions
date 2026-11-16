import { CuratedTrilingualMcq } from './types';

// Batch 3 Primary Mathematics Content Part 4 (28 verified trilingual MCQs: Geometry, Perimeter, Area, Volume, Angles, 3D Solids)
export const MAHA_TET_P1_B3_MATH_C4: CuratedTrilingualMcq[] = [
  {
    topic: 'Perimeter Conservation on Corner Cutout',
    pattern: 'Visual Reasoning',
    difficulty: 'Difficult',
    en: {
      q: 'From one corner of a 14 m × 14 m square lawn, a small 4 m × 4 m square flowerbed is carved out. What is the perimeter of the remaining L-shaped lawn?',
      opts: ['56 m', '48 m', '52 m', '40 m'],
      exp: 'Cutting a corner square replaces two outer 4 m segments with two inner 4 m segments, keeping total perimeter unchanged: 4 × 14 = 56 m.',
    },
    mr: {
      q: '१४ मी × १४ मी चौरसाकृती लॉनच्या एका कोपऱ्यातून ४ मी × ४ मी आकाराचा चौरस भाग कापून काढल्यास उरलेल्या L-आकाराच्या लॉनची परिमिती किती असेल?',
      opts: ['५६ मी', '४८ मी', '५२ मी', '४० मी'],
      exp: 'कोपऱ्यातून कापल्यामुळे दोन बाहेरील ४ मी कडांऐवजी तितक्याच लांबीच्या आतील दोन कडा येतात; त्यामुळे परिमिती कायम राहते = ४ × १४ = ५६ मी.',
    },
    hi: {
      q: '14 मी × 14 मी के वर्गाकार लॉन के एक कोने से 4 मी × 4 मी का वर्गाकार हिस्सा काटकर निकाला जाता है। शेष L-आकार के लॉन का परिमाप कितना होगा?',
      opts: ['56 मी', '48 मी', '52 मी', '40 मी'],
      exp: 'कोना काटने से दो बाहरी भुजाओं के बराबर दो भीतरी भुजाएँ जुड़ जाती हैं, अतः परिमाप अपरिवर्तित 4 × 14 = 56 मी रहता है।',
    },
  },
  {
    topic: 'Remaining Area After Corner Cutout',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'From a 14 m square patio, a 5 m by 4 m rectangular corner section is removed for a pond. Find the area of the remaining patio.',
      opts: ['176 sq m', '196 sq m', '156 sq m', '180 sq m'],
      exp: 'Square area = 14 × 14 = 196 sq m. Pond = 5 × 4 = 20 sq m. Remaining = 196 − 20 = 176 sq m.',
    },
    mr: {
      q: '१४ मी बाजू असलेल्या चौरसाकृती अंगणातून ५ मी × ४ मी आकाराचा कोपरा तळ्यासाठी वेगळा काढल्यास उरलेल्या अंगणाचे क्षेत्रफळ किती?',
      opts: ['१७६ चौ.मी.', '१९६ चौ.मी.', '१५६ चौ.मी.', '१८० चौ.मी.'],
      exp: 'चौरस = १४ × १४ = १९६ चौ.मी.; तळे = ५ × ४ = २० चौ.मी.; शिल्लक = १७६ चौ.मी.',
    },
    hi: {
      q: '14 मी भुजा वाले वर्गाकार आँगन से 5 मी × 4 मी का कोना तालाब के लिए हटाने पर शेष आँगन का क्षेत्रफल कितना बचेगा?',
      opts: ['176 वर्ग मी', '196 वर्ग मी', '156 वर्ग मी', '180 वर्ग मी'],
      exp: '14² − (5 × 4) = 196 − 20 = 176 वर्ग मी।',
    },
  },
  {
    topic: 'Multi-Round Rectangular Wire Fencing Cost',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A rectangular vegetable field measures 45 m by 32 m. How much will it cost to put 4 rounds of wire fencing around it at ₹15 per metre?',
      opts: ['₹9,240', '₹4,620', '₹2,310', '₹8,640'],
      exp: 'Perimeter = 2 × (45 + 32) = 154 m. 4 rounds = 616 m. Cost = 616 × ₹15 = ₹9,240.',
    },
    mr: {
      q: '४५ मी लांब व ३२ मी रुंद आयताकृती शेताला ४ पदरी तारेचे कुंपण घालण्यासाठी प्रति मीटर ₹१५ दराने किती खर्च येईल?',
      opts: ['₹९,२४०', '₹४,६२०', '₹२,३१०', '₹८,६४०'],
      exp: 'परिमिती = २ × (४५ + ३२) = १५४ मी. ४ पदर = ६१६ मी. खर्च = ६१६ × १५ = ₹९,२४०.',
    },
    hi: {
      q: '45 मी × 32 मी के आयताकार खेत के चारों ओर 4 चक्कर तार की बाड़ लगाने पर ₹15 प्रति मीटर की दर से कुल कितना खर्च आएगा?',
      opts: ['₹9,240', '₹4,620', '₹2,310', '₹8,640'],
      exp: 'परिमाप = 2(45+32) = 154 मी; 4 चक्कर = 616 मी; खर्च = 616 × 15 = ₹9,240.',
    },
  },
  {
    topic: 'Clock Hands Smaller Angle at 8:20',
    pattern: 'Numerical',
    difficulty: 'Difficult',
    en: {
      q: 'What is the smaller angle formed between the hour hand and minute hand of an accurate clock at 08:20?',
      opts: ['130°', '120°', '140°', '110°'],
      exp: 'Minute hand at 20 min = 120°. Hour hand at 8:20 = 8×30° + (20/60)×30° = 240° + 10° = 250°. Difference = 250° − 120° = 130°.',
    },
    mr: {
      q: 'अचूक चालणाऱ्या घड्याळात ०८:२० वाजता तासकाटा व मिनिटकाटा यांच्यातील लहान कोन किती अंशांचा असतो?',
      opts: ['१३०°', '१२०°', '१४०°', '११०°'],
      exp: 'मिनिटकाटा ४ वर = १२०°; तासकाटा ८ च्या पुढे १०° सरकलेला = २५०°. अंतर = २५०° − १२०° = १३०°.',
    },
    hi: {
      q: 'एक सही घड़ी में 08:20 बजे घंटे और मिनट की सुइयों के बीच बनने वाला छोटा कोण कितने अंश का होता है?',
      opts: ['130°', '120°', '140°', '110°'],
      exp: 'मिनट सुई = 120°; घंटे की सुई = 8×30° + 10° = 250°। अंतर = 250° − 120° = 130°.',
    },
  },
  {
    topic: 'Re-Bending Rectangle Wire Into Square Area',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A wire bent into a rectangle of length 24 cm and breadth 16 cm is straightened and re-bent into a SQUARE. What is the area of the square?',
      opts: ['400 sq cm', '384 sq cm', '160 sq cm', '320 sq cm'],
      exp: 'Perimeter = 2(24 + 16) = 80 cm. Side of square = 80 ÷ 4 = 20 cm. Area = 20 × 20 = 400 sq cm.',
    },
    mr: {
      q: '२४ सेमी लांब व १६ सेमी रुंद आयताच्या आकाराची तार सरळ करून तिचा चौरस तयार केल्यास त्या चौरसाचे क्षेत्रफळ किती होईल?',
      opts: ['४०० चौ.सेमी.', '३८४ चौ.सेमी.', '१६० चौ.सेमी.', '३२० चौ.सेमी.'],
      exp: 'परिमिती = ८० सेमी -> चौरसाची बाजू = २० सेमी -> क्षेत्रफळ = २० × २० = ४०० चौ.सेमी.',
    },
    hi: {
      q: '24 सेमी लंबे और 16 सेमी चौड़े आयत के रूप में मुड़े तार को सीधा कर एक वर्ग बनाया जाता है। इस वर्ग का क्षेत्रफल क्या होगा?',
      opts: ['400 वर्ग सेमी', '384 वर्ग सेमी', '160 वर्ग सेमी', '320 वर्ग सेमी'],
      exp: 'परिमाप = 2(24+16) = 80 सेमी; वर्ग की भुजा = 20 सेमी; क्षेत्रफल = 20 × 20 = 400 वर्ग सेमी।',
    },
  },
  {
    topic: 'Paving Veranda Rectangular Tiles Count',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'How many rectangular tiles measuring 25 cm by 20 cm are needed to pave a classroom veranda measuring 8 m by 5 m?',
      opts: ['800', '400', '1,000', '640'],
      exp: 'Veranda area = 800 cm × 500 cm = 4,00,000 sq cm. One tile = 25 × 20 = 500 sq cm. Tiles = 4,00,000 ÷ 500 = 800.',
    },
    mr: {
      q: '८ मी × ५ मी आकाराच्या व्हरांड्याला २५ सेमी × २० सेमी मापाच्या किती आयताकृती फरश्या बसतील?',
      opts: ['८००', '४००', '१,०००', '६४०'],
      exp: 'व्हरांडा क्षेत्रफळ = ८०० × ५०० = ४,००,००० चौ.सेमी.; एक फरशी = ५०० चौ.सेमी.; संख्या = ८००.',
    },
    hi: {
      q: '8 मी × 5 मी के बरामदे में 25 सेमी × 20 सेमी माप की कितनी आयताकार टाइलें लगेंगी?',
      opts: ['800', '400', '1,000', '640'],
      exp: 'बरामदा क्षेत्रफल = 800 × 500 = 4,00,000 वर्ग सेमी; एक टाइल = 500 वर्ग सेमी; संख्या = 800.',
    },
  },
  {
    topic: 'Triangle Angles in Ratio Difference',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'The three interior angles of a triangle are in the ratio 2 : 3 : 4. What is the difference between the largest and smallest angles?',
      opts: ['40°', '20°', '60°', '80°'],
      exp: 'Sum of parts = 2+3+4 = 9 -> 1 part = 180° ÷ 9 = 20°. Angles are 40°, 60°, 80°. Difference = 80° − 40° = 40°.',
    },
    mr: {
      q: 'एका त्रिकोणाच्या तीन कोनांचे गुणोत्तर २ : ३ : ४ आहे, तर त्यांपैकी सर्वांत मोठ्या व सर्वांत लहान कोनांतील फरक किती?',
      opts: ['४०°', '२०°', '६०°', '८०°'],
      exp: 'कोन = ४०°, ६०°, ८०°. फरक = ८०° − ४०° = ४०°.',
    },
    hi: {
      q: 'एक त्रिभुज के तीनों कोण 2 : 3 : 4 के अनुपात में हैं। सबसे बड़े और सबसे छोटे कोण का अंतर कितना है?',
      opts: ['40°', '20°', '60°', '80°'],
      exp: 'कोण 40°, 60°, 80° हैं; अंतर = 80° − 40° = 40°.',
    },
  },
  {
    topic: 'Isosceles Triangle Equal Side From Perimeter',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'The perimeter of an isosceles triangle is 42 cm and its unequal base measures 12 cm. Find the length of each equal side.',
      opts: ['15 cm', '14 cm', '16 cm', '12 cm'],
      exp: 'Two equal sides = 42 − 12 = 30 cm. One equal side = 30 ÷ 2 = 15 cm.',
    },
    mr: {
      q: 'एका समद्विभुज त्रिकोणाची परिमिती ४२ सेमी व असमान पाया १२ सेमी असल्यास प्रत्येक समान बाजूची लांबी किती?',
      opts: ['१५ सेमी', '१४ सेमी', '१६ सेमी', '१२ सेमी'],
      exp: '(४२ − १२) ÷ २ = ३० ÷ २ = १५ सेमी.',
    },
    hi: {
      q: 'एक समद्विबाहु त्रिभुज का परिमाप 42 सेमी है और उसका असमान आधार 12 सेमी है। प्रत्येक समान भुजा की लंबाई ज्ञात कीजिए।',
      opts: ['15 सेमी', '14 सेमी', '16 सेमी', '12 सेमी'],
      exp: '(42 − 12) ÷ 2 = 15 सेमी।',
    },
  },
  {
    topic: 'Cube Total Edge Sum to Volume',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'The sum of the lengths of ALL 12 edges of a solid cube is 96 cm. What is the volume of this cube?',
      opts: ['512 cu cm', '384 cu cm', '64 cu cm', '729 cu cm'],
      exp: 'One edge = 96 ÷ 12 = 8 cm. Volume = 8 × 8 × 8 = 512 cubic cm.',
    },
    mr: {
      q: 'एका घनाच्या सर्व १२ कडांच्या लांबीची बेरीज ९६ सेमी आहे, तर त्या घनाचे घनफळ किती?',
      opts: ['५१२ घ.सेमी.', '३८४ घ.सेमी.', '६४ घ.सेमी.', '७२९ घ.सेमी.'],
      exp: 'एक कड = ९६ ÷ १२ = ८ सेमी. घनफळ = ८³ = ५१२ घ.सेमी.',
    },
    hi: {
      q: 'एक ठोस घन के सभी 12 किनारों की लंबाइयों का योग 96 सेमी है। इस घन का आयतन क्या होगा?',
      opts: ['512 घन सेमी', '384 घन सेमी', '64 घन सेमी', '729 घन सेमी'],
      exp: 'एक भुजा = 96 ÷ 12 = 8 सेमी। आयतन = 8³ = 512 घन सेमी।',
    },
  },
  {
    topic: 'Cuboidal Aquarium Depth Calculation',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A rectangular glass aquarium has a base of 50 cm by 30 cm and holds exactly 24 litres of water when brimful. What is its inner height?',
      opts: ['16 cm', '15 cm', '18 cm', '12 cm'],
      exp: '24 L = 24,000 cu cm. Height = Volume ÷ Base Area = 24,000 ÷ (50 × 30) = 24,000 ÷ 1,500 = 16 cm.',
    },
    mr: {
      q: 'एका आयताकृती काचेच्या मत्स्यालयाचा तळ ५० सेमी × ३० सेमी असून त्यात काठोकाठ २४ लिटर पाणी मावते, तर त्याची आतील उंची किती?',
      opts: ['१६ सेमी', '१५ सेमी', '१८ सेमी', '१२ सेमी'],
      exp: '२४,००० घ.सेमी. ÷ (५० × ३०) = १६ सेमी.',
    },
    hi: {
      q: 'एक आयताकार मत्स्यालय का आधार 50 सेमी × 30 सेमी है और पूरा भरने पर उसमें 24 लीटर पानी आता है। इसकी भीतरी ऊँचाई कितनी है?',
      opts: ['16 सेमी', '15 सेमी', '18 सेमी', '12 सेमी'],
      exp: '24,000 घन सेमी ÷ (50 × 30) = 16 सेमी।',
    },
  },
  {
    topic: 'Triangular Prism Faces, Edges & Vertices',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'How many Faces (F), Edges (E), and Vertices (V) does a Triangular Prism have?',
      opts: ['F = 5, E = 9, V = 6', 'F = 4, E = 6, V = 4', 'F = 5, E = 8, V = 5', 'F = 6, E = 12, V = 8'],
      exp: 'A triangular prism has 2 triangular bases + 3 rectangular sides = 5 faces, 9 edges, and 6 vertices (F + V − E = 2).',
    },
    mr: {
      q: 'त्रिकोणी चितीला (Triangular Prism) अनुक्रमे किती पृष्ठे (F), कडा (E) व शिरोबिंदू (V) असतात?',
      opts: ['F = ५, E = ९, V = ६', 'F = ४, E = ६, V = ४', 'F = ५, E = ८, V = ५', 'F = ६, E = १२, V = ८'],
      exp: 'त्रिकोणी चितीला २ त्रिकोणी व ३ आयताकृती अशी ५ पृष्ठे, ९ कडा व ६ शिरोबिंदू असतात.',
    },
    hi: {
      q: 'एक त्रिभुजाकार प्रिज्म में क्रमशः कितने फलक (F), किनारे (E) और शीर्ष (V) होते हैं?',
      opts: ['F = 5, E = 9, V = 6', 'F = 4, E = 6, V = 4', 'F = 5, E = 8, V = 5', 'F = 6, E = 12, V = 8'],
      exp: 'त्रिभुजाकार प्रिज्म में 5 फलक, 9 किनारे और 6 शीर्ष होते हैं।',
    },
  },
  {
    topic: 'Square Pyramid Edges Plus Vertices',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'For a square-based pyramid, what is the sum of its number of Edges and number of Vertices?',
      opts: ['13', '12', '10', '14'],
      exp: 'A square pyramid has 5 faces, 8 edges (4 base + 4 slant), and 5 vertices (4 base + 1 apex). Sum = 8 + 5 = 13.',
    },
    mr: {
      q: 'चौरसाकृती सूचिस्तंभाच्या (Square Pyramid) एकूण कडा व एकूण शिरोबिंदू यांची बेरीज किती?',
      opts: ['१३', '१२', '१०', '१४'],
      exp: 'चौरस सूचिस्तंभाला ८ कडा आणि ५ शिरोबिंदू असतात; बेरीज = ८ + ५ = १३.',
    },
    hi: {
      q: 'एक वर्गाकार आधार वाले पिरामिड के किनारों की संख्या और शीर्षों की संख्या का योग कितना है?',
      opts: ['13', '12', '10', '14'],
      exp: 'वर्गाकार पिरामिड में 8 किनारे और 5 शीर्ष होते हैं; योग = 8 + 5 = 13.',
    },
  },
  {
    topic: 'Supplement Equals Three Times Complement',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'If the supplement of an angle is THREE times its complement, what is the measure of the angle?',
      opts: ['45°', '30°', '60°', '50°'],
      exp: '180 − x = 3(90 − x) -> 180 − x = 270 − 3x -> 2x = 90 -> x = 45° (supplement 135° = 3 × 45°).',
    },
    mr: {
      q: 'एका कोनाचा पूरक कोन (Supplement) हा त्याच्या कोटिकोनाच्या (Complement) तिप्पट असल्यास त्या कोनाचे माप किती?',
      opts: ['४५°', '३०°', '६०°', '५०°'],
      exp: '१८० − x = ३(९० − x) -> २x = ९० -> x = ४५°.',
    },
    hi: {
      q: 'यदि किसी कोण का संपूरक कोण उसके पूरक कोण का तीन गुना है, तो उस कोण की माप क्या है?',
      opts: ['45°', '30°', '60°', '50°'],
      exp: '180 − x = 3(90 − x) से 2x = 90, अतः x = 45°.',
    },
  },
  {
    topic: 'Straight Line Linear Angles Variable',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Three adjacent angles lying on one side of a straight line measure (2x + 10)°, 3x°, and (x + 20)°. Find the measure of the SMALLEST angle among the three.',
      opts: ['45°', '25°', '60°', '75°'],
      exp: '(2x+10) + 3x + (x+20) = 180 -> 6x + 30 = 180 -> x = 25. Angles are 60°, 75°, and 45°; smallest = 45°.',
    },
    mr: {
      q: 'एका सरळ रेषेच्या एकाच बाजूला तयार होणारे तीन संलग्न कोन (२x + १०)°, ३x° व (x + २०)° आहेत, तर यांतील सर्वांत लहान कोनाचे माप किती?',
      opts: ['४५°', '२५°', '६०°', '७५°'],
      exp: '६x + ३० = १८० -> x = २५. कोन = ६०°, ७५°, ४५°. लहान कोन = ४५°.',
    },
    hi: {
      q: 'एक सीधी रेखा पर बने तीन आसन्न कोण क्रमशः (2x + 10)°, 3x° और (x + 20)° हैं। इनमें सबसे छोटा कोण कितने अंश का है?',
      opts: ['45°', '25°', '60°', '75°'],
      exp: '6x + 30 = 180 से x = 25; कोण 60°, 75°, 45° हैं। सबसे छोटा = 45°.',
    },
  },
  {
    topic: 'Perimeter of Semicircular Protractor Plate',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Find the total perimeter of a semicircular metal plate of radius 14 cm (including its straight diameter; take π = 22/7).',
      opts: ['72 cm', '44 cm', '58 cm', '88 cm'],
      exp: 'Perimeter of semicircle = πr + 2r = (22/7)×14 + 28 = 44 + 28 = 72 cm.',
    },
    mr: {
      q: '१४ सेमी त्रिज्या असलेल्या अर्धवर्तुळाकार धातूच्या तबकडीची एकूण परिमिती (व्यासासह) किती? (π = २२/७ घ्या)',
      opts: ['७२ सेमी', '४४ सेमी', '५८ सेमी', '८८ सेमी'],
      exp: 'अर्धवर्तुळ परिमिती = πr + २r = ४४ + २८ = ७२ सेमी.',
    },
    hi: {
      q: '14 सेमी त्रिज्या वाली एक अर्धवृत्ताकार धातु की प्लेट का कुल परिमाप (व्यास सहित) ज्ञात कीजिए (π = 22/7 लें)।',
      opts: ['72 सेमी', '44 सेमी', '58 सेमी', '88 सेमी'],
      exp: 'परिमाप = πr + 2r = 44 + 28 = 72 सेमी।',
    },
  },
  {
    topic: 'Quadrilateral Symmetry Lines Property',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Which quadrilateral has BOTH exactly 4 lines of reflection symmetry AND diagonals that bisect each other perpendicularly at 90°?',
      opts: ['Square', 'Rectangle', 'Rhombus', 'Isosceles Trapezium'],
      exp: 'Only the Square combines 4 equal sides + 4 right angles, giving 4 symmetry axes and perpendicular equal diagonals.',
    },
    mr: {
      q: 'कोणत्या चौकोनाला बरोबर ४ सममिती अक्ष असतात आणि त्याचे कर्ण परस्परांना ९०° मध्ये दुभागतात?',
      opts: ['चौरस', 'आयत', 'समभुज चौकोन', 'समद्विभुज समलंब चौकोन'],
      exp: 'फक्त चौरसाला ४ सममिती अक्ष असतात व त्याचे कर्ण परस्परांचे लंबदुभाजक असतात.',
    },
    hi: {
      q: 'किस चतुर्भुज में ठीक 4 सममिति अक्ष होते हैं और उसके विकर्ण परस्पर 90° पर समद्विभाजित करते हैं?',
      opts: ['वर्ग', 'आयत', 'समचतुर्भुज', 'समद्विबाहु समलंब'],
      exp: 'केवल वर्ग में 4 सममिति रेखाएँ और परस्पर लंबवत समद्विभाजक विकर्ण दोनों गुण होते हैं।',
    },
  },
  {
    topic: 'Area of Right-Angled Triangle',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'In a right-angled triangle, the two perpendicular sides measure 12 cm and 15 cm. Find its area.',
      opts: ['90 sq cm', '180 sq cm', '45 sq cm', '75 sq cm'],
      exp: 'Area = (1/2) × base × height = (1/2) × 12 × 15 = 90 sq cm.',
    },
    mr: {
      q: 'एका काटकोन त्रिकोणाच्या काटकोन करणाऱ्या बाजू १२ सेमी व १५ सेमी आहेत, तर त्या त्रिकोणाचे क्षेत्रफळ किती?',
      opts: ['९० चौ.सेमी.', '१८० चौ.सेमी.', '४५ चौ.सेमी.', '७५ चौ.सेमी.'],
      exp: 'क्षेत्रफळ = (१/२) × १२ × १५ = ९० चौ.सेमी.',
    },
    hi: {
      q: 'एक समकोण त्रिभुज की समकोण बनाने वाली भुजाएँ 12 सेमी और 15 सेमी हैं। इसका क्षेत्रफल ज्ञात कीजिए।',
      opts: ['90 वर्ग सेमी', '180 वर्ग सेमी', '45 वर्ग सेमी', '75 वर्ग सेमी'],
      exp: 'क्षेत्रफल = (1/2) × 12 × 15 = 90 वर्ग सेमी।',
    },
  },
  {
    topic: 'Packing Small Cubes Into Rectangular Carton',
    pattern: 'Word Problem',
    difficulty: 'Easy',
    en: {
      q: 'How many wooden cubes of side 3 cm can fit completely inside an open carton whose inner dimensions are 18 cm × 12 cm × 9 cm?',
      opts: ['72', '64', '81', '54'],
      exp: '(18 ÷ 3) × (12 ÷ 3) × (9 ÷ 3) = 6 × 4 × 3 = 72 cubes.',
    },
    mr: {
      q: '१८ सेमी × १२ सेमी × ९ सेमी आतील मापाच्या खोक्यात ३ सेमी बाजू असलेले किती लाकडी घन पूर्णपणे मावतील?',
      opts: ['७२', '६४', '८१', '५४'],
      exp: '(१८÷३) × (१२÷३) × (९÷३) = ६ × ४ × ३ = ७२ घन.',
    },
    hi: {
      q: '18 सेमी × 12 सेमी × 9 सेमी भीतरी माप वाले डिब्बे में 3 सेमी भुजा वाले कितने लकड़ी के घन ठीक समा सकते हैं?',
      opts: ['72', '64', '81', '54'],
      exp: '(18÷3) × (12÷3) × (9÷3) = 6 × 4 × 3 = 72 घन।',
    },
  },
  {
    topic: 'Square Side Tripled Area Scaling',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'If every side of a square garden is TRIPLED in length, its new area becomes how many times the original area?',
      opts: ['9 times', '3 times', '6 times', '12 times'],
      exp: '(3s)² = 9s², so tripling the side multiplies area by 3 × 3 = 9 times.',
    },
    mr: {
      q: 'जर एका चौरसाकृती बागेची प्रत्येक बाजू तिप्पट केली, तर तिचे नवीन क्षेत्रफळ मूळ क्षेत्रफळाच्या किती पट होईल?',
      opts: ['९ पट', '३ पट', '६ पट', '१२ पट'],
      exp: '(३ × बाजू)² = ९ × मूळ क्षेत्रफळ.',
    },
    hi: {
      q: 'यदि एक वर्गाकार बगीचे की प्रत्येक भुजा तीन गुनी कर दी जाए, तो नया क्षेत्रफल मूल क्षेत्रफल का कितना गुना हो जाएगा?',
      opts: ['9 गुना', '3 गुना', '6 गुना', '12 गुना'],
      exp: '(3s)² = 9s², अतः क्षेत्रफल 9 गुना हो जाएगा।',
    },
  },
  {
    topic: 'Uniform Margin Border Area Around Photo',
    pattern: 'Word Problem',
    difficulty: 'Moderate',
    en: {
      q: 'A 20 cm × 14 cm photograph is mounted on a cardboard backing leaving a uniform 2 cm wide border all around it. Find the area of the visible border alone.',
      opts: ['152 sq cm', '136 sq cm', '280 sq cm', '432 sq cm'],
      exp: 'Outer dimensions = (20+4) × (14+4) = 24 × 18 = 432 sq cm. Photo = 20 × 14 = 280 sq cm. Border = 432 − 280 = 152 sq cm.',
    },
    mr: {
      q: '२० सेमी × १४ सेमी आकाराचे छायाचित्र एका पुठ्ठ्यावर चिटकवल्यानंतर सर्व बाजूंनी समान २ सेमी रुंदीची किनार मोकळी राहिली, तर फक्त त्या मोकळ्या किनारीचे क्षेत्रफळ किती?',
      opts: ['१५२ चौ.सेमी.', '१३६ चौ.सेमी.', '२८० चौ.सेमी.', '४३२ चौ.सेमी.'],
      exp: 'बाह्य माप = २४ × १८ = ४३२ चौ.सेमी.; छायाचित्र = २८० चौ.सेमी.; किनार = ४३२ − २८० = १५२ चौ.सेमी.',
    },
    hi: {
      q: '20 सेमी × 14 सेमी का एक फ़ोटो गत्ते पर चिपकाने के बाद चारों ओर एक समान 2 सेमी चौड़ा हाशिया बचता है। केवल हाशिये का क्षेत्रफल ज्ञात कीजिए।',
      opts: ['152 वर्ग सेमी', '136 वर्ग सेमी', '280 वर्ग सेमी', '432 वर्ग सेमी'],
      exp: 'बाहरी क्षेत्रफल = 24 × 18 = 432 वर्ग सेमी; फ़ोटो = 280 वर्ग सेमी; हाशिया = 152 वर्ग सेमी।',
    },
  },
  {
    topic: 'Compass Turn Clockwise Angle',
    pattern: 'Visual Reasoning',
    difficulty: 'Easy',
    en: {
      q: 'Priya is standing facing North-East. She turns 135° CLOCKWISE. Which compass direction is she facing now?',
      opts: ['South', 'South-East', 'South-West', 'East'],
      exp: '45° clockwise from North-East reaches East; another 90° clockwise reaches South (45° + 90° = 135°).',
    },
    mr: {
      q: 'प्रिया ईशान्य (North-East) दिशेकडे तोंड करून उभी आहे. ती घड्याळाच्या काट्याच्या दिशेने १३५° फिरल्यास आता तिचे तोंड कोणत्या दिशेकडे असेल?',
      opts: ['दक्षिण', 'आग्नेय', 'नैऋत्य', 'पूर्व'],
      exp: 'ईशान्य पासून ४५° घड्याळाप्रमाणे पूर्व आणि पुढचे ९०° दक्षिण (एकूण १३५°).',
    },
    hi: {
      q: 'प्रिया उत्तर-पूर्व की ओर मुँह करके खड़ी है। वह घड़ी की सुई की दिशा (दक्षिणावर्त) में 135° घूमती है। अब उसका मुँह किस दिशा में है?',
      opts: ['दक्षिण', 'दक्षिण-पूर्व', 'दक्षिण-पश्चिम', 'पूर्व'],
      exp: 'उत्तर-पूर्व से 45° पर पूर्व तथा आगे 90° पर दक्षिण (कुल 135°)।',
    },
  },
  {
    topic: 'Standard Die Rolling Spatial Logic',
    pattern: 'Visual Reasoning',
    difficulty: 'Moderate',
    en: {
      q: 'On a standard cubical die where opposite faces always add up to 7, suppose 2 is on the TOP face and 3 faces toward you. If you roll the die forward ONCE toward yourself so 2 moves onto the front face, which number appears on TOP?',
      opts: ['4', '5', '1', '6'],
      exp: 'Since 3 is in front, its opposite face 7 − 3 = 4 is at the back. Rolling forward moves top (2) to front and back (4) up to the top.',
    },
    mr: {
      q: 'समोरासमोरील पृष्ठांची बेरीज नेहमी ७ असलेल्या नेहमीच्या फाशावर वरच्या बाजूला २ आणि तुमच्या समोर ३ आहे. फासा तुमच्याकडे एकदाच पुढे घरंगळवला असता वरच्या पृष्ठावर कोणता अंक येईल?',
      opts: ['४', '५', '१', '६'],
      exp: 'समोर ३ असल्याने मागच्या पृष्ठावर ४ आहे. फासा पुढे फिरवल्यास मागचा ४ वरच्या पृष्ठावर येतो.',
    },
    hi: {
      q: 'एक मानक पासे पर विपरीत फलकों का योग हमेशा 7 होता है। यदि ऊपर 2 है और आपकी ओर सामने 3 है, तथा आप पासे को एक बार आगे अपनी ओर लुढ़काते हैं, तो ऊपर कौन-सा अंक आएगा?',
      opts: ['4', '5', '1', '6'],
      exp: 'सामने 3 होने से पीछे 7 − 3 = 4 होगा। आगे लुढ़काने पर पीछे वाला 4 ऊपर आ जाता है।',
    },
  },
  {
    topic: 'Diagonal of Rectangle Using Right Triangle',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'A rectangular school stage measures 15 m long and 8 m wide. What is the length of the straight diagonal wire stretched from one corner to the opposite corner?',
      opts: ['17 m', '23 m', '19 m', '16 m'],
      exp: 'Diagonal = √(15² + 8²) = √(225 + 64) = √289 = 17 m.',
    },
    mr: {
      q: '१५ मी लांब व ८ मी रुंद आयताकृती रंगमंचाच्या एका कोपऱ्यातून समोरील कोपऱ्यापर्यंत ताणलेल्या कर्णाच्या तारेची लांबी किती?',
      opts: ['१७ मी', '२३ मी', '१९ मी', '१६ मी'],
      exp: 'कर्ण = √(१५² + ८²) = √(२२५ + ६४) = √२८९ = १७ मी.',
    },
    hi: {
      q: '15 मी लंबे और 8 मी चौड़े आयताकार मंच के एक कोने से विपरीत कोने तक खींचे गए विकर्ण तार की लंबाई क्या होगी?',
      opts: ['17 मी', '23 मी', '19 मी', '16 मी'],
      exp: 'विकर्ण = √(15² + 8²) = √289 = 17 मी।',
    },
  },
  {
    topic: 'Area of Rhombus From Diagonals',
    pattern: 'Numerical',
    difficulty: 'Easy',
    en: {
      q: 'The diagonals of a rhombus-shaped rangoli design measure 16 cm and 12 cm. Find its area.',
      opts: ['96 sq cm', '192 sq cm', '48 sq cm', '84 sq cm'],
      exp: 'Area of rhombus = (1/2) × d₁ × d₂ = (1/2) × 16 × 12 = 96 sq cm.',
    },
    mr: {
      q: 'एका समभुज चौकोनाकृती रांगोळीच्या कर्णांची लांबी १६ सेमी व १२ सेमी आहे, तर तिचे क्षेत्रफळ किती?',
      opts: ['९६ चौ.सेमी.', '१९२ चौ.सेमी.', '४८ चौ.सेमी.', '८४ चौ.सेमी.'],
      exp: 'क्षेत्रफळ = (१/२) × १६ × १२ = ९६ चौ.सेमी.',
    },
    hi: {
      q: 'एक समचतुर्भुज आकार की रंगोली के विकर्ण 16 सेमी और 12 सेमी हैं। इसका क्षेत्रफल ज्ञात कीजिए।',
      opts: ['96 वर्ग सेमी', '192 वर्ग सेमी', '48 वर्ग सेमी', '84 वर्ग सेमी'],
      exp: 'क्षेत्रफल = (1/2) × 16 × 12 = 96 वर्ग सेमी।',
    },
  },
  {
    topic: 'Counting All Triangles in Crossed Rectangle',
    pattern: 'Visual Reasoning',
    difficulty: 'Easy',
    en: {
      q: 'Both diagonals of a rectangle are drawn so they cross at center O. How many triangles IN TOTAL can be counted in this figure?',
      opts: ['8', '4', '6', '10'],
      exp: 'There are 4 single small triangles formed around center O plus 4 larger right triangles formed by combining adjacent pairs = 8 triangles.',
    },
    mr: {
      q: 'एका आयताचे दोन्ही कर्ण काढले असता ते केंद्र O मध्ये छेदतात, तर या आकृतीत एकूण किती त्रिकोण तयार होतात?',
      opts: ['८', '४', '६', '१०'],
      exp: 'आतील ४ लहान त्रिकोण + दोन त्रिकोण एकत्र करून तयार होणारे ४ मोठे काटकोन त्रिकोण = एकूण ८ त्रिकोण.',
    },
    hi: {
      q: 'एक आयत के दोनों विकर्ण खींचने पर वे केंद्र O पर काटते हैं। इस आकृति में कुल कितने त्रिभुज बनते हैं?',
      opts: ['8', '4', '6', '10'],
      exp: '4 छोटे त्रिभुज + दो-दो को मिलाकर बनने वाले 4 बड़े समकोण त्रिभुज = कुल 8 त्रिभुज।',
    },
  },
  {
    topic: 'Uncovered Area Around Twin Circles in Rectangle',
    pattern: 'Numerical',
    difficulty: 'Difficult',
    en: {
      q: 'Two identical circles sit side by side touching the edges inside a 28 cm × 14 cm rectangular sheet (each circle has radius 7 cm). Using π = 22/7, find the UNCOVERED area left on the sheet.',
      opts: ['84 sq cm', '308 sq cm', '154 sq cm', '92 sq cm'],
      exp: 'Rectangle = 28 × 14 = 392 sq cm. Two circles = 2 × (22/7) × 7² = 308 sq cm. Uncovered = 392 − 308 = 84 sq cm.',
    },
    mr: {
      q: '२८ सेमी × १४ सेमी आयताकृती कागदावर प्रत्येकी ७ सेमी त्रिज्येची दोन समान वर्तुळे शेजारी शेजारी कडांना स्पर्श करून काढली आहेत, तर वर्तुळांबाहेरील मोकळ्या भागाचे क्षेत्रफळ किती? (π = २२/७)',
      opts: ['८४ चौ.सेमी.', '३०८ चौ.सेमी.', '१५४ चौ.सेमी.', '९२ चौ.सेमी.'],
      exp: 'आयत = २८ × १४ = ३९२ चौ.सेमी.; दोन वर्तुळे = २ × १५४ = ३०८ चौ.सेमी.; मोकळा भाग = ३९२ − ३०८ = ८४ चौ.सेमी.',
    },
    hi: {
      q: '28 सेमी × 14 सेमी की आयताकार शीट में 7 सेमी त्रिज्या वाले दो समान वृत्त एक-दूसरे व किनारों को छूते हुए बनाए गए हैं। बिना ढके शेष भाग का क्षेत्रफल क्या है (π = 22/7)?',
      opts: ['84 वर्ग सेमी', '308 वर्ग सेमी', '154 वर्ग सेमी', '92 वर्ग सेमी'],
      exp: 'आयत = 392 वर्ग सेमी; दो वृत्त = 2 × 154 = 308 वर्ग सेमी; शेष भाग = 392 − 308 = 84 वर्ग सेमी।',
    },
  },
  {
    topic: 'Pentagon Fifth Interior Angle',
    pattern: 'Numerical',
    difficulty: 'Moderate',
    en: {
      q: 'Four interior angles of a pentagon measure 110°, 95°, 120°, and 105°. What is the measure of the fifth angle?',
      opts: ['110°', '100°', '115°', '120°'],
      exp: 'Sum of interior angles of pentagon = (5 − 2) × 180° = 540°. Fifth angle = 540° − (110 + 95 + 120 + 105)° = 540° − 430° = 110°.',
    },
    mr: {
      q: 'एका पंचकोनाचे चार कोन अनुक्रमे ११०°, ९५°, १२०° व १०५° आहेत, तर पाचव्या कोनाचे माप किती?',
      opts: ['११०°', '१००°', '११५°', '१२०°'],
      exp: 'पंचकोनाच्या कोनांची बेरीज = ५४०°. पाचवा कोन = ५४०° − ४३०° = ११०°.',
    },
    hi: {
      q: 'एक पंचभुज के चार अंतःकोण क्रमशः 110°, 95°, 120° और 105° हैं। पाँचवें कोण की माप क्या है?',
      opts: ['110°', '100°', '115°', '120°'],
      exp: 'पंचभुज के कोणों का योग = 540°; पाँचवाँ कोण = 540° − 430° = 110°.',
    },
  },
  {
    topic: 'Perimeter of Rhombus From Diagonals',
    pattern: 'Numerical',
    difficulty: 'Difficult',
    en: {
      q: 'The diagonals of a rhombus measure 12 cm and 16 cm. What is the perimeter of the rhombus?',
      opts: ['40 cm', '56 cm', '28 cm', '48 cm'],
      exp: 'Half-diagonals are 6 cm and 8 cm meeting at 90°. Side = √(6² + 8²) = √100 = 10 cm. Perimeter = 4 × 10 = 40 cm.',
    },
    mr: {
      q: 'एका समभुज चौकोनाचे कर्ण १२ सेमी व १६ सेमी असल्यास त्याची परिमिती किती?',
      opts: ['४० सेमी', '५६ सेमी', '२८ सेमी', '४८ सेमी'],
      exp: 'अर्धकर्ण ६ सेमी व ८ सेमी काटकोनात छेदतात; बाजू = √(३६+६४) = १० सेमी. परिमिती = ४ × १० = ४० सेमी.',
    },
    hi: {
      q: 'एक समचतुर्भुज के विकर्ण 12 सेमी और 16 सेमी हैं। इसका परिमाप क्या होगा?',
      opts: ['40 सेमी', '56 सेमी', '28 सेमी', '48 सेमी'],
      exp: 'आधे विकर्ण 6 सेमी और 8 सेमी हैं, अतः भुजा = √(6²+8²) = 10 सेमी; परिमाप = 4 × 10 = 40 सेमी।',
    },
  },
];
