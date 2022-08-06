<template>
  <el-container class="app-container">
    <!-- APP顶部栏 -->
    <el-header class="app-top">
      <!-- 左侧区域 -->
      <div class="left-header">
        <!-- 表单详情页面显示返回图标+当前表单名 -->
      <div class="app-logoArea" v-show="route.path.includes('new-form-result')">
        <el-page-header  @back="goBack" />
      </div>
      <!-- 首页显示logo -->
      <router-link to="/" class="app-logo" v-show="route.meta.showLogo">
        <!-- logo图片 -->
        <img src="@/assets/imgs/logo.svg" alt="logo" />
        <!-- logo文字：金山表单 -->
        <span class="logo-name" v-show="route.meta.showLogoName">金山表单</span>
      </router-link>
      <!-- 表单名称 -->
      <div class="formName" v-show="route.path.includes('new-form-result')">
        <span>{{store.state.form.visitingForm.title}}</span>
      </div>
      </div>
      

      <!-- 右侧个人信息显示：头像昵称 -->
      <div class="app-user-info">
        <!-- 登录按钮 -->
        <router-link
          to="/login"
          v-if="!store.state.user.loginState"
          class="app-login-btn"
        >
          登录
        </router-link>
        <!-- 用户信息 -->
        <div class="app-user" v-if="store.state.user.loginState">
          <!-- 用户名 -->
          <span class="app-user-title">{{ userInfo.nickname }}</span>
          <el-dropdown>
            <!-- 用户头像 -->
            <div
              class="app-user-icon el-dropdown-link"
              v-if="store.state.user.loginState"
            >
              <!-- <img :src="userInfo.avatar" alt="" /> -->
              <el-avatar
                class="avatar"
                :size="32"
                :src="userInfo.avatar"
                fit="cover"
              />
            </div>
            <!-- 头像悬浮显示下拉框内容 -->
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <router-link to="/user-center">个人信息</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a @click="logout">退出账号</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <router-view ></router-view>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import * as api from "@/services/api";
import { IUser, IForm, IProblem } from "@/types/types";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "AppView",
  components: {},
  props: {},
  setup(props, ctx) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute(); 
    const appStatus = computed(() => store.state.user.appStatus);
    const userInfo = computed(() => store.state.user.userInfo);
    const formTitle = ref("");

    const goBack = () => {
      router.push("/app");
    };

    const logout = async () => {
      const res = await api.logout();
      if (res.stat == "ok") {
        store.commit("user/setLoginState", false);
        window.localStorage.removeItem("login");
        window.localStorage.removeItem("user");
        router.push("/login");
      }
    };

    const getUserInfo = async () => {
      const res = await api.getUserInfo();
      if (res.stat == "ok") {
        store.commit("user/setUserInfo", res.data.user);
      } else {
        ElMessage.error("用户未登录！");
        window.localStorage.removeItem("login");
        window.localStorage.removeItem("user");
        router.push("/login");
      }
    };

    onBeforeMount(() => {
      //判断登录状态，未登录则跳转到登录页面
      if (store.state.user.loginState == false) {
        router.replace("/login");
      }
      //登录则直接获取用户信息
      else {
        getUserInfo();
      }
      // console.log(typeof store.state.userInfo)
    });

    return {
      route,
      store,
      appStatus,
      goBack,
      logout,
      userInfo,
      formTitle,
    };
  },
});
</script>

<style scoped>
.app-container {
  height: 100%;
}
.app-top {
  width: 100%;
  padding: 0 16px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  box-sizing: border-box;
  border-bottom: 1px solid #E7E9EB;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.left-header {
  display: flex;
  align-items: center;
}
.formName{
  color:#3c414b;
  font-weight: 500;
}
.app-logo {
  font-size: 18px;
  color: #3c414b;
  font-weight: 400;
  display: flex;
  align-items: center;
}

.app-logo img {
  vertical-align: top;
  margin-right: 10px;
}
.app-logoArea {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
}
.app-logoArea span {
  margin-left: 5px;
}

.app-user-info {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}
.app-login-btn {
  color: #1488ed;
  border: 1px solid #1488ed;
  padding: 1px 15px;
  background-color: #fff;
  transition: all 0.2s;
}
.app-login-btn:hover {
  background-color: #f6fbff;
}
.app-user {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  position: relative;
  margin-right: 10px;
}

.app-user-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.3);
}
.app-user-icon img {
  width: 100%;
}
.app-user-title {
  width: 80px;
  font-size: 16px;
  color: #3d4757;
  font-weight: 600;
  text-align: right;
  padding-right: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
