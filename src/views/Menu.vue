<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 引入 router（像借一台導航機）
const router = useRouter()

// ==================== 檢查登入狀態 ====================

// 當這個頁面載入時，檢查有沒有登入
onMounted(() => {
  // 從 localStorage 讀取當前登入者
  const currentUserJson = localStorage.getItem('currentUser')
  
  // 如果沒有登入過，就跳回登入頁面
  if (!currentUserJson) {
    router.push('/login')
  }
})

// ==================== 放資料的盒子 ====================

// 放一個叫 searchKeyword 的盒子，裝搜尋關鍵字
const searchKeyword = ref('')

// 放一個叫 selectedCategory 的盒子，裝目前選的分類
// 預設是 'all'（全部）
const selectedCategory = ref('all')

// 放一個叫 cartItems 的盒子，裝購物籃裡的東西
// 一開始是空的（沒有預設值）
const cartItems = ref<Array<{id: number, name: string, price: number, quantity: number}>>([])

// 放一個叫 showCart 的盒子，預設是 false（購物籃收合）
const showCart = ref(false)

// 放一個叫 showCoupon 的盒子，預設是 false（優惠券收合）
const showCoupon = ref(false)

// 放一個叫 userName 的盒子，裝會員名字
// 從 localStorage 讀取當前登入者的名字
const currentUserJson = localStorage.getItem('currentUser')
const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null
const userName = ref(currentUser?.name || '訪客')

// 放一個叫 orderInfo 的盒子，裝取餐資訊
// 從 localStorage 讀取
const orderInfoJson = localStorage.getItem('orderInfo')
const orderInfo = orderInfoJson ? JSON.parse(orderInfoJson) : null

// 優惠券資料
const coupons = ref({
  points: 3,
  pointsExpire: '2026/7/9',
  newUser30: true,
  newUser30Expire: '2026/4/12',
  newUserFreeShip: true,
  mysteryCoupon: 2,
  mysteryCouponExpire: '2026/5/9'
})

// 勾選了哪些優惠券
const selectedCoupons = ref({
  points: false,
  newUser30: false,
  mysteryCoupon: false
})

// ==================== 餐點清單 ====================

// 放一個叫 menuItems 的盒子，裝所有餐點
const menuItems = ref([
  // 珍珠堡系列
  { id: 1, name: '超級大麥牛蒡培根珍珠堡', price: 110, category: 'burger', image: 'https://www.mos.com.tw/upload/product/20260320_182507_063.jpg' },
  { id: 2, name: '牛蒡培根珍珠堡', price: 105, category: 'burger', image: 'https://www.mos.com.tw/upload/product/20260320_182732_068.jpg' },
  { id: 3, name: '和風玉子珍珠堡', price: 100, category: 'burger', image: 'https://www.mos.com.tw/upload/product/20250212_140024_010.jpg' },
  { id: 4, name: '超級大麥海洋珍珠堡', price: 110, category: 'burger', image: 'https://www.mos.com.tw/upload/product/20230724_112410_005.jpg' },
  { id: 5, name: '海洋珍珠堡', price: 105, category: 'burger', image: 'https://www.mos.com.tw/upload/product/20230724_112335_068.jpg' },
  { id: 6, name: '超級大麥杏鮑菇珍珠堡', price: 105, category: 'burger', image: 'https://www.mos.com.tw/upload/product/20220316_115720_037.jpg' },
  { id: 7, name: '杏鮑菇珍珠堡', price: 100, category: 'burger', image: 'https://www.mos.com.tw/upload/product/20230614_100431_051.jpg' },
  { id: 8, name: '摩斯豬排堡', price: 90, category: 'burger', image: 'https://www.mos.com.tw/upload/product/20231103_130417_042.jpg' },
  { id: 9, name: '摩斯炸蝦堡', price: 105, category: 'burger', image: 'https://www.mos.com.tw/upload/product/20231005_200834_007.jpg' },
  { id: 10, name: '元氣牛肉蛋堡', price: 90, category: 'burger', image: 'https://www.mos.com.tw/upload/product/20220804_103800_073.jpg' },
  { id: 11, name: '培根雞蛋堡', price: 70, category: 'burger', image: 'https://www.mos.com.tw/upload/product/20160203_173547_092.jpg' },
  { id: 12, name: '火腿歐姆蛋堡', price: 70, category: 'burger', image: 'https://www.mos.com.tw/upload/product/20160203_173636_067.jpg' },
  
  // 貝果系列
  { id: 13, name: '蕃茄吉士蛋貝果', price: 70, category: 'bagel', image: 'https://www.mos.com.tw/upload/product/20260206_171625_090.jpg' },
  { id: 14, name: '火腿歐姆蛋貝果', price: 70, category: 'bagel', image: 'https://www.mos.com.tw/upload/product/20260206_171639_071.jpg' },
  { id: 15, name: '培根雞蛋貝果', price: 70, category: 'bagel', image: 'https://www.mos.com.tw/upload/product/20260206_171601_074.jpg' },
  { id: 16, name: '摩斯貝果', price: 45, category: 'bagel', image: 'https://www.mos.com.tw/upload/product/20250416_171732_081.jpg' },
  
  // 三明治系列
  { id: 17, name: '日式豬排三明治', price: 65, category: 'sandwich', image: 'https://www.mos.com.tw/upload/product/20160203_175728_063.jpg' },
  { id: 18, name: '火腿蛋三明治', price: 65, category: 'sandwich', image: 'https://www.mos.com.tw/upload/product/20171019_153932_044.jpg' },
  { id: 19, name: '雞肉三明治', price: 65, category: 'sandwich', image: 'https://www.mos.com.tw/upload/product/20160203_175446_097.jpg' },
  { id: 20, name: '黃金蝦三明治', price: 75, category: 'sandwich', image: 'https://www.mos.com.tw/upload/product/20230411_184119_011.jpg' }
])

