import { FC, useContext, useReducer, useState } from 'react';
import { io } from 'socket.io-client';
import Context from './Context';
import url from '../config/url';
import reducer from './reducer';

const Provider: FC = ({ children }) => {
  const socket = io(url);
  const [state, dispatch] = useReducer(reducer, 'loading');
  socket.on('connect', () => {
    // TODO: handle connect
    console.log('connect');
  });

  socket.on('disconnect', (ev) => {
    // TODO: handle disconnect
    console.log('disconnect', ev);
  });
  socket.on('connect_error', (ev) => {
    // TODO: handle connect_error
    console.log('connect_error', ev);
  });
  socket.on('reconnect', (ev) => {
    // TODO: handle reconnect
    console.log('reconnect', ev);
  });

  return (
    <Context.Provider
      value={{
        socket,
        state,
        dispatch
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
