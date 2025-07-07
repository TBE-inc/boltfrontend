import React from 'react';
import { Moon, Sun, RotateCcw } from 'lucide-react';
import { Button } from '@/components/atoms/Button/Button';
import { Icon } from '@/components/atoms/Icon/Icon';
import { useTheme } from '@/hooks/useTheme';

export interface HeaderProps {
  logoUrl?: string;
  logoAlt?: string;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  onClearChat?: () => void;
  onOpenSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  logoUrl = 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=100&h=40&fit=crop',
  logoAlt = 'SaaS Logo',
  isDarkMode = false,
  onToggleDarkMode,
  onClearChat,
  onOpenSidebar,
}) => {
  const { colors, spacing, dimensions } = useTheme();

  return (
    <header
      style={{
        backgroundColor: `${colors.neutral.bgLight}80`,
        backdropFilter: 'blur(8px)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <div
        className="flex items-center max-w-4xl mx-auto relative"
        style={{ padding: `${spacing.md} ${spacing.md}` }}
      >
        {/* Left side - Hamburger menu */}
        <div className="flex items-center">
          {onOpenSidebar && (
            <button
              onClick={onOpenSidebar}
              className="p-2 rounded-lg transition-colors hover:bg-gray-100"
              title="Open menu"
              style={{
                borderRadius: dimensions.borderRadius.lg,
              }}
            >
              <img
                src="/hamburger-1.png"
                alt="Menu"
                className="w-5 h-5"
                style={{
                  filter: 'brightness(0.4)',
                }}
              />
            </button>
          )}
        </div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <img
            src={logoUrl}
            alt={logoAlt}
            className="h-8 w-auto object-contain"
            style={{
              maxHeight: '2rem',
              filter: 'brightness(1)',
            }}
          />
        </div>

        {/* Right side - Action buttons */}
        <div className="flex items-center space-x-2 ml-auto">
          {onClearChat && (
            <button
              onClick={onClearChat}
              className="p-2 rounded-lg transition-colors hover:bg-gray-100"
              title="Clear chat"
              style={{
                borderRadius: dimensions.borderRadius.lg,
              }}
            >
              <Icon icon={RotateCcw} size="sm" color={colors.neutral.textMuted} />
            </button>
          )}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg transition-colors hover:bg-gray-100"
              title="Toggle theme"
              style={{
                borderRadius: dimensions.borderRadius.lg,
              }}
            >
              <Icon
                icon={isDarkMode ? Sun : Moon}
                size="sm"
                color={colors.neutral.textMuted}
              />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};