import db from "../db";
import { EFormStatus, IForm, IProblem, TProblemType } from "../types/models";
import * as crypto from "crypto";
import { check } from "../libs/check";

export function listForm(
  token: string,
  isStar = undefined,
  offset = 0,
  limit = 10
) {
  let items =
    isStar === undefined
      ? db
          .get("forms")
          .filter(
            (form) =>
              form.author === token && form.status !== EFormStatus.delete
          )
          .value()
      : db
          .get("forms")
          .filter(
            (form) =>
              form.author === token &&
              form.status !== EFormStatus.delete &&
              form.isStar === !!isStar
          )
          .value();
  const total = items.length;
  items = items.filter(
    (_item, index) => index >= offset * limit && index < offset * limit + limit
  );
  return [items, total];
}

export async function createForm(
  token: string,
  title: string,
  subTitle: string,
  problems: IProblem<TProblemType>[]
) {
  const now = Date.now();
  const id = crypto.randomUUID();
  problems = problems.map((p) => {
    const id = crypto.randomUUID();
    p.id = id;
    if (
      p.type === "multiSelect" ||
      p.type === "pullSelect" ||
      p.type === "singleSelect"
    ) {
      p.setting.options.map((o) => {
        const id = crypto.randomUUID();
        o.id = id;
      });
    }
    return p;
  });
  await db
    .get("forms")
    .push({
      id,
      ctime: now,
      utime: now,
      status: EFormStatus.normal,
      author: token,
      isStar: false,
      title,
      subTitle,
      problems,
    })
    .write();
  return id;
}

export function getForm(id: string) {
  const form = db
    .get("forms")
    .find((form) => form.id === id && form.status !== EFormStatus.delete)
    .value();
  check(!!form, "ERR_FORM_NOT_FOUND");
  return form;
}

export function getIngForm(id: string) {
  const form = db
    .get("forms")
    .find((form) => form.id === id && form.status === EFormStatus.ing)
    .value();
  check(!!form, "ERR_FORM_NOT_FOUND");
  return form;
}

export async function delForm(token: string, id: string) {
  const form = await db
    .get("forms")
    .find(
      (form) =>
        form.author === token &&
        form.id === id &&
        form.status !== EFormStatus.delete
    )
    .assign({
      status: EFormStatus.delete,
    })
    .write();
  check(!!form, "ERR_FORM_NOT_FOUND");
  return form;
}

export async function setFormStatus(token: string, id: string, status: EFormStatus) {
  const form = await db
    .get("forms")
    .find(
      (form) =>
        form.author === token &&
        form.id === id &&
        form.status !== EFormStatus.delete
    )
    .assign({
      status: status
    })
    .write();
  check(!!form, "ERR_FORM_NOT_FOUND");
  return form;
}

export async function starForm(token: string, id: string, isStar: boolean) {
  const form = await db
    .get("forms")
    .find(
      (form) =>
        form.author === token &&
        form.id === id &&
        form.status !== EFormStatus.delete
    )
    .assign({
      isStar: isStar,
    })
    .write();
  check(!!form, "ERR_FORM_NOT_FOUND");
  return form;
}

export async function updateForm(token: string, form: IForm) {
  const item = await db
    .get("forms")
    .find((form) => form.author === token && form.status === EFormStatus.normal)
    .assign({ ...form })
    .write();
  check(!!form, "ERR_FORM_NOT_FOUND");
  return item;
}
