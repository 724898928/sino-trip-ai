import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const preferences = ref({
    language: localStorage.getItem('language') || 'zh-CN',
    theme: localStorage.getItem('theme') || 'light',
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]')
  })

  function setLanguage(lang: string) {
    preferences.value.language = lang
    localStorage.setItem('language', lang)
    document.documentElement.lang = lang
  }

  function setTheme(theme: string) {
    preferences.value.theme = theme
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  function toggleFavorite(provinceId: string) {
    const idx = preferences.value.favorites.indexOf(provinceId)
    if (idx > -1) {
      preferences.value.favorites.splice(idx, 1)
    } else {
      preferences.value.favorites.push(provinceId)
    }
    localStorage.setItem('favorites', JSON.stringify(preferences.value.favorites))
  }

  function isFavorite(provinceId: string): boolean {
    return preferences.value.favorites.includes(provinceId)
  }

  return {
    preferences,
    setLanguage,
    setTheme,
    toggleFavorite,
    isFavorite
  }
})
