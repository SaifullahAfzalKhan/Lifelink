import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  Share,
} from 'react-native';
import { useRouter } from 'expo-router';
import { VectorIcon } from '@/components/common/VectorIcon';
import { useApp } from '@/context/AppContext';

export default function RequestDetailsScreen() {
  const router = useRouter();
  const { requests, updateRequestStatus } = useApp();

  const [activeStatus, setActiveStatus] = useState<'open' | 'partial' | 'fulfilled' | 'closed'>('open');
  const [copied, setCopied] = useState(false);

  const request = requests[0] || {
    id: 'REQ-9482',
    bloodGroup: 'B+',
    units: 2,
    hospitalName: 'Shaukat Khanum Memorial Hospital',
    location: 'Johar Town, Lahore',
    urgency: 'Urgent (within 3-6 hrs)',
  };

  const copyRefId = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    Alert.alert('Copied', `Reference #${request.id} copied to clipboard`);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Blood Emergency: B+ Positive Needed urgently at ${request.hospitalName}. Reference #${request.id}. Contact Lifelink: 1021.`,
      });
    } catch {
      Alert.alert('Shared', 'Emergency request link copied.');
    }
  };

  const statusConfigs = {
    open: {
      badgeText: '🟢 Active Open',
      badgeBg: 'bg-[#008058]/15',
      badgeColor: '#006444',
      liveDesc: 'Active Broadcast — Matching nearby registered donors',
      bannerNote:
        'Open State: The emergency dispatch is active. Matching requests have been routed to 14 active donors within a 6km radius.',
    },
    partial: {
      badgeText: '🟠 Partially Fulfilled',
      badgeBg: 'bg-amber-100',
      badgeColor: '#d97706',
      liveDesc: '1 of 2 Units Secured — Screening second donor at blood bank',
      bannerNote:
        'Partially Fulfilled: 1 whole blood unit has arrived at the trauma wing. The emergency broadcast continues for remaining unit.',
    },
    fulfilled: {
      badgeText: '✓ Fulfilled',
      badgeBg: 'bg-emerald-100',
      badgeColor: '#059669',
      liveDesc: 'All 2 Units Supplied & Transfused successfully',
      bannerNote:
        'Fulfilled: Requirement satisfied in full. Patient safe. Blood bank has completed cross-match protocol.',
    },
    closed: {
      badgeText: '⚪ Closed',
      badgeBg: 'bg-slate-200',
      badgeColor: '#64748b',
      liveDesc: 'Request Concluded — Case resolved and archived',
      bannerNote:
        'Closed: Case closed by hospital administration. No further donors or transfers needed.',
    },
  };

  const cur = statusConfigs[activeStatus];

  return (
    <SafeAreaView className="flex-1 bg-[#faf8ff]">
      <StatusBar barStyle="dark-content" backgroundColor="#faf8ff" />
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Top Navigation Bar */}
        <View className="flex-row items-center justify-between py-3">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-full bg-slate-100 items-center justify-center"
          >
            <VectorIcon name="arrow-back" size={18} color="#131b2e" />
          </TouchableOpacity>

          <View className="items-center">
            <Text className="text-[10px] font-bold tracking-wider text-[#af101a] uppercase">
              LIFELINK RESPONSE
            </Text>
            <Text className="text-base font-bold text-[#131b2e] tracking-tight">
              Request Details
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleShare}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-full bg-slate-100 items-center justify-center"
          >
            <VectorIcon name="share" size={18} color="#131b2e" />
          </TouchableOpacity>
        </View>

        {/* Top Overview Card */}
        <View className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-3.5">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2.5">
              <View className="w-10 h-10 rounded-xl bg-[#ffdad6] items-center justify-center">
                <VectorIcon name="water-drop" size={20} color="#af101a" />
              </View>
              <View>
                <Text className="text-[10px] font-semibold uppercase tracking-wider text-[#5b403d]">
                  Blood Group
                </Text>
                <View className="flex-row items-baseline gap-1.5">
                  <Text className="text-xl font-bold text-[#af101a] leading-tight">
                    {request.bloodGroup}
                  </Text>
                  <Text className="text-xs font-medium text-[#5b403d]">Positive</Text>
                </View>
              </View>
            </View>

            <View className={`px-2.5 py-1 rounded-full ${cur.badgeBg}`}>
              <Text className="text-xs font-bold" style={{ color: cur.badgeColor }}>
                {cur.badgeText}
              </Text>
            </View>
          </View>

          <View className="flex-row gap-2.5 pt-2 border-t border-slate-100">
            <View className="flex-1 bg-slate-50 rounded-lg px-3 py-2">
              <Text className="text-[10px] font-medium text-[#5b403d] uppercase tracking-wider">
                Required Units
              </Text>
              <View className="flex-row items-baseline gap-1 mt-0.5">
                <Text className="text-sm font-bold text-[#131b2e]">{request.units} Units</Text>
                <Text className="text-[10px] text-[#5b403d]">(Whole Blood)</Text>
              </View>
            </View>

            <View className="flex-1 bg-slate-50 rounded-lg px-3 py-2 flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-[10px] font-medium text-[#5b403d] uppercase tracking-wider">
                  Reference
                </Text>
                <Text className="text-xs font-bold font-mono text-[#131b2e] mt-0.5">
                  #{request.id}
                </Text>
              </View>
              <TouchableOpacity onPress={copyRefId} className="p-1">
                <VectorIcon
                  name={copied ? 'check' : 'content-copy'}
                  size={16}
                  color={copied ? '#006444' : '#5b403d'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Clinical Specifications Card */}
        <View className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-3.5 space-y-2.5">
          <View className="flex-row items-center justify-between pb-2 border-b border-slate-100">
            <View className="flex-row items-center gap-1.5">
              <VectorIcon name="local-hospital" size={17} color="#af101a" />
              <Text className="text-sm font-bold text-[#131b2e]">Clinical Details</Text>
            </View>
            <View className="px-2 py-0.5 rounded-full bg-slate-100">
              <Text className="text-[10px] font-medium text-[#5b403d]">Hospital Verified</Text>
            </View>
          </View>

          <View className="space-y-2 text-xs">
            <View className="py-1">
              <Text className="text-[10px] font-medium uppercase tracking-wider text-[#5b403d]">
                Hospital / Facility
              </Text>
              <Text className="font-semibold text-[#131b2e] text-xs mt-0.5">
                {request.hospitalName}
              </Text>
              <Text className="text-[11px] text-[#5b403d] mt-0.5">
                {request.location} • Trauma Wing Desk
              </Text>
            </View>

            <View className="flex-row items-center justify-between py-1 border-t border-slate-50">
              <Text className="text-[10px] font-medium uppercase tracking-wider text-[#5b403d]">
                Urgency Level
              </Text>
              <View className="flex-row items-center gap-1 px-2 py-0.5 rounded bg-[#ffdad6]">
                <VectorIcon name="schedule" size={12} color="#af101a" />
                <Text className="text-[11px] font-bold text-[#af101a]">
                  Urgent (within 3-6 hrs)
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between py-1 border-t border-slate-50">
              <Text className="text-[10px] font-medium uppercase tracking-wider text-[#5b403d]">
                Verification Token
              </Text>
              <Text className="font-mono text-xs text-[#006444] font-bold">#SK-882 • Certified</Text>
            </View>

            <View className="flex-row items-center justify-between py-1 border-t border-slate-50">
              <Text className="text-[10px] font-medium uppercase tracking-wider text-[#5b403d]">
                Broadcast Status
              </Text>
              <Text className="text-xs font-semibold text-[#131b2e]">
                14 nearby donors alerted
              </Text>
            </View>

            <View className="flex-row items-center justify-between pt-1 border-t border-slate-50">
              <Text className="text-[10px] font-medium uppercase tracking-wider text-[#5b403d]">
                Created
              </Text>
              <Text className="text-xs text-[#5b403d]">Today, 14:28 PM (42m ago)</Text>
            </View>
          </View>
        </View>

        {/* Assigned Desk Card */}
        <View className="w-full bg-white rounded-xl p-3.5 shadow-sm border border-slate-100 mb-3.5 space-y-2.5">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-8 rounded-full bg-[#ffdad6] items-center justify-center">
                <VectorIcon name="support-agent" size={16} color="#af101a" />
              </View>
              <View>
                <Text className="text-[10px] font-medium text-[#5b403d] uppercase tracking-wider">
                  Assigned Desk
                </Text>
                <Text className="text-xs font-semibold text-[#131b2e]">
                  Lifelink Emergency Response
                </Text>
              </View>
            </View>
            <View className="px-2 py-0.5 rounded-full bg-[#008058]/15 flex-row items-center gap-1">
              <View className="w-1.5 h-1.5 rounded-full bg-[#006444]" />
              <Text className="text-[10px] font-bold text-[#006444]">Active</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => Alert.alert('Lifelink Dispatch', 'Connecting to 1021 Emergency Hotline...')}
            activeOpacity={0.9}
            className="w-full py-2.5 px-3 rounded-lg bg-[#af101a] flex-row items-center justify-center gap-1.5"
          >
            <VectorIcon name="call" size={15} color="#ffffff" />
            <Text className="text-white text-xs font-bold ml-1">Emergency Hotline: 1021</Text>
          </TouchableOpacity>
        </View>

        {/* State Simulator Selector */}
        <View className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm mb-4 space-y-2">
          <Text className="text-[11px] font-bold text-[#5b403d] uppercase tracking-wider">
            Simulate Status
          </Text>
          <View className="flex-row gap-1.5">
            {(['open', 'partial', 'fulfilled', 'closed'] as const).map((st) => {
              const isSelected = activeStatus === st;
              return (
                <TouchableOpacity
                  key={st}
                  onPress={() => setActiveStatus(st)}
                  className={`flex-1 py-1 px-1 rounded-lg border items-center justify-center ${
                    isSelected ? 'bg-[#ffdad6] border-[#af101a]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <Text
                    className={`text-[10px] font-bold capitalize ${
                      isSelected ? 'text-[#af101a]' : 'text-slate-600'
                    }`}
                  >
                    {st}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text className="text-[11px] text-[#5b403d] leading-tight pt-1">{cur.bannerNote}</Text>
        </View>

        {/* Navigation Actions */}
        <View className="space-y-2">
          <TouchableOpacity
            onPress={() => router.push('/(patient)/track-request')}
            activeOpacity={0.8}
            className="w-full py-3 rounded-lg bg-slate-100 flex-row items-center justify-center gap-1.5"
          >
            <VectorIcon name="navigation" size={16} color="#131b2e" />
            <Text className="text-xs font-semibold text-[#131b2e]">Back to Live Tracking</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace('/(patient)/home')}
            activeOpacity={0.7}
            className="w-full py-1.5 items-center justify-center"
          >
            <Text className="text-xs font-medium text-[#5b403d]">Return to Home Dashboard</Text>
          </TouchableOpacity>
        </View>

        <View className="items-center py-2 mt-2">
          <Text className="text-[11px] text-[#5b403d]">
            🔒 256-Bit Encrypted • HIPAA Verified
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
