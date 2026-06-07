import { ref } from 'vue'

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: any
  timeout?: number
}

export function useApi() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch<T = any>(url: string, options: ApiOptions = {}): Promise<T> {
    loading.value = true
    error.value = null

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || 30000)

    try {
      const response = await globalThis.fetch(url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data as T
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error'
      error.value = message
      throw e
    } finally {
      clearTimeout(timeoutId)
      loading.value = false
    }
  }

  async function get<T = any>(url: string): Promise<T> {
    return fetch<T>(url, { method: 'GET' })
  }

  async function post<T = any>(url: string, body: any): Promise<T> {
    return fetch<T>(url, { method: 'POST', body })
  }

  async function put<T = any>(url: string, body: any): Promise<T> {
    return fetch<T>(url, { method: 'PUT', body })
  }

  async function del<T = any>(url: string): Promise<T> {
    return fetch<T>(url, { method: 'DELETE' })
  }

  return {
    loading,
    error,
    fetch,
    get,
    post,
    put,
    del
  }
}
