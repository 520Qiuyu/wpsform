<template>
  <div class="page">
    <!-- 左侧图片 -->
    <div class="page-left">
      <span class="top-logo"></span>
      <span class="bottom-logo"></span>
    </div>
    <!-- 右侧登录主体 -->
    <div class="page-right">
      <div class="login-box">
        <div class="login-box-top">
          <div class="login-title">欢迎使用WPS！</div>
        </div>
        <el-input
          class="text-input"
          placeholder="用户名"
          v-model="form.account"
        ></el-input>
        <el-input
          class="text-input"
          placeholder="密码"
          v-model="form.password"
          show-password
        ></el-input>
        <div class="operate-box">
          <el-button class="login-btn" type="primary" @click="login"
            >立即登录</el-button
          >
          <div class="goregister">
            <span>没有账号？</span>
          <router-link to="/register">立即注册></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import {useStore} from 'vuex'
import * as api from "@/services/api";
import { ElMessage } from "element-plus";

interface ILoginReq {
  account: string;
  password: string;
}

export default defineComponent({
  name: "LoginView",
  components: {},
  props: {},
  setup(props, ctx) {
    const store = useStore()
    const router = useRouter();
    const form = reactive(<ILoginReq>{ account: "", password: "" });
    const goRegister = () => {
      router.push("/Register");
    };
    const login = async () => {
      try {
        const res = await api.login(form.account, form.password);
        if (res.stat === "ok") {
          ElMessage.success("登录成功");
          router.push("/app");
          // 修改登录状态
          store.commit('setLoginState',true)
          window.sessionStorage.setItem('login','true')
          // 记录用户信息
          const userInfo = {
            account: form.account,
            password: form.password,
            nickname: '',
            avatar: '',
          }
          store.commit('setUserInfo',userInfo)
          window.sessionStorage.setItem('user',JSON.stringify(userInfo))
          
        } else {
           ElMessage.error(res.message);
        }
      } catch (err) {
        console.trace(err);
      }
    };
    return {
      form,
      goRegister,
      login,
    };
  },
});
</script>

<style scoped>
.page {
  display: flex;
  background-color: #fff;
  height: 100%;
}
.page-left {
  width: 580px;
  height: 100%;
  /* background: url(https://js2.epy.wpscdn.cn/security/da_banner.png); */
  background: url("../assets/imgs/Login_banner.png");
  background-size: cover;
  background-position: -230px 0;
  background-repeat: no-repeat;
}
.top-logo {
  position: absolute;
  top: 20px;
  left: 30px;
  width: 312px;
  height: 28px;
  background-image: url(https://ee.wpscdn.cn/wpscn/images/home/logo-dah.2e5a4add.svg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.page-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  /* background: linear-gradient(#87CEFA, #fff); */
  font-family: Helvetica, Tahoma, Arial, "Heiti SC", "Microsoft YaHei",
    "WenQuanYi Micro Hei";
  /* background-color: #B0E2FF; */
}
.login-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-top: 150px;
}
.login-box-top {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}
.login-title {
  font-size: 42px;
  font-weight: 600;
  color: #000;
}
.text-input {
  width: 450px;
  height: 50px;
  margin: 20px 0;
  font-size: 20px;
}
.operate-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}
.login-btn {
  width: 200px;
  height: 50px;
  font-size: 18px;
}
</style>
