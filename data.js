// Medico Comprehensive Database & Medical Knowledge Base
// 100% Client-side local persistent dataset for medicines, generic equivalents, and sample prescriptions

const MEDICINES_DATA = [
  {
    id: "med-1",
    name: "Amlodipine 5mg",
    genericName: "Amlodipine Besylate 5mg",
    category: "Antihypertensive",
    categoryLabel: "High Blood Pressure",
    brandName: "Amlip / Norvasc",
    brandPrice: 58.00,
    genericPrice: 18.00,
    mrp: 65.00,
    savingsPercent: 72,
    unit: "10 Tablets / Strip",
    prescriptionRequired: true,
    inStock: true,
    composition: "Amlodipine (5mg)",
    manufacturer: "Jan Aushadhi / Cipla Generics",
    description: "Calcium channel blocker used to treat high blood pressure and angina (chest pain).",
    dosageInfo: {
      timing: "Subah nashte ke baad (Once daily, usually morning)",
      frequency: "1-0-0 (Din me 1 baar)",
      instructions: "Rozana ek hi samay par lein. BP ko control me rakhta hai.",
      precautions: "Achanak lena band na karein. Dizziness ho sakti hai shuru me."
    }
  },
  {
    id: "med-2",
    name: "Amoxicillin 500mg",
    genericName: "Amoxicillin Trihydrate 500mg",
    category: "Antibiotic",
    categoryLabel: "Bacterial Infection",
    brandName: "Mox 500 / Novamox",
    brandPrice: 115.00,
    genericPrice: 42.00,
    mrp: 125.00,
    savingsPercent: 66,
    unit: "10 Capsules / Strip",
    prescriptionRequired: true,
    inStock: true,
    composition: "Amoxicillin (500mg)",
    manufacturer: "Alkem Generics / Jan Aushadhi",
    description: "Broad-spectrum penicillin antibiotic used to treat bacterial throat, ear, respiratory and skin infections.",
    dosageInfo: {
      timing: "Khane ke baad (After meals)",
      frequency: "1-0-1 (Subah aur Raat - 12 ghante ke gap me)",
      instructions: "Doctor dwara bataya gaya poora 5 ya 7 din ka course complete karein chahe thik lagne lage.",
      precautions: "Penicillin se allergy wale log na lein. Loose motion ho toh ORS lein."
    }
  },
  {
    id: "med-3",
    name: "Azithromycin 500mg",
    genericName: "Azithromycin 500mg",
    category: "Antibiotic",
    categoryLabel: "Throat & Chest Infection",
    brandName: "Azithral 500 / Zithromax",
    brandPrice: 132.00,
    genericPrice: 48.00,
    mrp: 145.00,
    savingsPercent: 67,
    unit: "3 Tablets / Strip",
    prescriptionRequired: true,
    inStock: true,
    composition: "Azithromycin (500mg)",
    manufacturer: "Mankind Generics / Pradhan Mantri Jan Aushadhi",
    description: "Macrolide antibiotic used for respiratory tract infections, severe throat pain, tonsillitis and typhoid.",
    dosageInfo: {
      timing: "Khana khane se 1 ghanta pehle ya khane ke 2 ghante baad",
      frequency: "1-0-0 (Din me 1 baar, consecutive 3 ya 5 din)",
      instructions: "Fix time par roz lein. Din me sirf ek baar lena hota hai.",
      precautions: "Antacid ke sath turant na lein (kam se kam 2 ghante ka gap rakhein)."
    }
  },
  {
    id: "med-4",
    name: "Paracetamol 650mg",
    genericName: "Paracetamol / Acetaminophen 650mg",
    category: "Analgesic",
    categoryLabel: "Fever & Pain",
    brandName: "Dolo 650 / Calpol 650",
    brandPrice: 34.00,
    genericPrice: 12.00,
    mrp: 38.00,
    savingsPercent: 68,
    unit: "15 Tablets / Strip",
    prescriptionRequired: false,
    inStock: true,
    composition: "Paracetamol (650mg)",
    manufacturer: "Micro Generics / Jan Aushadhi",
    description: "Effective antipyretic (fever reducer) and analgesic for body ache, viral fever, headache, and muscle soreness.",
    dosageInfo: {
      timing: "Halka khana ya dudh/pani ke baad",
      frequency: "1-0-1 (Zarurat padne par 6-8 ghante me)",
      instructions: "24 ghante me 4 se zyada tablet na lein. Bukhar 100°F+ hone par lein.",
      precautions: "Liver patient bina doctor ke na lein. Alcohol ke sath bilkul na lein."
    }
  },
  {
    id: "med-5",
    name: "Metformin 500mg (SR)",
    genericName: "Metformin Hydrochloride Sustained Release 500mg",
    category: "Antidiabetic",
    categoryLabel: "Sugar & Diabetes",
    brandName: "Glycomet 500 / Glucophage",
    brandPrice: 52.00,
    genericPrice: 16.00,
    mrp: 60.00,
    savingsPercent: 73,
    unit: "10 Tablets / Strip",
    prescriptionRequired: true,
    inStock: true,
    composition: "Metformin SR (500mg)",
    manufacturer: "USV Generics / Jan Aushadhi",
    description: "First-line oral blood glucose lowering medicine for Type-2 Diabetes management.",
    dosageInfo: {
      timing: "Khane ke beech me ya khane ke turant baad (To avoid stomach upset)",
      frequency: "1-0-1 ya 0-0-1 (Doctor ke prescription anusar)",
      instructions: "Tablet ko tod ya chaba kar na khayein, poora niglein kyunki yeh SR (Sustained Release) hai.",
      precautions: "Regular fasting aur PP blood sugar monitor karte rahein."
    }
  },
  {
    id: "med-6",
    name: "Pantoprazole 40mg + Domperidone 30mg",
    genericName: "Pantoprazole Gastro-resistant & Domperidone Prolonged-Release",
    category: "Antacid",
    categoryLabel: "Acidity, Gas & GERD",
    brandName: "Pan-D / Pantocid-D",
    brandPrice: 198.00,
    genericPrice: 55.00,
    mrp: 220.00,
    savingsPercent: 75,
    unit: "10 Capsules / Strip",
    prescriptionRequired: true,
    inStock: true,
    composition: "Pantoprazole (40mg) + Domperidone (30mg)",
    manufacturer: "Alkem / Jan Aushadhi",
    description: "Cures severe acid reflux, heartburn, sour burps, and nausea or vomiting sensation.",
    dosageInfo: {
      timing: "Subah khali pet (30 minutes before breakfast)",
      frequency: "1-0-0 (Subah khali pet)",
      instructions: "Gungune pani ke sath lein. Din bhar acidity aur khatti dakar se rahat milti hai.",
      precautions: "Khana khane ke baad lene se iska asar kam ho jata hai."
    }
  },
  {
    id: "med-7",
    name: "Montelukast 10mg + Levocetirizine 5mg",
    genericName: "Montelukast & Levocetirizine Dihydrochloride",
    category: "Antiallergic",
    categoryLabel: "Cold, Cough & Allergy",
    brandName: "Montair-LC / Montek-LC",
    brandPrice: 215.00,
    genericPrice: 58.00,
    mrp: 240.00,
    savingsPercent: 76,
    unit: "10 Tablets / Strip",
    prescriptionRequired: true,
    inStock: true,
    composition: "Montelukast (10mg) + Levocetirizine (5mg)",
    manufacturer: "Cipla / Jan Aushadhi",
    description: "Fast relief from runny nose, sneezing, allergic rhinitis, watery eyes, and allergic cough/asthma symptoms.",
    dosageInfo: {
      timing: "Raat ko sone se pehle (Before bedtime)",
      frequency: "0-0-1 (Din me sirf 1 baar raat ko)",
      instructions: "Ise lene se halki neend (drowsiness) aa sakti hai, isliye raat ko lena behtar hai.",
      precautions: "Ise lene ke baad heavy driving ya machine operating avoid karein."
    }
  },
  {
    id: "med-8",
    name: "Telmisartan 40mg",
    genericName: "Telmisartan 40mg IP",
    category: "Antihypertensive",
    categoryLabel: "High Blood Pressure",
    brandName: "Telma 40 / Telmikind",
    brandPrice: 128.00,
    genericPrice: 32.00,
    mrp: 140.00,
    savingsPercent: 77,
    unit: "15 Tablets / Strip",
    prescriptionRequired: true,
    inStock: true,
    composition: "Telmisartan (40mg)",
    manufacturer: "Glenmark / Jan Aushadhi",
    description: "Angiotensin receptor blocker (ARB) for arterial high blood pressure and cardiovascular protection.",
    dosageInfo: {
      timing: "Subah ek nishchit samay par",
      frequency: "1-0-0 (Din me 1 baar)",
      instructions: "Rozana regular lein. Namak (Sodium) kam khayein.",
      precautions: "Pregnancy me contraindicated hai. Potassium supplements bina doctor ke na lein."
    }
  },
  {
    id: "med-9",
    name: "Atorvastatin 10mg",
    genericName: "Atorvastatin Calcium 10mg",
    category: "Cardiac",
    categoryLabel: "Cholesterol & Heart",
    brandName: "Atorva 10 / Lipitor",
    brandPrice: 110.00,
    genericPrice: 28.00,
    mrp: 125.00,
    savingsPercent: 78,
    unit: "10 Tablets / Strip",
    prescriptionRequired: true,
    inStock: true,
    composition: "Atorvastatin (10mg)",
    manufacturer: "Zydus / Jan Aushadhi",
    description: "Lowers bad LDL cholesterol and triglycerides in blood, reducing the risk of heart attack and stroke.",
    dosageInfo: {
      timing: "Raat ko khane ke baad (Cholesterol synthesis happens mostly at night)",
      frequency: "0-0-1 (Raat ko 1 baar)",
      instructions: "Raat ko sote samay paani ke sath lein. Oily food avoid karein.",
      precautions: "Muscles me achanak tez dard hone par doctor ko turant consult karein."
    }
  },
  {
    id: "med-10",
    name: "Aceclofenac 100mg + Paracetamol 325mg",
    genericName: "Aceclofenac & Paracetamol Tablets",
    category: "Analgesic",
    categoryLabel: "Severe Pain & Inflammation",
    brandName: "Zerodol-P / Hifenac-P",
    brandPrice: 72.00,
    genericPrice: 22.00,
    mrp: 80.00,
    savingsPercent: 73,
    unit: "10 Tablets / Strip",
    prescriptionRequired: true,
    inStock: true,
    composition: "Aceclofenac (100mg) + Paracetamol (325mg)",
    manufacturer: "Ipca / Jan Aushadhi",
    description: "Strong painkiller and anti-inflammatory medicine for joint pain, arthritis, dental pain, backache and sprains.",
    dosageInfo: {
      timing: "Hamesha khana khane ke baad (Never on empty stomach)",
      frequency: "1-0-1 (Subah aur Raat)",
      instructions: "Pet me jalan se bachne ke liye khane ke turant baad lein.",
      precautions: "Stomach ulcer wale mareez na lein. Zyadatar 3-5 din hi lein."
    }
  },
  {
    id: "med-11",
    name: "Ciprofloxacin 500mg",
    genericName: "Ciprofloxacin Hydrochloride 500mg",
    category: "Antibiotic",
    categoryLabel: "Bacterial & UTI Infection",
    brandName: "Ciplox 500 / Cifran",
    brandPrice: 78.00,
    genericPrice: 24.00,
    mrp: 85.00,
    savingsPercent: 72,
    unit: "10 Tablets / Strip",
    prescriptionRequired: true,
    inStock: true,
    composition: "Ciprofloxacin (500mg)",
    manufacturer: "Cipla Generics / Jan Aushadhi",
    description: "Fluoroquinolone antibiotic for urinary tract infections (UTI), severe diarrhea, skin and bone infections.",
    dosageInfo: {
      timing: "Khane ke 1-2 ghante baad, khoob sara pani peeyein",
      frequency: "1-0-1 (Subah aur Raat)",
      instructions: "Din me kam se kam 2.5 - 3 litre pani peeyein taaki kidney par asar na ho.",
      precautions: "Dudh, dahi ya calcium supplements ke sath turant na lein (2 ghante gap rakhein)."
    }
  },
  {
    id: "med-12",
    name: "Cetirizine 10mg",
    genericName: "Cetirizine Hydrochloride 10mg",
    category: "Antiallergic",
    categoryLabel: "Allergy & Itching",
    brandName: "Zyrtec / Cetzine",
    brandPrice: 38.00,
    genericPrice: 9.00,
    mrp: 42.00,
    savingsPercent: 79,
    unit: "10 Tablets / Strip",
    prescriptionRequired: false,
    inStock: true,
    composition: "Cetirizine (10mg)",
    manufacturer: "Dr. Reddy's / Jan Aushadhi",
    description: "Fast-acting antihistamine for itching, hives, insect bites, watery eyes and seasonal allergies.",
    dosageInfo: {
      timing: "Raat ko ya sham ko",
      frequency: "0-0-1 (Din me 1 baar)",
      instructions: "Halki susti aa sakti hai. Pani ke sath ek goli lein.",
      precautions: "Alcohol avoid karein."
    }
  }
];

