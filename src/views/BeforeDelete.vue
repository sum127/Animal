<template>
  <div>
    <v-container class="toPatchContainer">
      <v-card>
        <h1 class="title">삭제페이지</h1>
        <v-text-field
          label="닉네임을 입력하세요"
          v-model="nickname"
          @keyup.enter="del"
          outlined
          dense
        >
        </v-text-field>
        <v-text-field
          label="비밀번호를 입력하세요"
          v-model="password"
          type="password"
          @keyup.enter="del"
          outlined
          dense
        >
        </v-text-field>
        <div style="text-align: center">
          <v-btn small color="primary" @click="moveToMain()">목록</v-btn>
          <v-btn small color="primary" @click="del">삭제</v-btn>
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
      this.$router.push("/");
    },
    // 삭제전에 개인정보체크 함수
    async del() {
      const id = this.$route.params.id;
      // id 해당 정보조회
      const information = await api.search(id);
      const data = information.data;
      this.data = data;
      console.log("조회결과 조회");
      console.log(information.data);

      const nickname = this.nickname;
      const password = this.password;

      // 닉네임 비번체크
      if (this.password && this.nickname) {
        const tf = await api.pwCheck(nickname, password);
        if (tf.data == true) {
          const a = confirm("정말 삭제하시겠습니까?");
          if (a == true) {
            const result = await api.del(id);
            console.log(result);
            this.$router.push("/");
          }
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