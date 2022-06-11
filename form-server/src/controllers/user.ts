import * as Router from "koa-router";
import { Context } from "koa";
import { checkBody, checkToken } from "../middlewares/dataCheck";
import { IChangePwdReq, ISetUserInfoReq } from "../types/request";
import { catchError, generateOk } from "../libs/check";
import { checkChangePwdBody, checkSetInfoBody } from "./user.check";
import * as userKit from "../kits/user";

const router = new Router({
  prefix: "/api/user",
});

router.get("/getInfo", checkToken(userKit.checkToken), async (ctx: Context) => {
  try {
    const token = ctx.cookies.get("token");
    const user = await userKit.getUserInfo(token);
    ctx.body = generateOk({ user });
  } catch (err) {
    catchError(err, ctx);
  }
});

router.post(
  "/setInfo",
  checkToken(userKit.checkToken),
  checkBody(checkSetInfoBody),
  async (ctx: Context) => {
    try {
      const { nickname, avatar } = ctx.request.body as ISetUserInfoReq;
      const token = ctx.cookies.get("token");
      await userKit.setUserInfo(token, nickname, avatar);
      ctx.body = generateOk();
    } catch (err) {
      catchError(err, ctx);
    }
  }
);

router.post(
  "/changePwd",
  checkToken(userKit.checkToken),
  checkBody(checkChangePwdBody),
  async (ctx: Context) => {
    try {
      const { pwd, oldPwd } = ctx.request.body as IChangePwdReq;
      const token = ctx.cookies.get("token");
      await userKit.changePwd(token, pwd, oldPwd);
      ctx.cookies.set("token", "");
      ctx.body = generateOk();
    } catch (err) {
      catchError(err, ctx);
    }
  }
);

router.get("/ping/:id", (ctx: Context) => {
  console.log(ctx.params, ctx.request)
  ctx.body = "pong"
})

export default router;
