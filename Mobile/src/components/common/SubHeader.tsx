import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { VectorIcon } from './VectorIcon';

interface SubHeaderProps {
  title: string;
  subtitle?: string;
  networkTag?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const SubHeader: React.FC<SubHeaderProps> = ({
  title,
  subtitle,
  networkTag,
  showBack = true,
  onBack,
  rightAction,
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>
        {showBack && (
          <TouchableOpacity
            style={styles.backCircle}
            onPress={onBack || (() => router.back())}
            activeOpacity={0.7}
            accessibilityLabel="Go back"
          >
            <VectorIcon name="arrow-back" type="material" size={18} color={Colors.text.primary} />
          </TouchableOpacity>
        )}
        <View style={styles.textGroup}>
          {networkTag && <Text style={styles.networkTagText}>{networkTag}</Text>}
          <Text style={styles.titleText}>{title}</Text>
          {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
        </View>
      </View>

      {rightAction && <View style={styles.rightGroup}>{rightAction}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.surface.bg,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  backCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: Colors.surface.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textGroup: {
    flex: 1,
  },
  networkTagText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: Colors.brand.crimson,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  titleText: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text.primary,
    letterSpacing: -0.3,
  },
  subtitleText: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.text.muted,
    marginTop: 1,
  },
  rightGroup: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
