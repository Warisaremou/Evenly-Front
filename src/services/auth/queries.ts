import api from "@/lib/axios-instance";
import { Login, Register } from "@/lib/schemas/auth";
import { OrganizerProfile } from "@/lib/schemas/users";
import { ApiResponse, User } from "@/types";

/**
 * Query to create account
 *
 * @param {Register} credentials - User data
 * @returns Promise<ApiResponse> - Api response
 */
export const register = async (credentials: Register): Promise<ApiResponse> => {
  const response = await api.post("/auth/register", credentials);
  return response.data;
};

/**
 * Query to login a user
 *
 * @param {Login} credentials - User credentials
 * @returns Promise<ApiResponse> - Api response
 */
export const login = async (credentials: Login): Promise<ApiResponse & { token: string }> => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

/**
 * Query to get user profile data
 *
 * @returns Promise<ApiResponse> - Api response
 */
export const getUserProfile = async (): Promise<User> => {
  // const response = await api.get("/auth/me").then((res) => res);
  const response = await api.get("/auth").then((res) => res);
  return response.data;
};

/**
 * Query to update user profile
 *
 * @param {Omit<User, "id" | "role">} credentials - User data
 * @returns Promise<ApiResponse> - Api response
 */
export const updateProfile = async (
  credentials: Pick<User, "email" | "firstname" | "lastname"> | OrganizerProfile,
): Promise<ApiResponse> => {
  const response = await api.put("/auth", credentials);
  return response.data;
};
