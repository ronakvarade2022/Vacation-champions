import { ClassLevel, EducationBoard, SubjectName } from '../../../types';
import { CompactWorksheetQuestionSpec, WorksheetItemFormat } from '../types';
import { getClassNumber, getStageBand, getBoardSyllabusLabel } from './chapterCatalog';

type SocQ = {
  q: string;
  o: [string, string, string, string];
  a: 0 | 1 | 2 | 3;
  e: string;
};

function placeCorrect(
  correct: string,
  distractors: [string, string, string],
  targetIdx: 0 | 1 | 2 | 3
): { o: [string, string, string, string]; a: 0 | 1 | 2 | 3 } {
  const arr = [...distractors];
  arr.splice(targetIdx, 0, correct);
  return { o: [arr[0], arr[1], arr[2], arr[3]], a: targetIdx };
}

function rotateSocQ(item: SocQ, shift: number, format: WorksheetItemFormat, c: string): CompactWorksheetQuestionSpec {
  const s = shift % 4;
  const map = [0, 1, 2, 3].map((i) => (i + s) % 4);
  const o: [string, string, string, string] = [
    item.o[map[0]],
    item.o[map[1]],
    item.o[map[2]],
    item.o[map[3]],
  ];
  const a = map.indexOf(item.a) as 0 | 1 | 2 | 3;
  return { f: format, c, q: item.q, o, a, e: item.e };
}

