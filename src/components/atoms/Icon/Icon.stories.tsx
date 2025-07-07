import type { Meta, StoryObj } from '@storybook/react';
import { MessageSquare, Send, User, Bot } from 'lucide-react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: ['MessageSquare', 'Send', 'User', 'Bot'],
      mapping: {
        MessageSquare,
        Send,
        User,
        Bot,
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: MessageSquare,
  },
};

export const Small: Story = {
  args: {
    icon: Send,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    icon: User,
    size: 'lg',
  },
};

export const CustomColor: Story = {
  args: {
    icon: Bot,
    color: '#6B8F71',
  },
};