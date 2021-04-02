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
              alt="review.files[0].dataUrl"
            ></v-img>
            <v-img
              v-if="review.files.length == 0"
              class="mainPic"
              src="https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif"
              alt="이미지없음"
            ></v-img>
          </div>
          <div>
            <v-card-title>제목 : {{ review.title }}</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-title>닉네임 : {{ review.nickname }}</v-card-title>
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
    this.getReviews();
  },
  methods: {
    // (글쓰기) 클릭시
    moveToWriteForm() {
      this.$router.push("/writeform");
    },
    // 입력한 정보나사진 클릭시
    moveToDetail(review) {
      const id = review.id;
      this.$router.push("/reviewdetail/" + id);
    },
    // 목록조회함수
    async getReviews() {
      const result = await api.list();

      console.log(result.data + "참고");
      if (result.status == 200) {
        this.reviews = result.data;
      }
    },
    // 제목으로 특정하여 조회함수
    movoToSearch() {
      this.$router.push("/findbytitle/" + this.value);
    },
  },
};
</script>