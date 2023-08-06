<template>
  <div class="serina-header">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "Header"
};
</script>

<script setup lang="ts"></script>

<style lang="scss">
.serina-header {
  height: 60px;
  background-color: aqua;
}
</style>
