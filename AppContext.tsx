import React, {type ReactElement, useState} from 'react';
import {Streami18n} from 'stream-chat-react-native';

import type {Channel} from './types';

export const useAppState = () => {
  const streami18n = new Streami18n({
    language: 'en',
  });
  const [channel, setChannel] = useState<Channel>();

  return {channel, setChannel, streami18n};
};

interface AppContextType {
  channel: Channel | undefined;
  setChannel: React.Dispatch<Channel>;
  streami18n: Streami18n;
}

interface AppStateProviderProps {
  children?: ReactElement;
}

export function AppStateProvider({children}: AppStateProviderProps) {
  const state = useAppState();
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export const AppContext = React.createContext({} as AppContextType);
