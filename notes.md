# Chapter II Notes

## Configuring Global Styles

Styled Components

```typescript
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  { ... }
`
```

Global CSS

```scss
html {
  @media (max-width: 1080px) {
    font-size: 93.75%; // 15px
  }

  @media (max-width: 720px) {
    font-size: 87.5%; // 14px
  }
}

body {
  -webkit-font-smoothing: antialiased;

  /* Suaviza a fonte no nível do pixel. É úitl para texto claro em fundos 
     escuros e faz com que pareça mais suave.
  */
}

body,
input,
textarea,
button {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
}

h1,
h2,
h3,
h4,
h5,
h6,
strong {
  font-weight: 600;
}

button {
  cursor: pointer;
}

[disable] {
  opacity: 0.6;

  cursor: not-allowed;
}
```

## Configuring MirageJS

In `index.tsx`, configure:

```typescript
import { createServer, Model } from 'miragejs'

createServer({
  models: {
    transaction: Model

    // [TableName]: Model
  },

  seeds(server) {
    server.db.loadData({
      // [TableName in plural]: [ ...{ ...data } ]
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
    /* GET, POST... http://127.0.0.1:PORT/api
                                         ^ this.namespace */
    this.namespace = 'api'

    /* GET http://127.0.0.1:PORT/api/transactions
                                    ^ this.get(pathname) */
    this.get('/transactions', () => {
      // this.schema.all('tableName')
      return this.schema.all('transaction')

      // this.schema -> Database
    })

    // POST http://127.0.0.1:PORT/api/transactions
    this.post('/transactions', (schema, request) => {
      const newTransaction = JSON.parse(request.requestBody)

      return schema.create('transaction', newTransaction)

      // schema.create('tableName', { ...data })
      // insert data in tableName
    })
  }
})
```
