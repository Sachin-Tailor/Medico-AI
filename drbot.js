// Dr. Bot - Advanced Clinical Medical AI Engine & Google-Style Health Knowledge Synthesizer
// Handles free-form Hindi, English & Hinglish queries with precision.
// Answers EXACTLY what is asked without bloating or irrelevant text.

class DrBotEngine {
  constructor() {
    this.conditionsKB = this.initConditionsKB();
    this.medicinesKB = this.initMedicinesKB();
    this.vitalsKB = this.initVitalsKB();
  }

  // -------------------------------------------------------------
  // 1. EXTENSIVE CLINICAL CONDITIONS KNOWLEDGE BASE
  // -------------------------------------------------------------
  initConditionsKB() {
    return [
      {
        id: "fever",
        keywords: ["fever", "bukhar", "taap", "temperature", "sar dard", "headache", "bodyache", "badan dard", "sar me dard"],
        condition: "Viral Fever & Body Pain (वायरल बुखार और बदन दर्द)",
        analysis: "Google Clinical Analysis: Sharir me infection aane par immune system temperature badhata hai taaki virus khatam ho sake. 100°F - 102°F tak viral fever aam hota hai jisme sir dard aur maans-peshiyon me dard hota hai.",
        schedule: [
          {
            medicine: "Paracetamol 650mg (Dolo 650 / Calpol Generic)",
            dosage: "1 Tablet (650mg)",
            frequency: "1-0-1 (Zarurat padne par har 6-8 ghante me)",
            timing: "Khana khane ke baad (Kabhi bhi khali pet na lein)",
            purpose: "Bukhar kam karna (Antipyretic) aur sharir/sir dard se turant aaram"
          }
        ],
        advice: [
          "💧 Hydration: Din me kam se kam 3-4 litre paani, nariyal paani ya ORS piyein.",
          "🌡️ Sponge Bath: Bukhar 101°F se zyada hone par maathe aur gale par taaze paani ki patti rakhein.",
          "🛌 Rest: Kam se kam 8-10 ghante ka pura aaram karein.",
          "⚠️ Red Flag: Agar bukhar 3 din se zyada rahe ya thand lagkar kaanpni aaye toh CBC & Dengue/Malaria test karwayein."
        ],
        homeCare: "Adrak-tulsi ki chai, gunguna paani aur moong daal ki khichdi lein.",
        recommendedMedIds: ["med-4"]
      },
      {
        id: "acidity",
        keywords: ["gas", "acidity", "jalan", "heartburn", "acid reflux", "khatti dakar", "pet me jalan", "bloating", "seene me jalan", "pet me gas"],
        condition: "Hyperacidity, Gas & Acid Reflux / GERD (गैस, एसिडिटी और सीने में जलन)",
        analysis: "Google Clinical Analysis: Pet me hydrochloric acid ki matra badhne par acid gale tak aata hai jisse jalan, khatti dakar aur pet phoolna hota hai.",
        schedule: [
          {
            medicine: "Pantoprazole 40mg + Domperidone 30mg (Pan-D Generic)",
            dosage: "1 Capsule (SR)",
            frequency: "1-0-0 (Din me sirf 1 baar)",
            timing: "Subah KHALI PET (Nashte se 30-45 minute pehle)",
            purpose: "Stomach acid ko suppress karna aur ulti/nausea sensation rokna"
          }
        ],
        advice: [
          "⏰ Strict Timing: Ise hamesha KHALI PET lein. Khana khane ke baad lene par iska 70% asar kam ho jata hai.",
          "🥛 Instant Relief: Ek gilaas thanda bina chini ka doodh ya nariyal paani instant relief deta hai.",
          "🚫 Parhez: Chai, coffee, oily fast-food, cold drinks aur mirch-masale bilkul band karein.",
          "🛏️ Sleep Posture: Khana khate hi bistar par na letein, kam se kam 2 ghante baad soyein."
        ],
        homeCare: "Saunf aur jeere ka ubla hua gunguna paani khane ke 30 minute baad piyein.",
        recommendedMedIds: ["med-6"]
      },
      {
        id: "cold_cough",
        keywords: ["cough", "khansi", "sardi", "cold", "chheenk", "sneezing", "gale me kharash", "throat", "runny nose", "gala", "balgam", "phlegm"],
        condition: "Cold, Allergic Cough & Throat Infection (सर्दी, खांसी और गले का इन्फेक्शन)",
        analysis: "Google Clinical Analysis: Mausam badalne ya allergy se saans ki nali me sujan aur mucus banta hai. Gale me dard pharyngitis ya tonsillitis ka sanket hota hai.",
        schedule: [
          {
            medicine: "Montelukast 10mg + Levocetirizine 5mg (Montair-LC Generic)",
            dosage: "1 Tablet",
            frequency: "0-0-1 (Din me sirf 1 baar, raat ko)",
            timing: "Raat ko sone se pehle (Bedtime)",
            purpose: "Chheenkein, naak behna aur allergic khansi rokna"
          },
          {
            medicine: "Azithromycin 500mg (Agar gale me tez dard/infection ho)",
            dosage: "1 Tablet",
            frequency: "1-0-0 (Din me 1 baar consecutive 3 din)",
            timing: "Khane se 1 ghanta pehle ya 2 ghante baad",
            purpose: "Gale ke bacterial infection ko jad se khatam karna"
          }
        ],
        advice: [
          "🍵 Gargle: Din me 3 baar gungune namak paani ya Betadine gargle karein.",
          "🌬️ Steam: Din me 2 baar saade paani ki bhap (steam inhalation) lein.",
          "😴 Drowsiness: Montair-LC se halki neend aati hai, isliye raat ko hi lein.",
          "🧊 Strictly Avoid: Cold water, ice cream aur fridge ka thanda samaan."
        ],
        homeCare: "Shahad (Honey) me thoda adrak ka ras aur kaali mirch mila kar subah-shaam lein.",
        recommendedMedIds: ["med-7", "med-3"]
      },
      {
        id: "diabetes",
        keywords: ["sugar", "diabetes", "blood glucose", "madhumeh", "glycomet", "fasting sugar", "pp sugar", "hba1c"],
        condition: "Type-2 Diabetes Management (शुगर / डायबिटीज कंट्रोल)",
        analysis: "Google Clinical Analysis: Pancreas paryapt insulin nahi banata ya cells insulin resistant ho jaate hain, tab blood me glucose ka level badh jata hai. Normal Fasting < 100 mg/dL aur PP < 140 mg/dL hona chahiye.",
        schedule: [
          {
            medicine: "Metformin 500mg SR (Glycomet Generic)",
            dosage: "1 Tablet (Sustained Release)",
            frequency: "1-0-1 (Subah aur Raat) doctor ke prescription anusar",
            timing: "Khana khane ke beech me ya turant baad",
            purpose: "Liver me glucose production kam karna aur insulin sensitivity badhana"
          }
        ],
        advice: [
          "⚠️ Never Empty Stomach: Metformin ko khane ke sath lein taaki pet dard na ho.",
          "💊 Do Not Crush: Is tablet ko todein ya chabayein nahi, poora niglein.",
          "🥗 Diet Control: Meetha, maida aur safed chawal band karein. Chana, oats, methi aur green salad khayein.",
          "🏃 30 Min Walk: Roz subah 30-40 minute brisk walk karein."
        ],
        homeCare: "Methi dana paani me bhigo kar subah khali pet piyein aur karele/jamun ka ras lein.",
        recommendedMedIds: ["med-5"]
      },
      {
        id: "hypertension",
        keywords: ["bp", "blood pressure", "hypertension", "high bp", "bp badhna", "bp high"],
        condition: "High Blood Pressure & Hypertension (हाई ब्लड प्रेशर गाइड)",
        analysis: "Google Clinical Analysis: Blood vessels par khoon ka pressure 130/90 mmHg se upar rehna hypertension hai. Yeh heart aur kidney par stress daalta hai.",
        schedule: [
          {
            medicine: "Telmisartan 40mg (Telma 40) YA Amlodipine 5mg",
            dosage: "1 Tablet",
            frequency: "1-0-0 (Din me sirf 1 baar)",
            timing: "Subah nashte ke baad (Rozana ek nishchit samay par)",
            purpose: "Blood vessels ko relax karke BP ko 120/80 normal range me maintain rakhna"
          }
        ],
        advice: [
          "⏰ Never Skip: BP ki goli achanak chhodna bohot khatarnak ho sakta hai.",
          "🧂 Salt Intake: Din me sirf aadhi chammach se kam namak khayein. Papad, achar aur packed chips band karein.",
          "🧘 Stress & Sleep: 7-8 ghante ki poori neend lein aur roz 15 minute Anulom-Vilom karein.",
          "📊 Monitor: Hafte me 1-2 baar BP check karke note karein."
        ],
        homeCare: "Subah khali pet lahsun (Garlic) ki 1 kali paani ke sath niglein aur Arjun ki chaal ka kaadha lein.",
        recommendedMedIds: ["med-8", "med-1"]
      },
      {
        id: "joint_pain",
        keywords: ["joint pain", "kamar dard", "back pain", "arthritis", "dant dard", "toothache", "muscle pain", "chot", "moch", "sprain", "gathiya", "ghutne me dard"],
        condition: "Musculoskeletal, Joint & Tooth Pain (जोड़ों और बदन का दर्द)",
        analysis: "Google Clinical Analysis: Joor ya maans-peshiyon me injury, arthritis ya inflammation se dard aur sujan paida hoti hai.",
        schedule: [
          {
            medicine: "Aceclofenac 100mg + Paracetamol 325mg (Zerodol-P Generic)",
            dosage: "1 Tablet",
            frequency: "1-0-1 (Subah aur Raat - sirf 3 se 5 din tak)",
            timing: "Hamesha BHARE PET lein (Never on empty stomach)",
            purpose: "Dard aur sujan ko turant suppress karna"
          }
        ],
        advice: [
          "🥛 Always After Food: Painkillers ko doodh ya khane ke baad lein taaki acidity na ho.",
          "🧊 Ice / Hot Compress: Moch me pehle 24 ghante barf lagayein; purane dard me garm sek karein.",
          "⏳ Limit Duration: Bina doctor ke kisi bhi painkiller ko 5 din se zyada na lein.",
          "🚫 Ulcer Warning: Pet me ulcer wale mareez painkiller lene se bachein."
        ],
        homeCare: "Haldi wala gunguna doodh piyein aur til ke tel me thoda lahsun paka kar malish karein.",
        recommendedMedIds: ["med-10"]
      },
      {
        id: "diarrhea",
        keywords: ["loose motion", "dast", "pet kharab", "diarrhea", "vomiting", "ulti", "food poisoning", "dast lagna", "pet dard"],
        condition: "Loose Motion, Diarrhea & Food Poisoning (दस्त, उल्टी और पेट इन्फेक्शन)",
        analysis: "Google Clinical Analysis: Dushit paani ya bahar ke khane se aanton me infection hone par sharir se paani aur electrolytes tezi se behne lagte hain.",
        schedule: [
          {
            medicine: "Ciprofloxacin 500mg + Metronidazole 400mg (Generic Cifran / Flagyl)",
            dosage: "1 Tablet",
            frequency: "1-0-1 (Subah aur Raat - 3 din ka course)",
            timing: "Khana khane ke baad, khoob saare paani ke sath",
            purpose: "Pet aur aanton ke bacterial infection ko khatam karna"
          }
        ],
        advice: [
          "💧 ORS is Essential: Har baar dast hone ke baad 1 glass ORS zaroor piyein.",
          "🍌 BRAT Diet: Kela (Banana), Chawal (Rice), Apple sauce aur Toast khayein.",
          "🚫 Avoid Milk: Loose motion me doodh, chai aur oily khana bilkul na lein.",
          "⚠️ Dehydration Signs: Peshab peeli ya band hona dehydration ka sanket hai — turant doctor ko dikhayein."
        ],
        homeCare: "Dahi (Curd) me thoda bhuna jeera aur kaala namak daal kar khayein (Natural Probiotic).",
        recommendedMedIds: ["med-11"]
      },
      {
        id: "allergy",
        keywords: ["itching", "khujli", "allergy", "rash", "daane", "hives", "pitti", "skin itching"],
        condition: "Skin Allergy, Itching & Rashes (त्वचा की खुजली और एलर्जी)",
        analysis: "Google Clinical Analysis: Histamine chemical release hone par skin par lal daane, pitti aur tez khujli hoti hai.",
        schedule: [
          {
            medicine: "Cetirizine 10mg (Zyrtec Generic)",
            dosage: "1 Tablet",
            frequency: "0-0-1 (Din me sirf 1 baar)",
            timing: "Raat ko sone se pehle paani ke sath",
            purpose: "Histamine block karke khujli aur daane shant karna"
          }
        ],
        advice: [
          "🧴 Moisturize: Coconut oil ya Calamine lotion lagayein.",
          "🚫 Avoid Scratching: Khujli wali jagah nakhun na lagayein varna infection ho sakta hai.",
          "👕 Cotton Clothes: Dheele sooti kapde pehnein."
        ],
        homeCare: "Neem ke patto ko ubaal kar us paani se nahayein aur nariyal tel lagayein.",
        recommendedMedIds: ["med-12"]
      },
      {
        id: "dengue_malaria",
        keywords: ["dengue", "malaria", "machar", "platelet", "platelets", "thand lagke bukhar", "shivering"],
        condition: "Dengue & Malaria Fever Management (डेंगू और मलेरिया बुखार)",
        analysis: "Google Clinical Analysis: Machhar ke kaatne se hone wala viral/parasitic infection. Dengue me platelets gir sakti hain jabki Malaria me tez thand lagkar bukhar aata hai.",
        schedule: [
          {
            medicine: "Paracetamol 650mg (Dolo 650 Generic)",
            dosage: "1 Tablet (650mg)",
            frequency: "1-0-1 (Zarurat padne par har 6 ghante me)",
            timing: "Khana khane ke baad",
            purpose: "Safe fever relief (Platelets par bura asar nahi padta)"
          }
        ],
        advice: [
          "⚠️ Strictly Avoid: Dengue me Aspirin, Combiflam ya Brufen bilkul NA LEIN kyunki yeh khoon patla karke bleeding risk badhati hain.",
          "💧 High Hydration: Rozaana 3-4 litre nariyal paani, ORS aur taral padarth lein.",
          "📊 Daily CBC Test: Platelets count monitor karne ke liye roz CBC test karwayein.",
          "🚨 Emergency Signs: Naak ya masudo se khoon aana, pet me tez dard ya lagatar ulti hone par turant admit hon."
        ],
        homeCare: "Papita ke patto ka ras (Papaya leaf extract), giloy ka kaadha aur kiwi fruit platelets support me madad karte hain.",
        recommendedMedIds: ["med-4"]
      },
      {
        id: "typhoid",
        keywords: ["typhoid", "motijhara", "miyadi bukhar", "salmonella"],
        condition: "Typhoid Fever Management (टाइफाइड बुखार)",
        analysis: "Google Clinical Analysis: Salmonella typhi bacteria se dushit khane ya paani ke zariye hone wala infection. Isme bukhar step-ladder pattern me badhta hai aur pet dard hota hai.",
        schedule: [
          {
            medicine: "Azithromycin 500mg YA Cefixime (Doctor ke prescription anusar)",
            dosage: "1 Tablet",
            frequency: "1-0-0 (Din me 1 baar continuous 7-10 din)",
            timing: "Khane ke 1 ghanta pehle ya 2 ghante baad",
            purpose: "Salmonella bacterial infection ko poori tarah khatam karna"
          },
          {
            medicine: "Paracetamol 650mg",
            dosage: "1 Tablet",
            frequency: "SOS (Bukhar aane par)",
            timing: "Khane ke baad",
            purpose: "Bukhar aur sharir dard se aaram"
          }
        ],
        advice: [
          "⏰ Course Completion: Antibiotic ka poora 7-10 din ka course poora karein, beech me na chodein.",
          "🚰 Boiled Water: Paani hamesha ubaal kar thanda karke piyein.",
          "🍲 Light Food: Moong daal khichdi, daliya aur ubla hua aaloo khayein. Basi aur bahar ka khana bilkul band karein."
        ],
        homeCare: "Khoob saara paani piyein, mausammi ka ras aur nariyal paani lein.",
        recommendedMedIds: ["med-3", "med-4"]
      },
      {
        id: "uti",
        keywords: ["uti", "peshab me jalan", "urine infection", "urine burning", "peshab dard", "mutra marg"],
        condition: "Urinary Tract Infection (UTI / पेशाब में जलन और इन्फेक्शन)",
        analysis: "Google Clinical Analysis: Mutra marg me E. coli bacteria ke badhne se peshab me tez jalan, baar-baar peshab aana aur pet ke nichle hisse me dard hota hai.",
        schedule: [
          {
            medicine: "Ciprofloxacin 500mg (Ciplox Generic)",
            dosage: "1 Tablet",
            frequency: "1-0-1 (Subah aur Raat - 5 din)",
            timing: "Khana khane ke baad, khoob saare paani ke sath",
            purpose: "Urinary tract ke bacterial infection ko clear karna"
          }
        ],
        advice: [
          "💧 Drink 3-4 Litres: Khoob saara paani piyein taaki bacteria flush out ho sake.",
          "🍋 Alkalizer: Ek glass paani me 1-2 chammach Disodium Hydrogen Citrate syrup (Citralka) ghol kar peene se jalan me turant aaram milta hai.",
          "🚻 Don't Hold Urine: Peshab ko rokein nahi, safai ka vishesh dhyan rakhein."
        ],
        homeCare: "Cranberry juice ya nariyal paani piyein, masaledar aur teekha khana avoid karein.",
        recommendedMedIds: ["med-11"]
      },
      {
        id: "constipation",
        keywords: ["constipation", "kabz", "pet saaf nahi hota", "potty tight", "hard stool", "malavrodh"],
        condition: "Chronic Constipation & Bowel Irregularity (कब्ज और पेट साफ न होना)",
        analysis: "Google Clinical Analysis: Khane me fiber ki kami aur kam paani peene se aant (colon) stool se paani sokh leti hai jisse mal katha ho jata hai.",
        schedule: [
          {
            medicine: "Isabgol (Psyllium Husk) YA Lactulose Liquid",
            dosage: "1-2 Chammach",
            frequency: "0-0-1 (Raat ko sone se pehle)",
            timing: "Gungune paani ya doodh ke sath",
            purpose: "Natural bulk laxative jo stool ko soft karta hai"
          }
        ],
        advice: [
          "💧 Morning Warm Water: Subah uthte hi 2 glass gunguna paani baithkar piyein.",
          "🥗 High Fiber Diet: Papita, seb, daalein, green salad aur daliya khayein.",
          "🚫 Avoid Maida: Bakery items, burger, maida aur junk food band karein.",
          "🚶 Physical Activity: Rozaana 30 minute walk karein jisse aanton ki movement tezz ho."
        ],
        homeCare: "Raat ko 4-5 munakka doodh me ubaal kar lein ya gungune paani me thoda castor oil le sakte hain.",
        recommendedMedIds: []
      },
      {
        id: "migraine",
        keywords: ["migraine", "aadha sar dard", "adha sirdard", "half headache", "light sensitivity"],
        condition: "Migraine & Severe Vascular Headache (माइग्रेन और तेज सिरदर्द)",
        analysis: "Google Clinical Analysis: Dimaag ki blood vessels me temporary dilation aur neurological sensitivity ki wajah se sar ke ek taraf tez chubhan wala dard hota hai.",
        schedule: [
          {
            medicine: "Paracetamol 650mg + Caffeine YA Naproxen",
            dosage: "1 Tablet",
            frequency: "SOS (Migraine attack shuru hote hi)",
            timing: "Halka khane ke baad",
            purpose: "Vascular inflammation aur dard ko control karna"
          }
        ],
        advice: [
          "🌑 Dark Room: Andhere aur shant kamre me aaram karein.",
          "📱 Avoid Screens: Mobile screen, laptop aur tez aawaz se dur rahein.",
          "💧 Water & Meal: Bhookhe pet na rahein aur dehydration se bachein.",
          "❄️ Cold Compress: Maathe aur gardan par barf ki patti rakhein."
        ],
        homeCare: "Adrak ki chai lein aur deep breathing (pranayam) karein.",
        recommendedMedIds: ["med-4"]
      }
    ];
  }

