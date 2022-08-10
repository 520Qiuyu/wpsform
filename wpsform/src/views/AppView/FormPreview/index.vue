<template>
  <div class="preview-container">
    <div class="preview">
      <div class="form-title">{{ previewForm.title }}</div>
      <div class="form-subTitile">{{ previewForm.subTitle }}</div>
      <div class="form-questions">
        <ShowProItem
          v-for="(problem, index) in previewForm.problems"
          :key="problem.id"
          :problem="problem"
          :index="index"
          :disableWrite="true"
        >
        </ShowProItem>
      </div>
      <div class="back-btn-box">
        <button class="back-btn" @click="keepingEdit">继续编辑</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { IForm } from "@/types/types";
import ShowProItem from "@/components/ShowProItem.vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "FormPreview",
  components: { ShowProItem },
  props: {},
  setup(props, ctx) {
    const Route = useRoute();
    const Router = useRouter();
    const Store = useStore();
    const previewForm = ref({
      title: Store.state.form.formTitle,
      subTitle: Store.state.form.formSubTitle,
      problems: Store.state.form.questionList,
    });

    const keepingEdit = () => {
      Router.push({
        name: "new-form-create",
      });
    };
    return {
      previewForm,
      Route,
      keepingEdit,
    };
  },
  created() {
    if (!this.previewForm.title) {
      ElMessage({
        message: "未找到表单，请先创建",
        type: "error",
        center: true,
      });
      this.$router.push({
        name: "new-form-create",
      });
    }
  },
});
</script>

<style scoped>
.preview-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f2f4f7;
}
.preview {
  width: 600px;
  margin: 80px auto 50px;
  background-color: #fff;
  border-radius: 5px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-title {
  width: 200px;
  height: 40px;
  text-align: center;
  font-size: 26px;
  font-weight: 600;
  vertical-align: middle;
  margin-bottom: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.form-subTitile {
  width: 200px;
  height: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
}
.form-questions {
  width: 70%;
}
.back-btn {
  padding: 10px 20px;
  height: 40px;
  border: none;
  color: #fff;
  font-size: 16px;
  background-color: #1488ed;
}
@media screen and (max-width:768px) {
  .preview{
    width: 80%;
  }
  .form-title{
    font-size: 20px;
  }
}
@media screen and (max-width:425px) {
  .preview{
    width: 90%;
  }
}
</style>