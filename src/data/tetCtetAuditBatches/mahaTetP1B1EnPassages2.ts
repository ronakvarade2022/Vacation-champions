import { CuratedLangPassageItem } from './types';

// MAHA TET Paper 1 — Language 2 (English) Curated Audit Batch 1
// Passages 11–20 (Tests 6–10: 5 Prose × 4 Qs + 5 Prose/Verse × 3 Qs = 35 Unique Qs)
export const MAHA_TET_P1_B1_EN_PASSAGES_2: CuratedLangPassageItem[] = [
  // TEST 6 - PASSAGE A (Prose, 4 Qs)
  {
    title: 'How Coral Reefs Act as Ocean Nurseries',
    genre: 'Prose',
    text: 'Although coral reefs cover less than one percent of the ocean floor, nearly a quarter of all marine fish species depend on their limestone crevices for shelter and breeding. Rising sea temperatures, however, force stressed corals to expel microscopic algae that supply both vibrant colour and nourishment, causing "coral bleaching."',
    questions: [
      {
        topic: 'Factual Comprehension',
        difficulty: 'Easy',
        q: 'Approximately what fraction of marine fish species rely on coral reefs for food or shelter?',
        opts: ['Nearly a quarter (25%)', 'Less than one percent', 'Ninety-nine percent', 'Zero coastal species'],
        exp: 'The passage states nearly a quarter of all marine fish species depend on coral reefs.',
      },
      {
        topic: 'Scientific Mechanism',
        difficulty: 'Moderate',
        q: 'What triggers the phenomenon known as "coral bleaching"?',
        opts: [
          'Warm water stress causes corals to expel symbiotic algae that give colour and nutrients',
          'Fish scrub limestone reefs white using coral pebbles',
          'Submarine volcanoes coat reefs in grey volcanic mud',
          'Sharks eat only green seaweeds around islands',
        ],
        exp: 'Elevated sea temperatures expel nourishing symbiotic algae, leaving corals pale/bleached.',
      },
      {
        topic: 'Vocabulary',
        difficulty: 'Easy',
        q: 'Which word in the passage means "narrow cracks or openings"?',
        opts: ['crevices', 'nurseries', 'algae', 'vibrant'],
        exp: '"Crevices" are narrow openings inside rock or coral formations.',
      },
      {
        topic: 'Grammar – Conjunctive Adverb',
        difficulty: 'Moderate',
        q: 'In the second sentence, what logical relationship does "however" introduce?',
        opts: [
          'Contrast / threat opposing the earlier positive fact',
          'Addition of a second example',
          'Chronological ending',
          'Spatial location',
        ],
        exp: '"However" signals a sharp contrast between rich biodiversity and thermal threat.',
      },
    ],
  },
  // TEST 6 - PASSAGE B (Poetry, 3 Qs)
  {
    title: 'The Banyan’s Patience (Verse)',
    genre: 'Poetry',
    text: 'Deep drops a root from bough to clay, / To hold the ancient crown upright; / No sudden storm can sweep away / What patience builds throughout the night.',
    questions: [
      {
        topic: 'Poetry – Symbolic Meaning',
        difficulty: 'Easy',
        q: 'How do the aerial prop roots of the banyan symbolize wisdom for learners?',
        opts: [
          'Steady, patient preparation builds enduring strength against life’s storms',
          'Trees grow quickest when uprooted each winter',
          'Hanging roots weaken old trunks unnecessarily',
          'Storms only strike small shrubs',
        ],
        exp: 'Patience and steady grounding ("builds throughout the night") withstand fierce storms.',
      },
      {
        topic: 'Vocabulary – Context',
        difficulty: 'Easy',
        q: 'In "To hold the ancient crown upright", what does "crown" refer to?',
        opts: [
          'The broad leafy upper canopy of the banyan tree',
          'A gold ornament lost by a monarch',
          'A stone fence around a meadow',
          'A flock of black crows',
        ],
        exp: 'In botany and poetry, a tree’s upper spreading branches and foliage are called its crown.',
      },
      {
        topic: 'Phonology – Rhyme',
        difficulty: 'Easy',
        q: 'Which pair forms an exact rhyme in the stanza?',
        opts: ['"clay" and "away"', '"root" and "storm"', '"ancient" and "night"', '"crown" and "builds"'],
        exp: 'Line 1 ends with "clay" and Line 3 ends with "away".',
      },
    ],
  },

  // TEST 7 - PASSAGE A (Prose, 4 Qs)
  {
    title: 'Bicycle Ambulances in Remote Hills',
    genre: 'Prose',
    text: 'Where steep forest footpaths remain too narrow for four-wheeled vans, rugged bicycle trailers equipped with cushioned stretchers and solar LED beacons have transformed emergency health care. Trained local volunteers pedal patients smoothly to paved road junctions in half the time required by improvised bamboo litters.',
    questions: [
      {
        topic: 'Problem Solving in Context',
        difficulty: 'Easy',
        q: 'Why are bicycle trailers more effective than motor vans on steep forest footpaths?',
        opts: [
          'They easily navigate narrow paths where wide four-wheeled vehicles cannot enter',
          'They require expensive aviation fuel',
          'They travel exclusively across frozen lakes',
          'They carry twenty passengers per trip',
        ],
        exp: 'Steep footpaths are too narrow for standard ambulances; sturdy bicycles reach patients swiftly.',
      },
      {
        topic: 'Quantitative Comparison',
        difficulty: 'Easy',
        q: 'How does bicycle trailer transit speed compare with manual bamboo litters?',
        opts: [
          'It cuts transport time roughly in half',
          'It takes three times longer',
          'It matches walking speed exactly',
          'It operates only once a month',
        ],
        exp: 'Volunteers reach paved road junctions in half the time taken by bamboo litters.',
      },
      {
        topic: 'Vocabulary',
        difficulty: 'Moderate',
        q: 'What does "improvised" mean in "improvised bamboo litters"?',
        opts: [
          'Quickly put together using whatever local materials are available',
          'Ordered months ahead from overseas factories',
          'Patented by automotive engineers',
          'Built out of solid stainless steel',
        ],
        exp: 'Improvised tools are created promptly from handy available materials like bamboo poles.',
      },
      {
        topic: 'Grammar – Modifier Identification',
        difficulty: 'Moderate',
        q: 'In "cushioned stretchers", what role does "cushioned" play?',
        opts: [
          'Past participle acting as a descriptive adjective',
          'Plural proper noun',
          'Indefinite pronoun',
          'Modal auxiliary verb',
        ],
        exp: '"Cushioned" modifies the noun "stretchers".',
      },
    ],
  },
  // TEST 7 - PASSAGE B (Prose, 3 Qs)
  {
    title: 'Why Owls Rotate Their Necks Wide',
    genre: 'Prose',
    text: 'Unlike humans, whose round eyeballs swivel smoothly inside sockets, owls have tubular eyes locked firmly forward for razor-sharp night depth perception. To scan behind themselves without rustling wings on dry twigs, owls possess fourteen neck vertebrae—double our seven—permitting silent 270-degree head turns.',
    questions: [
      {
        topic: 'Biological Cause-Effect',
        difficulty: 'Easy',
        q: 'Why cannot owls simply glance sideways by moving their eyeballs alone?',
        opts: [
          'Their elongated tubular eyes are fixed firmly forward inside their skulls',
          'They lack eye lenses altogether',
          'Sunlight permanently fuses their eyelids',
          'Their beaks block peripheral sight',
        ],
        exp: 'Tubular locked eyes enhance binocular night depth perception but require neck rotation to look aside.',
      },
      {
        topic: 'Factual Detail',
        difficulty: 'Moderate',
        q: 'How many neck vertebrae give owls their extraordinary 270-degree turn?',
        opts: ['Fourteen neck vertebrae (twice the seven in humans)', 'Seven vertebrae identical to humans', 'Only two fused bones', 'Forty wing feathers'],
        exp: 'Owls possess 14 cervical vertebrae compared to 7 in humans.',
      },
      {
        topic: 'Hunting Advantage',
        difficulty: 'Moderate',
        q: 'What hunting advantage does turning the head silently give an owl?',
        opts: [
          'Scanning wide surroundings without rustling branches or alerting prey',
          'Shaking acorns down from oak trees',
          'Mimicking thunder during rainstorms',
          'Swimming underwater more rapidly',
        ],
        exp: 'Rotating the neck avoids noisy body/wing shifting on brittle twigs.',
      },
    ],
  },

  // TEST 8 - PASSAGE A (Prose, 4 Qs)
  {
    title: 'Kalamkari Storytelling on Handwoven Cotton',
    genre: 'Prose',
    text: 'Before printed storybooks reached village squares, travelling artists unrolled painted cotton scrolls known as Kalamkari murals under oil lamps. Using bamboo pens dipped in jaggery-fermented iron dye, pomegranate rind yellow, and indigo, artisans narrated epics frame by frame while viewers followed visual panels.',
    questions: [
      {
        topic: 'Historical Context',
        difficulty: 'Easy',
        q: 'What natural pen tool gave Kalamkari textile art its distinctive name and fine lines?',
        opts: [
          'Sharpened bamboo reed pens ("kalam") dipped in natural dyes',
          'Plastic ballpoint markers',
          'Metal spray-paint canisters',
          'Electric engraving needles',
        ],
        exp: 'Artisans drew freehand epics using bamboo pens ("kalam").',
      },
      {
        topic: 'Detail Recognition',
        difficulty: 'Easy',
        q: 'Which natural source produced warm yellow pigment on Kalamkari scrolls?',
        opts: ['Pomegranate rind', 'Crushed synthetic charcoal', 'Lead oxide powder', 'Liquid mercury'],
        exp: 'The text lists iron dye, pomegranate rind yellow, and indigo.',
      },
      {
        topic: 'Educational Parallel',
        difficulty: 'Moderate',
        q: 'In modern classrooms, Kalamkari scroll narration resembles using:',
        opts: [
          'Sequential comic-strip / picture-panel storytelling for visual literacy',
          'Timed silent arithmetic drills',
          'Unillustrated Latin grammar tables',
          'Monotone memorization of zip codes',
        ],
        exp: 'Frame-by-frame painted panels paired with oral narration mirror visual sequential storytelling.',
      },
      {
        topic: 'Grammar – Tense Consistency',
        difficulty: 'Easy',
        q: 'Which dominant tense conveys this historical cultural practice?',
        opts: ['Simple Past Tense ("reached", "unrolled", "narrated")', 'Future Perfect Tense', 'Present Continuous Tense', 'Past Perfect Continuous'],
        exp: 'Consistent simple past verbs narrate an earlier historical tradition.',
      },
    ],
  },
  // TEST 8 - PASSAGE B (Poetry, 3 Qs)
  {
    title: 'Song of the Raindrops (Verse)',
    genre: 'Poetry',
    text: 'Tap upon the tin roof steep, / Waking seeds from winter sleep; / Quench the thirsty furrow’s lip, / Till bright emerald shoots up-slip.',
    questions: [
      {
        topic: 'Poetry – Imagery',
        difficulty: 'Easy',
        q: 'What effect do the falling raindrops have on dormant seeds?',
        opts: [
          'They awaken sleeping seeds to sprout into bright green shoots',
          'They wash soil completely off steep rooftops',
          'They freeze every furrow into ice',
          'They turn green leaves brown',
        ],
        exp: 'Rain wakes seeds from sleep until bright emerald shoots emerge.',
      },
      {
        topic: 'Literary Device',
        difficulty: 'Moderate',
        q: '"Quench the thirsty furrow’s lip" best illustrates:',
        opts: ['Personification (calling dry soil furrows "thirsty" with a "lip")', 'Simile using "as"', 'Pun on numbers', 'Irony'],
        exp: 'Human thirst and lips are attributed to ploughed soil furrows.',
      },
      {
        topic: 'Vocabulary – Metaphor',
        difficulty: 'Easy',
        q: 'Why are young sprouts described as "emerald shoots"?',
        opts: [
          'To highlight their fresh, vivid jewel-like green colour',
          'Because they are hard inedible stones',
          'Because farmers sell gems underground',
          'Because winter snow turns them blue',
        ],
        exp: 'Emerald is a rich green gemstone used figuratively for vivid fresh leaves.',
      },
    ],
  },

  // TEST 9 - PASSAGE A (Prose, 4 Qs)
  {
    title: 'Public Clocks and Acoustic Timekeeping',
    genre: 'Prose',
    text: 'Before pocket watches became affordable, towns relied upon tall stone clock towers whose bronze chimes echoed across markets and harbours. Farmers adjusted irrigation turns and bakers timed ovens by counting quarterly strokes, proving how shared public infrastructure synchronized an entire community’s rhythm.',
    questions: [
      {
        topic: 'Central Concept',
        difficulty: 'Easy',
        q: 'How did clock towers serve everyday workers before affordable personal watches existed?',
        opts: [
          'Audible bronze chimes let farmers and bakers coordinate work schedules together',
          'Clock towers sold cheap wristwatches at dusk',
          'Bakers baked exclusively inside tall belfries',
          'Harbour ships dismantled bells for scrap bronze',
        ],
        exp: 'Towns depended on echoing chimes to synchronize irrigation turns, market hours, and baking.',
      },
      {
        topic: 'Vocabulary in Context',
        difficulty: 'Moderate',
        q: 'In context, "synchronized" means:',
        opts: [
          'Coordinated different people’s activities smoothly in shared time',
          'Isolated workers behind locked gates',
          'Delayed every clock deliberately by one hour',
          'Silenced bells completely during festivals',
        ],
        exp: 'Synchronize means aligning actions or clocks to operate in harmony.',
      },
      {
        topic: 'Word Meaning',
        difficulty: 'Easy',
        q: 'What does "affordable" imply in the opening clause?',
        opts: [
          'Reasonably priced enough for ordinary citizens to buy',
          'Constructed only out of precious diamonds',
          'Banned by municipal decrees',
          'Impossible to repair when broken',
        ],
        exp: '"Affordable" means within modest budgets.',
      },
      {
        topic: 'Grammar – Relative Clause',
        difficulty: 'Moderate',
        q: 'Which relative pronoun links "clock towers" to their echoing chimes?',
        opts: ['whose', 'which', 'whom', 'that'],
        exp: '"whose bronze chimes echoed..." uses possessive relative pronoun "whose".',
      },
    ],
  },
  // TEST 9 - PASSAGE B (Prose, 3 Qs)
  {
    title: 'Why Flamingos Stand on One Leg',
    genre: 'Prose',
    text: 'Biologists studying captive and wild flamingos observed that birds resting on one slender leg sway less and expend markedly less muscular energy than those standing on two. Locking one knee joint passively supports body weight while tucking the second leg into warm chest feathers reduces heat loss in chilly lagoons.',
    questions: [
      {
        topic: 'Main Scientific Finding',
        difficulty: 'Easy',
        q: 'What dual benefit do flamingos gain by standing on a single leg in lagoons?',
        opts: [
          'Conserves muscular energy through passive joint locking and preserves body heat',
          'Scares away deep-ocean whales completely',
          'Increases speed while flying over mountains',
          'Allows sleeping underwater for hours',
        ],
        exp: 'Both passive skeletal stability (less muscular effort) and reduced heat loss in cold water explain the posture.',
      },
      {
        topic: 'Vocabulary – Context',
        difficulty: 'Moderate',
        q: 'What does "markedly" convey in "expend markedly less muscular energy"?',
        opts: ['Noticeably and significantly', 'Barely or invisibly', 'Accidentally', 'Temporarily for two seconds'],
        exp: '"Markedly" means to an obvious, measurable degree.',
      },
      {
        topic: 'Antonym Recognition',
        difficulty: 'Easy',
        q: 'Choose the best antonym for "slender" as applied to flamingo legs:',
        opts: ['Thick / stout', 'Slim', 'Thin', 'Graceful'],
        exp: 'Slender means thin and graceful; its opposite is thick or stout.',
      },
    ],
  },

  // TEST 10 - PASSAGE A (Prose, 4 Qs)
  {
    title: 'Restoring Urban Stepwells in Pune and Ahmedabad',
    genre: 'Prose',
    text: 'Neglected for decades as dusty rubbish pits, stone stepwells across western Indian cities are witnessing joyful civic revival. Neighbourhood youth volunteers clear plastic debris, uncover carved sandstone arches, and channel rooftop storm drains back into historic basins—turning forgotten heritage back into cool community rainwater reserves.',
    questions: [
      {
        topic: 'Main Idea',
        difficulty: 'Easy',
        q: 'What dual purpose does restoring neglected urban stepwells accomplish today?',
        opts: [
          'Revives architectural heritage while replenishing urban rainwater reserves',
          'Replaces public parks with multi-storey parking garages',
          'Stores toxic industrial waste safely underground',
          'Seals natural springs with concrete slabs',
        ],
        exp: 'Cleared stepwells recover carved sandstone heritage and act as stormwater recharge reservoirs.',
      },
      {
        topic: 'Inference – Civic Agency',
        difficulty: 'Easy',
        q: 'Who spearheaded the cleanup and restoration described in the passage?',
        opts: [
          'Local neighbourhood youth volunteers',
          'Automated deep-sea submarines',
          'Foreign tourists visiting briefly for one hour',
          'Heavy demolition contractors',
        ],
        exp: 'The passage highlights "Neighbourhood youth volunteers" clearing debris and routing rooftop rain.',
      },
      {
        topic: 'Vocabulary',
        difficulty: 'Moderate',
        q: 'The word "revival" most nearly signifies:',
        opts: [
          'Bringing something neglected back to active life and usefulness',
          'Destroying ancient monuments completely',
          'Recording dull statistics in ledgers',
          'Forgetting historical sites forever',
        ],
        exp: 'Revival refers to restoration to active use and vitality.',
      },
      {
        topic: 'Grammar – Non-finite Verb',
        difficulty: 'Moderate',
        q: 'In "Neglected for decades as dusty rubbish pits, stone stepwells...", what is "Neglected"?',
        opts: [
          'Past participle opening a participial modifier phrase',
          'Base infinitive command',
          'Possessive pronoun',
          'Gerund subject',
        ],
        exp: '"Neglected..." functions as a past participial phrase modifying "stone stepwells".',
      },
    ],
  },
  // TEST 10 - PASSAGE B (Poetry, 3 Qs)
  {
    title: 'The Compass Needle (Verse)',
    genre: 'Poetry',
    text: 'Shake the dial or toss the boat, / Amid the shifting foam afloat; / Steady trembles still my spire, / Faithful to one polar star’s desire.',
    questions: [
      {
        topic: 'Poetry – Theme',
        difficulty: 'Easy',
        q: 'What character virtue does the compass needle symbolize amid rough seas?',
        opts: [
          'Steadfast fidelity to true principle despite turbulent surroundings',
          'Yielding immediately whenever wind direction shifts',
          'Sinking quickly at the first sight of foam',
          'Breaking the glass dial in frustration',
        ],
        exp: 'Even when tossed by shifting waves, the needle reliably points north.',
      },
      {
        topic: 'Context Clue',
        difficulty: 'Easy',
        q: 'Which word in the poem is used synonymously for the pointed compass needle?',
        opts: ['spire', 'foam', 'dial', 'boat'],
        exp: '"Steady trembles still my spire" refers poetically to the tapered compass needle.',
      },
      {
        topic: 'Alliteration Detection',
        difficulty: 'Moderate',
        q: 'Which phrase in Line 3 displays clear initial consonant alliteration?',
        opts: ['"Steady trembles still my spire"', '"Shake the dial"', '"toss the boat"', '"polar star’s desire"'],
        exp: 'Repeated "st-" / "s" sounds in "Steady ... still ... spire" create crisp alliteration.',
      },
    ],
  },
];
