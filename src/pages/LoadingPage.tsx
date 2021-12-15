import { FC } from 'react';
import styled from 'styled-components';

const GradientAnimation = styled.div`
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  width: 100%;
  height: 100%;
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: shimmer;
  animation-timing-function: linear;
  background: linear-gradient(to right, #fffef5, #e4e2d4, #fffef5);
  background-size: 1000px;
  position: relative;
`;

const Component: FC = () => {
  return <GradientAnimation />;
};

export default Component;
