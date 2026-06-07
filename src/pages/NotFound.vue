<template>
  <SeoHead title="404 - 页面未找到" description="您访问的页面不存在" />
  <Navigation />

  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <p class="subtitle">哎呀，页面未找到</p>
      <p class="description">您访问的页面不存在或已被删除</p>

      <router-link to="/" class="btn-home">
        ← 返回首页
      </router-link>

      <div class="suggestions">
        <h3>您可能在找：</h3>
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/ai-plan">AI 行程规划</router-link></li>
          <li><a href="/sitemap.xml">网站地图</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navigation from '../components/Navigation.vue'
import SeoHead from '../components/SeoHead.vue'
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.content {
  text-align: center;
  color: white;
}

.content h1 {
  font-size: 120px;
  margin: 0;
  font-weight: 700;
  opacity: 0.9;
}

.subtitle {
  font-size: 32px;
  margin: 10px 0 10px 0;
  font-weight: 600;
}

.description {
  font-size: 18px;
  margin: 0 0 30px 0;
  opacity: 0.9;
}

.btn-home {
  display: inline-block;
  background: white;
  color: #667eea;
  padding: 12px 28px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-home:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.suggestions {
  margin-top: 40px;
  text-align: left;
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px 30px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.suggestions h3 {
  margin: 0 0 15px 0;
  font-size: 16px;
}

.suggestions ul {
  margin: 0;
  padding-left: 20px;
  list-style: none;
}

.suggestions li {
  margin: 8px 0;
}

.suggestions a {
  color: white;
  text-decoration: underline;
  transition: opacity 0.2s;
}

.suggestions a:hover {
  opacity: 0.8;
}
</style>
