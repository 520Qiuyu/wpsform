<template>
  <div class="page">
    <!-- 左侧图片 -->
    <div class="page-left">
      <span class="top-logo"></span>
      <span class="bottom-logo"></span>
    </div>
    <!-- 右侧注册主体 -->
    <div class="page-right">
      <div class="register-box">
        <div class="register-box-top">
          <el-icon class="back-icon" @click="goLogin">
            <ArrowLeftBold />
          </el-icon>
          <div class="register-title">WPS注册</div>
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
        <el-input
          class="text-input"
          placeholder="确认密码"
          v-model="form.confirm_password"
          show-password
        ></el-input>
        <el-button class="register-btn" type="primary" @click="register"
          >立即注册</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import * as api from "@/services/api";
import { ElMessage } from "element-plus";
import { ArrowLeftBold } from "@element-plus/icons-vue";

interface IRegisterReq {
  account: string;
  password: string;
  confirm_password: string;
}
export default defineComponent({
  name: "RegisterView",
  components: { ArrowLeftBold },
  props: {},
  setup(props, ctx) {
    const router = useRouter();
    const form = reactive(<IRegisterReq>{
      account: "",
      password: "",
      confirm_password: "",
    });
    const goLogin = () => {
      router.push("/Login");
    };
    const register = async () => {
      try {
        const res = await api.register(
          form.account,
          form.password,
          form.confirm_password
        );
        if (res.stat === "ok") {
          ElMessage.success("注册成功");
          router.push("/login");
        } else {
          ElMessage.info(res.message);
        }
      } catch (err) {
        console.trace(err);
      }
    };
    return {
      form,
      goLogin,
      register,
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
.register-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-top: 150px;
}
.register-box-top {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}
.back-icon {
  font-size: 35px;
  margin-top: -1px;
  color: #a1a1a1;
}
.back-icon:hover {
  cursor: pointer;
  color: #409eff;
}
.register-title {
  margin-left: 20px;
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
.register-btn {
  width: 200px;
  height: 50px;
  margin-top: 20px;
  font-size: 18px;
}
</style>
