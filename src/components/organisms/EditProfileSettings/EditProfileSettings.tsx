import React, { useState } from 'react';
import { ArrowLeft, Save, Check } from 'lucide-react';
import { Button } from '@/components/atoms/Button/Button';
import { Icon } from '@/components/atoms/Icon/Icon';
import { useTheme } from '@/hooks/useTheme';

export interface EditProfileSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { fullName?: string; email?: string }) => void;
  initialData?: {
    fullName: string;
    email: string;
  };
}

export const EditProfileSettings: React.FC<EditProfileSettingsProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData = { fullName: '', email: '' },
}) => {
  const { colors, spacing, dimensions, typography } = useTheme();
  const [fullName, setFullName] = useState(initialData.fullName);
  const [email, setEmail] = useState(initialData.email);
  const [isLoadingFullName, setIsLoadingFullName] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [savedFullName, setSavedFullName] = useState(false);
  const [savedEmail, setSavedEmail] = useState(false);

  const handleSaveFullName = async () => {
    setIsLoadingFullName(true);
    try {
      await onSave({ fullName });
      setSavedFullName(true);
      setTimeout(() => setSavedFullName(false), 2000);
    } catch (error) {
      console.error('Error saving full name:', error);
    } finally {
      setIsLoadingFullName(false);
    }
  };

  const handleSaveEmail = async () => {
    setIsLoadingEmail(true);
    try {
      await onSave({ email });
      setSavedEmail(true);
      setTimeout(() => setSavedEmail(false), 2000);
    } catch (error) {
      console.error('Error saving email:', error);
    } finally {
      setIsLoadingEmail(false);
    }
  };

  const isFullNameChanged = fullName !== initialData.fullName;
  const isEmailChanged = email !== initialData.email;

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
              Modifier le profil
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
            {/* Full Name Field */}
            <div className="relative">
              <label
                htmlFor="fullName"
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: typography.fontWeights.heading3,
                  fontFamily: typography.fontFamily.primary,
                  color: colors.neutral.textMain,
                  marginBottom: spacing.xs,
                }}
              >
                Nom complet
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full"
                style={{
                  padding: spacing.sm,
                  paddingRight: isFullNameChanged ? '3.5rem' : spacing.sm,
                  border: `1px solid ${colors.neutral.border}`,
                  borderRadius: dimensions.borderRadius.md,
                  fontSize: '1rem',
                  fontFamily: typography.fontFamily.primary,
                  fontWeight: typography.fontWeights.body,
                  color: colors.neutral.textMain,
                  backgroundColor: colors.neutral.bgLight,
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.accent;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.neutral.border;
                }}
              />
              
              {/* Floating Save Button for Full Name */}
              {isFullNameChanged && (
                <button
                  onClick={handleSaveFullName}
                  disabled={isLoadingFullName || !fullName.trim()}
                  className="absolute right-2 top-8 w-8 h-8 flex items-center justify-center transition-all duration-200 ease-in-out animate-scale-in"
                  style={{
                    backgroundColor: savedFullName ? colors.accent : (isLoadingFullName || !fullName.trim() ? colors.neutral.border : colors.accent),
                    borderRadius: dimensions.borderRadius.lg,
                    cursor: isLoadingFullName || !fullName.trim() ? 'not-allowed' : 'pointer',
                    opacity: isLoadingFullName ? 0.6 : 1,
                  }}
                  title={savedFullName ? 'Enregistré' : 'Enregistrer le nom'}
                >
                  {isLoadingFullName ? (
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        border: `2px solid ${colors.neutral.textReverse}`,
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                  ) : (
                    <Icon 
                      icon={savedFullName ? Check : Save} 
                      size="xs" 
                      color={colors.neutral.textReverse} 
                    />
                  )}
                </button>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: typography.fontWeights.heading3,
                  fontFamily: typography.fontFamily.primary,
                  color: colors.neutral.textMain,
                  marginBottom: spacing.xs,
                }}
              >
                Adresse e-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                style={{
                  padding: spacing.sm,
                  paddingRight: isEmailChanged ? '3.5rem' : spacing.sm,
                  border: `1px solid ${colors.neutral.border}`,
                  borderRadius: dimensions.borderRadius.md,
                  fontSize: '1rem',
                  fontFamily: typography.fontFamily.primary,
                  fontWeight: typography.fontWeights.body,
                  color: colors.neutral.textMain,
                  backgroundColor: colors.neutral.bgLight,
                  outline: 'none',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.accent;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.neutral.border;
                }}
              />
              
              {/* Floating Save Button for Email */}
              {isEmailChanged && (
                <button
                  onClick={handleSaveEmail}
                  disabled={isLoadingEmail || !email.trim()}
                  className="absolute right-2 top-8 w-8 h-8 flex items-center justify-center transition-all duration-200 ease-in-out animate-scale-in"
                  style={{
                    backgroundColor: savedEmail ? colors.accent : (isLoadingEmail || !email.trim() ? colors.neutral.border : colors.accent),
                    borderRadius: dimensions.borderRadius.lg,
                    cursor: isLoadingEmail || !email.trim() ? 'not-allowed' : 'pointer',
                    opacity: isLoadingEmail ? 0.6 : 1,
                  }}
                  title={savedEmail ? 'Enregistré' : 'Enregistrer l\'email'}
                >
                  {isLoadingEmail ? (
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        border: `2px solid ${colors.neutral.textReverse}`,
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                  ) : (
                    <Icon 
                      icon={savedEmail ? Check : Save} 
                      size="xs" 
                      color={colors.neutral.textReverse} 
                    />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};