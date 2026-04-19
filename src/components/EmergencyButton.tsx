import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Text, Surface, TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface EmergencyButtonProps {
  onConfirm: () => void;
}

export const EmergencyButton: React.FC<EmergencyButtonProps> = ({ onConfirm }) => {
  const [holding, setHolding] = useState(false);
  const fillAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // 3 second hold down
  const holdDuration = 3000;

  const handlePressIn = () => {
    setHolding(true);
    // Start pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ])
    ).start();

    // Start fill animation
    Animated.timing(fillAnim, {
      toValue: 1,
      duration: holdDuration,
      useNativeDriver: false, // width/height interpolation doesn't support native driver well without scale, but let's use a scale transform instead!
    }).start(({ finished }) => {
      if (finished) {
        onConfirm();
      }
    });
  };

  const handlePressOut = () => {
    setHolding(false);
    fillAnim.stopAnimation();
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
    
    // Reset fill
    Animated.timing(fillAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }] }]} />
      
      <TouchableRipple
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
        borderless
        rippleColor="rgba(255,255,255,0.3)"
      >
        <Surface style={styles.buttonSurface} elevation={5}>
          {/* Fill overlay representation */}
          <Animated.View 
            style={[
              styles.fillOverlay,
              {
                height: fillAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%']
                })
              }
            ]} 
          />
          <View style={styles.content}>
            <MaterialCommunityIcons name="alert-decagram" size={64} color="white" />
            <Text style={styles.buttonText}>HOLD TO CONFIRM</Text>
            {holding && <Text style={styles.holdingText}>Keep holding...</Text>}
          </View>
        </Surface>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  pulseCircle: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(233, 69, 96, 0.2)', // Emergency Red alpha
  },
  touchable: {
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: 'hidden',
  },
  buttonSurface: {
    width: '100%',
    height: '100%',
    borderRadius: 110,
    backgroundColor: '#E94560', // Emergency Red
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fillOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#C81D3E', // Darker Red for filling
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 10,
    letterSpacing: 1,
  },
  holdingText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 5,
  }
});
