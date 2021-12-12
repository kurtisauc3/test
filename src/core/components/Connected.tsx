import { FC, useContext } from 'react';
import Context from '../network/Context';

const Component: FC = () => {
  const { disconnect } = useContext(Context);
  // TODO: style
  return (
    <>
      Connected
      <button onClick={disconnect}>disconnect</button>
    </>
  );
};

export default Component;
