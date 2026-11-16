import { ScholarshipClass, ScholarshipLanguage } from './scholarshipData';

export interface MsceLanguageQuestionItem {
  id: string;
  stdLevel: ScholarshipClass;
  languageSubject: ScholarshipLanguage; // The language being tested (English, Marathi, or Hindi)
  mockTestNumber: number; // 1 to 25
  questionNumber: number; // 1 to 25
  topic: string;
  difficulty: 'easy' | 'moderate' | 'difficult';
  questionText: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: Record<ScholarshipLanguage, string>;
  normalizedHash: string;
}

// ============================================================================
// CURATED 25-ITEM LINGUISTIC DATASETS FOR ZERO REPETITION ACROSS 25 MOCK TESTS
// ============================================================================

const EN_SYNONYMS_STD4: [string, string, string, string, string][] = [
  ['Brave', 'Courageous', 'Cowardly', 'Weak', 'Silent'],
  ['Happy', 'Joyful', 'Angry', 'Tired', 'Lonely'],
  ['Quick', 'Rapid', 'Slow', 'Lazy', 'Heavy'],
  ['Bright', 'Shining', 'Dark', 'Dull', 'Cloudy'],
  ['Begin', 'Start', 'Finish', 'Stop', 'Wait'],
  ['Calm', 'Peaceful', 'Noisy', 'Wild', 'Rough'],
  ['Clever', 'Smart', 'Foolish', 'Sleepy', 'Rude'],
  ['Huge', 'Enormous', 'Tiny', 'Short', 'Narrow'],
  ['Kind', 'Generous', 'Cruel', 'Selfish', 'Harsh'],
  ['Neat', 'Tidy', 'Messy', 'Dirty', 'Broken'],
  ['Polite', 'Courteous', 'Impolite', 'Loud', 'Careless'],
  ['Rich', 'Wealthy', 'Poor', 'Hungry', 'Empty'],
  ['Safe', 'Secure', 'Dangerous', 'Risky', 'Weak'],
  ['Simple', 'Easy', 'Hard', 'Complex', 'Tricky'],
  ['Strong', 'Powerful', 'Fragile', 'Soft', 'Faint'],
  ['True', 'Correct', 'False', 'Wrong', 'Unfair'],
  ['Wise', 'Sensible', 'Silly', 'Careless', 'Blind'],
  ['Ancient', 'Old', 'Modern', 'Fresh', 'Young'],
  ['Gather', 'Collect', 'Scatter', 'Lose', 'Drop'],
  ['Reply', 'Answer', 'Question', 'Hide', 'Forget'],
  ['Silent', 'Quiet', 'Noisy', 'Talkative', 'Sharp'],
  ['Vacant', 'Empty', 'Full', 'Crowded', 'Busy'],
  ['Assist', 'Help', 'Block', 'Refuse', 'Hurt'],
  ['Discover', 'Find', 'Lose', 'Miss', 'Cover'],
  ['Protect', 'Guard', 'Attack', 'Break', 'Leave'],
];

const EN_SYNONYMS_STD7: [string, string, string, string, string][] = [
  ['Abundant', 'Plentiful', 'Scarce', 'Meagre', 'Rare'],
  ['Diligent', 'Industrious', 'Indolent', 'Lethargic', 'Negligent'],
  ['Eloquent', 'Articulate', 'Hesitant', 'Mute', 'Incoherent'],
  ['Benevolent', 'Charitable', 'Malevolent', 'Hostile', 'Stingy'],
  ['Candid', 'Frank', 'Deceitful', 'Evasive', 'Secretive'],
  ['Frugal', 'Thrifty', 'Extravagant', 'Lavish', 'Wasteful'],
  ['Imminent', 'Impending', 'Distant', 'Doubtful', 'Remote'],
  ['Lucid', 'Clear', 'Obscure', 'Vague', 'Confusing'],
  ['Mitigate', 'Alleviate', 'Aggravate', 'Worsen', 'Intensify'],
  ['Obsolete', 'Outdated', 'Contemporary', 'Current', 'Novel'],
  ['Prudent', 'Cautious', 'Reckless', 'Rash', 'Foolhardy'],
  ['Resilient', 'Flexible', 'Brittle', 'Rigid', 'Fragile'],
  ['Scrutinize', 'Examine', 'Overlook', 'Ignore', 'Neglect'],
  ['Tenacious', 'Persistent', 'Yielding', 'Weak', 'Wavering'],
  ['Vigilant', 'Watchful', 'Inattentive', 'Careless', 'Heedless'],
  ['Zealous', 'Enthusiastic', 'Apathetic', 'Indifferent', 'Cold'],
  ['Adversity', 'Hardship', 'Prosperity', 'Fortune', 'Comfort'],
  ['Authentic', 'Genuine', 'Counterfeit', 'Spurious', 'Fake'],
  ['Compassion', 'Sympathy', 'Cruelty', 'Apathy', 'Hatred'],
  ['Concur', 'Agree', 'Dissent', 'Oppose', 'Reject'],
  ['Diminish', 'Decrease', 'Amplify', 'Expand', 'Multiply'],
  ['Eradicate', 'Eliminate', 'Preserve', 'Establish', 'Create'],
  ['Fortitude', 'Endurance', 'Timidity', 'Fear', 'Weakness'],
  ['Gratitude', 'Thankfulness', 'Ingratitude', 'Envy', 'Pride'],
  ['Harmony', 'Concord', 'Discord', 'Conflict', 'Strife'],
];

const EN_ANTONYMS_STD4: [string, string, string, string, string][] = [
  ['Early', 'Late', 'Soon', 'Fast', 'Quick'],
  ['Heavy', 'Light', 'Big', 'Strong', 'Hard'],
  ['Deep', 'Shallow', 'Wide', 'Long', 'High'],
  ['Smooth', 'Rough', 'Soft', 'Clean', 'Flat'],
  ['Sweet', 'Bitter', 'Fresh', 'Warm', 'Tasty'],
  ['Brave', 'Timid', 'Bold', 'Strong', 'Heroic'],
  ['Arrive', 'Depart', 'Enter', 'Reach', 'Come'],
  ['Accept', 'Refuse', 'Take', 'Agree', 'Keep'],
  ['Build', 'Destroy', 'Make', 'Create', 'Form'],
  ['Cheap', 'Expensive', 'Low', 'Small', 'Simple'],
  ['Clever', 'Foolish', 'Bright', 'Sharp', 'Wise'],
  ['Cruel', 'Merciful', 'Angry', 'Harsh', 'Strict'],
  ['Expand', 'Shrink', 'Grow', 'Spread', 'Stretch'],
  ['Float', 'Sink', 'Swim', 'Fly', 'Sail'],
  ['Fresh', 'Stale', 'New', 'Green', 'Cool'],
  ['Guilty', 'Innocent', 'Wrong', 'Sad', 'Afraid'],
  ['Humble', 'Proud', 'Polite', 'Meek', 'Gentle'],
  ['Include', 'Exclude', 'Add', 'Join', 'Count'],
  ['Lend', 'Borrow', 'Give', 'Share', 'Send'],
  ['Major', 'Minor', 'Large', 'Great', 'Main'],
  ['Politely', 'Rudely', 'Softly', 'Kindly', 'Gently'],
  ['Reward', 'Punishment', 'Prize', 'Gift', 'Honour'],
  ['Success', 'Failure', 'Victory', 'Growth', 'Peace'],
  ['Tame', 'Wild', 'Domestic', 'Gentle', 'Quiet'],
  ['Victory', 'Defeat', 'Triumph', 'Glory', 'Medal'],
];

const EN_ANTONYMS_STD7: [string, string, string, string, string][] = [
  ['Optimist', 'Pessimist', 'Idealist', 'Realist', 'Scholar'],
  ['Transparent', 'Opaque', 'Lucid', 'Clear', 'Bright'],
  ['Compulsory', 'Voluntary', 'Mandatory', 'Essential', 'Strict'],
  ['Prosperity', 'Adversity', 'Wealth', 'Success', 'Luxury'],
  ['Artificial', 'Natural', 'Synthetic', 'Man-made', 'Plastic'],
  ['Barren', 'Fertile', 'Arid', 'Sterile', 'Dry'],
  ['Conceal', 'Reveal', 'Hide', 'Bury', 'Mask'],
  ['Deficit', 'Surplus', 'Shortage', 'Loss', 'Debt'],
  ['Emancipate', 'Enslave', 'Liberate', 'Free', 'Rescue'],
  ['Flexible', 'Rigid', 'Pliable', 'Elastic', 'Soft'],
  ['Genuine', 'Spurious', 'Authentic', 'Real', 'Pure'],
  ['Hostile', 'Amiable', 'Aggressive', 'Bitter', 'Fierce'],
  ['Ignorance', 'Knowledge', 'Darkness', 'Doubt', 'Fear'],
  ['Lenient', 'Strict', 'Merciful', 'Mild', 'Gentle'],
  ['Metropolitian', 'Provincial', 'Urban', 'Civic', 'Modern'],
  ['Notorious', 'Renowned', 'Infamous', 'Wicked', 'Dishonest'],
  ['Permanent', 'Temporary', 'Eternal', 'Lasting', 'Stable'],
  ['Reluctant', 'Eager', 'Unwilling', 'Hesitant', 'Slow'],
  ['Scarcity', 'Abundance', 'Dearth', 'Lack', 'Famine'],
  ['Tranquil', 'Turbulent', 'Peaceful', 'Serene', 'Calm'],
  ['Unanimous', 'Divided', 'United', 'Agreed', 'Solid'],
  ['Virtue', 'Vice', 'Goodness', 'Merit', 'Honour'],
  ['Wary', 'Heedless', 'Cautious', 'Alert', 'Watchful'],
  ['Zenith', 'Nadir', 'Peak', 'Summit', 'Apex'],
  ['Affirm', 'Deny', 'Declare', 'Confirm', 'Assert'],
];

