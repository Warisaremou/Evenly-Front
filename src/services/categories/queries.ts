import api from "@/lib/axios-instance";
import { Category } from "@/types";

/**
 * Query to get all categories
 *
 * @returns Promise<Category[]> - List of categories
 */
export const getAllCategories = async (): Promise<Category[]> => {
  const response = await api.get("/categories").then((res) => res);
  return response.data;
};
