import { createStore } from "vuex";
import { IUser, IForm, IProblem } from "../types/types";
import user from "./user";
import form from "./form";
import problem from "./problem";

export default createStore({
  state: {
    // 记录页面处于app路由下的哪个子路由，1代表首页，2代表新建表单，3代表表单详情，切换logo部分的显示
    appStatus: 1,
    // 记录登录状态
    loginState: Boolean(window.sessionStorage.getItem("login")) || false,
    // 记录用户信息
    userInfo: window.sessionStorage.getItem("user") || ({} as IUser),
  },
  getters: {},
  mutations: {
    setAppStatus(state, appStatus) {
      state.appStatus = appStatus;
    },
    setLoginState(state, loginState) {
      state.loginState = loginState;
    },
    setUserInfo(state, user: IUser) {
      state.userInfo = user;
    },
  },
  actions: {},
  // modules: { user, form, problem },
  modules: { form, problem, user },
});
