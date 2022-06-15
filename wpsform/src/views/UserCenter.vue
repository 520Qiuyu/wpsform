<template>
  <div class="page">
    <!-- 顶栏 -->
    <div class="top">
      <div class="top-inner">
        <el-icon class="back-icon" @click="goBack">
          <ArrowLeftBold />
        </el-icon>
        <span class="header-word-wps">WPS</span>
        <span class="header-word-center">个人中心</span>
      </div>
    </div>
    <!-- 页面主体 -->
    <div class="main">
      <div class="main-inner">
        <!-- 基础信息展示（含头像修改） -->
        <div class="basic-info inner-box">
          <div class="user-avatar" @click="dialogAvatarVisible = true">
            <el-avatar class="avatar" :size="80" :src="userInfo.avatar" />
            <div class="avatar-mask">
              <span>修改头像</span>
            </div>
          </div>
          <!-- 修改头像对话框 -->
          <el-dialog
            v-model="dialogAvatarVisible"
            title="上传新头像"
            width="500px"
            @close="handleAvatarClose"
          >
            <div class="avatar-container">
              <!-- 上传预览区域 -->
              <div class="avatar-box">
                <el-upload
                  action="#"
                  :auto-upload="false"
                  :on-change="handleOnchange"
                  ref="upload"
                  :show-file-list="false"
                >
                  <el-image
                    v-if="imageUrl"
                    :src="imageUrl"
                    class="new-avatar"
                    fit="cover"
                  />
                  <el-icon v-else class="avatar-uploader-icon"
                    ><Plus
                  /></el-icon>
                </el-upload>
              </div>
              <!-- 上传提示 -->
              <div class="upload-tip">
                只能上传jpg/png格式且大小不超过3MB的图片(点击图片可直接覆盖)
              </div>
              <!-- 按钮 -->
              <div
                class="avatar-operate-box"
                :style="{ height: showOperate + 'px' }"
              >
                <el-button type="primary" @click="submitAvatar"
                  >确认修改</el-button
                >
                <el-button @click="cancelUpload">取消上传</el-button>
              </div>
            </div>
          </el-dialog>
          <div class="nickname">{{ userInfo.nickname }}</div>
          <div class="id">ID {{ userInfo.account }}</div>
        </div>
        <!-- 修改昵称 -->
        <div class="change-nickname inner-box">
          <div class="change-tip">使用真实姓名，让工作伙伴认识你</div>
          <div v-if="show_nick_name" class="show-nickname-box">
            <span class="old-nickname">
              {{ userInfo.nickname }}
            </span>
            <button class="change-btn" @click="toInputNickname">修改</button>
          </div>
          <div v-else class="input-nickname-box">
            <el-input
              class="text-input"
              v-model="new_nickname"
              :value="userInfo.nickname"
            />
            <div class="btn-box">
              <el-button @click="toShowNickname" size="small">取消</el-button>
              <el-button @click="submitNickname" type="primary" size="small"
                >确认</el-button
              >
            </div>
          </div>
        </div>
        <!-- 修改密码 -->
        <div class="change-password inner-box">
          <div class="change-tip">修改密码</div>
          <div class="show-password-box">
            <span class="old-password"> ******** </span>
            <button class="change-btn" @click="dialogChangePwdVisible = true">
              修改
            </button>
            <!-- 修改密码对话框 -->
            <el-dialog
              v-model="dialogChangePwdVisible"
              title="修改密码"
              width="500px"
              @close="handlePasswordClose"
            >
              <div class="password-container">
                <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef">
                  <el-form-item prop="old_password">
                    <el-input
                      class="password-input"
                      placeholder="原密码"
                      v-model="ruleForm.old_password"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="new_password">
                    <el-popover
                      placement="right"
                      title="规则"
                      :width="200"
                      trigger="click"
                      popper-class="popper"
                      content="必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-20个字符之间"
                    >
                      <template #reference>
                        <el-input
                          class="password-input"
                          placeholder="密码"
                          v-model="ruleForm.new_password"
                          show-password
                        >
                        </el-input>
                      </template>
                    </el-popover>
                  </el-form-item>
                  <el-form-item prop="confirm_password">
                    <el-input
                      class="password-input"
                      placeholder="确认密码"
                      v-model="ruleForm.confirm_password"
                      autocomplete="off"
                      show-password
                    ></el-input>
                  </el-form-item>
                </el-form>
                <div class="password-operate-box">
                  <el-button type="primary" @click="submitPassword"
                    >确认修改</el-button
                  >
                  <el-button @click="cancelChangePwd">取消修改</el-button>
                </div>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import * as api from "@/services/api";
