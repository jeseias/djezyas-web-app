import { useQuery } from "@tanstack/react-query";
import { getProductById, type GetProductById } from "../api";

export const useApiGetProductById = (params: GetProductById.Params) => {
  return useQuery({
    queryKey: ['getProductById', params.productId],
    queryFn: () => getProductById(params),
  });
}; 