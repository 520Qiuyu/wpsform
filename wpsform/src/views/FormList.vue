<template>
  <el-container class="form-list">
    <!-- 侧边栏 -->
    <el-aside class="form-list-aside" width="15%">
      <div class="form-list-aside-top">
        <el-button @click="createForm" class="form-create-btn"
          >新建表单</el-button
        >
      </div>
      <span class="form-list-title">表单列表</span>
    </el-aside>
    <!-- 主要内容 -->
    <el-main class="form-list-container">
      <!-- 过滤表单中带星 -->
      <div class="form-list-filter" @click="filterStar">
        <i class="iconfont icon-star-empty" v-if="!starFlag"></i>
        <i class="iconfont icon-star-full" v-if="starFlag"></i>
        <span>仅展示星标</span>
      </div>
      <!-- 表单列表 -->
      <el-table
        :data="formList.slice(currentIndex, currentIndex + 4)"
        cell-class-name="form-table-cell"
        @row-click="goFormDetail"
      >
        <el-table-column prop="title" label="表单名称" width="200" />
        <el-table-column label="创建时间" width="200" align="center">
          <template #default="scope">
            {{ dayjs(scope.row.ctime).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="200" align="center">
          <template #default="scope">
            <span v-if="scope.row.status == 2">草稿</span>
            <span v-if="scope.row.status == 3">收集中</span>
            <span v-if="scope.row.status == 4">已结束</span>
          </template> </el-table-column
        >>
        <el-table-column label=" " width="180" align="center">
          <template #default="scope">
            <i
              class="iconfont icon-star-empty"
              v-if="!scope.row.isStar"
              @click.stop="starForm(scope.row.id)"
            >
            </i>
            <i
              class="iconfont icon-star-full"
              v-if="scope.row.isStar"
              @click.stop="cancelStarForm(scope.row.id)"
            >
            </i>
          </template> </el-table-column
        >>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <!-- 草稿状态按钮 -->
            <el-button
              @click.stop="startCollect(scope.row.id)"
              v-if="scope.row.status == 2"
              >发布</el-button
            >
            <el-button @click.stop="editForm" v-if="scope.row.status == 2"
              >编辑</el-button
            >
            <!-- 收集中状态按钮 -->
            <el-button
              @click.stop="goSharePage(scope.row.id)"
              v-if="scope.row.status == 3"
              >分享</el-button
            >
            <el-button
              @click.stop="showResult(scope.row.id)"
              v-if="scope.row.status == 3 || scope.row.status == 4"
              >查看结果</el-button
            >
            <el-button
              @click.stop="endCollect(scope.row.id)"
              v-if="scope.row.status == 3"
              >停止</el-button
            >
            <el-button @click.stop="deleteForm(scope.row.id)">删除</el-button>
            <el-button
              @click.stop="writeForm(scope.row.id)"
              v-if="scope.row.status == 3"
              >表单填写(测试用)</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="paging-container">
        <el-button class="prebious" @click="goPrevious">上一页</el-button>
        <div class="count">
          {{ formList.length == 0 ? 0 : Math.floor(currentIndex / 4) + 1 }}/{{
            Math.ceil(formList.length / 4)
          }}
        </div>
        <el-button class="next" @click="goNext">下一页</el-button>
      </div>
      <el-button @click="createFormTest">新建表单(测试用)</el-button>
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
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "FormList",
  components: {},
  props: {},
  setup(props, ctx) {
    const store = useStore();
    const router = useRouter();
    // 表单列表
    let formList = reactive([] as IForm[]);
    // 记录表单分页时的索引
    const currentIndex = ref(0);

    const getFormList = async (
      offset?: number,
      limit?: number,
      isStar?: boolean
    ) => {
      try {
        const res = await api.getFormList(offset, limit, isStar);
        if (res.stat == "ok") {
          formList.splice(0, formList.length);
          for (const item of res.data.items) {
            formList.push(item);
          }
          // console.log(res.data);
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

    //前往表单详情页面
    const goFormDetail = (row: any) => {
      // console.log(row);
      router.push({
        name: "statistical-details",
        params: {
          id: row.id,
        },
      });
    };

    // 发布按钮，开始收集表单
    const startCollect = async (id: string) => {
      const res = await api.startCollect(id);
      getFormList();
    };

    // 停止按钮，结束收集表单
    const endCollect = async (id: string) => {
      const res = await api.endCollect(id);
      getFormList();
    };

    // 表单标星
    const starForm = async (id: string) => {
      const res = await api.starForm(id);
      getFormList();
    };
    // 表单取消标星
    const cancelStarForm = async (id: string) => {
      const res = await api.cancelStarForm(id);
      getFormList();
    };

    //分享按钮
    const goSharePage = (id: string) => {
      router.push({
        name: "share",
        params: {
          id,
        },
      });
    };

    //查看结果按钮，数据详情页面
    const showResult = async (id: string) => {
      const res = await api.getFormResult(id);
      if (res.stat == "ok") {
        console.log(res);
      }
      // const res1 = await api.getDetail('df07ef6b-db2c-495d-912f-9cdb59337ee5')
      // if(res1.stat == 'ok') {
      //   console.log(res1.data.item);
      // }
      // formList.forEach(form => {
      //   if(form.id == id) {
      //     console.log(form);
      //   }
      // });
      // router.push('/app/new-form-result/'+id)
    };

    //编辑按钮，编辑表单
    const editForm = () => {
      router.push("/app/new-form-create");
    };

    //删除按钮，删除表单
    const deleteForm = async (id: string) => {
      const res = await api.deleteForm(id);
      getFormList();
    };

    //下一页
    const goNext = () => {
      if (currentIndex.value + 4 < formList.length) {
        currentIndex.value += 4;
      }
    };
    //上一页
    const goPrevious = () => {
      if (currentIndex.value > 0) {
        currentIndex.value -= 4;
      }
    };

    //记录仅显示星标的状态，开始为false
    const starFlag = ref(false);
    const filterStar = () => {
      if (starFlag.value) {
        getFormList();
        starFlag.value = false;
      } else {
        getFormList(undefined, undefined, true);
        starFlag.value = true;
      }
    };

    //新建表单
    const createForm = async () => {
      if (store.state.user.loginState) {
        router.push("/app/new-form-create");
      } else {
        ElMessage.error("请先登录！");
      }
    };
    //新建表单测试
    const createFormTest = async () => {
      const res = await api.createForm("表单4", "表单3副标题", [
        {
          title: "问题1",
          type: "multiSelect",
          required: true,
          isNew: true,
          setting: {
            options: [
              {
                title: "选项A",
                status: 1,
              },
              {
                title: "选项B",
                status: 1,
              },
              {
                title: "选项C",
                status: 1,
              },
              {
                title: "选项D",
                status: 1,
              },
            ],
          },
        },
      ]);
      getFormList();
    };

    //表单填写测试
    const writeForm = (id: string) => {
      router.push("/form-write/" + id);
    };

    onBeforeMount(() => {
      store.commit("user/setAppStatus", 1);
      // getForm('1a32c9ef-a809-4838-aec9-22c847de0006')
      getFormList();
    });
    return {
      dayjs,
      goFormDetail,
      formList,
      starForm,
      cancelStarForm,
      createForm,
      startCollect,
      endCollect,
      goSharePage,
      showResult,
      editForm,
      deleteForm,
      currentIndex,
      goNext,
      goPrevious,
      filterStar,
      starFlag,
      createFormTest,
      writeForm,
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
  width: 120px;
  padding: 20px;
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
  display: flex;
  align-items: center;
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

.paging-container {
  display: flex;
  justify-content: right;
  margin-top: 20px;
  margin-right: 30px;
  cursor: pointer;
}
.count {
  margin: 0 15px;
}

.icon-star-empty,
.icon-star-full {
  font-size: 24px;
}
.icon-star-full {
  color: #f8d61d;
}
</style>
