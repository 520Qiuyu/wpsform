<template>
  <div>
    <!-- 最上面请输入问题 -->
    <div class="problem-title">
      <span class="index-num">1.</span>
      <el-input v-model="thisProblem.title" placeholder="请输入问题" />
      <span class="problem"></span>
    </div>
    <!-- 问题回答区 -->
    <div class="problem-answer">
      <el-input v-model="thisProblem.answer" placeholder="填写者回答区" />
      <span class="answer"></span>
    </div>
    <!-- 问题设置区 -->
    <div class="problem-setting">
      <el-checkbox
        v-model="isRepeat"
        :label="isRepeat ? '允许重复' : '不允许重复'"
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
        <el-button>复制</el-button>
      </div>
      <!-- 必填 -->
      <div class="must-fill-in">
        <el-checkbox v-model="thisProblem.required" label="必填" size="large" />
        <el-icon><CaretBottom /></el-icon>
      </div>
      <!-- 删除 -->
      <div class="del-problem">
        <el-dropdown>
          <el-icon @click="del"><Delete /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="del">删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-icon><MoreFilled /></el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, PropType, watch } from "vue";
import { IProblem } from "../types/types";
export default defineComponent({
  name: "InputQuestion",
  components: {},
  props: {
    problem: {
      type: Object as PropType<IProblem>,
      required: true,
    },
  },
  emits: ["changeType"],
  setup(props, ctx) {
    // 问题
    const thisProblem = reactive(props.problem as IProblem);
    watch(thisProblem, (newVal) => {
      console.log("问题类型修改成", newVal);
      for (const key in newVal) {
        console.log(key);
        thisProblem[key] = newVal[key];
      }
    });
    // 输入的回答
    const answer = ref("");
    // 问题答案是否可重复
    const isRepeat = ref(true);
    // 问题类型
    const problemType = ref("填空题");
    // 问题类型组
    const problemTypes = reactive([
      {
        type: "input",
        typeName: "填空题",
      },
      {
        type: "singleSelect",
        typeName: "单选题",
      },
      {
        type: "multiSelect",
        typeName: "多选题",
      },
      {
        type: "pullSelect",
        typeName: "下拉选择",
      },
      {
        type: "date",
        typeName: "日期题",
      },
      {
        type: "time",
        typeName: "时间题",
      },
      {
        type: "score",
        typeName: "分数题",
      },
    ]);
    // 是否必填
    const mustFillIn = ref(true);

    const visible = ref(false);
    const del = () => alert("shanchu");
    return {
      isRepeat,
      problemType,
      mustFillIn,
      thisProblem,
      problemTypes,
      visible,
      answer,
      del,
    };
  },
});
</script>

<style scoped>
</style>