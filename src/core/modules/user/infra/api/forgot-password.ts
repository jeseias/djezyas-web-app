import { gqlr } from "@/core/modules/shared"

const FORGOT_PASSWORD_MUTATION = `#graphql
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      message
      expiresIn
    }
  }
`

export namespace ForgotPassword {
  export type Params = {
    email: string
  }

  export type Response = {
    data: {
      forgotPassword: {
        message: string
        expiresIn: string
      }
    }
  }
}

export const forgotPassword = async (params: ForgotPassword.Params): Promise<ForgotPassword.Response> => {
  return gqlr<ForgotPassword.Response>(FORGOT_PASSWORD_MUTATION, { input: params })
} 