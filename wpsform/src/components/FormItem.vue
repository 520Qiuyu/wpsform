<template>
  <div class="form-item">
    <div class="form-title">{{ form.title }}</div>
    <div class="form-subTitile">{{ form.subTitle }}</div>
    <div class="form-questions">
      <el-form :model="form.problems" status-icon >
        <el-form-item
          v-for="(problem, index) in form.problems"
          :key="problem.id"
          :label="`${problem.required ? '*':''}`"
        >
          <ShowProItem
            :problem="problem"
            :index="index"
            @setProblemResult="setProblemResult"
            :disableWrite="disableWrite_"
          ></ShowProItem>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-submit-area">
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
import {
  defineComponent,
  ref,
  reactive,
  onBeforeMount,
  PropType,
  computed,
} from "vue";
import { useRouter } from "vue-router";
import * as api from "@/services/api";
import { IUser, IForm, IProblem } from "../types/types";
import { useStore } from "vuex";
import ShowProItem from "@/components/ShowProItem.vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "FormItem",
  components: { ShowProItem },
  props: {
    formId: {
      type: String,
      required: true,
    },
    submitDisabled: {
      type: Boolean,
      default: true,
    },
    disableWrite: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:disableWrite"],
  setup(props, ctx) {
    const router = useRouter();
    const form = ref({} as IForm);
    const getForm = async (id: string) => {
      const res = await api.getForm(id);
      if (res.stat == "ok") {
        form.value = res.data.item;
      }
    };
    // 是的是否可读写可控
    const disableWrite_ = computed({
      get() {
        return props.disableWrite;
      },
      set(newVal) {
        ctx.emit("update:disableWrite", newVal);
      },
    });
    // 弹出层是否隐藏
    const dialogVisible = ref(false);

    //提交表单，判断是否填写完成
    const submit = () => {
      const complete = form.value.problems.every((item) => item.result?.value);
      if(complete){
        dialogVisible.value = true;
      }else{
        ElMessage.error("表单未填写完整");
      }
    };
    //确定提交
    const handelConfirm = async () => {
      const res = await api.inputForm(
        form.value.id,
        form.value.problems
      );
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
      dialogVisible.value = false;
    };

    // 设置问题的填写答案
    const setProblemResult = (result: any, problemId: string) => {
      form.value.problems.forEach((item) => {
        if (item.id === problemId) {
          Object.assign(item, result);
          console.log("item", item);
        }
      });
    };
    return {
      getForm,
      form,
      disableWrite_,
      submit,
      setProblemResult,
      dialogVisible,
      handelConfirm,
    };
  },
  async created() {
    await this.getForm(this.formId);
    if (this.form.status === 2 || this.form.status === 4) {
      ElMessage.error(
        this.form.status === 2 ? "该表单未发布" : "该表单已结束收集"
      );
      this.disableWrite_ = true;
    }
  },
});
</script>

<style scoped>
.form-item {
  background-color: #fff;
  padding: 10px 50px 30px;
}
.form-title {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  padding-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.form-subTitile {
  font-size: 16px;
  color: #ccc;
  text-align: center;
  margin-bottom: 40px;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.el-form-item >>> .el-form-item__label{
  color: red;
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
@media screen and (min-width: 1366px) {
  .form-item {
    padding: 30px 100px 30px;
  }
}
@media screen and (max-width:425px) {
  .form-title{
    font-size: 18px;
  }
}
</style>
