import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import { api } from '../services/api'

interface Transaction {
  id: number
  title: string
  amount: number
  type: string
  category: string
  createdAt: Date
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transaction[]
  createTransaction: (newTrasaction: TransactionInput) => Promise<void>
  editTransaction: (id: number, updatedTransaction: Transaction) => Promise<void>
  deleteTransaction: (id: number) => Promise<void>
}

const TransactionsContext = createContext({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api
      .get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(newTransaction: TransactionInput) {
    const response = await api.post('transactions', {
      ...newTransaction,
      createdAt: new Date()
    })

    const { transaction } = response.data

    setTransactions([...transactions, transaction])
  }

  async function editTransaction(id: number, updatedTransaction: Transaction) {
    await api.put<Transaction>('transactions', updatedTransaction)

    const updatedTransactions = transactions.map(transaction => {
      return transaction.id === id ? updatedTransaction : transaction
    })

    setTransactions(updatedTransactions)
  }

  async function deleteTransaction(id: number) {
    await api.delete<Transaction>(`transactions/${id}`)

    const updatedTransactions = transactions.filter(
      transaction => transaction.id !== id
    )

    setTransactions(updatedTransactions)
  }

  const contextValue = {
    transactions,
    createTransaction,
    editTransaction,
    deleteTransaction
  }

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}
