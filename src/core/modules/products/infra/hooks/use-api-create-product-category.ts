import { useMutation } from "@tanstack/react-query";
import { createProductCategory } from "../api/create-product-category";

export const useApiCreateProductCategory = () => {
  return useMutation({
    mutationFn: createProductCategory,
  })
}