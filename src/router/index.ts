import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import OrderType from '../views/OrderType.vue'
import Menu from '../views/Menu.vue'
import OrderConfirm from '../views/OrderConfirm.vue'

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
      // 當網址是 /order-type 的時候
      path: '/order-type',
      // 就顯示 OrderType.vue 這個頁面（選擇內用/自取）
      name: 'order-type',
      component: OrderType
    },
    {
      // 當網址是 /menu 的時候
      path: '/menu',
      // 就顯示 Menu.vue 這個頁面（主選單）
      name: 'menu',
      component: Menu
    },
    {
      // 當網址是 /order-confirm 的時候
      path: '/order-confirm',
      // 就顯示 OrderConfirm.vue 這個頁面（訂單確認）
      name: 'order-confirm',
      component: OrderConfirm
    }
  ],
})

export default router
