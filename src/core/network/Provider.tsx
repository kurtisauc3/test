import { FC, useEffect, useState } from 'react';
import Context from './Context';
import { NetworkError, NetworkState } from './types';
import socket from './socket';

const Provider: FC = ({ children }) => {
  // initialize state
  const [networkState, setNetworkState] = useState<NetworkState>('disconnected');
  const [networkError, setNetworkError] = useState<NetworkError>();

  // socket connections
  useEffect(() => {
    socket.on('connect', () => {
      setNetworkState('connected');
    });
    socket.on('disconnect', (reason) => {
      switch (reason) {
        case 'io client disconnect':
          setNetworkState('disconnected');
          break;
        default:
          setNetworkError(reason);
          break;
      }
    });
    socket.on('reconnect', () => {
      setNetworkState('connected');
    });
    socket.on('connect_error', (err) => {
      setNetworkError('connect error');
    });
  }, []);

  // connection effects
  useEffect(() => {
    switch (networkState) {
      case 'connecting':
        setNetworkError(undefined);
        socket.connect();
        break;
      case 'disconnecting':
        socket.disconnect();
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
