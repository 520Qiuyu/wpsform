<template>
  <div>这是新建表单组件</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'NewformCreate.vue',
  components: {},
  props: {},
  setup(props, ctx) {
    const store = useStore()

    onBeforeMount(() => {
      store.commit('setAppStatus',2)
    })

    return {}
  },
})
</script>

<style scoped></style>
