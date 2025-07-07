import React from 'react';
import { X, User, Settings, CreditCard, LogOut, Shield, Bell, HelpCircle } from 'lucide-react';
import { Icon } from '@/components/atoms/Icon/Icon';
import { useTheme } from '@/hooks/useTheme';

export interface AccountSettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userEmail?: string;
  isPlusUser?: boolean;
  onEditProfile?: () => void;
  onManageSubscription?: () => void;
  onPrivacySettings?: () => void;
  onNotificationSettings?: () => void;
  onHelp?: () => void;
  onLogout?: () => void;
}

export const AccountSettingsDrawer: React.FC<AccountSettingsDrawerProps> = ({
  isOpen,
  onClose,
  userName = "User",
  userEmail = "user@example.com",
  isPlusUser = false,
  onEditProfile,
  onManageSubscription,
  onPrivacySettings,
  onNotificationSettings,
  onHelp,
  onLogout,
}) => {
  const { colors, spacing, dimensions, typography } = useTheme();

  if (!isOpen) return null;

  const settingsOptions = [
    {
      icon: User,
      label: 'Modifier le profil',
      description: 'Mettre à jour vos informations personnelles',
      onClick: onEditProfile,
    },
    {
      icon: CreditCard,
      label: 'Gérer l\'abonnement',
      description: isPlusUser ? 'Gérer votre abonnement Plus' : 'Passer à Plus',
      onClick: onManageSubscription,
      highlight: !isPlusUser,
    },
    {
      icon: Shield,
      label: 'Confidentialité et sécurité',
      description: 'Contrôler vos paramètres de confidentialité',
      onClick: onPrivacySettings,
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Gérer les préférences de notification',
      onClick: onNotificationSettings,
    },
    {
      icon: HelpCircle,
      label: 'Aide et support',
      description: 'Obtenir de l\'aide et contacter le support',
      onClick: onHelp,
    },
  ];

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
          <div>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: typography.fontWeights.heading2,
                fontFamily: typography.fontFamily.primary,
                color: colors.neutral.textMain,
                margin: 0,
              }}
            >
              Paramètres du compte
            </h2>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100"
            aria-label="Fermer les paramètres"
            style={{
              borderRadius: dimensions.borderRadius.lg,
            }}
          >
            <Icon icon={X} size="sm" color={colors.neutral.textMuted} />
          </button>
        </div>

        {/* User Info Section */}
        <div
          style={{
            padding: spacing.lg,
            borderBottom: `1px solid ${colors.neutral.border}`,
          }}
        >
          <div className="flex items-center space-x-4">
            {/* Avatar */}
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: dimensions.borderRadius.full,
                backgroundColor: colors.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon icon={User} size="lg" color={colors.neutral.textReverse} />
            </div>

            {/* User Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: typography.fontWeights.heading3,
                    fontFamily: typography.fontFamily.primary,
                    color: colors.neutral.textMain,
                    margin: 0,
                  }}
                >
                  {userName}
                </h3>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: typography.fontWeights.caption,
                    color: isPlusUser ? colors.accent : colors.neutral.textMuted,
                    backgroundColor: isPlusUser ? `${colors.accent}20` : colors.neutral.border,
                    padding: '2px 6px',
                    borderRadius: dimensions.borderRadius.sm,
                    textTransform: 'uppercase',
                  }}
                >
                  {isPlusUser ? 'PLUS' : 'FREE'}
                </span>
              </div>
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
                {userEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Settings Options */}
        <div
          className="overflow-y-auto"
          style={{
            padding: spacing.md,
            maxHeight: 'calc(80vh - 200px)',
          }}
        >
          <div className="space-y-2">
            {settingsOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.onClick}
                className="w-full flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 ease-out"
                style={{
                  borderRadius: dimensions.borderRadius.lg,
                  textAlign: 'left',
                  backgroundColor: option.highlight ? `${colors.accent}10` : 'transparent',
                  border: option.highlight ? `1px solid ${colors.accent}30` : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!option.highlight) {
                    e.currentTarget.style.backgroundColor = `${colors.neutral.border}40`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!option.highlight) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: dimensions.borderRadius.lg,
                    backgroundColor: option.highlight ? colors.accent : colors.neutral.border,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon
                    icon={option.icon}
                    size="sm"
                    color={option.highlight ? colors.neutral.textReverse : colors.neutral.textMuted}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    style={{
                      fontSize: '1rem',
                      fontWeight: typography.fontWeights.heading3,
                      fontFamily: typography.fontFamily.primary,
                      color: option.highlight ? colors.accent : colors.neutral.textMain,
                      margin: 0,
                    }}
                  >
                    {option.label}
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
        </div>

        {/* Logout Button */}
        <div
          className="border-t"
          style={{
            padding: spacing.lg,
            borderTop: `1px solid ${colors.neutral.border}`,
          }}
        >
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-3 p-3 rounded-lg transition-colors hover:bg-red-50"
            style={{
              borderRadius: dimensions.borderRadius.lg,
              color: '#dc2626',
              fontFamily: typography.fontFamily.primary,
              fontWeight: typography.fontWeights.button,
              border: '1px solid #fecaca',
              backgroundColor: '#fef2f2',
            }}
          >
            <Icon icon={LogOut} size="sm" color="#dc2626" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>
    </>
  );
};