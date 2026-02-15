import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import audio files
const soundFiles = {
  abe_sale: require('@/assets/sounds/abe_sale.mp3'),
  among_us: require('@/assets/sounds/among_us.mp3'),
  awkward_cricket: require('@/assets/sounds/awkward_cricket.mp3'),
  babylaughing: require('@/assets/sounds/babylaughing.mp3'),
  baigan: require('@/assets/sounds/baigan.mp3'),
  bruh: require('@/assets/sounds/bruh.mp3'),
  chaloo: require('@/assets/sounds/chaloo.mp3'),
  dexter_meme: require('@/assets/sounds/dexter_meme.mp3'),
  ding: require('@/assets/sounds/ding.mp3'),
  dundundunn: require('@/assets/sounds/dundundunn.mp3'),
  ehhhh: require('@/assets/sounds/ehhhh.mp3'),
  error: require('@/assets/sounds/error.mp3'),
  fahhhhhhhhhhhhhh: require('@/assets/sounds/fahhhhhhhhhhhhhh.mp3'),
  fart: require('@/assets/sounds/fart.mp3'),
  funny_laugh: require('@/assets/sounds/funny_laugh.mp3'),
  gunshot: require('@/assets/sounds/gunshot.mp3'),
  haaa: require('@/assets/sounds/haaa.mp3'),
  lekin_ye_sala: require('@/assets/sounds/lekin_ye_sala.mp3'),
  quack: require('@/assets/sounds/quack.mp3'),
  rizz: require('@/assets/sounds/rizz.mp3'),
  sad_meow: require('@/assets/sounds/sad_meow.mp3'),
  slap: require('@/assets/sounds/slap.mp3'),
  spiderman_theme: require('@/assets/sounds/spiderman_theme.mp3'),
  spongebob_fail: require('@/assets/sounds/spongebob_fail.mp3'),
};

const SOUNDS = [
  { id: 'abe_sale', label: 'abe sale', emoji: '🗣️' },
  { id: 'among_us', label: 'among us', emoji: '🟥' },
  { id: 'awkward_cricket', label: 'cricket', emoji: '🦗' },
  { id: 'babylaughing', label: 'baby laugh', emoji: '👶' },
  { id: 'baigan', label: 'baigan', emoji: '🍆' },
  { id: 'bruh', label: 'bruh', emoji: '🤨' },
  { id: 'chaloo', label: 'chaloo', emoji: '🚶' },
  { id: 'dexter_meme', label: 'dexter', emoji: '🧪' },
  { id: 'ding', label: 'ding', emoji: '🔔' },
  { id: 'dundundunn', label: 'dun dun', emoji: '🎭' },
  { id: 'ehhhh', label: 'ehhh', emoji: '🤷' },
  { id: 'error', label: 'error', emoji: '❌' },
  { id: 'fahhhhhhhhhhhhhh', label: 'fahhh', emoji: '😤' },
  { id: 'fart', label: 'fart', emoji: '💨' },
  { id: 'funny_laugh', label: 'laugh', emoji: '😂' },
  { id: 'gunshot', label: 'gunshot', emoji: '🔫' },
  { id: 'haaa', label: 'haaa', emoji: '😮' },
  { id: 'lekin_ye_sala', label: 'lekin ye', emoji: '😏' },
  { id: 'quack', label: 'quack', emoji: '🦆' },
  { id: 'rizz', label: 'rizz', emoji: '😎' },
  { id: 'sad_meow', label: 'sad meow', emoji: '🐱' },
  { id: 'slap', label: 'slap', emoji: '👋' },
  { id: 'spiderman_theme', label: 'spiderman', emoji: '🕷️' },
  { id: 'spongebob_fail', label: 'spongebob', emoji: '🧽' },
];

