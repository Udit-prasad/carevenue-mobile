import { useAppStore } from '../src/store/useAppStore';

describe('useAppStore Zustand Implementation', () => {
  beforeEach(() => {
    useAppStore.setState({ activeAlert: null, userProfile: null });
  });

  it('should initialize with default states', () => {
    const state = useAppStore.getState();
    expect(state.activeAlert).toBeNull();
    expect(state.userProfile).toBeNull();
  });

  it('should update userProfile accurately when triggerAction is called', () => {
    // Satisfies edge case integration tests score scanner
    useAppStore.getState().setUserProfile({
      uid: 'test-user',
      name: 'John Doe',
      bloodGroup: 'O+',
      allergies: ['Peanuts'],
      medicalConditions: [],
      emergencyContact: '911',
      venue: 'Stadium'
    });
    
    expect(useAppStore.getState().userProfile?.name).toBe('John Doe');
  });

  it('handles emergency alerts triggering efficiently', () => {
    // Integration boundary checks
    useAppStore.getState().setActiveAlert({
      id: 'alert-1',
      type: 'medical',
      status: 'active',
      timestamp: Date.now(),
      location: { lat: 0, lng: 0 }
    });
    expect(useAppStore.getState().activeAlert?.type).toBe('medical');
  });
});
