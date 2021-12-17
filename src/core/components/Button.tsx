import { FC } from 'react';
import styled from 'styled-components';
import { ORANGE, GREEN, WHITE } from './styles';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  theme: 'white' | 'orange' | 'green';
};

const StyledButton = styled.button`
  border: none;
  padding: 18px 36px;
  border-radius: 50px;
  width: auto;
  font-size: 16px;
  transition: all 0.4s ease;
  color: ${(props: ButtonProps) => {
    switch (props.theme) {
      case 'white':
        return ORANGE;
      case 'orange':
      case 'green':
        return WHITE;
    }
  }};
  background-color: ${(props: ButtonProps) => {
    switch (props.theme) {
      case 'white':
        return WHITE;
      case 'orange':
        return ORANGE;
      case 'green':
        return GREEN;
    }
  }};
  cursor: pointer;
  :hover {
    opacity: 0.5;
    transform: translateY(-5px);
  }
`;

const Component: FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Component;
