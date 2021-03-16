import { Container } from './styles'

export function TransactionsTable() {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Pagamento Diego</td>
            <td className="withdraw">- R$ 15.000</td>
            <td>Transferência</td>
            <td>15/03/2021</td>
          </tr>

          <tr>
            <td>Site FEMAX</td>
            <td className="deposit">R$ 12.000</td>
            <td>Desenvolvimento</td>
            <td>15/03/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}
