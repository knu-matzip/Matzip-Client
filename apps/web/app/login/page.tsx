import { Icon } from '@repo/ui/components/Icon'
import { Column } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { LoginButton } from './components/LoginButton'

const LoginPage = () => {
  return (
    <Column className={'h-full px-5 py-10'}>
      <Column className={'my-auto items-center pb-5'}>
        <Icon type={'logo'} size={150} className={'mb-2'} />
        <Text fontSize={'2xl'}>공주대학교</Text>
        <Text fontSize={'2xl'} fontWeight={'bold'}>
          맛집
        </Text>
      </Column>
      <LoginButton />
    </Column>
  )
}

export default LoginPage
