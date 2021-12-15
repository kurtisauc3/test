import { FC, useContext } from 'react';
import Context from '../core/network/Context';
import { NetworkError } from '../core/network/types';
import CenterContainer from '../core/components/CenterContainer';
import Button from '../core/components/Button';
import Heading from '../core/components/Heading';

type ErrorMap = {
  [Key in NetworkError]: string;
};

const Errors: ErrorMap = {
  'connect error': 'Error connecting to server.',
  'io server disconnect': 'You have been disconnected from the server',
  'ping timeout': 'An unknown error has occured.',
  'transport close': 'Error connecting to server.',
  'transport error': 'An unknown error has occured.'
};

const Component: FC = () => {
  const { connect, networkError } = useContext(Context);
  const error = networkError ? Errors[networkError] : 'A network error has occured.';
  return (
    <CenterContainer>
      <Heading>{error}</Heading>
      <Button theme="orange" onClick={connect}>
        RECONNECT
      </Button>
    </CenterContainer>
  );
};

export default Component;
