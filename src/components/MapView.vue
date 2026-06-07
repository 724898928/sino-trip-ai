<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Marker {
  id?: string
  name_zh: string
  name_en?: string
  latitude: number
  longitude: number
  category?: string
}

const props = defineProps<{
  center?: [number, number]
  markers?: Marker[]
  zoom?: number
}>()

const mapContainer = ref<HTMLElement>()
let map: L.Map | null = null
const markerLayer = ref<any>(L.layerGroup())

onMounted(() => {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value).setView(props.center || [35, 105], props.zoom || 6)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map)

  renderMarkers()
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})

function renderMarkers() {
  if (!map) return
  if (markerLayer.value) {
    markerLayer.value.clearLayers()
  } else {
    markerLayer.value = L.layerGroup()
  }

  props.markers?.forEach(m => {
    const marker = L.marker([m.latitude, m.longitude], {
      title: m.name_zh
    }).bindPopup(`
      <div class="map-popup">
        <strong>${m.name_zh}</strong>
        ${m.name_en ? `<br><small>${m.name_en}</small>` : ''}
        ${m.category ? `<br><small class="category">${m.category}</small>` : ''}
      </div>
    `)

    marker.addTo(markerLayer.value)
  })

  if (map) {
    markerLayer.value.addTo(map)
  }
}

watch(() => props.center, (newCenter) => {
  if (newCenter && map) {
    map.setView(newCenter, props.zoom || 6)
  }
})

watch(() => props.markers, () => {
  renderMarkers()
}, { deep: true })
</script>

<style scoped>
.map-wrapper {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.map {
  height: 400px;
  width: 100%;
}

:global(.map-popup) {
  font-size: 14px;
}

:global(.map-popup .category) {
  color: #666;
  display: block;
  margin-top: 4px;
}
</style>