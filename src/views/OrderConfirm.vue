<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 引入 router（像借一台導航機）
const router = useRouter()

// ==================== 放資料的盒子 ====================

// 放一個叫 step 的盒子，用來記錄目前在哪一步
// 'payment' = 選擇支付方式，'success' = 訂單完成
const step = ref('payment')

// 放一個叫 orderNumber 的盒子，用來裝訂單編號
const orderNumber = ref('')

// 放一個叫 paymentMethod 的盒子，用來裝選擇的支付方式
const paymentMethod = ref('')

// 放一個叫 cartItems 的盒子，用來裝購物籃的東西
const cartItems = ref<Array<{id: number, name: string, price: number, quantity: number}>>([])

// 放一個叫 subtotal 的盒子，用來裝小計
const subtotal = ref(0)

// 放一個叫 discount 的盒子，用來裝優惠金額
const discount = ref(0)

// 放一個叫 total 的盒子，用來裝總計
const total = ref(0)

// 放一個叫 orderInfo 的盒子，用來裝取餐資訊
const orderInfo = ref<{type: string, tableNumber?: string, dineInTime?: string, pickupTime?: string} | null>(null)

// 放一個叫 userName 的盒子，用來裝會員名字
const userName = ref('訪客')

// 放一個叫 selectedCoupons 的盒子，用來裝使用的優惠券
const selectedCoupons = ref({
  points: false,
  newUser30: false,
  mysteryCoupon: false
})

// 放一個叫 coupons 的盒子，用來裝優惠券資料
const coupons = ref({
  points: 3,
  newUser30: true,
  mysteryCoupon: 2
})

// ==================== 服務生函數 ====================

// 選擇支付方式
const selectPayment = (method: string) => {
  paymentMethod.value = method
  step.value = 'success'
  
  // 生成訂單編號
  generateOrderNumber()
  
  // 把訂單資料存到 localStorage
  saveOrder()
}

// 生成訂單編號（3位數字）
const generateOrderNumber = () => {
  // 產生 100 到 999 的隨機三位數
  orderNumber.value = String(Math.floor(Math.random() * 900) + 100)
}

// 把訂單資料存到 localStorage
const saveOrder = () => {
  // 建立訂單資料
  const orderData = {
    orderNumber: orderNumber.value,
    orderInfo: orderInfo.value,
    cartItems: cartItems.value,
    subtotal: subtotal.value,
    discount: discount.value,
    total: total.value,
    paymentMethod: paymentMethod.value,
    userName: userName.value,
    createdAt: new Date().toISOString()
  }
  
  // 從 localStorage 讀取現有的訂單
  const ordersJson = localStorage.getItem('orders')
  const orders = ordersJson ? JSON.parse(ordersJson) : []
  
  // 把新訂單加進去
  orders.push(orderData)
  
  // 存回 localStorage
  localStorage.setItem('orders', JSON.stringify(orders))
  
  // 清除購物籃
  localStorage.removeItem('cartItems')
  
  // 扣除優惠券
  if (selectedCoupons.value.points && coupons.value.points >= 5) {
    coupons.value.points -= 5
  }
  if (selectedCoupons.value.newUser30) {
    coupons.value.newUser30 = false
  }
  if (selectedCoupons.value.mysteryCoupon && coupons.value.mysteryCoupon > 0) {
    coupons.value.mysteryCoupon -= 1
  }
  localStorage.setItem('coupons', JSON.stringify(coupons.value))
}

// 返回首頁
const goToHome = () => {
  router.push('/order-type')
}

// ==================== 頁面載入時 ====================

onMounted(() => {
  // 從 localStorage 讀取訂單資料
  const orderDataJson = localStorage.getItem('orderData')
  if (orderDataJson) {
    const orderData = JSON.parse(orderDataJson)
    cartItems.value = orderData.cartItems || []
    subtotal.value = orderData.subtotal || 0
    discount.value = orderData.discount || 0
    total.value = orderData.total || 0
    orderInfo.value = orderData.orderInfo || null
    userName.value = orderData.userName || '訪客'
    selectedCoupons.value = orderData.selectedCoupons || {
      points: false,
      newUser30: false,
      mysteryCoupon: false
    }
  }
})
</script>

