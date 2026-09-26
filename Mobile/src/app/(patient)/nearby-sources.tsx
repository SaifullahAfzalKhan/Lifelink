import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AppHeader } from '@/components/common/AppHeader';
import { VectorIcon } from '@/components/common/VectorIcon';
import { useApp } from '@/context/AppContext';

export default function NearbySourcesScreen() {
  const router = useRouter();
  const { bloodBanks } = useApp();

  const [searchQuery, setSearchQuery] = useState('Johar Town, Lahore');
  const [activeChip, setActiveChip] = useState<'all' | 'near' | '24_7' | 'b_plus'>('all');
  const [showMap, setShowMap] = useState(true);

  const filteredBanks = bloodBanks.filter((bank) => {
    if (activeChip === 'near') return parseFloat(bank.distance) < 5.0;
    if (activeChip === '24_7') return bank.timing.includes('24/7');
    if (activeChip === 'b_plus') return bank.availableGroups.includes('B+');
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-[#f8f9fd]">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppHeader
        unreadCount={2}
        onProfilePress={() => router.push('/(patient)/profile')}
        userInitials="TM"
      />

      <ScrollView
        className="flex-1 px-4 pt-3 space-y-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Subheader */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2.5">
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              className="w-8 h-8 rounded-full bg-white border border-slate-200 items-center justify-center shadow-sm"
            >
              <VectorIcon name="arrow-back" size={18} color="#131b2e" />
            </TouchableOpacity>
            <View>
              <View className="flex-row items-center gap-2">
                <Text className="text-base font-bold text-slate-900 tracking-tight">
                  Find a Blood Bank
                </Text>
                <View className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                  <Text className="text-[10px] font-bold text-emerald-700">8 Verified Nearby</Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setShowMap(!showMap)}
            className="px-2.5 py-1 rounded-full bg-white border border-slate-200 shadow-sm flex-row items-center gap-1"
          >
            <VectorIcon name={showMap ? 'list' : 'map'} size={14} color="#af101a" />
            <Text className="text-xs font-semibold text-[#af101a]">
              {showMap ? 'Hide Map' : 'Map View'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Input Bar */}
        <View className="relative flex-row items-center bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
          <VectorIcon name="search" size={18} color="#94a3b8" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search hospital, blood bank, or district..."
            placeholderTextColor="#94a3b8"
            className="flex-1 ml-2 text-xs font-medium text-slate-800"
          />
          <TouchableOpacity
            onPress={() => Alert.alert('GPS Location', 'Centered on current location: Johar Town')}
            className="px-2 py-1 bg-slate-100 rounded-md flex-row items-center gap-1"
          >
            <VectorIcon name="my-location" size={12} color="#af101a" />
            <Text className="text-[10px] font-bold text-slate-700">GPS</Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row py-1 gap-2"
        >
          {[
            { id: 'all', label: 'All (8)' },
            { id: 'near', label: '< 5 km (4)' },
            { id: '24_7', label: '24/7 Service (6)' },
            { id: 'b_plus', label: 'B+ Stock (5)' },
          ].map((chip) => {
            const isSelected = activeChip === chip.id;
            return (
              <TouchableOpacity
                key={chip.id}
                onPress={() => setActiveChip(chip.id as any)}
                className={`px-3 py-1.5 rounded-full mr-2 ${
                  isSelected ? 'bg-[#af101a] shadow-sm' : 'bg-white border border-slate-200'
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    isSelected ? 'text-white' : 'text-slate-700'
                  }`}
                >
                  {chip.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Simulated Map View Container */}
        {showMap && (
          <View className="w-full h-36 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative shadow-sm items-center justify-center p-3">
            {/* Grid pattern mock */}
            <View className="absolute inset-0 bg-blue-50/40 opacity-70" />
            <View className="flex-row items-center gap-2 bg-white/95 px-3 py-1.5 rounded-full shadow-md z-10 border border-slate-200">
              <View className="w-2.5 h-2.5 rounded-full bg-[#af101a]" />
              <Text className="text-xs font-bold text-slate-800">
                8 Centers in Lahore Region • 5 Active Now
              </Text>
            </View>
            <View className="absolute bottom-2 right-3 bg-white/90 px-2 py-0.5 rounded text-[10px] font-mono text-slate-500">
              <Text className="text-[9px]">Map Preview • OpenStreetMap</Text>
            </View>
          </View>
        )}

        {/* Blood Banks List */}
        <View className="space-y-3 pt-1">
          {filteredBanks.map((center) => (
            <View
              key={center.id}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm"
            >
              {/* Header */}
              <View className="flex-row items-start justify-between pb-2 border-b border-slate-100">
                <View className="flex-1 mr-2">
                  <View className="flex-row items-center gap-1.5">
                    <Text className="text-sm font-bold text-slate-900" numberOfLines={1}>
                      {center.name}
                    </Text>
                    <VectorIcon name="verified" size={14} color="#006444" />
                  </View>
                  <Text className="text-xs text-slate-500 mt-0.5">{center.address}</Text>
                </View>

                <View className="items-end">
                  <View className="px-2 py-0.5 rounded-full bg-slate-100">
                    <Text className="text-[11px] font-bold text-[#af101a]">
                      {center.distance}
                    </Text>
                  </View>
                  <Text className="text-[10px] text-slate-400 mt-0.5">{center.timing}</Text>
                </View>
              </View>

              {/* Stock Chips */}
              <View className="py-2.5">
                <Text className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Available Blood Groups
                </Text>
                <View className="flex-row flex-wrap gap-1.5">
                  {center.availableGroups.map((grp) => (
                    <View
                      key={grp}
                      className={`px-2.5 py-1 rounded-lg ${
                        grp === 'B+'
                          ? 'bg-[#ffdad6] border border-[#af101a]/30'
                          : 'bg-slate-100'
                      }`}
                    >
                      <Text
                        className={`text-xs font-bold ${
                          grp === 'B+' ? 'text-[#af101a]' : 'text-slate-700'
                        }`}
                      >
                        {grp}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Actions */}
              <View className="flex-row items-center justify-between pt-2 border-t border-slate-100">
                <TouchableOpacity
                  onPress={() => Alert.alert('Call Blood Bank', `Dialing ${center.phone}...`)}
                  className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100"
                >
                  <VectorIcon name="call" size={14} color="#131b2e" />
                  <Text className="text-xs font-semibold text-slate-800">Call</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      'Request Transfer',
                      `Sending blood requisition to ${center.name}...`
                    )
                  }
                  className="flex-row items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#af101a]"
                >
                  <VectorIcon name="local-hospital" size={14} color="#ffffff" />
                  <Text className="text-xs font-bold text-white">Request Transfer</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