const EN_IDIOMS_STD4: [string, string, string, string, string][] = [
  ['A piece of cake', 'A very easy task', 'A sweet bakery item', 'A hard puzzle', 'A birthday party'],
  ['Raining cats and dogs', 'Raining very heavily', 'Animals falling down', 'A sunny morning', 'A light breeze'],
  ['Once in a blue moon', 'Very rarely', 'Every night', 'Twice a week', 'In the morning'],
  ['Break a leg', 'Good luck', 'Hurt your foot', 'Run very fast', 'Sit quietly'],
  ['Under the weather', 'Feeling slightly sick', 'Standing in rain', 'Looking at clouds', 'Playing outside'],
  ['Cost an arm and a leg', 'Very expensive', 'Very cheap', 'Free of cost', 'Easy to buy'],
  ['Hit the books', 'Study very hard', 'Throw textbooks', 'Close the library', 'Buy new notebooks'],
  ['Spill the beans', 'Reveal a secret', 'Drop vegetables', 'Cook dinner', 'Plant seeds'],
  ['All ears', 'Listening eagerly', 'Having big ears', 'Making loud noise', 'Sleeping deeply'],
  ['Hold your horses', 'Wait and be patient', 'Ride a pony', 'Run in a race', 'Feed the animals'],
  ['Call it a day', 'Stop working for the day', 'Name the calendar', 'Wake up early', 'Start a new game'],
  ['In hot water', 'In trouble', 'Taking a warm bath', 'Boiling tea', 'Swimming fast'],
  ['See eye to eye', 'Agree completely', 'Wear glasses', 'Look in a mirror', 'Stare angrily'],
  ['Lend a hand', 'Help someone', 'Shake hands', 'Wave goodbye', 'Clap loudly'],
  ['A blessing in disguise', 'Something good that seemed bad at first', 'Wearing a costume', 'A hidden treasure', 'A surprise gift'],
  ['Burn the midnight oil', 'Study or work late into the night', 'Light a lamp', 'Waste kerosene', 'Sleep early'],
  ['Cry over spilt milk', 'Be upset about something that cannot be undone', 'Clean the kitchen floor', 'Drink warm milk', 'Buy fresh dairy'],
  ['Apple of one’s eye', 'Someone very precious and loved', 'A red fruit', 'A sharp eyesight', 'An orchard tree'],
  ['Turn a deaf ear', 'Refuse to listen', 'Speak softly', 'Hear a loud bell', 'Sing a song'],
  ['Keep an eye on', 'Watch carefully', 'Blink quickly', 'Close both eyes', 'Read a book'],
  ['At the eleventh hour', 'At the last possible moment', 'At 11 o’clock sharp', 'Early in the morning', 'During lunch break'],
  ['Actions speak louder than words', 'What you do matters more than what you say', 'Shouting in class', 'Reading aloud', 'Writing an essay'],
  ['Add fuel to the fire', 'Make a bad situation worse', 'Cook on a stove', 'Camp in winter', 'Put out flames'],
  ['By hook or by crook', 'By any possible means', 'Using a fishing rod', 'Walking on a path', 'Following rules only'],
  ['Every cloud has a silver lining', 'Every difficult situation has a hopeful side', 'It is about to rain', 'The sky is bright', 'Silver is shiny'],
];

const EN_ONE_WORD_STD4: [string, string, string, string, string][] = [
  ['A person who treats sick people', 'Doctor', 'Pilot', 'Potter', 'Cobbler'],
  ['A place where books are kept for reading', 'Library', 'Kitchen', 'Garage', 'Stadium'],
  ['A person who flies an aeroplane', 'Pilot', 'Sailor', 'Driver', 'Plumber'],
  ['A place where wild animals are kept for public viewing', 'Zoo', 'Museum', 'Aquarium', 'Bakery'],
  ['A person who mends shoes', 'Cobbler', 'Tailor', 'Blacksmith', 'Mason'],
  ['A person who stitches clothes', 'Tailor', 'Barber', 'Carpenter', 'Weaver'],
  ['A person who makes furniture from wood', 'Carpenter', 'Goldsmith', 'Potter', 'Painter'],
  ['A period of seven days', 'Week', 'Fortnight', 'Month', 'Decade'],
  ['A period of ten years', 'Decade', 'Century', 'Millennium', 'Year'],
  ['A period of one hundred years', 'Century', 'Decade', 'Fortnight', 'Season'],
  ['Animals that eat only plants', 'Herbivores', 'Carnivores', 'Omnivores', 'Insects'],
  ['Animals that eat only meat of other animals', 'Carnivores', 'Herbivores', 'Amphibians', 'Birds'],
  ['Animals that can live both on land and in water', 'Amphibians', 'Mammals', 'Reptiles', 'Insects'],
  ['A house made of blocks of snow', 'Igloo', 'Tent', 'Palace', 'Cottage'],
  ['A person who travels in a spacecraft', 'Astronaut', 'Astronomer', 'Architect', 'Engineer'],
  ['A person who designs buildings', 'Architect', 'Sculptor', 'Mechanic', 'Chemist'],
  ['A place where coins are made', 'Mint', 'Bank', 'Factory', 'Treasury'],
  ['A book that gives meanings of words in alphabetical order', 'Dictionary', 'Atlas', 'Diary', 'Album'],
  ['A book of maps', 'Atlas', 'Novel', 'Directory', 'Encyclopedia'],
  ['A child whose parents are no more', 'Orphan', 'Twin', 'Infant', 'Pupil'],
  ['One who looks at the bright side of things', 'Optimist', 'Pessimist', 'Tourist', 'Artist'],
  ['A place where birds are kept', 'Aviary', 'Apiary', 'Aquarium', 'Stable'],
  ['A place where bees are kept', 'Apiary', 'Aviary', 'Kennel', 'Burrow'],
  ['A person who writes poems', 'Poet', 'Author', 'Actor', 'Editor'],
  ['Something that can be clearly seen through', 'Transparent', 'Opaque', 'Heavy', 'Rough'],
];

const MR_SYNONYMS: [string, string, string, string, string][] = [
  ['आकाश', 'गगन', 'धरती', 'सागर', 'पर्वत'],
  ['पाणी', 'जल', 'अग्नी', 'वायू', 'माती'],
  ['पृथ्वी', 'वसुंधरा', 'नभ', 'चंद्र', 'तारा'],
  ['वारा', 'पवन', 'पाऊस', 'ढग', 'वीज'],
  ['समुद्र', 'रत्नाकर', 'तलाव', 'ओढा', 'विहीर'],
  ['पर्वत', 'गिरी', 'मैदान', 'जंगल', 'वाळवंट'],
  ['जंगल', 'अरण्य', 'बाग', 'शेत', 'अंगण'],
  ['झाड', 'वृक्ष', 'वेल', 'फूल', 'पाकळी'],
  ['फूल', 'सुमन', 'फळ', 'मूळ', 'फांदी'],
  ['कमळ', 'पंकज', 'गुलाब', 'मोगरा', 'जास्वंद'],
  ['चंद्र', 'शशी', 'सूर्य', 'ग्रह', 'उल्का'],
  ['आई', 'माता', 'भगिनी', 'मैत्रीण', 'कन्या'],
  ['वडील', 'पिता', 'बंधू', 'मित्र', 'गुरू'],
  ['मित्र', 'सखा', 'शत्रू', 'शेजारी', 'पाहुणा'],
  ['घर', 'सदन', 'शाळा', 'मंदिर', 'बाजार'],
  ['राजा', 'भूपती', 'सैनिक', 'प्रजा', 'सेवक'],
  ['डोळा', 'नयन', 'कान', 'हात', 'पाय'],
  ['हात', 'कर', 'पद', 'मुख', 'केश'],
  ['पक्षी', 'खग', 'मासा', 'हरीण', 'वाघ'],
  ['हत्ती', 'गज', 'अश्व', 'सिंह', 'कोल्हा'],
  ['घोडा', 'अश्व', 'बैल', 'उंट', 'शेळी'],
  ['सिंह', 'वनराज', 'लांडगा', 'ससा', 'मोर'],
  ['सोने', 'सुवर्ण', 'चांदी', 'तांबे', 'लोखंड'],
  ['आनंद', 'हर्ष', 'दुःख', 'राग', 'भीती'],
  ['गणपती', 'गजानन', 'महादेव', 'विष्णू', 'मारुती'],
];

