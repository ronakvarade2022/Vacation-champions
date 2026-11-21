import { ClassLevel, EducationBoard, SubjectName } from '../../../types';
import { CompactWorksheetQuestionSpec, WorksheetItemFormat } from '../types';
import { getClassNumber, getStageBand, getBoardSyllabusLabel } from './chapterCatalog';

type LangQ = {
  q: string;
  o: [string, string, string, string];
  a: 0 | 1 | 2 | 3;
  e: string;
};

function rotateQ(item: LangQ, shift: number, format: WorksheetItemFormat, c: string): CompactWorksheetQuestionSpec {
  const s = shift % 4;
  const idx = (s: number) => [0, 1, 2, 3].map((i) => (i + s) % 4);
  const map = idx(s);
  const newOpts: [string, string, string, string] = [
    item.o[map[0]],
    item.o[map[1]],
    item.o[map[2]],
    item.o[map[3]],
  ];
  const newAns = map.indexOf(item.a) as 0 | 1 | 2 | 3;
  return { f: format, c, q: item.q, o: newOpts, a: newAns, e: item.e };
}

// =========================================================================
// 1. ENGLISH & VOCABULARY/GRAMMAR BANKS (Class-Band Scaled)
// =========================================================================
const ENGLISH_EARLY_BANK: LangQ[] = [
  { q: 'Identify the naming word (noun) in this sentence: "The little puppy sleeps on the mat."', o: ['sleeps', 'little', 'puppy', 'on'], a: 2, e: '"Puppy" is the name of an animal, so it is a noun.' },
  { q: 'Fill in the blank with the correct article: "Riya eats ___ apple every morning."', o: ['a', 'an', 'the', 'two'], a: 1, e: 'Words beginning with a vowel sound ("apple") take "an".' },
  { q: 'Choose the correct plural form of the word "child":', o: ['childs', 'childes', 'children', 'childrens'], a: 2, e: '"Child" has the irregular plural "children".' },
  { q: 'Select the opposite (antonym) of the word "HAPPY":', o: ['glad', 'sad', 'kind', 'tall'], a: 1, e: '"Sad" means the opposite of "happy".' },
  { q: 'Which word in the list is an action word (verb)?', o: ['chair', 'jump', 'blue', 'garden'], a: 1, e: '"Jump" describes an action.' },
  { q: 'Pick the rhyming word that pairs with "CAKE":', o: ['ball', 'make', 'tree', 'book'], a: 1, e: '"Cake" and "make" share the same "-ake" ending sound.' },
  { q: 'Fill in the blank with the right pronoun: "Aarav is my friend. ___ plays cricket well."', o: ['She', 'It', 'He', 'They'], a: 2, e: '"He" replaces the singular boy’s name "Aarav".' },
  { q: 'Choose the describing word (adjective): "Look at that tall giraffe."', o: ['Look', 'that', 'tall', 'giraffe'], a: 2, e: '"Tall" describes the noun "giraffe".' },
  { q: 'Arrange the words into a meaningful sentence: "reads / Meera / book / a".', o: ['Book a reads Meera.', 'Meera reads a book.', 'Reads Meera book a.', 'A reads Meera book.'], a: 1, e: 'Subject + verb + object gives "Meera reads a book."' },
  { q: 'Choose the correct punctuation mark for: "What is your name___"', o: ['.', '!', '?', ','], a: 2, e: 'Questions always end with a question mark (?).' },
  { q: 'Choose the odd one out (animal vs objects): Dog, Cat, Table, Cow.', o: ['Dog', 'Cat', 'Table', 'Cow'], a: 2, e: 'A table is a non-living piece of furniture, while the others are animals.' },
  { q: 'Fill in the blank with the right preposition: "The cat is hiding ___ the bed."', o: ['under', 'fast', 'green', 'eat'], a: 0, e: '"Under" tells the position of the cat.' },
  { q: 'Find the matching pair of singular and plural: "one leaf" → ___', o: ['two leafs', 'two leaves', 'two leafes', 'two leavs'], a: 1, e: 'Nouns ending in -f like "leaf" change to "-ves": "leaves".' },
  { q: 'Which word is a synonym (same meaning) for "TINY"?', o: ['huge', 'loud', 'very small', 'heavy'], a: 2, e: '"Tiny" means very small.' },
  { q: 'True or False: Every sentence should begin with a capital letter.', o: ['True', 'False', 'Only on Mondays', 'Only for names'], a: 0, e: 'Sentences in English always start with a capital letter.' },
  { q: 'Pick the correct word: "The sun shines brightly ___ the sky."', o: ['in', 'off', 'up', 'by'], a: 0, e: 'We say "in the sky".' },
  { q: 'Identify the female counterpart (feminine gender) of "KING":', o: ['Prince', 'Queen', 'Uncle', 'Lion'], a: 1, e: 'The feminine pair of "King" is "Queen".' },
  { q: 'Choose the right spelling:', o: ['scool', 'school', 'schol', 'skool'], a: 1, e: 'The correct spelling is s-c-h-o-o-l.' },
];

