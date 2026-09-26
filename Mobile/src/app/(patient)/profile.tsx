import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AppHeader } from '@/components/common/AppHeader';
import { VectorIcon } from '@/components/common/VectorIcon';
import { useApp } from '@/context/AppContext';

export default function PatientProfileScreen() {
  const router = useRouter();
  const { user, logout } = useApp();

  const [name, setName] = useState(user?.name || 'Tariq Mehmood');
  const [phone, setPhone] = useState(user?.phone || '+92 300 1234567');
  const [email, setEmail] = useState(user?.email || 'tariq.mehmood@example.com');
  const [location, setLocation] = useState('Johar Town, Lahore, Punjab');
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || 'B+');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSaveProfile = () => {
    setIsEditModalOpen(false);
    Alert.alert('Profile Updated', 'Your profile details have been saved.');
  };

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out of Lifelink?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f8fafc]">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader
        unreadCount={2}
        onNotificationPress={() => router.push('/(patient)/alerts')}
        userInitials="TM"
      />

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Title Row */}
        <View className="flex-row items-center justify-between py-3">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 items-center justify-center shadow-sm"
          >
            <VectorIcon name="arrow-back" size={18} color="#131b2e" />
          </TouchableOpacity>

          <View className="items-center">
            <Text className="text-base font-bold text-slate-900 leading-snug">
              Patient Profile
            </Text>
            <Text className="text-xs text-slate-500">Ref: #PT-88390</Text>
          </View>

          <TouchableOpacity
            onPress={() => setIsEditModalOpen(true)}
            activeOpacity={0.8}
            className="px-3.5 py-1 rounded-full bg-red-50 border border-red-100"
          >
            <Text className="text-xs font-semibold text-[#af101a]">Edit</Text>
          </TouchableOpacity>
        </View>

        {/* 1. Profile Identity Card */}
        <View className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-3.5">
          <View className="flex-row items-start gap-3.5">
            <View className="relative">
              <View className="w-14 h-14 rounded-full bg-red-100 items-center justify-center shadow-sm border-2 border-white">
                <Text className="text-lg font-bold text-[#af101a]">TM</Text>
              </View>
              <TouchableOpacity
                onPress={() => Alert.alert('Upload Photo', 'Choose from gallery or camera.')}
                className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#af101a] items-center justify-center shadow-sm"
              >
                <VectorIcon name="photo-camera" size={11} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View className="flex-1 min-w-0 pt-0.5">
              <View className="flex-row items-center gap-2 flex-wrap">
                <Text className="text-base font-bold text-slate-900" numberOfLines={1}>
                  {name}
                </Text>
                <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                  <VectorIcon name="check-circle" size={12} color="#047857" />
                  <Text className="text-[10px] font-semibold text-emerald-700">Verified</Text>
                </View>
              </View>
              <Text className="text-xs text-slate-500 font-medium mt-1">
                Patient / Requester •{' '}
                <Text className="font-bold text-[#af101a]">{bloodGroup}</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* 2. Assigned Desk Hotline Card */}
        <View className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-3.5 space-y-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2.5">
              <View className="w-8 h-8 rounded-full bg-red-50 items-center justify-center">
                <VectorIcon name="support-agent" size={18} color="#af101a" />
              </View>
              <View>
                <Text className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  ASSIGNED DESK
                </Text>
                <Text className="text-xs font-bold text-slate-900">
                  Lifelink Emergency Response
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
              <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <Text className="text-[11px] font-semibold text-emerald-700">Active</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => Alert.alert('Hotline', 'Dialing 1021 Dispatch...')}
            activeOpacity={0.9}
            className="w-full py-2.5 px-4 rounded-xl bg-[#af101a] flex-row items-center justify-center gap-2 shadow-sm"
          >
            <VectorIcon name="call" size={16} color="#ffffff" />
            <Text className="text-white font-medium text-xs">Emergency Hotline: 1021</Text>
          </TouchableOpacity>
        </View>

        {/* 3. Contact Details */}
        <View className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-3.5 space-y-3">
          <Text className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Contact & Clinical Credentials
          </Text>

          <View className="space-y-2.5 text-xs">
            <View className="flex-row items-center justify-between py-1 border-b border-slate-50">
              <Text className="text-slate-500">Phone</Text>
              <View className="flex-row items-center gap-1">
                <Text className="font-semibold text-slate-800">{phone}</Text>
                <VectorIcon name="verified" size={14} color="#006444" />
              </View>
            </View>

            <View className="flex-row items-center justify-between py-1 border-b border-slate-50">
              <Text className="text-slate-500">Email</Text>
              <Text className="font-semibold text-slate-800">{email}</Text>
            </View>

            <View className="flex-row items-center justify-between py-1 border-b border-slate-50">
              <Text className="text-slate-500">Primary Location</Text>
              <Text className="font-semibold text-slate-800">{location}</Text>
            </View>

            <View className="flex-row items-center justify-between pt-1">
              <Text className="text-slate-500">CNIC / ID</Text>
              <Text className="font-mono font-semibold text-slate-800">35202-*******-1</Text>
            </View>
          </View>
        </View>

        {/* 4. Actions & Logout */}
        <View className="space-y-2.5">
          <TouchableOpacity
            onPress={() => router.push('/(patient)/requests')}
            activeOpacity={0.8}
            className="w-full py-3 rounded-xl bg-white border border-slate-200 flex-row items-center justify-between px-4 shadow-sm"
          >
            <View className="flex-row items-center gap-2">
              <VectorIcon name="history" size={18} color="#af101a" />
              <Text className="text-xs font-semibold text-slate-800">
                View Requisition History
              </Text>
            </View>
            <VectorIcon name="arrow-forward" size={16} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.8}
            className="w-full py-3 rounded-xl bg-white border border-red-200 flex-row items-center justify-center gap-2 shadow-sm"
          >
            <VectorIcon name="logout" size={16} color="#af101a" />
            <Text className="text-xs font-bold text-[#af101a]">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={isEditModalOpen} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-5 space-y-4">
            <View className="flex-row items-center justify-between pb-2 border-b border-slate-100">
              <Text className="text-base font-bold text-slate-900">Edit Profile</Text>
              <TouchableOpacity onPress={() => setIsEditModalOpen(false)}>
                <VectorIcon name="close" size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View>
              <Text className="text-xs font-bold text-slate-700 mb-1">Full Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                className="bg-slate-100 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-medium"
              />
            </View>

            <View>
              <Text className="text-xs font-bold text-slate-700 mb-1">Phone Number</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                className="bg-slate-100 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-medium"
              />
            </View>

            <View>
              <Text className="text-xs font-bold text-slate-700 mb-1">Location</Text>
              <TextInput
                value={location}
                onChangeText={setLocation}
                className="bg-slate-100 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-medium"
              />
            </View>

            <TouchableOpacity
              onPress={handleSaveProfile}
              activeOpacity={0.9}
              className="w-full bg-[#af101a] py-3 rounded-xl items-center justify-center shadow-md"
            >
              <Text className="text-white font-bold text-xs">Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
