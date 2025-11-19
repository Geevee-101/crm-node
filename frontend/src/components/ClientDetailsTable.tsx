import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import EditStatusButton from "./EditStatusButton";

const clients = [
  {
    id: 1,
    name: "Test01",
    avatar: "",
    status: "Active",
    contact: "test01@nerv.com",
    organization: "Nerv",
    assignedTo: "Worker01",
    createdAt: "2025-11-19T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Test02",
    avatar: "",
    status: "Inactive",
    contact: "test02@nerv.com",
    organization: "Nerv",
    assignedTo: "Worker02",
    createdAt: "2025-11-19T00:00:00.000Z",
  },
  {
    id: 3,
    name: "Test03",
    avatar: "",
    status: "Inactive",
    contact: "test03@nerv.com",
    organization: "Nerv",
    assignedTo: "Worker03",
    createdAt: "2025-11-19T00:00:00.000Z",
  },
]

function ClientDetailsTable () {
  const client = clients[0];



  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Client Details</h2>
      <div className="border border-gray-400 rounded-md overflow-hidden">
        <Table className="rounded-md border-0">
          <TableBody>
              <TableRow>
                <TableCell className="table-cell-header-col">Name</TableCell>
                <TableCell>{client.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="table-cell-header-col">Avatar</TableCell>
                <TableCell>{client.avatar}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="table-cell-header-col">Status</TableCell>
                <TableCell className="flex items-center gap-2">
                  {client.status}
                  <EditStatusButton />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="table-cell-header-col">Contact</TableCell>
                <TableCell>{client.contact}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="table-cell-header-col">Organization</TableCell>
                <TableCell>{client.organization}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="table-cell-header-col">Assigned To</TableCell>
                <TableCell>{client.assignedTo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="table-cell-header-col">Created At</TableCell>
                <TableCell>{client.createdAt}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ClientDetailsTable;