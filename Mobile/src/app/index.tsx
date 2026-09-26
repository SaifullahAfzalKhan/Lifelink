import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '@/context/AppContext';

export default function IndexScreen() {
  const router = useRouter();
  const { isAuthenticated, role } = useApp();

  useEffect(() => {
    // Check if user is already logged in, otherwise route to splash
    const timer = setTimeout(() => {
      if (isAuthenticated && role) {
        if (role === 'patient') {
          router.replace('/(patient)/home');
        } else if (role === 'donor') {
          router.replace('/(donor)/home');
        } else if (role === 'hospital') {
          router.replace('/(hospital)/home');
        } else {
          router.replace('/splash');
        }
      } else {
        router.replace('/splash');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, role, router]);

  return (
    <View className="flex-1 bg-[#faf8ff] items-center justify-center">
      <ActivityIndicator size="large" color="#af101a" />
    </View>
  );
}
