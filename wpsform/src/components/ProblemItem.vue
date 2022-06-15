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
import {
  defineComponent,
  ref,
  reactive,
  onBeforeMount,
  PropType,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import * as api from "@/services/api";
import { IUser, IForm, IProblem } from "../types/types";
import { useStore } from "vuex";

export default defineComponent({
  name: "ProblemItem",
  props: {
    index: Number,
    problem: {
      type: Object as PropType<IProblem>,
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
    const multiSelectArr = ref([]);
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

    watch(inputValue, (newVal) => {
      ctx.emit("setProblemResult", newVal, props.problem!.id);
      // console.log(newVal);
    });

    watch(score, (newVal) => {
      ctx.emit("setProblemResult", newVal, props.problem!.id);
      // console.log(newVal);
    });

    watch(date, (newVal) => {
      ctx.emit("setProblemResult", newVal, props.problem!.id);
      console.log(newVal);
    });

    watch(time, (newVal) => {
      ctx.emit("setProblemResult", newVal, props.problem!.id);
      console.log(newVal);
    });

    // 单选题处理
    watch(singleSelectValue, (newVal) => {
      //根据id修改结果的title
      (
        props.problem.setting as {
          options: { title: string; status: 1 | 2; id: string }[];
        }
      ).options.forEach((option) => {
        if (option.id == newVal.value.id) {
          newVal.value.title = option.title;
        }
      });
      ctx.emit("setProblemResult", newVal, props.problem!.id);
      // console.log(newVal);
    });
    // 下拉选择题处理
    watch(pullSelectValue, (newVal) => {
      //根据title修改结果的id
      (
        props.problem.setting as {
          options: { title: string; status: 1 | 2; id: string }[];
        }
      ).options.forEach((option) => {
        if (option.title == newVal.value.title) {
          newVal.value.id = String(option.id);
        }
      });
      ctx.emit("setProblemResult", newVal, props.problem!.id);
      // console.log(newVal);
    });
    //多选题处理
    watch(multiSelectArr, (newVal) => {
      for (let i = 0; i < newVal.length; i++) {
        (
          props.problem.setting as {
            options: { title: string; status: 1 | 2; id: string }[];
          }
        ).options.forEach((option) => {
          if (option.title == newVal[i]) {
            multiSelectValue.value[i] = {
              title: newVal[i],
              id: option.id,
            };
          }
        });
      }
      ctx.emit("setProblemResult", multiSelectValue, props.problem!.id);
      // console.log(multiSelectValue)
    });

    onBeforeMount(() => {
      // console.log(props.problem);
      // console.log(singleOptions);
    });

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
    };
  },
  // created() {},
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
