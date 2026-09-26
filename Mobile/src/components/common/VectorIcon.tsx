import React from 'react';
import { MaterialCommunityIcons, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

export type IconType = 'ion' | 'material' | 'material-community' | 'feather';

interface VectorIconProps {
  name: string;
  type?: IconType;
  size?: number;
  color?: string;
}

export const VectorIcon: React.FC<VectorIconProps> = ({
  name,
  type = 'material',
  size = 20,
  color = Colors.text.primary,
}) => {
  switch (type) {
    case 'ion':
      return <Ionicons name={name as any} size={size} color={color} />;
    case 'feather':
      return <Feather name={name as any} size={size} color={color} />;
    case 'material-community':
      return <MaterialCommunityIcons name={name as any} size={size} color={color} />;
    case 'material':
    default:
      return <MaterialIcons name={name as any} size={size} color={color} />;
  }
};
