import { useQuery } from "@tanstack/react-query";
import { loadPricesByProductId, type LoadPricesByProductId } from "../api";

export const useApiLoadPricesByProductId = (params: LoadPricesByProductId.Params) => {
  return useQuery({
    queryKey: ['loadPricesByProductId', params.productId],
    queryFn: () => loadPricesByProductId(params),
  });
}; 