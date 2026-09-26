import React from 'react';
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

export default function RequestSubmittedScreen() {
  const router = useRouter();
  const { requests } = useApp();
  const latestRequest = requests[0] || {
    id: 'REQ-9482',
    bloodGroup: 'B+',
    units: 2,
    hospitalName: 'Shaukat Khanum Blood Bank',
  };

  return (
    <SafeAreaView className="flex-1 bg-[#faf8ff]">
      <StatusBar barStyle="dark-content" backgroundColor="#faf8ff" />
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Top Header Bar */}
        <View className="flex-row items-center justify-between py-3">
          <TouchableOpacity
            onPress={() => router.replace('/(patient)/home')}
            activeOpacity={0.7}
            className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center"
          >
            <VectorIcon name="close" size={20} color="#131b2e" />
          </TouchableOpacity>

          <View className="flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100">
            <BrandLogo size={18} />
            <Text className="text-[11px] uppercase tracking-wider text-[#5b403d] font-semibold">
              Lifelink • Save Lives. Spread Smiles
            </Text>
          </View>

          <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center">
            <VectorIcon name="verified-user" size={20} color="#006444" />
          </View>
        </View>

        {/* Hero Reassurance */}
        <View className="items-center text-center my-4">
          <View className="mb-3 p-3 rounded-full bg-white shadow-md">
            <BrandLogo size={56} />
          </View>
          <Text className="text-2xl font-bold text-[#131b2e] mb-1">Request Submitted</Text>
          <Text className="text-sm text-[#5b403d] max-w-xs text-center leading-relaxed">
            Your emergency blood request has been sent for hospital verification.
          </Text>
        </View>

        {/* Card 1: Clean Request Summary */}
        <View className="bg-white rounded-xl p-4 shadow-sm mb-4 border border-slate-100">
          <View className="flex-row items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <View>
              <Text className="text-[11px] uppercase tracking-wider text-[#5b403d] block mb-0.5">
                Save lives, spread smiles
              </Text>
              <Text className="text-lg text-[#131b2e] font-bold tracking-tight">
                #{latestRequest.id}
              </Text>
            </View>
            <View className="flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8dcdc]">
              <View className="w-1.5 h-1.5 rounded-full bg-[#af101a]" />
              <Text className="text-xs font-semibold text-[#af101a]">Under Review</Text>
            </View>
          </View>

          <View className="flex-row justify-between pt-1">
            <View className="flex-1">
              <Text className="text-[11px] text-[#5b403d] mb-0.5">Blood Group</Text>
              <View className="flex-row items-baseline gap-1.5">
                <Text className="text-xl text-[#af101a] font-bold">
                  {latestRequest.bloodGroup}
                </Text>
                <Text className="text-xs text-[#5b403d] font-medium">
                  ({latestRequest.units} Units)
                </Text>
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-[11px] text-[#5b403d] mb-0.5">Assigned Facility</Text>
              <Text className="text-xs text-[#131b2e] font-semibold" numberOfLines={1}>
                {latestRequest.hospitalName}
              </Text>
              <Text className="text-[11px] text-[#5b403d]">Blood Bank Desk</Text>
            </View>
          </View>
        </View>

        {/* Card 2: Simple Visual Timeline */}
        <View className="bg-white rounded-xl p-4 shadow-sm mb-5 border border-slate-100">
          <Text className="text-[11px] uppercase tracking-wider text-[#5b403d] font-semibold mb-3">
            Processing Stages
          </Text>
          <View className="space-y-4">
            {/* Stage 1 */}
            <View className="flex-row items-center gap-3">
              <View className="w-7 h-7 rounded-full bg-[#006444] items-center justify-center">
                <VectorIcon name="check" size={16} color="#ffffff" />
              </View>
              <View className="flex-1 flex-row items-center justify-between">
                <Text className="text-xs text-[#131b2e] font-semibold">Submitted & Logged</Text>
                <Text className="text-xs text-[#006444] font-semibold">Done</Text>
              </View>
            </View>

            {/* Stage 2 */}
            <View className="flex-row items-center gap-3">
              <View className="w-7 h-7 rounded-full bg-[#af101a] items-center justify-center">
                <VectorIcon name="sync" size={16} color="#ffffff" />
              </View>
              <View className="flex-1 flex-row items-center justify-between">
                <Text className="text-xs text-[#af101a] font-semibold">Hospital Verification</Text>
                <View className="px-2 py-0.5 rounded-full bg-[#ffdad6]">
                  <Text className="text-[11px] text-[#af101a] font-bold">In Progress</Text>
                </View>
              </View>
            </View>

            {/* Stage 3 */}
            <View className="flex-row items-center gap-3 opacity-60">
              <View className="w-7 h-7 rounded-full bg-slate-100 items-center justify-center">
                <VectorIcon name="podcasts" size={16} color="#5b403d" />
              </View>
              <View className="flex-1 flex-row items-center justify-between">
                <Text className="text-xs text-[#5b403d] font-medium">Donor Broadcast</Text>
                <Text className="text-xs text-[#8f6f6c]">Next step</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Emergency Hotline Strip */}
        <View className="items-center mb-6">
          <TouchableOpacity
            onPress={() => Alert.alert('Lifelink Dispatch', 'Calling emergency line 1021...')}
            className="flex-row items-center gap-1"
          >
            <Text className="text-xs text-[#5b403d]">Need emergency assistance right now?</Text>
            <Text className="text-xs text-[#af101a] font-bold ml-1">Call 1021</Text>
            <VectorIcon name="call" size={14} color="#af101a" />
          </TouchableOpacity>
        </View>

        {/* Bottom Actions */}
        <View className="space-y-2.5">
          <TouchableOpacity
            onPress={() => router.push('/(patient)/track-request')}
            activeOpacity={0.9}
            className="w-full py-3.5 px-4 rounded-xl bg-[#af101a] flex-row items-center justify-center space-x-2 shadow-md"
          >
            <Text className="text-white font-bold text-sm mr-2">Track Request Status</Text>
            <VectorIcon name="arrow-forward" size={18} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace('/(patient)/home')}
            activeOpacity={0.7}
            className="py-2.5 items-center justify-center"
          >
            <Text className="text-xs font-semibold text-[#5b403d]">Return to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
