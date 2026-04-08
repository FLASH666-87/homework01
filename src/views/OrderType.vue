<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 引入 router（像借一台導航機）
const router = useRouter()

// 放一個叫 orderType 的盒子，預設是空的（還沒選）
// 'dine-in' = 內用，'pickup' = 自取
const orderType = ref('')

// 放一個叫 tableNumber 的盒子，裝內用桌號
// 預設是空字串（還沒選桌號）
const tableNumber = ref('')

// 放一個叫 dineInTime 的盒子，裝內用預計到達時間
// 預設是空字串（還沒選時間）
const dineInTime = ref('')

// 放一個叫 pickupTime 的盒子，裝自取取餐時間
// 預設是空字串（還沒選時間）
const pickupTime = ref('')

// 放一個叫 showTablePicker 的盒子，預設是 false（桌號選擇器收合）
const showTablePicker = ref(false)

// 放一個叫 showDineInTimePicker 的盒子，預設是 false（內用時間選擇器收合）
const showDineInTimePicker = ref(false)

// 放一個叫 showPickupTimePicker 的盒子，預設是 false（自取時間選擇器收合）
const showPickupTimePicker = ref(false)

// 放一個叫 step 的盒子，用來記錄目前在哪一步
// 1 = 選擇內用/自取，2 = 填寫資訊
const step = ref(1)

// 放一個叫 errorMessage 的盒子，用來顯示錯誤訊息
const errorMessage = ref('')

// 選擇內用模式
const selectDineIn = () => {
  orderType.value = 'dine-in'
  step.value = 2
  errorMessage.value = ''
}

// 選擇自取模式
const selectPickup = () => {
  orderType.value = 'pickup'
  step.value = 2
  errorMessage.value = ''
}

// 返回上一步
const goBack = () => {
  step.value = 1
  orderType.value = ''
  errorMessage.value = ''
  closeAllPickers()
}

// 展開桌號選擇器
const openTablePicker = () => {
  showTablePicker.value = true
}

// 展開內用時間選擇器
const openDineInTimePicker = () => {
  showDineInTimePicker.value = true
}

// 展開自取時間選擇器
const openPickupTimePicker = () => {
  showPickupTimePicker.value = true
}

// 選擇桌號
const selectTable = (table: string) => {
  tableNumber.value = table
  showTablePicker.value = false
}

// 選擇內用預計到達時間
const selectDineInTime = (time: string) => {
  dineInTime.value = time
  showDineInTimePicker.value = false
}

// 選擇自取取餐時間
const selectPickupTime = (time: string) => {
  pickupTime.value = time
  showPickupTimePicker.value = false
}

// 關閉所有選擇器
const closeAllPickers = () => {
  showTablePicker.value = false
  showDineInTimePicker.value = false
  showPickupTimePicker.value = false
}

// 繼續到主選單
const goToMenu = () => {
  // 檢查有沒有填寫必填資訊
  if (orderType.value === 'dine-in') {
    // 內用模式：至少要選桌號
    if (!tableNumber.value) {
      errorMessage.value = '請選擇桌號'
      return
    }
  } else {
    // 自取模式：至少要選時間
    if (!pickupTime.value) {
      errorMessage.value = '請選擇取餐時間'
      return
    }
  }
  
  // 把取餐資訊存到 localStorage
  const orderInfo = {
    type: orderType.value,
    tableNumber: tableNumber.value,
    dineInTime: dineInTime.value,
    pickupTime: pickupTime.value
  }
  localStorage.setItem('orderInfo', JSON.stringify(orderInfo))
  
  // 跳轉到主選單
  router.push('/menu')
}

// 計算顯示的桌號文字
const tableNumberText = () => {
  return tableNumber.value ? `第 ${tableNumber.value} 桌` : '尚未選擇'
}

// 計算顯示的內用時間文字
const dineInTimeText = () => {
  return dineInTime.value ? dineInTime.value : '尚未選擇'
}

// 計算顯示的自取時間文字
const pickupTimeText = () => {
  return pickupTime.value ? pickupTime.value : '尚未選擇'
}
</script>

