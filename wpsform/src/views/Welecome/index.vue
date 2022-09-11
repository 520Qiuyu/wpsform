<template>
  <!-- 首页 -->
  <div class="home-page">
    <!-- 头部 -->
    <div class="top-header-wrapper">
      <div class="top-header">
        <!-- 左侧logo -->
        <div class="logo">
          <img src="@/assets/imgs/logo.svg" />
          <div class="logo-name">金山表单</div>
        </div>
        <!-- 移动端菜单导航 -->
        <div class="mobile-nav-wrapper">
          <div
            :class="`menu-icon ${mobileMenuOpened ? 'menu-icon-opened' : ''}`"
            @click="mobileMenuOpened = !mobileMenuOpened"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul class="mobile-nav" @click="go($event)">
            <li class="mobile-nav-item" :name="'form-list'">首页</li>
            <li class="mobile-nav-item">行业解决方案</li>
            <li class="mobile-nav-item">免费模板</li>
            <li class="mobile-nav-item">帮助中心</li>
          </ul>
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

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router"
export default defineComponent({
  name: "WelecomeView",
  components: {},
  props: {},
  setup(props, ctx) {
    const Router = useRouter()
    // 移动端菜单是否展开
    const mobileMenuOpened = ref(false);
    // 跳转页面
    const go = (event:MouseEvent)=>{
      const target = event.target as HTMLLIElement
      Router.push({
        name:target.getAttribute("name") || ''
      })
    }
    return { mobileMenuOpened, Router, go };
  },
});
</script>

<style scoped>
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
  max-width: 1160px;
  width: 100%;
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
  white-space: nowrap;
}
.mobile-nav-wrapper {
  display: none;
}
.mobile-nav-wrapper .menu-icon {
  height: 100%;
  line-height: 56px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.mobile-nav-wrapper .menu-icon span {
  display: inline-block;
  width: 20px;
  height: 3px;
  border-radius: 1.5px;
  background-color: #3c414b;
  margin: 2px 0;
  transition: all 0.2s;
}
.menu-icon-opened span:first-of-type {
  transform: rotateZ(45deg);
  transform-origin: 0 50%;
}
.menu-icon-opened span:nth-of-type(2) {
  opacity: 0;
}
.menu-icon-opened span:last-of-type {
  transform: rotateZ(-45deg);
  transform-origin: 0 50%;
}
.mobile-nav {
  position: absolute;
  left: calc(-20px - 100vw);
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 56px);
  width: 100vw;
  box-sizing: border-box;
  background-color: #fff;
  transition: all.2s;
}
.menu-icon-opened + .mobile-nav {
  left: -20px;
}
.mobile-nav-item {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.7;
  margin: 10px 0px;
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
  white-space: nowrap;
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
  background-image: url(@/assets/imgs/HomePageBackground.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 70% center;
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

@media screen and (max-width: 1440px) {
  .top-header-wrapper,
  .main-body {
    padding: 0 20px;
  }
}

@media screen and (max-width: 768px) {
  .main-body {
    backdrop-filter: blur(7px);
  }
  .content {
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .center-nav,
  .use-it {
    display: none;
  }
  .top-header {
    flex-direction: row-reverse;
  }
  .logo-name {
    font-size: 16px;
  }
  .mobile-nav-wrapper {
    display: block;
  }
  .banner-index-title {
    font-size: 25px;
  }
  .use-it-mian {
    margin: 0 auto;
  }
}
</style>