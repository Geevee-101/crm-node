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
  getAll: async (): Promise<Client[]> => {
    const { data } = await axiosInstance.get<Client[]>('/clients/list');
    return data;
  },

  getById: async (id: number): Promise<Client> => {
    const { data } = await axiosInstance.get<Client>(`/clients/${id}`);
    return data;
  }
};
