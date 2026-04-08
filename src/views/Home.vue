<script setup lang="ts">
import { ref, computed } from 'vue'

// ==================== 放資料的盒子 ====================

// 放一個叫 isDineIn 的盒子，預設是 true（內用模式）
// 如果是 false 就是自取模式
const isDineIn = ref(true)

// 放一個叫 dineInTime 的盒子，裝內用預計時間
// 預設是空字串（還沒選時間）
const dineInTime = ref('')

// 放一個叫 pickupTime 的盒子，裝自取預計時間
// 預設是空字串（還沒選時間）
const pickupTime = ref('')

// 放一個叫 tableNumber 的盒子，裝內用桌號
// 預設是空字串（還沒選桌號）
const tableNumber = ref('')

// 放一個叫 showTimePicker 的盒子，預設是 false（時間選擇器收合）
const showTimePicker = ref(false)

// 放一個叫 showTablePicker 的盒子，預設是 false（桌號選擇器收合）
const showTablePicker = ref(false)

// 計算目前的取餐方式文字
// 如果是內用就顯示「內用」，否則顯示「到店自取」
const orderTypeText = computed(() => {
  return isDineIn.value ? '🍽️ 內用' : '🏃 到店自取'
})

// 計算顯示的時間文字
// 如果有選時間就顯示，否則顯示「尚未選擇」
const dineInTimeText = computed(() => {
  return dineInTime.value ? dineInTime.value : '尚未選擇'
})

const pickupTimeText = computed(() => {
  return pickupTime.value ? pickupTime.value : '尚未選擇'
})

// 計算顯示的桌號文字
// 如果有選桌號就顯示「第X桌」，否則顯示「尚未選擇」
const tableNumberText = computed(() => {
  return tableNumber.value ? `第 ${tableNumber.value} 桌` : '尚未選擇'
})

// ==================== 服務生函數 ====================

// 切換到內用模式
// 按下去後會把 isDineIn 盒子設成 true
const switchToDineIn = () => {
  // 把模式切換成內用
  isDineIn.value = true
  
  // 收合時間選擇器
  showTimePicker.value = false
  
  // 收合桌號選擇器
  showTablePicker.value = false
}

// 切換到自取模式
// 按下去後會把 isDineIn 盒子設成 false
const switchToPickup = () => {
  // 把模式切換成自取
  isDineIn.value = false
  
  // 收合時間選擇器
  showTimePicker.value = false
  
  // 收合桌號選擇器
  showTablePicker.value = false
}

// 展開時間選擇器
// 這個函數用來打開時間選擇的小視窗
const openTimePicker = () => {
  // 把時間選擇器打開
  showTimePicker.value = true
  
  // 如果是內用就打開桌號選擇器
  // 如果是自取就打開取餐時間選擇器
  if (isDineIn.value) {
    showTablePicker.value = true
  }
}

// 展開取餐時間選擇器
// 這個函數用來打開取餐時間選擇的小視窗
const openPickupTimePicker = () => {
  showTimePicker.value = true
}

// 選擇內用時間
// 把選到的時間放進 dineInTime 盒子
const selectDineInTime = (time: string) => {
  // 把時間放進盒子
  dineInTime.value = time
  
  // 關閉時間選擇器
  showTimePicker.value = false
}

// 選擇取餐時間
// 把選到的時間放進 pickupTime 盒子
const selectPickupTime = (time: string) => {
  // 把時間放進盒子
  pickupTime.value = time
  
  // 關閉時間選擇器
  showTimePicker.value = false
}

// 選擇桌號
// 把選到的桌號放進 tableNumber 盒子
const selectTable = (table: string) => {
  // 把桌號放進盒子
  tableNumber.value = table
  
  // 關閉桌號選擇器
  showTablePicker.value = false
}

// 關閉所有選擇器
// 這個函數用來把時間和桌號選擇器都收起來
const closeAllPickers = () => {
  // 把時間選擇器關起來
  showTimePicker.value = false
  
  // 把桌號選擇器關起來
  showTablePicker.value = false
}

// 放一個叫 searchKeyword 的盒子，裝搜尋關鍵字
const searchKeyword = ref('')

