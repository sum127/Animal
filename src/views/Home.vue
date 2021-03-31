
<template>
  <v-container>
    <v-col cols="9">
      <v-card class="mapBox">
        <v-card-text style="text-align: center"> 동물 병원 현황 </v-card-text>
        <v-card id="map"> </v-card>
      </v-card>
    </v-col>
  </v-container>
</template>

<style lang="scss">
@import "../reset.css";

#map {
  margin: 0 auto;
  width: 1500px;
  height: 1000px;
}
.mapBox {
  margin-top: 50px;
}
</style>

<script>
import api from "../api/map";
export default {
  data: () => ({}),
  mounted() {
    window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
  },
  methods: {
    async initMap() {
      // 지도정보
      const result = await api.list();
      console.log(result);
      // id가 map인걸 가져와서 container에 넣음
      var container = document.getElementById("map");
      // 처음지도 보이는것 설정
      var options = {
        center: new kakao.maps.LatLng(37.5287006, 127.0068551),
        level: 8,
      };
      // 처음보이는 위치를 옵션의 설정대로 넣어서 map에 저장
      var map = new kakao.maps.Map(container, options);
      // markerPosition에 반복문으로 x,y값설정
      for (let a of result.data) {
        var markerPosition = new kakao.maps.LatLng(a.afterX, a.afterY);

        var marker = new kakao.maps.Marker({
          position: markerPosition,
        });
      }
      marker.setMap(map);
    },
    addScript() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=3d963fed70cbcafd214b05e41b71d2b0";
      document.head.appendChild(script);
    },
  },
};
</script>
