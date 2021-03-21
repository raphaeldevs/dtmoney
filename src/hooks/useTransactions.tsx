import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import { api } from '../services/api'

export interface Transaction {
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
  editingTransaction: Transaction
  createTransaction: (newTrasaction: TransactionInput) => Promise<void>
  editTransaction: (id: number, updatedTransaction: TransactionInput) => Promise<void>
  deleteTransaction: (id: number) => Promise<void>
  setCurrentEditingTransaction: (transaction: Transaction) => void
}

const TransactionsContext = createContext({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [editingTransaction, setEditingTransaction] = useState<Transaction>({} as Transaction)

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

  async function editTransaction(id: number, updatedTransaction: TransactionInput) {
    await api.put<Transaction>(`transactions/${id}`, updatedTransaction)

    const updatedTransactions = transactions.map(transaction => {
      return transaction.id === id ? {...transaction, ...updatedTransaction} : transaction
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

  function setCurrentEditingTransaction(transaction: Transaction) {
    setEditingTransaction(transaction)
  }

  const contextValue = {
    transactions,
    createTransaction,
    editTransaction,
    deleteTransaction,
    editingTransaction,
    setCurrentEditingTransaction
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
