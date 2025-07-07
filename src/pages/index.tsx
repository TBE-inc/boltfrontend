import React from 'react';
import { useState } from 'react';
import { ChatPanel } from '@/components/organisms/ChatPanel/ChatPanel';
import { Header } from '@/components/organisms/Header/Header';
import { HistoryDrawer } from '@/components/organisms/HistoryDrawer/HistoryDrawer';
import { AccountSettingsDrawer } from '@/components/organisms/AccountSettingsDrawer/AccountSettingsDrawer';
import { EditProfileSettings } from '@/components/organisms/EditProfileSettings/EditProfileSettings';
import { ManageSubscriptionSettings } from '@/components/organisms/ManageSubscriptionSettings/ManageSubscriptionSettings';
import { PrivacySecuritySettings } from '@/components/organisms/PrivacySecuritySettings/PrivacySecuritySettings';
import { NotificationSettings } from '@/components/organisms/NotificationSettings/NotificationSettings';
import { HelpSupportSettings } from '@/components/organisms/HelpSupportSettings/HelpSupportSettings';

export default function HomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [activeSettingsPage, setActiveSettingsPage] = useState<string | null>(null);

  // User data state
  const [userData, setUserData] = useState({
    fullName: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    isPlusUser: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newMessages: true,
    promotions: false,
  });

  const handleOpenSidebar = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleNewChat = () => {
    console.log('Starting new chat...');
    setIsDrawerOpen(false);
  };

  const handleSearchChats = () => {
    console.log('Searching chats...');
  };

  const handleAccountSettings = () => {
    console.log('Opening account settings...');
    setIsDrawerOpen(false);
    setIsAccountSettingsOpen(true);
  };

  const handleCloseAccountSettings = () => {
    setIsAccountSettingsOpen(false);
    setActiveSettingsPage(null);
  };

  const handleOpenSettingsPage = (page: string) => {
    setActiveSettingsPage(page);
    setIsAccountSettingsOpen(false);
  };

  const handleCloseSettingsPage = () => {
    setActiveSettingsPage(null);
    setIsAccountSettingsOpen(true);
  };

  // Settings handlers
  const handleSaveProfile = async (data: { fullName?: string; email?: string }) => {
    console.log('Saving profile:', data);
    setUserData(prev => ({ 
      ...prev, 
      ...(data.fullName !== undefined && { fullName: data.fullName }),
      ...(data.email !== undefined && { email: data.email })
    }));
  };

  const handleRenewSubscription = () => {
    console.log('Renewing subscription...');
    // Redirect to payment page or open payment modal
  };

  const handleCancelSubscription = () => {
    console.log('Cancelling subscription...');
    setUserData(prev => ({ ...prev, isPlusUser: false }));
  };

  const handleChangePassword = () => {
    console.log('Opening change password flow...');
    // Open change password modal or redirect
  };

  const handleLogoutAllDevices = async () => {
    console.log('Logging out of all devices...');
    // API call to logout all devices
  };

  const handleSaveNotifications = async (settings: { newMessages: boolean; promotions: boolean }) => {
    console.log('Saving notification settings:', settings);
    setNotificationSettings(settings);
  };

  const handleContactSupport = () => {
    console.log('Opening contact support...');
    // Open support chat or email
  };

  const handleOpenFAQ = () => {
    console.log('Opening FAQ...');
    // Open FAQ page in new tab
    window.open('/faq', '_blank');
  };

  // Sample history data
  const historyGroups = [
    {
      title: "Aujourd'hui",
      items: [
        {
          id: '1',
          label: 'Comment optimiser la croissance des plants ?',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
        },
        {
          id: '2',
          label: 'Problème de nutriments sur mes feuilles',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
      ],
    },
    {
      title: 'Hier',
      items: [
        {
          id: '3',
          label: 'Setup éclairage LED pour débutant',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      ],
    },
    {
      title: '7 jours précédents',
      items: [
        {
          id: '4',
          label: 'Techniques de taille et LST',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
        {
          id: '5',
          label: 'Contrôle humidité et ventilation',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
      ],
    },
    {
      title: '30 jours précédents',
      items: [
        {
          id: '6',
          label: 'Guide complet du séchage et curing',
          timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        },
        {
          id: '7',
          label: 'Prévention des parasites naturellement',
          timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        },
        {
          id: '8',
          label: 'Optimisation du rendement par m²',
          timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        },
      ],
    },
    {
      title: 'Il y a plus de 30 jours',
      items: [
        {
          id: '9',
          label: 'Choix des variétés pour débutants',
          timestamp: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        },
        {
          id: '10',
          label: 'Installation complète grow room',
          timestamp: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        },
        {
          id: '11',
          label: 'Législation et réglementation',
          timestamp: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000),
        },
      ],
    },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header 
        logoUrl="/demo-logo-1.png"
        logoAlt="Weedify Logo"
        onOpenSidebar={handleOpenSidebar}
      />
      <div className="flex-1">
        <ChatPanel />
      </div>
      
      <HistoryDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onNewChat={handleNewChat}
        onSearchChats={handleSearchChats}
        groups={historyGroups}
        userName="Jean Dupont"
        isPlusUser={true}
        onRenewPlus={() => console.log('Renewing Plus subscription...')}
        onAccountSettings={handleAccountSettings}
      />
      
      <AccountSettingsDrawer
        isOpen={isAccountSettingsOpen}
        onClose={handleCloseAccountSettings}
        userName={userData.fullName}
        userEmail={userData.email}
        isPlusUser={userData.isPlusUser}
        onEditProfile={() => handleOpenSettingsPage('profile')}
        onManageSubscription={() => handleOpenSettingsPage('subscription')}
        onPrivacySettings={() => handleOpenSettingsPage('privacy')}
        onNotificationSettings={() => handleOpenSettingsPage('notifications')}
        onHelp={() => handleOpenSettingsPage('help')}
        onLogout={() => console.log('Déconnexion')}
      />
      
      {/* Settings Pages */}
      <EditProfileSettings
        isOpen={activeSettingsPage === 'profile'}
        onClose={handleCloseSettingsPage}
        onSave={handleSaveProfile}
        initialData={{
          fullName: userData.fullName,
          email: userData.email,
        }}
      />
      
      <ManageSubscriptionSettings
        isOpen={activeSettingsPage === 'subscription'}
        onClose={handleCloseSettingsPage}
        onRenew={handleRenewSubscription}
        onCancel={handleCancelSubscription}
        isPlusUser={userData.isPlusUser}
        currentPlan="Weedify Plus"
        nextBillingDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 days from now
      />
      
      <PrivacySecuritySettings
        isOpen={activeSettingsPage === 'privacy'}
        onClose={handleCloseSettingsPage}
        onChangePassword={handleChangePassword}
        onLogoutAllDevices={handleLogoutAllDevices}
      />
      
      <NotificationSettings
        isOpen={activeSettingsPage === 'notifications'}
        onClose={handleCloseSettingsPage}
        onSave={handleSaveNotifications}
        initialSettings={notificationSettings}
      />
      
      <HelpSupportSettings
        isOpen={activeSettingsPage === 'help'}
        onClose={handleCloseSettingsPage}
        onContactSupport={handleContactSupport}
        onOpenFAQ={handleOpenFAQ}
      />
    </div>
  );
}