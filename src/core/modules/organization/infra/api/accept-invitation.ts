import { gqlr } from "@/core/modules/shared/infra/gqlr"

export namespace AcceptInvitation {
  export type Response = {
    data: {
      acceptInvitation: {
        message: string
      }
    }
  }

  export type Input = {
    token: string
  }
}

const ACCEPT_INVITATION_MUTATION = `#graphql
  mutation AcceptInvitation($input: AcceptInvitationInput!) {
    acceptInvitation(input: $input) {
      message
    }
  }
`

export const acceptInvitation = async (
  input: AcceptInvitation.Input
): Promise<AcceptInvitation.Response> => {
  return gqlr<AcceptInvitation.Response>(ACCEPT_INVITATION_MUTATION, {
    input
  })
} 