import { gqlr } from "@/core/modules/shared";

const LOGOUT_MUTATION = `#graphql
  mutation Logout {
    logout {
      message
    }
  }
`

export namespace Logout {
  export type Response = {
    data: {
      logout: {
        message: string
      }
    }
  }
}

export const logout = async (): Promise<Logout.Response> => {
  return gqlr<Logout.Response>(LOGOUT_MUTATION)
} 