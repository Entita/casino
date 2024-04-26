import React from 'react'
import CountUp from 'react-countup';
import { SpecialJackpotAmountStyled, SpecialJackpotTitleStyled, SpecialJackpotWrapperStyled } from './SpecialJackpot.style'
import { MinBetAmountStyled, MinBetTextStyled, MinBetWrapperStyled } from './Jackpot.style'

export default function SpecialJackpot({ countDownDuration, showMinBet = true, minBet, amount, prevAmount, type }) {
  return (
    <SpecialJackpotWrapperStyled>
      <SpecialJackpotTitleStyled>{`${type} JACKPOT`}</SpecialJackpotTitleStyled>
      <SpecialJackpotAmountStyled type={type}>
        <CountUp start={prevAmount} end={amount} duration={countDownDuration} decimals={0} suffix=' CZK' useEasing={false} />
      </SpecialJackpotAmountStyled>
      {showMinBet && (
        <MinBetWrapperStyled>
          <MinBetTextStyled>MIN.BET</MinBetTextStyled>
          <MinBetAmountStyled>{minBet.toFixed(0)}</MinBetAmountStyled>
          <MinBetTextStyled>CZK</MinBetTextStyled>
        </MinBetWrapperStyled>
      )}
    </SpecialJackpotWrapperStyled>
  )
}
