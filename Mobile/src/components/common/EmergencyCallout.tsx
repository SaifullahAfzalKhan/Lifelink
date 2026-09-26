import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Colors } from '@/constants/theme';
import { VectorIcon } from './VectorIcon';

interface EmergencyCalloutProps {
  showTrustmark?: boolean;
}

export const EmergencyCallout: React.FC<EmergencyCalloutProps> = ({ showTrustmark = true }) => {
  const handleCall = () => {
    Linking.openURL('tel:1021').catch(() => {});
  };

  return (
    <View style={styles.container}>
      {/* Helpline strip */}
      <View style={styles.helplineBox}>
        <View style={styles.leftInfo}>
          <View style={styles.headsetIcon}>
            <Text style={{ fontSize: 13 }}>🎧</Text>
          </View>
          <Text style={styles.promptText}>Need urgent assistance?</Text>
        </View>

        <TouchableOpacity style={styles.callLink} onPress={handleCall} activeOpacity={0.7}>
          <Text style={styles.callLinkText}>Call 1021 Dispatch</Text>
          <VectorIcon name="open-in-new" type="material" size={13} color={Colors.brand.darkRed} />
        </TouchableOpacity>
      </View>

      {/* Security seal */}
      {showTrustmark && (
        <View style={styles.trustmarkRow}>
          <VectorIcon name="lock" type="material" size={12} color={Colors.status.emerald} />
          <Text style={styles.trustmarkText}>256-BIT ENCRYPTED HEALTHCARE NETWORK</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    gap: 8,
    alignItems: 'center',
  },
  helplineBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 4,
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headsetIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.surface.subtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promptText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text.secondary,
  },
  callLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  callLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.brand.darkRed,
    textDecorationLine: 'underline',
  },
  trustmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingTop: 4,
  },
  trustmarkText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: Colors.text.subtle,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
