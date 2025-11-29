import { axiosInstance } from "../axios";

export interface Client {
  id: number;
  name: string;
  status: string;
  email: string;
  organization: string;
  avatar: string;
  assignedToId: number;
  createdAt: string;
}

export const clientsApi = {
  getAll: async (status?: string, date?: string): Promise<Client[]> => {
    const params: any = {};
    if (status && status !== 'All') {
      params.status = status;
    }
    if (date) {
      params.date = date;
    }
    const { data } = await axiosInstance.get<Client[]>('/clients/list', { params });
    return data;
  },

  getById: async (id: number): Promise<Client> => {
    const { data } = await axiosInstance.get<Client>(`/clients/${id}`);
    return data;
  },

  create: async (client: Omit<Client, 'id' | 'createdAt'>): Promise<Client> => {
    const { data } = await axiosInstance.post<Client>('/clients/create', client);
    return data;
  },

  updateStatus: async (id: number, status: string): Promise<Client> => {
    const { data } = await axiosInstance.put<Client>(`/clients/${id}/status`, { status });
    return data;
  }
};
