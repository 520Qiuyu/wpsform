export interface IUser {
  [index: string]: string;
  account: string;
  pwd: string;
  nickname: string;
  avatar: string;
}

export interface IForm {
  id: string; //表单ID
  offset?: number; //获取表单列表时的起始索引，默认为0
  limit?: number; //获取表单列表时的表单数量
  isStar?: boolean; //表单是否标星
  title: string; //表单标题
  subTitle: string; //表单副标题
  ctime: number; //表单创建时间
  status: number; //表单状态，2为草稿，3为收集中，4为已结束
  problems: IProblem[];
}

export interface IFormResult {
  id: string; //表单详情id
  formAuthor: string; //填写人
  formId: string; //表单id
  result: IProblem[]; //填写结果
}

export interface IProblem {
  id: string;
  title: string;
  type:
    | "input"
    | "singleSelect"
    | "multiSelect"
    | "pullSelect"
    | "date"
    | "time"
    | "score";
  required: boolean;
  isNew: boolean;
  setting?: {
    options?: option[];
  };
  result?: {
    value:
      | string
      | number
      | {
          id: string;
          title: string;
        }
      | {
          id: string;
          title: string;
        }[];
  };
  [propName: string]: any;
}

export interface option {
  title: string;
  status: 1 | 2;
  id?: string;
}

export interface formDraft {
  formTitle: string;
  formSubTitle: string;
  questions: IProblem[];
}
