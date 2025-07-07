import React from 'react';
import { useTheme } from '@/hooks/useTheme';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  const { colors, dimensions, typography } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.accent,
          color: colors.neutral.textReverse,
          border: `1px solid ${colors.accent}`,
        };
      case 'secondary':
        return {
          backgroundColor: colors.neutral.bgLight,
          color: colors.neutral.textMain,
          border: `1px solid ${colors.neutral.border}`,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: colors.accent,
          border: `1px solid ${colors.accent}`,
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          height: dimensions.buttons.height.sm,
          padding: dimensions.buttons.padding.sm,
          fontSize: '0.875rem',
        };
      case 'md':
        return {
          height: dimensions.buttons.height.md,
          padding: dimensions.buttons.padding.md,
          fontSize: '1rem',
        };
      case 'lg':
        return {
          height: dimensions.buttons.height.lg,
          padding: dimensions.buttons.padding.lg,
          fontSize: '1.125rem',
        };
      default:
        return {};
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
        ...getVariantStyles(),
        ...getSizeStyles(),
        borderRadius: dimensions.borderRadius.md,
        fontFamily: typography.fontFamily.primary,
        fontWeight: typography.fontWeights.button,
      }}
    >
      {children}
    </button>
  );
};