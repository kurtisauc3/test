import { FC, useEffect, useState } from 'react';
import Context, { NetworkState, OrderEvent } from './Context';
import socket from './socket';

const Provider: FC = ({ children }) => {
  // initialize state
  const [networkState, setNetworkState] = useState<NetworkState>('disconnected');
  const [networkError, setNetworkError] = useState<string>();
  const [orderEvent, setOrderEvent] = useState<OrderEvent>();

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
    socket.on('order_event', (data) => {
      setOrderEvent(data);
    });
  }, []);

  // connection effects
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
        disconnect,
        orderEvent
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
