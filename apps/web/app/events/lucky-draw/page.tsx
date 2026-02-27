import { cookies } from 'next/headers'
import { MemberView } from './_components/Pages/MemberView'
import { GuestView } from './_components/Pages/GuestView'

const Page = async () => {
  const accessToken = await cookies().then(
    (cookies) => cookies.get('accessToken')?.value,
  )

  if (accessToken) {
    return <MemberView />
  } else {
    return <GuestView />
  }
}

export default Page
