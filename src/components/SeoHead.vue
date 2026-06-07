<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed } from 'vue'

const props = defineProps<{
  title?: string
  description?: string
  image?: string
  type?: string
}>()

const fullTitle = computed(() => {
  const title = props.title || '中国旅游 AI 行程规划'
  return title.includes('SinoTripAI') ? title : `${title} - SinoTripAI`
})

useHead({
  title: fullTitle.value,
  meta: [
    { name: 'description', content: props.description || '探索中国，AI 为您规划完美旅程。提供多语言旅游攻略和个性化行程规划。' },
    { name: 'keywords', content: '中国旅游，旅游攻略，AI行程，行程规划，旅游助手' },
    { property: 'og:title', content: fullTitle.value },
    { property: 'og:description', content: props.description },
    { property: 'og:image', content: props.image || '/default-og.jpg' },
    { property: 'og:type', content: props.type || 'website' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: props.title,
        description: props.description,
        image: props.image
      })
    }
  ],
  link: [
    { rel: 'canonical', href: window?.location?.href || '' }
  ]
})
</script>

<template>
  <!-- SEO component - renders nothing visually -->
</template>