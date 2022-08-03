import { formDraft, IForm, IProblem } from "../types/types";
import problem from "./problem";
import { nanoid } from "nanoid";
import { ElMessage } from "element-plus";
import { getFormList } from "@/services/api";
export default {
  namespaced: true,
  actions: {
    // 获取表单列表
    getFormList: async (
      context: any,
      params: { offset: number; limit: number; isStar: boolean }
    ) => {
      const res = await getFormList(params.offset, params.limit, params.isStar);
      if (res.stat === "ok") {
        context.commit("setFormList", res.data.items);
        context.commit("setFormTotal", res.data.total);
      }
    },
  },
  mutations: {
    // 向中间列表添加一个题目
    addQuesToQuesList(
      state: any,
      value: {
        problem: IProblem;
        index: number;
      }
    ) {
      const problemTemp = JSON.parse(
        JSON.stringify(
          Object.assign({}, state.question, value.problem, { id: nanoid() })
        )
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
    // 向中间列表添加一个questionList
    addQuesListToQuesList(state: any, questList: IProblem[]) {
      state.questionList = questList;
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
    // 设置表单列表
    setFormList(state: any, value: IForm[]) {
      state.formList = value;
    },
    // 设置表单列表总数
    setFormTotal(state: any, num: number) {
      state.formTotal = num;
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
    // question模板
    question: {
      id: "",
      isNew: true,
      title: "",
      type: "input",
      required: true,
    } as IProblem,
    // 表单列表，首页展示
    formList: [] as IForm[],
    // 表单总数
    formTotal: 0,
  },
};
