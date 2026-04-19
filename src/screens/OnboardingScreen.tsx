import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { db, auth } from '../services/firebaseClient';
import { doc, setDoc } from 'firebase/firestore';
import { useAppStore } from '../store/useAppStore';

export const OnboardingScreen = () => {
  const [fullName, setFullName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [conditions, setConditions] = useState('');
  const [allergies, setAllergies] = useState('');
  const [seat, setSeat] = useState('');
  const [venue, setVenue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveProfile = async () => {
    if (!fullName || !bloodGroup) {
      Alert.alert("Missing Details", "Full Name and Blood Group are required.");
      return;
    }

    setLoading(true);
    const userId = auth.currentUser?.uid;
    
    if (!userId) {
      Alert.alert("Error", "You are not authenticated.");
      setLoading(false);
      return;
    }

    try {
      await setDoc(doc(db, 'users', userId), {
        id: userId,
        name: fullName,
        bloodGroup: bloodGroup.toUpperCase(),
        conditions: conditions.split(',').map(item => item.trim()).filter(Boolean),
        allergies: allergies.split(',').map(item => item.trim()).filter(Boolean),
        seatNumber: seat || 'Unassigned',
        venue: venue || 'Unknown Stadium',
      });
      const { loadUserProfile } = useAppStore.getState();
      await loadUserProfile(userId);
    } catch (error: any) {
      Alert.alert("Cloud Engine Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="clipboard-check-outline" size={48} color="#2E7D32" />
          <Text style={styles.title}>Medical Intake</Text>
          <Text style={styles.subtitle}>Emergency responders rely on this data. Please be accurate.</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput style={styles.input} placeholder="John Doe" value={fullName} onChangeText={setFullName} />

          <Text style={styles.label}>Blood Group *</Text>
          <TextInput style={styles.input} placeholder="O+, A-, AB+ etc." autoCapitalize="characters" maxLength={3} value={bloodGroup} onChangeText={setBloodGroup} />

          <Text style={styles.label}>Venue / Stadium Name *</Text>
          <TextInput style={styles.input} placeholder="Wembley Stadium" value={venue} onChangeText={setVenue} />

          <Text style={styles.label}>Seat Assignment</Text>
          <TextInput style={styles.input} placeholder="Block A, Row 12, Seat 4" value={seat} onChangeText={setSeat} />

          <Text style={styles.label}>Primary Medical Conditions</Text>
          <TextInput style={[styles.input, styles.textArea]} placeholder="Asthma, Diabetes... (comma separated)" multiline numberOfLines={2} value={conditions} onChangeText={setConditions} />

          <Text style={styles.label}>Allergies</Text>
          <TextInput style={[styles.input, styles.textArea]} placeholder="Penicillin, Peanuts... (comma separated)" multiline numberOfLines={2} value={allergies} onChangeText={setAllergies} />

          <TouchableOpacity style={styles.button} onPress={handleSaveProfile} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Generate QR Profile & Enter</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { padding: 30, paddingTop: 60, paddingBottom: 60 },
  header: { marginBottom: 40 },
  title: { fontSize: 32, color: '#1B5E20', fontWeight: '800', marginTop: 15 },
  subtitle: { fontSize: 13, color: '#4CAF50', fontWeight: '600', marginTop: 5 },
  formContainer: { gap: 15 },
  label: { color: '#2E7D32', fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase', marginBottom: -8, marginLeft: 5 },
  input: { backgroundColor: '#E8F5E9', padding: 18, borderRadius: 16, fontSize: 16, color: '#1B5E20', fontWeight: '600', borderWidth: 1, borderColor: '#C8E6C9' },
  textArea: { height: 80, paddingTop: 18, textAlignVertical: 'top' },
  button: { backgroundColor: '#2E7D32', padding: 22, borderRadius: 16, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});
