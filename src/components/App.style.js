import styled, { css, keyframes } from "styled-components";

export const WrapperStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;

  & > button {
    position: absolute;
    left: 1rem;
    top: 1rem;
    padding: .4rem 1rem;
    border-radius: 4px;
    background-color: red;
    color: whitesmoke;
    font-weight: bold;
    letter-spacing: 1px;
    border: 2px solid black;
    cursor: pointer;
  }
`;

const glow = (opacity) => keyframes`
  0% {
    scale: .8;
    opacity: ${opacity};
    filter: unset;
  }
  1% {
    scale: 1;
    opacity: .6;
    filter: blur(2px);
  }
  2% {
    scale: .8;
    opacity: ${opacity};
    filter: unset;
  }
  100% {
    scale: .8;
    opacity: ${opacity};
    filter: unset;
  }
`

export const BackgroundStyled = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: -70vh;
  background: radial-gradient(circle, #17a4f5 0%, #003670 60%, #001437 100%);
  z-index: -1;

  .symbol {
    position: fixed;
    z-index: 1;
    opacity: 0.05;
  }

  .symbol.center {
    opacity: 0.02;
  }

  .glow {
    animation: ${glow(0.05)} 150s linear infinite;
  }

  .spade {
    aspect-ratio: 517/621;
  }

  .diamond {
    aspect-ratio: 422/619;
  }

  .club {
    aspect-ratio: 534/619;
  }

  .heart {
    aspect-ratio: 580/620;
  }
`;

export const JackpotsWrapperStyled = styled.div`
  display: grid;
  grid-template-rows: 85% 15%;
  height: 85vh;
`;

export const NormalJackpotsWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  @media (min-height: 1100px) {
    gap: 4rem;
  }
`;

export const SpecialJackpotsWrapperStyled = styled.div`
  display: flex;
  padding: 0 2rem;
  justify-content: center;
  gap: 8vw;
`;

export const FooterWrapperStyled = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  height: 5vh;
  overflow: hidden;
  background-color: orange;
`;

export const FooterBackgroundStyled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5vh;
  background: repeating-linear-gradient(90deg, #f7d536 0%, #e38e07 60%, #e38b00 100%);
  z-index: -1;
`;


const InfiniteLoop = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50% - 8px));
  }
`

export const ShowcaseContainerWrapperStyled = styled.div`
  display: flex;
  justify-content: space-around;
  display: flex;
  align-items: center;
  min-width: 100%;
  gap: 5rem;
  padding: 4px 12px;

  ${({ $time }) => css`
    animation: ${InfiniteLoop} ${$time*4}s linear infinite;
  `}
`;
