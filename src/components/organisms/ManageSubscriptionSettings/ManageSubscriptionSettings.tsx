import React, { useState } from 'react';
import { ArrowLeft, Crown, X } from 'lucide-react';
import { Button } from '@/components/atoms/Button/Button';
import { Icon } from '@/components/atoms/Icon/Icon';
import { useTheme } from '@/hooks/useTheme';

export interface ManageSubscriptionSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onRenew: () => void;
  onCancel: () => void;
  isPlusUser: boolean;
  currentPlan?: string;
  nextBillingDate?: Date;
}

export const ManageSubscriptionSettings: React.FC<ManageSubscriptionSettingsProps> = ({
  isOpen,
  onClose,
  onRenew,
  onCancel,
  isPlusUser = false,
  currentPlan = 'Weedify Plus',
  nextBillingDate,
}) => {
  const { colors, spacing, dimensions, typography } = useTheme();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleCancelSubscription = () => {
    setShowCancelConfirm(false);
    onCancel();
  };

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
              Gérer l'abonnement
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
          {/* Current Plan Status */}
          <div
            style={{
              backgroundColor: isPlusUser ? `${colors.accent}10` : colors.neutral.border,
              border: `1px solid ${isPlusUser ? `${colors.accent}30` : colors.neutral.border}`,
              borderRadius: dimensions.borderRadius.lg,
              padding: spacing.lg,
              marginBottom: spacing.lg,
            }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: dimensions.borderRadius.lg,
                  backgroundColor: isPlusUser ? colors.accent : colors.neutral.textMuted,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon icon={Crown} size="sm" color={colors.neutral.textReverse} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: typography.fontWeights.heading3,
                    fontFamily: typography.fontFamily.primary,
                    color: colors.neutral.textMain,
                    margin: 0,
                  }}
                >
                  Plan actuel : {currentPlan}
                </h3>
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
                  {isPlusUser ? 'Abonnement actif' : 'Plan gratuit'}
                </p>
              </div>
            </div>

            {isPlusUser && nextBillingDate && (
              <p
                style={{
                  fontSize: '0.875rem',
                  fontWeight: typography.fontWeights.body,
                  fontFamily: typography.fontFamily.primary,
                  color: colors.neutral.textMuted,
                  margin: 0,
                }}
              >
                Prochaine facturation : {nextBillingDate.toLocaleDateString('fr-FR')}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {isPlusUser ? (
              <>
                <Button
                  onClick={onRenew}
                  className="w-full"
                  size="lg"
                  variant="primary"
                >
                  Renouveler l'abonnement
                </Button>
                
                <Button
                  onClick={() => setShowCancelConfirm(true)}
                  className="w-full"
                  size="lg"
                  variant="outline"
                  style={{
                    color: '#dc2626',
                    borderColor: '#dc2626',
                  }}
                >
                  Annuler l'abonnement
                </Button>
              </>
            ) : (
              <Button
                onClick={onRenew}
                className="w-full"
                size="lg"
                variant="primary"
              >
                Passer à Weedify Plus
              </Button>
            )}
          </div>

          {/* Features List */}
          <div style={{ marginTop: spacing.xl }}>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: typography.fontWeights.heading3,
                fontFamily: typography.fontFamily.primary,
                color: colors.neutral.textMain,
                marginBottom: spacing.md,
              }}
            >
              {isPlusUser ? 'Vos avantages Plus' : 'Fonctionnalités Plus'}
            </h4>
            <ul className="space-y-2">
              {[
                'Messages de chat illimités',
                'Support prioritaire',
                'Conseils de culture avancés',
                'Accès au contenu exclusif',
                'Sans publicité',
              ].map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: typography.fontWeights.body,
                    fontFamily: typography.fontFamily.primary,
                    color: colors.neutral.textMain,
                  }}
                >
                  <span style={{ color: colors.accent }}>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cancel Confirmation Modal */}
        {showCancelConfirm && (
          <div
            className="absolute inset-0 bg-black flex items-center justify-center"
            style={{ 
              zIndex: 60,
              opacity: 0.5,
            }}
          >
            <div
              className="animate-scale-in"
              style={{
                backgroundColor: colors.neutral.bgLight,
                borderRadius: dimensions.borderRadius.xl,
                padding: spacing.xl,
                margin: spacing.lg,
                maxWidth: '400px',
                width: '100%',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: typography.fontWeights.heading3,
                    fontFamily: typography.fontFamily.primary,
                    color: colors.neutral.textMain,
                    margin: 0,
                  }}
                >
                  Annuler l'abonnement ?
                </h3>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="p-1"
                  style={{
                    transition: 'all 0.2s ease-out',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.neutral.border}60`;
                    e.currentTarget.style.borderRadius = dimensions.borderRadius.sm;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Icon icon={X} size="sm" color={colors.neutral.textMuted} />
                </button>
              </div>
              
              <p
                style={{
                  fontSize: '0.875rem',
                  fontWeight: typography.fontWeights.body,
                  fontFamily: typography.fontFamily.primary,
                  color: colors.neutral.textMuted,
                  marginBottom: spacing.lg,
                }}
              >
                Vous perdrez l'accès aux fonctionnalités Plus à la fin de votre période de facturation actuelle.
              </p>
              
              <div className="flex space-x-3">
                <Button
                  onClick={() => setShowCancelConfirm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Conserver l'abonnement
                </Button>
                <Button
                  onClick={handleCancelSubscription}
                  variant="primary"
                  className="flex-1"
                  style={{
                    backgroundColor: '#dc2626',
                    borderColor: '#dc2626',
                  }}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};