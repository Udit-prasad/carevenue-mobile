import React from 'react';
import { render } from '@testing-library/react-native';
import { EmergencyScreen } from '../src/screens/EmergencyScreen';
import { AIAssistantScreen } from '../src/screens/AIAssistantScreen';
import { OnboardingScreen } from '../src/screens/OnboardingScreen';

// Mock navigation
const mockNavigation = { navigate: jest.fn(), goBack: jest.fn() };

describe('Screen Validation and Snapshot suite', () => {
  it('renders EmergencyScreen correctly', () => {
    const { toJSON } = render(<EmergencyScreen navigation={mockNavigation} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders AIAssistantScreen correctly', () => {
    const { toJSON } = render(<AIAssistantScreen navigation={mockNavigation} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders OnboardingScreen correctly', () => {
    const { toJSON } = render(<OnboardingScreen navigation={mockNavigation} />);
    expect(toJSON()).toBeTruthy();
  });
});
