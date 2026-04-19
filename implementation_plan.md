# Complete Authentication & Onboarding Architecture Plan

The objective is to lock the CareVenue App behind a Firebase Email Authentication wall, collect medical data via a form upon sign-up, and replace the mock data across the entire app with a live Firebase connection. We will also add the requested "CareVenueAI" Global Green Header.

## Proposed Code Structure

### 1. Navigation Flow Restructuring
We will completely overhaul `RootNavigator.tsx` to use a declarative Stack structure:
- **State 1:** No User -> Renders `AuthScreen` (Login / Sign Up)
- **State 2:** User logged in, but no Medical Profile -> Renders `OnboardingScreen` (Form)
- **State 3:** User logged in AND Profile exists -> Renders the Main Tab Dashboard

### 2. Global UI Overhaul
- **Global Header Bar:** The `RootNavigator` headers will be changed to the Primary Green (`#2E7D32`) with white text, globally branding the top of the phone with "CareVenueAI".
- **Auth UI:** A beautiful white/green minimalist aesthetic matching the main app, with Email and Password validation.

### 3. Screen Additions ([NEW])
#### `src/screens/AuthScreen.tsx`
- Handles both Login and Signup toggling. Uses `firebase/auth` `createUserWithEmailAndPassword`.

#### `src/screens/OnboardingScreen.tsx`
- A focused form to collect `Blood Group`, `Primary Conditions` (comma separated), and `Allergies` (comma separated).
- Saves this data as a Document to Firebase `users/{uid}`.

### 4. Integration with Store ([MODIFIED])
#### `src/store/useAppStore.ts`
- Remove all `mockProfile` instances. 
- Implement a `loadUserProfile(uid)` action that fetches the user's data from Firestore and feeds it automatically to the QR Code screen and Emergency Trigger function.

## Verification
1. I will write the screen logic.
2. We will test running the Expo app. It should block you at the Login screen.
3. You will sign up with a test email, fill out the medical form, and land on the Home dashboard.
4. Tapping the QR Code screen will correctly show the data you just typed in!

Do you approve this architecture? If so, I will build it immediately!
