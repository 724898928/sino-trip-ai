<template>
  <div class="province-card">
    <router-link :to="`/province/${province.slug}`" class="card-image">
      <img :src="province.image_url" :alt="province.name_zh" />
      <div class="overlay">
        <span class="view-btn">{{ $t('common.home') }}</span>
      </div>
    </router-link>
    <div class="card-content">
      <h3>{{ province.name_zh }}</h3>
      <p class="en-name">{{ province.name_en }}</p>
      <p class="description">{{ province.description_zh }}</p>
      <div class="card-footer">
        <router-link :to="`/province/${province.slug}`" class="btn-link">
          {{ $t('province.aiPlan') }} →
        </router-link>
        <button
          class="btn-favorite"
          :class="{ active: isFavorite }"
          @click.prevent="toggleFave"
          :title="isFavorite ? '已收藏' : '收藏'"
        >
          ❤️
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '../stores/user'

interface Province {
  id: string
  name_zh: string
  name_en: string
  slug: string
  description_zh: string
  image_url: string
}

const props = defineProps<{
  province: Province
}>()

const userStore = useUserStore()

const isFavorite = computed(() => userStore.isFavorite(props.province.id))

function toggleFave() {
  userStore.toggleFavorite(props.province.id)
}
</script>

<style scoped>
.province-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.province-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

.card-image {
  position: relative;
  overflow: hidden;
  height: 200px;
  display: block;
  text-decoration: none;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.province-card:hover .card-image img {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.province-card:hover .overlay {
  opacity: 1;
}

.view-btn {
  background: white;
  color: #333;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.card-content {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-content h3 {
  margin: 0 0 4px 0;
  font-size: 18px;
  color: #333;
}

.en-name {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #999;
  font-style: italic;
}

.description {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  flex: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.btn-link {
  color: #0066cc;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}

.btn-link:hover {
  color: #0052a3;
}

.btn-favorite {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  transition: transform 0.2s;
}

.btn-favorite:hover {
  transform: scale(1.2);
}

.btn-favorite.active {
  opacity: 1;
}

@media (max-width: 768px) {
  .card-image {
    height: 150px;
  }
}
</style>
