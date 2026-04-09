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

## 💬 開發紀錄：第六次對話

### 📌 我問了 AI 什麼問題？

**問題 1**：  
> 「全部、漢堡、貝果那邊像摩斯漢堡美味專區依樣，但我想把它改成可以縮排的」

**問題 2**：  
> 「像 Reddit 的導航列那樣的設計」

**問題 3**：  
> 「下拉選單刪掉，點擊 ☰ 後展開垂直排列的分類按鈕」

**問題 4**：  
> 「☰ 圖示按鈕點開沒反應，還有上面白色區塊很單調」

---

### 🎯 這次學到的功能

**1. 下拉選單（Dropdown Menu）**

就像餐廳的菜單：
- 點一下按鈕 → 展開顯示選項
- 選一個選項 → 選項被套用，選單收合

**2. 絕對定位（Absolute Positioning）**

下拉選單用 `position: absolute` 放在按鈕下面，
這樣展開時不會把其他東西往下推。

**3. z-index 層級**

下拉選單要用 `z-index: 1000` 才能顯示在其他元素上面，
就像疊在一起的紙張，z-index 決定哪張在最上面。

---

### 🎯 這次學到的生活比喻

| 概念 | 比喻 | 意思 |
|------|------|------|
| `position: absolute` | **浮在空中** | 元素浮起來，不影響其他東西的位置 |
| `z-index` | **紙張層級** | 疊在一起的紙，數字越大越在上面 |
| `dropdown` | **拉下來的菜單** | 點擊後向下展開的選項列表 |

---

### 📝 這次修改的內容

**Menu.vue 修改：**

1. **頂部區域美化**
   - 背景改成綠色漸層
   - 返回按鈕變成白色
   - 用戶名加上圓角背景

2. **☰ 分類篩選按鈕**
   - 圓角膠囊設計
   - hover 時邊框變綠色

3. **下拉選單（Dropdown）**
   - 絕對定位，不影響高度
   - 有陰影效果
   - 點擊後自動收合

4. **搜尋框美化**
   - 用 CSS ::before 顯示搜尋圖示
   - 透明背景配圓角

---

### 📝 最終效果示意圖

```
┌────────────────────────────────────────────────────────┐
│ [綠色漸層背景]                                        │
│                                                        │
│  ← 返回                              👤 用戶名         │
│                                                        │
│  ☰ 分類篩選                        🔍 搜尋餐點...     │
│                                                        │
│  （點擊後展開）                                        │
│  ☰ 分類篩選  ┌────────────┐                          │
│              │ 全部       │                          │
│              │ 🍔 漢堡    │                          │
│              │ 🥯 貝果    │                          │
│              │ 🥪 三明治  │                          │
│              └────────────┘                          │
└────────────────────────────────────────────────────────┘
```

---

### 📝 遇到問題與修復

**問題：下拉選單點擊沒反應**

原因：`selectCategory` 函數被誤刪了

