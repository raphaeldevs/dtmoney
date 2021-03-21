import { createContext, ReactNode, useContext, useState } from 'react'
import { EditTransactionModal } from '../components/EditTransactionModal'
import { NewTransactionModal } from '../components/NewTransactionModal'

interface TransactionsModalContextData {
  isNewTransationModalOpen: boolean
  isEditTransationModalOpen: boolean
  handleOpenModal: (modalType: string) => void
  handleCloseModal: (modalType: string) => void
}

interface TransactionsModalProviderProps {
  children: ReactNode
}

type HandleModalFunctions = {
  [type: string]: () => void
}

const TransactionsModalContext = createContext(
  {} as TransactionsModalContextData
)

export function TransactionsModalProvider({
  children
}: TransactionsModalProviderProps) {
  const [isNewTransationModalOpen, setIsNewTransationModalOpen] = useState(false)
  const [isEditTransationModalOpen, setIsEditTransationModalOpen] = useState(false)

  function handleOpenModal(modalType: string) {
    const action: HandleModalFunctions = {
      editTransaction: () => setIsEditTransationModalOpen(true),
      newTransaction: () => setIsNewTransationModalOpen(true)
    }

    action[modalType]()
  }

  function handleCloseModal(modalType: string) {
    const action: HandleModalFunctions = {
      editTransaction: () => setIsEditTransationModalOpen(false),
      newTransaction: () => setIsNewTransationModalOpen(false)
    }

    action[modalType]()
  }

  const contextValue = {
    isNewTransationModalOpen,
    isEditTransationModalOpen,
    handleOpenModal,
    handleCloseModal
  }

  return (
    <TransactionsModalContext.Provider value={contextValue}>
      {children}

      <NewTransactionModal />
      <EditTransactionModal />
    </TransactionsModalContext.Provider>
  )
}

export function useTransactionModal() {
  const context = useContext(TransactionsModalContext)

  return context
}
