<template>
  <div class="formlist-content">
    <span class="statistics-title"
      >共收集 {{ formList.length }} 份数据 （正在收集）</span
    >
    <div class="formindex-choose">
      <i class="iconfont icon-arrow-left" @click="IndexDown"></i>
      第 <span class="form-index"> {{ index + 1 }} </span> 份
      <i class="iconfont icon-angle-right-o-thin" @click="IndexUp"></i>
    </div>
    <hr />
    <div class="form-main">
      <span class="input-time"
        >提交时间：{{ TransformData(forms[index]?.ctime) }}</span
      >
      <form-info v-if="forms[index]?.id" :id="forms[index]?.id"></form-info>
    </div>

    <button @click="inputt">向db添加信息</button>
    <div>formId：=== {{ forms[index]?.id }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from "vue";
import { IForm, IProblem } from "../types/types";
import FormInfo from "../components/FormInfo.vue";
import * as api from "../services/api";
import { toRaw } from "@vue/reactivity";
export default defineComponent({
  name: "StatisticalDetails",
  components: {
    FormInfo,
  },
  props: {
    Formid: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const problem: IProblem = reactive({
      title: "input",
      type: "input",
      required: false,
      isNew: true,
      setting: {
        options: [
          {
            title: "123456",
            status: 1,
          },
        ],
      },
    });
    const problem2: IProblem = reactive({
      title: "singleSelect",
      type: "singleSelect",
      required: false,
      isNew: true,
      setting: {
        options: [
          {
            title: "singleSelect",
            status: 1,
          },
        ],
      },
    });
    const problem3: IProblem = reactive({
      title: "multiSelect",
      type: "multiSelect",
      required: false,
      isNew: true,
      setting: {
        options: [
          {
            title: "multiSelect",
            status: 1,
          },
        ],
      },
    });
    const problem4: IProblem = reactive({
      title: "pullSelect",
      type: "pullSelect",
      required: false,
      isNew: true,
      setting: {
        options: [
          {
            title: "multiSelect",
            status: 1,
          },
        ],
      },
    });
    const problem5: IProblem = reactive({
      title: "date",
      type: "date",
      required: false,
      isNew: true,
      setting: {
        options: [
          {
            title: "date",
            status: 1,
          },
        ],
      },
    });
    const problem6: IProblem = reactive({
      title: "time",
      type: "time",
      required: false,
      isNew: true,
      setting: {
        options: [
          {
            title: "time",
            status: 1,
          },
        ],
      },
    });
    const problem7: IProblem = reactive({
      title: "score",
      type: "score",
      required: false,
      isNew: true,
      setting: {
        options: [
          {
            title: "score",
            status: 1,
          },
        ],
      },
    });
    const problems = reactive([] as IProblem[]);
    problems.push(problem);
    problems.push(problem2);
    problems.push(problem3);
    problems.push(problem4);
    problems.push(problem5);
    problems.push(problem6);
    problems.push(problem7);
    const inputt = async () => {
      // const res = await api.createForm("ssssss", "00000", problems);
    };
    // form的index
    const index = ref(0);
    // 中间参数
    const indexx = ref(0);
    const formList = ref([] as IForm[]);
    const getFormList = async () => {
      const res = await api.getFormList();
      for (const post of res.data.items) {
        formList.value.push(post);
        if (post.id == props.Formid) {
          index.value = indexx.value;
        }
        indexx.value++;
      }
    };
    const forms = toRaw(formList);
    // 监听formid，向父组件抛出事件ChangeId，让父组件改变formid，再props传过来
    watch(
      () => formList.value[index.value]?.id,
      (val, Oldval) => {
        emit("ChangeId", val);
      }
    );

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
      inputt,
      index,
      forms,
      formList,
      TransformData,
      IndexDown,
      IndexUp,
      getFormList,
    };
  },
  created() {
    this.getFormList();
    console.log(this.Formid);
  },
});
</script>

<style scoped>
.formlist-content {
  margin: 100px;
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
