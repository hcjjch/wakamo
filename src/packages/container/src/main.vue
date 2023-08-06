<template>
  <div class="serina-main"><slot></slot></div>
</template>

<script lang="ts">
export default {
  name: "Main"
};
</script>
<script setup lang="ts"></script>

<style lang="scss">
.serina-main {
  //占据其余的位置
  flex: 1;
  padding: 20px;
  background-color: rgb(115, 108, 100);
}
</style>
