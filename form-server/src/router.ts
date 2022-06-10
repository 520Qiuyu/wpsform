import * as Router from "koa-router";
import authRoute from "./controllers/auth";
import userRoute from "./controllers/user";
import formRoute from "./controllers/form";
import problemRoute from "./controllers/problem";

const router = new Router();
router.use(authRoute.routes());
router.use(userRoute.routes());
router.use(formRoute.routes());
router.use(problemRoute.routes());

export default router;
