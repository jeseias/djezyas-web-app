import { useQuery } from "@tanstack/react-query";
import { listProductCategories, type ListProductCategories } from "../api";

export const useApiListProductCategories = (params: ListProductCategories.Params) => {
  return useQuery({
    queryKey: ['listProductCategories', JSON.stringify(params)],
    queryFn: () => listProductCategories(params),
  })
}