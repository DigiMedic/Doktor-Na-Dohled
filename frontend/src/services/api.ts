import { Provider } from '@/types/provider';
import { UserProfile } from '@/components/UserProfile';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL || 'ws://localhost:8000';

export async function sendChatMessage(message: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error('Failed to send chat message');
  }

  const data = await response.json();
  return data.response;
}

export async function getProviders(): Promise<Provider[]> {
  const response = await fetch(`${API_BASE_URL}/providers`);

  if (!response.ok) {
    throw new Error('Failed to fetch providers');
  }

  return response.json();
}

export async function getPersonalizedRecommendations(userProfile: UserProfile): Promise<Provider[]> {
  const response = await fetch(`${API_BASE_URL}/recommendations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userProfile),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch personalized recommendations');
  }

  return response.json();
}

export function createWebSocketConnection(onMessage: (data: any) => void): WebSocket {
  const socket = new WebSocket(`${WS_BASE_URL}/ws`);

  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  return socket;
}