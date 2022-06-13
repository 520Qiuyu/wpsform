<template>
  <div class="newform-result-containner">
    <el-tabs v-model="activeName" class="newform-result-tabs">
      <el-tab-pane label="数据详情&统计" name="statistical-details">
        <StatisticalDetails></StatisticalDetails>
      </el-tab-pane>
      <el-tab-pane label="表单问题" name="form-question">
        <FormQuestion></FormQuestion>
      </el-tab-pane>
      <el-tab-pane label="分享" name="share">
        <FormShare></FormShare>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import StatisticalDetails from "./StatisticalDetails.vue";
import FormQuestion from "./FormQuestion.vue";
import FormShare from "./FormShare.vue";

export default defineComponent({
  name: "NewformResult",
  components: {
    StatisticalDetails,
    FormQuestion,
    FormShare,
  },
  props: {},
  setup(props, ctx) {
    const store = useStore();
    const router = useRouter();
    const activeName = ref("statistical-details");

    onBeforeMount(() => {
      store.commit("setAppStatus", 3);
    });
    return {
      activeName,
    };
  },
});
</script>

<style>
.newform-result-tabs {
  padding-top: 10px;
}

.newform-result-tabs .el-tabs__nav {
  height: 56px;
  padding-left: 30px;
}
</style>
