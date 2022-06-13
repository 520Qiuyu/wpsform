export interface IUser {
  [index: string]: string;
  account: string;
  pwd: string;
  nickname: string;
  avatar: string;
}

export interface IForm {
  formId: string;
  offset?: number;
  limit?: number;
  isStar?: boolean;
  title: string;
  subTitle: string;
  problems: {
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
    options: {
      title: string;
      status: 1 | 2;
    }[];
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
