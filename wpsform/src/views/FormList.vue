<template>
  <el-container class="form-list">
    <!-- 侧边栏 -->
    <el-aside class="form-list-aside" width="15%">
      <div class="form-list-aside-top">
        <router-link to="/app/new-form-create" class="form-create-btn">
          新建表单
        </router-link>
      </div>
      <span class="form-list-title">表单列表</span>
    </el-aside>
    <!-- 主要内容 -->
    <el-main class="form-list-container">
      <!-- 过滤表单中带星 -->
      <div class="form-list-filter">仅展示星标</div>
      <!-- 表单列表 -->
      <el-table
        :data="tableData"
        cell-class-name="form-table-cell"
        @row-click="goFormDetail"
      >
        <el-table-column prop="name" label="表单名称" width="200" />
        <el-table-column
          prop="date"
          label="创建时间"
          width="200"
          align="center"
        />
        <el-table-column prop="state" label="状态" width="200" align="center" />
        <el-table-column prop="star" label=" " width="180" align="center" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <!-- <el-button @click.stop="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              @click.stop="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            > -->
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import * as api from "@/services/api";
import { IUser, IForm, IProblem } from "../types/types";
import { useStore } from "vuex";
import dayjs from "dayjs";

export default defineComponent({
  name: "FormList",
  components: {},
  props: {},
  setup(props, ctx) {
    const store = useStore();
    const router = useRouter();
    // 三个表单状态，草稿，收集中，已结束
    let formState = ref("草稿");
    const userInfo = reactive({} as IUser);
    // 表单列表
    const formList = reactive([] as IForm[]);
    let tableData = [
      {
        date: "2022年6月11日18:00",
        name: "表单1",
        state: "草稿",
        star: "star",
      },
      {
        date: "2022年6月10日19:00",
        name: "表单2",
        state: "收集中",
        star: "nostar",
      },
    ];

    const getFormList = async () => {
      try {
        const res = await api.getFormList();
        if (res.stat == "ok") {
          for (const item of res.data.items) {
            formList.push(item);
          }
          console.log(res.data);
        }
      } catch (err) {
        console.trace(err);
      }
    };

    const getForm = async (id: string) => {
      const res = await api.getForm(id);
      if (res.stat == "ok") {
        console.log(res.data);
      }
    };

    const getUserInfo = async () => {
      const res = await api.getUserInfo();
      if (res.stat == "ok") {
        console.log(res.data.user);
        console.log(dayjs(res.data.user.ctime).format("YYYY-MM-DD HH:mm:ss"));
      }
    };

    //表单填写api测试
    const writeForm = async (formId: string, problems: []) => {
      const res = await api.inputForm(formId, problems);
      if (res.stat == "ok") {
        console.log(res);
      }
    };

    const getProblemType = async () => {
      const res = await api.getBasicProblem();
      if (res.stat == "ok") {
        console.log(res.data.basicProblems[0]);
      }
    };

    //前往表单详情页面
    const goFormDetail = () => {
      // router.push("/app/new-form-result");
      router.push({
        name: "new-form-result",
        params: { Formid: "b7d3eee1-1516-4f54-9ca8-123d72d9f15e" },
      });
    };

    onBeforeMount(() => {
      store.commit("setAppStatus", 1);
      // getProblemType()
      // getForm('1a32c9ef-a809-4838-aec9-22c847de0006')
      // getFormList()
    });
    return {
      formState,
      tableData,
      goFormDetail,
      formList,
    };
  },
});
</script>

<style>
.form-list {
  margin-top: 56px;
}
.form-list-aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-top: 0;
}
.form-list-aside-top {
  padding: 40px;
}

.form-create-btn {
  text-align: center;
  color: black;
  padding: 10px 30px;
  border: 1px solid #ccc;
}

.form-list-title {
  text-align: center;
  border: 1px solid #ccc;
  border-left: 0;
  border-right: 0;
  width: 100%;
  padding: 30px 0;
}
.form-list-container {
  flex: 1;
  margin: 20px;
  margin-bottom: 100px;
  border: 1px solid #ccc;
  padding: 30px;
  position: relative;
}

.form-list-filter {
  position: absolute;
  z-index: 2;
  right: 30px;
  top: 18px;
  color: #ccc;
  font-size: 14px;
  cursor: pointer;
}

.form-table-cell {
  height: 60px;
  cursor: pointer;
}
</style>
