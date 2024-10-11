import styled from "styled-components";

export const MenuButtonActive = styled.button`
  font-size: 14px;
  color: #000;
  font-weight: 500;
  border: 1px solid transparent;
  background: transparent;
  @media (max-width: 567px){
    font-size: 12px;
  }
`;

export const MainButton = styled.button`
  font-size: 14px;
  font-weight: 400;
  border-radius: 40px;
  padding: 5px 20px;
  background: linear-gradient(100deg, #2ca5d6, #32cd32);
  color: #fff;
  border: none;
  &.selected {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

export const RedirectButton = styled.button`
  font-size: 14px;
  font-weight: 400;
  border-radius: 40px;
  padding: 5px 20px;
  background: linear-gradient(100deg, #2ca5d6, #32cd32);
  color: #fff;
  border: none;

  @media (max-width: 567px) {
    padding: 5px 0px;
    width: 100px;
    font-size: 13px;
  }

  @media (min-width: 567px) and (max-width: 992px) {
    padding: 5px 0px;
    width: 100px;
    font-size: 13px;
  }
`;

export const Heading = styled.h2`
  font-size: 18px;
  color: #000;
  font-weight: 500;
  color: #2ca5d6;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Subdiv = styled.h5`
  font-size: 14px;
  font-weight: 500;
  color: #2ca5d6;
`;

export const BlackBorderButton = styled.button`
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 40px;
  font-size: 14px;
  font-weight: 400;
 
  color: #8b8989;
  background-color: #fff;
  padding: 5px 28px;
  cursor: pointer;
  &.active {
    background-color: #000000;
    color: #fff;
  }
`;
