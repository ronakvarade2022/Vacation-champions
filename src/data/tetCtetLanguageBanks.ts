import {
  TetCtetExamType,
  TetCtetLanguage,
  TetCtetPaperNumber,
  TetCtetPoolType,
  TetCtetQuestion,
} from '../types/tetCtet';
import { getModuleId } from './tetCtetSyllabi';
import { getMahaTetP1B1MarathiL1Question } from './tetCtetAuditBatches/mahaTetP1B1MrAll';
import { getMahaTetP1B1EnglishL2Question } from './tetCtetAuditBatches/mahaTetP1B1EnAll';

export function normalizeTetText(raw: string): string {
  return String(raw || '')
    .toLowerCase()
    .replace(/[\u0900-\u097F\u0600-\u06FFa-z0-9]+/gi, (m) => m)
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function seededPermuteOptions(
  options: [string, string, string, string],
  correctIdx: number,
  seedStr: string
): { options: [string, string, string, string]; correctAnswer: number } {
  let h = 2166136261;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const indices = [0, 1, 2, 3];
  for (let i = indices.length - 1; i > 0; i--) {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    const j = Math.abs(h) % (i + 1);
    const tmp = indices[i];
    indices[i] = indices[j];
    indices[j] = tmp;
  }
  const newOptions: [string, string, string, string] = [
    options[indices[0]],
    options[indices[1]],
    options[indices[2]],
    options[indices[3]],
  ];
  const newCorrect = indices.indexOf(correctIdx);
  return {
    options: newOptions,
    correctAnswer: newCorrect >= 0 ? newCorrect : 0,
  };
}

interface GrammarItem {
  topic: string;
  prompt: string;
  options: [string, string, string, string];
  correct: number;
  explanation: string;
}

interface PassageBankItem {
  title: string;
  text: string;
  questions: Array<{
    q: string;
    opts: [string, string, string, string];
    ans: number;
    exp: string;
  }>;
}

// ============================================================================
// ENGLISH PROSE, POETRY & GRAMMAR BANKS
// ============================================================================
const ENGLISH_PASSAGES: PassageBankItem[] = [
  {
    title: 'Silent Architects of Soil',
    text: 'Earthworms aerate farmland by carving microscopic tunnels that let rainwater percolate deep into clay. Without chemical additives, their castings enrich humus with nitrogen, phosphorus, and potassium.',
    questions: [
      {
        q: 'Why does the passage describe earthworms as architects of soil?',
        opts: [
          'They carve tunnels that improve soil aeration and water percolation',
          'They construct underground stone walls around plant roots',
          'They eliminate all beneficial bacteria from topsoil',
          'They convert sand directly into synthetic fertilizer',
        ],
        ans: 0,
        exp: 'Earthworms carve microscopic tunnels that aerate soil and allow rainwater to percolate deep.',
      },
      {
        q: 'Which nutrients are enriched in humus by earthworm castings according to the extract?',
        opts: [
          'Nitrogen, phosphorus, and potassium',
          'Calcium carbonate and mercury only',
          'Sodium chloride and sulphur',
          'Lead and artificial nitrates',
        ],
        ans: 0,
        exp: 'The passage explicitly states castings enrich humus with nitrogen, phosphorus, and potassium.',
      },
      {
        q: 'In the passage, the word "percolate" most nearly means:',
        opts: [
          'Filter gradually downward through porous spaces',
          'Evaporate rapidly under bright sunlight',
          'Freeze into solid ice crystals',
          'Overflow across concrete pavements',
        ],
        ans: 0,
        exp: 'Percolate means to trickle or filter gradually through porous soil.',
      },
    ],
  },
  {
    title: 'The Weaver’s Rhythm (Verse)',
    text: 'Clack goes the shuttle before the dawn, / Spinning silk from golden thread; / Honest labour greets the morn, / Weaving hope where looms are spread.',
    questions: [
      {
        q: 'What literary device is prominent in "Clack goes the shuttle"?',
        opts: ['Onomatopoeia', 'Oxymoron', 'Pun', 'Antithesis'],
        ans: 0,
        exp: '"Clack" imitates the natural sound of the wooden loom shuttle, which is onomatopoeia.',
      },
      {
        q: 'Which central value does the stanza highlight?',
        opts: [
          'Dignity of early morning honest labour and craftsmanship',
          'Avoidance of manual occupations',
          'Greed for imported silk garments',
          'Fear of rising before sunrise',
        ],
        ans: 0,
        exp: 'The poem celebrates "honest labour" and "weaving hope" before dawn.',
      },
    ],
  },
  {
    title: 'Banyan Library of Wardha',
    text: 'Every Sunday morning, retired schoolteachers spread woven mats beneath a century-old banyan tree so village children could borrow illustrated science books without fees or membership cards.',
    questions: [
      {
        q: 'What barrier did the Sunday banyan library deliberately remove for village children?',
        opts: [
          'Membership fees and formal registration cards',
          'Access to illustrated science books',
          'Morning sunlight under the tree',
          'Guidance from retired schoolteachers',
        ],
        ans: 0,
        exp: 'Children could borrow books without fees or membership cards.',
      },
      {
        q: 'What kind of educational initiative does this passage exemplify?',
        opts: [
          'Community-driven open reading literacy',
          'Commercial private coaching centres',
          'Exclusionary examination screening',
          'Digital-only surveillance schooling',
        ],
        ans: 0,
        exp: 'Retired teachers volunteering open access beneath a village tree exemplifies community-driven literacy.',
      },
    ],
  },
  {
    title: 'Mangroves as Coastal Shields',
    text: 'Dense prop roots of coastal mangroves trap silt washed down by rivers and absorb the kinetic force of cyclonic storm surges, safeguarding fishing hamlets along tidal creeks.',
    questions: [
      {
        q: 'How do mangroves protect coastal fishing hamlets during cyclones?',
        opts: [
          'Their dense prop roots absorb storm surge force and stabilize silt',
          'They emit warm air currents that repel clouds',
          'They convert saline tides into freshwater rivers',
          'They block all boats from entering tidal creeks',
        ],
        ans: 0,
        exp: 'Prop roots trap silt and absorb the kinetic force of storm surges.',
      },
      {
        q: 'Which phrase in the passage serves as a metaphor for protection?',
        opts: ['Coastal Shields', 'Tidal creeks', 'Prop roots', 'Fishing hamlets'],
        ans: 0,
        exp: '"Coastal Shields" in the title metaphorically likens mangroves to protective armour.',
      },
    ],
  },
];

const ENGLISH_GRAMMAR_POOL: GrammarItem[] = [
  { topic: 'Conditionals', prompt: 'Complete the sentence: "Had the teacher arrived earlier, the assembly ___ on time."', options: ['would have begun', 'will begin', 'has begun', 'begins'], correct: 0, explanation: 'Third conditional uses "Had + subject + V3 ... would have + V3".' },
  { topic: 'Subject-Verb Concord', prompt: 'Choose the grammatically accurate sentence:', options: ['Neither the principal nor the teachers were aware of the change.', 'Neither the principal nor the teachers was aware of the change.', 'Neither the principal or the teachers was aware of the change.', 'Neither the principal nor the teachers is aware of the change.'], correct: 0, explanation: 'With "neither...nor", the verb agrees with the nearer subject ("teachers" -> plural "were").' },
  { topic: 'Prepositions', prompt: 'Select the right preposition: "Ananya excels ___ drafting analytical lesson plans."', options: ['in', 'on', 'onto', 'upon'], correct: 0, explanation: 'The verb "excel" takes "in" or "at" for a skill domain.' },
  { topic: 'Active & Passive Voice', prompt: 'Change into passive voice: "The committee praised the innovative science fair model."', options: ['The innovative science fair model was praised by the committee.', 'The innovative science fair model is praised by the committee.', 'The innovative science fair model has been praised by the committee.', 'The committee was praised by the innovative science fair model.'], correct: 0, explanation: 'Simple past active ("praised") transforms to "was/were + past participle".' },
  { topic: 'Reported Speech', prompt: 'Convert to indirect speech: He said, "I have verified all worksheets today."', options: ['He said that he had verified all worksheets that day.', 'He said that he has verified all worksheets today.', 'He told that he verified all worksheets that day.', 'He said that he had verified all worksheets today.'], correct: 0, explanation: 'Present perfect shifts to past perfect and "today" shifts to "that day".' },
  { topic: 'Figures of Speech', prompt: 'Identify the figure of speech in: "The classroom library was an oasis of calm during recess."', options: ['Metaphor', 'Simile', 'Alliteration', 'Apostrophe'], correct: 0, explanation: 'Comparing two dissimilar things directly without "like" or "as" is a metaphor.' },
  { topic: 'Modals', prompt: 'Fill in the blank to express polite obligation: "Educators ___ nurture curiosity before testing recall."', options: ['ought to', 'must not', 'dare', 'might not'], correct: 0, explanation: '"Ought to" expresses moral and professional desirability.' },
  { topic: 'Clauses', prompt: 'Identify the underlined clause: "The rubric *that you designed yesterday* improved grading fairness."', options: ['Adjective (Relative) Clause', 'Adverb Clause of Concession', 'Noun Clause as Object', 'Coordinate Principal Clause'], correct: 0, explanation: 'The clause modifies the noun "rubric", functioning as a defining relative/adjective clause.' },
  { topic: 'Antonyms', prompt: 'Choose the most accurate antonym of "Ephemeral":', options: ['Enduring', 'Fleeting', 'Fragile', 'Momentary'], correct: 0, explanation: 'Ephemeral means short-lived; enduring means lasting long.' },
  { topic: 'Synonyms', prompt: 'Choose the closest synonym of "Pedagogical":', options: ['Instructional', 'Arbitrary', 'Commercial', 'Mechanical'], correct: 0, explanation: 'Pedagogical relates to teaching methods and instructional practice.' },
  { topic: 'Idioms & Phrases', prompt: 'What does the idiom "to read between the lines" signify?', options: ['To grasp an implied or hidden meaning beyond literal words', 'To skip alternate paragraphs while skimming', 'To underline grammatical nouns neatly', 'To memorize lines in strict chronological order'], correct: 0, explanation: 'Reading between the lines means inferring unstated intent.' },
  { topic: 'Word Formation', prompt: 'Which suffix turns the adjective "inclusive" into an abstract noun?', options: ['-ness (inclusiveness)', '-ly (inclusively)', '-ed (inclusived)', '-ous (inclusivous)'], correct: 0, explanation: 'Adding "-ness" forms the abstract noun "inclusiveness".' },
  { topic: 'Question Tags', prompt: 'Add the correct question tag: "Everyone appreciated the mural, ___?"', options: ["didn't they", "wasn't he", "did they", "isn't it"], correct: 0, explanation: 'Indefinite pronoun "Everyone" takes plural pronoun "they" in question tags with past tense "didn\'t".' },
  { topic: 'Phonics & Phonology', prompt: 'Which pair forms a minimal pair in English phonology?', options: ['"pin" and "bin"', '"cat" and "dog"', '"chalk" and "board"', '"write" and "written"'], correct: 0, explanation: 'Minimal pairs differ in exactly one phoneme ("/p/" vs "/b/") that alters meaning.' },
  { topic: 'Cohesion & Discourse', prompt: 'Which linker expresses contrast between two independent clauses?', options: ['Nevertheless', 'Consequently', 'Furthermore', 'Similarly'], correct: 0, explanation: '"Nevertheless" signals concession or contrast.' },
];

// ============================================================================
// MARATHI PROSE, POETRY & GRAMMAR BANKS (मराठी)
// ============================================================================
const MARATHI_PASSAGES: PassageBankItem[] = [
  {
    title: 'पाण्याची बचत आणि लोकसहभाग',
    text: 'महाराष्ट्रातील अनेक दुष्काळग्रस्त गावांनी श्रमदानातून बंधारे बांधले आणि छतावरील पावसाचे पाणी जमिनीत जिरवले. त्यामुळे उन्हाळ्यातही विहिरींना पाणी टिकून राहिले.',
    questions: [
      {
        q: 'गावकऱ्यांनी उन्हाळ्यात पाण्याची टंचाई दूर करण्यासाठी कोणता मार्ग अवलंबला?',
        opts: [
          'श्रमदानातून बंधारे बांधणे व छतावरील पावसाचे पाणी जमिनीत जिरवणे',
          'नदीचे पाणी बाटलीबंद करून शहरात विकणे',
          'शेती पूर्णपणे बंद करून स्थलांतर करणे',
          'केवळ टँकरवर अवलंबून राहणे',
        ],
        ans: 0,
        exp: 'उताऱ्यात बंधारे बांधणे आणि रेनवॉटर हार्वेस्टिंगचा स्पष्ट उल्लेख आहे.',
      },
      {
        q: '"लोकसहभाग" या शब्दाचा योग्य अर्थ कोणता?',
        opts: [
          'समाजातील सर्व लोकांचा सक्रिय सहभाग',
          'केवळ एका व्यक्तीने घेतलेला निर्णय',
          'परदेशी तज्ज्ञांचे मार्गदर्शन',
          'अर्थसंकल्पातील तूट',
        ],
        ans: 0,
        exp: 'लोकसहभाग म्हणजे लोकांनी एकत्र येऊन कार्यात घेतलेला सक्रिय सहभाग.',
      },
    ],
  },
  {
    title: 'मातृभाषेचे शिक्षण',
    text: 'प्रारंभिक शिक्षण मातृभाषेतून मिळाल्यास बालकाला संकल्पना चटकन कळतात आणि त्याच्या विचारशक्तीला नैसर्गिक गती मिळते. मूल आपल्या अनुभवांना शब्दांतून आत्मविश्वासाने मांडते.',
    questions: [
      {
        q: 'मातृभाषेतून शिक्षणाचा प्रमुख शैक्षणिक लाभ कोणता?',
        opts: [
          'संकल्पना सहज समजतात व विचारशक्तीला नैसर्गिक चालना मिळते',
          'बालकाला पाठांतराची सवय लागते',
          'इतर भाषा शिकण्यात अडथळा निर्माण होतो',
          'केवळ अक्षरओळख मर्यादित राहते',
        ],
        ans: 0,
        exp: 'मातृभाषेतून संकल्पना स्पष्ट होतात आणि आत्मविश्वासाने अभिव्यक्ती करता येते.',
      },
      {
        q: '"नैसर्गिक" या विशेषणाचा विरुद्धार्थी शब्द निवडा.',
        opts: ['कृत्रिम', 'स्वाभाविक', 'सहज', 'मौलिक'],
        ans: 0,
        exp: 'नैसर्गिक चा अचूक विरुद्धार्थी शब्द "कृत्रिम" आहे.',
      },
    ],
  },
];

const MARATHI_GRAMMAR_POOL: GrammarItem[] = [
  { topic: 'संधी', prompt: '"सूर्योदय" या शब्दाचा अचूक संधी-विग्रह निवडा.', options: ['सूर्य + उदय', 'सूर्यो + दय', 'सूर + उदय', 'सूर्य + दय'], correct: 0, explanation: 'अ + उ = ओ (गुणसंधी) नुसार सूर्य + उदय = सूर्योदय होतो.' },
  { topic: 'समास', prompt: '"यथाशक्ती" हा शब्द कोणत्या समासाचे उदाहरण आहे?', options: ['अव्ययीभाव समास', 'द्वंद्व समास', 'बहुव्रीही समास', 'कर्मधारय समास'], correct: 0, explanation: '"यथा" हे अव्यय प्रथम पद असल्यामुळे अव्ययीभाव समास आहे.' },
  { topic: 'प्रयोग', prompt: '"रामाने ग्रंथ वाचला" या वाक्यातील प्रयोग ओळखा.', options: ['कर्मणी प्रयोग', 'कर्तरी प्रयोग', 'भावे प्रयोग', 'सकर्मक कर्तरी प्रयोग'], correct: 0, explanation: 'कर्त्याला प्रत्यय ("ने") असून क्रियापद कर्माच्या ("ग्रंथ" - पुल्लिंगी एकवचन) लिंग-वचनानुसार ("वाचला") आहे, म्हणून कर्मणी प्रयोग.' },
  { topic: 'अलंकार', prompt: '"पाणी म्हणजे जणू अमृतच होय!" या वाक्यात कोणता अलंकार आहे?', options: ['उत्प्रेक्षा अलंकार', 'यमकाचा अलंकार', 'श्लेष अलंकार', 'अतिशयोक्ती अलंकार'], correct: 0, explanation: '"जणू", "गमे", "वाटे" हे साम्यवाचक शब्द असल्यास उत्प्रेक्षा अलंकार होतो.' },
  { topic: 'वाक्प्रचार', prompt: '"कंबर कसणे" या वाक्प्रचाराचा योग्य अर्थ ओळखा.', options: ['कोणत्याही कठीण कामासाठी खंबीरपणे सिद्ध होणे', 'विश्रांती घेणे', 'निराश होऊन माघार घेणे', 'अतिशय वेगाने धावणे'], correct: 0, explanation: 'कंबर कसणे म्हणजे दृढ निश्चयाने कार्याला सज्ज होणे.' },
  { topic: 'म्हणी', prompt: '"थेंबे थेंबे तळे साचे" या म्हणीचा भावार्थ कोणता?', options: ['लहान-लहान प्रयत्नांतून मोठे संचय किंवा यश घडते', 'पावसाळ्यात सर्व तळी कोरडी पडतात', 'अचानक मोठा धनलाभ होतो', 'परिश्रमाशिवाय फळ मिळते'], correct: 0, explanation: 'थोडे थोडे साठवून मोठे कार्य सिद्ध होते हा म्हणीचा अर्थ आहे.' },
  { topic: 'शब्दसिद्धी', prompt: '"शिक्षकपण" या शब्दातील प्रत्ययप्रकार ओळखा.', options: ['तद्धित (भाववाचक नाम साधणारा प्रत्यय)', 'कृदंत प्रत्यय', 'उपसर्गघटित शब्द', 'अभ्यस्त शब्द'], correct: 0, explanation: 'नामाला ("शिक्षक") "पण" प्रत्यय लागून तद्धित भाववाचक नाम तयार झाले आहे.' },
  { topic: 'विरामचिन्हे', prompt: 'दोघांच्या संवादातील बोलणाऱ्याचे तोंडचे शब्द दाखवण्यासाठी कोणते चिन्ह वापरतात?', options: ['दुहेरी अवतरण चिन्ह ("...")', 'अर्धविराम (;)', 'अपसरण चिन्ह (—)', 'प्रश्नचिन्ह (?)'], correct: 0, explanation: 'प्रत्यक्ष बोललेले वाक्य दुहेरी अवतरण चिन्हात लिहिले जाते.' },
  { topic: 'विभक्ती', prompt: '"मुलांनो, शांत बसा." या वाक्यातील "मुलांनो" शब्दाची विभक्ती ओळखा.', options: ['संबोधन', 'प्रथमा', 'चतुर्थी', 'षष्ठी'], correct: 0, explanation: 'हाक मारण्यासाठी "-नो" प्रत्ययाचा वापर झाल्यास संबोधन विभक्ती असते.' },
  { topic: 'काळ', prompt: '"मी दररोज सकाळी वाचन करतो." या वाक्याचा काळ ओळखा.', options: ['रीती वर्तमानकाळ / साधा वर्तमानकाळ', 'अपूर्ण भूतकाळ', 'पूर्ण भविष्यकाळ', 'रीती भूतकाळ'], correct: 0, explanation: '"दररोज करतो" यातून नियमित वर्तमानकालीन सवय दिसते.' },
];

// ============================================================================
// HINDI PROSE, POETRY & GRAMMAR BANKS (हिन्दी)
// ============================================================================
const HINDI_PASSAGES: PassageBankItem[] = [
  {
    title: 'लोकतांत्रिक कक्षा और संवाद',
    text: 'जब शिक्षक विद्यार्थियों को प्रश्न पूछने की स्वतंत्रता देते हैं, तब कक्षा भयमुक्त प्रयोगशाला बन जाती है। त्रुटियाँ बच्चों की सोच को समझने की खिड़की होती हैं, दंड का कारण नहीं।',
    questions: [
      {
        q: 'गद्यांश के अनुसार त्रुटियों को शिक्षण में किस रूप में देखा जाना चाहिए?',
        opts: [
          'बच्चों की विचार-प्रक्रिया को समझने के अवसर के रूप में',
          'तत्काल दंड देने के प्रमाण के रूप में',
          'बच्चे की असफलता के अंतिम निर्णय के रूप में',
          'रटने की गति कम होने के संकेत के रूप में',
        ],
        ans: 0,
        exp: 'गद्यांश स्पष्ट कहता है कि त्रुटियाँ बच्चों की सोच को समझने की खिड़की होती हैं।',
      },
      {
        q: '"भयमुक्त" शब्द में कौन-सा समास है?',
        opts: ['अपादान तत्पुरुष समास', 'द्वंद्व समास', 'कर्मधारय समास', 'द्विगु समास'],
        ans: 0,
        exp: 'भय से मुक्त (अलग होने का भाव) — अतः अपादान तत्पुरुष समास है।',
      },
    ],
  },
  {
    title: 'प्रकृति और परिश्रम',
    text: 'बीज अंधेरी मिट्टी में धैर्य रखकर अंकुर बनता है और फिर सूर्य की ओर बढ़ता है। सतत प्रयास और समय का सदुपयोग किसी भी विद्यार्थी को आत्मनिर्भर बना सकता है।',
    questions: [
      {
        q: 'बीज के उदाहरण द्वारा लेखक ने किस गुण को रेखांकित किया है?',
        opts: [
          'धैर्य और निरंतर परिश्रम',
          'अकर्मण्यता और आलस्य',
          'बिना प्रयास सफलता की अपेक्षा',
          'केवल बाहरी सहायता पर निर्भरता',
        ],
        ans: 0,
        exp: 'धैर्य, सतत प्रयास और समय का सदुपयोग मुख्य संदेश है।',
      },
      {
        q: '"सदुपयोग" शब्द का सही संधि-विच्छेद चुनिए।',
        opts: ['सत् + उपयोग', 'सदु + प्रयोग', 'सद + उपयोग', 'सत् + प्रयोग'],
        ans: 0,
        exp: 'व्यंजन संधि के नियमानुसार सत् + उपयोग = सदुपयोग होता है।',
      },
    ],
  },
];

const HINDI_GRAMMAR_POOL: GrammarItem[] = [
  { topic: 'संधि', prompt: '"हिमालय" में प्रयुक्त संधि का सही नाम बताइए।', options: ['दीर्घ स्वर संधि', 'गुण स्वर संधि', 'यण् स्वर संधि', 'विसर्ग संधि'], correct: 0, explanation: 'हिम + आलय (अ + आ = आ) दीर्घ स्वर संधि का उदाहरण है।' },
  { topic: 'समास', prompt: '"नीलकमल" पद में कौन-सा समास निहित है?', options: ['कर्मधारय समास', 'द्विगु समास', 'अव्ययीभाव समास', 'द्वंद्व समास'], correct: 0, explanation: 'यहाँ "नील" विशेषण और "कमल" विशेष्य है, अतः कर्मधारय समास है।' },
  { topic: 'अलंकार', prompt: '"कनक-कनक ते सौ गुनी, मादकता अधिकाय" में कौन-सा अलंकार है?', options: ['यमक अलंकार', 'उत्प्रेक्षा अलंकार', 'संदेह अलंकार', 'रूपक अलंकार'], correct: 0, explanation: 'एक ही शब्द "कनक" की आवृत्ति भिन्न-भिन्न अर्थों (सोना और धतूरा) में होने से यमक अलंकार है।' },
  { topic: 'मुहावरे', prompt: '"गागर में सागर भरना" मुहावरे का सटीक अर्थ क्या है?', options: ['थोड़े शब्दों में बहुत गहन और विस्तृत बात कहना', 'व्यर्थ पानी बहाना', 'बिना सोचे-समझे बोलना', 'बड़े कार्य को अधूरा छोड़ना'], correct: 0, explanation: 'कम शब्दों में अत्यधिक सारगर्भित भाव व्यक्त करना गागर में सागर भरना कहलाता है।' },
  { topic: 'कारक', prompt: '"पेड़ से पत्ता गिरा" वाक्य में "पेड़ से" में कौन-सा कारक है?', options: ['अपादान कारक', 'करण कारक', 'संप्रदान कारक', 'अधिकरण कारक'], correct: 0, explanation: 'पृथक होने (अलग होने) के अर्थ में "से" विभक्ति अपादान कारक होती है।' },
  { topic: 'उपसर्ग', prompt: '"अधिनायक" शब्द में कौन-सा उपसर्ग प्रयुक्त हुआ है?', options: ['अधि', 'अ', 'अध', 'अन'], correct: 0, explanation: '"अधि" उपसर्ग के योग से अधि + नायक = अधिनायक बना है।' },
  { topic: 'पर्यायवाची', prompt: 'निम्नलिखित में से "सरस्वती" का पर्यायवाची शब्द कौन-सा है?', options: ['वीणापाणि', 'पावक', 'दिनकर', 'जलज'], correct: 0, explanation: 'वीणापाणि, वाग्देवी और शारदा देवी सरस्वती के पर्यायवाची हैं।' },
  { topic: 'वाच्य', prompt: '"बच्चों द्वारा सुंदर चित्र बनाया गया" किस वाच्य का उदाहरण है?', options: ['कर्मवाच्य', 'कर्तृवाच्य', 'भाववाच्य', 'आज्ञार्थक वाच्य'], correct: 0, explanation: 'क्रिया का रूप कर्म ("चित्र") के अनुसार होने से यह कर्मवाच्य है।' },
];

// ============================================================================
// URDU PROSE, POETRY & GRAMMAR BANKS (اردو - MAHA TET SUPPORTED LANGUAGE)
// ============================================================================
const URDU_PASSAGES: PassageBankItem[] = [
  {
    title: 'تعلیم اور مادری زبان (Education & Mother Tongue)',
    text: 'ابتدائی درجات میں مادری زبان بچے کی فہم، تخلیقی اظہار اور خود اعتمادی کو مضبوط بناتی ہے۔ جب کلاس روم میں بچوں کے تجربات کو جگہ دی جائے تو سیکھنا بامعنی ہو جاتا ہے۔',
    questions: [
      {
        q: 'اقتباس کے مطابق ابتدائی تعلیم میں مادری زبان کا سب سے بڑا فائدہ کیا ہے؟',
        opts: [
          'فہم، تخلیقی اظہار اور خود اعتمادی میں مضبوطی آتی ہے',
          'بچے صرف رٹ کر امتحان پاس کرتے ہیں',
          'کلاس روم میں خاموشی برقرار رہتی ہے',
          'دیگر زبانیں سیکھنا ناممکن ہو جاتا ہے',
        ],
        ans: 0,
        exp: 'مادری زبان بچے کی فہم اور تخلیقی اظہار کو قدرتی طور پر مضبوط بناتی ہے۔',
      },
      {
        q: 'لفظ "خود اعتمادی" کا مفہوم کیا ہے؟',
        opts: [
          'اپنی صلاحیتوں پر مثبت بھروسہ',
          'دوسروں سے خوفزدہ رہنا',
          'بغیر سمجھے نقل کرنا',
          'گفتگو سے گریز کرنا',
        ],
        ans: 0,
        exp: 'خود اعتمادی سے مراد اپنی صلاحیتوں پر صحت مند یقین اور بھروسہ ہے۔',
      },
    ],
  },
];

const URDU_GRAMMAR_POOL: GrammarItem[] = [
  { topic: 'قواعد (Grammar)', prompt: 'اردو قواعد میں "اسمِ صفت" کسے کہتے ہیں؟', options: ['وہ کلمہ جو کسی اسم کی اچھائی، برائی یا حالت بیان کرے', 'وہ لفظ جو کسی کام کے کرنے کو ظاہر کرے', 'دو جملوں کو جوڑنے والا حرف', 'کسی جگہ کا صرف نام'], correct: 0, explanation: 'اسمِ صفت کسی اسم کی خصوصیت یا حالت کو واضح کرتا ہے۔' },
  { topic: 'تضاد (Antonyms)', prompt: 'لفظ "روشنی" کا درست متضاد (ضد) منتخب کریں:', options: ['تاریکی', 'اجالا', 'نور', 'چمک'], correct: 0, explanation: 'روشنی کا درست متضاد تاریکی (اندھیرا) ہے۔' },
  { topic: 'واحد جمع (Number)', prompt: 'لفظ "کتاب" کی درست جمع کیا ہے؟', options: ['کتب / کتابیں', 'کتابات', 'مکتوب', 'کاتبین'], correct: 0, explanation: 'اردو میں کتاب کی جمع کتب یا کتابیں مستعمل ہے۔' },
  { topic: 'محاورہ (Idiom)', prompt: 'محاورہ "باغ باغ ہونا" کا درست مفہوم کیا ہے؟', options: ['نہایت خوش اور مسرور ہونا', 'سفر پر روانہ ہونا', 'غصے میں آ جانا', 'پریشان ہو جانا'], correct: 0, explanation: 'باغ باغ ہونا سے مراد بے حد خوش ہونا ہے۔' },
];

// ============================================================================
// AUTHENTIC LANGUAGE PEDAGOGY SCENARIO GENERATOR
// ============================================================================
interface LangPedagogyCore {
  concept: string;
  enPrompt: (ctx: string) => string;
  enOpts: [string, string, string, string];
  enExp: string;
  mrPrompt: (ctx: string) => string;
  mrOpts: [string, string, string, string];
  mrExp: string;
  hiPrompt: (ctx: string) => string;
  hiOpts: [string, string, string, string];
  hiExp: string;
  urPrompt: (ctx: string) => string;
  urOpts: [string, string, string, string];
  urExp: string;
}

const LANG_PEDAGOGY_CORES: LangPedagogyCore[] = [
  {
    concept: 'Comprehensible Input (Krashen i+1)',
    enPrompt: (ctx) => `${ctx}: Which classroom practice best applies Stephen Krashen's Comprehensible Input (i+1) hypothesis?`,
    enOpts: [
      'Providing rich stories and dialogue slightly above current proficiency with visual cues',
      'Drilling isolated grammar transformation rules before comprehension',
      'Insisting every error be corrected aloud mid-sentence',
      'Making learners copy dictionary pages mechanically',
    ],
    enExp: 'Krashen emphasizes meaningful messages just one step beyond current competence (i+1).',
    mrPrompt: (ctx) => `${ctx}: स्टीफन क्रॅशन यांच्या बोधगम्य आदान (i+1) सिद्धांताचे उत्तम उपयोजन कोणते?`,
    mrOpts: [
      'विद्यार्थ्यांच्या सध्याच्या पातळीपेक्षा किंचित पुढील परंतु चित्रे व संदर्भांसह समजण्याजोगी कथा सामग्री देणे',
      'अर्थ न समजता व्याकरणाचे नियम घोकून घेणे',
      'बोलताना प्रत्येक चुकीवर तत्काळ टोकून संभाषण थांबवणे',
      'केवळ शब्दकोशातील शब्द सलग लिहून घेणे',
    ],
    mrExp: 'बोधगम्य आदान (i+1) म्हणजे विद्यार्थ्यांच्या पातळीच्या किंचित पुढे असलेली अर्थपूर्ण भाषिक सामग्री.',
    hiPrompt: (ctx) => `${ctx}: स्टीफन क्रैशन के बोधगम्य निवेश (i+1) सिद्धांत का सर्वोत्तम कक्षा-प्रयोग कौन-सा है?`,
    hiOpts: [
      'बच्चों के वर्तमान स्तर से थोड़ा ऊपर परंतु संदर्भ और चित्रों के साथ सार्थक पठन-श्रवण सामग्री देना',
      'बिना अर्थ समझाए व्याकरण के सूत्र रटवाना',
      'बोलते समय प्रत्येक अशुद्धि पर तुरंत टोक देना',
      'शब्दकोश के पृष्ठ यंत्रवत् लिखवाना',
    ],
    hiExp: 'क्रैशन के अनुसार अर्थपूर्ण और संदर्भयुक्त (i+1) भाषिक निवेश सहज भाषा अर्जन को बढ़ावा देता है।',
    urPrompt: (ctx) => `${ctx}: اسٹیفن کریشن کے قابلِ فہم ان پٹ (i+1) نظریے کا بہترین اطلاق کون سا ہے؟`,
    urOpts: [
      'طلبہ کی موجودہ سطح سے تھوڑا آگے مگر تصاویر اور سیاق و سباق کے ساتھ بامعنی کہانی فراہم کرنا',
      'بغیر معنی سمجھے قواعد کے اصول رٹوانا',
      'گفتگو کے دوران ہر غلطی پر فوراً ٹوک دینا',
      'لغت کے صفحات بار بار نقل کروانا',
    ],
    urExp: 'قابلِ فہم ان پٹ (i+1) سیاق و سباق کے ساتھ زبان کے فطری حصول کو فروغ دیتا ہے۔',
  },
  {
    concept: 'Multilingualism as Resource',
    enPrompt: (ctx) => `${ctx}: A classroom has learners speaking Marathi, Hindi, and Gondi at home. How should the teacher treat this linguistic diversity?`,
    enOpts: [
      'Use learners’ home languages as a cognitive bridge to validate voice and build target literacy',
      'Ban all home languages immediately inside the school boundary',
      'Group learners strictly by mother tongue in separate rooms',
      'Label dialect speakers as slow readers',
    ],
    enExp: 'NCF 2005 & NEP 2020 affirm multilingualism as a rich pedagogical resource rather than a hurdle.',
    mrPrompt: (ctx) => `${ctx}: वर्गात मराठी, हिंदी व स्थानिक बोली बोलणारे विद्यार्थी आहेत. शिक्षकांनी या बहुभाषिकतेकडे कसे पाहावे?`,
    mrOpts: [
      'घरच्या भाषांचा आदर करून त्यांचा संकल्पना स्पष्टीकरणासाठी व नवीन भाषा शिकण्यासाठी पूल म्हणून वापर करावा',
      'शाळेच्या आवारात मातृभाषा बोलण्यास सक्त मनाई करावी',
      'बोली बोलणाऱ्या विद्यार्थ्यांना वेगळ्या तुकडीत बसवावे',
      'प्रथम फक्त शुद्धलेखन सुधारल्याशिवाय बोलू देऊ नये',
    ],
    mrExp: 'राष्ट्रीय अभ्यासक्रम आराखडा (NCF 2005) आणि NEP 2020 बहुभाषिकतेला शैक्षणिक संसाधन मानतात.',
    hiPrompt: (ctx) => `${ctx}: कक्षा में विद्यार्थी घर पर विविध मातृभाषाएँ बोलते हैं। शिक्षक को इस भाषायी विविधता को कैसे देखना चाहिए?`,
    hiOpts: [
      'बच्चों की मातृभाषाओं को सम्मान देते हुए लक्ष्य भाषा और अवधारणाओं से जोड़ने वाले संसाधन के रूप में',
      'कक्षा में मातृभाषा के प्रयोग पर पूर्ण प्रतिबंध लगाकर',
      'विभिन्न भाषा बोलने वाले बच्चों को अलग कक्ष में बैठाकर',
      'मातृभाषा को सीखने में मुख्य बाधा मानकर',
    ],
    hiExp: 'बहुभाषिकता संज्ञानात्मक लचीलेपन और रचनात्मकता को बढ़ाती है।',
    urPrompt: (ctx) => `${ctx}: کلاس روم میں طلبہ مختلف مادری زبانیں بولتے ہیں۔ استاد کو اس کثیر اللسانی تنوع کو کیسے استعمال کرنا چاہیے؟`,
    urOpts: [
      'طلبہ کی گھریلو زبانوں کو عزت دیتے ہوئے نئے تصورات اور ہدف زبان سیکھنے کے پُل کے طور پر',
      'اسکول میں مادری زبان بولنے پر مکمل پابندی لگا کر',
      'مختلف زبانوں کے طلبہ کو الگ کمروں میں تقسیم کر کے',
      'بولی بولنے والوں کو کمزور قرار دے کر',
    ],
    urExp: 'کثیر اللسانیت تعلیمی وسائل اور تخلیقی سوچ کو مضبوط بناتی ہے۔',
  },
  {
    concept: 'BICS vs CALP (Jim Cummins)',
    enPrompt: (ctx) => `${ctx}: A student chats fluently during playground games yet struggles to write textbook science explanations. According to Jim Cummins, this shows:`,
    enOpts: [
      'BICS (social fluency) is developed, whereas CALP (academic proficiency) requires scaffolded support',
      'The student has lost basic phonological hearing',
      'Grammar drills are completely useless for science',
      'The learner cannot acquire a second language at all',
    ],
    enExp: 'Cummins distinguishes conversational BICS (~2 years) from cognitively demanding academic CALP (5–7 years).',
    mrPrompt: (ctx) => `${ctx}: एक विद्यार्थी मैदानावर सहज संवाद साधतो, पण पाठ्यपुस्तकातील वैज्ञानिक स्पष्टीकरण लिहिताना अडखळतो. जिम कमिन्स यांच्या मते हे काय दर्शवते?`,
    mrOpts: [
      'दैनंदिन संभाषणात्मक भाषा (BICS) विकसित झाली आहे, परंतु शैक्षणिक भाषा (CALP) घडवण्यासाठी आधाराची गरज आहे',
      'विद्यार्थ्याला श्रवणदोष आहे',
      'विज्ञानाचा भाषेशी काहीच संबंध नाही',
      'विद्यार्थी द्वितीय भाषा शिकण्यास असमर्थ आहे',
    ],
    mrExp: 'BICS म्हणजे सहज दैनंदिन संवाद कौशल्य आणि CALP म्हणजे अभ्यासक्रमातील उच्चस्तरीय शैक्षणिक भाषिक क्षमता.',
    hiPrompt: (ctx) => `${ctx}: एक विद्यार्थी खेल के मैदान में धाराप्रवाह बोलता है पर विज्ञान की पाठ्यपुस्तक समझने में कठिनाई पाता है। जिम कमिंस के अनुसार यह दर्शाता है:`,
    hiOpts: [
      'बुनियादी अंतर्वैयक्तिक संप्रेशन कौशल (BICS) विकसित है, जबकि शैक्षणिक भाषा दक्षता (CALP) के लिए संबल की आवश्यकता है',
      'बच्चे में स्मृति दोष है',
      'व्याकरण से विज्ञान का कोई संबंध नहीं है',
      'विद्यार्थी दूसरी भाषा कभी नहीं सीख सकता',
    ],
    hiExp: 'BICS और CALP के अंतर को समझकर शिक्षक अकादमिक शब्दावली व लेखन का क्रमिक विकास करते हैं।',
    urPrompt: (ctx) => `${ctx}: ایک طالب علم کھیل کے میدان میں روانی سے بات کرتا ہے مگر سائنسی مضمون لکھنے میں دشواری محسوس کرتا ہے۔ جم کمنز کے مطابق یہ کیا ظاہر کرتا ہے؟`,
    urOpts: [
      'روزمرہ گفتگو کی مہارت (BICS) موجود ہے جبکہ علمی و نصابی زبان (CALP) کے لیے رہنمائی درکار ہے',
      'طالب علم سننے کی صلاحیت کھو چکا ہے',
      'سائنس اور زبان کا کوئی تعلق نہیں',
      'دوسری زبان سیکھنا ناممکن ہے',
    ],
    urExp: 'BICS سماجی گفتگو کی روانی ہے جبکہ CALP نصابی و تجزیاتی زبان کی مہارت ہے۔',
  },
  {
    concept: 'Whole Language vs Sub-Skills Approach',
    enPrompt: (ctx) => `${ctx}: Which strategy integrates listening, speaking, reading, and writing holistically around real communication?`,
    enOpts: [
      'Using thematic picture books, shared discussion, and student-authored mini-journals',
      'Completing 50 isolated alphabet tracing worksheets daily without conversation',
      'Memorizing spelling lists devoid of sentence context',
      'Testing silent punctuation marks without reading comprehension',
    ],
    enExp: 'Whole-language literacy connects authentic reading, talk, listening, and expressive writing.',
    mrPrompt: (ctx) => `${ctx}: श्रवण, भाषण, वाचन आणि लेखन ही चारही कौशल्ये अर्थपूर्ण संवादातून एकत्रितपणे कशी विकसित होतात?`,
    mrOpts: [
      'चित्रकथांवर चर्चा, समूहवाचन आणि विद्यार्थ्यांनी स्वतःच्या शब्दांत अनुभव लेखन केल्याने',
      'अर्थ न सांगता फक्त ५० वेळा अक्षरगिरवणी केल्याने',
      'संदर्भाशिवाय कठीण शब्दांची यादी पाठ केल्याने',
      'केवळ विरामचिन्हांची व्याख्या घोकून घेतल्याने',
    ],
    mrExp: 'एकात्मिक भाषा अध्यापनात LSRW कौशल्ये वास्तविक संवादातून एकाच वेळी विकसित होतात.',
    hiPrompt: (ctx) => `${ctx}: सुनना, बोलना, पढ़ना और लिखना चारों भाषा-कौशलों को समग्र रूप से किस गतिविधि से विकसित किया जा सकता है?`,
    hiOpts: [
      'सचित्र कहानियों पर संवाद, साझा पठन और बच्चों द्वारा अपने अनुभव लिखने से',
      'बिना अर्थ बताए केवल अक्षर नकल करवाने से',
      'संदर्भहीन वर्तनी सूची रटवाने से',
      'केवल मौन विराम-चिह्न परीक्षा लेने से',
    ],
    hiExp: 'समग्र भाषा दृष्टिकोण चारों कौशलों को परस्पर जोड़कर अर्थ-निर्माण को केंद्र में रखता है।',
    urPrompt: (ctx) => `${ctx}: سننا، بولنا، پڑھنا اور لکھنا چاروں مہارتوں کو بامعنی انداز میں کیسے مربوط کیا جا سکتا ہے؟`,
    urOpts: [
      'تصویری کہانیوں پر مکالمہ، مشترکہ مطالعہ اور طلبہ کی اپنی تحریروں کے ذریعے',
      'بغیر معنی سمجھے حروف کی بار بار مشق کروا کر',
      'بغیر سیاق کے ہجے یاد کروا کر',
      'صرف رموزِ اوقاف کی تعریفیں رٹوا کر',
    ],
    urExp: 'مربوط لسانی طریقہ کار چاروں بنیادی مہارتوں کو حقیقی ابلاغ سے جوڑتا ہے۔',
  },
  {
    concept: 'Diagnostic & Remedial Language Teaching',
    enPrompt: (ctx) => `${ctx}: Before designing remedial sessions for weak readers, what must a teacher do first?`,
    enOpts: [
      'Conduct a diagnostic error analysis to pinpoint specific decoding or comprehension gaps',
      'Assign double pages of handwriting homework to the entire class',
      'Re-read the same textbook lesson at a faster pace',
      'Promote rote recitation without checking understanding',
    ],
    enExp: 'Remedial teaching succeeds only after precise diagnostic identification of each learner’s specific gap.',
    mrPrompt: (ctx) => `${ctx}: वाचनात मागे पडलेल्या विद्यार्थ्यांसाठी उपचारात्मक अध्यापन सुरू करण्यापूर्वी शिक्षकाने प्रथम काय करावे?`,
    mrOpts: [
      'विद्यार्थ्यांच्या नेमक्या चुकांचे नैदानिक विश्लेषण (Diagnostic Analysis) करून कारण शोधणे',
      'संपूर्ण वर्गाला दुप्पट शुद्धलेखनाचा गृहपाठ देणे',
      'तोच पाठ अधिक वेगाने वाचून दाखवणे',
      'समज न तपासता पाठांतर करून घेणे',
    ],
    mrExp: 'नैदानिक चाचणीमुळे विद्यार्थ्याची नेमकी अडचण कळते आणि उपचारात्मक अध्यापन अचूक ठरते.',
    hiPrompt: (ctx) => `${ctx}: पठन में कठिनाई अनुभव करने वाले छात्रों हेतु उपचारात्मक शिक्षण से पहले शिक्षक को सर्वप्रथम क्या करना चाहिए?`,
    hiOpts: [
      'नैदानिक आकलन द्वारा विशिष्ट त्रुटि और सीखने की कमी के कारण की पहचान करना',
      'पूरी कक्षा को दोगुना सुलेख गृहकार्य देना',
      'उसी पाठ को अधिक तेज गति से दोहराना',
      'बिना समझ जाँचे सस्वर पाठ रटवाना',
    ],
    hiExp: 'नैदानिक परीक्षण के बाद ही प्रभावी और लक्ष्य-केंद्रित उपचारात्मक शिक्षण संभव है।',
    urPrompt: (ctx) => `${ctx}: پڑھنے میں دشواری محسوس کرنے والے طلبہ کے لیے علاجی تدریس (Remedial Teaching) سے پہلے استاد کو کیا کرنا چاہیے؟`,
    urOpts: [
      'تشخیصی جائزہ (Diagnostic Analysis) کے ذریعے مخصوص خامی اور اس کے سبب کی نشاندہی کرنا',
      'پوری کلاس کو دگنا خوشخطی کا کام دینا',
      'اسی سبق کو تیز رفتاری سے دہرانا',
      'بغیر فہم جانچے زبانی یاد کروانا',
    ],
    urExp: 'مؤثر علاجی تدریس کی بنیاد درست تشخیصی جائزہ ہے۔',
  },
  {
    concept: 'Scanning vs Skimming Reading Strategies',
    enPrompt: (ctx) => `${ctx}: When a learner rapidly glances over a railway timetable to spot the departure time of one train, which reading sub-skill is used?`,
    enOpts: [
      'Scanning for specific factual information',
      'Skimming for general theme',
      'Intensive literary criticism',
      'Loud choral recitation',
    ],
    enExp: 'Scanning searches rapidly for a specific piece of data (date, time, figure); skimming captures overall gist.',
    mrPrompt: (ctx) => `${ctx}: विद्यार्थी रेल्वे वेळापत्रकातून केवळ एका विशिष्ट गाडीची सुटण्याची वेळ पटकन शोधतो; येथे वाचनाचे कोणते उपकौशल्य वापरले जाते?`,
    mrOpts: [
      'सूक्ष्म शोधवाचन (Scanning – नेमकी माहिती शोधणे)',
      'सारांश वाचन (Skimming)',
      'सखोल साहित्यिक समीक्षा',
      'सामुदायिक प्रकट वाचन',
    ],
    mrExp: 'विशिष्ट आकडा, वेळ किंवा नाव शोधण्यासाठी वेगाने नजर फिरवणे म्हणजे Scanning होय.',
    hiPrompt: (ctx) => `${ctx}: जब कोई विद्यार्थी समय-सारणी से किसी एक ट्रेन के प्रस्थान का सटीक समय शीघ्रता से खोजता है, तो वह कौन-सा पठन कौशल उपयोग कर रहा है?`,
    hiOpts: [
      'क्रमवीक्षण / विशिष्ट तथ्य खोज पठन (Scanning)',
      'विहंगम पठन (Skimming)',
      'गहन साहित्यिक समीक्षा',
      'सस्वर सामूहिक वाचन',
    ],
    hiExp: 'किसी विशिष्ट तथ्य (समय, तिथि, संख्या) को तुरंत खोजने के लिए Scanning का प्रयोग होता है।',
    urPrompt: (ctx) => `${ctx}: جب طالب علم ٹائم ٹیبل میں کسی خاص ٹرین کے روانہ ہونے کا وقت تیزی سے تلاش کرتا ہے تو یہ مطالعہ کی کون سی مہارت ہے؟`,
    urOpts: [
      'اسکیننگ (Scanning – مخصوص معلومات کی تلاش)',
      'اسکمنگ (Skimming – مرکزی خیال لینا)',
      'گہرا ادبی تنقیدی مطالعہ',
      'بلند آواز اجتماعی خواندگی',
    ],
    urExp: 'کسی خاص عدد، تاریخ یا وقت کی فوری تلاش کو اسکیننگ کہتے ہیں۔',
  },
];

const CONTEXT_BANKS = {
  English: [
    'Case Study (Primary Vocabulary Workshop)',
    'Classroom Situation (Reading Corner)',
    'CBSE / NCF Pedagogy Context',
    'Peer Storytelling Circle',
    'Bilingual Bridging Task',
    'Formative Writing Feedback',
    'Elementary Listening Lab',
    'Assessment Rubric Review',
    'Guided Oral Dialogue',
    'Print-Rich Classroom Wall',
  ],
  Marathi: [
    'वर्ग प्रसंग (वाचन कोपरा)',
    'बालभारती कृतियुक्त अध्यापन',
    'बहुभाषिक वर्ग संवाद',
    'उपचारात्मक भाषा वर्ग',
    'कथाकथन व श्रवण उपक्रम',
    'निर्मितीक्षम लेखन कार्यशाळा',
    'मूल्यमापन व अभिप्राय सत्र',
    'संदर्भयुक्त व्याकरण सराव',
  ],
  Hindi: [
    'कक्षा परिस्थिति (पठन कोना)',
    'एन.सी.एफ. आधारित भाषा सत्र',
    'संवादात्मक कहानी वाचन',
    'रचनात्मक लेखन कार्यशाला',
    'बहुभाषिक कक्षा सेतु',
    'सतत एवं व्यापक मूल्यांकन',
    'प्रसंगानुकूल व्याकरण अभ्यास',
    'सहपाठी पठन गतिविधि',
  ],
  Urdu: [
    'کلاس روم کا منظر (مطالعہ کارنر)',
    'تخلیقی تحریر کی سرگرمی',
    'کثیر اللسانی تدریسی ماحول',
    'کہانی گوئی اور سننے کی مشق',
    'تشخیصی و علاجی تدریس',
    'عملی قواعد کی مشق',
  ],
};

function deterministicSelect<T>(arr: T[], idx: number): T {
  return arr[((idx % arr.length) + arr.length) % arr.length];
}

export function generateTetCtetLanguageQuestion(params: {
  exam: TetCtetExamType;
  paper: TetCtetPaperNumber;
  poolType: TetCtetPoolType;
  testNumber: number;
  slotIndex: number; // 0..29 within language section
  isLanguage1: boolean;
  language: TetCtetLanguage;
  questionNumber: number; // 1..150
}): TetCtetQuestion {
  const {
    exam,
    paper,
    poolType,
    testNumber,
    slotIndex,
    isLanguage1,
    language,
    questionNumber,
  } = params;

  if (exam === 'MAHA_TET' && paper === 1 && poolType === 'MOCK' && testNumber >= 1 && testNumber <= 10) {
    const curatedLang =
      isLanguage1 && language === 'Marathi'
        ? getMahaTetP1B1MarathiL1Question(testNumber, slotIndex)
        : !isLanguage1 && language === 'English'
        ? getMahaTetP1B1EnglishL2Question(testNumber, slotIndex)
        : null;

    if (curatedLang) {
      const moduleIdCurated = getModuleId(exam, paper);
      const subjectIdCurated = isLanguage1 ? 'LANGUAGE_1' : 'LANGUAGE_2';
      const qIdCurated = `TETCTET-${exam}-P${paper}-T${String(testNumber).padStart(2, '0')}-${isLanguage1 ? 'L1' : 'L2'}-${language.toUpperCase()}-Q${String(questionNumber).padStart(3, '0')}`;
      const permuted = seededPermuteOptions(curatedLang.opts, 0, qIdCurated);
      return {
        id: qIdCurated,
        exam,
        paper,
        moduleId: moduleIdCurated,
        poolType,
        testNumber,
        batchNumber: Math.ceil(testNumber / 5),
        questionNumber,
        subjectId: subjectIdCurated,
        subjectLabel: `${isLanguage1 ? 'Language 1' : 'Language 2'} (${language})`,
        topic: curatedLang.topic,
        languageCode: language,
        mediumRendered: language,
        difficulty: curatedLang.difficulty,
        questionPattern: curatedLang.pattern,
        question: curatedLang.q,
        options: permuted.options,
        correctAnswer: permuted.correctAnswer,
        explanation: curatedLang.exp,
        marks: 1,
        conceptSignature: `${exam}|P1|MOCK|T${testNumber}|${subjectIdCurated}|${language}|${curatedLang.topic}|Q${questionNumber}`,
        normalizedHash: normalizeTetText(curatedLang.q),
        approvalStatus: 'approved',
      };
    }
  }

  const examOffset = exam === 'MAHA_TET' ? 0 : 100000;
  const paperOffset = paper === 1 ? 0 : 50000;
  const poolOffset =
    poolType === 'MOCK'
      ? 0
      : poolType === 'SUBJECT_PRACTICE'
      ? 200000
      : poolType === 'TOPIC_PRACTICE'
      ? 300000
      : poolType === 'REVISION'
      ? 400000
      : 500000;
  const lOffset = isLanguage1 ? 0 : 12000;
  const globalIdx =
    examOffset + paperOffset + poolOffset + lOffset + testNumber * 37 + slotIndex;

  const passages =
    language === 'Marathi'
      ? MARATHI_PASSAGES
      : language === 'Hindi'
      ? HINDI_PASSAGES
      : language === 'Urdu'
      ? URDU_PASSAGES
      : ENGLISH_PASSAGES;

  const grammarPool =
    language === 'Marathi'
      ? MARATHI_GRAMMAR_POOL
      : language === 'Hindi'
      ? HINDI_GRAMMAR_POOL
      : language === 'Urdu'
      ? URDU_GRAMMAR_POOL
      : ENGLISH_GRAMMAR_POOL;

  const moduleId = getModuleId(exam, paper);
  const subjectId = isLanguage1 ? 'LANGUAGE_1' : 'LANGUAGE_2';
  const subjectLabel = `${isLanguage1 ? 'Language 1' : 'Language 2'} (${language})`;
  const qId = `TETCTET-${exam}-P${paper}-${poolType === 'MOCK' ? `T${String(testNumber).padStart(2, '0')}` : poolType}-${isLanguage1 ? 'L1' : 'L2'}-${language.toUpperCase()}-Q${String(questionNumber).padStart(3, '0')}`;

  // First 15 slots: Comprehension / Grammar Content; Next 15 slots: Language Pedagogy
  let rawQuestion = '';
  let rawOptions: [string, string, string, string] = ['', '', '', ''];
  let rawCorrect = 0;
  let rawExplanation = '';
  let topic = '';
  let pattern: TetCtetQuestion['questionPattern'] = 'Comprehension';

  const paperStageTag =
    paper === 1
      ? language === 'Marathi'
        ? `इयत्ता १–५ (${exam === 'MAHA_TET' ? 'महाटेट' : 'सीटेट'} संच ${testNumber})`
        : language === 'Hindi'
        ? `कक्षा १–५ (${exam === 'MAHA_TET' ? 'महाटीईटी' : 'सीटेट'} सेट ${testNumber})`
        : language === 'Urdu'
        ? `جماعت ۱–۵ (سیٹ ${testNumber})`
        : `Primary Classes 1–5 (${exam === 'MAHA_TET' ? 'MAHA TET' : 'CTET'} Set ${testNumber})`
      : language === 'Marathi'
      ? `इयत्ता ६–८ (${exam === 'MAHA_TET' ? 'महाटेट' : 'सीटेट'} संच ${testNumber})`
      : language === 'Hindi'
      ? `कक्षा ६–८ (${exam === 'MAHA_TET' ? 'महाटीईटी' : 'सीटेट'} सेट ${testNumber})`
      : language === 'Urdu'
      ? `جماعت ۶–۸ (سیٹ ${testNumber})`
      : `Upper Primary Classes 6–8 (${exam === 'MAHA_TET' ? 'MAHA TET' : 'CTET'} Set ${testNumber})`;

  if (slotIndex < 7) {
    // Comprehension passage slot
    const pIdx = (globalIdx + slotIndex * 5) % passages.length;
    const passage = passages[pIdx];
    const qObj = passage.questions[(globalIdx + slotIndex * 3) % passage.questions.length];
    topic = `${passage.title} – Comprehension`;
    pattern = 'Comprehension';
    rawQuestion = `[${paperStageTag} · ${isLanguage1 ? 'L1' : 'L2'} Q${questionNumber} · "${passage.title}"]\n"${passage.text}"\n\n${qObj.q}`;
    rawOptions = qObj.opts;
    rawCorrect = qObj.ans;
    rawExplanation = qObj.exp;
  } else if (slotIndex < 15) {
    // Grammar & Vocabulary slot
    const gIdx = (globalIdx * 7 + slotIndex * 11) % grammarPool.length;
    const gItem = grammarPool[gIdx];
    topic = gItem.topic;
    pattern = 'Grammar';
    rawQuestion = `[${paperStageTag} · ${isLanguage1 ? 'L1' : 'L2'} Q${questionNumber} · ${gItem.topic}] ${gItem.prompt}`;
    rawOptions = gItem.options;
    rawCorrect = gItem.correct;
    rawExplanation = gItem.explanation;
  } else {
    // Language Pedagogy slots 15..29
    const pCore = deterministicSelect(LANG_PEDAGOGY_CORES, globalIdx + slotIndex * 5);
    const ctxList = CONTEXT_BANKS[language] || CONTEXT_BANKS.English;
    const ctx = `${deterministicSelect(ctxList, globalIdx * 5 + slotIndex * 3)} • ${paperStageTag} • ${isLanguage1 ? 'L1' : 'L2'} Q${questionNumber}`;
    topic = pCore.concept;
    pattern = slotIndex % 2 === 0 ? 'Classroom Scenario' : 'Pedagogical';

    if (language === 'Marathi') {
      rawQuestion = pCore.mrPrompt(ctx);
      rawOptions = pCore.mrOpts;
      rawExplanation = pCore.mrExp;
    } else if (language === 'Hindi') {
      rawQuestion = pCore.hiPrompt(ctx);
      rawOptions = pCore.hiOpts;
      rawExplanation = pCore.hiExp;
    } else if (language === 'Urdu') {
      rawQuestion = pCore.urPrompt(ctx);
      rawOptions = pCore.urOpts;
      rawExplanation = pCore.urExp;
    } else {
      rawQuestion = pCore.enPrompt(ctx);
      rawOptions = pCore.enOpts;
      rawExplanation = pCore.enExp;
    }
    rawCorrect = 0;
  }

  const permuted = seededPermuteOptions(rawOptions, rawCorrect, qId);
  const conceptSignature = `${exam}|P${paper}|${poolType}|T${testNumber}|${subjectId}|${language}|${topic}|Q${questionNumber}`;

  return {
    id: qId,
    exam,
    paper,
    moduleId,
    poolType,
    testNumber: poolType === 'MOCK' ? testNumber : undefined,
    batchNumber: poolType === 'MOCK' ? Math.ceil(testNumber / 5) : undefined,
    questionNumber,
    subjectId,
    subjectLabel,
    topic,
    languageCode: language,
    mediumRendered: language,
    difficulty:
      slotIndex % 4 === 0
        ? 'Pedagogical HOTS'
        : slotIndex % 3 === 0
        ? 'Difficult'
        : slotIndex % 2 === 0
        ? 'Moderate'
        : 'Easy',
    questionPattern: pattern,
    question: rawQuestion,
    options: permuted.options,
    correctAnswer: permuted.correctAnswer,
    explanation: rawExplanation,
    marks: 1,
    conceptSignature,
    normalizedHash: normalizeTetText(rawQuestion),
    approvalStatus: 'approved',
  };
}
