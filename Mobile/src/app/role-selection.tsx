import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/theme';
import { BrandLogo } from '@/components/common/BrandLogo';
import { VectorIcon } from '@/components/common/VectorIcon';
import { useApp, UserRole } from '@/context/AppContext';

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { setRole } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');

  const handleContinue = () => {
    setRole(selectedRole);
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Branding Pill */}
        <View style={styles.topBadgeContainer}>
          <View style={styles.topBadge}>
            <BrandLogo size={20} />
            <Text style={styles.badgeTitle}>Lifelink</Text>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeSlogan}>Save Lives. Spread Smiles</Text>
          </View>
        </View>

        {/* Headline & Subtitle */}
        <Text style={styles.headline}>How will you use{'\n'}Lifelink?</Text>
        <Text style={styles.subHeadline}>Choose your role to get a personalized experience.</Text>

        {/* Role Cards List */}
        <View style={styles.cardsContainer}>
          {/* Card 1: Patient / Family */}
          <TouchableOpacity
            style={[styles.roleCard, selectedRole === 'patient' && styles.roleCardSelected]}
            onPress={() => setSelectedRole('patient')}
            activeOpacity={0.9}
          >
            <View
              style={[
                styles.iconContainer,
                selectedRole === 'patient' ? styles.iconContainerSelected : styles.iconContainerMuted,
              ]}
            >
              <BrandLogo size={28} />
            </View>

            <View style={styles.cardContent}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>Patient / Family</Text>
                <View
                  style={[
                    styles.roleBadge,
                    selectedRole === 'patient' ? styles.roleBadgeSelected : styles.roleBadgeMuted,
                  ]}
                >
                  <Text
                    style={[
                      styles.roleBadgeText,
                      selectedRole === 'patient' ? styles.roleBadgeTextSelected : styles.roleBadgeTextMuted,
                    ]}
                  >
                    I need blood
                  </Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>Find verified blood support for an urgent need.</Text>
            </View>

            <View
              style={[
                styles.radioCircle,
                selectedRole === 'patient' ? styles.radioCircleSelected : styles.radioCircleMuted,
              ]}
            >
              {selectedRole === 'patient' && (
                <VectorIcon name="check" type="material" size={14} color="#FFFFFF" />
              )}
            </View>
          </TouchableOpacity>

          {/* Card 2: Blood Donor */}
          <TouchableOpacity
            style={[styles.roleCard, selectedRole === 'donor' && styles.roleCardSelected]}
            onPress={() => setSelectedRole('donor')}
            activeOpacity={0.9}
          >
            <View
              style={[
                styles.iconContainer,
                selectedRole === 'donor' ? styles.iconContainerSelected : styles.iconContainerMuted,
              ]}
            >
              <VectorIcon
                name="bloodtype"
                type="material"
                size={24}
                color={selectedRole === 'donor' ? Colors.brand.crimson : Colors.text.secondary}
              />
            </View>

            <View style={styles.cardContent}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>Blood Donor</Text>
                <View
                  style={[
                    styles.roleBadge,
                    selectedRole === 'donor' ? styles.roleBadgeSelected : styles.roleBadgeMuted,
                  ]}
                >
                  <Text
                    style={[
                      styles.roleBadgeText,
                      selectedRole === 'donor' ? styles.roleBadgeTextSelected : styles.roleBadgeTextMuted,
                    ]}
                  >
                    I want to donate
                  </Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>
                Help verified patients and discover nearby donation opportunities.
              </Text>
            </View>

            <View
              style={[
                styles.radioCircle,
                selectedRole === 'donor' ? styles.radioCircleSelected : styles.radioCircleMuted,
              ]}
            >
              {selectedRole === 'donor' && (
                <VectorIcon name="check" type="material" size={14} color="#FFFFFF" />
              )}
            </View>
          </TouchableOpacity>

          {/* Card 3: Hospital / Blood Bank */}
          <TouchableOpacity
            style={[styles.roleCard, selectedRole === 'hospital' && styles.roleCardSelected]}
            onPress={() => setSelectedRole('hospital')}
            activeOpacity={0.9}
          >
            <View
              style={[
                styles.iconContainer,
                selectedRole === 'hospital' ? styles.iconContainerSelected : styles.iconContainerMuted,
              ]}
            >
              <VectorIcon
                name="local-hospital"
                type="material"
                size={24}
                color={selectedRole === 'hospital' ? Colors.brand.crimson : Colors.text.secondary}
              />
            </View>

            <View style={styles.cardContent}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>Hospital / Blood Bank</Text>
                <View
                  style={[
                    styles.roleBadge,
                    selectedRole === 'hospital' ? styles.roleBadgeSelected : styles.roleBadgeMuted,
                  ]}
                >
                  <Text
                    style={[
                      styles.roleBadgeText,
                      selectedRole === 'hospital' ? styles.roleBadgeTextSelected : styles.roleBadgeTextMuted,
                    ]}
                  >
                    I verify requests
                  </Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>
                Verify requests and coordinate blood availability.
              </Text>
            </View>

            <View
              style={[
                styles.radioCircle,
                selectedRole === 'hospital' ? styles.radioCircleSelected : styles.radioCircleMuted,
              ]}
            >
              {selectedRole === 'hospital' && (
                <VectorIcon name="check" type="material" size={14} color="#FFFFFF" />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Clinical Assurance Note */}
        <View style={styles.noteRow}>
          <VectorIcon name="verified-user" type="material" size={14} color={Colors.status.emerald} />
          <Text style={styles.noteText}>You can switch or link accounts anytime in Settings</Text>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.continueBtn} onPress={handleContinue} activeOpacity={0.85}>
            <Text style={styles.continueBtnText}>Continue</Text>
            <VectorIcon name="arrow-forward" type="material" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Emergency helpline link */}
          <TouchableOpacity
            style={styles.emergencyLink}
            onPress={() => Linking.openURL('tel:1021').catch(() => {})}
            activeOpacity={0.7}
          >
            <Text style={styles.emergencyLinkText}>
              Need emergency assistance right now? <Text style={styles.callHighlight}>Call 1021</Text>
            </Text>
          </TouchableOpacity>
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
  },
  topBadgeContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  topBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FEE2E2',
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
    color: '#64748B',
  },
  headline: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.6,
    lineHeight: 32,
  },
  subHeadline: {
    fontSize: 14,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 6,
    marginBottom: 20,
  },
  cardsContainer: {
    gap: 12,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    gap: 12,
    ...Shadows.subtle,
  },
  roleCardSelected: {
    borderColor: Colors.brand.red,
    backgroundColor: '#FFFFFF',
    shadowColor: Colors.brand.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerSelected: {
    backgroundColor: Colors.brand.redSubtle,
    borderWidth: 1,
    borderColor: Colors.brand.redBorder,
  },
  iconContainerMuted: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardContent: {
    flex: 1,
    paddingRight: 24,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  roleBadgeSelected: {
    backgroundColor: Colors.brand.redSubtle,
    borderWidth: 1,
    borderColor: Colors.brand.redBorder,
  },
  roleBadgeMuted: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  roleBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  roleBadgeTextSelected: {
    color: Colors.brand.red,
  },
  roleBadgeTextMuted: {
    color: '#64748B',
  },
  cardDescription: {
    fontSize: 12.5,
    fontWeight: '400',
    color: '#64748B',
    lineHeight: 18,
  },
  radioCircle: {
    position: 'absolute',
    top: 18,
    right: 14,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    backgroundColor: Colors.brand.red,
  },
  radioCircleMuted: {
    borderWidth: 2,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 18,
  },
  noteText: {
    fontSize: 11.5,
    fontWeight: '500',
    color: '#64748B',
  },
  bottomSection: {
    marginTop: 28,
    gap: 12,
  },
  continueBtn: {
    width: '100%',
    height: 52,
    backgroundColor: Colors.brand.red,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: Colors.brand.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  continueBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  emergencyLink: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  emergencyLinkText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  callHighlight: {
    color: Colors.brand.red,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
