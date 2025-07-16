import api from "../../../shared/lib/axios";
import type { User } from "../../../shared/types/user";

export const getUserData = async (id: string): Promise<User> => {
  try {
    const response = await api.get(`/v1/user/${id}`);
    return response.data;
  } catch (error) {
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error(`Error fetching user data for ID ${id}:`, error);
    }
    throw error;
  }
};
