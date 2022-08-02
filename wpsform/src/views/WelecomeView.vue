<template>
  <!-- 首页 -->
  <div class="home-page">
    <!-- 头部 -->
    <div class="top-header-wrapper">
      <div class="top-header">
        <!-- 左侧logo -->
        <div class="logo">
          <img src="../assets/imgs/logo.svg" />
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
          <div class="banner-index-title">
            <h1>金山表单</h1>
            <h1>便携的在线信息收集工具</h1>
          </div>
          <div class="banner-index-desc">
            <h2>人人都会用的在线表单，支持手机电脑多端信息同步</h2>
            <h2>随时随地查看收集结果</h2>
          </div>
          <router-link class="use-it-mian" to="/app">立即使用</router-link>
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
.home-page {
  min-width: 1200px;
}
.top-header-wrapper {
  width: 100%;
  height: 56px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 888;
  box-shadow: 0 0 10px 0 rgb(58 58 58 / 7%);
}
.top-header,
.main-body {
  width: 1160px;
}
.top-header {
  height: 56px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.logo-name {
  font-size: 18px;
  font-weight: 500;
  color: #3c414b;
  line-height: 25px;
}
.center-nav {
  height: 56px;
  line-height: 56px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}
.center-nav-item {
  margin: 0 20px;
  font-size: 16px;
  font-weight: 500;
  color: #3c414b;
}
.use-it {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.use-it a {
  color: #1488ed;
  border: 1px solid #1488ed;
  padding: 5px 10px;
  background-color: #fff;
  transition: all 0.2s;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 400;
  width: 96px;
  height: 32px;
  text-align: center;
}
.use-it a:hover {
  background-color: #f6fbff;
}
.main-body-wrapper {
  padding-top: 56px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-image: url(../assets/imgs/HomePageBackground.png);
  background-size: cover;
  background-position: center;
  height: 100vh;
  min-height: 280px;
}

.main-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.banner-index-title {
  font-size: 32px;
  font-weight: 500;
  color: #3e3e3e;
  line-height: 42px;
}
.banner-index-desc {
  width: 43%;
  font-size: 16px;
  font-weight: 400;
  color: #848484;
  line-height: 26px;
  margin: 8px 0 32px;
}

.use-it-mian {
  width: 200px;
  height: 48px;
  background: #1488ed;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
}
</style>