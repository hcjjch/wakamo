<template>
  <div class="serina-aside" :style="asideStype">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "Aside"
};
</script>

<script setup lang="ts">
import { computed } from "vue";
const asideProps = defineProps({
  width: {
    type: String,
    default: "300px"
  }
});

const asideStype = computed(() => {
  return {
    width: asideProps.width
  };
});
</script>

<style scoped>
.serina-aside {
  background-color: blueviolet;
}
</style>
