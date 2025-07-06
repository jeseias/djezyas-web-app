import { gqlr } from "@/core/modules/shared"

const RESET_PASSWORD_MUTATION = `
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      message
    }
  }
`

export namespace ResetPassword {
  export type Params = {
    token: string
    newPassword: string
  }

  export type Response = {
    data: {
      resetPassword: {
        message: string
      }
    }
  }
}

export const resetPassword = async (params: ResetPassword.Params): Promise<ResetPassword.Response> => {
  return gqlr<ResetPassword.Response>(RESET_PASSWORD_MUTATION, { input: params })
} 