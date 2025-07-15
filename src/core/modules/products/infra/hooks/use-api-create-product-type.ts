import { useMutation } from "@tanstack/react-query";
import { createProductType } from "../api/create-product-type";

export const useApiCreateProductType = () => {
  return useMutation({
    mutationFn: createProductType,
  })
} 