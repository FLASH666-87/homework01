# 🏪 摩斯漢堡線上點餐系統 - 專案計畫書

## 一、系統角色對照表

| 網頁元件 | 比喻 | 做的事情 |
|----------|------|----------|
| **Browser** | 您 | 看網頁的人 |
| **按鈕 + 事件監聽器** | 服務生 | 站在您旁邊，盯著您什麼時候按鈕，一按就馬上去通知 |
| **API** | 廚師 | 收到服務生通知後，實際做事情的人 |
| **Database** | 冰箱 | 存放食材（資料）的地方 |
| **Server** | 整間餐廳 | 廚師 + 冰箱 所在的地方 |

---

## 二、網頁流程（從開網頁到拿到早餐）

```
打開網頁
    ↓
登入/註冊頁面 ← 【目前正在做】
    ↓
選擇取餐方式（內用 / 自取）
    ↓
餐點展示區（搜尋、分類、加購物車）
    ↓
購物籃區（套用優惠券）
    ↓
結帳區（付款）
    ↓
抽獎（神秘卷）
    ↓
完成！
```

---

## 三、頁面結構

### 3.1 登入/註冊頁面
- 電子郵件輸入框
- 密碼輸入框
- 登入/註冊按鈕
- 切換登入/註冊模式

### 3.2 註冊頁面（額外欄位）
- 姓名
- 電話號碼

### 3.3 主頁面
- 會員區（右上角）
- 取餐方式選擇（內用 / 自取）
- 餐點展示區
  - 搜尋框（右上角）
  - 分類標籤（漢堡、貝果、三明治、飲料）
  - 餐點卡片（圖片、價格、加號按鈕）
- 購物籃區
  - 已選餐點列表
  - 優惠券區
    - 集點卡（90天期限）
    - 新人禮（3天期限）
    - 神秘卷（30天期限）
  - 小計/優惠/合計
  - 取餐方式
  - 付款方式
  - 送出訂單按鈕

---

## 四、優惠券系統設計

### 4.1 集點卡（🍔 豬豬集點）
- **取得方式**：消費滿 $50 → 自動獲得 1 點
- **兌換方式**：
  - 5 點 → 可換三明治系列
  - 10 點 → 可換堡系列
- **有效期限**：90 天

### 4.2 新人禮（🎁 歡迎光臨）
- **內容**：
  - 現折 $30（消費滿 $100 可用）
  - 免運費（首次外送）
- **有效期限**：3 天
- **限制**：帳號一生只能領一次

### 4.3 神秘卷（🎲 神秘好禮）
- **取得方式**：每筆訂單完成後 1% 機率隨機獲得
- **機率表**：
  - 90% → 什麼都沒有
  - 9% → 獲得 9 折券（滿 $100 可用）
  - 1% → 獲得全減免卷（最高折 $300）
- **有效期限**：30 天

---

## 五、餐點資料（摩斯漢堡早餐）

### 5.1 圖片來源
```
https://www.mos.com.tw/upload/product/圖片檔名.jpg
```

### 5.2 餐點分類

| 類別 | 餐點名 | 價格 |
|------|--------|------|
| **珍珠堡系列** | 超級大麥牛蒡培根珍珠堡、牛蒡培根珍珠堡、和風玉子珍珠堡、超級大麥海洋珍珠堡、海洋珍珠堡、超級大麥杏鮑菇珍珠堡、杏鮑菇珍珠堡、新咕咕雞堡、青梅豬排堡、摩斯豬排堡、摩斯炸蝦堡、黃金塔塔鱈魚堡、元氣牛肉蛋堡 | $45~$110 |
| **貝果系列** | 蕃茄吉士蛋貝果、火腿歐姆蛋貝果、培根雞蛋貝果、摩斯貝果 | $45~$110 |
| **堡系列** | 培根雞蛋堡、蕃茄吉士蛋堡、火腿歐姆蛋堡、摩斯熱狗堡 | $45~$80 |
| **三明治系列** | 日式豬排三明治、火腿蛋三明治、雞肉三明治、黃金蝦三明治 | $40~$75 |

