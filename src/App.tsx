import React, { FC, useContext } from 'react';
import Orders from './Orders';
import Context from './core/network/Context';

const Component: FC = () => {
  const { state, dispatch } = useContext(Context);
  // TODO: handle state/dispatch
  return <Orders />;
};

export default Component;
