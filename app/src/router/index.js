// import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

// const App1 = defineAsyncComponent(() => import('app1/App'))

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/app1',
    name: 'app1',
    component: () => import('app1/App')
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