修復：重新加入函數
```javascript
const selectCategory = (category: string) => {
  selectedCategory.value = category
}
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

## 💬 開發紀錄：第四次對話

### 📌 我問了 AI 什麼問題？

**問題 1**：  
> 「我要把主選單頁面加上和登入頁面一樣的極淺綠色背景」

**問題 2**：  
> 「選擇取餐方式頁面也要加極淺綠背景」

**問題 3**：  
> 「版面太擁擠了，請幫我排鬆散一點」

**問題 4**：  
> 「訂單確認頁面也要加極淺綠背景」

---

### 🎯 這次學到的版面調整技巧

**1. 格線系統 (Grid)**

用 `repeat(auto-fill, minmax(180px, 1fr))` 自動調整卡片數量：
```css
/* 每張卡片最少 180px，最大平分剩餘空間 */
grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
```

**2. 調整間距 (Gap)**

增加卡片之間的距離：
```css
gap: 20px;  /* 從 15px 增加到 20px */
```

**3. 增加內距 (Padding)**

讓卡片內容不要太擁擠：
```css
.menu-card {
  padding: 20px;  /* 從 15px 增加到 20px */
}
```

**4. 圖片高度調整**

讓圖片大一點：
```css
.menu-image {
  height: 140px;  /* 從 120px 增加到 140px */
}
```

---

### 📝 這次修改的內容

**所有頁面都添加了極淺綠色背景：**

```css
background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
```

**Menu.vue 版面調整：**

1. 餐點卡片 grid 間距：15px → 20px
2. 餐點卡片 padding：15px → 20px
3. 餐點圖片高度：120px → 140px
4. 分類標籤 gap：10px → 15px
5. 分類標籤 padding：15px → 20px
6. 購物籃項目 padding：10px → 15px

**修改的檔案：**
- `OrderType.vue`：選擇取餐方式頁面
- `Menu.vue`：主選單頁面
- `OrderConfirm.vue`：訂單確認頁面

---

### 📝 版面設計常用術語（白話版）

| 術語 | 白話 | 用途 |
|------|------|------|
| `gap` | **間距** | 東西和東西之間的距離 |
| `padding` | **內距** | 東西裡面的空白 |
| `margin` | **外距** | 東西外面的空白 |
| `grid-template-columns` | **欄位設定** | 決定一行放幾個 |
| `auto-fill` | **自動填滿** | 盡量填滿一行 |
| `minmax()` | **最大最小值** | 東西最大/最小可以到哪 |

---

## 💬 開發紀錄：第五次對話

### 📌 我問了 AI 什麼問題？

**問題 1**：  
> 「全部、漢堡、貝果那邊像摩斯漢堡美味專區依樣，但我想把它改成可以縮排的」

**問題 2**：  
> 「分類按鈕（全部、漢堡、貝果、三明治）改成可縮排的樣式就好」

**問題 3**：  
> 「C並把她的位置規劃的跟摩斯漢堡美味專區依樣」

---

### 🎯 這次學到的功能

**可折疊面板（Collapse Panel）**

就像資料夾：
- 點一下打開資料夾 → 看到裡面的檔案（展開）
- 再點一下關上資料夾 → 隱藏裡面的檔案（收合）

**程式碼核心：**
```javascript
// 用一個「開關」控制顯示/隱藏
const showCategory = ref(false)

// 切換開關狀態
const toggleCategory = () => {
  showCategory.value = !showCategory.value
}
```

**HTML 核心：**
```html
<!-- 按鈕：點擊後切換 -->
<div @click="toggleCategory">
  ☰ 分類篩選 {{ showCategory ? '▲' : '▼' }}
</div>

<!-- 內容：根據開關決定要不要顯示 -->
<div v-if="showCategory">
  [全部] [🍔 漢堡] [🥯 貝果] [🥪 三明治]
</div>
```

---

### 📝 這次修改的內容

**Menu.vue 修改：**

1. **JS 新增**
   - `showCategory` 盒子：控制面板展開/收合
   - `toggleCategory` 函數：切換面板狀態

2. **HTML 重構**
   - 分類面板從 header 移出來，變成獨立的折疊面板
   - 新增「☰ 分類篩選」按鈕，點擊可以展開/收合

3. **CSS 新增**
   - `.category-panel`：整個分類面板的容器
   - `.category-toggle`：展開/收合的按鈕
   - `.toggle-arrow`：箭頭符號（▲/▼）
   - `.category-tabs`：展開後的分類按鈕列

---

### 📝 效果示意圖

```
【預設（收合）】
┌─────────────────────────────────────────────┐
│  ☰ 分類篩選                            ▼   │
└─────────────────────────────────────────────┘

【點擊後（展開）】
┌─────────────────────────────────────────────┐
│  ☰ 分類篩選                            ▲   │
├─────────────────────────────────────────────┤
│  [全部]  [🍔 漢堡]  [🥯 貝果]  [🥪 三明治]  │
└─────────────────────────────────────────────┘
```

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
