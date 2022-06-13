<template>
  <div class="newform-create-wrapper">
    <div class="newform-create">
      <!-- 左侧列表问题背板 -->
      <div class="question-panel">
        <div class="question-formwork-wrapper">
          <!-- 添加题目 -->
          <div class="title">
            添加题目
            <ul class="add-question">
              <li
                v-for="(type, index) in quesTypes"
                :key="type.type + index"
                class="question-type-item"
              >
                <a @click="addQuesToQuesList(type.type)">{{ type.typeName }}</a>
              </li>
            </ul>
          </div>
          <!-- 题目模板 -->
          <div class="title">
            题目模板
            <ul class="question-formwork">
              <li
                v-for="(formwork, index) in questionFormworks"
                :key="formwork + index"
                class="question-formwork-item"
              >
                <a>{{ formwork }}</a>
              </li>
            </ul>
          </div>
          <!-- 我的常用题 -->
          <div class="title">
            我的常用题
            <ul class="my-common-use">
              <li
                v-for="(ques, index) in myCommonUse"
                :key="ques + index"
                class="my-common-use-item"
              >
                <a>{{ ques.title }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 中间问题列表 -->
      <div class="question-list">
        <MyQuestion
          v-for="(ques, index) in questionList"
          :key="ques.id"
          :ques="ques"
          :index="index"
          @addQuesToQuesList="addQuesToQuesList"
        ></MyQuestion>
      </div>
      <!-- 右侧其他配置 -->
      <div class="other-option">这里是其他配置</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useStore } from "vuex";
import MyQuestion from "../components/MyQuestion.vue";
import { IProblem } from "../types/types";
import { nanoid } from "nanoid";
export default defineComponent({
  name: "NewformCreate.vue",
  components: { MyQuestion },
  props: {},
  setup(props, ctx) {
    const Store = useStore();
    // 可添加的题目类型
    const quesTypes = computed(() => Store.state.problem.quesTypes);
    // 题目模板
    const questionFormworks = computed(
      () => Store.state.form.questionFormworks
    );
    // 我的常用题
    const myCommonUse = computed(() => Store.state.problem.commonUseQues)
    // 中间题目列表
    const questionList = computed<IProblem[]>(
      () => Store.state.form.questionList
    );
    // 向中间添加一个题目
    const addQuesToQuesList = (type: string) => {
      const problem = {
        type,
        title: "",
        required: false,
        isNew: false,
      } as IProblem;
      console.log(problem);
      Store.commit("form/addQuesToQuesList", { problem, index: -1 });
      console.log(questionList);
    };
    const test = () => {
      const type = { a: 1 };
      const aa = { type };
      console.log(aa.type === type);
    };
    return {
      quesTypes,
      questionFormworks,
      myCommonUse,
      questionList,
      addQuesToQuesList,
      test,
    };
  },

  created() {
    this.test();
  },
});
</script>


<style scoped>
.newform-create-wrapper {
  min-height: calc(100vh - 56px);
  margin-top: 56px;
  overflow-y: auto;
  background-color: #f2f4f7;
  padding: 30px 50px;
  display: flex;
  justify-content: center;
}
.newform-create {
  min-width: 1160px;
  border: 1px solid #e7e9eb;
  display: flex;
  justify-content: space-between;
}
.question-panel,
.other-option,
.question-list {
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #e7e9eb;
  color: #3d4757;
  overflow-y: auto;
  margin: 10px;
}
.question-panel,
.other-option {
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.question-panel {
  height: 400px;
  padding: 24px 16px;
  max-height: calc(100vh - 150px);
}
.question-formwork-wrapper {
  display: flex;
  flex-direction: column;
}
.title {
  width: 100%;
  font-size: 14px;
  color: #3d4757;
  font-weight: 600;
  margin-bottom: 30px;
}
.title:last-child {
  margin-bottom: 0;
}
.add-question,
.question-formwork,
.my-common-use {
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  flex-wrap: wrap;
}
.question-type-item,
.question-formwork-item,
.my-common-use-item {
  width: 80px;
  border: 1px solid #e7e9eb;
  text-align: center;
  margin: 8px 0 0;
  display: flex;
  justify-content: center;
  transition: all 0.2s;
  cursor: pointer;
}
.question-type-item:hover,
.question-formwork-item:hover,
.my-common-use-item:hover {
  border: 1px solid #1488ed;
}
.question-type-item a,
.question-formwork-item a,
.my-common-use-item a {
  line-height: 25px;
  flex: 1;
  display: inline-block;
  width: 100%;
  font-size: 12px;
  font-weight: 500;
}
.question-list {
  width: 670px;
  height: 660px;
  max-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.other-option {
}
</style>