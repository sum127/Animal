<template>
  <div>
    <v-container class="writeContainer">
      <v-row>
        <v-col>
          <div class="field">
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
            <v-btn @click="check">중복체크</v-btn>
            <v-text-field
              label="비밀번호를 입력하세요"
              v-model="password"
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">
.writeContainer {
  width: 1000px;
  margin-top: 10px;
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
    patchCheckName : "",
    // v-model : 비번
    password: "",
    // post의 내용 1건 담을곳
    contents: "",
    // v-model : 제목
    files: [],
    // v-model : 내용[배열]
    post: "",
    // 정보 목록을 배열화해서 담을곳
    reviews: [],
    // 중복체크하는 변수
    checkname: true,
  }),

  methods: {
    async share() {
      // 제목, 닉네임, 비번이 입력되어있어야함
      
        // checkname 이 중복이 아니어야함
        
          // 입력한 사항들을 review라는 면수에 객체화해서 담음
          


          // 객체화한 정보를 매개변수로 api post호출
        const id = this.$route.params.id;
        console.log(id);
        console.log(this.post);
          //api호출한 결과 result에 대입
            const result = await api.patch(id, this.post);

           if (result.status == 200) {
            //호출한 데이터를 newReview 변수에 대입
            this.reviews = result.data;
           }

          //호출이 정상적으로 이루어지면
          
            // 넣을 파일이 존재하고, 1개이상이면 (프론트엔드)
            if (this.files && this.files.length > 0) {
              // 파일의 갯수만큼 반복 (변수병은 file로 사용)
              for (let file of this.files) {
                // 폼데이터를 생성하여 form 변수에 대입
                const form = new FormData();
                // 폼데이터에 data, 파일  형식으로 추가
                form.append("data", file);
                // uploadfile api호출 (매개변수로 id랑 폼데이터를 넣어줌)
                 const fileResult = await api.patchFile(id, form);
                // api 호출 결과상테 콘솔출력
                if (result.status == 200) {
            //호출한 데이터를 newReview 변수에 대입
            console.log(fileResult);
           }
              }
            }

            
            // 메인 페이지로 이동
             this.$router.push("/reviewmain");
          
          //checkname 이 중복이면 alert띄움
        
    },
    async check() {
      // 입력한 nickname을 review 변수에 저장
      const review = this.nickname;
      // 입력한 닉네임 잘넣었나 확인
      console.log("입력한 닉네임 잘넣었나 확인");
      console.log(review);

      // api check호출하여 result에 대입
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