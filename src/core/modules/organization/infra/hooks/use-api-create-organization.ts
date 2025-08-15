import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createOrganization } from "../api"

export const useApiCreateOrganization = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createOrganization,
    onSuccess: () => {
      // Invalidate the organizations query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ['loadMyOrganizations'] })
    },
  })
}