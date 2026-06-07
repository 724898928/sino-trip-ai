import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAiStore = defineStore('ai', () => {
  interface Message {
    role: 'user' | 'assistant'
    content: string
  }

  const messages = ref<Message[]>([
    {
      role: 'assistant',
      content: '你好！👋 我是 AI 旅游规划助手。告诉我你想去哪个地方、旅行天数、预算和兴趣，我会为你生成一份详细的行程规划。'
    }
  ])
  const loading = ref(false)
  const error = ref('')
  const sessionId = ref(generateSessionId())

  function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  async function sendMessage(userMessage: string, province?: string) {
    if (!userMessage.trim()) return

    messages.value.push({
      role: 'user',
      content: userMessage
    })

    loading.value = true
    error.value = ''

    try {
      const response = await fetch('/api/ai-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.value.slice(-10),
          province,
          sessionId: sessionId.value
        })
      })

      if (!response.ok) throw new Error('AI 服务暂时不可用')

      const data = await response.json()
      messages.value.push({
        role: 'assistant',
        content: data.reply || '抱歉，我没有生成合适的回复，请重试。'
      })
    } catch (e) {
      error.value = e instanceof Error ? e.message : '请求失败'
      messages.value.push({
        role: 'assistant',
        content: '⚠️ ' + error.value + '，请稍后重试。'
      })
    } finally {
      loading.value = false
    }
  }

  function clearMessages() {
    messages.value = [
      {
        role: 'assistant',
        content: '你好！👋 我是 AI 旅游规划助手。告诉我你想去哪个地方、旅行天数、预算和兴趣，我会为你生成一份详细的行程规划。'
      }
    ]
    sessionId.value = generateSessionId()
    error.value = ''
  }

  return {
    messages,
    loading,
    error,
    sessionId,
    sendMessage,
    clearMessages
  }
})
