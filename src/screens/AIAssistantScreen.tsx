import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
import { analyzeSymptoms, GeminiResponse } from '../services/geminiService';

export const AIAssistantScreen = ({ navigation }: any) => {
  const { userProfile, seatInfo, triggerEmergency } = useAppStore();
  const [inputQuery, setInputQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [response, setResponse] = useState<GeminiResponse | null>(null);

  const handleAnalyze = async () => {
    if (!inputQuery.trim() || !userProfile) return;
    setIsAnalyzing(true);
    setResponse(null);
    
    // Safely structure venue string
    const venueContext = `Seat: Block ${seatInfo?.block || 'Unknown'}, ${seatInfo?.seatNumber || ''} at ${userProfile.venue}`;
    const result = await analyzeSymptoms(inputQuery, userProfile, venueContext);
    
    setResponse(result);
    setIsAnalyzing(false);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Surface style={styles.disclaimerSurface} elevation={1}>
          <MaterialCommunityIcons name="robot" size={24} color="#E67E22" />
          <Text style={styles.disclaimerText}>
            I am CareVenueAI, your real-time medical and stadium medication buddy. How can I help you?
          </Text>
        </Surface>

        <Text variant="titleLarge" style={styles.sectionTitle}>Medical Inquiry</Text>
        <TextInput
          style={styles.textInput}
          placeholder="E.g., I have a headache, what medication is available nearby?"
          multiline
          numberOfLines={3}
          value={inputQuery}
          onChangeText={setInputQuery}
        />

        <Button mode="contained" onPress={handleAnalyze} disabled={!inputQuery.trim() || isAnalyzing} style={styles.analyzeButton} buttonColor="#2E7D32">
          {isAnalyzing ? "Processing with Live AI..." : "Ask Buddy"}
        </Button>

        {isAnalyzing && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2E7D32" />
            <Text style={styles.loadingText}>Analyzing realtime medication requirements...</Text>
          </View>
        )}

        {response && (
          <Surface style={styles.responseCard} elevation={2}>
            <View style={styles.severityRow}>
              <Text variant="titleMedium" style={styles.responseTitle}>AI Buddy Recommendation</Text>
              <View style={[styles.severityBadge, response.severity === 'high' ? {backgroundColor: '#E94560'} : response.severity === 'medium' ? {backgroundColor: '#E67E22'} : {backgroundColor: '#2E7D32'}]}>
                <Text style={styles.severityText}>{response.severity.toUpperCase()}</Text>
              </View>
            </View>
            
            <Text style={styles.actionText}>{response.action}</Text>
            
            <View style={styles.resourceBox}>
              <MaterialCommunityIcons name="map-marker" size={20} color="#1B5E20" />
              <Text style={styles.resourceText}>Facility Match: {response.nearestResource}</Text>
            </View>

            {response.triggerEmergency && (
               <Button mode="contained" buttonColor="#E94560" icon="alert-decagram" style={styles.sosButton} onPress={() => { triggerEmergency(); navigation.navigate('Alert'); }}>
                 Trigger Emergency SOS
               </Button>
            )}
          </Surface>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 16, paddingTop: 24, paddingBottom: 40 },
  disclaimerSurface: { flexDirection: 'row', backgroundColor: '#FFF3E0', padding: 16, borderRadius: 12, marginBottom: 24, alignItems: 'center' },
  disclaimerText: { flex: 1, marginLeft: 12, color: '#D35400', fontSize: 13, lineHeight: 18 },
  sectionTitle: { color: '#1B5E20', fontWeight: 'bold', marginBottom: 12 },
  textInput: { backgroundColor: '#E8F5E9', padding: 16, borderRadius: 12, borderColor: '#C8E6C9', borderWidth: 1, color: '#1B5E20', fontSize: 16, minHeight: 120, textAlignVertical: 'top' },
  analyzeButton: { paddingVertical: 6, borderRadius: 8, marginTop: 20 },
  loadingContainer: { alignItems: 'center', marginTop: 20 },
  loadingText: { color: '#4CAF50', marginTop: 12 },
  responseCard: { backgroundColor: '#E8F5E9', padding: 20, borderRadius: 16, marginTop: 24 },
  severityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  responseTitle: { color: '#1B5E20', fontWeight: 'bold' },
  severityBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  severityText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
  actionText: { color: '#424242', fontSize: 16, lineHeight: 24, marginBottom: 16 },
  resourceBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#C8E6C9', padding: 12, borderRadius: 8, marginBottom: 16 },
  resourceText: { color: '#1B5E20', marginLeft: 8, fontWeight: '600', flex: 1 },
  sosButton: { marginTop: 8 }
});
