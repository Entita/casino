import styled, { css } from 'styled-components'

export const JackpotTitleStyled = styled.h2`
  text-transform: uppercase;
  text-align: center;
  color: whitesmoke;
  margin: 0;
`

export const JackpotAmountStyled = styled.h4`
  letter-spacing: 4px;
  padding: 1vh 10vw;
  word-spacing: 4px;
  text-transform: uppercase;
  background-position: center;
  background-size: cover;
  font-family: 'Montserrat', sans-serif;
  margin: 0;

  @media (min-width: 2000px) {
    padding-inline: 20vw;
  }
  @media (min-height: 1100px) {
    padding-block: 2vh;
  }
`

export const MinBetWrapperStyled = styled.div`
  position: absolute;
  display: flex;
  gap: 4px;
  background-color: whitesmoke;
  bottom: -16px;
  right: -8px;
  font-size: 15px;
  padding: 2px 12px;
  font-family: 'Montserrat', sans-serif;
`

export const MinBetTextStyled = styled.span``

export const MinBetAmountStyled = styled.span`
  padding-left: 12px;
`

export const JackpotBorderWrapperStyled = styled.div`
  position: relative;
  border: 3px solid black;
  border-radius: 6px;

  &::before {
    position: absolute;
    content: '';
    width: 30px;
    height: 20px;
    background-color: white;
    left: -10px;
    bottom: -5px;
    border-radius: 50%;
    transform: rotate(45deg);
    filter: blur(8px) opacity(.5);
  }
`;

export const JackpotWrapperStyled = styled.div`
  margin-top: -2rem;
  text-wrap: nowrap;

  ${({ type }) =>
    type === 'gold'
      ? css`
          ${JackpotAmountStyled} {
            background-image: url('images/gold.png');
            font-size: 72px;
            @media (min-height: 1400px) {
              font-size: 96px;
            }
          }
          ${MinBetWrapperStyled} {
            font-size: 19px;
            padding: 8px 24px;
            @media (min-height: 1100px) {
              font-size: 32px;
            }
          }
          ${JackpotTitleStyled} {
            top: -48px;
            padding: 10px 26px;
            font-size: 48px;
            @media (min-height: 1100px) {
              font-size: 84px;
            }
          }
        `
      : type === 'silver'
      ? css`
          ${JackpotAmountStyled} {
            background-image: url('images/silver.png');
            font-size: 64px;
            @media (min-height: 1400px) {
              font-size: 86px;
            }
          }
          ${MinBetWrapperStyled} {
            font-size: 17px;
            padding: 6px 20px;
            @media (min-height: 1100px) {
              font-size: 32px;
            }
          }
          ${JackpotTitleStyled} {
            top: -40px;
            padding: 8px 22px;
            font-size: 42px;
            @media (min-height: 1100px) {
              font-size: 74px;
            }
          }
        `
      : css`
          ${JackpotAmountStyled} {
            background-image: url('images/bronze.png');
            font-size: 56px;
            @media (min-height: 1400px) {
              font-size: 76px;
            }
          }
          ${MinBetWrapperStyled} {
            font-size: 15px;
            padding: 4px 16px;
            @media (min-height: 1100px) {
              font-size: 28px;
            }
          }
          ${JackpotTitleStyled} {
            top: -32px;
            padding: 6px 18px;
            font-size: 36px;
            @media (min-height: 1100px) {
              font-size: 60px;
            }
          }
        `}
`
