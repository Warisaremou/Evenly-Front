import api from "@/lib/axios-instance";
import { Login, Otp, Register } from "@/lib/schemas/auth";
import { ApiResponse, OTPSecret, UpdateProfile, User } from "@/types";

/**
 * Query to create account
 *
 * @param {Register} credentials - User data
 * @returns Promise<ApiResponse> - Api response
 */
export const register = async (credentials: Register): Promise<ApiResponse> => {
  const response = await api.post("/users/register", credentials);
  return response.data;
};

/**
 * Query to login a user
 *
 * @param {Login} credentials - User credentials
 * @returns Promise<ApiResponse & { token: string; requires_2fa: boolean }> - Api response
 */
export const login = async (credentials: Login): Promise<ApiResponse & { token: string; requires_2fa: boolean }> => {
  const response = await api.post("/users/login", credentials);
  return response.data;
};

/**
 * Query to get user profile data
 *
 * @returns Promise<ApiResponse> - Api response
 */
export const getUserProfile = async (): Promise<User> => {
  const response = await api.get("/users/profile").then((res) => res);
  return response.data;
};

/**
 * Query to update user profile
 *
 * @param {Omit<User, "id" | "role">} credentials - User data
 * @returns Promise<ApiResponse> - Api response
 */
export const updateProfile = async (credentials: UpdateProfile): Promise<ApiResponse> => {
  const response = await api.put("/users/profile", credentials);
  return response.data;
};

/**
 * Query to log out a user
 *
 * @returns Promise<ApiResponse> - Api response
 */
export const logOut = async (): Promise<ApiResponse> => {
  const response = await api.post("/users/logOut");
  return response.data;
};

/**
 * Query to generate a OTP secret
 *
 * @returns Promise<Omit<ApiResponse, "data"> - Api response
 */
export const setup2FA = async (): Promise<Omit<ApiResponse, "data"> & OTPSecret> => {
  const response = await api.post("/2fa/setup");
  return response.data;
};

/**
 * Query to verify and activate 2FA
 *
 * @returns Promise<Omit<ApiResponse, "data">> - Api response
 */
export const verifyOTP = async (credentials: Otp): Promise<Omit<ApiResponse, "data">> => {
  const response = await api.post("/2fa/verify", credentials);
  return response.data;
};

/**
 * Query to validate 2FA before being authenticated
 *
 * @returns Promise<Omit<ApiResponse, "data"> & { token: string }> - Api response
 */
export const validate2FA = async (
  credentials: Otp & { user_id: string },
): Promise<Omit<ApiResponse, "data"> & { token: string }> => {
  const response = await api.post("/2fa/validate", credentials);
  return response.data;
};

/**
 * Query to disable 2 Factor Authentication
 *
 * @returns Promise<Omit<ApiResponse, "data">> - Api response
 */
export const disable2FA = async (): Promise<Omit<ApiResponse, "data">> => {
  const response = await api.post("/2fa/disable");
  return response.data;
};
