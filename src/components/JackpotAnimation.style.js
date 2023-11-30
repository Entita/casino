import styled from 'styled-components'

export const JackpotAnimationWrapperStyled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: brightness(0.6) blur(3px);
  z-index: 999;

  video {
    position: absolute;
    z-index: -1;
  }
`

export const JackpotAnimationTitleWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  color: whitesmoke;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

export const JackpotAnimationTitleStyled = styled.h2`

`

export const JackpotAnimationTypeStyled = styled.h2`

`

export const JackpotAnimationAmountStyled = styled.h2`

`

export const JackpotAnimationMachineStyled = styled.h2`

`
