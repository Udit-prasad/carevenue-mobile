import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';

export const HomeScreen = ({ navigation }: any) => {
  const { userProfile, seatInfo } = useAppStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.greeting}>Hi, {userProfile?.name.split(' ')[0]}</Text>
        <Text variant="bodyLarge" style={styles.timeText}>{userProfile?.venue}</Text>
      </View>
      <Text variant="bodyMedium" style={styles.seatInfo}>
        <MaterialCommunityIcons name="seat" size={16} color="#A0A0B0" /> {seatInfo?.seatNumber}
      </Text>

      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Alert')}>
        <Surface style={styles.emergencyBanner} elevation={4}>
          <MaterialCommunityIcons name="alert-plus" size={28} color="#FFF" />
          <View style={styles.bannerTextContainer}>
            <Text variant="titleMedium" style={styles.bannerTitle}>Need Help Now?</Text>
            <Text variant="bodyMedium" style={styles.bannerSub}>Tap to open emergency alert</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#FFF" />
        </Surface>
      </TouchableOpacity>

      <Text variant="titleLarge" style={styles.sectionTitle}>Smart Assistance</Text>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('AIAssist')}>
        <Surface style={styles.aiBanner} elevation={2}>
          <View style={styles.aiIconBox}>
            <MaterialCommunityIcons name="robot" size={32} color="#FFFFFF" />
          </View>
          <View style={styles.bannerTextContainer}>
            <Text variant="titleMedium" style={styles.aiTitle}>CareVenueAI Buddy</Text>
            <Text variant="bodyMedium" style={styles.aiSub}>Ask for medication or symptom advice</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#1B5E20" />
        </Surface>
      </TouchableOpacity>

      <Text variant="titleLarge" style={[styles.sectionTitle, { marginTop: 20 }]}>Quick Actions</Text>
      <View style={styles.grid}>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Map')}>
          <MaterialCommunityIcons name="map-search-outline" size={32} color="#2E7D32" />
          <Text style={styles.gridItemText}>Venue Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('QR')}>
          <MaterialCommunityIcons name="qrcode-scan" size={32} color="#2E7D32" />
          <Text style={styles.gridItemText}>Medical ID</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  greeting: { fontWeight: 'bold', color: '#1B5E20' },
  timeText: { color: '#2E7D32', fontWeight: '600' },
  seatInfo: { color: '#4CAF50', marginTop: 4, marginBottom: 24 },
  emergencyBanner: { flexDirection: 'row', backgroundColor: '#E94560', padding: 16, borderRadius: 16, alignItems: 'center', marginBottom: 24 },
  bannerTextContainer: { flex: 1, marginLeft: 16 },
  bannerTitle: { color: '#FFFFFF', fontWeight: 'bold' },
  bannerSub: { color: 'rgba(255,255,255,0.8)' },
  sectionTitle: { color: '#1B5E20', fontWeight: 'bold', marginBottom: 12 },
  aiBanner: { flexDirection: 'row', backgroundColor: '#E8F5E9', padding: 16, borderRadius: 16, alignItems: 'center', marginBottom: 8 },
  aiIconBox: { backgroundColor: '#2E7D32', padding: 10, borderRadius: 12 },
  aiTitle: { color: '#1B5E20', fontWeight: 'bold', fontSize: 16 },
  aiSub: { color: '#4CAF50' },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  gridItem: { backgroundColor: '#E8F5E9', borderRadius: 12, padding: 20, width: '48%', alignItems: 'center' },
  gridItemText: { color: '#1B5E20', marginTop: 12, fontWeight: '600' }
});
