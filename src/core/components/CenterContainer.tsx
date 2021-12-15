import { FC } from 'react';
import styled from 'styled-components';

const CenterContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Component: FC<React.ButtonHTMLAttributes<HTMLDivElement>> = (props) => {
  const { children, ...rest } = props;
  return (
    <CenterContainer {...rest}>
      <ColumnContainer>{children}</ColumnContainer>
    </CenterContainer>
  );
};

export default Component;
