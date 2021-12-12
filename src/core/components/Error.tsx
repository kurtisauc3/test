import { FC, useContext } from 'react';
import Context from '../network/Context';

const Component: FC = () => {
  const { connect, networkError } = useContext(Context);
  // TODO: style
  return (
    <>
      {networkError}
      <button onClick={connect}>connect</button>
    </>
  );
};

export default Component;
