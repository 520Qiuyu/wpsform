import * as path from "path";
import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

import {
  ESelectOptionStatus,
  IForm,
  IFormModule,
  IFormResult,
  IProblem,
  IProblemType,
  IStarProblem,
  IUser,
  TProblemType,
} from "./types/models";

interface IDb {
  forms: IForm[];
  users: IUser[];
  starProblems: IStarProblem<TProblemType>[];
  formModules: IFormModule[];
  formResults: IFormResult[];
}

const adapter = new FileSync<IDb>(path.join(__dirname, "../db.json"));
const db = low(adapter);
db.defaults({
  forms: [],
  users: [],
  starProblems: [],
  formModules: [],
  formResults: [],
}).write();

export const basicProblems: Omit<IProblem<TProblemType>, "result">[] = [
  {
    id: "basicInputName",
    type: "input",
    title: "姓名",
    required: true,
    setting: null,
  },
  {
    id: "basicSingSelectGender",
    type: "singleSelect",
    title: "性别",
    required: true,
    setting: {
      options: [
        {
          id: "",
          title: "男",
          status: ESelectOptionStatus.normal,
        },
        {
          id: "",
          title: "女",
          status: ESelectOptionStatus.normal,
        },
      ],
    },
  },
];

export const problemTypes: IProblemType[] = [
  {
    title: "填空题",
    type: "input",
  },
  {
    title: "单选题",
    type: "singleSelect",
  },
  {
    title: "多选题",
    type: "multiSelect",
  },
  {
    title: "下拉选择题",
    type: "pullSelect",
  },
  {
    title: "日期题",
    type: "date",
  },
  {
    title: "时间题",
    type: "time",
  },
  {
    title: "打分题",
    type: "score",
  },
];

export default db;
