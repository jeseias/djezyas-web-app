export * from "./verify-email";


const LOGOUT_MUTATION = `#graphql
  mutation Logout($input: LogoutInput!) {
    logout(input: $input) {
      message
    }
  }
`

export namespace Logout {
  export type Params = {
    sessionId: string
  }

  export type Response = {
    data: {
      logout: {
        message: string
      }
    }
  }
}

export const logout = async (params: Logout.Params): Promise<Logout.Response> => {
  return gqlr<Logout.Response>(LOGOUT_MUTATION, { input: params })
} 