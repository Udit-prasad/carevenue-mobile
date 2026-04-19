import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';

// Safe require for webview so it doesn't crash the entire app if gracefully omitted.
let WebView: any = null;
try {
  WebView = require('react-native-webview').default || require('react-native-webview').WebView;
} catch (e) {}

export const VenueMapScreen = () => {
  const { userProfile, seatInfo } = useAppStore();
  
  const venueQuery = encodeURIComponent(userProfile?.venue || 'Stadium');

  const openNativeMaps = () => {
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${venueQuery}`);
  };

  const mapHtml = `
    <html>
      <head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /></head>
      <body style="margin:0;padding:0;">
        <iframe
          width="100%"
          height="100%"
          style="border:0"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="https://maps.google.com/maps?q=${venueQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed">
        </iframe>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <Surface style={styles.headerCard} elevation={2}>
        <View style={styles.iconRow}>
          <MaterialCommunityIcons name="stadium-variant" size={40} color="#2E7D32" />
        </View>
        <Text variant="headlineSmall" style={styles.title}>{userProfile?.venue || 'Unknown Venue'}</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>Block {seatInfo?.block} • Seat {seatInfo?.seatNumber}</Text>
        <Text variant="bodyMedium" style={styles.details}>First-Aid and Emergency Stations marked on the active facility map below.</Text>
      </Surface>

      <View style={styles.mapContainer}>
        {WebView ? (
          <WebView 
            source={{ html: mapHtml }} 
            style={{ flex: 1 }} 
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        ) : (
          <View style={styles.fallbackContainer}>
            <MaterialCommunityIcons name="google-maps" size={60} color="#2E7D32" />
            <Text style={styles.fallbackText}>Please install React Native Webview to see embedded maps natively, OR click below:</Text>
            <Button mode="contained" buttonColor="#2E7D32" onPress={openNativeMaps}>Open Google Maps Native Form</Button>
          </View>
        )}
      </View>
    </View>
  );
};

export const ProfileScreen = () => <View />;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerCard: { backgroundColor: '#E8F5E9', margin: 16, padding: 20, borderRadius: 16, alignItems: 'center' },
  iconRow: { backgroundColor: '#C8E6C9', padding: 12, borderRadius: 30, marginBottom: 12 },
  title: { color: '#1B5E20', fontWeight: 'bold' },
  subtitle: { color: '#2E7D32', marginTop: 4, fontWeight: '600' },
  details: { color: '#4CAF50', textAlign: 'center', marginTop: 12 },
  mapContainer: { flex: 1, overflow: 'hidden', borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: '#F0F0F0' },
  fallbackContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  fallbackText: { textAlign: 'center', color: '#1B5E20', marginVertical: 20, fontSize: 16 }
});
