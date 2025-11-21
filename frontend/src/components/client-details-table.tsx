import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import EditStatusButton from "./edit-status-button";


function ClientDetailsTable ({ client }: { client: any }) {
  return (
    <>
      {client ? 
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
      : 
        <p className="text-center text-gray-500">Client not found</p>
      }
    </>
  )
}

export default ClientDetailsTable;