import { RequestDetailPage } from './RequestDetailPage'
import { getRequestDetail } from './_api/services/request'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const data = await getRequestDetail(id)

  return (
    <>
      <RequestDetailPage data={data} />
    </>
  )
}

export default Page
