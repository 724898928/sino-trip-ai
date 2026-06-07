import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/province/:slug',
    name: 'province',
    component: () => import('../pages/ProvincePage.vue'),
    props: true
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('../pages/ArticlePage.vue')
  },
  {
    path: '/ai-plan',
    name: 'aiPlan',
    component: () => import('../pages/AiPlanPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../pages/NotFound.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})