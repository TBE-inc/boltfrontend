import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/atoms/Button/Button';
import { Icon } from '@/components/atoms/Icon/Icon';
import { useTheme } from '@/hooks/useTheme';

export interface InputBarProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const InputBar: React.FC<InputBarProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = 'Type your message...',
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { colors, spacing, dimensions, typography } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '44px';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div
      style={{
        backgroundColor: colors.neutral.bgLight,
        padding: `${spacing.md} ${spacing.md} ${spacing.xl}`,
      }}
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              className="w-full resize-none min-h-[44px] max-h-32"
              rows={1}
              style={{
                padding: `${spacing.sm} ${spacing.md}`,
                paddingRight: '3rem',
                backgroundColor: colors.neutral.bgLight,
                border: `1px solid ${colors.neutral.border}`,
                borderRadius: dimensions.borderRadius.xl,
                color: colors.neutral.textMain,
                fontSize: '1rem',
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeights.body,
                outline: 'none',
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? 'not-allowed' : 'text',
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || disabled}
              className="absolute right-2 bottom-2 w-8 h-8 flex items-center justify-center transition-colors"
              style={{
                backgroundColor: !input.trim() || disabled ? colors.neutral.border : colors.accent,
                borderRadius: dimensions.borderRadius.lg,
                cursor: !input.trim() || disabled ? 'not-allowed' : 'pointer',
              }}
            >
              <Icon icon={Send} size="xs" color={colors.neutral.textReverse} />
            </button>
          </div>
        </div>
      </form>
      
    </div>
  );
};