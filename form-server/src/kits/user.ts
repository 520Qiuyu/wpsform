import db from "../db";
import * as crypto from "crypto";
import config from "../config";
import { EStatus } from "../types/models";
import { check } from "../libs/check";

const session = [];

export async function createUser(account: string, pwd: string) {
  const user = db
    .get("users")
    .find((x) => x.account === account)
    .value();
  check(!user, "ERR_ACCOUNT_EXIST");
  const id = crypto.randomUUID();
  const hashPwd = crypto
    .createHmac("sha256", config.secret)
    .update(pwd)
    .digest("hex");
  const now = Date.now();
  await db
    .get("users")
    .push({
      id,
      account,
      pwd: hashPwd,
      status: EStatus.normal,
      ctime: now,
      utime: now,
      nickname: account,
      avatar: "",
    })
    .write();
  return id;
}

export async function setUserInfo(
  id: string,
  nickname: string,
  avatar: string
) {
  const user = await db
    .get("users")
    .filter((x) => x.status === EStatus.normal)
    .find((x) => x.id === id)
    .value();
  check(!!user, "ERR_USER_NOT_FOUND");
  await db
    .get("users")
    .find((x) => x.id === id)
    .assign({ nickname, avatar })
    .write();
}

export async function login(account: string, pwd: string) {
  const user = db
    .get("users")
    .find((x) => x.account === account)
    .value();
  check(!!user, "ERR_ACCOUNT_NOT_FOUND");
  const hashPwd = crypto
    .createHmac("sha256", config.secret)
    .update(pwd)
    .digest("hex");
  check(hashPwd === user.pwd, "ERR_PWD_NOT_CORRECT");
  if (!session.includes(user.id)) {
    session.push(user.id);
  }
  return user.id;
}

export function logout(token: string) {
  const index = session.indexOf(token);
  session.splice(index, 1);
}

export function checkToken(token: string) {
  const isLogin = session.includes(token);
  check(isLogin, "ERR_USER_NOT_LOGIN");
}

export async function getUserInfo(token: string) {
  const user = await db
    .get("users")
    .filter((x) => x.status === EStatus.normal)
    .find((x) => x.id === token)
    .value();
  check(!!user, "ERR_USER_NOT_FOUND");
  return user;
}

export async function changePwd(token: string, pwd: string, oldPwd: string) {
  const user = await db
    .get("users")
    .filter((x) => x.status === EStatus.normal)
    .find((x) => x.id === token)
    .value();
  check(!!user, "ERR_USER_NOT_FOUND");
  const hashOldPwd = crypto
    .createHmac("sha256", config.secret)
    .update(oldPwd)
    .digest("hex");
  check(hashOldPwd === user.pwd, "ERR_OLD_PWD_NOT_CORRECT");
  const hashPwd = crypto
    .createHmac("sha256", config.secret)
    .update(pwd)
    .digest("hex");
  await db
    .get("users")
    .find((x) => x.id === token)
    .assign({ pwd: hashPwd })
    .write();
  logout(token);
}
