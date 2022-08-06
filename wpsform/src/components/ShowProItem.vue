<template>
  <div class="problem-item">
    <div class="problem-title">
      <span class="problem-title-index">{{ index + 1 }}</span>
      <span>{{ problem.title }}</span>
    </div>
    <div class="problem-input-area">
      <!-- 填空题 -->
      <input
        v-model.lazy="input"
        class="problem-input"
        placeholder="请输入"
        v-if="problem.type == 'input'"
        :disabled="disableWrite"
      />
      <!-- 单选题 -->
      <el-radio-group
        v-model.lazy="singleSelect"
        class="singleSelectProblem"
        v-else-if="problem.type == 'singleSelect'"
      >
        <el-radio
          :label="option.id"
          size="large"
          v-for="option in problem.setting!.options"
          :key="option.id"
          :disabled="disableWrite"
        >
          {{ option.title }}
        </el-radio>
      </el-radio-group>
      <!-- 多选题 -->
      <el-checkbox-group
        v-model.lazy="multiSelect"
        class="multiSelectProblem"
        v-else-if="problem.type == 'multiSelect'"
      >
        <el-checkbox
          :label="option.id"
          v-for="option in problem.setting!.options"
          :key="option.id"
          :disabled="disableWrite"
        >
          {{ option.title }}
        </el-checkbox>
      </el-checkbox-group>
      <!-- 下拉选择 -->
      <el-select
        v-model.lazy="pullSelect"
        filterable
        placeholder="请输入"
        v-else-if="problem.type == 'pullSelect'"
        :disabled="disableWrite"
      >
        <el-option
          v-for="option in problem.setting!.options"
          :key="option.id"
          :value="option.id"
          :label="option.title"
        >
        </el-option>
      </el-select>
      <!-- 分数题 -->
      <el-rate
        v-model.lazy="score"
        v-else-if="problem.type == 'score'"
        :disabled="disableWrite"
      />
      <!-- 日期题 -->
      <el-date-picker
        v-model.lazy="date"
        type="date"
        placeholder="请输入"
        v-else-if="problem.type == 'date'"
        style="width: 100%"
        :disabled="disableWrite"
      />
      <!-- 时间题 -->
      <el-time-picker
        v-model.lazy="time"
        arrow-control
        placeholder="请输入"
        v-else-if="problem.type == 'time'"
        style="width: 100%"
        :disabled="disableWrite"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  PropType,
  watch,
  toRef,
  computed,
} from "vue";
import * as api from "@/services/api";
import { IProblem, option, problemResult } from "../types/types";

