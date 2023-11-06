import React from 'react'
import { WinShowcaseAmountStyled, WinShowcasePlaceStyled, WinShowcaseTypeStyled, WinShowcaseWrapperStyled } from './WinShowcase.style'
import { amountFormatter } from '../utils/util'

export default function WinShowcase({ place, amount, type, duplicate }) {
  return (
    <WinShowcaseWrapperStyled aria-hidden={duplicate}>
      <WinShowcaseTypeStyled type={type}>{type}</WinShowcaseTypeStyled>
      <WinShowcaseAmountStyled>{`${amountFormatter(amount)} CZK`}</WinShowcaseAmountStyled>
      <WinShowcasePlaceStyled>{place}</WinShowcasePlaceStyled>
    </WinShowcaseWrapperStyled>
  )
}
