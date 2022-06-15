<template>
  <div class="form-item">
    <div class="form-title">{{ form.title }}</div>
    <div class="form-questions">
      <ProblemItem
        v-for="(problem, index) in form.problems"
        :key="problem.id"
        :problem="problem"
        :index="index"
        @setProblemResult="setProblemResult"
      >
      </ProblemItem>
    </div>
    <div class="form-submit-area">
      <!-- <el-button @click="saveDraft">保存草稿</el-button> -->
      <el-button
        type="primary"
        class="form-submit"
        @click="submit"
        v-if="submitDisabled"
      >
        提交
      </el-button>
    </div>
    <el-dialog v-model="dialogVisible" title="提交内容" width="30%">
      <span>提交后不可修改，确定提交？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handelConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import * as api from "@/services/api";
import { IUser, IForm, IProblem } from "../types/types";
import { useStore } from "vuex";
import ProblemItem from "./ProblemItem.vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "FormItem",
  components: { ProblemItem },
  props: {
    formId: String,
    submitDisabled: Boolean,
  },
  setup(props, ctx) {
    const router = useRouter();
    const form = ref({} as IForm);
    const dialogVisible = ref(false);

    const getForm = async (id: string) => {
      const res = await api.getForm(id);
      if (res.stat == "ok") {
        form.value = JSON.parse(JSON.stringify(res.data.item));
      }
    };

    //保存草稿
    const saveDraft = () => {
      console.log("保存草稿");
    };
    //提交
    const submit = () => {
      dialogVisible.value = true;
    };
    //确定提交
    const handelConfirm = async () => {
      dialogVisible.value = false;
      const res = await api.inputForm(props.formId!, form.value.problems);
      if (res.stat == "ok") {
        ElMessage({
          message: "表单填写成功，已提交",
          type: "success",
        });
        //清空数据
        router.push("/app");
      } else {
        ElMessage.error("表单提交失败！");
      }
    };

    const setProblemResult = (result: any, id: string) => {
      //id指表单id
      form.value.problems.forEach((problem) => {
        if (problem.id == id) {
          //填空题,分数题,日期题,时间题结果value类型为string或number
          if (
            problem.type == "input" ||
            problem.type == "score" ||
            problem.type == "date" ||
            problem.type == "time"
          ) {
            problem.result = { value: result };
            console.log(problem.result);
          }
          //单选题,下拉选择题结果value类型为
          // {
          //   id: string
          //   title: string
          // }
          else if (
            problem.type == "singleSelect" ||
            problem.type == "pullSelect"
          ) {
            problem.result! = {
              value: {
                id: result.value.id,
                title: result.value.title,
              },
            };
            // console.log(result.value);
          }
          //多选题结果类型为
          // {
          //   id: string
          //   title: string
          // }[]
          else if (problem.type == "multiSelect") {
            problem.result! = {
              value: [],
            };
            problem.result.value = result.value;
            console.log(problem.result.value);
          }
        }
      });
    };

    onBeforeMount(() => {
      getForm(props.formId!);
      // console.log(props.formId);
    });

    return {
      form,
      saveDraft,
      submit,
      setProblemResult,
      dialogVisible,
      handelConfirm,
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
  margin-top: 50px;
}
.form-submit {
  width: 96px;
}
</style>
