<template>
  <div>
    <!-- 最上面请输入问题 -->
    <div class="problem-title">
      <span class="index-num">{{ index + 1 }}</span>
      <el-input v-model="thisProblem.title" placeholder="请输入问题" />
      <span class="problem"></span>
    </div>
    <!-- 问题回答区 -->
    <div class="problem-answer">
      <el-input
        v-model="thisProblem.answer"
        :disabled="disableAnswer"
        placeholder="填写者回答区"
      />
      <span class="answer"></span>
    </div>
    <!-- 问题设置区 -->
    <div class="problem-setting">
      <el-checkbox
        v-model="thisProblem.isNew"
        :label="thisProblem.isNew ? '允许重复' : '不允许重复'"
        size="large"
      />
      <el-icon><Warning /></el-icon>
    </div>
    <!-- 问题配置区 -->
    <div class="problem-option">
      <!-- 题型切换 -->
      <div class="problem-type-change">
        <span>题型切换：</span>
        <el-select
          v-model="thisProblem.type"
          class="m-2"
          placeholder="请输入问题类型"
          size="small"
        >
          <el-option
            v-for="(problemType, index) in problemTypes"
            :key="problemType.type + index"
            :label="problemType.typeName"
            :value="problemType.type"
          />
        </el-select>
      </div>
      <!-- 复制 -->
      <div class="copy">
        <el-button @click="cpoyThisProblem">复制</el-button>
      </div>
      <!-- 必填 -->
      <div class="must-fill-in">
        <el-checkbox v-model="thisProblem.required" label="必填" size="large" />
        <el-icon><CaretBottom /></el-icon>
      </div>
      <!-- 删除 -->
      <div class="del-problem">
        <el-dropdown>
          <el-icon @click="delThisProblem"><Delete /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="delThisProblem">删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown>
          <el-icon><MoreFilled /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="addThisProblemToCommonUse"
                >将此题添加为常用</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, PropType, watch } from "vue";
import { useStore } from "vuex";
import { IProblem } from "../types/types";
import { nanoid } from "nanoid";
export default defineComponent({
  name: "InputQuestion",
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
    index: {
      type: Number,
      required: true,
    },
  },
  emits: ["setProblem"],
  setup(props, ctx) {
    const Store = useStore();
    // 问题,对props传入的problem本地化
    const thisProblem = reactive(props.problem as IProblem);
    // 监视本地problem,并实时调用父组件api更改
    watch(thisProblem, (newVal) => {
      console.log("Problem更改成", newVal);
      Store.commit("form/setProblem", { id: thisProblem.id, problem: newVal });
    });
    // 问题类型组
    const problemTypes = computed(() => Store.state.problem.quesTypes);
    // 复制题目
    const cpoyThisProblem = () => {
      console.log("copy", thisProblem);
      const problem = JSON.parse(JSON.stringify(thisProblem));
      Store.commit("form/addQuesToQuesList", {
        problem,
        index: props.index + 1,
      });
    };
    // 删除题目
    const delThisProblem = () => {
      console.log("delete", thisProblem);
      Store.commit("form/delQuesFromQuesList", thisProblem.id);
    };
    // 添加到常用
    const addThisProblemToCommonUse = () => {
      console.log("addToUse", thisProblem);
      if (thisProblem.title === "") return alert("请填写题目");
      Store.commit("problem/addToCommonUse", thisProblem);
    };
    return {
      thisProblem,
      problemTypes,
      delThisProblem,
      cpoyThisProblem,
      addThisProblemToCommonUse,
    };
  },
});
</script>

<style scoped>
</style>