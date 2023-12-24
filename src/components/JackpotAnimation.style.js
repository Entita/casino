import styled, { css, keyframes } from 'styled-components'

export const JackpotAnimationWrapperStyled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: brightness(0.6) blur(3px);
  z-index: 999;
  transition: ${({ loaded }) => loaded ? 'all .4s ease' : 'none'};
  visibility: ${({ showJackpot }) => showJackpot ? 'visible' : 'hidden'};
  opacity: ${({ showJackpot }) => showJackpot ? 1 : 0};

  & > video {
    position: absolute;
    height: 100vw;
    left: 50%;
    transform: translateX(-50%);
    aspect-ratio: 1920/1080;
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

  & > video {
    margin-top: 2.75vw;
    width: min(45vw, 80vh);
    aspect-ratio: 1/1;
  }
`

const starburst = keyframes`
  0% {
    width: 0;
    rotate: 0deg;
    scale: 1;
  }
  7.5% {
    width: min(45vw, 80vh);
    scale: 1.15;
  }
  40% {
    scale: 1;
  }
  70% {
    scale: 1.15;
  }
  100% {
    width: min(45vw, 80vh);
    rotate: 360deg;
    scale: 1;
  }
`

const jackpotAnimation = keyframes`
  7.5% {
    scale: 1;
  }
  100% {
    scale: 1;
  }
`

export const JackpotBackgroundWrapperStyled = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  top: 50%;
  left: calc(50% - 0.75vw);
  transform: translate(-50%, -50%);
  aspect-ratio: 1/1;
  width: min(45vw, 80vh);
  z-index: -1;

  svg {
    position: absolute;
    scale: 0;
    height: fit-content;
    margin: 0;
    z-index: 1;

    ${({ showJackpot }) => showJackpot && css`
      animation: ${jackpotAnimation} 9.9s linear;
      animation-delay: 1.9s;
    `}

    text {
      fill: #ffcb3b;
      text-shadow: 3px 2px 1px #826000;
    }

    #jackpot_curve_text {
      font-size: 78px;
      fill: #ffcb3b;
      text-shadow: 8px 8px 3px #826000;
    }

    #type_curve_text {
      font-size: 34px;
    }

    #machine_curve_text {
      font-size: 21px;
    }

    #amount_curve_text {
      font-size: 48px;
    }
  }
`

export const JackpotBackgroundStyled = styled.div`
  --stripe2: rgba(255,255,0,0.25);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  aspect-ratio: 1/1;
  width: 0;
  border-radius: 50%;
  transform-origin: 0 0;
  background-attachment:fixed;
  animation: none;
  background-image:
    radial-gradient(rgba(255,255,255,1), transparent 65%),
    conic-gradient(
      transparent 0%,  transparent 5%,
      var(--stripe2) 5%,  var(--stripe2) 10%,
      transparent 10%, transparent 15%,
      var(--stripe2) 15%, var(--stripe2) 20%,
      transparent 20%, transparent 25%,
      var(--stripe2) 25%, var(--stripe2) 30%,
      transparent 30%, transparent 35%,
      var(--stripe2) 35%, var(--stripe2) 40%,
      transparent 40%, transparent 45%,
      var(--stripe2) 45%, var(--stripe2) 50%,
      transparent 50%, transparent 55%,
      var(--stripe2) 55%, var(--stripe2) 60%,
      transparent 60%, transparent 65%,
      var(--stripe2) 65%, var(--stripe2) 70%,
      transparent 70%, transparent 75%,
      var(--stripe2) 75%, var(--stripe2) 80%,
      transparent 80%, transparent 85%,
      var(--stripe2) 85%, var(--stripe2) 90%,
      transparent 90%, transparent 95%,
      var(--stripe2) 95%, var(--stripe2) 100%
    );

  ${({ showJackpot }) => showJackpot && css`
    animation: ${starburst} 10s linear;
    animation-delay: 1.8s;
  `}
`
