import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isDarkMode: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    onToggleDarkMode: () => console.log('Toggle dark mode'),
    onClearChat: () => console.log('Clear chat'),
  },
};

export const DarkMode: Story = {
  args: {
    isDarkMode: true,
    onToggleDarkMode: () => console.log('Toggle dark mode'),
    onClearChat: () => console.log('Clear chat'),
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Custom Chat Assistant',
    onToggleDarkMode: () => console.log('Toggle dark mode'),
    onClearChat: () => console.log('Clear chat'),
  },
};