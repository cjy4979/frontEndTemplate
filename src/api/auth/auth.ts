import api from '../utils/axiosApi'
import { IAuth } from './interface'

export async function Signup(requestBody: IAuth.AuthSignUpRequest) {
  return await api.post('/auth/signup', requestBody)
}

export async function Login(requestBody: IAuth.AuthSignInRequest) {
  return await api.post('/auth/login', requestBody)
}

export async function Logout() {
  return await api.get('/auth/logout')
}
