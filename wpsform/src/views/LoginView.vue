<template>
  <div class="login">
    <h2>登录</h2>
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
    <button class="register-btn" @click="goRegister">还没注册？</button>
    <button class="login-btn" @click="login">登录</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import * as api from "@/services/api";

interface ILoginReq {
  account: string;
  password: string;
}

export default defineComponent({
  name: "LoginView",
  components: {},
  props: {},
  setup(props, ctx) {
    const router = useRouter();
    const form = reactive(<ILoginReq>{ account: "", password: "" });
    const goRegister = () => {
      router.push("/Register");
    };
    const login = async () => {
      try {
        const res = await api.login(form.account,form.password);
        if (res.stat === "ok") {
          console.log("登录成功");
          router.push("/app");
        } else {
          console.log(res.message)
        }
        }
       catch (err) {
        console.trace(err);
      }
    };
    return {
      form,
      goRegister,
      login
    };
  },
});
</script>

<style scoped>
.login {
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
.register-btn {
  border: none;
  background-color: #fff;
  color: blue;
}
.register-btn:hover {
  cursor: pointer;
}
.login-btn {
  width: 50px;
  margin: 5px 0;
  cursor: pointer;
}
</style>
