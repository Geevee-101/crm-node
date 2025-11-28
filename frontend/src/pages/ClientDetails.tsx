import BackButton from "@/components/back-button";
import ClientDetailsTable from "@/components/client-details-table";
import { useParams } from "react-router-dom";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { clientsApi, type Client } from "@/lib/api/clients";
import { usersApi, type User } from "@/lib/api/users";
import { AxiosError } from "axios";
import { toast } from "sonner"

export const ClientContext = createContext<{
  getClientDetails: () => void;
}>({
  getClientDetails: () => {}
});

function ClientDetails () {
  const { id } = useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  const getClientDetails = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const data = await clientsApi.getById(Number(id));
      setClient(data || null);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error('Failed to fetch client details');
      }
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const getAllUsers = async () => {
    try {
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error('Failed to fetch users');
      }
    }
  };

  const contextValue = useMemo(
    () => ({ getClientDetails }),
    [getClientDetails]
  );

  useEffect(() => {
    getClientDetails();
    getAllUsers();
  }, []);

  return (
    <div className="flex flex-col p-8 gap-4">
      <div>
        <BackButton />
      </div>
      <h2 className="text-lg font-semibold mb-2">Client Details</h2>
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : client ? (
        <ClientContext.Provider value={contextValue}>
          <ClientDetailsTable client={client} users={users}/>
        </ClientContext.Provider>
      ) : (
        <div className="text-center py-8">Client not found</div>
      )}
    </div>
  )
}

export default ClientDetails;