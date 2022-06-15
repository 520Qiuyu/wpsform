<template>
  <div>
    <!-- 日期类型 -->
    <div class="date-type">
      <el-input :placeholder="defaultTypeName" disabled />
    </div>
    <!-- 日期选择 -->
    <div class="date-type-select" v-if="selected">
      <span>日期格式:</span>
      <el-select v-model="defaultType">
        <el-option
          v-for="(dateType, index) in dateTypes"
          :key="index"
          :value="dateType.type"
          :label="dateType.typeName"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, PropType } from "vue";
import { useStore } from "vuex";
import { IProblem } from "../types/types";
export default defineComponent({
  name: "DateQuestion",
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
    // 监视本地problem,并实时调用父组件api更改
    watch(thisProblem, (newVal) => {
      console.log("Problem更改成", newVal);
      Store.commit("form/setProblem", { id: thisProblem.id, problem: newVal });
    });
    // 默认的日期格式
    const defaultType = ref("YM");
    watch(defaultType, () => {
      (
        thisProblem.setting as { options: { title: string; status: 1 | 2 }[] }
      ).options.forEach((option) => {
        if (option.title === defaultType.value) {
          option.status = 2;
        } else {
          option.status = 1;
        }
      });
    });
    // 默认的日期格式名
    const defaultTypeName = computed(() => {
      for (const type of dateTypes) {
        if (type.type == defaultType.value) {
          return type.typeName;
        }
      }
      return "年-月";
    });
    // 支持的日期格式类型
    const dateTypes = reactive([
      { type: "YM", typeName: "年-月" },
      { type: "YMD", typeName: "年-月-日" },
      { type: "YMDHM", typeName: "年-月-日-时-分" },
    ]);

    return {
      thisProblem,
      dateTypes,
      defaultType,
      defaultTypeName,
    };
  },
  created() {
    // 初始化setting中的默认日期格式
    this.thisProblem.setting = {
      options: [
        { title: "YM", status: 1 },
        { title: "YMD", status: 1 },
        { title: "YMDHM", status: 1 },
      ],
    };
  },
});
</script>

<style scoped>
.date-type:hover {
  border-bottom: 1px dashed #e8ebee;
}
.date-type-select {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.el-select {
  margin-left: 5px;
  width: 140px;
  border: 1px solid #e7e9eb;
  border-radius: 3px;
}

</style>