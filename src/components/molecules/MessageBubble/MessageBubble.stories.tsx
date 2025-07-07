import type { Meta, StoryObj } from '@storybook/react';
import { MessageBubble } from './MessageBubble';

const meta: Meta<typeof MessageBubble> = {
  title: 'Molecules/MessageBubble',
  component: MessageBubble,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleUserMessage = {
  id: '1',
  content: 'Hello, how can you help me today?',
  role: 'user' as const,
  timestamp: new Date(),
};

const sampleAssistantMessage = {
  id: '2',
  content: 'Hello! I\'m here to help you with any questions you might have. What would you like to know?',
  role: 'assistant' as const,
  timestamp: new Date(),
};

export const UserMessage: Story = {
  args: {
    message: sampleUserMessage,
  },
};

export const AssistantMessage: Story = {
  args: {
    message: sampleAssistantMessage,
  },
};

export const LatestMessage: Story = {
  args: {
    message: sampleAssistantMessage,
    isLatest: true,
  },
};