<template>
  <div>
    <!-- 问题回答区 -->
    <div class="problem-answer">
      <div
        class="problem-answer-item"
        v-for="(option, index) in thisProblem.setting?.options"
        :key="option.id"
      >
        <input type="radio" :checked="option.status == 1" disabled />
        <el-input
          v-model="option.title"
          :placeholder="`单选选项${index + 1}`"
        ></el-input>
        <el-icon color="#A8ABB2" @click="delOption(option)" v-show="selected"
          ><Close
        /></el-icon>
      </div>
    </div>
    <!-- 问题回答设置区 -->
    <div class="problem-answer-set" v-if="selected">
      <el-button @click="addSelect" link>+选项</el-button>
      <el-button @click="defaultAnswerVisible = true" link>预设答案</el-button>
      <el-dialog v-model="defaultAnswerVisible" title="预设答案" width="30%">
        <!-- 对话框的主体部分 -->
        <el-select v-model="defaultAnswer">
          <el-option
            v-for="(option, index) in thisProblem.setting!.options"
            :key="option.id"
            :value="option.id"
            :label="option.title || `选项${index + 1}`"
          ></el-option>
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
  </div>
</template>

<script lang="ts">
import { nanoid } from "nanoid";
import { defineComponent, ref, computed, PropType } from "vue";
import { useStore } from "vuex";
import { IProblem, option } from "@/types/types";
export default defineComponent({
  name: "SingleSelect",
  props: {
    problem: {
      type: Object as PropType<IProblem>,
      required: true,
    },
    disableAnswer: {
      type: Boolean,
      default: false,
    },
    selected: {
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
    // 删除选项
    const delOption = (option: option) => {
      thisProblem.value.setting!.options! =
        thisProblem.value.setting!.options!.filter((item: option) => {
          return item !== option;
        });
    };
    // 问题答案设置：+选项
    const addSelect = () => {
      thisProblem.value.setting!.options!.push({
        id: nanoid(),
        title: "",
        status: 2,
      });
    };
    // 设置预设答案的窗口是否显示
    const defaultAnswerVisible = ref(false);
    const defaultAnswer = ref("请选择一个为预选答案");
    // 设置题目预设
    const setDefaultAnswer = () => {
      thisProblem.value.setting!.options!.forEach((option, index) => {
        if (defaultAnswer.value === option.id) {
          option.status = 1;
        } else {
          option.status = 2;
        }
      });
      defaultAnswerVisible.value = false;
    };
    // 取消题目预设
    const cancelDefaultAnswer = () => {
      defaultAnswer.value = "请选择一个为预选答案";
      setDefaultAnswer();
      defaultAnswerVisible.value = false;
    };
    return {
      thisProblem,
      delOption,
      addSelect,
      defaultAnswerVisible,
      defaultAnswer,
      setDefaultAnswer,
      cancelDefaultAnswer,
    };
  },
  created() {
    if (!this.thisProblem.setting) {
      Object.assign(this.thisProblem, {
        setting: {
          options: [
            { id: nanoid(), title: "", status: 2 },
            { id: nanoid(), title: "", status: 2 },
          ],
        },
      });
    } else {
      this.thisProblem.setting.options?.forEach((item) => {
        if (!item.id) Object.assign(item, { id: nanoid() });
      });
    }
  },
});
</script>

<style scoped>
.problem-answer {
  width: 100%;
}
.problem-answer-item {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.problem-answer-item input[type="radio"] {
  margin-right: 5px;
}

.el-input:hover {
  border-bottom: 1px solid #e8ebee;
}
.problem-answer-set {
  display: flex;
  align-items: center;
  margin-bottom: -15px;
}

.problem-answer-set >>> .el-dialog{
  min-width:300px;
}
.problem-answer-set > button {
  font-size: 13px;
  color: #439ff0;
}
</style>