// 放一個叫 selectedCategory 的盒子，裝目前選的分類
// 預設是 'all'（全部）
const selectedCategory = ref('all')

// 放一個叫 cartItems 的盒子，裝購物籃裡的東西
// 一開始是空的
const cartItems = ref([
  { id: 1, name: '培根雞蛋堡', price: 70, quantity: 1 },
  { id: 2, name: '火腿蛋三明治', price: 65, quantity: 2 }
])

// 放一個叫 showCart 的盒子，預設是 false（購物籃收合）
const showCart = ref(false)

// 放一個叫 showCoupon 的盒子，預設是 false（優惠券收合）
const showCoupon = ref(false)

// 放一個叫 userName 的盒子，裝會員名字
const userName = ref('小明')

// 優惠券資料
const coupons = ref({
  points: 3,              // 集點卡：目前有3點
  pointsExpire: '2026/7/9',  // 集點卡：有效期限
  newUser30: true,       // 新人禮：現折$30（true = 還沒用）
  newUser30Expire: '2026/4/12',  // 新人禮：有效期限
  newUserFreeShip: true, // 新人禮：免運費（true = 還沒用）
  mysteryCoupon: 2,      // 神秘卷：目前有2張
  mysteryCouponExpire: '2026/5/9'  // 神秘卷：有效期限
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

// ==================== 計算屬性（算錢用的） ====================

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

// 送出訂單
const submitOrder = () => {
  if (cartItems.value.length === 0) {
    alert('購物籃是空的！')
    return
  }
  alert(`訂單已送出！總金額：$${total()}`)
}
</script>

<template>
  <div class="home-page">
    
    <!-- ==================== 頂部區 ==================== -->
    <header class="header">
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

    <!-- ==================== 取餐方式 ==================== -->
    <!-- 這是一個大區塊，用來讓使用者選擇要內用還是自取 -->
    <div class="order-type-section">
      
      <!-- 內用按鈕 -->
      <!-- 如果 isDineIn 是 true，這個按鈕就會變成綠色（active） -->
      <button 
        class="order-type-btn"
        :class="{ active: isDineIn }"
        @click="switchToDineIn"
      >
        <!-- 按鈕裡面顯示一個盤子圖示和「內用」文字 -->
        🍽️ 內用
      </button>
      
      <!-- 自取按鈕 -->
      <!-- 如果 isDineIn 是 false，這個按鈕就會變成綠色（active） -->
      <button 
        class="order-type-btn"
        :class="{ active: !isDineIn }"
        @click="switchToPickup"
      >
        <!-- 按鈕裡面顯示一個人跑步的圖示和「到店自取」文字 -->
        🏃 到店自取
      </button>
    </div>

    <!-- ==================== 取餐資訊填寫區 ==================== -->
    <!-- 這裡根據選擇的模式顯示不同的輸入框 -->
    <div class="order-info-section">
      
      <!-- 如果選擇內用，就顯示這個區塊 -->
      <div v-if="isDineIn" class="info-card">
        
        <!-- 內用標題 -->
        <div class="info-card-header">
          <!-- 顯示一個盤子圖示和「內用資訊」文字 -->
          🍽️ 內用資訊
        </div>
        
        <!-- 內用內容 -->
        <div class="info-card-content">
          
          <!-- 桌號選擇區 -->
          <div class="info-row">
            <!-- 左邊顯示「桌號：」標籤 -->
            <div class="info-label">桌號：</div>
            
            <!-- 右邊顯示目前選的桌號或是「尚未選擇」 -->
            <div 
              class="info-value clickable"
              @click="openTimePicker"
            >
              <!-- 如果有選桌號就顯示「第X桌」，否則顯示「尚未選擇」 -->
              {{ tableNumberText }}
              
              <!-- 旁邊顯示一個小箭頭，表示可以點擊 -->
              <span class="arrow">▼</span>
            </div>
          </div>
          
          <!-- 預計時間選擇區 -->
          <div class="info-row">
            <!-- 左邊顯示「預計時間：」標籤 -->
            <div class="info-label">預計時間：</div>
            
            <!-- 右邊顯示目前選的時間或是「尚未選擇」 -->
            <div 
              class="info-value clickable"
              @click="openPickupTimePicker"
            >
              <!-- 呼叫 dineInTimeText 盒子，顯示時間文字 -->
              {{ dineInTimeText }}
              
              <!-- 旁邊顯示一個小箭頭，表示可以點擊 -->
              <span class="arrow">▼</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 如果選擇自取，就顯示這個區塊 -->
      <div v-else class="info-card">
        
        <!-- 自取標題 -->
        <div class="info-card-header">
          <!-- 顯示一個跑步圖示和「自取資訊」文字 -->
          🏃 自取資訊
        </div>
        
        <!-- 自取內容 -->
        <div class="info-card-content">
          
          <!-- 取餐時間選擇區 -->
          <div class="info-row">
            <!-- 左邊顯示「取餐時間：」標籤 -->
            <div class="info-label">取餐時間：</div>
            
            <!-- 右邊顯示目前選的時間或是「尚未選擇」 -->
            <div 
              class="info-value clickable"
              @click="openPickupTimePicker"
            >
              <!-- 呼叫 pickupTimeText 盒子，顯示時間文字 -->
              {{ pickupTimeText }}
              
              <!-- 旁邊顯示一個小箭頭，表示可以點擊 -->
              <span class="arrow">▼</span>
            </div>
          </div>
          
          <!-- 提醒文字 -->
          <div class="info-reminder">
            <!-- 顯示一個時鐘圖示和提醒文字 -->
            ⏰ 請於選擇的時間到店取餐
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== 桌號/時間選擇器彈窗 ==================== -->
    <!-- 當 showTimePicker 是 true 的時候，這個黑色半透明背景會出現 -->
    <div v-if="showTimePicker" class="picker-overlay" @click="closeAllPickers">
      
      <!-- 這個是真正的選擇器視窗（.stop 是阻止點擊穿透） -->
      <div class="picker-modal" @click.stop>
        
        <!-- 選擇器的標題 -->
        <div class="picker-title">
          <!-- 根據是內用還是自取，顯示不同的標題 -->
          {{ isDineIn ? '📋 請選擇桌號' : '⏰ 請選擇取餐時間' }}
        </div>
        
        <!-- 選擇器的內容區域 -->
        <div class="picker-content">
          
          <!-- 如果是內用模式，就顯示桌號選擇 -->
          <div v-if="isDineIn">
            <!-- 這是一個網格，用來排列桌號按鈕 -->
            <div class="table-grid">
              <!-- 用影印機印出 1-12 的桌號按鈕 -->
              <button 
                v-for="table in 12" 
                :key="table"
                class="table-btn"
                :class="{ active: tableNumber === String(table) }"
                @click="selectTable(String(table))"
              >
                {{ table }}
              </button>
            </div>
          </div>
          
          <!-- 如果是自取模式，就顯示時間選擇 -->
          <div v-else>
            <!-- 這是一個網格，用來排列時間按鈕 -->
            <div class="time-grid">
              <!-- 用影印機印出 6:00 到 12:00 的時間按鈕 -->
              <button 
                v-for="time in ['6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00']" 
                :key="time"
                class="time-btn"
                :class="{ active: pickupTime === time }"
                @click="selectPickupTime(time)"
              >
                {{ time }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- 選擇器的取消按鈕 -->
        <button class="picker-cancel" @click="closeAllPickers">
          取消
        </button>
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
      <div class="menu-grid">
        <!-- 用影印機把餐點卡片複制出來 -->
        <div 
          v-for="item in menuItems" 
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
        <div class="order-type-display">
          <!-- 根據 isDineIn 盒子顯示不同的文字 -->
          <!-- 如果是內用就顯示「🍽️ 內用」，否則顯示「🏃 到店自取」 -->
          {{ orderTypeText }}
          
          <!-- 如果有選桌號，就顯示桌號 -->
          <span v-if="isDineIn && tableNumber">
            <!-- 顯示「第X桌」 -->
            - {{ tableNumberText }}
          </span>
          
          <!-- 如果有選時間，就顯示時間 -->
          <span v-if="(isDineIn && dineInTime) || (!isDineIn && pickupTime)">
            <!-- 顯示「，XX:XX」 -->
            ，{{ isDineIn ? dineInTime : pickupTime }}
          </span>
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
.home-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 120px;
}

/* ==================== 頂部區 ==================== */
.header {
  background: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
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
  margin-left: 15px;
}

/* ==================== 取餐方式 ==================== */
/* 這是取餐方式的大區塊 */
.order-type-section {
  /* 用彈性盒子讓兩個按鈕排在一起 */
  display: flex;
  /* 按鈕之間的距離 */
  gap: 15px;
  /* 上下留白 */
  padding: 20px;
  /* 內容置中 */
  justify-content: center;
  /* 背景是白色 */
  background: white;
  /* 下面留一點空間 */
  margin-bottom: 10px;
}

/* 這是內用和自取按鈕的共同樣式 */
.order-type-btn {
  /* 調整大小和間距 */
  padding: 15px 30px;
  /* 邊框是灰色的 */
  border: 2px solid #ddd;
  /* 圓角 */
  border-radius: 15px;
  /* 字體大小 */
  font-size: 16px;
  /* 指標變成手指頭 */
  cursor: pointer;
  /* 背景是白色 */
  background: white;
  /* 動畫效果（改變背景色時會平滑過渡） */
  transition: all 0.3s;
}

/* 這是選中的按鈕（active）的特殊樣式 */
.order-type-btn.active {
  /* 背景變成綠色 */
  background: #4CAF50;
  /* 文字變成白色 */
  color: white;
  /* 邊框也變成綠色 */
  border-color: #4CAF50;
}

/* ==================== 取餐資訊區 ==================== */
/* 這是取餐資訊填寫區的大區塊 */
.order-info-section {
  /* 上下留白 */
  margin: 10px 20px;
}

/* 這是資訊卡（顯示內用或自取資訊的白色卡片） */
.info-card {
  /* 背景是白色 */
  background: white;
  /* 圓角 */
  border-radius: 15px;
  /* 陰影效果 */
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  /* 內容不超過這個範圍 */
  overflow: hidden;
}

/* 這是資訊卡的標題區（藍色那一行） */
.info-card-header {
  /* 背景是淺藍色 */
  background: #e3f2fd;
  /* 文字大小 */
  font-size: 16px;
  /* 粗體 */
  font-weight: bold;
  /* 上下留白 */
  padding: 15px;
  /* 文字置中 */
  text-align: center;
  /* 文字顏色 */
  color: #1976d2;
}

/* 這是資訊卡的內容區 */
.info-card-content {
  /* 裡面留白 */
  padding: 20px;
}

/* 這是每一列（標籤+值） */
.info-row {
  /* 用彈性盒子讓標籤和值排在一起 */
  display: flex;
  /* 讓值靠右對齊 */
  justify-content: space-between;
  /* 上下留白 */
  margin-bottom: 15px;
}

/* 這是標籤（像「桌號：」「預計時間：」） */
.info-label {
  /* 粗體 */
  font-weight: bold;
  /* 文字顏色 */
  color: #333;
}

/* 這是值（像「第5桌」「尚未選擇」） */
.info-value {
  /* 文字顏色 */
  color: #666;
}

/* 這是可以點擊的值（鼠標會變成手指頭） */
.info-value.clickable {
  /* 指標變成手指頭 */
  cursor: pointer;
  /* 加上動畫效果 */
  transition: color 0.3s;
}

/* 當滑鼠移到可點擊的值上時 */
.info-value.clickable:hover {
  /* 文字變成綠色 */
  color: #4CAF50;
}

/* 這是小箭頭（▼）的樣式 */
.arrow {
  /* 讓箭頭和文字有一點距離 */
  margin-left: 5px;
  /* 箭頭小一點 */
  font-size: 12px;
}

/* 這是提醒文字（像「請於選擇的時間到店取餐」） */
.info-reminder {
  /* 背景是淡黃色 */
  background: #fff8e1;
  /* 圓角 */
  border-radius: 10px;
  /* 上下留白 */
  padding: 15px;
  /* 文字置中 */
  text-align: center;
  /* 文字顏色 */
  color: #f57c00;
  /* 字體大小 */
  font-size: 14px;
}

/* ==================== 選擇器彈窗 ==================== */
/* 這是黑色的半透明背景（覆蓋層） */
.picker-overlay {
  /* 固定在螢幕上 */
  position: fixed;
  /* 充滿整個螢幕 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* 半透明黑色背景 */
  background: rgba(0,0,0,0.5);
  /* 讓這個在最上層 */
  z-index: 1000;
  /* 內容置中 */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 這是選擇器的白色彈窗 */
.picker-modal {
  /* 背景是白色 */
  background: white;
  /* 寬度最大 90% */
  width: 90%;
  /* 最大寬度 350px */
  max-width: 350px;
  /* 圓角 */
  border-radius: 20px;
  /* 裡面留白 */
  padding: 25px;
  /* 動畫效果 */
  transition: transform 0.3s;
}

/* 這是選擇器的標題 */
.picker-title {
  /* 粗體 */
  font-weight: bold;
  /* 文字大小 */
  font-size: 18px;
  /* 置中 */
  text-align: center;
  /* 下面留白 */
  margin-bottom: 20px;
}

/* 這是選擇器的內容區 */
.picker-content {
  /* 下面留白 */
  margin-bottom: 20px;
}

/* 這是桌號的網格 */
.table-grid {
  /* 用 CSS Grid 排版 */
  display: grid;
  /* 每行放 4 個 */
  grid-template-columns: repeat(4, 1fr);
  /* 按鈕之間的距離 */
  gap: 10px;
}

/* 這是桌號按鈕 */
.table-btn {
  /* 調整大小 */
  padding: 15px;
  /* 邊框 */
  border: 2px solid #ddd;
  /* 圓角 */
  border-radius: 10px;
  /* 背景 */
  background: white;
  /* 字體大小 */
  font-size: 16px;
  /* 粗體 */
  font-weight: bold;
  /* 手指頭指標 */
  cursor: pointer;
  /* 動畫效果 */
  transition: all 0.3s;
}

/* 當滑鼠移到桌號按鈕上時 */
.table-btn:hover {
  /* 背景變成淺綠色 */
  background: #e8f5e9;
  /* 邊框變成綠色 */
  border-color: #4CAF50;
}

/* 選中的桌號按鈕 */
.table-btn.active {
  /* 背景變成綠色 */
  background: #4CAF50;
  /* 文字變成白色 */
  color: white;
  /* 邊框也變成綠色 */
  border-color: #4CAF50;
}

/* 這是時間的網格 */
.time-grid {
  /* 用 CSS Grid 排版 */
  display: grid;
  /* 每行放 3 個 */
  grid-template-columns: repeat(3, 1fr);
  /* 按鈕之間的距離 */
  gap: 10px;
}

/* 這是時間按鈕 */
.time-btn {
  /* 調整大小 */
  padding: 12px;
  /* 邊框 */
  border: 2px solid #ddd;
  /* 圓角 */
  border-radius: 10px;
  /* 背景 */
  background: white;
  /* 字體大小 */
  font-size: 14px;
  /* 粗體 */
  font-weight: bold;
  /* 手指頭指標 */
  cursor: pointer;
  /* 動畫效果 */
  transition: all 0.3s;
}

/* 當滑鼠移到時間按鈕上時 */
.time-btn:hover {
  /* 背景變成淺綠色 */
  background: #e8f5e9;
  /* 邊框變成綠色 */
  border-color: #4CAF50;
}

/* 選中的時間按鈕 */
.time-btn.active {
  /* 背景變成綠色 */
  background: #4CAF50;
  /* 文字變成白色 */
  color: white;
  /* 邊框也變成綠色 */
  border-color: #4CAF50;
}

/* 這是選擇器的取消按鈕 */
.picker-cancel {
  /* 寬度 100% */
  width: 100%;
  /* 調整大小 */
  padding: 12px;
  /* 背景是淺灰色 */
  background: #f5f5f5;
  /* 沒有邊框 */
  border: none;
  /* 圓角 */
  border-radius: 10px;
  /* 字體大小 */
  font-size: 16px;
  /* 粗體 */
  font-weight: bold;
  /* 文字顏色 */
  color: #666;
  /* 手指頭指標 */
  cursor: pointer;
  /* 動畫效果 */
  transition: all 0.3s;
}

/* 當滑鼠移到取消按鈕上時 */
.picker-cancel:hover {
  /* 背景變成深灰色 */
  background: #e0e0e0;
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
