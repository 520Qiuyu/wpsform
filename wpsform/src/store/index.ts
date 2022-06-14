import { createStore } from "vuex";
import { IUser, IForm, IProblem } from "../types/types";
import user from "./user";
import form from "./form";
import problem from "./problem";

export default createStore({
  state: {
    // 记录页面处于app路由下的哪个子路由，1代表首页，2代表新建表单，3代表表单详情，切换logo部分的显示
    appStatus: 1,
  },
  getters: {},
  mutations: {
  },
  actions: {},
  // modules: { user, form, problem },
  modules: { form, problem, user },
});
