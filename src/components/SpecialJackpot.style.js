import styled from "styled-components";
import { MinBetWrapperStyled } from "./Jackpot.style";

export const SpecialJackpotWrapperStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  color: whitesmoke;
  gap: 12px;
  width: calc(50% - 12px);

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
    padding: 6px 18px;
    font-size: 13px;
    color: black;

    @media (min-height: 1100px) {
      font-size: 24px;
    }
  }
`;

export const SpecialJackpotTitleStyled = styled.h2`
  font-size: 28px;
  text-transform: uppercase;
  margin: 0;

  @media (min-height: 1100px) {
    font-size: 36px;
  }
`;

export const SpecialJackpotAmountStyled = styled.h4`
  text-transform: uppercase;
  margin: 0;
  background-color: ${({ type }) => `var(--main-${type})`};
  font-size: 36px;
  letter-spacing: 4px;
  word-wrap: 4px;
  padding: 1vh 3vw;
  border-radius: 6px;
  border: 4px solid black;
  font-family: 'Montserrat', sans-serif;
  border-radius: 6px;
  text-wrap: nowrap;
  min-width: 320px;

  @media (min-height: 1100px) {
    font-size: 48px;
    min-width: 400px;
  }

  @media (min-height: 1400px) {
    font-size: 64px;
    min-width: 500px;
  }
`;
