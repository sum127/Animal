
<template>
  <v-container>
    <v-row>
      <v-col cols="7">
        <v-card class="mapBox">
          <v-text-field
            label="병원이름을 입력하시오"
            v-model="hospitalName"
            @keyup.enter="initMap(hospitalName)"
          ></v-text-field>
          <v-card id="map"> </v-card>
        </v-card>
      </v-col>
      <v-col cols="5">
        <template>
          <table style="height: 300px">
            <thead>
              <tr>
                <th class="name">동물병원 이름</th>
                <th class="address">주소</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in newItems" :key="i">
                <td class="tableName" @click="click(item)">
                  {{ item.bplcnm }}
                </td>
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
.name {
  text-align: center;
  width: 30%;
}
.address {
  width: 70%;
  text-align: center;
}
.tableName {
  width: 30%;
  text-align: center;
}
.tableName:hover {
  background-color: gray;
  color: white;
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
    x: 127.0068551,
    y: 37.5287006,
    level: 8,
    hospitalName: "",
  }),
  mounted() {
    window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
  },
  methods: {
    async initMap(name) {
      // 지도정보
      const result = await api.list();
      this.newItems = result.data;
      // 지도를 표시할 div
      var container = document.getElementById("map");

      if (name) {
        for (let a of result.data) {
          if (a.bplcnm == this.hospitalName) {
            this.x = a.afterX;
            this.y = a.afterY;
            this.level = 1;
          }
        }
      }
      console.log(this.x + " " + this.y);

      var options = {
        // 지도의 중심축
        center: new kakao.maps.LatLng(this.y, this.x),
        // 확대정도
        level: this.level,
      };
      // 지도생성
      const map = new kakao.maps.Map(container, options);
      if (name) {
        // 마커가 표시될 위치입니다
        var markerPosition = new kakao.maps.LatLng(this.y, this.x);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
      }
      console.log(map);
    },
    addScript() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=3d963fed70cbcafd214b05e41b71d2b0";
      document.head.appendChild(script);
    },
    click(item) {
      var container = document.getElementById("map");

      var options = {
        // 지도의 중심축
        center: new kakao.maps.LatLng(item.afterY, item.afterX),
        // 확대정도
        level: 1,
      };
      // 지도생성
      const map = new kakao.maps.Map(container, options);

      // 마커가 표시될 위치입니다
      var markerPosition = new kakao.maps.LatLng(item.afterY, item.afterX);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    },
  },
};
</script>
