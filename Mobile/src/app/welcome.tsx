import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Circle, Line, Defs, RadialGradient, Stop } from 'react-native-svg';
import { Colors, Shadows } from '@/constants/theme';
import { BrandLogo } from '@/components/common/BrandLogo';
import { VectorIcon } from '@/components/common/VectorIcon';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Pill Badge */}
        <View style={styles.topBadgeContainer}>
          <View style={styles.topBadge}>
            <BrandLogo size={20} />
            <Text style={styles.badgeTitle}>Lifelink</Text>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeSlogan}>Save Lives. Spread Smiles</Text>
          </View>
        </View>

        {/* Main Headline */}
        <Text style={styles.mainHeadline}>Every second matters.</Text>
        <Text style={styles.subHeadline}>
          Connect verified blood requests with compatible donors and participating blood banks.
        </Text>

        {/* Center Radar / Dispatch Network Graphic */}
        <View style={styles.radarContainer}>
          <View style={styles.radarSvgWrapper}>
            <Svg width={250} height={250} viewBox="0 0 280 280">
              <Defs>
                <RadialGradient id="radarGlow" cx="0.5" cy="0.5" r="0.5">
                  <Stop offset="0%" stopColor="#EF4444" stopOpacity="0.25" />
                  <Stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                </RadialGradient>
              </Defs>
              {/* Orbits */}
              <Circle cx="140" cy="140" r="116" stroke="#E2E8F0" strokeWidth="1.2" strokeDasharray="4 4" />
              <Circle cx="140" cy="140" r="82" stroke="#CBD5E1" strokeWidth="1.2" strokeDasharray="3 3" />
              <Circle cx="140" cy="140" r="50" fill="url(#radarGlow)" />

              {/* Connecting dashed lines to nodes */}
              <Line x1="140" y1="140" x2="68" y2="78" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
              <Line x1="140" y1="140" x2="214" y2="82" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
              <Line x1="140" y1="140" x2="62" y2="195" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
              <Line x1="140" y1="140" x2="220" y2="198" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Nodes */}
              {/* Top Left: Donor Node */}
              <Circle cx="68" cy="78" r="18" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
              <Circle cx="78" cy="68" r="3.5" fill="#10B981" />

              {/* Top Right: Hospital Node */}
              <Circle cx="214" cy="82" r="18" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
              <Circle cx="224" cy="72" r="3.5" fill="#0284C7" />

              {/* Bottom Left: Blood Sample Node */}
              <Circle cx="62" cy="195" r="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
              <Circle cx="71" cy="186" r="3" fill="#F59E0B" />

              {/* Bottom Right: Dispatch Fast Node */}
              <Circle cx="220" cy="198" r="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
              <Circle cx="229" cy="190" r="3" fill="#10B981" />

              {/* Center Hub */}
              <Circle cx="140" cy="140" r="32" fill="#DC2626" />
              <Circle cx="140" cy="140" r="36" stroke="#FECACA" strokeWidth="1.5" strokeOpacity="0.5" />
            </Svg>

            {/* Overlaid Center Logo */}
            <View style={styles.centerLogoOverlay}>
              <BrandLogo size={36} />
            </View>

            {/* Overlay node icons */}
            <View style={[styles.nodeIconWrapper, { top: 68, left: 59 }]}>
              <VectorIcon name="person" type="material" size={18} color="#DC2626" />
            </View>
            <View style={[styles.nodeIconWrapper, { top: 72, left: 205 }]}>
              <VectorIcon name="local-hospital" type="material" size={18} color="#0284C7" />
            </View>
            <View style={[styles.nodeIconWrapper, { top: 186, left: 54 }]}>
              <VectorIcon name="bloodtype" type="material" size={16} color="#F59E0B" />
            </View>
            <View style={[styles.nodeIconWrapper, { top: 189, left: 212 }]}>
              <VectorIcon name="bolt" type="material" size={16} color="#10B981" />
            </View>
          </View>

          {/* Live Triage Active Pill */}
          <View style={styles.liveTriagePill}>
            <View style={styles.livePingWrapper}>
              <View style={styles.livePingDot} />
            </View>
            <Text style={styles.liveTriageText}>LIVE TRIAGE ACTIVE</Text>
          </View>
        </View>

        {/* Feature Cards: 2 Columns */}
        <View style={styles.cardsRow}>
          {/* Card 1: < 15 Min Rapid Dispatch */}
          <View style={styles.featureCard}>
            <View style={styles.featureIconRed}>
              <VectorIcon name="flash-on" type="material" size={20} color="#DC2626" />
            </View>
            <View style={styles.featureTextCol}>
              <Text style={styles.featureTitle}>&lt; 15 Min</Text>
              <Text style={styles.featureSub}>Rapid Dispatch</Text>
            </View>
          </View>

          {/* Card 2: 100% Certified Blood Centers */}
          <View style={styles.featureCard}>
            <View style={styles.featureIconGreen}>
              <VectorIcon name="verified" type="material" size={20} color="#059669" />
            </View>
            <View style={styles.featureTextCol}>
              <Text style={styles.featureTitle}>100% Certified</Text>
              <Text style={styles.featureSub}>Blood Centers</Text>
            </View>
          </View>
        </View>

        {/* Bottom CTAs */}
        <View style={styles.bottomActions}>
          {/* Primary CTA */}
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.push('/role-selection')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Get Started</Text>
            <VectorIcon name="arrow-forward" type="material" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Secondary CTA */}
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => router.push('/login')}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryBtnText}>I already have an account</Text>
          </TouchableOpacity>

          {/* Footer Motto */}
          <View style={styles.footerMotto}>
            <Text style={styles.footerMottoText}>Be the saviour for someone</Text>
            <VectorIcon name="favorite" type="material" size={14} color="#EF4444" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: 'center',
  },
  topBadgeContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  topBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 7,
    ...Shadows.subtle,
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  badgeDot: {
    width: 3.5,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: '#94A3B8',
  },
  badgeSlogan: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  mainHeadline: {
    fontSize: 30,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -0.8,
    lineHeight: 36,
  },
  subHeadline: {
    fontSize: 13.5,
    fontWeight: '400',
    color: '#64748B',
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 20,
    marginTop: 8,
  },
  radarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
    width: '100%',
  },
  radarSvgWrapper: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerLogoOverlay: {
    position: 'absolute',
    top: 107,
    left: 107,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeIconWrapper: {
    position: 'absolute',
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveTriagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    gap: 6,
    marginTop: 6,
    ...Shadows.subtle,
  },
  livePingWrapper: {
    width: 8,
    height: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  livePingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DC2626',
  },
  liveTriageText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#B91C1C',
    letterSpacing: 0.8,
  },
  cardsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    marginVertical: 14,
  },
  featureCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 10,
    ...Shadows.subtle,
  },
  featureIconRed: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  featureIconGreen: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#ECFDF3',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  featureTextCol: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  featureSub: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 1,
  },
  bottomActions: {
    width: '100%',
    gap: 10,
    marginTop: 6,
  },
  primaryBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#DC2626',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryBtn: {
    width: '100%',
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Shadows.subtle,
  },
  secondaryBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  footerMotto: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingTop: 8,
  },
  footerMottoText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
});
