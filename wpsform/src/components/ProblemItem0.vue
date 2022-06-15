<template>
  <div class="problemitem">
    <div>这是一个ProblemItem</div>
    <button @click="loog">点我打印problem</button>
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
    const loog = () => {
      console.log("problem的ID");
      console.log(props.problem);
    };
    return {
      loog,
    };
  },
  created() {
    console.log("$");
    console.log(this.problem);
  },
});
</script>

<style scoped>
.problemitem {
  background-color: aqua;
  margin: 100px 0;
}
</style>
