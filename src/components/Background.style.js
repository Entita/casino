import styled, { keyframes } from "styled-components";

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
