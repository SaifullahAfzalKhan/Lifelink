import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BrandLogo } from '@/components/common/BrandLogo';
import { VectorIcon } from '@/components/common/VectorIcon';
import { useApp } from '@/context/AppContext';

export default function HospitalVerificationScreen() {
  const router = useRouter();
  const { hospitalVerificationState, setHospitalVerificationState, login } = useApp();

  // Local state or sync with context
  const [activeState, setActiveState] = useState<'pending' | 'review' | 'verified' | 'action'>(
    hospitalVerificationState || 'pending'
  );
  const [copied, setCopied] = useState(false);

  const handleStateChange = (state: 'pending' | 'review' | 'verified' | 'action') => {
    setActiveState(state);
    setHospitalVerificationState(state);
  };

  const copyRefId = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    Alert.alert('Copied', 'Reference ID #BR-ORG-84920 copied to clipboard');
  };

  const handlePrimaryAction = () => {
    if (activeState === 'verified') {
      login('hospital', {
        id: 'HOSP-001',
        name: 'Shaukat Khanum Memorial Hospital',
        email: 'admin@hospital.org',
        role: 'hospital',
        verified: true,
      });
      router.replace('/(hospital)/home');
    } else if (activeState === 'action') {
      Alert.alert('Re-upload Documents', 'Opening file picker to re-upload PHC certificate...');
    } else {
      Alert.alert('Status Refreshed', 'Your application is actively queued for review.');
    }
  };

  // State-specific configs
  const stateConfigs = {
    pending: {
      iconName: 'hourglass-top',
      iconBg: 'bg-amber-100',
      iconBorder: 'border-amber-200',
      iconColor: '#d97706',
      title: 'Verification Submitted',
      description:
        'Your organization details and documents have been submitted for verification. You can access organization features after verification is completed.',
      badgeText: 'Pending Review',
      badgeBg: 'bg-amber-50',
      badgeBorder: 'border-amber-200',
      badgeColor: '#b45309',
      noticeHead: 'Estimated Review: 24–48 hours',
      noticeSub:
        'Punjab Healthcare Commission & Red Crescent dispatch desk are processing your documents.',
      noticeBg: 'bg-amber-50',
      noticeBorder: 'border-amber-200',
      noticeTextColor: '#92400e',
      primaryBtnText: 'Refresh Status',
      primaryBtnColor: 'bg-slate-800',
    },
    review: {
      iconName: 'rate-review',
      iconBg: 'bg-blue-100',
      iconBorder: 'border-blue-200',
      iconColor: '#2563eb',
      title: 'Documents Under Review',
      description:
        'Our medical verification board is currently validating your clinical licenses, affiliations and hospital authority.',
      badgeText: 'Under Review',
      badgeBg: 'bg-blue-50',
      badgeBorder: 'border-blue-200',
      badgeColor: '#1d4ed8',
      noticeHead: 'Validation In Progress',
      noticeSub:
        'Officer assigned: Dr. Tariq Niaz (Medical Board). Field review & registry sync underway.',
      noticeBg: 'bg-blue-50',
      noticeBorder: 'border-blue-200',
      noticeTextColor: '#1e40af',
      primaryBtnText: 'Check Progress',
      primaryBtnColor: 'bg-slate-800',
    },
    verified: {
      iconName: 'verified',
      iconBg: 'bg-emerald-100',
      iconBorder: 'border-emerald-200',
      iconColor: '#059669',
      title: 'Organization Verified',
      description:
        'Your hospital credentials have been approved. You now have full access to Lifelink emergency blood network.',
      badgeText: 'Verified & Active',
      badgeBg: 'bg-emerald-50',
      badgeBorder: 'border-emerald-200',
      badgeColor: '#047857',
      noticeHead: 'Access Granted: Level 1 Facility',
      noticeSub:
        'All clinical blood inventory management, matching, and emergency dispatch features are unlocked.',
      noticeBg: 'bg-emerald-50',
      noticeBorder: 'border-emerald-200',
      noticeTextColor: '#065f46',
      primaryBtnText: 'Go to Hospital Dashboard',
      primaryBtnColor: 'bg-[#af101a]',
    },
    action: {
      iconName: 'warning',
      iconBg: 'bg-rose-100',
      iconBorder: 'border-rose-200',
      iconColor: '#e11d48',
      title: 'Action Needed: License Document',
      description:
        'The verification officer requested a clearer scan or updated renewal of your Healthcare Commission registration.',
      badgeText: 'Action Required',
      badgeBg: 'bg-rose-50',
      badgeBorder: 'border-rose-200',
      badgeColor: '#be123c',
      noticeHead: 'Resubmission Requested',
      noticeSub:
        'Please re-upload your valid PHC renewal certificate (2024–2025) with clear seal & issue date.',
      noticeBg: 'bg-rose-50',
      noticeBorder: 'border-rose-200',
      noticeTextColor: '#9f1239',
      primaryBtnText: 'Re-upload License Document',
      primaryBtnColor: 'bg-[#af101a]',
    },
  };

  const cur = stateConfigs[activeState];

  return (
    <SafeAreaView className="flex-1 bg-[#faf8ff]">
      <StatusBar barStyle="dark-content" backgroundColor="#faf8ff" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Top Header */}
        <View className="flex-row items-center justify-between pt-3 pb-3">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="w-10 h-10 rounded-full bg-white items-center justify-center border border-slate-100 shadow-sm"
          >
            <VectorIcon name="arrow-back" size={20} color="#1e293b" />
          </TouchableOpacity>

          {/* Central Brand Pill */}
          <View className="flex-row items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/70 shadow-sm">
            <BrandLogo size={24} />
            <View>
              <Text className="text-xs font-extrabold text-[#131b2e] leading-tight">Lifelink</Text>
              <Text className="text-[9px] font-semibold text-[#af101a] leading-none">
                Save Lives. Spread Smiles
              </Text>
            </View>
          </View>

          {/* Security Badge */}
          <View className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 items-center justify-center">
            <VectorIcon name="verified-user" size={18} color="#059669" />
          </View>
        </View>

        {/* Interactive State Switcher Widget */}
        <View className="bg-slate-100 p-1.5 rounded-xl border border-slate-200 flex-row items-center my-2">
          {(['pending', 'review', 'verified', 'action'] as const).map((s) => {
            const labels = {
              pending: 'Pending',
              review: 'Under Review',
              verified: 'Verified',
              action: 'Action Needed',
            };
            const isSelected = activeState === s;
            return (
              <TouchableOpacity
                key={s}
                onPress={() => handleStateChange(s)}
                activeOpacity={0.8}
                className={`flex-1 py-1.5 px-1.5 rounded-lg items-center justify-center ${
                  isSelected ? 'bg-white shadow-sm' : 'bg-transparent'
                }`}
              >
                <Text
                  className={`text-[11px] font-bold text-center ${
                    isSelected ? 'text-[#131b2e]' : 'text-slate-500'
                  }`}
                  numberOfLines={1}
                >
                  {labels[s]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Centered Status Icon & Header */}
        <View className="items-center text-center pt-2 px-1 mb-4">
          <View
            className={`w-16 h-16 rounded-2xl ${cur.iconBg} border ${cur.iconBorder} items-center justify-center shadow-sm mb-3`}
          >
            <View className="w-10 h-10 rounded-xl bg-white items-center justify-center shadow-xs">
              <VectorIcon name={cur.iconName} size={24} color={cur.iconColor} />
            </View>
          </View>
          <Text className="text-xl font-bold text-[#131b2e] tracking-tight text-center">
            {cur.title}
          </Text>
          <Text className="text-xs text-slate-500 mt-1.5 max-w-sm text-center leading-relaxed">
            {cur.description}
          </Text>
        </View>

        {/* Status & Reference Card */}
        <View className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3 mb-4">
          {/* Ref ID & Organization */}
          <View className="flex-row items-center justify-between pb-2.5 border-b border-slate-100">
            <View>
              <Text className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                Reference ID
              </Text>
              <View className="flex-row items-center gap-1.5 mt-0.5">
                <Text className="text-base text-[#131b2e] font-bold tracking-tight">
                  #BR-ORG-84920
                </Text>
                <TouchableOpacity
                  onPress={copyRefId}
                  className="p-1 rounded-md active:scale-90"
                >
                  <VectorIcon
                    name={copied ? 'check' : 'content-copy'}
                    size={16}
                    color={copied ? '#059669' : '#64748b'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View className="items-end">
              <Text className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                Current Status
              </Text>
              <View
                className={`flex-row items-center px-2.5 py-1 mt-0.5 rounded-full ${cur.badgeBg} border ${cur.badgeBorder}`}
              >
                <VectorIcon
                  name={activeState === 'verified' ? 'check' : 'schedule'}
                  size={12}
                  color={cur.badgeColor}
                />
                <Text
                  className="text-[11px] font-bold ml-1"
                  style={{ color: cur.badgeColor }}
                >
                  {cur.badgeText}
                </Text>
              </View>
            </View>
          </View>

          {/* Organization & License */}
          <View className="flex-row pb-2.5 border-b border-slate-100 text-[12px]">
            <View className="flex-1 mr-2">
              <Text className="text-slate-500 text-[11px] uppercase tracking-wider font-medium">
                Hospital / Organization
              </Text>
              <Text className="font-bold text-[#131b2e] text-xs mt-0.5" numberOfLines={1}>
                Shaukat Khanum Memorial
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-slate-500 text-[11px] uppercase tracking-wider font-medium">
                License / Reg No.
              </Text>
              <Text className="font-bold text-[#131b2e] text-xs mt-0.5">PHC-REG-2024-8921</Text>
            </View>
          </View>

          {/* Dynamic Notice Box */}
          <View
            className={`p-2.5 rounded-xl ${cur.noticeBg} border ${cur.noticeBorder} flex-row items-start`}
          >
            <VectorIcon name="info" size={18} color={cur.iconColor} />
            <View className="flex-1 ml-2">
              <Text className="font-bold text-xs" style={{ color: cur.noticeTextColor }}>
                {cur.noticeHead}
              </Text>
              <Text
                className="text-[11px] leading-tight mt-0.5 opacity-90"
                style={{ color: cur.noticeTextColor }}
              >
                {cur.noticeSub}
              </Text>
            </View>
          </View>
        </View>

        {/* 4-Step Verification Timeline Progress */}
        <View className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm mb-5">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-[13px] font-bold text-[#131b2e] uppercase tracking-wider">
              Verification Stage
            </Text>
            <View className="px-2 py-0.5 rounded-full bg-slate-100">
              <Text className="text-[11px] font-bold text-slate-700">
                {activeState === 'verified'
                  ? 'Step 4 of 4'
                  : activeState === 'review'
                  ? 'Step 2 of 4'
                  : activeState === 'action'
                  ? 'Action Required'
                  : 'Step 1 of 4'}
              </Text>
            </View>
          </View>

          <View className="space-y-3">
            {/* Step 1 */}
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-emerald-600 items-center justify-center">
                <VectorIcon name="check" size={16} color="#ffffff" />
              </View>
              <View className="flex-1 ml-3">
                <View className="flex-row items-center justify-between">
                  <Text className="font-bold text-xs text-[#131b2e]">Application Submitted</Text>
                  <Text className="text-[10px] font-bold text-emerald-600">Completed</Text>
                </View>
                <Text className="text-[10px] text-slate-500">
                  Form data & clinical affiliations logged
                </Text>
              </View>
            </View>

            {/* Step 2 */}
            <View className="flex-row items-center">
              <View
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  activeState === 'verified'
                    ? 'bg-emerald-600'
                    : activeState === 'review'
                    ? 'bg-blue-600'
                    : activeState === 'action'
                    ? 'bg-rose-500'
                    : 'bg-slate-100 border border-slate-200'
                }`}
              >
                <VectorIcon
                  name={
                    activeState === 'verified'
                      ? 'check'
                      : activeState === 'action'
                      ? 'priority-high'
                      : 'edit-document'
                  }
                  size={15}
                  color={
                    activeState === 'verified' ||
                    activeState === 'review' ||
                    activeState === 'action'
                      ? '#ffffff'
                      : '#94a3b8'
                  }
                />
              </View>
              <View className="flex-1 ml-3">
                <View className="flex-row items-center justify-between">
                  <Text
                    className={`font-bold text-xs ${
                      activeState === 'action' ? 'text-rose-600' : 'text-[#131b2e]'
                    }`}
                  >
                    Documents Under Review
                  </Text>
                  <Text
                    className={`text-[10px] font-bold ${
                      activeState === 'verified'
                        ? 'text-emerald-600'
                        : activeState === 'review'
                        ? 'text-blue-600'
                        : activeState === 'action'
                        ? 'text-rose-600'
                        : 'text-slate-400'
                    }`}
                  >
                    {activeState === 'verified'
                      ? 'Completed'
                      : activeState === 'review'
                      ? 'In Progress'
                      : activeState === 'action'
                      ? 'Action Needed'
                      : 'Pending'}
                  </Text>
                </View>
                <Text className="text-[10px] text-slate-500">
                  Hospital NOC & Medical Superintendent ID
                </Text>
              </View>
            </View>

            {/* Step 3 */}
            <View className="flex-row items-center">
              <View
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  activeState === 'verified'
                    ? 'bg-emerald-600'
                    : 'bg-slate-100 border border-slate-200'
                }`}
              >
                <VectorIcon
                  name={activeState === 'verified' ? 'check' : 'verified'}
                  size={15}
                  color={activeState === 'verified' ? '#ffffff' : '#94a3b8'}
                />
              </View>
              <View className="flex-1 ml-3">
                <View className="flex-row items-center justify-between">
                  <Text className="font-bold text-xs text-[#131b2e]">Organization Verified</Text>
                  <Text
                    className={`text-[10px] font-bold ${
                      activeState === 'verified' ? 'text-emerald-600' : 'text-slate-400'
                    }`}
                  >
                    {activeState === 'verified' ? 'Completed' : 'Queue'}
                  </Text>
                </View>
                <Text className="text-[10px] text-slate-500">
                  Regulatory commission certification
                </Text>
              </View>
            </View>

            {/* Step 4 */}
            <View className="flex-row items-center">
              <View
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  activeState === 'verified'
                    ? 'bg-emerald-600'
                    : 'bg-slate-100 border border-slate-200'
                }`}
              >
                <VectorIcon
                  name="power-settings-new"
                  size={15}
                  color={activeState === 'verified' ? '#ffffff' : '#94a3b8'}
                />
              </View>
              <View className="flex-1 ml-3">
                <View className="flex-row items-center justify-between">
                  <Text className="font-bold text-xs text-[#131b2e]">Account Activated</Text>
                  <Text
                    className={`text-[10px] font-bold ${
                      activeState === 'verified' ? 'text-emerald-600' : 'text-slate-400'
                    }`}
                  >
                    {activeState === 'verified' ? 'Active' : 'Waiting'}
                  </Text>
                </View>
                <Text className="text-[10px] text-slate-500">
                  Emergency blood dispatch access granted
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="w-full space-y-2.5">
          <TouchableOpacity
            onPress={handlePrimaryAction}
            activeOpacity={0.9}
            className={`w-full py-3.5 px-6 rounded-2xl flex-row items-center justify-center space-x-2 shadow-md ${cur.primaryBtnColor}`}
            style={{
              shadowColor: cur.primaryBtnColor.includes('af101a') ? '#af101a' : '#0f172a',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text className="text-white font-bold text-sm mr-2">{cur.primaryBtnText}</Text>
            <VectorIcon
              name={activeState === 'verified' ? 'arrow-forward' : 'refresh'}
              size={16}
              color="#ffffff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace('/login')}
            activeOpacity={0.7}
            className="w-full py-2.5 items-center justify-center"
          >
            <Text className="text-xs font-semibold text-slate-600">Back to Login</Text>
          </TouchableOpacity>
        </View>

        {/* Security Trust Footer */}
        <View className="items-center mt-3 pt-2">
          <View className="flex-row items-center justify-center">
            <VectorIcon name="lock" size={13} color="#059669" />
            <Text className="text-[11px] text-slate-500 font-medium ml-1">
              256-Bit Encrypted Healthcare Network • HIPAA & PHC Verified
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => Alert.alert('Lifelink Dispatch', 'Connecting to 1021 Emergency Hotline...')}
            className="mt-1"
          >
            <Text className="text-[11px] text-slate-600">
              Need urgent hospital verification?{' '}
              <Text className="text-[#af101a] font-bold">Call 1021 Dispatch</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
