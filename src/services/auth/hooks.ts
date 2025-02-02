import { Login, Register } from "@/lib/schemas/auth";
import { authKeys } from "@/services/auth/keys";
import { getUserProfile, login, logOut, register, updateProfile } from "@/services/auth/queries";
import { UpdateProfile } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

// --------------- QUERIES HOOKS --------------- //
export const useProfile = (accessToken: string) => {
  return useQuery({
    queryKey: authKeys.profile,
    queryFn: getUserProfile,
    enabled: !!accessToken,
  });
};

// ------------ MUTATIONS HOOKS ------------ //
export const useRegister = () => {
  return useMutation({
    mutationKey: authKeys.register,
    mutationFn: (credentials: Register) => register(credentials),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: authKeys.login,
    mutationFn: (credentials: Login) => login(credentials),
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: authKeys.updateProfile,
    mutationFn: (credentials: UpdateProfile) => updateProfile(credentials),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationKey: authKeys.logOut,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    mutationFn: (data: string) => logOut(),
  });
};
