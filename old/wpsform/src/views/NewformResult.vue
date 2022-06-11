<template>
  <div>这是数据详情组件</div>
  <ul>
    <li>
      <router-link to="/app/new-form-result/statistical-details"
        >数据统计分析
      </router-link>
    </li>
    <li>
      <router-link to="/app/new-form-result/form-question"
        >表单问题
      </router-link>
    </li>
    <li><router-link to="/app/new-form-result/share">分享 </router-link></li>
  </ul>
  <router-view></router-view>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "NewformResult",
  components: {},
  props: {},
  setup(props, ctx) {
    return {};
  },
});
</script>

<style scoped>
</style>