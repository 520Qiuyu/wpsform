<template>
  <div class="newform-create-wrapper">
    <div class="newform-create">
      <!-- 左侧列表问题背板 -->
      <div class="question-panel">
        <div class="question-formwork-wrapper">
          <!-- 添加题目 -->
          <div class="optionTitle">
            添加题目
            <ul class="add-question">
              <li
                v-for="(type, index) in quesTypes"
                :key="type.type + index"
                class="question-type-item"
              >
                <a @click="addQuesToQuesList(type.type)">{{ type.title }}</a>
              </li>
            </ul>
          </div>
          <!-- 题目模板 -->
          <div class="optionTitle">
            题目模板
            <ul class="question-formwork">
              <li
                v-for="(formwork, index) in questionFormworks"
                :key="index"
                class="question-formwork-item"
                @click="addTemplateToQuesList(formwork)"
              >
                <a>{{ formwork.title }}</a>
              </li>
            </ul>
          </div>
          <!-- 我的常用题 -->
          <div class="optionTitle">
            <div class="manage-common-use">
              <a @click="manageCommonStar">管理</a>
            </div>
            我的常用题
            <ul class="my-common-use">
              <li
                v-for="(ques, index) in myCommonUse"
                :key="ques.id"
                :class="
                  myCommonUseManage
                    ? 'my-common-use-item'
                    : 'my-common-use-item my-common-use-item-no-manage'
                "
              >
                <el-icon
                  v-if="myCommonUseManage"
                  class="delCommonUse"
                  :size="15"
                  color="#1488ED"
                  @click="delThisCommomUse(ques.id)"
                  ><CircleCloseFilled
                /></el-icon>
                <a @click="addTemplateToQuesList(ques)">{{ ques.title }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 中间问题列表 -->
      <div class="please-add-ques" v-show="!questionList.length">
        <span>请添加题目</span>
      </div>
      <div class="question-list" v-show="questionList.length">
        <div class="formTitle">
          <h1 v-show="currentPoint !== 0" @click="currentPointHere(0, $event)">
            {{ formTitle ? formTitle : "请输入表单标题" }}
          </h1>
          <input
            v-show="currentPoint === 0"
            ref="formTitleEle"
            v-model.lazy="formTitle"
            placeholder="Enter Here"
          />
        </div>
        <div class="formSubTitle">
          <h2 v-show="currentPoint !== 1" @click="currentPointHere(1, $event)">
            {{ formSubTitle ? formSubTitle : "点击设置描述" }}
          </h2>
          <input
            v-show="currentPoint === 1"
            ref="formSubTitleEle"
            v-model.lazy="formSubTitle"
            placeholder="Enter Here"
          />
        </div>
        <MyQuestion
          v-for="(ques, index) in questionList"
          :key="ques.id"
          :ques="ques"
          :index="index"
          @addQuesToQuesList="addQuesToQuesList"
          @click="currentPointHere(index + 2, $event)"
          :selectedIndex="currentPoint - 2"
        ></MyQuestion>
        <div class="end-line">
          <div class="bottom-line"></div>
          <div class="end">End</div>
          <div class="bottom-line"></div>
        </div>
      </div>
      <!-- 右侧其他配置 -->
      <div class="other-option">
        <div class="preview-clear">
          <button class="preview" @click="toPreview">预览表单</button>
          <button class="clear-form-btn" @click="clearFormList">
            清空表单
          </button>
        </div>
        <div class="use-save-draft">
          <button class="use-draft" @click="useDraft">继续上次</button>
          <button class="save-draft" @click="saveDraft">保存草稿</button>
        </div>
        <div class="complate-creat">
          <button class="finished" @click="submitForm">完成创建</button>
        </div>
      </div>
      <div class="mobile-options">
        <el-carousel arrow="never" :autoplay="false" >
          <el-carousel-item>
            <!-- 移动端添加问题列表 -->
            <div class="question-formwork-mobile-wrapper">
              <!-- 添加题目 -->
              <div class="optionTitle">
                添加题目
                <ul class="add-question">
                  <li
                    v-for="(type, index) in quesTypes"
                    :key="type.type + index"
                    class="question-type-item"
                  >
                    <a @click="addQuesToQuesList(type.type)">{{
                      type.title
                    }}</a>
                  </li>
                </ul>
              </div>
              <!-- 题目模板 -->
              <div class="optionTitle">
                题目模板
                <ul class="question-formwork">
                  <li
                    v-for="(formwork, index) in questionFormworks"
                    :key="index"
                    class="question-formwork-item"
                    @click="addTemplateToQuesList(formwork)"
                  >
                    <a>{{ formwork.title }}</a>
                  </li>
                </ul>
              </div>
              <!-- 我的常用题 -->
              <div class="optionTitle">
                <div class="manage-common-use">
                  <a @click="manageCommonStar">管理</a>
                </div>
                我的常用题
                <ul class="my-common-use">
                  <li
                    v-for="(ques, index) in myCommonUse"
                    :key="ques.id"
                    :class="
                      myCommonUseManage
                        ? 'my-common-use-item'
                        : 'my-common-use-item my-common-use-item-no-manage'
                    "
                  >
                    <el-icon
                      v-if="myCommonUseManage"
                      class="delCommonUse"
                      :size="15"
                      color="#1488ED"
                      @click="delThisCommomUse(ques.id)"
                      ><CircleCloseFilled
                    /></el-icon>
                    <a @click="addTemplateToQuesList(ques)">{{ ques.title }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <!-- 移动端创建完成菜单 -->
            <div class="other-mobile-option">
              <div class="operate-form">
                <button class="preview" @click="toPreview">预览表单</button>
                <button class="clear-form-btn" @click="clearFormList">
                  清空表单
                </button>
                <button class="use-draft" @click="useDraft">继续上次</button>
                <button class="save-draft" @click="saveDraft">保存草稿</button>
              </div>
              <div class="complate-creat">
                <button class="finished" @click="submitForm">完成创建</button>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import { ElMessage } from "element-plus";
import MyQuestion from "@/components/MyQuestion/index.vue";
import { formDraft, IProblem } from "@/types/types";
import {
  createForm,
  getBasicQuestionTypes,
  getQuestionTypes,
  startCollect,
} from "@/services/api";
export default defineComponent({
  name: "NewformCreate",
  components: { MyQuestion },
  setup(props, ctx) {
    const Store = useStore();
    const Router = useRouter();
    const currentPoint = ref(-1);
    const formTitleEle = ref();
    const formSubTitleEle = ref();
    // 点击某个题目就使该题目获得焦点
    const currentPointHere = async (n: number, event: MouseEvent) => {
      currentPoint.value = n;
      await nextTick();
      if (n == 0) {
        formTitleEle.value.focus();
      } else if (n == 1) {
        formSubTitleEle.value.focus();
      } else {
        const target = event.target as HTMLElement;
        target.focus();
      }
    };
    // 可添加的题目类型
    const quesTypes = computed(() => Store.state.problem.quesTypes);
    // 题目模板
    const questionFormworks = computed(
      () => Store.state.problem.questionFormworks
    );
    // 我的常用题
    const myCommonUse = computed(() => Store.state.problem.commonUseQues);
    // 表单标题
    console.log("Store.state.form.formTitle", Store.state.form.formTitle);
    const formTitle = computed({
      get: () => Store.state.form.formTitle,
      set: (newVal) => Store.commit("form/setFormTitle", newVal),
    });

    const formSubTitle = computed({
      get: () => Store.state.form.formSubTitle,
      set: (newVal) => Store.commit("form/setFormSubTitle", newVal),
    });
    // 中间题目列表
    const questionList = computed<IProblem[]>(
      () => Store.state.form.questionList
    );
    // 向中间添加一个题目
    const addQuesToQuesList = (type: string) => {
      Store.commit("form/addQuesToQuesList", { problem: { type }, index: -1 });
    };
    // 向中间添加一个模板题目
    const addTemplateToQuesList = (problem: IProblem) => {
      Store.commit("form/addQuesToQuesList", { problem: problem, index: -1 });
    };
    // 判断表单是否完成
    const isCompleted = () => {
      if (questionList.value.length === 0)
        return ElMessage({
          message: "请先创建表单",
          type: "warning",
        });
      // 判断表单标题是否完成
      if (!formTitle.value)
        return ElMessage({
          message: "请先填写表单标题",
          type: "warning",
        });
      // 判断表单描述
      else if (!formSubTitle.value)
        return ElMessage({
          message: "请先填写表单描述",
          type: "warning",
        });
      else {
        let i = 0;
        for (const ques of Store.state.form.questionList) {
          i++;
          // 判断问题题目
          if (!ques.title) {
            return ElMessage({
              message: `请填写第${i}个题目的问题`,
              type: "warning",
            });
          }
          // 判断问题项目
          else if (ques.setting) {
            for (const option of ques.setting.options) {
              if (!option.title) {
                return ElMessage({
                  message: `请填写第${i}个题目的问题的选项`,
                  type: "warning",
                });
              }
            }
          }
        }
      }
      return true;
    };
    // 跳转至预览
    const toPreview = () => {
      if (isCompleted() === true) {
        Router.push({
          name: "form-preview",
        });
      }
    };
    // 清空表单
    const clearFormList = () => {
      Store.commit("form/clearFormList");
      ElMessage({
        message: "清空表单成功",
        type: "success",
        center: true,
      });
    };
    // 使用草稿
    const useDraft = () => {
      ElMessage({
        message: "正在读取，请稍等",
        type: "success",
        center: true,
      });
      if (!localStorage.getItem("formDraft"))
        return ElMessage({
          message: "未找到草稿",
          type: "warning",
          center: true,
        });

      Store.commit("form/useDraft");
    };
    // 保存草稿
    const saveDraft = async () => {
      // 已完成表单
      if (isCompleted() === true) {
        try {
          const res = await createForm(
            formTitle.value,
            formSubTitle.value,
            questionList.value
          );
          // 创建成功
          if (res.data.stat === "ok") {
            ElMessage({
              message: "保存草稿成功",
              type: "success",
              center: true,
            });
            // 提交到vuex
            Store.commit("form/setFormDraft");
          }
        } catch (e: any) {
          ElMessage({
            message: e.message,
            type: "error",
            center: true,
          });
        }
      }
    };
    // 创建表单
    const submitForm = async () => {
      // 已完成表单
      if (isCompleted() === true) {
        try {
          const res = await createForm(
            formTitle.value,
            formSubTitle.value,
            questionList.value
          );
          // 创建成功
          if (res.data.stat === "ok") {
            ElMessage({
              message: "创建成功",
              type: "success",
              center: true,
            });
            // 开始收集
            startCollect(res.data.data.id);
            // 跳转至分享页面
            Router.push({
              name: "share",
              query: {
                id: res.data.data.id,
              },
            });
          }
        } catch (e: any) {
          ElMessage({
            message: e.message,
            type: "error",
            center: true,
          });
        }
      }
    };
    // 获取左边的题目类型
    const getQuesTypes = async () => {
      const res = await getQuestionTypes();
      Store.commit("problem/setQuesTypes", res.data.data.problemTypes);
    };
    // 获取左边的模板题目
    const getBasicQuesTypes = async () => {
      const res = await getBasicQuestionTypes();
      Store.commit(
        "problem/setBasicQuesFormworks",
        res.data.data.basicProblems
      );
    };
    // 获取左边的收藏题目
    const getStarQues = async () => {
      const res = await axios({
        method: "POST",
        url: "/api/problem/listStar",
      });
      if (res.data.stat === "ok") {
        Store.commit(
          "problem/addAllToCommonUse",
          res.data.data.items.map((item: any) =>
            Object.assign(item.problem, { id: item.id })
          )
        );
      }
    };
    const myCommonUseManage = ref(false);
    // 我的常用管理
    const manageCommonStar = () => {
      myCommonUseManage.value = !myCommonUseManage.value;
    };
    // 删除常用
    const delThisCommomUse = async (id: string) => {
      const res = await axios({
        method: "POST",
        url: "/api/problem/cancelStar",
        data: {
          id: id,
        },
      });
      if (res.data.stat === "ok") {
        Store.commit("problem/delCommonUse", id);
      }
    };
    return {
      Store,
      currentPoint,
      formTitleEle,
      formSubTitleEle,
      currentPointHere,
      quesTypes,
      questionFormworks,
      myCommonUse,
      formTitle,
      formSubTitle,
      questionList,
      addQuesToQuesList,
      addTemplateToQuesList,
      toPreview,
      clearFormList,
      useDraft,
      saveDraft,
      submitForm,
      getQuesTypes,
      getBasicQuesTypes,
      getStarQues,
      myCommonUseManage,
      manageCommonStar,
      delThisCommomUse,
    };
  },

  created() {
    this.getQuesTypes();
    this.getBasicQuesTypes();
    this.getStarQues();
    this.Store.commit("user/setAppStatus", 2);
  },
});
</script>


<style scoped>
.newform-create-wrapper {
  min-height: 100vh;
  overflow-y: auto;
  background-color: #f2f4f7;
  padding: 86px 50px 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}
.newform-create {
  display: flex;
  justify-content: space-between;
}
.question-panel,
.other-option,
.question-list,
.please-add-ques {
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #e7e9eb;
  color: #3d4757;
  overflow-y: auto;
  margin: 10px;
}
.question-panel,
.other-option {
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.question-panel {
  height: 400px;
  padding: 24px 16px;
  max-height: calc(100vh - 210px);
}
.question-formwork-wrapper {
  display: flex;
  flex-direction: column;
}
.optionTitle {
  width: 100%;
  font-size: 14px;
  color: #3d4757;
  font-weight: 600;
  margin-bottom: 30px;
  position: relative;
}
.optionTitle:last-child {
  margin-bottom: 0;
}
.manage-common-use {
  position: absolute;
  top: 0;
  right: 0;
}
.manage-common-use a {
  color: #1488ed;
  font-size: 13px;
  cursor: pointer;
}
.add-question,
.question-formwork,
.my-common-use {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 10px;
}
.question-type-item,
.question-formwork-item,
.my-common-use-item {
  width: 80px;
  border: 1px solid #e7e9eb;
  text-align: center;
  display: flex;
  justify-content: center;
  transition: all 0.2s;
  cursor: pointer;
  position: relative;
}
.delCommonUse {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}
.delCommonUse:hover {
  transform: translate(50%, -50%) scale(1.3);
  transition: all 0.2s;
  pointer-events: visiblePainted;
}
.question-type-item:hover,
.question-formwork-item:hover,
.my-common-use-item-no-manage:hover {
  border: 1px solid #1488ed;
}
.question-type-item a,
.question-formwork-item a,
.my-common-use-item a {
  line-height: 25px;
  flex: 1;
  display: inline-block;
  width: 100%;
  font-size: 12px;
  font-weight: 500;
}
.question-list,
.please-add-ques {
  width: 670px;
  padding: 50px 56px;
  max-height: calc(100vh - 136px);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.question-list >>> .el-input {
  --el-input-hover-border: none;
  --el-input-border: none;
  --el-input-focus-border: none;
  --el-input-hover-border-color: transparent;
}
.question-list >>> .el-input__wrapper {
  box-shadow: none;
}

.date-type >>> .el-input .el-input__wrapper,
.time-type >>> .el-input .el-input__wrapper {
  background-color: #fff;
  box-shadow: none;
}
.please-add-ques {
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: 500;
  opacity: 0.5;
}

.formTitle,
.formSubTitle {
  width: 100%;
  text-align: center;
  color: #3d4757;
}
.formTitle h1,
.formSubTitle h2 {
  width: 300px;
  margin: 0 auto;
  line-height: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
}
.formTitle input {
  outline: none;
  text-align: center;
  width: 100%;
  height: 30px;
  font-size: 20px;
  font-weight: 700;
  line-height: 2;
  border: none;
}
.formSubTitle input {
  text-align: center;
  width: 100%;
  height: 30px;
  border: none;
  border-bottom: 1px solid #e7eaee;
  outline: none;
}
.formSubTitle {
  margin: 20px 0 0;
  padding: 12px 20px;
}
.formSubTitle h2 {
  color: #aeb5c0;
  font-size: 15px;
  font-weight: 400;
}
.end-line {
  margin: 40px 0 0;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.end {
  color: #767c85;
  font-size: 15px;
}
.bottom-line {
  width: 40%;
  height: 0;
  border: 1px dashed #e7e9eb;
}
.other-option {
  display: flex;
  align-items: center;
  padding: 20px 20px;
  background-color: transparent;
  border: none;
}
.other-option div {
  width: 100%;
  margin-bottom: 20px;
  height: 32px;
  display: flex;
}
.preview-clear,
.use-save-draft {
  justify-content: space-between;
}
.preview-clear button,
.use-save-draft button {
  color: #3d4757;
  background-color: #fff;
  flex: 1;
  border: 1px solid #e7e9eb;
  border-radius: 2px;
}
.preview,
.use-draft {
  margin-right: 10px;
}
.complate-creat {
  justify-content: center;
}
.finished {
  color: #fff;
  background-color: #1488ed;
  flex: 1;
  border: 1px solid #e7e9eb;
  border-radius: 2px;
}

.mobile-options {
  display: none;
}

@media screen and (max-width: 426px) {
  .question-panel,
  .other-option {
    display: none;
  }
  .newform-create-wrapper {
    min-width: auto;
    min-height: auto;
    height: 100vh;
    padding: 66px 10px 10px;
  }
  .newform-create {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .mobile-options {
    display: block;
    width: 100%;
  }
  .mobile-options >>> .el-carousel__button {
    background-color: #1488ed;
  }
  .question-formwork-mobile-wrapper {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 20px;
    background-color: #fff;
    height: 320px;
    overflow-y: scroll;
  }
  /* .optionTitle {
    width: 50%;
  }
  .optionTitle:last-child {
    width: 100%;
  } */
  .question-formwork-mobile-wrapper > div.optionTitle {
    margin-bottom: 14px;
  }

  .please-add-ques,
  .question-list {
    padding: 30px 10px;
    width: 100%;
    flex: 1 0;
    min-height: 200px;
  }
  .question {
    width: 100%;
  }
  .other-mobile-option {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .add-question,
  .question-formwork,
  .my-common-use {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 10px;
  }
  .operate-form {
    width: 230px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 60px;
    gap: 16px;
  }
  .operate-form button {
    border: 1px solid #e7e9eb;
    background-color: #fff;
  }
  .complate-creat {
    margin-top: 30px;
  }
  .finished {
    width: 230px;
    height: 60px;
  }
}
</style>
