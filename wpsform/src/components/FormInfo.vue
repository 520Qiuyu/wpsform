<template>
  <div class="forminfo">
    <div>这是一个From</div>
    <h3 class="subTitle">{{ form[0]?.subTitle }}</h3>
    <div
      class="Problemlist"
      v-for="(problem, index) in form[0]?.problems"
      :key="problem?.id"
    >
<<<<<<< HEAD
      <problem-item
        :problem="problem"
        :index="index"
        v-if="problem"
      ></problem-item>
    </div>
    <button @click="loog">点我打印formID</button>
=======
      <ProblemItem
        :problem="problem"
        :index="index"
        v-if="problem"
      ></ProblemItem>
    </div>
>>>>>>> a4f78b28bd62355bdcdeeb369d1b2fac7a706e1e
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import { IForm } from "../types/types";
<<<<<<< HEAD
import ProblemItem from "./ProblemItem0.vue";
=======
import ProblemItem from "./ProblemItem.vue";
>>>>>>> a4f78b28bd62355bdcdeeb369d1b2fac7a706e1e
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
    const loog = () => {
      console.log("Form的ID");
      console.log(props.id);
      console.log(form[0]?.problems.length);
    };
    return {
      form,
      getForm,
      loog,
    };
  },
  created() {
    console.log("@");
    this.getForm(this.id);
    // console.log(this.id);
    console.log(this.form);
  },
});
</script>

<style scoped>
.forminfo {
  margin: 100px 0;
  background-color: gray;
}
.subTitle {
  text-align: center;
}
</style>
