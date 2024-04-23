import styled, { keyframes } from 'styled-components'
import { JackpotWrapperStyled } from './Jackpot.style'

export const JackpotAnimationWrapperStyled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: brightness(0.6) blur(3px);
  z-index: 999;
  transition: all .4s ease;
  visibility: ${({ showJackpot }) => showJackpot ? 'visible' : 'hidden'};
  opacity: ${({ showJackpot }) => showJackpot ? 1 : 0};
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

export const JackpotBackgroundWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`

const letterJAnimation = keyframes`
  0% { scale: 1 } 50% {
    scale: 1.2;
    transform: translate(9vw, -4%)
  } 100% { scale: 1 }
`

const letterAAnimation = keyframes`
  0% { scale: 1 } 50% {
    scale: 1.2;
    transform: translate(6vw, -12.5%);
  } 100% { scale: 1 }
`

const letterCAnimation = keyframes`
  0% { scale: 1 } 50% {
    scale: 1.2;
    transform: translate(3vw, -15.5%);
  } 100% { scale: 1 }
`

const letterKAnimation = keyframes`
  0% { scale: 1 } 50% {
    scale: 1.2;
    transform: translate(0vw, -18.5%);
  } 100% { scale: 1 }
`

const letterPAnimation = keyframes`
  0% { scale: 1 } 50% {
    scale: 1.2;
    transform: translate(-2vw, -11.5%);
  } 100% { scale: 1 }
`

const letterOAnimation = keyframes`
  0% { scale: 1 } 50% {
    scale: 1.2;
    transform: translate(-7vw, -10.5%);
  } 100% { scale: 1 }
`

const letterTAnimation = keyframes`
  0% { scale: 1 } 50% {
    scale: 1.2;
    transform: translate(-10vw, -7.5%);
  } 100% { scale: 1 }
`

const initWrapperAnimation = keyframes`
  0% { scale: 0 }
  100% { scale: 1 }
`

const endWrapperAnimation = keyframes`
  0% { scale: 1; top: 50%; transform: translateY(-50%); }
  100% { scale: .5; top: 0; transform: translateY(-30%); }
`

export const JackpotTitleWrapperStyled = styled.div`
  position: relative;
  display: flex;
  animation: ${initWrapperAnimation} 1.2s ease, ${endWrapperAnimation} 2s ease;
  animation-fill-mode: forwards;
  top: 50%;
  transform: translateY(-50%);
  scale: 0;
  animation-delay: .15s, 2.1s;
  height: max-content;
  z-index: 1;

  &::before {
    position: absolute;
    content: '';
    top: 3vw;
    bottom: 3vw;
    right: 20vw;
    left: 20vw;
    border-radius: 50%;
    background: radial-gradient(circle, #ffbf0f 0%, #ffcb0f 15%, transparent 30.1%, transparent 100%);
  }
`

export const JackpotLetterStyled = styled.img`
  width: 12.5vw;

  &#j { transform: translate(12vw, 0%); z-index: 0; animation: ${letterJAnimation} .4s ease; animation-delay: 1s}
  &#a { transform: translate(8vw, -5%); z-index: 1; animation: ${letterAAnimation} .4s ease; animation-delay: 1.1s }
  &#c { transform: translate(4vw, -8%); z-index: 2; animation: ${letterCAnimation} .4s ease; animation-delay: 1.2s }
  &#k { transform: translate(0vw, -12%); z-index: 3; animation: ${letterKAnimation} .4s ease; animation-delay: 1.3s }
  &#p { transform: translate(-4vw, -9%); z-index: 2; animation: ${letterPAnimation} .4s ease; animation-delay: 1.4s }
  &#o { transform: translate(-9vw, -5%); z-index: 1; animation: ${letterOAnimation} .4s ease; animation-delay: 1.5s }
  &#t { transform: translate(-12vw, 0%); z-index: 0; animation: ${letterTAnimation} .4s ease; animation-delay: 1.6s }
`

export const JackpotBackgroundStyled = styled.div`
  .flying_particle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 4px;
    background: #fff;
    border-radius: 50%;
    scale: 0;
  }

  .flying_particle_tail {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #fffdd7 0%, rgba(255, 222, 15, .5) 20%, transparent 100%);
  }
`

const initSlotAnimation = keyframes`
  0% { scale: 0 }
  100% { scale: 1 }
`

const SlotMachineStyled = styled.video`
  position: absolute;
  width: 30vw;
  top: 50%;
  transform: translateY(-50%);
  animation: ${initSlotAnimation} 2s ease;
  animation-fill-mode: forwards;
  animation-delay: 2.2s;
  scale: 0;
`

export const SlotMachineStyledStatic = styled(SlotMachineStyled)`

`

const hideSlotAnimation = keyframes`
  0% { opacity: 1 }
  100% { opacity: 0 }
`

export const SlotMachineStyledAnimation = styled(SlotMachineStyled)`
  z-index: 1;
  opacity: 1;
  animation: ${initSlotAnimation} 2s ease, ${hideSlotAnimation} .01s linear;
  animation-fill-mode: forwards;
  animation-delay: 2.2s, 6.9s;
`

const initSlotTitleAnimation = keyframes`
  0% { scale: 0 }
  100% {
    scale: 1;
    transform: translateY(calc(-50% - calc(19vw / 2.5)));
  }
`

export const SlotMachineTitleStyled = styled.h2`
  position: absolute;
  scale: 0;
  animation: ${initSlotTitleAnimation} 2s ease;
  animation-fill-mode: forwards;
  animation-delay: 2.8s;
  top: 50%;
  font-size: 3vw;
  transform: translateY(-50%);
  background: -webkit-linear-gradient(#fff6c9 20%, #ffcc14);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: -1;
  margin: 0;
`

const initJackpotAmountAnimation = keyframes`
  0% { scale: 0 }
  100% {
    scale: 1;
    top: 80%;
  }
`

export const JackpotAmountTitleStyled = styled(JackpotWrapperStyled)`
  color: black;
  position: absolute;
  scale: 0;
  animation: ${initJackpotAmountAnimation} 2s ease;
  animation-fill-mode: forwards;
  animation-delay: 2.8s;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  z-index: -1;

  & > h2 {
    font-family: 'Italiana', sans-serif;
  }
`
