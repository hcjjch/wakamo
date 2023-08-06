/*
这个col和row提供最基本的两个元素
并且使用h函数直接进行渲染, 这样如果要渲染不同的标签直接使用
return () => h(props.tag, {}, slots.default?.());
在props中传递不同的属性标签名就可以了,传递一个p或者div
而不是在模板中使用大量的v-if来进行选择是p标签或者div标签等
*/
import col from "./col/col";
import row from "./row/row";

export { col, row };
