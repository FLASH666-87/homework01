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
    
    <!-- ==================== 左邊：品牌宣傳區 ==================== -->
    <div class="brand-section">
      <!-- 品牌背景圖片 -->
      <div class="brand-background">
        <!-- 這是一張早餐的圖片 -->
        <img 
          src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&q=80" 
          alt="美味早餐"
          class="brand-image"
        />
        <!-- 背景遮罩 -->
        <div class="brand-overlay"></div>
      </div>
      
      <!-- 品牌內容 -->
      <div class="brand-content">
        <!-- 品牌名稱 -->
        <h1 class="brand-title">宇宇早餐</h1>
        
        <!-- 品牌標語 -->
        <p class="brand-slogan">每一份早餐，都是用心製作</p>
        
        <!-- 品牌特色 -->
        <div class="brand-features">
          <div class="feature">
            <div class="feature-icon">🍳</div>
            <div class="feature-text">新鮮食材</div>
          </div>
          <div class="feature">
            <div class="feature-icon">🚀</div>
            <div class="feature-text">快速便利</div>
          </div>
          <div class="feature">
            <div class="feature-icon">💝</div>
            <div class="feature-text">用心服務</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== 右邊：登入表單區 ==================== -->
    <div class="form-section">
      <!-- 表單包裝（增加陰影和圓角效果） -->
      <div class="form-wrapper">
        <!-- 表單標題 -->
        <div class="form-header">
          <h2 class="form-title">{{ isLogin ? '歡迎回來' : '加入我們' }}</h2>
          <p class="form-subtitle">{{ isLogin ? '登入您的帳號' : '建立新帳號' }}</p>
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

      <!-- 這是分隔線，寫著「還沒有帳號？」或「已經有帳號？」 -->
      <div class="toggle-text">
        <span>{{ isLogin ? '還沒有帳號？' : '已經有帳號？' }}</span>
        <!-- 這個按鈕用來切換登入/註冊模式 -->
        <button class="toggle-btn" @click="toggleMode">
          {{ isLogin ? '註冊新帳號' : '回去登入' }}
        </button>
      </div>

    </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ==================== 整體樣式 ==================== */

/* 大容器：左右兩欄設計 */
.login-page {
  min-height: 100vh;
  display: flex;
  /* 整個頁面背景：淡綠色漸層 */
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}

/* ==================== 左邊：品牌宣傳區 ==================== */

/* 品牌區塊 */
.brand-section {
  /* 佔整個畫面的一半 */
  flex: 1;
  /* 位置固定 */
  position: relative;
  /* 最小寬度 */
  min-width: 300px;
  /* 左邊區域：淡綠色底色 */
  background: linear-gradient(135deg, #a5d6a7 0%, #81c784 100%);
}

/* 品牌背景圖片 */
.brand-background {
  /* 充滿整個區塊 */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.brand-image {
  /* 充滿整個區塊 */
  width: 100%;
  height: 100%;
  /* 保持比例填充 */
  object-fit: cover;
  /* 圖片半透明，讓綠色底透出來 */
  opacity: 0.5;
}

/* 背景遮罩（讓子更清楚） */
.brand-overlay {
  /* 充滿整個區塊 */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* 淡綠色半透明遮罩 */
  background: linear-gradient(135deg, rgba(129, 199, 132, 0.4) 0%, rgba(165, 214, 167, 0.3) 100%);
}

/* 品牌內容（放在最上層） */
.brand-content {
  /* 相對於品牌區塊定位 */
  position: relative;
  /* 充滿整個高度 */
  height: 100%;
  /* 內容垂直置中 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* 文字白色 */
  color: white;
  /* 內距 */
  padding: 40px;
  text-align: center;
}

/* 品牌名稱 */
.brand-title {
  /* 字體大小 */
  font-size: 56px;
  /* 粗體 */
  font-weight: bold;
  /* 陰影（讓文字更立體） */
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
  /* 外邊距 */
  margin: 0 0 15px 0;
  /* 字母間距 */
  letter-spacing: 5px;
}

/* 品牌標語 */
.brand-slogan {
  /* 字體大小 */
  font-size: 22px;
  /* 透明度 */
  opacity: 0.95;
  /* 外邊距 */
  margin: 0 0 60px 0;
  /* 文字陰影 */
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

/* 品牌特色區塊 */
.brand-features {
  /* 水平排列 */
  display: flex;
  gap: 30px;
  /* 讓特色卡片有模糊邊界效果 */
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
}

/* 每個特色 */
.feature {
  /* 垂直排列 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  /* 增加動畫效果 */
  transition: transform 0.3s;
}

.feature:hover {
  transform: translateY(-5px);
}

/* 特色圖示 */
.feature-icon {
  /* 圓形背景 */
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  /* 讓 emoji 置中 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  /* 模糊邊界效果 */
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

/* 特色文字 */
.feature-text {
  /* 字體大小 */
  font-size: 16px;
  /* 粗體 */
  font-weight: bold;
  /* 文字陰影 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

/* ==================== 右邊：登入表單區 ==================== */

/* 表單區塊 */
.form-section {
  /* 佔整個畫面的另一半 */
  flex: 1;
  /* 內容垂直置中 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* 背景：接近白色的淡綠色 */
  background: rgba(245, 255, 248, 0.9);
  /* 內距 */
  padding: 40px;
}

/* 表單包裝（增加陰影和圓角效果） */
.form-wrapper {
  /* 白色背景 */
  background: white;
  /* 圓角 */
  border-radius: 30px;
  /* 陰影（增加模糊邊界效果） */
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
  /* 內距 */
  padding: 50px;
  /* 寬度 */
  width: 100%;
  max-width: 450px;
}

/* 表單標題區 */
.form-header {
  /* 文字置中 */
  text-align: center;
  /* 下面留白 */
  margin-bottom: 35px;
}

/* 表單標題 */
.form-title {
  /* 字體大小 */
  font-size: 32px;
  /* 粗體 */
  font-weight: bold;
  /* 顏色 */
  color: #333;
  /* 外邊距 */
  margin: 0 0 10px 0;
}

/* 表單副標題 */
.form-subtitle {
  /* 字體大小 */
  font-size: 16px;
  /* 顏色 */
  color: #666;
  /* 外邊距 */
  margin: 0;
}

/* 錯誤訊息 */
.error-message {
  /* 紅色背景 */
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  /* 紅色文字 */
  color: #c62828;
  /* 圓角 */
  border-radius: 15px;
  /* 上下留白 */
  padding: 15px;
  /* 下面留白 */
  margin-bottom: 25px;
  /* 字體大小 */
  font-size: 15px;
  /* 粗體 */
  font-weight: bold;
  /* 文字置中 */
  text-align: center;
  /* 陰影 */
  box-shadow: 0 4px 15px rgba(198, 40, 40, 0.15);
}

/* 輸入框群組 */
.input-group {
  margin-bottom: 25px;
}

/* 輸入框的標籤 */
.input-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
  font-size: 15px;
}

/* 輸入框本身 */
.input-group input {
  width: 100%;
  padding: 18px 20px;
  border: 2px solid #e8e8e8;
  border-radius: 15px;
  font-size: 16px;
  box-sizing: border-box;
  transition: all 0.3s;
  /* 陰影 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.input-group input:focus {
  outline: none;
  border-color: #4CAF50;
  /* 聚焦時陰影更深 */
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.2);
}

/* 提交按鈕 */
.submit-btn {
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 15px;
  /* 陰影 */
  box-shadow: 0 6px 25px rgba(76, 175, 80, 0.35);
}

.submit-btn:hover {
  /* 滑過時陰影更深、往上移 */
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.45);
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
