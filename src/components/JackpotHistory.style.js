import styled from "styled-components";
import { WinShowcaseTypeStyled } from "./WinShowcase.style";

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  bottom: -100vh;
  transition: bottom 1.6s ease;
  border-radius: 8px 8px 0 0;
  backdrop-filter: blur(5px);
  overflow-x: hidden;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: #003670;
  color: whitesmoke;

  &.show {
    bottom: 0;
  }
`

export const JackpotStripWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  background-color: rgba(205, 155, 0, 1);
  border-block: 1px solid orange;
  padding-block: 2px;
`

export const JackpotsWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 0.3vw;
  font-size: 2vw;
  align-items: center;
  column-gap: 7vw;

  ${WinShowcaseTypeStyled} {
    color: black;
    text-align: center;
    height: max-content;
  }
`

export const JackpotRowWrapperStyled = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 13% 35% 18% 10%;
  column-gap: 8%;
  width: 90%;

  &:not(:last-child) {
    &::before {
      position: absolute;
      content: '';
      height: 2px;
      width: calc(100% + 2vw);
      bottom: -2vh;
      left: -1vw;
      background-color: whitesmoke;
      filter: blur(2px);
    }
  }

  & > span:nth-child(3) {
    text-align: right;
  }
`

export const JackpotWrapperStyled = styled.div`

`
