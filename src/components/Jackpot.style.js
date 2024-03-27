import styled, { css } from 'styled-components'

export const JackpotTitleStyled = styled.h2`
  text-transform: uppercase;
  text-align: center;
  color: whitesmoke;
  margin: 0;
`

export const JackpotAmountStyled = styled.h4`
  letter-spacing: 4px;
  padding: 0.2vw 10vw;
  word-spacing: 4px;
  text-transform: uppercase;
  background-position: center;
  background-size: cover;
  font-family: monospace;
  margin: 0;
`

export const MinBetWrapperStyled = styled.div`
  position: absolute;
  display: flex;
  gap: 4px;
  background-color: whitesmoke;
  bottom: -16px;
  right: -8px;
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
            font-size: ${({ special }) => special ? '5.5vw' : '7.5vw'};
          }
          ${MinBetWrapperStyled} {
            font-size: ${({ special }) => special ? '1.3vw' : '1.5vw'};
            padding: 0.5vw 1.6vw;
          }
          ${JackpotTitleStyled} {
            padding-bottom: 0.2vw;
            font-size: 3.6vw;
            letter-spacing: 0.2vw;
            word-spacing: 1.2vw;
          }
        `
      : type === 'silver'
      ? css`
          ${JackpotAmountStyled} {
            background-image: url('images/silver.png');
            font-size: ${({ special }) => special ? '4.6vw' : '6vw'};
          }
          ${MinBetWrapperStyled} {
            font-size: ${({ special }) => special ? '1vw' : '1.2vw'};
            padding: 0.4vw 1.4vw;
          }
          ${JackpotTitleStyled} {
            padding-bottom: 0.2vw;
            font-size: 3.2vw;
            letter-spacing: 0.2vw;
            word-spacing: 1.2vw;
          }
        `
      : css`
          ${JackpotAmountStyled} {
            background-image: url('images/bronze.png');
            font-size: ${({ special }) => special ? '3.7vw' : '5.5vw'};
          }
          ${MinBetWrapperStyled} {
            font-size: ${({ special }) => special ? '.7vw' : '1vw'};
            padding: 0.35vw 1.3vw;
          }
          ${JackpotTitleStyled} {
            padding-bottom: 0.2vw;
            font-size: 2.8vw;
            letter-spacing: 0.2vw;
            word-spacing: 1.2vw;
          }
        `}
`
