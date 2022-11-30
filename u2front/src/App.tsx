import {
  Table,
  Text,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Box
} from '@chakra-ui/react'
import { useQuery } from "react-query";
import axios from "axios";

interface Invoice {
  invoice_number: string
  total: string
  currency: string
  invoice_date: string
  due_date: string
  vendor_name: string
  remittance_address: string
  status: string
  _id: string
}

const fetchInvoices = async () => {
  const response = await axios.get('http://localhost:8080/Invoice?status=pending')  
  return response.data.invoices as Invoice[]
}

function App() {
  const { data, refetch } = useQuery(
    ['getInvoices'],
    fetchInvoices,
    {
      refetchInterval: 5000
    })

  const approveInvoice = async (id: string) => {
    try {
      await axios.put('http://localhost:8080/Invoice/' + id, {
        status:  "approved"
      })

      refetch()
    } catch (e) {
      throw new Error('Something went wrong!')
    }
  }

  const invoiceRowHeaders = [
    "Invoice Number",
    "Total",
    "Currency",
    "Invoice Date",
    "Due Date",
    "Vendor Name",
    "Remittance Address",
    "Status"
  ]

  return (
      <Box>
        <Box w='100%' h='80px' bgGradient='linear(to-l, #9e9ca0, #a8a6a7)' >
        <Text fontSize='5xl' color='white' textAlign={'center'}>Invoices List</Text>
        </Box>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                {invoiceRowHeaders.map((header) => (<Th key={header}>{header}</Th>))}
              </Tr>
            </Thead>
            <Tbody>
              {
                data?.map((invoice) => (
                  <Tr key={invoice._id}>
                    <Td>{ invoice.invoice_number }</Td>
                    <Td>{ invoice.total }</Td>
                    <Td>{ invoice.currency }</Td>
                    <Td>{ invoice.invoice_date }</Td>
                    <Td>{ invoice.due_date }</Td>
                    <Td>{ invoice.vendor_name }</Td>
                    <Td>{ invoice.remittance_address }</Td>
                    <Td>
                      <Button color={'#22c45f'} variant='outline' onClick={() => approveInvoice(invoice._id)}>Approve</Button>
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
    </Box>
  )
}

export default App
