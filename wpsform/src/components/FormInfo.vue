<template>
  <div class="forminfo">
    <div>这是一个From</div>
    <h3 class="subTitle">{{ form[0]?.subTitle }}</h3>
    <div
      class="Problemlist"
      v-for="(problem, index) in form[0]?.problems"
      :key="problem?.id"
    >
      <ProblemItem
        :problem="problem"
        :index="index"
        v-if="problem"
      ></ProblemItem>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import { IForm } from "../types/types";
import ProblemItem from "./ProblemItem.vue";
import * as api from "../services/api";
export default defineComponent({
  name: "FormInfo",
  components: {
    ProblemItem,
  },
  props: {
    id: {
      type: String,
      required: true,
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
      () => props.id,
      (val, Oldval) => {
        console.log("0000000watch,id变了");
        getForm(val);
      }
    );
    return {
      form,
      getForm,
    };
  },
  created() {
    this.getForm(this.id);
  },
});
</script>

<style scoped>
.forminfo {
  margin: 50px 0;
  background-color: gray;
}
.subTitle {
  text-align: center;
}
</style>
