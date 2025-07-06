import { gqlr } from "../../shared/infra/gqlr"

const VERIFY_EMAIL_MUTATION = `#graphql
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      user {
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
      message
    }
  }
`

export namespace VerifyEmail {
  export type Params = {
    email: string
    verificationCode: string
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
      verifyEmail: {
        user: User
        message: string
      }
    }
  }
}

export const verifyEmail = async (params: VerifyEmail.Params): Promise<VerifyEmail.Response> => {
  return gqlr<VerifyEmail.Response>(VERIFY_EMAIL_MUTATION, { input: params })
} 