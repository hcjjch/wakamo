<template>
  <div class="serina-checkbox">
    <span class="serina-checkbox__input">
      {{ modelValue }}
      {{ isChecked }}
      <input
        type="checkbox"
        v-model="model"
        :checked="Boolean(isChecked)"
        @change="handleChange"
        :indeterminate="false"
        :name="name"
      />
    </span>
    <span class="serina-checkbox-label">
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useCheckBox } from "./hooks/useCheckBox";
const checkProps = defineProps({
  name: String,
  indeterminate: Boolean,
  checked: Boolean,
  disabled: Boolean,
  label: [String, Number, Boolean],
  modelValue: [String, Number, Boolean]
});
// setup组件创建之前就调用函数
const propEmit = defineEmits(["update:modelValue", "handleChange"]);

let { model, isChecked, handleChange } = useCheckBox(checkProps, propEmit);
</script>

<style scoped></style>
