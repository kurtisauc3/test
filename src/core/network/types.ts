export type NetworkState = 'connecting' | 'connected' | 'disconnecting' | 'disconnected' | 'error';

export type NetworkContext = {
  networkState: NetworkState;
  networkError?: string;
  connect: () => void;
  disconnect: () => void;
};
