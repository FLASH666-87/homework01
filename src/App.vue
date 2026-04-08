<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- RouterView 就像是一個「投影機」 -->
  <!-- 會把對應的頁面內容投影在這裡顯示 -->
  <RouterView />
</template>

<style>
/* 這裡放全站的預設樣式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
