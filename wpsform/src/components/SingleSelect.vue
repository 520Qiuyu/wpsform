<template>
  <div>
    <!-- 最上面请输入问题 -->
    <div class="problem-title">
      <span class="index-num">{{ index + 1 }}</span>
      <el-input v-model="thisProblem.title" placeholder="请输入问题" />
    </div>
    <!-- 问题回答区 -->
    <div class="problem-answer">
      <div
        class="problem-answer-item"
        v-for="(option, index) in thisProblem.setting?.options"
        :key="index"
      >
        <input
          type="radio"
          name="answer"
          :checked="option.status === 2"
          disabled
        />
        <el-input
          v-model="option.title"
          :placeholder="`选项${index + 1}`"
        ></el-input>
      </div>
    </div>
    <!-- 问题回答设置区 -->
    <div class="problem-answer-set">
      <el-button @click="addSelect" link>+选项</el-button>
      <el-button @click="defaultAnswerVisible = true" link>预设答案</el-button>
      <el-dialog v-model="defaultAnswerVisible" title="预设答案" width="30%">
        <!-- 对话框的主体部分 -->
        <el-select v-model="defaultAnswer">
          <!-- <el-option>请选择预设</el-option> -->
          <el-option
            v-for="(option, index) in thisProblem.setting.options"
            :key="index"
            :value="index"
            >{{ option.title ? option.title : "选项" + (index + 1) }}</el-option
          >
        </el-select>
        <!-- 对话框中的确认取消按钮 -->
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancelDefaultAnswer">取消预设</el-button>
            <el-button type="primary" @click="setDefaultAnswer">
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>
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
              <el-dropdown-item @click="addThisProblemToCommonUse">
                将此题添加为常用
              </el-dropdown-item>
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
  name: "SingleSelect",
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
    // 问题答案设置：+选项
    const addSelect = () => {
      (
        thisProblem.setting as { options: { title: string; status: 1 | 2 }[] }
      ).options.push({
        title: "",
        status: 1,
      });
    };
    // 设置预设答案的窗口是否显示
    const defaultAnswerVisible = ref(false);
    const defaultAnswer = ref(-1);
    // 设置题目预设
    const setDefaultAnswer = () => {
      if (defaultAnswer.value > -1) {
        (
          thisProblem.setting as { options: { title: string; status: 1 | 2 }[] }
        ).options.forEach((option, index) => {
          if (index === defaultAnswer.value) {
            option.status = 2;
          } else {
            option.status = 1;
          }
        });
      } else {
        (
          thisProblem.setting as { options: { title: string; status: 1 | 2 }[] }
        ).options.forEach((option, index) => {
          option.status = 1;
        });
      }
      defaultAnswerVisible.value = false;
    };
    // 取消题目预设
    const cancelDefaultAnswer = () => {
      defaultAnswer.value = -1;
      setDefaultAnswer();
      defaultAnswerVisible.value = false;
    };
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
    const ttt = ref(true);
    const cities = ["", ""];
    return {
      thisProblem,
      addSelect,
      defaultAnswerVisible,
      defaultAnswer,
      setDefaultAnswer,
      cancelDefaultAnswer,
      problemTypes,
      delThisProblem,
      cpoyThisProblem,
      addThisProblemToCommonUse,
      ttt,
      cities,
    };
  },
  created() {
    // 初始化两个选项
    if (!this.thisProblem.setting) {
      this.thisProblem.setting = {
        options: [
          { title: "", status: 1 },
          { title: "", status: 1 },
        ],
      };
    }
  },
});
</script>

<style scoped>
</style>