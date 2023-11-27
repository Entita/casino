import styled, { css, keyframes } from "styled-components";

export const WrapperStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
`;

export const BackgroundStyled = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: -50vh;
  background: radial-gradient(circle, #ac1020 0%, #280700 75%);
  z-index: -1;
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
