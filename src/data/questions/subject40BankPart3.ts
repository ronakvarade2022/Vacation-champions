import { ClassLevel, QuizLevel, SubjectName } from '../../types';
import { RawQuizSpec } from './subject40BankPart1';

/**
 * Part 3 of the Verified Curriculum Bank:
 * Provides 40 completely unique questions (4 Levels × 10 Questions) for:
 * 15. Drawing and Creative Activities (Class 1 & Primary)
 * 16. Physics (Class 9 & Class 10 Separate Science Subject)
 * 17. Chemistry (Class 9 & Class 10 Separate Science Subject)
 * 18. Biology (Class 9 & Class 10 Separate Science Subject)
 * 19. Political Science (Class 9 & Class 10 Separate Social Science Subject)
 * 20. Information Technology (Class 9 & Class 10)
 * 21. Environmental Education (Class 9 & Class 10)
 * 22. Physical Education (Class 9 & Class 10)
 * 23. Mathematics – Algebra (Class 10 SSC Part 1)
 * 24. Mathematics – Geometry (Class 10 SSC Part 2)
 */
export function getPart3SubjectQuestions(
  classLevel: ClassLevel,
  subject: SubjectName,
  level: QuizLevel
): RawQuizSpec[] | null {
  const c = parseInt(classLevel.replace('Class ', ''), 10) || 1;

  // ============================================================================
  // 15. DRAWING AND CREATIVE ACTIVITIES — 40 Unique Questions (10 per Level)
  // ============================================================================
  if (subject === 'Drawing and Creative Activities') {
    if (level === 1) {
      return [
        {
          text: `Look at the colour palette 🎨. Which of the following is a set of the three PRIMARY colours in art?`,
          options: ['Red, Yellow, Blue', 'Green, Orange, Purple', 'Pink, Brown, Grey', 'Black, White, Silver'],
          correctIndex: 0,
          diagramEmoji: '🎨',
          explanation: 'Red, Yellow, and Blue are the three primary colours because they cannot be made by mixing other colours.',
          topic: 'Primary Colours'
        },
        {
          text: `Fill in the blank: When you mix RED and YELLOW paint together in equal amounts, you get the colour _____.`,
          options: ['Green', 'Orange', 'Purple', 'Blue'],
          correctIndex: 1,
          explanation: 'Mixing primary colours Red and Yellow produces the secondary colour Orange.',
          topic: 'Colour Mixing'
        },
        {
          text: `True or False: A circle ⭕ has no straight sides and no sharp corners.`,
          options: ['True', 'False', 'It has 4 corners', 'It has 3 straight sides'],
          correctIndex: 0,
          diagramEmoji: '⭕',
          explanation: 'A circle is a curved closed shape with 0 straight sides and 0 corners.',
          topic: 'Basic Drawing Shapes'
        },
        {
          text: `Which drawing tool is best used first to sketch light outlines that can be easily erased if needed?`,
          options: ['Permanent Marker', 'Lead Pencil (HB/2B)', 'Oil Paint Brush', 'Glitter Glue'],
          correctIndex: 1,
          explanation: 'A graphite pencil (HB or 2B) allows artists to draw light outlines and erase mistakes cleanly.',
          topic: 'Drawing Tools'
        },
        {
          text: `When colouring a picture of a healthy leafy mango tree 🌳, which colour is naturally used for the leaves?`,
          options: ['Green', 'Violet', 'Silver', 'Blue'],
          correctIndex: 0,
          diagramEmoji: '🌳',
          explanation: 'Tree leaves contain chlorophyll and are naturally coloured shades of green.',
          topic: 'Nature Observation & Colouring'
        },
        {
          text: `Match the Colour Pair: Mixing BLUE and YELLOW paint together creates which colour?`,
          options: ['Green', 'Red', 'Orange', 'Pink'],
          correctIndex: 0,
          explanation: 'Blue + Yellow = Green, one of the three secondary colours.',
          topic: 'Secondary Colours'
        },
        {
          text: `Complete the sentence: Folding a square sheet of paper neatly without cutting or glue to make a paper boat or bird is called _____.`,
          options: ['Origami (Paper Folding)', 'Pottery', 'Carving', 'Weaving'],
          correctIndex: 0,
          explanation: 'Origami is the creative art of folding paper into decorative shapes such as boats, cranes, and flowers.',
          topic: 'Paper Craft & Origami'
        },
        {
          text: `If you want to draw a bright sunny sky with a rainbow 🌈, how many main colours does a natural rainbow have (VIBGYOR)?`,
          options: ['5 colours', '7 colours', '3 colours', '10 colours'],
          correctIndex: 1,
          diagramEmoji: '🌈',
          explanation: 'A rainbow has 7 colours: Violet, Indigo, Blue, Green, Yellow, Orange, and Red (VIBGYOR).',
          topic: 'Rainbow Colours'
        },
        {
          text: `Which geometric shape is commonly used as the roof when children draw a simple village hut 🏠?`,
          options: ['Triangle', 'Hexagon', 'Oval', 'Cylinder'],
          correctIndex: 0,
          diagramEmoji: '🏠',
          explanation: 'A triangle is placed on top of a square or rectangle to form a classic pitched roof of a hut.',
          topic: 'Shape Composition'
        },
        {
          text: `Pattern Recognition: Look at the decorative border pattern — ⭐ 🔵 ⭐ 🔵 ⭐ ___. Which shape comes next?`,
          options: ['🔵 (Blue Circle)', '⭐ (Star)', '🔺 (Triangle)', '🟩 (Green Square)'],
          correctIndex: 0,
          explanation: 'The alternating pattern repeats Star followed by Blue Circle, so Blue Circle comes next.',
          topic: 'Decorative Patterns'
        }
      ];
    }

    if (level === 2) {
      return [
        {
          text: `Which colours are produced when we mix two primary colours together (such as Orange, Green, and Purple/Violet)?`,
          options: ['Secondary Colours', 'Neutral Colours', 'Monochrome Colours', 'Metallic Colours'],
          correctIndex: 0,
          explanation: 'Secondary colours (Orange, Green, Violet) are formed by mixing two primary colours in equal proportions.',
          topic: 'Colour Theory'
        },
        {
          text: `Fill in the blank: Mixing RED and BLUE paint together creates the secondary colour _____.`,
          options: ['Purple (Violet)', 'Yellow', 'Green', 'White'],
          correctIndex: 0,
          explanation: 'Red + Blue produces Purple (Violet).',
          topic: 'Colour Mixing Practice'
        },
        {
          text: `True or False: Red, Orange, and Yellow are known as WARM colours because they remind us of sunlight and fire.`,
          options: ['True', 'False', 'They are icy cold colours', 'They are invisible colours'],
          correctIndex: 0,
          explanation: 'Red, Orange, and Yellow are warm colours, whereas Blue, Green, and Violet are cool colours.',
          topic: 'Warm & Cool Colours'
        },
        {
          text: `In Maharashtra's traditional festival art, what do we call the colourful patterns drawn on the floor near doorsteps using rice flour or coloured powder?`,
          options: ['Rangoli (रांगोळी)', 'Sculpture', 'Oil Canvas', 'Glass Etching'],
          correctIndex: 0,
          explanation: 'Rangoli is a traditional Indian folk art drawn using dots, lines, and geometric symmetry during festivals.',
          topic: 'Indian Folk Art – Rangoli'
        },
        {
          text: `When colouring inside a shape with crayons or colour pencils, which habit gives the neatest artistic finish?`,
          options: [
            'Stroking smoothly in one consistent direction without crossing the boundary line',
            'Scribbling outside the lines in every direction',
            'Tearing the drawing sheet with hard pressure',
            'Leaving half the border uncoloured'
          ],
          correctIndex: 0,
          explanation: 'Colouring in a single uniform direction while staying inside the outline creates a smooth, even texture.',
          topic: 'Neat Colouring Technique'
        },
        {
          text: `Identify the INCORRECT statement about Cool Colours in painting:`,
          options: [
            'Blue, Green, and Light Purple are Cool Colours',
            'Cool colours are great for painting calm water, sky, and lush forests',
            'Bright fiery Red is the coolest colour on the colour wheel',
            'Cool colours create a soothing and peaceful visual effect'
          ],
          correctIndex: 2,
          explanation: 'Bright Red is a warm colour, not a cool colour.',
          topic: 'Warm vs Cool Palette'
        },
        {
          text: `Complete the sentence: When a butterfly drawing 🦋 has the exact same wing shape and pattern on both the left and right sides, it shows _____.`,
          options: ['Symmetry (Line of Symmetry)', 'Randomness', 'Erasure', 'Asymmetry'],
          correctIndex: 0,
          diagramEmoji: '🦋',
          explanation: 'Symmetry means one half of an object or drawing is the mirror image of the other half.',
          topic: 'Symmetry in Art'
        },
        {
          text: `If an artist adds WHITE paint to Red paint to make it lighter, what colour tint is formed?`,
          options: ['Pink', 'Dark Brown', 'Navy Blue', 'Deep Black'],
          correctIndex: 0,
          explanation: 'Adding white to red creates a lighter tint known as Pink.',
          topic: 'Tints and Shades'
        },
        {
          text: `Look at the clay pot icon 🏺. What is the creative activity of shaping wet clay into bowls, toys, and pots called?`,
          options: ['Pottery / Clay Modelling', 'Calligraphy', 'Collage Making', 'Screen Printing'],
          correctIndex: 0,
          diagramEmoji: '🏺',
          explanation: 'Clay modelling and pottery involve shaping soft clay into three-dimensional functional or decorative forms.',
          topic: 'Clay Modelling'
        },
        {
          text: `In a "Thumbprint Art" activity, how do students create cute caterpillars, birds, and flowers?`,
          options: [
            'By dipping their thumb in safe water-based paint, pressing it on paper, and adding details with a pen',
            'By cutting metal sheets with a saw',
            'By using oil grease on walls',
            'By erasing the entire page'
          ],
          correctIndex: 0,
          explanation: 'Thumbprint art uses safe watercolour impressions of fingertips/thumbs turned into imaginative characters.',
          topic: 'Creative Printmaking'
        }
      ];
    }

    if (level === 3) {
      return [
        {
          text: `Which famous tribal folk art of Maharashtra uses simple geometric shapes — a circle, a triangle, and a square — painted in white on an earthy red/brown background?`,
          options: ['Warli Painting (वारली चित्रकला)', 'Tanjore Glass Painting', 'Mughal Miniature', 'Gothic Stained Glass'],
          correctIndex: 0,
          explanation: 'Warli art from northern Sahyadri (Palghar/Thane, Maharashtra) uses circles (sun/moon), triangles (mountains/human torsos), and squares (sacred enclosures).',
          topic: 'Warli Art of Maharashtra'
        },
        {
          text: `Fill in the blank: Adding a small amount of BLACK to any pure colour on the palette creates a darker _____ of that colour.`,
          options: ['Shade', 'Tint', 'Primary', 'Highlight'],
          correctIndex: 0,
          explanation: 'In colour theory, adding White produces a Tint, while adding Black produces a Shade.',
          topic: 'Tints, Tones & Shades'
        },
        {
          text: `True or False: In pencil shading, a "6B" pencil has softer, darker graphite than a "2H" pencil.`,
          options: ['True', 'False', '2H is the darkest charcoal', 'All pencils have identical darkness'],
          correctIndex: 0,
          explanation: '"B" stands for Blackness (soft lead for dark shading), while "H" stands for Hardness (light, fine lines).',
          topic: 'Pencil Grading (H & B)'
        },
        {
          text: `Match the Art Technique with its description: What is a "Collage"?`,
          options: [
            'An artwork made by pasting different materials like coloured paper bits, fabric, leaves, or photographs onto a surface',
            'A statue carved from a single block of marble',
            'A sketch drawn only with a ruler',
            'A song sung during school assembly'
          ],
          correctIndex: 0,
          explanation: 'Collage is a creative visual art technique where variados textures and paper cutouts are assembled into a composition.',
          topic: 'Collage & Mixed Media'
        },
        {
          text: `In landscape drawing, why are distant mountains and trees drawn smaller than objects in the foreground?`,
          options: [
            'To show depth and perspective (objects farther away appear smaller to the human eye)',
            'Because mountains are actually smaller than grass',
            'Because the artist ran out of paper',
            'To hide the sky'
          ],
          correctIndex: 0,
          explanation: 'Perspective in drawing creates the illusion of 3D depth on a flat 2D sheet by scaling distant objects smaller.',
          topic: 'Perspective & Depth'
        },
        {
          text: `Which pair of colours lies directly opposite each other on the Colour Wheel (Complementary Colours)?`,
          options: ['Red and Green', 'Red and Orange', 'Blue and Green', 'Yellow and Light Green'],
          correctIndex: 0,
          explanation: 'Complementary colours sit opposite each other on the colour wheel: Red–Green, Blue–Orange, and Yellow–Violet.',
          topic: 'Complementary Colours'
        },
        {
          text: `Complete the sentence: When drawing a 3D sphere (like a cricket ball) with a light source on the top-left, the shadow falls on the _____.`,
          options: ['Bottom-right side opposite the light source', 'Top-left directly inside the light beam', 'Middle of the light bulb', 'Nowhere'],
          correctIndex: 0,
          explanation: 'Light travels in straight lines, so the cast shadow always forms on the side directly opposite to the light source.',
          topic: 'Light & Shadow in Shading'
        },
        {
          text: `If a student creates a greeting card using dried fallen leaves, pressed flower petals, and twigs without plucking live plants, what type of craft is this?`,
          options: ['Eco-Friendly Nature Craft / Herbarium Art', 'Plastic Moulding', 'Metal Welding', 'Digital Animation'],
          correctIndex: 0,
          explanation: 'Using naturally fallen leaves and petals is a sustainable, eco-friendly nature craft activity.',
          topic: 'Eco-Friendly Creative Craft'
        },
        {
          text: `Look at the paintbrush icon 🖌️. In watercolour painting, what happens when you add more water to the pigment?`,
          options: [
            'The colour becomes more transparent and lighter (a wash)',
            'The colour turns into solid stone',
            'The colour becomes pitch black',
            'The paper becomes waterproof metal'
          ],
          correctIndex: 0,
          diagramEmoji: '🖌️',
          explanation: 'Watercolours are transparent media; adding water dilutes pigment density to create soft, luminous washes.',
          topic: 'Watercolour Wash Technique'
        },
        {
          text: `Logical Art Puzzle: An artist has a 4×4 grid of 16 squares and colours them like a chessboard (alternating Black and White). How many White squares are there?`,
          options: ['8 White squares', '4 White squares', '12 White squares', '16 White squares'],
          correctIndex: 0,
          explanation: 'In an alternating 16-square checkerboard pattern, exactly half (16 ÷ 2 = 8) are White and 8 are Black.',
          topic: 'Grid Patterns & Design'
        }
      ];
    }

    // Level 4: Expert Challenge
    return [
      {
        text: `In Warli folk painting of Maharashtra, what is the traditional "Tarpa" shown at the centre of the circular community dance?`,
        options: [
          'A traditional wind musical instrument played while dancers move in a spiral circle',
          'A modern electric guitar',
          'A stone temple chariot',
          'A metal sword'
        ],
        correctIndex: 0,
        explanation: 'The Tarpa dance is a central theme in Warli art, where villagers hold hands in a spiral circle around the Tarpa player.',
        topic: 'Cultural Heritage in Art'
      },
      {
        text: `Fill in the blank: Colours created by mixing one Primary colour with an adjacent Secondary colour (such as Red-Orange or Blue-Green) are called _____ colours.`,
        options: ['Tertiary (Intermediate)', 'Monochromatic', 'Achromatic', 'Invisible'],
        correctIndex: 0,
        explanation: 'There are six Tertiary colours formed by combining a primary colour with its neighbouring secondary colour.',
        topic: '12-Part Colour Wheel'
      },
      {
        text: `True or False: In one-point perspective drawing, parallel lines receding into the distance appear to meet at a single "Vanishing Point" on the horizon line.`,
        options: ['True', 'False', 'Parallel lines curve into circles', 'Horizon line is always vertical'],
        correctIndex: 0,
        explanation: 'In linear one-point perspective (like railway tracks receding into the distance), receding lines converge at the vanishing point on the horizon.',
        topic: 'One-Point Perspective'
      },
      {
        text: `Match the Pencil Shading Technique: Using closely spaced parallel lines crossed by another set of lines at an angle to build dark tone is called:`,
        options: ['Cross-Hatching', 'Stippling (Dots)', 'Finger Blending', 'Eraser Lifting'],
        correctIndex: 0,
        explanation: 'Hatching uses single-direction parallel lines, while Cross-Hatching layers intersecting lines to deepen tonal value.',
        topic: 'Advanced Shading Techniques'
      },
      {
        text: `Which UNESCO World Heritage caves in Chhatrapati Sambhajinagar (Aurangabad) district of Maharashtra are world-famous for ancient mural paintings (frescoes)?`,
        options: ['Ajanta Caves', 'Elephanta Caves', 'Karla Caves', 'Pandavleni Caves'],
        correctIndex: 0,
        explanation: 'The Ajanta Caves in Maharashtra are renowned worldwide for their expressive ancient Buddhist mural paintings created using natural mineral pigments.',
        topic: 'Ajanta Mural Art Heritage'
      },
      {
        text: `Identify the INCORRECT statement about "Still Life" drawing:`,
        options: [
          'Still life involves drawing inanimate objects like fruits, vases, books, or lamps arranged on a table',
          'Observing proportions, light source, and cast shadows is essential in still life',
          'Still life subjects must be running wild animals in a jungle',
          'Different surface textures like smooth glass and rough cloth are rendered through shading'
        ],
        correctIndex: 2,
        explanation: '"Still Life" specifically depicts stationary, non-moving objects arranged for careful observation.',
        topic: 'Still Life Composition'
      },
      {
        text: `Complete the sentence: A painting executed entirely using different tints, tones, and shades of a SINGLE colour (plus white and black) is called a _____ painting.`,
        options: ['Monochromatic', 'Polychromatic', 'Fluorescent', 'Complementary'],
        correctIndex: 0,
        explanation: '"Mono" means one and "Chroma" means colour; monochromatic art explores the full tonal range of a single hue.',
        topic: 'Monochromatic Harmony'
      },
      {
        text: `In poster design for an "Environment & Water Conservation" campaign, which visual principle ensures the main slogan is readable from a distance?`,
        options: [
          'High colour contrast between bold typography and the background with balanced negative space',
          'Writing tiny cursive letters in yellow ink on white paper',
          'Covering every millimetre with microscopic paragraphs',
          'Placing the title upside down'
        ],
        correctIndex: 0,
        explanation: 'Effective poster design relies on clear visual hierarchy, strong contrast, and legible lettering.',
        topic: 'Poster Design & Typography'
      },
      {
        text: `Look at the🎭 icon. In creative puppetry and mask-making using waste paper strips soaked in flour-water paste or glue, what is this technique called?`,
        options: ['Papier-mâché (Paper Pulp Craft)', 'Origami', 'Batik Dyeing', 'Block Printing'],
        correctIndex: 0,
        diagramEmoji: '🎭',
        explanation: 'Papier-mâché uses paper strips or pulp bound with adhesive to mould strong, lightweight masks and sculptures.',
        topic: '3D Papier-Mâché Craft'
      },
      {
        text: `Symmetry Challenge: How many lines of symmetry does a regular 8-petal lotus Mandala design have?`,
        options: ['8 lines of symmetry', '2 lines of symmetry', '4 lines of symmetry', '0 lines of symmetry'],
        correctIndex: 0,
        explanation: 'A regular n-fold radial Mandala with 8 identical equidistant petals has 8 lines of reflectional symmetry.',
        topic: 'Radial Symmetry & Mandala Art'
      }
    ];
  }

  // ============================================================================
  // 16. PHYSICS — 40 Unique Questions (10 per Level, Separate Science Subject)
  // ============================================================================
  if (subject === 'Physics') {
    if (level === 1) {
      return [
        {
          text: `What is the SI unit of electric current measured using an ammeter?`,
          options: ['Ampere (A)', 'Volt (V)', 'Ohm (Ω)', 'Watt (W)'],
          correctIndex: 0,
          explanation: 'Electric current (I = Q/t) is measured in Amperes (A) in the International System of Units (SI).',
          topic: 'Current Electricity'
        },
        {
          text: `Fill in the blank: The shortest straight-line distance from the initial position to the final position of a moving body is called _____.`,
          options: ['Displacement', 'Total Path Length', 'Speed', 'Inertia'],
          correctIndex: 0,
          explanation: 'Displacement is a vector quantity representing the shortest directed distance between initial and final points.',
          topic: 'Laws of Motion'
        },
        {
          text: `True or False: Sound waves are mechanical longitudinal waves that CANNOT travel through a vacuum.`,
          options: ['True', 'False', 'Sound travels fastest in vacuum', 'Sound is an electromagnetic wave'],
          correctIndex: 0,
          explanation: 'Sound requires a material medium (solid, liquid, or gas) to propagate via compressions and rarefactions.',
          topic: 'Study of Sound'
        },
        {
          text: `Who formulated the Universal Law of Gravitation and the Three Laws of Motion?`,
          options: ['Sir Isaac Newton', 'Michael Faraday', 'James Clerk Maxwell', 'Niels Bohr'],
          correctIndex: 0,
          explanation: 'Sir Isaac Newton formulated the Three Laws of Motion and the Universal Law of Gravitation (F = G·m₁m₂/r²).',
          topic: 'Gravitation & Motion'
        },
        {
          text: `According to Ohm's Law, if the physical state of a conductor remains constant, the potential difference (V) across its ends is directly proportional to:`,
          options: ['The electric current (I) flowing through it (V = I × R)', 'The square of resistance', 'The length of the ammeter', 'Atmospheric pressure'],
          correctIndex: 0,
          explanation: 'Ohm’s Law states V ∝ I, or V = I·R, where R is the resistance of the conductor.',
          topic: 'Ohm’s Law'
        },
        {
          text: `Which type of spherical mirror is used by dentists to see an enlarged, erect image of teeth when held close?`,
          options: ['Concave Mirror', 'Convex Mirror', 'Plane Glass Sheet', 'Opaque Block'],
          correctIndex: 0,
          explanation: 'A concave mirror forms a virtual, erect, and magnified image when the object is placed between its pole (P) and focus (F).',
          topic: 'Reflection of Light'
        },
        {
          text: `Complete the formula: In physics, Mechanical Work done (W) when a force acts along the direction of displacement is equal to _____.`,
          options: ['Force × Displacement (W = F × s)', 'Force ÷ Time', 'Mass × Velocity', 'Power × Acceleration'],
          correctIndex: 0,
          explanation: 'Work done is the product of force and displacement in the direction of force: W = F · s, measured in Joules (J).',
          topic: 'Work and Energy'
        },
        {
          text: `A car starting from rest reaches a velocity of ${c * 2} m/s in ${c} seconds. What is its uniform acceleration?`,
          options: ['2 m/s²', '4 m/s²', '1 m/s²', '10 m/s²'],
          correctIndex: 0,
          explanation: `Acceleration a = (v - u) / t = (${c * 2} - 0) / ${c} = 2 m/s².`,
          topic: 'Kinematics & Acceleration'
        },
        {
          text: `Look at the bulb icon 💡. Which metal with a very high melting point (~3422 °C) is used for the filament of an incandescent electric bulb?`,
          options: ['Tungsten (W)', 'Lead', 'Tin', 'Aluminium'],
          correctIndex: 0,
          diagramEmoji: '💡',
          explanation: 'Tungsten has an extremely high melting point and resistivity, allowing it to glow white-hot without melting.',
          topic: 'Effects of Electric Current'
        },
        {
          text: `What is the value of acceleration due to gravity (g) on the surface of the Earth (approximate standard value)?`,
          options: ['9.8 m/s²', '1.62 m/s²', '24.8 m/s²', '0 m/s²'],
          correctIndex: 0,
          explanation: 'On Earth’s surface, average acceleration due to gravity g ≈ 9.8 m/s².',
          topic: 'Gravitation'
        }
      ];
    }

    if (level === 2) {
      return [
        {
          text: `Calculate the kinetic energy (KE = ½mv²) of an object of mass 4 kg moving with a uniform velocity of 5 m/s:`,
          options: ['50 Joules', '20 Joules', '100 Joules', '10 Joules'],
          correctIndex: 0,
          explanation: 'KE = ½ × m × v² = 0.5 × 4 × (5)² = 2 × 25 = 50 Joules.',
          topic: 'Kinetic & Potential Energy'
        },
        {
          text: `Fill in the blank: The phenomenon of splitting of white light into its seven constituent colours (VIBGYOR) when passing through a glass prism is called _____.`,
          options: ['Dispersion of Light', 'Lateral Inversion', 'Echo Reflection', 'Rectilinear Propagation'],
          correctIndex: 0,
          explanation: 'Dispersion occurs because different wavelengths of light bend by different angles when refracting through a prism.',
          topic: 'Refraction & Dispersion of Light'
        },
        {
          text: `True or False: When two resistors of 6 Ω and 3 Ω are connected in PARALLEL, their equivalent resistance is 2 Ω.`,
          options: ['True', 'False', 'It is 9 Ω', 'It is 18 Ω'],
          correctIndex: 0,
          explanation: 'For parallel resistors: 1/Rp = 1/6 + 1/3 = 3/6 = 1/2, so Rp = 2 Ω.',
          topic: 'Series & Parallel Combination'
        },
        {
          text: `Match the Physical Quantity with its correct SI Unit:`,
          options: [
            'Frequency → Hertz (Hz) | Power of a Lens → Dioptre (D)',
            'Frequency → Newton | Power of a Lens → Pascal',
            'Frequency → Joule | Power of a Lens → Coulomb',
            'Frequency → Watt | Power of a Lens → Tesla'
          ],
          correctIndex: 0,
          explanation: 'Frequency of sound/waves is measured in Hertz (Hz), and optical power of a lens (P = 1/f in metres) is measured in Dioptres (D).',
          topic: 'Physical Units & Lenses'
        },
        {
          text: `Why are convex mirrors preferred as rear-view wing mirrors in motor vehicles?`,
          options: [
            'They always form an erect, diminished image and provide a wider field of view of traffic behind',
            'They form inverted, magnified images',
            'They absorb all sunlight',
            'They focus parallel rays to burn paper'
          ],
          correctIndex: 0,
          explanation: 'Convex mirrors diverge light rays to produce a virtual, erect, and smaller image covering a wide field of view.',
          topic: 'Applications of Spherical Mirrors'
        },
        {
          text: `Identify the INCORRECT statement regarding Kepler's Laws of Planetary Motion:`,
          options: [
            'The orbit of a planet is an ellipse with the Sun at one of the foci',
            'The line joining the planet and the Sun sweeps equal areas in equal intervals of time',
            'The square of its period of revolution around the Sun is directly proportional to the cube of the mean distance (T² ∝ r³)',
            'All planets move in perfect square orbits at zero speed'
          ],
          correctIndex: 3,
          explanation: 'Kepler’s three laws describe elliptical orbits, equal areal velocity, and the harmonic law T² ∝ r³.',
          topic: 'Kepler’s Laws & Gravitation'
        },
        {
          text: `Complete the sentence: According to Newton's Third Law of Motion, every action force has an equal and opposite _____ force that acts simultaneously on two different bodies.`,
          options: ['Reaction', 'Gravitational', 'Magnetic', 'Electrostatic'],
          correctIndex: 0,
          explanation: 'Newton’s Third Law states that to every action there is always an instantaneous, equal, and opposite reaction.',
          topic: 'Newton’s Laws of Motion'
        },
        {
          text: `If the focal length (f) of a convex lens is +0.25 metres (+25 cm), what is the optical power (P = 1/f) of the lens?`,
          options: ['+4.0 Dioptre (+4 D)', '+0.25 Dioptre', '-4.0 Dioptre', '+25 Dioptre'],
          correctIndex: 0,
          explanation: 'Power P = 1 / f(in metres) = 1 / 0.25 = +4.0 D.',
          topic: 'Lenses & Optical Power'
        },
        {
          text: `Look at the satellite icon 🛰️. What is the minimum initial velocity required for an object projected vertically upward from Earth's surface to overcome Earth's gravitational pull forever?`,
          options: ['Escape Velocity (≈ 11.2 km/s)', 'Orbital Drift (≈ 1.0 km/s)', 'Speed of Sound (≈ 343 m/s)', 'Terminal Velocity'],
          correctIndex: 0,
          diagramEmoji: '🛰️',
          explanation: 'Escape velocity v_esc = √(2GM/R) ≈ 11.2 km/s on Earth.',
          topic: 'Space Missions & Escape Velocity'
        },
        {
          text: `An echo is heard clearly at 22 °C (speed of sound ≈ 344 m/s) only if the reflecting obstacle is at least what minimum distance away from the listener?`,
          options: ['17.2 metres', '1.72 metres', '172 metres', '0.5 metres'],
          correctIndex: 0,
          explanation: 'Since persistence of hearing is 0.1 s, total distance = 344 × 0.1 = 34.4 m, so minimum one-way distance = 34.4 / 2 = 17.2 m.',
          topic: 'Reflection of Sound & Echo'
        }
      ];
    }

    if (level === 3) {
      return [
        {
          text: `According to Joule's Law of Heating, the heat (H) produced in a resistor of resistance R carrying current I for time t is given by the formula:`,
          options: ['H = I² · R · t', 'H = I · R² · t', 'H = V / R', 'H = m · g · h'],
          correctIndex: 0,
          explanation: 'Joule’s law of heating states that heat generated in a conductor is H = I²Rt Joules.',
          topic: 'Heating Effect of Electric Current'
        },
        {
          text: `Fill in the blank: The anomalous behaviour of water means that when water is cooled from 4 °C down to 0 °C, its volume _____ instead of contracting.`,
          options: ['Expands (increases), so its density decreases', 'Shrinks to zero', 'Evaporates into steam', 'Turns into mercury'],
          correctIndex: 0,
          explanation: 'Water has maximum density at 4 °C; cooling it from 4 °C to 0 °C causes it to expand, allowing ice to float on lakes.',
          topic: 'Heat & Anomalous Behaviour of Water'
        },
        {
          text: `True or False: Fleming's Left-Hand Rule is used to find the direction of force on a current-carrying conductor placed in a magnetic field (as in an Electric Motor).`,
          options: ['True', 'False', 'It measures atmospheric humidity', 'It only applies to wooden sticks'],
          correctIndex: 0,
          explanation: 'In Fleming’s Left-Hand Rule, the Forefinger points along the Magnetic Field, the Middle finger along Current, and the Thumb indicates the Force/Motion.',
          topic: 'Magnetic Effects of Electric Current'
        },
        {
          text: `Which defect of human vision occurs when a person can see nearby objects clearly, but distant objects appear blurred because the image forms in front of the retina?`,
          options: ['Myopia (Nearsightedness), corrected using a Concave Lens', 'Hypermetropia, corrected using a Cylindrical Mirror', 'Presbyopia, corrected using an Opaque Disc', 'Color Blindness, corrected using a Prism'],
          correctIndex: 0,
          explanation: 'Myopia (nearsightedness) is caused by excessive convergence of the eye lens or elongation of the eyeball and is corrected with a diverging (concave) lens.',
          topic: 'Human Eye & Defects of Vision'
        },
        {
          text: `When a ray of light travels from an optically denser medium (like glass) into an optically rarer medium (like air) at an angle of incidence greater than the critical angle, what occurs?`,
          options: ['Total Internal Reflection (used in optical fibres and mirage formation)', 'Complete Absorption', 'Zero Velocity', 'Sound Amplification'],
          correctIndex: 0,
          explanation: 'Total Internal Reflection (TIR) occurs when light travelling from denser to rarer medium strikes the boundary at i > critical angle.',
          topic: 'Total Internal Reflection'
        },
        {
          text: `A transformer operates on the principle of which fundamental physical phenomenon discovered by Michael Faraday?`,
          options: ['Electromagnetic Induction (Mutual Induction)', 'Thermionic Emission', 'Photoelectric Effect', 'Capillary Action'],
          correctIndex: 0,
          explanation: 'Electromagnetic induction induces an EMF in a secondary coil when the magnetic flux linked with the primary AC coil changes.',
          topic: 'Electromagnetic Induction'
        },
        {
          text: `Complete the statement: The amount of heat energy absorbed at constant temperature by a unit mass of a solid to convert into liquid phase is called the _____.`,
          options: ['Specific Latent Heat of Fusion', 'Specific Heat Capacity', 'Dew Point Humidity', 'Mechanical Equivalent'],
          correctIndex: 0,
          explanation: 'Specific latent heat of fusion is the heat required per unit mass to change a solid into a liquid at its melting point without a change in temperature.',
          topic: 'Latent Heat & Phase Change'
        },
        {
          text: `Numerical Problem: An electric iron of power 1100 W is operated on a 220 V domestic supply line. How much electric current does it draw?`,
          options: ['5 A', '10 A', '2 A', '0.2 A'],
          correctIndex: 0,
          explanation: 'Since Power P = V × I, Current I = P / V = 1100 W / 220 V = 5 Amperes.',
          topic: 'Electrical Power Calculations'
        },
        {
          text: `Look at the sonar ship icon 🚢. Which high-frequency sound waves (> 20,000 Hz) are used in SONAR to measure ocean depth and locate underwater objects?`,
          options: ['Ultrasonic Waves (Ultrasound)', 'Infrasonic Waves (< 20 Hz)', 'FM Radio Waves', 'X-Rays'],
          correctIndex: 0,
          diagramEmoji: '🚢',
          explanation: 'SONAR (Sound Navigation and Ranging) transmits ultrasonic pulses (> 20 kHz) and measures the time taken for the echo to return from the seabed.',
          topic: 'SONAR & Ultrasound'
        },
        {
          text: `If the distance between two masses is doubled while keeping their masses unchanged, how does the gravitational force between them change?`,
          options: ['It becomes one-fourth (1/4) of its original value', 'It doubles', 'It becomes four times larger', 'It remains unchanged'],
          correctIndex: 0,
          explanation: 'By the inverse-square law F ∝ 1/r², doubling r makes the force 1/(2)² = 1/4 of its original value.',
          topic: 'Inverse-Square Law of Gravitation'
        }
      ];
    }

    // Level 4: Expert Challenge
    return [
      {
        text: `The absolute refractive index of glass is 1.5 and the speed of light in vacuum is 3 × 10⁸ m/s. What is the speed of light inside the glass medium?`,
        options: ['2.0 × 10⁸ m/s', '4.5 × 10⁸ m/s', '1.5 × 10⁸ m/s', '3.0 × 10⁸ m/s'],
        correctIndex: 0,
        explanation: 'Since refractive index n = c / v, speed in glass v = c / n = (3 × 10⁸) / 1.5 = 2.0 × 10⁸ m/s.',
        topic: 'Refractive Index & Wave Speed'
      },
      {
        text: `Fill in the blank: Geostationary communication satellites revolve around the Earth in the equatorial plane at a height of approximately _____ km above Earth's surface with a time period of 24 hours.`,
        options: ['35,780 km', '400 km', '3,84,400 km', '100 km'],
        correctIndex: 0,
        explanation: 'High Earth Orbit geostationary satellites orbit at ~35,780 km above the equator, matching Earth’s 24-hour rotation period.',
        topic: 'Satellite Orbits & Space Missions'
      },
      {
        text: `True or False: In domestic AC power distribution in India, the standard supply voltage is 220 V and the frequency of alternating current is 50 Hz.`,
        options: ['True', 'False', 'Frequency is 0 Hz DC', 'Voltage is 11,000 V inside wall sockets'],
        correctIndex: 0,
        explanation: 'In India, household alternating current (AC) is supplied at a potential difference of 220 V and frequency of 50 Hz.',
        topic: 'AC vs DC & Domestic Circuits'
      },
      {
        text: `A bullet of mass 20 g (0.02 kg) is fired horizontally with a velocity of 150 m/s from a pistol of mass 2 kg. What is the recoil velocity of the pistol?`,
        options: ['-1.5 m/s (1.5 m/s backward)', '-15 m/s', '-0.15 m/s', '-3.0 m/s'],
        correctIndex: 0,
        explanation: 'By Law of Conservation of Momentum: m₁v₁ + m₂v₂ = 0 ⇒ (0.02 × 150) + (2 × v₂) = 0 ⇒ 3 + 2v₂ = 0 ⇒ v₂ = -1.5 m/s.',
        topic: 'Conservation of Linear Momentum'
      },
      {
        text: `An object is placed at a distance of 30 cm in front of a concave mirror of focal length 15 cm. Where is the image formed and what is its magnification?`,
        options: [
          'At 30 cm in front of the mirror (at Centre of Curvature C), Real, Inverted, and Same Size (Magnification = -1)',
          'Behind the mirror at 15 cm, Virtual and Erect',
          'At infinity, infinitely large',
          'At the pole, point-sized'
        ],
        correctIndex: 0,
        explanation: 'Here f = -15 cm, so Centre of Curvature C = 2f = -30 cm. An object at C forms a real, inverted image of equal size right at C.',
        topic: 'Mirror Formula & Ray Diagrams'
      },
      {
        text: `Identify the INCORRECT statement about the scattering of light in Earth's atmosphere:`,
        options: [
          'Blue light has a shorter wavelength than red light and is scattered more strongly by fine atmospheric particles (Rayleigh scattering)',
          'In the absence of an atmosphere in outer space, the sky appears dark/black to astronauts',
          'Danger signal lights are red because red light has the longest visible wavelength and is scattered the least by fog or smoke',
          'The clear midday sky appears blue because red light is scattered 10 times more than violet/blue light'
        ],
        correctIndex: 3,
        explanation: 'By Rayleigh’s law, scattering intensity ∝ 1/λ⁴, so shorter wavelengths (blue/violet) scatter much more than red light.',
        topic: 'Atmospheric Refraction & Scattering'
      },
      {
        text: `Complete the statement: If a 100 W electric bulb is used for 10 hours every day for 30 days, the total electrical energy consumed in commercial units (kWh) is _____.`,
        options: ['30 Units (30 kWh)', '300 Units', '3 Units', '100 Units'],
        correctIndex: 0,
        explanation: 'Energy = (100 W × 10 h × 30 days) / 1000 = 30,000 Wh / 1000 = 30 kWh (30 commercial units).',
        topic: 'Commercial Unit of Electrical Energy'
      },
      {
        text: `How much heat energy (in calories) is required to raise the temperature of 200 g of water from 20 °C to 45 °C? (Specific heat of water c = 1 cal/g°C)`,
        options: ['5,000 calories (5 kcal)', '2,500 calories', '9,000 calories', '400 calories'],
        correctIndex: 0,
        explanation: 'Heat Q = m × c × ΔT = 200 g × 1 cal/g°C × (45 - 20)°C = 200 × 25 = 5,000 calories.',
        topic: 'Calorimetry & Specific Heat'
      },
      {
        text: `Look at the rocket icon 🚀. Which ISRO launch vehicle is famously called the "Workhorse of ISRO" and launched Chandrayaan-1 and Mangalyaan (MOM)?`,
        options: ['PSLV (Polar Satellite Launch Vehicle)', 'Saturn V', 'Falcon Heavy', 'Space Shuttle Discovery'],
        correctIndex: 0,
        diagramEmoji: '🚀',
        explanation: 'ISRO’s Polar Satellite Launch Vehicle (PSLV) is celebrated for its remarkable reliability in launching Earth-observation and interplanetary missions.',
        topic: 'ISRO Launch Vehicles & Space Physics'
      },
      {
        text: `Assertion (A): Fuse wire is always connected in series in the live (phase) wire of a household electrical circuit.\nReason (R): Fuse wire is made of an alloy with a low melting point so it melts and breaks the circuit immediately when current exceeds the safe limit.`,
        options: [
          'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
          'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
          '(A) is true, but (R) is false.',
          '(A) is false, but (R) is true.'
        ],
        correctIndex: 0,
        explanation: 'A low-melting-point fuse in series with the live wire melts via Joule heating during short-circuiting or overloading, protecting appliances.',
        topic: 'Electrical Safety & Fuse'
      }
    ];
  }

  // ============================================================================
  // 17. CHEMISTRY — 40 Unique Questions (10 per Level, Separate Science Subject)
  // ============================================================================
  if (subject === 'Chemistry') {
    if (level === 1) {
      return [
        {
          text: `What is the chemical formula of common table salt?`,
          options: ['NaCl (Sodium Chloride)', 'NaOH (Sodium Hydroxide)', 'CaCO₃ (Calcium Carbonate)', 'H₂SO₄ (Sulphuric Acid)'],
          correctIndex: 0,
          explanation: 'Common table salt is Sodium Chloride, an ionic compound with formula NaCl.',
          topic: 'Acids, Bases and Salts'
        },
        {
          text: `Fill in the blank: On the pH scale (0 to 14), pure neutral water at 25 °C has a pH value of exactly _____.`,
          options: ['7', '0', '14', '1'],
          correctIndex: 0,
          explanation: 'A pH of 7 indicates a neutral substance; pH < 7 is acidic and pH > 7 is basic/alkaline.',
          topic: 'pH Scale & Indicators'
        },
        {
          text: `True or False: In the Modern Periodic Table, elements are arranged in order of increasing Atomic Number (Z).`,
          options: ['True', 'False', 'They are arranged alphabetically', 'They are arranged by density only'],
          correctIndex: 0,
          explanation: 'Henry Moseley showed that atomic number (Z, number of protons) is the fundamental periodic property of elements.',
          topic: 'Periodic Classification of Elements'
        },
        {
          text: `What is the atomic number and chemical symbol of the element Carbon?`,
          options: ['Symbol: C, Atomic Number: 6', 'Symbol: Ca, Atomic Number: 20', 'Symbol: Cl, Atomic Number: 17', 'Symbol: Cu, Atomic Number: 29'],
          correctIndex: 0,
          explanation: 'Carbon has symbol C, atomic number 6, and electronic configuration (2, 4).',
          topic: 'Carbon: An Important Element'
        },
        {
          text: `When blue litmus paper is dipped into lemon juice (citric acid) or dilute hydrochloric acid, what colour change is observed?`,
          options: ['Blue litmus turns Red', 'Blue litmus turns Green', 'It turns bright Yellow', 'No change occurs'],
          correctIndex: 0,
          explanation: 'Acids turn blue litmus paper red, whereas bases turn red litmus paper blue.',
          topic: 'Acid-Base Indicators'
        },
        {
          text: `Which non-metal is an allotrope of carbon and is the hardest natural substance known?`,
          options: ['Diamond', 'Graphite', 'Coal', 'Sulphur'],
          correctIndex: 0,
          explanation: 'Diamond is a crystalline allotrope of carbon in which each carbon atom is covalently bonded to four other carbon atoms in a rigid 3D tetrahedral lattice.',
          topic: 'Allotropes of Carbon'
        },
        {
          text: `Complete the sentence: A chemical reaction in which heat energy is released along with the formation of products is called an _____ reaction.`,
          options: ['Exothermic', 'Endothermic', 'Photolytic', 'Electrolytic'],
          correctIndex: 0,
          explanation: 'Exothermic reactions release heat to the surroundings (e.g., respiration, combustion of methane, slaking of lime).',
          topic: 'Chemical Reactions & Equations'
        },
        {
          text: `How many horizontal rows (Periods) and vertical columns (Groups) are present in the Modern Periodic Table?`,
          options: ['7 Periods and 18 Groups', '18 Periods and 7 Groups', '8 Periods and 8 Groups', '10 Periods and 12 Groups'],
          correctIndex: 0,
          explanation: 'The Modern Periodic Table consists of 7 horizontal periods and 18 vertical groups.',
          topic: 'Structure of Modern Periodic Table'
        },
        {
          text: `Look at the test tube icon 🧪. Which gas is liberated with a "pop" sound when dilute hydrochloric acid reacts with active zinc granules (Zn + 2HCl → ZnCl₂ + ___)?`,
          options: ['Hydrogen gas (H₂)', 'Carbon dioxide (CO₂)', 'Oxygen gas (O₂)', 'Nitrogen gas (N₂)'],
          correctIndex: 0,
          diagramEmoji: '🧪',
          explanation: 'Active metals displace hydrogen from dilute acids to release flammable Hydrogen gas (H₂), which burns with a pop sound.',
          topic: 'Reactions of Metals with Acids'
        },
        {
          text: `What is the valency of Carbon in all organic compounds (tetravalency)?`,
          options: ['4', '2', '1', '8'],
          correctIndex: 0,
          explanation: 'Carbon has 4 valence electrons in its outermost L shell and forms 4 covalent bonds (tetravalent).',
          topic: 'Covalent Bonding in Carbon'
        }
      ];
    }

    if (level === 2) {
      return [
        {
          text: `Calculate the molecular mass of Water (H₂O) given Atomic Masses: H = 1 u, O = 16 u:`,
          options: ['18 u (18 g/mol)', '17 u', '32 u', '10 u'],
          correctIndex: 0,
          explanation: 'Molecular mass of H₂O = (2 × 1) + 16 = 18 unified atomic mass units (u).',
          topic: 'Measurement of Matter'
        },
        {
          text: `Fill in the blank: The reddish-brown flaky layer formed on iron articles exposed to moist air is chemically hydrated ferric oxide, commonly called _____.`,
          options: ['Rust (Fe₂O₃ · xH₂O)', 'Galvanization', 'Amalgam', 'Slag'],
          correctIndex: 0,
          explanation: 'Corrosion of iron in the presence of oxygen and moisture forms rust (hydrated iron(III) oxide, Fe₂O₃·xH₂O).',
          topic: 'Corrosion & Prevention'
        },
        {
          text: `True or False: Graphite is a crystalline allotrope of carbon that is a good conductor of electricity due to the presence of free delocalized electrons between its hexagonal layers.`,
          options: ['True', 'False', 'Graphite is a metal', 'Graphite cannot conduct any electricity'],
          correctIndex: 0,
          explanation: 'In graphite, each carbon atom bonds to 3 others in flat hexagonal layers, leaving 1 free electron per carbon atom to conduct electricity.',
          topic: 'Properties of Graphite'
        },
        {
          text: `Match the Common Chemical Name with its Chemical Formula:`,
          options: [
            'Baking Soda → NaHCO₃ | Washing Soda → Na₂CO₃·10H₂O',
            'Baking Soda → NaCl | Washing Soda → KOH',
            'Baking Soda → CaSO₄ | Washing Soda → HCl',
            'Baking Soda → MgO | Washing Soda → HNO₃'
          ],
          correctIndex: 0,
          explanation: 'Baking soda is Sodium Bicarbonate (NaHCO₃) and washing soda is Sodium Carbonate Decahydrate (Na₂CO₃·10H₂O).',
          topic: 'Important Salts in Daily Life'
        },
        {
          text: `In the chemical reaction CuO + H₂ → Cu + H₂O, which substance is getting REDUCED and which is getting OXIDIZED?`,
          options: [
            'CuO is reduced to Cu (loses oxygen), and H₂ is oxidized to H₂O (gains oxygen)',
            'Both are only oxidized',
            'Water is the reducing agent',
            'Copper is a noble gas'
          ],
          correctIndex: 0,
          explanation: 'Loss of oxygen is reduction (CuO → Cu) and gain of oxygen is oxidation (H₂ → H₂O); together they form a Redox reaction.',
          topic: 'Oxidation & Reduction (Redox)'
        },
        {
          text: `Identify the INCORRECT statement about Noble Gases (Group 18 / Zero Group elements):`,
          options: [
            'They include Helium, Neon, Argon, Krypton, Xenon, and Radon',
            'Their outermost valence shells are completely filled (duplet or octet)',
            'They are chemically inert under ordinary conditions with valency zero',
            'They are highly reactive alkali metals that explode in cold water'
          ],
          correctIndex: 3,
          explanation: 'Group 18 elements are inert noble gases with complete octets/duplets; Group 1 elements are the reactive alkali metals.',
          topic: 'Periodic Table Groups'
        },
        {
          text: `Complete the sentence: Coating iron or steel sheets with a thin protective layer of Zinc (Zn) to prevent rusting is called _____.`,
          options: ['Galvanization', 'Sublimation', 'Esterification', 'Saponification'],
          correctIndex: 0,
          explanation: 'Galvanization protects iron because zinc is more reactive than iron and acts as a sacrificial anode.',
          topic: 'Metallurgy & Corrosion Protection'
        },
        {
          text: `What is the general molecular formula of saturated hydrocarbons called ALKANES (such as Methane CH₄ and Ethane C₂H₆)?`,
          options: ['CₙH₂ₙ₊₂', 'CₙH₂ₙ', 'CₙH₂ₙ₋₂', 'CₙHₙ'],
          correctIndex: 0,
          explanation: 'Alkanes have single covalent bonds and follow CₙH₂ₙ₊₂; Alkenes follow CₙH₂ₙ and Alkynes follow CₙH₂ₙ₋₂.',
          topic: 'Hydrocarbons: Alkanes, Alkenes & Alkynes'
        },
        {
          text: `Look at the atom icon ⚛️. Who discovered natural radioactivity in uranium salts in 1896?`,
          options: ['Henri Becquerel', 'John Dalton', 'Dmitri Mendeleev', 'J.J. Thomson'],
          correctIndex: 0,
          diagramEmoji: '⚛️',
          explanation: 'Henri Becquerel discovered spontaneous radioactive emission from uranium salts, later researched further by Marie and Pierre Curie.',
          topic: 'Radioactive Substances'
        },
        {
          text: `As we move from LEFT to RIGHT across a Period in the Modern Periodic Table, what happens to the atomic radius of elements?`,
          options: [
            'Atomic radius decreases due to increasing effective nuclear charge pulling electrons closer',
            'Atomic radius increases tenfold',
            'New shells are added at every step across the period',
            'Atomic number decreases'
          ],
          correctIndex: 0,
          explanation: 'Across a period from left to right, electrons are added to the same shell while nuclear positive charge increases, shrinking atomic size.',
          topic: 'Periodic Trends'
        }
      ];
    }

    if (level === 3) {
      return [
        {
          text: `What is the unique property of the Carbon atom by which it forms strong covalent bonds with other carbon atoms to create long straight chains, branched chains, and rings?`,
          options: ['Catenation', 'Allotropy', 'Galvanization', 'Neutralization'],
          correctIndex: 0,
          explanation: 'Catenation is the self-linking property of carbon atoms via strong C–C covalent bonds, forming millions of organic compounds.',
          topic: 'Carbon Compounds & Catenation'
        },
        {
          text: `Fill in the blank: The chief ore of Aluminium, from which alumina (Al₂O₃) is extracted using Bayer's or Hall's process, is _____.`,
          options: ['Bauxite (Al₂O₃ · nH₂O)', 'Haematite (Fe₂O₃)', 'Cinnabar (HgS)', 'Galena (PbS)'],
          correctIndex: 0,
          explanation: 'Bauxite (Al₂O₃·nH₂O) is the principal ore of aluminium, refined into alumina and electrolytically reduced in the Hall-Héroult process.',
          topic: 'Metallurgy of Aluminium'
        },
        {
          text: `True or False: Alpha (α) rays emitted during radioactive decay are positively charged Helium nuclei (⁴₂He²⁺) that deflect towards the negative plate in an electric field.`,
          options: ['True', 'False', 'Alpha rays are high-speed electrons', 'Alpha rays have zero mass'],
          correctIndex: 0,
          explanation: 'Alpha particles consist of 2 protons and 2 neutrons (⁴₂He²⁺) with a +2e positive charge; Beta particles are electrons and Gamma rays are uncharged photons.',
          topic: 'Alpha, Beta & Gamma Radiation'
        },
        {
          text: `Match the Functional Group in Organic Chemistry with its formula:`,
          options: [
            'Alcohol → –OH | Carboxylic Acid → –COOH | Aldehyde → –CHO',
            'Alcohol → –COOH | Carboxylic Acid → –NH₂ | Aldehyde → –Cl',
            'Alcohol → –CHO | Carboxylic Acid → –OH | Aldehyde → –CO–',
            'Alcohol → –Br | Carboxylic Acid → –I | Aldehyde → –F'
          ],
          correctIndex: 0,
          explanation: '–OH is the hydroxyl (alcohol) group, –COOH is the carboxyl group, and –CHO is the aldehyde group.',
          topic: 'Functional Groups in Carbon Compounds'
        },
        {
          text: `When calcium carbonate (limestone) is heated strongly (CaCO₃ → CaO + CO₂↑), what type of chemical reaction is this?`,
          options: ['Thermal Decomposition Reaction (Endothermic)', 'Combination Reaction', 'Double Displacement Reaction', 'Neutralization Reaction'],
          correctIndex: 0,
          explanation: 'A single reactant breaking down into two or more simpler products upon absorbing heat is a thermal decomposition reaction.',
          topic: 'Types of Chemical Reactions'
        },
        {
          text: `Which chemical compound with formula CaSO₄ · ½H₂O is prepared by carefully heating gypsum at 373 K (100 °C) and is used by doctors to support fractured bones?`,
          options: ['Plaster of Paris (POP)', 'Bleaching Powder (CaOCl₂)', 'Quicklime (CaO)', 'Caustic Soda (NaOH)'],
          correctIndex: 0,
          explanation: 'Plaster of Paris is Calcium Sulphate Hemihydrate (CaSO₄·½H₂O), which sets into hard gypsum when mixed with water.',
          topic: 'Plaster of Paris & Salts'
        },
        {
          text: `Complete the sentence: According to Avogadro's Law, 1 Mole of any substance contains exactly _____ particles (atoms, molecules, or ions).`,
          options: ['6.022 × 10²³ (Avogadro’s Number N_A)', '1.6 × 10⁻¹⁹', '3.0 × 10⁸', '9.8 × 10¹⁰'],
          correctIndex: 0,
          explanation: 'One mole of any chemical species contains Avogadro’s constant N_A = 6.022 × 10²³ elementary entities.',
          topic: 'Mole Concept & Avogadro Number'
        },
        {
          text: `How many moles are present in 88 grams of Carbon Dioxide (CO₂)? (Atomic masses: C = 12, O = 16)`,
          options: ['2 moles', '1 mole', '4 moles', '0.5 moles'],
          correctIndex: 0,
          explanation: 'Molar mass of CO₂ = 12 + (2 × 16) = 44 g/mol. Number of moles n = Given mass / Molar mass = 88 / 44 = 2 moles.',
          topic: 'Stoichiometry & Mole Calculations'
        },
        {
          text: `Look at the diamond/crystal icon 💎. Which synthetic allotrope of carbon has 60 carbon atoms arranged like a football (soccer ball) in pentagons and hexagons?`,
          options: ['Buckminsterfullerene (C₆₀)', 'Coke', 'Charcoal', 'Lampblack'],
          correctIndex: 0,
          diagramEmoji: '💎',
          explanation: 'Fullerenes (such as C₆₀ Buckminsterfullerene) are spherical carbon molecules shaped like a geodesic dome or football.',
          topic: 'Fullerenes & Nanochemistry'
        },
        {
          text: `In the Reactivity Series of Metals, which of the following shows the correct decreasing order of chemical reactivity?`,
          options: [
            'Potassium (K) > Sodium (Na) > Zinc (Zn) > Copper (Cu) > Gold (Au)',
            'Gold (Au) > Silver (Ag) > Copper (Cu) > Sodium (Na)',
            'Iron (Fe) > Potassium (K) > Magnesium (Mg)',
            'Copper (Cu) > Zinc (Zn) > Aluminium (Al)'
          ],
          correctIndex: 0,
          explanation: 'Potassium and Sodium are at the top of the reactivity series, while noble metals like Silver, Gold, and Platinum are at the bottom.',
          topic: 'Reactivity Series of Metals'
        }
      ];
    }

    // Level 4: Expert Challenge
    return [
      {
        text: `What is the IUPAC name of the organic compound CH₃–CH₂–COOH (commonly found in propionic derivatives), and what is the IUPAC name of Acetic Acid (CH₃–COOH)?`,
        options: [
          'Propanoic acid and Ethanoic acid',
          'Propanol and Ethanol',
          'Propanal and Ethanal',
          'Propanone and Methanoic acid'
        ],
        correctIndex: 0,
        explanation: 'A 3-carbon carboxylic acid is Propanoic acid (CH₃CH₂COOH), and a 2-carbon carboxylic acid (acetic acid) is Ethanoic acid (CH₃COOH).',
        topic: 'IUPAC Nomenclature of Carbon Compounds'
      },
      {
        text: `Fill in the blank: When Ethanoic acid reacts with Ethanol in the presence of an acid catalyst (conc. H₂SO₄), a sweet-smelling substance called an _____ (Ethyl Ethanoate) is formed.`,
        options: ['Ester (Esterification Reaction)', 'Alkane', 'Amalgam', 'Inert Gas'],
        correctIndex: 0,
        explanation: 'CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ (Ethyl ethanoate ester) + H₂O; esters have pleasant fruity fragrances.',
        topic: 'Esterification & Saponification'
      },
      {
        text: `True or False: During the electrolytic reduction of alumina (Hall-Héroult process), Cryolite (Na₃AlF₆) and Fluorspar (CaF₂) are added to lower the melting point of the mixture to about 1000 °C and increase electrical conductivity.`,
        options: ['True', 'False', 'They raise the melting point to 5000 °C', 'Alumina dissolves in cold oil'],
        correctIndex: 0,
        explanation: 'Pure alumina melts at >2000 °C; adding cryolite and fluorspar lowers the operating temperature to ~1000 °C.',
        topic: 'Electrolytic Reduction of Alumina'
      },
      {
        text: `Identify the electronic configuration and Period/Group position of Calcium (Atomic Number Z = 20):`,
        options: [
          'Configuration: (2, 8, 8, 2) | Period: 4, Group: 2 (Alkaline Earth Metal)',
          'Configuration: (2, 8, 10) | Period: 3, Group: 10',
          'Configuration: (2, 8, 8, 1) | Period: 4, Group: 1',
          'Configuration: (2, 6, 6, 6) | Period: 2, Group: 16'
        ],
        correctIndex: 0,
        explanation: 'Z = 20 has 4 shells (2, 8, 8, 2), placing it in Period 4, and 2 valence electrons, placing it in Group 2.',
        topic: 'Electronic Configuration & Periodic Position'
      },
      {
        text: `What is "Aqua Regia" (Royal Water), which can dissolve noble metals like Gold (Au) and Platinum (Pt)?`,
        options: [
          'A freshly prepared 3:1 molar mixture of concentrated Hydrochloric Acid (HCl) and concentrated Nitric Acid (HNO₃)',
          'Pure distilled rainwater',
          'Dilute acetic acid mixed with salt',
          'Liquid nitrogen mixed with oxygen'
        ],
        correctIndex: 0,
        explanation: 'Aqua Regia is a fuming 3:1 mixture of conc. HCl and conc. HNO₃ capable of dissolving gold and platinum.',
        topic: 'Properties of Acids & Noble Metals'
      },
      {
        text: `Identify the INCORRECT statement about Homologous Series of organic compounds:`,
        options: [
          'Consecutive members of a homologous series differ by a –CH₂– unit and 14 u in molecular mass',
          'All members of a homologous series share the same functional group and general formula',
          'Physical properties like boiling point show a regular gradation as molecular mass increases',
          'Every member of a homologous series has completely unrelated chemical properties and different functional groups'
        ],
        correctIndex: 3,
        explanation: 'All members of a homologous series possess the same functional group and therefore exhibit similar chemical properties.',
        topic: 'Homologous Series'
      },
      {
        text: `Complete the balanced chemical equation for the Thermit Reaction used to weld cracked railway tracks: Fe₂O₃ + 2Al → _____ + Heat.`,
        options: ['2Fe (molten) + Al₂O₃', '2FeO + Al', 'Fe + 2AlCl₃', 'Fe₃O₄ + H₂'],
        correctIndex: 0,
        explanation: 'In the highly exothermic thermit reaction, aluminium reduces iron(III) oxide to produce molten iron (2Fe) and aluminium oxide (Al₂O₃).',
        topic: 'Thermit Reaction & Metallurgy'
      },
      {
        text: `Which radioactive isotope of Cobalt is widely used in radiotherapy for treating cancer, and which isotope of Iodine is used to treat goitre (thyroid disorder)?`,
        options: [
          'Cobalt-60 (⁶⁰Co) for cancer treatment and Iodine-131 (¹³¹I) for thyroid treatment',
          'Carbon-12 and Oxygen-16',
          'Sodium-23 and Chlorine-35',
          'Helium-4 and Neon-20'
        ],
        correctIndex: 0,
        explanation: 'Cobalt-60 emits gamma rays used to destroy malignant cancer cells, while Iodine-131 is selectively absorbed by the thyroid gland.',
        topic: 'Medical Applications of Radioisotopes'
      },
      {
        text: `Look at the soap bubble icon 🫧. When an ester (fat or vegetable oil) is heated with aqueous Sodium Hydroxide (NaOH) to produce soap and glycerol, what is this reaction called?`,
        options: ['Saponification', 'Hydrogenation', 'Polymerization', 'Calcination'],
        correctIndex: 0,
        diagramEmoji: '🫧',
        explanation: 'Saponification is the alkaline hydrolysis of triglycerides (fats/oils) into sodium/potassium salts of long-chain fatty acids (soap) and glycerol.',
        topic: 'Soaps, Detergents & Saponification'
      },
      {
        text: `Assertion (A): Unsaturated vegetable oils are converted into saturated solid vanaspati ghee by passing hydrogen gas in the presence of a Nickel (Ni) catalyst.\nReason (R): This addition reaction (Hydrogenation) converts C=C double bonds in unsaturated carbon chains into C–C single bonds.`,
        options: [
          'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
          'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
          '(A) is true, but (R) is false.',
          '(A) is false, but (R) is true.'
        ],
        correctIndex: 0,
        explanation: 'Catalytic hydrogenation adds hydrogen across carbon-carbon double bonds in the presence of finely divided Nickel or Palladium.',
        topic: 'Catalytic Hydrogenation'
      }
    ];
  }

  // ============================================================================
  // 18. BIOLOGY — 40 Unique Questions (10 per Level, Separate Science Subject)
  // ============================================================================
  if (subject === 'Biology') {
    if (level === 1) {
      return [
        {
          text: `Which cell organelle is known as the "Powerhouse of the Cell" because it generates energy in the form of ATP?`,
          options: ['Mitochondria', 'Ribosome', 'Golgi Apparatus', 'Lysosome'],
          correctIndex: 0,
          explanation: 'Mitochondria carry out aerobic cellular respiration and synthesize Adenosine Triphosphate (ATP), the energy currency of the cell.',
          topic: 'Cell Biology'
        },
        {
          text: `Fill in the blank: In green plants, the vascular tissue that transports water and dissolved minerals upward from the roots to the leaves is _____.`,
          options: ['Xylem', 'Phloem', 'Epidermis', 'Stomata'],
          correctIndex: 0,
          explanation: 'Xylem conducts water and minerals upward from roots, whereas Phloem translocates food synthesized in leaves.',
          topic: 'Life Processes in Living Organisms'
        },
        {
          text: `True or False: Lactobacillus is a beneficial bacterium that converts milk into curd (yoghurt) by fermenting lactose sugar into lactic acid.`,
          options: ['True', 'False', 'Lactobacillus is a virus', 'Milk turns into curd by freezing'],
          correctIndex: 0,
          explanation: 'Lactobacillus bacteria coagulate milk proteins by producing lactic acid from lactose.',
          topic: 'Useful and Harmful Microbes'
        },
        {
          text: `Who is revered as the "Father of Genetics" for discovering the fundamental laws of inheritance through his experiments on garden pea plants (Pisum sativum)?`,
          options: ['Gregor Johann Mendel', 'Charles Darwin', 'Louis Pasteur', 'Alexander Fleming'],
          correctIndex: 0,
          explanation: 'Gregor Johann Mendel established the laws of dominance, segregation, and independent assortment using pea plants.',
          topic: 'Heredity and Variation'
        },
        {
          text: `In an ecosystem's food chain, green plants that synthesize their own food by photosynthesis are classified as:`,
          options: ['Producers (Autotrophs)', 'Primary Carnivores', 'Decomposers', 'Parasites'],
          correctIndex: 0,
          explanation: 'Green plants are autotrophic producers that form the base (first trophic level) of every terrestrial food chain.',
          topic: 'Energy Flow in an Ecosystem'
        },
        {
          text: `Which division of the Plant Kingdom is called the "Amphibians of the Plant Kingdom" because they grow in moist soil but require water for reproduction (e.g., Funaria moss)?`,
          options: ['Bryophyta', 'Thallophyta', 'Gymnosperms', 'Angiosperms'],
          correctIndex: 0,
          explanation: 'Bryophytes (like Moss/Funaria and Marchantia) live on damp land but depend on water for fertilization.',
          topic: 'Classification of Plants'
        },
        {
          text: `Complete the sentence: The functional structural unit of the human kidney that filters blood and forms urine is the _____.`,
          options: ['Nephron', 'Neuron', 'Alveolus', 'Villus'],
          correctIndex: 0,
          explanation: 'Each human kidney contains about 1 million nephrons (with Bowman’s capsule and glomerulus) for ultrafiltration.',
          topic: 'Excretion in Humans'
        },
        {
          text: `How many pairs of chromosomes are present in a normal human somatic (body) cell?`,
          options: ['23 pairs (46 chromosomes total)', '10 pairs (20 chromosomes)', '46 pairs (92 chromosomes)', '12 pairs (24 chromosomes)'],
          correctIndex: 0,
          explanation: 'Human diploid cells have 46 chromosomes arranged in 23 pairs (22 pairs of autosomes + 1 pair of sex chromosomes XX or XY).',
          topic: 'Chromosomes & DNA'
        },
        {
          text: `Look at the DNA helix icon 🧬. What does the abbreviation DNA stand for?`,
          options: ['Deoxyribonucleic Acid', 'Dinucleotide Amino Acid', 'Dual Nitrogenous Acid', 'Dynamic Nucleic Atom'],
          correctIndex: 0,
          diagramEmoji: '🧬',
          explanation: 'DNA stands for Deoxyribonucleic Acid, the double-helical molecule that carries hereditary genetic information.',
          topic: 'Molecular Genetics'
        },
        {
          text: `Which plant hormone (phytohormone) is responsible for cell elongation and the bending of plant shoots towards light (phototropism)?`,
          options: ['Auxin', 'Abscisic Acid', 'Insulin', 'Adrenaline'],
          correctIndex: 0,
          explanation: 'Auxin synthesized at shoot tips promotes cell elongation; abscisic acid is a growth-inhibiting hormone.',
          topic: 'Control and Coordination in Plants'
        }
      ];
    }

    if (level === 2) {
      return [
        {
          text: `In Mendel's monohybrid cross between pure tall (TT) and pure dwarf (tt) pea plants, what is the phenotypic ratio obtained in the F₂ generation?`,
          options: ['3 Tall : 1 Dwarf (3:1) and genotypic ratio 1:2:1', '1 Tall : 1 Dwarf (1:1)', '9:3:3:1', 'All Dwarf'],
          correctIndex: 0,
          explanation: 'In the F₂ generation of a monohybrid cross (Tt × Tt), genotypes are 1 TT : 2 Tt : 1 tt, giving a 3 Tall : 1 Dwarf phenotypic ratio.',
          topic: 'Mendel’s Monohybrid Cross'
        },
        {
          text: `Fill in the blank: The first antibiotic, Penicillin, was discovered by _____ from the fungus Penicillium notatum.`,
          options: ['Sir Alexander Fleming', 'Edward Jenner', 'Robert Koch', 'Ronald Ross'],
          correctIndex: 0,
          explanation: 'Alexander Fleming discovered Penicillin in 1928 from the mould Penicillium notatum.',
          topic: 'Antibiotics & Microbiology'
        },
        {
          text: `True or False: According to Lindeman's 10% Law of Energy Transfer in an ecosystem, only about 10% of energy is transferred from one trophic level to the next higher trophic level.`,
          options: ['True', 'False', '100% energy is multiplied at each level', 'Energy flows backwards from lion to grass'],
          correctIndex: 0,
          explanation: 'About 90% of energy is lost as metabolic heat at each trophic level, leaving ~10% for the next level; hence Energy Pyramids are always upright.',
          topic: 'Pyramid of Energy'
        },
        {
          text: `Match the Human Brain Region with its primary function:`,
          options: [
            'Cerebrum → Voluntary actions & intelligence | Cerebellum → Posture & body balance | Medulla Oblongata → Involuntary actions (heartbeat, breathing)',
            'Cerebrum → Digestion | Cerebellum → Filtering blood | Medulla → Bone growth',
            'Cerebrum → Reflex arc only | Cerebellum → Vision only | Medulla → Hearing only',
            'All three parts only pump blood'
          ],
          correctIndex: 0,
          explanation: 'The cerebrum governs memory and voluntary thought, the cerebellum coordinates balance, and the medulla controls vital involuntary functions.',
          topic: 'Human Nervous System'
        },
        {
          text: `Which type of cell division occurs in somatic (body) cells for growth and tissue repair, and which occurs in germ cells to form haploid gametes?`,
          options: [
            'Mitosis in somatic cells (equational division) and Meiosis in germ cells (reduction division)',
            'Meiosis in skin cuts and Mitosis in pollen grains',
            'Binary fission in human neurons',
            'Budding in human bones'
          ],
          correctIndex: 0,
          explanation: 'Mitosis maintains the diploid (2n) chromosome number for growth, while Meiosis halves the chromosome number to haploid (n) for gametes.',
          topic: 'Cell Division: Mitosis & Meiosis'
        },
        {
          text: `Identify the INCORRECT match between a nitrogenous base in DNA/RNA and its pairing rule:`,
          options: [
            'In DNA, Adenine (A) pairs with Thymine (T) by two hydrogen bonds',
            'In DNA, Guanine (G) pairs with Cytosine (C) by three hydrogen bonds',
            'In RNA, Uracil (U) is present instead of Thymine (T)',
            'In DNA, Adenine always pairs with Guanine and Thymine pairs with Uracil'
          ],
          correctIndex: 3,
          explanation: 'By Chargaff’s rule and Watson-Crick pairing, purine A pairs with pyrimidine T (or U in RNA), and G pairs with C.',
          topic: 'Structure of DNA & RNA'
        },
        {
          text: `Complete the sentence: Plants that bear naked seeds without an enclosing fruit wall (such as Cycas, Pinus, and Deodar) belong to the group _____.`,
          options: ['Gymnosperms', 'Angiosperms', 'Pteridophytes', 'Algae'],
          correctIndex: 0,
          explanation: '"Gymnos" means naked and "sperma" means seed; Angiosperms bear seeds enclosed within fruits.',
          topic: 'Gymnosperms vs Angiosperms'
        },
        {
          text: `In aerobic cellular respiration, which 3-step biochemical pathway completely oxidizes one molecule of glucose to yield CO₂, H₂O, and 38 ATP molecules?`,
          options: [
            'Glycolysis (in cytoplasm) → Tricarboxylic Acid / Krebs Cycle (in mitochondria) → Electron Transport Chain (ETC)',
            'Photosynthesis → Transpiration → Guttation',
            'Transcription → Translation → Translocation',
            'Dialysis → Ultrafiltration → Reabsorption'
          ],
          correctIndex: 0,
          explanation: 'Aerobic respiration proceeds sequentially via Glycolysis, the Krebs (TCA) Cycle, and the Electron Transport Chain.',
          topic: 'Cellular Respiration Pathways'
        },
        {
          text: `Look at the starfish icon ⭐. Starfish, Sea Urchins, and Sea Cucumbers have a calcareous spiny skin and water vascular system; which animal phylum do they belong to?`,
          options: ['Phylum Echinodermata', 'Phylum Arthropoda', 'Phylum Mollusca', 'Phylum Annelida'],
          correctIndex: 0,
          diagramEmoji: '⭐',
          explanation: 'Echinoderms are exclusively marine animals with spiny skin, tube feet for locomotion, and radial symmetry in adults.',
          topic: 'Animal Classification'
        },
        {
          text: `Which endocrine gland is called the "Master Gland" of the human body, and which hormone secreted by the Pancreas regulates blood sugar levels?`,
          options: [
            'Pituitary Gland is the Master Gland; Insulin (from Pancreas) regulates blood glucose',
            'Thyroid is the Master Gland; Thyroxine digests starch',
            'Adrenal is the Master Gland; Pepsin lowers blood sugar',
            'Salivary Gland is the Master Gland; Bile regulates sleep'
          ],
          correctIndex: 0,
          explanation: 'The pituitary gland regulates other endocrine glands, and the Islets of Langerhans in the pancreas secrete insulin to control blood glucose.',
          topic: 'Hormonal Coordination'
        }
      ];
    }

    if (level === 3) {
      return [
        {
          text: `In molecular biology (Central Dogma), what is the process of synthesizing mRNA from a DNA template strand called, and what is the synthesis of protein from mRNA on ribosomes called?`,
          options: [
            'DNA → mRNA is Transcription; mRNA → Protein is Translation',
            'DNA → mRNA is Translation; mRNA → Protein is Transpiration',
            'Both are called Mutation',
            'Both are called Plasmolysis'
          ],
          correctIndex: 0,
          explanation: 'Transcription copies genetic code from DNA into mRNA in the nucleus; Translation decodes mRNA triplets (codons) via tRNA into amino acid chains on ribosomes.',
          topic: 'Transcription, Translation & Translocation'
        },
        {
          text: `Fill in the blank: Organs that have the SAME basic internal anatomical structure and embryonic origin, but perform DIFFERENT functions (e.g., human arm, bat's wing, whale's flipper) are called _____ organs.`,
          options: ['Homologous Organs', 'Analogous Organs', 'Vestigial Organs', 'Artificial Organs'],
          correctIndex: 0,
          explanation: 'Homologous organs indicate divergent evolution from a common ancestor, whereas analogous organs (like insect wing and bird wing) have different origins but similar functions.',
          topic: 'Evidences of Evolution'
        },
        {
          text: `True or False: In angiosperm flowers, "Double Fertilization" involves one male gamete fusing with the egg cell to form the diploid Zygote (2n) and the second male gamete fusing with the two polar nuclei to form the triploid Endosperm (3n).`,
          options: ['True', 'False', 'Both gametes fuse with petals', 'Seeds form without any gametes'],
          correctIndex: 0,
          explanation: 'Double fertilization (Syngamy + Triple Fusion), discovered by Nawaschin, is a defining characteristic of flowering plants (Angiosperms).',
          topic: 'Reproduction in Flowering Plants'
        },
        {
          text: `Match the Plant Tissue with its specialized characteristic:`,
          options: [
            'Meristematic Tissue → Actively dividing cells at root/shoot tips | Sclerenchyma → Dead lignified cells providing mechanical strength',
            'Meristematic Tissue → Dead cork | Sclerenchyma → Liquid blood plasma',
            'Parenchyma → Nervous impulse conduction | Collenchyma → Bone marrow',
            'Xylem → Muscle contraction | Phloem → Tendon attachment'
          ],
          correctIndex: 0,
          explanation: 'Meristematic tissues divide actively for plant growth, while sclerenchyma cells have thick lignified walls for structural rigidity.',
          topic: 'Plant & Animal Tissues'
        },
        {
          text: `Which genetically modified (GM) crop variety contains the cry gene from the soil bacterium Bacillus thuringiensis to resist bollworm pests naturally?`,
          options: ['Bt Cotton (and Bt Brinjal)', 'Simple Wild Grass', 'Non-hybrid Moss', 'Spirogyra Algae'],
          correctIndex: 0,
          explanation: 'Bt Cotton incorporates the gene from Bacillus thuringiensis, producing an endotoxin protein that protects the crop against bollworm larvae.',
          topic: 'Biotechnology & GM Crops'
        },
        {
          text: `Identify the INCORRECT statement regarding Vestigial Organs in human beings:`,
          options: [
            'Vestigial organs are degenerated or underdeveloped structures that were functional in ancestors',
            'The Vermiform Appendix, Coccyx (tailbone), Wisdom teeth, and Ear pinna muscles are vestigial in humans',
            'The Appendix is non-functional in humans but functional for cellulose digestion in ruminant herbivores',
            'The Human Heart and Lungs are vestigial organs that have no function'
          ],
          correctIndex: 3,
          explanation: 'The heart and lungs are vital functional organs; the appendix, coccyx, and wisdom teeth are classic vestigial structures.',
          topic: 'Evolution & Vestigial Organs'
        },
        {
          text: `Complete the sentence: The fossil of _____ discovered in limestone rocks is a famous "Connecting Link" between Reptiles (teeth in jaws, long tail) and Birds (feathered wings, beak).`,
          options: ['Archaeopteryx', 'Peripatus', 'Duck-billed Platypus', 'Lungfish'],
          correctIndex: 0,
          explanation: 'Archaeopteryx exhibits both reptilian and avian features; Peripatus links Annelida and Arthropoda, and Platypus links Reptiles and Mammals.',
          topic: 'Connecting Links in Evolution'
        },
        {
          text: `During vigorous muscular exercise when oxygen supply is temporarily insufficient, muscle cells convert pyruvic acid into which compound, sometimes causing muscle cramps?`,
          options: ['Lactic Acid', 'Ethanol and Carbon Monoxide', 'Hydrochloric Acid', 'Uric Acid'],
          correctIndex: 0,
          explanation: 'In anaerobic lactic acid fermentation inside striated muscle fibres, pyruvate is reduced to lactic acid, yielding 2 ATP.',
          topic: 'Anaerobic Respiration in Muscles'
        },
        {
          text: `Look at the microscope icon 🔬. Which symbiotic nitrogen-fixing bacterium lives inside the root nodules of leguminous plants (like pea, gram, and soybean) and converts atmospheric N₂ into nitrates?`,
          options: ['Rhizobium', 'Clostridium botulinum', 'Plasmodium vivax', 'Entamoeba'],
          correctIndex: 0,
          diagramEmoji: '🔬',
          explanation: 'Rhizobium bacteria form a mutually beneficial symbiosis in legume root nodules, enriching soil nitrogen naturally.',
          topic: 'Biogeochemical Nitrogen Cycle'
        },
        {
          text: `In a dihybrid cross (RrYy × RrYy) between round-yellow and wrinkled-green pea seeds, what is Mendel's classic F₂ phenotypic ratio?`,
          options: ['9 : 3 : 3 : 1', '3 : 1', '1 : 2 : 1', '1 : 1 : 1 : 1'],
          correctIndex: 0,
          explanation: 'By Mendel’s Law of Independent Assortment, the F₂ dihybrid phenotypic ratio is 9 (Round Yellow) : 3 (Round Green) : 3 (Wrinkled Yellow) : 1 (Wrinkled Green).',
          topic: 'Mendel’s Dihybrid Cross'
        }
      ];
    }

    // Level 4: Expert Challenge
    return [
      {
        text: `In the Electron Transport Chain (ETC) inside the inner mitochondrial membrane, how many ATP molecules are synthesized from each molecule of NADH₂ and each molecule of FADH₂ respectively?`,
        options: [
          '3 ATP from each NADH₂ and 2 ATP from each FADH₂',
          '10 ATP from each NADH₂ and 5 ATP from each FADH₂',
          '1 ATP from each NADH₂ and 0 ATP from each FADH₂',
          '38 ATP from each FADH₂'
        ],
        correctIndex: 0,
        explanation: 'Oxidative phosphorylation in the mitochondrial cristae yields 3 ATP per NADH₂ molecule and 2 ATP per FADH₂ molecule.',
        topic: 'Bioenergetics & Oxidative Phosphorylation'
      },
      {
        text: `Fill in the blank: The five stages of Prophase-I in Meiosis-I occur in the exact sequential order: Leptotene → Zygotene → _____ → Diplotene → Diakinesis.`,
        options: ['Pachytene (where crossing over and genetic recombination occur)', 'Telophase', 'Anaphase', 'Cytokinesis'],
        correctIndex: 0,
        explanation: 'During Pachytene of Prophase-I, non-sister chromatids of homologous chromosomes exchange genetic segments (crossing over).',
        topic: 'Meiosis-I & Crossing Over'
      },
      {
        text: `True or False: Pluripotent Stem Cells derived from umbilical cord blood or red bone marrow have the regenerative ability to differentiate into specialized tissues and treat conditions like leukemia and thalassemia.`,
        options: ['True', 'False', 'Stem cells are dead plant bark cells', 'Stem cells cannot divide'],
        correctIndex: 0,
        explanation: 'Stem cells are undifferentiated progenitor cells capable of self-renewal and differentiation into diverse cell lineages in regenerative medicine.',
        topic: 'Stem Cell Therapy & Regenerative Biology'
      },
      {
        text: `Match the Connecting Link Organism with the two taxonomic groups it bridges:`,
        options: [
          'Peripatus → Annelida & Arthropoda | Duck-billed Platypus → Reptiles & Mammals | Lungfish → Fishes & Amphibians',
          'Peripatus → Birds & Mammals | Platypus → Algae & Fungi | Lungfish → Insects & Spiders',
          'All three are unicellular bacteria',
          'All three belong to Phylum Porifera'
        ],
        correctIndex: 0,
        explanation: 'Peripatus links Annelids and Arthropods; Platypus lays eggs like reptiles but has mammary glands like mammals; Lungfish breathes air with lungs while being a fish.',
        topic: 'Evolutionary Connecting Links'
      },
      {
        text: `Which genetically engineered bacterium (developed by Dr. Anand Mohan Chakrabarty) and hydrocarbonoclastic bacteria like Alcanivorax borkumensis are used in bioremediation to clean up marine oil spills?`,
        options: [
          'Pseudomonas putida and Alcanivorax borkumensis',
          'Salmonella typhi and Vibrio cholerae',
          'Mycobacterium tuberculosis',
          'Tobacco Mosaic Virus'
        ],
        correctIndex: 0,
        explanation: 'Pseudomonas putida and Alcanivorax borkumensis consume pyridines and hydrocarbons in crude oil, converting them into harmless CO₂ and water.',
        topic: 'Bioremediation & Environmental Biotechnology'
      },
      {
        text: `Identify the INCORRECT statement regarding Chordates (Phylum Chordata):`,
        options: [
          'Presence of a supporting Notochord at least in some stage of development',
          'Presence of a dorsal hollow nerve cord and paired pharyngeal gill slits',
          'Heart is located on the ventral side of the body',
          'All chordates lack a nervous system and have a ventral solid nerve cord like earthworms'
        ],
        correctIndex: 3,
        explanation: 'Chordates possess a dorsal hollow nerve cord and ventral heart, whereas non-chordates have a ventral solid nerve cord (if present) and dorsal heart.',
        topic: 'Chordates vs Non-Chordates'
      },
      {
        text: `Complete the sentence: The sudden, heritable change in the nucleotide sequence of a gene or chromosome (such as Sickle Cell Anaemia caused by substitution of Valine for Glutamic Acid) is called _____.`,
        options: ['Mutation (Point Gene Mutation)', 'Transpiration', 'Pollination', 'Emulsification'],
        correctIndex: 0,
        explanation: 'Hugo de Vries proposed the Mutation Theory; a single base substitution in the beta-globin gene causes sickle cell anaemia.',
        topic: 'Genetic Mutations & Disorders'
      },
      {
        text: `What is the role of the enzyme "Restriction Endonuclease" and "DNA Ligase" in Recombinant DNA (rDNA) Technology?`,
        options: [
          'Restriction Endonuclease acts as "molecular scissors" to cut DNA at specific palindrome sites, while DNA Ligase acts as "molecular glue" to join DNA fragments',
          'Both digest dietary fats in the stomach',
          'They evaporate water from plant leaves',
          'They coagulate blood platelets'
        ],
        correctIndex: 0,
        explanation: 'Recombinant DNA technology relies on restriction enzymes to cleave DNA precisely and DNA ligase to seal phosphodiester bonds with a vector plasmid.',
        topic: 'Genetic Engineering & rDNA Tools'
      },
      {
        text: `Look at the revolution icon 🌾. Who is honoured as the "Father of the Green Revolution in India", and who spearheaded the "White Revolution" (Operation Flood / Dairy Cooperative Movement) in India?`,
        options: [
          'Dr. M.S. Swaminathan (Green Revolution) and Dr. Verghese Kurien (White Revolution)',
          'C.V. Raman and Homi Bhabha',
          'Srinivasa Ramanujan and Aryabhata',
          'Birbal Sahni and Salim Ali'
        ],
        correctIndex: 0,
        diagramEmoji: '🌾',
        explanation: 'Dr. M.S. Swaminathan introduced high-yielding dwarf wheat varieties in India, while Dr. Verghese Kurien transformed India into the world’s largest milk producer.',
        topic: 'Green, White & Blue Revolutions'
      },
      {
        text: `Assertion (A): In human beings, the biological sex of the offspring is determined by the chromosome inherited from the father.\nReason (R): Mothers produce only one type of ovum carrying the X chromosome (22 + X), whereas fathers produce two types of sperm in equal proportion: (22 + X) and (22 + Y).`,
        options: [
          'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
          'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
          '(A) is true, but (R) is false.',
          '(A) is false, but (R) is true.'
        ],
        correctIndex: 0,
        explanation: 'Fertilization of an X-bearing ovum by an X-bearing sperm produces a girl (XX), while fertilization by a Y-bearing sperm produces a boy (XY).',
        topic: 'Sex Determination in Humans'
      }
    ];
  }

  // ============================================================================
  // 19. POLITICAL SCIENCE — 40 Unique Questions (10 per Level, Class 9 & 10)
  // ============================================================================
  if (subject === 'Political Science') {
    if (level === 1) {
      return [
        {
          text: `On which date did the Constitution of India come into force, celebrated annually as Republic Day?`,
          options: ['26th January 1950', '15th August 1947', '26th November 1949', '2nd October 1950'],
          correctIndex: 0,
          explanation: 'The Constitution of India was adopted on 26 November 1949 and came into force on 26 January 1950.',
          topic: 'Working of the Constitution'
        },
        {
          text: `Fill in the blank: The minimum age required for an Indian citizen to vote in Lok Sabha and State Assembly elections (Universal Adult Franchise) is _____ years.`,
          options: ['18 years', '21 years', '25 years', '16 years'],
          correctIndex: 0,
          explanation: 'The 61st Constitutional Amendment Act lowered the voting age in India from 21 years to 18 years.',
          topic: 'The Electoral Process'
        },
        {
          text: `True or False: The Election Commission of India is an autonomous constitutional body established under Article 324 of the Indian Constitution.`,
          options: ['True', 'False', 'It is a private company', 'It is controlled by foreign embassies'],
          correctIndex: 0,
          explanation: 'Article 324 vests the superintendence, direction, and control of elections in an independent Election Commission of India.',
          topic: 'Election Commission of India'
        },
        {
          text: `Who is the Supreme Commander of the Indian Armed Forces (Army, Navy, and Air Force)?`,
          options: ['The President of India', 'The Chief Justice of India', 'The Speaker of Lok Sabha', 'The Governor of RBI'],
          correctIndex: 0,
          explanation: 'The President of India is the constitutional Supreme Commander of the Indian Defence Forces.',
          topic: 'India’s Defence System'
        },
        {
          text: `Where are the headquarters of the United Nations (UN) located, and on which date is United Nations Day observed?`,
          options: ['New York City (USA), observed on 24th October', 'Geneva, observed on 1st January', 'Paris, observed on 5th June', 'London, observed on 10th December'],
          correctIndex: 0,
          explanation: 'The UN Charter came into force on 24 October 1945, and its headquarters are in New York City.',
          topic: 'The United Nations'
        },
        {
          text: `Which Constitutional Amendment Acts (1992) gave constitutional status to Panchayati Raj (Rural Local Government) and Municipalities (Urban Local Government) along with 33% (up to 50% in Maharashtra) reservation for women?`,
          options: ['73rd and 74th Constitutional Amendment Acts', '1st and 2nd Amendments', '42nd Amendment only', '100th Amendment'],
          correctIndex: 0,
          explanation: 'The 73rd and 74th Amendments empowered local self-government institutions and reserved seats for women in local bodies.',
          topic: 'Decentralization of Power'
        },
        {
          text: `Complete the sentence: In India, the Right to Information (RTI) Act was enacted in the year _____ to promote transparency and accountability in governance.`,
          options: ['2005', '1950', '1991', '2020'],
          correctIndex: 0,
          explanation: 'The Right to Information (RTI) Act, 2005 empowers citizens to seek official information from public authorities.',
          topic: 'Right to Information (RTI)'
        },
        {
          text: `What does the acronym EVM stand for in the Indian electoral process?`,
          options: ['Electronic Voting Machine', 'Electoral Verification Method', 'Executive Vote Monitor', 'Early Voting Mechanism'],
          correctIndex: 0,
          explanation: 'EVMs (Electronic Voting Machines) coupled with VVPAT slips are used for fast, accurate, and eco-friendly polling.',
          topic: 'Modern Voting Systems'
        },
        {
          text: `Look at the peace dove icon 🕊️. Who was the chief architect of India's foreign policy of Non-Alignment and "Panchsheel" (Five Principles of Peaceful Coexistence)?`,
          options: ['Pandit Jawaharlal Nehru', 'Lord Mountbatten', 'Winston Churchill', 'Woodrow Wilson'],
          correctIndex: 0,
          diagramEmoji: '🕊️',
          explanation: 'First Prime Minister Pandit Jawaharlal Nehru shaped India’s policy of Non-Alignment and Panchsheel based on peaceful coexistence.',
          topic: 'India’s Foreign Policy'
        },
        {
          text: `How many permanent members with Veto Power are there in the United Nations Security Council (UNSC)?`,
          options: ['5 Permanent Members (USA, UK, France, Russia, China)', '10 Permanent Members', '15 Permanent Members', '2 Permanent Members'],
          correctIndex: 0,
          explanation: 'The UNSC has 15 members: 5 permanent members (P5) with veto power and 10 non-permanent members elected for 2-year terms.',
          topic: 'UN Security Council'
        }
      ];
    }

    if (level === 2) {
      return [
        {
          text: `What is the division of governmental power between the Union (Central) Government and the State Governments under the Indian Constitution called?`,
          options: ['Federalism (Federal System with Strong Centre)', 'Absolute Monarchy', 'Military Dictatorship', 'One-Party Rule'],
          correctIndex: 0,
          explanation: 'Federalism divides legislative and administrative powers between the Union and the States via the Union, State, and Concurrent Lists.',
          topic: 'Federalism in India'
        },
        {
          text: `Fill in the blank: The Election Commission enforces the _____ from the date elections are announced until the declaration of results to ensure free and fair elections.`,
          options: ['Model Code of Conduct (आचारसंहिता)', 'Martial Law', 'Emergency Censorship', 'Trade Embargo'],
          correctIndex: 0,
          explanation: 'The Model Code of Conduct regulates the behaviour of political parties, candidates, and the ruling government during elections.',
          topic: 'Free and Fair Elections'
        },
        {
          text: `True or False: India has a Multi-Party System where both National Parties and Regional (State) Parties contest elections and represent diverse aspirations.`,
          options: ['True', 'False', 'India has only one political party', 'Political parties are banned in India'],
          correctIndex: 0,
          explanation: 'India operates a vibrant multi-party democracy with recognized National and State/Regional political parties.',
          topic: 'Political Parties in India'
        },
        {
          text: `Match the Wing of India's Defence / Paramilitary Force with its primary responsibility:`,
          options: [
            'BSF (Border Security Force) → Guarding international land borders | Indian Coast Guard → Protecting India’s maritime zones & coastline',
            'BSF → Space satellite launching | Coast Guard → Railway ticket checking',
            'Indian Navy → Desert camel patrol | Indian Air Force → Deep-sea mining',
            'NCC → Printing currency notes'
          ],
          correctIndex: 0,
          explanation: 'Paramilitary forces like the BSF guard borders during peacetime, while the Coast Guard safeguards India’s maritime boundaries.',
          topic: 'Paramilitary Forces & Security'
        },
        {
          text: `Who was the first Election Commissioner of independent India who successfully organized India's historic first general election in 1951–52?`,
          options: ['Sukumar Sen', 'T.N. Seshan', 'G.V. Mavalankar', 'C. Rajagopalachari'],
          correctIndex: 0,
          explanation: 'Sukumar Sen served as the first Chief Election Commissioner of India from 1950 to 1958.',
          topic: 'History of Indian Elections'
        },
        {
          text: `Identify the INCORRECT statement regarding the "Basic Structure Doctrine" of the Indian Constitution:`,
          options: [
            'It was established by the Supreme Court in the landmark Kesavananda Bharati case (1973)',
            'Parliament has the power to amend the Constitution, but it CANNOT destroy its Basic Structure',
            'Republic and Democratic form of government, Secularism, and Federalism are part of the Basic Structure',
            'Any ordinary municipal council can abolish the Constitution at any time'
          ],
          correctIndex: 3,
          explanation: 'The Basic Structure Doctrine (1973) ensures that core democratic, secular, and federal pillars of the Constitution cannot be abrogated.',
          topic: 'Basic Structure of the Constitution'
        },
        {
          text: `Complete the sentence: When no single political party wins a clear majority of seats in Parliament or a State Assembly, two or more parties come together to form a _____.`,
          options: ['Coalition Government (आघाडी सरकार)', 'Unitary Monarchy', 'Tribunal', 'Gram Sabha'],
          correctIndex: 0,
          explanation: 'A coalition government is formed when multiple parties agree on a common minimum programme to command a majority in the legislature.',
          topic: 'Coalition Politics'
        },
        {
          text: `Which prominent environmental and peasant/tribal movements in India demonstrated the power of peaceful citizen participation in democracy?`,
          options: [
            'Chipko Movement (forest conservation) and Narmada Bachao Andolan',
            'Industrial Monopoly Cartel',
            'Colonial Salt Tax Enforcement',
            'Feudal Zamindari League'
          ],
          correctIndex: 0,
          explanation: 'Social movements like the Chipko Movement (Sunderlal Bahuguna, Gaura Devi) raised critical ecological and livelihood issues peacefully.',
          topic: 'Social and Political Movements'
        },
        {
          text: `Look at the globe icon 🌐. After the Second World War (1945–1991), the ideological and geopolitical rivalry between the USA-led bloc and the USSR-led bloc without direct full-scale war was known as the:`,
          options: ['Cold War (शीतयुद्ध)', 'Hundred Years War', 'Opium War', 'Crimean War'],
          correctIndex: 0,
          diagramEmoji: '🌐',
          explanation: 'The Cold War (1945–1991) divided the world into a bipolar order between the capitalist USA bloc and communist USSR bloc until the dissolution of the USSR.',
          topic: 'Post World War Political Developments'
        },
        {
          text: `What does VVPAT stand for in modern Indian elections?`,
          options: [
            'Voter Verifiable Paper Audit Trail',
            'Voter Voting Public Tally',
            'Verified Village Polling Authority',
            'Virtual Voting Portal and Terminal'
          ],
          correctIndex: 0,
          explanation: 'VVPAT (Voter Verifiable Paper Audit Trail) allows voters to verify a printed slip showing the candidate symbol they voted for.',
          topic: 'Electoral Transparency (VVPAT)'
        }
      ];
    }

    if (level === 3) {
      return [
        {
          text: `Who is famously known as the "Waterman of India" for leading the Tarun Bharat Sangh movement to revive rivers and build thousands of "Johads" (rainwater check dams) in Rajasthan?`,
          options: ['Dr. Rajendra Singh', 'Baba Amte', 'Vinoba Bhave', 'Kailash Satyarthi'],
          correctIndex: 0,
          explanation: 'Dr. Rajendra Singh brought a water conservation revolution in Rajasthan through traditional Johads and won the Stockholm Water Prize.',
          topic: 'Environmental & Water Movements'
        },
        {
          text: `Fill in the blank: The process of redrawing the boundaries of Lok Sabha and Legislative Assembly constituencies based on the latest Census population without changing the total number of seats is called _____.`,
          options: ['Delimitation (Performed by the Delimitation Commission)', 'Privatization', 'Nationalization', 'Filibustering'],
          correctIndex: 0,
          explanation: 'The Delimitation Commission redraws constituency boundaries fairly so that each constituency represents roughly equal populations.',
          topic: 'Constituency Delimitation'
        },
        {
          text: `True or False: Under the Consumer Protection Act (1986 / 2019), consumers in India have the right to seek redressal against unfair trade practices, defective goods, and misleading advertisements.`,
          options: ['True', 'False', 'Consumers have no legal rights', 'Only manufacturers can file complaints'],
          correctIndex: 0,
          explanation: 'The Consumer Movement and Consumer Protection Act treat every citizen as a consumer with statutory rights to safety, information, and redressal.',
          topic: 'Consumer Movement in India'
        },
        {
          text: `Match the Regional Political Party with the Indian State where it primarily originated:`,
          options: [
            'Shiv Sena → Maharashtra | Shiromani Akali Dal → Punjab | DMK / AIADMK → Tamil Nadu | Assam Gana Parishad → Assam',
            'Shiv Sena → Kerala | Akali Dal → Goa | DMK → Gujarat',
            'All four originated in Himachal Pradesh',
            'All four are international agencies'
          ],
          correctIndex: 0,
          explanation: 'Regional parties represent state-specific linguistic, cultural, and developmental aspirations within the Indian Union.',
          topic: 'National & Regional Parties'
        },
        {
          text: `Which specialized UN agency focuses on promoting international collaboration in education, science, and culture (including World Heritage Sites), and which focuses on children's welfare?`,
          options: [
            'UNESCO (Education, Science & Culture) and UNICEF (Children’s Emergency Fund)',
            'IMF and World Bank only',
            'WTO and OPEC',
            'NATO and Warsaw Pact'
          ],
          correctIndex: 0,
          explanation: 'UNESCO (headquartered in Paris) advances education, science, and culture; UNICEF (New York) works for children’s health, nutrition, and education.',
          topic: 'UN Specialized Agencies'
        },
        {
          text: `Identify the INCORRECT statement about the Non-Aligned Movement (NAM):`,
          options: [
            'NAM was founded at the Belgrade Summit in 1961 under leaders like Nehru (India), Tito (Yugoslavia), Nasser (Egypt), Sukarno (Indonesia), and Nkrumah (Ghana)',
            'Non-alignment meant pursuing an independent foreign policy based on peace without joining either the US or Soviet military bloc',
            'Non-alignment did NOT mean passive neutrality or isolationism; India actively participated in global peace',
            'NAM was a military alliance designed to launch nuclear war'
          ],
          correctIndex: 3,
          explanation: 'NAM rejected military blocs (like NATO and Warsaw Pact) and championed decolonization, disarmament, and peaceful development.',
          topic: 'Non-Aligned Movement (NAM)'
        },
        {
          text: `Complete the sentence: When the Supreme Court or High Court examines whether a law passed by the legislature or an action by the executive is consistent with the Constitution, this power is called _____.`,
          options: ['Judicial Review', 'Ordinance Promulgation', 'Pocket Veto', 'No-Confidence Motion'],
          correctIndex: 0,
          explanation: 'Judicial Review empowers the constitutional courts to strike down any statute or executive order that violates fundamental rights or constitutional provisions.',
          topic: 'Role of Judiciary & Judicial Review'
        },
        {
          text: `Which social reformer and labour leader organized the railway workers and founded the "Bharatashram" and early trade union associations in Maharashtra in the late 19th century?`,
          options: ['Narayan Meghaji Lokhande', 'Lord Curzon', 'Warren Hastings', 'Robert Clive'],
          correctIndex: 0,
          explanation: 'Narayan Meghaji Lokhande, a close associate of Mahatma Jyotirao Phule, is regarded as the father of the trade union movement in India and secured Sunday weekly holidays for mill workers.',
          topic: 'Workers’ & Trade Union Movements'
        },
        {
          text: `Look at the ballot box icon 🗳️. What are the two types of elections held when a seat falls vacant before the completion of the 5-year term vs when the entire House is dissolved early?`,
          options: [
            'By-Election (for a single vacant seat) and Mid-Term Election (when the House is dissolved before completion of its full term)',
            'Referendum and Plebiscite',
            'Primary Caucus and Electoral College',
            'Nomination and Impeachment'
          ],
          correctIndex: 0,
          diagramEmoji: '🗳️',
          explanation: 'General elections occur every 5 years; Mid-term elections occur if the legislature is dissolved early; By-elections fill an individual vacancy caused by resignation or death.',
          topic: 'Types of Elections'
        },
        {
          text: `Which landmark legislation enacted in 2009 made free and compulsory elementary education a Fundamental Right for all children aged 6 to 14 years under Article 21A?`,
          options: [
            'Right of Children to Free and Compulsory Education (RTE) Act, 2009',
            'Vernacular Press Act',
            'Rowlatt Act',
            'Charter Act of 1813'
          ],
          correctIndex: 0,
          explanation: 'The 86th Constitutional Amendment inserted Article 21A, operationalized by the Right to Education (RTE) Act, 2009.',
          topic: 'Rights-Based Approach in Democracy'
        }
      ];
    }

    // Level 4: Expert Challenge
    return [
      {
        text: `What criteria must a political party fulfil to be recognized as a "National Party" by the Election Commission of India (among the primary conditions)?`,
        options: [
          'Securing at least 6% of valid votes in four or more States in Lok Sabha or Assembly elections AND winning at least 4 Lok Sabha seats (or winning 2% of total Lok Sabha seats from at least 3 states)',
          'Having an office in one village panchayat',
          'Contesting only municipal corporation elections',
          'Being registered for 100 years without contesting elections'
        ],
        correctIndex: 0,
        explanation: 'Recognition as a National Party requires multi-state electoral presence (such as 6% valid votes in 4+ states plus 4 Lok Sabha seats, or 2% of Lok Sabha seats from 3+ states, or State Party status in 4 states).',
        topic: 'Recognition Criteria for National & State Parties'
      },
      {
        text: `Fill in the blank: The 1972 United Nations Conference on the Human Environment was held at _____, and the landmark 1992 Earth Summit on Sustainable Development was held at _____.`,
        options: [
          'Stockholm (1972) and Rio de Janeiro (1992)',
          'Tokyo (1972) and Sydney (1992)',
          'Cairo (1972) and Madrid (1992)',
          'Ottawa (1972) and Oslo (1992)'
        ],
        correctIndex: 0,
        explanation: 'The 1972 Stockholm Conference initiated global environmental cooperation, followed by the 1992 Rio Earth Summit focusing on sustainable development and biodiversity.',
        topic: 'Global Environmental Governance'
      },
      {
        text: `True or False: Under the Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006, tribal communities were granted legal rights to cultivate forest land and collect minor forest produce sustainably.`,
        options: ['True', 'False', 'The Act banned all tribal communities from forests', 'The Act was passed in 1857'],
        correctIndex: 0,
        explanation: 'The Forest Rights Act (2006) addressed historical injustices by recognizing tribal and forest-dwelling communities’ rights over forest resources and conservation.',
        topic: 'Tribal Movements & Forest Rights'
      },
      {
        text: `Match the International Regional Organization with its member nations/focus:`,
        options: [
          'SAARC → South Asian nations | ASEAN → Southeast Asian nations | BRICS → Brazil, Russia, India, China, South Africa (+ expanded members) | G20 → Major global economies',
          'SAARC → European Union only | ASEAN → Arctic Circle only',
          'BRICS → Only North American states | G20 → 20 cities in Maharashtra',
          'All four are domestic sports clubs'
        ],
        correctIndex: 0,
        explanation: 'India actively engages in multilateral regional and global forums like SAARC, BIMSTEC, BRICS, G20, and SCO.',
        topic: 'International & Regional Organizations'
      },
      {
        text: `Which constitutional provisions provide scheduled representation (reservation of seats) in the Lok Sabha and State Legislative Assemblies for Scheduled Castes (SC) and Scheduled Tribes (ST) to ensure social justice and inclusive representation?`,
        options: ['Articles 330 and 332 of the Indian Constitution', 'Article 370', 'Article 356', 'Article 51'],
        correctIndex: 0,
        explanation: 'Article 330 provides reservation of seats for SCs and STs in the Lok Sabha, and Article 332 provides reservation in State Legislative Assemblies in proportion to population.',
        topic: 'Social Justice & Inclusive Representation'
      },
      {
        text: `Identify the INCORRECT statement regarding Judicial Activism and Public Interest Litigation (PIL) in India:`,
        options: [
          'PIL allows any public-spirited citizen or organization to approach the High Court or Supreme Court on behalf of disadvantaged groups whose fundamental rights are violated',
          'Justice P.N. Bhagwati and Justice V.R. Krishna Iyer played a pioneering role in introducing PIL in India',
          'The judiciary has actively intervened to protect environment, child rights, bonded labourers, and electoral transparency',
          'Only foreign billionaires are allowed to file a PIL in Indian courts'
        ],
        correctIndex: 3,
        explanation: 'Public Interest Litigation (PIL) relaxed the strict rule of locus standi so that justice is accessible to the poorest and most vulnerable citizens.',
        topic: 'Judicial Activism & PIL'
      },
      {
        text: `Complete the sentence: India's nuclear doctrine, shaped after the Pokhran-II tests (1998), is anchored on building a credible minimum deterrent and a strict policy of _____.`,
        options: ['"No First Use" (NFU) of nuclear weapons', 'Pre-emptive Nuclear Strike on non-nuclear states', 'Exporting nuclear weapons to private companies', 'Abolishing civilian nuclear power plants'],
        correctIndex: 0,
        explanation: 'India’s responsible nuclear doctrine emphasizes Credible Minimum Deterrence and a firm commitment to "No First Use" (NFU).',
        topic: 'India’s Security & Nuclear Policy'
      },
      {
        text: `What was the main objective of the "Samयुक्त Maharashtra Samiti" and other state reorganization movements in the 1950s?`,
        options: [
          'Creation of linguistic states (such as Maharashtra on 1st May 1960) to facilitate administration and democratic participation in the people’s mother tongue',
          'Replacing democracy with colonial rule',
          'Abolishing all regional languages',
          'Shifting India’s capital to London'
        ],
        correctIndex: 0,
        explanation: 'Following the States Reorganization Commission, Maharashtra was formed on 1 May 1960 as the Marathi-speaking state.',
        topic: 'Linguistic Reorganization of States'
      },
      {
        text: `Look at the scales of justice icon ⚖️. Which autonomous statutory commissions in India investigate complaints of human rights violations and safeguard the rights of women and minorities?`,
        options: [
          'National Human Rights Commission (NHRC), National Commission for Women (NCW), and National Commission for Minorities',
          'Board of Control for Cricket in India',
          'Film Certification Board',
          'Geological Survey of India'
        ],
        correctIndex: 0,
        diagramEmoji: '⚖️',
        explanation: 'Statutory commissions like the NHRC (1993) and NCW (1992) act as watchdogs protecting human dignity, gender equality, and constitutional rights.',
        topic: 'Rights Commissions & Democratic Institutions'
      },
      {
        text: `Assertion (A): Decentralization of power and active citizen participation are essential for the success of Indian democracy.\nReason (R): Democracy is not merely a structure of legislature, executive, and judiciary, but a living culture of equality, liberty, fraternity, and transparency at the grassroots level.`,
        options: [
          'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
          'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
          '(A) is true, but (R) is false.',
          '(A) is false, but (R) is true.'
        ],
        correctIndex: 0,
        explanation: 'Constitutional democracy thrives when power is decentralized to local bodies and citizens internalize democratic values in social life.',
        topic: 'Challenges & Deepening of Democracy'
      }
    ];
  }

  // ============================================================================
  // 20. INFORMATION TECHNOLOGY — 40 Unique Questions (10 per Level, Class 9 & 10)
  // ============================================================================
  if (subject === 'Information Technology') {
    if (level === 1) {
      return [
        {
          text: `What does the acronym HTML stand for in web designing?`,
          options: ['HyperText Markup Language', 'HighTech Machine Language', 'Hyperlink Text Management Logic', 'Home Tool Markup Link'],
          correctIndex: 0,
          explanation: 'HTML (HyperText Markup Language) is the standard markup language used to structure web pages and web applications.',
          topic: 'Web Designing (HTML5)'
        },
        {
          text: `Fill in the blank: In computer networking, LAN stands for Local Area Network, and WAN stands for _____.`,
          options: ['Wide Area Network', 'Wireless Antenna Node', 'Web Access Navigator', 'Wired Application Network'],
          correctIndex: 0,
          explanation: 'WAN (Wide Area Network) spans large geographical areas (cities, countries, or the globe, such as the Internet).',
          topic: 'Computer Networks'
        },
        {
          text: `True or False: In HTML5, the <h1> tag defines the largest and most important main heading, while <h6> defines the smallest sub-heading.`,
          options: ['True', 'False', '<h6> is the largest heading', 'HTML has no heading tags'],
          correctIndex: 0,
          explanation: 'HTML provides six levels of section headings from <h1> (highest importance/largest) to <h6> (lowest importance/smallest).',
          topic: 'HTML Heading Tags'
        },
        {
          text: `Which protocol is used for secure, encrypted communication over the World Wide Web (indicated by a padlock icon in the browser address bar)?`,
          options: ['HTTPS (HyperText Transfer Protocol Secure)', 'FTP (File Transfer Protocol)', 'Telnet', 'Gopher'],
          correctIndex: 0,
          explanation: 'HTTPS uses TLS/SSL encryption to protect data exchanged between a user’s browser and the web server.',
          topic: 'Internet Protocols & Security'
        },
        {
          text: `In a Relational Database Management System (RDBMS), what is a column (attribute) that uniquely identifies each row (record) in a table called?`,
          options: ['Primary Key', 'Duplicate Key', 'Text Comment', 'Random Cell'],
          correctIndex: 0,
          explanation: 'A Primary Key (such as Student_ID or Roll_No) uniquely identifies every record in a database table and cannot be NULL.',
          topic: 'Database Concepts (DBMS)'
        },
        {
          text: `Which HTML tag is used to create a clickable hyperlink to another webpage using the href attribute?`,
          options: ['<a> (Anchor tag, e.g., <a href="https://mystudyzone.in">)', '<img>', '<br>', '<table>'],
          correctIndex: 0,
          explanation: 'The <a> (anchor) element with the href attribute creates hyperlinks between web documents.',
          topic: 'HTML Hyperlinks & Media'
        },
        {
          text: `Complete the sentence: An Operating System whose source code is freely available for anyone to inspect, modify, and distribute (such as Ubuntu Linux or Android) is called _____ software.`,
          options: ['Open Source (FOSS)', 'Proprietary Closed-Source', 'Trialware', 'Malware'],
          correctIndex: 0,
          explanation: 'Free and Open Source Software (FOSS) like Linux, LibreOffice, and Python allows open collaboration and code inspection.',
          topic: 'Operating Systems & FOSS'
        },
        {
          text: `How many megabytes (MB) make 1 Gigabyte (GB) in standard binary storage measurement?`,
          options: ['1024 MB', '100 MB', '512 MB', '10 MB'],
          correctIndex: 0,
          explanation: 'In binary computer storage: 1 KB = 1024 Bytes, 1 MB = 1024 KB, 1 GB = 1024 MB, and 1 TB = 1024 GB.',
          topic: 'Digital Memory Units'
        },
        {
          text: `Look at the shield icon 🛡️. What is fraudulent attempt to steal sensitive information like passwords, OTPs, or bank PINs by sending fake emails or messages pretending to be a trusted institution called?`,
          options: ['Phishing', 'Debugging', 'Compiling', 'Formatting'],
          correctIndex: 0,
          diagramEmoji: '🛡️',
          explanation: 'Phishing is a cyber-attack where scammers impersonate banks or official websites to trick users into revealing credentials.',
          topic: 'Cyber Security & Safe Browsing'
        },
        {
          text: `In SQL (Structured Query Language), which command is used to retrieve and display data from a database table?`,
          options: ['SELECT (e.g., SELECT * FROM Students;)', 'DROP', 'DELETE', 'SHUTDOWN'],
          correctIndex: 0,
          explanation: 'The SELECT statement queries and retrieves specific columns and rows from one or more database tables.',
          topic: 'SQL Fundamentals'
        }
      ];
    }

    if (level === 2) {
      return [
        {
          text: `What does CSS stand for in modern web development, and what is its primary purpose?`,
          options: [
            'Cascading Style Sheets — used to control the visual presentation, layout, colours, and fonts of HTML elements',
            'Computer System Security — used to scan hard disks',
            'Central Server Storage — used to backup SQL tables',
            'Compiled Source Script — used to solder motherboards'
          ],
          correctIndex: 0,
          explanation: 'CSS (Cascading Style Sheets) separates presentation styling (colours, typography, responsive Flexbox/Grid layouts) from HTML structure.',
          topic: 'CSS3 Styling'
        },
        {
          text: `Fill in the blank: Every device connected to the Internet is assigned a unique numerical label for routing data packets, known as an _____ address.`,
          options: ['IP Address (Internet Protocol Address, IPv4 / IPv6)', 'HTML Tag', 'Zip Code', 'Font Family'],
          correctIndex: 0,
          explanation: 'An IP address (32-bit in IPv4 or 128-bit in IPv6) uniquely identifies a host interface on a TCP/IP network.',
          topic: 'IPv4, IPv6 & DNS'
        },
        {
          text: `True or False: In HTML, <ul> creates an Unordered (bulleted) list, whereas <ol> creates an Ordered (numbered) list using <li> list items.`,
          options: ['True', 'False', '<ul> creates a table', '<ol> embeds a video file'],
          correctIndex: 0,
          explanation: '<ul> renders bulleted lists and <ol> renders numbered/alphabetical lists, with each item wrapped in <li>...</li>.',
          topic: 'HTML Lists & Tables'
        },
        {
          text: `Match the Network Hardware Device with its function:`,
          options: [
            'Router → Forwards data packets between different networks | Switch → Connects devices within a local LAN | Modem → Modulates/Demodulates signals',
            'Router → Prints paper | Switch → Scans barcodes | Modem → Cools CPU',
            'All three are audio speakers',
            'All three are spreadsheet formulas'
          ],
          correctIndex: 0,
          explanation: 'A modem converts analog/digital signals, a switch links devices inside a LAN using MAC addresses, and a router directs traffic between networks using IP addresses.',
          topic: 'Networking Devices'
        },
        {
          text: `Under Indian Law, which primary legislation enacted in the year 2000 (and amended in 2008) provides legal recognition to electronic transactions, digital signatures, and defines cybercrimes?`,
          options: ['The Information Technology (IT) Act, 2000', 'The Motor Vehicles Act', 'The Ancient Monuments Act', 'The Wildlife Protection Act'],
          correctIndex: 0,
          explanation: 'The Information Technology Act, 2000 governs e-commerce, digital signatures, cyber security, and penalties for cyber offences in India.',
          topic: 'Cyber Law & IT Act 2000'
        },
        {
          text: `Identify the INCORRECT statement regarding Cloud Computing services:`,
          options: [
            'Cloud computing delivers computing services (storage, servers, databases, software) over the Internet on demand',
            'IaaS (Infrastructure as a Service), PaaS (Platform as a Service), and SaaS (Software as a Service) are the three main service models',
            'Google Drive and Microsoft OneDrive are examples of cloud storage',
            'Cloud computing requires storing paper files inside physical rainclouds in the sky'
          ],
          correctIndex: 3,
          explanation: 'Cloud computing runs on distributed remote data centres accessible via the Internet under IaaS, PaaS, and SaaS models.',
          topic: 'Cloud Computing Models'
        },
        {
          text: `Complete the HTML snippet to display an image with alternative text for accessibility: <img _____="school.jpg" _____="My School Building">`,
          options: ['src and alt', 'href and title', 'link and text', 'url and name'],
          correctIndex: 0,
          explanation: 'In the <img> tag, the src attribute specifies the image path/URL and the alt attribute provides alternative text for screen readers.',
          topic: 'HTML Image Attributes & Accessibility'
        },
        {
          text: `In programming and flowcharts, which geometric symbol is universally used to represent a conditional Decision (Yes/No or True/False branch)?`,
          options: ['Diamond (Rhombus) ◇', 'Oval / Capsule', 'Rectangle ▭', 'Parallelogram'],
          correctIndex: 0,
          explanation: 'In standard flowcharts: Oval = Start/Stop, Parallelogram = Input/Output, Rectangle = Process, and Diamond = Decision.',
          topic: 'Algorithms & Flowcharts'
        },
        {
          text: `Look at the government portal icon 🏛️. Which Digital India initiative provides citizens with a secure cloud-based platform to store and verify official digital documents like Aadhaar, Driving Licence, and SSC Marksheets?`,
          options: ['DigiLocker', 'Paintbrush', 'Notepad', 'Minesweeper'],
          correctIndex: 0,
          diagramEmoji: '🏛️',
          explanation: 'DigiLocker is a flagship E-Governance initiative under Digital India providing authentic digital documents legally at par with physical originals.',
          topic: 'E-Governance & Digital India'
        },
        {
          text: `What is the output of the following Python / Pseudocode expression: (15 // 4) + (15 % 4)?`,
          options: ['6 (since 15 // 4 = 3 quotient and 15 % 4 = 3 remainder; 3 + 3 = 6)', '3.75', '19', '0'],
          correctIndex: 0,
          explanation: 'Floor division 15 // 4 gives quotient 3, and modulo 15 % 4 gives remainder 3; their sum is 3 + 3 = 6.',
          topic: 'Programming Operators & Logic'
        }
      ];
    }

    if (level === 3) {
      return [
        {
          text: `In Relational Database Design, what is a column in one table that refers to the Primary Key of another table to establish a link between the two tables called?`,
          options: ['Foreign Key', 'Super Comment', 'CSS Selector', 'MAC Address'],
          correctIndex: 0,
          explanation: 'A Foreign Key enforces referential integrity by linking a child table record to the Primary Key of a parent table.',
          topic: 'Relational DBMS & Keys'
        },
        {
          text: `Fill in the blank: The Internet system that translates human-friendly domain names (like mystudyzone.in) into machine-readable IP addresses (like 192.0.2.1) is the _____.`,
          options: ['DNS (Domain Name System)', 'ALU (Arithmetic Logic Unit)', 'UPS (Uninterruptible Power Supply)', 'BIOS'],
          correctIndex: 0,
          explanation: 'DNS acts as the phonebook of the Internet, resolving domain names to numerical IP addresses.',
          topic: 'Domain Name System (DNS)'
        },
        {
          text: `True or False: Two-Factor Authentication (2FA) enhances account security by requiring two distinct forms of verification — something you know (password) and something you have (an OTP or authenticator token).`,
          options: ['True', 'False', '2FA means typing the same password twice', '2FA disables encryption'],
          correctIndex: 0,
          explanation: 'Multi-factor / Two-Factor Authentication (2FA) protects accounts even if a password is compromised.',
          topic: 'Authentication & Cyber Hygiene'
        },
        {
          text: `Match the SQL Command Category with its purpose:`,
          options: [
            'DDL (CREATE, ALTER, DROP) → Defines table schema | DML (INSERT, UPDATE, DELETE) → Manipulates table data | DQL (SELECT) → Queries records',
            'DDL → Edits photos | DML → Plays audio | DQL → Formats printer',
            'All SQL commands only delete hard drives',
            'SQL is used only for painting graphics'
          ],
          correctIndex: 0,
          explanation: 'SQL commands are categorized into Data Definition Language (DDL), Data Manipulation Language (DML), Data Query Language (DQL), and DCL/TCL.',
          topic: 'SQL DDL, DML & DQL'
        },
        {
          text: `In an HTML5 <form>, which input type masks the characters typed by the user with dots/asterisks, and which attribute ensures a field cannot be left blank before submission?`,
          options: [
            'type="password" and the required attribute',
            'type="text" and the hidden attribute',
            'type="button" and the readonly attribute',
            'type="radio" and the disabled attribute'
          ],
          correctIndex: 0,
          explanation: '<input type="password" required> masks sensitive input and enforces client-side mandatory field validation.',
          topic: 'HTML5 Forms & Validation'
        },
        {
          text: `Identify the INCORRECT statement regarding Intellectual Property Rights (IPR) and Digital Plagiarism:`,
          options: [
            'Copyright legally protects original literary, artistic, musical, and software creations',
            'Copying someone else’s research, code, or article and presenting it as your own without citation is Plagiarism',
            'Creative Commons (CC) licences allow creators to specify how others may share or attribute their work',
            'Anything published on the Internet has no copyright and can be sold illegally under your own name'
          ],
          correctIndex: 3,
          explanation: 'Digital content is protected by copyright and intellectual property laws; proper attribution and licensing must always be respected.',
          topic: 'Cyber Ethics, Copyright & Plagiarism'
        },
        {
          text: `Complete the SQL query to fetch all students from Class 10 who scored more than 85 marks, sorted from highest to lowest marks: SELECT name, marks FROM students WHERE class = 10 AND marks > 85 _____ marks _____;`,
          options: ['ORDER BY ... DESC', 'GROUP BY ... ASC', 'INSERT INTO ... TOP', 'JOIN ... ALTER'],
          correctIndex: 0,
          explanation: 'ORDER BY marks DESC sorts the result set in descending order (highest marks first).',
          topic: 'SQL Filtering & Sorting'
        },
        {
          text: `Convert the 8-bit binary number (00101101)₂ into its equivalent Decimal (Base-10) number:`,
          options: ['45', '35', '53', '29'],
          correctIndex: 0,
          explanation: '(00101101)₂ = 32 + 8 + 4 + 1 = 45 in decimal.',
          topic: 'Binary & Decimal Number Systems'
        },
        {
          text: `Look at the network topology icon 🕸️. In which network topology are all computers connected individually to a central hub or switch, so that failure of one cable does not disrupt the rest of the network?`,
          options: ['Star Topology', 'Bus Topology', 'Single Daisy Chain', 'Point-to-Point Line'],
          correctIndex: 0,
          diagramEmoji: '🕸️',
          explanation: 'In a Star Topology, each node has a dedicated point-to-point link to a central switch/hub, making fault isolation easy.',
          topic: 'Network Topologies'
        },
        {
          text: `In E-Commerce, how are transactions between two businesses (e.g., a wholesaler and a retailer) and transactions directly between two consumers (e.g., selling a used textbook on an online marketplace) classified?`,
          options: [
            'B2B (Business-to-Business) and C2C (Consumer-to-Consumer)',
            'G2G and B2E',
            'LAN and WAN',
            'ROM and RAM'
          ],
          correctIndex: 0,
          explanation: 'E-commerce models include B2C (Business-to-Consumer), B2B (Business-to-Business), C2C (Consumer-to-Consumer), and G2C (Government-to-Citizen).',
          topic: 'E-Commerce Models'
        }
      ];
    }

    // Level 4: Expert Challenge
    return [
      {
        text: `In CSS3, if you have the rule "div.card#featured { color: navy; }", what is the relative specificity hierarchy from highest to lowest among Inline styles, ID selectors (#id), Class selectors (.class), and Element selectors (div)?`,
        options: [
          'Inline Style > ID Selector (#id) > Class Selector (.class) > Element/Tag Selector (div)',
          'Element Selector > Class Selector > ID Selector > Inline Style',
          'All selectors have zero specificity',
          'Alphabetical order determines specificity'
        ],
        correctIndex: 0,
        explanation: 'CSS specificity weights are calculated as (Inline, ID, Class/Attribute/Pseudo-class, Element), so Inline > #id > .class > tag.',
        topic: 'CSS Specificity & Cascade'
      },
      {
        text: `Fill in the blank: A cyber-attack in which malicious software encrypts a victim's files and demands a payment to restore access is called _____, while overwhelming a server with flood traffic from a botnet to make it unavailable is a _____ attack.`,
        options: [
          'Ransomware and DDoS (Distributed Denial of Service)',
          'Defragmentation and Compression',
          'Hyperlinking and Indexing',
          'Normalization and Pagination'
        ],
        correctIndex: 0,
        explanation: 'Ransomware locks user data via encryption for extortion, while DDoS floods target servers with traffic from distributed botnets.',
        topic: 'Advanced Cyber Threats & Defense'
      },
      {
        text: `True or False: In the OSI / TCP-IP networking model, a MAC (Media Access Control) address is a 48-bit hexadecimal hardware address burned into the Network Interface Card (NIC) that operates at the Data Link Layer.`,
        options: ['True', 'False', 'MAC address only works on Apple laptops', 'MAC address changes every millisecond'],
        correctIndex: 0,
        explanation: 'A MAC address (e.g., 00:1A:2B:3C:4D:5E) is a 48-bit physical address at Layer 2 (Data Link Layer), whereas IP addresses operate at Layer 3 (Network Layer).',
        topic: 'MAC vs IP Addressing & Network Layers'
      },
      {
        text: `Match the SQL Aggregate Function with what it computes:`,
        options: [
          'COUNT(*) → Total number of rows | AVG(marks) → Arithmetic mean of marks | SUM(fees) → Total sum | MAX(score) → Highest score',
          'COUNT(*) → Deletes rows | AVG(marks) → Sorts names | SUM(fees) → Creates table',
          'All four only return text strings',
          'All four modify the database schema'
        ],
        correctIndex: 0,
        explanation: 'SQL aggregate functions (COUNT, SUM, AVG, MIN, MAX) compute summary values across rows, often used with GROUP BY and HAVING clauses.',
        topic: 'SQL Aggregate Functions & Grouping'
      },
      {
        text: `What is "SQL Injection (SQLi)" and how do secure web applications prevent it?`,
        options: [
          'An attack where malicious SQL statements are inserted into input fields; prevented by using Parameterized Queries / Prepared Statements and input sanitization',
          'Installing SQL Server on a new computer',
          'Exporting a table to a PDF file',
          'Adding a primary key to a table'
        ],
        correctIndex: 0,
        explanation: 'Parameterized queries (prepared statements) treat user input strictly as data parameters rather than executable SQL code, preventing SQL injection.',
        topic: 'Web Application Security'
      },
      {
        text: `Identify the INCORRECT statement regarding IPv4 and IPv6 protocols:`,
        options: [
          'IPv4 uses 32-bit addresses written in dotted-decimal notation (e.g., 192.168.1.1)',
          'IPv6 uses 128-bit addresses written in eight groups of four hexadecimal digits separated by colons',
          'IPv6 was developed to overcome the exhaustion of available IPv4 addresses and support billions of IoT devices',
          'IPv6 uses only 4 bits and can connect at most 16 computers worldwide'
        ],
        correctIndex: 3,
        explanation: 'IPv6 uses 128-bit addressing (2¹²⁸ addresses), providing virtually inexhaustible address space for global internet and IoT devices.',
        topic: 'IPv4 vs IPv6 Architecture'
      },
      {
        text: `Complete the sentence: In Database Normalization, organizing tables to eliminate redundant data and ensure that non-key attributes depend fully on the Primary Key is the goal of _____.`,
        options: ['First, Second, and Third Normal Forms (1NF, 2NF, 3NF)', 'Disk Formatting', 'Packet Switching', 'Rasterization'],
        correctIndex: 0,
        explanation: 'Database normalization (1NF, 2NF, 3NF, BCNF) minimizes data redundancy and prevents insertion, update, and deletion anomalies.',
        topic: 'Database Normalization'
      },
      {
        text: `Trace the loop logic: What is the final value of variable "total" after executing: total = 0; for i in [2, 4, 6, 8]: total = total + (i * 2)?`,
        options: ['40', '20', '16', '80'],
        correctIndex: 0,
        explanation: 'The loop adds 4 + 8 + 12 + 16 = 40 to total.',
        topic: 'Iteration & Algorithmic Tracing'
      },
      {
        text: `Look at the lock icon 🔐. In asymmetric (Public-Key) cryptography used in HTTPS and Digital Signatures, how do the Public Key and Private Key work together?`,
        options: [
          'Data encrypted with the recipient’s Public Key can only be decrypted using the recipient’s secret Private Key',
          'Both keys are published on public billboards',
          'Encryption deletes the message permanently',
          'Public key is used only for offline printers'
        ],
        correctIndex: 0,
        diagramEmoji: '🔐',
        explanation: 'Asymmetric cryptography uses a mathematically linked key pair: a shareable Public Key and a confidential Private Key.',
        topic: 'Public-Key Cryptography & Digital Signatures'
      },
      {
        text: `Assertion (A): Semantic HTML5 elements like <header>, <nav>, <main>, <article>, and <footer> are preferred over generic <div> tags for page structure.\nReason (R): Semantic tags clearly describe their meaning to both web browsers, search engines (SEO), and assistive screen-reader technologies for visually impaired users.`,
        options: [
          'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
          'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
          '(A) is true, but (R) is false.',
          '(A) is false, but (R) is true.'
        ],
        correctIndex: 0,
        explanation: 'Semantic HTML5 improves accessibility (WCAG), code maintainability, and search engine indexing.',
        topic: 'Semantic HTML5 & Web Accessibility'
      }
    ];
  }

  // ============================================================================
  // 21. ENVIRONMENTAL EDUCATION — 40 Unique Questions (10 per Level, Class 9 & 10)
  // ============================================================================
  if (subject === 'Environmental Education') {
    if (level === 1) {
      return [
        {
          text: `On which date is World Environment Day celebrated globally every year?`,
          options: ['5th June', '22nd March', '22nd April', '16th September'],
          correctIndex: 0,
          explanation: 'World Environment Day is celebrated on 5th June every year under the leadership of UNEP.',
          topic: 'Environmental Awareness'
        },
        {
          text: `Fill in the blank: The 5 R's of sustainable waste management are Refuse, Reduce, Reuse, Repurpose, and _____.`,
          options: ['Recycle', 'Reburn', 'Relocate', 'pollute'],
          correctIndex: 0,
          explanation: 'The 5 R principles (Refuse, Reduce, Reuse, Repurpose, Recycle) minimize landfill waste and conserve resources.',
          topic: 'Solid Waste Management'
        },
        {
          text: `True or False: Collecting and storing rainwater from rooftops and directing it into underground pits or wells to recharge groundwater is called Rainwater Harvesting (पर्जन्यजल संधारण).`,
          options: ['True', 'False', 'It wastes rainwater', 'It causes soil erosion'],
          correctIndex: 0,
          explanation: 'Rainwater harvesting conserves fresh water and recharges depleted underground aquifers (Jalsuraksha).',
          topic: 'Water Security (जलसुरक्षा)'
        },
        {
          text: `Which layer in the stratosphere absorbs harmful ultraviolet (UV-B) radiation from the Sun and protects life on Earth?`,
          options: ['Ozone Layer (O₃)', 'Tropospheric Smog', 'Carbon Monoxide Layer', 'Nitrogen Cloud'],
          correctIndex: 0,
          explanation: 'The stratospheric ozone layer (O₃) acts as Earth’s protective shield against mutagenic UV radiation.',
          topic: 'Atmospheric Protection'
        },
        {
          text: `In household and municipal waste segregation, what kind of waste should be placed in the GREEN bin vs the BLUE bin?`,
          options: [
            'Green Bin → Wet biodegradable waste (food/garden waste) | Blue Bin → Dry recyclable waste (paper, plastic, metal)',
            'Green Bin → Glass and batteries | Blue Bin → Cooked food',
            'Both bins are for burning plastic',
            'Green Bin → E-waste only'
          ],
          correctIndex: 0,
          explanation: 'Segregating wet biodegradable waste (Green bin for composting) from dry recyclable waste (Blue bin) is essential for clean waste processing.',
          topic: 'Segregation of Waste'
        },
        {
          text: `Which of the following is a clean, inexhaustible RENEWABLE source of energy?`,
          options: ['Solar Energy and Wind Energy', 'Coal and Lignite', 'Crude Petroleum', 'Diesel'],
          correctIndex: 0,
          explanation: 'Solar and wind energy are renewable and non-polluting, unlike finite fossil fuels.',
          topic: 'Renewable Energy Resources'
        },
        {
          text: `Complete the sentence: Converting biodegradable kitchen and farm waste into nutrient-rich organic manure using earthworms is called _____.`,
          options: ['Vermicomposting', 'Incineration', 'Chlorination', 'Deforestation'],
          correctIndex: 0,
          explanation: 'Vermicomposting uses earthworms (such as Eisenia fetida, the farmer’s friend) to turn organic waste into fertile humus.',
          topic: 'Organic Farming & Vermicomposting'
        },
        {
          text: `Which mountain range passing through Maharashtra is recognized as one of the world's 8 "Hottest Biodiversity Hotspots" and a UNESCO World Heritage site?`,
          options: ['The Western Ghats (Sahyadri Range)', 'The Aravalli Hills', 'The Vindhya Range', 'The Satpura Plains'],
          correctIndex: 0,
          explanation: 'The Western Ghats (Sahyadri) harbour extraordinary endemic flora and fauna, including the Kaas Plateau of Flowers in Satara.',
          topic: 'Biodiversity of Maharashtra'
        },
        {
          text: `Look at the water drop icon 💧. On which date is World Water Day observed each year to highlight the importance of freshwater conservation?`,
          options: ['22nd March', '1st December', '15th August', '30th January'],
          correctIndex: 0,
          diagramEmoji: '💧',
          explanation: 'World Water Day is observed annually on 22nd March to focus attention on sustainable management of freshwater resources.',
          topic: 'Water Conservation Calendar'
        },
        {
          text: `Which gas is the primary contributor to the anthropogenic Greenhouse Effect and Global Warming when fossil fuels are burned?`,
          options: ['Carbon Dioxide (CO₂)', 'Argon (Ar)', 'Helium (He)', 'Pure Oxygen (O₂)'],
          correctIndex: 0,
          explanation: 'Excess Carbon Dioxide (CO₂), along with methane (CH₄) and nitrous oxide (N₂O), traps infrared heat in the atmosphere.',
          topic: 'Climate Change & Greenhouse Effect'
        }
      ];
    }

    if (level === 2) {
      return [
        {
          text: `What is the difference between "In-situ" conservation and "Ex-situ" conservation of biodiversity?`,
          options: [
            'In-situ conserves species in their natural habitats (National Parks, Sanctuaries, Sacred Groves); Ex-situ conserves them outside natural habitats (Botanical Gardens, Seed Banks, Zoos)',
            'In-situ means cutting forests; Ex-situ means hunting wildlife',
            'Both mean exporting wild animals',
            'In-situ is only for rocks'
          ],
          correctIndex: 0,
          explanation: 'In-situ ("on-site") protects entire ecosystems like Tadoba-Andhari Tiger Reserve, while Ex-situ ("off-site") preserves threatened species in botanical gardens and cryo-seed banks.',
          topic: 'In-Situ & Ex-Situ Conservation'
        },
        {
          text: `Fill in the blank: In Maharashtra, patches of forest traditionally protected by local village communities in the name of a local deity (where cutting trees or hunting is strictly taboo) are called _____.`,
          options: ['Devrai (देवराई / Sacred Groves)', 'Industrial Zones', 'Timber Depots', 'Mining Quarries'],
          correctIndex: 0,
          explanation: 'Sacred Groves (Devrai in Maharashtra) are ancient community-protected forest sanctuaries rich in rare medicinal plants and wildlife.',
          topic: 'Sacred Groves (Devrai)'
        },
        {
          text: `True or False: Drip Irrigation and Sprinkler Irrigation are micro-irrigation methods that deliver water directly to plant roots, saving 40% to 70% of water compared to flood irrigation.`,
          options: ['True', 'False', 'Drip irrigation floods the entire village', 'Drip irrigation uses saltwater from oceans'],
          correctIndex: 0,
          explanation: 'Drip irrigation minimizes evaporation and runoff losses while preventing soil salinization.',
          topic: 'Micro-Irrigation & Water Efficiency'
        },
        {
          text: `Match the Tiger Reserve / National Park in Maharashtra with its district/region:`,
          options: [
            'Tadoba-Andhari → Chandrapur | Melghat → Amravati | Sanjay Gandhi National Park → Mumbai/Thane | Sahyadri Tiger Reserve → Satara/Sangli/Kolhapur/Ratnagiri',
            'Tadoba → Pune | Melghat → Goa | Sanjay Gandhi → Nagpur',
            'All four are located outside India',
            'All four are desert parks'
          ],
          correctIndex: 0,
          explanation: 'Maharashtra protects tigers and wildlife through major reserves like Tadoba-Andhari (Chandrapur), Melghat (Amravati), Pench (Nagpur), Navegaon-Nagzira, Bor, and Sahyadri.',
          topic: 'Wildlife Sanctuaries of Maharashtra'
        },
        {
          text: `What is "Eutrophication" in freshwater lakes and ponds?`,
          options: [
            'Excessive enrichment of water with nutrients (nitrates and phosphates from fertilizers/sewage), causing dense algal blooms that deplete dissolved oxygen and suffocate fish',
            'Purification of water using reverse osmosis',
            'Freezing of mountain glaciers',
            'Planting mango orchards on hills'
          ],
          correctIndex: 0,
          explanation: 'Nutrient runoff causes algal blooms; when algae die and decompose, bacteria consume dissolved oxygen, creating hypoxic dead zones.',
          topic: 'Water Pollution & Eutrophication'
        },
        {
          text: `Identify the INCORRECT statement regarding Electronic Waste (E-Waste):`,
          options: [
            'Discarded computers, mobile phones, batteries, and circuit boards constitute E-Waste',
            'E-Waste contains hazardous heavy metals like Lead, Mercury, and Cadmium that can leach into groundwater if dumped in open landfills',
            'E-Waste should be handed over to authorized e-waste recyclers for safe recovery of metals',
            'Burning plastic circuit boards in the open backyard is the healthiest way to dispose of E-Waste'
          ],
          correctIndex: 3,
          explanation: 'Open burning of e-waste releases toxic dioxins, furans, and heavy metal fumes; it must be processed only at authorized recycling facilities.',
          topic: 'E-Waste Management'
        },
        {
          text: `Complete the watershed principle used in Maharashtra's Jalsuraksha programmes: "Catch rain where it falls; make running water walk, make walking water crawl, and make crawling water _____ into the soil."`,
          options: ['Percolate (seep underground to recharge aquifers)', 'Evaporate instantly', 'Run into the sea', 'Turn into acid'],
          correctIndex: 0,
          explanation: 'Slowing surface runoff via contour trenches (CCT), check dams, and farm ponds allows rainwater to percolate and recharge the water table.',
          topic: 'Watershed Management Principles'
        },
        {
          text: `Which synthetic chemicals, formerly used in refrigerators and aerosol sprays, were phased out under the 1987 Montreal Protocol because they release chlorine atoms that destroy stratospheric ozone?`,
          options: ['Chlorofluorocarbons (CFCs)', 'Oxygen molecules', 'Water vapour', 'Citric acid'],
          correctIndex: 0,
          explanation: 'CFCs release free chlorine radicals under UV light in the stratosphere, catalytically breaking down thousands of ozone (O₃) molecules.',
          topic: 'Ozone Depletion & Montreal Protocol'
        },
        {
          text: `Look at the bird icon 🦩. Who is celebrated as the "Birdman of India" for his pioneering ornithological surveys across India, and who inspired the youth wildlife conservation movement in Maharashtra?`,
          options: ['Dr. Salim Ali (and Maruti Chitampalli for Marathi forest literature)', 'Lord Dalhousie', 'Vasco da Gama', 'Marco Polo'],
          correctIndex: 0,
          diagramEmoji: '🦩',
          explanation: 'Dr. Salim Ali conducted systematic bird surveys across India, and forest officer-author Maruti Chitampalli enriched Marathi wildlife literature ("Pakshikosh").',
          topic: 'Environmental Pioneers'
        },
        {
          text: `What is the main advantage of producing Biogas (Gobar Gas, primarily Methane CH₄) in rural households from cattle dung and agricultural waste?`,
          options: [
            'It provides clean, smokeless cooking fuel AND leaves behind nutrient-rich organic slurry manure for crops',
            'It produces radioactive waste',
            'It destroys soil fertility',
            'It requires importing coal'
          ],
          correctIndex: 0,
          explanation: 'Anaerobic digestion in a biogas plant generates clean methane fuel and high-grade nitrogen/phosphorus-rich organic fertilizer.',
          topic: 'Biogas & Rural Sustainability'
        }
      ];
    }

    if (level === 3) {
      return [
        {
          text: `What does BOD (Biochemical Oxygen Demand) measure when testing the water quality of a river?`,
          options: [
            'The amount of dissolved oxygen needed by aerobic microorganisms to break down organic matter in a water sample (higher BOD indicates higher organic pollution)',
            'The temperature of boiling water',
            'The depth of the river bed in metres',
            'The speed of boats on the river'
          ],
          correctIndex: 0,
          explanation: 'Clean drinking water has a very low BOD (< 1–2 ppm), whereas sewage-polluted water has a high BOD and low Dissolved Oxygen (DO).',
          topic: 'Water Quality Parameters (DO & BOD)'
        },
        {
          text: `Fill in the blank: The progressive increase in the concentration of non-biodegradable toxic substances (such as DDT or Mercury) at successively higher trophic levels in a food chain is called _____.`,
          options: ['Biomagnification (Biological Magnification)', 'Photosynthesis', 'Nitrification', 'Transpiration'],
          correctIndex: 0,
          explanation: 'Because persistent toxins like DDT and methylmercury are fat-soluble and not excreted, they accumulate to dangerous levels in top predators (fish-eating birds, humans).',
          topic: 'Biomagnification in Food Chains'
        },
        {
          text: `True or False: In Maharashtra, the village of Hiware Bazar (under Popatrao Pawar) and Ralegan Siddhi (under Anna Hazare) in Ahilyanagar (Ahmednagar) district became national models of community-led watershed development and drought eradication.`,
          options: ['True', 'False', 'They are snow-covered Himalayan glaciers', 'They banned rainwater harvesting'],
          correctIndex: 0,
          explanation: 'Through Shramdaan, continuous contour trenches (CCT), ban on free grazing/tree felling, and crop water budgeting, Ralegan Siddhi and Hiware Bazar transformed from drought-prone villages into prosperous water-secure models.',
          topic: 'Case Studies in Water Security (Jalsuraksha)'
        },
        {
          text: `Match the Environmental Act in India with the year it was enacted by Parliament:`,
          options: [
            'Wildlife Protection Act → 1972 | Water (Prevention & Control of Pollution) Act → 1974 | Forest Conservation Act → 1980 | Environment (Protection) Act → 1986',
            'All four were enacted in 1600',
            'Wildlife Act → 2025 | Environment Act → 1901',
            'None of these laws exist in India'
          ],
          correctIndex: 0,
          explanation: 'India’s environmental legal framework includes the Wildlife Protection Act (1972), Water Act (1974), Forest Conservation Act (1980), Air Act (1981), Environment Protection Act (1986), and Biodiversity Act (2002).',
          topic: 'Environmental Legislation in India'
        },
        {
          text: `Which international organization publishes the "Red Data Book" (Red List) categorizing species into Critically Endangered, Endangered, Vulnerable, and Extinct?`,
          options: [
            'IUCN (International Union for Conservation of Nature)',
            'FIFA',
            'World Trade Organization (WTO)',
            'International Monetary Fund (IMF)'
          ],
          correctIndex: 0,
          explanation: 'The IUCN Red List of Threatened Species (headquartered in Gland, Switzerland) is the global inventory of the conservation status of biological species.',
          topic: 'IUCN Red List & Threatened Species'
        },
        {
          text: `Identify the INCORRECT statement about Acid Rain:`,
          options: [
            'Acid rain is caused when Sulphur Dioxide (SO₂) and Nitrogen Oxides (NOₓ) react with atmospheric moisture to form Sulphuric Acid (H₂SO₄) and Nitric Acid (HNO₃)',
            'Normal unpolluted rain has a pH of ~5.6, while acid rain has a pH below 5.6',
            'Acid rain corrodes marble monuments like the Taj Mahal ("Marble Cancer") and acidifies soil and lakes',
            'Acid rain is caused by planting too many neem and banyan trees'
          ],
          correctIndex: 3,
          explanation: 'Trees purify air; acid rain is caused by industrial and vehicular emissions of SO₂ and NOₓ.',
          topic: 'Acid Rain & Air Pollution'
        },
        {
          text: `Complete the sentence: Development that meets the needs of the present generation without compromising the ability of future generations to meet their own needs (Brundtland Report, 1987) is defined as _____.`,
          options: ['Sustainable Development (शाश्वत विकास)', 'Reckless Industrialization', 'Monoculture Shifting', 'Slash-and-Burn Mining'],
          correctIndex: 0,
          explanation: 'Sustainable development balances economic progress, social equity, and ecological preservation for future generations.',
          topic: 'Sustainable Development Goals (SDGs)'
        },
        {
          text: `In a rooftop rainwater harvesting calculation: If a school building has a flat rooftop area of 200 m² and receives 800 mm (0.8 m) of annual rainfall with a collection efficiency of 80% (0.8), how many litres of rainwater can be harvested annually? (1 m³ = 1,000 litres)`,
          options: ['1,28,000 litres', '16,000 litres', '5,000 litres', '10,00,000 litres'],
          correctIndex: 0,
          explanation: 'Volume = Area × Rainfall × Efficiency = 200 m² × 0.8 m × 0.8 = 128 m³ = 1,28,000 litres.',
          topic: 'Rainwater Harvesting Potential Calculation'
        },
        {
          text: `Look at the mangrove tree icon 🌿. Why are coastal Mangrove forests (such as along the Thane Creek and Konkan coast of Maharashtra) vital ecological buffers?`,
          options: [
            'Their dense pneumatophore/prop roots stabilize coastlines against storm surges, tsunamis, and soil erosion while serving as nurseries for marine life',
            'They grow only on dry desert sand dunes',
            'They turn seawater into petrol',
            'They block sunlight from reaching the sky'
          ],
          correctIndex: 0,
          diagramEmoji: '🌿',
          explanation: 'Mangroves (halophytes with breathing roots called pneumatophores) protect coastal communities from cyclones and erosion and store vast amounts of "Blue Carbon".',
          topic: 'Mangrove Ecosystems & Coastal Conservation'
        },
        {
          text: `What is a "Water Audit" (जल अंकेक्षण) in household and village water management?`,
          options: [
            'A systematic accounting of total water availability (rainfall, groundwater, surface storage) versus total water demand (drinking, domestic, livestock, and crop irrigation) to prevent deficit and wastage',
            'Swimming across a river',
            'Buying bottled water from supermarkets',
            'Drilling deeper borewells without recharging'
          ],
          correctIndex: 0,
          explanation: 'A Water Audit & Water Budget balances water inflow and outflow, guiding farmers to choose low-water-intensive crops during low-rainfall years.',
          topic: 'Water Audit & Water Budgeting'
        }
      ];
    }

    // Level 4: Expert Challenge
    return [
      {
        text: `Which international treaties specifically address (1) Wetlands of International Importance, (2) Trade in Endangered Species, and (3) Limiting Global Temperature Rise to well below 2 °C (1.5 °C)?`,
        options: [
          '(1) Ramsar Convention (1971), (2) CITES, and (3) Paris Climate Agreement (COP21, 2015)',
          '(1) Treaty of Versailles, (2) Geneva Convention, and (3) NATO',
          '(1) Bretton Woods, (2) GATT, and (3) NAFTA',
          '(1) Panchsheel, (2) Shimla Agreement, and (3) Tashkent Declaration'
        ],
        correctIndex: 0,
        explanation: 'The Ramsar Convention (1971) protects wetlands (like Lonar Lake, Nandur Madhmeshwar, and Thane Creek in Maharashtra); CITES regulates wildlife trade; and the Paris Agreement (2015) targets net-zero emissions.',
        topic: 'International Environmental Conventions'
      },
      {
        text: `Fill in the blank: In Maharashtra, the saline crater lake formed by a meteor impact in Buldhana district, the bird sanctuary in Nashik district, and the flamingo sanctuary in Mumbai/Thane are designated as _____ Wetlands.`,
        options: [
          'Ramsar Sites (Lonar Lake, Nandur Madhmeshwar, and Thane Creek Flamingo Sanctuary)',
          'Nuclear Test Sites',
          'Artificial Ski Resorts',
          'Thermal Power Stations'
        ],
        correctIndex: 0,
        explanation: 'Maharashtra has three internationally recognized Ramsar Wetlands: Nandur Madhmeshwar (Nashik), Lonar Crater Lake (Buldhana), and Thane Creek Flamingo Sanctuary.',
        topic: 'Ramsar Sites of Maharashtra'
      },
      {
        text: `True or False: Bio-medical waste from hospitals (such as used syringes, bandages, and pathological waste) is governed by strict colour-coded segregation rules (Yellow, Red, White, Blue) and must NEVER be mixed with general municipal garbage.`,
        options: ['True', 'False', 'Used needles should be thrown in open playgrounds', 'Hospital waste is biodegradable compost'],
        correctIndex: 0,
        explanation: 'Under the Bio-Medical Waste Management Rules, infectious anatomical waste, contaminated plastics, sharps (needles), and glassware are segregated into Yellow, Red, White, and Blue containers for autoclaving/incineration.',
        topic: 'Bio-Medical Waste Management'
      },
      {
        text: `Match the Watershed Structure used on hill slopes from Ridge to Valley ("Ridge to Valley Treatment" / माथा ते पायथा उपचार):`,
        options: [
          'Upper Ridge → Continuous Contour Trenches (CCT / समतल चर) | Middle Slope → Loose Boulder Structures & Gabions | Valley Bottom → Check Dams (बंधारे) & Percolation Tanks',
          'Upper Ridge → Deep Borewells | Valley Bottom → Deforestation',
          'All structures are built on the highway',
          'Watershed treatment starts by paving the hill with concrete'
        ],
        correctIndex: 0,
        explanation: 'Ridge-to-Valley ("Matha te Paytha") watershed management starts at the hilltop with CCTs to arrest runoff velocity and ends in the valley with check dams and percolation tanks.',
        topic: 'Ridge-to-Valley Watershed Engineering'
      },
      {
        text: `Which Articles of the Indian Constitution explicitly enjoin the State and every citizen to protect and improve the natural environment, including forests, lakes, rivers, and wildlife?`,
        options: [
          'Article 48A (Directive Principles of State Policy) and Article 51A(g) (Fundamental Duties)',
          'Article 17 and Article 18',
          'Article 352 and Article 360',
          'Article 280 and Article 324'
        ],
        correctIndex: 0,
        explanation: 'Inserted by the 42nd Amendment (1976), Article 48A directs the State and Article 51A(g) makes it a Fundamental Duty of every citizen to protect the environment and have compassion for living creatures.',
        topic: 'Constitutional Mandate for Environment'
      },
      {
        text: `Identify the INCORRECT statement regarding Ecological Footprint and Carbon Footprint:`,
        options: [
          'Carbon Footprint is the total amount of greenhouse gases (expressed as CO₂ equivalent) emitted directly or indirectly by an individual, organization, or product',
          'Using public transport, cycling, solar rooftops, and planting native trees reduces one’s carbon footprint',
          'Ecological Footprint measures human demand on Earth’s ecosystems compared to the planet’s capacity to regenerate resources',
          'Leaving air conditioners and lights running in empty rooms reduces your carbon footprint to zero'
        ],
        correctIndex: 3,
        explanation: 'Wasting electricity generated from thermal power plants increases greenhouse gas emissions and enlarges your carbon footprint.',
        topic: 'Carbon Footprint & Climate Action'
      },
      {
        text: `Complete the sentence: Specialized judicial fast-track courts established in India under the Act of 2010 to handle cases relating to environmental protection and conservation of forests are called the _____.`,
        options: ['National Green Tribunal (NGT)', 'Debt Recovery Tribunal', 'Income Tax Appellate Tribunal', 'Company Law Board'],
        correctIndex: 0,
        explanation: 'The National Green Tribunal (NGT), established in 2010, provides expeditious disposal of environmental disputes and enforces the "Polluter Pays" and "Precautionary" principles.',
        topic: 'National Green Tribunal (NGT)'
      },
      {
        text: `In an Environmental Impact Assessment (EIA), what is the "Precautionary Principle" vs the "Polluter Pays Principle"?`,
        options: [
          'Precautionary Principle prevents activities that pose serious environmental harm before damage occurs; Polluter Pays holds the polluting industry financially liable to compensate victims and restore the damaged ecology',
          'Polluter Pays means the government pays industries to pollute rivers',
          'Precautionary Principle means ignoring scientific warnings',
          'Both principles allow unlimited deforestation'
        ],
        correctIndex: 0,
        explanation: 'Indian environmental jurisprudence (e.g., Vellore Citizens Welfare Forum case) recognizes both the Precautionary Principle and the Polluter Pays Principle as essential tenets of sustainable development.',
        topic: 'Environmental Impact Assessment (EIA)'
      },
      {
        text: `Look at the sacred tree icon 🌳. Who is the Padma Shri awardee from Maharashtra ("Seed Mother" / बीजमाता) renowned for conserving and reviving hundreds of indigenous, drought-resistant traditional seed varieties?`,
        options: ['Rahibai Soma Popere (of Akole, Ahilyanagar)', 'Salumarada Thimmakka', 'Amrita Devi Bishnoi', 'Gaura Devi'],
          correctIndex: 0,
          diagramEmoji: '🌳',
          explanation: 'Padma Shri Rahibai Soma Popere of Kombhalne village (Akole, Maharashtra), fondly called "Seed Mother" (Beejmata), created community seed banks conserving indigenous agrobiodiversity.',
          topic: 'Agrobiodiversity & Indigenous Seed Conservation'
        },
      {
        text: `Assertion (A): Planting monoculture plantations of exotic water-guzzling trees cannot replace a natural multi-layered native forest.\nReason (R): Native biodiversity-rich forests support complex food webs, pollinators, soil mycorrhizal fungi, and natural groundwater recharge.`,
        options: [
          'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
          'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
          '(A) is true, but (R) is false.',
          '(A) is false, but (R) is true.'
        ],
        correctIndex: 0,
        explanation: 'Ecological restoration prioritizes native keystone species (like Banyan, Peepal, Neem, Arjun, Umbar, Jamun) that sustain local wildlife and hydrology.',
        topic: 'Ecological Restoration vs Monoculture'
      }
    ];
  }

  // ============================================================================
  // 22. PHYSICAL EDUCATION — 40 Unique Questions (10 per Level, Class 9 & 10)
  // ============================================================================
  if (subject === 'Physical Education') {
    if (level === 1) {
      return [
        {
          text: `On which date is International Day of Yoga celebrated worldwide every year?`,
          options: ['21st June', '29th August', '14th November', '7th April'],
          correctIndex: 0,
          explanation: '21st June (the summer solstice in the Northern Hemisphere) was declared International Day of Yoga by the United Nations in 2014.',
          topic: 'Yoga & Holistic Health'
        },
        {
          text: `Fill in the blank: National Sports Day in India is celebrated on 29th August every year to honour the birth anniversary of legendary hockey wizard _____.`,
          options: ['Major Dhyan Chand', 'Milkha Singh', 'Khashaba Jadhav', 'Sachin Tendulkar'],
          correctIndex: 0,
          explanation: '29th August marks the birth anniversary of hockey legend Major Dhyan Chand, who won three consecutive Olympic gold medals (1928, 1932, 1936).',
          topic: 'Indian Sports Heritage'
        },
        {
          text: `True or False: Performing a 10-minute dynamic warm-up before sports and gentle stretching (cool-down) after exercise helps prevent muscle cramps and ligament sprains.`,
          options: ['True', 'False', 'Warm-up causes fractures', 'One should sprint without warming up'],
          correctIndex: 0,
          explanation: 'Warming up increases blood flow and muscle elasticity, while cooling down safely lowers heart rate and clears lactic acid.',
          topic: 'Warm-Up, Cool-Down & Injury Prevention'
        },
        {
          text: `What is the formula used to calculate Body Mass Index (BMI) to assess healthy body weight?`,
          options: [
            'BMI = Weight (in kg) ÷ [Height (in metres)]²',
            'BMI = Height (in cm) × Weight (in kg)',
            'BMI = Age + Pulse Rate',
            'BMI = Weight ÷ Age'
          ],
          correctIndex: 0,
          explanation: 'Body Mass Index (BMI) is calculated as body mass in kilograms divided by the square of height in metres (kg/m²).',
          topic: 'Health-Related Physical Fitness & BMI'
        },
        {
          text: `How many players from one team are actively on the court during a standard match of Kabaddi, and how many in Kho-Kho?`,
          options: [
            '7 active players in Kabaddi and 9 active players on the field in Kho-Kho',
            '11 players in both',
            '5 players in Kabaddi and 15 in Kho-Kho',
            '2 players in both'
          ],
          correctIndex: 0,
          explanation: 'In Kabaddi, a team has 12 players with 7 playing on the court; in Kho-Kho, a team has 12 players with 9 on the field (8 sitting in squares + 1 active chaser).',
          topic: 'Traditional Indian Sports (Kabaddi & Kho-Kho)'
        },
        {
          text: `Which sequence of 12 graceful yoga postures performed dynamically is known as the "Salutation to the Sun"?`,
          options: ['Surya Namaskar (सूर्यनमस्कार)', 'Shavasana', 'Padmasana', 'Vajrasana'],
          correctIndex: 0,
          explanation: 'Surya Namaskar is a complete 12-posture yogic sequence combining physical flexibility, strength, and rhythmic breathing.',
          topic: 'Surya Namaskar & Asanas'
        },
        {
          text: `Complete the First Aid rule for acute soft-tissue sports injuries (like an ankle sprain): R.I.C.E. stands for Rest, Ice, Compression, and _____.`,
          options: ['Elevation', 'Exercise immediately', 'Exhaustion', 'Electricity'],
          correctIndex: 0,
          explanation: 'R.I.C.E. (Rest, Ice application, Compression bandage, and Elevation above heart level) reduces internal bleeding and swelling in sprains.',
          topic: 'Sports First Aid (R.I.C.E. Protocol)'
        },
        {
          text: `What is the standard length of one full lap of an international outdoor athletics running track?`,
          options: ['400 metres', '100 metres', '1000 metres', '250 metres'],
          correctIndex: 0,
          explanation: 'A standard international outdoor athletics track measures 400 metres in the innermost lane (Lane 1).',
          topic: 'Track & Field Athletics'
        },
        {
          text: `Look at the medal icon 🏅. Who was the first athlete from independent India (hailing from Goleshwar, Satara, Maharashtra) to win an individual Olympic medal (Bronze in Wrestling at the 1952 Helsinki Olympics)?`,
          options: ['Khashaba Dadasaheb Jadhav (K.D. Jadhav)', 'Neeraj Chopra', 'Abhinav Bindra', 'Leander Paes'],
          correctIndex: 0,
          diagramEmoji: '🏅',
          explanation: 'Khashaba Dadasaheb Jadhav ("Pocket Dynamo" from Maharashtra) won India’s first individual Olympic medal in freestyle wrestling at Helsinki in 1952.',
          topic: 'Olympic Champions of Maharashtra & India'
        },
        {
          text: `Which yogicasana is uniquely recommended to be practiced immediately AFTER eating meals to aid healthy digestion?`,
          options: ['Vajrasana (Thunderbolt Pose)', 'Shirshasana (Headstand)', 'Chakrasana', 'Halasana'],
          correctIndex: 0,
          explanation: 'Vajrasana increases blood circulation to the digestive organs in the pelvic/abdominal region and is the only asana practiced after meals.',
          topic: 'Therapeutic Yoga Asanas'
        }
      ];
    }

    if (level === 2) {
      return [
        {
          text: `What are the five main components of Health-Related Physical Fitness?`,
          options: [
            'Cardiovascular Endurance, Muscular Strength, Muscular Endurance, Flexibility, and Body Composition',
            'Video Gaming, Watching TV, Sleeping, Eating Sweets, and Sitting',
            'Height, Hair Colour, Shoe Size, Eye Colour, and Voice Pitch',
            'Only Lifting Heavy Weights without breathing'
          ],
          correctIndex: 0,
          explanation: 'Health-related physical fitness comprises cardiorespiratory endurance, muscular strength, muscular endurance, flexibility, and body composition.',
          topic: 'Components of Physical Fitness'
        },
        {
          text: `Fill in the blank: In Maharshi Patanjali's Ashtanga Yoga (Eight Limbs of Yoga), the regulation and mindful control of breath (Prana) is called _____.`,
          options: ['Pranayama (प्राणायाम)', 'Pratyahara', 'Dharana', 'Yama'],
          correctIndex: 0,
          explanation: 'The eight limbs of Ashtanga Yoga are Yama, Niyama, Asana, Pranayama (breath control), Pratyahara, Dharana, Dhyana, and Samadhi.',
          topic: 'Ashtanga Yoga & Pranayama'
        },
        {
          text: `True or False: Macronutrients required in balanced sports nutrition include Carbohydrates (primary energy source), Proteins (muscle repair & growth), and Healthy Fats, along with adequate Hydration.`,
          options: ['True', 'False', 'Athletes need only carbonated soft drinks', 'Proteins have zero role in muscle recovery'],
          correctIndex: 0,
          explanation: 'Carbohydrates replenish muscle glycogen, proteins repair micro-tears in muscle fibres, and water/electrolytes prevent dehydration.',
          topic: 'Sports Nutrition & Balanced Diet'
        },
        {
          text: `Match the Fitness Test with the physical fitness component it measures:`,
          options: [
            'Sit-and-Reach Test → Flexibility | 12-Minute Cooper Run/Walk → Cardiovascular Endurance | Push-Ups / Sit-Ups → Muscular Endurance | 30m Dash → Speed',
            'Sit-and-Reach → Vision | Cooper Run → Hearing | Push-Ups → Spelling',
            'All four tests only measure body weight',
            'All four tests are written exams'
          ],
          correctIndex: 0,
          explanation: 'Standardized physical education assessments measure flexibility (Sit-and-Reach), aerobic capacity (Cooper / Beep test), muscular endurance (Sit-ups/Push-ups), and speed/agility (Shuttle run).',
          topic: 'Physical Fitness Testing'
        },
        {
          text: `In the Olympic flag, what do the five interlocking rings of Blue, Yellow, Black, Green, and Red on a white background symbolize?`,
          options: [
            'The union of the five inhabited continents of the world and the meeting of athletes from around the globe',
            'Five days of the week',
            'Five subjects in school',
            'Five rivers of one state'
          ],
          correctIndex: 0,
          explanation: 'Designed by Baron Pierre de Coubertin in 1913, the five Olympic rings represent the union of the five continents (Africa, Americas, Asia, Europe, and Oceania).',
          topic: 'The Olympic Movement'
        },
        {
          text: `Identify the INCORRECT statement regarding Postural Deformities in growing students:`,
          options: [
            'Kyphosis is an exaggerated outward rounding of the upper back (thoracic spine)',
            'Lordosis is an excessive inward curve of the lower back (lumbar spine)',
            'Scoliosis is a sideways (lateral) S- or C-shaped curvature of the spine',
            'Carrying a heavy schoolbag slung on only one shoulder every day improves spinal alignment'
          ],
          correctIndex: 3,
          explanation: 'Carrying heavy bags on one shoulder causes lateral spinal imbalance (Scoliosis); backpacks should be worn evenly on both shoulders with good posture.',
          topic: 'Posture & Postural Deformities'
        },
        {
          text: `Complete the Olympic Motto (updated in 2021 by the IOC): "Citius, Altius, Fortius – Communiter" translates from Latin to _____.`,
          options: [
            '"Faster, Higher, Stronger – Together"',
            '"Win at Any Cost"',
            '"Slow and Steady Only"',
            '"Play Indoors Always"'
          ],
          correctIndex: 0,
          explanation: 'The Olympic motto "Citius, Altius, Fortius – Communiter" means "Faster, Higher, Stronger – Together".',
          topic: 'Olympic Motto & Values'
        },
        {
          text: `If a student in Class 10 weighs 54 kg and has a height of 1.5 metres (150 cm), what is their Body Mass Index (BMI)?`,
          options: ['24.0 kg/m² (Normal Healthy Range)', '36.0 kg/m²', '18.0 kg/m²', '12.0 kg/m²'],
          correctIndex: 0,
          explanation: 'BMI = 54 ÷ (1.5)² = 54 ÷ 2.25 = 24.0 kg/m², which falls within the normal healthy range (18.5–24.9).',
          topic: 'BMI Calculation Practice'
        },
        {
          text: `Look at the pole icon 🤸. Which traditional Indian gymnastics sport, popular in Maharashtra, involves performing acrobatic yoga postures and grips on a vertical wooden pole or suspended rope?`,
          options: ['Mallakhamb (मल्लखांब)', 'Fencing', 'Ice Hockey', 'Polo'],
          correctIndex: 0,
          diagramEmoji: '🤸',
          explanation: 'Mallakhamb ("wrestler of the pole"), revitalized in Maharashtra by Balambhattdada Deodhar, builds extraordinary core strength, agility, and neuromuscular coordination.',
          topic: 'Traditional Sport – Mallakhamb'
        },
        {
          text: `What is the normal resting heart rate (pulse rate) of a healthy adolescent/adult, and which artery at the wrist is most commonly used to palpate the pulse?`,
          options: [
            '60 to 100 beats per minute (bpm), felt at the Radial Artery on the thumb side of the wrist',
            '250 to 300 bpm, felt on the fingernails',
            '10 to 15 bpm, felt on the elbow bone',
            '500 bpm, felt on the earlobe'
          ],
          correctIndex: 0,
          explanation: 'A normal resting pulse is 60–100 bpm (often lower, 50–65 bpm, in trained athletes) and is easily measured at the radial artery on the wrist or carotid artery on the neck.',
          topic: 'Physiology of Exercise & Pulse Rate'
        }
      ];
    }

    if (level === 3) {
      return [
        {
          text: `What are the Six Skill-Related (Motor) Physical Fitness Components essential for athletic performance?`,
          options: [
            'Agility, Balance, Coordination, Power (Explosive Strength), Reaction Time, and Speed',
            'Reading, Writing, Typing, Painting, Singing, and Cooking',
            'Digestion, Respiration, Excretion, Circulation, Sleep, and Thirst',
            'Height, Weight, Age, Gender, and Blood Group'
          ],
          correctIndex: 0,
          explanation: 'Skill-related fitness components (Agility, Balance, Coordination, Power, Reaction Time, Speed) enable rapid, precise movements in sports.',
          topic: 'Skill-Related Motor Fitness'
        },
        {
          text: `Fill in the blank: In Kabaddi, when a defending team is reduced to 3 or fewer players on the court and successfully tackles the raider to prevent him from returning to his court, it is called a _____ worth 2 points.`,
          options: ['Super Tackle', 'Lona (All Out)', 'Bonus Line', 'Free Hit'],
          correctIndex: 0,
          explanation: 'A Super Tackle awards 2 points to the defending team when 3 or fewer defenders successfully catch the raider; a Lona awards 2 bonus points when the entire opposition team is put out.',
          topic: 'Rules of Kabaddi'
        },
        {
          text: `True or False: In a standard 4 × 100 m Relay race in Track Athletics, the baton must be exchanged strictly within the marked 30-metre "Exchange Zone" (Takeover Zone), otherwise the team is disqualified.`,
          options: ['True', 'False', 'Runners can throw the baton across the field', 'Baton can be exchanged anywhere in the stands'],
          correctIndex: 0,
          explanation: 'In relay races, the position of the baton (not the runners’ bodies) determines whether the pass was completed inside the official takeover zone.',
          topic: 'Track & Field Relay Rules'
        },
        {
          text: `Match the National Sports Award of India with its recipient category:`,
          options: [
            'Major Dhyan Chand Khel Ratna Award → Highest sporting honour | Arjuna Award → Outstanding consistent performance by players | Dronacharya Award → Excellence in Sports Coaching | Shiv Chhatrapati State Sports Award → Highest sports honour of Maharashtra Government',
            'Arjuna Award → Film directors | Dronacharya Award → Musicians',
            'All awards are given only for chess',
            'None of these are official government awards'
          ],
          correctIndex: 0,
          explanation: 'India honours athletes and coaches through the Khel Ratna, Arjuna, and Dronacharya Awards, while Maharashtra confers the prestigious Shiv Chhatrapati Krida Puraskar.',
          topic: 'National & State Sports Awards'
        },
        {
          text: `What is the anatomical difference between a "Sprain" and a "Strain" in sports medicine?`,
          options: [
            'A Sprain is the stretching or tearing of a LIGAMENT (connecting bone to bone at a joint), whereas a Strain is the stretching or tearing of a MUSCLE or TENDON (connecting muscle to bone)',
            'Sprain is a broken tooth and Strain is a headache',
            'Both are skin sunburns',
            'Sprain happens only to bones and Strain happens only to hair'
          ],
          correctIndex: 0,
          explanation: 'Ligaments stabilize joints (injury = Sprain), while tendons attach muscles to bones (muscle/tendon injury = Strain).',
          topic: 'Sports Injuries: Sprain vs Strain'
        },
        {
          text: `Identify the INCORRECT statement about Pranayama breathing techniques:`,
          options: [
            'Anulom-Vilom (Nadi Shodhana) is alternate nostril breathing that balances the nervous system and reduces stress',
            'Bhramari Pranayama produces a gentle humming bee sound during exhalation that calms the mind and improves concentration',
            'Puraka means inhalation, Kumbhaka means breath retention, and Rechaka means exhalation',
            'Pranayama should be performed immediately after eating a heavy meal while running a 100m sprint'
          ],
          correctIndex: 3,
          explanation: 'Pranayama should always be practiced on an empty stomach in a calm, well-ventilated sitting posture (like Sukhasana or Padmasana).',
          topic: 'Science of Pranayama'
        },
        {
          text: `Complete the sentence: The international agency responsible for promoting clean, drug-free sport and enforcing the anti-doping code worldwide is _____, and its Indian national counterpart is _____.`,
          options: [
            'WADA (World Anti-Doping Agency) and NADA (National Anti-Doping Agency)',
            'WHO and UNICEF',
            'ISRO and DRDO',
            'SEBI and RBI'
          ],
          correctIndex: 0,
          explanation: 'WADA and NADA conduct testing and education to prohibit performance-enhancing drugs (doping) and uphold fair play.',
          topic: 'Anti-Doping & Ethics in Sports'
        },
        {
          text: `In a knockout tournament with 16 participating school teams, how many total matches must be played to determine the champion (without a third-place play-off)?`,
          options: ['15 matches (N - 1 = 16 - 1 = 15)', '16 matches', '32 matches', '8 matches'],
          correctIndex: 0,
          explanation: 'In a single-elimination knockout tournament with N teams, every match eliminates 1 team, so N - 1 matches are required to crown 1 champion (16 - 1 = 15).',
          topic: 'Tournament Fixtures (Knockout & League)'
        },
        {
          text: `Look at the javelin icon 🥇. Who made history at the Tokyo 2020 Olympics by winning India's first-ever Olympic Gold Medal in Track & Field Athletics (Men's Javelin Throw with a throw of 87.58 m)?`,
          options: ['Neeraj Chopra', 'P.V. Sindhu', 'Mirabai Chanu', 'Bajrang Punia'],
          correctIndex: 0,
          diagramEmoji: '🥇',
          explanation: 'Neeraj Chopra won the historic Olympic Gold in Men’s Javelin Throw at Tokyo 2020 (87.58 m) and Silver at Paris 2024.',
          topic: 'Modern Indian Olympic Milestones'
        },
        {
          text: `What is the difference between "Aerobic Exercise" and "Anaerobic Exercise"?`,
          options: [
            'Aerobic exercise (long-distance running, swimming, cycling) uses continuous oxygen over sustained durations; Anaerobic exercise (100m sprinting, heavy weightlifting) involves short, high-intensity bursts without relying on immediate inhaled oxygen',
            'Aerobic exercise is done underwater without breathing',
            'Anaerobic exercise means sleeping for 12 hours',
            'Both are identical and require zero energy'
          ],
          correctIndex: 0,
          explanation: 'Aerobic training builds cardiovascular stamina, whereas anaerobic training develops explosive muscular power and speed.',
          topic: 'Aerobic vs Anaerobic Training'
        }
      ];
    }

    // Level 4: Expert Challenge
    return [
      {
        text: `In Exercise Physiology, what is "VO₂ Max" (Maximal Oxygen Uptake)?`,
        options: [
          'The maximum rate of oxygen (in mL/kg/min) that an individual’s body can transport and utilize during incremental, maximal exercise — considered the gold-standard measure of cardiorespiratory endurance',
          'The volume of water a swimmer drinks after a race',
          'The weight of a shot put ball',
          'The height of a high-jump bar'
        ],
        correctIndex: 0,
        explanation: 'VO₂ Max reflects the combined efficiency of the lungs, heart (cardiac output), blood haemoglobin, and muscle mitochondria.',
        topic: 'VO₂ Max & Cardiorespiratory Physiology'
      },
      {
        text: `Fill in the blank: In a Knockout Tournament, if the total number of participating teams (N = 11) is not a power of 2 (2, 4, 8, 16, 32), the number of "Byes" given in the first round is calculated by subtracting N from the next higher power of 2: 16 - 11 = _____.`,
        options: ['5 Byes', '11 Byes', '2 Byes', '0 Byes'],
        correctIndex: 0,
        explanation: 'Next power of 2 above 11 is 16; Number of Byes = 2ⁿ - N = 16 - 11 = 5 Byes so that 8 teams remain in Round 2.',
        topic: 'Tournament Fixture Mathematics (Byes)'
      },
      {
        text: `True or False: In Isometric Exercises (such as holding a Plank or pushing against an immovable wall), muscle tension develops without any visible change in muscle length or joint angle.`,
        options: ['True', 'False', 'Isometric means running a marathon', 'No muscles are used in a plank'],
          correctIndex: 0,
          explanation: '"Iso" means same and "metric" means length; isometric contractions build static core and joint stability, whereas isotonic contractions involve movement (concentric and eccentric phases).',
          topic: 'Isometric, Isotonic & Isokinetic Contractions'
        },
      {
        text: `Match the Track & Field Throwing / Jumping Event with its standard men's/women's equipment or technique:`,
        options: [
          'Fosbury Flop → High Jump | Glide / Rotational Technique → Shot Put | Hitch-Kick / Hang Style → Long Jump | Approach Run & Cross-Step → Javelin Throw',
          'Fosbury Flop → 100m Hurdles | Hitch-Kick → Chess',
          'All four are swimming strokes',
          'All four are table tennis serves'
        ],
        correctIndex: 0,
        explanation: 'Dick Fosbury revolutionized the High Jump with the backward "Fosbury Flop" clearing technique; Shot Put uses the O’Brien Glide or Rotational spin.',
        topic: 'Biomechanics of Track & Field Events'
      },
      {
        text: `What is "Cardiac Output" (Q) in sports physiology, and how is it mathematically related to Heart Rate (HR) and Stroke Volume (SV)?`,
        options: [
          'Cardiac Output is the volume of blood pumped by a ventricle of the heart in one minute: Cardiac Output (Q) = Heart Rate (HR) × Stroke Volume (SV)',
          'Cardiac Output = Blood Pressure ÷ Weight',
          'Cardiac Output = Lung Capacity × Height',
          'Cardiac Output is zero during exercise'
        ],
        correctIndex: 0,
        explanation: 'At rest, if HR = 70 bpm and SV = 70 mL/beat, Cardiac Output Q = 70 × 70 = 4,900 mL (~5 litres/min), which can rise to 20–30 L/min in elite athletes during exercise.',
        topic: 'Cardiovascular Response to Exercise'
      },
      {
        text: `Identify the INCORRECT statement regarding Circuit Training (developed by R.E. Morgan and G.T. Adamson in 1953):`,
        options: [
          'Circuit training consists of 6 to 12 exercise stations arranged in a sequence targeting different muscle groups (upper body, core, lower body, cardio)',
          'An athlete moves from one station to the next with minimal or controlled rest intervals',
          'It simultaneously develops muscular endurance, strength, and cardiovascular fitness efficiently',
          'In circuit training, all 10 stations must work the exact same single finger muscle for 5 hours straight'
        ],
        correctIndex: 3,
        explanation: 'Circuit training alternates muscle groups across stations so one muscle group recovers while another works.',
        topic: 'Sports Training Methods (Circuit, Interval & Fartlek)'
      },
      {
        text: `Complete the sentence: The Swedish training method "Fartlek Training" (meaning "Speed Play") developed by Gösta Holmér combines continuous running with _____.`,
        options: [
          'Natural variations in pace (alternating fast sprints, brisk runs, and easy jogging over varied natural terrain) to build both aerobic and anaerobic endurance',
          'Sitting on a bench for 2 hours',
          'Swimming only in a 10m pool',
          'Lifting barbells while lying down'
        ],
        correctIndex: 0,
        explanation: 'Fartlek ("Speed Play") blends continuous and interval training over natural trails, enhancing stamina and pace adaptability.',
        topic: 'Endurance Training Methods'
      },
      {
        text: `In a League (Round-Robin) Tournament where every team plays every other team once (Single League), how many total matches are played if there are N = 8 teams?`,
        options: [
          '28 matches [using the formula N(N - 1) / 2 = 8 × 7 / 2 = 28]',
          '7 matches',
          '64 matches',
          '16 matches'
        ],
        correctIndex: 0,
        explanation: 'In a Single Round-Robin League tournament of N teams, total matches = N(N - 1)/2 = (8 × 7)/2 = 28 matches.',
        topic: 'League Tournament Formula'
      },
      {
        text: `Look at the弓 (archery/shooting) icon 🎯. At the Paris 2024 Olympic Games, which Indian shooter became the first athlete from independent India to win TWO Olympic medals in a single edition of the Olympic Games (10m Air Pistol Individual & Mixed Team)?`,
        options: ['Manu Bhaker', 'Swapnil Kusale (who also won a historic Bronze for Maharashtra in 50m Rifle 3 Positions)', 'Gagan Narang', 'Rajyavardhan Singh Rathore'],
        correctIndex: 0,
        diagramEmoji: '🎯',
        explanation: 'Manu Bhaker won two bronze medals at Paris 2024, and Kolhapur’s Swapnil Kusale won India’s first-ever Olympic medal in the 50m Rifle 3 Positions event.',
        topic: 'Current Sports & Paris 2024 Achievements'
      },
      {
        text: `Assertion (A): Practicing "Shavasana" (Corpse Pose) or "Yoga Nidra" at the end of a yoga session is essential for psychosomatic recovery.\nReason (R): Conscious deep relaxation activates the Parasympathetic Nervous System, lowering cortisol levels, blood pressure, and heart rate to restore homeostasis.`,
        options: [
          'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
          'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
          '(A) is true, but (R) is false.',
          '(A) is false, but (R) is true.'
        ],
        correctIndex: 0,
        explanation: 'Shavasana shifts the autonomic nervous system from sympathetic ("fight or flight") to parasympathetic ("rest and digest") recovery.',
        topic: 'Psychophysiology of Yoga & Relaxation'
      }
    ];
  }

  // ============================================================================
  // 23. MATHEMATICS – ALGEBRA — 40 Unique Questions (10 per Level, Class 10 SSC)
  // ============================================================================
  if (subject === 'Mathematics – Algebra') {
    if (level === 1) {
      return [
        {
          text: `What is the standard form of a Quadratic Equation in one variable x?`,
          options: [
            'ax² + bx + c = 0 (where a, b, c are real numbers and a ≠ 0)',
            'ax + by + c = 0',
            'ax³ + bx² + c = 0',
            'x + y = 10'
          ],
          correctIndex: 0,
          explanation: 'A quadratic equation in variable x has degree 2 and standard form ax² + bx + c = 0 with a ≠ 0.',
          topic: 'Quadratic Equations'
        },
        {
          text: `Fill in the blank: In the Arithmetic Progression (A.P.) 5, 9, 13, 17, 21, ..., the first term (a) is 5 and the common difference (d) is _____.`,
          options: ['4', '5', '3', '-4'],
          correctIndex: 0,
          explanation: 'Common difference d = t₂ - t₁ = 9 - 5 = 4.',
          topic: 'Arithmetic Progression (A.P.)'
        },
        {
          text: `True or False: When a fair coin is tossed once, the sample space is S = {H, T} and the number of sample points n(S) is 2.`,
          options: ['True', 'False', 'n(S) is 4', 'n(S) is 1'],
          correctIndex: 0,
          explanation: 'A single coin toss has two equally likely outcomes: Head (H) or Tail (T), so n(S) = 2.',
          topic: 'Probability'
        },
        {
          text: `Find the value of the determinant | 5   3 | \n                                   | 2   4 | :`,
          options: ['14', '26', '6', '-14'],
          correctIndex: 0,
          explanation: 'Value of determinant = (5 × 4) - (3 × 2) = 20 - 6 = 14.',
          topic: 'Linear Equations in Two Variables (Determinants)'
        },
        {
          text: `Under India's Goods and Services Tax (GST) system, if the rate of CGST (Central GST) on an item is 9%, what is the rate of SGST (State GST) and the total GST rate?`,
          options: [
            'SGST = 9% and Total GST = 18%',
            'SGST = 18% and Total GST = 27%',
            'SGST = 4.5% and Total GST = 9%',
            'SGST = 0% and Total GST = 9%'
          ],
          correctIndex: 0,
          explanation: 'In intra-state transactions, GST is shared equally between Central and State governments: CGST = SGST = 9%, so Total GST = 9% + 9% = 18%.',
          topic: 'Financial Planning (GST)'
        },
        {
          text: `What are the roots of the quadratic equation x² - 9x + 20 = 0?`,
          options: ['x = 4 and x = 5', 'x = -4 and x = -5', 'x = 2 and x = 10', 'x = 1 and x = 20'],
          correctIndex: 0,
          explanation: 'Factoring x² - 9x + 20 = 0 gives (x - 4)(x - 5) = 0, so x = 4 or x = 5.',
          topic: 'Factorization of Quadratic Equations'
        },
        {
          text: `Complete the formula: The n-th term (tₙ) of an Arithmetic Progression with first term 'a' and common difference 'd' is given by tₙ = _____.`,
          options: ['a + (n - 1)d', 'a + nd', 'n/2 [2a + (n - 1)d]', 'a · rⁿ⁻¹'],
          correctIndex: 0,
          explanation: 'The general term (n-th term) of an A.P. is tₙ = a + (n - 1)d.',
          topic: 'General Term of an A.P.'
        },
        {
          text: `If x + y = 12 and x - y = 4, what are the values of x and y?`,
          options: ['x = 8, y = 4', 'x = 6, y = 6', 'x = 10, y = 2', 'x = 9, y = 3'],
          correctIndex: 0,
          explanation: 'Adding the two equations gives 2x = 16 ⇒ x = 8; substituting x = 8 gives 8 + y = 12 ⇒ y = 4.',
          topic: 'Simultaneous Linear Equations'
        },
        {
          text: `Look at the dice icon 🎲. When a fair six-sided die is rolled once, what is the probability of getting an EVEN number?`,
          options: ['1/2 (or 0.5)', '1/6', '1/3', '2/3'],
          correctIndex: 0,
          diagramEmoji: '🎲',
          explanation: 'Sample space S = {1, 2, 3, 4, 5, 6}, n(S) = 6. Event A (even numbers) = {2, 4, 6}, n(A) = 3. P(A) = 3/6 = 1/2.',
          topic: 'Classical Probability'
        },
        {
          text: `In Statistics, what is the "Class Mark" (Mid-value) of the class interval 20–30?`,
          options: ['25', '20', '30', '10'],
          correctIndex: 0,
          explanation: 'Class Mark = (Lower Class Limit + Upper Class Limit) / 2 = (20 + 30) / 2 = 25.',
          topic: 'Statistics – Grouped Data'
        }
      ];
    }

    if (level === 2) {
      return [
        {
          text: `Using Cramer's Rule for simultaneous equations a₁x + b₁y = c₁ and a₂x + b₂y = c₂, if D = 5, Dₓ = 15, and Dᵧ = -10, find the values of x and y:`,
          options: ['x = 3, y = -2', 'x = 15, y = -10', 'x = -3, y = 2', 'x = 5, y = 5'],
          correctIndex: 0,
          explanation: 'By Cramer’s Rule: x = Dₓ / D = 15 / 5 = 3, and y = Dᵧ / D = -10 / 5 = -2.',
          topic: 'Cramer’s Rule'
        },
        {
          text: `Fill in the blank: For the quadratic equation ax² + bx + c = 0, the expression Δ = b² - 4ac is called the _____, which determines the nature of the roots.`,
          options: ['Discriminant', 'Determinant', 'Quotient', 'Modulus'],
          correctIndex: 0,
          explanation: 'The discriminant Δ = b² - 4ac tells us whether the roots are real and distinct (Δ > 0), real and equal (Δ = 0), or not real (Δ < 0).',
          topic: 'Discriminant & Nature of Roots'
        },
        {
          text: `True or False: The probability of any event E always lies between 0 and 1 inclusive, i.e., 0 ≤ P(E) ≤ 1, and therefore a probability can NEVER be negative or greater than 1 (100%).`,
          options: ['True', 'False', 'Probability can be -0.5', 'Probability can be 2.5'],
          correctIndex: 0,
          explanation: 'Since 0 ≤ n(E) ≤ n(S), dividing by n(S) gives 0 ≤ P(E) ≤ 1.',
          topic: 'Axioms of Probability'
        },
        {
          text: `Match the Discriminant Condition (Δ = b² - 4ac) with the Nature of Roots of a Quadratic Equation:`,
          options: [
            'Δ > 0 → Real and Unequal (Distinct) roots | Δ = 0 → Real and Equal roots | Δ < 0 → Not Real (Complex) roots',
            'Δ > 0 → No roots | Δ = 0 → Infinite roots | Δ < 0 → Equal roots',
            'All values of Δ give identical roots',
            'Δ is always zero'
          ],
          correctIndex: 0,
          explanation: 'In the quadratic formula x = [-b ± √(b² - 4ac)] / 2a, the sign of Δ = b² - 4ac governs the nature of roots.',
          topic: 'Nature of Quadratic Roots'
        },
        {
          text: `Find the 20th term (t₂₀) of the Arithmetic Progression: 7, 11, 15, 19, ...`,
          options: ['83', '79', '87', '76'],
          correctIndex: 0,
          explanation: 'Here a = 7, d = 4, n = 20. t₂₀ = a + (20 - 1)d = 7 + 19 × 4 = 7 + 76 = 83.',
          topic: 'n-th Term of an A.P.'
        },
        {
          text: `Identify the INCORRECT statement regarding Shares and Dividends in Financial Planning:`,
          options: [
            'The value printed on the share certificate is called the Face Value (FV)',
            'The price at which a share is bought or sold in the stock market is the Market Value (MV)',
            'If Market Value > Face Value, the share is said to be at a Premium',
            'Dividend percentage declared by a company is always calculated on the fluctuating Market Value instead of Face Value'
          ],
          correctIndex: 3,
          explanation: 'Dividend is ALWAYS calculated on the Face Value (FV) of a share, regardless of its current Market Value.',
          topic: 'Shares, Face Value, Market Value & Dividend'
        },
        {
          text: `Complete the relation for the sum (α + β) and product (αβ) of the roots of the quadratic equation ax² + bx + c = 0:`,
          options: ['α + β = -b/a and αβ = c/a', 'α + β = b/a and αβ = -c/a', 'α + β = c/a and αβ = b/a', 'α + β = a/b and αβ = a/c'],
          correctIndex: 0,
          explanation: 'For ax² + bx + c = 0, the sum of roots α + β = -b/a and the product of roots αβ = c/a.',
          topic: 'Relation Between Roots and Coefficients'
        },
        {
          text: `A retailer buys an electronic watch for a taxable value of ₹2,000 and sells it to a customer for a taxable value of ₹2,500. If the rate of GST is 12%, what is the GST payable by the retailer (Output Tax - Input Tax Credit)?`,
          options: ['₹60', '₹300', '₹240', '₹120'],
          correctIndex: 0,
          explanation: 'Input Tax Credit (ITC) = 12% of 2000 = ₹240. Output Tax = 12% of 2500 = ₹300. GST Payable = Output Tax - ITC = ₹300 - ₹240 = ₹60 (or 12% of value added ₹500).',
          topic: 'Input Tax Credit (ITC) & GST Payable'
        },
        {
          text: `Look at the cards icon 🃏. From a well-shuffled pack of 52 playing cards, one card is drawn at random. What is the probability that the card drawn is a RED ACE?`,
          options: ['1/26 (since there are 2 Red Aces out of 52 cards: 2/52 = 1/26)', '1/13', '1/52', '1/4'],
          correctIndex: 0,
          diagramEmoji: '🃏',
          explanation: 'A standard deck of 52 cards has 2 Red Aces (Ace of Hearts and Ace of Diamonds). Probability = 2/52 = 1/26.',
          topic: 'Playing Cards Probability'
        },
        {
          text: `In a pie diagram (pie chart), if a sector represents 25% of the total expenditure, what is the measure of the central angle (θ) for that sector?`,
          options: ['90°', '45°', '100°', '60°'],
          correctIndex: 0,
          explanation: 'Total angle around the centre of a circle is 360°. Central angle θ = 25% of 360° = (25/100) × 360° = 90°.',
          topic: 'Pie Diagram & Central Angle'
        }
      ];
    }

    if (level === 3) {
      return [
        {
          text: `Find the sum of the first 30 natural numbers (1 + 2 + 3 + ... + 30) using the A.P. sum formula Sₙ = n(n + 1)/2:`,
          options: ['465', '450', '930', '435'],
          correctIndex: 0,
          explanation: 'Sum of first n natural numbers Sₙ = n(n + 1)/2 = (30 × 31)/2 = 15 × 31 = 465.',
          topic: 'Sum of First n Terms of an A.P.'
        },
        {
          text: `Fill in the blank: If α and β are the roots of a quadratic equation, then the quadratic equation can be written directly in terms of its roots as x² - (_____)x + (αβ) = 0.`,
          options: ['α + β', 'α - β', 'α² + β²', 'α / β'],
          correctIndex: 0,
          explanation: 'A quadratic equation with roots α and β is x² - (sum of roots)x + (product of roots) = 0, i.e., x² - (α + β)x + αβ = 0.',
          topic: 'Forming Quadratic Equation from Roots'
        },
        {
          text: `True or False: When two fair coins are tossed simultaneously, the sample space is S = {HH, HT, TH, TT}, and the probability of getting "AT LEAST ONE HEAD" is 3/4.`,
          options: ['True', 'False', 'It is 1/4', 'It is 1/2'],
          correctIndex: 0,
          explanation: 'Outcomes with at least one head are {HH, HT, TH} = 3 outcomes out of 4, so P(at least one H) = 3/4.',
          topic: 'Two-Coin Probability Events'
        },
        {
          text: `Match the Statistical Formula for Grouped Frequency Distribution:`,
          options: [
            'Direct Method Mean (x̄) = Σfᵢxᵢ / Σfᵢ | Assumed Mean Method (x̄) = A + (Σfᵢdᵢ / Σfᵢ)',
            'Direct Mean = Σfᵢ + Σxᵢ | Assumed Mean = A × Σfᵢ',
            'Mean is always equal to the highest frequency',
            'Mean cannot be calculated for grouped data'
          ],
          correctIndex: 0,
          explanation: 'In the Direct Method, Mean x̄ = Σfᵢxᵢ / N; in the Assumed Mean Method, x̄ = A + d̄ where dᵢ = xᵢ - A.',
          topic: 'Mean by Direct & Assumed Mean Methods'
        },
        {
          text: `For what value of k are the roots of the quadratic equation kx² - 12x + 9 = 0 real and equal?`,
          options: ['k = 4', 'k = 3', 'k = 9', 'k = 12'],
          correctIndex: 0,
          explanation: 'For real and equal roots, Δ = b² - 4ac = 0 ⇒ (-12)² - 4(k)(9) = 0 ⇒ 144 - 36k = 0 ⇒ 36k = 144 ⇒ k = 4.',
          topic: 'Parameter Determination using Discriminant'
        },
        {
          text: `Identify the INCORRECT statement regarding Graphical Representation of Statistical Data:`,
          options: [
            'In a Histogram, the classes on the X-axis must be continuous (exclusive class intervals) with no gaps between adjacent bars',
            'A Frequency Polygon can be drawn either by connecting midpoints of histogram tops or directly using class marks (xᵢ) and frequencies (fᵢ)',
            'The sum of all central angles in a Pie Diagram is always 360°',
            'In a Histogram, huge random gaps must be left between every consecutive class interval'
          ],
          correctIndex: 3,
          explanation: 'A histogram represents continuous grouped frequency data with contiguous rectangles touching each other without gaps.',
          topic: 'Histogram & Frequency Polygon'
        },
        {
          text: `Complete the step: Given symmetric simultaneous equations 15x + 17y = 21 and 17x + 15y = 11, adding both equations and dividing by 32 directly yields x + y = _____.`,
          options: ['1 (since 32x + 32y = 32 ⇒ x + y = 1)', '2', '32', '0'],
          correctIndex: 0,
          explanation: 'Adding (15x + 17y = 21) and (17x + 15y = 11) gives 32x + 32y = 32; dividing by 32 gives x + y = 1.',
          topic: 'Special Symmetric Simultaneous Equations'
        },
        {
          text: `Smt. Deshmukh purchased 100 shares of Face Value ₹10 each when the Market Value was ₹50 per share. She paid 0.2% brokerage on the purchase. What was her total investment (excluding GST on brokerage)?`,
          options: ['₹5,010 (Cost of 100 shares = ₹5,000 + Brokerage 0.2% of 5000 = ₹10)', '₹1,000', '₹5,100', '₹4,990'],
          correctIndex: 0,
          explanation: 'Sum invested in shares = 100 × ₹50 = ₹5,000. Brokerage = 0.2% of ₹5,000 = ₹10. Total cost = ₹5,000 + ₹10 = ₹5,010.',
          topic: 'Brokerage & Share Investment'
        },
        {
          text: `Look at the auditorium icon 🎭. In an auditorium, there are 20 seats in the first row, 22 seats in the second row, 24 seats in the third row, and so on for 15 rows. How many seats are there in the 15th row?`,
          options: ['48 seats', '50 seats', '44 seats', '35 seats'],
          correctIndex: 0,
          diagramEmoji: '🎭',
          explanation: 'The seats per row form an A.P. with a = 20, d = 2, n = 15. t₁₅ = 20 + (15 - 1) × 2 = 20 + 28 = 48 seats.',
          topic: 'Applications of A.P.'
        },
        {
          text: `When two fair six-sided dice are rolled simultaneously, n(S) = 36. What is the probability that the SUM of the numbers on the upper faces is 10?`,
          options: ['1/12 (Favourable outcomes: {(4,6), (5,5), (6,4)} = 3/36 = 1/12)', '1/6', '1/9', '1/36'],
          correctIndex: 0,
          explanation: 'Pairs giving a sum of 10 are (4,6), (5,5), and (6,4), so n(A) = 3. Probability P(A) = 3/36 = 1/12.',
          topic: 'Two-Dice Probability'
        }
      ];
    }

    // Level 4: Expert Challenge
    return [
      {
        text: `If α and β are the roots of the quadratic equation 2x² - 4x - 3 = 0, find the value of α² + β²:`,
        options: ['7', '4', '10', '5'],
        correctIndex: 0,
        explanation: 'Here a = 2, b = -4, c = -3. Sum α + β = -(-4)/2 = 2, and Product αβ = -3/2. Now α² + β² = (α + β)² - 2αβ = (2)² - 2(-3/2) = 4 + 3 = 7.',
        topic: 'Symmetric Functions of Quadratic Roots'
      },
      {
        text: `Fill in the blank: The sum of the first n terms of an A.P. is given by Sₙ = 3n² + 2n. Then its first term (t₁ = S₁) is 5, and its second term (t₂ = S₂ - S₁) is _____.`,
        options: ['11 (since S₂ = 3(4) + 4 = 16, and t₂ = S₂ - S₁ = 16 - 5 = 11)', '16', '8', '6'],
        correctIndex: 0,
        explanation: 'S₁ = 3(1)² + 2(1) = 5 = t₁. S₂ = 3(2)² + 2(2) = 12 + 4 = 16. Therefore t₂ = S₂ - S₁ = 16 - 5 = 11.',
        topic: 'Finding Terms from Sₙ Formula'
      },
      {
        text: `True or False: For a system of two linear equations a₁x + b₁y = c₁ and a₂x + b₂y = c₂, if a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the two lines are parallel and the system has NO SOLUTION (inconsistent).`,
        options: ['True', 'False', 'It has infinitely many solutions', 'The lines intersect at the origin'],
        correctIndex: 0,
        explanation: 'When a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the determinant D = 0 while Dₓ or Dᵧ ≠ 0, representing parallel lines that never intersect.',
        topic: 'Consistency of Linear Systems'
      },
      {
        text: `Match the Measure of Central Tendency for Grouped Data with its exact formula:`,
        options: [
          'Median = L + [(N/2 - cf) / f] × h | Mode = L + [(f₁ - f₀) / (2f₁ - f₀ - f₂)] × h',
          'Median = L × f | Mode = N / 2',
          'Median = f₁ - f₀ | Mode = cf / N',
          'Both formulas are identical'
        ],
        correctIndex: 0,
        explanation: 'In grouped frequency distributions, Median uses cumulative frequency (cf) of the preceding class, and Mode uses modal class frequency (f₁) and adjacent frequencies (f₀, f₂).',
        topic: 'Median and Mode of Grouped Data'
      },
      {
        text: `A boat travels 16 km upstream and 24 km downstream in 6 hours. If the speed of the boat in still water is 8 km/h and the speed of the water current is 4 km/h, verify the upstream and downstream speeds:`,
        options: [
          'Upstream speed = 8 - 4 = 4 km/h (time = 16/4 = 4 h) and Downstream speed = 8 + 4 = 12 km/h (time = 24/12 = 2 h); Total = 6 hours',
          'Upstream speed = 12 km/h and Downstream speed = 4 km/h',
          'Both speeds are 8 km/h',
          'Upstream speed is 32 km/h'
        ],
        correctIndex: 0,
        explanation: 'Upstream effective speed is (u - v) = 4 km/h and downstream effective speed is (u + v) = 12 km/h; 16/4 + 24/12 = 4 + 2 = 6 hours.',
        topic: 'Word Problems on Equations Reducible to Linear Form'
      },
      {
        text: `Identify the INCORRECT statement about Mutual Funds (MF) and Systematic Investment Plans (SIP):`,
        options: [
          'A Mutual Fund pools money from many investors and invests in a diversified portfolio of stocks, bonds, or securities managed by an AMC',
          'Units of a Mutual Fund are allotted based on the Net Asset Value (NAV) of the scheme',
          'SIP (Systematic Investment Plan) allows disciplined periodic investments (e.g., monthly) in a mutual fund',
          'Mutual Fund investments are completely free from market risks and guarantee 500% profit every single day'
        ],
        correctIndex: 3,
        explanation: 'Mutual fund investments are subject to market risks, and returns depend on the market performance of underlying assets (NAV).',
        topic: 'Mutual Funds, NAV & SIP'
      },
      {
        text: `Complete the calculation: In an A.P., the 10th term is 46 and the sum of the 5th and 7th terms is 52. Then the first term (a) and common difference (d) are _____.`,
        options: ['a = 1, d = 5', 'a = 5, d = 1', 'a = 2, d = 4', 'a = 6, d = 4'],
        correctIndex: 0,
        explanation: 't₁₀ = a + 9d = 46. Also t₅ + t₇ = (a + 4d) + (a + 6d) = 2a + 10d = 52 ⇒ a + 5d = 26. Subtracting gives 4d = 20 ⇒ d = 5, and a = 26 - 25 = 1.',
        topic: 'Advanced Arithmetic Progression Problems'
      },
      {
        text: `The product of Pragati's age 2 years ago and 3 years hence is 84. What is her present age?`,
        options: ['9 years', '12 years', '7 years', '10 years'],
        correctIndex: 0,
        explanation: 'Let present age be x. Then (x - 2)(x + 3) = 84 ⇒ x² + x - 6 = 84 ⇒ x² + x - 90 = 0 ⇒ (x + 10)(x - 9) = 0. Since age > 0, x = 9 years.',
        topic: 'Quadratic Word Problems'
      },
      {
        text: `Look at the calendar icon 📅. What is the probability that a LEAP YEAR (366 days = 52 full weeks + 2 extra days) selected at random will contain 53 Sundays?`,
          options: ['2/7', '1/7', '5/7', '3/7'],
          correctIndex: 0,
          diagramEmoji: '📅',
          explanation: 'A leap year has 52 complete weeks (52 Sundays) plus 2 consecutive extra days: {(Sun,Mon), (Mon,Tue), (Tue,Wed), (Wed,Thu), (Thu,Fri), (Fri,Sat), (Sat,Sun)}. 2 out of 7 pairs contain Sunday, so P = 2/7.',
          topic: 'Challenging Probability Problems'
        },
      {
        text: `For a grouped frequency distribution, the Mode is found using Mode = L + [(f₁ - f₀) / (2f₁ - f₀ - f₂)] × h. If L = 40, f₁ = 20, f₀ = 12, f₂ = 10, and class width h = 10, calculate the Mode:`,
        options: ['44.44 (40 + [8 / 18] × 10 = 40 + 4.44 = 44.44)', '48.0', '42.5', '45.0'],
        correctIndex: 0,
        explanation: 'Mode = 40 + [(20 - 12) / (40 - 12 - 10)] × 10 = 40 + (8 / 18) × 10 = 40 + 4.44 = 44.44.',
        topic: 'Modal Class Calculation'
      }
    ];
  }

  // ============================================================================
  // 24. MATHEMATICS – GEOMETRY — 40 Unique Questions (10 per Level, Class 10 SSC)
  // ============================================================================
  if (subject === 'Mathematics – Geometry') {
    if (level === 1) {
      return [
        {
          text: `If two triangles are similar (ΔABC ~ ΔPQR) and the ratio of their corresponding sides is 3 : 5, what is the ratio of their areas A(ΔABC) : A(ΔPQR)?`,
          options: ['9 : 25', '3 : 5', '6 : 10', '27 : 125'],
          correctIndex: 0,
          explanation: 'By the Theorem of Areas of Similar Triangles, the ratio of the areas of two similar triangles is equal to the ratio of the squares of their corresponding sides: 3² : 5² = 9 : 25.',
          topic: 'Similarity of Triangles'
        },
        {
          text: `Fill in the blank: By the Pythagoras Theorem, in a right-angled triangle, the square of the _____ is equal to the sum of the squares of the other two perpendicular sides.`,
          options: ['Hypotenuse', 'Median', 'Altitude', 'Angle Bisector'],
          correctIndex: 0,
          explanation: 'In right-angled ΔABC with ∠B = 90°, AC² = AB² + BC², where AC is the hypotenuse.',
          topic: 'Pythagoras Theorem'
        },
        {
          text: `True or False: A tangent at any point of a circle is always PERPENDICULAR (90°) to the radius through the point of contact.`,
          options: ['True', 'False', 'It is parallel to the radius', 'It makes a 45° angle'],
          correctIndex: 0,
          explanation: 'By the Tangent Theorem, a line tangent to a circle is perpendicular to the radius drawn to the point of contact.',
          topic: 'Circle & Tangents'
        },
        {
          text: `Which of the following triplets of numbers is a Pythagorean Triplet?`,
          options: ['(5, 12, 13)', '(4, 5, 6)', '(2, 3, 4)', '(7, 8, 9)'],
          correctIndex: 0,
          explanation: '5² + 12² = 25 + 144 = 169 = 13², so (5, 12, 13) is a Pythagorean triplet.',
          topic: 'Pythagorean Triplets'
        },
        {
          text: `In Coordinate Geometry, what are the coordinates of the Origin (O) where the X-axis and Y-axis intersect, and what is the distance of point P(3, 4) from the Origin?`,
          options: [
            'Origin is (0, 0) and distance OP = 5 units [√(3² + 4²) = √25 = 5]',
            'Origin is (1, 1) and distance OP = 7 units',
            'Origin is (0, 0) and distance OP = 12 units',
            'Origin is (0, 0) and distance OP = 25 units'
          ],
          correctIndex: 0,
          explanation: 'Distance of P(x, y) from the origin (0, 0) is √(x² + y²) = √(9 + 16) = √25 = 5 units.',
          topic: 'Coordinate Geometry – Distance Formula'
        },
        {
          text: `In Trigonometry, what is the fundamental Pythagorean identity relating sin θ and cos θ?`,
          options: ['sin²θ + cos²θ = 1', 'sin²θ - cos²θ = 1', 'sin θ × cos θ = 1', 'sin θ + cos θ = 0'],
          correctIndex: 0,
          explanation: 'For any angle θ, sin²θ + cos²θ = 1 is the fundamental trigonometric identity.',
          topic: 'Trigonometric Identities'
        },
        {
          text: `Complete the statement: The maximum number of tangents that can be drawn to a circle from an EXTERNAL point is _____.`,
          options: ['2 (and their tangent segments are equal in length)', '1', '0', '4'],
          correctIndex: 0,
          explanation: 'From any point outside a circle, exactly 2 tangents can be drawn to the circle, and the lengths of the two tangent segments are equal.',
          topic: 'Tangent Segment Theorem'
        },
        {
          text: `Find the length of the diagonal of a square whose side is 10 cm:`,
          options: ['10√2 cm', '20 cm', '10√3 cm', '5√2 cm'],
          correctIndex: 0,
          explanation: 'By the 45°–45°–90° triangle theorem, the diagonal of a square is √2 × side = 10√2 cm.',
          topic: '45°–45°–90° Theorem'
        },
        {
          text: `Look at the cube icon 🧊. If the edge (side 'l') of a cube is 5 cm, what is its Volume (V = l³) and Total Surface Area (TSA = 6l²)?`,
          options: [
            'Volume = 125 cm³ and Total Surface Area = 150 cm²',
            'Volume = 25 cm³ and Total Surface Area = 100 cm²',
            'Volume = 150 cm³ and Total Surface Area = 125 cm²',
            'Volume = 625 cm³ and Total Surface Area = 30 cm²'
          ],
          correctIndex: 0,
          diagramEmoji: '🧊',
          explanation: 'For l = 5 cm: Volume = 5³ = 125 cm³, and Total Surface Area = 6 × 5² = 6 × 25 = 150 cm².',
          topic: 'Mensuration – Cube'
        },
        {
          text: `What is the exact value of tan 45° and sin 30°?`,
          options: ['tan 45° = 1 and sin 30° = 1/2', 'tan 45° = 0 and sin 30° = 1', 'tan 45° = √3 and sin 30° = √3/2', 'tan 45° = 1/2 and sin 30° = 1'],
          correctIndex: 0,
          explanation: 'Standard trigonometric values: tan 45° = 1 and sin 30° = 1/2 (cos 60° = 1/2).',
          topic: 'Trigonometric Ratios of Standard Angles'
        }
      ];
    }

    if (level === 2) {
      return [
        {
          text: `In ΔABC, a line DE is drawn parallel to side BC intersecting AB at D and AC at E. If AD = 3 cm, DB = 6 cm, and AE = 4 cm, find EC using the Basic Proportionality Theorem (Thales' Theorem):`,
          options: ['8 cm', '6 cm', '2 cm', '12 cm'],
          correctIndex: 0,
          explanation: 'By BPT, AD / DB = AE / EC ⇒ 3 / 6 = 4 / EC ⇒ 1 / 2 = 4 / EC ⇒ EC = 8 cm.',
          topic: 'Basic Proportionality Theorem (BPT)'
        },
        {
          text: `Fill in the blank: In a right-angled triangle with angles 30°–60°–90°, the length of the side opposite to the 30° angle is _____ of the hypotenuse, and the side opposite to 60° is (√3/2) of the hypotenuse.`,
          options: ['Half (1/2)', 'Equal (1)', 'Double (2)', 'One-fourth (1/4)'],
          correctIndex: 0,
          explanation: 'By the 30°–60°–90° Triangle Theorem, side opposite 30° = ½ × hypotenuse, and side opposite 60° = (√3/2) × hypotenuse.',
          topic: '30°–60°–90° Triangle Theorem'
        },
        {
          text: `True or False: In a Cyclic Quadrilateral (all four vertices lie on a circle), the opposite angles are SUPPLEMENTARY (their sum is 180°).`,
          options: ['True', 'False', 'Their sum is 90°', 'Opposite angles are always 45°'],
          correctIndex: 0,
          explanation: 'By the Cyclic Quadrilateral Theorem, ∠A + ∠C = 180° and ∠B + ∠D = 180°.',
          topic: 'Cyclic Quadrilateral Theorem'
        },
        {
          text: `Match the Coordinate Geometry Formula for points A(x₁, y₁) and B(x₂, y₂):`,
          options: [
            'Midpoint Formula → ((x₁+x₂)/2, (y₁+y₂)/2) | Slope of Line AB → (y₂ - y₁)/(x₂ - x₁) | Centroid of Δ → ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3)',
            'Midpoint → (x₁-x₂, y₁-y₂) | Slope → x₁ + y₁',
            'Centroid divides median in 1:1 ratio',
            'Slope of X-axis is infinity'
          ],
          correctIndex: 0,
          explanation: 'These are the three core formulas of Coordinate Geometry for midpoint, slope of a line, and centroid of a triangle.',
          topic: 'Midpoint, Centroid & Slope Formulas'
        },
        {
          text: `Two circles of radii 5.5 cm and 3.3 cm touch each other EXTERNALLY. What is the distance between their centres? And what if they touch INTERNALLY?`,
          options: [
            'Externally: 5.5 + 3.3 = 8.8 cm | Internally: 5.5 - 3.3 = 2.2 cm',
            'Externally: 2.2 cm | Internally: 8.8 cm',
            'Both distances are 5.5 cm',
            'Externally: 18.15 cm'
          ],
          correctIndex: 0,
          explanation: 'By the Theorem of Touching Circles, the point of contact lies on the line joining the centres; distance = r₁ + r₂ (external) and |r₁ - r₂| (internal).',
          topic: 'Theorem of Touching Circles'
        },
        {
          text: `Identify the INCORRECT trigonometric identity among the following:`,
          options: [
            '1 + tan²θ = sec²θ',
            '1 + cot²θ = cosec²θ',
            'tan θ = sin θ / cos θ and cot θ = 1 / tan θ',
            'sin θ + cos θ = 1 for every angle θ'
          ],
          correctIndex: 3,
          explanation: 'sin²θ + cos²θ = 1 is true for all θ, whereas sin θ + cos θ = 1 is NOT an identity (e.g., at θ = 45°, sin 45° + cos 45° = √2 ≠ 1).',
          topic: 'Fundamental Trigonometric Identities'
        },
        {
          text: `Complete the theorem: The measure of an Inscribed Angle subtended by an arc at a point on the circle is _____ the measure of its intercepted arc (or central angle).`,
          options: ['Half (1/2)', 'Twice (2)', 'Equal to (1)', 'One-third (1/3)'],
          correctIndex: 0,
          explanation: 'By the Inscribed Angle Theorem, m(∠ABC) = ½ m(arc AXC), and an angle inscribed in a semicircle is a right angle (90°).',
          topic: 'Inscribed Angle Theorem'
        },
        {
          text: `Find the curved surface area (CSA = 2πrh) and volume (V = πr²h) of a right circular cylinder with radius r = 7 cm and height h = 10 cm (Take π = 22/7):`,
          options: [
            'CSA = 440 cm² and Volume = 1,540 cm³',
            'CSA = 220 cm² and Volume = 770 cm³',
            'CSA = 154 cm² and Volume = 440 cm³',
            'CSA = 880 cm² and Volume = 3,080 cm³'
          ],
          correctIndex: 0,
          explanation: 'CSA = 2 × (22/7) × 7 × 10 = 440 cm². Volume = (22/7) × 7 × 7 × 10 = 154 × 10 = 1,540 cm³.',
          topic: 'Mensuration – Cylinder'
        },
        {
          text: `Look at the lighthouse icon 🗼. From the top of a lighthouse 60 m high, the angle of depression of a ship at sea is 45°. How far is the ship from the base of the lighthouse?`,
          options: ['60 metres', '30 metres', '60√3 metres', '120 metres'],
          correctIndex: 0,
          diagramEmoji: '🗼',
          explanation: 'Angle of elevation = Angle of depression = 45°. Since tan 45° = Height / Distance ⇒ 1 = 60 / Distance ⇒ Distance = 60 metres.',
          topic: 'Heights & Distances (Angles of Elevation/Depression)'
        },
        {
          text: `In Geometric Constructions, if ΔABC ~ ΔLMN and the scale factor is AB / LM = 5 / 3, which triangle is larger when constructing the similar triangle?`,
          options: [
            'ΔABC is larger than ΔLMN (since AB is 5 parts and LM is 3 parts)',
            'ΔLMN is larger than ΔABC',
            'Both triangles are congruent',
            'Construction is impossible'
          ],
          correctIndex: 0,
          explanation: 'Since AB / LM = 5 / 3 > 1, each side of ΔABC is 5/3 times the corresponding side of ΔLMN.',
          topic: 'Geometric Constructions – Similar Triangles'
        }
      ];
    }

    if (level === 3) {
      return [
        {
          text: `In right-angled ΔABC, ∠B = 90° and seg BD ⊥ hypotenuse AC. If AD = 4 cm and DC = 9 cm, find the length of altitude BD using the Theorem of Geometric Mean:`,
          options: ['6 cm (since BD² = AD × DC = 4 × 9 = 36 ⇒ BD = 6 cm)', '13 cm', '5 cm', '36 cm'],
          correctIndex: 0,
          explanation: 'By the Geometric Mean Theorem in a right-angled triangle, BD² = AD × DC = 4 × 9 = 36, so BD = 6 cm.',
          topic: 'Theorem of Geometric Mean'
        },
        {
          text: `Fill in the blank: For any right circular cone with base radius 'r' and perpendicular height 'h', the slant height 'l' is calculated by the formula l = _____.`,
          options: ['√(r² + h²)', 'r + h', 'r² + h²', '√(h² - r²)'],
          correctIndex: 0,
          explanation: 'The radius r, height h, and slant height l form a right-angled triangle, so l² = r² + h² ⇒ l = √(r² + h²).',
          topic: 'Mensuration – Cone & Slant Height'
        },
        {
          text: `True or False: By the Angle Bisector Theorem of a triangle, the bisector of an angle of a triangle divides the side opposite to the angle in the ratio of the remaining two sides.`,
          options: ['True', 'False', 'It always bisects the opposite side into equal halves', 'It is perpendicular to all three sides'],
          correctIndex: 0,
          explanation: 'In ΔABC, if ray BD bisects ∠ABC meeting AC at D, then AD / DC = AB / BC.',
          topic: 'Angle Bisector Property'
        },
        {
          text: `Match the Circle Chord / Secant / Tangent Theorem with its mathematical relation:`,
          options: [
            'Internal Division of Chords → AE × EB = CE × ED | Tangent-Secant Segment Theorem → PT² = PA × PB',
            'Internal Chords → AE + EB = CE + ED | Tangent-Secant → PT = PA + PB',
            'All segments inside a circle have length zero',
            'Tangents always pass through the centre'
          ],
          correctIndex: 0,
          explanation: 'When chords AB and CD intersect at E, AE·EB = CE·ED; when tangent PT and secant PAB are drawn from external point P, PT² = PA·PB.',
          topic: 'Tangent-Secant & Intersecting Chords Theorems'
        },
        {
          text: `What is the slope (m) of a line that makes an angle of inclination θ = 60° with the positive direction of the X-axis?`,
          options: ['√3 (since m = tan 60° = √3)', '1/√3', '1', '0'],
          correctIndex: 0,
          explanation: 'The slope of a line with inclination angle θ is m = tan θ = tan 60° = √3.',
          topic: 'Slope & Inclination of a Line'
        },
        {
          text: `Identify the INCORRECT formula in 3D Mensuration:`,
          options: [
            'Surface Area of a Sphere = 4πr² and Volume of a Sphere = (4/3)πr³',
            'Curved Surface Area of a Hemisphere = 2πr² and Total Surface Area of a Solid Hemisphere = 3πr²',
            'Curved Surface Area of a Cone = πrl and Volume of a Cone = (1/3)πr²h',
            'Volume of a Cone is 3 times the Volume of a Cylinder of the same radius and height'
          ],
          correctIndex: 3,
          explanation: 'The volume of a cone [(1/3)πr²h] is one-third (1/3) the volume of a cylinder (πr²h) of the same radius and height.',
          topic: 'Sphere, Hemisphere & Cone Formulas'
        },
        {
          text: `Complete the calculation: If sin θ = 3/5 (where θ is an acute angle), then cos θ = 4/5 and tan θ = _____.`,
          options: ['3/4', '4/3', '5/3', '5/4'],
          correctIndex: 0,
          explanation: 'Since cos θ = √(1 - sin²θ) = √(1 - 9/25) = 4/5, tan θ = sin θ / cos θ = (3/5) / (4/5) = 3/4.',
          topic: 'Trigonometric Ratio Calculations'
        },
        {
          text: `Find the coordinates of point P(x, y) which divides the line segment joining A(-1, 7) and B(4, -3) internally in the ratio m : n = 2 : 3 using the Section Formula:`,
          options: ['P(1, 3)', 'P(2, 2)', 'P(3, 1)', 'P(0, 5)'],
          correctIndex: 0,
          explanation: 'By Section Formula: x = (2×4 + 3×(-1))/(2+3) = (8-3)/5 = 1; y = (2×(-3) + 3×7)/(2+3) = (-6+21)/5 = 15/5 = 3. So P(1, 3).',
          topic: 'Section Formula in Coordinate Geometry'
        },
        {
          text: `Look at the pizza slice / sector icon 🍕. For a circle of radius r = 21 cm, find the length of an arc (l) and area of the sector (A) subtending a central angle θ = 60° (Take π = 22/7):`,
          options: [
            'Length of arc l = 22 cm and Area of sector A = 231 cm²',
            'Length of arc l = 44 cm and Area of sector A = 462 cm²',
            'Length of arc l = 11 cm and Area of sector A = 154 cm²',
            'Length of arc l = 21 cm and Area of sector A = 100 cm²'
          ],
          correctIndex: 0,
          diagramEmoji: '🍕',
          explanation: 'Arc length l = (θ/360) × 2πr = (1/6) × 2 × (22/7) × 21 = 22 cm. Sector Area A = ½ × l × r = ½ × 22 × 21 = 231 cm².',
          topic: 'Length of Arc & Area of Sector'
        },
        {
          text: `In ΔABC, point M is the midpoint of side BC. If AB² + AC² = 290 cm² and AM = 8 cm, find the length of side BC using Apollonius' Theorem:`,
          options: ['18 cm (since BM = 9 cm, so BC = 2 × 9 = 18 cm)', '9 cm', '16 cm', '12 cm'],
          correctIndex: 0,
          explanation: 'By Apollonius’ Theorem: AB² + AC² = 2AM² + 2BM² ⇒ 290 = 2(64) + 2BM² ⇒ 290 - 128 = 2BM² ⇒ 2BM² = 162 ⇒ BM² = 81 ⇒ BM = 9 cm. Thus BC = 2 × 9 = 18 cm.',
          topic: 'Apollonius’ Theorem'
        }
      ];
    }

    // Level 4: Expert Challenge
    return [
      {
        text: `A frustum of a cone (like a bucket) has circular top radius r₁ = 14 cm, bottom radius r₂ = 7 cm, and perpendicular height h = 24 cm. What is its slant height l = √[h² + (r₁ - r₂)²]?`,
        options: ['25 cm [since l = √(24² + 7²) = √(576 + 49) = √625 = 25 cm]', '31 cm', '24 cm', '20 cm'],
        correctIndex: 0,
        explanation: 'For a frustum of a cone, slant height l = √[h² + (r₁ - r₂)²] = √[24² + (14 - 7)²] = √(576 + 49) = √625 = 25 cm.',
        topic: 'Frustum of a Cone'
      },
      {
        text: `Fill in the blank: If sec θ + tan θ = 5, then using the identity sec²θ - tan²θ = 1, the value of (sec θ - tan θ) is _____ and the value of sec θ is _____.`,
        options: [
          'sec θ - tan θ = 1/5 (0.2) and sec θ = 13/5 (2.6)',
          'sec θ - tan θ = 5 and sec θ = 10',
          'sec θ - tan θ = -5 and sec θ = 0',
          'sec θ - tan θ = 1 and sec θ = 3'
        ],
        correctIndex: 0,
        explanation: 'Since (sec θ + tan θ)(sec θ - tan θ) = 1, sec θ - tan θ = 1/5 = 0.2. Adding the two equations gives 2 sec θ = 5 + 0.2 = 5.2 = 26/5 ⇒ sec θ = 13/5 = 2.6.',
        topic: 'Advanced Trigonometric Identities'
      },
      {
        text: `True or False: Three points A(x₁, y₁), B(x₂, y₂), and C(x₃, y₃) in a Cartesian plane are COLLINEAR if and only if the slope of line AB is equal to the slope of line BC.`,
        options: ['True', 'False', 'Collinear points form a right-angled triangle', 'Slopes of collinear segments are perpendicular'],
        correctIndex: 0,
        explanation: 'If Slope(AB) = Slope(BC) and B is a common point, then A, B, and C lie on the exact same straight line (collinear).',
        topic: 'Collinearity of Points using Slope'
      },
      {
        text: `In circle geometry, from an external point P, a tangent PT of length 12 cm is drawn to a circle, and a secant PAB intersects the circle at A and B such that PA = 8 cm. Find the length of chord AB:`,
        options: ['10 cm (since PT² = PA × PB ⇒ 144 = 8 × PB ⇒ PB = 18 cm; so chord AB = PB - PA = 18 - 8 = 10 cm)', '18 cm', '16 cm', '6 cm'],
        correctIndex: 0,
        explanation: 'By Tangent-Secant Segment Theorem, PT² = PA × PB ⇒ 12² = 8 × PB ⇒ 144 / 8 = PB = 18 cm. Since P–A–B, chord AB = PB - PA = 18 - 8 = 10 cm.',
        topic: 'Tangent-Secant Segment Application'
      },
      {
        text: `A metallic sphere of radius 6 cm is melted and recast into a solid cylinder of radius 4 cm. Using conservation of volume, find the height (h) of the cylinder:`,
        options: ['18 cm [since (4/3)π(6)³ = π(4)²h ⇒ 288π = 16πh ⇒ h = 288 / 16 = 18 cm]', '12 cm', '24 cm', '9 cm'],
        correctIndex: 0,
        explanation: 'Volume of sphere = Volume of cylinder ⇒ (4/3)πR³ = πr²h ⇒ (4/3) × 216 = 16 × h ⇒ 288 = 16h ⇒ h = 18 cm.',
        topic: 'Conversion of 3D Solids'
      },
      {
        text: `Identify the INCORRECT statement regarding Tangents and Circles:`,
        options: [
          'No tangent can be drawn to a circle from a point lying strictly INSIDE the circle',
          'Exactly one tangent can be drawn at a point lying ON the circle',
          'Two tangents can be drawn from a point lying OUTSIDE the circle',
          'Four tangents can be drawn to a single circle from its own centre'
        ],
        correctIndex: 3,
        explanation: 'Every line passing through the centre of a circle intersects the circle at two points (a secant/diameter), so 0 tangents can be drawn from inside a circle.',
        topic: 'Number of Tangents by Point Position'
      },
      {
        text: `Complete the calculation: In trapezium ABCD, side AB || side DC, and diagonals AC and BD intersect at point O. If AB = 20 cm, DC = 6 cm, and OB = 15 cm, then OD = _____.`,
        options: ['4.5 cm (since ΔAOB ~ ΔCOD by AA test ⇒ AB / DC = OB / OD ⇒ 20 / 6 = 15 / OD ⇒ OD = 90 / 20 = 4.5 cm)', '5 cm', '6 cm', '9 cm'],
        correctIndex: 0,
        explanation: 'By alternate angles, ΔAOB ~ ΔCOD, so AB/DC = OB/OD ⇒ 20/6 = 15/OD ⇒ OD = (15 × 6)/20 = 4.5 cm.',
        topic: 'Similarity in Trapeziums'
      },
      {
        text: `A storm broke a tree of total original height 18 m such that the broken upper part bent without detaching and its top touched the ground making an angle of 30° with the horizontal ground. At what height from the ground did the tree break?`,
        options: ['6 metres (Vertical stump = 6 m and slanting broken part = 12 m; since sin 30° = 6/12 = 1/2 and 6 + 12 = 18 m)', '9 metres', '12 metres', '4.5 metres'],
        correctIndex: 0,
        explanation: 'Let stump height be h, so broken hypotenuse part is (18 - h). Since sin 30° = h / (18 - h) = 1/2 ⇒ 2h = 18 - h ⇒ 3h = 18 ⇒ h = 6 metres.',
        topic: 'Trigonometric Word Problems'
      },
      {
        text: `Look at the triangle centroid icon 📐. If G(-4, -7) is the centroid of ΔABC where A(-14, -19) and B(3, 5), find the coordinates of the third vertex C(x₃, y₃):`,
        options: ['C(-1, -7)', 'C(1, 7)', 'C(-3, -5)', 'C(0, -7)'],
        correctIndex: 0,
        diagramEmoji: '📐',
        explanation: 'By Centroid Formula: -4 = (-14 + 3 + x₃)/3 ⇒ -12 = -11 + x₃ ⇒ x₃ = -1; and -7 = (-19 + 5 + y₃)/3 ⇒ -21 = -14 + y₃ ⇒ y₃ = -7. So C(-1, -7).',
        topic: 'Centroid Coordinate Problem'
      },
      {
        text: `Assertion (A): Any angle inscribed in a semicircle is always a right angle (90°).\nReason (R): A semicircle measures 180°, and by the Inscribed Angle Theorem, the measure of an inscribed angle is half the measure of its intercepted arc (½ × 180° = 90°).`,
        options: [
          'Both (A) and (R) are true, and (R) is the correct explanation of (A).',
          'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).',
          '(A) is true, but (R) is false.',
          '(A) is false, but (R) is true.'
        ],
        correctIndex: 0,
        explanation: 'An angle inscribed in a semicircle intercepts a 180° semicircular arc, making the inscribed angle ½ × 180° = 90°.',
        topic: 'Angle Inscribed in a Semicircle'
      }
    ];
  }

  return null;
}
