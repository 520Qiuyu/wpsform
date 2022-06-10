import { check } from "../libs/check";
import { ISelectOption, TProblemType, TResult } from "../types/models";
import { ICreateFormReq, IInputReq, IListReq } from "../types/request";
import { checkProblem } from "./problem.check";

export function checkListFormBody({ offset, limit }: IListReq) {
  check(
    typeof offset === "number" || typeof offset === "undefined",
    "ERR_PARAMS_TYPE_NOT_CORRECT"
  );
  check(
    typeof limit === "number" || typeof offset === "undefined",
    "ERR_PARAMS_TYPE_NOT_CORRECT"
  );
}

export function checkCreateFormBody({
  title,
  subTitle,
  problems,
}: ICreateFormReq) {
  check(!!title, "ERR_PARAMS_LOST");
  check(!!subTitle, "ERR_PARAMS_LOST");
  check(!!problems, "ERR_PARAMS_LOST");
  check(problems.length > 0, "ERR_FORM_DATA");
  problems.map((p) => {
    check(!!p.title, "ERR_PROBLEM_DATA");
    checkProblem(p);
  });
}

export function checkDelReq({ id }: { id: string }) {
  check(!!id, "ERR_PARAMS_LOST");
}

export function checkStartBody({ id }: { id: string }) {
  check(!!id, "ERR_PARAMS_LOST");
}

export function checkStarBody({ id }: { id: string }) {
  check(!!id, "ERR_PARAMS_LOST");
}

export function checkFormInputReq({ formId, problems }: IInputReq) {
  check(!!formId, "ERR_PARAMS_LOST");
  problems.map((p) => {
    check(!!p.title, "ERR_PROBLEM_DATA");
    check(!!p.id, "ERR_PROBLEM_DATA");
    checkProblem(p);
    if (p.required) checkProblemResult(p);
  });
}

export function checkProblemResult(problem: {
  type: TProblemType;
  result: TResult<TProblemType>;
}) {
  switch (problem.type) {
    case "multiSelect": {
      (problem.result.value as Omit<ISelectOption, "status">[]).map((v) =>
        checkOption(v)
      );
      break;
    }
    case "pullSelect":
    case "singleSelect": {
      checkOption(problem.result.value as Omit<ISelectOption, "status">);
      break;
    }
    case "date":
    case "input":
    case "time": {
      check(!!problem.result.value, "ERR_FORM_RESULT");
      break;
    }
    case "score": {
      check(!!problem.result.value, "ERR_FORM_RESULT");
      check(typeof problem.result.value === "number", "ERR_FORM_RESULT");
      break;
    }
    default:
      check(false, "ERR_TYPE_NOT_FOUND");
  }
}

function checkOption({ id, title }: Omit<ISelectOption, "status">) {
  check(!!id, "ERR_FORM_RESULT");
  check(!!title, "ERR_FORM_RESULT");
}
