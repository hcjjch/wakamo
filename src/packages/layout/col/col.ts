import { h, defineComponent, computed, inject } from "vue";

// 返回一个vnode, 这样就不需要写模板了
export default defineComponent({
  props: {
    tag: {
      type: String,
      default: "div"
    },
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: 0
    }
  },
  setup(props, { slots }) {
    const gutter = inject("gutter", 0);

    // 根据span和offset的名字和传入的数据提供span和offset的类名
    const colClass = computed(() => {
      // 将span和offset作为常量进行使用, 这样就能让pos确定是span或者offset而不是模糊的string
      // 这样就可以结合props让props读取到的就是span或offset, 这样提示更加友好
      const pos = ["span", "offset"] as const;
      const ret: string[] = [];
      // 第二个是默认值
      pos.forEach((item) => {
        const size = props[item];
        if (typeof size === "number" && size > 0) {
          // 将类名给push进去
          ret.push(`serina-col-${item}-${props[item]}`);
        }
      });
      // 给予一个默认样式和其他的样式
      return ["serina-col", ...ret];
    });
    const colStyle = computed(() => {
      if (gutter !== 0) {
        return {
          "padding-left": gutter / 2 + "px",
          "padding-right": gutter / 2 + "px"
        };
      }
      return {};
    });
    // 返回一个虚拟node, 并且绑定class和style
    return () =>
      h(
        props.tag,
        { class: colClass.value, style: colStyle.value },
        slots.default?.()
      );
  }
});
