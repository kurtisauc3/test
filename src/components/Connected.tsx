import { FC, useContext } from 'react';
import Context from '../core/network/Context';
import OrderTable from './OrderTable';

const Component: FC = () => {
  const { disconnect } = useContext(Context);
  // TODO: style
  return (
    <>
      Connected
      <button onClick={disconnect}>disconnect</button>
      <OrderTable />
    </>
  );
};

export default Component;
