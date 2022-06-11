import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "element-plus/dist/index.css";
import "./assets/styles/reset.css";
import "./assets/styles/index.css";

createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
