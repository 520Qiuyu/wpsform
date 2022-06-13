<template>
  <div class="question">
    <MultiSelect
      v-if="problem.type === 'multiSelect'"
      :problem="problem"
      :disableAnswer="true"
      :index="index"
      @setProblem="setProblem"
    ></MultiSelect>
    <DateQuestion
      v-else-if="problem.type == 'date'"
      :problem="problem"
      :disableAnswer="true"
      :index="index"
      @setProblem="setProblem"
    ></DateQuestion>
    <InputQuestion
      v-else-if="problem.type == 'input'"
      :problem="problem"
      :disableAnswer="true"
      :index="index"
      @setProblem="setProblem"
    ></InputQuestion>
    <SingleSelect
      v-else-if="problem.type == 'singleSelect'"
      :problem="problem"
      :disableAnswer="true"
      :index="index"
      @setProblem="setProblem"
    ></SingleSelect>
    <ScoreQuestion
      v-else-if="problem.type == 'score'"
      :problem="problem"
      :disableAnswer="true"
      :index="index"
      @setProblem="setProblem"
    ></ScoreQuestion>
    <PullSelect
      v-else-if="problem.type == 'pullSelect'"
      :problem="problem"
      :disableAnswer="true"
      :index="index"
      @setProblem="setProblem"
    ></PullSelect>
    <TimeQuestion
      v-else-if="problem.type == 'time'"
      :problem="problem"
      :disableAnswer="true"
      :index="index"
      @setProblem="setProblem"
    ></TimeQuestion>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, PropType, computed } from "vue";
import { IProblem } from "../types/types";
import MultiSelect from "./MultiSelect.vue";
import DateQuestion from "./DateQuestion.vue";
import InputQuestion from "./InputQuestion.vue";
import SingleSelect from "./SingleSelect.vue";
import ScoreQuestion from "./ScoreQuestion.vue";
import PullSelect from "./PullSelect.vue";
import TimeQuestion from "./TimeQuestion.vue";
export default defineComponent({
  name: "MyQuestion",
  components: {
    MultiSelect,
    DateQuestion,
    InputQuestion,
    SingleSelect,
    ScoreQuestion,
    PullSelect,
    TimeQuestion,
  },
  props: {
    ques: {
      type: Object as PropType<IProblem>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, ctx) {
    // 问题
    // const problem = computed(() => props.ques);
    const problem = ref<IProblem>(props.ques);
    // 设置问题
    const setProblem = (problem_: IProblem) => {
      /* for (const key in problem) {
        problem[key] = problem_[key];
      } */
      problem.value = problem_;
    };
    return {
      problem,
      setProblem,
    };
  },
  created() {
  },
});
</script>

<style scoped>
.question {
  width: 550px;
  box-shadow: 0 4px 16px 0 rgb(192 198 207 / 50%);
  margin: 20px 0;
  background-color: #fff;
  padding: 20px 24px 40px;
}
</style>