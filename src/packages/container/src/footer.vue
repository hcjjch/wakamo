<template>
  <div class="serina-footer">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "Footer"
};
</script>

<script setup lang="ts"></script>

<style lang="scss">
.serina-footer {
  height: 60px;
  background-color: bisque;
}
</style>
