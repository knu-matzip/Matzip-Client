import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeLike } from '@/_apis/services/like'
import { PlaceQueryKeys } from '@/_apis/queries/place'

export const useRemoveLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => await removeLike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...PlaceQueryKeys.byLike()] })
    },
    // 공통 에러 처리 필요
    onError: (error) => console.error(error),
  })
}
