import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/about'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about", webpackPrefetch: true */ '../views/About.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
