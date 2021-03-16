import { useState } from 'react'

import { GlobalStyle } from './styles/global'

import Modal from 'react-modal'

import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'

Modal.setAppElement('#root')

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

      <Modal
        isOpen={isNewTransationModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />
    </>
  )
}