const ENGLISH_UPPER_BANK: LangQ[] = [
  { q: 'Identify the collective noun in: "A flock of birds flew across the lake."', o: ['birds', 'flew', 'flock', 'lake'], a: 2, e: '"Flock" names a group of birds, making it a collective noun.' },
  { q: 'Fill in the blank with Simple Past tense: "Yesterday, our class ___ the science museum."', o: ['visit', 'visited', 'visiting', 'will visit'], a: 1, e: '"Yesterday" indicates past time, requiring past tense "visited".' },
  { q: 'Choose the correct comparative degree: "Gold is ___ than silver."', o: ['heavy', 'heavier', 'heaviest', 'more heavy'], a: 1, e: 'Comparing two nouns uses "-er": "heavier".' },
  { q: 'Pick the word with the correct prefix meaning "not possible":', o: ['unpossible', 'dispossible', 'impossible', 'mispossible'], a: 2, e: 'Before words starting with p/m, the negative prefix is "im-" (impossible).' },
  { q: 'Choose the right homophone: "Please wait here for an ___."', o: ['our', 'hour', 'are', 'ore'], a: 1, e: '"Hour" means 60 minutes; "our" shows belonging.' },
  { q: 'Identify the adverb in: "The tortoise walked slowly to the finish line."', o: ['tortoise', 'walked', 'slowly', 'finish'], a: 2, e: '"Slowly" tells how the action "walked" happened.' },
  { q: 'Join using the best conjunction: "I carried an umbrella ___ it looked cloudy."', o: ['but', 'because', 'or', 'unless'], a: 1, e: '"Because" introduces the reason for carrying the umbrella.' },
  { q: 'Find the synonym for "COURAGEOUS":', o: ['timid', 'brave', 'lazy', 'careless'], a: 1, e: '"Courageous" means brave and fearless.' },
  { q: 'One-word substitute: A person who treats sick people is called a ___.', o: ['carpenter', 'architect', 'doctor', 'pilot'], a: 2, e: 'A doctor treats illnesses.' },
  { q: 'Which sentence uses apostrophe punctuation correctly?', o: ['The boys bag is blue.', 'The boy’s bag is blue.', 'The boys’s bag is blue.', 'The boy bag’s is blue.'], a: 1, e: 'Singular possession takes apostrophe + s: "boy’s bag".' },
  { q: 'Identify the subject in the sentence: "The colourful butterflies hovered near the roses."', o: ['hovered near', 'the roses', 'The colourful butterflies', 'butterflies hovered'], a: 2, e: '"The colourful butterflies" tells who performed the action.' },
  { q: 'Choose the antonym of "ANCIENT":', o: ['historic', 'modern', 'old', 'wise'], a: 1, e: '"Modern" is the opposite of "ancient".' },
  { q: 'Identify the preposition of time: "Our Republic Day falls ___ 26th January."', o: ['at', 'on', 'in', 'since'], a: 1, e: 'Specific calendar dates use "on" (on 26th January).' },
  { q: 'Pick the correct Future Continuous form: "At 5 p.m., Rina ___ her homework."', o: ['does', 'did', 'will be doing', 'has done'], a: 2, e: 'Action in progress at a future time uses "will be doing".' },
  { q: 'Match proverb meaning: "A stitch in time saves nine" means:', o: ['Sewing clothes fast', 'Fixing a small problem early prevents a bigger one', 'Counting up to nine', 'Buying nine needles'], a: 1, e: 'Timely action saves extra trouble later.' },
  { q: 'Spot the abstract noun:', o: ['desk', 'honesty', 'river', 'teacher'], a: 1, e: '"Honesty" is a quality we cannot touch physically, so it is an abstract noun.' },
  { q: 'Select the correct subject-verb agreement: "Neither Kabir nor his sisters ___ late."', o: ['is', 'was', 'are', 'has'], a: 2, e: 'With "neither...nor", the verb agrees with the nearer plural subject "sisters" → "are".' },
  { q: 'Complete the simile: "As ___ as a feather."', o: ['heavy', 'light', 'sharp', 'dark'], a: 1, e: 'The standard English simile is "as light as a feather".' },
];

const ENGLISH_MIDDLE_BANK: LangQ[] = [
  { q: 'Convert into Passive Voice: "The scientist discovered a new comet."', o: ['A new comet is discovered by the scientist.', 'A new comet was discovered by the scientist.', 'The scientist was discovered by a comet.', 'A new comet has been discovering.'], a: 1, e: 'Simple past Active ("discovered") converts to "was discovered" in Passive.' },
  { q: 'Convert to Indirect Speech: He said, "I am reading an atlas."', o: ['He said that he is reading an atlas.', 'He said that he was reading an atlas.', 'He said that I was reading an atlas.', 'He says he read an atlas.'], a: 1, e: 'Present continuous in direct speech changes to past continuous ("was reading") with past reporting verb.' },
  { q: 'Identify the figure of speech: "The wind whispered secrets through the banyan leaves."', o: ['Simile', 'Personification', 'Alliteration', 'Hyperbole'], a: 1, e: 'Giving human ability ("whispered secrets") to non-human wind is Personification.' },
  { q: 'Choose the right phrasal verb: "Never ___ hope even when a puzzle seems difficult."', o: ['give in', 'give up', 'put out', 'take after'], a: 1, e: '"Give up" means to quit trying or lose hope.' },
  { q: 'Identify the type of underlined clause: "I know *where the library key is kept*."', o: ['Adverb clause', 'Adjective clause', 'Noun clause', 'Main clause'], a: 2, e: 'It acts as the direct object of the verb "know", so it is a Noun clause.' },
  { q: 'Select the correct conditional sentence:', o: ['If it will rain, the match stops.', 'If it rains, the match will be postponed.', 'If it rained, the match will stop.', 'If it had rain, we stay home.'], a: 1, e: 'Type 1 conditional pairs Simple Present in the if-clause with Simple Future ("will") in the main clause.' },
  { q: 'Pick the sentence with the correct modal for polite advice:', o: ['You must to obey traffic lights.', 'Students ought to respect library silence.', 'He can knows the route.', 'We might went yesterday.'], a: 1, e: '"Ought to" correctly expresses moral/polite duty.' },
  { q: 'Spot the error in: "Each of the players have received a medal."', o: ['Each of', 'the players', 'have received', 'a medal'], a: 2, e: '"Each" takes a singular verb: "has received".' },
  { q: 'Meaning of the idiom "Once in a blue moon":', o: ['Every night', 'Very rarely', 'In bright sunlight', 'Immediately'], a: 1, e: '"Once in a blue moon" means an event that happens very rarely.' },
  { q: 'Combine into a Complex sentence: "He worked hard. He wanted to win the scholarship."', o: ['He worked hard and won.', 'He worked hard so that he might win the scholarship.', 'Working hard, he wins.', 'He worked hard or failed.'], a: 1, e: '"so that he might..." introduces a subordinate clause of purpose.' },
  { q: 'Identify the Participle in: "A barking dog seldom bites."', o: ['dog', 'seldom', 'barking', 'bites'], a: 2, e: '"Barking" is a present participle functioning as an adjective modifying "dog".' },
  { q: 'Choose the correct determiner: "There is ___ milk left in the flask, enough for one cup."', o: ['few', 'a little', 'many', 'several'], a: 1, e: 'Uncountable positive small quantity uses "a little".' },
  { q: 'Choose the antonym of "TRANSPARENT":', o: ['clear', 'lucid', 'opaque', 'bright'], a: 2, e: '"Opaque" (allowing no light through) is the opposite of "transparent".' },
  { q: 'One word for "A speech delivered without previous preparation":', o: ['Dialogue', 'Extempore', 'Monologue', 'Epilogue'], a: 1, e: '"Extempore" means spoken or done without advance rehearsal.' },
  { q: 'Change to Exclamatory: "It is a very scenic valley."', o: ['How scenic valley is!', 'What a scenic valley it is!', 'Is it a scenic valley?', 'A scenic valley it was!'], a: 1, e: 'Noun phrases with "a/an + adj + noun" use "What a ... it is!".' },
  { q: 'Pick the correct spelling:', o: ['accommodate', 'acommodate', 'accomodate', 'acomodate'], a: 0, e: '"Accommodate" has double c and double m.' },
];

