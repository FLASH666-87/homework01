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
    ├── Login.vue → 登入房間
    └── Home.vue  → 點餐房間
```

---

## ⚙️ 技術棧

- **Vue 3**（便當盒框架）
- **Vue Router**（導航機）
- **TypeScript**（讓程式碼不會打錯字）
- **Vite**（讓開發變快的工具）

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
