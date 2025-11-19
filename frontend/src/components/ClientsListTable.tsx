import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import AddClientButton from "./AddClientButton"

const clients = [
  {
    id: 1,
    name: "Test01",
    status: "Active",
  },
  {
    id: 2,
    name: "Test02",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Test03",
    status: "Inactive",
  },
]

function ClientsListTable () {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">List of Clients</h2>
      <AddClientButton />
      <div className="border border-gray-400 rounded-md overflow-hidden mt-2">
        <Table className="rounded-md border-0">
          <TableHeader>
            <TableRow className="table-cell-header-row">
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.status}</TableCell>
                <TableCell>
                  <Button asChild>
                    <Link to={`/clients/${client.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ClientsListTable