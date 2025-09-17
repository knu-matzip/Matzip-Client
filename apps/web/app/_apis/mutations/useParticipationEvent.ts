import { useMutation, useQueryClient } from '@tanstack/react-query'
import { participationEvent } from '@/_apis/services/event'
import { EventQueryKeys } from '@/_apis/queries/event'
import { addToast } from '@heroui/react'

export const useParticipationEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: { eventId: string; ticketsCount: number }) => {
      await participationEvent(body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...EventQueryKeys.info()] })
      addToast({
        title: '응모가 성공적으로 완료되었습니다!',
        severity: 'success',
      })
    },
    onError: () => {
      addToast({
        title: '응모 중 오류가 발생했습니다.',
        color: 'danger',
        severity: 'danger',
      })
    },
  })
}
