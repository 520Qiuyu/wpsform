<template>
  <el-container class="form-list">
    <!-- 侧边栏 -->
    <el-aside class="form-list-aside" width="250px">
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
      <div
        class="form-list-filter"
        @click="searchParams.isStar = !searchParams.isStar"
      >
        <i class="iconfont icon-star-empty" v-if="!searchParams.isStar"></i>
        <i class="iconfont icon-star-full" v-if="searchParams.isStar"></i>
        <span>仅展示星标</span>
      </div>
      <!-- 表单列表 -->
      <el-table
        :data="formList"
        cell-class-name="form-table-cell"
        @row-click="goFormDetail"
        v-loading="formCollectNumArr.length === 0"
      >
        <!-- 表单名称 -->
        <el-table-column label="表单名称" class-name="formTitle">
          <template #default="scope">
            <span class="form">表单</span>
            {{ scope.row.title }}
          </template>
        </el-table-column>

        <!-- 表单状态 -->
        <el-table-column label="状态" width="180" align="center">
          <template #default="scope">
            <span v-if="scope.row.status == 2">草稿</span>
            <span v-if="scope.row.status == 3">收集中</span>
            <span v-if="scope.row.status == 4">已结束</span>
          </template>
        </el-table-column>
        <!-- 表单是否加星 -->
        <el-table-column label="收藏" width="180" align="center">
          <template #default="scope">
            <i
              class="iconfont icon-star-empty"
              v-show="!scope.row.isStar"
              @click.stop="starForm(scope.row.id)"
            >
            </i>
            <i
              class="iconfont icon-star-full"
              v-show="scope.row.isStar"
              @click.stop="cancelStarForm(scope.row.id)"
            >
            </i>
          </template>
        </el-table-column>
        <!-- 收集的份数 -->
        <el-table-column
          label="收集的份数"
          align="center"
          :formatter="collectFormNumFormatter"
          v-if="formCollectNumArr.length > 0"
          class-name="collect-form-num"
        >
        </el-table-column>
        <!-- 创建时间 -->
        <el-table-column label="创建时间" width="200" align="center">
          <template #default="scope">
            {{ dayjs(scope.row.ctime).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center" width="400">
          <template #default="scope">
            <!-- 草稿状态按钮 -->
            <el-button
              @click.stop="startCollect(scope.row.id)"
              :disabled="scope.row.status == 2 || scope.row.status == 4"
              type="primary"
              icon="Promotion"
              title="发布"
            >
            </el-button>
            <el-button
              @click.stop="editForm(scope.row)"
              icon="edit"
              type="success"
              title="编辑"
            >
            </el-button>
            <!-- 收集中状态按钮 -->
            <el-button
              @click.stop="goSharePage(scope.row.id)"
              :disabled="scope.row.status == 3"
              icon="Share"
              title="分享"
            ></el-button>
            <el-button
              @click.stop="showResult(scope.row.id)"
              :disabled="scope.row.status == 3 || scope.row.status == 4"
              icon="View"
              type="info"
              title="详情"
            ></el-button>
            <el-button
              @click.stop="endCollect(scope.row.id)"
              :disabled="scope.row.status == 3"
              icon="SwitchButton"
              title="停止"
              type="warning"
            ></el-button>
            <el-button
              @click.stop="deleteForm(scope.row.id)"
              icon="close"
              type="danger"
              title="删除"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="paging-container">
        <el-pagination
          :total="formTotal"
          v-model:current-page="searchParams.currentIndex"
          v-model:page-size="searchParams.pageSize"
          :page-sizes="[5, 10, 15, 20]"
          :pager-count="5"
          layout=" sizes, prev, pager, next,total"
          :background="true"
        ></el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onBeforeMount,
  computed,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import * as api from "@/services/api";
import { IUser, IForm, IProblem } from "@/types/types";
import { useStore } from "vuex";
import dayjs from "dayjs";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "FormList",
  components: {},
  props: {},
  emits: ["showFormTitle"],
  setup(props, ctx) {
    const store = useStore();
    const router = useRouter();
    // 表单列表
    const formList = computed<IForm[]>(() => store.state.form.formList);
    // 表单总数
    const formTotal = computed<Number>(() => store.state.form.formTotal);
    // table索引方法
    const indexMethod = (index: number) => {
      return (
        index + (searchParams.currentIndex - 1) * searchParams.pageSize + 1
      );
    };
    // 搜索参数
    const searchParams = reactive({
      currentIndex: 1,
      pageSize: 10,
      isStar: false,
    });
    // 获取表单列表
    const getFormList = async () => {
      store.dispatch("form/getFormList", {
        offset: searchParams.currentIndex - 1,
        limit: searchParams.pageSize,
        isStar: searchParams.isStar || undefined,
      });
    };
    // 监视搜索参数，一旦变化，便根据其变化来请求表单数据
    watch(
      searchParams,
      () => {
        getFormList();
      },
      { immediate: true }
    );
    //前往表单详情页面
    const goFormDetail = async (row: any) => {
      //修改app上方logo位置为表单标题
      ctx.emit("showFormTitle", row.title);
      //跳转到表单详情页面
      router.push({
        name: "form-question",
        query: {
          id: row.id,
        },
      });
    };
    // 表单加星
    const starForm = async (id: string) => {
      const res = await api.starForm(id);
      if (res.stat === "ok") {
        ElMessage.success("加星成功");
        getFormList();
      }
    };
    // 表单取消加星
    const cancelStarForm = async (id: string) => {
      const res = await api.cancelStarForm(id);
      if (res.stat === "ok") {
        ElMessage.success("取消加星成功");
        getFormList();
      }
    };
    // 发布按钮，开始收集表单
    const startCollect = async (id: string) => {
      const res = await api.startCollect(id);
      if (res.stat === "ok") {
        ElMessage.success("开始收集");
        getFormList();
      }
    };
    // 获取表单正在收集的数目
    const formCollectNumArr = computed<{ id: string; num: number }[]>(
      () => store.state.form.collectFormNum
    );
    const collectFormNumFormatter = (row: IForm) => {
      // 第一次数据未加载出来
      if (formCollectNumArr.value.length === 0) return "";
      if (row.status === 3 || row.status === 4) {
        // 数据还未更新完成，第二次未加载出来
        if (
          formCollectNumArr.value.filter((item) => item.id === row.id)[0] ==
          undefined
        ) {
          return ""
        }
        const num = formCollectNumArr.value.filter(
          (item) => item.id === row.id
        )[0].num;
        if (row.status === 3) return "正在收集中 " + num + " 份";
        return "已收集 " + num + " 份";
      }
      return "未开始收集";
    };
    // 停止按钮，结束收集表单
    const endCollect = async (id: string) => {
      const res = await api.endCollect(id);
      if (res.stat === "ok") {
        ElMessage.success("结束收集");
        getFormList();
      }
    };
    //分享按钮
    const goSharePage = (id: string) => {
      router.push({
        name: "share",
        query: {
          id,
        },
      });
    };
    //查看结果按钮，数据详情页面
    const showResult = async (id: string) => {
      router.push({
        name: "statistical-details",
        query: {
          id,
        },
      });
    };
    //编辑按钮，编辑表单
    const editForm = (form: IForm) => {
      store.commit("form/addQuesListToQuesList", form.problems);
      store.commit("form/setFormTitle", form.title);
      store.commit("form/setFormSubTitle", form.subTitle);
      router.push("/app/new-form-create");
    };
    //删除按钮，删除表单
    const deleteForm = async (id: string) => {
      const res = await api.deleteForm(id);
      if (res.stat === "ok") {
        ElMessage.success("删除成功");
        getFormList();
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
    return {
      store,
      dayjs,
      goFormDetail,
      indexMethod,
      searchParams,
      getFormList,
      formList,
      formTotal,
      formCollectNumArr,
      collectFormNumFormatter,
      createForm,
      starForm,
      cancelStarForm,
      startCollect,
      endCollect,
      goSharePage,
      showResult,
      editForm,
      deleteForm,
    };
  },
});
</script>

<style scoped>
.form-list {
  padding-top: 56px;
  height: 100vh;
}
.form-list-aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-top: 0;
}
.form-list-aside-top {
  padding: 40px 0;
}

.form-create-btn {
  width: 150px;
  padding: 20px;
  background: #1488ed;
  color: #fff;
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
  padding: 40px 30px;
  position: relative;
}

.form-list-filter {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #ccc;
  font-size: 14px;
  cursor: pointer;
}
.form-list-filter:hover {
  color: #1488ed;
}
.form-list-filter span {
  margin-left: 5px;
}

.form-list >>> td.formTitle .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 12px;
  font-size: 12px;
  max-width: 200px;
  color: #3d4757;
}
.form-table-cell {
  font-size: 12px;
  height: 60px;
  cursor: pointer;
}
span.form {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: inline-block;
  padding: 2px 6px;
  text-align: center;
  line-height: 12px;
  font-size: 12px;
  color: #767c85;
  margin-right: 4px;
  position: relative;
}
.form-list >>> td.collect-form-num .cell {
  padding: 10px;
  color: #1488ed;
  font-size: 12px;
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
