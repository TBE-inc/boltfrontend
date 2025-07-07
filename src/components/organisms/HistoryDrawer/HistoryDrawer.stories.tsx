import type { Meta, StoryObj } from '@storybook/react';
import { HistoryDrawer } from './HistoryDrawer';

const meta: Meta<typeof HistoryDrawer> = {
  title: 'Organisms/HistoryDrawer',
  component: HistoryDrawer,
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleGroups = [
  {
    title: "Aujourd'hui",
    items: [
      {
        id: '1',
        label: 'Comment cultiver des tomates en hydroponie ?',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      },
      {
        id: '2',
        label: 'Meilleurs engrais pour cannabis indoor',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: '3',
        label: 'Problème de pH dans mon système',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      },
    ],
  },
  {
    title: 'Hier',
    items: [
      {
        id: '4',
        label: 'Setup éclairage LED pour débutant',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        id: '5',
        label: 'Calendrier de floraison optimal',
        timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000), // 26 hours ago
      },
    ],
  },
  {
    title: '7 jours précédents',
    items: [
      {
        id: '6',
        label: 'Techniques de taille et LST',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
      {
        id: '7',
        label: 'Contrôle humidité et ventilation',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      },
      {
        id: '8',
        label: 'Substrats: terre vs coco vs hydro',
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
      },
    ],
  },
  {
    title: '30 jours précédents',
    items: [
      {
        id: '9',
        label: 'Guide complet du séchage et curing',
        timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      },
      {
        id: '10',
        label: 'Prévention des parasites naturellement',
        timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
      },
      {
        id: '11',
        label: 'Optimisation du rendement par m²',
        timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
      },
    ],
  },
  {
    title: 'Il y a plus de 30 jours',
    items: [
      {
        id: '12',
        label: 'Choix des variétés pour débutants',
        timestamp: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
      },
      {
        id: '13',
        label: 'Installation complète grow room',
        timestamp: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
      },
      {
        id: '14',
        label: 'Législation et réglementation',
        timestamp: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000), // 75 days ago
      },
    ],
  },
];

export const Default: Story = {
  args: {
    isOpen: true,
    groups: sampleGroups,
    userName: 'Jean Dupont',
    isPlusUser: true,
    onClose: () => console.log('Drawer closed'),
    onNewChat: () => console.log('New chat clicked'),
    onSearchChats: () => console.log('Search chats clicked'),
    onRenewPlus: () => console.log('Renew Plus clicked'),
    onAccountSettings: () => console.log('Account settings clicked'),
  },
};

export const Empty: Story = {
  args: {
    isOpen: true,
    groups: [],
    userName: 'Marie Martin',
    isPlusUser: false,
    onClose: () => console.log('Drawer closed'),
    onNewChat: () => console.log('New chat clicked'),
    onSearchChats: () => console.log('Search chats clicked'),
    onRenewPlus: () => console.log('Renew Plus clicked'),
    onAccountSettings: () => console.log('Account settings clicked'),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    groups: sampleGroups,
    userName: 'Pierre Durand',
    isPlusUser: true,
    onClose: () => console.log('Drawer closed'),
    onNewChat: () => console.log('New chat clicked'),
    onSearchChats: () => console.log('Search chats clicked'),
    onRenewPlus: () => console.log('Renew Plus clicked'),
    onAccountSettings: () => console.log('Account settings clicked'),
  },
};

export const NonPlusUser: Story = {
  args: {
    isOpen: true,
    groups: sampleGroups.slice(0, 1), // Only today's chats for non-plus users
    userName: 'Sophie Moreau',
    isPlusUser: false,
    onClose: () => console.log('Drawer closed'),
    onNewChat: () => console.log('New chat clicked'),
    onSearchChats: () => console.log('Search chats clicked'),
    onRenewPlus: () => console.log('Renew Plus clicked'),
    onAccountSettings: () => console.log('Account settings clicked'),
  },
};