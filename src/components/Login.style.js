import styled from "styled-components";

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
  color: whitesmoke;

  h2 {
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 3px;
    margin: 0;
  }

  input {
    padding: 6px 14px;
    border-radius: 4px;
    min-width: 18rem;
    outline: none;
    border: none;
  }

  button {
    background-color: rgba(0, 0, 0, .2);
    border: 2px solid whitesmoke;
    border-radius: 8px;
    color: whitesmoke;
    padding: 8px 24px;
    transition: all .2s ease;
    cursor: pointer;

    &:hover {
      filter: brightness(.85);
    }
  }

  span {
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
    color: red;
  }
`
