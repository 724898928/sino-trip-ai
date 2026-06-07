import { ref, watch } from 'vue'
import { useI18n as vueUseI18n } from 'vue-i18n'
import { useUserStore } from '../stores/user'

export function useI18n() {
  const { t, locale } = vueUseI18n()
  const userStore = useUserStore()

  const currentLanguage = ref(locale.value)

  watch(() => userStore.preferences.language, (newLang) => {
    locale.value = newLang
    currentLanguage.value = newLang
    document.documentElement.lang = newLang
  })

  function setLanguage(lang: string) {
    userStore.setLanguage(lang)
  }

  return {
    t,
    locale,
    currentLanguage,
    setLanguage,
    availableLanguages: [
      { code: 'zh-CN', name: '简体中文' },
      { code: 'en', name: 'English' },
      { code: 'zh-TW', name: '繁体中文' }
    ]
  }
}
