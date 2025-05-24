// doktor-na-dohled/src/app/components/ChatMessage.tsx
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-md p-3 rounded-lg ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