const ENGLISH_SECONDARY_BANK: LangQ[] = [
  { q: 'Transform into Simple sentence without changing meaning: "As soon as the bell rang, the students assembled."', o: ['No sooner did the bell ring than they stood.', 'On hearing the bell, the students assembled.', 'The bell rang and students stood.', 'Unless the bell rings, students assemble.'], a: 1, e: 'Using the prepositional phrase "On hearing the bell" keeps a single finite verb ("assembled").' },
  { q: 'Choose the grammatically accurate "No sooner...than" construction:', o: ['No sooner had the train arrived when passengers boarded.', 'No sooner did the train arrive than passengers boarded.', 'No sooner the train arrived than passengers boarded.', 'No sooner had the train arrived then passengers boarded.'], a: 1, e: '"No sooner" uses inverted auxiliary ("did/had") and pairs strictly with "than".' },
  { q: 'Identify the figure of speech: "All the world’s a stage, and all the men and women merely players."', o: ['Simile', 'Metaphor', 'Oxymoron', 'Onomatopoeia'], a: 1, e: 'Direct implied comparison without "like" or "as" is a Metaphor.' },
  { q: 'Spot the Subjunctive mood used for an unreal wish:', o: ['If I was rich, I travel.', 'If I were an astronaut, I would orbit Mars.', 'I wish I am there.', 'If he is taller, he plays.'], a: 1, e: 'Hypothetical present/future wishes use past subjunctive "were" paired with "would".' },
  { q: 'Choose the word closest in meaning to "EPHEMERAL":', o: ['eternal', 'short-lived', 'massive', 'fragile'], a: 1, e: '"Ephemeral" means lasting for a very brief period.' },
  { q: 'Identify the Gerund in: "Reading classic biographies broadens one’s perspective."', o: ['classic', 'broadens', 'Reading', 'perspective'], a: 2, e: '"Reading" ends in -ing and acts as the subject noun of the verb "broadens".' },
  { q: 'Remove "too...to" accurately: "The summit was too steep for novices to climb."', o: ['The summit was so steep that novices could not climb it.', 'The summit was very steep to climb.', 'Novices climbed the steep summit.', 'The summit was so steep for climbing.'], a: 0, e: '"too + adj + for X to V" transforms to "so + adj + that X cannot/could not V".' },
  { q: 'Identify the Oxymoron in the sentence:', o: ['Loud thunder shook the roof.', 'It was an open secret among classmates.', 'She ran as fast as deer.', 'Silver stars shone softly.'], a: 1, e: '"Open secret" combines two contradictory terms side by side.' },
  { q: 'Select the sentence using correct parallel structure:', o: ['She likes hiking, swimming, and to cycle.', 'She likes hiking, swimming, and cycling.', 'She likes to hike, swimming, and cycles.', 'She likes hike, swim, and cycling.'], a: 1, e: 'Parallelism requires matching grammatical forms: three gerunds ("hiking, swimming, cycling").' },
  { q: 'Assertion (A): "Hardly had the experiment begun when power failed." Reason (R): "Hardly" pairs with "when" and triggers subject-verb inversion.', o: ['Both A and R are true, and R correctly explains A.', 'Both A and R are true, but R does not explain A.', 'A is true but R is false.', 'A is false but R is true.'], a: 0, e: '"Hardly/Scarcely" at sentence start requires inverted auxiliary ("had the experiment...") and pairs with "when".' },
  { q: 'One-word substitution for "Capable of being read clearly (handwriting)":', o: ['Illegible', 'Legible', 'Inaudible', 'Tangible'], a: 1, e: '"Legible" means clear enough to read.' },
  { q: 'Choose the right Idiom meaning "Reveal a secret accidentally":', o: ['Hit the sack', 'Spill the beans', 'Bite the bullet', 'Break the ice'], a: 1, e: '"Spill the beans" means to disclose secret information prematurely.' },
  { q: 'Change to Passive (Imperative): "Please maintain silence in the archive."', o: ['Silence should maintain.', 'You are requested to maintain silence in the archive.', 'Maintain silence by you.', 'Silence was requested in archive.'], a: 1, e: 'Polite imperative requests beginning with "Please" transform to "You are requested to...".' },
  { q: 'Identify the Infinitive of Purpose: "Scientists launched sensors to measure ozone levels."', o: ['launched sensors', 'to measure', 'ozone levels', 'Scientists launched'], a: 1, e: '"To measure" (to + base verb) explains why the action occurred.' },
];

