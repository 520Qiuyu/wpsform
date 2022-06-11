import { IProblem, TProblemType } from "./models";

export interface IRegisterReq {
  account: string;
  pwd: string;
  confirmPwd: string;
}

export interface ISetUserInfoReq {
  nickname: string;
  avatar: string;
}

export interface IChangePwdReq {
  pwd: string;
  oldPwd: string;
  confirmPwd: string;
}

export interface ICancelStarReq {
  id: string;
}

export interface IStarProblemReq {
  problem: Omit<IProblem<TProblemType>, "result" | "id" | "status">;
}

export interface IListReq {
  isStar: boolean;
  offset: number;
  limit: number;
}

export interface ICreateFormReq {
  title: string;
  subTitle: string;
  problems: (IProblem<TProblemType> & { isNew: boolean })[];
}

export interface IInputReq {
  formId: string
  problems: Required<IProblem<TProblemType>>[]
}