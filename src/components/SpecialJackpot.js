import React from 'react'
import { SpecialJackpotAmountStyled, SpecialJackpotTitleStyled, SpecialJackpotWrapperStyled } from './SpecialJackpot.style'
import { MinBetAmountStyled, MinBetTextStyled, MinBetWrapperStyled } from './Jackpot.style'
import { amountFormatter } from '../utils/util'

export default function SpecialJackpot({ minBet, amount, type }) {
  return (
    <SpecialJackpotWrapperStyled>
      <SpecialJackpotTitleStyled>{`${type} JACKPOT`}</SpecialJackpotTitleStyled>
      <SpecialJackpotAmountStyled type={type}>{`${amountFormatter(amount)} CZK`}</SpecialJackpotAmountStyled>
      <MinBetWrapperStyled>
        <MinBetTextStyled>MIN.BET</MinBetTextStyled>
        <MinBetAmountStyled>{minBet}</MinBetAmountStyled>
        <MinBetTextStyled>CZK</MinBetTextStyled>
      </MinBetWrapperStyled>
    </SpecialJackpotWrapperStyled>
  )
}