  // -------------------------------------------------------------
  // 2. EXTENSIVE MEDICINES KNOWLEDGE BASE (INVENTORY + POPULAR DRUGS)
  // -------------------------------------------------------------
  initMedicinesKB() {
    return [
      {
        names: ["dolo", "dolo 650", "paracetamol", "calpol", "crocin", "pacimol"],
        brandName: "Dolo 650 / Calpol",
        genericName: "Paracetamol 650mg",
        category: "Fever & Pain Reliever (Antipyretic / Analgesic)",
        uses: "Tez bukhar, sir dard, badan dard aur viral infection me sharir dard se aaram pane ke liye.",
        timing: "Hamesha khana khane ke baad (Never on empty stomach)",
        frequency: "1-0-1 (Zarurat padne par har 6-8 ghante me 1 tablet)",
        dosage: "1 Tablet (650mg)",
        instructions: "Bukhar 100°F se upar hone par 1 glass paani ke sath lein. 24 ghante me maximum 4 tablets se zyada na lein.",
        precautions: "Liver ke mareez bina doctor salah ke na lein. Paracetamol ke sath sharab (alcohol) bilkul na piyein.",
        inventoryId: "med-4"
      },
      {
        names: ["pan d", "pan-d", "pantoprazole", "pantocid-d", "pantocid", "omee", "omeprazole", "rabeprazole", "rabekind"],
        brandName: "Pan-D / Pantocid-D",
        genericName: "Pantoprazole 40mg + Domperidone 30mg",
        category: "Antacid & Anti-reflux (Proton Pump Inhibitor)",
        uses: "Pet me tez gas, acidity, seene me jalan (heartburn), khatti dakar aur ulti sensation ko rokna.",
        timing: "Subah KHALI PET (Nashte se 30-45 minute pehle)",
        frequency: "1-0-0 (Din me sirf 1 baar subah)",
        dosage: "1 Capsule (SR)",
        instructions: "Gungune paani ke sath subah uthte hi lein. Khana khane ke baad lene se iska asar 70% kam ho jata hai.",
        precautions: "Capsule ko kholein ya chabayein nahi, poora niglein.",
        inventoryId: "med-6"
      },
      {
        names: ["azithromycin", "azithral", "azithral 500", "zithromax", "azee"],
        brandName: "Azithral 500 / Zithromax",
        genericName: "Azithromycin 500mg",
        category: "Broad-spectrum Macrolide Antibiotic",
        uses: "Gale me tez dard, tonsils infection, chest congestion, typhoid aur respiratory bacterial infection.",
        timing: "Khane se 1 ghanta pehle ya khana khane ke 2 ghante baad",
        frequency: "1-0-0 (Din me sirf 1 baar continuous 3 ya 5 din)",
        dosage: "1 Tablet (500mg)",
        instructions: "Rozana ek nishchit samay par lein. Doctor dwara bataya gaya 3 ya 5 din ka poora course complete karein chahe thik lagne lage.",
        precautions: "Antacid (Digene/Pan-D) lene ke turant sath na lein (kam se kam 2 ghante ka gap rakhein).",
        inventoryId: "med-3"
      },
      {
        names: ["montair", "montair-lc", "montek-lc", "levocetirizine", "montelukast", "telekast"],
        brandName: "Montair-LC / Montek-LC",
        genericName: "Montelukast 10mg + Levocetirizine 5mg",
        category: "Antiallergic & Respiratory Relief",
        uses: "Sardi, lagatar chheenk aana, naak behna, aankho se paani aana aur allergic khansi/dama me.",
        timing: "Raat ko sone se pehle (Bedtime)",
        frequency: "0-0-1 (Din me sirf 1 baar raat ko)",
        dosage: "1 Tablet",
        instructions: "Raat ko sote waqt 1 glass paani ke sath lein.",
        precautions: "Ise lene se halki neend (drowsiness) aa sakti hai, isliye din me drive ya heavy machine operating avoid karein.",
        inventoryId: "med-7"
      },
      {
        names: ["metformin", "glycomet", "glycomet 500", "glucophage"],
        brandName: "Glycomet 500 / Glucophage",
        genericName: "Metformin Hydrochloride SR 500mg",
        category: "Oral Antidiabetic (Type-2 Diabetes)",
        uses: "Khoon me glucose level kam karna aur liver me extra sugar production rokna.",
        timing: "Khane ke beech me ya khane ke turant baad",
        frequency: "1-0-1 ya 1-0-0 (Doctor ke prescribed dose anusar)",
        dosage: "1 Tablet (SR)",
        instructions: "Hamesha khane ke sath lein taaki pet me loose motion ya ulti na lage. Tablet ko todein nahi, poora niglein.",
        precautions: "Regular blood sugar monitor karte rahein. Bina khaye khali pet na lein.",
        inventoryId: "med-5"
      },
      {
        names: ["telma", "telma 40", "telmisartan", "telmikind"],
        brandName: "Telma 40 / Telmikind",
        genericName: "Telmisartan 40mg IP",
        category: "Antihypertensive (Blood Pressure Medicine)",
        uses: "High blood pressure ko 120/80 normal range me maintain rakhna aur heart attack/stroke se bachana.",
        timing: "Subah nashte ke baad (Rozana ek nishchit samay par)",
        frequency: "1-0-0 (Din me sirf 1 baar)",
        dosage: "1 Tablet (40mg)",
        instructions: "Rozana subah ek hi samay par lein. Namak (salt) kam khayein.",
        precautions: "BP ki goli achanak band na karein. Pregnancy me bilkul na lein.",
        inventoryId: "med-8"
      },
      {
        names: ["amlodipine", "amlip", "norvasc", "stamlo"],
        brandName: "Amlip / Norvasc",
        genericName: "Amlodipine Besylate 5mg",
        category: "Calcium Channel Blocker (Blood Pressure & Angina)",
        uses: "Blood vessels ko relax karke blood pressure kam karna aur seene ke dard (angina) ko rokna.",
        timing: "Subah nashte ke baad",
        frequency: "1-0-0 (Din me 1 baar)",
        dosage: "1 Tablet (5mg)",
        instructions: "Rozana regular lein.",
        precautions: "Pairon me sujan (ankle swelling) ya chakkar aane par doctor ko inform karein.",
        inventoryId: "med-1"
      },
      {
        names: ["zerodol", "zerodol-p", "hifenac", "hifenac-p", "aceclofenac"],
        brandName: "Zerodol-P / Hifenac-P",
        genericName: "Aceclofenac 100mg + Paracetamol 325mg",
        category: "Pain Reliever & Anti-inflammatory (NSAID)",
        uses: "Jodo ka dard (joint pain), kamar dard, dant dard, sujan aur moch (sprain) me turant relief ke liye.",
        timing: "Hamesha khana khane ke baad (Never empty stomach)",
        frequency: "1-0-1 (Subah aur Raat - sirf 3 se 5 din tak)",
        dosage: "1 Tablet",
        instructions: "Doodh ya paani ke sath bhare pet lein taaki acidity na ho.",
        precautions: "Pet me ulcer ya kidney disease wale log na lein. 5 din se zyada lagataar na khayein.",
        inventoryId: "med-10"
      },
      {
        names: ["ciprofloxacin", "ciplox", "cifran", "ciiproflox"],
        brandName: "Ciplox 500 / Cifran",
        genericName: "Ciprofloxacin 500mg",
        category: "Fluoroquinolone Antibiotic",
        uses: "UTI (peshab me jalan/infection), severe loose motion/dast, typhoid aur skin bacterial infection.",
        timing: "Khane ke 1-2 ghante baad",
        frequency: "1-0-1 (Subah aur Raat)",
        dosage: "1 Tablet (500mg)",
        instructions: "Is dawai ke sath din me kam se kam 2.5 se 3 litre paani piyein.",
        precautions: "Doodh, dahi ya calcium supplement ke sath turant na lein (2 ghante ka gap rakhein).",
        inventoryId: "med-11"
      },
      {
        names: ["cetirizine", "zyrtec", "cetzine", "okacet"],
        brandName: "Zyrtec / Cetzine",
        genericName: "Cetirizine Hydrochloride 10mg",
        category: "Antihistamine (Allergy & Itching Relief)",
        uses: "Khujli, daane, allergic rash, keede ke kaatne par sujan aur sardi me.",
        timing: "Raat ko sone se pehle",
        frequency: "0-0-1 (Din me 1 baar)",
        dosage: "1 Tablet (10mg)",
        instructions: "Paani ke sath ek goli lein.",
        precautions: "Susti (sedation) ho sakti hai. Alcohol ke sath na lein.",
        inventoryId: "med-12"
      },
      {
        names: ["amoxicillin", "mox", "novamox", "mox 500"],
        brandName: "Mox 500 / Novamox",
        genericName: "Amoxicillin Trihydrate 500mg",
        category: "Penicillin Antibiotic",
        uses: "Kaan, naak, gale, daant aur chest ke bacterial infection ke ilaaj me.",
        timing: "Khane ke baad (After meals)",
        frequency: "1-0-1 (Subah aur Raat - 12 ghante ke gap me)",
        dosage: "1 Capsule (500mg)",
        instructions: "Doctor ka nirdharit 5 se 7 din ka poora course complete karein.",
        precautions: "Penicillin allergy wale mareez bilkul na lein.",
        inventoryId: "med-2"
      },
      {
        names: ["atorvastatin", "atorva", "lipitor", "atorlip"],
        brandName: "Atorva 10 / Lipitor",
        genericName: "Atorvastatin Calcium 10mg",
        category: "Cholesterol-lowering Statin",
        uses: "Bad LDL cholesterol aur triglycerides kam karke heart attack aur stroke se bachav.",
        timing: "Raat ko khane ke baad (Bedtime)",
        frequency: "0-0-1 (Raat ko 1 baar)",
        dosage: "1 Tablet (10mg)",
        instructions: "Raat ko sote samay paani ke sath lein. Oily aur fried food band karein.",
        precautions: "Muscles me achanak tez dard ya kamzori aane par doctor ko batayein.",
        inventoryId: "med-9"
      },
      {
        names: ["combiflam", "ibuprofen", "brufen"],
        brandName: "Combiflam / Brufen",
        genericName: "Ibuprofen 400mg + Paracetamol 325mg",
        category: "Pain Reliever & Anti-inflammatory",
        uses: "Dant dard, sharir dard, periods ka dard (menstrual cramps) aur chot me sujan kam karne ke liye.",
        timing: "Khana khane ke baad (Never empty stomach)",
        frequency: "1-0-1 (Sirf dard hone par)",
        dosage: "1 Tablet",
        instructions: "Khane ke baad paani se lein.",
        precautions: "Dengue fever me Combiflam/Brufen KABHI NA LEIN kyunki yeh bleeding risk badhati hai. Ulcer wale na lein.",
        inventoryId: "med-10"
      },
      {
        names: ["digene", "gelusil", "eno", "antacid"],
        brandName: "Digene / Gelusil / Eno",
        genericName: "Antacid (Magnesium & Aluminium Hydroxide)",
        uses: "Instant acidity, pet me achanak jalan aur khatti dakar se turant 5-minute relief.",
        timing: "Khana khane ke 30-60 minute baad ya jalan hone par",
        frequency: "SOS (Zarurat padne par 2 chammach syrup ya 1-2 chewable tab)",
        dosage: "10-15 ml Syrup ya 2 Chewable Tablets",
        instructions: "Tablet ko chaba kar khayein, niglein nahi.",
        precautions: "Antibiotics lene ke sath 2 ghante ka gap zaroor rakhein.",
        inventoryId: "med-6"
      },
      {
        names: ["ors", "electral", "ors घोल"],
        brandName: "Electral / ORS WHO Formula",
        genericName: "Oral Rehydration Salts (ORS)",
        uses: "Loose motion, ulti, dehydration aur garmi me sharir me paani aur namak ki kami poori karna.",
        timing: "Din bhar me ghoont-ghoont karke piyein",
        frequency: "Har baar loose stool ya ulti ke baad 1 glass",
        dosage: "1 Packet = 1 Litre Paani",
        instructions: "1 packet ORS ko poore 1 litre saaf uble thande paani me gholein. Ghole hue paani ko 24 ghante ke andar use karein.",
        precautions: "ORS ko doodh, soup ya juice me na milayein, sirf saaf paani me gholein.",
        inventoryId: null
      },
      {
        names: ["meftal spas", "meftal", "meftal-spas", "dicyclomine"],
        brandName: "Meftal-Spas",
        genericName: "Mefenamic Acid 250mg + Dicyclomine 10mg",
        category: "Antispasmodic & Painkiller",
        uses: "Pet me achanak marod (cramps), periods ka tez dard aur aant ki ainthhan me turant aaram.",
        timing: "Khana khane ke baad",
        frequency: "SOS (Zarurat padne par)",
        dosage: "1 Tablet",
        instructions: "Khana khane ke baad gungune paani se lein.",
        precautions: "Regular rozana na lein, sirf pet me ainthhan ya cramp hone par lein.",
        inventoryId: null
      },
      {
        names: ["disprin", "aspirin", "ecospirin"],
        brandName: "Disprin / Ecosprin",
        genericName: "Aspirin (Acetylsalicylic Acid)",
        uses: "Halka sir dard aur emergency cardiac chest pain me blood thinner ke roop me.",
        timing: "Khana khane ke baad (Gungune paani me ghol kar)",
        frequency: "Doctor ke bataye nirdesh anusar",
        dosage: "1 Dispersible Tablet",
        instructions: "Gungune paani me ghol kar piyein.",
        precautions: "Dengue me bilkul na lein. Pet me ulcer ya bleeding disorder me contraindicated hai.",
        inventoryId: null
      }
    ];
  }

