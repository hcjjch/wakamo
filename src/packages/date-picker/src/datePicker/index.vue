<template>
  <div class="serina-date-picker" v-clickoutside="handleBlur">
    <serina-input
      placeholder="请选择日期"
      @focus="handleFocus"
      @change="handleChange"
      :value="formatValue"
    ></serina-input>
    <div
      class="serina-date-picker-content"
      v-show="isShow"
      :class="{ show: isShow }"
    >
      <div class="serina-date-picker-header">
        <i class="serina-icon-prev"></i>
        <i class="serina-icon-prev1"></i>

        <span>{{ `${dateTitle.years} 年 ${dateTitle.month} 月 ` }}</span>

        <i class="serina-icon-next"></i>
        <i class="serina-icon-next1"></i>
      </div>
      <div class="serina-date-picker-body">
        <template v-if="mode === 'dates'">
          <div>
            <span v-for="(item, index) in weeks" :key="index">{{ item }}</span>
          </div>
          <div v-for="i in 6" :key="`row_${i}`">
            <span v-for="j in 7" :key="`line_${j}`">1</span>
          </div>
        </template>
        <span v-else-if="mode === 'years'">years</span>
        <span v-else>months</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import directive from "../directive/clickOutside";
import getYearsMonthDay from "../../utils/getYearsMonthDay";

// 自定义指令
const vClickoutside = directive;

const mode = "dates"; // 选择的模式, dates, years, months

const isShow = ref(false);

const datePickerProps = defineProps({
  // 默认值是一个字符串或者date类型，返回一个Date对象
  modelValue: {
    type: [String, Date],
    default: () => new Date()
  }
});

// 输入框的日期格式
const formatValue = computed(() => {
  const { year, month, day } = getYearsMonthDay(datePickerProps.modelValue);
  return `${year} - ${month + 1} - ${day}`;
});

// 显示的日期
const { year, month, day } = getYearsMonthDay(datePickerProps.modelValue);
const dateTitle = reactive({
  years: year,
  month: month,
  day: day
});

const weeks = ["日", "一", "二", "三", "四", "五", "六"];
const months = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月"
];

const datePickerEmits = defineEmits(["update:modelValue"]);
const handleFocus = (e: FocusEvent) => {
  // 当点击输入框的时候就显示
  isShow.value = true;
};
const handleBlur = (event: any) => {
  // 当点击整个div外层时就隐藏弹框
  // console.log(event);

  isShow.value = false;
};
const handleChange = (e: Event, value: any) => {
  console.log("change", value);
};

const visibleDate = computed(() => {
  const firstDay = new Date(dateTitle.years, dateTitle.month, 1);
  return 1;
});
</script>

<style lang="scss">
.serina-date-picker {
  display: inline-block;
  position: relative;
  .serina-date-picker-content {
    position: absolute;
    top: 100%;
    left: 0;
    width: 280px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    z-index: 100;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
    display: none;
    &.show {
      display: block;
    }
    .serina-date-picker-header {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      justify-content: space-around;
    }
    .serina-date-picker-body {
      > * {
        display: flex;
        justify-content: space-around;
        span {
          padding: 7px;
        }
      }
    }
    .serina-date-picker-header {
      height: 40px;
    }
  }
}
</style>
