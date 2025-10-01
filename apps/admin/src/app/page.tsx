import { Column } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Button } from '@repo/ui/components/Button'

export default function Home() {
  return (
    <Column>
      <Text variant={'heading1'}>Hello World!</Text>
      <Button size={'medium'}>버튼</Button>
    </Column>
  )
}
