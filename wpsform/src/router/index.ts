import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";


const routes: Array<RouteRecordRaw> = [
  // 根路径,欢迎页
  {
    path: "/",
    name: "root",
    component: () => import("@/views/Welecome/index.vue"),
  },
  // App，上方有昵称以及标题
  {
    path: "/app",
    name: "app",
    component: () => import("@/views/AppView/index.vue"),
    children: [
      // 首页，展示表单列表
      {
        path: "form-list",
        name: "form-list",
        component: () => import("@/views/AppView/FormList/index.vue"),
        meta:{
          showLogo:true,
          showLogoName:true,
        }
      },
      // 新建表单
      {
        path: "new-form-create",
        name: "new-form-create",
        component: () => import("@/views/AppView/NewformCreate/index.vue"),
        meta:{
          showLogo:false,
          showLogoName:false,
        }
      },
      // 预览表单
      {
        path: "form-preview",
        name: "form-preview",
        component: () => import("@/views/AppView/FormPreview/index.vue"),
        meta:{
          showLogo:true,
          showLogoName:false,
        }
      },
      // 填写详情
      {
        path: "new-form-result",
        name: "new-form-result",
        component: () => import("@/views/AppView/NewformResult/index.vue"),
        children: [
          // 填写详情，数据统计&分析
          {
            path: "statistical-details",
            name: "statistical-details",
            component: () => import("@/views/AppView/NewformResult/StatisticalDetails/index.vue"),
            meta:{
              showLogo:false,
              showLogoName:false,
            }
          },
          // 填写详情，表单问题
          {
            path: "form-question",
            name: "form-question",
            component: () => import("@/views/AppView/NewformResult/FormQuestion/index.vue"),
            meta:{
              showLogo:false,
              showLogoName:false,
            }
          },
          // 填写详情，分享
          {
            path: "share",
            name: "share",
            component: () => import("@/views/AppView/NewformResult/FormShare/index.vue"),
            meta:{
              showLogo:false,
              showLogoName:false,
            }
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
    component: () => import("@/views/Login/index.vue"),
  },
  // 注册
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register/index.vue"),
  },
  // 个人中心
  {
    path: "/user-center",
    name: "user-center",
    component: () => import("@/views/UserCenter/index.vue"),
  },
  // 表单填写
  {
    path: "/form-write",
    name: "form-write",
    component: () => import("@/views/FormWrite/index.vue"),
  },
  // notfound
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