---

## 六、程式碼結構（用便當盒比喻）

```
src/
├── main.ts              → 開啟便當盒的說明書
├── App.vue              → 便當盒的主要容器
├── router/
│   └── index.ts        → 房間門牌號管理員
├── views/
│   ├── Login.vue       → 登入/註冊頁面
│   └── Home.vue        → 主頁面（待建立）
├── components/
│   └── ...             → 小零件區（待建立）
└── stores/
    ├── user.ts          → 會員資料盒子
    ├── cart.ts          → 購物籃盒子
    └── coupon.ts        → 優惠券盒子
```

---

## 七、技術說明

### 7.1 使用的工具
- **Vue 3**（用生活比喻：便當盒的框架）
- **Vue Router**（用生活比喻：房間門牌號管理員）
- **Pinia**（用生活比喻：放盒子的倉庫）

### 7.2 重要概念
- **盒子（ref）**：用來存放會變動的資料
- **事件監聽器**：盯著按鈕什麼時候被按下去
- **v-model**：像一根線，把輸入框和盒子連在一起
- **v-if**：像開關，決定要不要顯示某個東西
- **v-for**：像影印機，把同樣的東西複制好幾份

---

## 八、開發日誌

### 2026/4/9 - Day 1
- [x] 建立專案結構
- [x] 建立登入/註冊頁面（Login.vue）
- [x] 設定路由（router/index.ts）
- [ ] 建立主頁面（Home.vue）
- [ ] 建立餐點資料
- [ ] 建立購物籃功能
- [ ] 建立優惠券功能
- [ ] 建立結帳功能

---

## 九、內用/自取切換功能（AI 教我做的白話文步驟）

### 9.1 我問 AI 的問題

> 「請幫我完成內用/自取切換這個頁面，需要每一行附加註釋」

### 9.2 AI 給我的白話文步驟

**第一步：放資料的盒子**
```
我需要準備幾個「盒子」來存放資料：
- isDineIn（放內用還是自取）
- dineInTime（放內用的預計時間）
- pickupTime（放自取的取餐時間）
- tableNumber（放內用的桌號）
- showTimePicker（放選擇器要不要顯示）
- showTablePicker（放桌號選擇器要不要顯示）
```

**第二步：寫服務生函數**
```
我需要準備幾個「服務生」來做事：
- switchToDineIn()：切換到內用模式
- switchToPickup()：切換到自取模式
- openTimePicker()：打開時間選擇器
- openPickupTimePicker()：打開取餐時間選擇器
- selectDineInTime()：選擇內用時間
- selectPickupTime()：選擇取餐時間
- selectTable()：選擇桌號
- closeAllPickers()：關閉所有選擇器
```

**第三步：用計算屬性顯示文字**
```
我需要準備幾個「自動更新的牌子」：
- orderTypeText：自動顯示「🍽️ 內用」或「🏃 到店自取」
- dineInTimeText：自動顯示選擇的時間
- pickupTimeText：自動顯示選擇的取餐時間
- tableNumberText：自動顯示「第X桌」
```

**第四步：寫 HTML 結構**
```
1. 放兩個按鈕（內用、自取）
2. 放一個資訊卡片（根據模式顯示不同內容）
3. 放一個選擇器彈窗（選擇桌號或時間）
```

**第五步：加樣式**
```
1. 按鈕被選中時要變成綠色
2. 資訊卡片要有陰影和圓角
3. 選擇器要有半透明背景
4. 按鈕要有動畫效果（平滑過渡）
```

### 9.3 AI 給我的重要提醒

1. **每一行程式碼都要加白話文註解**
   - 讓我這個初學者能夠讀懂

2. **用生活比喻代替專有名詞**
   - 「盒子」代替 ref
   - 「服務生」代替 function
   - 「開關」代替 v-if

