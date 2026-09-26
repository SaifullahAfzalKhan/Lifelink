import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { VectorIcon } from '@/components/common/VectorIcon';
import { useApp } from '@/context/AppContext';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] as const;

export default function CreateRequestScreen() {
  const router = useRouter();
  const { createRequest } = useApp();

  const [selectedGroup, setSelectedGroup] = useState<string>('B+');
  const [units, setUnits] = useState<number>(2);
  const [hospital, setHospital] = useState<string>('Shaukat Khanum Memorial Hospital');
  const [location, setLocation] = useState<string>('Johar Town, Lahore, Punjab, PK');
  const [urgency, setUrgency] = useState<'critical' | 'urgent' | 'standard'>('urgent');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!hospital.trim()) {
      Alert.alert('Required Field', 'Please enter or select a hospital facility.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      createRequest({
        bloodGroup: selectedGroup,
        units,
        hospitalName: hospital,
        location,
        urgency,
        notes,
      });
      setIsSubmitting(false);
      router.push('/(patient)/request-submitted');
    }, 600);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#faf8ff]">
      <StatusBar barStyle="dark-content" backgroundColor="#faf8ff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Top Application Bar */}
          <View className="py-3 flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center"
            >
              <VectorIcon name="arrow-back" size={20} color="#131b2e" />
            </TouchableOpacity>

            <View className="flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8dcdc]/60">
              <View className="w-2 h-2 rounded-full bg-[#af101a]" />
              <Text className="text-[11px] font-bold uppercase tracking-wider text-[#af101a]">
                Emergency Response
              </Text>
            </View>

            <View className="flex-row items-center gap-1 px-2.5 py-1 rounded-full bg-[#008058]/15">
              <VectorIcon name="verified-user" size={16} color="#006444" />
              <Text className="text-[11px] font-semibold text-[#006444]">Verified</Text>
            </View>
          </View>

          {/* Page Title Block */}
          <View className="pt-2 pb-4">
            <Text className="text-2xl font-bold text-[#131b2e] tracking-tight">Request Blood</Text>
            <Text className="text-xs text-[#5b403d] mt-1 leading-relaxed">
              Fill in verified patient details to immediately mobilize regional donors and hospital
              blood banks.
            </Text>
          </View>

          {/* Section 1: Blood Group Selection */}
          <View className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-sm font-bold text-[#131b2e]">
                Select Blood Group <Text className="text-[#af101a]">*</Text>
              </Text>
              <View className="bg-slate-100 px-2 py-0.5 rounded-full">
                <Text className="text-[10px] font-semibold text-[#5b403d]">Required</Text>
              </View>
            </View>

            {/* 4x2 Clean Touch Grid */}
            <View className="flex-row flex-wrap gap-2 justify-between">
              {BLOOD_GROUPS.map((group) => {
                const isSelected = selectedGroup === group;
                return (
                  <TouchableOpacity
                    key={group}
                    onPress={() => setSelectedGroup(group)}
                    activeOpacity={0.8}
                    style={{ width: '22.5%' }}
                    className={`h-12 rounded-xl items-center justify-center ${
                      isSelected
                        ? 'bg-[#ffdad6] border border-[#af101a]/30 shadow-sm'
                        : 'bg-slate-100 border border-transparent'
                    }`}
                  >
                    <View className="flex-row items-center gap-1">
                      <Text
                        className={`text-base font-bold ${
                          isSelected ? 'text-[#af101a]' : 'text-[#131b2e]'
                        }`}
                      >
                        {group}
                      </Text>
                      {isSelected && (
                        <VectorIcon name="check-circle" size={14} color="#af101a" />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text className="text-xs text-[#5b403d] text-right mt-2.5">
              Selected:{' '}
              <Text className="text-[#af101a] font-bold">
                {selectedGroup} {selectedGroup.includes('+') ? 'Positive' : 'Negative'}
              </Text>
            </Text>
          </View>

          {/* Section 2: Units Required */}
          <View className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-4 flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-bold text-[#131b2e]">Units Required</Text>
              <Text className="text-xs text-[#5b403d]">1 Unit ≈ 450-500 ml whole blood</Text>
            </View>

            <View className="flex-row items-center bg-slate-100 rounded-xl p-1">
              <TouchableOpacity
                onPress={() => setUnits(Math.max(1, units - 1))}
                activeOpacity={0.7}
                className="w-10 h-10 rounded-lg bg-white shadow-sm items-center justify-center"
              >
                <VectorIcon name="remove" size={18} color="#131b2e" />
              </TouchableOpacity>

              <Text className="w-12 text-center text-lg font-bold text-[#131b2e]">{units}</Text>

              <TouchableOpacity
                onPress={() => setUnits(Math.min(10, units + 1))}
                activeOpacity={0.7}
                className="w-10 h-10 rounded-lg bg-[#af101a] shadow-sm items-center justify-center"
              >
                <VectorIcon name="add" size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Section 3: Hospital & Medical Facility */}
          <View className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-4 space-y-3">
            <View className="flex-row items-center gap-1.5">
              <VectorIcon name="local-hospital" size={18} color="#af101a" />
              <Text className="text-sm font-bold text-[#131b2e]">
                Hospital / Medical Facility
              </Text>
            </View>

            <View className="flex-row items-center bg-slate-100 rounded-xl px-3.5 py-2.5">
              <VectorIcon name="search" size={18} color="#64748b" />
              <TextInput
                value={hospital}
                onChangeText={setHospital}
                placeholder="Search hospital (e.g. Jinnah, Shaukat Khanum)"
                placeholderTextColor="#94a3b8"
                className="flex-1 ml-2 text-sm text-[#131b2e] font-medium"
              />
            </View>

            <View className="flex-row items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
              <View className="w-9 h-9 rounded-lg bg-[#ffdad6] items-center justify-center">
                <VectorIcon name="apartment" size={18} color="#af101a" />
              </View>
              <View className="flex-1 min-w-0">
                <Text className="text-xs font-semibold text-[#131b2e]" numberOfLines={1}>
                  Emergency Wing, Block C
                </Text>
                <Text className="text-[11px] text-[#5b403d]" numberOfLines={1}>
                  7A Khayaban-e-Firdousi, Johar Town, Lahore
                </Text>
              </View>
              <VectorIcon name="verified" size={18} color="#006444" />
            </View>
          </View>

          {/* Section 4: Patient Location */}
          <View className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-4 space-y-2.5">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-1.5">
                <VectorIcon name="my-location" size={18} color="#af101a" />
                <Text className="text-sm font-bold text-[#131b2e]">Patient Location</Text>
              </View>
              <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-full bg-[#008058]/15">
                <VectorIcon name="check" size={12} color="#006444" />
                <Text className="text-[10px] font-semibold text-[#006444]">GPS Calibrated</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => Alert.alert('Edit Pin', 'GPS coordinates updated to current hospital wing.')}
              activeOpacity={0.8}
              className="flex-row items-center justify-between p-3 rounded-xl bg-slate-100"
            >
              <View className="flex-row items-center gap-2 flex-1 mr-2">
                <VectorIcon name="location-on" size={18} color="#af101a" />
                <Text className="text-xs text-[#131b2e] font-medium flex-1" numberOfLines={1}>
                  {location}
                </Text>
              </View>
              <Text className="text-xs font-bold text-[#af101a]">Edit Pin</Text>
            </TouchableOpacity>
          </View>

          {/* Section 5: Urgency Level */}
          <View className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-4 space-y-2.5">
            <View className="flex-row items-center gap-1.5 mb-1">
              <VectorIcon name="hourglass-top" size={18} color="#af101a" />
              <Text className="text-sm font-bold text-[#131b2e]">Urgency Level</Text>
            </View>

            {/* Critical */}
            <TouchableOpacity
              onPress={() => setUrgency('critical')}
              activeOpacity={0.8}
              className={`p-3 rounded-xl border flex-row items-center justify-between ${
                urgency === 'critical'
                  ? 'bg-[#ffdad6] border-[#af101a]/40'
                  : 'bg-slate-50 border-slate-200/60'
              }`}
            >
              <View className="flex-row items-center gap-2.5 flex-1">
                <View
                  className={`w-4 h-4 rounded-full border items-center justify-center ${
                    urgency === 'critical'
                      ? 'border-[#af101a] bg-white'
                      : 'border-slate-300 bg-transparent'
                  }`}
                >
                  {urgency === 'critical' && (
                    <View className="w-2 h-2 rounded-full bg-[#af101a]" />
                  )}
                </View>
                <View>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-xs font-bold text-[#131b2e]">Critical</Text>
                    <View className="px-1.5 py-0.5 rounded bg-rose-100">
                      <Text className="text-[10px] font-bold text-rose-700">Life Support</Text>
                    </View>
                  </View>
                  <Text className="text-[11px] text-[#5b403d]">Immediate (Under 1 hour)</Text>
                </View>
              </View>
              <VectorIcon name="bolt" size={18} color="#ba1a1a" />
            </TouchableOpacity>

            {/* Urgent */}
            <TouchableOpacity
              onPress={() => setUrgency('urgent')}
              activeOpacity={0.8}
              className={`p-3 rounded-xl border flex-row items-center justify-between ${
                urgency === 'urgent'
                  ? 'bg-[#ffdad6] border-[#af101a]/40'
                  : 'bg-slate-50 border-slate-200/60'
              }`}
            >
              <View className="flex-row items-center gap-2.5 flex-1">
                <View
                  className={`w-4 h-4 rounded-full border items-center justify-center ${
                    urgency === 'urgent'
                      ? 'border-[#af101a] bg-white'
                      : 'border-slate-300 bg-transparent'
                  }`}
                >
                  {urgency === 'urgent' && (
                    <View className="w-2 h-2 rounded-full bg-[#af101a]" />
                  )}
                </View>
                <View>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-xs font-bold text-[#af101a]">Urgent</Text>
                    <View className="px-1.5 py-0.5 rounded bg-[#f8dcdc]">
                      <Text className="text-[10px] font-bold text-[#af101a]">Pre-Surgery</Text>
                    </View>
                  </View>
                  <Text className="text-[11px] text-[#5b403d]">Required in 3 to 6 hours</Text>
                </View>
              </View>
              <VectorIcon name="emergency" size={18} color="#af101a" />
            </TouchableOpacity>

            {/* Standard */}
            <TouchableOpacity
              onPress={() => setUrgency('standard')}
              activeOpacity={0.8}
              className={`p-3 rounded-xl border flex-row items-center justify-between ${
                urgency === 'standard'
                  ? 'bg-[#ffdad6] border-[#af101a]/40'
                  : 'bg-slate-50 border-slate-200/60'
              }`}
            >
              <View className="flex-row items-center gap-2.5 flex-1">
                <View
                  className={`w-4 h-4 rounded-full border items-center justify-center ${
                    urgency === 'standard'
                      ? 'border-[#af101a] bg-white'
                      : 'border-slate-300 bg-transparent'
                  }`}
                >
                  {urgency === 'standard' && (
                    <View className="w-2 h-2 rounded-full bg-[#af101a]" />
                  )}
                </View>
                <View>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-xs font-bold text-[#131b2e]">Standard</Text>
                    <View className="px-1.5 py-0.5 rounded bg-slate-100">
                      <Text className="text-[10px] font-semibold text-slate-600">Elective</Text>
                    </View>
                  </View>
                  <Text className="text-[11px] text-[#5b403d]">Required within 24 hours</Text>
                </View>
              </View>
              <VectorIcon name="calendar-today" size={16} color="#64748b" />
            </TouchableOpacity>
          </View>

          {/* Section 6: Additional Notes */}
          <View className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-4 space-y-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-bold text-[#131b2e]">Additional Notes (Optional)</Text>
              <Text className="text-[11px] text-[#5b403d]">{notes.length} / 200</Text>
            </View>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              maxLength={200}
              multiline
              numberOfLines={3}
              placeholder="e.g. ICU Ward 3 Bed 12, Platelets needed, Doctor: Dr. Arshad Khan..."
              placeholderTextColor="#94a3b8"
              className="p-3 bg-slate-100 text-sm text-[#131b2e] rounded-xl min-h-[70px] text-top"
            />
          </View>

          {/* Assurance Notice */}
          <View className="bg-[#eaedff] p-3.5 rounded-xl flex-row items-start gap-2.5 mb-5">
            <VectorIcon name="info" size={18} color="#af101a" />
            <Text className="flex-1 text-xs text-[#131b2e] leading-relaxed">
              Your emergency request is immediately routed to the{' '}
              <Text className="font-bold">Shaukat Khanum Blood Bank</Text> desk for digital triage
              prior to broad donor dispatch.
            </Text>
          </View>

          {/* Submit Action */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.9}
            className="w-full bg-[#af101a] py-4 rounded-xl flex-row items-center justify-center space-x-2 shadow-md mb-2"
          >
            <Text className="text-white font-bold text-sm mr-2">
              {isSubmitting ? 'Submitting Request...' : 'Submit Blood Request'}
            </Text>
            <VectorIcon name="arrow-forward" size={18} color="#ffffff" />
          </TouchableOpacity>

          <View className="items-center py-2">
            <Text className="text-[11px] text-[#5b403d]">
              🔒 256-Bit Encrypted Healthcare Network • HIPAA Compliant
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
