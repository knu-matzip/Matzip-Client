# AGENTS.md - Developer Guide for matzip

## Overview

Monorepo using pnpm workspaces with Turbo. Contains multiple Next.js apps:

- `apps/web` - Main web app (port 3000)
- `apps/admin` - Admin dashboard (port 3001)
- `packages/ui` - Shared UI components

## Commands

### Root

```bash
pnpm build          # Build all
pnpm dev            # Dev all
pnpm lint           # Lint all
pnpm check-types    # Type check all
pnpm format         # Format code
pnpm test           # Test all
```

### Single Test

```bash
cd apps/web && pnpm vitest run path/to/test.spec.ts
pnpm vitest run --grep "test name"
pnpm vitest --watch path/to/test.spec.ts
```

## Code Style

### General

- **Package Manager**: pnpm | **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript (strict mode) | **Testing**: Vitest + React Testing Library

### Formatting (Prettier)

```json
{
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2
}
```

Run `pnpm format` before committing. Uses prettier-plugin-tailwindcss.

### TypeScript

- Strict mode + `noUncheckedIndexedAccess` enabled - use optional chaining
- moduleResolution: Bundler (Next.js), NodeNext (packages)
- Return types required: `const sum = (a: number, b: number): number => a + b`
- Types over interfaces for simple types

### Imports Order

1. Node/built-in 2. External packages (react, next, @tanstack/react-query)
2. Absolute imports (@/, @repo/ui/\*) 4. Relative imports (./, ../)

```typescript
import path from 'path'
import { useState } from 'react'
import { Icon } from '@repo/ui/components/Icon'
import { CLIENT_PATH } from '@/_constants/path'
import { BottomNavigation } from './_components/BottomNavigation'
```

**Aliases**: `@/*` → `apps/web/app/*`, `@repo/ui/components/*` → `packages/ui/src/components/*`

### Naming

- Components: PascalCase (`BottomNavigation`) | Files: PascalCase (components), kebab-case (utilities)
- Functions/variables: camelCase | Constants: SCREAMING_SNAKE_CASE | React Query Keys: PascalCase

### Component Structure

```typescript
import { cn } from '@repo/ui/utils/cn'
interface Props { className?: string; children?: React.ReactNode }
export const ComponentName = ({ className, children }: Props) => {
  return <div className={cn('base-classes', className)}>{children}</div>
}
```

### React Query

```typescript
export const CategoryQueryKeys = {
  all: () => ['category'] as const,
  list: () => [...CategoryQueryKeys.all(), 'list'] as const,
}
export const useCategoryQueries = {
  list: () =>
    queryOptions({
      queryKey: CategoryQueryKeys.list(),
      queryFn: getCategories,
    }),
}
```

### Error Handling

```typescript
onError: (error) => {
  console.error(error) /* Handle error */
}
```

### Tailwind CSS - Heroui components primarily

```tsx
<Flex className={'gap-4 px-5 py-2.5'}>
```

### Commit Messages

```
<type>: <subject>
Types: feat, fix, bug, refactor, design, style, docs, test, chore, rename, remove, build
```

### Testing

- Test files: `*.spec.ts` or `*.test.ts` - Vitest + @testing-library/react

```typescript
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
test('renders correctly', () => {
  render(<Component />)
  expect(screen.getByText('Hello')).toBeInTheDocument()
})
```

### ESLint - ESLint 9+ flat config, React hooks, Turbo plugin, Next.js rules

```bash
pnpm lint  # All apps | cd apps/web && pnpm lint  # Single app
```

### File Structure

```
apps/web/app/
├── (home)/          # Route group
├── _apis/           # queries, mutations, services
├── _components/    # Shared components
├── _constants/      # Constants
├── _hooks/          # Custom hooks
├── _providers/     # React providers
└── _utils/          # Utilities
```

### Dev Notes

- Use turbopack: `next dev --turbopack` | MSW for API mocking
- Use `HydrationBoundaryPage` for SSR prefetch
- HeroUI, Naver Maps, Zod, react-hook-form + zod
