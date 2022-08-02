<template>
  <div>
    <!-- 问题回答区 -->
    <div class="problem-answer">
      <input
        v-model="thisProblem.answer"
        :disabled="disableAnswer"
        placeholder="填写者回答区"
        class="input-answer"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { useStore } from "vuex";
import { IProblem } from "@/types/types";
export default defineComponent({
  name: "InputQuestion",
  props: {
    problem: {
      type: Object as PropType<IProblem>,
      required: true,
    },
    disableAnswer: {
      type: Boolean,
      default: false,
    },
    selected:{
      type:Boolean,
      default: false,
    }
  },emits: [ "update:problem"],
   
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
    
    // 问题类型组
    const problemTypes = computed(() => Store.state.problem.quesTypes);
    return {
      thisProblem,
      problemTypes,
    };
  },
});
</script>

<style scoped>
.problem-answer{
  width:100%;
  border-bottom:1px dashed #E2E6ED;
}
.input-answer{
  outline:none;
  border:none;
  width:100%;
  line-height:1.5;
  background-color:#fff;
}
</style>