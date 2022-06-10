<template>
  <!-- APP顶部栏 -->
  <div class="app-top">
    <!-- 左侧logo -->
    <router-link to="/" class="app-logo">
      <!-- logo图片 -->
      <img src="../assets/imgs/logo.svg" alt="" />
      <!-- logo文字：金山表单 -->
      <span class="logo-name">金山表单</span>
    </router-link>
    <!-- 右侧个人信息显示：头像昵称 -->
    <div class="app-user-info">
      <!-- 登录按钮 -->
      <router-link to="/login" v-if="!loginState" class="app-login-btn">
        登录
      </router-link>
      <!-- 用户信息 -->
      <div class="app-user">
        <!-- 用户头像 -->
        <div
          class="app-user-icon"
          v-if="loginState"
          @click="selectedAvatar = !selectedAvatar"
          @blur="selectedAvatar = false"
        >
          <img src="../assets/imgs/logo.svg" alt="" />
        </div>
        <!-- 展开栏：登出，个人信息等-->
        <div v-if="selectedAvatar" class="app-user-option">
          <!-- 用户昵称 -->
          <div class="app-user-title" v-if="loginState">邱宇</div>
          <ul class="app-user-option-list">
            <li class="app-user-option-item">
              <router-link to="/user-center">个人信息</router-link>
            </li>
            <li class="app-user-option-item">
              <a @click="logout">退出账号</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "AppView",
  components: {},
  props: {},
  setup(props, ctx) {
    // 登录状态
    const loginState = ref(true);
    // 点击头像后显示下拉栏
    const selectedAvatar = ref(false);
    const stretchOption = () => {};
    const usericon = "../assets/imgs/logo.svg";
    return {
      loginState,
      usericon,
      selectedAvatar,
    };
  },
});
</script>

<style scoped>
.app-top {
  padding: 0 16px;
}
.app-top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 56px;
  box-sizing: border-box;
  border: 1px solid #ccc;
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

.app-user-info {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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
.app-user-option {
  position: absolute;
  top: 36px;
  right: 0;
  padding: 12px;
  box-sizing: border-box;
  background: white;
  box-shadow: 0 2px 12px 0 rgb(56 56 56 / 20%);
  border-radius: 2px;
  border: 1px solid #d3d3d3;
  display: flex;
  flex-direction: column;
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
.app-user-option-item {
}
.app-user-option-item a {
  padding: 0 10px;
  font-size: 12px;
  line-height: 30px;
  color: #3d4757;
  white-space: nowrap;
  cursor: pointer;
  margin-top: 4px;
}
</style>
