<template>
  <div class="share-panel">
    <div class="title-box">
      <h1 class="title">分享邀请他人填写</h1>
    </div>
    <div class="code-box">
      <img src="" />
    </div>
    <div class="copy-btn-box">
      <button>
        <el-icon><Paperclip /></el-icon>复制链接
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "FormShare",
  components: {},
  props: {},
  setup(props, ctx) {
    const Route = useRoute();
    const formId = ref(Route.query.id as string);
    const shareUrl = computed(() => `localhost:8080/form-write/${formId}`);
    return {
      formId,
    };
  },
  created() {
    console.log("分享id:", this.formId);
  },
});
</script>

<style scoped>
</style>