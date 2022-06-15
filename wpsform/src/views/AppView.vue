<template>
  <el-container class="app-container">
    <!-- APP顶部栏 -->
    <el-header class="app-top">
      <!-- 左侧区域 -->
      <!-- 首页显示logo -->
      <router-link to="/" class="app-logo" v-if="appStatus == 1">
        <!-- logo图片 -->
        <img src="../assets/imgs/logo.svg" alt="" />
        <!-- logo文字：金山表单 -->
        <span class="logo-name">金山表单</span>
      </router-link>
      <!-- 新建表单页面显示返回图标+新建表单 -->
      <div class="app-logoArea" v-if="appStatus == 2">
        <el-page-header content="新建表单" @back="goBack" />
        <!-- <el-icon><ArrowLeftBold @click="goBack" /></el-icon>
        <span>新建表单</span> -->
      </div>
      <!-- 表单详情页面显示返回图标+当前表单名 -->
      <div class="app-logoArea" v-if="appStatus == 3">
        <el-page-header content="xxx表单名称" @back="goBack" />
      </div>
      <!-- 右侧个人信息显示：头像昵称 -->
      <div class="app-user-info">
        <!-- 登录按钮 -->
        <router-link
          to="/login"
          v-if="!$store.state.loginState"
          class="app-login-btn"
        >
          登录
        </router-link>
        <!-- 用户信息 -->
        <div class="app-user" v-if="$store.state.loginState">
          <!-- 用户名 -->
          <span class="app-user-title">{{ userInfo.nickname }}</span>
          <el-dropdown>
            <!-- 用户头像 -->
            <div
              class="app-user-icon el-dropdown-link"
              v-if="$store.state.loginState"
            >
              <img :src="userInfo.avatar" alt="" />
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
    <router-view></router-view>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import * as api from "@/services/api";
import { IUser, IForm, IProblem } from "../types/types";

export default defineComponent({
  name: "AppView",
  components: {},
  props: {},
  setup(props, ctx) {
    const store = useStore();
    const router = useRouter();
    // const usericon = '../assets/imgs/logo.svg'
    const appStatus = computed(() => store.state.appStatus);
    const userInfo = computed(() => store.state.userInfo);

    const goBack = () => {
      router.go(-1);
    };

    const logout = () => {
      store.commit("setLoginState", false);
      window.sessionStorage.removeItem("login");
      window.sessionStorage.removeItem("user");
      // console.log(store.state.loginState)
    };

    onBeforeMount(() => {
      // console.log(typeof store.state.userInfo)
    });

    return {
      appStatus,
      goBack,
      logout,
      userInfo,
    };
  },
});
</script>

<style scoped>
.app-container {
  height: 100%;
}
.app-top {
  padding: 0 16px;
}
.app-top {
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* height: 56px; */
  box-sizing: border-box;
  border: 1px solid #ccc;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
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
/* .app-user-option {
  position: absolute;
  top: 50px;
  right: 0;
  padding: 12px;
  box-sizing: border-box;
  background: white;
  box-shadow: 0 2px 12px 0 rgb(56 56 56 / 20%);
  border-radius: 2px;
  border: 1px solid #d3d3d3;
  display: none;
  flex-direction: column;
}
.app-user:hover .app-user-option {
  display: flex;
}
.app-user-title {
  width: 80px;
  font-size: 14px;
  padding: 0 10px 16px;
  color: #3d4757;
  font-weight: 600;
  line-height: 14px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #e2e6ed;
}
.app-user-option-list {
  margin-top: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.app-user-option-item:hover {
  background-color: #FAFAFA;
  transition: all 0.2s;
}
.app-user-option-item a {
  padding: 0 10px;
  font-size: 12px;
  line-height: 30px;
  color: #3d4757;
  white-space: nowrap;
  cursor: pointer;
  margin-top: 4px;
} */
</style>
