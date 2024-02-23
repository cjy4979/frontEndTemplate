/**
 * @name auth
 */

export namespace IAuth {
  export interface AuthSignUpRequest {
    username: string
    password: string
    email: string
    name: string
  }

  export interface AuthSignInRequest {
    username: string
    password: string
  }

  export interface AuthSignOutRequest {
    id: string
  }

  export interface AuthSignUpResponse {}

  export interface AuthSignInResponse {}
}
