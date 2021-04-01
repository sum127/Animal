<template>
  <div>
    <div class="writeBox">
      <v-btn style="margin-top: 20px" @click="moveToWriteForm">글쓰기</v-btn>
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
          <div class="pictureOutBox">
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
        @click:append="moveToSearch()"
        @keyup.enter="movoToSearch()"
      ></v-text-field>
    </v-container>
  </div>
</template>

<style lang="scss">
@import "../reset.css";

.writeBox {
  width: 100%;
  text-align: center;
}
.pictureOutBox {
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
    // 전체내용을 한단위로 묶어서 배열로넣을곳
    reviews: [],
    // 입력하여 검색할 값을 저장할곳
    value: "",
  }),
  mounted() {
    // 화면이 마운트되면 목록조회 함수 호출
    this.getReviews();
  },
  methods: {
    // (글쓰기) 클릭시
    moveToWriteForm() {
      // (글쓰기)텝으로 이동
      this.$router.push("/writeform");
    },
    // 입력한 정보나사진 클릭시
    moveToDetail(review) {
      // 해당 아이디디정보 담은 변수생성
      const id = review.id;
      // 디테일 페이지로 이동 (매개변수로 아이디값 넘김)
      this.$router.push("/reviewdetail/" + id);
    },
    // 목록조회함수
    async getReviews() {
      // api에 list호출
      const result = await api.list();

      console.log(result.data + "참고");
      // 상태가 정상이면
      if (result.status == 200) {
        // reviews에 정보저장
        this.reviews = result.data;
      }
    },
    // 제목으로 특정하여 조회함수
    movoToSearch() {
      // 특정정보 조회한 페이지로 이동 (매개변수로 입력한 제목 넘김)
      this.$router.push("/findbytitle/" + this.value);
    },
  },
};
</script>