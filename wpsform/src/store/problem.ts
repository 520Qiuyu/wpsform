import { IProblem } from "@/types/types";
export default {
  namespaced: true,
  actions: {},
  mutations: {
    // 设置左侧适配的题目类型列表
    setQuesTypes(
      state: any,
      value: {
        title: string;
        type:
          | "input"
          | "singleSelect"
          | "multiSelect"
          | "pullSelect"
          | "date"
          | "time"
          | "score";
      }[]
    ) {
      state.quesTypes = value;
    },
    // 设置左侧基础题目类型
    setBasicQuesFormworks(state: any, value: IProblem[]) {
      state.questionFormworks = value;
    },
    // 将该问题添加到常用
    addToCommonUse(state: any, value: IProblem) {
      console.log("addToCommonUse", state.commonUseQues);
      state.commonUseQues.push(value);
    },
    // 批量将问题添加到常用
    addAllToCommonUse(state: any, value: IProblem[]) {
      console.log("addAllToCommonUse", value);
      state.commonUseQues = value;
    },
    // 清空常用
    clearAllCommonUse(state: any) {
      state.commonUseQues = [];
    },
    // 删除常用
    delCommonUse(state: any, id: string) {
      state.commonUseQues = state.commonUseQues.filter(
        (item: IProblem) => item.id != id
      );
    },
  },
  state: {
    // 左侧适配的题目类型列表
    quesTypes: [],

    // 左侧题目模板列表
    questionFormworks: [] as IProblem[],
    commonUseQues: [] as IProblem[],
  },
  getters: {},
};
