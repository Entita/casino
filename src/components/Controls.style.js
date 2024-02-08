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

  .MuiInputBase-colorPrimary::before {
    border-color: whitesmoke!important;
  }

  .MuiSwitch-track {
    outline: 1px solid whitesmoke;
  }

  & > div > div {
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

  & > div > div > div {
    display: flex;
    justify-content: space-between;
  }
`
