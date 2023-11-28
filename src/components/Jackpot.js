import React from 'react'
import CountUp from 'react-countup';
import { JackpotAmountStyled, JackpotBorderWrapperStyled, JackpotTitleStyled, JackpotWrapperStyled, MinBetAmountStyled, MinBetTextStyled, MinBetWrapperStyled } from './Jackpot.style'

export default function Jackpot({ minBet, amount, prevAmount, type }) {
  return (
    <JackpotWrapperStyled type={type}>
      <JackpotTitleStyled>{`${type} JACKPOT`}</JackpotTitleStyled>
      <JackpotBorderWrapperStyled>
        <JackpotAmountStyled>
          <CountUp start={prevAmount} end={amount} duration={2} decimals={2} suffix=' CZK' />
        </JackpotAmountStyled>
        <MinBetWrapperStyled>
          <MinBetTextStyled>MIN.BET</MinBetTextStyled>
          <MinBetAmountStyled>{minBet}</MinBetAmountStyled>
          <MinBetTextStyled>CZK</MinBetTextStyled>
        </MinBetWrapperStyled>
      </JackpotBorderWrapperStyled>
    </JackpotWrapperStyled>
  )
}