// =========================================================================
// 2. HINDI BANK
// =========================================================================
const HINDI_BANK: Record<'early' | 'upper_primary' | 'middle' | 'secondary', LangQ[]> = {
  early: [
    { q: 'हिंदी वर्णमाला में कुल कितने मुख्य स्वर (मूल) माने जाते हैं (अ से औ तक)?', o: ['९', '११', '१३', '१५'], a: 1, e: 'हिंदी में अ से औ तक ११ स्वर होते हैं (अं, अः अयोगवाह हैं)।' },
    { q: 'निम्न में से सही विलोम (उल्टा) शब्द जोड़ी चुनिए: "दिन" का विलोम क्या है?', o: ['सुबह', 'रात', 'शाम', 'सूरज'], a: 1, e: '"दिन" का विपरीतार्थक शब्द "रात" होता है।' },
    { q: 'चित्र/नाम पहचान: "मोर" हमारा राष्ट्रीय ___ है।', o: ['फल', 'फूल', 'पक्षी', 'पशु'], a: 2, e: 'मोर भारत का राष्ट्रीय पक्षी है।' },
    { q: 'सही स्त्रीलिंग शब्द चुनिए: "राजा" → ___', o: ['लड़का', 'रानी', 'भाई', 'चाचा'], a: 1, e: '"राजा" का स्त्रीलिंग रूप "रानी" होता है।' },
    { q: 'संज्ञा (नाम वाला शब्द) चुनिए: "मीना बाज़ार से आम लाई।"', o: ['से', 'लाई', 'आम', 'में'], a: 2, e: '"आम" एक फल का नाम है, अतः संज्ञा है (मीना व बाज़ार भी संज्ञा हैं)।' },
    { q: 'एकवचन से बहुवचन बनाइए: "किताब" → ___', o: ['किताबो', 'किताबें', 'किताबा', 'किताबी'], a: 1, e: '"किताब" का बहुवचन "किताबें" होता है।' },
    { q: 'हिंदी गिनती में १५ को शब्दों में कैसे लिखते हैं?', o: ['पच्चीस', 'पंद्रह', 'सोलह', 'चौदह'], a: 1, e: '15 को हिंदी में "पंद्रह" लिखा जाता है।' },
    { q: 'समान अर्थ वाला शब्द चुनिए: "सूरज" का पर्यायवाची क्या है?', o: ['चाँद', 'रवि', 'तारा', 'बादल'], a: 1, e: '"सूरज" को सूर्य, रवि, दिनकर आदि कहते हैं।' },
    { q: 'विषम शब्द (Odd one out) पहचानिए: आम, केला, पेंसिल, सेब।', o: ['आम', 'केला', 'पेंसिल', 'सेब'], a: 2, e: 'पेंसिल लिखने की सामग्री है जबकि शेष तीन फल हैं।' },
    { q: 'रिक्त स्थान भरिए: "बच्चे बगीचे में ___ रहे हैं।"', o: ['खेल', 'पीला', 'किताब', 'ऊँचा'], a: 0, e: 'वाक्य की क्रिया के अनुसार "खेल रहे हैं" उपयुक्त है।' },
    { q: 'सही वर्तनी (Spelling) चुनिए:', o: ['सूरज', 'सुरज', 'शूरज', 'सूरेज'], a: 0, e: 'शुद्ध वर्तनी "सूरज" (बड़े ऊ की मात्रा) है।' },
    { q: 'इनमें से कौन-सा शब्द विशेषण (गुण बताने वाला शब्द) है: "लाल गुलाब सुंदर है"?', o: ['गुलाब', 'लाल', 'है', 'फूल'], a: 1, e: '"लाल" रंग गुलाब की विशेषता बता रहा है।' },
  ],
  upper_primary: [
    { q: '"हिमालय" किस प्रकार की संज्ञा का उदाहरण है?', o: ['जातिवाचक संज्ञा', 'व्यक्तिवाचक संज्ञा', 'भाववाचक संज्ञा', 'द्रव्यवाचक संज्ञा'], a: 1, e: '"हिमालय" एक विशेष पर्वत का नाम है, अतः व्यक्तिवाचक संज्ञा है।' },
    { q: '"अँधेरे घर में दीया जलाना" से संबंधित मुहावरे "ईद का चाँद होना" का सही अर्थ क्या है?', o: ['बहुत दिनों बाद दिखाई देना', 'हमेशा पास रहना', 'गुस्सा होना', 'तेज़ दौड़ना'], a: 0, e: '"ईद का चाँद होना" का अर्थ है बहुत समय बाद दर्शन होना।' },
    { q: 'सही उपसर्ग जोड़कर शब्द बनाइए: "अ + ज्ञान" = ___', o: ['ज्ञाना', 'अज्ञान', 'सुज्ञान', 'प्रज्ञान'], a: 1, e: '"अ" उपसर्ग अभाव या नहीं का अर्थ देता है → अज्ञान।' },
    { q: 'अनेक शब्दों के लिए एक शब्द चुनिए: "जो प्रतिदिन होता हो"', o: ['साप्ताहिक', 'मासिक', 'दैनिक', 'वार्षिक'], a: 2, e: 'प्रतिदिन होने वाले कार्य को "दैनिक" कहते हैं।' },
    { q: 'सही काल पहचानिए: "कल हम चिड़ियाघर देखने जाएंगे।"', o: ['भूतकाल', 'वर्तमान काल', 'भविष्यत् काल', 'संदिग्ध भूतकाल'], a: 2, e: '"जाएंगे" आने वाले समय (भविष्यत् काल) का बोध कराता है।' },
    { q: 'भाववाचक संज्ञा चुनिए: "सच्चाई की हमेशा जीत होती है।"', o: ['हमेशा', 'जीत', 'सच्चाई', 'होती'], a: 2, e: '"सच्चाई" गुण/भाव को दर्शाने वाली भाववाचक संज्ञा है।' },
    { q: 'विलोम जोड़ी मिलाइए: "उदय" का विलोम शब्द है —', o: ['प्रकाश', 'अस्त', 'उत्थान', 'सुबह'], a: 1, e: '"उदय" (निकलना) का विलोम "अस्त" (डूबना) होता है।' },
    { q: '"जल" शब्द का पर्यायवाची समूह पहचानिए:', o: ['नीर, तोय, वारि', 'अनल, पावक, अग्नि', 'नभ, गगन, अंबर', 'पवन, समीर, वायु'], a: 0, e: 'नीर, तोय और वारि जल के पर्यायवाची हैं।' },
    { q: 'विराम-चिह्न चुनिए: विस्मयादिबोधक चिह्न कौन-सा है?', o: ['।', '?', '!', ';'], a: 2, e: 'हर्ष, शोक या आश्चर्य प्रकट करने के लिए "!" का प्रयोग होता है।' },
    { q: 'विशेषण पहचानिए: "कक्षा में चालीस विद्यार्थी हैं।" यहाँ "चालीस" कैसा विशेषण है?', o: ['गुणवाचक', 'संख्यावाचक', 'परिमाणवाचक', 'सार्वनामिक'], a: 1, e: '"चालीस" निश्चित संख्या बताता है, अतः संख्यावाचक विशेषण है।' },
    { q: 'वाक्य शुद्ध कीजिए: "मेरे को घर जाना है।" का मानक रूप क्या होगा?', o: ['मैं को घर जाना है।', 'मुझे घर जाना है।', 'हमको घर जाता है।', 'मेरा घर जाना है।'], a: 1, e: 'मानक हिंदी में "मेरे को" के स्थान पर "मुझे" प्रयुक्त होता है।' },
    { q: 'सर्वनाम चुनिए: "तुम अपना काम समय पर करो।"', o: ['काम', 'समय', 'तुम', 'करो'], a: 2, e: '"तुम" मध्यम पुरुषवाचक सर्वनाम है।' },
  ],
  middle: [
    { q: '"नौ दो ग्यारह होना" मुहावरे का सटीक अर्थ चुनिए:', o: ['गिनती सीखना', 'भाग जाना', 'एकजुट होना', 'लाभ कमाना'], a: 1, e: '"नौ दो ग्यारह होना" अर्थात चुपचाप भाग जाना।' },
    { q: 'संधि-विच्छेद कीजिए: "विद्यालय" शब्द किस संधि से बना है?', o: ['विद्या + आलय (दीर्घ स्वर संधि)', 'विद् + आलय', 'विद्या + लय', 'विद्य + आलय'], a: 0, e: 'आ + आ = आ बनने के कारण यह दीर्घ स्वर संधि है।' },
    { q: 'समास पहचानिए: "माता-पिता" में कौन-सा समास है?', o: ['तत्पुरुष समास', 'द्वंद्व समास', 'द्विगु समास', 'बहुव्रीहि समास'], a: 1, e: 'दोनों पद प्रधान होने व योजक चिह्न (-) से जुड़े होने के कारण द्वंद्व समास है।' },
    { q: 'वाच्य पहचानिए: "किसानों द्वारा फसल काटी गई।" यह कौन-सा वाच्य है?', o: ['कर्तृवाच्य', 'कर्मवाच्य', 'भाववाच्य', 'संयुक्त वाच्य'], a: 1, e: '"द्वारा" के साथ कर्म "फसल" की प्रधानता होने से यह कर्मवाच्य है।' },
    { q: 'श्रुतिसमभिन्नार्थक शब्द: "अनल" और "अनिल" का सही अर्थ युग्म क्या है?', o: ['हवा – आग', 'आग – हवा', 'पानी – आकाश', 'धरती – जल'], a: 1, e: '"अनल" का अर्थ अग्नि (आग) और "अनिल" का अर्थ वायु (हवा) है।' },
    { q: 'कारक पहचानिए: "पेड़ से पत्ता गिरा।" इसमें कौन-सा कारक है?', o: ['करण कारक', 'अपादान कारक', 'संप्रदान कारक', 'अधिकरण कारक'], a: 1, e: 'अलग होने का भाव होने से "से" यहाँ अपादान कारक है।' },
    { q: 'प्रत्यय अलग कीजिए: "ईमानदारी" शब्द में मूल शब्द और प्रत्यय क्या है?', o: ['ईमान + दारी', 'ईमानदार + ई', 'ई + मानदारी', 'ईमानदा + री'], a: 1, e: '"ईमानदार" विशेषण में "ई" प्रत्यय जुड़ने से "ईमानदारी" भाववाचक संज्ञा बनती है।' },
    { q: 'लोकोक्ति पूर्ण कीजिए: "अधजल गगरी ___ जाए।"', o: ['छलकत', 'भरत', 'चमकती', 'बजती'], a: 0, e: 'कम ज्ञान वाला अधिक दिखावा करता है ("अधजल गगरी छलकत जाए")।' },
    { q: 'द्विगु समास का सही उदाहरण चुनिए:', o: ['नीलकमल', 'त्रिलोक (तीन लोकों का समूह)', 'राजपुत्र', 'पीतांबर'], a: 1, e: 'जहाँ पहला पद संख्यावाची हो ("त्रि" = तीन), वहाँ द्विगु समास होता है।' },
    { q: 'क्रमानुसार व्यवस्थित करें (शब्दकोश क्रम): कमल, अमन, नगर, गगन।', o: ['अमन, कमल, गगन, नगर', 'कमल, अमन, नगर, गगन', 'अमन, गगन, कमल, नगर', 'नगर, कमल, गगन, अमन'], a: 0, e: 'वर्णमाला क्रम: अ → क → ग → न (अमन, कमल, गगन, नगर)।' },
    { q: '"जो उपकार को मानता हो" — इसके लिए एक सार्थक शब्द क्या होगा?', o: ['कृतघ्न', 'कृतज्ञ', 'परमार्थी', 'परोपकारी'], a: 1, e: 'उपकार मानने वाले को "कृतज्ञ" और न मानने वाले को "कृतघ्न" कहते हैं।' },
    { q: 'अविकारी शब्द (अव्यय) पहचानिए: "रवि तेज़ दौड़ता है।"', o: ['रवि', 'तेज़', 'दौड़ता', 'है'], a: 1, e: '"तेज़" क्रिया-विशेषण अव्यय है जिसका रूप लिंग-वचन से नहीं बदलता।' },
  ],
  secondary: [
    { q: 'अलंकार पहचानिए: "पीपर पात सरिस मन डोला।" में कौन-सा अलंकार है?', o: ['यमक', 'उपमा अलंकार', 'श्लेष', 'अतिशयोक्ति'], a: 1, e: 'वाचक शब्द "सरिस" (समान) द्वारा मन की तुलना पीपल के पत्ते से की गई है — अतः उपमा अलंकार।' },
    { q: 'संधि पहचानिए: "सूर्योदय" (सूर्य + उदय) में कौन-सी स्वर संधि है?', o: ['वृद्धि संधि', 'गुण स्वर संधि', 'यण संधि', 'अयादि संधि'], a: 1, e: 'अ/आ + उ = ओ होने से यह गुण स्वर संधि है।' },
    { q: 'रचना के आधार पर वाक्य भेद: "जब वर्षा रुकी, तब हम घर लौटे।" यह कैसा वाक्य है?', o: ['सरल वाक्य', 'संयुक्त वाक्य', 'मिश्र वाक्य', 'आज्ञार्थक वाक्य'], a: 2, e: 'प्रधान उपवाक्य और आश्रित उपवाक्य ("जब...तब") होने से यह मिश्र वाक्य है।' },
    { q: 'बहुव्रीहि समास चुनिए: "दशानन" का समास-विग्रह व भेद क्या है?', o: ['दस हैं आनन जिसके अर्थात रावण – बहुव्रीहि', 'दस सिरों का समूह – द्वंद्व', 'दस से युक्त – अव्ययीभाव', 'दस मुख – कर्मधारय'], a: 0, e: 'जब दोनों पद मिलकर किसी तीसरे विशेष अर्थ (रावण) का बोध कराएँ, तब बहुव्रीहि समास होता है।' },
    { q: 'रस पहचानिए: उत्साह भाव से किस रस की निष्पत्ति होती है?', o: ['करुण रस', 'वीर रस', 'शांत रस', 'हास्य रस'], a: 1, e: 'वीर रस का स्थायी भाव "उत्साह" होता है।' },
    { q: 'पुनरुक्ति या यमक पहचानिए: "काली घटा का घमंड घटा" में "घटा" शब्द किस अलंकार का उदाहरण है?', o: ['उपमा', 'यमक अलंकार', 'रूपक', 'उत्प्रेक्षा'], a: 1, e: 'एक शब्द दो बार आए और भिन्न अर्थ दे (बादल व कम होना) तो यमक अलंकार होता है।' },
    { q: 'भाववाच्य में बदलिए: "दादी अब चल नहीं सकतीं।"', o: ['दादी द्वारा चला गया।', 'दादी से अब चला नहीं जाता।', 'दादी अब नहीं चलेंगी।', 'दादी चलने में असमर्थ हैं।'], a: 1, e: 'असमर्थता सूचक अकर्मक क्रिया के साथ भाववाच्य में "से ... नहीं जाता" रूप बनता है।' },
    { q: 'कथन (A): "यद्यपि वह निर्धन है, तथापि ईमानदार है।" एक मिश्र वाक्य है। कारण (R): इसमें योजक समुच्चयबोधक "किंतु/परंतु" प्रयुक्त हुआ है।', o: ['A सत्य है किंतु R असत्य है', 'A और R दोनों सत्य हैं', 'A असत्य किंतु R सत्य', 'दोनों असत्य हैं'], a: 0, e: 'यह मिश्र वाक्य है ("यद्यपि...तथापि"), जबकि किंतु/परंतु संयुक्त वाक्य में आते हैं।' },
    { q: 'तत्सम शब्द पहचानिए: "अग्नि", "आग", "सूरज", "दूध" में से संस्कृतनिष्ठ तत्सम शब्द कौन-सा है?', o: ['आग', 'अग्नि', 'सूरज', 'दूध'], a: 1, e: '"अग्नि" शुद्ध संस्कृत तत्सम रूप है जिसका तद्भव "आग" है।' },
    { q: 'औपचारिक पत्र में प्रधानाचार्य को लिखते समय उचित अभिवादन/संबोधन क्या होगा?', o: ['प्रिय मित्र', 'आदरणीय प्राचार्य महोदय / मान्यवर', 'प्यारे सर', 'सप्रेम नमस्ते'], a: 1, e: 'औपचारिक कार्यालयीन/विद्यालयी पत्र में "मान्यवर / महोदय" लिखा जाता है।' },
  ],
};

