import { check } from "../libs/check";
import { IRegisterReq } from "../types/request";

export function checkRegisterBody({ account, pwd, confirmPwd }: IRegisterReq) {
  check(!!account, "ERR_PARAMS_LOST");
  check(!!pwd, "ERR_PARAMS_LOST");
  check(!!confirmPwd, "ERR_PARAMS_LOST");
  check(pwd === confirmPwd, "ERR_TWO_PWD_NOT_CORRECT");
}

export function checkLoginBody({ account, pwd }: IRegisterReq) {
  check(!!account, "ERR_PARAMS_LOST");
  check(!!pwd, "ERR_PARAMS_LOST");
}
