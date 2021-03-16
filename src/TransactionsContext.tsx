import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from './services/api'

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
  createTransaction: (newTrasaction: TransactionInput) => void
}

export const TransactionsContext = createContext({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api
      .get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  function createTransaction(newTransaction: TransactionInput) {
    api.post('transactions', newTransaction)
  }

  const contextValue = {
    transactions,
    createTransaction
  }

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  )
}
