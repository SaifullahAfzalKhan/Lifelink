import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/theme';
import { BrandLogo } from '@/components/common/BrandLogo';
import { VectorIcon } from '@/components/common/VectorIcon';
import { useApp } from '@/context/AppContext';

export default function PatientRegistrationScreen() {
  const router = useRouter();
  const { login, updateProfile } = useApp();

  const [name, setName] = useState('Tariq Mehmood');
  const [phone, setPhone] = useState('300 1234567');
  const [email, setEmail] = useState('tariq.mehmood@example.com');
  const [city, setCity] = useState('Johar Town, Lahore');
  const [password, setPassword] = useState('PatientPass123!');
  const [confirmPassword, setConfirmPassword] = useState('PatientPass123!');

  const handleRegister = () => {
    updateProfile({
      name,
      phone: `+92 ${phone}`,
      email,
      city,
      role: 'patient',
    });
    login('patient');
    router.replace('/(patient)/home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backCircle} onPress={() => router.back()} activeOpacity={0.7}>
            <VectorIcon name="arrow-back" type="material" size={18} color={Colors.text.primary} />
          </TouchableOpacity>

          <View style={styles.networkBadge}>
            <BrandLogo size={18} />
            <Text style={styles.networkBadgeText}>Lifelink • Save Lives. Spread Smiles</Text>
          </View>

          <View style={styles.shieldIcon}>
            <VectorIcon name="verified-user" type="material" size={18} color={Colors.text.muted} />
          </View>
        </View>

        {/* Hero Identity */}
        <View style={styles.headerSection}>
          <View style={styles.emblemWrapper}>
            <BrandLogo size={36} />
          </View>
          <Text style={styles.headline}>Create your account</Text>
          <Text style={styles.subheadline}>
            Tell us a few details to get started with emergency blood response.
          </Text>
        </View>

        {/* Registration Form */}
        <View style={styles.formContainer}>
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <VectorIcon name="person" type="material" size={18} color={Colors.text.muted} />
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Tariq Mehmood"
                placeholderTextColor={Colors.text.subtle}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.prefixGroup}>
                <Text style={styles.flagText}>🇵🇰</Text>
                <Text style={styles.prefixText}>+92</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="300 1234567"
                placeholderTextColor={Colors.text.subtle}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <VectorIcon name="check-circle" type="material" size={16} color={Colors.status.emerald} />
            </View>
          </View>

          {/* Email Address */}
          <View style={styles.inputGroup}>
            <View style={styles.optionalRow}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <Text style={styles.optionalText}>Optional</Text>
            </View>
            <View style={styles.inputWrapper}>
              <VectorIcon name="alternate-email" type="material" size={18} color={Colors.text.muted} />
              <TextInput
                style={styles.textInput}
                placeholder="name@example.com"
                placeholderTextColor={Colors.text.subtle}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* City / Location */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>City / Location</Text>
            <View style={styles.inputWrapper}>
              <VectorIcon name="location-on" type="material" size={18} color={Colors.brand.crimson} />
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Johar Town, Lahore"
                placeholderTextColor={Colors.text.subtle}
                value={city}
                onChangeText={setCity}
              />
              <View style={styles.gpsPill}>
                <Text style={styles.gpsText}>GPS</Text>
              </View>
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <VectorIcon name="lock" type="material" size={18} color={Colors.text.muted} />
              <TextInput
                style={styles.textInput}
                placeholder="••••••••"
                placeholderTextColor={Colors.text.subtle}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.inputWrapper}>
              <VectorIcon name="lock" type="material" size={18} color={Colors.text.muted} />
              <TextInput
                style={styles.textInput}
                placeholder="••••••••"
                placeholderTextColor={Colors.text.subtle}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleRegister} activeOpacity={0.85}>
            <Text style={styles.submitBtnText}>Create Account</Text>
            <VectorIcon name="arrow-forward" type="material" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Link to login */}
          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')} activeOpacity={0.7}>
              <Text style={styles.loginLinkText}>Sign In</Text>
            </TouchableOpacity>
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
    paddingTop: 14,
    paddingBottom: 28,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Shadows.subtle,
  },
  networkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: 999,
    gap: 6,
    ...Shadows.subtle,
  },
  networkBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F172A',
  },
  shieldIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  emblemWrapper: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  headline: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  subheadline: {
    fontSize: 13,
    fontWeight: '400',
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 280,
    lineHeight: 18,
  },
  formContainer: {
    gap: 14,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  optionalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionalText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    height: 48,
    gap: 8,
    ...Shadows.subtle,
  },
  prefixGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    paddingRight: 8,
    gap: 4,
  },
  flagText: {
    fontSize: 14,
  },
  prefixText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  textInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#0F172A',
    fontWeight: '500',
  },
  gpsPill: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  gpsText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.brand.crimson,
  },
  submitBtn: {
    height: 50,
    backgroundColor: Colors.brand.red,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6,
    shadowColor: Colors.brand.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  loginPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginPromptText: {
    fontSize: 12.5,
    color: '#64748B',
  },
  loginLinkText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: Colors.brand.crimson,
    textDecorationLine: 'underline',
  },
});
