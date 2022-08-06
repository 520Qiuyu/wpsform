<template>
  <div class="share-panel">
    <div class="title-box">
      <h1 class="title">分享邀请他人填写</h1>
    </div>
    <div class="code-box">
      <QrcodeVue :value="shareUrl" :size="200" />
    </div>
    <div class="copy-btn-box">
      <button class="copy-btn" @click="cpoyShareUrl">
        <el-icon><Paperclip /></el-icon>复制链接
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
import QrcodeVue from "qrcode.vue";
import useClipboard from "vue-clipboard3";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "FormShare",
  components: { QrcodeVue },
  props: {},
  setup(props, ctx) {
    const {proxy} = getCurrentInstance() as any
    const Route = useRoute();
    const { toClipboard } = useClipboard();
    const formId = ref(Route.query.id as string);
    const shareUrl = computed(
      () => `${proxy.$currentDomainName}/form-write?id=${formId.value}`
    );
    const cpoyShareUrl = async () => {
      try {
        await toClipboard(shareUrl.value);
        ElMessage({
          message: "复制成功,请去浏览器打开",
          type: "success",
          center:true,
        });
      } catch (e) {
        ElMessage({
          message: "很遗憾 复制失败 再接再厉吧",
          type: "error",
          center:true,
        });
      }
    };
    return {
      formId,
      shareUrl,
      cpoyShareUrl,
    };
  },
});
</script>

<style scoped>
.share-panel {
  width: 800px;
  height: 400px;
  background-color: #ffffff;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  padding: 30px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}
.title-box {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #e7e9eb;
}
.title {
  line-height: 30px;
  font-size: 20px;
}
.code-box {
  flex: 1;
  display: flex;
  align-items: center;
}
.copy-btn-box {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-top: 1px solid #e7e9eb;
}
.copy-btn {
  width: 100px;
  height: 30px;
  background-color: #fff;
  border: none;
  cursor: pointer;
  border: 1px solid #e2e4e8;
}
</style>