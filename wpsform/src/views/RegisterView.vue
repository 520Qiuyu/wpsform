<template>
  <div class="page">
    <!-- 左侧图片 -->
    <div class="page-left">
      <span class="top-logo"></span>
      <span class="bottom-logo"></span>
    </div>
    <!-- 右侧注册主体 -->
    <div class="page-right">
      <div class="register-box">
        <!-- 返回登录按钮和标题 -->
        <div class="register-box-top">
          <el-icon class="back-icon" @click="goLogin">
            <ArrowLeftBold />
          </el-icon>
          <div class="register-title">WPS注册</div>
        </div>
        <!-- 输入框和按钮 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleFormRef"
          status-icon="true"
        >
          <el-form-item prop="account">
            <el-input
              class="text-input"
              placeholder="用户名"
              v-model="ruleForm.account"
              @focus="onAccount"
              @focusout="outAccount"
            ></el-input>
          </el-form-item>
          <span class="accountTip tip" v-show="accountTip"
            >6~18个字符，可使用字母、数字、下划线</span
          >

          <el-form-item prop="password">
            <el-input
              class="text-input"
              placeholder="密码"
              type="password"
              v-model="ruleForm.password"
              @focus="onPassword"
              @focusout="outPassword"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <span class="passwordTip tip" v-show="passwordTip"
            >必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-20之间</span
          >
          <el-form-item prop="confirm_password">
            <el-input
              class="text-input"
              placeholder="确认密码"
              v-model="ruleForm.confirm_password"
              @focus="onConfirmPwd"
              @focusout="outConfirmPwd"
              @keyup.enter.native="submitForm"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <span class="confirmPwdTip tip" v-show="confirmPwdTip"
            >请再输入一次密码</span
          >
          <el-form-item>
            <el-button class="register-btn" type="primary" @click="submitForm"
              >立即注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import * as api from "@/services/api";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { ArrowLeftBold } from "@element-plus/icons-vue";

interface IRegisterReq {
  account: string;
  password: string;
  confirm_password: string;
}
export default defineComponent({
  name: "RegisterView",
  components: { ArrowLeftBold },
  props: {},
  setup(props, ctx) {
    const router = useRouter();
    const ruleFormRef = ref<FormInstance>();
    const ruleForm = reactive(<IRegisterReq>{
      account: "",
      password: "",
      confirm_password: "",
    });
    const accountTip = ref(false);
    const passwordTip = ref(false);
    const confirmPwdTip = ref(false);

    //输入框获得焦点时显示提示信息并清除验证信息
    const onAccount = () => {
      accountTip.value = true;
      ruleFormRef.value?.clearValidate("account");
    };
    const outAccount = () => {
      accountTip.value = false;
    };
    const onPassword = () => {
      passwordTip.value = true;
      ruleFormRef.value?.clearValidate("password");
    };
    const outPassword = () => {
      passwordTip.value = false;
    };
    const onConfirmPwd = () => {
      confirmPwdTip.value = true;
      ruleFormRef.value?.clearValidate("confirm_password");
    };
    const outConfirmPwd = () => {
      confirmPwdTip.value = false;
    };

    //自定义验证函数
    const validateAccount = (rule: any, value: any, callback: any) => {
      let accountReg = /^[a-zA-Z0-9_]{6,18}$/; //由字母或数字或下划线组成的6-18位字符串
      if (!value) {
        return callback(new Error("请输入账号"));
      } else if (!accountReg.test(value)) {
        callback(new Error("请按要求输入账号"));
      } else {
        callback();
      }
    };
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
      } else if (!ConfirmPwdReg.test(value)) {
        callback(new Error("请按要求输入确认密码"));
      } else if (value !== ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    //验证规则
    const rules = reactive({
      account: [{ validator: validateAccount, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      confirm_password: [{ validator: validateConfirmPwd, trigger: "blur" }],
    });

    //跳转至登录页面
    const goLogin = () => {
      router.push("/Login");
    };

    //发送注册请求
    const register = async () => {
      try {
        const res = await api.register(
          ruleForm.account,
          ruleForm.password,
          ruleForm.confirm_password
        );
        if (res.stat === "ok") {
          ElMessage.success("注册成功");
          router.push("/login");
        } else {
          ElMessage.info("注册失败");
        }
      } catch (err) {
        console.trace(err);
      }
    };

    //提交验证
    const submitForm = () => { 
      // 关闭所有提示
      accountTip.value = false;
      passwordTip.value = false;
      confirmPwdTip.value = false;
      
      // 判断验证是否都通过
      ruleFormRef.value?.validate(async (validate) => {
        if (validate) {
          await register();
        } else {
          ElMessage.error("请按要求填写信息！");
        }
      });
    };
    return {
      accountTip,
      passwordTip,
      confirmPwdTip,
      ruleForm,
      ruleFormRef,
      rules,
      onAccount,
      outAccount,
      onPassword,
      outPassword,
      onConfirmPwd,
      outConfirmPwd,
      goLogin,
      submitForm,
    };
  },
});
</script>

<style scoped>
.page {
  display: flex;
  background-color: #fff;
  height: 100%;
}
.page-left {
  width: 580px;
  height: 100%;
  /* background: url(https://js2.epy.wpscdn.cn/security/da_banner.png); */
  background: url("../assets/imgs/Login_banner.png");
  background-size: cover;
  background-position: 80% 0;
  background-repeat: no-repeat;
}
.top-logo {
  position: absolute;
  top: 20px;
  left: 30px;
  width: 312px;
  height: 28px;
  background-image: url(https://ee.wpscdn.cn/wpscn/images/home/logo-dah.2e5a4add.svg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.page-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  /* background: linear-gradient(#87CEFA, #fff); */
  font-family: Helvetica, Tahoma, Arial, "Heiti SC", "Microsoft YaHei",
    "WenQuanYi Micro Hei";
  /* background-color: #B0E2FF; */
}
.register-box {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 150px;
}
.register-box-top {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}
.back-icon {
  font-size: 35px;
  margin-top: -1px;
  color: #a1a1a1;
  cursor: pointer;
}
.back-icon:hover {
  color: #409eff;
}
.register-title {
  margin-left: 20px;
  font-size: 42px;
  font-weight: 600;
  color: #000;
}
.text-input {
  width: 450px;
  height: 50px;
  margin: 15px 0;
  font-size: 20px;
}
.tip {
  position: absolute;
  font-size: 14px;
  color: #8b8989;
}
.accountTip {
  top: 178px;
  left: 0;
}
.passwordTip {
  top: 275px;
  left: 0;
}
.confirmPwdTip {
  top: 374px;
  left: 0;
}
.register-btn {
  width: 450px;
  height: 50px;
  margin-top: 20px;
  font-size: 18px;
}
</style>
