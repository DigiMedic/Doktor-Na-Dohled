// doktor-na-dohled/src/app/components/ChatInput.tsx
'use client'; // Potřebné pro useState a interaktivitu
import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Import Shadcn UI Button

export default function ChatInput({ onSendMessage }: { onSendMessage: (text: string) => void }) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Napište zprávu..."
      />
      <Button type="submit">Odeslat</Button>
    </form>
  );
}
