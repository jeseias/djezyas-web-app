import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPrice } from "../api";

export const useApiAddPrice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPrice,
    onSuccess: (data) => {
      // Invalidate and refetch prices queries
      queryClient.invalidateQueries({ queryKey: ['loadPricesByProductId', data.productId] });
    },
  });
}; 