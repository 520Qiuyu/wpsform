<template>
  <div class="newform-result-container">
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
import * as api from '@/services/api'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: "NewformResult",
  props: {},
  setup(props, ctx) {
    const store = useStore();
    const Route = useRoute();
    const Router = useRouter();
    const formId = ref(Route.query.id as string);

    const goToOtherPage = async (tabPaneName: string) => {
      if(tabPaneName == 'share') {
        const res = await api.getForm(formId.value)
        if(res.stat == 'ok') {
          if(res.data.item.status != 3) {
            ElMessage.error('表单未发布或者已经结束收集')
          }
          else {
            Router.push({
        name: tabPaneName,
        query: {
          id: formId.value,
        },
      });
          }
        }
      } else {
        Router.push({
        name: tabPaneName,
        query: {
          id: formId.value,
        },
      });
      }
    };
    onBeforeMount(() => {
      store.commit("user/setAppStatus", 3);
      // console.log(activeName.value);
    });
    return {
      goToOtherPage,
      formId,
    };
  },
  created() {
    // this.$router.push({
    //   name: "statistical-details",
    //   query: {
    //     id: this.formId,
    //   },
    // });
  },
});
</script>

<style scoped>
.newform-result-container {
  height: 100%;
  margin-top: 56px;
  overflow: hidden;
  background-color: #f2f4f7;
  position: relative;
}
.newform-result-nav {
  /* position: fixed;
  width: 100%; */
  padding: 20px 50px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}
.newform-result-nav li a {
  margin: 20px;
  font-size: 18px;
}
.newform-result-nav li a:hover {
  color: #339cfe;
}
</style>