  // -------------------------------------------------------------
  // 3. CLINICAL HEALTH VITALS & STANDARDS
  // -------------------------------------------------------------
  initVitalsKB() {
    return [
      {
        triggers: ["normal bp", "bp normal", "blood pressure kitna", "bp kitna hona chahiye", "bp range"],
        title: "Normal Blood Pressure (BP) Clinical Range",
        html: `
          <p>Google & Medical Clinical Guidelines ke mutabiq adult ka normal blood pressure:</p>
          <ul style="margin: 6px 0 6px 18px; font-size: 0.85rem;">
            <li><strong>Normal BP:</strong> 120/80 mmHg (Systolic 120, Diastolic 80)</li>
            <li><strong>Elevated / Borderline:</strong> 120–129 / &lt;80 mmHg</li>
            <li><strong>Stage 1 High BP:</strong> 130–139 / 80–89 mmHg</li>
            <li><strong>Stage 2 High BP:</strong> 140/90 mmHg ya usse zyada</li>
          </ul>
          <p style="font-size: 0.82rem; color: #475569; margin-top: 6px;">
            💡 <em>Agar lagataar reading 140/90 se upar aaye toh namak kam karein aur doctor se regular dawai ke liye consult karein.</em>
          </p>
        `
      },
      {
        triggers: ["normal sugar", "sugar level", "fasting sugar", "sugar kitna", "sugar range", "diabetes range", "sugar kitni honi chahiye"],
        title: "Normal Blood Sugar (Glucose) Clinical Range",
        html: `
          <p>Google Health & ADA (American Diabetes Association) ke niyam:</p>
          <ul style="margin: 6px 0 6px 18px; font-size: 0.85rem;">
            <li><strong>Fasting (Khali Pet):</strong> 70 – 99 mg/dL (Normal) | 100 – 125 mg/dL (Prediabetes) | 126+ mg/dL (Diabetes)</li>
            <li><strong>PP (Khana khane ke 2 ghante baad):</strong> &lt; 140 mg/dL (Normal) | 140 – 199 mg/dL (Prediabetes) | 200+ mg/dL (Diabetes)</li>
            <li><strong>HbA1c (3 Mahine ka Average):</strong> &lt; 5.7% (Normal) | 5.7% – 6.4% (Prediabetes) | 6.5%+ (Diabetes)</li>
          </ul>
        `
      },
      {
        triggers: ["pani kitna", "paani kitna", "water intake", "kitna pani peena", "water kitna"],
        title: "Daily Water Intake Medical Guidelines",
        html: `
          <p>Google Clinical & WHO Health Standards ke mutabiq:</p>
          <ul style="margin: 6px 0 6px 18px; font-size: 0.85rem;">
            <li>Ek swasth adult vyakti ko rozaana <strong>2.5 se 3.5 litre (lagbhag 8–10 glass)</strong> paani peena chahiye.</li>
            <li>Yeh digestion theek rakhta hai, kidney se toxins nikalta hai aur dehydration se bachata hai.</li>
            <li>*Note: Heart ya kidney disease ke mareez doctor dwara batayi gayi fluid limit ke mutabiq hi paani lein.*</li>
          </ul>
        `
      },
      {
        triggers: ["normal temperature", "body temperature", "bukhar kitne par", "fever kitne par"],
        title: "Human Body Temperature & Fever Standards",
        html: `
          <ul style="margin: 6px 0 6px 18px; font-size: 0.85rem;">
            <li><strong>Normal Sharir ka Taapman:</strong> 98.6°F (37°C) — 97°F se 99°F aamtaur par normal hota hai.</li>
            <li><strong>Halka Bukhar (Low Grade):</strong> 99.5°F – 100.4°F</li>
            <li><strong>High Grade Fever:</strong> 101°F ya usse zyada (Isme Paracetamol 650mg aur gili patti ka prayog karein).</li>
          </ul>
        `
      },
      {
        triggers: ["pulse", "heart rate", "normal pulse", "heart rate kitna"],
        title: "Normal Resting Heart Rate / Pulse",
        html: `
          <ul style="margin: 6px 0 6px 18px; font-size: 0.85rem;">
            <li>Ek swasth vyakti ka aaram ki sthiti me normal heart rate <strong>60 se 100 beats per minute (BPM)</strong> hota hai.</li>
            <li>Athletes ya bohot fit logon ka resting pulse 50–60 BPM bhi ho sakta hai jo bilkul normal hai.</li>
          </ul>
        `
      },
      {
        triggers: ["oxygen", "spo2", "normal oxygen"],
        title: "Normal Blood Oxygen (SpO2) Standards",
        html: `
          <ul style="margin: 6px 0 6px 18px; font-size: 0.85rem;">
            <li><strong>Normal SpO2:</strong> 95% se 100% pulse oximeter par normal hota hai.</li>
            <li>Agar SpO2 lagatar 93% se niche jaye toh turant doctor se consult karein.</li>
          </ul>
        `
      }
    ];
  }

