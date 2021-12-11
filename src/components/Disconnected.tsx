import { FC, useContext } from 'react';
import Context from '../core/network/Context';

const Component: FC = () => {
  const { connect } = useContext(Context);
  // TODO: handle disconnected
  // TODO: handle connect
  return (
    <>
      Disconnected
      <button onClick={connect}>connect</button>
    </>
  );
};

export default Component;
