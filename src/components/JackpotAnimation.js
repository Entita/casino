import React from 'react'
import {
  JackpotAnimationTitleWrapperStyled,
  JackpotAnimationWrapperStyled,
  JackpotBackgroundStyled,
  JackpotBackgroundWrapperStyled
} from './JackpotAnimation.style'
import { amountFormatter } from '@/utils/util'

export default function JackpotAnimation({ lastJackpot, setLastJackpot }) {
  const [loaded, setLoaded] = React.useState(false)
  const [showJackpot, setShowJackpot] = React.useState(false)
  const [audio] = React.useState(typeof Audio !== "undefined" && new Audio('/sounds/jackpot_v2.mp3'))
  const videoRef = React.useRef(null)
  const slotMachineRef = React.useRef(null)

  React.useEffect(() => {
    setLoaded(true)
  }, [])

  React.useEffect(() => {
    audio.load()
    videoRef.current.load()
    slotMachineRef.current.load()
    if (Object.keys(lastJackpot).length === 0 || !videoRef || !videoRef.current || !slotMachineRef || !slotMachineRef.current) return

    setShowJackpot(true)
    slotMachineRef.current.play()
    audio.volume = 0.05
    audio.currentTime = 2
    audio.play()

    let timeout1 = setTimeout(() => {
      videoRef.current.play()
    }, 1500)
    let timeout2 = setTimeout(() => {
      setShowJackpot(false)
      setTimeout(() => {
        setLastJackpot({})
      }, 400)
    }, 10000)

    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
    }
  }, [lastJackpot])

  return (
    <JackpotAnimationWrapperStyled loaded={loaded} showJackpot={showJackpot}>
      <video ref={videoRef} muted>
        <source src='video/padajici-mince_transparent.webm' type="video/mp4" />
      </video>
      <JackpotAnimationTitleWrapperStyled>
        <JackpotBackgroundWrapperStyled showJackpot={showJackpot}>
          <JackpotBackgroundStyled showJackpot={showJackpot} />
          <svg viewBox="0 0 500 500">
            <path id="jackpot_curve" fill='transparent' d="M73.2,148.6c4-6.1,65.5-66.8,178.6-65.6c111.3,1.2,170.8,70.3,175.1,67" />
            <text id='jackpot_curve_text' width="500">
              <textPath startOffset="50%" textAnchor="middle" xlinkHref="#jackpot_curve">JACKPOT</textPath>
            </text>

            <path id='type_curve' fill='transparent' d="m 123 149 c 4 -6.1 51 -27 121 -25 C 254 122 315 125 349 150" />
            <text id='type_curve_text' width="500">
              <textPath startOffset="50%" textAnchor="middle" xlinkHref="#type_curve">{lastJackpot?.sql_jp_name || ''}</textPath>
            </text>

	          <path id='machine_curve' fill='transparent' d="m 133 339 c 2 5 8 25 115 25 C 353 363 359 345 359 340" />
            <text id='machine_curve_text' width="500">
              <textPath startOffset="50%" textAnchor="middle" xlinkHref="#machine_curve">{lastJackpot?.sql_machine || ''}</textPath>
            </text>

            <path id='amount_curve' fill='transparent' d="M 73.2 348.6 c 1.8 7.4 14.8 66.4 178.6 65.6 c 161.2 -1.2 172.2 -59.2 175.1 -67" />
            <text id='amount_curve_text' width="500">
              <textPath startOffset="50%" textAnchor="middle" xlinkHref="#amount_curve">{amountFormatter(lastJackpot?.jackpot || 0)}</textPath>
            </text>
          </svg>
        </JackpotBackgroundWrapperStyled>
        <video ref={slotMachineRef} muted>
          <source src='video/slot-machine.webm' type="video/mp4" />
        </video>
      </JackpotAnimationTitleWrapperStyled>
    </JackpotAnimationWrapperStyled>
  )
}
