import React from 'react'
import { JackpotRowWrapperStyled, JackpotStripWrapperStyled, JackpotWrapperStyled, JackpotsWrapperStyled, WrapperStyled } from './JackpotHistory.style'
import { amountFormatter } from '@/utils/util'
import { WinShowcaseTypeStyled } from './WinShowcase.style'

export default function JackpotHistory({ controls = {}, jackpots = {} }) {
  const [className, setClassName] = React.useState('')
  const showJackpotsSeconds = React.useMemo(() => controls?.lastJackpotsShow || 90, [controls])
  const holdJackpotsSeconds = React.useMemo(() => controls?.lastJackpotsHold || 10, [controls])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setClassName('show')
      setTimeout(() => {
        setClassName('')
      }, holdJackpotsSeconds * 1000 + 1600)
    }, showJackpotsSeconds * 1000 + 1600)

    return () => clearTimeout(interval)
  }, [showJackpotsSeconds, holdJackpotsSeconds])

  return (
    <WrapperStyled className={Object.keys(jackpots).length > 0 ? className : ''}>
      <JackpotStripWrapperStyled />
      <JackpotsWrapperStyled>
        {Object.keys(jackpots).map((type, index) => {
          const jackpotGroup = jackpots[type]
          return (
            <React.Fragment key={index}>
              {jackpotGroup.map((jackpot, index2) => {
                return (
                  <JackpotRowWrapperStyled key={index2}>
                    <span>{jackpot.sql_inserted}</span>
                    <span>{jackpot.sql_bar}</span>
                    <span>{`${amountFormatter(jackpot.jackpot).split('.')[0].replaceAll(',', ' ')} CZK`}</span>
                    <WinShowcaseTypeStyled type={jackpot.sql_jp_name.toLowerCase()}>{jackpot.sql_jp_name}</WinShowcaseTypeStyled>
                  </JackpotRowWrapperStyled>
                )
              })}
            </React.Fragment>
          )
        })}
      </JackpotsWrapperStyled>
      <JackpotStripWrapperStyled />
    </WrapperStyled>
  )
}
