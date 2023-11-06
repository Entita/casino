import styled from "styled-components";

export const WinShowcaseWrapperStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 26px;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  min-width: 30vw;
  font-weight: bold;
  text-wrap: nowrap;
  font-family: 'Montserrat', sans-serif;
  color: black;

  &:first-child {
    padding-left: 40px;
  }

  &::before {
    position: absolute;
    content: '';
    width: 2px;
    height: 100%;
    background-color: black;
    right: calc(-2.5rem - 1px);
  }
`

export const WinShowcaseTypeStyled = styled.span`
  background-image: ${({ type }) => `url(images/${type}.png)`};
  background-position: center;
  background-size: cover;
  padding: 4px 18px;
  text-transform: uppercase;
  font-size: 21px;
  border: 2px solid black;
  @media (min-height: 1100px) {
    font-size: 32px;
  }
  @media (min-height: 1400px) {
    font-size: 42px;
  }
`

const FooterText = styled.span`
  font-size: 26px;

  @media (min-height: 1100px) {
    font-size: 32px;
  }
  @media (min-height: 1400px) {
    font-size: 42px;
  }
`

export const WinShowcaseAmountStyled = styled(FooterText)``;
export const WinShowcasePlaceStyled = styled(FooterText)``;
