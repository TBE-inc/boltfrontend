import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Icon } from '@/components/atoms/Icon/Icon';
import { useTheme } from '@/hooks/useTheme';

export interface NotificationSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: { newMessages: boolean; promotions: boolean }) => void;
  initialSettings?: {
    newMessages: boolean;
    promotions: boolean;
  };
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSettings = { newMessages: true, promotions: false },
}) => {
  const { colors, spacing, dimensions, typography } = useTheme();
  const [newMessages, setNewMessages] = useState(initialSettings.newMessages);
  const [promotions, setPromotions] = useState(initialSettings.promotions);
  const [savingStates, setSavingStates] = useState<{ [key: string]: boolean }>({});
  const [savedStates, setSavedStates] = useState<{ [key: string]: boolean }>({});

  const handleToggleChange = async (settingKey: 'newMessages' | 'promotions', newValue: boolean) => {
    // Update local state immediately
    if (settingKey === 'newMessages') {
      setNewMessages(newValue);
    } else {
      setPromotions(newValue);
    }

    // Show saving state
    setSavingStates(prev => ({ ...prev, [settingKey]: true }));

    try {
      // Auto-save the change
      const updatedSettings = {
        newMessages: settingKey === 'newMessages' ? newValue : newMessages,
        promotions: settingKey === 'promotions' ? newValue : promotions,
      };
      
      await onSave(updatedSettings);
      
      // Show saved state
      setSavedStates(prev => ({ ...prev, [settingKey]: true }));
      setTimeout(() => {
        setSavedStates(prev => ({ ...prev, [settingKey]: false }));
      }, 2000);
    } catch (error) {
      console.error('Error saving notification setting:', error);
      // Revert the change on error
      if (settingKey === 'newMessages') {
        setNewMessages(!newValue);
      } else {
        setPromotions(!newValue);
      }
    } finally {
      setSavingStates(prev => ({ ...prev, [settingKey]: false }));
    }
  };

  const ToggleSwitch: React.FC<{
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    settingKey: string;
  }> = ({ checked, onChange, disabled = false, settingKey }) => {
    const isSaving = savingStates[settingKey];
    const isSaved = savedStates[settingKey];
    
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => !disabled && !isSaving && onChange(!checked)}
          disabled={disabled || isSaving}
          style={{
            width: '3rem',
            height: '1.75rem',
            borderRadius: dimensions.borderRadius.full,
            backgroundColor: checked ? colors.accent : colors.neutral.border,
            border: 'none',
            position: 'relative',
            cursor: disabled || isSaving ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s ease',
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <div
            style={{
              width: '1.25rem',
              height: '1.25rem',
              borderRadius: '50%',
              backgroundColor: colors.neutral.textReverse,
              position: 'absolute',
              top: '0.25rem',
              left: checked ? '1.5rem' : '0.25rem',
              transition: 'left 0.2s ease',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          />
        </button>
        
        {/* Status indicator */}
        {(isSaving || isSaved) && (
          <div
            className="animate-scale-in"
            style={{
              width: '1.5rem',
              height: '1.5rem',
              borderRadius: dimensions.borderRadius.full,
              backgroundColor: isSaved ? colors.accent : colors.neutral.border,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isSaving ? (
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  border: `2px solid ${colors.neutral.textReverse}`,
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
            ) : (
              <Icon icon={Check} size="xs" color={colors.neutral.textReverse} />
            )}
          </div>
        )}
      </div>
    );
  };

  const notificationOptions = [
    {
      id: 'newMessages',
      title: 'Notifications de nouveaux messages',
      description: 'Être notifié lors de la réception de nouveaux messages',
      checked: newMessages,
      onChange: (value: boolean) => handleToggleChange('newMessages', value),
    },
    {
      id: 'promotions',
      title: 'Offres et promotions',
      description: 'Recevoir des mises à jour sur les offres spéciales et nouvelles fonctionnalités',
      checked: promotions,
      onChange: (value: boolean) => handleToggleChange('promotions', value),
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
          className="flex items-center justify-between"
          style={{
            padding: `${spacing.md} ${spacing.lg}`,
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
              Notifications
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
          <div className="space-y-6">
            {notificationOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center justify-between"
                style={{ padding: `${spacing.sm} 0` }}
              >
                <div className="flex-1">
                  <h4
                    style={{
                      fontSize: '1rem',
                      fontWeight: typography.fontWeights.heading3,
                      fontFamily: typography.fontFamily.primary,
                      color: colors.neutral.textMain,
                      margin: 0,
                      marginBottom: spacing.xs,
                    }}
                  >
                    {option.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: typography.fontWeights.body,
                      fontFamily: typography.fontFamily.primary,
                      color: colors.neutral.textMuted,
                      margin: 0,
                    }}
                  >
                    {option.description}
                  </p>
                </div>
                
                <ToggleSwitch
                  checked={option.checked}
                  onChange={option.onChange}
                  settingKey={option.id}
                />
              </div>
            ))}
          </div>

          {/* Notification Info */}
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
              À propos des notifications
            </h4>
            <p
              style={{
                fontSize: '0.875rem',
                fontWeight: typography.fontWeights.body,
                fontFamily: typography.fontFamily.primary,
                color: colors.neutral.textMuted,
                margin: 0,
                lineHeight: '1.5',
              }}
            >
              Les modifications sont automatiquement enregistrées. Certaines notifications peuvent encore être envoyées pour des mises à jour importantes de sécurité du compte.
            </p>
          </div>
        </div>
      </div>

    </>
  );
};