3. **一次只做一小段**
   - 先做好基本切換
   - 再加時間選擇
   - 再加桌號選擇
   - 最後加樣式

4. **功能完成後要測試**
   - 點內用按鈕會不會變綠色？
   - 點桌號會不會出現選擇器？
   - 選完後會不會自動關閉？

---

## 十、用來理解 Vue 的生活比喻（AI 告訴我的）

### 10.1 基礎概念

| Vue 概念 | 生活比喻 | 意思 |
|----------|----------|------|
| `ref()` | **盒子** | 用來存放會變動的資料 |
| `function` | **服務生** | 用來做事（函數） |
| `v-if` | **開關** | 決定要不要顯示 |
| `v-for` | **影印機** | 複製很多份 |
| `v-model` | **傳聲筒** | 把輸入框的內容傳到盒子 |
| `{{ 盒子名 }}` | **看板** | 把盒子裡的內容顯示出來 |

### 10.2 組合起來

```
當使用者按下一個按鈕
    ↓
事件監聽器（@click）發現了
    ↓
叫服務生（function）去做事
    ↓
服務生打開盒子（ref），放新的資料進去
    ↓
HTML 看到盒子內容變了，自動更新畫面
```

### 10.3 我的理解

> Vue 就是這樣運作的：
> 1. 先放幾個「盒子」在旁邊
> 2. 按鈕被按下去時，叫「服務生」去改盒子裡的內容
> 3. 盒子內容一改，畫面就自動更新了

這就是 Vue 的核心概念：**響應式**！

---

## 十一、程式碼範例（我請 AI 寫的）

### 11.1 放資料的盒子
```vue
<script setup lang="ts">
// 放一個叫 isDineIn 的盒子，預設是 true（內用模式）
const isDineIn = ref(true)

// 放一個叫 tableNumber 的盒子，裝桌號
const tableNumber = ref('')
</script>
```

### 11.2 寫服務生函數
```vue
<script setup lang="ts">
// 切換到內用模式
const switchToDineIn = () => {
  isDineIn.value = true
}

// 選擇桌號
const selectTable = (table: string) => {
  tableNumber.value = table
  showTablePicker.value = false
}
</script>
```

### 11.3 HTML 按鈕
```vue
<template>
  <!-- 內用按鈕 -->
  <button 
    :class="{ active: isDineIn }"
    @click="switchToDineIn"
  >
    🍽️ 內用
  </button>

  <!-- 桌號選擇 -->
  <div v-if="isDineIn">
    桌號：{{ tableNumber || '尚未選擇' }}
  </div>
</template>
```

### 11.4 CSS 樣式
```css
/* 選中的按鈕要變綠色 */
.order-type-btn.active {
  background: #4CAF50;
  color: white;
}
```

---

## 十二、我的學習心得

1. **一開始看到程式碼很害怕**
   - 因為都是英文和符號
   - 不懂什麼是 ref、v-if、v-for

2. **AI 用生活比喻後就懂了**
   - 「盒子」就是 ref
   - 「服務生」就是 function
   - 「影印機」就是 v-for

3. **現在我可以讀懂程式碼了**
   - 因為每一行都有白話文註解
   - 慢慢看就能知道在做什麼

4. **下一步想要學的**
   - 怎麼把資料送到伺服器？
   - 怎麼從資料庫讀取餐點？
   - 怎麼做出一個真的能用的登入系統？

---

## 十三、把一個頁面變成多個頁面（AI 教我做的白話文步驟）

### 13.1 我問 AI 的問題

> 「請把內用和到店自取跟主選單分割成兩個不同的頁面，主選單在後，還有幫我修正漢堡、貝果、三明治無法整理畫面的問題」

> 「我要的訂單編號要是三位數字就好」

### 13.2 問題分析

**問題 1：頁面太雜亂**
- 本來只有一個頁面（Home.vue）
- 所有功能都擠在一起：登入、內用/自取、點餐
- 看起來很亂

