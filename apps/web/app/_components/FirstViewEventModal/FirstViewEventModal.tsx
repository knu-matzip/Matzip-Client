'use client'

import { useEffect } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Modal, ModalContent, useDisclosure } from '@heroui/react'
import { useEventQueries } from '@/_apis/queries/event'
import { OngoingEventModalContent } from './OngoingEventModalContent'
import { EndedEventModalContent } from './EndedEventModalContent'

const STORAGE_KEY = 'has_seen_event_modal_v1'

export const FirstViewEventModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data } = useSuspenseQuery(useEventQueries.byPublic())

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem(STORAGE_KEY)
    if (hasSeenModal) return

    sessionStorage.setItem(STORAGE_KEY, 'true')
    const timer = setTimeout(onOpen, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [onOpen])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            {data ? (
              <OngoingEventModalContent data={data} onClose={onClose} />
            ) : (
              <EndedEventModalContent onClose={onClose} />
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
