<template>
  <div class="register">
    <h2>注册</h2>
    <input
      type="text"
      class="text-input"
      placeholder="用户名"
      v-model="form.account"
    />
    <input
      type="password"
      class="text-input"
      placeholder="密码"
      v-model="form.password"
    />
    <input
      type="password"
      class="text-input"
      placeholder="确认密码"
      v-model="form.confirm_password"
    />
    <button class="gologin-btn" @click="goLogin">返回登录</button>
    <button class="register-btn" @click="register">注册</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import * as api from "@/services/api";

interface IRegisterReq {
  account: string;
  password: string;
  confirm_password: string;
}
export default defineComponent({
  name: "RegisterView",
  components: {},
  props: {},
  setup(props, ctx) {
    const router = useRouter();
    const form = reactive(<IRegisterReq>{ account: "", password: "" ,confirm_password:""});
    const goLogin = () => {
      router.push("/Login");
    };
    const register = async () => {
      try {
        const res = await api.register(form.account,form.password,form.confirm_password)
        if (res.stat === "ok") {
          console.log("注册成功");
          router.push("/app");
        } else {
          console.log(res.message)
        }
      } catch (err) {
        console.trace(err);
      }
    };
    return {
      form,
      goLogin,
      register
    };
  },
});
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 250px;
  border: 1px solid black;
  margin: 150px auto;
}
.text-input {
  width: 200px;
  margin: 5px 0;
}
.register-btn:hover {
  cursor: pointer;
}
.gologin-btn {
  width: 100px;
  margin: 5px 0;
  cursor: pointer;
}
</style>