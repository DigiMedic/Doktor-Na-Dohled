// doktor-na-dohled/src/app/components/ChatWindow.tsx
import ChatMessage from './ChatMessage';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

export default function ChatWindow({ messages }: { messages: Message[] }) {
  return (
    <div className="flex-grow h-96 overflow-y-auto p-4 border rounded-md mb-4">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      {/* Prvek pro automatické scrollování dolů */}
      {/* Může být potřeba přidat ref a useEffect pro plnou funkčnost auto-scrollu */}
      {/* <div ref={messagesEndRef} /> */}
    </div>
  );
}
