import { createContext, useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useSnackbar } from '@/components/snackbar';

// import { createCookie, eraseAllCookies, removeCookie } from '@/utils/cookie';

import api from '@/services/api';
import accountService from '@/services/login';

interface SignInCredentials {
  descricaoFuncionario: string
  senha: string
}

interface AuthContextData {
  login: (credentials: SignInCredentials) => Promise<void>
  logout: () => void
  user: User
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextData | null>(null);
type AuthProviderProps = {

  children: React.ReactNode;
};

function setApiAuthHeader(token: string | null) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
export function AuthProvider({ children }: AuthProviderProps) {

  const { enqueueSnackbar } = useSnackbar();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  setApiAuthHeader(user?.token)

  useEffect(() => {
    if (window) {
      const loggedUser = sessionStorage.getItem('user')
      const IsAuthenticated = sessionStorage.getItem('IsAuthenticated')
      if (loggedUser) {
        setUser(loggedUser ? JSON.parse(loggedUser) : null)
      }
      if (IsAuthenticated) {
        setIsAuthenticated(IsAuthenticated ? JSON.parse(IsAuthenticated) : false)
      }
    }

  }, [router]);


  const login = useCallback(async ({
    descricaoFuncionario,
    senha
  }: SignInCredentials) => {
    try {
      const { data } = await accountService.login({
        descricaoFuncionario,
        senha
      })
      console.log(data)
      const newUser = { ...data }
      setUser(newUser)
      setApiAuthHeader(data.token)

      setIsAuthenticated(true)

      sessionStorage.setItem('IsAuthenticated', JSON.stringify(true))
      sessionStorage.setItem('user', JSON.stringify(newUser))

      router.push('/dashboard')
    } catch (error: any) {
      console.log('error', error)
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    }
  }, [])


  const logout = useCallback(async () => {
    sessionStorage.removeItem('user')
    setApiAuthHeader(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
