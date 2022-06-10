import { check } from "../libs/check";
import { IChangePwdReq, ISetUserInfoReq } from "../types/request";

export function checkSetInfoBody({ nickname, avatar }: ISetUserInfoReq) {
  check(!!nickname, "ERR_PARAMS_LOST");
  check(!!avatar, "ERR_PARAMS_LOST");
}

export function checkChangePwdBody({ pwd, oldPwd, confirmPwd }: IChangePwdReq) {
  check(!!pwd, "ERR_PARAMS_LOST");
  check(!!oldPwd, "ERR_PARAMS_LOST");
  check(!!confirmPwd, "ERR_PARAMS_LOST");
  check(pwd === confirmPwd, "ERR_TWO_PWD_NOT_CORRECT");
}
