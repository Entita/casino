import styled, { keyframes } from "styled-components";

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  bottom: -100vh;
  width: 100vw;
  transition: bottom 1.6s ease;
  background-color: rgba(205, 155, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 1;

  &.show {
    bottom: 0;
  }
`

const starGlow = keyframes`
  0% {
    filter: grayscale(0);
  } 50% {
    filter: grayscale(1);
  } 100% {
    filter: grayscale(0);
  }
`

export const JackpotStripWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100vw;
  background-color: rgba(205, 155, 0, 1);
  border-block: 1px solid orange;
  padding-block: 2px;

  img {
    aspect-ratio: 1/1;
  }

  .strip_stars {
    gap: 10px;

    & > img {
      animation: infinite ${starGlow} 2s ease;
    }
    & > img:nth-child(odd) {
      animation-delay: 1s;
    }
  }

  & > div {
    display: flex;
    justify-content: center;
  }
`

export const JackpotsWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  & > div:first-child {
    border-top: none;
  }
`

export const JackpotWrapperStyled = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 24px;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 4px;
  padding: 1rem 0;
  border-top: 2px solid black;
`
