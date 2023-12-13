import React from 'react'
import {
  JackpotAnimationAmountStyled,
  JackpotAnimationMachineStyled,
  JackpotAnimationTitleStyled,
  JackpotAnimationTitleWrapperStyled,
  JackpotAnimationTypeStyled,
  JackpotAnimationWrapperStyled
} from './JackpotAnimation.style'
import { amountFormatter } from '@/utils/util'

export default function JackpotAnimation() {
  return (
    <JackpotAnimationWrapperStyled>
      <video autoPlay muted loop>
        <source src='video/jackpot-coins-new.mp4' type="video/mp4" />
      </video>
      <JackpotAnimationTitleWrapperStyled>
        <JackpotAnimationTitleStyled>JACKPOT</JackpotAnimationTitleStyled>
        <JackpotAnimationTypeStyled>gold</JackpotAnimationTypeStyled>
        <JackpotAnimationAmountStyled>{amountFormatter(14486)}</JackpotAnimationAmountStyled>
        <JackpotAnimationMachineStyled>G22_SN</JackpotAnimationMachineStyled>
      </JackpotAnimationTitleWrapperStyled>
    </JackpotAnimationWrapperStyled>
  )
}
