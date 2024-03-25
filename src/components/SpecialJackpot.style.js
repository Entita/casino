import styled from "styled-components";
import { MinBetWrapperStyled } from "./Jackpot.style";

export const SpecialJackpotWrapperStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  color: whitesmoke;
  gap: 1vw;

  &::before {
    position: absolute;
    content: '';
    width: 30px;
    height: 20px;
    background-color: white;
    left: -10px;
    bottom: -5px;
    border-radius: 50%;
    transform: rotate(45deg);
    filter: blur(8px) opacity(.5);
  }

  ${MinBetWrapperStyled} {
    padding: .4vw 1.2vw;
    font-size: 1.2vw;
    color: black;
  }
`;

export const SpecialJackpotTitleStyled = styled.h2`
  font-size: 2.4vw;
  letter-spacing: 0.1vw;
  word-spacing: .8vw;
  text-transform: uppercase;
  margin: 0;
`;

export const SpecialJackpotAmountStyled = styled.h4`
  text-transform: uppercase;
  margin: 0;
  background-color: ${({ type }) => `var(--main-${type})`};
  font-size: 4.4vw;
  letter-spacing: 0.2vw;
  word-wrap: 4px;
  padding: 1vh 3vw;
  border-radius: 6px;
  border: 4px solid black;
  font-family: monospace;
  border-radius: 6px;
  text-wrap: nowrap;
  width: 35vw;
`;