export default defineComponent({
  name: "ShowProItem",
  props: {
    problem: {
      type: Object as PropType<IProblem>,
      required: true,
    },
    disableWrite: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      required: true,
    },
    type: {
      type: String as PropType<"show" | "showFillDetails">,
      default: "show",
    },
  },
  emits: ["setProblemResult"],
  setup(props, ctx) {
    // 绑定填空题
    const input_ = ref<string>("");
    const input = computed({
      get() {
        if (props.type == "showFillDetails" && props.problem.type === "input")
          return props.problem.result?.value;
        return input_.value;
      },
      set(newVal) {
        input_.value = newVal as string;
        // 触发父组件填写结果的更新
        ctx.emit(
          "setProblemResult",
          { result: { value: newVal } },
          props.problem.id
        );
      },
    });

    // 绑定单项选择题
    const singleSelect_ = ref<string>("");
    const singleSelect = computed({
      get() {
        if (
          props.type == "showFillDetails" &&
          props.problem.type === "singleSelect"
        )
          return (props.problem.result?.value as problemResult).id;
        return singleSelect_.value;
      },
      set(newVal) {
        singleSelect_.value = newVal as string;
        // 触发父组件填写结果的更新
        ctx.emit(
          "setProblemResult",
          {
            // 过滤出相等于选中项的id的{id:"",title:""}
            result: {
              value: props.problem.setting?.options
                ?.filter((item) => item.id === newVal)
                .map((item) => ({ id: item.id, title: item.title }))[0],
            },
          },
          props.problem.id
        );
      },
    });

    // 绑定多项选择题
    const multiSelect_ = ref<string[]>([]);
    const multiSelect = computed({
      get() {
        if (
          props.type == "showFillDetails" &&
          props.problem.type === "multiSelect"
        )
          return (props.problem.result?.value as problemResult[]).map(
            (item) => item.id
          );
        return multiSelect_.value;
      },
      set(newVal: string[]) {
        multiSelect_.value = newVal as string[];
        // 触发父组件填写结果的更新
        ctx.emit(
          "setProblemResult",
          {
            // 过滤出相等于选中项的id的{id:"",title:""}[]
            result: {
              value: props.problem.setting?.options
                ?.filter((item: option) => newVal.includes(item.id as string))
                .map((item) => ({ id: item.id, title: item.title })),
            },
          },
          props.problem.id
        );
      },
    });

    // 绑定下拉选择题
    const pullSelect_ = ref<string>("");
    const pullSelect = computed({
      get() {
        if (
          props.type == "showFillDetails" &&
          props.problem.type === "pullSelect"
        )
          return (props.problem.result?.value as problemResult).id;
        return pullSelect_.value;
      },
      set(newVal) {
        pullSelect_.value = newVal as string;
        // 触发父组件填写结果的更新
        ctx.emit(
          "setProblemResult",
          {
            // 过滤出相等于选中项的id的{id:"",title:""}
            result: {
              value: props.problem.setting?.options
                ?.filter((item) => item.id === newVal)
                .map((item) => ({ id: item.id, title: item.title }))[0],
            },
          },
          props.problem.id
        );
      },
    });

    // 绑定日期
    const date_ = ref<string>("");
    const date = computed({
      get() {
        if (props.type == "showFillDetails" && props.problem.type === "date")
          return props.problem.result?.value;
        return date_.value;
      },
      set(newVal) {
        date_.value = newVal as string;
        // 触发父组件填写结果的更新
        ctx.emit(
          "setProblemResult",
          { result: { value: newVal } },
          props.problem.id
        );
      },
    });

    // 绑定时间
    const time_ = ref<string>("");
    const time = computed({
      get() {
        if (props.type == "showFillDetails" && props.problem.type === "time")
          return props.problem.result?.value;
        return time_.value;
      },
      set(newVal) {
        time_.value = newVal as string;
        // 触发父组件填写结果的更新
        ctx.emit(
          "setProblemResult",
          { result: { value: newVal } },
          props.problem.id
        );
      },
    });

    // 绑定分数题
    const score_ = ref<number>(0);
    const score = computed({
      get() {
        if (props.type == "showFillDetails" && props.problem.type === "score")
          return props.problem.result?.value;
        return score_.value;
      },
      set(newVal) {
        score_.value = newVal as number;
        // 触发父组件填写结果的更新
        ctx.emit(
          "setProblemResult",
          { result: { value: newVal } },
          props.problem.id
        );
      },
    });

    return {
      input,
      singleSelect,
      multiSelect,
      pullSelect,
      date,
      time,
      score,
    };
  },
});
</script>

<style>
.problem-item {
  margin-bottom: 30px;
  width: 100%;
}
.problem-title {
  margin-bottom: 10px;
}
.problem-title span {
  font-weight: 600;
  font-size: 14px;
}
.problem-title-index {
  margin-right: 10px;
}
.problem-input {
  border: none;
  outline: none;
  border-bottom: 1px solid rgba(25, 55, 88, 0.1);
  width: 100%;
  /* margin-bottom: 40px; */
  font-size: 14px;
}
.problem-input:hover {
  border-bottom: 1px solid #1488ed;
}
.singleSelectProblem,
.multiSelectProblem {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.date-problem {
  width: 100%;
  border: none;
  /* color: #1488ed; */
}
</style>
