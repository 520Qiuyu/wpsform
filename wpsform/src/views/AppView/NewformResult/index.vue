<template>
  <div class="newform-result-container">
    <div class="newform-result-nav-wrapper">
      <ul class="newform-result-nav">
        <li class="newform-result-nav-item">
          <router-link
            :to="`/app/new-form-result/statistical-details?id=${formId}`"
            active-class="active"
            >数据详情&统计</router-link
          >
        </li>
        <li class="newform-result-nav-item">
          <router-link
            :to="`/app/new-form-result/form-question?id=${formId}`"
            active-class="active"
            >表单问题</router-link
          >
        </li>
        <li class="newform-result-nav-item">
          <router-link
            :to="`/app/new-form-result/share?id=${formId}`"
            active-class="active"
            >分享</router-link
          >
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import router from "vue-router";
import * as api from "@/services/api";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "NewformResult",
  props: {},
  setup(props, ctx) {
    const store = useStore();
    const Route = useRoute();
    const Router = useRouter();
    const formId = ref(Route.query.id as string);
    return {
      store,
      formId,
    };
  },
  created() {

    // 派发正在访问的表单
    this.store.dispatch("form/getVisitingFormById", this.formId);
  },
});
</script>

<style scoped>
.newform-result-container {
  min-height: calc(100vh - 56px);
  margin-top: 56px;
  background-color: #f2f4f7;
  position: relative;
}
.newform-result-nav-wrapper {
  width: 100%;
  background-color: #fff;
}
.newform-result-nav {
  width: 60%;
  box-sizing: border-box;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  cursor: pointer;
}
.newform-result-nav-item {
  margin-right: 36px;
  font-size: 18px;
  line-height: 56px;
}
.newform-result-nav li a {
  display: inline-block;
  color: rgba(0, 0, 0, 0.65);
}
.newform-result-nav li a:hover {
  color: #339cfe;
}

.active {
  color: #339cfe;
  border-bottom: 2px solid #339cfe;
}
@media screen and (max-width:768px) {
  .newform-result-nav{
    width: 80%;
  }
}
@media screen and (max-width:425px) {
  .newform-result-nav{
    width: 100%;
  }
  .newform-result-nav-item{
    margin-left: 20px;
    margin-right: 20px;
  }
  .newform-result-nav-item a{
    font-size: 14px;
    text-align: center;
  }
}
</style>
