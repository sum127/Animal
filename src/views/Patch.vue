<template>
  <div>
    <v-container class="writeContainer">
      <v-row>
        <v-col>
          <div class="field">
            <h1>제목 : {{ reviews.title }}</h1>
            <h1 style="margin-bottom: 50px">
              {{ reviews.nickname }} 님의 게시물
            </h1>
          </div>

          <div style="text-align: center">
            <textarea
              cols="100"
              rows="20"
              style="border: 1px solid black"
              v-model="post"
            ></textarea>
          </div>
          <div>
            <v-file-input
              v-model="files"
              prepend-icon="mdi-camera"
              label="pick photos or videos"
              accept="image/png, image/jpeg, image/bmp, video/mp4"
              multiple
            >
            </v-file-input>
          </div>

          <div style="text-align: center">
            <v-btn small color="primary" @click="moveToMain()">목록</v-btn>
            <v-btn
              small
              color="primary"
              @click="share()"
              style="text-align: center"
              >저장</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">
.writeContainer {
  width: 1000px;
  margin-top: 10px;
  border: 1px solid black;
}
h1 {
  text-align: center;
  line-height: 50px;
}
</style>

<script>
import api from "../api/review";

export default {
  data: () => ({
    files: [],
    post: "",
    // 정보 목록을 배열화해서 담을곳
    reviews: [],
  }),

  mounted() {
    this.infor();
  },
  methods: {
    async infor() {
      const id = this.$route.params.id;
      console.log(id);

      //api호출한 결과 result에 대입
      const result = await api.search(id);

      if (result.status == 200) {
        //호출한 데이터를 newReview 변수에 대입
        this.reviews = result.data;
      }
    },
    async share() {
      const id = this.$route.params.id;
      console.log(id);

      //api호출한 결과 result에 대입
      const result = await api.patchContent(id, this.post);
      if (result.status == 200) {
        //호출한 데이터를 newReview 변수에 대입
        console.log("수정성공");
      }

      await api.delpic(id);

      // 지금은 사진 3개넣어도 1개로만 수정됨 이유는 스프링참고
      if (this.files && this.files.length > 0) {
        for (let file of this.files) {
          const form = new FormData();
          form.append("data", file);
          const fileResult = await api.uploadFile(id, form);
          if (result.status == 200) {
            console.log("hi");
            console.log(fileResult);
          }
        }
      }

      // 메인 페이지로 이동
      this.$router.push("/reviewmain");

      //checkname 이 중복이면 alert띄움
    },

    // 메인 페이지로 이동
    moveToMain() {
      this.$router.push("/reviewmain");
    },
  },
};
</script>