**問題 2：分類篩選沒作用**
- 點「漢堡」按鈕，畫面還是顯示所有餐點
- 因為 `menuItems` 沒有被過濾

### 13.3 AI 給我的白話文步驟

**第一步：把頁面拆成三個**
```
把一個大房間拆成三個小房間：
- 第一關：/login（登入）
- 第二關：/order-type（選擇內用/自取）
- 第三關：/menu（點餐）
- 第四關：/order-confirm（結帳）
```

**第二步：建立新的頁面檔案**
```
新增 OrderType.vue：接待員頁面（選擇內用/自取）
新增 OrderConfirm.vue：結帳頁面（支付方式和訂單編號）
把 Home.vue 改名成 Menu.vue：點餐頁面
```

**第三步：設定路由（告訴程式要走哪條路）**
```
在 router/index.ts 裡新增：
- /order-type → OrderType.vue
- /menu → Menu.vue
- /order-confirm → OrderConfirm.vue
```

**第四步：讓頁面之間可以傳資料**
```
用 localStorage（小本子）在不同頁面之間傳資料：
- OrderType.vue 選完內用/自取 → 存到 localStorage
- Menu.vue 讀取 localStorage → 顯示取餐資訊
- Menu.vue 送出訂單 → 存到 localStorage
- OrderConfirm.vue 讀取 localStorage → 顯示訂單資料
```

**第五步：修正分類篩選功能**
```
問題：為什麼分類篩選沒作用？
原因：HTML 顯示的是 menuItems（全部20個），沒有被過濾

解決：用 computed（自動計算機）做一個過濾器：
1. 建立 filteredMenuItems 計算屬性
2. 根據 selectedCategory 過濾餐點
3. HTML 改成顯示 filteredMenuItems
```

**第六步：實作送出訂單流程**
```
1. Menu.vue 按「送出訂單」
2. 跳出 confirm() 確認對話框
3. 客人按「確定」→ 把訂單資料存到 localStorage
4. 跳轉到 /order-confirm
5. OrderConfirm.vue 選擇支付方式（信用卡/現場支付）
6. 選擇後 → 生成 3 位數訂單編號
7. 顯示成功畫面
```

### 13.4 AI 給我的重要提醒

1. **`computed` vs `ref`**
   - `ref`：存放「靜態」的資料（不會自動變）
   - `computed`：存放「動態」的資料（會根據其他資料自動計算）

2. **localStorage 的用途**
   - 不同頁面之間傳遞資料
   - 暫時保存使用者的選擇
   - 關閉瀏覽器後資料會消失

3. **頁面跳轉要用 `router.push()`**
   - `router.push('/order-type')` = 跳到選擇內用/自取頁面
   - `router.push('/menu')` = 跳到點餐頁面
   - `router.push('/order-confirm')` = 跳到結帳頁面

---

## 十四、用來理解新功能的生活比喻

### 14.1 `computed`（自動計算機）

**比喻：**  
> 就像餐廳的「電子看板」：
> - 廚房改了一道菜 → 看板上自動更新
> - 不需要人為去刷新，資料變了畫面就跟著變

**什麼時候用：**
- 需要根據其他資料計算出來的結果
- 計算的結果會隨著其他資料改變而改變

**程式碼範例：**
```javascript
// 建立一個「過濾器」
const filteredMenuItems = computed(() => {
  let items = menuItems.value  // 一開始是全部20個
  
  // 如果有選分類，就過濾
  if (selectedCategory.value !== 'all') {
    items = items.filter(item => item.category === selectedCategory.value)
  }
  
  return items
})
```

---

### 14.2 `localStorage`（小本子）

**比喻：**  
> 就像餐廳的「傳票本」：
> - 第一站（接待員）寫下「內用、第5桌、9:00」
> - 第二站（服務生）拿起傳票，看到「內用、第5桌」
> - 第三站（結帳）把訂單存到本子裡

**什麼時候用：**
- 不同頁面之間需要傳遞資料
- 使用者的選擇需要暫時保存
- 不想讓資料在刷新頁面後消失

