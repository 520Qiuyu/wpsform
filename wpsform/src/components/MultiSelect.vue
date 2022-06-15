<template>
  <div>
    <!-- 问题回答区 -->
    <div class="problem-answer">
      <div
        class="problem-answer-item"
        v-for="(option, index) in thisProblem.setting?.options"
        :key="index"
      >
        <input
          type="checkbox"
          name="answer"
          :checked="option.status === 2"
          disabled
        />
        <el-input
          v-model="option.title"
          :placeholder="`多选选项${index + 1}`"
        ></el-input>
      </div>
    </div>
    <!-- 问题回答设置区 -->
    <div class="problem-answer-set" v-if="selected">
      <el-button @click="addSelect" link>+选项</el-button>
      <el-button @click="defaultAnswerVisible = true" link>预设答案</el-button>
      <el-dialog v-model="defaultAnswerVisible" title="预设答案" width="30%">
        <!-- 对话框的主体部分 -->
        <el-select v-model="defaultAnswerName" :multiple="true">
          <el-option
            v-for="tem in defaultAnswerArray"
            :key="tem.index"
            :value="tem.title"
            :label="tem.title"
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
import { defineComponent, ref, computed, reactive, PropType, watch } from "vue";
import { useStore } from "vuex";
import { IProblem } from "../types/types";
export default defineComponent({
  name: "MultiSelect",
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
  emits: ["setProblem"],
  setup(props, ctx) {
    const Store = useStore();
    // 问题,对props传入的problem本地化
    const thisProblem = reactive(props.problem as IProblem);
    // 监视本地problem,并实时调用mutation的api更改
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
    // 默认预选选项
    const defaultAnswerName = ref(["请选择预选"]);
    // 预选选项在options数组中的index
    const defaultAnswerIndex = computed(() => {
      const indexArr = [] as number[];
      for (let i = 0; i < defaultAnswerArray.value.length; i++) {
        for (let j = 0; j < defaultAnswerName.value.length; j++) {
          if (defaultAnswerName.value[j] === defaultAnswerArray.value[i].title)
            indexArr.push(i);
        }
      }
      return indexArr;
    });
    // options中index与title的对应关系
    const defaultAnswerArray = computed<{ index: number; title: string }[]>(
      () => {
        const arr = [] as { index: number; title: string }[];
        for (
          let i = 0;
          i <
          (
            thisProblem.setting as {
              options: { title: string; status: 1 | 2 }[];
            }
          ).options.length;
          i++
        ) {
          arr.push({
            index: i,
            title: (
              thisProblem.setting as {
                options: { title: string; status: 1 | 2 }[];
              }
            ).options[i].title
              ? (
                  thisProblem.setting as {
                    options: { title: string; status: 1 | 2 }[];
                  }
                ).options[i].title
              : `选项${i + 1}`,
          });
        }
        return arr;
      }
    );
    // 设置题目预设
    const setDefaultAnswer = () => {
      if (defaultAnswerIndex.value.length > 0) {
        (
          thisProblem.setting as { options: { title: string; status: 1 | 2 }[] }
        ).options.forEach((option, index) => {
          if (defaultAnswerIndex.value.includes(index)) {
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
      defaultAnswerName.value = ["请选择预选"];
      setDefaultAnswer();
      defaultAnswerVisible.value = false;
    };
    return {
      thisProblem,
      addSelect,
      defaultAnswerVisible,
      defaultAnswerName,
      defaultAnswerArray,
      setDefaultAnswer,
      cancelDefaultAnswer,
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
.problem-answer {
  width: 100%;
}
.problem-answer-item {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.problem-answer-item input[type="checkbox"] {
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
.problem-answer-set > button {
  font-size: 13px;
  color: #439ff0;
}
</style>