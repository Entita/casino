import styled from "styled-components";

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h2 {
    font-size: 48px;
    text-align: center;
    padding: 0 5rem;
  }

  h4 {
    font-size: 24px;
    font-weight: 500;
    margin: 0;
    text-align: center;
  }

  span {
    color: whitesmoke!important;
  }

  & > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 1rem;
    gap: 1.4rem;
    border-top: 1px solid whitesmoke;
    min-height: 510px;
    justify-content: space-between;
  }

  input {
    width: 4rem;
    min-width: unset!important;
    color: whitesmoke;
  }

  div > label:nth-child(even) {
    gap: 8px;
  }

  div > label {
    justify-content: space-between;
  }

  .MuiInputBase-colorPrimary:hover:not(.Mui-disabled, .Mui-error):before {
    border-color: grey!important;
  }

  .MuiInputBase-colorPrimary::after {
    border-color: black!important;
  }

  .MuiInputBase-colorPrimary::before {
    border-color: whitesmoke!important;
  }

  .MuiInputBase-colorPrimary::before {
    border-color: whitesmoke!important;
  }

  .MuiSwitch-track {
    outline: 1px solid whitesmoke;
  }

  & > div > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding-top: 2rem;
  }

  & > div > div > div {
    display: flex;
    flex-direction: column;

    h3 {
      text-transform: capitalize;
      letter-spacing: 2px;
      margin: 0;
    }
    & > div {
      padding-left: 4rem;
    }
  }

  & > div > div > div > div {
    display: flex;
    justify-content: space-between;
  }
`

export const NewJackpotWrapperStyled = styled.div`
  svg {
    cursor: pointer;
    font-size: 48px;
    transition: all .2s ease;
  }

  svg:hover {
    filter: opacity(.6);
  }

  input {
    width: auto;
    min-width: 12rem!important;
  }

  label {
    margin-left: unset!important;
    margin-right: unset!important;
  }
`

export const NewJackpotButtonsWrapperStyled = styled.div`
  grid-template-columns: 1fr 1fr 1fr!important;
  padding-top: 0!important;

  button {
    background-position: center!important;
    background-size: cover!important;
    padding: 4px 18px!important;
    text-transform: uppercase!important;
    font-size: 21px!important;
    border: 2px solid black!important;
    color: black!important;
  }

  button.selected {
    filter: brightness(0.5);
    border: 2px solid whitesmoke!important;
  }

  button:nth-child(1) {
    background-image: url('images/gold.png');
  }
  button:nth-child(2) {
    background-image: url('images/silver.png');
  }
  button:nth-child(3) {
    background-image: url('images/bronze.png');
  }
`

export const NewJackpotErrorsWrapperStyled = styled.div`
  display: flex!important;
  flex-direction: column!important;
  padding-top: unset!important;
  gap: 2px!important;

  span {
    color: salmon!important;
  }
`

export const CustomHistoryWrapperStyled = styled.div`
  padding-top: unset!important;
  padding-bottom: 2rem;
  grid-template-columns: 1fr 1fr 1fr!important;
  text-align: center;
`