<template>
  <div class="confirm-page">
    
    <!-- ==================== 步驟 1：選擇支付方式 ==================== -->
    <div v-if="step === 'payment'" class="step-content">
      <h2 class="step-title">請選擇支付方式</h2>
      
      <div class="payment-options">
        <!-- 信用卡選項 -->
        <div class="payment-card" @click="selectPayment('credit-card')">
          <div class="payment-icon">💳</div>
          <div class="payment-title">信用卡</div>
          <div class="payment-desc">使用信用卡快速付款</div>
        </div>
        
        <!-- 現場支付選項 -->
        <div class="payment-card" @click="selectPayment('cash')">
          <div class="payment-icon">💵</div>
          <div class="payment-title">現場支付</div>
          <div class="payment-desc">到店後再付款</div>
        </div>
      </div>
    </div>

    <!-- ==================== 步驟 2：訂單完成 ==================== -->
    <div v-if="step === 'success'" class="step-content">
      <!-- 成功標誌 -->
      <div class="success-icon">✓</div>
      
      <!-- 成功標題 -->
      <h2 class="success-title">訂單已完成！</h2>
      
      <!-- 訂單編號卡片 -->
      <div class="order-number-card">
        <div class="order-number-label">您的訂單編號</div>
        <div class="order-number">{{ orderNumber }}</div>
        <div class="order-number-hint">請牢記此編號，方便取餐時出示</div>
      </div>
      
      <!-- 訂單摘要 -->
      <div class="order-summary">
        <div class="summary-row">
          <span>會員：</span>
          <span>{{ userName }}</span>
        </div>
        <div class="summary-row">
          <span>取餐方式：</span>
          <span>{{ orderInfo?.type === 'dine-in' ? '🍽️ 內用' : '🏃 到店自取' }}</span>
        </div>
        <div class="summary-row">
          <span>支付方式：</span>
          <span>{{ paymentMethod === 'credit-card' ? '💳 信用卡' : '💵 現場支付' }}</span>
        </div>
        <div class="summary-row total">
          <span>總金額：</span>
          <span>${{ total }}</span>
        </div>
      </div>
      
      <!-- 餐點列表 -->
      <div class="order-items">
        <div class="items-title">餐點明細</div>
        <div 
          v-for="item in cartItems" 
          :key="item.id"
          class="order-item"
        >
          <span class="item-name">{{ item.name }} x{{ item.quantity }}</span>
          <span class="item-price">${{ item.price * item.quantity }}</span>
        </div>
      </div>
      
      <!-- 取餐資訊 -->
      <div v-if="orderInfo" class="pickup-info">
        <div class="pickup-title">取餐資訊</div>
        <div v-if="orderInfo.type === 'dine-in'">
          <div>桌號：第 {{ orderInfo.tableNumber }} 桌</div>
          <div v-if="orderInfo.dineInTime">預計到達：{{ orderInfo.dineInTime }}</div>
        </div>
        <div v-else>
          <div>取餐時間：{{ orderInfo.pickupTime }}</div>
        </div>
      </div>
      
      <!-- 返回按鈕 -->
      <button class="home-btn" @click="goToHome">
        返回首頁
      </button>
    </div>

  </div>
</template>

<style scoped>
/* ==================== 整體樣式 ==================== */
.confirm-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
}

/* ==================== 步驟內容 ==================== */
.step-content {
  max-width: 500px;
  margin: 0 auto;
}

.step-title {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
}

/* ==================== 支付方式選擇 ==================== */
.payment-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.payment-card {
  background: white;
  border-radius: 20px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 3px solid transparent;
}

.payment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  border-color: #4CAF50;
}

.payment-icon {
  font-size: 60px;
  margin-bottom: 15px;
}

.payment-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.payment-desc {
  font-size: 14px;
  color: #666;
}

/* ==================== 訂單完成 ==================== */
.success-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #4CAF50;
  color: white;
  font-size: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.success-title {
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
}

/* 訂單編號卡片 */
.order-number-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  color: white;
  margin-bottom: 30px;
}

.order-number-label {
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 15px;
}

.order-number {
  font-size: 72px;
  font-weight: bold;
  letter-spacing: 10px;
  margin-bottom: 15px;
}

.order-number-hint {
  font-size: 14px;
  opacity: 0.8;
}

/* 訂單摘要 */
.order-summary {
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  font-size: 16px;
}

.summary-row:last-child {
  border-bottom: none;
}

.summary-row.total {
  font-size: 20px;
  font-weight: bold;
  color: #4CAF50;
  border-top: 2px solid #4CAF50;
  margin-top: 10px;
  padding-top: 15px;
}

/* 餐點列表 */
.order-items {
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.items-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #4CAF50;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.order-item:last-child {
  border-bottom: none;
}

.item-name {
  color: #333;
}

.item-price {
  color: #666;
  font-weight: bold;
}

/* 取餐資訊 */
.pickup-info {
  background: #e3f2fd;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.pickup-title {
  font-size: 18px;
  font-weight: bold;
  color: #1976d2;
  margin-bottom: 10px;
}

.pickup-info div {
  color: #333;
  padding: 5px 0;
}

/* 返回按鈕 */
.home-btn {
  width: 100%;
  padding: 18px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.home-btn:hover {
  background: #45a049;
}
</style>
