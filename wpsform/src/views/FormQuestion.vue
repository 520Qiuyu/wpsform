<template>
  <div class="form-question-main">
    <div class="form-question-content">
      <FormItem :formId="formId" :submitDisabled="false"></FormItem>
    </div>
    <div class="form-write-area">
      <el-button type="primary" class="form-write-btn" @click="goWriteForm"
        >填写表单</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormItem from '../components/FormItem.vue'
import { useRouter } from 'vue-router'
import * as api from '@/services/api'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: "FormQuestion",
  components: {
    FormItem,
  },
  props: {
    formId: {
      type: String,
    },
  },
  setup(props, ctx) {
    const router = useRouter()
    const goWriteForm = async () => {
      const res = await api.getForm(String(props.formId))
      if (res.stat == 'ok') {
        const status = res.data.item.status
        if (status == 2) {
          ElMessage.error('表单未发布！')
        } else if (status == 4) {
          ElMessage.error('表单收集已结束！')
        } else {
          router.push({
            name: 'form-write',
            query: {
              id: props.formId,
            },
          })
        }
      }
    }
    return {
      goWriteForm,
    }
  },
  created(){
    console.log(this.formId);
    
  }
});
</script>

<style scoped>
.form-question-main {
  width: 100%;
  min-width: 330px;
  height: 100%;
  /* background-color: #f2f4f7; */
  margin: 0 auto;
  overflow: auto;
}
.form-question-content {
  min-height: 100%;
  background-color: #fff;
  padding: 30px 60px 0;
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
@media screen and (min-width:768px){
  .form-question-main {
    width: 80%;
  }
  .form-question-content {
    padding: 36px 80px 50px;
  }
}
@media screen and (min-width:1366px){
  .form-question-main {
    width: 60%;
  }
  .form-question-content {
    padding: 48px 120px 90px;
  }
}
</style>
