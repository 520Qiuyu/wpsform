<template>
  <div class="newform-result-containner">
    <div class="newform-result-title"><h1>这是数据详情组件</h1></div>
    <ul class="option-list">
      <li class="option-list-item">
        <router-link to="/app/new-form-result/statistical-details"
          >数据统计分析
        </router-link>
      </li>
      <li class="option-list-item">
        <router-link to="/app/new-form-result/form-question"
          >表单问题
        </router-link>
      </li>
      <li class="option-list-item">
        <router-link to="/app/new-form-result/share">分享 </router-link>
      </li>
    </ul>

    <router-view></router-view>
  </div>
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
.newform-result-containner {
}
</style>