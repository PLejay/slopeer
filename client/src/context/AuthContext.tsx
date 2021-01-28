import {h, VNode} from 'preact';
import { useContext, useState } from 'preact/hooks'
import { createContext } from 'preact'
import JwtDecode, {JwtPayload} from 'jwt-decode'
import * as authService from '../services/authService'
import { credentials, userData } from '../types/types';

export type customJwtPayload = JwtPayload & { _id: string };

type ContextProps = { 
  user?: null,
  register: Promise<string|void>,
  login: Promise<string>,
  logout: Promise<void>
};

 

const AuthContext = createContext<Partial<ContextProps>>({});

function  AuthProvider (props:any): VNode {
  const [user, setUser] = useState<string | null>(null)

  const loginWithToken = (token:string) => {
    try {
      const { _id, exp } = JwtDecode<customJwtPayload>(token)
      if (Date.now() > exp! * 1000) throw new Error()
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', token)
      }
      setUser(_id);
    } catch {
      setUser(null);
    }
  }

  function checkUser () {
    let token
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('accessToken')
    }
    token ? loginWithToken(token) : setUser(null)
  }

  checkUser()

  const login = async (credentials:credentials) => {
    const { data: { login: token } } = await authService.login(credentials)
    if (token) loginWithToken(token)
    return !!token
  }

  const register = async (data:userData) => {
    const result = await authService.register(data)
    console.log('result: ', result)
    const { data: { createUser: token } } = result
    if (token) loginWithToken(token)
    return !!token
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
    }
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }} {...props} />
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
