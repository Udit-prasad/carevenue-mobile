# CareVenue AI 🏥🏟️

**CareVenue AI** is a smart event health and medical assistance MVP built with React Native and Expo. Designed to protect the safety of stadium attendees, this mobile app gives event-goers a dedicated safety portal to report emergencies, view live facility maps, and dynamically consult an AI Medical Buddy.

### 🌐 Companion Web App
Looking for the staff/medical control center? 
👉 **[CareVenue Admin Dashboard Repository](https://github.com/Udit-prasad/carevenue-admin)**

---

## 🔥 Key Features

* **Quick-Access QR Medical ID:** Instantly generate an offline, readable QR code summarizing your critical medical profile including blood group, allergies, and conditions.
* **Instant SOS Emergency Alert:** Triggers an active alert syncing directly via Firebase Firestore to notify stadium responders to dispatch directly to your seat block.
* **CareVenue AI Buddy:** Integrated tightly with **Groq (Llama-3)** for lightning-fast, ultra-low-latency clinical triaging and real-time medical advice.
* **Live Interactive Venue Maps:** Utilizes embedded Google Maps to track your physical stadium or venue, giving you quick awareness of medical tents and exits.

---

## 🛠️ Tech Stack

* **Frontend:** React Native (Expo)
* **State Management:** Zustand
* **Authentication & Backend:** Firebase (Auth & Firestore)
* **AI Infrastructure:** Groq Cloud (`llama-3.1-8b-instant`)
* **Mapping:** Google Maps Embed API (`react-native-webview`)

---

## 🚀 Local Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/Udit-prasad/carevenue-mobile.git
   cd carevenue-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm install react-native-webview
   ```

3. **Environment Setup (.env)**
   Create a `.env` file at the root of the project with the following keys:
   ```bash
   EXPO_PUBLIC_GROQ_API_KEY="your-groq-api-key"
   EXPO_PUBLIC_FIREBASE_API_KEY="your-firebase-web-api-key"
   ```

4. **Start the Development Server**
   ```bash
   npx expo start --clear
   ```
   *Scan the generated QR code via physical device (Expo Go app) or press `a` to run on Android Emulator.*

---

## 🔒 Security Notice
This project enforces rigorous `.gitignore` shielding. Make sure to keep your API keys stored entirely inside your local `.env` and never deploy secrets directly into source code.
