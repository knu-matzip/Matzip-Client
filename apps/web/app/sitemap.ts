import type { MetadataRoute } from 'next'

const SITE_URL = new URL(process.env.NEXT_PUBLIC_CLIENT_URL || '')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/map', '/events/food-slot'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const categoryRoutes = Array.from({ length: 15 }, (_, i) => i + 1).map(
    (id) => ({
      url: `${SITE_URL}/categories/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }),
  )

  return [...staticRoutes, ...categoryRoutes]
}
