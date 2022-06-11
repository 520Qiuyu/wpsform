import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import { ArrowLeftBold} from '@element-plus/icons-vue'
import "element-plus/dist/index.css";
import "./assets/styles/reset.css";
import "./assets/styles/index.css";

const app = createApp(App)
app.component("icon-arrowleftbold", ArrowLeftBold);
app.use(store).use(router).use(ElementPlus).mount("#app");