  // -------------------------------------------------------------
  // 4. MAIN PROCESS QUERY - REAL-TIME INTELLIGENT DISPATCHER
  // -------------------------------------------------------------
  async processQuery(userInput) {
    const rawInput = (userInput || "").trim();
    const cleanInput = rawInput.toLowerCase();

    if (!cleanInput) {
      return {
        type: "chat",
        text: "Namaste! Main Dr. Bot hoon 🩺. Aap mujhse kisi bhi dawaai, bimari ya health parameters ke baare me pooch sakte hain."
      };
    }

    // A. Direct Greeting Detection (Precise, Friendly & Concise)
    // Matches: hi, hello, hey, namaste, namaskar, pranam, ram ram, kaise ho, kya haal hai, good morning/evening, etc.
    if (this.isGreeting(cleanInput)) {
      return {
        type: "chat",
        text: `
          <strong>Hello! Main Dr. Bot hoon. 🩺</strong><br>
          Main aapki kya help kar sakta hoon?<br><br>
          Aap mujhse pooch sakte hain:<br>
          • Kisi bhi <strong>dawaai ke baare me</strong> (jaise Dolo 650, Pan-D, Azithromycin kab aur kaise lein)<br>
          • <strong>Bimari ya lakshan</strong> (bukhar, acidity, sardi-khansi, loose motion)<br>
          • <strong>Health standards</strong> (normal BP, Sugar level, ya daily water intake)
        `
      };
    }

    // B. Gratitude / Courtesy
    if (this.isThanks(cleanInput)) {
      return {
        type: "chat",
        text: "Aapka swagat hai! Swasth rahein 🌿. Agar koi aur medical ya dawaai ka sawaal ho toh zaroor poochhein."
      };
    }

    // C. Identity
    if (this.isIdentity(cleanInput)) {
      return {
        type: "chat",
        text: "Main **Dr. Bot** hoon — Medico AI ka Clinical Assistant 🩺. Main aapko Google Clinical standards aur genuine pharmacology ke anusar dawaaiyon ke sahi samay, dosage, parhez aur generic bachat ki sateek jaankari deta hoon."
      };
    }

    // D. Order Tracking & Order History
    const isOrderQuery = cleanInput.includes("order") || cleanInput.includes("track") || cleanInput.includes("status") || 
                         cleanInput.includes("kahan hai") || cleanInput.includes("kab aayega") || cleanInput.includes("delivery");
    if (isOrderQuery && typeof db !== "undefined") {
      return this.handleOrderQuery();
    }

    // E. Doctor Prescription / Parchi Explanation
    const isRxQuery = cleanInput.includes("prescription") || cleanInput.includes("parchi") || 
                      cleanInput.includes("kya kya likha") || cleanInput.includes("kya likha") ||
                      cleanInput.includes("konsi dwai") || cleanInput.includes("konsi dawa") || cleanInput.includes("konsi dawai") ||
                      cleanInput.includes("kaunsi dawai") || cleanInput.includes("doctor ne kya") ||
                      cleanInput.includes("parchi samjhao") || cleanInput.includes("prescription samjhao");
    if (isRxQuery) {
      return this.handlePrescriptionQuery();
    }

    // F. Payment & COD Query
    if (cleanInput.includes("payment") || cleanInput.includes("cod") || cleanInput.includes("cash on delivery") || cleanInput.includes("charge")) {
      return this.handlePaymentQuery();
    }

    // G. Normal Health Standards & Vitals Lookup (BP, Sugar, Water, etc.)
    const matchedVital = this.findVital(cleanInput);
    if (matchedVital) {
      return {
        type: "direct_answer",
        title: matchedVital.title,
        htmlContent: matchedVital.html,
        recommendedMedIds: []
      };
    }

    // H. Specific Medicine Lookup (e.g. "Dolo 650 kab leni hai?", "Pan-D khali pet kyu?", "Azithromycin")
    const matchedMed = this.findMedicine(cleanInput);
    if (matchedMed) {
      return this.generateMedicineResponse(matchedMed, cleanInput);
    }

    // I. Disease & Clinical Conditions Lookup (e.g. Bukhar, Acidity, Cough, Loose Motion, Dengue)
    const matchedCondition = this.findCondition(cleanInput);
    if (matchedCondition) {
      return {
        type: "clinical_protocol",
        condition: matchedCondition.condition,
        summary: `Aapke sawaal par **Google & Clinical Knowledge Base** ka exact analysis:`,
        clinicalAnalysis: matchedCondition.analysis,
        schedule: matchedCondition.schedule,
        advice: matchedCondition.advice,
        homeCare: matchedCondition.homeCare,
        recommendedMedIds: matchedCondition.recommendedMedIds
      };
    }

    // J. Real-Time Google / Wikipedia Medical Search Fallback
    // If not in internal curated bank, dynamically query medical database via open Wikipedia REST API
    const liveSearchResult = await this.performLiveMedicalSearch(rawInput, cleanInput);
    if (liveSearchResult) {
      return liveSearchResult;
    }

    // K. Smart Synthesizer Fallback (Direct, professional, without dumping irrelevant bloated text)
    return this.generateSmartFallback(rawInput, cleanInput);
  }

