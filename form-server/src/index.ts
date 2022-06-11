import * as Koa from "koa";
import * as koaBody from "koa-body";
import config from "./config";
import router from "./router";
const app = new Koa();

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const time = Date.now() - start;
  ctx.set("X-Response-Time", time + "ms");
});

app.use(koaBody());
app.use(router.routes());

app.listen(config.port, () => {
  console.log(`正在监听${config.port}端口...`);
});