// ==================== 服務生函數 ====================

// 選擇分類
const selectCategory = (category: string) => {
  selectedCategory.value = category
}

// 加到購物籃
const addToCart = (item: any) => {
  // 檢查購物籃裡有沒有這個東西
  const existing = cartItems.value.find(i => i.id === item.id)
  if (existing) {
    // 如果有，就數量+1
    existing.quantity++
  } else {
    // 如果沒有，就加進去
    cartItems.value.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    })
  }
}

// 從購物籃移除
const removeFromCart = (id: number) => {
  cartItems.value = cartItems.value.filter(i => i.id !== id)
}

// 增加數量
const increaseQuantity = (id: number) => {
  const item = cartItems.value.find(i => i.id === id)
  if (item) {
    item.quantity++
  }
}

// 減少數量
const decreaseQuantity = (id: number) => {
  const item = cartItems.value.find(i => i.id === id)
  if (item) {
    if (item.quantity > 1) {
      item.quantity--
    } else {
      // 如果數量變成0，就移除
      removeFromCart(id)
    }
  }
}

// 返回選擇取餐方式
const goBack = () => {
  router.push('/order-type')
}

// ==================== 計算屬性 ====================

// 計算過濾後的餐點列表
// 這個函數會根據搜尋關鍵字和分類來過濾餐點
const filteredMenuItems = computed(() => {
  // 先取得所有餐點
  let items = menuItems.value
  
  // 如果有選分類（不是 'all'），就只留下這個分類的餐點
  if (selectedCategory.value !== 'all') {
    items = items.filter(item => item.category === selectedCategory.value)
  }
  
  // 如果有輸入搜尋關鍵字，就只留下名字包含關鍵字的餐點
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    items = items.filter(item => item.name.toLowerCase().includes(keyword))
  }
  
  // 把過濾後的結果傳回去
  return items
})

// 計算小計
const subtotal = () => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

// 計算總件數
const totalItems = () => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
}

// 計算優惠金額
const discount = () => {
  let discountAmount = 0
  
  // 集點卡：5點換三明治（假設每個三明治$65）
  if (selectedCoupons.value.points && coupons.value.points >= 5) {
    discountAmount += 65
  }
  
  // 新人禮：現折$30
  if (selectedCoupons.value.newUser30 && coupons.value.newUser30) {
    discountAmount += 30
  }
  
  // 神秘卷：全減免（最高$300）
  if (selectedCoupons.value.mysteryCoupon && coupons.value.mysteryCoupon > 0) {
    const total = subtotal()
    discountAmount += Math.min(total, 300)
  }
  
  return discountAmount
}

// 計算總計
const total = () => {
  return Math.max(0, subtotal() - discount())
}

// 計算取餐方式文字
const orderTypeText = computed(() => {
  if (!orderInfo) return ''
  return orderInfo.type === 'dine-in' ? '🍽️ 內用' : '🏃 到店自取'
})

