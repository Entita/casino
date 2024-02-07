import styled from "styled-components";

export const WrapperStyled = styled.div`
  position: fixed;
  bottom: -100vh;
  width: 100vw;
  height: 100vh;
  background-color: orangered;
  transition: bottom 1.6s ease;
  z-index: 1;

  &.show {
    bottom: 0;
  }
`

export const JackpotStripWrapperStyled = styled.div`

`
