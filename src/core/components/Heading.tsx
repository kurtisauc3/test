import { FC } from 'react';
import styled from 'styled-components';

const StyledHeading = styled.h1`
  font-size: 36px;
  font-weight: 300;
`;

const Component: FC<React.ButtonHTMLAttributes<HTMLHeadingElement>> = (props) => {
  const { children, ...rest } = props;
  return <StyledHeading {...rest}>{children}</StyledHeading>;
};

export default Component;
