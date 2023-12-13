import React from 'react'
import CountUp from 'react-countup';
import { SpecialJackpotAmountStyled, SpecialJackpotTitleStyled, SpecialJackpotWrapperStyled } from './SpecialJackpot.style'
import { MinBetAmountStyled, MinBetTextStyled, MinBetWrapperStyled } from './Jackpot.style'

export default function SpecialJackpot({ minBet, amount, prevAmount, type }) {
  return (
    <SpecialJackpotWrapperStyled>
      <SpecialJackpotTitleStyled>{`${type} JACKPOT`}</SpecialJackpotTitleStyled>
      <SpecialJackpotAmountStyled type={type}>
        <CountUp start={prevAmount} end={amount} duration={15} decimals={2} suffix=' CZK' useEasing={false} />
      </SpecialJackpotAmountStyled>
      <MinBetWrapperStyled>
        <MinBetTextStyled>MIN.BET</MinBetTextStyled>
        <MinBetAmountStyled>{minBet}</MinBetAmountStyled>
        <MinBetTextStyled>CZK</MinBetTextStyled>
      </MinBetWrapperStyled>
    </SpecialJackpotWrapperStyled>
  )
}