// =========================================================================
// 3. MARATHI BANK
// =========================================================================
const MARATHI_BANK: Record<'early' | 'upper_primary' | 'middle' | 'secondary', LangQ[]> = {
  early: [
    { q: 'मराठी मुळाक्षरांमध्ये एकूण किती मुख्य स्वर मानले जातात (अ ते अः सहित पारंपरिक १४ किंवा १२)? अ, आ, इ, ई हे काय आहेत?', o: ['व्यंजने', 'स्वर', 'जोडाक्षरे', 'अंक'], a: 1, e: 'अ, आ, इ, ई इत्यादी हे मराठीतील स्वर आहेत.' },
    { q: 'योग्य विरुद्धार्थी शब्द ओळखा: "दिवस" × ___', o: ['सकाळ', 'रात्र', 'ऊन्ह', 'सायंकाळ'], a: 1, e: '"दिवस" चा विरुद्धार्थी शब्द "रात्र" हा आहे.' },
    { q: 'समानार्थी शब्द निवडा: "आई" म्हणजेच ___', o: ['ताई', 'माता / जननी', 'मावशी', 'काकी'], a: 1, e: '"आई" ला माता किंवा जननी असे म्हणतात.' },
    { q: 'वचन बदला (एकवचन → अनेकवचन): "पुस्तक" → ___', o: ['पुस्तकी', 'पुस्तके', 'पुस्तका', 'पुस्तको'], a: 1, e: 'नपुंसकलिंगी "पुस्तक" चे अनेकवचन "पुस्तके" होते.' },
    { q: 'लिंग बदला (पुल्लिंग → स्त्रीलिंग): "वाघ" → ___', o: ['वाघी', 'वाघीण', 'वाघू', 'सिंहीण'], a: 1, e: '"वाघ" चे स्त्रीलिंगी रूप "वाघीण" आहे.' },
    { q: 'खालीलपैकी नाम (व्यक्ती किंवा वस्तूचे नाव) ओळखा: "आंब्याच्या झाडावर पोपट बसला."', o: ['वर', 'बसला', 'पोपट', 'त्याचा'], a: 2, e: '"पोपट" हे एका पक्ष्याचे नाव (नाम) आहे.' },
    { q: 'यमक जुळणारा शब्द निवडा: "तारा" शी यमक जुळणारा शब्द कोणता?', o: ['पाणी', 'वारा', 'फूल', 'झाड'], a: 1, e: '"तारा" आणि "वारा" यांचा शेवटचा उच्चार सारखा आहे.' },
    { q: 'गटात न बसणारा शब्द (Odd one out) ओळखा: पेरू, केळी, पेन, द्राक्षे.', o: ['पेरू', 'केळी', 'पेन', 'द्राक्षे'], a: 2, e: '"पेन" ही लेखनवस्तू आहे, तर उरलेली तीन फळे आहेत.' },
    { q: 'मराठीत १८ ला अक्षरात कसे लिहितात?', o: ['अकरा', 'अठरा', 'सतरा', 'एकोणीस'], a: 1, e: '18 म्हणजे "अठरा".' },
    { q: 'रिकामी जागा भरा: "आकाशात काळे ___ जमा झाले."', o: ['झाडे', 'ढग', 'डोंगर', 'मासे'], a: 1, e: 'आकाशात पावसापूर्वी काळे ढग जमतात.' },
    { q: 'जोडाक्षर असलेला शब्द ओळखा:', o: ['कमल', 'सूर्य', 'घर', 'नदी'], a: 1, e: '"सूर्य" मध्ये र + य चे जोडाक्षर ("र्य") आहे.' },
    { q: 'योग्य शुद्धलेखन असलेला शब्द निवडा:', o: ['फुल', 'फूल', 'फूलं', 'फूळ'], a: 1, e: 'पुष्प या अर्थाने "फूल" (दीर्घ ऊकार) बरोबर आहे.' },
  ],
  upper_primary: [
    { q: 'शब्दांच्या जाती ओळखा: "राजू हुशार मुलगा आहे." या वाक्यातील "हुशार" काय आहे?', o: ['नाम', 'सर्वनाम', 'विशेषण', 'क्रियापद'], a: 2, e: '"हुशार" हा शब्द "मुलगा" या नामाबद्दल विशेष माहिती सांगतो, म्हणून ते विशेषण आहे.' },
    { q: 'काळ ओळखा: "सविता उद्या गावाला जाईल."', o: ['वर्तमानकाळ', 'भूतकाळ', 'भविष्यकाळ', 'अपूर्ण भूतकाळ'], a: 2, e: '"जाईल" हे क्रियापद येणाऱ्या वेळेचा (भविष्यकाळाचा) बोध करते.' },
    { q: 'वाक्प्रचाराचा योग्य अर्थ निवडा: "कान देऊन ऐकणे" म्हणजे —', o: ['झोपी जाणे', 'लक्षपूर्वक ऐकणे', 'रागावणे', 'दुर्लक्ष करणे'], a: 1, e: '"कान देऊन ऐकणे" म्हणजे पूर्ण एकाग्रतेने व लक्षपूर्वक ऐकणे.' },
    { q: 'म्हण पूर्ण करा: "अति तिथे ___."', o: ['शांती', 'माती', 'यश', 'आनंद'], a: 1, e: 'कोणत्याही गोष्टीचा अतिरेक नुकसानकारक असतो — "अति तिथे माती".' },
    { q: 'शब्दसमूहाबद्दल एक शब्द निवडा: "दररोज प्रसिद्ध होणारे (पत्र)" —', o: ['साप्ताहिक', 'पाक्षिक', 'दैनिक', 'मासिक'], a: 2, e: 'दररोज प्रकाशित होणाऱ्या वृत्तपत्राला "दैनिक" म्हणतात.' },
    { q: 'सर्वनाम ओळखा: "तो दररोज अभ्यास करतो."', o: ['दररोज', 'अभ्यास', 'तो', 'करतो'], a: 2, e: 'नामाऐवजी वापरलेला "तो" हा शब्द सर्वनाम आहे.' },
    { q: 'समानार्थी शब्दांची योग्य जोडी ओळखा:', o: ['पाणी – अग्नी', 'जमीन – वारा', 'कमल – पंकज', 'रात्र – दिवस'], a: 2, e: 'कमळ आणि पंकज हे समानार्थी शब्द आहेत.' },
    { q: 'विरामचिन्ह ओळखा: प्रश्नाच्या शेवटी कोणते चिन्ह वापरतात?', o: ['पूर्णविराम (.)', 'स्वल्पविराम (,)', 'प्रश्नचिन्ह (?)', 'उद्गारचिन्ह (!)'], a: 2, e: 'प्रश्न विचारल्यानंतर वाक्याच्या शेवटी प्रश्नचिन्ह (?) देतात.' },
    { q: 'अवतरण चिन्हे असलेले किंवा शुद्ध वाक्य निवडा:', o: ['शिवाजी महाराज थोर राजे होते.', 'सिवाजी महाराज थोर राजे होते.', 'शिवाजी महाराझ थोर होते.', 'शिवाजी महराज थोर राजे होते.'], a: 0, e: '"शिवाजी महाराज थोर राजे होते." हे शुद्ध लेखन आहे.' },
    { q: 'क्रियापद ओळखा: "पक्षी आकाशात उडतात."', o: ['पक्षी', 'आकाशात', 'उडतात', 'आणि'], a: 2, e: '"उडतात" हा शब्द वाक्याचा अर्थ पूर्ण करणारी क्रिया दर्शवतो.' },
  ],
  middle: [
    { q: 'प्रयोग ओळखा: "रामाने आंबा खाल्ला." या वाक्यातील प्रयोग कोणता?', o: ['कर्तरी प्रयोग', 'कर्मणी प्रयोग', 'भावे प्रयोग', 'अकर्मक कर्तरी'], a: 1, e: 'कर्ता तृतीयान्त ("रामाने") असून क्रियापद कर्म ("आंबा") प्रमाणे बदलते, म्हणून कर्मणी प्रयोग.' },
    { q: 'समास ओळखा: "पुरणपोळी" हा शब्द कोणत्या समासाचे उदाहरण आहे?', o: ['द्वंद्व समास', 'मध्यमपदलोपी कर्मधारय समास', 'द्विगु समास', 'अव्ययीभाव समास'], a: 1, e: '"पुरण घालून केलेली पोळी" मध्ये मधले पद गाळलेले असल्याने मध्यमपदलोपी समास आहे.' },
    { q: 'शब्दयोगी अव्यय ओळखा: "टेबलाखाली मांजर बसले आहे."', o: ['टेबल', 'खाली', 'मांजर', 'आहे'], a: 1, e: '"टेबला" या नामाला जोडून आलेले "खाली" हे शब्दयोगी अव्यय आहे.' },
    { q: 'विभक्ती ओळखा: "मुलांनी मैदानावर खेळ खेळला." यात "मुलांनी" ची विभक्ती कोणती?', o: ['प्रथमा', 'द्वितीया', 'तृतीया', 'सप्तमी'], a: 2, e: 'अनेकवचनात "-नी" प्रत्यय तृतीया विभक्तीचा असतो.' },
    { q: 'संधी सोडवा: "सज्जन" शब्दाची योग्य संधी फोड कोणती?', o: ['सत् + जन (व्यंजन संधी)', 'सज् + जन', 'सा + जन', 'सत् + अजन'], a: 0, e: 'त् पुढे ज आल्यास त्याचा ज होतो (सत् + जन = सज्जन).' },
    { q: '"तोंडचे पाणी पळणे" या वाक्प्रचाराचा अर्थ काय?', o: ['तहान लागणे', 'खूप घाबरणे / गांगरून जाणे', 'आनंदी होणे', 'जोरात हसणे'], a: 1, e: 'अचानक संकटाने खूप घाबरून जाणे याला "तोंडचे पाणी पळणे" म्हणतात.' },
    { q: 'द्विगु समास ओळखा: खालीलपैकी कोणता शब्द संख्याविशेषण द्विगु समासाचा आहे?', o: ['सूर्यप्रकाश', 'नवरत्न (नऊ रत्नांचा समूह)', 'रामलक्ष्मण', 'नीलकंठ'], a: 1, e: 'ज्या कर्मधारय समासाचे पहिले पद संख्याविशेषण असते त्याला द्विगु समास म्हणतात (उदा. नवरत्न).' },
    { q: 'उभयान्वयी अव्यय ओळखा: "अभ्यास कर म्हणजे यश मिळेल."', o: ['अभ्यास', 'म्हणजे', 'यश', 'मिळेल'], a: 1, e: 'दोन वाक्ये जोडणारा "म्हणजे" हा शब्द परिणामबोधक उभयान्वयी अव्यय आहे.' },
    { q: 'म्हण ओळखा: "काखेत कळसा अन गावाला ___."', o: ['वळसा', 'सजावट', 'रस्ता', 'आनंद'], a: 0, e: 'जवळच असलेली वस्तू सर्वत्र शोधणे — "काखेत कळसा अन गावाला वळसा".' },
    { q: 'केवळप्रयोगी अव्यय निवडा: "शाब्बास! तू स्पर्धेत पहिला आलास."', o: ['तू', 'स्पर्धेत', 'शाब्बास!', 'आलास'], a: 2, e: 'मनातील प्रशंसा व्यक्त करणारे उद्गारवाचक "शाब्बास!" हे केवळप्रयोगी अव्यय आहे.' },
  ],
  secondary: [
    { q: 'अलंकार ओळखा: "आभाळागत माया तुझी आम्हावरी राहू दे." यात कोणता अलंकार आहे?', o: ['उत्प्रेक्षा', 'उपमा अलंकार', 'रूपक', 'अतिशयोक्ति'], a: 1, e: '"-गत" (सारखे) या साधर्म्यवाचक शब्दाने मायेची तुलना आभाळाशी केली आहे — उपमा अलंकार.' },
    { q: 'उत्प्रेक्षा अलंकारातील प्रमुख वाचक शब्द कोणते असतात?', o: ['सारखा, सम, समान', 'जणू, जणूकाय, गमे, वाटे, भासे', 'कधीच नाही', 'आणि, अथवा'], a: 1, e: 'उपमेय हे जणू उपमानच आहे असे वर्णन करताना "जणू, गमे, वाटे, भासे" वापरतात.' },
    { q: 'वाक्यप्रकार ओळखा: "दररोज पहाटे व्यायाम करावा." हे कोणते वाक्य आहे?', o: ['प्रश्नार्थी', 'आज्ञार्थी / विद्यार्थ', 'उद्गारार्थी', 'नकारार्थी'], a: 1, e: '"करावा" (-वा प्रत्यय) योग्यतेचा किंवा कर्तव्याचा भाव दर्शवतो म्हणून विद्यार्थ वाक्य (विधी).' },
    { q: 'समास ओळखा: "महात्मा" (महान असा आत्मा) हा कोणता समास आहे?', o: ['द्वंद्व', 'कर्मधारय समास', 'बहुव्रीही', 'अव्ययीभाव'], a: 1, e: 'विशेषण (महान) व विशेष्य (आत्मा) एकाच विभक्तीत असल्याने कर्मधारय समास.' },
    { q: 'अव्ययीभाव समासाचे अचूक उदाहरण ओळखा:', o: ['यथाशक्ती (शक्तीप्रमाणे)', 'पंचवटी', 'बहीणभाऊ', 'क्रीडांगण'], a: 0, e: '"यथा, प्रति, आ" हे अव्यय प्रथम पदात आल्यास अव्ययीभाव समास होतो.' },
    { q: 'भावे प्रयोगाचे उदाहरण ओळखा:', o: ['मी निबंध लिहितो.', 'शिक्षकांनी विद्यार्थ्यांना शिकवावे.', 'मुलांनी आंबे खाल्ले.', 'राधा गाणे गाते.'], a: 1, e: 'कर्ता व कर्म दोन्ही सप्रत्ययी असून क्रियापद तृतीयपुरुषी नपुंसकलिंगी एकवचनी राहते — भावे प्रयोग.' },
    { q: 'वृत्त/यमक: "सुसंगती सदा घडो, सुजनवाक्य कानी पडो" या चरणात कोणते मात्रावृत्त किंवा अलंकार साधला आहे?', o: ['यमक अलंकार (घडो – पडो)', 'रूपक', 'विरोधाभास', 'श्लेष'], a: 0, e: 'ओळींच्या शेवटी "घडो – पडो" असे अक्षरसाम्य असल्याने यमक अलंकार आहे.' },
    { q: 'एस.एस.सी. उपयोजित लेखन: जाहिरात लेखनात कोणती बाब अत्यावश्यक असते?', o: ['लांबलचक परिच्छेद', 'आकर्षक शीर्षक, मुख्य वैशिष्ट्ये व संपर्क पत्ता', 'केवळ कविता', 'पाच पानी निबंध'], a: 1, e: 'कमी शब्दांत आकर्षक मथळा, वैशिष्ट्ये व संपर्क तपशील जाहिरातीत आवश्यक असतात.' },
  ],
};

