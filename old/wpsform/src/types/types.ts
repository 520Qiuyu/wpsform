export interface User {
  account: string;
  pwd: string;
  nickname: string;
  avatar: string;
}

export interface Form {
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

export interface Problem {
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
}
