import { FC, useContext } from 'react';
import Context from '../network/Context';

const Component: FC = () => {
  const { connect } = useContext(Context);
  // TODO: style
  return (
    <>
      Disconnected
      <button onClick={connect}>connect</button>
    </>
  );
};

export default Component;
