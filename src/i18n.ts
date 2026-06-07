import { createI18n } from 'vue-i18n'
import zh from './locales/zh-CN.json'
import en from './locales/en.json'
import zhTw from './locales/zh-TW.json'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zh,
    en,
    'zh-TW': zhTw
  }
})

export default i18n
