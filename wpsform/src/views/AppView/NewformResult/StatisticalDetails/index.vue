<template>
  <div class="formList-main">
    <div class="formlist-content">
      <span class="statistics-title"
        >共收集 {{ formList.length }} 份数据 （{{ statustext }}）</span
      >
      <div class="formindex-choose">
        <i class="iconfont icon-arrow-left" @click="prevFormResult"></i>
        第 <span class="form-index"> {{ currentFormIndex + 1 }} </span> 份
        <i class="iconfont icon-angle-right-o-thin" @click="nextFormResult"></i>
      </div>
      <hr />
      <div class="form-main">
        <span class="input-time"
          >创建时间：{{
            dayjs(visitingForm.ctime).format("YYYY/MM/DD HH:mm:ss")
          }}</span
        >
        <FormInfo
          v-if="formList.length > 0"
          :formResult="formList[currentFormIndex]"
          :disableWrite="true"
          ref="formInfo"
        ></FormInfo>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, reactive, ref } from "vue";
import { IForm, IFormResult } from "@/types/types";
import FormInfo from "./FormInfo/index.vue";
import * as api from "@/services/api";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import dayjs from "dayjs";
export default defineComponent({
  name: "StatisticalDetails",
  components: {
    FormInfo,
  },
  setup(props, ctx) {
    const route = useRoute();
    const store = useStore();
    const formId = ref(route.query.id as string);
    const visitingForm = ref({} as IForm);
    // 当前查看的form的下标
    const currentFormIndex = ref(0);
    // 当前已收集的form详情的集合
    const formList = ref([] as IFormResult[]);
    // 获取表单填写详情
    const getFormDeatils = async () => {
      const res = await api.getFormResult(formId.value);
      if (res.stat == "ok") {
        formList.value = res.data.items;
        visitingForm.value = res.data.info;
      }
    };
    // 表单状态
    const statustext = computed(() => {
      switch (visitingForm.value.status) {
        case 2:
          return "未发布";
        case 3:
          return "正在收集中";
        case 4:
          return "收集结束";
      }
    });
    const formInfo = ref()
    // 上一个表单结果
    const prevFormResult = () => {
      currentFormIndex.value =
        (currentFormIndex.value - 1 + formList.value.length) %
        formList.value.length;
    };
    // 下一个表单结果
    const nextFormResult = () => {
      currentFormIndex.value =
        (currentFormIndex.value + 1) % formList.value.length;
    };

    return {
      dayjs,
      formId,
      visitingForm,
      currentFormIndex,
      statustext,
      formList,
      prevFormResult,
      nextFormResult,
      getFormDeatils,
      formInfo
    };
  },
  created() {
    this.getFormDeatils();
  },
});
</script>

<style scoped>
.formlist-main {
  width: 100%;
  overflow: auto;
}
.formlist-content {
  width: 60%;
  margin: 50px auto;
  background-color: #fff;
  padding: 20px 40px;
}
.statistics-title {
  font-size: 20px;
}
.formindex-choose {
  margin: 20px 0;
}
.icon-arrow-left,
.icon-angle-right-o-thin,
.form-index {
  background-color: rgb(242, 244, 247);
}
.icon-arrow-left {
  margin-right: 10px;
}
.icon-angle-right-o-thin {
  margin-left: 10px;
}
.form-index {
  padding: 0 20px;
  align-items: baseline;
}
.form-main {
  margin-top: 20px;
}
.input-time {
  color: gray;
}

.btn {
  margin: 20px;
}
@media screen and (max-width: 768px) {
    .formlist-content{
      width: 80%;
      margin: 30px auto;
    }
}
@media screen and (max-width: 425px) {
  .formlist-content {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 95%;
    
  }
  .statistics-title{
    font-size: 18px;
  }
  .input-time{
    font-size: 14px;
  }
}
</style>
