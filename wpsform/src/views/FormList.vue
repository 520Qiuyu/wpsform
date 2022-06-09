<template>
  <div class="form-list">
    <div class="form-list-aside" :style="{height:adideHeight}">
      <div class="form-list-aside-top">
        <router-link to="/app/new-form-create" class="form-create-btn">新建表单</router-link>
      </div>
      <span class="form-list-title">表单列表</span>
    </div>
    <div class="form-list-container">
      <p>表单1</p>
      <p>表单2</p>
    </div>
  </div>
</template>

<script>
import { defineComponent,ref } from "vue";
export default defineComponent({
  name: "FormList",
  components: {},
  props: {},
  setup(props, ctx) {
    const adideHeight = ref(window.innerHeight - 115 + 'px')
    return {
      adideHeight
    };
  },
});
</script>

<style scoped>
.form-list {
  display: flex;
  justify-content: space-between;
}
.form-list-aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 15%;
  border: 1px solid #ccc;
  border-top: 0;
}
.form-list-aside-top {
  padding: 40px;
}

.form-create-btn {
  text-align: center;
  color: black;
  padding: 10px 30px;
  border: 1px solid #ccc;
}

.form-list-title {
  text-align: center;
  border: 1px solid #ccc;
  border-left: 0;
  border-right: 0;
  width: 100%;
  padding: 30px 0;
}
.form-list-container {
  flex: 1;
  margin: 20px;
  margin-bottom: 100px;
  border: 1px solid #ccc;
}

</style>