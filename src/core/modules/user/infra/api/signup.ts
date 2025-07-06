import { gqlr } from "@/core/modules/shared";

export * from "./verify-email";


const REGISTER_USER_MUTATION = `#graphql
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      id
      name
      email
      username
      phone
      bio
      avatar
      status
      role
      emailVerifiedAt
      createdAt
      updatedAt
    }
  }
`

export namespace Signup {
  export type Params = {
    email: string 
    name: string 
    username: string 
    password: string 
    phone: string
    avatar?: string
  }

  export type User = {
    id: string 
    name: string 
    email: string 
    username: string 
    phone: string
    bio?: string
    avatar?: string
    status: 'active' | 'inactive' | 'pending' | 'blocked'
    role: 'admin' | 'user'
    emailVerifiedAt?: string
    createdAt: string
    updatedAt: string
  }

  export type Response = {
    data: {
      registerUser: User
    }
  }
}

export const signup = async (params: Signup.Params): Promise<Signup.Response> => {
  return gqlr<Signup.Response>(REGISTER_USER_MUTATION, { input: params })
}