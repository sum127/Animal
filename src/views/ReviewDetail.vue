<template>
  <div style="margin: 50px 0px 150px 0px">
    <v-card elevation="24" max-width="444" class="mx-auto">
      <div style="display: flex">
        <div style="justify-contents: center">
          <v-card-title
            >{{ reviews.nickname }}님의 후기 사진({{
              reviews.files.length
            }})건</v-card-title
          >
        </div>
      </div>
      <v-carousel
        :continuous="false"
        :cycle="cycle"
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
        height="300"
      >
        <v-carousel-item v-for="(pic, i) in reviews.files" :key="i">
          <v-img class="mainPic" :src="pic.dataUrl" alt="pic.dataUrl"></v-img>
          <v-img
            v-if="reviews.files == 0"
            class="mainPic"
            src="https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif"
            alt="이미지없음"
          ></v-img>
          <!-- <v-sheet
          :color="colors[i]"
          height="100%"
          tile
        > -->
          <!-- </v-sheet> -->
        </v-carousel-item>
      </v-carousel>
      <v-list two-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>제목 : {{ reviews.title }}</v-list-item-title>
            <v-list-item-subtitle
              >{{ reviews.nickname }} 님의 후기</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-switch v-model="cycle" label="회전" inset></v-switch>
          </v-list-item-action>
        </v-list-item>

        <v-card-text>{{ reviews.content }}</v-card-text>

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
      </v-list>
    </v-card>
  </div>
</template>





<style lang="scss">
.turn {
  margin: 0 auto;
}
.sidePicture {
  width: 150px;
  height: 150px;
}
</style>

<script>
import api from "../api/review";
export default {
  data: () => ({
    reviews: [],
    cycle: false,
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