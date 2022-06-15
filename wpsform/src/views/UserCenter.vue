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
          <div class="user-avatar" @click="dialogAvatarVisible = true">
            <el-avatar class="avatar" :size="80" :src="userInfo.avatar" />
            <div class="avatar-mask">
              <span>修改头像</span>
            </div>
          </div>
          <el-dialog
            v-model="dialogAvatarVisible"
            title="上传新头像"
            width="500px"
          >
            <div class="container">
              <div class="avatar-box">
                <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload ="false">
                  <img v-if="imageUrl" :src="imageUrl" class="new-avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
                
              </div>
            </div>
          </el-dialog>
          <div class="nickname">{{ userInfo.nickname }}</div>
          <div class="id">ID {{ userInfo.account }}</div>
        </div>
        <div class="change-nickname inner-box">修改昵称</div>
        <div class="change-password inner-box">修改密码</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "UserCenter",
  components: {},
  props: {},
  setup(props, ctx) {
    const store = useStore();
    const router = useRouter();
    const userInfo = computed(() => store.state.user.userInfo);
    const dialogAvatarVisible = ref(false);
    const imageUrl = ref("");
    //返回
    const goBack = () => {
      router.go(-1);
      // console.log(userInfo.value.avatar);
    };
    const changeNickName = () => {};

    return {
      goBack,
      userInfo,
      dialogAvatarVisible,
      imageUrl,
    };
  },
});
</script>

<style scoped>
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
.user-avatar {
  position: relative;
  cursor: pointer;
}
.avatar {
  margin-top: 35px;
}
.avatar-mask {
  position: absolute;
  left: 0;
  top: 35px;
  /* z-index: 1; */
  opacity: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #000;
  transition: all 0.3s;
}
.user-avatar:hover .avatar-mask {
  opacity: 0.6;
}
.avatar-mask span {
  /* z-index: 3; */
  display: block;
  margin: 29px auto;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin: 0 auto;
}
.avatar-box {
  width: 150px;
  height: 150px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  transition: var(--el-transition-duration-fast);
}
.avatar-box:hover {
  border-color: var(--el-color-primary);
}
.new-avatar {
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  text-align: center;
}
.nickname {
  margin-top: 15px;
  font-weight: 700;
  font-size: 16px;
  color: #383838;
}
.id {
  margin-top: 5px;
  margin-bottom: 35px;
  font-size: 14px;
  color: #666;
}
</style>
