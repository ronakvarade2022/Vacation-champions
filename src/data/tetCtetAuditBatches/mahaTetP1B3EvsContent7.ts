import { CuratedTrilingualMcq } from './types';

// Batch 3 Primary EVS Content Part 7 (28 verified trilingual MCQs: Earth & Space, Map Symbols, Shelter Diversity, Water Heritage, NCERT Themes)
export const MAHA_TET_P1_B3_EVS_C7: CuratedTrilingualMcq[] = [
  {
    topic: 'Earth Axial Tilt (23.5°) + Revolution Causing Seasons',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why does India experience summer in May while Australia experiences winter at that EXACT same time—even though Earth revolves along a single oval orbit?',
      opts: [
        'Earth’s rotation axis stays tilted at `23.5°` as it orbits the Sun, tipping the Northern Hemisphere toward sunlight in June and the Southern Hemisphere away',
        'Earth moves ten times closer to Venus in May',
        'Sunspots freeze the southern oceans annually',
        'Earth stops spinning for two weeks every June',
      ],
      exp: 'Rotation (`24h`) gives day/night, while `23.5°` axial tilt combined with revolution (`365.25d`) creates opposite seasons in the two hemispheres.',
    },
    mr: {
      q: 'पृथ्वी सूर्याभोवती एकाच कक्षेत फिरत असताना मे महिन्यात भारतात कडक उन्हाळा तर त्याच वेळी ऑस्ट्रेलियात हिवाळा का असतो?',
      opts: [
        'पृथ्वीचा आस `२३.५°` ने कललेला असून सूर्याभोवती परिभ्रमण करताना उत्तर गोलार्ध सूर्याकडे झुकल्यास तिथे उन्हाळा व दक्षिण गोलार्धात हिवाळा येतो',
        'मे महिन्यात पृथ्वी शुक्राजवळ जाते म्हणून',
        'सूर्यावरील डाग दक्षिण महासागर गोठवतात म्हणून',
        'दर जूनमध्ये पृथ्वीचे फिरणे थांबते म्हणून',
      ],
      exp: 'परिवलनामुळे (Rotation) दिवस-रात्र, तर कललेला `२३.५°` आस व परिभ्रमणामुळे (Revolution) दोन्ही गोलार्धांत विरुद्ध ऋतू निर्माण होतात.',
    },
    hi: {
      q: 'पृथ्वी एक ही कक्षा में घूमती है, फिर भी मई में भारत में गर्मी और ठीक उसी समय ऑस्ट्रेलिया में सर्दी क्यों होती है?',
      opts: [
        'पृथ्वी अपने अक्ष पर `23.5°` झुकी रहकर सूर्य की परिक्रमा करती है, जिससे जून के पास उत्तरी गोलार्ध सूर्य की ओर झुककर गर्म रहता है',
        'मई में पृथ्वी शुक्र के करीब पहुँच जाती है',
        'सूर्य के धब्बे दक्षिणी सागर जमा देते हैं',
        'हर जून में पृथ्वी घूमना बंद कर देती है',
      ],
      exp: 'घूर्णन से दिन-रात बनते हैं, जबकि `23.5°` अक्षीय झुकाव सहित परिक्रमण से दोनों गोलार्धों में विपरीत ऋतुएँ आती हैं।',
    },
  },
  {
    topic: 'Solar vs Lunar Eclipse Geometry & Safe Viewing',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Which alignment correctly produces a SOLAR Eclipse (`Surya Grahan`), and why must students NEVER stare straight at it with naked eyes or ordinary dark sunglasses?',
      opts: [
        'Moon passes strictly between Sun and Earth on New Moon (`Amavasya`); concentrated solar UV/IR rays burn eye retinas permanently without ISO solar filters',
        'Earth sits strictly between Sun and Moon on Full Moon (`Purnima`)',
        'Mars blocks moonlight at midnight',
        'Solar eclipses emit freezing gamma rays that turn eyes white',
      ],
      exp: 'Solar Eclipse (`Amavasya`): Sun–Moon–Earth (`view via pinhole projection`); Lunar Eclipse (`Purnima`): Sun–Earth–Moon (`completely safe with naked eyes`).',
    },
    mr: {
      q: 'सूर्यग्रहण (`Surya Grahan`) कोणत्या स्थितीत घडते आणि ते कधीच थेट उघड्या डोळ्यांनी किंवा साध्या गॉगलमधून का पाहू नये?',
      opts: [
        'अमावस्येला चंद्र सूर्य व पृथ्वीच्या बरोबर मध्ये येतो; सूर्याची तीव्र अतिनील किरणे डोळ्यांच्या पडद्याला कायमची इजा करू शकतात (पिनहोल/प्रमाणित फिल्टर वापरावे)',
        'पौर्णिमेला पृथ्वी सूर्य व चंद्राच्या मध्ये येते म्हणून',
        'मंगळ ग्रह प्रकाश अडवतो म्हणून',
        'सूर्यग्रहणात बर्फाळ किरणे निघतात म्हणून',
      ],
      exp: 'सूर्य–चंद्र–पृथ्वी सरळ रेषेत आल्यास अमावस्येला सूर्यग्रहण (थेट पाहू नये), तर सूर्य–पृथ्वी–चंद्र स्थितीत पौर्णिमेला चंद्रग्रहण होते.',
    },
    hi: {
      q: 'सूर्य ग्रहण किस खगोलीय संरेखण में होता है, और इसे कभी भी नंगी आँखों या साधारण धूप के चश्मे से सीधे क्यों नहीं देखना चाहिए?',
      opts: [
        'अमावस्या को चंद्रमा सूर्य व पृथ्वी के बीच आ जाता है; सूर्य की तीव्र पराबैंगनी-अवरक्त किरणें रेटिना को स्थायी क्षति पहुँचा सकती हैं (केवल प्रमाणित सोलर फिल्टर/पिनहोल से देखें)',
        'पूर्णिमा को पृथ्वी बीच में आ जाती है',
        'मंगल ग्रह चंद्रमा को ढक लेता है',
        'ग्रहण से बर्फीली किरणें निकलती हैं',
      ],
      exp: 'अमावस्या पर `सूर्य–चंद्रमा–पृथ्वी` से सूर्य ग्रहण (फिल्टर आवश्यक) तथा पूर्णिमा पर `सूर्य–पृथ्वी–चंद्रमा` से चंद्र ग्रहण होता है।',
    },
  },
  {
    topic: 'Inner Rocky Terrestrial Planets vs Outer Gas/Ice Giants',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Outward from the Sun (`My Very Educated Mother Just Served Us Noodles`), which set lists ONLY the four rocky INNER planets separated from Jupiter–Neptune by the Asteroid Belt?',
      opts: [
        'Mercury, Venus, Earth, and Mars',
        'Jupiter, Saturn, Uranus, and Neptune',
        'Earth, Mars, Jupiter, and Saturn',
        'Venus, Uranus, Pluto, and Mercury',
      ],
      exp: 'Mercury, Venus, Earth, Mars are dense rocky inner planets; Jupiter, Saturn, Uranus, Neptune are huge outer gas/ice giants.',
    },
    mr: {
      q: 'सूर्यापासून क्रमाने असणाऱ्या लघुग्रहांच्या पट्ट्याआतील चार खडकाळ "अंतर्ग्रह" (Inner Rocky Planets) कोणते?',
      opts: [
        'बुध, शुक्र, पृथ्वी आणि मंगळ',
        'गुरू, शनी, युरेनस आणि नेपच्यून',
        'पृथ्वी, मंगळ, गुरू आणि शनी',
        'शुक्र, युरेनस, प्लूटो आणि बुध',
      ],
      exp: 'मंगळ व गुरू दरम्यान लघुग्रहांचा पट्टा असून आत बुध, शुक्र, पृथ्वी व मंगळ हे खडकाळ अंतर्ग्रह आहेत.',
    },
    hi: {
      q: 'क्षुद्रग्रह पट्टी (Asteroid Belt) के भीतर सूर्य के निकट स्थित चार चट्टानी "आंतरिक ग्रह" कौन-से हैं?',
      opts: [
        'बुध, शुक्र, पृथ्वी और मंगल',
        'बृहस्पति, शनि, अरुण (यूरेनस) और वरुण (नेपच्यून)',
        'पृथ्वी, मंगल, बृहस्पति और शनि',
        'शुक्र, अरुण, प्लूटो और बुध',
      ],
      exp: 'मंगल और बृहस्पति के बीच क्षुद्रग्रह पट्टी है; भीतर बुध, शुक्र, पृथ्वी व मंगल चट्टानी ग्रह और बाहर चार गैस/बर्फ दानव ग्रह हैं।',
    },
  },
  {
    topic: 'Chandrayaan-3 South Pole Soft Landing (23 August 2023)',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Making India the first nation to softly land near the Moon’s South Polar region (`Shiv Shakti Point`, `23 August 2023` — celebrated as National Space Day), what were the names of ISRO’s Chandrayaan-3 Lander and 6-wheeled Rover?',
      opts: [
        'Vikram (Lander) and Pragyan (Rover)',
        'Aryabhata (Lander) and Bhaskara (Rover)',
        'Mangalyaan and Aditya',
        'Kalpana and Rakesh',
      ],
      exp: 'ISRO’s Chandrayaan-3 Vikram lander touched down on `23 August 2023` and deployed solar-powered Pragyan rover.',
    },
    mr: {
      q: '`२३ ऑगस्ट २०२३` रोजी चंद्राच्या दक्षिण ध्रुवाजवळ यशस्वी सॉफ्ट लँडिंग करून भारताने इतिहास घडवला (`राष्ट्रीय अंतराळ दिन`); चांद्रयान-३ च्या लँडर आणि रोव्हरची नावे काय होती?',
      opts: [
        'विक्रम (लँडर) आणि प्रज्ञान (रोव्हर)',
        'आर्यभट्ट आणि भास्कर',
        'मंगलयान आणि आदित्य',
        'कल्पना आणि राकेश',
      ],
      exp: 'इस्रोच्या चांद्रयान-३ मोहिमेत "विक्रम" लँडरने शिवशक्ती बिंदूवर अचूक उतरून "प्रज्ञान" रोव्हर चंद्रावर चालवला.',
    },
    hi: {
      q: '`23 अगस्त 2023` को चंद्रमा के दक्षिणी ध्रुव के पास सफल सॉफ्ट लैंडिंग (`राष्ट्रीय अंतरिक्ष दिवस`) करने वाले इसरो के चंद्रयान-3 के लैंडर और रोवर का नाम क्या था?',
      opts: [
        'विक्रम (लैंडर) और प्रज्ञान (रोवर)',
        'आर्यभट और भास्कर',
        'मंगलयान और आदित्य',
        'कल्पना और राकेश',
      ],
      exp: 'इसरो के चंद्रयान-3 में विक्रम लैंडर ने शिवशक्ति बिंदु पर उतरकर प्रज्ञान रोवर को चंद्र सतह पर संचालित किया।',
    },
  },
  {
    topic: 'Pole Star (Dhruva Tara) Stationary Alignment With Earth’s North Axis',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Night sailors and desert caravans have trusted the Pole Star (`Dhruva Tara`) for centuries to find TRUE NORTH because unlike other stars that seem to wheel across the sky hourly, Polaris:',
      opts: [
        'Sits almost directly above Earth’s North rotational axis, appearing virtually stationary in the northern sky all night',
        'Orbits rapidly around the Moon every `24` hours',
        'Shines brighter than the midday Sun',
        'Appears exclusively over the South Pole',
      ],
      exp: 'Tracing the outer two pointer stars (`Dubhe` and `Merak`) of Saptarshi (`Big Dipper`) points straight toward Dhruva Tara.',
    },
    mr: {
      q: 'रात्रीच्या आकाशात इतर सर्व तारे पूर्वेकडून पश्चिमेकडे सरकताना दिसत असताना प्राचीन काळापासून प्रवासी "ध्रुव ताऱ्याच्या (Pole Star)" मदतीने उत्तर दिशा अचूक कशी ओळखतात?',
      opts: [
        'ध्रुव तारा पृथ्वीच्या उत्तर परिवलन आसाच्या बरोबर वर असल्याने तो रात्रभर उत्तर दिशेला जणू स्थिर दिसतो',
        'तो दर २४ तासांनी चंद्राभोवती फिरतो म्हणून',
        'तो दुपारच्या सूर्यापेक्षा तेजस्वी असतो म्हणून',
        'तो फक्त दक्षिण ध्रुवावर दिसतो म्हणून',
      ],
      exp: 'पृथ्वीच्या उत्तर आसाच्या सरळ रेषेत असल्याने ध्रुव तारा सप्तर्षीच्या दोन दर्शक ताऱ्यांच्या रेषेत अचल दिसतो.',
    },
    hi: {
      q: 'रात में अन्य तारे आकाश में घूमते दिखने पर भी सदियों से यात्री उत्तर दिशा पहचानने हेतु "ध्रुव तारे (Pole Star)" पर भरोसा क्यों करते हैं?',
      opts: [
        'ध्रुव तारा पृथ्वी के उत्तरी घूर्णन अक्ष के ठीक ऊपर स्थित होने के कारण रात भर उत्तर दिशा में लगभग स्थिर दिखाई देता है',
        'वह हर 24 घंटे में चंद्रमा की परिक्रमा करता है',
        'वह दोपहर के सूर्य से अधिक चमकता है',
        'वह केवल दक्षिणी ध्रुव के ऊपर दिखता है',
      ],
      exp: 'पृथ्वी की घूर्णन धुरी की सीध में होने से ध्रुव तारा हमेशा ठीक उत्तर दिशा में अचल प्रतीत होता है।',
    },
  },
  {
    topic: 'Tropic of Cancer (`23.5° N`) Passing 8 Indian States (NOT Maharashtra)',
    pattern: 'Factual',
    difficulty: 'Moderate',
    en: {
      q: 'Inspecting India’s globe grid carefully, the Tropic of Cancer (`23°30′ N`) slices India roughly into tropical south and subtropical north across `8` states (`Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura, Mizoram`). Does it pass through Maharashtra?',
      opts: [
        'No — Maharashtra lies entirely SOUTH of the Tropic of Cancer inside the Tropical Zone (`~15.6° N to 22.0° N`)',
        'Yes — cutting straight across Pune city',
        'Yes — passing along Ratnagiri beach',
        'Maharashtra straddles the Equator `0°`',
      ],
      exp: 'Maharashtra spans roughly `15°44′ N to 22°06′ N` (`north of Equator, south of Tropic of Cancer`).',
    },
    mr: {
      q: 'भारताच्या मध्यभागातून गुजरात, राजस्थान, मध्य प्रदेश, छत्तीसगड, झारखंड, प. बंगाल, त्रिपुरा व मिझोराम या `८` राज्यांतून कर्कवृत्त (`२३°३०′ उ.`) जाते; ते महाराष्ट्रातून जाते का?',
      opts: [
        'नाही — संपूर्ण महाराष्ट्र राज्य कर्कवृत्ताच्या दक्षिणेस उष्ण कटिबंधात (`सुमारे १५.६° ते २२° उ. अक्षांश`) आहे',
        'होय — थेट पुणे शहरातून जाते',
        'होय — रत्नागिरी किनाऱ्यावरून जाते',
        'महाराष्ट्र विषुववृत्तावर (`०°`) आहे',
      ],
      exp: 'महाराष्ट्राचा अक्षवृत्तीय विस्तार कर्कवृत्ताच्या दक्षिणेस असल्यामुळे कर्कवृत्त महाराष्ट्रातून जात नाही.',
    },
    hi: {
      q: 'कर्क रेखा (`23°30′ N`) भारत के `8` राज्यों (गुजरात, राजस्थान, म.प्र., छत्तीसगढ़, झारखंड, प. बंगाल, त्रिपुरा, मिज़ोरम) से गुजरती है; क्या यह महाराष्ट्र से गुजरती है?',
      opts: [
        'नहीं — संपूर्ण महाराष्ट्र कर्क रेखा के दक्षिण में उष्ण कटिबंध (`~15.6° से 22° N`) में स्थित है',
        'हाँ — ठीक पुणे शहर से गुजरती है',
        'हाँ — रत्नागिरी तट से जाती है',
        'महाराष्ट्र भूमध्य रेखा `0°` पर है',
      ],
      exp: 'महाराष्ट्र का अक्षांशीय विस्तार लगभग `15.6° N` से `22° N` है, अतः कर्क रेखा इसके उत्तर में मध्य प्रदेश से गुजरती है।',
    },
  },
  {
    topic: 'Indian Standard Time (`82°30′ E` Mirzapur, UTC +5:30)',
    pattern: 'Factual',
    difficulty: 'Moderate',
    en: {
      q: 'To prevent confusing railway & school clock differences between Arunachal Pradesh and Gujarat, India follows a single Indian Standard Time (`IST = GMT + 5 hrs 30 min`) calibrated along which central meridian?',
      opts: [
        '82°30′ East longitude (passing near Mirzapur/Prayagraj, UP)',
        '0° Prime Meridian (Greenwich)',
        '68°07′ East (Kutch)',
        '97°25′ East (Kibithu)',
      ],
      exp: 'Every `15°` longitude equals `1 hour`; `82.5° E ÷ 15° = 5.5 hours` ahead of Greenwich (`GMT + 5:30`).',
    },
    mr: {
      q: 'अरुणाचल प्रदेश व गुजरातच्या स्थानिक वेळेतील सुमारे दोन तासांचा गोंधळ टाळण्यासाठी भारताची प्रमाणवेळ (IST = GMT + ५ तास ३० मिनिटे) कोणत्या रेखावृत्तावरून निश्चित केली आहे?',
      opts: [
        '८२°३०′ पूर्व रेखावृत्त (मिर्झापूर / प्रयागराजजवळून जाणारे)',
        '०° मूळ रेखावृत्त (ग्रीनिच)',
        '६८°०७′ पूर्व (कच्छ)',
        '९७°२५′ पूर्व',
      ],
      exp: '८२.५° पूर्व रेखावृत्त भारताच्या जवळपास मध्यभागातून जात असल्याने ते भारतीय प्रमाणवेळेचे (`+५:३०`) मानक आहे.',
    },
    hi: {
      q: 'अरुणाचल प्रदेश और गुजरात के बीच समय-अंतर के भ्रम से बचने हेतु भारतीय मानक समय (`IST = GMT + 5:30`) किस देशांतर रेखा से तय किया गया है?',
      opts: [
        '82°30′ पूर्वी देशांतर (मिर्जापुर/प्रयागराज के पास)',
        '0° प्रधान याम्योत्तर (ग्रीनविच)',
        '68°07′ पूर्व',
        '97°25′ पूर्व',
      ],
      exp: 'प्रत्येक `15°` देशांतर = 1 घंटा; `82.5° E` ग्रीनविच से ठीक `5 घंटे 30 मिनट` आगे है।',
    },
  },
  {
    topic: 'Regional Shelter Adaptations – Assam Stilt Houses & Ladakh Flat Roofs',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'NCERT Class 3 "A House Like This!": Why do villagers in heavy-monsoon Assam build bamboo houses raised `10–12 feet` on strong wooden pillars (`stilts`), whereas homes in arid cold Leh–Ladakh have `2`-foot-thick stone-mud walls and flat wooden roofs?',
      opts: [
        'Assam stilts keep floodwaters, snakes, and dampness safely below; Ladakh thick walls trap warmth (`ground floor animals add heat`) while flat roofs dry summer apricots/chillies',
        'Assam experiences snow blizzards year-round',
        'Ladakh receives daily tropical sea cyclones',
        'Both styles copy European glass skyscrapers',
      ],
      exp: 'Traditional regional architecture adapts intelligently to rainfall, flood levels, altitude frost, and local materials (`bamboo` vs `stone/mud`).',
    },
    mr: {
      q: 'आसाममधील घरे जमिनीपासून `१०–१२ फूट` उंच बांबूच्या खांबांवर, तर लडाखमधील घरे २ फूट जाड दगड-मातीच्या भिंती व सपाट लाकडी छपराची का असतात?',
      opts: [
        'आसाममध्ये मुसळधार पाऊस व पुरापासून वाचण्यासाठी उंच खांब; तर थंड लडाखमध्ये ऊब टिकवण्यासाठी जाड भिंती (खाली जनावरे) व उन्हात फळे वाळवण्यासाठी सपाट छप्पर',
        'आसाममध्ये वर्षभर बर्फवृष्टी होते म्हणून',
        'लडाखमध्ये दररोज चक्रीवादळे येतात म्हणून',
        'दोन्ही आधुनिक काचेच्या इमारतींची नक्कल आहेत म्हणून',
      ],
      exp: 'स्थानिक हवामान, पर्जन्यमान व उपलब्ध साहित्यानुसार प्रत्येक प्रदेशातील घरांची रचना बदलते.',
    },
    hi: {
      q: 'असम के घर ज़मीन से `10–12 फीट` ऊँचे बाँस के खंभों पर, जबकि लेह-लद्दाख के घर मोटी पत्थर-मिट्टी की दीवारों व सपाट छत वाले क्यों होते हैं?',
      opts: [
        'असम में भारी बारिश-बाढ़ व साँपों से बचाव हेतु खंभे; जबकि बर्फीले लद्दाख में गर्माहट रोकने हेतु मोटी दीवारें और खुबानी-सब्ज़ी सुखाने को सपाट छतें',
        'असम में साल भर बर्फ गिरती है',
        'लद्दाख में रोज़ समुद्री तूफान आते हैं',
        'दोनों काँच की गगनचुंबी इमारतों की नकल हैं',
      ],
      exp: 'पारंपरिक आवास हमेशा स्थानीय वर्षा, तापमान, भू-आकृति और उपलब्ध सामग्री के अनुकूल विकसित होते हैं।',
    },
  },
  {
    topic: 'Kashmir Heritage Shelters – Donga/Houseboat, Shikara & Khatamband',
    pattern: 'Factual',
    difficulty: 'Moderate',
    en: {
      q: 'In Srinagar’s Dal Lake and Jhelum River, Kashmiri wooden houseboats & floating family "Donga" boats are famous for intricate jigsaw-fitted walnut/pine wooden ceilings (`no nails`) called:',
      opts: ['Khatamband (with carved Dab projecting windows)', 'Changpa Rebo yak tent', 'Bhonga circular Kutch hut', 'Gaddha pit house'],
      exp: 'NCERT Class 5 "A Shelter So High!" introduces Srinagar’s Khatamband ceilings, Mehraab arches, and Rebo yak-hair tents of Ladakh’s Changpas.',
    },
    mr: {
      q: 'श्रीनगरच्या दल सरोवरातील हाऊसबोट व स्थानिक डोंगा बोटींच्या छतावरील लाकडाच्या कलाकुसरीच्या पझलसारख्या नक्षीकामाला काय म्हणतात?',
      opts: ['खतमबंद (Khatamband)', 'चांगपा रेबो तंबू', 'कच्छचा भोंगा', 'गड्ढा घर'],
      exp: 'काश्मिरी घरे व हाऊसबोटमधील खिळ्यांशिवाय बसवलेले सुंदर लाकडी छत "खतमबंद" म्हणून ओळखले जाते.',
    },
    hi: {
      q: 'श्रीनगर की डल झील की हाउसबोट व डोंगा नावों की छत पर बिना कीलों के लकड़ी के पहेली-जैसे नक्काशीदार डिज़ाइन को क्या कहते हैं?',
      opts: ['खत्मबंद (Khatamband)', 'चांगपा रेबो तंबू', 'कच्छ भोंगा', 'गड्ढा घर'],
      exp: 'कश्मीरी घरों व हाउसबोट में देवदार/अखरोट की लकड़ी की अद्भुत जालीदार छत "खत्मबंद" कहलाती है।',
    },
  },
  {
    topic: 'Changpa Nomads of Changthang (Pashmina Goats & Rebo Tent)',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Living high up at `~5,000 metres` on icy Changthang plateau in Ladakh inside yak-hair `Rebo` tents, the pastoral Changpa community shears fine winter undercoat fur for world-famous Pashmina shawls from:',
      opts: [
        'Special high-altitude Changthangi goats (`one handwoven Pashmina shawl takes ~250 hours`)',
        'Desert camels',
        'Tropical coastal buffaloes',
        'Polar bears',
      ],
      exp: 'Extreme `-40°C` winter cold spurs Changthangi goats to grow ultra-fine warm hair (`1/6th width of human hair`) woven gently by Kashmiri artisans.',
    },
    mr: {
      q: 'लडाखमधील `~५,००० मी` उंच थंडगार चांगथांग पठारावर याकच्या केसांच्या "रेबो" तंबूत राहणारे चांगपा पशुपालक जगप्रसिद्ध पश्मिना शालीसाठीची मऊ लोकर कशापासून मिळवतात?',
      opts: [
        'अतिथंड प्रदेशात राहणाऱ्या खास शेळ्यांच्या अंगावरील बारीक मऊ केसांपासून (`एका शालीसाठी ~२५० तास विणकाम`)',
        'वाळवंटी उंटांपासून',
        'कोकणातील म्हशींपासून',
        'ध्रुवीय अस्वलांपासून',
      ],
      exp: 'तीव्र उणे तापमानात जगणाऱ्या चांगथांगी शेळ्यांचे अतिसूक्ष्म उबदार केस हाताने विणून पश्मिना शाल तयार होते.',
    },
    hi: {
      q: 'लद्दाख के `~5,000 मी` ऊँचे बर्फीले चांगथांग पठार पर याक के बालों वाले "रेबो" तंबुओं में रहने वाले चांगपा लोग विश्व प्रसिद्ध पश्मीना ऊन किससे प्राप्त करते हैं?',
      opts: [
        'कड़ाके की ठंड में पलने वाली विशेष पहाड़ी बकरियों की महीन मुलायम ऊन से (एक शॉल बुनने में ~250 घंटे)',
        'रेगिस्तानी ऊँटों से',
        'तटीय भैंसों से',
        'ध्रुवीय भालुओं से',
      ],
      exp: 'चांगथांगी बकरियाँ `-40°C` से बचने हेतु अत्यंत महीन व गर्म ऊन विकसित करती हैं जिससे हस्तनिर्मित पश्मीना शॉल बनती है।',
    },
  },
  {
    topic: 'Traditional Indian Rainwater Harvesting Systems Matching',
    pattern: 'Factual',
    difficulty: 'Moderate',
    en: {
      q: 'Which regional pair accurately matches traditional rainwater/hill-stream community irrigation systems across India (`studied in Class 5 "Every Drop Counts"`)?',
      opts: [
        'Johad / Taanka (Rajasthan), Kuhl (Himachal Pradesh), and Phad / Barav stepwells (Maharashtra)',
        'Johad (Kerala backwaters) and Kuhl (Thar desert dunes)',
        'Ahar-Pyne (Ladakh glaciers) and Zabo (Arabian Sea islands)',
        'Bandhara (Sahara) and Igloo (Konkan)',
      ],
      exp: 'Tarun Bharat Sangh revived Rajasthan’s `Johads`; Himachal mountains divert snowmelt via `Kuhls`; Maharashtra built `Baravs` and `Phad` irrigation.',
    },
    mr: {
      q: 'भारतातील पारंपरिक जलसंधारण व सिंचन पद्धतींची अचूक प्रादेशिक जोडी कोणती?',
      opts: [
        'जोहड / टांका (राजस्थान), कुहल (हिमाचल प्रदेश) आणि फड सिंचन / बारव (महाराष्ट्र)',
        'जोहड (केरळ) आणि कुहल (थर वाळवंट)',
        'आहर-पाइन (लडाख) आणि झाबो (अरबी समुद्र)',
        'बंधारा (सहारा) आणि इग्लू (कोकण)',
      ],
      exp: 'राजस्थानचे जोहड-टांके, हिमाचलची कुहल कालवे व्यवस्था व महाराष्ट्रातील बारव-फड सिंचन ही समुदाय-आधारित जलसंधारणाची उत्तम उदाहरणे आहेत.',
    },
    hi: {
      q: 'भारत की पारंपरिक जल-संचयन एवं सिंचाई प्रणालियों का सही क्षेत्रीय मिलान कौन-सा है?',
      opts: [
        'जोहड़ / टांका (राजस्थान), कुहल (हिमाचल प्रदेश) और फड़ सिंचाई / बारव बावड़ी (महाराष्ट्र)',
        'जोहड़ (केरल) और कुहल (थार मरुस्थल)',
        'आहर-पाइन (लद्दाख) और ज़ाबो (अरब सागर)',
        'बंधारा (सहारा) और इग्लू (कोंकण)',
      ],
      exp: 'राजस्थान में जोहड़-टांका, हिमाचल में पहाड़ी कुहल नालियाँ तथा महाराष्ट्र में बारव बावड़ियाँ व फड़ सिंचाई प्रसिद्ध रही हैं।',
    },
  },
  {
    topic: 'Golconda Fort Rainwater Lift, Clay Pipes & Bastion Acoustics',
    pattern: 'Factual',
    difficulty: 'Moderate',
    en: {
      q: 'NCERT Class 5 "Walls Tell Stories" explores Golconda Fort (Hyderabad). Why were rounded semi-circular BASTIONS (`Buruj`) built sticking OUTWARD beyond straight fort walls?',
      opts: [
        'Large observation holes let defenders watch three directions wide (`wider visibility`) to spot approaching attackers safely',
        'They served only as flat tennis courts',
        'Bastions flooded inside moats intentionally',
        'Bastions acted as underground coal chimneys',
      ],
      exp: 'Projecting bastions eliminated blind spots along flat walls, while clay-pipe gravity fountains and Fateh Darwaza acoustics stunned visitors.',
    },
    mr: {
      q: 'किल्ल्यांच्या सरळ तटबंदीवर बाहेरच्या बाजूने अर्धवर्तुळाकार मोठे "बुरूज (Bastions)" आणि त्यात जंग्या (छोटी छिद्रे) का बांधल्या जात असत?',
      opts: [
        'तटबंदीच्या बाहेरील सर्व दिशांवर लांबपर्यंत नजर ठेवण्यासाठी आणि आडून शत्रूचा वेध घेता यावा म्हणून',
        'केवळ खेळाचे मैदान बनवण्यासाठी',
        'खंदकात पाणी भरण्यासाठी',
        'कोळशाची चिमणी म्हणून',
      ],
      exp: 'किल्ल्याची तटबंदी सुरक्षित ठेवण्यासाठी बाहेर आलेले बुरूज ३-दिशांचे विस्तृत संरक्षण व निरीक्षण क्षेत्र देत असत.',
    },
    hi: {
      q: 'गोलकुंडा व प्राचीन किलों की सीधी दीवारों से बाहर उभरे हुए अर्ध-गोलाकार "बुर्ज (Bastions)" और उनमें संकरे झरोखे क्यों बनाए जाते थे?',
      opts: [
        'ताकि रक्षक भीतर सुरक्षित रहकर तीनों ओर दूर तक निगरानी रख सकें और हमलावरों पर विस्तृत दृष्टि क्षेत्र मिले',
        'केवल टेनिस खेलने के लिए',
        'खाई में पानी भरने के लिए',
        'कोयले की चिमनी के रूप में',
      ],
      exp: 'बाहर निकले बुर्ज सीधी दीवार के अंधे कोण (Blind spots) समाप्त कर किले की रक्षा को अभेद्य बनाते थे।',
    },
  },
  {
    topic: 'Space Microgravity Phenomena – Sunita Williams in Orbit (`NCERT`)',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Sharing videos from the International Space Station (`NCERT Class 5 "Sunita in Space"`), astronaut Sunita Williams demonstrated that poured water forms floating glowing spherical blobs and hair stands straight up because:',
      opts: [
        'In free-fall orbit (`microgravity` / weightlessness), objects do not fall downward onto the floor like on Earth’s surface',
        'Outer space air freezes water instantly into cotton',
        'Spacecraft walls pack giant ceiling magnets pulling hair upward',
        'Water loses oxygen molecules in rockets',
      ],
      exp: 'In orbit weightlessness, liquids cohere into floating spheres (`surface tension dominates`), and people strap down while sleeping.',
    },
    mr: {
      q: 'अंतराळ स्थानकात (ISS) सुनीता विल्यम्स यांनी दाखवले की तेथे पाणी पेल्यात न राहता हवेत गोल थेंबांसारखे तरंगते आणि केस सतत वर उभे राहतात; याचे कारण काय?',
      opts: [
        'कक्षा-भ्रमणातील सूक्ष्म-गुरुत्वाकर्षण / भारहीनतेमुळे (Weightlessness) वस्तू पृथ्वीप्रमाणे खाली ओढल्या जात नाहीत म्हणून',
        'अंतराळातील हवा पाण्याचा कापूस करते म्हणून',
        'यानाच्या छतावर मोठा चुंबक असतो म्हणून',
        'रॉकेटमध्ये ऑक्सिजन संपतो म्हणून',
      ],
      exp: 'अंतराळ यानात सर्व गोष्टी भारहीनतेत असल्याने पाणी पृष्ठीय ताणामुळे गोलाकार थेंब बनून हवेत तरंगते.',
    },
    hi: {
      q: 'अंतरिक्ष स्टेशन में सुनीता विलियम्स ने दिखाया कि गिलास में न ठहरकर पानी हवा में गोल बूंदों सा तैरता है और बाल सीधे खड़े रहते हैं; ऐसा क्यों होता है?',
      opts: [
        'कक्षीय भारहीनता / सूक्ष्म-गुरुत्व (Microgravity) की स्थिति में वस्तुएँ पृथ्वी की तरह नीचे फर्श पर नहीं गिरतीं',
        'अंतरिक्ष की हवा पानी को रुई बना देती है',
        'छत पर बड़ा चुंबक लगा होता है',
        'पानी से ऑक्सीजन उड़ जाती है',
      ],
      exp: 'कक्षीय मुक्त पतन के कारण भारहीनता रहती है, जिससे द्रव पृष्ठ-तनाव के कारण गोल बूंदों के रूप में तैरते हैं।',
    },
  },
  {
    topic: 'Bachendri Pal & Mountaineering Safety (`Pitons, Vitamin C & Double Plastic`)',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'First Indian woman to summit Mount Everest (`23 May 1984`, `8,848.86 m`), Bachendri Pal’s mountaineering lesson ("Up You Go!") notes hikers carry Vitamin-C tablets, iron pills, and hot chocolate milk mainly to:',
      opts: [
        'Keep warmth, stamina, and red-blood oxygen readiness high at freezing low-oxygen heights (`plus double-layered plastic sheets trap tent heat`)',
        'Add extra rock weight to climbing backpacks',
        'Attract snow leopards toward camps',
        'Melt glacier crevasses smoothly',
      ],
      exp: 'High-altitude trekking demands calorie-dense warm fluids, `90°` perpendicular rappel posture coming down cliffs, and teamwork.',
    },
    mr: {
      q: '`२३ मे १९८४` रोजी माउंट एव्हरेस्ट सर करणाऱ्या पहिल्या भारतीय महिला गिर्यारोहक बचेंद्री पाल यांच्या पाठात डोंगर चढणाऱ्यांना क-जीवनसत्त्व व गरम चॉकलेट दूध का देतात?',
      opts: [
        'तीव्र थंडीत व कमी ऑक्सिजनच्या उंचीवर शरीरात ऊब, ताकद व रक्ताची कार्यक्षमता टिकवून ठेवण्यासाठी (आणि दुहेरी प्लास्टिक तंबूत ऊब राखते)',
        'पाठीवरचे वजन वाढवण्यासाठी',
        'हिमबिबट्यांना बोलावण्यासाठी',
        'हिमनद्या वितळवण्यासाठी',
      ],
      exp: 'अतिउंच गिर्यारोहणात उष्ण पोषक पेये, गट-सहकार्य आणि सुरक्षित उतरण्याचे तंत्र जीव वाचवतात.',
    },
    hi: {
      q: '`23 मई 1984` को माउंट एवरेस्ट फतह करने वाली पहली भारतीय महिला बछेंद्री पाल के पाठ में पर्वतारोहियों को विटामिन-C, आयरन व गर्म चॉकलेट दूध क्यों दिया जाता है?',
      opts: [
        'कड़ाके की ठंड और कम ऑक्सीजन वाली ऊँचाई पर शारीरिक गर्मी, ऊर्जा व सहनशक्ति बनाए रखने के लिए',
        'पीठ का बोझ बढ़ाने के लिए',
        'हिम तेंदुए बुलाने के लिए',
        'ग्लेशियर पिघलाने के लिए',
      ],
      exp: 'ऊँचे पर्वतारोहण में गर्म ऊर्जा-युक्त पेय, दोहरी-परत तंबू और टीम भावना सुरक्षा व शक्ति प्रदान करते हैं।',
    },
  },
  {
    topic: 'NCERT Primary EVS – Six Broad Thematic Strands (`NCF 2005`)',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Instead of fragmented compartments ("Botany, Physics, Geography"), NCF-2005 weaves Class 3–5 EVS around SIX child-centered themes. Which option accurately lists ALL six official themes?',
      opts: [
        'Family & Friends, Food, Shelter, Water, Travel, and Things We Make and Do',
        'Algebra, Calculus, Economics, Zoology, Optics, and Civics',
        'History, Chemistry, Astronomy, Sports, Grammar, and Accounting',
        'Plants, Minerals, Oceans, Continents, Wars, and Machines',
      ],
      exp: 'The 6 integrated NCF-2005 EVS themes ("Family & Friends" has 4 subthemes: Relationships, Work & Play, Animals, Plants) center learning around daily lived experience.',
    },
    mr: {
      q: 'वनस्पतिशास्त्र, भूगोल व इतिहास असे सुटे कप्पे न ठेवता NCF-२००५ नुसार इ. ३ री–५ वी परिसर अभ्यासाची मांडणी कोणत्या सहा (६) व्यापक जीवनस्पर्शी सूत्रांभोवती (Themes) केली आहे?',
      opts: [
        'कुटुंब व मित्र, अन्न, निवारा, पाणी, प्रवास आणि आपण जे बनवतो व करतो',
        'बीजगणित, अर्थशास्त्र, खगोलशास्त्र, व्यापार, रसायन व युद्ध',
        'केवळ प्राणी, खनिजे, महासागर, खंड, युद्धे व यंत्रे',
        'इतिहास, भौतिकशास्त्र, भूगोल, व्याकरण, क्रीडा व बँकिंग',
      ],
      exp: 'कुटुंब व मित्र (४ उपसूत्रे), अन्न, निवारा, पाणी, प्रवास आणि आपण जे बनवतो-करतो ही सहा एकात्मिक EVS सूत्रे आहेत.',
    },
    hi: {
      q: 'विषयों के अलग-अलग खाँचों के बजाय NCF-2005 में कक्षा 3–5 का पर्यावरण अध्ययन किन छह (6) एकीकृत बाल-केंद्रित थीम पर आधारित है?',
      opts: [
        'परिवार एवं मित्र, भोजन, आश्रय (आवास), जल, यात्रा, और हम चीज़ें कैसे बनाते हैं',
        'बीजगणित, अर्थशास्त्र, खगोल, रसायन, व्यापार व युद्ध',
        'पौधे, खनिज, महासागर, महाद्वीप, युद्ध और मशीनें',
        'इतिहास, भौतिकी, व्याकरण, खेल, बैंकिंग और विधि',
      ],
      exp: 'NCF-2005 में प्राथमिक EVS इन्हीं 6 जीवन-आधारित थीम (परिवार-मित्र की 4 उप-थीम सहित) के इर्द-गिर्द बुना गया है।',
    },
  },
  {
    topic: 'Traditional Indian Craft Capitals – Pochampally, Madhubani, Chikankari, Kullu',
    pattern: 'Factual',
    difficulty: 'Moderate',
    en: {
      q: 'Which NCERT Class 4–5 regional craft-to-state match is 100% accurate across all three pairs?',
      opts: [
        'Pochampally Ikat weave (Telangana), Madhubani rice-paste folk art (Bihar), and Kullu woollen shawls (Himachal Pradesh)',
        'Madhubani (Rajasthan desert), Pochampally (Assam), and Kullu shawls (Kerala)',
        'Kalamkari (Punjab), Chikankari (Goa), and Patola (Nagaland)',
        'Warli art (Manipur), Paithani (Bihar), and Pattachitra (Kashmir)',
      ],
      exp: 'Pochampally (Telangana Bhoodan birthplace & GI Ikat), Madhubani (Mithila/Bihar), and Kullu (Himachal) showcase India’s vibrant craft geography.',
    },
    mr: {
      q: 'भारतातील प्रसिद्ध पारंपरिक हस्तकला आणि त्यांचे मूळ राज्य यांची पूर्णपणे बरोबर जोडी कोणती?',
      opts: [
        'पोचमपल्ली इकत विणकाम (तेलंगणा), मधुबनी चित्रकला (बिहार) आणि कुल्लू लोकरी शाली (हिमाचल प्रदेश)',
        'मधुबनी (राजस्थान), पोचमपल्ली (आसाम), कुल्लू शाली (केरळ)',
        'कलमकारी (पंजाब), चिकनकारी (गोवा), पटोला (नागालँड)',
        'वारली (मणिपूर), पैठणी (बिहार), पटचित्र (काश्मीर)',
      ],
      exp: 'पोचमपल्ली साडी (तेलंगणा), तांदळाच्या पिठातील मधुबनी कला (बिहार) व कुल्लू शाल (हिमाचल) ही राज्यनिहाय अचूक जोडणी आहे.',
    },
    hi: {
      q: 'भारत की पारंपरिक हस्तकलाओं और उनके मूल राज्यों का कौन-सा मिलान शत-प्रतिशत सही है?',
      opts: [
        'पोचमपल्ली इकत बुनाई (तेलंगाना), मधुबनी लोकचित्र (बिहार) और कुल्लू ऊनी शॉल (हिमाचल प्रदेश)',
        'मधुबनी (राजस्थान), पोचमपल्ली (असम), कुल्लू शॉल (केरल)',
        'कलमकारी (पंजाब), चिकनकारी (गोवा), पटोला (नागालैंड)',
        'वारली (मणिपुर), पैठणी (बिहार), पट्टचित्र (कश्मीर)',
      ],
      exp: 'पोचमपल्ली (तेलंगाना), मधुबनी/मिथिला चित्रकला (बिहार) व कुल्लू शॉल (हिमाचल) NCERT EVS में प्रमुख शिल्प उदाहरण हैं।',
    },
  },
  {
    topic: 'Dams Displacement vs Irrigation Trade-offs (`Narmada / Tehri Debates`)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In NCERT Class 5 "No Place for Us?", Jatryabhai’s family leaves Khedi village behind after a huge river dam rises. Examining mega-dams honestly with students highlights BOTH sides:',
      opts: [
        'Dams generate electricity and irrigate distant fields, yet submerge ancient forests and displace farming & Adivasi families needing fair rehabilitation',
        'Dams never store water and never displace any village',
        'Dams create natural snowstorms over cotton crops',
        'Displaced villages always multiply their forest area underwater',
      ],
      exp: 'Balanced EVS citizenship invites weighing energy/irrigation benefits alongside human displacement and ecological submergence costs.',
    },
    mr: {
      q: 'मोठ्या धरणांमुळे होणाऱ्या विस्थापनाचा ("No Place for Us?" सारख्या पाठातून) विद्यार्थ्यांसोबत संतुलित अभ्यास करताना कोणते दोन्ही पैलू समोर येतात?',
      opts: [
        'धरणांतून वीजनिर्मिती व सिंचन लाभ मिळतात, पण त्याच वेळी जंगले व अनेक शेतकरी-आदिवासी गावे बुडतात व त्यांचे न्याय्य पुनर्वसन आवश्यक असते',
        'धरणांमुळे कधीच कोणते गाव बुडत नाही',
        'धरणांमुळे कापसावर हिमवृष्टी होते',
        'पाण्याखाली जंगलांचे क्षेत्रफळ दुप्पट होते',
      ],
      exp: 'विकास प्रकल्पांचे फायदे आणि स्थानिक समुदायांचे विस्थापन-पुनर्वसन व पर्यावरणीय किंमत यांचा समतोल विचार EVS शिकवते.',
    },
    hi: {
      q: 'बड़े बांधों से जुड़े विस्थापन ("हमारे लिए जगह कहाँ?") पर चर्चा करते समय छात्रों के सामने कौन-से दोनों संतुलित पहलू सामने आते हैं?',
      opts: [
        'बांधों से बिजली व सिंचाई मिलती है, किंतु जंगल डूबते हैं और विस्थापित ग्रामीण-आदिवासी परिवारों का न्यायसंगत पुनर्वास आवश्यक होता है',
        'बांधों से कभी कोई गाँव नहीं डूबता',
        'बांधों से कपास पर हिमपात होता है',
        'पानी के नीचे वन क्षेत्र दुगुना बढ़ता है',
      ],
      exp: 'संवेदनशील नागरिक शिक्षा विकास के लाभों के साथ-साथ मानवीय विस्थापन और पारिस्थितिक लागत का संतुलित आकलन सिखाती है।',
    },
  },
  {
    topic: 'Map Legend & Scale Calculation (`1 cm = 110 m` Golconda/School Map)',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'On a printed town map drawn to scale `1 cm = 250 metres`, the school gate and primary health centre lie `4.4 cm` apart along a straight road. What is the ACTUAL ground distance between them?',
      opts: ['1,100 metres (`1.1 km`)', '254 metres', '880 metres', '4.4 km'],
      exp: 'Actual distance = `4.4 × 250 m = 1,100 m = 1.1 km`.',
    },
    mr: {
      q: '`१ सेमी = २५० मीटर` या प्रमाणावर काढलेल्या गावाच्या नकाशावर शाळा व आरोग्य केंद्र यांत सरळ अंतर `४.४ सेमी` असल्यास जमिनीवरील खरे अंतर किती?',
      opts: ['१,१०० मीटर (`१.१ किमी`)', '२५४ मीटर', '८८० मीटर', '४.४ किमी'],
      exp: 'खरे अंतर = `४.४ × २५० मी = १,१०० मीटर` म्हणजेच `१.१ किमी`.',
    },
    hi: {
      q: '`1 सेमी = 250 मीटर` पैमाने पर बने कस्बे के नक्शे में विद्यालय और स्वास्थ्य केंद्र के बीच सीधी दूरी `4.4 सेमी` है। वास्तविक ज़मीनी दूरी कितनी होगी?',
      opts: ['1,100 मीटर (`1.1 किमी`)', '254 मीटर', '880 मीटर', '4.4 किमी'],
      exp: 'वास्तविक दूरी = `4.4 × 250 मी = 1,100 मीटर` अर्थात `1.1 किमी`.',
    },
  },
  {
    topic: 'Conventional Map Symbols – Blue Water, Brown Contours, Green Forests',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Following universal conventional map colours used by Survey of India and textbooks, what do BLUE, GREEN, and BROWN shades typically represent on physical maps?',
      opts: [
        'Blue = Water bodies (`rivers/seas`), Green = Plains & Forests, Brown = Mountains, plateaus & contour heights',
        'Blue = Deserts, Green = Deep ocean trenches, Brown = Snow peaks',
        'Blue = Coal mines, Green = Volcano craters, Brown = Rivers',
        'Colours vary randomly at every corner of the same map',
      ],
      exp: 'Standard colour coding lets every map reader worldwide spot seas/rivers (`blue`), plains/forests (`green`), and highlands (`brown`) immediately.',
    },
    mr: {
      q: 'भूगोल व परिसर अभ्यासाच्या नकाशातील सार्वत्रिक रंगसंकेतांनुसार निळा, हिरवा आणि तपकिरी रंग अनुक्रमे काय दर्शवतात?',
      opts: [
        'निळा = जलाशय/नद्या/समुद्र, हिरवा = मैदाने व वने, तपकिरी = डोंगर, पठारे व उंच भूभाग',
        'निळा = वाळवंट, हिरवा = खोल समुद्र, तपकिरी = हिमशिखरे',
        'निळा = कोळसा खाणी, हिरवा = ज्वालामुखी, तपकिरी = नद्या',
        'एकाच नकाशात रंग प्रत्येक कोपऱ्यात बदलतात',
      ],
      exp: 'सार्वत्रिक रंगसंकेतांमुळे जगातील कोणताही प्राकृतिक नकाशा कोणासही सहज वाचता येतो.',
    },
    hi: {
      q: 'भौतिक मानचित्रों के सार्वभौमिक रंग-संकेतों में नीला, हरा और भूरा रंग क्रमशः क्या दर्शाते हैं?',
      opts: [
        'नीला = जल स्रोत (नदी/सागर), हरा = मैदान व वन, भूरा = पर्वत, पठार व ऊँचाई',
        'नीला = मरुस्थल, हरा = गहरा महासागर, भूरा = हिमशिखर',
        'नीला = कोयला खदान, हरा = ज्वालामुखी, भूरा = नदियाँ',
        'रंग एक ही नक्शे में मनमाने बदलते हैं',
      ],
      exp: 'मानक रंग-कूट विश्व भर के पाठकों को नक्शे पर जल, मैदान और पर्वत तुरंत पहचानने में मदद करते हैं।',
    },
  },
  {
    topic: 'Gadisar Lake Interconnected Nine-Pond Overflow Engineering (Jaisalmer)',
    pattern: 'Factual',
    difficulty: 'Moderate',
    en: {
      q: 'Built in arid Jaisalmer (`~650` years ago by King Gadsi Singh and highlighted in Class 5 "Every Drop Counts"), how did NINE stepped lakes around Gadisar ensure not a single monsoon drop went to waste?',
      opts: [
        'Overflowing rainwater from the upper pond spilled sequentially down channels into eight lower interconnected lakes',
        'Diesel pumps lifted desert sand upward daily',
        'Glass domes froze lakes permanently',
        'Plastic pipelines imported river water from Kerala',
      ],
      exp: 'Step-by-step gravity overflow channels filled nine successive lakes across rare Thar rainstorms.',
    },
    mr: {
      q: 'वाळवंटी जैसलमेरमधील सुमारे `६५०` वर्षे जुन्या गडीसर सरोवर समूहात पावसाच्या पाण्याचा एकही थेंब वाया जाऊ नये म्हणून कोणती अद्भुत रचना केलेली होती?',
      opts: [
        'वरचे तळे पूर्ण भरताच त्यातील अतिरिक्त पाणी पायऱ्या-पायऱ्यांच्या पाटांतून एकामागोमाग एक खालच्या नऊ तलावांत जात असे',
        'डिझेल पंपांनी वाळू उपसली जात असे',
        'काचेचे घुमट बांधून बर्फ केला जात असे',
        'केरळहून प्लास्टिक पाईप आणले होते',
      ],
      exp: 'उंच-सखल रचनेतून एका तलावाचे ओव्हरफ्लो झालेले पाणी पुढच्या तलावात वळवून दुष्काळी प्रदेशातही जलसमृद्धी साधली होती.',
    },
    hi: {
      q: 'जैसलमेर की लगभग `650` वर्ष पुरानी गड़ीसर झील श्रृंखला में दुर्लभ वर्षा की एक भी बूंद बर्बाद न हो, इसके लिए क्या अद्भुत व्यवस्था थी?',
      opts: [
        'ऊपरी तालाब के लबालब होते ही उसका अतिरिक्त पानी नहरों से बहकर क्रमशः नीचे बने आठ अन्य जुड़े तालाबों को भरता जाता था',
        'डीजल पंप से रेत निकाली जाती थी',
        'काँच के गुंबद से बर्फ जमाई जाती थी',
        'केरल से पाइप द्वारा पानी आता था',
      ],
      exp: 'नौ परस्पर जुड़े तालाबों की ढलान-आधारित प्रणाली थार मरुस्थल में प्राचीन सामुदायिक जल-प्रबंधन की मिसाल थी।',
    },
  },
  {
    topic: 'Dholavira / Stepwells (`Vav` / `Baoli`) – Ground Heat & Cooling Architecture',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Instead of hauling heavy buckets vertically up narrow open wells, ancient stone stepwells (`Barav` in Maharashtra / `Baoli` / `Vav` in Gujarat–Rajasthan) featured carved staircases reaching deep water because:',
      opts: [
        'Villagers could walk down calmly to fetch shaded water, rest inside cool stone pavilions away from heat, and let groundwater replenish reliably',
        'Staircases converted muddy rainwater directly into boiling tea',
        'Horses climbed deep wells exclusively for swimming contests',
        'Only kings drank rainwater',
      ],
      exp: 'Stepwells combined deep aquifer access, architectural shade reducing evaporation, and community gathering coolness.',
    },
    mr: {
      q: 'साध्या विहिरीतून वर पाणी खेचण्याऐवजी प्राचीन काळी महाराष्ट्रात "बारव" आणि गुजरात-राजस्थानमध्ये "बावडी/वाव" (पायऱ्यांच्या विहिरी) का बांधल्या जात असत?',
      opts: [
        'पायऱ्या उतरून सावलीत थेट पाण्यापर्यंत पोहोचता यावे, उन्हात बाष्पीभवन कमी व्हावे आणि गावकऱ्यांना थंड विश्रांतीस्थळ मिळावे म्हणून',
        'पायऱ्यांमुळे पाण्याचा उकळता चहा होतो म्हणून',
        'फक्त घोड्यांच्या शर्यतीसाठी',
        'केवळ राजांसाठीच पावसाचे पाणी असावे म्हणून',
      ],
      exp: 'दगडी बारव या भूजल संधारण, कमी बाष्पीभवन व सामाजिक सावली-विश्रांतीच्या सुंदर स्थापत्य रचना होत्या.',
    },
    hi: {
      q: 'संकरे कुओं से भारी बाल्टी खींचने के बजाय प्राचीन भारत में पत्थर की सीढ़ीदार बावड़ियाँ (`महाराष्ट्र में बारव / गुजरात में वाव`) क्यों बनाई जाती थीं?',
      opts: [
        'लोग आराम से नीचे उतरकर छाया में जल भर सकें, धूप से वाष्पीकरण कम हो और राहगीरों को शीतल विश्राम स्थल मिले',
        'सीढ़ियों से पानी उबलकर चाय बन जाता था',
        'केवल घोड़ों की तैराकी प्रतियोगिता हेतु',
        'केवल राजाओं के पीने के लिए',
      ],
      exp: 'बावड़ियाँ गहरे भूजल तक सहज पहुँच, वाष्पीकरण से सुरक्षा और सामुदायिक शीतल आश्रय का अद्भुत संगम थीं।',
    },
  },
  {
    topic: 'Asteroid Belt, Comets & Meteors (`Shooting Stars`) Distinction',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'Looking up on a clear night sky and seeing a sudden bright streak vanish in half a second ("Shooting Star" / `Ulka`), what scientific phenomenon are you actually witnessing?',
      opts: [
        'A tiny space meteoroid rock burning up fiercely from air friction as it plunges at high speed into Earth’s upper atmosphere',
        'A distant giant sun exploding completely every Tuesday',
        'A commercial aeroplane dropping headlights',
        'The Moon shedding broken surface craters nightly',
      ],
      exp: 'Meteors (`Ulka`) vaporize in Earth’s atmosphere; rare fragments sturdy enough to hit the ground (`like Lonar’s ancient impactor`) are Meteorites.',
    },
    mr: {
      q: 'स्वच्छ रात्रीच्या आकाशात क्षणार्धात चमकून नाहीसा होणारा "तुटणारा तारा" (उल्का / Shooting Star) म्हणजे वैज्ञानिकदृष्ट्या नेमके काय असते?',
      opts: [
        'अवकाशातील लहान खडकाचा तुकडा पृथ्वीच्या वातावरणात वेगाने शिरल्यावर हवेच्या घर्षणाने जळून राख होण्याचा प्रकाशझोत',
        'दूरचा एखादा मोठा सूर्य कायमचा फुटणे',
        'विमानाचा दिवा खाली पडणे',
        'चंद्राचे तुकडे दर रात्री तुटणे',
      ],
      exp: 'तो कोणताही तारा नसून वातावरणातील घर्षणामुळे पेट घेतलेला उल्कापाषाण असतो; जो तुकडा न जळता जमिनीवर पडतो त्यास उल्कापिंड म्हणतात.',
    },
    hi: {
      q: 'रात के साफ आकाश में पल भर चमककर बुझ जाने वाला "टूटता तारा (उल्का / Shooting Star)" वैज्ञानिक रूप से वास्तव में क्या होता है?',
      opts: [
        'अंतरिक्ष से आया एक छोटा चट्टानी कण जो तेज़ गति से पृथ्वी के वायुमंडल में प्रवेश करते ही वायु घर्षण से जल उठता है',
        'किसी विशाल तारे का हर रात विस्फोट होना',
        'हवाई जहाज की टूटी लाइट',
        'चंद्रमा के क्रेटर का टूटकर गिरना',
      ],
      exp: 'टूटता तारा वास्तव में तारा नहीं बल्कि वायुमंडलीय घर्षण से जलता हुआ उल्का पिंड होता है।',
    },
  },
  {
    topic: 'Why Coastal Places Stay Milder Than Inland Cities (Mumbai vs Nagpur)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'In May afternoon heat, Nagpur regularly spikes past `44°C` while coastal Mumbai/Ratnagiri rarely exceeds `35°C`, and in January Nagpur chills to `10°C` while Mumbai stays `19°C`. Why does proximity to the Arabian Sea moderate climate?',
      opts: [
        'Water heats up and cools down MUCH more slowly than solid rock/land, so alternating coastal Sea Breezes (`day`) and Land Breezes (`night`) cushion temperature extremes',
        'Mumbai sits `2,000 m` higher in snow mountains than Nagpur',
        'Nagpur has zero clouds throughout the monsoon',
        'Ocean salt acts as an electric freezer coil',
      ],
      exp: 'High specific heat capacity of ocean water creates mild maritime climate in Konkan versus extreme continental swing in Vidarbha.',
    },
    mr: {
      q: 'मे महिन्यात नागपूर `४४°C` पेक्षा जास्त तापते व जानेवारीत `१०°C` पर्यंत थंड होते, पण समुद्रकिनाऱ्यावरील मुंबई–रत्नागिरीचे तापमान वर्षभर सम (`१९°C ते ३५°C`) का राहते?',
      opts: [
        'जमिनीपेक्षा समुद्राचे पाणी सावकाश तापते व सावकाश थंड होते; दिवसाची खारी वारे (Sea Breeze) आणि रात्रीचे मतलई वारे टोकाची उष्णता-थंडी सौम्य ठेवतात',
        'मुंबई नागपूरपेक्षा २,००० मी उंच आहे म्हणून',
        'नागपुरात पावसाळ्यात ढगच नसतात म्हणून',
        'समुद्राचे मीठ वातानुकूलित यंत्रासारखे गोठते म्हणून',
      ],
      exp: 'पाण्याच्या उच्च विशिष्ट उष्माधारकतेमुळे सागरी किनारपट्टीवर सम हवामान तर भूभागांतर्गत विदर्भात विषम हवामान आढळते.',
    },
    hi: {
      q: 'मई में नागपुर `44°C+` तक तपता और जनवरी में `10°C` तक ठंडा होता है, जबकि तटीय मुंबई–रत्नागिरी का तापमान साल भर सम (`19°C–35°C`) क्यों रहता है?',
      opts: [
        'ज़मीन की तुलना में समुद्री जल बहुत धीरे गर्म व धीरे ठंडा होता है; समुद्री व स्थलीय समीर तटीय जलवायु को सम बनाए रखती हैं',
        'मुंबई नागपुर से 2,000 मी ऊँचे पहाड़ पर है',
        'नागपुर में मानसून में बादल नहीं आते',
        'समुद्री नमक फ्रिज की तरह जमता है',
      ],
      exp: 'जल की उच्च विशिष्ट ऊष्मा और समुद्री-स्थलीय पवनें कोंकण तट को सम जलवायु तथा आंतरिक विदर्भ को विषम जलवायु देती हैं।',
    },
  },
  {
    topic: 'Plastic Waste Hierarchy – Refuse, Reduce, Reuse, Repurpose, Recycle (5Rs)',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Under the environmental "5 Rs" (`Refuse, Reduce, Reuse, Repurpose, Recycle`), why does saying NO to single-use plastic bags by carrying a stitched cloth tote (`Refuse` & `Reuse`) rank ABOVE sending crushed bottles to a factory (`Recycle`)?',
      opts: [
        'Preventing new plastic production and factory remelting energy saves fossil fuel, emissions, and microplastic litter from entering rivers altogether',
        'Cloth tote bags require nuclear energy to sew',
        'Recycling melts rivers cleanly into drinkable juice',
        'Plastic breaks down cleanly inside soil within two days',
      ],
      exp: 'Refusing single-use items & reusing durable bags cut pollution at the source without energy-heavy recycling loops.',
    },
    mr: {
      q: 'पर्यावरण रक्षणाच्या ५R सूत्रात (`Refuse, Reduce, Reuse, Repurpose, Recycle`) बाटल्या कारखान्यात पाठवण्यापेक्षा (Recycle) एकदा वापरून फेकण्याच्या प्लास्टिक पिशवीला नकार देऊन कापडी पिशवी वापरणे अधिक श्रेष्ठ का ठरते?',
      opts: [
        'कारखान्यात पुन्हा वितळवण्यासाठी लागणारी ऊर्जा व प्रदूषण दोन्ही वाचते आणि नद्यांत-मातीत कचरा तयारच होत नाही',
        'कापडी पिशवी शिवण्यास अणुऊर्जा लागते म्हणून',
        'रिसायकलिंगमुळे नद्यांचा रस होतो म्हणून',
        'प्लास्टिक मातीत दोन दिवसांत कुजते म्हणून',
      ],
      exp: 'कचरा निर्माणच होऊ न देणे (नकार व पुनर्वापर) हे तयार झालेल्या कचऱ्यावर प्रक्रिया करण्यापेक्षा नेहमीच अधिक पर्यावरणपूरक असते.',
    },
    hi: {
      q: 'पर्यावरण के "5R" सिद्धांत में प्लास्टिक बोतलें रीसायकल करने से भी ऊपर कपड़े का थैला लेकर एकल-उपयोग प्लास्टिक को "मना करना (Refuse)" व "पुनः उपयोग (Reuse)" क्यों रखा जाता है?',
      opts: [
        'क्योंकि नया प्लास्टिक बनने व कारखाने में गलाने की ऊर्जा-प्रदूषण दोनों बचते हैं और कचरा नदियों-मिट्टी में पहुँचता ही नहीं',
        'कपड़े के थैले सिलाई में परमाणु ऊर्जा लगती है',
        'रीसायकल से नदियाँ जूस बन जाती हैं',
        'प्लास्टिक मिट्टी में दो दिन में गल जाता है',
      ],
      exp: 'स्रोत पर ही कचरे को रोकना (Refuse/Reuse) ऊर्जा-खर्चीले रीसायकलिंग से कहीं अधिक पर्यावरण अनुकूल है।',
    },
  },
  {
    topic: 'Khejri Tree (`Bishnoi Heritage`) – Khejadli Conservation Story',
    pattern: 'Factual',
    difficulty: 'Easy',
    en: {
      q: 'NCERT Class 4 ("The Story of Amrita"): Living in Khejadli village near Jodhpur, Amrita Devi Bishnoi and `363` villagers hugged green trees (`1730 CE`) sacrificing their lives to protect which hardy desert tree that feeds cattle, enriches soil, and needs scarce water?',
      opts: ['Khejri tree', 'Eucalyptus tree', 'Alpine Pine', 'Rubber tree'],
      exp: 'Amrita Devi’s sacrifice (`"Sar santhe runkh rahe to bhi sasto jaan"`) inspired India’s modern Chipko movement (`Sundarlal Bahuguna & Gaura Devi`).',
    },
    mr: {
      q: 'जोधापूरजवळील खेजडली गावात `१७३०` मध्ये अमृतादेवी बिष्णोई व `३६३` ग्रामस्थांनी मिठी मारून प्राणार्पण करून वाळवंटातील कोणत्या बहुगुणी वृक्षाचे रक्षण केले?',
      opts: ['खेजडी वृक्ष (Khejri)', 'निलगिरी वृक्ष', 'हिमालयीन देवदार', 'रबर वृक्ष'],
      exp: 'वाळवंटात कमी पाण्यात वाढणाऱ्या, गुरांना चारा व गावकऱ्यांना सावली-औषधे देणाऱ्या खेजडी वृक्षाच्या रक्षणातूनच पुढे चिपको आंदोलनाला प्रेरणा मिळाली.',
    },
    hi: {
      q: '`1730` में जोधपुर के खेजड़ली गाँव में अमृता देवी बिश्नोई और `363` ग्रामीणों ने लिपटकर प्राण न्योछावर करते हुए मरुस्थल के किस बहुपयोगी वृक्ष को बचाया था?',
      opts: ['खेजड़ी वृक्ष', 'नीलगिरी वृक्ष', 'चीड़ वृक्ष', 'रबड़ वृक्ष'],
      exp: 'कम पानी में पनपने वाले खेजड़ी वृक्ष की रक्षा हेतु अमृता देवी का बलिदान आगे चिपको आंदोलन की अमर प्रेरणा बना।',
    },
  },
  {
    topic: 'Jhoom (Shifting) Farming Tradition & Bamboo Lotteries of Mizoram',
    pattern: 'Factual',
    difficulty: 'Moderate',
    en: {
      q: 'In NCERT Class 5 "Whose Forests?", why do Mizoram’s village assemblies draw lots with bamboo slips (`Tin farming measure`) and practice rotational `Jhoom` cultivation carefully?',
      opts: [
        'Village forest land belongs collectively to ALL families by turn (`not private monopoly`), and resting plots for several years lets bamboo ash & soil regenerate before replanting mixed crops',
        'Bamboo lots decide coastal ship captains',
        'Farmers plant exclusively wheat in frozen ocean pits',
        'Every family burns evergreen trees without ever resting land',
      ],
      exp: 'Mizoram’s community lottery allocates forest plots equitably each year, practicing traditional mixed-cropping (`rice, maize, chillies, veggies`).',
    },
    mr: {
      q: 'मिझोरममधील पारंपरिक "झूम शेती" व बांबूच्या चिठ्ठ्यांद्वारे (Lotteries) जमीन वाटपाची पद्धत कशाचे द्योतक आहे?',
      opts: [
        'जंगलाच्या जमिनीवर संपूर्ण गावाचा सामूहिक हक्क असतो, प्रत्येक कुटुंबाला आळीपाळीने कसण्यास भाग मिळतो आणि काही वर्षे जमीन पडीक ठेवून नैसर्गिक सुपीकता जपली जाते',
        'बांबू चिठ्ठ्यांतून समुद्र कप्तान निवडतात',
        'समुद्रात गहू पिकवतात',
        'जमीन कधीच विश्रांतीशिवाय जाळली जाते',
      ],
      exp: 'सामुदायिक जमीन वाटप व जमिनीला नैसर्गिक विश्रांती देणारी मिश्र पीक पद्धती डोंगराळ ईशान्य भारतातील वैशिष्ट्य आहे.',
    },
    hi: {
      q: 'मिज़ोरम में सामुदायिक "झूम खेती" और बाँस की पर्चियों द्वारा भूमि आवंटन की परंपरा क्या दर्शाती है?',
      opts: [
        'जंगल की भूमि पूरे गाँव की साझा धरोहर है—हर परिवार को बारी-बारी टिन-माप से हिस्सा मिलता है और खेतों को कई वर्ष विश्राम देकर मिश्रित फसलें उगाई जाती हैं',
        'पर्चियों से जहाज़ के कप्तान चुने जाते हैं',
        'समुद्र में गेहूँ उगाते हैं',
        'ज़मीन को बिना विश्राम लगातार जलाते हैं',
      ],
      exp: 'सामुदायिक लॉटरी से न्यायपूर्ण भूमि-वितरण व विश्राम-काल द्वारा मिश्रित खेती (धान, मक्का, मिर्च, सब्ज़ी) की परंपरा सँभाली जाती है।',
    },
  },
  {
    topic: 'Gregory Mendel’s Pea Genetics Discovery – Trait Inheritance Basics',
    pattern: 'Factual',
    difficulty: 'Moderate',
    en: {
      q: 'Studying nearly `28,000` garden pea plants over `7` years (`tall/short, smooth/wrinkled, yellow/green`), which Austrian monk scientist (`highlighted in Class 5 "Like Father, Like Daughter"`) discovered the laws of inherited traits?',
      opts: ['Gregor Johann Mendel', 'Isaac Newton', 'Galileo Galilei', 'Louis Pasteur'],
      exp: 'Gregor Mendel (`1822–1884`) proved traits pass cleanly in discrete paired units (`later named genes`) from parents to offspring.',
    },
    mr: {
      q: 'सलग ७ वर्षे सुमारे `२८,०००` वाटाण्याच्या रोपांवर प्रयोग करून आई-वडिलांकडून पुढच्या पिढीत आनुवंशिक गुणधर्म कसे उतरतात याचे नियम कोणी शोधले (`"Like Father, Like Daughter"` पाठ)?',
      opts: ['ग्रेगर जोहान मेंडेल', 'आयझॅक न्यूटन', 'गॅलिलिओ गॅलिली', 'लुई पाश्चर'],
      exp: 'ग्रेगर मेंडेल यांनी वाटाण्याच्या रोपांच्या प्रयोगांतून आनुवंशिकतेचे मूलभूत नियम जगासमोर मांडले.',
    },
    hi: {
      q: 'लगातार 7 वर्षों तक लगभग `28,000` मटर के पौधों पर प्रयोग कर माता-पिता से संतानों में गुणों की वंशागति के नियम किस वैज्ञानिक ने खोजे?',
      opts: ['ग्रेगर जोहान मेंडल', 'आइज़ैक न्यूटन', 'गैलीलियो गैलीली', 'लुई पाश्चर'],
      exp: 'ग्रेगर मेंडल ने मटर के पौधों पर संकरण प्रयोगों से आनुवंशिकता (Genetics) के आधारभूत नियम प्रतिपादित किए।',
    },
  },
];