  // -------------------------------------------------------------
  // HELPER METHODS & MATCHER LOGIC
  // -------------------------------------------------------------
  isGreeting(text) {
    const greetingWords = [
      "hi", "hello", "hey", "namaste", "namaskar", "pranam", "ram ram", "kem cho",
      "kaise ho", "kya haal", "kya hal", "kese ho", "hlo", "hii", "helo",
      "good morning", "good afternoon", "good evening", "dr bot", "doctor bot", "hello doctor"
    ];
    // Exact or starting with greeting word
    const tokens = text.split(/\s+/);
    if (tokens.length <= 4) {
      return greetingWords.some(g => text === g || text.startsWith(g + " ") || text.endsWith(" " + g));
    }
    return false;
  }

  isThanks(text) {
    const thanksWords = ["thank", "thanks", "dhanyawad", "dhanyavad", "shukriya", "ok", "okay", "theek hai", "thik hai", "shukriya doctor"];
    return thanksWords.some(w => text === w || text.startsWith(w + " ") || text.endsWith(" " + w));
  }

  isIdentity(text) {
    return text.includes("who are you") || text.includes("aap kaun ho") || text.includes("tum kaun ho") || text.includes("apne bare me");
  }

  findVital(text) {
    for (const v of this.vitalsKB) {
      if (v.triggers.some(t => text.includes(t))) {
        return v;
      }
    }
    return null;
  }

