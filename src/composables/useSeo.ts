import { useHead } from '@vueuse/head'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface SeoOptions {
  title?: string
  description?: string
  image?: string
  type?: string
  url?: string
}

export function useSeo(options: SeoOptions = {}) {
  const route = useRoute()

  const siteUrl = computed(() => {
    if (typeof window !== 'undefined') {
      return window.location.origin
    }
    return 'https://sinotripai.com'
  })

  const fullTitle = computed(() => {
    const title = options.title || '中国旅游 AI 行程规划'
    return title.includes('SinoTripAI') ? title : `${title} - SinoTripAI`
  })

  const fullUrl = computed(() => {
    return options.url || (siteUrl.value + route.fullPath)
  })

  const schema = computed(() => ({
    '@context': 'https://schema.org',
    '@type': options.type || 'WebPage',
    name: options.title,
    description: options.description,
    url: fullUrl.value,
    image: options.image,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: siteUrl.value + '/search?q={search_term_string}'
      }
    }
  }))

  const headConfig: Record<string, any> = {
    title: fullTitle.value,
    meta: [
      { name: 'description', content: options.description || '探索中国，AI 为您规划完美旅程' },
      { property: 'og:title', content: fullTitle.value },
      { property: 'og:description', content: options.description },
      { property: 'og:image', content: options.image || '/default-og.jpg' },
      { property: 'og:type', content: options.type || 'website' },
      { property: 'og:url', content: fullUrl.value },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle.value },
      { name: 'twitter:description', content: options.description },
      { name: 'twitter:image', content: options.image }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema.value)
      }
    ]
  }

  useHead(headConfig)

  return {
    fullTitle,
    fullUrl,
    schema
  }
}
