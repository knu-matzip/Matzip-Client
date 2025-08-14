import type { ButtonProps } from './Button'
import type { TypographyVariant } from '../Text/Text'

export const BUTTON_SIZE: { [k in ButtonProps['size']]: string } = {
  large: 'ui:h-[60px] ui:min-h-[60px] ui:w-[335px] ui:min-w-[335px]',
  medium: 'ui:h-[50px] ui:min-h-[50px] ui:w-[180px] ui:min-w-[180px]',
  small: 'ui:h-[40px] ui:min-h-[40px] ui:w-[80px] ui:min-w-[80px]',
}

export const BUTTON_FONT_SIZE: {
  [k in ButtonProps['size']]: TypographyVariant
} = {
  large: 'heading1',
  medium: 'heading2',
  small: 'title1',
}
