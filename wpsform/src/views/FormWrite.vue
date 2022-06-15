<template>
  <el-container class="form-write-container">
    <el-header class="form-write-header">
      <el-page-header :content="formTitle" @back="goBack" />
    </el-header>
    <el-main class="form-write-main">
      <div class="form-write-content">
        <FormItem :formId="formId"></FormItem>
      </div>
    </el-main>
  </el-container>
  <div class="form-submit-area">
    <el-button type="primary" class="form-submit" @click="FormSubmit"
      >提交</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onBeforeMount } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import * as api from '@/services/api'
import { IUser, IForm, IProblem } from '../types/types'
import { useStore } from 'vuex'
import FormItem from '../components/FormItem.vue'

export default defineComponent({
  name: 'FormWrite',
  components: { FormItem },
  props: {},
  setup(props, ctx) {
    const route = useRoute()
    const router = useRouter()
    const formId = route.params.id as string
    const formTitle = ref('')

    const getForm =  async (id: string)=>{
      const res = await api.getForm(id)
      if(res.stat == 'ok') {
        formTitle.value = res.data.item.title
        // console.log(res.data.item.title);
      }
    }
    const goBack = ()=>{
      router.go(-1)
    }

    onBeforeMount(()=>{
      getForm(formId)
    })

    return {
      formId,
      formTitle,
      goBack,
    }
  },
})
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
  font-size: 20px;
  font-weight: 600;
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
