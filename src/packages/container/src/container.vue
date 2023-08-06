<template>
  <div :class="containerClass">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUpdated, getCurrentInstance } from "vue";
import { VNodeTypes } from "vue";
const instance = getCurrentInstance();
const isvertical = ref(false);

// 子组件遍历
const checkVertical = () => {
  const instanceArray = instance?.slots.default?.();

  return instanceArray?.every((item) => {
    const type: any = item.type;
    const name = type.name;
    if (name === "Header" || name === "Footer") {
      console.log(456);

      return false;
    } else {
      console.log(123);

      return true;
    }
  });
};

const checkType = () => {
  if (typeof checkVertical() === "boolean") {
    isvertical.value = !checkVertical();
  }
};

onMounted(() => {
  checkType();
});
onUpdated(() => {
  checkType();
});

const containerClass = computed(() => [
  "serina-container",
  isvertical.value ? "is-vertical" : ""
]);
</script>

<style scoped></style>
