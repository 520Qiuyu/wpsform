import { IUser } from "../types/types";
export default {
  namespaced: true,
  actions: {},
  mutations: {
    setAppStatus(state: any, appStatus: any) {
      state.appStatus = appStatus;
    },
    setLoginState(state: any, loginState: any) {
      state.loginState = loginState;
    },
    setUserInfo(state: any, user: IUser) {
      state.userInfo = user;
    },
  },
  state: {
    // 记录页面处于app路由下的哪个子路由，1代表首页，2代表新建表单，3代表表单详情，切换logo部分的显示
    appStatus: 1,
    // 记录登录状态
    loginState: Boolean(window.localStorage.getItem("login")) || false,
    // 记录用户信息
    userInfo: JSON.parse(window.localStorage.getItem("user")||JSON.stringify({})) as IUser ,
  },
  getters: {},
};
