import React from 'react';
import { ArrowLeft, HelpCircle, MessageCircle, ExternalLink } from 'lucide-react';
import { Icon } from '@/components/atoms/Icon/Icon';
import { useTheme } from '@/hooks/useTheme';

export interface HelpSupportSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onContactSupport: () => void;
  onOpenFAQ: () => void;
}

export const HelpSupportSettings: React.FC<HelpSupportSettingsProps> = ({
  isOpen,
  onClose,
  onContactSupport,
  onOpenFAQ,
}) => {
  const { colors, spacing, dimensions, typography } = useTheme();

  const supportOptions = [
    {
      icon: HelpCircle,
      title: 'FAQ',
      description: 'Trouvez des réponses aux questions fréquemment posées',
      action: onOpenFAQ,
      external: true,
    },
    {
      icon: MessageCircle,
      title: 'Contacter le support',
      description: 'Obtenez de l\'aide de notre équipe de support',
      action: onContactSupport,
      external: false,
    },
  ];

  const quickHelp = [
    {
      question: 'Comment passer à Plus ?',
      answer: 'Allez dans Gérer l\'abonnement dans vos paramètres de compte pour passer à la version supérieure.',
    },
    {
      question: 'Comment changer mon mot de passe ?',
      answer: 'Visitez les paramètres Confidentialité et sécurité pour mettre à jour votre mot de passe.',
    },
    {
      question: 'Puis-je exporter mon historique de chat ?',
      answer: 'L\'export de chat est disponible pour les utilisateurs Plus dans le menu de chat.',
    },
    {
      question: 'Comment supprimer mon compte ?',
      answer: 'Contactez le support pour demander la suppression du compte.',
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
              Help & Support
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
          {/* Support Options */}
          <div className="space-y-4 mb-8">
            {supportOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.action}
                className="w-full flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 ease-out"
                style={{
                  borderRadius: dimensions.borderRadius.lg,
                  textAlign: 'left',
                  backgroundColor: 'transparent',
                  border: `1px solid ${colors.neutral.border}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.neutral.border}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: dimensions.borderRadius.lg,
                    backgroundColor: colors.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon
                    icon={option.icon}
                    size="sm"
                    color={colors.neutral.textReverse}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4
                      style={{
                        fontSize: '1rem',
                        fontWeight: typography.fontWeights.heading3,
                        fontFamily: typography.fontFamily.primary,
                        color: colors.neutral.textMain,
                        margin: 0,
                      }}
                    >
                      {option.title}
                    </h4>
                    {option.external && (
                      <Icon icon={ExternalLink} size="xs" color={colors.neutral.textMuted} />
                    )}
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
                    {option.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Quick Help Section */}
          <div>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: typography.fontWeights.heading3,
                fontFamily: typography.fontFamily.primary,
                color: colors.neutral.textMain,
                marginBottom: spacing.md,
              }}
            >
              Aide rapide
            </h4>
            
            <div className="space-y-4">
              {quickHelp.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: spacing.md,
                    backgroundColor: `${colors.accent}05`,
                    border: `1px solid ${colors.neutral.border}`,
                    borderRadius: dimensions.borderRadius.lg,
                  }}
                >
                  <h5
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: typography.fontWeights.heading3,
                      fontFamily: typography.fontFamily.primary,
                      color: colors.neutral.textMain,
                      margin: 0,
                      marginBottom: spacing.xs,
                    }}
                  >
                    {item.question}
                  </h5>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: typography.fontWeights.body,
                      fontFamily: typography.fontFamily.primary,
                      color: colors.neutral.textMuted,
                      margin: 0,
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
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
              Besoin de plus d'aide ?
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
              Notre équipe de support est disponible 24h/24 et 7j/7 pour vous aider avec toutes vos questions ou problèmes. Nous répondons généralement dans les 2 à 4 heures.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};