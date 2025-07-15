import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePriceAmount } from "../api";

export const useApiUpdatePriceAmount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePriceAmount,
    onSuccess: (data) => {
      // Invalidate and refetch prices queries
      queryClient.invalidateQueries({ queryKey: ['loadPricesByProductId', data.productId] });
    },
  });
}; 