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
import { VectorIcon } from '@/components/common/VectorIcon';
import { useApp } from '@/context/AppContext';

export default function TrackRequestScreen() {
  const router = useRouter();
  const { requests, updateRequestStatus } = useApp();

  const [trackState, setTrackState] = useState<'matching' | 'responding' | 'fulfilled'>('responding');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const request = requests[0] || {
    id: 'REQ-9482',
    bloodGroup: 'B+',
    units: 2,
    hospitalName: 'Shaukat Khanum Blood Bank',
    location: 'Johar Town, Lahore',
  };

  const handleStateChange = (state: 'matching' | 'responding' | 'fulfilled') => {
    setTrackState(state);
    updateRequestStatus(request.id, state);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      Alert.alert('Status Updated', 'Live donor telemetry refreshed.');
    }, 500);
  };

  const progressConfig = {
    matching: {
      unitsLabel: '0 / 2 Units',
      percent: '25%',
      note: 'Regional broadcast initiated. Scanning registered donors within 5 km radius.',
      statusBadge: 'Matching',
      statusBadgeBg: 'bg-[#ffdad6]',
      statusBadgeColor: '#af101a',
    },
    responding: {
      unitsLabel: '1 / 2 Units',
      percent: '50%',
      note: '1 registered donor accepted dispatch and is en route. 1 unit remains pending.',
      statusBadge: '1 En Route',
      statusBadgeBg: 'bg-[#ffdad6]',
      statusBadgeColor: '#af101a',
    },
    fulfilled: {
      unitsLabel: '2 / 2 Units',
      percent: '100%',
      note: 'All 2 units satisfied. Hospital cross-match completed successfully.',
      statusBadge: 'Fulfilled',
      statusBadgeBg: 'bg-emerald-50',
      statusBadgeColor: '#006444',
    },
  };

  const cur = progressConfig[trackState];

  return (
    <SafeAreaView className="flex-1 bg-[#faf8ff]">
      <StatusBar barStyle="dark-content" backgroundColor="#faf8ff" />
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Top Action & Navigation Bar */}
        <View className="flex-row items-center justify-between py-3">
          <View className="flex-row items-center gap-2.5">
            <TouchableOpacity
              onPress={() => router.replace('/(patient)/home')}
              activeOpacity={0.7}
              className="w-9 h-9 rounded-full bg-slate-100 items-center justify-center"
            >
              <VectorIcon name="arrow-back" size={18} color="#131b2e" />
            </TouchableOpacity>

            <View>
              <View className="flex-row items-center gap-2">
                <Text className="text-[17px] font-bold text-[#131b2e] tracking-tight">
                  Track Request
                </Text>
                <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdad6]">
                  <View className="w-1.5 h-1.5 rounded-full bg-[#af101a]" />
                  <Text className="text-[10px] font-bold text-[#af101a]">LIVE</Text>
                </View>
              </View>
              <Text className="text-[11px] text-[#5b403d] font-medium">Ref: #{request.id}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleRefresh}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-full bg-slate-100 items-center justify-center"
          >
            <VectorIcon
              name="sync"
              size={18}
              color="#5b403d"
            />
          </TouchableOpacity>
        </View>

        {/* Interactive State Demo Switcher */}
        <View className="bg-slate-100 p-1.5 rounded-xl flex-row items-center mb-3">
          {(['matching', 'responding', 'fulfilled'] as const).map((s) => {
            const labels = {
              matching: '1. Matching',
              responding: '2. En Route',
              fulfilled: '3. Fulfilled',
            };
            const isSelected = trackState === s;
            return (
              <TouchableOpacity
                key={s}
                onPress={() => handleStateChange(s)}
                activeOpacity={0.8}
                className={`flex-1 py-1.5 rounded-lg items-center justify-center ${
                  isSelected ? 'bg-white shadow-sm' : 'bg-transparent'
                }`}
              >
                <Text
                  className={`text-[11px] font-bold ${
                    isSelected ? 'text-[#af101a]' : 'text-slate-500'
                  }`}
                >
                  {labels[s]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Request Summary Card */}
        <View className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-3.5">
          <View className="flex-row items-center justify-between pb-3 border-b border-slate-100">
            <View className="flex-row items-center gap-3">
              <View className="w-11 h-11 rounded-lg bg-[#ffdad6] items-center justify-center">
                <Text className="text-base font-extrabold text-[#af101a] leading-none">
                  {request.bloodGroup}
                </Text>
                <Text className="text-[9px] text-[#5b403d] font-semibold mt-0.5">RH+</Text>
              </View>
              <View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-sm font-bold text-[#131b2e]">
                    {request.units} Units Required
                  </Text>
                  <View className={`px-2 py-0.5 rounded-full ${cur.statusBadgeBg}`}>
                    <Text
                      className="text-[11px] font-semibold"
                      style={{ color: cur.statusBadgeColor }}
                    >
                      {cur.statusBadge}
                    </Text>
                  </View>
                </View>
                <Text className="text-xs text-[#5b403d]">Emergency Whole Blood</Text>
              </View>
            </View>
          </View>

          {/* Hospital Row */}
          <View className="pt-2.5 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2 flex-1 mr-2">
              <VectorIcon name="local-hospital" size={17} color="#af101a" />
              <View className="flex-1">
                <Text className="text-xs font-semibold text-[#131b2e]" numberOfLines={1}>
                  {request.hospitalName}
                </Text>
                <Text className="text-[10px] text-[#5b403d]">Emergency Wing • Ward 4B</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => Alert.alert('Calling Hospital Desk', 'Connecting to 1021 hotline...')}
              className="w-7 h-7 rounded-full bg-slate-100 items-center justify-center"
            >
              <VectorIcon name="call" size={14} color="#006444" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Matched Donors Progress */}
        <View className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-3.5 space-y-2">
          <View className="flex-row items-center justify-between text-xs">
            <View className="flex-row items-center gap-1.5">
              <VectorIcon name="bloodtype" size={17} color="#af101a" />
              <Text className="font-semibold text-[#131b2e] text-xs">Matched Donors</Text>
            </View>
            <Text className="font-bold text-[#af101a] text-xs">{cur.unitsLabel}</Text>
          </View>

          <View className="w-full bg-slate-100 h-2 rounded-full overflow-hidden my-1">
            <View
              className="bg-[#af101a] h-full rounded-full"
              style={{ width: cur.percent }}
            />
          </View>

          <Text className="text-[11px] text-[#5b403d] leading-relaxed">{cur.note}</Text>
        </View>

        {/* 5-Step Realtime Progress Timeline */}
        <View className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-3.5">
          <View className="flex-row items-center justify-between pb-3">
            <Text className="text-sm font-bold text-[#131b2e]">Timeline Progress</Text>
            <View className="flex-row items-center gap-1">
              <VectorIcon name="verified" size={14} color="#006444" />
              <Text className="text-[11px] text-[#006444] font-semibold">Live Updates</Text>
            </View>
          </View>

          <View className="space-y-4">
            {/* Step 1 */}
            <View className="flex-row items-center gap-3">
              <View className="w-5 h-5 rounded-full bg-[#006444] items-center justify-center">
                <VectorIcon name="check" size={12} color="#ffffff" />
              </View>
              <View className="flex-1 flex-row items-center justify-between">
                <Text className="text-xs text-[#131b2e] font-medium">Request submitted</Text>
                <Text className="text-[10px] text-[#5b403d]">18m ago</Text>
              </View>
            </View>

            {/* Step 2 */}
            <View className="flex-row items-center gap-3">
              <View className="w-5 h-5 rounded-full bg-[#006444] items-center justify-center">
                <VectorIcon name="check" size={12} color="#ffffff" />
              </View>
              <View className="flex-1 flex-row items-center justify-between">
                <Text className="text-xs text-[#131b2e] font-medium">Hospital verified</Text>
                <Text className="text-[10px] text-[#5b403d]">12m ago</Text>
              </View>
            </View>

            {/* Step 3 */}
            <View className="flex-row items-center gap-3">
              <View
                className={`w-5 h-5 rounded-full items-center justify-center ${
                  trackState === 'fulfilled'
                    ? 'bg-[#006444]'
                    : 'bg-[#af101a]'
                }`}
              >
                {trackState === 'fulfilled' ? (
                  <VectorIcon name="check" size={12} color="#ffffff" />
                ) : (
                  <View className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </View>
              <View className="flex-1 flex-row items-center justify-between">
                <View className="flex-row items-center gap-1.5">
                  <Text className="text-xs text-[#131b2e] font-bold">Matching donors</Text>
                  <View className="px-1.5 py-0.5 rounded bg-[#ffdad6]">
                    <Text className="text-[9px] font-semibold text-[#af101a]">In Progress</Text>
                  </View>
                </View>
                <Text className="text-[10px] text-[#af101a] font-medium">Searching 5km</Text>
              </View>
            </View>

            {/* Step 4 */}
            <View className="flex-row items-center gap-3">
              <View
                className={`w-5 h-5 rounded-full items-center justify-center ${
                  trackState === 'fulfilled'
                    ? 'bg-[#006444]'
                    : trackState === 'responding'
                    ? 'bg-[#af101a]'
                    : 'bg-slate-200'
                }`}
              >
                {trackState === 'fulfilled' ? (
                  <VectorIcon name="check" size={12} color="#ffffff" />
                ) : (
                  <View
                    className={`w-1.5 h-1.5 rounded-full ${
                      trackState === 'responding' ? 'bg-white' : 'bg-slate-400'
                    }`}
                  />
                )}
              </View>
              <View className="flex-1 flex-row items-center justify-between">
                <Text
                  className={`text-xs ${
                    trackState === 'responding' || trackState === 'fulfilled'
                      ? 'text-[#131b2e] font-semibold'
                      : 'text-[#5b403d]'
                  }`}
                >
                  Donor responding
                </Text>
                <Text className="text-[10px] text-[#5b403d]">
                  {trackState === 'responding'
                    ? 'ETA ~18m'
                    : trackState === 'fulfilled'
                    ? 'Arrived'
                    : 'Pending'}
                </Text>
              </View>
            </View>

            {/* Step 5 */}
            <View className="flex-row items-center gap-3">
              <View
                className={`w-5 h-5 rounded-full items-center justify-center ${
                  trackState === 'fulfilled' ? 'bg-[#006444]' : 'bg-slate-200'
                }`}
              >
                {trackState === 'fulfilled' ? (
                  <VectorIcon name="check" size={12} color="#ffffff" />
                ) : (
                  <View className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                )}
              </View>
              <View className="flex-1 flex-row items-center justify-between">
                <Text
                  className={`text-xs ${
                    trackState === 'fulfilled'
                      ? 'text-[#006444] font-bold'
                      : 'text-[#5b403d]'
                  }`}
                >
                  Fulfilled & delivered
                </Text>
                <Text className="text-[10px] text-[#5b403d]">
                  {trackState === 'fulfilled' ? 'Completed' : '--'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Urgent Support Link */}
        <View className="flex-row items-center justify-between py-1 mb-2">
          <View className="flex-row items-center gap-1">
            <VectorIcon name="support-agent" size={16} color="#006444" />
            <Text className="text-[11px] text-[#5b403d]">Need urgent assistance?</Text>
          </View>
          <TouchableOpacity
            onPress={() => Alert.alert('Lifelink Dispatch', 'Connecting to 1021 emergency hotline...')}
          >
            <Text className="text-[11px] text-[#af101a] font-bold">Call 1021 Dispatch</Text>
          </TouchableOpacity>
        </View>

        {/* Action CTA Buttons */}
        <View className="space-y-2">
          <TouchableOpacity
            onPress={() => router.push('/(patient)/request-details')}
            activeOpacity={0.9}
            className="w-full py-3.5 px-4 rounded-xl bg-[#af101a] flex-row items-center justify-center space-x-1.5 shadow-sm"
          >
            <Text className="text-white font-bold text-xs mr-1">View Request Details</Text>
            <VectorIcon name="arrow-forward" size={16} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace('/(patient)/home')}
            activeOpacity={0.7}
            className="w-full py-2.5 rounded-xl bg-slate-100 items-center justify-center"
          >
            <Text className="text-xs font-semibold text-[#131b2e]">Return to Home</Text>
          </TouchableOpacity>
        </View>

        <View className="items-center py-2 mt-1">
          <Text className="text-[10px] font-medium tracking-wide text-slate-400">
            🔒 256-BIT ENCRYPTED HEALTHCARE NETWORK
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
