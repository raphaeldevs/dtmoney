import { useState } from 'react'

import { GlobalStyle } from './styles/global'

import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'
import { NewTransactionModal } from './components/NewTransactionModal'

export function App() {
  const [isNewTransationModalOpen, setIsNewTransationModalOpen] = useState(false)

  function handleOpenNewTransactionModal() {
    setIsNewTransationModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransationModalOpen(false)
  }

  return (
    <>
      <GlobalStyle />

      <NewTransactionModal
        isOpen={isNewTransationModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />
    </>
  )
}
