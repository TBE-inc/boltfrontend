import type { Meta, StoryObj } from '@storybook/react';
import { ChatPanel } from './ChatPanel';

const meta: Meta<typeof ChatPanel> = {
  title: 'Organisms/ChatPanel',
  component: ChatPanel,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInitialMessages: Story = {
  args: {
    initialMessages: [
      {
        id: '1',
        content: 'Hello! How can I help you today?',
        role: 'assistant',
        timestamp: new Date(Date.now() - 60000),
      },
      {
        id: '2',
        content: 'I need help with my account settings.',
        role: 'user',
        timestamp: new Date(Date.now() - 30000),
      },
      {
        id: '3',
        content: 'I\'d be happy to help you with your account settings. What specifically would you like to change?',
        role: 'assistant',
        timestamp: new Date(),
      },
    ],
  },
};