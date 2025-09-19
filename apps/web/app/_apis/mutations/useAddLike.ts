import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addLike } from '@/_apis/services/like'
import { PlaceQueryKeys } from '@/_apis/queries/place'

export const useAddLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => await addLike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...PlaceQueryKeys.byLike()] })
    },
    // 공통 에러 처리 필요
    onError: (error) => console.error(error),
  })
}
