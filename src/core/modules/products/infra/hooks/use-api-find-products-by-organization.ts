import { useQuery } from "@tanstack/react-query";
import { findProductsByOrganization, type FindProductsByOrganization } from "../api";
import { useOrganization } from "@/core/modules/organization/context/organization-context";

export const useApiFindProductsByOrganization = (params: FindProductsByOrganization.Params['filters']) => {
  const { organization } = useOrganization()

  return useQuery({
    queryKey: ['findProductsByOrganization', JSON.stringify(params), organization?.id],
    queryFn: () => findProductsByOrganization({ ...params, organizationId: organization!.id }),
    enabled: !!organization?.id,
  });
}; 