import { CuratedTrilingualMcq } from './types';

// Batch 3 Primary EVS Pedagogy Part 2 (28 verified trilingual MCQs)
export const MAHA_TET_P1_B3_EVS_PED2: CuratedTrilingualMcq[] = [
  {
    topic: 'Discovery-Based Bulb, Battery & Wire Circuit Challenge',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Instead of drawing a finished textbook circuit diagram on Day 1, handing Class 5 pairs a dry cell, a torch bulb, and two stripped pieces of wire and asking "Find TWO different ways to make the bulb glow (`and two ways it fails!`)" nurtures:',
      opts: [
        'Active trial-and-error hypothesis testing—discovering on their own why BOTH metal contact points (`side rim + bottom nub`) must form a closed unbroken loop',
        'Dangerous short-circuiting of live 230V classroom wall mains',
        'Memorizing Ohm’s law algebra without touching wires',
        'Waiting passively for teacher notes',
      ],
      exp: 'Low-voltage `1.5V` cell exploration lets children discover closed-loop paths and terminal contacts firsthand safely.',
    },
    mr: {
      q: 'पहिल्याच दिवशी फळ्यावर विद्युत परिपथाची आकृती काढण्यापेक्षा इ. ५ वीच्या जोड्यांना एक कोरडा सेल, छोटा बल्ब व दोन तारा देऊन "बल्ब पेटण्याचे दोन वेगळे मार्ग शोधा!" असे सांगितल्याने काय घडते?',
      opts: [
        'प्रत्यक्ष प्रयत्नांतून बल्बच्या दोन्ही टोकांचा (बाजूचा भाग व तळाचा बिंदू) अखंड बंद मार्ग जोडला तरच दिवा लागतो हा शोध मुले स्वतः लावतात',
        '२३० व्होल्टच्या भिंतीवरील मेन प्लगमध्ये तारा घालण्याची सवय',
        'तारा न धरता ओहमचा नियम पाठ करणे',
        'शिक्षकांच्या नोट्सची निष्क्रिय प्रतीक्षा',
      ],
      exp: '१.५ व्होल्टच्या सेलवर स्वतःच्या हाताने जोडणी केल्यास बंद परिपथाचा वैज्ञानिक नियम जिवंत अनुभवातून पक्का होतो.',
    },
    hi: {
      q: 'पहले ही दिन बोर्ड पर चित्र बनाने की बजाय कक्षा 5 की जोड़ियों को सूखा सेल, छोटा बल्ब व दो तार देकर "बल्ब जलाने के दो अलग तरीके खोजो!" कहना क्या विकसित करता है?',
      opts: [
        'सक्रिय परीक्षण-त्रुटि से बच्चे स्वयं खोजते हैं कि बल्ब के दोनों संपर्क बिंदुओं से होकर एक बंद लूप पूरा होना क्यों आवश्यक है',
        '230V दीवार सॉकेट से खतरनाक प्रयोग की आदत',
        'तार छुए बिना ओम का नियम रटना',
        'नोट्स की निष्क्रिय प्रतीक्षा',
      ],
      exp: '1.5V सेल से प्रत्यक्ष प्रयोग बंद विद्युत-परिपथ की अवधारणा को स्वतः-खोज के माध्यम से अविस्मरणीय बना देता है।',
    },
  },
  {
    topic: 'Safe Classroom Food Adulteration Checks (Milk Drop & Rava Magnet)',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Which two completely safe, zero-chemical food-quality tests can Class 5 pupils run at a school desk to spot common household adulteration?',
      opts: [
        'Roll a drop of milk down a polished tilted steel plate (`pure milk crawls slowly leaving a white trail; watered milk races clear`) and pass a magnet over semolina/tea (`catches stray iron filings`)',
        'Swallow unknown powdered dyes to test stomach pain',
        'Taste raw commercial acid drops inside milk samples',
        'Burn plastic wrappers next to grains',
      ],
      exp: 'NCERT/FSSAI DART guides include zero-hazard tests like tilted-plate milk flow and magnet checks safely for primary classrooms.',
    },
    mr: {
      q: 'इ. ५ वीतील मुले कोणत्याही घातक रसायनाशिवाय वर्गाच्या बाकावर अन्नभेसळ तपासण्याचे कोणते दोन पूर्णपणे सुरक्षित प्रयोग करू शकतात?',
      opts: [
        'तिरप्या स्वच्छ स्टील ताटावर दुधाचा थेंब सोडून पांढरा ओघळ पाहणे (पाणी मिसळल्यास थेंब वेगाने वाहतो) आणि रव्यावरून चुंबक फिरवून लोखंडी कण तपासणे',
        'अज्ञात रंग खाऊन पोटदुखी तपासणे',
        'दुधात तीव्र आम्ल घालून चव घेणे',
        'धान्याजवळ प्लास्टिक जाळणे',
      ],
      exp: 'ताटलीवरील दुधाची चाचणी व रवा-चहापावडरमधील लोखंडासाठी चुंबक चाचणी मुलांना सुरक्षित ग्राहक-जागृती देतात.',
    },
    hi: {
      q: 'कक्षा 5 के छात्र बिना किसी खतरनाक रसायन के डेस्क पर मिलावट पहचानने के कौन-से दो पूर्णतः सुरक्षित परीक्षण कर सकते हैं?',
      opts: [
        'तिरछी स्टील प्लेट पर दूध की बूंद लुढ़काना (शुद्ध दूध धीमे सफेद निशान छोड़ता है; पानी मिला तेज़ बहता है) और सूजी/चाय पत्ती पर चुंबक घुमाकर लोहे के कण परखना',
        'अज्ञात रंग खाकर देखना',
        'दूध में तीव्र अम्ल चखना',
        'अनाज के पास प्लास्टिक जलाना',
      ],
      exp: 'FSSAI के सरल घरेलू परीक्षण (प्लेट-बूंद व चुंबक जाँच) बच्चों में सुरक्षित उपभोक्ता वैज्ञानिक जागरूकता जगाते हैं।',
    },
  },
  {
    topic: 'DIY Plastic Bottle Rain Gauge for Monsoon Measurement',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Cutting off the top third of a straight cylindrical clear water bottle, inverting that funnel neck snugly back into the base, and pasting a `cm/mm` ruler along its straight side yields what working weather instrument for Class 4?',
      opts: [
        'A low-cost Rain Gauge placed cleanly in an open schoolyard away from tree canopies and eaves',
        'A high-precision digital barometer',
        'A windmill speed anemometer',
        'A microscope slide tray',
      ],
      exp: 'Setting a home-made bottle rain gauge in open courtyard lets pupils measure actual daily monsoon rainfall in `mm`.',
    },
    mr: {
      q: 'दंडगोलाकार पारदर्शक बाटलीचा वरचा भाग कापून उलटा नरसाळ्यासारखा बसवल्यास आणि बाजूला `मिमी/सेमी` पट्टी चिकटवल्यास इ. ४ थीसाठी कोणते हवामान मोजण्याचे उपकरण तयार होते?',
      opts: [
        'झाडे व छपरांच्या आडोशापासून दूर मोकळ्या मैदानात ठेवता येणारे कमी खर्चाचे "पर्जन्यमापक (Rain Gauge)"',
        'डिजिटल वायुभारमापक',
        'पवनवेगमापक',
        'सूक्ष्मदर्शक पट्टी',
      ],
      exp: 'स्वतः बनवलेले बाटलीचे पर्जन्यमापक मोकळ्या जागेत ठेवून मुले पावसाचे अचूक मिमी मोजमाप गणिताशी जोडून अनुभवतात.',
    },
    hi: {
      q: 'पारदर्शी सीधी बोतल का ऊपरी सिरा काटकर उल्टी कीप जैसा लगाने और बगल में `मिमी/सेमी` स्केल चिपकाने से कक्षा 4 के लिए कौन-सा मौसम यंत्र बनता है?',
      opts: [
        'पेड़ों व छतों से दूर खुले मैदान में रखने योग्य कम लागत वाला "वर्षामापी (Rain Gauge)"',
        'डिजिटल बैरोमीटर',
        'पवन-गतिमापी',
        'माइक्रोस्कोप ट्रे',
      ],
      exp: 'हाथ से बना बोतल वर्षामापी मानसून में प्रतिदिन की वर्षा मिलीमीटर में नापकर विज्ञान व गणित को जोड़ता है।',
    },
  },
  {
    topic: 'Soil Percolation Rate Fair-Test With Equal Funnel & Water',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Pouring `100 ml` of water into three identical funnels packed equally with dry sand, red loamy garden soil, and sticky clay soil lets Class 5 pupils test percolation rates scientifically—provided:',
      opts: [
        'All three funnels hold the EXACT SAME mass/volume of soil, identical filter cloth, and identical `100 ml` water poured simultaneously for fair timing comparison',
        'Clay soil gets `300 ml` hot water while sand receives `20 ml` cold water',
        'Only sand has filter paper while clay pours straight onto the floor',
        'Results are guessed before pouring any drop',
      ],
      exp: 'Fair-testing percolation reveals why sand drains rapidly, clay waterlogs, and balanced garden loam retains ideal root moisture.',
    },
    mr: {
      q: 'वाळू, बागेतील भुसभुशीत पोयटा माती आणि चिकणमाती यांतून पाणी झिरपण्याचा वेग तपासण्यासाठी तीन नरसाळ्यांत `१०० मिली` पाणी ओतण्याचा प्रयोग केव्हा अचूक व निःपक्षपाती ठरेल?',
      opts: [
        'तिन्ही नरसाळ्यांत मातीचे प्रमाण सारखे, गाळणकापड सारखे आणि एकाच वेळी बरोबर `१०० मिली` पाणी ओतून खाली जमा होण्याचा वेळ मोजल्यास',
        'चिकणमातीत ३०० मिली गरम तर वाळूत २० मिली थंड पाणी ओतल्यास',
        'फक्त वाळूत गाळण कागद वापरल्यास',
        'प्रयोगाआधीच अंदाज लिहिल्यास',
      ],
      exp: 'माती व पाण्याचे समान प्रमाण ठेवल्यास वाळूतून झटपट निचरा व चिकणमातीत पाणी साचून राहण्याचा गुणधर्म स्पष्ट सिद्ध होतो.',
    },
    hi: {
      q: 'रेत, दोमट बगीचे की मिट्टी और चिकनी मिट्टी में जल-रिसाव दर नापने हेतु तीनों कीपों में `100 मिली` पानी डालने का प्रयोग कब निष्पक्ष (Fair Test) होगा?',
      opts: [
        'जब तीनों में मिट्टी की मात्रा समान हो, एक जैसा फ़िल्टर कपड़ा हो और ठीक एक साथ `100 मिली` पानी डालकर समय गिना जाए',
        'चिकनी मिट्टी में 300 मिली गर्म और रेत में 20 मिली ठंडा पानी डालें',
        'केवल रेत में ही फ़िल्टर लगाएँ',
        'बिना प्रयोग किए अनुमान लिख लें',
      ],
      exp: 'नियंत्रित मात्राओं के साथ तुलना दिखाती है कि रेत से पानी तेजी से निकलता है, चिकनी मिट्टी रोकती है और दोमट संतुलित नमी रखती है।',
    },
  },
  {
    topic: 'Inverted Water Glass Card Trick – Air Pressure Explanation (Not Magic)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Filling a tumbler cleanly to the rim with water, sliding a smooth postcard on top, and flipping it upside down without spilling leaves Class 5 pupils gasping! Why MUST the teacher immediately unpack the science afterward?',
      opts: [
        'To ensure it does not remain "magic tricks"—guiding children to explain that upward OUTSIDE ATMOSPHERIC AIR PRESSURE pushing on the card holds the water column up against gravity',
        'To prove invisible glue sticks wet paper permanently to plastic',
        'Because turning glasses sideways freezes droplets instantly',
        'To hide how air pressure exists around us',
      ],
      exp: 'Discrepant events spark deep wonder ONLY when followed by collaborative sense-making (`atmospheric air pushes upward too!`).',
    },
    mr: {
      q: 'काठोकाठ पाण्याने भरलेल्या पेलयावर पोस्टकार्ड ठेवून उलटा केल्यास पाणी न सांडण्याचा चमत्कार पाहून मुले थक्क होतात; त्यानंतर शिक्षकांनी तात्काळ कोणते वैज्ञानिक स्पष्टीकरण घडवावे?',
      opts: [
        'तो केवळ "जादूचा खेळ" न ठेवता, खालून वर ढकलणारा वातावरणीय हवेचा दाब (Air Pressure) कार्डला व पाण्याला धरून ठेवतो हे समजावून घेणे',
        'पाण्यामुळे कागदाला कायमचा डिंक लागतो असे सांगणे',
        'पेला उलटा करताच पाणी गोठते असे सांगणे',
        'हवेच्या दाबाची माहिती लपवून ठेवणे',
      ],
      exp: 'विसंगत आश्चर्यकारक प्रयोगाचा (Discrepant event) खरा शैक्षणिक लाभ त्यामागील वैज्ञानिक तर्काची चर्चा केल्यावरच मिळतो.',
    },
    hi: {
      q: 'पानी से लबालब भरे गिलास पर पोस्टकार्ड रखकर उल्टा करने पर पानी न गिरना बच्चों को चौंका देता है; शिक्षक को तुरंत क्या करना चाहिए?',
      opts: [
        'इसे मात्र "जादू" न रहने देकर समझाना कि नीचे से ऊपर की ओर लग रहा बाहरी वायुमंडलीय दाब (Air Pressure) कार्ड व पानी को रोके रखता है',
        'कहना कि पानी में अदृश्य गोंद होता है',
        'बता देना कि उल्टा करने से बर्फ बन गई',
        'वायुदाब की बात छिपा लेना',
      ],
      exp: 'विस्मयकारी प्रदर्शन तभी सार्थक विज्ञान बनता है जब तुरंत बाद उसके पीछे के वैज्ञानिक कारण पर संवाद हो।',
    },
  },
  {
    topic: 'Map Spatial Progression – Classroom Plan -> Neighborhood -> District -> India',
    pattern: 'Conceptual',
    difficulty: 'Easy',
    en: {
      q: 'Why does primary geography pedagogy introduce mapping in Class 3 starting from a "Top-Down Bird’s-Eye Sketch of My Own Classroom Desk & Schoolyard" BEFORE handing out a printed political map of India?',
      opts: [
        'Young children first grasp bird’s-eye perspective, symbol keys, and scale cleanly on familiar 3D spaces they walk daily before tackling vast abstract state boundaries',
        'Classroom floors change geographic latitude weekly',
        'India’s map uses zero directional arrows',
        'Desk drawings never require symbols or legends',
      ],
      exp: 'Moving from lived concrete space (`desk -> village lane -> taluka -> state -> nation`) avoids abstract map-memorizing emptiness.',
    },
    mr: {
      q: 'भारताचा नकाशा थेट हातात देण्यापूर्वी इ. ३ रीत नकाशावाचनाची सुरुवात "माझ्या वर्गाची वरून दिसणारी आकृती व शाळेच्या परिसराचा आराखडा" यापासून का केली जाते?',
      opts: [
        'मुले ज्या जागेत रोज चालतात त्या परिचित जागेवरून "वरून पाहण्याचा दृष्टिकोन (Bird’s-eye view), प्रमाण व सांकेतिक खुणा" सहज समजून अमूर्त नकाशांकडे जाऊ शकतात',
        'वर्गाची अक्षवृत्ते दर आठवड्याला बदलतात म्हणून',
        'भारताच्या नकाशावर दिशा नसतात म्हणून',
        'वर्गाच्या नकाशात खुणा नसतात म्हणून',
      ],
      exp: 'ज्ञात परिसरातून अज्ञाताकडे (वर्ग -> गाव -> जिल्हा -> राज्य -> देश) ही नकाशावाचनाची नैसर्गिक मानसशास्त्रीय पायरी आहे.',
    },
    hi: {
      q: 'सीधे भारत का राजनीतिक नक्शा थमाने से पहले कक्षा 3 में मानचित्रण की शुरुआत "मेरी कक्षा और विद्यालय आँगन के ऊपरी खाके" से क्यों की जाती है?',
      opts: [
        'परिचित स्थान पर बच्चे "ऊपर से देखने का दृष्टिकोण (Bird’s-eye view)", संकेत-सूची और पैमाने को आसानी से समझकर फिर विशाल नक्शों तक बढ़ते हैं',
        'कक्षा का अक्षांश हर हफ्ते बदलता है',
        'भारत के नक्शे में दिशा तीर नहीं होते',
        'डेस्क मानचित्र में प्रतीकों की आवश्यकता नहीं होती',
      ],
      exp: 'ज्ञात से अज्ञात की ओर (कक्षा -> मोहल्ला -> ज़िला -> राज्य -> देश) बढ़ना प्राथमिक मानचित्र-शिक्षण का सर्वोत्तम क्रम है।',
    },
  },
  {
    topic: 'Grandparent Oral-History Interviews for Weather vs Climate Sense',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Asking Class 5 pupils to interview two elderly neighbours about how summer heat, monsoon onset, well water depths, and common backyard birds changed over `40` years turns climate literacy into:',
      opts: [
        'Deep intergenerational oral history connecting scientific climate shifts to tangible local village memory and stewardship',
        'Disrespect toward modern thermometers',
        'Pure fiction creative writing',
        'Irrelevant gossip outside curriculum',
      ],
      exp: 'Oral history from elders humanizes long-term ecological shifts (`sparrow decline, dried shallow wells`) alongside temperature graphs.',
    },
    mr: {
      q: 'इ. ५ वीच्या मुलांना घरातील आजी-आजोबांकडून गेल्या ४० वर्षांतील उन्हाळा, पावसाची सुरुवात, विहिरीतील पाणी व अंगणातील चिमण्यांमधील बदलांची मुलाखत घ्यायला सांगितल्याने काय साध्य होते?',
      opts: [
        'पिढ्यान्पिढ्यांच्या मौखिक अनुभवांतून दीर्घकालीन हवामान बदल व स्थानिक पर्यावरणाचे जिवंत भान विद्यार्थ्यांत निर्माण होते',
        'थर्मोमीटरबद्दल अविश्वास',
        'निव्वळ काल्पनिक गोष्टलेखन',
        'अभ्यासक्रमाबाहेरील निरर्थक गप्पा',
      ],
      exp: 'ज्येष्ठांच्या प्रत्यक्ष अनुभवांशी हवामान-नोंदी जोडल्याने पर्यावरण बदलाची जाणीव मनाला भिडते.',
    },
    hi: {
      q: 'कक्षा 5 के बच्चों को दादा-दादी या बुजुर्ग पड़ोसियों से पिछले 40 वर्षों में गर्मी, मानसून, कुओं के जलस्तर और गौरैया जैसे बदलावों का साक्षात्कार लेने को देने से क्या मिलता है?',
      opts: [
        'अंतर-पीढ़ी मौखिक इतिहास द्वारा वैज्ञानिक जलवायु बदलाव और स्थानीय पारिस्थितिकी की जीवंत संवेदनशील समझ बनती है',
        'थर्मामीटर के प्रति अनादर',
        'केवल काल्पनिक कहानी लेखन',
        'पाठ्यक्रम से बाहर की गपशप',
      ],
      exp: 'बुजुर्गों के प्रत्यक्ष स्मरण दीर्घकालिक पर्यावरणीय बदलावों को आँकड़ों से परे मानवीय संवेदना से जोड़ते हैं।',
    },
  },
  {
    topic: 'Safe E-Waste & Battery Disposal Awareness Over Breaking Bulbs',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'When organizing a school recycling campaign for broken torches, spent AA batteries, and fused CFL/LED bulbs (`E-waste`), which safety rule MUST teachers enforce strictly?',
      opts: [
        'Collect dead batteries and glass tubes intact inside a labeled box for authorized municipal e-waste drop-off—NEVER smash tubes (`mercury vapour!`) or chew/open batteries',
        'Let Class 4 pupils crack glass CFL tubes with hammers to inspect dust',
        'Burn plastic remote cases on playground leaf piles (`dioxins!`)',
        'Throw leaky lithium batteries into school drinking water tanks',
      ],
      exp: 'Fused fluorescent bulbs contain toxic mercury and batteries hold corrosive chemicals; intact collection prevents toxic exposure.',
    },
    mr: {
      q: 'शाळेत बंद पडलेल्या बॅटरी सेल व फ्युज झालेल्या CFL/LED ट्यूब ("ई-कचरा") संकलन मोहिमेत शिक्षकांनी कोणता कडक सुरक्षा नियम पाळणे बंधनकारक आहे?',
      opts: [
        'वापरलेल्या बॅटऱ्या व काचेच्या ट्यूब न फोडता स्वतंत्र झाकलेल्या डब्यात साठवून अधिकृत ई-कचरा केंद्राकडे द्याव्यात—कधीही फोडू किंवा जाळू नयेत (`पारा व विषारी वायू` बाहेर पडतात!)',
        'आतील पावडर पाहण्यासाठी मुले हातोड्याने ट्यूब फोडतील',
        'वाळलेल्या पानांसोबत रिमोटचे प्लास्टिक जाळणे',
        'बॅटऱ्या पाण्याच्या टाकीत टाकणे',
      ],
      exp: 'ई-कचऱ्यातील पारा व जड धातू अत्यंत विषारी असल्याने तो सुरक्षितपणे न फोडता वेगळा जमा करणे अत्यावश्यक आहे.',
    },
    hi: {
      q: 'स्कूल में खराब बैटरी सेल और फ्यूज CFL/LED बल्ब ("ई-कचरा") संग्रह अभियान में शिक्षक को कौन-सा सख्त सुरक्षा नियम लागू करना चाहिए?',
      opts: [
        'बैटरी व ट्यूब को बिना तोड़े अलग चिह्नित डिब्बे में इकट्ठा कर अधिकृत ई-कचरा केंद्र भेजें—कभी हथौड़े से न तोड़ें (`पारा वाष्प विषैला होता है!`) और न जलाएँ',
        'भीतर का पाउडर देखने को बल्ब फोड़ने देना',
        'सूखे पत्तों संग प्लास्टिक रिमोट जला देना',
        'बैटरी को पानी की टंकी में डालना',
      ],
      exp: 'CFL में पारा और बैटरियों में संक्षारक रसायन होते हैं; अतः उन्हें साबुत व सुरक्षित अलग संकलित करना अनिवार्य है।',
    },
  },
  {
    topic: 'Poshan Vatika (School Nutrition Garden) Cross-Curricular Richness',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Maintaining a modest "Poshan Vatika" (`school kitchen garden` of spinach, fenugreek, coriander, drumstick, and composted fallen leaves) turns campus corners into a living lab connecting:',
      opts: [
        'Plant growth cycles, compost soil renewal, drip water care, measurement math, and fresh iron/vitamin greens straight into Mid-Day Meals',
        'Commercial pesticide spraying competitions',
        'Pure memorization of foreign rose breeds',
        'Eliminating classroom reading periods forever',
      ],
      exp: 'Poshan Vatika unites biological observation, organic stewardship, nutrition literacy, and pride in farm-to-plate food.',
    },
    mr: {
      q: 'शाळेच्या आवारात पालक, मेथी, कोथिंबीर, शेवगा व सेंद्रिय खताची छोटी "पोषण वाटिका (परसबाग)" जोपासल्याने कोणते विषय एकत्र येतात?',
      opts: [
        'वनस्पती वाढचक्र, कंपोस्ट खत, पाण्याचा काटकसरी वापर, मोजमाप गणित आणि शालेय पोषण आहारातील ताज्या लोह-जीवनसत्त्व भाज्या',
        'रासायनिक कीटकनाशक फवारणी स्पर्धा',
        'परदेशी गुलाबांच्या जाती पाठ करणे',
        'वर्गातील वाचन कायमचे बंद करणे',
      ],
      exp: 'शाळेची पोषण वाटिका (Poshan Vatika) प्रत्यक्ष श्रम, विज्ञान, पोषण व पर्यावरण संरक्षण यांचा जिवंत संगम आहे.',
    },
    hi: {
      q: 'स्कूल आँगन में पालक, मेथी, धनिया, सहजन और कम्पोस्ट खाद से बनी "पोषण वाटिका" किन पहलुओं को जीवंत प्रयोगशाला में जोड़ती है?',
      opts: [
        'पौधों का जीवन-चक्र, जैविक खाद निर्माण, जल संरक्षण, मापन गणित और मध्याह्न भोजन के लिए ताज़ी लौह-विटामिन युक्त सब्ज़ियाँ',
        'कीटनाशक छिड़काव प्रतियोगिता',
        'विदेशी गुलाब की किस्में रटना',
        'कक्षा का पठन बंद करना',
      ],
      exp: 'स्कूल पोषण वाटिका जैविक कृषि, पोषण शिक्षा और पर्यावरण संवेदनशीलता को प्रत्यक्ष अनुभव से जोड़ती है।',
    },
  },
  {
    topic: 'Dispelling Superstition Gently Through Evidence (Solar Eclipse / Snake Milk)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'When a Class 5 learner sincerely repeats a community superstition ("Snakes drink bowls of milk on festivals!" or "Cooking food during eclipse turns poisonous!"), how should an empathetic scientific teacher respond?',
      opts: [
        'Never ridicule the child’s family; gently present respectful biological facts (`snakes are strict carnivores whose stomachs lack lactase—forcing milk harms them; food cooks safely during eclipses since lunar/solar shadow alters only light!`)',
        'Mock the student loudly before classmates as "ignorant villager"',
        'Validate superstition blindly to save lesson time',
        'Ban all cultural festival discussions forever',
      ],
      exp: 'Scientific temper (Article `51A(h)`) grows best through compassionate evidence rather than shaming cultural elders.',
    },
    mr: {
      q: '"साप दूध पितात!" किंवा "ग्रहणात अन्न शिजवल्यास विषारी होते!" अशी समजूत विद्यार्थी वर्गात मांडतो तेव्हा संवेदनशील विज्ञान-जागरूक शिक्षकाने कसा प्रतिसाद द्यावा?',
      opts: [
        'मुलाची किंवा कुटुंबाची टिंगल न करता प्रेमाने वैज्ञानिक पुरावा देणे (`साप मांसाहारी आहेत, त्यांना दूध पचत नाही; ग्रहणात फक्त सावली पडते—अन्नावर विषारी बदल होत नाही`)',
        'वर्गासमोर "अडाणी खेडूत" म्हणून हिणवणे',
        'वेळ वाचवण्यासाठी अंधश्रद्धेला होकार देणे',
        'सणांवरील सर्व चर्चा कायमची बंद करणे',
      ],
      exp: 'वैज्ञानिक दृष्टिकोन (कलम ५१A(h)) हा कोणाचाही उपहास न करता शांत व स्नेहपूर्ण पुराव्यांनी रुजवायचा असतो.',
    },
    hi: {
      q: 'यदि छात्र ईमानदारी से लोक-मान्यता दोहराए ("साँप दूध पीते हैं!" या "ग्रहण में भोजन ज़हर बन जाता है!"), तो संवेदनशील शिक्षक को क्या करना चाहिए?',
      opts: [
        'परिवार का मज़ाक उड़ाए बिना स्नेहपूर्वक वैज्ञानिक तथ्य रखना (`साँप मांसाहारी हैं, दूध उन्हें नुकसान पहुँचाता है; ग्रहण केवल छाया की खगोलीय घटना है`)',
        'पूरी कक्षा के सामने बच्चे को "पिछड़ा" कहकर शर्मिंदा करना',
        'समय बचाने को अंधविश्वास पर हाँ मिला देना',
        'त्योहारों पर चर्चा हमेशा को रोक देना',
      ],
      exp: 'वैज्ञानिक दृष्टिकोण (अनुच्छेद `51A(h)`) उपहास के बजाय करुणामय संवाद और प्रमाण से पनपता है।',
    },
  },
  {
    topic: 'Water Audit at Home – Bucket Bath vs Hose/Running Tap Calculation',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Having Class 4 learners time how many `1-litre` mugs fill from a brushing tap left running versus rinsing from one `500 ml` mug makes water conservation effective because:',
      opts: [
        'Replacing vague slogans ("Save Water") with concrete personal measurements ("Closing the tap saved 9 litres JUST THIS MORNING!") sparks genuine habit change',
        'Running taps waste zero water underground',
        'Students stop brushing teeth permanently',
        'Counting litres replaces multiplication tables completely',
      ],
      exp: 'Quantitative self-audits give primary students immediate ownership and visible proof of everyday conservation impact.',
    },
    mr: {
      q: 'केवळ "पाणी वाचवा" ही घोषणा न देता इ. ४ थीतील मुलांना दात घासताना नळ चालू ठेवल्यास किती `१-लिटर` मग वाया जातात व १ पेल्यात कसे भागते हे स्वतः मोजायला सांगितल्याने काय होते?',
      opts: [
        'घोषणेऐवजी प्रत्यक्ष आकड्यांतून ("आज सकाळीच मी ९ लिटर पाणी वाचवले!") स्वतःच्या कृतीचा परिणाम दिसल्याने खरी सवय बदलते',
        'चालू नळामुळे पाणी वाढते',
        'मुले दात घासणेच बंद करतात',
        'मोजमापामुळे पाढे संपतात',
      ],
      exp: 'स्वतःच्या दैनंदिन पाणी-वापराचे अचूक मोजमाप केल्यास पोकळ उपदेशांपेक्षा पक्की जलसाक्षरता घडते.',
    },
    hi: {
      q: 'केवल "पानी बचाओ" का नारा रटाने की बजाय कक्षा 4 के बच्चों को ब्रश करते समय खुला नल बनाम 1 गिलास में खर्च हुए लीटर खुद गिनवाने से क्या होता है?',
      opts: [
        'खोखले उपदेश के बजाय ठोस माप ("आज सुबह ही मैंने 9 लीटर पानी बचाया!") बच्चे को तुरंत व्यक्तिगत प्रभाव दिखाकर आदत बदलता है',
        'खुले नल से भूजल बढ़ता है',
        'बच्चे ब्रश करना छोड़ देते हैं',
        'गिनती से पहाड़े समाप्त हो जाते हैं',
      ],
      exp: 'घरेलू जल-लेखा (Water Audit) बच्चों को अपने रोज़मर्रा के छोटे बदलावों का मापनीय परिणाम दिखाकर स्थायी आदत बनाता है।',
    },
  },
  {
    topic: 'Menstrual Health & Clean-Toilet Dignity Without Shame (Upper Primary Bridge)',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'As Class 5 learners (`ages 10–11`) approach puberty transitions, how should inclusive schools address handwashing, clean sanitary toilets, and body hygiene in health education?',
      opts: [
        'Treat bodily hygiene and menstruation openly, scientifically, and respectfully with zero whispering stigma—ensuring clean water, privacy bins, and equal awareness across pupils',
        'Refer to normal bodily growth as "dirty secrets" girls must whisper about alone',
        'Keep school girls’ washrooms locked during school hours',
        'Skip body cleanliness units entirely until college',
      ],
      exp: 'NEP-2020 & School Health guidelines call for stigma-free scientific hygiene literacy, safe washrooms, and adolescent dignity.',
    },
    mr: {
      q: 'इ. ५ वीतील (`वय १०–११`) विद्यार्थ्यांच्या पौगंडावस्थेच्या उंबरठ्यावर आरोग्य शिक्षणात स्वच्छतागृहे, हात धुणे व शारीरिक स्वच्छता यांवर शाळेची भूमिका कशी असावी?',
      opts: [
        'कुजबुज, लाज किंवा निषेधाचा भाव न ठेवता वैज्ञानिक व सन्मानपूर्वक संवाद साधणे—स्वच्छ पाणी, सुरक्षित स्वच्छतागृहे व सर्वांत संवेदनशील जाणीव निर्माण करणे',
        'नैसर्गिक शारीरिक वाढीला "घाणेरडे गुपित" म्हणून दडपून ठेवणे',
        'शाळेच्या वेळेत मुलींची स्वच्छतागृहे कुलूपबंद ठेवणे',
        'महाविद्यालयापर्यंत स्वच्छतेचे धडे टाळणे',
      ],
      exp: 'NEP-२०२० नुसार सन्मानपूर्ण, कलंकविरहित व वैज्ञानिक आरोग्य साक्षरता व स्वच्छ स्वच्छतागृहे ही प्रत्येक विद्यार्थ्याचा हक्क आहे.',
    },
    hi: {
      q: 'कक्षा 5 (`आयु 10–11`) में स्वास्थ्य एवं स्वच्छता शिक्षा में शौचालय स्वच्छता, हाथ धोने और किशोरावस्था-स्वच्छता पर विद्यालय का दृष्टिकोण कैसा होना चाहिए?',
      opts: [
        'बिना किसी झिझक या हीनभावना के वैज्ञानिक, खुला व सम्मानजनक संवाद—स्वच्छ जल, निजता, डस्टबिन और सभी बच्चों में संवेदनशील समझ सुनिश्चित करना',
        'सामान्य शारीरिक परिवर्तनों को "गंदा रहस्य" बताकर दबा देना',
        'स्कूल समय में शौचालय बंद रखना',
        'कॉलेज तक स्वास्थ्य शिक्षा टालना',
      ],
      exp: 'NEP-2020 और स्कूल स्वास्थ्य नीतियाँ कलंक-मुक्त वैज्ञानिक स्वच्छता शिक्षा व सुरक्षित शौचालय सुविधा को अनिवार्य मानती हैं।',
    },
  },
  {
    topic: 'Stop-Drop-Roll Fire Safety & Never-Water-on-Oil/Electrical Fires Mime',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Practicing the calm physical mime "Stop, Drop on floor, Cover face, and Roll slowly" for clothing sparks—plus contrasting why sand/baking-soda smothers oil pan flares where splashing water turns them explosive—teaches:',
      opts: [
        'Life-saving procedural muscle memory (`cutting oxygen` without fanning flames by running!) paired with clear combustion science',
        'Running outdoors swiftly when clothes catch fire',
        'Throwing tap water into burning deep-frying oil pans',
        'Playing carelessly near stove flames',
      ],
      exp: 'Sinking water boils explosively under hot oil (`scattering fire`), whereas rolling starves oxygen cleanly on clothing.',
    },
    mr: {
      q: 'कपड्यांनी पेट घेतल्यास पळण्याऐवजी "थांबा, खाली झोपा आणि जमिनीवर हळू लोळा (Stop–Drop–Roll)" याचा मूक अभिनय सराव आणि तेलाच्या/विजेच्या आगीवर पाणी का टाकू नये हे शिकवल्याने काय साधते?',
      opts: [
        'धावल्याने वाऱ्यामुळे आग भडकते, तर लोळल्याने ऑक्सिजन पुरवठा तुटून आग विझते हे जीवनरक्षक विज्ञान व कृतीची पक्की सवय लागते',
        'कपडे पेटल्यास वेगाने धावण्याची सवय',
        'कढईतील तेलाच्या आगीवर पाणी ओतण्याची युक्ती',
        'चुलीजवळ निष्काळजी खेळणे',
      ],
      exp: 'प्रत्यक्ष अभिनय सरावाने आणीबाणीत ऑक्सिजन तोडण्याची अचूक जीवनरक्षक प्रतिक्रिया शरीरात रुजते.',
    },
    hi: {
      q: 'कपड़ों में चिंगारी लगने पर "रुकें, लेटें और लुढ़कें (Stop-Drop-Roll)" का शांत अभिनय अभ्यास और तेल/बिजली की आग पर पानी न डालने का कारण सिखाना क्या विकसित करता है?',
      opts: [
        'दौड़ने से हवा आग भड़काती है जबकि लुढ़कने से ऑक्सीजन कटकर आग बुझती है—यह जीवन-रक्षक कौशल व दहन विज्ञान की समझ',
        'कपड़े जलने पर तेज़ भागने की आदत',
        'जलते तेल में नल का पानी डालने का नियम',
        'चूल्हे के पास लापरवाही से खेलना',
      ],
      exp: 'सुरक्षित अभिनय-अभ्यास आपात स्थिति में बिना घबराए ऑक्सीजन-अवरोध का सही जीवनरक्षक कदम याद रखता है।',
    },
  },
  {
    topic: 'Avoiding Unhealthy Mercury Thermometer Breakage in Primary Classrooms',
    pattern: 'Application',
    difficulty: 'Moderate',
    en: {
      q: 'Why do updated primary school science kits replace delicate glass mercury thermometers with sturdy alcohol-red or digital probe thermometers during Class 4–5 weather/water experiments?',
      opts: [
        'Broken silver mercury droplets release highly toxic neurotoxic fumes that endanger young pupils, whereas alcohol/digital probes stay safe during active desk handling',
        'Alcohol thermometers measure up to `2,000°C` volcano heat',
        'Mercury freezes at pleasant `25°C` classroom temperatures',
        'Digital thermometers require zero measurement units',
      ],
      exp: 'Mercury toxicity hazards (`broken glass spills`) make red-alcohol or digital thermometers far safer for hands-on child exploration.',
    },
    mr: {
      q: 'इ. ४ थी–५ वीच्या विज्ञान पेटीतून काचेच्या पार्याचे तापमापी काढून लाल अल्कोहोल किंवा डिजिटल तापमापी का वापरण्याचा सल्ला दिला जातो?',
      opts: [
        'पार्याचा तापमापी फुटल्यास बाहेर पडणारा पारा व त्याची वाफ मुलांच्या आरोग्याला अत्यंत विषारी असते; अल्कोहोल व डिजिटल तापमापी हाताळायला सुरक्षित असतात',
        'अल्कोहोल तापमापी २,०००°C तापमान मोजतात म्हणून',
        'पारा २५°C वरच गोठतो म्हणून',
        'डिजिटल तापमापीला एककच नसते म्हणून',
      ],
      exp: 'प्राथमिक विद्यार्थ्यांच्या हाताळणीत विषारी पारा-गळतीचा धोका टाळण्यासाठी सुरक्षित डिजिटल किंवा अल्कोहोल तापमापी वापरतात.',
    },
    hi: {
      q: 'कक्षा 4–5 की विज्ञान किट में काँच वाले पारा थर्मामीटर की जगह लाल अल्कोहल या डिजिटल थर्मामीटर का उपयोग क्यों किया जाता है?',
      opts: [
        'पारा थर्मामीटर टूटने पर निकलने वाला पारा व उसकी वाष्प बच्चों के लिए अत्यंत विषैली होती है, जबकि अल्कोहल व डिजिटल थर्मामीटर सुरक्षित रहते हैं',
        'अल्कोहल थर्मामीटर `2,000°C` नापता है',
        'पारा `25°C` पर जम जाता है',
        'डिजिटल थर्मामीटर में कोई इकाई नहीं होती',
      ],
      exp: 'प्राथमिक प्रयोगों में पारा विषाक्तता के जोखिम को शून्य करने हेतु सुरक्षित अल्कोहल या डिजिटल तापमापी अपनाए जाते हैं।',
    },
  },
  {
    topic: 'Observing Breath Moisture on Mirror + Lime-Water Exhale Proof',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Breathing out slowly ("Haaa!") onto a cool pocket mirror instantly clouds the glass with misty droplets. Asking Class 4 pupils to wipe and test why this happens proves:',
      opts: [
        'Exhaled breath from our lungs carries warm invisible WATER VAPOUR that cools and condenses into liquid mist on the cold mirror surface',
        'Human breath shoots white chalk dust out of nostrils',
        'Mirrors leak tap water backward through silver paint',
        'Lungs freeze room nitrogen at `37°C`',
      ],
      exp: 'Cool-mirror condensation (and blowing cool air across a warm tea cup vs warming cold palms—NCERT Class 5 "Blow Hot, Blow Cold") makes breath physics concrete.',
    },
    mr: {
      q: 'थंड आरशावर तोंडातून हळूच गरम श्वास ("हाऽऽ") सोडताच आरशावर धुके व सूक्ष्म पाण्याचे थेंब का जमतात हे विद्यार्थ्यांकडून शोधून घेतल्याने काय सिद्ध होते?',
      opts: [
        'आपण बाहेर सोडलेल्या श्वासात उबदार अदृश्य पाण्याची वाफ असते, जी थंड आरशावर संघनित होऊन पाण्याच्या सूक्ष्म थेंबांत बदलते',
        'नाकातून पांढरी खडूची पूड बाहेर पडते',
        'आरशाच्या मागून पाणी पाझरते',
        'फुफ्फुसे ३७°C वर नायट्रोजन गोठवतात',
      ],
      exp: '"Blow Hot, Blow Cold" सारख्या प्रयोगांतून श्वासातील उबदारपणा व बाष्प प्रत्यक्ष अनुभवातून स्पष्ट होतात.',
    },
    hi: {
      q: 'ठंडे दर्पण पर मुँह से गर्म साँस ("हाऽऽ") छोड़ते ही काँच धुँधला और नन्हा-गीला क्यों हो जाता है—इस अवलोकन से बच्चे क्या खोजते हैं?',
      opts: [
        'हमारे द्वारा छोड़ी गई साँस में गर्म अदृश्य जलवाष्प होती है जो ठंडी सतह से टकराकर पानी की सूक्ष्म बूंदों में संघनित हो जाती है',
        'साँस से सफेद चॉक पाउडर निकलता है',
        'दर्पण के पीछे से पानी रिसता है',
        'फेफड़े नाइट्रोजन जमाते हैं',
      ],
      exp: 'ठंडे दर्पण का सरल प्रयोग बिना किसी उपकरण के निःश्वास में उपस्थित जलवाष्प और संघनन को प्रत्यक्ष सिद्ध करता है।',
    },
  },
  {
    topic: 'Seed Cotyledon Jar Discovery – Dicot vs Monocot Germination',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Lining a clear glass jam jar inside with damp blotting paper (`instead of opaque muddy soil`) so bean and maize seeds sprout visibly against the glass wall lets Class 4 pupils directly witness:',
      opts: [
        'Which tiny root part (`radicle`) emerges FIRST downward toward gravity, how two seed leaves (`dicot` bean) differ from one (`monocot` maize), and how the shoot rises green upward',
        'Seeds sprouting backward without any root hairs',
        'Glass dissolving into bean leaves chemically',
        'Adult sunflowers blooming in `2` hours',
      ],
      exp: 'Transparent jar wall germination reveals hidden underground stages (`radicle -> rootlets -> plumule`) week-by-week.',
    },
    mr: {
      q: 'मातीच्या कुंडीऐवजी ओला टिपकागद लावलेल्या पारदर्शक काचेच्या बरणीच्या आतील बाजूने राजमा व मक्याच्या बिया लावल्याने इ. ४ थीच्या मुलांना काय प्रत्यक्ष पाहता येते?',
      opts: [
        'प्रथम आदिमूळ (Radicle) खाली जमिनीकडे वाढते, नंतर अंकुर वर येतो, आणि द्विदल (राजमा - २ दले) व एकदल (मका - १ दल) यांतील फरक स्पष्ट दिसतो',
        'बियांना मुळेच येत नाहीत',
        'काच विरघळून पाने बनतात',
        '२ तासांत सूर्यफूल फुलते',
      ],
      exp: 'पारदर्शक बरणीतील प्रयोग जमिनीखालील अदृश्य अंकुरण टप्पे डोळ्यांसमोर आणतो.',
    },
    hi: {
      q: 'अपारदर्शी मिट्टी के बजाय गीले सोख्ता कागज़ से सजे पारदर्शी काँच के जार की दीवार के सहारे राजमा व मक्का के बीज रखने से कक्षा 4 के बच्चे क्या देख पाते हैं?',
      opts: [
        'पहले जड़ (मूलांकुर) नीचे की ओर निकलती है, फिर प्रांकुर ऊपर बढ़ता है, और द्विबीजपत्री (राजमा) बनाम एकबीजपत्री (मक्का) का अंतर साफ दिखता है',
        'जड़ें कभी नहीं निकलतीं',
        'काँच पत्तियों में बदल जाता है',
        '2 घंटे में सूरजमुखी खिल आता है',
      ],
      exp: 'पारदर्शी जार में अंकुरण भूमिगत होने वाले जड़-प्रांकुर विकास को प्रत्यक्ष अवलोकनीय बना देता है।',
    },
  },
  {
    topic: 'Avoiding Passive Pre-Made "Science Fair Decoration Models"',
    pattern: 'Conceptual',
    difficulty: 'Moderate',
    en: {
      q: 'Why do thoughtful EVS educators discourage awarding top science-exhibition prizes to expensive carpenter/parent-built thermocol city models that the Class 5 presenter cannot explain in their own words?',
      opts: [
        'Exhibition assessment should honour authentic child inquiry—simple handmade working demonstrations tested, explained, and debugged honestly by the student themselves',
        'Only store-bought motorized toys look neat on tables',
        'Children in Class 5 are incapable of cutting cardboard',
        'Working models never use scientific variables',
      ],
      exp: 'Student ownership (`what changed, why it worked/failed`) beats commercial adult-crafted decoration every time.',
    },
    mr: {
      q: 'शालेय विज्ञान प्रदर्शनात पालकांनी किंवा दुकानातून विकत आणलेल्या महागड्या पण विद्यार्थ्याला स्वतः न समजणाऱ्या थर्माकोल मॉडेल्सपेक्षा साध्या स्वनिर्मित प्रयोगांना प्राधान्य का द्यावे?',
      opts: [
        'प्रदर्शनाचे मूल्यमापन बाह्य सजावटीचे नसून मुलाच्या स्वतःच्या शोधबुद्धीचे, प्रयोगाचे व स्वतःच्या शब्दांत मांडलेल्या तर्काचे असावे',
        'फक्त विकतची खेळणीच सुंदर दिसतात',
        'इ. ५ वीतील मुले पुठ्ठा कापू शकत नाहीत',
        'चालणाऱ्या प्रयोगांत विज्ञान नसते',
      ],
      exp: 'मुलांनी स्वतः हातांनी बनवलेले, तपासलेले व सहज समजावलेले छोटे प्रयोग खऱ्या वैज्ञानिक वृत्तीचे दर्शन घडवतात.',
    },
    hi: {
      q: 'विज्ञान प्रदर्शनी में माता-पिता या बाज़ार से बनवाए गए महँगे सजावटी मॉडलों (जिन्हें छात्र खुद न समझा पाए) की बजाय सरल स्व-निर्मित प्रयोगों को महत्व क्यों देना चाहिए?',
      opts: [
        'मूल्यांकन सजावट का नहीं, बल्कि छात्र की अपनी खोजी प्रक्रिया, परीक्षण व अपने शब्दों में वैज्ञानिक व्याख्या की समझ का होना चाहिए',
        'केवल बाज़ारी खिलौने ही सुंदर दिखते हैं',
        'कक्षा 5 के बच्चे गत्ता नहीं काट सकते',
        'कार्यशील मॉडलों में विज्ञान नहीं होता',
      ],
      exp: 'बच्चे द्वारा स्वयं निर्मित, परखे व स्पष्ट रूप से समझाए गए कम-लागत प्रयोग असली वैज्ञानिक सोच दर्शाते हैं।',
    },
  },
  {
    topic: 'Tactile Dough Relief Map of Maharashtra (Konkan -> Sahyadri -> Deccan)',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Having Class 4 pairs sculpt a small relief tray of Maharashtra out of salt-flour dough (`flat blue coastal Konkan strip, tall Sahyadri wall ridge, sloping eastern Deccan tableland`) directly cures what textbook confusion?',
      opts: [
        'Visualizing why short Konkan rivers race west off steep cliffs while Godavari/Krishna flow gently hundreds of kilometres eastward across a tilted plateau—AND empowering blind peers through fingertip relief!',
        'Making the Arabian Sea flow uphill onto Torna Peak',
        'Replacing real state districts with dough biscuits',
        'Forgetting where Sahyadri mountain passes sit',
      ],
      exp: 'Hands-on 3D relief dough turns flat 2D arrows into obvious gravitational slope logic for sighted and blind students alike.',
    },
    mr: {
      q: 'इ. ४ थीच्या मुलांकडून पीठ-मातीच्या साहाय्याने महाराष्ट्राचा उंच-सखल स्पर्श नकाशा (`सखल कोकणपट्टी, उंच सह्याद्री भिंत व पूर्वेकडे उतरणारे दख्खन पठार`) बनवून घेतल्याने कोणता भौगोलिक गोंधळ मिटतो?',
      opts: [
        'कोकणच्या नद्या वेगवान व आखूड का आहेत आणि गोदावरी-कृष्णा पूर्वेकडे शेकडो किमी का वाहतात हे उतारावरून प्रत्यक्ष कळते—शिवाय दृष्टीदोष मुलांनाही स्पर्शाने समजते!',
        'अरबी समुद्र तोरण्यावर चढतो हे कळते',
        'जिल्ह्यांच्या जागी भाकरी बनवता येतात',
        'घाटमार्ग विसरले जातात',
      ],
      exp: '३-मितीय उंच-सखल प्रतिकृतीमुळे सह्याद्रीची जलविभाजक भूमिका व नद्यांची दिशा सर्व मुलांना स्पर्शातून स्पष्ट होते.',
    },
    hi: {
      q: 'कक्षा 4 में आटे/मिट्टी से महाराष्ट्र का उभरा हुआ 3D मानचित्र (`निचला कोंकण तट, ऊँची सह्याद्रि दीवार, पूर्व की ओर ढलवाँ दक्कन पठार`) बनवाने से कौन-सी अवधारणा तुरंत चमकती है?',
      opts: [
        'स्पष्ट दिखता है कि कोंकण की नदियाँ छोटी व तेज़ क्यों हैं और गोदावरी-कृष्णा पूर्व में दूर तक क्यों बहती हैं—साथ ही दृष्टिबाधित साथी छूकर समझ पाते हैं!',
        'अरब सागर पहाड़ पर चढ़ता है',
        'ज़िलों की जगह बिस्कुट बनते हैं',
        'दर्रे भुला दिए जाते हैं',
      ],
      exp: 'स्पर्श-योग्य 3D भू-आकृति मॉडल जल-विभाजक पर्वत और नदी-ढाल को सभी विद्यार्थियों के लिए मूर्त बना देता है।',
    },
  },
  {
    topic: 'Bird Beaks & Feet Observation Logs – Structure Matches Diet',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Comparing close-up sketches of four local birds’ beaks (`sparrow short cone cracker`, `sunbird long curved straw`, `kingfisher dagger`, `duck flat strainer`) helps Class 4 pupils deduce:',
      opts: [
        'Functional animal adaptation—body structures (`beaks and webbed/taloned feet`) evolve precisely to suit each bird’s natural food and habitat',
        'All birds swallow identical large fish whole',
        'Beak shapes change colour during winter clouds',
        'Ducks perch on thin branches with hooked eagle talons',
      ],
      exp: 'NCF inquiry replaces dry "list 10 bird names" worksheets with causal form-and-function detective work.',
    },
    mr: {
      q: 'चिमणीची चोच (लहान शंकू), सूर्यपक्षी (लांब वक्र नळी), खंड्या (भाला), व बदकाची चपटी गाळणी-चोच या चार चित्रांची तुलना केल्याने इ. ४ थीतील मुले कोणता निष्कर्ष काढतात?',
      opts: [
        'प्राण्यांचे अवयव (चोच व पंजे) त्यांच्या अन्नाच्या प्रकारानुसार व अधिवासानुसार अचूक अनुकूलित झालेले असतात (रचना व कार्य सहसंबंध)',
        'सर्वच पक्षी मोठे मासे गिळतात',
        'हिवाळ्यात चोचीचा रंग बदलतो',
        'बदकांना गरुडासारखे नखदार पंजे असतात',
      ],
      exp: 'चोच व पायांच्या रचनेवरून पक्ष्याचे अन्न व अधिवास ओळखणे हा कार्यकारणभावाचा उत्तम उपक्रम आहे.',
    },
    hi: {
      q: 'गौरैया (छोटी शंकु चोंच), शकरखोरा (लंबी मुड़ी नली), किंगफिशर (भाला चोंच) व बत्तख (चपटी छलनी चोंच) की तुलना से कक्षा 4 के बच्चे क्या निष्कर्ष निकालते हैं?',
      opts: [
        'जीवों की शारीरिक संरचना (चोंच व पंजे) उनके आहार व आवास के अनुसार अद्भुत अनुकूलन दर्शाती है (रचना-कार्य संबंध)',
        'सभी पक्षी बड़ी मछली निगलते हैं',
        'सर्दियों में चोंच का रंग बदलता है',
        'बत्तख में बाज़ जैसे नुकीले पंजे होते हैं',
      ],
      exp: 'चोंच और पंजों के आकार को भोजन से जोड़ना रटंत की बजाय जैविक अनुकूलन की तार्किक समझ विकसित करता है।',
    },
  },
  {
    topic: 'Limestone / Baking Soda Dropper Exploration With Kitchen Vinegar/Lemon',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Dropping two tiny drops of lemon juice or kitchen vinegar onto chalk (`calcium carbonate`) or baking soda to watch fizzy `CO₂` bubbles erupt in Class 5 illustrates how:',
      opts: [
        'Harmless edible pantry acids substitute safely for dangerous laboratory hydrochloric acid while teaching chemical gas-evolution evidence cleanly',
        'Lemon juice turns blackboard chalk into glowing plastic',
        'Gas bubbles prove water froze silently',
        'Chalk contains live yeast fungi',
      ],
      exp: 'Using food-grade citric/acetic acid avoids corrosive burn risks in primary grades while delivering crisp chemical reaction evidence.',
    },
    mr: {
      q: 'इ. ५ वीत प्रयोगशाळेतील तीव्र आम्लाऐवजी खडूवर किंवा खाण्याच्या सोड्यावर लिंबाच्या रसाचे दोन थेंब टाकून बुडबुडे (`CO₂`) दाखवण्याचा प्रयोग काय सिद्ध करतो?',
      opts: [
        'धोकादायक तीव्र रसायनांविना घरगुती सुरक्षित लिंबू-व्हिनेगर वापरूनही रासायनिक बदलाचा व वायूनिर्मितीचा प्रत्यक्ष पुरावा दाखवता येतो',
        'लिंबाने खडूचे चमकदार प्लास्टिक होते',
        'पाणी गोठल्याचे बुडबुडे येतात',
        'खडूमध्ये यीस्ट असते',
      ],
      exp: 'प्राथमिक स्तरावर तीव्र रसायनांऐवजी सुरक्षित खाद्यपदार्थांतून रासायनिक अभिक्रिया दाखवणे सर्वोत्तम सुरक्षा मानक आहे.',
    },
    hi: {
      q: 'कक्षा 5 में तीव्र प्रयोगशाला अम्ल के बजाय चॉक या खाने के सोडे पर नींबू रस/सिरके की दो बूंदें डालकर `CO₂` बुलबुले दिखाना क्या साबित करता है?',
      opts: [
        'खतरनाक संक्षारक रसायनों के बिना सुरक्षित घरेलू खाद्य अम्लों से भी रासायनिक परिवर्तन और गैस निकलने का सटीक प्रमाण दिया जा सकता है',
        'नींबू से चॉक प्लास्टिक बन जाता है',
        'बुलबुले बर्फ जमने के संकेत हैं',
        'चॉक में खमीर होता है',
      ],
      exp: 'प्राथमिक विज्ञान में सुरक्षित रसोई सामग्री का उपयोग जोखिम घटाते हुए वास्तविक रासायनिक अन्वेषण संभव बनाता है।',
    },
  },
  {
    topic: 'Gallery Walk & Constructive Peer Feedback on Eco-Posters',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'After pairs design Class 4 "Save Electricity at Home" posters, organizing a silent 10-minute "Gallery Walk" where classmates leave sticky notes saying "One clever idea I spotted here..." develops:',
      opts: [
        'Respectful peer learning, positive noticing of diverse ideas across the whole room, and audience awareness in scientific communication',
        'Public ranking of only one "best painter"',
        'Destruction of classmates’ charts',
        'Competition strictly over expensive glitter markers',
      ],
      exp: 'Gallery Walks honor every team’s effort and turn student displays into interactive peer-learning resources.',
    },
    mr: {
      q: 'जोड्यांनी "घरातील वीज वाचवा" पोस्टर्स तयार केल्यावर वर्गात १० मिनिटांची "प्रदर्शन फेरी (Gallery Walk)" घेऊन मुलांनी एकमेकांच्या कामावर सकारात्मक अभिप्राय चिठ्ठी लावल्यास काय घडते?',
      opts: [
        'प्रत्येक मुलाच्या कामाचा सन्मान होतो, वर्गातील सर्वांच्या वेगवेगळ्या कल्पनांतून सहशिक्षण घडते व सकारात्मक संवाद कौशल्य वाढते',
        'फक्त एकाच "उत्कृष्ट चित्रकाराची" शर्यत लागते',
        'इतरांचे तक्ते फाडण्याची सवय लागते',
        'महागड्या चमकणाऱ्या पेनांची स्पर्धा होते',
      ],
      exp: 'प्रदर्शन फेरी व स्नेहपूर्ण समवयस्क अभिप्राय वर्गात सहकार्याचे आणि सर्जनशील आदरभावाचे वातावरण निर्माण करतात.',
    },
    hi: {
      q: 'जोड़ियों द्वारा "घर में बिजली बचाओ" पोस्टर बनाने के बाद 10 मिनट की "गैलरी वॉक" आयोजित कर हर साथी के पोस्टर पर सकारात्मक सुझाव पर्ची लगाना क्या विकसित करता है?',
      opts: [
        'सभी की मेहनत का सम्मान, विभिन्न रचनात्मक विचारों से परस्पर सीख और वैज्ञानिक संप्रेषण की सार्थक आदत',
        'केवल एक "सर्वश्रेष्ठ चित्रकार" की होड़',
        'साथियों के चार्ट खराब करना',
        'महँगे सजावटी मार्कर की प्रतियोगिता',
      ],
      exp: 'गैलरी वॉक प्रत्येक छात्र के कार्य को मंच देकर सकारात्मक सहपाठी-मूल्यांकन और साझा सीख को बढ़ावा देती है।',
    },
  },
  {
    topic: 'Wind Vane & Paper-Cup Anemometer Inquiry Construction',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Helping Class 5 students craft a rotating drinking-straw Wind Vane (`paper triangle tip + wide tail`) alongside a 4-cup Pinwheel Anemometer demonstrates the clean difference between:',
      opts: [
        'Wind DIRECTION (`where wind blows FROM`, shown by the Vane arrow) versus Wind SPEED (`how fast air moves`, shown by spinning cup rotations)',
        'Air temperature versus air humidity percentage',
        'Rainfall depth versus lightning brightness',
        'Soil weight versus ocean salinity',
      ],
      exp: 'Constructing both simple tools builds clear operational contrast between wind direction (`Vane`) and wind speed (`Anemometer`).',
    },
    mr: {
      q: 'इ. ५ वीतील मुलांनी कागदाची स्ट्रॉ "वाताकुक्कुट (Wind Vane)" आणि ४ पेपर-कपचा पवनवेगमापक (Anemometer) स्वतः बनवल्यास कोणत्या दोन गोष्टींतील फरक स्पष्ट होतो?',
      opts: [
        'वाऱ्याची दिशा (बाणाने दिसणारी — वातदिशादर्शक) आणि वाऱ्याचा वेग (कप फिरण्याच्या वेगावरून दिसणारा — पवनवेगमापक)',
        'हवेचे तापमान व आर्द्रता',
        'पावसाची खोली व विजेचा प्रकाश',
        'मातीचे वजन व समुद्राचे खारेपण',
      ],
      exp: 'स्वनिर्मित साधनांमुळे हवामान मोजणाऱ्या उपकरणांचे कार्य तत्त्व व दिशा-वेग यांतील भेद कायमचा लक्षात राहतो.',
    },
    hi: {
      q: 'कक्षा 5 के छात्रों द्वारा स्वयं बनाया गया स्ट्रॉ-तीर "वायु दिशा सूचक (Wind Vane)" और 4-कप वाला "पवनवेगमापी (Anemometer)" किन दो मापों का अंतर स्पष्ट करता है?',
      opts: [
        'हवा की दिशा (तीर किस ओर से आ रही हवा दिखाता है) बनाम हवा की गति (कप कितनी तेज़ी से घूमते हैं)',
        'हवा का तापमान बनाम आर्द्रता',
        'वर्षा की गहराई बनाम बिजली की चमक',
        'मिट्टी का वजन बनाम खारापन',
      ],
      exp: 'दोनों सरल उपकरण स्वयं बनाने से हवा की दिशा और वेग मापने के बीच का अंतर पूरी तरह स्पष्ट हो जाता है।',
    },
  },
  {
    topic: 'Avoiding Unfair Copying by Asking "My Own Family Habit Check"',
    pattern: 'Application',
    difficulty: 'Easy',
    en: {
      q: 'Ending a Class 4 Environmental unit with a 3-line personal commitment ("One concrete thing I can change at home starting Monday without spending money...") cultivates:',
      opts: [
        'Action competence and internal agency—translating classroom environmental awareness into genuine daily civic behaviour',
        'Blank promises graded strictly out of 100 marks',
        'Buying pricey imported eco-gadgets immediately',
        'Shaming neighbours loudly in street corners',
      ],
      exp: 'Action-oriented closure builds hopeful personal stewardship rather than passive eco-worry or rote exam facts.',
    },
    mr: {
      q: 'पर्यावरणाचा धडा संपवताना "सोमवारपासून पैसे खर्च न करता मी घरी कोणता एक छोटा बदल करू शकतो?" असे ३ ओळींचे वैयक्तिक संकल्प-कार्ड लिहायला लावल्याने काय घडते?',
      opts: [
        'केवळ परीक्षेपुरते ज्ञान न राहता वर्गातील जाणीव प्रत्यक्ष कृतीशील सवयीत व आत्मविश्वासात रूपांतरित होते (Action Competence)',
        '१०० पैकी गुणांसाठी पोकळ आश्वासने',
        'महागडी विदेशी उपकरणे विकत घेणे',
        'शेजाऱ्यांची चौकात टिंगल करणे',
      ],
      exp: 'खर्चविरहित छोटे वैयक्तिक बदल विद्यार्थ्यांत पर्यावरणासाठी आपणही काही करू शकतो हा आशावादी विश्वास निर्माण करतात.',
    },
    hi: {
      q: 'पर्यावरण इकाई के अंत में "सोमवार से बिना पैसे खर्च किए मैं अपने घर में कौन-सा एक बदलाव करूँगा?" लिखवाना बच्चों में क्या विकसित करता है?',
      opts: [
        'क्रियात्मक दक्षता (Action Competence)—किताबी जागरूकता को वास्तविक दैनिक नागरिक आदत और आत्म-शक्ति में बदलना',
        '100 अंकों के लिए झूठे वादे',
        'महँगे विदेशी उपकरण खरीदना',
        'पड़ोसियों का सार्वजनिक उपहास',
      ],
      exp: 'सरल, शून्य-लागत व्यक्तिगत संकल्प बच्चों को निष्क्रिय चिंता के बजाय आशावादी पर्यावरण-नागरिक बनाते हैं।',
    },
  },
];
