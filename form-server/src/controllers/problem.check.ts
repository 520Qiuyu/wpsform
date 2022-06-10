import { check } from "../libs/check";
import { TProblemType, TSetting } from "../types/models";
import { ICancelStarReq, IStarProblemReq } from "../types/request";

export function checkCancelProblemBody({ id }: ICancelStarReq) {
  check(!!id, "ERR_PARAMS_LOST");
}

export function checkStarBody({ problem }: IStarProblemReq) {
  check(!!problem, "ERR_PARAMS_LOST");
  check(!!problem.title, "ERR_PROBLEM_DATA");
  checkProblem(problem);
}

export function checkProblem(problem: {
  type: TProblemType;
  setting: TSetting<TProblemType>;
}) {
  switch (problem.type) {
    case "singleSelect":
    case "multiSelect":
    case "pullSelect": {
      check(!!problem.setting, "ERR_PROBLEM_DATA");
      check(!!problem.setting.options, "ERR_PROBLEM_DATA");
      check(problem.setting.options.length > 0, "ERR_PROBLEM_DATA");
      problem.setting.options.map((op) => {
        // check(!!op.id, "ERR_PROBLEM_DATA");
        check(!!op.title, "ERR_PROBLEM_DATA");
        check(!!op.status, "ERR_PROBLEM_DATA");
      });
      break;
    }
    case "input":
    case "time":
    case "date":
    case "score": {
      break;
    }
    default: {
      check(false, "ERR_TYPE_NOT_FOUND");
    }
  }
}
