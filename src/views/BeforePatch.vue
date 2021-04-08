<template>
  <div>
    <v-container class="toPatchContainer">
      <v-card>
        <h1 class="title">수정페이지</h1>
        <v-text-field
          label="닉네임을 입력하세요"
          v-model="nickname"
          @keyup.enter="patch"
          outlined
          dense
        >
        </v-text-field>
        <v-text-field
          label="비밀번호를 입력하세요"
          v-model="password"
          type="password"
          @keyup.enter="patch"
          outlined
          dense
        >
        </v-text-field>
        <div style="text-align: center">
          <v-btn small color="primary" @click="moveToMain()">목록</v-btn>
          <v-btn small color="primary" @click="patch">수정</v-btn>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<style lang="scss">
.toPatchContainer {
  width: 1000px;
  margin-top: 30px;
}
.divider {
  margin-bottom: 20px;
}
.title {
  text-align: center;
  margin-bottom: 10px;
}
</style>


<script>
import api from "../api/review";

export default {
  data: () => ({
    nickname: "",
    password: "",
    data: [],
  }),

  methods: {
    // 메인 페이지로이동
    moveToMain() {
      this.$router.push("/reviewmain");
    },
    // 삭제전에 개인정보체크 함수
    async patch() {
      // 매개변수로 받은 id 저장
      const id = this.$route.params.id;
      // id 해당 정보조회
      const information = await api.search(id);
      // 조회결과 data변수에 저장
      const data = information.data;
      this.data = data;
      console.log("조회결과 조회");
      console.log(information.data);

      console.log(data.nickname, "원래닉네임");
      console.log(data.password, "원래비번");

      const nickname = this.nickname;
      const password = this.password;

      // 닉네임 비번체크
      if (this.password && this.nickname) {
        const tf = await api.pwCheck(nickname, password);
        if (tf.data == true) {
          this.$router.push(`/patch/${information.data.id}`);
          console.log(information.data.id);
        } else {
          alert("닉네임이나 비밀번호가 틀립니다.");
        }
      } else if (!nickname) {
        alert("닉네임을 입력하지 않았습니다.");
      } else {
        alert("패스워드를 입력하지 않았습니다.");
      }
    },
  },
};
</script>