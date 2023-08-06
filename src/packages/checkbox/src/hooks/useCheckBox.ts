import { computed } from "vue";
import type { WritableComputedRef } from "vue";
import { ICheckboxProps, EmitType, laMoType } from "../types/checkbox.types";

const useModel = (props: ICheckboxProps, propEmit: EmitType) => {
  // 注意: computed
  // 在组件内实现 v-model 的方式是使用一个可写的，同时具有 getter 和 setter 的 computed 属性。get 方法需返回 modelValue prop，而 set 方法需触发相应的事件
  const model = computed({
    get() {
      // 取值时就直接返回props传递过来的modelValue
      return props.modelValue;
    },
    set(value) {
      // 在重新对model的值进行改变的时候发射一个新的事件
      propEmit("update:modelValue", value);
    }
  });
  return model;
};

const useCheckBoxStatus = (
  props: ICheckboxProps,
  model: WritableComputedRef<laMoType | unknown>
) => {
  const isChecked = computed(() => {
    const value = model.value; // 是否选中的值

    return value;
  });

  return isChecked;
};

const useEvent = (propEmit: EmitType) => {
  // 当发生change事件的时候就发送事件
  const handleChange = (payload: Event) => {
    // 拿到目标的事件并且指定具体
    const target = payload.target as HTMLInputElement;
    const changeVal = target.checked ? true : false;
    propEmit("handleChange", changeVal);
  };
  return handleChange;
};

// 这里我直接利用一个函数直接进行管理, ts的参数可以也只写一遍
export const useCheckBox = (props: ICheckboxProps, propEmit: EmitType) => {
  // 1. 设计一个属性, 这个属性就是modelValue, 还能更改, 更改的时候触发事件, 更新数据
  const model = useModel(props, propEmit);

  // 2. 需要isChecked设置一个checked状态
  const isChecked = useCheckBoxStatus(props, model);

  // 3. 创建一个change事件, 可以促发绑定到自己身上的change
  const handleChange = useEvent(propEmit);

  return {
    model,
    isChecked,
    handleChange
  };
};
