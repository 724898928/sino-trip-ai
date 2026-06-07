<template>
  <nav class="navigation">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">🌏 SinoTripAI</router-link>

      <button class="nav-toggle" @click="isOpen = !isOpen">
        <span v-if="!isOpen">☰</span>
        <span v-else>✕</span>
      </button>

      <div class="nav-menu" :class="{ open: isOpen }">
        <router-link to="/" class="nav-link" @click="isOpen = false">
          {{ $t('navigation.home') }}
        </router-link>
        <router-link to="#" class="nav-link" @click="isOpen = false">
          {{ $t('navigation.destinations') }}
        </router-link>
        <router-link to="/ai-plan" class="nav-link" @click="isOpen = false">
          {{ $t('navigation.aiPlanner') }}
        </router-link>

        <div class="nav-divider"></div>

        <div class="language-selector">
          <select :value="currentLanguage" @change="handleLanguageChange" class="lang-select">
            <option value="zh-CN">简体中文</option>
            <option value="en">English</option>
            <option value="zh-TW">繁体中文</option>
          </select>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from '../composables/useI18n'

const { setLanguage, currentLanguage } = useI18n()
const isOpen = ref(false)

function handleLanguageChange(event: Event) {
  const target = event.target as HTMLSelectElement
  setLanguage(target.value)
}

watch(currentLanguage, () => {
  isOpen.value = false
})
</script>

<style scoped>
.navigation {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.nav-logo {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-logo:hover {
  color: #0066cc;
}

.nav-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

.nav-menu {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-link {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #0066cc;
}

.nav-divider {
  display: none;
  height: 1px;
  background: #eee;
  margin: 8px 0;
}

.language-selector {
  margin-left: auto;
}

.lang-select {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background: white;
  color: #333;
  transition: border-color 0.2s;
}

.lang-select:hover {
  border-color: #0066cc;
}

.lang-select:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
}

@media (max-width: 768px) {
  .nav-toggle {
    display: block;
  }

  .nav-menu {
    display: none;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    gap: 0;
    align-items: stretch;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }

  .nav-menu.open {
    display: flex;
  }

  .nav-link,
  .language-selector {
    padding: 12px 20px;
    margin: 0;
  }

  .nav-divider {
    display: block;
  }

  .language-selector {
    padding: 12px 20px;
  }
}
</style>
