import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
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
      queryClient.invalidateQueries({
        queryKey: EventQueryKeys.byPrivate(),
      })
      addToast({
        title: '응모가 성공적으로 완료되었습니다!',
        severity: 'success',
      })
    },
    onError: (error) => {
      console.error('Event participation failed:', error)

      const message =
        error instanceof AxiosError && error.response?.data?.message
          ? error.response.data.message
          : '응모 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'

      addToast({
        title: message,
        severity: 'danger',
      })
    },
  })
}
