import { FC } from 'react';
import styled from 'styled-components';
import { GREY, ORANGE } from './styles';

const StyledSelect = styled.select`
  border: none;
  background: none;
  color: ${GREY};
  :focus {
    outline: none !important;
  }
`;

const Component: FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <StyledSelect className={className} {...rest}>
      {children}
    </StyledSelect>
  );
};

export default Component;