// 計算取餐資訊文字
const orderDetailText = computed(() => {
  if (!orderInfo) return ''
  
  if (orderInfo.type === 'dine-in') {
    // 內用：顯示桌號和時間
    const table = orderInfo.tableNumber ? `第 ${orderInfo.tableNumber} 桌` : ''
    const time = orderInfo.dineInTime || orderInfo.pickupTime
    return table + (time ? `，${time}` : '')
  } else {
    // 自取：顯示時間
    return orderInfo.pickupTime || ''
  }
})

// 送出訂單
const submitOrder = () => {
  // 先檢查購物籃是不是空的
  if (cartItems.value.length === 0) {
    alert('購物籃是空的！')
    return
  }
  
  // 跳出確認對話框
  const confirmed = confirm(`確定要送出訂單嗎？\n總金額：$${total()}`)
  
  // 如果客人按「確定」
  if (confirmed) {
    // 把訂單資料存到 localStorage（這樣下一個頁面才能拿到）
    const orderData = {
      cartItems: cartItems.value,
      subtotal: subtotal(),
      discount: discount(),
      total: total(),
      orderInfo: orderInfo,
      userName: userName.value,
      selectedCoupons: selectedCoupons.value
    }
    localStorage.setItem('orderData', JSON.stringify(orderData))
    
    // 跳轉到訂單確認頁面
    router.push('/order-confirm')
  }
}
</script>

