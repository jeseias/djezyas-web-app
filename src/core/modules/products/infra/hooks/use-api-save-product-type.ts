import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveProductType } from "../api";

export const useApiSaveProductType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveProductType,
    onSuccess: () => {
      // Invalidate and refetch products queries since they depend on product types
      queryClient.invalidateQueries({ queryKey: ['findProductsByOrganization'] });
      queryClient.invalidateQueries({ queryKey: ['getProductById'] });
    },
  });
}; 