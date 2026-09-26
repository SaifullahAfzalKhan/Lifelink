import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AppHeader } from '@/components/common/AppHeader';
import { BloodGroupBadge } from '@/components/common/BloodGroupBadge';
import { StatusBadge } from '@/components/common/StatusBadge';
import { VectorIcon } from '@/components/common/VectorIcon';
import { useApp } from '@/context/AppContext';

export default function PatientRequestsScreen() {
  const router = useRouter();
  const { requests, alerts } = useApp();
  const unreadAlerts = alerts.filter((a) => a.unread).length;

  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'fulfilled'>('all');

  const filteredRequests = requests.filter((r) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return r.status === 'matching' || r.status === 'responding';
    if (activeFilter === 'fulfilled') return r.status === 'fulfilled';
    return true;
  });

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
        {/* Title and Create CTA */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[17px] font-bold text-[#131b2e] tracking-tight">
              Blood Requests
            </Text>
            <Text className="text-[11px] text-[#5b403d] font-medium">
              Manage clinical requisitions
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(patient)/create-request')}
            activeOpacity={0.8}
            className="flex-row items-center gap-1 bg-[#af101a] px-3 py-1.5 rounded-full shadow-sm"
          >
            <VectorIcon name="add" size={16} color="#ffffff" />
            <Text className="text-white text-xs font-bold">New Request</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Pills */}
        <View className="flex-row p-1 bg-slate-100 rounded-xl border border-slate-200/60 gap-1">
          {(['all', 'active', 'fulfilled'] as const).map((tab) => {
            const isSelected = activeFilter === tab;
            const labels = {
              all: `All (${requests.length})`,
              active: `Active (${
                requests.filter((r) => r.status === 'matching' || r.status === 'responding').length
              })`,
              fulfilled: `Fulfilled (${
                requests.filter((r) => r.status === 'fulfilled').length
              })`,
            };
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveFilter(tab)}
                activeOpacity={0.8}
                className={`flex-1 py-1.5 rounded-lg items-center justify-center ${
                  isSelected ? 'bg-white shadow-sm' : 'bg-transparent'
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    isSelected ? 'text-[#131b2e] font-bold' : 'text-[#5b403d]'
                  }`}
                >
                  {labels[tab]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Request Cards List */}
        <View className="space-y-3 pt-1">
          {filteredRequests.map((req) => (
            <View
              key={req.id}
              className="bg-white rounded-2xl border border-[#e4beba]/30 p-4 shadow-sm"
            >
              {/* Card Header */}
              <View className="flex-row items-center justify-between pb-2.5 border-b border-slate-100">
                <View>
                  <Text className="text-[10px] uppercase font-bold text-[#5b403d] tracking-wider">
                    Ref ID
                  </Text>
                  <Text className="text-xs font-bold text-[#131b2e] font-mono">#{req.id}</Text>
                </View>
                <StatusBadge status={req.status} />
              </View>

              {/* Card Body */}
              <View className="flex-row items-center gap-3 py-3 border-b border-slate-100">
                <BloodGroupBadge group={req.bloodGroup} rh="RH+" size="md" />
                <View className="flex-1">
                  <Text className="text-sm font-bold text-[#131b2e]">
                    {req.units} Units Required
                  </Text>
                  <Text className="text-xs text-[#5b403d] font-medium mt-0.5">
                    {req.hospitalName}
                  </Text>
                  <Text className="text-[11px] text-[#8f6f6c]">{req.location}</Text>
                </View>
              </View>

              {/* Card Actions */}
              <View className="flex-row items-center justify-between pt-2.5">
                <Text className="text-[11px] text-[#5b403d] font-medium">{req.createdAt}</Text>
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={() => router.push('/(patient)/request-details')}
                    className="px-3 py-1.5 rounded-lg bg-slate-100"
                  >
                    <Text className="text-xs font-semibold text-[#131b2e]">Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => router.push('/(patient)/track-request')}
                    className="px-3 py-1.5 rounded-lg bg-[#af101a] flex-row items-center gap-1"
                  >
                    <Text className="text-xs font-bold text-white">Track</Text>
                    <VectorIcon name="arrow-forward" size={14} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
