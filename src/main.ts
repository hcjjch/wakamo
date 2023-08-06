import { createApp } from "vue";
import App from "./App.vue";
import serinaUI from "./packages";
import "./packages/theme-chalk/index.scss";

createApp(App).use(serinaUI).mount("#app");
