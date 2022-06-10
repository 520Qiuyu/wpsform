import { Context } from "koa";
import { Exception } from "./exception";

export class Error {
  stat: string;
  msg: string;
  constructor(stat: string) {
    this.stat = stat || "Internel_Server_Error";
    this.msg = Exception.get(stat);
  }
}

export function check(bool: boolean, stat?: string) {
  if (!bool) {
    throw new Error(stat);
  }
}

export function catchError(err: typeof Error, ctx: Context) {
  console.log("error: ", err);
  ctx.status = 500;
  ctx.body = { ...err };
}

export function generateOk<T>(data?: T) {
  return data
    ? {
        stat: "ok",
        data,
      }
    : { stat: "ok" };
}
