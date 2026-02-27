import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addToast } from '@heroui/react'

import { submitWinnerForm } from '../services/event'
import type { EventWinnerForm } from '@/_apis/schemas/event'
import { EventQueryKeys } from '@/_apis/queries/event'

type UseSubmitWinnerFormParams = {
  eventId: string
}

export const useSubmitWinnerForm = ({ eventId }: UseSubmitWinnerFormParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: EventWinnerForm) => submitWinnerForm(eventId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...EventQueryKeys.result(eventId)],
      })

      addToast({
        title: '전화번호가 성공적으로 제출되었습니다!',
        severity: 'success',
      })
    },
    onError: (error) => {
      console.error('Failed to submit winner phone number:', error)

      addToast({
        title: '전화번호 제출에 실패했습니다. 잠시 후 다시 시도해주세요.',
        severity: 'danger',
      })
    },
  })
}
