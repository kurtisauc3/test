export type NetworkState = 'connecting' | 'connected' | 'disconnecting' | 'disconnected' | 'error';

export type NetworkError =
  | 'io server disconnect'
  | 'ping timeout'
  | 'transport close'
  | 'transport error'
  | 'connect error';

export type NetworkContext = {
  networkState: NetworkState;
  networkError?: NetworkError;
  connect: () => void;
  disconnect: () => void;
};
