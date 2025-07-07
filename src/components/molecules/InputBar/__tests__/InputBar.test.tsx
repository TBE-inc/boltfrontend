import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputBar } from '../InputBar';

describe('InputBar', () => {
  const mockOnSendMessage = jest.fn();

  beforeEach(() => {
    mockOnSendMessage.mockClear();
  });

  it('renders correctly', () => {
    render(<InputBar onSendMessage={mockOnSendMessage} />);
    
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(screen.getByText('Press Enter to send, Shift+Enter for new line')).toBeInTheDocument();
  });

  it('calls onSendMessage when form is submitted', () => {
    render(<InputBar onSendMessage={mockOnSendMessage} />);
    
    const textarea = screen.getByPlaceholderText('Type your message...');
    const submitButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(textarea, { target: { value: 'Hello, world!' } });
    fireEvent.click(submitButton);

    expect(mockOnSendMessage).toHaveBeenCalledWith('Hello, world!');
  });

  it('clears input after sending message', () => {
    render(<InputBar onSendMessage={mockOnSendMessage} />);
    
    const textarea = screen.getByPlaceholderText('Type your message...') as HTMLTextAreaElement;
    const submitButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(textarea, { target: { value: 'Hello, world!' } });
    fireEvent.click(submitButton);

    expect(textarea.value).toBe('');
  });

  it('does not send empty messages', () => {
    render(<InputBar onSendMessage={mockOnSendMessage} />);
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(submitButton);

    expect(mockOnSendMessage).not.toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<InputBar onSendMessage={mockOnSendMessage} disabled={true} />);
    
    const textarea = screen.getByPlaceholderText('Type your message...');
    const submitButton = screen.getByRole('button', { name: /send/i });

    expect(textarea).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });
});