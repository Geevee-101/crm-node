import { ClientsListDataTable } from "@/components/client-list/clients-list-data-table";
import { columns } from "@/components/client-list/columns";
import { useState, useEffect } from "react";
import type { ColumnFiltersState } from "@tanstack/react-table";
import { clientsApi, type Client } from "@/lib/api/clients";
import { AxiosError } from "axios";
import { toast } from "sonner"


function ClientList () {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getAllClients = async () => {
    setIsLoading(true);
    try {
      const data = await clientsApi.getAll();
      setClients(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error('Failed to fetch clients');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllClients();
  }, []);

  return (
    <div className="flex flex-col p-8 gap-4">
      <h1 className="font-bold text-2xl">CRM Node</h1>
      <h2 className="text-lg font-semibold mb-2">Client List</h2>
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <ClientsListDataTable 
          columns={columns} 
          data={clients}
          columnFilters={columnFilters}
          onColumnFiltersChange={setColumnFilters}
        />
      )}
    </div>
  )
}

export default ClientList;