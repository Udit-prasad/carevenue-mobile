import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

import { HomeScreen } from '../screens/HomeScreen';
import { EmergencyScreen } from '../screens/EmergencyScreen';
import { QRCardScreen } from '../screens/QRCardScreen';
import { VenueMapScreen } from '../screens/PlaceholderScreens';
import { AIAssistantScreen } from '../screens/AIAssistantScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';

import { auth } from '../services/firebaseClient';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppStore } from '../store/useAppStore';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2E7D32', // Requested Global Green Brand Header
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#FFFFFF',
        headerTitle: "CareVenueAI", // App Name globally defined
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: '900',
          fontSize: 22,
          fontFamily: 'Inter',
          letterSpacing: -0.5,
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E8F5E9',
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#A5D6A7',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size + 4} />
          ),
          title: 'Dashboard'
        }}
      />
      <Tab.Screen 
        name="Map" 
        component={VenueMapScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map-marker" color={color} size={size + 4} />
          ),
        }}
      />
      <Tab.Screen 
        name="Alert" 
        component={EmergencyScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell-alert" color={color} size={size + 4} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="QR" 
        component={QRCardScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode" color={color} size={size + 4} />
          ),
          title: 'Medical ID'
        }}
      />
      <Tab.Screen 
        name="AIAssist" 
        component={AIAssistantScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="robot" color={color} size={size + 4} />
          ),
          title: 'AI Triage'
        }}
      />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const { userProfile, loadUserProfile, isInitialized } = useAppStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        await loadUserProfile(user.uid);
      } else {
        setUserId(null);
      }
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing || (userId && !isInitialized)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8F5E9' }}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!userId ? (
        <Stack.Screen name="Auth" component={AuthScreen} />
      ) : !userProfile ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <Stack.Screen name="Main" component={MainTabs} />
      )}
    </Stack.Navigator>
  );
};
