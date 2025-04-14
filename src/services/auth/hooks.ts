import { Login, Otp, Register } from "@/lib/schemas/auth";
import { authKeys } from "@/services/auth/keys";
import {
  disable2FA,
  getUserProfile,
  login,
  logOut,
  register,
  setup2FA,
  updateProfile,
  validate2FA,
  verifyOTP,
} from "@/services/auth/queries";
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
    mutationFn: (_data: string) => logOut(),
  });
};

export const useSetup2FA = () => {
  return useMutation({
    mutationKey: authKeys.setup2FA,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    mutationFn: (_data: string) => setup2FA(),
  });
};

export const useVerifyOTP = () => {
  return useMutation({
    mutationKey: authKeys.verifyOTP,
    mutationFn: (credentials: Otp) => verifyOTP(credentials),
  });
};

export const useValidate2FA = () => {
  return useMutation({
    mutationKey: authKeys.validate2FA,
    mutationFn: (credentials: Otp & { user_id: string }) => validate2FA(credentials),
  });
};

export const useDisable2FA = () => {
  return useMutation({
    mutationKey: authKeys.disable2FA,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    mutationFn: (_data: string) => disable2FA(),
  });
};
