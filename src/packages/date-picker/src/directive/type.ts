const HANDLERS_PROPERTY = "__v-click-outside";

//通过这个接口，我们可以为元素添加 HANDLERS_PROPERTY 属性，并且 TypeScript 会对这个属性的类型进行检查，确保它符合 Record<string, any> 的定义。这样，在自定义指令中，可以将事件处理函数的信息存储在 el[HANDLERS_PROPERTY] 中，并对其进行类型检查和使用
export interface IClickoutsideElement extends HTMLElement {
  [HANDLERS_PROPERTY]: Record<string, any>;
}

export interface OnEventParams {
  el: IClickoutsideElement;
  event: IClickEvent;
  handler: (event: Event) => void;
  middleware: (event: Event) => boolean;
}

// IClickEvent 还定义了一个可选属性 path，这个属性的类型是 EventTarget[]，表示一个事件对象的冒泡路径（event path）。path 属性用于存储事件冒泡时经过的所有目标元素，从触发事件的目标元素到根元素（通常是 document 或 window）
interface IClickEvent extends Event {
  path?: EventTarget[];
}

export interface IClickoutsideBindingValue {
  handler: (event: Event) => void;
  event?: Event;
  middleware?: (event: Event) => boolean;
}

export interface IClickEventObj {
  event: string;
  srcTarget: HTMLElement;
  handler: (event: Event) => void;
}
