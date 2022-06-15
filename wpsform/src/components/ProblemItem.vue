<template>
  <div class="problem-item">
    <div class="problem-title">
      <span class="problem-title-index">{{ index + 1 }}.</span>
      <span>{{ problem.title }}</span>
    </div>
    <input class="problem-input" placeholder="请输入" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import * as api from "@/services/api";
import { IUser, IForm, IProblem } from "../types/types";
import { useStore } from "vuex";
import { PropType } from "vue";

export default defineComponent({
  name: "ProblemItem",
  components: {},
  props: {
    index: Number,
    problem: Object as PropType<IProblem>,
  },
  setup(props, ctx) {
    return {};
  },
});
</script>

<style scoped>
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
  margin-bottom: 40px;
  font-size: 14px;
}
.problem-input:hover {
  border-bottom: 1px solid #1488ed;
}
</style>
