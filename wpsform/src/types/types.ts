export interface IUser {
  [index: string]:string | number,
  account: string;      //账号
  pwd: string;          //密码
  nickname: string;     //用户名，初始值为账号
  avatar: string;       //用户头像，初始值为空
  ctime: number;        //用户注册时间
}

export interface IForm {
  formId: string;       //表单ID
  offset?: number;      //
  limit?: number;       //
  isStar?: boolean;     //表单是否标星
  title: string;        //表单标题
  subTitle: string;     //表单副标题
  ctime: number;        //表单创建时间
  problems: {           //表单问题
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
