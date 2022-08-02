<template>
  <div class="score-box">
    <span>
      <el-icon color="#C2C2C2" :size="28" v-for="i in 5" :key="i"><StarFilled /></el-icon>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, PropType, watch } from "vue";
import { useStore } from "vuex";
import { IProblem } from "@/types/types";
export default defineComponent({
  name: "ScoreQuestion",
  components: {},
  props: {
    problem: {
      type: Object as PropType<IProblem>,
      required: true,
    },
    disableAnswer: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:problem"],
  setup(props, ctx) {
    const Store = useStore();
    // 问题,对props传入的problem本地化
    const thisProblem = computed<IProblem>({
      get() {
        return props.problem as IProblem;
      },
      set(newVal) {
        ctx.emit("update:problem", newVal);
      },
    });
    
    return {
      thisProblem,
    };
  },
});
</script>

<style scoped>
.score-box {
  margin-bottom: 0;
  text-indent: 10px;
}
.score-box:hover {
  border-bottom: 1px solid #e7e9eb;
}
</style>