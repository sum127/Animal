<template>
  <div>
    <v-container style="outContainer">
      <v-row>
        <v-col>
          <v-card class="writeContainer">
            <div>
              <v-text-field
                label="제목을 입력하세요"
                v-model="title"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                label="닉네임을 입력하세요"
                v-model="nickname"
                outlined
                dense
              ></v-text-field>
              <v-btn @click="check" style="width: 100%">중복체크</v-btn>
              <v-text-field
                label="비밀번호를 입력하세요"
                v-model="password"
                type="password"
                style="margin-top: 30px"
                outlined
                dense
              ></v-text-field>
            </div>

            <div style="text-align: center">
              <textarea
                cols="100"
                rows="20"
                style="border: 1px solid black"
                v-model="post"
              ></textarea>
            </div>
            <div class="field">
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
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">
.outContainer {
  width: 100%;
}
.writeContainer {
  width: 1000px;
  margin: 0 auto;
  background-color: pink;
}
.field {
  width: 300px;
  margin: 0 auto;
}
</style>

<script>
import api from "../api/review";

export default {
  data: () => ({
    // v-model : 제목
    title: "",
    // v-model : 닉네임
    nickname: "",
    patchCheckName: "",
    // v-model : 비번
    password: "",
    // post의 내용 1건 담을곳
    contents: "",
    // v-model : 제목
    files: [],
    // v-model : 내용[배열]
    post: [],
    // 정보 목록을 배열화해서 담을곳
    reviews: [],
    // 중복체크하는 변수
    checkname: true,
  }),

  methods: {
    async share() {
      // 제목, 닉네임, 비번이 입력되어있어야함
      if (this.title && this.nickname && this.password) {
        // checkname 이 중복이 아니어야함
        if (this.checkname == false && this.patchCheckName == this.nickname) {
          // 입력한 사항들을 review라는 변수에 객체화해서 담음
          const review = {
            title: this.title,
            nickname: this.nickname,
            password: this.password,
            content: this.post,
          };

          console.log("정보 객체화한거 출력");
          console.log(review);

          const result = await api.post(review);

          console.log("호출결과 콘솔출력");
          console.log(result);

          console.log("호출결과 상태값 콘솔출력");
          console.log(result.status);

          console.log("호출결과의 데이터 콘솔출력");
          console.log(result.data);

          if (result.status == 200) {
            const newReview = result.data;
            newReview.files = [];

            // 넣을 파일이 존재하고, 1개이상이면 (프론트엔드)
            if (this.files && this.files.length > 0) {
              // 파일의 갯수만큼 반복 (변수병은 file로 사용)
              for (let file of this.files) {
                const form = new FormData();
                form.append("data", file);
                const result = await api.uploadFile(newReview.id, form);
                console.log("업로드한 파일결과 상태출력");
                console.log(result.status);
                console.log("업로드한 파일 결과 데이터 출력");
                console.log(result.data);

                newReview.files.push({
                  ...result.data,
                });
              }
            }

            this.reviews.unshift(newReview);
            this.$router.push("/reviewmain");
          }
          //checkname 이 중복이면 alert띄움
        } else {
          alert("중복체크를 다시하시오");
        }
        // 제목, 닉네임, 비번 중 공백이있으면 alert띄움
      } else {
        alert("빈칸이 있습니다.");
      }
    },
    async check() {
      const review = this.nickname;
      console.log("입력한 닉네임 잘넣었나 확인");
      console.log(review);

      const result = await api.check(review);

      //중복 이면 트루 중복아니면 false
      if (result.data == true) {
        alert("중복입니다.");
      } else if (result.data == false) {
        if (this.nickname) {
          this.checkname = result.data;
          alert("중복이아닙니다.");
          this.patchCheckName = this.nickname;
        } else {
          alert("입력사항이 없습니다.");
        }
      }
    },
    // 메인 페이지로 이동
    moveToMain() {
      this.$router.push("/reviewmain");
    },
  },
};
</script>