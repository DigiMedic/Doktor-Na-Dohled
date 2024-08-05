import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Chat from '@/components/Chat';
import ProviderList from '@/components/ProviderList';
import UserProfile from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import { AppProvider, useAppContext } from '@/context/AppContext';
import { createWebSocketConnection } from '@/services/api';

const Home = () => {
  const { setUserProfile, setProviders, setChatMessages, userProfile, providers, chatMessages } = useAppContext();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = createWebSocketConnection((data) => {
      if (data.type === 'user_profile_update') {
        setUserProfile(data.profile);
      } else if (data.type === 'providers_update') {
        setProviders(data.providers);
      } else if (data.type === 'chat_message') {
        setChatMessages(prevMessages => [...prevMessages, data.message]);
      }
    });

    socket.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket connection established');
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket connection closed');
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [setUserProfile, setProviders, setChatMessages]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 bg-gray-100">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Image
              src="/logo-placeholder.png"
              alt="DoktorNaDohled Logo"
              width={50}
              height={50}
              className="mr-4"
            />
            <h1 className="text-3xl font-bold text-blue-600">DoktorNaDohled</h1>
          </div>
          <UserProfile />
        </div>
        
        <p className="text-center text-gray-600 mb-8">
          Vítejte v DoktorNaDohled! Naše AI platforma vám pomůže najít relevantní zdravotní informace a odpovědi na vaše otázky.
        </p>
        
        {isConnected ? (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <Chat messages={chatMessages} />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold mb-4">Doporučení poskytovatelé</h2>
              <ProviderList providers={providers} />
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">Připojování k serveru...</p>
        )}
      </div>
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}