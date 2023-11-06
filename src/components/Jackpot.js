import React from 'react'
import { JackpotAmountStyled, JackpotBorderWrapperStyled, JackpotTitleStyled, JackpotWrapperStyled, MinBetAmountStyled, MinBetTextStyled, MinBetWrapperStyled } from './Jackpot.style'
import { amountFormatter } from '../utils/util'

export default function Jackpot({ minBet, amount, type }) {
  return (
    <JackpotWrapperStyled type={type}>
      <JackpotTitleStyled>{`${type} JACKPOT`}</JackpotTitleStyled>
      <JackpotBorderWrapperStyled>
        <JackpotAmountStyled>{`${amountFormatter(amount)} CZK`}</JackpotAmountStyled>
        <MinBetWrapperStyled>
          <MinBetTextStyled>MIN.BET</MinBetTextStyled>
          <MinBetAmountStyled>{minBet}</MinBetAmountStyled>
          <MinBetTextStyled>CZK</MinBetTextStyled>
        </MinBetWrapperStyled>
      </JackpotBorderWrapperStyled>
    </JackpotWrapperStyled>
  )
}
