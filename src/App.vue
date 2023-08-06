<template>
  <div class="app">
    {{ date }}
    <!-- {{ dateRange }} -->
    <serina-date-picker v-model="date"></serina-date-picker>
    <!-- <serina-date-range-picker v-model="dateRange"></serina-date-range-picker> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// 第一个是单个日期选择器，第二个是日期范围选择器
const date = ref(new Date());
const dateRange = ref([]);
</script>

<style scoped lang="scss"></style>
