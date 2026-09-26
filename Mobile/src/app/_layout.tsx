import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { AppProvider } from '@/context/AppContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/global.css';

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reload safe */
});

const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen once mounted
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" backgroundColor="#faf8ff" />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              contentStyle: { backgroundColor: '#faf8ff' },
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="splash" />
            <Stack.Screen name="welcome" />
            <Stack.Screen name="role-selection" />
            <Stack.Screen name="login" />
            <Stack.Screen name="otp-verification" />
            <Stack.Screen name="hospital-verification" />
            <Stack.Screen name="register/patient" />
            <Stack.Screen name="register/donor" />
            <Stack.Screen name="register/hospital" />
            <Stack.Screen name="(patient)" options={{ headerShown: false }} />
            <Stack.Screen name="(donor)" options={{ headerShown: false }} />
            <Stack.Screen name="(hospital)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}
