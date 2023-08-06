// 只有当超出区域才会触发事件

import {
  IClickoutsideElement,
  OnEventParams,
  IClickoutsideBindingValue,
  IClickEventObj
} from "./type";
// 定义存储事件的数组
const HANDLERS_PROPERTY = "__v-click-outside";

// 默认事件为点击事件
const EVENTS = ["click"];

const processDirectiveArguments = (value: any) => {
  const isFunction = typeof value === "function";
  if (!isFunction && typeof value !== "object") {
    throw new Error("请传入一个数组或对象");
  }
  return {
    // 判断是否为函数, 是的话使用value, 否则使用value中的handler
    handler: isFunction ? value : value.handler,
    event: value.event ?? EVENTS,
    middleware: value.middleware ?? ((item: any) => item),
    // 这里使用这种写法, 如果isActive不存在, 整体就为false, 否则整体就为true
    isActive: !(value.isActive === false),
    // 通过 !! 运算符，将 bindingValue.capture 转换为布尔类型。如果 bindingValue.capture 为真值（即不为 false、null、undefined、0、NaN 或空字符串），则 !!bindingValue.capture 为 true；否则，为 false。
    capture: !!value.capture
  };
};

// 判断当前事件是否在指定的目标区域
const onEvent = ({ el, event, handler, middleware }: OnEventParams) => {
  // 这里使用冒泡进行处理

  const path = event.path || (event.composedPath && event.composedPath());
  // 是否超出区域
  const isOutSide = path
    ? path.indexOf(el) < 0
    : !el.contains(event.target as any);

  if (!isOutSide) return;
  // 超出区域, 执行函数
  execHandler({ event, handler, middleware });
};

// 事件的实际执行函数
const execHandler = ({
  event,
  handler,
  middleware
}: IClickoutsideBindingValue) => {
  // 中间函数对参数进行处理
  if (event && middleware && middleware(event)) {
    handler(event);
  }
};

// 定义一个beforeMount函数, 并且这个函数的第一个参数是el, 是真实的dom节点, 第二个参数是binding, 是虚拟dom节点, 并声明好类型
// 绑定时机：beforeMount 钩子函数在指令绑定时执行，而 mounted 钩子函数在指令挂载到元素后执行。如果你希望在元素绑定指令时立即添加事件监听器，应该选择在 beforeMount 钩子函数中执行。这样可以确保事件监听器在指令绑定到元素时立即生效。
// 避免重复绑定：如果在 mounted 钩子函数中添加事件监听器，可能会导致事件监听器的重复绑定。每次组件重新渲染时，mounted 钩子函数都会被调用，而如果在其中添加事件监听器，可能会导致相同的事件监听器被重复绑定，从而引发多次触发相同事件的问题。
// 避免内存泄漏：在 beforeMount 钩子函数中添加事件监听器，可以确保在指令解绑时（比如组件被销毁时）及时移除事件监听器，避免可能导致的内存泄漏问题。而在 mounted 钩子函数中添加事件监听器，可能会导致监听器没有正确移除，从而造成内存泄漏
const beforeMount = (el: IClickoutsideElement, binding: any) => {
  const { handler, event, middleware, isActive, capture } =
    processDirectiveArguments(binding.value);
  // 使用map函数对每一个参数进行扩展的处理
  el[HANDLERS_PROPERTY] = event.map((eventName: string) => ({
    // 事件名
    event: eventName,
    // 绑定的目标事件是documentElement对象
    srcTarget: document.documentElement,
    // 这个event的参数是addEventListener的第一个参数, 也就是事件名, 是默认传递的
    handler: (event: Event) => onEvent({ el, event, handler, middleware })
  }));

  // 添加点击事件
  el[HANDLERS_PROPERTY].forEach((item: IClickEventObj) => {
    // 在documentElement对象上添加事件
    item.srcTarget.addEventListener(item.event, item.handler, capture);
  });
};

const beforeUnmount = () => {};

const update = () => {};

const directive = {
  beforeMount,
  beforeUnmount,
  update
};

export default directive;
