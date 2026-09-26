import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Shadows } from '@/constants/theme';
import { BrandLogo } from '@/components/common/BrandLogo';
import { VectorIcon } from '@/components/common/VectorIcon';
import { useApp } from '@/context/AppContext';

export default function OtpVerificationScreen() {
  const router = useRouter();
  const { role, login } = useApp();
  const [digits, setDigits] = useState(['5', '8', '2', '', '', '']);
  const [timer, setTimer] = useState(41);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerify = () => {
    login(role);
    if (role === 'patient') {
      router.replace('/(patient)/home');
    } else if (role === 'donor') {
      router.replace('/(donor)/home');
    } else {
      router.replace('/(hospital)/home');
    }
  };

  const handleDigitChange = (index: number, val: string) => {
    const updated = [...digits];
    updated[index] = val;
    setDigits(updated);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backCircle}
            onPress={() => router.back()}
            activeOpacity={0.7}
            accessibilityLabel="Go back"
          >
            <VectorIcon name="arrow-back" type="material" size={18} color={Colors.text.primary} />
          </TouchableOpacity>

          <View style={styles.networkPill}>
            <View style={styles.pulseDot} />
            <Text style={styles.networkPillText}>Lifelink • Save Lives. Spread Smiles</Text>
          </View>

          <View style={styles.shieldIcon}>
            <VectorIcon name="verified-user" type="material" size={18} color={Colors.text.muted} />
          </View>
        </View>

        {/* Verification Emblem & Header */}
        <View style={styles.headerSection}>
          <View style={styles.emblemWrapper}>
            <View style={styles.emblemInner}>
              <BrandLogo size={36} />
            </View>
            <View style={styles.lockBadge}>
              <VectorIcon name="lock" type="material" size={12} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.headline}>Verify your phone</Text>
          <Text style={styles.subheadline}>
            We sent a 6-digit emergency verification code to
            {'\n'}
            <Text style={styles.phoneHighlight}>+92 300 1234567</Text>
          </Text>

          <TouchableOpacity style={styles.changePhoneBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <VectorIcon name="edit" type="material" size={12} color={Colors.brand.crimson} />
            <Text style={styles.changePhoneText}>Change mobile number</Text>
          </TouchableOpacity>
        </View>

        {/* OTP Input Card */}
        <View style={styles.otpCard}>
          <View style={styles.otpHeaderRow}>
            <Text style={styles.otpLabel}>SMS Security Code</Text>
            <View style={styles.encryptedRow}>
              <VectorIcon name="shield" type="material" size={12} color={Colors.status.emerald} />
              <Text style={styles.encryptedText}>Encrypted Sync</Text>
            </View>
          </View>

          {/* 6 Digit Input Boxes */}
          <View style={styles.boxesRow}>
            {digits.map((digit, idx) => (
              <TextInput
                key={idx}
                style={[styles.digitBox, digit ? styles.digitBoxFilled : styles.digitBoxEmpty]}
                value={digit}
                onChangeText={(val) => handleDigitChange(idx, val)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          {/* Verify Button */}
          <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify} activeOpacity={0.85}>
            <Text style={styles.verifyBtnText}>Verify & Continue</Text>
            <VectorIcon name="arrow-forward" type="material" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Resend Actions */}
          <View style={styles.resendSection}>
            <View style={styles.timerRow}>
              <VectorIcon name="schedule" type="material" size={14} color={Colors.text.muted} />
              <Text style={styles.timerText}>
                Didn't receive code? Resend in{' '}
                <Text style={styles.timerCount}>00:{timer < 10 ? `0${timer}` : timer}</Text>
              </Text>
            </View>

            <View style={styles.channelRow}>
              <TouchableOpacity style={styles.channelBtn} activeOpacity={0.7}>
                <VectorIcon name="sms" type="material" size={14} color={Colors.text.secondary} />
                <Text style={styles.channelBtnText}>SMS</Text>
              </TouchableOpacity>
              <Text style={styles.channelDivider}>•</Text>
              <TouchableOpacity style={styles.channelBtn} activeOpacity={0.7}>
                <VectorIcon name="chat" type="material" size={14} color={Colors.status.emerald} />
                <Text style={[styles.channelBtnText, { color: Colors.status.emerald }]}>WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Emergency Triage Hotline Banner */}
        <View style={styles.triageBanner}>
          <View style={styles.triageLeft}>
            <View style={styles.triageIconBg}>
              <VectorIcon name="emergency" type="material" size={16} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.triageTitle}>Urgent Life-Support Triage?</Text>
              <Text style={styles.triageSub}>Bypass queue directly via 24/7 hotline</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.triageCallBtn} activeOpacity={0.8}>
            <VectorIcon name="call" type="material" size={14} color="#FFFFFF" />
            <Text style={styles.triageCallText}>1021</Text>
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
  networkPill: {
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
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.brand.red,
  },
  networkPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 0.2,
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
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 12,
  },
  emblemInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.subtle,
  },
  lockBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.brand.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
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
    lineHeight: 18,
    marginTop: 4,
  },
  phoneHighlight: {
    fontWeight: '800',
    color: '#0F172A',
  },
  changePhoneBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  changePhoneText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.brand.crimson,
  },
  otpCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 18,
    ...Shadows.card,
  },
  otpHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  otpLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  encryptedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  encryptedText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.status.emerald,
  },
  boxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 18,
  },
  digitBox: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    borderWidth: 1.5,
  },
  digitBoxFilled: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
  },
  digitBoxEmpty: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
  },
  verifyBtn: {
    height: 48,
    backgroundColor: Colors.brand.red,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: Colors.brand.red,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  verifyBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  resendSection: {
    alignItems: 'center',
    marginTop: 14,
    gap: 6,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timerText: {
    fontSize: 12,
    color: '#64748B',
  },
  timerCount: {
    fontWeight: '700',
    color: Colors.brand.crimson,
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 2,
  },
  channelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  channelBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  channelDivider: {
    color: '#CBD5E1',
  },
  triageBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E2E8FF',
    borderRadius: 16,
    padding: 14,
    ...Shadows.subtle,
  },
  triageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  triageIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.brand.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  triageTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  triageSub: {
    fontSize: 11,
    fontWeight: '500',
    color: '#475569',
  },
  triageCallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.brand.crimson,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    gap: 4,
  },
  triageCallText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
