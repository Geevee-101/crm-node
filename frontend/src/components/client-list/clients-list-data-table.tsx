import type { ColumnDef, ColumnFiltersState, OnChangeFn } from "@tanstack/react-table"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AddClientButton from "../add-client-button"
import StatusFilterDropdown from "./status-filter-dropdown"
import DateFilterInput from "./date-filter-input"

interface DataTableProps<TData extends { id: number }, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  columnFilters?: ColumnFiltersState
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>
  setClients: (clients: TData[]) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  dateFilter: string
  setDateFilter: (date: string) => void
}

export function ClientsListDataTable<TData extends { id: number }, TValue>({
  columns,
  data,
  columnFilters,
  onColumnFiltersChange,
  setClients,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    manualFiltering: true,
    state: {
      columnFilters: columnFilters || [],
    },
    onColumnFiltersChange: onColumnFiltersChange,
    getCoreRowModel: getCoreRowModel(),
  })

  const navigate = useNavigate()
  const handleView = (id: number) => {
    navigate(`/clients/${id}`)
  }
  return (
    <div>
      <div className="flex justify-between">
        <AddClientButton setClients={setClients} />
        <div className="flex gap-2 items-center">
          <h3 className="text-sm font-semibold">Filters:</h3>
          <StatusFilterDropdown statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
          <DateFilterInput dateFilter={dateFilter} setDateFilter={setDateFilter} />
        </div>
      </div>
      <div className="border border-gray-400 rounded-md overflow-hidden mt-2">
        <Table className="rounded-md border-0">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="table-cell-header-row">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => handleView(row.original.id as number)}
                  className="hover:cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}