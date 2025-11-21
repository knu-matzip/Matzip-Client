import { useMutation } from '@tanstack/react-query'
import type { NewPlaceRequest } from '@/_apis/schemas/place'
import { createNewPlace } from '@/_apis/services/place'
import { useRouter } from 'next/navigation'
import { CLIENT_PATH } from '@/_constants/path'

export const useCreateNewPlace = () => {
  const { replace } = useRouter()

  return useMutation({
    mutationFn: async (placeData: NewPlaceRequest) =>
      await createNewPlace(placeData),
    onSuccess: (res) => {
      if (res.placeId) {
        replace(CLIENT_PATH.PLACE_NEW_SUCCESS)
      } else {
        replace(CLIENT_PATH.PLACE_NEW_FAIL)
      }
    },
    onError: (error) => {
      console.error(error)
      replace(CLIENT_PATH.PLACE_NEW_FAIL)
    },
  })
}
