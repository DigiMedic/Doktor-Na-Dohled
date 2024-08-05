import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '@/components/UserProfile';
import { Provider } from '@/types/provider';

interface AppContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  providers: Provider[];
  setProviders: (providers: Provider[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);

  return (
    <AppContext.Provider value={{ userProfile, setUserProfile, providers, setProviders }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};