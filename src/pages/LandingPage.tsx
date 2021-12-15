import { FC, useContext } from 'react';
import Context from '../core/network/Context';
import CenterContainer from '../core/components/CenterContainer';
import Button from '../core/components/Button';
import Heading from '../core/components/Heading';

const Component: FC = () => {
  const { connect } = useContext(Context);

  return (
    <CenterContainer>
      <Heading>Front-end Engineering Challenge</Heading>
      <Button theme="orange" onClick={connect}>
        CONNECT
      </Button>
    </CenterContainer>
  );
};

export default Component;
