<template>
  <div class="formList-main">
    <div class="formlist-content">
      <span class="statistics-title"
        >共收集 {{ formList.length }} 份数据 （{{ statustext }}）</span
      >
      <div class="formindex-choose">
        <i class="iconfont icon-arrow-left" @click="IndexDown"></i>
        第 <span class="form-index"> {{ index + 1 }} </span> 份
        <i class="iconfont icon-angle-right-o-thin" @click="IndexUp"></i>
      </div>
      <hr />
      <div class="form-main">
        <span class="input-time">提交时间：{{ TransformData(time) }}</span>
        <FormInfo
          v-if="formId"
          :id="formId"
          :Findex="index"
          :disableWrite="true"
        ></FormInfo>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { IForm, IFormResult } from "@/types/types";
import FormInfo from "@/components/FormInfo.vue";
import * as api from "@/services/api";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "StatisticalDetails",
  components: {
    FormInfo,
  },
  setup(props, ctx) {
    const route = useRoute();
    const formId = ref(route.query.id as string);
    // form的index
    const index = ref(0);
    const formList = ref([] as IFormResult[]);
    const getFormList = async (formid: string) => {
      const res = await api.getFormResult(formid);
      console.log("@@$$!!", res);
      if (res.stat == "ok") {
        for (const post of res.data.items) {
          formList.value.push(post);
          console.log("@@$$!!", formList.value);
        }
      }
    };

    // 获取form创建时间和form的状态
    const time = ref(0);
    const status = ref(0 as number);
    const statustext = ref("" as string);
    const getForm = async (formid: string) => {
      const res = await api.getForm(formid);
      console.log("@@$$!!", res);
      if (res.stat == "ok") {
        time.value = res.data.item.ctime;
        status.value = res.data.item.status;
        if (status.value == 2) {
          statustext.value = "未发布";
        } else if (status.value == 3) {
          statustext.value = "正在收集中";
        } else if (status.value == 4) {
          statustext.value = "收集结束";
        }
      }
    };

    const IndexDown = () => {
      if (index.value == 0) {
        index.value = formList.value.length - 1;
      } else {
        index.value--;
      }
      console.log("!indexdown");
    };
    const IndexUp = () => {
      console.log(index.value);
      if (index.value == formList.value.length - 1) {
        index.value = 0;
      } else {
        index.value++;
      }
      console.log("!!formindex");
      console.log(index);
    };

    const TransformData = (time: number) => {
      var date = new Date(time);
      var Y = date.getFullYear() + "/";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "/";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    };

    return {
      formId,
      index,
      time,
      statustext,
      formList,
      TransformData,
      IndexDown,
      IndexUp,
      getFormList,
      getForm,
    };
  },
  created() {
    this.getForm(this.formId as string);
    this.getFormList(this.formId as string);
    console.log(this.formId);
  },
});
</script>

<style scoped>
.formlist-main {
  margin: 20px;
  overflow: auto;
}
.formlist-content {
  margin: 50px 100px;
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
</style>
