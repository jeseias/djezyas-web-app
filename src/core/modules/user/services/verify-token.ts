import { gqlr } from "../../shared/infra/gqlr"

const VERIFY_TOKEN_MUTATION = `#graphql
  mutation VerifyToken($input: VerifyTokenInput!) {
    verifyToken(input: $input) {
      userId
      email
      username
      role
    }
  }
`

export namespace VerifyToken {
  export type Params = {
    token: string
  }

  export type Response = {
    data: {
      verifyToken: {
        userId: string
        email: string
        username: string
        role: 'admin' | 'user'
      }
    }
  }
}

export const verifyToken = async (params: VerifyToken.Params): Promise<VerifyToken.Response> => {
  return gqlr<VerifyToken.Response>(VERIFY_TOKEN_MUTATION, { input: params })
} 