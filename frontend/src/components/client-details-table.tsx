import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import EditStatusButton from "./edit-status-button";
import type { Client } from "@/lib/api/clients";
import type { User } from "@/lib/api/users";
import { formatDate } from "@/lib/utils";

function ClientDetailsTable ({ client, users }: { client: Client, users: User[]}) {
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
                    <EditStatusButton clientId={client.id} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="table-cell-header-col">Email</TableCell>
                  <TableCell>{client.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="table-cell-header-col">Organization</TableCell>
                  <TableCell>{client.organization}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="table-cell-header-col">Assigned To</TableCell>
                  <TableCell>
                    {users.find(user => user.id === client.assignedToId)?.name || 'Unassigned'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="table-cell-header-col">Created At</TableCell>
                  <TableCell>{formatDate(client.createdAt)}</TableCell>
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