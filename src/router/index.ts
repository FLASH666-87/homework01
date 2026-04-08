import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

// 這個檔案是「房間門牌號管理員」
// 負責把不同的網址對應到不同的頁面

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 當網址是 / 的時候（首頁）
      path: '/',
      // 就跳轉到 /login
      redirect: '/login'
    },
    {
      // 當網址是 /login 的時候
      path: '/login',
      // 就顯示 Login.vue 這個頁面
      name: 'login',
      component: Login
    },
    {
      // 當網址是 /home 的時候
      path: '/home',
      // 就顯示 Home.vue 這個頁面
      name: 'home',
      component: Home
    }
  ],
})

export default router