// =========================================================================
// 4. SANSKRIT BANK
// =========================================================================
const SANSKRIT_BANK: LangQ[] = [
  { q: '"पठति" इति क्रियापदे कः लकारः अस्ति? (Which tense/mood is पठति?)', o: ['लङ्-लकारः (Past)', 'लट्-लकारः (Present)', 'लृट्-लकारः (Future)', 'लोट्-लकारः (Imperative)'], a: 1, e: 'पठति, पठतः, पठन्ति इत्येते लट्-लकारस्य (वर्तमानकालस्य) रूपाणि सन्ति।' },
  { q: 'सन्धि-विच्छेदं कुरुत: "विद्यालयः" = ___ + ___', o: ['विद्या + आलयः', 'विद् + आलयः', 'विद्या + लयः', 'विद्य + आलयः'], a: 0, e: 'अकः सवर्णे दीर्घः (आ + आ = आ) इति दीर्घसन्धिः।' },
  { q: 'संस्कृते त्रयः वचनाः के सन्ति?', o: ['केवलं द्वे', 'एकवचनम्, द्विवचनम्, बहुवचनम्', 'चत्वारि वचनानि', 'शून्यवचनम्'], a: 1, e: 'संस्कृतभाषायां एकवचनं, द्विवचनं, बहुवचनं च इति त्रीणि वचनानि सन्ति।' },
  { q: '"बालकः" शब्दस्य प्रथमा बहुवचनं रूपं किम्?', o: ['बालकौ', 'बालकाः', 'बालकम्', 'बालकेन'], a: 1, e: 'अकारान्त पुल्लिंग बालक शब्दः: प्रथमा — बालकः, बालकौ, बालकाः।' },
  { q: 'सङ्ख्या-वाचकम्: संस्कृते "१५" सङ्ख्यायाः शुद्धं पदं किम्?', o: ['पञ्चदश', 'षोडश', 'चतुर्दश', 'विंशतिः'], a: 0, e: '15 = पञ्चदश (5 + 10)।' },
  { q: '"गत्वा" पदे कः प्रत्ययः प्रयुक्तः अस्ति?', o: ['तुमुन्', 'क्त्वा प्रत्ययः', 'ल्यप्', 'शत्'], a: 1, e: 'गम् + क्त्वा = गत्वा (गच्छन् कृत्वा इत्यर्थे)।' },
  { q: 'विपरीतार्थक-पदम्: "सूर्योदयः" अस्य विलोमपदं किम्?', o: ['प्रभातः', 'सूर्यास्तः', 'मध्याह्नः', 'प्रकाशः'], a: 1, e: 'उदयः × अस्तः इति विलोमयुग्मम्।' },
  { q: 'अव्ययपदं चिनुत: "अहं श्वः ग्रामं गमिष्यामि।" अत्र अव्ययपदं किम्?', o: ['अहम्', 'श्वः (Tomorrow)', 'ग्रामम्', 'गमिष्यामि'], a: 1, e: '"श्वः" (आगामी दिवसः) इति अव्ययं वर्तते।' },
  { q: 'समास-नाम लिखत: "रामलक्ष्मणौ" पदे कः समासः?', o: ['द्वन्द्व समासः', 'द्विगु समासः', 'अव्ययीभावः', 'तत्पुरुषः'], a: 0, e: '"रामः च लक्ष्मणः च" इति इतरेतर द्वन्द्व समासः।' },
  { q: 'सन्धिं कुरुत: "सूर्य + उदयः" = ___', o: ['सूर्योदयः (गुण सन्धिः)', 'सूर्यदयः', 'सूर्यादयः', 'सूर्यौदयः'], a: 0, e: 'अ + उ = ओ इति गुणसन्धि-नियमेन "सूर्योदयः" भवति।' },
  { q: 'सुभाषित-पूर्तिः: "विद्या ददाति ___।"', o: ['धनम्', 'विनयम्', 'बलम्', 'क्रोधम्'], a: 1, e: '"विद्या ददाति विनयम्, विनयाद् याति पात्रताम्।" प्रसिद्धं सुभाषितम्।' },
  { q: 'कारक-प्रयोगः: "बालकः हस्तेन लिखति।" अत्र "हस्तेन" पदे का विभक्तिः?', o: ['प्रथमा', 'द्वितीया', 'तृतीया (करण कारकम्)', 'सप्तमी'], a: 2, e: 'साधकतमं करणं तृतीया (हस्तेन = हाथ से)।' },
  { q: 'लोट्-लकार (आज्ञार्थक): "तुम पढ़ो" इति वाक्यस्य अनुवादः कः?', o: ['त्वं पठसि', 'त्वं पठ', 'त्वं अपठः', 'त्वं पठिष्यसि'], a: 1, e: 'मध्यमपुरुष एकवचने लोट्-लकारे "पठ" रूपं भवति।' },
  { q: 'विसर्ग-सन्धिः: "मनः + रथः" = ___', o: ['मनोरथः', 'मनरथः', 'मनाःरथः', 'मनस् रथः'], a: 0, e: 'हशि च सूत्रेण विसर्गस्य उत्वम् + गुणः = मनोरथः।' },
];

