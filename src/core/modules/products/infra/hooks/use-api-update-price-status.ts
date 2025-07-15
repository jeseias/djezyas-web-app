import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePriceStatus } from "../api";

export const useApiUpdatePriceStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePriceStatus,
    onSuccess: (data) => {
      // Invalidate and refetch prices queries
      queryClient.invalidateQueries({ queryKey: ['loadPricesByProductId', data.productId] });
    },
  });
}; 