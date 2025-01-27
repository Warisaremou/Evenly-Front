import { Login, Register } from "@/lib/schemas/auth";
import { OrganizerProfile } from "@/lib/schemas/users";
import { authKeys } from "@/services/auth/keys";
import { getUserProfile, login, register, updateProfile } from "@/services/auth/queries";
import { User } from "@/types";
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
    mutationFn: (credentials: Pick<User, "email" | "firstname" | "lastname"> | OrganizerProfile) =>
      updateProfile(credentials),
  });
};
