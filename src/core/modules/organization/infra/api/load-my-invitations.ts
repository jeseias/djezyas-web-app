import { gqlr } from "@/core/modules/shared/infra/gqlr"
import type { Organization } from "../../domain/entities/organization"

export namespace LoadMyInvitations {
  export type InvitationSummary = {
    id: string
    organizationId: string
    organization: Organization.Summary
    email: string
    role: Organization.InvitationRole
    token: string
    invitedAt: string
    acceptedAt?: string
    status: Organization.InvitationStatus
  }

  export type Response = {
    data: {
      loadMyInvitations: {
        invitations: Array<InvitationSummary>
      }
    }
  }
}

const LOAD_MY_INVITATIONS_QUERY = `#graphql
  query LoadMyInvitations {
    loadMyInvitations {
      invitations {
        id
        organizationId
        organization {
          id
          name
          slug
          logoUrl
          plan
        }
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

export const loadMyInvitations = async (): Promise<LoadMyInvitations.Response> => {
  return gqlr<LoadMyInvitations.Response>(LOAD_MY_INVITATIONS_QUERY)
} 