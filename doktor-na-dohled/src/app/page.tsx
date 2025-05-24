// doktor-na-dohled/src/app/page.tsx
'use client';
import { useCompletion } from 'ai/react';
import { useState, useEffect, FormEvent } from 'react'; // Přidat FormEvent
import ChatWindow from './components/ChatWindow'; 

// Definice typu Message zůstává stejná
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', text: 'Vítejte! Jsem váš AI asistent DoktorNaDohled. Jak vám mohu pomoci dnes?', sender: 'ai' },
  ]);

  const { 
    completion, 
    input, 
    handleInputChange, 
    handleSubmit, 
    error, 
    isLoading,
    setInput, // Přidáno pro vyčištění inputu po odeslání v onFinish
    setCompletion // Přidáno pro vyčištění completion po onFinish
  } = useCompletion({
    api: '/api/chat',
    // Posíláme celou historii zpráv v těle požadavku
    // Tělo bude { messages: [...], prompt: input }
    // API endpoint musí být schopen toto zpracovat (což náš upravený endpoint je)
    body: { messages }, // Přidáme aktuální messages do těla požadavku
    onFinish: (prompt, completionText) => {
      const aiMessage: Message = {
        id: String(Date.now()),
        text: completionText,
        sender: 'ai',
      };
      setMessages(prevMessages => {
        // Odstraníme dočasnou streamovanou zprávu, pokud existuje
        const filteredMessages = prevMessages.filter(msg => msg.id !== 'streaming_ai_response');
        return [...filteredMessages, aiMessage];
      });
      setInput(''); // Vyčistíme input pole po úspěšném odeslání a dokončení
      setCompletion(''); // Vyčistíme completion text
    },
    onError: (err) => {
      // Přidání chybové zprávy do chatu
      const errorMessage: Message = {
        id: String(Date.now()),
        text: `Chyba při komunikaci s AI: ${err.message}`,
        sender: 'ai',
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  });
  
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: String(Date.now() -1 ), // Jednoduché ID
      text: input,
      sender: 'user',
    };
    // Přidáme uživatelskou zprávu do messages
    // a poté předáme aktuální messages (včetně nové uživatelské) do `body` v `useCompletion`
    // což se děje automaticky díky `body: { messages }` v konfiguraci hooku.
    // Je potřeba, aby se `messages` aktualizovaly PŘED voláním `handleSubmit`.
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // handleSubmit z useCompletion odešle zprávu.
    // Hook automaticky použije aktuální `messages` (díky `body: {messages}`)
    // a `input` (jako `prompt`) při sestavování požadavku na API.
    handleSubmit(e); 
  };

  // Pro zobrazení průběžné odpovědi AI během streamování
  const displayMessages = [...messages];
  if (isLoading && completion) {
    const lastMessage = displayMessages[displayMessages.length - 1];
    // Pokud poslední zpráva je AI a její ID je 'streaming_ai_response', aktualizujeme ji.
    // Jinak přidáme novou dočasnou zprávu pro streamovanou odpověď.
    if (lastMessage && lastMessage.sender === 'ai' && lastMessage.id === 'streaming_ai_response') {
      lastMessage.text = completion;
    } else if (!messages.find(m => m.id === 'streaming_ai_response' && m.text === completion)) { 
      // Přidáme novou pouze pokud neexistuje identická streamovaná zpráva
      // (prevence duplikátů při rychlém rerenderu)
      displayMessages.push({ id: 'streaming_ai_response', text: completion, sender: 'ai' });
    }
  } else if (!isLoading && messages.find(msg => msg.id === 'streaming_ai_response')) {
    // Pokud už nenačítáme a dočasná zpráva stále existuje (nebyla nahrazena v onFinish), odstraníme ji.
    // Toto je pojistka, onFinish by to měl řešit primárně.
    const index = displayMessages.findIndex(msg => msg.id === 'streaming_ai_response');
    if (index !== -1) {
      displayMessages.splice(index, 1);
    }
  }


  return (
    <div className="flex flex-col h-[calc(100vh-150px)]">
      <ChatWindow messages={displayMessages} /> 
      {error && !messages.find(m => m.text.includes(error.message)) && (
          <p className="text-red-500 p-2 text-center">Došlo k chybě: {error.message}</p>
      )}
      <form onSubmit={handleFormSubmit} className="flex gap-2 p-4 border-t">
        <input
          value={input}
          onChange={handleInputChange}
          className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Napište zprávu AI..."
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300" 
          disabled={isLoading}
        >
          {isLoading ? 'Odesílám...' : 'Odeslat'}
        </button>
      </form>
    </div>
  );
}