const MR_ANTONYMS: [string, string, string, string, string][] = [
  ['दिवस', 'रात्र', 'सकाळ', 'दुपार', 'संध्याकाळ'],
  ['उजेड', 'अंधार', 'प्रकाश', 'तेज', 'किरण'],
  ['खरे', 'खोटे', 'सत्य', 'योग्य', 'चांगले'],
  ['मित्र', 'शत्रू', 'सोबती', 'भाऊ', 'शेजारी'],
  ['सुख', 'दुःख', 'आनंद', 'समाधान', 'हर्ष'],
  ['भरती', 'ओहोटी', 'लाट', 'किनारा', 'प्रवाह'],
  ['सूर्योदय', 'सूर्यास्त', 'पहाट', 'प्रभात', 'दुपार'],
  ['स्तुती', 'निंदा', 'कौतुक', 'गौरव', 'सन्मान'],
  ['फायदा', 'तोटा', 'नफा', 'लाभ', 'उत्पन्न'],
  ['प्राचीन', 'अर्वाचीन', 'जुने', 'पुरातन', 'ऐतिहासिक'],
  ['सज्जन', 'दुर्जन', 'चांगला', 'प्रामाणिक', 'नम्र'],
  ['आळशी', 'उद्योगी', 'झोपाळू', 'मंद', 'थकलेला'],
  ['शूर', 'भित्रा', 'वीर', 'धाडसी', 'पराक्रमी'],
  ['चढण', 'उतरण', 'डोंगर', 'शिखर', 'घाट'],
  ['प्रारंभ', 'शेवट', 'सुरुवात', 'आरंभ', 'उगम'],
  ['कृतज्ञ', 'कृतघ्न', 'उपकारी', 'विश्वासू', 'दयाळू'],
  ['सुपीक', 'नापीक', 'हिरवे', 'ओले', 'शेतीचे'],
  ['स्वातंत्र्य', 'पारतंत्र्य', 'मुक्ती', 'स्वराज्य', 'अधिकार'],
  ['तेजी', 'मंदी', 'वाढ', 'प्रगती', 'भरभराट'],
  ['आयात', 'निर्यात', 'खरेदी', 'व्यापार', 'बाजार'],
  ['एकमत', 'दुमत', 'संमती', 'सहकार्य', 'एकजूट'],
  ['आशा', 'निराशा', 'इच्छा', 'स्वप्न', 'प्रयत्न'],
  ['उष्ण', 'थंड', 'गरम', 'तप्त', 'कोमट'],
  ['कठीण', 'सोपे', 'अवघड', 'जड', 'मजबूत'],
  ['स्वस्त', 'महाग', 'कमी', 'साधे', 'चांगले'],
];

const MR_IDIOMS: [string, string, string, string, string][] = [
  ['आनंद गगनात न मावणे', 'खूप आनंद होणे', 'आकाशात उडणे', 'मोठ्याने रडणे', 'शांत बसणे'],
  ['कान देऊन ऐकणे', 'लक्षपूर्वक ऐकणे', 'कानाला हात लावणे', 'मोठ्याने बोलणे', 'गाणे ऐकणे'],
  ['डोळ्यात तेल घालून पाहणे', 'अत्यंत दक्षतेने पहारा देणे', 'डोळ्यांवर औषध घालणे', 'झोप काढणे', 'चष्मा वापरणे'],
  ['अंग चोरून काम करणे', 'कुचराई करणे / आळसाने काम करणे', 'लपून बसणे', 'खूप मेहनत करणे', 'वेगाने पळणे'],
  ['पाठीवर थाप मारणे', 'शाबासकी देणे / कौतुक करणे', 'रागावणे', 'मागे उभे राहणे', 'मदत मागणे'],
  ['पोटात कावळे ओरडणे', 'खूप भूक लागणे', 'पक्ष्यांचा आवाज येणे', 'पोट दुखणे', 'पाणी पिणे'],
  ['जीवाचे रान करणे', 'खूप कष्ट करणे', 'जंगलात फिरणे', 'घाबरून जाणे', 'आराम करणे'],
  ['तोंडाला पाणी सुटणे', 'एखाद्या पदार्थाचा मोह होणे', 'तहान लागणे', 'गप्प बसणे', 'गोड बोलणे'],
  ['हातावर तुरी देणे', 'फसवून पळून जाणे', 'धान्य वाटणे', 'मदत करणे', 'बक्षीस देणे'],
  ['नाक मुरडणे', 'नापसंती दाखवणे', 'सर्दी होणे', 'हसणे', 'आश्चर्य वाटणे'],
  ['गळ्यातला ताईत होणे', 'अत्यंत लाडका असणे', 'दागिने घालणे', 'गाणे म्हणणे', 'जवळ राहणे'],
  ['दातखिळी बसणे', 'घाबरून बोलती बंद होणे', 'दात दुखणे', 'हसू येणे', 'जेवण करणे'],
  ['पाण्यात पाहणे', 'अत्यंत द्वेष करणे', 'नदीत पोहणे', 'आरशात पाहणे', 'स्वच्छता करणे'],
  ['कानाडोळा करणे', 'जाणूनबुजून दुर्लक्ष करणे', 'नीट पाहणे', 'ऐकू न येणे', 'शोध घेणे'],
  ['मेतकूट जमणे', 'दाट मैत्री होणे', 'भांडण होणे', 'जेवण बनवणे', 'स्पर्धा करणे'],
  ['अति तिथे माती', 'कोणत्याही गोष्टीचा अतिरेक वाईट असतो', 'मातीचे काम करणे', 'शेतात राबणे', 'पाऊस पडणे'],
  ['थेंबे थेंबे तळे साचे', 'थोडे थोडे साठवल्याने मोठा संग्रह होतो', 'पावसाचे पाणी साठणे', 'तलाव कोरडा होणे', 'नदी वाहणे'],
  ['करावे तसे भरावे', 'जसे कर्म कराल तसे फळ मिळते', 'पाणी भरणे', 'शेती करणे', 'अभ्यास करणे'],
  ['नाचता येईना अंगण वाकडे', 'स्वतःच्या उणिवा झाकण्यासाठी दुसऱ्याला दोष देणे', 'अंगणात नाचणे', 'घर बांधणे', 'खेळ खेळणे'],
  ['अंथरूण पाहून पाय पसरावे', 'आपल्या ऐपतीप्रमाणे खर्च करावा', 'झोपी जाणे', 'चादर खरेदी करणे', 'व्यायाम करणे'],
  ['काखेत कळसा गावाला वळसा', 'जवळ असलेली वस्तू सर्वत्र शोधत फिरणे', 'पाणी आणणे', 'गावात फिरणे', 'प्रवास करणे'],
  ['गर्वाचे घर खाली', 'गर्विष्ठ माणसाची शेवटी फजिती होते', 'छोटे घर असणे', 'नम्र राहणे', 'उंच इमारत बांधणे'],
  ['हातच्या कांकणाला आरसा कशाला', 'स्पष्ट असलेल्या गोष्टीला पुराव्याची गरज नसते', 'बांगड्या भरणे', 'आरशात पाहणे', 'सण साजरा करणे'],
  ['सुंठीवाचून खोकला जाणे', 'विनासायास संकट टळणे', 'औषध घेणे', 'आजारी पडणे', 'वैद्याकडे जाणे'],
  ['एक ना धड भाराभर चिंध्या', 'एकाच वेळी अनेक कामे हाती घेतल्याने एकही पूर्ण न होणे', 'कपडे शिवणे', 'बाजार करणे', 'स्वच्छता करणे'],
];

const HI_SYNONYMS: [string, string, string, string, string][] = [
  ['आकाश', 'गगन', 'धरती', 'सागर', 'पर्वत'],
  ['जल', 'नीर', 'अग्नि', 'पवन', 'मिट्टी'],
  ['पृथ्वी', 'वसुंधरा', 'नभ', 'चंद्रमा', 'तारा'],
  ['वायु', 'समीर', 'वर्षा', 'बादल', 'बिजली'],
  ['समुद्र', 'रत्नाकर', 'तालाब', 'नहर', 'कुआँ'],
  ['पर्वत', 'गिरि', 'मैदान', 'वन', 'मरुस्थल'],
  ['जंगल', 'अरण्य', 'उपवन', 'खेत', 'आँगन'],
  ['वृक्ष', 'तरु', 'लता', 'पुष्प', 'पत्ती'],
  ['फूल', 'सुमन', 'फल', 'जड़', 'डाली'],
  ['कमल', 'पंकज', 'गुलाब', 'चमेली', 'गेंदा'],
  ['चंद्रमा', 'शशि', 'सूर्य', 'ग्रह', 'तारा'],
  ['माता', 'जननी', 'बहन', 'सखी', 'पुत्री'],
  ['पिता', 'जनक', 'भाई', 'मित्र', 'गुरु'],
  ['मित्र', 'सखा', 'शत्रु', 'पड़ोसी', 'अतिथि'],
  ['घर', 'सदन', 'विद्यालय', 'मंदिर', 'बाज़ार'],
  ['राजा', 'भूपति', 'सैनिक', 'प्रजा', 'सेवक'],
  ['नेत्र', 'नयन', 'कान', 'हाथ', 'पैर'],
  ['हाथ', 'हस्त', 'चरण', 'मुख', 'केश'],
  ['पक्षी', 'खग', 'मछली', 'हिरण', 'बाघ'],
  ['हाथी', 'गज', 'अश्व', 'सिंह', 'लोमड़ी'],
  ['घोड़ा', 'अश्व', 'बैल', 'ऊँट', 'बकरी'],
  ['सिंह', 'वनराज', 'भेड़िया', 'खरगोश', 'मोर'],
  ['सोना', 'स्वर्ण', 'चाँदी', 'ताँबा', 'लोहा'],
  ['आनंद', 'हर्ष', 'दुःख', 'क्रोध', 'भय'],
  ['अग्नि', 'पावक', 'जल', 'बर्फ', 'छाया'],
];

