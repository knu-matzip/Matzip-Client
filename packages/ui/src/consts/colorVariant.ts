export const COLOR_VARIANTS = {
  red: {
    text: 'ui:text-red',
    background: 'ui:bg-red-light',
    border: {
      default: 'ui:border-red-light',
      active: 'ui:border-red',
    },
  },
  blue: {
    text: 'ui:text-blue',
    background: 'ui:bg-blue-light',
    border: {
      default: 'ui:border-blue-light',
      active: 'ui:border-blue',
    },
  },
  yellow: {
    text: 'ui:text-yellow',
    background: 'ui:bg-yellow-light',
    border: {
      default: 'ui:border-yellow-light',
      active: 'ui:border-yellow',
    },
  },
}

export type COLOR_VARIANTS_KEY = keyof typeof COLOR_VARIANTS
