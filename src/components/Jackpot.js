import React from 'react'
import CountUp from 'react-countup';
import { JackpotAmountStyled, JackpotBorderWrapperStyled, JackpotTitleStyled, JackpotWrapperStyled, MinBetAmountStyled, MinBetTextStyled, MinBetWrapperStyled } from './Jackpot.style'

export default function Jackpot({ special, countDownDuration, showMinBet = true, minBet, amount, prevAmount, type }) {
  return (
    <JackpotWrapperStyled special={special} type={type}>
      <JackpotTitleStyled>{`${type} JACKPOT`}</JackpotTitleStyled>
      <JackpotBorderWrapperStyled>
        <JackpotAmountStyled>
          <CountUp start={prevAmount} end={amount} duration={countDownDuration} decimals={0} suffix=' CZK' useEasing={false} />
        </JackpotAmountStyled>
        {showMinBet && (
          <MinBetWrapperStyled>
            <MinBetTextStyled>MIN.BET</MinBetTextStyled>
            <MinBetAmountStyled>{minBet}</MinBetAmountStyled>
            <MinBetTextStyled>CZK</MinBetTextStyled>
          </MinBetWrapperStyled>
        )}
      </JackpotBorderWrapperStyled>
    </JackpotWrapperStyled>
  )
}
