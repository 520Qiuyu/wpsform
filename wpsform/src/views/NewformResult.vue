<template>
  <div class="newform-result-container">
    <el-tabs
      v-model="activeName"
      class="newform-result-tabs"
      @tab-change="handleChange"
    >
    </el-tabs>
    <ul class="newform-result-nav">
      <li>
        <a @click="goToOtherPage('statistical-details')">数据详情&统计</a>
        <a @click="goToOtherPage('form-question')">表单问题</a>
        <a @click="goToOtherPage('share')">分享</a>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import router from "vue-router";

export default defineComponent({
  name: "NewformResult",
  props: {},
  setup(props, ctx) {
    const store = useStore();
    const Route = useRoute();
    const Router = useRouter();
    const activeName = ref("");
    const formId = ref(Route.query.id as string);

    const goToOtherPage = (tabPaneName: string) => {
      Router.push({
        name: tabPaneName,
        query: {
          id: formId.value,
        },
      });
    };
    onBeforeMount(() => {
      store.commit("user/setAppStatus", 3);
      activeName.value = String(Route.name) || "";
      // console.log(activeName.value);
    });
    return {
      activeName,
      goToOtherPage,
      formId,
    };
  },
  created() {
    this.$router.push({
      name: "statistical-details",
      query: {
        id: this.formId,
      },
    });
  },
});
</script>

<style scoped>
.newform-result-container {
  height: 100%;
  margin-top: 56px;
  overflow: hidden;
}
.newform-result-nav {
  margin-top: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
.newform-result-nav li a {
  margin: 20px;
  font-size: 18px;
}
.newform-result-nav li a:hover {
  color: #339cfe;

/* 分享页面 */
#pane-share{
  height: calc(100vh - 180px);
}
</style>
