import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HistoryDrawer } from '../HistoryDrawer';

const mockProps = {
  isOpen: true,
  onClose: jest.fn(),
  onNewChat: jest.fn(),
  onSearchChats: jest.fn(),
  onRenewPlus: jest.fn(),
  onAccountSettings: jest.fn(),
  userName: 'Test User',
  isPlusUser: true,
  groups: [
    {
      title: "Aujourd'hui",
      items: [
        {
          id: '1',
          label: 'Test chat 1',
          timestamp: new Date(),
        },
        {
          id: '2',
          label: 'Test chat 2',
          timestamp: new Date(),
        },
      ],
    },
    {
      title: 'Hier',
      items: [
        {
          id: '3',
          label: 'Test chat 3',
          timestamp: new Date(),
        },
      ],
    },
  ],
};

describe('HistoryDrawer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(<HistoryDrawer {...mockProps} />);
    
    expect(screen.getByText('Weedify.')).toBeInTheDocument();
    expect(screen.getByText('Nouveau Chat')).toBeInTheDocument();
    expect(screen.getByText('Rechercher des chats')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<HistoryDrawer {...mockProps} isOpen={false} />);
    
    expect(screen.queryByText('Weedify.')).not.toBeInTheDocument();
  });

  it('displays section titles correctly', () => {
    render(<HistoryDrawer {...mockProps} />);
    
    expect(screen.getByText("AUJOURD'HUI")).toBeInTheDocument();
    expect(screen.getByText('HIER')).toBeInTheDocument();
  });

  it('displays history items correctly', () => {
    render(<HistoryDrawer {...mockProps} />);
    
    expect(screen.getByText('Test chat 1')).toBeInTheDocument();
    expect(screen.getByText('Test chat 2')).toBeInTheDocument();
    expect(screen.getByText('Test chat 3')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<HistoryDrawer {...mockProps} />);
    
    const closeButton = screen.getByLabelText('Fermer le tiroir');
    fireEvent.click(closeButton);
    
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    render(<HistoryDrawer {...mockProps} />);
    
    const overlay = document.querySelector('.fixed.inset-0.bg-black');
    fireEvent.click(overlay!);
    
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onNewChat when "Nouveau Chat" button is clicked', () => {
    render(<HistoryDrawer {...mockProps} />);
    
    const newChatButton = screen.getByLabelText('Créer un nouveau chat');
    fireEvent.click(newChatButton);
    
    expect(mockProps.onNewChat).toHaveBeenCalledTimes(1);
  });

  it('calls onSearchChats when "Rechercher des chats" button is clicked', () => {
    render(<HistoryDrawer {...mockProps} />);
    
    const searchButton = screen.getByLabelText('Rechercher des chats');
    fireEvent.click(searchButton);
    
    expect(mockProps.onSearchChats).toHaveBeenCalledTimes(1);
  });

  it('displays user name in footer', () => {
    render(<HistoryDrawer {...mockProps} />);
    
    expect(screen.getByText('Test User account')).toBeInTheDocument();
  });

  it('shows Plus badge when user is Plus member', () => {
    render(<HistoryDrawer {...mockProps} />);
    
    expect(screen.getByText('PLUS')).toBeInTheDocument();
  });

  it('does not show Plus badge when user is not Plus member', () => {
    render(<HistoryDrawer {...mockProps} isPlusUser={false} />);
    
    expect(screen.queryByText('PLUS')).not.toBeInTheDocument();
  });

  it('displays empty state when no groups provided', () => {
    render(<HistoryDrawer {...mockProps} groups={[]} />);
    
    expect(screen.getByText('Aucun historique disponible')).toBeInTheDocument();
  });

  it('calls onRenewPlus when Plus renewal radio is changed', () => {
    render(<HistoryDrawer {...mockProps} />);
    
    const renewRadio = screen.getByLabelText('Renouveler Weedify Plus');
    fireEvent.change(renewRadio, { target: { checked: true } });
    
    expect(mockProps.onRenewPlus).toHaveBeenCalledTimes(1);
  });

  it('calls onAccountSettings when account radio is changed', () => {
    render(<HistoryDrawer {...mockProps} />);
    
    const accountRadio = screen.getByLabelText('Paramètres du compte Test User');
    fireEvent.change(accountRadio, { target: { checked: true } });
    
    expect(mockProps.onAccountSettings).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(<HistoryDrawer {...mockProps} />);
    
    expect(screen.getByLabelText('Fermer le tiroir')).toBeInTheDocument();
    expect(screen.getByLabelText('Créer un nouveau chat')).toBeInTheDocument();
    expect(screen.getByLabelText('Rechercher des chats')).toBeInTheDocument();
    expect(screen.getByLabelText('Renouveler Weedify Plus')).toBeInTheDocument();
    expect(screen.getByLabelText('Paramètres du compte Test User')).toBeInTheDocument();
  });
});