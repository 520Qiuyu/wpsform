import { IProblem } from "@/types/types";
export default {
  namespaced: true,
  actions: {},
  mutations: {
    // 将该问题添加到常用
    addToCommonUse(state: any, value: IProblem) {
      console.log("addToCommonUse",state.commonUseQues);
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

    // 左侧题目模板列表
    questionFormworks: [
      {
        name: "姓名",
        problem: {
          id: "",
          type: "input",
          title: "姓名",
          required: false,
          isNew: false,
        },
      },
      {
        name: "性别",
        problem: {
          id: "",
          type: "singleSelect",
          title: "性别",
          required: false,
          isNew: false,
          setting: {
            options: [
              { title: "男", status: 1 },
              { title: "女", status: 1 },
            ],
          },
        },
      },
    ],
    commonUseQues: [] as IProblem[],
  },
  getters: {},
};
