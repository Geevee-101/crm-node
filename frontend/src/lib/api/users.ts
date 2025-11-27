import { axiosInstance } from "../axios";

export interface User {
  id: number;
  name: string;
}

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const { data } = await axiosInstance.get<User[]>('/users/list');
    return data;
  },
};
