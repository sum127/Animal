<template>
  <div>
    <v-container>
      <v-card>
        <div style="display: flex">
          <div style="justify-contents: center">
            <v-card-title>{{ reviews.nickname }}님의 후기</v-card-title>
          </div>
        </div>
        <v-divider></v-divider>
        <v-row style="width: 100%">
          <v-col
            v-for="(pic, i) in reviews.files"
            :key="i"
            cols="12"
            sm="6"
            style="margin: 0 auto"
          >
            <v-card>
              <v-img
                class="mainPic"
                :src="pic.dataUrl"
                alt="pic.dataUrl"
              ></v-img>
            </v-card>
          </v-col>
        </v-row>
        <v-img
          v-if="reviews.files == 0"
          class="mainPic"
          src="https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif"
          alt="이미지없음"
        ></v-img>
        <v-divider></v-divider>
        <v-container>
          <v-card-text class="text">{{ reviews.content }}</v-card-text>

          <div style="text-align: center">
            <v-btn
              small
              color="primary"
              style="margin-top: 10px"
              @click="moveToMain()"
              >목록</v-btn
            >
            <v-btn
              small
              color="primary"
              @click="moveToBeforePatch()"
              style="margin-top: 10px"
              >수정</v-btn
            >
            <v-btn
              small
              color="primary"
              @click="beforeDelete()"
              style="margin-top: 10px"
              >삭제</v-btn
            >
          </div>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<style lang="scss">
.reviewTitle {
  margin: 0 auto;
}
.text {
  text-align: center;
  font-size: 30px;
  line-height: 40px;
}
</style>

<script>
import api from "../api/review";
export default {
  data: () => ({
    reviews: [],
  }),
  mounted() {
    // 목록조회 함수 호출
    this.getReviews();
  },
  methods: {
    // 메인페이지이동
    moveToMain() {
      this.$router.push("/");
    },
    // 목록 조회 함수
    async getReviews() {
      const id = this.$route.params.id;
      console.log("메인페이지에서 넘어온 매개변수");
      console.log(id);
      const result = await api.search(id);
      console.log("id로 조회한 결과 콘솔출력");
      console.log(result);
      console.log("id로 조회한 결과의 데이터 콘솔출력");
      console.log(result.data);
      // 조회가 정상적으로 이루어지면
      if (result.status == 200) {
        this.reviews = result.data;
      }
    },
    // 삭제전 인증페이지 이동
    beforeDelete() {
      const id = this.reviews.id;
      const nickname = this.reviews.nickname;
      this.$router.push(`/beforedelete/${id}/${nickname}`);
    },
    moveToBeforePatch() {
      const id = this.reviews.id;
      this.$router.push(`/beforepatch/${id}`);
    },
  },
};
</script>