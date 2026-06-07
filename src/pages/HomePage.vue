<template>
  <SeoHead :title="$t('home.title')" :description="$t('home.desc')" />
  <Navigation />

  <div class="home-container">
    <header class="hero">
      <div class="hero-content">
        <p class="eyebrow">{{ $t('home.popularDestinations') }}</p>
        <h1>{{ $t('home.hero') }}</h1>
        <p class="subtitle">{{ $t('home.desc') }}</p>
        <div class="search-bar">
          <input
            v-model="search"
            type="text"
            :placeholder="$t('home.searchPlaceholder')"
            class="search-input"
          />
          <span class="search-icon">🔍</span>
        </div>
      </div>
    </header>

    <section v-if="!store.loading && showFeaturedDestinations" class="featured-section">
      <div class="section-header">
        <h2>{{ $t('home.hotCities') }}</h2>
        <p>{{ $t('home.hotRankSubtitle') }}</p>
      </div>

      <div class="featured-grid">
        <ProvinceCard
          v-for="(province, index) in featuredProvinces"
          :key="province.id"
          :province="province"
          :rank="index + 1"
          :hot-score="province.hot_score"
        />
      </div>
    </section>

    <section class="main-content">
      <div class="section-header">
        <h2>{{ $t('home.provinces') }}</h2>
        <p>{{ filteredProvinces.length }} {{ $t('home.destinationCount') }}</p>
      </div>

      <div class="loading" v-if="store.loading">
        <p>{{ $t('common.loading') }}...</p>
      </div>

      <div v-else-if="filteredProvinces.length === 0" class="empty-state">
        <p>{{ $t('common.error') }}</p>
      </div>

      <div v-else class="provinces-grid">
        <ProvinceCard
          v-for="province in filteredProvinces"
          :key="province.id"
          :province="province"
          :rank="getProvinceRank(province.id)"
          :hot-score="province.hot_score"
        />
      </div>
    </section>

    <AdBanner />

    <footer class="footer">
      <p>© 2025 SinoTripAI. {{ $t('footer.copyright') }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AdBanner from '../components/AdBanner.vue'
import Navigation from '../components/Navigation.vue'
import ProvinceCard from '../components/ProvinceCard.vue'
import SeoHead from '../components/SeoHead.vue'
import { useProvinceStore } from '../stores/province'

const store = useProvinceStore()
const search = ref('')

const normalizedSearch = computed(() => search.value.trim().toLowerCase())
const featuredProvinces = computed(() => store.provinces.slice(0, 6))

const filteredProvinces = computed(() => {
  if (!normalizedSearch.value) return store.provinces

  return store.provinces.filter(province => {
    const chineseName = province.name_zh.toLowerCase()
    const englishName = province.name_en?.toLowerCase() || ''
    const slug = province.slug.toLowerCase()

    return (
      chineseName.includes(normalizedSearch.value) ||
      englishName.includes(normalizedSearch.value) ||
      slug.includes(normalizedSearch.value)
    )
  })
})

const showFeaturedDestinations = computed(() => normalizedSearch.value.length === 0)

function getProvinceRank(provinceId: string) {
  return store.provinces.findIndex(province => province.id === provinceId) + 1
}

onMounted(() => {
  store.fetchProvinces()
})
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 20px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px 0;
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 999px;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero h1 {
  font-size: 48px;
  margin: 0 0 16px 0;
  font-weight: 700;
}

.subtitle {
  font-size: 18px;
  margin: 0 0 32px 0;
  opacity: 0.95;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  max-width: 520px;
  margin: 0 auto;
  overflow: hidden;
}

.search-input {
  flex: 1;
  border: none;
  padding: 14px 16px;
  font-size: 16px;
  outline: none;
  background: transparent;
}

.search-icon {
  padding: 0 16px;
  color: #999;
}

.featured-section,
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 0;
}

.section-header {
  margin-bottom: 24px;
}

.section-header h2 {
  font-size: 32px;
  margin: 0 0 8px 0;
  color: #333;
}

.section-header p {
  margin: 0;
  color: #999;
  font-size: 14px;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.loading,
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.provinces-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.footer {
  background: white;
  text-align: center;
  padding: 24px;
  color: #999;
  border-top: 1px solid #eee;
  margin-top: 60px;
}

@media (max-width: 768px) {
  .hero {
    padding: 48px 16px;
  }

  .hero h1 {
    font-size: 32px;
  }

  .subtitle {
    font-size: 16px;
  }

  .search-bar {
    width: 100%;
  }

  .featured-grid,
  .provinces-grid {
    grid-template-columns: 1fr;
  }

  .featured-section,
  .main-content {
    padding-inline: 16px;
  }
}
</style>
