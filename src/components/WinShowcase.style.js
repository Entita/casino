import styled from "styled-components";

export const WinShowcaseWrapperStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5vw;
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
  padding: 0.2vw 1vw;
  text-transform: uppercase;
  font-size: 1.1vw;
  text-align: center;
  border: 2px solid black;
`

const FooterText = styled.span`
  font-size: 1.6vw;
`

export const WinShowcaseAmountStyled = styled(FooterText)``;
export const WinShowcasePlaceStyled = styled(FooterText)``;
