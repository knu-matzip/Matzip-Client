import storybook from 'eslint-plugin-storybook'
import tseslint from 'typescript-eslint'

export default [
  // TypeScript 기본 설정
  ...tseslint.configs.recommended,

  // Storybook 설정
  ...storybook.configs['flat/recommended'],

  // 모든 TypeScript/JavaScript 파일에 적용
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
    },
  },
]
