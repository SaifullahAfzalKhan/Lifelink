import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/theme';
import { BrandLogo } from '@/components/common/BrandLogo';
import { VectorIcon } from '@/components/common/VectorIcon';
import { EmergencyCallout } from '@/components/common/EmergencyCallout';
import { useApp, UserRole } from '@/context/AppContext';

export default function LoginScreen() {
  const router = useRouter();
  const { role, setRole, login } = useApp();

  const [identifier, setIdentifier] = useState('tariq.mehmood@example.com');
  const [password, setPassword] = useState('LifelinkPass123!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login(role);
      setLoading(false);
      if (role === 'patient') {
        router.replace('/(patient)/home');
      } else if (role === 'donor') {
        router.replace('/(donor)/home');
      } else {
        router.replace('/(hospital)/home');
      }
    }, 600);
  };

  const handleRegisterNavigate = () => {
    if (role === 'patient') {
      router.push('/register/patient');
    } else if (role === 'donor') {
      router.push('/register/donor');
    } else {
      router.push('/register/hospital');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Bar: Back Action & Trust Pill */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backCircle}
            onPress={() => router.back()}
            activeOpacity={0.7}
            accessibilityLabel="Go back"
          >
            <VectorIcon name="arrow-back" type="material" size={18} color={Colors.text.primary} />
          </TouchableOpacity>

          <View style={styles.trustPill}>
            <View style={styles.pulseDot} />
            <Text style={styles.trustPillText}>Save lives, spread smiles</Text>
          </View>
        </View>

        {/* Header Section with Emblem */}
        <View style={styles.headerSection}>
          <View style={styles.emblemCard}>
            <BrandLogo size={46} />
          </View>
          <Text style={styles.titleText}>Welcome back</Text>
          <Text style={styles.subText}>Sign in to continue to your Lifelink account</Text>

          {/* Active Role Selector / Switcher */}
          <View style={styles.roleTabsRow}>
            {(['patient', 'donor', 'hospital'] as UserRole[]).map((r) => (
              <TouchableOpacity
                key={r}
                style={[styles.roleTab, role === r && styles.roleTabSelected]}
                onPress={() => setRole(r)}
                activeOpacity={0.8}
              >
                <Text style={[styles.roleTabText, role === r && styles.roleTabTextSelected]}>
                  {r === 'patient' ? 'Patient' : r === 'donor' ? 'Donor' : 'Hospital'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Main Form Card */}
        <View style={styles.formCard}>
          {/* Field 1: Phone or Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone or Email</Text>
            <View style={styles.inputWrapper}>
              <VectorIcon name="alternate-email" type="material" size={18} color={Colors.text.muted} />
              <TextInput
                style={styles.textInput}
                placeholder="e.g. name@example.com or +92 300 1234567"
                placeholderTextColor={Colors.text.subtle}
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Field 2: Password */}
          <View style={styles.inputGroup}>
            <View style={styles.passwordLabelRow}>
              <Text style={styles.inputLabel}>Password</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <VectorIcon name="lock" type="material" size={18} color={Colors.text.muted} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your password"
                placeholderTextColor={Colors.text.subtle}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                activeOpacity={0.7}
                style={styles.eyeBtn}
              >
                <VectorIcon
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  type="material"
                  size={18}
                  color={Colors.text.muted}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit CTA Button */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleLogin}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.submitBtnText}>
                  Login as {role === 'patient' ? 'Patient' : role === 'donor' ? 'Donor' : 'Hospital'}
                </Text>
                <VectorIcon name="arrow-forward" type="material" size={18} color="#FFFFFF" />
              </>
            )}
          </TouchableOpacity>

          {/* Visual Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Continue with Phone / OTP */}
          <TouchableOpacity
            style={styles.otpBtn}
            onPress={() => router.push('/otp-verification')}
            activeOpacity={0.85}
          >
            <VectorIcon name="smartphone" type="material" size={18} color={Colors.brand.crimson} />
            <Text style={styles.otpBtnText}>Continue with Phone / OTP</Text>
          </TouchableOpacity>
        </View>

        {/* Registration Link */}
        <View style={styles.registerPrompt}>
          <Text style={styles.registerPromptText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleRegisterNavigate} activeOpacity={0.7}>
            <Text style={styles.registerLinkText}>
              Register as {role === 'patient' ? 'Patient' : role === 'donor' ? 'Donor' : 'Hospital'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Callout */}
        <EmergencyCallout />
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
    paddingBottom: 24,
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
  trustPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.brand.redSubtle,
    borderWidth: 1,
    borderColor: Colors.brand.redBorder,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.brand.red,
  },
  trustPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.brand.crimson,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  emblemCard: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    marginBottom: 12,
    ...Shadows.subtle,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  subText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 4,
  },
  roleTabsRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 3,
    marginTop: 14,
    width: '100%',
    gap: 4,
  },
  roleTab: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 9,
  },
  roleTabSelected: {
    backgroundColor: '#FFFFFF',
    ...Shadows.subtle,
  },
  roleTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  roleTabTextSelected: {
    fontWeight: '800',
    color: Colors.brand.darkRed,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 14,
    marginBottom: 16,
    ...Shadows.card,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: Colors.brand.crimson,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    height: 48,
    gap: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#0F172A',
    fontWeight: '500',
  },
  eyeBtn: {
    padding: 4,
  },
  submitBtn: {
    height: 48,
    backgroundColor: Colors.brand.red,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
    shadowColor: Colors.brand.red,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  submitBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 2,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  otpBtn: {
    height: 46,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  otpBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  registerPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  registerPromptText: {
    fontSize: 12.5,
    color: '#64748B',
  },
  registerLinkText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: Colors.brand.crimson,
    textDecorationLine: 'underline',
  },
});
