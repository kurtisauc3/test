import { FC, useEffect, useState } from 'react';
import Context from './Context';
import { NetworkState } from './types';
import socket from './socket';
import ANIMATION_DELAY from '../config/delay';

const Provider: FC = ({ children }) => {
  // initialize state
  const [networkState, setNetworkState] = useState<NetworkState>('disconnected');
  const [networkError, setNetworkError] = useState<string>();

  // socket connections
  useEffect(() => {
    socket.on('connect', () => {
      setNetworkState('connected');
    });
    socket.on('disconnect', () => {
      setNetworkState('disconnected');
    });
    socket.on('reconnect', () => {
      setNetworkState('connected');
    });
    socket.on('connect_error', (err) => {
      setNetworkError(err.message);
    });
  }, []);

  // connection effects
  useEffect(() => {
    switch (networkState) {
      case 'connecting':
        setNetworkError(undefined);
        setTimeout(() => socket.connect(), ANIMATION_DELAY);
        break;
      case 'error':
      case 'disconnecting':
        setTimeout(() => socket.disconnect(), ANIMATION_DELAY);
        break;
    }
  }, [networkState]);

  // error effects
  useEffect(() => {
    if (networkError) {
      setNetworkState('error');
    }
  }, [networkError]);

  // public methods
  const connect = () => {
    setNetworkState('connecting');
  };
  const disconnect = () => {
    setNetworkState('disconnecting');
  };

  return (
    <Context.Provider
      value={{
        networkState,
        networkError,
        connect,
        disconnect
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
