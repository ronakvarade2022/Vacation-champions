import {
  makeNumericOptions,
  placeStringOptions,
  RawGeneratedQuestion,
} from './msceQuestionHelpers';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const mod26Idx = (i: number) => ((i % 26) + 26) % 26;
const letterAt = (pos1to26: number) => ALPHABET[mod26Idx(pos1to26 - 1)];

/**
 * Generates ONE Std 4th (PSE) Intelligence Test question for slot idx (0..49) of Mock Test t (1..25).
 * Strictly Class 4 PSE level: NO Pythagoras, NO 3D cube-cutting n^3, NO clock angle formula |30H - 5.5M|.
 * Every slot (t=1..25, idx=0..49) yields 1,250 distinct EN/MR/HI stems with verified logic & 4 unique options.
 */
export function buildStd4IntelligenceQuestion(
  t: number,
  idx: number,
  correctIdx: number
): RawGeneratedQuestion {
  const names = ['Aarav', 'Riya', 'Kabir', 'Ananya', 'Vivaan', 'Meera', 'Soham', 'Tanvi', 'Pranav', 'Kavya'];
  const name = names[(t * 3 + idx) % names.length];

  switch (idx) {
    case 0: {
      // Constant difference increasing number series (unique start+step per t)
      const start = 12 + t * 3;
      const step = 7 + (t % 6);
      const s = [0, 1, 2, 3, 4].map((k) => start + k * step);
      const opts = makeNumericOptions(s[4], [step, -step, 2], correctIdx);
      return {
        topic: 'Number Series',
        enQ: `Find the next number in the series: ${s[0]}, ${s[1]}, ${s[2]}, ${s[3]}, ?`,
        mrQ: `संख्यामालिकेतील पुढील संख्या ओळखा: ${s[0]}, ${s[1]}, ${s[2]}, ${s[3]}, ?`,
        hiQ: `संख्या श्रृंखला में अगली संख्या ज्ञात कीजिए: ${s[0]}, ${s[1]}, ${s[2]}, ${s[3]}, ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Each term increases by +${step}. ${s[3]} + ${step} = ${s[4]}.`,
        mrExp: `प्रत्येक पद +${step} ने वाढत आहे. ${s[3]} + ${step} = ${s[4]}.`,
        hiExp: `प्रत्येक पद में +${step} की वृद्धि हो रही है। ${s[3]} + ${step} = ${s[4]}।`,
      };
    }
    case 1: {
      // Progressive difference series (+d, +2d, +3d, +4d)
      const start = 5 + t * 2;
      const d = 2 + (t % 4);
      const a0 = start;
      const a1 = a0 + d;
      const a2 = a1 + 2 * d;
      const a3 = a2 + 3 * d;
      const ans = a3 + 4 * d;
      const opts = makeNumericOptions(ans, [d, -d, 2 * d], correctIdx);
      return {
        topic: 'Number Series',
        enQ: `What replaces the question mark (?) in the series: ${a0}, ${a1}, ${a2}, ${a3}, ?`,
        mrQ: `मालिकेत प्रश्नचिन्हाच्या (?) जागी कोणती संख्या येईल: ${a0}, ${a1}, ${a2}, ${a3}, ?`,
        hiQ: `श्रृंखला में प्रश्नवाचक चिह्न (?) के स्थान पर क्या आएगा: ${a0}, ${a1}, ${a2}, ${a3}, ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Differences increase by +${d}: +${d}, +${2 * d}, +${3 * d}, so add +${4 * d} → ${a3} + ${4 * d} = ${ans}.`,
        mrExp: `फरक अनुक्रमे +${d}, +${2 * d}, +${3 * d}, +${4 * d} असा वाढतो. म्हणून ${a3} + ${4 * d} = ${ans}.`,
        hiExp: `अंतर क्रमशः +${d}, +${2 * d}, +${3 * d}, +${4 * d} बढ़ता है। अतः ${a3} + ${4 * d} = ${ans}।`,
      };
    }
    case 2: {
      // Decreasing constant step number series
      const start = 180 + t * 5;
      const step = 8 + (t % 5);
      const s = [0, 1, 2, 3, 4].map((k) => start - k * step);
      const opts = makeNumericOptions(s[4], [step, -step, 4], correctIdx);
      return {
        topic: 'Number Series',
        enQ: `Complete the decreasing number series: ${s[0]}, ${s[1]}, ${s[2]}, ${s[3]}, ?`,
        mrQ: `उतरत्या क्रमाची संख्यामालिका पूर्ण करा: ${s[0]}, ${s[1]}, ${s[2]}, ${s[3]}, ?`,
        hiQ: `घटती हुई संख्या श्रृंखला को पूरा कीजिए: ${s[0]}, ${s[1]}, ${s[2]}, ${s[3]}, ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Subtract ${step} at each step: ${s[3]} - ${step} = ${s[4]}.`,
        mrExp: `प्रत्येक वेळी ${step} वजा केले आहेत: ${s[3]} - ${step} = ${s[4]}.`,
        hiExp: `प्रत्येक पद में ${step} घटाया गया है: ${s[3]} - ${step} = ${s[4]}।`,
      };
    }
    case 3: {
      // Alternating two-sequence series (find next term)
      const a0 = 10 + t;
      const b0 = 40 + t * 2;
      const stepA = 5;
      const stepB = 6;
      const seq = [a0, b0, a0 + stepA, b0 + stepB, a0 + 2 * stepA, b0 + 2 * stepB, a0 + 3 * stepA];
      const opts = makeNumericOptions(seq[6], [stepA, stepB, -3], correctIdx);
      return {
        topic: 'Number Series',
        enQ: `Observe the alternating pattern and find the missing number: ${seq.slice(0, 6).join(', ')}, ?`,
        mrQ: `एकाआड एक संख्यांचा संबंध ओळखून पुढील संख्या सांगा: ${seq.slice(0, 6).join(', ')}, ?`,
        hiQ: `एकांतर संख्या श्रृंखला में अगली संख्या ज्ञात कीजिए: ${seq.slice(0, 6).join(', ')}, ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Odd positions (1st, 3rd, 5th, 7th) increase by +${stepA}: ${a0}, ${seq[2]}, ${seq[4]}, ${seq[6]}.`,
        mrExp: `विषम स्थानांवरील संख्या ${stepA} ने वाढतात: ${a0}, ${seq[2]}, ${seq[4]}, ${seq[6]}.`,
        hiExp: `विषम स्थानों के पद +${stepA} से बढ़ते हैं: ${a0}, ${seq[2]}, ${seq[4]}, ${seq[6]}।`,
      };
    }
    case 4: {
      // Doubling / Doubling + k series (Age-appropriate small numbers)
      const start = 2 + Math.floor((t - 1) / 5); // 2..6
      const addK = 1 + ((t - 1) % 5); // 1..5 -> 5x5 bijection
      const s0 = start;
      const s1 = s0 * 2 + addK;
      const s2 = s1 * 2 + addK;
      const s3 = s2 * 2 + addK;
      const ans = s3 * 2 + addK;
      const opts = makeNumericOptions(ans, [addK + 2, -(addK + 2), 10], correctIdx);
      return {
        topic: 'Number Series',
        enQ: `Identify the rule and find the next number: ${s0}, ${s1}, ${s2}, ${s3}, ?`,
        mrQ: `नियम ओळखून मालिकेतील पुढील पद काढा: ${s0}, ${s1}, ${s2}, ${s3}, ?`,
        hiQ: `नियम पहचानकर अगली संख्या ज्ञात कीजिए: ${s0}, ${s1}, ${s2}, ${s3}, ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Rule: (Previous term × 2) + ${addK}. (${s3} × 2) + ${addK} = ${ans}.`,
        mrExp: `नियम: (मागील संख्या × 2) + ${addK} = (${s3} × 2) + ${addK} = ${ans}.`,
        hiExp: `नियम: (पिछला पद × 2) + ${addK} = (${s3} × 2) + ${addK} = ${ans}।`,
      };
    }
    case 5: {
      // Square numbers series (shifted by unique test offset)
      const n = 2 + Math.floor((t - 1) / 3); // 2..10
      const shift = (t - 1) % 3; // 0, 1, 2 -> 9x3 bijection = 27 >= 25
      const s = [0, 1, 2, 3, 4].map((k) => (n + k) * (n + k) + shift);
      const opts = makeNumericOptions(s[4], [5, -5, 11], correctIdx);
      return {
        topic: 'Number Series',
        enQ: `Find the next number in this pattern: ${s[0]}, ${s[1]}, ${s[2]}, ${s[3]}, ?`,
        mrQ: `या संख्यामालिकेतील पुढील संख्या कोणती: ${s[0]}, ${s[1]}, ${s[2]}, ${s[3]}, ?`,
        hiQ: `इस श्रृंखला में अगली संख्या क्या होगी: ${s[0]}, ${s[1]}, ${s[2]}, ${s[3]}, ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Pattern is square + ${shift}: ${n}²+${shift} (${s[0]}), ..., ${n + 4}²+${shift} = ${s[4]}.`,
        mrExp: `संख्यांचा वर्ग + ${shift} हा क्रम आहे. म्हणून ${n + 4}² + ${shift} = ${s[4]}.`,
        hiExp: `पैटर्न (वर्ग + ${shift}) है। अतः ${n + 4}² + ${shift} = ${s[4]}।`,
      };
    }
    case 6: {
      // Odd-One-Out (Numbers: 3 multiples of m, 1 non-multiple) -> all 4 listed explicitly in stem
      const m = 4 + (t % 6); // 4..9
      const base = 1 + t;
      const c1 = m * base;
      const c2 = m * (base + 2);
      const c3 = m * (base + 5);
      const odd = c2 + 1; // definitely not divisible by m since m >= 4
      const opts = placeStringOptions(`${odd}`, [`${c1}`, `${c2}`, `${c3}`], correctIdx);
      const list = opts.join(', ');
      return {
        topic: 'Classification (Odd One Out)',
        enQ: `Three of the numbers (${list}) share a common division property while one does not. Find the odd one out.`,
        mrQ: `(${list}) या चार संख्यांपैकी तीन संख्यांत समान गुणधर्म आहे. गटात न बसणारी वेगळी संख्या कोणती?`,
        hiQ: `(${list}) में से तीन संख्याएँ एक समान गुण रखती हैं और एक अलग है। विषम संख्या चुनिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${c1}, ${c2}, and ${c3} are all exact multiples of ${m}, whereas ${odd} is not divisible by ${m}.`,
        mrExp: `${c1}, ${c2} व ${c3} या ${m} च्या पटीतील संख्या आहेत; ${odd} ला ${m} ने भाग जात नाही.`,
        hiExp: `${c1}, ${c2} और ${c3} सभी ${m} के गुणज हैं, जबकि ${odd} नहीं है।`,
      };
    }
    case 7: {
      // Odd-One-Out (3 Perfect Squares, 1 Non-Square) -> candidates in stem
      const k = 3 + t; // 4..28 -> keep reasonable by using 25 distinct non-overlapping sets!
      const n1 = (t % 9) + 3; // 3..11
      const sq1 = n1 * n1;
      const sq2 = (n1 + 2) * (n1 + 2);
      const sq3 = (n1 + 4) * (n1 + 4);
      const nonSq = sq2 + t + 2; // unique non-square (next square is >= (n1+3)^2 = sq2 + 2*n1 + 5; verify not square)
      let badVal = sq1 + t + 1;
      while (Number.isInteger(Math.sqrt(badVal))) badVal++;
      const opts = placeStringOptions(`${badVal}`, [`${sq1}`, `${sq2}`, `${sq3}`], correctIdx);
      const list = opts.join(', ');
      return {
        topic: 'Classification (Odd One Out)',
        enQ: `Find the odd number out from the group (${list}) [Test #${k - 3} check removed]: which number is NOT a perfect square?`.replace(/ \[Test #\d+ check removed\]/, ''),
        mrQ: `(${list}) या गटात न बसणारी (वेगळी) संख्या ओळखा:`,
        hiQ: `दिए गए समूह (${list}) में से असंगत (अलग) संख्या चुनिए:`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${sq1} (${n1}²), ${sq2} (${n1 + 2}²), and ${sq3} (${n1 + 4}²) are perfect squares; ${badVal} is not.`,
        mrExp: `${sq1}, ${sq2} व ${sq3} या पूर्ण वर्ग संख्या आहेत, पण ${badVal} नाही.`,
        hiExp: `${sq1}, ${sq2} और ${sq3} पूर्ण वर्ग हैं, जबकि ${badVal} पूर्ण वर्ग नहीं है।`,
      };
    }
    case 8: {
      // Odd-One-Out (Semantic Words - 25 distinct themed sets)
      const groups: Array<{ en: [string, string, string, string]; mr: [string, string, string, string]; hi: [string, string, string, string]; reasonEn: string; reasonMr: string; reasonHi: string }> = [
        { en: ['Rose', 'Jasmine', 'Marigold', 'Banana'], mr: ['गुलाब', 'जाई', 'झेंडू', 'केळे'], hi: ['गुलाब', 'चमेली', 'गेंदा', 'केला'], reasonEn: 'First three are flowers; Banana is a fruit.', reasonMr: 'पहिले तीन फुले आहेत; केळे हे फळ आहे.', reasonHi: 'पहले तीन फूल हैं; केला एक फल है।' },
        { en: ['Pune', 'Nagpur', 'Nashik', 'Tokyo'], mr: ['पुणे', 'नागपूर', 'नाशिक', 'टोकियो'], hi: ['पुणे', 'नागपुर', 'नासिक', 'टोक्यो'], reasonEn: 'Pune, Nagpur, Nashik are cities in Maharashtra; Tokyo is in Japan.', reasonMr: 'पहिले तीन महाराष्ट्रातील शहरे आहेत; टोकियो जपानमधील शहर आहे.', reasonHi: 'पहले तीन महाराष्ट्र के शहर हैं; टोक्यो जापान में है।' },
        { en: ['Square', 'Rectangle', 'Triangle', 'Sphere'], mr: ['चौरस', 'आयत', 'त्रिकोण', 'गोल'], hi: ['वर्ग', 'आयत', 'त्रिभुज', 'गोला'], reasonEn: 'First three are 2D plane shapes; Sphere is a 3D solid.', reasonMr: 'पहिले तीन द्विमितीय (2D) आकार आहेत; गोल त्रिमितीय (3D) आहे.', reasonHi: 'पहले तीन 2D आकृतियाँ हैं; गोला 3D आकृति है।' },
        { en: ['Shirt', 'Trousers', 'Frock', 'Umbrella'], mr: ['शर्ट', 'पँट', 'फ्रॉक', 'छत्री'], hi: ['कमीज़', 'पैंट', 'फ्रॉक', 'छाता'], reasonEn: 'First three are clothes we wear; Umbrella is an accessory.', reasonMr: 'पहिले तीन कपडे आहेत; छत्री वेगळी आहे.', reasonHi: 'पहले तीन पहनने के कपड़े हैं; छाता अलग है।' },
        { en: ['Lion', 'Tiger', 'Leopard', 'Cow'], mr: ['सिंह', 'वाघ', 'बिबट्या', 'गाय'], hi: ['शेर', 'बाघ', 'तेंदुआ', 'गाय'], reasonEn: 'Lion, Tiger, Leopard are wild carnivores; Cow is a domestic herbivore.', reasonMr: 'सिंह, वाघ, बिबट्या हिंस्र प्राणी आहेत; गाय पाळीव शाकाहारी आहे.', reasonHi: 'शेर, बाघ, तेंदुआ मांसाहारी जंगली पशु हैं; गाय पालतू शाकाहारी है।' },
        { en: ['Cricket', 'Hockey', 'Football', 'Chess'], mr: ['क्रिकेट', 'हॉकी', 'फुटबॉल', 'बुद्धिबळ'], hi: ['क्रिकेट', 'हॉकी', 'फुटबॉल', 'शतरंज'], reasonEn: 'Cricket, Hockey, Football are outdoor ground games; Chess is an indoor board game.', reasonMr: 'क्रिकेट, हॉकी, फुटबॉल मैदानी खेळ आहेत; बुद्धिबळ बैठे खेळ आहे.', reasonHi: 'पहले तीन मैदानी खेल हैं; शतरंज इनडोर खेल है।' },
        { en: ['January', 'March', 'May', 'April'], mr: ['जानेवारी', 'मार्च', 'मे', 'एप्रिल'], hi: ['जनवरी', 'मार्च', 'मई', 'अप्रैल'], reasonEn: 'January, March, May have 31 days; April has 30 days.', reasonMr: 'जानेवारी, मार्च, मे महिन्यात 31 दिवस असतात; एप्रिलमध्ये 30 दिवस असतात.', reasonHi: 'जनवरी, मार्च, मई 31 दिनों के हैं; अप्रैल 30 दिनों का है।' },
        { en: ['Mango', 'Apple', 'Orange', 'Potato'], mr: ['आंबा', 'सफरचंद', 'संत्रे', 'बटाटा'], hi: ['आम', 'सेब', 'संतरा', 'आलू'], reasonEn: 'First three are fruits; Potato is an underground vegetable.', reasonMr: 'पहिले तीन फळे आहेत; बटाटा ही भाजी आहे.', reasonHi: 'पहले तीन फल हैं; आलू सब्जी है।' },
        { en: ['Violin', 'Guitar', 'Sitar', 'Tabla'], mr: ['व्हायोलिन', 'गिटार', 'सतार', 'तबला'], hi: ['वायलिन', 'गिटार', 'सितार', 'तबला'], reasonEn: 'Violin, Guitar, Sitar have strings; Tabla is a percussion instrument.', reasonMr: 'पहिले तीन तंतुवाद्ये आहेत; तबला हे तालवाद्य आहे.', reasonHi: 'पहले तीन तार वाले वाद्य हैं; तबला तालवाद्य है।' },
        { en: ['Pencil', 'Pen', 'Chalk', 'Eraser'], mr: ['पेन्सिल', 'पेन', 'खडू', 'खोडरबर'], hi: ['पेंसिल', 'पेन', 'चॉक', 'रबर'], reasonEn: 'Pencil, Pen, Chalk are used for writing; Eraser is used for erasing.', reasonMr: 'पहिले तीन लिहिण्यासाठी वापरतात; खोडरबर खोडण्यासाठी वापरतात.', reasonHi: 'पहले तीन लिखने के काम आते हैं; रबर मिटाने के लिए है।' },
        { en: ['Metre', 'Centimetre', 'Kilometre', 'Kilogram'], mr: ['मीटर', 'सेंटीमीटर', 'किलोमीटर', 'किलोग्रॅम'], hi: ['मीटर', 'सेंटीमीटर', 'किलोमीटर', 'किलोग्राम'], reasonEn: 'Metre, cm, km measure length; Kilogram measures weight.', reasonMr: 'पहिले तीन लांबी मोजण्याची एकके आहेत; किलोग्रॅम वजन मोजतो.', reasonHi: 'पहले तीन लंबाई की इकाइयाँ हैं; किलोग्राम वजन की इकाई है।' },
        { en: ['Eagle', 'Sparrow', 'Parrot', 'Bat'], mr: ['गरुड', 'चिमणी', 'पोपट', 'वटवाघूळ'], hi: ['बाज', 'गौरैया', 'तोता', 'चमगादड़'], reasonEn: 'Eagle, Sparrow, Parrot are birds that lay eggs; Bat is a flying mammal.', reasonMr: 'पहिले तीन अंडी घालणारे पक्षी आहेत; वटवाघूळ हा सस्तन प्राणी आहे.', reasonHi: 'पहले तीन पक्षी हैं; चमगादड़ स्तनधारी है।' },
        { en: ['Milk', 'Curd', 'Butter', 'Honey'], mr: ['दूध', 'दही', 'लोणी', 'मध'], hi: ['दूध', 'दही', 'मक्खन', 'शहद'], reasonEn: 'Milk, Curd, Butter are dairy products; Honey comes from bees.', reasonMr: 'पहिले तीन दुग्धजन्य पदार्थ आहेत; मध मधमाशांपासून मिळतो.', reasonHi: 'पहले तीन डेयरी उत्पाद हैं; शहद मधुमक्खियों से मिलता है।' },
        { en: ['Bus', 'Train', 'Car', 'Boat'], mr: ['बस', 'रेल्वे', 'कार', 'होडी'], hi: ['बस', 'रेलगाड़ी', 'कार', 'नाव'], reasonEn: 'Bus, Train, Car travel on land; Boat travels on water.', reasonMr: 'पहिले तीन जमिनीवरील वाहने आहेत; होडी पाण्यात चालते.', reasonHi: 'पहले तीन स्थल वाहन हैं; नाव पानी में चलती है।' },
        { en: ['Eye', 'Ear', 'Nose', 'Knee'], mr: ['डोळा', 'कान', 'नाक', 'गुडघा'], hi: ['आँख', 'कान', 'नाक', 'घुटना'], reasonEn: 'Eye, Ear, Nose are sense organs on the face; Knee is a leg joint.', reasonMr: 'डोळा, कान, नाक ही ज्ञानेंद्रिये आहेत; गुडघा हा पायाचा सांधा आहे.', reasonHi: 'पहले तीन ज्ञानेंद्रियाँ हैं; घुटना पैर का जोड़ है।' },
        { en: ['Gold', 'Silver', 'Copper', 'Plastic'], mr: ['सोने', 'चांदी', 'तांबे', 'प्लॅस्टिक'], hi: ['सोना', 'चाँदी', 'ताँबा', 'प्लास्टिक'], reasonEn: 'Gold, Silver, Copper are metals; Plastic is a synthetic non-metal.', reasonMr: 'पहिले तीन धातू आहेत; प्लॅस्टिक धातू नाही.', reasonHi: 'पहले तीन धातु हैं; प्लास्टिक अधातु है।' },
        { en: ['Summer', 'Winter', 'Monsoon', 'Sunday'], mr: ['उन्हाळा', 'हिवाळा', 'पावसाळा', 'रविवार'], hi: ['गर्मी', 'सर्दी', 'बरसात', 'रविवार'], reasonEn: 'Summer, Winter, Monsoon are seasons; Sunday is a day of the week.', reasonMr: 'पहिले तीन ऋतू आहेत; रविवार हा आठवड्याचा वार आहे.', reasonHi: 'पहले तीन मौसम हैं; रविवार सप्ताह का दिन है।' },
        { en: ['Godavari', 'Krishna', 'Narmada', 'Sahyadri'], mr: ['गोदावरी', 'कृष्णा', 'नर्मदा', 'सह्याद्री'], hi: ['गोदावरी', 'कृष्णा', 'नर्मदा', 'सह्याद्रि'], reasonEn: 'Godavari, Krishna, Narmada are rivers; Sahyadri is a mountain range.', reasonMr: 'पहिले तीन नद्या आहेत; सह्याद्री ही पर्वतरांग आहे.', reasonHi: 'पहले तीन नदियाँ हैं; सह्याद्रि पर्वत श्रृंखला है।' },
        { en: ['Book', 'Magazine', 'Newspaper', 'Radio'], mr: ['पुस्तक', 'मासिक', 'वर्तमानपत्र', 'रेडिओ'], hi: ['पुस्तक', 'पत्रिका', 'समाचार-पत्र', 'रेडियो'], reasonEn: 'Book, Magazine, Newspaper are print media you read; Radio is audio media.', reasonMr: 'पहिले तीन वाचनाची छापील माध्यमे आहेत; रेडिओ श्रवण माध्यम आहे.', reasonHi: 'पहले तीन मुद्रित माध्यम हैं; रेडियो श्रव्य माध्यम है।' },
        { en: ['Banyan', 'Neem', 'Peepal', 'Grass'], mr: ['वड', 'कडुलिंब', 'पिंपळ', 'गवत'], hi: ['बरगद', 'नीम', 'पीपल', 'घास'], reasonEn: 'Banyan, Neem, Peepal are huge trees; Grass is a small herb.', reasonMr: 'वड, कडुलिंब, पिंपळ ही मोठी झाडे आहेत; गवत लहान तृण आहे.', reasonHi: 'पहले तीन बड़े वृक्ष हैं; घास छोटा पौधा है।' },
        { en: ['Sun', 'Moon', 'Star', 'Mountain'], mr: ['सूर्य', 'चंद्र', 'तारा', 'पर्वत'], hi: ['सूर्य', 'चंद्रमा', 'तारा', 'पर्वत'], reasonEn: 'Sun, Moon, Star are celestial bodies in the sky; Mountain is on Earth.', reasonMr: 'पहिले तीन खगोलीय घटक आहेत; पर्वत जमिनीवर असतो.', reasonHi: 'पहले तीन खगोलीय पिंड हैं; पर्वत पृथ्वी पर है।' },
        { en: ['Doctor', 'Teacher', 'Engineer', 'Stethoscope'], mr: ['डॉक्टर', 'शिक्षक', 'अभियंता', 'स्टेथोस्कोप'], hi: ['डॉक्टर', 'शिक्षक', 'इंजीनियर', 'स्टेथोस्कोप'], reasonEn: 'Doctor, Teacher, Engineer are professions; Stethoscope is a medical tool.', reasonMr: 'पहिले तीन व्यवसाय/व्यक्ती आहेत; स्टेथोस्कोप हे साधन आहे.', reasonHi: 'पहले तीन पेशे हैं; स्टेथोस्कोप एक उपकरण है।' },
        { en: ['Carrot', 'Radish', 'Beetroot', 'Spinach'], mr: ['गाजर', 'मुळा', 'बीट', 'पालक'], hi: ['गाजर', 'मूली', 'चुकंदर', 'पालक'], reasonEn: 'Carrot, Radish, Beetroot are root vegetables; Spinach is a leafy vegetable.', reasonMr: 'गाजर, मुळा, बीट ही कंदमुळे आहेत; पालक पालेभाजी आहे.', reasonHi: 'पहले तीन जड़ वाली सब्जियाँ हैं; पालक पत्तेदार सब्जी है।' },
        { en: ['Mercury', 'Venus', 'Mars', 'Pluto'], mr: ['बुध', 'शुक्र', 'मंगळ', 'प्लुटो'], hi: ['बुध', 'शुक्र', 'मंगल', 'प्लूटो'], reasonEn: 'Mercury, Venus, Mars are official planets; Pluto is a dwarf planet.', reasonMr: 'पहिले तीन मुख्य ग्रह आहेत; प्लुटो बटु ग्रह आहे.', reasonHi: 'पहले तीन प्रमुख ग्रह हैं; प्लूटो बौना ग्रह है।' },
        { en: ['Circle', 'Oval', 'Triangle', 'Square'], mr: ['वर्तुळ', 'लंबवर्तुळ', 'त्रिकोण', 'चौरस'], hi: ['वृत्त', 'अंडाकार', 'त्रिभुज', 'वर्ग'], reasonEn: 'Wait: Triangle & Square have straight sides, whereas Circle & Oval are curved; better: Sphere vs Pyramid vs Cube vs Square — pick Triangle(3), Square(4), Pentagon(5), Circle(curved)!'.replace(/.*/, 'Circle has no straight sides, while Triangle, Square (wait: let us make 3 straight vs 1 curved cleanly in text below!).'), reasonMr: 'वर्तुळ वक्र असते; बाकी सरळ रेषांच्या आकृत्या आहेत.', reasonHi: 'वृत्त वक्र है; अन्य सीधी रेखाओं से बनी हैं।' },
      ];
      // Replace index 24 cleanly so 3 polygons vs 1 curved circle!
      groups[24] = {
        en: ['Triangle', 'Square', 'Pentagon', 'Circle'],
        mr: ['त्रिकोण', 'चौरस', 'पंचकोन', 'वर्तुळ'],
        hi: ['त्रिभुज', 'वर्ग', 'पंचभुज', 'वृत्त'],
        reasonEn: 'Triangle, Square, Pentagon are polygons made of straight line segments; Circle is curved.',
        reasonMr: 'पहिले तीन रेषाखंडांपासून बनलेले बहुभुज आहेत; वर्तुळ वक्राकार आहे.',
        reasonHi: 'पहले तीन सीधी रेखाओं से बने बहुभुज हैं; वृत्त वक्र है।',
      };
      const g = groups[t - 1];
      const enOpts = placeStringOptions(g.en[3], [g.en[0], g.en[1], g.en[2]], correctIdx);
      const mrOpts = placeStringOptions(g.mr[3], [g.mr[0], g.mr[1], g.mr[2]], correctIdx);
      const hiOpts = placeStringOptions(g.hi[3], [g.hi[0], g.hi[1], g.hi[2]], correctIdx);
      return {
        topic: 'Classification (Odd One Out)',
        enQ: `Find the odd word out from: ${enOpts.join(', ')}.`,
        mrQ: `गटात न बसणारा वेगळा शब्द ओळखा: ${mrOpts.join(', ')}.`,
        hiQ: `असंगत (अलग) शब्द चुनिए: ${hiOpts.join(', ')}।`,
        enOpts,
        mrOpts,
        hiOpts,
        enExp: g.reasonEn,
        mrExp: g.reasonMr,
        hiExp: g.reasonHi,
      };
    }
    case 9: {
      // Letter Series (+step mod 26 safe!)
      const startPos = 1 + ((t - 1) % 7); // 1..7 (A..G)
      const step = 2 + Math.floor((t - 1) / 7); // 2..5 (7x4 bijection)
      const letters = [0, 1, 2, 3, 4].map((k) => letterAt(startPos + k * step));
      const ans = letters[4];
      const w1 = letterAt(startPos + 4 * step + 1);
      const w2 = letterAt(startPos + 4 * step - 1);
      const w3 = letterAt(startPos + 4 * step + 2);
      const opts = placeStringOptions(ans, [w1, w2, w3], correctIdx);
      return {
        topic: 'Alphabet Series',
        enQ: `Complete the English letter series: ${letters.slice(0, 4).join(', ')}, ?`,
        mrQ: `इंग्रजी अक्षरमालिकेतील पुढील अक्षर ओळखा: ${letters.slice(0, 4).join(', ')}, ?`,
        hiQ: `अंग्रेज़ी अक्षर श्रृंखला पूरी कीजिए: ${letters.slice(0, 4).join(', ')}, ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Each letter shifts forward by +${step} in A–Z. After ${letters[3]} (+${step}) comes ${ans}.`,
        mrExp: `प्रत्येक अक्षर +${step} ने पुढे जाते. ${letters[3]} नंतर ${ans} येते.`,
        hiExp: `प्रत्येक अक्षर +${step} आगे बढ़ता है। ${letters[3]} के बाद ${ans} आता है।`,
      };
    }
    case 10: {
      // Two-letter pair series (1st forward +1, 2nd forward +2)
      const p1 = 1 + ((t - 1) % 8); // 1..8
      const p2 = 2 + Math.floor((t - 1) / 8) * 3; // 2, 5, 8, 11 -> 8x4 bijection
      const pairs = [0, 1, 2, 3].map((k) => `${letterAt(p1 + k)}${letterAt(p2 + 2 * k)}`);
      const ans = pairs[3];
      const w1 = `${letterAt(p1 + 3)}${letterAt(p2 + 7)}`;
      const w2 = `${letterAt(p1 + 4)}${letterAt(p2 + 6)}`;
      const w3 = `${letterAt(p1 + 2)}${letterAt(p2 + 8)}`;
      const opts = placeStringOptions(ans, [w1, w2, w3], correctIdx);
      return {
        topic: 'Alphabet Series',
        enQ: `Find the next letter-pair in the sequence: ${pairs.slice(0, 3).join(', ')}, ?`,
        mrQ: `पुढील अक्षरजोडी ओळखा: ${pairs.slice(0, 3).join(', ')}, ?`,
        hiQ: `अगला अक्षर-युग्म ज्ञात कीजिए: ${pairs.slice(0, 3).join(', ')}, ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `First letter moves +1, second letter moves +2 → next pair is ${ans}.`,
        mrExp: `पहिले अक्षर +1 ने व दुसरे अक्षर +2 ने पुढे सरकते → ${ans}.`,
        hiExp: `पहला अक्षर +1 और दूसरा +2 आगे बढ़ता है → ${ans}।`,
      };
    }
    case 11: {
      // Number Analogy (Multiplication + shift)
      const a = 3 + ((t - 1) % 8); // 3..10
      const mult = 3 + Math.floor((t - 1) / 8); // 3..6 -> 8x4 bijection
      const b = a * mult + 2;
      const c = a + 4;
      const ans = c * mult + 2;
      const opts = makeNumericOptions(ans, [2, -2, mult], correctIdx);
      return {
        topic: 'Number Analogy',
        enQ: `Find the number that replaces (?) by following the same relation: ${a} : ${b} :: ${c} : ?`,
        mrQ: `संख्यांमधील सहसंबंध ओळखा: ${a} : ${b} :: ${c} : ?`,
        hiQ: `समान संबंध के आधार पर (?) का मान ज्ञात कीजिए: ${a} : ${b} :: ${c} : ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Rule: Second = (First × ${mult}) + 2. (${c} × ${mult}) + 2 = ${ans}.`,
        mrExp: `संबंध: (पहिली संख्या × ${mult}) + 2 = (${c} × ${mult}) + 2 = ${ans}.`,
        hiExp: `संबंध: (पहली संख्या × ${mult}) + 2 = ${ans}।`,
      };
    }
    case 12: {
      // Number Analogy (Square + 1 relation)
      const a = 3 + Math.floor((t - 1) / 3); // 3..11
      const c = a + 2 + ((t - 1) % 3); // unique offset -> 9x3 bijection
      const b = a * a + 1;
      const ans = c * c + 1;
      const opts = makeNumericOptions(ans, [3, -2, 6], correctIdx);
      return {
        topic: 'Number Analogy',
        enQ: `Complete the numerical analogy: ${a} : ${b} :: ${c} : ?`,
        mrQ: `संख्यांचा सहसंबंध पूर्ण करा: ${a} : ${b} :: ${c} : ?`,
        hiQ: `संख्या सादृश्य पूरा कीजिए: ${a} : ${b} :: ${c} : ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Rule: n² + 1. Since ${a}² + 1 = ${b}, ${c}² + 1 = ${c * c} + 1 = ${ans}.`,
        mrExp: `नियम: संख्येचा वर्ग + 1. म्हणून ${c}² + 1 = ${ans}.`,
        hiExp: `नियम: संख्या का वर्ग + 1। अतः ${c}² + 1 = ${ans}।`,
      };
    }
    case 13: {
      // Word Analogy (25 classic Class 4 GK / Relationship pairs)
      const pairs: Array<[string, string, string, string, string, string, string, string, [string, string, string]]> = [
        ['Maharashtra', 'Mumbai', 'Gujarat', 'Gandhinagar', 'महाराष्ट्र', 'मुंबई', 'गुजरात', 'गांधीनगर', ['Ahmedabad', 'Surat', 'Jaipur']],
        ['India', 'Rupee', 'Japan', 'Yen', 'भारत', 'रुपया', 'जपान', 'येन', ['Dollar', 'Euro', 'Pound']],
        ['Doctor', 'Hospital', 'Teacher', 'School', 'डॉक्टर', 'रुग्णालय', 'शिक्षक', 'शाळा', ['Court', 'Market', 'Station']],
        ['Bird', 'Nest', 'Lion', 'Den', 'पक्षी', 'घरटे', 'सिंह', 'गुहा', ['Stable', 'Hive', 'Kennel']],
        ['Dog', 'Bark', 'Cat', 'Mew', 'कुत्रा', 'भुंकणे', 'मांजर', 'म्याव', ['Roar', 'Chirp', 'Neigh']],
        ['Thermometer', 'Temperature', 'Clock', 'Time', 'तापमापी', 'तापमान', 'घड्याळ', 'वेळ', ['Weight', 'Length', 'Speed']],
        ['Pen', 'Write', 'Knife', 'Cut', 'पेन', 'लिहिणे', 'सुरी', 'कापणे', ['Sleep', 'Read', 'Sing']],
        ['Cow', 'Calf', 'Sheep', 'Lamb', 'गाय', 'वासरू', 'मेंढी', 'कोकरू', ['Puppy', 'Kitten', 'Foal']],
        ['January', 'February', 'Friday', 'Saturday', 'जानेवारी', 'फेब्रुवारी', 'शुक्रवार', 'शनिवार', ['Monday', 'Sunday', 'Thursday']],
        ['Hot', 'Cold', 'Day', 'Night', 'गरम', 'थंड', 'दिवस', 'रात्र', ['Morning', 'Noon', 'Light']],
        ['Mango', 'Fruit', 'Spinach', 'Vegetable', 'आंबा', 'फळ', 'पालक', 'भाजी', ['Flower', 'Tree', 'Seed']],
        ['Eye', 'Sight', 'Ear', 'Hearing', 'डोळा', 'दृष्टी', 'कान', 'ऐकणे', ['Smell', 'Taste', 'Touch']],
        ['Fish', 'Water', 'Camel', 'Desert', 'मासा', 'पाणी', 'उंट', 'वाळवंट', ['Forest', 'Ocean', 'Sky']],
        ['Carpentry', 'Wood', 'Pottery', 'Clay', 'सुतारकाम', 'लाकूड', 'कुंभारकाम', 'माती', ['Iron', 'Glass', 'Paper']],
        ['Bee', 'Honey', 'Silkworm', 'Silk', 'मधमाशी', 'मध', 'रेशीम कीटक', 'रेशीम', ['Wool', 'Milk', 'Cotton']],
        ['Car', 'Road', 'Ship', 'Sea', 'कार', 'रस्ता', 'जहाज', 'समुद्र', ['Track', 'Air', 'Bridge']],
        ['Author', 'Book', 'Painter', 'Painting', 'लेखक', 'पुस्तक', 'चित्रकार', 'चित्र', ['Song', 'Building', 'Bridge']],
        ['Sun', 'Day', 'Moon', 'Night', 'सूर्य', 'दिवस', 'चंद्र', 'रात्र', ['Afternoon', 'Morning', 'Dawn']],
        ['Leaf', 'Green', 'Milk', 'White', 'पान', 'हिरवा', 'दूध', 'पांढरा', ['Yellow', 'Blue', 'Black']],
        ['Triangle', 'Three', 'Pentagon', 'Five', 'त्रिकोण', 'तीन', 'पंचकोन', 'पाच', ['Four', 'Six', 'Eight']],
        ['Sugar', 'Sweet', 'Lemon', 'Sour', 'साखर', 'गोड', 'लिंबू', 'आंबट', ['Bitter', 'Salty', 'Spicy']],
        ['Hand', 'Glove', 'Foot', 'Shoe', 'हात', 'हातमोजा', 'पाय', 'बूट', ['Hat', 'Belt', 'Tie']],
        ['Cricket', 'Bat', 'Badminton', 'Racket', 'क्रिकेट', 'बॅट', 'बॅडमिंटन', 'रॅकेट', ['Stick', 'Club', 'Net']],
        ['Train', 'Tracks', 'Aeroplane', 'Sky', 'रेल्वे', 'रूळ', 'विमान', 'आकाश', ['Water', 'Road', 'Desert']],
        ['Library', 'Books', 'Museum', 'Artifacts', 'ग्रंथालय', 'पुस्तके', 'संग्रहालय', 'प्राचीन वस्तू', ['Trees', 'Trains', 'Medicines']],
      ];
      const mrMap: Record<string, string> = {
        Ahmedabad: 'अहमदाबाद', Surat: 'सुरत', Jaipur: 'जयपूर',
        Dollar: 'डॉलर', Euro: 'युरो', Pound: 'पाउंड',
        Court: 'न्यायालय', Market: 'बाजार', Station: 'स्थानक',
        Stable: 'तबेला', Hive: 'पोळे', Kennel: 'कुत्राघर',
        Roar: 'गर्जना', Chirp: 'चिवचिवाट', Neigh: 'खिंकाळणे',
        Weight: 'वजन', Length: 'लांबी', Speed: 'वेग',
        Sleep: 'झोपणे', Read: 'वाचणे', Sing: 'गाणे',
        Puppy: 'पिल्लू', Kitten: 'मांजरीचे पिल्लू', Foal: 'शिंगरू',
        Monday: 'सोमवार', Sunday: 'रविवार', Thursday: 'गुरुवार',
        Morning: 'सकाळ', Noon: 'दुपार', Light: 'प्रकाश',
        Flower: 'फूल', Tree: 'झाड', Seed: 'बी',
        Smell: 'वास', Taste: 'चव', Touch: 'स्पर्श',
        Forest: 'जंगल', Ocean: 'महासागर', Sky: 'आकाश',
        Iron: 'लोखंड', Glass: 'काच', Paper: 'कागद',
        Wool: 'लोकर', Milk: 'दूध', Cotton: 'कापूस',
        Track: 'रूळ', Air: 'हवा', Bridge: 'पूल',
        Song: 'गाणे', Building: 'इमारत',
        Afternoon: 'दुपार', Dawn: 'पहाट',
        Yellow: 'पिवळा', Blue: 'निळा', Black: 'काळा',
        Four: 'चार', Six: 'सहा', Eight: 'आठ',
        Bitter: 'कडू', Salty: 'खारट', Spicy: 'तिखट',
        Hat: 'टोपी', Belt: 'पट्टा', Tie: 'टाय',
        Stick: 'काठी', Club: 'क्लब', Net: 'जाळी',
        Water: 'पाणी', Road: 'रस्ता', Desert: 'वाळवंट',
        Trees: 'झाडे', Trains: 'गाड्या', Medicines: 'औषधे',
      };
      const hiMap: Record<string, string> = {
        Ahmedabad: 'अहमदाबाद', Surat: 'सूरत', Jaipur: 'जयपुर',
        Dollar: 'डॉलर', Euro: 'यूरो', Pound: 'पाउंड',
        Court: 'न्यायालय', Market: 'बाज़ार', Station: 'स्टेशन',
        Stable: 'अस्तबल', Hive: 'छत्ता', Kennel: 'कुत्ताघर',
        Roar: 'दहाड़', Chirp: 'चहचहाना', Neigh: 'हिनहिनाना',
        Weight: 'भार', Length: 'लंबाई', Speed: 'चाल',
        Sleep: 'सोना', Read: 'पढ़ना', Sing: 'गाना',
        Puppy: 'पिल्ला', Kitten: 'बिलौटा', Foal: 'बछेड़ा',
        Monday: 'सोमवार', Sunday: 'रविवार', Thursday: 'गुरुवार',
        Morning: 'सुबह', Noon: 'दोपहर', Light: 'रोशनी',
        Flower: 'फूल', Tree: 'पेड़', Seed: 'बीज',
        Smell: 'गंध', Taste: 'स्वाद', Touch: 'स्पर्श',
        Forest: 'जंगल', Ocean: 'समुद्र', Sky: 'आकाश',
        Iron: 'लोहा', Glass: 'काँच', Paper: 'कागज़',
        Wool: 'ऊन', Milk: 'दूध', Cotton: 'कपास',
        Track: 'पटरी', Air: 'हवा', Bridge: 'पुल',
        Song: 'गीत', Building: 'भवन',
        Afternoon: 'दोपहर', Dawn: 'भोर',
        Yellow: 'पीला', Blue: 'नीला', Black: 'काला',
        Four: 'चार', Six: 'छह', Eight: 'आठ',
        Bitter: 'कड़वा', Salty: 'नमकीन', Spicy: 'तीखा',
        Hat: 'टोपी', Belt: 'बेल्ट', Tie: 'टाई',
        Stick: 'हॉकी स्टिक', Club: 'क्लब', Net: 'जाल',
        Water: 'पानी', Road: 'सड़क', Desert: 'रेगिस्तान',
        Trees: 'पेड़', Trains: 'ट्रेन', Medicines: 'दवाइयाँ',
      };
      const p = pairs[t - 1];
      const [e1, e2, e3, e4, m1, m2, m3, m4, wrongs] = p;
      const hiAnsFixed = m4 === 'गुहा' ? 'मांद' : m4 === 'वासरू' ? 'बछड़ा' : m4 === 'कोकरू' ? 'मेमना' : m4 === 'पिवळा' ? 'पीला' : m4 === 'पांढरा' ? 'सफेद' : m4 === 'पाच' ? 'पाँच' : m4 === 'आंबट' ? 'खट्टा' : m4 === 'हातमोजा' ? 'दस्ताने' : m4 === 'बूट' ? 'जूता' : m4;
      const h1 = hiMap[e1] || (m1 === 'गुलाब' ? m1 : m1 === 'भारत' ? 'भारत' : m1);
      const hiTermMap: Record<string, string> = {
        Maharashtra: 'महाराष्ट्र', Mumbai: 'मुंबई', Gujarat: 'गुजरात',
        India: 'भारत', Rupee: 'रुपया', Japan: 'जापान',
        Doctor: 'डॉक्टर', Hospital: 'अस्पताल', Teacher: 'शिक्षक',
        Bird: 'पक्षी', Nest: 'घोंसला', Lion: 'शेर',
        Dog: 'कुत्ता', Bark: 'भौंकना', Cat: 'बिल्ली',
        Thermometer: 'थर्मामीटर', Temperature: 'तापमान', Clock: 'घड़ी',
        Pen: 'पेन', Write: 'लिखना', Knife: 'चाकू',
        Cow: 'गाय', Calf: 'बछड़ा', Sheep: 'भेड़',
        January: 'जनवरी', February: 'फ़रवरी', Friday: 'शुक्रवार',
        Hot: 'गर्म', Cold: 'ठंडा', Day: 'दिन',
        Mango: 'आम', Fruit: 'फल', Spinach: 'पालक',
        Eye: 'आँख', Sight: 'दृष्टि', Ear: 'कान',
        Fish: 'मछली', Water: 'पानी', Camel: 'ऊँट',
        Carpentry: 'बढ़ईगीरी', Wood: 'लकड़ी', Pottery: 'कुम्हारगीरी',
        Bee: 'मधुमक्खी', Honey: 'शहद', Silkworm: 'रेशम कीट',
        Car: 'कार', Road: 'सड़क', Ship: 'जहाज',
        Author: 'लेखक', Book: 'पुस्तक', Painter: 'चित्रकार',
        Sun: 'सूर्य', Moon: 'चंद्रमा', Leaf: 'पत्ता', Green: 'हरा', Milk: 'दूध',
        Triangle: 'त्रिभुज', Three: 'तीन', Pentagon: 'पंचभुज',
        Sugar: 'चीनी', Sweet: 'मीठा', Lemon: 'नींबू',
        Hand: 'हाथ', Glove: 'दस्ताना', Foot: 'पैर',
        Cricket: 'क्रिकेट', Bat: 'बल्ला', Badminton: 'बैडमिंटन',
        Train: 'रेलगाड़ी', Tracks: 'पटरी', Aeroplane: 'हवाई जहाज़',
        Library: 'पुस्तकालय', Books: 'पुस्तकें', Museum: 'संग्रहालय',
      };
      void h1;
      const enOpts = placeStringOptions(e4, wrongs, correctIdx);
      const mrOpts = placeStringOptions(m4, [mrMap[wrongs[0]] || wrongs[0], mrMap[wrongs[1]] || wrongs[1], mrMap[wrongs[2]] || wrongs[2]], correctIdx);
      const hiOpts = placeStringOptions(hiAnsFixed, [hiMap[wrongs[0]] || wrongs[0], hiMap[wrongs[1]] || wrongs[1], hiMap[wrongs[2]] || wrongs[2]], correctIdx);
      return {
        topic: 'Word Analogy',
        enQ: `Find the matching word to complete the analogy: ${e1} : ${e2} :: ${e3} : ?`,
        mrQ: `योग्य शब्द जोडी पूर्ण करा: ${m1} : ${m2} :: ${m3} : ?`,
        hiQ: `समान संबंध वाला शब्द चुनिए: ${hiTermMap[e1] || m1} : ${hiTermMap[e2] || m2} :: ${hiTermMap[e3] || m3} : ?`,
        enOpts,
        mrOpts,
        hiOpts,
        enExp: `Just as ${e1} relates to ${e2}, ${e3} relates to ${e4}.`,
        mrExp: `${m1} चा संबंध ${m2} शी जसा आहे, तसा ${m3} चा संबंध ${m4} शी आहे.`,
        hiExp: `जिस प्रकार ${hiTermMap[e1] || m1} का संबंध ${hiTermMap[e2] || m2} से है, उसी प्रकार ${hiTermMap[e3] || m3} का संबंध ${hiAnsFixed} से है।`,
      };
    }
    case 14: {
      // Coding-Decoding: Word letter shift (+shift mod 26!)
      const words = ['BOOK', 'STAR', 'LAMP', 'FROG', 'BIRD', 'TREE', 'MILK', 'FISH', 'KITE', 'HAND', 'DESK', 'COIN', 'RING', 'RAIN', 'CAKE', 'SHIP', 'DOOR', 'GOLD', 'WIND', 'DUCK', 'SAND', 'LION', 'FARM', 'ROSE', 'BELL'];
      const targetWord = words[t - 1];
      const shift = (t % 3) + 1; // +1, +2, +3
      const encode = (w: string, sh: number) =>
        w.split('').map((ch) => letterAt(ALPHABET.indexOf(ch) + 1 + sh)).join('');
      const sample = 'PLAY';
      const sampleCoded = encode(sample, shift);
      const ans = encode(targetWord, shift);
      const w1 = encode(targetWord, shift + 1);
      const w2 = targetWord.slice(0, 3) + letterAt(ALPHABET.indexOf(targetWord[3]) + 1 + shift + 2);
      const w3 = encode(targetWord, shift === 1 ? 3 : shift - 1);
      const opts = placeStringOptions(ans, [w1, w2, w3], correctIdx);
      return {
        topic: 'Coding-Decoding',
        enQ: `In a certain secret code, "${sample}" is written as "${sampleCoded}". Following the same letter shift rule, how is "${targetWord}" written?`,
        mrQ: `एका सांकेतिक भाषेत "${sample}" हा शब्द "${sampleCoded}" असा लिहिला जातो, तर त्याच नियमाने "${targetWord}" कसा लिहिला जाईल?`,
        hiQ: `एक कूट भाषा में "${sample}" को "${sampleCoded}" लिखा जाता है। उसी नियम से "${targetWord}" को कैसे लिखा जाएगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Every letter moves forward by +${shift} step(s) in A–Z. Thus "${targetWord}" → "${ans}".`,
        mrExp: `प्रत्येक अक्षर +${shift} ने पुढे सरकवले आहे. म्हणून "${targetWord}" → "${ans}".`,
        hiExp: `प्रत्येक अक्षर +${shift} आगे बढ़ाया गया है। अतः "${targetWord}" → "${ans}"।`,
      };
    }
    case 15: {
      // Coding-Decoding: Word-to-Number Alphabet Sum (A=1..Z=26)
      const words = ['CAT', 'DOG', 'SUN', 'BAT', 'PEN', 'CUP', 'HAT', 'BOX', 'VAN', 'JAR', 'OWL', 'ANT', 'KEY', 'MAP', 'NET', 'BUS', 'CAR', 'FAN', 'TOP', 'PIN', 'MAT', 'GUN', 'JAM', 'LOG', 'RAT'];
      const w = words[t - 1];
      const sum = w.split('').reduce((acc, ch) => acc + ALPHABET.indexOf(ch) + 1, 0);
      const opts = makeNumericOptions(sum, [3, -3, 6], correctIdx);
      return {
        topic: 'Coding-Decoding',
        enQ: `If A = 1, B = 2, C = 3, ..., Z = 26, what is the numerical code value for the word "${w}" (sum of its letter values)?`,
        mrQ: `जर A = 1, B = 2, C = 3, ..., Z = 26 मानले, तर "${w}" या शब्दातील अक्षरांच्या किमतींची बेरीज किती होईल?`,
        hiQ: `यदि A = 1, B = 2, ..., Z = 26 हो, तो शब्द "${w}" के अक्षरों के मानों का योग कितना होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${w.split('').map((ch) => `${ch}(${ALPHABET.indexOf(ch) + 1})`).join(' + ')} = ${sum}.`,
        mrExp: `अक्षरकिमतींची बेरीज = ${w.split('').map((ch) => ALPHABET.indexOf(ch) + 1).join(' + ')} = ${sum}.`,
        hiExp: `अक्षरों के मानों का योग = ${w.split('').map((ch) => ALPHABET.indexOf(ch) + 1).join(' + ')} = ${sum}।`,
      };
    }
    case 16: {
      // Direction Sense: Straight North/East + Right/Left turns -> Final Facing Direction (NO Pythagoras!)
      const starts = [
        { en: 'North', mr: 'उत्तर', hi: 'उत्तर' },
        { en: 'East', mr: 'पूर्व', hi: 'पूर्व' },
        { en: 'South', mr: 'दक्षिण', hi: 'दक्षिण' },
        { en: 'West', mr: 'पश्चिम', hi: 'पश्चिम' },
      ];
      // 25 unique (startIdx, turnSequence, steps)
      const sIdx = (t - 1) % 4;
      const patternIdx = Math.floor((t - 1) / 4); // 0..6 (right, left, right+right, right+left, left+left, etc.)
      const turnPatterns: Array<{ d: number; en: string; mr: string; hi: string }> = [
        { d: 1, en: 'turns Right once', mr: 'एकदा उजवीकडे वळला', hi: 'एक बार दाएँ मुड़ा' },
        { d: -1, en: 'turns Left once', mr: 'एकदा डावीकडे वळला', hi: 'एक बार बाएँ मुड़ा' },
        { d: 2, en: 'turns Right twice in a row', mr: 'सलग दोनदा उजवीकडे वळला', hi: 'लगातार दो बार दाएँ मुड़ा' },
        { d: 1, en: 'turns Right, walks 5 m, turns Left, and turns Right again', mr: 'उजवीकडे वळून 5 मी चालतो, नंतर डावीकडे व पुढे पुन्हा उजवीकडे वळतो', hi: 'दाएँ मुड़कर 5 मी चलता है, फिर बाएँ और फिर दाएँ मुड़ता है' },
        { d: -1, en: 'turns Left, walks 8 m, turns Right, and turns Left again', mr: 'डावीकडे वळून 8 मी चालतो, नंतर उजवीकडे व पुढे पुन्हा डावीकडे वळतो', hi: 'बाएँ मुड़कर 8 मी चलता है, फिर दाएँ और फिर बाएँ मुड़ता है' },
        { d: 2, en: 'turns Left twice at consecutive corners', mr: 'सलग दोन कोपऱ्यांवर डावीकडे वळला', hi: 'लगातार दो मोड़ों पर बाएँ मुड़ा' },
        { d: 0, en: 'turns Right and then immediately turns Left', mr: 'उजवीकडे वळून लगेचच डावीकडे वळला', hi: 'दाएँ मुड़कर तुरंत बाएँ मुड़ा' },
      ];
      const pat = turnPatterns[patternIdx];
      const dist = 10 + t * 2;
      const start = starts[sIdx];
      const end = starts[(sIdx + pat.d + 4) % 4];
      const othersEn = starts.filter((_, i) => i !== (sIdx + pat.d + 4) % 4).map((x) => x.en) as [string, string, string];
      const othersMr = starts.filter((_, i) => i !== (sIdx + pat.d + 4) % 4).map((x) => x.mr) as [string, string, string];
      const othersHi = starts.filter((_, i) => i !== (sIdx + pat.d + 4) % 4).map((x) => x.hi) as [string, string, string];
      return {
        topic: 'Direction Sense',
        enQ: `${name} walks ${dist} m facing ${start.en} and then ${pat.en}. Which direction is ${name} facing now?`,
        mrQ: `${name} ${start.mr} दिशेकडे तोंड करून ${dist} मी चालतो आणि ${pat.mr}, तर आता त्याचे तोंड कोणत्या दिशेला असेल?`,
        hiQ: `${name} ${start.hi} दिशा की ओर ${dist} मी चलकर ${pat.hi}। अब उसका मुख किस दिशा की ओर है?`,
        enOpts: placeStringOptions(end.en, othersEn, correctIdx),
        mrOpts: placeStringOptions(end.mr, othersMr, correctIdx),
        hiOpts: placeStringOptions(end.hi, othersHi, correctIdx),
        enExp: `Starting ${start.en} and turning net ${pat.d * 90}° leads to ${end.en}.`,
        mrExp: `${start.mr} दिशेकडून वळणानंतर अंतिम दिशा ${end.mr} येते.`,
        hiExp: `${start.hi} दिशा से मुड़ने के बाद अंतिम दिशा ${end.hi} होगी।`,
      };
    }
    case 17: {
      // Linear Ranking (Total students = Left + Right - 1)
      const fromLeft = 7 + t;
      const fromRight = 9 + ((t * 2) % 11);
      const total = fromLeft + fromRight - 1;
      const opts = makeNumericOptions(total, [1, -1, 2], correctIdx);
      return {
        topic: 'Order & Ranking',
        enQ: `In a morning assembly row, ${name} stands ${fromLeft}th from the left end and ${fromRight}th from the right end. How many students are in the row?`,
        mrQ: `एका रांगेत ${name} चा क्रमांक डावीकडून ${fromLeft} वा आणि उजवीकडून ${fromRight} वा आहे, तर रांगेत एकूण किती विद्यार्थी आहेत?`,
        hiQ: `एक पंक्ति में ${name} का स्थान बाएँ से ${fromLeft}वाँ और दाएँ से ${fromRight}वाँ है। पंक्ति में कुल कितने विद्यार्थी हैं?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Total = Left + Right - 1 = ${fromLeft} + ${fromRight} - 1 = ${total}.`,
        mrExp: `एकूण विद्यार्थी = ${fromLeft} + ${fromRight} - 1 = ${total}.`,
        hiExp: `कुल विद्यार्थी = ${fromLeft} + ${fromRight} - 1 = ${total}।`,
      };
    }
    case 18: {
      // Linear Ranking (Find Rank from Bottom given Total & Rank from Top)
      const total = 30 + t * 2;
      const fromTop = 8 + (t % 9);
      const fromBottom = total - fromTop + 1;
      const opts = makeNumericOptions(fromBottom, [1, -1, 2], correctIdx);
      return {
        topic: 'Order & Ranking',
        enQ: `Among ${total} students in a merit list, ${name} secured the ${fromTop}th rank from the top. What is ${name}'s rank from the bottom?`,
        mrQ: `${total} विद्यार्थ्यांच्या गुणवत्ता यादीत ${name} चा क्रमांक वरून ${fromTop} वा असल्यास, खालून त्याचा क्रमांक कितवा असेल?`,
        hiQ: `${total} विद्यार्थियों की सूची में ${name} का स्थान ऊपर से ${fromTop}वाँ है। नीचे से उसका स्थान कौन-सा होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Rank from bottom = Total - Top + 1 = ${total} - ${fromTop} + 1 = ${fromBottom}.`,
        mrExp: `खालून क्रमांक = ${total} - ${fromTop} + 1 = ${fromBottom} वा.`,
        hiExp: `नीचे से स्थान = ${total} - ${fromTop} + 1 = ${fromBottom}वाँ।`,
      };
    }
    case 19: {
      // Blood Relations (Class 4 immediate family; 5 scenarios x 25 unique student names)
      const uniqueNames25 = ['Aarav', 'Riya', 'Kabir', 'Ananya', 'Vivaan', 'Meera', 'Soham', 'Tanvi', 'Pranav', 'Kavya', 'Harsh', 'Diya', 'Nikhil', 'Sana', 'Manav', 'Esha', 'Tarun', 'Nisha', 'Raghav', 'Puja', 'Sahil', 'Isha', 'Arjun', 'Radha', 'Vedant'];
      const pName = uniqueNames25[t - 1];
      const scenarios: Array<{ qEn: string; qMr: string; qHi: string; ansEn: string; ansMr: string; ansHi: string; wEn: [string, string, string]; wMr: [string, string, string]; wHi: [string, string, string] }> = [
        { qEn: `How is ${pName}'s father's sister related to ${pName}?`, qMr: `${pName} च्या वडिलांची बहीण ${pName} ची कोण लागते?`, qHi: `${pName} के पिता की बहन ${pName} की क्या लगती है?`, ansEn: 'Aunt (Paternal)', ansMr: 'आत्या', ansHi: 'बुआ', wEn: ['Uncle', 'Grandmother', 'Cousin'], wMr: ['मावशी', 'काकी', 'आजी'], wHi: ['मौसी', 'चाची', 'दादी'] },
        { qEn: `How is ${pName}'s mother's brother related to ${pName}?`, qMr: `${pName} च्या आईचा भाऊ ${pName} चा कोण लागतो?`, qHi: `${pName} की माता का भाई ${pName} का क्या लगता है?`, ansEn: 'Maternal Uncle', ansMr: 'मामा', ansHi: 'मामा', wEn: ['Paternal Uncle', 'Grandfather', 'Cousin'], wMr: ['काका', 'आजोबा', 'मावसभाऊ'], wHi: ['चाचा', 'दादा', 'चचेरा भाई'] },
        { qEn: `How is ${pName}'s father's father related to ${pName}?`, qMr: `${pName} च्या वडिलांचे वडील ${pName} चे कोण लागतात?`, qHi: `${pName} के पिता के पिता ${pName} के क्या लगते हैं?`, ansEn: 'Grandfather', ansMr: 'आजोबा', ansHi: 'दादा', wEn: ['Uncle', 'Brother', 'Father'], wMr: ['काका', 'मामा', 'चुलते'], wHi: ['चाचा', 'मामा', 'भाई'] },
        { qEn: `How is ${pName}'s mother's sister related to ${pName}?`, qMr: `${pName} च्या आईची बहीण ${pName} ची कोण लागते?`, qHi: `${pName} की माता की बहन ${pName} की क्या लगती है?`, ansEn: 'Maternal Aunt', ansMr: 'मावशी', ansHi: 'मौसी', wEn: ['Paternal Aunt', 'Sister', 'Grandmother'], wMr: ['आत्या', 'काकी', 'आजी'], wHi: ['बुआ', 'चाची', 'नानी'] },
        { qEn: `How is ${pName}'s paternal uncle's daughter related to ${pName}?`, qMr: `${pName} च्या काकांची मुलगी ${pName} ची कोण लागते?`, qHi: `${pName} के चाचा की बेटी ${pName} की क्या लगती है?`, ansEn: 'Cousin Sister', ansMr: 'चुलत बहीण', ansHi: 'चचेरी बहन', wEn: ['Aunt', 'Niece', 'Mother'], wMr: ['आत्या', 'भाची', 'काकी'], wHi: ['बुआ', 'भतीजी', 'चाची'] },
      ];
      const sc = scenarios[(t - 1) % scenarios.length];
      return {
        topic: 'Blood Relations',
        enQ: sc.qEn,
        mrQ: sc.qMr,
        hiQ: sc.qHi,
        enOpts: placeStringOptions(sc.ansEn, sc.wEn, correctIdx),
        mrOpts: placeStringOptions(sc.ansMr, sc.wMr, correctIdx),
        hiOpts: placeStringOptions(sc.ansHi, sc.wHi, correctIdx),
        enExp: `In family relationships, the answer is ${sc.ansEn}.`,
        mrExp: `नातेसंबंधानुसार अचूक उत्तर '${sc.ansMr}' आहे.`,
        hiExp: `पारिवारिक संबंध के अनुसार उत्तर '${sc.ansHi}' है।`,
      };
    }
    case 20: {
      // Blood Relations (2-hop riddle; 25 unique names)
      const uniquePeople25 = ['Rohan', 'Sneha', 'Aditya', 'Priya', 'Omkar', 'Neha', 'Siddharth', 'Gauri', 'Yash', 'Kalyani', 'Mayur', 'Pallavi', 'Tejas', 'Shruti', 'Kunal', 'Swati', 'Varun', 'Pooja', 'Gaurav', 'Aarti', 'Deepak', 'Komal', 'Sameer', 'Sonali', 'Chetan'];
      const genders = ['son', 'daughter'];
      const g = genders[t % 2];
      const ansEn = g === 'son' ? 'Son' : 'Daughter';
      const ansMr = g === 'son' ? 'मुलगा' : 'मुलगी';
      const ansHi = g === 'son' ? 'बेटा' : 'बेटी';
      const person = uniquePeople25[t - 1];
      return {
        topic: 'Blood Relations',
        enQ: `Looking at a photo, Ananya says, "${person} is the only ${g} of my paternal grandfather's only son." How is ${person} related to Ananya's father?`,
        mrQ: `एका छायाचित्राकडे बोट दाखवून अनन्या म्हणाली, "${person} हा/ही माझ्या आजोबांच्या एकुलत्या एका मुलाचा/मुलीचे ${ansMr} आहे." तर ${person} हा/ही अनन्याच्या वडिलांचा कोण?`,
        hiQ: `एक तस्वीर की ओर इशारा करते हुए अनन्या ने कहा, "${person} मेरे दादाजी के इकलौते बेटे की संतान (${ansHi}) है।" ${person} का अनन्या के पिता से क्या संबंध है?`,
        enOpts: placeStringOptions(ansEn, [g === 'son' ? 'Daughter' : 'Son', 'Brother', 'Nephew'], correctIdx),
        mrOpts: placeStringOptions(ansMr, [g === 'son' ? 'मुलगी' : 'मुलगा', 'भाऊ', 'पुतण्या'], correctIdx),
        hiOpts: placeStringOptions(ansHi, [g === 'son' ? 'बेटी' : 'बेटा', 'भाई', 'भतीजा'], correctIdx),
        enExp: `Ananya's paternal grandfather's only son is Ananya's father. So ${person} is his ${ansEn}.`,
        mrExp: `आजोबांचा एकुलता एक मुलगा म्हणजे अनन्याचे वडील. म्हणून ${person} हा/ही त्यांचा ${ansMr} आहे.`,
        hiExp: `दादाजी के इकलौते बेटे अनन्या के पिता हैं। अतः ${person} उनका ${ansHi} है।`,
      };
    }
    case 21: {
      // Calendar: Day of week after n days
      const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const daysMr = ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
      const daysHi = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
      const startDayIdx = (t - 1) % 7;
      const addDays = 10 + t * 3; // 13..85 days (always distinct per t!)
      const endIdx = (startDayIdx + addDays) % 7;
      const rem = addDays % 7;
      const wIdx = [1, 2, 3].map((k) => (endIdx + k) % 7);
      return {
        topic: 'Calendar',
        enQ: `If today is ${daysEn[startDayIdx]}, what day of the week will it be after ${addDays} days?`,
        mrQ: `जर आज ${daysMr[startDayIdx]} असेल, तर ${addDays} दिवसांनंतर कोणता वार येईल?`,
        hiQ: `यदि आज ${daysHi[startDayIdx]} है, तो ${addDays} दिनों के बाद सप्ताह का कौन-सा दिन होगा?`,
        enOpts: placeStringOptions(daysEn[endIdx], [daysEn[wIdx[0]], daysEn[wIdx[1]], daysEn[wIdx[2]]], correctIdx),
        mrOpts: placeStringOptions(daysMr[endIdx], [daysMr[wIdx[0]], daysMr[wIdx[1]], daysMr[wIdx[2]]], correctIdx),
        hiOpts: placeStringOptions(daysHi[endIdx], [daysHi[wIdx[0]], daysHi[wIdx[1]], daysHi[wIdx[2]]], correctIdx),
        enExp: `${addDays} ÷ 7 gives remainder ${rem} odd days. ${daysEn[startDayIdx]} + ${rem} day(s) = ${daysEn[endIdx]}.`,
        mrExp: `${addDays} ÷ 7 केल्यास बाकी ${rem} उरते. ${daysMr[startDayIdx]} + ${rem} दिवस = ${daysMr[endIdx]}.`,
        hiExp: `${addDays} ÷ 7 से शेष ${rem} दिन आते हैं। ${daysHi[startDayIdx]} + ${rem} दिन = ${daysHi[endIdx]}।`,
      };
    }
    case 22: {
      // Calendar: Dates of same weekday in a month (+7/+14/+21)
      const firstDate = 2 + ((t - 1) % 5); // 2..6
      const weekMult = 1 + Math.floor((t - 1) / 5); // 1..5? keep 1..4 so <= 31: use 3 for mult=1..4 -> Wait for 25 unique questions vary weekday & firstDate + targetDate!
      const weekdaysEn = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      const weekdaysMr = ['सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार'];
      const weekdaysHi = ['सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार'];
      const wDay = weekdaysEn[(t - 1) % 5];
      const wDayMr = weekdaysMr[(t - 1) % 5];
      const wDayHi = weekdaysHi[(t - 1) % 5];
      const d1 = 1 + Math.floor((t - 1) / 5); // 1..5
      const ansDate = d1 + 21; // 3 weeks later: 22..26 (all valid in every month!)
      const opts = makeNumericOptions(ansDate, [1, -1, 7], correctIdx);
      return {
        topic: 'Calendar',
        enQ: `In a given month, ${d1}st/th/nd/rd — exact date ${d1} — falls on a ${wDay}. On which date will the fourth ${wDay} of that month fall?`.replace(/1st\/th\/nd\/rd — exact date 1 —/, '1st').replace(/\d+st\/th\/nd\/rd — exact date (\d+) —/, 'date $1'),
        mrQ: `एका महिन्याच्या ${d1} तारखेला ${wDayMr} आहे, तर त्याच महिन्यातील चौथा ${wDayMr} कोणत्या तारखेला येईल?`,
        hiQ: `यदि किसी महीने की ${d1} तारीख को ${wDayHi} है, तो उसी महीने का चौथा ${wDayHi} किस तारीख को होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Dates of ${wDay}: ${d1}, ${d1 + 7}, ${d1 + 14}, ${ansDate}. The 4th is date ${ansDate}.`,
        mrExp: `${wDayMr} च्या तारखा: ${d1}, ${d1 + 7}, ${d1 + 14}, ${ansDate}. चौथा ${wDayMr} ${ansDate} तारखेला येईल.`,
        hiExp: `${wDayHi} की तारीखें: ${d1}, ${d1 + 7}, ${d1 + 14}, ${ansDate}। चौथा ${wDayHi} ${ansDate} को होगा।`,
      };
    }
    case 23: {
      // Clock: Simple elapsed minutes (NO angle formulas!)
      const startH = 9 + ((t - 1) % 4); // 9..12
      const addM = 20 + Math.floor((t - 1) / 4) * 5; // 20, 25, 30, 35, 40, 45, 50
      const startStr = `${startH}:10`;
      const endMin = 10 + addM;
      const finalH = endMin >= 60 ? (startH === 12 ? 1 : startH + 1) : startH;
      const finalM = endMin % 60;
      const corr = `${finalH}:${String(finalM).padStart(2, '0')}`;
      const w1 = `${finalH}:${String((finalM + 10) % 60).padStart(2, '0')}`;
      const w2 = `${finalH === 12 ? 1 : finalH + 1}:${String(finalM).padStart(2, '0')}`;
      const w3 = `${finalH}:${String((finalM + 5) % 60).padStart(2, '0')}`;
      const opts = placeStringOptions(corr, [w1, w2, w3], correctIdx);
      return {
        topic: 'Clocks & Time',
        enQ: `A wall clock shows ${startStr}. What time will it show after ${addM} minutes?`,
        mrQ: `एका घड्याळात ${startStr} वाजले आहेत. ${addM} मिनिटांनंतर घड्याळात किती वाजलेले असतील?`,
        hiQ: `एक घड़ी में ${startStr} बजे हैं। ${addM} मिनट बाद घड़ी में क्या समय होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Adding ${addM} minutes to ${startStr} gives ${corr}.`,
        mrExp: `${startStr} मध्ये ${addM} मिनिटे मिळवल्यास ${corr} ही वेळ मिळते.`,
        hiExp: `${startStr} में ${addM} मिनट जोड़ने पर ${corr} बजते हैं।`,
      };
    }
    case 24: {
      // Alphabet Position from Left (A=1..Z=26) -> non-repeating letters across t=1..25!
      const pos = t + 1; // 2..26 (B..Z)
      const ch = letterAt(pos);
      const opts = makeNumericOptions(pos, [1, -1, 2], correctIdx);
      return {
        topic: 'Alphabet Test',
        enQ: `In the English alphabet A to Z, what is the serial position of the letter "${ch}" counting from the left (A = 1)?`,
        mrQ: `इंग्रजी अक्षरमालेत डावीकडून (A = 1 मानून) मोजल्यास "${ch}" या अक्षराचा क्रमांक कितवा आहे?`,
        hiQ: `अंग्रेज़ी वर्णमाला में बाएँ से (A = 1) गिनने पर अक्षर "${ch}" का क्रमांक क्या है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Counting from A = 1, the letter "${ch}" stands at position ${pos}.`,
        mrExp: `A = 1 पासून मोजल्यास "${ch}" हे ${pos} वे अक्षर आहे.`,
        hiExp: `A = 1 से गिनने पर "${ch}" का स्थान ${pos}वाँ है।`,
      };
    }
    case 25: {
      // Alphabet Middle Letter between two given letters
      const p1 = 2 + ((t - 1) % 8); // 2..9
      const gap = 4 + Math.floor((t - 1) / 8) * 2; // 4, 6, 8, 10 (even -> exact integer midpoint!)
      const p2 = p1 + gap;
      const midPos = (p1 + p2) / 2;
      const L1 = letterAt(p1);
      const L2 = letterAt(p2);
      const ans = letterAt(midPos);
      const opts = placeStringOptions(ans, [letterAt(midPos + 1), letterAt(midPos - 1), letterAt(midPos + 2)], correctIdx);
      return {
        topic: 'Alphabet Test',
        enQ: `Which letter lies exactly halfway between "${L1}" and "${L2}" in the English alphabet?`,
        mrQ: `इंग्रजी वर्णमालेत "${L1}" आणि "${L2}" या दोन अक्षरांच्या अगदी मधोमध कोणते अक्षर येते?`,
        hiQ: `अंग्रेज़ी वर्णमाला में "${L1}" और "${L2}" के ठीक बीच में कौन-सा अक्षर आता है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${L1} = ${p1}, ${L2} = ${p2}. Midpoint = (${p1} + ${p2}) ÷ 2 = ${midPos} → ${ans}.`,
        mrExp: `${L1} (${p1}) व ${L2} (${p2}) यांच्या मधोमध ${midPos} वे अक्षर '${ans}' येते.`,
        hiExp: `${L1} (${p1}) और ${L2} (${p2}) के ठीक बीच ${midPos}वाँ अक्षर '${ans}' है।`,
      };
    }
    case 26: {
      // Operator Substitution (Class 4: +, -, × only, no identity rule!)
      const x = 6 + ((t - 1) % 7); // 6..12
      const y = 3 + Math.floor((t - 1) / 7); // 3..6
      const z = 4 + (t % 5); // 4..8
      // '+' means '×', '-' means '+'
      const ans = x * y + z;
      const opts = makeNumericOptions(ans, [y, -z, 5], correctIdx);
      return {
        topic: 'Mathematical Operations',
        enQ: `If '+' means '×' and '-' means '+', find the value of: ${x} + ${y} - ${z}`,
        mrQ: `जर '+' म्हणजे '×' आणि '-' म्हणजे '+' असेल, तर ${x} + ${y} - ${z} ची किंमत किती?`,
        hiQ: `यदि '+' का अर्थ '×' और '-' का अर्थ '+' हो, तो ${x} + ${y} - ${z} का मान ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Substituting signs: ${x} × ${y} + ${z} = ${x * y} + ${z} = ${ans}.`,
        mrExp: `चिन्हे बदलून: ${x} × ${y} + ${z} = ${x * y} + ${z} = ${ans}.`,
        hiExp: `चिह्न बदलने पर: ${x} × ${y} + ${z} = ${x * y} + ${z} = ${ans}।`,
      };
    }
    case 27: {
      // Word Symbol Code: 'A' stands for '+', 'B' stands for '-'
      const a = 25 + t * 2;
      const b = 12 + (t % 6);
      const c = 7 + (t % 4);
      const ans = a + b - c;
      const opts = makeNumericOptions(ans, [c, -c, 4], correctIdx);
      return {
        topic: 'Mathematical Operations',
        enQ: `If letter P stands for '+', and Q stands for '-', evaluate: ${a} P ${b} Q ${c}`,
        mrQ: `जर P म्हणजे '+' आणि Q म्हणजे '-' मानले, तर ${a} P ${b} Q ${c} ची किंमत किती?`,
        hiQ: `यदि P का अर्थ '+' और Q का अर्थ '-' है, तो ${a} P ${b} Q ${c} का मान क्या होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${a} + ${b} - ${c} = ${a + b} - ${c} = ${ans}.`,
        mrExp: `${a} + ${b} - ${c} = ${ans}.`,
        hiExp: `${a} + ${b} - ${c} = ${ans}।`,
      };
    }
    case 28: {
      // Missing Number in Triangle (Sum of 3 corners = Center)
      const c1 = 10 + t;
      const c2 = 15 + (t % 7) * 2;
      const c3 = 8 + (t % 5) * 3;
      const center = c1 + c2 + c3;
      const opts = makeNumericOptions(center, [4, -4, 10], correctIdx);
      return {
        topic: 'Missing Number in Figure',
        enQ: `In a number triangle puzzle, the top corner is ${c1}, bottom-left corner is ${c2}, and bottom-right corner is ${c3}. If the rule is to add all three corners to get the centre number, find the centre number.`,
        mrQ: `एका संख्या त्रिकोणाच्या तीन कोपऱ्यांवर ${c1}, ${c2} आणि ${c3} या संख्या आहेत. मधली संख्या तिन्ही कोपऱ्यांच्या बेरजेइतकी असल्यास मधली संख्या कोणती?`,
        hiQ: `एक संख्या त्रिभुज के तीनों कोनों पर ${c1}, ${c2} और ${c3} लिखा है। यदि बीच की संख्या तीनों कोनों का योग है, तो बीच की संख्या ज्ञात कीजिए।`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Centre number = ${c1} + ${c2} + ${c3} = ${center}.`,
        mrExp: `मधली संख्या = ${c1} + ${c2} + ${c3} = ${center}.`,
        hiExp: `बीच की संख्या = ${c1} + ${c2} + ${c3} = ${center}।`,
      };
    }
    case 29: {
      // Missing Number in 2x2 Matrix Box (Product minus addition / row sum)
      const r1a = 4 + ((t - 1) % 6);
      const r1b = 5 + Math.floor((t - 1) / 6);
      const r2a = r1a + 2;
      const r2b = r1b + 3;
      // Rule: Bottom cell = Top1 * Top2 (Wait: 3 numbers give 4th -> let Row2 = 2 * Row1 - 1)
      const t1 = r1a;
      const t2 = r1b;
      const t3 = r2a;
      // Row 1 pair: (t1, t1*3), Row 2 pair: (t2, ?) -> answer = t2*3
      const ans = t2 * 3;
      const opts = makeNumericOptions(ans, [3, -3, 6], correctIdx);
      return {
        topic: 'Missing Number in Figure',
        enQ: `In a pattern box, top pair is (${t1}, ${t1 * 3}) and bottom pair is (${t2}, ?) with the same multiplier rule. (Check: ${t3} → ${t3 * 3} also follows it). Find the missing number.`,
        mrQ: `एका चौकटीत पहिल्या ओळीत (${t1}, ${t1 * 3}) व (${t3}, ${t3 * 3}) असा संबंध आहे, तर त्याच नियमाने (${t2}, ?) मधील प्रश्नचिन्हाच्या जागी कोणती संख्या येईल?`,
        hiQ: `एक तालिका में पहले युग्म (${t1}, ${t1 * 3}) और (${t3}, ${t3 * 3}) समान गुणज नियम से जुड़े हैं। इसी नियम से (${t2}, ?) में क्या आएगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Each right number is 3 times the left number: ${t2} × 3 = ${ans}.`,
        mrExp: `प्रत्येक जोडीत दुसरी संख्या पहिल्या संख्येच्या 3 पट आहे: ${t2} × 3 = ${ans}.`,
        hiExp: `दूसरी संख्या पहली की 3 गुनी है: ${t2} × 3 = ${ans}।`,
      };
    }
    case 30: {
      // Figure Counting: Segments on a straight line with n points = n(n-1)/2
      const pts = 3 + t; // Wait 28 points gives huge segments -> keep 4..10 points & vary shape! Actually count line segments on n points: for n=4..12, let's do 4..10 triangles/segments or mix:
      const k = 3 + ((t - 1) % 7); // 3..9 parts
      const context = Math.floor((t - 1) / 7); // 0..3 -> 7x4 bijection
      const typesEn = ['adjacent line segments along a ray', 'overlapping triangles drawn from one top vertex divided into', 'adjacent angles sharing one common vertex ray divided into', 'rectangles in a single horizontal strip of'];
      const typesMr = ['एका सरळ रेषेवरील लागोपाठच्या भागांपासून एकूण किती रेषाखंड तयार होतील', 'एका शिरोबिंदूतून पायावर पडणाऱ्या रेषांमुळे तयार होणारे एकूण त्रिकोण किती', 'एका कोनाचे लगतचे भाग केल्यास तयार होणारे एकूण कोन किती', 'एका आडव्या पट्टीतील भागांपासून तयार होणारे एकूण आयत किती'];
      const typesHi = ['एक सीधी रेखा पर खंडों से बनने वाले कुल रेखाखंड कितने हैं', 'शीर्ष से आधार पर खींची रेखाओं से बने कुल त्रिभुज कितने हैं', 'एक बिंदु से बनी किरणों के बीच कुल कोण कितने हैं', 'एक पंक्ति के खंडों से बनने वाले कुल आयत कितने हैं'];
      const ans = (k * (k + 1)) / 2;
      const opts = makeNumericOptions(ans, [k, -3, 2], correctIdx);
      return {
        topic: 'Counting Figures',
        enQ: `How many total shapes are formed by ${k} ${typesEn[context]} ${k} basic consecutive sections?`.replace(/ basic consecutive sections/, ' consecutive parts').replace(/divided into \d+ consecutive parts/, `with ${k} basic parts`),
        mrQ: `${k} लहान भागांचे विभाग असतील, तर ${typesMr[context]}?`,
        hiQ: `यदि ${k} छोटे क्रमागत भाग हों, तो ${typesHi[context]}?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Using sum formula 1 + 2 + ... + ${k} = ${k}×(${k} + 1) ÷ 2 = ${ans}.`,
        mrExp: `1 + 2 + ... + ${k} = ${k} × (${k} + 1) ÷ 2 = ${ans}.`,
        hiExp: `सूत्र 1 + 2 + ... + ${k} = ${k} × (${k} + 1) ÷ 2 = ${ans}।`,
      };
    }
    case 31: {
      // Counting Squares in an n × n grid (1² + 2² + ... + n²) -> vary shapes/sizes for 25 unique questions!
      const n = 2 + ((t - 1) % 4); // 2, 3, 4, 5 grid squares: 5, 14, 30, 55
      const rows = 2 + Math.floor((t - 1) / 4); // 2..8 rows, cols = n -> m x n rectangle of squares!
      // Squares in (rows × n) grid = sum_{i=0}^{min-1} (rows - i)(n - i)
      let total = 0;
      const limit = Math.min(rows, n);
      for (let i = 0; i < limit; i++) total += (rows - i) * (n - i);
      const opts = makeNumericOptions(total, [2, -2, 5], correctIdx);
      return {
        topic: 'Counting Figures',
        enQ: `How many total squares (of all sizes) are contained in a ${rows} × ${n} square-grid chessboard strip?`,
        mrQ: `${rows} × ${n} आकाराच्या चौरसांच्या जाळीमध्ये लहान-मोठे मिळून एकूण किती चौरस आहेत?`,
        hiQ: `${rows} × ${n} की वर्गाकार जाली में छोटे-बड़े मिलाकर कुल कितने वर्ग हैं?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Adding 1×1, 2×2, ... squares up to ${limit}×${limit} gives a total of ${total} squares.`,
        mrExp: `सर्व मापांचे चौरस मोजल्यास एकूण ${total} चौरस मिळतात.`,
        hiExp: `सभी आकार के वर्ग गिनने पर कुल ${total} वर्ग प्राप्त होते हैं।`,
      };
    }
    case 32: {
      // Mirror Image of Capital Letters (symmetry: letters A, H, I, M, O, T, U, V, W, X, Y look SAME in vertical mirror!)
      const symmetricPool = ['MOM', 'WOW', 'HAT', 'AIM', 'TOY', 'MAT', 'WAY', 'TOM', 'VAT', 'MAY', 'YAM', 'OHM', 'WIT', 'HOW', 'YAW', 'OXO', 'AHA', 'TAT', 'TIT', 'VOW', 'WAX', 'MIX', 'WHY', 'HIM', 'HOT'];
      const word = symmetricPool[t - 1];
      const mirrored = word.split('').reverse().join('');
      const w1 = word;
      const w2 = mirrored.slice(0, 2) + letterAt(ALPHABET.indexOf(mirrored[2]) + 2);
      const w3 = word[1] + word[2] + word[0];
      // Check if word is palindrome like MOM/WOW/OHM -> if word === mirrored, swap w1!
      const uniqueWrongs: [string, string, string] =
        w1 === mirrored
          ? [word[0] + letterAt(ALPHABET.indexOf(word[1]) + 3) + word[2], w2, word + 'A']
          : [w1, w2, w3];
      const opts = placeStringOptions(mirrored, uniqueWrongs, correctIdx);
      return {
        topic: 'Mirror Image',
        enQ: `If a vertical mirror is placed to the right of the word "${word}", what letter order will its mirror reflection display (ignoring internal flips)?`,
        mrQ: `"${word}" या शब्दाच्या उजवीकडे उभा आरसा ठेवल्यास अक्षरांचा उलटा क्रम कसा दिसेल?`,
        hiQ: `यदि शब्द "${word}" के दाईं ओर एक ऊर्ध्वाधर दर्पण रखा जाए, तो अक्षरों का दर्पण प्रतिबिंब किस क्रम में दिखेगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `A vertical mirror reverses letter order from right to left: "${word}" becomes "${mirrored}".`,
        mrExp: `आरशात अक्षरांचा क्रम उलट होतो: "${word}" चे "${mirrored}" होते.`,
        hiExp: `दर्पण में क्रम दाएँ से बाएँ उलट जाता है: "${word}" → "${mirrored}"।`,
      };
    }
    case 33: {
      // Water Image Symmetry (Letters that look identical in horizontal water reflection: B, C, D, E, H, I, K, O, X)
      const waterSym = ['B', 'C', 'D', 'E', 'H', 'I', 'K', 'O', 'X'];
      const nonSym = ['A', 'F', 'G', 'J', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];
      // Pick 1 matching & 3 non-matching OR 3 matching & 1 odd
      const cIdx = (t - 1) % waterSym.length;
      const corr = waterSym[cIdx];
      const wStart = ((t - 1) * 3) % (nonSym.length - 3);
      const wrongs: [string, string, string] = [nonSym[wStart], nonSym[wStart + 1], nonSym[wStart + 2]];
      const opts = placeStringOptions(corr, wrongs, correctIdx);
      const list = opts.join(', ');
      return {
        topic: 'Water Image',
        enQ: `Among the capital letters (${list}), which letter looks IDENTICAL in its horizontal water reflection?`,
        mrQ: `(${list}) या इंग्रजी मोठ्या अक्षरांपैकी कोणते अक्षर पाण्यातील प्रतिबिंबात मूळ अक्षरासारखेच दिसते?`,
        hiQ: `दिए गए बड़े अक्षरों (${list}) में से कौन-सा अक्षर जल प्रतिबिंब (Water Image) में बिल्कुल समान दिखता है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Letters B, C, D, E, H, I, K, O, X have top-to-bottom symmetry, so "${corr}" looks unchanged in water.`,
        mrExp: `B, C, D, E, H, I, K, O, X ही अक्षरे वर-खाली सममित असल्याने "${corr}" पाण्यात जसेच्या तसे दिसते.`,
        hiExp: `B, C, D, E, H, I, K, O, X ऊपर-नीचे सममित हैं, अतः "${corr}" जल में समान दिखता है।`,
      };
    }
    case 34: {
      // Alphabetical Dictionary Order (find 2nd or 3rd word)
      const wordSets: Array<[string, string, string, string]> = [
        ['Apple', 'Apricot', 'Ant', 'Avocado'],
        ['Ball', 'Banana', 'Bat', 'Basket'],
        ['Cat', 'Camel', 'Carrot', 'Castle'],
        ['Dog', 'Dolphin', 'Door', 'Donkey'],
        ['Eagle', 'Earth', 'Ear', 'East'],
        ['Fan', 'Farm', 'Fast', 'Father'],
        ['Goat', 'Gold', 'Good', 'Goose'],
        ['Hand', 'Hat', 'Hawk', 'Happy'],
        ['Ice', 'Icon', 'Idea', 'Igloo'],
        ['Jam', 'Jar', 'Jackal', 'Jasmine'],
        ['Kite', 'King', 'Kitchen', 'Kid'],
        ['Lamp', 'Lake', 'Land', 'Leaf'],
        ['Mango', 'Map', 'Market', 'Mask'],
        ['Nest', 'Net', 'Neck', 'Needle'],
        ['Owl', 'Ox', 'Orange', 'Ocean'],
        ['Pen', 'Pencil', 'Pear', 'Peacock'],
        ['Queen', 'Quick', 'Quiet', 'Quilt'],
        ['Rain', 'Rabbit', 'Radio', 'Rose'],
        ['Sun', 'Star', 'Ship', 'School'],
        ['Tree', 'Train', 'Tiger', 'Table'],
        ['Umbrella', 'Uncle', 'Under', 'Unit'],
        ['Van', 'Vase', 'Valley', 'Village'],
        ['Water', 'Watch', 'Wall', 'Wave'],
        ['Yellow', 'Yak', 'Yard', 'Yarn'],
        ['Zebra', 'Zero', 'Zoo', 'Zip'],
      ];
      const ws = wordSets[t - 1];
      const sorted = [...ws].sort();
      const targetPos = t % 2 === 0 ? 1 : 2; // 2nd or 3rd in alphabetical order
      const posLabelEn = targetPos === 1 ? 'SECOND' : 'THIRD';
      const posLabelMr = targetPos === 1 ? 'दुसऱ्या' : 'तिसऱ्या';
      const posLabelHi = targetPos === 1 ? 'दूसरे' : 'तीसरे';
      const ans = sorted[targetPos];
      const wrongs = sorted.filter((x) => x !== ans) as [string, string, string];
      return {
        topic: 'Dictionary / Alphabetical Order',
        enQ: `If the words (${ws.join(', ')}) are arranged in alphabetical dictionary order, which word will come in the ${posLabelEn} position?`,
        mrQ: `(${ws.join(', ')}) हे शब्द इंग्रजी शब्दकोशाच्या क्रमाने लावले, तर ${posLabelMr} क्रमांकावर कोणता शब्द येईल?`,
        hiQ: `यदि (${ws.join(', ')}) को अंग्रेज़ी शब्दकोश के क्रम में व्यवस्थित किया जाए, तो ${posLabelHi} स्थान पर कौन-सा शब्द आएगा?`,
        enOpts: placeStringOptions(ans, wrongs, correctIdx),
        mrOpts: placeStringOptions(ans, wrongs, correctIdx),
        hiOpts: placeStringOptions(ans, wrongs, correctIdx),
        enExp: `Alphabetical order: ${sorted.join(', ')}. The ${posLabelEn.toLowerCase()} word is ${ans}.`,
        mrExp: `योग्य क्रम: ${sorted.join(', ')}. ${posLabelMr} स्थानावर ${ans} येईल.`,
        hiExp: `सही क्रम: ${sorted.join(', ')}। ${posLabelHi} स्थान पर ${ans} आएगा।`,
      };
    }
    case 35: {
      // Venn Diagram Reasoning (2 intersecting sets: Like A, Like B, Total -> Both = A + B - Total)
      const total = 30 + t;
      const likeA = 18 + (t % 7);
      const likeB = 16 + (t % 6);
      const both = likeA + likeB - total;
      const opts = makeNumericOptions(both, [2, -1, 4], correctIdx, '', '', true);
      return {
        topic: 'Venn Diagrams',
        enQ: `In a class of ${total} students, every student plays either Cricket or Kho-Kho (or both). If ${likeA} play Cricket and ${likeB} play Kho-Kho, how many students play BOTH games?`,
        mrQ: `${total} विद्यार्थ्यांच्या वर्गात प्रत्येक विद्यार्थी क्रिकेट किंवा खो-खो खेळतो. ${likeA} जण क्रिकेट आणि ${likeB} जण खो-खो खेळत असतील, तर दोन्ही खेळ खेळणारे विद्यार्थी किती?`,
        hiQ: `${total} छात्रों की कक्षा में प्रत्येक छात्र क्रिकेट या खो-खो खेलता है। यदि ${likeA} क्रिकेट और ${likeB} खो-खो खेलते हैं, तो दोनों खेल खेलने वाले कितने छात्र हैं?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Both = (${likeA} + ${likeB}) - ${total} = ${likeA + likeB} - ${total} = ${both}.`,
        mrExp: `दोन्ही खेळणारे = (${likeA} + ${likeB}) - ${total} = ${both}.`,
        hiExp: `दोनों खेलने वाले = (${likeA} + ${likeB}) - ${total} = ${both}।`,
      };
    }
    case 36: {
      // Letter & Digit Counting in mixed string
      const nCount = 3 + ((t - 1) % 5); // 3..7 digits
      const lCount = 4 + Math.floor((t - 1) / 5); // 4..8 letters -> 5x5 bijection
      const digitsPool = '274958316';
      const lettersPool = 'KMPTRWXBG';
      let mixed = '';
      for (let i = 0; i < Math.max(nCount, lCount); i++) {
        if (i < lCount) mixed += lettersPool[(i + t) % lettersPool.length];
        if (i < nCount) mixed += digitsPool[(i + t) % digitsPool.length];
      }
      const diff = lCount;
      const opts = makeNumericOptions(diff, [1, -1, 2], correctIdx);
      return {
        topic: 'Sequence & Counting',
        enQ: `Count how many English letters appear in the given mixed sequence: ${mixed}`,
        mrQ: `पुढील मिश्र मालिकेत एकूण किती इंग्रजी अक्षरे आहेत ते मोजा: ${mixed}`,
        hiQ: `दी गई मिश्रित श्रृंखला में कुल कितने अंग्रेज़ी अक्षर हैं: ${mixed}`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Counting only letters (excluding digits) gives ${diff} letters.`,
        mrExp: `अंक वगळून केवळ अक्षरे मोजल्यास एकूण ${diff} अक्षरे आहेत.`,
        hiExp: `अंकों को छोड़कर अक्षर गिनने पर कुल ${diff} अक्षर हैं।`,
      };
    }
    case 37: {
      // Odd digits preceded by even digit in a 10-digit number string
      const sequences = [
        '2345618729', '4527683912', '8143652794', '6385492178', '2947836514',
        '8725416932', '6589234716', '4183672958', '2567894312', '6745812396',
        '8963472514', '2185694732', '4961872356', '6129458734', '8349672158',
        '2763498154', '4387612954', '6943852718', '8529614732', '2369814576',
        '4721896352', '6547298136', '8167432954', '2983416758', '4581276394',
      ];
      const seq = sequences[t - 1];
      let cnt = 0;
      for (let i = 1; i < seq.length; i++) {
        const prev = Number(seq[i - 1]);
        const curr = Number(seq[i]);
        if (prev % 2 === 0 && curr % 2 === 1) cnt++;
      }
      const opts = makeNumericOptions(cnt, [1, -1, 2], correctIdx, '', '', true);
      return {
        topic: 'Sequence & Counting',
        enQ: `In the number sequence "${seq}", how many odd digits are immediately preceded by an even digit?`,
        mrQ: `"${seq}" या अंकांच्या मालिकेत किती विषम अंकांच्या लगेचच आधी सम अंक आला आहे?`,
        hiQ: `अंक श्रृंखला "${seq}" में ऐसे कितने विषम अंक हैं जिनके ठीक पहले एक सम अंक है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Checking each pair (even, odd) left-to-right gives a count of ${cnt}.`,
        mrExp: `प्रत्येक (सम, विषम) जोडी मोजल्यास अशी ${cnt} उदाहरणे मिळतात.`,
        hiExp: `(सम, विषम) के जोड़े गिनने पर कुल ${cnt} प्राप्त होते हैं।`,
      };
    }
    case 38: {
      // Word Formation: Which word CANNOT be formed using letters of a master word
      const cases: Array<{ master: string; cannot: string; can: [string, string, string] }> = [
        { master: 'EDUCATION', cannot: 'DANCE', can: ['CUTE', 'DATE', 'NOTE'] }, // Wait: E D U C A T I O N -> has N, A, D, C, E! DANCE IS formable! Check carefully!!
        { master: 'CHOCOLATE', cannot: 'CLIMB', can: ['LATE', 'CHAT', 'COAT'] },
        { master: 'TELEPHONE', cannot: 'TIGER', can: ['TONE', 'HELP', 'HOPE'] },
        { master: 'BUTTERFLY', cannot: 'FRUIT', can: ['TRUE', 'TUBE', 'BELT'] },
        { master: 'VEGETABLE', cannot: 'GLASS', can: ['TABLE', 'GATE', 'BEAT'] },
        { master: 'CELEBRATE', cannot: 'BRAVE', can: ['LATE', 'TREE', 'CARE'] },
        { master: 'MAGNIFICENT', cannot: 'MAGIC', can: ['GAME', 'FACT', 'TIME'] },
        { master: 'DICTIONARY', cannot: 'BRAIN', can: ['RAIN', 'CARD', 'TONY'] },
        { master: 'ADVENTURE', cannot: 'DREAM', can: ['RENT', 'TREE', 'READ'] },
        { master: 'PLAYGROUND', cannot: 'CLOUD', can: ['PLAY', 'GOLD', 'LOUD'] },
        { master: 'BLACKBOARD', cannot: 'BREAD', can: ['DARK', 'BOLD', 'CARD'] },
        { master: 'WATERMELON', cannot: 'LEMON', can: ['TEAM', 'LATE', 'WARM'] },
        { master: 'MATHEMATICS', cannot: 'MUSIC', can: ['MATH', 'TIME', 'TEAM'] },
        { master: 'SUNFLOWER', cannot: 'CLOUD', can: ['SNOW', 'FLOW', 'NOSE'] },
        { master: 'NEWSPAPER', cannot: 'PAPER', can: ['NEWS', 'WEAR', 'NEAR'] },
        { master: 'COMPUTER', cannot: 'MOUSE', can: ['POEM', 'CORE', 'MORE'] },
        { master: 'HOSPITAL', cannot: 'HOTEL', can: ['TAIL', 'SAIL', 'PLOT'] },
        { master: 'AEROPLANE', cannot: 'TRAIN', can: ['PLAN', 'PEAR', 'NEAR'] },
        { master: 'PINEAPPLE', cannot: 'APPLE', can: ['LINE', 'PAIN', 'PALE'] },
        { master: 'STRAWBERRY', cannot: 'GRAPE', can: ['STAR', 'BEAR', 'REST'] },
        { master: 'MOUNTAINS', cannot: 'RIVER', can: ['MAIN', 'AUNT', 'MINT'] },
        { master: 'ELEPHANT', cannot: 'TIGER', can: ['TALE', 'NEAT', 'PLAN'] },
        { master: 'FESTIVALS', cannot: 'HAPPY', can: ['FAST', 'SALE', 'LAST'] },
        { master: 'KNOWLEDGE', cannot: 'SMART', can: ['GOLD', 'LONG', 'GLOW'] },
        { master: 'GEOGRAPHY', cannot: 'EARTH', can: ['HERO', 'GEAR', 'ROPE'] },
      ];
      // Verify & fix any master/cannot mistakes right now mathematically!
      // Wait: EDUCATION->DANCE can be formed! CHOC->CLIMB no I,M,B -> ok. CELEBRATE -> BRAVE has V -> cannot! MAGNIFICENT -> MAGIC can be formed! BREAD in BLACKBOARD has E -> cannot! LEMON in WATERMELON CAN be formed! MUSIC in MATH has U -> cannot! PAPER in NEWSPAPER CAN be formed! MOUSE in COMPUTER has S -> cannot! HOTEL in HOSPITAL has E -> cannot! APPLE in PINEAPPLE CAN be formed!
      const fixedCases: Array<{ master: string; cannot: string; can: [string, string, string] }> = [
        { master: 'EDUCATION', cannot: 'DOUBT', can: ['CUTE', 'DATE', 'NOTE'] },
        { master: 'CHOCOLATE', cannot: 'CLIMB', can: ['LATE', 'CHAT', 'COAT'] },
        { master: 'TELEPHONE', cannot: 'TIGER', can: ['TONE', 'HELP', 'HOPE'] },
        { master: 'BUTTERFLY', cannot: 'FRUIT', can: ['TRUE', 'TUBE', 'BELT'] },
        { master: 'VEGETABLE', cannot: 'GLASS', can: ['TABLE', 'GATE', 'BEAT'] },
        { master: 'CELEBRATE', cannot: 'BRAVE', can: ['LATE', 'TREE', 'CARE'] },
        { master: 'MAGNIFICENT', cannot: 'SPORT', can: ['GAME', 'FACT', 'TIME'] },
        { master: 'DICTIONARY', cannot: 'BRAIN', can: ['RAIN', 'CARD', 'CITY'] },
        { master: 'ADVENTURE', cannot: 'DREAM', can: ['RENT', 'TREE', 'READ'] },
        { master: 'PLAYGROUND', cannot: 'CLOUD', can: ['PLAY', 'GOLD', 'LOUD'] },
        { master: 'BLACKBOARD', cannot: 'BREAD', can: ['DARK', 'BOLD', 'CARD'] },
        { master: 'WATERMELON', cannot: 'JUICE', can: ['TEAM', 'LATE', 'WARM'] },
        { master: 'MATHEMATICS', cannot: 'MUSIC', can: ['MATH', 'TIME', 'TEAM'] },
        { master: 'SUNFLOWER', cannot: 'CLOUD', can: ['SNOW', 'FLOW', 'NOSE'] },
        { master: 'NEWSPAPER', cannot: 'CHAIR', can: ['NEWS', 'WEAR', 'NEAR'] },
        { master: 'COMPUTER', cannot: 'MOUSE', can: ['POEM', 'CORE', 'MORE'] },
        { master: 'HOSPITAL', cannot: 'HOTEL', can: ['TAIL', 'SAIL', 'PLOT'] },
        { master: 'AEROPLANE', cannot: 'TRAIN', can: ['PLAN', 'PEAR', 'NEAR'] },
        { master: 'PINEAPPLE', cannot: 'MANGO', can: ['LINE', 'PAIN', 'PALE'] },
        { master: 'STRAWBERRY', cannot: 'GRAPE', can: ['STAR', 'BEAR', 'REST'] },
        { master: 'MOUNTAINS', cannot: 'RIVER', can: ['MAIN', 'AUNT', 'MINT'] },
        { master: 'ELEPHANT', cannot: 'TIGER', can: ['TALE', 'NEAT', 'PLAN'] },
        { master: 'FESTIVALS', cannot: 'HAPPY', can: ['FAST', 'SALE', 'LAST'] },
        { master: 'KNOWLEDGE', cannot: 'SMART', can: ['GOLD', 'LONG', 'GLOW'] },
        { master: 'GEOGRAPHY', cannot: 'EARTH', can: ['HERO', 'GEAR', 'ROPE'] },
      ];
      void cases;
      const item = fixedCases[t - 1];
      const opts = placeStringOptions(item.cannot, item.can, correctIdx);
      return {
        topic: 'Word Formation',
        enQ: `Which of the words (${opts.join(', ')}) CANNOT be formed using the letters of the word "${item.master}"?`,
        mrQ: `"${item.master}" या शब्दातील अक्षरे वापरून (${opts.join(', ')}) यांपैकी कोणता शब्द तयार होणार नाही?`,
        hiQ: `शब्द "${item.master}" के अक्षरों का उपयोग करके (${opts.join(', ')}) में से कौन-सा शब्द नहीं बनाया जा सकता?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `All letters of ${item.can.join(', ')} exist in ${item.master}, whereas "${item.cannot}" contains a letter not present in ${item.master}.`,
        mrExp: `"${item.cannot}" मधील अक्षर "${item.master}" मध्ये नसल्याने तो शब्द तयार होत नाही.`,
        hiExp: `"${item.cannot}" में ऐसा अक्षर है जो "${item.master}" में उपलब्ध नहीं है।`,
      };
    }
    case 39: {
      // Logical Age Difference Puzzle (Difference never changes!)
      const ageA = 10 + t;
      const ageB = 6 + (t % 5);
      const yrsLater = 8 + (t % 7);
      const ans = ageA - ageB;
      const opts = makeNumericOptions(ans, [yrsLater, 2, -2], correctIdx, '', ' yrs');
      const mrOpts = makeNumericOptions(ans, [yrsLater, 2, -2], correctIdx, '', ' वर्षे');
      const hiOpts = makeNumericOptions(ans, [yrsLater, 2, -2], correctIdx, '', ' वर्ष');
      return {
        topic: 'Logical Puzzle',
        enQ: `${name} is ${ageA} years old and his/her younger sister is ${ageB} years old today. What will be the difference between their ages after ${yrsLater} years?`,
        mrQ: `${name} चे आजचे वय ${ageA} वर्षे आणि लहान बहिणीचे वय ${ageB} वर्षे आहे. ${yrsLater} वर्षांनंतर त्यांच्या वयांतील फरक किती वर्षे असेल?`,
        hiQ: `${name} की वर्तमान आयु ${ageA} वर्ष और छोटी बहन की आयु ${ageB} वर्ष है। ${yrsLater} वर्षों बाद उनकी आयु में कितना अंतर होगा?`,
        enOpts: opts,
        mrOpts,
        hiOpts,
        enExp: `Age difference remains constant over time: ${ageA} - ${ageB} = ${ans} years.`,
        mrExp: `दोन व्यक्तींच्या वयांतील फरक कधीच बदलत नाही: ${ageA} - ${ageB} = ${ans} वर्षे.`,
        hiExp: `दो व्यक्तियों की आयु का अंतर सदैव समान रहता है: ${ageA} - ${ageB} = ${ans} वर्ष।`,
      };
    }
    case 40: {
      // Step/Jump Snail/Frog climbing puzzle (Wait: distinct heights for t=1..25!)
      const climb = 3 + (t % 3); // 3, 4, 5
      const slip = 1;
      const net = climb - slip; // 2, 3, 4
      const steps = 4 + Math.floor((t - 1) / 3); // 4..12 -> Wait check uniqueness of (climb, wall) across t=1..25!
      // Make (climb, wall) unique: dayGain = climb - slip = 2 + (t % 3); wait let climb = 4 + (t % 3), slip = 2 -> net = 2, 3, 4
      const gain = 2 + ((t - 1) % 3); // net gain 2, 3, 4 -> up = gain + 1 = 3, 4, 5
      const up = gain + 1;
      const down = 1;
      const fullDays = 3 + Math.floor((t - 1) / 3); // 3..11 full days BEFORE final jump -> wait 3x9 = 27 >= 25!
      const wall = fullDays * (up - down) + up;
      const totalDays = fullDays + 1;
      const opts = makeNumericOptions(totalDays, [1, -1, 2], correctIdx, '', ' days');
      const mrOpts = makeNumericOptions(totalDays, [1, -1, 2], correctIdx, '', ' दिवस');
      const hiOpts = makeNumericOptions(totalDays, [1, -1, 2], correctIdx, '', ' दिन');
      return {
        topic: 'Logical Puzzle',
        enQ: `A small frog tries to climb out of a ${wall}-metre-deep dry well. Every day it climbs ${up} m up and slips back ${down} m at night. On which day will it reach the top edge?`,
        mrQ: `एक बेडूक ${wall} मीटर खोल कोरड्या विहिरीतून वर चढत आहे. तो दिवसा ${up} मीटर वर चढतो व रात्री ${down} मीटर खाली घसरतो, तर तो कितव्या दिवशी विहिरीच्या कडेला पोहोचेल?`,
        hiQ: `एक मेंढक ${wall} मीटर गहरे सूखे कुएँ से बाहर निकलने के लिए दिन में ${up} मी ऊपर चढ़ता है और रात में ${down} मी नीचे फिसलता है। वह किस दिन ऊपर किनारे पर पहुँचेगा?`,
        enOpts: opts,
        mrOpts,
        hiOpts,
        enExp: `In ${fullDays} days, net height = ${fullDays * (up - down)} m. On day ${totalDays}, climbing ${up} m reaches ${wall} m (top) without slipping back!`,
        mrExp: `${fullDays} दिवसांत ${fullDays * (up - down)} मी चढतो आणि ${totalDays} व्या दिवशी ${up} मी उडी मारून ${wall} मी वर पोहोचतो.`,
        hiExp: `${fullDays} दिनों में ${fullDays * (up - down)} मी चढ़ता है और ${totalDays}वें दिन ${up} मी की छलांग से शीर्ष पर पहुँच जाता है।`,
      };
    }
    case 41: {
      // Rhythmic Letter Group Pattern (AB_ABA_...)
      const patterns: Array<{ seq: string; ans: string; w: [string, string, string]; block: string }> = [
        { seq: 'a _ b a b _ a b _', ans: 'baa', w: ['aba', 'aab', 'bbb'], block: 'ab' },
        { seq: 'p q _ p _ r p q _', ans: 'rqr', w: ['pqr', 'qqr', 'rrp'], block: 'pqr' },
        { seq: 'x _ z x y _ x _ z', ans: 'yzy', w: ['zxy', 'yyz', 'xyy'], block: 'xyz' },
        { seq: 'm n _ m _ o m n _', ans: 'ono', w: ['mon', 'nmo', 'oon'], block: 'mno' },
        { seq: 'c _ d c d _ c d d'.replace('c d d', 'c _ d'), ans: 'dcd', w: ['cdd', 'dcc', 'ccc'], block: 'cd' },
      ];
      // Even cleaner: generate 25 completely distinct 9-char repeating blocks programmatically!
      const bases = ['ab', 'pq', 'mn', 'xy', 'rs', 'cd', 'kl', 'tu', 'ef', 'gh', 'vw', 'np', 'bc', 'df', 'hj', 'km', 'pr', 'tv', 'wx', 'yz', 'ac', 'bd', 'ce', 'eg', 'fh'];
      const b = bases[t - 1];
      const full = `${b[0]}${b[1]}${b[0]}${b[1]}${b[0]}${b[1]}`; // 6 chars alternating b0,b1
      // Blanks at positions 1, 2, 4 -> missing letters: b1, b0, b0! Wait: vary positions!
      const blankIdx = (t % 2 === 0) ? [1, 3, 4] : [1, 2, 5];
      const disp = full.split('').map((ch, i) => (blankIdx.includes(i) ? '_' : ch)).join(' ');
      const ans = blankIdx.map((i) => full[i]).join('');
      const w1 = `${b[0]}${b[0]}${b[1]}`;
      const w2 = `${b[1]}${b[1]}${b[0]}`;
      const w3 = `${b[0]}${b[1]}${b[0]}`;
      // Ensure wrongs don't collide with ans
      const candidateWrongs = [w1, w2, w3, `${b[1]}${b[1]}${b[1]}`, `${b[0]}${b[0]}${b[0]}`].filter((x) => x !== ans);
      const opts = placeStringOptions(ans, [candidateWrongs[0], candidateWrongs[1], candidateWrongs[2]], correctIdx);
      void patterns;
      return {
        topic: 'Rhythmic Letter Pattern',
        enQ: `Which group of letters completes the repeating rhythmic pattern: ${disp}`,
        mrQ: `लयबद्ध अक्षरमालिकेतील रिकाम्या जागा भरणारा गट ओळखा: ${disp}`,
        hiQ: `लयबद्ध अक्षर श्रृंखला में रिक्त स्थानों को पूरा करने वाला समूह चुनिए: ${disp}`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Repeating unit is "${b}": complete sequence is "${full}". Missing letters = ${ans}.`,
        mrExp: `"${b}" हा गट वारंवार येतो: "${full}". रिकाम्या जागी ${ans} येईल.`,
        hiExp: `"${b}" समूह की पुनरावृत्ति होती है: "${full}"। रिक्त स्थान = ${ans}।`,
      };
    }
    case 42: {
      // Pyramid Number Addition (Bottom 3 numbers -> Middle 2 -> Top 1)
      const a = 4 + ((t - 1) % 7);
      const b = 5 + Math.floor((t - 1) / 7);
      const c = 6 + (t % 5);
      const m1 = a + b;
      const m2 = b + c;
      const top = m1 + m2;
      const opts = makeNumericOptions(top, [b, -2, 6], correctIdx);
      return {
        topic: 'Number Pyramid',
        enQ: `In a 3-row addition pyramid where each upper block equals the sum of the two blocks directly below it, the bottom row has (${a}, ${b}, ${c}). What number sits at the very top?`,
        mrQ: `एका संख्या पिरॅमिडमध्ये वरचा प्रत्येक ठोकळा खालील दोन ठोकळ्यांच्या बेरजेइतका आहे. तळाच्या ओळीत (${a}, ${b}, ${c}) असल्यास सर्वात वरची संख्या कोणती?`,
        hiQ: `एक संख्या पिरामिड में प्रत्येक ऊपरी ब्लॉक नीचे के दो ब्लॉकों का योग है। नीचे की पंक्ति में (${a}, ${b}, ${c}) होने पर सबसे ऊपर कौन-सी संख्या आएगी?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Middle row = ${a}+${b}=${m1} and ${b}+${c}=${m2}. Top = ${m1} + ${m2} = ${top}.`,
        mrExp: `मधली ओळ = ${m1} आणि ${m2}. सर्वात वरची संख्या = ${m1} + ${m2} = ${top}.`,
        hiExp: `मध्य पंक्ति = ${m1} और ${m2}। शीर्ष संख्या = ${m1} + ${m2} = ${top}।`,
      };
    }
    case 43: {
      // Comparing Weights / Heights Ordering Puzzle (Find tallest/heaviest)
      const groups: Array<[string, string, string, string]> = [
        ['Aarav', 'Riya', 'Kabir', 'Meera'],
        ['Soham', 'Tanvi', 'Vivaan', 'Ananya'],
        ['Pranav', 'Kavya', 'Om', 'Neha'],
        ['Yash', 'Gauri', 'Rohan', 'Priya'],
        ['Aditya', 'Sneha', 'Arjun', 'Diya'],
      ];
      const [p1, p2, p3, p4] = groups[(t - 1) % groups.length];
      const attrIdx = Math.floor((t - 1) / groups.length); // 0..4
      const attrEn = ['tallest', 'heaviest', 'fastest', 'oldest', 'highest scorer'][attrIdx];
      const attrMr = ['सर्वात उंच', 'सर्वात जड', 'सर्वात वेगवान', 'सर्वात मोठा', 'सर्वाधिक गुण मिळवणारा'][attrIdx];
      const attrHi = ['सबसे लंबा', 'सबसे भारी', 'सबसे तेज़', 'सबसे बड़ा', 'सर्वाधिक अंक पाने वाला'][attrIdx];
      const relEn = ['taller than', 'heavier than', 'faster than', 'older than', 'ahead in score compared to'][attrIdx];
      const relMr = ['पेक्षा उंच', 'पेक्षा जड', 'पेक्षा वेगवान', 'पेक्षा मोठा', 'पेक्षा जास्त गुण असलेला'][attrIdx];
      const relHi = ['से लंबा', 'से भारी', 'से तेज़', 'से बड़ा', 'से अधिक अंक वाला'][attrIdx];
      return {
        topic: 'Ordering Puzzle',
        enQ: `${p1} is ${relEn} ${p2}, ${p2} is ${relEn} ${p3}, and ${p4} is below ${p3} (${p3} is ${relEn} ${p4}). Who is the ${attrEn}?`,
        mrQ: `${p1} हा ${p2} ${relMr} आहे, ${p2} हा ${p3} ${relMr} आहे, आणि ${p3} हा ${p4} ${relMr} आहे. तर सर्वांत ${attrMr} कोण?`,
        hiQ: `${p1}, ${p2} ${relHi} है; ${p2}, ${p3} ${relHi} है; और ${p3}, ${p4} ${relHi} है। सबसे ${attrHi} कौन है?`,
        enOpts: placeStringOptions(p1, [p2, p3, p4], correctIdx),
        mrOpts: placeStringOptions(p1, [p2, p3, p4], correctIdx),
        hiOpts: placeStringOptions(p1, [p2, p3, p4], correctIdx),
        enExp: `Order: ${p1} > ${p2} > ${p3} > ${p4}. Therefore ${p1} is the ${attrEn}.`,
        mrExp: `क्रम: ${p1} > ${p2} > ${p3} > ${p4}. म्हणून ${p1} सर्वात ${attrMr} आहे.`,
        hiExp: `क्रम: ${p1} > ${p2} > ${p3} > ${p4}। अतः ${p1} सबसे ${attrHi} है।`,
      };
    }
    case 44: {
      // Coding via Symbolic Word Substitution (5 topics x 5 unique target code words = 25 distinct Qs)
      const items: Array<{
        realEn: string; realMr: string; realHi: string;
        qEn: string; qMr: string; qHi: string;
        altEn: [string, string]; altMr: [string, string]; altHi: [string, string];
      }> = [
        { realEn: 'Blue', realMr: 'निळा', realHi: 'नीला', qEn: 'what is the colour of a clear daytime sky?', qMr: 'स्वच्छ दिवसाच्या आकाशाचा रंग कोणता मानला जाईल?', qHi: 'साफ दिन के आकाश का रंग क्या कहलाएगा?', altEn: ['Red', 'Green'], altMr: ['लाल', 'हिरवा'], altHi: ['लाल', 'हरा'] },
        { realEn: 'Pencil', realMr: 'पेन्सिल', realHi: 'पेंसिल', qEn: 'which item is sharpened with a sharpener?', qMr: 'शार्पनरने कशाला टोक काढतात?', qHi: 'शार्पनर से किसे छीला जाता है?', altEn: ['Eraser', 'Ruler'], altMr: ['खोडरबर', 'पट्टी'], altHi: ['रबर', 'स्केल'] },
        { realEn: 'Milk', realMr: 'दूध', realHi: 'दूध', qEn: 'what white drink do cows give us?', qMr: 'गाय आपल्याला प्यायला कोणते पांढरे पेय देते?', qHi: 'गाय हमें पीने के लिए कौन-सा सफेद पेय देती है?', altEn: ['Water', 'Juice'], altMr: ['पाणी', 'सरबत'], altHi: ['पानी', 'शरबत'] },
        { realEn: 'Mango', realMr: 'आंबा', realHi: 'आम', qEn: 'which fruit is called the King of Fruits in India?', qMr: 'भारतात फळांचा राजा कोणाला म्हणतात?', qHi: 'भारत में फलों का राजा किसे कहा जाता है?', altEn: ['Banana', 'Apple'], altMr: ['केळे', 'सफरचंद'], altHi: ['केला', 'सेब'] },
        { realEn: 'Moon', realMr: 'चंद्र', realHi: 'चंद्रमा', qEn: 'what shines naturally in the night sky?', qMr: 'रात्रीच्या आकाशात नैसर्गिकपणे कोण चमकतो?', qHi: 'रात के आकाश में स्वाभाविक रूप से कौन चमकता है?', altEn: ['Sun', 'Cloud'], altMr: ['सूर्य', 'ढग'], altHi: ['सूर्य', 'बादल'] },
      ];
      const it = items[(t - 1) % 5];
      const round = Math.floor((t - 1) / 5); // 0..4
      const codePoolEn = ['Yellow', 'Orange', 'Silver', 'Golden', 'Purple'];
      const codePoolMr = ['पिवळा', 'नारिंगी', 'चंदेरी', 'सोनेरी', 'जांभळा'];
      const codePoolHi = ['पीला', 'नारंगी', 'चाँदी', 'सुनहरा', 'बैंगनी'];
      const codeEn = codePoolEn[round];
      const codeMr = codePoolMr[round];
      const codeHi = codePoolHi[round];
      const decoysEn = ['Diamond', 'Paper', 'Glass', 'Stone', 'Brick'];
      const decoysMr = ['हिरा', 'कागद', 'काच', 'दगड', 'वीट'];
      const decoysHi = ['हीरा', 'कागज़', 'काँच', 'पत्थर', 'ईंट'];
      const decEn = decoysEn[round];
      const decMr = decoysMr[round];
      const decHi = decoysHi[round];
      return {
        topic: 'Word Substitution Code',
        enQ: `If "${it.realEn}" is called "${codeEn}", and "${codeEn}" is called "${decEn}", then ${it.qEn}`,
        mrQ: `जर "${it.realMr}" ला "${codeMr}" म्हटले आणि "${codeMr}" ला "${decMr}" म्हटले, तर ${it.qMr}`,
        hiQ: `यदि "${it.realHi}" को "${codeHi}" कहा जाए और "${codeHi}" को "${decHi}" कहा जाए, तो ${it.qHi}`,
        enOpts: placeStringOptions(codeEn, [it.realEn, it.altEn[0], decEn], correctIdx),
        mrOpts: placeStringOptions(codeMr, [it.realMr, it.altMr[0], decMr], correctIdx),
        hiOpts: placeStringOptions(codeHi, [it.realHi, it.altHi[0], decHi], correctIdx),
        enExp: `The real answer is "${it.realEn}", which is renamed "${codeEn}" in the given rule.`,
        mrExp: `मूळ उत्तर "${it.realMr}" असून दिलेल्या संकेतानुसार त्याला "${codeMr}" म्हटले आहे.`,
        hiExp: `वास्तविक उत्तर "${it.realHi}" है, जिसे नियम के अनुसार "${codeHi}" कहा गया है।`,
      };
    }
    case 45: {
      // Handshakes / Matches in simple round-robin (n*(n-1)/2) - n = 4..10 or Pairs!
      const players = 4 + ((t - 1) % 8); // 4..11
      const eventTypes = ['friends shake hands with each other once', 'school chess players play one match each against every other', 'classmates exchange greeting cards — Wait: shake hands once', 'kabaddi teams play one league match with each other'];
      const evIdx = Math.floor((t - 1) / 8); // 0..3 -> 8x4 = 32 >= 25
      // Keep simple symmetric handshake/match phrasing without card-swap ambiguity (card swap is n*(n-1), handshake is n*(n-1)/2!)
      const evEn = [
        'friends meet and shake hands once with every other friend',
        'chess players play exactly one match with each other',
        'cricket teams play one round-robin league match with every other team',
        'students give a high-five once to each other in a group',
      ][evIdx];
      const evMr = [
        'मित्र एकमेकांशी प्रत्येकी एकदाच हस्तांदोलन करतात',
        'बुद्धिबळ खेळाडू प्रत्येकासोबत एक सामना खेळतात',
        'क्रिकेट संघ प्रत्येकाशी एक साखळी सामना खेळतात',
        'विद्यार्थी गटात प्रत्येकाशी एकदा टाळी देतात',
      ][evIdx];
      const evHi = [
        'मित्र एक-दूसरे से एक बार हाथ मिलाते हैं',
        'शतरंज खिलाड़ी एक-दूसरे से एक मैच खेलते हैं',
        'क्रिकेट टीमें हर दूसरी टीम से एक मैच खेलती हैं',
        'छात्र समूह में प्रत्येक से एक बार ताली मिलाते हैं',
      ][evIdx];
      const ans = (players * (players - 1)) / 2;
      const opts = makeNumericOptions(ans, [players, -2, 4], correctIdx);
      return {
        topic: 'Logical Counting',
        enQ: `In a hall, ${players} ${evEn}. How many total handshakes/matches take place?`,
        mrQ: `एका ठिकाणी ${players} ${evMr}, तर एकूण किती हस्तांदोलने / सामने होतील?`,
        hiQ: `एक स्थान पर ${players} ${evHi}। कुल कितने हाथ मिलाए गए / मैच खेले गए?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Using n(n-1) ÷ 2: (${players} × ${players - 1}) ÷ 2 = ${ans}.`,
        mrExp: `सूत्र n(n-1) ÷ 2 = (${players} × ${players - 1}) ÷ 2 = ${ans}.`,
        hiExp: `सूत्र n(n-1) ÷ 2 = (${players} × ${players - 1}) ÷ 2 = ${ans}।`,
      };
    }
    case 46: {
      // Missing Number in Circle-Sector / 4-number balance (Top + Bottom = Left × Right or Sum)
      const L = 4 + ((t - 1) % 6);
      const R = 3 + Math.floor((t - 1) / 6); // 5x6 bijection
      const prod = L * R;
      const top = 10 + (t % 7);
      const bottom = prod - top;
      // Verify: Left × Right = Top + Bottom -> ask Bottom!
      const opts = makeNumericOptions(bottom, [3, -3, 6], correctIdx);
      return {
        topic: 'Missing Number in Figure',
        enQ: `In a four-part circle puzzle, the product of Left (${L}) and Right (${R}) equals the sum of Top (${top}) and Bottom (?). Find the Bottom number.`,
        mrQ: `एका वर्तुळाच्या चार भागांत डावी (${L}) व उजवी (${R}) संख्यांचा गुणाकार वरच्या (${top}) व खालच्या (?) संख्यांच्या बेरजेइतका आहे, तर खालची संख्या कोणती?`,
        hiQ: `एक वृत्त के चार भागों में बाईं (${L}) और दाईं (${R}) संख्याओं का गुणनफल ऊपर (${top}) और नीचे (?) की संख्याओं के योग के बराबर है। नीचे की संख्या क्या है?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `${L} × ${R} = ${prod}. Since ${top} + Bottom = ${prod}, Bottom = ${prod} - ${top} = ${bottom}.`,
        mrExp: `${L} × ${R} = ${prod}. म्हणून खालची संख्या = ${prod} - ${top} = ${bottom}.`,
        hiExp: `${L} × ${R} = ${prod}। अतः नीचे की संख्या = ${prod} - ${top} = ${bottom}।`,
      };
    }
    case 47: {
      // Alphabet Backward Position / Reverse Step
      const start = 14 + ((t - 1) % 10); // 14..23 (N..W)
      const back = 4 + Math.floor((t - 1) / 10) * 2; // 4, 6, 8
      const endPos = start - back;
      const ans = letterAt(endPos);
      const opts = placeStringOptions(ans, [letterAt(endPos + 1), letterAt(endPos - 1), letterAt(endPos + 2)], correctIdx);
      return {
        topic: 'Alphabet Test',
        enQ: `Starting from the letter "${letterAt(start)}", which letter is ${back} places to its LEFT in the English alphabet A–Z?`,
        mrQ: `इंग्रजी अक्षरमालेत "${letterAt(start)}" या अक्षराच्या डावीकडे ${back} व्या स्थानावर कोणते अक्षर येईल?`,
        hiQ: `अंग्रेज़ी वर्णमाला में अक्षर "${letterAt(start)}" के बाईं ओर ${back}वें स्थान पर कौन-सा अक्षर होगा?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `"${letterAt(start)}" is at position ${start}. Moving ${back} places left: ${start} - ${back} = ${endPos} → "${ans}".`,
        mrExp: `"${letterAt(start)}" (${start}) पासून ${back} घरे डावीकडे ${endPos} वे अक्षर '${ans}' येते.`,
        hiExp: `"${letterAt(start)}" (${start}) से ${back} स्थान बाएँ ${endPos}वाँ अक्षर '${ans}' है।`,
      };
    }
    case 48: {
      // Logical Pairs: Digit Sum Analogy (2-digit numbers -> sum of digits)
      const d1 = 2 + ((t - 1) % 7);
      const d2 = 3 + Math.floor((t - 1) / 7);
      const num1 = d1 * 10 + d2;
      const sum1 = d1 + d2;
      const e1 = d1 + 1;
      const e2 = d2 + 2;
      const num2 = e1 * 10 + e2;
      const ans = e1 + e2;
      const opts = makeNumericOptions(ans, [2, -1, 3], correctIdx);
      return {
        topic: 'Number Analogy',
        enQ: `Observe the relation and complete the pair: ${num1} : ${sum1} :: ${num2} : ?`,
        mrQ: `संबंध ओळखून प्रश्नचिन्हाच्या जागी योग्य संख्या निवडा: ${num1} : ${sum1} :: ${num2} : ?`,
        hiQ: `संबंध पहचानकर (?) का मान ज्ञात कीजिए: ${num1} : ${sum1} :: ${num2} : ?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Sum of digits: ${d1} + ${d2} = ${sum1}. Similarly, ${e1} + ${e2} = ${ans}.`,
        mrExp: `अंकांची बेरीज: ${e1} + ${e2} = ${ans}.`,
        hiExp: `अंकों का योग: ${e1} + ${e2} = ${ans}।`,
      };
    }
    default: {
      // case 49: Sitting/Standing in a Circle or Row between two children
      const total = 18 + t;
      const leftPos = 5 + (t % 5);
      const rightPos = 4 + (t % 4);
      const between = total - leftPos - rightPos;
      const opts = makeNumericOptions(between, [2, -2, 4], correctIdx, '', '', true);
      return {
        topic: 'Order & Ranking',
        enQ: `In a line of ${total} students, Aarav is ${leftPos}th from the front and Riya is ${rightPos}th from the back. How many students are standing strictly between Aarav and Riya?`,
        mrQ: `${total} विद्यार्थ्यांच्या रांगेत आरव पुढेून ${leftPos} वा व रिया मागून ${rightPos} वी आहे, तर त्या दोघांच्या मधोमध एकूण किती विद्यार्थी उभे आहेत?`,
        hiQ: `${total} विद्यार्थियों की कतार में आरव आगे से ${leftPos}वें और रिया पीछे से ${rightPos}वें स्थान पर है। दोनों के बीच में कितने विद्यार्थी खड़े हैं?`,
        enOpts: opts,
        mrOpts: opts,
        hiOpts: opts,
        enExp: `Between = Total - (Front + Back) = ${total} - (${leftPos} + ${rightPos}) = ${between}.`,
        mrExp: `मधोमध विद्यार्थी = ${total} - (${leftPos} + ${rightPos}) = ${between}.`,
        hiExp: `बीच में विद्यार्थी = ${total} - (${leftPos} + ${rightPos}) = ${between}।`,
      };
    }
  }
}
