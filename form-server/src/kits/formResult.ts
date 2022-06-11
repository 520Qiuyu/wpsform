import db from "../db";
import { IProblem, TProblemType } from "../types/models";
import * as crypto from "crypto";
import { check } from "../libs/check";
import { formKit } from ".";

export function getDetail(token: string, id: string) {
  const item = db
    .get("formResults")
    .find(
      (formResult) => formResult.id === id && formResult.formAuthor === token
    )
    .value();
  check(!!item, "ERR_FORM_RESULT_NOT_FOUND");
  return item;
}

export async function create(
  formId: string,
  problems: IProblem<TProblemType>[]
) {
  const id = crypto.randomUUID();
  const form = await formKit.getIngForm(formId);
  await db
    .get("formResults")
    .push({ id, formAuthor: form.author, formId, result: problems })
    .write();
}

export function getFormResult(token: string, formId: string) {
  const items = db
    .get("formResults")
    .filter((f) => f.formId === formId && f.formAuthor === token)
    .value();
  return items;
}
