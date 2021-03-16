import styled from 'styled-components'

export const Container = styled.form`
  h2 {
    margin-bottom: 2rem;

    color: var(--text-title);
    font-size: 1.5rem;
  }

  input {
    width: 100%;
    height: 4rem;

    padding: 0 1.5rem;

    border: 1px solid var(--input-border-color);

    background: var(--input-background);

    font-size: 1rem;

    & + input {
      margin-top: 1rem;
    }

    &::placeholder {
      color: var(--text-title);
    }
  }

  button[type='submit'] {
    width: 100%;
    height: 4rem;

    margin-top: 1rem;
    padding: 0 1.5rem;

    background: var(--green);

    border: 0;
    border-radius: 0.25rem;

    color: #fff;

    font-size: 1rem;
    font-weight: 600;

    transition: filter 0.3s ease;

    &:hover {
      filter: brightness(0.9);
    }
  }
`
