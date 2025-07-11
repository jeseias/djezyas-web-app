import { gqlr } from "@/core/modules/shared/infra/gqlr"
import type { Organization } from "../../domain/entities/organization"

export namespace InviteMember {
  export type Response = {
    data: {
      inviteMember: {
        invitation: Organization.Invitation
        isRegistered: boolean
        inviteLink: string
      }
    }
  }

  export type Input = {
    organizationId: string
    email: string
    role: Organization.InvitationRole
  }
}

const INVITE_MEMBER_MUTATION = `#graphql
  mutation InviteMember($input: InviteMemberInput!) {
    inviteMember(input: $input) {
      invitation {
        id
        organizationId
        email
        role
        token
        invitedAt
        acceptedAt
        status
      }
      isRegistered
      inviteLink
    }
  }
`

export const inviteMember = async (
  input: InviteMember.Input
): Promise<InviteMember.Response> => {
  return gqlr<InviteMember.Response>(INVITE_MEMBER_MUTATION, {
    input
  })
}
