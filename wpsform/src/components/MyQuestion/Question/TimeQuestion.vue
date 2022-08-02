<template>
  <div>
    <!-- 日期类型 -->
    <div class="time-type">
      <el-input :placeholder="defaultTypeName" disabled />
    </div>
    <!-- 日期选择 -->
    <div class="time-type-select" v-show="selected">
      <span>时间格式：</span>
      <el-select v-model="defaultType">
        <el-option
          v-for="(dateType, index) in dateTypes"
          :key="index"
          :value="dateType.type"
          :label="
            dateType.typeName === '时-分'
              ? '时刻：时-分（24小时制）'
              : '时长：时-分-秒'
          "
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script lang="ts">
import { nanoid } from "nanoid";
import { defineComponent, ref, reactive, computed, watch, PropType } from "vue";
import { useStore } from "vuex";
import { IProblem } from "@/types/types";
export default defineComponent({
  name: "TimeQuestion",
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

    // 默认的时间格式
    const defaultType = ref("HM");
    watch(defaultType, () => {
        thisProblem.value.setting!.options!.forEach((option) => {
        if (defaultType.value === option.title) {
          option.status = 1;
        } else {
          option.status = 2;
        }
      });
    });
    // 默认的时间格式名
    const defaultTypeName = computed(() => {
      for (const type of dateTypes) {
        if (type.type == defaultType.value) {
          return type.typeName;
        }
      }
      return "时-分";
    });
    // 支持的日期格式类型
    const dateTypes = reactive([
      { type: "HM", typeName: "时-分" },
      { type: "HMS", typeName: "时-分-秒" },
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
        { id: nanoid(), title: "HM", status: 2 },
        { id: nanoid(), title: "HMS", status: 2 },
      ],
    };
  },
});
</script>

<style scoped>
.time-type:hover {
  border-bottom: 1px dashed #e8ebee;
}
.time-type-select {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.el-select {
  margin-left: 5px;
  width: 200px;
  border: 1px solid #e7e9eb;
  border-radius: 3px;
}
</style>