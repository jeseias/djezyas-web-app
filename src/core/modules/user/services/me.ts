import { gqlr } from "../../shared/infra/gqlr"
import type { User } from "../entities/user"

const ME_QUERY = `#graphql
  query {
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
      me: User.Model
    }
  }
}

export const me = async (): Promise<Me.Response> => {
  return gqlr<Me.Response>(ME_QUERY)
} 