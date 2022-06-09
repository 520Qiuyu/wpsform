<template>
  <div class="form-list">
<<<<<<< HEAD
    <div class="form-list-aside" :style="{ height: adideHeight }">
      <div class="form-list-aside-top">
        <router-link to="/app/new-form-create" class="form-create-btn"
          >新建表单</router-link
        >
=======
    <div class="form-list-aside" :style="{height:adideHeight}">
      <div class="form-list-aside-top">
        <router-link to="/app/new-form-create" class="form-create-btn">新建表单</router-link>
>>>>>>> 6368583d5d3d79f011c967cf924935296a2c3a23
      </div>
      <span class="form-list-title">表单列表</span>
    </div>
    <div class="form-list-container">
<<<<<<< HEAD
      <router-link to="/app/new-form-result">
        <p class="form-list-item">点击进入表单1详情</p>
      </router-link>
      <router-link to="/app/new-form-result">
        <p class="form-list-item">点击进入表单2详情</p>
      </router-link>
      <router-link to="/app/new-form-result">
        <p class="form-list-item">点击进入表单3详情</p>
      </router-link>
      <router-link to="/app/new-form-result">
        <p class="form-list-item">点击进入表单4详情</p>
      </router-link>
=======
      <p>表单1</p>
      <p>表单2</p>
>>>>>>> 6368583d5d3d79f011c967cf924935296a2c3a23
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import { defineComponent, ref } from "vue";
=======
import { defineComponent,ref } from "vue";
>>>>>>> 6368583d5d3d79f011c967cf924935296a2c3a23
export default defineComponent({
  name: "FormList",
  components: {},
  props: {},
  setup(props, ctx) {
<<<<<<< HEAD
    const adideHeight = ref(window.innerHeight - 115 + "px");
    return {
      adideHeight,
=======
    const adideHeight = ref(window.innerHeight - 115 + 'px')
    return {
      adideHeight
>>>>>>> 6368583d5d3d79f011c967cf924935296a2c3a23
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
<<<<<<< HEAD
  padding: 30px;
}

.form-list-item {
  width: 100%;
  line-height: 40px;
  border: 1px solid #333;
  margin-bottom: 10px;
  padding: 0 20px;
}
=======
}

>>>>>>> 6368583d5d3d79f011c967cf924935296a2c3a23
</style>