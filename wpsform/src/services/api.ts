import * as request from "./request";
import { IUser, IForm, IProblem } from "../types/types";

interface BaseRes {
  stat: string;
  message?: string;
}

interface UserRes extends BaseRes {
  user: IUser;
}

interface FormRes extends BaseRes {
  rows: IForm[];
}

interface GetForm extends BaseRes {
  rows: IForm;
}

interface ProblemRes extends BaseRes {
  rows: IProblem[];
}

// 登录
export function login(account: string, pwd: string) {
  return request.post<BaseRes>("/api/auth/login", {
    account,
    pwd,
  });
}

//注册
export function register(account: string, pwd: string, confirmPwd: string) {
  return request.post<BaseRes>("/api/auth/register", {
    account,
    pwd,
    confirmPwd,
  });
}

// 注销
export function logout() {
  return request.post<BaseRes>("/api/auth/logout");
}

// 获取用户信息
export function getUserInfo() {
  return request.get<BaseRes>("/api/user/getInfo");
}

//设置用户信息
export function setUserInfo(nickname: string, avatar: string) {
  return request.post<BaseRes>("/api/user/setInfo", {
    nickname,
    avatar,
  });
}

//修改密码
export function changePwd(oldPwd: string, pwd: string, confirmPwd: string) {
  return request.post<BaseRes>("/api/user/changePwd", {
    oldPwd,
    pwd,
    confirmPwd,
  });
}

//获取列表
export function getFormList(offset?: number, limit?: number, isStar?: boolean) {
  return request.post<FormRes>("/api/form/list", {
    offset,
    limit,
    isStar,
  });
}

//创建表单
export function createForm(
  title: string,
  subTitle: string,
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
    isNew: boolean;
    setting?: {
      options: {
        title: string;
        status: 1 | 2;
      }[];
    };
  }[]
) {
  return request.post<BaseRes>("/api/form/create", {
    title,
    subTitle,
    problems,
  });
}

//获取表单
export function getForm(id: string) {
  return request.post<GetForm>("/api/form/get", {
    id,
  });
}

//删除表单
export function deleteForm(id: string) {
  return request.post<BaseRes>("/api/form/delete", {
    id,
  });
}

//表单标星
export function starForm(id: string) {
  return request.post<BaseRes>("/api/form/star", {
    id,
  });
}

//表单取消标星
export function cancelStarForm(id: string) {
  return request.post<BaseRes>("/api/form/cancelStar", {
    id,
  });
}

//填写表单
export function inputForm(
  formId: string,
  problems: {
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
    setting?: {
      options: {
        title: string;
        status: 1 | 2;
      }[];
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
  }[]
) {
  return request.post<BaseRes>("/api/form/input", {
    formId,
    problems,
  });
}

// 开始收集表单
export function startCollect(id: string) {
  return request.post<BaseRes>("/api/form/start", {
    id,
  });
}

// 结束收集表单
export function endCollect(id: string) {
  return request.post<BaseRes>("/api/form/end", {
    id,
  });
}

// 获取基础题目类型
export function getProblemType() {
  return request.get<BaseRes>("/api/problem/listType");
}

// 获取基础题目
export function getBasicProblem() {
  return request.get<ProblemRes>("/api/problem/listBasic");
}

// 获取收藏的题目
export function getStarProblem() {
  return request.post<ProblemRes>("/api/problem/listStar");
}

// 收藏题目
export function starProblem(problem: IProblem) {
  return request.post<BaseRes>("/api/problem/star");
}
// 取消收藏题目
export function cancelStarProblem(id: string) {
  return request.post<BaseRes>("/api/problem/cancelStar");
}
