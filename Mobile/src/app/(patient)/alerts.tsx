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
import { VectorIcon } from '@/components/common/VectorIcon';
import { useApp } from '@/context/AppContext';

export default function PatientAlertsScreen() {
  const router = useRouter();
  const { alerts, markAllAlertsRead } = useApp();

  const [filter, setFilter] = useState<'all' | 'requests' | 'system'>('all');

  const unreadCount = alerts.filter((a) => a.unread).length;

  const filteredAlerts = alerts.filter((a) => {
    if (filter === 'all') return true;
    if (filter === 'requests') return a.type === 'emergency' || a.type === 'match';
    if (filter === 'system') return a.type === 'system' || a.type === 'verification';
    return true;
  });

  const getAlertVisuals = (type: string) => {
    switch (type) {
      case 'emergency':
        return {
          icon: 'cell-tower',
          bg: 'bg-red-50',
          color: '#af101a',
          badgeText: 'Critical Dispatch',
          badgeBg: 'bg-red-50',
          badgeColor: '#af101a',
        };
      case 'match':
        return {
          icon: 'directions-run',
          bg: 'bg-amber-50',
          color: '#d97706',
          badgeText: 'En Route',
          badgeBg: 'bg-amber-50',
          badgeColor: '#b45309',
        };
      case 'verification':
        return {
          icon: 'check-circle',
          bg: 'bg-emerald-50',
          color: '#059669',
          badgeText: 'Verified',
          badgeBg: 'bg-emerald-50',
          badgeColor: '#047857',
        };
      default:
        return {
          icon: 'shield',
          bg: 'bg-blue-50',
          color: '#2563eb',
          badgeText: 'System',
          badgeBg: 'bg-blue-50',
          badgeColor: '#1d4ed8',
        };
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f8fafc]">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader
        unreadCount={unreadCount}
        onProfilePress={() => router.push('/(patient)/profile')}
        userInitials="TM"
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Subheader */}
        <View className="px-4 pt-3.5 pb-2.5 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2.5">
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              className="w-8 h-8 rounded-full bg-white border border-slate-200 items-center justify-center shadow-sm"
            >
              <VectorIcon name="arrow-back" size={18} color="#131b2e" />
            </TouchableOpacity>

            <View className="flex-row items-center gap-2">
              <Text className="text-[17px] font-bold text-slate-900 tracking-tight">Alerts</Text>
              <View className="px-2 py-0.5 rounded-full bg-red-50 border border-red-100">
                <Text className="text-[11px] font-bold text-[#af101a]">
                  Live ({alerts.length})
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={markAllAlertsRead}
            activeOpacity={0.8}
            className="flex-row items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 border border-red-100"
          >
            <VectorIcon name="done-all" size={14} color="#af101a" />
            <Text className="text-[11.5px] font-semibold text-[#af101a]">Mark read</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Pills */}
        <View className="px-4 py-2">
          <View className="flex-row p-1 bg-slate-100 rounded-xl gap-1 border border-slate-200/60">
            {(['all', 'requests', 'system'] as const).map((tab) => {
              const isSelected = filter === tab;
              const count =
                tab === 'all'
                  ? alerts.length
                  : tab === 'requests'
                  ? alerts.filter((a) => a.type === 'emergency' || a.type === 'match').length
                  : alerts.filter((a) => a.type === 'system' || a.type === 'verification').length;

              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setFilter(tab)}
                  activeOpacity={0.8}
                  className={`flex-1 py-1.5 px-3 rounded-lg items-center justify-center ${
                    isSelected ? 'bg-white shadow-sm' : 'bg-transparent'
                  }`}
                >
                  <Text
                    className={`text-xs capitalize ${
                      isSelected ? 'font-bold text-slate-900' : 'font-medium text-slate-600'
                    }`}
                  >
                    {tab} <Text className="text-slate-400 font-normal">({count})</Text>
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Alerts Feed */}
        <View className="px-4 pt-1 space-y-2.5">
          {filteredAlerts.map((item) => {
            const visual = getAlertVisuals(item.type);
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push('/(patient)/track-request')}
                activeOpacity={0.8}
                className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm flex-row gap-3 relative"
              >
                <View
                  className={`w-10 h-10 rounded-full ${visual.bg} items-center justify-center relative`}
                >
                  <VectorIcon name={visual.icon} size={20} color={visual.color} />
                  {item.unread && (
                    <View className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#af101a] rounded-full ring-2 ring-white" />
                  )}
                </View>

                <View className="flex-1 min-w-0">
                  <View className="flex-row items-center justify-between gap-1 mb-0.5">
                    <Text className="text-xs font-bold text-slate-900 flex-1" numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text className="text-[11px] font-medium text-slate-400">{item.time}</Text>
                  </View>
                  <Text className="text-xs text-slate-500 leading-relaxed" numberOfLines={2}>
                    {item.message}
                  </Text>

                  <View className="flex-row items-center gap-2 mt-2">
                    <View className={`px-2 py-0.5 rounded-md ${visual.badgeBg}`}>
                      <Text
                        className="text-[10px] font-bold tracking-wide uppercase"
                        style={{ color: visual.badgeColor }}
                      >
                        {visual.badgeText}
                      </Text>
                    </View>
                    <Text className="text-[11px] text-slate-400 font-medium">
                      • Tap to inspect telemetry
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
