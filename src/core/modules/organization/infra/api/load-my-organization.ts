import { gqlr } from "@/core/modules/shared/infra/gqlr"
import type { Organization } from "../../domain/entities/organization"

export namespace LoadMyOrganization {
  export type Response = {
    data: {
      loadMyOrganizations: {
        organizations: Array<Organization.Summary>
      }
    }
  }
}

const LOAD_MY_ORGANIZATIONS_QUERY = `#graphql
  query LoadMyOrganizations {
    loadMyOrganizations {
      organizations {
        id
        name
        slug
        logoUrl
        plan
      }
    }
  }
`

export const loadMyOrganizations = async (): Promise<LoadMyOrganization.Response> => {
  return gqlr<LoadMyOrganization.Response>(LOAD_MY_ORGANIZATIONS_QUERY)
} 