import { test, expect } from '@playwright/test';

test.describe('Chat functionality', () => {
  test('should send a message and receive a response', async ({ page }) => {
    // Navigate to the chat page
    await page.goto('/');

    // Wait for the page to load
    await expect(page.locator('h1')).toContainText('Weedify Assistant');

    // Find the input textarea
    const messageInput = page.getByPlaceholder('Type your message...');
    await expect(messageInput).toBeVisible();

    // Type a message
    const testMessage = 'Hello, this is a test message';
    await messageInput.fill(testMessage);

    // Click the send button
    const sendButton = page.getByRole('button', { name: /send/i });
    await sendButton.click();

    // Verify the user message appears
    await expect(page.locator('text=You')).toBeVisible();
    await expect(page.locator(`text=${testMessage}`)).toBeVisible();

    // Wait for the assistant response
    await expect(page.locator('text=Assistant is typing...')).toBeVisible();
    
    // Wait for the response to appear (with timeout)
    await expect(page.locator('text=Assistant').nth(1)).toBeVisible({ timeout: 10000 });

    // Verify the input is cleared
    await expect(messageInput).toHaveValue('');
  });

  test('should not send empty messages', async ({ page }) => {
    await page.goto('/');

    const sendButton = page.getByRole('button', { name: /send/i });
    
    // Try to click send without typing anything
    await sendButton.click();

    // Should not see any new user messages
    const userMessages = page.locator('text=You');
    await expect(userMessages).toHaveCount(0);
  });

  test('should handle Enter key to send message', async ({ page }) => {
    await page.goto('/');

    const messageInput = page.getByPlaceholder('Type your message...');
    const testMessage = 'Testing Enter key';
    
    await messageInput.fill(testMessage);
    await messageInput.press('Enter');

    // Verify the message was sent
    await expect(page.locator(`text=${testMessage}`)).toBeVisible();
  });

  test('should handle Shift+Enter for new line', async ({ page }) => {
    await page.goto('/');

    const messageInput = page.getByPlaceholder('Type your message...');
    
    await messageInput.fill('Line 1');
    await messageInput.press('Shift+Enter');
    await messageInput.type('Line 2');

    // Verify the textarea contains both lines
    await expect(messageInput).toHaveValue('Line 1\nLine 2');
  });
});