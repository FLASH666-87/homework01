# 🍔 宇宇早餐線上點餐系統

> 這是一個用 Vue 3 開發的早餐店線上點餐系統

---

## 💬 開發紀錄：我與 AI 的對話

### 📌 我（開發者）問了 AI 什麼問題？

**問題**：  
> 「我要開發一個線上店餐的頁面，還記得嗎」  
> 「請幫我完成內用/自取切換這個頁面，需要每一行附加註釋」

**我想要理解的是**：
1. Vue 的程式碼在寫什麼？
2. 那些陌生的英文單字（ref、v-if、v-for）是什麼意思？
3. 怎麼用 Vue 做出一個可以切換內用/自取的頁面？

---

### 🎯 AI 給我的「生活比喻」，讓我聽懂了！

| Vue 概念 | AI 說的比喻 | 我現在懂了 |
|----------|-------------|------------|
| `ref` | **「盒子」** | 用來存放會變動的資料，例如：名字、價格開關 |
| `v-if` | **「開關」** | 決定要不要顯示某個東西，按下去就出現/消失 |
| `v-for` | **「影印機」** | 把同樣的東西複製好幾份，例如：10個餐點卡片 |
| `v-model` | **「傳聲筒」** | 把輸入框打的字，直接傳到盒子裡 |
| `RouterView` | **「投影機」** | 會把對應的頁面內容投影在這裡顯示 |
| `function` | **「服務生」** | 負責去做事情，例如：加到購物車、刪除東西 |
| `router` | **「導航機」** | 幫助跳轉到不同頁面 |

---

### 🧠 我學到的重點

1. **所有會變動的資料，都放在「盒子」裡**
   - 例如：`const name = ref("小明")` 就是放一個叫 name 的盒子，裡面裝 "小明"

2. **所有會做的動作，都寫成「服務生函數」**
   - 例如：`addToCart()` 就是一個服務生，負責把東西加到購物車

3. **HTML 標籤上綁定「事件監聽器」**
   - 用 `@click="服務生函數"` 讓按鈕被按下去時，叫服務生做事

4. **用「影印機」印出很多一樣的東西**
   - 用 `v-for` 可以把同樣的卡片複製很多份，只是內容不同

---

### 📝 AI 寫的程式碼特色

每一行程式碼旁邊都有**白話文註解**，例如：

```vue
// 放一個叫 isDineIn 的盒子，預設是 true（內用模式）
// 如果是 false 就是自取模式
const isDineIn = ref(true)

// 把模式切換成內用
// 按下去後會把 isDineIn 盒子設成 true
const switchToDineIn = () => {
  isDineIn.value = true
}
```

這樣我就可以一邊看程式碼，一邊知道它在做什麼了！

---

## 🚀 啟動專案

```sh
npm install
npm run dev
```

然後打開 http://localhost:5173 就能看到網頁了！

---

## 📁 專案結構（用便當盒比喻）

```
src/
├── main.ts      → 開啟便當盒的說明書
├── App.vue      → 便當盒的主要容器
├── router/      → 房間門牌號管理員
└── views/       → 房間（頁面）
    ├── Login.vue         → 登入房間
    ├── OrderType.vue     → 選擇內用/自取房間（接待員）
    ├── Menu.vue          → 點餐房間（主選單）
    └── OrderConfirm.vue  → 結帳房間（確認訂單）
```

---

## 💬 開發紀錄：第二次對話

### 📌 我問了 AI 什麼問題？

**問題 1**：  
> 「請把內用和到店自取跟主選單分割成兩個不同的頁面，主選單在後，還有幫我修正漢堡、貝果、三明治無法整理畫面的問題」

**問題 2**：  
> 「我要的訂單編號要是三位數字就好」

**我想要理解的是**：
1. 怎麼把一個頁面變成多個頁面？
2. 為什麼分類篩選（漢堡/貝果/三明治）沒有作用？
3. 怎麼在送出訂單後顯示訂單編號？

---

### 🎯 AI 給我的新「生活比喻」

| Vue 概念 | AI 說的比喻 | 我現在懂了 |
|----------|-------------|------------|
| `computed` | **「自動計算機」** | 會自動計算結果，資料變了它也會跟著變 |
| `localStorage` | **「小本子」** | 可以把資料暫時記住，在不同頁面之間傳遞 |
| `router.push()` | **「傳送門」** | 按下去就跳到另一個房間（頁面） |
| 多個 `.vue` 頁面 | **「多個房間」** | 每個頁面是一個房間，客人一步一步走 |
| 分頁流程 | **「餐廳動線」** | 客人：登入 → 選內用/自取 → 點餐 → 結帳 |
| 訂單編號 | **「餐廳號碼牌」** | 只需要 3 位數字就能區分 |

---

### 🧠 這次學到的新重點

**1. 為什麼分類篩選沒作用？**

一開始點「漢堡」按鈕，畫面還是顯示所有餐點。

原因是：
- `menuItems` 一直都是全部 20 個餐點
- HTML 顯示的是 `menuItems`，沒有被過濾

解決方法是用 `computed` 做一個「過濾器」：
```javascript
// 這個是「過濾器」，會根據條件自動過濾餐點
const filteredMenuItems = computed(() => {
  let items = menuItems.value  // 一開始是全部20個
  
  // 第一關：檢查有沒有選分類
  if (selectedCategory.value !== 'all') {
    items = items.filter(item => item.category === selectedCategory.value)
  }
  
  // 第二關：檢查有沒有打搜尋
  if (searchKeyword.value.trim()) {
    items = items.filter(item => item.name.includes(searchKeyword.value))
  }
  
  return items  // 把過濾後的結果傳回去
})
```

**比喻：**  
> 就像餐廳有一個「篩子」，把「漢堡」的洞放到篩子上 → 只剩下漢堡

