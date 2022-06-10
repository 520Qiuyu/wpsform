import { Context, Next } from "koa";
import { catchError } from "../libs/check";

export function checkBody<T>(check: (body: T) => void) {
  return async function (ctx: Context, next: Next) {
    try {
      console.log(`path: ${ctx.path}`);
      check(ctx.request.body as T);
      await next();
    } catch (err) {
      catchError(err, ctx);
    }
  };
}

export function checkToken(check: (token: string) => void) {
  return async function (ctx: Context, next: Next) {
    try {
      console.log(`path: ${ctx.path}`);
      const token = ctx.cookies.get("token");
      check(token);
      await next();
    } catch (err) {
      catchError(err, ctx);
    }
  };
}
