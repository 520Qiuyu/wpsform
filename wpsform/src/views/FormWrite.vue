<template>
  <el-container class="form-write-container">
    <el-header class="form-write-header">
      <el-page-header :content="formTitle" @back="goBack" />
    </el-header>
    <el-main class="form-write-main">
      <div class="form-write-content">
<<<<<<< HEAD
        <div>title:{{ form[0]?.title }}</div>
        <div>subTitle:{{ form[0]?.subTitle }}</div>
        <div
          class="Problemlist"
          v-for="(problem, index) in form[0]?.problems"
          :key="problem?.id"
        >
          <ProblemWrite
            :problem="problem"
            :index="index"
            v-if="problem"
          ></ProblemWrite>
        </div>
=======
        <FormItem :formId="formId"></FormItem>
>>>>>>> 9a292a7761e0af491b79a55a55e1d5e43b029458
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
<<<<<<< HEAD
import { defineComponent, ref, reactive } from "vue";
import ProblemWrite from "../components/ProblemWrite.vue";
import { useRouter } from "vue-router";
import { IForm } from "../types/types";
import * as api from "../services/api";
export default defineComponent({
  name: "FormWrite",
  components: { ProblemWrite },
  props: {},
  setup(props, ctx) {
    const router = useRouter();
    const Formid = ref(router.currentRoute.value.params.Formid as string);

    const form = reactive<IForm[]>([]);
    const getForm = async (id: string) => {
      const res = await api.getForm(id);
      form.splice(0, 1);
      form.push(res.data.item);
    };
    return {
      Formid,
      form,
      getForm,
    };
  },
  created() {
    this.getForm(this.Formid);
    console.log(this.Formid);
    console.log(this.form);
=======
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
>>>>>>> 9a292a7761e0af491b79a55a55e1d5e43b029458
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
<<<<<<< HEAD
.form-submit {
  width: 96px;
}
.form-submit-area {
  display: flex;
  justify-content: center;
}
.form-submit {
  width: 96px;
}
=======
>>>>>>> 9a292a7761e0af491b79a55a55e1d5e43b029458
</style>
