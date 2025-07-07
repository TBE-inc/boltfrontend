import type { Meta, StoryObj } from '@storybook/react';
import { AccountSettingsDrawer } from './AccountSettingsDrawer';

const meta: Meta<typeof AccountSettingsDrawer> = {
  title: 'Organisms/AccountSettingsDrawer',
  component: AccountSettingsDrawer,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
    },
    isPlusUser: {
      control: { type: 'boolean' },
    },
    userName: {
      control: { type: 'text' },
    },
    userEmail: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    userName: 'Jean Dupont',
    userEmail: 'jean.dupont@example.com',
    isPlusUser: false,
    onClose: () => console.log('Close drawer'),
    onEditProfile: () => console.log('Edit profile'),
    onManageSubscription: () => console.log('Manage subscription'),
    onPrivacySettings: () => console.log('Privacy settings'),
    onNotificationSettings: () => console.log('Notification settings'),
    onHelp: () => console.log('Help'),
    onLogout: () => console.log('Logout'),
  },
};

export const PlusUser: Story = {
  args: {
    isOpen: true,
    userName: 'Marie Martin',
    userEmail: 'marie.martin@example.com',
    isPlusUser: true,
    onClose: () => console.log('Close drawer'),
    onEditProfile: () => console.log('Edit profile'),
    onManageSubscription: () => console.log('Manage subscription'),
    onPrivacySettings: () => console.log('Privacy settings'),
    onNotificationSettings: () => console.log('Notification settings'),
    onHelp: () => console.log('Help'),
    onLogout: () => console.log('Logout'),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    userName: 'Pierre Durand',
    userEmail: 'pierre.durand@example.com',
    isPlusUser: false,
    onClose: () => console.log('Close drawer'),
    onEditProfile: () => console.log('Edit profile'),
    onManageSubscription: () => console.log('Manage subscription'),
    onPrivacySettings: () => console.log('Privacy settings'),
    onNotificationSettings: () => console.log('Notification settings'),
    onHelp: () => console.log('Help'),
    onLogout: () => console.log('Logout'),
  },
};