import React, { useState } from 'react';
import { ArrowLeft, Lock, LogOut } from 'lucide-react';
import { Button } from '@/components/atoms/Button/Button';
import { Icon } from '@/components/atoms/Icon/Icon';
import { useTheme } from '@/hooks/useTheme';

export interface PrivacySecuritySettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onChangePassword: () => void;
  onLogoutAllDevices: () => void;
}

export const PrivacySecuritySettings: React.FC<PrivacySecuritySettingsProps> = ({
  isOpen,
  onClose,
  onChangePassword,
  onLogoutAllDevices,
}) => {
  const { colors, spacing, dimensions, typography } = useTheme();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutAllDevices = async () => {
    setIsLoggingOut(true);
    try {
      await onLogoutAllDevices();
    } catch (error) {
      console.error('Error logging out of all devices:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const securityOptions = [
    {
      icon: Lock,
      title: 'Changer le mot de passe',
      description: 'Mettre à jour le mot de passe de votre compte',
      action: onChangePassword,
      variant: 'default' as const,
    },
    {
      icon: LogOut,
      title: 'Se déconnecter de tous les appareils',
      description: 'Se déconnecter de tous les appareils sauf celui-ci',
      action: handleLogoutAllDevices,
      variant: 'danger' as const,
      loading: isLoggingOut,
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black z-40"
        onClick={onClose}
        style={{ 
          zIndex: 40,
          opacity: 0.5,
        }}
      />
      
      {/* Bottom Drawer */}
      <div
        className="fixed bottom-0 left-0 right-0 transform transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1) z-50"
        style={{
          backgroundColor: colors.neutral.bgLight,
          borderTopLeftRadius: dimensions.borderRadius['2xl'],
          borderTopRightRadius: dimensions.borderRadius['2xl'],
          boxShadow: isOpen ? '0 -8px 25px rgba(0, 0, 0, 0.15)' : '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
          zIndex: 50,
          maxHeight: '80vh',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2 animate-fade-in">
          <div
            style={{
              width: '2rem',
              height: '0.25rem',
              backgroundColor: colors.neutral.border,
              borderRadius: dimensions.borderRadius.full,
            }}
          />
        </div>

        {/* Header */}
        <div
          className="flex items-center justify-between border-b"
          style={{
            padding: `${spacing.md} ${spacing.lg}`,
            borderBottom: `1px solid ${colors.neutral.border}`,
          }}
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-all duration-200 ease-out"
              style={{
                borderRadius: dimensions.borderRadius.lg,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.neutral.border}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Icon icon={ArrowLeft} size="sm" color={colors.neutral.textMuted} />
            </button>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: typography.fontWeights.heading2,
                fontFamily: typography.fontFamily.primary,
                color: colors.neutral.textMain,
                margin: 0,
              }}
            >
              Confidentialité et sécurité
            </h2>
          </div>
        </div>

        {/* Content */}
        <div
          className="overflow-y-auto"
          style={{
            padding: spacing.lg,
            maxHeight: 'calc(80vh - 140px)',
          }}
        >
          <div className="space-y-4">
            {securityOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.action}
                disabled={option.loading}
                className="w-full flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 ease-out"
                style={{
                  borderRadius: dimensions.borderRadius.lg,
                  textAlign: 'left',
                  backgroundColor: 'transparent',
                  border: option.variant === 'danger' ? '1px solid #fecaca' : `1px solid ${colors.neutral.border}`,
                  opacity: option.loading ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!option.loading) {
                    e.currentTarget.style.backgroundColor = option.variant === 'danger' ? '#fef2f2' : `${colors.neutral.border}40`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!option.loading) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: dimensions.borderRadius.lg,
                    backgroundColor: option.variant === 'danger' ? '#fee2e2' : colors.neutral.border,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon
                    icon={option.icon}
                    size="sm"
                    color={option.variant === 'danger' ? '#dc2626' : colors.neutral.textMuted}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    style={{
                      fontSize: '1rem',
                      fontWeight: typography.fontWeights.heading3,
                      fontFamily: typography.fontFamily.primary,
                      color: option.variant === 'danger' ? '#dc2626' : colors.neutral.textMain,
                      margin: 0,
                    }}
                  >
                    {option.loading ? 'Traitement...' : option.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: typography.fontWeights.body,
                      fontFamily: typography.fontFamily.primary,
                      color: colors.neutral.textMuted,
                      margin: 0,
                      marginTop: spacing.xs,
                    }}
                  >
                    {option.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Security Tips */}
          <div
            style={{
              marginTop: spacing.xl,
              padding: spacing.lg,
              backgroundColor: `${colors.accent}10`,
              border: `1px solid ${colors.accent}30`,
              borderRadius: dimensions.borderRadius.lg,
            }}
          >
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: typography.fontWeights.heading3,
                fontFamily: typography.fontFamily.primary,
                color: colors.neutral.textMain,
                marginBottom: spacing.sm,
              }}
            >
              Conseils de sécurité
            </h4>
            <ul className="space-y-2">
              {[
                'Utilisez un mot de passe fort et unique',
                'Activez l\'authentification à deux facteurs si disponible',
                'Vérifiez régulièrement l\'activité de votre compte',
                'Déconnectez-vous des appareils partagés ou publics',
              ].map((tip, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-2"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: typography.fontWeights.body,
                    fontFamily: typography.fontFamily.primary,
                    color: colors.neutral.textMain,
                  }}
                >
                  <span style={{ color: colors.accent, marginTop: '2px' }}>•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};