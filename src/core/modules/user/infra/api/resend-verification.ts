import { gqlr } from "@/core/modules/shared";

const RESEND_VERIFICATION_MUTATION = `
  mutation ResendVerification($input: ResendVerificationInput!) {
    resendVerification(input: $input) {
      message
      expiresIn
    }
  }
`

export namespace ResendVerification {
  export type Params = {
    email: string
  }

  export type Response = {
    data: {
      resendVerification: {
        message: string
        expiresIn: string
      }
    }
  }
}

export const resendVerification = async (params: ResendVerification.Params): Promise<ResendVerification.Response> => {
  return gqlr<ResendVerification.Response>(RESEND_VERIFICATION_MUTATION, { input: params })
} 