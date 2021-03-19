import styled from 'styled-components'

export const Container = styled.div`
  overflow-x: auto;
  
  table {
    width: 100%;
    
    border-spacing: 0 0.5rem;

    th {
      padding: 1rem 2rem;
      
      text-align: left;

      color: var(--text-body);

      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;

      border: 0;
      
      background: var(--shape);

      color: var(--text-body);

      border-radius: 0.25rem;

      &:first-child {
        color: var(--text-title);
      }

      &.deposit {
        color: var(--green);
      }

      &.withdraw {
        color: var(--red);
      }
    }
  }
`
