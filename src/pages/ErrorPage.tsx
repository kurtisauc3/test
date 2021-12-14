import { FC, useContext } from 'react';
import Context from '../core/network/Context';
import { NetworkError } from '../core/network/types';
import { WhiteContainer, TextContainer, BlackColor, WhiteColor, OrangeContaner } from './styles';

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
    <WhiteContainer>
      <TextContainer>
        <BlackColor>{error}</BlackColor>
        <OrangeContaner onClick={connect}>
          <WhiteColor>RECONNECT</WhiteColor>
        </OrangeContaner>
      </TextContainer>
    </WhiteContainer>
  );
};

export default Component;
