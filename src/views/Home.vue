
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
export default {
  mounted() {
    window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
  },
  methods: {
    initMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(37.5287006, 127.0068551),
        level: 8,
      };
      var map = new kakao.maps.Map(container, options);
      //마커추가하려면 객체를 아래와 같이 하나 만든다.
      var marker = new kakao.maps.Marker({
        position: map.getCenter(),
      });
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
