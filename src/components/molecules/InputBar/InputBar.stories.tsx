import type { Meta, StoryObj } from '@storybook/react';
import { InputBar } from './InputBar';

const meta: Meta<typeof InputBar> = {
  title: 'Molecules/InputBar',
  component: InputBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSendMessage: (message: string) => console.log('Message sent:', message),
  },
};

export const Disabled: Story = {
  args: {
    onSendMessage: (message: string) => console.log('Message sent:', message),
    disabled: true,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    onSendMessage: (message: string) => console.log('Message sent:', message),
    placeholder: 'Ask me anything...',
  },
};