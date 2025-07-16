// src/api/queries/usersQuery.ts
import api from "../../lib/axios";
import type { User } from "../../types/user";

export const getUserData = async (id: string): Promise<User> => {
  try {
    const response = await api.get(`/v1/user/${id}`);
    return response.data;
  } catch (error) {
    // Log error only in development
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.error(`Error fetching user data for ID ${id}:`, error);
    }
    throw error;
  }
};
