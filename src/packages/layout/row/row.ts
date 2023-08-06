import { h, defineComponent, computed, provide } from "vue";

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: "div"
    },
    // 行提供 gutter 属性来指定列之间的间距，其默认值为0
    gutter: {
      type: Number,
      default: 0
    },
    justify: {
      type: String,
      default: "start"
    }
  },
  setup(props, { slots }) {
    // 使用h函数返回虚拟节点, 每次都可以传递不同的标签, 而不需在template中使用v-if来进行标签判断
    const rowClass = computed(() => [
      "serina-row",
      props.justify !== "start" ? `is-justify-${props.justify}` : ""
    ]);
    // 为了让row能够抵制第一个col和最后一个col的padding带来的效果, 将row左右的padding的样式设置为负值
    const rowStyle = computed(() => {
      if (props.gutter !== 0) {
        return {
          "padding-left": `-${props.gutter / 2}px`,
          "padding-right": `-${props.gutter / 2}px`
        };
      }
      return {};
    });
    // 这里需要给子col组件提供gutter
    provide("gutter", props.gutter); // 给所有子组件提供gutter
    // 返回一个vnode, 这样就不需要写模板了

    return () =>
      h(
        props.tag,
        { class: rowClass.value, style: rowStyle.value },
        slots.default?.()
      );
  }
});
