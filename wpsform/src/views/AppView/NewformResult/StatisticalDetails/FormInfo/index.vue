<template>
  <div class="forminfo">
    <h3 class="subTitle">{{ store.state.form.visitingForm.subTitle }}</h3>
    <div
      class="Problemlist"
      v-for="(result, index) in formResult.result"
      :key="index"
    >
      <ShowProItem
        :problem="result"
        :disableWrite="disableWrite"
        :type="'showFillDetails'"
        :index="index"
      ></ShowProItem>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, ref, PropType } from "vue";
import { IForm, IFormResult, IProblem } from "@/types/types";
import ShowProItem from "@/components/ShowProItem.vue";
import { useStore } from "vuex";
import * as api from "@/services/api";
export default defineComponent({
  name: "FormInfo",
  components: {
    ShowProItem,
  },
  props: {
    disableWrite: {
      type: Boolean,
      default: false,
    },
    formResult: {
      type: Object as PropType<IFormResult>,
      required: true,
    },
  },
  setup(props, ctx) {
    const store = useStore();
    return {
      store,
    };
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
