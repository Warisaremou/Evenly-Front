import { AuthContext } from "@/contexts/auth/context";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { useProfile } from "@/services/auth/hooks";
import { User } from "@/types";
import { ReactNode, useEffect, useState } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  const { getItem } = useLocalStorage();
  const accessToken = getItem("accessToken");

  const { data, isLoading, isError } = useProfile(accessToken!);

  useEffect(() => {
    if (isError) {
      setIsAuthenticated(false);
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      setUserData(data);
      setIsAuthenticated(true);
    }
  }, [accessToken, data]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userData,
        isLoading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
