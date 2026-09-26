import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '@/constants/theme';
import { BrandLogo } from '@/components/common/BrandLogo';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={() => router.replace('/welcome')}
      >
        {/* Ambient Top Subtle Medical Accents */}
        <View style={styles.ambientTop}>
          <Text style={styles.ambientPlus}>＋</Text>
        </View>

        {/* Center Hero Branding */}
        <View style={styles.heroCenter}>
          {/* Logo container with outer glow */}
          <View style={styles.logoOuterGlow}>
            <View style={styles.logoCard}>
              <BrandLogo size={68} />
            </View>
          </View>

          {/* App Title */}
          <Text style={styles.appTitle}>Lifelink</Text>

          {/* Subtitle Pill */}
          <View style={styles.pillBadge}>
            <View style={styles.pulseDot} />
            <Text style={styles.pillText}>Save lives, spread smiles</Text>
          </View>

          {/* Mission Tagline */}
          <Text style={styles.missionText}>
            Immediate life-saving blood mobilization & donor dispatch system
          </Text>
        </View>

        {/* Bottom Loading / ECG Heartbeat & Protocol */}
        <View style={styles.footerSection}>
          {/* Heartbeat ECG Line */}
          <View style={styles.ecgContainer}>
            <Svg width={100} height={24} viewBox="0 0 100 24" fill="none">
              <Path
                d="M0 12H30L36 5L42 19L48 8L53 15L57 12H100"
                stroke="#E2E8F0"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M0 12H30L36 5L42 19L48 8L53 15L57 12H100"
                stroke={Colors.brand.red}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>

          {/* Connecting Network Label */}
          <View style={styles.connectingRow}>
            <View style={styles.dotGroup}>
              <View style={styles.smallDot} />
              <View style={styles.smallDot} />
              <View style={styles.smallDot} />
            </View>
            <Text style={styles.connectingText}>CONNECTING NETWORK</Text>
          </View>

          {/* Protocol Watermark */}
          <Text style={styles.protocolWatermark}>
            Secured Healthcare Emergency Protocol • v2.4
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFC',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  ambientTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  ambientPlus: {
    fontSize: 16,
    color: '#CBD5E1',
    fontFamily: 'monospace',
  },
  heroCenter: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  logoOuterGlow: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoCard: {
    width: 100,
    height: 100,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  appTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.8,
    marginBottom: 10,
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 7,
    marginBottom: 14,
  },
  pulseDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.brand.red,
  },
  pillText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#B91C1C',
    letterSpacing: 0.2,
  },
  missionText: {
    fontSize: 13.5,
    fontWeight: '500',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 270,
  },
  footerSection: {
    alignItems: 'center',
    width: '100%',
    gap: 12,
    paddingBottom: 10,
  },
  ecgContainer: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  dotGroup: {
    flexDirection: 'row',
    gap: 3,
  },
  smallDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.brand.red,
  },
  connectingText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1,
  },
  protocolWatermark: {
    fontSize: 10.5,
    fontWeight: '500',
    color: '#94A3B8',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
});
