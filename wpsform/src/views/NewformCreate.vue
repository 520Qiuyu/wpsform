<template>
  <div>
    这是新建表单组件
    <el-button @click="createForm">点我新建表单</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import * as api from '@/services/api'

export default defineComponent({
  name: 'NewformCreate.vue',
  components: {},
  props: {},
  setup(props, ctx) {
    const store = useStore()

    const createForm = async () => {
      const res = await api.createForm('表单1', '副标题', [
        {
          title: '问题1',
          type: 'input',
          required: true,
          isNew: true,
        },
        {
          title: '问题2',
          type: 'date',
          required: true,
          isNew: true,
        },
      ])
      if (res.stat == 'ok') {
        console.log(res)
      }
    }

    onBeforeMount(() => {
      store.commit('setAppStatus', 2)
    })

    return {
      createForm,
    }
  },
})
</script>

<style scoped></style>
