import React from 'react'
import {
  JackpotAmountTitleStyled,
  JackpotAnimationTitleWrapperStyled,
  JackpotAnimationWrapperStyled,
  JackpotBackgroundStyled,
  JackpotBackgroundWrapperStyled,
  JackpotLetterStyled,
  JackpotTitleWrapperStyled,
  SlotMachineStyled,
  SlotMachineStyledAnimation,
  SlotMachineStyledStatic,
  SlotMachineTitleStyled
} from './JackpotAnimation.style'
import { amountFormatter } from '@/utils/util'
import { JackpotAmountStyled, JackpotBorderWrapperStyled, JackpotTitleStyled } from './Jackpot.style'

export default function JackpotAnimation({ controls, lastJackpot, setLastJackpot }) {
  const [loaded, setLoaded] = React.useState(false)
  const [showJackpot, setShowJackpot] = React.useState(false)
  const [audio] = React.useState(typeof Audio !== "undefined" && new Audio('/sounds/jackpot_v2.mp3'))
  const starsWrapperRef = React.useRef(null)
  const slotMachineRef = React.useRef(null)
  const slotMachineAnimationRef = React.useRef(null)
  const duration = 20000

  const createStars = () => {
    const getRandomNumber = (min, max) => {
      return Math.random() * (max - min) + min;
    }

    starsWrapperRef.current.innerHTML = ''
    const numberOfStars = typeof controls?.animationParticles === 'number' ? controls.animationParticles : 150
    let i = 0
    const degSpace = 360 / numberOfStars
    while (i < numberOfStars) {
      const starElement = document.createElement('div')
      const starTailElement = document.createElement('div')
      starElement.classList.add('flying_particle')
      starTailElement.classList.add('flying_particle_tail')

      const rotation = i * degSpace + getRandomNumber(0.1, 10)
      const delayInSec = getRandomNumber(0, 2) + 0.4
      starElement.animate([
        {
          scale: 1,
          transform: `rotate(${rotation}deg) translateX(0)`,
        },
        {
          scale: 1,
          transform: `rotate(${rotation}deg) translateX(min(-75vw, -75vh))`,
        },
      ], { duration: 2000, iterations: Math.floor(duration / 2000) - 1, easing: 'linear', delay: delayInSec * 1000 })
      starElement.appendChild(starTailElement)
      starTailElement.animate([
        { width: 0, offset: 0 },
        { width: 'max(15vw, 15vh)', offset: 0.3 },
        { width: 'max(15vw, 15vh)', offset: 0.9 },
        { width: 0, offset: 0.901 },
        { width: 0, offset: 1 },
      ], { duration: 2000, iterations: Math.floor(duration / 2000) - 1, easing: 'linear', delay: delayInSec * 1000 })

      starElement.appendChild(starTailElement)
      starsWrapperRef.current.appendChild(starElement)
      i++
    }
    setTimeout(() => {
      starsWrapperRef.current.innerHTML = ''
    }, duration)
  }

  React.useEffect(() => {
    setLoaded(true)
  }, [])

  React.useEffect(() => {
    if (Object.keys(lastJackpot).length === 0) return
    audio.load()
    slotMachineRef.current.load()
    audio.volume = 0.15
    audio.currentTime = 1
    setShowJackpot(true)
    audio.play()
    slotMachineRef.current.play()
    createStars()
    let timeout1 = setTimeout(() => {
      slotMachineAnimationRef.current.load()
      slotMachineAnimationRef.current.play()
    }, 2100)
    let timeout2 = setTimeout(() => {
      audio.pause()
      setShowJackpot(false)
      setLastJackpot({})
    }, duration)

    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
      audio.pause()
    }
  }, [lastJackpot])

  return (
    <JackpotAnimationWrapperStyled loaded={loaded} showJackpot={showJackpot}>
      <JackpotAnimationTitleWrapperStyled>
        <JackpotBackgroundWrapperStyled showJackpot={showJackpot}>
          <JackpotBackgroundStyled ref={starsWrapperRef} showJackpot={showJackpot} />
          {Object.keys(lastJackpot).length > 0 && (
            <>
              <JackpotTitleWrapperStyled>
                <JackpotLetterStyled id='j' src='./images/j.png' />
                <JackpotLetterStyled id='a' src='./images/a.png' />
                <JackpotLetterStyled id='c' src='./images/c.png' />
                <JackpotLetterStyled id='k' src='./images/k.png' />
                <JackpotLetterStyled id='p' src='./images/p.png' />
                <JackpotLetterStyled id='o' src='./images/o.png' />
                <JackpotLetterStyled id='t' src='./images/t.png' />
              </JackpotTitleWrapperStyled>
              <SlotMachineStyledStatic ref={slotMachineRef} muted autoplay loop>
                <source src='video/slot-static.webm' type="video/mp4" />
              </SlotMachineStyledStatic>
              <SlotMachineStyledAnimation ref={slotMachineAnimationRef} muted>
                <source src='video/slot-animation.webm' type="video/mp4" />
              </SlotMachineStyledAnimation>
              <SlotMachineTitleStyled>{lastJackpot.sql_machine}</SlotMachineTitleStyled>
              <JackpotAmountTitleStyled type={lastJackpot.sql_jp_name?.toLowerCase()}>
                <JackpotTitleStyled>{`${lastJackpot.sql_jp_name} JACKPOT`}</JackpotTitleStyled>
                <JackpotBorderWrapperStyled>
                  <JackpotAmountStyled>{`${amountFormatter(lastJackpot.jackpot)} CZK`}</JackpotAmountStyled>
                </JackpotBorderWrapperStyled>
              </JackpotAmountTitleStyled>
            </>
          )}
        </JackpotBackgroundWrapperStyled>
      </JackpotAnimationTitleWrapperStyled>
    </JackpotAnimationWrapperStyled>
  )
}