**程式碼範例：**
```javascript
// 把資料寫到小本子
localStorage.setItem('orderInfo', JSON.stringify(orderInfo))

// 從小本子讀資料
const orderInfoJson = localStorage.getItem('orderInfo')
const orderInfo = JSON.parse(orderInfoJson)
```

---

### 14.3 多頁面跳轉（餐廳動線）

**比喻：**  
> 就像餐廳的「動線設計」：
> - 客人從大門進來（登入）
> - 到接待台問要內用還是外帶（選擇取餐方式）
> - 到座位上看菜單點餐（點餐）
> - 吃完叫服務生結帳（結帳）
> - 拿著號碼牌取餐（完成）

**頁面對應：**
```
1. /login → 登入頁面（大門）
2. /order-type → 選擇內用/自取（接待台）
3. /menu → 點餐頁面（座位）
4. /order-confirm → 結帳頁面（收銀台）
```

---

## 十五、程式碼範例

### 15.1 分類篩選（computed + filter）

```javascript
// 放一個叫 selectedCategory 的盒子，裝目前選的分類
const selectedCategory = ref('all')

// 放一個叫 menuItems 的盒子，裝所有餐點
const menuItems = ref([
  { id: 1, name: '培根雞蛋堡', category: 'burger' },
  { id: 2, name: '火腿蛋三明治', category: 'sandwich' },
  // ... 共 20 個餐點
])

// 用 computed 做一個「過濾器」
const filteredMenuItems = computed(() => {
  let items = menuItems.value  // 一開始是全部20個
  
  // 如果有選分類（不是 'all'），就只留下這個分類的餐點
  if (selectedCategory.value !== 'all') {
    items = items.filter(item => item.category === selectedCategory.value)
  }
  
  return items  // 把過濾後的結果傳回去
})

// HTML 用 filteredMenuItems 取代 menuItems
// <div v-for="item in filteredMenuItems">
```

### 15.2 localStorage 存讀資料

```javascript
// ========== 寫入資料 ==========
const orderInfo = {
  type: 'dine-in',
  tableNumber: '5',
  dineInTime: '9:00'
}

// 把 JS 物件轉成字串，存到 localStorage（小本子）
localStorage.setItem('orderInfo', JSON.stringify(orderInfo))

// ========== 讀取資料 ==========
// 從 localStorage（小本子）讀取出來
const orderInfoJson = localStorage.getItem('orderInfo')

// 把字串轉回 JS 物件
const orderInfo = JSON.parse(orderInfoJson)

// 如果讀到的值是 null，就用空物件當預設值
const orderInfo = orderInfoJson ? JSON.parse(orderInfoJson) : null
```

### 15.3 頁面跳轉

```javascript
import { useRouter } from 'vue-router'

// 借一台導航機
const router = useRouter()

// 跳到下一個頁面
router.push('/order-type')

// 跳到點餐頁面
router.push('/menu')

// 跳到結帳頁面
router.push('/order-confirm')
```

### 15.4 送出訂單流程

```javascript
const submitOrder = () => {
  // 1. 檢查購物籃是不是空的
  if (cartItems.value.length === 0) {
    alert('購物籃是空的！')
    return
  }
  
  // 2. 跳出確認對話框
  const confirmed = confirm(`確定要送出訂單嗎？\n總金額：$${total()}`)
  
  // 3. 如果客人按「確定」
  if (confirmed) {
    // 把訂單資料存到 localStorage（小本子）
    const orderData = {
      cartItems: cartItems.value,
      total: total()
    }
    localStorage.setItem('orderData', JSON.stringify(orderData))
    
    // 4. 跳轉到結帳頁面
    router.push('/order-confirm')
  }
}
```

### 15.5 產生 3 位數訂單編號

```javascript
// 產生 100 到 999 的隨機三位數
const orderNumber = String(Math.floor(Math.random() * 900) + 100)
```

---

