<template>
  <SeoHead :title="province?.name_zh" :description="province?.description_zh" />
  <Navigation />

  <div v-if="province" class="province-page">
    <div class="cover-section">
      <img :src="province.image_url" :alt="province.name_zh" class="cover" />
      <div class="cover-overlay">
        <div class="cover-content">
          <h1>{{ province.name_zh }}</h1>
          <p class="province-en">{{ province.name_en }}</p>
        </div>
      </div>
    </div>

    <div class="content-container">
      <section class="section">
        <h2>关于</h2>
        <p class="description">{{ province.description_zh }}</p>

        <div class="info-grid">
          <div class="info-item">
            <span class="label">{{ $t('province.bestSeason') }}</span>
            <span class="value">春秋季</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('province.duration') }}</span>
            <span class="value">5-7天</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('province.budget') }}</span>
            <span class="value">¥3000-5000</span>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>{{ $t('province.attractions') }}</h2>
        <MapView
          :center="[province.latitude, province.longitude]"
          :markers="attractions"
          :zoom="7"
        />

        <div v-if="attractions.length > 0" class="attractions-grid">
          <div v-for="attr in attractions" :key="attr.id" class="attraction-card">
            <div class="attraction-header">
              <h3>{{ attr.name_zh }}</h3>
              <span class="rating">⭐ {{ attr.rating }}</span>
            </div>
            <p class="category">{{ attr.category }}</p>
            <p v-if="attr.description_zh" class="description">{{ attr.description_zh }}</p>
          </div>
        </div>

        <div v-else class="empty-state">
          <p>暂无景点数据</p>
        </div>
      </section>

      <section class="section cta-section">
        <h2>开始规划你的旅程</h2>
        <router-link :to="`/ai-plan?province=${province.slug}`" class="btn-primary">
          🚀 {{ $t('province.aiPlan') }}
        </router-link>
      </section>

      <AdBanner />
    </div>
  </div>

  <div v-else class="loading-state">
    <p>{{ $t('common.loading') }}...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProvinceStore } from '../stores/province'
import Navigation from '../components/Navigation.vue'
import SeoHead from '../components/SeoHead.vue'
import MapView from '../components/MapView.vue'
import AdBanner from '../components/AdBanner.vue'

const route = useRoute()
const provinceStore = useProvinceStore()
const province = ref<any>(null)
const attractions = ref<any[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  const slug = route.params.slug as string

  // Get from store if available
  if (provinceStore.provinces.length === 0) {
    await provinceStore.fetchProvinces()
  }

  province.value = provinceStore.provinceMap[slug]

  if (!province.value) {
    loading.value = false
    return
  }

  // Mock attractions data
  attractions.value = [
    {
      id: 'attr1',
      name_zh: '丽江古城',
      name_en: 'Lijiang Ancient Town',
      category: '文化景区',
      description_zh: '保存完好的古城，融汇纳西、白、彝、藏、傈僳等民族文化',
      latitude: province.value.latitude - 0.5,
      longitude: province.value.longitude - 0.5,
      rating: 4.8
    },
    {
      id: 'attr2',
      name_zh: '玉龙雪山',
      name_en: 'Jade Dragon Snow Mountain',
      category: '自然风景',
      description_zh: '位于丽江市，是云南最著名的雪山之一',
      latitude: province.value.latitude,
      longitude: province.value.longitude,
      rating: 4.7
    }
  ]

  loading.value = false
})
</script>

<style scoped>
.province-page {
  min-height: 100vh;
  background: white;
}

.cover-section {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
  display: flex;
  align-items: flex-end;
}

.cover-content {
  color: white;
  padding: 40px;
  width: 100%;
}

.cover-content h1 {
  margin: 0 0 8px 0;
  font-size: 48px;
  font-weight: 700;
}

.province-en {
  margin: 0;
  font-size: 18px;
  opacity: 0.9;
  font-style: italic;
}

.content-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.section {
  margin-bottom: 48px;
}

.section h2 {
  font-size: 28px;
  margin: 0 0 20px 0;
  color: #333;
  padding-bottom: 12px;
  border-bottom: 2px solid #667eea;
}

.description {
  font-size: 16px;
  line-height: 1.8;
  color: #666;
  margin: 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 24px;
}

.info-item {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
}

.info-item .label {
  display: block;
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

.info-item .value {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.attractions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.attraction-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.3s ease;
}

.attraction-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.attraction-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 8px;
}

.attraction-card h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.rating {
  font-size: 14px;
  color: #ff9500;
}

.category {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #0066cc;
  background: #f0f7ff;
  display: inline-block;
  padding: 2px 8px;
  border-radius: 3px;
}

.attraction-card .description {
  font-size: 13px;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.cta-section {
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, #667eea15, #764ba215);
  border-radius: 8px;
}

.btn-primary {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 14px 32px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #666;
}

@media (max-width: 768px) {
  .cover-content h1 {
    font-size: 32px;
  }

  .content-container {
    padding: 20px 16px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .attractions-grid {
    grid-template-columns: 1fr;
  }
}
</style>