<template>
  <div class="question">
    <MultiSelect
      v-if="type === 'multiSelect'"
      :problem="problem"
      @setProblem="setProblem"
    ></MultiSelect>
    <DateQuestion
      v-else-if="type == 'date'"
      :problem="problem"
      @setProblem="setProblem"
    ></DateQuestion>
    <InputQuestion
      v-else-if="type == 'input'"
      :problem="problem"
      @setProblem="setProblem"
    ></InputQuestion>
    <SingleSelect
      v-else-if="type == 'singleSelect'"
      :problem="problem"
      @setProblem="setProblem"
    ></SingleSelect>
    <ScoreQuestion
      v-else-if="type == 'score'"
      :problem="problem"
      @setProblem="setProblem"
    ></ScoreQuestion>
    <PullSelect
      v-else-if="type == 'pullSelect'"
      :problem="problem"
      @setProblem="setProblem"
    ></PullSelect>
    <TimeQuestion
      v-else-if="type == 'time'"
      :problem="problem"
      @setProblem="setProblem"
    ></TimeQuestion>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
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
    type: {
      type: String,
      default: "input",
      validator(value: string) {
        // 这个值必须与下列字符串中的其中一个相匹配
        return [
          "input",
          "singleSelect",
          "multiSelect",
          "pullSelect",
          "date",
          "time",
          "score",
        ].includes(value);
      },
    },
  },
  setup(props, ctx) {
    // 问题
    const problem = reactive({
      title: "",
      type: props.type,
      required: false,
    } as IProblem);
    // 设置问题
    const setProblem = (problem) => {
      
    };
    return {
      problem,
      setProblem,
    };
  },
  created(){
    console.log(this.problem)
  }
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