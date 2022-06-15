<template>
  <div class="form-question-main">
    <div class="form-question-content">
      <FormInfo :id="Formid"> </FormInfo>
    </div>
    <div class="form-submit-area">
      <el-button type="primary" class="form-submit" @click="goFormWrite"
        >填写表单</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FormInfo from "../components/FormInfo.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "FormQuestion",
  components: {
    FormInfo,
  },
  props: {
    Formid: {
      type: String,
    },
  },
  setup(props, ctx) {
    const router = useRouter();
    const goFormWrite = () => {
      router.push({
        name: "form-write",
        params: { Formid: props.Formid },
      });
    };
    return {
      goFormWrite,
    };
  },
});
</script>

<style scoped>
.form-question-main {
  width: 60%;
  height: 100%;
  /* background-color: #f2f4f7; */
  margin: 0 auto;
}
.form-question-content {
  height: 100%;
  background-color: #fff;
  padding: 48px 120px 90px;
}
.form-submit {
  width: 96px;
}
.form-submit-area {
  display: flex;
  justify-content: center;
}
.form-submit {
  width: 96px;
}
</style>