export function generateLanguageQuestionForSlot(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName,
  wsNum: number,
  qIdx: number,
  format: WorksheetItemFormat,
  chapterName: string
): CompactWorksheetQuestionSpec {
  const c = getClassNumber(classLevel);
  const band = getStageBand(c);
  const boardTag = getBoardSyllabusLabel(board, c);
  const shift = wsNum * 3 + qIdx;

  let pool: LangQ[];
  if (subject === 'Hindi') {
    pool = HINDI_BANK[band];
  } else if (subject === 'Marathi') {
    pool = MARATHI_BANK[band];
  } else if (subject === 'Sanskrit') {
    pool = SANSKRIT_BANK;
  } else {
    pool =
      band === 'early'
        ? ENGLISH_EARLY_BANK
        : band === 'upper_primary'
        ? ENGLISH_UPPER_BANK
        : band === 'middle'
        ? ENGLISH_MIDDLE_BANK
        : ENGLISH_SECONDARY_BANK;
  }

  const index = (wsNum * 6 + qIdx) % pool.length;
  const picked = pool[index];
  // Wrap subtly with worksheet & chapter context if pool wraps after ~3 worksheets so no exact text duplicates within a subject
  const wrapPass = Math.floor((wsNum * 6 + qIdx) / pool.length);
  const contextualPrompt =
    wrapPass === 0
      ? picked.q
      : `(${boardTag} • ${classLevel} ${subject} • Set ${wsNum}) ${picked.q}`;

  return rotateQ({ ...picked, q: contextualPrompt }, shift, format, chapterName);
}
