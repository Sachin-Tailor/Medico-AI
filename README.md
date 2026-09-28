# Medico AI — Generic Medicine Discovery, Rx OCR & Dr. Bot Assistant

Medico AI is a next-generation healthcare web platform designed to make essential medicines affordable and accessible. It bridges the gap between expensive branded prescriptions and certified Jan Aushadhi generic alternatives, saving users up to 75% on healthcare bills.

## 🌟 Key Features

1. **AI Prescription Scanner (Rx OCR & Handwriting Recognition):**
   - Upload mobile camera photos or scanned documents of doctor prescriptions.
   - Deep handwriting & abbreviation parsing (`OD`, `BD`, `TDS`, `HS`, `SOS`, `after food`, `empty stomach`).
   - Automatic extraction of prescribed drugs and matching to generic Jan Aushadhi equivalents.
   - 1-Click "Add All Prescribed Medicines to Cart".

2. **Dr. Bot AI — 24/7 Clinical & Dosage Advisor:**
   - Real-time conversational AI in clear, friendly Hindi/Hinglish.
   - Explains prescriptions in simple, jargon-free words: condition diagnosis, medicine purposes, exact dosage timing, doctor precautions, and savings breakdown.
   - Direct 1-click cart addition inside the chat.

3. **Browse & Compare Branded vs Generic:**
   - 12+ essential medicine categories (Pain & Fever, Antibiotics, Acidity, Diabetes, Blood Pressure, Allergy, Cardiac, etc.).
   - Transparent price comparison showing exact savings percentage.

4. **Cart & Cash on Delivery (COD) Checkout:**
   - Zero advance fee, 100% free doorstep delivery.
   - Live savings calculation and celebration banner.

5. **User Health Dashboard:**
   - Real-time order tracking with status milestones (Pending, Processing, Shipped, Delivered).
   - Cumulative money saved tracker vs branded MRP.

6. **Admin Command Center:**
   - Secure management portal (`admin@medico.com` / `admin123`).
   - Real-time order status controller (Pending -> Processing -> Shipped -> Delivered -> Cancelled).
   - Customer registry and live pharmacy logistics analytics.

## 🚀 Tech Stack

- **Frontend:** Pure HTML5, Modern Vanilla CSS (Glassmorphism design system, responsive layout), JavaScript (ES6+).
- **Database & State:** LocalStorageDB with persistent user sessions and isolated order history.
- **AI Engine:** Dr. Bot Clinical Reasoning Engine with Google Medical Synthesis.
- **Zero Dependencies:** Runs instantly in any modern browser without npm build steps.

## 📂 Project Structure

```
Medico/
├── index.html       # Single Page Application layout & UI views
├── styles.css       # Design system, responsive layouts & animations
├── app.js           # Core business logic, LocalStorage DB, Cart & Admin panel
├── drbot.js         # Dr. Bot AI assistant & prescription explanation engine
├── data.js          # Medicine catalog, Jan Aushadhi prices & sample Rx data
├── server.js        # Optional lightweight Node.js local HTTP server
└── start-server.bat # 1-click local server launcher for Windows
```

## 🌐 How to Run Locally

Double-click `index.html` in any browser, or run `start-server.bat` to launch on `http://localhost:3000/`.
