<template>
  <div class="problemwriteitem">
    <div>这是一个ProblemItem</div>
    <div>{{ index + 1 }}.{{ problem?.title }}</div>
    <div v-if="problem.type == 'input'">
      <input type="text" placeholder="请输入" />
    </div>
    <div v-if="problem.type == 'singleSelect'">
      <span>这是singleSelect</span>
    </div>
    <div v-if="problem.type == 'multiSelect'">
      <span>这是multiSelect</span>
    </div>
    <div v-if="problem.type == 'pullSelect'">
      <span>这是pullSelect</span>
    </div>
    <div v-if="problem.type == 'date'">
      <span>date</span>
    </div>
    <div v-if="problem.type == 'time'">
      <span>这是time</span>
    </div>
    <div v-if="problem.type == 'score'">
      <span>这是score</span>
    </div>
    <span>这是problem.value：==={{ problem.value }}</span>
    <div>{{ id }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, PropType } from "vue";
import { IProblem } from "../types/types";
import * as api from "../services/api";
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
  },
  setup(props, ctx) {
    return {};
  },
  // created() {},
});
</script>

<style scoped>
.problemwriteitem {
  background-color: yellowgreen;
  margin: 100px 0;
}
</style>
