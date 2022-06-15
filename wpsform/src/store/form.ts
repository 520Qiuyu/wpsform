import { IForm, IProblem } from "../types/types";
import problem from "./problem";
import { nanoid } from "nanoid";
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
      value.problem.id = nanoid();
      console.log(value);
      // 在最后插入
      if (value.index === -1) {
        state.questionList.push(value.problem);
      }
      // 在指定位置插入
      else if (value.index > -1) {
        state.questionList.splice(value.index, 0, value.problem);
      }
      console.log(state.questionList);
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
    },
    // 设置表单标题草稿
    setFormTitleDraft(state: any, value: string) {
      state.formTitleDraft = value;
    },
    // 设置表单描述草稿
    setFormSubTitleDraft(state: any, value: string) {
      state.formSubTitleDraft = value;
    },
    // 保存草稿
    saveDraft(state: any) {
      state.questionListDraft = state.questionList;
    },
    // 使用草稿
    useDraft(state: any) {
      state.questionList = state.questionListDraft;
    },
  },
  state: {
    // 中间的问题列表
    /* questionList: [
      {
        type: "input",
        title: "",
        required: true,
        isNew: true,
        id: "F0OjFh0XCIHffJUrUiJgd",
      },
      {
        type: "singleSelect",
        title: "",
        required: true,
        isNew: true,
        id: "uQ91z5yubMjIF_Nsh1gg6",
      },
      {
        type: "multiSelect",
        title: "",
        required: true,
        isNew: true,
        id: "JSzpVAucSArSsMlCrDE-x",
      },
      {
        type: "pullSelect",
        title: "",
        required: true,
        isNew: true,
        id: "FnNqd8Dqp8cM2Jm3IqK2c",
      },
      {
        type: "date",
        title: "",
        required: true,
        isNew: true,
        id: "cuV9IaRgJHCxixno9xkGY",
      },
      {
        type: "time",
        title: "",
        required: true,
        isNew: true,
        id: "0SApJc5csrQLikhe8PE6L",
      },
      {
        type: "score",
        title: "",
        required: true,
        isNew: true,
        id: "jPPf3sMyKi52mKMnODbPF",
      },
    ] as IProblem[], */
    questionList: [] as IProblem[],
    // 俩标题的草稿
    formTitleDraft: "",
    formSubTitleDraft: "",
    // 草稿
    questionListDraft: [] as IProblem[],
  },
  getters: {},
};
