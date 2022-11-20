import { createContext, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify'

import { useRouter } from 'next/router';

import { createCookie, eraseAllCookies } from '@/utils/cookie';

import api from '@/services/api';
import accountService from '@/services/login';

interface SignInCredentials {
  descricaoFuncionario: string
  senha: string
}

interface IUser {
  descricaocliente: string
  descricaofranqueado: string
  descricaofuncionario: string
  email: string
  idfranqueado: number
  idfuncionario: number
  token: string
}

interface AuthContextData {
  login: (credentials: SignInCredentials) => Promise<void>
  logout: () => void
  user: IUser
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

  }, []);


  const login = useCallback(async ({
    descricaoFuncionario,
    senha
  }: SignInCredentials) => {
    try {
      const { data } = await accountService.login({
        descricaoFuncionario,
        senha
      })
      const newUser = { ...data }
      setUser(newUser)
      setApiAuthHeader(data.token)

      createCookie('token', data.token, undefined, {
        maxAge: 60 * 60 * 24, // 24 Hour
        path: '/'
      })

      setIsAuthenticated(true)

      sessionStorage.setItem('IsAuthenticated', JSON.stringify(true))
      sessionStorage.setItem('user', JSON.stringify(newUser))

      router.push('/admin/dashboard')
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }, [])


  const logout = useCallback(async () => {
    sessionStorage.removeItem('user')
    eraseAllCookies()
    setApiAuthHeader(null)
    setUser(null)
    router.push('/admin')
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
