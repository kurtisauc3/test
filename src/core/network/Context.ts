import { createContext } from 'react';

export type NetworkState = 'connecting' | 'connected' | 'disconnecting' | 'disconnected' | 'error';

type NetworkContext = {
  networkState: NetworkState;
  networkError?: string;
  connect: () => void;
  disconnect: () => void;
};

export default createContext({} as NetworkContext);
