import db from "../db";
import { EStatus, IProblem, TProblemType } from "../types/models";
import * as crypto from "crypto";

export async function listStar(token: string) {
  const items = await db
    .get("starProblems")
    .filter((p) => p.uId === token && p.status === EStatus.normal)
    .value();
  return items;
}

export async function cancelStar(token: string, id: string) {
  const item = await db
    .get("starProblems")
    .find((p) => p.id === id && p.uId === token && p.status === EStatus.normal)
    .assign({ status: EStatus.delete })
    .write();
  return item;
}

export async function star(
  token: string,
  problem: Omit<IProblem<TProblemType>, "result" | "id" | "status">
) {
  const id = crypto.randomUUID();
  await db
    .get("starProblems")
    .push({ id, uId: token, status: EStatus.normal, problem })
    .write();
  return id;
}
