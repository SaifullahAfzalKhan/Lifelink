import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { BrandLogo } from './BrandLogo';
import { VectorIcon } from './VectorIcon';
import { useApp } from '@/context/AppContext';

interface AppHeaderProps {
  showBack?: boolean;
  onBack?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ showBack = false, onBack }) => {
  const router = useRouter();
  const { role, profile, alerts } = useApp();

  const unreadCount = alerts.filter((a) => a.isUnread).length;

  const getInitials = () => {
    if (role === 'hospital') return 'SK';
    if (role === 'donor') return 'AR';
    return 'TM';
  };

  const handleNotifications = () => {
    if (role === 'patient') router.push('/(patient)/alerts');
    else if (role === 'donor') router.push('/(donor)/alerts');
    else router.push('/(hospital)/notifications');
  };

  const handleProfile = () => {
    if (role === 'patient') router.push('/(patient)/profile');
    else if (role === 'donor') router.push('/(donor)/profile');
    else router.push('/(hospital)/profile');
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftGroup}>
        {showBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack || (() => router.back())}
            activeOpacity={0.7}
          >
            <VectorIcon name="arrow-back" type="material" size={18} color={Colors.text.primary} />
          </TouchableOpacity>
        )}
        <View style={styles.logoWrapper}>
          <BrandLogo size={28} />
        </View>
        <View style={styles.brandInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.brandTitle}>Lifelink</Text>
            <View style={styles.networkBadge}>
              <Text style={styles.networkBadgeText}>PK</Text>
            </View>
          </View>
          <Text style={styles.brandSlogan}>Save Lives. Spread Smiles</Text>
        </View>
      </View>

      <View style={styles.rightGroup}>
        <TouchableOpacity
          style={styles.actionCircle}
          onPress={handleNotifications}
          activeOpacity={0.7}
          accessibilityLabel="Notifications"
        >
          <VectorIcon name="notifications" type="material" size={20} color={Colors.text.secondary} />
          {unreadCount > 0 && <View style={styles.notificationDot} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatarCircle}
          onPress={handleProfile}
          activeOpacity={0.7}
          accessibilityLabel="User Profile"
        >
          <Text style={styles.avatarText}>{getInitials()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface.cardBorderSubtle,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surface.subtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.brand.redSubtle,
    borderWidth: 1,
    borderColor: Colors.brand.redBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandInfo: {
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.brand.darkRed,
    letterSpacing: -0.2,
    lineHeight: 18,
  },
  networkBadge: {
    backgroundColor: Colors.brand.redSubtle,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: Colors.brand.redBorder,
  },
  networkBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.brand.crimson,
  },
  brandSlogan: {
    fontSize: 10.5,
    fontWeight: '500',
    color: Colors.text.muted,
    marginTop: 1,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surface.muted,
    borderWidth: 1,
    borderColor: Colors.surface.cardBorderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.brand.red,
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.brand.redSubtle,
    borderWidth: 1,
    borderColor: Colors.brand.redBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.brand.darkRed,
  },
});