<template>
  <div class="order-type-page">
    
    <!-- ==================== 步驟指示器 ==================== -->
    <div class="step-indicator">
      <div class="step" :class="{ active: step >= 1, completed: step > 1 }">
        <div class="step-number">1</div>
        <div class="step-text">選擇方式</div>
      </div>
      <div class="step-line" :class="{ active: step > 1 }"></div>
      <div class="step" :class="{ active: step >= 2 }">
        <div class="step-number">2</div>
        <div class="step-text">填寫資訊</div>
      </div>
      <div class="step-line" :class="{ active: step > 2 }"></div>
      <div class="step" :class="{ active: step >= 3 }">
        <div class="step-number">3</div>
        <div class="step-text">選擇餐點</div>
      </div>
    </div>

    <!-- ==================== 步驟 1：選擇內用或自取 ==================== -->
    <div v-if="step === 1" class="step-content">
      <h2 class="step-title">請選擇取餐方式</h2>
      
      <div class="option-cards">
        <!-- 內用選項 -->
        <div class="option-card" @click="selectDineIn">
          <div class="option-icon">🍽️</div>
          <div class="option-title">內用</div>
          <div class="option-desc">在店內用餐區享用美食</div>
        </div>
        
        <!-- 自取選項 -->
        <div class="option-card" @click="selectPickup">
          <div class="option-icon">🏃</div>
          <div class="option-title">到店自取</div>
          <div class="option-desc">提前點餐，到店快速取餐</div>
        </div>
      </div>
    </div>

    <!-- ==================== 步驟 2：填寫資訊 ==================== -->
    <div v-if="step === 2" class="step-content">
      <button class="back-btn" @click="goBack">← 返回</button>
      
      <h2 class="step-title">
        {{ orderType === 'dine-in' ? '🍽️ 內用資訊' : '🏃 自取資訊' }}
      </h2>
      
      <!-- 錯誤訊息 -->
      <div v-if="errorMessage" class="error-message">
        ⚠️ {{ errorMessage }}
      </div>
      
      <!-- 內用資訊 -->
      <div v-if="orderType === 'dine-in'" class="info-form">
        <div class="info-row">
          <div class="info-label">桌號：</div>
          <div class="info-value clickable" @click="openTablePicker">
            {{ tableNumberText() }} <span class="arrow">▼</span>
          </div>
        </div>
        
        <div class="info-row">
          <div class="info-label">預計到達時間：</div>
          <div class="info-value clickable" @click="openDineInTimePicker">
            {{ dineInTimeText() }} <span class="arrow">▼</span>
          </div>
        </div>
      </div>
      
      <!-- 自取資訊 -->
      <div v-if="orderType === 'pickup'" class="info-form">
        <div class="info-row">
          <div class="info-label">取餐時間：</div>
          <div class="info-value clickable" @click="openPickupTimePicker">
            {{ pickupTimeText() }} <span class="arrow">▼</span>
          </div>
        </div>
        
        <div class="info-reminder">
          ⏰ 請於選擇的時間到店取餐
        </div>
      </div>
      
      <button class="next-btn" @click="goToMenu">
        繼續到主選單 →
      </button>
    </div>

    <!-- ==================== 桌號選擇器彈窗 ==================== -->
    <div v-if="showTablePicker" class="picker-overlay" @click="closeAllPickers">
      <div class="picker-modal" @click.stop>
        <div class="picker-title">📋 請選擇桌號</div>
        <div class="picker-content">
          <div class="table-grid">
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
        <button class="picker-cancel" @click="closeAllPickers">取消</button>
      </div>
    </div>

    <!-- ==================== 內用時間選擇器彈窗 ==================== -->
    <div v-if="showDineInTimePicker" class="picker-overlay" @click="closeAllPickers">
      <div class="picker-modal" @click.stop>
        <div class="picker-title">⏰ 請選擇預計到達時間</div>
        <div class="picker-content">
          <div class="time-grid">
            <button 
              v-for="time in ['6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00']" 
              :key="time"
              class="time-btn"
              :class="{ active: dineInTime === time }"
              @click="selectDineInTime(time)"
            >
              {{ time }}
            </button>
          </div>
        </div>
        <button class="picker-cancel" @click="closeAllPickers">取消</button>
      </div>
    </div>

    <!-- ==================== 自取時間選擇器彈窗 ==================== -->
    <div v-if="showPickupTimePicker" class="picker-overlay" @click="closeAllPickers">
      <div class="picker-modal" @click.stop>
        <div class="picker-title">⏰ 請選擇取餐時間</div>
        <div class="picker-content">
          <div class="time-grid">
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
        <button class="picker-cancel" @click="closeAllPickers">取消</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ==================== 整體樣式 ==================== */
.order-type-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
}

/* ==================== 步驟指示器 ==================== */
.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.5;
}

.step.active {
  opacity: 1;
}

.step.completed {
  opacity: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ddd;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
}

.step.active .step-number {
  background: #4CAF50;
}

.step.completed .step-number {
  background: #4CAF50;
}

.step-text {
  font-size: 14px;
  color: #666;
}

.step.active .step-text {
  color: #333;
  font-weight: bold;
}

.step-line {
  width: 60px;
  height: 3px;
  background: #ddd;
  margin: 0 15px;
  margin-bottom: 25px;
}

.step-line.active {
  background: #4CAF50;
}

/* ==================== 步驟內容 ==================== */
.step-content {
  max-width: 600px;
  margin: 0 auto;
}

.step-title {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
}

/* ==================== 返回按鈕 ==================== */
.back-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 10px;
}

.back-btn:hover {
  color: #333;
}

/* ==================== 選項卡片 ==================== */
.option-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.option-card {
  background: white;
  border-radius: 20px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 3px solid transparent;
}

.option-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  border-color: #4CAF50;
}

.option-icon {
  font-size: 60px;
  margin-bottom: 15px;
}

.option-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.option-desc {
  font-size: 14px;
  color: #666;
}

/* ==================== 資訊表單 ==================== */
.info-form {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: bold;
  color: #333;
  font-size: 16px;
}

.info-value {
  color: #666;
}

.info-value.clickable {
  cursor: pointer;
  transition: color 0.3s;
}

.info-value.clickable:hover {
  color: #4CAF50;
}

.arrow {
  margin-left: 5px;
  font-size: 12px;
}

.info-reminder {
  background: #fff8e1;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  color: #f57c00;
  font-size: 14px;
  margin-top: 15px;
}

/* ==================== 錯誤訊息 ==================== */
.error-message {
  background: #ffebee;
  color: #c62828;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

/* ==================== 下一步按鈕 ==================== */
.next-btn {
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

.next-btn:hover {
  background: #45a049;
}

/* ==================== 選擇器彈窗 ==================== */
.picker-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.picker-modal {
  background: white;
  width: 90%;
  max-width: 350px;
  border-radius: 20px;
  padding: 25px;
}

.picker-title {
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
}

.picker-content {
  margin-bottom: 20px;
}

.table-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.table-btn {
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.table-btn:hover {
  background: #e8f5e9;
  border-color: #4CAF50;
}

.table-btn.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.time-btn {
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.time-btn:hover {
  background: #e8f5e9;
  border-color: #4CAF50;
}

.time-btn.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.picker-cancel {
  width: 100%;
  padding: 12px;
  background: #f5f5f5;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.picker-cancel:hover {
  background: #e0e0e0;
}
</style>
