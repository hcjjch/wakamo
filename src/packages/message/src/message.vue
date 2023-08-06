<template>
  <!-- 在组件移除的时候触发一个事件 -->
  <transition
    name="serina-message-fade"
    @before-leave="onClose"
    @after-leave="$emit('destrory')"
  >
    <!-- 不使用v-show和v-if进行销毁的话是因为可能还有其他的dom元素在transtion之外, 这样不能全部销毁  -->
    <div :class="messageClass" v-show="visible">{{ messageProps.message }}</div>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { messageP } from "./props/index";

const messageProps = defineProps(messageP);
const visible = ref(false);
let timer: any = null;

const stratTimer = (duration: number) => {
  timer = setTimeout(() => {
    visible.value = false;
  }, duration);
};

// 组件挂载的时候就将值改变
onMounted(() => {
  visible.value = true;

  stratTimer(messageProps.duration);
});

onUnmounted(() => {
  console.log("组件被销毁");

  clearTimeout(timer);
});

const messageClass = computed(() => [
  "serina-message",
  "serina-message--" + messageProps.type,
  messageProps.center ? "is-center" : ""
]);
</script>

<style scoped></style>
