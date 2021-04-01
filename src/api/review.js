import axios from 'axios'
export default {
    // POST http://localhost:8080/feeds
    // BODY {name, userid ...}    => feed
    // HEADER content-type:application-json

    // fetch는 header에 json타입인지 어떤타입인지 셋팅해줘야하는데
    // axios사용시 매개변수가 자바스크립트면 자동으로 json으로 변환해준다.

    // 내용 업로드
    post: (review) =>
        axios.post(`${process.env.VUE_APP_API_BASE_URL}/reviews`,
            review),

    // 파일업로드
    uploadFile: (textId, form) =>
        axios.post(`${process.env.VUE_APP_API_BASE_URL}/reviews/${textId}/review-picture-file`,
            form, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }),

        patchFile: (textId, form) =>
        axios.put(`${process.env.VUE_APP_API_BASE_URL}/reviews/${textId}/pictures`,
            form, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }),
    
    // 전체목록조회
    list: () =>
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/reviews`),

    // id로 조회
    search: (id) =>
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/reviews/${id}`),
    
    // 내용 수정
    patch: (id, contents) =>
        axios.patch(`${process.env.VUE_APP_API_BASE_URL}/reviews/${id}`, contents),
    // 닉네임 중복체크
    check: (nickname) =>
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/reviews/nickname/check?keyword=${nickname}`),

    //아이디 비번체크
    pwCheck: (nickname, password) =>
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/reviews/${nickname}/check?keyword=${password}`),
    
    title: (title) =>
        axios.get(`${process.env.VUE_APP_API_BASE_URL}/reviews/search/title?keyword=${title}`),

    del: (id) =>
        axios.delete(`${process.env.VUE_APP_API_BASE_URL}/reviews/${id}`)



}