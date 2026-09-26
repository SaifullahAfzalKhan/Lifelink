import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { BloodGroup } from '@/context/AppContext';

interface BloodGroupBadgeProps {
  group: BloodGroup | string;
  rh?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'soft' | 'outline';
}

export const BloodGroupBadge: React.FC<BloodGroupBadgeProps> = ({
  group,
  rh = 'RH+',
  size = 'md',
  variant = 'soft',
}) => {
  const isLg = size === 'lg';
  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles.container,
        variant === 'soft' && styles.softContainer,
        variant === 'primary' && styles.primaryContainer,
        variant === 'outline' && styles.outlineContainer,
        isSm && styles.smContainer,
        isLg && styles.lgContainer,
      ]}
    >
      <Text
        style={[
          styles.groupText,
          variant === 'primary' ? styles.whiteText : styles.redText,
          isSm && styles.smText,
          isLg && styles.lgText,
        ]}
      >
        {group}
      </Text>
      {!isSm && (
        <Text
          style={[
            styles.rhText,
            variant === 'primary' ? styles.whiteSubText : styles.redSubText,
          ]}
        >
          {rh}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 44,
    minHeight: 44,
  },
  smContainer: {
    minWidth: 32,
    minHeight: 32,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  lgContainer: {
    minWidth: 54,
    minHeight: 54,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  softContainer: {
    backgroundColor: Colors.brand.redSubtle,
    borderWidth: 1,
    borderColor: Colors.brand.redBorder,
  },
  primaryContainer: {
    backgroundColor: Colors.brand.red,
  },
  outlineContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: Colors.brand.red,
  },
  groupText: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 18,
  },
  smText: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 15,
  },
  lgText: {
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 22,
  },
  rhText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 1,
  },
  redText: {
    color: Colors.brand.crimson,
  },
  whiteText: {
    color: '#ffffff',
  },
  redSubText: {
    color: Colors.brand.red,
  },
  whiteSubText: {
    color: 'rgba(255,255,255,0.85)',
  },
});
