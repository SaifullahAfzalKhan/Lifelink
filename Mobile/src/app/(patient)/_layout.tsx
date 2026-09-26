import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, Platform } from 'react-native';
import { VectorIcon } from '@/components/common/VectorIcon';
import { useApp } from '@/context/AppContext';

export default function PatientLayout() {
  const { alerts } = useApp();
  const unreadCount = alerts.filter((a) => a.unread).length;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f1f5f9',
          height: Platform.OS === 'ios' ? 86 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        tabBarActiveTintColor: '#af101a',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
              <VectorIcon name="home" size={22} color={color} />
              {focused && <View className="w-1 h-1 rounded-full bg-[#af101a] mt-0.5" />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: 'Requests',
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
              <VectorIcon name="assignment" size={22} color={color} />
              {focused && <View className="w-1 h-1 rounded-full bg-[#af101a] mt-0.5" />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center relative">
              <VectorIcon name="notifications" size={22} color={color} />
              {unreadCount > 0 && (
                <View className="absolute -top-1 -right-1.5 w-2.5 h-2.5 rounded-full bg-[#af101a] ring-2 ring-white" />
              )}
              {focused && <View className="w-1 h-1 rounded-full bg-[#af101a] mt-0.5" />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
              <VectorIcon name="person" size={22} color={color} />
              {focused && <View className="w-1 h-1 rounded-full bg-[#af101a] mt-0.5" />}
            </View>
          ),
        }}
      />

      {/* Hidden subroutes inside (patient) tab group so they inherit theme and back behavior */}
      <Tabs.Screen
        name="create-request"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="request-submitted"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="track-request"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="request-details"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="nearby-sources"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="edit-profile"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}
