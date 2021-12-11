import { FC, useEffect, useState } from 'react';
import Context, { NetworkState } from './Context';
import socket from './socket';

const Provider: FC = ({ children }) => {
  // initialize state
  const [networkState, setNetworkState] = useState<NetworkState>('disconnected');
  const [networkError, setNetworkError] = useState<string>();

  useEffect(() => {
    switch (networkState) {
      case 'connecting':
        setNetworkError(undefined);
        socket.connect();
        break;
      case 'error':
      case 'disconnecting':
        socket.disconnect();
        break;
    }
  }, [networkState]);

  useEffect(() => {
    if (networkError) {
      setNetworkState('error');
    }
  }, [networkError]);

  useEffect(() => {
    // socket connections
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
    socket.on('order_event', (data) => {
      // TODO: handle order_event
    });
  }, []);

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