<template>
  <div class="menu-page">
    
    <!-- ==================== 頂部區 ==================== -->
    <header class="header">
      <button class="back-btn" @click="goBack">← 返回</button>
      
      <!-- 搜尋框 -->
      <div class="search-box">
        <input 
          v-model="searchKeyword"
          type="text"
          placeholder="🔍 搜尋餐點..."
          class="search-input"
        />
      </div>
      
      <!-- 會員名稱 -->
      <div class="user-info">
        <span>👤 {{ userName }}</span>
      </div>
    </header>

    <!-- ==================== 取餐資訊顯示區 ==================== -->
    <div v-if="orderInfo" class="order-info-bar">
      <div class="order-info-text">
        {{ orderTypeText }}
        <span v-if="orderDetailText"> - {{ orderDetailText }}</span>
      </div>
    </div>

    <!-- ==================== 分類標籤 ==================== -->
    <div class="category-tabs">
      <button 
        class="category-tab"
        :class="{ active: selectedCategory === 'all' }"
        @click="selectCategory('all')"
      >
        全部
      </button>
      <button 
        class="category-tab"
        :class="{ active: selectedCategory === 'burger' }"
        @click="selectCategory('burger')"
      >
        🍔 漢堡
      </button>
      <button 
        class="category-tab"
        :class="{ active: selectedCategory === 'bagel' }"
        @click="selectCategory('bagel')"
      >
        🥯 貝果
      </button>
      <button 
        class="category-tab"
        :class="{ active: selectedCategory === 'sandwich' }"
        @click="selectCategory('sandwich')"
      >
        🥪 三明治
      </button>
    </div>

    <!-- ==================== 餐點展示區 ==================== -->
    <div class="menu-section">
      <!-- 顯示目前有多少餐點 -->
      <div class="menu-count">
        共 {{ filteredMenuItems.length }} 項餐點
      </div>
      
      <div class="menu-grid">
        <!-- 用影印機把餐點卡片複制出來 -->
        <!-- 現在是顯示過濾後的餐點 -->
        <div 
          v-for="item in filteredMenuItems" 
          :key="item.id"
          class="menu-card"
        >
          <!-- 餐點圖片 -->
          <img :src="item.image" :alt="item.name" class="menu-image" />
          
          <!-- 餐點名稱 -->
          <div class="menu-name">{{ item.name }}</div>
          
          <!-- 餐點價格 -->
          <div class="menu-price">${{ item.price }}</div>
          
          <!-- 加到購物籃按鈕 -->
          <button class="add-btn" @click="addToCart(item)">
            + 加入
          </button>
        </div>
      </div>
      
      <!-- 如果沒有符合條件的餐點 -->
      <div v-if="filteredMenuItems.length === 0" class="no-results">
        <div class="no-results-icon">🔍</div>
        <div class="no-results-text">找不到符合的餐點</div>
        <div class="no-results-hint">試試其他關鍵字或分類</div>
      </div>
    </div>

    <!-- ==================== 購物籃 ==================== -->
    <div class="cart-section" :class="{ expanded: showCart }">
      <!-- 購物籃標題 -->
      <div class="cart-header" @click="showCart = !showCart">
        <div class="cart-title">
          🛒 購物籃 ({{ totalItems() }}件)
        </div>
        <div class="cart-total">
          合計：${{ total() }}
        </div>
        <div class="cart-toggle">
          {{ showCart ? '▲ 收合' : '▼ 展開' }}
        </div>
      </div>

      <!-- 購物籃內容（展開時才顯示） -->
      <div v-if="showCart" class="cart-content">
        
        <!-- 餐點列表 -->
        <div class="cart-items">
          <div 
            v-for="item in cartItems" 
            :key="item.id"
            class="cart-item"
          >
            <div class="cart-item-info">
              <div class="cart-item-name">{{ item.name }}</div>
              <div class="cart-item-price">${{ item.price }}</div>
            </div>
            <div class="cart-item-quantity">
              <button @click="decreaseQuantity(item.id)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item.id)">+</button>
            </div>
            <button class="cart-item-remove" @click="removeFromCart(item.id)">
              🗑️
            </button>
          </div>
        </div>

        <!-- 優惠券區 -->
        <div class="coupon-section">
          <div class="coupon-header" @click="showCoupon = !showCoupon">
            🎫 優惠券
            <span class="coupon-toggle">{{ showCoupon ? '▲' : '▼' }}</span>
          </div>

          <div v-if="showCoupon" class="coupon-list">
            
            <!-- 集點卡 -->
            <div class="coupon-item">
              <div class="coupon-info">
                <div class="coupon-name">🍔 集點卡</div>
                <div class="coupon-detail">
                  目前 {{ coupons.points }} 點 / 有效至 {{ coupons.pointsExpire }}
                </div>
              </div>
              <button 
                class="coupon-btn"
                :class="{ active: selectedCoupons.points }"
                @click="selectedCoupons.points = !selectedCoupons.points"
                :disabled="coupons.points < 5"
              >
                {{ selectedCoupons.points ? '✓ 使用中' : '使用' }}
              </button>
            </div>

            <!-- 新人禮 -->
            <div class="coupon-item">
              <div class="coupon-info">
                <div class="coupon-name">🎁 新人禮</div>
                <div class="coupon-detail">
                  現折$30 / 有效至 {{ coupons.newUser30Expire }}
                </div>
              </div>
              <button 
                class="coupon-btn"
                :class="{ active: selectedCoupons.newUser30 }"
                @click="selectedCoupons.newUser30 = !selectedCoupons.newUser30"
                :disabled="!coupons.newUser30"
              >
                {{ selectedCoupons.newUser30 ? '✓ 使用中' : '使用' }}
              </button>
            </div>

            <!-- 神秘卷 -->
            <div class="coupon-item">
              <div class="coupon-info">
                <div class="coupon-name">🎲 神秘卷</div>
                <div class="coupon-detail">
                  {{ coupons.mysteryCoupon }}張 / 有效至 {{ coupons.mysteryCouponExpire }}
                </div>
              </div>
              <button 
                class="coupon-btn"
                :class="{ active: selectedCoupons.mysteryCoupon }"
                @click="selectedCoupons.mysteryCoupon = !selectedCoupons.mysteryCoupon"
                :disabled="coupons.mysteryCoupon === 0"
              >
                {{ selectedCoupons.mysteryCoupon ? '✓ 使用中' : '使用' }}
              </button>
            </div>

          </div>
        </div>

        <!-- 金額明細 -->
        <div class="order-summary">
          <div class="summary-row">
            <span>小計：</span>
            <span>${{ subtotal() }}</span>
          </div>
          <div class="summary-row discount">
            <span>優惠：</span>
            <span>-${{ discount() }}</span>
          </div>
          <div class="summary-row total">
            <span>合計：</span>
            <span>${{ total() }}</span>
          </div>
        </div>

        <!-- 取餐方式 -->
        <div v-if="orderInfo" class="order-type-display">
          {{ orderTypeText }}
          <span v-if="orderDetailText"> - {{ orderDetailText }}</span>
        </div>

        <!-- 送出訂單按鈕 -->
        <button class="submit-btn" @click="submitOrder">
          送出訂單
        </button>

      </div>
    </div>

  </div>
</template>

<style scoped>
/* ==================== 整體樣式 ==================== */
.menu-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 120px;
}

