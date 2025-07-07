export interface ColorPalette {
  accent: string;
  neutral: {
    bgLight: string;
    bgDark: string;
    textMain: string;
    textReverse: string;
    textMuted: string;
    border: string;
  };
}

export const colors: ColorPalette = {
  accent: '#6B8F71',
  neutral: {
    bgLight: '#FFFDFA',
    bgDark: '#121212',
    textMain: '#111111',
    textReverse: '#FFFFFF',
    textMuted: '#6B7280',
    border: '#E2E8F0',
  },
};

// CSS custom properties for easy integration
export const cssVariables = {
  '--color-accent': colors.accent,
  '--color-bg-light': colors.neutral.bgLight,
  '--color-bg-dark': colors.neutral.bgDark,
  '--color-text-main': colors.neutral.textMain,
  '--color-text-reverse': colors.neutral.textReverse,
  '--color-text-muted': colors.neutral.textMuted,
  '--color-border': colors.neutral.border,
} as const;