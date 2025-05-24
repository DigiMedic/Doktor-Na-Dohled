// doktor-na-dohled/src/app/page.tsx
'use client'; // Potřebné pro useState a interaktivitu
import { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Vítejte! Jak vám mohu pomoci?', sender: 'ai' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    const newUserMessage: Message = {
      id: String(Date.now()), // Jednoduché generování ID
      text,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        // Pokusíme se přečíst tělo chyby, pokud existuje
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          // Pokud tělo chyby není JSON, použijeme statusText
          errorData = { error: response.statusText };
        }
        throw new Error(errorData.error || `Chyba API: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: String(Date.now() + 1), // Jednoduché unikátní ID
        text: data.reply,
        sender: 'ai',
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

    } catch (error) {
      console.error('Chyba při odesílání zprávy:', error);
      const errorMessageText = error instanceof Error ? error.message : 'Neznámá chyba.';
      const errorMessage: Message = {
        id: String(Date.now() + 1),
        text: `Omlouvám se, došlo k chybě: ${errorMessageText}`,
        sender: 'ai',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-150px)]"> {/* Příklad výšky, aby se vešlo na obrazovku s hlavičkou/patičkou */}
      <ChatWindow messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
      {isLoading && <p className="text-center text-sm text-gray-500 mt-2">AI přemýšlí...</p>}
    </div>
  );
}
