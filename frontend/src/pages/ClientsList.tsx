import { ClientsListDataTable } from "@/components/client-list/clients-list-data-table";
import { columns } from "@/components/client-list/columns";
import { useState, useEffect } from "react";
import type { ColumnFiltersState } from "@tanstack/react-table";
import { clientsApi, type Client } from "@/lib/api/clients";
import { AxiosError } from "axios";
import { toast } from "sonner"
import { useSearchParams } from "react-router-dom"


function ClientList () {
  const [searchParams, setSearchParams] = useSearchParams();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Get status from URL, default to 'All'
  const statusFilter = searchParams.get('status') || 'All';
  const dateFilter = searchParams.get('date') || '';
  
  // Function to update status in URL
  const setStatusFilter = (status: string) => {
    if (status === 'All') {
      searchParams.delete('status');
    } else {
      searchParams.set('status', status);
    }
    setSearchParams(searchParams);
  };
  
  // Function to update date in URL
  const setDateFilter = (date: string) => {
    if (date) {
      searchParams.set('date', date);
    } else {
      searchParams.delete('date');
    }
    setSearchParams(searchParams);
  };

  const getAllClients = async (status?: string, date?: string) => {
    setIsLoading(true);
    try {
      const data = await clientsApi.getAll(status, date);
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
    getAllClients(
      statusFilter === 'All' ? undefined : statusFilter,
      dateFilter || undefined
    );
  }, [statusFilter, dateFilter]);

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
          setClients={setClients}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
      )}
    </div>
  )
}

export default ClientList;