---

**2. 不同頁面之間怎麼傳資料？**

用 `localStorage` 就像餐廳的「小本子」：
```javascript
// 把資料寫到小本子
localStorage.setItem('orderData', JSON.stringify(orderData))

// 從小本子讀資料
const orderDataJson = localStorage.getItem('orderData')
const orderData = JSON.parse(orderDataJson)
```

---

**3. 頁面跳轉流程（餐廳動線）**

```
1. /login（登入房間）→ 驗證身份
   ↓
2. /order-type（接待員）→ 選內用或自取
   ↓
3. /menu（點餐區）→ 開始選餐點
   ↓ 點「送出訂單」
4. /order-confirm（結帳區）→ 選擇支付方式 → 顯示訂單編號
```

---

### 📝 這次新增的功能

**新增的頁面：**
- `OrderType.vue`：選擇內用/自取的頁面
- `OrderConfirm.vue`：訂單確認和完成的頁面

**修改的功能：**
- 分類篩選：終於能正確過濾餐點了！
- 送出訂單：多了確認對話框
- 訂單編號：改成 3 位數字

---

### 📝 AI 寫的程式碼特色

這次學到了 `computed` 和 `localStorage` 的用法：

```javascript
// computed：自動計算機
const filteredMenuItems = computed(() => {
  return menuItems.value.filter(item => item.category === selectedCategory.value)
})

// localStorage：小本子（在不同頁面之間傳資料）
localStorage.setItem('data', JSON.stringify(data))
const data = JSON.parse(localStorage.getItem('data'))
```

---

## ⚙️ 技術棧

- **Vue 3**（便當盒框架）
- **Vue Router**（傳送門）
- **localStorage**（小本子）
- **computed**（自動計算機）
- **TypeScript**（讓程式碼不會打錯字）
- **Vite**（讓開發變快的工具）

---

## 💬 開發紀錄：第三次對話

### 📌 我問了 AI 什麼問題？

**問題 1**：  
> 「登入介面的宇宇早餐顏色及字體太單調，左邊的圖片也是」

**問題 2**：  
> 「請把剛剛更改的地方解釋一次」

**問題 3**：  
> 「請把內用和到店自取跟主選單分割成兩個不同的頁面，主選單在後，還有幫我修正漢堡、貝果、三明治無法整理畫面的問題」

**問題 4**：  
> 「我要的訂單編號要是三位數字就好」

**問題 5**：  
> 「再幫我寫送出訂單後的東西，點送出電單先確認是否送出，而後再跳出用信用卡繳款或是現場支付的圖示，在跳到下一個頁面，顯示您的訂單編號」

**問題 6**：  
> 「請啟動伺服器」

**問題 7**：  
> 「login介面的宇宇早餐顏色及字體太單調，請幫我美觀，左邊的圖片也是」

**問題 8**：  
> 「請在幫我美觀一下，比如圖片間的界線模糊處理」

**問題 9**：  
> 「請在幫我美觀一下，比如圖片間的界線模糊處理」

**問題 10**：  
> 「我要的是接近白色的綠色，改右邊的底色就好」

---

### 🎯 這次學到的 UI/UX 設計概念

**1. 左右兩欄佈局**

就像一本打開的書：
- **左邊**（品牌區）：放圖片和品牌形象
- **右邊**（表單區）：放輸入框和按鈕

**2. 背景漸層效果**

用 `linear-gradient` 做出好看的漸層：
```css
/* 從一種顏色慢慢變到另一種顏色 */
background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
```

**3. 半透明效果**

用 `rgba` 讓背景透出來：
```css
/* 最後一個參數是透明度（0 = 完全透明，1 = 完全不透明）*/
background: rgba(245, 255, 248, 0.9);
```

**4. 圖片半透明**

讓圖片變淡，讓底色透出來：
```css
.brand-image {
  opacity: 0.5;  /* 50% 透明 */
}
```

**5. 毛玻璃效果**

用 `backdrop-filter: blur()` 做出霧面玻璃的感覺：
```css
.feature-icon {
  backdrop-filter: blur(10px);
}
```

**6. 陰影效果**

讓元素有立體感：
```css
box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
```

---

### 📝 這次修改的內容

**登入頁面大改造：**

1. **左邊品牌區**
   - 更換背景圖片
   - 添加淡綠色底色
   - 圖片半透明處理
   - 文字增加陰影

2. **右邊表單區**
   - 新增表單標題（「歡迎回來」/「加入我們」）
   - 表單卡片增加陰影
   - 背景變成接近白色的淡綠色

3. **輸入框和按鈕美化**
   - 輸入框增加陰影
   - 按鈕 hover 時往上飄

---

### 📝 CSS 樣式常用屬性

| 屬性 | 用途 | 範例 |
|------|------|------|
| `linear-gradient` | 漸層背景 | `linear-gradient(135deg, #e8f5e9, #c8e6c9)` |
| `rgba` | 半透明顏色 | `rgba(245, 255, 248, 0.9)` |
| `opacity` | 元素透明度 | `opacity: 0.5` |
| `backdrop-filter: blur()` | 毛玻璃效果 | `backdrop-filter: blur(10px)` |
| `box-shadow` | 陰影 | `box-shadow: 0 10px 30px rgba(0,0,0,0.2)` |
| `border-radius` | 圓角 | `border-radius: 30px` |
| `transition` | 動畫過渡 | `transition: all 0.3s` |
| `transform: translateY()` | 往上移動 | `transform: translateY(-5px)` |

---

## ⚙️ 技術棧

- **Vue 3**（便當盒框架）
- **Vue Router**（導航機）
- **TypeScript**（讓程式碼不會打錯字）
- **Vite**（讓開發變快的工具）

---

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
