import { Transaction, useTransactions } from '../../hooks/useTransactions'
import { useTransactionModal } from '../../hooks/useTransactionModal'

import { formatMoney, formatDate } from '../../utils'

import editImg from '../../assets/edit.svg'
import deleteImg from '../../assets/delete.svg'

import { Container } from './styles'

export function TransactionsTable() {
  const {
    transactions,
    deleteTransaction,
    setCurrentEditingTransaction
  } = useTransactions()
  const { handleOpenModal } = useTransactionModal()

  function handleEditModal(transaction: Transaction) {
    handleOpenModal('editTransaction')
    setCurrentEditingTransaction(transaction)
  }

  function handleDeleteTransaction(id: number) {
    deleteTransaction(id)
  }

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
                {transaction.type === 'withdraw'
                  ? formatMoney(transaction.amount * -1)
                  : formatMoney(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>{formatDate(transaction.createdAt)}</td>
              <td>
                <button
                  type="button"
                  title="Editar transação"
                  onClick={() => handleEditModal(transaction)}
                >
                  <img src={editImg} alt="caneta" />
                </button>

                <button
                  type="button"
                  title="Excluir transação"
                  onClick={() => handleDeleteTransaction(transaction.id)}
                >
                  <img src={deleteImg} alt="lixeira" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}
