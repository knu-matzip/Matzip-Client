import { BottomNavigation } from '@/_components/BottomNavigation'
import { OnlyLeftHeader } from '@repo/ui/components/Header'
import { ProfilePage } from './ProfilePage'

const Page = () => {
  return (
    <>
      <OnlyLeftHeader icon={'headerUser'} name={'내 정보'} />
      <ProfilePage />
      <BottomNavigation />
    </>
  )
}

export default Page
