<template>
  <div class="form-question-main">
    <div class="form-question-content">
      <FormItem></FormItem>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import FormItem from '../components/FormItem.vue'

export default defineComponent({
  name: "FormQuestion",
  components: {
    FormItem
  },
  props: {},
  setup(props, ctx) {
    return {};
  },
});
</script>

<style scoped>
.form-question-main {
  width: 60%;
  height: 100%;
  /* background-color: #f2f4f7; */
  margin: 0 auto;
}
.form-question-content {
  height: 100%;
  background-color: #fff;
  padding: 48px 120px 90px;
}

</style>