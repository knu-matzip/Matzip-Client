import { z } from 'zod'
import { IconList } from '@repo/ui/components/Icon/IconMap'

export const CategorySchema = z.object({
  id: z.number().transform(String),
  name: z.string(),
  iconKey: z.enum(IconList),
})

export type Category = z.infer<typeof CategorySchema>