const HISTORY_BANK: Record<'early' | 'upper_primary' | 'middle' | 'secondary', SocQ[]> = {
  early: [
    { q: 'On which date do we celebrate India’s Independence Day every year?', o: ['26th January', '15th August', '2nd October', '14th November'], a: 1, e: 'India gained independence on 15th August 1947.' },
    { q: 'Which great Maratha king established Hindavi Swarajya?', o: ['Chhatrapati Shivaji Maharaj', 'Emperor Akbar', 'Ashoka', 'Tipu Sultan'], a: 0, e: 'Chhatrapati Shivaji Maharaj founded Hindavi Swarajya in Maharashtra.' },
    { q: 'Who is respectfully remembered as "Bapu" and the Father of our Nation?', o: ['Sardar Patel', 'Mahatma Gandhi', 'Subhas Chandra Bose', 'Bhagat Singh'], a: 1, e: 'Mahatma Gandhi led India’s non-violent freedom movement.' },
    { q: 'In which hill fort was Chhatrapati Shivaji Maharaj born in 1630?', o: ['Raigad Fort', 'Shivneri Fort', 'Sinhagad Fort', 'Pratapgad Fort'], a: 1, e: 'Shivaji Maharaj was born at Shivneri Fort near Junnar.' },
    { q: 'Which emperor erected the Ashoka Pillar featuring four lions—now our National Emblem?', o: ['Chandragupta Maurya', 'Emperor Ashoka', 'Samudragupta', 'Harshavardhana'], a: 1, e: 'The Sarnath Lion Capital was erected by Emperor Ashoka.' },
    { q: 'Which queen of Jhansi fought bravely during the Revolt of 1857?', o: ['Ahilyabai Holkar', 'Rani Lakshmibai', 'Begum Hazrat Mahal', 'Rani Rudrama'], a: 1, e: 'Rani Lakshmibai of Jhansi is remembered for fearless courage in 1857.' },
  ],
  upper_primary: [
    { q: 'Which was the first major fort captured by young Shivaji Maharaj in 1647 to begin Hindavi Swarajya?', o: ['Torna Fort (Prachandagad)', 'Lohagad', 'Daulatabad', 'Panhala'], a: 0, e: 'Shivaji Maharaj captured Torna Fort at age 16–17 in 1647.' },
    { q: 'Who served as the chief Commander (Sarsenapati) who led the night capture of Kondhana (Sinhagad) in 1670?', o: ['Baji Prabhu Deshpande', 'Tanaji Malusare', 'Hambirrao Mohite', 'Netaji Palkar'], a: 1, e: 'Subedar Tanaji Malusare sacrificed his life winning Sinhagad Fort.' },
    { q: 'Which sea-fort in the Konkan coast did Chhatrapati Shivaji Maharaj build as his mighty Naval Headquarters?', o: ['Raigad', 'Sindhudurg (Malvan)', 'Purandar', 'Torna'], a: 1, e: 'Sindhudurg island fort anchored the Maratha Navy.' },
    { q: 'How many ministers formed Shivaji Maharaj’s famous Council of Ministers (Ashtapradhan Mandal)?', o: ['Five', 'Eight', 'Twelve', 'Ten'], a: 1, e: '"Ashta" means eight specialised ministers handling Swarajya administration.' },
    { q: 'Who gave the famous slogan "Swaraj is my birthright and I shall have it!"?', o: ['Gopal Krishna Gokhale', 'Lokmanya Bal Gangadhar Tilak', 'Lala Lajpat Rai', 'Dadabhai Naoroji'], a: 1, e: 'Lokmanya Tilak inspired mass self-rule nationalism with this motto.' },
    { q: 'Who wrote our Constitution’s draft as Chairman of the Drafting Committee?', o: ['Dr. Rajendra Prasad', 'Dr. B. R. Ambedkar', 'Pt. Jawaharlal Nehru', 'Maulana Azad'], a: 1, e: 'Dr. Babasaheb Ambedkar was Chairman of the Drafting Committee.' },
  ],
  middle: [
    { q: 'Which Harappan site in Gujarat is famous for the world’s earliest known tidal brick dockyard?', o: ['Mohenjo-daro', 'Lothal', 'Kalibangan', 'Rakhigarhi'], a: 1, e: 'Lothal (on Bhogava river tributary in Gujarat) was a thriving Indus maritime dockyard.' },
    { q: 'Who authored "Arthashastra", the famous Mauryan treatise on statecraft and economics?', o: ['Megasthenes', 'Kautilya (Chanakya)', 'Banabhatta', 'Kalidasa'], a: 1, e: 'Chanakya / Kautilya advised Chandragupta Maurya and wrote Arthashastra.' },
    { q: 'In 1848 in Pune, who opened India’s first school for girls alongside Savitribai Phule?', o: ['Mahatma Jyotirao Phule', 'Maharshi Karve', 'Justice Ranade', 'Raja Ram Mohan Roy'], a: 0, e: 'Mahatma Phule and Savitribai Phule pioneered girls’ education at Bhide Wada, Pune.' },
    { q: 'In which year did the Indian National Congress declare "Purna Swaraj" (Complete Independence) at Lahore?', o: ['1919', '1929 (implemented 26 Jan 1930)', '1942', '1947'], a: 1, e: 'Under Jawaharlal Nehru’s presidentship in Dec 1929, Purna Swaraj was declared.' },
    { q: 'Which movement did Mahatma Gandhi launch in 1930 with the 240-mile Dandi March?', o: ['Non-Cooperation Movement', 'Civil Disobedience Movement (Salt Satyagraha)', 'Quit India Movement', 'Swadeshi Movement'], a: 1, e: 'Breaking the salt tax at Dandi initiated the Civil Disobedience Movement.' },
    { q: 'Who founded the Indian National Army (Azad Hind Fauj) in East Asia with the battle cry "Delhi Chalo"?', o: ['Rash Behari Bose & Netaji Subhas Chandra Bose', 'Lala Hardayal', 'Surya Sen', 'Chandra Shekhar Azad'], a: 0, e: 'Netaji Subhas Chandra Bose reorganised Azad Hind Fauj to liberate India.' },
  ],
  secondary: [
    { q: 'What did the Rowlatt Act of 1919 allow the British colonial government to do without trial?', o: ['Lower land taxes', 'Detain political prisoners without trial for up to two years', 'Grant provincial voting rights', 'Abolish salt tax'], a: 1, e: 'Known as the "Black Act", it authorised arrest without warrant and detention without trial.' },
    { q: 'Which 1945 international organisation replaced the League of Nations after World War II to maintain peace?', o: ['NATO', 'United Nations (UN)', 'European Union', 'SEATO'], a: 1, e: 'The UN was founded on 24 October 1945 to prevent future world wars.' },
    { q: 'In Applied History, who proposed the concept of a "Museum of Ideas" or preserving intangible heritage like folklore & festivals?', o: ['UNESCO World Heritage Programme', 'East India Company', 'Congress of Vienna', 'Versailles Council'], a: 0, e: 'UNESCO promotes protection of both tangible monuments and intangible living traditions.' },
    { q: 'Assertion (A): Balshastri Jambhekar started the first Marathi newspaper "Darpan" in 1832. Reason (R): Early print journalism in Maharashtra spread social reform and scientific awareness.', o: ['Both A and R are true, and R explains A', 'A is true, R is false', 'A is false, R is true', 'Both are false'], a: 0, e: 'Balshastri Jambhekar is honoured as the Father of Marathi Journalism (6 Jan 1832).' },
    { q: 'Under the Government of India / Indian Independence Act 1947, what choice was given to Princely States before Sardar Patel integrated them?', o: ['Join India, Pakistan, or remain independent', 'Become British colonies forever', 'Merge into Burma', 'Join UN Trusteeship'], a: 0, e: 'Sardar Vallabhbhai Patel and V.P. Menon unified over 560 princely states into India.' },
    { q: 'Which Treaty formally ended World War I in 1919 and imposed harsh reparations on Germany?', o: ['Treaty of Vienna', 'Treaty of Versailles', 'Treaty of Brest-Litovsk', 'Potsdam Accord'], a: 1, e: 'The Treaty of Versailles (June 1919) forced steep territorial and financial penalties.' },
  ],
};

