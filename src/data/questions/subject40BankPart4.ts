import { ClassLevel, QuizLevel, SubjectName } from '../../types';
import { RawQuizSpec } from './subject40BankPart1';

/**
 * Part 4 of the Verified Curriculum Bank:
 * Covers the 7 CBSE & ICSE Specialized Subjects × 4 Levels × 10 Unique Questions = 280+ Unique Questions:
 * 25. Social Science (CBSE Classes 6–10)
 * 26. History & Civics (ICSE Classes 6–10)
 * 27. Computer Studies (ICSE Classes 1–8, calibrated for Primary c <= 5 vs Middle c >= 6)
 * 28. Computer Applications (CBSE/ICSE Classes 9–10)
 * 29. Economics (CBSE/ICSE Classes 9–10)
 * 30. Commercial Studies (ICSE Classes 9–10)
 * 31. Sanskrit (CBSE Classes 6–10)
 */
export function getPart4SubjectQuestions(
  classLevel: ClassLevel,
  subject: SubjectName,
  level: QuizLevel
): RawQuizSpec[] | null {
  const c = parseInt(classLevel.replace('Class ', ''), 10) || 6;

  // ============================================================================
  // 25. SOCIAL SCIENCE — 40 Unique Questions (10 per Level)
  // ============================================================================
  if (subject === 'Social Science') {
    if (level === 1) {
      return [
        {
          text: `Which ancient civilization flourished along the banks of the River Indus and its tributaries around 2500 BCE, featuring planned cities like Harappa and Mohenjo-daro?`,
          options: [
            'Indus Valley (Harappan) Civilization',
            'Mesopotamian Civilization',
            'Inca Civilization',
            'Roman Civilization'
          ],
          correctIndex: 0,
          explanation: 'The Harappan or Indus Valley Civilization was one of the world’s earliest urban civilizations, known for grid-pattern streets and brick drainage systems.',
          topic: 'Ancient Civilizations & Heritage'
        },
        {
          text: `Fill in the blank: The imaginary line of latitude at 23°30' North that passes almost halfway through India across 8 states is the _____.`,
          options: [
            'Tropic of Cancer',
            'Tropic of Capricorn',
            'Equator',
            'Arctic Circle'
          ],
          correctIndex: 0,
          explanation: 'The Tropic of Cancer (23°30\' N) passes through Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram.',
          topic: 'India – Size and Location'
        },
        {
          text: `True or False: In a democratic country like India, the government is elected by the people through Universal Adult Franchise (every citizen aged 18 years and above has the right to vote).`,
          options: [
            'True',
            'False',
            'Only landowners can vote',
            'Rulers are chosen by hereditary monarchy'
          ],
          correctIndex: 0,
          explanation: 'Universal Adult Franchise guarantees every adult citizen (18+ years) one vote of equal value without discrimination.',
          topic: 'Democratic Politics & Constitutional Values'
        },
        {
          text: `Match the Economic Sector with its primary activity:`,
          options: [
            'Primary Sector → Agriculture & Dairy | Secondary Sector → Manufacturing Industries | Tertiary Sector → Banking, Transport & Education Services',
            'Primary Sector → Software Coding | Secondary Sector → Fishing | Tertiary Sector → Mining',
            'All three sectors only perform mining',
            'Tertiary sector produces raw cotton'
          ],
          correctIndex: 0,
          explanation: 'Primary extracts natural resources, Secondary manufactures finished goods, and Tertiary provides support and professional services.',
          topic: 'Sectors of the Indian Economy'
        },
        {
          text: `Which Himalayan mountain range is the northernmost and highest continuous range, containing peaks like Mount Everest and Kanchenjunga?`,
          options: [
            'Himadri (Greater Himalayas)',
            'Himachal (Lesser Himalayas)',
            'Shiwaliks (Outer Himalayas)',
            'Aravalli Hills'
          ],
          correctIndex: 0,
          explanation: 'The Great or Inner Himalayas are called the Himadri, with an average loftiness of 6,000 metres.',
          topic: 'Physical Features of India'
        },
        {
          text: `Identify the INCORRECT statement regarding the Indian Constitution:`,
          options: [
            'Dr. B.R. Ambedkar chaired the Drafting Committee of the Constituent Assembly',
            'The Constitution was adopted on 26 November 1949 and enforced on 26 January 1950',
            'The Preamble declares India a Sovereign, Socialist, Secular, Democratic Republic',
            'The Constitution allows discrimination against citizens based on caste and religion'
          ],
          correctIndex: 3,
          explanation: 'Article 14 and Article 15 strictly prohibit discrimination on grounds of religion, race, caste, sex, or place of birth.',
          topic: 'Constitutional Design & Equality'
        },
        {
          text: `Complete the sentence: Resources that can be renewed or reproduced by physical, chemical, or mechanical processes (such as solar and wind energy) are called _____ resources.`,
          options: [
            'Renewable (Replenishable)',
            'Non-Renewable',
            'Fossil Fuel',
            'Exhaustible Mineral'
          ],
          correctIndex: 0,
          explanation: 'Solar energy, wind energy, water, and forests are renewable resources that can be replenished naturally.',
          topic: 'Resources and Development'
        },
        {
          text: `Which tier of local self-government operates at the village level under the Panchayati Raj system in rural India?`,
          options: [
            'Gram Panchayat (headed by the Sarpanch)',
            'Municipal Corporation',
            'Zila Parishad',
            'Cantonment Board'
          ],
          correctIndex: 0,
          explanation: 'Gram Panchayat is the grassroots village-level institution of rural local self-government.',
          topic: 'Panchayati Raj & Local Government'
        },
        {
          text: `Look at the spinning wheel (Charkha) icon 🧶. Which nationwide movement was launched by Mahatma Gandhi in 1930 with the historic 240-mile Dandi March to break the British salt law?`,
          options: [
            'Civil Disobedience Movement (Salt Satyagraha)',
            'Swadeshi Movement of 1905',
            'Revolt of 1857',
            'Home Rule League'
          ],
          correctIndex: 0,
          diagramEmoji: '🧶',
          explanation: 'On 12 March 1930, Mahatma Gandhi marched from Sabarmati Ashram to Dandi to manufacture salt and launch the Civil Disobedience Movement.',
          topic: 'Nationalism in India'
        },
        {
          text: `Why is "Human Capital" (skilled, healthy, and educated citizens) considered the most valuable resource in Economics?`,
          options: [
            'Because educated and healthy people can efficiently utilize land and physical capital to create economic value and innovation',
            'Because land can work without any human effort',
            'Because education reduces productivity',
            'Because machines do not need engineers'
          ],
          correctIndex: 0,
          explanation: 'Investment in education, healthcare, and vocational training transforms population into productive Human Capital.',
          topic: 'People as Resource'
        }
      ];
    }

    if (level === 2) {
      return [
        {
          text: `Which soil type covers the largest area of the Northern Plains of India, deposited by the Indus, Ganga, and Brahmaputra river systems, and is highly fertile for wheat and paddy?`,
          options: [
            'Alluvial Soil (Khadar and Bangar)',
            'Laterite Soil',
            'Arid Sandy Soil',
            'Peaty Soil'
          ],
          correctIndex: 0,
          explanation: 'Alluvial soil is the most widespread and fertile soil of India, classified into old alluvial (Bangar) and new alluvial (Khadar).',
          topic: 'Soils of India'
        },
        {
          text: `Fill in the blank: The system of governance where power is shared among the Legislature, Executive, and Judiciary so that each organ checks the others is called _____ distribution of power.`,
          options: [
            'Horizontal (Checks and Balances)',
            'Monarchical',
            'Unitary Dictatorial',
            'Military'
          ],
          correctIndex: 0,
          explanation: 'Horizontal power-sharing places Legislature, Executive, and Judiciary at the same level to maintain a system of checks and balances.',
          topic: 'Power Sharing & Federalism'
        },
        {
          text: `True or False: The "Green Revolution" introduced in India in the late 1960s used High Yielding Variety (HYV) seeds, irrigation, and fertilizers to achieve self-sufficiency in foodgrain production.`,
          options: [
            'True',
            'False',
            'It was related to painting houses green',
            'It reduced wheat production to zero'
          ],
          correctIndex: 0,
          explanation: 'Led in India by Dr. M.S. Swaminathan, the Green Revolution dramatically increased wheat and rice yields.',
          topic: 'Food Security & Agriculture in India'
        },
        {
          text: `Match the Historical Event with its Year:`,
          options: [
            'French Revolution → 1789 | Non-Cooperation Movement → 1920 | Quit India Movement → 1942 | Indian Independence → 1947',
            'French Revolution → 1947 | Quit India → 1789',
            'All events occurred in 1857',
            'Non-Cooperation Movement → 1600'
          ],
          correctIndex: 0,
          explanation: 'The French Revolution began on 14 July 1789; Non-Cooperation in 1920; Quit India in August 1942; and Independence on 15 August 1947.',
          topic: 'World & Indian Historical Timeline'
        },
        {
          text: `Which Indian river originates from the Amarkantak Plateau in Madhya Pradesh and flows westward through a rift valley into the Arabian Sea?`,
          options: [
            'River Narmada',
            'River Mahanadi',
            'River Kaveri',
            'River Yamuna'
          ],
          correctIndex: 0,
          explanation: 'The Narmada and Tapi are the two major peninsular rivers that flow westward through rift valleys into the Arabian Sea.',
          topic: 'Drainage Systems of India'
        },
        {
          text: `Identify the INCORRECT match between a Constitutional List and its subjects in the Seventh Schedule of the Indian Constitution:`,
          options: [
            'Union List → Defence, Foreign Affairs, Currency, Banking, Railways',
            'State List → Police, Public Order, Agriculture, Local Trade',
            'Concurrent List → Education, Forests, Marriage, Trade Unions',
            'State List → Printing of National Currency Notes and International Treaties'
          ],
          correctIndex: 3,
          explanation: 'Currency, coinage, and foreign treaties belong exclusively to the Union List under the Central Government.',
          topic: 'Federal Division of Powers'
        },
        {
          text: `Complete the sentence: When more people are employed in a farm plot than are actually needed (so removing a few workers does not reduce total output), it is called _____ unemployment.`,
          options: [
            'Disguised (Hidden)',
            'Educated',
            'Cyclical',
            'Voluntary'
          ],
          correctIndex: 0,
          explanation: 'Disguised unemployment is common in rural agriculture where marginal productivity of extra family labour is zero.',
          topic: 'Employment & Unemployment Concepts'
        },
        {
          text: `Who founded the "Satyashodhak Samaj" in 1873 in Maharashtra to champion social equality and women's education alongside Savitribai Phule?`,
          options: [
            'Mahatma Jotirao Phule',
            'Lord Dalhousie',
            'Warren Hastings',
            'Robert Clive'
          ],
          correctIndex: 0,
          explanation: 'Mahatma Jotirao Phule founded the Satyashodhak Samaj in 1873 and authored "Gulamgiri" to promote social justice and universal education.',
          topic: 'Social Reform Movements in India'
        },
        {
          text: `Look at the bank icon 🏦. Which institution issues currency notes on behalf of the Central Government in India and supervises the functioning of formal sector commercial banks?`,
          options: [
            'Reserve Bank of India (RBI)',
            'World Trade Organization',
            'Gram Sabha',
            'Stock Exchange'
          ],
          correctIndex: 0,
          diagramEmoji: '🏦',
          explanation: 'The Reserve Bank of India is India’s central monetary authority, regulating bank credit, interest rates, and currency issuance.',
          topic: 'Money and Credit'
        },
        {
          text: `What is the main difference between "Tropical Evergreen Forests" and "Tropical Deciduous (Monsoon) Forests" in India?`,
          options: [
            'Evergreen forests grow in heavy rainfall areas (>200 cm) and stay green year-round, while Deciduous forests (70–200 cm rainfall) shed their leaves for 6–8 weeks in dry summer',
            'Evergreen forests grow only in dry deserts',
            'Deciduous forests never have any trees',
            'Evergreen forests receive less than 10 cm of rain'
          ],
          correctIndex: 0,
          explanation: 'Tropical Deciduous (Monsoon) forests are the most widespread forests in India (Teak, Sal), shedding leaves during dry spring/summer.',
          topic: 'Natural Vegetation and Wildlife'
        }
      ];
    }

    if (level === 3) {
      return [
        {
          text: `During the Indian National Movement, what was the main objective of the "Khilafat and Non-Cooperation Movement" (1920–22) led by Mahatma Gandhi?`,
          options: [
            'Attaining Swaraj through non-violent non-cooperation (boycott of colonial titles, foreign cloth, and British courts/schools) and Hindu-Muslim unity',
            'Supporting British colonial taxation',
            'Importing more British textiles',
            'Abolishing Indian village panchayats'
          ],
          correctIndex: 0,
          explanation: 'The Non-Cooperation Movement promoted Swadeshi, Khadi, national schools, and peaceful refusal to cooperate with colonial administration.',
          topic: 'Mass Movements in Indian Freedom Struggle'
        },
        {
          text: `Fill in the blank: In the Indian Parliamentary system, the _____ is the lower house directly elected by the people for a 5-year term and exercises supreme control over the Council of Ministers and the National Budget.`,
          options: [
            'Lok Sabha (House of the People)',
            'Rajya Sabha (Council of States)',
            'Vidhan Parishad',
            'NITI Aayog'
          ],
          correctIndex: 0,
          explanation: 'The Council of Ministers is collectively responsible to the Lok Sabha, and Money Bills can only be introduced in the Lok Sabha.',
          topic: 'Working of Institutions'
        },
        {
          text: `True or False: The "Golden Quadrilateral" Super Highway project launched by India connects the four major metropolitan cities — Delhi, Mumbai, Chennai, and Kolkata — and is implemented by the NHAI.`,
          options: [
            'True',
            'False',
            'It connects only two villages',
            'It is an underground waterway'
          ],
          correctIndex: 0,
          explanation: 'The Golden Quadrilateral is a 6-lane highway network linking Delhi, Mumbai, Chennai, and Kolkata under the National Highways Authority of India (NHAI).',
          topic: 'Lifelines of National Economy'
        },
        {
          text: `Match the Mineral Resource with its leading state/belt and industrial use in India:`,
          options: [
            'Bauxite → Aluminium ore (Odisha) | Haematite & Magnetite → Iron ore (Odisha-Jharkhand & Ballari-Chitradurga) | Mica → Electrical insulator',
            'Bauxite → Gold ore | Mica → Fuel for cars',
            'Haematite → Used to make plastic bags',
            'All minerals are liquid fuels'
          ],
          correctIndex: 0,
          explanation: 'Odisha is the largest producer of Bauxite (aluminium ore); Haematite and Magnetite are the finest iron ores; Mica has high dielectric strength for electronics.',
          topic: 'Minerals and Energy Resources'
        },
        {
          text: `In the context of European history (1848–1871), which chief minister of Prussia was the chief architect of the Unification of Germany in January 1871?`,
          options: [
            'Otto von Bismarck',
            'Giuseppe Mazzini',
            'Count Cavour',
            'Lord Byron'
          ],
          correctIndex: 0,
          explanation: 'Otto von Bismarck led the unification of Germany with the Prussian army and bureaucracy, culminating in Kaiser William I’s proclamation at Versailles in 1871.',
          topic: 'The Rise of Nationalism in Europe'
        },
        {
          text: `Identify the INCORRECT statement regarding Political Parties and the Election Commission in India:`,
          options: [
            'Every political party in India must register with the Election Commission of India',
            'A National Party must secure at least 6% of valid votes in 4 or more states in Lok Sabha/Assembly elections and win at least 4 Lok Sabha seats',
            'In a democracy, opposition parties play a vital role by questioning the government and holding it accountable',
            'India has a one-party dictatorship where opposition parties are constitutionally banned'
          ],
          correctIndex: 3,
          explanation: 'India has a vibrant multi-party democratic system where national and regional opposition parties play a constitutional role.',
          topic: 'Political Parties in Democracy'
        },
        {
          text: `Complete the Economic formula: Gross Domestic Product (GDP) of a country is the _____ value of all final goods and services produced within a country during a particular year.`,
          options: [
            'Total monetary (market) value of final goods and services (excluding intermediate goods to avoid double counting)',
            'Weight in kilograms of raw materials only',
            'Value of goods produced 100 years ago',
            'Sum of imports minus exports only'
          ],
          correctIndex: 0,
          explanation: 'GDP counts only final goods and services to avoid double-counting intermediate inputs like wheat and flour in the price of bread.',
          topic: 'GDP & National Income Accounting'
        },
        {
          text: `Under the Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) 2005, how many days of guaranteed wage employment in a year are provided to every rural household whose adult members volunteer to do unskilled manual work?`,
          options: [
            '100 days of guaranteed wage employment',
            '10 days',
            '365 days',
            '25 days'
          ],
          correctIndex: 0,
          explanation: 'MGNREGA 2005 legally guarantees 100 days of wage employment per year to rural households, enshrining the Right to Work.',
          topic: 'Poverty Alleviation & Right to Work'
        },
        {
          text: `Look at the printing press icon 🖨️. Who developed the first known mechanical movable-type printing press in Europe (Mainz, Germany) in the 1440s, revolutionizing the spread of literacy and the Protestant Reformation?`,
          options: [
            'Johann Gutenberg',
            'Marco Polo',
            'Vasco da Gama',
            'Ferdinand Magellan'
          ],
          correctIndex: 0,
          diagramEmoji: '🖨️',
          explanation: 'Johann Gutenberg perfected the movable-type printing press by 1448, printing the famous Gutenberg Bible.',
          topic: 'Print Culture and the Modern World'
        },
        {
          text: `Why are Self-Help Groups (SHGs) of 15–20 rural women important for financial inclusion in India?`,
          options: [
            'They pool regular savings and enable poor households to access bank loans without individual collateral, freeing them from high-interest informal moneylenders',
            'They charge 200% monthly interest',
            'They prohibit women from opening bank accounts',
            'They only operate in foreign stock markets'
          ],
          correctIndex: 0,
          explanation: 'SHGs overcome the problem of lack of collateral and empower rural women economically and socially.',
          topic: 'Self-Help Groups & Rural Credit'
        }
      ];
    }

    // Level 4: Expert Challenge
    return [
      {
        text: `According to the United Nations Development Programme (UNDP), which three core dimensions are combined to calculate the Human Development Index (HDI) in the Human Development Report?`,
        options: [
          'Health (Life Expectancy at birth), Education (Mean & Expected Years of Schooling), and Standard of Living (Per Capita GNI)',
          'Only military spending and gold reserves',
          'Only total population and land area',
          'Number of cars and shopping malls'
        ],
        correctIndex: 0,
        explanation: 'Unlike World Bank comparisons that use only Per Capita Income, UNDP’s HDI measures human well-being across Health, Education, and Per Capita Income.',
        topic: 'Development & Human Development Index (HDI)'
      },
      {
        text: `Fill in the blank: The 73rd and 74th Constitutional Amendment Acts of 1992 strengthened decentralization in India by reserving at least _____ of all seats and chairperson positions in local government bodies (Panchayats and Municipalities) for women.`,
        options: [
          'One-third (1/3 or 33%, extended to 50% in several states including Maharashtra)',
          'One-tenth (10%)',
          'Zero percent',
          'Five percent (5%)'
        ],
        correctIndex: 0,
        explanation: 'Constitutional recognition of the third tier of democracy mandated regular elections, State Election Commissions, and at least 1/3rd reservation for women.',
        topic: 'Decentralization in India (1992 Amendments)'
      },
      {
        text: `True or False: The "Bretton Woods Conference" of July 1944 established two key international financial institutions — the International Monetary Fund (IMF) and the World Bank (IBRD) — often called the Bretton Woods Twins.`,
        options: [
          'True',
          'False',
          'It established the IPL',
          'It was held in 1600 CE'
        ],
        correctIndex: 0,
        explanation: 'The 1944 UN Monetary and Financial Conference at Bretton Woods, New Hampshire (USA) created the IMF and the World Bank to rebuild the post-war economy.',
        topic: 'The Making of a Global World'
      },
      {
        text: `Match the Multipurpose River Valley Project in India with the River on which it is built:`,
        options: [
          'Bhakra Nangal → Sutlej | Hirakud → Mahanadi | Sardar Sarovar → Narmada | Koyna → Koyna (Krishna basin) | Nagarjuna Sagar → Krishna',
          'Bhakra Nangal → Kaveri | Hirakud → Yamuna',
          'Sardar Sarovar → Brahmaputra',
          'All dams are built on the Luni river'
        ],
        correctIndex: 0,
        explanation: 'Hirakud on the Mahanadi (Odisha) is the longest dam, Bhakra Nangal is on the Sutlej, and Sardar Sarovar is on the Narmada.',
        topic: 'Water Resources & Multipurpose Projects'
      },
      {
        text: `Under the Consumer Protection Act (COPRA), which right empowers a consumer to be informed about the ingredients, price (MRP), batch number, date of manufacture, and expiry date on packaged goods?`,
        options: [
          'Right to be Informed (Right to Information about goods and services)',
          'Right to Property',
          'Right to Pollute',
          'Right to Monopoly'
        ],
        correctIndex: 0,
        explanation: 'The Right to be Informed protects consumers against unfair trade practices and enables informed choices.',
        topic: 'Consumer Rights & Legal Awareness'
      },
      {
        text: `Identify the INCORRECT statement regarding Globalization and Multinational Corporations (MNCs):`,
        options: [
          'An MNC is a company that owns or controls production in more than one nation',
          'Foreign investment made by MNCs to buy assets such as land, buildings, and machines is called Foreign Direct Investment (FDI)',
          'Rapid improvements in Information and Communication Technology (ICT) and container shipping have accelerated globalization',
          'Trade barriers like high import tariffs are designed to make foreign imports completely tax-free and unlimited'
        ],
        correctIndex: 3,
        explanation: 'Import tariffs (taxes on imports) and quotas are trade barriers that restrict imports; removing trade barriers is called Trade Liberalization.',
        topic: 'Globalization and the Indian Economy'
      },
      {
        text: `Complete the historical reference: At the historic Congress session of December 1929 held on the banks of the River Ravi in _____, presided over by Jawaharlal Nehru, the demand for "Purna Swaraj" (Complete Independence) was formalised.`,
        options: [
          'Lahore',
          'Surat',
          'Belgaum',
          'Tripuri'
        ],
        correctIndex: 0,
        explanation: 'The December 1929 Lahore Congress passed the Purna Swaraj resolution and called for celebrating 26 January 1930 as Independence Day.',
        topic: 'Towards Civil Disobedience & Purna Swaraj'
      },
      {
        text: `Why is the Chota Nagpur Plateau region (spanning Jharkhand, northern Odisha, and western West Bengal) known as the "Storehouse of Indian Minerals" and the heartland of India's Iron and Steel Industry?`,
        options: [
          'Because of its high concentration of low-cost high-grade iron ore, coking coal (Jharia/Raniganj), manganese, limestone, and abundant labour in close proximity',
          'Because it is covered by permanent glaciers',
          'Because all raw materials are imported from Antarctica',
          'Because no railways exist there'
        ],
        correctIndex: 0,
        explanation: 'Proximity of raw materials (iron ore, coking coal, flux limestone), water, and rail connectivity makes Chota Nagpur ideal for heavy metallurgy.',
        topic: 'Manufacturing Industries & Industrial Location'
      },
      {
        text: `Look at the Earth conservation icon 🌍. In June 1992, more than 100 heads of state met in Rio de Janeiro, Brazil, for the first International Earth Summit and adopted which global action plan for achieving Sustainable Development in the 21st century?`,
        options: [
          'Agenda 21',
          'Treaty of Versailles',
          'Doctrine of Lapse',
          'Warsaw Pact'
        ],
        correctIndex: 0,
        diagramEmoji: '🌍',
        explanation: 'Agenda 21 is the declaration signed at the 1992 UNCED Earth Summit in Rio de Janeiro to combat environmental damage, poverty, and disease through global cooperation.',
        topic: 'Sustainable Development & Agenda 21'
      },
      {
        text: `Assertion (A): Power sharing is the very spirit of democracy.\nReason (R): Power sharing helps to reduce the possibility of conflict between social groups and ensures the stability of political order through legitimate citizen participation.`,
        options: [
          'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
          'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
          '(A) is true, but (R) is false.',
          '(A) is false, but (R) is true.'
        ],
        correctIndex: 0,
        explanation: 'Both prudential reasons (preventing social conflict) and moral reasons (citizen participation) make power sharing the essence of democracy.',
        topic: 'Prudential & Moral Reasons for Power Sharing'
      }
    ];
  }

  // ============================================================================
  // 26. HISTORY & CIVICS — 40 Unique Questions (10 per Level, ICSE CISCE)
  // ============================================================================
  if (subject === 'History & Civics') {
    if (level === 1) {
      return [
        {
          text: `Which port city of the Indus Valley Civilization in Gujarat is famous for its massive brick dockyard connected to the Gulf of Khambhat?`,
          options: ['Lothal', 'Kalibangan', 'Banawali', 'Ropar'],
          correctIndex: 0,
          explanation: 'Lothal in Gujarat was a major maritime trade centre of the Harappan Civilization with an engineered tidal dockyard.',
          topic: 'The Harappan Civilization'
        },
        {
          text: `Fill in the blank: The oldest of the four Vedas, composed in early Vedic Sanskrit and containing 1,028 hymns (Suktas) including the Gayatri Mantra, is the _____.`,
          options: ['Rigveda', 'Samaveda', 'Yajurveda', 'Atharvaveda'],
          correctIndex: 0,
          explanation: 'The Rigveda is the earliest Vedic text, divided into 10 Mandalas.',
          topic: 'The Vedic Period'
        },
        {
          text: `True or False: Gautama Buddha delivered his first sermon at the Deer Park in Sarnath, an event known in Buddhist tradition as "Dharmachakrapravartana" (Turning of the Wheel of Law).`,
          options: ['True', 'False', 'It was delivered in Rome', 'It was a military battle'],
          correctIndex: 0,
          explanation: 'After attaining enlightenment at Bodh Gaya, Lord Buddha preached the Four Noble Truths and the Eightfold Path at Sarnath.',
          topic: 'Jainism and Buddhism'
        },
        {
          text: `Match the Mauryan Historical Source with its Author / Feature:`,
          options: [
            'Arthashastra → Chanakya (Kautilya) | Indica → Megasthenes | Rock & Pillar Edicts → Emperor Ashoka',
            'Arthashastra → Megasthenes | Indica → Kalidasa',
            'Rock Edicts → Written in English',
            'All three were written in the 20th century'
          ],
          correctIndex: 0,
          explanation: 'Kautilya’s Arthashastra, Megasthenes’ Indica, and Ashoka’s archaeological edicts are the primary sources for the Mauryan Empire.',
          topic: 'The Mauryan Empire'
        },
        {
          text: `In Civics, on which date did the Constituent Assembly formally adopt the Constitution of India, and on which date did it come into force as Republic Day?`,
          options: [
            'Adopted on 26 November 1949; Came into force on 26 January 1950',
            'Adopted on 15 August 1947; Came into force on 15 August 1947',
            'Adopted on 2 October 1950; Came into force on 1 January 1952',
            'Adopted on 26 January 1930; Came into force on 26 November 1935'
          ],
          correctIndex: 0,
          explanation: 'The Constitution was adopted on 26 November 1949 (Constitution Day) and enforced on 26 January 1950 to honour the 1930 Purna Swaraj date.',
          topic: 'Our Constitution & Salient Features'
        },
        {
          text: `Identify the INCORRECT statement regarding Fundamental Rights in Part III of the Indian Constitution:`,
          options: [
            'Right to Equality (Articles 14–18) abolishes untouchability and titles',
            'Right to Freedom (Articles 19–22) guarantees freedom of speech and expression',
            'Right to Constitutional Remedies (Article 32) allows citizens to approach the Supreme Court for enforcement of rights',
            'Fundamental Rights cannot be enforced by any court of law in India'
          ],
          correctIndex: 3,
          explanation: 'Fundamental Rights are justiciable — enforceable by the Supreme Court (Article 32) and High Courts (Article 226).',
          topic: 'Fundamental Rights & Duties'
        },
        {
          text: `Complete the sentence: The Gupta Period (4th–6th century CE) is celebrated as the "Golden Age of Ancient India", during which the great mathematician and astronomer _____ calculated the value of pi (π ≈ 3.1416) and explained that the Earth rotates on its axis.`,
          options: ['Aryabhata', 'Charaka', 'Sushruta', 'Banabhatta'],
          correctIndex: 0,
          explanation: 'Aryabhata authored the "Aryabhatiya", explaining solar and lunar eclipses scientifically and Earth’s axial rotation.',
          topic: 'The Golden Age of the Guptas'
        },
        {
          text: `Which grand Chola temple at Thanjavur (Tanjore), built by Emperor Rajaraja Chola I in 1010 CE, is a masterpiece of Dravidian temple architecture and a UNESCO World Heritage Site?`,
          options: [
            'Brihadeeswarar (Rajarajeshwara) Temple',
            'Konark Sun Temple',
            'Khajuraho Kandariya Mahadeva Temple',
            'Meenakshi Amman Temple'
          ],
          correctIndex: 0,
          explanation: 'The Brihadeeswarar Temple at Thanjavur showcases Chola architectural brilliance with its towering 216-foot Vimana.',
          topic: 'The Sangam Age & Medieval Cholas'
        },
        {
          text: `Look at the fort icon 🏰. Which visionary ruler was crowned Chhatrapati at Raigad Fort in June 1674, establishing "Hindavi Swarajya" and an efficient council of eight ministers called the "Ashtapradhan Mandal"?`,
          options: [
            'Chhatrapati Shivaji Maharaj',
            'Sher Shah Suri',
            'Iltutmish',
            'Krishnadevaraya'
          ],
          correctIndex: 0,
          diagramEmoji: '🏰',
          explanation: 'Chhatrapati Shivaji Maharaj founded Swarajya based on benevolent welfare administration, fort defence, a strong navy, and the Ashtapradhan council.',
          topic: 'Rise of the Marathas & Swarajya'
        },
        {
          text: `In Civics, what is meant by a "Single Citizenship" feature of the Indian Constitution?`,
          options: [
            'Every Indian is a citizen of India as a whole, enjoying equal rights across all states, rather than having separate state and national citizenships',
            'Only one person in a family can be a citizen',
            'Citizenship expires every year',
            'Only residents of the capital city are citizens'
          ],
          correctIndex: 0,
          explanation: 'Unlike the USA (which has dual federal and state citizenship), India provides Single Citizenship to foster national unity and fraternity.',
          topic: 'Salient Features of the Constitution'
        }
      ];
    }

    if (level === 2) {
      return [
        {
          text: `Which ruler of the Tughlaq dynasty is remembered in medieval history for shifting his capital from Delhi to Daulatabad (Devagiri in Maharashtra) and introducing token copper/brass currency?`,
          options: [
            'Muhammad bin Tughlaq',
            'Qutbuddin Aibak',
            'Balban',
            'Ibrahim Lodi'
          ],
          correctIndex: 0,
          explanation: 'Muhammad bin Tughlaq undertook ambitious but poorly executed experiments including the transfer of capital to Daulatabad and token currency.',
          topic: 'The Delhi Sultanate'
        },
        {
          text: `Fill in the blank: In the Mughal administrative system introduced under Emperor Akbar by Raja Todar Mal, the land revenue system based on careful measurement of land and average 10-year crop yields was called the _____ system.`,
          options: [
            'Zabt / Dahsala (Bandobast)',
            'Ryotwari',
            'Permanent Settlement',
            'Iqta'
          ],
          correctIndex: 0,
          explanation: 'Raja Todar Mal’s Dahsala (Zabt) system measured land using bamboo reeds joined with iron rings (jarib) and fixed revenue based on 10-year average produce.',
          topic: 'The Mughal Empire & Administration'
        },
        {
          text: `True or False: Directive Principles of State Policy (Part IV, Articles 36–51 of the Indian Constitution) are guidelines for the government to establish a Welfare State, and though fundamental in governance, they are non-justiciable in courts.`,
          options: [
            'True',
            'False',
            'They are criminal laws for tourists',
            'They were deleted in 1951'
          ],
          correctIndex: 0,
          explanation: 'Inspired by the Irish Constitution, Directive Principles guide the State toward social and economic democracy and a Welfare State.',
          topic: 'Directive Principles of State Policy'
        },
        {
          text: `Match the Bhakti / Sufi Saint with their Contribution:`,
          options: [
            'Sant Dnyaneshwar → Bhavartha Dipika (Dnyaneshwari) | Guru Nanak Dev Ji → Founded Sikhism | Sant Kabir → Dohas (Bijak) | Khwaja Moinuddin Chishti → Chishti Silsila at Ajmer',
            'Sant Kabir → Wrote Arthashastra',
            'Guru Nanak Dev Ji → Built Qutub Minar',
            'All saints lived in ancient Greece'
          ],
          correctIndex: 0,
          explanation: 'The Bhakti and Sufi movements promoted devotion, human brotherhood, equality, and vernacular literature across India.',
          topic: 'Composite Culture – Bhakti & Sufi Movements'
        },
        {
          text: `What was the immediate cause of the First War of Independence (Revolt of 1857)?`,
          options: [
            'The introduction of the New Enfield Rifle whose greased cartridges had to be bitten off before loading, offending the religious beliefs of both Hindu and Muslim sepoys',
            'The Partition of Bengal in 1905',
            'The arrival of the Simon Commission',
            'The passing of the Rowlatt Act'
          ],
          correctIndex: 0,
          explanation: 'While political (Doctrine of Lapse) and economic grievances built up over decades, the greased cartridges of the Enfield rifle triggered the uprising at Barrackpore and Meerut in 1857.',
          topic: 'The First War of Independence, 1857'
        },
        {
          text: `Identify the INCORRECT statement regarding the Union Parliament of India (Lok Sabha and Rajya Sabha):`,
          options: [
            'The maximum strength of the Lok Sabha previsto by the Constitution is 550 members',
            'The Vice-President of India is the ex-officio Chairman of the Rajya Sabha',
            'The Speaker presides over the sittings of the Lok Sabha and maintains parliamentary decorum',
            'The minimum age to become a member of the Rajya Sabha is 18 years'
          ],
          correctIndex: 3,
          explanation: 'The minimum age for membership is 25 years for the Lok Sabha and 30 years for the Rajya Sabha (18 years is the minimum voting age).',
          topic: 'The Union Legislature – Parliament'
        },
        {
          text: `Complete the sentence: The Indian National Congress (INC) was founded in December 1885 at Gokuldas Tejpal Sanskrit College in Mumbai by retired civil servant A.O. Hume, and its first session was presided over by _____.`,
          options: [
            'Womesh Chandra Bonnerjee (W.C. Bonnerjee)',
            'Lord Curzon',
            'Clement Attlee',
            'Louis Mountbatten'
          ],
          correctIndex: 0,
          explanation: 'W.C. Bonnerjee presided over the first session of the Indian National Congress in Mumbai in December 1885, attended by 72 delegates.',
          topic: 'Growth of Nationalism & Foundation of INC'
        },
        {
          text: `In Civics, what is the "Quorum" required to hold a valid sitting of either House of the Indian Parliament (Lok Sabha or Rajya Sabha)?`,
          options: [
            'One-tenth (1/10th or 10%) of the total membership of the House, including the presiding officer',
            'Only 2 members',
            '100% of all members every day',
            'Half (50%) of the total population of India'
          ],
          correctIndex: 0,
          explanation: 'Under Article 100(3), the quorum to constitute a meeting of either House of Parliament is one-tenth of the total number of members of the House.',
          topic: 'Parliamentary Procedures – Quorum & Question Hour'
        },
        {
          text: `Look at the Renaissance art icon 🎨. Which 15th–16th century Italian Renaissance polymath painted two of the world's most iconic masterpieces, "The Mona Lisa" and "The Last Supper"?`,
          options: [
            'Leonardo da Vinci',
            'William Shakespeare',
            'Nicolaus Copernicus',
            'Martin Luther'
          ],
          correctIndex: 0,
          diagramEmoji: '🎨',
          explanation: 'Leonardo da Vinci was a quintessential Renaissance genius — painter, sculptor, anatomist, and inventor.',
          topic: 'Modern Age in Europe – Renaissance'
        },
        {
          text: `How did Lord Dalhousie's "Doctrine of Lapse" cause widespread resentment among Indian rulers prior to 1857?`,
          options: [
            'It declared that if an Indian ruler of a dependent state died without a natural male heir, the kingdom would lapse and be annexed by the British East India Company (e.g., Satara, Jhansi, Nagpur)',
            'It gave free gold to every Indian kingdom',
            'It abolished all British taxes on Indian farmers',
            'It returned all forts to Indian kings'
          ],
          correctIndex: 0,
          explanation: 'Under the Doctrine of Lapse, states like Satara (1848), Jaitpur, Sambalpur, Udaipur, Nagpur, and Jhansi were annexed by denying adopted sons the right to succeed.',
          topic: 'Political Causes of the Revolt of 1857'
        }
      ];
    }

    if (level === 3) {
      return [
        {
          text: `Who were the "Lal-Bal-Pal" trio of the Assertive (Early 20th Century Nationalist) phase of the Indian Freedom Struggle, and what were the four pillars of their programme?`,
          options: [
            'Lala Lajpat Rai, Bal Gangadhar Tilak, and Bipin Chandra Pal — advocating Swadeshi, Boycott, National Education, and Passive Resistance for Swaraj',
            'Only writing petitions to the British Queen',
            'Supporting the Partition of Bengal in 1905',
            'Serving in the British Cabinet'
          ],
          correctIndex: 0,
          explanation: 'Lal-Bal-Pal transformed the nationalist movement into a mass struggle; Tilak proclaimed "Swaraj is my birthright and I shall have it!"',
          topic: 'First & Second Phases of the Indian National Movement'
        },
        {
          text: `Fill in the blank: Under Article 110 of the Constitution, a Money Bill can ONLY be introduced in the Lok Sabha, and once passed by the Lok Sabha, the Rajya Sabha must return it within _____ days with or without recommendations.`,
          options: ['14 days', '90 days', '365 days', '2 days'],
          correctIndex: 0,
          explanation: 'The Rajya Sabha cannot reject or amend a Money Bill; it can only make recommendations within 14 days.',
          topic: 'Exclusive Financial Powers of Lok Sabha'
        },
        {
          text: `True or False: The President of India is elected indirectly by an Electoral College consisting of the elected members of both Houses of Parliament (MPs) and the elected members of the Legislative Assemblies of the States and Union Territories (MLAs).`,
          options: [
            'True',
            'False',
            'Nominated members also vote in the Presidential election',
            'The President is appointed by the Chief Justice'
          ],
          correctIndex: 0,
          explanation: 'Under Article 54, only ELECTED members of Parliament and State/UT Legislative Assemblies form the Presidential Electoral College.',
          topic: 'The Union Executive – The President of India'
        },
        {
          text: `Match the Writ issued by the Supreme Court / High Court with its Constitutional Meaning:`,
          options: [
            'Habeas Corpus → "To have the body" (release from unlawful detention) | Mandamus → "We command" (perform public duty) | Quo Warranto → "By what authority?"',
            'Habeas Corpus → Arrest everyone | Mandamus → Close all schools',
            'Quo Warranto → Collect income tax',
            'Writs can be issued by any private shopkeeper'
          ],
          correctIndex: 0,
          explanation: 'The five prerogative writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto) protect citizens’ Fundamental Rights.',
          topic: 'The Judiciary – Writs & Judicial Review'
        },
        {
          text: `In 1939, Netaji Subhas Chandra Bose founded which party within the Congress, and later led which heroic military force with the war cry "Chalo Dilli" and "Give me blood, and I shall give you freedom"?`,
          options: [
            'Founded the Forward Bloc (1939) and led the Azad Hind Fauj (Indian National Army / INA)',
            'Founded the East India Company',
            'Led the Cabinet Mission',
            'Founded the Muslim League in 1906'
          ],
          correctIndex: 0,
          explanation: 'Netaji Subhas Chandra Bose established the Forward Bloc in 1939 and reorganized the Azad Hind Fauj (INA) and Provisional Government of Free India in 1943.',
          topic: 'Forward Bloc and the INA'
        },
        {
          text: `Identify the INCORRECT statement regarding the Prime Minister and the Union Council of Ministers:`,
          options: [
            'The President appoints the leader of the majority party/coalition in the Lok Sabha as the Prime Minister',
            'The Prime Minister is the principal link (channel of communication) between the President and the Cabinet',
            'The Council of Ministers is collectively responsible to the Lok Sabha; if a No-Confidence Motion passes against one minister, the entire Ministry must resign',
            'Cabinet Ministers are not required to be members of either House of Parliament even after 5 years'
          ],
          correctIndex: 3,
          explanation: 'A non-member appointed as a Minister must become a member of either House of Parliament within 6 months, or cease to be a Minister.',
          topic: 'Prime Minister & Collective Responsibility'
        },
        {
          text: `Complete the historical event: The immediate spark that triggered the First World War on 28 June 1914 was the assassination of Archduke Franz Ferdinand (heir to the Austro-Hungarian throne) at _____, Bosnia.`,
          options: [
            'Sarajevo',
            'Waterloo',
            'Pearl Harbor',
            'Normandy'
          ],
          correctIndex: 0,
          explanation: 'The Sarajevo assassination triggered the web of rival European alliances (Triple Entente vs Triple Alliance), starting WWI (1914–1918).',
          topic: 'The First World War (1914–1918)'
        },
        {
          text: `What is meant by the Supreme Court of India being a "Court of Record" under Article 129 of the Constitution?`,
          options: [
            'Its judgments and proceedings are preserved as permanent testimony for legal precedent (binding on all lower courts) and it has the power to punish for contempt of court',
            'It records musical songs',
            'It only keeps land revenue passbooks',
            'Its judgments cannot be read by lawyers'
          ],
          correctIndex: 0,
          explanation: 'As a Court of Record, Supreme Court decisions have evidentiary value and serve as binding legal precedents nationwide.',
          topic: 'The Supreme Court – Jurisdiction & Court of Record'
        },
        {
          text: `Look at the peace dove / UN icon 🕊️. Which principal organ of the United Nations consists of 15 members (5 Permanent members with Veto Power — USA, UK, France, Russia, China — and 10 non-permanent members elected for 2-year terms) and has primary responsibility for international peace and security?`,
          options: [
            'The UN Security Council (UNSC)',
            'The Trusteeship Council',
            'UNICEF',
            'Universal Postal Union'
          ],
          correctIndex: 0,
          diagramEmoji: '🕊️',
          explanation: 'The UN Security Council is the executive enforcement wing of the UN responsible for maintaining international peace and security.',
          topic: 'The United Nations – Major Organs'
        },
        {
          text: `Under the Indian Independence Act of July 1947 (based on the Mountbatten Plan), who became the first Governor-General of independent India, and who was the first Indian Governor-General?`,
          options: [
            'Lord Mountbatten was the first Governor-General of independent India, followed by Chakravarti Rajagopalachari (C. Rajagopalachari) as the first and last Indian Governor-General',
            'Lord Curzon and Warren Hastings',
            'Clement Attlee and Winston Churchill',
            'Lord Wavell and Lord Linlithgow'
          ],
          correctIndex: 0,
          explanation: 'Lord Mountbatten served from August 1947 to June 1948, and C. Rajagopalachari served until India became a Republic on 26 January 1950.',
          topic: 'Independence and Partition of India (1947)'
        }
      ];
    }

    // Level 4: Expert Challenge
    return [
      {
        text: `Distinguish between the "Original Jurisdiction", "Appellate Jurisdiction", and "Advisory Jurisdiction" of the Supreme Court of India:`,
        options: [
          'Original (Art. 131): Disputes between Union & States; Appellate (Art. 132–134): Appeals from High Courts; Advisory (Art. 143): Legal opinion sought by the President of India',
          'Original: Traffic fines; Appellate: Village disputes only',
          'Advisory: The Supreme Court advises foreign prime ministers',
          'The Supreme Court has no Original Jurisdiction'
        ],
        correctIndex: 0,
        explanation: 'The Supreme Court exercises Original jurisdiction in federal disputes, Appellate jurisdiction as the final court of appeal, and Advisory jurisdiction under Article 143.',
        topic: 'Jurisdictions of the Supreme Court'
      },
      {
        text: `Fill in the blank: The Non-Aligned Movement (NAM), founded at the Belgrade Summit in 1961 after the 1955 Bandung Conference, was pioneered by which three world leaders (the Founding Fathers of NAM)?`,
        options: [
          'Pandit Jawaharlal Nehru (India), President Josip Broz Tito (Yugoslavia), and President Gamal Abdel Nasser (Egypt)',
          'Franklin Roosevelt, Winston Churchill, and Joseph Stalin',
          'Benito Mussolini, Adolf Hitler, and Hirohito',
          'Woodrow Wilson, Lloyd George, and Clemenceau'
        ],
        correctIndex: 0,
        explanation: 'Nehru, Tito, and Nasser (along with Sukarno of Indonesia and Nkrumah of Ghana) championed Non-Alignment and Panchsheel during the Cold War.',
        topic: 'Non-Aligned Movement (NAM) & Panchsheel'
      },
      {
        text: `True or False: A "Lok Adalat" (People's Court), granted statutory status under the Legal Services Authorities Act, 1987, settles disputes speedily through compromise and mutual consent with NO court fee, and its award is final and binding like a civil court decree.`,
        options: [
          'True',
          'False',
          'Lok Adalats charge ₹1 lakh fee per hearing',
          'Lok Adalats only try murder cases'
        ],
        correctIndex: 0,
        explanation: 'Lok Adalats provide speedy, inexpensive justice through conciliation, reducing the backlog of regular courts.',
        topic: 'Subordinate Courts & Lok Adalats'
      },
      {
        text: `Match the Specialized UN Agency with its Headquarters and Mandate:`,
        options: [
          'UNESCO (Paris) → Education, Science & Culture | WHO (Geneva) → Global Public Health | UNICEF (New York) → Children’s Welfare | ICJ (The Hague) → World Court',
          'WHO (New York) → Space Travel | UNESCO (London) → Military Weapons',
          'ICJ (Tokyo) → Banking Loans',
          'UNICEF (Rome) → Oil Drilling'
        ],
        correctIndex: 0,
        explanation: 'WHO is in Geneva, UNESCO in Paris, UNICEF in New York, and the International Court of Justice (15 judges for 9-year terms) at The Hague, Netherlands.',
        topic: 'Major Agencies of the United Nations'
      },
      {
        text: `Under Articles 352, 356, and 360 of the Indian Constitution, what are the three types of Emergencies that the President of India can proclaim on the written advice of the Union Cabinet?`,
        options: [
          'National Emergency (Art. 352: War, External Aggression, or Armed Rebellion), President’s Rule / Constitutional Emergency in a State (Art. 356), and Financial Emergency (Art. 360)',
          'Weather Emergency, Sports Emergency, and Exam Emergency',
          'Municipal Emergency, Traffic Emergency, and Railway Emergency',
          'Only one type of emergency exists'
        ],
        correctIndex: 0,
        explanation: 'Part XVIII of the Constitution provides for National Emergency (Art. 352), State Constitutional Emergency (Art. 356), and Financial Emergency (Art. 360).',
        topic: 'Emergency Powers of the President'
      },
      {
        text: `Identify the INCORRECT statement regarding the Treaty of Versailles (June 1919) and its impact on inter-war Europe:`,
        options: [
          'Article 231 (the War Guilt Clause) declared Germany guilty of aggression and imposed heavy war reparations of 33 billion dollars',
          'Alsace-Lorraine was returned to France and the Saar coal basin was placed under League of Nations administration for 15 years',
          'The League of Nations was established in 1920 to promote collective security and prevent future wars',
          'The Treaty of Versailles rewarded Germany with control over all British and French colonies'
        ],
        correctIndex: 3,
        explanation: 'Under the Treaty of Versailles, Germany lost all its overseas colonies and suffered harsh territorial and military restrictions, which later fuelled resentment in inter-war Germany.',
        topic: 'Treaty of Versailles & Rise of Dictatorships'
      },
      {
        text: `Complete the parliamentary term: An _____ Motion is moved in the Lok Sabha to interrupt normal business and draw urgent attention to a definite matter of urgent public importance (such as a major railway accident or natural calamity).`,
        options: [
          'Adjournment',
          'Coronation',
          'Graduation',
          'Prorogation'
        ],
        correctIndex: 0,
        explanation: 'An Adjournment Motion sets aside scheduled parliamentary business to debate a definite matter of urgent public importance.',
        topic: 'Parliamentary Motions (Adjournment & No-Confidence)'
      },
      {
        text: `Why did Mahatma Gandhi withdraw the Non-Cooperation Movement in February 1922?`,
        options: [
          'Because an angry crowd set fire to a police station at Chauri Chaura in Gorakhpur (UP), violating the strict principle of Ahimsa (non-violence)',
          'Because the British granted Complete Independence in 1922',
          'Because World War II started in 1922',
          'Because the Cabinet Mission arrived in 1922'
        ],
        correctIndex: 0,
        explanation: 'Committed to Satyagraha and non-violence, Gandhiji called off the Non-Cooperation Movement after the violent Chauri Chaura incident on 5 February 1922.',
        topic: 'Gandhian Satyagraha & Chauri Chaura (1922)'
      },
      {
        text: `Look at the judicial gavel icon ⚖️. What is the "Power of Judicial Review" exercised by the Supreme Court and High Courts in India?`,
        options: [
          'The constitutional power to examine the validity of legislative laws and executive orders, and declare them null and void (unconstitutional) if they violate Fundamental Rights or the basic structure of the Constitution',
          'Reviewing school examination papers',
          'Writing newspaper book reviews',
          'Appointing the Prime Minister directly'
        ],
        correctIndex: 0,
        diagramEmoji: '⚖️',
        explanation: 'Judicial Review ensures the supremacy of the Constitution and protects citizens’ Fundamental Rights from legislative or executive overreach.',
        topic: 'Independence of Judiciary & Judicial Review'
      },
      {
        text: `Assertion (A): The Cabinet Mission Plan (1946) proposed a three-tier federal union of British Indian provinces and Princely States and set up the Constituent Assembly of India.\nReason (R): The Cabinet Mission rejected the demand for a separate sovereign Pakistan to preserve the administrative and defence unity of India, though Partition later occurred under the Mountbatten Plan of June 1947.`,
        options: [
          'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
          'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
          '(A) is true, but (R) is false.',
          '(A) is false, but (R) is true.'
        ],
        correctIndex: 0,
        explanation: 'The 1946 Cabinet Mission (Pethick-Lawrence, Stafford Cripps, A.V. Alexander) sought a united federal India and initiated elections to the Constituent Assembly.',
        topic: 'Cabinet Mission Plan (1946) & Constituent Assembly'
      }
    ];
  }

  // ============================================================================
  // 27. COMPUTER STUDIES — 40 Unique Questions (10 per Level, Calibrated by Class c)
  // ============================================================================
  if (subject === 'Computer Studies') {
    // Primary Classes 1 to 5: Age-appropriate Computer Fundamentals, IPO Cycle, Paint, WordPad, Files, Scratch
    if (c <= 5) {
      if (level === 1) {
        return [
          {
            text: `Which main part of a desktop computer looks like a television screen and displays pictures, text, and videos?`,
            options: ['Monitor (VDU)', 'Keyboard', 'CPU Cabinet', 'UPS'],
            correctIndex: 0,
            explanation: 'The Monitor (Visual Display Unit) is the primary output screen of a computer.',
            topic: 'Main Parts of a Computer'
          },
          {
            text: `Fill in the blank: The _____ is known as the "Brain of the Computer" because it processes all instructions and calculations.`,
            options: ['CPU (Central Processing Unit)', 'Mouse Pad', 'Speaker', 'Printer'],
            correctIndex: 0,
            explanation: 'The Central Processing Unit (CPU) performs arithmetic, logic, and control operations.',
            topic: 'CPU – The Brain of the Computer'
          },
          {
            text: `True or False: A Computer Mouse is a hand-held pointing input device used to point, click, drag, and select items on the monitor screen.`,
            options: ['True', 'False', 'It prints paper', 'It plays loud music'],
            correctIndex: 0,
            explanation: 'A mouse controls the pointer (cursor) on the screen and is a primary pointing input device.',
            topic: 'Using the Computer Mouse'
          },
          {
            text: `Match the Keyboard Key with its Action:`,
            options: [
              'Spacebar → Longest key (adds space between words) | Enter Key → Moves cursor to next line | Backspace → Erases letter to the left',
              'Spacebar → Shuts down computer | Enter Key → Deletes all files',
              'Backspace → Prints a photo',
              'All keys do the exact same thing'
            ],
            correctIndex: 0,
            explanation: 'The Spacebar inserts spaces, Enter starts a new line or executes a command, and Backspace erases characters to the left of the cursor.',
            topic: 'Keyboard Keys & Functions'
          },
          {
            text: `In the IPO Cycle of a computer, what do the letters I – P – O stand for?`,
            options: [
              'Input → Process → Output',
              'Internet → Paint → Office',
              'Ink → Paper → Open',
              'Inside → Power → Outside'
            ],
            correctIndex: 0,
            explanation: 'Every computer works on the Input-Process-Output (IPO) cycle: taking data as Input, processing it in the CPU, and showing the Output.',
            topic: 'IPO (Input-Process-Output) Cycle'
          },
          {
            text: `Identify the device that is an OUTPUT device (gives results out from the computer):`,
            options: [
              'Printer (prints text and pictures on paper)',
              'Keyboard',
              'Mouse',
              'Microphone'
            ],
            correctIndex: 0,
            explanation: 'A printer is an output device that produces a hard copy on paper; keyboard, mouse, and microphone are input devices.',
            topic: 'Input and Output Devices'
          },
          {
            text: `Complete the sentence: Before leaving the computer lab, we should always _____ the computer properly through the Start Menu instead of pulling the electric plug directly.`,
            options: ['Shut Down', 'Drop', 'Wash with water', 'Shake'],
            correctIndex: 0,
            explanation: 'Properly shutting down allows the operating system to close programs safely without losing data.',
            topic: 'Safe Computer Lab Etiquette'
          },
          {
            text: `How many Alphabet Keys (A to Z) are present on a standard computer keyboard?`,
            options: ['26 Alphabet Keys', '10 Alphabet Keys', '50 Alphabet Keys', '12 Alphabet Keys'],
            correctIndex: 0,
            explanation: 'Just like the English alphabet, a standard QWERTY keyboard has 26 alphabet keys from A to Z.',
            topic: 'Alphabet & Number Keys'
          },
          {
            text: `Look at the paintbrush icon 🎨. In MS Paint / Tux Paint, which tool is used to fill an entire closed shape with a chosen colour in a single click?`,
            options: [
              'Fill with Color (Paint Bucket) Tool',
              'Eraser Tool',
              'Magnifier Tool',
              'Text Tool'
            ],
            correctIndex: 0,
            diagramEmoji: '🎨',
            explanation: 'The "Fill with Color" (bucket) tool fills any completely enclosed shape with the selected foreground colour.',
            topic: 'Drawing in MS Paint'
          },
          {
            text: `Which device keeps the computer running for a short time when the main electricity suddenly goes off, allowing you to save your work safely?`,
            options: [
              'UPS (Uninterruptible Power Supply)',
              'Joystick',
              'Scanner',
              'Web Camera'
            ],
            correctIndex: 0,
            explanation: 'A UPS contains a backup battery that provides emergency power during a power cut.',
            topic: 'Computer Hardware Accessories'
          }
        ];
      }

      if (level === 2) {
        return [
          {
            text: `What is the main difference between Computer "Hardware" and Computer "Software"?`,
            options: [
              'Hardware refers to physical parts we can see and touch (like Monitor, Keyboard), while Software refers to programs and instructions that tell hardware what to do',
              'Hardware is invisible and Software is made of iron',
              'Both mean the wooden computer table',
              'Software can be cleaned with a cloth'
            ],
            correctIndex: 0,
            explanation: 'Physical electronic components are Hardware, while operating systems and apps (like MS Paint, WordPad, Scratch) are Software.',
            topic: 'Hardware and Software'
          },
          {
            text: `Fill in the blank: When you turn on a Windows computer, the first main screen that appears with small picture icons and a Taskbar at the bottom is called the _____.`,
            options: ['Desktop', 'Printer Tray', 'Motherboard', 'Scanner Glass'],
            correctIndex: 0,
            explanation: 'The Windows Desktop is the primary workspace displaying application icons, wallpaper, and the Taskbar.',
            topic: 'Working with Windows Desktop'
          },
          {
            text: `True or False: When the "Caps Lock" key is switched ON, all alphabet letters typed on the keyboard appear in CAPITAL (UPPERCASE) letters.`,
            options: ['True', 'False', 'It erases the screen', 'It types only numbers'],
            correctIndex: 0,
            explanation: 'Caps Lock toggles capital letters ON so you can type uppercase text without holding Down the Shift key.',
            topic: 'Special Keyboard Keys'
          },
          {
            text: `Match the Storage Device with its Description:`,
            options: [
              'Hard Disk / SSD → Main internal storage inside the computer | Pen Drive (USB Flash Drive) → Small portable pocket storage device',
              'Pen Drive → Weighs 50 kilograms | Hard Disk → Used to print paper',
              'Mouse → Stores 1,000 movies',
              'Keyboard → Permanent storage disk'
            ],
            correctIndex: 0,
            explanation: 'The internal Hard Disk/SSD stores the OS and files permanently, while a USB Pen Drive is used to carry files easily.',
            topic: 'Computer Storage Devices'
          },
          {
            text: `In a Word Processor (like WordPad or MS Word), which keyboard shortcut is used to SAVE your document?`,
            options: ['Ctrl + S', 'Ctrl + P', 'Ctrl + Z', 'Alt + F4'],
            correctIndex: 0,
            explanation: 'Ctrl + S saves the current file, Ctrl + P prints it, and Ctrl + Z undoes the last action.',
            topic: 'Word Processing & Shortcuts'
          },
          {
            text: `Identify the INCORRECT statement about Computer Files and Folders:`,
            options: [
              'A File is a collection of saved work such as a drawing, story, or photo',
              'A Folder is like a digital organizer cabinet used to store and group related files neatly',
              'A Folder can also contain other sub-folders inside it',
              'You can never save more than one file on a computer'
            ],
            correctIndex: 3,
            explanation: 'A computer can store thousands of files organized neatly inside folders and sub-folders.',
            topic: 'Files and Folders Organization'
          },
          {
            text: `Complete the sentence: A portable personal computer that has a built-in screen, keyboard, touchpad, and rechargeable battery so it can be carried in a bag is called a _____.`,
            options: ['Laptop Computer', 'Supercomputer', 'Mainframe Tower', 'Plotter'],
            correctIndex: 0,
            explanation: 'A laptop is a compact, battery-powered portable computer suitable for study and travel.',
            topic: 'Types of Computers'
          },
          {
            text: `In MS Word / WordPad, what happens when you select a heading and click the [ B ], [ I ], and [ U ] buttons on the ribbon?`,
            options: [
              'The text becomes Bold (thick), Italic (slanted), and Underlined',
              'The text is deleted permanently',
              'The computer turns off',
              'The text turns into an audio file'
            ],
            correctIndex: 0,
            explanation: 'B stands for Bold, I for Italic, and U for Underline in text formatting.',
            topic: 'Text Formatting (Bold, Italic, Underline)'
          },
          {
            text: `Look at the cat sprite icon 🐱. In the "Scratch" block-based visual programming environment for kids, what do we call the characters or objects that perform actions on the Stage?`,
            options: ['Sprites', 'Cables', 'Folders', 'Printers'],
            correctIndex: 0,
            diagramEmoji: '🐱',
            explanation: 'In Scratch, interactive characters on the Stage (like the default orange Cat) are called Sprites, controlled by snapping code blocks together.',
            topic: 'Introduction to Scratch Programming'
          },
          {
            text: `Why do we use a "Step-by-Step" sequence (Stepwise Thinking / Algorithm) when solving a problem or making a recipe?`,
            options: [
              'Because following clear steps in the right logical order ensures the task is completed accurately without confusion',
              'Because doing the last step first works better',
              'Because computers only guess randomly',
              'To make the task impossible to finish'
            ],
            correctIndex: 0,
            explanation: 'An algorithm is a logical step-by-step procedure for solving a problem or completing a task.',
            topic: 'Stepwise Thinking & Logical Sequences'
          }
        ];
      }

      if (level === 3) {
        return [
          {
            text: `Inside the CPU (Central Processing Unit), which unit is responsible for performing all addition, subtraction, multiplication, division, and logical comparisons?`,
            options: [
              'ALU (Arithmetic Logic Unit)',
              'Power Supply Fan',
              'Monitor Stand',
              'CD-ROM Tray'
            ],
            correctIndex: 0,
            explanation: 'The CPU consists of the ALU (Arithmetic Logic Unit), CU (Control Unit), and Registers/Memory Unit.',
            topic: 'Inside the CPU – ALU & CU'
          },
          {
            text: `Fill in the blank: Deleted files and folders on a Windows desktop are temporarily sent to the _____, from where they can be restored if deleted by mistake.`,
            options: ['Recycle Bin', 'Control Panel', 'Calculator', 'Paint Palette'],
            correctIndex: 0,
            explanation: 'The Recycle Bin holds deleted files until you either Restore them or Empty the Recycle Bin.',
            topic: 'Managing Files & Recycle Bin'
          },
          {
            text: `True or False: RAM (Random Access Memory) is called "Volatile (Temporary) Memory" because its data is erased as soon as the computer power is switched off.`,
            options: ['True', 'False', 'RAM keeps data for 100 years without power', 'RAM is a paper notebook'],
            correctIndex: 0,
            explanation: 'RAM is high-speed temporary working memory, whereas ROM and Hard Disk/SSD are non-volatile permanent storage.',
            topic: 'Primary Memory – RAM vs ROM'
          },
          {
            text: `Match the Keyboard Shortcut with its Action while editing a document:`,
            options: [
              'Ctrl + C → Copy | Ctrl + X → Cut | Ctrl + V → Paste | Ctrl + Z → Undo',
              'Ctrl + C → Close computer | Ctrl + V → Volume mute',
              'Ctrl + X → Print 10 copies',
              'All shortcuts open the web browser'
            ],
            correctIndex: 0,
            explanation: 'Ctrl+C copies selected text, Ctrl+X cuts (moves) it, Ctrl+V pastes it at the cursor, and Ctrl+Z undoes the last mistake.',
            topic: 'Essential Editing Shortcuts'
          },
          {
            text: `In Scratch programming, which yellow block category is used to start a script when the user clicks the Green Flag 🚩?`,
            options: [
              'Events blocks ("when green flag clicked")',
              'Pen blocks',
              'Sound blocks only',
              'Erase blocks'
            ],
            correctIndex: 0,
            explanation: 'The "when green flag clicked" block is an Events hat block that triggers the script to run.',
            topic: 'Scratch Events & Motion Blocks'
          },
          {
            text: `Identify the INCORRECT rule regarding Cyber Safety and Internet Etiquette for school students:`,
            options: [
              'Never share your personal home address, phone number, or passwords with strangers online',
              'Always inform a parent or teacher if you see anything uncomfortable online',
              'Use polite language when communicating in online classrooms',
              'Share your secret password and parent’s bank OTP with anyone who asks in an online game'
            ],
            correctIndex: 3,
            explanation: 'Passwords and bank OTPs are strictly confidential and must NEVER be shared with anyone online.',
            topic: 'Internet Safety & Digital Citizenship'
          },
          {
            text: `Complete the sentence: In MS PowerPoint / Impress, each individual page of a digital presentation where you add titles, bullet points, and pictures is called a _____.`,
            options: ['Slide', 'Cell', 'Paintbrush', 'Cable'],
            correctIndex: 0,
            explanation: 'A presentation is made up of a sequence of Slides displayed during a Slide Show (F5).',
            topic: 'Introduction to Presentations (PowerPoint)'
          },
          {
            text: `How many bits make 1 Byte in computer digital storage?`,
            options: ['8 bits = 1 Byte', '2 bits = 1 Byte', '100 bits = 1 Byte', '3 bits = 1 Byte'],
            correctIndex: 0,
            explanation: 'A binary digit (0 or 1) is 1 bit; a group of 8 bits forms 1 Byte (and 1,024 Bytes = 1 Kilobyte).',
            topic: 'Bits and Bytes'
          },
          {
            text: `Look at the flowchart diamond icon 💠. In a simple Flowchart, which geometric shape is used to represent a Decision (Yes / No question) box?`,
            options: [
              'Diamond (Rhombus) shape',
              'Oval (Rounded Rectangle) shape',
              'Straight Arrow',
              'Triangle shape'
            ],
            correctIndex: 0,
            diagramEmoji: '💠',
            explanation: 'In flowcharts: Oval = Start/Stop, Parallelogram = Input/Output, Rectangle = Process, and Diamond = Decision (Yes/No).',
            topic: 'Algorithms and Flowcharts'
          },
          {
            text: `Which software program acts as an interface between the user and the computer hardware, managing all files, memory, and connected devices (e.g., Windows, Linux, macOS)?`,
            options: [
              'Operating System (System Software)',
              'Calculator App',
              'Notepad File',
              'Mouse Pad'
            ],
            correctIndex: 0,
            explanation: 'An Operating System (OS) is essential system software that boots the computer and manages hardware and applications.',
            topic: 'Operating System Fundamentals'
          }
        ];
      }

      // Primary Level 4 (Classes 1–5 Expert Challenge)
      return [
        {
          text: `Trace the Scratch loop: If a Sprite starts at position X = 0 and runs the block "repeat (4) -> move (25) steps", how many total steps will the Sprite move forward?`,
          options: [
            '100 steps (4 × 25 = 100 steps)',
            '29 steps',
            '25 steps',
            '4 steps'
          ],
          correctIndex: 0,
          explanation: 'The "repeat 4" loop executes "move 25 steps" 4 times: 25 + 25 + 25 + 25 = 100 steps.',
          topic: 'Loops in Scratch Programming'
        },
        {
          text: `Fill in the blank: In an MS Word table, horizontal lines of boxes are called Rows, and vertical lines of boxes are called _____.`,
          options: ['Columns', 'Margins', 'Headers', 'Footers'],
          correctIndex: 0,
          explanation: 'A table grid is organized into horizontal Rows and vertical Columns, and their intersection is a Cell.',
          topic: 'Working with Tables in Word Processor'
        },
        {
          text: `True or False: A Barcode Reader (scanner used in supermarkets) and an OMR (Optical Mark Reader used to check MCQ answer sheets) are both Input Devices.`,
          options: ['True', 'False', 'They are speakers', 'They are monitors'],
          correctIndex: 0,
          explanation: 'Barcode readers and OMR scanners read printed marks/codes and send data into the computer as input.',
          topic: 'Specialized Input Devices'
        },
        {
          text: `Match the Internet Term with its Correct Meaning:`,
          options: [
            'Web Browser → App to view websites (Chrome, Edge) | Search Engine → Finds information (Google) | URL → Web address of a page',
            'Web Browser → A printer cable | URL → A keyboard button',
            'Search Engine → A cooling fan inside the CPU',
            'All three are physical wires'
          ],
          correctIndex: 0,
          explanation: 'A web browser displays web pages, a search engine searches the web by keywords, and a URL (Uniform Resource Locator) is the website address.',
          topic: 'Internet & Web Browsing Basics'
        },
        {
          text: `Arrange the digital memory units in ascending order from smallest to largest:`,
          options: [
            'Bit → Byte → Kilobyte (KB) → Megabyte (MB) → Gigabyte (GB) → Terabyte (TB)',
            'Terabyte → Bit → Megabyte → Byte',
            'Gigabyte → Byte → Bit → Kilobyte',
            'Megabyte → Kilobyte → Byte → Terabyte'
          ],
          correctIndex: 0,
          explanation: '1 Byte = 8 bits; 1 KB = 1024 Bytes; 1 MB = 1024 KB; 1 GB = 1024 MB; 1 TB = 1024 GB.',
          topic: 'Memory Measurement Hierarchy'
        },
        {
          text: `Identify the INCORRECT statement regarding generations of computers:`,
          options: [
            '1st Generation computers used large Vacuum Tubes',
            '2nd Generation computers used Transistors',
            '3rd Generation used Integrated Circuits (ICs) and 4th Generation uses Microprocessors (VLSI)',
            '4th Generation modern laptops weigh 30 tonnes and fill an entire football stadium'
          ],
          correctIndex: 3,
          explanation: '1st generation computers (like ENIAC) were room-sized, whereas 4th generation microprocessor computers fit on a desk or palm.',
          topic: 'Evolution & Generations of Computers'
        },
        {
          text: `Complete the sentence: The file extension ".docx" belongs to MS Word documents, ".pptx" belongs to PowerPoint presentations, and ".xlsx" belongs to _____ spreadsheets.`,
          options: ['MS Excel', 'MS Paint', 'Windows Media Player', 'Scratch'],
          correctIndex: 0,
          explanation: 'MS Excel workbooks use the .xlsx file extension.',
          topic: 'File Extensions & Application Types'
        },
        {
          text: `In MS Excel / Spreadsheet basics, if Cell A1 contains 15 and Cell B1 contains 25, what is the correct formula to write in Cell C1 to calculate their sum?`,
          options: [
            '=A1+B1 (or =SUM(A1:B1))',
            'A1+B1 (without the equals sign)',
            '#ADD(A1,B1)',
            'TOTAL A1 B1'
          ],
          correctIndex: 0,
          explanation: 'Every formula in a spreadsheet must begin with an equals sign (=), such as =A1+B1.',
          topic: 'Introduction to Spreadsheets'
        },
        {
          text: `Look at the shield icon 🛡️. What is the purpose of "Antivirus Software" on a computer?`,
          options: [
            'To detect, block, and remove harmful malicious programs (computer viruses and malware) to keep files safe',
            'To clean dust off the monitor glass',
            'To make the keyboard heavier',
            'To delete all school homework automatically'
          ],
          correctIndex: 0,
          diagramEmoji: '🛡️',
          explanation: 'Antivirus software scans files and memory to protect the system against malware and viruses.',
          topic: 'Computer Security & Antivirus'
        },
        {
          text: `In a Flowchart, what is the difference between a "Rectangle" symbol and a "Parallelogram" symbol?`,
          options: [
            'A Rectangle represents a Process / Calculation (e.g., Sum = A + B), whereas a Parallelogram represents Input or Output (e.g., Read A, Print Sum)',
            'Both mean Stop the program',
            'Rectangle is for Start and Parallelogram is for Decision',
            'Flowcharts do not use rectangles'
          ],
          correctIndex: 0,
          explanation: 'Standard flowchart conventions use a Parallelogram for Input/Output and a Rectangle for Processing/Assignment steps.',
          topic: 'Flowchart Symbols & Logic'
        }
      ];
    }

    // Middle & Secondary Classes 6 to 10 Computer Studies (40 Unique Questions across Levels 1–4)
    if (level === 1) {
      return [
        {
          text: `What is the base (radix) of the Binary Number System used internally by digital computers, and which digits does it use?`,
          options: [
            'Base 2, using only two digits: 0 and 1',
            'Base 10, using digits 0 to 9',
            'Base 8, using digits 0 to 7',
            'Base 16, using digits 0 to 9 and A to F'
          ],
          correctIndex: 0,
          explanation: 'Digital circuits operate in two states (ON = 1, OFF = 0), forming the Base-2 Binary Number System.',
          topic: 'Number Systems – Binary & Decimal'
        },
        {
          text: `Fill in the blank: Convert the binary number (1101)₂ into its equivalent Decimal (Base-10) number: _____.`,
          options: ['13', '11', '15', '9'],
          correctIndex: 0,
          explanation: '(1101)₂ = (1 × 2³) + (1 × 2²) + (0 × 2¹) + (1 × 2⁰) = 8 + 4 + 0 + 1 = 13.',
          topic: 'Binary to Decimal Conversion'
        },
        {
          text: `True or False: An Operating System (such as Windows, Linux, or macOS) is System Software that manages CPU scheduling, memory allocation, file systems, and hardware device drivers.`,
          options: ['True', 'False', 'It is a hardware cable', 'It is only a paint brush'],
          correctIndex: 0,
          explanation: 'The Operating System is the core system software managing all hardware and software resources of a computer.',
          topic: 'Operating System & Functions'
        },
        {
          text: `Match the Computer Network Type with its Geographical Scope:`,
          options: [
            'PAN → Personal Area (few metres, Bluetooth) | LAN → Local Area (Building/School Campus) | MAN → Metropolitan (City) | WAN → Wide Area (Global/Internet)',
            'LAN → Whole Planet | WAN → Single desk only',
            'PAN → Covers an entire continent',
            'All networks have a 1 metre range'
          ],
          correctIndex: 0,
          explanation: 'Networks scale by range: PAN (Personal) < LAN (Local campus) < MAN (City) < WAN (Wide/Global Internet).',
          topic: 'Computer Networks (PAN, LAN, MAN, WAN)'
        },
        {
          text: `In MS Excel, what is the difference between a "Relative Cell Reference" (like A1) and an "Absolute Cell Reference" (like $A$1)?`,
          options: [
            'Relative reference (A1) changes automatically when copied to another cell, while Absolute reference ($A$1) remains locked and fixed',
            'Both change randomly',
            '$A$1 converts numbers into US dollars only',
            'A1 cannot be used in formulas'
          ],
          correctIndex: 0,
          explanation: 'Adding dollar signs ($A$1) locks both the column and row reference when a formula is dragged or copied across cells.',
          topic: 'Spreadsheets – Cell Referencing'
        },
        {
          text: `Identify the INCORRECT HTML tag statement among the following:`,
          options: [
            '<h1> to <h6> are used to define headings from largest (<h1>) to smallest (<h6>)',
            '<p> defines a paragraph and <br> inserts a single line break',
            '<a> (with the href attribute) creates a hyperlink to another webpage',
            '<h1> creates the smallest microscopic footnote text in HTML'
          ],
          correctIndex: 3,
          explanation: 'In HTML, <h1> defines the largest, most important top-level heading, while <h6> defines the smallest heading.',
          topic: 'HTML Web Designing Fundamentals'
        },
        {
          text: `Complete the sentence: A step-by-step finite sequence of unambiguous instructions written in plain language to solve a computational problem is called an _____.`,
          options: ['Algorithm', 'Spreadsheet', 'Motherboard', 'Modem'],
          correctIndex: 0,
          explanation: 'An algorithm is a finite, well-defined sequence of steps to solve a problem before coding it in a programming language.',
          topic: 'Algorithms & Computational Thinking'
        },
        {
          text: `In MS Excel, if cells B1, B2, B3, and B4 contain the values 10, 20, 30, and 40 respectively, what will the function =AVERAGE(B1:B4) return?`,
          options: ['25', '100', '4', '40'],
          correctIndex: 0,
          explanation: 'AVERAGE(B1:B4) computes (10 + 20 + 30 + 40) / 4 = 100 / 4 = 25.',
          topic: 'Spreadsheet Functions (SUM, AVERAGE, MAX, MIN)'
        },
        {
          text: `Look at the cloud icon ☁️. What is "Cloud Computing / Cloud Storage" (such as Google Drive or OneDrive)?`,
          options: [
            'Storing and accessing data and programs over the Internet on remote servers rather than only on a local hard drive',
            'Storing files inside rain clouds in the sky',
            'Using a computer only during monsoon weather',
            'Disconnecting a computer from the Internet'
          ],
          correctIndex: 0,
          diagramEmoji: '☁️',
          explanation: 'Cloud computing delivers storage, servers, and applications on-demand over the Internet.',
          topic: 'Cloud Computing & Modern Tech'
        },
        {
          text: `Convert the decimal number (25)₁₀ into its equivalent Binary (Base-2) representation:`,
          options: ['(11001)₂', '(10101)₂', '(11100)₂', '(10011)₂'],
          correctIndex: 0,
          explanation: '25 = 16 + 8 + 0 + 0 + 1 = (1 × 2⁴) + (1 × 2³) + (0 × 2²) + (0 × 2¹) + (1 × 2⁰) = (11001)₂.',
          topic: 'Decimal to Binary Conversion'
        }
      ];
    }

    if (level === 2) {
      return [
        {
          text: `In the Hexadecimal Number System (Base-16), what decimal values do the symbols A, B, C, D, E, and F represent?`,
          options: [
            'A = 10, B = 11, C = 12, D = 13, E = 14, F = 15',
            'A = 1, B = 2, C = 3, D = 4, E = 5, F = 6',
            'A = 16, B = 17, C = 18, D = 19, E = 20, F = 21',
            'Hexadecimal does not use letters'
          ],
          correctIndex: 0,
          explanation: 'Base-16 uses digits 0–9 for values 0–9 and letters A–F for values 10–15.',
          topic: 'Octal & Hexadecimal Number Systems'
        },
        {
          text: `Fill in the blank: A language processor that translates an entire High-Level Language program into Machine Code all at once (reporting all syntax errors together) is called a _____, whereas one that translates and executes line-by-line is an Interpreter.`,
          options: ['Compiler', 'Linker', 'Plotter', 'Scanner'],
          correctIndex: 0,
          explanation: 'A Compiler translates the complete source code into object/machine code in one go, while an Interpreter executes statement by statement.',
          topic: 'Compiler vs Interpreter vs Assembler'
        },
        {
          text: `True or False: In HTML, container tags (paired tags like <table>...</table> or <p>...</p>) require both an opening tag and a closing tag, whereas empty tags (like <br>, <hr>, <img>) do not have a closing tag.`,
          options: ['True', 'False', '<br> requires </br></br>', 'All HTML tags are empty tags'],
          correctIndex: 0,
          explanation: 'Container elements wrap content between <tag> and </tag>, while empty (void) elements like <br>, <hr>, and <img> stand alone.',
          topic: 'HTML Container vs Empty Tags'
        },
        {
          text: `Match the Networking Hardware Device with its Function:`,
          options: [
            'Modem → Modulator-Demodulator | Switch → Connects devices in a LAN using MAC addresses | Router → Routes data packets between different networks (LAN to Internet)',
            'Router → Prints paper | Modem → Cools the CPU',
            'Switch → Displays images on a wall',
            'All three are input keyboards'
          ],
          correctIndex: 0,
          explanation: 'A Modem converts signals, a Switch connects devices within a LAN, and a Router forwards packets across networks using IP addresses.',
          topic: 'Networking Devices & Topologies'
        },
        {
          text: `In Relational Database Management Systems (DBMS), what is a "Primary Key"?`,
          options: [
            'A column (field) that uniquely identifies each record (row) in a table and can NEVER contain NULL or duplicate values (e.g., Roll_No or Aadhaar_No)',
            'The physical metal key to open the computer lab door',
            'The Enter key on the keyboard',
            'A column where every row has the exact same duplicate value'
          ],
          correctIndex: 0,
          explanation: 'A Primary Key enforces entity integrity by ensuring every tuple (record) in a database table is unique and non-null.',
          topic: 'DBMS – Tables, Records & Primary Key'
        },
        {
          text: `Identify the INCORRECT statement regarding Cyber Threats and Security:`,
          options: [
            'Phishing is a fraudulent attempt (often via fake emails/links) to steal sensitive login credentials or bank details',
            'A Firewall monitors and filters incoming and outgoing network traffic based on security rules',
            'Two-Factor Authentication (2FA) adds an extra layer of security beyond just a password',
            'Clicking on unknown lottery links in spam emails makes your computer 10 times faster'
          ],
          correctIndex: 3,
          explanation: 'Spam and phishing links often install malware, ransomware, or spyware and steal confidential data.',
          topic: 'Cyber Security, Phishing & Firewalls'
        },
        {
          text: `Complete the HTML attribute: In the image tag <img src="school.jpg" alt="My School Campus">, the "src" attribute specifies the image file path, while the "_____" attribute provides alternate text if the image fails to load or for screen readers.`,
          options: ['alt', 'href', 'bgcolor', 'border'],
          correctIndex: 0,
          explanation: 'The "alt" attribute specifies alternative text for accessibility and fallback display.',
          topic: 'HTML Images & Attributes'
        },
        {
          text: `Perform Binary Addition: What is (1010)₂ + (0101)₂?`,
          options: ['(1111)₂ (which equals 10 + 5 = 15 in decimal)', '(10000)₂', '(1100)₂', '(1011)₂'],
          correctIndex: 0,
          explanation: 'Adding bit by bit: 0+1=1, 1+0=1, 0+1=1, 1+0=1, giving (1111)₂ = 15.',
          topic: 'Binary Arithmetic'
        },
        {
          text: `Look at the topology icon 🕸️. In which Network Topology are all computer nodes connected to a single central device (such as a central Switch or Hub) so that failure of one node's cable does not disrupt the rest of the network?`,
          options: [
            'Star Topology',
            'Bus Topology',
            'Ring Topology',
            'Disconnected Topology'
          ],
          correctIndex: 0,
          diagramEmoji: '🕸️',
          explanation: 'In Star Topology, every node connects individually to a central switch/hub, making fault isolation easy.',
          topic: 'Network Topologies (Bus, Star, Ring, Mesh)'
        },
        {
          text: `What is the difference between a "Graphical User Interface (GUI)" and a "Command Line Interface (CLI)" in Operating Systems?`,
          options: [
            'GUI lets users interact visually using windows, icons, menus, and a pointer (WIMP), whereas CLI requires typing text commands at a prompt',
            'CLI uses a mouse and touch screen only',
            'GUI has no graphics or icons',
            'Both are hardware printers'
          ],
          correctIndex: 0,
          explanation: 'Windows and macOS provide a visual GUI, while Command Prompt / Linux bash shell provide a text-based CLI.',
          topic: 'User Interfaces – GUI vs CLI'
        }
      ];
    }

    if (level === 3) {
      return [
        {
          text: `In Object-Oriented Programming (Java / C++ / Python), which principle binds data (variables) and the methods (functions) that operate on that data together into a single unit (Class) while hiding internal implementation details?`,
          options: [
            'Encapsulation (and Data Hiding)',
            'Compilation',
            'Formatting',
            'Pagination'
          ],
          correctIndex: 0,
          explanation: 'Encapsulation wraps data and methods inside a class and restricts direct unauthorized access using access modifiers like private.',
          topic: 'OOP Principles – Encapsulation, Inheritance, Polymorphism'
        },
        {
          text: `Fill in the blank: In HTML lists, the _____ tag creates an Ordered (numbered) List, whereas the <ul> tag creates an Unordered (bulleted) List, with each item inside <li>...</li>.`,
          options: ['<ol>', '<dl>', '<tr>', '<td>'],
          correctIndex: 0,
          explanation: '<ol> stands for Ordered List (1, 2, 3 or A, B, C) and <ul> stands for Unordered List (bullets).',
          topic: 'HTML Lists & Tables'
        },
        {
          text: `True or False: In programming, a "while" loop and a "for" loop are Entry-Controlled loops (condition is tested before executing the loop body), whereas a "do-while" loop is an Exit-Controlled loop (executes at least once).`,
          options: [
            'True',
            'False',
            'A do-while loop never executes',
            'Loops only run backwards'
          ],
          correctIndex: 0,
          explanation: 'Entry-controlled loops check the condition at the start, while exit-controlled (do-while) checks the condition at the end of each iteration.',
          topic: 'Iterative Constructs (Loops)'
        },
        {
          text: `Match the Internet Protocol with its Purpose:`,
          options: [
            'HTTP / HTTPS → Secure Web Page Transfer | FTP → File Transfer Protocol | SMTP & POP3/IMAP → Sending & Receiving Emails | TCP/IP → Core Internet Packet Routing',
            'HTTP → Prints paper | FTP → Audio volume control',
            'SMTP → Formats hard drives',
            'All protocols are used offline without networks'
          ],
          correctIndex: 0,
          explanation: 'HTTPS encrypts web traffic via SSL/TLS, FTP transfers files, SMTP sends emails, and TCP/IP governs internet packet transmission.',
          topic: 'Network Protocols (TCP/IP, HTTPS, FTP, SMTP)'
        },
        {
          text: `Evaluate the expression using standard operator precedence in programming: What is the value of 10 + 20 / 5 * 2 - 3?`,
          options: ['15', '9', '11', '25'],
          correctIndex: 0,
          explanation: 'Division and multiplication have higher precedence (left to right): 20 / 5 = 4; 4 * 2 = 8; then 10 + 8 - 3 = 15.',
          topic: 'Operators & Precedence'
        },
        {
          text: `Identify the INCORRECT statement regarding Arrays in programming:`,
          options: [
            'An array stores a fixed-size sequential collection of elements of the SAME data type in contiguous memory locations',
            'Array indexing in Java, C, C++, and Python starts at index 0 (zero-based indexing)',
            'If an array has length N, the index of its last element is N - 1',
            'An array of size 5 has valid indices from 1 to 100'
          ],
          correctIndex: 3,
          explanation: 'An array of size 5 has valid zero-based indices 0, 1, 2, 3, and 4 (0 to N-1).',
          topic: 'Single-Dimensional Arrays'
        },
        {
          text: `Complete the SQL query: To retrieve all columns of students from the "Students" table whose marks are greater than 85, we write: SELECT * FROM Students _____ Marks > 85;`,
          options: ['WHERE', 'ORDER', 'GROUP', 'INSERT'],
          correctIndex: 0,
          explanation: 'In SQL, the WHERE clause filters rows based on a specified condition.',
          topic: 'SQL Queries (SELECT, WHERE, ORDER BY)'
        },
        {
          text: `Convert the Octal number (75)₈ into its equivalent Decimal (Base-10) value:`,
          options: ['61', '75', '56', '63'],
          correctIndex: 0,
          explanation: '(75)₈ = (7 × 8¹) + (5 × 8⁰) = 56 + 5 = 61.',
          topic: 'Octal to Decimal Conversion'
        },
        {
          text: `Look at the styling brush icon 🎨. In Web Development, what does "CSS" stand for, and what is its primary role alongside HTML?`,
          options: [
            'Cascading Style Sheets — used to control the visual presentation, layout, colours, and fonts of HTML web pages',
            'Computer System Hardware — used to build silicon chips',
            'Central Storage Server — used to store databases',
            'Code Syntax Scanner — used to compile C++'
          ],
          correctIndex: 0,
          diagramEmoji: '🎨',
          explanation: 'HTML defines the structure and content of a webpage, while CSS (Cascading Style Sheets) controls its styling and layout.',
          topic: 'HTML & Cascading Style Sheets (CSS)'
        },
        {
          text: `What is the output of the following conditional logic if score = 78?\nif (score >= 90) grade = "A";\nelse if (score >= 75) grade = "B";\nelse if (score >= 60) grade = "C";\nelse grade = "D";`,
          options: ['grade = "B"', 'grade = "A"', 'grade = "C"', 'grade = "D"'],
          correctIndex: 0,
          explanation: 'Since 78 is not >= 90, it checks the next condition (78 >= 75), which is true, assigning grade = "B".',
          topic: 'Conditional Statements (if-else-if Ladder)'
        }
      ];
    }

    // Level 4: Expert Challenge (Classes 6–10)
    return [
      {
        text: `Convert the Hexadecimal number (2F)₁₆ into its equivalent Binary (Base-2) and Decimal (Base-10) representations:`,
        options: [
          'Binary = (00101111)₂ and Decimal = 47 [since 2 × 16 + 15 = 47]',
          'Binary = (11110010)₂ and Decimal = 215',
          'Binary = (00101010)₂ and Decimal = 42',
          'Binary = (11111111)₂ and Decimal = 255'
        ],
        correctIndex: 0,
        explanation: 'In Hexadecimal, 2 = 0010₂ and F = 15 = 1111₂, giving (00101111)₂; in decimal, (2 × 16¹) + (15 × 16⁰) = 32 + 15 = 47.',
        topic: 'Hexadecimal, Binary & Decimal Interconversion'
      },
      {
        text: `Fill in the blank: In Object-Oriented Programming, the ability of a subclass (derived class) to acquire the properties and methods of a superclass (base class) to promote code reusability is called _____.`,
        options: ['Inheritance', 'Tokenization', 'Concatenation', 'Truncation'],
        correctIndex: 0,
        explanation: 'Inheritance establishes an "IS-A" relationship between a child class and a parent class, enabling code reuse.',
        topic: 'OOP – Inheritance & Polymorphism'
      },
      {
        text: `True or False: In an HTML table, the "colspan" attribute in a <td> or <th> tag merges cells horizontally across multiple columns, whereas "rowspan" merges cells vertically across multiple rows.`,
        options: [
          'True',
          'False',
          'colspan deletes the table',
          'rowspan changes font colour'
        ],
        correctIndex: 0,
        explanation: 'colspan="2" makes a cell span across 2 columns horizontally, and rowspan="2" makes a cell span across 2 rows vertically.',
        topic: 'Advanced HTML Tables (rowspan & colspan)'
      },
      {
        text: `Match the SQL Command Type (DDL vs DML) with its SQL Statements:`,
        options: [
          'DDL (Data Definition Language) → CREATE, ALTER, DROP | DML (Data Manipulation Language) → INSERT, UPDATE, DELETE, SELECT',
          'DDL → SELECT only | DML → DROP TABLE only',
          'Both DDL and DML are hardware cables',
          'SQL does not have CREATE or INSERT commands'
        ],
        correctIndex: 0,
        explanation: 'DDL defines and modifies table schemas (CREATE, ALTER, DROP), whereas DML manipulates data rows inside tables (INSERT, UPDATE, DELETE).',
        topic: 'DBMS – DDL and DML Commands'
      },
      {
        text: `Trace the following loop and find the final value of sum:\nint sum = 0;\nfor (int i = 1; i <= 5; i++) {\n  if (i % 2 != 0) sum += i;\n}`,
        options: [
          '9 (adds odd numbers 1 + 3 + 5 = 9)',
          '15 (adds 1 + 2 + 3 + 4 + 5)',
          '6 (adds even numbers 2 + 4)',
          '0'
        ],
        correctIndex: 0,
        explanation: 'The condition (i % 2 != 0) is true for odd numbers i = 1, 3, 5. Therefore, sum = 1 + 3 + 5 = 9.',
        topic: 'Dry-Run & Loop Trace Analysis'
      },
      {
        text: `Identify the INCORRECT statement regarding Intellectual Property Rights (IPR) and Cyber Ethics:`,
        options: [
          'Plagiarism is the unethical act of copying someone else’s work or code and presenting it as your own without citation',
          'Open-Source Software (like Linux, Python, LibreOffice) provides source code that users can inspect, modify, and share under open licenses',
          'A Digital Footprint is the trail of data you leave behind while using the Internet',
          'Software Piracy (illegally copying and distributing copyrighted commercial software) is completely legal and encouraged by copyright law'
        ],
        correctIndex: 3,
        explanation: 'Software piracy violates Copyright and Intellectual Property laws and is punishable under cyber law.',
        topic: 'Cyber Ethics, IPR & Open-Source Software'
      },
      {
        text: `Complete the String operation: In zero-based indexing, for the string s = "COMPUTERS", what is s.length() and what character is returned by s.charAt(3)?`,
        options: [
          'Length is 9 and character at index 3 is \'P\' (C=0, O=1, M=2, P=3)',
          'Length is 8 and character at index 3 is \'M\'',
          'Length is 9 and character at index 3 is \'U\'',
          'Length is 10 and character at index 3 is \'C\''
        ],
        correctIndex: 0,
        explanation: '"COMPUTERS" has 9 characters (indices 0 to 8). Index 0=\'C\', 1=\'O\', 2=\'M\', 3=\'P\'.',
        topic: 'String Manipulation & Zero-Based Indexing'
      },
      {
        text: `In computer architecture, why is "Cache Memory" (L1/L2/L3 SRAM) placed between the CPU registers and main memory (RAM)?`,
        options: [
          'Because Cache Memory is ultra-fast semiconductor memory that stores frequently accessed instructions and data, reducing CPU wait time',
          'Because Cache Memory is slower than a magnetic tape',
          'To store 10 Terabytes of movies permanently when power is off',
          'To replace the monitor screen'
        ],
        correctIndex: 0,
        explanation: 'Cache memory bridges the speed gap between the fast CPU processor and relatively slower main RAM.',
        topic: 'Memory Hierarchy – Registers, Cache, RAM, Secondary Storage'
      },
      {
        text: `Look at the search icon 🔍. Compare "Linear Search" and "Binary Search" on an array of N elements:`,
        options: [
          'Linear Search works on any array (sorted or unsorted) by checking sequentially, whereas Binary Search requires the array to be SORTED and repeatedly halves the search interval',
          'Binary Search works only on unsorted random arrays',
          'Linear Search requires the array to be sorted in descending order',
          'Both algorithms check only the first element'
        ],
        correctIndex: 0,
          diagramEmoji: '🔍',
        explanation: 'Binary Search divides a sorted array in half at each step (O(log N)), whereas Linear Search checks elements one by one (O(N)).',
        topic: 'Searching Algorithms – Linear vs Binary Search'
      },
      {
        text: `Assertion (A): HTTPS (Hypertext Transfer Protocol Secure) is essential when conducting online banking or e-commerce transactions.\nReason (R): HTTPS uses SSL/TLS encryption to encrypt data transmitted between the user's browser and the web server, preventing eavesdropping and man-in-the-middle attacks.`,
        options: [
          'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
          'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
          '(A) is true, but (R) is false.',
          '(A) is false, but (R) is true.'
        ],
        correctIndex: 0,
        explanation: 'HTTPS secures data in transit using cryptographic protocols (TLS/SSL), indicated by the padlock icon in the browser address bar.',
        topic: 'Secure Communication & Encryption'
      }
    ];
  }

  // ============================================================================
  // 28. COMPUTER APPLICATIONS — 40 Unique Questions (10 per Level, Classes 9–10)
  // ============================================================================
  if (subject === 'Computer Applications') {
    if (level === 1) {
      return [
        {
          text: `In Java (Object-Oriented Programming), why is Java described as "Platform Independent" (Write Once, Run Anywhere)?`,
          options: [
            'Because the Java compiler (javac) compiles source code (.java) into intermediate Bytecode (.class), which can be executed on any operating system that has a Java Virtual Machine (JVM)',
            'Because Java programs do not need a CPU',
            'Because Java runs only on Windows 95',
            'Because Java code is written in binary 0s and 1s by hand'
          ],
          correctIndex: 0,
          explanation: 'Java Bytecode (.class) is platform-neutral and is interpreted/JIT-compiled by the target machine’s JVM.',
          topic: 'Java Compilation – Bytecode & JVM'
        },
        {
          text: `Fill in the blank: The smallest individual unit in a Java program (such as Keywords, Identifiers, Literals, Punctuators, and Operators) is called a _____.`,
          options: ['Token', 'Package', 'Applet', 'Thread'],
          correctIndex: 0,
          explanation: 'Java tokens are the five fundamental lexical building blocks of a program: Keywords, Identifiers, Literals, Operators, and Separators.',
          topic: 'Tokens in Java'
        },
        {
          text: `True or False: In Java, primitive data type "int" occupies 4 bytes (32 bits), while "double" occupies 8 bytes (64 bits) and "char" occupies 2 bytes (16-bit Unicode).`,
          options: [
            'True',
            'False',
            'int occupies 100 bytes',
            'char uses 1 bit only'
          ],
          correctIndex: 0,
          explanation: 'Java has 8 primitive types: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B Unicode), and boolean.',
          topic: 'Primitive Data Types & Memory Sizes'
        },
        {
          text: `Match the Java Operator with its Operation:`,
          options: [
            '/ (Slash) → Quotient of division | % (Modulus) → Remainder of division | == → Equality comparison | && → Logical AND',
            '% → Percentage calculation | = → Equality comparison',
            '/ → Remainder of division',
            '&& → Bitwise shift'
          ],
          correctIndex: 0,
          explanation: 'In Java integer arithmetic, 17 / 5 evaluates to 3 (quotient) and 17 % 5 evaluates to 2 (remainder); == checks equality while = assigns value.',
          topic: 'Arithmetic, Relational & Logical Operators'
        },
        {
          text: `Which class from the "java.util" package is most commonly imported to read formatted keyboard input from the user at runtime (using methods like nextInt(), nextDouble(), nextLine())?`,
          options: [
            'Scanner (java.util.Scanner)',
            'System (java.lang.System)',
            'Math (java.lang.Math)',
            'String (java.lang.String)'
          ],
          correctIndex: 0,
          explanation: 'Scanner sc = new Scanner(System.in); from java.util.Scanner is the standard way to read console input in Java.',
          topic: 'Input in Java – Scanner Class'
        },
        {
          text: `Identify the INVALID Java identifier (variable name) from the options below:`,
          options: [
            'totalMarks_1',
            '$price',
            '_studentCount',
            '2ndPlaceRank'
          ],
          correctIndex: 3,
          explanation: 'A Java identifier can contain letters, digits, underscore (_), and dollar sign ($), but it MUST NOT start with a digit (like 2ndPlaceRank) or be a reserved keyword.',
          topic: 'Rules for Naming Identifiers'
        },
        {
          text: `Complete the statement: When a smaller data type (like byte or int) is automatically converted by the compiler into a larger compatible data type (like long or double) without loss of precision, it is called _____ type conversion.`,
          options: [
            'Implicit (Widening / Coercion)',
            'Explicit (Narrowing)',
            'Syntax Error',
            'Truncation'
          ],
          correctIndex: 0,
          explanation: 'Implicit type conversion (widening) happens automatically along byte → short → int → long → float → double.',
          topic: 'Implicit vs Explicit Type Casting'
        },
        {
          text: `Evaluate the Java expression using prefix and postfix increment operators:\nint a = 5;\nint b = ++a + a++;\nWhat is the value of b?`,
          options: [
            '12 (since ++a increments a to 6, and then a++ uses 6 before incrementing a to 7: 6 + 6 = 12)',
            '10',
            '11',
            '14'
          ],
          correctIndex: 0,
          explanation: '++a pre-increments a from 5 to 6 (value 6). Next, a++ evaluates to 6 and post-increments a to 7. Thus b = 6 + 6 = 12.',
          topic: 'Prefix and Postfix Increment/Decrement'
        },
        {
          text: `Look at the math icon 📐. What values are returned by the Java mathematical functions Math.sqrt(64), Math.pow(2, 3), and Math.ceil(4.2)?`,
          options: [
            '8.0, 8.0, and 5.0 (all three return double values)',
            '8, 6, and 4 (as integers)',
            '32.0, 6.0, and 4.0',
            '8.0, 9.0, and 4.2'
          ],
          correctIndex: 0,
          diagramEmoji: '📐',
          explanation: 'Math.sqrt(), Math.pow(), Math.ceil(), and Math.floor() in java.lang.Math always return a value of type double.',
          topic: 'Mathematical Library Methods (java.lang.Math)'
        },
        {
          text: `In a Java "switch-case" statement, what happens if the "break;" statement is omitted at the end of a matching case block?`,
          options: [
            'Fall-Through occurs — execution continues sequentially into the subsequent case blocks until a break or the end of the switch is reached',
            'A compilation error occurs immediately',
            'The computer restarts',
            'The program skips to the previous case'
          ],
          correctIndex: 0,
          explanation: 'Without a break statement, control falls through to execute statements in following cases.',
          topic: 'Decision Making – switch-case & Fall-Through'
        }
      ];
    }

    if (level === 2) {
      return [
        {
          text: `Rewrite the following ternary operator expression using an equivalent if-else statement: int max = (a > b) ? a : b;`,
          options: [
            'if (a > b) max = a; else max = b;',
            'if (a < b) max = a; else max = b;',
            'for (int i = a; i < b; i++) max = i;',
            'switch(a) { case b: max = a; }'
          ],
          correctIndex: 0,
          explanation: 'The conditional (ternary) operator (condition ? expr1 : expr2) evaluates to expr1 if condition is true, and expr2 if false.',
          topic: 'Ternary (Conditional) Operator'
        },
        {
          text: `Fill in the blank: In a loop, the _____ statement immediately terminates the enclosing loop and transfers control outside the loop, whereas the "continue" statement skips only the remaining statements of the current iteration and jumps to the next iteration.`,
          options: ['break', 'return', 'import', 'package'],
          correctIndex: 0,
          explanation: 'break exits the loop completely, while continue skips the rest of the current pass and proceeds with the next loop update/test.',
          topic: 'Jump Statements – break vs continue'
        },
        {
          text: `True or False: A Constructor in Java is a special member method that has the EXACT SAME NAME as the class, has NO return type (not even void), and is automatically invoked when an object is created using the "new" operator.`,
          options: [
            'True',
            'False',
            'A constructor must return an int',
            'A constructor is called only when an object is deleted'
          ],
          correctIndex: 0,
          explanation: 'Constructors initialize the instance variables of an object at the time of instantiation with the new keyword.',
          topic: 'Constructors in Java'
        },
        {
          text: `Match the Java Wrapper Class (in java.lang) with its corresponding Primitive Data Type:`,
          options: [
            'int → Integer | char → Character | boolean → Boolean | double → Double',
            'int → IntClass | char → String',
            'double → FloatWrapper',
            'Wrapper classes do not exist in Java'
          ],
          correctIndex: 0,
          explanation: 'Every primitive type has a Wrapper class in java.lang; notably int → Integer and char → Character (spelled in full).',
          topic: 'Wrapper Classes – Autoboxing & Unboxing'
        },
        {
          text: `Which static method of the Integer wrapper class is used to convert a numeric String (such as "2026") into a primitive int value?`,
          options: [
            'Integer.parseInt("2026")',
            'Integer.toString(2026)',
            'Character.isDigit(\'2\')',
            'String.valueOf(2026)'
          ],
          correctIndex: 0,
          explanation: 'Integer.parseInt(String) parses a string representation of a signed decimal integer into a primitive int.',
          topic: 'Parsing Strings with Wrapper Methods'
        },
        {
          text: `Identify the INCORRECT statement regarding Method Overloading (Compile-Time Polymorphism) in Java:`,
          options: [
            'Multiple methods in the same class can share the same name if their parameter lists differ in number, type, or order of parameters',
            'Method overloading implements Compile-Time (Static) Polymorphism',
            'Constructors of a class can also be overloaded (Default and Parameterized constructors)',
            'Two methods with the exact same name and exact same parameter types can be overloaded solely by changing their return type'
          ],
          correctIndex: 3,
          explanation: 'In Java, changing only the return type while keeping the method name and parameter signature identical causes a compile-time duplicate method error.',
          topic: 'Method Overloading & Polymorphism'
        },
        {
          text: `Complete the array declaration: If int[] arr = {12, 24, 36, 48, 60}; is declared in Java, what is the value of arr.length and what is the value of arr[2] + arr[4]?`,
          options: [
            'arr.length is 5, and arr[2] + arr[4] = 36 + 60 = 96',
            'arr.length is 4, and arr[2] + arr[4] = 24 + 48 = 72',
            'arr.length is 5, and arr[2] + arr[4] = 12 + 36 = 48',
            'ArrayIndexOutOfBoundsException'
          ],
          correctIndex: 0,
          explanation: 'The array has 5 elements (arr.length = 5). Zero-based indexing: arr[0]=12, arr[1]=24, arr[2]=36, arr[3]=48, arr[4]=60. Sum = 36 + 60 = 96.',
          topic: 'Array Length & Element Access'
        },
        {
          text: `What is the output of the following Java String method calls?\nString str = "MAHARASHTRA";\nSystem.out.println(str.substring(0, 4) + " - " + str.indexOf('R'));`,
          options: [
            'MAHA - 4',
            'MAHAR - 5',
            'MAHA - 5',
            'AHAR - 4'
          ],
          correctIndex: 0,
          explanation: 'str.substring(0, 4) extracts characters from index 0 to 3 ("MAHA"), and the first \'R\' is at index 4 (M=0, A=1, H=2, A=3, R=4).',
          topic: 'String Class Methods (substring, indexOf)'
        },
        {
          text: `Look at the lock icon 🔒. List the four Access Specifiers (Visibility Modifiers) in Java in order from MOST restrictive to LEAST restrictive:`,
          options: [
            'private → default (package-private) → protected → public',
            'public → private → protected → default',
            'protected → private → public → default',
            'default → private → public → protected'
          ],
          correctIndex: 0,
          diagramEmoji: '🔒',
          explanation: 'private is accessible only within the same class; default within the same package; protected within package + subclasses; public everywhere.',
          topic: 'Access Specifiers (Visibility Modes)'
        },
        {
          text: `What is the difference between "Call by Value" and "Call by Reference" when passing arguments to methods in Java?`,
          options: [
            'In Call by Value (primitive types), a copy of the value is passed so changes inside the method do NOT affect the original variable; when passing Objects/Arrays, the reference is passed so modifying object state affects the original object',
            'Primitive types always modify the caller’s variable directly',
            'Arrays cannot be passed to methods in Java',
            'Both are syntax errors'
          ],
          correctIndex: 0,
          explanation: 'Primitive arguments pass a copy of the value to formal parameters, whereas reference types (arrays/objects) share the memory reference.',
          topic: 'Actual vs Formal Parameters (Pass by Value/Reference)'
        }
      ];
    }

    if (level === 3) {
      return [
        {
          text: `Compare the String methods str1.equals(str2) and str1.compareTo(str2) in Java:`,
          options: [
            'equals() returns a boolean (true/false) checking exact character equality, whereas compareTo() returns an int (0 if equal, negative if str1 < str2 lexicographically, positive if str1 > str2)',
            'Both return a boolean value',
            'compareTo() only compares string lengths and ignores ASCII/Unicode values',
            'equals() converts both strings to uppercase'
          ],
          correctIndex: 0,
          explanation: 'compareTo() performs a lexicographical comparison based on Unicode values of characters, returning an integer difference.',
          topic: 'String Comparison – equals() vs compareTo()'
        },
        {
          text: `Fill in the blank: In a 2D (Two-Dimensional) array declared as int[][] matrix = new int[3][4];, there are 3 rows, 4 columns, and a total of _____ integer elements.`,
          options: ['12 elements (3 × 4 = 12)', '7 elements', '16 elements', '9 elements'],
          correctIndex: 0,
          explanation: 'A 2D array with R rows and C columns stores R × C elements; here 3 × 4 = 12 elements.',
          topic: 'Double-Dimensional (2D) Arrays'
        },
        {
          text: `True or False: In Java, the keyword "static" before a variable or method means it belongs to the Class itself (shared by all instances) rather than to any individual object, and a static method can be called directly using ClassName.methodName().`,
          options: [
            'True',
            'False',
            'Static variables are recreated 100 times per object',
            'Math.sqrt() requires creating a new Math() object'
          ],
          correctIndex: 0,
          explanation: 'Static members (class variables and class methods) have a single shared copy in memory and can be invoked without instantiating an object.',
          topic: 'Static (Class) Variables & Methods vs Instance Members'
        },
        {
          text: `Match the Character Wrapper Class Method with its Return Value:`,
          options: [
            'Character.isLetter(\'A\') → true | Character.isDigit(\'9\') → true | Character.isWhitespace(\' \') → true | Character.toLowerCase(\'G\') → \'g\'',
            'Character.isDigit(\'A\') → true',
            'Character.toUpperCase(\'a\') → boolean true',
            'All Character methods return double'
          ],
          correctIndex: 0,
          explanation: 'isLetter, isDigit, isLetterOrDigit, isUpperCase, isLowerCase, and isWhitespace return boolean; toUpperCase and toLowerCase return char.',
          topic: 'Character Class Library Methods'
        },
        {
          text: `In Bubble Sort, if we are sorting an array of N = 6 elements in ascending order, how many outer passes are required in the worst case, and what happens at the end of Pass 1?`,
          options: [
            'N - 1 = 5 passes; at the end of Pass 1, the LARGEST element bubbles up to the last position (index N - 1)',
            '100 passes; the array becomes unsorted',
            '1 pass only',
            'At the end of Pass 1, all elements become zero'
          ],
          correctIndex: 0,
          explanation: 'In Bubble Sort, adjacent elements are compared and swapped; after each pass k, the k-th largest element settles into its final position at the end.',
          topic: 'Sorting Algorithms – Bubble Sort & Selection Sort'
        },
        {
          text: `Identify the INCORRECT statement regarding Exception Handling in Java:`,
          options: [
            'A "try" block encloses code that might throw a runtime exception (such as ArithmeticException for division by zero)',
            'A "catch" block handles the exception thrown by the try block so the program does not crash abruptly',
            'A "finally" block executes regardless of whether an exception was thrown or caught, useful for closing resources',
            'Dividing an integer by zero (10 / 0) is a valid compile-time feature that prints infinity without any exception'
          ],
          correctIndex: 3,
          explanation: 'Integer division by zero (e.g., 10 / 0) throws a runtime java.lang.ArithmeticException: / by zero.',
          topic: 'Errors & Exception Handling (Compile-Time, Runtime, Logical)'
        },
        {
          text: `Complete the code logic to check if a positive integer n is a Palindrome Number (e.g., 121 or 1331): Inside the while (temp > 0) loop, we extract the last digit d = temp % 10, update rev = _____, and then temp = temp / 10;`,
          options: [
            'rev * 10 + d',
            'rev + d',
            'rev * d',
            'rev / 10'
          ],
          correctIndex: 0,
          explanation: 'Multiplying the accumulated reverse by 10 and adding the extracted last digit (rev = rev * 10 + d) reverses the digits of the number.',
          topic: 'Number Logic Programs (Palindrome, Armstrong, Prime)'
        },
        {
          text: `What will be the output of the following Java statement?\nSystem.out.println("Score: " + 10 + 20 + " | Total: " + (10 + 20));`,
          options: [
            'Score: 1020 | Total: 30',
            'Score: 30 | Total: 30',
            'Score: 1020 | Total: 1020',
            'Compilation Error'
          ],
          correctIndex: 0,
          explanation: 'When + follows a String ("Score: " + 10 + 20), left-to-right string concatenation produces "Score: 1020", whereas parentheses (10 + 20) force arithmetic addition first (30).',
          topic: 'String Concatenation vs Arithmetic Addition'
        },
        {
          text: `Look at the binary tree / search icon 🔢. In a Binary Search on the sorted array arr = {10, 20, 30, 40, 50, 60, 70} (indices 0 to 6) searching for key = 60, what are the values of low, high, and mid = (low + high) / 2 in the FIRST comparison?`,
          options: [
            'low = 0, high = 6, mid = 3 (comparing key 60 with arr[3] = 40; since 60 > 40, low becomes mid + 1 = 4)',
            'low = 0, high = 7, mid = 0',
            'low = 3, high = 6, mid = 6',
            'Binary search starts at index 6'
          ],
          correctIndex: 0,
          diagramEmoji: '🔢',
          explanation: 'Initially low = 0, high = 6, so mid = (0 + 6)/2 = 3 (arr[3] = 40). Since 60 > 40, the second step searches the right half (low = 4, high = 6, mid = 5 -> arr[5] = 60 found!).',
          topic: 'Binary Search Trace'
        },
        {
          text: `In Java, why is a Class often called an "Object Factory" and a "User-Defined Composite Data Type"?`,
          options: [
            'Because a Class is a blueprint/template from which multiple similar Objects (instances) can be manufactured, and it combines multiple different primitive/reference types into one custom type',
            'Because a Class is a physical factory building',
            'Because a Class can only hold a single boolean variable',
            'Because Java has no primitive types'
          ],
          correctIndex: 0,
          explanation: 'A class acts as a blueprint (Object Factory) to instantiate objects and bundles heterogeneous data types into a composite user-defined type.',
          topic: 'Class as an Object Factory & Composite Data Type'
        }
      ];
    }

    // Level 4: Expert Challenge (Computer Applications)
    return [
      {
        text: `Evaluate the exact integer result of "CAB".compareTo("CAT") in Java using ASCII/Unicode values ('A'=65, 'B'=66, 'C'=67, ..., 'T'=84):`,
        options: [
          '-18 (since \'C\'==\'C\', \'A\'==\'A\', and at index 2: \'B\' (66) - \'T\' (84) = -18)',
          '+18',
          '0',
          '-1'
        ],
        correctIndex: 0,
        explanation: 'compareTo() compares character by character and returns the Unicode difference at the first mismatch: \'B\' (66) - \'T\' (84) = -18.',
        topic: 'Lexicographical String compareTo() Calculation'
      },
      {
        text: `Fill in the blank: In Selection Sort for ascending order, during Pass 1 (starting at index 0), the algorithm scans the entire array to find the _____ element and swaps it with the element at index 0.`,
        options: [
          'Minimum (Smallest)',
          'Maximum (Largest)',
          'Middle',
          'Last'
        ],
        correctIndex: 0,
        explanation: 'Selection Sort repeatedly selects the minimum element from the unsorted portion and swaps it with the leftmost unsorted position.',
        topic: 'Selection Sort Algorithm'
      },
      {
        text: `True or False: In Java, the "this" keyword is a reference to the current calling object, commonly used inside a constructor or method to resolve naming shadowing between instance variables and local parameters (e.g., this.rollNo = rollNo;).`,
        options: [
          'True',
          'False',
          'this refers to the parent operating system',
          'this can only be used inside static methods'
        ],
        correctIndex: 0,
        explanation: 'The "this" reference points to the current object instance invoking the constructor or instance method.',
        topic: 'The "this" Reference Keyword'
      },
      {
        text: `Match the String Method with its exact Output for String s = "  Java Exam 2026  "; :`,
        options: [
          's.trim() → "Java Exam 2026" | s.replace(\'a\', \'@\') → "  J@v@ Ex@m 2026  " | s.startsWith("  Java") → true',
          's.trim() → "JavaExam2026" (removes middle spaces too)',
          's.replace() returns an int',
          's.startsWith() returns a char'
        ],
        correctIndex: 0,
        explanation: 'trim() removes only leading and trailing whitespace (preserving internal spaces), replace() substitutes matching characters, and startsWith() returns a boolean.',
        topic: 'Advanced String Methods'
      },
      {
        text: `For a square 2D matrix int[][] M = new int[4][4]; (4×4 matrix with indices 0 to 3), which condition identifies elements on the LEFT (Principal) Diagonal and which identifies elements on the RIGHT (Secondary) Diagonal?`,
        options: [
          'Left Diagonal: row == col (i == j) | Right Diagonal: row + col == N - 1 (i + j == 3)',
          'Left Diagonal: i + j == 0 | Right Diagonal: i == j',
          'Left Diagonal: i > j | Right Diagonal: i < j',
          'Diagonals do not exist in a 4×4 matrix'
        ],
        correctIndex: 0,
        explanation: 'In an N×N matrix, principal diagonal elements have row index equal to column index (i == j), and secondary diagonal elements satisfy i + j == N - 1.',
        topic: '2D Matrix Diagonal Traversal'
      },
      {
        text: `Identify the INCORRECT statement regarding Pure (Accessor) Methods vs Impure (Mutator) Methods in Java:`,
        options: [
          'A Pure Function (Accessor) takes objects/parameters and returns a value without modifying the state of the received objects',
          'An Impure Function (Mutator) modifies the state (instance variables) of the calling object or received object parameters (side effects)',
          'Calling a pure function multiple times with the same arguments always produces the exact same result',
          'A Pure Function must always have a void return type and must delete all instance variables'
        ],
        correctIndex: 3,
        explanation: 'A pure function returns a computed value without side effects (cannot be void), whereas an impure (mutator) method alters object state.',
        topic: 'Pure (Accessor) vs Impure (Mutator) Methods'
      },
      {
        text: `Complete the Java loop analysis: How many times will the body of the nested loop execute?\nfor (int i = 1; i <= 3; i++) {\n  for (int j = 1; j <= i; j++) {\n    System.out.print("* ");\n  }\n}`,
        options: [
          '6 times (1 + 2 + 3 = 6 stars printed in a right-triangle pattern)',
          '9 times',
          '3 times',
          '12 times'
        ],
        correctIndex: 0,
        explanation: 'When i=1, j runs 1 time; when i=2, j runs 2 times; when i=3, j runs 3 times. Total executions = 1 + 2 + 3 = 6.',
        topic: 'Nested Loops & Pattern Printing'
      },
      {
        text: `What is the result of evaluating the Java expression: Math.pow(Math.floor(3.8), Math.round(1.6)) ?`,
        options: [
          '9.0 (since Math.floor(3.8) = 3.0 and Math.round(1.6) = 2, so Math.pow(3.0, 2) = 9.0)',
          '16.0',
          '6.0',
          '8.0'
        ],
        correctIndex: 0,
        explanation: 'Math.floor(3.8) is 3.0, Math.round(1.6) is 2, and Math.pow(3.0, 2) returns 9.0 (as a double).',
        topic: 'Nested Math Library Function Evaluation'
      },
      {
        text: `Look at the package box icon 📦. Which Java package is automatically imported by default into every Java program without writing an explicit import statement?`,
        options: [
          'java.lang (containing System, String, Math, Object, Integer, Character, etc.)',
          'java.util',
          'java.io',
          'java.awt'
        ],
        correctIndex: 0,
        diagramEmoji: '📦',
        explanation: 'The java.lang package is fundamental to the Java language and is implicitly imported by the compiler in every source file.',
        topic: 'Java Packages & java.lang'
      },
      {
        text: `Assertion (A): In Java, String objects are immutable (cannot be modified in-place once created), whereas StringBuffer / StringBuilder objects are mutable.\nReason (R): Whenever you concatenate or modify a String (e.g., s = s + "World"), Java creates a brand-new String object in memory rather than altering the existing character sequence.`,
        options: [
          'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
          'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
          '(A) is true, but (R) is false.',
          '(A) is false, but (R) is true.'
        ],
        correctIndex: 0,
        explanation: 'Java Strings are immutable for thread safety and String Pool efficiency; any modification creates a new String instance.',
        topic: 'String Immutability in Java'
      }
    ];
  }

  // ============================================================================
  // 29. ECONOMICS — 40 Unique Questions (10 per Level)
  // ============================================================================
  if (subject === 'Economics') {
    if (level === 1) {
      return [
        {
          text: `What are the four fundamental "Factors of Production" required to produce goods and services in an economy?`,
          options: [
            'Land, Labour, Physical Capital, and Enterprise (Human Capital / Entrepreneurship)',
            'Only Money and Gold',
            'Imports, Exports, Taxes, and Subsidies',
            'Clouds, Rain, Wind, and Sunlight only'
          ],
          correctIndex: 0,
          explanation: 'Production combines Land (natural resources), Labour (human effort), Capital (tools, machines, working funds), and Enterprise (organization & risk-taking).',
          topic: 'Factors of Production'
        },
        {
          text: `Fill in the blank: According to the "Law of Demand", other things remaining constant (ceteris paribus), when the price of a commodity rises, the quantity demanded of it _____.`,
          options: [
            'Falls (Decreases) — showing an inverse relationship between price and quantity demanded',
            'Doubles immediately',
            'Remains infinite',
            'Increases tenfold'
          ],
          correctIndex: 0,
          explanation: 'The Law of Demand states that price and quantity demanded move in opposite directions (downward-sloping demand curve).',
          topic: 'Law of Demand'
        },
        {
          text: `True or False: In the Barter System (before the invention of money), trade required a "Double Coincidence of Wants", meaning both parties had to simultaneously want to buy what the other party was selling.`,
          options: [
            'True',
            'False',
            'Barter used UPI QR codes',
            'Barter used paper cheques'
          ],
          correctIndex: 0,
          explanation: 'Money acts as an intermediate Medium of Exchange, eliminating the difficult requirement of Double Coincidence of Wants.',
          topic: 'Evolution of Money & Barter System'
        },
        {
          text: `Match the Factor of Production with its Economic Reward (Factor Income):`,
          options: [
            'Land → Rent | Labour → Wages / Salaries | Capital → Interest | Entrepreneur → Profit',
            'Land → Profit | Labour → Rent',
            'Capital → Wages | Entrepreneur → Tax',
            'All factors receive only rent'
          ],
          correctIndex: 0,
          explanation: 'In microeconomics, Rent rewards Land, Wages reward Labour, Interest rewards Capital, and Profit rewards Entrepreneurship.',
          topic: 'Factor Incomes (Rent, Wages, Interest, Profit)'
        },
        {
          text: `What is the difference between "Fixed Capital" and "Working Capital" in production?`,
          options: [
            'Fixed Capital includes durable assets used over many years (machines, factory buildings, tractors), while Working Capital includes raw materials and cash in hand used up during production',
            'Fixed Capital is used up in one day and Working Capital lasts 100 years',
            'Both mean household groceries',
            'Working Capital means broken machinery'
          ],
          correctIndex: 0,
          explanation: 'Tools, machines, and buildings are Fixed Capital; raw materials (like yarn for a weaver) and liquid cash for daily expenses are Working Capital.',
          topic: 'Physical Capital – Fixed vs Working Capital'
        },
        {
          text: `Identify the activity that belongs to the TERTIARY (Service) Sector of the economy:`,
          options: [
            'Transport, Banking, Insurance, Healthcare, Education, and IT Services',
            'Growing wheat on a farm',
            'Extracting coal from an underground mine',
            'Manufacturing steel sheets in a blast furnace'
          ],
          correctIndex: 0,
          explanation: 'Banking, transport, communication, teaching, and medical care provide intangible services rather than physical goods, forming the Tertiary Sector.',
          topic: 'Primary, Secondary & Tertiary Sectors'
        },
        {
          text: `Complete the sentence: According to the "Law of Supply", other things remaining equal, a rise in the market price of a commodity leads to an _____ in the quantity supplied by producers.`,
          options: [
            'Increase (Expansion) — showing a direct (positive) relationship between price and quantity supplied',
            'Immediate stop in production',
            'Decrease to zero',
            'Inverse relationship'
          ],
          correctIndex: 0,
          explanation: 'Higher prices incentivize producers to supply more, resulting in an upward-sloping supply curve.',
          topic: 'Law of Supply'
        },
        {
          text: `Which sector of employment in India is registered with the government and follows labour laws such as the Minimum Wages Act, Factories Act, paid leave, provident fund, and job security?`,
          options: [
            'Organized (Formal) Sector',
            'Unorganized (Informal) Sector',
            'Barter Sector',
            'Subsistence Sector'
          ],
          correctIndex: 0,
          explanation: 'The Organized Sector offers regular terms of employment, statutory social security benefits, and regulated working hours.',
          topic: 'Organized vs Unorganized Sector'
        },
        {
          text: `Look at the rupee symbol ₹. Why is modern paper currency (like the Indian Rupee issued by the RBI) called "Fiat Money" and "Legal Tender"?`,
          options: [
            'Because it is authorized by government decree (fiat) and by law no one in India can legally refuse it as a medium of payment for settling transactions',
            'Because each ₹500 note is made of 10 grams of solid gold',
            'Because private shops print their own notes',
            'Because it can only be used in foreign countries'
          ],
          correctIndex: 0,
          diagramEmoji: '₹',
          explanation: 'Modern currency has no intrinsic commodity value of its own (unlike gold coins), deriving its value from RBI/Government guarantee as Legal Tender.',
          topic: 'Modern Forms of Money & Legal Tender'
        },
        {
          text: `What do we call an asset (such as land title, house, vehicle, gold, or fixed deposit) that a borrower owns and pledges to a bank as a security guarantee until a loan is repaid?`,
          options: [
            'Collateral',
            'Dividend',
            'Subsidy',
            'Depreciation'
          ],
          correctIndex: 0,
          explanation: 'Collateral is a security asset pledged against a loan; if the borrower defaults, the lender has the right to sell the collateral to recover the loan.',
          topic: 'Terms of Credit & Collateral'
        }
      ];
    }

    if (level === 2) {
      return [
        {
          text: `How do Commercial Banks generate their main source of income while mediating between depositors (who have surplus funds) and borrowers (who need funds)?`,
          options: [
            'They charge a higher rate of interest on loans given to borrowers than the interest rate they pay to depositors on deposits (the spread)',
            'They confiscate all depositors’ savings permanently',
            'They charge 0% interest on all loans',
            'They print their own currency notes'
          ],
          correctIndex: 0,
          explanation: 'Banks keep a small fraction of deposits as cash reserves (CRR) and lend out the major portion, earning the difference between lending and deposit interest rates.',
          topic: 'Loan Activities of Commercial Banks'
        },
        {
          text: `Fill in the blank: A sustained, continuous rise in the general price level of goods and services in an economy over time (which reduces the purchasing power of money) is called _____.`,
          options: ['Inflation', 'Deflation', 'Barter', 'Privatization'],
          correctIndex: 0,
          explanation: 'Inflation measures the rate at which the general price level rises (measured in India primarily via the Consumer Price Index – CPI).',
          topic: 'Inflation & Purchasing Power'
        },
        {
          text: `True or False: Substitute Goods (like Tea and Coffee) can be used in place of each other, whereas Complementary Goods (like a Car and Petrol, or Pen and Ink) are used jointly together to satisfy a want.`,
          options: [
            'True',
            'False',
            'Tea and Petrol are substitute goods',
            'Complementary goods have no connection'
          ],
          correctIndex: 0,
          explanation: 'For substitutes, a rise in the price of Tea increases the demand for Coffee; for complements, a rise in Petrol prices reduces the demand for petrol cars.',
          topic: 'Substitute vs Complementary Goods'
        },
        {
          text: `Match the Type of Tax with its Economic Definition and Example:`,
          options: [
            'Direct Tax → Burden cannot be shifted; paid directly by the person on whom it is levied (Income Tax, Corporate Tax) | Indirect Tax → Burden is shifted to final consumers on goods/services (GST, Customs Duty)',
            'Direct Tax → GST on biscuits | Indirect Tax → Personal Income Tax',
            'All taxes in India are optional tips',
            'Indirect taxes are paid only by foreign tourists'
          ],
          correctIndex: 0,
          explanation: 'In Direct Taxes (Income Tax), impact and incidence fall on the same person; in Indirect Taxes (GST), the seller collects the tax from the buyer.',
          topic: 'Public Finance – Direct vs Indirect Taxes (GST)'
        },
        {
          text: `Which sector has emerged as the LARGEST producing sector in terms of contribution to India's total GDP over the last two decades, even though the Primary Sector still employs the largest share of the workforce?`,
          options: [
            'The Tertiary (Service) Sector',
            'The Hunting and Gathering Sector',
            'The Handicrafts Sector',
            'The Forestry Sector'
          ],
          correctIndex: 0,
          explanation: 'The Tertiary (Services) sector contributes over 50% of India’s GDP, driven by banking, IT, telecommunications, trade, transport, and public administration.',
          topic: 'Structural Transformation of the Indian Economy'
        },
        {
          text: `Identify the INCORRECT comparison between Formal Sector Credit and Informal Sector Credit in India:`,
          options: [
            'Formal sector lenders include Commercial Banks, Regional Rural Banks (RRBs), and Cooperative Societies supervised by the RBI',
            'Informal sector lenders include local moneylenders, traders, and landlords who are NOT supervised by any regulatory organization',
            'Informal moneylenders often charge exorbitant interest rates that can trap poor farmers in a "Debt Trap"',
            'Informal moneylenders are strictly regulated by the RBI and always charge 1% annual interest'
          ],
          correctIndex: 3,
          explanation: 'Informal lenders operate outside RBI supervision and charge very high interest rates, making expansion of formal banking credit essential for rural development.',
          topic: 'Formal vs Informal Sector Credit in India'
        },
        {
          text: `Complete the Agricultural Economics term: Growing more than one crop on the same piece of agricultural land during a single year (such as Kharif Jowar, Rabi Wheat, and Potatoes in Palampur) is known as _____.`,
          options: [
            'Multiple Cropping',
            'Deforestation',
            'Desertification',
            'Mining'
          ],
          correctIndex: 0,
          explanation: 'Multiple cropping is the most common traditional way of increasing agricultural production on a fixed piece of land.',
          topic: 'Organization of Production & Multiple Cropping'
        },
        {
          text: `What is the "Minimum Support Price (MSP)" announced by the Government of India before the sowing season?`,
          options: [
            'A pre-announced floor price at which the Government (via FCI) purchases crops from farmers to protect them against sharp price drops and build Buffer Stock for the Public Distribution System (PDS)',
            'The maximum price a luxury hotel can charge',
            'A tax imposed on school textbooks',
            'The price of imported electronics'
          ],
          correctIndex: 0,
          explanation: 'FCI procures wheat and rice at the Minimum Support Price (MSP) to maintain Buffer Stock and distribute foodgrains through Fair Price (Ration) Shops.',
          topic: 'Food Security – Buffer Stock, MSP & PDS'
        },
        {
          text: `Look at the globe trade icon 🌐. What was the landmark "New Economic Policy (LPG Reforms)" introduced in India in July 1991?`,
          options: [
            'Liberalization, Privatization, and Globalization — removing industrial licensing barriers, reducing import tariffs, and opening the Indian economy to global trade and investment',
            'Liquid Petroleum Gas distribution only',
            'Closing all Indian ports to foreign ships',
            'Banning all private companies in India'
          ],
          correctIndex: 0,
          diagramEmoji: '🌐',
          explanation: 'The 1991 LPG reforms removed the License-Permit Raj (Liberalization), expanded the private sector (Privatization), and integrated India with the world economy (Globalization).',
          topic: '1991 Economic Reforms (Liberalization, Privatization, Globalization)'
        },
        {
          text: `If Country A has a high Per Capita Income where 2% of people earn ₹1 crore and 98% earn ₹5,000, while Country B has the same Per Capita Income distributed equitably among all citizens, what limitation of "Average Income" does this illustrate?`,
          options: [
            'Average (Per Capita) Income hides disparities in income distribution — it does not show how equitably income is distributed among citizens',
            'Average income is impossible to calculate mathematically',
            'Country A has zero population',
            'Per capita income measures only literacy rate'
          ],
          correctIndex: 0,
          explanation: 'While averages are useful for comparison, they conceal extreme income inequality within a country.',
          topic: 'Per Capita Income & Income Distribution'
        }
      ];
    }

    if (level === 3) {
      return [
        {
          text: `What is "Price Elasticity of Demand (Ed)" and when is demand said to be "Perfectly Inelastic (Ed = 0)" (such as life-saving insulin or salt)?`,
          options: [
            'It measures the degree of responsiveness of quantity demanded to a change in price; demand is Perfectly Inelastic (Ed = 0) when quantity demanded does NOT change at all despite a change in price',
            'It measures the weight of a product in grams',
            'Perfectly inelastic means demand drops to zero if price rises by ₹1',
            'Elasticity only applies to gold coins'
          ],
          correctIndex: 0,
          explanation: 'Ed = (% change in quantity demanded) / (% change in price). For essential necessities with no substitutes, Ed approaches 0 (vertical demand curve).',
          topic: 'Price Elasticity of Demand'
        },
        {
          text: `Fill in the blank: The Central Bank of India (RBI) controls money supply and inflation using Quantitative Monetary Policy tools such as Repo Rate, Reverse Repo Rate, Cash Reserve Ratio (CRR), and _____ Ratio (SLR).`,
          options: [
            'Statutory Liquidity',
            'Seasonal Labour',
            'Standard Land',
            'Simple Loan'
          ],
          correctIndex: 0,
          explanation: 'CRR (cash kept with RBI) and SLR (Statutory Liquidity Ratio — liquid assets kept by banks themselves) are key reserve ratios used by the RBI.',
          topic: 'Central Banking – Monetary Policy Tools (Repo, CRR, SLR)'
        },
        {
          text: `True or False: "Seasonal Unemployment" occurs when workers find jobs only during busy months of the year (such as sowing, harvesting, or sugar mill crushing seasons) and remain unemployed during the remaining months.`,
          options: [
            'True',
            'False',
            'Seasonal unemployment happens only to software CEOs',
            'Agriculture has identical labour demand every single hour of the year'
          ],
          correctIndex: 0,
          explanation: 'Seasonal unemployment is prevalent in agriculture and agro-based industries that depend on seasonal crop cycles.',
          topic: 'Types of Unemployment (Seasonal, Disguised, Educated)'
        },
        {
          text: `Match the Market Structure with its Defining Characteristic:`,
          options: [
            'Perfect Competition → Large number of buyers & sellers selling homogeneous products at uniform price | Monopoly → Single seller with no close substitutes | Oligopoly → Few dominant large firms',
            'Monopoly → Millions of identical small sellers',
            'Perfect Competition → Only one seller in the entire country',
            'Oligopoly → Zero sellers'
          ],
          correctIndex: 0,
          explanation: 'Market forms are classified by the number of firms, nature of product, and control over price (Perfect Competition, Monopoly, Monopolistic Competition, Oligopoly).',
          topic: 'Forms of Market (Perfect Competition, Monopoly, Oligopoly)'
        },
        {
          text: `What is the role of the World Trade Organization (WTO), headquartered in Geneva, Switzerland?`,
          options: [
            'To establish rules for international trade and promote free, fair, and non-discriminatory multilateral trade among member nations by reducing trade barriers',
            'To print Indian Rupee notes',
            'To run village primary schools',
            'To ban all exports between countries'
          ],
          correctIndex: 0,
          explanation: 'Established in 1995 (succeeding GATT), the WTO administers global trade agreements and resolves international trade disputes.',
          topic: 'World Trade Organization (WTO) & International Trade'
        },
        {
          text: `Identify the INCORRECT statement regarding the Government Budget and Fiscal Policy:`,
          options: [
            'A Government Budget is an annual financial statement showing estimated receipts (revenue) and estimated expenditure for the upcoming fiscal year (1 April to 31 March)',
            'Revenue Receipts include tax revenue (Income Tax, GST) and non-tax revenue (fees, dividends from PSUs)',
            'Capital Expenditure creates long-term physical or financial assets such as highways, bridges, hospitals, and schools',
            'Fiscal Policy is formulated and presented in Parliament by private shopkeepers instead of the Ministry of Finance'
          ],
          correctIndex: 3,
          explanation: 'Fiscal Policy (taxation, public expenditure, and public borrowing) is formulated by the Government of India (Ministry of Finance), whereas Monetary Policy is managed by the RBI.',
          topic: 'Government Budget – Revenue vs Capital Receipts & Expenditure'
        },
        {
          text: `Complete the formula: Per Capita Income (Average Income) of a country is calculated by dividing the _____ of the country by its Total Population.`,
          options: [
            'Total National Income',
            'Total Land Area in sq km',
            'Total Number of Banks',
            'Total Exports only'
          ],
          correctIndex: 0,
          explanation: 'Per Capita Income = Total National Income ÷ Total Population.',
          topic: 'National Income & Per Capita Income Calculation'
        },
        {
          text: `In India's Public Distribution System (PDS), which targeted scheme launched in December 2000 provides highly subsidized foodgrains to the "Poorest of the Poor" families?`,
          options: [
            'Antyodaya Anna Yojana (AAY)',
            'Make in India',
            'Digital India',
            'Smart Cities Mission'
          ],
          correctIndex: 0,
          explanation: 'Antyodaya Anna Yojana (AAY) targets the poorest families among BPL households to ensure complete food security.',
          topic: 'Public Distribution System & Antyodaya Anna Yojana'
        },
        {
          text: `Look at the upward trend icon 📈. Why does a normal Demand Curve slope downward from left to right?`,
          options: [
            'Due to the Law of Diminishing Marginal Utility, the Income Effect (real purchasing power rises when price falls), and the Substitution Effect',
            'Because consumers prefer to buy more when prices become 100 times more expensive',
            'Because supply is always zero',
            'Because income is always negative'
          ],
          correctIndex: 0,
          diagramEmoji: '📈',
          explanation: 'Diminishing marginal utility, the income effect, and the substitution effect explain why consumers buy larger quantities at lower prices.',
          topic: 'Reasons for Downward-Sloping Demand Curve'
        },
        {
          text: `Distinguish between "Shift in Demand (Increase/Decrease in Demand)" and "Movement Along the Same Demand Curve (Expansion/Contraction of Demand)":`,
          options: [
            'Movement along the curve is caused ONLY by a change in the commodity’s own price; a Shift of the entire demand curve is caused by changes in non-price factors (consumer income, tastes, or price of related goods)',
            'Both are caused only by weather changes',
            'Change in own price shifts the entire curve to a new page',
            'Consumer income has zero effect on demand'
          ],
          correctIndex: 0,
          explanation: 'Own-price changes cause Expansion/Contraction along the curve, whereas changes in income, tastes, or substitute prices shift the entire demand curve rightward or leftward.',
          topic: 'Expansion/Contraction vs Shift in Demand'
        }
      ];
    }

    // Level 4: Expert Challenge (Economics)
    return [
      {
        text: `In a family farm of 2 hectares, 5 members are working and producing 20 quintals of wheat. Even if 2 members move out to work in a town factory, the remaining 3 members still produce the exact same 20 quintals of wheat. What is the Marginal Productivity of the 2 extra workers, and what economic concept is this?`,
        options: [
          'Marginal Productivity is Zero (0); this is a classic case of Disguised Unemployment (underemployment)',
          'Marginal Productivity is 20 quintals each; this is Full Employment',
          'Marginal Productivity is 100 quintals; this is Industrial Boom',
          'This is frictional unemployment in the IT sector'
        ],
        correctIndex: 0,
        explanation: 'When extra workers add zero to total output (Marginal Physical Product = 0), they are disguisedly unemployed.',
        topic: 'Marginal Productivity & Disguised Unemployment'
      },
      {
        text: `Fill in the blank: When the Reserve Bank of India (RBI) wants to curb high inflation in the economy, it _____ the Repo Rate and Cash Reserve Ratio (CRR) to make borrowing costlier and reduce excess money supply (Dear Money Policy).`,
        options: [
          'Increases (Raises)',
          'Reduces to zero',
          'Abolishes',
          'Ignores'
        ],
        correctIndex: 0,
        explanation: 'Raising the Repo Rate and CRR reduces commercial banks’ lendable resources and raises loan interest rates, dampening excess aggregate demand and inflation.',
        topic: 'Anti-Inflationary Monetary Policy of RBI'
      },
      {
        text: `True or False: "Division of Labour" (specialization where a complex production process is broken down into distinct tasks performed by specialized workers) increases labour productivity, saves time, and facilitates the use of specialized machinery.`,
        options: [
          'True',
          'False',
          'Division of labour reduces output to zero',
          'It was banned by Adam Smith'
        ],
        correctIndex: 0,
        explanation: 'As famously analyzed by Adam Smith in "The Wealth of Nations", division of labour boosts efficiency, skill mastery, and output.',
        topic: 'Efficiency of Labour & Division of Labour'
      },
      {
        text: `Match the Consumer Protection Concept with its Official Detail in India:`,
        options: [
          'National Consumer Day → 24 December | World Consumer Rights Day → 15 March | Three-Tier Consumer Commissions → District, State, and National (NCDRC) | Hallmark → Gold/Silver Purity',
          'National Consumer Day → 1 April | Hallmark → Agricultural Wheat',
          'AGMARK → Computer Software',
          'Consumer courts exist only in New Delhi'
        ],
        correctIndex: 0,
        explanation: 'India observes National Consumer Day on 24 December (enactment of COPRA 1986), with a 3-tier quasi-judicial redressal machinery at District, State, and National levels.',
        topic: 'Consumer Protection Redressal Machinery & Quality Marks'
      },
      {
        text: `In calculating Gross Domestic Product (GDP), a farmer sells wheat to a flour mill for ₹20/kg, the mill grinds it and sells flour to a biscuit company for ₹25/kg, and the biscuit company uses sugar/oil to sell final biscuits to consumers for ₹80. Which value is included in GDP to avoid the problem of "Double Counting"?`,
        options: [
          'Only ₹80 (the value of the FINAL good — biscuits — which already includes the value of intermediate goods wheat and flour, OR the sum of Value Added at each stage)',
          '₹20 + ₹25 + ₹80 = ₹125 (counting wheat and flour three times)',
          'Only ₹20',
          'Zero rupees'
        ],
        correctIndex: 0,
        explanation: 'Counting intermediate goods separately along with the final good overstates national income (double counting); only final goods or sum of Value Added is counted.',
        topic: 'Value Added Method & Avoiding Double Counting in GDP'
      },
      {
        text: `Identify the INCORRECT statement regarding Capital Formation and Economic Growth:`,
        options: [
          'Capital Formation refers to the net addition to the existing stock of productive physical capital (machinery, infrastructure, factories) in an economy',
          'The three stages of Capital Formation are: (1) Creation of Savings, (2) Mobilization of Savings through banks/financial institutions, and (3) Investment in productive capital assets',
          'High rates of domestic savings and productive investment accelerate economic growth',
          'Hoarding cash idle inside a locked wooden box at home immediately increases industrial machinery in the country'
        ],
        correctIndex: 3,
        explanation: 'Idle hoarded cash does not contribute to capital formation unless mobilized through the financial system and invested in productive assets.',
        topic: 'Process of Capital Formation (Savings, Mobilization, Investment)'
      },
      {
        text: `Complete the Fiscal concept: A tax system in which the tax rate INCREASES as the taxable income increases (so higher-income earners pay a higher percentage of their income as tax, such as India's Income Tax slabs) is called a _____ tax.`,
        options: [
          'Progressive',
          'Regressive',
          'Proportional',
          'Poll'
        ],
        correctIndex: 0,
        explanation: 'A Progressive Tax taxes higher income slabs at higher rates based on ability to pay, reducing income inequality.',
        topic: 'Progressive, Proportional & Regressive Taxation'
      },
      {
        text: `Suppose a consumer's demand for a commodity rises from 100 units to 140 units (+40%) when its price falls from ₹20 to ₹16 (-20%). Calculate the numerical Price Elasticity of Demand (|Ed| = %ΔQ / %ΔP):`,
        options: [
          'Ed = 2.0 (Relatively Elastic Demand, since 40% ÷ 20% = 2.0 > 1)',
          'Ed = 0.5 (Inelastic Demand)',
          'Ed = 1.0 (Unitary Elastic)',
          'Ed = 0'
        ],
        correctIndex: 0,
        explanation: '% change in Q = (40/100)×100 = 40%; % change in P = (4/20)×100 = 20%. |Ed| = 40% / 20% = 2.0 (Elastic).',
        topic: 'Numerical Calculation of Price Elasticity of Demand'
      },
      {
        text: `Look at the green leaf / factory icon 🌱. Why do economists emphasize "Sustainable Economic Development" (as defined by the Brundtland Commission)?`,
        options: [
          'Because development must meet the needs of the present generation without compromising the ability of future generations to meet their own needs (conserving groundwater, clean air, and non-renewable resources)',
          'Because exhausting all groundwater and crude oil in 5 years is the best policy',
          'Because environmental pollution has no cost to society',
          'Because sustainable development bans all schools and hospitals'
        ],
        correctIndex: 0,
        diagramEmoji: '🌱',
        explanation: 'Sustainable development balances economic growth with environmental conservation and inter-generational equity.',
        topic: 'Sustainability of Development'
      },
      {
        text: `Assertion (A): Cheap and affordable formal sector credit is crucial for the country's economic development.\nReason (R): High borrowing costs in the informal sector mean that most of the borrower's earnings go toward repaying interest, leaving little income for investment and sometimes pushing farmers into a debt trap.`,
        options: [
          'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
          'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
          '(A) is true, but (R) is false.',
          '(A) is false, but (R) is true.'
        ],
        correctIndex: 0,
        explanation: 'Affordable credit from banks and cooperatives allows farmers and small entrepreneurs to invest in crops, machinery, and businesses, boosting national output.',
        topic: 'Role of Credit in Economic Development'
      }
    ];
  }

  // ============================================================================
  // 30. COMMERCIAL STUDIES — 40 Unique Questions (10 per Level, ICSE Classes 9–10)
  // ============================================================================
  if (subject === 'Commercial Studies') {
    if (level === 1) {
      return [
        {
          text: `What is the fundamental distinction between "Economic (Commercial) Activities" and "Non-Economic Activities"?`,
          options: [
            'Economic activities are undertaken with the objective of earning a livelihood or financial profit (Business, Profession, Employment), whereas Non-Economic activities are performed out of love, sympathy, or patriotism',
            'Cooking food for one’s own children at home is a commercial factory activity',
            'Donating blood voluntarily is a commercial business',
            'There is no difference between the two'
          ],
          correctIndex: 0,
          explanation: 'Human activities are classified into Economic (commercial/income-generating) and Non-Economic (social, religious, parental affection).',
          topic: 'Commercial vs Non-Commercial Activities'
        },
        {
          text: `Fill in the blank: Economic activities are broadly classified into three categories: Business (trade/industry involving risk and profit), Profession (specialized expert service like Doctor/CA/Lawyer), and _____ (working for an employer for wages or salary).`,
          options: ['Employment (Service)', 'Charity', 'Hobby', 'Sleeping'],
          correctIndex: 0,
          explanation: 'Business yields Profit, Profession yields Professional Fee, and Employment yields Wage or Salary under a contract of service.',
          topic: 'Business, Profession and Employment'
        },
        {
          text: `True or False: A "Sole Proprietorship" is a form of business organization owned, managed, and controlled by a single individual who receives all profits and bears unlimited personal liability for all losses.`,
          options: [
            'True',
            'False',
            'A Sole Proprietorship requires at least 500 shareholders',
            'It is owned by the United Nations'
          ],
          correctIndex: 0,
          explanation: 'Sole Proprietorship is the oldest and simplest form of business with single ownership, quick decision-making, and unlimited liability.',
          topic: 'Sole Proprietorship'
        },
        {
          text: `Match the Branch of Commerce with its Role in Overcoming Hindrances of Trade:`,
          options: [
            'Transport → Hindrance of Place | Warehousing → Hindrance of Time | Insurance → Hindrance of Risk | Banking → Hindrance of Finance | Advertising → Hindrance of Information',
            'Transport → Hindrance of Finance | Banking → Hindrance of Place',
            'Warehousing → Creates risk',
            'Aids to trade stop goods from reaching consumers'
          ],
          correctIndex: 0,
          explanation: 'Commerce = Trade + Aids to Trade (Auxiliaries to Trade), which remove hindrances of person, place, time, risk, finance, and knowledge.',
          topic: 'Commerce – Trade and Aids to Trade'
        },
        {
          text: `What is the difference between "Wholesale Trade" and "Retail Trade" in Internal (Home) Trade?`,
          options: [
            'A Wholesaler buys goods in bulk quantities directly from manufacturers and sells to retailers, whereas a Retailer buys in smaller lots from wholesalers and sells in small quantities directly to final consumers',
            'A Retailer sells only to factories in foreign countries',
            'A Wholesaler sells 1 biscuit at a time to school children',
            'Both are international shipping companies'
          ],
          correctIndex: 0,
          explanation: 'Wholesalers serve as the link between manufacturers and retailers; retailers are the final link to consumers.',
          topic: 'Wholesale Trade vs Retail Trade'
        },
        {
          text: `Identify the INCORRECT statement regarding a "Partnership" firm in India (governed by the Indian Partnership Act, 1932):`,
          options: [
            'A partnership is formed by a mutual agreement (Partnership Deed) between two or more persons to share profits of a lawful business',
            'The written document containing the terms and conditions of partnership is called the Partnership Deed',
            'In a general partnership, partners have unlimited liability (jointly and severally)',
            'A single person alone can form a Partnership firm with himself'
          ],
          correctIndex: 3,
          explanation: 'A partnership requires a minimum of 2 persons (and up to 50 partners under the Companies Act rules).',
          topic: 'Partnership Organization'
        },
        {
          text: `Complete the foreign trade term: When a trading firm in Mumbai imports electronic components from Japan with the specific purpose of re-exporting them to Dubai (after minor processing or repacking), this type of foreign trade is called _____ trade.`,
          options: [
            'Entrepot (Re-export) Trade',
            'Retail Trade',
            'Village Haat Trade',
            'Barter Trade'
          ],
          correctIndex: 0,
          explanation: 'External (Foreign) Trade consists of Import Trade, Export Trade, and Entrepot (Re-export) Trade.',
          topic: 'External Trade – Import, Export & Entrepot'
        },
        {
          text: `In a "Cooperative Society" (such as Amul Dairy Cooperative), what is the fundamental democratic voting principle followed regardless of the number of shares held by a member?`,
          options: [
            '"One Member, One Vote" (service motive over profit maximization)',
            '"One Share, Ten Votes"',
            'Only the richest member can vote',
            'Voting is prohibited'
          ],
          correctIndex: 0,
          explanation: 'Cooperative societies operate on mutual self-help ("Each for all and all for each") and democratic management ("One Man, One Vote").',
          topic: 'Cooperative Societies'
        },
        {
          text: `Look at the accounting ledger icon 📒. In Double-Entry Bookkeeping, every business transaction affects at least two accounts: for every Debit (Dr.), there must be an equal and corresponding _____.`,
          options: [
            'Credit (Cr.)',
            'Penalty',
            'Discount',
            'Tax'
          ],
          correctIndex: 0,
          diagramEmoji: '📒',
          explanation: 'Propounded by Luca Pacioli in 1494, the Double-Entry System states that every debit has a corresponding and equal credit.',
          topic: 'Introduction to Accounting & Double-Entry System'
        },
        {
          text: `Who are "Stakeholders" in a business organization, and how do "Internal Stakeholders" differ from "External Stakeholders"?`,
          options: [
            'Stakeholders are all groups affected by a business; Internal Stakeholders operate inside the firm (Shareholders/Owners, Employers, Employees), while External Stakeholders are outside (Customers, Suppliers, Creditors, Government, Society)',
            'Stakeholders and Shareholders have the exact same meaning',
            'Customers are internal owners of the factory',
            'Competitors are the only stakeholders'
          ],
          correctIndex: 0,
          explanation: 'Every shareholder is a stakeholder, but not every stakeholder (like customers, suppliers, community) is a shareholder.',
          topic: 'Stakeholders in Commercial Organizations'
        }
      ];
    }

    if (level === 2) {
      return [
        {
          text: `State the Three Golden Rules of Accounting for Personal, Real, and Nominal Accounts:`,
          options: [
            'Personal: Debit the Receiver, Credit the Giver | Real: Debit what comes in, Credit what goes out | Nominal: Debit all expenses & losses, Credit all incomes & gains',
            'Personal: Debit expenses | Real: Debit the giver | Nominal: Credit what goes out',
            'All accounts are always debited only',
            'Real accounts record only salaries and rent'
          ],
          correctIndex: 0,
          explanation: 'Traditional classification divides accounts into Personal (individuals/firms), Real (tangible/intangible assets), and Nominal (expenses, losses, incomes, gains).',
          topic: 'Golden Rules of Accounting'
        },
        {
          text: `Fill in the blank: The book of "Original Entry" (Prime Entry) in which business transactions are recorded first in chronological (date-wise) order as they occur is called the _____, and the book of "Final Entry" containing classified accounts is the Ledger.`,
          options: ['Journal', 'Balance Sheet', 'Passbook', 'Invoice'],
          correctIndex: 0,
          explanation: 'Transactions are first journalized chronologically in the Journal and then posted to respective accounts in the Ledger.',
          topic: 'Journal and Ledger'
        },
        {
          text: `True or False: A "Joint Stock Company" is an artificial legal person created by law, having a separate legal entity distinct from its members, perpetual succession, a common seal, and limited liability for its shareholders.`,
          options: [
            'True',
            'False',
            'A company dies if one shareholder sells a share',
            'Shareholders have unlimited personal liability'
          ],
          correctIndex: 0,
          explanation: 'Incorporation under the Companies Act gives a Joint Stock Company separate legal personality, perpetual existence, and limited shareholder liability.',
          topic: 'Joint Stock Company – Features & Merits'
        },
        {
          text: `Match the Type of Bank Account with its Key Feature:`,
          options: [
            'Current Account → For businessmen; frequent transactions, overdraft facility, no interest paid | Savings Account → Encourages household thrift | Fixed Deposit (FD) → Lump sum locked for fixed tenure at high interest | Recurring Deposit (RD) → Fixed monthly deposit',
            'Current Account → Highest 15% interest for school children',
            'Fixed Deposit → Withdraw 50 times a day via cheque',
            'All bank accounts are identical'
          ],
          correctIndex: 0,
          explanation: 'Current accounts serve business liquidity with overdraft privileges, while Savings, FD, and RD accounts serve savers with varying interest rates.',
          topic: 'Types of Commercial Bank Accounts'
        },
        {
          text: `What is a "Trial Balance" in Accounting, and why is it prepared at the end of an accounting period?`,
          options: [
            'A statement showing the debit and credit balances of all Ledger accounts to verify the arithmetical accuracy of ledger posting before preparing Final Accounts',
            'A legal court trial for employees',
            'A list of employee attendance',
            'A physical weighing scale in a warehouse'
          ],
          correctIndex: 0,
          explanation: 'If the total of the Debit column equals the total of the Credit column in the Trial Balance, it indicates arithmetical accuracy of ledger postings.',
          topic: 'Trial Balance – Objectives & Preparation'
        },
        {
          text: `Identify the INCORRECT statement regarding "Marketing" vs "Selling":`,
          options: [
            'Selling focuses on the seller’s need to convert products into cash ("Caveat Emptor" — Let the buyer beware)',
            'Marketing is customer-oriented, beginning before production with market research and continuing after sales with customer satisfaction ("Caveat Venditor")',
            'The 4 Ps of the Marketing Mix are Product, Price, Place (Distribution), and Promotion',
            'Marketing and Selling are 100% identical and marketing ends the moment a product is manufactured in the factory'
          ],
          correctIndex: 3,
          explanation: 'Selling is merely one part of Marketing; Marketing is a holistic customer-centric philosophy encompassing product design, pricing, distribution, promotion, and after-sales service.',
          topic: 'Marketing vs Selling & Marketing Mix'
        },
        {
          text: `Complete the Insurance principle: The Principle of "_____" (Uberrimae Fidei) requires both the insured and the insurance company to disclose all material facts honestly and accurately when entering into an insurance contract.`,
          options: [
            'Utmost Good Faith',
            'Secret Concealment',
            'Double Profit',
            'Unlimited Speculation'
          ],
          correctIndex: 0,
          explanation: 'Uberrimae Fidei (Utmost Good Faith) obligates the proposer to disclose all relevant health/property facts accurately.',
          topic: 'Principles of Insurance'
        },
        {
          text: `What is the difference between an "Equity Share" and a "Preference Share" in Corporate Finance?`,
          options: [
            'Preference shareholders receive a fixed rate of dividend before equity shareholders and have priority in return of capital upon winding up, whereas Equity shareholders are the real risk-bearing owners with full voting rights and fluctuating dividends',
            'Equity shareholders receive fixed interest even if the company makes a huge loss',
            'Preference shareholders are the only ones allowed to vote on every resolution',
            'Shares are loans taken from a moneylender'
          ],
          correctIndex: 0,
          explanation: 'Equity shares represent permanent risk capital with voting control; Preference shares carry preferential rights to fixed dividends and capital repayment.',
          topic: 'Sources of Finance – Equity vs Preference Shares'
        },
        {
          text: `Look at the shopping cart icon 🛒. Classify the following E-Commerce transaction models: Amazon selling books to a student, a tyre manufacturer selling in bulk to an automobile company online, and a student selling a used bicycle to another student on OLX:`,
          options: [
            'B2C (Business-to-Consumer), B2B (Business-to-Business), and C2C (Consumer-to-Consumer)',
            'All three are C2C',
            'All three are B2B',
            'E-Commerce means buying from a physical village stall without internet'
          ],
          correctIndex: 0,
          diagramEmoji: '🛒',
          explanation: 'B2C is Business-to-Consumer, B2B is Business-to-Business wholesale/supply chain, and C2C is Consumer-to-Consumer peer marketplace.',
          topic: 'E-Commerce (B2B, B2C, C2C, G2C)'
        },
        {
          text: `Distinguish between "Advertising" and "Publicity" in Commercial Promotion:`,
          options: [
            'Advertising is a PAID form of non-personal promotion by an identified sponsor, whereas Publicity is non-paid news/media coverage not directly paid for by the sponsor',
            'Advertising is always free and anonymous',
            'Publicity is personal door-to-door selling by a salesperson',
            'Advertising is illegal in commerce'
          ],
          correctIndex: 0,
          explanation: 'Advertising involves paid space/time by an identified sponsor with full control over the message; Publicity is unpaid third-party media coverage.',
          topic: 'Advertising, Publicity & Sales Promotion'
        }
      ];
    }

    if (level === 3) {
      return [
        {
          text: `In Accounting, distinguish clearly between "Capital Expenditure" and "Revenue Expenditure":`,
          options: [
            'Capital Expenditure is incurred to acquire or improve fixed assets giving benefit over multiple accounting years (e.g., buying plant & machinery, building construction) and is shown on the Balance Sheet; Revenue Expenditure is incurred for day-to-day operations (e.g., rent, salaries, repairs) and is debited to the Trading/P&L Account',
            'Paying monthly electricity bills is a Capital Expenditure',
            'Buying a factory building is a daily Revenue Expense',
            'Both are recorded only in the Petty Cash Book'
          ],
          correctIndex: 0,
          explanation: 'Capital expenditure increases earning capacity over multiple years (Asset), while Revenue expenditure maintains current operations within the accounting year (Expense).',
          topic: 'Capital vs Revenue Expenditure & Receipts'
        },
        {
          text: `Fill in the blank: In Final Accounts of a manufacturing/trading concern, the _____ Account is prepared first to ascertain "Gross Profit or Gross Loss", followed by the "Profit and Loss Account" to ascertain "Net Profit or Net Loss".`,
          options: ['Trading', 'Suspense', 'Drawings', 'Depreciation'],
          correctIndex: 0,
          explanation: 'The Trading Account records direct expenses (Opening Stock, Purchases, Wages, Carriage Inwards) and Sales/Closing Stock to find Gross Profit.',
          topic: 'Final Accounts – Trading, P&L Account & Balance Sheet'
        },
        {
          text: `True or False: The "Principle of Indemnity" in Insurance states that the insured shall be compensated only up to the actual financial loss suffered (cannot make a profit out of a fire or marine loss), and this principle does NOT apply to Life Insurance.`,
          options: [
            'True',
            'False',
            'Life insurance is a contract of indemnity',
            'Indemnity allows claiming ₹1 crore for a ₹10,000 bicycle loss'
          ],
          correctIndex: 0,
          explanation: 'Fire and Marine insurance are contracts of strict indemnity (actual loss compensation), whereas human life cannot be measured in money, making Life Insurance a contingency contract.',
          topic: 'Principle of Indemnity & Insurable Interest'
        },
        {
          text: `Match the Functional Department of a Modern Business Organization with its Core Responsibility:`,
          options: [
            'Human Resource (HR) → Recruitment, Selection & Training | Finance & Accounts → Budgeting & Bookkeeping | Production → Manufacturing & Quality Control | Marketing & Sales → Market Research, Pricing & Distribution',
            'HR Department → Repairs factory boilers | Production → Audits tax returns',
            'Finance Department → Designs product packaging',
            'A company needs only one department'
          ],
          correctIndex: 0,
          explanation: 'Functional specialization divides enterprise operations into Production, Marketing/Sales, Finance/Accounts, Human Resources, and Purchasing/Stores.',
          topic: 'Functional Areas of Management (HR, Finance, Marketing, Production)'
        },
        {
          text: `What is the fundamental difference between a "Share" and a "Debenture"?`,
          options: [
            'A Share is part of the owned capital (shareholder is an owner receiving dividends out of profits), whereas a Debenture is a loan acknowledgement certificate (debenture-holder is a creditor receiving fixed interest whether the company makes a profit or not)',
            'Debenture-holders are the voting owners of the company',
            'Shareholders are external creditors who must be paid fixed interest',
            'There is no difference between Shares and Debentures'
          ],
          correctIndex: 0,
          explanation: 'Shares represent Owner’s Funds (Equity) earning dividends; Debentures represent Borrowed Funds (Debt) earning fixed contractual interest.',
          topic: 'Shares vs Debentures'
        },
        {
          text: `Identify the INCORRECT statement regarding Recruitment and Selection in Human Resource Management:`,
          options: [
            'Recruitment is a "positive process" of searching for prospective candidates and stimulating them to apply for jobs',
            'Selection is a "negative (eliminative) process" of screening applicants through tests and interviews to choose the best-suited candidates and reject the rest',
            'Internal sources of recruitment include Promotions and Transfers of existing employees',
            'External recruitment means promoting an existing clerk from the same office branch'
          ],
          correctIndex: 3,
          explanation: 'Promoting or transferring existing staff is an Internal source of recruitment; Campus interviews, Employment Exchanges, and Advertisements are External sources.',
          topic: 'HR Management – Recruitment, Selection & Training'
        },
        {
          text: `Complete the Banking term: A facility granted by a bank exclusively to Current Account holders allowing them to overdraw (withdraw) money up to a specified limit beyond their actual account balance for short-term working capital needs is called a _____.`,
          options: [
            'Bank Overdraft',
            'Fixed Deposit',
            'Demand Draft',
            'Postal Order'
          ],
          correctIndex: 0,
          explanation: 'Bank Overdraft is a short-term credit facility on Current Accounts where interest is charged only on the actual amount overdrawn for the number of days used.',
          topic: 'Short-Term Business Finance – Overdraft & Cash Credit'
        },
        {
          text: `In a Cash Book with Cash and Bank columns (Double-Column Cash Book), what is a "Contra Entry" (denoted by 'C' in the L.F. column)?`,
          options: [
            'A transaction that affects BOTH the Cash column and the Bank column simultaneously (i.e., Cash deposited into the Bank, or Cash withdrawn from the Bank for office use)',
            'Cash paid for office stationery',
            'Goods sold on credit to a customer',
            'Salary paid by cheque'
          ],
          correctIndex: 0,
          explanation: 'Contra entries (Cash deposited into bank: Bank A/c Dr. to Cash A/c; or Cash withdrawn for office use: Cash A/c Dr. to Bank A/c) appear on both sides of a Double/Triple Column Cash Book.',
          topic: 'Cash Book & Contra Entries'
        },
        {
          text: `Look at the balance scales icon ⚖️. What is the fundamental "Accounting Equation" that forms the foundation of every Balance Sheet?`,
          options: [
            'Assets = Liabilities + Capital (Owner’s Equity)',
            'Assets = Liabilities - Capital',
            'Capital = Assets + Liabilities',
            'Assets + Liabilities = Zero'
          ],
          correctIndex: 0,
          diagramEmoji: '⚖️',
          explanation: 'At all times, the total resources owned by a business (Assets) equal the claims of outsiders (Liabilities) plus the claims of the owner (Capital).',
          topic: 'The Accounting Equation & Balance Sheet'
        },
        {
          text: `What is "Deferred Revenue Expenditure" in Accounting? Give a classic example:`,
          options: [
            'A heavy revenue expenditure incurred in the current year whose benefit extends over several future years (e.g., ₹50 lakh spent on a massive initial advertising campaign to launch a new product), written off gradually over 3–5 years',
            'Purchasing freehold land for a factory',
            'Paying ₹100 for daily postage stamps',
            'Repaying a long-term bank loan'
          ],
          correctIndex: 0,
          explanation: 'Deferred Revenue Expenditure is revenue in nature, but because its benefit lasts for several years, it is amortized proportionately over those years.',
          topic: 'Deferred Revenue Expenditure'
        }
      ];
    }

    // Level 4: Expert Challenge (Commercial Studies)
    return [
      {
        text: `From the following figures of a trading firm, calculate the "Gross Profit" and "Net Profit":\nOpening Stock = ₹20,000 | Net Purchases = ₹80,000 | Direct Wages = ₹10,000 | Net Sales = ₹1,50,000 | Closing Stock = ₹30,000 | Indirect Office & Selling Expenses = ₹25,000:`,
        options: [
          'Gross Profit = ₹70,000 and Net Profit = ₹45,000 [Cost of Goods Sold = 20,000 + 80,000 + 10,000 - 30,000 = ₹80,000; GP = 1,50,000 - 80,000 = ₹70,000; NP = 70,000 - 25,000 = ₹45,000]',
          'Gross Profit = ₹1,50,000 and Net Profit = ₹1,25,000',
          'Gross Profit = ₹45,000 and Net Profit = ₹70,000',
          'Gross Profit = ₹50,000 and Net Profit = ₹25,000'
        ],
        correctIndex: 0,
        explanation: 'Trading A/c Credit (Sales ₹1,50,000 + Closing Stock ₹30,000 = ₹1,80,000) minus Debit (Opening Stock ₹20,000 + Purchases ₹80,000 + Wages ₹10,000 = ₹1,10,000) = Gross Profit ₹70,000. Subtracting indirect expenses ₹25,000 gives Net Profit ₹45,000.',
        topic: 'Numerical Calculation of Gross Profit & Net Profit'
      },
      {
        text: `Fill in the blank: In Insurance, the "Principle of _____" states that after the insurer compensates the insured for the full loss of damaged property, the legal ownership rights of the scrap/salvaged property and claims against third parties pass to the insurance company.`,
        options: [
          'Subrogation',
          'Mitigation',
          'Contribution',
          'Proximate Cause'
        ],
        correctIndex: 0,
        explanation: 'Subrogation is a corollary to Indemnity: once fully compensated, the insured steps aside and the insurer steps into the shoes of the insured regarding salvaged property.',
        topic: 'Advanced Insurance Principles (Subrogation, Contribution, Causa Proxima)'
      },
      {
        text: `True or False: In Digital Banking in India, "NEFT" (National Electronic Funds Transfer) settles funds in half-hourly batches 24×7, whereas "RTGS" (Real-Time Gross Settlement) settles high-value transactions (minimum ₹2 lakh) individually on a real-time continuous basis.`,
        options: [
          'True',
          'False',
          'RTGS has a maximum limit of ₹10 only',
          'NEFT requires sending paper envelopes by post'
        ],
        correctIndex: 0,
        explanation: 'RTGS processes high-value transactions (≥ ₹2,00,000) instantaneously on a gross basis, while NEFT and IMPS/UPI handle retail electronic transfers.',
        topic: 'E-Banking – NEFT, RTGS, IMPS & UPI'
      },
      {
        text: `Match the Cost Accounting Classification (Fixed, Variable, Semi-Variable) with its Example:`,
        options: [
          'Fixed Cost → Factory Rent & Insurance (remains constant regardless of output) | Variable Cost → Direct Raw Material & Piece-rate Wages (varies directly with output) | Semi-Variable Cost → Telephone/Electricity bill with fixed rental + usage charge',
          'Fixed Cost → Raw cotton used per shirt | Variable Cost → Monthly factory building rent',
          'All costs remain zero when production doubles',
          'Variable cost per unit increases when output is zero'
        ],
        correctIndex: 0,
        explanation: 'Total Fixed Cost stays constant in the short run, Total Variable Cost changes proportionately with output volume, and Semi-Variable Cost has both fixed and variable components.',
        topic: 'Classification of Costs (Fixed, Variable, Semi-Variable)'
      },
      {
        text: `Distinguish between a "Private Limited Company" (Pvt. Ltd.) and a "Public Limited Company" (Ltd.) under the Indian Companies Act:`,
        options: [
          'A Private Company requires a minimum of 2 members (max 200), restricts transfer of shares, and CANNOT invite the general public to subscribe to its shares; a Public Company requires a minimum of 7 members (no upper limit), has freely transferable shares, and can issue a Prospectus to the public',
          'A Private Company must list its shares on the Stock Exchange',
          'A Public Company can have at most 2 shareholders',
          'Both are owned by a single sole proprietor'
        ],
        correctIndex: 0,
          explanation: 'Private Limited Companies (2 to 200 members) restrict public share subscription, while Public Limited Companies (minimum 7 members, unlimited max) raise capital from the public via IPOs.',
        topic: 'Private Limited vs Public Limited Company'
      },
      {
        text: `Identify the INCORRECT statement regarding Budgeting and Financial Planning in a commercial enterprise:`,
        options: [
          'A Master Budget is the consolidated summary budget integrating all functional budgets (Sales, Production, Cash, Capital Expenditure)',
          'A Cash Budget estimates expected cash inflows and cash outflows over a future period to prevent liquidity crises',
          'The Sales Budget is usually the cornerstone (starting point) upon which the Production Budget and Purchase Budget are based',
          'A Budget is a historical record of transactions that happened 50 years ago and has nothing to do with future planning'
        ],
        correctIndex: 3,
        explanation: 'A budget is always forward-looking — a quantitative financial plan for a defined future period.',
        topic: 'Budgeting – Sales, Production, Cash & Master Budgets'
      },
      {
        text: `Complete the Logistics concept: A "Bonded Warehouse" (located near seaports and airports and licensed by Customs authorities) is used specifically for storing _____.`,
        options: [
          'Imported dutiable goods on which customs import duty has NOT yet been paid (allowing importers to pay duty in instalments as they clear goods or re-export them)',
          'Household kitchen vegetables',
          'Only school stationery',
          'Goods that are banned by law'
        ],
        correctIndex: 0,
        explanation: 'Bonded warehouses store imported goods under customs bond until import duty is paid, facilitating entrepot trade and importer working capital management.',
        topic: 'Warehousing – Private, Public & Bonded Warehouses'
      },
      {
        text: `Which type of crossing on a Bank Cheque (writing "Not Negotiable" or "A/c Payee Only" between two parallel transverse lines on the top-left corner) provides maximum security against theft or fraud?`,
        options: [
          'Account Payee (Restrictive) Crossing — directing the collecting bank to credit the proceeds ONLY into the bank account of the named payee (cannot be encashed over the counter)',
          'Bearer Cheque (anyone holding it can take cash at the counter)',
          'Dishonoured Cheque',
          'Stale Cheque (older than 3 months)'
        ],
        correctIndex: 0,
        explanation: 'Crossing a cheque with "A/c Payee Only" ensures the amount is credited solely to the payee’s bank account, preventing unauthorized encashment.',
        topic: 'Cheques – Bearer, Order & Crossed Cheques'
      },
      {
        text: `Look at the capital market bull icon 🐂. What is a "Stock Exchange" (such as BSE and NSE in India), and which statutory body regulates the Indian securities market to protect investors?`,
        options: [
          'A Stock Exchange is an organized secondary market for buying and selling existing securities (shares, debentures, bonds), regulated in India by SEBI (Securities and Exchange Board of India)',
          'A market for buying live cattle, regulated by FCI',
          'A primary school board, regulated by NCERT',
          'A warehouse for storing grain'
        ],
        correctIndex: 0,
        diagramEmoji: '🐂',
        explanation: 'BSE (Bombay Stock Exchange) and NSE (National Stock Exchange) provide liquidity to investors under the regulatory oversight of SEBI.',
        topic: 'Capital Market, Stock Exchange & SEBI'
      },
      {
        text: `Assertion (A): Even if both the Debit and Credit columns of a Trial Balance tally (agree) perfectly, there may still be accounting errors in the books of accounts.\nReason (R): Errors of Complete Omission, Errors of Principle (e.g., debiting Machinery Purchase to Repairs A/c), and Compensating Errors affect both sides equally and are NOT disclosed by a Trial Balance.`,
        options: [
          'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
          'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
          '(A) is true, but (R) is false.',
          '(A) is false, but (R) is true.'
        ],
        correctIndex: 0,
        explanation: 'A Trial Balance only proves arithmetical accuracy of postings; Errors of Principle, Omission, Original Entry, and Compensating Errors do not disturb the equality of totals.',
        topic: 'Errors Not Disclosed by a Trial Balance'
      }
    ];
  }

  // ============================================================================
  // 31. SANSKRIT — 40 Unique Questions (10 per Level, CBSE / Board Sanskrit)
  // ============================================================================
  if (subject === 'Sanskrit') {
    if (level === 1) {
      return [
        {
          text: `संस्कृत भाषा में वचन (Number) कितने प्रकार के होते हैं?`,
          options: [
            'तीन (एकवचनम्, द्विवचनम्, बहुवचनम्)',
            'दो (एकवचनम्, बहुवचनम्)',
            'चार',
            'एक'
          ],
          correctIndex: 0,
          explanation: 'संस्कृत व्याकरण में तीन वचन होते हैं: एकवचनम् (1 के लिए), द्विवचनम् (2 के लिए), और बहुवचनम् (3 या अधिक के लिए)।',
          topic: 'संस्कृत वचन एवं लिंग परिचयः'
        },
        {
          text: `रिक्त स्थान की पूर्ति करें: "बालकः पाठं _____।" (पठ् धातु, लट् लकार, प्रथम पुरुष, एकवचनम्)`,
          options: ['पठति', 'पठतः', 'पठन्ति', 'पठसि'],
          correctIndex: 0,
          explanation: 'कर्तृपद "बालकः" प्रथम पुरुष एकवचन में है, अतः क्रिया भी प्रथम पुरुष एकवचन "पठति" होगी।',
          topic: 'लट् लकारः (वर्तमान कालः)'
        },
        {
          text: `सत्यम् वा असत्यम्: संस्कृत में तीन लिंग होते हैं — पुंल्लिंगम् (जैसे बालकः), स्त्रीलिंगम् (जैसे बालिका), और नपुंसकलिंगम् (जैसे फलम्)।`,
          options: [
            'सत्यम् (True)',
            'असत्यम् (False)',
            'केवल दो लिंग होते हैं',
            'कोई लिंग नहीं होता'
          ],
          correctIndex: 0,
          explanation: 'संस्कृत में शब्दों को पुंल्लिंग, स्त्रीलिंग और नपुंसकलिंग — इन तीन लिंगों में विभाजित किया जाता है।',
          topic: 'त्रयः लिंगाः'
        },
        {
          text: `संस्कृत संख्यावाचक शब्दों का सही मिलान चुनिए:`,
          options: [
            '१ → एकम् | ५ → पञ्च | १० → दश | २० → विंशतिः | ५० → पञ्चाशत् | १०० → शतम्',
            '५ → दश | १० → शतम् | १०० → पञ्च',
            '२० → त्रिंशत् | ५० → चत्वारिंशत्',
            '१ → सहस्रम्'
          ],
          correctIndex: 0,
          explanation: 'संस्कृत गणना में ५ = पञ्च, १० = दश, २० = विंशतिः, ५० = पञ्चाशत् और १०० = शतम् होता है।',
          topic: 'संस्कृत संख्याज्ञानम् (१–१००)'
        },
        {
          text: `"फलम्" (नपुंसकलिंग शब्द) का प्रथमा विभक्ति (एकवचन, द्विवचन, बहुवचन) रूप क्या होता है?`,
          options: [
            'फलम् – फले – फलानि',
            'फलः – फलौ – फलाः',
            'फलया – फलाभ्याम् – फलाभिः',
            'फलस्य – फलयोः – फलानाम्'
          ],
          correctIndex: 0,
          explanation: 'अकारान्त नपुंसकलिंग "फल" शब्द के प्रथमा और द्वितीया विभक्ति रूप "फलम्, फले, फलानि" चलते हैं।',
          topic: 'शब्दरूपाणि – नपुंसकलिंगम्'
        },
        {
          text: `निम्नलिखित अव्यय (Indeclinable) और उसके हिंदी अर्थ का कौन-सा युग्म अशुद्ध (गलत) है?`,
          options: [
            'अत्र — यहाँ (Here)',
            'तत्र — वहाँ (There)',
            'कुत्र — कहाँ (Where)',
            'श्वः — बीता हुआ कल (Yesterday)'
          ],
          correctIndex: 3,
          explanation: 'संस्कृत में "श्वः" का अर्थ "आने वाला कल (Tomorrow)" होता है, जबकि "ह्यः" का अर्थ "बीता हुआ कल (Yesterday)" और "अद्य" का अर्थ "आज (Today)" होता है।',
          topic: 'अव्ययपदानि (अद्य, श्वः, ह्यः, अत्र, तत्र)'
        },
        {
          text: `सूक्ति पूरी कीजिए: "सत्यमेव _____, नानृतं सत्येन पन्था विततो देवयानः।" (मुण्डकोपनिषद्)`,
          options: ['जयते', 'पठति', 'गच्छति', 'लिखति'],
          correctIndex: 0,
          explanation: '"सत्यमेव जयते" (सत्य की ही विजय होती है) भारत का राष्ट्रीय आदर्श वाक्य है।',
          topic: 'संस्कृत सूक्तयः'
        },
        {
          text: `"अहम् विद्यालयं गच्छामि।" — यदि इस वाक्य को बहुवचन ("हम सब विद्यालय जाते हैं") में बदला जाए, तो सही संस्कृत वाक्य क्या होगा?`,
          options: [
            'वयम् विद्यालयं गच्छामः।',
            'त्वम् विद्यालयं गच्छसि।',
            'ते विद्यालयं गच्छन्ति।',
            'आवाम् विद्यालयं गच्छावः।'
          ],
          correctIndex: 0,
          explanation: '"अहम्" (मैं) का बहुवचन "वयम्" (हम सब) और "गच्छामि" का उत्तम पुरुष बहुवचन "गच्छामः" होता है।',
          topic: 'अस्मद् सर्वनाम एवं उत्तम पुरुष क्रिया'
        },
        {
          text: `चित्र देखिए 📚: सुभाषित "विद्या ददाति _____, विनयाद् याति पात्रताम्" में रिक्त स्थान पर कौन-सा शब्द आता है?`,
          options: ['विनयम्', 'क्रोधम्', 'आलस्यम्', 'भयम्'],
          correctIndex: 0,
          diagramEmoji: '📚',
          explanation: '"विद्या ददाति विनयम्" अर्थात् विद्या मनुष्य को विनम्रता (विनय) प्रदान करती है।',
          topic: 'सुभाषितानि (हितोपदेशः)'
        },
        {
          text: `"रामस्य" और "बालकस्य" शब्दों में कौन-सी विभक्ति प्रयुक्त हुई है (जिसका अर्थ 'का / के / की' होता है)?`,
          options: [
            'षष्ठी विभक्तिः (संबंध सूचक)',
            'प्रथमा विभक्तिः',
            'तृतीया विभक्तिः',
            'सप्तमी विभक्तिः'
          ],
          correctIndex: 0,
          explanation: 'अकारान्त पुंल्लिंग शब्दों में "स्य" प्रत्यय (रामस्य = राम का, बालकस्य = बालक का) षष्ठी विभक्ति एकवचन दर्शाता है।',
          topic: 'कारक एवं विभक्ति परिचयः'
        }
      ];
    }

    if (level === 2) {
      return [
        {
          text: `संस्कृत व्याकरण में मुख्य ५ लकारों का काल/भाव के साथ सही मिलान कौन-सा है?`,
          options: [
            'लट् लकारः → वर्तमान काल | लृट् लकारः → भविष्यत् काल | लङ् लकारः → भूतकाल | लोट् लकारः → आज्ञार्थ | विधिलिङ् → चाहिए (सम्भावना/उपदेश)',
            'लट् लकारः → भूतकाल | लङ् लकारः → भविष्यत् काल',
            'लोट् लकारः → भूतकाल',
            'सभी लकार केवल वर्तमान काल दर्शाते हैं'
          ],
          correctIndex: 0,
          explanation: 'संस्कृत में लट् (वर्तमान), लृट् (भविष्यत्), लङ् (अनद्यतन भूत), लोट् (आज्ञा) और विधिलिङ् (चाहिए/विधि) मुख्य ५ लकार हैं।',
          topic: 'पञ्च लकाराः (लट्, लृट्, लङ्, लोट्, विधिलिङ्)'
        },
        {
          text: `रिक्त स्थान की पूर्ति करें: "पठित्वा" (पढ़कर) शब्द में 'पठ्' धातु के साथ _____ प्रत्यय लगा है।`,
          options: ['क्त्वा', 'तुमुन्', 'ल्यप्', 'शतृ'],
          correctIndex: 0,
          explanation: '"करके" (Having done) अर्थ में धातु के साथ "क्त्वा" प्रत्यय जुड़ता है (पठ् + क्त्वा = पठित्वा, गम् + क्त्वा = गत्वा)।',
          topic: 'प्रत्ययाः – क्त्वा, तुमुन्, ल्यप्'
        },
        {
          text: `सत्यम् वा असत्यम्: "पठितुम्" (पढ़ने के लिए) और "गन्तुम्" (जाने के लिए) शब्दों में 'के लिए' अर्थ प्रकट करने हेतु "तुमुन्" प्रत्यय का प्रयोग हुआ है।`,
          options: [
            'सत्यम् (True)',
            'असत्यम् (False)',
            'इसमें तव्यत् प्रत्यय है',
            'यह भूतकाल की क्रिया है'
          ],
          correctIndex: 0,
          explanation: '"तुमुन्" प्रत्यय का "तुम्" शेष रहता है और यह "के लिए" (निमित्तार्थक) भाव व्यक्त करता है।',
          topic: 'तुमुन् प्रत्ययः'
        },
        {
          text: `स्वर संधि के नियमों के अनुसार निम्नलिखित संधि-विच्छेदों का सही मिलान चुनिए:`,
          options: [
            'विद्या + आलयः = विद्यालयः (दीर्घ संधि) | सूर्य + उदयः = सूर्योदयः (गुण संधि) | इति + आदिः = इत्यादिः (यण् संधि) | सदा + एव = सदैव (वृद्धि संधि)',
            'सूर्य + उदयः = सूर्यादयः',
            'इति + आदिः = इतादिः',
            'विद्या + आलयः = विद्योलयः'
          ],
          correctIndex: 0,
          explanation: 'अच् (स्वर) संधि के मुख्य भेद दीर्घ (अकः सवर्णे दीर्घः), गुण (आद्गुणः), वृद्धि (वृद्धिरेचि) और यण् (इको यणचि) हैं।',
          topic: 'स्वरसन्धिः (दीर्घ, गुण, वृद्धि, यण्)'
        },
        {
          text: `"सह" (साथ) अव्यय के योग में सदैव कौन-सी विभक्ति प्रयुक्त होती है? (जैसे — "सीता रामेण सह वनं गच्छति।")`,
          options: [
            'तृतीया विभक्तिः ("सहयुक्तेऽप्रधाने")',
            'द्वितीया विभक्तिः',
            'चतुर्थी विभक्तिः',
            'षष्ठी विभक्तिः'
          ],
          correctIndex: 0,
          explanation: '"सह", "साकम्", "सार्धम्", "समम्" (साथ अर्थ वाले शब्दों) के योग में हमेशा तृतीया विभक्ति लगती है (रामेण सह, जनकेन सह)।',
          topic: 'उपपद विभक्तिः (तृतीया विभक्तिः)'
        },
        {
          text: `निम्नलिखित में से कौन-सा "उपपद विभक्ति" नियम अशुद्ध (गलत) है?`,
          options: [
            '"नमः" (नमस्कार) और "दा / यच्छ्" (देना) के योग में चतुर्थी विभक्ति होती है (जैसे—गुरवे नमः, श्रीगणेशाय नमः)',
            '"उभयतः" (दोनों ओर) और "परितः" (चारों ओर) के योग में द्वितीया विभक्ति होती है (जैसे—ग्रामं परितः वृक्षाः सन्ति)',
            '"बहिः" (बाहर) और "बिना" के योग में पंचमी विभक्ति होती है (जैसे—ग्रामात् बहिः)',
            '"नमः" के योग में सदैव सप्तमी विभक्ति ही लगती है'
          ],
          correctIndex: 3,
          explanation: '"नमः स्वस्तिस्वाहास्वधाऽलंवषड्योगाच्च" सूत्र के अनुसार "नमः" के योग में चतुर्थी विभक्ति होती है (गुरवे नमः)।',
          topic: 'उपपद विभक्ति नियमाः'
        },
        {
          text: `श्लोकांश पूरा करें: "उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः। न हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे _____॥"`,
          options: ['मृगाः', 'वृक्षाः', 'मेघाः', 'पाषाणाः'],
          correctIndex: 0,
          explanation: 'परिश्रम (उद्यम) से ही कार्य सिद्ध होते हैं, केवल इच्छा करने से नहीं; सोते हुए शेर के मुख में हिरण (मृगाः) स्वयं प्रवेश नहीं करते।',
          topic: 'सुभाषित रत्नानि – परिश्रमस्य महत्त्वम्'
        },
        {
          text: `"सः अत्र आगत्य पुस्तकं पठति।" — यहाँ "आगत्य" (आ + गम् + ल्यप्) में 'क्त्वा' के स्थान पर 'ल्यप्' प्रत्यय क्यों लगा है?`,
          options: [
            'क्योंकि धातु (गम्) से पहले उपसर्ग ("आ") जुड़ा हुआ है',
            'क्योंकि यह भविष्यत् काल है',
            'क्योंकि कर्ता स्त्रीलिंग है',
            'क्योंकि ल्यप् प्रत्यय केवल संज्ञा शब्दों में लगता है'
          ],
          correctIndex: 0,
          explanation: 'जब धातु से पूर्व कोई उपसर्ग (जैसे आ, प्र, वि, सम्) हो, तो "करके" अर्थ में "क्त्वा" के स्थान पर "ल्यप्" प्रत्यय लगता है (आ + गम् + ल्यप् = आगत्य, प्र + नम् + ल्यप् = प्रणम्य)।',
          topic: 'ल्यप् प्रत्ययः (उपसर्गयुक्त धातुः)'
        },
        {
          text: `चित्र देखिए ⏰: संस्कृत समय-लेखनम् में "04:15" (सवा चार बजे) और "04:30" (साढ़े चार बजे) को क्या कहते हैं?`,
          options: [
            '04:15 = सपाद-चतुर्वादनम् | 04:30 = सार्ध-चतुर्वादनम्',
            '04:15 = पादोन-चतुर्वादनम् | 04:30 = सपाद-चतुर्वादनम्',
            '04:15 = चतुर्वादनम् | 04:30 = पञ्चवादनम्',
            '04:15 = सार्ध-त्रिवादनम्'
          ],
          correctIndex: 0,
          diagramEmoji: '⏰',
          explanation: 'संस्कृत घटिका (समय) ज्ञान में: सवा (+15 min) = सपाद, साढ़े (+30 min) = सार्ध, और पौने (-15 min / :45) = पादोन (जैसे 04:45 = पादोन-पञ्चवादनम्)।',
          topic: 'घटिका-समय-ज्ञानम् (सपाद, सार्ध, पादोन)'
        },
        {
          text: `"गम्" (गच्छ्) धातु का लृट् लकार (भविष्यत् काल), प्रथम पुरुष, एकवचन रूप क्या होगा? ("वह जाएगा")`,
          options: ['गमिष्यति', 'अगच्छत्', 'गच्छति', 'गच्छतु'],
          correctIndex: 0,
          explanation: 'लृट् लकार (भविष्यत् काल) में गम् धातु के रूप "गमिष्यति, गमिष्यतः, गमिष्यन्ति" चलते हैं ("अगच्छत्" लङ् लकार भूतकाल है)।',
          topic: 'लृट् लकारः एवं लङ् लकारः'
        }
      ];
    }

    if (level === 3) {
      return [
        {
          text: `संस्कृत साहित्य के महाकवि कालिदास द्वारा रचित प्रसिद्ध नाटक और महाकाव्य कौन-से हैं?`,
          options: [
            'नाटक: अभिज्ञानशाकुन्तलम् | महाकाव्य: रघुवंशम् एवं कुमारसंभवम् | खण्डकाव्य: मेघदूतम्',
            'अर्थशास्त्रम् एवं राजतरंगिणी',
            'पंचतन्त्रम् एवं हितोपदेशः',
            'गीतगोविन्दम् एवं हर्षचरितम्'
          ],
          correctIndex: 0,
          explanation: 'कविकुलगुरु कालिदास ने अभिज्ञानशाकुन्तलम् (विश्वप्रसिद्ध नाटक), रघुवंशम्, कुमारसंभवम् और मेघदूतम् की रचना की।',
          topic: 'संस्कृत साहित्यम् एवं महाकवयः'
        },
        {
          text: `रिक्त स्थान की पूर्ति करें: रेखांकित पद के आधार पर प्रश्न-निर्माण कीजिए — "बालकाः [उद्याने] क्रीडन्ति।" -> "बालकाः _____ क्रीडन्ति?"`,
          options: ['कुत्र (अथवा कस्मिन्)', 'कः', 'किमर्थम्', 'कदा'],
          correctIndex: 0,
          explanation: '"उद्याने" स्थानवाचक सप्तमी विभक्ति का पद है, अतः प्रश्न-निर्माण में स्थान के लिए "कुत्र" (कहाँ) या "कस्मिन्" का प्रयोग होता है।',
          topic: 'प्रश्ननिर्माणम् (कः, कुत्र, कदा, कथम्, किमर्थम्)'
        },
        {
          text: `सत्यम् वा असत्यम्: "पौराणिक कथा-ग्रन्थ 'पञ्चतन्त्रम्' के रचयिता आचार्य विष्णुशर्मा हैं, और आदिकाव्य 'रामायणम्' के रचयिता महर्षि वाल्मीकि हैं।"`,
          options: [
            'सत्यम् (True)',
            'असत्यम् (False)',
            'पञ्चतन्त्रम् के लेखक बाणभट्ट हैं',
            'रामायणम् में केवल १० श्लोक हैं'
          ],
          correctIndex: 0,
          explanation: 'महर्षि वाल्मीकि आदिकवि हैं (रामायणम्), महर्षि वेदव्यास ने महाभारतम् रचा, और आचार्य विष्णुशर्मा ने नीति-कथा ग्रन्थ पञ्चतन्त्रम् की रचना की।',
          topic: 'संस्कृत ग्रन्थाः एवं रचनाकाराः'
        },
        {
          text: `अयादि स्वर संधि (एचोऽयवायावः) के अनुसार निम्नलिखित शब्दों का सही संधि-विच्छेद चुनिए:`,
          options: [
            'ने + अनम् = नयनम् | गै + अकः = गायकः | पो + अनः = पवनः | पौ + अकः = पावकः',
            'ने + अनम् = नोनम् | पो + अनः = पोनः',
            'गै + अकः = गयकः',
            'पौ + अकः = पवकः'
          ],
          correctIndex: 0,
          explanation: 'अयादि संधि में ए → अय् (नयनम्), ऐ → आय् (गायकः), ओ → अव् (पवनः), और औ → आव् (पावकः) आदेश होता है।',
          topic: 'अयादि स्वरसन्धिः'
        },
        {
          text: `"पीताम्बरः" (पीतम् अम्बरम् यस्य सः — पीले हैं वस्त्र जिसके अर्थात् श्रीविष्णु/श्रीकृष्ण) में कौन-सा समास है?`,
          options: [
            'बहुव्रीहि समासः',
            'द्वन्द्व समासः',
            'द्विगु समासः',
            'अव्ययीभाव समासः'
          ],
          correctIndex: 0,
          explanation: 'जब समस्तपद के दोनों पद मिलकर किसी तीसरे अन्य प्रधान अर्थ (विष्णु/कृष्ण) की ओर संकेत करते हैं ("अन्यपदार्थप्रधानो बहुव्रीहिः"), तो बहुव्रीहि समास होता है।',
          topic: 'समास-प्रकरणम् (तत्पुरुष, द्वन्द्व, बहुव्रीहि, अव्ययीभाव)'
        },
        {
          text: `निम्नलिखित में से कौन-सा "विशेषण-विशेष्य" युग्म लिंग, विभक्ति और वचन की दृष्टि से अशुद्ध (गलत) है?`,
          options: [
            'मधुराणि फलानि (मीठे फल — नपुंसकलिंग बहुवचन)',
            'चतुरः बालकः (चतुर बालक — पुंल्लिंग एकवचन)',
            'सुन्दरी बालिका (सुन्दर बालिका — स्त्रीलिंग एकवचन)',
            'मधुरः फलानि (पुंल्लिंग एकवचन विशेषण के साथ नपुंसकलिंग बहुवचन विशेष्य)'
          ],
          correctIndex: 3,
          explanation: 'संस्कृत नियम ("यल्लिंगं यद्वचनं या च विभक्तिर्विशेष्यस्य, तल्लिंगं तद्वचनं सा च विभक्तिर्विशेषणस्य") के अनुसार विशेषण और विशेष्य में समान लिंग, विभक्ति और वचन होना अनिवार्य है।',
          topic: 'विशेषण-विशेष्य अन्वयः'
        },
        {
          text: `वाक्य पूरा करें: "सूर्ये उदिते कमलाः विकसन्ति।" (सूर्य के उदित होने पर कमल खिलते हैं) — जब एक कार्य के होने पर दूसरा कार्य हो, तो इस प्रयोग को _____ विभक्ति कहते हैं।`,
          options: [
            'सति सप्तमी (सप्तमी विभक्तिः — यस्य च भावेन भावलक्षणम्)',
            'प्रथमा विभक्तिः',
            'द्वितीया विभक्तिः',
            'सम्बोधनम्'
          ],
          correctIndex: 0,
          explanation: '"यस्य च भावेन भावलक्षणम्" सूत्र के अनुसार एक क्रिया के द्वारा दूसरी क्रिया की सूचना देने पर सप्तमी विभक्ति (सति सप्तमी) होती है।',
          topic: 'कारक-प्रकरणम् – सति सप्तमी'
        },
        {
          text: `"पठन् बालकः" (पढ़ता हुआ बालक) और "गच्छन्ती बालिका" (जाती हुई बालिका) में वर्तमानकालिक कृदन्त के लिए किस प्रत्यय का प्रयोग हुआ है?`,
          options: [
            'शतृ प्रत्ययः (परस्मैपदी धातुओं के साथ "हुआ / हुई" अर्थ में)',
            'क्तवतु प्रत्ययः',
            'तुमुन् प्रत्ययः',
            'अनीयर् प्रत्ययः'
          ],
          correctIndex: 0,
          explanation: 'वर्तमान काल में कार्य करते हुए ("पढ़ता हुआ", "जाता हुआ") अर्थ में परस्मैपदी धातु से "शतृ" प्रत्यय और आत्मनेपदी धातु से "शानच्" प्रत्यय लगता है।',
          topic: 'कृदन्त प्रत्ययाः – शतृ एवं शानच्'
        },
        {
          text: `चित्र देखिए 🌳: "वृक्षात् पत्राणि पतन्ति।" (पेड़ से पत्ते गिरते हैं) — यहाँ "वृक्षात्" में पंचमी विभक्ति किस कारक के कारण हुई है?`,
          options: [
            'अपादान कारकम् ("ध्रुवमपायेऽपादानम्" — अलग होने के अर्थ में पंचमी)',
            'करण कारकम्',
            'अधिकरण कारकम्',
            'सम्प्रदान कारकम्'
          ],
          correctIndex: 0,
          diagramEmoji: '🌳',
          explanation: 'पत्तों का वृक्ष से अलग होना (विश्लेष/पृथकता) अपादान कारक है, और "अपादाने पञ्चमी" सूत्र से वृक्षात् में पंचमी विभक्ति लगती है।',
          topic: 'अपादान कारकम् एवं पञ्चमी विभक्तिः'
        },
        {
          text: `व्यंजन और विसर्ग संधि का सही उदाहरण चुनिए: "जगत् + ईशः" और "मनः + रथः" की संधि क्या होगी?`,
          options: [
            'जगत् + ईशः = जगदीशः (जश्त्व व्यंजन संधि) | मनः + रथः = मनोरथः (उत्व विसर्ग संधि)',
            'जगत् + ईशः = जगतीशः | मनः + रथः = मनरथः',
            'जगत् + ईशः = जगजीशः | मनः + रथः = मनेरथः',
            'दोनों में दीर्घ स्वर संधि है'
          ],
          correctIndex: 0,
          explanation: 'जगत् + ईशः में वर्ग के प्रथम वर्ण (त्) को तृतीय वर्ण (द्) होकर "जगदीशः" बनता है; मनः + रथः में विसर्ग का उत्व/गुण होकर "मनोरथः" बनता है।',
          topic: 'व्यञ्जनसन्धिः एवं विसर्गसन्धिः'
        }
      ];
    }

    // Level 4: Expert Challenge (Sanskrit)
    return [
      {
        text: `संस्कृत वाच्य-परिवर्तनम् (Voice Change): कर्तृवाच्य वाक्य "बालकः ग्रन्थं पठति।" का सही कर्मवाच्य (Passive Voice) रूप क्या होगा?`,
          options: [
            'बालकेन ग्रन्थः पठ्यते। (कर्ता तृतीया में, कर्म प्रथमा में, और क्रिया आत्मनेपद यक् प्रत्यय सहित कर्म के अनुसार)',
            'बालकः ग्रन्थेन पठति।',
            'बालकाय ग्रन्थं पठ्यते।',
            'बालकात् ग्रन्थः पठन्ति।'
          ],
          correctIndex: 0,
          explanation: 'कर्तृवाच्य (1-2-1) को कर्मवाच्य (3-1-1) में बदलते समय कर्ता में तृतीया (बालकेन), कर्म में प्रथमा (ग्रन्थः) और क्रिया कर्म के अनुसार आत्मनेपद में (पठ्यते) होती है।',
          topic: 'वाच्यपरिवर्तनम् (कर्तृवाच्य, कर्मवाच्य, भाववाच्य)'
        },
      {
        text: `रिक्त स्थान की पूर्ति करें: महर्षि पाणिनि द्वारा रचित विश्वप्रसिद्ध संस्कृत व्याकरण ग्रन्थ का नाम _____ है, जो १४ माहेश्वर सूत्रों पर आधारित है और जिसमें लगभग ४,००० सूत्र (८ अध्याय) हैं।`,
        options: ['अष्टाध्यायी', 'महाभाष्यम्', 'अमरकोशः', 'सिद्धान्तशिरोमणिः'],
        correctIndex: 0,
        explanation: 'महर्षि पाणिनि रचित "अष्टाध्यायी" में ८ अध्याय हैं; महर्षि पतंजलि ने उस पर "महाभाष्यम्" लिखा और कात्यायन ने वार्तिक लिखे (त्रिमुनि व्याकरणम्)।',
        topic: 'पाणिनीय व्याकरणम् एवं अष्टाध्यायी'
      },
      {
        text: `सत्यम् वा असत्यम्: "क्त" और "क्तवतु" प्रत्यय भूतकाल (निष्ठा संज्ञा) के अर्थ में प्रयुक्त होते हैं — जैसे "सः पाठं पठितवान्" (क्तवतु - कर्तृवाच्य) और "तेन पाठः पठितः" (क्त - कर्मवाच्य)।`,
        options: [
          'सत्यम् (True)',
          'असत्यम् (False)',
          'क्तवतु प्रत्यय भविष्यत् काल के लिए होता है',
          'दोनों प्रत्यय केवल अव्यय बनाते हैं'
        ],
        correctIndex: 0,
        explanation: '"क्तक्तवतू निष्ठा" सूत्र के अनुसार क्त (कर्म/भाव में: पठितः, गतः) और क्तवतु (कर्तृवाच्य में: पठितवान्, गतवान्) भूतकालिक कृदन्त प्रत्यय हैं।',
        topic: 'निष्ठा प्रत्ययौ – क्त एवं क्तवतु'
      },
      {
        text: `तद्धित एवं स्त्री प्रत्ययों का सही मिलान चुनिए:`,
        options: [
          'बुद्धि + मतुप् = बुद्धिमान् | बल + वतुप् = बलवान् | दिन + ठक् = दैनिकः | अज + टाप् = अजा | कुमार + ङीप् = कुमारी',
          'बुद्धि + मतुप् = बुद्धित्वम् | दिन + ठक् = दिनमान्',
          'अज + टाप् = अजी',
          'कुमार + ङीप् = कुमारा'
        ],
        correctIndex: 0,
        explanation: '"तदस्यास्त्यस्मिन्निति मतुप्" से मतुप् (मान्/वान्), ठक् से इक (दैनिकः, सामाजिकः), तथा स्त्रीलिंग बनाने हेतु टाप् (आ) और ङीप् (ई) प्रत्यय लगते हैं।',
        topic: 'तद्धित प्रत्ययाः (मतुप्, ठक्, त्व, तल्) एवं स्त्रीप्रत्ययाः'
      },
      {
        text: `"उपगङ्गम्" (गङ्गायाः समीपम् — गंगा के समीप) और "प्रतिदिनम्" (दिनं दिनं प्रति) समस्तपदों में कौन-सा समास है?`,
        options: [
          'अव्ययीभाव समासः (पूर्वपद अव्यय प्रधान और समस्तपद नपुंसकलिंग एकवचन में)',
          'तत्पुरुष समासः',
          'कर्मधारय समासः',
          'इतरेतर द्वन्द्व समासः'
        ],
        correctIndex: 0,
        explanation: '"समीपम्" अर्थ में "उप" उपसर्ग जुड़कर "उपगङ्गम्" और "वीप्सा" (दुहराव) में "प्रतिदिनम्" अव्ययीभाव समास के उदाहरण हैं।',
        topic: 'अव्ययीभाव समासः एवं विग्रहः'
      },
      {
        text: `निम्नलिखित में से कौन-सा कथन संस्कृत छन्द और सुभाषित साहित्य के सन्दर्भ में अशुद्ध (गलत) है?`,
        options: [
          'अनुष्टुप् छन्द के प्रत्येक पाद (चरण) में ८ वर्ण होते हैं (चारों चरणों में कुल ३२ वर्ण)',
          'श्रीमद्भगवद्गीता में १८ अध्याय और ७०० श्लोक हैं, जो महाभारत के भीष्मपर्व का भाग है',
          'भर्तृहरि ने तीन प्रसिद्ध शतक लिखे: नीतिशतकम्, शृंगारशतकम् और वैराग्यशतकम्',
          'रामायणम् की रचना कालिदास ने २०वीं शताब्दी में की थी'
        ],
        correctIndex: 3,
        explanation: 'आदिकाव्य वाल्मीकि रामायणम् की रचना महर्षि वाल्मीकि ने प्राचीन काल में की थी, जिसमें ७ काण्ड और २४,००० श्लोक (चतुर्विंशतिसाहस्री संहिता) हैं।',
        topic: 'संस्कृत छन्दः एवं आर्ष महाकाव्य परिचयः'
      },
      {
        text: `अन्वय-पूर्ति कीजिए: श्लोक — "आलस्यं हि मनुष्याणां शरीरस्थो महान् रिपुः। नास्त्युद्यमसमो बन्धुः कृत्वा यं नावसीदति॥"\nअन्वयः — मनुष्याणां शरीरस्थः महान् रिपुः (शत्रुः) हि _____ अस्ति। उद्यमसमः बन्धुः (मित्रम्) न अस्ति, यं कृत्वा (नरः) न अवसीदति।`,
        options: ['आलस्यम्', 'उद्यमः', 'सत्यम्', 'धनम्'],
        correctIndex: 0,
        explanation: 'मनुष्यों के शरीर में रहने वाला सबसे बड़ा शत्रु (महान् रिपुः) "आलस्य" है, और परिश्रम (उद्यम) के समान कोई सच्चा मित्र (बन्धु) नहीं है।',
        topic: 'श्लोक-अन्वय-पूर्तिः एवं भावार्थः'
      },
      {
        text: `"क्रुध्" (क्रोध करना) और "रुच्" (अच्छा लगना) धातुओं के योग में क्रमशः किस कारक/विभक्ति का प्रयोग होता है?`,
        options: [
          'दोनों के योग में सम्प्रदान कारक / चतुर्थी विभक्ति होती है (जैसे—पिता पुत्राय क्रुध्यति; बालकाय मोदकं रोचते)',
          'दोनों के योग में सप्तमी विभक्ति होती है',
          'दोनों के योग में द्वितीया विभक्ति होती है',
          'दोनों के योग में षष्ठी विभक्ति होती है'
        ],
        correctIndex: 0,
        explanation: '"क्रुधद्रुहेर्ष्यासूयार्थानां यं प्रति कोपः" और "रुच्यर्थानां प्रीयमाणः" सूत्रों के अनुसार क्रुध् (जिस पर क्रोध किया जाए) और रुच् (जिसे अच्छा लगे) के योग में चतुर्थी विभक्ति होती है।',
        topic: 'कारक-सूत्राणि (चतुर्थी विभक्तिः)'
      },
      {
        text: `चित्र देखिए 🌏: भारतीय संस्कृति का विश्वबंधुत्व संदेश देने वाला प्रसिद्ध श्लोक "अयं निजः परो वेति गणना लघुचेतसाम्। उदारचरितानां तु _____॥" किस वाक्यांश से पूर्ण होता है?`,
        options: [
          'वसुधैव कुटुम्बकम् (संपूर्ण पृथ्वी ही एक परिवार है)',
          'धनमेव सर्वस्वम्',
          'युद्धमेव जीवनम्',
          'निद्रा एव सुखम्'
        ],
        correctIndex: 0,
        diagramEmoji: '🌏',
        explanation: 'महोपनिषद् एवं हितोपदेश का यह अमर श्लोक कहता है कि उदार चरित्र वाले महापुरुषों के लिए संपूर्ण पृथ्वी ही एक परिवार है (वसुधा + एव = वसुधैव कुटुम्बकम्)।',
        topic: 'भारतीय संस्कृतिः – वसुधैव कुटुम्बकम्'
      },
      {
        text: `कथनम् (A): "तत् + शिवः" की व्यंजन संधि करने पर "तच्छिवः" रूप बनता है।\nकारणम् (R): श्चुत्व संधि (स्तोः श्चुना श्चुः) से 'त्' का 'च्' और छत्व संधि (शश्छोऽटि) से 'च्' के परे 'श्' का 'छ्' हो जाता है।`,
        options: [
          '(A) और (R) दोनों सत्य हैं, तथा (R), (A) की सही व्याकरणिक व्याख्या है।',
          '(A) और (R) दोनों सत्य हैं, किन्तु (R) सही व्याख्या नहीं है।',
          '(A) सत्य है, किन्तु (R) असत्य है।',
          '(A) असत्य है, किन्तु (R) सत्य है।'
        ],
        correctIndex: 0,
        explanation: 'तत् + शिवः → तच् + शिवः (स्तोः श्चुना श्चुः) → तच्छिवः (शश्छोऽटि)। यह उच्चस्तरीय व्यंजन संधि का प्रसिद्ध उदाहरण है।',
        topic: 'उच्चस्तरीय व्यञ्जनसन्धिः (श्चुत्व एवं छत्व)'
      }
    ];
  }

  return null;
}
