<template>
  <v-container>
    <v-card class="getInfo">
      <div class="textBox">
        <v-text-field
          style="padding-top: 50px"
          label="이름을 입력하세요"
          v-model="name"
          @keyup.enter="searchAll"
        >
        </v-text-field>
        <v-text-field
          label="핸드폰번호 입력하세요"
          v-model="mobile"
          @keyup.enter="searchAll"
        >
        </v-text-field>
        <div style="display: flex">
          <v-btn @click="main">목록</v-btn>
          <v-btn style="margin-bottom: 90px" @click="searchAll">체크</v-btn>
        </div>
        <h1 class="textz" v-if="check == true">
          후기 쓸 강아지 사진을 고르시오
        </h1>
      </div>
      <v-card v-for="(review, i) in getdata" :key="i">
        <img
          v-if="i < 4"
          :src="review.animalImg"
          alt="유기견사진"
          class="pic"
          @click="write"
        />
      </v-card>
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
  height: 530px;
}
.textBox {
  width: 700px;
  margin: 0 auto;
  text-align: right;
}
.pic {
  float: left;
  width: 200px;
  height: 200px;
  cursor: pointer;
}
.pic:hover {
  opacity: 50%;
}
.textz {
  width: 100%;
  font-size: 20px;
  text-align: center;
}
</style>

<script>
import api from "../api/adoption";
export default {
  data: () => ({
    // 전체내용을 한단위로 묶어서 배열로넣을곳
    reviews: [],
    getdata: [],
    name: "",
    mobile: "",
    src: "",
    check: false,
    // 입력하여 검색할 값을 저장할곳
    value: "",
  }),
  methods: {
    // (글쓰기) 클릭시
    moveToWriteForm() {
      this.$router.push("/writeform");
    },
    // 메인페이지 이동
    moveToMain() {
      this.$router.push("/");
    },
    async searchAll() {
      if (this.name && this.mobile) {
        const result = await api.id(this.name, this.mobile);
        if (result.data.length > 0) {
          this.getdata = result.data;
          this.check = true;
        } else {
          alert("해당정보없음");
        }
      } else {
        alert("칸이 비었습니다");
      }
    },
    write() {
      if (this.check == true) {
        this.$router.push("/writeform");
      } else {
        alert("입양한 내역이없습니다.");
      }
    },
    main() {
      this.$router.push("/");
    },
  },
};
</script>