export interface IUser {
  [index: string]: string;
  account: string;
  pwd: string;
  nickname: string;
  avatar: string;
}

export interface IForm {
  formId?: string; //表单ID
  offset?: number; //
  limit?: number; //
  isStar?: boolean; //表单是否标星
  title: string; //表单标题
  subTitle: string; //表单副标题
  ctime: number; //表单创建时间
  problems: {
    //表单问题
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
    setting?: {
      options: {
        title: string;
        status: 1 | 2;
      }[];
    };
  }[];
}

export interface IProblem {
  id?: string;
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
    options?: {
      title: string;
      status: 1 | 2; //1为非预选 2为预选
    }[];
    dateType?: "YM" | "YMD" | "YMDHM"; //年月|年月日|年月日时分
    timeType?: "HMS" | "HM"; //时分秒|时分
  };
  [propName: string]: any;
}

// export class Problem implements IProblem {
//   [props: string]: any;
//   id?: string | undefined;
//   title: string;
//   type:
//     | "input"
//     | "singleSelect"
//     | "multiSelect"
//     | "pullSelect"
//     | "date"
//     | "time"
//     | "score";
//   required: boolean;
//   isNew: boolean;
//   setting?: { options: { title: string; status: 1 | 2 }[] } | undefined;

//   constructor(id)
// }