/* ==================== 頂部區 ==================== */
.header {
  background: white;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-btn {
  background: none;
  border: none;
  color: #4CAF50;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  white-space: nowrap;
}

.back-btn:hover {
  color: #45a049;
}

.search-box {
  flex: 1;
  max-width: 60%;
}

.search-input {
  width: 100%;
  padding: 10px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 20px;
  font-size: 16px;
}

.search-input:focus {
  outline: none;
  border-color: #4CAF50;
}

.user-info {
  font-size: 16px;
  color: #333;
  white-space: nowrap;
}

/* ==================== 取餐資訊顯示區 ==================== */
.order-info-bar {
  background: #e3f2fd;
  padding: 15px 20px;
  text-align: center;
  font-weight: bold;
  color: #1976d2;
}

.order-info-text {
  font-size: 16px;
}

/* ==================== 分類標籤 ==================== */
.category-tabs {
  display: flex;
  gap: 10px;
  padding: 15px 20px;
  overflow-x: auto;
  background: white;
  margin-bottom: 10px;
}

.category-tab {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background: #f0f0f0;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s;
}

.category-tab.active {
  background: #333;
  color: white;
}

/* ==================== 餐點展示區 ==================== */
.menu-section {
  padding: 20px;
}

.menu-count {
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 15px;
}

.menu-card {
  background: white;
  border-radius: 15px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.menu-card:hover {
  transform: translateY(-5px);
}

.menu-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

.menu-name {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  min-height: 40px;
}

.menu-price {
  font-size: 18px;
  color: #4CAF50;
  font-weight: bold;
  margin-bottom: 10px;
}

.add-btn {
  width: 100%;
  padding: 10px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background 0.3s;
}

.add-btn:hover {
  background: #45a049;
}

/* ==================== 無結果顯示 ==================== */
.no-results {
  text-align: center;
  padding: 60px 20px;
}

.no-results-icon {
  font-size: 60px;
  margin-bottom: 20px;
}

.no-results-text {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.no-results-hint {
  font-size: 14px;
  color: #666;
}

/* ==================== 購物籃 ==================== */
.cart-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  border-radius: 20px 20px 0 0;
  z-index: 200;
}

.cart-header {
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.cart-title {
  font-size: 18px;
  font-weight: bold;
}

.cart-total {
  color: #4CAF50;
  font-weight: bold;
  font-size: 18px;
}

.cart-toggle {
  color: #999;
  font-size: 14px;
}

.cart-content {
  max-height: 50vh;
  overflow-y: auto;
  padding: 0 20px 20px;
}

.cart-items {
  border-top: 1px solid #eee;
  padding: 15px 0;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item-info {
  flex: 1;
}

.cart-item-name {
  font-size: 14px;
  font-weight: bold;
}

.cart-item-price {
  color: #666;
  font-size: 14px;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-item-quantity button {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
  cursor: pointer;
}

.cart-item-quantity span {
  font-weight: bold;
  min-width: 20px;
  text-align: center;
}

.cart-item-remove {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}

/* ==================== 優惠券 ==================== */
.coupon-section {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  margin: 15px 0;
}

.coupon-header {
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.coupon-list {
  margin-top: 15px;
}

.coupon-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  border-radius: 8px;
  margin-bottom: 10px;
}

.coupon-name {
  font-weight: bold;
  font-size: 14px;
}

.coupon-detail {
  font-size: 12px;
  color: #666;
}

.coupon-btn {
  padding: 8px 15px;
  border: 1px solid #4CAF50;
  border-radius: 20px;
  background: white;
  color: #4CAF50;
  cursor: pointer;
  font-size: 12px;
}

.coupon-btn.active {
  background: #4CAF50;
  color: white;
}

.coupon-btn:disabled {
  border-color: #ddd;
  color: #ddd;
  cursor: not-allowed;
}

/* ==================== 金額明細 ==================== */
.order-summary {
  border-top: 1px solid #eee;
  padding-top: 15px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.summary-row.discount {
  color: #4CAF50;
}

.summary-row.total {
  font-size: 18px;
  font-weight: bold;
  border-top: 1px solid #eee;
  padding-top: 10px;
  margin-top: 5px;
}

/* ==================== 取餐方式顯示 ==================== */
.order-type-display {
  text-align: center;
  padding: 15px;
  background: #f0f0f0;
  border-radius: 10px;
  margin: 15px 0;
  font-weight: bold;
}

/* ==================== 送出按鈕 ==================== */
.submit-btn {
  width: 100%;
  padding: 15px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

.submit-btn:hover {
  background: #45a049;
}
</style>
