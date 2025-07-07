import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export interface IconProps {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  color,
  className = '',
}) => {
  const { dimensions, colors } = useTheme();

  const getSize = () => {
    return dimensions.icons[size];
  };

  return (
    <IconComponent
      size={getSize()}
      color={color || colors.neutral.textMain}
      className={className}
    />
  );
};