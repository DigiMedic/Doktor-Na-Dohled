import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createWebSocketConnection, sendChatMessage } from '@/services/api';
import { useAppContext } from '@/context/AppContext';

interface Message {
  role: 'AI' | 'Uživatel';
  content: string;
}

const Chat: React.FC = () => {
  const { userProfile } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'AI', content: 'Jaké máte otázky ohledně zdraví?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = createWebSocketConnection((data) => {
      if (data.type === 'chat_message') {
        setMessages(prevMessages => [...prevMessages, { role: 'AI', content: data.message }]);
        setIsLoading(false);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages(prevMessages => [...prevMessages, { role: 'Uživatel', content: input }]);
      setInput('');
      setIsLoading(true);

      try {
        await sendChatMessage(input, userProfile);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prevMessages => [...prevMessages, { role: 'AI', content: 'Omlouváme se, došlo k chybě při zpracování vaší zprávy.' }]);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-blue-50 rounded-lg p-6 mb-6 h-[400px] flex flex-col">
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.role === 'AI' ? 'text-blue-600' : 'text-gray-700'}`}>
            <span className="font-semibold">{message.role}:</span> {message.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Zadejte svůj dotaz..."
            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Odesílám...' : 'Odeslat'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;