import { ClientsListDataTable } from "@/components/client-list/clients-list-data-table";
import { columns } from "@/components/client-list/columns";
import { useState, useEffect } from "react";
import type { ColumnFiltersState } from "@tanstack/react-table";


const clients = [
  {
    id: 1,
    name: "Test01",
    status: "Active",
    createdAt: "02-01-2025",
  },
  {
    id: 2,
    name: "Test02",
    status: "Inactive",
    createdAt: "01-02-2025",
  },
  {
    id: 3,
    name: "Test03",
    status: "Inactive",
    createdAt: "01-03-2025",
  },
]

function ClientList () {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [filteredClients, setFilteredClients] = useState(clients)
  const [isLoading, setIsLoading] = useState(false)

  // Simulate server-side filtering
  useEffect(() => {
    const fetchFilteredData = async () => {
      setIsLoading(true)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Get status filter value
      const statusFilter = columnFilters.find(filter => filter.id === "status")
      
      if (statusFilter && statusFilter.value) {
        // Filter data based on status
        const filtered = clients.filter(client => 
          client.status === statusFilter.value
        )
        setFilteredClients(filtered)
      } else {
        // No filter, show all clients
        setFilteredClients(clients)
      }
      
      setIsLoading(false)
    }
    
    fetchFilteredData()
  }, [columnFilters])

  return (
    <div className="flex flex-col p-8 gap-4">
      <h1 className="font-bold text-2xl">CRM Node</h1>
      <h2 className="text-lg font-semibold mb-2">Client List</h2>
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <ClientsListDataTable 
          columns={columns} 
          data={filteredClients}
          columnFilters={columnFilters}
          onColumnFiltersChange={setColumnFilters}
        />
      )}
    </div>
  )
}

export default ClientList;