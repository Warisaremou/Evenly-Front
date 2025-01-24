import Loader from "@/components/loader";
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

  const { data, isLoading, isSuccess, isError } = useProfile(accessToken ? true : false);

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setUserData(data);
      setIsAuthenticated(true);
    }

    if (isError) {
      setIsAuthenticated(false);
    }
  }, [data, isError, isSuccess]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userData,
        isLoading: isLoading,
      }}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>{children}</>
      )}
    </AuthContext.Provider>
  );
}
