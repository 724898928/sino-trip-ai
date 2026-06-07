<template>
  <div class="ad-container" v-if="showAd">
    <div class="ad-inner">
      <!-- Google AdSense placeholder -->
      <ins
        class="adsbygoogle"
        style="display: block"
        :data-ad-client="adClient"
        :data-ad-slot="adSlot"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <p class="ad-label">{{ $t('common.language') === '简体中文' ? '广告' : 'Advertisement' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
  adClient?: string
  adSlot?: string
  show?: boolean
}>()

const showAd = ref(props.show !== false)
const adClient = ref(props.adClient || 'ca-pub-xxxxxxxxxxxxxxxx')
const adSlot = ref(props.adSlot || '1234567890')

onMounted(() => {
  try {
    const adsense = (window as any).adsbygoogle || []
    adsense.push({})
  } catch (e) {
    console.log('AdSense initialization skipped')
  }
})
</script>

<style scoped>
.ad-container {
  margin: 20px 0;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 8px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ad-inner {
  width: 100%;
}

.ad-label {
  font-size: 12px;
  color: #999;
  margin: 8px 0 0 0;
  text-align: center;
}

:global(.adsbygoogle) {
  width: 100%;
}
</style>