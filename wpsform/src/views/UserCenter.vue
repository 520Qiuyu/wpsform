<template>
  <div class="page">
    <div class="top">
      <div class="top-inner">
        <el-icon class="back-icon" @click="goBack">
          <ArrowLeftBold />
        </el-icon>
        <span class="header-word-wps">WPS</span>
        <span class="header-word-center">个人中心</span>
      </div>
    </div>
    <div class="main">
      <div class="main-inner">
        <div class="basic-info inner-box">
          <el-avatar class="avatar" :size="80" />
          <div class="nickname">zs</div>
          <div class="id">123456</div>
        </div>
        <div class="change-nickname inner-box">修改昵称</div>
        <div class="change-password inner-box">修改密码</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from 'vuex'
import { useRouter } from "vue-router";
export default defineComponent({
  name: "UserCenter",
  components: {},
  props: {},
  setup(props, ctx) {
    const store = useStore()
    const router = useRouter();
    const goBack = () => {
      router.go(-1);
    };
    return {
      goBack,
    };
  },
});
</script>

<style scoped>
.page {
}
.top {
  background: #fafafa;
  box-shadow: 0 1px 0 0 #dbdbdb;
}
.top-inner {
  display: flex;
  height: 60px;
  margin: 0 30px;
  align-items: center;
  font-size: 16px;
}
.back-icon {
  font-size: 21px;
  margin-top: 1px;
  color: #a1a1a1;
  cursor: pointer;
}
.back-icon:hover {
  color: #409eff;
}
.header-word-wps {
  font-weight: 700;
  margin-left: 4px;
  margin-right: 4px;
}
.main {
  background-color: #f5f5f5;
  padding-top: 15px;
}
.main-inner {
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;
}
.inner-box {
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #e7e9eb;
}
.basic-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff url(//qn.cache.wpscdn.cn/s1/avatar-bg.7d147f4.png) no-repeat
    100% 100%;
}
.avatar {
  margin-top: 35px;
}
.nickname {
  margin-top: 15px;
}
.id {
  margin-top: 5px;
  margin-bottom: 35px;
}
</style>
