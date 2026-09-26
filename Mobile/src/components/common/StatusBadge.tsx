import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

interface StatusBadgeProps {
  label: string;
  variant?: 'emerald' | 'amber' | 'rose' | 'blue' | 'slate';
  showPulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'emerald',
  showPulse = true,
}) => {
  const getColors = () => {
    switch (variant) {
      case 'rose':
        return {
          bg: Colors.status.roseLight,
          text: Colors.status.rose,
          border: Colors.brand.redBorder,
          dot: Colors.status.rose,
        };
      case 'amber':
        return {
          bg: Colors.status.amberLight,
          text: Colors.status.amber,
          border: Colors.status.amberBorder,
          dot: Colors.status.amber,
        };
      case 'blue':
        return {
          bg: Colors.status.blueLight,
          text: Colors.status.blue,
          border: '#bae6fd',
          dot: Colors.status.blue,
        };
      case 'slate':
        return {
          bg: Colors.surface.subtle,
          text: Colors.text.secondary,
          border: Colors.surface.cardBorder,
          dot: Colors.text.muted,
        };
      case 'emerald':
      default:
        return {
          bg: Colors.status.emeraldLight,
          text: Colors.status.emerald,
          border: Colors.status.emeraldBorder,
          dot: Colors.status.emerald,
        };
    }
  };

  const scheme = getColors();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: scheme.bg, borderColor: scheme.border },
      ]}
    >
      {showPulse && <View style={[styles.dot, { backgroundColor: scheme.dot }]} />}
      <Text style={[styles.text, { color: scheme.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: 999,
    borderWidth: 1,
    gap: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
