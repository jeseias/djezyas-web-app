import { useQuery } from "@tanstack/react-query";
import { listProductTypes, type ListProductTypes } from "../api";
import { useOrganization } from "@/core/modules/organization/context/organization-context";

export const useApiListProductTypes = (params: Omit<ListProductTypes.Params, "organizationId">) => {
  const { organization } = useOrganization()

  return useQuery({
    queryFn: () => listProductTypes({ ...params, organizationId: organization!.id }),
    queryKey: ['listProductTypes', JSON.stringify(params), organization?.id],
    enabled: !!organization?.id,
  })
} 