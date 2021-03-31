import axios from 'axios'
export default {

    // 전체목록조회
    list: () =>
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/hospital`),


}