<!-- 进度条组件 -->
<template>
  <div class="serina-progress">
    <div class="bar">
      <div class="bar-outer" :style="{ height: strokeWidth + 'px' }"></div>
      <div class="bar-inner" :style="barStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const barStyle = computed(() => {
  // width: progressProps.percentage + "%",
  //   height: progressProps.strokeWidth + "px",
  //   backgroundColor: progressProps.color
  // 将上面的对象定义为变量
  const width = progressProps.percentage + "%";
  const height = progressProps.strokeWidth + "px";
  let backgroundColor = progressProps.color;
  if (parseInt(width) < 80 && parseInt(width) > 50) {
    backgroundColor = "red";
  }
  if (parseInt(width) > 80) {
    backgroundColor = "green";
  }
  return {
    width,
    height,
    backgroundColor
  };
});
console.log(barStyle.value);

const progressProps = defineProps({
  // 进度条高度
  strokeWidth: {
    type: Number,
    default: 6
  },
  // 百分比
  percentage: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: "#409eff"
  }
});
</script>

<style lang="scss">
.serina-progress {
  .bar {
    position: relative;
    height: 6px;
    .bar-outer {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #ebeef5;
      border-radius: 100px;
    }
    .bar-inner {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background-color: #409eff;
      border-radius: 100px;
      transition: width 0.3s;
    }
  }
}
</style>
