import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductStatus } from "../api";

export const useApiUpdateProductStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductStatus,
    onSuccess: () => {
      // Invalidate and refetch products queries
      queryClient.invalidateQueries({ queryKey: ['findProductsByOrganization'] });
      queryClient.invalidateQueries({ queryKey: ['getProductById'] });
    },
  });
}; 