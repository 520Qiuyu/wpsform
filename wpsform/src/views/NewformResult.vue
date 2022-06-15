<template>
  <div class="newform-result-container">
    <el-tabs
      v-model="activeName"
      class="newform-result-tabs"
      @tab-change="handleChange"
    >
      <el-tab-pane label="数据详情&统计" name="statistical-details">
        <StatisticalDetails :formId="formId"></StatisticalDetails>
      </el-tab-pane>
      <el-tab-pane label="表单问题" name="form-question">
        <FormQuestion :formId="formId" @ChangeId="ChangeId"></FormQuestion>
      </el-tab-pane>
      <el-tab-pane label="分享" name="share">
        <FormShare :formId="formId"></FormShare>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
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
    const route = useRoute();
    const router = useRouter();
    const activeName = ref("");
    const formId = ref(route.params.id);

    const handleChange = (tabPaneName: string) => {
      router.push({
        name: tabPaneName,
        params: {
          id: formId.value,
        },
      });
    };

    const ChangeId = (val: string) => {
      formId.value = val;
      console.log("@@@父组件ChangeId执行");
      console.log(formId.value);
    };

    onBeforeMount(() => {
      store.commit("user/setAppStatus", 3);
      activeName.value = String(route.name) || "";
      // console.log(activeName.value);
    });
    return {
      activeName,
      ChangeId,
      handleChange,
      formId,
    };
  },
});
</script>

<style>
.newform-result-container {
  /* height: 100%; */
  margin-top: 56px;
  overflow: hidden;
}
.newform-result-tabs {
  height: 100%;
}
.el-tabs__header {
  margin-bottom: 0;
}
.el-tabs__content {
  height: 100%;
  background-color: #f2f4f7;
}

.el-tab-pane {
  height: 100%;
}

.newform-result-tabs {
  padding-top: 10px;
}

.newform-result-tabs .el-tabs__nav {
  height: 56px;
  padding-left: 30px;
}
</style>
