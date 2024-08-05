import React, { useEffect, useState } from 'react';
import ProviderCard from './ProviderCard';
import { createWebSocketConnection, getProviders } from '@/services/api';
import { useAppContext } from '@/context/AppContext';
import { Provider } from '@/types/provider';

const ProviderList: React.FC = () => {
  const { providers, setProviders } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const initialProviders = await getProviders();
        setProviders(initialProviders);
        setIsLoading(false);
      } catch (err) {
        setError('Nepodařilo se načíst poskytovatele. Zkuste to prosím později.');
        setIsLoading(false);
      }
    };

    fetchProviders();

    const socket = createWebSocketConnection((data) => {
      if (data.type === 'providers_update') {
        setProviders(data.providers);
      }
    });

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [setProviders]);

  if (isLoading) {
    return <div className="text-center">Načítání poskytovatelů...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {providers.map((provider: Provider) => (
        <ProviderCard
          key={provider.id}
          name={provider.name}
          specialty={provider.specialty}
          location={provider.location}
          contact={provider.contact}
        />
      ))}
    </div>
  );
};

export default ProviderList;