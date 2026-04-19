import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EmergencyButton } from '../components/EmergencyButton';
import { useAppStore } from '../store/useAppStore';

export const EmergencyScreen = ({ navigation }: any) => {
  const { activeAlert, triggerEmergency, resolveEmergency, seatInfo } = useAppStore();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    if (activeAlert) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [activeAlert]);

  const handleConfirm = () => {
    triggerEmergency();
  };

  if (activeAlert) {
    return (
      <View style={[styles.container, styles.alertActiveContainer]}>
        <Animated.View style={[styles.activeAlertInner, { opacity: fadeAnim }]}>
          <MaterialCommunityIcons name="shield-check" size={80} color="#FFFFFF" />
          <Text variant="headlineMedium" style={styles.activeTitle}>Alert Sent</Text>
          <Text variant="bodyLarge" style={styles.activeSub}>Help is on the way to your location.</Text>
          
          <Surface style={styles.etaSurface} elevation={4}>
            <Text variant="titleMedium" style={styles.etaTitle}>Estimated Arrival</Text>
            <Text variant="displayMedium" style={styles.etaTime}>{activeAlert.eta} min</Text>
            <Text variant="bodyMedium" style={styles.etaLocation}>Block {seatInfo?.block} • {seatInfo?.seatNumber}</Text>
          </Surface>

          <View style={styles.responderBox}>
            <MaterialCommunityIcons name="account-hard-hat" size={24} color="#FFFFFF" />
            <Text style={styles.responderText}>Responder: Dispatching nearest unit...</Text>
          </View>

          <Button 
            mode="outlined" 
            textColor="#FFFFFF" 
            style={styles.cancelButton}
            onPress={() => {
              resolveEmergency();
              navigation.goBack();
            }}
          >
            Cancel Alert (Demo)
          </Button>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="close" size={32} color="#1B5E20" />
        </TouchableOpacity>
        <Text variant="titleLarge" style={styles.headerTitle}>Emergency Assistant</Text>
      </View>

      <View style={styles.content}>
        <EmergencyButton onConfirm={handleConfirm} />
        
        <Surface style={styles.infoSurface} elevation={2}>
          <MaterialCommunityIcons name="information" size={20} color="#A0A0B0" />
          <Text style={styles.infoText}>
            This will immediately alert the venue medical staff with your exact location and medical profile.
          </Text>
        </Surface>
      </View>
    </View>
  );
};

// Re-import TouchableOpacity down here as it was missing from the top import block in this file iteration
import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  alertActiveContainer: {
    backgroundColor: '#E94560',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  activeAlertInner: {
    alignItems: 'center',
    width: '100%',
  },
  activeTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    marginTop: 16,
    letterSpacing: 2,
  },
  activeSub: {
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 40,
  },
  etaSurface: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '100%',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  etaTitle: {
    color: '#FFFFFF',
    opacity: 0.8,
  },
  etaTime: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  etaLocation: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  responderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 40,
  },
  responderText: {
    color: '#FFFFFF',
    marginLeft: 12,
    flex: 1,
    fontWeight: '500',
  },
  cancelButton: {
    borderColor: '#FFFFFF',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50, // SafeArea substitute for bare layout
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  closeButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: '#1B5E20',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  infoSurface: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'flex-start',
    marginTop: 40,
  },
  infoText: {
    color: '#4CAF50',
    flex: 1,
    marginLeft: 12,
    lineHeight: 20,
  }
});
