import { IType } from "../types/message.types";
import { PropType } from "vue";
export const messageP = {
  id: {
    type: String,
    default: ""
  },
  message: {
    type: String,
    default: ""
  },
  type: {
    type: String as PropType<IType>,
    default: "info",
    vaildator: (val: string) => {
      return ["success", "warning", "info", "error"].includes(val);
    }
  },
  duration: {
    type: Number,
    default: 0
  },
  center: {
    type: Boolean,
    default: true
  },
  onClose: {
    // 函数
    type: Function as PropType<() => void>
  },
  offset: {
    type: Number,
    default: 20
  }
};
