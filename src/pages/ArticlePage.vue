<template>
  <SeoHead :title="`${article?.title_zh} - 旅游攻略`" :description="article?.content_zh?.substring(0, 100)" />
  <Navigation />

  <div class="article-page">
    <article v-if="article" class="article-content">
      <header class="article-header">
        <h1>{{ article.title_zh }}</h1>
        <div class="article-meta">
          <span class="author">👤 {{ article.author }}</span>
          <span class="date">📅 {{ formatDate(article.published_at) }}</span>
        </div>
      </header>

      <div class="article-body" v-html="renderMarkdown(article.content_zh)"></div>

      <footer class="article-footer">
        <div class="keywords" v-if="article.seo_keywords">
          <strong>标签：</strong>
          <span v-for="tag in article.seo_keywords.split(',')" :key="tag" class="tag">
            {{ tag.trim() }}
          </span>
        </div>
      </footer>
    </article>

    <div v-else class="loading">
      <p>{{ $t('common.loading') }}...</p>
    </div>

    <aside class="sidebar">
      <AdBanner />

      <div class="related-articles">
        <h3>相关文章</h3>
        <p style="color: #999; font-size: 12px;">暂无相关文章</p>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import Navigation from '../components/Navigation.vue'
import SeoHead from '../components/SeoHead.vue'
import AdBanner from '../components/AdBanner.vue'

interface Article {
  id: string
  title_zh: string
  content_zh: string
  author: string
  published_at: string
  seo_keywords: string
}

const route = useRoute()
const article = ref<Article | null>(null)

onMounted(() => {
  // Mock article data
  article.value = {
    id: route.params.id as string,
    title_zh: '云南旅游完全指南',
    content_zh: '# 云南旅游完全指南\n\n云南是中国最美的省份之一。\n\n## 最佳季节\n\n春季和秋季是游玩的最好时机。\n\n## 推荐景点\n\n- 丽江古城\n- 玉龙雪山\n- 泸沽湖\n\n## 交通建议\n\n可乘坐飞机到昆明后转车...',
    author: '旅游达人',
    published_at: new Date().toISOString(),
    seo_keywords: '云南,旅游,攻略,景点,美食'
  }
})

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

function renderMarkdown(text: string): string {
  try {
    const result = marked(text)
    return typeof result === 'string' ? result : result.toString()
  } catch {
    return text
  }
}
</script>

<style scoped>
.article-page {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
  background: #f5f5f5;
}

.article-content {
  background: white;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.article-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
}

.article-header h1 {
  margin: 0 0 15px 0;
  font-size: 36px;
  color: #333;
}

.article-meta {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #999;
}

.article-body {
  line-height: 1.8;
  color: #333;
  font-size: 16px;
}

:global(.article-body h2) {
  font-size: 24px;
  margin: 30px 0 15px 0;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

:global(.article-body h3) {
  font-size: 18px;
  margin: 20px 0 10px 0;
  color: #555;
}

:global(.article-body p) {
  margin: 15px 0;
}

:global(.article-body ul),
:global(.article-body ol) {
  margin: 15px 0;
  padding-left: 30px;
}

:global(.article-body li) {
  margin: 8px 0;
}

:global(.article-body blockquote) {
  margin: 15px 0;
  padding: 15px;
  background: #f9f9f9;
  border-left: 4px solid #667eea;
  border-radius: 4px;
}

:global(.article-body code) {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
}

:global(.article-body pre) {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
}

.article-footer {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.keywords {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.tag {
  background: #f0f0f0;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.related-articles {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.related-articles h3 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #333;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #666;
}

@media (max-width: 1024px) {
  .article-page {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .article-content {
    padding: 20px;
  }

  .article-header h1 {
    font-size: 24px;
  }

  .article-body {
    font-size: 14px;
  }
}
</style>
