<template>
  <div class="forminfo">
    <h3 class="subTitle">{{ form[0]?.subTitle }}</h3>
    <div
      class="Problemlist"
      v-for="(problem, index) in form[0]?.problems"
      :key="index"
    >
      <ShowProItem
        :resultid="result.id"
        :problem="problem"
        :index="index"
        v-if="result.id"
        :disableWrite="disableWrite"
      ></ShowProItem>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, ref } from "vue";
import { IForm, IFormResult } from "../types/types";
import ShowProItem from "./ShowProItem.vue";
import * as api from "../services/api";
export default defineComponent({
  name: "FormInfo",
  components: {
    ShowProItem,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    Findex: {
      type: Number,
      required: true,
    },
    disableWrite: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const form = reactive<IForm[]>([]);
    const getForm = async (id: string) => {
      const res = await api.getForm(id);
      form.splice(0, 1);
      form.push(res.data.item);
    };
    watch(
      () => props.Findex,
      (val, Oldval) => {
        console.log("watch,index变了", val);
        console.log("watch,index变了", form);
        getForm(props.id);
        getFormResult(props.id);
      }
    );

    const result = ref({} as IFormResult);
    const resultList = ref([] as IFormResult[]);
    const getFormResult = async (formid: string) => {
      const res = await api.getFormResult(formid);
      if (res.stat == "ok") {
        for (const item of res.data.items) {
          resultList.value.push(item);
          result.value = resultList.value[props.Findex];
          console.log("watch变了", resultList.value[props.Findex]);
          console.log("result.value", result.value);
          console.log("result.value.id", result.value.id);
        }
      }
    };
    return {
      result,
      form,
      resultList,
      getForm,
      getFormResult,
    };
  },
  created() {
    this.getForm(this.id);
    this.getFormResult(this.id);
  },
});
</script>

<style scoped>
.forminfo {
  margin: 50px 0;
}
.subTitle {
  text-align: center;
}
</style>
