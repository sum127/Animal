<template>
  <div>
    <div class="btnOutBox">
      <v-btn class="btna" @click="moveToWriteForm">글쓰기</v-btn>
    </div>
    <v-row no-gutters>
      <v-col
        v-for="(review, i) in reviews"
        :key="i"
        :review="review"
        :index="i"
        cols="12"
        sm="4"
      >
        <v-card
          @click="moveToDetail(review)"
          class="mx-auto my-12"
          max-width="374"
        >
          <div class="mainPicDiv">
            <v-img
              v-if="review.files.length > 0"
              class="mainPic"
              :src="review.files[0].dataUrl"
            ></v-img>
            <v-img
              v-if="review.files.length == 0"
              class="mainPic"
              src="https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif"
            ></v-img>
          </div>
          <div>
            <v-card-title>{{ review.title }}</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-title>{{ review.nickname }}</v-card-title>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-container style="width: 300px">
      <v-text-field
        outlined
        label="제목을 입력하시오"
        append-icon="mdi-magnify"
        v-model="value"
        class="input"
        @click:append="moveToSearch()"
        @keyup.enter="movoToSearch()"
      ></v-text-field>
    </v-container>
  </div>
</template>



<style lang="scss">
@import "../reset.css";
.input {
  text-align: center;
}
.btna {
  margin-top: 20px;
  width: 50px;
}
.btnOutBox {
  width: 100%;
  text-align: center;
}
.mainPicDiv {
  width: 375px;
  height: 200px;
  overflow: hidden;
}
.mainPic {
  width: 100%;
  height: 100%;
}
</style>

<script>
import api from "../api/review";
export default {
  data: () => ({
    reviews: [],
    value: "",
  }),
  mounted() {
    // 목록조회 함수 호출
    this.getReviews();
  },
  methods: {
    // 글쓰기 페이지로 이동
    moveToWriteForm() {
      this.$router.push("/writeform");
    },
    // 상세 페이지로 이동 (해당정보를 매개변수로 가져옴)
    moveToDetail(review) {
      const nickname = review.nickname;
      // 해당정보의 닉네임을 매개변수로넘김
      this.$router.push("/reviewdetail/" + nickname);
    },
    // 목록조회 함수
    async getReviews() {
      // 매개변수로 받은 제목을 title에 저장
      const title = this.$route.params.title;
      console.log(title, "매개변수 콘솔 출력");
      // 제목으로 조회하는 title api호출
      const result = await api.title(title);
      console.log(await api.title(title), "api호출주소 출력");

      console.log("제목으로 조회한 결과출력");
      console.log(result);
      console.log("제목으로 조회한 결과 데이터출력");
      console.log(result.data);
      // 정상적으로 조회되면
      if (result.status == 200) {
        // 데이터를 reviews에 대입
        this.reviews = result.data;
      }
    },
    // 제목으로 조회 함수
    async movoToSearch() {
      const title = this.value;
      const result = await api.title(title);

      // 정상적으로 조회되면
      if (result.status == 200) {
        // 데이터를 reviews에 대입
        this.reviews = result.data;
      }
    },
  },
};
</script>