  findMedicine(text) {
    // 1. Check local medicinesKB
    for (const med of this.medicinesKB) {
      if (med.names.some(n => text.includes(n))) {
        return med;
      }
    }
    // 2. Check global MEDICINES_DATA
    if (typeof MEDICINES_DATA !== "undefined") {
      const found = MEDICINES_DATA.find(m => 
        text.includes(m.name.toLowerCase().split(" ")[0]) ||
        text.includes(m.brandName.toLowerCase().split(" ")[0]) ||
        text.includes(m.genericName.toLowerCase().split(" ")[0])
      );
      if (found) {
        return {
          names: [found.name.toLowerCase()],
          brandName: found.brandName,
          genericName: found.genericName,
          category: found.categoryLabel,
          uses: found.description,
          timing: found.dosageInfo.timing,
          frequency: found.dosageInfo.frequency,
          dosage: found.unit,
          instructions: found.dosageInfo.instructions,
          precautions: found.dosageInfo.precautions,
          inventoryId: found.id
        };
      }
    }
    return null;
  }

  generateMedicineResponse(med, cleanInput) {
    const isTimingOnly = cleanInput.includes("kab") || cleanInput.includes("time") || cleanInput.includes("kaise le") || cleanInput.includes("khali pet") || cleanInput.includes("khane ke baad");
    const isUseOnly = cleanInput.includes("kaam") || cleanInput.includes("kis liye") || cleanInput.includes("uses") || cleanInput.includes("kya kaam");
    const isSideEffectOnly = cleanInput.includes("side effect") || cleanInput.includes("nuksan") || cleanInput.includes("savdhani") || cleanInput.includes("precaution");

    let explanation = `<strong>${med.brandName}</strong> (${med.genericName}) — ${med.uses}`;
    if (isTimingOnly) {
      explanation = `<strong>Timing Niyam:</strong> ${med.timing}. ${med.instructions}`;
    } else if (isUseOnly) {
      explanation = `<strong>Kaam aur Upyog:</strong> ${med.uses}. Yeh ${med.category} category me aati hai.`;
    } else if (isSideEffectOnly) {
      explanation = `<strong>Savdhani aur Precautions:</strong> ${med.precautions}`;
    }

    const recIds = med.inventoryId ? [med.inventoryId] : [];

    return {
      type: "medicine_guide",
      medicineName: `${med.brandName} (${med.genericName})`,
      explanation: explanation,
      timing: med.timing,
      frequency: med.frequency,
      dosage: med.dosage,
      purpose: med.uses,
      precautions: med.precautions,
      recommendedMedIds: recIds
    };
  }

