import { gqlr } from '@/core/modules/shared/infra/gqlr'

const ME_QUERY = `
  query Me {
    me {
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
  }
`

export namespace Me {
  export type Response = {
    data: {
        me: {
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
      } | null
    }
  }
}

export const me = async (): Promise<Me.Response> => {
  const response = await gqlr<Me.Response>(ME_QUERY)
  if ((response as any).errors && (response as any).errors.length > 0) {
    const error = (response as any).errors[0]
    throw error
  }
  return response
} 