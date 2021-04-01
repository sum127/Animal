

<template>
  <div>
    <v-container class="toPatchContainer">
      <div>
        <h1 class="title">님의 게시글</h1>
        <v-text-field
          label="닉네임을 입력하세요"
          v-model="nickname"
          outlined
          dense
        >
        </v-text-field>
        <v-text-field
          label="비밀번호를 입력하세요"
          v-model="password"
          outlined
          dense
        >
        </v-text-field>
      </div>
      <div style="text-align: center">
        <v-btn small color="primary" @click="moveToMain()">목록</v-btn>
        <v-btn small color="primary" @click="del">삭제</v-btn>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss">
.toPatchContainer {
  width: 1000px;
  margin-top: 10px;
  background-color: pink;
}
.field {
  width: 300px;
  margin: 0 auto;
}
.title {
  font-size: 310px;
  text-align: center;
}
</style>

<script>
export default {
  name: "beforedelete",
  props: ["data"],
  data: () => ({
    nickname: "",
    password: "",
  }),

  methods: {
    // 메인 페이지로이동
    moveToMain() {
      this.$router.push("/reviewmain");
    },
    // 삭제전에 개인정보체크 함수
    del() {
      this.$emit("del");
    },
  },
};
</script>