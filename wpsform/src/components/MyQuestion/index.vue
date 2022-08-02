<template>
  <div
    :class="selectedIndex === index ? 'question question-selected' : 'question'"
  >
    <!-- 最上面请输入问题 -->
    <div class="problem-title">
      <span class="index-num">{{ index + 1 }}.</span>
      <input
        v-model.lazy="problem.title"
        placeholder="请输入问题"
        class="problemInput"
      />
    </div>
    <MultiSelect
      v-if="problem.type === 'multiSelect'"
      v-model:problem="problem"
      :disableAnswer="true"
      :selected="selectedIndex === index"
    ></MultiSelect>
    <DateQuestion
      v-else-if="problem.type == 'date'"
      v-model:problem="problem"
      :disableAnswer="true"
      :selected="selectedIndex === index"
    ></DateQuestion>
    <InputQuestion
      v-else-if="problem.type == 'input'"
      v-model:problem="problem"
      :disableAnswer="true"
      :selected="selectedIndex === index"
    ></InputQuestion>
    <SingleSelect
      v-else-if="problem.type == 'singleSelect'"
      v-model:problem="problem"
      :disableAnswer="true"
      :selected="selectedIndex === index"
    ></SingleSelect>
    <ScoreQuestion
      v-else-if="problem.type == 'score'"
      v-model:problem="problem"
      :disableAnswer="true"
      :selected="selectedIndex === index"
    ></ScoreQuestion>
    <PullSelect
      v-else-if="problem.type == 'pullSelect'"
      v-model:problem="problem"
      :disableAnswer="true"
      :selected="selectedIndex === index"
    ></PullSelect>
    <TimeQuestion
      v-else-if="problem.type == 'time'"
      v-model:problem="problem"
      :disableAnswer="true"
      :selected="selectedIndex === index"
    ></TimeQuestion>
    <!-- 问题设置区 -->
    <div class="problem-setting" v-show="selectedIndex === index">
      <el-checkbox
        v-model="problem.isNew"
        :label="problem.isNew ? '允许重复' : '不允许重复'"
        size="large"
      />
      <el-icon><Warning /></el-icon>
    </div>
    <!-- 问题配置区 -->
    <div class="problem-option" v-show="selectedIndex === index">
      <!-- 题型切换 -->
      <div class="problem-type-change">
        <span>题型切换：</span>
        <el-select
          v-model="problem.type"
          class="m-2"
          placeholder="请输入问题类型"
          size="small"
        >
          <el-option
            v-for="(problemType, index) in problemTypes"
            :key="problemType.type + index"
            :label="problemType.title"
            :value="problemType.type"
          />
        </el-select>
      </div>
      <div class="right-option">
        <!-- 复制 -->
        <div class="copy">
          <el-button @click="cpoyThisProblem">复制</el-button>
        </div>
        <!-- 必填 -->
        <div class="must-fill-in">
          <el-checkbox v-model="problem.required" label="必填" size="large" />
          <el-icon><CaretBottom /></el-icon>
        </div>
        <!-- 删除 -->
        <div class="del-problem">
          <el-dropdown>
            <el-icon @click="delThisProblem"><Delete /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="delThisProblem"
                  >删除</el-dropdown-item
                >
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, PropType, computed, watch } from "vue";
import { IProblem } from "@/types/types";
import MultiSelect from "./Question/MultiSelect.vue";
import DateQuestion from "./Question/DateQuestion.vue";
import InputQuestion from "./Question/InputQuestion.vue";
import SingleSelect from "./Question/SingleSelect.vue";
import ScoreQuestion from "./Question/ScoreQuestion.vue";
import PullSelect from "./Question/PullSelect.vue";
import TimeQuestion from "./Question/TimeQuestion.vue";
import { useStore } from "vuex";
import axios from "axios";
import { ElMessage } from "element-plus";
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
    // 是否选中本组件
    selectedIndex: {
      type: Number,
      default: -1,
    },
  },
  emits: ["update:ques"],
  setup(props, ctx) {
    const Store = useStore();
    // 本地拷贝问题
    const problem = computed<IProblem>(() => props.ques);
    // 监视本地problem,
    watch(
      problem,
      (newVal) => {
        Store.commit("form/setProblem", {
          id: problem.value.id,
          problem: newVal,
        });
      },
      { deep: true }
    );
    // 问题类型组
    const problemTypes = computed(() => Store.state.problem.quesTypes);
    // 复制题目
    const cpoyThisProblem = () => {
      Store.commit("form/addQuesToQuesList", {
        problem: problem.value,
        index: props.index + 1,
      });
    };
    // 删除题目
    const delThisProblem = () => {
      Store.commit("form/delQuesFromQuesList", problem.value.id);
    };
    // 添加到常用
    const addThisProblemToCommonUse = async () => {
      if (problem.value.title === "")
        return ElMessage({
          message: "请填写题目",
          type: "error",
          center: true,
        });
      const res = await axios({
        method: "POST",
        url: "/api/problem/star",
        data: {
          problem: problem.value,
        },
      });
      if (res.data.stat === "ok") {
        Store.commit(
          "problem/addToCommonUse",
          Object.assign({}, problem.value, { id: res.data.data.id })
        );
      }
    };

    return {
      problem,
      problemTypes,
      cpoyThisProblem,
      delThisProblem,
      addThisProblemToCommonUse,
    };
  },
  mounted() {
    // 让元素平滑的进入视野
    this.$el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  },
});
</script>

<style scoped>
.question {
  width: 550px;

  margin: 20px 0;
  background-color: #fff;
  padding: 20px 24px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.question-selected {
  box-shadow: 0 4px 16px 0 rgb(192 198 207 / 50%);
  transition: all 0.3s;
}
.question > div:not(:last-child) {
  margin-bottom: 10px;
}
.problem-title {
  padding: 8px 0 5px 0;
  position: relative;
  border-bottom: 1px solid #fff;
  font-size: 14px;
  line-height: 18px;
  color: #3d4757;
  margin-bottom: 10px;
}
.problem-title:hover {
  border-bottom: 1px solid #e7eaee;
}

.problemInput {
  border: none;
  outline: none;
  font-weight: bold;
  text-indent: 15px;
}
.problem-setting {
  font-size: 12px;
  display: flex;
  align-items: center;
}

.problem-setting .el-icon {
  margin-left: 4px;
}
.problem-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #767c85;
}
.problem-option > div {
  display: flex;
  align-items: center;
}
.problem-option > div:not(:last-child) {
  margin-right: 10px;
}

.problem-type-change div.el-select {
  width: 85px;
}
.right-option > div {
  height: 40px;
  display: flex;
  align-items: center;
}
.right-option > div:not(:last-child)::after {
  content: "";
  display: inline-block;
  width: 0;
  height: 15px;
  border-left: 1px solid #e2e6ed;
  vertical-align: middle;
  margin: 0 10px;
}
.copy button.el-button {
  width: 40px;
  height: 22px;
}
.must-fill-in label.el-checkbox {
  margin-left: 7px;
  margin-right: 3px;
}
.del-problem {
  height: inherit;
}
.del-problem > .el-dropdown {
  margin: 0 2px;
}
</style>