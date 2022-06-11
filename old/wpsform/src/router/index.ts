import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  // 根路径，直接跳转至首页的
  {
    path: "/",
    name: "root",
    component: () => import("../views/WelecomeView.vue"),
  },
  // App，上方有昵称以及标题
  {
    path: "/app",
    name: "app",
    component: () => import("../views/AppView.vue"),
    children: [
      // 首页，展示表单列表
      {
        path: "from-list",
        name: "form-list",
        component: () => import("../views/FormList.vue"),
      },
      // 新建表单
      {
        path: "new-from-create",
        name: "new-from-create",
        component: () => import("../views/NewformCreate.vue"),
      },
      // 填写详情
      {
        path: "new-form-result",
        name: "new-form-result",
        component: () => import("../views/NewformResult.vue"),
        children: [
          // 填写详情，数据统计&分析
          {
            path: "statistical-details",
            name: "statistical-details",
            component: () => import("../views/StatisticalDetails.vue"),
          },
          // 填写详情，表单问题
          {
            path: "form-question",
            name: "form-question",
            component: () => import("../views/FormQuestion.vue"),
          },
          // 填写详情，分享
          {
            path: "share",
            name: "share",
            component: () => import("../views/FormShare.vue"),
          },
          // 重定向
          {
            path: "",
            redirect: { name: "statistical-details" },
          },
        ],
      },
      // 当前页面根路径时，跳转至form-list,防止返回到该页面时出现下方空白
      {
        path: "",
        redirect: { name: "form-list" },
      },
    ],
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  // 注册
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  // 个人中心
  {
    path: "/user-center",
    name: "user-center",
    component: () => import("../views/UserCenter.vue"),
  },
  // 表单填写
  {
    path: "/form-write",
    name: "form-write",
    component: () => import("../views/FormWrite.vue"),
  },
  // notfound
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
