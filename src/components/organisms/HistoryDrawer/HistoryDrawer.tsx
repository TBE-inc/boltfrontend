import React, { useEffect, useState } from 'react';
import { X, Plus, Search, User } from 'lucide-react';
import { Button } from '@/components/atoms/Button/Button';
import { Icon } from '@/components/atoms/Icon/Icon';
import { useTheme } from '@/hooks/useTheme';

export interface HistoryItem {
  id: string;
  label: string;
  timestamp?: Date;
}

export interface HistoryGroup {
  title: string;
  items: HistoryItem[];
}

export interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat?: () => void;
  onSearchChats?: () => void;
  groups?: HistoryGroup[];
  onRenewPlus?: () => void;
  onAccountSettings?: () => void;
  userName?: string;
  isPlusUser?: boolean;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  onNewChat,
  onSearchChats,
  groups = [],
  onRenewPlus,
  onAccountSettings,
  userName = "User",
  isPlusUser = false,
}) => {
  const { colors, spacing, dimensions, typography } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to ensure the element is rendered before animation starts
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before hiding
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-out"
        onClick={onClose}
        style={{ 
          zIndex: 40,
          opacity: isAnimating ? 0.5 : 0,
        }}
      />
      
      {/* Drawer */}
      <div
        className="fixed left-0 top-0 h-full w-80 z-50 flex flex-col transition-all duration-300 ease-out"
        style={{
          backgroundColor: colors.neutral.bgLight,
          borderRight: `1px solid ${colors.neutral.border}`,
          zIndex: 50,
          transform: isAnimating ? 'translateX(0)' : 'translateX(-100%)',
          boxShadow: isAnimating ? '4px 0 20px rgba(0, 0, 0, 0.15)' : 'none',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between border-b"
          style={{
            padding: spacing.md,
            borderBottom: `1px solid ${colors.neutral.border}`,
          }}
        >
          <div className="flex items-center">
            <img
              src="/demo-logo-1 copy.png"
              alt="Weedify"
              style={{
                height: '1.5rem',
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-all duration-200 ease-out"
            aria-label="Fermer le tiroir"
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
            <Icon icon={X} size="sm" color={colors.neutral.textMuted} />
          </button>
        </div>

        {/* Main Actions */}
        <div
          style={{
            padding: spacing.md,
          }}
        >
          <div className="space-y-2">
            <button
              onClick={onNewChat}
              className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ease-out"
              aria-label="Créer un nouveau chat"
              style={{
                borderRadius: dimensions.borderRadius.lg,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeights.body,
                color: colors.neutral.textMain,
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.neutral.border}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Icon icon={Plus} size="sm" color={colors.accent} />
              <span>Nouveau Chat</span>
            </button>
            
            <button
              onClick={onSearchChats}
              className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ease-out"
              aria-label="Rechercher des chats"
              style={{
                borderRadius: dimensions.borderRadius.lg,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeights.body,
                color: colors.neutral.textMain,
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.neutral.border}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Icon icon={Search} size="sm" color={colors.accent} />
              <span>Rechercher des chats</span>
            </button>
          </div>
        </div>

        {/* History Sections */}
        <div className="flex-1 overflow-y-auto" style={{ padding: spacing.md }}>
          {groups.length === 0 ? (
            <div className="text-center py-8">
              <p
                style={{
                  color: colors.neutral.textMuted,
                  fontFamily: typography.fontFamily.primary,
                  fontWeight: typography.fontWeights.body,
                }}
              >
                Aucun historique disponible
              </p>
            </div>
          ) : (
            groups.map((group, groupIndex) => (
              <section key={groupIndex} style={{ marginBottom: spacing.lg }}>
                <h3
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: typography.fontWeights.heading3,
                    fontFamily: typography.fontFamily.primary,
                    color: colors.neutral.textMuted,
                    marginBottom: spacing.sm,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {group.title}
                </h3>
                
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <button
                        className="w-full text-left p-2 rounded-lg transition-all duration-200 ease-out"
                        style={{
                          borderRadius: dimensions.borderRadius.md,
                          fontFamily: typography.fontFamily.primary,
                          fontWeight: typography.fontWeights.body,
                          color: colors.neutral.textMain,
                          fontSize: '0.875rem',
                        }}
                        aria-label={`Ouvrir le chat: ${item.label}`}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = `${colors.neutral.border}40`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <div className="truncate">{item.label}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          className="border-t"
          style={{
            padding: spacing.md,
            borderTop: `1px solid ${colors.neutral.border}`,
          }}
        >
          <div className="space-y-3">
            {/* Weedify Plus Toggle */}
            <button
              onClick={onRenewPlus}
              className="w-full flex items-center justify-between p-3 rounded-lg transition-colors"
              style={{
                backgroundColor: colors.accent,
                color: colors.neutral.textReverse,
                borderRadius: dimensions.borderRadius.lg,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeights.button,
                fontSize: '0.875rem',
                textAlign: 'left',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.accent}dd`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.accent;
              }}
              aria-label="Renouveler Weedify Plus"
            >
              <span>Renouveler Weedify Plus</span>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: typography.fontWeights.caption,
                  color: colors.accent,
                  backgroundColor: colors.neutral.textReverse,
                  padding: '2px 6px',
                  borderRadius: dimensions.borderRadius.sm,
                }}
              >
                {isPlusUser ? 'PLUS' : 'FREE'}
              </span>
            </button>

            {/* User Account Button */}
            <button
              onClick={onAccountSettings}
             className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ease-out"
              style={{
                borderRadius: dimensions.borderRadius.lg,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeights.body,
                color: colors.neutral.textMain,
                fontSize: '0.875rem',
                textAlign: 'left',
              }}
              aria-label={`Paramètres du compte ${userName}`}
             onMouseEnter={(e) => {
               e.currentTarget.style.backgroundColor = `${colors.neutral.border}40`;
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.backgroundColor = 'transparent';
             }}
            >
              <Icon icon={User} size="sm" color={colors.neutral.textMuted} />
              <span>{userName} account</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};