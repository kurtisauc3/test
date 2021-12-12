import { FC, useContext } from 'react';
import Context from './core/network/Context';
import Connecting from './core/components/Connecting';
import Connected from './core/components/Connected';
import Disconnecting from './core/components/Disconnecting';
import Disconnected from './core/components/Disconnected';
import Error from './core/components/Error';

const Component: FC = () => {
  const { networkState } = useContext(Context);
  switch (networkState) {
    case 'connecting':
      return <Connecting />;
    case 'connected':
      return <Connected />;
    case 'disconnecting':
      return <Disconnecting />;
    case 'disconnected':
      return <Disconnected />;
    case 'error':
      return <Error />;
  }
};

export default Component;
