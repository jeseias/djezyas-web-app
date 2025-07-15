import { useQuery } from "@tanstack/react-query";
import { listProductTypes, type ListProductTypes } from "../api";

export const useApiListProductTypes = (params: ListProductTypes.Params) => {
  return useQuery({
    queryKey: ['listProductTypes', JSON.stringify(params)],
    queryFn: () => listProductTypes(params),
  })
} 