# CareVenue AI 🏥🏟️

**CareVenue AI** is a smart event health and medical assistance MVP built with React Native and Expo. 

### 💡 Problem Statement Alignment & Integration Flow
Stadiums and large event venues struggle to coordinate real-time medical response, resulting in unsafe conditions for attendees during critical emergencies. Often, attendees lack a unified method to securely broadcast their location or medical history, while dispatchers suffer from disorganized communication channels.

**The Solution:** This project bridges the gap by delivering a comprehensive **Emergency Alert System** and **Medicine Reminder Engine**. By synchronizing real-time Firebase locational grids with instantly readable **QR Emergency Medical Profiles**, stadium responders can instantly bypass bottlenecks to provide life-saving care.

### 🚀 Live Demo
Test the mobile app live in your browser: **[carevenue-mobile.vercel.app](https://carevenue-mobile.vercel.app/)**

### 🌐 Companion Web App
Looking for the staff/medical control center? 
👉 **[CareVenue Admin Dashboard Repository](https://github.com/Udit-prasad/carevenue-admin)**

---

## 🔥 Core Capabilities & Integrations

* **QR Emergency Medical Profile:** Instantly generate an offline, readable QR code summarizing your critical medical profile including blood group, allergies, and conditions.
* **Instant SOS Emergency Alert System:** Triggers an active alert syncing directly via Firebase Firestore to notify stadium responders to dispatch directly to your seat block.
* **Medicine Reminder Engine:** Smart integration to keep track of stadium attendee health during prolonged wait periods.
* **CareVenue AI Buddy:** Integrated tightly with **Groq (Llama-3)** for lightning-fast, ultra-low-latency clinical triaging and real-time medical advice spanning broad problem edge cases.
* **Smart Venue Health Map:** Utilizes embedded Google Maps to track your physical stadium or venue, giving you quick awareness of medical tents and exits, ensuring high accessibility for disabled users.

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
