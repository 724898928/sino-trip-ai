<template>
  <SeoHead :title="$t('aiPlan.title')" :description="$t('aiPlan.description')" />
  <Navigation />

  <div class="ai-plan-container">
    <div class="chat-panel">
      <div class="chat-header">
        <h1>{{ $t('aiPlan.title') }}</h1>
        <button class="btn-clear" @click="aiStore.clearMessages" :title="$t('common.close')">
          🔄 清除
        </button>
      </div>

      <div class="chat-box" ref="chatBox">
        <div v-for="(msg, i) in aiStore.messages" :key="i" :class="['message', msg.role]">
          <span v-if="msg.role === 'assistant'" class="avatar">🤖</span>
          <span v-else class="avatar">👤</span>
          <div class="bubble" v-html="renderMarkdown(msg.content)"></div>
        </div>

        <div v-if="aiStore.loading" class="message assistant">
          <span class="avatar">🤖</span>
          <div class="bubble typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div class="input-area">
        <input
          v-model="userInput"
          @keyup.enter="sendMessage"
          :placeholder="$t('aiPlan.placeholder')"
          :disabled="aiStore.loading"
          class="input-field"
        />
        <button @click="sendMessage" :disabled="aiStore.loading" class="btn-send">
          {{ aiStore.loading ? $t('aiPlan.generating') : $t('aiPlan.send') }}
        </button>
      </div>

      <div class="helper-text">
        💡 {{ $t('aiPlan.example') }}
      </div>
    </div>

    <aside class="sidebar">
      <div class="sidebar-card">
        <h3>📍 当前位置</h3>
        <p v-if="selectedProvince">{{ selectedProvince.name_zh }}</p>
        <p v-else>未选择</p>
      </div>

      <div class="sidebar-card">
        <h3>💬 提示</h3>
        <ul>
          <li>告诉我目的地和天数</li>
          <li>说出你的预算范围</li>
          <li>分享你的兴趣爱好</li>
          <li>我会生成详细行程</li>
        </ul>
      </div>

      <AdBanner :show="true" />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { useAiStore } from '../stores/ai'
import { useProvinceStore } from '../stores/province'
import Navigation from '../components/Navigation.vue'
import SeoHead from '../components/SeoHead.vue'
import AdBanner from '../components/AdBanner.vue'

const aiStore = useAiStore()
const provinceStore = useProvinceStore()
const route = useRoute()

const userInput = ref('')
const chatBox = ref<HTMLElement>()

const selectedProvince = computed(() => {
  const slug = route.query.province as string
  if (slug) {
    const prov = provinceStore.provinceMap[slug]
    return prov || null
  }
  return null
})

onMounted(() => {
  provinceStore.fetchProvinces()
  nextTick(() => scrollToBottom())
})

async function sendMessage() {
  if (!userInput.value.trim() || aiStore.loading) return

  const message = userInput.value
  userInput.value = ''

  const prov = selectedProvince.value
  await aiStore.sendMessage(message, prov?.slug)
  await nextTick()
  scrollToBottom()
}

function scrollToBottom() {
  if (chatBox.value) {
    setTimeout(() => {
      if (chatBox.value) {
        chatBox.value.scrollTop = chatBox.value.scrollHeight
      }
    }, 0)
  }
}

function renderMarkdown(text: string) {
  try {
    return marked(text)
  } catch {
    return text
  }
}
</script>

<style scoped>
.ai-plan-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background: #f5f5f5;
}

.chat-panel {
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chat-header {
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.btn-clear {
  background: #f0f0f0;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s;
}

.btn-clear:hover {
  background: #e0e0e0;
}

.chat-box {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  justify-content: flex-end;
}

.message.user .bubble {
  background: #667eea;
  color: white;
}

.message.assistant .bubble {
  background: #f0f0f0;
  color: #333;
}

.avatar {
  font-size: 20px;
}

.bubble {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 8px;
  line-height: 1.5;
  word-wrap: break-word;
}

.bubble.typing {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 12px 16px;
}

.bubble.typing span {
  width: 8px;
  height: 8px;
  background: #999;
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.bubble.typing span:nth-child(2) {
  animation-delay: 0.2s;
}

.bubble.typing span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  60%,
  100% {
    opacity: 0.5;
  }
  30% {
    opacity: 1;
  }
}

:global(.bubble p) {
  margin: 8px 0;
}

:global(.bubble p:first-child) {
  margin-top: 0;
}

:global(.bubble p:last-child) {
  margin-bottom: 0;
}

:global(.bubble ul),
:global(.bubble ol) {
  margin: 8px 0;
  padding-left: 20px;
}

:global(.bubble li) {
  margin: 4px 0;
}

.input-area {
  display: flex;
  gap: 8px;
  padding: 16px 20px;
  border-top: 1px solid #eee;
  background: white;
}

.input-field {
  flex: 1;
  border: 1px solid #ddd;
  padding: 10px 12px;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.input-field:focus {
  border-color: #667eea;
}

.input-field:disabled {
  background: #f5f5f5;
  color: #999;
}

.btn-send {
  background: #667eea;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-send:hover:not(:disabled) {
  background: #5568d3;
}

.btn-send:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.helper-text {
  font-size: 12px;
  color: #999;
  padding: 0 20px 16px;
  text-align: center;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar-card {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.sidebar-card h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #333;
}

.sidebar-card p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.sidebar-card ul {
  margin: 0;
  padding-left: 16px;
}

.sidebar-card li {
  font-size: 12px;
  color: #666;
  margin: 4px 0;
}

@media (max-width: 1024px) {
  .ai-plan-container {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none;
  }

  .bubble {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .ai-plan-container {
    padding: 10px;
    gap: 10px;
  }

  .chat-box {
    padding: 10px;
  }

  .bubble {
    max-width: 100%;
  }
}
</style>