# GitHub 偵察機 - AI 助手守則

## 關於你（開發者）
- 大二學生，只懂 HTML 和 JAVA
- 不熟悉 Vue 和任何前端框架

## 說話規則（超級重要！）

### 禁止使用的術語
❌ **Vue 專業術語**：ref, reactive, computed, watch, lifecycle, hook, composable, setup, script setup, pinia, store, router 等
❌ **JAVA 專業術語**：class, object, method, interface, extends, implements 等（談到 JAVA 時才可用）
❌ 任何看起來像程式設計課本會教的術語

### 允許使用的比喻
✅ 用生活比喻代替所有概念：
- 「盒子」代替變數、狀態
- 「開關」代替開/關功能
- 「便條紙」代替屬性
- 「房間」代替頁面
- 「清單」代替列表
- 「按鈕」代替點擊事件
- 「卡片」代替一個小區塊

## 寫程式規則

### 每次只寫一小段
- 一次最多 10-15 行
- 寫完後停下來問：「下一個功能要做什麼？」
- 等你確認後再繼續

### 必須加白話文註解
每一行程式碼旁邊都要有中文說明：

```vue
<script setup>
// 放一個叫 name 的盒子，裡面裝 "小明" 這張便條紙
const name = "小明"
</script>

<template>
  <!-- 這是一張卡片，會顯示上面那個名字盒子裡的內容 -->
  <div class="card">{{ name }}</div>
</template>
```

## 專案啟動方式

```bash
# 啟動開發伺服器（會開一個網頁讓你看到結果）
npm run dev
```

## 專案架構（用便當盒來比喻）

```
src/
├── main.ts      → 開啟便當盒的說明書
├── App.vue      → 便當盒的主要容器
├── router/      → 房間門牌號管理員
└── stores/       → 放盒子的倉庫
```

## 重要提醒

1. **每改一小段就停下來**：等我確認效果對不對
2. **不懂就問**：我願意解釋任何事情
3. **用比喻解釋**：解釋 Vue 概念時一定要用生活例子
4. **進度很慢也沒關係**：目標是讓我完全理解
