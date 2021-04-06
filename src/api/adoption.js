import axios from 'axios'
export default {

    // 전체목록조회
    id : (name, mobile) =>
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/adoption/keyword?name=${name}&mobile=${mobile}`),

}