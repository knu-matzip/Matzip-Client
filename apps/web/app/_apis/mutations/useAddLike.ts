import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addLike } from '@/_apis/services/like'
import { PlaceQueryKeys } from '@/_apis/queries/place'
import { addToast } from '@heroui/react'

export const useAddLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => await addLike(id),
    onSuccess: async (response) => {
      const { placeId } = response

      if (!placeId) return

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [...PlaceQueryKeys.byLike()],
        }),
        queryClient.invalidateQueries({
          queryKey: [...PlaceQueryKeys.detail(String(placeId))],
        }),
      ])
    },
    // 공통 에러 처리 필요
    onError: (error) => {
      console.error(error)
      // Todo: 현재 500으로만 넘어옴 -> 401, 403 등으로 세분화 필요
      addToast({ title: '로그인이 필요한 기능입니다' })
    },
  })
}
