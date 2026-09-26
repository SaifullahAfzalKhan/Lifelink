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
import { AppHeader } from '@/components/common/AppHeader';
import { VectorIcon } from '@/components/common/VectorIcon';
import { BloodGroupBadge } from '@/components/common/BloodGroupBadge';
import { StatusBadge } from '@/components/common/StatusBadge';
import { EmergencyCallout } from '@/components/common/EmergencyCallout';
import { useApp } from '@/context/AppContext';

export default function PatientHomeScreen() {
  const router = useRouter();
  const { requests, alerts } = useApp();
  const unreadAlerts = alerts.filter((a) => a.unread).length;

  const activeRequest = requests[0] || {
    id: 'REQ-9482',
    bloodGroup: 'B+',
    units: 2,
    hospitalName: 'Shaukat Khanum Memorial Hospital',
    location: 'Johar Town, Lahore',
    distance: '2.4 km',
    urgency: 'urgent',
    status: 'matching',
    neededIn: 'Needed in 2 hrs',
  };

  return (
    <SafeAreaView className="flex-1 bg-[#faf8ff]">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader
        unreadCount={unreadAlerts}
        onNotificationPress={() => router.push('/(patient)/alerts')}
        onProfilePress={() => router.push('/(patient)/profile')}
        userInitials="TM"
      />

      <ScrollView
        className="flex-1 px-4 pt-3.5 space-y-3.5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Sub-Header Controls */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[17px] font-bold text-[#131b2e] leading-tight">
              Patient Dashboard
            </Text>
            <Text className="text-[11px] text-[#5b403d] font-medium">Ref: #PT-88390</Text>
          </View>
          <View className="flex-row items-center gap-1.5 bg-white border border-[#006444]/30 px-2.5 py-1 rounded-full shadow-sm">
            <View className="relative flex h-2 w-2 items-center justify-center">
              <View className="animate-ping absolute h-full w-full rounded-full bg-[#006444] opacity-75" />
              <View className="h-2 w-2 rounded-full bg-[#006444]" />
            </View>
            <Text className="text-xs font-semibold text-[#006444]">Active Requisition</Text>
          </View>
        </View>

        {/* Availability Status Card */}
        <View className="bg-white rounded-xl p-3 border border-[#e4beba]/30 shadow-sm flex-row items-center justify-between">
          <View className="flex-row items-center gap-2.5 flex-1">
            <View className="w-8 h-8 rounded-lg bg-[#008058]/10 border border-[#006444]/20 items-center justify-center">
              <VectorIcon name="radar" size={18} color="#006444" />
            </View>
            <View className="flex-1">
              <Text className="text-xs font-semibold text-[#131b2e]">
                Active Emergency Search
              </Text>
              <Text className="text-[11px] text-[#5b403d]">
                Broadcast Radius: Within 5 km radius
              </Text>
            </View>
          </View>
          <View className="bg-[#eaedff] px-2 py-0.5 rounded-md ml-2">
            <Text className="text-[11px] font-semibold text-[#5b403d]">Lahore Hub</Text>
          </View>
        </View>

        {/* Patient Info Banner */}
        <View className="bg-[#f8dcdc]/60 border border-[#e4beba]/40 rounded-xl p-3 flex-row items-start gap-2.5">
          <Text className="text-base leading-none">💡</Text>
          <View className="flex-1">
            <Text className="text-xs text-[#131b2e] leading-snug font-medium">
              <Text className="font-bold text-[#af101a]">Patient Requisition Active: </Text>
              Blood Group <Text className="font-bold">B+ Positive</Text> • 2 Units Whole Blood
              needed urgently.
            </Text>
          </View>
        </View>

        {/* High Priority Request Card */}
        <View className="bg-white rounded-2xl border border-[#e4beba]/30 p-4 shadow-sm relative overflow-hidden">
          <View className="flex-row items-center justify-between mb-3.5">
            <View className="flex-row items-center gap-1.5">
              <View className="w-2 h-2 rounded-full bg-[#af101a]" />
              <Text className="text-[11px] font-bold tracking-wide uppercase text-[#af101a]">
                Urgent Requirement
              </Text>
            </View>
            <View className="bg-[#f8dcdc] px-2 py-0.5 rounded-full">
              <Text className="text-[#af101a] text-[11px] font-bold">Needed in 2 hrs</Text>
            </View>
          </View>

          <View className="flex-row items-start gap-3 pb-3 border-b border-[#eaedff]">
            <BloodGroupBadge group="B+" rh="RH+" size="md" />
            <View className="flex-1 min-w-0">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-bold text-[#131b2e]">2 Units Required</Text>
                <StatusBadge status="matching" />
              </View>
              <Text className="text-xs text-[#5b403d] font-medium mt-0.5">
                Emergency Whole Blood
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between pt-3 pb-3.5">
            <View className="flex-row items-center gap-2 flex-1 min-w-0 mr-2">
              <View className="w-7 h-7 rounded-md bg-[#f8dcdc] items-center justify-center">
                <VectorIcon name="local-hospital" size={16} color="#af101a" />
              </View>
              <View className="flex-1 min-w-0">
                <Text className="text-xs font-semibold text-[#131b2e]" numberOfLines={1}>
                  Shaukat Khanum Blood Bank
                </Text>
                <Text className="text-[11px] text-[#5b403d]" numberOfLines={1}>
                  Emergency Wing • Johar Town (2.4 km)
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => Alert.alert('Calling Hospital Desk', 'Dialing 1021 Emergency Hotline...')}
              className="w-8 h-8 rounded-full bg-[#f2f3ff] border border-[#e4beba]/30 items-center justify-center"
            >
              <VectorIcon name="call" size={16} color="#131b2e" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/(patient)/track-request')}
            activeOpacity={0.9}
            className="w-full bg-[#af101a] py-2.5 px-4 rounded-xl flex-row items-center justify-center space-x-2 shadow-sm"
          >
            <Text className="text-white font-semibold text-xs mr-2">Track Live Request</Text>
            <VectorIcon name="arrow-forward" size={16} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions Grid */}
        <View className="flex-row gap-2.5">
          <TouchableOpacity
            onPress={() => router.push('/(patient)/nearby-sources')}
            activeOpacity={0.8}
            className="flex-1 bg-white border border-[#e4beba]/30 rounded-xl p-3 shadow-sm"
          >
            <View className="w-7 h-7 rounded-lg bg-[#f8dcdc] items-center justify-center mb-2">
              <VectorIcon name="pin-drop" size={18} color="#af101a" />
            </View>
            <Text className="text-xs font-semibold text-[#131b2e]">Find Blood Banks</Text>
            <Text className="text-[11px] text-[#5b403d] mt-0.5">8 certified within 10km</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(patient)/create-request')}
            activeOpacity={0.8}
            className="flex-1 bg-white border border-[#e4beba]/30 rounded-xl p-3 shadow-sm"
          >
            <View className="w-7 h-7 rounded-lg bg-[#eaedff] items-center justify-center mb-2">
              <VectorIcon name="add-circle" size={18} color="#af101a" />
            </View>
            <Text className="text-xs font-semibold text-[#131b2e]">Create New Request</Text>
            <Text className="text-[11px] text-[#5b403d] mt-0.5">Emergency requisition</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity Section */}
        <View className="bg-white rounded-2xl border border-[#e4beba]/30 p-4 shadow-sm">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-xs font-bold text-[#131b2e] tracking-tight">Recent Activity</Text>
            <View className="flex-row items-center gap-1">
              <VectorIcon name="verified" size={14} color="#006444" />
              <Text className="text-[11px] font-semibold text-[#006444]">Verified Log</Text>
            </View>
          </View>

          <View className="space-y-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2.5 flex-1 mr-2">
                <View className="w-7 h-7 rounded-full bg-[#008058]/10 items-center justify-center">
                  <VectorIcon name="check-circle" size={16} color="#006444" />
                </View>
                <View className="flex-1">
                  <Text className="font-medium text-[#131b2e] text-xs">Blood Request Broadcast</Text>
                  <Text className="text-[11px] text-[#5b403d]">2 Units Whole Blood • Active</Text>
                </View>
              </View>
              <Text className="text-[11px] text-[#8f6f6c] font-medium">10 mins ago</Text>
            </View>

            <View className="border-t border-[#eaedff]" />

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2.5 flex-1 mr-2">
                <View className="w-7 h-7 rounded-full bg-[#eaedff] items-center justify-center">
                  <VectorIcon name="near-me" size={16} color="#5b403d" />
                </View>
                <View className="flex-1">
                  <Text className="font-medium text-[#131b2e] text-xs">Donor Response: 1 En Route</Text>
                  <Text className="text-[11px] text-[#5b403d]">Johar Town Hub • ETA ~20m</Text>
                </View>
              </View>
              <Text className="text-[11px] text-[#8f6f6c] font-medium">Just now</Text>
            </View>
          </View>
        </View>

        {/* Helpline & Trustmark Footer */}
        <EmergencyCallout />
      </ScrollView>
    </SafeAreaView>
  );
}
