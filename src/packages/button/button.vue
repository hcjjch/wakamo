<template>
  <button class="button" :class="serinaClass" @click="buttonClick">
    <!-- 传入的icon直接使用类名 -->
    <i v-if="icon" :class="icon"></i>
    <!-- $slots.default是否有插槽 -->
    <span v-if="$slots.default"><slot></slot></span>
    <span v-else>按钮</span>
  </button>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import { IButtonType } from "./type";
const buttonProps = defineProps({
  type: {
    type: String as PropType<IButtonType>, // 将值转换为PropType<IButtonType>类型
    default: "primary",
    vaildator: (val: string) => {
      // 返回一个数组, 进行规则的校验, 校验传入的val是否有数组中的值
      return [
        "primary",
        "warning",
        "danger",
        "info",
        "success",
        "default"
      ].includes(val);
    }
  },
  // 按钮的图标
  icon: {
    type: String,
    default: ""
  },
  disabeld: Boolean, // 是否禁用
  loading: Boolean, // 是否点击完按钮后禁止使用
  round: Boolean // 是否圆角
});

// 通过计算属性计算类名
// 样式中可以使用数组, 也可以使用对象, 也可以数组中使用对象
const serinaClass = computed(() => [
  "serina-button",
  // 传入不同的type, 形成不同的属性值
  "serina-button--" + buttonProps.type,
  //
  {
    "is-disabled": buttonProps.disabeld,
    "is-loading": buttonProps.loading,
    "is-round": buttonProps.round
  }
]);

// 自定义事件
// 自定义事件一定要解耦, 点击事件应该子传父, 子组件点击后在父组件中促发点击事件, 这样按钮才能有复用性
const buttonEmit = defineEmits(["click"]);

const buttonClick = () => {
  if (buttonProps.disabeld) return false;
  buttonEmit("click");
};
</script>

<style scoped></style>
