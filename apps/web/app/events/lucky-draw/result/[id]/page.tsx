import { EventResultClient } from './EventResultClient'

const EventResultPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  return <EventResultClient eventId={id} />
}

export default EventResultPage