## 十六、開發日誌

### 2026/4/9 - Day 2
- [x] 把一個頁面拆成多個頁面（登入、選擇、取餐、結帳）
- [x] 新增 OrderType.vue（選擇內用/自取頁面）
- [x] 新增 OrderConfirm.vue（訂單確認頁面）
- [x] 修正分類篩選功能（使用 computed + filter）
- [x] 實作 localStorage 跨頁面傳遞資料
- [x] 實作送出訂單流程（確認 → 支付方式 → 訂單編號）
- [x] 把訂單編號改成 3 位數字

---

## 十七、我的學習心得（第二次）

1. **學會了用 `computed` 做過濾器**
   - 一開始不懂為什麼分類篩選沒作用
   - 才知道要用 `computed` 來根據條件過濾資料

2. **學會了用 `localStorage` 傳資料**
   - 不同頁面之間需要溝通
   - 用 `localStorage` 就像傳話人一樣，把資料傳來傳去

3. **學會了頁面跳轉**
   - `router.push()` 就是「傳送門」
   - 可以讓使用者在不同頁面之間穿梭

4. **明白了「餐廳動線」的概念**
   - 把一個大頁面拆成多個小頁面
   - 每個頁面只專注做一件事
   - 客人一步一步走，就像在餐廳裡移動一樣

---

## 十八、美化登入頁面（AI 教我做的白話文步驟）

### 18.1 我問 AI 的問題

> 「登入介面的宇宇早餐顏色及字體太單調，請幫我美觀，左邊的圖片也是」

> 「請在幫我美觀一下，比如圖片間的界線模糊處理」

> 「我要的是接近白色的綠色，改右邊的底色就好」

### 18.2 需求分析

**問題 1：頁面太單調**
- 原本只有簡單的背景色
- 想要更好看的效果

**問題 2：左邊圖片區想要綠色底**
- 但圖片也要保留
- 需要讓圖片半透明，透出綠色底

**問題 3：右邊表單區也要綠色底**
- 但「歡迎回來」白色方框要保持白色
- 方框外面要有接近白色的淡綠色

### 18.3 AI 給我的白話文步驟

**第一步：設定整體頁面背景**
```
在 .login-page 加上淡綠色漸層背景
```

**第二步：設定左邊品牌區的背景**
```
在 .brand-section 加上淡綠色底
```

**第三步：讓圖片半透明**
```
在 .brand-image 加上 opacity: 0.5
這樣圖片就會變淡，綠色底就會透出來
```

**第四步：調整背景遮罩**
```
在 .brand-overlay 從深色改成淡綠色半透明
```

**第五步：設定右邊表單區的背景**
```
在 .form-section 加上接近白色的淡綠色
但要保持透明，讓它露出身為父容器的淡綠色
```

**第六步：保持白色方框不變**
```
.form-wrapper 保持 background: white
```

### 18.4 修改後的程式碼

```css
/* 1. 整體頁面背景 */
.login-page {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}

/* 2. 左邊品牌區 */
.brand-section {
  background: linear-gradient(135deg, #a5d6a7 0%, #81c784 100%);
}

/* 3. 圖片半透明 */
.brand-image {
  opacity: 0.5;
}

/* 4. 背景遮罩 */
.brand-overlay {
  background: linear-gradient(135deg, rgba(129, 199, 132, 0.4) 0%, rgba(165, 214, 167, 0.3) 100%);
}

/* 5. 右邊表單區（接近白色的淡綠） */
.form-section {
  background: rgba(245, 255, 248, 0.9);
}

/* 6. 白色方框保持白色 */
.form-wrapper {
  background: white;
}
```

---

## 十九、CSS 樣式常用屬性（視覺設計）

### 19.1 漸層背景

**用途：** 讓背景從一種顏色慢慢變到另一種顏色

**程式碼：**
```css
/* 從左下角到右上角漸層 */
background: linear-gradient(135deg, #顏色1, #顏色2);

/* 從上到下漸層 */
background: linear-gradient(180deg, #顏色1, #顏色2);
```

