<template>
  <div>
    <beforedelete
      v-for="(data, i) in data"
      :key="i"
      :data="data"
      :index="i"
      @del="delm"
    >
    </beforedelete>
  </div>
</template>

<script>
import api from "../api/review";
import beforedelete from "@/components/BeforeDelete.vue";

export default {
  data: () => ({
    nickname: "",
    password: "",
    data: [],
  }),
  components: {
    beforedelete,
  },
  mounted: {
    beforedelete,
  },
  methods: {
    // 메인 페이지로이동
    moveToMain() {
      this.$router.push("/reviewmain");
    },
    // 삭제전에 개인정보체크 함수
    async delm() {
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
          const result = await api.del(id);
          console.log(result);
          this.$router.push("/reviewmain");
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