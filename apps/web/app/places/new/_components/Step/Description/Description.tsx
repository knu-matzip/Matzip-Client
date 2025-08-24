import { Title } from '@/places/new/_components/Tilte'
import { Textarea } from '@repo/ui/components/Textarea'
import { Button } from '@repo/ui/components/Button'
import { type Control, Controller } from 'react-hook-form'
import type { NewPlaceRequest } from '@/_apis/schemas/place'
import { Tags } from '@/places/new/_components/Step/Description/Tags'

type Props = {
  control: Control<NewPlaceRequest>
  nextStep: VoidFunction
}

export const Description = ({ control, nextStep }: Props) => {
  return (
    <>
      <Title
        title={'내가 알리고 싶은 맛집의 비밀은?'}
        description={'아쉬운 점도 함께 자유롭게 작성할 수록 좋아요!'}
      />
      <Controller
        control={control}
        render={({ field }) => (
          <Textarea value={field.value} setValue={field.onChange} />
        )}
        name={'description'}
      />
      <Tags control={control} />
      <Button
        size={'medium'}
        className={'ui:min-w-full mt-auto'}
        onClick={nextStep}
      >
        다음
      </Button>
    </>
  )
}
