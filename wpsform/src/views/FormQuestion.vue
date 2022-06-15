<template>
  <div class="form-question-main">
    <div class="form-question-content">
      <FormItem :formId="formId" :submitDisabled="false"></FormItem>
    </div>
    <div class="form-write-area">
      <el-button type="primary" class="form-write-btn" @click="goWriteForm">填写表单</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormItem from '../components/FormItem.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'FormQuestion',
  components: {
    FormItem,
  },
  props: {
    formId: String,
  },
  setup(props, ctx) {
    const router = useRouter()
    const goWriteForm = ()=>{
      router.push({
        name: 'form-write',
        params: {
          id: props.formId
        }
      })
    }
    return {
      goWriteForm
    }
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
