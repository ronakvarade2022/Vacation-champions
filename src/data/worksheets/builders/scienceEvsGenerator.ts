import { ClassLevel, EducationBoard, SubjectName } from '../../../types';
import { CompactWorksheetQuestionSpec, WorksheetItemFormat } from '../types';
import { getClassNumber, getStageBand, getBoardSyllabusLabel } from './chapterCatalog';

type SciQ = {
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

function rotateSciQ(item: SciQ, shift: number, format: WorksheetItemFormat, c: string): CompactWorksheetQuestionSpec {
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

const EARLY_SCI_EVS: SciQ[] = [
  { q: 'Which sense organ helps us hear birds singing in the morning?', o: ['Nose', 'Eyes', 'Ears', 'Skin'], a: 2, e: 'Ears are the sense organs for hearing sounds.' },
  { q: 'Which part of a plant grows underground and absorbs water from the soil?', o: ['Leaf', 'Root', 'Flower', 'Fruit'], a: 1, e: 'Roots anchor the plant and absorb water and minerals from soil.' },
  { q: 'Identify the domestic farm animal that gives us milk:', o: ['Tiger', 'Cow', 'Eagle', 'Crocodile'], a: 1, e: 'A cow is a domestic mammal that gives us milk.' },
  { q: 'What colour of a traffic light tells vehicles to STOP safely?', o: ['Green', 'Red', 'Blue', 'White'], a: 1, e: 'A red traffic signal means STOP.' },
  { q: 'Which of the following is a NON-LIVING thing?', o: ['Banyan tree', 'Sparrow', 'Wooden chair', 'Butterfly'], a: 2, e: 'A wooden chair does not grow, breathe, or need food.' },
  { q: 'Match animal homes: A bee lives in a ___.', o: ['kennel', 'beehive', 'burrow', 'nest'], a: 1, e: 'Bees build wax honeycombs inside a beehive.' },
  { q: 'Which helper stitches our school uniforms and clothes?', o: ['Cobbler', 'Tailor', 'Plumber', 'Postman'], a: 1, e: 'A tailor sews and stitches clothes.' },
  { q: 'Why should we always drink boiled or filtered clean water?', o: ['To look shiny', 'To stay safe from germs and stomach illness', 'To feel sleepy', 'Water has no taste'], a: 1, e: 'Clean water protects us from water-borne germs.' },
  { q: 'During which season do we wear raincoats and carry umbrellas?', o: ['Winter', 'Summer', 'Rainy (Monsoon)', 'Spring'], a: 2, e: 'Monsoon brings rain, so we use raincoats and umbrellas.' },
  { q: 'Which natural source gives Earth heat and light every day?', o: ['Moon', 'Sun', 'Streetlight', 'Candle'], a: 1, e: 'The Sun is our star providing daylight and warmth.' },
  { q: 'True or False: Washing hands with soap before eating helps keep germs away.', o: ['True', 'False', 'Only on Sundays', 'Not needed'], a: 0, e: 'Soap washes away bacteria and dirt before meals.' },
  { q: 'Odd one out among modes of transport: Bus, Train, Boat, Bicycle.', o: ['Bus', 'Train', 'Boat', 'Bicycle'], a: 2, e: 'A boat travels on water while the other three move on land.' },
];

const UPPER_SCI_EVS: SciQ[] = [
  { q: 'Which gas do green plants absorb from the air during photosynthesis to make food?', o: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Argon'], a: 1, e: 'Plants use carbon dioxide, water, and sunlight via chlorophyll to make glucose and release oxygen.' },
  { q: 'Deficiency of Vitamin C in the diet causes which disease?', o: ['Rickets', 'Scurvy (bleeding gums)', 'Goitre', 'Night blindness'], a: 1, e: 'Vitamin C (from amla/citrus fruits) prevents Scurvy.' },
  { q: 'Which simple machine is a bottle cap opener or seesaw an example of?', o: ['Inclined plane', 'Lever', 'Screw', 'Wedge'], a: 1, e: 'A seesaw and opener operate as levers around a fulcrum.' },
  { q: 'Which state of matter has a fixed volume but takes the shape of any container?', o: ['Solid', 'Liquid', 'Gas', 'Plasma'], a: 1, e: 'Liquids flow to take the container’s shape while keeping fixed volume.' },
  { q: 'In the water cycle, what is the change of water vapour back into tiny liquid droplets in clouds called?', o: ['Evaporation', 'Condensation', 'Freezing', 'Filtration'], a: 1, e: 'Cooling water vapour turns into liquid droplets by condensation.' },
  { q: 'Which organ pumps oxygen-rich blood to all parts of the human body?', o: ['Stomach', 'Heart', 'Kidney', 'Liver'], a: 1, e: 'The muscular heart pumps blood through arteries and veins.' },
  { q: 'Which separation method removes insoluble mud particles suspended in muddy water slowly settled at the bottom?', o: ['Sedimentation & Decantation', 'Magnetism', 'Winnowing', 'Sublimation'], a: 0, e: 'Heavy mud settles (sedimentation) and clear top water is poured off (decantation).' },
  { q: 'A frog can live both in water and on land. What type of animal is it?', o: ['Reptile', 'Amphibian', 'Mammal', 'Arthropod'], a: 1, e: 'Amphibians ("double life") live in both aquatic and terrestrial habitats.' },
  { q: 'Why do solar cookers have shiny mirror reflectors?', o: ['To freeze food', 'To concentrate sunlight heat onto the cooking vessel', 'To look decorative', 'To block UV rays'], a: 1, e: 'Reflectors focus solar radiation energy onto the darkened pot.' },
  { q: 'Identify the renewable source of energy that does NOT pollute air:', o: ['Coal', 'Diesel', 'Wind energy', 'Kerosene'], a: 2, e: 'Wind turbines generate clean renewable electricity.' },
  { q: 'Which instrument helps doctors listen to a patient’s heartbeat?', o: ['Thermometer', 'Barometer', 'Stethoscope', 'Microscope'], a: 2, e: 'A stethoscope amplifies heart and lung sounds.' },
  { q: 'Which dustbin colour is standard for wet biodegradable kitchen waste in waste segregation?', o: ['Green bin', 'Red bin', 'Blue bin', 'Black bin'], a: 0, e: 'Green bins collect biodegradable wet organic waste for composting.' },
];

const MIDDLE_PHYSICS_SCI: SciQ[] = [
  { q: 'What is the SI unit of Force?', o: ['Joule', 'Newton (N)', 'Pascal', 'Watt'], a: 1, e: 'Force is measured in Newtons (1 N = 1 kg·m/s²).' },
  { q: 'If a plane mirror is placed vertically, what type of image does it always form?', o: ['Real and inverted', 'Virtual, erect, laterally inverted, same size', 'Magnified and upside down', 'Diminished point image'], a: 1, e: 'Plane mirrors produce virtual, upright, same-sized, laterally inverted images.' },
  { q: 'Which mode of heat transfer requires NO material medium and warms Earth from the Sun?', o: ['Conduction', 'Convection', 'Radiation', 'Sublimation'], a: 2, e: 'Thermal radiation travels as electromagnetic waves even through vacuum.' },
  { q: 'In humans, what range of sound frequencies can a healthy ear normally hear?', o: ['1 Hz to 10 Hz', '20 Hz to 20,000 Hz (20 kHz)', '50,000 Hz to 1,00,000 Hz', 'Only above 25 kHz'], a: 1, e: 'The audible range for humans is 20 Hz to 20 kHz.' },
  { q: 'Why are railway tracks laid on wide concrete sleepers?', o: ['To reduce pressure by increasing contact area (P = F/A)', 'To increase pressure', 'To conduct lightning faster', 'To prevent rust only'], a: 0, e: 'Pressure = Force / Area; larger sleeper area spreads train weight so tracks do not sink.' },
  { q: 'Which safety device melts and breaks the circuit automatically during short-circuit overload?', o: ['Voltmeter', 'Electric fuse', 'Bar magnet', 'Rheostat'], a: 1, e: 'A fuse wire has a low melting point and protects appliances from excess current.' },
  { q: 'Which glass prism phenomenon splits white sunlight into seven VIBGYOR colours?', o: ['Reflection', 'Dispersion of light', 'Echo', 'Magnetisation'], a: 1, e: 'Different wavelengths refract at different angles inside a prism, causing dispersion.' },
  { q: 'What happens to atmospheric air pressure as you climb high up a mountain?', o: ['It increases sharply', 'It decreases because the air column above becomes shorter and thinner', 'It stays identical', 'It becomes zero at 1 km'], a: 1, e: 'Air density and overlying air weight drop with altitude, lowering pressure.' },
];

const MIDDLE_CHEMISTRY_SCI: SciQ[] = [
  { q: 'What colour does blue litmus paper turn when dipped in lemon juice (citric acid)?', o: ['Turns green', 'Turns red', 'Remains blue', 'Turns colourless'], a: 1, e: 'Acids turn blue litmus paper red.' },
  { q: 'Which gas turns freshly prepared lime water milky white?', o: ['Hydrogen', 'Carbon dioxide (CO₂)', 'Nitrogen', 'Oxygen'], a: 1, e: 'CO₂ reacts with calcium hydroxide to form insoluble white CaCO₃ precipitate.' },
  { q: 'Rusting of iron in moist air is an example of which type of change?', o: ['Physical reversible change', 'Chemical irreversible change (oxidation)', 'Sublimation', 'Distillation'], a: 1, e: 'Hydrated iron oxide is a new substance formed chemically.' },
  { q: 'Which non-metal is essential for combustion (burning) and respiration?', o: ['Argon', 'Oxygen', 'Neon', 'Helium'], a: 1, e: 'Oxygen supports combustion and cellular respiration.' },
  { q: 'Galvanisation prevents iron pipes from rusting by coating them with a thin layer of:', o: ['Sodium', 'Zinc', 'Mercury', 'Graphite'], a: 1, e: 'Zinc forms a protective sacrificial layer in galvanisation.' },
  { q: 'Which metal is a liquid at ordinary room temperature (~25°C)?', o: ['Copper', 'Mercury', 'Aluminium', 'Magnesium'], a: 1, e: 'Mercury (Hg) is the only metal that stays liquid at room temperature.' },
  { q: 'What is the chemical formula of common table salt (Sodium Chloride)?', o: ['KCl', 'NaCl', 'Na₂CO₃', 'CaCl₂'], a: 1, e: 'Sodium (Na⁺) and Chloride (Cl⁻) combine 1:1 as NaCl.' },
  { q: 'In a candle flame, which zone is the hottest and appears pale blue due to complete combustion?', o: ['Innermost dark wax-vapour zone', 'Middle yellow luminous zone', 'Outermost non-luminous blue zone', 'Base wick zone'], a: 2, e: 'The outermost zone gets plentiful oxygen for complete, hottest combustion.' },
];

const MIDDLE_BIOLOGY_SCI: SciQ[] = [
  { q: 'Which cell organelle is known as the "powerhouse of the cell" because it releases ATP energy?', o: ['Ribosome', 'Mitochondrion', 'Golgi body', 'Vacuole'], a: 1, e: 'Cellular respiration occurs in mitochondria to generate ATP.' },
  { q: 'Which plant vascular tissue transports water and dissolved minerals upward from roots to leaves?', o: ['Phloem', 'Xylem', 'Cambium', 'Stomata'], a: 1, e: 'Xylem conducts water upward; Phloem transports synthesised food.' },
  { q: 'Rhizobium bacteria living in pea/gram root nodules help crops by:', o: ['Causing root rot', 'Fixing atmospheric nitrogen into usable nitrates', 'Blocking photosynthesis', 'Consuming chlorophyll'], a: 1, e: 'Symbiotic Rhizobium enriches soil by nitrogen fixation.' },
  { q: 'Which blood cells carry oxygen using haemoglobin throughout our body?', o: ['White blood cells (WBC)', 'Red blood cells (RBC)', 'Platelets', 'Plasma proteins'], a: 1, e: 'Haemoglobin inside RBCs binds oxygen efficiently.' },
  { q: 'Which organelle is present in plant cells (providing rigid structure) but ABSENT in animal cells?', o: ['Nucleus', 'Cell wall & Chloroplast', 'Cell membrane', 'Cytoplasm'], a: 1, e: 'Plant cells possess a cellulose cell wall and chloroplasts.' },
  { q: 'Vaccines protect people against viral/bacterial diseases by:', o: ['Killing all RBCs', 'Stimulating antibodies & immune memory against weakened/dead microbes', 'Raising cholesterol', 'Blocking breathing'], a: 1, e: 'Vaccination primes adaptive immunity to fight future infections rapidly.' },
  { q: 'Odd one out (modes of reproduction): Yeast budding, Amoeba binary fission, Hydra budding, Frog fertilisation.', o: ['Yeast budding', 'Amoeba fission', 'Hydra budding', 'Frog fertilisation'], a: 3, e: 'Frog reproduction is sexual (gamete fusion), whereas the other three are asexual.' },
  { q: 'Which forest conservation movement in 1973 saw villagers hug trees in Uttarakhand to stop logging?', o: ['Chipko Movement', 'Green Revolution', 'White Revolution', 'Project Tiger'], a: 0, e: 'The Chipko Andolan protected Himalayan forests through peaceful tree hugging.' },
];

const SECONDARY_PHYSICS_Q: SciQ[] = [
  { q: 'Newton’s First Law of Motion defines which fundamental property of matter?', o: ['Refraction', 'Inertia (resistance to change in velocity)', 'Electrolysis', 'Radioactivity'], a: 1, e: 'A body retains rest or uniform straight-line motion unless acted upon by an external unbalanced force.' },
  { q: 'If the distance between two masses is doubled while keeping masses constant, gravitational force becomes:', o: ['4 times larger', 'One-fourth (1/4) as strong', 'Doubled', 'Half'], a: 1, e: 'By Newton’s Universal Law F = Gm₁m₂/r², doubling r makes force 1/2² = 1/4.' },
  { q: 'Which lens is used to correct Myopia (nearsightedness, unable to see distant objects clearly)?', o: ['Convex converging lens', 'Concave diverging lens of suitable focal length', 'Cylindrical mirror', 'Plane glass slab'], a: 1, e: 'A concave lens diverges incoming parallel rays so the image forms directly on the retina.' },
  { q: 'According to Fleming’s Left-Hand Rule (used in electric motors), what does the thumb indicate?', o: ['Direction of current', 'Direction of magnetic field', 'Direction of mechanical Force on the conductor', 'Voltage magnitude'], a: 2, e: 'Forefinger = Field, Central finger = Current, Thumb = Motion/Force.' },
  { q: 'Between 0°C and 4°C, how does water behave when heated (Anomalous Behaviour of Water)?', o: ['It expands continuously', 'It contracts on heating and reaches maximum density at 4°C', 'It freezes instantly', 'Its volume doubles'], a: 1, e: 'Water contracts from 0°C to 4°C, keeping aquatic life alive beneath frozen lake surfaces.' },
  { q: 'In domestic circuits, all appliances are connected in parallel rather than series because:', o: ['Parallel uses zero power', 'Each appliance gets full 220V and works independently with its own switch', 'Resistance becomes infinite', 'Current stops when one bulb blows'], a: 1, e: 'Parallel connections keep voltage constant and isolate faults per branch.' },
];

const SECONDARY_CHEMISTRY_Q: SciQ[] = [
  { q: 'In Mendeleev’s vs Modern Periodic Table, what is the fundamental organizing property in the Modern Periodic Table?', o: ['Atomic mass number', 'Atomic number (Z, number of protons)', 'Neutron count', 'Melting point'], a: 1, e: 'Henry Moseley showed atomic number Z determines periodic chemical properties.' },
  { q: 'Which homologous series general formula represents saturated Alkanes (e.g. Methane, Ethane)?', o: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙH₂ₙO'], a: 1, e: 'Alkanes follow CₙH₂ₙ₊₂ (CH₄, C₂H₆, C₃H₈...).' },
  { q: 'Why does dry HCl gas NOT change the colour of dry blue litmus paper?', o: ['HCl is a strong base', 'H⁺/H₃O⁺ ions form only in the presence of aqueous water', 'Litmus only reacts in dark', 'Dry HCl has pH 14'], a: 1, e: 'Acidic dissociation into H₃O⁺ requires water.' },
  { q: 'Assertion (A): In Zn + CuSO₄ → ZnSO₄ + Cu, Zinc displaces Copper. Reason (R): Zinc lies above Copper in the metal reactivity series.', o: ['Both A and R are true, and R explains A', 'Both A and R are true, R does not explain A', 'A is true, R is false', 'Both are false'], a: 0, e: 'A more reactive metal displaces a less reactive metal from its salt solution.' },
  { q: 'Which substance is commonly used by doctors as Plaster of Paris for setting fractured bones?', o: ['CaSO₄·2H₂O (Gypsum)', 'CaSO₄·½H₂O (Calcium sulphate hemihydrate)', 'CaCO₃', 'NaHCO₃'], a: 1, e: 'Plaster of Paris (CaSO₄·½H₂O) sets into hard gypsum when mixed with water.' },
  { q: 'Identify the type of reaction: CaCO₃(s) —(heat)→ CaO(s) + CO₂(g).', o: ['Combination reaction', 'Thermal decomposition reaction', 'Double displacement', 'Neutralisation'], a: 1, e: 'A single compound breaks down into simpler products upon heating.' },
];

const SECONDARY_BIOLOGY_Q: SciQ[] = [
  { q: 'Where does aerobic breakdown of pyruvate to release CO₂, water, and large ATP energy take place?', o: ['Cytoplasm alone', 'Mitochondria', 'Chloroplast stroma', 'Nucleolus'], a: 1, e: 'Glycolysis happens in cytoplasm; Krebs cycle & ETC occur inside mitochondria.' },
  { q: 'Which plant hormone promotes cell division and delays leaf ageing, whereas Abscisic acid inhibits growth?', o: ['Auxin', 'Cytokinin', 'Ethylene', 'Gibberellin'], a: 1, e: 'Cytokinins stimulate rapid cell division (cytokinesis) in fruits/seeds.' },
  { q: 'In Mendel’s monohybrid cross (TT × tt) followed by selfing F₁ (Tt × Tt), what is the F₂ phenotypic ratio?', o: ['1 : 1', '3 Tall : 1 Dwarf', '9 : 3 : 3 : 1', '2 : 1 : 2'], a: 1, e: 'F₂ genotypes TT, Tt, Tt express tallness and tt expresses dwarfness → 3:1 phenotype.' },
  { q: 'What is the functional filtration unit inside each human kidney?', o: ['Neuron', 'Alveolus', 'Nephron', 'Villus'], a: 2, e: 'Over a million nephrons per kidney filter blood plasma and form urine.' },
  { q: 'If 10,000 J of solar energy is captured by grass producers, how much passes to secondary carnivores (3rd consumer / 4th trophic level) by Lindeman’s 10% law?', o: ['1,000 J', '100 J', '10 J', '1 J'], a: 2, e: 'Producers 10,000 J → Herbivores 1,000 J → Primary carnivores 100 J → Secondary carnivores 10 J.' },
  { q: 'Which division process produces four genetically distinct haploid gametes (sperms/ova) in reproductive organs?', o: ['Mitosis', 'Meiosis', 'Binary fission', 'Fragmentation'], a: 1, e: 'Meiosis halves chromosome number (2n → n) and introduces genetic variation via crossing over.' },
];

const ENV_ED_SECONDARY_Q: SciQ[] = [
  { q: 'What does Maharashtra’s "Jalsuraksha" (Water Security) curriculum emphasize for sustainable villages?', o: ['Draining wetlands', 'Watershed bunding, rainwater harvesting & groundwater recharge', 'Industrial dumping', 'Replacing forests with concrete'], a: 1, e: 'Jalsuraksha trains students in watershed conservation and rainwater harvesting.' },
  { q: 'Which international treaty successfully phased out ozone-depleting CFC gases?', o: ['Kyoto Protocol', 'Montreal Protocol (1987)', 'Geneva Convention', 'Basel Pact'], a: 1, e: 'The Montreal Protocol protects the stratospheric ozone layer.' },
  { q: 'Arrange the 5R Waste Hierarchy from highest priority (most eco-friendly) downward: Refuse, Reduce, Reuse, Repurpose, Recycle.', o: ['Recycle → Refuse → Reuse', 'Refuse → Reduce → Reuse → Repurpose → Recycle', 'Reuse → Recycle → Refuse', 'Repurpose → Refuse → Reduce'], a: 1, e: 'Preventing waste first (Refuse, Reduce) saves maximum energy and resources.' },
  { q: 'Western Ghats (Sahyadri) in Maharashtra is globally recognised as one of the world’s:', o: ['Arid deserts', 'Biodiversity Hotspots with high endemism', 'Polar ice caps', 'Volcanic islands'], a: 1, e: 'The Western Ghats shelter thousands of endemic flora and fauna species.' },
  { q: 'Why does biomagnification make top predators (e.g., eagles, sharks) accumulate highest DDT/mercury levels?', o: ['They weigh less', 'Non-biodegradable toxins concentrate across each trophic food-chain step', 'They drink salt water', 'Microbes produce DDT inside eagles'], a: 1, e: 'Persistent toxins pass upward without excretion and amplify at higher trophic levels.' },
];

export function generateScienceEvsQuestionForSlot(
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
  const seed = wsNum * 41 + qIdx * 17 + c * 13;
  const ansIdx = (seed % 4) as 0 | 1 | 2 | 3;

  // Parametric numerical Physics / Chemistry / Biology / EnvEd problems mixed on qIdx === 3 or qIdx === 4 for Middle & Secondary!
  if ((c >= 6) && (qIdx === 3 || (qIdx === 4 && wsNum % 2 === 0))) {
    if (subject === 'Physics' || (subject === 'Science' && wsNum % 3 === 1)) {
      const subKind = (wsNum + qIdx) % 3;
      if (subKind === 0) {
        // F = m * a or Speed = d / t
        if (c >= 9) {
          const mass = ((wsNum + qIdx) % 6) + 2;
          const acc = ((wsNum * 2 + qIdx) % 5) + 3;
          const force = mass * acc;
          const { o, a } = placeCorrect(`${force} N`, [`${force + 4} N`, `${mass + acc} N`, `${Math.max(2, force - 3)} N`], ansIdx);
          return {
            f: format,
            c: chapterName,
            q: `(${boardTag}) Calculate the net force required to accelerate a ${mass} kg trolley at ${acc} m/s².`,
            o,
            a,
            e: `Using Newton’s Second Law F = m × a = ${mass} × ${acc} = ${force} N.`,
          };
        } else {
          const speed = (((wsNum + qIdx) % 5) + 4) * 5;
          const timeH = ((wsNum + qIdx) % 3) + 2;
          const dist = speed * timeH;
          const { o, a } = placeCorrect(`${dist} km`, [`${dist + 15} km`, `${speed + timeH} km`, `${Math.max(10, dist - 10)} km`], ansIdx);
          return {
            f: format,
            c: chapterName,
            q: `A bicycle travels at a uniform speed of ${speed} km/h for ${timeH} hours. What distance does it cover?`,
            o,
            a,
            e: `Distance = Speed × Time = ${speed} × ${timeH} = ${dist} km.`,
          };
        }
      } else if (subKind === 1) {
        // Ohm's law V = I * R or Work W = F * s
        if (c >= 9) {
          const current = ((wsNum + qIdx) % 4) + 2;
          const res = (((wsNum * 2 + qIdx) % 5) + 3) * 2;
          const volt = current * res;
          const { o, a } = placeCorrect(`${volt} V`, [`${volt + 4} V`, `${current + res} V`, `${Math.max(2, volt - 6)} V`], ansIdx);
          return {
            f: format,
            c: chapterName,
            q: `An electric resistor of ${res} Ω carries a steady current of ${current} A. Find the potential difference (V) across it.`,
            o,
            a,
            e: `By Ohm’s Law V = I × R = ${current} × ${res} = ${volt} V.`,
          };
        } else {
          const massG = (((wsNum + qIdx) % 5) + 3) * 20;
          const volCm3 = ((wsNum + qIdx) % 4) + 4;
          const density = massG / volCm3;
          const exactMass = density * volCm3;
          const roundD = ((wsNum + qIdx) % 5) + 2;
          const mAdj = roundD * volCm3;
          const { o, a } = placeCorrect(`${roundD} g/cm³`, [`${roundD + 2} g/cm³`, `${mAdj + volCm3} g/cm³`, `${Math.max(1, roundD - 1)} g/cm³`], ansIdx);
          return {
            f: format,
            c: chapterName,
            q: `A metal block of mass ${mAdj} g occupies a volume of ${volCm3} cm³. Calculate its density.`,
            o,
            a,
            e: `Density = Mass / Volume = ${mAdj} / ${volCm3} = ${roundD} g/cm³ (and ${exactMass > 0 ? 'mass/volume ratio holds' : ''}).`,
          };
        }
      } else {
        // Kinetic energy KE = 0.5 m v^2
        const m = ((wsNum + qIdx) % 4 + 1) * 2;
        const v = ((wsNum + qIdx) % 4) + 2;
        const ke = Math.round(0.5 * m * v * v);
        const { o, a } = placeCorrect(`${ke} J`, [`${m * v} J`, `${ke + 8} J`, `${Math.max(2, ke - 4)} J`], ansIdx);
        return {
          f: format,
          c: chapterName,
          q: `Find the kinetic energy of a ${m} kg object moving at velocity ${v} m/s.`,
          o,
          a,
          e: `KE = ½mv² = ½ × ${m} × ${v}² = ${ke} Joules.`,
        };
      }
    }

    if (subject === 'Chemistry' || (subject === 'Science' && wsNum % 3 === 2)) {
      const phVal = ((wsNum + qIdx) % 13) + 1;
      const isAcid = phVal < 7;
      const isNeutral = phVal === 7;
      const nature = isNeutral ? 'Neutral (like pure water)' : isAcid ? 'Acidic (turns blue litmus red)' : 'Basic / Alkaline (turns red litmus blue)';
      const { o, a } = placeCorrect(
        nature,
        [
          isAcid ? 'Basic / Alkaline (turns red litmus blue)' : 'Acidic (turns blue litmus red)',
          isNeutral ? 'Strongly acidic corrosive acid' : 'Neutral (like pure water)',
          'Noble inert gas behaviour',
        ],
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `An aqueous test solution (Sample #${wsNum}) records pH = ${phVal} on a universal indicator strip. How is it classified?`,
        o,
        a,
        e: `pH < 7 is acidic, pH = 7 is neutral, and pH > 7 is basic/alkaline. Thus pH ${phVal} is ${nature.toLowerCase()}.`,
      };
    }

    if (subject === 'Biology' || subject === 'Environmental Education' || subject === 'Environmental Studies') {
      const producersJ = (((wsNum + qIdx) % 5) + 2) * 10000;
      const herbivoresJ = producersJ / 10;
      const { o, a } = placeCorrect(
        `${herbivoresJ} J`,
        [`${producersJ / 100} J`, `${producersJ} J`, `${herbivoresJ * 5} J`],
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `In a grassland food chain, green plants trap ${producersJ} J of energy. Using the 10% energy transfer law, how much energy reaches primary consumers (deer)?`,
        o,
        a,
        e: `10% of ${producersJ} J = ${herbivoresJ} J transfers to the primary consumer level.`,
      };
    }
  }

  // Otherwise pick cleanly from subject + class-band curated syllabus bank
  let pool: SciQ[];
  if (band === 'early') {
    pool = EARLY_SCI_EVS;
  } else if (band === 'upper_primary') {
    pool = UPPER_SCI_EVS;
  } else if (band === 'middle') {
    if (subject === 'Physics') pool = MIDDLE_PHYSICS_SCI;
    else if (subject === 'Chemistry') pool = MIDDLE_CHEMISTRY_SCI;
    else if (subject === 'Biology') pool = MIDDLE_BIOLOGY_SCI;
    else pool = [...MIDDLE_PHYSICS_SCI, ...MIDDLE_CHEMISTRY_SCI, ...MIDDLE_BIOLOGY_SCI];
  } else {
    if (subject === 'Physics') pool = SECONDARY_PHYSICS_Q;
    else if (subject === 'Chemistry') pool = SECONDARY_CHEMISTRY_Q;
    else if (subject === 'Biology') pool = SECONDARY_BIOLOGY_Q;
    else if (subject === 'Environmental Education' || subject === 'Environmental Studies') {
      pool = [...ENV_ED_SECONDARY_Q, ...SECONDARY_BIOLOGY_Q];
    } else {
      pool = [...SECONDARY_PHYSICS_Q, ...SECONDARY_CHEMISTRY_Q, ...SECONDARY_BIOLOGY_Q];
    }
  }

  const idx = (wsNum * 6 + qIdx) % pool.length;
  const baseItem = pool[idx];
  const pass = Math.floor((wsNum * 6 + qIdx) / pool.length);
  const qText =
    pass === 0
      ? baseItem.q
      : `(${boardTag} • ${classLevel} ${subject} • Practice Set ${wsNum}) ${baseItem.q}`;

  return rotateSciQ({ ...baseItem, q: qText }, seed, format, chapterName);
}
