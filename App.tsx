import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { RootNavigator } from './src/navigation/RootNavigator';

// Custom CareVenue Light Green Theme
const careVenueTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2E7D32', // Primary Green
    error: '#E94560', // Emergency Red
    background: '#FFFFFF', // Pure White
    surface: '#E8F5E9', // Light Green Card Surface
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={careVenueTheme}>
        <NavigationContainer>
          <StatusBar style="light" />
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
