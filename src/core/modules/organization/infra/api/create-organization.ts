import { gqlr } from "@/core/modules/shared"
import type { Organization } from "../../domain/entities/organization"

export namespace CreateOrganization {
  export type Params = {
    name: string
    settings: Record<string, unknown>
    meta: Record<string, unknown>
  }
  export type Response = {
    data: {
      createOrganization: {
        organization: Organization.Model
      }
    }
  }
}

const CREATE_ORGANIZATION_MUTATION = `#graphql
  mutation CreateOrganization($input: CreateOrganizationInput!) {
    createOrganization(input: $input) {
      organization {
        id
        name
        slug
        ownerId
        plan
        logoUrl
        settings
        meta
      }
    }
  }
`

export const createOrganization = async (params: CreateOrganization.Params): Promise<CreateOrganization.Response> => {
  return gqlr<CreateOrganization.Response>(CREATE_ORGANIZATION_MUTATION, {
    input: params,
  })
}