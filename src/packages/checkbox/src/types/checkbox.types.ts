export type laMoType = string | number | boolean;

// 由于组件中需要传入props进行处理, 所以定义类型进行使用
export interface ICheckboxProps {
  indeterminate?: boolean; // 是否半选
  checked?: boolean; // 是否选中
  name?: string; // 原生name属性
  disabled: boolean; // 是否禁用
  label?: laMoType;
  modelValue?: laMoType; // 绑定checkbox的值
}

export type EmitType = (
  event: "update:modelValue" | "handleChange",
  ...args: any[]
) => void;
