<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 引入 router（像借一台導航機）
const router = useRouter()

// 放一個叫 isLogin 的盒子，預設是 true（登入模式）
// 如果是 false 就是註冊模式
const isLogin = ref(true)

// 放一個叫 email 的盒子，裡面是空的（用來裝使用者打的email）
const email = ref('')

// 放一個叫 password 的盒子，裡面是空的（用來裝使用者打的密碼）
const password = ref('')

// 放一個叫 name 的盒子，裡面是空的（註冊時要填名字）
const name = ref('')

// 放一個叫 phone 的盒子，裡面是空的（註冊時要填電話）
const phone = ref('')

// 放一個叫 errorMessage 的盒子，用來顯示錯誤訊息
const errorMessage = ref('')

// 這個函數是「切換按鈕」
// 負責把登入模式變成註冊模式，或是反過來
const toggleMode = () => {
  isLogin.value = !isLogin.value
  errorMessage.value = ''
}

// 這個函數是「登入/註冊按鈕」
// 負責把資料送去給廚師（API）處理
const handleSubmit = () => {
  // 先把錯誤訊息清空
  errorMessage.value = ''
  
  if (isLogin.value) {
    // ========== 登入模式 ==========
    
    // 檢查帳號密碼有沒有填
    if (!email.value || !password.value) {
      errorMessage.value = '請填寫電子郵件和密碼'
      return
    }
    
    // 從 localStorage 讀取所有註冊過的會員資料
    const usersJson = localStorage.getItem('users')
    const users = usersJson ? JSON.parse(usersJson) : []
    
    // 檢查帳號密碼是否正確
    const user = users.find((u: any) => u.email === email.value && u.password === password.value)
    
    if (user) {
      // 如果有找到這個會員，就登入成功
      // 把登入者的資料存到 localStorage（表示現在是這個會員在用）
      localStorage.setItem('currentUser', JSON.stringify(user))
      alert(`歡迎回來，${user.name}！`)
      // 跳轉到選擇取餐方式頁面
      router.push('/order-type')
    } else {
      // 如果找不到這個會員，就顯示錯誤訊息
      errorMessage.value = '電子郵件或密碼錯誤'
    }
    
  } else {
    // ========== 註冊模式 ==========
    
    // 檢查所有欄位有沒有填
    if (!name.value || !email.value || !password.value || !phone.value) {
      errorMessage.value = '請填寫所有欄位'
      return
    }
    
    // 檢查密碼長度（至少要 6 個字）
    if (password.value.length < 6) {
      errorMessage.value = '密碼至少要 6 個字'
      return
    }
    
    // 從 localStorage 讀取所有註冊過的會員資料
    const usersJson = localStorage.getItem('users')
    const users = usersJson ? JSON.parse(usersJson) : []
    
    // 檢查電子郵件是否已經被註冊過
    const existingUser = users.find((u: any) => u.email === email.value)
    
    if (existingUser) {
      // 如果已經有這個 Email，就顯示錯誤訊息
      errorMessage.value = '這個電子郵件已經被註冊過了'
      return
    }
    
    // 如果都沒問題，就建立新會員資料
    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      createdAt: new Date().toISOString()
    }
    
    // 把新會員加到 users 陣列
    users.push(newUser)
    
    // 把更新後的 users 存回 localStorage
    localStorage.setItem('users', JSON.stringify(users))
    
    // 把新會員設為當前登入者
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    
    alert(`註冊成功！歡迎加入，${newUser.name}！`)
    // 跳轉到選擇取餐方式頁面
    router.push('/order-type')
  }
}
</script>

