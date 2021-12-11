import { FC, useContext } from 'react';
import Context from '../core/network/Context';

const Component: FC = () => {
  const { disconnect } = useContext(Context);
  // TODO: handle connected
  // TODO: handle disconnect
  return (
    <>
      Connected
      <button onClick={disconnect}>disconnect</button>
    </>
  );
};

export default Component;
