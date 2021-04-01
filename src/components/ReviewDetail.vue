<template>
  <div>
    <v-container>
      <div class="reviewTitle">
        <h1>{{ reviews.nickname }}님의 후기</h1>
      </div>
      <div class="picturePlace">
        <v-row style="width: 100%">
          <v-col v-for="(pic, i) in reviews.files" :key="i" cols="12" sm="6">
            <v-card class="mx-auto my-12" max-width="374">
              <v-img class="mainPic" :src="pic.dataUrl"></v-img>
            </v-card>
          </v-col>
        </v-row>
        <v-img
          v-if="reviews.files == 0"
          class="mainPic"
          src="https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif"
        ></v-img>
      </div>
      <div class="reviewContents">
        <p>{{ reviews.content }}</p>
      </div>
      <div class="bottomBtn">
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
  </div>
</template>

<style lang="scss">
.detailContainer {
  width: 1000px;
  margin-top: 100px;
  margin-bottom: 100px;
  height: auto;
  border: 1px solid black;
}
.reviewTitle {
  text-align: center;
  margin-bottom: 50px;
  font-size: 50px;
  border-bottom: 1px solid #000;
}
.picturePlace {
  width: 100%;
  height: auto;
  margin: 0 auto;
}
.reviewContents {
  height: 700px;
  font-size: 30px;
  margin-bottom: 50px;
  margin-top: 50px;
  border-top: 1px solid black;
}
.mainPic {
  width: 100%;
  height: 100%;
}
.bottomBtn {
  text-align: center;
  border-top: 1px solid black;
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
      this.$router.push("/reviewmain");
    },
    // 목록 조회 함수
    async getReviews() {
      // 메인 페이지에서 매개변수로 넘겨준 nickname 을 nickname 변수에 대입 (router/index 참고)
      const id = this.$route.params.id;
      // 매개변수 넘어왔는지 콘솔출력
      console.log("메인페이지에서 넘어온 매개변수");
      console.log(id);
      // search api호출 (매개변수로  nickname 대입)
      const result = await api.search(id);
      console.log("id로 조회한 결과 콘솔출력");
      console.log(result);
      console.log("id로 조회한 결과의 데이터 콘솔출력");
      console.log(result.data);
      // 조회가 정상적으로 이루어지면
      if (result.status == 200) {
        // reviews에 결과의 데이터 대입
        this.reviews = result.data;
      }
    },
    // 삭제전 인증페이지 이동
    beforeDelete() {
      // 해당정보의 아이디 와 닉네임 각 변수에 대입
      const id = this.reviews.id;
      const nickname = this.reviews.nickname;
      // 삭제전 인증페이지 이동(매개변수로 id, nickname)   (router.index참고)
      this.$router.push(`/beforedelete/${id}/${nickname}`);
    },
    moveToBeforePatch() {
       const id = this.reviews.id;
      this.$router.push(`/test/${id}`);
    },
  },
};
</script>