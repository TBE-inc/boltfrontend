import React, { useState, useCallback, useRef, useEffect } from 'react';
import { MessageBubble, type Message } from '@/components/molecules/MessageBubble/MessageBubble';
import { InputBar } from '@/components/molecules/InputBar/InputBar';
import { useTheme } from '@/hooks/useTheme';

export interface ChatPanelProps {
  initialMessages?: Message[];
  onSendMessage?: (message: string) => Promise<void>;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const simulateAIResponse = (userMessage: string): string => {
  const responses = [
    "I understand your question. Let me provide you with a comprehensive answer based on the latest information available.",
    "That's an interesting point you've raised. Here's my perspective on this topic, considering various factors and implications.",
    "I can help you with that. Based on my knowledge, here are some key insights and recommendations for your consideration.",
    "Thank you for your question. This is a complex topic that requires careful consideration of multiple aspects and viewpoints.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const ChatPanel: React.FC<ChatPanelProps> = ({
  initialMessages = [],
  onSendMessage,
}) => {
  const { colors, spacing, typography } = useTheme();
  const [messages, setMessages] = useState<Message[]>(
    initialMessages.length > 0
      ? initialMessages
      : [
          {
            id: generateId(),
            content: "Hello! I'm your AI assistant. How can I help you today?",
            role: 'assistant',
            timestamp: new Date(),
          },
        ]
  );
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      const userMessage: Message = {
        id: generateId(),
        content: content.trim(),
        role: 'user',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      try {
        if (onSendMessage) {
          await onSendMessage(content);
        } else {
          // Simulate AI response delay
          setTimeout(() => {
            const aiResponse: Message = {
              id: generateId(),
              content: simulateAIResponse(content),
              role: 'assistant',
              timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiResponse]);
            setIsTyping(false);
          }, 1500 + Math.random() * 1000);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setIsTyping(false);
      }
    },
    [onSendMessage]
  );

  return (
    <div
      className="flex flex-col h-full"
      style={{ backgroundColor: colors.neutral.bgLight }}
    >
      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto"
        style={{ 
          scrollBehavior: 'smooth',
          overflowAnchor: 'none'
        }}
      >
        <div
          className="max-w-4xl mx-auto"
          style={{ padding: `${spacing.lg} ${spacing.md}` }}
        >
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div
                style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: colors.accent,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>🤖</span>
              </div>
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: typography.fontWeights.heading2,
                  fontFamily: typography.fontFamily.primary,
                  color: colors.neutral.textMain,
                  marginBottom: spacing.sm,
                }}
              >
                Welcome to Weedify Assistant
              </h2>
              <p style={{ 
                color: colors.neutral.textMuted,
                fontFamily: typography.fontFamily.primary,
                fontWeight: typography.fontWeights.body,
              }}>
                Start a conversation by typing a message below
              </p>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isLatest={index === messages.length - 1}
                />
              ))}
              {isTyping && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.sm,
                    padding: spacing.md,
                    color: colors.neutral.textMuted,
                  }}
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  </div>
                  <span>Assistant is typing...</span>
                </div>
              )}
            </>
          )}
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <InputBar onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};