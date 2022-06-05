<template>
  <div>这是表单列表组件</div>
  <router-link to="/app/new-from-create">点我进入新建表单</router-link>
  <router-link to="/app/new-form-result">点击进入表单详情</router-link>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "FormList",
  components: {},
  props: {},
  setup(props, ctx) {
    return {};
  },
});
</script>

<style scoped>
</style>