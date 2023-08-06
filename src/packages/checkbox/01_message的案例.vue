<template>
  <div class="app">
    <div>
      <!-- 组件绑定v-model事件会以v-model:modalValue="xxx"进行双向绑定, 内部还会绑定一些事件 -->
      <!-- 在组件内实现 v-model 的方式是使用一个可写的，同时具有 getter 和 setter 的 computed 属性。get 方法需返回 modelValue prop，而 set 方法需触发相应的事件m -->
      <serina-checkbox
        v-model="checkValue"
        @handleChange="change"
        :disabled="true"
        >是否喜欢hina</serina-checkbox
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checkValue = ref("111");
const change = (val: any) => {
  console.log(val);
};
</script>

<style lang="scss"></style>
