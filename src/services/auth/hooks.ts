import { Login, Register } from "@/lib/schemas/auth";
import { authKeys } from "@/services/auth/keys";
import { getUserProfile, login, register } from "@/services/auth/queries";
import { useMutation, useQuery } from "@tanstack/react-query";

// --------------- QUERIES HOOKS --------------- //
export const useProfile = (token: boolean) => {
  return useQuery({
    queryKey: authKeys.profile,
    queryFn: getUserProfile,
    enabled: token,
  });
};

// ------------ MUTATIONS HOOKS ------------ //
export const useRegister = (credentials: Register) => {
  return useMutation({
    mutationKey: authKeys.register,
    mutationFn: () => register(credentials),
  });
};

export const useLogin = (credentials: Login) => {
  return useMutation({
    mutationKey: authKeys.login,
    mutationFn: () => login(credentials),
  });
};
