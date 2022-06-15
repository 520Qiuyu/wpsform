<template>
  <div class="form-item">
    <div class="form-title">{{ form.title }}</div>
    <div class="form-questions">
      <!-- <ProblemItem
        v-for="(problem, index) in form.problems"
        :key="problem.id"
        :problem="problem"
        :index="index"
      >
      </ProblemItem> -->
    </div>
    <div class="form-submit-area">
      <el-button type="primary" class="form-submit">提交</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import * as api from "@/services/api";
import { IUser, IForm, IProblem } from "../types/types";
import { useStore } from "vuex";
import ProblemItem from "./ProblemWrite.vue";

export default defineComponent({
  name: "FormItem",
  components: { ProblemItem },
  props: {},
  setup(props, ctx) {
    const form = ref({} as IForm);

    const getForm = async (id: string) => {
      const res = await api.getForm(id);
      if (res.stat == "ok") {
        // for (const key in res.data.item) {
        //   form[key] = res.data.item[key]
        // }
        form.value = JSON.parse(JSON.stringify(res.data.item));
      }
    };

    onBeforeMount(() => {
      getForm("1a32c9ef-a809-4838-aec9-22c847de0006");
    });

    return {
      form,
    };
  },
});
</script>

<style scoped>
.form-title {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 50px;
}
.form-submit {
  width: 96px;
}
.form-submit-area {
  display: flex;
  justify-content: center;
}
.form-submit {
  width: 96px;
}
</style>
