<template>
  <div class="form-question-main">
    <div class="form-question-content">
      <!-- <FormItem></FormItem> -->
    </div>
    <div class="form-write-area">
      <el-button type="primary" class="form-write-btn">填写表单</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormItem from '../components/FormItem.vue'

export default defineComponent({
  name: 'FormQuestion',
  components: {
    FormItem,
  },
  setup(props, ctx) {
    return {}
  },
})
</script>

<style scoped>
.form-question-main {
  width: 60%;
  height: 100%;
  /* background-color: #f2f4f7; */
  margin: 0 auto;
  overflow: auto;
}
.form-question-content {
  min-height: 100%;
  background-color: #fff;
  padding: 48px 120px 90px;
}

.form-write-area {
  display: flex;
  justify-content: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding: 15px 0;
}
.form-write-btn {
  width: 96px;
  margin-left: -16px;
}
</style>
