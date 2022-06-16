<template>
  <div class="form-question-main">
    <div class="form-question-content">
      <FormItem
        :formId="formId"
        :submitDisabled="false"
        :disableWrite="true"
      ></FormItem>
    </div>
    <div class="form-write-area">
      <el-button type="primary" class="form-write-btn" @click="goWriteForm"
        >填写表单</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FormItem from "../components/FormItem.vue";
import { useRouter, useRoute } from "vue-router";
import * as api from "@/services/api";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "FormQuestion",
  components: {
    FormItem,
  },
  setup(props, ctx) {
    const router = useRouter();
    const route = useRoute();
    const formId = ref(route.query.id as string);
    const goWriteForm = async () => {
      const res = await api.getForm(formId.value);
      console.log("id", res);
      if (res.stat == "ok") {
        const status = res.data.item.status;
        if (status == 2) {
          ElMessage.error("表单未发布！");
        } else if (status == 4) {
          ElMessage.error("表单收集已结束！");
        } else {
          router.push({
            name: "form-write",
            query: {
              id: formId.value,
            },
          });
        }
      }
    };
    return {
      formId,
      goWriteForm,
    };
  },
  created() {
    console.log(this.formId);
  },
});
</script>

<style scoped>
.form-question-main {
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 330px;
  height: 100%;
  background-color: #f2f4f7;
}
.form-question-content {
  min-height: 100%;
  width: 100%;
  background-color: #fff;
  overflow: auto;
}

.form-write-area {
  display: flex;
  justify-content: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 3;
  width: 100%;
  background-color: #fff;
  padding: 15px 0;
}
.form-write-btn {
  width: 96px;
  margin-left: -16px;
}
@media screen and (min-width:768px){
  .form-question-content {
    width: 80%;
  }
}
@media screen and (min-width:1366px){
  .form-question-content {
    width: 60%;
  }
}
</style>
