import { Platform } from 'react-native';

export const Colors = {
  brand: {
    primary: '#af101a',
    red: '#dc2626',
    redHover: '#b91c1c',
    redLight: '#fee2e2',
    redSubtle: '#fef2f2',
    redBorder: '#fecaca',
    darkRed: '#991b1b',
    crimson: '#c62828',
  },
  surface: {
    bg: '#faf8ff',
    card: '#ffffff',
    cardBorder: '#e2e8f0',
    cardBorderSubtle: '#f1f5f9',
    muted: '#f8fafc',
    subtle: '#f1f5f9',
  },
  text: {
    primary: '#0f172a',
    secondary: '#475569',
    muted: '#64748b',
    subtle: '#94a3b8',
    white: '#ffffff',
  },
  status: {
    emerald: '#059669',
    emeraldLight: '#ecfdf3',
    emeraldBorder: '#a7f3d0',
    amber: '#d97706',
    amberLight: '#fffbeb',
    amberBorder: '#fde68a',
    rose: '#e11d48',
    roseLight: '#fff1f2',
    blue: '#0284c7',
    blueLight: '#f0f9ff',
  },
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    bold: 'System',
    heading: 'System',
  },
  android: {
    sans: 'Roboto',
    bold: 'Roboto-Bold',
    heading: 'Roboto-Bold',
  },
  default: {
    sans: 'sans-serif',
    bold: 'sans-serif',
    heading: 'sans-serif',
  },
});

export const Shadows = {
  card: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  floating: {
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 4,
  },
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
};
