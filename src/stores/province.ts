import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface Province {
  id: string
  name_zh: string
  name_en: string
  slug: string
  description_zh: string
  image_url: string
  latitude: number
  longitude: number
  hot_score?: number
}

const HOT_DESTINATION_FALLBACK: Record<string, number> = {
  beijing: 100,
  shanghai: 98,
  guangzhou: 95,
  shenzhen: 94,
  chengdu: 93,
  xian: 92,
  sichuan: 91,
  yunnan: 90,
  hangzhou: 89,
  guilin: 88
}

function getHotScore(province: Province) {
  const fallbackScore = HOT_DESTINATION_FALLBACK[province.slug] ?? 0
  return province.hot_score ?? fallbackScore
}

function sortByHotScore(list: Province[]) {
  return [...list].sort((a, b) => {
    const scoreDiff = getHotScore(b) - getHotScore(a)
    if (scoreDiff !== 0) return scoreDiff
    return a.name_zh.localeCompare(b.name_zh, 'zh-Hans')
  })
}

function normalizeProvince(province: Province) {
  return {
    ...province,
    hot_score: getHotScore(province)
  }
}

export const useProvinceStore = defineStore('province', () => {
  const provinces = ref<Province[]>([])
  const selectedProvince = ref<Province | null>(null)
  const loading = ref(false)
  const error = ref('')

  const provinceMap = computed(() => {
    const map: Record<string, Province> = {}
    provinces.value.forEach(province => {
      map[province.slug] = province
      map[province.id] = province
    })
    return map
  })

  async function fetchProvinces() {
    loading.value = true
    error.value = ''
    try {
      const response = await fetch('/api/provinces')
      if (!response.ok) throw new Error('Failed to fetch provinces')
      const data = await response.json()
      provinces.value = sortByHotScore(data.map(normalizeProvince))
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      provinces.value = sortByHotScore([
        {
          id: 'bj',
          name_zh: '北京',
          name_en: 'Beijing',
          slug: 'beijing',
          description_zh: '首都北京，历史文化名城，拥有众多世界遗产和现代风景',
          image_url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
          latitude: 39.9042,
          longitude: 116.4074,
          hot_score: 100
        },
        {
          id: 'sc',
          name_zh: '四川',
          name_en: 'Sichuan',
          slug: 'sichuan',
          description_zh: '天府之国，熊猫故乡，拥有壮丽的自然风景和深厚的文化底蕴',
          image_url: 'https://images.unsplash.com/photo-1523371335684-37898b6baf30?w=800',
          latitude: 30.57,
          longitude: 104.06,
          hot_score: 91
        },
        {
          id: 'yn',
          name_zh: '云南',
          name_en: 'Yunnan',
          slug: 'yunnan',
          description_zh: '彩云之南，旅游天堂，以其多彩的民族风情和秀美的自然风景闻名',
          image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          latitude: 25.04,
          longitude: 102.7,
          hot_score: 90
        }
      ])
    } finally {
      loading.value = false
    }
  }

  function selectProvince(slug: string) {
    selectedProvince.value = provinceMap.value[slug] || null
  }

  return {
    provinces,
    selectedProvince,
    loading,
    error,
    provinceMap,
    fetchProvinces,
    selectProvince
  }
})
