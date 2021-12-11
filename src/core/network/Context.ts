import { createContext } from 'react';
import { io } from 'socket.io-client';
import { NetworkState, NetworkAction } from './reducer';

type NetworkContext = {
  socket: ReturnType<typeof io>;
  state: NetworkState;
  dispatch: React.Dispatch<NetworkAction>;
};

export default createContext({} as NetworkContext);
