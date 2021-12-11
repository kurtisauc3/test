import { createContext } from 'react';

export type NetworkState =
  | 'connecting'
  | 'connected'
  | 'disconnecting'
  | 'disconnected';

type NetworkContext = {
  networkState: NetworkState;
  connect: () => void;
  disconnect: () => void;
};

export default createContext({} as NetworkContext);
