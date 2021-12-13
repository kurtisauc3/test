import React, { FC, useContext } from 'react';
import Context from './core/network/Context';
import { NetworkState } from './core/network/types';
import LoadingPage from './pages/LoadingPage';
import OrdersPage from './pages/OrdersPage';
import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';

const Component: FC = () => {
  const { networkState } = useContext(Context);
  const renderApp = (state: NetworkState): React.ReactNode => {
    switch (state) {
      case 'connecting':
        return <LoadingPage />;
      case 'connected':
        return <OrdersPage />;
      case 'disconnecting':
        return <LoadingPage />;
      case 'disconnected':
        return <LandingPage />;
      case 'error':
        return <ErrorPage />;
    }
  };
  return <>{renderApp(networkState)}</>;
};

export default Component;
