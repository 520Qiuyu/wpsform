import { IProblem } from "@/types/types";
export default {
  namespaced: true,
  actions: {},
  mutations: {
    // 将该问题添加到常用
    addToCommonUse(state: any, value: IProblem) {
      state.commonUseQues.push(value);
    },
  },
  state: {
    // 左侧适配的题目类型列表
    quesTypes: [
      {
        type: "input",
        typeName: "填空题",
      },
      {
        type: "singleSelect",
        typeName: "单选题",
      },
      {
        type: "multiSelect",
        typeName: "多选题",
      },
      {
        type: "pullSelect",
        typeName: "下拉选择",
      },
      {
        type: "date",
        typeName: "日期题",
      },
      {
        type: "time",
        typeName: "时间题",
      },
      {
        type: "score",
        typeName: "分数题",
      },
    ],
    commonUseQues: [] as IProblem[],
  },
  getters: {},
};
