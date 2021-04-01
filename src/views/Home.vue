
<template>
  <v-container>
    <v-row>
      <v-col cols="7">
        <v-card class="mapBox">
          <v-card-text style="text-align: center"> 동물 병원 현황 </v-card-text>
          <v-card id="map"> </v-card>
        </v-card>
      </v-col>
      <v-col cols="5">
        <template>
          <table style="height: 300px">
            <thead>
              <tr>
                <th class="tableName">동물병원 이름</th>
                <th class="tableAddress">주소</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in newItems" :key="i">
                <td class="tableName">{{ item.bplcnm }}</td>
                <td class="tableAddress">{{ item.sitewhladdr }}</td>
              </tr>
            </tbody>
          </table>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
@import "../reset.css";

table {
  width: 700px;
  margin-top: 50px;
  overflow: hidden;
  border: 1px solid black;
}

table thead {
  width: 100%;
  border-bottom: 1px solid black;
}
table thead th {
  float: left;
  text-align: center;
}

table tbody {
  float: left;
  width: 700px;
  height: 1000px;
  overflow-y: auto;
  overflow-x: hidden;
}
table tbody td {
  text-align: center;
  border-right: 1px solid black;
  border-bottom: 1px solid #000;
}
table tbody tr:last-child {
  border-bottom: none;
}

table tbody td {
  text-align: center;
}
#map {
  margin: 0 auto;
  width: 1500px;
  height: 1000px;
}
.mapBox {
  margin-top: 50px;
}

.tableName {
  width: 30%;
  text-align: center;
}
.tableAddress {
  text-align: center;
  width: 60%;
}
</style>

<script>
import api from "../api/map";
export default {
  data: () => ({
    newItems: [],
    positions: [],
  }),
  mounted() {
    window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
  },
  methods: {
    async initMap() {
      // 지도정보
      const result = await api.list();
      this.newItems = result.data;

      // 지도를 표시할 div
      var container = document.getElementById("map");

      var options = {
        // 지도의 중심축
        center: new kakao.maps.LatLng(37.5287006, 127.0068551),
        // 확대정도
        level: 8,
      };
      // 지도생성
      var map = new kakao.maps.Map(container, options);

      for (let a of result.data) {
        var markerPosition = {
          title: a.bplcnm,
          LatLng: new kakao.maps.LatLng(a.afterX, a.afterY),
        };

        var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
        console.log(markerPosition.LatLng);
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          title: markerPosition.title,
          position: markerPosition.LatLng, // 마커를 표시할 위치
          image: markerImage, // 마커 이미지
        });
        console.log(marker);
      }
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
