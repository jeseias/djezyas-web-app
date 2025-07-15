import { useQuery } from "@tanstack/react-query";
import { findProductsByOrganization, type FindProductsByOrganization } from "../api";

export const useApiFindProductsByOrganization = (params: FindProductsByOrganization.Params) => {
  return useQuery({
    queryKey: ['findProductsByOrganization', JSON.stringify(params)],
    queryFn: () => findProductsByOrganization(params),
  });
}; 