const GEOGRAPHY_BANK: Record<'early' | 'upper_primary' | 'middle' | 'secondary', SocQ[]> = {
  early: [
    { q: 'In which direction does the Sun appear to rise every morning?', o: ['West', 'East', 'North', 'South'], a: 1, e: 'Earth rotates west-to-east, so the Sun rises in the East.' },
    { q: 'What is a vast body of salty water covering most of Earth called?', o: ['Pond', 'Ocean', 'Canal', 'Well'], a: 1, e: 'Oceans hold salty marine water across 71% of Earth’s surface.' },
    { q: 'Which landform rises high above the surrounding land with a steep peak?', o: ['Plain', 'Valley', 'Mountain', 'Island'], a: 2, e: 'Mountains are tall elevated landforms with peaks.' },
    { q: 'Which instrument helps sailors and travellers find North, South, East, and West?', o: ['Thermometer', 'Magnetic Compass', 'Barometer', 'Scale'], a: 1, e: 'A magnetic compass needle always aligns roughly North-South.' },
    { q: 'What is the dark, fertile soil in Maharashtra famous for growing cotton called?', o: ['Regur (Black Cotton Soil)', 'Desert sand', 'Snow clay', 'Laterite gravel'], a: 0, e: 'Deccan Trap volcanic basalt weathered into fertile Black Regur soil.' },
    { q: 'Which planet do we live on?', o: ['Mars', 'Venus', 'Earth', 'Jupiter'], a: 2, e: 'Earth is the third planet from the Sun and supports life.' },
  ],
  upper_primary: [
    { q: 'Which major east-flowing river originates at Trimbakeshwar near Nashik and is called "Dakshin Ganga"?', o: ['Tapi River', 'Godavari River', 'Narmada River', 'Ulhas River'], a: 1, e: 'The Godavari originates at Trimbakeshwar in Maharashtra.' },
    { q: 'Which mountain range forms the western escarpment parallel to Maharashtra’s Konkan coast?', o: ['Aravalli Range', 'Sahyadri (Western Ghats)', 'Satpura Range', 'Nilgiris'], a: 1, e: 'The Sahyadri / Western Ghats separate Konkan coastal strip from the Deccan Plateau.' },
    { q: 'Which imaginary 0° line of latitude divides Earth into the Northern and Southern Hemispheres?', o: ['Prime Meridian', 'Equator', 'Tropic of Capricorn', 'Arctic Circle'], a: 1, e: 'The Equator (0° latitude) splits Earth equally into North and South hemispheres.' },
    { q: 'Which winds bring the main June-to-September rainy season across India?', o: ['North-East Trade Winds', 'South-West Monsoon Winds', 'Polar Easterlies', 'Westerlies'], a: 1, e: 'Moisture-laden South-West Monsoon winds from the Indian Ocean bring heavy rainfall.' },
    { q: 'What is a piece of land surrounded by water on three sides (such as Southern India) called?', o: ['Island', 'Peninsula', 'Delta', 'Strait'], a: 1, e: 'A landmass bordered by water on three sides is a peninsula.' },
    { q: 'Which district in Maharashtra is India’s "Orange City"?', o: ['Pune', 'Nagpur', 'Kolhapur', 'Solapur'], a: 1, e: 'Nagpur in Vidarbha is renowned for sweet Mandarin oranges.' },
  ],
  middle: [
    { q: 'What causes the change of Seasons on Earth?', o: ['Earth’s daily rotation on its axis', 'Revolution around the Sun combined with Earth’s 23.5° axial tilt', 'Tides caused by the Moon', 'Ocean currents alone'], a: 1, e: 'Because Earth’s axis tilts at 23.5° while revolving, sunlight angle shifts annually.' },
    { q: 'Basalt rock formed by cooling lava on the Deccan Plateau belongs to which rock family?', o: ['Sedimentary rock', 'Igneous (extrusive volcanic) rock', 'Metamorphic rock', 'Fossil chalk'], a: 1, e: 'Cooling molten magma/lava solidifies into igneous rocks like basalt and granite.' },
    { q: 'What is Indian Standard Time (IST, 82°30′E) relative to Greenwich Mean Time (GMT, 0°)?', o: ['5 hours 30 minutes behind GMT', '5 hours 30 minutes ahead of GMT', '3 hours ahead', 'Identical to GMT'], a: 1, e: '82.5° E × 4 min/degree = 330 minutes = +5 hrs 30 min ahead of GMT.' },
    { q: 'Which layer of Earth’s atmosphere contains the protective Ozone (O₃) layer that absorbs harmful UV rays?', o: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'], a: 1, e: 'The ozone shield sits mostly in the Stratosphere (15–35 km altitude).' },
    { q: 'Why do high-tide / spring tides occur on Full Moon and New Moon days?', o: ['Earth stops spinning', 'Sun, Moon, and Earth align in one line, combining gravitational pull', 'Ocean water warms up', 'Winds blow faster'], a: 1, e: 'Aligned Sun–Moon gravity creates maximum spring tides.' },
    { q: 'Which cash crop thrives in well-drained laterite hill slopes of Assam, Darjeeling, and Munnar?', o: ['Wheat', 'Tea', 'Bajra', 'Jute'], a: 1, e: 'Tea bushes require warm humid climate and sloped drainage without stagnant water.' },
  ],
  secondary: [
    { q: 'Comparing India and Brazil: Both nations lie partly in the Southern Hemisphere? Wait—which statement is true?', o: ['India lies completely in Northern-Eastern Hemispheres; Brazil spans Equator & lies mostly in Southern-Western Hemispheres', 'Both lie entirely in Southern Hemisphere', 'Brazil lies north of Equator only', 'India lies in Western Hemisphere'], a: 0, e: 'India is wholly north of 8°4′N (North-East); Brazil spans 5°N to 33°S.' },
    { q: 'Why does the leeward (eastern) side of the Sahyadris around Solapur/Ahmednagar receive low rainfall?', o: ['Rain-shadow effect as descending winds warm up and lose moisture', 'Closer to Arctic Ocean', 'High altitude snow', 'Trade wind reversal'], a: 0, e: 'Moist SW Monsoon air sheds rain on windward Konkan slopes, creating a dry Deccan rain-shadow.' },
    { q: 'What does a Population Pyramid with a wide base and narrow top indicate?', o: ['High birth rate and rapidly growing young population', 'Declining birth rate and ageing society', 'Zero migration', 'Low infant count'], a: 0, e: 'A broad base represents a large cohort of children under 15.' },
    { q: 'Which port on Maharashtra’s coast is India’s largest container port (Jawaharlal Nehru Port Trust)?', o: ['Kandla', 'Nhava Sheva (Navi Mumbai)', 'Mormugao', 'Paradip'], a: 1, e: 'JNPT at Nhava Sheva handles over half of India’s containerised maritime cargo.' },
    { q: 'Why is Punjab-Haryana alluvial plain agriculturally dominant for wheat & rice despite moderate rain?', o: ['Fertile Indo-Gangetic alluvium coupled with extensive Bhakra-Beas canal/tubewell irrigation', 'Black lava soil', 'Coastal salinity', 'Equatorial rainforest'], a: 0, e: 'Alluvial soil + Green Revolution irrigation networks sustain multi-cropping.' },
    { q: 'On a topographic map, closely spaced contour lines represent what kind of slope?', o: ['Gentle flat plain', 'Steep cliff or mountain slope', 'Marshy delta', 'Underground tunnel'], a: 1, e: 'Tight contour spacing means elevation changes rapidly over short horizontal distance.' },
  ],
};

const CIVICS_ECON_COMM_BANK: Record<'early' | 'upper_primary' | 'middle' | 'secondary', SocQ[]> = {
  early: [
    { q: 'Who helps keep our neighbourhood streets and markets safe every day?', o: ['Magician', 'Police Officer', 'Clown', 'Painter'], a: 1, e: 'Police officers maintain law, order, and traffic safety.' },
    { q: 'What should children do when boarding a school bus at the stop?', o: ['Push everyone inside', 'Wait in a neat queue and board calmly', 'Run across the highway', 'Stand on steps'], a: 1, e: 'Queue discipline keeps every student safe.' },
    { q: 'What is the basic reason we save pocket money inside a piggy bank?', o: ['To throw coins away', 'To build good saving habits for future needs', 'Coins get heavier', 'So friends cannot play'], a: 1, e: 'Saving builds financial responsibility from childhood.' },
  ],
  upper_primary: [
    { q: 'Which elected local council governs sanitation, streetlights, and water supply in an Indian village?', o: ['Municipal Corporation', 'Gram Panchayat', 'High Court', 'Parliament'], a: 1, e: 'Gram Panchayat administers local village governance under Panchayati Raj.' },
    { q: 'In our Indian Constitution, at what age does every citizen gain the universal right to vote?', o: ['16 years', '18 years', '21 years', '25 years'], a: 1, e: 'The 61st Amendment lowered voting age to 18 years (Universal Adult Franchise).' },
    { q: 'Match National Symbol: What is India’s National Aquatic Animal?', o: ['Crocodile', 'Ganges River Dolphin', 'Blue Whale', 'Goldfish'], a: 1, e: 'The Ganges River Dolphin symbolises healthy freshwater ecosystems.' },
    { q: 'Which emergency helpline number connects citizens directly to Fire Services in India (or ERSS 112)?', o: ['101 (and 112 unified)', '999', '1900', '144'], a: 0, e: '101 is Fire helpline and 112 is India’s unified emergency number.' },
  ],
  middle: [
    { q: 'Which Fundamental Right (Article 21A) makes free and compulsory education a legal right for ages 6–14?', o: ['Right to Property', 'Right to Education (Fundamental Right to Freedom)', 'Right to Vote', 'Trade Right'], a: 1, e: 'Article 21A guarantees free compulsory education for ages 6 to 14.' },
    { q: 'Who heads the Council of Ministers in an Indian State Government?', o: ['Chief Justice of High Court', 'Chief Minister', 'Mayor', 'Speaker'], a: 1, e: 'The Chief Minister leads the State Executive and Council of Ministers.' },
    { q: 'Why does India follow a Parliamentary system with Separation of Powers?', o: ['To let one person control everything', 'So Legislature, Executive, and independent Judiciary check and balance each other', 'To eliminate elections', 'To avoid taxes'], a: 1, e: 'Separation of powers prevents misuse of authority and upholds the Constitution.' },
    { q: 'Which economic sector includes farming, dairy, fishing, and mining natural raw materials?', o: ['Primary Sector', 'Secondary Manufacturing Sector', 'Tertiary Service Sector', 'Quaternary IT'], a: 0, e: 'Primary activities harvest raw products directly from Earth/nature.' },
  ],
  secondary: [
    { q: 'Which Constitutional Institution conducts free and fair Lok Sabha, Vidhan Sabha, and Presidential elections in India?', o: ['Reserve Bank of India', 'Election Commission of India (ECI, Article 324)', 'NITI Aayog', 'Comptroller and Auditor General'], a: 1, e: 'ECI is an autonomous constitutional body under Article 324.' },
    { q: 'In Economics, when price of a normal good falls (other things equal), quantity demanded:', o: ['Falls to zero', 'Rises (inverse Law of Demand)', 'Always stays fixed', 'Becomes negative'], a: 1, e: 'Law of Demand states an inverse relationship between price and quantity demanded.' },
    { q: 'Who acts as India’s Central Bank controlling currency issue, repo rate, and inflation?', o: ['State Bank of India', 'Reserve Bank of India (RBI)', 'SEBI', 'NABARD'], a: 1, e: 'RBI is India’s central monetary authority established in 1935.' },
    { q: 'In Commercial Studies (Final Accounts), wages paid on bringing raw materials into a factory appear in which account?', o: ['Trading Account (Direct Expense)', 'Profit & Loss Account (Indirect Expense)', 'Balance Sheet Liability', 'Drawings Account'], a: 0, e: 'Direct factory/manufacturing expenses are debited to the Trading Account to find Gross Profit.' },
    { q: 'Which Consumer Right under the Consumer Protection Act entitles buyers to seek redressal against unfair trade practices?', o: ['Right to Monopoly', 'Right to Seek Redressal (Consumer Forums)', 'Right to Hoard', 'Right to Evade Tax'], a: 1, e: 'District, State, and National Consumer Commissions adjudicate buyer complaints.' },
    { q: 'Under the 42nd Constitutional Amendment (1976), what duties were added as Article 51A?', o: ['Tax Exemptions', 'Fundamental Duties of Citizens', 'State Governors', 'Goods & Services Tax'], a: 1, e: 'Part IV-A (Article 51A) lists Citizens’ Fundamental Duties.' },
  ],
};

const GK_MORAL_BANK: Record<'early' | 'upper_primary' | 'middle' | 'secondary', SocQ[]> = {
  early: [
    { q: 'If you accidentally drop your classmate’s crayon box, what is the polite thing to do?', o: ['Laugh and run away', 'Say "Sorry" and help pick up every crayon', 'Hide the crayons', 'Blame someone else'], a: 1, e: 'Apologising politely and helping shows kindness and responsibility.' },
    { q: 'Which majestic animal is the National Animal of India?', o: ['African Elephant', 'Royal Bengal Tiger', 'Kangaroo', 'Giraffe'], a: 1, e: 'The Royal Bengal Tiger is India’s National Animal.' },
    { q: 'How many colours are arranged in India’s National Flag (Tiranga), excluding the navy-blue Ashoka Chakra?', o: ['Two', 'Three (Saffron, White, Green)', 'Four', 'Five'], a: 1, e: 'Saffron (top), White (middle with 24-spoke Chakra), and Green (bottom).' },
    { q: 'Why is brushing teeth twice daily and washing hands important?', o: ['Moral discipline & lifelong health hygiene', 'Just to use toothpaste', 'To miss school', 'No reason'], a: 0, e: 'Cleanliness keeps infections away and builds healthy discipline.' },
  ],
  upper_primary: [
    { q: 'Which Indian space organisation launched Chandrayaan-3 to land near the Moon’s South Pole in 2023?', o: ['NASA', 'ISRO (Indian Space Research Organisation)', 'ESA', 'DRDO'], a: 1, e: 'ISRO made India the first nation to soft-land near the lunar south pole.' },
    { q: 'When waiting for water at a school tap where a younger Std 1 student is struggling, what shows empathy?', o: ['Push ahead first', 'Help the younger student fill their bottle safely', 'Waste water', 'Ignore them'], a: 1, e: 'Helping younger and vulnerable peers demonstrates genuine empathy.' },
    { q: 'Which is the largest state of India by geographical area (Maharashtra is 3rd largest)?', o: ['Madhya Pradesh', 'Rajasthan', 'Uttar Pradesh', 'Gujarat'], a: 1, e: 'Rajasthan is the largest state by area, followed by MP and Maharashtra.' },
    { q: 'Who composed India’s National Anthem "Jana Gana Mana"?', o: ['Bankim Chandra Chatterjee', 'Rabindranath Tagore', 'Sarojini Naidu', 'Subramania Bharati'], a: 1, e: 'Nobel laureate Rabindranath Tagore wrote "Jana Gana Mana".' },
  ],
  middle: [
    { q: 'Which Indian physicist won the 1930 Nobel Prize for discovering how light scatters (Raman Effect)?', o: ['Homi J. Bhabha', 'Sir C. V. Raman', 'S. N. Bose', 'Vikram Sarabhai'], a: 1, e: 'National Science Day (28 Feb) celebrates C. V. Raman’s 1928 discovery.' },
    { q: 'If a friend shares an unverified shocking news link on social media, what is the ethical digital citizen habit?', o: ['Forward it to 50 groups immediately', 'Verify the source from trusted official sites before sharing', 'Add scary emojis', 'Ignore cyber safety'], a: 1, e: 'Fact-checking prevents misinformation panic and upholds digital ethics.' },
    { q: 'Who is known as the "Missile Man of India" and served as India’s 11th President?', o: ['Dr. Vikram Sarabhai', 'Dr. A. P. J. Abdul Kalam', 'Satish Dhawan', 'K. Sivan'], a: 1, e: 'Dr. A. P. J. Abdul Kalam inspired generations with Pokhran, SLV-3 & missile programmes.' },
    { q: 'Which currency belongs to Japan?', o: ['Won', 'Yen (¥)', 'Baht', 'Yuan'], a: 1, e: 'The official currency of Japan is the Japanese Yen.' },
  ],
  secondary: [
    { q: 'Why is academic integrity (citing sources and refusing plagiarism/cheating) essential in research & board exams?', o: ['It wastes time', 'It builds authentic competence, fairness, and scientific trust', 'Only top rankers need it', 'Rules don’t matter online'], a: 1, e: 'Original honest effort ensures real mastery and societal credibility.' },
    { q: 'India’s Aditya-L1 mission launched in 2023 orbits at Lagrange Point L1 primarily to study:', o: ['Jupiter’s moons', 'The Sun’s corona, solar flares & space weather', 'Martian craters', 'Arctic ice'], a: 1, e: 'Aditya-L1 continuously observes solar activity from L1 ~1.5 million km from Earth.' },
    { q: 'Which constitutional principle ensures India has no official state religion and treats all faiths equally?', o: ['Oligarchy', 'Secularism', 'Theocracy', 'Monarchy'], a: 1, e: 'The Preamble affirms India as a Sovereign, Socialist, Secular, Democratic Republic.' },
    { q: 'When two teammates strongly disagree on a science project approach, ethical leadership calls for:', o: ['Expelling one member immediately', 'Facilitating evidence-based dialogue combining the strongest ideas', 'Ignoring both ideas', 'Flipping a coin secretly'], a: 1, e: 'Constructive consensus grounded in evidence creates stronger teamwork.' },
  ],
};

export function generateSocialHumanitiesQuestionForSlot(
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
  const seed = wsNum * 43 + qIdx * 19 + c * 7;
  const ansIdx = (seed % 4) as 0 | 1 | 2 | 3;

  // Parametric Longitude / Time-Zone Problem for Geography (Classes 6-10)
  if ((subject === 'Geography' || subject === 'Social Science') && c >= 6 && qIdx === 3) {
    const degEast = (((wsNum + qIdx) % 5) + 1) * 15; // 15, 30, 45, 60, 75 deg East
    const hrsAhead = degEast / 15;
    const gmtHr = 10;
    const localHr = gmtHr + hrsAhead;
    const strLocal = localHr <= 12 ? `${localHr}:00 ${localHr === 12 ? 'noon' : 'a.m.'}` : `${localHr - 12}:00 p.m.`;
    const { o, a } = placeCorrect(
      strLocal,
      [`${gmtHr - hrsAhead}:00 a.m.`, `${localHr === 12 ? 1 : (localHr + 1 > 12 ? localHr - 11 : localHr + 1)}:00 p.m.`, `${gmtHr}:00 a.m.`],
      ansIdx
    );
    return {
      f: format,
      c: chapterName,
      q: `(${boardTag} • Map Time Zone) Every 15° longitude east adds 1 hour. If it is 10:00 a.m. at Greenwich (0°), what is the local solar time at ${degEast}°E?`,
      o,
      a,
      e: `${degEast}°E ÷ 15°/hr = +${hrsAhead} hours ahead of 10:00 a.m. ⇒ ${strLocal}.`,
    };
  }

  // Parametric Economics / Commercial Studies Problem (Classes 8-10)
  if ((subject === 'Economics' || subject === 'Commercial Studies') && c >= 8 && qIdx === 3) {
    if (subject === 'Commercial Studies') {
      const sales = (((wsNum + qIdx) % 6) + 4) * 10000;
      const cogs = sales - (((wsNum + qIdx) % 3) + 2) * 5000;
      const gp = sales - cogs;
      const { o, a } = placeCorrect(
        `₹${gp.toLocaleString('en-IN')}`,
        [`₹${(gp + 5000).toLocaleString('en-IN')}`, `₹${Math.max(1000, gp - 5000).toLocaleString('en-IN')}`, `₹${(sales + cogs).toLocaleString('en-IN')}`],
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `In a Trading Account (Set ${wsNum}), Net Sales = ₹${sales.toLocaleString('en-IN')} and Cost of Goods Sold (COGS) = ₹${cogs.toLocaleString('en-IN')}. Find the Gross Profit.`,
        o,
        a,
        e: `Gross Profit = Net Sales − COGS = ₹${sales.toLocaleString('en-IN')} − ₹${cogs.toLocaleString('en-IN')} = ₹${gp.toLocaleString('en-IN')}.`,
      };
    } else {
      const primary = (((wsNum + qIdx) % 4) + 2) * 100;
      const secondary = primary + 150;
      const tertiary = secondary + 250;
      const totalGdp = primary + secondary + tertiary;
      const { o, a } = placeCorrect(
        `₹${totalGdp} Crore`,
        [`₹${totalGdp - 100} Crore`, `₹${primary + secondary} Crore`, `₹${totalGdp + 200} Crore`],
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `An economy records final goods & services value of ₹${primary} Cr (Primary), ₹${secondary} Cr (Secondary), and ₹${tertiary} Cr (Tertiary). What is its Total GDP?`,
        o,
        a,
        e: `GDP sums final output of all three sectors: ${primary} + ${secondary} + ${tertiary} = ₹${totalGdp} Crore.`,
      };
    }
  }

  let pool: SocQ[];
  if (subject === 'History' || subject === 'History & Civics') {
    pool = subject === 'History & Civics'
      ? [...HISTORY_BANK[band], ...CIVICS_ECON_COMM_BANK[band]]
      : HISTORY_BANK[band];
  } else if (subject === 'Geography') {
    pool = GEOGRAPHY_BANK[band];
  } else if (subject === 'General Knowledge' || subject === 'Moral Education') {
    pool = GK_MORAL_BANK[band];
  } else if (subject === 'Social Studies' || subject === 'Social Science') {
    pool = [...HISTORY_BANK[band], ...GEOGRAPHY_BANK[band], ...CIVICS_ECON_COMM_BANK[band]];
  } else {
    // Political Science, Economics, Commercial Studies
    pool = CIVICS_ECON_COMM_BANK[band];
  }

  const idx = (wsNum * 6 + qIdx) % pool.length;
  const item = pool[idx];
  const pass = Math.floor((wsNum * 6 + qIdx) / pool.length);
  const qText =
    pass === 0
      ? item.q
      : `(${boardTag} • ${classLevel} ${subject} • Set ${wsNum}) ${item.q}`;

  return rotateSocQ({ ...item, q: qText }, seed, format, chapterName);
}
