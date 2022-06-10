<template>
  <!-- 首页 -->
  <div class="home-page">
    <!-- 头部 -->
    <div class="top-header-wrapper">
      <div class="top-header">
        <!-- 左侧logo -->
        <div class="logo">
          <img src="../assets/logo.svg" />
          <div class="logo-name">金山表单</div>
        </div>
        <!-- 中间导航 -->
        <ul class="center-nav">
          <li class="center-nav-item">首页</li>
          <li class="center-nav-item">行业解决方案</li>
          <li class="center-nav-item">免费模板</li>
          <li class="center-nav-item">帮助中心</li>
        </ul>
        <!-- 右侧立即使用 -->
        <div class="use-it">
          <router-link to="/app">立即使用</router-link>
        </div>
      </div>
    </div>
    <!-- 中间主体部分 -->
    <div class="main-body-wrapper">
      <div class="main-body">
        <div class="content">
          <router-link to="/app">立即使用</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "WelecomeView",
  components: {},
  props: {},
  setup(props, ctx) {
    return {};
  },
});
</script>

<style scoped>
</style>