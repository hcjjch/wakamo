export type IType = "success" | "warning" | "info" | "error";
export interface IMessageOptions {
  // 每弹出一个框, 就做一个标记
  id?: string; // 使用id进行描述和标记
  message?: string; // 弹出的信息
  type?: IType; // 弹出框的类型
  duration?: number; // 定时器
  center?: boolean; // 文字是否居中
  onClose?: () => void; // 关闭的回调函数
  offset?: number;
}

export type IMessageParamas = IMessageOptions | string;
