import React from 'react'
import { JackpotStripWrapperStyled, WrapperStyled } from './JackpotHistory.style'

export default function JackpotHistory() {
  const [className, setClassName] = React.useState('')

  React.useEffect(() => {
    const interval = setInterval(() => {
      setClassName(prev => prev === '' ? 'show' : '')
    }, 4 * 1000)

    return () => clearTimeout(interval)
  }, [])

  return (
    <WrapperStyled className={className}>
      <JackpotStripWrapperStyled>

      </JackpotStripWrapperStyled>
    </WrapperStyled>
  )
}
