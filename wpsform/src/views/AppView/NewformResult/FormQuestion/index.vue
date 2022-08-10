<template>
  <div class="form-question-main">
    <div class="form-question-content">
      <FormItem
        :formId="formId"
        :submitDisabled="false"
        v-model:disableWrite="disableWrite"
      ></FormItem>
    </div>
  </div>
  <el-affix position="bottom" :offset="120">
    <el-button type="primary" @click="goWriteForm">填写表单</el-button>
  </el-affix>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FormItem from "@/components/FormItem.vue";
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
      router.push({
        name: "form-write",
        query: {
          id: formId.value,
        },
      });
    };
    const disableWrite = ref(true);
    return {
      formId,
      goWriteForm,
      disableWrite,
    };
  },
});
</script>

<style scoped>
.form-question-main {
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 330px;
  background-color: #f2f4f7;
}
.form-question-content {
  margin-top: 50px;
  margin-bottom: 50px;
  width: 60%;
  background-color: #fff;
}

.form-write-area {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  z-index: 3;
  width: 60%;
  margin: 0 auto;
  background-color: #fff;
  padding: 15px 0;
}
.form-write-btn {
  width: 96px;
  margin-left: -16px;
}

.el-affix {
  background-color: #f2f4f7;
}

.el-affix >>> .el-button {
  float: right;
  margin-right: calc(44px);
}
@media screen and (max-width: 768px) {
    .form-question-content{
      width: 80%;
    }
}
@media screen and (max-width: 425px) {
  .form-question-content {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 95%;
  }
  
}
</style>
