import { gqlr } from "@/core/modules/shared";

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
  const response = await gqlr<VerifyEmail.Response>(VERIFY_EMAIL_MUTATION, { input: params })
  if ((response as any).errors && (response as any).errors.length > 0) {
    const error = (response as any).errors[0];
    error.variables = params;
    throw error;
  }
  return response;
} 