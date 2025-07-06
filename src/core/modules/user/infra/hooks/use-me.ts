import { useQuery } from '@tanstack/react-query'
import { me } from '@/core/modules/user/infra/api'

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: me,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
} 