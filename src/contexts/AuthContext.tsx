import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next/router";

import api from "@/services/api";
import accountService from "@/services/login";

interface SignInCredentials {
  descricaoFuncionario: string;
  senha: string;
}

interface IUser {
  descricaocliente: string;
  descricaofranqueado: string;
  descricaofuncionario: string;
  email: string;
  idfranqueado: number;
  idfuncionario: number;
  token: string;
}

interface AuthContextData {
  login: (credentials: SignInCredentials) => Promise<void>;
  logout: () => void;
  user: IUser;
  isAuthenticated: boolean;
  token: string;
}

export const AuthContext = createContext<AuthContextData | null>(null);
type AuthProviderProps = {
  children: React.ReactNode;
};

function setApiAuthHeader(token: string | null) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // rodandoLocal
  const [token, setToken] = useState<string>("");

  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (window !== undefined) {
      const user = sessionStorage.getItem("user");
      const token = sessionStorage.getItem("token");
      const IsAuthenticated = sessionStorage.getItem("isAuthenticated");
      if (user) {
        setUser(JSON.parse(user));
        setApiAuthHeader(JSON.parse(user).token);
      }
      if (Boolean(IsAuthenticated)) {
        setIsAuthenticated(true);
      }
      if (token) {
        setToken(token);
      }
    }
  }, [router]);


  const login = useCallback(
    async ({ descricaoFuncionario, senha }: SignInCredentials) => {
      try {
        const { data } = await accountService.login({
          descricaoFuncionario,
          senha,
        });
        const newUser = { ...data };
        setUser(newUser);
        setApiAuthHeader(data.token);

        sessionStorage.setItem("user", JSON.stringify(newUser));
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("IsAuthenticated", "true");

        setIsAuthenticated(true);

        const rodandoLocal = window.location.hostname.toLocaleLowerCase().indexOf("agileveiculos") <= -1

        router.push(rodandoLocal ? "/admin/dashboard" : "/admin/dashboard.html");
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isAuthenticated");
    setApiAuthHeader(null);
    setUser(null);
    const rodandoLocal = window.location.hostname.toLocaleLowerCase().indexOf("agileveiculos") <= -1

    router.push(rodandoLocal ? "/admin" : "/admin.html");

  }, []);

  useEffect(() => {
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          logout();
        }
        if (error.response.status === 403) {
          logout();
        }
        if (error.response.status === 500) {
          logout();
        }
        return Promise.reject(error);
      }
    );
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        isAuthenticated,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