import { IUser } from "@/types/types";

interface IChangePwdReq {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export default defineComponent({
  name: "UserCenter",
  setup() {
    const upload = ref();
    const ruleFormRef = ref<FormInstance>();
    const router = useRouter();
    const userInfo = reactive(<IUser>{
      account: "",
      pwd: "",
      nickname: "",
      avatar: "",
    });
    const new_nickname = ref("");
    const show_nick_name = ref(true);
    const dialogAvatarVisible = ref(false);
    const dialogChangePwdVisible = ref(false);
    const imageUrl = ref("");
    const showOperate = ref(0);
    const passwordTip = ref(false);
    const confirmPwdTip = ref(false);
    const ruleForm = reactive(<IChangePwdReq>{
      old_password: "",
      new_password: "",
      confirm_password: "",
    });

    //自定义验证函数
    const validatePassword = (rule: any, value: any, callback: any) => {
      let passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/; //必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-20之间
      if (!value) {
        return callback(new Error("请输入密码"));
      } else if (!passwordReg.test(value)) {
        callback(new Error("请按要求输入密码"));
      } else {
        callback();
      }
    };
    const validateConfirmPwd = (rule: any, value: any, callback: any) => {
      let ConfirmPwdReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
      if (!value) {
        callback(new Error("请输入确认密码"));
      } else if (value !== ruleForm.new_password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    //验证规则
    const rules = reactive({
      old_password: [
        { required: true, message: "请输入原密码", trigger: "blur" },
      ],
      new_password: [{ validator: validatePassword, trigger: "blur" }],
      confirm_password: [{ validator: validateConfirmPwd, trigger: "blur" }],
    });

    //返回
    const goBack = () => {
      router.go(-1);
      // console.log(userInfo.value.avatar);
    };

    //从后端获取用户信息
    const getUserInfo = async () => {
      try {
        const res = await api.getUserInfo();
        if (res.stat === "ok") {
          userInfo.account = res.data.user.account;
          userInfo.nickname = res.data.user.nickname;
          userInfo.pwd = res.data.user.pwd;
          //若没有设置过Avatar则显示默认头像
          if (res.data.user.avatar != "") {
            userInfo.avatar = res.data.user.avatar;
          } else {
            userInfo.avatar =
              "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
          }
          console.log("获取成功");
        } else {
          console.log("获取失败");
        }
      } catch (err) {
        console.trace(err);
      }
    };

    //重新选择覆盖预览
    const handleOnchange = (file: any, fileList: any) => {
      const imgType =
        file.raw.type === "image/png" || file.raw.type === "image/jpeg";
      const imgSize = file.raw.size / 1024 / 1024 <= 3;
      if (!imgType) {
        ElMessage.error("只能上传png、jpg、jpeg的图片格式！");
        fileList.splice(1, 1);
        return false;
      }
      if (!imgSize) {
        ElMessage.error("图片上传最大限制3MB！");
        fileList.splice(1, 1);
        return false;
      }
      // 如果第二次上传文件，将前一个文件删除
      // 这样fileList就一直保持一个文件
      if (fileList.length > 1) {
        console.log(fileList[0]);
        fileList.splice(0, 1);
      }
      //获取当前文件的一个内存URL
      //给图片src赋值
      imageUrl.value = URL.createObjectURL(file.raw);
      showOperate.value = 35;
    };

    //取消上传，清空文件列表和预览图，但不关闭dialog
    const cancelUpload = () => {
      upload.value.clearFiles();
      imageUrl.value = "";
    };

    //关闭dialog时清空数据
    const handleAvatarClose = () => {
      upload.value.clearFiles();
      imageUrl.value = "";
    };
    const handlePasswordClose = () => {
      ruleFormRef.value?.resetFields();
    };

    //关闭show-box，打开input-box
    const toInputNickname = () => {
      show_nick_name.value = false;
      // nicknameref.value.focus();
    };

    //关闭input-box，打开show-box
    const toShowNickname = () => {
      show_nick_name.value = true;
    };

    // 修改请求-nickname
    const changeNickname = async () => {
      try {
        const res = await api.setUserInfo(new_nickname.value, userInfo.avatar);
        if (res.stat === "ok") {
          ElMessage.success("修改成功");
        } else {
          ElMessage.info("修改失败");
        }
      } catch (err) {
        console.trace(err);
      }
    };

    // 修改请求-password
    const changePassword = async () => {
      try {
        const res = await api.changePwd(
          ruleForm.old_password,
          ruleForm.new_password,
          ruleForm.confirm_password
        );
        if (res.stat === "ok") {
          ElMessage.success("修改密码成功，请重新登录");
          router.push("/login");
        } else {
          ElMessage.error("原密码不正确！");
        }
      } catch (err) {
        console.trace(err);
      }
    };
    //发送修改avatar请求
    const submitAvatar = async () => {
      try {
        const res = await api.setUserInfo(userInfo.nickname, imageUrl.value);
        if (res.stat === "ok") {
          getUserInfo();
          dialogAvatarVisible.value = false;
          ElMessage.success("修改成功");
        } else {
          ElMessage.info("修改失败");
        }
      } catch (err) {
        console.trace(err);
      }
    };

    //发送修改nickname请求
    const submitNickname = () => {
      console.log(new_nickname.value, imageUrl.value);
      changeNickname();
      getUserInfo();
      show_nick_name.value = true;
    };

    //发送修改password请求
    const submitPassword = () => {
      ruleFormRef.value?.validate(async (validate) => {
        if (validate) {
          await changePassword();
        } else {
          ElMessage.error("请按要求填写信息！");
        }
      });
    };

    //取消修改，关闭对话框
    const cancelChangePwd = () => {
      // ruleFormRef.value?.resetFields();
      dialogChangePwdVisible.value = false;
    };
    return {
      goBack,
      getUserInfo,
      handleOnchange,
      cancelUpload,
      handleAvatarClose,
      handlePasswordClose,
      toInputNickname,
      toShowNickname,
      submitAvatar,
      submitNickname,
      submitPassword,
      cancelChangePwd,
      ruleForm,
      rules,
      passwordTip,
      confirmPwdTip,
      new_nickname,
      show_nick_name,
      userInfo,
      dialogAvatarVisible,
      dialogChangePwdVisible,
      imageUrl,
      showOperate,
      upload,
      ruleFormRef,
    };
  },
  created() {
    this.getUserInfo();
  },
});
</script>

<style scoped>
.page {
  height: 100%;
  background-color: #f5f5f5;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    STHeitiSC-Light, Microsoft YaHei, \\5FAE\8F6F\96C5\9ED1, SimSun, sans-serif;
}
/* 顶栏 */
.top {
  background: #fafafa;
  box-shadow: 0 1px 0 0 #dbdbdb;
}
.top-inner {
  display: flex;
  height: 40px;
  margin: 0 30px;
  align-items: center;
  font-size: 14px;
}
.back-icon {
  font-size: 19px;
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
/* 页面主体 */
.main {
  padding-top: 15px;
}
.main-inner {
  display: flex;
  flex-direction: column;
  max-width: 850px;
  min-width: 365px;
  margin: 0 auto;
}
.inner-box {
  margin-bottom: 10px;
  padding: 0 30px;
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
.nickname {
  margin-top: 15px;
  font-weight: 700;
  font-size: 16px;
  color: #383838;
}
.id {
  margin-top: 5px;
  margin-bottom: 35px;
  font-size: 12px;
  color: #666;
}
/* 修改头像对话框 */
.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  /* height: 200px; */
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
  position: relative;
  top: -1px;
  left: -1px;
  width: 150px;
  height: 150px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  text-align: center;
}
.upload-tip {
  margin-top: 10px;
  font-size: 12px;
  color: #8c939d;
}
.avatar-operate-box {
  display: flex;
  height: 0;
  margin-top: 20px;
  overflow: hidden;
  transition: all 0.5s;
}
/* 修改昵称模块 */
.change-tip {
  font-size: 12px;
  margin-top: 25px;
  color: #969696;
}
.show-nickname-box {
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
}
.old-nickname {
  font-size: 15px;
  font-weight: 600;
}
.change-btn {
  border: none;
  background-color: #fff;
  font-size: 13px;
  color: #2e68f8;
  cursor: pointer;
}
.text-input {
  width: 220px;
  height: 28px;
  margin: 20px 0;
  font-size: 12px;
}
.input-nickname-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 22.5px;
  margin: 30px 0;
}
/* 修改密码模块 */
.show-password-box {
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
}
.old-password {
  font-size: 15px;
  font-weight: 600;
}
.password-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.password-input {
  width: 200px;
  height: 30px;
  margin: 10px auto;
}
.password-operate-box {
  margin-top: 5px;
}
</style>
