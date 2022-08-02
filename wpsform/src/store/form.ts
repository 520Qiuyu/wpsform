import { formDraft, IForm, IProblem } from "../types/types";
import problem from "./problem";
import { nanoid } from "nanoid";
import { ElMessage } from "element-plus";
export default {
  namespaced: true,
  actions: {},
  mutations: {
    // 向中间列表添加题目
    addQuesToQuesList(
      state: any,
      value: {
        problem: IProblem;
        index: number;
      }
    ) {
      const problemTemp = Object.assign(
        {},
        JSON.parse(JSON.stringify(state.question)),
        JSON.parse(JSON.stringify(value.problem)),
        { id: nanoid() }
      );
      // 在最后插入,用于左侧向中间添加题目
      if (value.index === -1) {
        state.questionList.push(problemTemp);
      }
      // 在指定位置插入，用于复制题目
      else if (value.index > -1) {
        state.questionList.splice(value.index, 0, problemTemp);
      }
    },
    // 修改列表中的题目
    setProblem(state: any, value: { id: string; problem: IProblem }) {
      state.questionList.forEach((ques: any) => {
        if (ques.id === value.id) {
          ques = value.problem;
        }
      });
    },
    // 删除列表中的题目
    delQuesFromQuesList(state: any, id: string) {
      state.questionList = state.questionList.filter(
        (item: IProblem) => id != item.id
      );
    },
    // 清空表单
    clearFormList(state: any) {
      state.questionList = [];
      state.formTitle = "";
      state.formSubTitle = "";
    },
    // 设置表单标题
    setFormTitle(state: any, value: string) {
      state.formTitle = value;
    },
    // 设置表单付标题
    setFormSubTitle(state: any, value: string) {
      state.formSubTitle = value;
    },
    // 设置草稿表单
    setFormDraft(state: any) {
      state.formDraft = {
        formTitle: state.formTitle,
        formSubTitle: state.formSubTitle,
        problems: state.questionList,
      };
      localStorage.setItem("formDraft", JSON.stringify(state.formDraft));
    },
    // 使用草稿
    useDraft(state: any) {
      const form = JSON.parse(localStorage.getItem("formDraft") as string);
      state.questionList = form.problems;
      state.formTitle = form.formTitle;
      state.formSubTitle = form.formSubTitle;
      ElMessage({
        message: "读取成功",
        type: "success",
        center: true,
      });
    },
  },
  state: {
    // 已添加表单的问题列表
    questionList: [] as IProblem[],
    // 已添加的表单的title
    formTitle: "",
    // 已添加的表单的subTitle
    formSubTitle: "",
    // 表单草稿
    formDraft: {} as formDraft,
    // question
    question: {
      id: "",
      isNew: true,
      title: "",
      type: "input",
      required: true,
    } as IProblem,
  },
  getters: {},
};
