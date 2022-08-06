import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
// 设置当前的运行域名
app.config.globalProperties.$currentDomainName = "localhost:8080"
app.use(store);
app.use(router);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