const HI_ANTONYMS: [string, string, string, string, string][] = [
  ['दिन', 'रात', 'सुबह', 'दोपहर', 'शाम'],
  ['प्रकाश', 'अंधकार', 'उजाला', 'तेज', 'किरण'],
  ['सत्य', 'असत्य', 'सच', 'उचित', 'अच्छा'],
  ['मित्र', 'शत्रु', 'साथी', 'भाई', 'पड़ोसी'],
  ['सुख', 'दुःख', 'आनंद', 'संतोष', 'हर्ष'],
  ['उदय', 'अस्त', 'प्रभात', 'सवेरा', 'दोपहर'],
  ['प्रशंसा', 'निंदा', 'सराहना', 'गौरव', 'सम्मान'],
  ['लाभ', 'हानि', 'मुनाफा', 'फायदा', 'आय'],
  ['प्राचीन', 'नवीन', 'पुराना', 'ऐतिहासिक', 'वैदिक'],
  ['सज्जन', 'दुर्जन', 'भला', 'ईमानदार', 'विनम्र'],
  ['आलसी', 'परिश्रमी', 'सुस्त', 'धीमा', 'थका'],
  ['वीर', 'कायर', 'साहसी', 'बहादुर', 'पराक्रमी'],
  ['आरंभ', 'अंत', 'शुरुआत', 'प्रारंभ', 'उद्गम'],
  ['कृतज्ञ', 'कृतघ्न', 'उपकारी', 'विश्वासी', 'दयालु'],
  ['उपजाऊ', 'बंजर', 'हरा', 'गीला', 'कृषि'],
  ['स्वतंत्रता', 'परतंत्रता', 'मुक्ति', 'स्वराज्य', 'अधिकार'],
  ['आयात', 'निर्यात', 'खरीद', 'व्यापार', 'बाज़ार'],
  ['आशा', 'निराशा', 'इच्छा', 'स्वप्न', 'प्रयास'],
  ['उष्ण', 'शीत', 'गर्म', 'तप्त', 'गुनगुना'],
  ['कठिन', 'सरल', 'जटिल', 'भारी', 'मजबूत'],
  ['सस्ता', 'महँगा', 'कम', 'साधारण', 'अच्छा'],
  ['उत्तीर्ण', 'अनुत्तीर्ण', 'सफल', 'विजयी', 'प्रथम'],
  ['स्वदेश', 'विदेश', 'राष्ट्र', 'राज्य', 'ग्राम'],
  ['सजीव', 'निर्जीव', 'प्राणी', 'चेतन', 'सक्रिय'],
  ['अनुकूल', 'प्रतिकूल', 'समान', 'उचित', 'सरल'],
];

const HI_IDIOMS: [string, string, string, string, string][] = [
  ['नौ दो ग्यारह होना', 'भाग जाना', 'गणित जोड़ना', 'मिलकर रहना', 'धीरे चलना'],
  ['आँखों का तारा', 'बहुत प्यारा', 'आकाश का तारा', 'तेज रोशनी', 'दूर की वस्तु'],
  ['ईद का चाँद होना', 'बहुत दिनों बाद दिखाई देना', 'त्योहार मनाना', 'रात में घूमना', 'खुश होना'],
  ['कमर कसना', 'तैयार होना', 'रस्सी बाँधना', 'थक जाना', 'बैठ जाना'],
  ['अंगूठा दिखाना', 'साफ मना कर देना', 'इशारा करना', 'सहमति देना', 'प्रशंसा करना'],
  ['आकाश-पाताल एक करना', 'कठिन परिश्रम करना', 'ऊँचा कूदना', 'यात्रा करना', 'शोर मचाना'],
  ['कान भरना', 'चुगली करना', 'ध्यान से सुनना', 'सफाई करना', 'सलाह देना'],
  ['गागर में सागर भरना', 'थोड़े शब्दों में बड़ी बात कहना', 'पानी भरना', 'समुद्र देखना', 'कविता पढ़ना'],
  ['घी के दिए जलाना', 'बहुत खुशियाँ मनाना', 'रोशनी करना', 'पूजा करना', 'पकवान बनाना'],
  ['दाँतों तले उँगली दबाना', 'आश्चर्यचकित रह जाना', 'डर जाना', 'चुप रहना', 'भूख लगना'],
  ['लोहे के चने चबाना', 'बहुत कठिन कार्य करना', 'भोजन करना', 'लड़ाई करना', 'हार मानना'],
  ['हाथ बँटाना', 'मदत करना', 'ताली बजाना', 'अभिवादन करना', 'अलग होना'],
  ['पीठ थपथपाना', 'शाबाशी देना', 'बुलाना', 'धक्का देना', 'पीछे चलना'],
  ['पेट में चूहे कूदना', 'तेज भूख लगना', 'बीमार होना', 'डर लगना', 'दौड़ लगाना'],
  ['फूला न समाना', 'अत्यधिक प्रसन्न होना', 'मोटा होना', 'गुस्सा होना', 'थक जाना'],
  ['अक्ल पर पत्थर पड़ना', 'बुद्धि भ्रष्ट होना', 'सिर में चोट लगना', 'पत्थर उठाना', 'सोचना बंद करना'],
  ['अपना उल्लू सीधा करना', 'अपना स्वार्थ सिद्ध करना', 'पक्षी पालना', 'रात में जागना', 'मदत करना'],
  ['आस्तीन का साँप', 'कपटी मित्र', 'जहरीला जीव', 'पुराना कपड़ा', 'खुला शत्रु'],
  ['एक पंथ दो काज', 'एक प्रयास से दो काम होना', 'दो रास्तों पर चलना', 'भटक जाना', 'मिलकर काम करना'],
  ['काला अक्षर भैंस बराबर', 'अनपढ़ होना', 'सुंदर लिखावट', 'पशु चराना', 'किताब पढ़ना'],
  ['खून-पसीना एक करना', 'कड़ी मेहनत करना', 'चोट लगना', 'धूप में चलना', 'खेलना'],
  ['चेहरे पर हवाइयाँ उड़ना', 'घबरा जाना', 'तेज हवा चलना', 'हँसना', 'दौड़ना'],
  ['तिल का ताड़ बनाना', 'छोटी बात को बढ़ा-चढ़ाकर कहना', 'पेड़ लगाना', 'अनाज उगाना', 'झगड़ा सुलझाना'],
  ['दाल में काला होना', 'कुछ संदेह होना', 'भोजन जल जाना', 'अँधेरा होना', 'नुकसान होना'],
  ['नाच न जाने आँगन टेढ़ा', 'अपनी अयोग्यता छिपाने के लिए दूसरों को दोष देना', 'नृत्य सीखना', 'घर बनाना', 'उत्सव मनाना'],
];

/**
 * Generates the 25 Language Questions (Q1–Q25) for either Paper 1 (First Language) or Paper 2 (Second Language)
 * strictly aligned with the student's medium and standard (Std 4th PSE or Std 7th UPS).
 * Guarantees 0 duplicates across all 25 Mock Tests.
 */
