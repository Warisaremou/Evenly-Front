import { AuthContextType } from "@/types";
import { createContext } from "react";

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isLoading: false,
  userData: null,
});

export { AuthContext };
