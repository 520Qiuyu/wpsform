import * as request from "./request";
import { IUser, IForm, IProblem, IFormResult } from "../types/types";

interface BaseRes {
  stat: string;
  message?: string;
}

//获取用户信息返回接口
interface UserRes extends BaseRes {
  data: {
    user: IUser;
  };
}

//获取表单列表返回接口
interface FormListRes extends BaseRes {
  data: {
    items: IForm[];
    total: number;
  };
}

//获取表单信息返回接口
interface FormRes extends BaseRes {
  data: {
    item: IForm;
  };
}

//获取问题种类返回接口
interface ProblemTypeRes extends BaseRes {
  data: {
    problemTypes: {
      title: string;
      type: string;
    }[];
  };
}

//获取基础问题返回接口
interface BasicProblemRes extends BaseRes {
  data: {
    basicProblems: IProblem[];
  };
}

//获取收藏题目返回接口
interface StarProblemRes extends BaseRes {
  data: {
    items: IProblem[];
  };
}

//获取表单详情返回接口
interface FormResultRes extends BaseRes {
  data: {
    info: IForm;
    items: IFormResult[];
  };
}

//获取单个表单详情返回接口
interface FormDetailRes extends BaseRes {
  data: {
    item: IFormResult;
  };
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
  return request.get<UserRes>("/api/user/getInfo");
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
  return request.post<FormListRes>("/api/form/list", {
    offset,
    limit,
    isStar,
  });
}

//创建表单,返回表单id
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
  return request.post<FormRes>("/api/form/get", {
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
export function inputForm(formId: string, problems: IProblem[]) {
  return request.post<BaseRes>("/api/form/input", {
    formId,
    problems,
  });
}
//获取表单填写详情
export function getFormResult(formId: string) {
  return request.get<FormResultRes>("/api/form/formResult/" + formId);
}

//获取表单单个填写详情
export function getDetail(id: string) {
  return request.post<FormDetailRes>("/api/form/detail/" + id);
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
  return request.get<ProblemTypeRes>("/api/problem/listType");
}

// 获取基础题目
export function getBasicProblem() {
  return request.get<BasicProblemRes>("/api/problem/listBasic");
}

// 获取收藏的题目
export function getStarProblem() {
  return request.post<StarProblemRes>("/api/problem/listStar");
}

// 收藏题目
export function starProblem(problem: IProblem) {
  return request.post<BaseRes>("/api/problem/star");
}
// 取消收藏题目
export function cancelStarProblem(id: string) {
  return request.post<BaseRes>("/api/problem/cancelStar");
}
