<template>
  <div class="preview-container">
    <div class="preview">
      <div class="form-title">{{ previewForm.title }}</div>
      <div class="form-subTitile">{{ previewForm.subTitle }}</div>
      <div class="form-questions">
        <ProblemItem
          v-for="(problem, index) in previewForm.problems"
          :key="problem.id"
          :problem="problem"
          :index="index"
          :disableWrite="true"
        >
        </ProblemItem>
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
import { IForm } from "../types/types";
import ProblemItem from "../components/ProblemItem.vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "FormPreview",
  components: { ProblemItem },
  props: {},
  setup(props, ctx) {
    const Route = useRoute();
    const Router = useRouter();
    const Store = useStore();
    /* const previewForm = ref({
      title: Store.state.form.formTitle,
      subTitle: Store.state.form.formSubTitle,
      problems: Store.state.form.questionList,
    }); */
    const previewForm = ref({
      title: "邱哥",
      subTitle: "思密达",
      problems: [
        {
          type: "input",
          title: "秒拒市局吗",
          required: true,
          isNew: true,
          id: "f2042ea8-c2e8-4851-9a9a-68a70932d27a",
        },
        {
          type: "singleSelect",
          title: "性别",
          required: true,
          isNew: true,
          id: "2f4c25ab-6585-42f0-a487-0e4ab09b3ab0",
          setting: {
            options: [
              {
                title: "男",
                status: 1,
                id: "8e50fd45-f867-437e-a78f-1cafaaa4e75c",
              },
              {
                title: "女",
                status: 2,
                id: "c6843053-eedc-48be-832a-599bcd445281",
              },
            ],
          },
        },
        {
          type: "multiSelect",
          title: "爱好",
          required: true,
          isNew: false,
          id: "1627a8c3-8331-4760-baba-24660ef1fd11",
          setting: {
            options: [
              {
                title: "抽烟",
                status: 2,
                id: "e4c288a1-0857-4fdd-83b1-747f6cce9aed",
              },
              {
                title: "喝酒",
                status: 2,
                id: "d61c9df9-861e-4eac-97b2-f8709253c1c4",
              },
            ],
          },
        },
        {
          type: "pullSelect",
          title: "是猪",
          required: true,
          isNew: true,
          id: "2fc0c381-3d56-4574-a2e8-0d10a78f0029",
          setting: {
            options: [
              {
                title: "1",
                status: 1,
                id: "df87b863-aee8-4327-9ccc-2d36865caa6a",
              },
              {
                title: "2",
                status: 1,
                id: "009994be-311c-4b3e-be23-cf489f48fd61",
              },
            ],
          },
        },
        {
          type: "date",
          title: "哈哈哈哈哈",
          required: true,
          isNew: true,
          id: "ee9a126b-9702-4e71-8069-70d0860f3b0e",
          setting: {
            options: [
              {
                title: "YM",
                status: 1,
              },
              {
                title: "YMD",
                status: 1,
              },
              {
                title: "YMDHM",
                status: 1,
              },
            ],
          },
        },
        {
          type: "time",
          title: "四期",
          required: true,
          isNew: true,
          id: "60aece8f-2aba-4abb-9fe3-7f4340b1117b",
          setting: {
            options: [
              {
                title: "HM",
                status: 1,
              },
              {
                title: "HMS",
                status: 1,
              },
            ],
          },
        },
        {
          type: "score",
          title: "评分",
          required: true,
          isNew: true,
          id: "112070a9-a428-48cb-abf2-0b841f6d1d56",
        },
      ] /*  */,
    });
    const keepingEdit = () => {
      Router.push({
        name: "new-form-create",
      });
    };
    return {
      previewForm,
      Route,
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
  background-color: #f2f4f7;
}
.preview {
  width: 600px;
  margin: 80px auto 0;
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
</style>