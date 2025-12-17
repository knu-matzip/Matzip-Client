'use client'

import { useEffect, useState } from 'react'
import { Text } from '@repo/ui/components/Text'
import { formatRemainingTime } from '@/events/lucky-draw/_utils/formatRemainingTime'

export const ParticipationCountdown = ({
  eventEndDate,
}: {
  eventEndDate: string
}) => {
  const [remainingTime, setRemainingTime] = useState('')

  useEffect(() => {
    const target = new Date(eventEndDate).getTime()

    const update = () => {
      const now = Date.now()
      const diff = target - now
      setRemainingTime(formatRemainingTime(diff))
    }

    update()
    const timer = setInterval(update, 1000)

    return () => clearInterval(timer)
  }, [eventEndDate])

  return (
    <Text fontSize={'2xl'} fontWeight={'semibold'} className={'text-yellow'}>
      {remainingTime}
    </Text>
  )
}
