import React from 'react'
import { JackpotStripWrapperStyled, JackpotWrapperStyled, JackpotsWrapperStyled, WrapperStyled } from './JackpotHistory.style'
import { amountFormatter } from '@/utils/util'
import { WinShowcaseTypeStyled } from './WinShowcase.style'

export default function JackpotHistory({ controls = {}, jackpots = {} }) {
  const [className, setClassName] = React.useState('')
  const showJackpotsSeconds = React.useMemo(() => controls.lastJackpotsShow || 90, [controls])
  const holdJackpotsSeconds = React.useMemo(() => controls.lastJackpotsHold || 10, [controls])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setClassName('show')
      setTimeout(() => {
        setClassName('')
      }, holdJackpotsSeconds * 1000)
    }, showJackpotsSeconds * 1000)

    return () => clearTimeout(interval)
  }, [showJackpotsSeconds, holdJackpotsSeconds])

  return (
    <WrapperStyled className={className}>
      <JackpotStrip />
      <JackpotsWrapperStyled>
        {Object.keys(jackpots).map((type, index) => {
          const jackpotGroup = jackpots[type]
          return (
            <React.Fragment key={index}>
              {jackpotGroup.map((jackpot, index2) => {
                return (
                  <JackpotWrapperStyled key={index2}>
                    <WinShowcaseTypeStyled type={jackpot.sql_jp_name.toLowerCase()}>{jackpot.sql_jp_name}</WinShowcaseTypeStyled>
                    <span>{jackpot.sql_inserted}</span>
                    <span>{jackpot.sql_machine}</span>
                    <span>{`${amountFormatter(jackpot.jackpot)} CZK`}</span>
                  </JackpotWrapperStyled>
                )
              })}
            </React.Fragment>
          )
        })}
      </JackpotsWrapperStyled>
      <JackpotStrip />
    </WrapperStyled>
  )
}

const JackpotStrip = () => {
  const wrapperRef = React.useRef(null)

  const getTextWidth = (text, font) => {
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }

  const createDynamicStripe = () => {
    wrapperRef.current.innerHTML = ''

    const elementSize = wrapperRef.current.getBoundingClientRect()
    const firstStarsStrip = document.createElement('div')
    firstStarsStrip.classList.add('strip_stars')
    const starsGap = 10
    const starWidth = 20
    let tempStars = 0
    while (tempStars < elementSize.width) {
      const starElement = document.createElement('img')
      starElement.src = 'images/star.png'
      starElement.style = `width: ${starWidth}px;`
      tempStars += starWidth + starsGap
      if (tempStars - starsGap < elementSize.width) {
        firstStarsStrip.appendChild(starElement)
      }
    }
    wrapperRef.current.appendChild(firstStarsStrip)
  }

  React.useEffect(() => {
    if (!wrapperRef || !wrapperRef.current) return

    createDynamicStripe()
    window.addEventListener('resize', createDynamicStripe)
    return () => window.removeEventListener('resize', createDynamicStripe)
  }, [])

  return (
    <JackpotStripWrapperStyled ref={wrapperRef} />
  )
}
