import { Reducer } from 'react';

export type NetworkState =
  | 'loading'
  | 'connecting'
  | 'reconnecting'
  | 'connected'
  | 'disconnected'
  | 'error';
export type NetworkAction =
  | 'connect'
  | 'reconnect'
  | 'disconnect'
  | 'setError'
  | 'clearError';

const reducer: Reducer<NetworkState, NetworkAction> = (state, action) => {
  // TODO: handle reducer
  switch (action) {
    default:
      return state;
  }
};

export default reducer;
