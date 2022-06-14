<template>
  <el-container class="form-write-container">
    <el-header class="form-write-header">xxx表单名称</el-header>
    <el-main class="form-write-main">
      <div class="form-write-content">
        <FormItem></FormItem>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormItem from '../components/FormItem.vue'

export default defineComponent({
  name: "FormWrite",
  components: {FormItem},
  props: {},
  setup(props, ctx) {
    return {};
  },
});
</script>

<style>
.form-write-container {
  height: 100%;
}
.form-write-header {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  height: 56px;
}
.form-write-main {
  background-color: #f2f4f7;
  margin-top: 56px;
}
.form-write-content {
  width: 50%;
  min-height: 100%;
  background-color: #fff;
  padding: 48px 102px 90px;
  margin: 0 auto;
}
</style>