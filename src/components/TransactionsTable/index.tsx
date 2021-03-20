import { useTransactions } from '../../hooks/useTransactions'

import { formatMoney, formatDate } from '../../utils'

import editImg from '../../assets/edit.svg'
import deleteImg from '../../assets/delete.svg'

import { Container } from './styles'

export function TransactionsTable() {
  const { transactions } = useTransactions()
  
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {formatMoney(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {formatDate(new Date(transaction.createdAt))}
              </td>
              <td>
                <button type="button" title="Editar transação">
                  <img src={editImg} alt="caneta"/>
                </button>

                <button type="button" title="Excluir transação">
                  <img src={deleteImg} alt="lixeira"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}
