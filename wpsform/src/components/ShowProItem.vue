<template>
  <div class="problem-item">
    <div class="problem-title">
      <span class="problem-title-index">{{ index + 1 }}.</span>
      <span>{{ problem.title }}</span>
    </div>
    <div class="problem-input-area">
      <!-- 填空题 -->
      <input
        v-model="inputValue"
        class="problem-input"
        placeholder="请输入"
        v-if="problem.type == 'input'"
      />
      <!-- 单选题 -->
      <el-radio-group
        v-model="singleSelectValue.value.id"
        class="singleSelectProblem"
        v-if="problem.type == 'singleSelect'"
      >
        <el-radio
          :label="option.id"
          size="large"
          v-for="option in problem.setting.options"
          :key="option.id"
        >
          {{ option.title }}
        </el-radio>
      </el-radio-group>
      <!-- 多选题 -->
      <el-checkbox-group
        v-model="multiSelectArr"
        class="multiSelectProblem"
        v-if="problem.type == 'multiSelect'"
      >
        <el-checkbox
          :label="option.title"
          v-for="option in problem.setting.options"
          :key="option"
        />
      </el-checkbox-group>
      <!-- 下拉选择 -->
      <el-select
        v-model="pullSelectValue.value.title"
        filterable
        placeholder="请输入"
        v-if="problem.type == 'pullSelect'"
      >
        <el-option
          v-for="option in problem.setting.options"
          :key="option.id"
          :label="option.title"
          :value="option.title"
        />
      </el-select>
      <!-- 分数题 -->
      <el-rate v-model="score" v-if="problem.type == 'score'" />
      <!-- 日期题 -->
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="请输入"
        v-if="problem.type == 'date'"
        style="width: 100%"
      />
      <!-- 时间题 -->
      <el-time-picker
        v-model="time"
        arrow-control
        placeholder="请输入"
        v-if="problem.type == 'time'"
        style="width: 100%"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, PropType } from "vue";
import * as api from "@/services/api";
import { IProblem } from "../types/types";

export default defineComponent({
  name: "ProblemItem",
  props: {
    index: {
      type: Number,
      required: true,
    },
    problem: {
      type: Object as PropType<IProblem>,
      required: true,
    },
    resultid: {
      type: String,
      required: true,
    },
  },
  emits: ["setProblemResult"],
  setup(props, ctx) {
    const inputValue = ref("");
    const date = ref("");
    const time = ref("");
    const score = ref(null);
    const pullSelectValue = reactive({
      value: {
        id: "",
        title: "",
      },
    });
    const singleSelectValue = reactive({
      value: {
        id: "",
        title: "",
      },
    });
    const multiSelectArr = ref([] as string[]);
    const multiSelectValue = reactive({
      value: [{}],
    });
    const options = reactive([
      {
        value: "Option1",
        label: "Option1",
      },
      {
        value: "Option2",
        label: "Option2",
      },
    ]);

    const singleOptions = props.problem ? ref(props.problem.setting) : [];

    const value: any = ref();
    const resultList = ref([] as IProblem[]);
    const getDetail = async (id: string) => {
      resultList.value = [];
      const res = await api.getDetail(id);
      if (res.stat == "ok") {
        console.log("@@##", res.data.item.result[props.index]);
        resultList.value.push(res.data.item.result[props.index]);
        value.value = resultList.value[0].result?.value;
        // 填空题
        if (resultList.value[0].type == "input") {
          inputValue.value = value.value;
        }
        // 日期题
        if (resultList.value[0].type == "date") {
          date.value = value.value;
        }
        // 时间题
        if (resultList.value[0].type == "time") {
          time.value = value.value;
        }
        // 分数题
        if (resultList.value[0].type == "score") {
          score.value = value.value;
        }
        // 单选题
        if (resultList.value[0].type == "singleSelect") {
          (
            props.problem.setting as {
              options: { title: string; status: 1 | 2; id: string }[];
            }
          ).options.forEach((option) => {
            if (
              option.id ==
              (
                resultList.value[0].result as {
                  value: {
                    id: string;
                    title: string;
                  };
                }
              ).value.id
            ) {
              singleSelectValue.value.title = option.title;
              singleSelectValue.value.id = option.id;
            }
          });
        }
        // 多选题
        if (resultList.value[0].type == "multiSelect") {
          for (
            let i = 0;
            i <
            (
              resultList.value[0].result?.value as {
                id: string;
                title: string;
              }[]
            ).length;
            i++
          ) {
            (
              props.problem.setting as {
                options: { title: string; status: 1 | 2; id: string }[];
              }
            ).options.forEach((option) => {
              if (
                option.title ==
                (
                  resultList.value[0].result?.value as {
                    id: string;
                    title: string;
                  }[]
                )[i].title
              ) {
                multiSelectArr.value.push(option.title);
                multiSelectValue.value[i] = {
                  title: option.title,
                  id: option.id,
                };
              }
            });
          }
        }
        // 下拉选择题
        if (resultList.value[0].type == "pullSelect") {
          (
            props.problem.setting as {
              options: { title: string; status: 1 | 2; id: string }[];
            }
          ).options.forEach((option) => {
            if (
              option.title ==
              (
                resultList.value[0].result as {
                  value: {
                    id: string;
                    title: string;
                  };
                }
              ).value.title
            ) {
              pullSelectValue.value.title = option.title;
              pullSelectValue.value.id = String(option.id);
            }
          });
        }
      }
    };

    return {
      inputValue,
      date,
      time,
      score,
      options,
      pullSelectValue,
      singleSelectValue,
      multiSelectArr,
      singleOptions,
      resultList,
      getDetail,
    };
  },
  created() {
    this.getDetail(this.resultid);
    console.log("#@!", this.index, this.resultid);
  },
});
</script>

<style>
.problem-item {
  margin-bottom: 30px;
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