**比喻：** 就像天空從藍色漸層到紫色

---

### 19.2 半透明顏色（rgba）

**用途：** 讓背景或元素半透明，讓底下的東西透出來

**程式碼：**
```css
/* rgba(紅, 綠, 藍, 透明度) */
/* 紅=245, 綠=255, 藍=248, 透明度=0.9 */
background: rgba(245, 255, 248, 0.9);
```

**比喻：** 就像在照片上放了一層淡色玻璃

---

### 19.3 元素透明度（opacity）

**用途：** 讓整個元素（包括內容）都變透明

**程式碼：**
```css
/* 0 = 完全透明（看不見）*/
/* 1 = 完全不透明（正常顯示）*/
/* 0.5 = 半透明 */
opacity: 0.5;
```

---

### 19.4 毛玻璃效果（backdrop-filter）

**用途：** 讓背景變成霧面的玻璃效果

**程式碼：**
```css
/* blur(數字) = 模糊程度，數字越大越模糊 */
backdrop-filter: blur(10px);
```

**比喻：** 就像浴室的霧面玻璃

---

### 19.5 陰影效果（box-shadow）

**用途：** 讓元素有立體感，看起來浮起來

**程式碼：**
```css
/* box-shadow: X軸 Y軸 模糊 顏色 */
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
```

**比喻：** 就像東西放在桌面上，下面有陰影

---

### 19.6 圓角（border-radius）

**用途：** 讓方方的角落變圓

**程式碼：**
```css
/* 數字越大越圓 */
border-radius: 30px;

/* 圓形（寬度一半）*/
border-radius: 50%;
```

---

### 19.7 動畫過渡（transition）

**用途：** 讓樣式改變時有平滑的過渡效果

**程式碼：**
```css
/* 當什麼屬性改變時，過渡多長時間 */
transition: all 0.3s;

/* 常用屬性： */
/* - all：所有屬性 */
/* - background：只有背景 */
/* - transform：只有移動/放大 */
/* - 0.3s：300毫秒的過渡時間 */
```

---

### 19.8 往上移動（transform）

**用途：** 讓元素往上飄一點（視覺效果，不影響排版）

**程式碼：**
```css
/* 往上移動 5 像素 */
transform: translateY(-5px);
```

**比喻：** 就像東西被拿起来一点点

---

## 二十、開發日誌

### 2026/4/9 - Day 3
- [x] 美化登入頁面
- [x] 新增左右兩欄佈局
- [x] 左邊品牌區添加淡綠色底
- [x] 圖片半透明處理
- [x] 右邊表單區添加接近白色的淡綠色
- [x] 「歡迎回來」白色方框保持白色
- [x] 新增表單標題和副標題
- [x] 輸入框和按鈕美化

---

## 二十一、我的學習心得（第三次）

### 1. 學會了用 CSS 做視覺設計

以前只會寫功能，不知道怎麼讓介面好看。

現在學會了：
- 用漸層背景讓顏色不單調
- 用陰影讓元素有立體感
- 用半透明讓層次更豐富

### 2. 明白了「設計系統」的概念

好的介面不是一次做好的，而是慢慢調整：
- 先做基本結構
- 再加顏色
- 再加動畫
- 最後微調

就像穿衣服：
- 先穿內衣（基本結構）
- 再穿外套（顏色）
- 再戴首飾（動畫效果）

### 3. 學會了如何跟 AI 溝通

一開始說「太單調」AI 不懂我要什麼

後來學會了具體描述：
- ❌「太醜了」
- ✅「我要接近白色的綠色背景」

### 4. 感受到了「迭代」的重要性

不是一次就能做到最好，而是要不斷調整：
- 第一次：黑色遮罩 → 太暗
- 第二次：透明 → 太亮
- 第三次：rgba(245, 255, 248, 0.9) → 剛剛好！

這就像做菜，要慢慢調味道。
