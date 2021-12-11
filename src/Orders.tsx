import React, { FC, useContext } from 'react';
import Context from './core/network/Context';

const Component: FC = () => {
  const { socket } = useContext(Context);
  socket.on('order_event', (data) => {
    // TODO: handle order_event
    console.log(data);
  });
  return <>Orders</>;
};

export default Component;
