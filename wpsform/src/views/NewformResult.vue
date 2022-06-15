<template>
  <div class="newform-result-container">
    <el-tabs v-model="activeName" class="newform-result-tabs">
      <el-tab-pane label="数据详情&统计" name="statistical-details">
        <StatisticalDetails
          :Formid="Formid"
          @ChangeId="ChangeId"
        ></StatisticalDetails>
      </el-tab-pane>
      <el-tab-pane label="表单问题" name="form-question">
        <FormQuestion :Formid="Formid"></FormQuestion>
      </el-tab-pane>
      <el-tab-pane label="分享" name="share">
        <FormShare :Formid="Formid"></FormShare>
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

    const Formid = ref(router.currentRoute.value.params.Formid as string);

    const ChangeId = (val: string) => {
      Formid.value = val;
      console.log("@@@父组件ChangeId执行");
      console.log(Formid.value);
    };

    onBeforeMount(() => {
      store.commit("setAppStatus", 3);
    });
    return {
      activeName,
      Formid,
      ChangeId,
    };
  },
  // created() {},
});
</script>

<style>
.newform-result-container {
  height: 100%;
  margin-top: 56px;
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
