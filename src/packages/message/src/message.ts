import { VNode, createVNode, render } from "vue";

import { IMessageParamas } from "./types/message.types";
import MessageComponent from "./message.vue";

const instance: VNode[] = [];

// 调用这个函数的时候就动态生成message组件
const Message = (options: IMessageParamas) => {
  if (typeof options === "string") {
    // 如果是字符串的话, 就将字符串转换为对象
    options = {
      // 在其中添加一个message的属性, 值就是传入的字符串options
      message: options
    };
  }

  // 将offset拿出来之后, 当有多少个item的时候, 就添加多少个item的偏移量
  let offset = options.offset || 20;

  instance.forEach((item, index) => {
    offset = item.el ? index * 80 + 20 : 20;
  }); // 创建组件的时候就创建偏移量
  // 在这这里肯定是一个对象

  // options就是一个对象, 根据这个选项渲染出一个组件

  // 1. 元素应该渲染到哪里, 在这里需要将组件手动挂载, 在这里我是动态的创建节点, 然后动态的渲染和动态的挂载
  // 使用createVnode(component) => render(component, container)
  const usercClose = options.onClose;
  const opts = {
    ...options,
    offset,
    // 在这里重写onClose是为了能在调用用户的onClose的同时将组件进行销毁
    onClose: () => {
      // 可选链, 有的时候就执行userClose函数, 否则就不执行
      usercClose?.();
    }
  };
  console.log(opts);
  const container = document.createElement("div");
  // 第二个值传递一个props, 这个props就将上面的选项传递进去
  const vm = createVNode(MessageComponent, opts as any);
  instance.push(vm);

  // 将vm渲染到container上
  render(vm, container);

  // 需要将渲染后的结果挂载到body上 !永不为空
  document.body.appendChild(container.firstElementChild!);
  // 组件在这里创建, 就在这里监听事件
  vm.props!.onDestrory = () => {
    render(null, container);
  };
};

export default Message;
