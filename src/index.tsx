import React from 'react'
import ReactDOM from 'react-dom'

import { createServer, Model } from 'miragejs'

import { App } from './App'

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Resgate CDI',
          amount: 12000,
          type: 'deposit',
          category: 'Investimentos',
          createdAt: new Date('2021-03-16 08:01:49')
        },
        {
          id: 2,
          title: 'Resgate CDI',
          amount: 5000,
          type: 'deposit',
          category: 'Investimentos',
          createdAt: new Date('2021-03-16 08:03:14')
        },
        {
          id: 3,
          title: 'Pagamento Diego',
          amount: 15000,
          type: 'withdraw',
          category: 'Transferência',
          createdAt: new Date('2021-03-16 10:12:43')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api'

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const newTransaction = JSON.parse(request.requestBody)

      return schema.create('transaction', newTransaction)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)