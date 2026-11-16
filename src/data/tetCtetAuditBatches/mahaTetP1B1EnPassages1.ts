import { CuratedLangPassageItem } from './types';

// MAHA TET Paper 1 — Language 2 (English) Curated Audit Batch 1
// Passages 1–10 (Tests 1–5: 5 Prose × 4 Qs + 5 Prose/Verse × 3 Qs = 35 Unique Qs)
export const MAHA_TET_P1_B1_EN_PASSAGES_1: CuratedLangPassageItem[] = [
  // TEST 1 - PASSAGE A (Prose, 4 Qs)
  {
    title: 'Dr. Salim Ali and Bird Migration',
    genre: 'Prose',
    text: 'Long before satellite collars existed, Indian ornithologist Dr. Salim Ali pioneered systematic bird ringing at Bharatpur. Placing lightweight numbered aluminium rings around the legs of wintering waterfowl helped scientists map thousands of kilometres of trans-Himalayan flyways and convinced policymakers to protect wetlands across Asia.',
    questions: [
      {
        topic: 'Reading Comprehension – Method',
        difficulty: 'Easy',
        q: 'How did Dr. Salim Ali track the migratory routes of waterfowl before satellite technology?',
        opts: [
          'By attaching lightweight numbered aluminium rings around the birds’ legs',
          'By following birds continuously in hot-air balloons',
          'By training eagles to carry handwritten letters',
          'By counting nests once every ten years',
        ],
        exp: 'The passage states he placed lightweight numbered aluminium rings around wintering waterfowl legs.',
      },
      {
        topic: 'Inference – Conservation Impact',
        difficulty: 'Moderate',
        q: 'What long-term policy outcome resulted from mapping trans-Himalayan bird flyways?',
        opts: [
          'Policymakers were convinced to safeguard wetland habitats across Asia',
          'All winter lakes were drained for factories',
          'Waterfowl stopped migrating southward permanently',
          'Bird ringing was outlawed internationally',
        ],
        exp: 'Flyway data proved how critical wetlands are, persuading authorities to protect them.',
      },
      {
        topic: 'Vocabulary in Context',
        difficulty: 'Easy',
        q: 'In the passage, the word "pioneered" closest means:',
        opts: [
          'Introduced and led an innovative method for the first time',
          'Copied an ancient textbook word for word',
          'Abandoned an incomplete experiment',
          'Opposed wildlife conservation laws',
        ],
        exp: '"Pioneered" means being among the first to develop or apply a new approach.',
      },
      {
        topic: 'Grammar in Context – Part of Speech',
        difficulty: 'Moderate',
        q: 'Identify the grammatical function of "wintering" in the phrase "wintering waterfowl":',
        opts: [
          'Participle functioning as a pre-modifying adjective',
          'Finite main verb in present continuous tense',
          'Preposition of direction',
          'Coordinating conjunction',
        ],
        exp: '"Wintering" ends in -ing and modifies the noun "waterfowl", acting as a participial adjective.',
      },
    ],
  },
  // TEST 1 - PASSAGE B (Poetry, 3 Qs)
  {
    title: 'The Quiet Lantern (Verse)',
    genre: 'Poetry',
    text: 'Though tiny gleams my modest flame / Beneath the stormy midnight sky, / I never boast a mighty name, / Yet guide a lost foot passing by.',
    questions: [
      {
        topic: 'Poetry – Central Theme',
        difficulty: 'Easy',
        q: 'What message does the speaker of "The Quiet Lantern" convey?',
        opts: [
          'Humble, consistent service can offer meaningful guidance without seeking fame',
          'Only bright floodlights have true worth in society',
          'Travelers should stay indoors whenever storms gather',
          'Boasting loudly guarantees eternal recognition',
        ],
        exp: 'Despite a modest flame and no boastful name, the lantern reliably guides lost travelers.',
      },
      {
        topic: 'Figure of Speech',
        difficulty: 'Moderate',
        q: 'What dominant literary device shapes the entire four-line poem?',
        opts: [
          'Personification (a lantern speaking with "I", "my", and "never boast")',
          'Hyperbole',
          'Oxymoron',
          'Onomatopoeia',
        ],
        exp: 'An inanimate lantern is endowed with human speech and humility, which is personification.',
      },
      {
        topic: 'Rhyme Scheme',
        difficulty: 'Easy',
        q: 'Identify the rhyme scheme of the stanza ("flame / sky / name / by"):',
        opts: ['ABAB', 'AABB', 'ABBA', 'AAAA'],
        exp: 'Line 1 ("flame") rhymes with Line 3 ("name"), and Line 2 ("sky") rhymes with Line 4 ("by"): ABAB.',
      },
    ],
  },

  // TEST 2 - PASSAGE A (Prose, 4 Qs)
  {
    title: 'How Paper Recovers Through Recycling',
    genre: 'Prose',
    text: 'Recycling one tonne of discarded office paper saves nearly seventeen mature trees and consumes roughly forty percent less electricity than manufacturing fresh pulp from timber. During processing, sorted paper is soaked into grey slurry, cleaned of staples and ink, and pressed into fresh sheets for notebooks.',
    questions: [
      {
        topic: 'Factual Comprehension',
        difficulty: 'Easy',
        q: 'Roughly how much less electricity does paper recycling consume compared to virgin timber pulping?',
        opts: ['About forty percent less electricity', 'Ninety-five percent more electricity', 'Exactly twice as much electricity', 'No change in electricity consumption'],
        exp: 'The extract specifies "roughly forty percent less electricity".',
      },
      {
        topic: 'Sequence of Process',
        difficulty: 'Moderate',
        q: 'In the recycling sequence described, what happens to sorted waste paper before pressing into fresh sheets?',
        opts: [
          'It is soaked into slurry and cleaned of staples and ink',
          'It is frozen into dry ice blocks',
          'It is burned to produce ash fertilizer',
          'It is dyed bright neon green',
        ],
        exp: 'Paper becomes grey slurry, undergoes de-inking and staple removal, and is then pressed.',
      },
      {
        topic: 'Synonym in Context',
        difficulty: 'Easy',
        q: 'Choose the closest synonym for "discarded" as used in the passage:',
        opts: ['Thrown away', 'Framed proudly', 'Handwritten', 'Laminated'],
        exp: '"Discarded" means thrown away as unwanted.',
      },
      {
        topic: 'Grammar – Voice Recognition',
        difficulty: 'Moderate',
        q: 'Which clause from the passage is written in the Passive Voice?',
        opts: [
          '"sorted paper is soaked into grey slurry"',
          '"Recycling one tonne of discarded office paper saves nearly seventeen mature trees"',
          '"Fresh pulp comes from timber"',
          '"Electricity powers the paper mill"',
        ],
        exp: '"is soaked" follows the passive structure (be + past participle).',
      },
    ],
  },
  // TEST 2 - PASSAGE B (Prose, 3 Qs)
  {
    title: 'Solar Dehydrators for Village Farmers',
    genre: 'Prose',
    text: 'In rural Konkan orchards, ripe mangoes and jackfruit often spoil before reaching distant city markets. Low-cost solar cabinet dryers trap gentle sunlight inside ventilated wooden boxes, removing moisture safely in two days so farm collectives can sell crisp, preservative-free dried slices year-round.',
    questions: [
      {
        topic: 'Problem-Solution Comprehension',
        difficulty: 'Easy',
        q: 'What problem do solar cabinet dryers solve for rural Konkan orchard growers?',
        opts: [
          'Preventing ripe seasonal fruits from spoiling before distant sale',
          'Freezing fresh sea fish for export',
          'Pumping groundwater from deep wells',
          'Melting metal tools in workshops',
        ],
        exp: 'Dryers remove moisture hygienically in two days, extending fruit shelf life without preservatives.',
      },
      {
        topic: 'Inference – Sustainability',
        difficulty: 'Moderate',
        q: 'Why do solar cabinet dryers produce healthier dried fruit than open-roadside drying?',
        opts: [
          'Ventilated closed boxes shield fruit from dust while omitting chemical preservatives',
          'They soak fruit slices in artificial food dyes',
          'They heat orchards with diesel exhaust',
          'They remove natural sweetness completely',
        ],
        exp: 'Enclosed ventilated boxes rely purely on sunlight and keep slices preservative-free.',
      },
      {
        topic: 'Antonym Selection',
        difficulty: 'Easy',
        q: 'Find an antonym for "distant" in context:',
        opts: ['Nearby', 'Remote', 'Far-flung', 'Isolated'],
        exp: '"Distant" means far away; its antonym is "nearby".',
      },
    ],
  },

  // TEST 3 - PASSAGE A (Prose, 4 Qs)
  {
    title: 'The Architecture of Honeybee Combs',
    genre: 'Prose',
    text: 'Mathematicians marvel at how honeybees construct wax hives strictly out of regular six-sided hexagons rather than circles or octagons. A continuous grid of hexagons leaves zero wasted gaps between neighbouring cells while enclosing the maximum honey storage space using the minimum quantity of beeswax.',
    questions: [
      {
        topic: 'Scientific Reasoning',
        difficulty: 'Easy',
        q: 'Why is a hexagonal grid superior to circles for honeycomb construction?',
        opts: [
          'Hexagons tessellate without leaving empty gaps while economizing wax',
          'Circles cannot hold liquid nectar safely',
          'Hexagons dissolve immediately in cool weather',
          'Bees cannot turn their heads at ninety degrees',
        ],
        exp: 'Hexagons pack seamlessly with zero gaps and maximize storage per unit of wax.',
      },
      {
        topic: 'Vocabulary – Exact Meaning',
        difficulty: 'Moderate',
        q: 'What does "marvel at" express in the opening sentence?',
        opts: [
          'Look with deep wonder and admiration',
          'Complain angrily about',
          'Calculate carelessly',
          'Destroy completely',
        ],
        exp: 'To "marvel at" means to feel astonishment and admiration.',
      },
      {
        topic: 'Grammar – Preposition',
        difficulty: 'Easy',
        q: 'Which preposition expresses spatial enclosure in "between neighbouring cells"?',
        opts: ['between', 'into', 'upon', 'until'],
        exp: '"Between" locates wasted gaps separating adjacent cells.',
      },
      {
        topic: 'Quantitative Vocabulary',
        difficulty: 'Easy',
        q: 'How many sides does each regular honeycomb cell possess?',
        opts: ['Six', 'Four', 'Eight', 'Five'],
        exp: 'The passage explicitly mentions "six-sided hexagons".',
      },
    ],
  },
  // TEST 3 - PASSAGE B (Poetry, 3 Qs)
  {
    title: 'Morning at the Village Well (Verse)',
    genre: 'Poetry',
    text: 'Brass pitchers chime a silver tune, / Before the blazing heat of noon; / Cool droplets kiss the dusty stone, / Where sparrows sip and hop alone.',
    questions: [
      {
        topic: 'Poetry – Sensory Imagery',
        difficulty: 'Easy',
        q: 'Which two senses are most vividly appealed to in "Brass pitchers chime a silver tune" and "Cool droplets kiss the dusty stone"?',
        opts: [
          'Hearing ("chime a silver tune") and touch ("cool droplets")',
          'Taste and smell exclusively',
          'Silence and darkness',
          'Hunger and winter chill',
        ],
        exp: 'Chime appeals to auditory imagery; cool droplets kissing stone evokes tactile/visual imagery.',
      },
      {
        topic: 'Poetry – Time Setting',
        difficulty: 'Easy',
        q: 'When does the scene at the village well take place?',
        opts: [
          'In the cool morning hours before midday heat',
          'During a stormy midnight',
          'Late in the evening after sunset',
          'In mid-afternoon heatwave',
        ],
        exp: '"Before the blazing heat of noon" and the title confirm early morning.',
      },
      {
        topic: 'Grammar – Word Class',
        difficulty: 'Moderate',
        q: 'What part of speech is "alone" in "Where sparrows sip and hop alone"?',
        opts: ['Adverb (modifying "hop" / manner)', 'Interjection', 'Pronoun', 'Conjunction'],
        exp: '"Alone" modifies the actions "sip and hop", functioning adverbially here.',
      },
    ],
  },

  // TEST 4 - PASSAGE A (Prose, 4 Qs)
  {
    title: 'Braille Tactile Literacy System',
    genre: 'Prose',
    text: 'At age fifteen, Louis Braille adapted a bulky twelve-dot military night code into a crisp six-dot tactile cell readable under a single fingertip. That breakthrough empowered millions of visually impaired learners worldwide to read books fluently, compose music scores, and pursue higher scholarship independently.',
    questions: [
      {
        topic: 'Factual Comprehension',
        difficulty: 'Easy',
        q: 'What crucial simplification did Louis Braille introduce to the older military night code?',
        opts: [
          'Reduced a bulky twelve-dot cell to a compact six-dot cell fitting one fingertip',
          'Replaced raised dots with neon paint',
          'Increased the grid to twenty-four dots per letter',
          'Limited reading strictly to military officers',
        ],
        exp: 'His six-dot arrangement fits smoothly beneath one fingertip for swift reading.',
      },
      {
        topic: 'Inference – Empowerment',
        difficulty: 'Moderate',
        q: 'Besides reading books, what creative and academic avenues did Braille open?',
        opts: [
          'Writing musical notation and independent higher scholarship',
          'Driving heavy locomotives blindly',
          'Eliminating spoken languages globally',
          'Replacing libraries with audio-only tapes',
        ],
        exp: 'The passage highlights fluency in reading, composing music scores, and advanced scholarship.',
      },
      {
        topic: 'Vocabulary – Phrasal Meaning',
        difficulty: 'Moderate',
        q: 'What does "breakthrough" mean in the second sentence?',
        opts: [
          'A sudden, decisive discovery that overcomes a major barrier',
          'A mechanical crack inside a stone wall',
          'A minor grammatical typo',
          'An unplanned afternoon break',
        ],
        exp: 'Breakthrough denotes an important advance solving a difficult limitation.',
      },
      {
        topic: 'Word Formation',
        difficulty: 'Easy',
        q: 'Which adverb in the passage ends with "-ly" and expresses autonomy?',
        opts: ['independently', 'breakthrough', 'tactile', 'worldwide'],
        exp: '"Independently" modifies "pursue" to express self-reliance.',
      },
    ],
  },
  // TEST 4 - PASSAGE B (Prose, 3 Qs)
  {
    title: 'Community Seed Banks in tribal Sahyadris',
    genre: 'Prose',
    text: 'In hillside villages along the Western Ghats, women farmers curate living seed banks inside earthen pots sealed with ash and neem leaves. These indigenous millet, pulse, and upland rice varieties resist erratic monsoons far better than single commercial hybrids bought on credit.',
    questions: [
      {
        topic: 'Main Idea',
        difficulty: 'Easy',
        q: 'Why do Sahyadri women farmers preserve indigenous millet and rice seeds in earthen pots?',
        opts: [
          'Native varieties tolerate erratic monsoons better and avoid debt for commercial seeds',
          'Clay pots generate electricity during winter',
          'City supermarkets prohibit indigenous millets',
          'Seeds grow faster without any rainfall at all',
        ],
        exp: 'Indigenous varieties provide climate resilience and seed sovereignty.',
      },
      {
        topic: 'Vocabulary in Context',
        difficulty: 'Moderate',
        q: 'The word "erratic" in "erratic monsoons" most closely means:',
        opts: ['Unpredictable and irregular', 'Punctual and steady', 'Freezing and snowy', 'Mildly fragrant'],
        exp: '"Erratic" means uneven or unpredictable in timing and intensity.',
      },
      {
        topic: 'Functional Usage',
        difficulty: 'Easy',
        q: 'Why are ash and neem leaves added when sealing the seed pots?',
        opts: [
          'To shield stored seeds naturally against moisture and pests',
          'To sprout the seeds prematurely',
          'To dissolve the earthen clay jar',
          'To colour the rice grains dark green',
        ],
        exp: 'Wood ash and dried neem leaves act as traditional moisture-absorbing and insect-repelling preservatives.',
      },
    ],
  },

  // TEST 5 - PASSAGE A (Prose, 4 Qs)
  {
    title: 'How Bridges Counter Thermal Expansion',
    genre: 'Prose',
    text: 'Walk across a long steel railway bridge and you will notice notched metal teeth separating the deck every few dozen metres. Because steel girders expand slightly in blazing summer afternoons and contract during winter nights, these expansion joints allow safe movement without buckling the tracks.',
    questions: [
      {
        topic: 'Cause & Effect Comprehension',
        difficulty: 'Easy',
        q: 'What purpose do the notched metal expansion joints serve on long steel bridges?',
        opts: [
          'They allow steel girders to expand and contract safely with temperature changes without buckling',
          'They slow trains down deliberately at every span',
          'They collect rainwater for passing steam locomotives',
          'They vibrate loudly to scare away river birds',
        ],
        exp: 'Thermal expansion in heat and contraction in cold require room so tracks do not warp.',
      },
      {
        topic: 'Antonym Pair in Context',
        difficulty: 'Easy',
        q: 'Which pair of opposing verbs in the passage illustrates thermal physics?',
        opts: ['"expand" and "contract"', '"walk" and "notice"', '"separate" and "buckle"', '"heat" and "steel"'],
        exp: '"Expand" (grow larger) contrasts directly with "contract" (shrink).',
      },
      {
        topic: 'Grammar – Clause Type',
        difficulty: 'Moderate',
        q: '"Because steel girders expand slightly in blazing summer afternoons" is an:',
        opts: [
          'Adverb clause of reason',
          'Relative adjective clause',
          'Imperative main clause',
          'Interrogative clause',
        ],
        exp: 'Introduced by subordinating conjunction "Because", it states why expansion joints are needed.',
      },
      {
        topic: 'Vocabulary',
        difficulty: 'Moderate',
        q: 'What does "buckling" mean in the final phrase "without buckling the tracks"?',
        opts: [
          'Bending or warping dangerously out of shape under pressure',
          'Polishing metal surfaces till shiny',
          'Fastening seatbelts carefully',
          'Painting railway sleepers white',
        ],
        exp: 'Buckling refers to structural deformation/bending when thermal stress has no escape.',
      },
    ],
  },
  // TEST 5 - PASSAGE B (Poetry, 3 Qs)
  {
    title: 'Footprints on the Shore (Verse)',
    genre: 'Poetry',
    text: 'We traced our names along the sand, / With shells and driftwood close at hand; / The rising tide erased the line, / Yet laughter stays in memory’s shrine.',
    questions: [
      {
        topic: 'Poetry – Contrast',
        difficulty: 'Easy',
        q: 'What contrast forms the core thought of this short stanza?',
        opts: [
          'Fleeting physical marks erased by waves versus lasting joyful memories',
          'Collecting expensive pearls versus losing shells',
          'Building stone forts versus chopping forests',
          'Staying silent versus shouting at ocean tides',
        ],
        exp: 'Sea tides wash away sand writing, yet shared laughter endures in memory.',
      },
      {
        topic: 'Metaphor Identification',
        difficulty: 'Moderate',
        q: 'Identify the metaphor in the final line:',
        opts: ['"memory’s shrine"', '"rising tide"', '"close at hand"', '"along the sand"'],
        exp: 'Memory is metaphorically compared to a sacred shrine preserving cherished moments.',
      },
      {
        topic: 'Comprehension Detail',
        difficulty: 'Easy',
        q: 'What erased the names traced on the beach?',
        opts: ['The rising ocean tide', 'A sudden desert sandstorm', 'Passing bullock carts', 'Heavy autumn snowfall'],
        exp: 'Line 3 states: "The rising tide erased the line."',
      },
    ],
  },
];