  findCondition(text) {
    let bestMatch = null;
    let maxScore = 0;

    for (const c of this.conditionsKB) {
      let score = 0;
      for (const kw of c.keywords) {
        if (text.includes(kw)) {
          score += kw.length > 4 ? 3 : 2;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = c;
      }
    }

    return maxScore > 0 ? bestMatch : null;
  }

  // -------------------------------------------------------------
  // 5. LIVE GOOGLE / WIKIPEDIA MEDICAL SEARCH INTEGRATION
  // -------------------------------------------------------------
  async performLiveMedicalSearch(rawInput, cleanInput) {
    // Extract likely medical query topic
    // Strip filler words: "kya hai", "ke baare me batao", "what is", "about"
    let topic = cleanInput
      .replace(/^(what is|who is|kya hota hai|kya hai|batao|kripya|please|tell me about|information about)\s*/gi, "")
      .replace(/\s*(kya hai|kya hota hai|ke bare me batao|ke bare me|bataiye|hoga|hai)$/gi, "")
      .trim();

    if (!topic || topic.length < 3) return null;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response && response.ok) {
        const data = await response.json();
        if (data && data.extract && data.type !== "disambiguation") {
          return {
            type: "direct_answer",
            title: `Google Medical & Clinical Definition: ${data.title}`,
            htmlContent: `
              <p style="margin-bottom: 8px;"><strong>${data.title}</strong> ke baare me verified medical jankari:</p>
              <div style="background: white; padding: 10px; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 0.85rem; line-height: 1.5; color: #334155; margin-bottom: 8px;">
                ${data.extract}
              </div>
              <p style="font-size: 0.8rem; color: #64748b;">
                🔍 <em>Source: Medical Encyclopedia & Google Knowledge Graph. Kisi bhi dawai ya ilaaj ke liye registered physician se consult karein.</em>
              </p>
            `,
            recommendedMedIds: []
          };
        }
      }
    } catch (e) {
      // Offline or network timeout, gracefully proceed to smart synthesizer
    }
    return null;
  }

  generateSmartFallback(rawInput, cleanInput) {
    const isTimingQuery = cleanInput.includes("kab") || cleanInput.includes("time") || cleanInput.includes("kaise");
    const isDietQuery = cleanInput.includes("khana") || cleanInput.includes("parhez") || cleanInput.includes("kya khaye");

    return {
      type: "direct_answer",
      title: "Google Clinical & Medical Assistant",
      htmlContent: `
        <p style="margin-bottom: 6px;">Aapne poochha: <em>"${rawInput}"</em></p>
        <p style="margin-bottom: 6px;"><strong>Google Medical Guidance:</strong></p>
        <ul style="margin: 4px 0 6px 18px; font-size: 0.85rem;">
          ${isTimingQuery ? `
            <li><strong>Dawai Timing Golden Rule:</strong> Acidity aur Thyroid ki dawai hamesha <strong>khali pet (subah)</strong> li jaati hai.</li>
            <li>Painkiller (Dolo/Zerodol) aur Antibiotic hamesha <strong>khana khane ke baad</strong> 1 glass paani ke sath li jaati hain.</li>
          ` : isDietQuery ? `
            <li>Bimari me halka, supaachya aahar (moong daal khichdi, daliya, nariyal paani) lein.</li>
            <li>Oily, teekha, bahar ka fast-food aur cold drinks bilkul band karein.</li>
          ` : `
            <li>Kisi bhi bimari ya dawai ke sevan me sahi samay (timing) aur nirdharit matra (dosage) ka palan karna zaroori hai.</li>
            <li>Har dawai ko taaze paani ke sath lein, chai ya coffee ke sath kabhi na lein.</li>
          `}
        </ul>
        <p style="font-size: 0.8rem; color: #64748b; margin-top: 6px;">
          🩺 <em>Aap mujhse kisi specific dawai (jaise Dolo, Pan-D, Azithromycin) ya lakshan (bukhar, acidity) ke baare me pooch sakte hain.</em>
        </p>
      `,
      recommendedMedIds: []
    };
  }

  handleOrderQuery() {
    const orders = (typeof db !== "undefined" && db.getUserOrders) ? db.getUserOrders() : (typeof db !== "undefined" && db.getOrders ? db.getOrders() : []);
    if (orders && orders.length > 0) {
      const latestOrder = orders[0];
      const itemsList = latestOrder.items.map(i => `${i.name} (x${i.quantity})`).join(", ");
      
      let statusEmoji = "⏳";
      if (latestOrder.status === "Shipped") statusEmoji = "🚚";
      else if (latestOrder.status === "Delivered") statusEmoji = "✅";
      else if (latestOrder.status === "Processing") statusEmoji = "⚙️";

      return {
        type: "direct_answer",
        title: `Order Tracking (${statusEmoji} Status: ${latestOrder.status})`,
        htmlContent: `
          <p>Aapke latest order <strong>#${latestOrder.id}</strong> ki real-time jaankari:</p>
          <ul style="margin: 6px 0 6px 18px; font-size: 0.85rem;">
            <li><strong>Status:</strong> ${latestOrder.status}</li>
            <li><strong>Dawaiyan:</strong> ${itemsList}</li>
            <li><strong>Total Amount:</strong> ₹${latestOrder.totalAmount} (Aapne ₹${latestOrder.totalSavings} bachaye)</li>
            <li><strong>Address:</strong> ${latestOrder.address}</li>
            <li><strong>Payment:</strong> ${latestOrder.paymentMethod} (Free Delivery)</li>
          </ul>
        `,
        recommendedMedIds: []
      };
    } else {
      return {
        type: "chat",
        text: "Aapka abhi koi active order nahi mila. Aap kisi bhi dawaai ko cart me add karke ya prescription scan karke order kar sakte hain. Cash on Delivery bilkul free hai! 🛒"
      };
    }
  }

  handlePrescriptionQuery() {
    let activeRx = null;
    try {
      const stored = localStorage.getItem("medico_active_prescription");
      if (stored) activeRx = JSON.parse(stored);
    } catch(e) {}

    if (!activeRx && typeof SAMPLE_PRESCRIPTIONS !== "undefined" && SAMPLE_PRESCRIPTIONS.length > 0) {
      activeRx = SAMPLE_PRESCRIPTIONS[0];
    }

    if (activeRx) {
      const matchedMeds = (typeof MEDICINES_DATA !== "undefined") ? MEDICINES_DATA.filter(m => (activeRx.matchedMedicineIds || []).includes(m.id)) : [];
      let totalMrp = 0;
      let totalGeneric = 0;
      matchedMeds.forEach(m => {
        totalMrp += m.mrp;
        totalGeneric += m.genericPrice;
      });
      const savings = totalMrp - totalGeneric;

      const scheduleItems = (activeRx.itemsExplanation && activeRx.itemsExplanation.length > 0)
        ? activeRx.itemsExplanation.map(item => ({
            medicine: item.name,
            dosage: `Kitne din: ${item.duration}`,
            frequency: item.frequencyHindi,
            timing: item.timingHindi,
            purpose: `${item.purposeHindi} (Generic lene par ₹${item.savings} bachenge)`
          }))
        : matchedMeds.map(med => ({
            medicine: `${med.name} (Branded: ${med.brandName.split('/')[0]})`,
            dosage: med.unit,
            frequency: med.dosageInfo.frequency,
            timing: med.dosageInfo.timing,
            purpose: med.description
          }));

      return {
        type: "clinical_protocol",
        isPrescriptionGuide: true,
        condition: `Doctor Parchi Analysis: ${activeRx.doctorName || "Dr. Rajesh Sharma"}`,
        summary: `Prescription **${activeRx.patientName || "Patient"}** ke liye **${activeRx.diagnosisHindi || activeRx.diagnosis}** ke ilaaj hetu likhi gayi hai:`,
        clinicalAnalysis: `Hospital/Clinic: ${activeRx.hospital || "City Care Clinic"} | Har dawai ka kaam aur sahi samay niche diya gaya hai:`,
        schedule: scheduleItems,
        advice: [
          "💧 Din me 3-4 litre gunguna paani piyein aur poora aaram karein.",
          "⏰ Har dawai ko bataye gaye sahi samay par hi lein.",
          `💰 Direct Bachat: Branded MRP ₹${totalMrp} ke mukable Jan Aushadhi Generic sirf ₹${totalGeneric} me milengi — yaani seedhe ₹${savings} ki bachat!`
        ],
        homeCare: "Gungune namak paani se garare karein aur halka supaachya khana lein.",
        recommendedMedIds: activeRx.matchedMedicineIds || []
      };
    }

    return {
      type: "chat",
      text: "Aapne abhi tak koi parchi scan nahi ki hai. Upar 'Rx Scanner' par click karke doctor ki parchi upload karein, main turant har dawaai ka matlab aur timing samjha dunga! 📋"
    };
  }

  handlePaymentQuery() {
    return {
      type: "direct_answer",
      title: "Medico AI Payment & COD Rules",
      htmlContent: `
        <p>Medico AI par payment aur delivery ke niyam:</p>
        <ul style="margin: 6px 0 6px 18px; font-size: 0.85rem;">
          <li><strong>Cash on Delivery (COD):</strong> 100% Free hai. Dawaai haath me aane ke baad hi payment karni hoti hai.</li>
          <li><strong>UPI on Delivery:</strong> Delivery boy ke scanner par Google Pay, PhonePe ya Paytm se pay kar sakte hain.</li>
          <li><strong>Free Shipping:</strong> Sabhi generic dawaaiyon ke order par delivery bilkul free hai.</li>
        </ul>
      `,
      recommendedMedIds: []
    };
  }
}

// Global DrBot instance
const drBot = new DrBotEngine();