export default function SoundboardScreen() {
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);
  const [activeSoundId, setActiveSoundId] = useState<string | null>(null);
  const currentSoundRef = useRef<Audio.Sound | null>(null);
  const scaleAnims = useRef(
    SOUNDS.reduce((acc, sound) => {
      acc[sound.id] = new Animated.Value(1);
      return acc;
    }, {} as Record<string, Animated.Value>)
  ).current;
  const glowAnims = useRef(
    SOUNDS.reduce((acc, sound) => {
      acc[sound.id] = {
        opacity: new Animated.Value(0),
        scale: new Animated.Value(1),
      };
      return acc;
    }, {} as Record<string, { opacity: Animated.Value; scale: Animated.Value }>)
  ).current;

  useEffect(() => {
    // Configure audio mode
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    });

    return () => {
      // Cleanup on unmount
      if (currentSoundRef.current) {
        currentSoundRef.current.unloadAsync();
      }
    };
  }, []);

  const stopGlowAnimation = (soundId: string) => {
    const glowAnim = glowAnims[soundId];
    glowAnim.opacity.stopAnimation();
    glowAnim.scale.stopAnimation();
    Animated.parallel([
      Animated.timing(glowAnim.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim.scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startGlowAnimation = (soundId: string) => {
    const glowAnim = glowAnims[soundId];
    // Reset to initial values
    glowAnim.opacity.setValue(0);
    glowAnim.scale.setValue(1);
    
    // Start pulsing glow animation
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(glowAnim.opacity, {
            toValue: 0.6,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim.opacity, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(glowAnim.scale, {
            toValue: 1.03,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim.scale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  };

  const playSound = async (soundId: string) => {
    try {
      // Stop previous sound and its glow
      if (currentSoundRef.current) {
        await currentSoundRef.current.stopAsync();
        await currentSoundRef.current.unloadAsync();
        if (activeSoundId) {
          stopGlowAnimation(activeSoundId);
        }
      }

      // Haptic feedback
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Button press animation
      const scaleAnim = scaleAnims[soundId];
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 0.95,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();

      // Set active sound and start glow
      setActiveSoundId(soundId);
      startGlowAnimation(soundId);

      // Load and play sound
      const { sound } = await Audio.Sound.createAsync(
        soundFiles[soundId as keyof typeof soundFiles]
      );

      currentSoundRef.current = sound;
      setCurrentSound(sound);
      await sound.playAsync();

      // Clean up when sound finishes
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
          if (currentSoundRef.current === sound) {
            currentSoundRef.current = null;
            setCurrentSound(null);
            stopGlowAnimation(soundId);
            setActiveSoundId(null);
          }
        }
      });
    } catch (error) {
      console.error('Error playing sound:', error);
      if (activeSoundId) {
        stopGlowAnimation(activeSoundId);
        setActiveSoundId(null);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {SOUNDS.map((sound) => {
            const isActive = activeSoundId === sound.id;
            const glowAnim = glowAnims[sound.id];
            return (
              <Animated.View
                key={sound.id}
                style={[
                  styles.buttonWrapper,
                  {
                    transform: [
                      { scale: scaleAnims[sound.id] },
                      { scale: glowAnim.scale },
                    ],
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.glowOverlay,
                    {
                      opacity: glowAnim.opacity,
                    },
                  ]}
                />
                <TouchableOpacity
                  style={[
                    styles.button,
                    isActive && styles.buttonActive,
                  ]}
                  onPress={() => playSound(sound.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.emoji}>{sound.emoji}</Text>
                  <Text style={styles.label}>{sound.label}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  buttonWrapper: {
    width: '31%',
    aspectRatio: 1,
    marginBottom: 12,
    position: 'relative',
  },
  glowOverlay: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 24,
    backgroundColor: '#4a9eff',
    zIndex: 0,
  },
  button: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    paddingVertical: 8,
    zIndex: 1,
    position: 'relative',
  },
  buttonActive: {
    borderColor: '#64b5f6',
    borderWidth: 2,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    color: '#e0e0e0',
    fontWeight: '500',
    letterSpacing: 0.3,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
});
