import styled, { keyframes } from "styled-components";

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  bottom: -100vh;
  width: 80vw;
  transition: bottom 1.6s ease;
  background-color: rgba(205, 155, 0, 0.8);
  border-radius: 8px 8px 0 0;
  backdrop-filter: blur(5px);
  overflow-x: hidden;
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
  width: 100%;
  background-color: rgba(205, 155, 0, 1);
  border-block: 1px solid orange;
  padding-block: 2px;

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

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
  display: grid;
  grid-template-columns: max-content max-content max-content max-content;
  justify-content: space-between;
  padding: 8px 2rem 8px 2rem;
  row-gap: 1rem;
  height: 100%;
  font-size: 24px;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 4px;

  span:nth-child(4n + 3) {
    text-align: right;
  }

  & > div:first-child {
    border-top: none;
  }
`

export const JackpotWrapperStyled = styled.div`

`
