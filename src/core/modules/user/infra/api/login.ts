import { gqlr } from "@/core/modules/shared"

const LOGIN_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
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
      session {
        id
        userId
        accessTokenExpiresAt
        refreshTokenExpiresAt
        deviceInfo {
          userAgent
          ipAddress
          deviceType
          browser
          os
        }
        isActive
        createdAt
        lastUsedAt
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

export namespace Login {
  export type DeviceInfoInput = {
    userAgent: string
    deviceType?: 'mobile' | 'desktop' | 'tablet'
    browser?: string
    os?: string
  }

  export type Params = {
    email: string
    password: string
    deviceInfo: DeviceInfoInput
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

  export type Session = {
    id: string
    userId: string
    accessTokenExpiresAt: string
    refreshTokenExpiresAt: string
    deviceInfo: {
      userAgent: string
      ipAddress: string
      deviceType?: 'mobile' | 'desktop' | 'tablet'
      browser?: string
      os?: string
    }
    isActive: boolean
    createdAt: string
    lastUsedAt: string
  }

  export type Tokens = {
    accessToken: string
    refreshToken: string
    accessTokenExpiresIn: string
    refreshTokenExpiresIn: string
  }

  export type Response = {
    data: {
      login: {
        user: User
        session: Session
        tokens: Tokens
        message: string
      }
    }
  }
}

export const login = async (params: Login.Params): Promise<Login.Response> => {
  const response = await gqlr<Login.Response>(LOGIN_MUTATION, { input: params });
  if ((response as any).errors && (response as any).errors.length > 0) {
    const error = (response as any).errors[0];
    error.variables = params;
    throw error;
  }
  return response;
}