// Sample Prescriptions with Deep Handwriting Analysis & Simple Hindi Guidance
const SAMPLE_PRESCRIPTIONS = [
  {
    id: "sample-rx-1",
    doctorName: "Dr. Rajesh Sharma (MBBS, MD - Senior Physician)",
    hospital: "City Care Clinic & Diagnostic Centre, Suresh Nagar, Thatipur",
    date: "28/09/2026",
    patientName: "Sachin",
    ageGender: "22 / Male",
    diagnosis: "Acute Upper Respiratory Tract Infection (URTI) with Viral Fever & Severe Throat Pain",
    diagnosisHindi: "मौसम बदलने से हुआ वायरल बुखार (Viral Fever), गले में दर्द/इन्फेक्शन और बदन दर्द",
    rawText: `DR. RAJESH SHARMA (MBBS, MD) - Reg. No: MP-24867
Date: 28/09/2026 | Suresh Nagar, Thatipur, Gwalior
Patient: Sachin | Age/Sex: 22 / M | Temp: 101.4°F | BP: 122/80
Diagnosis: Viral URTI with Fever, Throat Congestion & Bodyache

Rx (Doctor Handwritten Transcription):
1. Tab. Azithromycin 500mg (Azithral 500) - 1 OD x 3 days (after meals)
2. Tab. Dolo 650mg (Paracetamol) - 1 TDS / SOS x 3 days (after food)
3. Tab. Montair-LC (Montelukast + Levocetirizine) - 1 HS x 5 days (bedtime)
4. Cap. Pan-D (Pantoprazole + Domperidone) - 1 OD x 5 days (empty stomach morning)

Doctor's Note: Warm salt water gargle 3 times a day. Drink lukewarm water. Take complete rest.`,
    matchedMedicineIds: ["med-3", "med-4", "med-7", "med-6"],
    keywords: ["azithromycin", "dolo", "paracetamol", "montair-lc", "levocetirizine", "pan-d", "pantoprazole", "viral", "fever", "throat pain", "urti"],
    itemsExplanation: [
      {
        name: "Dolo 650mg (Generic Paracetamol 650mg)",
        purposeHindi: "तेज बुखार उतारने और सिर/बदन दर्द को तुरंत शांत करने के लिए",
        timingHindi: "खाना खाने के बाद (खाली पेट कभी न लें)",
        frequencyHindi: "दिन में 2 से 3 बार (सुबह-दोपहर-रात) या जब बुखार 100°F से ज्यादा हो",
        duration: "3 दिन तक",
        brandPrice: 38,
        genericPrice: 12,
        savings: 26
      },
      {
        name: "Azithromycin 500mg (Generic Azithral 500)",
        purposeHindi: "गले के बैक्टीरिया इन्फेक्शन और टॉन्सिल सूजन को जड़ से खत्म करने के लिए (एंटीबायोटिक)",
        timingHindi: "खाने से 1 घंटा पहले या खाना खाने के 2 घंटे बाद",
        frequencyHindi: "दिन में सिर्फ 1 बार (रोजाना एक ही समय पर)",
        duration: "लगातार 3 दिन का कोर्स पूरा करें",
        brandPrice: 145,
        genericPrice: 48,
        savings: 97
      },
      {
        name: "Montair-LC (Generic Montelukast + Levocetirizine)",
        purposeHindi: "सर्दी, छींक, नाक बहना और एलर्जी वाली खांसी रोकने के लिए",
        timingHindi: "रात को सोने से पहले (इससे हल्की नींद आ सकती है)",
        frequencyHindi: "दिन में सिर्फ 1 बार (0-0-1 रात को)",
        duration: "5 दिन तक",
        brandPrice: 240,
        genericPrice: 58,
        savings: 182
      },
      {
        name: "Pan-D (Generic Pantoprazole + Domperidone)",
        purposeHindi: "तेज दवाइयों की गर्मी से पेट में गैस, एसिडिटी और सीने में जलन/उल्टी रोकने के लिए",
        timingHindi: "सुबह खाली पेट (नाश्ता करने से आधा घंटा पहले)",
        frequencyHindi: "दिन में 1 बार (1-0-0 सुबह)",
        duration: "5 दिन तक",
        brandPrice: 220,
        genericPrice: 55,
        savings: 165
      }
    ],
    doctorAdviceHindi: [
      "दिन में कम से कम 2 से 3 बार गुनगुने पानी में नमक डालकर गरारे करें।",
      "ठंडा पानी, कोल्ड ड्रिंक, आइसक्रीम और तली-भुनी चीजें बिल्कुल बंद रखें।",
      "दिनभर में 3-4 लीटर गुनगुना पानी पिएं और 2-3 दिन पूरा आराम करें।"
    ]
  },
  {
    id: "sample-rx-2",
    doctorName: "Dr. Priya Patel (MD - Diabetologist & Cardiologist)",
    hospital: "Metro Heart & Endocrine Care Center",
    date: "27/09/2026",
    patientName: "Sachin",
    ageGender: "48 / Male",
    diagnosis: "Type 2 Diabetes Mellitus with Essential Hypertension & High Cholesterol",
    diagnosisHindi: "टाइप-2 शुगर (Diabetes), हाई ब्लड प्रेशर (BP) और कोलेस्ट्रॉल नियंत्रण",
    rawText: `DR. PRIYA PATEL (MD - Medicine, Cardiologist)
Reg. No: DEL-89341 | Date: 27/09/2026
Patient: Sachin | Age/Sex: 48 / M
Clinical Vitals: Fasting Blood Sugar: 168 mg/dL | PP: 240 mg/dL | BP: 146/92 mmHg

Rx (Long-term Maintenance Therapy):
1. Tab. Metformin 500mg SR (Glycomet) - 1 BD x 30 days (after meals)
2. Tab. Telmisartan 40mg (Telma 40) - 1 OD x 30 days (morning after breakfast)
3. Tab. Atorvastatin 10mg (Atorva 10) - 1 HS x 30 days (night at bedtime)
4. Tab. Amlodipine 5mg (Amlip 5) - 1 OD x 30 days (morning)

Doctor Advice: Salt restricted diet (<3g/day). Zero refined sweets. 40 min daily morning walk.`,
    matchedMedicineIds: ["med-5", "med-8", "med-9", "med-1"],
    keywords: ["metformin", "telmisartan", "atorvastatin", "amlodipine", "diabetes", "hypertension", "bp", "cholesterol"],
    itemsExplanation: [
      {
        name: "Metformin 500mg SR (Generic Glycomet)",
        purposeHindi: "खून में शुगर (ग्लूकोज) के लेवल को सामान्य रखने के लिए",
        timingHindi: "खाना खाने के बीच में या तुरंत बाद (गोली चबाएं नहीं, पूरी निगलें)",
        frequencyHindi: "दिन में 2 बार (सुबह और रात भोजन के बाद)",
        duration: "30 दिन (नियमित)",
        brandPrice: 60,
        genericPrice: 16,
        savings: 44
      },
      {
        name: "Telmisartan 40mg (Generic Telma 40)",
        purposeHindi: "हाई ब्लड प्रेशर को 120/80 सामान्य बनाए रखने और दिल को सुरक्षित रखने के लिए",
        timingHindi: "सुबह नाश्ते के बाद रोजाना एक निश्चित समय पर",
        frequencyHindi: "दिन में 1 बार (1-0-0)",
        duration: "30 दिन (नियमित)",
        brandPrice: 140,
        genericPrice: 32,
        savings: 108
      },
      {
        name: "Atorvastatin 10mg (Generic Atorva 10)",
        purposeHindi: "खून में से खराब कोलेस्ट्रॉल और ट्राइग्लिसराइड कम करके हार्ट अटैक से बचाव के लिए",
        timingHindi: "रात को खाना खाने के बाद सोते समय",
        frequencyHindi: "दिन में 1 बार (रात को)",
        duration: "30 दिन (नियमित)",
        brandPrice: 125,
        genericPrice: 28,
        savings: 97
      },
      {
        name: "Amlodipine 5mg (Generic Amlip 5)",
        purposeHindi: "नसों को रिलैक्स करके एक्स्ट्रा ब्लड प्रेशर को तेजी से नीचे लाने के लिए",
        timingHindi: "सुबह पानी के साथ",
        frequencyHindi: "दिन में 1 बार (1-0-0)",
        duration: "30 दिन (नियमित)",
        brandPrice: 65,
        genericPrice: 18,
        savings: 47
      }
    ],
    doctorAdviceHindi: [
      "खाने में नमक की मात्रा आधी कर दें (पापड़, अचार, नमकीन बिल्कुल बंद रखें)।",
      "मीठा, चीनी, गुड़ और कोल्ड ड्रिंक से पूरी तरह परहेज करें।",
      "रोजाना सुबह 30 से 40 मिनट तेज कदमों से टहलें (मॉर्निंग वॉक)।"
    ]
  },
  {
    id: "sample-rx-3",
    doctorName: "Dr. Arvind Mehta (MS - Orthopedic Surgeon)",
    hospital: "Apollo Bone & Joint Care Clinic",
    date: "28/09/2026",
    patientName: "Sachin",
    ageGender: "28 / Male",
    diagnosis: "Acute Musculoskeletal Sprain, Lower Backache & Joint Inflammation",
    diagnosisHindi: "कमर और जोड़ों में तेज दर्द, मांसपेशियों में खिंचाव (Sprain) और सूजन",
    rawText: `DR. ARVIND MEHTA (MS Ortho) - Reg. No: MP-11029
Date: 28/09/2026 | Apollo Bone & Joint Care
Patient: Sachin | Age: 28 / M
Diagnosis: Acute Lumbar Sprain & Joint Inflammation

Rx:
1. Tab. Zerodol-P (Aceclofenac 100mg + Paracetamol 325mg) - 1 BD x 5 days (strictly after meals)
2. Cap. Pan-D (Pantoprazole + Domperidone) - 1 OD x 5 days (empty stomach morning)
3. Tab. Cetirizine 10mg - 1 HS x 3 days (bedtime if itching/allergy)

Advice: Avoid bending forward, hot water bag fomentation twice daily, use firm mattress.`,
    matchedMedicineIds: ["med-10", "med-6", "med-12"],
    keywords: ["zerodol", "aceclofenac", "paracetamol", "pan-d", "pantoprazole", "cetirizine", "joint pain", "back pain", "sprain"],
    itemsExplanation: [
      {
        name: "Zerodol-P (Generic Aceclofenac + Paracetamol)",
        purposeHindi: "कमर, मांसपेशियों और जोड़ों के तेज दर्द व सूजन को तुरंत कम करने के लिए",
        timingHindi: "हमेशा खाना खाने के तुरंत बाद (दूध या भारी भोजन के बाद, कभी खाली पेट न लें)",
        frequencyHindi: "दिन में 2 बार (सुबह और रात)",
        duration: "5 दिन तक",
        brandPrice: 80,
        genericPrice: 22,
        savings: 58
      },
      {
        name: "Pan-D (Generic Pantoprazole + Domperidone)",
        purposeHindi: "पेनकिलर दवाइयों से पेट में होने वाली जलन, एसिडिटी और गैस से बचाव के लिए",
        timingHindi: "सुबह खाली पेट नाश्ते से आधा घंटा पहले",
        frequencyHindi: "दिन में 1 बार (सुबह)",
        duration: "5 दिन तक",
        brandPrice: 220,
        genericPrice: 55,
        savings: 165
      },
      {
        name: "Cetirizine 10mg (Generic Zyrtec)",
        purposeHindi: "किसी भी तरह की एलर्जी या खुजली शांत करने के लिए",
        timingHindi: "रात को सोने से पहले",
        frequencyHindi: "दिन में 1 बार",
        duration: "3 दिन तक",
        brandPrice: 42,
        genericPrice: 9,
        savings: 33
      }
    ],
    doctorAdviceHindi: [
      "आगे झुककर भारी वजन बिल्कुल न उठाएं।",
      "दर्द वाली जगह पर दिन में 2 बार गर्म पानी की थैली (Hot fomentation) से सिंकाई करें।",
      "कड़े तख्त या फर्म गद्दे पर सोएं।"
    ]
  }
];

// Helper to calculate total cart savings
function calculateSavings(items) {
  let totalMrp = 0;
  let totalGeneric = 0;
  items.forEach(item => {
    const med = MEDICINES_DATA.find(m => m.id === item.id) || item;
    const qty = item.quantity || 1;
    totalMrp += (med.mrp || med.brandPrice) * qty;
    totalGeneric += med.genericPrice * qty;
  });
  return {
    totalMrp: Math.round(totalMrp),
    totalGeneric: Math.round(totalGeneric),
    savingsAmount: Math.round(totalMrp - totalGeneric),
    savingsPercent: totalMrp > 0 ? Math.round(((totalMrp - totalGeneric) / totalMrp) * 100) : 0
  };
}
