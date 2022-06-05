<template>
  <div class="top">
    <div>首页</div>
    <div>昵称个人信息</div>
  </div>
  <div>这是APP组件</div>
  <router-view></router-view>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppView",
  components: {},
  props: {},
  setup(props, ctx) {
    return {};
  },
});
</script>

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
}
</style>