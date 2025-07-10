import { useMutation } from "@tanstack/react-query"
import { createOrganization } from "../api"

export const useApiCreateOrganization = () => {
  return useMutation({
    mutationFn: createOrganization,
  })
}