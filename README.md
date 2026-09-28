# Medico AI — Healthcare, Affordable & Smart 🩺

<div align="center">

![AI](https://img.shields.io/badge/AI-Clinical_Reasoning_Engine-059669?style=for-the-badge&logo=openai&logoColor=white)
![NLP](https://img.shields.io/badge/NLP-Natural_Language_Processing-0284c7?style=for-the-badge&logo=probot&logoColor=white)
![Computer Vision](https://img.shields.io/badge/Computer_Vision-Handwriting_OCR-8b5cf6?style=for-the-badge&logo=opencv&logoColor=white)
![Web Dev](https://img.shields.io/badge/Web_Dev-HTML5_•_CSS3_•_JS_ES6+-f97316?style=for-the-badge&logo=javascript&logoColor=white)
![Database](https://img.shields.io/badge/Storage-Persistent_LocalStorage_DB-10b981?style=for-the-badge&logo=databricks&logoColor=white)

<br/>

**An AI-Powered HealthTech & Computer Vision Platform for Doctor Prescription (Rx) OCR Handwriting Recognition, Jan Aushadhi Generic Medicine Discovery (Save up to 75%), and 24/7 Dr. Bot AI Clinical Assistant.**

[Live Demo](https://sachin-tailor.github.io/Medico-AI/) • [Key Features](#-core-technology-pillars) • [Tech Stack](#-technical-architecture--skills) • [How to Run](#-how-to-run-locally)

</div>

---

## 🚀 Core Technology Pillars (AI, ML, NLP & Web Dev)

### 1. 🧠 Artificial Intelligence (AI) & Clinical Reasoning
- **Dr. Bot Clinical Engine:** Custom clinical logic synthesizing evidence-based pharmacology, drug schedules, and safety rules.
- **Dosage Protocol Inference:** Automatically determines whether a medicine is taken before meals (`AC / Empty Stomach`) or after meals (`PC / After Food`), along with precise frequency intervals (`1-0-1`, `1-0-0`, `0-0-1`, `SOS`).
- **Drug-Drug & Dietary Interaction Warnings:** Proactive checks preventing harmful combinations (e.g. avoiding alcohol with Paracetamol, spacing antacids from Azithromycin, salt restrictions for hypertension).

### 2. 💬 Natural Language Processing (NLP)
- **Multilingual Intent Recognition:** Decodes conversational queries in **Hindi, English, and Hinglish** (e.g. *"parchi samjhao"*, *"bukhar aur badan dard hai"*, *"sugar ki dawai kab leni hai"*).
- **Jargon-Free Medical Translation:** Converts complicated doctor handwriting terms and pharmacological names into **simple, crystal-clear Hindi** so patients understand their treatment without confusion.
- **Context-Aware Dialogue:** Smoothly transitions between general symptom advice, active prescription analysis, real-time order tracking, and payment questions.

### 3. 👁️ Machine Learning & Computer Vision (Prescription OCR)
- **Doctor Handwriting & Optical Character Recognition:** Digitizes doctor prescriptions from camera photos and documents.
- **Medical Shorthand Decoder:** Parses doctor abbreviations and frequency symbols:
  - `OD` = Once daily (दिन में 1 बार)
  - `BD` = Twice daily (सुबह-शाम)
  - `TDS` = Thrice daily (दिन में 3 बार)
  - `HS` = At bedtime (रात को सोते समय)
  - `SOS` = As needed / आपातकालीन
- **Fuzzy Drug Entity Extraction:** Matches handwritten drug brand names (e.g. *Dolo 650*, *Pan-D*, *Azithral*, *Montair-LC*, *Glycomet*) with certified Jan Aushadhi generic salts, calculating immediate patient savings (up to 75%).

### 4. 🌐 Full-Stack Web Development & Modern UI/UX
- **Single Page Application (SPA):** Seamless zero-reload navigation between Home, Medicines Catalog, Rx Scanner, User Dashboard, Cart Drawer, and Admin Portal.
- **State-of-the-Art Design System:** Built with modern CSS3 using HSL color tokens, dark glassmorphism, animated laser scanner beams, and responsive grids for mobile, tablet, and desktop.
- **Persistent Local Database (`LocalStorageDB`):**
  - Multi-user authentication & session management.
  - User-specific order isolation (customer data privacy).
  - Admin Command Center with real-time order state machine (`Pending` ➔ `Processing` ➔ `Shipped` ➔ `Delivered` ➔ `Cancelled`).

---

## 🛠️ Technical Architecture & Skills

| Domain | Technology / Technique | Applied In Project |
| :--- | :--- | :--- |
| **Artificial Intelligence** | Clinical Decision Support, Expert Rule Inference | `drbot.js` Clinical Knowledge Base |
| **Natural Language Processing** | Semantic Intent Parser, Hindi/Hinglish Entity Extractor | Dr. Bot 24/7 Chat & Prescription Guide |
| **Computer Vision / OCR** | Optical Character Recognition, Pattern Matching, Tokenizer | Prescription Scanner (Rx OCR) |
| **Frontend Engineering** | HTML5 Semantic Web, Vanilla CSS3 Glassmorphism | `index.html`, `styles.css` Responsive System |
| **Client-Side Database** | LocalStorageDB, ACID-like transactional state | `app.js` Auth, Orders & Admin Control |

---

## 📂 Project Structure

```
Medico/
├── index.html       # Single Page Application layout, Rx scanner & modals
├── styles.css       # Complete modern healthcare CSS design system
├── app.js           # Core business logic, LocalStorage DB, Cart & Admin
├── drbot.js         # Dr. Bot AI clinical assistant & prescription engine
├── data.js          # Medicine database, Jan Aushadhi prices & Rx samples
├── README.md        # Comprehensive technical documentation & badges
└── .gitignore       # Git exclusion rules
```

---

## 🏃 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Sachin-Tailor/Medico-AI.git
   ```
2. Open the folder and double-click `index.html` in any web browser (Chrome, Edge, Safari, Firefox).
3. No build steps, `npm install`, or server dependencies required — 100% plug & play!

---

## 👤 Author & Credits

- **Developer:** Sachin
- **Project:** Medico AI — Affordable & Smart Healthcare
- **License:** MIT License
