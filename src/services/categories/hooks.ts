import { categoriesKeys } from "@/services/categories/keys";
import { getAllCategories } from "@/services/categories/queries";
import { useQuery } from "@tanstack/react-query";

// --------------- QUERIES HOOKS --------------- //
export const useCategories = () => {
  return useQuery({
    queryKey: categoriesKeys.categories,
    queryFn: getAllCategories,
  });
};
