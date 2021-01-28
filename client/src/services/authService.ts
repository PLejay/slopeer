import { credentials, userData } from '../types/types'
import { client, mutations } from './graphqlService'



const login = async (credentials:credentials) => {
  return await client.mutation(mutations.login, credentials)
    .toPromise()
}

const register = async (userData:userData) => {
  console.log('trying to register! with', userData)
  return await client.mutation(mutations.register, userData)
    .toPromise()
}

export { login, register }
