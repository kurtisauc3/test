import { FC } from 'react';
import styled from 'styled-components';
import { GREY, ORANGE } from './styles';

const StyledInput = styled.input`
  border: 2px solid ${GREY}33;
  border-radius: 5px;
  padding: 6px 12px;
  :focus {
    outline: none !important;
    border-color: ${ORANGE};
  }
`;

const Component: FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <StyledInput className={className} {...rest}>
      {children}
    </StyledInput>
  );
};

export default Component;
