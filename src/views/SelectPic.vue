<template>
  <v-container>
    <div>
      <ul>
        <li><v-text-field label="무언가입력하시오"> </v-text-field></li>
      </ul>
    </div>
    <v-card class="getInfo">
      <v-row>
        <v-col cols="6">
          <v-card> dfdsfs</v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <h1>이름</h1>
            <v-divider></v-divider>
            <h2>나이</h2>
            <h2>성별</h2>
            <h2>견종</h2>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style lang="scss">
@import "../reset.css";
ul {
  width: 800px;
  margin: 0 auto;
}
.getInfo {
  width: 800px;
  margin: 0 auto;
  height: 400px;
}
</style>

<script>
export default {
  data: () => ({
    // 전체내용을 한단위로 묶어서 배열로넣을곳
    reviews: [],
    // 입력하여 검색할 값을 저장할곳
    value: "",
  }),
  mounted() {
    this.getReviews();
  },
  methods: {
    // (글쓰기) 클릭시
    moveToWriteForm() {
      this.$router.push("/writeform");
    },
    // 메인페이지 이동
    moveToMain() {
      this.$router.push("/reviewmain");
    },
  },
};
</script>