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
import { BrandLogo } from '@/components/common/BrandLogo';
import { VectorIcon } from '@/components/common/VectorIcon';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

export default function RegisterHospitalScreen() {
  const router = useRouter();
  const { setHospitalVerificationState } = useApp();

  const [orgName, setOrgName] = useState('Shaukat Khanum Memorial Hospital');
  const [orgType, setOrgType] = useState<'hospital' | 'blood_bank'>('hospital');
  const [email, setEmail] = useState('admin@hospital.org');
  const [phone, setPhone] = useState('300 1234567');
  const [licenseNo, setLicenseNo] = useState('PHC-REG-2024-8921');
  const [contactPerson, setContactPerson] = useState('Dr. Salman Tariq (Director)');
  const [city, setCity] = useState('Lahore, Punjab');
  const [address, setAddress] = useState('7-A Block R-3, Johar Town');
  const [password, setPassword] = useState('HospitalPass123!');
  const [confirmPassword, setConfirmPassword] = useState('HospitalPass123!');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Documents list
  const [documents, setDocuments] = useState([
    { id: '1', name: 'PHC_Healthcare_License_2024.pdf', type: 'Registration / License', size: '2.4 MB' },
    { id: '2', name: 'Govt_Clinical_Affiliation_NOC.pdf', type: 'Regulatory Document', size: '1.8 MB' },
  ]);

  const handleRegister = () => {
    if (!orgName.trim() || !email.trim() || !phone.trim() || !licenseNo.trim()) {
      Alert.alert('Required Fields', 'Please fill in all required organization credentials.');
      return;
    }
    if (!agreedTerms) {
      Alert.alert('Terms Required', 'Please confirm you agree to the healthcare terms of service.');
      return;
    }

    // Set initial verification state to pending
    setHospitalVerificationState('pending');
    // Navigate to hospital-verification screen
    router.push('/hospital-verification');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#faf9fc]">
      <StatusBar barStyle="dark-content" backgroundColor="#faf9fc" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Header Bar */}
          <View className="flex-row items-center justify-between pt-3 pb-4">
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              className="w-10 h-10 rounded-full bg-white items-center justify-center border border-slate-100 shadow-sm"
            >
              <VectorIcon name="arrow-back" size={20} color="#475569" />
            </TouchableOpacity>

            {/* Centered Brand Badge */}
            <View className="flex-row items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/70 shadow-sm">
              <BrandLogo size={24} />
              <View>
                <Text className="text-xs font-extrabold text-[#0f172a] leading-tight">Lifelink</Text>
                <Text className="text-[9px] font-semibold text-[#af101a] leading-none">
                  Save Lives. Spread Smiles
                </Text>
              </View>
            </View>

            <View className="w-10 h-10 items-center justify-center">
              <VectorIcon name="shield" size={20} color="#94a3b8" />
            </View>
          </View>

          {/* Title & Subtitle */}
          <View className="items-center text-center mt-1 mb-5">
            <Text className="text-2xl font-extrabold text-[#0f172a] tracking-tight text-center">
              Register Hospital / Blood Bank
            </Text>
            <Text className="text-xs text-slate-500 mt-1 max-w-[280px] text-center leading-relaxed">
              Create your organization account for verified blood request management.
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            {/* Organization Name */}
            <View>
              <Text className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Organization Name
              </Text>
              <View className="flex-row items-center bg-white rounded-2xl border border-slate-200 px-3.5 py-3 shadow-sm">
                <VectorIcon name="business" size={18} color="#94a3b8" />
                <TextInput
                  value={orgName}
                  onChangeText={setOrgName}
                  placeholder="e.g. Shaukat Khanum Memorial Hospital"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 ml-2.5 text-sm text-slate-900 font-medium"
                />
              </View>
            </View>

            {/* Organization Type Selector */}
            <View>
              <Text className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Organization Type
              </Text>
              <View className="flex-row p-1 bg-slate-100 rounded-2xl border border-slate-200/80 gap-1.5">
                <TouchableOpacity
                  onPress={() => setOrgType('hospital')}
                  activeOpacity={0.8}
                  className={`flex-1 flex-row items-center justify-center py-2.5 px-3 rounded-xl ${
                    orgType === 'hospital' ? 'bg-[#af101a] shadow-sm' : 'bg-transparent'
                  }`}
                >
                  <VectorIcon
                    name="local-hospital"
                    size={16}
                    color={orgType === 'hospital' ? '#ffffff' : '#64748b'}
                  />
                  <Text
                    className={`ml-1.5 text-xs font-bold ${
                      orgType === 'hospital' ? 'text-white' : 'text-slate-700'
                    }`}
                  >
                    Hospital
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setOrgType('blood_bank')}
                  activeOpacity={0.8}
                  className={`flex-1 flex-row items-center justify-center py-2.5 px-3 rounded-xl ${
                    orgType === 'blood_bank' ? 'bg-[#af101a] shadow-sm' : 'bg-transparent'
                  }`}
                >
                  <VectorIcon
                    name="bloodtype"
                    size={16}
                    color={orgType === 'blood_bank' ? '#ffffff' : '#64748b'}
                  />
                  <Text
                    className={`ml-1.5 text-xs font-bold ${
                      orgType === 'blood_bank' ? 'text-white' : 'text-slate-600'
                    }`}
                  >
                    Blood Bank
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Official Email */}
            <View>
              <Text className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Official Email Address
              </Text>
              <View className="flex-row items-center bg-white rounded-2xl border border-slate-200 px-3.5 py-3 shadow-sm">
                <VectorIcon name="mail" size={18} color="#94a3b8" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="admin@hospital.org"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="flex-1 ml-2.5 text-sm text-slate-900 font-medium"
                />
              </View>
            </View>

            {/* Phone Number */}
            <View>
              <Text className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Phone Number
              </Text>
              <View className="flex-row items-center bg-white rounded-2xl border border-slate-200 px-3.5 py-3 shadow-sm">
                <View className="flex-row items-center pr-2.5 border-r border-slate-200">
                  <Text className="text-base mr-1">🇵🇰</Text>
                  <Text className="text-sm font-semibold text-slate-800">+92</Text>
                </View>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="300 1234567"
                  placeholderTextColor="#94a3b8"
                  keyboardType="phone-pad"
                  className="flex-1 ml-2.5 text-sm text-slate-900 font-medium tracking-wide"
                />
                <View className="w-5 h-5 rounded-full bg-emerald-500 items-center justify-center">
                  <VectorIcon name="check" size={12} color="#ffffff" />
                </View>
              </View>
            </View>

            {/* License Number */}
            <View>
              <Text className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Registration / License Number
              </Text>
              <View className="flex-row items-center bg-white rounded-2xl border border-slate-200 px-3.5 py-3 shadow-sm">
                <VectorIcon name="badge" size={18} color="#94a3b8" />
                <TextInput
                  value={licenseNo}
                  onChangeText={setLicenseNo}
                  placeholder="e.g. PHC-REG-2024-8921"
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="characters"
                  className="flex-1 ml-2.5 text-sm text-slate-900 font-medium"
                />
              </View>
            </View>

            {/* Contact Person Name */}
            <View>
              <Text className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Contact Person Name & Designation
              </Text>
              <View className="flex-row items-center bg-white rounded-2xl border border-slate-200 px-3.5 py-3 shadow-sm">
                <VectorIcon name="person" size={18} color="#94a3b8" />
                <TextInput
                  value={contactPerson}
                  onChangeText={setContactPerson}
                  placeholder="e.g. Dr. Salman Tariq (Director)"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 ml-2.5 text-sm text-slate-900 font-medium"
                />
              </View>
            </View>

            {/* City / Location */}
            <View>
              <Text className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                City / Location
              </Text>
              <View className="flex-row items-center bg-white rounded-2xl border border-slate-200 px-3.5 py-2.5 shadow-sm">
                <VectorIcon name="location-on" size={18} color="#af101a" />
                <TextInput
                  value={city}
                  onChangeText={setCity}
                  placeholder="e.g. Lahore, Punjab"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 ml-2 text-sm text-slate-900 font-medium"
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100"
                >
                  <Text className="text-[11px] font-extrabold text-[#af101a]">GPS</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Complete Address */}
            <View>
              <Text className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Complete Address
              </Text>
              <View className="flex-row items-center bg-white rounded-2xl border border-slate-200 px-3.5 py-3 shadow-sm">
                <VectorIcon name="home" size={18} color="#94a3b8" />
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  placeholder="e.g. 7-A Block R-3, Johar Town"
                  placeholderTextColor="#94a3b8"
                  className="flex-1 ml-2.5 text-sm text-slate-900 font-medium"
                />
              </View>
            </View>

            {/* Password Fields */}
            <View className="flex-row gap-2.5">
              <View className="flex-1">
                <Text className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Password
                </Text>
                <View className="flex-row items-center bg-white rounded-2xl border border-slate-200 px-3 py-3 shadow-sm">
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry={!showPassword}
                    className="flex-1 text-sm text-slate-900 font-medium"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <VectorIcon
                      name={showPassword ? 'visibility-off' : 'visibility'}
                      size={16}
                      color="#94a3b8"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="flex-1">
                <Text className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Confirm Password
                </Text>
                <View className="flex-row items-center bg-white rounded-2xl border border-slate-200 px-3 py-3 shadow-sm">
                  <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="••••••••"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry={!showPassword}
                    className="flex-1 text-sm text-slate-900 font-medium"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <VectorIcon
                      name={showPassword ? 'visibility-off' : 'visibility'}
                      size={16}
                      color="#94a3b8"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Verification Documents Section */}
            <View className="pt-2 space-y-2">
              <View>
                <Text className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Verification Documents
                </Text>
                <Text className="text-[11px] text-slate-500 leading-tight mt-0.5">
                  Upload official documents required to verify your organization.
                </Text>
              </View>

              {documents.map((doc) => (
                <View
                  key={doc.id}
                  className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex-row items-center justify-between"
                >
                  <View className="flex-row items-center space-x-2.5 flex-1 mr-2">
                    <View className="w-9 h-9 rounded-xl bg-rose-50 items-center justify-center">
                      <VectorIcon name="description" size={20} color="#af101a" />
                    </View>
                    <View className="flex-1 ml-2.5">
                      <View className="flex-row items-center gap-1.5">
                        <Text className="text-xs font-bold text-slate-800 flex-1" numberOfLines={1}>
                          {doc.name}
                        </Text>
                        <Text className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                          ✓
                        </Text>
                      </View>
                      <Text className="text-[10px] text-slate-400 mt-0.5">
                        {doc.type} • {doc.size}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <TouchableOpacity
                      onPress={() => Alert.alert('Replace File', `Upload new file for ${doc.type}`)}
                      className="px-1 py-0.5"
                    >
                      <Text className="text-[11px] font-semibold text-[#af101a]">Replace</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              {/* Upload Additional Doc Box */}
              <TouchableOpacity
                onPress={() =>
                  Alert.alert('Upload Document', 'Select document (PDF/PNG up to 10MB)')
                }
                activeOpacity={0.8}
                className="border-2 border-dashed border-slate-200 bg-white rounded-2xl p-3 flex-row items-center justify-between"
              >
                <View className="flex-row items-center">
                  <View className="w-9 h-9 rounded-xl bg-slate-100 items-center justify-center">
                    <VectorIcon name="add" size={18} color="#64748b" />
                  </View>
                  <View className="ml-2.5">
                    <Text className="text-xs font-bold text-slate-700">
                      Additional Supporting Document
                    </Text>
                    <Text className="text-[10px] text-slate-400">
                      Optional • Upload document (PDF/PNG)
                    </Text>
                  </View>
                </View>
                <View className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                  <Text className="text-[11px] font-semibold text-slate-600">Upload</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Terms Checkbox */}
            <TouchableOpacity
              onPress={() => setAgreedTerms(!agreedTerms)}
              activeOpacity={0.8}
              className="flex-row items-start space-x-2.5 pt-2"
            >
              <View
                className={`w-4 h-4 rounded border mt-0.5 items-center justify-center ${
                  agreedTerms ? 'bg-[#af101a] border-[#af101a]' : 'border-slate-300 bg-white'
                }`}
              >
                {agreedTerms && <VectorIcon name="check" size={12} color="#ffffff" />}
              </View>
              <Text className="flex-1 ml-2 text-xs text-slate-600 leading-snug">
                I confirm this organization is a legally registered healthcare facility & agree to
                the{' '}
                <Text className="text-[#af101a] font-semibold">Terms of Service</Text> &{' '}
                <Text className="text-[#af101a] font-semibold">Healthcare Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleRegister}
              activeOpacity={0.9}
              className="w-full bg-[#af101a] py-3.5 px-6 rounded-2xl flex-row items-center justify-center space-x-2 shadow-lg mt-2"
              style={{
                shadowColor: '#af101a',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 10,
                elevation: 4,
              }}
            >
              <Text className="text-white font-bold text-sm mr-2">Submit for Verification</Text>
              <VectorIcon name="arrow-forward" size={16} color="#ffffff" />
            </TouchableOpacity>

            <View className="flex-row items-center justify-center space-x-1 py-1">
              <Text className="text-emerald-600 text-xs font-bold mr-1">✓</Text>
              <Text className="text-[11px] font-medium text-slate-500 text-center">
                Your organization will be reviewed before receiving verified requests.
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View className="mt-5 items-center space-y-3">
            <TouchableOpacity onPress={() => router.push('/login')} activeOpacity={0.7}>
              <Text className="text-xs text-slate-600">
                Already registered?{' '}
                <Text className="font-bold text-[#af101a]">Sign In</Text>
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center justify-center space-x-1.5 mt-2">
              <VectorIcon name="lock" size={13} color="#94a3b8" />
              <Text className="text-slate-400 text-[11px] font-medium ml-1">
                🔒 256-Bit Encrypted Healthcare Network • HIPAA & PHC Verified
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
