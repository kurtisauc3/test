import { FC, useContext } from 'react';
import Context from './core/network/Context';
import Connecting from './components/Connecting';
import Connected from './components/Connected';
import Disconnecting from './components/Disconnecting';
import Disconnected from './components/Disconnected';
import Error from './components/Error';

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
