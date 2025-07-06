import { gqlr } from '@/core/modules/shared/infra/gqlr'

const REFRESH_TOKEN_MUTATION = `
  mutation RefreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
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
      tokens {
        accessToken
        refreshToken
        accessTokenExpiresIn
        refreshTokenExpiresIn
      }
      message
    }
  }
`

export namespace RefreshToken {
  export type Params = {
    refreshToken: string
    deviceInfo: {
      userAgent: string
      deviceType?: 'mobile' | 'desktop' | 'tablet'
      browser?: string
      os?: string
    }
  }

  export type Response = {
    data: {
      refreshToken: {
        user: {
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
        tokens: {
          accessToken: string
          refreshToken: string
          accessTokenExpiresIn: number
          refreshTokenExpiresIn: number
        }
        message: string
      }
    }
  }
}

export const refreshToken = async (params: RefreshToken.Params): Promise<RefreshToken.Response> => {
  const response = await gqlr<RefreshToken.Response>(REFRESH_TOKEN_MUTATION, { input: params })
  if ((response as any).errors && (response as any).errors.length > 0) {
    const error = (response as any).errors[0]
    error.variables = params
    throw error
  }
  return response
} 