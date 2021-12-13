import { FC, useContext } from 'react';
import Context from '../core/network/Context';
import { WhiteContainer, TextContainer, BlackColor, WhiteColor, OrangeContaner } from './styles';

const Component: FC = () => {
  const { connect } = useContext(Context);

  return (
    <WhiteContainer>
      <TextContainer>
        <BlackColor>A network error has occured.</BlackColor>
        <OrangeContaner onClick={connect}>
          <WhiteColor>RECONNECT</WhiteColor>
        </OrangeContaner>
      </TextContainer>
    </WhiteContainer>
  );
};

export default Component;
