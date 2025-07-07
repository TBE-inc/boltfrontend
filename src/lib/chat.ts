export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  id: string;
  timestamp: Date;
}

export async function sendMessage(text: string): Promise<ChatResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_CHAT_SEND;
  
  if (!apiUrl) {
    throw new Error('Chat API URL not configured');
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
      body: JSON.stringify({
        message: text,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      message: data.message,
      id: data.id || Math.random().toString(36).substr(2, 9),
      timestamp: new Date(data.timestamp || Date.now()),
    };
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export async function fetchHistory(): Promise<ChatMessage[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_CHAT_HISTORY;
  
  if (!apiUrl) {
    throw new Error('Chat history API URL not configured');
  }

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return data.messages.map((msg: any) => ({
      id: msg.id,
      content: msg.content,
      role: msg.role,
      timestamp: new Date(msg.timestamp),
    }));
  } catch (error) {
    console.error('Error fetching chat history:', error);
    throw error;
  }
}