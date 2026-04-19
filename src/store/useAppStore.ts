import { create } from 'zustand';
import { db } from '../services/firebaseClient';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { UserProfile, EmergencyAlert, SeatInfo } from '../types';

interface AppState {
  userProfile: UserProfile | null;
  seatInfo: SeatInfo | null;
  activeAlert: EmergencyAlert | null;
  isInitialized: boolean;
  
  triggerEmergency: () => Promise<void>;
  resolveEmergency: () => void;
  loadUserProfile: (uid: string) => Promise<void>;
  clearUser: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  userProfile: null,
  seatInfo: null,
  activeAlert: null,
  isInitialized: false,

  loadUserProfile: async (uid) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        set({
          userProfile: {
            id: data.id,
            name: data.name,
            age: 0,
            bloodGroup: data.bloodGroup,
            conditions: data.conditions,
            allergies: data.allergies,
            venue: data.venue || 'Unknown Stadium',
            emergencyContact: { name: 'Emergency Services', phone: '911' }
          },
          seatInfo: { block: data.seatNumber.split(',')[0], seatNumber: data.seatNumber },
          isInitialized: true
        });
      } else {
        set({ userProfile: null, isInitialized: true });
      }
    } catch (error) {
      set({ isInitialized: true });
    }
  },

  clearUser: () => set({ userProfile: null, seatInfo: null, isInitialized: false }),

  triggerEmergency: async () => {
    set({ activeAlert: { id: `alert-${Date.now()}`, status: 'pending', eta: 5 } });
    try {
      const state = get();
      let conditionString = `Emergency Request @ ${state.userProfile?.venue}`;
      if (state.userProfile?.conditions) conditionString += ` | History: ${state.userProfile.conditions.join(', ')}`;
      if (state.userProfile?.allergies) conditionString += ` | Allergies: ${state.userProfile.allergies.join(', ')}`;

      await addDoc(collection(db, 'emergencies'), {
        name: state.userProfile?.name || 'Unknown User',
        seat: `${state.seatInfo?.seatNumber || 'Unassigned Seat'}`,
        condition: conditionString,
        time: serverTimestamp(),
        status: 'active'
      });
    } catch {}
  },

  resolveEmergency: () => set({ activeAlert: null }),
}));
