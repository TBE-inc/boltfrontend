import React from 'react';
import { Bot, User } from 'lucide-react';
import { Icon } from '@/components/atoms/Icon/Icon';
import { useTheme } from '@/hooks/useTheme';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface MessageBubbleProps {
  message: Message;
  isLatest?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isLatest = false,
}) => {
  const { colors, spacing, dimensions, typography } = useTheme();
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex items-start space-x-3 mb-6 ${
        isLatest ? 'animate-slide-up' : ''
      }`}
      style={{ marginBottom: spacing.lg }}
    >
      <div
        style={{
          width: '2rem',
          height: '2rem',
          borderRadius: dimensions.borderRadius.full,
          backgroundColor: isUser ? colors.accent : colors.accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon
          icon={isUser ? User : Bot}
          size="xs"
          color={colors.neutral.textReverse}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div
          className="flex items-center space-x-2"
          style={{ marginBottom: spacing.xs }}
        >
          <span
            style={{
              fontSize: '0.875rem',
              fontWeight: typography.fontWeights.heading3,
              fontFamily: typography.fontFamily.primary,
              color: colors.neutral.textMain,
            }}
          >
            {isUser ? 'You' : 'Assistant'}
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: typography.fontWeights.caption,
              fontFamily: typography.fontFamily.primary,
              color: colors.neutral.textMuted,
            }}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>

        <div
          style={{
            color: isUser ? colors.neutral.textMain : colors.neutral.textMain,
            lineHeight: '1.6',
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeights.body,
          }}
        >
          <p style={{ margin: 0 }}>{message.content}</p>
        </div>
      </div>
    </div>
  );
};