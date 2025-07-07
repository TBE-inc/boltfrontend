import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AccountSettingsDrawer } from '../AccountSettingsDrawer';

const mockProps = {
  isOpen: true,
  onClose: jest.fn(),
  onEditProfile: jest.fn(),
  onManageSubscription: jest.fn(),
  onPrivacySettings: jest.fn(),
  onNotificationSettings: jest.fn(),
  onHelp: jest.fn(),
  onLogout: jest.fn(),
  userName: 'Test User',
  userEmail: 'test@example.com',
  isPlusUser: false,
};

describe('AccountSettingsDrawer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(<AccountSettingsDrawer {...mockProps} />);
    
    expect(screen.getByText('Account Settings')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<AccountSettingsDrawer {...mockProps} isOpen={false} />);
    
    expect(screen.queryByText('Account Settings')).not.toBeInTheDocument();
  });

  it('displays FREE badge for non-plus users', () => {
    render(<AccountSettingsDrawer {...mockProps} />);
    
    expect(screen.getByText('FREE')).toBeInTheDocument();
    expect(screen.queryByText('PLUS')).not.toBeInTheDocument();
  });

  it('displays PLUS badge for plus users', () => {
    render(<AccountSettingsDrawer {...mockProps} isPlusUser={true} />);
    
    expect(screen.getByText('PLUS')).toBeInTheDocument();
    expect(screen.queryByText('FREE')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<AccountSettingsDrawer {...mockProps} />);
    
    const closeButton = screen.getByLabelText('Close settings');
    fireEvent.click(closeButton);
    
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    render(<AccountSettingsDrawer {...mockProps} />);
    
    const overlay = document.querySelector('.fixed.inset-0.bg-black');
    fireEvent.click(overlay!);
    
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onEditProfile when Edit Profile is clicked', () => {
    render(<AccountSettingsDrawer {...mockProps} />);
    
    const editProfileButton = screen.getByText('Edit Profile');
    fireEvent.click(editProfileButton);
    
    expect(mockProps.onEditProfile).toHaveBeenCalledTimes(1);
  });

  it('calls onManageSubscription when Manage Subscription is clicked', () => {
    render(<AccountSettingsDrawer {...mockProps} />);
    
    const manageSubButton = screen.getByText('Manage Subscription');
    fireEvent.click(manageSubButton);
    
    expect(mockProps.onManageSubscription).toHaveBeenCalledTimes(1);
  });

  it('calls onLogout when Sign Out is clicked', () => {
    render(<AccountSettingsDrawer {...mockProps} />);
    
    const logoutButton = screen.getByText('Sign Out');
    fireEvent.click(logoutButton);
    
    expect(mockProps.onLogout).toHaveBeenCalledTimes(1);
  });

  it('highlights subscription option for non-plus users', () => {
    render(<AccountSettingsDrawer {...mockProps} />);
    
    const subscriptionText = screen.getByText('Upgrade to Plus');
    expect(subscriptionText).toBeInTheDocument();
  });

  it('shows manage subscription text for plus users', () => {
    render(<AccountSettingsDrawer {...mockProps} isPlusUser={true} />);
    
    const subscriptionText = screen.getByText('Manage your Plus subscription');
    expect(subscriptionText).toBeInTheDocument();
  });

  it('renders all settings options', () => {
    render(<AccountSettingsDrawer {...mockProps} />);
    
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    expect(screen.getByText('Manage Subscription')).toBeInTheDocument();
    expect(screen.getByText('Privacy & Security')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Help & Support')).toBeInTheDocument();
  });
});