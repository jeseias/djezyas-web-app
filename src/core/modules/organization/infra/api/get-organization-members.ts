import { gqlr } from "@/core/modules/shared/infra/gqlr"
import type { Organization } from "../../domain/entities/organization"

export namespace GetOrganizationMembers {
  export type Response = {
    data: {
      getOrganizationMembers: {
        members: Array<Organization.Member>
        pendingInvitations: Array<Organization.Invitation>
      }
    }
  }

  export type Input = {
    organizationId: string
  }
}

const GET_ORGANIZATION_MEMBERS_QUERY = `#graphql
  query GetOrganizationMembers($input: GetOrganizationMembersInput!) {
    getOrganizationMembers(input: $input) {
      members {
        id
        organizationId
        userId
        role
        invitedAt
        joinedAt
        user {
          name
          avatar
          email
        }
      }
      pendingInvitations {
        id
        organizationId
        email
        role
        token
        invitedAt
        acceptedAt
        status
      }
    }
  }
`

export const getOrganizationMembers = async (
  input: GetOrganizationMembers.Input
): Promise<GetOrganizationMembers.Response> => {
  return gqlr<GetOrganizationMembers.Response>(GET_ORGANIZATION_MEMBERS_QUERY, {
    input
  })
}
