import {h, VNode} from 'preact';
import { useContext, useState } from 'preact/hooks'
import { createContext } from 'preact'
import JwtDecode from 'jwt-decode'
import * as authService from '../services/authService'

type ContextProps = { 
  user?: null,
  register: Promise,
  login: Promise<>,
  logout: Promise
};
type AuthProviderProps = {

}
const AuthContext = createContext<Partial<ContextProps>>({});

function  AuthProvider (props): VNode<AuthProviderProps> {
  const [user, setUser] = useState(null)

  const loginWithToken = (token) => {
    try {
      const { _id, exp } = JwtDecode(token)
      if (Date.now() > exp * 1000) throw new Error()
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

  const login = async (credentials) => {
    const { data: { login: token } } = await authService.login(credentials)
    if (token) loginWithToken(token)
    return !!token
  }

  const register = async (data) => {
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
