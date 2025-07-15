import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveProduct } from "../api";

export const useApiSaveProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveProduct,
    onSuccess: () => {
      // Invalidate and refetch products queries
      queryClient.invalidateQueries({ queryKey: ['findProductsByOrganization'] });
      queryClient.invalidateQueries({ queryKey: ['getProductById'] });
    },
  });
}; 