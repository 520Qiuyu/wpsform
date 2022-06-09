<template>
  <div class="app-top">
    <div class="app-logo">logo</div>
    <div class="app-user-info">
      <router-link to="/login" v-if="!loginState" class="app-login-btn">登录</router-link> 
      <div class="app-user-icon" v-if="loginState">头像</div>
      <div class="app-user-title" v-if="loginState">用户名</div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import { defineComponent,ref } from 'vue'
export default defineComponent({
  name: 'AppView',
  components: {},
  props: {},
  setup(props, ctx) {
    const loginState = ref(false)
    return {
      loginState
    }
  },
})
</script>

<style scoped>
.app-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  height: 110px;
  border: 1px solid #ccc;
}
.app-logo {
  font-size: 25px;
  font-weight: 600;
}
.app-user-info {
  display: flex;
  padding: 10px;
}
.app-user-icon {
  margin-right: 10px;
}
.app-login-btn {
  color: skyblue;
  font-size: 20px;
}
</style>
