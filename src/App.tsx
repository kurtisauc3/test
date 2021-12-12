import { FC, useContext } from 'react';
import Context from './core/network/Context';
import Connection from './Connection';
import Orders from './Orders';

const Component: FC = () => {
  const { networkState } = useContext(Context);
  return (
    <>
      <Connection />
      {networkState === 'connected' && <Orders />}
    </>
  );
};

export default Component;
