import styled from 'styled-components';
export const WhiteContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f6eb;
  font-size: 36px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const BlackColor = styled.span`
  color: #000000;
`;
export const OrangeContaner = styled.span`
  margin: 18px;
  padding: 18px 36px;
  background-color: #e16847;
  border-radius: 50px;
  width: auto;
  font-size: 16px;
  align-self: flex-end;
  cursor: pointer;
  transition: all 0.4s ease;
  :hover {
    opacity: 0.5;
    transform: translateY(-5px);
  }
`;
export const WhiteColor = styled.span`
  color: #ffffff;
`;
