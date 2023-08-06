<template>
  <div class="serina-input">
    <input
      :type="inputProps.type"
      :placeholder="inputProps.placeholder"
      :name="inputProps.name"
      @input="changeValue()"
      v-model="inputValue"
      :disabled="inputProps.disabled"
      @focus="inputFocus($event)"
      @blur="inputBlur($event)"
      @change="inputChange($event)"
    />
    <!-- @mousedown.prevent阻止click事件的默认行为, 即点击完毕后失去焦点的 -->
    <i
      class="serina-icon-check-circle icon"
      v-if="inputProps.clearable"
      @click="clear"
      @mousedown.prevent
    ></i>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const inputProps = defineProps({
  name: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: "text"
  },
  placeholder: {
    type: String,
    default: "请输入内容"
  },
  value: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  }
});
const inputValue = ref(inputProps.value);

const inputEmit = defineEmits(["update:modelValue", "focus", "blur", "change"]);
const changeValue = () => {
  inputEmit("update:modelValue", inputValue.value);
};

const clear = () => {
  inputValue.value = "";
};

const inputFocus = (e: FocusEvent) => {
  inputEmit("focus", e);
};

const inputBlur = (e: FocusEvent) => {
  inputEmit("blur", e);
};
const inputChange = (e: Event) => {
  inputEmit("change", e, inputValue.value);
};
</script>

<style lang="scss">
@import "../../theme-chalk/common/var.scss";
.serina-input {
  width: 200px;
  position: relative;
  input {
    display: flex;
    padding: 10px 20px 10px 10px;
    border-radius: 3px;
    outline: none;
    border: 1px solid #aca7a7cc;
    &:focus {
      border: 1px solid $--color-default;
      box-shadow: -1px 0px 2px $--color-default;
      background-color: rgb(168, 112, 215);
      color: #fff;
    }
    &[disabled] {
      cursor: not-allowed;
      background-color: #efefef;
    }
  }
  .icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