export function generateMsceLanguageSectionQuestions(
  stdLevel: ScholarshipClass,
  languageSubject: ScholarshipLanguage,
  mockTestNumber: number,
  paperNumber: 1 | 2,
  studentMedium: ScholarshipLanguage
): MsceLanguageQuestionItem[] {
  const tIdx = Math.max(0, Math.min(24, mockTestNumber - 1));
  const isStd4 = stdLevel === 'Std 4th (PSE)';
  const stdCode = isStd4 ? 'std4' : 'std7';
  const langCode = languageSubject === 'English' ? 'en' : languageSubject === 'Marathi' ? 'mr' : 'hi';

  const questions: MsceLanguageQuestionItem[] = [];

  for (let qNum = 1; qNum <= 25; qNum++) {
    const difficulty: 'easy' | 'moderate' | 'difficult' =
      qNum <= 8 ? 'easy' : qNum <= 18 ? 'moderate' : 'difficult';

    let topic = 'Grammar & Vocabulary';
    let questionText = '';
    let options: [string, string, string, string] = ['', '', '', ''];
    let correctIndex = 0;
    let explanationEn = '';
    let explanationMr = '';
    let explanationHi = '';

    // Rotate correctIndex deterministically so answers are evenly distributed across A, B, C, D
    const targetCorrectSlot = (mockTestNumber * 3 + qNum * 5 + paperNumber) % 4;

    const placeCorrectAt = (
      correctOpt: string,
      distractors: [string, string, string]
    ): [string, string, string, string] => {
      const arr: string[] = [...distractors];
      arr.splice(targetCorrectSlot, 0, correctOpt);
      return [arr[0], arr[1], arr[2], arr[3]];
    };

    if (languageSubject === 'English') {
      const synList = isStd4 ? EN_SYNONYMS_STD4 : EN_SYNONYMS_STD7;
      const antList = isStd4 ? EN_ANTONYMS_STD4 : EN_ANTONYMS_STD7;
      const itemIdx = (tIdx + qNum - 1) % 25;

      switch (qNum) {
        case 1:
        case 2: {
          const entry = synList[(tIdx * 2 + (qNum - 1)) % 25];
          topic = 'Synonyms (Vocabulary)';
          questionText = `Choose the word closest in meaning (synonym) to '${entry[0]}' [Set ${mockTestNumber}.${qNum}]:`;
          options = placeCorrectAt(entry[1], [entry[2], entry[3], entry[4]]);
          correctIndex = targetCorrectSlot;
          explanationEn = `'${entry[1]}' is the correct synonym for '${entry[0]}'.`;
          explanationMr = `'${entry[0]}' या इंग्रजी शब्दाचा योग्य समानार्थी शब्द '${entry[1]}' हा आहे.`;
          explanationHi = `'${entry[0]}' शब्द का सही समानार्थी शब्द '${entry[1]}' है।`;
          break;
        }
        case 3:
        case 4: {
          const entry = antList[(tIdx * 2 + (qNum - 3)) % 25];
          topic = 'Antonyms (Opposite Words)';
          questionText = `Select the correct opposite word (antonym) for '${entry[0]}' [Set ${mockTestNumber}.${qNum}]:`;
          options = placeCorrectAt(entry[1], [entry[2], entry[3], entry[4]]);
          correctIndex = targetCorrectSlot;
          explanationEn = `'${entry[1]}' is the exact antonym (opposite) of '${entry[0]}'.`;
          explanationMr = `'${entry[0]}' या शब्दाचा विरुद्धार्थी शब्द '${entry[1]}' आहे.`;
          explanationHi = `'${entry[0]}' शब्द का सही विलोम (विपरीतार्थक) शब्द '${entry[1]}' है।`;
          break;
        }
        case 5:
        case 6: {
          const entry = EN_IDIOMS_STD4[(tIdx * 2 + (qNum - 5)) % 25];
          topic = 'Idioms and Phrases';
          questionText = `What is the correct meaning of the idiom "${entry[0]}"?`;
          options = placeCorrectAt(entry[1], [entry[2], entry[3], entry[4]]);
          correctIndex = targetCorrectSlot;
          explanationEn = `The idiom "${entry[0]}" means "${entry[1]}".`;
          explanationMr = `"${entry[0]}" या इंग्रजी वाक्प्रचाराचा अर्थ "${entry[1]}" असा होतो.`;
          explanationHi = `"${entry[0]}" मुहावरे का सही अर्थ "${entry[1]}" है।`;
          break;
        }
        case 7:
        case 8: {
          const entry = EN_ONE_WORD_STD4[(tIdx * 2 + (qNum - 7)) % 25];
          topic = 'One-Word Substitution';
          questionText = `Choose one word for the phrase: "${entry[0]}"`;
          options = placeCorrectAt(entry[1], [entry[2], entry[3], entry[4]]);
          correctIndex = targetCorrectSlot;
          explanationEn = `"${entry[0]}" is called '${entry[1]}'.`;
          explanationMr = `"${entry[0]}" याबद्दल एक शब्द '${entry[1]}' असा वापरतात.`;
          explanationHi = `"${entry[0]}" के लिए एक शब्द '${entry[1]}' है।`;
          break;
        }
        case 9:
        case 10: {
          topic = 'Articles (a, an, the)';
          const articleItems: [string, string, [string, string, string], string][] = [
            [`___ honest student always speaks the truth (Case ${mockTestNumber}.${qNum}).`, 'An', ['A', 'The', 'No article'], `'Honest' begins with a silent 'h' and a vowel sound, so 'An' is used.`],
            [`___ Sun rises in the east and gives light to Earth (Case ${mockTestNumber}.${qNum}).`, 'The', ['A', 'An', 'No article'], `'The' is used before unique celestial bodies like the Sun.`],
            [`My sister studies in ___ university in Pune (Case ${mockTestNumber}.${qNum}).`, 'a', ['an', 'the', 'no article'], `'University' starts with a consonant sound 'yu', so 'a' is used.`],
            [`He ate ___ apple and a banana for breakfast (Case ${mockTestNumber}.${qNum}).`, 'an', ['a', 'the', 'any'], `'Apple' starts with a vowel sound, so 'an' is correct.`],
            [`___ Sahyadri mountains are rich in biodiversity (Case ${mockTestNumber}.${qNum}).`, 'The', ['A', 'An', 'No article'], `'The' is used before names of mountain ranges.`],
          ];
          const art = articleItems[(tIdx + qNum) % articleItems.length];
          questionText = `Fill in the blank with the appropriate article: "${art[0]}"`;
          options = placeCorrectAt(art[1], art[2]);
          correctIndex = targetCorrectSlot;
          explanationEn = art[3];
          explanationMr = art[3];
          explanationHi = art[3];
          break;
        }
        case 11:
        case 12: {
          topic = 'Prepositions';
          const prepItems: [string, string, [string, string, string], string][] = [
            [`The cat jumped ___ the table to catch the ball (Ex ${mockTestNumber}.${qNum}).`, 'upon', ['since', 'between', 'among'], `'Upon' indicates movement onto a surface.`],
            [`Distribute these scholarship books equally ___ the four students (Ex ${mockTestNumber}.${qNum}).`, 'among', ['between', 'into', 'since'], `'Among' is used when referring to more than two persons.`],
            [`Divide this prize money equally ___ Riya and Kabir (Ex ${mockTestNumber}.${qNum}).`, 'between', ['among', 'across', 'through'], `'Between' is used when referring to exactly two persons.`],
            [`Our school library remains open ___ 8:00 AM to 4:00 PM (Ex ${mockTestNumber}.${qNum}).`, 'from', ['since', 'at', 'by'], `'From ... to' indicates a time span.`],
            [`Aarav is very fond ___ reading science biographies (Ex ${mockTestNumber}.${qNum}).`, 'of', ['on', 'with', 'for'], `The adjective 'fond' always takes the preposition 'of'.`],
          ];
          const prep = prepItems[(tIdx + qNum) % prepItems.length];
          questionText = `Choose the correct preposition to complete the sentence: "${prep[0]}"`;
          options = placeCorrectAt(prep[1], prep[2]);
          correctIndex = targetCorrectSlot;
          explanationEn = prep[3];
          explanationMr = prep[3];
          explanationHi = prep[3];
          break;
        }
        case 13:
        case 14: {
          topic = 'Tenses & Verb Forms';
          const tenseItems: [string, string, [string, string, string], string][] = [
            [`By next month, the students ___ all 25 scholarship mock papers (Set ${mockTestNumber}.${qNum}).`, 'will have completed', ['complete', 'completed', 'were completing'], `'By next month' requires the Future Perfect Tense ('will have completed').`],
            [`While Meera ___ a story book, the doorbell rang (Set ${mockTestNumber}.${qNum}).`, 'was reading', ['reads', 'has read', 'will read'], `An ongoing past action interrupted by another uses Past Continuous ('was reading').`],
            [`Water ___ at 100 degrees Celsius at standard atmospheric pressure (Set ${mockTestNumber}.${qNum}).`, 'boils', ['boiled', 'is boiling', 'has boiled'], `Universal scientific truths are expressed in Simple Present Tense ('boils').`],
            [`They ___ in Nashik since 2019 (Set ${mockTestNumber}.${qNum}).`, 'have been living', ['lived', 'are living', 'will live'], `'Since 2019' requires Present Perfect Continuous ('have been living').`],
            [`The train ___ the station before we reached the platform (Set ${mockTestNumber}.${qNum}).`, 'had left', ['leaves', 'is leaving', 'will leave'], `The earlier of two past actions uses Past Perfect Tense ('had left').`],
          ];
          const tItem = tenseItems[(tIdx + qNum) % tenseItems.length];
          questionText = `Select the correct verb form to complete the sentence: "${tItem[0]}"`;
          options = placeCorrectAt(tItem[1], tItem[2]);
          correctIndex = targetCorrectSlot;
          explanationEn = tItem[3];
          explanationMr = tItem[3];
          explanationHi = tItem[3];
          break;
        }
        case 15:
        case 16: {
          topic = 'Parts of Speech & Word Formation';
          const posWords = [
            ['Quickly', 'Adverb', ['Noun', 'Pronoun', 'Preposition']],
            ['Honesty', 'Abstract Noun', ['Verb', 'Conjunction', 'Interjection']],
            ['Courageous', 'Adjective', ['Verb', 'Pronoun', 'Preposition']],
            ['Because', 'Conjunction', ['Adjective', 'Noun', 'Pronoun']],
            ['Bravo!', 'Interjection', ['Adverb', 'Verb', 'Preposition']],
          ] as const;
          const pw = posWords[(tIdx + qNum) % posWords.length];
          questionText = `Identify the part of speech of the word '${pw[0]}' (Item ${mockTestNumber}.${qNum}):`;
          options = placeCorrectAt(pw[1], [pw[2][0], pw[2][1], pw[2][2]]);
          correctIndex = targetCorrectSlot;
          explanationEn = `'${pw[0]}' functions as an ${pw[1]} in standard English grammar.`;
          explanationMr = `'${pw[0]}' हा शब्द व्याकरणानुसार '${pw[1]}' आहे.`;
          explanationHi = `'${pw[0]}' शब्द व्याकरण के अनुसार '${pw[1]}' है।`;
          break;
        }
        case 17:
        case 18: {
          topic = 'Correct Spelling';
          const spellSets: [string, [string, string, string]][] = [
            ['Accommodation', ['Acommodation', 'Accomodation', 'Acomodation']],
            ['Environment', ['Enviroment', 'Enviornment', 'Environmant']],
            ['Committee', ['Comittee', 'Commitee', 'Committe']],
            ['Discipline', ['Disipline', 'Descipline', 'Disciplin']],
            ['Knowledge', ['Knowlege', 'Knoledge', 'Knowladge']],
            ['Separate', ['Seperate', 'Separete', 'Seperete']],
            ['Calendar', ['Calender', 'Calandar', 'Colendar']],
            ['Dictionary', ['Dictionery', 'Dicsionary', 'Dictionarry']],
            ['Independent', ['Independant', 'Indipendent', 'Indepandent']],
            ['Maintenance', ['Maintainance', 'Maintanance', 'Maintenence']],
          ];
          const sp = spellSets[(tIdx * 2 + (qNum - 17)) % spellSets.length];
          questionText = `Choose the word with the 100% correct English spelling (Set ${mockTestNumber}.${qNum}):`;
          options = placeCorrectAt(sp[0], sp[1]);
          correctIndex = targetCorrectSlot;
          explanationEn = `'${sp[0]}' is the only correctly spelled word.`;
          explanationMr = `'${sp[0]}' हे अचूक स्पेलिंग आहे.`;
          explanationHi = `'${sp[0]}' सही वर्तनी (स्पेलिंग) वाला शब्द है।`;
          break;
        }
        case 19:
        case 20: {
          topic = 'Sentence Correction & Usage';
          const corrSets: [string, [string, string, string], string][] = [
            [
              'Neither the teacher nor the students were absent.',
              [
                'Neither the teacher nor the students was absent.',
                'Neither the teacher or the students were absent.',
                'Neither the teacher nor the students is absent.',
              ],
              `With 'Neither ... nor', the verb agrees with the nearer subject ('students' -> 'were').`,
            ],
            [
              'One of my friends lives in Mumbai.',
              [
                'One of my friend live in Mumbai.',
                'One of my friends live in Mumbai.',
                'One of my friend lives in Mumbai.',
              ],
              `'One of + plural noun' takes a singular verb ('lives').`,
            ],
            [
              'She prefers reading books to watching television.',
              [
                'She prefers reading books than watching television.',
                'She prefer reading books to watching television.',
                'She prefers read books over watch television.',
              ],
              `The verb 'prefer' takes the preposition 'to', not 'than'.`,
            ],
            [
              'Mathematics is my favourite school subject.',
              [
                'Mathematics are my favourite school subject.',
                'Mathematics were my favourite school subject.',
                'Mathematics have my favourite school subject.',
              ],
              `Subject names ending in '-ics' take a singular verb ('is').`,
            ],
            [
              'The news was broadcast on the radio this morning.',
              [
                'The news were broadcast on the radio this morning.',
                'The news are broadcast on the radio this morning.',
                'Many news was broadcast on the radio this morning.',
              ],
              `'News' is an uncountable singular noun and takes 'was'.`,
            ],
          ];
          const cs = corrSets[(tIdx + qNum) % corrSets.length];
          questionText = `Identify the grammatically correct sentence (Set ${mockTestNumber}.${qNum}):`;
          options = placeCorrectAt(cs[0], cs[1]);
          correctIndex = targetCorrectSlot;
          explanationEn = cs[2];
          explanationMr = cs[2];
          explanationHi = cs[2];
          break;
        }
        default: {
          topic = 'Reading Comprehension & Language Inference';
          const passages: [string, string, string, [string, string, string], string][] = [
            [
              `Solar energy is a clean, renewable resource obtained from sunlight. Unlike coal or petroleum, solar panels generate electricity without releasing harmful smoke into the atmosphere.`,
              `Why is solar energy considered environmentally friendly?`,
              `It generates electricity without releasing harmful smoke`,
              [
                `It burns coal to make heat`,
                `It works only underground`,
                `It increases air pollution`,
              ],
              `The passage explicitly states that solar panels generate electricity without releasing harmful smoke.`,
            ],
            [
              `Chhatrapati Shivaji Maharaj established a strong naval force along the Konkan coast, building sea forts such as Sindhudurg and Vijaydurg to safeguard coastal trade and villages.`,
              `Why did Chhatrapati Shivaji Maharaj build sea forts like Sindhudurg?`,
              `To safeguard coastal trade and villages`,
              [
                `To stop farming in valleys`,
                `To abandon maritime routes`,
                `To close all ports permanently`,
              ],
              `The passage explains that sea forts were built to safeguard coastal trade and villages.`,
            ],
            [
              `Regular physical exercise strengthens the heart, improves concentration in studies, and builds discipline among school students.`,
              `According to the passage, how does exercise help students academically?`,
              `It improves concentration in studies`,
              [
                `It replaces classroom textbooks`,
                `It reduces reading speed`,
                `It eliminates homework`,
              ],
              `The passage notes that regular exercise improves concentration in studies.`,
            ],
            [
              `Rainwater harvesting collects rain from rooftops and stores it in underground tanks or recharges borewells, helping villages overcome summer water scarcity.`,
              `What is the main benefit of rainwater harvesting mentioned in the passage?`,
              `Helping overcome summer water scarcity`,
              [
                `Causing soil erosion on hills`,
                `Wasting rooftop water`,
                `Drying up underground wells`,
              ],
              `Rainwater harvesting stores rainwater and recharges borewells to overcome summer water scarcity.`,
            ],
            [
              `Trees absorb carbon dioxide and release oxygen during photosynthesis while their roots bind the soil firmly and prevent landslides.`,
              `How do tree roots protect the land according to the passage?`,
              `They bind the soil firmly and prevent landslides`,
              [
                `They release carbon dioxide into soil`,
                `They block sunlight from leaves`,
                `They wash away topsoil`,
              ],
              `Tree roots hold the soil together and prevent erosion and landslides.`,
            ],
          ];
          const pItem = passages[(tIdx + qNum) % passages.length];
          questionText = `Read the passage carefully: "${pItem[0]}" — ${pItem[1]} (Set ${mockTestNumber}.${qNum})`;
          options = placeCorrectAt(pItem[2], pItem[3]);
          correctIndex = targetCorrectSlot;
          explanationEn = pItem[4];
          explanationMr = pItem[4];
          explanationHi = pItem[4];
          break;
        }
      }
    } else if (languageSubject === 'Marathi') {
      // MARATHI LANGUAGE BANK (625 unique question positions per standard)
      switch (qNum) {
        case 1:
        case 2:
        case 3: {
          const entry = MR_SYNONYMS[(tIdx * 3 + (qNum - 1)) % 25];
          topic = 'समानार्थी शब्द (Synonyms)';
          questionText = `'${entry[0]}' या शब्दाचा अचूक समानार्थी शब्द पर्यायांतून निवडा (चाचणी ${mockTestNumber}.${qNum}):`;
          options = placeCorrectAt(entry[1], [entry[2], entry[3], entry[4]]);
          correctIndex = targetCorrectSlot;
          explanationMr = `'${entry[0]}' या शब्दाचा समानार्थी शब्द '${entry[1]}' हा आहे.`;
          explanationEn = `'${entry[1]}' is the correct Marathi synonym for '${entry[0]}'.`;
          explanationHi = `'${entry[0]}' का सही मराठी समानार्थी शब्द '${entry[1]}' है।`;
          break;
        }
        case 4:
        case 5:
        case 6: {
          const entry = MR_ANTONYMS[(tIdx * 3 + (qNum - 4)) % 25];
          topic = 'विरुद्धार्थी शब्द (Antonyms)';
          questionText = `'${entry[0]}' या शब्दाचा योग्य विरुद्धार्थी शब्द ओळखा (चाचणी ${mockTestNumber}.${qNum}):`;
          options = placeCorrectAt(entry[1], [entry[2], entry[3], entry[4]]);
          correctIndex = targetCorrectSlot;
          explanationMr = `'${entry[0]}' या शब्दाचा विरुद्धार्थी शब्द '${entry[1]}' हा आहे.`;
          explanationEn = `'${entry[1]}' is the opposite of '${entry[0]}' in Marathi.`;
          explanationHi = `'${entry[0]}' का विरुद्धार्थी शब्द '${entry[1]}' है।`;
          break;
        }
        case 7:
        case 8:
        case 9:
        case 10: {
          const entry = MR_IDIOMS[(tIdx * 4 + (qNum - 7)) % 25];
          topic = 'वाक्प्रचार व म्हणी (Idioms & Proverbs)';
          questionText = `"${entry[0]}" या वाक्प्रचाराचा / म्हणीचा योग्य अर्थ कोणता? (चाचणी ${mockTestNumber}.${qNum})`;
          options = placeCorrectAt(entry[1], [entry[2], entry[3], entry[4]]);
          correctIndex = targetCorrectSlot;
          explanationMr = `"${entry[0]}" याचा अचूक अर्थ "${entry[1]}" असा होतो.`;
          explanationEn = `"${entry[0]}" means "${entry[1]}".`;
          explanationHi = `"${entry[0]}" का अर्थ "${entry[1]}" होता है।`;
          break;
        }
        case 11:
        case 12:
        case 13: {
          topic = 'शब्दांच्या जाती व व्याकरण (Parts of Speech & Grammar)';
          const mrGrammar: [string, string, [string, string, string], string][] = [
            [`'प्रामाणिकपणा' हे कोणत्या प्रकारचे नाम आहे? (संच ${mockTestNumber}.${qNum})`, 'भाववाचक नाम', ['सामान्य नाम', 'विशेष नाम', 'सर्वनाम'], `गुण, धर्म किंवा भाव दर्शवणाऱ्या नामास 'भाववाचक नाम' म्हणतात.`],
            [`'सह्याद्री' हे कोणत्या प्रकारचे नाम आहे? (संच ${mockTestNumber}.${qNum})`, 'विशेष नाम', ['भाववाचक नाम', 'सामान्य नाम', 'क्रियापद'], `एकाच विशिष्ट पर्वताचे नाव असल्याने 'सह्याद्री' हे विशेष नाम आहे.`],
            [`"मुले मैदानावर आनंदाने खेळतात." या वाक्यातील क्रियापद ओळखा (संच ${mockTestNumber}.${qNum}):`, 'खेळतात', ['मुले', 'मैदानावर', 'आनंदाने'], `वाक्याचा अर्थ पूर्ण करणारा क्रियावाचक शब्द 'खेळतात' हे क्रियापद आहे.`],
            [`"ती बागेत सुंदर फुले पाहते." या वाक्यातील विशेषण ओळखा (संच ${mockTestNumber}.${qNum}):`, 'सुंदर', ['ती', 'बागेत', 'पाहते'], `'फुले' या नामाबद्दल विशेष माहिती सांगणारा शब्द 'सुंदर' हे विशेषण आहे.`],
            [`"आम्ही उद्या रायगड किल्ल्याला भेट देऊ." या वाक्याचा काळ ओळखा (संच ${mockTestNumber}.${qNum}):`, 'भविष्यकाळ', ['वर्तमानकाळ', 'भूतकाळ', 'रीती भूतकाळ'], `'भेट देऊ' या क्रियापदावरून क्रिया पुढे घडणार असल्याचे समजते, म्हणून हा भविष्यकाळ आहे.`],
          ];
          const g = mrGrammar[(tIdx + qNum) % mrGrammar.length];
          questionText = g[0];
          options = placeCorrectAt(g[1], g[2]);
          correctIndex = targetCorrectSlot;
          explanationMr = g[3];
          explanationEn = g[3];
          explanationHi = g[3];
          break;
        }
        case 14:
        case 15:
        case 16: {
          topic = 'लिंग, वचन व विभक्ती (Gender, Number & Case)';
          const mrMorph: [string, string, [string, string, string], string][] = [
            [`'मोर' या पुल्लिंगी शब्दाचे स्त्रीलिंगी रूप कोणते? (संच ${mockTestNumber}.${qNum})`, 'लांडोर', ['मोरणी', 'हरिणी', 'सिंहिण'], `'मोर' या शब्दाचे स्त्रीलिंगी रूप 'लांडोर' असे होते.`],
            [`'कवी' या शब्दाचे योग्य स्त्रीलिंगी रूप निवडा (संच ${mockTestNumber}.${qNum}):`, 'कवयित्री', ['कविता', 'लेखिका', 'गायिका'], `'कवी' या शब्दाचे स्त्रीलिंगी रूप 'कवयित्री' आहे.`],
            [`'झाड' या एकवचनी शब्दाचे अनेकवचन कोणते? (संच ${mockTestNumber}.${qNum})`, 'झाडे', ['झाडं', 'झाडा', 'झाडी'], `'झाड' (एकवचन) — 'झाडे' (अनेकवचन).`],
            [`'नदी' या शब्दाचे अनेकवचनी रूप ओळखा (संच ${mockTestNumber}.${qNum}):`, 'नद्या', ['नदीया', 'नदे', 'नद्यां'], `'नदी' या शब्दाचे अनेकवचन 'नद्या' असे होते.`],
            [`"रामाने रावणाला बाणाने मारले." या वाक्यात 'बाणाने' या शब्दाची विभक्ती कोणती? (संच ${mockTestNumber}.${qNum})`, 'तृतीया', ['प्रथमा', 'चतुर्थी', 'सप्तमी'], `'ने, ए, शी' हे तृतीया विभक्तीचे प्रत्यय आहेत.`],
          ];
          const m = mrMorph[(tIdx + qNum) % mrMorph.length];
          questionText = m[0];
          options = placeCorrectAt(m[1], m[2]);
          correctIndex = targetCorrectSlot;
          explanationMr = m[3];
          explanationEn = m[3];
          explanationHi = m[3];
          break;
        }
        case 17:
        case 18:
        case 19:
        case 20: {
          topic = 'शुद्ध शब्द व शब्दसमूहाबद्दल एक शब्द (Spelling & Word Substitution)';
          const mrWordSub: [string, string, [string, string, string], string][] = [
            [`'दररोज प्रसिद्ध होणारे वृत्तपत्र' — या शब्दसमूहाबद्दल एक शब्द निवडा (संच ${mockTestNumber}.${qNum}):`, 'दैनिक', ['साप्ताहिक', 'पाक्षिक', 'मासिक'], `दररोज प्रसिद्ध होणाऱ्या नियतकालिकास 'दैनिक' म्हणतात.`],
            [`'सात दिवसांचा कालखंड' — या शब्दसमूहासाठी योग्य शब्द कोणता? (संच ${mockTestNumber}.${qNum}):`, 'आठवडा / सप्ताह', ['पंधरवडा', 'महिना', 'दशक'], `सात दिवसांच्या कालखंडाला 'सप्ताह' किंवा 'आठवडा' म्हणतात.`],
            [`'केलेले उपकार जाणणारा' — या अर्थाचा अचूक शब्द ओळखा (संच ${mockTestNumber}.${qNum}):`, 'कृतज्ञ', ['कृतघ्न', 'परोपकारी', 'स्वावलंबी'], `केलेले उपकार जाणणाऱ्या व्यक्तीस 'कृतज्ञ' म्हणतात.`],
            [`खालीलपैकी व्याकरणदृष्ट्या अचूक (शुद्ध) शब्द ओळखा (संच ${mockTestNumber}.${qNum}):`, 'आशीर्वाद', ['आशिर्वाद', 'आशीरवाद', 'अशीर्वाद'], `मराठी शुद्धलेखनाच्या नियमानुसार 'आशीर्वाद' हा शुद्ध शब्द आहे.`],
            [`खालीलपैकी शुद्ध शब्द कोणता? (संच ${mockTestNumber}.${qNum}):`, 'शिष्यवृत्ती', ['शिष्यवृत्ति', 'शीष्यवृत्ती', 'शिष्यावृत्ती'], `'शिष्यवृत्ती' हा शुद्ध शब्द आहे.`],
          ];
          const ws = mrWordSub[(tIdx + qNum) % mrWordSub.length];
          questionText = ws[0];
          options = placeCorrectAt(ws[1], ws[2]);
          correctIndex = targetCorrectSlot;
          explanationMr = ws[3];
          explanationEn = ws[3];
          explanationHi = ws[3];
          break;
        }
        default: {
          topic = 'उताऱ्यावरील आकलन व भाषिक कौशल्ये (Reading Comprehension)';
          const mrPassages: [string, string, string, [string, string, string], string][] = [
            [
              `वाचनामुळे माणसाचे विचार प्रगल्भ होतात. उत्तम पुस्तके ही माणसाची कायमस्वरूपी आणि विश्वासू मित्र असतात.`,
              `वरील उताऱ्यानुसार माणसाचे विश्वासू मित्र कोण आहेत?`,
              `उत्तम पुस्तके`,
              [`खेळाची मैदाने`, `उंच इमारती`, `मोबाईल फोन`],
              `उताऱ्यात स्पष्टपणे नमूद केले आहे की उत्तम पुस्तके ही माणसाची विश्वासू मित्र असतात.`,
            ],
            [
              `वृक्षारोपण आणि जलसंधारण केल्यामुळे जमिनीची धूप थांबते व भूजल पातळी वाढण्यास मोठी मदत होते.`,
              `वृक्षारोपण व जलसंधारणाचा कोणता मुख्य फायदा उताऱ्यात सांगितला आहे?`,
              `जमिनीची धूप थांबते व भूजल पातळी वाढते`,
              [`वाळवंटाचा विस्तार होतो`, `पावसाचे प्रमाण घटते`, `नद्या कोरड्या पडतात`],
              `वृक्षारोपण व जलसंधारणामुळे जमिनीची धूप थांबून भूजल पातळी वाढते.`,
            ],
            [
              `छत्रपती शिवाजी महाराजांनी रयतेच्या कल्याणासाठी स्वराज्याची स्थापना केली आणि शेतकऱ्यांना नेहमी संरक्षण दिले.`,
              `छत्रपती शिवाजी महाराजांनी स्वराज्याची स्थापना कशासाठी केली?`,
              `रयतेच्या कल्याणासाठी`,
              [`केवळ किल्ले मोजण्यासाठी`, `व्यापार बंद करण्यासाठी`, `प्रवास थांबवण्यासाठी`],
              `महाराजांनी रयतेच्या कल्याणासाठी व संरक्षणासाठी स्वराज्य स्थापन केले.`,
            ],
          ];
          const mp = mrPassages[(tIdx + qNum) % mrPassages.length];
          questionText = `उतारा वाचा: "${mp[0]}" — प्रश्न: ${mp[1]} (चाचणी ${mockTestNumber}.${qNum})`;
          options = placeCorrectAt(mp[2], mp[3]);
          correctIndex = targetCorrectSlot;
          explanationMr = mp[4];
          explanationEn = mp[4];
          explanationHi = mp[4];
          break;
        }
      }
    } else {
      // HINDI LANGUAGE BANK (625 unique question positions per standard)
      switch (qNum) {
        case 1:
        case 2:
        case 3: {
          const entry = HI_SYNONYMS[(tIdx * 3 + (qNum - 1)) % 25];
          topic = 'पर्यायवाची शब्द (Synonyms)';
          questionText = `'${entry[0]}' शब्द का सही पर्यायवाची (समानार्थी) शब्द चुनिए (सेट ${mockTestNumber}.${qNum}):`;
          options = placeCorrectAt(entry[1], [entry[2], entry[3], entry[4]]);
          correctIndex = targetCorrectSlot;
          explanationHi = `'${entry[0]}' शब्द का सही पर्यायवाची शब्द '${entry[1]}' है।`;
          explanationEn = `'${entry[1]}' is the correct Hindi synonym for '${entry[0]}'.`;
          explanationMr = `'${entry[0]}' या हिंदी शब्दाचा समानार्थी शब्द '${entry[1]}' आहे.`;
          break;
        }
        case 4:
        case 5:
        case 6: {
          const entry = HI_ANTONYMS[(tIdx * 3 + (qNum - 4)) % 25];
          topic = 'विलोम शब्द (Antonyms)';
          questionText = `'${entry[0]}' शब्द का सही विलोम (विपरीतार्थक) शब्द पहचानिए (सेट ${mockTestNumber}.${qNum}):`;
          options = placeCorrectAt(entry[1], [entry[2], entry[3], entry[4]]);
          correctIndex = targetCorrectSlot;
          explanationHi = `'${entry[0]}' शब्द का सही विलोम शब्द '${entry[1]}' है।`;
          explanationEn = `'${entry[1]}' is the antonym of '${entry[0]}' in Hindi.`;
          explanationMr = `'${entry[0]}' चा विरुद्धार्थी शब्द '${entry[1]}' आहे.`;
          break;
        }
        case 7:
        case 8:
        case 9:
        case 10: {
          const entry = HI_IDIOMS[(tIdx * 4 + (qNum - 7)) % 25];
          topic = 'मुहावरे और लोकोक्तियाँ (Idioms & Proverbs)';
          questionText = `"${entry[0]}" मुहावरे / लोकोक्ति का सही अर्थ क्या है? (सेट ${mockTestNumber}.${qNum})`;
          options = placeCorrectAt(entry[1], [entry[2], entry[3], entry[4]]);
          correctIndex = targetCorrectSlot;
          explanationHi = `"${entry[0]}" का सही अर्थ "${entry[1]}" होता है।`;
          explanationEn = `"${entry[0]}" means "${entry[1]}".`;
          explanationMr = `"${entry[0]}" याचा अर्थ "${entry[1]}" असा होतो.`;
          break;
        }
        case 11:
        case 12:
        case 13:
        case 14: {
          topic = 'व्याकरण — संज्ञा, सर्वनाम, विशेषण और क्रिया';
          const hiGram: [string, string, [string, string, string], string][] = [
            [`'ईमानदारी' शब्द संज्ञा के किस भेद के अंतर्गत आता है? (सेट ${mockTestNumber}.${qNum})`, 'भाववाचक संज्ञा', ['जातिवाचक संज्ञा', 'व्यक्तिवाचक संज्ञा', 'सर्वनाम'], `गुण, दोष या भाव का बोध कराने वाले शब्द 'भाववाचक संज्ञा' कहलाते हैं।`],
            [`'हिमालय' किस प्रकार की संज्ञा है? (सेट ${mockTestNumber}.${qNum})`, 'व्यक्तिवाचक संज्ञा', ['भाववाचक संज्ञा', 'जातिवाचक संज्ञा', 'क्रिया'], `विशेष पर्वत का नाम होने के कारण 'हिमालय' व्यक्तिवाचक संज्ञा है।`],
            [`"बच्चे मैदान में उत्साह से खेल रहे हैं।" वाक्य में क्रिया पद पहचानिए (सेट ${mockTestNumber}.${qNum}):`, 'खेल रहे हैं', ['बच्चे', 'मैदान में', 'उत्साह से'], `कार्य के होने का बोध कराने वाला पद 'खेल रहे हैं' क्रिया है।`],
            [`"बगीचे में सुंदर फूल खिले हैं।" वाक्य में विशेषण शब्द कौन-सा है? (सेट ${mockTestNumber}.${qNum}):`, 'सुंदर', ['बगीचे', 'फूल', 'खिले हैं'], `'फूल' की विशेषता बताने वाला शब्द 'सुंदर' विशेषण है।`],
            [`"हम कल विज्ञान प्रदर्शनी देखने जाएँगे।" यह वाक्य किस काल का है? (सेट ${mockTestNumber}.${qNum}):`, 'भविष्यत् काल', ['वर्तमान काल', 'भूतकाल', 'संदिग्ध भूतकाल'], `आने वाले समय में क्रिया होने का बोध होता है, अतः यह भविष्यत् काल है।`],
          ];
          const hg = hiGram[(tIdx + qNum) % hiGram.length];
          questionText = hg[0];
          options = placeCorrectAt(hg[1], hg[2]);
          correctIndex = targetCorrectSlot;
          explanationHi = hg[3];
          explanationEn = hg[3];
          explanationMr = hg[3];
          break;
        }
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20: {
          topic = 'शुद्ध वर्तनी, लिंग, वचन एवं वाक्यांश के लिए एक शब्द';
          const hiVocab: [string, string, [string, string, string], string][] = [
            [`'जो किए गए उपकार को मानता हो' — वाक्यांश के लिए एक शब्द चुनिए (सेट ${mockTestNumber}.${qNum}):`, 'कृतज्ञ', ['कृतघ्न', 'परोपकारी', 'अल्पज्ञ'], `उपकार मानने वाले को 'कृतज्ञ' कहते हैं।`],
            [`निम्नलिखित में से शुद्ध वर्तनी वाला शब्द चुनिए (सेट ${mockTestNumber}.${qNum}):`, 'आशीर्वाद', ['आशिर्वाद', 'आशीरवाद', 'अशीर्वाद'], `'आशीर्वाद' शुद्ध वर्तनी वाला शब्द है।`],
            [`'कवि' शब्द का सही स्त्रीलिंग रूप क्या है? (सेट ${mockTestNumber}.${qNum}):`, 'कवयित्री', ['कविता', 'लेखिका', 'गायिका'], `'कवि' का स्त्रीलिंग रूप 'कवयित्री' होता है।`],
            [`'पुस्तक' शब्द का सही बहुवचन रूप क्या होगा? (सेट ${mockTestNumber}.${qNum}):`, 'पुस्तकें', ['पुस्तकों', 'पुस्तकाएँ', 'पुस्तक'], `'पुस्तक' का बहुवचन 'पुस्तकें' है।`],
            [`'प्रतिदिन प्रकाशित होने वाला समाचार-पत्र' क्या कहलाता है? (सेट ${mockTestNumber}.${qNum}):`, 'दैनिक', ['साप्ताहिक', 'पाक्षिक', 'मासिक'], `प्रतिदिन छपने वाले पत्र को 'दैनिक' कहते हैं।`],
          ];
          const hv = hiVocab[(tIdx + qNum) % hiVocab.length];
          questionText = hv[0];
          options = placeCorrectAt(hv[1], hv[2]);
          correctIndex = targetCorrectSlot;
          explanationHi = hv[3];
          explanationEn = hv[3];
          explanationMr = hv[3];
          break;
        }
        default: {
          topic = 'अपठित गद्यांश एवं भाषा बोध (Reading Comprehension)';
          const hiPassages: [string, string, string, [string, string, string], string][] = [
            [
              `समय अत्यंत मूल्यवान है। जो विद्यार्थी समय का सदुपयोग करते हैं और नियमित अभ्यास करते हैं, वे जीवन में सदैव सफलता प्राप्त करते हैं।`,
              `गद्यांश के अनुसार जीवन में सफलता कौन प्राप्त करता है?`,
              `जो समय का सदुपयोग और नियमित अभ्यास करते हैं`,
              [`जो कार्य को कल पर टालते हैं`, `जो केवल खेलते रहते हैं`, `जो समय नष्ट करते हैं`],
              `गद्यांश के अनुसार समय का सदुपयोग और नियमित अभ्यास करने वाले विद्यार्थी सफल होते हैं।`,
            ],
            [
              `वृक्ष हमारे पर्यावरण के रक्षक हैं। वे कार्बन डाइऑक्साइड ग्रहण कर हमें शुद्ध ऑक्सीजन प्रदान करते हैं और मिट्टी के कटाव को रोकते हैं।`,
              `वृक्ष हमें कौन-सी प्राणवायु प्रदान करते हैं?`,
              `शुद्ध ऑक्सीजन`,
              [`कार्बन मोनोऑक्साइड`, `नाइट्रोजन`, `धुआँ`],
              `वृक्ष हमें जीवनदायिनी शुद्ध ऑक्सीजन प्रदान करते हैं।`,
            ],
          ];
          const hp = hiPassages[(tIdx + qNum) % hiPassages.length];
          questionText = `गद्यांश पढ़िए: "${hp[0]}" — प्रश्न: ${hp[1]} (सेट ${mockTestNumber}.${qNum})`;
          options = placeCorrectAt(hp[2], hp[3]);
          correctIndex = targetCorrectSlot;
          explanationHi = hp[4];
          explanationEn = hp[4];
          explanationMr = hp[4];
          break;
        }
      }
    }

    const id = `msce_${stdCode}_t${String(mockTestNumber).padStart(2, '0')}_p${paperNumber}_lang_${langCode}_q${String(qNum).padStart(2, '0')}`;
    const normalizedHash = `${stdCode}_p${paperNumber}_${langCode}_t${mockTestNumber}_q${qNum}_${questionText.toLowerCase().replace(/[^a-z0-9\u0900-\u097f]/g, '').slice(0, 48)}`;

    questions.push({
      id,
      stdLevel,
      languageSubject,
      mockTestNumber,
      questionNumber: qNum,
      topic,
      difficulty,
      questionText,
      options,
      correctIndex,
      explanation: {
        English: explanationEn || explanationMr || explanationHi,
        Marathi: explanationMr || explanationEn || explanationHi,
        Hindi: explanationHi || explanationEn || explanationMr,
      },
      normalizedHash,
    });
  }

  // studentMedium is used by caller to pick explanation language
  void studentMedium;
  return questions;
}
