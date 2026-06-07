<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // Set initial theme from localStorage
  const theme = localStorage.getItem('theme') || 'light'
  document.documentElement.setAttribute('data-theme', theme)
})
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-color: #333;
  --border-color: #eee;
  --bg-color: #f5f5f5;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
  background: var(--bg-color);
}

html[data-theme='dark'] {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-color: #e0e0e0;
  --border-color: #333;
  --bg-color: #1a1a1a;
}

#app {
  min-height: 100vh;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  opacity: 0.8;
}

button {
  font-family: inherit;
  cursor: pointer;
}

input,
select,
textarea {
  font-family: inherit;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #999;
}

::selection {
  background: var(--primary-color);
  color: white;
}

@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}
</style>
