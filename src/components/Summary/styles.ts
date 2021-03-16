import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
 
  gap: 2rem;

  transform: translateY(-50%);
  
  div {

    padding: 1.5rem 2rem;

    border-radius: 0.25rem;

    color: var(--text-title);

    background: var(--shape);

    &.highlight-background {
      background: var(--green);

      color: #FFF;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      
      margin-top: 1rem;

      font-weight: 500;
      font-size: 2rem;

      line-height: 3rem;
    }
  }
`
