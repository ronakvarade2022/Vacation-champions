import { TetCtetNoteTopicBlueprint } from './types';

export const SCIENCE_PAPER_2_NOTE_BLUEPRINTS: TetCtetNoteTopicBlueprint[] = [
  // =========================================================================
  // SCIENCE PAPER II — UNIT 1: FOOD, MICROORGANISMS, CELL & LIFE PROCESSES
  // =========================================================================
  {
    slug: 'sci-p2-u1-biology-food-cell-life-processes',
    unitNumber: 1,
    topicNumber: 1,
    subjectId: 'SCIENCE',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Paper II Syllabus (ctet.nic.in) — Science: Food (Components, Crop Production, Microorganisms) & The World of the Living (Cell, Digestion, Respiration, Circulation, Reproduction)',
      mahaTet: 'MSCE Pune MAHA TET Paper II Syllabus (mscepune.in / mahatet.in) — Upper Primary Biology: Nutrients, Microbes, Plant/Animal Cells & Human Systems',
    },
    content: {
      English: {
        documentTitle: 'Science (Paper II) · Unit 1: Food, Microorganisms, Cell & Human Life Processes',
        unitTitle: 'Unit 1: Biology — Nutrition, Microorganisms, Cell & Organ Systems',
        topicTitle: 'Nutrient Tests, Crop Production, Microorganisms & Diseases, Plant vs. Animal Cell & Human Physiology',
        subtopics: [
          'Food Component Chemical Tests (Iodine for Starch, Copper Sulphate + Caustic Soda for Protein, Paper spot for Fats)',
          'Crop Production (Kharif vs. Rabi crops, Nitrogen Fixation — Rhizobium in Legumes, Manure vs. Fertilizer)',
          'Microorganisms (Bacteria, Fungi, Protozoa, Viruses — Fermentation, Pasteurization, Human & Plant Diseases)',
          'Cell Structure & Organelles (Plant Cell vs. Animal Cell: Cell Wall, Chloroplast, Mitochondria, Vacuole)',
          'Human Systems: Digestion (Villi, Bile, Enzymes), Respiration (Aerobic vs. Anaerobic), Circulation & Reproduction',
        ],
        introduction:
          'Biology accounts for ~7–8 content questions in Paper II Science (Classes VI–VIII). NCERT chemical food tests, microbe-disease matching, Rhizobium nitrogen fixation, plant vs. animal cell organelles, and human digestive/circulatory mechanics are tested repeatedly in both CTET and MAHA TET.',
        meaningAndDefinition:
          'A Cell (discovered by Robert Hooke in 1665 in cork) is the basic structural and functional unit of all living organisms. Life Processes (nutrition, respiration, transportation, excretion, reproduction) sustain homeostasis.',
        detailedExplanation: [
          '1. Standard NCERT Nutrient Tests: Starch + dilute Iodine solution → BLUE-BLACK colour. Protein + 2 drops Copper Sulphate (CuSO₄) + 10 drops Caustic Soda (NaOH) → VIOLET colour. Fat → Translucent oily patch on paper.',
          '2. Crops & Microorganisms: Kharif (rainy, June–Sept): Paddy, Maize, Soybean, Cotton, Groundnut. Rabi (winter, Oct–March): Wheat, Gram, Pea, Mustard, Linseed. Rhizobium bacteria live in root nodules of leguminous plants (pea, gram, beans) to fix atmospheric nitrogen into soluble nitrates. Yeast performs anaerobic fermentation producing CO₂ and Alcohol (Louis Pasteur — Pasteurization: heating milk to ~70°C for 15–30 sec and chilling rapidly).',
          '3. Microbe-Disease Mapping: Bacteria → Tuberculosis, Cholera, Typhoid, Citrus Canker (plant). Virus → Polio, Measles, Chickenpox, Hepatitis A, Yellow Vein Mosaic of Bhindi. Protozoa → Malaria (Plasmodium), Amoebic Dysentery. Fungi → Ringworm, Rust of Wheat.',
          '4. Plant Cell vs. Animal Cell: Plant cells possess a rigid Cellulose Cell Wall, Plastids/Chloroplasts (photosynthesis), and a large central Vacuole. Mitochondria = "Powerhouse of the cell" (ATP synthesis); Ribosomes = Protein factory; Lysosomes = "Suicidal bags" (digestive enzymes); Nucleus = Control centre (chromosomes/DNA).',
          '5. Human Digestion, Respiration & Circulation: Bile juice (secreted by LIVER, stored in Gall Bladder) emulsifies fats. Small intestine Villi massively increase surface area for absorption; Large intestine absorbs water/salts. Anaerobic respiration in human muscles during heavy exercise produces LACTIC ACID (causing cramps). Heart has 4 chambers; Pulmonary Artery carries DEOXYGENATED blood; Pulmonary Vein carries OXYGENATED blood.',
        ],
        importantConcepts: [
          'Starch → Iodine → Blue-Black | Protein → CuSO₄ + NaOH → Violet.',
          'Bile is produced by the LIVER (not gall bladder!) and has NO digestive enzymes—it emulsifies fats.',
          'Ruminants (cows/buffaloes) digest Cellulose inside the Caecum/Rumen using cellulose-digesting bacteria.',
          'Muscle cramps during sprinting = accumulation of LACTIC ACID (anaerobic breakdown of glucose).',
        ],
        comparisonTable: {
          caption: 'Key Human & Plant Diseases by Causative Microorganism',
          headers: ['Microorganism', 'Human Diseases', 'Plant Diseases'],
          rows: [
            ['Bacteria', 'Tuberculosis, Cholera, Typhoid', 'Citrus Canker'],
            ['Virus', 'Polio, Measles, Hepatitis A, Chickenpox', 'Yellow Vein Mosaic of Bhindi (Okra)'],
            ['Protozoa', 'Malaria (Anopheles), Dysentery', '—'],
            ['Fungi', 'Ringworm, Athlete’s Foot', 'Rust of Wheat'],
          ],
        },
        practicalExamples: [
          'Why does a hot water bath or massage relieve muscle cramps? Warmth improves blood circulation, supplying oxygen that breaks down accumulated lactic acid into CO₂ and water.',
        ],
        classroomApplications: [
          'Demonstrate Starch (potato + iodine) and Protein (egg white + CuSO₄ + NaOH) tests directly in the classroom lab.',
        ],
        teachingMethods: [
          'Hands-On Laboratory Testing, Microscope Observation (onion peel vs. cheek cell), and Concept Mapping.',
        ],
        examSpecificFocus: {
          ctet: 'CTET Paper II Science tests Food Tests (Blue-Black / Violet), Microbe-Disease matching (including Citrus Canker & Rust of Wheat), Bile/Liver/Villi, Muscle Lactic Acid, and Plant vs. Animal cell differences almost every session.',
          mahaTet: 'MAHA TET Paper II emphasizes Human Endocrine Glands & Hormones (Insulin/Pancreas, Adrenaline, Thyroxine), Photosynthesis equation, Blood Groups, and Cell Organelle functions.',
        },
        importantExamPoints: [
          'Pulmonary Artery = ONLY artery carrying deoxygenated blood; Pulmonary Vein = ONLY vein carrying oxygenated blood.',
          'Cell Wall & Plastids exist in Plant Cells, NOT Animal Cells.',
          'Bile is produced in the Liver and stored in the Gall Bladder.',
        ],
        commonMistakes: [
          'Saying Gall Bladder produces Bile (Liver produces it; Gall Bladder only stores it!).',
          'Confusing Virus (Polio/Measles) with Bacteria (Cholera/Typhoid/TB).',
        ],
        topicSummary:
          'Unit 1 integrates NCERT biochemical food tests, Kharif/Rabi crops, microbe-disease classification, plant vs. animal cell structure, and human digestive/respiratory/circulatory physiology.',
        revisionPoints: [
          'Starch + Iodine = Blue-Black; Protein + CuSO₄ + NaOH = Violet.',
          'Rhizobium = Nitrogen fixation in legumes; Yeast = Fermentation (Alcohol + CO₂).',
          'Mitochondria = Powerhouse; Plant Cell = Cell Wall + Chloroplast + Large Vacuole.',
          'Liver makes Bile; Muscle cramps = Lactic acid; Pulmonary Vein = Oxygenated blood.',
        ],
        practiceQuestions: [
          {
            id: 'sci-p2-u1-en-q1',
            question: 'When 2 drops of Copper Sulphate solution and 10 drops of Caustic Soda solution are added to a food paste, it turns VIOLET. This confirms the presence of:',
            options: ['Starch', 'Protein', 'Fat', 'Vitamin C'],
            correctAnswer: 1,
            explanation: 'Copper Sulphate + Caustic Soda (Biuret test) turns Violet in the presence of Proteins. Iodine turns Blue-Black for Starch.',
            topicReference: 'Unit 1 · Nutrient Chemical Tests',
          },
          {
            id: 'sci-p2-u1-en-q2',
            question: 'Which statement regarding human digestion is CORRECT?',
            options: [
              'Bile juice is produced by the gall bladder and digests starch.',
              'Bile juice is secreted by the liver, stored in the gall bladder, and emulsifies fats.',
              'Villi are located inside the oesophagus to absorb water.',
              'Hydrochloric acid in the stomach is alkaline in nature.',
            ],
            correctAnswer: 1,
            explanation: 'The liver secretes bile, the gall bladder stores it, and bile breaks large fat globules into tiny droplets (emulsification).',
            topicReference: 'Unit 1 · Human Digestion',
          },
          {
            id: 'sci-p2-u1-en-q3',
            question: 'Select the group containing diseases caused ONLY by BACTERIA:',
            options: [
              'Tuberculosis, Cholera, Typhoid',
              'Polio, Measles, Malaria',
              'Rust of Wheat, Cholera, Hepatitis A',
              'Malaria, Typhoid, Chickenpox',
            ],
            correctAnswer: 0,
            explanation: 'Tuberculosis, Cholera, and Typhoid are all bacterial diseases. Polio/Measles/Hepatitis A/Chickenpox are viral; Malaria is protozoan; Rust of Wheat is fungal.',
            topicReference: 'Unit 1 · Microorganisms & Diseases',
          },
        ],
      },
      Marathi: {
        documentTitle: 'विज्ञान (पेपर २) · घटक १: अन्नघटक, सूक्ष्मजीव, पेशी व मानवी जीवनक्रिया',
        unitTitle: 'घटक १: जीवशास्त्र — पोषण, सूक्ष्मजीव, पेशी व मानवी संस्था',
        topicTitle: 'अन्नघटक चाचण्या, पीक उत्पादन, सूक्ष्मजीव व रोग, वनस्पती-प्राणी पेशी आणि मानवी पचन-श्वसन-रक्ताभिसरण',
        subtopics: [
          'अन्नघटक रासायनिक चाचण्या (पिष्टमय — आयोडीन निळा-काळा; प्रथिने — CuSO₄ + NaOH जांभळा; स्निग्ध — कागद डाग)',
          'पीक उत्पादन (खरीप विरुद्ध रब्बी पिके, रायझोबियम नायट्रोजन स्थिरीकरण)',
          'सूक्ष्मजीव (जिवाणू, विषाणू, आदिजीव, कवक — किण्वन, पाश्चरायझेशन व रोग)',
          'पेशी रचना व अंगके (वनस्पती पेशी विरुद्ध प्राणी पेशी: पेशीभित्तिका, हरितलवक, तंतुकणिका, रिक्तिका)',
          'मानवी पचन (पित्तरस, रसांकुर), श्वसन (लॅक्टिक आम्ल), रक्ताभिसरण व अंतःस्रावी ग्रंथी',
        ],
        introduction:
          'पेपर २ विज्ञानामध्ये जीवशास्त्र घटकावर ७–८ प्रश्न येतात. NCERT च्या अन्नघटक चाचण्या, सूक्ष्मजीव-रोग जोड्या, वनस्पती-प्राणी पेशीतील फरक आणि मानवी पचन-रक्ताभिसरण हे अत्यंत महत्त्वाचे मुद्दे आहेत.',
        meaningAndDefinition:
          'पेशी (रॉबर्ट हुक, १६६५) हा सर्व सजीवांचा मूलभूत रचनात्मक व कार्यात्मक घटक आहे.',
        detailedExplanation: [
          '१. अन्नघटक चाचण्या: पिष्टमय (Starch) + आयोडीन द्रावण → निळा-काळा रंग; प्रथिने (Protein) + मोरचूद (CuSO₄) + कॉस्टिक सोडा (NaOH) → जांभळा रंग; स्निग्ध पदार्थ → कागदावर अर्धपारदर्शक तेलकट डाग.',
          '२. पिके व सूक्ष्मजीव: खरीप (पावसाळी — भात, मका, सोयाबीन, कापूस); रब्बी (हिवाळी — गहू, हरभरा, वाटाणा, मोहरी). शेंगावर्गीय वनस्पतींच्या मुळांवरील गाठींत "रायझोबियम" जिवाणू नायट्रोजन स्थिरीकरण करतात. पाश्चरायझेशन (लुई पाश्चर): दूध ~७०°C ला १५–३० सेकंद तापवून झटकन थंड करणे.',
          '३. सूक्ष्मजीव व रोग: जिवाणू → क्षयरोग (TB), कॉलरा, टायफॉइड, लिंबूवरील कँकर; विषाणू → पोलिओ, गोवर, कांजिण्या, हेपॅटायटिस-A, भेंडीवरील यलो व्हेन मोझॅक; आदिजीव → मलेरिया, आमांश; कवक → नायटा, गव्हावरील तांबेरा.',
          '४. वनस्पती विरुद्ध प्राणी पेशी: वनस्पती पेशीत सेल्युलोजची पेशीभित्तिका, हरितलवक व मोठी मध्यवर्ती रिक्तिका असते. तंतुकणिका (Mitochondria) = पेशीचे ऊर्जाकेंद्र; रायबोझोम्स = प्रथिननिर्मिती; लयकारिका (Lysosomes) = आत्मघातकी पिशव्या.',
          '५. पचन, श्वसन व रक्ताभिसरण: पित्तरस यकृतात (Liver) तयार होतो, पित्ताशयात साठवला जातो व स्निग्ध पदार्थांचे पायसीकरण (Emulsification) करतो. लहान आतड्यातील रसांकुर (Villi) अन्नशोषणाचे क्षेत्रफळ वाढवतात. तीव्र व्यायामावेळी स्नायूंमध्ये विनॉक्सिश्वसनाने "लॅक्टिक आम्ल" तयार होऊन पेटके येतात. फुफ्फुस धमनी अशुद्ध रक्त तर फुफ्फुस शीर शुद्ध रक्त वाहते.',
        ],
        importantConcepts: [
          'पिष्टमय + आयोडीन = निळा-काळा | प्रथिने + CuSO₄ + NaOH = जांभळा.',
          'पित्तरस निर्मिती = यकृत (Liver); साठवण = पित्ताशय.',
          'स्नायू पेटके = लॅक्टिक आम्ल संचय.',
        ],
        comparisonTable: {
          caption: 'सूक्ष्मजीव व त्यांच्यामुळे होणारे प्रमुख रोग',
          headers: ['सूक्ष्मजीव', 'मानवी रोग', 'वनस्पती रोग'],
          rows: [
            ['जिवाणू (Bacteria)', 'क्षयरोग, कॉलरा, टायफॉइड', 'लिंबूवरील कँकर (Citrus Canker)'],
            ['विषाणू (Virus)', 'पोलिओ, गोवर, कांजिण्या, हेपॅटायटिस A', 'भेंडीवरील यलो व्हेन मोझॅक'],
            ['आदिजीव (Protozoa)', 'मलेरिया, आमांश', '—'],
            ['कवक (Fungi)', 'नायटा', 'गव्हावरील तांबेरा (Rust of Wheat)'],
          ],
        },
        practicalExamples: [
          'गरम पाण्याने शेकल्यास रक्तप्रवाह वाढून ऑक्सिजन पुरवठा होतो व साठलेले लॅक्टिक आम्ल विघटित होऊन स्नायूंचे पेटके थांबतात.',
        ],
        classroomApplications: [
          'वर्गात बटाट्यावर आयोडीन (पिष्टमय) व अंड्याच्या पांढऱ्या भागावर CuSO₄ + NaOH (प्रथिने) चाचणी प्रत्यक्ष करून दाखवावी.',
        ],
        teachingMethods: [
          'प्रयोगशाळा चाचणी, सूक्ष्मदर्शक निरीक्षण (कांदा पापुद्रा विरुद्ध गालाची पेशी).',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर २ मध्ये अन्नघटक चाचण्या, सूक्ष्मजीव-रोग जोड्या (वनस्पती रोगांसह), पित्तरस/यकृत/रसांकुर, लॅक्टिक आम्ल व वनस्पती-प्राणी पेशी फरक हमखास येतात.',
          mahaTet: 'MAHA TET मध्ये अंतःस्रावी ग्रंथी व संप्रेरके (इन्सुलिन, थायरॉक्सिन, अ‍ॅड्रेनॅलिन), रक्तगट व पेशी अंगके विचारली जातात.',
        },
        importantExamPoints: [
          'पित्तरस यकृतात तयार होतो (पित्ताशयात नाही — तिथे फक्त साठतो!).',
          'पेशीभित्तिका व हरितलवके केवळ वनस्पती पेशीत असतात.',
        ],
        commonMistakes: [
          'पित्ताशय पित्तरस तयार करते असे चुकीचे मानणे.',
        ],
        topicSummary:
          'अन्नघटक चाचण्या, खरीप-रब्बी पिके, सूक्ष्मजीव रोग, पेशी अंगके व मानवी शरीरसंस्था हे पेपर २ जीवशास्त्राचे मुख्य आधार आहेत.',
        revisionPoints: [
          'पिष्टमय = निळा-काळा; प्रथिने = जांभळा; रायझोबियम = नायट्रोजन स्थिरीकरण.',
          'तंतुकणिका = ऊर्जाकेंद्र; यकृत = पित्तरस निर्मिती; स्नायू पेटके = लॅक्टिक आम्ल.',
          'फुफ्फुस शीर = ऑक्सिजनयुक्त रक्त वाहणारी एकमेव शीर.',
        ],
        practiceQuestions: [
          {
            id: 'sci-p2-u1-mr-q1',
            question: 'अन्नपदार्थात मोरचूद (CuSO₄) चे २ थेंब व कॉस्टिक सोडा (NaOH) चे १० थेंब टाकल्यास जांभळा रंग येतो. यावरून त्या अन्नात काय असल्याचे सिद्ध होते?',
            options: ['पिष्टमय पदार्थ', 'प्रथिने (Protein)', 'स्निग्ध पदार्थ', 'क जीवनसत्त्व'],
            correctAnswer: 1,
            explanation: 'CuSO₄ + NaOH सोबत जांभळा रंग प्रथिनांची उपस्थिती सिद्ध करतो.',
            topicReference: 'घटक १ · अन्नघटक चाचणी',
          },
          {
            id: 'sci-p2-u1-mr-q2',
            question: 'मानवी पचनसंस्थेविषयी पुढीलपैकी कोणते विधान अचूक आहे?',
            options: [
              'पित्तरस पित्ताशयात तयार होतो व पिष्टमय पचवतो.',
              'पित्तरस यकृतात तयार होतो, पित्ताशयात साठवला जातो व स्निग्ध पदार्थांचे पायसीकरण करतो.',
              'रसांकुर अन्ननलिकेत असतात.',
              'जठरातील HCl अल्कधर्मी असते.',
            ],
            correctAnswer: 1,
            explanation: 'यकृत पित्तरस तयार करते, पित्ताशय तो साठवते आणि तो स्निग्ध पदार्थांच्या पचनास मदत करतो.',
            topicReference: 'घटक १ · मानवी पचन',
          },
          {
            id: 'sci-p2-u1-mr-q3',
            question: 'केवळ जिवाणूंमुळे (Bacteria) होणाऱ्या रोगांचा अचूक गट ओळखा:',
            options: [
              'क्षयरोग (TB), कॉलरा, टायफॉइड',
              'पोलिओ, गोवर, मलेरिया',
              'गव्हावरील तांबेरा, कॉलरा, हेपॅटायटिस A',
              'मलेरिया, टायफॉइड, कांजिण्या',
            ],
            correctAnswer: 0,
            explanation: 'क्षयरोग, कॉलरा व टायफॉइड हे तिन्ही जिवाणूजन्य रोग आहेत.',
            topicReference: 'घटक १ · सूक्ष्मजीव व रोग',
          },
        ],
      },
      Hindi: {
        documentTitle: 'विज्ञान (पेपर २) · इकाई १: भोजन के घटक, सूक्ष्मजीव, कोशिका एवं मानव जीवन प्रक्रियाएँ',
        unitTitle: 'इकाई १: जीव विज्ञान — पोषण, सूक्ष्मजीव, कोशिका व अंग तंत्र',
        topicTitle: 'पोषक तत्व परीक्षण, फसल उत्पादन, सूक्ष्मजीव-रोग, पादप-जंतु कोशिका तथा मानव पाचन-श्वसन-परिसंचरण',
        subtopics: [
          'पोषक तत्व रासायनिक परीक्षण (स्टार्च — आयोडीन नीला-काला; प्रोटीन — CuSO₄ + NaOH बैंगनी; वसा — तेल धब्बा)',
          'फसल उत्पादन (खरीफ बनाम रबी, राइजोबियम नाइट्रोजन स्थिरीकरण)',
          'सूक्ष्मजीव (जीवाणु, विषाणु, प्रोटोजोआ, कवक — किण्वन, पाश्चुरीकरण एवं रोग)',
          'कोशिका संरचना एवं कोशिकांग (पादप बनाम जंतु कोशिका: कोशिका भित्ति, हरितलवक, माइटोकॉन्ड्रिया, रिक्तिका)',
          'मानव तंत्र: पाचन (पित्त रस, दीर्घरोम/Villi), श्वसन (लैक्टिक अम्ल), परिसंचरण एवं हार्मोन',
        ],
        introduction:
          'पेपर २ विज्ञान में जीव विज्ञान से ७–८ महत्वपूर्ण प्रश्न आते हैं। NCERT के पोषक परीक्षण, सूक्ष्मजीव-रोग युग्म, पादप-जंतु कोशिका अंतर तथा मानव पाचन-परिसंचरण सर्वाधिक पूछे जाते हैं।',
        meaningAndDefinition:
          'कोशिका (रॉबर्ट हुक, १६६५) सभी सजीवों की मूलभूत संरचनात्मक एवं क्रियात्मक इकाई है।',
        detailedExplanation: [
          '१. NCERT पोषक परीक्षण: स्टार्च (मंड) + आयोडीन → नीला-काला रंग; प्रोटीन + कॉपर सल्फेट (CuSO₄) + कॉस्टिक सोडा (NaOH) → बैंगनी रंग; वसा → कागज़ पर पारभासी चिकना धब्बा।',
          '२. फसलें व सूक्ष्मजीव: खरीफ (वर्षा ऋतु — धान, मक्का, सोयाबीन, कपास); रबी (शीत ऋतु — गेहूँ, चना, मटर, सरसों)। दलहनी पौधों की जड़ ग्रंथियों में "राइजोबियम" जीवाणु नाइट्रोजन स्थिरीकरण करता है। पाश्चुरीकरण (लुई पाश्चर): दूध को ~७०°C पर १५–३० सेकंड गर्म कर तुरंत ठंडा करना।',
          '३. सूक्ष्मजीव व रोग: जीवाणु → क्षयरोग (TB), हैजा, टाइफाइड, नींबू कैंकर; विषाणु → पोलियो, खसरा, चिकनपॉक्स, हेपेटाइटिस-A, भिंडी की पीत शिरा मोज़ेक; प्रोटोजोआ → मलेरिया, पेचिश; कवक → दाद, गेहूँ की रस्ट।',
          '४. पादप बनाम जंतु कोशिका: पादप कोशिका में सेल्युलोज कोशिका भित्ति, लवक/हरितलवक व बड़ी केंद्रीय रिक्तिका होती है। माइटोकॉन्ड्रिया = कोशिका का ऊर्जागृह (ATP); राइबोसोम = प्रोटीन फैक्ट्री; लाइसोसोम = आत्महत्या की थैली।',
          '५. पाचन, श्वसन व परिसंचरण: पित्त रस यकृत (Liver) में बनता है, पित्ताशय में संग्रहित होता है व वसा का पायसीकरण करता है। छोटी आँत के दीर्घरोम (Villi) अवशोषण सतह बढ़ाते हैं। अत्यधिक व्यायाम में पेशियों में अवायवीय श्वसन से "लैक्टिक अम्ल" बनने से ऐंठन होती है। फुफ्फुस धमनी अशुद्ध तथा फुफ्फुस शिरा शुद्ध रक्त ले जाती है।',
        ],
        importantConcepts: [
          'स्टार्च + आयोडीन = नीला-काला | प्रोटीन + CuSO₄ + NaOH = बैंगनी।',
          'पित्त रस का निर्माण = यकृत; संग्रहण = पित्ताशय।',
          'पेशी ऐंठन = लैक्टिक अम्ल का संचय।',
        ],
        comparisonTable: {
          caption: 'सूक्ष्मजीव एवं उनसे होने वाले प्रमुख रोग',
          headers: ['सूक्ष्मजीव', 'मानव रोग', 'पादप रोग'],
          rows: [
            ['जीवाणु (Bacteria)', 'क्षयरोग (TB), हैजा, टाइफाइड', 'नींबू कैंकर (Citrus Canker)'],
            ['विषाणु (Virus)', 'पोलियो, खसरा, हेपेटाइटिस-A, चेचक', 'भिंडी का पीत शिरा मोज़ेक'],
            ['प्रोटोजोआ', 'मलेरिया, अमीबी पेचिश', '—'],
            ['कवक (Fungi)', 'दाद (Ringworm)', 'गेहूँ की रस्ट (Rust of Wheat)'],
          ],
        },
        practicalExamples: [
          'गर्म पानी से स्नान या मालिश करने पर रक्त संचार बढ़ता है और ऑक्सीजन पहुँचकर लैक्टिक अम्ल को तोड़ती है जिससे ऐंठन ठीक होती है।',
        ],
        classroomApplications: [
          'आलू पर आयोडीन और दाल के घोल पर CuSO₄ + NaOH परीक्षण कक्षा में प्रत्यक्ष कराएँ।',
        ],
        teachingMethods: [
          'प्रयोगशाला परीक्षण एवं सूक्ष्मदर्शी अवलोकन (प्याज की झिल्ली बनाम गाल की कोशिका)।',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर २ में पोषक परीक्षण, सूक्ष्मजीव-रोग (पादप रोग सहित), यकृत-पित्त रस-दीर्घरोम, लैक्टिक अम्ल व पादप-जंतु कोशिका अंतर नियमित आते हैं।',
          mahaTet: 'MAHA TET में अंतःस्रावी ग्रंथियाँ व हार्मोन (इंसुलिन, थायरॉक्सिन, एड्रेनेलिन), रक्त समूह एवं कोशिकांग प्रमुख हैं।',
        },
        importantExamPoints: [
          'पित्त रस यकृत बनाता है, पित्ताशय केवल संग्रह करता है।',
          'कोशिका भित्ति व हरितलवक केवल पादप कोशिका में होते हैं।',
        ],
        commonMistakes: [
          'पित्ताशय को पित्त रस का उत्पादक मान लेना।',
        ],
        topicSummary:
          'पोषक परीक्षण, फसल-सूक्ष्मजीव, पादप-जंतु कोशिका व मानव शारीरिक तंत्र पेपर २ जीव विज्ञान का आधार हैं।',
        revisionPoints: [
          'स्टार्च = नीला-काला; प्रोटीन = बैंगनी; राइजोबियम = नाइट्रोजन स्थिरीकरण।',
          'माइटोकॉन्ड्रिया = ऊर्जागृह; यकृत = पित्त निर्माण; ऐंठन = लैक्टिक अम्ल।',
          'फुफ्फुस शिरा = ऑक्सीजनयुक्त रक्त।',
        ],
        practiceQuestions: [
          {
            id: 'sci-p2-u1-hi-q1',
            question: 'भोजन के पेस्ट में २ बूँद कॉपर सल्फेट और १० बूँद कॉस्टिक सोडा मिलाने पर बैंगनी रंग आता है। यह किसकी उपस्थिति दर्शाता है?',
            options: ['स्टार्च', 'प्रोटीन', 'वसा', 'विटामिन C'],
            correctAnswer: 1,
            explanation: 'CuSO₄ + NaOH परीक्षण में बैंगनी रंग प्रोटीन की पुष्टि करता है।',
            topicReference: 'इकाई १ · पोषक परीक्षण',
          },
          {
            id: 'sci-p2-u1-hi-q2',
            question: 'मानव पाचन के संदर्भ में कौन-सा कथन सही है?',
            options: [
              'पित्त रस पित्ताशय में बनता है और मंड पचाता है।',
              'पित्त रस यकृत द्वारा स्रावित होता है, पित्ताशय में संग्रहित होता है और वसा का पायसीकरण करता है।',
              'दीर्घरोम ग्रसिका में पाए जाते हैं।',
              'आमाशय का HCl क्षारीय होता है।',
            ],
            correctAnswer: 1,
            explanation: 'यकृत पित्त रस स्रावित करता है, पित्ताशय उसे संचित करता है और वह वसा का पायसीकरण करता है।',
            topicReference: 'इकाई १ · मानव पाचन',
          },
          {
            id: 'sci-p2-u1-hi-q3',
            question: 'केवल जीवाणु (Bacteria) से होने वाले रोगों का सही समूह है:',
            options: ['क्षयरोग, हैजा, टाइफाइड', 'पोलियो, खसरा, मलेरिया', 'गेहूँ की रस्ट, हैजा, हेपेटाइटिस A', 'मलेरिया, टाइफाइड, चिकनपॉक्स'],
            correctAnswer: 0,
            explanation: 'क्षयरोग, हैजा और टाइफाइड तीनों जीवाणुजनित रोग हैं।',
            topicReference: 'इकाई १ · सूक्ष्मजीव व रोग',
          },
        ],
      },
    },
  },

  // =========================================================================
  // SCIENCE PAPER II — UNIT 2: CHEMISTRY — MATERIALS, METALS, ACIDS & CHANGES
  // =========================================================================
  {
    slug: 'sci-p2-u2-chemistry-materials-metals-acids',
    unitNumber: 2,
    topicNumber: 2,
    subjectId: 'SCIENCE',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Paper II Syllabus (ctet.nic.in) — Materials: Physical & Chemical Changes, Metals & Non-Metals, Reactivity Series, Acids-Bases-Salts, Indicators, Fibres & Separation',
      mahaTet: 'MSCE Pune MAHA TET Paper II Syllabus (mscepune.in / mahatet.in) — Matter, Mixtures & Separation, Atomic Structure, Acids-Bases-Salts, Metals & Combustion',
    },
    content: {
      English: {
        documentTitle: 'Science (Paper II) · Unit 2: Materials — Metals, Acids-Bases, Changes & Separation',
        unitTitle: 'Unit 2: Chemistry — Materials, Reactions & Separation',
        topicTitle: 'Physical vs. Chemical Changes, Metals/Non-Metals Reactivity, Acids-Bases-Indicators, Combustion & Separation',
        subtopics: [
          'Separation of Mixtures (Winnowing, Sieving, Sedimentation, Decantation, Filtration, Evaporation, Sublimation, Chromatography)',
          'Physical vs. Chemical Changes (Rusting of Iron, Galvanization, Crystallization, Vinegar + Baking Soda)',
          'Metals vs. Non-Metals, Exceptions (Mercury, Sodium, Graphite, Iodine) & Metal Reactivity / Displacement Series',
          'Acids, Bases, Salts, Natural & Synthetic Indicators (Litmus, Turmeric, China Rose, Phenolphthalein) & Neutralization',
          'Combustion, Flame Zones (Outer Blue = Hottest), Ignition Temperature & Thermoplastic vs. Thermosetting Plastics',
        ],
        introduction:
          'Chemistry in Paper II Science centres on practical reactivity displacement experiments, natural acid-base indicators (especially Turmeric, China Rose, and Phenolphthalein), physical vs. chemical changes, and flame/combustion principles.',
        meaningAndDefinition:
          'A Physical Change alters shape, size, or state without forming a new substance (usually reversible), whereas a Chemical Change forms one or more new substances with distinct properties (e.g., rusting, burning, curdling, neutralization).',
        detailedExplanation: [
          '1. Metals vs. Non-Metals & Reactivity Series: Metals are lustrous, malleable, ductile, sonorous, good conductors, and form BASIC oxides (MgO + H₂O → Mg(OH)₂ turns red litmus blue). Non-metals form ACIDIC oxides (SO₂ + H₂O → H₂SO₃ turns blue litmus red). Key Exceptions: Mercury (liquid metal), Bromine (liquid non-metal), Sodium & Potassium (soft metals stored in KEROSENE), Phosphorus (stored in WATER), Graphite (conducting non-metal). Reactivity order (high → low): K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Ag > Au. A MORE reactive metal displaces a LESS reactive metal from its salt solution (Fe + CuSO₄ [blue] → FeSO₄ [green] + Cu [brown deposit] — but Cu CANNOT displace Fe or Zn!).',
          '2. Acids, Bases & Indicators: Acids are sour (turn Blue Litmus → Red); Bases are bitter & soapy (turn Red Litmus → Blue). Natural Indicators: (a) Turmeric: yellow in acid/neutral, REDDISH-BROWN in base! (b) China Rose (Hibiscus): DARK PINK (Magenta) in acid, GREEN in base! (c) Phenolphthalein: COLOURLESS in acid, PINK in base! Neutralization: Acid + Base → Salt + Water + Heat (Ant sting = Formic acid neutralized by Baking Soda / Calamine [ZnCO₃]; Indigestion = Milk of Magnesia [Mg(OH)₂]).',
          '3. Rusting & Prevention: Iron rusting requires BOTH Oxygen AND Water (moisture). Prevented by Galvanization (coating iron with ZINC), painting, greasing, or alloying (Stainless steel = Iron + Chromium + Nickel + Carbon).',
          '4. Combustion & Flame Zones: Candle flame has 3 zones: Outer non-luminous BLUE zone (complete combustion — HOTTEST, used by goldsmiths), Middle luminous YELLOW zone (partial combustion — moderately hot), Innermost DARK zone (unburnt wax vapours — least hot). Calorific value unit = kJ/kg (Hydrogen has highest calorific value).',
          '5. Separation & Plastics: Sublimation separates camphor/ammonium chloride/naphthalene from salt. Thermoplastics (PVC, Polythene) soften on heating; Thermosetting plastics (Bakelite — switches/handles; Melamine — fireproof tiles) do NOT soften once moulded.',
        ],
        importantConcepts: [
          'Metal Oxides = BASIC; Non-Metal Oxides = ACIDIC.',
          'Displacement Rule: Zn > Fe > Cu (Zn displaces Fe & Cu; Fe displaces Cu; Cu displaces NEITHER).',
          'Sodium/Potassium stored in Kerosene; White Phosphorus stored in Water.',
          'Galvanization = Zinc coating on iron to stop rusting.',
        ],
        comparisonTable: {
          caption: 'Acid-Base Indicator Colour Chart (Must-Memorize for CTET/TET)',
          headers: ['Indicator', 'Colour in Acid', 'Colour in Base', 'Neutral'],
          rows: [
            ['Litmus', 'Red (Blue → Red)', 'Blue (Red → Blue)', 'Purple'],
            ['Turmeric', 'Yellow (no change)', 'Reddish-Brown', 'Yellow'],
            ['China Rose (Hibiscus)', 'Dark Pink (Magenta)', 'Green', 'Light Pink'],
            ['Phenolphthalein', 'Colourless', 'Pink', 'Colourless'],
            ['Methyl Orange', 'Red', 'Yellow', 'Orange'],
          ],
        },
        practicalExamples: [
          'Why does a turmeric curry stain on a white shirt turn reddish-brown when washed with soap? Because soap solution is BASIC, and turmeric acts as a natural indicator turning reddish-brown in bases!',
        ],
        classroomApplications: [
          'Prepare China Rose and Turmeric paper strips in class so learners safely test lemon juice, vinegar, soap water, and baking soda.',
        ],
        teachingMethods: [
          'Guided Discovery Experimentation (Iron nail in Copper Sulphate displacement, Indicator colour lab).',
        ],
        examSpecificFocus: {
          ctet: 'CTET Paper II asks 3–4 items EVERY exam on: (1) Metal displacement matrix (Zn/Fe/Cu/Al in salt solutions), (2) Indicator colours (Turmeric, China Rose, Phenolphthalein), (3) Ant sting / Soil neutralization, (4) Candle flame outer blue zone, and (5) Physical vs. Chemical changes.',
          mahaTet: 'MAHA TET Paper II tests Atomic Structure (protons/neutrons/electrons), Valency, Mixtures & Separation (sublimation/centrifugation/distillation), pH scale, and Galvanization/Alloys.',
        },
        importantExamPoints: [
          'Copper CANNOT displace Zinc or Iron from their salt solutions (Cu is below Fe and Zn).',
          'China Rose: Acid = Dark Pink (Magenta), Base = Green.',
          'Goldsmiths blow air onto the OUTERMOST BLUE zone of a flame because it is the hottest.',
        ],
        commonMistakes: [
          'Saying Copper displaces Iron from FeSO₄ (FALSE! Iron displaces Copper from CuSO₄).',
          'Thinking the bright yellow middle zone of a candle flame is the hottest (the outer blue zone is hottest!).',
        ],
        topicSummary:
          'Paper II Chemistry masters reactivity displacement, acid-base indicator colours, neutralization, rusting/galvanization, flame zones, and mixture separation.',
        revisionPoints: [
          'Reactivity: K > Na > Ca > Mg > Al > Zn > Fe > Cu > Ag > Au.',
          'Indicators: Turmeric (Base=Red-brown); China Rose (Acid=Magenta, Base=Green); Phenolphthalein (Base=Pink).',
          'Galvanization = Zinc on Iron; Outer Blue flame = Hottest; Bakelite = Thermosetting.',
        ],
        practiceQuestions: [
          {
            id: 'sci-p2-u2-en-q1',
            question: 'When an iron nail is dipped into a blue Copper Sulphate (CuSO₄) solution for 30 minutes, what happens and why?',
            options: [
              'No reaction occurs because Copper is more reactive than Iron.',
              'The solution turns light green (FeSO₄) and a reddish-brown copper layer deposits on the nail because Iron is more reactive than Copper.',
              'The solution turns pink and releases hydrogen gas.',
              'The iron nail dissolves without any colour change.',
            ],
            correctAnswer: 1,
            explanation: 'Iron is higher than Copper in the reactivity series, so Fe displaces Cu from CuSO₄ forming green FeSO₄ and brown Cu deposit.',
            topicReference: 'Unit 2 · Metal Displacement',
          },
          {
            id: 'sci-p2-u2-en-q2',
            question: 'Which colour changes are observed when China Rose (Hibiscus) indicator is added separately to Lemon Juice (Acid) and Baking Soda solution (Base)?',
            options: [
              'Green in lemon juice; Dark pink in baking soda',
              'Dark pink (magenta) in lemon juice; Green in baking soda',
              'Reddish-brown in lemon juice; Colourless in baking soda',
              'Blue in lemon juice; Yellow in baking soda',
            ],
            correctAnswer: 1,
            explanation: 'China Rose indicator turns Dark Pink (Magenta) in acidic solutions and Green in basic solutions.',
            topicReference: 'Unit 2 · Natural Indicators',
          },
          {
            id: 'sci-p2-u2-en-q3',
            question: 'Which zone of a candle flame do goldsmiths use to melt gold and silver, and why?',
            options: [
              'Innermost dark zone because it contains unburnt wax',
              'Middle yellow zone because it glows brightly',
              'Outermost blue non-luminous zone because complete combustion makes it the hottest',
              'Base of the wick because oxygen is absent there',
            ],
            correctAnswer: 2,
            explanation: 'The outermost blue zone undergoes complete combustion with ample oxygen, reaching the highest temperature.',
            topicReference: 'Unit 2 · Combustion & Flame',
          },
        ],
      },
      Marathi: {
        documentTitle: 'विज्ञान (पेपर २) · घटक २: पदार्थ — धातू-अधातू, आम्ल-आम्लारी, बदल व विलगीकरण',
        unitTitle: 'घटक २: रसायनशास्त्र — धातू अभिक्रियाशीलता, आम्ल-आम्लारी व रासायनिक बदल',
        topicTitle: 'भौतिक-रासायनिक बदल, धातू-अधातू विस्थापन श्रेणी, आम्ल-आम्लारी दर्शक, ज्वलन व मिश्रण विलगीकरण',
        subtopics: [
          'मिश्रणांचे विलगीकरण (उफणणी, चाळणी, गाळण, बाष्पीभवन, संप्लवन/Sublimation, वर्णलेखन)',
          'भौतिक विरुद्ध रासायनिक बदल (लोखंड गंजणे, गॅल्व्हनायझेशन, स्फटिकीकरण)',
          'धातू-अधातू, अपवाद (पारा, सोडियम, ग्रॅफाइट) व अभिक्रियाशीलता श्रेणी (विस्थापन अभिक्रिया)',
          'आम्ल, आम्लारी, क्षार, दर्शक (लिटमस, हळद, जास्वंद, फिनॉल्फ्थॅलीन) व उदासीनीकरण',
          'ज्वलन, मेणबत्तीच्या ज्योतीचे भाग (बाह्य निळा = सर्वाधिक उष्ण) व थर्मोप्लास्टिक विरुद्ध थर्मोसेटिंग',
        ],
        introduction:
          'पेपर २ रसायनशास्त्रात धातूंच्या विस्थापन अभिक्रिया, नैसर्गिक आम्ल-आम्लारी दर्शक (हळद, जास्वंद, फिनॉल्फ्थॅलीन), गॅल्व्हनायझेशन आणि ज्योतीचे भाग यांवर दरवर्षी ३–४ प्रश्न येतात.',
        meaningAndDefinition:
          'भौतिक बदलात नवीन पदार्थ तयार होत नाही (फक्त आकार/अवस्था बदलते), तर रासायनिक बदलात पूर्णपणे नवीन गुणधर्मांचा पदार्थ तयार होतो (उदा. लोखंड गंजणे, दूध नासणे, दहन).',
        detailedExplanation: [
          '१. धातू-अधातू व विस्थापन श्रेणी: धातूंची ऑक्साइड्स आम्लारीधर्मी (Basic) तर अधातूंची ऑक्साइड्स आम्लधर्मी (Acidic) असतात. पारा (द्रवरूप धातू), ब्रोमीन (द्रवरूप अधातू), सोडियम-पोटॅशियम (केरोसीनमध्ये ठेवतात), पांढरा फॉस्फरस (पाण्यात ठेवतात), ग्रॅफाइट (विद्युतवाहक अधातू). अभिक्रियाशीलता क्रम: K > Na > Ca > Mg > Al > Zn > Fe > Cu > Ag > Au. अधिक अभिक्रियाशील धातू कमी अभिक्रियाशील धातूचे विस्थापन करतो (Fe + CuSO₄ [निळा] → FeSO₄ [हिरवा] + Cu [तांबूस थर]).',
          '२. आम्ल, आम्लारी व दर्शक: आम्ल निळ्या लिटमसला लाल करते; आम्लारी लाल लिटमसला निळे करते. हळद → आम्लारीत लालसर-तपकिरी; जास्वंद (China Rose) → आम्लात गडद गुलाबी (मॅजेंटा), आम्लारीत हिरवा; फिनॉल्फ्थॅलीन → आम्लात रंगहीन, आम्लारीत गुलाबी! मुंगी चावल्यावर (फॉर्मिक आम्ल) खाण्याचा सोडा किंवा कॅलामाइन (ZnCO₃) लावून उदासीनीकरण करतात.',
          '३. गंजणे व गॅल्व्हनायझेशन: लोखंड गंजण्यासाठी ऑक्सिजन आणि पाणी (आर्द्रता) दोन्ही आवश्यक असतात. लोखंडावर जस्ताचा (Zinc) थर देण्याच्या क्रियेस गॅल्व्हनायझेशन म्हणतात.',
          '४. मेणबत्तीच्या ज्योतीचे ३ भाग: सर्वात बाहेरील निळा भाग (पूर्ण ज्वलन — सर्वाधिक उष्ण; सोनार सोने वितळवण्यासाठी वापरतात), मधला पिवळा भाग (अपूर्ण ज्वलन — मध्यम उष्ण), सर्वात आतील काळा भाग (न जळलेली मेणाची वाफ — कमीत कमी उष्ण).',
          '५. संप्लवन (Sublimation) व प्लास्टिक: कापूर, नवसागर (NH₄Cl), नॅफ्थॅलीन थेट स्थायूतून वायूत जातात. थर्मोसेटिंग प्लास्टिक (बॅकेलाइट — विजेचे स्विच, कुकरचे हँडल; मेलॅमाइन) उष्णतेने मऊ होत नाही.',
        ],
        importantConcepts: [
          'धातू ऑक्साइड = आम्लारीधर्मी; अधातू ऑक्साइड = आम्लधर्मी.',
          'विस्थापन: Zn > Fe > Cu (तांबे कधीही लोह किंवा जस्ताचे विस्थापन करू शकत नाही!).',
          'गॅल्व्हनायझेशन = लोखंडावर जस्ताचा (Zinc) थर.',
        ],
        comparisonTable: {
          caption: 'आम्ल-आम्लारी दर्शक रंग तक्ता (परीक्षेसाठी अत्यंत महत्त्वाचा)',
          headers: ['दर्शक (Indicator)', 'आम्लातील रंग', 'आम्लारीतील रंग'],
          rows: [
            ['लिटमस', 'लाल (निळा → लाल)', 'निळा (लाल → निळा)'],
            ['हळद (Turmeric)', 'पिवळा (बदल नाही)', 'लालसर-तपकिरी'],
            ['जास्वंद (China Rose)', 'गडद गुलाबी (मॅजेंटा)', 'हिरवा'],
            ['फिनॉल्फ्थॅलीन', 'रंगहीन', 'गुलाबी'],
          ],
        },
        practicalExamples: [
          'पांढऱ्या शर्टवरील हळदीचा डाग साबणाने धुताना लालसर-तपकिरी होतो कारण साबण आम्लारीधर्मी असतो!',
        ],
        classroomApplications: [
          'हळदीची पट्टी व जास्वंदाच्या पाकळ्यांचा रस वापरून लिंबू, व्हिनेगर, सोडा व साबण यांची सुरक्षित चाचणी घ्यावी.',
        ],
        teachingMethods: [
          'शोधक प्रयोगशाळा पद्धती (मोरचूद द्रावणात लोखंडी खिळा टाकणे, नैसर्गिक दर्शक प्रयोग).',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर २ मध्ये धातू विस्थापन सारणी (Zn/Fe/Cu), जास्वंद-हळद-फिनॉल्फ्थॅलीन रंग, मुंगी दंश उदासीनीकरण व ज्योतीचा निळा भाग हमखास येतात.',
          mahaTet: 'MAHA TET मध्ये अणुरचना, संयुजा, संप्लवन-उर्ध्वपातन, pH मापन व संमिश्रे विचारली जातात.',
        },
        importantExamPoints: [
          'जास्वंद दर्शक: आम्ल = गडद गुलाबी; आम्लारी = हिरवा.',
          'ज्योतीचा सर्वात बाहेरील निळा भाग सर्वाधिक उष्ण असतो.',
        ],
        commonMistakes: [
          'पिवळ्या ज्योतीला सर्वाधिक उष्ण समजणे किंवा तांबे लोहाचे विस्थापन करते असे मानणे.',
        ],
        topicSummary:
          'धातू विस्थापन श्रेणी, नैसर्गिक-कृत्रिम दर्शक, उदासीनीकरण, गॅल्व्हनायझेशन व ज्योतीचे भाग हे पेपर २ रसायनशास्त्राचे हुकमी गुण आहेत.',
        revisionPoints: [
          'Zn > Fe > Cu (अधिक क्रियाशील धातू कमी क्रियाशील धातूचे विस्थापन करतो).',
          'हळद (आम्लारी=लाल-तपकिरी); जास्वंद (आम्ल=मॅजेंटा, आम्लारी=हिरवा); फिनॉल्फ्थॅलीन (आम्लारी=गुलाबी).',
          'गॅल्व्हनायझेशन = जस्त थर; बाह्य निळा भाग = सर्वाधिक उष्ण.',
        ],
        practiceQuestions: [
          {
            id: 'sci-p2-u2-mr-q1',
            question: 'निळ्या कॉपर सल्फेट (CuSO₄) द्रावणात लोखंडी खिळा ३० मिनिटे बुडवून ठेवल्यास काय घडते?',
            options: [
              'कोणतीही अभिक्रिया होत नाही.',
              'द्रावण हिरवे (FeSO₄) होते व खिळ्यावर तांबूस थर जमा होतो कारण लोह तांब्यापेक्षा अधिक अभिक्रियाशील आहे.',
              'द्रावण गुलाबी होते.',
              'रंगबदल न होता खिळा विरघळतो.',
            ],
            correctAnswer: 1,
            explanation: 'लोह तांब्यापेक्षा अधिक अभिक्रियाशील असल्याने ते CuSO₄ मधून तांब्याचे विस्थापन करते.',
            topicReference: 'घटक २ · विस्थापन अभिक्रिया',
          },
          {
            id: 'sci-p2-u2-mr-q2',
            question: 'जास्वंद (China Rose) दर्शक लिंबाच्या रसात (आम्ल) व खाण्याच्या सोड्याच्या द्रावणात (आम्लारी) अनुक्रमे कोणते रंग दाखवते?',
            options: ['हिरवा व गडद गुलाबी', 'गडद गुलाबी (मॅजेंटा) व हिरवा', 'लालसर-तपकिरी व रंगहीन', 'निळा व पिवळा'],
            correctAnswer: 1,
            explanation: 'जास्वंद दर्शक आम्लात गडद गुलाबी व आम्लारीत हिरवा रंग देते.',
            topicReference: 'घटक २ · नैसर्गिक दर्शक',
          },
          {
            id: 'sci-p2-u2-mr-q3',
            question: 'सोनार सोने वितळवण्यासाठी ज्योतीचा कोणता भाग वापरतात?',
            options: ['आतील काळा भाग', 'मधला पिवळा भाग', 'सर्वात बाहेरील निळा भाग (पूर्ण ज्वलन व सर्वाधिक उष्ण)', 'वातीचा तळ'],
            correctAnswer: 2,
            explanation: 'बाह्य निळ्या भागात पूर्ण ज्वलन होऊन तापमान सर्वाधिक असते.',
            topicReference: 'घटक २ · ज्वलन व ज्योत',
          },
        ],
      },
      Hindi: {
        documentTitle: 'विज्ञान (पेपर २) · इकाई २: पदार्थ — धातु-अधातु, अम्ल-क्षारक, परिवर्तन एवं पृथक्करण',
        unitTitle: 'इकाई २: रसायन विज्ञान — धातु अभिक्रियाशीलता, अम्ल-क्षारक एवं रासायनिक परिवर्तन',
        topicTitle: 'भौतिक-रासायनिक परिवर्तन, धातु विस्थापन श्रेणी, अम्ल-क्षारक सूचक, दहन व मिश्रण पृथक्करण',
        subtopics: [
          'पृथक्करण विधियाँ (निष्पावन, चालन, निस्तारण, निस्यंदन, वाष्पन, ऊर्ध्वपातन/Sublimation)',
          'भौतिक बनाम रासायनिक परिवर्तन (जंग लगना, यशदलेपन/Galvanization, क्रिस्टलीकरण)',
          'धातु-अधातु, अपवाद (पारा, सोडियम, ग्रेफाइट) एवं धातु सक्रियता/विस्थापन श्रेणी',
          'अम्ल, क्षारक, लवण, सूचक (लिटमस, हल्दी, गुड़हल, फीनॉलफ्थेलिन) व उदासीनीकरण',
          'दहन, ज्वाला के क्षेत्र (बाहरी नीला = सर्वाधिक गर्म) तथा थर्मोप्लास्टिक बनाम थर्मोसेटिंग',
        ],
        introduction:
          'पेपर २ रसायन विज्ञान में धातु विस्थापन अभिक्रियाएँ, प्राकृतिक सूचक (हल्दी, गुड़हल, फीनॉलफ्थेलिन), यशदलेपन और मोमबत्ती ज्वाला के क्षेत्र सर्वाधिक पूछे जाते हैं।',
        meaningAndDefinition:
          'भौतिक परिवर्तन में नया पदार्थ नहीं बनता, जबकि रासायनिक परिवर्तन में नए गुणों वाला नया पदार्थ निर्मित होता है (जंग लगना, दही जमना, उदासीनीकरण)।',
        detailedExplanation: [
          '१. धातु-अधातु व सक्रियता श्रेणी: धातु ऑक्साइड क्षारीय तथा अधातु ऑक्साइड अम्लीय होते हैं। पारा (द्रव धातु), ब्रोमीन (द्रव अधातु), सोडियम-पोटैशियम (मिट्टी के तेल में), श्वेत फॉस्फोरस (जल में), ग्रेफाइट (विद्युत सुचालक अधातु)। सक्रियता क्रम: K > Na > Ca > Mg > Al > Zn > Fe > Cu > Ag > Au। अधिक क्रियाशील धातु कम क्रियाशील धातु को विस्थापित करती है (Fe + CuSO₄ [नीला] → FeSO₄ [हरा] + Cu [भूरा])।',
          '२. अम्ल, क्षारक व सूचक: अम्ल नीले लिटमस को लाल, क्षारक लाल लिटमस को नीला करता है। हल्दी → क्षारक में लाल-भूरी; गुड़हल (China Rose) → अम्ल में गहरा गुलाबी (मैजेंटा), क्षारक में हरा; फीनॉलफ्थेलिन → अम्ल में रंगहीन, क्षारक में गुलाबी। चींटी के डंक (फॉर्मिक अम्ल) पर बेकिंग सोडा या कैलामाइन (ZnCO₃) से उदासीनीकरण होता है।',
          '३. जंग व यशदलेपन (Galvanization): जंग हेतु ऑक्सीजन और जल दोनों आवश्यक हैं। लोहे पर जस्ते (Zinc) की परत चढ़ाना यशदलेपन कहलाता है।',
          '४. मोमबत्ती ज्वाला के ३ क्षेत्र: बाहरी नीला अदीप्त क्षेत्र (पूर्ण दहन — सर्वाधिक गर्म, सुनार उपयोग करते हैं), मध्य पीला दीप्त क्षेत्र (आंशिक दहन — मध्यम गर्म), आंतरिक काला क्षेत्र (बिना जला मोम वाष्प — सबसे कम गर्म)।',
          '५. ऊर्ध्वपातन व प्लास्टिक: कपूर, अमोनियम क्लोराइड, नैफ्थलीन सीधे ठोस से गैस बनते हैं। बैकेलाइट (स्विच/हत्थे) व मेलामाइन थर्मोसेटिंग प्लास्टिक हैं।',
        ],
        importantConcepts: [
          'धातु ऑक्साइड = क्षारीय; अधातु ऑक्साइड = अम्लीय।',
          'विस्थापन: Zn > Fe > Cu (ताँबा लोहे या जस्ते को विस्थापित नहीं कर सकता)।',
          'यशदलेपन = लोहे पर जस्ते (Zinc) का लेप।',
        ],
        comparisonTable: {
          caption: 'अम्ल-क्षारक सूचक रंग तालिका',
          headers: ['सूचक (Indicator)', 'अम्ल में रंग', 'क्षारक में रंग'],
          rows: [
            ['लिटमस', 'लाल (नीला → लाल)', 'नीला (लाल → नीला)'],
            ['हल्दी (Turmeric)', 'पीला (अपरिवर्तित)', 'लाल-भूरा'],
            ['गुड़हल (China Rose)', 'गहरा गुलाबी (मैजेंटा)', 'हरा'],
            ['फीनॉलफ्थेलिन', 'रंगहीन', 'गुलाबी'],
          ],
        },
        practicalExamples: [
          'सफेद कपड़े पर हल्दी का दाग साबुन (क्षारीय) से धोने पर लाल-भूरा हो जाता है।',
        ],
        classroomApplications: [
          'हल्दी व गुड़हल की पट्टियों से नींबू, सिरका व बेकिंग सोडा का सुरक्षित परीक्षण कराएँ।',
        ],
        teachingMethods: [
          'निर्देशित खोज प्रयोग (कॉपर सल्फेट में लोहे की कील, सूचक प्रयोगशाला)।',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर २ में धातु विस्थापन तालिका (Zn/Fe/Cu), गुड़हल-हल्दी-फीनॉलफ्थेलिन, चींटी डंक उदासीनीकरण व बाहरी नीली ज्वाला हर बार आती है।',
          mahaTet: 'MAHA TET में परमाणु संरचना, संयोजकता, ऊर्ध्वपातन-आसवन, pH स्केल व मिश्रधातु प्रमुख हैं।',
        },
        importantExamPoints: [
          'गुड़हल: अम्ल = गहरा गुलाबी (मैजेंटा), क्षारक = हरा।',
          'बाहरी नीला ज्वाला क्षेत्र सर्वाधिक गर्म होता है।',
        ],
        commonMistakes: [
          'पीली चमकीली ज्वाला को सबसे गर्म समझ लेना।',
        ],
        topicSummary:
          'धातु विस्थापन, प्राकृतिक-कृत्रिम सूचक, उदासीनीकरण, यशदलेपन और ज्वाला क्षेत्र पेपर २ रसायन के उच्च-अंकदायी विषय हैं।',
        revisionPoints: [
          'Zn > Fe > Cu; सोडियम = केरोसीन में; श्वेत फॉस्फोरस = जल में।',
          'हल्दी (क्षारक=लाल-भूरा); गुड़हल (अम्ल=मैजेंटा, क्षारक=हरा); फीनॉलफ्थेलिन (क्षारक=गुलाबी)।',
          'यशदलेपन = जस्ता परत; बाहरी नीला क्षेत्र = सर्वाधिक गर्म।',
        ],
        practiceQuestions: [
          {
            id: 'sci-p2-u2-hi-q1',
            question: 'नीले कॉपर सल्फेट (CuSO₄) विलयन में लोहे की कील ३० मिनट डुबोने पर क्या होता है?',
            options: [
              'कोई अभिक्रिया नहीं होती।',
              'विलयन हरा (FeSO₄) हो जाता है और कील पर भूरा ताँबा जमा हो जाता है क्योंकि लोहा ताँबे से अधिक क्रियाशील है।',
              'विलयन गुलाबी हो जाता है।',
              'कील बिना रंग बदले घुल जाती है।',
            ],
            correctAnswer: 1,
            explanation: 'लोहा ताँबे से अधिक अभिक्रियाशील होने के कारण CuSO₄ से ताँबे को विस्थापित कर हरा FeSO₄ बनाता है।',
            topicReference: 'इकाई २ · विस्थापन अभिक्रिया',
          },
          {
            id: 'sci-p2-u2-hi-q2',
            question: 'गुड़हल (China Rose) सूचक नींबू के रस (अम्ल) और बेकिंग सोडा विलयन (क्षारक) में क्रमशः कौन-से रंग देता है?',
            options: ['हरा व गहरा गुलाबी', 'गहरा गुलाबी (मैजेंटा) व हरा', 'लाल-भूरा व रंगहीन', 'नीला व पीला'],
            correctAnswer: 1,
            explanation: 'गुड़हल सूचक अम्ल में गहरा गुलाबी (मैजेंटा) और क्षारक में हरा रंग देता है।',
            topicReference: 'इकाई २ · प्राकृतिक सूचक',
          },
          {
            id: 'sci-p2-u2-hi-q3',
            question: 'सुनार सोना पिघलाने के लिए मोमबत्ती की ज्वाला के किस क्षेत्र का उपयोग करते हैं?',
            options: ['आंतरिक काला क्षेत्र', 'मध्य पीला क्षेत्र', 'बाहरी नीला अदीप्त क्षेत्र (पूर्ण दहन व सर्वाधिक गर्म)', 'बत्ती का आधार'],
            correctAnswer: 2,
            explanation: 'बाहरी नीले क्षेत्र में पूर्ण दहन होने से तापमान सर्वाधिक होता है।',
            topicReference: 'इकाई २ · दहन एवं ज्वाला',
          },
        ],
      },
    },
  },

  // =========================================================================
  // SCIENCE PAPER II — UNIT 3: PHYSICS (FORCE, HEAT, LIGHT, SOUND, ELECTRICITY)
  // =========================================================================
  {
    slug: 'sci-p2-u3-physics-force-heat-light-electricity',
    unitNumber: 3,
    topicNumber: 3,
    subjectId: 'SCIENCE',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Paper II Syllabus (ctet.nic.in) — Moving Things, People & Ideas (Force, Motion, Friction, Pressure, Sound) + How Things Work (Electricity, Magnets, Heat, Light)',
      mahaTet: 'MSCE Pune MAHA TET Paper II Syllabus (mscepune.in / mahatet.in) — Upper Primary Physics: Motion, Force, Pressure, Heat Transfer, Mirrors/Lenses, Sound & Electric Circuits',
    },
    content: {
      English: {
        documentTitle: 'Science (Paper II) · Unit 3: Physics — Force, Heat, Light, Sound, Electricity & Magnets',
        unitTitle: 'Unit 3: Physics — Mechanics, Heat, Optics, Sound & Electricity',
        topicTitle: 'Force/Pressure/Friction, Heat Transfer, Mirrors & Lenses, Sound Waves, Electric Current & Magnetism',
        subtopics: [
          'Motion, Speed, Pendulum Time Period, Force (Contact vs. Non-contact), Pressure (P = F/A) & Friction (Static > Sliding > Rolling)',
          'Heat & Temperature (Clinical 35°C–42°C vs. Lab −10°C–110°C), Conduction, Convection (Sea/Land Breeze) & Radiation',
          'Light: Laws of Reflection, Plane/Concave/Convex Mirrors, Convex/Concave Lenses & Human Eye',
          'Sound: Vibrations, Frequency (Hz — Pitch), Amplitude (Loudness ∝ A²), Audible Range (20 Hz–20,000 Hz) & Medium',
          'Electricity (Heating, Magnetic & Chemical Effects / Electroplating, Fuse) & Magnets (Poles, Magnetic Compass)',
        ],
        introduction:
          'Physics delivers ~7–8 high-concept questions in Paper II Science—focusing on friction ordering, mirror/lens image formation & real-world applications, clinical thermometer ranges, sound frequency vs. amplitude, and electroplating/circuit concepts.',
        meaningAndDefinition:
          'Pressure is the perpendicular force acting per unit surface area (P = F/A, SI unit: Pascal = N/m²). Smaller contact area multiplies pressure (sharp knife, pointed nail); larger area reduces pressure (broad schoolbag straps, camel feet).',
        detailedExplanation: [
          '1. Friction & Pressure: Static Friction > Sliding Friction > Rolling Friction (which is why wheels and ball bearings drastically reduce friction). Fluid friction is called DRAG (minimized by streamlined shapes like birds/airplanes). Liquid pressure increases with DEPTH and acts equally in all directions at the same depth.',
          '2. Heat Transfer & Thermometers: Clinical Thermometer range = 35°C to 42°C (94°F–108°F) with a KINK preventing mercury from falling back; Normal human body temperature = 37°C (98.6°F); Laboratory thermometer = −10°C to 110°C (no kink). Conduction occurs in solids; Convection in liquids & gases (Sea Breeze during DAY: cool sea → warm land; Land Breeze at NIGHT: cool land → warm sea); Radiation needs NO medium (heat from Sun).',
          '3. Mirrors & Lenses (High-Yield Exam Zone): Plane Mirror → Virtual, erect, same size, laterally inverted, image distance = object distance. Concave Mirror (converging) → Dentists, ENT doctors, shaving mirrors, car headlights, solar furnaces (forms magnified virtual erect image when object is very close; real inverted images otherwise). Convex Mirror (diverging) → Vehicle rear-view mirrors (ALWAYS forms virtual, erect, DIMINISHED image with wide field of view!). Convex Lens (converging) = Magnifying glass / camera / hypermetropia correction. Concave Lens (diverging) = ALWAYS virtual, erect, diminished / myopia correction.',
          '4. Sound: Needs a material medium (cannot travel in vacuum!). Fastest in SOLIDS > Liquids > Gases. Frequency (Hz) determines PITCH/shrillness (higher frequency = higher pitch, e.g., whistle/bird > drum/lion). Amplitude determines LOUDNESS (Loudness ∝ Amplitude²; measured in decibels dB). Human audible range = 20 Hz to 20,000 Hz (<20 Hz Infrasonic; >20,000 Hz Ultrasonic).',
          '5. Electricity & Magnets: Heating effect → Electric iron, heater, FUSE (wire of low melting point, high resistance). Magnetic effect (Hans Christian Oersted) → Electromagnet, electric bell. Chemical effect → Electroplating (coating metal using electric current, e.g., chromium on bicycle rims). Magnets: Like poles repel, unlike poles attract; heating/hammering/dropping demagnetizes a magnet.',
        ],
        importantConcepts: [
          'Friction Order: Static > Sliding > Rolling.',
          'Body Temperature = 37°C = 98.6°F (Formula: F = 9/5 C + 32).',
          'Concave Mirror = Headlights/Dentist; Convex Mirror = Rear-view mirror (ALWAYS virtual, erect, diminished).',
          'Pitch ↔ Frequency (Hz); Loudness ↔ Amplitude² (dB).',
        ],
        comparisonTable: {
          caption: 'Mirrors & Lenses: Image Properties & Practical Uses',
          headers: ['Optical Device', 'Image Nature', 'Classic Exam Applications'],
          rows: [
            ['Plane Mirror', 'Always virtual, erect, same size, laterally inverted', 'Dressing mirror, periscope, kaleidoscope'],
            ['Concave Mirror', 'Real & inverted (or virtual, erect, MAGNIFIED when close)', 'Car headlights, torches, dentist/shaving mirror, solar cooker'],
            ['Convex Mirror', 'ALWAYS virtual, erect, DIMINISHED', 'Vehicle rear-view side mirror (wide view), street lamps'],
            ['Convex Lens', 'Real & inverted (or virtual, erect, MAGNIFIED when close)', 'Magnifying glass, microscope, human eye lens'],
            ['Concave Lens', 'ALWAYS virtual, erect, DIMINISHED', 'Correcting Myopia (short-sightedness), peephole'],
          ],
        },
        practicalExamples: [
          'If a pendulum completes 40 oscillations in 4 seconds: Frequency f = 40/4 = 10 Hz; Time Period T = 1/f = 0.1 s.',
          'A person stands 3 m in front of a plane mirror. Distance between the person and her image = 3 + 3 = 6 m. If she moves 1 m closer, new distance = 2 + 2 = 4 m.',
        ],
        classroomApplications: [
          'Let students shine a torch beam through comb slits onto plane, concave, and convex mirrors to witness convergence and divergence firsthand.',
        ],
        teachingMethods: [
          'Demonstrative Inquiry & Ray-Box / Circuit-Board Lab Stations.',
        ],
        examSpecificFocus: {
          ctet: 'CTET Paper II Science asks 3–4 items EVERY paper on: (1) Static > Sliding > Rolling friction order, (2) Plane/Concave/Convex Mirror & Lens image/uses, (3) Pitch (Frequency) vs. Loudness (Amplitude) & pendulum T/f calculation, (4) Sea/Land breeze & Conduction-Convection-Radiation, and (5) Electric fuse / LED tester / Electroplating.',
          mahaTet: 'MAHA TET Paper II tests Newton’s Laws of Motion, Work-Energy-Power, Ohm’s Law (V = IR), Series vs. Parallel circuits, Temperature conversion (°C ↔ °F ↔ K), and Mirrors/Lenses.',
        },
        importantExamPoints: [
          'Convex Mirror AND Concave Lens BOTH always form Virtual, Erect, Diminished images.',
          'Sound CANNOT travel through a vacuum; Light CAN travel through a vacuum.',
          'Clinical thermometer has a KINK near the bulb and reads 35°C–42°C.',
        ],
        commonMistakes: [
          'Confusing Pitch (Frequency) with Loudness (Amplitude).',
          'Saying Sea Breeze blows at night (Sea Breeze = DAY; Land Breeze = NIGHT!).',
        ],
        topicSummary:
          'Unit 3 synthesizes friction/pressure mechanics, heat transfer modes, mirror/lens optics, sound wave properties, and electrical/magnetic effects for Paper II Science.',
        revisionPoints: [
          'Friction: Static > Sliding > Rolling | P = F / A.',
          'Sea Breeze = Day; Land Breeze = Night; Radiation needs no medium.',
          'Convex Mirror & Concave Lens = Always Virtual, Erect, Diminished.',
          'Pitch = Frequency (20–20,000 Hz); Loudness ∝ Amplitude²; Fuse = Low melting point.',
        ],
        practiceQuestions: [
          {
            id: 'sci-p2-u3-en-q1',
            question: 'Arrange Static Friction, Sliding Friction, and Rolling Friction in DECREASING order of magnitude:',
            options: [
              'Rolling > Sliding > Static',
              'Static > Sliding > Rolling',
              'Sliding > Static > Rolling',
              'Static > Rolling > Sliding',
            ],
            correctAnswer: 1,
            explanation: 'Overcoming inertia at rest requires maximum force (Static), followed by Sliding, and Rolling friction is the smallest.',
            topicReference: 'Unit 3 · Friction',
          },
          {
            id: 'sci-p2-u3-en-q2',
            question: 'Which optical device ALWAYS forms a virtual, erect, and diminished image regardless of object distance, making it ideal as a vehicle rear-view mirror?',
            options: ['Concave mirror', 'Plane mirror', 'Convex mirror', 'Convex lens'],
            correctAnswer: 2,
            explanation: 'A Convex mirror always produces a virtual, erect, diminished image with a wide field of view.',
            topicReference: 'Unit 3 · Mirrors & Lenses',
          },
          {
            id: 'sci-p2-u3-en-q3',
            question: 'A simple pendulum completes 30 oscillations in 6 seconds. What are its Frequency and Time Period respectively?',
            options: ['5 Hz and 0.2 s', '0.2 Hz and 5 s', '180 Hz and 6 s', '6 Hz and 5 s'],
            correctAnswer: 0,
            explanation: 'Frequency f = oscillations / time = 30 / 6 = 5 Hz. Time Period T = 1 / f = 1 / 5 = 0.2 s.',
            topicReference: 'Unit 3 · Sound & Oscillations',
          },
        ],
      },
      Marathi: {
        documentTitle: 'विज्ञान (पेपर २) · घटक ३: भौतिकशास्त्र — बल, उष्णता, प्रकाश, ध्वनी, विद्युत व चुंबकत्व',
        unitTitle: 'घटक ३: बल-दाब-घर्षण, उष्णता, आरसे-भिंगे, ध्वनी व विद्युत',
        topicTitle: 'घर्षण क्रम, दाब, उष्णता संक्रमण, आरसे व भिंगे, ध्वनी वारंवारता-आयाम, विद्युत परिणाम व चुंबक',
        subtopics: [
          'गती, लंबकाचा आवर्तकाल, बल, दाब (P = F/A) व घर्षण (स्थितिक > सरकते > लोटण)',
          'उष्णता व तापमान (वैद्यकीय तापमापी 35°C–42°C), वहन, अभिसरण (खारे-मतलई वारे) व प्रारण',
          'प्रकाश: परावर्तन नियम, सपाट/अंतर्वक्र/बहिर्वक्र आरसे व भिंगे आणि उपयोग',
          'ध्वनी: कंपने, वारंवारता (Hz — तारत्व/Pitch), आयाम (प्रबलता ∝ A²), श्राव्य मर्यादा (20 Hz–20,000 Hz)',
          'विद्युतधारेचे उष्णता (फ्यूज), चुंबकीय (विद्युतचुंबक) व रासायनिक (विद्युतविलेपन) परिणाम',
        ],
        introduction:
          'पेपर २ भौतिकशास्त्रात घर्षण क्रम, आरसे-भिंगांचे उपयोग, खारे-मतलई वारे, ध्वनीचे तारत्व विरुद्ध प्रबलता आणि फ्यूज/विद्युतविलेपन यांवर दरवर्षी ७–८ प्रश्न येतात.',
        meaningAndDefinition:
          'एकक क्षेत्रफळावर लंबदिशेने कार्य करणाऱ्या बलास दाब (Pressure = बल/क्षेत्रफळ; SI एकक: पास्कल) म्हणतात.',
        detailedExplanation: [
          '१. घर्षण व दाब: स्थितिक घर्षण > सरकते घर्षण > लोटण घर्षण (चाके व बॉल-बेअरिंग्ज घर्षण कमी करतात). द्रवाचा दाब खोलीनुसार वाढतो.',
          '२. उष्णता व तापमापी: वैद्यकीय तापमापी 35°C ते 42°C (पारा परत खाली जाऊ नये म्हणून बारीक वाक/Kink असते); सामान्य मानवी तापमान = 37°C (98.6°F). वहन (स्थायू), अभिसरण (द्रव व वायू — दिवसा समुद्राकडून जमिनीकडे खारे वारे; रात्री जमिनीकडून समुद्राकडे मतलई वारे), प्रारण (माध्यमाची गरज नाही — सूर्याची उष्णता).',
          '३. आरसे व भिंगे: अंतर्वक्र आरसा (Concave) → दंतवैद्य, वाहनांचे हेडलाइट, सौरचूल; बहिर्वक्र आरसा (Convex) → वाहनांचे पार्श्वदर्शक आरसे (नेहमी आभासी, सुलट व लहान प्रतिमा, मोठे दृश्यक्षेत्र!). बहिर्वक्र भिंग = भिंगकाच/सूक्ष्मदर्शी; अंतर्वक्र भिंग = नेहमी आभासी, सुलट, लहान (लघुदृष्टी दोष निवारण).',
          '४. ध्वनी: निर्वात पोकळीतून प्रवास करू शकत नाही! वेग क्रम: स्थायू > द्रव > वायू. वारंवारता (Hz) → तारत्व/उच्चत्व (Pitch); आयाम (Amplitude) → प्रबलता/तीव्रता (डेसिबल dB). मानवी श्राव्य मर्यादा = 20 Hz ते 20,000 Hz.',
          '५. विद्युत परिणाम: उष्णता परिणाम → फ्यूज (कमी द्रवणांक, उच्च रोध); चुंबकीय परिणाम (ओर्स्टेड) → विद्युतचुंबक, विद्युतघंटा; रासायनिक परिणाम → विद्युतविलेपन (Electroplating).',
        ],
        importantConcepts: [
          'घर्षण उतरता क्रम: स्थितिक > सरकते > लोटण.',
          'बहिर्वक्र आरसा व अंतर्वक्र भिंग = नेहमी आभासी, सुलट, लहान प्रतिमा.',
          'तारत्व ↔ वारंवारता; प्रबलता ↔ आयाम².',
        ],
        comparisonTable: {
          caption: 'आरसे व भिंगे — प्रतिमा व व्यावहारिक उपयोग',
          headers: ['साधन', 'प्रतिमेचे स्वरूप', 'प्रमुख परीक्षा उपयोग'],
          rows: [
            ['सपाट आरसा', 'आभासी, सुलट, समान आकार, पार्श्वपरिवर्तित', 'चेहरा पाहण्याचा आरसा, परिदर्शी'],
            ['अंतर्वक्र आरसा', 'वास्तव उलट (जवळ असल्यास आभासी, सुलट, मोठी)', 'दंतवैद्य, वाहनांचे हेडलाइट, सौरचूल'],
            ['बहिर्वक्र आरसा', 'नेहमी आभासी, सुलट, लहान', 'वाहनांचे मागील दृश्य पाहण्याचे आरसे'],
            ['बहिर्वक्र भिंग', 'वास्तव उलट / जवळ असल्यास मोठी आभासी', 'विशालक भिंग (Magnifying glass), मानवी डोळा'],
            ['अंतर्वक्र भिंग', 'नेहमी आभासी, सुलट, लहान', 'निकटदृष्टिता (Myopia) निवारण'],
          ],
        },
        practicalExamples: [
          'लंबकाने ६ सेकंदांत ३० दोलने पूर्ण केली तर वारंवारता f = 30/6 = 5 Hz व आवर्तकाल T = 1/5 = 0.2 सेकंद.',
        ],
        classroomApplications: [
          'कंगव्याच्या फटीतून टॉर्चचा प्रकाश आरशावर टाकून अभिसारी व अपसारी किरण प्रत्यक्ष दाखवावेत.',
        ],
        teachingMethods: [
          'प्रत्यक्ष किरण-पेटी व परिपथ प्रयोगशाळा कृती.',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर २ मध्ये घर्षण क्रम, अंतर्वक्र-बहिर्वक्र आरसे व भिंगे, वारंवारता-आयाम व लंबक गणिते, खारे-मतलई वारे व फ्यूज हमखास येतात.',
          mahaTet: 'MAHA TET मध्ये न्यूटनचे गतिविषयक नियम, कार्य-ऊर्जा, ओहमचा नियम (V=IR), एकसर-समांतर जोडणी व तापमान रूपांतरण विचारले जाते.',
        },
        importantExamPoints: [
          'ध्वनी निर्वातातून प्रवास करत नाही; प्रकाश निर्वातातून प्रवास करतो.',
          'खारे वारे दिवसा वाहतात; मतलई वारे रात्री वाहतात.',
        ],
        commonMistakes: [
          'तारत्व (वारंवारता) आणि प्रबलता (आयाम) यांत गोंधळ करणे.',
        ],
        topicSummary:
          'घर्षण-दाब, उष्णता संक्रमण, आरसे-भिंगे, ध्वनीचे गुणधर्म व विद्युत परिणाम हे पेपर २ भौतिकशास्त्राचे मुख्य स्तंभ आहेत.',
        revisionPoints: [
          'स्थितिक > सरकते > लोटण घर्षण | सामान्य शरीर तापमान = 37°C = 98.6°F.',
          'बहिर्वक्र आरसा = पार्श्वदर्शक आरसा (नेहमी आभासी, सुलट, लहान).',
          'श्राव्य ध्वनी = 20 Hz ते 20,000 Hz | फ्यूज = कमी द्रवणांक.',
        ],
        practiceQuestions: [
          {
            id: 'sci-p2-u3-mr-q1',
            question: 'स्थितिक, सरकते आणि लोटण घर्षण यांचा अचूक उतरता क्रम कोणता?',
            options: ['लोटण > सरकते > स्थितिक', 'स्थितिक > सरकते > लोटण', 'सरकते > स्थितिक > लोटण', 'स्थितिक > लोटण > सरकते'],
            correctAnswer: 1,
            explanation: 'स्थितिक घर्षण सर्वाधिक असते व लोटण घर्षण सर्वात कमी असते.',
            topicReference: 'घटक ३ · घर्षण',
          },
          {
            id: 'sci-p2-u3-mr-q2',
            question: 'वाहनांच्या बाजूच्या पार्श्वदर्शक आरशासाठी कोणता आरसा वापरतात कारण तो नेहमी आभासी, सुलट व लहान प्रतिमा देतो?',
            options: ['अंतर्वक्र आरसा', 'सपाट आरसा', 'बहिर्वक्र आरसा (Convex Mirror)', 'बहिर्वक्र भिंग'],
            correctAnswer: 2,
            explanation: 'बहिर्वक्र आरसा नेहमी आभासी, सुलट, लहान प्रतिमा व मोठे दृश्यक्षेत्र देतो.',
            topicReference: 'घटक ३ · आरसे व भिंगे',
          },
          {
            id: 'sci-p2-u3-mr-q3',
            question: 'एका लंबकाने ६ सेकंदांत ३० दोलने पूर्ण केली. त्याची वारंवारता व आवर्तकाल अनुक्रमे किती?',
            options: ['5 Hz आणि 0.2 से', '0.2 Hz आणि 5 से', '180 Hz आणि 6 से', '6 Hz आणि 5 से'],
            correctAnswer: 0,
            explanation: 'वारंवारता f = 30/6 = 5 Hz; आवर्तकाल T = 1/f = 0.2 सेकंद.',
            topicReference: 'घटक ३ · ध्वनी व दोलने',
          },
        ],
      },
      Hindi: {
        documentTitle: 'विज्ञान (पेपर २) · इकाई ३: भौतिक विज्ञान — बल, ऊष्मा, प्रकाश, ध्वनि, विद्युत एवं चुंबकत्व',
        unitTitle: 'इकाई ३: यांत्रिकी, ऊष्मा, प्रकाशिकी, ध्वनि एवं विद्युत',
        topicTitle: 'बल-दाब-घर्षण, ऊष्मा संचरण, दर्पण व लेंस, ध्वनि तारत्व-प्रबलता, विद्युत प्रभाव एवं चुंबक',
        subtopics: [
          'गति, लोलक आवर्तकाल, बल, दाब (P = F/A) व घर्षण क्रम (स्थैतिक > सर्पी > लोटनिक)',
          'ऊष्मा व ताप (डॉक्टरी थर्मामीटर 35°C–42°C), चालन, संवहन (समुद्री व थल समीर) एवं विकिरण',
          'प्रकाश: परावर्तन, समतल/अवतल/उत्तल दर्पण तथा उत्तल/अवतल लेंस के उपयोग',
          'ध्वनि: आवृत्ति (Hz — तारत्व/Pitch), आयाम (प्रबलता ∝ A²), श्रव्य परास (20 Hz–20,000 Hz)',
          'विद्युत धारा के ऊष्मीय (फ्यूज), चुंबकीय (विद्युत चुंबक) व रासायनिक (विद्युत लेपन) प्रभाव',
        ],
        introduction:
          'पेपर २ भौतिक विज्ञान से ७–८ अवधारणात्मक प्रश्न आते हैं—घर्षण क्रम, दर्पण-लेंस उपयोग, ऊष्मा संचरण, ध्वनि आवृत्ति-आयाम और फ्यूज/विद्युत लेपन सर्वाधिक महत्वपूर्ण हैं।',
        meaningAndDefinition:
          'प्रति एकांक क्षेत्रफल पर लगने वाले लंबवत बल को दाब (P = F/A; SI मात्रक: पास्कल) कहते हैं।',
        detailedExplanation: [
          '१. घर्षण व दाब: स्थैतिक घर्षण > सर्पी घर्षण > लोटनिक घर्षण। द्रव का दाब गहराई के साथ बढ़ता है।',
          '२. ऊष्मा व थर्मामीटर: डॉक्टरी थर्मामीटर 35°C–42°C (विभंग/Kink पारे को नीचे गिरने से रोकता है); मानव शरीर का सामान्य ताप = 37°C (98.6°F)। चालन (ठोस), संवहन (द्रव-गैस: दिन में समुद्री समीर; रात में थल समीर), विकिरण (माध्यम आवश्यक नहीं — सूर्य ऊष्मा)।',
          '३. दर्पण व लेंस: अवतल दर्पण (Concave) → दंत चिकित्सक, वाहन हेडलाइट, सौर भट्टी; उत्तल दर्पण (Convex) → वाहन पश्च-दृश्य दर्पण (सदैव आभासी, सीधा, छोटा प्रतिबिंब व विस्तृत दृष्टि क्षेत्र)। उत्तल लेंस = आवर्धक काँच/नेत्र लेंस; अवतल लेंस = सदैव आभासी, सीधा, छोटा (निकट दृष्टि दोष निवारण)।',
          '४. ध्वनि: निर्वात में संचरण नहीं करती! वेग क्रम: ठोस > द्रव > गैस। आवृत्ति (Hz) = तारत्व (Pitch); आयाम = प्रबलता (डेसिबल dB)। मानव श्रव्य परास = 20 Hz से 20,000 Hz।',
          '५. विद्युत प्रभाव: ऊष्मीय प्रभाव → फ्यूज (कम गलनांक, उच्च प्रतिरोध); चुंबकीय प्रभाव (ऑर्स्टेड) → विद्युत चुंबक; रासायनिक प्रभाव → विद्युत लेपन (Electroplating)।',
        ],
        importantConcepts: [
          'घर्षण क्रम: स्थैतिक > सर्पी > लोटनिक।',
          'उत्तल दर्पण तथा अवतल लेंस दोनों सदैव आभासी, सीधा व छोटा प्रतिबिंब बनाते हैं।',
          'तारत्व ↔ आवृत्ति; प्रबलता ↔ आयाम²।',
        ],
        comparisonTable: {
          caption: 'दर्पण एवं लेंस: प्रतिबिंब व प्रमुख उपयोग',
          headers: ['प्रकाशीय युक्ति', 'प्रतिबिंब प्रकृति', 'परीक्षा उपयोग'],
          rows: [
            ['समतल दर्पण', 'आभासी, सीधा, समान आकार, पार्श्व परिवर्तित', 'ड्रेसिंग मिरर, परिदर्शी'],
            ['अवतल दर्पण', 'वास्तविक उल्टा (अति निकट होने पर बड़ा आभासी)', 'दंत चिकित्सक, हेडलाइट, सौर कुकर'],
            ['उत्तल दर्पण', 'सदैव आभासी, सीधा, छोटा', 'वाहन पश्च-दृश्य (Side Mirror)'],
            ['उत्तल लेंस', 'वास्तविक उल्टा / निकट बड़ा आभासी', 'आवर्धक लेंस, सूक्ष्मदर्शी, नेत्र'],
            ['अवतल लेंस', 'सदैव आभासी, सीधा, छोटा', 'निकट दृष्टि दोष (Myopia)'],
          ],
        },
        practicalExamples: [
          '६ सेकंड में ३० दोलन करने वाले लोलक की आवृत्ति f = 30/6 = 5 Hz तथा आवर्तकाल T = 1/5 = 0.2 सेकंड।',
        ],
        classroomApplications: [
          'किरण-पेटी व सरल परिपथ द्वारा दर्पण अभिसरण और विद्युत चुंबकत्व का प्रत्यक्ष प्रदर्शन करें।',
        ],
        teachingMethods: [
          'प्रयोगात्मक अन्वेषण एवं किरण-आरेख अभ्यास।',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर २ में घर्षण क्रम, दर्पण-लेंस उपयोग, आवृत्ति-आयाम व लोलक गणना, समुद्री-थल समीर व फ्यूज/विद्युत लेपन हर बार आते हैं।',
          mahaTet: 'MAHA TET में न्यूटन के नियम, कार्य-ऊर्जा, ओम का नियम (V=IR), श्रेणी-समांतर परिपथ व ताप रूपांतरण प्रमुख हैं।',
        },
        importantExamPoints: [
          'ध्वनि निर्वात में नहीं चल सकती; प्रकाश निर्वात में चलता है।',
          'समुद्री समीर दिन में और थल समीर रात में चलती है।',
        ],
        commonMistakes: [
          'तारत्व (आवृत्ति) और प्रबलता (आयाम) को आपस में मिला देना।',
        ],
        topicSummary:
          'घर्षण-दाब, ऊष्मा संचरण, दर्पण-लेंस, ध्वनि तरंगें व विद्युत प्रभाव पेपर २ भौतिक विज्ञान के अनिवार्य विषय हैं।',
        revisionPoints: [
          'स्थैतिक > सर्पी > लोटनिक घर्षण | मानव ताप = 37°C = 98.6°F।',
          'उत्तल दर्पण = पश्च-दृश्य दर्पण (सदैव आभासी, सीधा, छोटा)।',
          'श्रव्य ध्वनि = 20–20,000 Hz | फ्यूज = निम्न गलनांक।',
        ],
        practiceQuestions: [
          {
            id: 'sci-p2-u3-hi-q1',
            question: 'स्थैतिक, सर्पी तथा लोटनिक घर्षण को घटते क्रम में व्यवस्थित कीजिए:',
            options: ['लोटनिक > सर्पी > स्थैतिक', 'स्थैतिक > सर्पी > लोटनिक', 'सर्पी > स्थैतिक > लोटनिक', 'स्थैतिक > लोटनिक > सर्पी'],
            correctAnswer: 1,
            explanation: 'स्थैतिक घर्षण अधिकतम और लोटनिक घर्षण न्यूनतम होता है।',
            topicReference: 'इकाई ३ · घर्षण',
          },
          {
            id: 'sci-p2-u3-hi-q2',
            question: 'कौन-सा दर्पण सदैव आभासी, सीधा और छोटा प्रतिबिंब बनाता है जिससे वाहनों के साइड मिरर में प्रयुक्त होता है?',
            options: ['अवतल दर्पण', 'समतल दर्पण', 'उत्तल दर्पण (Convex Mirror)', 'उत्तल लेंस'],
            correctAnswer: 2,
            explanation: 'उत्तल दर्पण सदैव आभासी, सीधा, छोटा प्रतिबिंब और विस्तृत दृष्टि क्षेत्र देता है।',
            topicReference: 'इकाई ३ · दर्पण एवं लेंस',
          },
          {
            id: 'sci-p2-u3-hi-q3',
            question: 'एक सरल लोलक ६ सेकंड में ३० दोलन पूर्ण करता है। इसकी आवृत्ति व आवर्तकाल क्रमशः क्या हैं?',
            options: ['5 Hz और 0.2 s', '0.2 Hz और 5 s', '180 Hz और 6 s', '6 Hz और 5 s'],
            correctAnswer: 0,
            explanation: 'आवृत्ति f = 30/6 = 5 Hz; आवर्तकाल T = 1/f = 0.2 सेकंड।',
            topicReference: 'इकाई ३ · ध्वनि एवं दोलन',
          },
        ],
      },
    },
  },

  // =========================================================================
  // SCIENCE PAPER II — UNIT 4: NATURAL PHENOMENA, RESOURCES & SCIENCE PEDAGOGY
  // =========================================================================
  {
    slug: 'sci-p2-u4-phenomena-resources-science-pedagogy',
    unitNumber: 4,
    topicNumber: 4,
    subjectId: 'SCIENCE',
    applicableExams: ['CTET', 'MAHA_TET'],
    applicablePapers: ['PAPER_2'],
    syllabusSourceRef: {
      ctet: 'CBSE CTET Paper II Syllabus (ctet.nic.in) — Natural Phenomena, Natural Resources & Pedagogical Issues of Science (10 Marks): Nature of Science, NCF 2005 6 Validities, Inquiry, Lab/Project & Evaluation',
      mahaTet: 'MSCE Pune MAHA TET Paper II Syllabus (mscepune.in / mahatet.in) — Lightning, Earthquakes, Solar System, Conservation & Science Pedagogy (Scientific Method, Inquiry, Remediation)',
    },
    content: {
      English: {
        documentTitle: 'Science (Paper II) · Unit 4: Natural Phenomena, Resources & Science Pedagogy',
        unitTitle: 'Unit 4: Natural Phenomena, Conservation & Pedagogy of Science',
        topicTitle: 'Lightning, Earthquakes, Solar System, Greenhouse Effect & Science Pedagogy (Nature of Science, 6 NCF Validities, Inquiry)',
        subtopics: [
          'Natural Phenomena: Static Charge & Lightning Conductor, Earthquakes (Richter Scale, Seismograph, Focus vs. Epicentre)',
          'Solar System (Inner vs. Outer Planets, Venus/Uranus retrograde rotation, Asteroids, Comets, Constellations)',
          'Natural Resources: Coal/Petroleum (Exhaustible), Acid Rain (SO₂ & NO₂), Greenhouse Effect & Ozone Layer (CFCs)',
          'Nature of Science: Tentative (subject to revision), Empirical, Evidence-Based, Creative, Non-dogmatic',
          'NCF 2005 Six Criteria of Validity in Science Curriculum + Observation vs. Inference + Inquiry/5E Model & Remediation',
        ],
        introduction:
          'Science Pedagogy carries 10 out of 30 marks in CTET Paper II Science and is equally vital in MAHA TET. Understanding the "Nature of Science" (tentative, empirical, non-authoritarian), NCF 2005’s Six Validities, Observation vs. Inference, and natural phenomena ensures full mastery.',
        meaningAndDefinition:
          'Science is both a dynamic PROCESS of inquiry (observing, hypothesizing, experimenting, analysing evidence) and an evolving, TENTATIVE body of knowledge open to revision whenever stronger empirical evidence emerges.',
        detailedExplanation: [
          '1. Natural Phenomena & Environment: Lightning is caused by static charge accumulation; a copper Lightning Conductor safely grounds charge. Earthquake magnitude is measured on the logarithmic RICHTER SCALE using a SEISMOGRAPH (every +2 rise means 1,000× more destructive energy!). Acid Rain is caused primarily by Sulphur Dioxide (SO₂) and Nitrogen Dioxide (NO₂) forming H₂SO₄ & HNO₃ (corrodes Taj Mahal — "Marble Cancer"). Greenhouse gases: CO₂, Methane (CH₄), Nitrous Oxide, Water Vapour. Ozone depletion: Chlorofluorocarbons (CFCs).',
          '2. Solar System Essentials: Inner rocky planets (Mercury, Venus, Earth, Mars); Outer gas/ice giants (Jupiter, Saturn, Uranus, Neptune). Asteroid Belt lies between Mars and Jupiter. Venus (hottest & brightest — "Morning/Evening Star") and Uranus rotate EAST-to-WEST (opposite to Earth!).',
          '3. Nature of Science (Crucial CTET Theme): Scientific knowledge is (a) TENTATIVE/Provisional (NOT absolute, permanent, or unchangeable!), (b) Empirically evidence-based, (c) Requires imagination & creativity, (d) Socially & culturally embedded, and (e) Scientific Law (describes WHAT happens) ≠ Scientific Theory (explains WHY/HOW it happens — a theory does NOT "graduate" into a law!).',
          '4. NCF 2005 Six Validities of Good Science Education: (1) Cognitive Validity (age-appropriate concepts), (2) Content Validity (scientifically accurate, never diluted into falsehood), (3) Process Validity (engaging learners in methods of generating scientific knowledge — curiosity & inquiry), (4) Historical Validity (showing how scientific ideas evolved over time), (5) Environmental Validity (connecting to local environment & work), (6) Ethical Validity (honesty, objectivity, freedom from fear & prejudice).',
          '5. Observation vs. Inference & 5E Model: Observation is directly gathered via senses ("The iron nail turned reddish-brown"). Inference is the logical conclusion drawn from observation ("Rust formed due to oxidation"). Rodger Bybee’s 5E Constructivist Model: Engage → Explore → Explain → Elaborate → Evaluate.',
        ],
        importantConcepts: [
          'Nature of Science: Tentative (open to revision), empirical, creative — NEVER rigid or absolute.',
          'Scientific Theory ≠ unproved guess, and Theories do NOT become Laws!',
          'Observation = direct sensory data; Inference = logical interpretation of data.',
          'Acid Rain gases = SO₂ + NO₂; Ozone depletion = CFCs.',
        ],
        comparisonTable: {
          caption: 'NCF 2005 Six Validities of a Good Science Curriculum',
          headers: ['Validity Type', 'Core Meaning'],
          rows: [
            ['Cognitive Validity', 'Age-appropriate content & language matching child’s cognitive level'],
            ['Content Validity', 'Scientifically accurate facts; simplified without becoming wrong'],
            ['Process Validity', 'Involves learners in scientific processes (observing, experimenting, inferring)'],
            ['Historical Validity', 'Appreciates how scientific concepts evolved across history & society'],
            ['Environmental Validity', 'Links science to local surroundings, sustainability & daily life'],
            ['Ethical Validity', 'Promotes honesty, objectivity, cooperation & freedom from prejudice'],
          ],
        },
        practicalExamples: [
          '"The plant kept inside the dark cupboard has yellow, weak leaves" = OBSERVATION. "Plants need sunlight to produce chlorophyll" = INFERENCE.',
        ],
        classroomApplications: [
          'Use the 5E Inquiry cycle (Engage → Explore → Explain → Elaborate → Evaluate) and Open-Ended Investigative Projects rather than cookbook verification labs.',
        ],
        teachingMethods: [
          '5E Constructivist Model, Discovery/Inquiry Approach, Demonstration-cum-Discussion, and Investigative Project Method.',
        ],
        examSpecificFocus: {
          ctet: 'CTET Paper II Science Pedagogy tests EVERY exam: (1) Science is TENTATIVE (not permanent/absolute), (2) Theory vs. Law misconception, (3) NCF 2005 Six Validities (especially Process, Cognitive & Historical Validity), (4) Observation vs. Inference distinction, and (5) Open-ended vs. Close-ended science questions.',
          mahaTet: 'MAHA TET tests Richter Scale/Seismograph, Acid Rain/Greenhouse/Ozone, Solar System facts, Steps of Scientific Method, and Science Fair/Lab management.',
        },
        importantExamPoints: [
          'Science is TENTATIVE (subject to change with new evidence) — NEVER select options calling scientific facts "final/absolute/unchangeable"!',
          'A Scientific Theory does NOT turn into a Scientific Law after more proof; they serve different roles (Theory = explains WHY; Law = describes WHAT).',
          'Process Validity nurtures curiosity, experimentation, and learning how to learn science.',
        ],
        commonMistakes: [
          'Believing "a well-tested hypothesis becomes a theory, and a well-tested theory becomes a law" (CLASSIC CTET TRAP — FALSE!).',
          'Confusing Observation (what you directly see/measure) with Inference (what you conclude).',
        ],
        topicSummary:
          'Unit 4 pairs Earth/Space phenomena and environmental conservation with core Science Pedagogy—nature of science, NCF 2005’s six validities, observation vs. inference, and 5E inquiry.',
        revisionPoints: [
          'Earthquake = Seismograph / Richter Scale; Acid Rain = SO₂ & NO₂; Ozone = CFCs.',
          'Venus & Uranus rotate East → West; Asteroid Belt = between Mars & Jupiter.',
          'Science is TENTATIVE & empirical; Theory explains WHY, Law describes WHAT.',
          '6 NCF Validities: Cognitive, Content, Process, Historical, Environmental, Ethical.',
        ],
        practiceQuestions: [
          {
            id: 'sci-p2-u4-en-q1',
            question: 'Which statement accurately reflects the "Nature of Science" according to NCF 2005 and CTET Science Pedagogy?',
            options: [
              'Scientific facts are permanent, absolute truths that never change.',
              'A scientific theory turns into a scientific law once enough proof is collected.',
              'Scientific knowledge is tentative, empirical, and open to revision with new evidence.',
              'Science requires zero imagination or creativity.',
            ],
            correctAnswer: 2,
            explanation: 'Science is inherently tentative (provisional), empirically grounded, creative, and revisable whenever better evidence arises.',
            topicReference: 'Unit 4 · Nature of Science',
          },
          {
            id: 'sci-p2-u4-en-q2',
            question: 'According to NCF 2005, ensuring that a science curriculum engages learners in acquiring the methods and processes of generating scientific knowledge satisfies:',
            options: ['Historical Validity', 'Process Validity', 'Ethical Validity', 'Content Validity'],
            correctAnswer: 1,
            explanation: 'Process Validity requires curriculum to involve learners in observing, experimenting, hypothesizing, and nurturing scientific curiosity.',
            topicReference: 'Unit 4 · NCF 2005 Six Validities',
          },
          {
            id: 'sci-p2-u4-en-q3',
            question: 'Which two atmospheric pollutant gases react with rainwater to cause Acid Rain (responsible for "Marble Cancer" on monuments)?',
            options: [
              'Oxygen and Nitrogen',
              'Sulphur Dioxide (SO₂) and Nitrogen Dioxide (NO₂)',
              'Helium and Argon',
              'Hydrogen and Ozone',
            ],
            correctAnswer: 1,
            explanation: 'SO₂ and NO₂ react with atmospheric water vapour to form Sulphuric Acid (H₂SO₄) and Nitric Acid (HNO₃), causing Acid Rain.',
            topicReference: 'Unit 4 · Environmental Pollution',
          },
        ],
      },
      Marathi: {
        documentTitle: 'विज्ञान (पेपर २) · घटक ४: नैसर्गिक घटना, संसाधने व विज्ञान अध्यापनशास्त्र',
        unitTitle: 'घटक ४: नैसर्गिक आपत्ती, सूर्यमाला व विज्ञान अध्यापनशास्त्र',
        topicTitle: 'विजा-भूकंप, सूर्यमाला, आम्ल वर्षा, विज्ञानाचे स्वरूप, NCF 2005 सहा वैधता व अन्वेषण पद्धती',
        subtopics: [
          'नैसर्गिक घटना: तडितरक्षक (विजा), भूकंप (रिष्टर स्केल, सिस्मोग्राफ, भूकंपनाभी व अपिकेंद्र)',
          'सूर्यमाला (अंतर्ग्रह विरुद्ध बहिर्ग्रह, शुक्र व युरेनस पूर्व-पश्चिम परिवलन, लघुग्रह पट्टा)',
          'पर्यावरण समस्या: आम्ल वर्षा (SO₂ व NO₂), हरितगृह परिणाम (CO₂, CH₄) व ओझोन थर क्षय (CFC)',
          'विज्ञानाचे स्वरूप: तात्पुरते/परिवर्तनशील (Tentative), पुराव्यावर आधारित व सर्जनशील',
          'NCF 2005 विज्ञान अभ्यासक्रमाच्या ६ वैधता, निरीक्षण विरुद्ध अनुमान व 5E अन्वेषण मॉडेल',
        ],
        introduction:
          'CTET पेपर २ मध्ये विज्ञान अध्यापनशास्त्राला १० गुण असतात. विज्ञानाचे परिवर्तनशील (Tentative) स्वरूप, NCF 2005 च्या ६ वैधता, निरीक्षण विरुद्ध अनुमान आणि नैसर्गिक आपत्ती हे अत्यंत महत्त्वाचे घटक आहेत.',
        meaningAndDefinition:
          'विज्ञान म्हणजे केवळ तथ्यांचा संग्रह नव्हे, तर निरीक्षण, परिकल्पना, प्रयोग व पुराव्यांद्वारे सत्य शोधण्याची गतिशील प्रक्रिया आणि नवीन पुराव्यानुसार बदलणारे (Tentative) ज्ञान होय.',
        detailedExplanation: [
          '१. नैसर्गिक घटना व पर्यावरण: भूकंपाची तीव्रता रिष्टर स्केलवर सिस्मोग्राफने मोजतात. आम्ल वर्षा (Acid Rain) प्रामुख्याने सल्फर डायऑक्साइड (SO₂) व नायट्रोजन डायऑक्साइड (NO₂) मुळे होते (ताजमहालचा "मार्बल कॅन्सर"). हरितगृह वायू: CO₂, मिथेन. ओझोन थराचा ऱ्हास: क्लोरोफ्लुरोकार्बन्स (CFCs).',
          '२. सूर्यमाला: अंतर्ग्रह (बुध, शुक्र, पृथ्वी, मंगळ); बहिर्ग्रह (गुरू, शनी, युरेनस, नेपच्यून). लघुग्रह पट्टा मंगळ व गुरू दरम्यान आहे. शुक्र (सर्वात उष्ण व तेजस्वी) आणि युरेनस पूर्वेकडून पश्चिमेकडे फिरतात.',
          '३. विज्ञानाचे स्वरूप: वैज्ञानिक ज्ञान तात्पुरते/परिवर्तनशील (Tentative) असते (ते कायमस्वरूपी अंतिम सत्य नसते!). वैज्ञानिक नियम ("काय घडते?") आणि वैज्ञानिक सिद्धांत ("का/कसे घडते?") वेगवेगळे आहेत — सिद्धांत कधीही नियमात रूपांतरित होत नाही!',
          '४. NCF 2005 च्या ६ वैधता: (१) संज्ञानात्मक वैधता (वयानुसार योग्य), (२) आशय वैधता (शास्त्रीयदृष्ट्या अचूक), (३) प्रक्रिया वैधता (निरीक्षण-प्रयोग-अन्वेषण सहभाग), (४) ऐतिहासिक वैधता (वैज्ञानिक कल्पनांचा ऐतिहासिक विकास), (५) पर्यावरणीय वैधता (स्थानिक परिसराशी जोडणी), (६) नैतिक वैधता (प्रामाणिकपणा, वस्तुनिष्ठता, अंधश्रद्धा मुक्ती).',
          '५. निरीक्षण विरुद्ध अनुमान व 5E मॉडेल: इंद्रियांद्वारे थेट जाणवलेले तथ्य = निरीक्षण; त्यावरून काढलेला तार्किक निष्कर्ष = अनुमान. 5E मॉडेल: Engage → Explore → Explain → Elaborate → Evaluate.',
        ],
        importantConcepts: [
          'विज्ञानाचे ज्ञान परिवर्तनशील (Tentative) व पुराव्याधिष्ठित असते.',
          'निरीक्षण = थेट अनुभव; अनुमान = तार्किक निष्कर्ष.',
          'आम्ल वर्षा = SO₂ + NO₂; ओझोन क्षय = CFCs.',
        ],
        comparisonTable: {
          caption: 'NCF 2005 च्या विज्ञान शिक्षणाच्या ६ वैधता',
          headers: ['वैधता प्रकार', 'मुख्य अर्थ'],
          rows: [
            ['संज्ञानात्मक वैधता', 'विद्यार्थ्याच्या वयानुसार व बौद्धिक पातळीनुसार विषयवस्तू'],
            ['आशय वैधता', 'शास्त्रीयदृष्ट्या अचूक व त्रुटीविरहित माहिती'],
            ['प्रक्रिया वैधता', 'निरीक्षण, प्रयोग व वैज्ञानिक पद्धतींत विद्यार्थ्यांचा सक्रिय सहभाग'],
            ['ऐतिहासिक वैधता', 'वैज्ञानिक कल्पनांचा कालानुरूप ऐतिहासिक प्रवास समजणे'],
            ['पर्यावरणीय वैधता', 'विज्ञानाची स्थानिक पर्यावरण व दैनंदिन जीवनाशी सांगड'],
            ['नैतिक वैधता', 'प्रामाणिकपणा, वस्तुनिष्ठता व पूर्वग्रहमुक्ती'],
          ],
        },
        practicalExamples: [
          '"अंधाऱ्या कपाटातील रोपाची पाने पिवळी पडली" = निरीक्षण; "हरितद्रव्य निर्मितीसाठी सूर्यप्रकाश आवश्यक असतो" = अनुमान.',
        ],
        classroomApplications: [
          'केवळ पाठ्यपुस्तकीय प्रयोग न घेता 5E अन्वेषण चक्रावर आधारित मुक्तोत्तरी प्रकल्प घ्यावेत.',
        ],
        teachingMethods: [
          '5E ज्ञानरचनावादी मॉडेल, अन्वेषण पद्धती व प्रकल्प पद्धती.',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर २ मध्ये विज्ञानाचे परिवर्तनशील (Tentative) स्वरूप, सिद्धांत विरुद्ध नियम, NCF 2005 च्या ६ वैधता व निरीक्षण-अनुमान फरक हमखास येतात.',
          mahaTet: 'MAHA TET मध्ये रिष्टर स्केल, आम्ल वर्षा, ओझोन, सूर्यमाला व वैज्ञानिक पद्धतीचे टप्पे विचारले जातात.',
        },
        importantExamPoints: [
          'विज्ञान "कायमस्वरूपी अपरिवर्तनीय सत्य" आहे हा पर्याय नेहमी चुकीचा असतो — विज्ञान परिवर्तनशील (Tentative) आहे.',
          'वैज्ञानिक सिद्धांत कधीही "नियम" बनत नाही.',
        ],
        commonMistakes: [
          'निरीक्षण आणि अनुमान यांतील फरक न ओळखणे.',
        ],
        topicSummary:
          'नैसर्गिक घटना, पर्यावरण रक्षण, विज्ञानाचे परिवर्तनशील स्वरूप व NCF 2005 च्या सहा वैधता पेपर २ विज्ञान अध्यापनाचे सार आहेत.',
        revisionPoints: [
          'भूकंप = सिस्मोग्राफ/रिष्टर स्केल; आम्ल वर्षा = SO₂ व NO₂; ओझोन = CFCs.',
          'विज्ञान = परिवर्तनशील (Tentative) व पुराव्यावर आधारित.',
          '६ वैधता: संज्ञानात्मक, आशय, प्रक्रिया, ऐतिहासिक, पर्यावरणीय, नैतिक.',
        ],
        practiceQuestions: [
          {
            id: 'sci-p2-u4-mr-q1',
            question: 'NCF 2005 नुसार "विज्ञानाचे स्वरूप" अचूकपणे दर्शवणारे विधान कोणते?',
            options: [
              'वैज्ञानिक तथ्ये कायमस्वरूपी व अपरिवर्तनीय अंतिम सत्ये असतात.',
              'वैज्ञानिक सिद्धांत पुरेशा पुराव्यानंतर नियमात बदलतो.',
              'वैज्ञानिक ज्ञान परिवर्तनशील (Tentative), पुराव्यावर आधारित व नवीन शोधांनुसार सुधारणाक्षम असते.',
              'विज्ञानात कल्पनाशक्तीला स्थान नसते.',
            ],
            correctAnswer: 2,
            explanation: 'वैज्ञानिक ज्ञान पुराव्यावर आधारित असून नवीन पुराव्यानुसार त्यात सुधारणा होते (Tentative).',
            topicReference: 'घटक ४ · विज्ञानाचे स्वरूप',
          },
          {
            id: 'sci-p2-u4-mr-q2',
            question: 'विद्यार्थ्यांना वैज्ञानिक ज्ञाननिर्मितीच्या प्रक्रियांमध्ये (निरीक्षण, प्रयोग, परिकल्पना) सक्रिय सहभागी करणे ही NCF 2005 ची कोणती वैधता आहे?',
            options: ['ऐतिहासिक वैधता', 'प्रक्रिया वैधता (Process Validity)', 'नैतिक वैधता', 'आशय वैधता'],
            correctAnswer: 1,
            explanation: 'वैज्ञानिक पद्धती व प्रक्रियांमध्ये विद्यार्थ्यांचा सहभाग म्हणजे प्रक्रिया वैधता होय.',
            topicReference: 'घटक ४ · NCF 2005 वैधता',
          },
          {
            id: 'sci-p2-u4-mr-q3',
            question: 'आम्ल वर्षा (Acid Rain) कोणत्या दोन प्रमुख प्रदूषक वायूंमुळे होते?',
            options: ['ऑक्सिजन व नायट्रोजन', 'सल्फर डायऑक्साइड (SO₂) व नायट्रोजन डायऑक्साइड (NO₂)', 'हेलियम व अरगॉन', 'हायड्रोजन व ओझोन'],
            correctAnswer: 1,
            explanation: 'SO₂ आणि NO₂ पावसाच्या पाण्याशी संयोग पावून सल्फ्युरिक व नायट्रिक आम्ल तयार करतात.',
            topicReference: 'घटक ४ · पर्यावरण प्रदूषण',
          },
        ],
      },
      Hindi: {
        documentTitle: 'विज्ञान (पेपर २) · इकाई ४: प्राकृतिक परिघटनाएँ, संसाधन एवं विज्ञान शिक्षाशास्त्र',
        unitTitle: 'इकाई ४: प्राकृतिक आपदाएँ, सौरमंडल एवं विज्ञान शिक्षाशास्त्र',
        topicTitle: 'तड़ित-भूकंप, सौरमंडल, अम्ल वर्षा, विज्ञान की प्रकृति, NCF 2005 छह वैधताएँ एवं अन्वेषण',
        subtopics: [
          'प्राकृतिक परिघटनाएँ: तड़ित चालक, भूकंप (रिक्टर पैमाना, भूकंपलेखी/Seismograph)',
          'सौरमंडल (आंतरिक बनाम बाह्य ग्रह, शुक्र व अरुण का पूर्व-पश्चिम घूर्णन, क्षुद्रग्रह पट्टी)',
          'प्राकृतिक संसाधन व प्रदूषण: अम्ल वर्षा (SO₂ व NO₂), हरितगृह प्रभाव एवं ओज़ोन परत क्षरण (CFC)',
          'विज्ञान की प्रकृति: अनंतिम/परिवर्तनशील (Tentative), साक्ष्य-आधारित एवं सृजनात्मक',
          'NCF 2005 की ६ वैधताएँ, अवलोकन बनाम निष्कर्ष एवं 5E अन्वेषण मॉडल',
        ],
        introduction:
          'CTET पेपर २ विज्ञान में १० अंक विज्ञान शिक्षाशास्त्र के हैं। विज्ञान की अनंतिम (Tentative) प्रकृति, NCF 2005 की छह वैधताएँ और अवलोकन-निष्कर्ष का भेद सर्वाधिक पूछा जाता है।',
        meaningAndDefinition:
          'विज्ञान अवलोकन, परिकल्पना और प्रयोग की गतिशील अन्वेषण प्रक्रिया के साथ-साथ साक्ष्य पर आधारित एक अनंतिम (Tentative) ज्ञान प्रणाली है।',
        detailedExplanation: [
          '१. प्राकृतिक परिघटनाएँ व प्रदूषण: भूकंप की तीव्रता भूकंपलेखी (Seismograph) द्वारा रिक्टर पैमाने पर मापी जाती है। अम्ल वर्षा SO₂ व NO₂ से होती है (ताजमहल का संगमरमर कैंसर)। हरितगृह गैसें: CO₂, मेथेन। ओज़ोन क्षरण: क्लोरोफ्लोरोकार्बन (CFC)।',
          '२. सौरमंडल: आंतरिक ग्रह (बुध, शुक्र, पृथ्वी, मंगल); बाह्य ग्रह (बृहस्पति, शनि, अरुण, वरुण)। क्षुद्रग्रह पट्टी मंगल और बृहस्पति के बीच है। शुक्र व अरुण पूर्व से पश्चिम घूर्णन करते हैं।',
          '३. विज्ञान की प्रकृति: वैज्ञानिक ज्ञान अनंतिम/अस्थायी (Tentative) है (कभी अंतिम/अपरिवर्तनीय नहीं!), साक्ष्य-आधारित और कल्पनाशील है। वैज्ञानिक सिद्धांत (क्यों/कैसे की व्याख्या) कभी नियम (क्या होता है) में नहीं बदलता।',
          '४. NCF 2005 की ६ वैधताएँ: (१) संज्ञानात्मक वैधता (आयु-अनुरूप), (२) विषयवस्तु वैधता (वैज्ञानिक रूप से सटीक), (३) प्रक्रिया वैधता (वैज्ञानिक विधियों व अन्वेषण में सहभागिता), (४) ऐतिहासिक वैधता (वैज्ञानिक विचारों का विकास), (५) पर्यावरणीय वैधता (स्थानीय परिवेश से जुड़ाव), (६) नैतिक वैधता (ईमानदारी, वस्तुनिष्ठता व पूर्वाग्रह-मुक्ति)।',
          '५. अवलोकन बनाम निष्कर्ष एवं 5E मॉडल: इंद्रियों द्वारा सीधा तथ्य = अवलोकन; उस पर आधारित तार्किक व्याख्या = निष्कर्ष। 5E चक्र: Engage → Explore → Explain → Elaborate → Evaluate।',
        ],
        importantConcepts: [
          'विज्ञान की प्रकृति: अनंतिम (Tentative) व साक्ष्य-आधारित।',
          'सिद्धांत कभी नियम नहीं बनता — दोनों की भूमिकाएँ भिन्न हैं।',
          'अम्ल वर्षा = SO₂ + NO₂; ओज़ोन क्षरण = CFC।',
        ],
        comparisonTable: {
          caption: 'NCF 2005 की विज्ञान पाठ्यचर्या की ६ वैधताएँ',
          headers: ['वैधता प्रकार', 'मुख्य तात्पर्य'],
          rows: [
            ['संज्ञानात्मक वैधता', 'आयु व संज्ञानात्मक स्तर के अनुरूप विषयवस्तु'],
            ['विषयवस्तु वैधता', 'वैज्ञानिक रूप से शुद्ध एवं सटीक जानकारी'],
            ['प्रक्रिया वैधता', 'अवलोकन, प्रयोग व ज्ञान-निर्माण प्रक्रिया में छात्र सहभागिता'],
            ['ऐतिहासिक वैधता', 'समय के साथ वैज्ञानिक विचारों के विकास की समझ'],
            ['पर्यावरणीय वैधता', 'स्थानीय परिवेश व दैनिक जीवन से जुड़ाव'],
            ['नैतिक वैधता', 'ईमानदारी, वस्तुनिष्ठता, सहयोग व भयमुक्ति'],
          ],
        },
        practicalExamples: [
          '"अँधेरे कमरे में रखे पौधे की पत्तियाँ पीली पड़ गईं" = अवलोकन; "क्लोरोफिल निर्माण हेतु सूर्यप्रकाश आवश्यक है" = निष्कर्ष।',
        ],
        classroomApplications: [
          '5E रचनावादी मॉडल और मुक्त-अंत अन्वेषण प्रयोगों से वैज्ञानिक दृष्टिकोण विकसित करें।',
        ],
        teachingMethods: [
          '5E अन्वेषण चक्र, खोज विधि एवं परियोजना विधि।',
        ],
        examSpecificFocus: {
          ctet: 'CTET पेपर २ में विज्ञान की अनंतिम (Tentative) प्रकृति, सिद्धांत बनाम नियम, NCF 2005 की ६ वैधताएँ व अवलोकन-निष्कर्ष भेद हर परीक्षा में आते हैं।',
          mahaTet: 'MAHA TET में रिक्टर पैमाना, अम्ल वर्षा, ओज़ोन, सौरमंडल व वैज्ञानिक विधि के चरण प्रमुख हैं।',
        },
        importantExamPoints: [
          'विज्ञान को "स्थायी/अपरिवर्तनीय सत्य" कहने वाला विकल्प सदैव गलत होता है।',
          'प्रक्रिया वैधता बच्चों में जिज्ञासा व वैज्ञानिक अन्वेषण विकसित करती है।',
        ],
        commonMistakes: [
          'यह मान लेना कि सिद्धांत अधिक प्रमाण मिलने पर नियम बन जाता है।',
        ],
        topicSummary:
          'प्राकृतिक परिघटनाएँ, पर्यावरण संरक्षण, विज्ञान की अनंतिम प्रकृति तथा NCF 2005 की ६ वैधताएँ पेपर २ विज्ञान को पूर्ण बनाती हैं।',
        revisionPoints: [
          'भूकंप = सिस्मोग्राफ/रिक्टर; अम्ल वर्षा = SO₂ व NO₂; ओज़ोन = CFC।',
          'विज्ञान = अनंतिम (Tentative) एवं साक्ष्य-आधारित।',
          '६ वैधताएँ: संज्ञानात्मक, विषयवस्तु, प्रक्रिया, ऐतिहासिक, पर्यावरणीय, नैतिक।',
        ],
        practiceQuestions: [
          {
            id: 'sci-p2-u4-hi-q1',
            question: 'NCF 2005 के अनुसार "विज्ञान की प्रकृति" के संदर्भ में कौन-सा कथन सही है?',
            options: [
              'वैज्ञानिक तथ्य स्थायी व अपरिवर्तनीय अंतिम सत्य होते हैं।',
              'पर्याप्त प्रमाण मिलने पर सिद्धांत नियम बन जाता है।',
              'वैज्ञानिक ज्ञान अनंतिम (Tentative), साक्ष्य-आधारित और नए प्रमाणों से संशोधनीय है।',
              'विज्ञान में कल्पनाशक्ति का कोई स्थान नहीं है।',
            ],
            correctAnswer: 2,
            explanation: 'वैज्ञानिक ज्ञान साक्ष्य-आधारित और नए प्रमाणों के आलोक में संशोधनीय (Tentative) होता है।',
            topicReference: 'इकाई ४ · विज्ञान की प्रकृति',
          },
          {
            id: 'sci-p2-u4-hi-q2',
            question: 'विद्यार्थियों को वैज्ञानिक ज्ञान उत्पन्न करने की विधियों व प्रक्रियाओं (अवलोकन, प्रयोग) में संलग्न करना कौन-सी वैधता है?',
            options: ['ऐतिहासिक वैधता', 'प्रक्रिया वैधता (Process Validity)', 'नैतिक वैधता', 'विषयवस्तु वैधता'],
            correctAnswer: 1,
            explanation: 'वैज्ञानिक प्रक्रियाओं में विद्यार्थियों की सक्रिय भागीदारी प्रक्रिया वैधता कहलाती है।',
            topicReference: 'इकाई ४ · NCF 2005 वैधताएँ',
          },
          {
            id: 'sci-p2-u4-hi-q3',
            question: 'अम्ल वर्षा (Acid Rain) मुख्यतः किन दो प्रदूषक गैसों के कारण होती है?',
            options: ['ऑक्सीजन व नाइट्रोजन', 'सल्फर डाइऑक्साइड (SO₂) व नाइट्रोजन डाइऑक्साइड (NO₂)', 'हीलियम व आर्गन', 'हाइड्रोजन व ओज़ोन'],
            correctAnswer: 1,
            explanation: 'SO₂ व NO₂ वर्षा जल से मिलकर सल्फ्यूरिक व नाइट्रिक अम्ल बनाती हैं।',
            topicReference: 'इकाई ४ · पर्यावरण प्रदूषण',
          },
        ],
      },
    },
  },
];
