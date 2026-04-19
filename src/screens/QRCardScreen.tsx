import React from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Text, Surface, Divider } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';

export const QRCardScreen = () => {
  const { userProfile } = useAppStore();

  if (!userProfile) return null;

  // Real medical payload converted into string so any phone scanner instantly shows the text
  const qrPayload = `CAREVENUE MEDICAL PROFILE\nName: ${userProfile.name}\nBlood Group: ${userProfile.bloodGroup}\nConditions: ${(userProfile.conditions || []).join(', ')}\nAllergies: ${(userProfile.allergies || []).join(', ')}`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Surface style={styles.card} elevation={4}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="hospital-box" size={32} color="#1B5E20" />
          <Text variant="titleLarge" style={styles.title}>Emergency Medical Profile</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.qrContainer}>
          <View style={styles.qrBg}>
            <QRCode value={qrPayload} size={220} color="#1A1A2E" backgroundColor="#FFFFFF" />
          </View>
          <Text style={styles.scanText}>Scan for explicit medical payload</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Name</Text><Text style={styles.infoValue}>{userProfile.name}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Blood Group</Text><Text style={[styles.infoValue, styles.bloodGroup]}>{userProfile.bloodGroup}</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Venue</Text><Text style={styles.infoValue}>{userProfile.venue}</Text></View>
        </View>
      </Surface>
      <Text style={styles.disclaimer}>QR Payload is readable offline by any device camera.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 20, alignItems: 'center', paddingTop: 40 },
  card: { backgroundColor: '#E8F5E9', width: '100%', borderRadius: 20, padding: 24, alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  title: { color: '#1B5E20', fontWeight: 'bold', marginLeft: 12 },
  divider: { width: '100%', backgroundColor: '#C8E6C9', marginBottom: 24 },
  qrContainer: { alignItems: 'center', marginBottom: 32 },
  qrBg: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16, elevation: 4 },
  scanText: { marginTop: 16, color: '#2E7D32', fontWeight: '500' },
  infoSection: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#DEE4EE' },
  infoLabel: { color: '#4CAF50', fontSize: 14 },
  infoValue: { color: '#1B5E20', fontWeight: 'bold', fontSize: 14 },
  bloodGroup: { color: '#E94560' },
  disclaimer: { color: '#4CAF50', textAlign: 'center', marginTop: 24, fontSize: 12, paddingHorizontal: 20 }
});