<template>
  <!-- 這是一個大容器，把所有東西包在一起 -->
  <div class="login-page">
    <!-- 這是標題區塊，顯示「摩斯漢堡線上點餐系統」 -->
    <div class="login-header">
      <h1>🌅 宇宇早餐</h1>
      <p>線上點餐系統</p>
    </div>

    <!-- 這個表單用來裝所有輸入框 -->
    <form class="login-form" @submit.prevent="handleSubmit">
      
      <!-- 錯誤訊息（當有錯誤時會顯示） -->
      <div v-if="errorMessage" class="error-message">
        ⚠️ {{ errorMessage }}
      </div>
      
      <!-- 只有在「註冊模式」時才顯示這個名字輸入框 -->
      <div v-if="!isLogin" class="input-group">
        <!-- 這是一張便條紙，寫著「您的名字」 -->
        <label>👤 您的名字</label>
        <!-- 這是一個輸入框，會把打的字放到 name 盒子裡 -->
        <input 
          v-model="name" 
          type="text" 
          placeholder="請輸入名字"
        />
      </div>

      <!-- 電子郵件輸入框（兩種模式都要顯示） -->
      <div class="input-group">
        <!-- 這是一張便條紙，寫著「電子郵件」 -->
        <label>📧 電子郵件</label>
        <!-- 這是一個輸入框，會把打的字放到 email 盒子裡 -->
        <input 
          v-model="email" 
          type="email" 
          placeholder="請輸入電子郵件"
        />
      </div>

      <!-- 密碼輸入框（兩種模式都要顯示） -->
      <div class="input-group">
        <!-- 這是一張便條紙，寫著「密碼」 -->
        <label>🔒 密碼</label>
        <!-- 這是一個輸入框，會把打的字放到 password 盒子裡 -->
        <input 
          v-model="password" 
          type="password" 
          placeholder="請輸入密碼"
        />
      </div>

      <!-- 只有在「註冊模式」時才顯示這個電話輸入框 -->
      <div v-if="!isLogin" class="input-group">
        <!-- 這是一張便條紙，寫著「電話號碼」 -->
        <label>📱 電話號碼</label>
        <!-- 這是一個輸入框，會把打的字放到 phone 盒子裡 -->
        <input 
          v-model="phone" 
          type="tel" 
          placeholder="請輸入電話號碼"
        />
      </div>

      <!-- 這是主要按鈕，會顯示「登入」或「註冊」 -->
      <button type="submit" class="submit-btn">
        {{ isLogin ? '登入' : '註冊' }}
      </button>

    </form>

    <!-- 這是分隔線，寫著「還沒有帳號？」或「已經有帳號？」 -->
    <div class="toggle-text">
      <span>{{ isLogin ? '還沒有帳號？' : '已經有帳號？' }}</span>
      <!-- 這個按鈕用來切換登入/註冊模式 -->
      <button class="toggle-btn" @click="toggleMode">
        {{ isLogin ? '註冊新帳號' : '回去登入' }}
      </button>
    </div>

  </div>
</template>

<style scoped>
/* 這個登入頁面的設計 */

/* 大容器：讓東西置中，背景用淡淡的顏色 */
.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

/* 標題區塊 */
.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  font-size: 48px;
  margin: 0;
  color: #333;
}

.login-header p {
  font-size: 18px;
  color: #666;
  margin-top: 10px;
}

/* 表單區塊 */
.login-form {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

/* 錯誤訊息 */
.error-message {
  /* 紅色背景 */
  background: #ffebee;
  /* 紅色文字 */
  color: #c62828;
  /* 圓角 */
  border-radius: 10px;
  /* 上下留白 */
  padding: 12px;
  /* 下面留白 */
  margin-bottom: 20px;
  /* 字體大小 */
  font-size: 14px;
  /* 粗體 */
  font-weight: bold;
  /* 文字置中 */
  text-align: center;
}

/* 輸入框群組 */
.input-group {
  margin-bottom: 20px;
}

/* 輸入框的標籤 */
.input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

/* 輸入框本身 */
.input-group input {
  width: 100%;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.input-group input:focus {
  outline: none;
  border-color: #4CAF50;
}

/* 提交按鈕 */
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
  transition: background 0.3s;
  margin-top: 10px;
}

.submit-btn:hover {
  background: #45a049;
}

/* 切換文字區塊 */
.toggle-text {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.toggle-btn {
  background: none;
  border: none;
  color: #4CAF50;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 5px;
}

.toggle-btn:hover {
  color: #45a049;
}
</style>
