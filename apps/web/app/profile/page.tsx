import { CLIENT_PATH } from '@/_constants/path'
import { useUserQueries } from '@/_apis/queries/user'
import { HydrationBoundaryPage } from '@/_components/HydrationBoundaryPage'
import { BottomNavigation } from '@/_components/BottomNavigation'
import { OnlyLeftHeader } from '@repo/ui/components/Header'
import { Column } from '@repo/ui/components/Layout'
import { UserProfile } from '@/profile/_components/UserProfile'
import { ProfileMenuItem } from '@/profile/_components/ProfileMenuItem'

const Page = () => {
  return (
    <>
      <OnlyLeftHeader icon={'headerUser'} name={'내 정보'} />
      <Column className={'gap-10 p-5'}>
        <HydrationBoundaryPage
          prefetch={async (queryClient) => {
            await queryClient.prefetchQuery(useUserQueries.detail())
          }}
        >
          <UserProfile />
        </HydrationBoundaryPage>
        <Column className={'gap-4'}>
          <ProfileMenuItem
            href={CLIENT_PATH.REQUESTS}
            title={'등록현황'}
            icon={'pencil'}
          />
          <ProfileMenuItem
            href={CLIENT_PATH.EVENT_GIFTICON}
            title={'기프티콘'}
            icon={'gift'}
          />
          <ProfileMenuItem
            href={
              'https://www.notion.so/woopaca/722d2e1180f94eeead36ec09436d4576?pvs=4'
            }
            title={'이용약관'}
            icon={'paper'}
          />
        </Column>
      </Column>
      <BottomNavigation />
    </>
  )
}

export default Page
